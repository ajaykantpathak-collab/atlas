'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID CONSTANTS (ICSE Class 6 Physics - Light, Heat & Sound) ───
const NODE_C6_PHY_021 = 'c6_phy_021'; // Rectilinear propagation of light
const NODE_C6_PHY_022 = 'c6_phy_022'; // Reflection of light (plane mirror)
const NODE_C6_PHY_023 = 'c6_phy_023'; // Image formation by plane mirror
const NODE_C6_PHY_024 = 'c6_phy_024'; // Heat as a form of energy
const NODE_C6_PHY_025 = 'c6_phy_025'; // Temperature and its measurement
const NODE_C6_PHY_026 = 'c6_phy_026'; // Thermal expansion due to heat
const NODE_C6_PHY_027 = 'c6_phy_027'; // Change of state due to heat
const NODE_C6_PHY_028 = 'c6_phy_028'; // Sound as a form of energy produced by vibration
const NODE_C6_PHY_029 = 'c6_phy_029'; // Propagation of sound through mediums
const NODE_C6_PHY_030 = 'c6_phy_030'; // Loudness of sound and amplitude

const ALL_PHYSICS_NODES = [
  NODE_C6_PHY_021,
  NODE_C6_PHY_022,
  NODE_C6_PHY_023,
  NODE_C6_PHY_024,
  NODE_C6_PHY_025,
  NODE_C6_PHY_026,
  NODE_C6_PHY_027,
  NODE_C6_PHY_028,
  NODE_C6_PHY_029,
  NODE_C6_PHY_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Physics Exhibition at Kolkata Science City',
  intro: 'You are appointed Lead Junior Physicist for the interactive pavilion. You must configure 3 interactive laboratory benches: Light Optics, Thermal Physics, and Sound Waves before thousands of school students arrive.',
  context: 'Calibrate straight-line light beams, examine mirror reflection, balance heat and particle states, and tune acoustic vibrations to demonstrate the core laws of physics!',
};

// ─── DISCOVERY QUESTION (Hook) ───
const DISCOVERY_QUESTION = {
  question: 'When a lit candle is viewed through a tiny pinhole camera, what does the image on the screen look like?',
  options: [
    'Upright and magnified because light bends around the pinhole',
    'Inverted (upside down) and real because light travels in straight lines',
    'A circular bright dot with no image features',
    'A virtual image that floats behind the camera box',
  ],
  correctIndex: 1,
  hintAfter: 'Light travels in straight lines! Rays from the top of the flame travel downwards to the bottom of the screen, creating an inverted image.',
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

// ─── CHALLENGES ARRAY (24 Comprehensive ICSE Questions) ───
const CHALLENGES: Challenge[] = [
  // Foundation Tier (8 challenges)
  {
    id: 'ch_phy_01',
    nodeId: NODE_C6_PHY_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the term for the completely dark central region of a shadow where no light reaches?',
    options: ['Penumbra', 'Umbra', 'Normal', 'Virtual zone'],
    correctIndex: 1,
    explanation: 'The umbra is the totally dark inner region of a shadow where all straight-line light rays from the source are blocked by the opaque body.',
    hints: [
      'Think of Latin words: one means shadow, one means "almost" shadow.',
      'It is the inner dark core, not the lighter outer fuzzy border.',
      'The totally dark zone is called the Umbra.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_phy_02',
    nodeId: NODE_C6_PHY_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'According to the first law of reflection, if a ray of light hits a plane mirror with an angle of incidence of 40°, what is the angle of reflection?',
    options: ['20°', '40°', '50°', '90°'],
    correctIndex: 1,
    explanation: 'The first law of reflection states that the angle of incidence equals the angle of reflection (i = r). Both are measured from the normal, so r = 40°.',
    hints: [
      'Remember the fundamental law: i = r.',
      'Both angles are measured from the perpendicular normal.',
      'Since i = 40°, the angle of reflection r is also 40°.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_phy_03',
    nodeId: NODE_C6_PHY_023,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is the image formed by a plane mirror described as "virtual"?',
    options: [
      'Because it is upside down and magnified',
      'Because the reflected light rays do not actually meet and it cannot be caught on a screen',
      'Because it only appears when the room is pitch dark',
      'Because it is produced by diffused reflection on a rough surface',
    ],
    correctIndex: 1,
    explanation: 'A virtual image is formed where reflected rays only appear to diverge from behind the mirror when extended backwards; it cannot be projected on a physical screen.',
    hints: [
      'Can you catch your mirror reflection on a piece of paper placed behind the glass?',
      'Virtual means "apparent" rather than actual intersection of physical light rays.',
      'Reflected rays do not physically cross; they only appear to do so behind the mirror.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_phy_04',
    nodeId: NODE_C6_PHY_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the SI unit of heat energy?',
    options: ['Degree Celsius (°C)', 'Calorie', 'Joule (J)', 'Kelvin (K)'],
    correctIndex: 2,
    explanation: 'Heat is a form of energy, and the SI unit of all forms of energy is the Joule (J). Calorie is a metric thermal unit, while Celsius and Kelvin measure temperature.',
    hints: [
      'Heat is energy. What is the standard SI unit for work and energy?',
      'Degrees measure temperature, not energy.',
      'The SI unit of heat energy is the Joule.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_phy_05',
    nodeId: NODE_C6_PHY_025,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the purpose of the narrow "kink" (constriction) in a clinical thermometer?',
    options: [
      'To prevent the glass from cracking when cleaned with warm water',
      'To prevent the mercury column from falling back before the doctor can read the temperature',
      'To make the thermometer respond instantly to cold drafts',
      'To increase the range of the thermometer from 0°C to 100°C',
    ],
    correctIndex: 1,
    explanation: 'The kink prevents the mercury thread from flowing back into the bulb when removed from the patient’s body, allowing accurate reading at leisure. A sharp jerk resets it.',
    hints: [
      'Why does a doctor shake a clinical thermometer before putting it in your mouth?',
      'The kink locks the reading in place once removed from the warm body.',
      'It prevents the liquid thread from immediately dropping in cooler room air.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_phy_06',
    nodeId: NODE_C6_PHY_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'For the same rise in temperature, what is the correct order of thermal expansion among the three states of matter?',
    options: [
      'Solids > Liquids > Gases',
      'Gases > Liquids > Solids',
      'Liquids > Solids > Gases',
      'Solids = Liquids = Gases',
    ],
    correctIndex: 1,
    explanation: 'Gases expand the most because their particles are widely separated and weakly bonded; liquids expand moderately; solids expand the least due to tightly packed lattice structures.',
    hints: [
      'Which state has particles that are completely free to fly apart when heated?',
      'Gases expand dramatically (e.g. hot air balloons).',
      'Order: Gases > Liquids > Solids.',
    ],
  },
  {
    id: 'ch_phy_07',
    nodeId: NODE_C6_PHY_028,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the primary cause of every sound produced in nature?',
    options: ['Chemical reaction', 'Mechanical vibration (to-and-fro motion)', 'Electric voltage', 'Nuclear fission'],
    correctIndex: 1,
    explanation: 'Sound is a form of energy caused by rapid mechanical vibration (to-and-fro or back-and-forth motion) of an object.',
    hints: [
      'What happens to a guitar string or drum skin when you touch it while it produces sound?',
      'Sound stops immediately when you hold the vibrating prongs of a tuning fork.',
      'Vibration is the fundamental physical cause.',
    ],
  },
  {
    id: 'ch_phy_08',
    nodeId: NODE_C6_PHY_030,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which physical characteristic of a vibrating body determines the loudness of the sound heard?',
    options: ['Frequency', 'Speed of wave', 'Amplitude of vibration', 'Color of source'],
    correctIndex: 2,
    explanation: 'Loudness depends directly on the amplitude of vibration (maximum displacement from the mean position). A greater amplitude conveys more energy and produces a louder sound.',
    hints: [
      'When you hit a drum harder, the membrane moves further from rest.',
      'Maximum displacement from the rest position is called amplitude.',
      'Larger amplitude = louder sound.',
    ],
  },

  // Standard Tier (8 challenges)
  {
    id: 'ch_phy_09',
    nodeId: NODE_C6_PHY_021,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Drag the labels to correctly identify the components of an optical shadow system with an extended light source.',
    dragItems: [
      { label: 'Source', targetId: 'part_source' },
      { label: 'Opaque Obstacle', targetId: 'part_obstacle' },
      { label: 'Umbra (Dark Core)', targetId: 'part_umbra' },
      { label: 'Penumbra (Fuzzy Rim)', targetId: 'part_penumbra' },
    ],
    correctMapping: {
      part_source: 'Source',
      part_obstacle: 'Opaque Obstacle',
      part_umbra: 'Umbra (Dark Core)',
      part_penumbra: 'Penumbra (Fuzzy Rim)',
    },
    explanation: 'An extended light source emits straight rays past an opaque obstacle. The region completely shielded from all light is the umbra, surrounded by the partially illuminated penumbra.',
    hints: [
      'Place the emitter on the left and the obstacle in the center.',
      'The central black shadow is the umbra.',
      'The outer partial shadow is the penumbra.',
    ],
  },
  {
    id: 'ch_phy_10',
    nodeId: NODE_C6_PHY_022,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A laser beam strikes a plane mirror making an angle of 35° with the mirror surface. What is the angle of reflection (measured from the normal)?',
    correctAnswer: 55,
    tolerance: 0.5,
    unit: 'degrees (°)',
    explanation: 'The normal is perpendicular (90°) to the surface. Angle of incidence i = 90° - 35° = 55°. Since i = r, the angle of reflection is 55°.',
    hints: [
      'Warning: The angle given is measured with the mirror surface, NOT the normal!',
      'Find angle of incidence: i = 90° - 35° = ?',
      'Since i = r, r = 55°.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_phy_11',
    nodeId: NODE_C6_PHY_023,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Ananya stands 1.8 metres in front of a flat dressing table mirror. If she walks 0.6 metres backward, what is the total distance between Ananya and her mirror image?',
    correctAnswer: 4.8,
    tolerance: 0.1,
    unit: 'metres',
    explanation: 'New object distance = 1.8 + 0.6 = 2.4 m. In a plane mirror, image distance = object distance = 2.4 m behind mirror. Total distance = 2.4 + 2.4 = 4.8 m.',
    hints: [
      'First calculate her new distance in front of the mirror.',
      'Object distance = 1.8 + 0.6 = 2.4 m.',
      'Total distance from person to image = 2 × 2.4 m = 4.8 m.',
    ],
  },
  {
    id: 'ch_phy_12',
    nodeId: NODE_C6_PHY_026,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why do railway engineers leave small gaps between consecutive steel track sections in India?',
    options: [
      'To save steel metal and reduce installation cost',
      'To allow the steel rails to expand freely in hot summer days without buckling or warping',
      'To allow rainwater to drain quickly between tracks',
      'To match the circumference of locomotive wheels',
    ],
    correctIndex: 1,
    explanation: 'Thermal expansion causes solids to expand lengthwise on heating. Without expansion gaps, the enormous thermal forces would buckle the rails and cause train derailments.',
    hints: [
      'Indian summers reach 45°C+. What happens to steel length when heated?',
      'If solid metal cannot expand into a gap, it buckles under huge compressive forces.',
      'The gap accommodates thermal expansion.',
    ],
  },
  {
    id: 'ch_phy_13',
    nodeId: NODE_C6_PHY_027,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of physical changes when an ice block at -10°C is continuously heated until it turns into steam at 100°C.',
    sortItems: [
      'Solid ice warms up from -10°C to 0°C',
      'Ice melts into liquid water at constant temperature (0°C)',
      'Liquid water temperature rises from 0°C to 100°C',
      'Water boils into invisible water vapour at constant boiling point (100°C)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Heating first raises ice temperature to 0°C (melting point), then latent heat melts ice to water, water warms from 0°C to 100°C, and boiling converts liquid into vapour.',
    hints: [
      'Ice must reach 0°C before it can begin melting.',
      'Melting occurs before the liquid water heats up.',
      'Boiling at 100°C is the final stage.',
    ],
  },
  {
    id: 'ch_phy_14',
    nodeId: NODE_C6_PHY_029,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why can two astronauts standing on the surface of the Moon talk to each other only using radio headsets, even if they shout side by side?',
    options: [
      'Because lunar gravity is too low to pull sound waves down',
      'Because the Moon has no atmosphere (vacuum), and sound waves require material particles to propagate',
      'Because astronaut helmet glass reflects 100% of sound energy',
      'Because sound waves freeze instantly in space temperatures',
    ],
    correctIndex: 1,
    explanation: 'Sound is a mechanical pressure wave that propagates via collisions between particles. Because space and the Moon lack an atmosphere (vacuum), sound cannot travel.',
    hints: [
      'Remember the bell-jar experiment where pumping air out caused sound to vanish.',
      'Sound requires a medium (solid, liquid, or gas) with particles.',
      'The vacuum on the Moon prevents mechanical sound propagation.',
    ],
  },
  {
    id: 'ch_phy_15',
    nodeId: NODE_C6_PHY_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A student uses a clinical thermometer (range 35°C–42°C) to measure the temperature of boiling water in a beaker. What will happen?',
    options: [
      'It will give an accurate reading of 100°C',
      'The mercury will expand violently past 42°C, damaging the narrow capillary or breaking the glass bulb',
      'The thermometer will automatically convert Celsius to Fahrenheit',
      'The kink will prevent the mercury from rising past 37°C',
    ],
    correctIndex: 1,
    explanation: 'Boiling water is 100°C, far beyond the 42°C upper limit of a clinical thermometer. The expanding mercury will exert intense pressure and break the fragile glass tube.',
    hints: [
      'Check the range: clinical thermometers only read up to 42°C.',
      'Boiling water is at 100°C.',
      'Excessive thermal expansion of mercury will shatter the instrument.',
    ],
  },
  {
    id: 'ch_phy_16',
    nodeId: NODE_C6_PHY_030,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A tabla player strikes the center of the leather membrane with double the striking force. How does the sound change?',
    options: [
      'Its pitch becomes much higher while loudness stays unchanged',
      'The amplitude of membrane vibration increases, producing a noticeably louder sound',
      'The sound travels twice as fast across the concert hall',
      'The sound wave wavelength drops to zero',
    ],
    correctIndex: 1,
    explanation: 'Supplying more mechanical energy causes the membrane particles to displace further from equilibrium (greater amplitude), which directly increases the loudness.',
    hints: [
      'More force = more kinetic energy imparted to the membrane.',
      'Greater energy increases the maximum displacement (amplitude).',
      'Higher amplitude creates louder sound.',
    ],
  },

  // Advanced Tier (8 challenges)
  {
    id: 'ch_phy_17',
    nodeId: NODE_C6_PHY_021,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the optical ray path that creates an inverted image in a pinhole camera by assembling the ray sequence.',
    availableParts: [
      'Top Ray from Flame Tip',
      'Travels Straight through Pinhole',
      'Hits Bottom of Screen',
      'Bottom Ray from Base',
      'Hits Top of Screen',
    ],
    targetState: 'Top Ray from Flame Tip Travels Straight through Pinhole Hits Bottom of Screen Bottom Ray from Base Hits Top of Screen',
    validationHint: 'Connect top ray straight to screen bottom, then base ray straight to screen top.',
    explanation: 'Because light travels strictly in straight lines (rectilinear propagation), rays crossing at the tiny pinhole must invert: top strikes bottom, bottom strikes top.',
    hints: [
      'Start with the top ray originating at the candle flame tip.',
      'Trace it straight through the aperture down to the bottom of the translucent screen.',
      'Then add the base ray which lands at the top.',
    ],
  },
  {
    id: 'ch_phy_18',
    nodeId: NODE_C6_PHY_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is the word "AMBULANCE" printed in reverse lettering (lateral inversion) on emergency vehicles across India?',
    options: [
      'It is an international artistic tradition with no functional purpose',
      'When drivers ahead look in their flat rear-view mirrors, lateral inversion reverses the letters back to normal readable text',
      'To prevent glare from sunlight reflecting off the vehicle hood',
      'Because vehicle manufacturing machines print mirror stencils by default',
    ],
    correctIndex: 1,
    explanation: 'A plane mirror swaps left and right (lateral inversion). Pre-inverting the lettering ensures drivers looking into their rear-view mirror see normal, easily readable text.',
    hints: [
      'Think about what you see when you look at text through a mirror.',
      'The mirror introduces a left-right swap.',
      'Pre-reversing the text neutralizes the mirror’s lateral inversion.',
    ],
  },
  {
    id: 'ch_phy_19',
    nodeId: NODE_C6_PHY_024,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A 50-litre bucket of warm bathwater is at 45°C, while a small test tube has 5 ml of boiling water at 100°C. Which has more heat energy?',
    options: [
      'The test tube because 100°C is a much higher temperature',
      'The 50-litre bucket because heat is the total internal kinetic energy of all particles, and it has 10,000 times more mass',
      'Both contain identical heat because heat and temperature are identical physical quantities',
      'Neither contains heat energy until placed over a fire',
    ],
    correctIndex: 1,
    explanation: 'Temperature is an intensive measure of average particle energy, while heat (thermal energy) is extensive—depending on total mass. The bucket contains vastly more total thermal energy.',
    hints: [
      'Distinguish between average energy (temperature) and total energy (heat).',
      'Heat depends on mass: 50 kg of water vs 0.005 kg of water.',
      'The huge mass of the bucket gives it far greater total heat energy.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_phy_20',
    nodeId: NODE_C6_PHY_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A bimetallic strip made of Brass (high expansion) and Iron (low expansion) riveted together is heated with a burner. How does it behave?',
    options: [
      'It expands purely lengthwise without bending',
      'It curves into an arc with Brass on the outside (longer curve) and Iron on the inside',
      'It bends towards the Brass side because Iron pushes it',
      'The rivets melt immediately and the strip falls apart',
    ],
    correctIndex: 1,
    explanation: 'Brass expands more than iron for the same temperature rise. Being firmly riveted together, the faster-expanding brass forms the longer outer curve, bending the strip towards the iron side.',
    hints: [
      'Brass expands more, so it needs to become longer than the iron piece.',
      'In a bent arc, the outer radius is longer than the inner radius.',
      'The metal with greater expansion forms the outer side of the bend.',
    ],
  },
  {
    id: 'ch_phy_21',
    nodeId: NODE_C6_PHY_027,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'On a hot humid monsoon afternoon in Mumbai, water droplets appear on the outside of a chilled steel glass of lassi. What is the exact scientific explanation?',
    options: [
      'Cold water inside the glass seeps through micro-pores in the steel wall',
      'Invisible water vapour in the air loses heat to the cold metal surface and condenses into liquid droplets',
      'The cold temperature forces steel atoms to emit hydrogen and oxygen',
      'Ice crystals inside the lassi sublimate directly through the cup',
    ],
    correctIndex: 1,
    explanation: 'This is condensation: gaseous water vapour present in warm humid air touches the cold glass (below its dew point), transfers heat energy away, and changes state to liquid water droplets.',
    hints: [
      'Steel is impermeable—liquid cannot leak through solid metal.',
      'Where does moisture in the air come from?',
      'Warm water vapour cools down and condenses on the cold surface.',
    ],
  },
  {
    id: 'ch_phy_22',
    nodeId: NODE_C6_PHY_029,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A railway track worker taps a steel rail 1,000 metres away. If sound travels at 5,000 m/s in steel and 340 m/s in air, how many seconds sooner will a listener with an ear on the rail hear the tap compared to hearing it through air? (Round to 2 decimal places)',
    correctAnswer: 2.74,
    tolerance: 0.1,
    unit: 'seconds',
    explanation: 'Time through steel = 1000 / 5000 = 0.20 s. Time through air = 1000 / 340 ≈ 2.94 s. Time difference = 2.94 - 0.20 = 2.74 s.',
    hints: [
      'Calculate time in steel: t_steel = distance / speed = 1000 / 5000 = 0.2 s.',
      'Calculate time in air: t_air = 1000 / 340 = 2.94 s.',
      'Difference = 2.94 - 0.20 = 2.74 s.',
    ],
  },
  {
    id: 'ch_phy_23',
    nodeId: NODE_C6_PHY_028,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the causal chain of acoustic energy from when a tuning fork is struck to when a human perceives the sound.',
    sortItems: [
      'Prongs of the tuning fork vibrate to-and-fro rapidly',
      'Vibrating prongs compress and rarefy neighboring air molecules',
      'A series of longitudinal pressure waves travels outward through the medium',
      'Alternating air pressure strikes the eardrum, vibrating it and triggering auditory nerve impulses to the brain',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Mechanical vibration → local air disturbance (compressions/rarefactions) → wave propagation through medium → mechanical detection by eardrum and auditory perception.',
    hints: [
      'Start at the mechanical source: the metal prongs.',
      'Follow the particle disturbance through the air medium.',
      'Finish with perception at the listener’s ear.',
    ],
  },
  {
    id: 'ch_phy_24',
    nodeId: NODE_C6_PHY_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims: "A 120 dB jet engine noise reaches your ear faster than a gentle 30 dB whisper from the same distance because it is louder." Evaluate this claim.',
    options: [
      'Correct: Louder sounds have greater velocity through air',
      'Incorrect: Loudness depends on wave amplitude, while sound speed in uniform air is constant regardless of amplitude',
      'Correct: Sound speed is proportional to loudness in decibels',
      'Incorrect: Whispers travel faster because light air molecules move quicker',
    ],
    correctIndex: 1,
    explanation: 'Wave speed depends solely on medium properties (density and elasticity of air at given temperature), not on amplitude. Loudness indicates energy/amplitude, but both sounds travel at ~340 m/s.',
    hints: [
      'Does a loud shout in a classroom arrive at your ears before someone speaking softly at the same distance?',
      'All sounds in the same room travel through air at ~340 m/s.',
      'Loudness changes amplitude, not propagation speed.',
    ],
    misconceptionIndex: 4,
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

// ─── DEFAULT ENRICHMENT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C6_PHY_021,
  title: 'Rectilinear Propagation of Light, Reflection, Heat & Sound',
  definition:
    'Light travels in straight lines through uniform media producing shadows and pinhole images. Mirrors reflect light with i = r. Heat is energy that expands matter and alters physical states. Sound is mechanical energy generated by vibrations propagating through material media with loudness governed by amplitude.',
  eli5: 'Light is like straight laser rays that bounce off mirrors and make shadows. Heat is wiggly particle energy that makes things grow bigger and melt. Sound is invisible air bumps made by shaking things!',
  misconceptions: [
    {
      misconception: 'Light can bend around opaque corners freely to soften shadows.',
      correction: 'Light travels strictly in straight lines in uniform media. Penumbras arise solely from extended light sources having finite physical width.',
    },
    {
      misconception: 'The angle of incidence is measured between the light ray and the mirror surface.',
      correction: 'Both angle of incidence (i) and angle of reflection (r) are strictly measured from the normal (the 90° line to the surface).',
    },
    {
      misconception: 'Plane mirrors form real and magnified images behind the glass.',
      correction: 'Plane mirror images are always virtual (cannot be caught on screen), erect, laterally inverted, and exact same size as the object.',
    },
    {
      misconception: 'Heat and temperature are identical concepts.',
      correction: 'Temperature is the degree of hotness (average kinetic energy), whereas heat is the total thermal energy in Joules, depending on mass.',
    },
    {
      misconception: 'Louder sounds travel significantly faster through air than soft sounds.',
      correction: 'In a given medium, all sounds travel at the same speed (~340 m/s in air). Loudness is determined solely by wave amplitude.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is the straight-line travel of light called?',
      options: ['Curvilinear motion', 'Rectilinear propagation', 'Total internal reflection', 'Dispersion'],
      correctIndex: 1,
    },
    {
      question: 'In a plane mirror, if object distance is 15 cm, image distance is:',
      options: ['30 cm', '15 cm', '7.5 cm', '0 cm'],
      correctIndex: 1,
    },
    {
      question: 'Which of the following is an intensive measure of hotness?',
      options: ['Heat energy', 'Mass', 'Temperature', 'Volume'],
      correctIndex: 2,
    },
    {
      question: 'When an iron ball is heated, what happens to its diameter?',
      options: ['Decreases', 'Increases', 'Stays constant', 'Oscillates'],
      correctIndex: 1,
    },
    {
      question: 'What happens during melting of ice at 0°C?',
      options: ['Heat is absorbed without temperature rise', 'Heat is released', 'Temperature rises to 100°C', 'Ice contracts to vacuum'],
      correctIndex: 0,
    },
    {
      question: 'Can sound propagate through an absolute vacuum?',
      options: ['Yes, if loud enough', 'Yes, at the speed of light', 'No, sound needs material particles', 'Only in outer space'],
      correctIndex: 2,
    },
    {
      question: 'Speed of sound is greatest in which state of matter?',
      options: ['Solids (e.g. Steel)', 'Liquids (e.g. Water)', 'Gases (e.g. Air)', 'Vacuum'],
      correctIndex: 0,
    },
    {
      question: 'Large vibration amplitude produces:',
      options: ['High pitch', 'Louder sound', 'Faster speed', 'Lower frequency'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Student understands rectilinear light propagation, mirror reflections, heat energy vs temperature, thermal expansion, states of matter, and acoustic vibration amplitude.',
};

// ─── EXPLORATION STEPS (Interactive guided discovery) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Rectilinear Light & Shadow Formation',
    instruction: 'Drag the Obstacle slider and adjust Light Source Size to observe how Umbra and Penumbra form in real-time.',
    interactionType: 'slider-optics',
    nodeId: NODE_C6_PHY_021,
  },
  {
    title: 'Lab 2: Reflection & Plane Mirror Laws',
    instruction: 'Rotate the Incident Ray angle slider and verify that Angle of Incidence (i) equals Angle of Reflection (r).',
    interactionType: 'slider-mirror',
    nodeId: NODE_C6_PHY_022,
  },
  {
    title: 'Lab 3: Heat, Particles & Thermal Expansion',
    instruction: 'Crank up the Burner Temperature slider and watch the metal atoms vibrate vigorously and expand the solid rod.',
    interactionType: 'slider-heat',
    nodeId: NODE_C6_PHY_026,
  },
  {
    title: 'Lab 4: State Change & Particle Freedom',
    instruction: 'Transition water from Solid Ice (0°C) to Boiling Gas (100°C) and observe bond looseness.',
    interactionType: 'slider-state',
    nodeId: NODE_C6_PHY_027,
  },
  {
    title: 'Lab 5: Sound Waves, Vacuum & Loudness',
    instruction: 'Adjust Amplitude to see wave loudness and toggle the Vacuum Pump to observe sound vanishing in empty space.',
    interactionType: 'slider-sound',
    nodeId: NODE_C6_PHY_029,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you replace a tiny point LED with a huge broad lamp, what will happen to the shadow of a tennis ball?',
    options: [
      'The shadow will vanish completely',
      'A wide fuzzy partial shadow (penumbra) will appear around the dark umbra core',
      'The shadow will become pure umbra with zero edges',
      'The shadow will invert upside down',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Source Width slider to 80px in Lab 1 to observe the penumbra expand!',
    nodeId: NODE_C6_PHY_021,
  },
  {
    question: 'Predict: If we pump 95% of air out of a bell jar containing a ringing electric alarm, what will we observe?',
    options: [
      'The hammer stops vibrating immediately',
      'We will still see the hammer strike the gong, but the sound will become almost completely inaudible',
      'The sound gets 10 times louder because air resistance is gone',
      'The bell jar will glow with electrical sparks',
    ],
    correctIndex: 1,
    verifyInstruction: 'Click the "Activate Vacuum Pump" button in Lab 5 to verify!',
    nodeId: NODE_C6_PHY_029,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the reflected ray as you increase the incident ray angle from 10° to 60°?',
    observableOptions: [
      'Reflected angle stays fixed at 90°',
      'Angle of reflection matches the angle of incidence exactly (i = r) at all angles',
      'Reflected ray bends downwards into the mirror',
      'The reflected ray turns red',
    ],
    correctIndex: 1,
    nodeId: NODE_C6_PHY_022,
  },
  {
    question: 'In the thermal particle simulation, what happens to atomic spacing when temperature rises from 20°C to 500°C?',
    observableOptions: [
      'Atoms lock together and stop moving completely',
      'Vibration amplitude increases and the average inter-atomic distance expands',
      'Atoms lose mass and vanish',
      'Atoms turn into liquid instantly at 30°C',
    ],
    correctIndex: 1,
    nodeId: NODE_C6_PHY_026,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Junior Physicist Home Laboratory Project',
  description: 'Construct your own shoebox Pinhole Camera and test acoustic transmission across solid vs air mediums!',
  steps: [
    'Take a shoebox, paint the interior matte black, pierce a 1 mm needle hole on one end, and tape translucent tracing paper on the other.',
    'Point it at an outdoor tree or window lamp in a dim room: sketch the inverted, real image formed.',
    'Test solid sound conduction: place your ear flat on a long wooden dining table while a family member lightly scratches the far end.',
    'Compare the loudness heard through wood versus through air alone!',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
export default function C6_PhysicsRectilinearPropagationLightSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict & Observe State
  const [predictionMade, setPredictionMade] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Physics Lab Variables (Directly connected to range inputs)
  const [lightSourceSize, setLightSourceSize] = useState<number>(30); // 5 to 50 px
  const [obstacleDistance, setObstacleDistance] = useState<number>(200); // 120 to 300 px
  const [incidentAngle, setIncidentAngle] = useState<number>(45); // 5 to 75 deg
  const [thermalTemp, setThermalTemp] = useState<number>(25); // -20 to 120 C
  const [soundAmplitude, setSoundAmplitude] = useState<number>(40); // 5 to 75
  const [vacuumLevel, setVacuumLevel] = useState<number>(0); // 0 (full air) to 100 (vacuum)

  // Interactive Drag & Drop States
  const [draggedLabel, setDraggedLabel] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Adaptive Scoring, BKT & SRS
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hint & Visual Feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Component FX
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const waveCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Adaptive challenge filter
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentCh = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load existing mastery
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adapt difficulty upon score update
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

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS 1: Thermal Particle Vibration Animation ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid container
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

      // Calculate particle vibration amplitude based on thermalTemp
      const normTemp = Math.max(0, (thermalTemp + 20) / 140); // 0 to 1
      const vibAmp = 1 + normTemp * 9;
      const rows = 4;
      const cols = 8;
      const spacing = 32 + normTemp * 6; // Thermal expansion spacing

      const startX = (canvas.width - cols * spacing) / 2 + spacing / 2;
      const startY = (canvas.height - rows * spacing) / 2 + spacing / 2;

      // Color from cold cyan to hot orange-red
      const r = Math.floor(50 + normTemp * 205);
      const g = Math.floor(160 - normTemp * 90);
      const b = Math.floor(255 - normTemp * 210);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const offsetX = Math.sin(tick * 0.2 + i * 1.5 + j) * vibAmp;
          const offsetY = Math.cos(tick * 0.25 + j * 1.2 + i) * vibAmp;
          const px = startX + j * spacing + offsetX;
          const py = startY + i * spacing + offsetY;

          // Connecting spring lines
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.25)`;
          if (j < cols - 1) {
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(startX + (j + 1) * spacing, startY + i * spacing);
            ctx.stroke();
          }

          // Atom ball
          ctx.beginPath();
          ctx.arc(px, py, 7 + normTemp * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
          ctx.shadowBlur = normTemp * 15;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Title overlay
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Atomic Lattice: T = ${thermalTemp}°C (Expansion: +${(normTemp * 18).toFixed(1)}%)`, 20, 26);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [thermalTemp]);

  // ─── 2D CANVAS 2: Sound Pressure Waves Animation ───
  useEffect(() => {
    const canvas = waveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const renderWave = () => {
      t += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const effectiveAmp = soundAmplitude * (1 - vacuumLevel / 100);
      const waveFreq = 0.03;

      // Draw tuning fork on left
      const forkX = 35;
      const forkY = canvas.height / 2;
      const prongDeflect = Math.sin(t * 8) * (effectiveAmp * 0.2);

      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 4;
      ctx.beginPath();
      // Stem
      ctx.moveTo(forkX - 15, forkY);
      ctx.lineTo(forkX, forkY);
      // Prongs
      ctx.moveTo(forkX, forkY - 25 - prongDeflect);
      ctx.lineTo(forkX, forkY + 25 + prongDeflect);
      ctx.stroke();

      // Particle simulation of compressions and rarefactions
      const numParticles = 140;
      const densityFactor = 1 - vacuumLevel / 100;
      const activeCount = Math.floor(numParticles * densityFactor);

      for (let i = 0; i < activeCount; i++) {
        const baseX = forkX + 20 + (i / numParticles) * (canvas.width - forkX - 40);
        const disp = Math.sin(baseX * waveFreq - t * 4) * effectiveAmp * 0.6;
        const x = baseX + disp;
        const y = 20 + (i % 7) * ((canvas.height - 40) / 6) + Math.sin(i + t) * 3;

        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = effectiveAmp > 50 ? '#38bdf8' : '#818cf8';
        ctx.fill();
      }

      // Vacuum Glass Dome Overlay
      if (vacuumLevel > 0) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 3;
        ctx.strokeRect(10, 8, canvas.width - 20, canvas.height - 16);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.85)';
        ctx.font = '12px sans-serif';
        ctx.fillText(`Vacuum: ${vacuumLevel}% (Audibility: ${Math.max(0, 100 - vacuumLevel)}%)`, 50, 24);
      }

      animId = requestAnimationFrame(renderWave);
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, [soundAmplitude, vacuumLevel]);

  // ─── CALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentCh.hints[nextLevel - 1]) {
      setCurrentHint(currentCh.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(currentCh.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, currentCh]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Brilliant! Light travels in straight lines!'
        : 'Good guess! Let us discover why light creates inverted images and shadows.'
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Physics Labs. Manipulate each simulation to discover the laws!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test all variables without any grading pressure!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the Junior Physicist Board Certification Challenges!');
  }, []);

  const handlePrediction = useCallback((_idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Now interact with the lab to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback(
    (idx: number) => {
      setObservationAnswered(true);
      const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
      audioManager.play(isCorrect ? 'success' : 'pop');
      speechManager.speak(isCorrect ? 'Spot on observation!' : 'Look closely at the angle readouts and try again.');
    },
    []
  );

  const handleToggleVacuum = useCallback(() => {
    setVacuumLevel(prev => (prev === 0 ? 95 : 0));
    audioManager.play('whoosh');
    speechManager.speak(vacuumLevel === 0 ? 'Vacuum pump active! Air evacuated.' : 'Air restored.');
  }, [vacuumLevel]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedLabel(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedLabel) return;
      const isCorrect = currentCh.correctMapping?.[targetId] === draggedLabel;
      if (isCorrect) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedLabel }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedLabel(null);
    },
    [draggedLabel, currentCh]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && currentCh.sortItems) {
        prev = currentCh.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [currentCh]);

  const handleCompleteSimulation = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_PHYSICS_NODES, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have mastered Class 6 Physics fundamentals.');
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
      handleCompleteSimulation();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSimulation]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (currentCh.type === 'classify' || currentCh.type === 'distinguish' || currentCh.type === 'match') {
        isCorrect = answer === currentCh.correctIndex;
      } else if (currentCh.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(currentCh.correctMapping);
      } else if (currentCh.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(currentCh.correctOrder);
      } else if (currentCh.type === 'numeric') {
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(num - (currentCh.correctAnswer || 0)) <= (currentCh.tolerance || 0);
      } else if (currentCh.type === 'construct') {
        isCorrect = answer === currentCh.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent scientific reasoning.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(currentCh.nodeId, currentCh.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + currentCh.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + currentCh.nodeId, 'mastered');
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors(e => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (currentCh.misconceptionIndex !== undefined && !hitMisconceptions.includes(currentCh.misconceptionIndex)) {
          setHitMisconceptions(prev => [...prev, currentCh.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the step-by-step physical principles.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(currentCh.nodeId, currentCh.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + currentCh.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [currentCh, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  // Unmount timer cleanup
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-indigo-400">
              ICSE Class 6 Physics • {subjectConfig.name}
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : difficulty === 'advanced'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="text-right">
            <span className="text-xs text-slate-400">Mastery</span>
            <p className="text-sm font-bold text-amber-400 capitalize">{masteryLevel}</p>
          </div>
        </div>
      </div>

      {/* ─── 1. DISCOVERY PHASE (Curiosity Hook) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-800/60">
            <h2 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span>🔬</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-lg border border-amber-500/30">
                Discovery Challenge
              </span>
              <span className="text-xs text-slate-400">Test your scientific intuition (Ungraded)</span>
            </div>

            <p className="text-base md:text-lg font-semibold text-white mb-4 leading-snug">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Discovery option ${i + 1}: ${opt}`}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all duration-200 border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 opacity-60'
                      : 'bg-slate-800/90 hover:bg-slate-700/90 border-slate-700 text-slate-200 hover:border-indigo-500/50'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-indigo-400">[{String.fromCharCode(65 + i)}]</span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div>
                  <p className={`text-sm font-bold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '✓ Spot on hypothesis!' : '💡 Let’s explore why!'}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter interactive physics laboratory"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 whitespace-nowrap"
                >
                  Enter Visual Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORE PHASE (Interactive Visual Labs) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Slide navigation indicator */}
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Visual Laboratory {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-700'
                  }`}
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
              className="p-5 md:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>⚡</span> {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-xs md:text-sm text-amber-300/90 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── LAB 1: RECTILINEAR PROPAGATION & SHADOW FORMATION ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {/* Predict-Then-Check */}
                  {!predictionMade ? (
                    <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-900/60">
                      <p className="text-xs font-bold text-indigo-300 mb-2">PREDICT BEFORE YOU EXPERIMENT:</p>
                      <p className="text-sm font-semibold text-white mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Prediction: ${opt}`}
                            className="p-2.5 bg-slate-800/90 hover:bg-slate-700 text-left rounded-lg text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-950/30 rounded-lg border border-emerald-800/40 flex items-center justify-between">
                      <span className="text-xs text-emerald-300">
                        ✓ Prediction recorded! Now slide <strong>Source Size</strong> to verify umbra vs penumbra.
                      </span>
                    </div>
                  )}

                  {/* Interactive SVG Optics Bench */}
                  <div className="relative bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-hidden">
                    <svg viewBox="0 0 600 240" className="w-full h-auto">
                      {/* Straight Light Rays */}
                      <line
                        x1={40}
                        y1={120 - lightSourceSize}
                        x2={obstacleDistance}
                        y2={120 - 30}
                        stroke="#fde047"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                      <line
                        x1={obstacleDistance}
                        y1={120 - 30}
                        x2={540}
                        y2={120 - 30 - ((120 - 30 - (120 - lightSourceSize)) / (obstacleDistance - 40)) * (540 - obstacleDistance)}
                        stroke="#fde047"
                        strokeWidth="1.5"
                        opacity="0.6"
                      />
                      <line
                        x1={40}
                        y1={120 + lightSourceSize}
                        x2={obstacleDistance}
                        y2={120 + 30}
                        stroke="#fde047"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                      {/* Cross Rays creating Penumbra */}
                      <line
                        x1={40}
                        y1={120 - lightSourceSize}
                        x2={obstacleDistance}
                        y2={120 + 30}
                        stroke="#fbbf24"
                        strokeWidth="1.2"
                        opacity="0.4"
                      />
                      <line
                        x1={40}
                        y1={120 + lightSourceSize}
                        x2={obstacleDistance}
                        y2={120 - 30}
                        stroke="#fbbf24"
                        strokeWidth="1.2"
                        opacity="0.4"
                      />

                      {/* Light Source */}
                      <rect
                        x={25}
                        y={120 - lightSourceSize}
                        width={15}
                        height={lightSourceSize * 2}
                        rx="4"
                        fill="#facc15"
                        className="animate-pulse"
                      />
                      <text x={32} y={120 - lightSourceSize - 8} textAnchor="middle" fill="#fde047" fontSize="10">
                        {lightSourceSize < 20 ? 'Point LED' : 'Extended Source'}
                      </text>

                      {/* Opaque Ball Obstacle */}
                      <circle cx={obstacleDistance} cy={120} r={30} fill="#475569" stroke="#94a3b8" strokeWidth="2" />
                      <text x={obstacleDistance} y={165} textAnchor="middle" fill="#cbd5e1" fontSize="10">
                        Opaque Obstacle
                      </text>

                      {/* Shadow Screen on Right */}
                      <line x1={540} y1={20} x2={540} y2={220} stroke="#64748b" strokeWidth="6" />
                      <text x={540} y={15} textAnchor="middle" fill="#94a3b8" fontSize="10">
                        Screen
                      </text>

                      {/* Penumbra Upper */}
                      <rect x={535} y={45} width={10} height={40 + lightSourceSize * 0.4} fill="#475569" opacity="0.4" />
                      {/* Umbra Central Core */}
                      <rect x={535} y={90} width={10} height={60} fill="#020617" />
                      {/* Penumbra Lower */}
                      <rect
                        x={535}
                        y={150 - lightSourceSize * 0.4}
                        width={10}
                        height={40 + lightSourceSize * 0.4}
                        fill="#475569"
                        opacity="0.4"
                      />

                      {/* Annotations */}
                      <text x={555} y={124} fill="#f87171" fontSize="10" fontWeight="bold">
                        Umbra (Dark)
                      </text>
                      {lightSourceSize > 25 && (
                        <text x={555} y={65} fill="#fbbf24" fontSize="9">
                          Penumbra (Fuzzy)
                        </text>
                      )}
                    </svg>
                  </div>

                  {/* Real-time Connected Sliders */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Light Source Width</span>
                        <span className="font-bold text-amber-400">{lightSourceSize * 2} mm</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={50}
                        value={lightSourceSize}
                        onChange={(e) => setLightSourceSize(Number(e.target.value))}
                        aria-label="Adjust light source size"
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Obstacle Distance from Source</span>
                        <span className="font-bold text-indigo-400">{obstacleDistance} mm</span>
                      </div>
                      <input
                        type="range"
                        min={120}
                        max={300}
                        value={obstacleDistance}
                        onChange={(e) => setObstacleDistance(Number(e.target.value))}
                        aria-label="Adjust obstacle distance"
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: REFLECTION & PLANE MIRROR LAWS ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="relative bg-slate-950 rounded-xl p-4 border border-slate-800">
                    <svg viewBox="0 0 600 240" className="w-full h-auto">
                      {/* Plane Mirror Base Line */}
                      <line x1={80} y1={200} x2={520} y2={200} stroke="#38bdf8" strokeWidth="5" />
                      {/* Hatching behind mirror */}
                      {Array.from({ length: 22 }).map((_, i) => (
                        <line
                          key={i}
                          x1={95 + i * 19}
                          y1={200}
                          x2={85 + i * 19}
                          y2={212}
                          stroke="#64748b"
                          strokeWidth="1.5"
                        />
                      ))}
                      <text x={300} y={230} textAnchor="middle" fill="#38bdf8" fontSize="10">
                        Flat Plane Mirror (Silvered Surface)
                      </text>

                      {/* Point of incidence */}
                      <circle cx={300} cy={200} r={4} fill="#ef4444" />

                      {/* Normal */}
                      <line x1={300} y1={30} x2={300} y2={200} stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 4" />
                      <text x={305} y={45} fill="#94a3b8" fontSize="10" fontStyle="italic">
                        Normal (90°)
                      </text>

                      {/* Incident Ray */}
                      {(() => {
                        const rad = (incidentAngle * Math.PI) / 180;
                        const len = 170;
                        const ix = 300 - Math.sin(rad) * len;
                        const iy = 200 - Math.cos(rad) * len;
                        const rx = 300 + Math.sin(rad) * len;
                        const ry = 200 - Math.cos(rad) * len;

                        return (
                          <>
                            <line x1={ix} y1={iy} x2={300} y2={200} stroke="#22c55e" strokeWidth="3" />
                            <circle cx={ix} cy={iy} r={6} fill="#22c55e" />
                            <text x={ix - 10} y={iy - 5} fill="#22c55e" fontSize="10" fontWeight="bold">
                              Laser Source
                            </text>

                            <line x1={300} y1={200} x2={rx} y2={ry} stroke="#f43f5e" strokeWidth="3" />
                            <circle cx={rx} cy={ry} r={5} fill="#f43f5e" />

                            <path
                              d={`M 300 130 A 70 70 0 0 0 ${300 - Math.sin(rad) * 70} ${200 - Math.cos(rad) * 70}`}
                              fill="none"
                              stroke="#22c55e"
                              strokeWidth="2"
                            />
                            <text x={265 - incidentAngle * 0.4} y={150} fill="#22c55e" fontSize="11" fontWeight="bold">
                              i = {incidentAngle}°
                            </text>

                            <path
                              d={`M 300 130 A 70 70 0 0 1 ${300 + Math.sin(rad) * 70} ${200 - Math.cos(rad) * 70}`}
                              fill="none"
                              stroke="#f43f5e"
                              strokeWidth="2"
                            />
                            <text x={315 + incidentAngle * 0.4} y={150} fill="#f43f5e" fontSize="11" fontWeight="bold">
                              r = {incidentAngle}°
                            </text>
                          </>
                        );
                      })()}
                    </svg>
                  </div>

                  {/* Real-time Angle slider */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="w-full md:w-2/3">
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Incident Angle (i) from Normal</span>
                        <span className="font-bold text-emerald-400">{incidentAngle}°</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={75}
                        value={incidentAngle}
                        onChange={(e) => setIncidentAngle(Number(e.target.value))}
                        aria-label="Set angle of incidence"
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-center min-w-[160px]">
                      <span className="text-xs text-slate-400 block">Law 1 Verification</span>
                      <span className="text-sm font-bold text-indigo-300">
                        i ({incidentAngle}°) = r ({incidentAngle}°)
                      </span>
                    </div>
                  </div>

                  {/* Observation Question */}
                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-xs font-bold text-amber-300 mb-2">SCIENTIFIC OBSERVATION:</p>
                      <p className="text-sm font-semibold text-white mb-3">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            aria-label={`Observation answer: ${opt}`}
                            className="p-2.5 bg-slate-800 text-left rounded-lg text-xs text-slate-200 border border-slate-700 hover:border-indigo-500"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── LAB 3: HEAT ENERGY & THERMAL EXPANSION ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Canvas Atomic Lattice */}
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-xs font-bold text-indigo-400 block mb-2">
                        Microscopic View: Atomic Kinetic Vibration
                      </span>
                      <canvas ref={canvasRef} width={280} height={180} className="w-full rounded-lg bg-slate-900" />
                    </div>

                    {/* Macroscopic Ball and Ring Activity */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-indigo-400 block mb-1">
                          Macroscopic Demonstration: Ball & Ring
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          At room temperature (25°C), the brass sphere easily passes through the ring gauge. Heat it to see thermal expansion prevent passage!
                        </p>
                      </div>

                      <div className="my-4 flex items-center justify-center">
                        <svg viewBox="0 0 240 100" className="w-48 h-auto">
                          {/* Gauge Ring */}
                          <ellipse cx={120} cy={65} rx={32} ry={12} fill="none" stroke="#38bdf8" strokeWidth="4" />
                          <rect x={152} y={62} width={50} height={6} rx="2" fill="#64748b" />

                          {/* Heated Ball */}
                          {(() => {
                            const ballRadius = 24 + ((thermalTemp + 20) / 140) * 12;
                            const fits = ballRadius < 29;
                            return (
                              <>
                                <circle
                                  cx={120}
                                  cy={fits ? 65 : 42}
                                  r={ballRadius}
                                  fill={thermalTemp > 60 ? '#f97316' : '#e2e8f0'}
                                  stroke="#0f172a"
                                  strokeWidth="2"
                                />
                                <text
                                  x={120}
                                  y={fits ? 69 : 46}
                                  textAnchor="middle"
                                  fill="#0f172a"
                                  fontSize="9"
                                  fontWeight="bold"
                                >
                                  {fits ? 'Passes ✓' : 'Stuck! ✗'}
                                </text>
                              </>
                            );
                          })()}
                        </svg>
                      </div>

                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-center">
                        <span className="text-xs text-slate-400 block">Expansion State</span>
                        <span className={`text-xs font-bold ${thermalTemp > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {thermalTemp > 50
                            ? 'Expanded! Ball diameter > Ring aperture.'
                            : 'Normal! Ball slips through freely.'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Real-time Temperature slider */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Heat Source Temperature (T)</span>
                      <span className="font-bold text-rose-400">{thermalTemp} °C</span>
                    </div>
                    <input
                      type="range"
                      min={-20}
                      max={120}
                      value={thermalTemp}
                      onChange={(e) => setThermalTemp(Number(e.target.value))}
                      aria-label="Set thermal temperature"
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* ─── LAB 4: CHANGE OF STATE DUE TO HEAT ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'solid', label: 'Solid Ice (≤ 0°C)', temp: -10, color: 'border-cyan-500 text-cyan-300' },
                      { id: 'liquid', label: 'Liquid Water (25°C)', temp: 25, color: 'border-blue-500 text-blue-300' },
                      { id: 'gas', label: 'Water Vapour (≥ 100°C)', temp: 105, color: 'border-amber-500 text-amber-300' },
                    ].map(item => (
                      <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setThermalTemp(item.temp)}
                        aria-label={`Select state: ${item.label}`}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          (item.temp <= 0 && thermalTemp <= 0) ||
                          (item.temp > 0 && item.temp < 100 && thermalTemp > 0 && thermalTemp < 100) ||
                          (item.temp >= 100 && thermalTemp >= 100)
                            ? `bg-slate-800 ${item.color} font-bold shadow-md`
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="text-xs block">{item.label}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* State Visualizer Box */}
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center space-y-3">
                    <div className="h-32 flex items-center justify-center">
                      {thermalTemp <= 0 ? (
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center">
                          <span className="text-5xl block">🧊</span>
                          <span className="text-xs font-bold text-cyan-300 mt-2 block">
                            Rigid Lattice (Melting Point = 0°C)
                          </span>
                          <span className="text-[11px] text-slate-400">Particles held tightly by bonds.</span>
                        </motion.div>
                      ) : thermalTemp < 100 ? (
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center">
                          <span className="text-5xl block">💧</span>
                          <span className="text-xs font-bold text-blue-300 mt-2 block">
                            Fluid Liquid (Free to slide past each other)
                          </span>
                          <span className="text-[11px] text-slate-400">Heat absorbed: particles loosened.</span>
                        </motion.div>
                      ) : (
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center">
                          <span className="text-5xl block animate-bounce">♨️</span>
                          <span className="text-xs font-bold text-amber-300 mt-2 block">
                            Gaseous Vapour (Boiling Point = 100°C)
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Particles broken free; flying at high speeds!
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: SOUND WAVES, AMPLITUDE & VACUUM ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  {/* Canvas Wave Visualizer */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-indigo-400">
                        Acoustic Compression Waves & Bell Jar Simulation
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleToggleVacuum}
                        aria-label="Toggle bell jar vacuum pump"
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          vacuumLevel > 0
                            ? 'bg-rose-600 hover:bg-rose-500 text-white'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        }`}
                      >
                        {vacuumLevel > 0 ? 'Restore Air in Jar' : 'Activate Vacuum Pump (Evacuate)'}
                      </motion.button>
                    </div>

                    <canvas ref={waveCanvasRef} width={500} height={140} className="w-full rounded-lg bg-slate-950" />
                  </div>

                  {/* Real-time Amplitude slider */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Vibration Amplitude (Striking Force)</span>
                        <span className="font-bold text-sky-400">{soundAmplitude} mm</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={75}
                        value={soundAmplitude}
                        onChange={(e) => setSoundAmplitude(Number(e.target.value))}
                        aria-label="Set sound vibration amplitude"
                        className="w-full accent-sky-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-400 block">Loudness Output</span>
                        <span className="text-sm font-bold text-sky-300">
                          {vacuumLevel > 50
                            ? 'Silent (0 dB in Vacuum)'
                            : soundAmplitude > 45
                            ? 'LOUD Boom (~85 dB)'
                            : 'Soft Whisper (~30 dB)'}
                        </span>
                      </div>
                      <span className="text-2xl">{vacuumLevel > 50 ? '🔇' : soundAmplitude > 45 ? '📢' : '🔈'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Prev / Next Exploration Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  aria-label="Go to previous lab"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    aria-label="Proceed to next lab"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    aria-label="Advance to free play sandbox"
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                  >
                    Open Sandbox Playground →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PLAYGROUND (Free Exploration) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <h2 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
              <span>🎮</span> Free Play Physics Sandbox
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1">
              Test any combination of light rays, heat temperatures, and sound vibrations freely without timers or grading!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mirror sandbox */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-indigo-300 block">1. Optics Angle Adjuster</span>
              <input
                type="range"
                min={5}
                max={80}
                value={incidentAngle}
                onChange={(e) => setIncidentAngle(Number(e.target.value))}
                aria-label="Adjust incidence angle in sandbox"
                className="w-full accent-emerald-500"
              />
              <p className="text-xs text-slate-300">
                Current Angle: <strong>i = {incidentAngle}°</strong> | <strong>r = {incidentAngle}°</strong>
              </p>
            </div>

            {/* Thermal Sandbox */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-rose-300 block">2. Thermal State Controller</span>
              <input
                type="range"
                min={-20}
                max={120}
                value={thermalTemp}
                onChange={(e) => setThermalTemp(Number(e.target.value))}
                aria-label="Adjust temperature in sandbox"
                className="w-full accent-rose-500"
              />
              <p className="text-xs text-slate-300">
                Temperature: <strong>{thermalTemp}°C</strong> (
                {thermalTemp <= 0 ? 'Solid Ice' : thermalTemp < 100 ? 'Liquid Water' : 'Boiling Steam'})
              </p>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Start certification challenges"
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-indigo-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-600/30"
            >
              I am Ready for Challenges! 🚀
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE (Adaptive Questions) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Progress Header */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-indigo-400">
                Question {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 rounded-md border border-slate-700 uppercase font-semibold">
                NEP Competency: {currentCh.competencyLevel}
              </span>
            </div>

            {/* Framer motion progress bar */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Challenge Box */}
          <div
            className={`p-5 md:p-6 rounded-2xl border transition-all duration-300 ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 shadow-lg shadow-rose-950/50'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-bold text-white mb-4 leading-snug">{currentCh.question}</p>

            {/* 1. MCQ Classification / Distinguish / Match */}
            {(currentCh.type === 'classify' || currentCh.type === 'distinguish' || currentCh.type === 'match') &&
              currentCh.options && (
                <div className="grid grid-cols-1 gap-2.5">
                  {currentCh.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`w-full p-4 text-left rounded-xl text-sm font-medium transition-all duration-200 border ${
                        showExplanation && i === currentCh.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/40'
                          : wrongFlash
                          ? 'bg-rose-900/40 border-rose-600 text-rose-200'
                          : 'bg-slate-800/80 hover:bg-slate-700/90 border-slate-700 text-slate-200 hover:border-indigo-500/50'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-indigo-400">
                          {showExplanation && i === currentCh.correctIndex ? '✓' : `[${String.fromCharCode(65 + i)}]`}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* 2. Drag-Label Diagram Challenge */}
            {currentCh.type === 'drag-label' && currentCh.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag each label into the diagram targets:</span>
                  {currentCh.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Draggable label: ${item.label}`}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow-sm"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* SVG Drop Targets */}
                <svg viewBox="0 0 500 200" className="w-full bg-slate-950 rounded-xl border border-slate-800">
                  {/* Source Slot */}
                  <rect
                    x={20}
                    y={50}
                    width={100}
                    height={50}
                    rx={8}
                    fill="#1e293b"
                    stroke="#475569"
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('part_source')}
                  />
                  <text x={70} y={80} textAnchor="middle" fill="#94a3b8" fontSize="10">
                    {droppedLabels.part_source || '[Drop Source]'}
                  </text>

                  {/* Obstacle Slot */}
                  <rect
                    x={180}
                    y={50}
                    width={120}
                    height={50}
                    rx={8}
                    fill="#1e293b"
                    stroke="#475569"
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('part_obstacle')}
                  />
                  <text x={240} y={80} textAnchor="middle" fill="#94a3b8" fontSize="10">
                    {droppedLabels.part_obstacle || '[Drop Obstacle]'}
                  </text>

                  {/* Umbra Slot */}
                  <rect
                    x={350}
                    y={30}
                    width={130}
                    height={40}
                    rx={8}
                    fill="#1e293b"
                    stroke="#475569"
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('part_umbra')}
                  />
                  <text x={415} y={55} textAnchor="middle" fill="#94a3b8" fontSize="10">
                    {droppedLabels.part_umbra || '[Drop Umbra]'}
                  </text>

                  {/* Penumbra Slot */}
                  <rect
                    x={350}
                    y={90}
                    width={130}
                    height={40}
                    rx={8}
                    fill="#1e293b"
                    stroke="#475569"
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('part_penumbra')}
                  />
                  <text x={415} y={115} textAnchor="middle" fill="#94a3b8" fontSize="10">
                    {droppedLabels.part_penumbra || '[Drop Penumbra]'}
                  </text>
                </svg>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Validate diagram labels"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {/* 3. Drag-Sort Challenge */}
            {currentCh.type === 'drag-sort' && currentCh.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder the sequence into the correct physical order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === currentCh.sortItems.length
                    ? sortArrangement.map(idx => currentCh.sortItems![idx])
                    : currentCh.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedLabel(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedLabel || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      className="p-3 bg-slate-800 hover:bg-slate-750 rounded-xl text-xs md:text-sm text-slate-200 border border-slate-700 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-indigo-600/40 text-indigo-300 font-bold flex items-center justify-center text-xs">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length > 0
                        ? sortArrangement
                        : currentCh.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  aria-label="Check sequence order"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold mt-2"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* 4. Numeric Challenge */}
            {currentCh.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.01"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numeric answer"
                    aria-label="Numeric input value"
                    className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm font-semibold focus:outline-none focus:border-indigo-500 w-48"
                  />
                  <span className="text-xs font-bold text-slate-400">{currentCh.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    aria-label="Submit numeric response"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                  >
                    Calculate & Check
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. Construct Challenge */}
            {currentCh.type === 'construct' && currentCh.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{currentCh.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {currentCh.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add part: ${part}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[80px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-indigo-900/60 text-indigo-200 border border-indigo-700 rounded-md text-xs flex items-center gap-1.5"
                    >
                      {p}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        aria-label={`Remove part: ${p}`}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click parts above to construct the ray path</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  aria-label="Verify construction"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  Verify Construction
                </motion.button>
              </div>
            )}

            {/* ─── PROGRESSIVE STEP-BY-STEP EXPLANATION ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 text-sm">💡</span>
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    ICSE Scientific Explanation:
                  </span>
                </div>

                {currentCh.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-amber-100/90 leading-relaxed"
                    >
                      <strong className="text-amber-400 font-semibold">{i + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                  currentCh.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    aria-label="Show next explanation step"
                    className="px-3.5 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold mt-1"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  currentCh.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    aria-label="Proceed to next challenge"
                    className="block px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 mt-3"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length
                      ? 'Finish & View Certification Results →'
                      : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ──��� */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/80 to-slate-900 rounded-2xl border border-indigo-700 text-center space-y-3">
            <span className="text-5xl block animate-bounce">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Simulation Complete!</h2>
            <p className="text-sm text-slate-300">You have completed all Light, Heat and Sound physics modules.</p>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-xl font-black text-emerald-400">{Math.max(0, 100 - errors * 4)}%</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block">Mastery Tier</span>
                <span className="text-xl font-black text-amber-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-800/60 text-center">
            <p className="text-lg font-black text-emerald-300 tracking-wide uppercase">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </p>
            <p className="text-xs text-slate-300 mt-1">
              {errors === 0
                ? 'Flawless scientific accuracy! You mastered all ICSE Class 6 Physics concepts.'
                : errors <= 3
                ? 'Your physical reasoning on optics, heat, and acoustics is very strong.'
                : 'Review your misconception profile below to reinforce tricky topics.'}
            </p>
          </div>

          {/* Misconception Review */}
          {hitMisconceptions.length > 0 && misconceptions && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                Your Personal Concept Corrections:
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300 font-semibold">✓ ICSE Fact: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition (SRS) Schedule Visibility */}
          <div className="p-5 bg-amber-950/40 rounded-2xl border border-amber-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">📅</span>
                <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Spaced Repetition Schedule (SM-2 SRS)
                </h3>
              </div>
              <p className="text-sm text-slate-200">
                Next recommended review:{' '}
                <strong className="text-amber-400 font-bold">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </strong>
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {errors === 0
                  ? 'Excellent mastery! 0 errors — scheduled for long interval review in 7 days.'
                  : errors <= 3
                  ? 'Strong grasp! 1-3 errors — scheduled for review in 3 days.'
                  : 'Needs reinforcement! 4+ errors — scheduled for review in 1 day.'}
              </p>
            </div>
            <span className="px-4 py-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap">
              {errors === 0 ? 'review in 7 days' : errors <= 3 ? '3 days' : '1 day'}
            </span>
          </div>

          {/* Real-World Activity Project */}
          <div className="p-5 bg-indigo-950/50 rounded-2xl border border-indigo-800/60 space-y-3">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>🛠️</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ol className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-bold text-indigo-400">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}
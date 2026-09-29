'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NAMED CONSTANTS FOR CISCE NODE IDS ───
const NODE_C7_PHY_021 = 'c7_phy_021'; // Heat transfer - conduction
const NODE_C7_PHY_022 = 'c7_phy_022'; // Heat transfer - convection
const NODE_C7_PHY_023 = 'c7_phy_023'; // Heat transfer - radiation
const NODE_C7_PHY_024 = 'c7_phy_024'; // Reflection of sound
const NODE_C7_PHY_025 = 'c7_phy_025'; // Absorption of sound
const NODE_C7_PHY_026 = 'c7_phy_026'; // Echo
const NODE_C7_PHY_027 = 'c7_phy_027'; // Reverberation
const NODE_C7_PHY_028 = 'c7_phy_028'; // Electric current as flow of charge
const NODE_C7_PHY_029 = 'c7_phy_029'; // Circuit components (ammeter, voltmeter)
const NODE_C7_PHY_030 = 'c7_phy_030'; // Potential difference and voltage

const ALL_NODE_IDS = [
  NODE_C7_PHY_021,
  NODE_C7_PHY_022,
  NODE_C7_PHY_023,
  NODE_C7_PHY_024,
  NODE_C7_PHY_025,
  NODE_C7_PHY_026,
  NODE_C7_PHY_027,
  NODE_C7_PHY_028,
  NODE_C7_PHY_029,
  NODE_C7_PHY_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Himalayan Science Expedition',
  intro: 'You are the chief physicist for an expedition to an Indian Himalayan research base at Leh-Ladakh. The station is battling three urgent engineering challenges: building an ultra-efficient solar-heated shelter, designing an acoustic alarm system for deep valleys, and calibrating a low-temperature backup electric circuit.',
  context: 'To succeed, you must master energy transfer by conduction, convection, and radiation, tame echoes and reverberations across mountain walls, and balance electric charge flow and voltage meters.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In the freezing Leh winter (-20°C), an expedition researcher heats the top of a test tube filled with water that has ice trapped at the bottom with wire gauze. What will happen to the ice?',
  options: [
    'The ice melts instantly because heat travels downwards through water quickly',
    'The water at the top boils while the ice at the bottom stays frozen for a long time',
    'The whole tube shatters because water cannot conduct any heat',
    'The ice turns directly into steam before the water at the top warms',
  ],
  correctIndex: 1,
  hintAfter: 'Water is a poor conductor of heat! Since warm water rises (convection only goes upward), heat does not easily reach the bottom.',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (Nodes 021 - 030) ---
  {
    id: 'ch_01_f',
    nodeId: NODE_C7_PHY_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When one end of a copper rod is heated over a burner, how does thermal energy reach the cold end?',
    options: [
      'Particles vibrate in their fixed lattice spots and pass energy by collision, aided by free electrons',
      'Hot copper particles physically migrate from the hot end to the cold end',
      'Infrared light beams travel inside the metal hollows',
      'Air currents inside the solid rod carry the heat',
    ],
    correctIndex: 0,
    explanation: 'In conduction within solids, particles do NOT move from place to place. They vibrate more vigorously about fixed mean positions and collide with neighbours. In metals, free electrons also rapidly transport energy.',
    hints: [
      'Think about whether solid atoms can freely swim around inside a metal crystal.',
      'Particles stay at their posts and jostle their neighbors like a relay race.',
      'Conduction involves vibrational energy transfer and free electron drift, not bulk particle movement.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_f',
    nodeId: NODE_C7_PHY_022,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Label the components of a liquid convection loop in a heated beaker.',
    dragItems: [
      { label: 'Warm Less Dense Fluid (Rises)', targetId: 'zone_up' },
      { label: 'Cool Denser Fluid (Sinks)', targetId: 'zone_down' },
      { label: 'Heat Source (Flame)', targetId: 'zone_heat' },
      { label: 'KMnO4 Tracer Stream', targetId: 'zone_tracer' },
    ],
    correctMapping: {
      zone_up: 'Warm Less Dense Fluid (Rises)',
      zone_down: 'Cool Denser Fluid (Sinks)',
      zone_heat: 'Heat Source (Flame)',
      zone_tracer: 'KMnO4 Tracer Stream',
    },
    explanation: 'Heating from below expands the bottom fluid, lowering its density. It rises upward while denser, cooler liquid sinks to replace it, establishing a circulating convection loop.',
    hints: [
      'What happens to fluid when heated? It expands and becomes lighter.',
      'The flame sits at the base, driving warm fluid up and cool fluid down.',
      'Match the upward arrows to rising warm fluid and downward arrows to sinking cool fluid.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_f',
    nodeId: NODE_C7_PHY_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How does the Sun\'s thermal radiation cross the 150 million kilometers of empty outer space to warm the Earth?',
    options: [
      'As electromagnetic waves (infrared) which require no material medium or particles',
      'By conduction along cosmic dust filaments',
      'By convection currents of solar atmospheric gases',
      'Through longitudinal sound vibrations in space',
    ],
    correctIndex: 0,
    explanation: 'Radiation is the transfer of heat by electromagnetic waves (predominantly infrared). It is the only mode of heat transfer that operates through a vacuum without any physical medium.',
    hints: [
      'Space between planets is a near-perfect vacuum containing virtually no particles.',
      'Conduction and convection strictly need atoms or molecules to carry heat.',
      'Electromagnetic waves can travel through pure empty space at the speed of light.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04_f',
    nodeId: NODE_C7_PHY_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A sound wave strikes a flat granite cliff face at an angle of 35° to the normal. What is the angle of reflection?',
    options: ['35° to the normal', '55° to the normal', '70° to the normal', '0° along the normal'],
    correctIndex: 0,
    explanation: 'Sound obeys the universal laws of wave reflection: Angle of Incidence (i) = Angle of Reflection (r), both measured with respect to the normal.',
    hints: [
      'Recall the first law of reflection for light and sound.',
      'The angle of incidence strictly equals the angle of reflection.',
      'If i = 35°, then r must also be 35°.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05_f',
    nodeId: NODE_C7_PHY_025,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following materials is the BEST absorber of sound in a lecture hall?',
    options: [
      'Porous acoustic foam and heavy velvet curtains',
      'Polished marble flooring',
      'Smooth toughened glass windows',
      'Rigid stainless steel wall panels',
    ],
    correctIndex: 0,
    explanation: 'Soft, porous materials trap sound waves in tiny air pockets. Friction converts the vibrational kinetic energy into microscopic heat, absorbing the sound rather than reflecting it.',
    hints: [
      'Hard and smooth surfaces reflect sound, creating sharp echoes.',
      'Look for soft, spongy, porous textures that can trap vibrating air particles.',
      'Acoustic foam and heavy curtains dissipate sound energy into heat.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_06_f',
    nodeId: NODE_C7_PHY_028,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A steady electric current of 0.40 A flows through an LED headlamp at the research camp for 50 seconds. What total charge Q (in Coulombs) passed through the lamp?',
    correctAnswer: 20,
    tolerance: 0.5,
    unit: 'Coulombs',
    explanation: 'Using Q = I × t: Q = 0.40 A × 50 s = 20 Coulombs. One ampere equals one Coulomb per second.',
    hints: [
      'Recall the charge formula relating current and time: Q = I × t.',
      'Multiply the current in Amperes by the time in seconds: 0.40 × 50.',
      '0.40 × 50 = 20 C.',
    ],
  },
  {
    id: 'ch_07_f',
    nodeId: NODE_C7_PHY_029,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How must an Ammeter and a Voltmeter be connected to measure the current through and voltage across a heating resistor?',
    options: [
      'Ammeter in series; Voltmeter in parallel across the resistor',
      'Ammeter in parallel across the resistor; Voltmeter in series',
      'Both Ammeter and Voltmeter in series',
      'Both Ammeter and Voltmeter in parallel across the power supply',
    ],
    correctIndex: 0,
    explanation: 'An ammeter has very low resistance and must be in series to sample full flow without choking. A voltmeter has very high resistance and is placed in parallel to sense the potential difference without drawing current.',
    hints: [
      'Current is flow (series inline meter); Voltage is push across two points (parallel gauge).',
      'An ammeter inline has low resistance; a voltmeter across has high resistance.',
      'Ammeter -> Series, Voltmeter -> Parallel.',
    ],
    misconceptionIndex: 5,
  },

  // --- STANDARD TIER (Nodes 021 - 030) ---
  {
    id: 'ch_08_s',
    nodeId: NODE_C7_PHY_026,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'At 20°C, sound travels in air at 340 m/s. Given human persistence of hearing is 0.10 s, calculate the MINIMUM one-way distance (in metres) to a cliff needed to hear a distinct echo.',
    correctAnswer: 17,
    tolerance: 0.2,
    unit: 'metres',
    explanation: 'Total to-and-fro distance = v × t = 340 m/s × 0.10 s = 34 m. The one-way distance d = (v × t) / 2 = 34 / 2 = 17 metres.',
    hints: [
      'Remember that sound must travel TO the cliff and RETURN to your ears (2 × distance).',
      'Total distance in 0.1 s is 340 × 0.1 = 34 m.',
      'Divide the two-way path by 2: 34 / 2 = 17 m.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_09_s',
    nodeId: NODE_C7_PHY_027,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does reverberation in a large unfurnished prayer hall fundamentally differ from an echo in a mountain valley?',
    options: [
      'Reverberation consists of multiple rapid reflections arriving under 0.1 s that overlap into a blur; an echo is a single distinct reflection arriving after ≥ 0.1 s',
      'Echoes occur only in liquids, whereas reverberation occurs only in solids',
      'Reverberation makes sounds crisper and louder, while echoes completely destroy sound energy',
      'Echo is caused by wave refraction; reverberation is caused by radiation',
    ],
    correctIndex: 0,
    explanation: 'Reverberation is the lingering persistence of sound caused by continuous successive reflections arriving with intervals shorter than the 0.1 s persistence of hearing, causing blurring. An echo arrives after ≥ 0.1 s as a distinct repeat.',
    hints: [
      'Think about the 0.1 s persistence of hearing threshold.',
      'In reverberation, multiple surfaces reflect sound so rapidly that they merge into a boom.',
      'Echo = distinct repeat (t ≥ 0.1 s); Reverberation = overlapping blur (gaps < 0.1 s).',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_10_s',
    nodeId: NODE_C7_PHY_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 12.0 V solar storage battery does 96.0 Joules of electrical work to drive electric charge through a communications transceiver. How many Coulombs of charge were transferred?',
    correctAnswer: 8,
    tolerance: 0.1,
    unit: 'Coulombs',
    explanation: 'From V = W / Q, rearranging gives Q = W / V = 96.0 J / 12.0 V = 8.0 Coulombs. One volt equals one Joule per Coulomb.',
    hints: [
      'Use the potential difference definition: V = W / Q (Volts = Joules / Coulombs).',
      'Rearrange to solve for charge: Q = W / V.',
      'Calculate 96.0 / 12.0.',
    ],
    misconceptionIndex: 8,
  },
  {
    id: 'ch_11_s',
    nodeId: NODE_C7_PHY_023,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Rank the following surfaces in order of their ability to ABSORB radiant heat (Highest Absorber first to Worst Absorber):',
    sortItems: [
      'Matte dull charcoal-black painted sheet',
      'Rough dark brown clay brick',
      'Smooth glazed white ceramic tile',
      'Polished electroplated mirror-finish silver sheet',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Dull, dark, and rough surfaces are the best absorbers and radiators of thermal infrared waves. Smooth, light, and polished shiny surfaces reflect radiant heat away.',
    hints: [
      'Dark and matte colors absorb radiation best.',
      'Rough textures absorb more than smooth glossy surfaces.',
      'Mirror-shiny silver is the best reflector (worst absorber) and goes last.',
    ],
  },
  {
    id: 'ch_12_s',
    nodeId: NODE_C7_PHY_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Along the coastal waters of Kochi during a sunny afternoon, which natural convection phenomenon occurs and why?',
    options: [
      'Sea breeze: Land heats up faster than the sea; warm air above land rises and cool sea air rushes inland',
      'Land breeze: Sea heats up faster than land; cool air blows from land to sea',
      'Sea breeze: Water molecules conduct heat into clouds creating high pressure over land',
      'Land breeze: Gravity pulls air down towards the ocean at midday',
    ],
    correctIndex: 0,
    explanation: 'Land has a lower specific heat capacity and warms faster by day. The air over land expands, becomes less dense, and rises. Cooler denser air above the sea flows inland as a refreshing Sea Breeze.',
    hints: [
      'Does land or sea get hotter under the midday sun?',
      'Hot air rises over the hotter land, creating a low-pressure area.',
      'Cool air from the sea rushes in to replace it -> Sea breeze (sea to land).',
    ],
  },
  {
    id: 'ch_13_s',
    nodeId: NODE_C7_PHY_028,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In a copper wire carrying DC current from a dry cell, what is the exact relationship between conventional current and electron flow?',
    options: [
      'Conventional current flows from positive to negative terminal; electrons physically drift from negative to positive terminal',
      'Conventional current and electron drift both move strictly from negative to positive terminal',
      'Conventional current is for AC circuits only; DC has only positive proton motion',
      'Electrons remain stationary while positive charges move through the copper wire',
    ],
    correctIndex: 0,
    explanation: 'Historically, conventional current was defined as positive charge flow (Positive -> Negative). In reality, mobile negative electrons in metals drift in the opposite direction (Negative -> Positive). Circuit diagrams follow the conventional direction.',
    hints: [
      'Remember the historical convention established before electrons were discovered.',
      'Electrons carry negative charge and are repelled by the negative terminal.',
      'Conventional current = (+) to (-); Real electron flow = (-) to (+).',
    ],
    misconceptionIndex: 9,
  },
  {
    id: 'ch_14_s',
    nodeId: NODE_C7_PHY_029,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Construct the correct circuit loop to measure the current of a 3V lamp and its terminal voltage without damaging any meters:',
    availableParts: ['[Cell (+)]', '[Ammeter in Series]', '[Lamp]', '[Cell (-)]', '[Voltmeter in Parallel across Lamp]'],
    targetState: '[Cell (+)] [Ammeter in Series] [Lamp] [Cell (-)] [Voltmeter in Parallel across Lamp]',
    validationHint: 'Add components in proper series loop order, then attach the parallel voltmeter across the lamp.',
    explanation: 'The series loop: Cell(+) -> Ammeter -> Lamp -> Cell(-). The Voltmeter is connected in parallel across the two terminals of the lamp.',
    hints: [
      'First establish the complete main series loop with the ammeter in line.',
      'Never place the ammeter across the lamp (that causes a short circuit).',
      'Attach the voltmeter across the lamp at the end.',
    ],
  },

  // --- ADVANCED TIER (Nodes 021 - 030) ---
  {
    id: 'ch_15_a',
    nodeId: NODE_C7_PHY_026,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An expedition leader standing in a gorge at Leh shouts and hears the first echo after 2.4 seconds (v = 330 m/s in cold mountain air). How far away (in metres) is the gorge wall?',
    correctAnswer: 396,
    tolerance: 1,
    unit: 'metres',
    explanation: 'Distance d = (v × t) / 2 = (330 m/s × 2.4 s) / 2 = 792 / 2 = 396 metres.',
    hints: [
      'Echo formula is d = (v × t) / 2.',
      'Multiply velocity by time: 330 × 2.4 = 792 m.',
      'Divide by 2 for one-way distance: 792 / 2 = 396 m.',
    ],
  },
  {
    id: 'ch_16_a',
    nodeId: NODE_C7_PHY_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How does an insulated Thermos (vacuum) flask simultaneously eliminate all three modes of heat transfer (conduction, convection, radiation)?',
    options: [
      'Vacuum between double glass walls stops conduction and convection; silvered mirror surfaces reflect radiant infrared waves back',
      'Thick solid lead walls stop conduction; vacuum absorbs radiation; air vents circulate convection away',
      'Heavy plastic foam stops radiation; vacuum attracts electrons; silver absorbs infrared',
      'Double glass panes radiate heat outwards while allowing cool air to conduct inside',
    ],
    correctIndex: 0,
    explanation: 'A vacuum contains no particles, preventing conduction and convection. The silvered mirror walls reflect radiant heat back into the liquid, minimizing radiation loss.',
    hints: [
      'Conduction and convection cannot occur without a medium (vacuum stops both).',
      'What stops radiation? Shiny silver surfaces that reflect infrared waves.',
      'Look for the option addressing vacuum for medium-based modes and silvering for radiation.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_17_a',
    nodeId: NODE_C7_PHY_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An architect evaluates an acoustic design for a new 1000-seat university auditorium in Bengaluru. Why should the reverberation time be tuned to an OPTIMUM ~1.2 s rather than reduced to 0.0 s?',
    options: [
      'Zero reverberation makes sound memory flat and unnatural, losing vocal warmth and musical richness; optimum reverberation blends notes pleasantly without blurring syllables',
      'Zero reverberation causes sound waves to combust and overheat the acoustic tiles',
      'Sound cannot travel in a room unless reverberation reflects 90% of the energy back to the stage',
      'High reverberation of 0.0 s increases sound velocity to ultrasonic speeds',
    ],
    correctIndex: 0,
    explanation: 'Complete elimination of reverberation makes acoustic spaces uncomfortably "dead" and dry. An optimum reverberation time preserves acoustic fullness and musical resonance while preventing overlap of spoken syllables.',
    hints: [
      'Think about how singing sounds in an empty tiled bathroom vs inside a wardrobe full of clothes.',
      'A completely dead room feels unnatural and makes music sound thin.',
      'Controlled reverberation enriches tone while avoiding chaotic word blurring.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_18_a',
    nodeId: NODE_C7_PHY_030,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A high-power electric kettle is connected to 220 V Indian domestic AC mains. If 30 Coulombs of charge pass through the heating coil in 15 seconds, calculate the total electrical energy W transferred in Joules.',
    correctAnswer: 6600,
    tolerance: 10,
    unit: 'Joules',
    explanation: 'Using W = V × Q: W = 220 V × 30 C = 6600 Joules. (Also current I = Q/t = 30/15 = 2 A, Power P = V×I = 440 W, Energy = P×t = 440×15 = 6600 J).',
    hints: [
      'Recall W = V × Q (Work/Energy = Voltage × Charge).',
      'Multiply voltage (220 V) by the total charge (30 C).',
      '220 × 30 = 6600 Joules.',
    ],
  },
  {
    id: 'ch_19_a',
    nodeId: NODE_C7_PHY_021,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In the Ingenhousz experiment, identical rods of different materials are coated in wax and heated at one end. Arrange the materials in the order the wax will melt fastest to slowest:',
    sortItems: [
      'Copper rod (High free-electron density)',
      'Aluminium rod (Good metallic conductor)',
      'Iron rod (Moderate metallic conductor)',
      'Glass rod (Non-metallic insulator)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Thermal conductivity order: Copper > Aluminium > Iron > Glass. Metals with plentiful free electrons conduct fastest; non-metallic insulators with bound electrons conduct very slowly.',
    hints: [
      'Which metal is prized in cooking bottom bases for fastest heat conduction? Copper!',
      'Aluminium conducts faster than iron.',
      'Glass lacks free electrons and conducts slowest.',
    ],
  },
  {
    id: 'ch_20_a',
    nodeId: NODE_C7_PHY_024,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'To design a directional acoustic parabolic sound collector for wildlife tracking in Kaziranga National Park, what acoustic principle should you exploit?',
    options: [
      'Curved hard smooth reflectors focus incoming parallel sound rays onto a central microphone obeying i = r',
      'Porous sponge panels accelerate sound waves into the microphone diaphragm',
      'Convection currents of hot air bend sound waves into a laser-like beam',
      'Electrostatic charge on the dish pulls sound particles from the air',
    ],
    correctIndex: 0,
    explanation: 'Just like parabolic mirrors reflect and focus parallel light rays to a focal point obeying the law of reflection (i = r), curved hard surfaces focus sound waves to amplify distant faint acoustic signals.',
    hints: [
      'Think of how satellite TV dishes or sound boards in auditoriums work.',
      'Hard smooth curved surfaces reflect and concentrate wave energy at a focal point.',
      'Law of reflection: i = r.',
    ],
  },
  {
    id: 'ch_21_a',
    nodeId: NODE_C7_PHY_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A student accidentally connects an ammeter in parallel across a 12V car battery. What catastrophic event happens and why?',
    options: [
      'Because the ammeter has near-zero internal resistance, an enormous short-circuit current surges through it, likely burning the meter fuse and melting wires',
      'The ammeter blocks all current because its high resistance chokes the battery',
      'The voltmeter scale on the ammeter will read zero volts harmlessly',
      'The battery reverses its polarity instantly due to electromagnetic back-EMF',
    ],
    correctIndex: 0,
    explanation: 'Ammeters are engineered with exceptionally low resistance to avoid altering circuit current when in series. Placing an ammeter in parallel creates an accidental short circuit across the voltage source, causing a massive, damaging current surge.',
    hints: [
      'What is the internal resistance of an ammeter? Virtually zero!',
      'Connecting near-zero resistance directly across 12V causes massive current (I = V/R).',
      'A short circuit results, causing overheating and fuse blowout.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_22_a',
    nodeId: NODE_C7_PHY_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A 1.5 V AA torch cell and a giant 1.5 V industrial D-cell are compared. What is the precise scientific difference between them?',
    options: [
      'Both provide identical potential difference (1.5 Joules of work per Coulomb), but the larger D-cell stores a greater total quantity of chemical reactants (more total Coulombs and total Joules over its life)',
      'The D-cell provides 10 times higher voltage push per electron because it is physically heavier',
      'The AA cell produces AC voltage while the D-cell produces DC voltage',
      'The AA cell has higher potential difference because smaller volume compresses voltage',
    ],
    correctIndex: 0,
    explanation: 'Voltage (Potential Difference) is energy PER unit charge (1.5 J/C for both). Cell size determines the total charge capacity (Coulombs stored), not the voltage rating.',
    hints: [
      'Voltage is like pressure (height of water tank), not total volume in the reservoir.',
      'Both are rated 1.5 V, so both deliver 1.5 J per Coulomb.',
      'The bigger cell simply stores more chemical fuel to supply charge for a longer duration.',
    ],
    misconceptionIndex: 8,
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

// ─── DEFAULT ENRICHED PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C7_PHY_021,
  title: 'ICSE Class 7 Physics: Heat Transfer, Sound & Electric Circuits Lab',
  definition:
    'Comprehensive experimental simulation covering: Conduction (vibrational energy and free electrons in solids), Convection (buoyancy and fluid circulating loops), Radiation (electromagnetic waves traversing vacuum), Sound Reflection & Absorption (laws of reflection, echoes >= 0.1s, reverberation, acoustic porous damping), and Direct Current Electricity (flow of charge Q=It, potential difference V=W/Q, ammeter in series, voltmeter in parallel).',
  eli5:
    'Think of heat as dancing atoms passing energy down the line (conduction), hot fluid hot-air balloons rising up (convection), and invisible light beams crossing space (radiation). Sound bounces like a rubber ball off hard rocks (echo) or gets swallowed by fuzzy cushions (absorption). Electricity is a river of tiny electrons pumped by a battery faucet through light bulbs!',
  misconceptions: [
    {
      misconception: 'In conduction, solid particles travel from the hot end to the cold end to carry heat.',
      correction: 'Particles stay in fixed lattice spots and only vibrate, passing kinetic energy by collisions. In metals, mobile free electrons assist the transfer.',
    },
    {
      misconception: 'Hot air rises simply because heat naturally floats upwards on its own.',
      correction: 'Heating causes fluids to expand and become less dense; the surrounding cooler, denser fluid pushes it upward by buoyant force.',
    },
    {
      misconception: 'Thermal radiation requires air or a medium to travel across space.',
      correction: 'Radiation consists of electromagnetic infrared waves that travel at the speed of light through a complete vacuum.',
    },
    {
      misconception: 'The laws of reflection for sound are different from the laws of reflection for light.',
      correction: 'All waves obey identical reflection laws: Angle of incidence = Angle of reflection (i = r) with coplanar normal and rays.',
    },
    {
      misconception: 'Dense heavy concrete absorbs sound better than thin soft foam panels.',
      correction: 'Rigid concrete reflects sound waves. Absorption depends on soft, open-celled pores that convert acoustic vibrations into heat by friction.',
    },
    {
      misconception: 'An ammeter can be connected in parallel across a bulb to check its current.',
      correction: 'An ammeter has near-zero resistance and must be connected in series. Connecting it in parallel causes a dangerous short circuit.',
    },
    {
      misconception: 'For an echo with delay 0.1 s, the cliff distance is v × t = 34 m.',
      correction: 'Sound travels to the cliff and back (2d). The one-way obstacle distance is d = (v × t) / 2 = 17 m.',
    },
    {
      misconception: 'Reverberation and echo are the same phenomenon.',
      correction: 'Echo is a single distinct repetition arriving after >= 0.1 s. Reverberation is a continuous blur of overlapping reflections arriving under 0.1 s.',
    },
    {
      misconception: 'A 12V car battery has more voltage than 220V mains because it is physically bigger.',
      correction: 'Voltage is work done per unit charge (J/C). Mains provides 220 J/C, whereas a car battery provides only 12 J/C. Size indicates charge capacity, not voltage.',
    },
    {
      misconception: 'Electric current flows in the same direction that electrons physically travel.',
      correction: 'Conventional current flows from positive to negative, whereas negative electrons drift from negative to positive.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which mode of heat transfer can take place across a perfect vacuum?',
      options: ['Conduction', 'Convection', 'Radiation', 'Advection'],
      correctIndex: 2,
    },
    {
      question: 'What is the minimum time delay required for human persistence of hearing to distinguish an echo?',
      options: ['0.01 s', '0.10 s', '1.0 s', '0.50 s'],
      correctIndex: 1,
    },
    {
      question: 'In a closed electric circuit, 1 Ampere corresponds to:',
      options: ['1 Volt per second', '1 Joule per second', '1 Coulomb per second', '1 Ohm per second'],
      correctIndex: 2,
    },
    {
      question: 'What happens to water density when heated from 10°C to 50°C?',
      options: ['Density decreases and warm water rises', 'Density increases and warm water sinks', 'Density remains unchanged', 'Water becomes solid'],
      correctIndex: 0,
    },
    {
      question: 'Why are the handles of cooking utensils made of bakelite plastic or wood?',
      options: ['They conduct heat rapidly to cool the pan', 'They are poor conductors (insulators) of heat', 'They reflect radiation into the pan', 'They generate electric voltage'],
      correctIndex: 1,
    },
    {
      question: 'To measure potential difference across a light bulb, a voltmeter must be connected:',
      options: ['In series with the bulb', 'In parallel across the bulb', 'In series with the battery switch', 'Between the ground and wire insulation'],
      correctIndex: 1,
    },
    {
      question: 'Which surface is the best radiator of thermal heat energy?',
      options: ['Polished silver mirror', 'Dull matte black surface', 'Smooth white ceramic', 'Transparent glass'],
      correctIndex: 1,
    },
    {
      question: 'If a sound wave reflects off a flat wall with angle of incidence 45°, what is angle of reflection?',
      options: ['90°', '45°', '0°', '180°'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Student demonstrates complete mastery of conduction particle models, convection loops, thermal radiation, sound reflection/absorption, echo calculations (d=vt/2), reverberation control, and circuit measurements (Q=It, V=W/Q, ammeter in series, voltmeter in parallel).',
};

// ─── INTERACTIVE EXPLORATION LABS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Solid Lattice Conduction & Electron Relay',
    instruction: 'Drag the Heat Flame slider to energize atoms at the hot end. Watch the vibrational kinetic energy wave and free electron drift travel down the rod in real time.',
    interactionType: 'heat-conduction',
    nodeId: NODE_C7_PHY_021,
  },
  {
    title: 'Lab 2: Fluid Buoyancy & Convection Circulation',
    instruction: 'Adjust the Burner Power slider beneath the water beaker. Observe how heated low-density fluid plumes rise and cold water sinks in a continuous loop.',
    interactionType: 'fluid-convection',
    nodeId: NODE_C7_PHY_022,
  },
  {
    title: 'Lab 3: Vacuum Radiation & Surface Absorption',
    instruction: 'Toggle between Matte Black and Polished Silver test panels under the Solar Heat Ray to discover how surface texture controls infrared absorption.',
    interactionType: 'thermal-radiation',
    nodeId: NODE_C7_PHY_023,
  },
  {
    title: 'Lab 4: Sound Waves: Echo vs Reverberation Chamber',
    instruction: 'Adjust the Reflecting Wall Distance from 5m to 40m. Observe whether the return pulse merges (reverberation) or echoes (t ≥ 0.1s).',
    interactionType: 'sound-echo-reverb',
    nodeId: NODE_C7_PHY_026,
  },
  {
    title: 'Lab 5: Interactive DC Circuit Workbench (V = W/Q, Q = It)',
    instruction: 'Vary the Battery Voltage and Load Resistance sliders. Watch the real-time electron drift, ammeter needle deflection (Series), and voltmeter readout (Parallel).',
    interactionType: 'circuit-workbench',
    nodeId: NODE_C7_PHY_029,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you replace a copper heat rod with an identical wooden rod under the same flame, what will happen to the speed of wax melting at the cold end?',
    options: [
      'Wax will melt at the exact same rate because all solids conduct heat equally',
      'Wax will take vastly longer or never melt because wood lacks free electrons and is a poor conductor',
      'Wax will melt 5 times faster because wood absorbs heat better',
      'Wood will conduct heat backwards into the flame',
    ],
    correctIndex: 1,
    verifyInstruction: 'Notice how non-metals lack free electrons and conduct only through weak lattice vibration collisions.',
    nodeId: NODE_C7_PHY_021,
  },
  {
    question: 'Predict: If a listener stands 10 metres from a bare concrete wall in a room and claps, will they hear a distinct echo?',
    options: [
      'Yes, because any hard wall produces a distinct echo regardless of distance',
      'No, because the return journey is only 20 m (time ~0.059 s < 0.1 s), so the reflection blurs as reverberation',
      'Yes, because sound travels faster in enclosed rooms',
      'No, because concrete absorbs 100% of sound waves',
    ],
    correctIndex: 1,
    verifyInstruction: 'Use the slider in Lab 4: at distances under 17 metres, the return time is under 0.1 s, causing reverberation instead of a clear echo.',
    nodeId: NODE_C7_PHY_026,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the speed of warm fluid plumes as you crank up the bottom heater power in the convection lab?',
    observableOptions: [
      'Rising fluid velocity increases as the density difference between hot and cold zones widens',
      'Fluid particles stop moving completely when temperature increases',
      'Fluid flows downwards toward the flame faster',
      'No circulation occurs in liquids',
    ],
    correctIndex: 0,
    nodeId: NODE_C7_PHY_022,
  },
  {
    question: 'In the DC Circuit Workbench, when you increase the battery voltage while keeping resistance constant, what happens to electron flow and the ammeter reading?',
    observableOptions: [
      'More push (voltage) causes faster electron drift and higher ammeter current reading',
      'Ammeter current drops to zero as voltage increases',
      'Electrons reverse direction from positive to negative',
      'Voltmeter needle drops to zero',
    ],
    correctIndex: 0,
    nodeId: NODE_C7_PHY_030,
  },
];

// ─── REAL-WORLD EXTENSION ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Himalayan Passive-Solar Shelter & Acoustic Studio Design',
  description: 'Apply your master physics knowledge to engineer an off-grid green habitat in Ladakh: incorporate black solar-radiation collector walls, double-walled vacuum insulation panels, acoustic felt dampeners for crisp communication, and calibrated series/parallel solar-battery wiring.',
  steps: [
    'Choose matte black solar thermal collectors angled at 45° for maximum winter infrared absorption.',
    'Install double-glazed vacuum insulated windows to eliminate conductive and convective heat leaks.',
    'Hang heavy woollen Ladakhi tapestries on large interior walls to reduce reverberation time to an optimum 1.0 s.',
    'Wire the 24V solar battery bank with ammeters in series and voltmeters across inverter loads to monitor charge (Q = It).',
  ],
};

// ─── MOTIVATIONAL FEEDBACK HELPER ───
function getMotivationalFeedback(errorCount: number): { title: string; subtitle: string; srsInterval: number; srsLabel: string } {
  if (errorCount === 0) {
    return {
      title: 'PERFECT SCORE!',
      subtitle: 'Flawless mastery of thermal physics, wave mechanics, and circuit theory!',
      srsInterval: 7,
      srsLabel: '7 days',
    };
  }
  if (errorCount <= 3) {
    return {
      title: 'Great work!',
      subtitle: 'Strong grasp of foundational principles with very few minor missteps.',
      srsInterval: 3,
      srsLabel: '3 days',
    };
  }
  return {
    title: 'Do not give up — You WILL get this!',
    subtitle: 'Physics mastery is built through exploration, mistakes, and practice.',
    srsInterval: 1,
    srsLabel: '1 day',
  };
}

// ─── MAIN COMPONENT FUNCTION ───
function C7_PhysicsHeatTransferConductionSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // Subject config
  const subjectConfig = SUBJECT_CONFIG['phy'] || { name: 'Physics', emoji: '⚡', color: 'cyan' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);

  // Discovery Hook State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict & Observe State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Lab Interactive Variables (Real-time live updates via sliders)
  const [flameIntensity, setFlameIntensity] = useState(65); // 0 to 100
  const [rodMaterial, setRodMaterial] = useState<'copper' | 'iron' | 'glass'>('copper');
  const [convectionHeat, setConvectionHeat] = useState(60); // 0 to 100
  const [radiationSurface, setRadiationSurface] = useState<'black' | 'silver'>('black');
  const [wallDistance, setWallDistance] = useState(25); // 5m to 50m
  const [soundPulseTrigger, setSoundPulseTrigger] = useState(0);
  const [batteryVoltage, setBatteryVoltage] = useState(6); // 1.5V to 24V
  const [loadResistance, setLoadResistance] = useState(10); // 2 to 50 ohms
  const [switchClosed, setSwitchClosed] = useState(true);

  // Sandbox Free Play State
  const [sandboxTab, setSandboxTab] = useState<'thermal' | 'sound' | 'circuit'>('thermal');

  // Challenge Engine State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Non-MCQ Interactive Challenge States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Animation & Feedback States
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Persistent Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const soundCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Real-time Circuit Calculations
  const circuitCurrent = useMemo(() => {
    if (!switchClosed) return 0;
    return Number((batteryVoltage / Math.max(1, loadResistance)).toFixed(2));
  }, [batteryVoltage, loadResistance, switchClosed]);

  const chargeIn10Sec = useMemo(() => {
    return Number((circuitCurrent * 10).toFixed(1));
  }, [circuitCurrent]);

  const energyPerCoulomb = useMemo(() => {
    return batteryVoltage;
  }, [batteryVoltage]);

  // Echo Time Calculation
  const soundSpeed = 340;
  const echoReturnTime = useMemo(() => {
    return Number(((2 * wallDistance) / soundSpeed).toFixed(3));
  }, [wallDistance]);

  const isDistinctEcho = echoReturnTime >= 0.1;

  // Filtered Challenges by Adaptive Difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load Existing Mastery on Mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adaptive Difficulty Adjustment
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

  // ─── 2D CANVAS ANIMATION: PARTICLE VIBRATION & ELECTRON DRIFT / CONVECTION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if ((phase === 'explore' && currentSlide === 0) || (phase === 'sandbox' && sandboxTab === 'thermal')) {
        // Conduction Rod Visualisation
        const numAtoms = 14;
        const atomSpacing = (canvas.width - 60) / numAtoms;
        const conductivity = rodMaterial === 'copper' ? 1.0 : rodMaterial === 'iron' ? 0.6 : 0.15;
        const tempDecay = 0.22 / conductivity;

        ctx.fillStyle = '#1e293b';
        ctx.fillRect(15, 30, canvas.width - 30, 60);

        for (let i = 0; i < numAtoms; i++) {
          const atomX = 35 + i * atomSpacing;
          const tempAtI = Math.max(10, flameIntensity * Math.exp(-i * tempDecay));
          const vibAmp = (tempAtI / 100) * 8;
          const vibX = Math.sin(time * (8 + tempAtI * 0.1) + i) * vibAmp;
          const vibY = Math.cos(time * (7 + tempAtI * 0.1) + i * 2) * vibAmp;

          // Color gradient from fiery red to cool steel cyan
          const r = Math.min(255, Math.floor(tempAtI * 2.8 + 40));
          const g = Math.min(255, Math.floor(100 + (100 - tempAtI)));
          const b = Math.min(255, Math.floor(220 - tempAtI * 1.8));

          ctx.beginPath();
          ctx.arc(atomX + vibX, 60 + vibY, 10, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fill();
          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Free electrons in metals
          if (rodMaterial !== 'glass') {
            const electronX = (atomX + (time * 40 * conductivity) % (canvas.width - 60)) % (canvas.width - 40);
            ctx.beginPath();
            ctx.arc(electronX + 20, 45 + Math.sin(time * 5 + i) * 6, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#38bdf8';
            ctx.fill();
          }
        }

        // Draw flame icon at left
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.moveTo(15, 95);
        ctx.lineTo(35, 75 + Math.sin(time * 10) * 4);
        ctx.lineTo(55, 95);
        ctx.fill();
      } else if (phase === 'explore' && currentSlide === 1) {
        // Convection Beaker Loop
        const width = canvas.width;
        const height = canvas.height;
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.strokeRect(40, 15, width - 80, height - 35);

        // Circulating convection particles
        const particleCount = 28;
        for (let p = 0; p < particleCount; p++) {
          const speed = (convectionHeat / 100) * 1.8 + 0.2;
          const tPos = (time * speed * 0.5 + (p / particleCount) * Math.PI * 2) % (Math.PI * 2);

          const centerX = width / 2;
          const centerY = (height - 15) / 2;
          const radiusX = (width - 120) / 2;
          const radiusY = (height - 60) / 2;

          const px = centerX + Math.cos(tPos) * radiusX;
          const py = centerY + Math.sin(tPos) * radiusY;

          const isRising = Math.sin(tPos) < 0;
          ctx.beginPath();
          ctx.arc(px, py, 5, 0, Math.PI * 2);
          ctx.fillStyle = isRising ? '#ef4444' : '#3b82f6';
          ctx.fill();
        }

        // Heat at bottom
        ctx.fillStyle = '#f59e0b';
        ctx.fillText('🔥 Heating Base (Warm Fluid Expands & Rises)', width / 2 - 110, height - 6);
      } else {
        // Generic energy pulse canvas
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#06b6d4';
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 4) {
          const y = 30 + Math.sin(x * 0.05 + time * 3) * 15;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentSlide, sandboxTab, flameIntensity, rodMaterial, convectionHeat]);

  // ─── SOUND ECHO CANVAS ANIMATION ───
  useEffect(() => {
    const canvas = soundCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let wavePos = 0;

    const renderSound = () => {
      wavePos = (wavePos + 3) % (canvas.width * 2);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const wallX = canvas.width - 30;
      // Draw Cliff Wall
      ctx.fillStyle = '#64748b';
      ctx.fillRect(wallX, 10, 20, canvas.height - 20);

      // Sound source
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(30, canvas.height / 2, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px sans-serif';
      ctx.fillText('Source', 12, canvas.height / 2 + 22);

      // Forward wave
      if (wavePos < wallX) {
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(30, canvas.height / 2, wavePos, -Math.PI / 4, Math.PI / 4);
        ctx.stroke();
      } else {
        // Reflected returning wave
        const returnRadius = wavePos - wallX;
        ctx.strokeStyle = isDistinctEcho ? '#22c55e' : '#f59e0b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(wallX, canvas.height / 2, returnRadius, Math.PI * 0.75, Math.PI * 1.25);
        ctx.stroke();
      }

      animId = requestAnimationFrame(renderSound);
    };

    renderSound();
    return () => cancelAnimationFrame(animId);
  }, [wallDistance, soundPulseTrigger, isDistinctEcho]);

  // ─── CALLBACK HANDLERS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        const nextHint = challenge.hints[0];
        if (nextHint) {
          setCurrentHint(nextHint);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak('Here is a hint to help you along.');
        }
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, challenge]);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      audioManager.play('chime');
      speechManager.speak('Let us review the step-by-step physical explanation together.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding scientific intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive physics exploration labs. Try manipulating the controls!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now enter the free-play sandbox. Explore heat, sound, and circuit variables without pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Time for the ICSE master challenges. Read carefully and apply your knowledge!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Great prediction! Now interact with the lab to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation! That aligns with physical laws.' : 'Look closely at the fluid density change.');
  }, []);

  const handleRodChange = useCallback((mat: 'copper' | 'iron' | 'glass') => {
    setRodMaterial(mat);
    audioManager.play('tap');
    speechManager.speak(`Switched material to ${mat}. Observe the thermal conduction rate!`);
  }, []);

  const handleRadiationToggle = useCallback((surf: 'black' | 'silver') => {
    setRadiationSurface(surf);
    audioManager.play('tap');
    speechManager.speak(`Selected ${surf === 'black' ? 'matte black absorber' : 'polished silver reflector'}.`);
  }, []);

  const handleSwitchToggle = useCallback(() => {
    setSwitchClosed((prev) => !prev);
    audioManager.play('tap');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the ICSE Physics Lab with flying colours!');
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
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

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
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Well calculated and reasoned.');
        setShowConfetti(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify({ level: 'proficient', score: 100 }));
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
          speechManager.speak('Review the comprehensive solution below.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 3500);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

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

  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        if (prev.length === 0 && challenge.sortItems) {
          prev = challenge.sortItems.map((_, i) => i);
        }
        const arr = [...prev];
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  const motivationalFeedback = useMemo(() => getMotivationalFeedback(errors), [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 20, scale: 1.15 }}
            className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-800"
            aria-hidden="true"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400">ICSE Class 7 Physics • Nodes c7_phy_021 to c7_phy_030</p>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${p} mode`}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {p === 'discovery' ? '🔭 Discovery' : p === 'explore' ? '🔬 Labs' : p === 'sandbox' ? '🎛️ Sandbox' : '🎯 Challenges'}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-3xl border border-gold-800/60 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-gold-500/20 text-gold-300 rounded-lg text-xs font-bold uppercase tracking-wider">
                Expedition Scenario
              </span>
            </div>
            <h2 className="text-2xl font-black text-gold-200">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm md:text-base mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300/80 mt-2 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden="true">🤔</span>
              <h3 className="text-base md:text-lg font-bold text-white">Curiosity Check: What would happen?</h3>
            </div>
            <p className="text-slate-200 font-medium leading-relaxed">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`p-4 rounded-2xl text-left text-sm font-medium transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-gold-500/60'
                  }`}
                >
                  <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 rounded-2xl bg-gold-950/40 border border-gold-800/70 space-y-3"
              >
                <p className={discoveryCorrect ? 'text-emerald-400 font-bold text-sm' : 'text-amber-400 text-sm font-medium'}>
                  {discoveryCorrect
                    ? '✓ Exactly right! Water is a poor conductor of heat, and since heated water stays at the top due to convection, the bottom ice stays cold!'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Enter interactive labs"
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-xl font-black text-sm shadow-lg shadow-gold-500/30 flex items-center gap-2"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED LABS ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-xl font-extrabold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentSlide === 0}
                aria-label="Go to previous lab"
                onClick={() => {
                  setCurrentSlide((s) => Math.max(0, s - 1));
                  audioManager.play('whoosh');
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
              >
                ← Previous Lab
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={currentSlide === EXPLORATION_STEPS.length - 1 ? 'Go to sandbox' : 'Go to next lab'}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) {
                    setCurrentSlide((s) => s + 1);
                    audioManager.play('whoosh');
                  } else {
                    handleAdvanceToSandbox();
                  }
                }}
                className="px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-xl text-xs font-bold shadow-md shadow-gold-500/20"
              >
                {currentSlide === EXPLORATION_STEPS.length - 1 ? 'Go to Sandbox →' : 'Next Lab →'}
              </motion.button>
            </div>
          </div>

          <p className="text-amber-300 text-sm font-medium bg-amber-950/30 p-3 rounded-2xl border border-amber-900/40">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* DYNAMIC LAB VIEWPORT */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6">
            {/* SLIDE 0: CONDUCTION LAB */}
            {currentSlide === 0 && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-300">Material Type:</span>
                    {(['copper', 'iron', 'glass'] as const).map((mat) => (
                      <motion.button
                        key={mat}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Select ${mat} material`}
                        onClick={() => handleRodChange(mat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize border ${
                          rodMaterial === mat
                            ? 'bg-gold-600 border-gold-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {mat}
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-64">
                    <span className="text-xs font-bold text-slate-300">Flame: {flameIntensity}%</span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={flameIntensity}
                      aria-label="Flame intensity slider"
                      onChange={(e) => setFlameIntensity(Number(e.target.value))}
                      className="w-full accent-gold-400"
                    />
                  </div>
                </div>

                <div className="relative bg-slate-950 rounded-2xl p-4 border border-slate-800">
                  <canvas ref={canvasRef} width={650} height={120} className="w-full h-32 rounded-xl" />
                  <div className="flex justify-between text-xs font-bold text-slate-400 mt-2 px-4">
                    <span className="text-red-400">🔥 Hot End (High Kinetic Energy)</span>
                    <span className="text-gold-400">❄️ Cold End (Lattice Jiggle Relayed)</span>
                  </div>
                </div>

                {/* PREDICTION HOOK 1 */}
                {!predictionMade ? (
                  <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
                    <p className="text-sm font-bold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          aria-label={`Prediction option ${i + 1}: ${opt}`}
                          onClick={() => handlePrediction(i)}
                          className="p-2.5 rounded-xl text-left text-xs bg-slate-900 border border-slate-700 text-slate-300 hover:border-gold-500"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800 text-xs text-emerald-300">
                    ✓ Hypothesis Logged: {PREDICTION_QUESTIONS[0].verifyInstruction}
                  </div>
                )}
              </div>
            )}

            {/* SLIDE 1: CONVECTION LAB */}
            {currentSlide === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold text-slate-300">Bottom Burner Output: {convectionHeat}%</span>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={convectionHeat}
                    aria-label="Bottom burner output power slider"
                    onChange={(e) => setConvectionHeat(Number(e.target.value))}
                    className="w-48 accent-gold-400"
                  />
                </div>

                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
                  <canvas ref={canvasRef} width={650} height={150} className="w-full h-40 rounded-xl" />
                </div>

                {!observationAnswered ? (
                  <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
                    <p className="text-sm font-bold text-white">Observation: {OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          aria-label={`Observation option ${i + 1}: ${opt}`}
                          onClick={() => handleObservation(i)}
                          className="p-2.5 rounded-xl text-left text-xs bg-slate-900 border border-slate-700 text-slate-300 hover:border-gold-500"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800 text-xs text-gold-300">
                    ✓ Observed: Warm fluid expands, density falls, and upward buoyant forces drive the circulation current!
                  </div>
                )}
              </div>
            )}

            {/* SLIDE 2: RADIATION & THERMAL SURFACES */}
            {currentSlide === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-300">Target Plate Coating:</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Select matte charcoal black surface"
                    onClick={() => handleRadiationToggle('black')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                      radiationSurface === 'black'
                        ? 'bg-slate-950 border-gold-400 text-gold-300 shadow-md'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    ⬛ Matte Charcoal Black (Good Absorber / Radiator)
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Select polished shiny silver surface"
                    onClick={() => handleRadiationToggle('silver')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                      radiationSurface === 'silver'
                        ? 'bg-slate-200 border-gold-400 text-slate-950 shadow-md'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    ⬜ Polished Shiny Silver (Good Reflector)
                  </motion.button>
                </div>

                <svg viewBox="0 0 600 200" className="w-full h-44 bg-slate-950 rounded-2xl border border-slate-800">
                  {/* Vacuum Space */}
                  <rect x="0" y="0" width="600" height="200" fill="#020617" />
                  <text x="200" y="30" fill="#64748b" fontSize="11" fontWeight="bold">
                    PERFECT VACUUM CHAMBER (NO PARTICLES)
                  </text>

                  {/* Infrared rays */}
                  <line x1="60" y1="100" x2="380" y2="100" stroke="#f43f5e" strokeWidth="4" strokeDasharray="8,4" />
                  <polygon points="380,95 395,100 380,105" fill="#f43f5e" />
                  <text x="140" y="90" fill="#f43f5e" fontSize="12" fontWeight="bold">
                    Infrared Radiant Heat Waves (3 × 10⁸ m/s)
                  </text>

                  {/* Test Plate */}
                  <rect
                    x="400"
                    y="40"
                    width="40"
                    height="120"
                    rx="6"
                    fill={radiationSurface === 'black' ? '#18181b' : '#e2e8f0'}
                    stroke={radiationSurface === 'black' ? '#ef4444' : '#38bdf8'}
                    strokeWidth="3"
                  />

                  {/* Temperature readout */}
                  <rect x="470" y="60" width="110" height="80" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="480" y="85" fill="#94a3b8" fontSize="10">
                    Plate Temp:
                  </text>
                  <text
                    x="480"
                    y="115"
                    fill={radiationSurface === 'black' ? '#ef4444' : '#38bdf8'}
                    fontSize="20"
                    fontWeight="bold"
                  >
                    {radiationSurface === 'black' ? '74.5°C' : '23.8°C'}
                  </text>
                  <text x="480" y="132" fill="#64748b" fontSize="9">
                    {radiationSurface === 'black' ? 'High Absorption' : 'High Reflection'}
                  </text>
                </svg>
              </div>
            )}

            {/* SLIDE 3: SOUND ECHO & REVERBERATION LAB */}
            {currentSlide === 3 && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3 w-full md:w-80">
                    <span className="text-xs font-bold text-slate-300">Wall Distance: {wallDistance} m</span>
                    <input
                      type="range"
                      min={5}
                      max={45}
                      value={wallDistance}
                      aria-label="Wall distance in metres"
                      onChange={(e) => {
                        setWallDistance(Number(e.target.value));
                        setSoundPulseTrigger((prev) => prev + 1);
                      }}
                      className="w-full accent-emerald-400"
                    />
                  </div>
                  <div className="text-xs font-bold">
                    Return Time (2d/v):{' '}
                    <span className={isDistinctEcho ? 'text-emerald-400' : 'text-amber-400'}>
                      {isDistinctEcho ? '✓' : '⚠️'} {echoReturnTime} s ({isDistinctEcho ? 'Distinct Echo ≥ 0.1s' : 'Reverberation Blur < 0.1s'})
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
                  <canvas ref={soundCanvasRef} width={650} height={140} className="w-full h-36 rounded-xl" />
                </div>
              </div>
            )}

            {/* SLIDE 4: DC CIRCUIT WORKBENCH */}
            {currentSlide === 4 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-300">Battery Voltage (V): {batteryVoltage} V</span>
                    <input
                      type="range"
                      min={1.5}
                      max={24}
                      step={0.5}
                      value={batteryVoltage}
                      aria-label="Battery voltage slider in volts"
                      onChange={(e) => setBatteryVoltage(Number(e.target.value))}
                      className="w-full accent-gold-400"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-300">Load Resistance (R): {loadResistance} Ω</span>
                    <input
                      type="range"
                      min={2}
                      max={40}
                      value={loadResistance}
                      aria-label="Load resistance slider in ohms"
                      onChange={(e) => setLoadResistance(Number(e.target.value))}
                      className="w-full accent-gold-400"
                    />
                  </div>
                  <div className="flex items-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Toggle circuit switch"
                      onClick={handleSwitchToggle}
                      className={`w-full py-2 rounded-xl text-xs font-bold border ${
                        switchClosed ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-rose-900 border-rose-600 text-rose-200'
                      }`}
                    >
                      {switchClosed ? '✓ Switch: CLOSED (Current ON)' : '✗ Switch: OPEN (Current OFF)'}
                    </motion.button>
                  </div>
                </div>

                {/* SVG Circuit Schematic with Active Meters */}
                <svg viewBox="0 0 600 220" className="w-full h-52 bg-slate-950 rounded-2xl border border-slate-800">
                  {/* Outer Circuit Loop */}
                  <rect
                    x="50"
                    y="30"
                    width="500"
                    height="160"
                    fill="none"
                    stroke={switchClosed ? '#38bdf8' : '#475569'}
                    strokeWidth="4"
                    rx="12"
                  />

                  {/* Battery */}
                  <rect x="260" y="15" width="80" height="30" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <text x="300" y="35" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
                    {batteryVoltage}V Cell
                  </text>

                  {/* Ammeter in SERIES (Left branch) */}
                  <circle cx="50" cy="110" r="24" fill="#0f172a" stroke="#22c55e" strokeWidth="3" />
                  <text x="50" y="106" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">
                    A
                  </text>
                  <text x="50" y="122" textAnchor="middle" fill="#86efac" fontSize="10">
                    {circuitCurrent} A
                  </text>

                  {/* Load Lamp (Bottom branch) */}
                  <circle cx="300" cy="190" r="20" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
                  <text x="300" y="195" textAnchor="middle" fill="#fbbf24" fontSize="14">
                    💡
                  </text>

                  {/* Voltmeter in PARALLEL across the Lamp */}
                  <path d="M 240 190 L 240 140 L 360 140 L 360 190" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="4,4" />
                  <circle cx="300" cy="140" r="22" fill="#0f172a" stroke="#a855f7" strokeWidth="3" />
                  <text x="300" y="136" textAnchor="middle" fill="#a855f7" fontSize="12" fontWeight="bold">
                    V
                  </text>
                  <text x="300" y="150" textAnchor="middle" fill="#d8b4fe" fontSize="10">
                    {switchClosed ? batteryVoltage : 0} V
                  </text>

                  {/* Live Formula Overlay */}
                  <rect x="420" y="60" width="120" height="100" rx="8" fill="#020617" stroke="#334155" />
                  <text x="430" y="80" fill="#94a3b8" fontSize="10" fontWeight="bold">
                    Calculations:
                  </text>
                  <text x="430" y="100" fill="#38bdf8" fontSize="11">
                    Q = I × t
                  </text>
                  <text x="430" y="118" fill="#86efac" fontSize="10">
                    In 10s: {chargeIn10Sec} C
                  </text>
                  <text x="430" y="136" fill="#f43f5e" fontSize="11">
                    V = W / Q
                  </text>
                  <text x="430" y="152" fill="#fda4af" fontSize="10">
                    {energyPerCoulomb} J / Coulomb
                  </text>
                </svg>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE-PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-3xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-gold-300">🎛️ Free Physics Exploration Sandbox</h2>
              <p className="text-xs text-slate-400 mt-1">
                Tinker with heat rods, acoustic walls, and DC circuits freely without any tests or grades.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Proceed to challenges"
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-emerald-500/30"
            >
              Ready for Challenges! 🎯
            </motion.button>
          </div>

          <div className="flex gap-2 border-b border-slate-800 pb-2">
            {(['thermal', 'sound', 'circuit'] as const).map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Switch to ${tab} sandbox tab`}
                onClick={() => {
                  setSandboxTab(tab);
                  audioManager.play('tap');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                  sandboxTab === tab ? 'bg-gold-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'thermal' ? '🔥 Thermal Modes' : tab === 'sound' ? '🔊 Echo & Reverb' : '⚡ DC Circuits'}
              </motion.button>
            ))}
          </div>

          {sandboxTab === 'thermal' && (
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Conduction Flame: {flameIntensity}%</label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={flameIntensity}
                    aria-label="Conduction flame slider"
                    onChange={(e) => setFlameIntensity(Number(e.target.value))}
                    className="w-full accent-gold-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Convection Heater: {convectionHeat}%</label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={convectionHeat}
                    aria-label="Convection heater power slider"
                    onChange={(e) => setConvectionHeat(Number(e.target.value))}
                    className="w-full accent-gold-400"
                  />
                </div>
              </div>
              <canvas ref={canvasRef} width={650} height={120} className="w-full h-32 bg-slate-950 rounded-2xl" />
            </div>
          )}

          {sandboxTab === 'sound' && (
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <label className="text-xs font-bold text-slate-300 block mb-1">Wall Distance: {wallDistance} metres</label>
              <input
                type="range"
                min={5}
                max={50}
                value={wallDistance}
                aria-label="Sandbox wall distance slider"
                onChange={(e) => setWallDistance(Number(e.target.value))}
                className="w-full accent-emerald-400"
              />
              <canvas ref={soundCanvasRef} width={650} height={120} className="w-full h-32 bg-slate-950 rounded-2xl" />
            </div>
          )}

          {sandboxTab === 'circuit' && (
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Voltage: {batteryVoltage} V</label>
                  <input
                    type="range"
                    min={1.5}
                    max={24}
                    step={0.5}
                    value={batteryVoltage}
                    aria-label="Sandbox battery voltage slider"
                    onChange={(e) => setBatteryVoltage(Number(e.target.value))}
                    className="w-full accent-gold-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Resistance: {loadResistance} Ω</label>
                  <input
                    type="range"
                    min={2}
                    max={50}
                    value={loadResistance}
                    aria-label="Sandbox load resistance slider"
                    onChange={(e) => setLoadResistance(Number(e.target.value))}
                    className="w-full accent-gold-400"
                  />
                </div>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl flex justify-around text-center">
                <div>
                  <p className="text-xs text-slate-400">Current (Series A)</p>
                  <p className="text-xl font-black text-emerald-400">{circuitCurrent} A</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Voltage (Parallel V)</p>
                  <p className="text-xl font-black text-purple-400">{batteryVoltage} V</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Charge in 10s (Q=It)</p>
                  <p className="text-xl font-black text-gold-400">{chargeIn10Sec} C</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* ─── PHASE 4: ADAPTIVE CHALLENGE ENGINE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Status Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : difficulty === 'standard'
                    ? 'bg-gold-500/20 text-gold-300 border border-gold-500/30'
                    : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                }`}
              >
                {difficulty} TIER
              </motion.span>
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-slate-800 text-slate-300 uppercase">
                {challenge.competencyLevel}
              </span>
            </div>

            <div className="text-xs font-bold text-slate-400">
              Mastery: <span className="text-gold-400 capitalize">{masteryLevel}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-gold-500 to-gold-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* QUESTION CARD */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-3xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900/90 border-slate-800 shadow-2xl'
            }`}
          >
            <p className="text-base md:text-lg font-bold text-white mb-6 leading-relaxed">{challenge.question}</p>

            {/* MCQ OPTION RENDERING */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      disabled={showExplanation}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      onClick={() => handleAnswer(i)}
                      className={`p-4 rounded-2xl text-left text-sm font-medium transition-all border ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-gold-500/60'
                      }`}
                    >
                      <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                      {showExplanation && i === challenge.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* DRAG-LABEL RENDERING */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      draggable
                      aria-label={`Draggable label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-xl text-xs font-bold cursor-grab active:cursor-grabbing"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {['zone_up', 'zone_down', 'zone_heat', 'zone_tracer'].map((target) => (
                    <div
                      key={target}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target)}
                      aria-label={`Drop target zone: ${target.replace('zone_', '')}`}
                      className="p-4 rounded-2xl bg-slate-950 border-2 border-dashed border-slate-700 text-center text-xs text-slate-400 min-h-[60px] flex items-center justify-center font-bold"
                    >
                      {droppedLabels[target] ? (
                        <span className="text-emerald-300">✓ {droppedLabels[target]}</span>
                      ) : (
                        `Drop for: ${target.replace('zone_', '').toUpperCase()}`
                      )}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Verify dropped labels"
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-gold-600 text-white font-bold rounded-xl text-xs"
                >
                  Verify Dropped Labels
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT RENDERING */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, dIdx) => (
                  <motion.div
                    key={dIdx}
                    role="button"
                    tabIndex={0}
                    draggable
                    aria-label={`Sortable item ${dIdx + 1}: ${item}`}
                    onDragStart={() => setDraggedItem(String(dIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, dIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-800 rounded-xl text-xs font-medium text-slate-200 border border-slate-700 cursor-grab active:cursor-grabbing flex items-center gap-3"
                  >
                    <span className="px-2 py-1 bg-slate-900 rounded-lg text-gold-400 font-bold">{dIdx + 1}</span>
                    {item}
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={showExplanation}
                  aria-label="Submit arranged order"
                  onClick={() =>
                    handleAnswer(
                      sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i)
                    )
                  }
                  className="px-6 py-2.5 bg-gold-600 text-white font-bold rounded-xl text-xs"
                >
                  Submit Order
                </motion.button>
              </div>
            )}

            {/* NUMERIC RENDERING */}
            {challenge.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value..."
                  aria-label={`Enter numerical value in ${challenge.unit || 'units'}`}
                  className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-white font-bold w-52 focus:border-gold-500 focus:outline-none"
                />
                <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={showExplanation || !numericInput}
                  aria-label="Check calculation"
                  onClick={() => handleAnswer(parseFloat(numericInput))}
                  className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-2xl text-sm"
                >
                  Check Calculation
                </motion.button>
              </div>
            )}

            {/* CONSTRUCT RENDERING */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Add part ${part}`}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-800 hover:bg-gold-700 text-white rounded-xl text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-3 py-1 bg-gold-900 text-gold-200 rounded-lg text-xs font-bold flex items-center gap-2">
                      {part}
                      <button
                        onClick={() => setConstructParts((p) => p.filter((_, idx) => idx !== i))}
                        aria-label={`Remove part ${part}`}
                        className="text-rose-400 hover:text-rose-200"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={constructParts.length === 0 || showExplanation}
                  aria-label="Verify circuit assembly"
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-6 py-2.5 bg-gold-600 text-white font-bold rounded-xl text-xs"
                >
                  Verify Circuit Assembly
                </motion.button>
              </div>
            )}

            {/* STEP-BY-STEP PROGRESSIVE EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gold-950/40 rounded-3xl border border-gold-800/80 space-y-3"
              >
                <h4 className="text-sm font-black text-gold-300">Detailed ICSE Physical Explanation:</h4>
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, sIdx) => (
                    <motion.p
                      key={sIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-gold-400">{sIdx + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Reveal next reasoning step"
                    onClick={() => setRevealedSteps((r) => r + 1)}
                    className="px-4 py-1.5 bg-gold-800 hover:bg-gold-700 text-white rounded-xl text-xs font-bold"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalize score' : 'Next challenge'}
                    onClick={handleNextChallenge}
                    className="mt-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black rounded-2xl text-xs shadow-lg shadow-emerald-500/30 flex items-center gap-2"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Expedition Score →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: EXPEDITION COMPLETION & MASTERY SUMMARY ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-slate-900 to-gold-950/80 rounded-3xl border border-gold-800/80 text-center space-y-4">
            <span className="text-5xl" aria-hidden="true">🏆</span>
            
            {/* MOTIVATIONAL FEEDBACK BANNER */}
            <div className="p-4 bg-gold-900/40 rounded-2xl border border-gold-500/40 max-w-md mx-auto">
              <h3 className="text-2xl font-black text-amber-300 uppercase tracking-wide">
                {motivationalFeedback.title}
              </h3>
              <p className="text-xs text-gold-200 mt-1">
                {motivationalFeedback.subtitle}
              </p>
            </div>

            <h2 className="text-3xl font-black bg-gradient-to-r from-gold-300 via-gold-200 to-emerald-300 bg-clip-text text-transparent">
              Himalayan Physics Expedition Complete!
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
              You have successfully designed thermal shelters, calibrated mountain echo acoustics, and wired calibrated DC meters.
            </p>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 w-36">
                <p className="text-xs text-slate-400">Final Score</p>
                <p className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 w-36">
                <p className="text-xs text-slate-400">Mastery Level</p>
                <p className="text-2xl font-black text-gold-400 capitalize">{masteryLevel}</p>
              </div>
            </div>
          </div>

          {/* VISIBLE SPACED REPETITION SCHEDULE (SRS) */}
          <div className="p-6 bg-gradient-to-r from-gold-950/80 via-slate-900 to-gold-950/80 rounded-3xl border border-gold-500/40 text-center space-y-3 shadow-xl">
            <div className="flex items-center justify-center gap-2 text-gold-300 font-bold text-sm tracking-wide uppercase">
              <span aria-hidden="true">📅</span> Spaced Repetition Review Schedule (SM-2 Algorithm)
            </div>
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-gold-900/60 max-w-lg mx-auto">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Recommended Review Window</p>
              <p className="text-3xl font-black text-amber-400 my-1">
                Review in {motivationalFeedback.srsLabel}
              </p>
              <p className="text-xs text-slate-300">
                {errors === 0
                  ? 'Zero errors logged! Your memory consolidation interval is set to 7 days for long-term retention.'
                  : errors <= 3
                  ? `Solid performance with ${errors} error${errors > 1 ? 's' : ''}. A targeted review in 3 days will lock in mastery.`
                  : `You encountered ${errors} errors. Reviewing this topic tomorrow (in 1 day) will solidify the fundamentals!`}
              </p>
            </div>
          </div>

          {/* MISCONCEPTION PROFILE */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-3xl border border-rose-900/60 space-y-3">
              <h3 className="text-sm font-black text-rose-300 flex items-center gap-2">
                <span aria-hidden="true">⚠️</span> Specific Physics Misconceptions Overcome:
              </h3>
              {hitMisconceptions.map((mIdx) => {
                const item = misconceptions[mIdx];
                if (!item) return null;
                return (
                  <div key={mIdx} className="p-3 bg-slate-950 rounded-2xl border border-rose-900/40 text-xs space-y-1">
                    <p className="text-rose-300 font-bold">✗ Misconception: {item.misconception}</p>
                    <p className="text-emerald-300 font-medium">✓ Physical Truth: {item.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* REAL-WORLD APPLICATION EXTENSION */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-base font-black text-gold-300">🏔️ {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, sIdx) => (
                <div key={sIdx} className="p-3 bg-slate-950 rounded-xl text-xs text-slate-400 border border-slate-800">
                  <span className="font-bold text-gold-400 mr-1">{sIdx + 1}.</span> {st}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PLATFORM FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed with Precision!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C7_PhysicsHeatTransferConductionSim;
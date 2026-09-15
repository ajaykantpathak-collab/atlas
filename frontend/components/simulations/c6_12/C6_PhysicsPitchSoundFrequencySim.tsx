'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C6_PHY_031 = 'c6_phy_031';
const NODE_C6_PHY_032 = 'c6_phy_032';
const NODE_C6_PHY_033 = 'c6_phy_033';
const NODE_C6_PHY_034 = 'c6_phy_034';
const NODE_C6_PHY_035 = 'c6_phy_035';
const NODE_C6_PHY_036 = 'c6_phy_036';

const ALL_NODE_IDS = [
  NODE_C6_PHY_031,
  NODE_C6_PHY_032,
  NODE_C6_PHY_033,
  NODE_C6_PHY_034,
  NODE_C6_PHY_035,
  NODE_C6_PHY_036,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Himalayan Science Expedition',
  intro: 'You have joined a school expedition team exploring the foothills of Manali. Your team needs to build a night torch, test an acoustic echo whistle to gauge mountain cliffs, separate magnetic minerals from rock samples, and navigate a dense fog using a magnetic compass!',
  context: 'Master the physics of sound frequency & pitch, complete electric circuits, and magnetic forces to guide your expedition safely.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If you blow a whistle and strike a large mountain bass drum, which sound has a higher pitch, and why?',
  options: [
    'The drum — because it is much louder and bigger in size',
    'The whistle — because its air column vibrates faster at a higher frequency (Hz)',
    'Both have the same pitch because sound travels at the same speed in air',
    'The drum — because low sounds always carry higher pitch energy',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Pitch is about shrillness and frequency (vibrations per second), not how loud or big an object is!',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 Competency Aligned) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Sound Pitch (Recall)
  {
    id: 'ch_phy_001',
    nodeId: NODE_C6_PHY_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the SI unit of frequency, representing one complete vibration per second?',
    options: ['Decibel (dB)', 'Hertz (Hz)', 'Second (s)', 'Metre (m)'],
    correctIndex: 1,
    explanation: 'The SI unit of frequency is the hertz (symbol Hz), named after Heinrich Hertz. One hertz equals one complete vibration per second.',
    hints: [
      'Think about the unit named after the German physicist Heinrich Hertz.',
      'Metres measure length and seconds measure time period.',
      'Frequency is oscillations per second, denoted by Hz.',
    ],
    misconceptionIndex: 2,
  },
  // 2. Foundation - Pitch vs Frequency (Understanding)
  {
    id: 'ch_phy_002',
    nodeId: NODE_C6_PHY_031,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Tuning fork A vibrates 256 times in one second, while tuning fork B vibrates 512 times in one second. Which statement is correct?',
    options: [
      'Fork A produces a shriller, higher-pitched sound than Fork B',
      'Fork B produces a shriller, higher-pitched sound because its frequency is higher (512 Hz)',
      'Both produce the exact same pitch because both are tuning forks',
      'Fork A is louder because 256 vibrations require more force',
    ],
    correctIndex: 1,
    explanation: 'Higher frequency (512 Hz > 256 Hz) directly results in a higher pitch (shrill sound). Loudness depends on amplitude, not frequency.',
    hints: [
      'Pitch has a direct relationship with frequency.',
      'More vibrations per second means a higher frequency.',
      '512 vibrations per second is 512 Hz, which is higher in pitch than 256 Hz.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation - Circuit Basics (Recall)
  {
    id: 'ch_phy_003',
    nodeId: NODE_C6_PHY_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a standard circuit diagram, what does the long thin vertical line in a cell symbol represent?',
    options: ['Negative terminal (-)', 'Positive terminal (+)', 'Switch contact', 'Bulb filament'],
    correctIndex: 1,
    explanation: 'In the standard circuit symbol for a cell, the long thin line denotes the positive terminal (+), and the short thick line denotes the negative terminal (-).',
    hints: [
      'The two parallel lines are not identical: one is long and thin, the other is short and thick.',
      'A common mistake is thinking the long line is negative because it looks like a stretched minus sign.',
      'The long thin line is ALWAYS the positive (+) terminal.',
    ],
    misconceptionIndex: 1,
  },
  // 4. Foundation - Drag Label Circuit Components (Understanding)
  {
    id: 'ch_phy_004',
    nodeId: NODE_C6_PHY_032,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct component labels to match their functional locations in the simple torch circuit diagram.',
    dragItems: [
      { label: 'Source (Cell)', targetId: 'part_source' },
      { label: 'Load (Bulb)', targetId: 'part_load' },
      { label: 'Controller (Switch)', targetId: 'part_switch' },
      { label: 'Conductor (Copper Wire)', targetId: 'part_wire' },
    ],
    correctMapping: {
      part_source: 'Source (Cell)',
      part_load: 'Load (Bulb)',
      part_switch: 'Controller (Switch)',
      part_wire: 'Conductor (Copper Wire)',
    },
    explanation: 'A simple circuit consists of a source (cell) that converts chemical energy to electrical energy, conductors (wires), a controller (switch), and a load (bulb) that converts electrical energy into light.',
    hints: [
      'The cell is the energy source pumping electrons.',
      'The bulb is the load glowing with light.',
      'The switch opens or closes the path.',
    ],
  },
  // 5. Foundation - Magnetic Poles (Recall)
  {
    id: 'ch_phy_005',
    nodeId: NODE_C6_PHY_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Where is the magnetic attractive force strongest on a rectangular bar magnet?',
    options: [
      'At the exact centre of the magnet',
      'Evenly distributed along all sides',
      'At the two ends known as the North and South poles',
      'Only on the top painted surface',
    ],
    correctIndex: 2,
    explanation: 'The magnetic force is concentrated and strongest at the two ends (poles). Iron filings cling heavily to the poles and scarcely at the centre.',
    hints: [
      'Think about where iron filings cluster when a magnet is dipped into a tray of filings.',
      'The middle region of a bar magnet has the weakest attraction.',
      'The two ends are the poles (North and South).',
    ],
    misconceptionIndex: 3,
  },
  // 6. Foundation - Magnetic Materials (Recall)
  {
    id: 'ch_phy_006',
    nodeId: NODE_C6_PHY_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following groups contains ONLY magnetic materials that are strongly attracted by a bar magnet?',
    options: [
      'Iron, Copper, Aluminium',
      'Iron, Nickel, Cobalt',
      'Copper, Brass, Gold',
      'Silver, Nickel, Plastic',
    ],
    correctIndex: 1,
    explanation: 'The three primary ferromagnetic materials studied in Class 6 are Iron, Nickel, and Cobalt. Copper and aluminium are metals, but they are non-magnetic.',
    hints: [
      'Not all metals are magnetic!',
      'Copper and aluminium will not stick to a magnet.',
      'Remember the classic trio: Iron, Nickel, and Cobalt.',
    ],
    misconceptionIndex: 0,
  },
  // 7. Foundation - Law of Magnetic Poles (Understanding)
  {
    id: 'ch_phy_007',
    nodeId: NODE_C6_PHY_035,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When the North pole of a bar magnet is brought near the North pole of a freely suspended magnet, what happens?',
    options: [
      'They snap together and attract with strong force',
      'They repel each other and the suspended magnet swings away',
      'Nothing happens because non-contact forces need a medium',
      'The suspended magnet loses its magnetism completely',
    ],
    correctIndex: 1,
    explanation: 'The fundamental law of magnetism states: Like poles repel (N-N or S-S) and unlike poles attract (N-S).',
    hints: [
      'Are N and N like poles or unlike poles?',
      'Like poles push away from each other.',
      'N facing N causes repulsion.',
    ],
  },
  // 8. Standard - Frequency Calculation (Application - Numeric)
  {
    id: 'ch_phy_008',
    nodeId: NODE_C6_PHY_031,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A thin sitar wire makes 1,200 complete oscillations in 3 seconds. What is its vibration frequency in Hertz (Hz)?',
    correctAnswer: 400,
    tolerance: 1,
    unit: 'Hz',
    explanation: 'Frequency = (Total oscillations) / (Time in seconds) = 1200 / 3 = 400 Hz. This high frequency creates a sharp, high-pitched treble note.',
    hints: [
      'Frequency is the number of vibrations in ONE single second.',
      'Divide the total vibrations (1200) by the total time in seconds (3).',
      '1200 / 3 = 400 Hz.',
    ],
  },
  // 9. Standard - Straw Flute Pitch (Application)
  {
    id: 'ch_phy_009',
    nodeId: NODE_C6_PHY_031,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An ICSE student cuts a 12 cm drinking straw down to 4 cm and blows across the top. What change occurs in the sound, and why?',
    options: [
      'The sound becomes lower in pitch because there is less plastic material',
      'The sound becomes higher in pitch because the shorter air column vibrates at a higher frequency',
      'The sound becomes much louder because air moves faster, with no change in pitch',
      'The pitch remains identical because the straw diameter did not change',
    ],
    correctIndex: 1,
    explanation: 'A shorter vibrating air column oscillates more rapidly, producing a higher frequency and therefore a higher-pitched (shrill) note.',
    hints: [
      'How does the length of an air column affect vibration speed?',
      'Shorter air columns complete more cycles per second.',
      'Higher frequency means higher pitch.',
    ],
  },
  // 10. Standard - Open Circuit Identification (Analysis)
  {
    id: 'ch_phy_010',
    nodeId: NODE_C6_PHY_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A torch switch is set to ON, but the bulb does not glow. A student tests the cell and finds it is fresh. Which fault could explain why this is an open circuit?',
    options: [
      'The copper wire is coated in plastic insulation on the outside',
      'The tungsten filament inside the bulb has broken (fused bulb)',
      'The switch has completed the path between its metallic terminals',
      'Current is flowing too fast for the human eye to see',
    ],
    correctIndex: 1,
    explanation: 'A broken filament creates a physical air gap inside the conducting loop. Because air is an insulator at 1.5 V, current halts completely, making it an open circuit.',
    hints: [
      'Look for where the continuous metal conducting loop is broken.',
      'Plastic on the outside is an insulator, but metal wires inside conduct.',
      'A broken bulb filament creates a gap in the circuit loop.',
    ],
  },
  // 11. Standard - Construct a Closed Circuit (Construct)
  {
    id: 'ch_phy_011',
    nodeId: NODE_C6_PHY_032,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the four necessary elements in order to create an unbroken closed circuit loop that lights the bulb.',
    availableParts: ['Positive Terminal (+)', 'Connecting Wire', 'Closed Switch', 'Bulb Filament', 'Negative Terminal (-)'],
    targetState: 'Positive Terminal (+) Connecting Wire Closed Switch Bulb Filament Negative Terminal (-)',
    validationHint: 'Build the path from positive terminal through wire, closed switch, bulb filament, to negative terminal.',
    explanation: 'Current flows continuously when electrons have a complete path from the cell (+) terminal, through conductors, closed switch, and bulb, returning to the (-) terminal.',
    hints: [
      'Start with the power source positive terminal (+).',
      'Connect via wire and closed switch to the bulb filament.',
      'Complete the return loop to the negative terminal (-).',
    ],
  },
  // 12. Standard - Breaking a Magnet (Understanding)
  {
    id: 'ch_phy_012',
    nodeId: NODE_C6_PHY_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A carpenter accidentally cuts a bar magnet into two equal halves. What is the result?',
    options: [
      'One half has only a North pole and the other has only a South pole (isolated monopoles)',
      'Both pieces lose all magnetic power and turn into ordinary iron',
      'Two complete smaller magnets are formed, each having both a North and a South pole',
      'The cut ends become neutral and the original outer ends remain the only poles',
    ],
    correctIndex: 2,
    explanation: 'Magnetic monopoles do not exist in ordinary magnets. When cut, each piece develops its own North and South pole, forming two complete magnets.',
    hints: [
      'Can a magnetic North pole exist by itself without a South pole?',
      'Poles always come in inseparable pairs.',
      'Each broken piece becomes a complete bar magnet.',
    ],
    misconceptionIndex: 1,
  },
  // 13. Standard - Repulsion as the Surest Test (Evaluation)
  {
    id: 'ch_phy_013',
    nodeId: NODE_C6_PHY_035,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why is repulsion — and NOT attraction — considered the only sure test to prove an unknown metal bar is a permanent magnet?',
    options: [
      'Because magnets are only attracted to non-metals',
      'Because a magnet attracts both opposite magnetic poles AND unmagnetised magnetic materials like iron; only two like poles repel',
      'Because repulsive forces are ten times stronger than attractive forces',
      'Because unmagnetised iron always repels bar magnets',
    ],
    correctIndex: 1,
    explanation: 'A magnet attracts unmagnetised iron, steel, nickel, and cobalt. However, repulsion happens ONLY between two like magnetic poles. Thus, repulsion proves both objects are magnets.',
    hints: [
      'What happens when you bring a magnet near a plain, unmagnetised iron nail?',
      'Attraction occurs with any magnetic material, whether it is magnetised or not.',
      'Only like poles of two magnets repel each other.',
    ],
  },
  // 14. Standard - Magnetic Compass Principles (Analysis)
  {
    id: 'ch_phy_014',
    nodeId: NODE_C6_PHY_036,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does the red (North-seeking) tip of a compass needle point towards the Earth’s geographic North?',
    options: [
      'Because the Earth’s magnetic North pole is located at geographic North and repels it',
      'Because near the Earth’s geographic North lies the Earth’s magnetic South pole, which attracts the needle’s North pole',
      'Because the Sun’s gravitational pull pulls the painted red dye on the needle',
      'Because friction on the sharp pivot forces the needle to face the equator',
    ],
    correctIndex: 1,
    explanation: 'The Earth acts as a giant magnet whose magnetic South pole is situated near the geographic North pole. By the law of unlike poles attracting, the needle’s North pole points towards geographic North.',
    hints: [
      'Remember the fundamental rule: unlike poles attract!',
      'If the North pole of the needle is pulled towards the Arctic (geographic North), what kind of magnetic pole must be there?',
      'Earth’s magnetic South pole lies near geographic North.',
    ],
    misconceptionIndex: 0,
  },
  // 15. Advanced - Sorting Navigation Steps (Analysis - Drag Sort)
  {
    id: 'ch_phy_015',
    nodeId: NODE_C6_PHY_036,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the correct sequence of steps to determine the East direction in an open field using a magnetic compass.',
    sortItems: [
      'Place the compass flat and steady on a non-magnetic wooden surface',
      'Wait for the magnetic needle to stop oscillating on its pivot',
      'Identify the direction pointed by the red North-seeking needle tip (North)',
      'Turn 90 degrees clockwise to your right to face true East',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'To find East: 1) Place compass flat away from iron; 2) Allow needle to settle; 3) Read North from the red tip; 4) Face North, then East is exactly 90° to your right.',
    hints: [
      'First, the compass must be placed flat without moving.',
      'Wait for the needle to balance and settle.',
      'East is always 90° clockwise (to the right) from North.',
    ],
  },
  // 16. Advanced - Circuit Energy Conversion Chain (Analysis)
  {
    id: 'ch_phy_016',
    nodeId: NODE_C6_PHY_032,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Trace the complete energy conversion sequence that takes place when a closed circuit torch is turned ON.',
    options: [
      'Chemical Energy in cell → Electrical Energy in wires → Light and Heat Energy in bulb filament',
      'Electrical Energy in cell → Chemical Energy in wires → Light Energy in glass bulb',
      'Light Energy in bulb → Chemical Energy in wires → Electrical Energy in cell',
      'Nuclear Energy in cell → Magnetic Energy in switch → Light Energy in bulb',
    ],
    correctIndex: 0,
    explanation: 'Chemical reactions inside the cell release electrical energy. The electrical current heats the tungsten filament to incandescence, producing light and heat.',
    hints: [
      'What form of energy is stored inside a dry cell battery?',
      'What flows through the copper conductor wires?',
      'What forms of energy are emitted by a glowing hot bulb filament?',
    ],
  },
  // 17. Advanced - Pitch vs Amplitude Evaluation (Evaluation)
  {
    id: 'ch_phy_017',
    nodeId: NODE_C6_PHY_031,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims: "A lion\'s roar is higher pitched than a mosquito\'s buzz because the lion is much louder." Evaluate this claim.',
    options: [
      'Correct — loudness and pitch are identical physical properties governed by amplitude',
      'Incorrect — loudness depends on amplitude (lion has high amplitude), but pitch depends on frequency (mosquito wings vibrate at 600 Hz, giving high pitch)',
      'Correct — larger animals always have vocal cords with higher vibration frequencies',
      'Incorrect — both sounds have exactly 100 Hz frequency but differ in wavelength',
    ],
    correctIndex: 1,
    explanation: 'Loudness and pitch are independent properties. The lion’s roar has large amplitude (loud) but low frequency (grave/low pitch). The mosquito buzz has small amplitude (soft) but very high frequency (shrill/high pitch).',
    hints: [
      'Keep the pairs separate: Loudness ↔ Amplitude, Pitch ↔ Frequency.',
      'Does a mosquito make a deep bass sound or a sharp shrill sound?',
      'A mosquito buzzes with hundreds of wing flaps per second (high frequency).',
    ],
    misconceptionIndex: 0,
  },
  // 18. Advanced - Magnetic Shielding & Interference (Application)
  {
    id: 'ch_phy_018',
    nodeId: NODE_C6_PHY_036,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A trekker in Himachal Pradesh places a compass directly on top of a steel ammunition box. The compass needle spins wildly and points towards the box handle. Why?',
    options: [
      'Earth’s magnetic field ceases to exist above 2000 metres elevation',
      'Steel contains iron (a magnetic material) which attracts the compass needle and distorts the Earth’s weak magnetic field',
      'The compass needle loses its magnetism when placed at low temperatures',
      'The brass casing of the compass has melted onto the box',
    ],
    correctIndex: 1,
    explanation: 'Nearby ferromagnetic objects like steel or iron distort the local magnetic field. Compasses must always be read away from magnetic metals to give accurate geographic readings.',
    hints: [
      'What is steel made of?',
      'Iron and steel attract magnetic compass needles.',
      'Nearby iron creates magnetic interference.',
    ],
  },
  // 19. Advanced - Multi-condition Circuit Diagnosis (Analysis)
  {
    id: 'ch_phy_019',
    nodeId: NODE_C6_PHY_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Three identical circuits are set up. Circuit 1 has an open switch. Circuit 2 has a wire disconnected from the (-) terminal. Circuit 3 has a broken filament. In which circuit(s) will current flow?',
    options: [
      'Only in Circuit 1 because the switch can be bypassed',
      'In none of the circuits (Current = 0 in all three)',
      'In Circuit 2 because current leaves the (+) terminal before reaching the break',
      'In all three circuits because electrical energy is present in the cells',
    ],
    correctIndex: 1,
    explanation: 'Current requires a complete, unbroken closed loop from (+) to (-). If ANY gap exists (open switch, loose wire, broken filament), the entire flow ceases immediately across all parts.',
    hints: [
      'Can electrons flow if there is a gap anywhere in the circle?',
      'Current does not "pile up" or flow halfway; it needs an unbroken loop.',
      'All three circuits have a gap, so current is zero in all three.',
    ],
    misconceptionIndex: 2,
  },
  // 20. Advanced - Creative Instrument Design (Creativity)
  {
    id: 'ch_phy_020',
    nodeId: NODE_C6_PHY_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are designing an acoustic warning device for your expedition. You need a shrill sound that pierces through mountain wind. Which design should you choose?',
    options: [
      'A long, thick, heavy steel wire plucked with low tension',
      'A short, thin, tightly stretched nylon wire vibrating at 800 Hz',
      'A large hollow wooden drum with a loose skin surface',
      'A 30 cm long wide hollow bamboo tube blown softly',
    ],
    correctIndex: 1,
    explanation: 'A short, thin, tightly stretched string completes the highest number of vibrations per second (800 Hz), producing a high-frequency, piercing, shrill pitch.',
    hints: [
      'Piercing, shrill sounds require high frequency.',
      'Thin, short, and tight strings vibrate much faster.',
      '800 Hz will produce a high-pitched note.',
    ],
  },
  // 21. Advanced - Magnetic Levitation Calculation (Application - Numeric)
  {
    id: 'ch_phy_021',
    nodeId: NODE_C6_PHY_035,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Two identical ring magnets (Ring A on bottom, Ring B floating above) repel each other with a force of 15 Newtons. If Ring B has a weight of 15 Newtons, what is the net vertical force in Newtons acting on Ring B at equilibrium?',
    correctAnswer: 0,
    tolerance: 0.1,
    unit: 'N',
    explanation: 'At equilibrium (levitation), the upward repulsive magnetic force (15 N) perfectly balances the downward gravitational weight (15 N), resulting in a net force of 0 N.',
    hints: [
      'When an object is floating steadily without moving up or down, the forces are balanced.',
      'Upward force = 15 N; Downward force = 15 N.',
      'Net Force = Upward - Downward = 15 - 15 = 0 N.',
    ],
  },
  // 22. Advanced - Directional Angles on Compass (Analysis - Numeric)
  {
    id: 'ch_phy_022',
    nodeId: NODE_C6_PHY_036,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'On a standard 360-degree magnetic compass dial where North is 0°, what is the clockwise angular position in degrees for West?',
    correctAnswer: 270,
    tolerance: 1,
    unit: 'degrees',
    explanation: 'The four cardinal points on a 360° compass dial are: North = 0° (or 360°), East = 90°, South = 180°, and West = 270° clockwise from North.',
    hints: [
      'North is at the top (0°).',
      'East is a quarter turn clockwise (90°), South is half turn (180°).',
      'West is three-quarters of a full circle turn: 90° × 3 = 270°.',
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

// ─── DEFAULT ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C6_PHY_031,
  title: 'Sound Frequency, Electric Circuits & Magnetism',
  definition: 'Pitch depends on frequency (vibrations per second in Hz). Electric current requires a closed loop connecting source, switch, and load. Magnets possess North and South poles where magnetic forces are strongest; like poles repel and unlike poles attract. The Earth acts as a giant magnet, allowing compasses to determine cardinal directions.',
  eli5: 'Think of pitch like a fast vs slow swing. A fast swing makes a high squeak; a slow swing makes a deep thud. A circuit is a circular train track — if the bridge is open, the train stops! And magnets are magic friends: red and blue hug (attract), but red and red push away (repel).',
  misconceptions: [
    {
      misconception: 'Pitch and loudness are the same thing (a louder sound has higher pitch).',
      correction: 'Loudness depends on amplitude (how far particles move), while pitch depends on frequency (vibrations per second). A whistle blown softly still has high pitch.',
    },
    {
      misconception: 'The long line of a cell symbol is negative because it looks like a stretched minus sign.',
      correction: 'The long thin line is always the positive terminal (+), and the short thick line is the negative terminal (-).',
    },
    {
      misconception: 'An open circuit still has current moving halfway until it reaches the break.',
      correction: 'Current cannot flow at all without a complete loop. An open circuit has exactly zero current throughout every part.',
    },
    {
      misconception: 'All shiny metals are magnetic and stick to a bar magnet.',
      correction: 'Only ferromagnetic metals (Iron, Nickel, Cobalt) stick to magnets. Copper, aluminium, brass, and gold are non-magnetic.',
    },
    {
      misconception: 'Cutting a magnet in half separates the North pole from the South pole.',
      correction: 'Poles always come in pairs. Cutting a magnet produces two smaller magnets, each with its own North and South poles.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What determines the pitch of a sound?', options: ['Amplitude', 'Frequency', 'Speed of sound', 'Loudness'], correctIndex: 1 },
    { question: 'What is the SI unit of frequency?', options: ['Decibel', 'Hertz', 'Metre', 'Second'], correctIndex: 1 },
    { question: 'In a cell symbol, the short thick line represents:', options: ['Positive (+)', 'Negative (-)', 'Switch', 'Filament'], correctIndex: 1 },
    { question: 'When a circuit switch is OPEN, the bulb:', options: ['Glows dimly', 'Glows brightly', 'Does not glow', 'Flashes'], correctIndex: 2 },
    { question: 'Which of the following is a magnetic material?', options: ['Copper', 'Nickel', 'Aluminium', 'Plastic'], correctIndex: 1 },
    { question: 'What happens when two South poles face each other?', options: ['Attraction', 'Repulsion', 'No force', 'They rotate 180°'], correctIndex: 1 },
    { question: 'Which end of a compass needle points towards geographic North?', options: ['South pole (blue)', 'North pole (red)', 'Middle pivot', 'East needle'], correctIndex: 1 },
    { question: 'If you face North, East is located:', options: ['Behind you', 'To your left', 'To your right', 'Directly in front'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student understands sound frequency vs pitch, analyzes open/closed circuits, predicts magnetic interactions, and uses compass cardinal orientations accurately.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Sound Wave Frequency & Pitch',
    instruction: 'Drag the Frequency Slider to change oscillations per second (Hz) and watch the sound wave compress into a high-pitched treble!',
    interactionType: 'slider-sound',
    nodeId: NODE_C6_PHY_031,
  },
  {
    title: 'Lab 2: Interactive Torch Circuit',
    instruction: 'Toggle the switch and check wire terminals to see electrons flow and light the bulb in a closed circuit!',
    interactionType: 'toggle-circuit',
    nodeId: NODE_C6_PHY_032,
  },
  {
    title: 'Lab 3: Open vs Closed Circuit Fault Finder',
    instruction: 'Simulate a broken filament or disconnected wire to observe why any gap drops current to zero.',
    interactionType: 'fault-tester',
    nodeId: NODE_C6_PHY_033,
  },
  {
    title: 'Lab 4: Magnetic Poles & Iron Filings',
    instruction: 'Hover the bar magnet over magnetic vs non-magnetic materials to see filings cling to the North and South poles.',
    interactionType: 'iron-filings',
    nodeId: NODE_C6_PHY_034,
  },
  {
    title: 'Lab 5: Magnetic Attraction & Repulsion',
    instruction: 'Flip Magnet 2 between N-S orientations and slide it closer to feel non-contact magnetic push or pull!',
    interactionType: 'magnet-poles',
    nodeId: NODE_C6_PHY_035,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If we double the frequency of a vibrating string from 200 Hz to 400 Hz, what happens to the pitch?',
    options: ['Pitch doubles (becomes higher and shriller)', 'Pitch drops by half (becomes deeper)', 'Loudness doubles but pitch stays same', 'Sound becomes completely silent'],
    correctIndex: 0,
    verifyInstruction: 'Now slide the frequency control up to 400 Hz in the wave simulator to verify your prediction!',
    nodeId: NODE_C6_PHY_031,
  },
  {
    question: 'Predict: If you bring the South pole of a magnet near the South pole of a floating magnet, what will happen?',
    options: ['They will stick together instantly', 'The floating magnet will be pushed away (repelled)', 'Both magnets will turn into copper', 'The floating magnet will sink'],
    correctIndex: 1,
    verifyInstruction: 'Set both facing poles to S-S in Lab 5 and observe the repulsion force push the magnet away!',
    nodeId: NODE_C6_PHY_035,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the sound wave crests as frequency increases from 100 Hz to 500 Hz?',
    observableOptions: [
      'The waves get taller in height (amplitude changes)',
      'The wave crests pack tightly together (more cycles per second)',
      'The wave turns into a flat straight line',
      'The wave moves backwards',
    ],
    correctIndex: 1,
    nodeId: NODE_C6_PHY_031,
  },
  {
    question: 'When the circuit switch is opened, what happens to electron movement through the wire?',
    observableOptions: [
      'Electrons continue flowing but glow dimmer',
      'Electrons flow backwards into the cell',
      'Electrons halt completely because the conducting loop is broken',
      'Electrons jump across the air gap as sparks',
    ],
    correctIndex: 2,
    nodeId: NODE_C6_PHY_033,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Expedition Survivalist: Build Your Pocket Compass & Straw Flute',
  description: 'Apply your physics skills at home with two classic ICSE experiments using household materials!',
  steps: [
    'Magnetise a sewing needle by stroking it 30 times in one direction with a fridge magnet.',
    'Float the needle on a small dry leaf in a bowl of water — watch it align with the Earth’s North-South magnetic axis!',
    'Take a plastic drinking straw, cut triangular snips at one end to make a reed, and blow through it.',
    'Snip 2 cm off the straw while blowing: observe the frequency increase as the pitch gets higher!',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN COMPONENT ───
export function C6_PhysicsPitchSoundFrequencySim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C6_PHY_031,
  title = DEFAULT_PROPS.title || 'Sound Frequency & Magnetism',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // ─── SUBJECT CONFIG ───
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'cyan' };

  // ─── CORE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);

  // ─── REFLECTION STATE ───
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explanation: '',
    realLife: '',
  });

  // ─── INTERACTIVE SIMULATION VARIABLES ───
  // 1. Sound Wave Sim State
  const [frequencyVal, setFrequencyVal] = useState(256); // 100 Hz to 800 Hz
  const [amplitudeVal, setAmplitudeVal] = useState(40); // 10 to 80
  const [soundPlaying, setSoundPlaying] = useState(false);

  // 2. Electric Circuit Sim State
  const [switchClosed, setSwitchClosed] = useState(false);
  const [cellVoltage, setCellVoltage] = useState(1.5);
  const [wireConnected, setWireConnected] = useState(true);
  const [filamentIntact, setFilamentIntact] = useState(true);

  // 3. Magnet Sim State
  const [magnetDistance, setMagnetDistance] = useState(60); // 10 to 120 mm
  const [magnet1Pole, setMagnet1Pole] = useState<'N' | 'S'>('N');
  const [magnet2Pole, setMagnet2Pole] = useState<'N' | 'S'>('S');
  const [testedMaterial, setTestedMaterial] = useState<'iron' | 'nickel' | 'copper' | 'wood'>('iron');

  // 4. Compass Sim State
  const [compassAngle, setCompassAngle] = useState(0); // degrees
  const [compassNearIron, setCompassNearIron] = useState(false);

  // ─── BRILLIANT-STYLE PEDAGOGICAL STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ─── HINTS & CHALLENGE STATE ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── CHALLENGE INTERACTION STATE ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── FEEDBACK STATE ───
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasWaveRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCircuitRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED FILTERED CHALLENGES ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeItem = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD EFFECT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY UPDATE EFFECT ───
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

  // ─── SOUND WAVE CANVAS ANIMATION ───
  useEffect(() => {
    const canvas = canvasWaveRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    const renderWave = () => {
      offset += (frequencyVal / 256) * 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid background
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Centerline
      const midY = canvas.height / 2;
      ctx.strokeStyle = '#475569';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(canvas.width, midY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Sine Wave
      ctx.strokeStyle = frequencyVal > 400 ? '#38bdf8' : frequencyVal < 200 ? '#f59e0b' : '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();

      const wavelength = (canvas.width / (frequencyVal / 35));
      for (let x = 0; x < canvas.width; x++) {
        const y = midY + Math.sin((x + offset) * (Math.PI * 2 / wavelength)) * amplitudeVal;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(renderWave);
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, [frequencyVal, amplitudeVal]);

  // ─── CIRCUIT ELECTRON CANVAS ANIMATION ───
  useEffect(() => {
    const canvas = canvasCircuitRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let electronStep = 0;

    const isCircuitClosed = switchClosed && wireConnected && filamentIntact;

    const renderCircuit = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Circuit Wire Loop Coordinates: (60, 40) -> (340, 40) -> (340, 180) -> (60, 180) -> (60, 40)
      ctx.lineWidth = 5;
      ctx.strokeStyle = isCircuitClosed ? '#059669' : '#dc2626';

      // Draw Wire Loop
      ctx.beginPath();
      ctx.moveTo(60, 110);
      ctx.lineTo(60, 40);
      ctx.lineTo(340, 40);
      ctx.lineTo(340, 180);
      ctx.lineTo(60, 180);
      ctx.lineTo(60, 110);
      ctx.stroke();

      // Draw Cell (Left Side)
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(40, 90, 40, 40);
      // Long line (+)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(50, 95);
      ctx.lineTo(70, 95);
      ctx.stroke();
      // Short line (-)
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(55, 125);
      ctx.lineTo(65, 125);
      ctx.stroke();

      // Draw Switch (Top Side)
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(170, 30, 60, 20);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#f59e0b';
      if (switchClosed) {
        ctx.beginPath();
        ctx.moveTo(175, 40);
        ctx.lineTo(225, 40);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(175, 40);
        ctx.lineTo(215, 20);
        ctx.stroke();
      }

      // Draw Bulb (Right Side)
      const bulbGlow = isCircuitClosed;
      ctx.fillStyle = bulbGlow ? '#fef08a' : '#334155';
      ctx.beginPath();
      ctx.arc(340, 110, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Bulb Filament cross
      ctx.strokeStyle = filamentIntact ? '#ef4444' : '#475569';
      ctx.beginPath();
      if (filamentIntact) {
        ctx.moveTo(330, 110);
        ctx.lineTo(340, 95);
        ctx.lineTo(350, 110);
      } else {
        ctx.moveTo(330, 110);
        ctx.lineTo(336, 102);
        ctx.moveTo(344, 102);
        ctx.lineTo(350, 110);
      }
      ctx.stroke();

      // Moving Electrons (only when circuit is closed)
      if (isCircuitClosed) {
        electronStep = (electronStep + 1.5) % 800;
        ctx.fillStyle = '#38bdf8';

        // 12 electrons around the loop
        for (let i = 0; i < 12; i++) {
          const p = (electronStep + i * (800 / 12)) % 800;
          let ex = 60, ey = 40;

          if (p < 280) {
            ex = 60 + p;
            ey = 40;
          } else if (p < 420) {
            ex = 340;
            ey = 40 + (p - 280);
          } else if (p < 700) {
            ex = 340 - (p - 420);
            ey = 180;
          } else {
            ex = 60;
            ey = 180 - (p - 700);
          }

          ctx.beginPath();
          ctx.arc(ex, ey, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(renderCircuit);
    };

    renderCircuit();
    return () => cancelAnimationFrame(animId);
  }, [switchClosed, wireConnected, filamentIntact]);

  // ─── ESCALATING HINTS HANDLER ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentChallengeItem.hints[nextLevel - 1]) {
      setCurrentHint(currentChallengeItem.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(currentChallengeItem.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, currentChallengeItem]);

  // ─── INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── DISCOVERY ANSWER HANDLER ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding! High frequency gives high pitch.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── NAVIGATION HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive physics exploration. Interact with each lab!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Explore the free play sandbox with zero pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us test your skills with progressive challenges.');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now slide the control to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Look closely at the wave crest spacing.');
  }, []);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered sound, circuits, and magnetism.');
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
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // ─── ANSWER VALIDATION HANDLER ───
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (currentChallengeItem.type === 'classify' || currentChallengeItem.type === 'distinguish' || currentChallengeItem.type === 'match') {
      isCorrect = answer === currentChallengeItem.correctIndex;
    } else if (currentChallengeItem.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeItem.correctMapping);
    } else if (currentChallengeItem.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeItem.correctOrder);
    } else if (currentChallengeItem.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (currentChallengeItem.correctAnswer || 0)) <= (currentChallengeItem.tolerance || 0);
    } else if (currentChallengeItem.type === 'construct') {
      isCorrect = answer === currentChallengeItem.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Brilliant deduction.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(currentChallengeItem.nodeId, currentChallengeItem.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + currentChallengeItem.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (currentChallengeItem.misconceptionIndex !== undefined && !hitMisconceptions.includes(currentChallengeItem.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, currentChallengeItem.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us study the complete step-by-step reasoning.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(currentChallengeItem.nodeId, currentChallengeItem.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + currentChallengeItem.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [currentChallengeItem, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // ─── DRAG & DROP HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('drop-correct');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const currentOrder = prev.length > 0 ? prev : (currentChallengeItem.sortItems?.map((_, i) => i) || []);
      const arr = [...currentOrder];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [currentChallengeItem]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (currentChallengeItem.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, currentChallengeItem, handleAnswer]);

  // ─── SOUND TONE PLAY SIMULATOR ───
  const handlePlaySoundTone = useCallback(() => {
    setSoundPlaying(true);
    audioManager.play(frequencyVal > 400 ? 'sparkle' : 'count');
    setTimeout(() => setSoundPlaying(false), 800);
  }, [frequencyVal]);

  // ─── CLEANUP ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── CALCULATED PHYSICAL METRICS ───
  const magneticForceCalculated = useMemo(() => {
    const isLike = magnet1Pole === magnet2Pole;
    const forceMagnitude = Math.round(1000 / Math.max(10, magnetDistance));
    return {
      type: isLike ? 'Repulsion (Push)' : 'Attraction (Pull)',
      magnitude: forceMagnitude,
      isLike,
    };
  }, [magnet1Pole, magnet2Pole, magnetDistance]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-3xl border border-cyan-500/40"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                ICSE Class 6 Physics
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                  difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                  difficulty === 'advanced' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                  'bg-sky-950 text-sky-400 border border-sky-800'
                }`}
              >
                {difficulty} Tier
              </motion.span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white mt-1">{title}</h1>
          </div>
        </div>

        {/* Phase Navigator */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-colors ${
                phase === p ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-cyan-950/50 via-slate-900 to-slate-950 rounded-2xl border border-cyan-800/60 shadow-lg">
            <h2 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
              <span>🏔️</span> {SCENARIO.title}
            </h2>
            <p className="text-slate-300 mt-2 leading-relaxed text-sm md:text-base">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-3 font-medium bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-800/60 rounded-2xl border border-slate-700">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">Curiosity Diagnostic Check</span>
            <h3 className="text-lg font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl border text-sm font-medium transition-all ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-cyan-500 hover:bg-slate-800'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-slate-800 text-center leading-6 text-xs mr-2 font-bold">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-slate-900/90 rounded-xl border border-slate-700">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! Vibrations per second dictate pitch.' : `⚠️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-600/30 text-sm whitespace-nowrap"
                >
                  Launch Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/80 pb-3">
                <h3 className="text-lg font-bold text-cyan-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
              </div>
              <p className="text-amber-300 text-sm font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>

              {/* SLIDE 0: SOUND WAVE SIMULATION */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="lg:col-span-2 space-y-3">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>Oscilloscope Waveform Display</span>
                      <span className="font-mono text-cyan-400">{frequencyVal} Hz | {frequencyVal > 400 ? 'High Pitch (Shrill)' : frequencyVal < 200 ? 'Low Pitch (Grave)' : 'Medium Pitch'}</span>
                    </div>
                    <canvas ref={canvasWaveRef} width={500} height={180} className="w-full bg-slate-900 rounded-xl border border-slate-800 shadow-inner" />
                  </div>

                  <div className="space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                          <span>Frequency: {frequencyVal} Hz</span>
                          <span className="text-cyan-400">{frequencyVal} vib/s</span>
                        </div>
                        <input
                          type="range"
                          min={100}
                          max={700}
                          step={10}
                          value={frequencyVal}
                          onChange={(e) => {
                            setFrequencyVal(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-cyan-500"
                          aria-label="Frequency in Hertz"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                          <span>Amplitude: {amplitudeVal} mm</span>
                          <span className="text-purple-400">{amplitudeVal > 50 ? 'Loud' : 'Soft'}</span>
                        </div>
                        <input
                          type="range"
                          min={100}
                          max={70}
                          value={amplitudeVal}
                          onChange={(e) => setAmplitudeVal(Number(e.target.value))}
                          className="w-full accent-purple-500"
                          aria-label="Amplitude in millimeters"
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handlePlaySoundTone}
                        className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 font-bold rounded-xl text-white text-xs flex items-center justify-center gap-2 shadow"
                      >
                        🔊 {soundPlaying ? 'Playing Tone...' : 'Auditory Pitch Test'}
                      </motion.button>
                    </div>

                    {/* PREDICT-THEN-CHECK HOOK */}
                    {!predictionMade ? (
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                        <p className="font-bold text-cyan-300 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="space-y-1">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              onClick={() => handlePrediction(i)}
                              className="w-full text-left p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800 text-xs text-emerald-300">
                        ✓ Prediction recorded! Slide frequency to 400 Hz to feel the pitch rise!
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 1: INTERACTIVE ELECTRIC CIRCUIT */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="lg:col-span-2 space-y-2">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>Live Circuit Schematic & Electron Stream</span>
                      <span className={`font-bold ${switchClosed && wireConnected && filamentIntact ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {switchClosed && wireConnected && filamentIntact ? '⚡ CLOSED CIRCUIT (Current = 0.5 A)' : '⛔ OPEN CIRCUIT (Current = 0.0 A)'}
                      </span>
                    </div>
                    <canvas ref={canvasCircuitRef} width={400} height={220} className="w-full bg-slate-900 rounded-xl border border-slate-800 shadow-inner" />
                  </div>

                  <div className="space-y-4 flex flex-col justify-between">
                    <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <span className="text-xs font-bold text-cyan-400 uppercase">Circuit Controls</span>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSwitchClosed(!switchClosed);
                          audioManager.play('tap');
                        }}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 ${
                          switchClosed ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        🔘 Switch State: {switchClosed ? 'CLOSED (ON)' : 'OPEN (OFF)'}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setFilamentIntact(!filamentIntact);
                          audioManager.play('pop');
                        }}
                        className={`w-full py-2 rounded-xl text-xs font-medium ${
                          filamentIntact ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}
                      >
                        💡 Bulb Filament: {filamentIntact ? 'Intact (Conducting)' : 'Broken / Fused (Gap)'}
                      </motion.button>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400">
                      <p className="font-semibold text-slate-200 mb-1">Observation Rule:</p>
                      Electrons can only circulate continuously if there is no break anywhere in the loop from (+) to (-).
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: FAULT FINDER LAB */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <h4 className="text-sm font-bold text-cyan-300">Open Circuit Gap Diagnostics</h4>
                  <p className="text-xs text-slate-400">
                    Test how different common faults create air gaps and instantly prevent current flow:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { title: 'Fault 1: Open Switch', desc: 'Blade lifted creates 2 mm air gap', status: !switchClosed },
                      { title: 'Fault 2: Loose Wire', desc: 'Wire terminal disconnected', status: !wireConnected },
                      { title: 'Fault 3: Fused Bulb', desc: 'Filament vaporised by power surge', status: !filamentIntact },
                    ].map((fault, i) => (
                      <div key={i} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-amber-400">{fault.title}</span>
                        <p className="text-xs text-slate-300">{fault.desc}</p>
                        <div className="text-xs font-mono text-rose-400">Loop Status: OPEN (Current = 0 A)</div>
                      </div>
                    ))}
                  </div>

                  {/* OBSERVATION QUESTION HOOK */}
                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-900 rounded-xl border border-cyan-800/60 mt-3">
                      <p className="text-sm font-bold text-white mb-2">{OBSERVATION_QUESTIONS[1].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            onClick={() => handleObservation(i)}
                            className="p-2 text-left rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* SLIDE 3: MAGNET POLES & MATERIALS */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-cyan-400 uppercase">Interactive Bar Magnet</span>
                    <svg viewBox="0 0 320 120" className="w-full bg-slate-900 rounded-xl border border-slate-800">
                      {/* Bar Magnet */}
                      <rect x="40" y="40" width="120" height="40" rx="4" fill="#dc2626" />
                      <text x="100" y="65" textAnchor="middle" fill="white" fontWeight="bold" fontSize="16">NORTH (N)</text>
                      <rect x="160" y="40" width="120" height="40" rx="4" fill="#2563eb" />
                      <text x="220" y="65" textAnchor="middle" fill="white" fontWeight="bold" fontSize="16">SOUTH (S)</text>

                      {/* Iron Filings Clusters */}
                      <g opacity="0.8">
                        {[...Array(25)].map((_, i) => (
                          <circle key={`n-${i}`} cx={40 + (Math.random() * 20 - 10)} cy={60 + (Math.random() * 50 - 25)} r="1.5" fill="#94a3b8" />
                        ))}
                        {[...Array(25)].map((_, i) => (
                          <circle key={`s-${i}`} cx={280 + (Math.random() * 20 - 10)} cy={60 + (Math.random() * 50 - 25)} r="1.5" fill="#94a3b8" />
                        ))}
                        {/* Middle sparse filings */}
                        {[...Array(3)].map((_, i) => (
                          <circle key={`m-${i}`} cx={160 + (Math.random() * 20 - 10)} cy={60 + (Math.random() * 20 - 10)} r="1.5" fill="#64748b" />
                        ))}
                      </g>
                    </svg>
                    <p className="text-xs text-slate-400 text-center">
                      Dense iron filings cluster at North and South poles; centre is virtually neutral.
                    </p>
                  </div>

                  <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-cyan-400 uppercase">Material Attraction Tester</span>
                    <div className="grid grid-cols-2 gap-2">
                      {(['iron', 'nickel', 'copper', 'wood'] as const).map((mat) => (
                        <motion.button
                          key={mat}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setTestedMaterial(mat);
                            audioManager.play(mat === 'iron' || mat === 'nickel' ? 'pickup' : 'pop');
                          }}
                          className={`p-2.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                            testedMaterial === mat ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {mat === 'iron' ? '🧲 Iron Nail' : mat === 'nickel' ? '🪙 Nickel Coin' : mat === 'copper' ? '🔌 Copper Wire' : '🪵 Wooden Block'}
                        </motion.button>
                      ))}
                    </div>

                    <div className={`p-3 rounded-xl border text-xs font-medium ${
                      testedMaterial === 'iron' || testedMaterial === 'nickel'
                        ? 'bg-emerald-950/70 border-emerald-700 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}>
                      {testedMaterial === 'iron' && '✓ Magnetic: Strong attraction by magnetic force!'}
                      {testedMaterial === 'nickel' && '✓ Magnetic: Nickel is one of the 3 primary magnetic metals!'}
                      {testedMaterial === 'copper' && '✗ Non-Magnetic: Copper is a metal, but NOT attracted by magnets!'}
                      {testedMaterial === 'wood' && '✗ Non-Magnetic: Insulators do not interact with magnetic poles.'}
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: ATTRACTION & REPULSION */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-cyan-400">Non-Contact Magnetic Force Lab</span>
                    <span className={`px-2.5 py-1 rounded-full font-bold ${
                      magneticForceCalculated.isLike ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {magneticForceCalculated.type} ({magneticForceCalculated.magnitude} N)
                    </span>
                  </div>

                  <svg viewBox="0 0 500 120" className="w-full bg-slate-900 rounded-xl border border-slate-800">
                    {/* Magnet 1 (Fixed) */}
                    <rect x="40" y="35" width="80" height="50" rx="4" fill={magnet1Pole === 'N' ? '#2563eb' : '#dc2626'} />
                    <text x="80" y="65" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">{magnet1Pole === 'N' ? 'S' : 'N'}</text>
                    <rect x="120" y="35" width="80" height="50" rx="4" fill={magnet1Pole === 'N' ? '#dc2626' : '#2563eb'} />
                    <text x="160" y="65" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">{magnet1Pole}</text>

                    {/* Magnet 2 (Movable by Distance Slider) */}
                    <g transform={`translate(${160 + magnetDistance * 1.5}, 0)`}>
                      <rect x="40" y="35" width="80" height="50" rx="4" fill={magnet2Pole === 'N' ? '#dc2626' : '#2563eb'} />
                      <text x="80" y="65" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">{magnet2Pole}</text>
                      <rect x="120" y="35" width="80" height="50" rx="4" fill={magnet2Pole === 'N' ? '#2563eb' : '#dc2626'} />
                      <text x="160" y="65" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">{magnet2Pole === 'N' ? 'S' : 'N'}</text>
                    </g>

                    {/* Force Lines Indicator */}
                    <path
                      d={magneticForceCalculated.isLike ? "M 210 60 Q 230 40 250 60" : "M 210 60 L 250 60"}
                      stroke={magneticForceCalculated.isLike ? "#f43f5e" : "#10b981"}
                      strokeWidth="3"
                      strokeDasharray="4 4"
                      fill="none"
                    />
                  </svg>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Air Gap Distance: {magnetDistance} mm</span>
                        <span>Force: {magneticForceCalculated.magnitude} N</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={magnetDistance}
                        onChange={(e) => setMagnetDistance(Number(e.target.value))}
                        className="w-full accent-cyan-500"
                        aria-label="Magnet separation distance"
                      />
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setMagnet2Pole(magnet2Pole === 'N' ? 'S' : 'N');
                          audioManager.play('tap');
                        }}
                        className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold border border-slate-700"
                      >
                        🔄 Flip Facing Pole (Currently: {magnet2Pole})
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Bottom Slider Nav Buttons */}
          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white font-bold rounded-xl text-xs"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs font-semibold text-slate-400">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg"
              >
                Enter Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-cyan-300">Physics Laboratory: Free Exploration Mode</h3>
              <p className="text-xs text-slate-400 mt-1">
                Zero grading, zero pressure! Test frequency pitch shifts, switch combinations, and magnetic interactions freely.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-sm shadow-xl"
            >
              Ready for Graded Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Interactive Compass Dial */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase">Field Compass Simulation</span>
              <div className="flex justify-center p-4">
                <svg viewBox="0 0 200 200" className="w-48 h-48">
                  {/* Outer Compass Housing */}
                  <circle cx="100" cy="100" r="90" fill="#0f172a" stroke="#334155" strokeWidth="4" />
                  <circle cx="100" cy="100" r="75" fill="#1e293b" stroke="#475569" strokeWidth="2" />

                  {/* Cardinal Points */}
                  <text x="100" y="40" textAnchor="middle" fill="#ef4444" fontWeight="bold" fontSize="14">N (0°)</text>
                  <text x="170" y="105" textAnchor="middle" fill="#94a3b8" fontWeight="bold" fontSize="14">E (90°)</text>
                  <text x="100" y="170" textAnchor="middle" fill="#94a3b8" fontWeight="bold" fontSize="14">S (180°)</text>
                  <text x="30" y="105" textAnchor="middle" fill="#94a3b8" fontWeight="bold" fontSize="14">W (270°)</text>

                  {/* Needle */}
                  <g transform={`rotate(${compassAngle + (compassNearIron ? 45 : 0)}, 100, 100)`}>
                    {/* North pointer (red) */}
                    <polygon points="100,35 108,100 92,100" fill="#ef4444" />
                    {/* South pointer (blue) */}
                    <polygon points="100,165 108,100 92,100" fill="#3b82f6" />
                    {/* Pivot */}
                    <circle cx="100" cy="100" r="5" fill="#fbbf24" />
                  </g>
                </svg>
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCompassNearIron(!compassNearIron)}
                  className={`w-full py-2 rounded-xl text-xs font-bold ${
                    compassNearIron ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {compassNearIron ? '🧲 Iron Nearby (Deflected)' : '🌲 Open Field (True North)'}
                </motion.button>
              </div>
            </div>

            {/* Quick Circuit Mini-Sandbox */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase">Circuit Quick-Test</span>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-3">
                <div className="text-4xl">{switchClosed && filamentIntact ? '💡' : '⚫'}</div>
                <div className="text-xs font-bold text-slate-300">
                  Bulb Status: {switchClosed && filamentIntact ? 'BRIGHT GLOW (3.0 V Closed)' : 'OFF (Zero Current)'}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSwitchClosed(!switchClosed)}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs shadow"
              >
                Toggle Torch Switch ({switchClosed ? 'ON' : 'OFF'})
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: PROGRESSIVE CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Competency: {currentChallengeItem.competencyLevel.toUpperCase()}
              </span>
              <h2 className="text-base md:text-lg font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-400">
                Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                  difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                  difficulty === 'advanced' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                  'bg-sky-950 text-sky-300 border border-sky-800'
                }`}
              >
                {difficulty}
              </motion.span>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* CHALLENGE CARD CONTAINER */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash ? 'bg-rose-950/70 border-rose-500' : 'bg-slate-800/70 border-slate-700'
            }`}
          >
            <p className="text-base md:text-lg font-semibold text-slate-100 mb-6 leading-relaxed">
              {currentChallengeItem.question}
            </p>

            {/* 1. MCQ OPTIONS (classify / distinguish / match) */}
            {(currentChallengeItem.type === 'classify' || currentChallengeItem.type === 'distinguish' || currentChallengeItem.type === 'match') && currentChallengeItem.options && (
              <div className="space-y-3">
                {currentChallengeItem.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(idx)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                      showExplanation && idx === currentChallengeItem.correctIndex
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/90 border-slate-700 hover:border-cyan-500 text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <span className="inline-block w-6 h-6 rounded-full bg-slate-800 text-center leading-6 text-xs mr-3 font-bold text-cyan-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {option}
                  </motion.button>
                ))}
              </div>
            )}

            {/* 2. DRAG & DROP DIAGRAM LABELING */}
            {currentChallengeItem.type === 'drag-label' && currentChallengeItem.dragItems && (
              <div className="space-y-5">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                  {currentChallengeItem.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-bold rounded-lg cursor-grab shadow"
                    >
                      🏷️ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: 'part_source', name: 'Power Unit' },
                    { id: 'part_load', name: 'Energy Consumer' },
                    { id: 'part_switch', name: 'Circuit Gate' },
                    { id: 'part_wire', name: 'Conductor Path' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 text-center space-y-2 min-h-[90px] flex flex-col justify-center"
                    >
                      <span className="text-xs text-slate-400">{target.name}</span>
                      <div className="text-xs font-bold text-cyan-300">
                        {droppedLabels[target.id] ? droppedLabels[target.id] : '[Drop Label Here]'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Verify Target Placements
                </motion.button>
              </div>
            )}

            {/* 3. DRAG SORT ORDERING */}
            {currentChallengeItem.type === 'drag-sort' && currentChallengeItem.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === currentChallengeItem.sortItems.length
                  ? sortArrangement.map(idx => currentChallengeItem.sortItems![idx])
                  : currentChallengeItem.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-900 rounded-xl border border-slate-700 flex items-center justify-between cursor-grab text-xs md:text-sm text-slate-200"
                  >
                    <span>
                      <strong className="text-cyan-400 mr-2">{displayIdx + 1}.</strong> {item}
                    </span>
                    <span className="text-slate-500 text-xs">☰ Drag to reorder</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="mt-4 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Submit Sequence
                </motion.button>
              </div>
            )}

            {/* 4. NUMERIC INPUT */}
            {currentChallengeItem.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value"
                    className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:border-cyan-500 outline-none w-64"
                  />
                  <span className="text-sm font-bold text-cyan-400">{currentChallengeItem.unit}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Validate Calculation
                </motion.button>
              </div>
            )}

            {/* 5. CONSTRUCT CHALLENGE */}
            {currentChallengeItem.type === 'construct' && currentChallengeItem.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                  {currentChallengeItem.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded-lg text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-3 py-1 bg-cyan-700 text-white rounded-lg text-xs font-bold flex items-center gap-2">
                      {part}
                      <button onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))} className="text-rose-300 hover:text-white">✕</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click elements above to assemble the unbroken loop sequence...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Check Construction
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-slate-900 to-cyan-950/60 rounded-xl border border-cyan-700/60 space-y-3"
              >
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                  <span>🔬</span> Scientific Concept Breakdown:
                </div>

                {currentChallengeItem.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs md:text-sm text-slate-200 leading-relaxed"
                  >
                    <strong className="text-cyan-400">Point {idx + 1}:</strong> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < currentChallengeItem.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-xs font-bold border border-slate-700"
                    >
                      Reveal Next Scientific Point →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-extrabold text-xs shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'View Final Report →' : 'Proceed to Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: EXPEDITION COMPLETION & SRS REVIEW ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-slate-900 via-cyan-950/40 to-slate-950 rounded-3xl border border-cyan-600/60 text-center space-y-4 shadow-2xl">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Expedition Physics Complete!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
              You successfully mastered sound wave frequency, electric loop continuity, and magnetic field directional navigation.
            </p>

            <div className="flex justify-center gap-6 py-4">
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs font-bold text-slate-400 block uppercase">Final Score</span>
                <span className="text-2xl font-black text-cyan-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs font-bold text-slate-400 block uppercase">BKT Mastery</span>
                <span className="text-2xl font-black text-emerald-400 capitalize">{masteryLevel}</span>
              </div>
            </div>

            {/* PERSONALISED MOTIVATIONAL FEEDBACK */}
            <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800 max-w-xl mx-auto text-xs md:text-sm text-emerald-300 font-medium">
              {errors === 0
                ? '🌟 Flawless Mastery! You achieved a perfect score on all Class 6 Physics concepts.'
                : errors <= 3
                ? '🎯 Strong Command! Excellent grasp of circuits and magnetism. Review points below for perfection.'
                : '🌱 Good Effort! Physics concepts take practice. Review your misconception profile below to solidify understanding.'}
            </div>
          </div>

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-800/80 rounded-2xl border border-cyan-700/60 space-y-4 shadow-lg">
            <div className="flex items-center gap-2 border-b border-slate-700 pb-3">
              <span className="text-xl">🤔</span>
              <h3 className="text-base font-bold text-cyan-300 uppercase tracking-wide">
                Reflective Scientific Thinking
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Take a moment to solidify your conceptual understanding through reflection:
            </p>

            <div className="space-y-4">
              {/* Question 1 */}
              <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-700/80 space-y-2">
                <label className="block text-xs md:text-sm font-semibold text-slate-200">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflectionResponses.surprising}
                  onChange={(e) => setReflectionResponses({ ...reflectionResponses, surprising: e.target.value })}
                  placeholder="e.g., I was surprised that a mosquito has a higher pitch than a roaring lion because of its frequency..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none resize-none"
                />
              </div>

              {/* Question 2 */}
              <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-700/80 space-y-2">
                <label className="block text-xs md:text-sm font-semibold text-slate-200">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflectionResponses.explanation}
                  onChange={(e) => setReflectionResponses({ ...reflectionResponses, explanation: e.target.value })}
                  placeholder="e.g., A circuit is like a circular train track: if there's any gap or open switch, the electricity stops completely..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none resize-none"
                />
              </div>

              {/* Question 3 */}
              <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-700/80 space-y-2">
                <label className="block text-xs md:text-sm font-semibold text-slate-200">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflectionResponses.realLife}
                  onChange={(e) => setReflectionResponses({ ...reflectionResponses, realLife: e.target.value })}
                  placeholder="e.g., Fixing a broken torch or fairy lights at home, tuning a musical instrument, or navigating with a compass on a trek..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* MISCONCEPTION PROFILE */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Personalised Misconception Diagnostics
              </h3>
              <div className="space-y-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                      <p className="text-xs text-rose-400 font-bold">❌ Common Trap: {m.misconception}</p>
                      <p className="text-xs text-emerald-300 font-medium">✓ Scientific Truth: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SPACED REPETITION SCHEDULE */}
          <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">SM-2 Spaced Repetition Memory Cycle</h3>
              <p className="text-xs text-slate-400 mt-1">
                Next scheduled review in <span className="font-bold text-cyan-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span> to lock in long-term memory retention.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('discovery');
                setErrors(0);
                setCurrentChallenge(0);
                audioManager.play('whoosh');
              }}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-bold border border-slate-700"
            >
              🔄 Replay Simulation
            </motion.button>
          </div>

          {/* REAL-WORLD ACTIVITY COMPLETION */}
          <div className="p-6 bg-slate-800/60 rounded-2xl border border-slate-700 space-y-3">
            <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <span>🏕️</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="font-bold text-cyan-400">{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Perfect!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_PhysicsPitchSoundFrequencySim;
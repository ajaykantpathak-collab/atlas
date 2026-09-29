'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── CISCE PHYSICS CLASS 6 NODE IDENTIFIERS ───
const NODE_C6_PHY_001 = 'c6_phy_001';
const NODE_C6_PHY_002 = 'c6_phy_002';
const NODE_C6_PHY_003 = 'c6_phy_003';
const NODE_C6_PHY_004 = 'c6_phy_004';
const NODE_C6_PHY_005 = 'c6_phy_005';
const NODE_C6_PHY_006 = 'c6_phy_006';
const NODE_C6_PHY_007 = 'c6_phy_007';
const NODE_C6_PHY_008 = 'c6_phy_008';
const NODE_C6_PHY_009 = 'c6_phy_009';
const NODE_C6_PHY_010 = 'c6_phy_010';

const ALL_NODE_IDS = [
  NODE_C6_PHY_001,
  NODE_C6_PHY_002,
  NODE_C6_PHY_003,
  NODE_C6_PHY_004,
  NODE_C6_PHY_005,
  NODE_C6_PHY_006,
  NODE_C6_PHY_007,
  NODE_C6_PHY_008,
  NODE_C6_PHY_009,
  NODE_C6_PHY_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great ISRO Junior Physics Expedition',
  intro: 'You have been selected as a junior scientist at the Sriharikota Space Centre workshop in Andhra Pradesh! Before the next satellite launch, the flight dynamics and payload calibration team needs you to inspect, measure, and classify physical quantities with absolute standard precision.',
  context: 'A single unmeasured length, uncalibrated mass, wrong temperature unit, or misunderstood trajectory could compromise mission flight telemetry. Are you ready to calibrate instruments and classify motions?',
};

// ─── DISCOVERY CHALLENGE (Hook before learning) ───
const DISCOVERY_QUESTION = {
  question: 'In 1999, the Mars Climate Orbiter was lost because one engineering team used non-standard pounds-force while another used standard Newtons. Why are body-based units (like hand-spans or footsteps) unsafe in science?',
  options: [
    'Body units are too modern and difficult to spell',
    'Body units vary from person to person, giving conflicting measurements',
    'Body units only work in cold climates',
    'Body units are secretly always equal to 1 metre',
  ],
  correctIndex: 1,
  hintAfter: "Exactly! Anjali's hand-span is different from Rohan's. Standard units ensure 1 metre is identical in Delhi, London, or Sriharikota!",
};

// ─── CHALLENGE INTERFACE (NEP 2020 & CISCE 2026 Standards) ───
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

// ─── 22 PROGRESSIVE CHALLENGES (Foundation, Standard, Advanced) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c6_phy_001)
  {
    id: 'ch_01_phy_units',
    nodeId: NODE_C6_PHY_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the official SI base unit of temperature used by scientists worldwide?',
    options: ['Degree Celsius (°C)', 'Fahrenheit (°F)', 'Kelvin (K)', 'Degree Centigrade (deg)'],
    correctIndex: 2,
    explanation: 'The SI base unit of temperature is Kelvin (K). While degree Celsius (°C) is commonly used in everyday labs and weather reports, Kelvin is the international scientific standard.',
    hints: [
      'Think of the SI standard unit named after Lord Kelvin, written without a degree symbol.',
      'It is symbolised by a capital letter K.',
      'The SI unit of temperature is Kelvin (K), not degree Celsius.',
    ],
    misconceptionIndex: 1,
  },
  // 2. Foundation - Drag Label (c6_phy_001 & c6_phy_003 & c6_phy_005)
  {
    id: 'ch_02_drag_units',
    nodeId: NODE_C6_PHY_001,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each physical quantity to its correct SI unit symbol on the instrument bench.',
    dragItems: [
      { label: 'm', targetId: 'slot_length' },
      { label: 'kg', targetId: 'slot_mass' },
      { label: 's', targetId: 'slot_time' },
      { label: 'K', targetId: 'slot_temp' },
    ],
    correctMapping: {
      slot_length: 'm',
      slot_mass: 'kg',
      slot_time: 's',
      slot_temp: 'K',
    },
    explanation: 'Length is measured in metres (m), mass in kilograms (kg), time in seconds (s), and thermodynamic temperature in kelvin (K).',
    hints: [
      'Length uses m, mass uses kg.',
      'Time interval uses s, temperature uses K.',
      'Place m with Length, kg with Mass, s with Time, and K with Temperature.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation - Length (c6_phy_002)
  {
    id: 'ch_03_least_count',
    nodeId: NODE_C6_PHY_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the smallest division (least count) that can be reliably read on a standard 15 cm plastic classroom ruler?',
    options: ['1 centimetre (1 cm)', '1 millimetre (1 mm)', '0.1 millimetre (0.1 mm)', '1 metre (1 m)'],
    correctIndex: 1,
    explanation: 'A 15 cm school ruler has each centimetre divided into 10 equal small subdivisions. Each small subdivision is 1 mm (0.1 cm), which is its least count.',
    hints: [
      'Look at the tiny marks between 0 cm and 1 cm.',
      'There are 10 tiny intervals in 1 centimetre.',
      '1 cm / 10 = 1 mm (least count).',
    ],
    misconceptionIndex: 0,
  },
  // 4. Foundation - Mass (c6_phy_003)
  {
    id: 'ch_04_beam_balance',
    nodeId: NODE_C6_PHY_003,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'An Indian grocery merchant balances a bag of cardamom against standard brass weights of 200 g, 100 g, 50 g, and 20 g on a beam balance. What is the total mass in grams?',
    correctAnswer: 370,
    tolerance: 0,
    unit: 'g',
    explanation: 'Mass = 200 g + 100 g + 50 g + 20 g = 370 g. A beam balance compares unknown mass with the sum of known standard masses.',
    hints: [
      'Add all the brass weight values together.',
      '200 + 100 + 50 + 20 = ?',
      'The sum is 370 g.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Foundation - Time (c6_phy_004)
  {
    id: 'ch_05_time_convert',
    nodeId: NODE_C6_PHY_004,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'How many seconds are there in 1 hour? (Calculate 60 min × 60 s)',
    correctAnswer: 3600,
    tolerance: 0,
    unit: 's',
    explanation: '1 hour = 60 minutes, and 1 minute = 60 seconds. Therefore, 1 hour = 60 × 60 = 3600 s.',
    hints: [
      'First convert 1 hour to 60 minutes.',
      'Each minute contains 60 seconds. Multiply 60 by 60.',
      '60 × 60 = 3600 s.',
    ],
    misconceptionIndex: 0,
  },
  // 6. Foundation - Thermometer (c6_phy_005)
  {
    id: 'ch_06_clinical_kink',
    nodeId: NODE_C6_PHY_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does a clinical doctor’s thermometer have a narrow constriction (kink) just above its bulb?',
    options: [
      'To make the mercury heat up faster',
      'To prevent the mercury column from dropping back immediately before reading',
      'To allow boiling water to be measured safely',
      'To increase the range up to 200 °C',
    ],
    correctIndex: 1,
    explanation: 'The kink stops the liquid from retreating back into the bulb when the thermometer is removed from a patient’s mouth or armpit, allowing an accurate temperature reading.',
    hints: [
      'Think about what happens after you remove the thermometer from a patient.',
      'Without a kink, cold room air would make the liquid level drop immediately.',
      'The kink holds the reading steady until shaken down.',
    ],
    misconceptionIndex: 1,
  },
  // 7. Foundation - Motion Definition (c6_phy_007)
  {
    id: 'ch_07_motion_def',
    nodeId: NODE_C6_PHY_007,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'An object is scientifically defined to be in MOTION if and only if:',
    options: [
      'It is vibrating with high sound',
      'Its position changes with respect to time and a chosen reference point',
      'It gets hotter as time passes',
      'It is moving at the speed of light',
    ],
    correctIndex: 1,
    explanation: 'Motion is the continuous change in position of an object over time relative to a chosen stationary reference point.',
    hints: [
      'Motion requires two key ingredients: space position and time interval.',
      'You must compare against a fixed benchmark called the reference point.',
      'Motion is change in position with respect to time.',
    ],
    misconceptionIndex: 0,
  },
  // 8. Standard - Length Conversion (c6_phy_002)
  {
    id: 'ch_08_length_chain',
    nodeId: NODE_C6_PHY_002,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A solar panel frame at the space station measures 4.75 metres in length. Convert this length into centimetres (cm).',
    correctAnswer: 475,
    tolerance: 0,
    unit: 'cm',
    explanation: 'Since 1 m = 100 cm, 4.75 m × 100 = 475 cm. When converting from a larger unit (m) to a smaller unit (cm), we multiply by the conversion factor.',
    hints: [
      'Remember: 1 metre contains 100 centimetres.',
      'Multiply 4.75 by 100.',
      '4.75 × 100 = 475 cm.',
    ],
    misconceptionIndex: 1,
  },
  // 9. Standard - Curved Line Method (c6_phy_002)
  {
    id: 'ch_09_curved_line_sort',
    nodeId: NODE_C6_PHY_002,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the scientific steps in the correct chronological order for measuring the length of a curved river boundary on a map using thread and a ruler.',
    sortItems: [
      'Lay a thin cotton thread gently along the winding curved line',
      'Mark the start and end points on the thread with fine ink',
      'Straighten the thread taut along a calibrated centimetre ruler',
      'Subtract start mark from end mark and record value with unit (cm)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First trace the curve with thread, mark both extremities with ink, stretch it straight beside a rigid ruler, and compute the difference between endpoint readings.',
    hints: [
      'You cannot read the ruler until the thread is marked and straightened.',
      'Step 1 must be laying the flexible thread along the curve.',
      'Order: Lay thread → Mark with ink → Straighten along ruler → Read and record.',
    ],
    misconceptionIndex: 2,
  },
  // 10. Standard - Area Calculation (c6_phy_006)
  {
    id: 'ch_10_area_rect',
    nodeId: NODE_C6_PHY_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Class 6 Physics laboratory workbook cover has length = 25 cm and breadth = 18 cm. What is its surface area in cm²?',
    correctAnswer: 450,
    tolerance: 0,
    unit: 'cm²',
    explanation: 'Area of rectangle = Length × Breadth = 25 cm × 18 cm = 450 cm². Notice the unit is squared (cm²)!',
    hints: [
      'Use the formula: Area = length × breadth.',
      'Calculate 25 × 18.',
      '25 × 18 = 450 cm².',
    ],
    misconceptionIndex: 0,
  },
  // 11. Standard - Graph Paper Leaf Area (c6_phy_006)
  {
    id: 'ch_11_irregular_area',
    nodeId: NODE_C6_PHY_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A student traces a peepal leaf onto 1 cm × 1 cm graph paper. She counts 28 complete full squares, 8 squares more than half covered (counted as 1), and 6 squares roughly half covered (counted as 0.5). What is the estimated total area in cm²?',
    correctAnswer: 39,
    tolerance: 0,
    unit: 'cm²',
    explanation: 'Total squares = 28 + 8 + (6 × 0.5) = 28 + 8 + 3 = 39 squares. Since each square is 1 cm², the area is approximately 39 cm².',
    hints: [
      'Full squares count as 1 (28).',
      'More than half count as 1 (8).',
      'Half squares count as 0.5 (6 × 0.5 = 3). Sum: 28 + 8 + 3.',
    ],
    misconceptionIndex: 1,
  },
  // 12. Standard - Relative Motion Analysis (c6_phy_007)
  {
    id: 'ch_12_relative_motion',
    nodeId: NODE_C6_PHY_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Rohan is sitting quietly in a Vande Bharat Express train travelling at 130 km/h from Delhi to Kanpur. Which statement is physically TRUE?',
    options: [
      'Rohan is in motion relative to both his co-passenger and the railway platform',
      'Rohan is at rest relative to his train seat, but in motion relative to a banyan tree on the railway platform',
      'Rohan is absolutely at rest throughout the entire universe',
      'Motion does not require any reference point',
    ],
    correctIndex: 1,
    explanation: 'Rest and motion are relative! Relative to his train seat, Rohan’s position does not change over time. Relative to the stationary platform tree, his position changes rapidly.',
    hints: [
      'Think about two different reference points: the train seat vs the tree outside.',
      'Distance from his seat stays 0; distance from the tree changes constantly.',
      'He is at rest relative to the train, but in motion relative to the ground.',
    ],
    misconceptionIndex: 0,
  },
  // 13. Standard - Rectilinear vs Curvilinear (c6_phy_008)
  {
    id: 'ch_13_rectilinear_class',
    nodeId: NODE_C6_PHY_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which of the following represents pure RECTILINEAR motion?',
    options: [
      'A cricket ball thrown by a fielder curving through the air to the wicketkeeper',
      'A stone dropped freely from the top of the Qutub Minar falling vertically straight down',
      'A child enjoying a ride on a giant Ferris wheel',
      'The tip of a second hand sweeping across a dial',
    ],
    correctIndex: 1,
    explanation: 'A dropped stone falls vertically straight down along a single linear path under gravity without deviating sideways, which defines rectilinear motion.',
    hints: [
      'Rectilinear means motion strictly along an unbending straight line.',
      'Thrown ball is curvilinear (parabolic); wheel and clock hand are circular.',
      'A straight free-falling stone is rectilinear.',
    ],
    misconceptionIndex: 0,
  },
  // 14. Standard - Circular Motion Radius (c6_phy_009)
  {
    id: 'ch_14_circular_condition',
    nodeId: NODE_C6_PHY_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What invariant geometric property MUST hold true for an object executing circular motion around a fixed central pivot?',
    options: [
      'The speed must always increase by 10 m/s each second',
      'The distance of the moving object from the central point (radius) remains constant at all times',
      'The object must always travel along a square perimeter',
      'The object stops moving after every 5 seconds',
    ],
    correctIndex: 1,
    explanation: 'In circular motion, every point on the revolving object traces a circle and stays at a fixed distance (the radius r) from the stationary centre point.',
    hints: [
      'Think of a ceiling fan blade or a stone whirled on a string.',
      'Does the string length change while whirling?',
      'The distance from the centre (radius) remains constant.',
    ],
    misconceptionIndex: 1,
  },
  // 15. Standard - Periodic vs Oscillatory (c6_phy_010)
  {
    id: 'ch_15_periodic_eval',
    nodeId: NODE_C6_PHY_010,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Evaluate this statement: "The rotation of the Earth on its axis once every 24 hours is periodic motion, but it is NOT oscillatory motion." Is this statement scientifically sound?',
    options: [
      'Yes: it repeats after a fixed interval (24 h), but does not move to-and-fro about a mean position',
      'No: all periodic motions must swing left and right like a pendulum',
      'No: the Earth is not moving at all',
      'Yes: but only during leap years',
    ],
    correctIndex: 0,
    explanation: 'Periodic motion means repeating after a regular fixed time interval. Oscillatory motion is a specific sub-type requiring to-and-fro movement about a mean position. The Earth spins continuously in one direction without reversing, so it is periodic but not oscillatory.',
    hints: [
      'Does the Earth swing back and forth, or does it keep spinning in one direction?',
      'Periodic = equal time interval. Oscillatory = to-and-fro about a center.',
      'It is periodic (24 h) but NOT oscillatory.',
    ],
    misconceptionIndex: 1,
  },
  // 16. Advanced - Units and Symbol Convention (c6_phy_001 & c6_phy_003)
  {
    id: 'ch_16_cisce_notation',
    nodeId: NODE_C6_PHY_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'According to CISCE ICSE Physics examination rules, which of the following records is written with 100% correct scientific notation?',
    options: ['Mass = 450 Gms.', 'Mass = 450 g.', 'Mass = 450 g', 'Mass = 450 GS'],
    correctIndex: 2,
    explanation: 'SI unit symbols are written in lowercase (g for gram, kg for kilogram), never made plural with an "s", and never followed by a full stop unless ending a sentence.',
    hints: [
      'No full stops inside unit symbols, no capital G for grams, and no plural s.',
      'Gram is simply lowercase "g".',
      '"450 g" is the only correct notation.',
    ],
    misconceptionIndex: 2,
  },
  // 17. Advanced - Area Unit Conversion (c6_phy_006)
  {
    id: 'ch_17_sq_m_to_cm',
    nodeId: NODE_C6_PHY_006,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'How many square centimetres (cm²) are in 1 square metre (1 m²)? (Calculate 100 cm × 100 cm)',
    correctAnswer: 10000,
    tolerance: 0,
    unit: 'cm²',
    explanation: '1 m = 100 cm. Therefore, 1 m² = (1 m) × (1 m) = 100 cm × 100 cm = 10,000 cm².',
    hints: [
      'A 1 m by 1 m tile has sides of 100 cm and 100 cm.',
      'Multiply 100 by 100.',
      '100 × 100 = 10,000 cm².',
    ],
    misconceptionIndex: 0,
  },
  // 18. Advanced - Construct Unit Formula (c6_phy_006)
  {
    id: 'ch_18_construct_area_formula',
    nodeId: NODE_C6_PHY_006,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the derived physical quantity relationship showing that Area is the product of two length dimensions.',
    availableParts: ['Area', '=', 'Length', '×', 'Breadth', '+', 'Time', 'Mass'],
    targetState: 'Area = Length × Breadth',
    validationHint: 'Build: Area = Length × Breadth',
    explanation: 'Area is a derived two-dimensional physical quantity calculated as the product of two linear dimensions: Area = Length × Breadth.',
    hints: [
      'Start with Area, then =, then Length.',
      'Use the multiplication symbol ×.',
      'Complete with Breadth.',
    ],
    misconceptionIndex: 0,
  },
  // 19. Advanced - Periodic vs Non-Periodic Analysis (c6_phy_010)
  {
    id: 'ch_19_bouncing_ball',
    nodeId: NODE_C6_PHY_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A rubber ball dropped onto a concrete floor bounces repeatedly, with each successive bounce reaching a lower height in shorter time until it rests. Why is this motion NON-PERIODIC?',
    options: [
      'Because it never touches the ground',
      'Because the time interval between successive bounces decreases continually instead of remaining constant',
      'Because the ball travels at infinite speed',
      'Because gravity only works on metals',
    ],
    correctIndex: 1,
    explanation: 'Even though the bouncing is repetitive, periodic motion strictly requires equal time intervals. Because each bounce takes less time than the previous one, the motion is non-periodic.',
    hints: [
      'Repetitive motion is only periodic if each cycle takes the EXACT same time.',
      'As bounce height drops, time between bounces shrinks.',
      'Unequal intervals = non-periodic repetitive motion.',
    ],
    misconceptionIndex: 0,
  },
  // 20. Advanced - Thermometer Reading Comparison (c6_phy_005)
  {
    id: 'ch_20_thermometer_eval',
    nodeId: NODE_C6_PHY_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why must a laboratory thermometer be read WHILE its bulb is still immersed in the liquid, whereas a clinical thermometer can be read after removal from a patient?',
    options: [
      'Laboratory thermometers have a kink that forces mercury down immediately',
      'Laboratory thermometers lack a kink, so mercury falls as soon as ambient temperature changes, while clinical thermometers have a kink holding the peak reading',
      'Laboratory thermometers are made of plastic that melts in air',
      'Clinical thermometers only work under direct sunlight',
    ],
    correctIndex: 1,
    explanation: 'Laboratory thermometers have no constriction (kink); as soon as removed, their bulb responds to surrounding room temperature. Clinical thermometers have a kink to keep the mercury thread locked at body temperature until shaken down.',
    hints: [
      'Think about the presence or absence of a kink in both instruments.',
      'Lab thermometer has no kink -> falls immediately on exposure to air.',
      'Clinical thermometer has a kink -> retains peak reading outside the mouth.',
    ],
    misconceptionIndex: 1,
  },
  // 21. Advanced - Multitype Motion Analysis (c6_phy_008 & c6_phy_009)
  {
    id: 'ch_21_bicycle_wheel',
    nodeId: NODE_C6_PHY_009,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A cyclist rides steadily along a straight flat road in Chandigarh. What compound motions are exhibited by the bicycle wheel?',
    options: [
      'Rectilinear motion of the bicycle as a whole, combined with circular/rotational motion of the wheel around its central hub axle',
      'Only periodic oscillatory motion like a sitar string',
      'Pure curvilinear motion with changing radius',
      'Zero motion because the wheel returns to its bottom point',
    ],
    correctIndex: 0,
    explanation: 'The bicycle frame shifts forward in a straight line (translatory rectilinear motion), while every point on the wheel rim rotates in a circle around the axle hub (circular motion).',
    hints: [
      'Consider the whole bike moving forward vs the wheel spinning on its axle.',
      'The axle translates in a straight line (rectilinear).',
      'The rim points rotate in circles around the axle (circular).',
    ],
    misconceptionIndex: 0,
  },
  // 22. Advanced - Stop Watch Precision (c6_phy_004)
  {
    id: 'ch_22_stopwatch_eval',
    nodeId: NODE_C6_PHY_004,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A student times 20 complete swings of a school lab pendulum as 36.4 seconds using a digital stopwatch. What is the time taken for ONE single complete swing?',
    options: ['1.82 s', '3.64 s', '0.728 s', '72.8 s'],
    correctIndex: 0,
    explanation: 'Time for 1 swing = Total time / Number of swings = 36.4 s / 20 = 1.82 s. Timing multiple swings reduces human start/stop reaction error!',
    hints: [
      'Divide 36.4 seconds by 20 swings.',
      '36.4 / 20 = 3.64 / 2.',
      '3.64 / 2 = 1.82 s.',
    ],
    misconceptionIndex: 0,
  },
];

// ─── DEFAULT ENRICHMENT PROPS ───
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
  nodeId: NODE_C6_PHY_001,
  title: 'Physical Quantities, Measurements & Motion',
  definition: 'A physical quantity is any measurable property of an object expressible as a numerical magnitude paired with a standard unit. Standard SI units (metre, kilogram, second, kelvin) provide universally comparable references. Motion is the change in position over time relative to a stationary reference point, categorized into rectilinear, circular, and periodic paths.',
  eli5: 'Think of science like a global recipe: if everyone used their own finger sizes, the cake would ruin! Standard units like metres and kilograms ensure measurements mean the exact same thing everywhere. Motion just means moving from one spot to another as seconds tick by!',
  misconceptions: [
    {
      misconception: 'A measurement is just a number alone without units (e.g. "Length = 5")',
      correction: 'A physical quantity ALWAYS requires both a numerical magnitude and a standard unit (e.g. 5 m or 5 kg). Without the unit, the number is physically meaningless.',
    },
    {
      misconception: 'The SI unit of temperature is Degree Celsius (°C)',
      correction: 'The SI standard base unit of temperature is Kelvin (K). Degree Celsius is an everyday practical scale, but Kelvin is the official SI unit.',
    },
    {
      misconception: 'Body-based units like hand-span or footstep are accurate enough for science',
      correction: 'Body proportions vary widely between individuals. Standard units ensure reproducible, fair, and exact comparisons globally.',
    },
    {
      misconception: 'An object is either universally at rest or in motion for everyone',
      correction: 'Rest and motion are strictly relative to a chosen reference point. A passenger is at rest relative to their train seat, but in rapid motion relative to the platform.',
    },
    {
      misconception: 'Any motion that repeats is automatically periodic motion',
      correction: 'Periodic motion requires repetitions to happen after equal, fixed time intervals. A bouncing ball repeats but takes less time each bounce, so it is non-periodic.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the SI unit of length?', options: ['Centimetre (cm)', 'Metre (m)', 'Kilometre (km)', 'Millimetre (mm)'], correctIndex: 1 },
    { question: 'What is the SI unit of mass?', options: ['Gram (g)', 'Kilogram (kg)', 'Tonne (t)', 'Milligram (mg)'], correctIndex: 1 },
    { question: 'What is the least count of an ordinary 15 cm plastic ruler?', options: ['1 mm', '1 cm', '0.5 cm', '0.1 mm'], correctIndex: 0 },
    { question: 'Which instrument measures short time intervals with start/stop buttons?', options: ['Wall clock', 'Sundial', 'Stopwatch', 'Hourglass'], correctIndex: 2 },
    { question: 'What is the normal human body temperature in Celsius?', options: ['98.6 °C', '37 °C', '100 °C', '0 °C'], correctIndex: 1 },
    { question: 'What is the area of a square tile with side 6 cm?', options: ['24 cm²', '36 cm²', '12 cm²', '36 cm'], correctIndex: 1 },
    { question: 'A dropped apple falls straight down. What type of motion is this?', options: ['Periodic', 'Circular', 'Rectilinear', 'Curvilinear'], correctIndex: 2 },
    { question: 'The blades of a spinning ceiling fan exhibit:', options: ['Circular motion', 'Rectilinear motion', 'Non-periodic motion', 'Zero motion'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student correctly identifies 4 SI quantities, measures lengths/curved lines, balances masses, uses graph paper for area, and classifies rectilinear, circular, and periodic motions.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (Learn by Doing) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Standard Unit Calibrator',
    instruction: 'Select a physical quantity and toggle between body units vs standard SI units to see why science requires fixed references!',
    interactionType: 'unit-calibrator',
    nodeId: NODE_C6_PHY_001,
  },
  {
    title: 'Lab 2: Ruler & Curved Line Thread Workshop',
    instruction: 'Drag the measuring slider to stretch a thread along a curved leaf outline and read its true rectified length against the centimetre ruler.',
    interactionType: 'ruler-leaf',
    nodeId: NODE_C6_PHY_002,
  },
  {
    title: 'Lab 3: Beam Balance Pan Equalizer',
    instruction: 'Click standard brass masses (100g, 50g, 20g, 10g) onto the right pan to balance the unknown sample on the left pan.',
    interactionType: 'beam-balance',
    nodeId: NODE_C6_PHY_003,
  },
  {
    title: 'Lab 4: Thermometer Temperature Chamber',
    instruction: 'Adjust the thermal heat slider to observe the mercury column expand. Compare the clinical kink range (35–42°C) with the laboratory range (-10–110°C).',
    interactionType: 'thermometer-sim',
    nodeId: NODE_C6_PHY_005,
  },
  {
    title: 'Lab 5: Motion Trajectory & Reference Orbit',
    instruction: 'Switch motion modes (Rectilinear free-fall, Circular fan blade, Periodic pendulum) and see position change over time.',
    interactionType: 'motion-simulator',
    nodeId: NODE_C6_PHY_007,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Prediction: If you double the length of a simple pendulum, will the time for one complete swing increase or decrease?',
    options: ['Time increases (swings slower)', 'Time decreases (swings faster)', 'Time remains exactly identical', 'The pendulum stops swinging'],
    correctIndex: 0,
    verifyInstruction: 'Adjust the pendulum length slider in the motion lab to verify your prediction in real-time!',
    nodeId: NODE_C6_PHY_010,
  },
  {
    question: 'Prediction: If you measure a 1 m × 1 m square floor area, how many 1 cm × 1 cm graph paper squares will fit inside?',
    options: ['100 squares', '1,000 squares', '10,000 squares', '100,000 squares'],
    correctIndex: 2,
    verifyInstruction: 'Recall: 100 cm × 100 cm = 10,000 cm². Check the area multiplier in the sandbox!',
    nodeId: NODE_C6_PHY_006,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In the Beam Balance, what indicates that the unknown mass on the left pan matches the standard weights on the right pan?',
    observableOptions: [
      'The central pointer rests vertically at the zero mark and the horizontal beam is level',
      'The right pan hits the floor violently',
      'The beam spins in a full circle continuously',
      'The weights turn bright red',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_PHY_003,
  },
  {
    question: 'Observation: In Circular Motion (like the ceiling fan blade tip), what happens to the distance between the blade tip and the central motor hub as it spins?',
    observableOptions: [
      'It expands and shrinks with every half-turn',
      'It remains strictly constant (equal to radius r)',
      'It drops to zero at the top position',
      'It doubles every 10 seconds',
    ],
    correctIndex: 1,
    nodeId: NODE_C6_PHY_009,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Mission Flight Payload Analyst: Home Physics Audit',
  description: 'Conduct an authentic Indian household physical quantity inspection using standard techniques.',
  steps: [
    '1. Measure your study desk with a 15 cm ruler or tape: record in both metres (m) and centimetres (cm).',
    '2. Take a fresh leaf from a neem or mango tree, trace its perimeter on graph paper, and estimate its surface area in cm².',
    '3. Construct a simple pendulum at home using a 1-metre cotton thread and a steel nut/eraser; time 10 swings with your phone stopwatch to find the period.',
    '4. Note the temperature of boiled water and chilled refrigerator water using a thermometer in °C, and convert to Kelvin (K = °C + 273.15).',
  ],
};

// ════════════════════════════════════════════════════════════════════════════
// ─── MAIN REACT COMPONENT ───
// ════════════════════════════════════════════════════════════════════════════
function C6_PhysicsPhysicalQuantitiesUnitsSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚛️', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Prediction & Observation States
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Lab 1: Unit Calibrator
  const [selectedQuantity, setSelectedQuantity] = useState<'length' | 'mass' | 'time' | 'temp'>('length');
  const [useStandardUnit, setUseStandardUnit] = useState(false);
  const [calibratorValue, setCalibratorValue] = useState(2.5);

  // Interactive Lab 2: Ruler & Curved Leaf Thread
  const [threadTautProgress, setThreadTautProgress] = useState(0); // 0 (curved on leaf) to 100 (straight on ruler)
  const [rulerZeroOffset, setRulerZeroOffset] = useState(0); // mm offset

  // Interactive Lab 3: Beam Balance
  const [leftPanMass, setLeftPanMass] = useState(180); // Target unknown sample: 180g
  const [rightPanWeights, setRightPanWeights] = useState<number[]>([]);
  const [balanceTilt, setBalanceTilt] = useState(-20); // Degrees tilt

  // Interactive Lab 4: Thermometer
  const [chamberTemp, setChamberTemp] = useState(37); // °C
  const [thermometerType, setThermometerType] = useState<'clinical' | 'laboratory'>('clinical');

  // Interactive Lab 5: Motion Trajectories
  const [motionType, setMotionType] = useState<'rectilinear' | 'circular' | 'periodic'>('rectilinear');
  const [pendulumLength, setPendulumLength] = useState(100); // cm
  const [isMotionRunning, setIsMotionRunning] = useState(true);

  // Challenge Engine States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop & sorting states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses state
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── REAL-TIME CALCULATIONS: BALANCE BEAM TILT ───
  const totalRightMass = useMemo(() => {
    return rightPanWeights.reduce((sum, w) => sum + w, 0);
  }, [rightPanWeights]);

  useEffect(() => {
    const diff = totalRightMass - leftPanMass;
    const targetAngle = Math.max(-25, Math.min(25, diff * 0.25));
    setBalanceTilt(targetAngle);
    if (Math.abs(diff) === 0 && totalRightMass > 0) {
      audioManager.play('balance');
      speechManager.speak('Equilibrium reached! The beam is perfectly balanced.');
    }
  }, [totalRightMass, leftPanMass]);

  // ─── FILTER CHALLENGES BY CURRENT DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD INITIAL MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C6_PHY_001);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
    speechManager.speak('Welcome to the ISRO Junior Physics Lab! Let us explore physical quantities, measurements, and motion.');
  }, [nodeId]);

  // ─── ADAPT DIFFICULTY VIA BKT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const level = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(level);
    const newDiff = level === 'not-started' || level === 'beginner' ? 'foundation' : level === 'developing' ? 'standard' : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── ESCALATING HINTS HANDLER ��──
  const showNextHint = useCallback(() => {
    const nextLvl = hintCount + 1;
    if (nextLvl <= 3 && challenge.hints && challenge.hints[nextLvl - 1]) {
      const hintText = challenge.hints[nextLvl - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLvl);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLvl}: ${hintText}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('All hints explored. Let us study the complete solution step by step.');
    }
  }, [hintCount, challenge]);

  // ─── INACTIVITY AUTO-HINT ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── DISCOVERY ANSWER HANDLER ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding scientific intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── NAVIGATION HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab. Try manipulating the instruments!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with all physics parameters freely!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    resetInactivityTimer();
    speechManager.speak('Challenge mode initiated. Calibrate your answers carefully!');
  }, [resetInactivityTimer]);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the simulation below to check if your hypothesis holds.');
  }, []);

  const handleObservation = useCallback(
    (idx: number) => {
      setObservationIndex(idx);
      setObservationAnswered(true);
      const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
      audioManager.play(isCorrect ? 'success' : 'error');
      speechManager.speak(isCorrect ? 'Sharp observation! That is the hallmark of a real physicist.' : 'Look closely at the horizontal beam pointer.');
    },
    []
  );

  // ─── LAB INTERACTION HANDLERS ───
  const handleAddWeight = useCallback((w: number) => {
    setRightPanWeights((prev) => [...prev, w]);
    audioManager.play('pickup');
  }, []);

  const handleClearWeights = useCallback(() => {
    setRightPanWeights([]);
    audioManager.play('pop');
  }, []);

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
      const base = prev.length > 0 ? [...prev] : (challenge.sortItems || []).map((_, i) => i);
      const [moved] = base.splice(fromIndex, 1);
      base.splice(toIndex, 0, moved);
      return base;
    });
  }, [challenge]);

  // ─── ANSWER SUBMISSION HANDLER ───
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
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Spot on! Excellent physics reasoning.');
        setShowConfetti(true);
        setShowSparkle(true);
        setSparklePos({ x: 250, y: 150 });
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
          speechManager.speak('Let us study the complete solution step by step.');
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
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You scored ${finalScore} percent on Physical Quantities, Measurement and Motion!`);
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE ───
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

  // ─── 2D HTML CANVAS PHYSICS ANIMATION LOOP ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (motionType === 'rectilinear') {
        const y = 30 + (Math.sin(t * 1.5) + 1) * 45;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 20);
        ctx.lineTo(canvas.width / 2, 120);
        ctx.stroke();

        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, y, 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, y);
        ctx.lineTo(canvas.width / 2, y + 15);
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px monospace';
        ctx.fillText(`Straight Line Path: y = ${(y - 20).toFixed(1)} mm`, canvas.width / 2 + 18, y + 4);
      } else if (motionType === 'circular') {
        const cx = canvas.width / 2;
        const cy = 70;
        const r = 45;
        const angle = t * 2;
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);

        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.stroke();

        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fbbf24';
        ctx.font = '10px monospace';
        ctx.fillText(`Fixed Radius r = 45 cm`, cx - 55, 130);
      } else if (motionType === 'periodic') {
        const cx = canvas.width / 2;
        const cy = 20;
        const L = 80;
        const maxAngle = 0.5;
        const angle = maxAngle * Math.sin(t * 2);
        const bx = cx + L * Math.sin(angle);
        const by = cy + L * Math.cos(angle);

        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(cx - 15, cy - 5, 30, 5);

        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(bx, by);
        ctx.stroke();

        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx, cy + L + 10);
        ctx.setLineDash([]);

        ctx.fillStyle = '#a855f7';
        ctx.beginPath();
        ctx.arc(bx, by, 11, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#c084fc';
        ctx.font = '10px monospace';
        ctx.fillText(`Periodic To-and-Fro (T = 1.82 s)`, cx - 75, 130);
      }

      if (isMotionRunning) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [motionType, isMotionRunning]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-900/40 border border-gold-500/30 rounded-2xl" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 bg-gold-950 text-gold-400 rounded-md border border-gold-800">
                Class 6 Physics • ICSE
              </span>
              <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md font-mono">
                10 Core Nodes
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800" role="tablist" aria-label="Simulation Phases">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              role="tab"
              aria-selected={phase === p}
              aria-label={`Switch to ${p} phase`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                phase === p
                  ? 'bg-gold-600 text-white shadow-md shadow-gold-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      {phase === 'discovery' && (
        <motion.div
          key="discovery-phase"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="mt-6 space-y-6"
        >
          {/* Mission Scenario Card */}
          <div className="p-6 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-start gap-4">
              <span className="text-4xl" aria-hidden="true">🚀</span>
              <div>
                <h3 className="text-lg font-bold text-gold-200">{SCENARIO.title}</h3>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">{SCENARIO.intro}</p>
                <div className="mt-3 p-3 bg-gold-900/30 rounded-xl border border-gold-700/30 text-xs text-gold-300">
                  🎯 <span className="font-semibold">Flight Context:</span> {SCENARIO.context}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Curiosity Hook */}
          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" aria-hidden="true" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
                Pre-Flight Discovery Question
              </h2>
            </div>
            <p className="text-white text-base font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="group" aria-label="Discovery question options">
              {DISCOVERY_QUESTION.options.map((opt, i) => {
                const isSelectedAndCorrect = discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex;
                const isSelectedAndWrong = discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex;
                return (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={discoveryAnswered}
                    onClick={() => handleDiscoveryAnswer(i)}
                    className={`p-4 text-left rounded-xl text-sm transition-all border ${
                      isSelectedAndCorrect
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                        : isSelectedAndWrong
                        ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-800/70 border-slate-700/60 hover:bg-slate-800 text-slate-200 hover:border-gold-500'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-slate-700 text-xs flex items-center justify-center font-mono shrink-0 mt-0.5" aria-hidden="true">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isSelectedAndCorrect && (
                        <span className="text-emerald-400 font-bold ml-2 shrink-0" aria-label="Correct answer">✓ Correct</span>
                      )}
                      {isSelectedAndWrong && (
                        <span className="text-rose-400 font-bold ml-2 shrink-0" aria-label="Incorrect answer">✗</span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-5 p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="text-sm">
                  <p className={discoveryCorrect ? 'text-emerald-400 font-medium' : 'text-amber-400 font-medium'}>
                    {discoveryCorrect ? '✓ Spot on!' : '💡 Essential Scientific Insight:'}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
                <motion.button
                  aria-label="Enter Flight Calibration Labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-gold-600/30 whitespace-nowrap"
                >
                  Enter Flight Calibration Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ─── PHASE 2: INTERACTIVE EXPLORATION LABS ─── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      {phase === 'explore' && (
        <motion.div
          key="explore-phase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 space-y-4"
        >
          {/* Top Step Breadcrumb Bar */}
          <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800" role="tablist" aria-label="Exploration steps">
            <div className="flex items-center gap-2 overflow-x-auto">
              {EXPLORATION_STEPS.map((st, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={currentSlide === i}
                  aria-label={`Go to step ${i + 1}: ${st.title.split(':')[0]}`}
                  onClick={() => {
                    setCurrentSlide(i);
                    audioManager.play('tap');
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    currentSlide === i
                      ? 'bg-gold-600 text-white shadow-sm'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Step {i + 1}: {st.title.split(':')[0]}
                </button>
              ))}
            </div>
            <span className="text-xs font-mono text-slate-400">
              {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
          </div>

          {/* Active Lab Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-gold-300">{EXPLORATION_STEPS[currentSlide].title}</h2>
              <p className="text-sm text-amber-300/90 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
            </div>

            {/* ─── LAB 1: Standard Unit Calibrator ─���─ */}
            {currentSlide === 0 && (
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                <div className="flex flex-wrap gap-2" role="group" aria-label="Physical quantity selection">
                  {(['length', 'mass', 'time', 'temp'] as const).map((q) => (
                    <motion.button
                      key={q}
                      aria-label={`Select physical quantity ${q}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSelectedQuantity(q);
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider capitalize ${
                        selectedQuantity === q
                          ? 'bg-gold-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div className="space-y-3">
                    <label htmlFor="calibrator-range" className="text-xs text-slate-400 block font-mono">
                      Measurement Magnitude: <span className="text-gold-400 font-bold">{calibratorValue}</span>
                    </label>
                    <input
                      id="calibrator-range"
                      aria-label="Measurement Magnitude Slider"
                      type="range"
                      min={0.5}
                      max={10}
                      step={0.5}
                      value={calibratorValue}
                      onChange={(e) => {
                        setCalibratorValue(parseFloat(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-gold-500"
                    />

                    <div className="flex items-center gap-3">
                      <button
                        aria-label={useStandardUnit ? 'Switch to Non-Standard Body Unit' : 'Switch to SI Standard Unit'}
                        onClick={() => {
                          setUseStandardUnit(!useStandardUnit);
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                          useStandardUnit
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                            : 'bg-amber-600 text-white'
                        }`}
                      >
                        {useStandardUnit ? '✓ Using SI Standard Unit' : '⚠️ Using Non-Standard Body Unit'}
                      </button>
                    </div>
                  </div>

                  {/* Visual Representation Display */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-2">
                    <span className="text-xs font-mono uppercase text-slate-400 block">Recorded Reading</span>
                    <div className="text-2xl font-bold font-mono">
                      {useStandardUnit ? (
                        <span className="text-emerald-400">
                          ✓ {calibratorValue}{' '}
                          {selectedQuantity === 'length'
                            ? 'm (metres)'
                            : selectedQuantity === 'mass'
                            ? 'kg (kilograms)'
                            : selectedQuantity === 'time'
                            ? 's (seconds)'
                            : 'K (kelvin)'}
                        </span>
                      ) : (
                        <span className="text-amber-400">
                          ⚠️ {calibratorValue}{' '}
                          {selectedQuantity === 'length'
                            ? 'hand-spans (Varies per person!)'
                            : selectedQuantity === 'mass'
                            ? 'handfuls of stones'
                            : selectedQuantity === 'time'
                            ? 'heartbeats'
                            : 'warm sensations'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {useStandardUnit
                        ? '✓ Globally reproducible: 1 metre is identical in Delhi, Chennai, or Paris.'
                        : '✗ Unreliable: Adult hand-span (~22 cm) is larger than child hand-span (~15 cm).'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ─── LAB 2: Ruler & Curved Line Thread Workshop ─── */}
            {currentSlide === 1 && (
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="thread-taut-slider" className="text-xs text-slate-400 font-mono">
                    Straighten Thread Progress: <span className="text-gold-400 font-bold">{threadTautProgress}%</span>
                  </label>
                  <span className="text-xs px-2 py-1 bg-slate-800 text-amber-400 rounded-md font-mono">
                    Least count: 1 mm (0.1 cm)
                  </span>
                </div>

                <input
                  id="thread-taut-slider"
                  aria-label="Straighten thread along ruler slider"
                  type="range"
                  min={0}
                  max={100}
                  value={threadTautProgress}
                  onChange={(e) => {
                    setThreadTautProgress(parseInt(e.target.value));
                    audioManager.play('count');
                  }}
                  className="w-full accent-gold-500"
                />

                <svg viewBox="0 0 600 200" className="w-full bg-slate-900 rounded-xl border border-slate-800" role="img" aria-label="Curved leaf measurement simulation against ruler">
                  {/* Calibrated 15 cm Ruler at bottom */}
                  <rect x="50" y="130" width="500" height="40" fill="#1e293b" stroke="#475569" rx="4" />
                  {/* Graduation marks 0 to 10 cm */}
                  {Array.from({ length: 11 }).map((_, cm) => (
                    <g key={cm}>
                      <line
                        x1={50 + cm * 45}
                        y1="130"
                        x2={50 + cm * 45}
                        y2="148"
                        stroke="#f8fafc"
                        strokeWidth="2"
                      />
                      <text
                        x={50 + cm * 45}
                        y="162"
                        fill="#cbd5e1"
                        fontSize="10"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {cm}
                      </text>
                      {cm < 10 &&
                        Array.from({ length: 9 }).map((__, mm) => (
                          <line
                            key={mm}
                            x1={50 + cm * 45 + (mm + 1) * 4.5}
                            y1="130"
                            x2={50 + cm * 45 + (mm + 1) * 4.5}
                            y2={mm === 4 ? '142' : '136'}
                            stroke="#64748b"
                            strokeWidth="1"
                          />
                        ))}
                    </g>
                  ))}
                  <text x="560" y="155" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                    cm
                  </text>

                  {/* Curved Leaf Outline (Taut morph) */}
                  {threadTautProgress === 0 ? (
                    <g>
                      <path
                        d="M 100 70 Q 200 15 320 60 T 450 70 Q 320 110 100 70 Z"
                        fill="#14532d"
                        opacity="0.4"
                        stroke="#22c55e"
                        strokeWidth="2"
                      />
                      <path
                        d="M 100 70 Q 200 15 320 60 T 450 70"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="4"
                        strokeDasharray="6 3"
                      />
                      <circle cx="100" cy="70" r="5" fill="#ef4444" />
                      <circle cx="450" cy="70" r="5" fill="#ef4444" />
                      <text x="100" y="90" fill="#fca5a5" fontSize="10" textAnchor="middle">
                        Start Mark (Ink)
                      </text>
                      <text x="450" y="90" fill="#fca5a5" fontSize="10" textAnchor="middle">
                        End Mark (Ink)
                      </text>
                    </g>
                  ) : (
                    <g>
                      <line
                        x1={50 + (100 - threadTautProgress) * 0.5}
                        y1={70 + (threadTautProgress / 100) * 55}
                        x2={50 + 382.5}
                        y2={70 + (threadTautProgress / 100) * 55}
                        stroke="#f59e0b"
                        strokeWidth="4"
                      />
                      <circle cx="50" cy={70 + (threadTautProgress / 100) * 55} r="4" fill="#ef4444" />
                      <circle cx={50 + 382.5} cy={70 + (threadTautProgress / 100) * 55} r="4" fill="#ef4444" />
                      {threadTautProgress === 100 && (
                        <g>
                          <line x1="50" y1="120" x2="50" y2="130" stroke="#ef4444" strokeWidth="2" />
                          <line x1={50 + 382.5} y1="120" x2={50 + 382.5} y2="130" stroke="#ef4444" strokeWidth="2" />
                          <text x="240" y="115" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
                            ✓ Curved Length = 8.5 cm (85 mm)
                          </text>
                        </g>
                      )}
                    </g>
                  )}
                </svg>
              </div>
            )}

            {/* ─── LAB 3: Beam Balance Pan Equalizer ─── */}
            {currentSlide === 2 && (
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-mono">
                    Left Pan (Sample): <span className="text-amber-400 font-bold">{leftPanMass} g</span> | Right Pan (Weights):{' '}
                    <span className="text-emerald-400 font-bold">{totalRightMass} g</span>
                  </div>
                  <button
                    aria-label="Reset weights on the right pan"
                    onClick={handleClearWeights}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-slate-300"
                  >
                    Reset Weights
                  </button>
                </div>

                {/* Interactive Brass Weights Palette */}
                <div className="flex flex-wrap gap-2 items-center" role="group" aria-label="Brass standard mass weights">
                  <span className="text-xs text-slate-400">Click weights to add:</span>
                  {[100, 50, 20, 10, 5].map((w) => (
                    <motion.button
                      key={w}
                      aria-label={`Add ${w} gram standard weight`}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => handleAddWeight(w)}
                      className="px-3 py-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold rounded-lg shadow-sm"
                    >
                      +{w} g
                    </motion.button>
                  ))}
                </div>

                {/* SVG Beam Balance Diagram */}
                <svg viewBox="0 0 500 220" className="w-full bg-slate-900 rounded-xl border border-slate-800" role="img" aria-label="Beam balance simulation graphic">
                  <polygon points="250,90 235,180 265,180" fill="#334155" stroke="#475569" strokeWidth="2" />
                  <circle cx="250" cy="90" r="7" fill="#94a3b8" />
                  <rect x="200" y="180" width="100" height="15" fill="#1e293b" rx="3" />

                  {/* Horizontal Beam */}
                  <g transform={`rotate(${balanceTilt}, 250, 90)`}>
                    <line x1="80" y1="90" x2="420" y2="90" stroke="#f1f5f9" strokeWidth="6" strokeLinecap="round" />
                    <line x1="250" y1="90" x2="250" y2="140" stroke="#ef4444" strokeWidth="3" />

                    {/* Left Pan */}
                    <line x1="100" y1="90" x2="70" y2="140" stroke="#94a3b8" strokeWidth="1.5" />
                    <line x1="100" y1="90" x2="130" y2="140" stroke="#94a3b8" strokeWidth="1.5" />
                    <path d="M 60 140 Q 100 155 140 140 Z" fill="#475569" stroke="#64748b" />
                    <rect x="85" y="120" width="30" height="20" fill="#d97706" rx="2" />
                    <text x="100" y="134" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                      ? g
                    </text>

                    {/* Right Pan */}
                    <line x1="400" y1="90" x2="370" y2="140" stroke="#94a3b8" strokeWidth="1.5" />
                    <line x1="400" y1="90" x2="430" y2="140" stroke="#94a3b8" strokeWidth="1.5" />
                    <path d="M 360 140 Q 400 155 440 140 Z" fill="#475569" stroke="#64748b" />
                    <g transform="translate(380, 115)">
                      {rightPanWeights.map((w, idx) => (
                        <rect
                          key={idx}
                          x={idx * 6}
                          y={20 - Math.min(18, w * 0.15)}
                          width="7"
                          height={Math.min(18, w * 0.15)}
                          fill="#eab308"
                          stroke="#ca8a04"
                          rx="1"
                        />
                      ))}
                    </g>
                  </g>

                  <path d="M 230 145 Q 250 155 270 145" fill="none" stroke="#64748b" strokeWidth="2" />
                  <circle cx="250" cy="150" r="2" fill="#ef4444" />
                </svg>

                {/* Observation Hook */}
                {totalRightMass === leftPanMass && !observationAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-gold-950/70 border border-gold-700/60 rounded-xl space-y-2"
                  >
                    <p className="text-xs font-semibold text-amber-300">{OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="group" aria-label="Beam balance observation options">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <button
                          key={i}
                          aria-label={`Observation option ${i + 1}: ${opt}`}
                          onClick={() => handleObservation(i)}
                          className="p-2 text-left bg-slate-900 hover:bg-slate-800 text-xs rounded-lg text-slate-200 border border-slate-700"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* ─── LAB 4: Thermometer Temperature Chamber ─── */}
            {currentSlide === 3 && (
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex gap-2" role="group" aria-label="Thermometer type selection">
                    {(['clinical', 'laboratory'] as const).map((t) => (
                      <button
                        key={t}
                        aria-label={`Select ${t} thermometer`}
                        onClick={() => {
                          setThermometerType(t);
                          if (t === 'clinical' && chamberTemp > 42) setChamberTemp(37);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize ${
                          thermometerType === t
                            ? 'bg-gold-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {t} Thermometer
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-mono text-slate-300">
                    Chamber Temperature: <span className="text-amber-400 font-bold">{chamberTemp} °C</span> (
                    {(chamberTemp + 273.15).toFixed(1)} K)
                  </span>
                </div>

                <label htmlFor="temp-slider" className="sr-only">Chamber Temperature Slider</label>
                <input
                  id="temp-slider"
                  aria-label="Chamber temperature slider"
                  type="range"
                  min={thermometerType === 'clinical' ? 35 : -10}
                  max={thermometerType === 'clinical' ? 42 : 110}
                  step={0.5}
                  value={chamberTemp}
                  onChange={(e) => {
                    setChamberTemp(parseFloat(e.target.value));
                    audioManager.play('count');
                  }}
                  className="w-full accent-gold-500"
                />

                <svg viewBox="0 0 500 160" className="w-full bg-slate-900 rounded-xl border border-slate-800" role="img" aria-label="Thermometer tube scale and mercury expansion">
                  <rect x="50" y="65" width="380" height="30" fill="#1e293b" stroke="#64748b" rx="15" />
                  <circle cx="50" cy="80" r="18" fill="#ef4444" stroke="#dc2626" />

                  {thermometerType === 'clinical' && (
                    <path
                      d="M 68 80 Q 75 72 82 85 T 92 80"
                      fill="none"
                      stroke="#fca5a5"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  )}

                  {(() => {
                    const min = thermometerType === 'clinical' ? 35 : -10;
                    const max = thermometerType === 'clinical' ? 42 : 110;
                    const pct = Math.max(0, Math.min(1, (chamberTemp - min) / (max - min)));
                    const threadWidth = 300 * pct;
                    return (
                      <rect
                        x={thermometerType === 'clinical' ? 92 : 68}
                        y="77"
                        width={threadWidth}
                        height="6"
                        fill="#ef4444"
                        rx="3"
                      />
                    );
                  })()}

                  <g transform="translate(100, 60)">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <g key={i} transform={`translate(${i * 42}, 0)`}>
                        <line x1="0" y1="0" x2="0" y2="8" stroke="#94a3b8" strokeWidth="1.5" />
                        <text x="0" y="-4" fill="#cbd5e1" fontSize="9" textAnchor="middle" fontFamily="monospace">
                          {thermometerType === 'clinical' ? 35 + i : -10 + i * 17}
                        </text>
                      </g>
                    ))}
                  </g>
                  <text x="440" y="84" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
                    °C
                  </text>
                </svg>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                  {thermometerType === 'clinical' ? (
                    <span>
                      🩺 <strong>Clinical Range (35°C to 42°C):</strong> Features a constriction (kink) that retains the
                      patient’s body temperature reading even after removal from mouth/armpit.
                    </span>
                  ) : (
                    <span>
                      🧪 <strong>Laboratory Range (-10°C to 110°C):</strong> Wide span with no kink; must be read while
                      the bulb is immersed in the liquid.
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* ─── LAB 5: Motion Trajectory & Reference Orbit ─── */}
            {currentSlide === 4 && (
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex gap-2" role="group" aria-label="Motion trajectory type selection">
                    {(['rectilinear', 'circular', 'periodic'] as const).map((m) => (
                      <button
                        key={m}
                        aria-label={`Select ${m} motion mode`}
                        onClick={() => {
                          setMotionType(m);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize ${
                          motionType === m
                            ? 'bg-gold-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {m} Motion
                      </button>
                    ))}
                  </div>

                  <button
                    aria-label={isMotionRunning ? 'Pause motion animation canvas' : 'Play motion animation canvas'}
                    onClick={() => setIsMotionRunning(!isMotionRunning)}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 rounded-lg"
                  >
                    {isMotionRunning ? '⏸ Pause Canvas' : '▶ Play Canvas'}
                  </button>
                </div>

                <canvas
                  ref={canvasRef}
                  width={450}
                  height={150}
                  className="w-full bg-slate-900 rounded-xl border border-slate-800"
                  aria-label="Interactive 2D physics motion trajectory canvas"
                />

                {motionType === 'periodic' && !predictionMade && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-gold-950/70 border border-gold-700/60 rounded-xl space-y-2"
                  >
                    <p className="text-xs font-semibold text-amber-300">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="group" aria-label="Pendulum prediction options">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <button
                          key={i}
                          aria-label={`Prediction option ${i + 1}: ${opt}`}
                          onClick={() => handlePrediction(i)}
                          className="p-2 text-left bg-slate-900 hover:bg-slate-800 text-xs rounded-lg text-slate-200 border border-slate-700"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Lab Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              aria-label="Go to previous lab step"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentSlide === 0}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold rounded-xl"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to next lab step"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Unlock Free Sandbox Mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Unlock Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ─── PHASE 3: SANDBOX / FREE PLAY MODE ─── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      {phase === 'sandbox' && (
        <motion.div
          key="sandbox-phase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 space-y-6"
        >
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg font-bold text-emerald-300">Physics Sandbox Station</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  No timers, no grading! Freely manipulate variables across all 10 nodes to build rock-solid intuition.
                </p>
              </div>
              <motion.button
                aria-label="Proceed to CISCE Board Challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-gold-600 hover:from-emerald-500 hover:to-gold-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-gold-600/30"
              >
                Ready for CISCE Board Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono uppercase text-gold-400 font-bold">Square Area Multiplier</span>
                <p className="text-xs text-slate-400">1 m × 1 m = (100 cm) × (100 cm)</p>
                <div className="p-3 bg-slate-900 rounded-lg text-center font-mono font-bold text-emerald-400 text-base">
                  1 m² = 10,000 cm²
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono uppercase text-amber-400 font-bold">Time Multiplier Chain</span>
                <p className="text-xs text-slate-400">1 h = 60 min | 1 min = 60 s</p>
                <div className="p-3 bg-slate-900 rounded-lg text-center font-mono font-bold text-amber-300 text-base">
                  1 h = 3600 s
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono uppercase text-purple-400 font-bold">SI Temperature Shift</span>
                <p className="text-xs text-slate-400">T(K) = T(°C) + 273.15</p>
                <div className="p-3 bg-slate-900 rounded-lg text-center font-mono font-bold text-purple-300 text-base">
                  37 °C = 310.15 K
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ─── PHASE 4: CHALLENGE ENGINE ─── */}
      {/* ════════════════════���════════════════════════════════════════════════ */}
      {phase === 'challenge' && (
        <motion.div
          key="challenge-phase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 space-y-4"
        >
          {/* Progress and Difficulty Header */}
          <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-slate-400 font-mono">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : difficulty === 'advanced'
                      ? 'bg-rose-950 text-rose-400 border border-rose-800'
                      : 'bg-gold-950 text-gold-400 border border-gold-800'
                  }`}
                >
                  {difficulty}
                </motion.span>
                <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-mono uppercase">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block font-mono">
                Accuracy: {scoreBreakdown.total > 0 ? Math.round((scoreBreakdown.correct / scoreBreakdown.total) * 100) : 100}%
              </span>
              <span className="text-xs text-gold-400 font-mono">Mastery: {masteryLevel}</span>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-emerald-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          <div className="text-xs text-gold-300 mt-1">
            📅 SM-2 Spaced Repetition: review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to strengthen your memory.
          </div>

          {/* Challenge Box */}
          <div
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-base font-semibold text-white mb-4 leading-relaxed">{challenge.question}</p>

            {/* 1. MCQ Types */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5" role="group" aria-label="Question options">
                  {challenge.options.map((opt, i) => {
                    const isCorrectChoice = showExplanation && i === challenge.correctIndex;
                    return (
                      <motion.button
                        key={i}
                        aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                        transition={wrongShake ? { duration: 0.4 } : {}}
                        onClick={() => handleAnswer(i)}
                        disabled={answerRevealed || showExplanation}
                        className={`w-full p-4 text-left rounded-xl text-sm transition-all border ${
                          isCorrectChoice
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                            : 'bg-slate-800/80 border-slate-700/60 hover:bg-slate-800 text-slate-200 hover:border-gold-500'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-slate-700 text-xs flex items-center justify-center font-mono shrink-0 mt-0.5" aria-hidden="true">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isCorrectChoice && (
                            <span className="text-emerald-400 font-bold ml-2 shrink-0" aria-label="Correct choice">✓ Correct</span>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}

            {/* 2. Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800" role="group" aria-label="Draggable unit symbols">
                  <span className="text-xs text-slate-400 self-center">Drag symbols:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable symbol ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.06 }}
                      className="px-3.5 py-1.5 bg-gold-600 text-white font-mono text-xs font-bold rounded-lg cursor-grab shadow-sm"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'slot_length', title: 'Length' },
                    { id: 'slot_mass', title: 'Mass' },
                    { id: 'slot_time', title: 'Time' },
                    { id: 'slot_temp', title: 'Temperature' },
                  ].map((s) => (
                    <div
                      key={s.id}
                      role="region"
                      aria-label={`Drop target for ${s.title}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(s.id)}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-2 min-h-[90px] flex flex-col items-center justify-center"
                    >
                      <span className="text-xs text-slate-400 uppercase font-mono">{s.title}</span>
                      <div className="text-sm font-mono font-bold text-gold-300">
                        {droppedLabels[s.id] ? `✓ ${droppedLabels[s.id]}` : 'Drop Here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify label mappings"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* 3. Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, idx) => (
                  <motion.div
                    key={idx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Draggable step ${idx + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(idx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, idx);
                    }}
                    className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-slate-200 flex items-center gap-3 cursor-grab hover:border-gold-500"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 text-xs flex items-center justify-center font-mono" aria-hidden="true">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Verify step sequence order"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() =>
                    handleAnswer(
                      sortArrangement.length > 0
                        ? sortArrangement
                        : challenge.sortItems!.map((_, i) => i)
                    )
                  }
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Verify Step Sequence
                </motion.button>
              </div>
            )}

            {/* 4. Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3">
                <input
                  id="numeric-answer-input"
                  aria-label={`Enter numerical value in ${challenge.unit || 'units'}`}
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric magnitude"
                  className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48 focus:border-gold-500 focus:outline-none"
                />
                <span className="text-slate-400 font-mono text-sm font-semibold">{challenge.unit}</span>
                <motion.button
                  aria-label="Submit numeric value"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || numericInput === ''}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Submit Value
                </motion.button>
              </div>
            )}

            {/* 5. Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800" role="group" aria-label="Available formula terms">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part ${part} to formula`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setConstructParts((prev) => [...prev, part]);
                        audioManager.play('tap');
                      }}
                      className="px-3 py-1.5 bg-gold-900/60 border border-gold-700 text-gold-300 text-xs font-mono font-bold rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2" role="region" aria-label="Constructed formula preview">
                  {constructParts.map((p, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gold-600 text-white font-mono text-xs font-bold rounded-lg flex items-center gap-2"
                    >
                      {p}
                      <button
                        aria-label={`Remove part ${p}`}
                        onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-rose-300 hover:text-white"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Assemble formula pieces by clicking buttons above</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify assembled formula"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Verify Formula
                </motion.button>
              </div>
            )}

            {/* ─── CLICK-TO-REVEAL STEPWISE EXPLANATION ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gold-950/40 border border-gold-800/80 rounded-xl space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base" aria-hidden="true">💡</span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gold-300">
                    Step-by-Step Examiner Solution:
                  </h4>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-slate-200 leading-relaxed font-sans"
                    >
                      <span className="font-bold text-amber-400 font-mono">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Reveal next reasoning step"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setRevealedSteps((s) => s + 1);
                      audioManager.play('tap');
                    }}
                    className="px-3.5 py-1.5 bg-gold-800/80 hover:bg-gold-700 text-white text-xs font-semibold rounded-lg"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Flight Report' : 'Proceed to Next Challenge'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 block mt-2"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Flight Report →' : 'Proceed to Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ─── PHASE 5: EXPEDITION COMPLETION, MOTIVATIONAL FEEDBACK & REFLECTION ─── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      {phase === 'complete' && (
        <motion.div
          key="complete-phase"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 space-y-6"
        >
          {/* Mission Debrief Header */}
          <div className="p-6 bg-gradient-to-br from-gold-950 to-slate-900 rounded-2xl border border-gold-700/60 text-center space-y-2">
            <span className="text-5xl" aria-hidden="true">🏆</span>
            <h2 className="text-2xl font-bold text-white">Flight Expedition Completed!</h2>
            <p className="text-sm text-slate-300">
              ISRO Calibration Performance Score:{' '}
              <span className="text-emerald-400 font-bold font-mono text-lg">
                {Math.max(0, 100 - errors * 5)}%
              </span>{' '}
              • Status: <span className="text-gold-300 uppercase font-bold">{masteryLevel}</span>
            </p>
          </div>

          {/* MOTIVATIONAL FEEDBACK */}
          <div
            className={`p-5 rounded-2xl text-sm font-semibold border ${
              errors === 0
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                : errors <= 3
                ? 'bg-gold-950/60 border-gold-500 text-gold-300'
                : errors <= 7
                ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                : 'bg-rose-950/60 border-rose-500 text-rose-300'
            }`}
            role="alert"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden="true">
                {errors === 0 ? '🌟' : errors <= 3 ? '👏' : errors <= 7 ? '👍' : '💪'}
              </span>
              <span className="text-base font-bold">
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </span>
            </div>
            <p className="mt-1 text-xs font-normal text-slate-300 leading-relaxed">
              {errors === 0
                ? 'Flawless calibration! Every standard unit, curved measurement, and trajectory classification was calculated with 100% scientific precision.'
                : errors <= 3
                ? 'You demonstrated solid conceptual command of SI standard units, metric unit chains, and relative motion frames.'
                : errors <= 7
                ? 'Good effort on this flight mission! Practicing unit conversions and balance beam observations will elevate your precision to the next level.'
                : 'Every great physicist learns through iterations and recalibrations. Review the misconception notes below and try again!'}
            </p>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <span className="text-xl" aria-hidden="true">💭</span>
              <h3 className="text-base font-bold text-gold-200">Post-Expedition Scientific Reflection</h3>
            </div>
            <p className="text-xs text-slate-400">
              Consolidate your learning by writing down or pondering your answers to these three critical physics prompts:
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="ref-surprising" className="block text-xs font-semibold text-amber-300">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  id="ref-surprising"
                  aria-label="What was the most surprising thing you learned?"
                  rows={2}
                  value={reflectionAnswers.surprising}
                  onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, surprising: e.target.value })}
                  placeholder="e.g. Why standard units like Kelvin prevent multi-million dollar satellite orbit errors..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="ref-explain" className="block text-xs font-semibold text-gold-300">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  id="ref-explain"
                  aria-label="How would you explain this to a friend?"
                  rows={2}
                  value={reflectionAnswers.explain}
                  onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, explain: e.target.value })}
                  placeholder="e.g. Motion is always relative—you can be at rest relative to your seat while moving 130 km/h relative to the ground!"
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="ref-real-life" className="block text-xs font-semibold text-emerald-300">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  id="ref-real-life"
                  aria-label="Where in real life might you use this?"
                  rows={2}
                  value={reflectionAnswers.realLife}
                  onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, realLife: e.target.value })}
                  placeholder="e.g. Measuring fabric perimeter with thread, reading clinical thermometers correctly, and calculating flooring tiles in cm²."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 border border-rose-800/60 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300">
                Identified Misconception Profile:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-semibold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Scientific Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule Banner */}
          <div className="p-4 bg-amber-950/30 border border-amber-800/50 rounded-2xl flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">📅</span>
            <div className="text-xs text-slate-300">
              <span className="font-bold text-amber-300 uppercase">SM-2 Spaced Repetition Schedule:</span>
              <p className="mt-0.5">
                Next calibration review due in{' '}
                <span className="text-white font-bold font-mono">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </span>
                . Regular spaced retrieval solidifies long-term physics neural pathways.
              </p>
            </div>
          </div>

          {/* Real-World Home Physics Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-gold-300 flex items-center gap-2">
              <span aria-hidden="true">🏠</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-400">
                  {st}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── CONDITIONAL SIM-ENGINE FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_PhysicsPhysicalQuantitiesUnitsSim;
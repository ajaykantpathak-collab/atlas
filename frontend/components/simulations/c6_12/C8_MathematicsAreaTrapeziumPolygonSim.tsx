'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── STRING LITERAL NODE IDS (ALL 9 NODES COVERED) ───────────────────────────
const NODE_C8_MATH_031 = 'c8_math_031';
const NODE_C8_MATH_032 = 'c8_math_032';
const NODE_C8_MATH_033 = 'c8_math_033';
const NODE_C8_MATH_034 = 'c8_math_034';
const NODE_C8_MATH_035 = 'c8_math_035';
const NODE_C8_MATH_036 = 'c8_math_036';
const NODE_C8_MATH_037 = 'c8_math_037';
const NODE_C8_MATH_038 = 'c8_math_038';
const NODE_C8_MATH_039 = 'c8_math_039';

const ALL_NODE_IDS = [
  NODE_C8_MATH_031,
  NODE_C8_MATH_032,
  NODE_C8_MATH_033,
  NODE_C8_MATH_034,
  NODE_C8_MATH_035,
  NODE_C8_MATH_036,
  NODE_C8_MATH_037,
  NODE_C8_MATH_038,
  NODE_C8_MATH_039,
];

// ─── PREDICTION QUESTIONS (BRILLIANT.ORG PREDICT-THEN-CHECK) ──────────────────
export interface PredictionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  verifyInstruction: string;
}

export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_001_trap_height',
    question: 'If you double the height (h) of a trapezium while keeping both parallel sides (a and b) unchanged, what will happen to its area?',
    options: [
      'The area remains exactly the same',
      'The area doubles (multiplied by 2)',
      'The area quadruples (multiplied by 4)',
      'The area increases by (a + b) / 2',
    ],
    correctIndex: 1,
    explanation: 'Since Area = 1/2 × (a + b) × h, area is directly proportional to height h. Doubling h directly doubles the calculated area.',
    verifyInstruction: 'In Lab 1, set height h = 6 m and note the area. Then slide h to 12 m and verify that the area exactly doubles!',
  },
  {
    id: 'pred_002_cyl_radius',
    question: 'If you double the radius (r) of a cylinder while keeping its height (h) constant, what happens to its volume?',
    options: [
      'Volume doubles (2×)',
      'Volume triples (3×)',
      'Volume quadruples (4×)',
      'Volume increases by 2π',
    ],
    correctIndex: 2,
    explanation: 'Volume = πr²h. Because the radius term is squared in the formula, doubling r multiplies the volume by 2² = 4!',
    verifyInstruction: 'In Lab 2, test radius r = 3.5 cm then increase to r = 7 cm. Compare the resulting volume cm³ values to see the 4× increase.',
  },
];

// ─── OBSERVATION QUESTIONS (BRILLIANT.ORG 'WHAT DO YOU NOTICE?') ──────────────
export interface ObservationQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  observableOptions: string[];
}

export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_001_cyl_net',
    question: 'When you unroll the 3D cylinder into its 2D flat net in Lab 2, what geometric shape does the curved side wall form?',
    options: [
      'A triangle of base 2πr and height h',
      'A flat rectangle of length equal to circumference 2πr and height h',
      'A circle of area πr²',
      'A trapezium with parallel sides r and h',
    ],
    correctIndex: 1,
    explanation: 'The curved surface unfolds into a rectangle whose length matches the circular boundary perimeter (2πr) and whose width is the height (h). Hence CSA = 2πrh.',
    observableOptions: [
      'A triangle of base 2πr and height h',
      'A flat rectangle of length equal to circumference 2πr and height h',
      'A circle of area πr²',
      'A trapezium with parallel sides r and h',
    ],
  },
  {
    id: 'obs_002_pie_sum',
    question: 'In Lab 4, as you slide individual activity visitor counts up and down, what do you notice about the total central angles across all sectors?',
    options: [
      'The total angle changes between 180° and 360° depending on the sum of visitors',
      'The sum of all central angles always remains constant at 360°',
      'The total angle increases whenever more walking or cycling visitors are added',
      'The total angle equals the sum of raw visitor headcounts',
    ],
    correctIndex: 1,
    explanation: 'A circle always comprises exactly 360°. Each category takes a proportion (count / total) × 360°, ensuring the sectors always sum to 360° regardless of sample size.',
    observableOptions: [
      'The total angle changes between 180° and 360° depending on the sum of visitors',
      'The sum of all central angles always remains constant at 360°',
      'The total angle increases whenever more walking or cycling visitors are added',
      'The total angle equals the sum of raw visitor headcounts',
    ],
  },
];

// ─── NARRATIVE SCENARIO ───────────────────────────────────────────────────────
const SCENARIO = {
  title: 'Architect of the Smart City Park',
  intro: 'The Municipal Corporation of Bengaluru has commissioned you to design an eco-friendly recreational park. You need to calculate exact plot areas (trapeziums, polygons, semi-circles), fabricate storage water tanks (surface area, volume, and capacity), analyse visitor demographic survey data with bar and pie charts, model game zone probabilities, and manage club memberships using Venn diagrams.',
  context: 'Every architectural blueprint and engineering decision relies on precise Class 8 mensuration, data handling, probability, and set theory principles.',
};

// ─── DISCOVERY QUESTION ───────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'An irregular garden plot is shaped like a trapezium with parallel sides of 20 m and 30 m, and perpendicular distance of 12 m. A contractor says its area is simply (20 + 30) × 12 = 600 sq m. What do you think?',
  options: [
    'The contractor is correct — just add parallel sides and multiply by height.',
    'It is wrong because you must average the parallel sides: (20 + 30) / 2 × 12 = 300 sq m.',
    'It is wrong because you must multiply only the two slant sides.',
    'The contractor is wrong because area of any trapezium is base × height = 30 × 12 = 360 sq m.',
  ],
  correctIndex: 1,
  hintAfter: 'A trapezium can be split and reconstructed into a rectangle whose length is the average of the parallel sides!',
};

// ─── CHALLENGE INTERFACE ──────────────────────────────────────────────────────
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 ALIGNED, ~40%+ COMPETENCY) ───────────
const CHALLENGES: Challenge[] = [
  // ── Foundation 1: Area of Trapezium Formula (c8_math_031)
  {
    id: 'ch_001_trap_f',
    nodeId: NODE_C8_MATH_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the correct mathematical formula for the area of a trapezium with parallel sides a and b and perpendicular height h?',
    options: [
      'A = (a + b) × h',
      'A = 1/2 × (a + b) × h',
      'A = a × b × h',
      'A = 2 × (a + b) × h',
    ],
    correctIndex: 1,
    explanation: 'The area of a trapezium is A = 1/2 × (a + b) × h. The factor 1/2 arises because two identical trapeziums joined together form a parallelogram of base (a + b) and height h.',
    hints: [
      'Think of taking the average length of the two parallel bases.',
      'Average base = (a + b) / 2.',
      'Multiply that average base by the perpendicular height h: 1/2 × (a + b) × h.',
    ],
    misconceptionIndex: 0,
  },
  // ── Foundation 2: Cylinder Net Labeling (c8_math_032) - Drag Label
  {
    id: 'ch_002_cyl_net',
    nodeId: NODE_C8_MATH_032,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the parts of an unrolled cylinder net to their geometric formulas.',
    dragItems: [
      { label: 'Top Circle (πr²)', targetId: 'top_disk' },
      { label: 'Curved Wall (2πrh)', targetId: 'rect_body' },
      { label: 'Base Circle (πr²)', targetId: 'base_disk' },
      { label: 'Width = 2πr', targetId: 'circumference_edge' },
    ],
    correctMapping: {
      top_disk: 'Top Circle (πr²)',
      rect_body: 'Curved Wall (2πrh)',
      base_disk: 'Base Circle (πr²)',
      circumference_edge: 'Width = 2πr',
    },
    explanation: 'An unrolled cylinder consists of a rectangle of width 2πr (circumference) and height h giving CSA = 2πrh, plus two circular disks each of area πr².',
    hints: [
      'The unrolled curved wall forms a rectangle.',
      'The length of this rectangle equals the perimeter of the circular base (2πr).',
      'The two end caps are identical circles each of area πr².',
    ],
    misconceptionIndex: 1,
  },
  // ── Foundation 3: Semi-circle Area Numeric (c8_math_031)
  {
    id: 'ch_003_semicirc_num',
    nodeId: NODE_C8_MATH_031,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A semicircular flowerbed in the park has a radius of 7 m. Taking π = 22/7, calculate its area in square metres.',
    correctAnswer: 77,
    tolerance: 0.5,
    unit: 'sq m',
    explanation: 'Area of a semi-circle = 1/2 × π × r² = 1/2 × (22/7) × (7 × 7) = 1/2 × 22 × 7 = 11 × 7 = 77 sq m.',
    hints: [
      'Formula for circle area is πr². A semi-circle is exactly half of that.',
      'Area = 1/2 × (22/7) × 7²',
      '1/2 × 22/7 × 49 = 1/2 × 154 = 77 sq m.',
    ],
    misconceptionIndex: 1,
  },
  // ── Foundation 4: Cuboid TSA vs CSA (c8_math_033)
  {
    id: 'ch_004_csa_tsa_f',
    nodeId: NODE_C8_MATH_033,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'If you want to paint only the 4 vertical walls of an open room (excluding floor and ceiling), which quantity should you calculate?',
    options: [
      'Total Surface Area (TSA)',
      'Lateral/Curved Surface Area (LSA/CSA = 2(l + b)h)',
      'Volume (V = l × b × h)',
      'Perimeter of the floor only',
    ],
    correctIndex: 1,
    explanation: 'The lateral or curved surface area (LSA/CSA) counts only the 4 side vertical faces: 2(l + b)h. TSA adds the top and bottom faces as well.',
    hints: [
      'Walls are the vertical side surfaces.',
      'Total surface area includes top (ceiling) and bottom (floor).',
      'Lateral surface area covers only the 4 walls: 2(l + b)h.',
    ],
    misconceptionIndex: 2,
  },
  // ── Foundation 5: Capacity Conversion (c8_math_035)
  {
    id: 'ch_005_cap_conv',
    nodeId: NODE_C8_MATH_035,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the exact relation between cubic centimetres (cm³) and litres (L)?',
    options: [
      '1 L = 100 cm³',
      '1 L = 1,000 cm³ (and 1 mL = 1 cm³)',
      '1 L = 10,000 cm³',
      '1 L = 1,000,000 cm³',
    ],
    correctIndex: 1,
    explanation: '1 litre = 1,000 cm³. Hence 1 mL = 1 cm³, and 1 cubic metre (1 m³) = 1,000 litres.',
    hints: [
      'A 10 cm × 10 cm × 10 cm cube holds exactly 1 litre.',
      '10 × 10 × 10 = 1,000.',
      'Thus, 1 Litre = 1,000 cm³.',
    ],
    misconceptionIndex: 3,
  },
  // ── Foundation 6: Grouped Data Class Interval (c8_math_036) - Drag Sort
  {
    id: 'ch_006_group_sort',
    nodeId: NODE_C8_MATH_036,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the 4 steps of creating a Grouped Frequency Distribution table in order.',
    sortItems: [
      'Find the range (Highest value - Lowest value)',
      'Decide on an equal class width (e.g., width 10)',
      'List ordered class intervals (e.g., 0-10, 10-20, 20-30)',
      'Tally observations and count total frequency',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First determine the range, choose a uniform class width, write down the continuous intervals, and finally record tally counts ensuring frequencies sum to N.',
    hints: [
      'Always start by finding how spread out the data is (the range).',
      'Next pick a uniform interval width.',
      'Write the classes and finally tally the frequencies.',
    ],
  },
  // ── Foundation 7: Basic Probability Rule (c8_math_038)
  {
    id: 'ch_007_prob_f',
    nodeId: NODE_C8_MATH_038,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following values can NEVER be the probability of any event?',
    options: ['0', '0.75', '4/5', '1.35'],
    correctIndex: 3,
    explanation: 'Probability P(E) is strictly bounded: 0 ≤ P(E) ≤ 1. A value of 1.35 (> 1) or negative values are mathematically impossible.',
    hints: [
      'Probability represents a fraction of total certainty (1).',
      '0 means impossible, 1 means absolutely certain.',
      'Any number greater than 1 cannot be a probability.',
    ],
    misconceptionIndex: 4,
  },

  // ── Standard 1: Real-World Norman Window Area (c8_math_031) - Application
  {
    id: 'ch_008_norman_win',
    nodeId: NODE_C8_MATH_031,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A park pavilion entrance has a Norman window: a rectangle of width 2.8 m and height 2.0 m, topped with a semi-circle of diameter 2.8 m (radius = 1.4 m). Find the total area in sq m (π = 22/7).',
    correctAnswer: 8.68,
    tolerance: 0.1,
    unit: 'sq m',
    explanation: 'Rectangle area = 2.8 × 2.0 = 5.60 sq m. Semicircle area = 1/2 × (22/7) × (1.4)² = 1/2 × 22/7 × 1.96 = 3.08 sq m. Total area = 5.60 + 3.08 = 8.68 sq m.',
    hints: [
      'Compute rectangle area: length × breadth = 2.8 × 2.0.',
      'Compute semicircle area: 1/2 × (22/7) × (1.4)².',
      'Add both areas together: 5.60 + 3.08 = 8.68 sq m.',
    ],
  },
  // ── Standard 2: Cuboid Storage Water Tank (c8_math_034 & c8_math_035) - Application
  {
    id: 'ch_009_tank_cap',
    nodeId: NODE_C8_MATH_035,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A water tank measures 50 cm × 40 cm × 30 cm. What is its capacity in Litres?',
    correctAnswer: 60,
    tolerance: 0.5,
    unit: 'Litres',
    explanation: 'Volume = 50 × 40 × 30 = 60,000 cm³. Since 1,000 cm³ = 1 Litre, Capacity = 60,000 / 1,000 = 60 Litres.',
    hints: [
      'First compute volume in cm³: 50 × 40 × 30.',
      '50 × 40 = 2,000; 2,000 × 30 = 60,000 cm³.',
      'Divide by 1,000 to convert cm³ to Litres: 60,000 / 1,000 = 60 L.',
    ],
    misconceptionIndex: 3,
  },
  // ── Standard 3: Cylinder Volume vs CSA (c8_math_034) - Analysis
  {
    id: 'ch_010_cyl_vol_calc',
    nodeId: NODE_C8_MATH_034,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A cylindrical fountain pillar has radius 7 cm and height 20 cm. What is its volume in cm³? (π = 22/7)',
    correctAnswer: 3080,
    tolerance: 5,
    unit: 'cm³',
    explanation: 'Volume = πr²h = (22/7) × 7 × 7 × 20 = 22 × 7 × 20 = 154 × 20 = 3,080 cm³.',
    hints: [
      'Volume of cylinder = Base area × Height = πr²h.',
      'Be careful to square the radius: 7² = 49.',
      '22/7 × 49 × 20 = 154 × 20 = 3,080 cm³.',
    ],
    misconceptionIndex: 2,
  },
  // ── Standard 4: Pie Chart Central Angle (c8_math_037) - Application
  {
    id: 'ch_011_pie_angle',
    nodeId: NODE_C8_MATH_037,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a park survey of 40 visitors, 14 chose "Walking", 10 "Cycling", 8 "Yoga", 5 "Running", and 3 "Reading". What is the central angle for the "Walking" sector in degrees?',
    correctAnswer: 126,
    tolerance: 0.5,
    unit: 'degrees',
    explanation: 'Central angle = (Category Value / Total Value) × 360° = (14 / 40) × 360° = 0.35 × 360° = 126°.',
    hints: [
      'Central angle formula is (Value / Total) × 360°.',
      'Walking fraction = 14 / 40 = 7 / 20 = 0.35.',
      '0.35 × 360° = 126°.',
    ],
  },
  // ── Standard 5: Two-Set Venn Diagram Overlap (c8_math_039) - Application
  {
    id: 'ch_012_venn_twoset',
    nodeId: NODE_C8_MATH_039,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a group of 60 park athletes, 35 play cricket, 30 play football, and 15 play both. How many athletes play ONLY cricket?',
    correctAnswer: 20,
    tolerance: 0,
    unit: 'athletes',
    explanation: 'n(Only Cricket) = n(Cricket) - n(Both) = 35 - 15 = 20. (Total playing at least one = 35 + 30 - 15 = 50, Neither = 10).',
    hints: [
      'The 35 cricket players include those who play both cricket AND football.',
      'Subtract the common intersection from total cricket players.',
      '35 - 15 = 20.',
    ],
    misconceptionIndex: 0,
  },
  // ── Standard 6: Set Operations Match (c8_math_039) - Construct
  {
    id: 'ch_013_set_ops',
    nodeId: NODE_C8_MATH_039,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Given U = {1, 2, 3, 4, 5, 6}, A = {2, 4, 6}, B = {3, 6}. Build the set A - B (elements in A but NOT in B).',
    availableParts: ['1', '2', '3', '4', '5', '6'],
    targetState: '2 4',
    validationHint: 'Click to select only elements that are in set A and NOT in set B.',
    explanation: 'A = {2, 4, 6} and B = {3, 6}. The element 6 is common to both. Removing 6 from A leaves A - B = {2, 4}.',
    hints: [
      'Look at set A: {2, 4, 6}.',
      'Which of these elements also appear in B ({3, 6})? Only 6.',
      'Remove 6 from A to get {2, 4}.',
    ],
  },
  // ── Standard 7: Die Throw Experimental Probability (c8_math_038) - Analysis
  {
    id: 'ch_014_prob_dice',
    nodeId: NODE_C8_MATH_038,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A fair 6-sided die is rolled 60 times in the park game zone. The number "4" appeared 12 times. What is the experimental probability of rolling a "4" in simplest fraction form?',
    options: ['12/60 (unsimplified)', '1/5', '1/6', '5/1'],
    correctIndex: 1,
    explanation: 'Experimental Probability = Favourable count / Total trials = 12 / 60 = 1/5. CISCE examiners specifically require fractions in simplest reduced form!',
    hints: [
      'Probability = (Occurrences of 4) / (Total throws).',
      '12 / 60.',
      'Simplify by dividing numerator and denominator by 12: 12/60 = 1/5.',
    ],
    misconceptionIndex: 4,
  },

  // ── Advanced 1: Regular Hexagon Decomposition Area (c8_math_031) - Analysis
  {
    id: 'ch_015_hex_poly',
    nodeId: NODE_C8_MATH_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A central plaza gazebo is designed as a regular hexagon of side 6 m. By decomposing it from the centre, how many identical equilateral triangles are formed, and what is the total exact area?',
    options: [
      '4 triangles, Total Area = 36√3 sq m',
      '6 equilateral triangles each of area (√3/4)×6², Total Area = 54√3 sq m',
      '6 triangles, Total Area = 108 sq m',
      '8 triangles, Total Area = 72√3 sq m',
    ],
    correctIndex: 1,
    explanation: 'Connecting the centre of a regular hexagon of side s to its 6 vertices creates 6 congruent equilateral triangles. Total Area = 6 × (√3/4 × s²) = 6 × (√3/4 × 36) = 54√3 sq m.',
    hints: [
      'Joining all vertices to the centre splits a regular hexagon into 6 triangles.',
      'Each triangle is equilateral with side 6 m.',
      'Area of one triangle = (√3/4) × 6² = 9√3. Total = 6 × 9√3 = 54√3 sq m.',
    ],
  },
  // ── Advanced 2: Open vs Closed Cylinder Painting (c8_math_033) - Evaluation
  {
    id: 'ch_016_paint_cyl',
    nodeId: NODE_C8_MATH_033,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Contractor X calculates paint for an OPEN cylindrical dustbin (radius 3.5 m, height 10 m) using TSA = 2πr(r + h) = 297 m². Contractor Y says: "Since the top is open, paint area = CSA + 1 base = 2πrh + πr² = 258.5 m²." Who is correct?',
    options: [
      'Contractor X is correct because surface area is always 2πr(r + h).',
      'Contractor Y is correct because an open vessel has only one circular base.',
      'Both are wrong; you only paint the curved wall 2πrh = 220 m².',
      'Contractor X is correct because dustbins have two lids.',
    ],
    correctIndex: 1,
    explanation: 'Contractor Y is correct! An open vessel lacks a top lid, so Area = CSA + Area of 1 base = 2πrh + πr² = 2×(22/7)×3.5×10 + (22/7)×(3.5)² = 220 + 38.5 = 258.5 m².',
    hints: [
      'A closed cylinder has 2 circular bases: TSA = CSA + 2πr².',
      'An open container has no top cover, so only 1 circular base is present.',
      'Area = CSA + πr² = 220 + 38.5 = 258.5 m².',
    ],
    misconceptionIndex: 2,
  },
  // ── Advanced 3: Water Bottle Capacity Filling Problem (c8_math_035) - Application
  {
    id: 'ch_017_bottles_tank',
    nodeId: NODE_C8_MATH_035,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A large cylindrical reservoir has radius 14 cm and height 25 cm (holds 15.4 L = 15,400 mL). Small cuboidal water flasks measure 15 cm × 8 cm × 5 cm (600 mL). How many full flasks can be completely filled from the reservoir?',
    correctAnswer: 25,
    tolerance: 0,
    unit: 'flasks',
    explanation: 'Reservoir capacity = 15,400 mL. Flask capacity = 15 × 8 × 5 = 600 mL. Number of full flasks = floor(15,400 / 600) = 25 flasks (with 400 mL remainder).',
    hints: [
      'Flask capacity = 15 × 8 × 5 = 600 cm³ = 600 mL.',
      'Reservoir capacity = 15,400 mL.',
      'Divide 15,400 by 600: 15,400 / 600 = 25.66... So 25 full flasks can be filled.',
    ],
  },
  // ── Advanced 4: Three-Set Venn Survey (c8_math_039) - Analysis
  {
    id: 'ch_018_venn_three',
    nodeId: NODE_C8_MATH_039,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In a youth sports club of 80 members: 35 play Badminton (B), 30 play Tennis (T), 25 play Squash (S). 12 play B&T, 8 play T&S, 10 play B&S, and 4 play all three sports. How many play AT LEAST ONE sport?',
    correctAnswer: 64,
    tolerance: 0,
    unit: 'members',
    explanation: 'n(B ∪ T ∪ S) = n(B) + n(T) + n(S) - n(B∩T) - n(T∩S) - n(B∩S) + n(B∩T∩S) = 35 + 30 + 25 - 12 - 8 - 10 + 4 = 90 - 30 + 4 = 64 members. (Members playing none = 80 - 64 = 16).',
    hints: [
      'Use the 3-set cardinality formula: n(A∪B∪C) = sum(single) - sum(pairs) + all-three.',
      'Sum of singles = 35 + 30 + 25 = 90.',
      'Subtract pairs (12 + 8 + 10 = 30) -> 60. Add triple intersection (4) -> 64.',
    ],
    misconceptionIndex: 0,
  },
  // ── Advanced 5: Reverse Pie Chart Calculation (c8_math_037) - Application
  {
    id: 'ch_019_pie_rev',
    nodeId: NODE_C8_MATH_037,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In the annual park maintenance budget of ₹2,00,000, the sector for "Horticulture & Plants" has a central angle of 54°. How much money in Rupees is allocated to Horticulture?',
    correctAnswer: 30000,
    tolerance: 100,
    unit: '₹',
    explanation: 'Fraction of total = 54° / 360° = 0.15 (or 15%). Allocated budget = 0.15 × ₹2,00,000 = ₹30,000.',
    hints: [
      'Value = (Central Angle / 360°) × Total Budget.',
      '54 / 360 = 3 / 20 = 0.15.',
      '0.15 × 2,00,000 = ₹30,000.',
    ],
  },
  // ── Advanced 6: Empirical vs Theoretical Law of Large Numbers (c8_math_038) - Evaluation
  {
    id: 'ch_020_prob_eval',
    nodeId: NODE_C8_MATH_038,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An intern flips a coin 10 times and gets 8 Heads (P = 0.8). They claim "This coin is definitively biased." How should a data scientist evaluate this claim?',
    options: [
      'The intern is right; 8/10 is proof of bias.',
      'The claim is premature; 10 trials have high random variance. Aggregate 500+ tosses to see if relative frequency stabilises near 0.5 before deciding.',
      'The coin is 80% biased in all future flips.',
      'Probability of heads becomes 0 on the next flip to balance it out.',
    ],
    correctIndex: 1,
    explanation: 'In small samples (N=10), chance fluctuations are large. Under the Law of Large Numbers, relative frequencies stabilise only over aggregated large numbers of trials (500-1000 tosses).',
    hints: [
      'Is 10 tosses enough to prove a coin is rigged?',
      'Randomness causes short runs of heads.',
      'We must aggregate hundreds of trials to verify if it converges to 0.5.',
    ],
    misconceptionIndex: 4,
  },
  // ── Advanced 7: Cutting a Cylinder in Half Surface Area (c8_math_032 & c8_math_033) - Creativity
  {
    id: 'ch_021_cut_cyl',
    nodeId: NODE_C8_MATH_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A solid wooden cylinder (radius r, height h) of TSA = 2πr(r + h) is sawn in half across its height into two identical cylinders. What happens to the sum of the total surface areas of the two new pieces?',
    options: [
      'It stays exactly the same because volume is conserved.',
      'It increases by 2πr² because two brand-new circular cross-section faces are exposed.',
      'It doubles because there are now 2 cylinders.',
      'It decreases because height is halved.',
    ],
    correctIndex: 1,
    explanation: 'Cutting across the height exposes two new circular faces (each of area πr²). Each half has TSA = 2πr(h/2) + 2πr² = πrh + 2πr². Sum of both = 2πrh + 4πr² = original TSA + 2πr².',
    hints: [
      'Think about the cut surfaces you can now touch.',
      'Cutting creates two new exposed flat circular faces.',
      'Each circular face has area πr², adding 2πr² in total.',
    ],
    misconceptionIndex: 1,
  },
  // ── Advanced 8: Grouped Bar Graph Modal Class Interpretation (c8_math_036) - Analysis
  {
    id: 'ch_022_modal_bar',
    nodeId: NODE_C8_MATH_036,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Daily summer temperatures in Bengaluru over 20 days are: 25-30°C (freq 4), 30-35°C (freq 11), 35-40°C (freq 5). Which statement is FALSE?',
    options: [
      'The modal class interval is 30-35°C.',
      'Total observations recorded = 4 + 11 + 5 = 20 days.',
      'The bars must be drawn touching with zero gaps because temperature is continuous in a Class 8 bar graph.',
      'Exactly 16 days had temperatures 30°C or higher.',
    ],
    correctIndex: 2,
    explanation: 'At the Class 8 ICSE level, grouped data represented via a BAR GRAPH requires bars of equal width with EQUAL GAPS between them (treating class intervals as distinct categories). Touching bars form a Histogram (Class 9 topic).',
    hints: [
      'Look at the convention for Bar Graphs vs Histograms in Class 8.',
      'Bar graphs have separate bars with uniform gaps.',
      'Statement 3 incorrectly claims bars must touch in a Class 8 bar graph.',
    ],
  },
];

// ─── PROPS INTERFACE ──────────────────────────────────────────────────────────
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

// ─── DEFAULT PROPS ────────────────────────────────────────────────────────────
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C8_MATH_031,
  title: 'Class 8 Mensuration, Data Handling & Sets Lab',
  definition: 'Mastery of trapezium and polygon areas, 3D surface areas and volumes (cube, cuboid, cylinder), capacity conversion (1 L = 1000 cm³), grouped bar graphs, pie charts, empirical probability, and set Venn diagrams.',
  eli5: 'Think of 2D shapes as puzzle pieces you can slice and fold into rectangles; 3D shapes as hollow containers that pack unit cubes; and data/probability/sets as tools to organize messy real-world information into crystal clear charts and circles!',
  misconceptions: [
    {
      misconception: 'Area of a trapezium is (a + b) × h without halving.',
      correction: 'Always divide by 2! A trapezium turns into a rectangle whose length is the average of the two bases: A = 1/2 × (a + b) × h.',
    },
    {
      misconception: 'Using diameter d directly in πr² or 2πrh without converting to radius r.',
      correction: 'Formulas require radius r = d / 2. Using diameter directly overstates area by a factor of 4.',
    },
    {
      misconception: 'Confusing Total Surface Area (TSA) with Curved Surface Area (CSA) or Volume.',
      correction: 'CSA covers only the vertical side walls (2πrh). TSA includes the top and bottom lids (2πr(r+h)). Volume is interior space (πr²h).',
    },
    {
      misconception: 'Dividing by 100 instead of 1,000 to convert cm³ to Litres.',
      correction: '1 Litre = 1,000 cm³ (a 10 cm × 10 cm × 10 cm cube). Always divide cm³ by 1,000 to get Litres.',
    },
    {
      misconception: 'Probability can be greater than 1 or calculated as Total / Favourable.',
      correction: 'Probability is always Favourable / Total, strictly bounded between 0 (impossible) and 1 (certain).',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the area of a trapezium with parallel sides 8 cm, 12 cm and height 5 cm?', options: ['100 sq cm', '50 sq cm', '25 sq cm', '48 sq cm'], correctIndex: 1 },
    { question: 'What is the total surface area of a cube of edge 6 cm?', options: ['36 cm²', '216 cm²', '144 cm²', '72 cm²'], correctIndex: 1 },
    { question: 'Which formula represents the Curved Surface Area of a cylinder?', options: ['πr²h', '2πrh', '2πr(r+h)', '2(l+b)h'], correctIndex: 1 },
    { question: 'How many Litres are in 60,000 cm³?', options: ['600 L', '60 L', '6 L', '60,000 L'], correctIndex: 1 },
    { question: 'What is the sum of all central angles in a pie chart?', options: ['180°', '360°', '100°', '90°'], correctIndex: 1 },
    { question: 'If an event is certain to occur, what is its probability?', options: ['0', '0.5', '1', '100'], correctIndex: 2 },
    { question: 'For two sets A and B, what is n(A ∪ B)?', options: ['n(A) + n(B)', 'n(A) + n(B) - n(A ∩ B)', 'n(A) - n(B)', 'n(A ∩ B)'], correctIndex: 1 },
    { question: 'In a regular hexagon of side 6 cm, how many equilateral triangles meet at the center?', options: ['4', '5', '6', '8'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student demonstrates full mastery across 2D/3D mensuration, capacity, statistics, probability, and Venn diagrams.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───────────────────
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Trapezium Decomposition Proof',
    instruction: 'Drag the Parallel Sides (a & b) and Height (h) sliders. Watch the trapezium slice into two triangles and rearrange into an equivalent rectangle of base (a+b)/2!',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_MATH_031,
  },
  {
    title: 'Lab 2: 3D Cylinder & Net Unrolling',
    instruction: 'Adjust Radius (r) and Height (h). Toggle "Unroll 3D Net" to see the curved skin flatten into a rectangle of length 2πr and height h.',
    interactionType: 'toggle-slider',
    nodeId: NODE_C8_MATH_032,
  },
  {
    title: 'Lab 3: Volume & Liquid Capacity Tank',
    instruction: 'Adjust tank dimensions (l, b, h). Watch water pour in and verify the 1 Litre = 1,000 cm³ conversion live!',
    interactionType: 'slider-capacity',
    nodeId: NODE_C8_MATH_035,
  },
  {
    title: 'Lab 4: Live Data & Interactive Pie Chart',
    instruction: 'Distribute 40 park visitors across 4 activities. Observe the sectors automatically resize with their exact central angles summing to 360°!',
    interactionType: 'pie-balance',
    nodeId: NODE_C8_MATH_037,
  },
  {
    title: 'Lab 5: Interactive 2-Set & 3-Set Venn Engine',
    instruction: 'Change club membership counts and overlapping intersections. Watch the Venn diagram shade and compute exclusive subsets step by step.',
    interactionType: 'venn-manipulate',
    nodeId: NODE_C8_MATH_039,
  },
];

// ─── REAL-WORLD PROJECT ───────────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'City Park Blueprint & Budget Capstone',
  description: 'Design an actual park layout on graph paper: Include 1 trapezium promenade, 1 semicircular pond, 1 cylindrical rainwater harvester (minimum 5,000 L capacity), and a 4-sector pie chart representing your construction budget breakdown.',
  steps: [
    'Draw the trapezium promenade (bases 15 m and 25 m, height 8 m) and calculate its paving area.',
    'Draw a semicircular water fountain pond of radius 3.5 m and calculate its water surface area.',
    'Size a cylindrical storage tank (radius 1 m, height 2 m) and verify its capacity exceeds 6,000 Litres (V = πr²h).',
    'Survey 20 classmates for their favourite park features and plot a clean Grouped Bar Graph with equal gaps.',
  ],
};

// ─── MAIN REACT SIMULATION COMPONENT ──────────────────────────────────────────
function C8_MathematicsAreaTrapeziumPolygonSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant.org interactive hooks
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict-then-Check & Observation state
  const [selectedPrediction, setSelectedPrediction] = useState<Record<string, number>>({});
  const [selectedObservation, setSelectedObservation] = useState<Record<string, number>>({});
  const [showPredictionFeedback, setShowPredictionFeedback] = useState<Record<string, boolean>>({});
  const [showObservationFeedback, setShowObservationFeedback] = useState<Record<string, boolean>>({});

  // Interactive Lab Variables
  const [trapA, setTrapA] = useState(12); // top base
  const [trapB, setTrapB] = useState(20); // bottom base
  const [trapH, setTrapH] = useState(8); // height
  const [trapShowSlice, setTrapShowSlice] = useState(false);

  const [cylR, setCylR] = useState(7);
  const [cylH, setCylH] = useState(14);
  const [cylUnrollNet, setCylUnrollNet] = useState(false);

  const [tankL, setTankL] = useState(50); // cm
  const [tankW, setTankW] = useState(40); // cm
  const [tankH, setTankH] = useState(30); // cm
  const [waterFillPercent, setWaterFillPercent] = useState(80);

  const [pieWalking, setPieWalking] = useState(14);
  const [pieCycling, setPieCycling] = useState(10);
  const [pieYoga, setPieYoga] = useState(8);
  const [pieRunning, setPieRunning] = useState(8);

  const [vennA, setVennA] = useState(35);
  const [vennB, setVennB] = useState(30);
  const [vennIntersection, setVennIntersection] = useState(15);
  const [vennTotalU, setVennTotalU] = useState(60);

  // Adaptive difficulty & BKT state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
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

  // Drag & drop, numeric, construct states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Coin & Dice chance simulator state
  const [coinFlips, setCoinFlips] = useState<{ heads: number; tails: number }>({ heads: 0, tails: 0 });
  const [diceRolls, setDiceRolls] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  // BKT Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered challenges by difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT adaptive effect
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

  // Derived Lab Calculations
  const trapArea = useMemo(() => 0.5 * (trapA + trapB) * trapH, [trapA, trapB, trapH]);
  const cylCSA = useMemo(() => 2 * (22 / 7) * cylR * cylH, [cylR, cylH]);
  const cylTSA = useMemo(() => 2 * (22 / 7) * cylR * (cylR + cylH), [cylR, cylH]);
  const cylVolume = useMemo(() => (22 / 7) * cylR * cylR * cylH, [cylR, cylH]);

  const tankVolumeCm3 = useMemo(() => tankL * tankW * tankH, [tankL, tankW, tankH]);
  const tankCapacityLitres = useMemo(() => tankVolumeCm3 / 1000, [tankVolumeCm3]);
  const currentWaterL = useMemo(() => (tankCapacityLitres * waterFillPercent) / 100, [tankCapacityLitres, waterFillPercent]);

  const pieTotal = useMemo(() => pieWalking + pieCycling + pieYoga + pieRunning, [pieWalking, pieCycling, pieYoga, pieRunning]);
  const pieAngles = useMemo(() => {
    const tot = pieTotal || 1;
    return {
      walking: (pieWalking / tot) * 360,
      cycling: (pieCycling / tot) * 360,
      yoga: (pieYoga / tot) * 360,
      running: (pieRunning / tot) * 360,
    };
  }, [pieWalking, pieCycling, pieYoga, pieRunning, pieTotal]);

  const vennOnlyA = useMemo(() => Math.max(0, vennA - vennIntersection), [vennA, vennIntersection]);
  const vennOnlyB = useMemo(() => Math.max(0, vennB - vennIntersection), [vennB, vennIntersection]);
  const vennUnion = useMemo(() => vennOnlyA + vennOnlyB + vennIntersection, [vennOnlyA, vennOnlyB, vennIntersection]);
  const vennNeither = useMemo(() => Math.max(0, vennTotalU - vennUnion), [vennTotalU, vennUnion]);

  // Handlers
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
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us review the step-by-step solution together.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding mathematical intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handlePredictionSubmit = useCallback((qId: string, optIdx: number) => {
    setSelectedPrediction(prev => ({ ...prev, [qId]: optIdx }));
    setShowPredictionFeedback(prev => ({ ...prev, [qId]: true }));
    const q = PREDICTION_QUESTIONS.find(item => item.id === qId);
    if (q) {
      const isCorrect = optIdx === q.correctIndex;
      audioManager.play(isCorrect ? 'success' : 'pop');
      speechManager.speak(isCorrect ? 'Great prediction! Now test it in the lab.' : 'Interesting hypothesis. Let us verify it with the interactive controls.');
    }
  }, []);

  const handleObservationSubmit = useCallback((qId: string, optIdx: number) => {
    setSelectedObservation(prev => ({ ...prev, [qId]: optIdx }));
    setShowObservationFeedback(prev => ({ ...prev, [qId]: true }));
    const q = OBSERVATION_QUESTIONS.find(item => item.id === qId);
    if (q) {
      const isCorrect = optIdx === q.correctIndex;
      audioManager.play(isCorrect ? 'success' : 'pop');
      speechManager.speak(isCorrect ? 'Spot on observation!' : 'Check the interactive visualization carefully.');
    }
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Mathematics Laboratory. Manipulate the geometric parameters!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Test any dimension and observe formulas in real time.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for competency challenges. Show your mensuration and data mastery!');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered Class 8 Mensuration, Statistics, Probability, and Sets.');
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

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
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent reasoning.');
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
          speechManager.speak('All hints used. Study the detailed explanation carefully.');
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

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
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
    setSortArrangement(prev => {
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(ans);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleSimulateCoins = useCallback((count: number) => {
    audioManager.play('pop');
    let h = 0;
    let t = 0;
    for (let i = 0; i < count; i++) {
      if (Math.random() < 0.5) h++;
      else t++;
    }
    setCoinFlips(prev => ({ heads: prev.heads + h, tails: prev.tails + t }));
  }, []);

  const handleSimulateDice = useCallback((count: number) => {
    audioManager.play('count');
    const rolls = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < count; i++) {
      const face = Math.floor(Math.random() * 6);
      rolls[face]++;
    }
    setDiceRolls(prev => prev.map((v, i) => v + rolls[i]));
  }, []);

  // HTML5 Canvas 2D Animated Wave & Particle Loop
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

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 4) {
        const y = 15 + Math.sin(x * 0.05 + frame * 0.05) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── TOP HEADER ────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gold-600/30 border border-gold-500/40 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-emerald-400">
              {title}
            </h1>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-gold-300 font-mono">ICSE Class 8</span>
              <span>Mensuration • Statistics • Probability • Sets</span>
            </p>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-gold-600 text-white shadow-md shadow-gold-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ───────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-900 rounded-3xl border border-gold-800/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-gold-500/20 text-gold-300 border border-gold-500/30">
              Scenario Blueprint Challenge
            </span>
            <h2 className="text-2xl font-black text-white mt-3">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-xs mt-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              🎯 <strong className="text-gold-300">Your Objective:</strong> {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
              <span>⚡</span>
              <span>Intuition Check (No grading — just predict!)</span>
            </div>
            <p className="text-white text-base font-semibold">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-2xl text-left text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50'
                        : 'bg-slate-950/40 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700/60 text-slate-200'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-slate-700/60 text-center leading-6 text-xs font-bold mr-2 text-slate-300">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`text-2xl ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '🎉' : '💡'}
                  </div>
                  <p className="text-xs md:text-sm text-slate-300">
                    {discoveryCorrect
                      ? 'Brilliant! You recognized that a trapezium area equals the average base multiplied by perpendicular height.'
                      : DISCOVERY_QUESTION.hintAfter}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-500 text-white font-black text-sm shadow-lg shadow-gold-500/30 whitespace-nowrap"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: BRILLIANT-STYLE INTERACTIVE EXPLORATION ──────────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Exploration Navigation Bar */}
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-gold-600 text-white font-black text-xs flex items-center justify-center">
                {currentSlide + 1}
              </span>
              <span className="text-sm font-bold text-slate-200">{EXPLORATION_STEPS[currentSlide].title}</span>
            </div>
            <div className="flex items-center gap-1">
              {EXPLORATION_STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentSlide(i);
                    audioManager.play('tap');
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === i ? 'bg-gold-500 w-7' : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Interactive Lab Visual Canvas */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-xl space-y-6"
            >
              <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold bg-gold-950/40 p-3 rounded-2xl border border-gold-800/40">
                <span>��</span>
                <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
              </div>

              {/* ── SLIDE 0: TRAPEZIUM DECOMPOSITION ── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 relative flex flex-col items-center">
                      <svg viewBox="0 0 450 260" className="w-full max-w-lg">
                        <defs>
                          <linearGradient id="trapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
                          </linearGradient>
                        </defs>

                        {(() => {
                          const scale = 7;
                          const topW = trapA * scale;
                          const botW = trapB * scale;
                          const hVal = trapH * scale * 1.5;
                          const startX = 225 - botW / 2;
                          const topStartX = 225 - topW / 2;
                          const baseY = 210;
                          const topY = baseY - hVal;

                          return (
                            <g>
                              <polygon
                                points={`${topStartX},${topY} ${topStartX + topW},${topY} ${startX + botW},${baseY} ${startX},${baseY}`}
                                fill="url(#trapGrad)"
                                stroke="#818cf8"
                                strokeWidth="2.5"
                              />

                              {trapShowSlice && (
                                <line
                                  x1={topStartX}
                                  y1={topY}
                                  x2={startX + botW}
                                  y2={baseY}
                                  stroke="#f59e0b"
                                  strokeWidth="2.5"
                                  strokeDasharray="5,5"
                                />
                              )}

                              <line
                                x1={topStartX}
                                y1={topY}
                                x2={topStartX}
                                y2={baseY}
                                stroke="#ef4444"
                                strokeWidth="2"
                                strokeDasharray="4,4"
                              />
                              <rect x={topStartX} y={baseY - 12} width={12} height={12} fill="none" stroke="#ef4444" strokeWidth="1.5" />

                              <text x={225} y={topY - 10} fill="#a5b4fc" textAnchor="middle" fontSize="12" fontWeight="bold">
                                Top Base a = {trapA} m
                              </text>
                              <text x={225} y={baseY + 22} fill="#93c5fd" textAnchor="middle" fontSize="12" fontWeight="bold">
                                Bottom Base b = {trapB} m
                              </text>
                              <text x={topStartX - 15} y={(topY + baseY) / 2} fill="#f87171" textAnchor="end" fontSize="12" fontWeight="bold">
                                h = {trapH} m
                              </text>
                            </g>
                          );
                        })()}
                      </svg>

                      <div className="mt-3 flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setTrapShowSlice(prev => !prev);
                            audioManager.play('pop');
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                            trapShowSlice
                              ? 'bg-amber-600 border-amber-500 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          {trapShowSlice ? '✓ Showing Diagonal Triangles' : '✂ Cut Along Diagonal'}
                        </motion.button>
                      </div>
                    </div>

                    {/* Controls & Math Breakdown */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                        <div>
                          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                            <span>Parallel Side a: {trapA} m</span>
                          </div>
                          <input
                            type="range"
                            min={6}
                            max={24}
                            value={trapA}
                            onChange={e => setTrapA(Number(e.target.value))}
                            className="w-full accent-gold-500"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                            <span>Parallel Side b: {trapB} m</span>
                          </div>
                          <input
                            type="range"
                            min={10}
                            max={36}
                            value={trapB}
                            onChange={e => setTrapB(Number(e.target.value))}
                            className="w-full accent-gold-500"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                            <span>Perpendicular Height h: {trapH} m</span>
                          </div>
                          <input
                            type="range"
                            min={4}
                            max={16}
                            value={trapH}
                            onChange={e => setTrapH(Number(e.target.value))}
                            className="w-full accent-rose-500"
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-gold-950/50 border border-gold-800/60 space-y-2">
                        <p className="text-xs text-gold-300 font-bold uppercase tracking-wider">Live Derivation</p>
                        <p className="text-sm text-slate-200">
                          Average Base = ({trapA} + {trapB}) / 2 = <span className="font-bold text-gold-300">{(trapA + trapB) / 2} m</span>
                        </p>
                        <p className="text-sm text-slate-200">
                          Area = 1/2 × ({trapA} + {trapB}) × {trapH} ={' '}
                          <span className="text-lg font-black text-emerald-400">{trapArea} sq m</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Brilliant Predict-then-Check Question 1 */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-gold-800/40 space-y-3">
                    <div className="flex items-center gap-2 text-gold-400 text-xs font-black uppercase tracking-wider">
                      <span>🔮</span>
                      <span>Predict & Verify Question</span>
                    </div>
                    <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handlePredictionSubmit(PREDICTION_QUESTIONS[0].id, i)}
                          className={`p-3 rounded-xl text-xs text-left font-medium border transition-all ${
                            selectedPrediction[PREDICTION_QUESTIONS[0].id] === i
                              ? i === PREDICTION_QUESTIONS[0].correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="font-bold mr-1.5">{String.fromCharCode(65 + i)}.</span>
                          {opt}
                        </button>
                      ))}
                    </div>
                    {showPredictionFeedback[PREDICTION_QUESTIONS[0].id] && (
                      <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/60 text-xs text-gold-200 space-y-1">
                        <p><strong className="text-emerald-400">Explanation:</strong> {PREDICTION_QUESTIONS[0].explanation}</p>
                        <p className="text-amber-300">🔍 <strong className="text-amber-200">How to verify:</strong> {PREDICTION_QUESTIONS[0].verifyInstruction}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── SLIDE 1: 3D CYLINDER & UNROLLING NET ── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center">
                      <svg viewBox="0 0 450 260" className="w-full max-w-lg">
                        {!cylUnrollNet ? (
                          <g transform="translate(150, 20)">
                            <rect x="30" y="50" width="90" height="130" fill="url(#trapGrad)" stroke="#6366f1" strokeWidth="2" />
                            <ellipse cx="75" cy="180" rx="45" ry="18" fill="#4338ca" stroke="#6366f1" strokeWidth="2" />
                            <ellipse cx="75" cy="50" rx="45" ry="18" fill="#818cf8" stroke="#a5b4fc" strokeWidth="2" />
                            <line x1="75" y1="50" x2="120" y2="50" stroke="#f59e0b" strokeWidth="2" />
                            <text x="95" y="44" fill="#fbbf24" fontSize="11" fontWeight="bold">r = {cylR} cm</text>
                            <line x1="135" y1="50" x2="135" y2="180" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
                            <text x="145" y="120" fill="#f87171" fontSize="11" fontWeight="bold">h = {cylH} cm</text>
                          </g>
                        ) : (
                          <g transform="translate(60, 25)">
                            <circle cx="160" cy="35" r="28" fill="#818cf8" stroke="#a5b4fc" strokeWidth="2" />
                            <text x="160" y="38" fill="white" fontSize="10" textAnchor="middle">Top (πr²)</text>
                            <rect x="40" y="70" width="240" height="90" fill="url(#trapGrad)" stroke="#6366f1" strokeWidth="2" />
                            <text x="160" y="120" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">
                              Curved Surface Area (2πrh)
                            </text>
                            <text x="160" y="62" fill="#38bdf8" fontSize="10" textAnchor="middle">
                              Length = 2πr = {(2 * (22 / 7) * cylR).toFixed(1)} cm
                            </text>
                            <circle cx="160" cy="195" r="28" fill="#4338ca" stroke="#6366f1" strokeWidth="2" />
                            <text x="160" y="198" fill="white" fontSize="10" textAnchor="middle">Base (πr²)</text>
                          </g>
                        )}
                      </svg>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setCylUnrollNet(prev => !prev);
                          audioManager.play('swoop');
                        }}
                        className="mt-3 px-5 py-2.5 rounded-2xl bg-gold-600 text-white font-bold text-xs shadow-md shadow-gold-600/30"
                      >
                        {cylUnrollNet ? '🔄 Fold to 3D Cylinder' : '📜 Unroll into 2D Net'}
                      </motion.button>
                    </div>

                    {/* Cylinder Sliders */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-3">
                        <div>
                          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                            <span>Radius r: {cylR} cm</span>
                          </div>
                          <input
                            type="range"
                            min={3.5}
                            max={14}
                            step={3.5}
                            value={cylR}
                            onChange={e => setCylR(Number(e.target.value))}
                            className="w-full accent-gold-500"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                            <span>Height h: {cylH} cm</span>
                          </div>
                          <input
                            type="range"
                            min={7}
                            max={28}
                            step={7}
                            value={cylH}
                            onChange={e => setCylH(Number(e.target.value))}
                            className="w-full accent-gold-500"
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span>Curved Surface Area (2πrh):</span>
                          <span className="font-bold text-gold-400">{cylCSA.toFixed(1)} cm²</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Total Surface Area 2πr(r+h):</span>
                          <span className="font-bold text-emerald-400">{cylTSA.toFixed(1)} cm²</span>
                        </div>
                        <div className="flex justify-between text-slate-300 border-t border-slate-800 pt-2">
                          <span>Volume (πr²h):</span>
                          <span className="font-bold text-amber-400">{cylVolume.toFixed(1)} cm³</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Brilliant Predict-then-Check Question 2 & Observation Question 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-950 border border-gold-800/40 space-y-2.5">
                      <div className="flex items-center gap-1.5 text-gold-400 text-xs font-black uppercase tracking-wider">
                        <span>🔮</span>
                        <span>Predict & Verify #2</span>
                      </div>
                      <p className="text-xs font-semibold text-white">{PREDICTION_QUESTIONS[1].question}</p>
                      <div className="space-y-1.5">
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handlePredictionSubmit(PREDICTION_QUESTIONS[1].id, i)}
                            className={`w-full p-2.5 rounded-xl text-[11px] text-left font-medium border transition-all ${
                              selectedPrediction[PREDICTION_QUESTIONS[1].id] === i
                                ? i === PREDICTION_QUESTIONS[1].correctIndex
                                  ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                  : 'bg-rose-950 border-rose-500 text-rose-200'
                                : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300'
                            }`}
                          >
                            <span className="font-bold mr-1">{String.fromCharCode(65 + i)}.</span>
                            {opt}
                          </button>
                        ))}
                      </div>
                      {showPredictionFeedback[PREDICTION_QUESTIONS[1].id] && (
                        <div className="p-2.5 bg-gold-950/40 rounded-xl border border-gold-800/60 text-[11px] text-gold-200 space-y-1">
                          <p><strong className="text-emerald-400">Explanation:</strong> {PREDICTION_QUESTIONS[1].explanation}</p>
                          <p className="text-amber-300">🔍 <strong className="text-amber-200">How to verify:</strong> {PREDICTION_QUESTIONS[1].verifyInstruction}</p>
                        </div>
                      )}
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-gold-800/40 space-y-2.5">
                      <div className="flex items-center gap-1.5 text-gold-400 text-xs font-black uppercase tracking-wider">
                        <span>👀</span>
                        <span>What Do You Notice? (Observation 1)</span>
                      </div>
                      <p className="text-xs font-semibold text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleObservationSubmit(OBSERVATION_QUESTIONS[0].id, i)}
                            className={`w-full p-2.5 rounded-xl text-[11px] text-left font-medium border transition-all ${
                              selectedObservation[OBSERVATION_QUESTIONS[0].id] === i
                                ? i === OBSERVATION_QUESTIONS[0].correctIndex
                                  ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                  : 'bg-rose-950 border-rose-500 text-rose-200'
                                : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300'
                            }`}
                          >
                            <span className="font-bold mr-1">{String.fromCharCode(65 + i)}.</span>
                            {opt}
                          </button>
                        ))}
                      </div>
                      {showObservationFeedback[OBSERVATION_QUESTIONS[0].id] && (
                        <div className="p-2.5 bg-gold-950/40 rounded-xl border border-gold-800/60 text-[11px] text-gold-200">
                          <strong className="text-emerald-400">Observation Takeaway:</strong> {OBSERVATION_QUESTIONS[0].explanation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 2: VOLUME & LIQUID CAPACITY ── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 400 240" className="w-full max-w-md">
                      <rect x="70" y="30" width="260" height="170" rx="12" fill="#0f172a" stroke="#475569" strokeWidth="3" />
                      {(() => {
                        const hMax = 170;
                        const fillH = (hMax * waterFillPercent) / 100;
                        const fillY = 30 + (hMax - fillH);
                        return (
                          <motion.rect
                            x="72"
                            y={fillY}
                            width="256"
                            height={fillH - 2}
                            rx="10"
                            fill="url(#trapGrad)"
                            animate={{ y: fillY, height: fillH - 2 }}
                            transition={{ duration: 0.3 }}
                          />
                        );
                      })()}
                      <text x="200" y="125" fill="white" textAnchor="middle" fontSize="14" fontWeight="black">
                        {currentWaterL.toFixed(1)} Litres ({((currentWaterL * 1000)).toFixed(0)} cm³)
                      </text>
                      <text x="200" y="220" fill="#94a3b8" textAnchor="middle" fontSize="11">
                        Tank: {tankL} cm × {tankW} cm × {tankH} cm (Total: {tankCapacityLitres} L)
                      </text>
                    </svg>

                    <div className="w-full mt-3 px-4">
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Water Fill Level: {waterFillPercent}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={waterFillPercent}
                        onChange={e => setWaterFillPercent(Number(e.target.value))}
                        className="w-full accent-gold-400"
                      />
                    </div>
                  </div>

                  {/* Tank Controls */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2">
                      <p className="text-xs font-bold text-gold-300 uppercase">Capacity Bridge</p>
                      <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/40 text-xs space-y-1">
                        <p className="text-amber-300 font-bold">1 Litre = 1,000 cm³</p>
                        <p className="text-slate-300">1 Millilitre (mL) = 1 cm³</p>
                        <p className="text-slate-300">1 Cubic Metre (1 m³) = 1,000 Litres</p>
                      </div>
                      <p className="text-xs text-slate-300 pt-2">
                        Total Volume = {tankL} × {tankW} × {tankH} ={' '}
                        <span className="font-bold text-gold-400">{tankVolumeCm3.toLocaleString()} cm³</span>
                      </p>
                      <p className="text-xs text-slate-300">
                        Max Capacity = {tankVolumeCm3} / 1,000 ={' '}
                        <span className="font-bold text-emerald-400">{tankCapacityLitres} Litres</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 3: PIE CHART PROPORTIONS ── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center">
                      <svg viewBox="0 0 300 240" className="w-full max-w-xs">
                        {(() => {
                          const cx = 150;
                          const cy = 120;
                          const r = 90;
                          let startAngle = 0;

                          const sectors = [
                            { label: 'Walking', val: pieWalking, angle: pieAngles.walking, color: '#6366f1' },
                            { label: 'Cycling', val: pieCycling, angle: pieAngles.cycling, color: '#38bdf8' },
                            { label: 'Yoga', val: pieYoga, angle: pieAngles.yoga, color: '#10b981' },
                            { label: 'Running', val: pieRunning, angle: pieAngles.running, color: '#f59e0b' },
                          ];

                          return (
                            <g>
                              {sectors.map((sec, idx) => {
                                const a1 = (startAngle * Math.PI) / 180;
                                const a2 = ((startAngle + sec.angle) * Math.PI) / 180;
                                const x1 = cx + r * Math.cos(a1);
                                const y1 = cy + r * Math.sin(a1);
                                const x2 = cx + r * Math.cos(a2);
                                const y2 = cy + r * Math.sin(a2);
                                const largeArc = sec.angle > 180 ? 1 : 0;
                                const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
                                startAngle += sec.angle;

                                return (
                                  <path
                                    key={idx}
                                    d={pathData}
                                    fill={sec.color}
                                    stroke="#0f172a"
                                    strokeWidth="2"
                                    className="transition-all duration-300"
                                  />
                                );
                              })}
                              <circle cx={cx} cy={cy} r={25} fill="#0f172a" />
                              <text x={cx} y={cy + 4} fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">
                                360°
                              </text>
                            </g>
                          );
                        })()}
                      </svg>

                      <div className="grid grid-cols-2 gap-2 text-[11px] w-full mt-2">
                        <div className="flex items-center gap-1.5 text-gold-400">
                          <span className="w-2.5 h-2.5 rounded bg-gold-500" />
                          <span>Walking: {pieAngles.walking.toFixed(1)}°</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gold-400">
                          <span className="w-2.5 h-2.5 rounded bg-gold-400" />
                          <span>Cycling: {pieAngles.cycling.toFixed(1)}°</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
                          <span>Yoga: {pieAngles.yoga.toFixed(1)}°</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-amber-400">
                          <span className="w-2.5 h-2.5 rounded bg-amber-500" />
                          <span>Running: {pieAngles.running.toFixed(1)}°</span>
                        </div>
                      </div>
                    </div>

                    {/* Sliders for survey counts */}
                    <div className="lg:col-span-5 space-y-3">
                      <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2.5 text-xs">
                        <div>
                          <div className="flex justify-between font-semibold text-slate-300 mb-1">
                            <span>Walking: {pieWalking}</span>
                          </div>
                          <input
                            type="range"
                            min={2}
                            max={30}
                            value={pieWalking}
                            onChange={e => setPieWalking(Number(e.target.value))}
                            className="w-full accent-gold-500"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between font-semibold text-slate-300 mb-1">
                            <span>Cycling: {pieCycling}</span>
                          </div>
                          <input
                            type="range"
                            min={2}
                            max={30}
                            value={pieCycling}
                            onChange={e => setPieCycling(Number(e.target.value))}
                            className="w-full accent-gold-400"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between font-semibold text-slate-300 mb-1">
                            <span>Yoga: {pieYoga}</span>
                          </div>
                          <input
                            type="range"
                            min={2}
                            max={30}
                            value={pieYoga}
                            onChange={e => setPieYoga(Number(e.target.value))}
                            className="w-full accent-emerald-500"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between font-semibold text-slate-300 mb-1">
                            <span>Running: {pieRunning}</span>
                          </div>
                          <input
                            type="range"
                            min={2}
                            max={30}
                            value={pieRunning}
                            onChange={e => setPieRunning(Number(e.target.value))}
                            className="w-full accent-amber-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Brilliant Observation Question 2 */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-800/40 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-wider">
                      <span>👀</span>
                      <span>What Do You Notice? (Observation 2)</span>
                    </div>
                    <p className="text-sm font-semibold text-white">{OBSERVATION_QUESTIONS[1].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleObservationSubmit(OBSERVATION_QUESTIONS[1].id, i)}
                          className={`p-3 rounded-xl text-xs text-left font-medium border transition-all ${
                            selectedObservation[OBSERVATION_QUESTIONS[1].id] === i
                              ? i === OBSERVATION_QUESTIONS[1].correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="font-bold mr-1.5">{String.fromCharCode(65 + i)}.</span>
                          {opt}
                        </button>
                      ))}
                    </div>
                    {showObservationFeedback[OBSERVATION_QUESTIONS[1].id] && (
                      <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/60 text-xs text-emerald-200">
                        <strong className="text-emerald-400">Insight:</strong> {OBSERVATION_QUESTIONS[1].explanation}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── SLIDE 4: VENN DIAGRAM LAB ── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 380 220" className="w-full max-w-sm">
                      <rect x="20" y="20" width="340" height="180" rx="16" fill="#090d16" stroke="#334155" strokeWidth="2" />
                      <text x="35" y="42" fill="#94a3b8" fontSize="12" fontWeight="bold">Universal Set U ({vennTotalU})</text>

                      <circle cx="150" cy="115" r="65" fill="#6366f1" fillOpacity="0.4" stroke="#818cf8" strokeWidth="2.5" />
                      <circle cx="230" cy="115" r="65" fill="#10b981" fillOpacity="0.4" stroke="#34d399" strokeWidth="2.5" />

                      <text x="115" y="120" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">
                        {vennOnlyA}
                      </text>
                      <text x="190" y="120" fill="#fef08a" fontSize="14" fontWeight="black" textAnchor="middle">
                        {vennIntersection}
                      </text>
                      <text x="265" y="120" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">
                        {vennOnlyB}
                      </text>
                      <text x="320" y="180" fill="#94a3b8" fontSize="12" textAnchor="middle">
                        Neither: {vennNeither}
                      </text>

                      <text x="115" y="70" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">Set A ({vennA})</text>
                      <text x="265" y="70" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">Set B ({vennB})</text>
                    </svg>

                    <p className="text-xs text-amber-300 font-mono mt-2">
                      n(A ∪ B) = {vennA} + {vennB} - {vennIntersection} = {vennUnion}
                    </p>
                  </div>

                  {/* Venn Sliders */}
                  <div className="lg:col-span-5 space-y-3">
                    <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2.5 text-xs">
                      <div>
                        <div className="flex justify-between font-semibold text-slate-300 mb-1">
                          <span>Set A Size: {vennA}</span>
                        </div>
                        <input
                          type="range"
                          min={15}
                          max={45}
                          value={vennA}
                          onChange={e => setVennA(Number(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between font-semibold text-slate-300 mb-1">
                          <span>Set B Size: {vennB}</span>
                        </div>
                        <input
                          type="range"
                          min={15}
                          max={45}
                          value={vennB}
                          onChange={e => setVennB(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between font-semibold text-slate-300 mb-1">
                          <span>Both A ∩ B: {vennIntersection}</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={Math.min(vennA, vennB)}
                          value={vennIntersection}
                          onChange={e => setVennIntersection(Number(e.target.value))}
                          className="w-full accent-yellow-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 rounded-2xl bg-slate-800 text-slate-300 font-bold text-xs disabled:opacity-30"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-6 py-2.5 rounded-2xl bg-gold-600 text-white font-bold text-xs shadow-lg shadow-gold-600/30"
              >
                Next Interactive Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 rounded-2xl bg-emerald-600 text-white font-black text-xs shadow-lg shadow-emerald-600/30"
              >
                Proceed to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX & CHANCE SIMULATOR ────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-white">Empirical Chance & Math Sandbox</h3>
              <p className="text-xs text-slate-400">
                Simulate 500 coin flips or die rolls to watch empirical probability stabilize near theoretical 0.5 and 1/6!
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs shadow-lg shadow-emerald-500/30"
            >
              Ready for Challenges! 🏆
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coin Flip Simulation */}
            <div className="p-5 bg-slate-900/80 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-amber-400">🪙 Coin Toss Experiment (c8_math_038)</span>
                <span className="text-xs text-slate-400">Total Flips: {coinFlips.heads + coinFlips.tails}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <p className="text-xs text-slate-400">Heads</p>
                  <p className="text-xl font-black text-gold-400">{coinFlips.heads}</p>
                  <p className="text-[11px] text-slate-500">
                    P = {coinFlips.heads + coinFlips.tails > 0 ? (coinFlips.heads / (coinFlips.heads + coinFlips.tails)).toFixed(3) : '0.500'}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <p className="text-xs text-slate-400">Tails</p>
                  <p className="text-xl font-black text-gold-400">{coinFlips.tails}</p>
                  <p className="text-[11px] text-slate-500">
                    P = {coinFlips.heads + coinFlips.tails > 0 ? (coinFlips.tails / (coinFlips.heads + coinFlips.tails)).toFixed(3) : '0.500'}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSimulateCoins(10)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
                >
                  +10 Flips
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSimulateCoins(100)}
                  className="flex-1 py-2 rounded-xl bg-gold-600 hover:bg-gold-500 text-xs font-bold text-white shadow-md shadow-gold-600/30"
                >
                  +100 Flips
                </motion.button>
              </div>
            </div>

            {/* 6-Sided Die Roll Simulation */}
            <div className="p-5 bg-slate-900/80 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-emerald-400">🎲 Die Throw Aggregator</span>
                <span className="text-xs text-slate-400">Total Rolls: {diceRolls.reduce((a, b) => a + b, 0)}</span>
              </div>

              <div className="grid grid-cols-6 gap-1.5 text-center">
                {diceRolls.map((count, faceIdx) => (
                  <div key={faceIdx} className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <p className="text-xs font-bold text-slate-300">[{faceIdx + 1}]</p>
                    <p className="text-sm font-black text-emerald-400">{count}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSimulateDice(30)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
                >
                  +30 Rolls
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSimulateDice(300)}
                  className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-md shadow-emerald-600/30"
                >
                  +300 Rolls
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: ADAPTIVE CHALLENGES & ESCALATING HINTS ───────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <canvas ref={canvasRef} width={600} height={30} className="w-full rounded-xl bg-slate-900/50" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-xs text-slate-400">({challenge.competencyLevel.toUpperCase()})</span>
            </div>

            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-400'
                  : difficulty === 'standard'
                  ? 'bg-gold-950/80 border border-gold-500/60 text-gold-400'
                  : 'bg-rose-950/80 border border-rose-500/60 text-rose-400'
              }`}
            >
              {difficulty} Level
            </motion.span>
          </div>

          <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-gold-400 to-emerald-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div
            className={`p-6 rounded-3xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-bold text-white leading-relaxed">{challenge.question}</p>

            {/* MCQ */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`p-4 rounded-2xl text-left text-sm font-medium border transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/90 hover:bg-slate-700/80 border-slate-700/60 text-slate-200'
                      }`}
                    >
                      <span className="inline-block w-6 h-6 rounded-full bg-slate-700/70 text-center leading-6 text-xs font-bold mr-2 text-slate-300">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Numeric */}
            {challenge.type === 'numeric' && (
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  step="any"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value..."
                  className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-white font-mono text-base focus:outline-none focus:border-gold-500"
                />
                <span className="text-slate-400 font-semibold text-sm">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || numericInput === ''}
                  className="px-6 py-3 rounded-2xl bg-gold-600 text-white font-black text-sm shadow-lg shadow-gold-600/30"
                >
                  Verify Answer
                </motion.button>
              </div>
            )}

            {/* Drag Label */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="mt-5 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-xl bg-gold-700 text-white font-bold text-xs cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {challenge.dragItems.map((item, idx) => {
                    const dropped = droppedLabels[item.targetId];
                    return (
                      <div
                        key={idx}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop(item.targetId)}
                        className={`p-4 rounded-2xl border-2 border-dashed text-center transition-all ${
                          dropped
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                            : 'bg-slate-950/50 border-slate-700 text-slate-500'
                        }`}
                      >
                        <p className="text-xs font-mono uppercase">{item.targetId}</p>
                        <p className="text-sm font-bold mt-1">{dropped || 'Drop Label Here'}</p>
                      </div>
                    );
                  })}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="mt-3 px-6 py-3 rounded-2xl bg-gold-600 text-white font-black text-xs"
                >
                  Check Placements
                </motion.button>
              </div>
            )}

            {/* Drag Sort */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="mt-5 space-y-3">
                {(sortArrangement.length > 0 ? sortArrangement.map(idx => challenge.sortItems![idx]) : challenge.sortItems).map(
                  (item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-slate-200 text-sm flex items-center gap-3 cursor-grab"
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-700 text-center leading-6 font-bold text-xs text-gold-400">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  )
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-3 rounded-2xl bg-gold-600 text-white font-black text-xs mt-2"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* Construct Set */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="mt-5 space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3.5 py-2 rounded-xl bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 min-h-[60px] flex items-center gap-2">
                  <span className="text-slate-500 font-mono text-sm">{'{'}</span>
                  {constructParts.map((part, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-gold-900 border border-gold-700 text-gold-200 font-bold text-xs flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <span className="text-slate-500 font-mono text-sm">{'}'}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-black text-xs"
                >
                  Submit Constructed Set
                </motion.button>
              </div>
            )}
          </div>

          {/* Progressive Disclosure Explanation */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 rounded-3xl border border-gold-800/60 space-y-4"
            >
              <div className="flex items-center gap-2 text-gold-300 font-bold text-sm">
                <span>📚</span>
                <span>Step-by-Step Solution & Reasoning:</span>
              </div>

              {challenge.explanation
                .split('. ')
                .filter(s => s.trim().length > 0)
                .slice(0, revealedSteps + 1)
                .map((sentence, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-slate-200 leading-relaxed"
                  >
                    <strong className="text-gold-400 font-bold mr-1">Step {i + 1}:</strong> {sentence}
                    {!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

              <div className="pt-2">
                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-2 rounded-xl bg-gold-700 text-white font-bold text-xs"
                  >
                    Show Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-sm shadow-lg shadow-emerald-500/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'View Final Report →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION, REFLECTION & SRS PROFILE ────────────────── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-900 rounded-3xl border border-gold-800 text-center space-y-3">
            <span className="text-4xl">🎓</span>
            <h2 className="text-3xl font-black text-white">Simulation Completed!</h2>
            <p className="text-slate-300 text-sm">
              Your Mastery Level:{' '}
              <span className="font-black text-emerald-400 uppercase">{masteryLevel}</span> • Score:{' '}
              <span className="font-black text-gold-400">{Math.max(0, 100 - errors * 5)}%</span>
            </p>
          </div>

          {/* Personalized Motivational Feedback based on errors */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800">
            <h3 className="text-sm font-bold text-emerald-400 mb-1">Performance Feedback</h3>
            <p className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-emerald-400">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors >= 1 && errors <= 3
                ? 'Great work!'
                : errors >= 4 && errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed mt-1">
              {errors === 0
                ? '🌟 Outstanding! You answered every question flawlessly across 2D/3D mensuration, probability, statistics, and sets.'
                : errors <= 3
                ? '👏 Excellent command of Class 8 mathematics! You have a solid grasp of core principles.'
                : errors <= 7
                ? '💪 Solid effort! Review the few areas where misconceptions tripped you up to reach mastery.'
                : '🌱 Every attempt strengthens your mathematical intuition. Revisit the interactive labs and try again!'}
            </p>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 rounded-3xl bg-rose-950/40 border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Your Identified Misconception Profile</h3>
              <div className="space-y-2">
                {hitMisconceptions.map(idx => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-xs">
                      <p className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Spaced Review Schedule (SM-2)</h4>
              <p className="text-xs text-slate-400 mt-1">
                Next memory consolidation session scheduled in{' '}
                <span className="font-bold text-white">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>.
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real World Activity Capstone */}
          <div className="p-6 rounded-3xl bg-gold-950/40 border border-gold-800/60 space-y-3">
            <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-gold-400 font-black">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating Interactive Helpers */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Topic Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C8_MathematicsAreaTrapeziumPolygonSim;
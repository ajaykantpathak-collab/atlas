'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// Node IDs as string literals
const NODE_C7_MATH_041 = 'c7_math_041';
const NODE_C7_MATH_042 = 'c7_math_042';
const NODE_C7_MATH_043 = 'c7_math_043';
const NODE_C7_MATH_044 = 'c7_math_044';
const NODE_C7_MATH_045 = 'c7_math_045';
const NODE_C7_MATH_046 = 'c7_math_046';
const NODE_C7_MATH_047 = 'c7_math_047';
const NODE_C7_MATH_048 = 'c7_math_048';
const NODE_C7_MATH_049 = 'c7_math_049';
const NODE_C7_MATH_050 = 'c7_math_050';

const ALL_NODE_IDS = [
  NODE_C7_MATH_041,
  NODE_C7_MATH_042,
  NODE_C7_MATH_043,
  NODE_C7_MATH_044,
  NODE_C7_MATH_045,
  NODE_C7_MATH_046,
  NODE_C7_MATH_047,
  NODE_C7_MATH_048,
  NODE_C7_MATH_049,
  NODE_C7_MATH_050,
];

const SCENARIO = {
  title: 'The Royal Geometrician & Chief Analyst of Patliputra',
  intro: 'The city architects and city statisticians are planning a massive architectural renovation of the Grand Academy. You must verify structural congruence of arches and pillars, construct parallel waterways, calculate land areas and rings, and analyse surveying records and lottery fairness.',
  context: 'Explore 5 core labs: Shape Superimposition & Congruence, Parallel Construction, Area & Ring Decomposition, Central Tendency & Data Graphs, and the Chance & Probability Simulator.',
};

const DISCOVERY_QUESTION = {
  question: 'Two triangular roof trusses both have an area of exactly 24 sq m. Are they guaranteed to be congruent so one can replace the other without altering the frame?',
  options: [
    'Yes — if two shapes have equal area, they always match completely in shape and size.',
    'No — equal area only means equal space; their side lengths and angles could be completely different.',
    'Yes — area is the only measurement required for triangle congruence.',
    'No — triangles can never be congruent under any circumstances.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Congruence requires matching shape AND size (all corresponding sides and angles), not just equal area! Let us explore why.',
};

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

const CHALLENGES: Challenge[] = [
  // Foundation Tier (1-7)
  {
    id: 'ch_c7_01',
    nodeId: NODE_C7_MATH_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Two circular fountain basins C1 and C2 have radii r1 = 3.5 m and r2 = 350 cm. Are these two circles congruent?',
    options: [
      'Yes — 3.5 m equals 350 cm, so their radii are equal, making them perfectly congruent.',
      'No — one is in metres and the other is in centimetres, so they cannot be congruent.',
      'No — circles are only congruent if their centres are in the exact same location.',
      'Yes — all circles in geometry are automatically congruent to one another.',
    ],
    correctIndex: 0,
    explanation: 'Converting units shows 3.5 m = 350 cm. Circles are determined solely by their radius; equal radii guarantee complete congruence upon superimposition.',
    hints: [
      'Convert 3.5 m to cm: 1 metre = 100 centimetres.',
      '3.5 m = 350 cm. Compare the two radii.',
      'Since radius 1 equals radius 2, the circles are identical in size and shape.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_c7_02',
    nodeId: NODE_C7_MATH_042,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is NOT a universally valid congruence criterion for general triangles?',
    options: ['SSS (Side-Side-Side)', 'SAS (Side-Angle-Side)', 'SSA (Side-Side-Angle)', 'ASA (Angle-Side-Angle)'],
    correctIndex: 2,
    explanation: 'SSA is not a valid criterion because two non-congruent triangles can often be drawn with two sides and a non-included angle (the ambiguous case), unless the angle is a right angle (RHS).',
    hints: [
      'Think about whether the angle in SAS must be included between the two sides.',
      'A swinging side can create two different triangles if the angle is not locked between the two known sides.',
      'SSA allows ambiguity; only SSS, SAS, ASA, and the special right-angled RHS are valid.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_c7_03',
    nodeId: NODE_C7_MATH_043,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the steps in order to construct a line parallel to line l through an external point P using corresponding angles.',
    sortItems: [
      'Draw a transversal line through P intersecting line l at point Q',
      'With Q as centre, draw an arc cutting line l and the transversal PQ',
      'With P as centre and same radius, draw an arc on the same side of PQ',
      'Measure chord length of the arc at Q and mark the same intersection at P, then join P through the mark',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First create a transversal reference, draw reference arc at Q, copy the exact arc radius to external point P, then transfer the chord width to replicate the exact corresponding angle.',
    hints: [
      'You must first establish a transversal connecting P to the line l.',
      'Next, strike an arc at the base intersection point Q.',
      'Copy the arc to P, transfer the angle width, and draw the parallel line.',
    ],
  },
  {
    id: 'ch_c7_04',
    nodeId: NODE_C7_MATH_045,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A rectangular courtyard is 14 m long and 6 m wide. What is its perimeter in metres?',
    correctAnswer: 40,
    tolerance: 0.1,
    unit: 'm',
    explanation: 'Perimeter of a rectangle = 2 × (length + breadth) = 2 × (14 + 6) = 2 × 20 = 40 m.',
    hints: [
      'Use the formula Perimeter = 2 × (length + breadth).',
      'Add 14 + 6 to find half the perimeter: 20 m.',
      'Multiply 20 by 2 = 40 m.',
    ],
  },
  {
    id: 'ch_c7_05',
    nodeId: NODE_C7_MATH_048,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Find the mean of the test scores: 12, 15, 10, 18, 20.',
    correctAnswer: 15,
    tolerance: 0.1,
    unit: 'marks',
    explanation: 'Mean = Sum of observations ÷ Number of observations = (12 + 15 + 10 + 18 + 20) ÷ 5 = 75 ÷ 5 = 15.',
    hints: [
      'First add all 5 numbers together.',
      '12 + 15 + 10 + 18 + 20 = 75.',
      'Divide 75 by 5.',
    ],
  },
  {
    id: 'ch_c7_06',
    nodeId: NODE_C7_MATH_048,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Find the median of the following ungrouped observations: 18, 10, 15, 12, 20.',
    correctAnswer: 15,
    tolerance: 0.1,
    unit: 'value',
    explanation: 'First arrange in ascending order: 10, 12, 15, 18, 20. For n = 5 (odd), the median is the 3rd term = 15.',
    hints: [
      'Do not pick the middle number of the raw list! First arrange in ascending order.',
      'Ordered list: 10, 12, 15, 18, 20.',
      'The exact middle item in this 5-item list is 15.',
    ],
  },
  {
    id: 'ch_c7_07',
    nodeId: NODE_C7_MATH_050,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'If a fair coin is tossed 3 times and results in Heads every time, what is the probability of getting Tails on the 4th toss?',
    options: [
      '50% (1/2) — each coin toss is independent and the coin has no memory.',
      '100% — Tails is "due" and guaranteed to balance previous tosses.',
      '0% — the coin is stuck on Heads permanently.',
      '75% — probability increases after consecutive Heads.',
    ],
    correctIndex: 0,
    explanation: 'Coin tosses are independent events. The coin possesses no memory of past outcomes; the probability of Tails remains 1/2 (50%) on every individual toss.',
    hints: [
      'Does a coin remember previous flips?',
      'Past tosses have zero physical influence on subsequent tosses.',
      'Every single flip of a fair coin has an independent 50% chance of Heads and 50% chance of Tails.',
    ],
    misconceptionIndex: 4,
  },

  // Standard Tier (8-14)
  {
    id: 'ch_c7_08',
    nodeId: NODE_C7_MATH_042,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Label each geometry pairing with its correct Congruence Criterion.',
    dragItems: [
      { label: 'SSS', targetId: 'box_sss' },
      { label: 'SAS', targetId: 'box_sas' },
      { label: 'ASA', targetId: 'box_asa' },
      { label: 'RHS', targetId: 'box_rhs' },
    ],
    correctMapping: {
      box_sss: 'SSS',
      box_sas: 'SAS',
      box_asa: 'ASA',
      box_rhs: 'RHS',
    },
    explanation: 'Three sides matching is SSS; two sides with the angle between them is SAS; two angles and the included side is ASA; hypotenuse and leg in right triangle is RHS.',
    hints: [
      'Match 3 sides to SSS.',
      'Match 2 sides with the included angle to SAS.',
      'Right-angled triangle with hypotenuse and one side matches RHS.',
    ],
  },
  {
    id: 'ch_c7_09',
    nodeId: NODE_C7_MATH_044,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'An apprentice attempts to construct a triangle with side lengths 4 cm, 5 cm, and 10 cm using ruler and compass. What will happen during construction?',
    options: [
      'The compass arcs from both ends of the 10 cm base will fail to intersect because 4 + 5 < 10.',
      'A unique acute triangle will be constructed successfully.',
      'A right-angled triangle will be formed because 4² + 5² ≈ 10².',
      'Two different overlapping triangles will be formed.',
    ],
    correctIndex: 0,
    explanation: 'By the triangle inequality theorem, the sum of any two sides must be strictly greater than the third side. Here 4 + 5 = 9 < 10, so the arcs of radii 4 cm and 5 cm drawn from ends of a 10 cm line segment cannot reach each other.',
    hints: [
      'Check the Triangle Inequality: is (side 1 + side 2) > side 3?',
      '4 + 5 = 9 cm. The base is 10 cm.',
      'Because 9 cm is shorter than 10 cm, the two compass arcs cannot reach each other to form a vertex.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_c7_10',
    nodeId: NODE_C7_MATH_046,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A parallelogram has a base of 12 cm, a slant side of 9 cm, and a perpendicular height of 8 cm. Calculate its area in sq cm.',
    correctAnswer: 96,
    tolerance: 0.1,
    unit: 'sq cm',
    explanation: 'Area of a parallelogram = base × perpendicular height = 12 cm × 8 cm = 96 sq cm. (Slant side of 9 cm is not used in area calculation).',
    hints: [
      'Formula for area of parallelogram is base × perpendicular height.',
      'Do NOT multiply base by slant side!',
      'Multiply 12 by 8 = 96 sq cm.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_c7_11',
    nodeId: NODE_C7_MATH_046,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A circular garden ring (annulus) has an outer radius R = 14 m and an inner radius r = 7 m. Using π = 22/7, find the area of the ring in sq m.',
    correctAnswer: 462,
    tolerance: 1,
    unit: 'sq m',
    explanation: 'Area of ring = π(R² - r²) = (22/7) × (14² - 7²) = (22/7) × (196 - 49) = (22/7) × 147 = 22 × 21 = 462 sq m.',
    hints: [
      'Area of ring = Outer Circle Area - Inner Circle Area = π(R² - r²).',
      'Calculate R² - r² = 196 - 49 = 147.',
      'Multiply (22/7) × 147 = 22 × 21 = 462.',
    ],
  },
  {
    id: 'ch_c7_12',
    nodeId: NODE_C7_MATH_047,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Ananya tests the hypothesis: "Students who sleep more than 8 hours score higher in mathematics." She only collects maths test scores of 10 students. Why is her dataset inadequate?',
    options: [
      'She collected the dependent variable (marks) but failed to collect the independent variable (hours of sleep).',
      'She needs at least 500 students before any table can be made.',
      'Maths marks cannot be represented numerically.',
      'Her hypothesis is impossible to test by any statistical survey.',
    ],
    correctIndex: 0,
    explanation: 'To test a relationship between two variables, both variables (sleep duration and exam marks) must be recorded for each subject to allow paired comparison and correlation analysis.',
    hints: [
      'What two factors does Ananya’s hypothesis link together?',
      'If you only know the test scores, can you tell who slept 8 hours and who did not?',
      'She must record both hours of sleep and test score for each student.',
    ],
  },
  {
    id: 'ch_c7_13',
    nodeId: NODE_C7_MATH_048,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the mode of the shoe sizes sold at the Patliputra bazaar: 4, 5, 5, 6, 5, 7, 6, 5, 6, 5, 7.',
    correctAnswer: 5,
    tolerance: 0.1,
    unit: 'size',
    explanation: 'Frequencies: Size 4 appears 1 time; Size 5 appears 5 times; Size 6 appears 3 times; Size 7 appears 2 times. Size 5 has the highest frequency (5), so Mode = 5.',
    hints: [
      'Mode is the observation that appears most frequently, not the largest number.',
      'Count how many times each shoe size appears.',
      'Size 5 appears 5 times, more than any other size.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_c7_14',
    nodeId: NODE_C7_MATH_049,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'On a bar graph representing weekly rainfall (Mon: 6 mm, Tue: 3 mm, Wed: 8 mm, Thu: 2 mm, Fri: 5 mm), what is the difference between maximum and minimum rainfall in mm?',
    correctAnswer: 6,
    tolerance: 0.1,
    unit: 'mm',
    explanation: 'Maximum rainfall is on Wednesday (8 mm), minimum is on Thursday (2 mm). Difference = 8 - 2 = 6 mm.',
    hints: [
      'Identify the tallest bar (maximum value).',
      'Identify the shortest bar (minimum value).',
      'Subtract minimum from maximum: 8 - 2 = 6 mm.',
    ],
  },

  // Advanced Tier (15-20+)
  {
    id: 'ch_c7_15',
    nodeId: NODE_C7_MATH_046,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A Norman Window consists of a rectangle of width 14 cm and height 20 cm, surmounted by a semicircle on the 14 cm width. Calculate its total area in sq cm (use π = 22/7).',
    correctAnswer: 357,
    tolerance: 1,
    unit: 'sq cm',
    explanation: 'Area of rectangle = length × width = 20 × 14 = 280 sq cm. Semicircle radius r = 14/2 = 7 cm. Area of semicircle = 1/2 × π × r² = 1/2 × (22/7) × 7 × 7 = 77 sq cm. Total area = 280 + 77 = 357 sq cm.',
    hints: [
      'Split the composite shape into a rectangle and a semicircle.',
      'Rectangle area = 14 × 20 = 280 sq cm.',
      'Semicircle radius = 7 cm. Semicircle area = 1/2 × (22/7) × 49 = 77 sq cm. Total = 280 + 77 = 357.',
    ],
  },
  {
    id: 'ch_c7_16',
    nodeId: NODE_C7_MATH_048,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Find the median of the even-sized dataset: 24, 18, 12, 30, 16, 28.',
    correctAnswer: 21,
    tolerance: 0.1,
    unit: 'value',
    explanation: 'Arrange in ascending order: 12, 16, 18, 24, 28, 30. For n = 6 (even), the median is the average of the 3rd and 4th terms: (18 + 24) ÷ 2 = 42 ÷ 2 = 21.',
    hints: [
      'First sort all numbers in ascending order: 12, 16, 18, 24, 28, 30.',
      'Since there are 6 values (even count), take the middle two numbers: 18 and 24.',
      'Calculate their mean: (18 + 24) / 2 = 21.',
    ],
  },
  {
    id: 'ch_c7_17',
    nodeId: NODE_C7_MATH_042,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Assemble the formal CPCTC deduction for two triangles proved congruent by SAS (AB = PQ, ∠B = ∠Q, BC = QR).',
    availableParts: ['ΔABC ≅ ΔPQR', 'by SAS', '⇒ AC = PR', 'and ∠A = ∠P', 'and ∠C = ∠R by CPCTC'],
    targetState: 'ΔABC ≅ ΔPQR by SAS ⇒ AC = PR and ∠A = ∠P and ∠C = ∠R by CPCTC',
    validationHint: 'Click all parts in logical order: Congruence statement -> Criterion -> CPCTC remaining equal parts.',
    explanation: 'Once congruence ΔABC ≅ ΔPQR is established by SAS, CPCTC (Corresponding Parts of Congruent Triangles are Congruent) proves all remaining corresponding sides (AC = PR) and corresponding angles (∠A = ∠P, ∠C = ∠R) are equal.',
    hints: [
      'Start with the congruence statement: ΔABC ≅ ΔPQR',
      'Follow with the rule "by SAS" and implication',
      'Finish with the remaining corresponding angle and side equalities by CPCTC.',
    ],
  },
  {
    id: 'ch_c7_18',
    nodeId: NODE_C7_MATH_050,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A standard 6-sided die is rolled 300 times in the palace lab. Face "4" turns up 54 times. What conclusion should the royal analyst draw?',
    options: [
      'The die is consistent with fairness; 54/300 is 18%, close to the expected 16.67% (50 times) with natural random variation.',
      'The die is rigged because face 4 did not appear exactly 50 times.',
      'Face 4 will never appear again in the next 100 rolls to compensate.',
      'The die has been tampered with to favour number 4 exclusively.',
    ],
    correctIndex: 0,
    explanation: 'Expected occurrences for each face in 300 rolls = 300/6 = 50. 54 occurrences is within normal experimental variation for random trials.',
    hints: [
      'What is the theoretical expectation: 300 ÷ 6?',
      'Expected count is 50. 54 is very close to 50.',
      'Random experiments show natural fluctuation around expected averages.',
    ],
  },
  {
    id: 'ch_c7_19',
    nodeId: NODE_C7_MATH_043,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does copying the alternate interior angle on the OPPOSITE side of transversal PQ guarantee that line m through P is parallel to line l?',
    options: [
      'Because the Alternate Interior Angle Theorem states that if alternate angles made by a transversal are equal, the lines are parallel.',
      'Because opposite angles always add up to 360 degrees.',
      'Because ruler-and-compass constructions only work on opposite sides.',
      'Because alternate angles turn the line into a perpendicular bisector.',
    ],
    correctIndex: 0,
    explanation: 'When a transversal cuts two lines such that alternate interior angles are equal, the lines are strictly parallel. Placing the copied angle on the opposite side creates alternate angles.',
    hints: [
      'Recall geometric properties of parallel lines intersected by a transversal.',
      'Which angle pair lies on opposite sides of the transversal between the two lines?',
      'Equality of alternate interior angles is a proven condition for parallelism.',
    ],
  },
  {
    id: 'ch_c7_20',
    nodeId: NODE_C7_MATH_046,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A right-angled triangle has sides of length 6 cm, 8 cm, and hypotenuse 10 cm. Find its area in sq cm.',
    correctAnswer: 24,
    tolerance: 0.1,
    unit: 'sq cm',
    explanation: 'In a right triangle, the two perpendicular sides serve as base and height. Area = 1/2 × base × height = 1/2 × 6 × 8 = 24 sq cm. (Hypotenuse 10 cm is not used).',
    hints: [
      'In a right triangle, the two legs meeting at 90° are the base and height.',
      'Base = 6 cm, Height = 8 cm.',
      'Area = 1/2 × 6 × 8 = 24 sq cm.',
    ],
  },
];

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
  nodeId: NODE_C7_MATH_041,
  title: 'Class 7 Geometry, Mensuration & Data Analytics Master Sim',
  definition: 'Comprehensive understanding of geometric congruence, ruler-compass constructions, perimeter & area formulas for composite shapes and rings, data handling, central tendencies, and experimental probability.',
  eli5: 'Think of geometry like crafting identical building blocks: check matching sides and angles, construct parallel lines, compute flooring tiles and ring tracks, find typical numbers with mean/median/mode, and see chance in action with coin and dice rolls!',
  misconceptions: [
    {
      misconception: 'Equal area means two triangles are congruent.',
      correction: 'Equal area only means equal surface space. Congruence requires all 3 corresponding sides and angles to match perfectly.',
    },
    {
      misconception: 'Circles drawn in different positions cannot be congruent.',
      correction: 'Position and orientation do not affect congruence. Two circles are congruent if and only if their radii are equal.',
    },
    {
      misconception: 'Area of a parallelogram is base × slant side.',
      correction: 'Area of a parallelogram is base × PERPENDICULAR height, never the slant side.',
    },
    {
      misconception: 'The mode is always the largest number in the dataset.',
      correction: 'The mode is the MOST FREQUENT number (highest count), not the highest numerical value.',
    },
    {
      misconception: 'Past coin flips influence the next flip (gambler\'s fallacy).',
      correction: 'Each flip of a fair coin is completely independent with an unchanging 50% chance.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What makes two circles congruent?', options: ['Equal radii', 'Equal centres', 'Drawn on same paper', 'Same color'], correctIndex: 0 },
    { question: 'What is the area formula of a triangle?', options: ['b × h', '1/2 × b × h', '2 × (b + h)', 'b² + h²'], correctIndex: 1 },
    { question: 'What is the sum of angles on a straight transversal line?', options: ['90°', '180°', '270°', '360°'], correctIndex: 1 },
    { question: 'Which measure of central tendency is the middle value when sorted?', options: ['Mean', 'Median', 'Mode', 'Range'], correctIndex: 1 },
    { question: 'Which measure of central tendency identifies the most popular item?', options: ['Mean', 'Median', 'Mode', 'Standard Deviation'], correctIndex: 2 },
    { question: 'Can a triangle be constructed with sides 2 cm, 3 cm, and 6 cm?', options: ['Yes', 'No, 2+3 < 6', 'Only if right angled', 'Yes by ASA'], correctIndex: 1 },
    { question: 'What is the area of a ring between concentric circles of radii R and r?', options: ['π(R - r)', 'π(R² - r²)', '2π(R + r)', 'πR² / πr²'], correctIndex: 1 },
    { question: 'If a die is rolled 60 times, how many times do we theoretically expect face 6?', options: ['6', '10', '15', '30'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student understands congruence criteria (SSS/SAS/ASA/RHS), constructions, area & ring calculations, statistical measures, and empirical probability.',
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Superimposition & Congruence of Triangles & Circles',
    instruction: 'Drag the superimposition slider to place the movable shape directly onto the reference template. Watch corresponding vertices match!',
    interactionType: 'superimpose-slider',
    nodeId: NODE_C7_MATH_041,
  },
  {
    title: 'Lab 2: Dynamic Criteria of Congruence (SSS, SAS, ASA, RHS)',
    instruction: 'Toggle criteria to modify triangle sides and angles. Notice how locking 3 specific corresponding parts guarantees congruence.',
    interactionType: 'criteria-toggle',
    nodeId: NODE_C7_MATH_042,
  },
  {
    title: 'Lab 3: Area of Rings & Norman Windows',
    instruction: 'Adjust outer radius R, inner radius r, and rectangle height to see real-time area decomposition.',
    interactionType: 'area-ring-slider',
    nodeId: NODE_C7_MATH_046,
  },
  {
    title: 'Lab 4: Central Tendency & Dynamic Bar Graph',
    instruction: 'Modify dataset values to see how the Mean (average), Median (middle), and Mode (most frequent) respond instantly on the bar chart.',
    interactionType: 'data-chart-adjust',
    nodeId: NODE_C7_MATH_048,
  },
  {
    title: 'Lab 5: Experimental Probability & Randomness Sandbox',
    instruction: 'Simulate coin flips and dice rolls in batches. Observe how relative frequencies balance toward theoretical odds as trials increase.',
    interactionType: 'probability-trials',
    nodeId: NODE_C7_MATH_050,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you slide the inner radius r of a ring closer to the outer radius R, what happens to the area of the ring?',
    options: ['Ring area approaches zero as the width shrinks', 'Ring area doubles', 'Ring area stays constant', 'Ring area becomes negative'],
    correctIndex: 0,
    verifyInstruction: 'Adjust the inner radius slider in Lab 3 to test your prediction!',
    nodeId: NODE_C7_MATH_046,
  },
  {
    question: 'Predict: If a dataset has an extreme high outlier (e.g., marks: 10, 12, 14, 15, 95), which measure will be pulled up the most?',
    options: ['Mean is pulled up significantly', 'Median changes drastically', 'Mode becomes 95', 'All three remain completely unchanged'],
    correctIndex: 0,
    verifyInstruction: 'Test this in Lab 4 by boosting one student score to see the mean shift!',
    nodeId: NODE_C7_MATH_048,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: When you rotate and translate the congruent triangle over the target, what do you notice about all 3 pairs of sides and angles?',
    observableOptions: [
      'Every vertex, side, and angle coincides completely without any gap or overlap.',
      'Only the area matches, but side lengths are different.',
      'The shape becomes twice as large.',
      'Only one angle matches at a time.',
    ],
    correctIndex: 0,
    nodeId: NODE_C7_MATH_041,
  },
  {
    question: 'Observation: As the number of coin tosses increases from 10 to 100, what happens to the ratio of Heads to Tails?',
    observableOptions: [
      'The percentage of Heads fluctuates wildly and never stabilizes.',
      'The percentage tends to hover closer and closer to 50% (fair balance).',
      'Heads always wins 100% of the time.',
      'Tails completely stops appearing.',
    ],
    correctIndex: 1,
    nodeId: NODE_C7_MATH_050,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Chief Architect & Data Consultant Challenge',
  description: 'Design a community park blueprint containing a circular fountain with an outer paved ring, two congruent triangular flowerbeds, and a survey table recording 15 visitors with mean and median stay duration.',
  steps: [
    'Draw two congruent triangles with sides 6 cm, 8 cm, 10 cm and verify SSS congruence.',
    'Compute the paved ring area with R = 7 m, r = 3.5 m using π(R² - r²).',
    'Collect or simulate stay duration for 15 visitors and compute Mean, Median, and Mode.',
    'Plot a neat bar graph of visitor transport modes with a defined scale.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

function C7_MathematicsExtendCongruenceSimpleSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['mathematics'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant-style exploration & sandbox state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [sandboxTab, setSandboxTab] = useState<'congruence' | 'rings' | 'data' | 'probability'>('congruence');

  // Interactive Lab Variables (30+ state hooks)
  const [superimposeOffset, setSuperimposeOffset] = useState(100);
  const [shapeRotation, setShapeRotation] = useState(0);
  const [shapeScale, setShapeScale] = useState(1);
  const [activeCriterion, setActiveCriterion] = useState<'SSS' | 'SAS' | 'ASA' | 'RHS'>('SSS');

  // Area & Ring Lab Variables
  const [outerRadius, setOuterRadius] = useState(14);
  const [innerRadius, setInnerRadius] = useState(7);
  const [normanWidth, setNormanWidth] = useState(14);
  const [normanHeight, setNormanHeight] = useState(20);
  const [parallelogramBase, setParallelogramBase] = useState(12);
  const [parallelogramHeight, setParallelogramHeight] = useState(8);

  // Data & Probability Lab Variables
  const [dataset, setDataset] = useState<number[]>([12, 15, 10, 18, 20]);
  const [newDatum, setNewDatum] = useState<string>('15');
  const [coinHeads, setCoinHeads] = useState(0);
  const [coinTails, setCoinTails] = useState(0);
  const [diceCounts, setDiceCounts] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [recentOutcomes, setRecentOutcomes] = useState<string[]>([]);

  // Adaptive & Scoring State
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

  // Interactive challenge inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback and animation state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Adaptive challenge filter
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Derived Calculations
  const calculatedRingArea = useMemo(() => {
    if (outerRadius <= innerRadius) return 0;
    return Math.round((22 / 7) * (outerRadius * outerRadius - innerRadius * innerRadius) * 100) / 100;
  }, [outerRadius, innerRadius]);

  const calculatedNormanArea = useMemo(() => {
    const rectArea = normanWidth * normanHeight;
    const r = normanWidth / 2;
    const semiArea = 0.5 * (22 / 7) * r * r;
    return Math.round((rectArea + semiArea) * 100) / 100;
  }, [normanWidth, normanHeight]);

  const calculatedStats = useMemo(() => {
    if (dataset.length === 0) return { mean: 0, median: 0, mode: 'None' };
    const sum = dataset.reduce((a, b) => a + b, 0);
    const mean = Math.round((sum / dataset.length) * 100) / 100;

    const sorted = [...dataset].sort((a, b) => a - b);
    let median = 0;
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      median = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      median = sorted[mid];
    }

    const counts: Record<number, number> = {};
    dataset.forEach(n => { counts[n] = (counts[n] || 0) + 1; });
    let maxFreq = 0;
    let modes: number[] = [];
    Object.entries(counts).forEach(([val, freq]) => {
      if (freq > maxFreq) {
        maxFreq = freq;
        modes = [Number(val)];
      } else if (freq === maxFreq && maxFreq > 1) {
        modes.push(Number(val));
      }
    });

    const modeStr = maxFreq > 1 ? modes.join(', ') : 'No unique mode';
    return { mean, median, mode: modeStr };
  }, [dataset]);

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adapt difficulty on BKT updates
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Canvas dynamic animation
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

      // Draw subtle math grid & pulsing geometric beacon
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
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

      const pulse = Math.sin(frame * 0.05) * 6 + 12;
      ctx.beginPath();
      ctx.arc(canvas.width - 30, 25, pulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.fill();
      ctx.strokeStyle = '#6366f1';
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // Escalating hints handler
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
    }
  }, [hintCount, challenge]);

  // Inactivity auto-hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Handlers for discovery & phase advancement
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding! Congruence demands matching shape and size.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories! Manipulate the tools to discover mathematical rules.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enjoy free exploration in the sandbox without time limits or grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Now test your mastery with ICSE standard challenges!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the sliders to see what actually happens.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Precise observation! That is the core of geometric proof.' : 'Look closely at how the edges align.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations on mastering Class 7 Geometry, Mensuration and Probability!');
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

  // Answer validation
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
      speechManager.speak('Correct! Excellent mathematical reasoning.');
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
        speechManager.speak('Review the step-by-step ICSE derivation below.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // Drag-and-drop callbacks
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
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
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // Interactive Probability Simulations
  const handleFlipCoin = useCallback((batchSize: number = 1) => {
    audioManager.play('tap');
    let h = 0;
    let t = 0;
    const newOutcomes: string[] = [];
    for (let i = 0; i < batchSize; i++) {
      if (Math.random() < 0.5) {
        h++;
        newOutcomes.push('H');
      } else {
        t++;
        newOutcomes.push('T');
      }
    }
    setCoinHeads(prev => prev + h);
    setCoinTails(prev => prev + t);
    setRecentOutcomes(prev => [...newOutcomes, ...prev].slice(0, 16));
  }, []);

  const handleRollDice = useCallback((batchSize: number = 1) => {
    audioManager.play('tap');
    const additions = [0, 0, 0, 0, 0, 0];
    const newOutcomes: string[] = [];
    for (let i = 0; i < batchSize; i++) {
      const face = Math.floor(Math.random() * 6) + 1;
      additions[face - 1]++;
      newOutcomes.push(face.toString());
    }
    setDiceCounts(prev => prev.map((cnt, i) => cnt + additions[i]));
    setRecentOutcomes(prev => [...newOutcomes, ...prev].slice(0, 16));
  }, []);

  const handleResetProbability = useCallback(() => {
    audioManager.play('pop');
    setCoinHeads(0);
    setCoinTails(0);
    setDiceCounts([0, 0, 0, 0, 0, 0]);
    setRecentOutcomes([]);
  }, []);

  const handleAddDatasetNumber = useCallback(() => {
    const val = parseFloat(newDatum);
    if (!isNaN(val) && dataset.length < 15) {
      audioManager.play('tap');
      setDataset(prev => [...prev, val]);
      setNewDatum('');
    }
  }, [newDatum, dataset]);

  const handleRemoveDatasetNumber = useCallback((index: number) => {
    audioManager.play('pop');
    setDataset(prev => prev.filter((_, i) => i !== index));
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800">
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700/50">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gold-900/60 text-gold-300 border border-gold-700">
                Class 7 ICSE Math
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                NEP 2020 Competency Focus
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
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
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                phase === p
                  ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label={`Switch to ${p} phase`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY (Curiosity Hook) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/70 to-slate-900 rounded-3xl border border-gold-800/60 shadow-xl">
            <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold uppercase tracking-wider mb-2">
              🏛️ Scenario Mission Hook
            </div>
            <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300/80 mt-3 bg-gold-900/30 p-3 rounded-xl border border-gold-800/40">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 text-xs font-bold bg-amber-500/20 text-amber-300 rounded-md border border-amber-500/40">
                Ponder & Predict
              </span>
              <h3 className="text-lg font-bold text-white">{DISCOVERY_QUESTION.question}</h3>
            </div>

            <div className="grid grid-cols-1 gap-3 mt-4">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-2xl text-left text-sm font-medium transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 text-slate-200'
                  }`}
                  aria-label={`Discovery option ${i + 1}`}
                >
                  <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-2xl bg-gold-950/40 border border-gold-800/50 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div>
                  <p className={`text-sm font-bold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '✓ Spot-on intuition!' : '⚡ Great intuition check!'}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    {discoveryCorrect
                      ? 'Two right triangles (e.g. 3×4 and 6×2 base/height) both have area 6 sq cm, yet completely different sides.'
                      : DISCOVERY_QUESTION.hintAfter}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-gold-600 to-purple-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-gold-600/30 whitespace-nowrap"
                  aria-label="Enter Interactive Labs"
                >
                  Step into the 5 Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (Brilliant Style) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Exploration Header & Progress */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gold-400 bg-gold-950/60 px-3 py-1 rounded-full border border-gold-800">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
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
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4"
            >
              <div>
                <h3 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-amber-300 mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* Lab Visualisations */}
              <div className="bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800/80">
                {/* Lab 1: Superimposition of Triangles & Circles */}
                {currentSlide === 0 && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                      <div className="flex items-center gap-3">
                        <label className="text-xs font-semibold text-slate-300">Superimpose Shift:</label>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={superimposeOffset}
                          onChange={e => {
                            setSuperimposeOffset(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-32 sm:w-48 accent-gold-500"
                          aria-label="Superimpose offset slider"
                        />
                        <span className="text-xs font-mono text-gold-400">{superimposeOffset}% offset</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-semibold text-slate-300">Scale:</label>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShapeScale(s => (s === 1 ? 1.3 : 1))}
                          className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${
                            shapeScale === 1
                              ? 'bg-emerald-900/40 border-emerald-500 text-emerald-300'
                              : 'bg-rose-900/40 border-rose-500 text-rose-300'
                          }`}
                        >
                          {shapeScale === 1 ? 'Equal Scale (Congruent)' : 'Scaled (Similar, Not Congruent)'}
                        </motion.button>
                      </div>
                    </div>

                    <svg viewBox="0 0 600 240" className="w-full h-56 bg-slate-900 rounded-xl">
                      {/* Fixed Target Triangle ABC */}
                      <polygon points="120,190 260,190 200,60" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2" />
                      <text x="110" y="205" fill="#94a3b8" fontSize="11" fontWeight="bold">A (0,0)</text>
                      <text x="265" y="205" fill="#94a3b8" fontSize="11" fontWeight="bold">B (c=6cm)</text>
                      <text x="195" y="50" fill="#94a3b8" fontSize="11" fontWeight="bold">C (b=5cm)</text>

                      {/* Movable Overlay Triangle PQR */}
                      <g transform={`translate(${superimposeOffset * 2.2}, 0) scale(${shapeScale})`}>
                        <polygon
                          points="120,190 260,190 200,60"
                          fill="rgba(34, 197, 94, 0.25)"
                          stroke={superimposeOffset < 5 && shapeScale === 1 ? '#22c55e' : '#f59e0b'}
                          strokeWidth="2.5"
                          strokeDasharray={superimposeOffset < 5 ? 'none' : '4 4'}
                        />
                        <text x="115" y="180" fill="#22c55e" fontSize="10" fontWeight="bold">P</text>
                        <text x="245" y="180" fill="#22c55e" fontSize="10" fontWeight="bold">Q</text>
                        <text x="195" y="75" fill="#22c55e" fontSize="10" fontWeight="bold">R</text>
                      </g>

                      {/* Circles representation */}
                      <g transform="translate(450, 120)">
                        <circle cx="0" cy="0" r="45" fill="none" stroke="#6366f1" strokeWidth="2" />
                        <text x="0" y="5" textAnchor="middle" fill="#818cf8" fontSize="10">Target r=4.5cm</text>
                        <circle
                          cx={superimposeOffset * 0.8}
                          cy="0"
                          r={45 * shapeScale}
                          fill="rgba(34, 197, 94, 0.2)"
                          stroke={superimposeOffset < 5 && shapeScale === 1 ? '#22c55e' : '#f59e0b'}
                          strokeWidth="2"
                        />
                      </g>
                    </svg>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                      {superimposeOffset < 5 && shapeScale === 1 ? (
                        <span className="text-emerald-400 font-bold">
                          ✓ PERFECT COINCIDENCE: All corresponding vertices, edges, and angles superimpose identically.
                        </span>
                      ) : shapeScale !== 1 ? (
                        <span className="text-rose-400 font-bold">
                          ✗ NOT CONGRUENT: Even though the angles match, the edges differ in length. Size must match shape!
                        </span>
                      ) : (
                        <span>
                          Drag the Superimpose slider toward 0% to check if the traced shape coincides with the target.
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Lab 2: Criteria of Congruence */}
                {currentSlide === 1 && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {(['SSS', 'SAS', 'ASA', 'RHS'] as const).map(crit => (
                        <motion.button
                          key={crit}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setActiveCriterion(crit);
                            audioManager.play('tap');
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                            activeCriterion === crit
                              ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/40'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {crit} Criterion
                        </motion.button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <h4 className="text-sm font-bold text-gold-300">Active Rule: {activeCriterion}</h4>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          {activeCriterion === 'SSS' && 'If all 3 sides of ΔABC equal corresponding 3 sides of ΔPQR, shapes are locked identically.'}
                          {activeCriterion === 'SAS' && 'Two sides and the INCLUDED angle between them are equal. (SSA is invalid!).'}
                          {activeCriterion === 'ASA' && 'Two angles and the INCLUDED side common to both angles fix the scale and shape.'}
                          {activeCriterion === 'RHS' && 'Right angle (90°), Hypotenuse, and one corresponding Side equal.'}
                        </p>
                        <div className="mt-3 p-2.5 bg-gold-950/40 rounded-lg border border-gold-800 text-xs text-emerald-400 font-mono">
                          CPCTC Guarantee: All 6 elements coincide!
                        </div>
                      </div>

                      <svg viewBox="0 0 300 150" className="w-full bg-slate-900 rounded-xl">
                        {activeCriterion === 'RHS' ? (
                          <>
                            <polygon points="40,120 180,120 40,40" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2" />
                            <rect x="40" y="105" width="15" height="15" fill="none" stroke="#818cf8" strokeWidth="1.5" />
                            <text x="110" y="70" fill="#22c55e" fontSize="10" fontWeight="bold">Hypotenuse = 10cm</text>
                            <text x="100" y="135" fill="#e2e8f0" fontSize="10">Base = 8cm</text>
                            <text x="15" y="85" fill="#e2e8f0" fontSize="10">6cm</text>
                          </>
                        ) : (
                          <>
                            <polygon points="40,120 200,120 150,40" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2" />
                            <text x="110" y="135" fill="#e2e8f0" fontSize="10">Base AB = 7 cm</text>
                            <text x="75" y="75" fill="#e2e8f0" fontSize="10">b = 5 cm</text>
                            <text x="180" y="75" fill="#e2e8f0" fontSize="10">c = 6 cm</text>
                            {activeCriterion === 'SAS' && (
                              <path d="M 60,120 A 20 20 0 0 0 52,107" fill="none" stroke="#f59e0b" strokeWidth="2" />
                            )}
                          </>
                        )}
                      </svg>
                    </div>
                  </div>
                )}

                {/* Lab 3: Area of Rings & Norman Windows */}
                {currentSlide === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="text-xs font-semibold text-slate-300">Outer Radius R: {outerRadius} m</label>
                        <input
                          type="range"
                          min={8}
                          max={21}
                          value={outerRadius}
                          onChange={e => {
                            setOuterRadius(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-gold-500"
                          aria-label="Outer radius slider"
                        />
                        <label className="text-xs font-semibold text-slate-300">Inner Radius r: {innerRadius} m</label>
                        <input
                          type="range"
                          min={2}
                          max={outerRadius - 1}
                          value={innerRadius}
                          onChange={e => {
                            setInnerRadius(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-purple-500"
                          aria-label="Inner radius slider"
                        />
                        <div className="p-3 bg-gold-950/50 rounded-xl border border-gold-800 text-xs font-mono">
                          <div>Ring Area = π(R² - r²)</div>
                          <div className="text-gold-300 font-bold mt-1">
                            = (22/7) × ({outerRadius}² - {innerRadius}²) = {calculatedRingArea} sq m
                          </div>
                        </div>
                      </div>

                      <svg viewBox="0 0 250 200" className="w-full bg-slate-900 rounded-xl">
                        <g transform="translate(125, 100)">
                          {/* Outer Circle */}
                          <circle cx="0" cy="0" r={outerRadius * 4} fill="rgba(99, 102, 241, 0.4)" stroke="#6366f1" strokeWidth="2" />
                          {/* Inner Circle hole */}
                          <circle cx="0" cy="0" r={innerRadius * 4} fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
                          <line x1="0" y1="0" x2={innerRadius * 4} y2="0" stroke="#a855f7" strokeWidth="2" />
                          <text x={innerRadius * 2} y="-5" fill="#c084fc" fontSize="9">r={innerRadius}m</text>
                          <line x1="0" y1="0" x2="0" y2={-outerRadius * 4} stroke="#6366f1" strokeWidth="2" />
                          <text x="5" y={-outerRadius * 2} fill="#818cf8" fontSize="9">R={outerRadius}m</text>
                        </g>
                      </svg>
                    </div>
                  </div>
                )}

                {/* Lab 4: Central Tendencies & Interactive Bar Graph */}
                {currentSlide === 3 && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs text-slate-300 font-semibold">Observations:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {dataset.map((val, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-slate-800 rounded-md text-xs font-mono text-gold-300 border border-slate-700 flex items-center gap-1"
                          >
                            {val}
                            <button
                              onClick={() => handleRemoveDatasetNumber(i)}
                              className="text-rose-400 hover:text-rose-300 ml-1 font-bold"
                              aria-label={`Remove value ${val}`}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={newDatum}
                          onChange={e => setNewDatum(e.target.value)}
                          placeholder="Add val"
                          className="w-16 px-2 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                          aria-label="Add new value to dataset"
                        />
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={handleAddDatasetNumber}
                          className="px-2.5 py-1 bg-gold-600 text-white rounded-lg text-xs font-bold"
                        >
                          + Add
                        </motion.button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-3 bg-slate-900 rounded-xl border border-gold-900 text-center">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Mean (Average)</div>
                        <div className="text-lg font-black text-gold-300">{calculatedStats.mean}</div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-purple-900 text-center">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Median (Middle)</div>
                        <div className="text-lg font-black text-purple-300">{calculatedStats.median}</div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-emerald-900 text-center">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Mode (Most Frequent)</div>
                        <div className="text-sm font-black text-emerald-300 truncate mt-1">{calculatedStats.mode}</div>
                      </div>
                    </div>

                    {/* Dynamic Bar Graph */}
                    <svg viewBox="0 0 500 160" className="w-full h-40 bg-slate-900 rounded-xl p-2">
                      {dataset.map((val, idx) => {
                        const barHeight = Math.min(120, (val / 25) * 120);
                        const x = 30 + idx * 30;
                        return (
                          <g key={idx}>
                            <rect
                              x={x}
                              y={130 - barHeight}
                              width="20"
                              height={barHeight}
                              rx="3"
                              fill="#6366f1"
                              opacity={val === calculatedStats.median ? 1 : 0.75}
                            />
                            <text x={x + 10} y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">{idx + 1}</text>
                            <text x={x + 10} y={125 - barHeight} textAnchor="middle" fill="#c7d2fe" fontSize="9">{val}</text>
                          </g>
                        );
                      })}
                      <line x1="20" y1="130" x2="480" y2="130" stroke="#475569" strokeWidth="1.5" />
                    </svg>
                  </div>
                )}

                {/* Lab 5: Probability Sandbox */}
                {currentSlide === 4 && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 items-center justify-between">
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleFlipCoin(1)}
                          className="px-3 py-1.5 bg-gold-600 text-white rounded-xl text-xs font-bold"
                        >
                          Flip Coin (1x)
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleFlipCoin(20)}
                          className="px-3 py-1.5 bg-gold-700 text-white rounded-xl text-xs font-bold"
                        >
                          Flip Batch (20x)
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRollDice(30)}
                          className="px-3 py-1.5 bg-purple-600 text-white rounded-xl text-xs font-bold"
                        >
                          Roll Dice (30x)
                        </motion.button>
                      </div>
                      <button
                        onClick={handleResetProbability}
                        className="text-xs text-rose-400 hover:text-rose-300 font-bold"
                      >
                        Reset Trials
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Coin Results */}
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <h4 className="text-xs font-bold text-slate-300 mb-2">Coin Toss Empirical Balance</h4>
                        <div className="flex items-center justify-between text-xs font-mono text-gold-300 mb-2">
                          <span>Heads: {coinHeads} ({coinHeads + coinTails > 0 ? Math.round((coinHeads / (coinHeads + coinTails)) * 100) : 0}%)</span>
                          <span>Tails: {coinTails} ({coinHeads + coinTails > 0 ? Math.round((coinTails / (coinHeads + coinTails)) * 100) : 0}%)</span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden flex">
                          <motion.div
                            className="bg-gold-500 h-full"
                            style={{
                              width: `${coinHeads + coinTails > 0 ? (coinHeads / (coinHeads + coinTails)) * 100 : 50}%`,
                            }}
                          />
                          <motion.div
                            className="bg-purple-500 h-full"
                            style={{
                              width: `${coinHeads + coinTails > 0 ? (coinTails / (coinHeads + coinTails)) * 100 : 50}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Recent String Outcomes */}
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <h4 className="text-xs font-bold text-slate-300 mb-2">Recent Random Outcomes String</h4>
                        <div className="flex flex-wrap gap-1.5 min-h-[32px]">
                          {recentOutcomes.map((out, i) => (
                            <span
                              key={i}
                              className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                                out === 'H'
                                  ? 'bg-gold-900/60 text-gold-300'
                                  : out === 'T'
                                  ? 'bg-purple-900/60 text-purple-300'
                                  : 'bg-emerald-900/60 text-emerald-300'
                              }`}
                            >
                              {out}
                            </span>
                          ))}
                          {recentOutcomes.length === 0 && (
                            <span className="text-xs text-slate-500">Run a simulation above to observe randomness.</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Predict-Then-Check & Observation Question section inside Slide */}
              {currentSlide === 0 && (
                <div className="mt-4 p-4 bg-gold-950/30 rounded-2xl border border-gold-800/40">
                  <p className="text-xs font-bold text-gold-300 uppercase">Interactive Observation Check</p>
                  <p className="text-sm text-white font-medium mt-1">{OBSERVATION_QUESTIONS[0].question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleObservation(i)}
                        className={`p-2.5 rounded-xl text-left text-xs transition-all border ${
                          observationAnswered && i === OBSERVATION_QUESTIONS[0].correctIndex
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                            : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 text-slate-200 rounded-xl text-xs font-bold disabled:opacity-40"
              aria-label="Previous Lab"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-mono">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-600/30"
                aria-label="Next Lab"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30"
                aria-label="Enter Free Play Sandbox"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="px-2 py-0.5 text-xs font-bold bg-emerald-500/20 text-emerald-300 rounded-md border border-emerald-500/40">
                Free Exploration Sandbox
              </span>
              <h3 className="text-xl font-black text-white mt-1">Multi-Lab Experimentation Arena</h3>
              <p className="text-xs text-slate-400 mt-1">
                Zero grading stress. Toggle between tools to build deep visual intuition.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-gold-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-emerald-600/30"
              aria-label="Begin Graded Challenges"
            >
              Ready for Challenges! 🎯
            </motion.button>
          </div>

          <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
            {(['congruence', 'rings', 'data', 'probability'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setSandboxTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                  sandboxTab === tab
                    ? 'bg-gold-600 text-white shadow-md shadow-gold-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab} Lab
              </button>
            ))}
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
            {sandboxTab === 'congruence' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-300">
                  Rotate and scale the superimposed triangle. Notice how angle preserves shape, but sides lock size!
                </p>
                <div className="flex gap-4 items-center">
                  <label className="text-xs text-slate-300">Rotate:</label>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    value={shapeRotation}
                    onChange={e => setShapeRotation(Number(e.target.value))}
                    className="w-48 accent-gold-500"
                    aria-label="Triangle rotation"
                  />
                  <span className="text-xs font-mono text-gold-400">{shapeRotation}°</span>
                </div>
                <svg viewBox="0 0 400 180" className="w-full h-44 bg-slate-950 rounded-xl">
                  <polygon points="100,140 240,140 170,40" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2" />
                  <g transform={`translate(170, 90) rotate(${shapeRotation}) translate(-170, -90)`}>
                    <polygon points="100,140 240,140 170,40" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4" />
                  </g>
                </svg>
              </div>
            )}

            {sandboxTab === 'rings' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300">Parallelogram Base: {parallelogramBase} cm</label>
                    <input
                      type="range"
                      min={6}
                      max={20}
                      value={parallelogramBase}
                      onChange={e => setParallelogramBase(Number(e.target.value))}
                      className="w-full accent-gold-500"
                      aria-label="Parallelogram base slider"
                    />
                    <label className="text-xs text-slate-300 mt-2 block">
                      Perpendicular Height: {parallelogramHeight} cm
                    </label>
                    <input
                      type="range"
                      min={4}
                      max={15}
                      value={parallelogramHeight}
                      onChange={e => setParallelogramHeight(Number(e.target.value))}
                      className="w-full accent-purple-500"
                      aria-label="Parallelogram height slider"
                    />
                    <div className="mt-3 p-3 bg-gold-950/40 rounded-xl text-xs font-mono text-gold-300">
                      Area = Base × Height = {parallelogramBase} × {parallelogramHeight} ={' '}
                      <span className="font-bold text-emerald-400">{parallelogramBase * parallelogramHeight} sq cm</span>
                    </div>
                  </div>

                  <svg viewBox="0 0 240 150" className="w-full bg-slate-950 rounded-xl p-2">
                    <polygon
                      points={`30,120 ${30 + parallelogramBase * 8},120 ${60 + parallelogramBase * 8},${120 - parallelogramHeight * 7} 60,${120 - parallelogramHeight * 7}`}
                      fill="rgba(99, 102, 241, 0.25)"
                      stroke="#6366f1"
                      strokeWidth="2"
                    />
                    <line
                      x1="60"
                      y1="120"
                      x2="60"
                      y2={120 - parallelogramHeight * 7}
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeDasharray="3 3"
                    />
                    <text x="65" y="100" fill="#f59e0b" fontSize="9">h={parallelogramHeight}cm</text>
                  </svg>
                </div>
              </div>
            )}

            {sandboxTab === 'data' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-300">
                  Observe real-time balance of central tendency on any custom numbers:
                </p>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex justify-around font-mono">
                  <span>Dataset: [{dataset.join(', ')}]</span>
                  <span className="text-gold-400 font-bold">Mean: {calculatedStats.mean}</span>
                  <span className="text-purple-400 font-bold">Median: {calculatedStats.median}</span>
                  <span className="text-emerald-400 font-bold">Mode: {calculatedStats.mode}</span>
                </div>
              </div>
            )}

            {sandboxTab === 'probability' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-300">
                  Mass probability testing: Roll 100 dice to observe law of large numbers.
                </p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRollDice(100)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold"
                >
                  Roll 100 Dice Trials
                </motion.button>
                <div className="grid grid-cols-6 gap-2 text-center text-xs font-mono">
                  {diceCounts.map((cnt, i) => (
                    <div key={i} className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                      <div className="text-gold-400 font-bold">Face {i + 1}</div>
                      <div className="text-white mt-1">{cnt}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE (Adaptive & NEP Competencies) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <canvas ref={canvasRef} width={400} height={40} className="w-full rounded-xl" />

          {/* Top Status & Tier Indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-2 py-0.5 text-xs font-black uppercase rounded-md border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : difficulty === 'advanced'
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                    : 'bg-gold-500/20 text-gold-400 border-gold-500/40'
                }`}
              >
                {difficulty} Tier
              </motion.span>
              <span className="px-2 py-0.5 text-xs font-semibold bg-slate-800 text-slate-400 rounded-md">
                NEP Level: {challenge.competencyLevel}
              </span>
            </div>

            <span className="text-xs text-slate-400 font-mono">
              Score: {Math.max(0, 100 - errors * 5)}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div
            className={`p-6 bg-slate-900 rounded-3xl border transition-colors ${
              wrongFlash ? 'bg-rose-950/40 border-rose-500' : 'border-slate-800'
            }`}
          >
            <h3 className="text-lg font-bold text-white mb-4 leading-relaxed">{challenge.question}</h3>

            {/* MCQ Type */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`w-full p-4 rounded-2xl text-left text-sm font-medium transition-all border ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/70 border-slate-700 text-slate-200 hover:bg-slate-800'
                      }`}
                      aria-label={`Option ${String.fromCharCode(65 + i)}`}
                    >
                      <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag-Label Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag Labels:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-600 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow-md"
                      role="button"
                      aria-label={`Draggable label ${item.label}`}
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'box_sss', name: '3 Equal Sides' },
                    { id: 'box_sas', name: '2 Sides + Included ∠' },
                    { id: 'box_asa', name: '2 Angles + Included Side' },
                    { id: 'box_rhs', name: 'Right ∠ + Hypotenuse + Side' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-center min-h-[100px]"
                    >
                      <span className="text-[11px] text-slate-400">{target.name}</span>
                      <div className="mt-2 font-mono font-bold text-sm text-emerald-400">
                        {droppedLabels[target.id] || 'Drop Here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-600/30"
                  aria-label="Validate Dropped Labels"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to arrange in correct chronological sequence:</p>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIndex) => (
                  <motion.div
                    key={displayIndex}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIndex))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIndex);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs font-medium text-slate-200 cursor-grab flex items-center gap-2"
                  >
                    <span className="w-5 h-5 rounded-full bg-gold-900 text-gold-300 flex items-center justify-center font-bold text-[10px]">
                      {displayIndex + 1}
                    </span>
                    {item}
                  </motion.div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-600/30"
                  aria-label="Validate sorted order"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-44"
                    aria-label="Enter numeric answer"
                  />
                  <span className="text-xs text-slate-400 font-semibold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-600/30"
                    aria-label="Submit numeric answer"
                  >
                    Validate
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-gold-300 rounded-lg text-xs font-mono border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-gold-900/60 text-gold-200 border border-gold-700 rounded-lg text-xs font-mono flex items-center gap-1"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-300 ml-1 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 font-mono">Click components above to build formal mathematical proof string.</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-600/30"
                  aria-label="Validate Proof Construction"
                >
                  Verify Construction
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-2xl bg-gold-950/40 border border-gold-800/60 space-y-3"
              >
                <div className="flex items-center gap-2 text-gold-300 font-bold text-xs uppercase tracking-wider">
                  📖 Step-by-Step ICSE Derivation
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
                      className="text-xs text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-gold-400">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-3.5 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-bold"
                  >
                    Show next step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Mastery Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETE (Reflection & Persistence) ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-gold-950/60 rounded-3xl border border-emerald-500/40 text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-black text-white">Curriculum Competency Mastered!</h2>
            <div className="flex justify-center gap-4 text-sm font-mono text-slate-300">
              <span>Final Score: <strong className="text-emerald-400">{Math.max(0, 100 - errors * 5)}%</strong></span>
              <span>•</span>
              <span>Mastery: <strong className="text-gold-400 capitalize">{masteryLevel}</strong></span>
            </div>
            <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
              {errors === 0
                ? 'PERFECT SCORE! You have mastered all Class 7 geometry criteria, ring areas, data analytics, and probability!'
                : errors <= 3
                ? 'Great accomplishment! Your geometric proofs and data interpretations are sharp and board-ready.'
                : 'Good effort! Review the misconception profile below to solidify your understanding before board revision.'}
            </p>
          </div>

          {/* Misconception Review */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-3xl border border-rose-800/50 space-y-3">
              <h3 className="text-sm font-black text-rose-300 uppercase tracking-wider">
                🎯 Targeted Misconception Review
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/80 rounded-xl border border-rose-900/40 text-xs space-y-1">
                    <div className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</div>
                    <div className="text-emerald-300">✓ ICSE Clarification: {m.correction}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Reflection Prompts */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-black text-gold-300 uppercase tracking-wider">
              🤔 Reflect & Consolidate
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>1. Why is equal area insufficient to prove triangle congruence without matching corresponding sides/angles?</li>
              <li>2. When calculating parallelogram area, why must we strictly multiply base by perpendicular height instead of slant side?</li>
              <li>3. In an ungrouped dataset with extreme high outliers, why does the Median give a more typical picture than the Mean?</li>
              <li>4. How does increasing the number of coin or dice trials demonstrate the transition from individual randomness to predictable probability?</li>
            </ul>
          </div>

          {/* Spaced Repetition Schedule */}
          <div className="p-4 bg-amber-950/30 rounded-2xl border border-amber-800/40 flex items-center justify-between text-xs text-slate-300">
            <span>
              📅 Spaced Repetition (SM-2): Review scheduled in{' '}
              <strong className="text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('explore');
                setCurrentSlide(0);
                setErrors(0);
              }}
              className="px-4 py-2 bg-gold-600 text-white rounded-xl font-bold"
            >
              Revisit Labs ↺
            </motion.button>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-gold-400 uppercase">
              🏛️ {REAL_WORLD_ACTIVITY.title}
            </div>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-gold-400 mr-2">{idx + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating Feedback Components */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Stage Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C7_MathematicsExtendCongruenceSimpleSim;
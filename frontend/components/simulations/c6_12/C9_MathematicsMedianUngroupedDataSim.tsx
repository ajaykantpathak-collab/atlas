'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERAL CONSTANTS ───
const NODE_C9_MATH_051 = 'c9_math_051'; // Median of ungrouped data
const NODE_C9_MATH_052 = 'c9_math_052'; // Class intervals, boundaries, limits, frequency
const NODE_C9_MATH_053 = 'c9_math_053'; // Grouped frequency distributions (discontinuous to continuous)
const NODE_C9_MATH_054 = 'c9_math_054'; // Drawing a frequency polygon
const NODE_C9_MATH_055 = 'c9_math_055'; // Area & perimeter of triangle (Heron's formula)
const NODE_C9_MATH_056 = 'c9_math_056'; // Area & perimeter of quadrilaterals
const NODE_C9_MATH_057 = 'c9_math_057'; // Area & circumference of circle (inner/outer area)
const NODE_C9_MATH_058 = 'c9_math_058'; // Surface area and volume of cube
const NODE_C9_MATH_059 = 'c9_math_059'; // Surface area and volume of cuboid
const NODE_C9_MATH_060 = 'c9_math_060'; // Trigonometric ratios (sin, cos, tan and reciprocals)

const ALL_NODE_IDS = [
  NODE_C9_MATH_051,
  NODE_C9_MATH_052,
  NODE_C9_MATH_053,
  NODE_C9_MATH_054,
  NODE_C9_MATH_055,
  NODE_C9_MATH_056,
  NODE_C9_MATH_057,
  NODE_C9_MATH_058,
  NODE_C9_MATH_059,
  NODE_C9_MATH_060,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'The Smart City Architecture & Data Lab',
  intro: 'Welcome, Lead Engineer! You have been commissioned to build a sustainable educational campus in Bengaluru. You must analyze construction survey data, design structural foundations, optimize reservoir volumes, and map access ramps using trigonometry.',
  context: 'Real engineers never rely on blind guessing. You will test raw dataset medians, calibrate class boundary intervals for material tests, compute triangle and quadrilateral park areas, calculate storage tank capacities, and configure ramp angles.',
};

// ─── DISCOVERY QUESTION (Curiosity Hook) ───
const DISCOVERY_QUESTION = {
  question: 'Survey workers measured 6 foundation beam strengths (in MPa): [48, 12, 95, 30, 24, 60]. Without sorting first, one trainee claims the median is (95 + 30)/2 = 62.5 MPa because 95 and 30 sit in the middle of the written list. Is this correct?',
  options: [
    'Yes — the middle items as recorded always give the median',
    'No — median is a positional measure; data MUST be sorted in ascending order first',
    'No — you must always compute the arithmetic mean instead',
    'Yes — sorting is only required when the number of observations is odd',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: In statistics, "middle" only has physical meaning once values are lined up from smallest to largest!',
};

// ─── CHALLENGE INTERFACE (NEP 2020 + CISCE 2026 Standards) ───
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

// ─── 22 COMPREHENSIVE CHALLENGES SPANNING ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  // 1. Median Odd n (Foundation) - c9_math_051
  {
    id: 'ch_math_01',
    nodeId: NODE_C9_MATH_051,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A test lab recorded 7 steel rod stress values: 18, 12, 25, 9, 31, 14, 22. What is the median stress value?',
    correctAnswer: 18,
    tolerance: 0,
    unit: 'MPa',
    explanation: 'Step 1: Arrange in ascending order: 9, 12, 14, 18, 22, 25, 31. Step 2: Here n = 7 (odd). Position = (7 + 1)/2 = 4th position. The 4th value is 18.',
    hints: [
      'First arrange the 7 values from smallest to largest.',
      'For odd n = 7, the median position is (n + 1)/2 = 4th item.',
      'The sorted list is 9, 12, 14, 18, 22, 25, 31. Count to the 4th item.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Median Even n (Foundation) - c9_math_051
  {
    id: 'ch_math_02',
    nodeId: NODE_C9_MATH_051,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Daily rainfall (in mm) over 6 monsoon days in Udupi was recorded as: 40, 15, 80, 25, 60, 30. Calculate the median daily rainfall.',
    correctAnswer: 35,
    tolerance: 0.1,
    unit: 'mm',
    explanation: 'Step 1: Arrange data in ascending order: 15, 25, 30, 40, 60, 80. Step 2: n = 6 (even). The two middle positions are n/2 = 3rd and (n/2 + 1) = 4th. Step 3: 3rd value is 30, 4th value is 40. Median = (30 + 40)/2 = 35 mm.',
    hints: [
      'Sort the 6 numbers in ascending order first.',
      'For even n = 6, find the average of the 3rd and 4th sorted values.',
      'The 3rd and 4th sorted values are 30 and 40. Average them: (30 + 40)/2.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Outlier Resistance (Standard) - c9_math_051
  {
    id: 'ch_math_03',
    nodeId: NODE_C9_MATH_051,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Salaries in an architectural firm are: ₹25k, ₹28k, ₹30k, ₹32k, ₹35k, and the CEO earns ₹9,50,000. Why is the median a superior representative measure of central tendency compared to the arithmetic mean for this dataset?',
    options: [
      'The median takes all values into account equally through division',
      'The median is a positional average resistant to extreme outliers, whereas the mean is heavily skewed upwards by the CEO salary',
      'The median is always higher than the mean for income datasets',
      'The mean cannot be computed when values exceed ₹1,00,000',
    ],
    correctIndex: 1,
    explanation: 'The extreme outlier (₹9,50,000) inflates the arithmetic mean far above what ordinary employees earn. The median represents the true middle ground because it depends strictly on rank position rather than magnitude.',
    hints: [
      'Look at how the single massive CEO salary alters the sum vs the middle position.',
      'The mean is sensitive to extreme values; the median is unaffected by magnitude extremes.',
      'Positional averages reflect the typical employee much better when extreme outliers exist.',
    ],
    misconceptionIndex: 3,
  },
  // 4. Class Limits vs Class Boundaries (Foundation) - c9_math_052
  {
    id: 'ch_math_04',
    nodeId: NODE_C9_MATH_052,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'For the inclusive class interval 30–39, identify the true class boundaries and class size (width).',
    options: [
      'Boundaries: 30 to 39; Class size = 9',
      'Boundaries: 29.5 to 39.5; Class size = 10',
      'Boundaries: 30.5 to 38.5; Class size = 8',
      'Boundaries: 29.0 to 40.0; Class size = 11',
    ],
    correctIndex: 1,
    explanation: 'To convert discrete class limits 30–39 into continuous class boundaries, subtract 0.5 from the lower limit and add 0.5 to the upper limit: (30 - 0.5) to (39 + 0.5) = 29.5 to 39.5. Class size = 39.5 - 29.5 = 10.',
    hints: [
      'Subtract half the gap (0.5) from the lower limit and add 0.5 to the upper limit.',
      '30 - 0.5 = 29.5, and 39 + 0.5 = 39.5.',
      'Class size is the true continuous width: 39.5 - 29.5 = 10.',
    ],
    misconceptionIndex: 0,
  },
  // 5. Drag-label: Anatomy of Grouped Interval (Foundation) - c9_math_052
  {
    id: 'ch_math_05',
    nodeId: NODE_C9_MATH_052,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each statistical term to its correct value for the class interval 20–29 (where next class is 30–39).',
    dragItems: [
      { label: 'Lower Boundary (19.5)', targetId: 'target_lb' },
      { label: 'Upper Boundary (29.5)', targetId: 'target_ub' },
      { label: 'Class Mark (24.5)', targetId: 'target_cm' },
      { label: 'Class Size (10)', targetId: 'target_cs' },
    ],
    correctMapping: {
      target_lb: 'Lower Boundary (19.5)',
      target_ub: 'Upper Boundary (29.5)',
      target_cm: 'Class Mark (24.5)',
      target_cs: 'Class Size (10)',
    },
    explanation: 'For 20–29: Lower Boundary = 20 - 0.5 = 19.5; Upper Boundary = 29 + 0.5 = 29.5; Class Mark = (20 + 29)/2 = 24.5; Class Size = 29.5 - 19.5 = 10.',
    hints: [
      'Lower boundary is 20 - 0.5.',
      'Upper boundary is 29 + 0.5.',
      'Class mark is midpoint: (20 + 29)/2 = 24.5. Class size is 10.',
    ],
  },
  // 6. Converting Discontinuous Distribution (Standard) - c9_math_053
  {
    id: 'ch_math_06',
    nodeId: NODE_C9_MATH_053,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A surveyor records student weights as: 40–44 kg, 45–49 kg, 50–54 kg. Where does a measured weight of exactly 44.5 kg belong after proper conversion to continuous class boundaries?',
    options: [
      'It is omitted because it falls inside the gap between 44 and 45',
      'In the class boundary interval 44.5–49.5 kg (conventionally included in the continuous upper bracket)',
      'In the class boundary interval 39.5–44.5 kg (inclusive of upper boundary)',
      'Either interval arbitrarily',
    ],
    correctIndex: 1,
    explanation: 'The gap is 45 - 44 = 1; correction factor is 0.5. The continuous classes are 39.5–44.5, 44.5–49.5, 49.5–54.5. Under standard ICSE statistical convention, 44.5 is the lower boundary of the 44.5–49.5 interval.',
    hints: [
      'Compute the continuous boundaries using correction factor 0.5.',
      'The classes become 39.5–44.5, 44.5–49.5, 54.5–59.5.',
      'In continuous distributions [a, b), the value a is placed in the interval beginning at a.',
    ],
    misconceptionIndex: 0,
  },
  // 7. Drag-sort: Frequency Polygon Construction Steps (Standard) - c9_math_054
  {
    id: 'ch_math_07',
    nodeId: NODE_C9_MATH_054,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of steps required to construct a completely closed Frequency Polygon.',
    sortItems: [
      'Calculate the class mark (midpoint) of each given class interval',
      'Identify two adjacent empty intervals (one before first, one after last) with frequency 0',
      'Plot points (Class Mark, Frequency) on graph paper with consistent axis scales',
      'Join consecutive plotted points with straight line segments using a ruler',
      'Extend lines to the midpoints of the two adjacent empty intervals to anchor the polygon on the x-axis',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'You first calculate class marks, include the two anchor zero-frequency midpoints, plot all coordinates, join them sequentially with straight lines, and anchor both ends to the x-axis.',
    hints: [
      'Always find class midpoints before plotting.',
      'Anchor intervals with frequency zero are essential for closing the polygon.',
      'Connect points in order with straight line segments and anchor to the x-axis.',
    ],
  },
  // 8. Frequency Polygon Skewness & Peak (Advanced) - c9_math_054
  {
    id: 'ch_math_08',
    nodeId: NODE_C9_MATH_054,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'On a frequency polygon of student test scores, the peak occurs at class mark 45 (interval 40–50), and the line tapers off with a much longer trailing tail towards score 95 than towards 0. What does this indicate?',
    options: [
      'The distribution is symmetric and marks are normally distributed',
      'The distribution is positively skewed (skewed to the right), with the modal class at 40–50 and fewer students achieving top scores',
      'The distribution is negatively skewed (skewed to the left)',
      'The class intervals were constructed with unequal widths',
    ],
    correctIndex: 1,
    explanation: 'A peak at a lower value with a long rightward tail indicates positive skew (right skew). The highest peak represents the modal class (40–50 marks).',
    hints: [
      'Identify where the highest peak sits: this is the modal class.',
      'A longer tail stretching towards higher values (right) means right-skewed.',
      'Right-skewed distributions have most mass clustered at lower values with an extended upper tail.',
    ],
  },
  // 9. Triangle Heron\'s Formula (Standard) - c9_math_055
  {
    id: 'ch_math_09',
    nodeId: NODE_C9_MATH_055,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A triangular park has boundary sides a = 13 m, b = 14 m, c = 15 m. Compute the exact surface area of the park using Heron\'s formula.',
    correctAnswer: 84,
    tolerance: 0.1,
    unit: 'm²',
    explanation: 'Step 1: Semi-perimeter s = (13 + 14 + 15)/2 = 42/2 = 21 m. Step 2: s - a = 8, s - b = 7, s - c = 6. Step 3: Area = √(21 × 8 × 7 × 6) = √(7056) = 84 m².',
    hints: [
      'First compute the semi-perimeter s = (13 + 14 + 15)/2 = 21.',
      'Calculate (s - a) = 8, (s - b) = 7, (s - c) = 6.',
      'Area = √(21 × 8 × 7 × 6) = √7056 = 84 m².',
    ],
    misconceptionIndex: 1,
  },
  // 10. Triangle Fencing vs Turfing Cost (Standard) - c9_math_055
  {
    id: 'ch_math_10',
    nodeId: NODE_C9_MATH_055,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For the same triangular park with sides 13 m, 14 m, 15 m (Perimeter = 42 m), decorative perimeter fencing costs ₹50 per linear metre. What is the total fencing cost?',
    correctAnswer: 2100,
    tolerance: 0,
    unit: '₹',
    explanation: 'Fencing is a boundary operation requiring linear perimeter: Total Cost = Perimeter × Rate = 42 m × ₹50/m = ₹2,100.',
    hints: [
      'Perimeter is a boundary length: P = a + b + c = 13 + 14 + 15 = 42 m.',
      'Multiply the total perimeter by the fencing rate per metre.',
      '42 × 50 = ₹2,100.',
    ],
    misconceptionIndex: 2,
  },
  // 11. Parallelogram: Perpendicular Height vs Slant Side (Foundation) - c9_math_056
  {
    id: 'ch_math_11',
    nodeId: NODE_C9_MATH_056,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A solar panel frame is shaped as a parallelogram with base = 18 cm, adjacent slanting side = 12 cm, and perpendicular height between bases = 10 cm. What is its surface area?',
    options: [
      '216 cm² (18 × 12)',
      '180 cm² (18 × 10)',
      '120 cm² (12 × 10)',
      '90 cm² (1/2 × 18 × 10)',
    ],
    correctIndex: 1,
    explanation: 'Area of a parallelogram = base × perpendicular height = 18 cm × 10 cm = 180 cm². The slanting side (12 cm) is used only to compute perimeter, never area!',
    hints: [
      'Parallelogram area requires the perpendicular height, not the slant side.',
      'Formula is A = base × height.',
      '18 × 10 = 180 cm².',
    ],
    misconceptionIndex: 0,
  },
  // 12. Rhombus Diagonals Area (Standard) - c9_math_056
  {
    id: 'ch_math_12',
    nodeId: NODE_C9_MATH_056,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A courtyard paved with rhombus-shaped tiles has tile diagonals measuring d₁ = 16 cm and d₂ = 12 cm. Find the area of one tile.',
    correctAnswer: 96,
    tolerance: 0.1,
    unit: 'cm²',
    explanation: 'Area of a rhombus with diagonals d₁ and d₂ is A = (1/2) × d₁ × d₂ = (1/2) × 16 × 12 = 96 cm².',
    hints: [
      'The diagonals of a rhombus intersect at 90° and form 4 congruent right triangles.',
      'The formula is A = (1/2) × d₁ × d₂.',
      '(1/2) × 16 × 12 = 96 cm².',
    ],
    misconceptionIndex: 0,
  },
  // 13. Trapezium Embankment Cross-section (Standard) - c9_math_056
  {
    id: 'ch_math_13',
    nodeId: NODE_C9_MATH_056,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A canal embankment cross-section is a trapezium with parallel sides a = 14 m, b = 8 m, and perpendicular depth h = 5 m. What is its cross-sectional area?',
    correctAnswer: 55,
    tolerance: 0.1,
    unit: 'm²',
    explanation: 'Area of a trapezium = (1/2) × (a + b) × h = (1/2) × (14 + 8) × 5 = (1/2) × 22 × 5 = 55 m².',
    hints: [
      'Add the two parallel widths first: (14 + 8) = 22 m.',
      'Multiply by half of the height: (1/2) × 22 × 5.',
      '11 × 5 = 55 m².',
    ],
  },
  // 14. Concentric Circle / Circular Ring Path Area (Standard) - c9_math_057
  {
    id: 'ch_math_14',
    nodeId: NODE_C9_MATH_057,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A circular garden of radius r = 14 m has a walking path of uniform width 7 m around its exterior. Using π = 22/7, find the surface area of the walking path.',
    correctAnswer: 770,
    tolerance: 1,
    unit: 'm²',
    explanation: 'Outer radius R = inner radius + width = 14 + 7 = 21 m. Inner radius r = 14 m. Area of path = π(R² - r²) = (22/7) × (21² - 14²) = (22/7) × (441 - 196) = (22/7) × 245 = 22 × 35 = 770 m².',
    hints: [
      'Outer radius R = 14 + 7 = 21 m.',
      'Path Area = π(R² - r²) = π(21² - 14²).',
      '(22/7) × (441 - 196) = (22/7) × 245 = 770 m².',
    ],
    misconceptionIndex: 2,
  },
  // 15. Circumference to Area Two-Step (Standard) - c9_math_057
  {
    id: 'ch_math_15',
    nodeId: NODE_C9_MATH_057,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A circular fountain has a circumference of 88 m. Using π = 22/7, calculate the area enclosed by the fountain.',
    correctAnswer: 616,
    tolerance: 0.5,
    unit: 'm²',
    explanation: 'Step 1: C = 2πr ⇒ 88 = 2 × (22/7) × r ⇒ r = (88 × 7)/44 = 14 m. Step 2: Area = πr² = (22/7) × 14 × 14 = 22 × 2 × 14 = 616 m².',
    hints: [
      'First solve for radius r from C = 2πr: r = 88 / (2 × 22/7) = 14 m.',
      'Next apply Area = πr² with r = 14.',
      '(22/7) × 14² = 616 m².',
    ],
  },
  // 16. Open-top Cube Surface Area (Foundation) - c9_math_058
  {
    id: 'ch_math_16',
    nodeId: NODE_C9_MATH_058,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A metal planter box in the shape of a cube of side a = 2 m is open at the top. Find the outer surface area to be painted.',
    correctAnswer: 20,
    tolerance: 0.1,
    unit: 'm²',
    explanation: 'An open-top cube has only 5 outer faces (4 vertical walls + 1 base). Surface Area = 5a² = 5 × (2)² = 5 × 4 = 20 m².',
    hints: [
      'The box has no lid, so count 5 faces instead of 6.',
      'Area of each square face = 2 × 2 = 4 m².',
      'Total outer area = 5 × 4 = 20 m².',
    ],
    misconceptionIndex: 0,
  },
  // 17. Cube Volume & Capacity Conversion (Standard) - c9_math_058
  {
    id: 'ch_math_17',
    nodeId: NODE_C9_MATH_058,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A water storage tank is a cube with interior edge length 1.5 m. How many litres of water does it hold when full? (1 m³ = 1000 litres)',
    correctAnswer: 3375,
    tolerance: 0.5,
    unit: 'litres',
    explanation: 'Volume = a³ = (1.5)³ = 3.375 m³. Converting to litres: 3.375 × 1000 = 3375 litres.',
    hints: [
      'Calculate volume in cubic metres: 1.5 × 1.5 × 1.5 = 3.375 m³.',
      'Multiply by 1000 to convert m³ to litres.',
      '3.375 × 1000 = 3375 litres.',
    ],
    misconceptionIndex: 2,
  },
  // 18. Cuboid Open Tank Internal Dimensions & Capacity (Advanced) - c9_math_059
  {
    id: 'ch_math_18',
    nodeId: NODE_C9_MATH_059,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A wooden cistern open at the top has external dimensions: Length = 22 cm, Breadth = 12 cm, Height = 11 cm. The wood thickness is 1 cm on all sides and bottom. Calculate the internal liquid capacity in cm³.',
    correctAnswer: 2000,
    tolerance: 1,
    unit: 'cm³',
    explanation: 'Internal Length = 22 - 2(1) = 20 cm; Internal Breadth = 12 - 2(1) = 10 cm; Internal Height = 11 - 1(1) = 10 cm (open top, so thickness subtracted once from height). Internal Volume = 20 × 10 × 10 = 2000 cm³.',
    hints: [
      'Length and Breadth have walls on both sides: subtract 2t = 2 cm.',
      'The tank is open at the top, so only the bottom base adds thickness: subtract 1t = 1 cm from height.',
      'Internal dimensions = 20 cm × 10 cm × 10 cm. Volume = 2000 cm³.',
    ],
    misconceptionIndex: 1,
  },
  // 19. Cuboid 4 Walls Painting Cost (Standard) - c9_math_059
  {
    id: 'ch_math_19',
    nodeId: NODE_C9_MATH_059,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A classroom is 8 m long, 6 m wide, and 3 m high. The four walls are to be painted at ₹20 per m² (doors/windows ignored). What is the total painting cost?',
    correctAnswer: 1680,
    tolerance: 1,
    unit: '₹',
    explanation: 'Area of 4 walls = Lateral Surface Area = 2h(l + b) = 2(3)(8 + 6) = 6 × 14 = 84 m². Cost = 84 × ₹20 = ₹1,680.',
    hints: [
      'Painting four walls uses LSA = 2h(l + b).',
      'Area = 2 × 3 × (8 + 6) = 6 × 14 = 84 m².',
      'Cost = 84 × 20 = ₹1,680.',
    ],
  },
  // 20. Trigonometric Ratios: Side Identification (Foundation) - c9_math_060
  {
    id: 'ch_math_20',
    nodeId: NODE_C9_MATH_060,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In a right triangle with acute angle θ, opposite side = 5 cm, adjacent side = 12 cm, and hypotenuse = 13 cm. What are the values of sin θ and sec θ?',
    options: [
      'sin θ = 5/13, sec θ = 13/12',
      'sin θ = 12/13, sec θ = 13/5',
      'sin θ = 5/12, sec θ = 12/13',
      'sin θ = 13/5, sec θ = 12/5',
    ],
    correctIndex: 0,
    explanation: 'sin θ = Opposite/Hypotenuse = 5/13. sec θ = 1/cos θ = Hypotenuse/Adjacent = 13/12.',
    hints: [
      'Recall: sin θ = opposite / hypotenuse.',
      'sec θ is the reciprocal of cos θ: sec θ = hypotenuse / adjacent.',
      'Opposite = 5, Adjacent = 12, Hypotenuse = 13.',
    ],
    misconceptionIndex: 1,
  },
  // 21. Trigonometry: Pythagoras to Cotangent (Standard) - c9_math_060
  {
    id: 'ch_math_21',
    nodeId: NODE_C9_MATH_060,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a right-angled triangle ABC (∠B = 90°), side AB (adjacent to ∠A) = 9 cm and hypotenuse AC = 15 cm. Find cot A.',
    options: [
      'cot A = 3/4',
      'cot A = 4/3',
      'cot A = 5/3',
      'cot A = 4/5',
    ],
    correctIndex: 0,
    explanation: 'By Pythagoras theorem: BC = √(15² - 9²) = √(225 - 81) = √144 = 12 cm (opposite to ∠A). cot A = Adjacent/Opposite = AB/BC = 9/12 = 3/4.',
    hints: [
      'Find the opposite side BC using Pythagoras: BC² = AC² - AB².',
      'BC = √(225 - 81) = 12 cm.',
      'cot A = adjacent / opposite = 9/12 = 3/4.',
    ],
  },
  // 22. Construct: Formula Assembly (Advanced) - c9_math_060
  {
    id: 'ch_math_22',
    nodeId: NODE_C9_MATH_060,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the fundamental identity relating tan θ, sin θ, and cos θ by picking the correct components.',
    availableParts: ['tan θ', '=', 'sin θ', '/', 'cos θ', '+', 'cot θ', '1'],
    targetState: 'tan θ = sin θ / cos θ',
    validationHint: 'Build the quotient identity: tan θ = sin θ / cos θ',
    explanation: 'tan θ = (Opposite/Hypotenuse) / (Adjacent/Hypotenuse) = sin θ / cos θ.',
    hints: [
      'tan θ equals the quotient of sine and cosine.',
      'Select: tan θ, =, sin θ, /, cos θ in order.',
      'Target: tan θ = sin θ / cos θ.',
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
  nodeId: NODE_C9_MATH_051,
  title: 'ICSE Mathematics Mastery: Statistics, Mensuration & Trigonometry',
  definition: 'Comprehensive mensuration, statistical computation, and trigonometric foundation for Class 9 ICSE.',
  eli5: 'Think of math as your toolkit: line up numbers to find the true middle, build 2D shapes and 3D boxes with exact formulas, and use triangle ramps to scale heights!',
  misconceptions: [
    {
      misconception: 'Median can be read directly from raw data in the order written.',
      correction: 'Data MUST be arranged in ascending or descending order first; median is a positional measure of sorted ranks.',
    },
    {
      misconception: 'For even n, median is just the n/2-th value.',
      correction: 'When n is even, median is the arithmetic mean of the two middle values at positions n/2 and (n/2 + 1).',
    },
    {
      misconception: 'Every cube or cuboid uses 6 faces for surface area calculations.',
      correction: 'An open-top box has only 5 faces; a hollow pipe has 4 faces. Always count the actual faces present.',
    },
    {
      misconception: 'Area of a circular path of width w is πw² or π(R - r)²',
      correction: 'Path area is the difference of disc areas: πR² - πr² = π(R² - r²).',
    },
    {
      misconception: 'sec θ is the reciprocal of sin θ because of the prefix "co".',
      correction: 'Sine pairs with Cosecant (cosec θ = 1/sin θ) and Cosine pairs with Secant (sec θ = 1/cos θ).',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is the median of: 11, 3, 9, 5, 7?',
      options: ['9', '7', '5', '11'],
      correctIndex: 1,
    },
    {
      question: 'For class interval 20–29, what is the lower class boundary?',
      options: ['20', '19.5', '20.5', '19'],
      correctIndex: 1,
    },
    {
      question: 'Heron\'s formula for triangle area with semi-perimeter s is:',
      options: ['√(s(s-a)(s-b)(s-c))', 's(s-a)(s-b)(s-c)', '1/2 × s × (a+b+c)', '√(s + a + b + c)'],
      correctIndex: 0,
    },
    {
      question: 'Area of a rhombus with diagonals d₁ and d₂ is:',
      options: ['d₁ × d₂', '1/2 × d₁ × d₂', '2(d₁ + d₂)', '(d₁ + d₂)/2'],
      correctIndex: 1,
    },
    {
      question: 'Area of a ring between concentric circles of radii R and r is:',
      options: ['π(R - r)²', 'π(R² - r²)', '2π(R - r)', 'πR² + πr²'],
      correctIndex: 1,
    },
    {
      question: 'The total surface area of an open-top cube of edge a is:',
      options: ['6a²', '5a²', '4a²', 'a³'],
      correctIndex: 1,
    },
    {
      question: 'The volume of a cuboid of dimensions l, b, h is:',
      options: ['2(lb + bh + lh)', 'l + b + h', 'l × b × h', '2h(l + b)'],
      correctIndex: 2,
    },
    {
      question: 'In a right triangle, cot θ is defined as:',
      options: ['Opposite / Adjacent', 'Adjacent / Opposite', 'Hypotenuse / Opposite', 'Adjacent / Hypotenuse'],
      correctIndex: 1,
    },
  ],
  masteryCriteria: 'Mastery of ungrouped medians, frequency tables, polygon plotting, triangle/quadrilateral/circle mensuration, solid geometry, and foundational trigonometric ratios.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (Learn by Doing) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Median Sorter & Outlier Shield',
    instruction: 'Drag data points to sort them in ascending order. Observe how extreme values do not shift the center position!',
    interactionType: 'sort-median',
    nodeId: NODE_C9_MATH_051,
  },
  {
    title: 'Lab 2: Continuous Class Boundary Generator',
    instruction: 'Adjust the class interval limits. Watch how the correction factor 0.5 eliminates the gaps between consecutive intervals.',
    interactionType: 'slider-boundary',
    nodeId: NODE_C9_MATH_052,
  },
  {
    title: 'Lab 3: Heron\'s Dynamic Triangle Area Modeler',
    instruction: 'Move triangle side sliders. Watch the semi-perimeter and Heron area compute in real-time.',
    interactionType: 'triangle-heron',
    nodeId: NODE_C9_MATH_055,
  },
  {
    title: 'Lab 4: Concentric Circle Reservoir & Ring Path',
    instruction: 'Adjust inner radius and path width. Compare total disc area, inner garden area, and the ring path area.',
    interactionType: 'circle-ring',
    nodeId: NODE_C9_MATH_057,
  },
  {
    title: 'Lab 5: Interactive Trigonometric Ramp Simulator',
    instruction: 'Adjust the ramp angle θ. Observe how sin θ, cos θ, and tan θ change as the opposite and adjacent sides morph.',
    interactionType: 'trig-ramp',
    nodeId: NODE_C9_MATH_060,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an extreme outlier (e.g., 500) is added to the sorted dataset [2, 4, 6, 8, 10], what happens to the median versus the arithmetic mean?',
    options: [
      'Both mean and median increase by identical amounts',
      'The mean skyrockets dramatically, while the median shifts only slightly to the next position',
      'The median becomes undefined',
      'The mean stays constant while the median skyrockets',
    ],
    correctIndex: 1,
    verifyInstruction: 'Try moving the outlier slider in the simulation below to verify your prediction in real-time!',
    nodeId: NODE_C9_MATH_051,
  },
  {
    question: 'Predict: If you double the side length of a cube from 2 m to 4 m, how many times larger does its volume become?',
    options: [
      '2 times larger',
      '4 times larger',
      '8 times larger (2³ = 8)',
      '6 times larger',
    ],
    correctIndex: 2,
    verifyInstruction: 'Adjust the cube edge slider from 2 to 4 to see volume scale from 8 m³ to 64 m³!',
    nodeId: NODE_C9_MATH_058,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the ratio of Opposite side to Hypotenuse (sin θ) as ramp angle θ increases from 10° to 80°?',
    observableOptions: [
      'sin θ steadily increases towards 1 as the opposite side height grows',
      'sin θ decreases towards 0',
      'sin θ remains constant at 0.5',
      'sin θ becomes negative',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_MATH_060,
  },
  {
    question: 'What pattern occurs in the class boundaries when converting discontinuous intervals 10–19, 20–29?',
    observableOptions: [
      'The upper boundary of interval 1 (19.5) becomes identical to the lower boundary of interval 2 (19.5), eliminating the gap',
      'A new gap of 2 units is created',
      'The frequencies double',
      'All values become whole numbers',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_MATH_053,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Campus Master Planner Project',
  description: 'Apply your mathematical mensuration and statistical tools to design an eco-friendly sports complex on your school grounds.',
  steps: [
    'Measure 7 different sprint times of classmates and calculate the true median performance.',
    'Plan a circular fountain with an outer paved pedestrian ring: compute concrete volume and tiling cost.',
    'Design an accessible wheelchair ramp with an angle θ ≤ 15° using tan θ to determine necessary ground run.',
    'Submit your complete architectural mensuration blueprint to your teacher or peer.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN COMPONENT ───
export function C9_MathematicsMedianUngroupedDataSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['mathematics'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // ─── 35+ RICH STATE HOOKS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints & progressive disclosure
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Discovery & Predict-then-check states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Misconceptions tracker
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Interactive Lab & Sandbox Variables
  const [medianRawList, setMedianRawList] = useState<number[]>([42, 18, 95, 30, 24]);
  const [medianSorted, setMedianSorted] = useState(false);
  const [outlierValue, setOutlierValue] = useState(100);

  // Lab 2 (Boundaries)
  const [lowerLimit, setLowerLimit] = useState(20);
  const [upperLimit, setUpperLimit] = useState(29);
  const [correctionGap, setCorrectionGap] = useState(1);

  // Lab 3 (Heron Triangle)
  const [triSideA, setTriSideA] = useState(13);
  const [triSideB, setTriSideB] = useState(14);
  const [triSideC, setTriSideC] = useState(15);

  // Lab 4 (Circle & Ring)
  const [innerRadius, setInnerRadius] = useState(14);
  const [pathWidth, setPathWidth] = useState(7);

  // Lab 5 (Trig Ramp)
  const [rampAngle, setRampAngle] = useState(30);
  const [rampHypotenuse, setRampHypotenuse] = useState(10);

  // Solid Box Sandbox (Cube / Cuboid)
  const [boxLength, setBoxLength] = useState(5);
  const [boxBreadth, setBoxBreadth] = useState(4);
  const [boxHeight, setBoxHeight] = useState(3);
  const [isOpenTop, setIsOpenTop] = useState(false);

  // Challenge drag & construct states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT EFFECT: LOAD PERSISTED MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY ADAPTATION EFFECT ───
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

  // ─── 2D CANVAS ANIMATION EFFECT ───
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

      // Draw subtle animated grid background
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw sine wave oscillation representing continuous data & harmonic geometry
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x + frame * 2) * 0.03) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentSlide]);

  // ─── EVENT HANDLERS ───

  // 1. Inactivity auto-hint timer reset
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        const nextHint = activeChallenge.hints[0];
        if (nextHint) {
          setCurrentHint(nextHint);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak('Need a clue? Here is a hint.');
        }
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, activeChallenge]);

  // 2. Escalating Hint Trigger
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      setCurrentHint(activeChallenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      setShowHint(false);
      speechManager.speak('Let us inspect the full step-by-step mathematical working.');
    }
  }, [hintCount, activeChallenge]);

  // 3. Discovery Answer Handler
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'error');
    speechManager.speak(
      isCorrect
        ? 'Spot on! Data must always be ordered first.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  // 4. Advance from Discovery to Explore
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive labs. Explore each concept by doing.');
  }, []);

  // 5. Advance to Sandbox
  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Here is your free play laboratory. Experiment freely with zero pressure!');
  }, []);

  // 6. Advance to Challenge Phase
  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the competency challenges. Do your best!');
  }, []);

  // 7. Predict-then-Check Handler
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Now manipulate the simulation below to verify.');
  }, []);

  // 8. Observation Handler
  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent observation!' : 'Look closer at how the values adjust.');
  }, []);

  // 9. Drag Start Handler
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  // 10. Drag Drop Handler
  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, activeChallenge]
  );

  // 11. Drag Sort Reordering
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length > 0 ? prev : (activeChallenge.sortItems?.map((_, i) => i) || []);
      const updated = [...base];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  }, [activeChallenge]);

  // 12. Sort Submit
  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0
        ? sortArrangement
        : activeChallenge.sortItems?.map((_, i) => i) || [];
    const isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('success');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('error');
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      setErrors(e => e + 1);
      showNextHint();
    }
  }, [sortArrangement, activeChallenge, showNextHint]);

  // 13. Completion Handler
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Magnificent effort! You have completed the mathematics simulation.');
  }, [errors, onComplete]);

  // 14. Next Challenge Reset & Advancement
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

  // 15. Master Answer Evaluator
  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (
        activeChallenge.type === 'classify' ||
        activeChallenge.type === 'distinguish' ||
        activeChallenge.type === 'match'
      ) {
        isCorrect = answer === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = answer === activeChallenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct working! Fantastic.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors(e => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (
          activeChallenge.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(activeChallenge.misconceptionIndex)
        ) {
          setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Hints exhausted. Let us review the correct steps.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  // ─── DERIVED REAL-TIME MATH VALUES ───
  const triSemiPerimeter = useMemo(() => (triSideA + triSideB + triSideC) / 2, [triSideA, triSideB, triSideC]);
  const triHeronArea = useMemo(() => {
    const s = triSemiPerimeter;
    const diffProduct = s * (s - triSideA) * (s - triSideB) * (s - triSideC);
    return diffProduct > 0 ? Math.sqrt(diffProduct) : 0;
  }, [triSemiPerimeter, triSideA, triSideB, triSideC]);

  const outerRadiusComputed = useMemo(() => innerRadius + pathWidth, [innerRadius, pathWidth]);
  const innerCircleArea = useMemo(() => (22 / 7) * innerRadius * innerRadius, [innerRadius]);
  const ringPathArea = useMemo(
    () => (22 / 7) * (outerRadiusComputed * outerRadiusComputed - innerRadius * innerRadius),
    [innerRadius, outerRadiusComputed]
  );

  const rampOpposite = useMemo(() => rampHypotenuse * Math.sin((rampAngle * Math.PI) / 180), [rampAngle, rampHypotenuse]);
  const rampAdjacent = useMemo(() => rampHypotenuse * Math.cos((rampAngle * Math.PI) / 180), [rampAngle, rampHypotenuse]);
  const trigSin = useMemo(() => Math.sin((rampAngle * Math.PI) / 180), [rampAngle]);
  const trigCos = useMemo(() => Math.cos((rampAngle * Math.PI) / 180), [rampAngle]);
  const trigTan = useMemo(() => Math.tan((rampAngle * Math.PI) / 180), [rampAngle]);

  const boxVolume = useMemo(() => boxLength * boxBreadth * boxHeight, [boxLength, boxBreadth, boxHeight]);
  const boxSurfaceArea = useMemo(() => {
    if (isOpenTop) {
      return boxLength * boxBreadth + 2 * boxHeight * (boxLength + boxBreadth);
    }
    return 2 * (boxLength * boxBreadth + boxBreadth * boxHeight + boxLength * boxHeight);
  }, [boxLength, boxBreadth, boxHeight, isOpenTop]);

  // Clean-up on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 border border-gold-700/50 rounded-2xl" role="img" aria-label="Mathematics Icon">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-semibold tracking-wider text-gold-400 uppercase">
              ICSE Class 9 Mathematics • Core Mensuration & Statistics
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Dynamic difficulty badge */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-600'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-600'
                : 'bg-gold-950/60 text-gold-400 border-gold-600'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="text-right">
            <p className="text-xs text-slate-400">Mastery Level</p>
            <p className="text-xs font-bold text-gold-300 uppercase">{masteryLevel}</p>
          </div>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-6 space-y-6"
        >
          {/* Narrative Scenario Box */}
          <div className="p-6 bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-950 rounded-2xl border border-gold-700/40">
            <h2 className="text-xl font-bold text-gold-200 flex items-center gap-2">
              <span>🏗️</span> {SCENARIO.title}
            </h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300/80 mt-3 italic">{SCENARIO.context}</p>
          </div>

          {/* Low-stakes Discovery Question */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
              <span>⚡</span> Curiosity Discovery Challenge
            </div>
            <p className="text-base text-slate-100 font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm transition-all border flex items-start justify-between gap-2 ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-amber-950/80 border-amber-500 text-amber-200'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                  }`}
                >
                  <div>
                    <span className="font-bold text-gold-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </div>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                    <span className="text-emerald-400 font-black text-base flex-shrink-0" aria-hidden="true">✓</span>
                  )}
                  {discoveryAnswered && !discoveryCorrect && i !== DISCOVERY_QUESTION.correctIndex && (
                    <span className="text-rose-400 font-black text-base flex-shrink-0" aria-hidden="true">✗</span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 rounded-xl bg-slate-950 border border-slate-700 space-y-3"
              >
                <p className={`text-sm flex items-center gap-2 ${discoveryCorrect ? 'text-emerald-400 font-medium' : 'text-amber-400'}`}>
                  <span>{discoveryCorrect ? '✓' : '✗'}</span>
                  <span>
                    {discoveryCorrect
                      ? 'Spot on! Data must ALWAYS be ordered first to compute positional averages.'
                      : DISCOVERY_QUESTION.hintAfter}
                  </span>
                </p>
                <motion.button
                  aria-label="Enter Hands-on Learning Labs"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-gold-600/30"
                >
                  Enter Hands-on Learning Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. INTERACTIVE EXPLORATION PHASE (Learn by Doing) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Progress stepper */}
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-semibold text-gold-400 tracking-wider uppercase">
              Interactive Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5" aria-hidden="true">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-6 bg-gold-500' : 'w-2 bg-slate-800'
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
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
            >
              <div>
                <h3 className="text-lg font-bold text-gold-300">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-amber-300 text-sm mt-1">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── STEP 0: Median Sorter & Outlier Visualizer ─── */}
              {currentSlide === 0 && (
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-slate-400">Raw Survey Values (Click to arrange in ascending order):</p>
                    <motion.button
                      aria-label={medianSorted ? 'Reset Unsorted List' : 'Sort Ascending Order'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setMedianSorted(s => !s);
                        audioManager.play('pop');
                      }}
                      className="px-4 py-1.5 bg-gold-600/80 hover:bg-gold-600 text-xs font-bold text-white rounded-lg"
                    >
                      {medianSorted ? 'Reset Unsorted List' : 'Sort Ascending ➔'}
                    </motion.button>
                  </div>

                  {/* Visual data tiles */}
                  <div className="flex flex-wrap items-center gap-3 justify-center py-4">
                    {(medianSorted ? [...medianRawList].sort((a, b) => a - b) : medianRawList).map((val, idx) => {
                      const isMiddle = medianSorted && idx === 2;
                      return (
                        <motion.div
                          key={idx}
                          layout
                          className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-lg border transition-all ${
                            isMiddle
                              ? 'bg-emerald-950 border-emerald-400 text-emerald-300 ring-2 ring-emerald-500/50 scale-110'
                              : 'bg-slate-800 border-slate-700 text-slate-200'
                          }`}
                        >
                          <span>{val}</span>
                          <span className="text-[10px] text-slate-400 font-sans">
                            {medianSorted ? `pos ${idx + 1}` : 'raw'}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Interactive Outlier Addition */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <label htmlFor="outlierRange" className="text-xs text-slate-400">Add Outlier Value:</label>
                      <span className="font-bold text-gold-300">{outlierValue}</span>
                    </div>
                    <input
                      id="outlierRange"
                      aria-label="Outlier Value Slider"
                      type="range"
                      min={100}
                      max={1000}
                      step={50}
                      value={outlierValue}
                      onChange={e => setOutlierValue(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                    <div className="flex justify-between text-xs pt-2 text-slate-300">
                      <span>
                        Median with Outlier: <strong className="text-emerald-400">30.0</strong> (Unchanged)
                      </span>
                      <span>
                        Mean with Outlier:{' '}
                        <strong className="text-rose-400">
                          {((medianRawList.reduce((a, b) => a + b, 0) + outlierValue) / 6).toFixed(1)}
                        </strong>{' '}
                        (Heavily Distorted)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STEP 1: Continuous Class Boundary Generator ─── */}
              {currentSlide === 1 && (
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="lowerLimitRange" className="text-xs text-slate-400">Lower Class Limit: {lowerLimit}</label>
                      <input
                        id="lowerLimitRange"
                        aria-label="Lower Class Limit Slider"
                        type="range"
                        min={10}
                        max={50}
                        step={5}
                        value={lowerLimit}
                        onChange={e => setLowerLimit(Number(e.target.value))}
                        className="w-full accent-gold-500 mt-1"
                      />
                    </div>
                    <div>
                      <label htmlFor="upperLimitRange" className="text-xs text-slate-400">Upper Class Limit: {upperLimit}</label>
                      <input
                        id="upperLimitRange"
                        aria-label="Upper Class Limit Slider"
                        type="range"
                        min={lowerLimit + 5}
                        max={lowerLimit + 25}
                        value={upperLimit}
                        onChange={e => setUpperLimit(Number(e.target.value))}
                        className="w-full accent-gold-500 mt-1"
                      />
                    </div>
                  </div>

                  {/* Visual Interval Comparison SVG */}
                  <svg viewBox="0 0 600 160" className="w-full bg-slate-900 rounded-xl p-2" aria-label="Class limits and boundary interval diagram">
                    <text x="30" y="30" fill="#94a3b8" fontSize="12" fontWeight="bold">
                      Discrete Inclusive Limits (Gap Exists):
                    </text>
                    <rect x="60" y="45" width="200" height="30" rx="4" fill="#334155" stroke="#475569" />
                    <text x="160" y="65" textAnchor="middle" fill="#cbd5e1" fontSize="12">
                      {lowerLimit} – {upperLimit}
                    </text>
                    <rect x="280" y="45" width="200" height="30" rx="4" fill="#334155" stroke="#475569" />
                    <text x="380" y="65" textAnchor="middle" fill="#cbd5e1" fontSize="12">
                      {upperLimit + 1} – {upperLimit + 10}
                    </text>
                    <text x="270" y="65" textAnchor="middle" fill="#f87171" fontSize="10">
                      gap=1
                    </text>

                    <text x="30" y="105" fill="#34d399" fontSize="12" fontWeight="bold">
                      True Continuous Boundaries (0.5 Adjustment):
                    </text>
                    <rect x="50" y="115" width="220" height="30" rx="4" fill="#065f46" stroke="#059669" />
                    <text x="160" y="135" textAnchor="middle" fill="#a7f3d0" fontSize="12">
                      {lowerLimit - 0.5} – {upperLimit + 0.5}
                    </text>
                    <rect x="270" y="115" width="220" height="30" rx="4" fill="#065f46" stroke="#059669" />
                    <text x="380" y="135" textAnchor="middle" fill="#a7f3d0" fontSize="12">
                      {upperLimit + 0.5} – {upperLimit + 10.5}
                    </text>
                  </svg>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400">Lower Boundary:</span>
                      <p className="text-emerald-400 font-bold mt-0.5">{lowerLimit - 0.5}</p>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400">Class Mark (Midpoint):</span>
                      <p className="text-gold-400 font-bold mt-0.5">{((lowerLimit + upperLimit) / 2).toFixed(1)}</p>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400">Upper Boundary:</span>
                      <p className="text-emerald-400 font-bold mt-0.5">{upperLimit + 0.5}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STEP 2: Heron\'s Dynamic Triangle Area ─── */}
              {currentSlide === 2 && (
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label htmlFor="sideARange" className="text-xs text-slate-400">Side a: {triSideA} m</label>
                      <input
                        id="sideARange"
                        aria-label="Triangle Side a Slider"
                        type="range"
                        min={5}
                        max={25}
                        value={triSideA}
                        onChange={e => setTriSideA(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="sideBRange" className="text-xs text-slate-400">Side b: {triSideB} m</label>
                      <input
                        id="sideBRange"
                        aria-label="Triangle Side b Slider"
                        type="range"
                        min={5}
                        max={25}
                        value={triSideB}
                        onChange={e => setTriSideB(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="sideCRange" className="text-xs text-slate-400">Side c: {triSideC} m</label>
                      <input
                        id="sideCRange"
                        aria-label="Triangle Side c Slider"
                        type="range"
                        min={5}
                        max={25}
                        value={triSideC}
                        onChange={e => setTriSideC(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                  </div>

                  {/* Dynamic SVG Triangle Rendering */}
                  <div className="flex justify-center p-2 bg-slate-900 rounded-xl">
                    <svg viewBox="0 0 320 180" className="w-full max-w-sm" aria-label="Dynamic triangle diagram for Heron formula">
                      <polygon
                        points="60,150 260,150 160,30"
                        fill="rgba(99, 102, 241, 0.2)"
                        stroke="#818cf8"
                        strokeWidth="3"
                      />
                      <text x="160" y="165" textAnchor="middle" fill="#cbd5e1" fontSize="11 font-bold">
                        c = {triSideC} m
                      </text>
                      <text x="90" y="85" textAnchor="middle" fill="#cbd5e1" fontSize="11 font-bold">
                        a = {triSideA} m
                      </text>
                      <text x="230" y="85" textAnchor="middle" fill="#cbd5e1" fontSize="11 font-bold">
                        b = {triSideB} m
                      </text>
                      <circle cx="160" cy="110" r="4" fill="#34d399" />
                      <text x="160" y="125" textAnchor="middle" fill="#34d399" fontSize="10 font-bold">
                        Heron Area: {triHeronArea.toFixed(1)} m²
                      </text>
                    </svg>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl text-xs space-y-1 text-slate-300">
                    <p>
                      <strong>Semi-perimeter (s):</strong> ({triSideA} + {triSideB} + {triSideC})/2 ={' '}
                      <span className="text-gold-400 font-bold">{triSemiPerimeter} m</span>
                    </p>
                    <p>
                      <strong>Heron Formula:</strong> Area = √[s(s-a)(s-b)(s-c)] = √[{triSemiPerimeter} × (
                      {triSemiPerimeter - triSideA}) × ({triSemiPerimeter - triSideB}) × (
                      {triSemiPerimeter - triSideC})] ={' '}
                      <span className="text-emerald-400 font-bold">{triHeronArea.toFixed(2)} m²</span>
                    </p>
                  </div>
                </div>
              )}

              {/* ─── STEP 3: Concentric Circle Reservoir & Ring Path ─── */}
              {currentSlide === 3 && (
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="innerRadRange" className="text-xs text-slate-400">Inner Radius (r): {innerRadius} m</label>
                      <input
                        id="innerRadRange"
                        aria-label="Inner Circle Radius Slider"
                        type="range"
                        min={7}
                        max={35}
                        step={7}
                        value={innerRadius}
                        onChange={e => setInnerRadius(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="pathWidthRange" className="text-xs text-slate-400">Path Width (w): {pathWidth} m</label>
                      <input
                        id="pathWidthRange"
                        aria-label="Path Width Slider"
                        type="range"
                        min={3.5}
                        max={14}
                        step={3.5}
                        value={pathWidth}
                        onChange={e => setPathWidth(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                  </div>

                  {/* Concentric Circle SVG */}
                  <div className="flex justify-center p-2 bg-slate-900 rounded-xl">
                    <svg viewBox="0 0 300 220" className="w-full max-w-xs" aria-label="Concentric circle diagram">
                      <circle cx="150" cy="110" r={Math.min(95, innerRadius + pathWidth * 2.5)} fill="#047857" opacity="0.6" />
                      <circle cx="150" cy="110" r={Math.min(65, innerRadius * 1.8)} fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                      <line x1="150" y1="110" x2={150 + Math.min(65, innerRadius * 1.8)} y2="110" stroke="#38bdf8" strokeWidth="2" />
                      <text x="175" y="105" fill="#38bdf8" fontSize="10">
                        r={innerRadius}m
                      </text>
                      <text x="150" y="115" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
                        Garden
                      </text>
                      <text x="150" y="30" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                        Ring Path Area = {ringPathArea.toFixed(1)} m²
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400">Inner Garden Area (πr²):</span>
                      <p className="text-gold-400 font-bold mt-0.5">{innerCircleArea.toFixed(1)} m²</p>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400">Ring Path Area π(R² - r²):</span>
                      <p className="text-emerald-400 font-bold mt-0.5">{ringPathArea.toFixed(1)} m²</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STEP 4: Interactive Trig Ramp Simulator ─── */}
              {currentSlide === 4 && (
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <div>
                    <label htmlFor="rampAngleRange" className="text-xs text-slate-400">Ramp Incline Angle (θ): {rampAngle}°</label>
                    <input
                      id="rampAngleRange"
                      aria-label="Ramp Incline Angle Slider"
                      type="range"
                      min={10}
                      max={75}
                      step={5}
                      value={rampAngle}
                      onChange={e => setRampAngle(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>

                  {/* Trig Ramp SVG */}
                  <div className="flex justify-center p-2 bg-slate-900 rounded-xl">
                    <svg viewBox="0 0 340 180" className="w-full max-w-sm" aria-label="Right triangle trigonometry ramp model">
                      <line x1="40" y1="140" x2="280" y2="140" stroke="#94a3b8" strokeWidth="3" />
                      <line
                        x1="280"
                        y1="140"
                        x2="280"
                        y2={140 - Math.sin((rampAngle * Math.PI) / 180) * 110}
                        stroke="#f43f5e"
                        strokeWidth="3"
                      />
                      <line
                        x1="40"
                        y1="140"
                        x2="280"
                        y2={140 - Math.sin((rampAngle * Math.PI) / 180) * 110}
                        stroke="#6366f1"
                        strokeWidth="3"
                      />
                      <text x="80" y="132" fill="#fbbf24" fontSize="12" fontWeight="bold">
                        θ = {rampAngle}°
                      </text>
                      <text x="300" y="90" fill="#f43f5e" fontSize="11" fontWeight="bold">
                        Opp: {rampOpposite.toFixed(1)}
                      </text>
                      <text x="160" y="155" fill="#94a3b8" fontSize="11" fontWeight="bold">
                        Adj: {rampAdjacent.toFixed(1)}
                      </text>
                      <text x="140" y="65" fill="#818cf8" fontSize="11" fontWeight="bold">
                        Hyp = {rampHypotenuse}
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400">sin θ (Opp/Hyp):</span>
                      <p className="text-rose-400 font-bold mt-0.5">{trigSin.toFixed(3)}</p>
                    </div>
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400">cos θ (Adj/Hyp):</span>
                      <p className="text-gold-400 font-bold mt-0.5">{trigCos.toFixed(3)}</p>
                    </div>
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400">tan θ (Opp/Adj):</span>
                      <p className="text-emerald-400 font-bold mt-0.5">{trigTan.toFixed(3)}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Stepper Navigation Buttons */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              aria-label="Previous Lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 disabled:opacity-40 text-slate-200 text-sm font-bold rounded-xl"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-sm font-bold rounded-xl"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Go to Free Sandbox"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Go to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX PHASE (Zero-Pressure Exploration) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-r from-slate-900 to-gold-950/60 rounded-2xl border border-gold-800/40">
            <h3 className="text-lg font-bold text-gold-300">🛠️ Solid Geometry & Capacity Sandbox</h3>
            <p className="text-xs text-slate-300 mt-1">
              Test how length, breadth, height, and open/closed face configurations impact Total Surface Area vs Volume.
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="boxLengthRange" className="text-xs text-slate-400">Length (l): {boxLength} m</label>
                <input
                  id="boxLengthRange"
                  aria-label="Box Length Slider"
                  type="range"
                  min={1}
                  max={12}
                  value={boxLength}
                  onChange={e => setBoxLength(Number(e.target.value))}
                  className="w-full accent-gold-500 mt-1"
                />
              </div>
              <div>
                <label htmlFor="boxBreadthRange" className="text-xs text-slate-400">Breadth (b): {boxBreadth} m</label>
                <input
                  id="boxBreadthRange"
                  aria-label="Box Breadth Slider"
                  type="range"
                  min={1}
                  max={12}
                  value={boxBreadth}
                  onChange={e => setBoxBreadth(Number(e.target.value))}
                  className="w-full accent-gold-500 mt-1"
                />
              </div>
              <div>
                <label htmlFor="boxHeightRange" className="text-xs text-slate-400">Height (h): {boxHeight} m</label>
                <input
                  id="boxHeightRange"
                  aria-label="Box Height Slider"
                  type="range"
                  min={1}
                  max={12}
                  value={boxHeight}
                  onChange={e => setBoxHeight(Number(e.target.value))}
                  className="w-full accent-gold-500 mt-1"
                />
              </div>
            </div>

            {/* Open Top Toggle */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="openTopCheck"
                aria-label="Open Top Configuration Toggle"
                checked={isOpenTop}
                onChange={e => setIsOpenTop(e.target.checked)}
                className="w-4 h-4 accent-gold-500 rounded"
              />
              <label htmlFor="openTopCheck" className="text-sm font-semibold text-slate-200">
                Open Top Configuration (5 faces painted instead of 6)
              </label>
            </div>

            {/* Calculated Values Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Surface Area:</span>
                <p className="text-xl font-black text-gold-400 mt-1">{boxSurfaceArea} m²</p>
                <span className="text-[10px] text-slate-500">
                  {isOpenTop ? '5 faces: lb + 2h(l+b)' : '6 faces: 2(lb + bh + lh)'}
                </span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Solid Volume:</span>
                <p className="text-xl font-black text-emerald-400 mt-1">{boxVolume} m³</p>
                <span className="text-[10px] text-slate-500">Formula: l × b × h</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Water Capacity:</span>
                <p className="text-xl font-black text-gold-400 mt-1">{boxVolume * 1000} Litres</p>
                <span className="text-[10px] text-slate-500">Conversion: 1 m³ = 1000 L</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <motion.button
              aria-label="Ready for Challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-8 py-3 bg-gold-600 hover:bg-gold-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-gold-600/30"
            >
              Ready for Challenges! ➔
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Header Animation Canvas & Progress Tracker */}
          <canvas ref={canvasRef} width={600} height={28} className="w-full rounded-lg" aria-hidden="true" />

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-gold-400 font-semibold uppercase">
                Competency: {activeChallenge.competencyLevel}
              </span>
            </div>
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden" aria-label={`Progress: Challenge ${currentChallenge + 1} of ${filteredChallenges.length}`}>
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-400"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Active Question Card */}
          <motion.div
            key={activeChallenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-base md:text-lg font-bold text-slate-100 leading-snug">
                {activeChallenge.question}
              </h2>
            </div>

            {/* MCQ Options */}
            {(activeChallenge.type === 'classify' ||
              activeChallenge.type === 'distinguish' ||
              activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="space-y-2.5 pt-2">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-4 rounded-xl text-sm transition-all border flex items-start justify-between gap-2 ${
                        wrongFlash
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-gold-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </div>
                      {showExplanation && i === activeChallenge.correctIndex && (
                        <span className="text-emerald-400 font-black text-base flex-shrink-0" aria-hidden="true">✓ Correct</span>
                      )}
                      {wrongFlash && (
                        <span className="text-rose-400 font-black text-base flex-shrink-0" aria-hidden="true">✗ Try again</span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag-Label Option */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg text-xs font-bold text-white cursor-grab"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {['target_lb', 'target_ub', 'target_cm', 'target_cs'].map(tId => (
                    <div
                      key={tId}
                      role="region"
                      aria-label={`Drop target for ${tId}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(tId)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[70px]"
                    >
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                        {tId === 'target_lb'
                          ? 'Lower Boundary Slot'
                          : tId === 'target_ub'
                          ? 'Upper Boundary Slot'
                          : tId === 'target_cm'
                          ? 'Class Mark Slot'
                          : 'Class Size Slot'}
                      </span>
                      <span className="text-xs font-bold text-emerald-400">
                        {droppedLabels[tId] ? `✓ ${droppedLabels[tId]}` : 'Drop Label Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Labels"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold text-sm rounded-xl"
                >
                  Verify Labels ➔
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Option */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3 pt-2">
                {(sortArrangement.length === activeChallenge.sortItems.length
                  ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                  : activeChallenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Step ${displayIdx + 1}: ${item}. Drag to reorder.`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-800 rounded-xl text-slate-200 text-xs md:text-sm flex items-center gap-3 cursor-grab border border-slate-700"
                  >
                    <span className="w-6 h-6 rounded-full bg-gold-900 text-gold-300 flex items-center justify-center font-bold text-xs">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Verify Step Order"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold text-sm rounded-xl mt-2"
                >
                  Verify Step Order ➔
                </motion.button>
              </div>
            )}

            {/* Numeric Input Option */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    aria-label={`Enter numerical answer in ${activeChallenge.unit || 'units'}`}
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-64 focus:outline-none focus:border-gold-500"
                  />
                  <span className="text-slate-400 font-bold text-sm">{activeChallenge.unit}</span>
                  <motion.button
                    aria-label="Check numeric answer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl"
                  >
                    Check Answer ➔
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge Option */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add token: ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-800 hover:bg-gold-700 text-xs font-mono font-bold text-white rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap items-center gap-2" aria-label="Formula Construction Canvas">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-2.5 py-1 bg-gold-600 text-white font-mono text-xs font-bold rounded flex items-center gap-1"
                    >
                      {part}
                      <button
                        aria-label={`Remove token ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-300 hover:text-white font-bold ml-1"
                      >
                        ×
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click the formula tokens above to assemble...</span>
                  )}
                </div>

                <motion.button
                  aria-label="Check Formula Assembly"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold text-sm rounded-xl"
                >
                  Check Formula Assembly ➔
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-5 bg-gold-950/40 border border-gold-700/50 rounded-2xl space-y-3"
              >
                <h4 className="text-sm font-bold text-gold-300 flex items-center gap-2">
                  <span>📖</span> Step-by-Step Mathematical Explanation:
                </h4>
                {activeChallenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-slate-200 text-xs md:text-sm leading-relaxed"
                    >
                      <strong className="text-gold-400 font-mono mr-1.5">{idx + 1}.</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {revealedSteps <
                    activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      aria-label="Show Next Working Step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-gold-800/80 hover:bg-gold-700 text-xs font-bold text-white rounded-lg"
                    >
                      Show Next Working Step ➔
                    </motion.button>
                  )}

                  {revealedSteps >=
                    activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finish Simulation' : 'Next Challenge'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finish Simulation ➔'
                        : 'Next Challenge ➔'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & MASTERY SUMMARY PHASE ─── */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 space-y-6"
        >
          <div className="p-8 bg-gradient-to-br from-gold-950/80 via-slate-900 to-slate-950 rounded-3xl border border-gold-700/50 text-center space-y-4">
            <span className="text-5xl" role="img" aria-label="Trophy">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Simulation Completed!</h2>
            <p className="text-slate-300 text-sm max-w-lg mx-auto">
              You have thoroughly explored and applied the mathematics of ungrouped statistics, class boundaries,
              quadrilateral/triangle geometry, circular rings, 3D solid mensuration, and foundational trigonometry!
            </p>
            <div className="flex justify-center gap-6 pt-2">
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-400">Final Score</p>
                <p className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-400">Mastery Tier</p>
                <p className="text-2xl font-black text-gold-400 uppercase">{masteryLevel}</p>
              </div>
            </div>
          </div>

          {/* Motivational Feedback Banner based on exact error count */}
          <div className="p-5 bg-gold-950/40 border border-gold-700/50 rounded-2xl text-center space-y-1">
            <h3 className="text-xl font-extrabold text-gold-200">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors >= 1 && errors <= 3
                ? 'Great work!'
                : errors >= 4 && errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </h3>
            <p className="text-slate-300 text-xs md:text-sm">
              {errors === 0
                ? '✓ Exceptional precision! You solved all mensuration and statistics challenges without a single error.'
                : errors <= 3
                ? '✓ Solid mathematical reasoning displayed across statistics, geometry, and trigonometry.'
                : errors <= 7
                ? '✓ You made great progress through difficult ICSE Class 9 problems. Keep practicing to build speed!'
                : '✓ Every mistake is an opportunity to learn. Review the steps below and tackle the simulation again!'}
            </p>
          </div>

          {/* Misconception Gaps Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 border border-rose-800/40 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Specific Conceptual Misconceptions Identified:
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-bold">✗ {m.misconception}</p>
                    <p className="text-emerald-400 font-medium">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition SRS Notification */}
          <div className="p-5 bg-amber-950/30 border border-amber-800/40 rounded-2xl space-y-1">
            <h3 className="text-sm font-bold text-amber-300">📅 Spaced Repetition Schedule (SM-2)</h3>
            <p className="text-xs text-slate-300">
              Based on your score, this topic is queued for review in{' '}
              <strong className="text-amber-300 font-bold">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </strong>
              . Consistent review locks formulas and procedures into permanent long-term memory!
            </p>
          </div>

          {/* Real-World Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-gold-300">📐 {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-bold text-gold-400">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── GLOBAL FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_MathematicsMedianUngroupedDataSim;
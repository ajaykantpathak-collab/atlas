'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C9_MATH_061 = 'c9_math_061'; // Standard angles 0, 30, 45, 60, 90
const NODE_C9_MATH_062 = 'c9_math_062'; // Simple 2-D right triangle problems
const NODE_C9_MATH_063 = 'c9_math_063'; // Complementary angle ratios
const NODE_C9_MATH_064 = 'c9_math_064'; // Dependent & independent variables
const NODE_C9_MATH_065 = 'c9_math_065'; // Ordered pairs & Cartesian plane
const NODE_C9_MATH_066 = 'c9_math_066'; // Simultaneous linear equations graphical
const NODE_C9_MATH_067 = 'c9_math_067'; // Distance formula
const ALL_NODE_IDS = [
  NODE_C9_MATH_061,
  NODE_C9_MATH_062,
  NODE_C9_MATH_063,
  NODE_C9_MATH_064,
  NODE_C9_MATH_065,
  NODE_C9_MATH_066,
  NODE_C9_MATH_067,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'Surveyor in the City: Delhi Metro Extension',
  intro: 'You are the chief civil engineer survey lead for a new Delhi Metro aerial track. You need to calculate cable lengths, ramp elevations, pillar positions on Cartesian grid maps, track intersections, and distances between station beacons without tape measures—using pure Trigonometry and Coordinate Geometry!',
  context: 'Use special 30°-45°-60° standard triangles, complementary view angles, coordinate axes (x, y), linear tracking lines, and the distance formula to complete the survey flawlessly.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'A 10-meter ladder leans against a metro pillar at an angle of 60° to the ground. Without measuring, how high up the pillar does it reach?',
  options: [
    '5 meters (half the ladder)',
    '5√3 meters ≈ 8.66 meters (using sin 60°)',
    '10√3 meters ≈ 17.32 meters',
    '8 meters exactly',
  ],
  correctIndex: 1,
  hintAfter: 'Don\'t worry if you were unsure! Trigonometric ratios link angles directly to side lengths without direct measurement. Let us explore how!',
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

// ─── COMPREHENSIVE CHALLENGES ARRAY (21 CHALLENGES) ───
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION TIER (1 to 7) ──
  {
    id: 'ch_f01',
    nodeId: NODE_C9_MATH_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the exact value of sin 30° and cos 60° in standard right triangles?',
    options: ['1/2 and 1/2', '√3/2 and 1/2', '1/√2 and 1/√2', '1/2 and √3/2'],
    correctIndex: 0,
    explanation: 'Both sin 30° and cos 60° equal 1/2. In an equilateral triangle cut in half, the side opposite 30° is 1 and the hypotenuse is 2.',
    hints: [
      'Think of splitting an equilateral triangle of side 2 with a vertical altitude.',
      'The side opposite to the 30° angle is 1 unit, and the hypotenuse is 2 units.',
      'sin 30° = opposite/hypotenuse = 1/2. By symmetry cos 60° = 1/2 as well.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_f02',
    nodeId: NODE_C9_MATH_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is tan 90° mathematically undefined?',
    options: [
      'Because the angle is too large to fit inside a triangle',
      'Because tan 90° = sin 90° / cos 90° = 1 / 0, and division by zero is undefined',
      'Because tan 90° equals infinity, which is a number',
      'Because tan 90° equals 0',
    ],
    correctIndex: 1,
    explanation: 'tan θ = sin θ / cos θ. At 90°, the adjacent side shrinks to 0 (cos 90° = 0). Division by 0 is undefined in mathematics.',
    hints: [
      'Recall that tan θ = sin θ / cos θ = opposite / adjacent.',
      'What happens to the adjacent side (horizontal leg) when the angle becomes 90° vertical?',
      'cos 90° = 0, so tan 90° = 1/0, which is undefined (not a finite number).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_f03',
    nodeId: NODE_C9_MATH_064,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A train travels at 60 km/h: Distance = 60 × Time. Which variable is independent and on which axis is it plotted?',
    options: [
      'Time is independent (x-axis); Distance is dependent (y-axis)',
      'Distance is independent (x-axis); Time is dependent (y-axis)',
      'Both are independent variables',
      'Time is dependent (y-axis); Speed is independent (x-axis)',
    ],
    correctIndex: 0,
    explanation: 'Time is the variable we choose/control (input = independent, x-axis). The distance covered is determined by the time chosen (output = dependent, y-axis).',
    hints: [
      'Ask yourself: which value do you decide first (how long to travel, or the distance)?',
      'Input/chosen quantity is independent and placed horizontally on the x-axis.',
      'Time is chosen (independent, x-axis) and distance responds (dependent, y-axis).',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_f04',
    nodeId: NODE_C9_MATH_065,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which quadrant does the ordered pair P(-4, 7) lie in?',
    options: ['Quadrant I (+, +)', 'Quadrant II (-, +)', 'Quadrant III (-, -)', 'Quadrant IV (+, -)'],
    correctIndex: 1,
    explanation: 'In (-4, 7), the abscissa (x) is negative and the ordinate (y) is positive. Moving left and up places the point in Quadrant II.',
    hints: [
      'Look at the signs of x and y: x is negative (-), y is positive (+).',
      'Quadrant I is (+,+), Quadrant II is (-,+), Quadrant III is (-,-), Quadrant IV is (+,-).',
      'Negative x (left) and positive y (up) belongs to Quadrant II.',
    ],
  },
  {
    id: 'ch_f05',
    nodeId: NODE_C9_MATH_065,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct coordinate labels onto the Cartesian axes and key points.',
    dragItems: [
      { label: 'Origin (0,0)', targetId: 'target_origin' },
      { label: 'X-Axis Point (4,0)', targetId: 'target_xaxis' },
      { label: 'Y-Axis Point (0,3)', targetId: 'target_yaxis' },
      { label: 'Quadrant II (-3,2)', targetId: 'target_q2' },
    ],
    correctMapping: {
      target_origin: 'Origin (0,0)',
      target_xaxis: 'X-Axis Point (4,0)',
      target_yaxis: 'Y-Axis Point (0,3)',
      target_q2: 'Quadrant II (-3,2)',
    },
    explanation: 'The origin is (0,0). A point on the x-axis has y=0 (4,0); a point on the y-axis has x=0 (0,3); and (-3,2) has negative x and positive y in Q II.',
    hints: [
      'The intersection of the axes is the Origin (0,0).',
      'Points with 0 in the second slot (ordinate) lie on the horizontal X-axis.',
      'Points with 0 in the first slot (abscissa) lie on the vertical Y-axis.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_f06',
    nodeId: NODE_C9_MATH_067,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Calculate the straight-line distance from the origin (0, 0) to the point (3, 4).',
    correctAnswer: 5,
    tolerance: 0.1,
    unit: 'units',
    explanation: 'Distance d = √(x² + y²) = √(3² + 4²) = √(9 + 16) = √25 = 5 units. (Classical 3-4-5 right triangle).',
    hints: [
      'Use the distance formula from origin: d = √(x² + y²).',
      'Compute 3² + 4² = 9 + 16 = 25.',
      'The square root of 25 is 5.',
    ],
  },
  {
    id: 'ch_f07',
    nodeId: NODE_C9_MATH_063,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is the correct complementary angle identity for sin θ?',
    options: ['sin θ = cos (90° - θ)', 'sin θ = cos (90° + θ)', 'sin θ = tan (90° - θ)', 'sin θ = 1 / cos θ'],
    correctIndex: 0,
    explanation: 'In a right triangle with acute angle θ, the other angle is (90° - θ). The side opposite to θ is adjacent to (90° - θ), so sin θ = cos (90° - θ).',
    hints: [
      'The two acute angles in a right-angled triangle always add up to 90° (complementary).',
      'The prefix "co-" stands for complementary: cosine is the complementary sine.',
      'Thus sin θ = cos (90° - θ).',
    ],
  },

  // ── STANDARD TIER (8 to 14) ──
  {
    id: 'ch_s08',
    nodeId: NODE_C9_MATH_062,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A straight access ramp in Noida rises to a height of 3 m with an angle of inclination of 30° with the ground. Find the length of the ramp in meters.',
    correctAnswer: 6,
    tolerance: 0.1,
    unit: 'm',
    explanation: 'sin 30° = opposite / hypotenuse = 3 / ramp length. Since sin 30° = 1/2, ramp length = 3 / (1/2) = 6 meters.',
    hints: [
      'Draw the right triangle: height = opposite side = 3 m, ramp = hypotenuse.',
      'Which trigonometric ratio links opposite side and hypotenuse? (sin).',
      'sin 30° = 3 / L => 1/2 = 3 / L => L = 6 m.',
    ],
  },
  {
    id: 'ch_s09',
    nodeId: NODE_C9_MATH_063,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Evaluate without trigonometric tables: tan 1° × tan 2° × tan 3° × ... × tan 89°.',
    options: ['0', '1', '89', 'Undefined'],
    correctIndex: 1,
    explanation: 'Pair symmetric terms: tan 1° × tan 89° = tan 1° × cot 1° = 1. All 44 pairs equal 1, and the middle lone term tan 45° = 1. Total product = 1.',
    hints: [
      'Group terms from opposite ends: tan 1° and tan 89°, tan 2° and tan 88°...',
      'Use the complementary angle identity: tan 89° = cot(90° - 89°) = cot 1° = 1 / tan 1°.',
      'Each pair multiplies to 1, and tan 45° is also 1. So 1 × 1 × ... = 1.',
    ],
  },
  {
    id: 'ch_s10',
    nodeId: NODE_C9_MATH_066,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Solve graphically: Line 1: x + y = 5, Line 2: x - y = 1. What are the coordinates of their point of intersection?',
    options: ['(3, 2)', '(2, 3)', '(4, 1)', '(5, 0)'],
    correctIndex: 0,
    explanation: 'The point (3, 2) lies on both lines: 3 + 2 = 5 (True) and 3 - 2 = 1 (True). This intersection point is the unique simultaneous solution.',
    hints: [
      'Plot line 1 points: (0, 5), (5, 0). Plot line 2 points: (1, 0), (0, -1).',
      'Add the two equations: (x + y) + (x - y) = 5 + 1 => 2x = 6 => x = 3.',
      'Substitute x = 3 into x + y = 5 => y = 2. The intersection is (3, 2).',
    ],
  },
  {
    id: 'ch_s11',
    nodeId: NODE_C9_MATH_067,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the distance between P(-1, -1) and Q(2, 3) in the Cartesian plane.',
    correctAnswer: 5,
    tolerance: 0.1,
    unit: 'units',
    explanation: 'd = √[(2 - (-1))² + (3 - (-1))²] = √[3² + 4²] = √[9 + 16] = √25 = 5 units.',
    hints: [
      'Calculate horizontal difference Δx = 2 - (-1) = 3.',
      'Calculate vertical difference Δy = 3 - (-1) = 4.',
      'd = √(3² + 4²) = √(9 + 16) = √25 = 5.',
    ],
  },
  {
    id: 'ch_s12',
    nodeId: NODE_C9_MATH_066,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Using the coefficient ratio test on 2x + 3y = 6 and 4x + 6y = 18, what type of system is this?',
    options: [
      'Consistent with unique solution (intersecting lines)',
      'Inconsistent with NO solution (parallel lines: a1/a2 = b1/b2 ≠ c1/c2)',
      'Consistent with infinitely many solutions (coincident lines)',
      'Perpendicular lines meeting at origin',
    ],
    correctIndex: 1,
    explanation: 'a1/a2 = 2/4 = 1/2, b1/b2 = 3/6 = 1/2, but c1/c2 = 6/18 = 1/3. Since a1/a2 = b1/b2 ≠ c1/c2, the slopes are identical but y-intercepts differ (parallel lines = no solution).',
    hints: [
      'Compare the ratios of x-coefficients, y-coefficients, and constant terms.',
      '2/4 = 1/2 and 3/6 = 1/2, but 6/18 = 1/3.',
      'When x and y coefficient ratios are equal but different from the constant ratio, lines are parallel.',
    ],
  },
  {
    id: 'ch_s13',
    nodeId: NODE_C9_MATH_061,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the values of sin θ in ascending order as angle θ increases from 0° to 90°.',
    sortItems: ['sin 0° = 0', 'sin 30° = 1/2', 'sin 45° = 1/√2', 'sin 60° = √3/2', 'sin 90° = 1'],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'As θ increases from 0° to 90°, the sine ratio strictly ascends: 0 < 0.5 < 0.707 (1/√2) < 0.866 (√3/2) < 1.0.',
    hints: [
      'At 0°, the opposite side is 0, so sin 0° is the smallest (0).',
      'At 90°, the opposite side equals hypotenuse, so sin 90° is the largest (1).',
      'Values climb steadily: 0, 1/2, 1/√2, √3/2, 1.',
    ],
  },
  {
    id: 'ch_s14',
    nodeId: NODE_C9_MATH_063,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A student claims: "cos 40° + sin 50° = cos 90° = 0". Evaluate this claim.',
    options: [
      'Correct, angles add directly across different functions',
      'Incorrect! You cannot add angles across different trig functions; sin 50° = cos 40°, so the sum is 2 cos 40°',
      'Incorrect, the sum is sin 10°',
      'Correct, because 40° + 50° = 90°',
    ],
    correctIndex: 1,
    explanation: 'Trigonometric functions are non-linear; sin(A) + cos(B) ≠ cos(A+B). By complementary identity, sin 50° = cos(90°-50°) = cos 40°. Thus cos 40° + cos 40° = 2 cos 40°.',
    hints: [
      'Can we add numbers inside trig functions directly? No, f(a) + g(b) ≠ f(a+b).',
      'Convert sin 50° to a cosine ratio first using complementary angles.',
      'sin 50° = cos (90° - 50°) = cos 40°. Now add like terms: cos 40° + cos 40° = 2 cos 40°.',
    ],
    misconceptionIndex: 4,
  },

  // ── ADVANCED TIER (15 to 21) ──
  {
    id: 'ch_a15',
    nodeId: NODE_C9_MATH_067,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Are the three survey beacons A(2, 3), B(4, 5), and C(6, 7) collinear along a single straight track?',
    options: [
      'Yes, because AB = 2√2, BC = 2√2, AC = 4√2, and AB + BC = AC',
      'No, because they form an equilateral triangle',
      'No, because their coordinates are all positive',
      'Yes, because AB = BC = AC',
    ],
    correctIndex: 0,
    explanation: 'Collinearity test: AB = √[(4-2)²+(5-3)²] = √8 = 2√2. BC = √[(6-4)²+(7-5)²] = 2√2. AC = √[(6-2)²+(7-3)²] = √32 = 4√2. Since AB + BC = 2√2 + 2√2 = 4√2 = AC, the points lie on one line.',
    hints: [
      'Compute the three pairwise distances: AB, BC, and AC.',
      'Check if the largest distance equals the sum of the two smaller distances.',
      '2√2 + 2√2 = 4√2, which matches AC. Thus they are collinear.',
    ],
  },
  {
    id: 'ch_a16',
    nodeId: NODE_C9_MATH_061,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Evaluate the expression: 2(sin 30°)² × cos 0° + (tan 45°)² - (cot 30°)². Enter the simplified numerical value (decimal or negative).',
    correctAnswer: -1.5,
    tolerance: 0.05,
    unit: '',
    explanation: '2 × (1/2)² × 1 + (1)² - (√3)² = 2 × (1/4) × 1 + 1 - 3 = 1/2 + 1 - 3 = 1.5 - 3 = -1.5 (-3/2).',
    hints: [
      'Substitute standard values: sin 30° = 1/2, cos 0° = 1, tan 45° = 1, cot 30° = √3.',
      'Calculate term by term: 2 × (1/4) × 1 = 1/2; 1² = 1; (√3)² = 3.',
      '1/2 + 1 - 3 = 1/2 - 2 = -1.5.',
    ],
  },
  {
    id: 'ch_a17',
    nodeId: NODE_C9_MATH_062,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'From the top of a 15 m high metro watchtower, an engineer observes a ground beacon at a 30° angle of depression. What is the horizontal distance from the tower base to the beacon in meters? (Take √3 ≈ 1.732)',
    correctAnswer: 25.98,
    tolerance: 0.5,
    unit: 'm',
    explanation: 'Angle of elevation from beacon = angle of depression from top = 30°. tan 30° = Opposite / Adjacent = 15 / d => 1/√3 = 15 / d => d = 15√3 ≈ 25.98 m.',
    hints: [
      'By alternate angles, angle of depression from top = angle of elevation from beacon = 30°.',
      'In the right triangle, height = opposite = 15 m, ground distance = adjacent = d.',
      'tan 30° = 15 / d => 1/√3 = 15 / d => d = 15 × √3 = 15 × 1.732 ≈ 25.98 m.',
    ],
  },
  {
    id: 'ch_a18',
    nodeId: NODE_C9_MATH_063,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Simplify the board expression: (sin 72° + cos 18°) / (sin 18° + cos 72��).',
    options: ['cot 18° (or tan 72°)', '1', 'tan 18°', '0'],
    correctIndex: 0,
    explanation: 'Since 72° + 18° = 90°, sin 72° = cos 18° and cos 72° = sin 18°. Numerator = cos 18° + cos 18° = 2 cos 18°. Denominator = sin 18° + sin 18° = 2 sin 18°. Ratio = 2 cos 18° / 2 sin 18° = cot 18°.',
    hints: [
      'Identify the complementary angle pair: 72° + 18° = 90°.',
      'Convert terms: sin 72° = cos 18°, cos 72° = sin 18°.',
      'Numerator = 2 cos 18°, Denominator = 2 sin 18°. Ratio = cos 18° / sin 18° = cot 18°.',
    ],
  },
  {
    id: 'ch_a19',
    nodeId: NODE_C9_MATH_066,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the correct algebraic verification equation steps for the system x + y = 7 and 2y - x = 2 whose graphical solution is (4, 3).',
    availableParts: ['x + y = 4 + 3 = 7', '2y - x = 2(3) - 4 = 2', 'x - y = 4 - 3 = 1', 'x = 4, y = 3 satisfies both'],
    targetState: 'x + y = 4 + 3 = 7 2y - x = 2(3) - 4 = 2 x = 4, y = 3 satisfies both',
    validationHint: 'Assemble the 3 true verification statements in order (Equation 1 check, Equation 2 check, and conclusion).',
    explanation: 'Plugging x=4, y=3 into equation 1 gives 4+3=7 (True). Plugging into equation 2 gives 2(3)-4 = 6-4=2 (True). Thus (4,3) satisfies both equations.',
    hints: [
      'Start with verifying Equation 1: 4 + 3 = 7.',
      'Then verify Equation 2: 2(3) - 4 = 2.',
      'Conclude that x=4, y=3 satisfies both lines.',
    ],
  },
  {
    id: 'ch_a20',
    nodeId: NODE_C9_MATH_067,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'The vertices of a survey zone triangle are A(0, 0), B(4, 0), and C(0, 4). Classify this triangle using side lengths.',
    options: [
      'Right-angled Isosceles triangle (AB = AC = 4, BC = 4√2, AB² + AC² = BC²)',
      'Equilateral triangle with all sides equal to 4',
      'Scalene acute triangle',
      'Obtuse isosceles triangle',
    ],
    correctIndex: 0,
    explanation: 'AB = 4, AC = 4, BC = √(4² + 4²) = 4√2. Since two legs are equal (AB = AC = 4) and AB² + AC² = 16 + 16 = 32 = BC², it is a right-angled isosceles triangle.',
    hints: [
      'Calculate length of AB along x-axis from (0,0) to (4,0): 4 units.',
      'Calculate length of AC along y-axis from (0,0) to (0,4): 4 units.',
      'Calculate hypotenuse BC = √(4² + 4²) = √32 = 4√2. Since 4² + 4² = (4√2)², Pythagoras holds.',
    ],
  },
  {
    id: 'ch_a21',
    nodeId: NODE_C9_MATH_064,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In Delhi electricity billing, Total Cost = Rs 200 (fixed meter rent) + Rs 7 × Units. An analyst states "Fixed rent is the independent variable." Evaluate this.',
    options: [
      'Incorrect! Fixed rent is a constant parameter; Units consumed is the independent variable (chosen input) and Total Cost is the dependent variable (output)',
      'Correct, because fixed rent is mentioned first',
      'Incorrect, Total Cost is the independent variable',
      'Correct, all monetary terms are independent',
    ],
    correctIndex: 0,
    explanation: 'The consumer controls how many units of electricity to use (independent variable x). Fixed rent is a constant. Total cost is the output determined by consumption (dependent variable y).',
    hints: [
      'Which quantity does the consumer decide and vary each month?',
      'Constants like fixed meter rent do not change with user decisions.',
      'Units consumed is the independent variable, and total bill cost is the dependent variable.',
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
  nodeId: NODE_C9_MATH_061,
  title: 'Trigonometric Ratios of Standard Angles & Coordinate Geometry',
  definition: 'Trigonometric ratios of standard angles (0°, 30°, 45°, 60°, 90°) provide exact surd values derived from special 30-60-90 and 45-45-90 triangles. Coordinate geometry maps dependent and independent variables on the Cartesian plane, enabling graphical solutions of linear systems and precise distance measurements via the Pythagoras-derived distance formula.',
  eli5: 'Think of standard triangles as magic geometry recipes: at 30°, height is always half the slant length. Coordinate geometry is like a city grid map where two streets cross at a single point (graphical solution) and straight-line distance is just the hypotenuse of steps across and steps up.',
  misconceptions: [
    { misconception: 'sin 30° and cos 60° are different numbers', correction: 'Both equal exactly 1/2 due to complementary symmetry: sin θ = cos(90° - θ).' },
    { misconception: 'tan 90° = infinity, which can be treated as a large number in equations', correction: 'tan 90° is mathematically undefined because cos 90° = 0 and division by zero is undefined.' },
    { misconception: 'Any point with a zero coordinate lies on the x-axis', correction: '(a, 0) lies on the x-axis (y=0), but (0, b) lies on the y-axis (x=0).' },
    { misconception: 'Both variables in a relationship are independent because both vary', correction: 'Only the freely chosen input is independent (x-axis); the resulting value is dependent (y-axis).' },
    { misconception: 'cos 40° + sin 50° = cos 90° = 0', correction: 'Trig functions are non-linear: convert sin 50° to cos 40° first using complementary angles to get 2 cos 40°.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the exact value of tan 45°?', options: ['1/√2', '1', '√3', '0'], correctIndex: 1 },
    { question: 'What is the distance of point (6, 8) from the origin (0, 0)?', options: ['14 units', '10 units', '48 units', '2 units'], correctIndex: 1 },
    { question: 'If sin θ = cos 50°, what is the acute angle θ?', options: ['50°', '40°', '90°', '130°'], correctIndex: 1 },
    { question: 'In the formula y = 4x + 1, which variable is independent?', options: ['y', 'x', '4', '1'], correctIndex: 1 },
    { question: 'What is the intersection point of x + y = 6 and x - y = 2?', options: ['(4, 2)', '(3, 3)', '(5, 1)', '(2, 4)'], correctIndex: 0 },
    { question: 'What is the sign pattern in Quadrant III?', options: ['(+, +)', '(-, +)', '(-, -)', '(+, -)'], correctIndex: 2 },
    { question: 'What is sin 60° × cos 30° + cos 60° × sin 30°?', options: ['0', '1/2', '1', '√3/2'], correctIndex: 2 },
    { question: 'If two linear equations have a1/a2 = b1/b2 ≠ c1/c2, how many solutions exist?', options: ['One unique solution', 'Infinitely many solutions', 'Zero solutions (parallel lines)', 'Two solutions'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student can evaluate exact standard trigonometric expressions, solve 2-D right triangle problems, apply complementary angle rules, plot ordered pairs, solve simultaneous linear systems graphically, and calculate distances on the Cartesian plane.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Standard Angles Right-Triangle Lab',
    instruction: 'Drag the angle slider to 0°, 30°, 45°, 60°, and 90° and watch the opposite leg, adjacent leg, and exact surd ratios update live.',
    interactionType: 'angle-slider',
    nodeId: NODE_C9_MATH_061,
  },
  {
    title: '2-D Height & Distance Metro Surveyor',
    instruction: 'Adjust the distance from the pillar and the angle of elevation to calculate the pillar height in real time without tape measures.',
    interactionType: 'surveyor-sim',
    nodeId: NODE_C9_MATH_062,
  },
  {
    title: 'Complementary Angle Viewpoint Swap',
    instruction: 'Toggle between angle θ and (90° - θ) to see how the opposite and adjacent legs swap places, proving sin θ = cos(90° - θ).',
    interactionType: 'complementary-toggle',
    nodeId: NODE_C9_MATH_063,
  },
  {
    title: 'Simultaneous Equations Dual-Line Plotter',
    instruction: 'Adjust the slopes and intercepts of two track lines on the Cartesian grid to observe their intersection point (x, y) live.',
    interactionType: 'line-intersection-sim',
    nodeId: NODE_C9_MATH_066,
  },
  {
    title: 'Cartesian Distance & Pythagoras Explorer',
    instruction: 'Drag two beacon points P(x₁, y₁) and Q(x₂, y₂) anywhere on the grid to watch the right-angled triangle and distance formula calculate instantly.',
    interactionType: 'distance-drag-sim',
    nodeId: NODE_C9_MATH_067,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you increase the elevation angle θ from 30° to 60° while keeping the hypotenuse fixed at 10 m, what happens to the vertical height (opposite side)?',
    options: [
      'Height increases from 5 m to 5√3 m ≈ 8.66 m',
      'Height decreases from 8.66 m to 5 m',
      'Height remains exactly 5 m',
      'Height becomes 10 m',
    ],
    correctIndex: 0,
    verifyInstruction: 'Drag the angle slider from 30° to 60° on the triangle visualizer and watch the vertical height grow!',
    nodeId: NODE_C9_MATH_061,
  },
  {
    question: 'Predict: Two tracks are given by y = 2x + 1 and y = 2x + 6. What will you observe on the Cartesian grid?',
    options: [
      'The lines are parallel and will NEVER intersect (No solution)',
      'The lines cross at the origin (0, 0)',
      'The lines are identical (Infinitely many solutions)',
      'The lines are perpendicular',
    ],
    correctIndex: 0,
    verifyInstruction: 'Set Line 1 slope = 2, c = 1 and Line 2 slope = 2, c = 6 in the dual-line lab to verify parallel tracks!',
    nodeId: NODE_C9_MATH_066,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about sin θ and cos θ as θ increases from 0° to 90°?',
    observableOptions: [
      'sin θ increases from 0 to 1, while cos θ decreases from 1 to 0 in exact reverse symmetry',
      'Both sin θ and cos θ increase to infinity',
      'sin θ stays at 0.5 while cos θ changes',
      'Both decrease to 0',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_MATH_061,
  },
  {
    question: 'What do you observe when you swap between angle A (35°) and angle B (55°) in the complementary lab?',
    observableOptions: [
      'The opposite leg of A becomes the adjacent leg of B, so sin 35° = cos 55° exactly',
      'The hypotenuse doubles in size',
      'The triangle becomes obtuse',
      'All ratios become undefined',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_MATH_063,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Real-World Metro Track Elevation Challenge',
  description: 'Go to any staircase, outdoor ramp, or tall tree in your neighbourhood. Measure the horizontal distance to its base and use an inclinometer app (or a protractor with a weighted string) to measure the angle of elevation. Apply tan θ = height / distance to calculate the real height without climbing!',
  steps: [
    'Measure horizontal distance d from observer to base (e.g., 10 meters).',
    'Sight the top using a protractor plumb-line to read angle of elevation θ (e.g., 30°).',
    'Calculate height = d × tan θ (e.g., 10 × tan 30° = 10 × 0.577 = 5.77 m + eye height).',
    'Plot the observer at (0, 0) and top of tree at (10, 5.77) on graph paper and verify with distance formula!',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C9_MathematicsTrigonometricRatiosStandardSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // ── PHASE MANAGEMENT ──
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ── BRILLIANT.ORG INTERACTIVE STATE ──
  const [selectedAngle, setSelectedAngle] = useState<number>(30);
  const [hypotenuseLength, setHypotenuseLength] = useState<number>(10);
  const [surveyorDistance, setSurveyorDistance] = useState<number>(15);
  const [surveyorAngle, setSurveyorAngle] = useState<number>(30);
  const [compAngleA, setCompAngleA] = useState<number>(40);
  const [activeCompView, setActiveCompView] = useState<'A' | 'B'>('A');

  // Simultaneous equations state
  const [line1M, setLine1M] = useState<number>(1);
  const [line1C, setLine1C] = useState<number>(2);
  const [line2M, setLine2M] = useState<number>(-1);
  const [line2C, setLine2C] = useState<number>(4);

  // Distance formula state
  const [pointP, setPointP] = useState<{ x: number; y: number }>({ x: 1, y: 2 });
  const [pointQ, setPointQ] = useState<{ x: number; y: number }>({ x: 4, y: 6 });

  // Variable rate state
  const [dataGbInput, setDataGbInput] = useState<number>(3);

  // Prediction & Observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Challenge execution state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Challenge drag / sort / numeric / construct states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual effects
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Sandbox active tool
  const [sandboxTool, setSandboxTool] = useState<'trig' | 'graph' | 'distance' | 'rates'>('trig');

  // Reflection user inputs
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({
    surprising: '',
    friend: '',
    reallife: '',
  });

  // ── REFS ──
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ── FILTERED CHALLENGES BY ADAPTIVE DIFFICULTY ──
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ── MOTIVATIONAL FEEDBACK MESSAGE ──
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return { title: 'PERFECT SCORE! 🏆', desc: 'Flawless precision across all trigonometry and coordinate geometry challenges!' };
    if (errors <= 3) return { title: 'Great work! 🌟', desc: 'Solid mathematical intuition with near-perfect execution.' };
    if (errors <= 7) return { title: 'Good effort! 👍', desc: 'You made steady progress and tackled complex multi-step problems.' };
    return { title: 'Do not give up — You WILL get this! 💪', desc: 'Every mistake is a stepping stone to deep geometric mastery. Review the concepts and try again!' };
  }, [errors]);

  // ── SPACED REPETITION COMPUTATION ──
  const srsDetails = useMemo(() => {
    let days = 1;
    let label = 'High Priority Reinforcement';
    let colorClass = 'text-rose-400 bg-rose-950/70 border-rose-800';
    let progressPct = 35;

    if (errors === 0) {
      days = 7;
      label = 'Mastery Maintained — Optimal Retention';
      colorClass = 'text-emerald-400 bg-emerald-950/70 border-emerald-800';
      progressPct = 100;
    } else if (errors <= 3) {
      days = 3;
      label = 'Solid Foundation — Reinforce Soon';
      colorClass = 'text-gold-400 bg-gold-950/70 border-gold-800';
      progressPct = 70;
    }

    const reviewDate = new Date();
    reviewDate.setDate(reviewDate.getDate() + days);
    const dateFormatted = reviewDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    return { days, label, colorClass, progressPct, dateFormatted };
  }, [errors]);

  // ── CALCULATIONS: TRIG RATIOS LIVE ──
  const trigValues = useMemo(() => {
    const rad = (selectedAngle * Math.PI) / 180;
    const opp = hypotenuseLength * Math.sin(rad);
    const adj = hypotenuseLength * Math.cos(rad);

    let sinSurd = `${(Math.sin(rad)).toFixed(3)}`;
    let cosSurd = `${(Math.cos(rad)).toFixed(3)}`;
    let tanSurd = `${(Math.tan(rad)).toFixed(3)}`;

    if (selectedAngle === 0) { sinSurd = '0'; cosSurd = '1'; tanSurd = '0'; }
    else if (selectedAngle === 30) { sinSurd = '1/2'; cosSurd = '√3/2'; tanSurd = '1/√3'; }
    else if (selectedAngle === 45) { sinSurd = '1/√2'; cosSurd = '1/√2'; tanSurd = '1'; }
    else if (selectedAngle === 60) { sinSurd = '√3/2'; cosSurd = '1/2'; tanSurd = '√3'; }
    else if (selectedAngle === 90) { sinSurd = '1'; cosSurd = '0'; tanSurd = 'Undefined (1/0)'; }

    return { rad, opp, adj, sinSurd, cosSurd, tanSurd };
  }, [selectedAngle, hypotenuseLength]);

  // ── CALCULATIONS: LINE INTERSECTION LIVE ──
  const lineIntersection = useMemo(() => {
    const det = line1M - line2M;
    if (Math.abs(det) < 0.0001) {
      if (Math.abs(line1C - line2C) < 0.0001) {
        return { status: 'coincident', text: 'Coincident Lines (Infinitely Many Solutions)' };
      }
      return { status: 'parallel', text: 'Parallel Lines (No Solution — Inconsistent)' };
    }
    const ix = (line2C - line1C) / (line1M - line2M);
    const iy = line1M * ix + line1C;
    return {
      status: 'unique',
      x: parseFloat(ix.toFixed(2)),
      y: parseFloat(iy.toFixed(2)),
      text: `Unique Intersection: (${ix.toFixed(2)}, ${iy.toFixed(2)})`,
    };
  }, [line1M, line1C, line2M, line2C]);

  // ── CALCULATIONS: DISTANCE FORMULA LIVE ──
  const distanceCalc = useMemo(() => {
    const dx = pointQ.x - pointP.x;
    const dy = pointQ.y - pointP.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return { dx, dy, dist: parseFloat(dist.toFixed(2)) };
  }, [pointP, pointQ]);

  // ── LOAD EXISTING MASTERY ON MOUNT ──
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ── ADAPTIVE DIFFICULTY UPDATE ON MASTERY CHANGE ──
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

  // ── CANVAS 2D ANIMATION EFFECT ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle animated grid background
      ctx.strokeStyle = '#1e293b';
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

      // Animated sine wave ribbon
      ctx.beginPath();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2.5;
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x + frame * 1.5) * 0.03) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Pulsing beacon point
      const beaconX = (frame * 1.5) % canvas.width;
      const beaconY = canvas.height / 2 + Math.sin((beaconX + frame * 1.5) * 0.03) * 12;
      ctx.beginPath();
      ctx.arc(beaconX, beaconY, 4 + Math.sin(frame * 0.1) * 2, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ── ESCALATING HINTS CALLBACK ──
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  // ── INACTIVITY TIMER CALLBACK ──
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ── DISCOVERY HANDLER CALLBACK ──
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent prediction! You understand standard angle ratios.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ── PHASE TRANSITION CALLBACKS ──
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the geometry labs and master the concepts step by step.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test angles, lines, and coordinate distances freely without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Get ready for the ICSE competency challenges! You can do this.');
  }, []);

  // ── PREDICTION HANDLERS ──
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Great prediction! Now test the controls below to check your answer.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation! That is the core geometric symmetry.' : 'Look closely at how the values change in the gauges.');
  }, []);

  // ── COMPLETION HANDLER ──
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Trigonometry and Coordinate Geometry simulation.');
  }, [errors, onComplete]);

  // ── NEXT CHALLENGE HANDLER ──
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

  // ── UNIFIED ANSWER EVALUATION HANDLER ──
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
      speechManager.speak('Correct! Outstanding application.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(bktStateRef.current));
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
        speechManager.speak('Let us review the step-by-step mathematical reasoning together.');
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

  // ── DRAG AND DROP HANDLERS ──
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
      let arr = prev.length === challenge.sortItems?.length ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ── CLEANUP ON UNMOUNT ──
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <motion.div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gold-600/20 border border-gold-500/30 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-xs font-semibold uppercase tracking-wider text-gold-400 bg-gold-950/80 px-2.5 py-0.5 rounded-full border border-gold-800"
              >
                ICSE Class 9 Mathematics
              </motion.span>
              <span className="text-xs font-medium text-slate-400">Pure Geometry & Coordinate Labs</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white mt-0.5 tracking-tight">{title}</h1>
          </div>
        </motion.div>

        {/* Phase Pills */}
        <motion.div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p, idx) => (
            <motion.span
              key={p}
              whileHover={{ scale: 1.05 }}
              className={`text-xs px-3 py-1 rounded-xl font-medium capitalize transition-all ${
                phase === p
                  ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30 font-bold'
                  : 'text-slate-400'
              }`}
            >
              {idx + 1}. {p}
            </motion.span>
          ))}
        </motion.div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="p-6 bg-gradient-to-br from-gold-950/80 via-slate-900 to-slate-950 rounded-2xl border border-gold-800/60 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🚇</span>
              <h2 className="text-lg font-bold text-gold-300">{SCENARIO.title}</h2>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300/80 mt-2 bg-gold-950/40 p-2.5 rounded-lg border border-gold-900/50">
              💡 {SCENARIO.context}
            </p>
          </motion.div>

          <motion.div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 shadow-lg">
            <h3 className="text-base font-semibold text-white mb-3">🔍 Curiosity Discovery Hook:</h3>
            <p className="text-slate-200 text-sm mb-4 font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-xl text-left text-sm transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/50 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-slate-900/50 border-slate-700 text-slate-400'
                      : 'bg-slate-900/80 hover:bg-gold-950/60 border-slate-700 hover:border-gold-500 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2">
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓ ' : ''}
                    {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && !discoveryCorrect ? '✗ ' : ''}
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-900 border border-slate-700">
                <motion.p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-bold' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! sin 60° = √3/2, so height = 10 × (√3/2) = 5√3 ≈ 8.66 m.' : `ℹ️ ✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </motion.p>
                <div className="mt-4 flex justify-end">
                  <motion.button
                    aria-label="Enter Interactive Labs"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold shadow-lg shadow-gold-600/30 flex items-center gap-2"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
          {/* Step Header & Progress */}
          <motion.div className="flex items-center justify-between bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700">
            <div>
              <span className="text-xs text-gold-400 font-bold uppercase tracking-wider">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <motion.div
                  key={idx}
                  animate={{ scale: idx === currentSlide ? 1.1 : 1 }}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-8 bg-gold-500' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-amber-300 text-sm font-medium bg-amber-950/40 p-3 rounded-xl border border-amber-800/50"
          >
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-6"
            >
              {/* ── EXPLORATION SLIDE 0: STANDARD ANGLES LAB ── */}
              {currentSlide === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 360 260" className="w-full max-w-[340px] h-[240px]" role="img" aria-label="Right triangle interactive visualizer">
                      <line x1="40" y1="210" x2="300" y2="210" stroke="#475569" strokeWidth="2" strokeDasharray="3,3" />
                      <polygon
                        points={`40,210 ${40 + trigValues.adj * 22},210 40,${210 - trigValues.opp * 22}`}
                        fill="rgba(99, 102, 241, 0.15)"
                        stroke="#6366f1"
                        strokeWidth="3"
                      />
                      <rect
                        x={40 + trigValues.adj * 22 - 16}
                        y="194"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                      />
                      <path
                        d={`M 80 210 A 40 40 0 0 0 ${40 + 40 * Math.cos(trigValues.rad)} ${210 - 40 * Math.sin(trigValues.rad)}`}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2.5"
                      />
                      <text x="95" y="200" fill="#fbbf24" fontSize="12" fontWeight="bold">{selectedAngle}°</text>
                      <text x={40 + (trigValues.adj * 22) / 2} y="232" fill="#38bdf8" fontSize="11" textAnchor="middle">
                        Adjacent: {trigValues.adj.toFixed(2)}
                      </text>
                      <text
                        x={40 + trigValues.adj * 22 + 15}
                        y={210 - (trigValues.opp * 22) / 2}
                        fill="#34d399"
                        fontSize="11"
                        dominantBaseline="middle"
                      >
                        Opposite: {trigValues.opp.toFixed(2)}
                      </text>
                      <text
                        x={40 + (trigValues.adj * 22) / 2 - 10}
                        y={210 - (trigValues.opp * 22) / 2 - 10}
                        fill="#a855f7"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        Hyp = {hypotenuseLength}
                      </text>
                    </svg>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 font-bold mb-1">
                        <span>Standard Angle Selection:</span>
                        <span className="text-amber-400 font-mono text-sm">{selectedAngle}°</span>
                      </div>
                      <div className="flex gap-2">
                        {[0, 30, 45, 60, 90].map(deg => (
                          <motion.button
                            key={deg}
                            aria-label={`Select ${deg} degrees`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSelectedAngle(deg);
                              audioManager.play('tap');
                            }}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                              selectedAngle === deg
                                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30'
                                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                            }`}
                          >
                            {deg}°
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 font-bold flex justify-between">
                        <span>Hypotenuse Length:</span>
                        <span className="text-purple-400 font-mono">{hypotenuseLength} units</span>
                      </label>
                      <input
                        type="range"
                        aria-label="Hypotenuse Length Slider"
                        min={4}
                        max={12}
                        value={hypotenuseLength}
                        onChange={e => setHypotenuseLength(Number(e.target.value))}
                        className="w-full accent-purple-500 mt-1 cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 bg-slate-950/80 rounded-lg text-center border border-slate-800">
                        <span className="text-[10px] text-emerald-400 uppercase font-bold block">sin {selectedAngle}°</span>
                        <span className="text-sm font-black text-white font-mono mt-1 block">{trigValues.sinSurd}</span>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 bg-slate-950/80 rounded-lg text-center border border-slate-800">
                        <span className="text-[10px] text-gold-400 uppercase font-bold block">cos {selectedAngle}°</span>
                        <span className="text-sm font-black text-white font-mono mt-1 block">{trigValues.cosSurd}</span>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 bg-slate-950/80 rounded-lg text-center border border-slate-800">
                        <span className="text-[10px] text-amber-400 uppercase font-bold block">tan {selectedAngle}°</span>
                        <span className="text-sm font-black text-white font-mono mt-1 block">{trigValues.tanSurd}</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── EXPLORATION SLIDE 1: 2-D SURVEYOR SIMULATOR ── */}
              {currentSlide === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  {!predictionMade && (
                    <motion.div initial={{ y: -10 }} animate={{ y: 0 }} className="p-4 bg-gold-950/50 rounded-xl border border-gold-800">
                      <h4 className="text-sm font-bold text-gold-200 mb-2">{PREDICTION_QUESTIONS[0].question}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction Option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-xs text-left bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-700 text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <svg viewBox="0 0 380 240" className="w-full bg-slate-900 rounded-2xl border border-slate-800 p-2" role="img" aria-label="Surveyor height diagram">
                      <line x1="20" y1="200" x2="360" y2="200" stroke="#64748b" strokeWidth="3" />
                      <rect x="290" y={200 - (surveyorDistance * Math.tan((surveyorAngle * Math.PI) / 180) * 8)} width="24" height={surveyorDistance * Math.tan((surveyorAngle * Math.PI) / 180) * 8} fill="#334155" stroke="#94a3b8" />
                      <line x1="50" y1="200" x2="290" y2={200 - (surveyorDistance * Math.tan((surveyorAngle * Math.PI) / 180) * 8)} stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4,4" />
                      <circle cx="50" cy="190" r="8" fill="#38bdf8" />
                      <line x1="50" y1="190" x2="50" y2="200" stroke="#38bdf8" strokeWidth="2" />
                      <text x="50" y="220" fill="#94a3b8" fontSize="11" textAnchor="middle">Observer (0m)</text>
                      <text x="170" y="218" fill="#38bdf8" fontSize="11" textAnchor="middle">Distance d = {surveyorDistance} m</text>
                      <text x="320" y="100" fill="#34d399" fontSize="12" fontWeight="bold">
                        Height = {(surveyorDistance * Math.tan((surveyorAngle * Math.PI) / 180)).toFixed(2)} m
                      </text>
                      <text x="85" y="192" fill="#fbbf24" fontSize="12" fontWeight="bold">{surveyorAngle}°</text>
                    </svg>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-slate-300 font-bold flex justify-between">
                          <span>Horizontal Base Distance (Adjacent):</span>
                          <span className="text-gold-400 font-mono">{surveyorDistance} m</span>
                        </label>
                        <input
                          type="range"
                          aria-label="Horizontal Base Distance"
                          min={5}
                          max={30}
                          value={surveyorDistance}
                          onChange={e => setSurveyorDistance(Number(e.target.value))}
                          className="w-full accent-gold-500 mt-1 cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-300 font-bold flex justify-between">
                          <span>Angle of Elevation (θ):</span>
                          <span className="text-amber-400 font-mono">{surveyorAngle}°</span>
                        </label>
                        <div className="flex gap-2 mt-1">
                          {[30, 45, 60].map(deg => (
                            <motion.button
                              key={deg}
                              aria-label={`Set surveyor angle to ${deg} degrees`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSurveyorAngle(deg)}
                              className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${
                                surveyorAngle === deg ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                              }`}
                            >
                              {deg}°
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      <motion.div whileHover={{ scale: 1.01 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                        <p className="font-bold text-white">Trigonometric Height Formula:</p>
                        <p className="font-mono text-emerald-400">
                          tan {surveyorAngle}° = Height / {surveyorDistance}
                        </p>
                        <p className="font-mono text-gold-300">
                          Height = {surveyorDistance} × tan({surveyorAngle}°) = {(surveyorDistance * Math.tan((surveyorAngle * Math.PI) / 180)).toFixed(2)} m
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── EXPLORATION SLIDE 2: COMPLEMENTARY VIEWPOINT SWAP ── */}
              {currentSlide === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="flex justify-center gap-3">
                    <motion.button
                      aria-label="View from Angle A"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveCompView('A')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        activeCompView === 'A' ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      View from Angle A ({compAngleA}°)
                    </motion.button>
                    <motion.button
                      aria-label="View from Angle B"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveCompView('B')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        activeCompView === 'B' ? 'bg-purple-600 text-white border-purple-400' : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      View from Angle B ({90 - compAngleA}°)
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <svg viewBox="0 0 340 240" className="w-full bg-slate-900 rounded-2xl border border-slate-800 p-2" role="img" aria-label="Complementary angles triangle">
                      <polygon points="40,200 280,200 40,60" fill="rgba(99, 102, 241, 0.15)" stroke="#6366f1" strokeWidth="2.5" />
                      <rect x="40" y="184" width="16" height="16" fill="none" stroke="#94a3b8" />
                      <text x="30" y="215" fill="#e2e8f0" fontSize="12" fontWeight="bold">C (90°)</text>
                      <text x="290" y="215" fill="#fbbf24" fontSize="12" fontWeight="bold">A ({compAngleA}°)</text>
                      <text x="30" y="50" fill="#c084fc" fontSize="12" fontWeight="bold">B ({90 - compAngleA}°)</text>

                      <text x="160" y="222" fill={activeCompView === 'A' ? '#38bdf8' : '#34d399'} fontSize="11" textAnchor="middle" fontWeight="bold">
                        Side AC = {activeCompView === 'A' ? 'ADJACENT to A' : 'OPPOSITE to B'}
                      </text>
                      <text x="10" y="130" fill={activeCompView === 'A' ? '#34d399' : '#38bdf8'} fontSize="11" dominantBaseline="middle" fontWeight="bold">
                        Side BC = {activeCompView === 'A' ? 'OPPOSITE to A' : 'ADJACENT to B'}
                      </text>
                      <text x="175" y="120" fill="#f43f5e" fontSize="11" fontWeight="bold">Hypotenuse AB</text>
                    </svg>

                    <motion.div whileHover={{ scale: 1.01 }} className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-slate-300 uppercase">Live Complementary Identities:</h4>
                      <div className="p-2.5 bg-slate-950 rounded-lg text-xs space-y-1 font-mono">
                        <p className="text-emerald-400">sin {compAngleA}° = BC / AB = cos {90 - compAngleA}°</p>
                        <p className="text-gold-400">cos {compAngleA}° = AC / AB = sin {90 - compAngleA}°</p>
                        <p className="text-amber-400">tan {compAngleA}° = BC / AC = cot {90 - compAngleA}°</p>
                      </div>
                      <p className="text-xs text-slate-400">
                        Notice how the roles of Opposite and Adjacent legs cleanly swap depending on which acute angle you look from!
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ── EXPLORATION SLIDE 3: SIMULTANEOUS EQUATIONS PLOTTER ── */}
              {currentSlide === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <svg viewBox="0 0 320 260" className="w-full bg-slate-900 rounded-2xl border border-slate-800 p-2" role="img" aria-label="Simultaneous linear lines on grid">
                    <line x1="20" y1="130" x2="300" y2="130" stroke="#475569" strokeWidth="2" />
                    <line x1="160" y1="20" x2="160" y2="240" stroke="#475569" strokeWidth="2" />
                    <text x="295" y="125" fill="#94a3b8" fontSize="10">X</text>
                    <text x="165" y="30" fill="#94a3b8" fontSize="10">Y</text>

                    <line
                      x1="40"
                      y1={130 - (line1M * -6 + line1C) * 12}
                      x2="280"
                      y2={130 - (line1M * 6 + line1C) * 12}
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                    />
                    <line
                      x1="40"
                      y1={130 - (line2M * -6 + line2C) * 12}
                      x2="280"
                      y2={130 - (line2M * 6 + line2C) * 12}
                      stroke="#ec4899"
                      strokeWidth="2.5"
                    />

                    {lineIntersection.status === 'unique' && (
                      <circle
                        cx={160 + (lineIntersection.x || 0) * 12}
                        cy={130 - (lineIntersection.y || 0) * 12}
                        r="6"
                        fill="#22c55e"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                    )}
                  </svg>

                  <div className="space-y-3">
                    <motion.div whileHover={{ scale: 1.01 }} className="p-3 bg-slate-900 rounded-xl border border-gold-900/50">
                      <span className="text-xs font-bold text-gold-400 block">Line 1: y = {line1M}x + ({line1C})</span>
                      <div className="flex gap-2 items-center text-xs mt-1">
                        <span>Slope m₁:</span>
                        <input aria-label="Line 1 Slope" type="range" min={-3} max={3} step={1} value={line1M} onChange={e => setLine1M(Number(e.target.value))} className="accent-gold-500 flex-1" />
                        <span>c₁:</span>
                        <input aria-label="Line 1 Intercept" type="range" min={-4} max={4} step={1} value={line1C} onChange={e => setLine1C(Number(e.target.value))} className="accent-gold-500 flex-1" />
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.01 }} className="p-3 bg-slate-900 rounded-xl border border-pink-900/50">
                      <span className="text-xs font-bold text-pink-400 block">Line 2: y = {line2M}x + ({line2C})</span>
                      <div className="flex gap-2 items-center text-xs mt-1">
                        <span>Slope m₂:</span>
                        <input aria-label="Line 2 Slope" type="range" min={-3} max={3} step={1} value={line2M} onChange={e => setLine2M(Number(e.target.value))} className="accent-pink-500 flex-1" />
                        <span>c₂:</span>
                        <input aria-label="Line 2 Intercept" type="range" min={-4} max={4} step={1} value={line2C} onChange={e => setLine2C(Number(e.target.value))} className="accent-pink-500 flex-1" />
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.01 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-bold text-emerald-400">
                      Status: {lineIntersection.text}
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ── EXPLORATION SLIDE 4: DISTANCE & PYTHAGORAS ── */}
              {currentSlide === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <svg viewBox="0 0 320 260" className="w-full bg-slate-900 rounded-2xl border border-slate-800 p-2" role="img" aria-label="Cartesian Distance Formula plot">
                    <line x1="20" y1="130" x2="300" y2="130" stroke="#475569" strokeWidth="2" />
                    <line x1="160" y1="20" x2="160" y2="240" stroke="#475569" strokeWidth="2" />

                    <polygon
                      points={`${160 + pointP.x * 14},${130 - pointP.y * 14} ${160 + pointQ.x * 14},${130 - pointP.y * 14} ${160 + pointQ.x * 14},${130 - pointQ.y * 14}`}
                      fill="rgba(56, 189, 248, 0.15)"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      strokeDasharray="3,3"
                    />

                    <line
                      x1={160 + pointP.x * 14}
                      y1={130 - pointP.y * 14}
                      x2={160 + pointQ.x * 14}
                      y2={130 - pointQ.y * 14}
                      stroke="#a855f7"
                      strokeWidth="3"
                    />

                    <circle cx={160 + pointP.x * 14} cy={130 - pointP.y * 14} r="5" fill="#38bdf8" />
                    <text x={160 + pointP.x * 14 - 10} y={130 - pointP.y * 14 - 8} fill="#38bdf8" fontSize="10" fontWeight="bold">
                      P({pointP.x}, {pointP.y})
                    </text>

                    <circle cx={160 + pointQ.x * 14} cy={130 - pointQ.y * 14} r="5" fill="#f43f5e" />
                    <text x={160 + pointQ.x * 14 + 8} y={130 - pointQ.y * 14 - 8} fill="#f43f5e" fontSize="10" fontWeight="bold">
                      Q({pointQ.x}, {pointQ.y})
                    </text>
                  </svg>

                  <motion.div whileHover={{ scale: 1.01 }} className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-300 uppercase">Pythagorean Distance Derivation:</h4>
                    <div className="space-y-1 text-xs text-slate-300 font-mono">
                      <p>Horizontal leg Δx = |{pointQ.x} - {pointP.x}| = {Math.abs(distanceCalc.dx)}</p>
                      <p>Vertical leg Δy = |{pointQ.y} - {pointP.y}| = {Math.abs(distanceCalc.dy)}</p>
                      <p className="text-purple-400 font-bold">
                        PQ = √[(Δx)² + (Δy)²] = √[{Math.abs(distanceCalc.dx)}² + {Math.abs(distanceCalc.dy)}²]
                      </p>
                      <p className="text-emerald-400 font-black text-sm">
                        Distance PQ = {distanceCalc.dist} units
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
                      <div>
                        <span className="text-slate-400 block font-bold">Adjust P(x, y):</span>
                        <div className="flex gap-1 mt-1">
                          <input aria-label="Point P X coordinate" type="number" value={pointP.x} onChange={e => setPointP(p => ({ ...p, x: Number(e.target.value) }))} className="w-12 bg-slate-950 p-1 rounded border border-slate-700 text-center" />
                          <input aria-label="Point P Y coordinate" type="number" value={pointP.y} onChange={e => setPointP(p => ({ ...p, y: Number(e.target.value) }))} className="w-12 bg-slate-950 p-1 rounded border border-slate-700 text-center" />
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-bold">Adjust Q(x, y):</span>
                        <div className="flex gap-1 mt-1">
                          <input aria-label="Point Q X coordinate" type="number" value={pointQ.x} onChange={e => setPointQ(q => ({ ...q, x: Number(e.target.value) }))} className="w-12 bg-slate-950 p-1 rounded border border-slate-700 text-center" />
                          <input aria-label="Point Q Y coordinate" type="number" value={pointQ.y} onChange={e => setPointQ(q => ({ ...q, y: Number(e.target.value) }))} className="w-12 bg-slate-950 p-1 rounded border border-slate-700 text-center" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
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
              className="px-5 py-2.5 bg-slate-800 text-slate-300 rounded-xl font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-6 py-2.5 bg-gold-600 text-white rounded-xl font-bold shadow-lg shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Try Free Sandbox"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/30"
              >
                Try Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX / PLAYGROUND ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
          <motion.div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white">🧪 Pure Exploration Playground</h3>
              <p className="text-xs text-slate-400">Interact freely with any mathematical tool. No time limits or grading.</p>
            </div>
            <div className="flex gap-2">
              {(['trig', 'graph', 'distance', 'rates'] as const).map(tool => (
                <motion.button
                  key={tool}
                  aria-label={`Select tool ${tool}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSandboxTool(tool)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    sandboxTool === tool ? 'bg-gold-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {tool}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={sandboxTool}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 bg-slate-950 rounded-2xl border border-slate-800 min-h-[260px] flex items-center justify-center"
            >
              {sandboxTool === 'trig' && (
                <div className="w-full text-center space-y-4">
                  <p className="text-xs text-slate-400">Angle: <span className="text-amber-400 font-bold font-mono">{selectedAngle}°</span> | Hypotenuse: <span className="text-purple-400 font-bold font-mono">{hypotenuseLength}</span></p>
                  <div className="flex justify-center gap-2">
                    {[0, 30, 45, 60, 90].map(d => (
                      <motion.button
                        key={d}
                        aria-label={`Set angle ${d} degrees`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedAngle(d)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold ${selectedAngle === d ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
                      >
                        {d}°
                      </motion.button>
                    ))}
                  </div>
                  <p className="text-sm text-emerald-400 font-mono">Opposite = {trigValues.opp.toFixed(2)} | Adjacent = {trigValues.adj.toFixed(2)}</p>
                </div>
              )}
              {sandboxTool === 'graph' && (
                <div className="w-full text-center space-y-3">
                  <p className="text-sm font-bold text-gold-400">Line 1: y = {line1M}x + {line1C} | Line 2: y = {line2M}x + {line2C}</p>
                  <p className="text-sm text-emerald-400 font-mono font-bold">{lineIntersection.text}</p>
                </div>
              )}
              {sandboxTool === 'distance' && (
                <div className="w-full text-center space-y-3 font-mono">
                  <p className="text-xs text-slate-400">P({pointP.x}, {pointP.y}) → Q({pointQ.x}, {pointQ.y})</p>
                  <p className="text-lg font-black text-purple-400">Distance = {distanceCalc.dist} units</p>
                </div>
              )}
              {sandboxTool === 'rates' && (
                <div className="w-full max-w-md space-y-3 text-left">
                  <span className="text-xs text-slate-400 font-bold">Vending Rate Simulator (Data Recharge @ Rs 10 / GB):</span>
                  <input aria-label="Data recharge slider" type="range" min={1} max={10} value={dataGbInput} onChange={e => setDataGbInput(Number(e.target.value))} className="w-full accent-gold-500" />
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Input (Independent X): {dataGbInput} GB</span>
                    <span className="text-emerald-400 font-bold">Cost (Dependent Y): Rs {dataGbInput * 10}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-end">
            <motion.button
              aria-label="Start Competency Challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/30"
            >
              Start Competency Challenges →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE STAGE (NEP 2020 / CISCE ADAPTIVE) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
          <canvas ref={canvasRef} width={500} height={32} className="w-full h-8 rounded-xl bg-slate-950 border border-slate-800" />

          {/* Status Bar */}
          <motion.div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <div>
              <span className="text-xs text-slate-400">Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-xs font-semibold uppercase tracking-wider text-gold-400 bg-gold-950 px-2 py-0.5 rounded border border-gold-900"
                >
                  {challenge.competencyLevel.toUpperCase()}
                </motion.span>
                <span className="text-xs text-slate-400 font-mono">Node: {challenge.nodeId}</span>
              </div>
            </div>

            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700'
                  : difficulty === 'standard'
                  ? 'bg-gold-950/80 text-gold-400 border-gold-700'
                  : 'bg-rose-950/80 text-rose-400 border-rose-700'
              }`}
            >
              Difficulty: {difficulty}
            </motion.span>
          </motion.div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl bg-slate-950 border transition-all ${
              wrongFlash ? 'bg-rose-950/70 border-rose-500' : 'border-slate-800'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">{challenge.question}</h3>

            {/* MCQ TYPE */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl text-sm border transition-all flex items-start gap-3 ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-bold shadow-lg shadow-emerald-900/30'
                        : 'bg-slate-900 hover:bg-slate-800/80 border-slate-700 hover:border-gold-500 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-gold-400">
                      {showExplanation && i === challenge.correctIndex ? '✓ ' : ''}
                      {String.fromCharCode(65 + i)}.
                    </span>
                    <span>{opt}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL TYPE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-gold-700 hover:bg-gold-600 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      ✥ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'target_origin', title: 'Intersection of Axes (0,0)' },
                    { id: 'target_xaxis', title: 'Point on X-Axis (y=0)' },
                    { id: 'target_yaxis', title: 'Point on Y-Axis (x=0)' },
                    { id: 'target_q2', title: 'Quadrant II Sign Pattern (-, +)' },
                  ].map(target => (
                    <motion.div
                      key={target.id}
                      whileHover={{ scale: 1.02 }}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border-2 border-dashed text-center min-h-[70px] flex flex-col justify-center items-center transition-all ${
                        droppedLabels[target.id] ? 'border-emerald-500 bg-emerald-950/30 text-emerald-300' : 'border-slate-700 bg-slate-900/50 text-slate-400'
                      }`}
                    >
                      <span className="text-[11px] text-slate-500 block">{target.title}</span>
                      <span className="text-xs font-bold mt-1 text-white">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop Label Here'}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Check Coordinates"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2.5 bg-gold-600 text-white rounded-xl font-bold shadow"
                >
                  Check Coordinates →
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, idx) => (
                  <motion.div
                    key={idx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Sort item ${idx + 1}: ${item}`}
                    draggable
                    onDragStart={() => handleDragStart(String(idx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, idx);
                    }}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 bg-slate-900 rounded-xl border border-slate-700 flex justify-between items-center text-sm cursor-grab"
                  >
                    <span>{idx + 1}. {item}</span>
                    <span className="text-slate-500 text-xs">≡ Drag</span>
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Verify Ascending Order"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-gold-600 text-white rounded-xl font-bold shadow"
                >
                  Verify Ascending Order →
                </motion.button>
              </div>
            )}

            {/* NUMERIC TYPE */}
            {challenge.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3">
                <input
                  aria-label="Numeric answer input"
                  type="number"
                  step="any"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter exact value"
                  className="px-4 py-2.5 bg-slate-900 rounded-xl border border-slate-700 text-white font-mono text-sm w-48 focus:border-gold-500 outline-none"
                />
                <span className="text-slate-400 text-sm font-semibold">{challenge.unit}</span>
                <motion.button
                  aria-label="Submit numeric value"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl font-bold shadow"
                >
                  Submit Value →
                </motion.button>
              </div>
            )}

            {/* CONSTRUCT TYPE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part: ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(p => [...p, part])}
                      className="px-3 py-1.5 bg-gold-950 border border-gold-800 text-gold-300 rounded-lg text-xs hover:bg-gold-900"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.span key={i} whileHover={{ scale: 1.05 }} className="px-2.5 py-1 bg-gold-600 text-white text-xs rounded-lg flex items-center gap-1.5">
                      {part}
                      <motion.button
                        aria-label={`Remove part ${part}`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))}
                        className="text-red-300 font-bold"
                      >
                        ✕
                      </motion.button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click statements above to assemble verification proof...</span>}
                </div>

                <motion.button
                  aria-label="Check Construction"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-gold-600 text-white rounded-xl font-bold"
                >
                  Check Construction →
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Step-by-Step ICSE Board Explanation:</h4>
                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-amber-200 text-xs md:text-sm">
                        <span className="font-bold text-amber-400 mr-1.5">Step {i + 1}:</span>
                        {sentence}{!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Show Next Explanation Step"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                  >
                    Show Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Next Challenge or View Mastery"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="mt-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'View Completion Mastery →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD SYNTHESIS ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-6">
          {/* Hero Mastery Banner */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="text-center p-8 bg-gradient-to-br from-gold-950/80 via-slate-900 to-slate-950 rounded-3xl border border-gold-800 shadow-2xl space-y-3"
          >
            <span className="text-4xl">🎉</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Surveying Mission Accomplished!</h2>

            {/* Personalised Motivational Feedback */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-4 bg-gold-900/40 rounded-2xl border border-gold-700/60 max-w-lg mx-auto"
            >
              <h3 className="text-lg font-black text-amber-300">{motivationalMessage.title}</h3>
              <p className="text-xs text-gold-200 mt-1">{motivationalMessage.desc}</p>
            </motion.div>

            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have demonstrated mastery over standard angle ratios, right-triangle heights and distances, complementary angle properties, Cartesian plotting, simultaneous linear intersection, and distance calculations!
            </p>

            <div className="flex justify-center gap-6 pt-3">
              <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center min-w-[100px]">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Final Score</span>
                <span className="text-xl font-black text-emerald-400 block">{Math.max(0, 100 - errors * 5)}%</span>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center min-w-[100px]">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Mastery Level</span>
                <span className="text-xl font-black text-gold-400 block capitalize">{masteryLevel}</span>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center min-w-[100px]">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Mistakes</span>
                <span className="text-xl font-black text-amber-400 block">{errors}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* ── HIGH VISIBILITY SPACED REPETITION SCHEDULE (SRS) CARD ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            className="p-6 bg-gradient-to-r from-gold-950 via-slate-900 to-gold-950/90 rounded-3xl border-2 border-gold-500/50 shadow-2xl space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gold-600/30 border border-gold-400/40 flex items-center justify-center text-2xl shadow-inner">
                  📅
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                      SuperMemo-2 Spaced Repetition (SRS)
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${srsDetails.colorClass}`}>
                      {srsDetails.label}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white mt-0.5">
                    Next Recommended Review: <span className="text-amber-300">in {srsDetails.days} {srsDetails.days === 1 ? 'day' : 'days'}</span> ({srsDetails.dateFormatted})
                  </h3>
                </div>
              </div>

              <div className="px-4 py-2 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">SRS Review Window</span>
                <span className="text-base font-black text-emerald-400 font-mono">
                  {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
                </span>
              </div>
            </div>

            {/* SRS Retention Progress Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Estimated Geometric Memory Retention:</span>
                <span className="font-mono font-bold text-gold-300">{srsDetails.progressPct}%</span>
              </div>
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${srsDetails.progressPct}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`h-full rounded-full ${
                    srsDetails.days === 7
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      : srsDetails.days === 3
                      ? 'bg-gradient-to-r from-gold-500 to-gold-500'
                      : 'bg-gradient-to-r from-rose-500 to-amber-500'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1 text-xs text-slate-300">
              <div className={`p-3 rounded-xl border ${errors === 0 ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold' : 'bg-slate-900/60 border-slate-800 text-slate-400'}`}>
                <span className="block text-[11px] uppercase font-bold">0 Mistakes (Flawless)</span>
                <span>Review in 7 days (Long-term consolidation)</span>
              </div>
              <div className={`p-3 rounded-xl border ${errors >= 1 && errors <= 3 ? 'bg-gold-950/40 border-gold-500 text-gold-200 font-bold' : 'bg-slate-900/60 border-slate-800 text-slate-400'}`}>
                <span className="block text-[11px] uppercase font-bold">1–3 Mistakes (Minor Gaps)</span>
                <span>Review in 3 days (Reinforce weak angles/signs)</span>
              </div>
              <div className={`p-3 rounded-xl border ${errors >= 4 ? 'bg-rose-950/40 border-rose-500 text-rose-200 font-bold' : 'bg-slate-900/60 border-slate-800 text-slate-400'}`}>
                <span className="block text-[11px] uppercase font-bold">4+ Mistakes (Needs Review)</span>
                <span>Review in 1 day (Re-attempt standard triangles)</span>
              </div>
            </div>
          </motion.div>

          {/* Structured Reflection Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-950 rounded-2xl border border-gold-900/50 space-y-4"
          >
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>🧠</span> Deep Reflection & Synthesis
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <input
                  aria-label="Reflection on surprising learning"
                  type="text"
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers(r => ({ ...r, surprising: e.target.value }))}
                  placeholder="e.g., How sin 30° and cos 60° are completely identical because complementary angles swap opposite and adjacent sides..."
                  className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-200 focus:border-gold-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  2. How would you explain this to a friend?
                </label>
                <input
                  aria-label="Reflection on explaining to a friend"
                  type="text"
                  value={reflectionAnswers.friend}
                  onChange={e => setReflectionAnswers(r => ({ ...r, friend: e.target.value }))}
                  placeholder="e.g., Trigonometry lets you measure huge heights from the ground using just one horizontal distance and a sight angle..."
                  className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-200 focus:border-gold-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  3. Where in real life might you use this?
                </label>
                <input
                  aria-label="Reflection on real life application"
                  type="text"
                  value={reflectionAnswers.reallife}
                  onChange={e => setReflectionAnswers(r => ({ ...r, reallife: e.target.value }))}
                  placeholder="e.g., In architectural CAD planning, GPS map navigation routing, calculating metro aerial track slopes..."
                  className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-200 focus:border-gold-500 outline-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Personalised Misconception Diagnostics
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <motion.div key={i} whileHover={{ scale: 1.01 }} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-bold">✗ Common Trap: "{m.misconception}"</p>
                      <p className="text-emerald-300 font-medium">✓ ICSE Correction: {m.correction}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Real World Activity */}
          <motion.div whileHover={{ scale: 1.01 }} className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🏗️</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <motion.li key={i} whileHover={{ x: 3 }} className="flex items-start gap-2">
                  <span className="text-gold-400 font-bold">{i + 1}.</span> {step}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed! ✓" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C9_MathematicsTrigonometricRatiosStandardSim;
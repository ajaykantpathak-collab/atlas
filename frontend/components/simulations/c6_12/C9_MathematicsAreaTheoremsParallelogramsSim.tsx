'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── MANDATORY NODE CONSTANTS ───
const NODE_C9_MATH_041 = 'c9_math_041';
const NODE_C9_MATH_042 = 'c9_math_042';
const NODE_C9_MATH_043 = 'c9_math_043';
const NODE_C9_MATH_044 = 'c9_math_044';
const NODE_C9_MATH_045 = 'c9_math_045';
const NODE_C9_MATH_046 = 'c9_math_046';
const NODE_C9_MATH_047 = 'c9_math_047';
const NODE_C9_MATH_048 = 'c9_math_048';
const NODE_C9_MATH_049 = 'c9_math_049';
const NODE_C9_MATH_050 = 'c9_math_050';

const ALL_NODE_IDS = [
  NODE_C9_MATH_041,
  NODE_C9_MATH_042,
  NODE_C9_MATH_043,
  NODE_C9_MATH_044,
  NODE_C9_MATH_045,
  NODE_C9_MATH_046,
  NODE_C9_MATH_047,
  NODE_C9_MATH_048,
  NODE_C9_MATH_049,
  NODE_C9_MATH_050,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Royal Architect & Chief Statistician Challenge',
  intro: 'You are appointed by the Council of Geometry and Data in Bengaluru. You must design structural roof trusses using shearing parallelogram theorems, calculate precision chords for astronomical dome observatories, and audit census survey records through statistical data transformations and balance means.',
  context: 'A single miscalculation in area or chord geometry will compromise the dome, and inaccurate tally distributions will corrupt the municipal budget.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If you push (shear) the top edge of a parallelogram to the right so it leans heavily at 60°, but keep its base and perpendicular height strictly unchanged, what happens to its internal enclosed area?',
  options: [
    'The area increases because the slant side became much longer',
    'The area remains exactly the same because base and perpendicular height are unchanged',
    'The area decreases because the figure is squished closer to the base',
    'The area changes proportionally to the angle of the lean',
  ],
  correctIndex: 1,
  hintAfter: 'Surprising right? The slant length grows, but the vertical perpendicular distance is what defines 2D area! Let us verify this mathematically and interactively.',
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
  {
    id: 'ch_01',
    nodeId: NODE_C9_MATH_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to the parallelogram area theorem, what two simultaneous conditions guarantee that two parallelograms have equal area?',
    options: [
      'Same base and same slant side lengths',
      'Same base (or equal bases) and between the same parallel lines',
      'Equal perimeter and equal interior angles',
      'Congruent diagonals and equal base angles',
    ],
    correctIndex: 1,
    explanation: 'Parallelograms on the same base (or equal bases) and between the same parallels have identical perpendicular heights, hence ar(ABCD) = base × height.',
    hints: [
      'Think about the formula: Area = base × height.',
      'What geometric condition ensures that the perpendicular heights are identical?',
      'Both figures must share the base and lie between the same two parallel lines.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C9_MATH_041,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A solar roof panel in Pune is shaped like a parallelogram ABCD with base AB = 15 m. It stands between parallel boundary rails 8 m apart. The installer measures a slant side AD = 11 m. Calculate the true surface area in square metres.',
    correctAnswer: 120,
    tolerance: 0,
    unit: 'sq m',
    explanation: 'Area = base × perpendicular height = 15 m × 8 m = 120 sq m. The slant side of 11 m is an irrelevant distractor; only the perpendicular distance between the parallels matters.',
    hints: [
      'Identify the base and the perpendicular distance between the parallel rails.',
      'Remember: slant side is NOT the perpendicular height!',
      'Multiply base 15 by perpendicular height 8.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C9_MATH_042,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A triangle ABC and a parallelogram ABDE share the common base AB and lie between the same parallel lines AB and DE. What is the ratio of ar(ΔABC) to ar(parallelogram ABDE)?',
    options: ['1 : 1', '1 : 2', '2 : 1', '1 : 4'],
    correctIndex: 1,
    explanation: 'Area of triangle = 1/2 × base × h, while area of parallelogram = base × h. Thus the ratio is exactly (1/2) : 1 = 1 : 2.',
    hints: [
      'Compare the formulas (1/2)bh and bh.',
      'A diagonal divides a parallelogram into two triangles of equal area.',
      'Therefore, the single triangle has half the area of the parallelogram (1 : 2).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_04',
    nodeId: NODE_C9_MATH_042,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Triangles ABC and ABD stand on the same base AB = 10 cm and lie between the same parallels AB and CD (height 6 cm). A student claims they must be congruent. Is this claim valid?',
    options: [
      'Valid — figures on the same base between same parallels are congruent in all respects',
      'Invalid — they are equal in area (30 cm² each), but can have completely different side lengths and angles',
      'Valid — only if both are right-angled triangles',
      'Invalid — their areas are different because vertex D is farther away along the parallel',
    ],
    correctIndex: 1,
    explanation: 'Equal area is a scalar property: ar(Δ) = 1/2 × 10 × 6 = 30 cm². Sliding vertex C along the parallel line changes side lengths AC and BC, so the triangles are generally NOT congruent.',
    hints: [
      'Does sliding the top vertex sideways change the height?',
      'No, height stays 6 cm. But do the side lengths change?',
      'Yes, the side lengths stretch while area remains 30 cm². So equal area does not mean congruent!',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C9_MATH_043,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a circle with centre O, a line segment is drawn from O to the midpoint M of chord AB (not a diameter). What is the measure of angle OMB?',
    options: ['45°', '60°', '90°', '180°'],
    correctIndex: 2,
    explanation: 'By SSS congruence of ΔOAM and ΔOBM (OA=OB radii, AM=MB midpoint, OM common), ∠OMA = ∠OMB. Since they form a linear pair on AB, each angle is 180° / 2 = 90°.',
    hints: [
      'Consider the two symmetric triangles formed on either side of OM.',
      'They are congruent by SSS, making the adjacent linear angles equal.',
      'Two equal angles summing to 180° must each be 90° (perpendicular).',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_06',
    nodeId: NODE_C9_MATH_043,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a circle of radius r = 13 cm, chord AB has total length 24 cm. Find the perpendicular distance d (in cm) from the centre O to chord AB.',
    correctAnswer: 5,
    tolerance: 0,
    unit: 'cm',
    explanation: 'The perpendicular bisects the chord: half-chord AM = 24 / 2 = 12 cm. In right ΔOMA, r² = d² + (l/2)² ⇒ 13² = d² + 12² ⇒ 169 = d² + 144 ⇒ d² = 25 ⇒ d = 5 cm.',
    hints: [
      'First calculate half of the chord length: 24 / 2 = 12 cm.',
      'Form the right triangle with hypotenuse = radius (13 cm) and leg = 12 cm.',
      'Use Pythagoras: d = √(13² - 12²) = √(169 - 144).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_07',
    nodeId: NODE_C9_MATH_044,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Two chords AB and CD in a circle of radius 10 cm have lengths 12 cm and 16 cm respectively. Which chord is located CLOSER to the centre of the circle?',
    options: [
      'Chord AB (12 cm) because smaller chords take less space',
      'Chord CD (16 cm) because longer chords pass closer to the centre (diameter is closest at d=0)',
      'Both are at the same distance because they belong to the same circle',
      'Distance depends on the angle between the chords, not their lengths',
    ],
    correctIndex: 1,
    explanation: 'For CD: half-chord = 8, d = √(100-64) = 6 cm. For AB: half-chord = 6, d = √(100-36) = 8 cm. Thus, the longer chord (16 cm) is closer (6 cm vs 8 cm).',
    hints: [
      'Think of the extreme case: the longest possible chord is the diameter.',
      'How far is the diameter from the centre? Exactly 0 cm!',
      'Therefore, as chords get longer, their perpendicular distance to the centre decreases.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_08',
    nodeId: NODE_C9_MATH_044,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How many distinct circles can pass through three given COLLINEAR points P, Q, and R on a flat plane?',
    options: [
      'Exactly one unique circle',
      'Infinitely many circles',
      'Zero — perpendicular bisectors of collinear segments are parallel and never intersect',
      'Exactly two symmetric circles',
    ],
    correctIndex: 2,
    explanation: 'The centre of a circle passing through points must lie on the intersection of their perpendicular bisectors. For collinear points, the bisectors are parallel lines, which never meet. Hence, 0 circles exist.',
    hints: [
      'A circle is defined by the intersection of the perpendicular bisectors of its chords.',
      'If P, Q, R lie on one straight line, what is true about the perpendicular bisectors of PQ and QR?',
      'They are parallel lines! Parallel lines have no intersection point to serve as a centre.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_09',
    nodeId: NODE_C9_MATH_045,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'If two minor arcs AB and CD of the same circle subtend equal angles of 75° at the centre O, what is the geometric relationship between the arcs?',
    options: [
      'Arc AB is shorter than arc CD',
      'Arc AB is equal in length (congruent) to arc CD',
      'Arc AB and arc CD sum to 180°',
      'Arc AB is twice the length of arc CD',
    ],
    correctIndex: 1,
    explanation: 'The theorem states that in the same circle (or congruent circles), arcs that subtend equal central angles are equal in length.',
    hints: [
      'Equal central angles mean the pizza slices have the exact same tip angle.',
      'In a circle of fixed radius, arc length s = r × θ.',
      'If θ and r are identical, the arc lengths must be equal.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_10',
    nodeId: NODE_C9_MATH_045,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In circle (O, r), minor arc PQ = minor arc RS. Arc PQ subtends an angle of 64° at O. What is the angle subtended by major arc RS at the centre O?',
    options: ['64°', '116°', '296°', '360°'],
    correctIndex: 2,
    explanation: 'Since minor arc PQ = minor arc RS, minor arc RS subtends 64° at O (converse arc theorem). The major arc RS completes the full 360° circle: 360° - 64° = 296°.',
    hints: [
      'Find the central angle for the MINOR arc RS first using the converse arc theorem.',
      'Minor arc RS subtends 64°.',
      'Major arc is the remainder of the full circle: 360° - 64° = 296°.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_11',
    nodeId: NODE_C9_MATH_046,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Order the deductive proof steps showing that "Equal chords AB = CD cut off equal arcs AB and CD" in circle (O, r).',
    sortItems: [
      'State OA = OB = OC = OD = r (all radii of the same circle)',
      'Given chords AB = CD, establish ΔOAB ≅ ΔOCD by SSS congruence',
      'Conclude ∠AOB = ∠COD by CPCT (corresponding parts)',
      'Apply arc-angle theorem: equal central angles subtend equal arcs, hence arc AB = arc CD',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The proof starts from radii equality, uses SSS congruence on chord triangles, derives central angle equality via CPCT, and finishes with arc equality.',
    hints: [
      'Start by identifying the radii connecting the centre to endpoints.',
      'Next, use SSS congruence on the two triangles formed by the chords.',
      'Deduce equal central angles via CPCT before asserting equal arcs.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_12',
    nodeId: NODE_C9_MATH_047,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The marks of 8 students are recorded as: 45, 78, 32, 90, 65, 45, 82, 54. What type of data representation is this list?',
    options: ['Grouped data', 'Raw data', 'Arrayed data', 'Continuous frequency distribution'],
    correctIndex: 1,
    explanation: 'Data recorded exactly as collected without sorting or grouping into intervals is called raw data.',
    hints: [
      'Are the numbers sorted in ascending or descending order?',
      'Are they placed inside class intervals like 30-40, 40-50?',
      'Since they are in their original unorganized order, it is raw data.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_13',
    nodeId: NODE_C9_MATH_047,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Given the raw dataset of cricket scores in Bengaluru: [28, 64, 15, 82, 45, 93, 37]. Find the statistical Range (Highest - Lowest).',
    correctAnswer: 78,
    tolerance: 0,
    unit: 'runs',
    explanation: 'Sorting the data: [15, 28, 37, 45, 64, 82, 93]. The lowest value is 15 and highest is 93. Range = 93 - 15 = 78 runs.',
    hints: [
      'First convert the raw data to arrayed data by sorting.',
      'Find the minimum score and the maximum score.',
      'Subtract: 93 - 15 = 78.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_14',
    nodeId: NODE_C9_MATH_048,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the standard CISCE tally mark symbols to their correct numerical frequencies.',
    dragItems: [
      { label: '|||', targetId: 'tally_3' },
      { label: '||||', targetId: 'tally_4' },
      { label: '卌', targetId: 'tally_5' },
      { label: '卌 |||', targetId: 'tally_8' },
    ],
    correctMapping: {
      tally_3: '|||',
      tally_4: '||||',
      tally_5: '卌',
      tally_8: '卌 |||',
    },
    explanation: 'In ICSE statistics, 4 vertical strokes crossed by a diagonal 5th stroke represents a bundle of 5. Bundles plus remaining strokes give the frequency.',
    hints: [
      '3 strokes is 3, 4 strokes is 4.',
      'A bundle of 4 with a diagonal slash represents 5.',
      'A bundle of 5 plus 3 single strokes equals 5 + 3 = 8.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_15',
    nodeId: NODE_C9_MATH_048,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A teacher tabulates shoe sizes for 25 students: Size 5 (f=4), Size 6 (f=9), Size 7 (f=7), Size 8 (f=x). Find the missing frequency x for Size 8.',
    correctAnswer: 5,
    tolerance: 0,
    unit: 'students',
    explanation: 'Sum of all frequencies Σf must equal total observations N = 25. Therefore 4 + 9 + 7 + x = 25 ⇒ 20 + x = 25 ⇒ x = 5.',
    hints: [
      'The sum of all frequencies must equal the total number of students (25).',
      'Add the known frequencies: 4 + 9 + 7 = 20.',
      'Subtract 20 from 25 to find x.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_16',
    nodeId: NODE_C9_MATH_049,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following represents a CONTINUOUS statistical variable?',
    options: [
      'Number of siblings in an Indian household',
      'Number of defective bulbs in a batch produced in Chennai',
      'Body temperature of patients measured in a clinic (in °C)',
      'Number of pages in a Class 9 ICSE textbook',
    ],
    correctIndex: 2,
    explanation: 'Temperature is obtained by measurement and can take any real value on a continuum (e.g. 37.24°C). The others are obtained by counting whole items.',
    hints: [
      'Ask: Is this quantity counted (whole numbers with gaps) or measured on a smooth scale?',
      'Siblings, bulbs, and pages are counted in whole numbers (discrete).',
      'Temperature is measured continuously with infinite precision possible.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_17',
    nodeId: NODE_C9_MATH_049,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A student claims: "Shoe sizes (6, 6.5, 7, 7.5, 8) are continuous variables because they include fractional decimal values." Evaluate this claim.',
    options: [
      'Valid — any variable with decimal points is strictly continuous',
      'Invalid — shoe sizes are discrete because only specific manufactured step values exist (no size 6.719 exists)',
      'Valid — shoe sizes represent foot length which is continuous',
      'Invalid — shoe size is a qualitative categorical variable, not numerical',
    ],
    correctIndex: 1,
    explanation: 'Discrete variables can take fractional values if there are distinct, isolated gaps between allowed values. You cannot buy size 6.719; only fixed discrete intervals are manufactured.',
    hints: [
      'Can you walk into a store and buy a shoe of size 7.3821?',
      'No, because only fixed step sizes are produced.',
      'Having decimals does not make a variable continuous if clear gaps exist between valid values.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_18',
    nodeId: NODE_C9_MATH_050,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Calculate the arithmetic mean of the five numbers: 14, 22, 18, 26, 20.',
    correctAnswer: 20,
    tolerance: 0,
    unit: '',
    explanation: 'Sum Σx = 14 + 22 + 18 + 26 + 20 = 100. Count n = 5. Mean x̄ = 100 / 5 = 20.',
    hints: [
      'Add all 5 values together.',
      'Sum = 100.',
      'Divide the sum by 5: 100 / 5 = 20.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_19',
    nodeId: NODE_C9_MATH_050,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The mean score of 6 math tests is 75 marks. Five of the test scores are 70, 80, 65, 85, 72. Find the missing 6th test score.',
    correctAnswer: 78,
    tolerance: 0,
    unit: 'marks',
    explanation: 'Total required sum = mean × n = 75 × 6 = 450. Sum of 5 known scores = 70 + 80 + 65 + 85 + 72 = 372. Missing score = 450 - 372 = 78 marks.',
    hints: [
      'Calculate the total required sum: Mean × count = 75 × 6 = 450.',
      'Sum the 5 known scores: 70 + 80 + 65 + 85 + 72 = 372.',
      'Subtract: 450 - 372 = 78.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_20',
    nodeId: NODE_C9_MATH_050,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A discrete survey of goals scored in 20 football matches in Goa gives: 0 goals (f=4), 1 goal (f=8), 2 goals (f=5), 3 goals (f=3). Calculate the exact mean goals per match.',
    correctAnswer: 1.35,
    tolerance: 0.02,
    unit: 'goals',
    explanation: 'Σ(f·x) = (0×4) + (1×8) + (2×5) + (3×3) = 0 + 8 + 10 + 9 = 27. Total matches Σf = 4 + 8 + 5 + 3 = 20. Mean = 27 / 20 = 1.35 goals.',
    hints: [
      'Multiply each value x by its frequency f to get f·x.',
      'Sum the f·x values: 0 + 8 + 10 + 9 = 27.',
      'Divide by the total frequency Σf = 20: 27 / 20 = 1.35.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_21',
    nodeId: NODE_C9_MATH_042,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the algebraic identity expressing the relationship between the area of triangle PQR and parallelogram PQRS on the same base PQ between parallel lines.',
    availableParts: ['ar(ΔPQR)', '=', '2 ×', '1/2 ×', 'ar(PQRS)', '+', 'h'],
    targetState: 'ar(ΔPQR) = 1/2 × ar(PQRS)',
    validationHint: 'Select parts to form: ar(ΔPQR) = 1/2 × ar(PQRS)',
    explanation: 'The area of a triangle sharing a base with a parallelogram between the same parallel lines is exactly half the area of the parallelogram.',
    hints: [
      'Start with ar(ΔPQR) on the left side.',
      'Add the equals sign.',
      'Triangle area is half: combine "1/2 ×" with "ar(PQRS)".',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_22',
    nodeId: NODE_C9_MATH_050,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'The mean weight of 24 students in a Mumbai classroom is 45 kg. If the class teacher weighing 65 kg is included, find the new mean weight in kg.',
    correctAnswer: 45.8,
    tolerance: 0.05,
    unit: 'kg',
    explanation: 'Original total weight = 24 × 45 = 1080 kg. New total weight = 1080 + 65 = 1145 kg. New total count = 25. New mean = 1145 / 25 = 45.8 kg.',
    hints: [
      'Find the total weight of the 24 students: 24 × 45 = 1080 kg.',
      'Add the teacher weight: 1080 + 65 = 1145 kg.',
      'Divide by the new total number of people (25): 1145 / 25 = 45.8 kg.',
    ],
    misconceptionIndex: 1,
  },
];

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Shearing Parallelograms (Area Invariance)',
    instruction: 'Drag the Shear Slider to tilt the parallelogram. Notice how its base and height stay fixed while area remains constant!',
    interactionType: 'shear-observe',
    nodeId: NODE_C9_MATH_041,
  },
  {
    title: 'Triangle vs Parallelogram (1 : 2 Ratio)',
    instruction: 'Move Vertex C along the parallel top rail. Observe that triangle area is always exactly 50% of the enclosing parallelogram.',
    interactionType: 'triangle-slide',
    nodeId: NODE_C9_MATH_042,
  },
  {
    title: 'Chord Midpoint & Right Angle Property',
    instruction: 'Drag the chord distance slider. Watch how the centre-to-midpoint segment OM always forms a 90° angle, enabling Pythagoras theorem!',
    interactionType: 'chord-geometry',
    nodeId: NODE_C9_MATH_043,
  },
  {
    title: 'Arc Length & Central Angle Linkage',
    instruction: 'Adjust the central angle slider. Watch both the subtended arc length and chord length scale synchronously.',
    interactionType: 'arc-angle',
    nodeId: NODE_C9_MATH_045,
  },
  {
    title: 'Statistical Mean as the Balancing Fulcrum',
    instruction: 'Add or modify data points on the number line to see how the arithmetic mean acts as a physical balance fulcrum (Σ(x - x̄) = 0).',
    interactionType: 'mean-balance',
    nodeId: NODE_C9_MATH_050,
  },
];

// ─── PREDICTION & OBSERVATION ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you slide the top vertex of a triangle 8 cm to the right along a parallel rail, what happens to its area?',
    options: [
      'Area increases because the right-hand slant edge gets longer',
      'Area stays completely unchanged because base and vertical height are constant',
      'Area decreases because the shape becomes asymmetrical',
      'Area fluctuates based on whether it passes the midpoint',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the top vertex slider to test your prediction in real-time!',
    nodeId: NODE_C9_MATH_042,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the sum of deviations around the mean fulcrum (Σ(x - x̄))?',
    observableOptions: [
      'It is always positive',
      'It always sums exactly to 0, balancing the weights',
      'It depends on whether data is raw or arrayed',
      'It equals the total range of the data',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_MATH_050,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Architectural Blueprint & Census Audit Project',
  description: 'Design a roof truss with two overlapping parallel frames, compute the chord length for an observatory dome of radius 15 m with support distance 9 m, and organize a 20-household survey into a tally frequency table.',
  steps: [
    'Draw two parallelograms with base 12 m and height 5 m; verify both enclose 60 m² regardless of shear.',
    'Apply Pythagoras: Chord length = 2 × √(15² - 9²) = 2 × 12 = 24 m.',
    'Collect sample household sizes: [3, 4, 2, 5, 4, 3, 4, 2, 3, 4]. Array and tally them.',
    'Calculate the sample mean: (3+4+2+5+4+3+4+2+3+4) / 10 = 34 / 10 = 3.4 people/household.',
  ],
};

// ─── REFLECTION QUESTIONS ─���─
const REFLECTION_PROMPTS = [
  {
    id: 'q1',
    prompt: 'What was the most surprising thing you learned?',
    placeholder: 'e.g., That shearing a parallelogram changes its perimeter but its area remains strictly constant...',
  },
  {
    id: 'q2',
    prompt: 'How would you explain the 1:2 triangle-parallelogram theorem to a friend?',
    placeholder: 'e.g., Any triangle sharing the same base and height fills exactly half the bounding parallel box...',
  },
  {
    id: 'q3',
    prompt: 'Where in real life might you use chord geometry or mean fulcrums?',
    placeholder: 'e.g., Designing curved bridge arches, dome roof supports, or balancing structural loads evenly...',
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C9_MATH_041,
  title: 'Area Theorems, Circle Properties & Statistics Mastery',
  definition: 'Comprehensive ICSE Class 9 suite covering parallelogram & triangle area theorems on equal bases between same parallels, chord perpendicular bisectors & equidistant properties, arc-angle theorems, tally tabulation of raw/arrayed data, discrete vs continuous variables, and arithmetic mean.',
  eli5: 'Think of leaning book stacks that take the same shelf space, circular cake slices with equal crusts, and a physical balancing see-saw where weights on both sides balance at the mean!',
  misconceptions: [
    {
      misconception: 'Longer slant sides mean greater area in parallelograms and triangles.',
      correction: 'Area depends strictly on base × perpendicular height. Slant length does not affect 2D enclosed area.',
    },
    {
      misconception: 'Triangles on the same base between same parallels are congruent.',
      correction: 'They are equal in AREA (1/2 b h), but their side lengths and angles can be completely different (non-congruent).',
    },
    {
      misconception: 'A chord farther from the centre is longer.',
      correction: 'The opposite is true: longer chords lie closer to the centre. The diameter is closest (distance = 0).',
    },
    {
      misconception: 'Variables with decimal values are automatically continuous.',
      correction: 'Variables like shoe sizes (6, 6.5, 7) are discrete because they have fixed gaps and cannot take arbitrary values like 6.721.',
    },
    {
      misconception: 'In a frequency table mean, divide by the number of distinct values instead of total frequency Σf.',
      correction: 'The arithmetic mean requires dividing total sum Σ(f·x) by total observations Σf = n, not the number of rows.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Parallelograms on the same base and between same parallels have:', options: ['Equal perimeters', 'Equal areas', 'Equal diagonals', 'Equal acute angles'], correctIndex: 1 },
    { question: 'The perpendicular from the centre to a chord:', options: ['Trisects the chord', 'Bisects the chord at 90°', 'Is equal to the radius', 'Doubles the chord'], correctIndex: 1 },
    { question: 'Equal chords in a circle are:', options: ['Equidistant from the centre', 'Parallel to each other', 'Intersecting at 90°', 'Always diameters'], correctIndex: 0 },
    { question: 'Equal central angles in a circle subtend:', options: ['Equal arcs and equal chords', 'Unequal arcs', 'Tangents at 45°', 'Major arcs only'], correctIndex: 0 },
    { question: 'Data recorded in the exact order of collection is:', options: ['Grouped data', 'Arrayed data', 'Raw data', 'Frequency polygon'], correctIndex: 2 },
    { question: 'Which variable is discrete?', options: ['Weight of rice in kg', 'Time taken to run 100m', 'Number of cricket wickets', 'Room temperature in °C'], correctIndex: 2 },
    { question: 'The mean of 10, 20, 30, 40 is:', options: ['20', '25', '30', '100'], correctIndex: 1 },
    { question: 'If the mean of 4 numbers is 12, their sum is:', options: ['3', '16', '48', '36'], correctIndex: 2 },
  ],
  masteryCriteria: 'Mastery of ICSE Class 9 geometry theorems and statistics with 80%+ accuracy.',
};

// ─── MAIN COMPONENT ───
export default function C9_MathematicsAreaTheoremsParallelogramsSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C9_MATH_041,
  title = DEFAULT_PROPS.title || 'Area Theorems, Circles & Statistics',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase management
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant.org interactive discovery & prediction states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Interactive Exploration & Sandbox Sliders / Geometry states
  const [baseLength, setBaseLength] = useState(140);
  const [perpHeight, setPerpHeight] = useState(80);
  const [shearX, setShearX] = useState(40);
  const [triangleVertexX, setTriangleVertexX] = useState(70);
  const [circleRadius, setCircleRadius] = useState(80);
  const [chordDist, setChordDist] = useState(48);
  const [arcAngleDeg, setArcAngleDeg] = useState(70);
  const [activeGeoTab, setActiveGeoTab] = useState<'shear' | 'triangle' | 'chord' | 'arc' | 'stats'>('shear');

  // Stats Interactive state
  const [statsData, setStatsData] = useState<number[]>([12, 16, 18, 22, 32]);
  const [newDataInput, setNewDataInput] = useState('');

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
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag and Drop & Construct Challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Reflection responses state
  const [reflections, setReflections] = useState<Record<string, string>>({
    q1: '',
    q2: '',
    q3: '',
  });
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Feedback components state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs for BKT, Auto-hint Timer & Canvas
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Derived Geometry values
  const halfChordLength = useMemo(() => {
    if (chordDist >= circleRadius) return 0;
    return Math.sqrt(circleRadius * circleRadius - chordDist * chordDist);
  }, [circleRadius, chordDist]);

  const fullChordLength = useMemo(() => halfChordLength * 2, [halfChordLength]);

  const parallelogramArea = useMemo(() => (baseLength * perpHeight) / 100, [baseLength, perpHeight]);
  const triangleArea = useMemo(() => parallelogramArea / 2, [parallelogramArea]);

  // Derived Statistics values
  const statsMean = useMemo(() => {
    if (statsData.length === 0) return 0;
    const sum = statsData.reduce((acc, val) => acc + val, 0);
    return sum / statsData.length;
  }, [statsData]);

  const statsRange = useMemo(() => {
    if (statsData.length === 0) return 0;
    return Math.max(...statsData) - Math.min(...statsData);
  }, [statsData]);

  // Filter challenges by adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM MASTERY STORE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT DIFFICULTY ADAPTATION ───
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

  // ─── 2D CANVAS ANIMATION ───
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
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 2) {
        const y = 20 + Math.sin((x + frame * 2) * 0.05) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── USECALLBACK HANDLERS ───
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
      speechManager.speak('Let us review the step-by-step mathematical proof.');
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Geometric Exploration Lab.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Explore the geometric parameters freely in sandbox mode.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode initiated. Solve with rigorous mathematical reasons.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Move the interactive slider to test it.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent observation!' : 'Check the fulcrum deviation sum closely.');
  }, []);

  const handleAddStatsPoint = useCallback(() => {
    const num = parseFloat(newDataInput);
    if (!isNaN(num)) {
      setStatsData(prev => [...prev, num].sort((a, b) => a - b));
      setNewDataInput('');
      audioManager.play('pop');
    }
  }, [newDataInput]);

  const handleRemoveStatsPoint = useCallback((index: number) => {
    setStatsData(prev => prev.filter((_, i) => i !== index));
    audioManager.play('tap');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You scored ${finalScore} percent on ICSE Mathematics Mastery.`);
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
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Spot on! Excellent geometric deduction.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
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
        speechManager.speak('Review the ICSE model answer and justification.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 3000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

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
      const arr = prev.length === 0 && challenge.sortItems
        ? challenge.sortItems.map((_, i) => i)
        : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0
      ? sortArrangement
      : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleSaveReflection = useCallback(() => {
    setReflectionSaved(true);
    audioManager.play('success');
    speechManager.speak('Reflections recorded. Excellent synthesis of core mathematical ideas!');
  }, []);

  // Clean up timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="text-3xl p-2 bg-indigo-900/40 rounded-2xl border border-indigo-700/50 inline-block"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
            <p className="text-xs text-indigo-300 font-medium">Class 9 ICSE • Mathematics Suite (Nodes c9_math_041 to c9_math_050)</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${
              difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
              : difficulty === 'advanced' ? 'bg-rose-950 text-rose-400 border-rose-700'
              : 'bg-indigo-950 text-indigo-400 border-indigo-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs px-2.5 py-1 bg-slate-800 rounded-full text-slate-300 border border-slate-700 font-mono"
          >
            Mastery: {masteryLevel}
          </motion.span>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
        {phase === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-5 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-700/50"
            >
              <h2 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
                <span>🏛️</span> {SCENARIO.title}
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs text-indigo-400 mt-2 font-mono">{SCENARIO.context}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
                <span>⚡</span> Curiosity Discovery Hook (Non-Graded Intuition Test)
              </div>
              <p className="text-base text-white font-medium">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, backgroundColor: '#1e293b' }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-900/60 border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-indigo-500'
                    }`}
                  >
                    <div>
                      <span className="font-mono text-xs font-bold mr-2 opacity-60">[{String.fromCharCode(65 + i)}]</span>
                      {opt}
                    </div>
                    {discoveryAnswered && (
                      <span className="font-bold text-base ml-2">
                        {i === DISCOVERY_QUESTION.correctIndex ? '✓' : '✗'}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className={`p-4 rounded-xl text-sm border ${discoveryCorrect ? 'bg-emerald-950/40 border-emerald-600 text-emerald-300' : 'bg-amber-950/40 border-amber-600 text-amber-300'}`}
                  >
                    {discoveryCorrect ? '✓ Brilliant! You recognized that 2D area depends purely on base and perpendicular height.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    aria-label="Enter Interactive Exploration Lab"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                  >
                    Enter Interactive Exploration Lab →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
        {phase === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mt-6 space-y-6"
          >
            {/* Step Navigation Pill */}
            <motion.div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {EXPLORATION_STEPS.map((step, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}: ${step.title}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      currentSlide === idx ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {idx + 1}. {step.title.split(' ')[0]}
                  </motion.button>
                ))}
              </div>
              <span className="text-xs text-indigo-300 font-mono font-bold">Step {currentSlide + 1} / 5</span>
            </motion.div>

            {/* Active Lab Card */}
            <motion.div
              layout
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-indigo-400">🔬</span> {EXPLORATION_STEPS[currentSlide].title}
                </h2>
                <p className="text-sm text-amber-300 font-medium mt-1">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* LAB 1: SHEARING PARALLELOGRAMS */}
              {currentSlide === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 460 220" className="w-full max-w-lg h-auto" role="img" aria-label="Interactive shearing parallelogram geometry diagram">
                      <line x1="20" y1="40" x2="440" y2="40" stroke="#475569" strokeDasharray="4 4" strokeWidth="1.5" />
                      <line x1="20" y1="160" x2="440" y2="160" stroke="#475569" strokeDasharray="4 4" strokeWidth="1.5" />
                      <text x="30" y="35" fill="#94a3b8" fontSize="10">Line l₁ (Top Parallel)</text>
                      <text x="30" y="180" fill="#94a3b8" fontSize="10">Line l₂ (Base Parallel)</text>

                      <polygon
                        points={`60,160 ${60 + baseLength},160 ${60 + baseLength},${160 - perpHeight} 60,${160 - perpHeight}`}
                        fill="#312e81"
                        fillOpacity="0.25"
                        stroke="#4338ca"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />

                      <polygon
                        points={`60,160 ${60 + baseLength},160 ${60 + baseLength + shearX},${160 - perpHeight} ${60 + shearX},${160 - perpHeight}`}
                        fill="#6366f1"
                        fillOpacity="0.4"
                        stroke="#818cf8"
                        strokeWidth="2.5"
                      />

                      <circle cx="60" cy="160" r="4" fill="#38bdf8" />
                      <text x="50" y="175" fill="#38bdf8" fontSize="11" fontWeight="bold">A</text>
                      <circle cx={60 + baseLength} cy="160" r="4" fill="#38bdf8" />
                      <text x={65 + baseLength} y="175" fill="#38bdf8" fontSize="11" fontWeight="bold">B</text>
                      <circle cx={60 + baseLength + shearX} cy={160 - perpHeight} r="4" fill="#38bdf8" />
                      <text x={65 + baseLength + shearX} y={150 - perpHeight} fill="#38bdf8" fontSize="11" fontWeight="bold">C</text>
                      <circle cx={60 + shearX} cy={160 - perpHeight} r="4" fill="#38bdf8" />
                      <text x={50 + shearX} y={150 - perpHeight} fill="#38bdf8" fontSize="11" fontWeight="bold">D</text>

                      <line x1="40" y1="160" x2="40" y2={160 - perpHeight} stroke="#f59e0b" strokeWidth="2" />
                      <line x1="35" y1="160" x2="45" y2="160" stroke="#f59e0b" strokeWidth="2" />
                      <line x1="35" y1={160 - perpHeight} x2="45" y2={160 - perpHeight} stroke="#f59e0b" strokeWidth="2" />
                      <text x="15" y={160 - perpHeight / 2} fill="#f59e0b" fontSize="11" fontWeight="bold">h={perpHeight}</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Horizontal Shear Offset (dx):</span>
                        <span className="font-mono text-indigo-400 font-bold">{shearX} px</span>
                      </div>
                      <input
                        type="range"
                        min={-80}
                        max={120}
                        value={shearX}
                        aria-label="Adjust Horizontal Shear Offset"
                        onChange={(e) => {
                          setShearX(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </motion.div>
                    <motion.div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Base Length (AB):</span>
                        <span className="font-mono text-indigo-400 font-bold">{baseLength} px</span>
                      </div>
                      <input
                        type="range"
                        min={80}
                        max={200}
                        value={baseLength}
                        aria-label="Adjust Parallelogram Base Length"
                        onChange={(e) => {
                          setBaseLength(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ scale: 0.98 }}
                    animate={{ scale: 1 }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-around text-center text-xs"
                  >
                    <div>
                      <span className="text-slate-400">Enclosed Area:</span>
                      <p className="text-lg font-black text-emerald-400">{parallelogramArea.toFixed(1)} units²</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Slant Length (AD):</span>
                      <p className="text-lg font-black text-indigo-300">{Math.sqrt(shearX * shearX + perpHeight * perpHeight).toFixed(1)} units</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Theorem Status:</span>
                      <p className="text-lg font-black text-amber-400">✓ Area Invariant</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* LAB 2: TRIANGLE VS PARALLELOGRAM */}
              {currentSlide === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  {!predictionMade ? (
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-700/60 space-y-3"
                    >
                      <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Predict option ${i + 1}: ${opt}`}
                            className="p-2.5 bg-slate-800 rounded-lg text-left text-xs text-slate-200 hover:bg-slate-700 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-3 bg-emerald-950/40 border border-emerald-600 rounded-xl text-xs text-emerald-300 flex items-center gap-2"
                    >
                      <span>✓</span> {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </motion.div>
                  )}

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 460 200" className="w-full max-w-lg h-auto" role="img" aria-label="Triangle versus parallelogram area ratio demonstration">
                      <polygon
                        points={`60,150 ${60 + baseLength},150 ${60 + baseLength + 30},50 90,50`}
                        fill="#1e293b"
                        stroke="#475569"
                        strokeWidth="1.5"
                      />
                      <polygon
                        points={`60,150 ${60 + baseLength},150 ${60 + triangleVertexX},50`}
                        fill="#f59e0b"
                        fillOpacity="0.4"
                        stroke="#fbbf24"
                        strokeWidth="2.5"
                      />
                      <circle cx="60" cy="150" r="4" fill="#38bdf8" />
                      <text x="45" y="160" fill="#38bdf8" fontSize="10">A</text>
                      <circle cx={60 + baseLength} cy="150" r="4" fill="#38bdf8" />
                      <text x={65 + baseLength} y="160" fill="#38bdf8" fontSize="10">B</text>
                      <circle cx={60 + triangleVertexX} cy="50" r="5" fill="#f59e0b" />
                      <text x={60 + triangleVertexX} y="40" fill="#f59e0b" fontSize="11" fontWeight="bold">Vertex C (Drag)</text>
                    </svg>
                  </div>

                  <motion.div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Vertex C Position along Top Parallel:</span>
                      <span className="font-mono text-amber-400 font-bold">{triangleVertexX} px</span>
                    </div>
                    <input
                      type="range"
                      min={-20}
                      max={baseLength + 60}
                      value={triangleVertexX}
                      aria-label="Adjust Vertex C Position along parallel rail"
                      onChange={(e) => {
                        setTriangleVertexX(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.98 }}
                    animate={{ scale: 1 }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-3 gap-2 text-center text-xs"
                  >
                    <div>
                      <span className="text-slate-400">ar(Parallelogram):</span>
                      <p className="text-base font-black text-indigo-400">{(baseLength * 100) / 100} u²</p>
                    </div>
                    <div>
                      <span className="text-slate-400">ar(Triangle ABC):</span>
                      <p className="text-base font-black text-amber-400">{((baseLength * 100) / 200).toFixed(1)} u²</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Ratio ar(Δ) : ar(||gm):</span>
                      <p className="text-base font-black text-emerald-400">1 : 2 (Exact)</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* LAB 3: CHORD PERPENDICULAR BISECTOR & PYTHAGORAS */}
              {currentSlide === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 300 240" className="w-full max-w-xs h-auto" role="img" aria-label="Circle chord geometry diagram with perpendicular bisector">
                      <circle cx="150" cy="120" r={circleRadius} fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="150" cy="120" r="4" fill="#a855f7" />
                      <text x="155" y="115" fill="#a855f7" fontSize="11" fontWeight="bold">O (Centre)</text>

                      {halfChordLength > 0 && (
                        <>
                          <line
                            x1={150 - halfChordLength}
                            y1={120 + chordDist}
                            x2={150 + halfChordLength}
                            y2={120 + chordDist}
                            stroke="#22c55e"
                            strokeWidth="3"
                          />
                          <circle cx="150" cy={120 + chordDist} r="4" fill="#22c55e" />
                          <text x="155" y={135 + chordDist} fill="#22c55e" fontSize="10" fontWeight="bold">M</text>
                          <line x1="150" y1="120" x2="150" y2={120 + chordDist} stroke="#f59e0b" strokeWidth="2" />
                          <rect x="142" y={112 + chordDist} width="8" height="8" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                          <line x1="150" y1="120" x2={150 - halfChordLength} y2={120 + chordDist} stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                          <text x={140 - halfChordLength / 2} y={115 + chordDist / 2} fill="#38bdf8" fontSize="9">r={circleRadius}</text>
                        </>
                      )}
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Perpendicular Distance OM (d):</span>
                        <span className="font-mono text-amber-400 font-bold">{chordDist} px</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={circleRadius - 5}
                        value={chordDist}
                        aria-label="Adjust Chord Perpendicular Distance"
                        onChange={(e) => {
                          setChordDist(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </motion.div>
                    <motion.div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Circle Radius (r):</span>
                        <span className="font-mono text-indigo-400 font-bold">{circleRadius} px</span>
                      </div>
                      <input
                        type="range"
                        min={60}
                        max={100}
                        value={circleRadius}
                        aria-label="Adjust Circle Radius"
                        onChange={(e) => {
                          setCircleRadius(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1 text-slate-300"
                  >
                    <p className="text-indigo-300 font-bold">Pythagoras Deduction in ΔOMA (Right-angled at M):</p>
                    <p>• r² = d² + (AB / 2)²  ⇒  {circleRadius}² = {chordDist}² + ({halfChordLength.toFixed(1)})²</p>
                    <p>• Chord Length AB = 2 × √({circleRadius}² - {chordDist}²) = <span className="text-emerald-400 font-bold">{fullChordLength.toFixed(1)} px</span></p>
                  </motion.div>
                </motion.div>
              )}

              {/* LAB 4: ARC PROPERTIES & EQUAL ANGLES */}
              {currentSlide === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 300 240" className="w-full max-w-xs h-auto" role="img" aria-label="Circle arc and central angle relationship diagram">
                      <circle cx="150" cy="120" r="75" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                      <circle cx="150" cy="120" r="4" fill="#a855f7" />
                      <text x="155" y="115" fill="#a855f7" fontSize="10">O</text>

                      {(() => {
                        const rad = (arcAngleDeg * Math.PI) / 180;
                        const x1 = 150 + 75 * Math.cos(-rad / 2);
                        const y1 = 120 + 75 * Math.sin(-rad / 2);
                        const x2 = 150 + 75 * Math.cos(rad / 2);
                        const y2 = 120 + 75 * Math.sin(rad / 2);
                        return (
                          <>
                            <line x1="150" y1="120" x2={x1} y2={y1} stroke="#6366f1" strokeWidth="1.5" />
                            <line x1="150" y1="120" x2={x2} y2={y2} stroke="#6366f1" strokeWidth="1.5" />
                            <path
                              d={`M ${x1} ${y1} A 75 75 0 0 1 ${x2} ${y2}`}
                              fill="none"
                              stroke="#ec4899"
                              strokeWidth="4"
                            />
                            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3 3" />
                          </>
                        );
                      })()}
                    </svg>
                  </div>

                  <motion.div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Central Subtended Angle (θ):</span>
                      <span className="font-mono text-pink-400 font-bold">{arcAngleDeg}°</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={160}
                      value={arcAngleDeg}
                      aria-label="Adjust Central Subtended Angle"
                      onChange={(e) => {
                        setArcAngleDeg(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-pink-500 cursor-pointer"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.98 }}
                    animate={{ scale: 1 }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-2 gap-2 text-center text-xs"
                  >
                    <div>
                      <span className="text-slate-400">Arc Length (s = rθ):</span>
                      <p className="text-base font-black text-pink-400">{((75 * arcAngleDeg * Math.PI) / 180).toFixed(1)} px</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Subtended Chord Length:</span>
                      <p className="text-base font-black text-emerald-400">{(2 * 75 * Math.sin(((arcAngleDeg / 2) * Math.PI) / 180)).toFixed(1)} px</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* LAB 5: STATISTICAL MEAN AS FULCRUM */}
              {currentSlide === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="text-xs text-slate-400">Interactive Data Points (Click to delete):</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="Add value"
                          value={newDataInput}
                          aria-label="New statistical data point value"
                          onChange={(e) => setNewDataInput(e.target.value)}
                          className="w-24 px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleAddStatsPoint}
                          aria-label="Add data point to dataset"
                          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold"
                        >
                          + Add
                        </motion.button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {statsData.map((val, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRemoveStatsPoint(idx)}
                          aria-label={`Remove data value ${val}`}
                          className="px-3 py-1.5 bg-indigo-950/80 border border-indigo-700 text-indigo-200 rounded-lg text-xs font-mono font-bold hover:bg-rose-900/60 hover:border-rose-600"
                        >
                          {val} ✕
                        </motion.button>
                      ))}
                    </div>

                    {/* Physical Fulcrum Visualization */}
                    <div className="relative h-20 w-full flex items-center justify-center">
                      <div className="absolute w-full h-2 bg-slate-700 rounded-full" />
                      <div
                        className="absolute flex flex-col items-center transition-all duration-300"
                        style={{
                          left: `${Math.min(90, Math.max(10, ((statsMean - 5) / 40) * 100))}%`,
                          transform: 'translateX(-50%)',
                        }}
                      >
                        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[16px] border-b-amber-400" />
                        <span className="text-[10px] font-mono font-bold text-amber-300 mt-1">Mean x̄ = {statsMean.toFixed(1)}</span>
                      </div>

                      {statsData.map((val, idx) => (
                        <div
                          key={idx}
                          className="absolute w-3 h-3 bg-emerald-400 rounded-full border border-slate-900 -top-1"
                          style={{
                            left: `${Math.min(95, Math.max(5, ((val - 5) / 40) * 100))}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {!observationAnswered ? (
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-700/60 space-y-3"
                    >
                      <p className="text-sm font-semibold text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleObservation(i)}
                            aria-label={`Select observation option: ${opt}`}
                            className="p-2.5 bg-slate-800 rounded-lg text-left text-xs text-slate-200 hover:bg-slate-700 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-3 bg-emerald-950/40 border border-emerald-600 rounded-xl text-xs text-emerald-300 flex items-center gap-2"
                    >
                      <span>✓</span> Observation verified: The mean is precisely the point where algebraic sum of deviations Σ(x - x̄) = 0!
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Prev / Next Exploration Controls */}
            <div className="flex items-center justify-between pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                aria-label="Previous Exploration Lab"
                className="px-4 py-2 bg-slate-800 disabled:opacity-40 text-white rounded-xl text-xs font-bold border border-slate-700"
              >
                ← Previous Lab
              </motion.button>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => s + 1)}
                  aria-label="Next Exploration Lab"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  aria-label="Enter Free Sandbox Mode"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                >
                  Enter Free Sandbox Mode →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="mt-6 space-y-6"
          >
            <motion.div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>🎨</span> Geometric & Statistical Sandbox
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Play freely with no scoring or pressure to build deep structural intuition.</p>
                </div>
                <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto">
                  {(['shear', 'triangle', 'chord', 'arc', 'stats'] as const).map(tab => (
                    <motion.button
                      key={tab}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveGeoTab(tab)}
                      aria-label={`Switch to ${tab} sandbox`}
                      className={`px-3 py-1.5 rounded-lg capitalize font-bold transition-all ${
                        activeGeoTab === tab ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Sandbox Canvas / Controls */}
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 min-h-[260px] flex flex-col justify-center">
                {activeGeoTab === 'shear' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Shear: {shearX}px | Base: {baseLength}px | Height: {perpHeight}px</span>
                      <span className="font-bold text-emerald-400">Area: {parallelogramArea} u²</span>
                    </div>
                    <input
                      type="range"
                      min={-100}
                      max={140}
                      value={shearX}
                      aria-label="Adjust parallelogram shear in sandbox"
                      onChange={(e) => setShearX(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </motion.div>
                )}
                {activeGeoTab === 'triangle' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Vertex Position: {triangleVertexX}px</span>
                      <span className="font-bold text-amber-400">Triangle Area: {triangleArea} u² (50%)</span>
                    </div>
                    <input
                      type="range"
                      min={-40}
                      max={baseLength + 40}
                      value={triangleVertexX}
                      aria-label="Adjust triangle vertex in sandbox"
                      onChange={(e) => setTriangleVertexX(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </motion.div>
                )}
                {activeGeoTab === 'chord' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Radius r: {circleRadius}px | Distance d: {chordDist}px</span>
                      <span className="font-bold text-emerald-400">Chord Length: {fullChordLength.toFixed(1)}px</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={circleRadius - 2}
                      value={chordDist}
                      aria-label="Adjust chord distance in sandbox"
                      onChange={(e) => setChordDist(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </motion.div>
                )}
                {activeGeoTab === 'arc' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Central Angle θ: {arcAngleDeg}°</span>
                      <span className="font-bold text-pink-400">Subtends congruent arc & chord</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={170}
                      value={arcAngleDeg}
                      aria-label="Adjust central arc angle in sandbox"
                      onChange={(e) => setArcAngleDeg(Number(e.target.value))}
                      className="w-full accent-pink-500 cursor-pointer"
                    />
                  </motion.div>
                )}
                {activeGeoTab === 'stats' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-xs">
                    <p className="text-slate-300">Current Dataset: [{statsData.join(', ')}]</p>
                    <p className="font-bold text-amber-300">Computed Mean: {statsMean.toFixed(2)} | Range: {statsRange}</p>
                  </motion.div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Proceed to ICSE Challenges"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
              >
                Ready for ICSE Challenges! →
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 4: CHALLENGE SUITE ─── */}
        {phase === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 space-y-6"
          >
            {/* Top Challenge Status & Animated Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-indigo-400 font-mono font-bold uppercase tracking-wider">
                  Competency: {challenge.competencyLevel}
                </span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Dynamic 2D Visual Wave Header Canvas */}
            <canvas ref={canvasRef} width={400} height={40} className="w-full h-8 rounded-lg bg-slate-950 border border-slate-800" />

            {/* Main Challenge Card */}
            <motion.div
              layout
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <motion.span
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-xs px-2 py-0.5 bg-indigo-950 text-indigo-300 font-mono rounded border border-indigo-700"
                  >
                    {challenge.nodeId}
                  </motion.span>
                  <span className="text-xs text-slate-500 font-mono">ID: {challenge.id}</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white leading-snug">{challenge.question}</h2>
              </div>

              {/* TYPE 1: MCQ */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Select choice ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${
                        wrongFlash
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950'
                          : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-indigo-500 hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <span className="font-mono text-xs font-bold mr-2 text-indigo-400">({String.fromCharCode(65 + i)})</span>
                        {opt}
                      </div>
                      {showExplanation && (
                        <span className="font-bold text-sm ml-2">
                          {i === challenge.correctIndex ? '✓' : '✗'}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* TYPE 2: DRAG-LABEL */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        role="button"
                        aria-label={`Draggable tally label ${item.label}`}
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3.5 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-white font-mono text-sm cursor-grab shadow font-bold"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {Object.keys(challenge.correctMapping || {}).map((targetId) => (
                      <motion.div
                        key={targetId}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId)}
                        role="region"
                        aria-label={`Drop target for ${targetId.replace('_', ' ')}`}
                        className="p-4 bg-slate-950 border-2 border-dashed border-slate-700 rounded-xl text-center space-y-1"
                      >
                        <span className="text-xs text-slate-400 font-bold uppercase">{targetId.replace('_', ' ')}:</span>
                        <div className="h-10 flex items-center justify-center font-mono font-bold text-lg text-emerald-400">
                          {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : <span className="text-slate-600 text-xs font-sans">Drop matching tally here</span>}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation}
                    aria-label="Verify Drag Labels"
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg"
                  >
                    Verify Drag Labels
                  </motion.button>
                </div>
              )}

              {/* TYPE 3: DRAG-SORT */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      draggable
                      role="button"
                      aria-label={`Proof step ${displayIndex + 1}: ${item}`}
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-900 text-indigo-300 flex items-center justify-center font-mono text-[10px] font-bold">
                        {displayIndex + 1}
                      </span>
                      <span className="flex-1">{item}</span>
                      <span className="text-slate-500 text-xs">↕ Drag</span>
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    aria-label="Verify Proof Step Order"
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg"
                  >
                    Verify Proof Order
                  </motion.button>
                </div>
              )}

              {/* TYPE 4: NUMERIC */}
              {challenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="any"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter numerical answer"
                      aria-label="Enter numerical answer"
                      className="flex-1 px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-indigo-500 outline-none"
                    />
                    {challenge.unit && (
                      <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || numericInput === ''}
                      aria-label="Submit numeric answer"
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg"
                    >
                      Check Answer
                    </motion.button>
                  </div>
                </div>
              )}

              {/* TYPE 5: CONSTRUCT */}
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
                        aria-label={`Add token ${part}`}
                        className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-mono text-indigo-300 font-bold hover:bg-slate-700"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="min-h-[60px] p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 bg-indigo-950 border border-indigo-700 text-indigo-200 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5"
                      >
                        {part}
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                          aria-label={`Remove token ${part}`}
                          className="text-rose-400 hover:text-rose-300 font-bold ml-1"
                        >
                          ✕
                        </motion.button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-slate-600 text-xs">Click available tokens above to assemble formula</span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    aria-label="Verify formula construction"
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg"
                  >
                    Verify Formula
                  </motion.button>
                </div>
              )}

              {/* STEP-BY-STEP PROGRESSIVE DISCLOSURE EXPLANATION */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-700/60 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                      <span>📘</span> ICSE Model Reasoning & Proof Walkthrough
                    </span>
                  </div>

                  <div className="space-y-2">
                    {challenge.explanation
                      .split('. ')
                      .filter(s => s.trim().length > 0)
                      .slice(0, revealedSteps + 1)
                      .map((sentence, i) => (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans flex items-start gap-1"
                        >
                          <span className="font-mono text-indigo-400 font-bold mr-1">{i + 1}.</span>
                          <span>{sentence}{!sentence.endsWith('.') && '.'}</span>
                        </motion.p>
                      ))}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setRevealedSteps(s => s + 1)}
                        aria-label="Reveal Next Reasoning Step"
                        className="px-4 py-2 bg-indigo-800 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold"
                      >
                        Reveal Next Step →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Suite' : 'Next Challenge'}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Suite →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 5: COMPLETION, REFLECTION & REAL-WORLD RETENTION ─── */}
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-6"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-3xl border border-indigo-700/60 text-center space-y-4"
            >
              <span className="text-5xl">🏆</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">ICSE Mathematics Mastery Complete!</h2>
              <p className="text-base text-slate-300">
                Final Accuracy Score: <span className="text-emerald-400 font-bold">{Math.max(0, 100 - errors * 5)}%</span> | Level: <span className="text-indigo-300 font-bold uppercase">{masteryLevel}</span>
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs sm:text-sm text-indigo-200"
              >
                {errors === 0
                  ? '🌟 Flawless Mastery! You have demonstrated comprehensive command of Class 9 geometry theorems and statistics.'
                  : errors <= 3
                  ? '👏 Excellent Performance! Your understanding of area invariance, circle chord geometry, and mean calculation is robust.'
                  : '💪 Good Effort! Review the identified misconceptions below to fortify your understanding before board examinations.'}
              </motion.div>
            </motion.div>

            {/* ── MANDATORY REFLECTION SECTION ── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 rounded-2xl border border-indigo-700/50 space-y-4"
            >
              <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                <span>💭</span> Post-Simulation Deep Reflection
              </h3>
              <p className="text-xs text-slate-400">
                Consolidate your learning by answering these metacognitive prompts:
              </p>

              <div className="space-y-4 pt-1">
                {REFLECTION_PROMPTS.map((item) => (
                  <div key={item.id} className="space-y-1.5">
                    <label htmlFor={item.id} className="text-xs font-semibold text-slate-200">
                      {item.prompt}
                    </label>
                    <textarea
                      id={item.id}
                      rows={2}
                      value={reflections[item.id]}
                      aria-label={item.prompt}
                      placeholder={item.placeholder}
                      onChange={(e) => {
                        const val = e.target.value;
                        setReflections(prev => ({ ...prev, [item.id]: val }));
                      }}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:border-indigo-500 outline-none"
                    />
                  </div>
                ))}

                <div className="flex items-center justify-between pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSaveReflection}
                    aria-label="Save Reflection Responses"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg"
                  >
                    {reflectionSaved ? '✓ Reflection Saved' : 'Save Reflections'}
                  </motion.button>
                  {reflectionSaved && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-emerald-400 font-semibold"
                    >
                      ✓ Saved to learning log!
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Misconception Diagnostic Profile */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-4"
              >
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                  <span>⚠️</span> Identified Misconception Profile
                </h3>
                <div className="space-y-3">
                  {hitMisconceptions.map((idx, i) => {
                    const m = misconceptions?.[idx];
                    if (!m) return null;
                    return (
                      <motion.div
                        key={i}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1"
                      >
                        <p className="text-rose-300 font-bold">✗ Trap: {m.misconception}</p>
                        <p className="text-emerald-300">✓ Correction: {m.correction}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Real-World Activity Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                <span>🏗️</span> Real-World Application Challenge: {REAL_WORLD_ACTIVITY.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
                  >
                    <span className="text-indigo-400 font-mono font-bold">{idx + 1}.</span>
                    <span>{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Spaced Repetition Next Review Banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-amber-950/30 rounded-2xl border border-amber-800/50 flex items-center justify-between text-xs"
            >
              <span className="text-amber-300 flex items-center gap-1.5">
                <span>📅</span> Spaced Repetition: Next scheduled review in <span className="font-bold">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>.
              </span>
              <span className="font-mono text-slate-400">SM-2 Interval</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SIMULATION ENGINE FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}
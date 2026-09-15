'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERALS FOR VERIFICATION) ───
const NODE_C10_MATH_071 = 'c10_math_071'; // Trigonometric identities (sin^2A + cos^2A = 1)
const NODE_C10_MATH_072 = 'c10_math_072'; // Trigonometric identities - proving expressions
const NODE_C10_MATH_073 = 'c10_math_073'; // Heights and distances - angles of elevation
const NODE_C10_MATH_074 = 'c10_math_074'; // Heights and distances - angles of depression
const NODE_C10_MATH_075 = 'c10_math_075'; // Mean of grouped data - direct method
const NODE_C10_MATH_076 = 'c10_math_076'; // Mean of grouped data - short-cut and step-deviation methods
const NODE_C10_MATH_077 = 'c10_math_077'; // Median and mode for raw and grouped data
const NODE_C10_MATH_078 = 'c10_math_078'; // Histogram and finding mode from histogram
const NODE_C10_MATH_079 = 'c10_math_079'; // Ogive (less than) and finding quartiles/median
const NODE_C10_MATH_080 = 'c10_math_080'; // Probability - random experiments, sample space, events

const ALL_NODE_IDS = [
  NODE_C10_MATH_071,
  NODE_C10_MATH_072,
  NODE_C10_MATH_073,
  NODE_C10_MATH_074,
  NODE_C10_MATH_075,
  NODE_C10_MATH_076,
  NODE_C10_MATH_077,
  NODE_C10_MATH_078,
  NODE_C10_MATH_079,
  NODE_C10_MATH_080,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Coastal Engineering & Analytics Mission',
  intro: 'You have been appointed Chief Technical Officer for the Mumbai Coastal Road and Gateway Marine Observatory project. Your team must harness trigonometry to calculate structure heights and survey ships, statistics to analyse concrete strength distributions and commuter traffic, and probability to forecast monsoon storm risks.',
  context: 'Master the 3 pillars of applied ICSE Class 10 Mathematics: Trigonometric Frameworks, Descriptive Statistics & Visualisation, and Foundations of Probability.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In a right-angled marine survey triangle where angle A = 30°, perpendicular p = 1, base b = √3, and hypotenuse r = 2: what is the value of sin²A + cos²A?',
  options: [
    '(1/2) + (√3/2) ≈ 1.366',
    '(1/4) + (3/4) = 1',
    '√3 / 4 ≈ 0.433',
    '2 / 4 = 0.5',
  ],
  correctIndex: 1,
  hintAfter: "Notice how (p/r)² + (b/r)² = (p² + b²)/r² = r²/r² = 1 always! Let's explore the geometric power of this identity.",
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

// ─── 22 RICH ADAPTIVE CHALLENGES (ICSE + NEP 2020) ───
const CHALLENGES: Challenge[] = [
  // Foundation 1: sin^2 + cos^2 = 1 (Node 071 - Recall)
  {
    id: 'ch_math_001',
    nodeId: NODE_C10_MATH_071,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is the fundamental Pythagorean trigonometric identity for 0° ≤ A ≤ 90°?',
    options: [
      'sin A + cos A = 1',
      'sin²A + cos²A = 1',
      '1 + sec²A = tan²A',
      'sin²A - cos²A = 1',
    ],
    correctIndex: 1,
    explanation: 'By the Pythagorean theorem, p² + b² = r². Dividing both sides by r² yields (p/r)² + (b/r)² = 1, which gives sin²A + cos²A = 1.',
    hints: [
      'Remember that ratios are squared before adding.',
      'Think of p²/r² + b²/r² in a right triangle.',
      'The identity is sin²A + cos²A = 1.',
    ],
    misconceptionIndex: 0,
  },
  // Foundation 2: Height and Distance Ratio Selection (Node 073 - Understanding)
  {
    id: 'ch_math_002',
    nodeId: NODE_C10_MATH_073,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A surveyor knows the horizontal distance (adjacent) to the base of the Qutub Minar and wants to find its height (opposite). Which ratio is directly required?',
    options: [
      'sin θ = opposite / hypotenuse',
      'cos θ = adjacent / hypotenuse',
      'tan θ = opposite / adjacent',
      'cot θ = hypotenuse / adjacent',
    ],
    correctIndex: 2,
    explanation: 'When height (opposite) and horizontal distance (adjacent) are the only quantities involved, tan θ = opposite/adjacent is the direct formula.',
    hints: [
      'Identify which sides of the right triangle are involved.',
      'The hypotenuse (line of sight) is neither given nor asked.',
      'Opposite divided by adjacent is tan θ.',
    ],
    misconceptionIndex: 1,
  },
  // Foundation 3: Class Mark of Discontinuous Interval (Node 075 - Understanding)
  {
    id: 'ch_math_003',
    nodeId: NODE_C10_MATH_075,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Calculate the class mark (midpoint) of the discontinuous inclusive class interval 11 – 20.',
    correctAnswer: 15.5,
    tolerance: 0.1,
    unit: '',
    explanation: 'Class mark = (lower limit + upper limit) / 2 = (11 + 20) / 2 = 31 / 2 = 15.5. Treating it as continuous (15) is an examiner-flagged error.',
    hints: [
      'Add the lower limit and upper limit together.',
      '11 + 20 = 31.',
      'Divide 31 by 2 to get 15.5.',
    ],
    misconceptionIndex: 2,
  },
  // Foundation 4: Sample Space of Rolling a Die (Node 080 - Recall)
  {
    id: 'ch_math_004',
    nodeId: NODE_C10_MATH_080,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A fair six-faced die is rolled once. What is the probability of rolling a prime number?',
    options: ['4/6 = 2/3', '3/6 = 1/2', '2/6 = 1/3', '1/6'],
    correctIndex: 1,
    explanation: 'The sample space S = {1, 2, 3, 4, 5, 6}. The prime numbers in S are {2, 3, 5} (note 1 is not prime). P(prime) = 3/6 = 1/2 in simplest form.',
    hints: [
      'List the prime numbers between 1 and 6.',
      'Primes in S are 2, 3, 5 (1 is neither prime nor composite).',
      '3 favourable outcomes out of 6 total gives 1/2.',
    ],
    misconceptionIndex: 3,
  },
  // Foundation 5: Drag-Label Right Triangle & Angles (Node 073/074 - Understanding)
  {
    id: 'ch_math_005',
    nodeId: NODE_C10_MATH_073,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct geometric terminology to each component of the coastal lighthouse survey triangle.',
    dragItems: [
      { label: 'Vertical Height (Opposite)', targetId: 't_vert' },
      { label: 'Horizontal Baseline (Adjacent)', targetId: 't_base' },
      { label: 'Line of Sight (Hypotenuse)', targetId: 't_hyp' },
      { label: 'Angle of Elevation', targetId: 't_ang' },
    ],
    correctMapping: {
      t_vert: 'Vertical Height (Opposite)',
      t_base: 'Horizontal Baseline (Adjacent)',
      t_hyp: 'Line of Sight (Hypotenuse)',
      t_ang: 'Angle of Elevation',
    },
    explanation: 'The vertical structure is opposite to the ground angle, the distance along level ground is adjacent, the sight ray is hypotenuse, and the ground-upward angle is angle of elevation.',
    hints: [
      'The tower stands vertically (opposite the ground observer).',
      'The distance across the ocean/ground is the horizontal baseline.',
      'The slant line of sight connects the eye to the pinnacle.',
    ],
  },
  // Foundation 6: Raw Data Median & Mode (Node 077 - Recall)
  {
    id: 'ch_math_006',
    nodeId: NODE_C10_MATH_077,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Find the median and mode of the raw marks: 4, 8, 3, 8, 9, 8, 10.',
    options: [
      'Median = 8, Mode = 8',
      'Median = 3, Mode = 8',
      'Median = 7, Mode = 9',
      'Median = 8, Mode = 10',
    ],
    correctIndex: 0,
    explanation: 'First array the data: 3, 4, 8, 8, 8, 9, 10 (n = 7). Median is (7+1)/2 = 4th term = 8. Most frequent value is 8 (occurs 3 times).',
    hints: [
      'Sort the numbers in ascending order first!',
      'Find the 4th element in the sorted list.',
      'Count which score appears most often.',
    ],
  },
  // Foundation 7: Angle of Depression Equal to Elevation (Node 074 - Understanding)
  {
    id: 'ch_math_007',
    nodeId: NODE_C10_MATH_074,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does the angle of depression from a 40 m lighthouse to a ship equal the angle of elevation of the lighthouse seen from the ship?',
    options: [
      'Because all right triangles are isosceles',
      'Because the horizontal line at eye level and sea level are parallel, making them alternate interior angles',
      'Because angles in a triangle always sum to 360°',
      'Because sine and cosine are reciprocal ratios',
    ],
    correctIndex: 1,
    explanation: 'The upper horizontal line of sight and the ground baseline are parallel lines cut by the transversal line of sight; hence alternate interior angles are equal.',
    hints: [
      'Think of two parallel horizontal lines.',
      'The line of sight acts as a transversal.',
      'Alternate interior angles between parallel lines are equal.',
    ],
  },
  // Standard 1: Simplifying Trig Expression (Node 071 - Application)
  {
    id: 'ch_math_008',
    nodeId: NODE_C10_MATH_071,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Simplify the expression (1 - cos²A) · cosec²A for 0° < A ≤ 90°.',
    options: ['1', 'sin²A', 'cos²A', 'tan²A'],
    correctIndex: 0,
    explanation: '1 - cos²A = sin²A using the Pythagorean identity. Since cosec²A = 1/sin²A, we have sin²A · (1/sin²A) = 1.',
    hints: [
      'Replace (1 - cos²A) using sin²A + cos²A = 1.',
      'Convert cosec²A into 1/sin²A.',
      'Multiply sin²A by (1/sin²A).',
    ],
  },
  // Standard 2: Step-by-Step Trig Proof Drag-Sort (Node 072 - Analysis)
  {
    id: 'ch_math_009',
    nodeId: NODE_C10_MATH_072,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the logical algebraic steps in correct order to prove: tan A + cot A = 1 / (sin A · cos A).',
    sortItems: [
      'Rewrite LHS using quotients: (sin A / cos A) + (cos A / sin A)',
      'Take LCM of denominators: (sin²A + cos²A) / (sin A · cos A)',
      'Substitute fundamental identity sin²A + cos²A = 1',
      'Conclude LHS = 1 / (sin A · cos A) = RHS',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Proper proof methodology requires transforming one side (LHS) without assuming equality or cross-multiplying.',
    hints: [
      'Start by translating tan and cot into sin and cos.',
      'Combine the two fractions over the common denominator sin A cos A.',
      'Use sin²A + cos²A = 1 in the numerator.',
    ],
  },
  // Standard 3: Numerical Heights & Distances with 45° (Node 073 - Application)
  {
    id: 'ch_math_010',
    nodeId: NODE_C10_MATH_073,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An observer standing 50 metres from the base of a cellular transmission tower observes the angle of elevation of the top to be 45°. What is the height of the tower in metres?',
    correctAnswer: 50,
    tolerance: 0.1,
    unit: 'm',
    explanation: 'tan 45° = height / 50. Since tan 45° = 1, height = 50 × 1 = 50 metres.',
    hints: [
      'tan θ = opposite / adjacent.',
      'tan 45° is exactly 1.',
      'height = 50 × tan 45° = 50 m.',
    ],
  },
  // Standard 4: Angle of Depression Calculation (Node 074 - Application)
  {
    id: 'ch_math_011',
    nodeId: NODE_C10_MATH_074,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'From the top of an 80 m cliff, the angle of depression of a rescue boat is 30°. Calculate the horizontal distance of the boat from the base of the cliff (take √3 ≈ 1.732, round to 1 decimal place).',
    correctAnswer: 138.6,
    tolerance: 0.5,
    unit: 'm',
    explanation: 'tan 30° = 80 / d  ⇒  d = 80 / tan 30° = 80 × √3 = 80 × 1.732 = 138.56 ≈ 138.6 m. Beware: writing d = 80 × tan 30° is an inverted formula error.',
    hints: [
      'Place the 30° angle inside the triangle at the boat.',
      'tan 30° = 80 / distance  ⇒  distance = 80 / tan 30°.',
      '80 × 1.732 ≈ 138.56 metres.',
    ],
    misconceptionIndex: 4,
  },
  // Standard 5: Direct Method Mean Calculation (Node 075 - Application)
  {
    id: 'ch_math_012',
    nodeId: NODE_C10_MATH_075,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Given classes with class marks x = [5, 15, 25, 35] and frequencies f = [2, 4, 3, 1], find the mean by the direct method (Σfx / Σf).',
    correctAnswer: 17.5,
    tolerance: 0.1,
    unit: '',
    explanation: 'fx = [10, 60, 75, 35]. Σfx = 10 + 60 + 75 + 35 = 180. Σf = 2 + 4 + 3 + 1 = 10. Mean = 180 / 10 = 17.5.',
    hints: [
      'Multiply each class mark by its frequency to get fx.',
      'Sum the fx values: 10 + 60 + 75 + 35 = 180.',
      'Divide 180 by total frequency Σf = 10.',
    ],
  },
  // Standard 6: Step-Deviation Mean Method Formula (Node 076 - Analysis)
  {
    id: 'ch_math_013',
    nodeId: NODE_C10_MATH_076,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In the step-deviation formula x̄ = A + (Σft / Σf) · i, what do t and i represent?',
    options: [
      't = (x - A)/i is the step-deviation and i is the class width',
      't = fx and i is the total frequency',
      't = (x - A) · i is the enlarged deviation and i is the median',
      't is time and i is the initial frequency',
    ],
    correctIndex: 0,
    explanation: 'i is the common class width, d = x - A is the deviation from assumed mean A, and t = d/i scales deviations into small integers.',
    hints: [
      'Assumed mean is A.',
      'Dividing deviation (x - A) by class width i yields t.',
      'Multiplying by i at the end restores the scale.',
    ],
  },
  // Standard 7: Identifying Modal Class vs Mode (Node 077/078 - Analysis)
  {
    id: 'ch_math_014',
    nodeId: NODE_C10_MATH_077,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a grouped frequency table: 0–10 (f=5), 10–20 (f=14), 20–30 (f=8), 30–40 (f=3). What is the modal class?',
    options: ['14', '10–20', '20–30', '15'],
    correctIndex: 1,
    explanation: 'The modal class is the interval with the highest frequency, which is 10–20 (f=14). CISCE examiners penalise writing the frequency 14 or midpoint 15 as the modal class.',
    hints: [
      'Look for the class interval with the largest frequency.',
      'The highest frequency is 14.',
      'The modal class must be written as the interval 10–20.',
    ],
  },
  // Standard 8: Ogive Quartile Intersections (Node 079 - Understanding)
  {
    id: 'ch_math_079',
    nodeId: NODE_C10_MATH_079,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match the cumulative frequency (y-axis) location on a less-than ogive of total frequency N to its statistical measure on the x-axis:',
    options: [
      'N/4 → Lower Quartile Q1, N/2 → Median, 3N/4 → Upper Quartile Q3',
      'N/2 → Q1, N/4 → Median, 3N/4 → Q3',
      'N → Median, N/2 → Q1, N/4 → Q3',
      '3N/4 → Q1, N/2 → Median, N/4 → Q3',
    ],
    correctIndex: 0,
    explanation: 'On a cumulative frequency curve (ogive): N/4 corresponds to Q1 (25th percentile), N/2 to the median (50th percentile), and 3N/4 to Q3 (75th percentile).',
    hints: [
      'Median is the 50% mark (N/2).',
      'Lower quartile Q1 is the 25% mark (N/4).',
      'Upper quartile Q3 is the 75% mark (3N/4).',
    ],
  },
  // Standard 9: Complementary Probability in Cards (Node 080 - Application)
  {
    id: 'ch_math_016',
    nodeId: NODE_C10_MATH_080,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A single card is drawn from a standard pack of 52 playing cards. What is the probability of NOT drawing a face card (Jack, Queen, King)? (Enter as a reduced decimal or ratio: 40/52 = 10/13 ≈ 0.769, enter 10/13 as decimal 0.77)',
    correctAnswer: 0.77,
    tolerance: 0.02,
    unit: '',
    explanation: 'There are 12 face cards (3 in each of 4 suits). P(Face) = 12/52 = 3/13. P(Not Face) = 1 - 3/13 = 10/13 ≈ 0.7692 (rounded to 0.77).',
    hints: [
      'Total face cards = 4 suits × 3 = 12.',
      'Non-face cards = 52 - 12 = 40 cards.',
      '40 / 52 = 10 / 13 ≈ 0.769.',
    ],
  },
  // Advanced 1: Constructing Trigonometric Identity Derivation (Node 071 - Creativity)
  {
    id: 'ch_math_017',
    nodeId: NODE_C10_MATH_071,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the derivation of 1 + tan²A = sec²A starting from the Pythagorean identity.',
    availableParts: [
      'sin²A + cos²A = 1',
      'Divide both sides by cos²A',
      '(sin²A/cos²A) + (cos²A/cos²A) = 1/cos²A',
      'tan²A + 1 = sec²A',
    ],
    targetState: 'sin²A + cos²A = 1 Divide both sides by cos²A (sin²A/cos²A) + (cos²A/cos²A) = 1/cos²A tan²A + 1 = sec²A',
    validationHint: 'Click all 4 steps in sequential logical order.',
    explanation: 'Dividing sin²A + cos²A = 1 by cos²A term by term immediately yields (tan²A) + 1 = sec²A.',
    hints: [
      'Start with the base identity sin²A + cos²A = 1.',
      'Choose the operation to divide by cos²A.',
      'Show individual quotients, then simplify to tan²A + 1 = sec²A.',
    ],
  },
  // Advanced 2: Proving Complex Trig Expression (Node 072 - Evaluation)
  {
    id: 'ch_math_018',
    nodeId: NODE_C10_MATH_072,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims: "√( (1 - sin A) / (1 + sin A) ) = sec A - tan A". Is this proof mathematically sound for 0° ≤ A < 90°?',
    options: [
      'Yes, multiply numerator & denominator by (1 - sin A) inside root to get √((1-sin A)²/cos²A) = (1 - sin A)/cos A = sec A - tan A',
      'No, the square root distributes over addition directly',
      'No, sec A - tan A is always equal to 1',
      'Yes, but only when A = 45°',
    ],
    correctIndex: 0,
    explanation: 'Multiplying by the conjugate (1 - sin A) yields (1 - sin A)² / (1 - sin²A) = (1 - sin A)² / cos²A. Taking square root gives (1 - sin A)/cos A = 1/cos A - sin A/cos A = sec A - tan A.',
    hints: [
      'Think about rationalising the denominator under the radical.',
      '(1 + sin A)(1 - sin A) = 1 - sin²A = cos²A.',
      '(1 - sin A)/cos A separates into sec A - tan A.',
    ],
  },
  // Advanced 3: Two-Observer Heights & Distances (Node 073/074 - Analysis)
  {
    id: 'ch_math_019',
    nodeId: NODE_C10_MATH_073,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'From the top of a 60 m lighthouse, the angles of depression of two ships in line with the base on the same side are 45° and 30°. Find the distance between the two ships in metres (take √3 ≈ 1.732, round to 1 decimal place).',
    correctAnswer: 43.9,
    tolerance: 0.5,
    unit: 'm',
    explanation: 'Ship 1 (45°): d₁ = 60 / tan 45° = 60 m. Ship 2 (30°): d₂ = 60 / tan 30° = 60√3 = 103.92 m. Distance between ships = d₂ - d₁ = 103.92 - 60 = 43.92 ≈ 43.9 m.',
    hints: [
      'Calculate distance to ship 1: 60 / tan 45° = 60 m.',
      'Calculate distance to ship 2: 60 / tan 30° = 60 × 1.732 = 103.92 m.',
      'Subtract the two distances: 103.92 - 60 = 43.92 m.',
    ],
  },
  // Advanced 4: Ogive Interquartile Range Calculation (Node 079 - Analysis)
  {
    id: 'ch_math_020',
    nodeId: NODE_C10_MATH_079,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'From an ogive of 80 students, Q1 is read as 24 marks and Q3 is read as 58 marks. What is the Semi-Interquartile Range (Quartile Deviation)?',
    correctAnswer: 17,
    tolerance: 0.1,
    unit: 'marks',
    explanation: 'Interquartile range IQR = Q3 - Q1 = 58 - 24 = 34. Semi-interquartile range = IQR / 2 = 34 / 2 = 17 marks.',
    hints: [
      'Find the Interquartile Range: Q3 - Q1 = 58 - 24 = 34.',
      'Semi-interquartile range means half of the IQR.',
      '34 / 2 = 17.',
    ],
  },
  // Advanced 5: Histogram Graphical Mode Finding (Node 078 - Evaluation)
  {
    id: 'ch_math_021',
    nodeId: NODE_C10_MATH_078,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'When finding the mode from a histogram, why are diagonal lines drawn from adjacent bar corners across the tallest bar?',
    options: [
      'To weight the peak position based on the relative frequencies of the preceding and succeeding class intervals',
      'To compute the total area under the frequency polygon',
      'To find the arithmetic mean of the distribution',
      'Because the board exam requires decorative construction lines',
    ],
    correctIndex: 0,
    explanation: 'The intersecting diagonals geometrically locate the interpolated mode within the modal class, pulling the peak towards whichever neighbouring class has higher frequency.',
    hints: [
      'The mode is pulled towards the neighbouring bar with larger frequency.',
      'Diagonals perform geometric linear interpolation.',
      'It pinpoints the peak density value within the modal interval.',
    ],
  },
  // Advanced 6: Probability of Sum of 2 Dice (Node 080 - Creativity)
  {
    id: 'ch_math_022',
    nodeId: NODE_C10_MATH_080,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Two balanced dice are rolled simultaneously. What is the probability that the sum of the two numbers is a prime number? (Enter as reduced decimal rounded to 2 decimal places. Favourable sums 2,3,5,7,11 total 15 outcomes out of 36; 15/36 = 5/12 ≈ 0.42)',
    correctAnswer: 0.42,
    tolerance: 0.02,
    unit: '',
    explanation: 'Total outcomes = 6 × 6 = 36. Prime sums: 2 (1 outcome), 3 (2 outcomes), 5 (4 outcomes), 7 (6 outcomes), 11 (2 outcomes). Total favourable = 1 + 2 + 4 + 6 + 2 = 15. P = 15/36 = 5/12 ≈ 0.4167 ≈ 0.42.',
    hints: [
      'List possible prime sums: 2, 3, 5, 7, 11.',
      'Count combinations for each sum: 1 + 2 + 4 + 6 + 2 = 15 pairs.',
      '15 / 36 = 5 / 12 ≈ 0.42.',
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
  nodeId: NODE_C10_MATH_071,
  title: 'Trigonometric Identities & Statistical Modeling',
  definition:
    'Comprehensive mastery of ICSE Class 10 Trigonometric Identities, Heights & Distances surveying, Grouped Data Mean/Median/Mode, Histogram & Ogive graphical estimations, and Classical Probability.',
  eli5: 'Think of trigonometry as the geometry GPS of the world (turning angles into physical heights) and statistics as the lens that turns raw chaotic data into clear, reliable decisions.',
  misconceptions: [
    {
      misconception: 'sin²A + cos²A = 1 implies sin A + cos A = 1',
      correction: 'Squaring is mandatory! For 45°, sin 45° + cos 45° = 1/√2 + 1/√2 = √2 ≈ 1.414, not 1.',
    },
    {
      misconception: 'Always default to using tan θ in every heights and distances problem',
      correction: 'Use sin when the line of sight (hypotenuse) is involved and cos when adjacent & hypotenuse are known.',
    },
    {
      misconception: 'The class mark of discontinuous 11-20 is 15',
      correction: 'Class mark = (11 + 20) / 2 = 15.5. Never ignore the 0.5 gap in inclusive class intervals.',
    },
    {
      misconception: '1 is a prime number when rolling a die',
      correction: '1 is neither prime nor composite. The prime outcomes on a standard die are strictly {2, 3, 5}.',
    },
    {
      misconception: 'Angle of depression means multiplying height by tan θ to find distance',
      correction: 'tan θ = height / distance, so distance = height / tan θ.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is (sec²A - tan²A) equal to?',
      options: ['0', '1', '2', 'cosec²A'],
      correctIndex: 1,
    },
    {
      question: 'In a right triangle with angle 30°, if hypotenuse = 10 m, what is the opposite height?',
      options: ['5 m', '8.66 m', '10 m', '2.5 m'],
      correctIndex: 0,
    },
    {
      question: 'The modal class of a distribution is:',
      options: ['The class with highest frequency', 'The middle class', 'The class containing N/2', 'The average class'],
      correctIndex: 0,
    },
    {
      question: 'On a less-than ogive, the median is located by drawing across from:',
      options: ['N/4', 'N/2', '3N/4', 'N'],
      correctIndex: 1,
    },
    {
      question: 'What is the sum of probabilities of an event and its complement P(E) + P(not E)?',
      options: ['0.5', '1', '0', 'Depends on experiment'],
      correctIndex: 1,
    },
    {
      question: 'To find the mode graphically, which chart type is mandatory?',
      options: ['Bar chart', 'Histogram', 'Pie chart', 'Frequency polygon'],
      correctIndex: 1,
    },
    {
      question: 'When the first class interval does not start at zero on graph paper, we must draw a:',
      options: ['Double line', 'Kink (zig-zag break)', 'Dotted axis', 'Red arrow'],
      correctIndex: 1,
    },
    {
      question: 'The direct method formula for grouped mean is:',
      options: ['Σfx / Σf', 'A + Σfd / Σf', 'A + (Σft/Σf) · i', 'Σx / n'],
      correctIndex: 0,
    },
  ],
  masteryCriteria: 'Student proves identities, calculates heights/distances, computes grouped statistics, reads ogives/histograms, and solves probability problems.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Unit Circle & Pythagorean Identities',
    instruction: 'Drag the angle slider from 0° to 90°. Observe how (cos θ)² + (sin θ)² always equals exactly 1.000!',
    interactionType: 'slider-trig',
    nodeId: NODE_C10_MATH_071,
  },
  {
    title: 'Lab 2: Marine Surveyor Elevation & Depression',
    instruction: 'Adjust the lighthouse height and observer distance. Watch the elevation and depression alternate interior angles synchronise!',
    interactionType: 'slider-survey',
    nodeId: NODE_C10_MATH_073,
  },
  {
    title: 'Lab 3: Grouped Data Mean Workbench',
    instruction: 'Adjust class frequencies to compare the Direct (Σfx/Σf), Assumed Mean, and Step-Deviation methods live.',
    interactionType: 'slider-stats',
    nodeId: NODE_C10_MATH_075,
  },
  {
    title: 'Lab 4: Graphical Mode Finder on Histogram',
    instruction: 'Manipulate neighbouring bar heights and watch the intersecting diagonal lines dynamically locate the exact mode on the x-axis!',
    interactionType: 'slider-histogram',
    nodeId: NODE_C10_MATH_078,
  },
  {
    title: 'Lab 5: Ogive S-Curve & Quartile Projector',
    instruction: 'Slide the percentile locator between N/4 (Q1), N/2 (Median), and 3N/4 (Q3) to inspect cumulative projections.',
    interactionType: 'slider-ogive',
    nodeId: NODE_C10_MATH_079,
  },
];

// ─── PREDICTION QUESTIONS (PREDICT-THEN-CHECK) ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an observer walks closer to a tower so their distance halves, what happens to the angle of elevation tan θ = h/d?',
    options: [
      'tan θ doubles, so the angle θ increases significantly',
      'The angle θ halves',
      'The angle remains unchanged',
      'tan θ becomes negative',
    ],
    correctIndex: 0,
    verifyInstruction: 'Drag the distance slider closer in Lab 2 to confirm that angle θ steepens towards 90°!',
    nodeId: NODE_C10_MATH_073,
  },
  {
    question: 'Predict: In a less-than ogive of N = 60 students, at which y-axis cumulative frequency mark will the Upper Quartile (Q3) be projected?',
    options: ['15', '30', '45', '60'],
    correctIndex: 2,
    verifyInstruction: 'Select 3N/4 in Lab 5 to verify that 3 × 60 / 4 = 45 on the vertical axis!',
    nodeId: NODE_C10_MATH_079,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In Lab 1, as angle θ increases from 0° to 90°, what happens to sin θ and cos θ?',
    observableOptions: [
      'sin θ grows from 0 to 1 while cos θ shrinks from 1 to 0, maintaining sin²θ + cos²θ = 1',
      'Both sin θ and cos θ grow towards infinity',
      'Both decrease to zero',
      'They remain perfectly equal at all angles',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_MATH_071,
  },
  {
    question: 'Observation: In Lab 4, when the bar to the right of the modal bar is made taller than the left bar, where does the mode shift?',
    observableOptions: [
      'The intersection shifts to the right (towards the heavier neighbouring class)',
      'The intersection shifts to the left',
      'The mode jumps to zero',
      'The mode is completely unaffected',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_MATH_078,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Marine Port Structural & Risk Assessment',
  description: 'Apply your trigonometry and statistics toolkit to plan the Mumbai Coastal Seawall telemetry:',
  steps: [
    'Measure a 120 m baseline from the sea wall to an offshore sensor buoy.',
    'Use an inclinometer to measure the angle of elevation (e.g. 32°). Calculate sensor buoy mast height.',
    'Tabulate 50 tidal wave surge heights into classes (0-2m, 2-4m, 4-6m, 6-8m).',
    'Plot a less-than ogive to identify the 75th percentile (Q3) wave height for flood barrier engineering.',
    'Compute the storm surge probability P(surge > 6m) and design emergency protocols.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C10_MathematicsTrigonometricIdentitiessin2aSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant-style Interactive Lab Variables
  const [trigAngle, setTrigAngle] = useState(30); // 0 to 90 deg
  const [towerHeight, setTowerHeight] = useState(40); // 10 to 100 m
  const [surveyDist, setSurveyDist] = useState(40); // 10 to 100 m
  const [statsFrequencies, setStatsFrequencies] = useState<number[]>([4, 10, 16, 7, 3]);
  const [histBars, setHistBars] = useState<number[]>([6, 14, 22, 12, 6]); // modal is idx 2
  const [ogivePercentileTarget, setOgivePercentileTarget] = useState<'Q1' | 'Median' | 'Q3'>('Median');

  // Probability Experimenter Lab State
  const [probCoinTosses, setProbCoinTosses] = useState<{ heads: number; tails: number }>({ heads: 0, tails: 0 });
  const [probDieRolls, setProbDieRolls] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [lastRolledVal, setLastRolledVal] = useState<number | null>(null);

  // Predict & Observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);

  // Adaptive Difficulty & BKT
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints and feedback
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
  const [sparklePos] = useState({ x: 0, y: 0 });

  // Reflection responses
  const [reflections, setReflections] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Non-MCQ challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter challenges by adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT adaptive progression effect
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

  // Escalating hints helper
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints && activeChallenge.hints[nextLevel - 1]) {
      const hintMsg = activeChallenge.hints[nextLevel - 1];
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
  }, [hintCount, activeChallenge]);

  // Inactivity auto-hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Callbacks for phase transitions
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight! The identity holds across all angles.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Mathematics Laboratory. Experiment freely with live formulas.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Sandbox mode unlocked. Test edge cases and explore equations without any time pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Let us test your skills with ICSE Board challenges.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive controls to check if your intuition holds.');
  }, []);

  // Completion handler
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered ICSE Class 10 Trigonometry and Statistics.');
  }, [errors, onComplete]);

  // Next Challenge handler
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

  // Answer submit handler with visual feedback & BKT
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
        isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0.1);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (activeChallenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent reasoning.');
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
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (
          activeChallenge.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(activeChallenge.misconceptionIndex)
        ) {
          setHitMisconceptions((prev) => [...prev, activeChallenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us study the complete step-by-step solution together.');
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
    [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  // Drag-and-drop callbacks
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isTargetCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
      if (isTargetCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, activeChallenge]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const arr = prev.length > 0 ? [...prev] : [0, 1, 2, 3];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, []);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3];
    handleAnswer(answer);
  }, [sortArrangement, handleAnswer]);

  const handleRollDie = useCallback(() => {
    const outcome = Math.floor(Math.random() * 6) + 1;
    setLastRolledVal(outcome);
    setProbDieRolls((prev) => {
      const next = [...prev];
      next[outcome - 1] += 1;
      return next;
    });
    audioManager.play('pop');
  }, []);

  const handleTossCoin = useCallback(() => {
    const isHead = Math.random() >= 0.5;
    setProbCoinTosses((prev) => ({
      heads: prev.heads + (isHead ? 1 : 0),
      tails: prev.tails + (isHead ? 0 : 1),
    }));
    audioManager.play('count');
  }, []);

  // HTML5 2D Canvas Animated Background loop for Challenges
  useEffect(() => {
    if (phase !== 'challenge') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#4338ca';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`Question ${currentChallenge + 1} of ${filteredChallenges.length}`, 12, 18);

      const pulse = 4 + Math.sin(frame * 0.08) * 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 20, 14, pulse, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();
      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentChallenge, filteredChallenges.length]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Derived math values for Lab 1 (Trig)
  const rad = useMemo(() => (trigAngle * Math.PI) / 180, [trigAngle]);
  const sinVal = useMemo(() => Math.sin(rad), [rad]);
  const cosVal = useMemo(() => Math.cos(rad), [rad]);

  // Derived math values for Lab 2 (Surveying)
  const surveyElevationDeg = useMemo(() => {
    return (Math.atan(towerHeight / surveyDist) * 180) / Math.PI;
  }, [towerHeight, surveyDist]);

  // Derived stats values for Lab 3 (Mean)
  const classMarks = [10, 20, 30, 40, 50];
  const totalFreq = useMemo(() => statsFrequencies.reduce((a, b) => a + b, 0), [statsFrequencies]);
  const directMean = useMemo(() => {
    const sumFx = statsFrequencies.reduce((acc, f, i) => acc + f * classMarks[i], 0);
    return totalFreq > 0 ? (sumFx / totalFreq).toFixed(2) : '0.00';
  }, [statsFrequencies, totalFreq]);

  // Derived histogram mode for Lab 4
  const histModeCalc = useMemo(() => {
    const fm = histBars[2];
    const f1 = histBars[1];
    const f2 = histBars[3];
    const denom = 2 * fm - f1 - f2;
    if (denom <= 0) return '25.0';
    const mode = 20 + ((fm - f1) / denom) * 10;
    return mode.toFixed(1);
  }, [histBars]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 15, scale: 1.15 }}
            className="text-3xl p-2 bg-indigo-900/60 rounded-2xl border border-indigo-700/50"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-indigo-400 font-semibold tracking-wide">
              ICSE Class 10 Mathematics • Units 071–080 Comprehensive
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                : difficulty === 'advanced'
                ? 'bg-rose-950/80 text-rose-300 border-rose-600'
                : 'bg-indigo-950/80 text-indigo-300 border-indigo-600'
            }`}
          >
            Tier: {difficulty}
          </motion.span>

          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            Mastery: <strong className="text-indigo-300">{masteryLevel}</strong>
          </span>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-xl">
            <h2 className="text-xl font-bold text-indigo-300 flex items-center gap-2">
              <span>⚓</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-indigo-900/30 rounded-xl border border-indigo-700/40 text-xs text-indigo-200">
              💡 {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
              Discovery Challenge • Warm-Up Hook
            </span>
            <h3 className="text-base md:text-lg font-semibold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${opt}`}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400'
                      : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-indigo-500 hover:bg-slate-800/90'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-800">
                <p className={`text-sm mb-4 ${discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Correct intuition! The sum of squares is invariant.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Enter Interactive Discovery Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION LABS ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Lab Step Tabs */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  currentSlide === idx
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                Lab {idx + 1}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-indigo-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <span className="text-xs text-indigo-400 font-mono">
                  Module: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>
              <p className="text-sm text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-800/40">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ─── LAB 1 VISUALIZATION: UNIT CIRCLE & PYTHAGOREAN IDENTITIES ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
                  <div className="flex flex-col items-center">
                    <svg viewBox="0 0 320 320" className="w-full max-w-[280px]">
                      {/* Axes */}
                      <line x1="20" y1="280" x2="300" y2="280" stroke="#475569" strokeWidth="2" />
                      <line x1="40" y1="300" x2="40" y2="20" stroke="#475569" strokeWidth="2" />

                      {/* Unit Quarter Arc */}
                      <path
                        d="M 40 40 A 240 240 0 0 1 280 280"
                        fill="none"
                        stroke="#334155"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />

                      {/* Right Triangle inside Circle */}
                      {(() => {
                        const originX = 40;
                        const originY = 280;
                        const radius = 240;
                        const px = originX + radius * cosVal;
                        const py = originY - radius * sinVal;

                        return (
                          <>
                            {/* Hypotenuse ray */}
                            <line x1={originX} y1={originY} x2={px} y2={py} stroke="#818cf8" strokeWidth="3" />
                            {/* Adjacent Base (cos A) */}
                            <line x1={originX} y1={originY} x2={px} y2={originY} stroke="#3b82f6" strokeWidth="4" />
                            {/* Opposite Height (sin A) */}
                            <line x1={px} y1={originY} x2={px} y2={py} stroke="#ec4899" strokeWidth="4" />
                            {/* Angle Sector Arc */}
                            <path
                              d={`M ${originX + 40} ${originY} A 40 40 0 0 0 ${originX + 40 * Math.cos(rad)} ${
                                originY - 40 * Math.sin(rad)
                              }`}
                              fill="none"
                              stroke="#fbbf24"
                              strokeWidth="2"
                            />
                            <text x={originX + 50} y={originY - 10} fill="#fbbf24" fontSize="11" fontWeight="bold">
                              {trigAngle}°
                            </text>
                            {/* Coordinates Label */}
                            <circle cx={px} cy={py} r="5" fill="#f43f5e" />
                            <text x={px + 8} y={py - 8} fill="#f1f5f9" fontSize="10" fontWeight="bold">
                              P({cosVal.toFixed(2)}, {sinVal.toFixed(2)})
                            </text>
                          </>
                        );
                      })()}
                    </svg>

                    <div className="w-full mt-4 space-y-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Angle A: {trigAngle}°</span>
                        <span>Radian: {rad.toFixed(3)} rad</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={90}
                        value={trigAngle}
                        onChange={(e) => {
                          setTrigAngle(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-indigo-500 cursor-pointer"
                        aria-label="Trigonometric angle slider"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 flex flex-col justify-center">
                    <div className="p-3 bg-slate-900 rounded-xl border border-blue-900/50">
                      <span className="text-xs text-blue-400 font-bold">Base (cos A):</span>
                      <p className="text-base font-mono text-white">cos({trigAngle}°) = {cosVal.toFixed(4)}</p>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-pink-900/50">
                      <span className="text-xs text-pink-400 font-bold">Perpendicular (sin A):</span>
                      <p className="text-base font-mono text-white">sin({trigAngle}°) = {sinVal.toFixed(4)}</p>
                    </div>

                    <div className="p-4 bg-emerald-950/60 rounded-xl border border-emerald-600/60">
                      <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                        Pythagorean Proof Verification:
                      </span>
                      <p className="text-sm font-mono text-emerald-200 mt-1">
                        sin²({trigAngle}°) + cos²({trigAngle}°) = {(sinVal * sinVal).toFixed(4)} +{' '}
                        {(cosVal * cosVal).toFixed(4)} = <strong className="text-white font-black">{(sinVal * sinVal + cosVal * cosVal).toFixed(3)}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2 VISUALIZATION: MARINE SURVEYOR HEIGHTS & DISTANCES ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-6 rounded-xl border border-slate-800">
                  {/* Predict Question in Lab 2 */}
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-700/50 space-y-3">
                      <p className="text-sm font-bold text-indigo-200">🔍 {PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2 text-left bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <svg viewBox="0 0 600 240" className="w-full max-h-[220px]">
                    {/* Sea level / Ground Baseline */}
                    <line x1="50" y1="200" x2="550" y2="200" stroke="#0284c7" strokeWidth="3" />
                    <text x="300" y="225" fill="#38bdf8" fontSize="11" textAnchor="middle">
                      Horizontal Baseline d = {surveyDist} m
                    </text>

                    {/* Lighthouse Structure */}
                    <rect x="100" y={200 - towerHeight * 1.5} width="30" height={towerHeight * 1.5} fill="#64748b" rx="4" />
                    <line x1="100" y1="200" x2="100" y2={200 - towerHeight * 1.5} stroke="#ef4444" strokeWidth="4" />
                    <text x="70" y={200 - (towerHeight * 1.5) / 2} fill="#f87171" fontSize="11" textAnchor="middle">
                      h = {towerHeight}m
                    </text>

                    {/* Observer / Ship */}
                    {(() => {
                      const obsX = 100 + surveyDist * 4;
                      const topY = 200 - towerHeight * 1.5;

                      return (
                        <>
                          <circle cx={obsX} cy="195" r="7" fill="#fbbf24" />
                          <text x={obsX} y="180" fill="#fbbf24" fontSize="10" textAnchor="middle">
                            Ship Observer
                          </text>

                          {/* Line of sight */}
                          <line x1={obsX} y1="195" x2="115" y2={topY} stroke="#a855f7" strokeWidth="2" strokeDasharray="5 5" />

                          {/* Upper Horizontal Line for Depression */}
                          <line x1="115" y1={topY} x2={obsX} y2={topY} stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />

                          {/* Angle markers */}
                          <text x={obsX - 45} y="190" fill="#a855f7" fontSize="11" fontWeight="bold">
                            Elev: {surveyElevationDeg.toFixed(1)}°
                          </text>
                          <text x="145" y={topY - 8} fill="#f59e0b" fontSize="11" fontWeight="bold">
                            Depr: {surveyElevationDeg.toFixed(1)}°
                          </text>
                        </>
                      );
                    })()}
                  </svg>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400">Lighthouse Height: {towerHeight} m</label>
                      <input
                        type="range"
                        min={15}
                        max={90}
                        value={towerHeight}
                        onChange={(e) => setTowerHeight(Number(e.target.value))}
                        className="w-full accent-red-500 cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400">Distance to Ship: {surveyDist} m</label>
                      <input
                        type="range"
                        min={20}
                        max={100}
                        value={surveyDist}
                        onChange={(e) => setSurveyDist(Number(e.target.value))}
                        className="w-full accent-sky-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300 font-mono">
                    tan(θ) = opposite / adjacent = {towerHeight} / {surveyDist} = {(towerHeight / surveyDist).toFixed(3)} ⇒ θ = {surveyElevationDeg.toFixed(2)}°
                  </div>
                </div>
              )}

              {/* ─── LAB 3 VISUALIZATION: GROUPED DATA MEAN WORKBENCH ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-6 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-400">
                    Adjust the 5 class frequencies below to see how direct and shortcut mean formulas dynamically rebalance:
                  </p>

                  <div className="grid grid-cols-5 gap-2 text-center">
                    {['0–20 (x=10)', '20–40 (x=20)', '40–60 (x=30)', '60–80 (x=40)', '80–100 (x=50)'].map((lbl, idx) => (
                      <div key={idx} className="p-2 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-[10px] text-slate-400 block">{lbl}</span>
                        <input
                          type="number"
                          min={0}
                          max={30}
                          value={statsFrequencies[idx]}
                          onChange={(e) => {
                            const val = Math.max(0, parseInt(e.target.value) || 0);
                            setStatsFrequencies((prev) => {
                              const next = [...prev];
                              next[idx] = val;
                              return next;
                            });
                          }}
                          className="w-full bg-slate-800 text-center text-white text-sm font-bold rounded py-1 border border-slate-700"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    <div className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-700/50">
                      <span className="text-xs text-indigo-300 font-bold block">1. Direct Method</span>
                      <p className="text-xs text-slate-300 font-mono mt-1">Mean = Σfx / Σf</p>
                      <p className="text-lg font-black text-white mt-1">{directMean}</p>
                    </div>

                    <div className="p-4 bg-emerald-950/60 rounded-xl border border-emerald-700/50">
                      <span className="text-xs text-emerald-300 font-bold block">2. Shortcut (A = 30)</span>
                      <p className="text-xs text-slate-300 font-mono mt-1">Mean = A + (Σfd / Σf)</p>
                      <p className="text-lg font-black text-white mt-1">{directMean}</p>
                    </div>

                    <div className="p-4 bg-purple-950/60 rounded-xl border border-purple-700/50">
                      <span className="text-xs text-purple-300 font-bold block">3. Step-Deviation (i=10)</span>
                      <p className="text-xs text-slate-300 font-mono mt-1">Mean = A + (Σft/Σf)·i</p>
                      <p className="text-lg font-black text-white mt-1">{directMean}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4 VISUALIZATION: HISTOGRAM & GEOMETRIC MODE FINDER ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-6 rounded-xl border border-slate-800">
                  <svg viewBox="0 0 500 240" className="w-full max-h-[220px]">
                    {/* Baseline */}
                    <line x1="40" y1="200" x2="460" y2="200" stroke="#64748b" strokeWidth="2" />

                    {/* Bars: 0-10, 10-20, 20-30(modal), 30-40, 40-50 */}
                    {histBars.map((height, i) => {
                      const x = 50 + i * 80;
                      const y = 200 - height * 6;
                      const isModal = i === 2;
                      return (
                        <g key={i}>
                          <rect
                            x={x}
                            y={y}
                            width="80"
                            height={height * 6}
                            fill={isModal ? '#4338ca' : '#1e293b'}
                            stroke={isModal ? '#818cf8' : '#475569'}
                            strokeWidth="2"
                          />
                          <text x={x + 40} y={y - 6} fill={isModal ? '#a5b4fc' : '#94a3b8'} fontSize="10" textAnchor="middle">
                            f={height}
                          </text>
                          <text x={x} y="215" fill="#64748b" fontSize="10" textAnchor="middle">
                            {i * 10}
                          </text>
                        </g>
                      );
                    })}
                    <text x="450" y="215" fill="#64748b" fontSize="10" textAnchor="middle">
                      50
                    </text>

                    {/* Intersecting Mode Diagonals on Modal Bar */}
                    {(() => {
                      const leftBarTop = 200 - histBars[1] * 6;
                      const modalBarTop = 200 - histBars[2] * 6;
                      const rightBarTop = 200 - histBars[3] * 6;

                      const modeNum = parseFloat(histModeCalc);
                      const intersectX = 210 + ((modeNum - 20) / 10) * 80;

                      return (
                        <>
                          <line x1="210" y1={leftBarTop} x2="290" y2={modalBarTop} stroke="#f43f5e" strokeWidth="2" />
                          <line x1="210" y1={modalBarTop} x2="290" y2={rightBarTop} stroke="#f43f5e" strokeWidth="2" />
                          {/* Perpendicular drop to x axis */}
                          <line x1={intersectX} y1={modalBarTop + 20} x2={intersectX} y2="200" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 4" />
                          <circle cx={intersectX} cy="200" r="4" fill="#fbbf24" />
                          <text x={intersectX} y="190" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">
                            Mode ≈ {histModeCalc}
                          </text>
                        </>
                      );
                    })()}
                  </svg>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Left Neighbour f₁: {histBars[1]}</label>
                      <input
                        type="range"
                        min={2}
                        max={20}
                        value={histBars[1]}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setHistBars((prev) => [prev[0], val, prev[2], prev[3], prev[4]]);
                        }}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-indigo-300 font-bold">Modal Peak f_m: {histBars[2]}</label>
                      <input
                        type="range"
                        min={21}
                        max={30}
                        value={histBars[2]}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setHistBars((prev) => [prev[0], prev[1], val, prev[3], prev[4]]);
                        }}
                        className="w-full accent-indigo-400 cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Right Neighbour f₂: {histBars[3]}</label>
                      <input
                        type="range"
                        min={2}
                        max={20}
                        value={histBars[3]}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setHistBars((prev) => [prev[0], prev[1], prev[2], val, prev[4]]);
                        }}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5 VISUALIZATION: OGIVE QUARTILE S-CURVE ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-6 rounded-xl border border-slate-800">
                  <div className="flex gap-2">
                    {(['Q1', 'Median', 'Q3'] as const).map((tgt) => (
                      <motion.button
                        key={tgt}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setOgivePercentileTarget(tgt)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold ${
                          ogivePercentileTarget === tgt
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        Locate {tgt} ({tgt === 'Q1' ? 'N/4 = 15' : tgt === 'Median' ? 'N/2 = 30' : '3N/4 = 45'})
                      </motion.button>
                    ))}
                  </div>

                  <svg viewBox="0 0 500 240" className="w-full max-h-[220px]">
                    {/* Axes */}
                    <line x1="50" y1="200" x2="450" y2="200" stroke="#64748b" strokeWidth="2" />
                    <line x1="50" y1="200" x2="50" y2="30" stroke="#64748b" strokeWidth="2" />

                    {/* S-Curve Path through points */}
                    <path
                      d="M 50 200 C 120 180, 180 150, 240 100 C 300 50, 380 35, 430 30"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                    />

                    {/* Target Percentile Projection Line */}
                    {(() => {
                      const yVal =
                        ogivePercentileTarget === 'Q1' ? 150 : ogivePercentileTarget === 'Median' ? 100 : 50;
                      const xVal =
                        ogivePercentileTarget === 'Q1' ? 180 : ogivePercentileTarget === 'Median' ? 240 : 340;
                      const xRead =
                        ogivePercentileTarget === 'Q1' ? '19.5' : ogivePercentileTarget === 'Median' ? '28.0' : '38.2';

                      return (
                        <>
                          <line x1="50" y1={yVal} x2={xVal} stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 4" />
                          <line x1={xVal} y1={yVal} x2={xVal} y2="200" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 4" />
                          <circle cx={xVal} cy={yVal} r="5" fill="#f59e0b" />
                          <text x="35" y={yVal + 4} fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="end">
                            {ogivePercentileTarget === 'Q1' ? 'N/4=15' : ogivePercentileTarget === 'Median' ? 'N/2=30' : '3N/4=45'}
                          </text>
                          <text x={xVal} y="215" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">
                            {ogivePercentileTarget} ≈ {xRead}
                          </text>
                        </>
                      );
                    })()}
                  </svg>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Prev/Next & Sandbox Navigator */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Prev Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-medium">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX FREE-PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>🎮</span> Probability & Surveying Simulation Sandbox
              </h2>
              <span className="text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-700">
                Unconstrained Exploration
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Conduct live stochastic experiments by rolling fair dice or flipping coins to see empirical frequencies converge to theoretical probabilities!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Coin Flipper Module */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-indigo-300">Coin Toss Generator</h3>
                <div className="flex gap-3 items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleTossCoin}
                    className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow"
                  >
                    Toss Coin
                  </motion.button>
                  <span className="text-xs text-slate-300">
                    Heads: {probCoinTosses.heads} | Tails: {probCoinTosses.tails}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  P(Head) = {probCoinTosses.heads + probCoinTosses.tails > 0
                    ? (probCoinTosses.heads / (probCoinTosses.heads + probCoinTosses.tails)).toFixed(3)
                    : '0.500'}
                </p>
              </div>

              {/* Die Roller Module */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-pink-300">Die Roll Generator</h3>
                <div className="flex gap-3 items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRollDie}
                    className="px-4 py-2 bg-pink-600 text-white text-xs font-bold rounded-lg shadow"
                  >
                    Roll Die
                  </motion.button>
                  <span className="text-xs text-slate-300">
                    Last Rolled: <strong>{lastRolledVal !== null ? lastRolledVal : '-'}</strong>
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-1 text-[10px] text-center font-mono">
                  {probDieRolls.map((count, i) => (
                    <div key={i} className="p-1 bg-slate-900 rounded">
                      <div>{i + 1}</div>
                      <div className="text-pink-400 font-bold">{count}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30"
              >
                I am Ready for Board Challenges! →
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: ADAPTIVE CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <canvas ref={canvasRef} width={400} height={30} className="w-full rounded-lg bg-slate-900 mb-1" />

          {/* Progress bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"
              animate={{
                width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">
                Competency: {activeChallenge.competencyLevel.toUpperCase()} • Node: {activeChallenge.nodeId}
              </span>
              <span className="text-xs text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
            </div>

            <h3 className="text-base md:text-lg font-semibold text-white leading-relaxed">
              {activeChallenge.question}
            </h3>

            {/* MCQ Option Renderers */}
            {(activeChallenge.type === 'classify' ||
              activeChallenge.type === 'distinguish' ||
              activeChallenge.type === 'match' ||
              activeChallenge.type === 'construct') &&
              activeChallenge.options && (
                <div className="space-y-2 pt-2">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                        wrongFlash
                          ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                          : showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-indigo-500 hover:bg-slate-800/90'
                      }`}
                    >
                      <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag-Label Renderers */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                  {Object.keys(activeChallenge.correctMapping || {}).map((targetId) => (
                    <div
                      key={targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className={`p-3 rounded-xl border-2 border-dashed text-center text-xs font-medium min-h-[50px] flex items-center justify-center ${
                        droppedLabels[targetId]
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      {droppedLabels[targetId] || `Drop: ${targetId.replace('t_', '')}`}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow"
                >
                  Verify Target Placements
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Renderers */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-2 pt-2">
                {(sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3]).map((sortIdx, pos) => (
                  <motion.div
                    key={pos}
                    draggable
                    onDragStart={() => setDraggedItem(String(pos))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromPos = parseInt(draggedItem || '0');
                      handleSortMove(fromPos, pos);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 flex items-center justify-between cursor-grab"
                  >
                    <span>
                      <strong className="text-indigo-400 mr-2">{pos + 1}.</strong>
                      {activeChallenge.sortItems![sortIdx]}
                    </span>
                    <span className="text-slate-500 text-xs">↕ Drag</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="mt-2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow"
                >
                  Check Logical Proof Order
                </motion.button>
              </div>
            )}

            {/* Numeric Input Renderer */}
            {activeChallenge.type === 'numeric' && (
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="number"
                  step="any"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value"
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
                <span className="text-slate-400 text-xs">{activeChallenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow"
                >
                  Submit
                </motion.button>
              </div>
            )}

            {/* Construct challenge renderer */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-800 text-white text-xs rounded-lg font-medium"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[50px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-indigo-950 text-indigo-200 border border-indigo-700 text-xs rounded-lg flex items-center gap-1">
                      {p}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 font-bold ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-slate-500 text-xs">Click available tokens above to assemble proof.</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow"
                >
                  Validate Proof Construction
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-5 bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-800/60 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Official ICSE Model Solution:
                  </span>
                  <span className="text-[10px] text-slate-400">Step-by-step disclosure</span>
                </div>

                {activeChallenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <strong className="text-indigo-400 mr-2">{idx + 1}.</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps <
                    activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-3 py-1.5 bg-amber-700/80 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <span className="text-xs text-emerald-400">✓ All solution steps displayed</span>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Mission →' : 'Next Question →'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & SYNTHESIS ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-900 rounded-2xl border border-indigo-700/60 text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-black text-white">Simulation Completed!</h2>
            <p className="text-base text-indigo-300 font-semibold">
              Final Accuracy Score: {Math.max(0, 100 - errors * 5)}% • Mastery Tier: {masteryLevel}
            </p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-emerald-950/50 rounded-xl border border-emerald-700/50 text-xs md:text-sm text-emerald-200">
            {errors === 0
              ? '🌟 Flawless Mastery! You evaluated every trigonometric and statistical relationship without a single slip.'
              : errors <= 3
              ? '👏 Exemplary Performance! Solid conceptual clarity across ICSE Class 10 Trigonometry & Statistics.'
              : '💪 Good Effort! Review the misconceptions below and revisit the interactive labs to solidify your foundation.'}
          </div>

          {/* ─── REFLECTION QUESTIONS ─── */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-indigo-800/60 space-y-4">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>💭</span> Conceptual Reflection & Deep Processing
            </h3>
            <p className="text-xs text-slate-400">
              Take a moment to solidify your understanding by reflecting on these core principles:
            </p>

            <div className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  rows={2}
                  value={reflections.surprising}
                  onChange={(e) => setReflections((r) => ({ ...r, surprising: e.target.value }))}
                  placeholder="e.g., How sin²θ + cos²θ stays strictly 1 across any real angle..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  rows={2}
                  value={reflections.explain}
                  onChange={(e) => setReflections((r) => ({ ...r, explain: e.target.value }))}
                  placeholder="e.g., The angle of elevation equals depression because horizontal lines are parallel..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  rows={2}
                  value={reflections.realLife}
                  onChange={(e) => setReflections((r) => ({ ...r, realLife: e.target.value }))}
                  placeholder="e.g., Calculating bridge heights, analyzing tidal wave distributions, risk modeling..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Misconception Review */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Profile:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/80 rounded-xl text-xs space-y-1">
                    <p className="text-rose-300 font-bold">❌ {m.misconception}</p>
                    <p className="text-emerald-300">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* ─── SPACED REPETITION VISIBILITY CARD ─── */}
          <div className="p-5 bg-gradient-to-br from-amber-950/50 via-slate-900 to-amber-950/30 rounded-2xl border border-amber-600/50 shadow-lg space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm md:text-base font-bold text-amber-300 flex items-center gap-2">
                <span>📅</span> Spaced Repetition Schedule (SM-2)
              </h3>
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-200 border border-amber-500/50">
                {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on your session accuracy of <strong>{Math.max(0, 100 - errors * 5)}%</strong> ({errors} {errors === 1 ? 'error' : 'errors'}), the spaced repetition algorithm has scheduled your optimal memory consolidation review:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <div className={`p-2.5 rounded-xl border text-center transition-all ${errors === 0 ? 'bg-amber-900/50 border-amber-400 text-amber-100 font-bold ring-2 ring-amber-400/40' : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'}`}>
                <div className="text-[10px] uppercase font-semibold">0 Errors (Mastered)</div>
                <div className="text-sm font-black mt-0.5">7 Days</div>
              </div>
              <div className={`p-2.5 rounded-xl border text-center transition-all ${errors >= 1 && errors <= 3 ? 'bg-amber-900/50 border-amber-400 text-amber-100 font-bold ring-2 ring-amber-400/40' : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'}`}>
                <div className="text-[10px] uppercase font-semibold">1–3 Errors (Practicing)</div>
                <div className="text-sm font-black mt-0.5">3 Days</div>
              </div>
              <div className={`p-2.5 rounded-xl border text-center transition-all ${errors >= 4 ? 'bg-amber-900/50 border-amber-400 text-amber-100 font-bold ring-2 ring-amber-400/40' : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'}`}>
                <div className="text-[10px] uppercase font-semibold">4+ Errors (Reinforce)</div>
                <div className="text-sm font-black mt-0.5">1 Day</div>
              </div>
            </div>
          </div>

          {/* Real World Application */}
          <div className="p-5 bg-indigo-950/40 rounded-2xl border border-indigo-800/50 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx}>
                  {idx + 1}. {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Floating feedback utilities */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_MathematicsTrigonometricIdentitiessin2aSim;
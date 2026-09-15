'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERALS ───
const NODE_C9_MATH_031 = 'c9_math_031'; // Triangle inequality
const NODE_C9_MATH_032 = 'c9_math_032'; // Perpendicular is shortest
const NODE_C9_MATH_033 = 'c9_math_033'; // Mid-Point Theorem and converse
const NODE_C9_MATH_034 = 'c9_math_034'; // Equal intercept theorem
const NODE_C9_MATH_035 = 'c9_math_035'; // Pythagoras Theorem area proof & applications
const NODE_C9_MATH_036 = 'c9_math_036'; // Parallelogram theorems (opposite sides & angles equal)
const NODE_C9_MATH_037 = 'c9_math_037'; // Parallelogram theorems (one pair equal & parallel, diagonals bisect)
const NODE_C9_MATH_038 = 'c9_math_038'; // Rhombus and rectangle diagonal properties
const NODE_C9_MATH_039 = 'c9_math_039'; // Construction of quadrilaterals (parallelogram, rhombus)
const NODE_C9_MATH_040 = 'c9_math_040'; // Construction of regular hexagon

const ALL_NODE_IDS = [
  NODE_C9_MATH_031,
  NODE_C9_MATH_032,
  NODE_C9_MATH_033,
  NODE_C9_MATH_034,
  NODE_C9_MATH_035,
  NODE_C9_MATH_036,
  NODE_C9_MATH_037,
  NODE_C9_MATH_038,
  NODE_C9_MATH_039,
  NODE_C9_MATH_040,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'The Master Architect of the Golden Quadrilateral',
  intro: 'You are chief civil engineer on a landmark high-speed railway and bridge construction corridor connecting Indian smart cities. Every triangular truss, suspension cable, support pier, and hexagonal pylon demands rock-solid geometric principles.',
  context: 'If two truss beams cannot bridge the span to meet at a vertex, the bridge collapses. If a survey cable is oblique instead of perpendicular, steel is wasted. Master the core Euclidean theorems to ensure the infrastructure stands for centuries.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'You have two rigid steel bridge struts of length 5 metres and 8 metres. What is the STRICT range of lengths allowable for the third strut to form a non-collapsed, rigid triangular frame?',
  options: [
    '3 m ≤ third strut ≤ 13 m (inclusive)',
    'Strictly greater than 3 m and strictly less than 13 m (3 < c < 13)',
    'Exactly 13 metres only',
    'Any length greater than 8 metres',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: at exactly 3 m or 13 m, the frame collapses flat into a straight line (a degenerate triangle)!',
};

// ─── PREDICTION QUESTIONS (Brilliant.org Predict-Then-Check Pattern) ──��
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If you have two side struts of length 5 cm and 6 cm, and you set the base side c to exactly 11 cm, what will happen to the triangle frame?',
    options: [
      'It will form a stable, acute triangle',
      'The frame will collapse flat into a straight line segment because 5 + 6 = 11 (strict inequality fails)',
      'The frame will become an equilateral triangle',
      'The apex vertex will rise higher',
    ],
    correctIndex: 1,
    explanation: 'When the sum of the two shorter sides equals the longest side (5 + 6 = 11), the arms meet on the base itself, collapsing into a 1D straight line.',
    verifyInstruction: 'In Lab 1, adjust Side a = 5, Side b = 6, and increase Base Side c to 11 to see the frame collapse completely flat.',
  },
  {
    id: 'pred_2',
    question: 'In a right-angled triangle drop PM = 8 m, as point X moves further along road line l away from foot M, what will happen to the oblique cable length PX?',
    options: [
      'PX remains constant at 8 m',
      'PX gets shorter as angle changes',
      'PX continuously increases and is strictly greater than PM because PX is always the hypotenuse',
      'PX fluctuates sinusoidally',
    ],
    correctIndex: 2,
    explanation: 'By Pythagoras theorem, PX = √(PM² + MX²). Since PM > 0 and MX > 0, PX is the hypotenuse of △PMX and is strictly longer than the perpendicular PM.',
    verifyInstruction: 'In Lab 2, slide distance MX from 1 m up to 13 m and watch the oblique hypotenuse PX expand while PM remains fixed at 8 m.',
  },
];

// ─── OBSERVATION QUESTIONS (Brilliant.org What-Do-You-Notice Pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'In Lab 3 (Mid-Point Morpher), when you drag the Apex vertex A horizontally or vertically, what do you notice about line segment DE joining the midpoints?',
    observableOptions: [
      'Segment DE changes its slope and is no longer parallel to base BC',
      'Segment DE remains strictly horizontal (parallel to base BC) and its length stays exactly half of BC (150 px)',
      'Segment DE doubles in length',
      'Segment DE curves into an arc',
    ],
    correctIndex: 1,
    explanation: 'By the Mid-Point Theorem, the line segment joining the midpoints of two sides of any triangle is always parallel to the third side and half its length, regardless of apex position.',
  },
  {
    id: 'obs_2',
    question: 'In Lab 4 (Diagonal Inspector), what definitive geometric feature do you observe when switching from a General Parallelogram to a Rhombus?',
    observableOptions: [
      'The diagonals become unequal in length',
      'The diagonals intersect at a strict 90° right angle (perpendicular bisectors)',
      'The opposite angles cease to be equal',
      'The diagonals no longer bisect each other',
    ],
    correctIndex: 1,
    explanation: 'In a rhombus, all four sides are equal, which forces the diagonals to intersect at 90° right angles while continuing to bisect each other.',
  },
];

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

// ─── 22 COMPREHENSIVE CHALLENGES COVERING ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  // Foundation Tier (1-7)
  {
    id: 'ch_01_ineq_f',
    nodeId: NODE_C9_MATH_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A surveyor tests three steel rods of lengths 4 cm, 6 cm, and 10 cm. Can these form a valid closed triangle?',
    options: [
      'Yes, because 6 + 10 = 16 > 4',
      'No, because the two shorter sides sum to 4 + 6 = 10, which equals (not exceeds) the longest side',
      'Yes, because all lengths are positive integers',
      'No, because 10 is an even number',
    ],
    correctIndex: 1,
    explanation: 'For a valid triangle, the sum of the two shorter sides must be STRICTLY greater than the longest side (4 + 6 = 10, which is equal to 10). This forms a flat, degenerate straight line, not a triangle.',
    hints: [
      'Identify the two shorter sides: 4 cm and 6 cm.',
      'Add them: 4 + 6 = 10 cm. Compare this sum with the longest side, 10 cm.',
      'The triangle inequality requires strict inequality (a + b > c). Here 10 is not greater than 10.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_perp_f',
    nodeId: NODE_C9_MATH_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is the perpendicular distance PM from a point P to a straight line l always the shortest path?',
    options: [
      'Because the perpendicular line is always vertical',
      'Because in right-angled △PXM, the perpendicular PM is a leg while any oblique segment PX is the hypotenuse, and hypotenuse > leg',
      'Because gravity pulls objects straight down',
      'Because oblique lines are curved',
    ],
    correctIndex: 1,
    explanation: 'In △PXM, angle PMX = 90°. Since the hypotenuse PX is the longest side in any right triangle (opposite the largest angle), PX > PM always for every point X ≠ M.',
    hints: [
      'Think of △PXM where M is the foot of the perpendicular.',
      'Which side is opposite the 90° right angle?',
      'The hypotenuse PX is always longer than either leg PM or MX.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_midpoint_f',
    nodeId: NODE_C9_MATH_033,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'In △ABC, D is the midpoint of AB and E is the midpoint of AC. If base BC = 18 cm, what is the length of segment DE in cm?',
    correctAnswer: 9,
    tolerance: 0.1,
    unit: 'cm',
    explanation: 'By the Mid-Point Theorem, the line segment joining the midpoints of two sides of a triangle is parallel to the third side and exactly half its length: DE = (1/2) × 18 = 9 cm.',
    hints: [
      'Recall the Mid-Point Theorem formula relating DE and the base BC.',
      'DE = 1/2 × BC.',
      'Divide 18 by 2 to get 9 cm.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04_intercept_f',
    nodeId: NODE_C9_MATH_034,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Three parallel power lines cut a road transversal into equal segments AB = 7 m and BC = 7 m. They cut a slanting canal transversal into segments DE = 11 m and EF. Find length EF in metres.',
    correctAnswer: 11,
    tolerance: 0.1,
    unit: 'm',
    explanation: 'By the Equal Intercept Theorem, if three or more parallel lines make equal intercepts on one transversal, they make equal intercepts on any other transversal. Hence EF = DE = 11 m.',
    hints: [
      'Are the three lines parallel? Yes.',
      'Are the intercepts on the first transversal equal (7 m = 7 m)? Yes.',
      'Therefore, the intercepts on the second transversal must also be equal: EF = DE.',
    ],
  },
  {
    id: 'ch_05_pythag_f',
    nodeId: NODE_C9_MATH_035,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A vertical pylon has height 12 m. A guy wire is anchored 5 m from the base. What is the wire length in metres?',
    correctAnswer: 13,
    tolerance: 0.1,
    unit: 'm',
    explanation: 'By the Pythagoras Theorem: c² = 12² + 5² = 144 + 25 = 169. Therefore, wire length c = √169 = 13 m.',
    hints: [
      'Identify the legs of the right triangle: a = 12, b = 5.',
      'Compute a² + b² = 144 + 25 = 169.',
      'Take the square root of 169 to find the hypotenuse.',
    ],
  },
  {
    id: 'ch_06_drag_label_props',
    nodeId: NODE_C9_MATH_038,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each special parallelogram to its definitive, unique diagonal property.',
    dragItems: [
      { label: 'Diagonals equal & bisect', targetId: 'target_rect' },
      { label: 'Diagonals perp. & bisect', targetId: 'target_rhombus' },
      { label: 'Equal, perp. & bisect angles', targetId: 'target_square' },
      { label: 'Diagonals only bisect', targetId: 'target_pgm' },
    ],
    correctMapping: {
      target_rect: 'Diagonals equal & bisect',
      target_rhombus: 'Diagonals perp. & bisect',
      target_square: 'Equal, perp. & bisect angles',
      target_pgm: 'Diagonals only bisect',
    },
    explanation: 'General Parallelograms have diagonals that bisect; Rectangles add equality; Rhombuses add perpendicularity and angle bisection; Squares have all three.',
    hints: [
      'A rectangle has 90° corners, giving equal diagonals.',
      'A rhombus has 4 equal sides, making its diagonals perpendicular.',
      'A square is both a rectangle and a rhombus.',
    ],
  },
  {
    id: 'ch_07_hex_f',
    nodeId: NODE_C9_MATH_040,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What unique geometric fact makes constructing a regular hexagon with compass and ruler so straightforward?',
    options: [
      'The interior angles are 90°',
      'Each side length is exactly equal to the radius of its circumscribed circle (s = r)',
      'The diagonals are all perpendicular bisectors',
      'A hexagon has 8 lines of symmetry',
    ],
    correctIndex: 1,
    explanation: 'In a regular hexagon, six equilateral triangles meet at the centre, meaning each side of the hexagon equals the circumradius r. Stepping the compass with radius r six times around the circle lands perfectly back at the start.',
    hints: [
      'Consider the 6 triangles formed by joining the vertices to the centre.',
      'The central angle is 360° / 6 = 60°.',
      'Isosceles triangles with a 60° vertex angle are equilateral, so side = radius.',
    ],
  },

  // Standard Tier (8-15)
  {
    id: 'ch_08_range_s',
    nodeId: NODE_C9_MATH_031,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Two sides of an antenna support triangle are 6 cm and 11 cm. What is the complete algebraic range of integer lengths possible for the third side c?',
    options: [
      '5 < c < 17 (Integers: 6, 7, 8, ..., 16)',
      '5 ≤ c ≤ 17 (Integers: 5, 6, ..., 17)',
      '6 < c < 11',
      'c > 17 only',
    ],
    correctIndex: 0,
    explanation: 'The triangle inequality gives |11 - 6| < c < 11 + 6, which is 5 < c < 17. The bounds 5 and 17 are strictly excluded because they cause the triangle to collapse into a straight line.',
    hints: [
      'Calculate the difference of the two sides: 11 - 6 = 5.',
      'Calculate the sum of the two sides: 11 + 6 = 17.',
      'The range is strictly |a - b| < c < a + b.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_09_pgm_angles_s',
    nodeId: NODE_C9_MATH_036,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a parallelogram ABCD, angle A = (3x - 20)° and its adjacent co-interior angle B = (2x + 10)°. Find the degree measure of angle A.',
    correctAnswer: 94,
    tolerance: 0.5,
    unit: 'degrees',
    explanation: 'Adjacent angles in a parallelogram are supplementary: (3x - 20) + (2x + 10) = 180 => 5x - 10 = 180 => 5x = 190 => x = 38. Thus angle A = 3(38) - 20 = 114 - 20 = 94°.',
    hints: [
      'Adjacent angles between parallel lines add to 180° (co-interior angles).',
      'Set up the equation: (3x - 20) + (2x + 10) = 180.',
      'Solve for x = 38, then calculate 3(38) - 20.',
    ],
  },
  {
    id: 'ch_10_rhombus_side_s',
    nodeId: NODE_C9_MATH_038,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The diagonals of a decorative rhombus tile are 16 cm and 12 cm. Find the perimeter of the rhombus in cm.',
    correctAnswer: 40,
    tolerance: 0.1,
    unit: 'cm',
    explanation: 'Diagonals of a rhombus bisect each other at right angles. Half-diagonals are 8 cm and 6 cm. Side = √(8² + 6²) = √(64 + 36) = 10 cm. Perimeter = 4 × 10 = 40 cm.',
    hints: [
      'Find half of each diagonal: 16/2 = 8 cm, 12/2 = 6 cm.',
      'Use Pythagoras on the right triangle formed by the half-diagonals: side² = 8² + 6².',
      'Multiply the side length (10 cm) by 4 for the perimeter.',
    ],
  },
  {
    id: 'ch_11_converse_pgm_s',
    nodeId: NODE_C9_MATH_037,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A surveyor checks a boundary ABCD and notes: AB = 14 m, CD = 14 m, and line AB is parallel to line CD. Is this sufficient evidence that ABCD is a parallelogram?',
    options: [
      'No, the surveyor must also measure sides AD and BC',
      'Yes, by Theorem 1: if ONE pair of opposite sides of a quadrilateral is both equal and parallel, it is guaranteed to be a parallelogram',
      'No, because the angles might not be 90°',
      'Yes, only if the diagonals are also equal',
    ],
    correctIndex: 1,
    explanation: 'Theorem 1 states that if in a quadrilateral ONE pair of opposite sides is both equal and parallel, the figure is automatically a parallelogram. Checking one pair is fully sufficient.',
    hints: [
      'Is the SAME pair of sides both equal and parallel? (AB = CD and AB || CD)',
      'Recall the converse theorem for parallelograms.',
      'You only need one pair satisfying both properties to guarantee a parallelogram.',
    ],
  },
  {
    id: 'ch_12_drag_sort_proof',
    nodeId: NODE_C9_MATH_033,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the formal deductive proof steps for the Mid-Point Theorem in logical order:',
    sortItems: [
      'Extend DE to F such that DE = EF, and join F to C',
      'Prove △ADE ≅ △CFE using SAS congruence',
      'Deduce AD = CF and AD || CF by CPCT',
      'Recognise DBCF is a parallelogram (DB = CF and DB || CF)',
      'Conclude DF || BC and DE = 1/2 BC',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The proof begins with the auxiliary construction (extending DE to F), establishes SAS triangle congruence, applies CPCT to make DBCF a parallelogram, and finishes with DE = 1/2 BC.',
    hints: [
      'Step 1 must be the auxiliary construction (extend DE to F).',
      'Step 2 proves triangles ADE and CFE congruent.',
      'Step 3 uses CPCT, which enables Step 4 (quadrilateral DBCF is a parallelogram).',
    ],
  },
  {
    id: 'ch_13_pythag_converse_s',
    nodeId: NODE_C9_MATH_035,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'An Indian railway engineer tests three bridge beam lengths: 9 m, 40 m, and 41 m. Does this frame form a perfect right-angled corner?',
    options: [
      'Yes, because 9² + 40² = 81 + 1600 = 1681 = 41²',
      'No, because 9 + 40 = 49 ≠ 41',
      'No, because 41 is a prime number',
      'Yes, because 9 is divisible by 3',
    ],
    correctIndex: 0,
    explanation: 'By the Converse of the Pythagoras Theorem, since 9² + 40² = 81 + 1600 = 1681 = 41², the angle opposite the 41 m beam is exactly 90°.',
    hints: [
      'Square the two smaller sides: 9² = 81, 40² = 1600.',
      'Sum them: 81 + 1600 = 1681.',
      'Square the longest side: 41² = 1681. Compare the values.',
    ],
  },
  {
    id: 'ch_14_construct_rhombus_s',
    nodeId: NODE_C9_MATH_039,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'When constructing a rhombus ABCD given both diagonals AC = 8 cm and BD = 6 cm using compass and ruler only, why must we construct the perpendicular bisector of AC?',
    options: [
      'Because all diagonals in geometry are perpendicular',
      'Because the diagonals of a rhombus bisect each other at 90°, so BD must lie along the perpendicular bisector of AC',
      'To measure an angle of 60° without a protractor',
      'To make the perimeter 28 cm',
    ],
    correctIndex: 1,
    explanation: 'Rhombus diagonals are mutually perpendicular bisectors. Drawing the perpendicular bisector of AC locates the midpoint O and the line along which BD lies (3 cm on each side of O).',
    hints: [
      'What angle do rhombus diagonals make with each other at their intersection?',
      'They meet at 90° and cut each other in half.',
      'The perpendicular bisector contains all points equidistant from the ends and forms a 90° line through the midpoint.',
    ],
  },
  {
    id: 'ch_15_trapezium_mid_s',
    nodeId: NODE_C9_MATH_034,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a canal cross-section trapezium ABCD, AB || CD with AB = 10 m and CD = 16 m. E and F are the midpoints of non-parallel banks AD and BC. What is the mid-segment length EF in metres?',
    correctAnswer: 13,
    tolerance: 0.1,
    unit: 'm',
    explanation: 'By the Equal Intercept / Mid-Point Theorem in a trapezium, the line segment joining the midpoints of non-parallel sides is parallel to the bases and equals their arithmetic mean: EF = (AB + CD)/2 = (10 + 16)/2 = 13 m.',
    hints: [
      'Draw diagonal AC to split the trapezium into two triangles.',
      'Apply the Mid-Point Theorem in each triangle.',
      'EF = 1/2 AB + 1/2 CD = (10 + 16)/2.',
    ],
  },

  // Advanced Tier (16-22)
  {
    id: 'ch_16_four_triangles_a',
    nodeId: NODE_C9_MATH_037,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'The diagonals AC and BD of parallelogram ABCD intersect at O. Why do the four smaller triangles (△AOB, △BOC, △COD, △DOA) all have strictly equal areas?',
    options: [
      'Because all four triangles are congruent to each other',
      'Triangles on opposite sides are congruent (equal area), while adjacent triangles share the same altitude and have equal bases (AO = OC or BO = OD), giving equal area',
      'Because the diagonals are perpendicular',
      'Because the angle sum of each triangle is 180°',
    ],
    correctIndex: 1,
    explanation: 'Opposite triangles (e.g. △AOB and △COD) are congruent by ASA. Adjacent triangles (e.g. △AOB and △BOC) have equal bases AO = OC (diagonal bisection) and share vertex B, meaning they have the identical height from B to AC. Thus Area = 1/2 × base × height is equal for all four.',
    hints: [
      'Are adjacent triangles congruent? Not necessarily (their sides may differ).',
      'Recall the formula for triangle area: 1/2 × base × height.',
      'Since O is the midpoint, AO = OC, so △AOB and △BOC share the exact same height from B and equal base lengths.',
    ],
  },
  {
    id: 'ch_17_varignon_a',
    nodeId: NODE_C9_MATH_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Varignon\'s Theorem: In ANY quadrilateral PQRS (even irregular), joining the midpoints of consecutive sides W, X, Y, Z always forms what specific quadrilateral?',
    options: [
      'A regular square',
      'A parallelogram, because drawing diagonal PR shows WX || PR, YZ || PR, and WX = YZ = 1/2 PR by the Mid-Point Theorem',
      'A trapezium with one pair of parallel sides',
      'A kite with perpendicular diagonals',
    ],
    correctIndex: 1,
    explanation: 'In △PQR, WX || PR and WX = 1/2 PR. In △PSR, YZ || PR and YZ = 1/2 PR. Thus WX is equal and parallel to YZ, making WXYZ a parallelogram by Theorem 1.',
    hints: [
      'Draw diagonal PR dividing quadrilateral PQRS into two triangles △PQR and △PSR.',
      'Apply the Mid-Point Theorem to both triangles with respect to base PR.',
      'One pair of opposite sides in WXYZ is both equal and parallel to 1/2 PR.',
    ],
  },
  {
    id: 'ch_18_ladder_physics_a',
    nodeId: NODE_C9_MATH_035,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A 25 m inspection ladder rests against a vertical metro viaduct pier. The foot of the ladder is 7 m from the pier base. If the top slips down by 4 m, how many metres further does the foot slide outwards?',
    correctAnswer: 8,
    tolerance: 0.1,
    unit: 'm',
    explanation: 'Initial height: h1 = √(25² - 7²) = √(625 - 49) = ��576 = 24 m. After slipping 4 m down, new height h2 = 24 - 4 = 20 m. New base distance: d2 = √(25² - 20²) = √(625 - 400) = √225 = 15 m. The foot slid outwards by 15 - 7 = 8 m.',
    hints: [
      'Step 1: Calculate initial wall height using √(25² - 7²).',
      'Step 2: Subtract 4 m from the initial height to get the new height.',
      'Step 3: Calculate new base distance using √(25² - newHeight²), then subtract the initial 7 m.',
    ],
  },
  {
    id: 'ch_19_construct_statement_a',
    nodeId: NODE_C9_MATH_039,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the correct mathematical justification for constructing a parallelogram from two diagonals AC, BD and angle θ between them:',
    availableParts: [
      'Diagonals bisect each other at midpoint O',
      'Mark OA = OC = AC/2 on diagonal AC',
      'Construct angle θ at midpoint O',
      'Mark OB = OD = BD/2 on rays of angle θ',
      'Join vertices A-B-C-D in order',
    ],
    targetState: 'Diagonals bisect each other at midpoint O Mark OA = OC = AC/2 on diagonal AC Construct angle θ at midpoint O Mark OB = OD = BD/2 on rays of angle θ Join vertices A-B-C-D in order',
    validationHint: 'Add the steps in logical construction sequence from midpoint bisection to angle creation and vertex joining.',
    explanation: 'Constructing a parallelogram given both diagonals and their included angle requires halving both diagonals at their common intersection O, rotating the second diagonal ray by θ, and joining the four endpoints.',
    hints: [
      'Start by establishing that diagonals bisect each other at O.',
      'Lay down the first halved diagonal AC.',
      'Erect angle θ at O, lay off half-lengths OB and OD, then join the vertices.',
    ],
  },
  {
    id: 'ch_20_rhombus_area_a',
    nodeId: NODE_C9_MATH_038,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A solar collector has the shape of a rhombus with side 13 m and one diagonal 24 m. What is the surface area of the solar collector in square metres?',
    correctAnswer: 120,
    tolerance: 0.5,
    unit: 'sq m',
    explanation: 'Half-diagonal d1/2 = 12 m. In the right triangle, half of second diagonal d2/2 = √(13² - 12²) = √(169 - 144) = √25 = 5 m. Full second diagonal d2 = 10 m. Area of rhombus = 1/2 × d1 × d2 = 1/2 × 24 × 10 = 120 m².',
    hints: [
      'Use Pythagoras with hypotenuse = 13 and one leg = 12 to find the other half-diagonal.',
      'The other half-diagonal is 5 m, so the full second diagonal is 10 m.',
      'Calculate Area = 1/2 × d1 × d2 = 1/2 × 24 × 10.',
    ],
  },
  {
    id: 'ch_21_hex_area_a',
    nodeId: NODE_C9_MATH_040,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A hexagonal steel bolt head has side length a. Why is its exact total surface area equal to 6 × (√3 / 4) × a²?',
    options: [
      'Because it consists of 6 congruent equilateral triangles of side a clustered around the centre',
      'Because 6 × 120° = 720°',
      'Because it is inscribed in a square of side 2a',
      'Because its diagonals bisect at right angles',
    ],
    correctIndex: 0,
    explanation: 'Six lines from the centre to each vertex partition the regular hexagon into 6 equilateral triangles of side a. The area of one equilateral triangle is (√3/4)a², giving total area 6 × (√3/4)a² = (3√3 / 2)a².',
    hints: [
      'Recall the area formula for an equilateral triangle of side a: (√3/4)a².',
      'How many equilateral triangles make up a regular hexagon?',
      'Multiply the area of one triangle by 6.',
    ],
  },
  {
    id: 'ch_22_perp_pipe_a',
    nodeId: NODE_C9_MATH_032,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An oil pipeline station P is located 20 km perpendicularly from a straight national highway l. An oblique emergency pipe PX connects to a depot X located 15 km along the highway from the perpendicular foot M. How many kilometres longer is the oblique pipe PX than the shortest perpendicular distance PM?',
    correctAnswer: 5,
    tolerance: 0.1,
    unit: 'km',
    explanation: 'In right △PMX, PM = 20 km, MX = 15 km. Oblique pipe length PX = √(20² + 15²) = √(400 + 225) = √625 = 25 km. Difference = PX - PM = 25 - 20 = 5 km.',
    hints: [
      'Find the length of oblique segment PX using Pythagoras on legs 20 km and 15 km.',
      'PX = √(400 + 225) = 25 km.',
      'Subtract the perpendicular distance (20 km) from 25 km.',
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
  nodeId: NODE_C9_MATH_031,
  title: 'Geometry Mastery: Triangle Inequalities, Mid-Points & Quadrilateral Theorems',
  definition: 'The sum of any two sides of a triangle is strictly greater than the third side; the perpendicular is the shortest distance from a point to a line; the segment joining the midpoints of two sides of a triangle is parallel and half of the third side; parallelogram diagonals bisect each other and rhombus diagonals are perpendicular bisectors.',
  eli5: 'Think of geometric shapes as rigid bridges and frames. Two sticks must be longer combined than a third stick to form a roof; a straight drop is shorter than any slanted path; and joining the midpoints of a triangle gives a mini-bridge half the length of the base.',
  misconceptions: [
    {
      misconception: 'The two shorter sides can equal the third side (a + b = c) to form a triangle.',
      correction: 'Strict inequality is mandatory: a + b > c. At equality (a + b = c), the three segments collapse completely flat into a collinear line segment.',
    },
    {
      misconception: 'The perpendicular is shortest because it is vertical.',
      correction: 'Perpendicularity means meeting at 90°, regardless of orientation. In any right-angled triangle, the perpendicular is a leg while any oblique path is the hypotenuse, and hypotenuse > leg always.',
    },
    {
      misconception: 'The segment joining the midpoints is equal to the base side.',
      correction: 'The Mid-Point Theorem proves DE is parallel to BC AND DE = (1/2) BC (half the length, not equal).',
    },
    {
      misconception: 'Diagonals of all parallelograms are equal in length and perpendicular.',
      correction: 'General parallelograms only bisect each other. Equal diagonals belong to rectangles; perpendicular diagonals belong to rhombuses; squares have both.',
    },
    {
      misconception: 'Pythagoras theorem adds side lengths directly (c = a + b).',
      correction: 'Pythagoras theorem adds the SQUARES of the sides: c² = a² + b², so c = √(a² + b²).',
    },
  ],
  diagnosticQuestions: [
    { question: 'Can side lengths 5 cm, 7 cm, and 13 cm form a triangle?', options: ['Yes', 'No, because 5 + 7 = 12 < 13', 'Yes, because 7 + 13 > 5', 'Only if right-angled'], correctIndex: 1 },
    { question: 'What is the shortest line segment from an external point to a line?', options: ['The oblique line at 45°', 'The perpendicular segment', 'The longest median', 'Any bisector'], correctIndex: 1 },
    { question: 'In △ABC, D and E are midpoints of AB and AC. If DE = 8 cm, BC = ?', options: ['4 cm', '8 cm', '16 cm', '24 cm'], correctIndex: 2 },
    { question: 'If three parallel lines cut equal 5 cm intercepts on one line, what intercepts do they make on another?', options: ['Always equal intercepts', 'Always 5 cm', 'Twice as big', 'Zero'], correctIndex: 0 },
    { question: 'In a right triangle with legs 6 cm and 8 cm, the hypotenuse is:', options: ['14 cm', '10 cm', '48 cm', '100 cm'], correctIndex: 1 },
    { question: 'In a parallelogram ABCD, if angle A = 70°, what is opposite angle C?', options: ['110°', '70°', '90°', '180°'], correctIndex: 1 },
    { question: 'Which quadrilateral has diagonals that are PERPENDICULAR and BISECT each other, but not necessarily equal?', options: ['Rectangle', 'Rhombus', 'Trapezium', 'Square'], correctIndex: 1 },
    { question: 'How is a regular hexagon constructed with a compass of radius r?', options: ['Step radius r six times along the circle circumference', 'Draw 8 chords', 'Measure 90° angles with a protractor', 'Bisect the diameter 4 times'], correctIndex: 0 },
  ],
  masteryCriteria: 'Mastery of ICSE Class 9 theorems: Triangle Inequality, Shortest Perpendicular, Mid-Point & Intercept Theorems, Pythagoras Area Proof, Parallelogram & Rhombus Diagonals, and Hexagon Compass Construction.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Triangle Inequality Linkage',
    instruction: 'Drag the sliders for Side A, Side B, and Side C. Watch when the two rotating arms can bridge the gap to form a closed triangle vertex versus when they fall flat.',
    interactionType: 'triangle-inequality-builder',
    nodeId: NODE_C9_MATH_031,
  },
  {
    title: 'Lab 2: Perpendicular vs Oblique Paths',
    instruction: 'Slide point X along the road line l. Observe why the right triangle hypotenuse PX is ALWAYS longer than the perpendicular PM.',
    interactionType: 'perpendicular-slider',
    nodeId: NODE_C9_MATH_032,
  },
  {
    title: 'Lab 3: Mid-Point Theorem Dynamic Morph',
    instruction: 'Drag Vertex A of the triangle. Notice how segment DE joining midpoints remains strictly parallel to base BC and exactly half its length at all times.',
    interactionType: 'midpoint-morpher',
    nodeId: NODE_C9_MATH_033,
  },
  {
    title: 'Lab 4: Diagonal Inspector for Special Parallelograms',
    instruction: 'Toggle between Parallelogram, Rectangle, Rhombus, and Square. Inspect the diagonal angles and diagonal length equality.',
    interactionType: 'diagonal-inspector',
    nodeId: NODE_C9_MATH_038,
  },
  {
    title: 'Lab 5: Hexagon Compass Stepper',
    instruction: 'Click the "Step Compass" button to step the radius 6 times around the circle. See why six 60° equilateral triangles perfectly tile the 360° circle.',
    interactionType: 'hexagon-stepper',
    nodeId: NODE_C9_MATH_040,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Civil Engineering Truss & Pylon Design Project',
  description: 'Apply your geometric theorems to draft an earthquake-resistant triangular truss bridge over the Brahmaputra River and a regular hexagonal telecommunication tower pylon.',
  steps: [
    'Verify that every triangular brace obeys a + b > c with safety margin > 1.2 m to prevent buckling collapse.',
    'Anchor guy ropes using perpendicular shortest drop calculations to save 15% in high-tensile steel cable costs.',
    'Use Mid-Point Theorem scaffolding to lay intermediate railway support platforms at exactly half span.',
    'Step out hexagonal anchor foundations using compass circumradius geometry without requiring heavy electronic theodolites.',
  ],
};

function C9_MathematicsSidesTriangleGreaterSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org interactive discovery & prediction state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Prediction questions state
  const [predIndex, setPredIndex] = useState(0);
  const [predAnswers, setPredAnswers] = useState<Record<number, number>>({});
  const [showPredFeedback, setShowPredFeedback] = useState(false);

  // Observation questions state
  const [obsIndex, setObsIndex] = useState(0);
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});
  const [showObsFeedback, setShowObsFeedback] = useState(false);

  // Interactive Lab Manipulatives State
  const [sideA, setSideA] = useState(5);
  const [sideB, setSideB] = useState(6);
  const [sideC, setSideC] = useState(8);
  const [triangleAngle, setTriangleAngle] = useState(65);
  const [perpPM, setPerpPM] = useState(8);
  const [distMX, setDistMX] = useState(6);
  const [vertexAx, setVertexAx] = useState(150);
  const [vertexAy, setVertexAy] = useState(40);
  const [selectedQuadType, setSelectedQuadType] = useState<'pgm' | 'rect' | 'rhombus' | 'square'>('rhombus');
  const [hexSteps, setHexSteps] = useState(0);
  const [pythagA, setPythagA] = useState(6);
  const [pythagB, setPythagB] = useState(8);

  // Challenge Progression & Adaptive Mastery
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
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Feedback animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Challenge input states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses state
  const [reflections, setReflections] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Derived triangle inequality validity
  const isTriangleValid = useMemo(() => {
    return sideA + sideB > sideC && sideA + sideC > sideB && sideB + sideC > sideA;
  }, [sideA, sideB, sideC]);

  // Derived oblique hypotenuse
  const obliquePX = useMemo(() => {
    return Math.sqrt(perpPM * perpPM + distMX * distMX);
  }, [perpPM, distMX]);

  // Derived pythagoras hypotenuse
  const pythagHyp = useMemo(() => {
    return Math.sqrt(pythagA * pythagA + pythagB * pythagB);
  }, [pythagA, pythagB]);

  // SRS Schedule calculation
  const srsReviewDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  // Adaptive Challenge Filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM MASTERY STORE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C9_MATH_031);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE MASTERY EFFECT ───
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

    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS ANIMATION (Bridge Truss & Force Vectors) ───
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

      // Draw subtle mathematical coordinate grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(canvas.width, canvas.height); // full height
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw animated dynamic geometric wave / radar pulse
      const pulse = Math.sin(frame * 0.05) * 8;
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 35 + pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw active theorem indicator
      ctx.fillStyle = '#38bdf8';
      ctx.font = '12px monospace';
      ctx.fillText(`GEOM-CORRIDOR ACTIVE // NODE: ${challenge.nodeId}`, 15, 22);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [challenge.nodeId]);

  // ─── CALLBACKS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
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
    speechManager.speak(isCorrect ? 'Spot on! The bounds are strict.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handlePredictionAnswer = useCallback((qIdx: number, optIdx: number) => {
    setPredAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
    setShowPredFeedback(true);
    const isCorrect = optIdx === PREDICTION_QUESTIONS[qIdx].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, []);

  const handleObservationAnswer = useCallback((qIdx: number, optIdx: number) => {
    setObsAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
    setShowObsFeedback(true);
    const isCorrect = optIdx === OBSERVATION_QUESTIONS[qIdx].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the geometric labs hands-on!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Try any variables without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Ready for challenges. Read carefully and solve step by step.');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping && challenge.correctMapping[targetId] === draggedItem;
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
        const initial = prev.length === challenge.sortItems?.length ? prev : challenge.sortItems?.map((_, i) => i) || [];
        const arr = [...initial];
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Magnificent! You have mastered ICSE Class 9 Geometry.');
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
        const val = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(val - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Well reasoned.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
          speechManager.speak('Let us study the complete proof step by step.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleStepHexagon = useCallback(() => {
    setHexSteps((prev) => (prev + 1) % 7);
    audioManager.play('tap');
  }, []);

  const handleResetHexagon = useCallback(() => {
    setHexSteps(0);
    audioManager.play('pop');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl space-y-6"
    >
      {/* ─── HEADER & REAL-TIME TOPIC BADGE ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700 shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-800"
              >
                ICSE Class 9 Mathematics
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800"
              >
                NEP 2020 Competency Aligned
              </motion.span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white mt-1">{title}</h1>
          </div>
        </div>

        {/* Dynamic Canvas Monitor */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block w-72 h-14 bg-slate-900/90 rounded-xl border border-slate-700/80 overflow-hidden shadow-inner"
        >
          <canvas ref={canvasRef} width={288} height={56} className="w-full h-full" />
        </motion.div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK & BRILLIANT PREDICTION ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 md:p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-700/60 shadow-xl"
          >
            <h2 className="text-xl font-bold text-indigo-300 flex items-center gap-2">
              <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}>🌉</motion.span> {SCENARIO.title}
            </h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-3 p-3 bg-slate-950/60 rounded-xl border border-indigo-900/60 text-xs text-indigo-200"
            >
              <strong>Scenario Context:</strong> {SCENARIO.context}
            </motion.div>
          </motion.div>

          {/* Curiosity Discovery Question */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
          >
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>💡</motion.span>
              Curiosity Discovery Question (No Stakes)
            </div>
            <p className="text-base text-white font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`p-3.5 text-left text-sm rounded-xl border transition-all ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400'
                      : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-200'
                  }`}
                  aria-label={`Discovery option ${idx + 1}: ${option}`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + idx)}.</span> {option}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-3 space-y-3">
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className={`p-3.5 rounded-xl text-sm border ${
                    discoveryCorrect
                      ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                      : 'bg-amber-950/60 border-amber-600 text-amber-300'
                  }`}
                >
                  {discoveryCorrect
                    ? '✓ Excellent intuition! 3 < c < 13 is strictly required to prevent frame collapse.'
                    : `⚠️ ${DISCOVERY_QUESTION.hintAfter}`}
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {/* ─── BRILLIANT.ORG PREDICT-THEN-CHECK CARDS ─── */}
          <div className="p-5 bg-indigo-950/30 rounded-2xl border border-indigo-800/50 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                <span>🔮</span> Brilliant.org Prediction Challenge ({predIndex + 1} of {PREDICTION_QUESTIONS.length})
              </h3>
              <span className="text-xs text-slate-400">Predict before testing in labs!</span>
            </div>

            <p className="text-sm text-slate-100 font-medium">{PREDICTION_QUESTIONS[predIndex].question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {PREDICTION_QUESTIONS[predIndex].options.map((opt, oIdx) => (
                <motion.button
                  key={oIdx}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handlePredictionAnswer(predIndex, oIdx)}
                  className={`p-3 text-left text-xs rounded-xl border transition-all ${
                    predAnswers[predIndex] !== undefined
                      ? oIdx === PREDICTION_QUESTIONS[predIndex].correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : predAnswers[predIndex] === oIdx
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                      : 'bg-slate-900/90 hover:bg-slate-800 border-slate-800 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {predAnswers[predIndex] !== undefined && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-slate-950 rounded-xl border border-indigo-900 text-xs space-y-2">
                <div className="text-slate-300">
                  <strong className="text-amber-400">🔬 How to Verify:</strong> {PREDICTION_QUESTIONS[predIndex].verifyInstruction}
                </div>
                <div className="flex gap-2 justify-end pt-1">
                  {predIndex < PREDICTION_QUESTIONS.length - 1 ? (
                    <button
                      onClick={() => {
                        setPredIndex((p) => p + 1);
                        setShowPredFeedback(false);
                      }}
                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
                    >
                      Next Prediction Question →
                    </button>
                  ) : (
                    <span className="text-emerald-400 font-bold self-center">✓ All Predictions Recorded!</span>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          <motion.div className="flex justify-end pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToExploration}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg flex items-center gap-2"
            >
              Enter Interactive Geometric Labs →
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (BRILLIANT-STYLE LABS) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
          {/* Lab Step Selector Tabs */}
          <div className="flex flex-wrap gap-2 pb-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  currentSlide === idx
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Lab {idx + 1}: {step.title.split(':')[1] || step.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-indigo-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>
              <p className="text-sm text-amber-300 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>

              {/* ─── LAB 1: TRIANGLE INEQUALITY LINKAGE BUILDER ─── */}
              {currentSlide === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800"
                >
                  <div className="lg:col-span-7 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 400 240" className="w-full max-w-md bg-slate-900/90 rounded-xl border border-slate-800 p-2">
                      <line x1="60" y1="180" x2={60 + sideC * 24} y2="180" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                      <text x={60 + (sideC * 24) / 2} y="200" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
                        Base Side c = {sideC} cm
                      </text>

                      {/* Arm A swinging from left vertex */}
                      <line
                        x1="60"
                        y1="180"
                        x2={60 + sideA * 24 * Math.cos((triangleAngle * Math.PI) / 180)}
                        y2={180 - sideA * 24 * Math.sin((triangleAngle * Math.PI) / 180)}
                        stroke="#a855f7"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <text
                        x={45 + (sideA * 12 * Math.cos((triangleAngle * Math.PI) / 180))}
                        y={170 - (sideA * 12 * Math.sin((triangleAngle * Math.PI) / 180))}
                        fill="#a855f7"
                        fontSize="11"
                      >
                        a = {sideA}
                      </text>

                      {/* Vertex circles */}
                      <circle cx="60" cy="180" r="5" fill="#e2e8f0" />
                      <circle cx={60 + sideC * 24} cy="180" r="5" fill="#e2e8f0" />

                      {/* Status text badge in SVG */}
                      <rect x="20" y="20" width="220" height="30" rx="6" fill={isTriangleValid ? '#064e3b' : '#7f1d1d'} />
                      <text x="130" y="40" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                        {isTriangleValid ? `✓ Valid Triangle (${sideA}+${sideB}=${sideA + sideB} > ${sideC})` : `✗ Collapsed / Broken (${sideA}+${sideB} ≤ ${sideC})`}
                      </text>
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Side a: {sideA} cm</span>
                        <span>Side b: {sideB} cm</span>
                      </div>
                      <input
                        type="range"
                        min={2}
                        max={12}
                        value={sideA}
                        onChange={(e) => setSideA(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Adjust Side a"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Base Side c: {sideC} cm</span>
                        <span className="text-amber-400">Sum (a+b) = {sideA + sideB} cm</span>
                      </div>
                      <input
                        type="range"
                        min={3}
                        max={15}
                        value={sideC}
                        onChange={(e) => setSideC(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Adjust Base Side c"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Vertex Angle θ: {triangleAngle}°</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={170}
                        value={triangleAngle}
                        onChange={(e) => setTriangleAngle(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Adjust vertex angle"
                      />
                    </div>

                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1"
                    >
                      <div className="text-slate-400">Theorem Check:</div>
                      <div className={sideA + sideB > sideC ? 'text-emerald-400' : 'text-rose-400 font-bold'}>
                        1. a + b ({sideA + sideB}) {sideA + sideB > sideC ? '>' : '≤'} c ({sideC})
                      </div>
                      <div className={sideA + sideC > sideB ? 'text-emerald-400' : 'text-rose-400 font-bold'}>
                        2. a + c ({sideA + sideC}) {sideA + sideC > sideB ? '>' : '≤'} b ({sideB})
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ─── LAB 2: SHORTEST PERPENDICULAR VS OBLIQUE ─── */}
              {currentSlide === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800"
                >
                  <div className="lg:col-span-7 flex flex-col items-center">
                    <svg viewBox="0 0 400 240" className="w-full max-w-md bg-slate-900/90 rounded-xl border border-slate-800 p-2">
                      {/* Straight Line l */}
                      <line x1="30" y1="180" x2="370" y2="180" stroke="#64748b" strokeWidth="3" />
                      <text x="375" y="185" fill="#94a3b8" fontSize="12">Line l</text>

                      {/* Point P */}
                      <circle cx="120" cy="50" r="5" fill="#f59e0b" />
                      <text x="120" y="40" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Point P</text>

                      {/* Perpendicular PM */}
                      <line x1="120" y1="50" x2="120" y2="180" stroke="#10b981" strokeWidth="3" />
                      <rect x="120" y="165" width="15" height="15" fill="none" stroke="#10b981" strokeWidth="1.5" />
                      <text x="105" y="120" textAnchor="end" fill="#10b981" fontSize="11" fontWeight="bold">
                        PM = {perpPM} m (Perpendicular)
                      </text>

                      {/* Foot M */}
                      <circle cx="120" cy="180" r="4" fill="#10b981" />
                      <text x="120" y="200" textAnchor="middle" fill="#10b981" fontSize="11">M</text>

                      {/* Oblique PX */}
                      <line x1="120" y1="50" x2={120 + distMX * 18} y2="180" stroke="#ec4899" strokeWidth="3" strokeDasharray="5,3" />
                      <circle cx={120 + distMX * 18} cy="180" r="4" fill="#ec4899" />
                      <text x={120 + distMX * 18} y="200" textAnchor="middle" fill="#ec4899" fontSize="11">X</text>

                      <text x={135 + (distMX * 18) / 2} y="110" fill="#ec4899" fontSize="11" fontWeight="bold">
                        PX = {obliquePX.toFixed(1)} m (Oblique)
                      </text>
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Perpendicular Drop PM: {perpPM} m</span>
                      </div>
                      <input
                        type="range"
                        min={4}
                        max={14}
                        value={perpPM}
                        onChange={(e) => setPerpPM(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                        aria-label="Adjust perpendicular PM"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Along-Road Distance MX: {distMX} m</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={13}
                        value={distMX}
                        onChange={(e) => setDistMX(Number(e.target.value))}
                        className="w-full accent-pink-500"
                        aria-label="Adjust distance MX"
                      />
                    </div>

                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2"
                    >
                      <div className="font-semibold text-indigo-300">Pythagorean Metric:</div>
                      <div className="text-slate-300">
                        PX² = PM² + MX² = {perpPM}² + {distMX}² = {perpPM * perpPM + distMX * distMX}
                      </div>
                      <div className="text-emerald-400 font-bold">
                        PX = {obliquePX.toFixed(2)} m &gt; PM ({perpPM} m)
                      </div>
                      <p className="text-slate-400 text-[11px]">
                        The perpendicular PM is strictly shorter than any oblique segment PX because PX is always the hypotenuse.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ─── LAB 3: MID-POINT THEOREM DYNAMIC MORPHER ─── */}
              {currentSlide === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800"
                >
                  <div className="lg:col-span-7 flex flex-col items-center">
                    <svg viewBox="0 0 400 240" className="w-full max-w-md bg-slate-900/90 rounded-xl border border-slate-800 p-2">
                      {/* Base BC */}
                      <line x1="50" y1="200" x2="350" y2="200" stroke="#38bdf8" strokeWidth="4" />
                      <text x="40" y="215" fill="#38bdf8" fontSize="12" fontWeight="bold">B</text>
                      <text x="355" y="215" fill="#38bdf8" fontSize="12" fontWeight="bold">C (Base = 300 px)</text>

                      {/* Vertex A */}
                      <line x1="50" y1="200" x2={vertexAx} y2={vertexAy} stroke="#94a3b8" strokeWidth="2" />
                      <line x1="350" y1="200" x2={vertexAx} y2={vertexAy} stroke="#94a3b8" strokeWidth="2" />
                      <circle cx={vertexAx} cy={vertexAy} r="6" fill="#f59e0b" />
                      <text x={vertexAx} y={vertexAy - 10} textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">A (Apex)</text>

                      {/* Midpoints D on AB and E on AC */}
                      {(() => {
                        const dx = (50 + vertexAx) / 2;
                        const dy = (200 + vertexAy) / 2;
                        const ex = (350 + vertexAx) / 2;
                        const ey = (200 + vertexAy) / 2;
                        return (
                          <>
                            <line x1={dx} y1={dy} x2={ex} y2={ey} stroke="#10b981" strokeWidth="3.5" />
                            <circle cx={dx} cy={dy} r="4.5" fill="#10b981" />
                            <text x={dx - 15} y={dy} fill="#10b981" fontSize="11" fontWeight="bold">D</text>
                            <circle cx={ex} cy={ey} r="4.5" fill="#10b981" />
                            <text x={ex + 10} y={ey} fill="#10b981" fontSize="11" fontWeight="bold">E</text>

                            <text x={(dx + ex) / 2} y={dy - 8} textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">
                              DE || BC (Length = 150 px = 1/2 BC)
                            </text>
                          </>
                        );
                      })()}
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Apex X Position: {vertexAx} px</span>
                      </div>
                      <input
                        type="range"
                        min={70}
                        max={330}
                        value={vertexAx}
                        onChange={(e) => setVertexAx(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Adjust Apex X"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Apex Height Y: {vertexAy} px</span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={140}
                        value={vertexAy}
                        onChange={(e) => setVertexAy(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Adjust Apex Height Y"
                      />
                    </div>

                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2"
                    >
                      <div className="text-emerald-400 font-bold">Mid-Point Invariant:</div>
                      <p className="text-slate-300">
                        No matter how you skew or stretch △ABC, the slope of DE always equals the slope of BC (0°), and DE length is ALWAYS 1/2 of BC.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ─── LAB 4: DIAGONAL INSPECTOR (RHOMBUS / RECTANGLE / SQUARE) ─── */}
              {currentSlide === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800"
                >
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'pgm' as const, label: 'Parallelogram' },
                      { id: 'rect' as const, label: 'Rectangle' },
                      { id: 'rhombus' as const, label: 'Rhombus' },
                      { id: 'square' as const, label: 'Square' },
                    ].map((item) => (
                      <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedQuadType(item.id);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          selectedQuadType === item.id
                            ? 'bg-indigo-600 border-indigo-400 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <svg viewBox="0 0 320 200" className="w-full bg-slate-900 rounded-xl border border-slate-800 p-2">
                      {selectedQuadType === 'pgm' && (
                        <>
                          <polygon points="60,150 220,150 260,50 100,50" fill="none" stroke="#6366f1" strokeWidth="2.5" />
                          <line x1="60" y1="150" x2="260" y2="50" stroke="#ec4899" strokeWidth="2" strokeDasharray="4,2" />
                          <line x1="100" y1="50" x2="220" y2="150" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,2" />
                          <circle cx="160" cy="100" r="4" fill="#f59e0b" />
                          <text x="160" y="125" textAnchor="middle" fill="#f59e0b" fontSize="10">O (Bisects only)</text>
                        </>
                      )}
                      {selectedQuadType === 'rect' && (
                        <>
                          <polygon points="50,150 270,150 270,50 50,50" fill="none" stroke="#6366f1" strokeWidth="2.5" />
                          <line x1="50" y1="150" x2="270" y2="50" stroke="#38bdf8" strokeWidth="2" />
                          <line x1="50" y1="50" x2="270" y2="150" stroke="#38bdf8" strokeWidth="2" />
                          <circle cx="160" cy="100" r="4" fill="#f59e0b" />
                          <text x="160" y="125" textAnchor="middle" fill="#38bdf8" fontSize="10">Diagonals Equal (d1 = d2)</text>
                        </>
                      )}
                      {selectedQuadType === 'rhombus' && (
                        <>
                          <polygon points="160,30 260,100 160,170 60,100" fill="none" stroke="#10b981" strokeWidth="2.5" />
                          <line x1="60" y1="100" x2="260" y2="100" stroke="#ec4899" strokeWidth="2" />
                          <line x1="160" y1="30" x2="160" y2="170" stroke="#38bdf8" strokeWidth="2" />
                          <circle cx="160" cy="100" r="4" fill="#f59e0b" />
                          <rect x="160" y="100" width="12" height="12" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
                          <text x="160" y="125" textAnchor="middle" fill="#10b981" fontSize="10">Perpendicular (90°)</text>
                        </>
                      )}
                      {selectedQuadType === 'square' && (
                        <>
                          <polygon points="70,160 210,160 210,20 70,20" fill="none" stroke="#eab308" strokeWidth="2.5" />
                          <line x1="70" y1="160" x2="210" y2="20" stroke="#eab308" strokeWidth="2" />
                          <line x1="70" y1="20" x2="210" y2="160" stroke="#eab308" strokeWidth="2" />
                          <circle cx="140" cy="90" r="4" fill="#f59e0b" />
                          <rect x="140" y="90" width="12" height="12" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
                          <text x="140" y="120" textAnchor="middle" fill="#eab308" fontSize="10">Equal &amp; Perpendicular (90°)</text>
                        </>
                      )}
                    </svg>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                      <div className="font-bold text-white capitalize">{selectedQuadType} Properties:</div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400">✓</span> Bisect each other: <strong>Always True</strong>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={selectedQuadType === 'rect' || selectedQuadType === 'square' ? 'text-emerald-400' : 'text-slate-600'}>
                          {selectedQuadType === 'rect' || selectedQuadType === 'square' ? '✓' : '✗'}
                        </span>
                        <span>Diagonals Equal: <strong>{selectedQuadType === 'rect' || selectedQuadType === 'square' ? 'YES' : 'NO'}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={selectedQuadType === 'rhombus' || selectedQuadType === 'square' ? 'text-emerald-400' : 'text-slate-600'}>
                          {selectedQuadType === 'rhombus' || selectedQuadType === 'square' ? '✓' : '✗'}
                        </span>
                        <span>Diagonals Perpendicular (90°): <strong>{selectedQuadType === 'rhombus' || selectedQuadType === 'square' ? 'YES' : 'NO'}</strong></span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ─── LAB 5: REGULAR HEXAGON COMPASS STEPPER ─── */}
              {currentSlide === 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 items-center"
                >
                  <div className="md:col-span-7 flex flex-col items-center">
                    <svg viewBox="0 0 300 240" className="w-full max-w-xs bg-slate-900 rounded-xl border border-slate-800 p-2">
                      <circle cx="150" cy="120" r="80" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="3,3" />
                      <circle cx="150" cy="120" r="4" fill="#f59e0b" />
                      <text x="150" y="115" textAnchor="middle" fill="#f59e0b" fontSize="10">O</text>

                      {/* Six vertices around circle */}
                      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                        const rad = (deg * Math.PI) / 180;
                        const x = 150 + 80 * Math.cos(rad);
                        const y = 120 + 80 * Math.sin(rad);
                        const isReached = hexSteps > i;
                        return (
                          <g key={i}>
                            {isReached && (
                              <circle cx={x} cy={y} r="5" fill="#10b981" />
                            )}
                            <text x={x + 12 * Math.cos(rad)} y={y + 12 * Math.sin(rad)} fill="#94a3b8" fontSize="10" textAnchor="middle">
                              {String.fromCharCode(65 + i)}
                            </text>
                          </g>
                        );
                      })}

                      {/* Hexagon sides drawn up to hexSteps */}
                      {hexSteps >= 6 && (
                        <polygon
                          points={[0, 60, 120, 180, 240, 300]
                            .map((deg) => {
                              const rad = (deg * Math.PI) / 180;
                              return `${150 + 80 * Math.cos(rad)},${120 + 80 * Math.sin(rad)}`;
                            })
                            .join(' ')}
                          fill="rgba(16, 185, 129, 0.15)"
                          stroke="#10b981"
                          strokeWidth="2.5"
                        />
                      )}
                    </svg>
                  </div>

                  <div className="md:col-span-5 space-y-3 text-xs">
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleStepHexagon}
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow"
                      >
                        Step Compass ({hexSteps}/6)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleResetHexagon}
                        className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700"
                      >
                        Reset
                      </motion.button>
                    </div>

                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1"
                    >
                      <div className="font-bold text-indigo-300">Compass Rule:</div>
                      <p className="text-slate-300">
                        Side length = Circumradius <em>r</em>. Stepping the fixed compass 6 times yields six 60° central angles (6 × 60° = 360°), forming a regular hexagon.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ─── BRILLIANT OBSERVATION QUESTIONS (WHAT DO YOU NOTICE?) ─── */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <span>👁️</span> What Do You Notice? Observation Check ({obsIndex + 1} of {OBSERVATION_QUESTIONS.length})
              </h4>
              <span className="text-[11px] text-slate-400">Based on active lab visualization</span>
            </div>

            <p className="text-xs text-slate-200 font-medium">{OBSERVATION_QUESTIONS[obsIndex].question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {OBSERVATION_QUESTIONS[obsIndex].observableOptions.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleObservationAnswer(obsIndex, oIdx)}
                  className={`p-2.5 text-left text-xs rounded-lg border transition-all ${
                    obsAnswers[obsIndex] !== undefined
                      ? oIdx === OBSERVATION_QUESTIONS[obsIndex].correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : obsAnswers[obsIndex] === oIdx
                        ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                      : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300'
                  }`}
                >
                  <span className="font-bold mr-1.5 text-indigo-400">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                </button>
              ))}
            </div>

            {obsAnswers[obsIndex] !== undefined && (
              <div className="p-2.5 bg-slate-950 rounded-lg text-xs text-slate-300 border border-slate-800 flex justify-between items-center">
                <span>{OBSERVATION_QUESTIONS[obsIndex].explanation}</span>
                {obsIndex < OBSERVATION_QUESTIONS.length - 1 && (
                  <button
                    onClick={() => {
                      setObsIndex((i) => i + 1);
                      setShowObsFeedback(false);
                    }}
                    className="ml-2 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold whitespace-nowrap"
                  >
                    Next Observation →
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl disabled:opacity-40 text-sm font-semibold"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs font-mono text-slate-400">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('tap');
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-slate-900 rounded-2xl border border-slate-800"
          >
            <h3 className="text-lg font-bold text-indigo-300">Free Exploration Sandbox (Zero Grading Pressure)</h3>
            <p className="text-xs text-slate-400 mt-1">
              Freely manipulate the Pythagoras visual tile area proof and live angle linkages before starting board challenges.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
            {/* Pythagoras Area-Based Visual Proof */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 300 240" className="w-full bg-slate-900 rounded-xl border border-slate-800 p-2">
                {/* Central Right Triangle */}
                <polygon points="100,160 160,160 100,80" fill="#312e81" stroke="#6366f1" strokeWidth="2" />
                {/* Square on leg a (base 60 px) */}
                <rect x="100" y="160" width="60" height="60" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" strokeWidth="2" />
                <text x="130" y="195" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">
                  a² = {pythagA * pythagA}
                </text>
                {/* Square on leg b (height 80 px) */}
                <rect x="20" y="80" width="80" height="80" fill="rgba(56, 189, 248, 0.25)" stroke="#38bdf8" strokeWidth="2" />
                <text x="60" y="125" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
                  b² = {pythagB * pythagB}
                </text>
                {/* Hypotenuse label */}
                <text x="145" y="110" fill="#f59e0b" fontSize="11" fontWeight="bold">
                  c² = {pythagA * pythagA + pythagB * pythagB}
                </text>
              </svg>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Leg a: {pythagA} cm</span>
                  <span>a² = {pythagA * pythagA} cm²</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={12}
                  value={pythagA}
                  onChange={(e) => setPythagA(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                  aria-label="Adjust Leg a"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Leg b: {pythagB} cm</span>
                  <span>b² = {pythagB * pythagB} cm²</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={14}
                  value={pythagB}
                  onChange={(e) => setPythagB(Number(e.target.value))}
                  className="w-full accent-sky-500"
                  aria-label="Adjust Leg b"
                />
              </div>

              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1"
              >
                <div className="text-amber-400 font-bold">Sum of Square Areas:</div>
                <div className="text-slate-300">
                  a² + b² = {pythagA * pythagA} + {pythagB * pythagB} = {pythagA * pythagA + pythagB * pythagB}
                </div>
                <div className="text-emerald-400 font-bold">
                  Hypotenuse c = √({pythagA * pythagA + pythagB * pythagB}) = {pythagHyp.toFixed(2)} cm
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg mt-2 text-sm"
              >
                I am Ready for Challenges! →
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: BOARD CHALLENGES (ADAPTIVE + VISUAL FEEDBACK) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
          {/* Top Status & Tier Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800"
          >
            <div>
              <div className="text-xs font-medium text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </div>
              <div className="text-sm font-bold text-white flex items-center gap-2 mt-0.5">
                <span>Node: {challenge.nodeId}</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800">
                  {challenge.competencyLevel.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950/70 border-emerald-600 text-emerald-300'
                    : difficulty === 'standard'
                    ? 'bg-blue-950/70 border-blue-600 text-blue-300'
                    : 'bg-rose-950/70 border-rose-600 text-rose-300'
                }`}
              >
                TIER: {difficulty.toUpperCase()}
              </motion.span>
              <span className="text-xs text-slate-400">
                Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
              </span>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-5 md:p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'bg-slate-900/90 border-slate-800 shadow-xl'
            }`}
          >
            <p className="text-base md:text-lg text-white font-medium mb-4 leading-relaxed">
              {challenge.question}
            </p>

            {/* MCQ Type */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all ${
                        showExplanation
                          ? i === challenge.correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : 'bg-slate-800/40 border-slate-800 text-slate-400'
                          : 'bg-slate-800 hover:bg-slate-700/90 border-slate-700 text-slate-200'
                      }`}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    >
                      <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span> {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Numeric Input Type */}
            {challenge.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <input
                  type="number"
                  step="any"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  disabled={showExplanation}
                  placeholder="Enter numeric value"
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 text-sm"
                  aria-label="Numeric answer input"
                />
                <span className="text-slate-400 text-sm font-semibold">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || numericInput === ''}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm shadow"
                >
                  Verify
                </motion.button>
              </div>
            )}

            {/* Drag-Label Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-semibold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'target_rect', label: 'Rectangle' },
                    { id: 'target_rhombus', label: 'Rhombus' },
                    { id: 'target_square', label: 'Square' },
                    { id: 'target_pgm', label: 'General Parallelogram' },
                  ].map((target) => (
                    <motion.div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-3.5 rounded-xl border-2 border-dashed flex flex-col justify-center min-h-[70px] ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-300">{target.label}:</span>
                      <span className="text-xs text-indigo-300 font-semibold mt-1">
                        {droppedLabels[target.id] || 'Drop Property Here'}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm"
                >
                  Check Properties
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-900 text-indigo-300 flex items-center justify-center font-bold text-[11px]">
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
                        : challenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm"
                >
                  Check Logical Sequence
                </motion.button>
              </div>
            )}

            {/* Construct Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 text-indigo-200 text-xs rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[80px] flex flex-wrap gap-2">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-2.5 py-1 bg-indigo-600 text-white text-xs rounded-md flex items-center gap-1.5 shadow"
                    >
                      {part}
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-indigo-200 hover:text-white font-bold"
                      >
                        ✕
                      </motion.button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click parts above to assemble your proof chain</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm"
                >
                  Verify Proof Chain
                </motion.button>
              </div>
            )}

            {/* Progressive Step Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-amber-950/40 border border-amber-700/60 rounded-xl space-y-3"
              >
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Step-by-Step Rigorous ICSE Proof &amp; Explanation:
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs text-amber-200 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400">{idx + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-3.5 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold shadow"
                  >
                    Show Next Deduction Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="block px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finish & View Certificate →' : 'Next Board Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MISCONCEPTION PROFILE & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 rounded-3xl border border-indigo-700 shadow-2xl text-center space-y-3"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">🎉 Geometry Mastery Complete!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have successfully solved advanced ICSE Class 9 geometric deduction challenges across all 10 core nodes.
            </p>
            <div className="flex justify-center gap-6 pt-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-3 bg-slate-950/80 rounded-xl border border-indigo-900 min-w-[120px]"
              >
                <div className="text-xs text-slate-400">Final Score</div>
                <div className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-3 bg-slate-950/80 rounded-xl border border-indigo-900 min-w-[120px]"
              >
                <div className="text-xs text-slate-400">Mastery Level</div>
                <div className="text-xl font-bold text-indigo-300 capitalize">{masteryLevel}</div>
              </motion.div>
            </div>
          </motion.div>

          {/* ─── VISIBLE SPACED REPETITION SCHEDULE (SRS SM-2) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-gradient-to-r from-amber-950/70 to-indigo-950/70 rounded-2xl border-2 border-amber-600/80 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🗓️</span>
              <div>
                <h4 className="text-sm font-bold text-amber-200 uppercase tracking-wide">
                  Spaced Repetition Review Scheduled
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Based on your performance ({errors === 0 ? '0 errors (Perfect)' : `${errors} error(s)`}), the optimal SM-2 recall window is calculated:
                </p>
              </div>
            </div>
            <div className="px-4 py-2 bg-amber-500/20 border border-amber-400 rounded-xl text-center whitespace-nowrap">
              <div className="text-[10px] uppercase font-bold text-amber-300">Next Recommended Practice:</div>
              <div className="text-lg font-black text-amber-200">
                {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
              </div>
            </div>
          </motion.div>

          {/* Motivational Feedback */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-700/60 text-emerald-300 text-xs leading-relaxed"
          >
            {errors === 0
              ? '🌟 PERFECT SCORE! You demonstrated flawless mathematical deduction in all triangle inequalities and quadrilateral theorems.'
              : errors <= 3
              ? '👏 Outstanding performance! You possess robust geometric reasoning. Review any missed deduction steps below.'
              : '💪 Good perseverance! Geometry is built step by step through proof construction. Review your misconceptions below and retry.'}
          </motion.div>

          {/* Targeted Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3"
            >
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Your Personalized Misconception Profile:
              </h3>
              <p className="text-xs text-slate-400">
                Examiners flag these specific conceptual pitfalls in CISCE board assessments:
              </p>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions && misconceptions[idx];
                  if (!m) return null;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs"
                    >
                      <div className="text-rose-400 font-semibold">❌ Pitfall: {m.misconception}</div>
                      <div className="text-emerald-400">✓ ICSE Correction: {m.correction}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ─── REFLECTION SECTION ─── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
          >
            <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
              <span>💭</span> Structured Metacognitive Reflection
            </h3>
            <p className="text-xs text-slate-400">
              Deepen your neural retention by reflecting on your mathematical problem-solving process:
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  1. What was the most surprising thing you learned about triangle inequalities or quadrilaterals?
                </label>
                <textarea
                  value={reflections.surprising}
                  onChange={(e) => setReflections({ ...reflections, surprising: e.target.value })}
                  placeholder="e.g., That equal sum a + b = c collapses a triangle completely into a line segment..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  2. How would you explain the Mid-Point Theorem to a friend simply?
                </label>
                <textarea
                  value={reflections.explain}
                  onChange={(e) => setReflections({ ...reflections, explain: e.target.value })}
                  placeholder="e.g., Connecting the halfway points of any two sides gives a parallel mini-bridge that is exactly half the length of the base..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  3. Where in real life (engineering, architecture, everyday decisions) might you use this?
                </label>
                <textarea
                  value={reflections.realLife}
                  onChange={(e) => setReflections({ ...reflections, realLife: e.target.value })}
                  placeholder="e.g., Calculating shortest perpendicular routes for electrical wiring or designing rigid triangular bridge trusses..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                  rows={2}
                />
              </div>
            </div>
          </motion.div>

          {/* Real World Activity */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
          >
            <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
              <span>🏗️</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="p-2.5 bg-slate-950 rounded-lg text-[11px] text-slate-400 border border-slate-800"
                >
                  <span className="font-bold text-indigo-400 mr-1.5">{i + 1}.</span> {st}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Sim Engine Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Level Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C9_MathematicsSidesTriangleGreaterSim;
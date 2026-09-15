'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID LITERALS (MANDATORY TO INCLUDE ALL) ───
const NODE_C10_MATH_051 = 'c10_math_051'; // Locus equidistant from two points (perpendicular bisector)
const NODE_C10_MATH_052 = 'c10_math_052'; // Angle at centre is double angle at circumference
const NODE_C10_MATH_053 = 'c10_math_053'; // Angles in the same segment are equal
const NODE_C10_MATH_054 = 'c10_math_054'; // Angle in a semi-circle is a right angle
const NODE_C10_MATH_055 = 'c10_math_055'; // Cyclic quadrilateral - opposite angles supplementary
const NODE_C10_MATH_056 = 'c10_math_056'; // Cyclic quadrilateral - exterior angle equals opposite interior angle
const NODE_C10_MATH_057 = 'c10_math_057'; // Tangent and radius are perpendicular
const NODE_C10_MATH_058 = 'c10_math_058'; // Two tangents from external point are equal
const NODE_C10_MATH_059 = 'c10_math_059'; // Chord-tangent intersection (product of segments)
const NODE_C10_MATH_060 = 'c10_math_060'; // Alternate segment theorem (tangent-chord angles)

const ALL_NODE_IDS = [
  NODE_C10_MATH_051,
  NODE_C10_MATH_052,
  NODE_C10_MATH_053,
  NODE_C10_MATH_054,
  NODE_C10_MATH_055,
  NODE_C10_MATH_056,
  NODE_C10_MATH_057,
  NODE_C10_MATH_058,
  NODE_C10_MATH_059,
  NODE_C10_MATH_060,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Smart Metro Track & Radar Circle Geometry Lab',
  intro: 'The National Metro Rail Corporation is designing a curved intersection with high-precision radar towers, circular rail arcs, safety tangents, and equidistant emergency substations. As Chief Survey Engineer, you will verify every geometric locus, chord intersection, cyclic tower boundary, and tangent angle theorem required by ICSE standards.',
  context: 'Use interactive compass sweeps, dynamic chords, rotating tangents, and chord-product tools to discover how fundamental circle theorems guarantee real-world safety.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'A high-speed train travels along a circular arc between Station A and Station B. An emergency tower O is placed at the exact center of the circle, while an observer tower P sits on the outer rim (major arc). If the angle between track lines at center O is 120°, what angle does the observer at P measure between A and B?',
  options: [
    '240° — double the center angle',
    '120° — same as center angle',
    '60° — half the center angle',
    '90° — always a right angle',
  ],
  correctIndex: 2,
  hintAfter: "Don't worry if you guessed differently! In circle geometry, the angle subtended at the center is always DOUBLE the angle subtended at the circumference.",
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

// ─── 22 CHALLENGES ARRAY (FOUNDATION, STANDARD, ADVANCED) ───
const CHALLENGES: Challenge[] = [
  // Foundation: 1-7
  {
    id: 'ch_geo_001',
    nodeId: NODE_C10_MATH_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the geometric locus of all points that are equidistant from two fixed points A and B?',
    options: [
      'A circle with diameter AB',
      'The perpendicular bisector of segment AB',
      'The straight line passing through both A and B',
      'An angle bisector at point A',
    ],
    correctIndex: 1,
    explanation: 'The locus of all points equidistant from two fixed points A and B is the unique perpendicular bisector of segment AB. Every point P on this line satisfies PA = PB.',
    hints: [
      'Think about the fair-share dividing line between two locations.',
      'The midpoint of AB is on this line, and the line meets AB at 90°.',
      'It is the perpendicular bisector of segment AB.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_geo_002',
    nodeId: NODE_C10_MATH_052,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'In a circular radar display with center O, arc AB subtends an angle ∠APB = 42° at a point P on the major circumference. What is the central angle ∠AOB in degrees?',
    correctAnswer: 84,
    tolerance: 0.5,
    unit: 'degrees',
    explanation: 'By the Central Angle Theorem, the angle subtended by an arc at the center is double the angle subtended by it at any point on the remaining circumference: ∠AOB = 2 × ∠APB = 2 × 42° = 84°.',
    hints: [
      'Recall: Angle at Center = 2 × Angle at Circumference.',
      'Double the angle measured at the rim.',
      '2 × 42 = 84 degrees.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_geo_003',
    nodeId: NODE_C10_MATH_053,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Points C and D lie in the same major segment of a circle standing on chord AB. If ∠ACB = 54°, what is the value of ∠ADB?',
    options: ['54°', '108°', '27°', '126°'],
    correctIndex: 0,
    explanation: 'By the Same Segment Theorem, angles subtended by the same chord (or arc) in the same segment of a circle are equal. Therefore ∠ADB = ∠ACB = 54°.',
    hints: [
      'Both C and D lie in the same segment and look at the same chord AB.',
      'Each inscribed angle equals half of the same central angle.',
      'Angles in the same segment are equal, so ∠ADB = 54°.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_geo_004',
    nodeId: NODE_C10_MATH_054,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'AB is a diameter of a circle with center O, and C is any point on the circumference. What is the measure of ∠ACB?',
    options: ['45°', '60°', '90°', '180°'],
    correctIndex: 2,
    explanation: 'The angle inscribed in a semi-circle is always a right angle (90°). Since diameter AB subtends 180° at center O, the angle at the circumference is 180° / 2 = 90°.',
    hints: [
      'The diameter forms a straight line angle of 180° at the center.',
      'Halve 180° to find the angle at the perimeter.',
      'The angle in a semi-circle is exactly 90°.',
    ],
  },
  {
    id: 'ch_geo_005',
    nodeId: NODE_C10_MATH_055,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'In cyclic quadrilateral ABCD, ∠A = 78°. What is the measure of the opposite interior angle ∠C in degrees?',
    correctAnswer: 102,
    tolerance: 0.5,
    unit: 'degrees',
    explanation: 'Opposite angles of a cyclic quadrilateral are supplementary (they sum to 180°). Therefore, ∠C = 180° - ∠A = 180° - 78° = 102°.',
    hints: [
      'In any quadrilateral inscribed in a circle, opposite angles add to 180°.',
      'Compute 180 - 78.',
      '180 - 78 = 102 degrees.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_geo_006',
    nodeId: NODE_C10_MATH_056,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In cyclic quadrilateral ABCD, side AB is extended to point E. If the exterior angle ∠CBE = 115°, what is the interior opposite angle ∠ADC?',
    options: ['65°', '115°', '180°', '90°'],
    correctIndex: 1,
    explanation: 'The exterior angle of a cyclic quadrilateral is equal to its interior opposite angle. Since ∠ABC + ∠CBE = 180° and ∠ABC + ∠ADC = 180°, ∠ADC = ∠CBE = 115°.',
    hints: [
      'The exterior angle and the adjacent interior angle form a 180° linear pair.',
      'The adjacent angle and opposite angle also sum to 180°.',
      'Equal supplements mean exterior angle = opposite interior angle = 115°.',
    ],
  },
  {
    id: 'ch_geo_007',
    nodeId: NODE_C10_MATH_057,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the geometric parts to their correct positions in the Tangent-Radius diagram.',
    dragItems: [
      { label: 'Radius (OP)', targetId: 'part_radius' },
      { label: 'Tangent Line (PT)', targetId: 'part_tangent' },
      { label: 'Right Angle (90°)', targetId: 'part_angle' },
      { label: 'Circle Center (O)', targetId: 'part_center' },
    ],
    correctMapping: {
      part_radius: 'Radius (OP)',
      part_tangent: 'Tangent Line (PT)',
      part_angle: 'Right Angle (90°)',
      part_center: 'Circle Center (O)',
    },
    explanation: 'A tangent to a circle is perpendicular (at 90°) to the radius drawn through the point of contact P.',
    hints: [
      'The center O connects to point of contact P via the radius.',
      'The tangent line PT touches the circle externally at single point P.',
      'The angle between OP and PT is 90°.',
    ],
  },

  // Standard: 8-15
  {
    id: 'ch_geo_008',
    nodeId: NODE_C10_MATH_058,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'From an external metro tracking point P, two tangents PA and PB are drawn to a circle with radius 5 cm. If the distance from P to circle center O is 13 cm, calculate the length of tangent PA in cm.',
    correctAnswer: 12,
    tolerance: 0.2,
    unit: 'cm',
    explanation: 'In right-angled triangle OAP (∠OAP = 90°), by Pythagoras theorem: PA² = OP² - OA² = 13² - 5² = 169 - 25 = 144. Thus PA = √144 = 12 cm. By equal tangents theorem, PB = 12 cm as well.',
    hints: [
      'Remember that radius OA is perpendicular to tangent PA, creating a right triangle.',
      'Apply Pythagoras: OP² = OA² + PA².',
      'PA = √(169 - 25) = √144 = 12 cm.',
    ],
  },
  {
    id: 'ch_geo_009',
    nodeId: NODE_C10_MATH_059,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Two chords AB and CD intersect internally at point P inside a circular hub. If AP = 4 cm, PB = 9 cm, and CP = 3 cm, calculate the segment length PD in cm.',
    correctAnswer: 12,
    tolerance: 0.2,
    unit: 'cm',
    explanation: 'By the Intersecting Chords Theorem: AP × PB = CP × PD. Substituting: 4 × 9 = 3 × PD => 36 = 3 × PD => PD = 12 cm.',
    hints: [
      'Product of segments of one chord equals product of segments of the other.',
      'Set up: AP × PB = CP × PD.',
      '4 × 9 = 36; then PD = 36 / 3 = 12 cm.',
    ],
  },
  {
    id: 'ch_geo_010',
    nodeId: NODE_C10_MATH_059,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'From an external surveyor point P, a tangent PT touches the circle at T, and a secant line PAB cuts the circle at A and B. If PA = 4 cm and AB = 5 cm (so PB = 9 cm), calculate tangent length PT in cm.',
    correctAnswer: 6,
    tolerance: 0.1,
    unit: 'cm',
    explanation: 'By the Tangent-Secant Theorem: PT² = PA × PB. Here PB = PA + AB = 4 + 5 = 9 cm. Thus PT² = 4 × 9 = 36 => PT = √36 = 6 cm.',
    hints: [
      'Do not forget: Tangent is squared: PT² = PA × PB.',
      'PB is the whole secant length: 4 + 5 = 9 cm.',
      'PT = √(4 × 9) = √36 = 6 cm.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_geo_011',
    nodeId: NODE_C10_MATH_060,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A tangent line touches a circle at point A. A chord AB is drawn such that the angle between the tangent and chord AB is 58°. What is the angle subtended by chord AB in the alternate segment in degrees?',
    correctAnswer: 58,
    tolerance: 0.5,
    unit: 'degrees',
    explanation: 'By the Alternate Segment Theorem, the angle between a tangent and a chord drawn through the point of contact equals the angle subtended by that chord in the opposite (alternate) segment. Hence ∠ADB = 58°.',
    hints: [
      'The tangent-chord angle directly mirrors into the opposite pocket of the circle.',
      'Alternate segment angle = angle between tangent and chord.',
      'The answer is 58 degrees.',
    ],
  },
  {
    id: 'ch_geo_012',
    nodeId: NODE_C10_MATH_054,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'AB is a diameter of a circle with radius 6.5 cm (diameter = 13 cm). C is on the circumference such that AC = 5 cm. Calculate the length of BC in cm.',
    correctAnswer: 12,
    tolerance: 0.2,
    unit: 'cm',
    explanation: 'Because AB is the diameter, ∠ACB = 90° (angle in a semi-circle). Applying Pythagoras in right triangle ABC: BC² = AB² - AC² = 13² - 5² = 169 - 25 = 144 => BC = 12 cm.',
    hints: [
      'Angle at C is 90° because AB is the diameter.',
      'Hypotenuse AB = 2 × 6.5 = 13 cm.',
      'BC = √(13² - 5²) = √(169 - 25) = 12 cm.',
    ],
  },
  {
    id: 'ch_geo_013',
    nodeId: NODE_C10_MATH_055,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In cyclic quadrilateral ABCD, ∠A : ∠C = 4 : 5. Calculate the exact measure of ∠A in degrees.',
    correctAnswer: 80,
    tolerance: 0.5,
    unit: 'degrees',
    explanation: 'Opposite angles of a cyclic quad sum to 180°: 4x + 5x = 180° => 9x = 180° => x = 20°. Thus ∠A = 4 × 20° = 80° (and ∠C = 100°).',
    hints: [
      'Let ∠A = 4x and ∠C = 5x.',
      'Sum of opposite angles: 4x + 5x = 180°.',
      '9x = 180 => x = 20; ∠A = 4 × 20 = 80°.',
    ],
  },
  {
    id: 'ch_geo_014',
    nodeId: NODE_C10_MATH_051,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the correct steps for constructing the perpendicular bisector locus of segment AB with ruler and compass.',
    sortItems: [
      'Draw segment AB of given length using ruler',
      'Open compass to radius strictly greater than half of AB',
      'From A and B, swing arcs above and below the segment',
      'Mark arc intersection points X and Y and join XY with a straight line',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First draw AB, set compass radius > AB/2, swing arcs from both endpoints A and B to cross on both sides, then join the intersection points to produce the perpendicular bisector locus.',
    hints: [
      'Start with drawing the line segment.',
      'Set compass radius greater than half to ensure arcs cross.',
      'Swing arcs from both ends and connect the crossings.',
    ],
  },
  {
    id: 'ch_geo_015',
    nodeId: NODE_C10_MATH_052,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a circle with center O, chord AB subtends ∠AOB = 130° at center. Point C is on major arc. Radii OA and OB form isosceles △OAB. Calculate base angle ∠OAB in degrees.',
    correctAnswer: 25,
    tolerance: 0.5,
    unit: 'degrees',
    explanation: 'In △OAB, OA = OB (radii of same circle), so base angles ∠OAB = ∠OBA. In △OAB: ∠OAB + ∠OBA + ∠AOB = 180° => 2∠OAB + 130° = 180° => 2∠OAB = 50° => ∠OAB = 25°.',
    hints: [
      'Radii are equal, so triangle OAB is isosceles.',
      'Sum of angles in △OAB is 180°.',
      '(180 - 130) / 2 = 50 / 2 = 25°.',
    ],
  },

  // Advanced: 16-22
  {
    id: 'ch_geo_016',
    nodeId: NODE_C10_MATH_060,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In a circle, PQ is a tangent at A. Chord AB makes ∠QAB = 64°. Line AC is a diameter passing through center O. Why is ∠ACB equal to 64°?',
    options: [
      'Because ∠OAQ = 90° and in right △ABC, ∠ACB = 90° - ∠BAC = 90° - (90° - 64°) = 64°',
      'Because all triangles in circles are equilateral',
      'Because tangent PQ is parallel to chord BC',
      'Because diameter AC bisects the tangent line',
    ],
    correctIndex: 0,
    explanation: 'Drawing diameter AC creates right triangle ABC (∠B = 90° in semi-circle). Since radius OA ⊥ tangent PQ, ∠OAB = 90° - 64° = 26°. In right △ABC, ∠ACB = 90° - 26° = 64°, proving the Alternate Segment Theorem rigorously.',
    hints: [
      'Draw the diameter through point of contact A.',
      'Use the 90° angle between radius and tangent.',
      'Combine with angle in a semi-circle being 90°.',
    ],
  },
  {
    id: 'ch_geo_017',
    nodeId: NODE_C10_MATH_058,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Build the formal proof chain showing two tangents PA and PB from external point P are equal in length.',
    availableParts: [
      '∠OAP = ∠OBP = 90° (Tangent ⊥ Radius)',
      'OA = OB (Radii of same circle)',
      'OP = OP (Common Hypotenuse)',
      '△OPA ≅ △OPB (RHS Congruence)',
      'PA = PB (CPCT)',
    ],
    targetState: '∠OAP = ∠OBP = 90° (Tangent ⊥ Radius) OA = OB (Radii of same circle) OP = OP (Common Hypotenuse) △OPA ≅ △OPB (RHS Congruence) PA = PB (CPCT)',
    validationHint: 'Add the 5 justification steps in logical deductive order.',
    explanation: 'The rigorous proof establishes right angles via tangent-radius perpendicularity, equal radii, common hypotenuse, RHS congruence, and finally CPCT for tangent equality.',
    hints: [
      'Start with establishing the 90° right angles at the contact points.',
      'List the equal side (radius) and the common hypotenuse.',
      'Conclude with RHS triangle congruence and CPCT.',
    ],
  },
  {
    id: 'ch_geo_018',
    nodeId: NODE_C10_MATH_059,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Two secants PAB and PCD are drawn from external point P. If PA = 5 cm, AB = 7 cm (so PB = 12 cm), and PC = 6 cm, calculate segment CD in cm.',
    correctAnswer: 4,
    tolerance: 0.2,
    unit: 'cm',
    explanation: 'By the Secant Theorem: PA × PB = PC × PD => 5 × 12 = 6 × PD => 60 = 6 × PD => PD = 10 cm. Since PD = PC + CD, CD = PD - PC = 10 - 6 = 4 cm.',
    hints: [
      'First compute total length PB = 5 + 7 = 12 cm.',
      'Use PA × PB = PC × PD to find PD.',
      '5 × 12 = 60; PD = 60/6 = 10; CD = 10 - 6 = 4 cm.',
    ],
  },
  {
    id: 'ch_geo_019',
    nodeId: NODE_C10_MATH_056,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In cyclic quadrilateral ABCD, side AB is extended to E. If ∠CBE = 2x + 10° and opposite interior ∠ADC = 3x - 15°, find the value of x in degrees.',
    correctAnswer: 25,
    tolerance: 0.5,
    unit: 'degrees',
    explanation: 'Exterior angle of a cyclic quadrilateral equals opposite interior angle: 2x + 10° = 3x - 15° => 3x - 2x = 10° + 15° => x = 25°. (Both angles evaluate to 60°).',
    hints: [
      'Exterior angle = Opposite interior angle.',
      'Equate 2x + 10 = 3x - 15.',
      'Solve for x: x = 25.',
    ],
  },
  {
    id: 'ch_geo_020',
    nodeId: NODE_C10_MATH_055,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A surveyor claims: "Any quadrilateral with diagonals that are perpendicular to each other can be inscribed in a circle." Is this claim geometrically valid?',
    options: [
      'No — a quadrilateral is cyclic if and only if opposite angles are supplementary (sum to 180°), not because diagonals are perpendicular (e.g. kites/rhombuses are not generally cyclic)',
      'Yes — perpendicular diagonals always guarantee all 4 vertices touch a circle',
      'Yes — because perpendicular bisectors always meet at the origin',
      'No — only squares can be inscribed in a circle',
    ],
    correctIndex: 0,
    explanation: 'Perpendicular diagonals define orthodiagonal shapes like kites or rhombuses, which are generally NOT cyclic. Cyclicity strictly requires opposite angles to sum to 180° (or equal angles in the same segment).',
    hints: [
      'Think of a non-square rhombus: diagonals are 90°, but are opposite angles supplementary?',
      'Cyclic condition strictly requires opposite angles to sum to 180°.',
      'Option A gives the correct evaluation.',
    ],
  },
  {
    id: 'ch_geo_021',
    nodeId: NODE_C10_MATH_057,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A circular railway turntable with radius 9 m has a safety tangent walkway PT. Point P is 15 m from the center O. What is the area of right triangle OPT in square meters?',
    correctAnswer: 54,
    tolerance: 0.5,
    unit: 'm²',
    explanation: 'In right triangle OPT (∠OTP = 90°), radius OT = 9 m, hypotenuse OP = 15 m. By Pythagoras: PT = √(15² - 9²) = √(225 - 81) = √144 = 12 m. Area = 1/2 × base × height = 1/2 × 12 × 9 = 54 m².',
    hints: [
      'Tangent PT is perpendicular to radius OT.',
      'Find tangent length PT using Pythagoras: √(15² - 9²) = 12 m.',
      'Area = (1/2) × 9 × 12 = 54 m².',
    ],
  },
  {
    id: 'ch_geo_022',
    nodeId: NODE_C10_MATH_053,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In a circle with center O, chords AB and CD intersect at right angles (90°) at point X. If arc AD subtends central angle 70° and arc BC subtends central angle 110°, what is the inscribed angle ∠ABD subtended by arc AD in degrees?',
    correctAnswer: 35,
    tolerance: 0.5,
    unit: 'degrees',
    explanation: 'Arc AD subtends central angle 70°. By the Central Angle Theorem, any inscribed angle standing on arc AD in the remaining circumference is half the central angle: ∠ABD = 70° / 2 = 35°.',
    hints: [
      'Identify the arc standing beneath ∠ABD: it is arc AD.',
      'Inscribed angle = 1/2 × Central Angle of arc AD.',
      '70° / 2 = 35°.',
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C10_MATH_051,
  title: 'Circle Geometry & Locus Equidistant Simulation',
  definition:
    'Comprehensive ICSE Class 10 Circle Geometry: Locus of points equidistant from two points (perpendicular bisector), central and inscribed angles, angles in the same segment, semi-circle right angles, cyclic quadrilaterals, tangent-radius perpendicularity, equal tangents from external points, chord-secant product theorems, and the alternate segment theorem.',
  eli5: 'Explore circles like a master surveyor! Turn angles, drag points on circular arcs, construct fair-share dividing lines, and discover why chords, tangents, and quadrilaterals obey unbreakable geometric balance rules.',
  misconceptions: [
    {
      misconception: 'The perpendicular bisector is just any line passing through the midpoint of AB.',
      correction:
        'The perpendicular bisector must be perpendicular (at 90°) to AB in addition to passing through its midpoint. It is the unique line of all points equidistant from A and B.',
    },
    {
      misconception: 'Angle at the circumference is double the angle at the center.',
      correction:
        'The center angle is the larger, doubled angle (Angle at Center = 2 × Angle at Circumference). Never invert this ratio.',
    },
    {
      misconception: 'Any two angles standing on the same chord are equal regardless of segment.',
      correction:
        'Angles are equal only when they lie in the SAME segment. Points in opposite segments subtend supplementary angles.',
    },
    {
      misconception: 'Adjacent angles of a cyclic quadrilateral are supplementary.',
      correction:
        'In a cyclic quadrilateral, OPPOSITE angles are supplementary (sum to 180°), not adjacent ones.',
    },
    {
      misconception: 'In tangent-secant intersections, PT = PA × PB without squaring.',
      correction:
        'The tangent segment must be squared: PT² = PA × PB because both intersection points of a tangent coincide at T.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is the locus of points equidistant from two fixed points A and B?',
      options: ['Circle with diameter AB', 'Perpendicular bisector of AB', 'Angle bisector at A', 'Parallel lines'],
      correctIndex: 1,
    },
    {
      question: 'If central angle ∠AOB = 100°, what is inscribed angle ∠APB on the major arc?',
      options: ['200°', '100°', '50°', '25°'],
      correctIndex: 2,
    },
    {
      question: 'What is the measure of an angle inscribed in a semi-circle?',
      options: ['45°', '60°', '90°', '180°'],
      correctIndex: 2,
    },
    {
      question: 'In cyclic quadrilateral ABCD, if ∠A = 70°, what is ∠C?',
      options: ['70°', '110°', '20°', '140°'],
      correctIndex: 1,
    },
    {
      question: 'What is the angle between a tangent line and the radius at the point of contact?',
      options: ['0°', '45°', '90°', '180°'],
      correctIndex: 2,
    },
    {
      question: 'Two tangents PA and PB are drawn from external point P. Which is true?',
      options: ['PA = PB', 'PA + PB = 2 Radius', 'PA × PB = OP²', 'PA = 2PB'],
      correctIndex: 0,
    },
    {
      question: 'For chords AB and CD intersecting at P inside a circle, which product relation holds?',
      options: ['PA × PC = PB × PD', 'PA × PB = PC × PD', 'PA + PB = PC + PD', 'PA / PB = PC / PD'],
      correctIndex: 1,
    },
    {
      question: 'By the Alternate Segment Theorem, the angle between tangent and chord equals:',
      options: ['Angle in adjacent segment', 'Angle in alternate segment', 'Central angle', '90°'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Demonstrates mastery over all 10 ICSE circle and locus theorems with accurate algebraic calculations and deductive reasoning.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Fair-Share Locus (Perpendicular Bisector)',
    instruction: 'Drag probe point P across the grid. Watch how the distances PA and PB change until PA = PB on the perpendicular bisector line!',
    interactionType: 'drag-probe',
    nodeId: NODE_C10_MATH_051,
  },
  {
    title: 'Lab 2: Center Angle vs. Circumference Angle',
    instruction: 'Slide the Arc Size and move Inscribed Vertex P around the rim. Notice that the Center Angle is ALWAYS exactly 2× the Rim Angle!',
    interactionType: 'slider-angles',
    nodeId: NODE_C10_MATH_052,
  },
  {
    title: 'Lab 3: Cyclic Quadrilateral Balance & Exterior Ray',
    instruction: 'Drag vertices A, B, C, D around the circle. Watch opposite angles always sum to 180°, while the exterior angle matches the opposite interior angle!',
    interactionType: 'cyclic-drag',
    nodeId: NODE_C10_MATH_055,
  },
  {
    title: 'Lab 4: Tangent-Radius 90° & Equal Tangents',
    instruction: 'Rotate the external tracking point P. Observe how both tangent arms PA and PB remain perfectly equal while radii OA and OB meet them at 90°!',
    interactionType: 'tangent-explore',
    nodeId: NODE_C10_MATH_058,
  },
  {
    title: 'Lab 5: Intersecting Chords & Tangent-Secant Power',
    instruction: 'Adjust the chord intersection slider and verify that segment product PA × PB = PC × PD is constant everywhere!',
    interactionType: 'chord-power',
    nodeId: NODE_C10_MATH_059,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an arc subtends 150° at the center O, what angle will any surveyor on the major circumference measure?',
    options: ['300°', '75°', '150°', '90°'],
    correctIndex: 1,
    verifyInstruction: 'Set the Central Angle slider to 150° in Lab 2 to verify your prediction in real-time!',
    nodeId: NODE_C10_MATH_052,
  },
  {
    question: 'Predict: If you draw two tangents from an external point 13 cm away to a circle of radius 5 cm, what will be the length of each tangent?',
    options: ['8 cm', '12 cm', '18 cm', '10 cm'],
    correctIndex: 1,
    verifyInstruction: 'Check Lab 4: In right triangle OAP, √(13² - 5²) = √144 = 12 cm!',
    nodeId: NODE_C10_MATH_058,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the inscribed angle ∠APB when you slide vertex P along the same major arc without changing points A and B?',
    observableOptions: [
      'The angle stays completely constant (angles in same segment are equal)',
      'The angle increases as P moves higher',
      'The angle fluctuates randomly',
      'The angle becomes 90° everywhere',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_MATH_053,
  },
  {
    question: 'What happens to the sum of opposite angles (∠A + ∠C) as you drag any vertex of the cyclic quadrilateral along the circle?',
    observableOptions: [
      'The sum stays locked at exactly 180°',
      'The sum changes between 100° and 200°',
      'The sum is always equal to 360°',
      'The sum depends on the radius of the circle',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_MATH_055,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Metro Rail Corridor Triangulation Project',
  description:
    'Apply circle theorems to practical engineering: Given two emergency stations at A(0,0) and B(8,0) km, construct a new central power substation equidistant from both, and orient radar sweep tangents to prevent signal collision along circular rail bends.',
  steps: [
    'Construct perpendicular bisector locus x = 4 km as the fair-share power line',
    'Calculate the circumcircle center where two perpendicular bisectors intersect',
    'Establish tangent safety boundaries at 90° to rail radii',
    'Verify signal coverage using intersecting secant products (PT² = PA × PB)',
  ],
};

// ─── MAIN COMPONENT ───
function C10_MathematicsLocusEquidistantFromSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase Flow
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Discovery & Prediction States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Interactive Exploration & Sandbox States
  const [probeX, setProbeX] = useState(200);
  const [probeY, setProbeY] = useState(110);
  const [arcAngleDeg, setArcAngleDeg] = useState(120);
  const [vertexAngleOffset, setVertexAngleOffset] = useState(240);
  const [cyclicAngleA, setCyclicAngleA] = useState(40);
  const [cyclicAngleB, setCyclicAngleB] = useState(110);
  const [cyclicAngleC, setCyclicAngleC] = useState(210);
  const [cyclicAngleD, setCyclicAngleD] = useState(300);
  const [externalDist, setExternalDist] = useState(260);
  const [tangentRadius, setTangentRadius] = useState(90);
  const [chordInterX, setChordInterX] = useState(0);
  const [alternateChordAngle, setAlternateChordAngle] = useState(55);

  // Challenge & Adaptive Mastery States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-Drop / Interactive Input States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // UI Feedback States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT State Ref (persists across challenges)
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Adaptive Challenge Filter
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD OF MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C10_MATH_051);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY EFFECT ───
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

      // Subtle animated radar circle grid
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      ctx.beginPath();
      ctx.arc(cx, cy, 30 + Math.sin(frame * 0.04) * 4, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating radar beam
      const angle = (frame * 0.02) % (Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * 70, cy + Math.sin(angle) * 70);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── CLEANUP INACTIVITY TIMER ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── ESCALATING HINT HANDLER ───
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
    }
  }, [hintCount, challenge]);

  // ─── RESET INACTIVITY TIMER (10s AUTO-HINT) ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── DISCOVERY HANDLER ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Spot on! The angle at the center is always double the angle at the rim.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  // ─── NAVIGATION CALLBACKS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive circle geometry laboratories. Explore each concept by doing!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Sandbox mode: test and manipulate all geometric properties freely without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the ICSE challenge series. Good luck!');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Great prediction! Now slide the controls to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation! Geometric theorems reflect universal invariants.' : 'Observe the angle readings closely as you drag.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding! You have completed the comprehensive Circle Geometry masterclass.');
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
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

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
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Rigorous proof and precise calculation.');
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
          speechManager.speak('Let us study the complete ICSE step-by-step reasoning.');
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

  // ─── DRAG-AND-DROP HANDLERS ───
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
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        if (prev.length === 0 && challenge.sortItems) {
          prev = challenge.sortItems.map((_, i) => i);
        }
        const arr = [...prev];
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleSliderAngleChange = useCallback((val: number) => {
    setArcAngleDeg(val);
    audioManager.play('count');
  }, []);

  const handleProbeMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(20, Math.min(380, e.clientX - rect.left));
    const y = Math.max(20, Math.min(260, e.clientY - rect.top));
    setProbeX(Math.round(x));
    setProbeY(Math.round(y));
  }, []);

  // ─── CALCULATED GEOMETRIC QUANTITIES (Lab 1) ───
  const pointA = { x: 100, y: 140 };
  const pointB = { x: 300, y: 140 };
  const distPA = Math.hypot(probeX - pointA.x, probeY - pointA.y);
  const distPB = Math.hypot(probeX - pointB.x, probeY - pointB.y);
  const isEquidistant = Math.abs(distPA - distPB) < 4;

  // ─── CALCULATED QUANTITIES (Lab 2: Central & Inscribed) ───
  const circleCenter = { x: 200, y: 140 };
  const circleRadius = 90;
  const radA = -Math.PI / 2 - (arcAngleDeg * Math.PI) / 360;
  const radB = -Math.PI / 2 + (arcAngleDeg * Math.PI) / 360;
  const arcPosA = { x: circleCenter.x + circleRadius * Math.cos(radA), y: circleCenter.y + circleRadius * Math.sin(radA) };
  const arcPosB = { x: circleCenter.x + circleRadius * Math.cos(radB), y: circleCenter.y + circleRadius * Math.sin(radB) };
  const vertexRad = (vertexAngleOffset * Math.PI) / 180;
  const vertexP = { x: circleCenter.x + circleRadius * Math.cos(vertexRad), y: circleCenter.y + circleRadius * Math.sin(vertexRad) };
  const inscribedAngleDeg = Math.round(arcAngleDeg / 2);

  // ─── CALCULATED QUANTITIES (Lab 3: Cyclic Quadrilateral) ───
  const posA = { x: circleCenter.x + circleRadius * Math.cos((cyclicAngleA * Math.PI) / 180), y: circleCenter.y + circleRadius * Math.sin((cyclicAngleA * Math.PI) / 180) };
  const posB = { x: circleCenter.x + circleRadius * Math.cos((cyclicAngleB * Math.PI) / 180), y: circleCenter.y + circleRadius * Math.sin((cyclicAngleB * Math.PI) / 180) };
  const posC = { x: circleCenter.x + circleRadius * Math.cos((cyclicAngleC * Math.PI) / 180), y: circleCenter.y + circleRadius * Math.sin((cyclicAngleC * Math.PI) / 180) };
  const posD = { x: circleCenter.x + circleRadius * Math.cos((cyclicAngleD * Math.PI) / 180), y: circleCenter.y + circleRadius * Math.sin((cyclicAngleD * Math.PI) / 180) };
  // Extension of side AB past B for exterior angle
  const extB = { x: posB.x + (posB.x - posA.x) * 0.6, y: posB.y + (posB.y - posA.y) * 0.6 };

  // ─── CALCULATED QUANTITIES (Lab 4: Tangents) ───
  const extP = { x: circleCenter.x + externalDist - 120, y: circleCenter.y };
  const distOP = Math.hypot(extP.x - circleCenter.x, extP.y - circleCenter.y);
  const tangentLen = Math.sqrt(Math.max(0, distOP * distOP - tangentRadius * tangentRadius));
  const tangentAngleOffset = Math.asin(Math.min(1, tangentRadius / distOP));
  const tanContactA = {
    x: circleCenter.x + tangentRadius * Math.cos(Math.PI / 2 - tangentAngleOffset),
    y: circleCenter.y - tangentRadius * Math.sin(Math.PI / 2 - tangentAngleOffset),
  };
  const tanContactB = {
    x: circleCenter.x + tangentRadius * Math.cos(Math.PI / 2 - tangentAngleOffset),
    y: circleCenter.y + tangentRadius * Math.sin(Math.PI / 2 - tangentAngleOffset),
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-indigo-900/60 shadow-2xl space-y-6">
      {/* ─── HEADER BAR ─── */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-900/50 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-200 to-amber-200">
              {title}
            </h1>
            <p className="text-xs text-indigo-300/80 font-medium">
              ICSE Class 10 • Mathematics • Circles & Locus Theorems
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                : difficulty === 'advanced'
                ? 'bg-rose-950/80 text-rose-300 border-rose-600'
                : 'bg-indigo-950/80 text-indigo-300 border-indigo-600'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-800">
            Mastery: {masteryLevel}
          </span>
        </div>
      </div>

      {/* ─── PHASE: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/60 shadow-xl">
            <h2 className="text-lg font-bold text-indigo-200 flex items-center gap-2">
              <span>🚇</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-sky-300/90 mt-2 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                ⚡ Curiosity Challenge (Ungraded)
              </span>
              <span className="text-xs text-slate-400">Think & Predict</span>
            </div>
            <p className="text-base sm:text-lg font-semibold text-white leading-snug">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-indigo-950/60 border-slate-700/80 text-slate-200 hover:border-indigo-500'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-slate-700/60 text-center text-xs font-bold leading-6 mr-2">
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓' : String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80"
              >
                <p
                  className={`text-sm ${
                    discoveryCorrect ? 'text-emerald-300 font-semibold' : 'text-amber-300 font-medium'
                  }`}
                >
                  {discoveryCorrect
                    ? '✓ Spot on! Angle at center is always twice the rim angle.'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter Interactive Labs"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">
              Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex items-center gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-800'
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
              className="p-6 bg-slate-900 rounded-2xl border border-indigo-900/40 shadow-xl space-y-4"
            >
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🔬</span> {EXPLORATION_STEPS[currentSlide].title}
                </h2>
                <p className="text-sm text-amber-300/90 mt-1">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ── LAB 1: PERPENDICULAR BISECTOR LOCUS ── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="relative bg-slate-950 rounded-2xl p-4 border border-slate-800 overflow-hidden">
                    <svg
                      viewBox="0 0 400 280"
                      className="w-full h-64 cursor-crosshair select-none"
                      onMouseMove={handleProbeMove}
                      aria-label="Interactive perpendicular bisector locus plane"
                    >
                      <line x1="200" y1="10" x2="200" y2="270" stroke="#334155" strokeDasharray="4,4" strokeWidth="1" />
                      <line x1="20" y1="140" x2="380" y2="140" stroke="#1e293b" strokeWidth="1" />
                      <line x1={pointA.x} y1={pointA.y} x2={pointB.x} y2={pointB.y} stroke="#6366f1" strokeWidth="3" />
                      <line x1="200" y1="10" x2="200" y2="270" stroke="#10b981" strokeWidth={isEquidistant ? '3.5' : '2'} opacity={isEquidistant ? '1' : '0.6'} />
                      <path d="M 180,60 A 130 130 0 0 1 220,60" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,3" />
                      <path d="M 180,220 A 130 130 0 0 1 220,220" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,3" />

                      <circle cx={pointA.x} cy={pointA.y} r="6" fill="#6366f1" />
                      <text x={pointA.x - 12} y={pointA.y + 18} fill="#a5b4fc" fontSize="12" fontWeight="bold">
                        Station A
                      </text>

                      <circle cx={pointB.x} cy={pointB.y} r="6" fill="#6366f1" />
                      <text x={pointB.x - 8} y={pointB.y + 18} fill="#a5b4fc" fontSize="12" fontWeight="bold">
                        Station B
                      </text>

                      <circle cx="200" cy="140" r="4" fill="#fbbf24" />
                      <text x="206" y="156" fill="#fbbf24" fontSize="11">
                        M (Midpoint)
                      </text>

                      <line x1={probeX} y1={probeY} x2={pointA.x} y2={pointA.y} stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3,3" />
                      <line x1={probeX} y1={probeY} x2={pointB.x} y2={pointB.y} stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3,3" />

                      <circle cx={probeX} cy={probeY} r="8" fill={isEquidistant ? '#10b981' : '#f59e0b'} stroke="#ffffff" strokeWidth="2" />
                      <text x={probeX + 12} y={probeY - 6} fill="#ffffff" fontSize="12" fontWeight="bold">
                        Substation P ({probeX}, {probeY})
                      </text>

                      {isEquidistant && (
                        <text x="200" y="30" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                          ✓ ON LOCUS: PA = PB (Equidistant Point)
                        </text>
                      )}
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xs text-rose-300 font-semibold">Distance PA</span>
                      <p className="text-lg font-mono font-bold text-rose-400">{distPA.toFixed(1)} px</p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xs text-sky-300 font-semibold">Distance PB</span>
                      <p className="text-lg font-mono font-bold text-sky-400">{distPB.toFixed(1)} px</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1 p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xs text-emerald-300 font-semibold">Locus State</span>
                      <p className="text-sm font-bold text-emerald-400">
                        {isEquidistant ? '✓ PA = PB (On Bisector)' : `✗ Δ = ${Math.abs(distPA - distPB).toFixed(1)} px`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 2: ANGLE AT CENTER & CIRCUMFERENCE ── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-slate-950 rounded-xl border border-indigo-900/60 space-y-2">
                      <p className="text-xs font-bold text-amber-400 uppercase">
                        🤔 Predict Before Experimenting
                      </p>
                      <p className="text-sm text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction option: ${opt}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2 bg-slate-800 hover:bg-indigo-950 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <div className="p-3 bg-indigo-950/60 rounded-xl border border-indigo-800 text-xs text-indigo-200">
                      ✓ Prediction logged! Drag the slider below to verify: Angle at Center = 2 × Angle at Rim.
                    </div>
                  )}

                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
                    <svg viewBox="0 0 400 280" className="w-full h-64 select-none" aria-label="Center and circumference angles diagram">
                      <circle cx={circleCenter.x} cy={circleCenter.y} r={circleRadius} fill="none" stroke="#334155" strokeWidth="2" />
                      <path
                        d={`M ${arcPosA.x} ${arcPosA.y} A ${circleRadius} ${circleRadius} 0 0 1 ${arcPosB.x} ${arcPosB.y}`}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="4"
                      />
                      <line x1={circleCenter.x} y1={circleCenter.y} x2={arcPosA.x} y2={arcPosA.y} stroke="#6366f1" strokeWidth="2" />
                      <line x1={circleCenter.x} y1={circleCenter.y} x2={arcPosB.x} y2={arcPosB.y} stroke="#6366f1" strokeWidth="2" />
                      <line x1={vertexP.x} y1={vertexP.y} x2={arcPosA.x} y2={arcPosA.y} stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" />
                      <line x1={vertexP.x} y1={vertexP.y} x2={arcPosB.x} y2={arcPosB.y} stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" />

                      <circle cx={circleCenter.x} cy={circleCenter.y} r="5" fill="#818cf8" />
                      <text x={circleCenter.x + 8} y={circleCenter.y - 8} fill="#a5b4fc" fontSize="12" fontWeight="bold">
                        O (Center)
                      </text>

                      <circle cx={arcPosA.x} cy={arcPosA.y} r="5" fill="#f59e0b" />
                      <text x={arcPosA.x - 14} y={arcPosA.y - 10} fill="#f59e0b" fontSize="12" fontWeight="bold">
                        A
                      </text>

                      <circle cx={arcPosB.x} cy={arcPosB.y} r="5" fill="#f59e0b" />
                      <text x={arcPosB.x + 8} y={arcPosB.y - 10} fill="#f59e0b" fontSize="12" fontWeight="bold">
                        B
                      </text>

                      <circle cx={vertexP.x} cy={vertexP.y} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                      <text x={vertexP.x + 8} y={vertexP.y + 16} fill="#34d399" fontSize="12" fontWeight="bold">
                        P (Rim Observer)
                      </text>

                      <text x={circleCenter.x} y={circleCenter.y + 24} textAnchor="middle" fill="#818cf8" fontSize="13" fontWeight="bold">
                        ∠AOB = {arcAngleDeg}°
                      </text>
                      <text x={vertexP.x} y={vertexP.y - 12} textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                        ∠APB = {inscribedAngleDeg}°
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between text-xs text-indigo-300 font-semibold">
                        <span>Central Arc Angle (∠AOB)</span>
                        <span>{arcAngleDeg}°</span>
                      </div>
                      <input
                        type="range"
                        min={40}
                        max={180}
                        value={arcAngleDeg}
                        aria-label="Central Arc Angle Slider"
                        onChange={(e) => handleSliderAngleChange(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between text-xs text-emerald-300 font-semibold">
                        <span>Move Observer P Position</span>
                        <span>{vertexAngleOffset}°</span>
                      </div>
                      <input
                        type="range"
                        min={190}
                        max={350}
                        value={vertexAngleOffset}
                        aria-label="Observer P Position Slider"
                        onChange={(e) => setVertexAngleOffset(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>
                  </div>

                  {!observationAnswered && (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-xs font-bold text-amber-400 uppercase">
                        🔍 Scientific Observation
                      </p>
                      <p className="text-sm text-slate-200">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5 pt-1">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Observation answer: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="w-full text-left p-2.5 bg-slate-800 hover:bg-indigo-950 text-slate-200 text-xs font-medium rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── LAB 3: CYCLIC QUADRILATERAL DEFORMATION ── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
                    <svg viewBox="0 0 400 280" className="w-full h-64 select-none" aria-label="Cyclic quadrilateral ABCD diagram">
                      <circle cx={circleCenter.x} cy={circleCenter.y} r={circleRadius} fill="none" stroke="#334155" strokeWidth="2" />
                      <polygon
                        points={`${posA.x},${posA.y} ${posB.x},${posB.y} ${posC.x},${posC.y} ${posD.x},${posD.y}`}
                        fill="rgba(99, 102, 241, 0.12)"
                        stroke="#6366f1"
                        strokeWidth="2.5"
                      />
                      <line x1={posB.x} y1={posB.y} x2={extB.x} y2={extB.y} stroke="#f43f5e" strokeWidth="2" strokeDasharray="4,4" />

                      <circle cx={posA.x} cy={posA.y} r="5" fill="#a855f7" />
                      <text x={posA.x + 8} y={posA.y - 6} fill="#c084fc" fontSize="12" fontWeight="bold">
                        A
                      </text>

                      <circle cx={posB.x} cy={posB.y} r="5" fill="#a855f7" />
                      <text x={posB.x + 8} y={posB.y + 14} fill="#c084fc" fontSize="12" fontWeight="bold">
                        B
                      </text>

                      <circle cx={posC.x} cy={posC.y} r="5" fill="#38bdf8" />
                      <text x={posC.x - 18} y={posC.y + 14} fill="#7dd3fc" fontSize="12" fontWeight="bold">
                        C
                      </text>

                      <circle cx={posD.x} cy={posD.y} r="5" fill="#38bdf8" />
                      <text x={posD.x - 18} y={posD.y - 6} fill="#7dd3fc" fontSize="12" fontWeight="bold">
                        D
                      </text>

                      <text x={extB.x + 6} y={extB.y + 4} fill="#f43f5e" fontSize="11" fontWeight="bold">
                        E (Exterior Ray)
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-purple-300 font-semibold">Vertex A</span>
                      <input
                        type="range"
                        min={10}
                        max={70}
                        value={cyclicAngleA}
                        aria-label="Vertex A Angle"
                        onChange={(e) => setCyclicAngleA(Number(e.target.value))}
                        className="w-full accent-purple-500 mt-1"
                      />
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-purple-300 font-semibold">Vertex B</span>
                      <input
                        type="range"
                        min={80}
                        max={160}
                        value={cyclicAngleB}
                        aria-label="Vertex B Angle"
                        onChange={(e) => setCyclicAngleB(Number(e.target.value))}
                        className="w-full accent-purple-500 mt-1"
                      />
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-sky-300 font-semibold">Vertex C</span>
                      <input
                        type="range"
                        min={170}
                        max={250}
                        value={cyclicAngleC}
                        aria-label="Vertex C Angle"
                        onChange={(e) => setCyclicAngleC(Number(e.target.value))}
                        className="w-full accent-sky-500 mt-1"
                      />
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-sky-300 font-semibold">Vertex D</span>
                      <input
                        type="range"
                        min={260}
                        max={340}
                        value={cyclicAngleD}
                        aria-label="Vertex D Angle"
                        onChange={(e) => setCyclicAngleD(Number(e.target.value))}
                        className="w-full accent-sky-500 mt-1"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-900/60 flex flex-wrap justify-around text-center text-xs text-slate-300">
                    <div>
                      <span className="font-bold text-indigo-300">∠A + ∠C</span> = 180° (Supplementary)
                    </div>
                    <div>
                      <span className="font-bold text-sky-300">∠B + ∠D</span> = 180° (Supplementary)
                    </div>
                    <div>
                      <span className="font-bold text-rose-300">Exterior ∠CBE = ∠ADC</span> (Interior Opposite)
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: TANGENT-RADIUS & EQUAL TANGENTS ── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
                    <svg viewBox="0 0 400 280" className="w-full h-64 select-none" aria-label="Tangents from external point P diagram">
                      <circle cx={circleCenter.x - 40} cy={circleCenter.y} r={tangentRadius} fill="none" stroke="#334155" strokeWidth="2" />
                      <line x1={circleCenter.x - 40} y1={circleCenter.y} x2={tanContactA.x - 40} y2={tanContactA.y} stroke="#6366f1" strokeWidth="2" />
                      <line x1={circleCenter.x - 40} y1={circleCenter.y} x2={tanContactB.x - 40} y2={tanContactB.y} stroke="#6366f1" strokeWidth="2" />
                      <line x1={extP.x} y1={extP.y} x2={tanContactA.x - 40} y2={tanContactA.y} stroke="#10b981" strokeWidth="2.5" />
                      <line x1={extP.x} y1={extP.y} x2={tanContactB.x - 40} y2={tanContactB.y} stroke="#10b981" strokeWidth="2.5" />
                      <line x1={circleCenter.x - 40} y1={circleCenter.y} x2={extP.x} y2={extP.y} stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4,4" />

                      <circle cx={tanContactA.x - 40} cy={tanContactA.y} r="4" fill="#ef4444" />
                      <circle cx={tanContactB.x - 40} cy={tanContactB.y} r="4" fill="#ef4444" />

                      <circle cx={extP.x} cy={extP.y} r="6" fill="#10b981" />
                      <text x={extP.x + 8} y={extP.y + 4} fill="#34d399" fontSize="12" fontWeight="bold">
                        P (Surveyor)
                      </text>
                      <text x={tanContactA.x - 48} y={tanContactA.y - 8} fill="#a5b4fc" fontSize="12" fontWeight="bold">
                        A (90°)
                      </text>
                      <text x={tanContactB.x - 48} y={tanContactB.y + 16} fill="#a5b4fc" fontSize="12" fontWeight="bold">
                        B (90°)
                      </text>
                      <text x={circleCenter.x - 52} y={circleCenter.y + 18} fill="#fbbf24" fontSize="12" fontWeight="bold">
                        O (Center)
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between text-xs text-amber-300 font-semibold">
                        <span>Distance OP</span>
                        <span>{(externalDist - 120).toFixed(0)} px</span>
                      </div>
                      <input
                        type="range"
                        min={220}
                        max={300}
                        value={externalDist}
                        aria-label="Distance OP Slider"
                        onChange={(e) => setExternalDist(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between text-xs text-indigo-300 font-semibold">
                        <span>Circle Radius (OA = OB)</span>
                        <span>{tangentRadius} px</span>
                      </div>
                      <input
                        type="range"
                        min={60}
                        max={110}
                        value={tangentRadius}
                        aria-label="Circle Radius Slider"
                        onChange={(e) => setTangentRadius(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-center text-emerald-300">
                    PA = PB = √({(distOP).toFixed(0)}² - {tangentRadius}²) = {tangentLen.toFixed(1)} px (Equal Tangents Theorem)
                  </div>
                </div>
              )}

              {/* ── LAB 5: CHORD INTERSECTION POWER THEOREM ── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
                    <svg viewBox="0 0 400 280" className="w-full h-64 select-none" aria-label="Intersecting chords AB and CD diagram">
                      <circle cx="200" cy="140" r="90" fill="none" stroke="#334155" strokeWidth="2" />
                      <line x1="120" y1="90" x2="280" y2="190" stroke="#38bdf8" strokeWidth="2.5" />
                      <line x1="120" y1="190" x2="280" y2="90" stroke="#a855f7" strokeWidth="2.5" />

                      <circle cx={200 + chordInterX} cy="140" r="6" fill="#f59e0b" />
                      <text x={200 + chordInterX + 8} y="135" fill="#f59e0b" fontSize="12" fontWeight="bold">
                        P (Intersection)
                      </text>

                      <text x="105" y="90" fill="#38bdf8" fontSize="12" fontWeight="bold">A</text>
                      <text x="286" y="195" fill="#38bdf8" fontSize="12" fontWeight="bold">B</text>
                      <text x="105" y="195" fill="#a855f7" fontSize="12" fontWeight="bold">C</text>
                      <text x="286" y="90" fill="#a855f7" fontSize="12" fontWeight="bold">D</text>
                    </svg>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between text-xs text-amber-300 font-semibold">
                      <span>Shift Intersection P Position</span>
                      <span>{chordInterX} px</span>
                    </div>
                    <input
                      type="range"
                      min={-40}
                      max={40}
                      value={chordInterX}
                      aria-label="Shift Intersection Position Slider"
                      onChange={(e) => setChordInterX(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-900/60 text-center text-xs font-mono text-indigo-200">
                    Intersecting Chords Constant: PA × PB = PC × PD (Power of Point P)
                  </div>
                </div>
              )}

              {/* Navigation Toolbar */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  aria-label="Previous Lab"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-bold rounded-xl transition-all"
                >
                  ← Previous Lab
                </motion.button>

                <span className="text-xs text-slate-400 font-medium">
                  Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
                </span>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    aria-label="Next Lab"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setCurrentSlide((s) => s + 1)}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Enter Free Sandbox"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
                  >
                    Enter Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-emerald-900/50 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🎮</span> Free Geometry Sandbox
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manipulate all circular parameters without test pressure. Build your intuitive mastery!
                </p>
              </div>
              <canvas ref={canvasRef} width={80} height={40} className="rounded-lg bg-slate-950 border border-slate-800" aria-label="Animated radar indicator" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-sky-300">Live Arc & Alternate Segment Visualizer</span>
                <svg viewBox="0 0 300 200" className="w-full h-44 select-none" aria-label="Alternate segment visualizer">
                  <circle cx="150" cy="100" r="70" fill="none" stroke="#334155" strokeWidth="2" />
                  <line x1="60" y1="170" x2="240" y2="170" stroke="#f43f5e" strokeWidth="2.5" />
                  <line x1="150" y1="170" x2="210" y2="65" stroke="#38bdf8" strokeWidth="2.5" />
                  <line x1="150" y1="170" x2="100" y2="45" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />
                  <line x1="210" y1="65" x2="100" y2="45" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />

                  <circle cx="150" cy="170" r="4" fill="#f43f5e" />
                  <text x="156" y="165" fill="#f43f5e" fontSize="11" fontWeight="bold">A (Tangent Contact)</text>
                  <circle cx="210" cy="65" r="4" fill="#38bdf8" />
                  <text x="216" y="65" fill="#38bdf8" fontSize="11" fontWeight="bold">B</text>
                  <circle cx="100" cy="45" r="4" fill="#10b981" />
                  <text x="80" y="45" fill="#10b981" fontSize="11" fontWeight="bold">D ({alternateChordAngle}°)</text>

                  <text x="175" y="185" fill="#f43f5e" fontSize="11" fontWeight="bold">
                    Tangent-Chord = {alternateChordAngle}°
                  </text>
                </svg>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-sky-300">
                    <span>Adjust Tangent-Chord Angle</span>
                    <span>{alternateChordAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min={25}
                    max={85}
                    value={alternateChordAngle}
                    aria-label="Tangent Chord Angle Slider"
                    onChange={(e) => setAlternateChordAngle(Number(e.target.value))}
                    className="w-full accent-sky-500"
                  />
                </div>
              </div>

              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-amber-300">Key Theorems Quick Reference</span>
                <ul className="space-y-1.5 text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span><strong className="text-white">Perpendicular Bisector:</strong> Unique locus PA = PB.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span><strong className="text-white">Center vs. Rim Angle:</strong> ∠Center = 2 × ∠Circumference.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span><strong className="text-white">Semi-Circle:</strong> Inscribed angle on diameter = 90°.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span><strong className="text-white">Cyclic Quad:</strong> Opposite angles sum to 180°.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span><strong className="text-white">Tangent & Radius:</strong> Form 90° angle at contact point.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span><strong className="text-white">Tangent-Secant Power:</strong> PT² = PA × PB.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <motion.button
                aria-label="Ready for Challenges"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToChallenge}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm rounded-xl shadow-xl transition-all"
              >
                Ready for Challenges! 🚀
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE: CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="font-mono text-indigo-300">
                Competency: <strong className="uppercase text-amber-300">{challenge.competencyLevel}</strong>
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'border-indigo-900/50 shadow-2xl'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">
                Node Ref: {challenge.nodeId}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                {challenge.difficulty.toUpperCase()}
              </span>
            </div>

            <p className="text-base sm:text-lg font-bold text-white leading-relaxed mb-6">
              {challenge.question}
            </p>

            {/* MCQ TYPE */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md'
                          : 'bg-slate-800/80 hover:bg-indigo-950/60 border-slate-700/80 text-slate-200 hover:border-indigo-500'
                      }`}
                    >
                      <span className="inline-block w-6 h-6 rounded-full bg-slate-700/60 text-center text-xs font-bold leading-6 mr-2">
                        {showExplanation && i === challenge.correctIndex ? '✓' : String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* DRAG-LABEL TYPE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="w-full text-xs text-slate-400 font-semibold mb-1">
                    Drag each label to its target slot:
                  </span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                  {Object.keys(challenge.correctMapping || {}).map((targetId) => (
                    <div
                      key={targetId}
                      role="region"
                      aria-label={`Drop target for ${targetId.replace('_', ' ')}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className={`p-3 rounded-xl border-2 border-dashed text-center min-h-[60px] flex flex-col items-center justify-center transition-all ${
                        droppedLabels[targetId]
                          ? 'bg-indigo-950/70 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-xs uppercase font-mono">{targetId.replace('_', ' ')}</span>
                      <p className="text-xs font-bold mt-1 text-white">
                        {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : 'Drop Label Here'}
                      </p>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Diagram Labels"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Step ${displayIndex + 1}: ${item}. Drag to reorder.`}
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 text-slate-200 text-xs font-medium cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-indigo-400 mr-2">{displayIndex + 1}.</strong> {item}
                      </span>
                      <span className="text-slate-500 text-xs">↕ Drag to reorder</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Check Step Sequence"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow"
                >
                  Check Step Sequence
                </motion.button>
              </div>
            )}

            {/* NUMERIC TYPE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    aria-label={`Enter numerical value in ${challenge.unit || 'units'}`}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    disabled={showExplanation}
                    className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm w-44 focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-sm font-semibold text-slate-300">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit Calculation"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow transition-all"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT PROOF TYPE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add proof statement: ${part}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-800/80 hover:bg-indigo-700 text-white text-xs rounded-lg border border-indigo-600/50"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {constructParts.map((part, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-3 py-1 bg-indigo-950 text-indigo-200 border border-indigo-700 text-xs rounded-lg flex items-center gap-2"
                      >
                        <span>
                          {i + 1}. {part}
                        </span>
                        <button
                          aria-label={`Remove step ${i + 1}`}
                          onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                          className="text-rose-400 hover:text-rose-300 font-bold"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))}
                    {constructParts.length === 0 && (
                      <p className="text-xs text-slate-500 italic">Click elements above to assemble proof...</p>
                    )}
                  </div>
                </div>

                <motion.button
                  aria-label="Verify Proof Chain"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow"
                >
                  Verify Proof Chain
                </motion.button>
              </div>
            )}

            {/* ── PROGRESSIVE STEP-BY-STEP EXPLANATION ── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-amber-950/60 to-slate-900 border border-amber-700/60 rounded-2xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    ICSE Board Step-by-Step Reason Chain
                  </span>
                  <span className="text-xs text-amber-400 font-mono">
                    Step {revealedSteps + 1} of{' '}
                    {challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length}
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-amber-200/90 leading-relaxed"
                      >
                        <strong className="text-amber-400 font-mono">{i + 1}.</strong> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Reveal Next Reason Step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow"
                    >
                      Reveal Next Reason Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finish and View Performance' : 'Next Challenge'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow-lg transition-all"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finish & View Performance →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE: COMPLETION & MASTERY SUMMARY ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 sm:p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-3xl border border-indigo-700/60 shadow-2xl text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-sky-200 to-amber-200">
              Mastery Assessment Complete!
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have worked through all 10 ICSE Class 10 circle and locus geometry theorems.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400">Score</span>
                <p className="text-xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400">Mistakes</span>
                <p className="text-xl font-bold text-rose-400">{errors}</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400">Final Tier</span>
                <p className="text-xl font-bold text-indigo-400 uppercase">{difficulty}</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400">Mastery</span>
                <p className="text-xl font-bold text-amber-400 capitalize">{masteryLevel}</p>
              </div>
            </div>
          </div>

          {/* Spaced Repetition Visibility Card */}
          <div className="p-6 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-indigo-950/80 rounded-2xl border border-indigo-500/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider uppercase bg-amber-400 text-slate-950">
                  SM-2 Algorithm
                </span>
                <span className="text-xs font-bold text-indigo-300 uppercase">Spaced Repetition Schedule</span>
              </div>
              <p className="text-sm text-slate-200">
                Optimal retention review target:{' '}
                <strong className="text-amber-300 font-extrabold text-base">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </strong>
              </p>
              <p className="text-xs text-slate-400">
                {errors === 0
                  ? 'Zero errors detected. Long-term memory consolidation interval set to 7 days.'
                  : errors <= 3
                  ? 'Solid foundation with minor errors. Recommended review in 3 days.'
                  : 'Multiple theorem errors detected. Immediate reinforcement recommended in 1 day.'}
              </p>
            </div>
            <div className="p-3 bg-indigo-900/40 rounded-2xl border border-indigo-700/50 text-center min-w-[130px]">
              <span className="text-2xl">📅</span>
              <p className="text-xs font-bold text-amber-300 mt-1">
                {errors === 0 ? '+7 Days' : errors <= 3 ? '+3 Days' : '+1 Day'}
              </p>
            </div>
          </div>

          <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-700/50">
            <p className="text-sm font-semibold text-emerald-200 text-center">
              {errors === 0
                ? '🌟 PERFECT SCORE! You have mastered ICSE circle geometry theorems flawlessly!'
                : errors <= 3
                ? '✨ Outstanding work! Your deductive reasoning and theorem applications are solid.'
                : errors <= 7
                ? '👍 Good effort! Review the misconception points below to sharpen your exam reasoning.'
                : '🌱 Learning is a journey. Re-run the interactive labs and reinforce the chord/tangent rules!'}
            </p>
          </div>

          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">⚠️ Your Target Misconception Profile</h3>
              <p className="text-xs text-slate-300">Examiner points to focus on before board exams:</p>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-semibold">❌ Trap: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ ICSE Rule: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-sky-300">🛠️ {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-900 text-indigo-200 text-center font-bold text-xs leading-5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && (
        <>
          <Confetti onComplete={() => setShowConfetti(false)} />
          <SparkleBurst x={0} y={0} onComplete={() => setShowConfetti(false)} />
        </>
      )}
      {showSuccess && <SuccessBanner message="Theorem Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
    </div>
  );
}

export default C10_MathematicsLocusEquidistantFromSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst,
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C6_MATH_071 = 'c6_math_071';
const NODE_C6_MATH_072 = 'c6_math_072';
const NODE_C6_MATH_073 = 'c6_math_073';
const NODE_C6_MATH_074 = 'c6_math_074';
const NODE_C6_MATH_075 = 'c6_math_075';
const NODE_C6_MATH_076 = 'c6_math_076';
const NODE_C6_MATH_077 = 'c6_math_077';
const NODE_C6_MATH_078 = 'c6_math_078';
const NODE_C6_MATH_079 = 'c6_math_079';
const NODE_C6_MATH_080 = 'c6_math_080';

const ALL_NODE_IDS = [
  NODE_C6_MATH_071,
  NODE_C6_MATH_072,
  NODE_C6_MATH_073,
  NODE_C6_MATH_074,
  NODE_C6_MATH_075,
  NODE_C6_MATH_076,
  NODE_C6_MATH_077,
  NODE_C6_MATH_078,
  NODE_C6_MATH_079,
  NODE_C6_MATH_080,
];

// ─── BRILLIANT.ORG PREDICTION QUESTIONS (PREDICT-THEN-CHECK) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question:
      'If you keep the perimeter of a rectangle constant at 24 cm and make it closer to a square (6cm × 6cm), what will happen to its enclosed area compared to a long narrow shape (11cm × 1cm)?',
    options: [
      'The area will increase significantly (from 11 cm² up to 36 cm²)',
      'The area will decrease because squares take up less room',
      'The area will remain exactly the same since perimeter is constant',
      'The area will become zero',
    ],
    correctIndex: 0,
    verifyInstruction:
      'Drag the rectangle shape slider in Lab 4 to test how area changes as dimensions approach a square.',
    explanation:
      'For any fixed perimeter, a square encloses the maximum possible rectangular area (the isoperimetric property).',
  },
  {
    id: 'pred_2',
    question:
      'When attempting to draw the perpendicular bisector of a 6 cm line segment, what happens if your compass radius is set to only 2.5 cm (< half of segment)?',
    options: [
      'The arcs drawn from both endpoints will fail to intersect entirely',
      'The arcs will intersect at 4 separate points',
      'A perfect right angle will still be formed automatically',
      'The line segment will double in length',
    ],
    correctIndex: 0,
    verifyInstruction:
      'Adjust the Compass Radius slider below 3.0 cm in Lab 1 and watch whether the pink and purple arcs meet.',
    explanation:
      'For circles from endpoints A and B to cross, the sum of their radii must exceed AB (i.e. radius > AB/2).',
  },
];

// ─── BRILLIANT.ORG OBSERVATION QUESTIONS ('WHAT DO YOU NOTICE?') ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question:
      'Look closely at the perpendicular bisector construction in Lab 1. What do you notice about the line PQ connecting the arc intersections?',
    observableOptions: [
      'It cuts the original segment AB exactly in half at 90° (right angle)',
      'It is parallel to the original segment AB',
      'It curves around the midpoint without touching segment AB',
      'It is half the length of segment AB',
    ],
    options: [
      'It cuts the original segment AB exactly in half at 90° (right angle)',
      'It is parallel to the original segment AB',
      'It curves around the midpoint without touching segment AB',
      'It is half the length of segment AB',
    ],
    correctIndex: 0,
    explanation:
      'The line PQ is perpendicular (90°) and bisects (halves) the segment AB at midpoint M.',
  },
  {
    id: 'obs_2',
    question:
      'In Lab 2, observe what happens when you step the compass radius along the arc a second time to point R.',
    observableOptions: [
      'The angle doubles from 60° to exactly 120° (two 60° equilateral sectors)',
      'The angle becomes a right angle (90°)',
      'The angle shrinks back down to 30°',
      'The arc turns into a complete ellipse',
    ],
    options: [
      'The angle doubles from 60° to exactly 120° (two 60° equilateral sectors)',
      'The angle becomes a right angle (90°)',
      'The angle shrinks back down to 30°',
      'The arc turns into a complete ellipse',
    ],
    correctIndex: 0,
    explanation:
      'Each step along the arc with the radius opening corresponds to 60° of angular subtension, so two steps give 60° + 60° = 120°.',
  },
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Young Architect of Chandigarh',
  intro:
    'You are assisting the Chief Urban Planner in designing a new community sector. You need to lay out precise road perpendiculars, construct angular solar canopies (60° and 120°), design parks that balance boundary fencing (perimeter) with lush green lawns (area), manage supply unit conversions, and survey neighborhood residents to test planning hypotheses.',
  context:
    'Use authentic geometric tools (compasses, straight-edge) and mathematical reasoning to build durable, beautiful infrastructure.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question:
    'You have a 16-metre fencing wire. If you shape it into a narrow rectangle (7m × 1m) versus a square (4m × 4m), will both enclose the same ground area for flowers?',
  options: [
    'Yes, because the fence length (perimeter) is exactly 16m for both.',
    'No, the square encloses 16 sq m while the rectangle encloses only 7 sq m!',
    'No, the narrow rectangle encloses more area because it is much longer.',
    'It depends on whether we use wood or metal fencing.',
  ],
  correctIndex: 1,
  hintAfter:
    "Surprising, isn't it? Even with the exact same perimeter, different shapes enclose vastly different areas! Let's explore why.",
};

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type:
    | 'classify'
    | 'distinguish'
    | 'match'
    | 'drag-label'
    | 'drag-sort'
    | 'numeric'
    | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel:
    | 'recall'
    | 'understanding'
    | 'application'
    | 'analysis'
    | 'evaluation'
    | 'creativity';
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
  realWorldContext?: string;
}

// ─── CHALLENGES ARRAY ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_math_001',
    nodeId: NODE_C6_MATH_071,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'When constructing the perpendicular bisector of an 8 cm line segment AB using compasses, what must the compass radius be set to?',
    options: [
      'Strictly more than half the length of AB (> 4 cm)',
      'Exactly equal to half the length of AB (= 4 cm)',
      'Less than half the length of AB (< 4 cm)',
      'Any random setting, it does not matter',
    ],
    correctIndex: 0,
    explanation:
      'The compass radius must be strictly greater than half the segment length (radius > 4 cm). If radius is less than half, the arcs will never meet. If radius equals half, they only touch at one point on the segment.',
    hints: [
      'Think about what happens if the two arcs do not reach each other across the midpoint.',
      'The sum of the two radii from endpoints A and B must exceed the total length AB for circles to intersect at two points.',
      'Half of 8 cm is 4 cm; the radius must be strictly greater than 4 cm (e.g., 5 cm).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_math_002',
    nodeId: NODE_C6_MATH_071,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Label the key parts of the perpendicular bisector construction diagram.',
    dragItems: [
      { label: 'Midpoint M (90°)', targetId: 'target_mid' },
      { label: 'Upper Intersection Arc P', targetId: 'target_top' },
      { label: 'Lower Intersection Arc Q', targetId: 'target_bottom' },
      { label: 'Original Segment AB', targetId: 'target_seg' },
    ],
    correctMapping: {
      target_mid: 'Midpoint M (90°)',
      target_top: 'Upper Intersection Arc P',
      target_bottom: 'Lower Intersection Arc Q',
      target_seg: 'Original Segment AB',
    },
    explanation:
      'The line PQ connecting the top and bottom arc intersections forms the perpendicular bisector, crossing AB at right angles at midpoint M.',
    hints: [
      'The midpoint sits right at the intersection of segment AB and line PQ.',
      'Arc P is above the segment; Arc Q is below the segment.',
      'The horizontal line is the original line segment AB.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_math_003',
    nodeId: NODE_C6_MATH_072,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Why does drawing an arc from vertex O cutting ray OA at P, and then drawing an equal arc from P cutting the first arc at Q, create an exact 60° angle ∠POQ?',
    options: [
      'Because triangle OPQ is equilateral (OP = OQ = PQ), making every angle 60°',
      'Because the protractor baseline forces it to 60°',
      'Because all triangles drawn with compasses have 60° angles',
      'Because 180° divided by 2 is 60°',
    ],
    correctIndex: 0,
    explanation:
      'OP and OQ are radii from centre O (so OP = OQ). PQ was drawn with the exact same compass opening (so PQ = OP). Thus triangle OPQ has three equal sides, making it equilateral with each internal angle equal to 60°.',
    hints: [
      'Look at the lengths of the three segments: OP, OQ, and the chord PQ.',
      'Since the compass radius was never changed, all three sides are identical in length.',
      'A triangle with all three equal sides is equilateral, and each angle in an equilateral triangle is 180°/3 = 60°.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_math_004',
    nodeId: NODE_C6_MATH_072,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Arrange the chronological steps for constructing a 120° angle using ONLY compasses and straight-edge.',
    sortItems: [
      'Draw initial ray OA from vertex O',
      'With O as centre, swing a wide arc cutting OA at point P',
      'With P as centre and SAME radius, mark first cut Q on the arc (60°)',
      'With Q as centre and SAME radius, mark second cut R on the arc (120°)',
      'Join vertex O through point R with a straight-edge ray',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      'Stepping the compass radius twice along the main arc marks two 60° sectors in sequence (60° + 60° = 120°). Joining O to R gives the 120° angle.',
    hints: [
      'First establish the base ray, then draw the main circular arc.',
      'The first compass step gives 60°; the second step adds another 60° to make 120°.',
      'The final step is always drawing the completing ray through the second intersection point R.',
    ],
  },
  {
    id: 'ch_math_005',
    nodeId: NODE_C6_MATH_073,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Construct a method for obtaining a 45° angle using standard geometric bisections. Click the parts in sequence.',
    availableParts: [
      'Straight Angle (180°)',
      'Bisect 180° -> 90°',
      'Bisect 90° -> 45°',
      'Bisect 60° -> 30°',
      'Add 15°',
    ],
    targetState: 'Straight Angle (180°) Bisect 180° -> 90° Bisect 90° -> 45°',
    validationHint:
      'Start with a straight angle, halve it to get a right angle, then halve the right angle.',
    explanation:
      'Bisecting a 180° straight angle yields 90°. Bisecting that 90° angle yields the required 45° angle.',
    hints: [
      'What is half of 180 degrees? 90 degrees.',
      'What is half of 90 degrees? 45 degrees.',
      'Select: Straight Angle (180°) -> Bisect 180° -> 90° -> Bisect 90° -> 45°',
    ],
  },
  {
    id: 'ch_math_006',
    nodeId: NODE_C6_MATH_073,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'An architect wants to construct an exact 75° solar roof incline using only ruler and compasses. Which combination correctly generates 75° without a protractor?',
    options: [
      'Construct 60° and 90° on the same base, then bisect the 30° angle between them (60° + 15° = 75°)',
      'Construct 120° and subtract 40° by eye measurement',
      'Bisect 60° twice to get 15°, then multiply by 5 on a protractor',
      'Construct 45° and add 20° using an unmarked ruler',
    ],
    correctIndex: 0,
    explanation:
      'Between 60° and 90° lies a 30° interval. Bisecting this 30° gap yields 15°. Adding this 15° to the base 60° gives an exact 75° angle (60° + 15° = 75°).',
    hints: [
      '75° can be thought of as 60° + 15° or (90° + 60°)/2 = 75° (bisecting 150°).',
      'Both 60° and 90° can be constructed with compasses. The difference between them is 30°.',
      'Bisecting that 30° difference gives 15°, which added to 60° makes 75Base.',
    ],
  },
  {
    id: 'ch_math_007',
    nodeId: NODE_C6_MATH_074,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'To drop a perpendicular line from an external point P down to line l, why must the compass arc from P cut line l at TWO points A and B?',
    options: [
      'Because having PA = PB makes P equidistant from A and B, putting P on the perpendicular bisector of AB',
      'Because one point alone cannot hold the pencil steady',
      'Because line l must be divided into three unequal parts',
      'Because the distance PA must always equal 10 cm',
    ],
    correctIndex: 0,
    explanation:
      'Drawing an arc from external point P cuts line l at two points A and B where PA = PB. Point P is therefore on the perpendicular bisector of AB. Constructing another equidistant point Q below/above l identifies the exact perpendicular line PQ.',
    hints: [
      'What geometric property relates a point on a circle to two points on its circumference?',
      'Both A and B are on the same circle centred at P, so PA = PB.',
      'Any point equidistant from A and B lies on the perpendicular bisector of AB.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_math_008',
    nodeId: NODE_C6_MATH_074,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Drag the geometric labels to their corresponding parts of the circle.',
    dragItems: [
      { label: 'Radius (r)', targetId: 'circ_radius' },
      { label: 'Diameter (2r)', targetId: 'circ_diameter' },
      { label: 'Chord', targetId: 'circ_chord' },
      { label: 'Sector (Pie Slice)', targetId: 'circ_sector' },
    ],
    correctMapping: {
      circ_radius: 'Radius (r)',
      circ_diameter: 'Diameter (2r)',
      circ_chord: 'Chord',
      circ_sector: 'Sector (Pie Slice)',
    },
    explanation:
      'The radius joins centre to boundary. The diameter is the longest chord passing through the centre. A chord connects any two perimeter points. A sector is the region bounded by two radii and an arc.',
    hints: [
      'The segment from centre to edge is the radius.',
      'The line passing completely through the centre from edge to edge is the diameter.',
      'A pie-slice region enclosed by two radii is a sector.',
    ],
  },
  {
    id: 'ch_math_009',
    nodeId: NODE_C6_MATH_075,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question:
      'A rectangular park in Sector 17, Chandigarh is 65 metres long and 35 metres wide. What is the total length of wire fencing needed to surround it once?',
    correctAnswer: 200,
    tolerance: 0,
    unit: 'metres',
    explanation:
      'Perimeter = 2 × (length + breadth) = 2 × (65m + 35m) = 2 × 100m = 200 metres of wire fencing.',
    hints: [
      'Perimeter of a rectangle is the sum of all four sides: l + b + l + b = 2(l + b).',
      'Add length and breadth first: 65 + 35 = 100.',
      'Multiply by 2: 2 × 100 = 200 metres.',
    ],
  },
  {
    id: 'ch_math_010',
    nodeId: NODE_C6_MATH_075,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A rectangular swimming pool has a perimeter of 56 metres. If its length is 18 metres, what is its breadth in metres?',
    correctAnswer: 10,
    tolerance: 0,
    unit: 'metres',
    explanation:
      'Perimeter = 2(l + b) => 56 = 2(18 + b) => 18 + b = 28 => b = 28 - 18 = 10 metres.',
    hints: [
      'Divide the total perimeter by 2 to find (length + breadth): 56 / 2 = 28.',
      'Subtract the known length (18m) from 28m.',
      '28 - 18 = 10 metres.',
    ],
  },
  {
    id: 'ch_math_011',
    nodeId: NODE_C6_MATH_076,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Consider Shape A (Square of side 5 cm) and Shape B (Rectangle of 8 cm × 2 cm). Both have perimeter = 20 cm. What are their respective areas?',
    options: [
      'Square A = 25 sq cm, Rectangle B = 16 sq cm (Square encloses 9 sq cm more area!)',
      'Square A = 20 sq cm, Rectangle B = 20 sq cm (Areas must be identical)',
      'Square A = 16 sq cm, Rectangle B = 25 sq cm',
      'Square A = 100 sq cm, Rectangle B = 64 sq cm',
    ],
    correctIndex: 0,
    explanation:
      'Square area = 5 × 5 = 25 sq cm. Rectangle area = 8 × 2 = 16 sq cm. Both have perimeter 20 cm, proving that same perimeter does NOT mean same area, and the square encloses the maximum area!',
    hints: [
      'Calculate area of square: side × side = 5 × 5.',
      'Calculate area of rectangle: length × breadth = 8 × 2.',
      'Compare 25 sq cm and 16 sq cm.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_math_012',
    nodeId: NODE_C6_MATH_076,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'A contractor claims: "If two school sports grounds use exactly 120 metres of perimeter border, they will automatically provide the same grass play area." How should the school principal evaluate this claim?',
    options: [
      'Reject the claim: a 30m × 30m square field gives 900 sq m of grass, while a 50m × 10m field gives only 500 sq m despite both using 120m perimeter border.',
      'Accept the claim: boundary length is the sole factor determining enclosed surface area.',
      'Accept the claim: all quadrilaterals with perimeter 120m have equal area by ICSE mensuration theorem.',
      'Reject the claim only if one field is triangular.',
    ],
    correctIndex: 0,
    explanation:
      'The claim is false. Perimeter measures 1D boundary, while area measures 2D enclosed surface. For a fixed perimeter of 120m, a square (30m×30m) yields 900 sq m, whereas a narrow rectangle (50m×10m) yields only 500 sq m.',
    hints: [
      'Test with counter-examples using whole numbers where 2(l+b) = 120.',
      'Square: 4s = 120 => s = 30 => Area = 30 × 30 = 900 sq m.',
      'Rectangle: l=50, b=10 => Perimeter = 2(60) = 120 => Area = 50 × 10 = 500 sq m. 900 ≠ 500!',
    ],
  },
  {
    id: 'ch_math_013',
    nodeId: NODE_C6_MATH_077,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'A classroom floor is covered with square tiles of size 1m × 1m. If the room has 7 rows with 6 tiles in each row, what is the floor area in square metres?',
    correctAnswer: 42,
    tolerance: 0,
    unit: 'sq m',
    explanation:
      'Area = length × breadth = 7m × 6m = 42 square metres (containing 42 unit tiles).',
    hints: [
      'Each tile represents 1 square metre.',
      'Multiply the number of rows by the number of tiles per row.',
      '7 × 6 = 42 sq m.',
    ],
  },
  {
    id: 'ch_math_014',
    nodeId: NODE_C6_MATH_077,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'A kitchen floor is 4 metres long and 3 metres wide. Square ceramic tiles of side 50 cm (0.5 m) are to be laid. How many tiles are needed to cover the entire floor?',
    correctAnswer: 48,
    tolerance: 0,
    unit: 'tiles',
    explanation:
      'Floor area = 4m × 3m = 12 sq m. Area of one tile = 0.5m × 0.5m = 0.25 sq m. Number of tiles = 12 / 0.25 = 48 tiles (or along length 4/0.5=8 tiles, breadth 3/0.5=6 tiles; 8 × 6 = 48 tiles).',
    hints: [
      'First calculate the area of the floor in square metres: 4 × 3 = 12 sq m.',
      'Convert 50 cm to metres: 0.5 m. Tile area = 0.5 × 0.5 = 0.25 sq m.',
      'Divide floor area by tile area: 12 / 0.25 = 48.',
    ],
  },
  {
    id: 'ch_math_078_01',
    nodeId: NODE_C6_MATH_078,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'How does the general formula for perimeter of a rectangle P = 2(l + b) simplify when applied to a square of side s (where l = s and b = s)?',
    options: [
      'P = 2(s + s) = 2(2s) = 4s (4 times the side length)',
      'P = s × s = s²',
      'P = 2s + s = 3s',
      'P = 2(s × s) = 2s²',
    ],
    correctIndex: 0,
    explanation:
      'A square is a special rectangle where length and breadth are equal (l = b = s). Substituting into 2(l + b) gives 2(s + s) = 2(2s) = 4s.',
    hints: [
      'In a square, all four sides have the same length s.',
      'Replace both l and b with s in 2(l + b).',
      '2 × (s + s) = 2 × 2s = 4s.',
    ],
  },
  {
    id: 'ch_math_016',
    nodeId: NODE_C6_MATH_079,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'A bag of basmati rice weighs 4750 grams. Convert this mass to kilograms.',
    correctAnswer: 4.75,
    tolerance: 0.01,
    unit: 'kg',
    explanation:
      'To convert from smaller unit (grams) to larger unit (kilograms), divide by 1000: 4750 / 1000 = 4.75 kg.',
    hints: [
      '1 kilogram = 1000 grams.',
      'Going from smaller to larger unit means we DIVIDE.',
      '4750 ÷ 1000 = 4.75 kg.',
    ],
  },
  {
    id: 'ch_math_017',
    nodeId: NODE_C6_MATH_079,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A bus ticket in Bengaluru costs 3450 paise, and the journey takes 150 minutes. How should these be expressed in standard mixed units for CISCE exams?',
    options: [
      '₹34.50 and 2 hours 30 minutes',
      '₹3.45 and 1.5 hours',
      '₹345.0 and 1500 seconds',
      '₹34.50 and 2.50 hours',
    ],
    correctIndex: 0,
    explanation:
      '3450 paise ÷ 100 = ₹34.50. 150 minutes ÷ 60 = 2 with remainder 30 => 2 hours 30 minutes. CISCE examiners explicitly recommend mixed form (hours & minutes) over decimal hours.',
    hints: [
      '1 Rupee = 100 paise; divide 3450 by 100.',
      '1 Hour = 60 minutes; 150 minutes = 120 min + 30 min = 2 hr 30 min.',
      'Look for ₹34.50 and 2 hours 30 minutes.',
    ],
  },
  {
    id: 'ch_math_018',
    nodeId: NODE_C6_MATH_079,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'A water dispenser holds 6.5 litres of mineral water. How many millilitres (mL) is this?',
    correctAnswer: 6500,
    tolerance: 0,
    unit: 'mL',
    explanation:
      'To convert larger unit (litres) to smaller unit (millilitres), multiply by 1000: 6.5 × 1000 = 6500 mL.',
    hints: [
      '1 Litre = 1000 millilitres.',
      'Converting from larger to smaller means we MULTIPLY.',
      '6.5 × 1000 = 6500 mL.',
    ],
  },
  {
    id: 'ch_math_019',
    nodeId: NODE_C6_MATH_080,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'What is the fundamental difference between a mathematical hypothesis and a conclusion?',
    options: [
      'A hypothesis is a testable prediction made BEFORE collecting data; a conclusion is an evidence-based judgement made AFTER examining the data.',
      'A hypothesis is always correct, while a conclusion is always an unverified guess.',
      'A hypothesis uses numbers, while a conclusion only uses words.',
      'There is no difference; both terms mean the final answer.',
    ],
    correctIndex: 0,
    explanation:
      'A hypothesis is formed before data collection as an educated guess. A conclusion is formulated after analyzing the collected raw data evidence.',
    hints: [
      'Think about the timeline of a scientific or mathematical investigation.',
      'Which comes first: the guess or the evidence?',
      'Hypothesis = before data; Conclusion = after analyzing data.',
    ],
  },
  {
    id: 'ch_math_020',
    nodeId: NODE_C6_MATH_080,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Ananya formulated the hypothesis: "Most students in Class 6 come to school by school bus." She surveyed all 40 classmates: 22 walked, 12 took the bus, 4 cycled, and 2 came by car. What is the mathematically valid conclusion?',
    options: [
      'The data contradicts Ananya\'s hypothesis: walking is the most common mode (22/40), while bus is second (12/40).',
      'Ananya failed the project because her hypothesis was proven false.',
      'The data proves the hypothesis because 12 is a large number.',
      'She should alter the survey numbers to make school bus the winner.',
    ],
    correctIndex: 0,
    explanation:
      'Since 22 out of 40 students walk (a clear majority), the collected data contradicts her hypothesis. In mathematics, a contradicted hypothesis is a completely valid, honest finding — not a failure!',
    hints: [
      'Look at which category received the highest count: Walking (22) vs Bus (12).',
      'Does 12 represent "most" students out of 40? No, 22 is greater.',
      'The evidence contradicts the initial prediction.',
    ],
  },
  {
    id: 'ch_math_021',
    nodeId: NODE_C6_MATH_080,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Rohan hypothesises: "Cricket is the favourite sport of all 200 middle-school students." He surveys only his 4 cricket-team teammates at lunch and declares his hypothesis "100% scientifically proved." Why is this flawed?',
    options: [
      'The sample size of 4 is far too small and suffers from heavy selection bias (only asking cricket players), so it cannot represent 200 students.',
      'Because middle-school students only like football.',
      'Because surveys must only be conducted during mathematics periods.',
      'Because a hypothesis can never be tested with numbers.',
    ],
    correctIndex: 0,
    explanation:
      'A sample of 4 friends from the cricket team is tiny and heavily biased. Valid data collection requires a representative, unbiased sample of adequate size from the whole middle-school population.',
    hints: [
      'Are teammates on the cricket team likely to represent all 200 students fairly?',
      'Is 4 people out of 200 enough evidence?',
      'Look for the option addressing sample size and selection bias.',
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
  diagnosticQuestions?: {
    question: string;
    options: string[];
    correctIndex: number;
  }[];
  masteryCriteria?: string;
  onComplete?: (score: number) => void;
}

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C6_MATH_071,
  title: 'Geometric Constructions, Mensuration & Practical Data',
  definition:
    'Comprehensive mastery of ruler-and-compass constructions (line segments, perpendicular bisectors, 60°/120° angles, angle bisectors, circles), deductive mensuration formulas (perimeter 2(l+b), 4s; area l×b, s²), unit conversions across mass, capacity, money, time, and data-driven hypothesis testing.',
  eli5: 'Think of geometry like building with a pair of magic legs (compasses) and a straight track (ruler). You can split sticks in half, build roof angles, compare fence length to grass space, convert grams to kilos, and survey your friends like a detective!',
  misconceptions: [
    {
      misconception:
        'Any compass radius can be used to construct a perpendicular bisector.',
      correction:
        'The compass radius MUST be strictly greater than half the segment length (r > L/2), otherwise the arcs never intersect.',
    },
    {
      misconception:
        'Shapes with the same perimeter must have the exact same area.',
      correction:
        'Perimeter (boundary length) and area (surface space) are independent. A 4m×4m square and 7m×1m rectangle both have 16m perimeter, but 16 sq m vs 7 sq m area!',
    },
    {
      misconception:
        'A protractor can be used when the question specifies ruler and compasses only.',
      correction:
        'CISCE board guidelines strictly penalise using a protractor when ruler and compasses are specified. 60° and 120° must be constructed using equal-radii arcs.',
    },
    {
      misconception:
        'Area of a rectangle is found by adding length and breadth.',
      correction:
        'Adding gives the semi-perimeter (l + b). Area is the 2D product of length and breadth (l × b) in square units.',
    },
    {
      misconception:
        'If data contradicts a hypothesis, the investigation is a failure.',
      correction:
        'In mathematics and science, an honest conclusion that contradicts a hypothesis is a valid, high-mark discovery.',
    },
  ],
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Perpendicular Bisector Physics & Geometry',
    instruction:
      'Adjust the Compass Radius slider. Notice how arcs only cross at two distinct points (above and below) when Radius > Segment Length / 2.',
    nodeId: NODE_C6_MATH_071,
  },
  {
    title: 'Lab 2: The 60° & 120° Equilateral Compass Step',
    instruction:
      'Click the Step button to see how walking the compass radius around the main arc creates 60° sectors from equilateral triangles.',
    nodeId: NODE_C6_MATH_072,
  },
  {
    title: 'Lab 3: Angle Bisector & Angle Replicator',
    instruction:
      'Drag the angle opening slider. Watch the bisector ray divide the angle into two exactly equal halves with real-time degree readouts.',
    nodeId: NODE_C6_MATH_073,
  },
  {
    title: 'Lab 4: The Isoperimetric Paradox (Same Perimeter, Different Area)',
    instruction:
      'Drag the rectangle shape slider with a fixed 24m perimeter. Watch the area change from a tiny 11 sq m sliver up to a 36 sq m square!',
    nodeId: NODE_C6_MATH_076,
  },
  {
    title: 'Lab 5: Real-time Unit Converter & Survey Hypothesis Engine',
    instruction:
      'Toggle unit systems and test live survey hypotheses by casting classmate votes.',
    nodeId: NODE_C6_MATH_080,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Urban Architect: Community Park & Sports Ground Blueprint',
  description:
    'Apply your Class 6 mathematics skills to design a community sector in Chandigarh. Measure perimeter borders, optimize green grass area with a square layout, convert water tanker capacities, and survey local families on playground preferences.',
  steps: [
    'Draw a 10 cm segment on paper and construct its perpendicular bisector using only compasses.',
    'Construct a 60° angle and bisect it to create a 30° solar awning angle.',
    'Take a 30 cm string loop and compare the area of a 14cm × 1cm rectangle with an 8cm × 7cm rectangle.',
    'Formulate a hypothesis about your household water usage (litres to mL) and test it with 3 days of meter readings.',
  ],
};

function C6_MathematicsConstructionsDrawingLineSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C6_MATH_071,
  title = DEFAULT_PROPS.title ||
    'Geometric Constructions, Mensuration & Practical Data',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || {
    name: 'Mathematics',
    emoji: '📐',
    color: 'emerald',
  };

  const [phase, setPhase] = useState<
    'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'
  >('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Brilliant.org Predictions & Observations State
  const [predictionIndex, setPredictionIndex] = useState(0);
  const [predictionAnswered, setPredictionAnswered] = useState<boolean[]>([false, false]);
  const [predictionSelected, setPredictionSelected] = useState<number[]>([-1, -1]);

  const [observationIndex, setObservationIndex] = useState(0);
  const [observationAnswered, setObservationAnswered] = useState<boolean[]>([false, false]);
  const [observationSelected, setObservationSelected] = useState<number[]>([-1, -1]);

  // Interactive Lab States
  const [segmentLength, setSegmentLength] = useState<number>(6);
  const [compassRadius, setCompassRadius] = useState<number>(4.2);
  const [angleStepCount, setAngleStepCount] = useState<number>(1);
  const [interactiveAngle, setInteractiveAngle] = useState<number>(70);
  const [rectLength, setRectLength] = useState<number>(8);
  const [converterValue, setConverterValue] = useState<number>(3500);
  const [converterType, setConverterType] = useState<
    'mass' | 'capacity' | 'money' | 'time'
  >('mass');
  const [surveyBusVotes, setSurveyBusVotes] = useState<number>(14);
  const [surveyWalkVotes, setSurveyWalkVotes] = useState<number>(20);
  const [surveyCycleVotes, setSurveyCycleVotes] = useState<number>(6);

  // Challenge Flow & Adaptive States
  const [difficulty, setDifficulty] = useState<
    'foundation' | 'standard' | 'advanced'
  >('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Escalating hints state
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  // Drag & Drop / Numeric / Construct States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>(
    {}
  );
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback Animations
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Derived Values
  const rectBreadth = useMemo(() => 12 - rectLength, [rectLength]);
  const rectPerimeter = useMemo(
    () => 2 * (rectLength + rectBreadth),
    [rectLength, rectBreadth]
  );
  const rectArea = useMemo(
    () => rectLength * rectBreadth,
    [rectLength, rectBreadth]
  );
  const isCompassRadiusValid = useMemo(
    () => compassRadius > segmentLength / 2,
    [compassRadius, segmentLength]
  );

  const convertedResult = useMemo(() => {
    switch (converterType) {
      case 'mass':
        return {
          from: `${converterValue} g`,
          to: `${(converterValue / 1000).toFixed(2)} kg`,
          factor: '÷ 1000',
        };
      case 'capacity':
        return {
          from: `${converterValue} mL`,
          to: `${(converterValue / 1000).toFixed(2)} L`,
          factor: '÷ 1000',
        };
      case 'money':
        return {
          from: `${converterValue} paise`,
          to: `₹${(converterValue / 100).toFixed(2)}`,
          factor: '÷ 100',
        };
      case 'time': {
        const hrs = Math.floor(converterValue / 60);
        const mins = converterValue % 60;
        return {
          from: `${converterValue} mins`,
          to: `${hrs} hr ${mins} min`,
          factor: '÷ 60 (mixed format)',
        };
      }
      default:
        return { from: '', to: '', factor: '' };
    }
  }, [converterValue, converterType]);

  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter(
        (c) => c.difficulty === 'foundation' || c.difficulty === 'standard'
      );
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

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
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      const pulse = Math.sin(frame * 0.05) * 6;
      ctx.beginPath();
      ctx.arc(cx, cy, 30 + pulse, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.moveTo(cx - 70, cy);
      ctx.lineTo(cx + 70, cy);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx, cy - 35);
      ctx.lineTo(cx, cy + 35);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  const showNextHint = useCallback(() => {
    const nextLvl = hintCount + 1;
    if (nextLvl <= 3 && challenge?.hints?.[nextLvl - 1]) {
      const hintMsg = challenge.hints[nextLvl - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLvl);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
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

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const correct = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(correct);
    setDiscoveryAnswered(true);
    if (correct) {
      audioManager.play('success');
      speechManager.speak('Brilliant observation!');
    } else {
      audioManager.play('error');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
      speechManager.speak('Notice how the space changes! Let us explore the math.');
    }
  }, []);

  const handlePredictionAnswer = useCallback((qIndex: number, optIndex: number) => {
    setPredictionSelected((prev) => {
      const next = [...prev];
      next[qIndex] = optIndex;
      return next;
    });
    setPredictionAnswered((prev) => {
      const next = [...prev];
      next[qIndex] = true;
      return next;
    });

    const isCorrect = optIndex === PREDICTION_QUESTIONS[qIndex].correctIndex;
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Great prediction! Now verify it on the interactive canvas.');
    } else {
      audioManager.play('error');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
      speechManager.speak('Interesting prediction. Use the interactive controls to check what really happens!');
    }
  }, []);

  const handleObservationAnswer = useCallback((qIndex: number, optIndex: number) => {
    setObservationSelected((prev) => {
      const next = [...prev];
      next[qIndex] = optIndex;
      return next;
    });
    setObservationAnswered((prev) => {
      const next = [...prev];
      next[qIndex] = true;
      return next;
    });

    const isCorrect = optIndex === OBSERVATION_QUESTIONS[qIndex].correctIndex;
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Accurate observation! Geometric precision confirmed.');
    } else {
      audioManager.play('error');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
      speechManager.speak('Look closer at the angles and intersection lines in the lab.');
    }
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak(
      'Welcome to the interactive geometry lab. Manipulate the tools freely.'
    );
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Test your own measurements.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge time! Let us test your geometric mastery.');
  }, []);

  const handleSegmentChange = useCallback((val: number) => {
    setSegmentLength(val);
    audioManager.play('count');
  }, []);

  const handleCompassRadiusChange = useCallback((val: number) => {
    setCompassRadius(val);
    audioManager.play('count');
  }, []);

  const handleStepAngle = useCallback(() => {
    setAngleStepCount((prev) => (prev === 1 ? 2 : 1));
    audioManager.play('swoop');
    speechManager.speak(
      angleStepCount === 1
        ? 'Second compass step marks 120 degrees!'
        : 'Reset to 60 degrees.'
    );
  }, [angleStepCount]);

  const handleDragStart = useCallback((lbl: string) => {
    setDraggedItem(lbl);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (tId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[tId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [tId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
        setWrongShake(true);
        setTimeout(() => setWrongShake(false), 500);
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        const base =
          prev.length === (challenge.sortItems?.length || 0)
            ? prev
            : challenge.sortItems?.map((_, i) => i) || [];
        const arr = [...base];
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
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak(
      'Outstanding! You have mastered Class 6 Constructions and Mensuration.'
    );
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

      if (
        challenge.type === 'classify' ||
        challenge.type === 'distinguish' ||
        challenge.type === 'match'
      ) {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect =
          JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect =
          JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numVal =
          typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect =
          Math.abs(numVal - (challenge.correctAnswer || 0)) <=
          (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({
          correct: sb.correct + 1,
          total: sb.total + 1,
        }));
        audioManager.play('success');
        audioManager.play('drop-correct');
        speechManager.speak('Correct! Excellent geometrical deduction.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(
            'srs_' + challenge.nodeId,
            JSON.stringify(updatedSrs)
          );
        }
      } else {
        audioManager.play('error');
        audioManager.play('drop-wrong');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (
          challenge.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(challenge.misconceptionIndex)
        ) {
          setHitMisconceptions((prev) => [
            ...prev,
            challenge.misconceptionIndex!,
          ]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the step-by-step construction.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(
            challenge.nodeId,
            challenge.question
          );
          const updatedSrs = sm2Update(srsItem, 1, 3000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(
              'srs_' + challenge.nodeId,
              JSON.stringify(updatedSrs)
            );
          }
        }
      }
      resetInactivityTimer();
    },
    [
      challenge,
      hintCount,
      hitMisconceptions,
      showNextHint,
      resetInactivityTimer,
    ]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 15 }}
            className="text-3xl p-2 bg-emerald-950/80 border border-emerald-700 rounded-2xl"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase">
              Class 6 ICSE Mathematics • Geometry & Mensuration
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              {title}
            </h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(
            (p) => (
              <motion.button
                key={p}
                aria-label={`Switch to ${p} phase`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPhase(p);
                  audioManager.play('tap');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  phase === p
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {p}
              </motion.button>
            )
          )}
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY HOOK & PREDICTION PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-5 bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-800/60 rounded-2xl"
            >
              <h2 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
                <span>🏛️</span> {SCENARIO.title}
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                {SCENARIO.intro}
              </p>
              <p className="text-xs text-emerald-400/90 mt-2 font-medium">
                👉 {SCENARIO.context}
              </p>
            </motion.div>

            {/* Discovery Question Card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4"
            >
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="p-1.5 bg-emerald-900/50 rounded-lg text-emerald-400">
                  ?
                </span>
                Curiosity Hook: Discovery Question
              </h3>
              <p className="text-slate-200 text-sm font-medium">
                {DISCOVERY_QUESTION.question}
              </p>

              <div className="grid grid-cols-1 gap-2.5">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake && discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                      discoveryAnswered &&
                      i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-100'
                        : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-900/50 border border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200'
                    }`}
                  >
                    <span>
                      <span className="font-bold mr-2 text-slate-400">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                    </span>
                    {discoveryAnswered &&
                      (i === DISCOVERY_QUESTION.correctIndex ? (
                        <span className="text-emerald-400 font-bold ml-2">✓</span>
                      ) : (
                        <span className="text-rose-400 font-bold ml-2">✗</span>
                      ))}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <p
                    className={`text-sm ${
                      discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {discoveryCorrect
                      ? '✓ Spot on! You have intuitive geometric insight.'
                      : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Brilliant.org Predict-then-Check Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900/90 border border-gold-900/70 rounded-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
                  <span>🔮</span> Brilliant Prediction Challenge ({predictionIndex + 1} of {PREDICTION_QUESTIONS.length})
                </h3>
                <div className="flex gap-1.5">
                  {PREDICTION_QUESTIONS.map((_, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => setPredictionIndex(pIdx)}
                      className={`px-2.5 py-1 text-xs rounded-lg font-bold ${
                        predictionIndex === pIdx
                          ? 'bg-gold-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      P{pIdx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-sm text-slate-200 font-medium">
                {PREDICTION_QUESTIONS[predictionIndex].question}
              </p>

              <div className="grid grid-cols-1 gap-2.5">
                {PREDICTION_QUESTIONS[predictionIndex].options.map((opt, i) => {
                  const isAnswered = predictionAnswered[predictionIndex];
                  const isCorrectOpt = i === PREDICTION_QUESTIONS[predictionIndex].correctIndex;
                  const isChosen = predictionSelected[predictionIndex] === i;

                  return (
                    <motion.button
                      key={i}
                      aria-label={`Prediction Option ${String.fromCharCode(65 + i)}`}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      animate={
                        wrongShake && isAnswered && isChosen && !isCorrectOpt
                          ? { x: [0, -10, 10, -10, 10, 0] }
                          : { x: 0 }
                      }
                      transition={{ duration: 0.4 }}
                      onClick={() => handlePredictionAnswer(predictionIndex, i)}
                      disabled={isAnswered}
                      className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                        isAnswered && isCorrectOpt
                          ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-100'
                          : isAnswered && isChosen && !isCorrectOpt
                          ? 'bg-rose-950/70 border-2 border-rose-500 text-rose-200'
                          : isAnswered
                          ? 'bg-slate-900/40 border border-slate-800 text-slate-500 opacity-60'
                          : 'bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200'
                      }`}
                    >
                      <span>
                        <span className="font-bold mr-2 text-gold-400">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {opt}
                      </span>
                      {isAnswered && isCorrectOpt && <span className="text-emerald-400 font-bold ml-2">✓</span>}
                      {isAnswered && isChosen && !isCorrectOpt && <span className="text-rose-400 font-bold ml-2">✗</span>}
                    </motion.button>
                  );
                })}
              </div>

              {predictionAnswered[predictionIndex] && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 bg-gold-950/50 border border-gold-700/60 rounded-xl text-xs space-y-1.5"
                >
                  <p className="text-gold-200 font-bold">
                    🔬 How to verify in the lab:
                  </p>
                  <p className="text-slate-300">
                    {PREDICTION_QUESTIONS[predictionIndex].verifyInstruction}
                  </p>
                </motion.div>
              )}

              <div className="flex justify-end pt-2">
                <motion.button
                  aria-label="Enter Geometric Labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-950 flex items-center gap-2 shrink-0"
                >
                  Enter Geometric Labs →
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 2. GUIDED INTERACTIVE EXPLORATION & OBSERVATIONS ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ y: -5 }}
              animate={{ y: 0 }}
              className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-400 font-medium"
            >
              <span>
                Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <span className="text-emerald-400 font-bold">
                {EXPLORATION_STEPS[currentSlide].nodeId}
              </span>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4"
              >
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-lg font-bold text-emerald-300"
                >
                  {EXPLORATION_STEPS[currentSlide].title}
                </motion.h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>

                {/* SLIDE 0: Perpendicular Bisector SVG Engine */}
                {currentSlide === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-400 flex justify-between">
                          <span>Segment Length AB:</span>
                          <span className="text-emerald-400 font-bold">
                            {segmentLength} cm
                          </span>
                        </label>
                        <input
                          type="range"
                          min={4}
                          max={10}
                          step={0.5}
                          aria-label="Adjust segment length in centimeters"
                          value={segmentLength}
                          onChange={(e) =>
                            handleSegmentChange(parseFloat(e.target.value))
                          }
                          className="w-full accent-emerald-500 mt-1 cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 flex justify-between">
                          <span>Compass Radius r:</span>
                          <span
                            className={`font-bold ${
                              isCompassRadiusValid
                                ? 'text-emerald-400'
                                : 'text-rose-400'
                            }`}
                          >
                            {compassRadius} cm{' '}
                            {isCompassRadiusValid
                              ? '(✓ Valid > L/2)'
                              : '(✗ TOO SMALL!)'}
                          </span>
                        </label>
                        <input
                          type="range"
                          min={2}
                          max={8}
                          step={0.2}
                          aria-label="Adjust compass radius in centimeters"
                          value={compassRadius}
                          onChange={(e) =>
                            handleCompassRadiusChange(parseFloat(e.target.value))
                          }
                          className="w-full accent-emerald-500 mt-1 cursor-pointer"
                        />
                      </div>
                    </div>

                    <svg
                      viewBox="0 0 500 240"
                      className="w-full h-56 bg-slate-900/80 rounded-xl border border-slate-800/80"
                    >
                      {(() => {
                        const scale = 32;
                        const midX = 250;
                        const y = 120;
                        const halfSpan = (segmentLength * scale) / 2;
                        const ax = midX - halfSpan;
                        const bx = midX + halfSpan;
                        const rPx = compassRadius * scale;

                        const canIntersect = compassRadius > segmentLength / 2;
                        const h = canIntersect
                          ? Math.sqrt(
                              Math.max(0, rPx * rPx - halfSpan * halfSpan)
                            )
                          : 0;

                        return (
                          <g>
                            <line
                              x1={ax}
                              y1={y}
                              x2={bx}
                              y2={y}
                              stroke="#38bdf8"
                              strokeWidth="3"
                            />
                            <circle cx={ax} cy={y} r="5" fill="#38bdf8" />
                            <circle cx={bx} cy={y} r="5" fill="#38bdf8" />
                            <text
                              x={ax - 12}
                              y={y + 5}
                              fill="#38bdf8"
                              fontSize="12"
                              fontWeight="bold"
                            >
                              A
                            </text>
                            <text
                              x={bx + 8}
                              y={y + 5}
                              fill="#38bdf8"
                              fontSize="12"
                              fontWeight="bold"
                            >
                              B
                            </text>

                            <path
                              d={`M ${ax + rPx * 0.7} ${y - rPx * 0.7} A ${rPx} ${rPx} 0 0 0 ${ax + rPx * 0.7} ${y + rPx * 0.7}`}
                              fill="none"
                              stroke="rgba(244, 114, 182, 0.6)"
                              strokeWidth="2"
                              strokeDasharray="4 2"
                            />

                            <path
                              d={`M ${bx - rPx * 0.7} ${y - rPx * 0.7} A ${rPx} ${rPx} 0 0 1 ${bx - rPx * 0.7} ${y + rPx * 0.7}`}
                              fill="none"
                              stroke="rgba(167, 139, 250, 0.6)"
                              strokeWidth="2"
                              strokeDasharray="4 2"
                            />

                            {canIntersect ? (
                              <g>
                                <circle
                                  cx={midX}
                                  cy={y - h}
                                  r="4"
                                  fill="#10b981"
                                />
                                <circle
                                  cx={midX}
                                  cy={y + h}
                                  r="4"
                                  fill="#10b981"
                                />
                                <text
                                  x={midX + 8}
                                  y={y - h}
                                  fill="#10b981"
                                  fontSize="11"
                                  fontWeight="bold"
                                >
                                  P
                                </text>
                                <text
                                  x={midX + 8}
                                  y={y + h}
                                  fill="#10b981"
                                  fontSize="11"
                                  fontWeight="bold"
                                >
                                  Q
                                </text>

                                <line
                                  x1={midX}
                                  y1={Math.max(10, y - h - 20)}
                                  x2={midX}
                                  y2={Math.min(230, y + h + 20)}
                                  stroke="#10b981"
                                  strokeWidth="2.5"
                                />

                                <circle cx={midX} cy={y} r="3" fill="#facc15" />
                                <text
                                  x={midX - 18}
                                  y={y - 8}
                                  fill="#facc15"
                                  fontSize="10"
                                  fontWeight="bold"
                                >
                                  M (90°)
                                </text>
                                <path
                                  d={`M ${midX} ${y - 10} L ${midX + 10} ${y - 10} L ${midX + 10} ${y}`}
                                  fill="none"
                                  stroke="#facc15"
                                  strokeWidth="1.5"
                                />
                              </g>
                            ) : (
                              <text
                                x="250"
                                y="50"
                                textAnchor="middle"
                                fill="#f43f5e"
                                fontSize="12"
                                fontWeight="bold"
                              >
                                ✗ Arcs do not meet! Radius must be &gt;{' '}
                                {(segmentLength / 2).toFixed(1)} cm
                              </text>
                            )}
                          </g>
                        );
                      })()}
                    </svg>
                  </motion.div>
                )}

                {/* SLIDE 1: 60° & 120° Angle Stepper */}
                {currentSlide === 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-slate-300">
                        Current Angle Constructed:{' '}
                        <strong className="text-emerald-400 text-base">
                          {angleStepCount === 1 ? '60° (1 Step)' : '120° (2 Steps)'}
                        </strong>
                      </span>
                      <motion.button
                        aria-label="Toggle compass step between 60 and 120 degrees"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleStepAngle}
                        className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl"
                      >
                        {angleStepCount === 1
                          ? 'Step Compass Again -> 120°'
                          : 'Reset to 60°'}
                      </motion.button>
                    </div>

                    <svg
                      viewBox="0 0 500 240"
                      className="w-full h-56 bg-slate-900/80 rounded-xl border border-slate-800"
                    >
                      <circle cx="150" cy="180" r="4" fill="#38bdf8" />
                      <text
                        x="135"
                        y="185"
                        fill="#38bdf8"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        O
                      </text>

                      <line
                        x1="150"
                        y1="180"
                        x2="420"
                        y2="180"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />
                      <text
                        x="425"
                        y="185"
                        fill="#38bdf8"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        A
                      </text>

                      <path
                        d="M 290 180 A 140 140 0 0 0 80 180"
                        fill="none"
                        stroke="#64748b"
                        strokeWidth="2"
                        strokeDasharray="4 3"
                      />
                      <circle cx="290" cy="180" r="3" fill="#f472b6" />
                      <text
                        x="295"
                        y="195"
                        fill="#f472b6"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        P
                      </text>

                      <line
                        x1="150"
                        y1="180"
                        x2="220"
                        y2="58.7"
                        stroke="#10b981"
                        strokeWidth="2.5"
                      />
                      <circle cx="220" cy="58.7" r="4" fill="#10b981" />
                      <text
                        x="228"
                        y="55"
                        fill="#10b981"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        Q (60°)
                      </text>

                      <path
                        d="M 210 50 A 30 30 0 0 1 230 70"
                        stroke="#f472b6"
                        strokeWidth="2"
                        fill="none"
                      />

                      {angleStepCount === 2 && (
                        <g>
                          <line
                            x1="150"
                            y1="180"
                            x2="80"
                            y2="58.7"
                            stroke="#a855f7"
                            strokeWidth="2.5"
                          />
                          <circle cx="80" cy="58.7" r="4" fill="#a855f7" />
                          <text
                            x="60"
                            y="50"
                            fill="#a855f7"
                            fontSize="11"
                            fontWeight="bold"
                          >
                            R (120°)
                          </text>
                          <path
                            d="M 70 50 A 30 30 0 0 1 90 70"
                            stroke="#a855f7"
                            strokeWidth="2"
                            fill="none"
                          />
                        </g>
                      )}
                    </svg>
                  </motion.div>
                )}

                {/* SLIDE 2: Angle Bisector Drag Lab */}
                {currentSlide === 2 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4"
                  >
                    <div>
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Drag to change Initial Angle:</span>
                        <span className="text-emerald-400 font-bold">
                          {interactiveAngle}° (Bisected ={' '}
                          {(interactiveAngle / 2).toFixed(1)}°)
                        </span>
                      </label>
                      <input
                        type="range"
                        min={20}
                        max={150}
                        step={1}
                        aria-label="Drag angle in degrees"
                        value={interactiveAngle}
                        onChange={(e) =>
                          setInteractiveAngle(parseInt(e.target.value))
                        }
                        className="w-full accent-emerald-500 mt-1 cursor-pointer"
                      />
                    </div>

                    <svg
                      viewBox="0 0 500 240"
                      className="w-full h-56 bg-slate-900/80 rounded-xl border border-slate-800"
                    >
                      {(() => {
                        const rad = (interactiveAngle * Math.PI) / 180;
                        const bisectRad = rad / 2;
                        const len = 140;
                        const ox = 120;
                        const oy = 190;
                        const arm2X = ox + len * Math.cos(rad);
                        const arm2Y = oy - len * Math.sin(rad);
                        const bisectX = ox + (len + 20) * Math.cos(bisectRad);
                        const bisectY = oy - (len + 20) * Math.sin(bisectRad);

                        return (
                          <g>
                            <circle cx={ox} cy={oy} r="4" fill="#38bdf8" />
                            <text
                              x={ox - 15}
                              y={oy + 5}
                              fill="#38bdf8"
                              fontSize="12"
                              fontWeight="bold"
                            >
                              O
                            </text>

                            <line
                              x1={ox}
                              y1={oy}
                              x2={ox + len}
                              y2={oy}
                              stroke="#38bdf8"
                              strokeWidth="3"
                            />
                            <text
                              x={ox + len + 8}
                              y={oy + 5}
                              fill="#38bdf8"
                              fontSize="11"
                              fontWeight="bold"
                            >
                              A
                            </text>

                            <line
                              x1={ox}
                              y1={oy}
                              x2={arm2X}
                              y2={arm2Y}
                              stroke="#38bdf8"
                              strokeWidth="3"
                            />
                            <text
                              x={arm2X + 5}
                              y={arm2Y - 5}
                              fill="#38bdf8"
                              fontSize="11"
                              fontWeight="bold"
                            >
                              B
                            </text>

                            <line
                              x1={ox}
                              y1={oy}
                              x2={bisectX}
                              y2={bisectY}
                              stroke="#10b981"
                              strokeWidth="2.5"
                              strokeDasharray="4 2"
                            />
                            <circle
                              cx={bisectX}
                              cy={bisectY}
                              r="3"
                              fill="#10b981"
                            />
                            <text
                              x={bisectX + 6}
                              y={bisectY - 2}
                              fill="#10b981"
                              fontSize="11"
                              fontWeight="bold"
                            >
                              Bisector ({(interactiveAngle / 2).toFixed(1)}°)
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  </motion.div>
                )}

                {/* SLIDE 3: Isoperimetric Paradox (Fixed P = 24) */}
                {currentSlide === 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4"
                  >
                    <div>
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>
                          Morph Rectangle Length (Fixed Perimeter P = 24 cm):
                        </span>
                        <span className="text-emerald-400 font-bold">
                          {rectLength} cm × {rectBreadth} cm
                        </span>
                      </label>
                      <input
                        type="range"
                        min={6}
                        max={11}
                        step={1}
                        aria-label="Adjust rectangle length with fixed perimeter"
                        value={rectLength}
                        onChange={(e) => setRectLength(parseInt(e.target.value))}
                        className="w-full accent-emerald-500 mt-1 cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-3 bg-slate-900 rounded-xl border border-slate-800"
                      >
                        <span className="text-xs text-slate-400">
                          Total Boundary (Perimeter)
                        </span>
                        <p className="text-lg font-black text-gold-400">
                          {rectPerimeter} cm
                        </p>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-3 bg-slate-900 rounded-xl border border-slate-800"
                      >
                        <span className="text-xs text-slate-400">
                          Enclosed Grass Area
                        </span>
                        <p className="text-lg font-black text-emerald-400">
                          {rectArea} sq cm{' '}
                          {rectLength === 6 ? '🌟 MAX (Square!)' : ''}
                        </p>
                      </motion.div>
                    </div>

                    <svg
                      viewBox="0 0 500 160"
                      className="w-full h-40 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-center"
                    >
                      {(() => {
                        const scale = 16;
                        const w = rectLength * scale;
                        const h = rectBreadth * scale;
                        const x = (500 - w) / 2;
                        const y = (160 - h) / 2;

                        return (
                          <g>
                            <rect
                              x={x}
                              y={y}
                              width={w}
                              height={h}
                              fill="rgba(16, 185, 129, 0.25)"
                              stroke="#10b981"
                              strokeWidth="2.5"
                              rx="4"
                            />
                            <text
                              x={x + w / 2}
                              y={y + h / 2 + 4}
                              textAnchor="middle"
                              fill="#ffffff"
                              fontSize="12"
                              fontWeight="bold"
                            >
                              Area = {rectArea} cm²
                            </text>
                            <text
                              x={x + w / 2}
                              y={y - 6}
                              textAnchor="middle"
                              fill="#38bdf8"
                              fontSize="11"
                            >
                              length = {rectLength} cm
                            </text>
                            <text
                              x={x + w + 10}
                              y={y + h / 2 + 4}
                              fill="#38bdf8"
                              fontSize="11"
                            >
                              breadth = {rectBreadth} cm
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  </motion.div>
                )}

                {/* SLIDE 4: Live Unit Converter & Hypothesis Engine */}
                {currentSlide === 4 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4"
                  >
                    <div className="flex flex-wrap gap-2">
                      {(['mass', 'capacity', 'money', 'time'] as const).map(
                        (type) => (
                          <motion.button
                            key={type}
                            aria-label={`Select unit category ${type}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setConverterType(type);
                              audioManager.play('tap');
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                              converterType === type
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {type}
                          </motion.button>
                        )
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      <div>
                        <label className="text-xs text-slate-400">
                          Input Value ({converterType}):
                        </label>
                        <input
                          type="number"
                          aria-label={`Input numerical value in ${converterType}`}
                          value={converterValue}
                          onChange={(e) =>
                            setConverterValue(
                              Math.max(0, parseInt(e.target.value) || 0)
                            )
                          }
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm mt-1"
                        />
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-3 bg-slate-900 rounded-xl border border-slate-800"
                      >
                        <span className="text-xs text-slate-400">
                          Converted ({convertedResult.factor}):
                        </span>
                        <p className="text-lg font-black text-emerald-400 font-mono mt-1">
                          {convertedResult.to}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Brilliant.org Observation Question Widget in Lab */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-2xl space-y-3 mt-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-emerald-300 uppercase flex items-center gap-1.5">
                      <span>👁️</span> What do you notice? (Observation Challenge {observationIndex + 1} of {OBSERVATION_QUESTIONS.length})
                    </h4>
                    <div className="flex gap-1">
                      {OBSERVATION_QUESTIONS.map((_, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => setObservationIndex(oIdx)}
                          className={`px-2 py-0.5 text-[10px] rounded font-bold ${
                            observationIndex === oIdx
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Obs {oIdx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-200 font-medium">
                    {OBSERVATION_QUESTIONS[observationIndex].question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {OBSERVATION_QUESTIONS[observationIndex].observableOptions.map((opt, i) => {
                      const isAnswered = observationAnswered[observationIndex];
                      const isCorrect = i === OBSERVATION_QUESTIONS[observationIndex].correctIndex;
                      const isChosen = observationSelected[observationIndex] === i;

                      return (
                        <motion.button
                          key={i}
                          aria-label={`Observation Option ${String.fromCharCode(65 + i)}`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          animate={
                            wrongShake && isAnswered && isChosen && !isCorrect
                              ? { x: [0, -10, 10, -10, 10, 0] }
                              : { x: 0 }
                          }
                          transition={{ duration: 0.4 }}
                          onClick={() => handleObservationAnswer(observationIndex, i)}
                          disabled={isAnswered}
                          className={`p-2.5 rounded-xl text-left text-xs font-medium transition-all flex items-center justify-between ${
                            isAnswered && isCorrect
                              ? 'bg-emerald-900/80 border border-emerald-500 text-emerald-100'
                              : isAnswered && isChosen && !isCorrect
                              ? 'bg-rose-950/70 border border-rose-500 text-rose-200'
                              : isAnswered
                              ? 'bg-slate-900/50 border border-slate-800 text-slate-500 opacity-60'
                              : 'bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200'
                          }`}
                        >
                          <span>{opt}</span>
                          {isAnswered && isCorrect && <span className="text-emerald-400 font-bold ml-1">✓</span>}
                          {isAnswered && isChosen && !isCorrect && <span className="text-rose-400 font-bold ml-1">✗</span>}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between pt-2"
            >
              <motion.button
                aria-label="Go to previous lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => Math.max(0, s - 1));
                  audioManager.play('whoosh');
                }}
                disabled={currentSlide === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl disabled:opacity-40"
              >
                ← Previous Lab
              </motion.button>
              <span className="text-xs text-slate-400 font-bold">
                {currentSlide + 1} / {EXPLORATION_STEPS.length}
              </span>
              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  aria-label="Go to next lab"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide((s) => s + 1);
                    audioManager.play('whoosh');
                  }}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  aria-label="Enter sandbox mode"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-lg"
                >
                  Enter Sandbox →
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 3. FREE PLAY SANDBOX MODE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ y: -5 }}
              animate={{ y: 0 }}
              className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between"
            >
              <div>
                <h3 className="text-base font-bold text-emerald-300">
                  Geometric Sandbox: Ungraded Free Exploration
                </h3>
                <p className="text-xs text-slate-400">
                  Play freely with all geometric instruments, sliders, and shape morphs.
                </p>
              </div>
              <motion.button
                aria-label="Start graded challenge section"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg"
              >
                Start Graded Challenges! →
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2"
              >
                <span className="text-xs font-bold text-slate-400">
                  Live Compass Radar Animation
                </span>
                <canvas
                  ref={canvasRef}
                  width={380}
                  height={160}
                  className="w-full h-40 bg-slate-950 rounded-xl"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
              >
                <span className="text-xs font-bold text-slate-400">
                  Classroom Travel Survey Engine (Test Hypothesis)
                </span>
                <div className="flex gap-2">
                  <motion.button
                    aria-label="Add vote for Walking"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSurveyWalkVotes((v) => v + 1);
                      audioManager.play('count');
                    }}
                    className="flex-1 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold"
                  >
                    🚶 Walk ({surveyWalkVotes})
                  </motion.button>
                  <motion.button
                    aria-label="Add vote for Bus"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSurveyBusVotes((v) => v + 1);
                      audioManager.play('count');
                    }}
                    className="flex-1 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold"
                  >
                    🚌 Bus ({surveyBusVotes})
                  </motion.button>
                  <motion.button
                    aria-label="Add vote for Cycling"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSurveyCycleVotes((v) => v + 1);
                      audioManager.play('count');
                    }}
                    className="flex-1 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold"
                  >
                    🚲 Cycle ({surveyCycleVotes})
                  </motion.button>
                </div>
                <p className="text-xs text-emerald-400 font-medium">
                  Conclusion:{' '}
                  {surveyWalkVotes > surveyBusVotes
                    ? '✓ Walking has the highest count! Data supports walking hypothesis.'
                    : '��� Bus has caught up!'}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 4. STRUCTURED CHALLENGE PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Top Challenge Status & Adaptive Badge */}
            <motion.div
              initial={{ y: -5 }}
              animate={{ y: 0 }}
              className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 border border-slate-800 rounded-2xl"
            >
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>🎯</span> {challenge.question}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-600'
                      : difficulty === 'standard'
                      ? 'bg-gold-900/60 text-gold-300 border border-gold-600'
                      : 'bg-rose-900/60 text-rose-300 border border-rose-600'
                  }`}
                >
                  {difficulty}
                </motion.span>
                <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-[10px] font-bold text-slate-300 uppercase">
                  {challenge.competencyLevel}
                </span>
              </div>
            </motion.div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-gold-500"
                animate={{
                  width: `${
                    ((currentChallenge + 1) / filteredChallenges.length) * 100
                  }%`,
                }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Type 1: Multiple Choice */}
            {(challenge.type === 'classify' ||
              challenge.type === 'distinguish' ||
              challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      animate={
                        wrongShake
                          ? { x: [0, -10, 10, -10, 10, 0] }
                          : { x: 0 }
                      }
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                        wrongFlash
                          ? 'bg-rose-900/60 border-2 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-100'
                          : 'bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 text-slate-200'
                      }`}
                    >
                      <span>
                        <span className="font-bold mr-2 text-slate-400">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {opt}
                      </span>
                      {showExplanation &&
                        (i === challenge.correctIndex ? (
                          <span className="text-emerald-400 font-bold ml-2">✓</span>
                        ) : (
                          <span className="text-rose-400 font-bold ml-2">✗</span>
                        ))}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Type 2: Drag Label Diagram */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-4"
              >
                <div className="flex flex-wrap gap-2">
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
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-white text-xs font-bold cursor-grab"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map((targetId) => (
                    <div
                      key={targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-4 bg-slate-950 border-2 border-dashed border-slate-700 rounded-xl text-center min-h-[80px] flex flex-col items-center justify-center"
                    >
                      <span className="text-[10px] text-slate-400 uppercase font-bold">
                        {targetId.replace('target_', '').replace('circ_', '')}
                      </span>
                      <span className="text-xs font-bold text-emerald-400 mt-1">
                        {droppedLabels[targetId] || 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify dropped label mappings"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={
                    wrongShake
                      ? { x: [0, -10, 10, -10, 10, 0] }
                      : { x: 0 }
                  }
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl"
                >
                  Verify Dropped Labels
                </motion.button>
              </motion.div>
            )}

            {/* Type 3: Drag Sort Chronological Ordering */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3"
              >
                <span className="text-xs text-slate-400 font-semibold">
                  Drag and drop items to reorder steps:
                </span>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, idx) => (
                  <motion.div
                    key={idx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Step ${idx + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(idx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, idx);
                    }}
                    whileHover={{ scale: 1.01, x: 2 }}
                    className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-slate-200 text-xs font-medium cursor-grab flex items-center gap-2"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-900 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    {item}
                  </motion.div>
                ))}
                <motion.button
                  aria-label="Submit chronological order verification"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={
                    wrongShake
                      ? { x: [0, -10, 10, -10, 10, 0] }
                      : { x: 0 }
                  }
                  transition={{ duration: 0.4 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length > 0
                        ? sortArrangement
                        : challenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  className="px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl"
                >
                  Check Chronological Order
                </motion.button>
              </motion.div>
            )}

            {/* Type 4: Numeric Input */}
            {challenge.type === 'numeric' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-wrap items-center gap-3"
              >
                <input
                  type="number"
                  aria-label="Input numerical answer"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numerical answer"
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-emerald-500 outline-none"
                />
                <span className="text-sm font-bold text-slate-400">
                  {challenge.unit}
                </span>
                <motion.button
                  aria-label="Submit numerical answer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={
                    wrongShake
                      ? { x: [0, -10, 10, -10, 10, 0] }
                      : { x: 0 }
                  }
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(numericInput)}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl"
                >
                  Submit Answer
                </motion.button>
              </motion.div>
            )}

            {/* Type 5: Construct Puzzle Assembly */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-4"
              >
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add component ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setConstructParts((prev) => [...prev, part])
                      }
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400 text-xs font-bold rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-emerald-950 border border-emerald-600 text-emerald-200 text-xs font-bold rounded-lg flex items-center gap-2"
                    >
                      {p}
                      <motion.button
                        aria-label={`Remove part ${p}`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() =>
                          setConstructParts((prev) =>
                            prev.filter((_, idx) => idx !== i)
                          )
                        }
                        className="text-rose-400 hover:text-rose-300 font-black ml-1"
                      >
                        ×
                      </motion.button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">
                      Click available components above to assemble the proof chain.
                    </span>
                  )}
                </div>

                <motion.button
                  aria-label="Validate construction sequence"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={
                    wrongShake
                      ? { x: [0, -10, 10, -10, 10, 0] }
                      : { x: 0 }
                  }
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl"
                >
                  Validate Construction Sequence
                </motion.button>
              </motion.div>
            )}

            {/* Explanation Card */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-slate-900 border border-emerald-800/80 rounded-2xl space-y-3"
              >
                <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <span>📖</span> Step-by-Step Mathematical Explanation:
                </h4>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs text-slate-300 leading-relaxed font-medium"
                      >
                        <strong className="text-emerald-400 mr-1.5">
                          Step {i + 1}:
                        </strong>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps <
                challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0).length -
                  1 ? (
                  <motion.button
                    aria-label="Show next step of explanation"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold rounded-xl"
                  >
                    Show Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Advance to next challenge or simulation completion"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg mt-2"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length
                      ? 'Complete Simulation →'
                      : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 5. COMPLETION & MASTERY SUMMARY PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              className="p-6 bg-gradient-to-br from-emerald-950 to-slate-900 border border-emerald-700/80 rounded-3xl text-center space-y-3"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-5xl inline-block"
              >
                🏆
              </motion.span>
              <h2 className="text-2xl font-black text-white">
                Simulation Completed!
              </h2>
              <p className="text-sm text-emerald-300 font-medium">
                You scored {Math.max(0, 100 - errors * 5)}% • Mastery Level:{' '}
                <strong className="uppercase font-black text-white">
                  {masteryLevel}
                </strong>
              </p>
            </motion.div>

            {/* Motivational Feedback Banner */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-slate-900 border border-slate-800 rounded-2xl"
            >
              <h3 className="text-xs font-bold text-slate-400 uppercase mb-1">
                Personalized Evaluation
              </h3>
              <p className="text-sm text-slate-200">
                {errors === 0
                  ? 'PERFECT SCORE! 🌟 Flawless Mastery! You handled compass settings, angle derivations, perimeter-area relations, and hypothesis tests with extreme precision.'
                  : errors <= 3
                  ? 'Great work! 👍 Strong Performance! You have a solid grasp of geometric constructions. Review the reflection notes below.'
                  : errors <= 7
                  ? 'Good effort! 🌱 Solid progress. Review the specific misconceptions identified below to solidify your understanding.'
                  : 'Do not give up — You WILL get this! Every master architect was once an apprentice. Practice makes progress!'}
              </p>
            </motion.div>

            {/* Misconception Gaps Profile */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-5 bg-rose-950/40 border border-rose-800/80 rounded-2xl space-y-3"
              >
                <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                  <span>⚠️</span> Your Targeted Review Profile:
                </h3>
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1"
                    >
                      <p className="text-rose-400 font-bold">
                        ✗ {m.misconception}
                      </p>
                      <p className="text-emerald-300">✓ {m.correction}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Spaced Repetition Schedule */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between"
            >
              <span className="text-xs text-slate-400 font-medium">
                📅 Spaced Review Scheduled in:{' '}
                <strong className="text-emerald-400">
                  {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
                </strong>
              </span>
            </motion.div>

            {/* Real-World Activity Card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-5 bg-gold-950/40 border border-gold-800/80 rounded-2xl space-y-3"
            >
              <h3 className="text-base font-bold text-gold-300">
                🛠️ {REAL_WORLD_ACTIVITY.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {REAL_WORLD_ACTIVITY.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300"
                  >
                    <strong className="text-emerald-400 mr-1.5">{i + 1}.</strong>
                    {st}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── MODAL FEEDBACK COMPONENTS ─── */}
      {showHint && (
        <HintBubble
          message={currentHint}
          onComplete={() => setShowHint(false)}
        />
      )}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && (
        <SuccessBanner
          message="Geometric Construction Verified!"
          onComplete={() => setShowSuccess(false)}
        />
      )}
      {showSparkle && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => setShowSparkle(false)}
        />
      )}
    </motion.div>
  );
}

export default C6_MathematicsConstructionsDrawingLineSim;
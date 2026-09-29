'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERALS (MANDATORY VERIFICATION) ─────────────────────────
const NODE_C6_MATH_051 = 'c6_math_051'; // Line, line segment, ray
const NODE_C6_MATH_052 = 'c6_math_052'; // Open and closed figures
const NODE_C6_MATH_053 = 'c6_math_053'; // Interior and exterior of closed figures
const NODE_C6_MATH_054 = 'c6_math_054'; // Curvilinear and linear boundaries
const NODE_C6_MATH_055 = 'c6_math_055'; // Angle - Vertex, arm, interior and exterior
const NODE_C6_MATH_056 = 'c6_math_056'; // Triangle - vertices, sides, angles, altitude and median
const NODE_C6_MATH_057 = 'c6_math_057'; // Quadrilateral - Sides, vertices, angles, diagonals
const NODE_C6_MATH_058 = 'c6_math_058'; // Circle - Centre, radius, diameter, arc, sector, chord, segment
const NODE_C6_MATH_059 = 'c6_math_059'; // Measure of line segment
const NODE_C6_MATH_060 = 'c6_math_060'; // Measure of angles

const ALL_NODE_IDS = [
  NODE_C6_MATH_051,
  NODE_C6_MATH_052,
  NODE_C6_MATH_053,
  NODE_C6_MATH_054,
  NODE_C6_MATH_055,
  NODE_C6_MATH_056,
  NODE_C6_MATH_057,
  NODE_C6_MATH_058,
  NODE_C6_MATH_059,
  NODE_C6_MATH_060,
];

// ─── NARRATIVE SCENARIO ───────────────────────────────────────────────────────
const SCENARIO = {
  title: 'The Great Architectural Restoration: Master of Geometrical Forms',
  intro: 'You are the Chief Geometric Architect restoring an ancient astronomical observatory and monument in Jaipur. Blueprint symbols—rays of sunlight, circular dials, structural triangles, and boundary arches—need precise geometrical validation before construction begins.',
  context: 'From distinguishing boundless lines and rays from measurable segments, to measuring angular azimuths and partitioning circles, every structure depends on your rigorous geometric analysis.',
};

// ─── DISCOVERY QUESTION ───────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'An observatory surveyor shoots a laser beam from a fixed sensor tower out into deep space. Which geometric entity accurately models this laser beam path?',
  options: [
    'A Line Segment (it ends when we stop looking)',
    'A Ray (it has 1 fixed endpoint and extends infinitely in 1 direction)',
    'A Line (it extends infinitely in both forward and backward directions)',
    'An Open Angle (it covers 2 dimensions)',
  ],
  correctIndex: 1,
  hintAfter: 'A ray starts at a definite source (the laser bulb) and extends endlessly forward in one direction.',
};

// ─── CHALLENGE INTERFACE ─────────────────────────────────────────────────────
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

// ─── 24 PROGRESSIVE CHALLENGES (ALL 10 NODES COVERED) ─────────────────────────
const CHALLENGES: Challenge[] = [
  // Tier 1: Foundation (8 challenges)
  {
    id: 'ch_01_line_ends',
    nodeId: NODE_C6_MATH_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How many endpoints does a line segment have compared to a ray and a line?',
    options: [
      'Line segment: 2, Ray: 1, Line: 0',
      'Line segment: 1, Ray: 2, Line: 0',
      'Line segment: 0, Ray: 1, Line: 2',
      'Line segment: 2, Ray: 0, Line: 1',
    ],
    correctIndex: 0,
    explanation: 'A line segment has 2 fixed endpoints and a measurable length. A ray has 1 starting endpoint and extends endlessly in one direction. A line has 0 endpoints and extends endlessly both ways.',
    hints: [
      'Think of a real stick with two ends vs a laser beam vs an endless railway track.',
      'A segment is bounded at both ends (2 endpoints).',
      'Ray has one start (1 endpoint); Line has none (0 endpoints).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_open_closed',
    nodeId: NODE_C6_MATH_052,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is the letter "C" classified as an open figure while the letter "O" is a closed figure?',
    options: [
      'Because "O" is perfectly round and "C" is oval',
      'Because "O" returns to its starting point enclosing a region without gaps, while "C" leaves a gap',
      'Because "C" is made of straight lines and "O" is made of curves',
      'Because "O" has corners and "C" does not',
    ],
    correctIndex: 1,
    explanation: 'The test for a closed figure is whether its boundary completely encloses a region by returning to the starting point with no gap.',
    hints: [
      'Does roundness matter, or is it whether the boundary seals off a region?',
      'If you place a drop of water inside "C", it can leak out through the open gap.',
      'A closed figure forms a continuous loop without any break or gap.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_boundary_regions',
    nodeId: NODE_C6_MATH_053,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A point lies exactly on the drawn circumference of a circular observatory dome. In which region does the point lie?',
    options: [
      'In the Interior',
      'In the Exterior',
      'On the Boundary',
      'In both the Interior and Exterior',
    ],
    correctIndex: 2,
    explanation: 'Every closed figure splits the plane into 3 disjoint sets: the interior (strictly inside), the exterior (strictly outside), and the boundary (the edge curve/segments itself).',
    hints: [
      'Is the perimeter/fence considered inside the field or the boundary?',
      'A point on the edge is neither strictly interior nor exterior.',
      'It belongs to the boundary.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04_curvilinear_vs_linear',
    nodeId: NODE_C6_MATH_054,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following figures has a combined (partly linear, partly curvilinear) boundary?',
    options: [
      'A circular rupee coin',
      'A rectangular chalkboard',
      'A standard geometry protractor (semicircular arc with a straight baseline)',
      'A triangular road sign',
    ],
    correctIndex: 2,
    explanation: 'A protractor consists of a curved semicircular edge (curvilinear) and a straight flat edge (linear), forming a combined boundary.',
    hints: [
      'Look for an object that has both a curve and a straight edge on its perimeter.',
      'A coin is all curved; a rectangle is all straight.',
      'A protractor has a straight baseline and a curved top arc.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05_angle_naming_rule',
    nodeId: NODE_C6_MATH_055,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Rays BA and BC meet at point B. What is the strictly correct three-letter name for this angle?',
    options: [
      'Angle BAC',
      'Angle ABC (or Angle CBA)',
      'Angle ACB',
      'Angle BCA',
    ],
    correctIndex: 1,
    explanation: 'In 3-point angle notation, the vertex (the common endpoint where arms meet) MUST ALWAYS be the middle letter. Here B is the vertex, so angle ABC or angle CBA is correct.',
    hints: [
      'Which point is the common corner where the two rays start?',
      'Point B is the shared vertex.',
      'The vertex letter must be in the exact middle.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_06_triangle_elements',
    nodeId: NODE_C6_MATH_056,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each geometric label to its correct position on the triangle diagram.',
    dragItems: [
      { label: 'Vertex A', targetId: 'tgt_tri_vertex' },
      { label: 'Altitude (Perpendicular)', targetId: 'tgt_tri_altitude' },
      { label: 'Median (To Midpoint)', targetId: 'tgt_tri_median' },
      { label: 'Base Side BC', targetId: 'tgt_tri_base' },
    ],
    correctMapping: {
      tgt_tri_vertex: 'Vertex A',
      tgt_tri_altitude: 'Altitude (Perpendicular)',
      tgt_tri_median: 'Median (To Midpoint)',
      tgt_tri_base: 'Base Side BC',
    },
    explanation: 'The top corner is Vertex A; the segment dropping at 90° to the base is the altitude; the segment connecting Vertex A to the midpoint of BC is the median; the bottom segment is Base BC.',
    hints: [
      'Vertex A is the top corner.',
      'The line making a 90° square symbol is the perpendicular altitude.',
      'The line bisecting the base into equal halves is the median.',
    ],
  },
  {
    id: 'ch_07_circle_diameter_radius',
    nodeId: NODE_C6_MATH_058,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A historic circular sundial dial plate has a measured radius of 8.5 cm. What is its diameter in centimetres?',
    correctAnswer: 17,
    tolerance: 0.1,
    unit: 'cm',
    explanation: 'The diameter of a circle is twice its radius: d = 2 × r = 2 × 8.5 cm = 17.0 cm.',
    hints: [
      'Recall the relationship d = 2 × r.',
      'Multiply 8.5 by 2.',
      '8.5 + 8.5 = 17 cm.',
    ],
  },
  {
    id: 'ch_08_ruler_reading',
    nodeId: NODE_C6_MATH_059,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A blueprint line segment starts at the 0 cm mark of a ruler and its other endpoint sits 4 millimetre ticks past the 6 cm mark. What is its length in cm?',
    correctAnswer: 6.4,
    tolerance: 0.05,
    unit: 'cm',
    explanation: 'Each millimetre tick is 0.1 cm. 6 cm plus 4 mm = 6 cm + 0.4 cm = 6.4 cm.',
    hints: [
      'Remember that 1 cm = 10 mm.',
      '4 mm = 0.4 cm.',
      '6 + 0.4 = 6.4 cm.',
    ],
  },

  // Tier 2: Standard (8 challenges)
  {
    id: 'ch_09_ray_reversal',
    nodeId: NODE_C6_MATH_051,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why are ray PQ and ray QP considered two completely different rays even though they pass through the exact same two points?',
    options: [
      'Because they have different lengths in centimetres',
      'Because ray PQ starts at P and extends towards Q, whereas ray QP starts at Q and extends towards P (different endpoints & opposite directions)',
      'Because one is curved and the other is linear',
      'They are actually identical rays with different names',
    ],
    correctIndex: 1,
    explanation: 'In ray notation, the first letter is strictly the starting origin (endpoint). Ray PQ originates at P and shoots through Q to infinity, while Ray QP originates at Q and shoots in the opposite direction through P.',
    hints: [
      'Which point is the fixed starting point for each ray?',
      'The first letter in ray notation is always the origin endpoint.',
      'Different starting points and opposite infinite directions make them distinct rays.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_10_interior_exterior_check',
    nodeId: NODE_C6_MATH_053,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An architect plans a fountain inside a courtyard shaped like a convex polygon. If a surveyor can walk from the fountain to the outer street in a straight line without crossing any walls or perimeter segments, what does this prove?',
    options: [
      'The courtyard is a closed figure',
      'The courtyard boundary has a gap, proving it is an open figure',
      'The fountain is located on the boundary',
      'The courtyard is curvilinear',
    ],
    correctIndex: 1,
    explanation: 'In a closed figure, it is impossible to pass from the interior to the exterior without crossing the boundary. If one can leave without crossing an edge, the figure is open.',
    hints: [
      'In a closed room with sealed walls, can you exit without passing through a wall/door?',
      'Being able to exit freely without crossing a boundary indicates a gap.',
      'A figure with a gap is an open figure.',
    ],
  },
  {
    id: 'ch_11_altitude_median_distinction',
    nodeId: NODE_C6_MATH_056,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a general scalene triangle ABC, segment AD is drawn from vertex A perpendicular to BC (at 90°), and segment AE is drawn from A to the exact midpoint of BC (where BE = EC). Which statement is true?',
    options: [
      'AD is both the altitude and median because both start at vertex A',
      'AD is the altitude and AE is the median, and in a general triangle they are distinct segments',
      'AE is the altitude because it balances the side equally',
      'AD is the median because it drops straight down',
    ],
    correctIndex: 1,
    explanation: 'Altitude is defined by perpendicularity (90° angle with base). Median is defined by connecting a vertex to the midpoint of the opposite side. In general triangles, they land at different points on the base.',
    hints: [
      'Which one requires a 90° right angle? That is the altitude.',
      'Which one requires dividing the opposite side into two equal halves? That is the median.',
      'Since perpendicularity and midpoints are independent, AD is the altitude and AE is the median.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_12_quad_diagonals_count',
    nodeId: NODE_C6_MATH_057,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A convex quadrilateral ABCD has 4 vertices. How many total line segments can be drawn between its 4 vertices, and how many of those are diagonals?',
    options: [
      '4 total segments, all 4 are diagonals',
      '6 total segments: 4 are boundary sides and 2 are diagonals (AC and BD)',
      '8 total segments: 4 sides and 4 diagonals',
      '5 total segments: 4 sides and 1 diagonal',
    ],
    correctIndex: 1,
    explanation: '4 vertices provide 6 total pairs of points (4 × 3 / 2 = 6). 4 pairs form the boundary sides (AB, BC, CD, DA), leaving exactly 2 pairs of non-adjacent opposite vertices to form the 2 diagonals (AC, BD).',
    hints: [
      'How many pairs of opposite corners does a 4-sided shape have?',
      'Opposite pairs are (A, C) and (B, D).',
      'That gives exactly 2 diagonals out of 6 total joining segments.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_13_adjacent_vs_opposite_quad',
    nodeId: NODE_C6_MATH_057,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Order the steps to verify whether two sides in quadrilateral PQRS are adjacent or opposite.',
    sortItems: [
      'Identify the two endpoints of the first side and the two endpoints of the second side',
      'Check if the two sides share any letter (vertex) in common',
      'If they share exactly one common vertex (e.g., Q in PQ and QR), classify them as Adjacent Sides',
      'If they share zero common vertices (e.g., PQ and RS), classify them as Opposite Sides',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Adjacent sides share a common vertex. Opposite sides do not share any common endpoint.',
    hints: [
      'First find the endpoints of both sides.',
      'Check if there is a shared letter.',
      'Shared vertex = adjacent; No shared vertex = opposite.',
    ],
  },
  {
    id: 'ch_14_sector_vs_segment',
    nodeId: NODE_C6_MATH_058,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How do you distinguish a sector of a circle from a segment of a circle?',
    options: [
      'A sector is bounded by 2 radii and an arc (has its vertex at the centre, like a pizza slice); a segment is bounded by a chord and an arc',
      'A sector is made of straight lines only; a segment is purely curved',
      'A segment always passes through the centre; a sector never touches the centre',
      'A sector is the entire boundary; a segment is the interior area',
    ],
    correctIndex: 0,
    explanation: 'A sector is enclosed by two radii and an arc (vertex at centre). A segment is enclosed by a chord (straight cut) and an arc, generally not including the centre point.',
    hints: [
      'Think of a slice of pizza cut from the center (radii) vs a crust slice cut straight across (chord).',
      'Sector has straight sides that are radii meeting at the centre.',
      'Segment has a straight chord joining two points on the rim.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_15_protractor_scale_reading',
    nodeId: NODE_C6_MATH_060,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A student measures an angle opening to the right. The base arm lies along the right baseline where the INNER scale reads 0°. The other arm crosses the protractor at 65° on the inner scale and 115° on the outer scale. What is the true measure of the angle?',
    options: [
      '115° because outer scale is always primary',
      '65° because the aligned arm starts at 0° on the inner scale',
      '180° because you add both scales',
      '50° (the difference between 115° and 65°)',
    ],
    correctIndex: 1,
    explanation: 'Always read the scale that begins at 0° on the baseline arm. Since the right arm aligns with 0° on the inner scale, the inner scale reading of 65° (acute angle) is the correct measure.',
    hints: [
      'Which scale has 0° sitting on the aligned ray?',
      'The inner scale begins at 0° on the right arm.',
      'Follow that same inner scale to read 65°.',
    ],
    misconceptionIndex: 8,
  },
  {
    id: 'ch_16_chord_centre_distance',
    nodeId: NODE_C6_MATH_058,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A circular garden has a diameter of 24 metres. A gardener stands at point G, which is 10 metres from the center point O. Is point G strictly inside the garden? If radius = R, enter the numerical radius R in metres.',
    correctAnswer: 12,
    tolerance: 0.1,
    unit: 'metres',
    explanation: 'Radius R = Diameter / 2 = 24 / 2 = 12 metres. Since the gardener is 10 m from center (< 12 m), point G is strictly in the interior.',
    hints: [
      'Radius is half of diameter: d / 2.',
      '24 divided by 2 is 12.',
      '10 m is less than 12 m, confirming interior position.',
    ],
  },

  // Tier 3: Advanced (8 challenges)
  {
    id: 'ch_17_ray_notation_eval',
    nodeId: NODE_C6_MATH_051,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate this statement: "Because a line segment AB and a line AB both pass through points A and B, the notation AB with no arrow and AB with a double arrow represent the same geometrical object of infinite length." Is this valid?',
    options: [
      'Valid, because letters determine length in coordinate geometry',
      'Invalid: Segment AB has a finite, measurable length bounded by endpoints A and B, whereas line AB extends endlessly in both directions with no endpoints',
      'Valid, because rays and segments are interchangeable in ICSE geometry',
      'Invalid only if point A is at the origin (0,0)',
    ],
    correctIndex: 1,
    explanation: 'Line segment AB has 2 endpoints and finite measurable length. Line AB has 0 endpoints and infinite length. The notation symbol specifies the physical nature of the geometric entity.',
    hints: [
      'Can you measure a line with a ruler? No, but you can measure a line segment.',
      'Symbols carry fundamental physical meaning: arrow heads indicate infinite extension.',
      'A segment is finite; a line is infinite.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_18_circle_parts_drag_label',
    nodeId: NODE_C6_MATH_058,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Drag the correct technical terms to label the complex circle anatomy diagram.',
    dragItems: [
      { label: 'Diameter (Longest Chord)', targetId: 'tgt_circ_diameter' },
      { label: 'Sector (Slice from Centre)', targetId: 'tgt_circ_sector' },
      { label: 'Segment (Chord to Arc)', targetId: 'tgt_circ_segment' },
      { label: 'Arc (Curved Rim Portion)', targetId: 'tgt_circ_arc' },
    ],
    correctMapping: {
      tgt_circ_diameter: 'Diameter (Longest Chord)',
      tgt_circ_sector: 'Sector (Slice from Centre)',
      tgt_circ_segment: 'Segment (Chord to Arc)',
      tgt_circ_arc: 'Arc (Curved Rim Portion)',
    },
    explanation: 'Diameter passes through the centre; Sector is bounded by 2 radii meeting at centre; Segment is bounded by a chord and arc; Arc is a curve along the circumference.',
    hints: [
      'The line passing completely across through the centre is the diameter.',
      'The pie-slice region touching the centre is the sector.',
      'The shaded cap bounded by a non-diameter chord is the segment.',
    ],
  },
  {
    id: 'ch_19_angle_arm_length_fallacy',
    nodeId: NODE_C6_MATH_060,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Student Vikram draws a 30° angle with 12 cm long ray arms. Student Ananya draws a 75° angle with 3 cm short ray arms. Vikram argues his angle is larger because his drawn lines are 4 times longer. Evaluate his argument.',
    options: [
      'Vikram is correct because total drawn area is larger',
      'Vikram is incorrect: Angle measure depends solely on the amount of rotation between the two rays (75° > 30°), completely independent of how long the arms are drawn',
      'Both angles are equal because rays are infinite',
      'Ananya is incorrect because 3 cm is too short to measure with a standard protractor',
    ],
    correctIndex: 1,
    explanation: 'Angle measure is purely the magnitude of rotational divergence in degrees (360° per full turn). Rays are infinite in nature; drawing longer or shorter segments on paper does not alter the degree measure.',
    hints: [
      'What does a degree measure? Millimetres of length or rotation?',
      'An angle measures rotation, not length of drawing.',
      '75° represents a wider opening/turn than 30°, regardless of drawn arm length.',
    ],
    misconceptionIndex: 9,
  },
  {
    id: 'ch_20_quad_opposite_sides_check',
    nodeId: NODE_C6_MATH_057,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In a quadrilateral named TUVW, which pair represents opposite sides, and which pair represents adjacent sides?',
    options: [
      'Opposite: (TU and UV); Adjacent: (TU and VW)',
      'Opposite: (TU and VW); Adjacent: (TU and UV, sharing vertex U)',
      'Opposite: (TU and WT); Adjacent: (UV and VW)',
      'Opposite: (TV and UW); Adjacent: (TU and VW)',
    ],
    correctIndex: 1,
    explanation: 'Going in cyclic order around T-U-V-W: TU and UV share vertex U (adjacent). TU and VW share no common vertex (opposite). TV and UW are diagonals, not sides.',
    hints: [
      'Write the vertices in cyclic order: T -> U -> V -> W -> T.',
      'TU and UV share U, so they are adjacent.',
      'TU and VW do not share any vertex, so they are opposite.',
    ],
  },
  {
    id: 'ch_21_compass_segment_compare',
    nodeId: NODE_C6_MATH_059,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'To compare line segments AB and CD drawn far apart on a drafting sheet without parallax ruler error, an engineer sets compass needle on A and pencil on B, then places needle on C. The pencil tip lands past point D. What is the deduction?',
    options: [
      'Segment CD is longer than segment AB',
      'Segment AB is strictly longer than segment CD (length AB > length CD)',
      'Both segments are exactly equal',
      'The compass must be adjusted to match CD first',
    ],
    correctIndex: 1,
    explanation: 'The compass preserved the exact length of AB. When placed at C, the pencil reached beyond D, proving that the length of AB is greater than CD (AB > CD).',
    hints: [
      'The compass carries the span of AB.',
      'If span AB overshoots CD, then AB is longer.',
      'Therefore AB > CD.',
    ],
  },
  {
    id: 'ch_22_construct_triangle_elements',
    nodeId: NODE_C6_MATH_056,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the correct mathematical definition of an Altitude of a triangle.',
    availableParts: ['perpendicular line segment', 'from a vertex', 'to the opposite side', 'to the midpoint', 'sharing an arm', 'bisecting the angle'],
    targetState: 'perpendicular line segment from a vertex to the opposite side',
    validationHint: 'Select parts that describe dropping a 90° segment from a vertex to its opposite side.',
    explanation: 'An altitude is defined as the perpendicular line segment drawn from a vertex to the opposite side (or line containing the opposite side).',
    hints: [
      'Start with the type of line: perpendicular line segment...',
      'Next where it originates: from a vertex...',
      'Where it terminates at 90°: to the opposite side.',
    ],
  },
  {
    id: 'ch_23_clock_angle_calculation',
    nodeId: NODE_C6_MATH_060,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A historic observatory tower clock shows exactly 4:00 o’clock. What is the measure of the smaller angle between the hour hand and the minute hand in degrees?',
    correctAnswer: 120,
    tolerance: 1,
    unit: 'degrees',
    explanation: 'A clock face has 360° divided into 12 hours = 30° per hour mark. At 4:00, the minute hand is at 12 and hour hand is at 4, spanning 4 hour divisions = 4 × 30° = 120° (obtuse angle).',
    hints: [
      'There are 12 hour numbers on a 360° circle. How many degrees per hour step?',
      '360° / 12 = 30° per hour.',
      'From 12 to 4 is 4 steps: 4 × 30° = 120°.',
    ],
  },
  {
    id: 'ch_24_curvilinear_polygon_synthesis',
    nodeId: NODE_C6_MATH_054,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Can a closed geometric figure have a linear boundary if one of its sides is an arc of a circle?',
    options: [
      'Yes, if the arc is very small and nearly straight',
      'No, because having any curved segment makes the boundary a "Combined Boundary" rather than a purely linear boundary',
      'Yes, as long as it has at least 3 vertices',
      'No, it becomes an open figure immediately',
    ],
    correctIndex: 1,
    explanation: 'A linear boundary consists strictly and entirely of straight line segments. Introducing even a single curved arc makes the boundary a combined (partly linear, partly curvilinear) boundary.',
    hints: [
      'A purely linear boundary must have 100% straight line segments.',
      'If any part is an arc, it has both straight and curved elements.',
      'This classifies it as a combined boundary.',
    ],
  },
];

// ─── EXPLORATION STEPS ────────────────────────────────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Line, Ray & Segment Dynamics',
    instruction: 'Toggle between Line, Ray, and Line Segment. Drag endpoints A and B to observe how endpoints control infinite extension vs definite measure.',
    interactionType: 'toggle-and-drag-line',
    nodeId: NODE_C6_MATH_051,
  },
  {
    title: 'Lab 2: The Enclosed Boundary & Interior Test',
    instruction: 'Drag test point P around the figure. Toggle between Open and Closed gates to observe how boundary integrity creates an Interior region.',
    interactionType: 'point-inside-outside',
    nodeId: NODE_C6_MATH_053,
  },
  {
    title: 'Lab 3: Triangle Anatomy — Altitude vs Median',
    instruction: 'Drag Vertex A of the triangle. Observe how the Altitude (perpendicular foot at 90°) dynamically separates from the Median (midpoint balancer).',
    interactionType: 'drag-triangle-altitude-median',
    nodeId: NODE_C6_MATH_056,
  },
  {
    title: 'Lab 4: Circle Partitioning & Sector Slicing',
    instruction: 'Adjust the Chord position and Sector angle sliders. Watch how radii carve Sectors (pizza slices) while chords create Segments (curved caps).',
    interactionType: 'circle-chord-sector-interactive',
    nodeId: NODE_C6_MATH_058,
  },
  {
    title: 'Lab 5: Interactive Protractor & Angular Rotation',
    instruction: 'Rotate the angle arm from 0° to 180°. Observe how the inner and outer protractor scales measure rotation in degrees independently of arm length.',
    interactionType: 'protractor-dial',
    nodeId: NODE_C6_MATH_060,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ───────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you drag Vertex A of a triangle far to the right making it strongly obtuse, what will happen to the Altitude dropped from A to base BC?',
    options: [
      'It will remain identical to the median',
      'The altitude will tilt and meet the extension of base BC outside the triangle',
      'The altitude will disappear',
      'The median will become perpendicular',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag Vertex A to the far right in Lab 3 and observe the foot of the altitude meet the extended baseline.',
    nodeId: NODE_C6_MATH_056,
  },
  {
    question: 'Predict: If you increase the chord distance from the center of a circle towards the rim, what happens to the length of the chord?',
    options: [
      'The chord gets longer until it becomes equal to the diameter',
      'The chord gets shorter as it moves further away from the center',
      'The chord length stays completely constant',
      'The chord turns into a radius',
    ],
    correctIndex: 1,
    verifyInstruction: 'Move the Chord Distance slider in Lab 4 from 0 px towards 65 px and observe the chord shorten.',
    nodeId: NODE_C6_MATH_058,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the Median as you drag Vertex A to any position?',
    observableOptions: [
      'The median always lands on the exact same midpoint of base BC, regardless of where A moves',
      'The median rotates to always stay at 90°',
      'The median changes the length of base BC',
      'The median escapes the triangle',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_MATH_056,
  },
];

// ─── REAL-WORLD ACTIVITY ──────────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'Architectural Heritage Surveyor Challenge',
  description: 'Take a ruler and protractor to inspect a real-world object in your home (e.g. a window frame, round plate, or notebook). Measure 3 line segments to the nearest millimetre and 2 corner angles in degrees. Map out whether their boundaries are linear, curvilinear, or combined.',
  steps: [
    'Select an Indian architectural fixture or household object (e.g. arched doorway, clock, or photo frame).',
    'Record the length of two adjacent sides in cm and mm (e.g., 18 cm 4 mm = 18.4 cm).',
    'Use a protractor to verify the corner angle (is it exactly 90° or an acute/obtuse angle?).',
    'Identify if any circular arc creates a sector (pizza slice) or a segment (cap cut by chord).',
    'Write a one-paragraph surveyor report classifying each boundary type.',
  ],
};

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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C6_MATH_051,
  title: 'Geometry: Lines, Angles, Triangles, Quadrilaterals & Circles',
  definition: 'The fundamental geometrical objects that construct two-dimensional space: lines (unbounded), rays (1 endpoint), segments (2 endpoints), open and closed figures with interior/exterior regions, linear and curvilinear boundaries, angles, triangles (with altitudes and medians), quadrilaterals with diagonals, circles (chords, sectors, segments), and precision measurement using rulers and protractors.',
  eli5: 'Think of geometry like building with magical sticks and strings! A line segment is a real pencil with two ends you can measure. A ray is a torch beam shooting out from a bulb forever. A line is an infinite railway track in both directions. Joining them makes triangles, kites, and clocks where we can measure every corner and curve!',
  misconceptions: [
    { misconception: 'Ray AB and Ray BA are the same ray because they use points A and B.', correction: 'Ray AB starts at A and shoots through B; Ray BA starts at B and shoots in the opposite direction through A. They are distinct.' },
    { misconception: 'A round shape is always closed and a shape with straight edges is always open.', correction: 'A rainbow arc is round but open (leaves a gap). A triangle is straight-edged but completely closed.' },
    { misconception: 'A point lying on the perimeter/fence is inside the interior.', correction: 'The boundary is a separate category. A point on the edge is on the boundary, neither interior nor exterior.' },
    { misconception: 'A circle boundary is linear because it is one smooth line.', correction: 'Linear means composed of straight line segments. A circle is purely curvilinear because it continuously curves.' },
    { misconception: 'The vertex of angle ABC can be any of the three letters.', correction: 'In three-point notation, the middle letter is ALWAYS the vertex where the two arms meet.' },
    { misconception: 'Altitude and Median in a triangle are always the exact same segment.', correction: 'Altitude is defined by a 90° perpendicular drop; Median is defined by connecting to the side midpoint. In general triangles they are distinct.' },
    { misconception: 'A quadrilateral has 4 diagonals because it has 4 vertices.', correction: '4 vertices give 6 possible joining lines. 4 are boundary sides, leaving exactly 2 diagonals (AC and BD).' },
    { misconception: 'A circle sector and a segment are the exact same region.', correction: 'A sector is bounded by 2 radii meeting at the centre (like a pizza slice); a segment is bounded by a chord and an arc.' },
    { misconception: 'Longer arms make an angle larger.', correction: 'Angle measure depends strictly on the amount of rotational divergence in degrees, not the length of drawn lines.' },
  ],
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
function C6_MathematicsLineLineSegmentSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C6_MATH_051,
  title = DEFAULT_PROPS.title || 'Geometry: Lines, Angles, Triangles & Circles',
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // ─── STATE HOOKS ───────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Discovery & Predict-Check State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration & Sandbox State Variables
  const [lineEntityType, setLineEntityType] = useState<'segment' | 'ray' | 'line'>('segment');
  const [ptAX, setPtAX] = useState(80);
  const [ptAY] = useState(130);
  const [ptBX, setPtBX] = useState(320);
  const [ptBY] = useState(130);
  const [openGateToggle, setOpenGateToggle] = useState(false);
  const [testPtX, setTestPtX] = useState(200);
  const [testPtY, setTestPtY] = useState(110);
  const [triVertexAX, setTriVertexAX] = useState(200);
  const [triVertexAY] = useState(40);
  const [showAltitude, setShowAltitude] = useState(true);
  const [showMedian, setShowMedian] = useState(true);
  const [circleRadius, setCircleRadius] = useState(70);
  const [chordOffset, setChordOffset] = useState(25);
  const [sectorAngle, setSectorAngle] = useState(60);
  const [protractorAngle, setProtractorAngle] = useState(45);
  const [activeInteractiveTool, setActiveInteractiveTool] = useState<'line' | 'gate' | 'triangle' | 'circle' | 'protractor'>('line');

  // Reflection responses state
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Adaptive Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating Hints & Feedback State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-Drop, Sort, Numeric & Construct State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Overlays Feedback
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── REFS ───────────────────────────────────────────────────────────────────
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY DIFFICULTY TIER ────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM MASTERY STORE ───────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE BKT MASTERY EFFECT ───────────────────────────────────────────
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

  // ─── 2D CANVAS PARTICLE & GRID ANIMATION LOOP (HTML <canvas> with rAF) ─────
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

      // Dynamic animated coordinate grid
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Compass radar sweep indicator
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.min(cx, cy) - 6;

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const angle = (frame * 0.04) % (Math.PI * 2);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Pulsing center beacon
      ctx.beginPath();
      ctx.arc(cx, cy, 3 + Math.sin(frame * 0.08) * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── REAL-TIME DERIVED GEOMETRY CALCULATIONS ────────────────────────────────
  const triCalculations = useMemo(() => {
    const bX = 80;
    const bY = 200;
    const cX = 320;
    const cY = 200;
    const midX = (bX + cX) / 2;
    const midY = 200;
    const footX = triVertexAX;
    const footY = 200;
    const baseLength = cX - bX;
    const altitudeHeight = Math.abs(200 - triVertexAY);
    const medianLength = Math.hypot(triVertexAX - midX, triVertexAY - midY);

    return { bX, bY, cX, cY, midX, midY, footX, footY, baseLength, altitudeHeight, medianLength };
  }, [triVertexAX, triVertexAY]);

  // ─── INACTIVITY TIMER ───────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── MEMOISED HANDLERS ──────────────────────────────────────────────────────
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Magnificent deduction! You identified the Ray.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Geometric Labs. Manipulate each concept directly.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Test all instruments without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Prove your geometric mastery!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the interactive laboratory to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorr = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Outstanding observation! The geometric property holds true.' : 'Observe the visualization carefully.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered the geometry of lines, angles, triangles, and circles.');
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

  const handleAnswer = useCallback((ans: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = ans === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numVal = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
      isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
    } else if (challenge.type === 'construct') {
      isCorrect = ans === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding geometrical reasoning.');
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
        speechManager.speak('All hints exhausted. Let us analyze the step-by-step solution.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleDragStart = useCallback((lbl: string) => {
    setDraggedItem(lbl);
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
    const ans = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(ans);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleConstructToggle = useCallback((part: string) => {
    audioManager.play('tap');
    setConstructParts(prev => (prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]));
  }, []);

  // Motivational feedback calculation
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE! 🏆 Flawless Geometric Master! Perfect accuracy across all constructions and proofs.';
    if (errors >= 1 && errors <= 3) return 'Great work! 🌟 Exceptional spatial acumen with solid proofs and reasoning.';
    if (errors >= 4 && errors <= 7) return 'Good effort! 💡 You tackled difficult geometric concepts well — keep practicing the nuances!';
    return 'Do not give up — You WILL get this! 💪 Consistent review of ray, angle, and circle rules will make you an expert.';
  }, [errors]);

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR WITH EMBEDDED CANVAS RADAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-900/40 rounded-2xl border border-gold-700/50">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-gold-300 via-purple-200 to-pink-300 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              ICSE Class 6 Mathematics • Geometry & Spatial Instrumentation
            </p>
          </div>
        </div>

        {/* Live HTML Canvas Radar + Phase Pill Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900/90 px-2 py-1 rounded-2xl border border-slate-800" title="Geometric Coordinate Engine">
            <canvas
              ref={canvasRef}
              width={64}
              height={36}
              className="rounded-lg bg-slate-950 border border-slate-800"
              aria-label="Real-time animated geometric radar scanner"
            />
            <span className="text-[10px] text-gold-300 font-mono hidden sm:inline">RADAR ACTIVE</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs">
            {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
              <motion.button
                key={p}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Switch to ${p} phase`}
                onClick={() => {
                  setPhase(p);
                  audioManager.play('tap');
                }}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all capitalize ${
                  phase === p
                    ? 'bg-gradient-to-r from-gold-600 to-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {p}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Narrative Scenario Box */}
          <div className="p-6 bg-gradient-to-br from-gold-950/70 via-slate-900 to-purple-950/40 rounded-3xl border border-gold-800/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-lg font-bold text-gold-300 flex items-center gap-2">
              <span>🏛️</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-200/80 mt-2 italic bg-gold-900/30 p-2.5 rounded-xl border border-gold-700/30">
              {SCENARIO.context}
            </p>
          </div>

          {/* Curiosity Hook Interactive Question */}
          <div className="p-6 bg-slate-900/80 rounded-3xl border border-slate-800">
            <span className="text-xs font-bold text-amber-400 tracking-wider uppercase bg-amber-950/40 px-3 py-1 rounded-full border border-amber-800/50">
              Curiosity Hook • Pre-Exploration
            </span>
            <p className="text-base font-semibold text-white mt-3 mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`p-4 text-left rounded-2xl border text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 border-slate-700/70 text-slate-200 hover:border-gold-500 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700/80 flex items-center justify-center text-xs font-bold text-slate-300">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                      <span className="ml-auto text-emerald-400 font-bold">✓</span>
                    )}
                    {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && (
                      <span className="ml-auto text-slate-500">✗</span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-2xl bg-gold-950/40 border border-gold-800 flex flex-wrap items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-300 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '✓ Brilliant deduction! A Ray has 1 fixed endpoint and shoots infinitely.'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Enter Interactive Laboratories"
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-gold-500/25 text-sm"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. INTERACTIVE EXPLORATION PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Exploration Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {EXPLORATION_STEPS.map((step, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label={`Navigate to Lab ${idx + 1}`}
                  onClick={() => {
                    setCurrentSlide(idx);
                    audioManager.play('tap');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    currentSlide === idx
                      ? 'bg-gold-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Lab {idx + 1}
                </motion.button>
              ))}
            </div>
            <span className="text-xs text-gold-300 font-semibold">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
          </div>

          {/* Interactive Lab Stage */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-gold-400">⚡</span> {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>
              <p className="text-xs md:text-sm text-amber-300 bg-amber-950/30 p-3 rounded-2xl border border-amber-800/40">
                👉 <span className="font-semibold">{EXPLORATION_STEPS[currentSlide].instruction}</span>
              </p>

              {/* ─── LAB 1: Line / Ray / Segment ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(['segment', 'ray', 'line'] as const).map(t => (
                      <motion.button
                        key={t}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Select entity type: ${t}`}
                        onClick={() => {
                          setLineEntityType(t);
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                          lineEntityType === t
                            ? 'bg-gold-600 text-white shadow-lg shadow-gold-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {t === 'segment' ? 'Line Segment AB (2 Ends)' : t === 'ray' ? 'Ray AB (1 End, Infinite)' : 'Line AB (0 Ends, Infinite)'}
                      </motion.button>
                    ))}
                  </div>

                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 relative">
                    <svg viewBox="0 0 400 200" className="w-full h-48 select-none" aria-label="Geometric line diagram">
                      <defs>
                        <marker id="arrowHead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                          <path d="M 0 0 L 8 4 L 0 8 z" fill="#818cf8" />
                        </marker>
                        <marker id="arrowHeadLeft" markerWidth="8" markerHeight="8" refX="2" refY="4" orient="auto">
                          <path d="M 8 0 L 0 4 L 8 8 z" fill="#818cf8" />
                        </marker>
                      </defs>

                      {lineEntityType === 'line' && (
                        <line x1="20" y1={ptAY} x2="380" y2={ptBY} stroke="#818cf8" strokeWidth="3" markerStart="url(#arrowHeadLeft)" markerEnd="url(#arrowHead)" />
                      )}
                      {lineEntityType === 'ray' && (
                        <line x1={ptAX} y1={ptAY} x2="380" y2={ptBY} stroke="#818cf8" strokeWidth="3" markerEnd="url(#arrowHead)" />
                      )}
                      {lineEntityType === 'segment' && (
                        <line x1={ptAX} y1={ptAY} x2={ptBX} y2={ptBY} stroke="#818cf8" strokeWidth="4" />
                      )}

                      <circle cx={ptAX} cy={ptAY} r="8" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                      <text x={ptAX} y={ptAY - 14} fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                        Endpoint A ({ptAX}, {ptAY})
                      </text>

                      <circle cx={ptBX} cy={ptBY} r="8" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
                      <text x={ptBX} y={ptBY - 14} fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">
                        {lineEntityType === 'segment' ? 'Endpoint B' : 'Pass-through B'} ({ptBX}, {ptBY})
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="sliderPtAX" className="text-xs text-slate-400 block mb-1">Position Endpoint A: {ptAX}px</label>
                      <input
                        id="sliderPtAX"
                        aria-label="Slider for Endpoint A position"
                        type="range"
                        min={50}
                        max={180}
                        value={ptAX}
                        onChange={e => setPtAX(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="sliderPtBX" className="text-xs text-slate-400 block mb-1">Position Point B: {ptBX}px</label>
                      <input
                        id="sliderPtBX"
                        aria-label="Slider for Point B position"
                        type="range"
                        min={220}
                        max={350}
                        value={ptBX}
                        onChange={e => setPtBX(Number(e.target.value))}
                        className="w-full accent-pink-500"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-800/80 rounded-xl text-xs text-slate-300">
                    <span className="font-bold text-gold-300">Notation Rule: </span>
                    {lineEntityType === 'segment' && 'Segment AB is written as AB (no arrow). Definite measurable length = ' + ((ptBX - ptAX) / 25).toFixed(1) + ' cm.'}
                    {lineEntityType === 'ray' && 'Ray AB is written as AB with a single arrow pointing from endpoint A through B.'}
                    {lineEntityType === 'line' && 'Line AB is written as AB with a double-headed arrow. Endpoints = 0.'}
                  </div>
                </div>
              )}

              {/* ─── LAB 2: Open vs Closed & Interior/Exterior ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Toggle open or closed boundary gate"
                      onClick={() => {
                        setOpenGateToggle(!openGateToggle);
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        openGateToggle ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {openGateToggle ? 'Current: Open Figure (Gap Unlocked)' : 'Current: Closed Figure (Sealed Loop)'}
                    </motion.button>

                    <span className="text-xs text-slate-300 font-semibold">
                      Test Point P Status:{' '}
                      <span className={!openGateToggle && testPtX > 100 && testPtX < 300 && testPtY > 50 && testPtY < 150 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                        {!openGateToggle && testPtX > 100 && testPtX < 300 && testPtY > 50 && testPtY < 150
                          ? '✓ INTERIOR (Trapped inside closed boundary)'
                          : openGateToggle
                          ? '✗ EXTERIOR (Unbounded: escapes via boundary gap)'
                          : '✗ EXTERIOR'}
                      </span>
                    </span>
                  </div>

                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 relative">
                    <svg viewBox="0 0 400 200" className="w-full h-48 select-none" aria-label="Closed and open boundary test area">
                      <path
                        d={openGateToggle ? 'M 100 50 L 300 50 L 300 150 L 170 150' : 'M 100 50 L 300 50 L 300 150 L 100 150 Z'}
                        fill={!openGateToggle ? '#1e1b4b' : 'none'}
                        stroke="#818cf8"
                        strokeWidth="4"
                      />
                      {openGateToggle && (
                        <circle cx="170" cy="150" r="4" fill="#f59e0b" />
                      )}

                      <circle cx={testPtX} cy={testPtY} r="9" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
                      <text x={testPtX} y={testPtY - 14} fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">
                        Point P ({testPtX}, {testPtY})
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="sliderPtX" className="text-xs text-slate-400 block mb-1">Drag Point P (X): {testPtX}px</label>
                      <input id="sliderPtX" aria-label="Slider for Point P X position" type="range" min={60} max={340} value={testPtX} onChange={e => setTestPtX(Number(e.target.value))} className="w-full accent-pink-500" />
                    </div>
                    <div>
                      <label htmlFor="sliderPtY" className="text-xs text-slate-400 block mb-1">Drag Point P (Y): {testPtY}px</label>
                      <input id="sliderPtY" aria-label="Slider for Point P Y position" type="range" min={30} max={170} value={testPtY} onChange={e => setTestPtY(Number(e.target.value))} className="w-full accent-pink-500" />
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: Triangle Altitude vs Median ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-purple-950/40 rounded-2xl border border-purple-800 space-y-2">
                      <p className="text-xs font-bold text-purple-300 uppercase tracking-wider">Predict-Then-Check (1/2)</p>
                      <p className="text-sm text-white font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                      <p className="text-xs text-purple-200/70 italic">{PREDICTION_QUESTIONS[0].verifyInstruction}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            aria-label={`Select prediction option ${i + 1}`}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left bg-slate-800/90 rounded-xl text-xs text-slate-200 hover:bg-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Toggle Altitude display"
                      onClick={() => setShowAltitude(!showAltitude)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold ${showAltitude ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      {showAltitude ? '✓ Altitude (90° Perpendicular)' : '+ Show Altitude'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Toggle Median display"
                      onClick={() => setShowMedian(!showMedian)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold ${showMedian ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      {showMedian ? '✓ Median (To Midpoint M)' : '+ Show Median'}
                    </motion.button>
                  </div>

                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 relative">
                    <svg viewBox="0 0 400 240" className="w-full h-56 select-none" aria-label="Interactive triangle showing altitude and median">
                      <line x1={triCalculations.bX} y1={triCalculations.bY} x2={triCalculations.cX} y2={triCalculations.cY} stroke="#ffffff" strokeWidth="3" />
                      {(triVertexAX > triCalculations.cX || triVertexAX < triCalculations.bX) && (
                        <line x1={triCalculations.bX - 40} y1="200" x2={triCalculations.cX + 60} y2="200" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
                      )}

                      <line x1={triVertexAX} y1={triVertexAY} x2={triCalculations.bX} y2={triCalculations.bY} stroke="#818cf8" strokeWidth="2.5" />
                      <line x1={triVertexAX} y1={triVertexAY} x2={triCalculations.cX} y2={triCalculations.cY} stroke="#818cf8" strokeWidth="2.5" />

                      {showAltitude && (
                        <g>
                          <line x1={triVertexAX} y1={triVertexAY} x2={triCalculations.footX} y2={triCalculations.footY} stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="5 3" />
                          <rect x={triCalculations.footX - 8} y={triCalculations.footY - 8} width="8" height="8" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
                          <circle cx={triCalculations.footX} cy={triCalculations.footY} r="4" fill="#f43f5e" />
                          <text x={triCalculations.footX} y={triCalculations.footY + 16} fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">
                            Foot D (90°)
                          </text>
                        </g>
                      )}

                      {showMedian && (
                        <g>
                          <line x1={triVertexAX} y1={triVertexAY} x2={triCalculations.midX} y2={triCalculations.midY} stroke="#10b981" strokeWidth="2.5" />
                          <circle cx={triCalculations.midX} cy={triCalculations.midY} r="5" fill="#10b981" />
                          <text x={triCalculations.midX} y={triCalculations.midY + 16} fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">
                            Midpoint M (BM=MC)
                          </text>
                        </g>
                      )}

                      <circle cx={triVertexAX} cy={triVertexAY} r="7" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
                      <text x={triVertexAX} y={triVertexAY - 10} fill="#a855f7" fontSize="12" fontWeight="bold" textAnchor="middle">
                        Vertex A
                      </text>
                      <circle cx={triCalculations.bX} cy={triCalculations.bY} r="5" fill="#ffffff" />
                      <text x={triCalculations.bX - 10} y={triCalculations.bY + 16} fill="#ffffff" fontSize="11">
                        B
                      </text>
                      <circle cx={triCalculations.cX} cy={triCalculations.cY} r="5" fill="#ffffff" />
                      <text x={triCalculations.cX + 10} y={triCalculations.cY + 16} fill="#ffffff" fontSize="11">
                        C
                      </text>
                    </svg>
                  </div>

                  <div>
                    <label htmlFor="sliderTriVertex" className="text-xs text-slate-400 block mb-1">Drag Vertex A Horizontally: {triVertexAX}px</label>
                    <input
                      id="sliderTriVertex"
                      aria-label="Slider to drag Vertex A horizontally"
                      type="range"
                      min={60}
                      max={360}
                      value={triVertexAX}
                      onChange={e => setTriVertexAX(Number(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                  </div>

                  {predictionMade && !observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                      <p className="text-xs font-bold text-amber-400 uppercase">Scientific Observation</p>
                      <p className="text-sm text-white font-medium mt-1">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5 mt-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            aria-label={`Select observation: ${opt}`}
                            onClick={() => handleObservation(i)}
                            className="w-full text-left p-2 bg-slate-900 rounded-xl text-xs text-slate-200 hover:bg-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── LAB 4: Circle Chords, Sectors & Segments ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="sliderChordOffset" className="text-xs text-slate-400 block mb-1">Chord Distance from Centre: {chordOffset}px</label>
                      <input id="sliderChordOffset" aria-label="Slider for chord offset distance" type="range" min={0} max={65} value={chordOffset} onChange={e => setChordOffset(Number(e.target.value))} className="w-full accent-gold-500" />
                    </div>
                    <div>
                      <label htmlFor="sliderSectorAngle" className="text-xs text-slate-400 block mb-1">Sector Angle Opening: {sectorAngle}°</label>
                      <input id="sliderSectorAngle" aria-label="Slider for sector angle" type="range" min={15} max={180} value={sectorAngle} onChange={e => setSectorAngle(Number(e.target.value))} className="w-full accent-purple-500" />
                    </div>
                  </div>

                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
                    <svg viewBox="0 0 400 220" className="w-full h-56 select-none" aria-label="Circle anatomy showing sector and chord">
                      <circle cx="200" cy="110" r={circleRadius} fill="#0f172a" stroke="#818cf8" strokeWidth="2.5" />
                      <circle cx="200" cy="110" r="4" fill="#facc15" />
                      <text x="200" y="102" fill="#facc15" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Centre O
                      </text>

                      {(() => {
                        const rad = (sectorAngle * Math.PI) / 180;
                        const x2 = 200 + circleRadius * Math.cos(rad);
                        const y2 = 110 - circleRadius * Math.sin(rad);
                        return (
                          <g>
                            <path d={`M 200 110 L ${200 + circleRadius} 110 A ${circleRadius} ${circleRadius} 0 0 0 ${x2} ${y2} Z`} fill="#a855f7" opacity="0.35" stroke="#c084fc" strokeWidth="1.5" />
                            <text x="235" y="90" fill="#c084fc" fontSize="10" fontWeight="bold">
                              Sector ({sectorAngle}°)
                            </text>
                          </g>
                        );
                      })()}

                      {(() => {
                        const yChord = 110 + chordOffset;
                        const halfW = Math.sqrt(Math.max(0, circleRadius * circleRadius - chordOffset * chordOffset));
                        const x1 = 200 - halfW;
                        const x2 = 200 + halfW;
                        return (
                          <g>
                            <path d={`M ${x1} ${yChord} A ${circleRadius} ${circleRadius} 0 0 0 ${x2} ${yChord} Z`} fill="#f43f5e" opacity="0.45" />
                            <line x1={x1} y1={yChord} x2={x2} y2={yChord} stroke="#f43f5e" strokeWidth="2.5" />
                            <circle cx={x1} cy={yChord} r="3" fill="#f43f5e" />
                            <circle cx={x2} cy={yChord} r="3" fill="#f43f5e" />
                            <text x="200" y={yChord + 16} fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">
                              {chordOffset === 0 ? 'Diameter (Longest Chord = 2r)' : 'Chord & Segment'}
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: Protractor Angular Rotation ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="sliderProtractor" className="text-xs text-slate-400 block mb-1">Angle Rotation: {protractorAngle}°</label>
                    <input
                      id="sliderProtractor"
                      aria-label="Slider to rotate protractor angle"
                      type="range"
                      min={0}
                      max={180}
                      value={protractorAngle}
                      onChange={e => setProtractorAngle(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>

                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
                    <svg viewBox="0 0 400 240" className="w-full h-56 select-none" aria-label="Interactive protractor angle tool">
                      <path d="M 60 190 A 140 140 0 0 1 340 190 Z" fill="#1e293b" stroke="#475569" strokeWidth="2" opacity="0.6" />
                      <line x1="60" y1="190" x2="340" y2="190" stroke="#94a3b8" strokeWidth="2" />

                      <circle cx="200" cy="190" r="5" fill="#facc15" />
                      <text x="200" y="210" fill="#facc15" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Vertex O
                      </text>

                      <line x1="200" y1="190" x2="340" y2="190" stroke="#38bdf8" strokeWidth="3" />
                      <text x="330" y="180" fill="#38bdf8" fontSize="10" fontWeight="bold">
                        Arm OA (0°)
                      </text>

                      {(() => {
                        const rad = (protractorAngle * Math.PI) / 180;
                        const armLen = 135;
                        const bx = 200 + armLen * Math.cos(rad);
                        const by = 190 - armLen * Math.sin(rad);
                        return (
                          <g>
                            <line x1="200" y1="190" x2={bx} y2={by} stroke="#f43f5e" strokeWidth="3" />
                            <circle cx={bx} cy={by} r="5" fill="#f43f5e" />
                            <text x={bx} y={by - 10} fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">
                              Arm OB ({protractorAngle}°)
                            </text>
                            <path d={`M 240 190 A 40 40 0 0 0 ${200 + 40 * Math.cos(rad)} ${190 - 40 * Math.sin(rad)}`} fill="none" stroke="#f43f5e" strokeWidth="2" />
                          </g>
                        );
                      })()}

                      <rect x="70" y="30" width="260" height="40" rx="8" fill="#0f172a" stroke="#334155" />
                      <text x="200" y="46" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Inner Scale (from right baseline): {protractorAngle}°
                      </text>
                      <text x="200" y="62" fill="#94a3b8" fontSize="10" textAnchor="middle">
                        Outer Scale (complement): {180 - protractorAngle}° (Sum = 180°)
                      </text>
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Exploration Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentSlide === 0}
              aria-label="Go to previous lab"
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              className="px-5 py-2.5 bg-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Go to next lab"
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Enter free sandbox mode"
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl text-xs shadow-lg"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-3xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🛠️</span> Geometric Sandbox & Instrument Workbench
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Zero grading pressure. Switch between dynamic instruments to measure, construct, and verify geometric axioms.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(['line', 'gate', 'triangle', 'circle', 'protractor'] as const).map(tool => (
                <motion.button
                  key={tool}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Select sandbox instrument: ${tool}`}
                  onClick={() => {
                    setActiveInteractiveTool(tool);
                    audioManager.play('tap');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                    activeInteractiveTool === tool
                      ? 'bg-gold-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tool}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800">
            {activeInteractiveTool === 'triangle' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-slate-300">
                  <span>Base BC Length: 240 px</span>
                  <span>Altitude Height: {triCalculations.altitudeHeight} px</span>
                  <span>Median Length: {triCalculations.medianLength.toFixed(1)} px</span>
                </div>
                <input
                  aria-label="Adjust triangle apex vertex position"
                  type="range"
                  min={40}
                  max={380}
                  value={triVertexAX}
                  onChange={e => setTriVertexAX(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
            )}
            {activeInteractiveTool === 'circle' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-slate-300">
                  <span>Radius: {circleRadius} px</span>
                  <span>Diameter: {circleRadius * 2} px (2r)</span>
                  <span>Chord Distance: {chordOffset} px</span>
                </div>
                <input
                  aria-label="Adjust circle radius"
                  type="range"
                  min={40}
                  max={90}
                  value={circleRadius}
                  onChange={e => setCircleRadius(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>
            )}
            {activeInteractiveTool === 'protractor' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-slate-300">
                  <span>Angle: {protractorAngle}°</span>
                  <span>Classification: {protractorAngle < 90 ? 'Acute (<90°)' : protractorAngle === 90 ? 'Right Angle (90°)' : 'Obtuse (>90°)'}</span>
                </div>
                <input
                  aria-label="Adjust protractor rotation angle"
                  type="range"
                  min={0}
                  max={180}
                  value={protractorAngle}
                  onChange={e => setProtractorAngle(Number(e.target.value))}
                  className="w-full accent-pink-500"
                />
              </div>
            )}
            {(activeInteractiveTool === 'line' || activeInteractiveTool === 'gate') && (
              <p className="text-xs text-slate-400 text-center py-6">
                Active visual sandbox online. Use controls to inspect real-time boundaries.
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Start Competency Challenges"
              onClick={handleAdvanceToChallenge}
              className="px-8 py-3 bg-gradient-to-r from-gold-600 via-purple-600 to-pink-600 text-white font-extrabold rounded-2xl shadow-xl shadow-gold-500/25 text-sm"
            >
              Start Competency Challenges →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-gold-300">
                  Node: {challenge.nodeId}
                </span>
              </div>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950/80 text-rose-400 border border-rose-800'
                    : 'bg-gold-950/80 text-gold-300 border border-gold-800'
                }`}
              >
                {difficulty} • {challenge.competencyLevel}
              </motion.span>
            </div>

            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-pink-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-3xl border transition-all ${
              wrongFlash ? 'bg-rose-950/40 border-rose-500' : 'border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-bold text-white mb-6 leading-snug">
              {challenge.question}
            </p>

            {/* A. MCQ CHALLENGES */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-800/80 border-slate-700/70 text-slate-200 hover:border-gold-500 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-700/80 flex items-center justify-center text-xs font-bold text-slate-300">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                      {showExplanation && i === challenge.correctIndex && (
                        <span className="ml-auto text-emerald-400 font-bold">✓</span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* B. DRAG-LABEL CHALLENGES */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-semibold w-full">Drag labels to correct targets:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-gold-700 hover:bg-gold-600 rounded-xl text-xs font-bold text-white cursor-grab active:cursor-grabbing shadow-md select-none"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 relative">
                  <svg viewBox="0 0 400 240" className="w-full h-64 select-none" aria-label="Drop targets diagram">
                    {challenge.id === 'ch_06_triangle_elements' && (
                      <g>
                        <polygon points="200,40 80,200 320,200" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2.5" />
                        <line x1="200" y1="40" x2="200" y2="200" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" />
                        <line x1="200" y1="40" x2="200" y2="200" stroke="#10b981" strokeWidth="2" />
                      </g>
                    )}
                    {challenge.id === 'ch_18_circle_parts_drag_label' && (
                      <g>
                        <circle cx="200" cy="120" r="80" fill="#0f172a" stroke="#818cf8" strokeWidth="2.5" />
                        <line x1="120" y1="120" x2="280" y2="120" stroke="#facc15" strokeWidth="2.5" />
                        <path d="M 200 120 L 280 120 A 80 80 0 0 0 256 63 Z" fill="#a855f7" opacity="0.4" />
                      </g>
                    )}

                    {challenge.id === 'ch_06_triangle_elements' && (
                      <>
                        <g onDragOver={e => e.preventDefault()} onDrop={() => handleDragDrop('tgt_tri_vertex')}>
                          <rect x="130" y="10" width="140" height="26" rx="6" fill="#1e293b" stroke="#475569" strokeDasharray="3 3" />
                          <text x="200" y="27" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">
                            {droppedLabels.tgt_tri_vertex ? `✓ ${droppedLabels.tgt_tri_vertex}` : 'Drop: Vertex A'}
                          </text>
                        </g>
                        <g onDragOver={e => e.preventDefault()} onDrop={() => handleDragDrop('tgt_tri_altitude')}>
                          <rect x="15" y="100" width="150" height="26" rx="6" fill="#1e293b" stroke="#475569" strokeDasharray="3 3" />
                          <text x="90" y="117" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">
                            {droppedLabels.tgt_tri_altitude ? `✓ ${droppedLabels.tgt_tri_altitude}` : 'Drop: Altitude'}
                          </text>
                        </g>
                        <g onDragOver={e => e.preventDefault()} onDrop={() => handleDragDrop('tgt_tri_median')}>
                          <rect x="235" y="100" width="150" height="26" rx="6" fill="#1e293b" stroke="#475569" strokeDasharray="3 3" />
                          <text x="310" y="117" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">
                            {droppedLabels.tgt_tri_median ? `✓ ${droppedLabels.tgt_tri_median}` : 'Drop: Median'}
                          </text>
                        </g>
                        <g onDragOver={e => e.preventDefault()} onDrop={() => handleDragDrop('tgt_tri_base')}>
                          <rect x="130" y="210" width="140" height="26" rx="6" fill="#1e293b" stroke="#475569" strokeDasharray="3 3" />
                          <text x="200" y="227" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">
                            {droppedLabels.tgt_tri_base ? `✓ ${droppedLabels.tgt_tri_base}` : 'Drop: Base Side'}
                          </text>
                        </g>
                      </>
                    )}
                    {challenge.id === 'ch_18_circle_parts_drag_label' && (
                      <>
                        <g onDragOver={e => e.preventDefault()} onDrop={() => handleDragDrop('tgt_circ_diameter')}>
                          <rect x="130" y="130" width="140" height="26" rx="6" fill="#1e293b" stroke="#475569" strokeDasharray="3 3" />
                          <text x="200" y="147" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">
                            {droppedLabels.tgt_circ_diameter ? `✓ ${droppedLabels.tgt_circ_diameter}` : 'Drop: Diameter'}
                          </text>
                        </g>
                        <g onDragOver={e => e.preventDefault()} onDrop={() => handleDragDrop('tgt_circ_sector')}>
                          <rect x="240" y="40" width="150" height="26" rx="6" fill="#1e293b" stroke="#475569" strokeDasharray="3 3" />
                          <text x="315" y="57" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">
                            {droppedLabels.tgt_circ_sector ? `✓ ${droppedLabels.tgt_circ_sector}` : 'Drop: Sector'}
                          </text>
                        </g>
                        <g onDragOver={e => e.preventDefault()} onDrop={() => handleDragDrop('tgt_circ_segment')}>
                          <rect x="10" y="180" width="150" height="26" rx="6" fill="#1e293b" stroke="#475569" strokeDasharray="3 3" />
                          <text x="85" y="197" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">
                            {droppedLabels.tgt_circ_segment ? `✓ ${droppedLabels.tgt_circ_segment}` : 'Drop: Segment'}
                          </text>
                        </g>
                        <g onDragOver={e => e.preventDefault()} onDrop={() => handleDragDrop('tgt_circ_arc')}>
                          <rect x="10" y="40" width="150" height="26" rx="6" fill="#1e293b" stroke="#475569" strokeDasharray="3 3" />
                          <text x="85" y="57" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">
                            {droppedLabels.tgt_circ_arc ? `✓ ${droppedLabels.tgt_circ_arc}` : 'Drop: Arc'}
                          </text>
                        </g>
                      </>
                    )}
                  </svg>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Verify Dragged Labels"
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-gold-600 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Verify Dragged Labels
                </motion.button>
              </div>
            )}

            {/* C. DRAG-SORT CHALLENGES */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sortable item ${idx + 1}: ${item}`}
                      draggable
                      onDragStart={() => handleDragStart(String(idx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, idx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-gold-900/80 text-gold-300 font-bold flex items-center justify-center text-xs">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Verify Step Sequence"
                  onClick={handleSortSubmit}
                  className="px-6 py-2.5 bg-gold-600 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Verify Step Sequence
                </motion.button>
              </div>
            )}

            {/* D. NUMERIC CHALLENGES */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.1"
                    aria-label={`Enter numerical measure in ${challenge.unit || 'units'}`}
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:border-gold-500 focus:outline-none w-48 font-mono"
                  />
                  <span className="text-sm font-semibold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Submit calculated measure"
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-2.5 bg-gold-600 text-white font-bold rounded-xl text-xs shadow-md"
                  >
                    Submit Measure
                  </motion.button>
                </div>
              </div>
            )}

            {/* E. CONSTRUCT CHALLENGES */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 italic">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Toggle construction part: ${part}`}
                      onClick={() => handleConstructToggle(part)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        constructParts.includes(part)
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {constructParts.includes(part) ? '✓ ' : '+ '} {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-gold-300 font-mono min-h-[44px] flex items-center">
                  {constructParts.length > 0 ? constructParts.join(' ') : 'Click parts above to assemble geometric definition...'}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={constructParts.length === 0}
                  aria-label="Verify Assembled Construction"
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-6 py-2.5 bg-gold-600 text-white font-bold rounded-xl text-xs shadow-md disabled:opacity-40"
                >
                  Verify Assembled Construction
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gold-950/40 border border-gold-800/80 rounded-2xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gold-300 uppercase tracking-wider">
                    ✓ Geometrical Proof & Step-by-Step Walkthrough
                  </span>
                  <span className="text-xs text-slate-400">
                    Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(s => s.trim()).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-gold-100/90 leading-relaxed"
                      >
                        <span className="font-bold text-gold-400 mr-2">{idx + 1}.</span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim()).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label="Show next step of proof"
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-gold-700 text-white rounded-xl text-xs font-bold shadow-md"
                    >
                      Show Next Proof Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Proceed to next geometric challenge"
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl text-xs shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Geometric Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-gold-950 via-slate-900 to-purple-950/60 rounded-3xl border border-gold-800 text-center space-y-4 relative overflow-hidden">
            <h2 className="text-2xl md:text-3xl font-black text-white">
              🏛️ Restoration Master: Certified Geometrician
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have successfully verified all 10 ICSE Class 6 geometry standards: lines, rays, segments, open/closed boundaries, triangle elements, quadrilateral diagonals, and circle properties.
            </p>

            <div className="flex flex-wrap justify-center gap-4 py-2">
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[130px]">
                <span className="text-xs text-slate-400 font-semibold block">Final Score</span>
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[130px]">
                <span className="text-xs text-slate-400 font-semibold block">BKT Mastery Level</span>
                <span className="text-2xl font-black text-gold-300 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK (Error-based personalization) */}
          <div className={`p-5 rounded-2xl border ${
            errors === 0
              ? 'bg-emerald-950/50 border-emerald-500/80 text-emerald-200'
              : errors <= 3
              ? 'bg-gold-950/50 border-gold-500/80 text-gold-200'
              : errors <= 7
              ? 'bg-amber-950/50 border-amber-500/80 text-amber-200'
              : 'bg-rose-950/50 border-rose-500/80 text-rose-200'
          }`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{errors === 0 ? '🏆' : errors <= 3 ? '⭐' : errors <= 7 ? '👍' : '💪'}</span>
              <div>
                <h3 className="font-bold text-sm tracking-wide uppercase">
                  {errors === 0 ? 'PERFECT SCORE!' : errors <= 3 ? 'Great work!' : errors <= 7 ? 'Good effort!' : 'Do not give up — You WILL get this!'}
                </h3>
                <p className="text-xs md:text-sm mt-0.5 opacity-90">{motivationalMessage}</p>
              </div>
            </div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>💭</span> Post-Simulation Deep Reflection
            </h3>
            <p className="text-xs text-slate-400">
              Take a moment to solidify your understanding by answering these reflection questions:
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="refSurprise" className="block text-xs font-semibold text-slate-300 mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  id="refSurprise"
                  aria-label="Reflection: What was the most surprising thing you learned?"
                  rows={2}
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers({ ...reflectionAnswers, surprising: e.target.value })}
                  placeholder="e.g. How a ray has only one endpoint, or how altitude and median diverge..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label htmlFor="refExplain" className="block text-xs font-semibold text-slate-300 mb-1">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  id="refExplain"
                  aria-label="Reflection: How would you explain this to a friend?"
                  rows={2}
                  value={reflectionAnswers.explain}
                  onChange={e => setReflectionAnswers({ ...reflectionAnswers, explain: e.target.value })}
                  placeholder="e.g. Angle size is about rotation, not how long the lines are drawn..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label htmlFor="refRealLife" className="block text-xs font-semibold text-slate-300 mb-1">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  id="refRealLife"
                  aria-label="Reflection: Where in real life might you use this?"
                  rows={2}
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers({ ...reflectionAnswers, realLife: e.target.value })}
                  placeholder="e.g. Architectural blueprints, carpentry, astronomy, map coordinates..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Misconception Profile Tracking */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/50 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Specific Misconceptions Addressed During Lab:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-300 font-semibold">✗ {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition SRS Schedule Visible Card */}
          <div className="p-5 bg-gradient-to-r from-amber-950/40 via-gold-950/40 to-purple-950/40 rounded-2xl border border-amber-500/50 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <span>📅</span> Spaced Repetition Schedule (SM-2 Algorithm)
              </h3>
              <span className="text-xs px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/40 font-bold uppercase">
                SRS Recommended
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Based on your accuracy and mistake profile ({errors} mistake{errors === 1 ? '' : 's'}), your optimal memory retention review is scheduled:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-center text-xs">
              <div className={`p-3 rounded-xl border ${errors === 0 ? 'bg-emerald-900/60 border-emerald-400 font-bold text-emerald-200' : 'bg-slate-900/60 border-slate-800 text-slate-500'}`}>
                <div className="text-sm">Review in 7 days</div>
                <div className="text-[10px] mt-0.5">0 Errors (Mastery Lock)</div>
                {errors === 0 && <span className="text-xs text-emerald-400 block mt-1">★ Your Target</span>}
              </div>
              <div className={`p-3 rounded-xl border ${errors >= 1 && errors <= 3 ? 'bg-gold-900/60 border-gold-400 font-bold text-gold-200' : 'bg-slate-900/60 border-slate-800 text-slate-500'}`}>
                <div className="text-sm">Review in 3 days</div>
                <div className="text-[10px] mt-0.5">1-3 Errors (Consolidation)</div>
                {errors >= 1 && errors <= 3 && <span className="text-xs text-gold-400 block mt-1">★ Your Target</span>}
              </div>
              <div className={`p-3 rounded-xl border ${errors >= 4 ? 'bg-amber-900/60 border-amber-400 font-bold text-amber-200' : 'bg-slate-900/60 border-slate-800 text-slate-500'}`}>
                <div className="text-sm">Review in 1 day</div>
                <div className="text-[10px] mt-0.5">4+ Errors (Active Recall)</div>
                {errors >= 4 && <span className="text-xs text-amber-400 block mt-1">★ Your Target</span>}
              </div>
            </div>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>📐</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-bold text-gold-400">{i + 1}.</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS (sim-engine) ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Geometric Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_MathematicsLineLineSegmentSim;
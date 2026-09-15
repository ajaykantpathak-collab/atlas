'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───────────────────────────────────
const NODE_C6_MATH_061 = 'c6_math_061';
const NODE_C6_MATH_062 = 'c6_math_062';
const NODE_C6_MATH_063 = 'c6_math_063';
const NODE_C6_MATH_064 = 'c6_math_064';
const NODE_C6_MATH_065 = 'c6_math_065';
const NODE_C6_MATH_066 = 'c6_math_066';
const NODE_C6_MATH_067 = 'c6_math_067';
const NODE_C6_MATH_068 = 'c6_math_068';
const NODE_C6_MATH_069 = 'c6_math_069';
const NODE_C6_MATH_070 = 'c6_math_070';

const ALL_NODE_IDS = [
  NODE_C6_MATH_061,
  NODE_C6_MATH_062,
  NODE_C6_MATH_063,
  NODE_C6_MATH_064,
  NODE_C6_MATH_065,
  NODE_C6_MATH_066,
  NODE_C6_MATH_067,
  NODE_C6_MATH_068,
  NODE_C6_MATH_069,
  NODE_C6_MATH_070,
];

// ─── REVIEW INTERVALS (SM-2) ────────────────────────────────────────────────
const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── NARRATIVE SCENARIO ─────────────────────────────────────────────────────
const SCENARIO = {
  title: 'Architect of the Smart City Pavilion',
  intro: 'You are the chief junior architect designing the futuristic New Delhi Geometric Pavilion. Every beam, solar panel, tent roof, and mirror wall must follow precise geometric laws of lines, angles, 2-D polygons, 3-D structural elements, unfolding nets, and symmetry axes!',
  context: 'From perpendicular load-bearing girders and acute solar tilts to hexagonal tessellations and tetrahedral domes, your mathematical precision determines whether the pavilion stands tall or collapses.',
};

// ─── DISCOVERY HOOK ─────────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'Observe two railway tracks or ruler edges. If they are extended infinitely on a flat plane without bending, will they ever meet?',
  options: [
    'Yes, they meet at the horizon because perspective makes them touch',
    'No, because the perpendicular distance between them remains strictly constant everywhere',
    'Yes, only if one line is longer than the other',
    'It depends on whether the lines are drawn vertically or horizontally',
  ],
  correctIndex: 1,
  hintAfter: "Let's explore why parallel lines in the same plane never intersect, while perpendicular and intersecting lines cross at definite points!",
};

// ─── CHALLENGE INTERFACE ────────────────────────────────────────────────────
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

// ─── CHALLENGES DATA (22 CHALLENGES: 8 Foundation, 7 Standard, 7 Advanced) ──
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION TIER (8) ──
  {
    id: 'ch_f01_lines',
    nodeId: NODE_C6_MATH_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Two straight girders in the pavilion roof meet at a junction forming an exact 90° corner (denoted by ⊥). What type of lines are they?',
    options: [
      'Perpendicular lines (which are a special type of intersecting lines)',
      'Parallel lines',
      'Skew lines that never meet',
      'Non-intersecting curved lines',
    ],
    correctIndex: 0,
    explanation: 'Perpendicular lines are intersecting lines that meet at exactly 90 degrees. All perpendicular lines are intersecting, but only those at 90° are perpendicular.',
    hints: [
      'Notice they meet at a point, so they must be intersecting.',
      'Check the exact angle at the corner: 90 degrees.',
      'Lines meeting at a 90° right angle are called perpendicular (symbol ⊥).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_f02_angles',
    nodeId: NODE_C6_MATH_062,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A solar tracker arm rotates from 0° to 135° to follow the afternoon sun. How is an angle of 135° classified?',
    options: [
      'Acute angle (< 90°)',
      'Right angle (= 90°)',
      'Obtuse angle (between 90° and 180°)',
      'Reflex angle (between 180° and 360°)',
    ],
    correctIndex: 2,
    explanation: 'An angle measuring strictly between 90° and 180° is an obtuse angle. Since 90° < 135° < 180°, it is obtuse.',
    hints: [
      'Compare 135° with the key boundaries: 90° and 180°.',
      '135° is greater than a right angle (90°) but less than a straight angle (180°).',
      'Angles in the range (90°, 180°) are termed obtuse.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_f03_triangles',
    nodeId: NODE_C6_MATH_063,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A roof truss has side lengths of 6 m, 6 m, and 6 m. What is the side-based and angle-based classification of this triangle?',
    options: [
      'Equilateral and acute-angled (all sides equal, each angle 60°)',
      'Isosceles and right-angled',
      'Scalene and obtuse-angled',
      'Equilateral and obtuse-angled',
    ],
    correctIndex: 0,
    explanation: 'When all three sides are equal (6 m each), it is an equilateral triangle. An equilateral triangle is always acute-angled because all three angles measure 60° (< 90°).',
    hints: [
      'All 3 sides are equal in length, so look for "equilateral".',
      'In an equilateral triangle, all three angles are equal to 60°.',
      'Since 60° < 90°, it is simultaneously acute-angled.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_f04_quads',
    nodeId: NODE_C6_MATH_064,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A skylight pane has exactly ONE pair of opposite parallel sides (the top base and bottom base). What shape is it?',
    options: [
      'Parallelogram',
      'Trapezium',
      'Rhombus',
      'Rectangle',
    ],
    correctIndex: 1,
    explanation: 'A convex quadrilateral with exactly one pair of opposite sides parallel is defined as a trapezium.',
    hints: [
      'Count the number of parallel pairs: exactly one pair, not two.',
      'A parallelogram has two pairs of parallel sides; a trapezium has only one pair.',
      'Therefore, the skylight is a trapezium.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_f05_drag_polygons',
    nodeId: NODE_C6_MATH_065,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Drag the correct polygon names to their side-count targets on the pavilion floor-plan diagram.',
    dragItems: [
      { label: 'Pentagon', targetId: 'side_5' },
      { label: 'Hexagon', targetId: 'side_6' },
      { label: 'Heptagon', targetId: 'side_7' },
      { label: 'Octagon', targetId: 'side_8' },
    ],
    correctMapping: {
      side_5: 'Pentagon',
      side_6: 'Hexagon',
      side_7: 'Heptagon',
      side_8: 'Octagon',
    },
    explanation: 'Polygons are named by their side counts: 5 sides = Pentagon, 6 sides = Hexagon, 7 sides = Heptagon, 8 sides = Octagon.',
    hints: [
      'Penta means 5; Hexa means 6.',
      'Hepta means 7; Octa means 8 (like an octopus with 8 arms).',
      'Match side_5 -> Pentagon, side_6 -> Hexagon, side_7 -> Heptagon, side_8 -> Octagon.',
    ],
  },
  {
    id: 'ch_f06_3d_shapes',
    nodeId: NODE_C6_MATH_066,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following 3-D solid shapes has ONLY one curved surface, NO flat faces, NO edges, and NO vertices?',
    options: [
      'Cylinder',
      'Sphere',
      'Cone',
      'Hemisphere',
    ],
    correctIndex: 1,
    explanation: 'A sphere is a perfectly round 3-D solid with only one curved surface. It has 0 flat faces, 0 edges, and 0 vertices.',
    hints: [
      'A cylinder has 2 flat circular faces; a cone has 1 flat circular face.',
      'Think of a football or a marble.',
      'A sphere has no flat faces and no corners at all.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_f07_elements',
    nodeId: NODE_C6_MATH_067,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How many edges does a standard cube (or rectangular cuboid) have in total?',
    correctAnswer: 12,
    tolerance: 0,
    unit: 'edges',
    explanation: 'A cube/cuboid has 6 faces, 12 edges (4 on top, 4 on bottom, 4 vertical), and 8 vertices.',
    hints: [
      'Count the 4 edges around the top face, 4 around the bottom face, and 4 vertical posts.',
      '4 + 4 + 4 = 12 edges.',
      'Enter 12.',
    ],
  },
  {
    id: 'ch_f08_symmetry',
    nodeId: NODE_C6_MATH_069,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When a paper heart cut-out is folded along its vertical centre line, the left and right halves cover each other perfectly. What is this fold line called?',
    options: [
      'Axis / Line of Symmetry',
      'Diagonal of Rotation',
      'Perpendicular Bisector of the Room',
      'Asymmetric Dividing Border',
    ],
    correctIndex: 0,
    explanation: 'A line about which a 2-D figure can be folded such that both halves coincide exactly is called the axis or line of symmetry.',
    hints: [
      'The fold line acts like a mirror between the two matching halves.',
      'It creates reflection symmetry.',
      'The term is "Axis / Line of Symmetry".',
    ],
  },

  // ── STANDARD TIER (7) ──
  {
    id: 'ch_s01_angle_reflex',
    nodeId: NODE_C6_MATH_062,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'At 5:00 on the pavilion clock tower, the smaller interior angle between the hour and minute hands is 150°. What is the measure and classification of the LARGER exterior angle around the dial?',
    options: [
      '210° — Reflex angle',
      '180° — Straight angle',
      '210° — Obtuse angle',
      '300° — Complete angle',
    ],
    correctIndex: 0,
    explanation: 'A complete rotation is 360°. The larger angle is 360° - 150° = 210°. Because 180° < 210° < 360°, it is classified as a reflex angle.',
    hints: [
      'The sum of the smaller and larger angles around a point is 360° (complete turn).',
      '360° - 150° = 210°.',
      'Any angle between 180° and 360° is a reflex angle.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_s02_quad_hierarchy',
    nodeId: NODE_C6_MATH_064,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A diamond-shaped solar panel has four equal sides (80 cm each) and opposite sides parallel, but its angles measure 70° and 110°. Why is it a RHOMBUS and NOT a SQUARE?',
    options: [
      'Because all four sides are equal, but the interior angles are not 90° right angles',
      'Because a rhombus has only 3 sides while a square has 4',
      'Because its diagonals are equal in length',
      'Because a rhombus cannot have parallel sides',
    ],
    correctIndex: 0,
    explanation: 'A square requires BOTH four equal sides AND four 90° angles. A rhombus has four equal sides, but its angles need only be equal in opposite pairs. Without 90° angles, it is a rhombus, not a square.',
    hints: [
      'Check the angles: are they 90°?',
      'No, the angles are 70° and 110°.',
      'Four equal sides without right angles defines a rhombus.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_s03_polygon_regularity',
    nodeId: NODE_C6_MATH_065,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A classroom whiteboard is a rectangle of 2 m length and 1 m width. All four angles are 90°. A student calls it a "regular polygon". Evaluate this claim.',
    options: [
      'Incorrect: A regular polygon requires BOTH all sides equal and all angles equal. The whiteboard has unequal adjacent sides.',
      'Correct: Having all angles equal to 90° is sufficient to be regular.',
      'Correct: Every four-sided polygon is regular.',
      'Incorrect: A rectangle is not a polygon at all because it is convex.',
    ],
    correctIndex: 0,
    explanation: 'Regularity is a joint condition requiring all sides to be equal AND all angles to be equal. A rectangle (non-square) has equal angles (90°) but unequal sides (2 m ≠ 1 m), making it non-regular (irregular).',
    hints: [
      'Recall the definition of a regular polygon: ALL sides equal AND ALL angles equal.',
      'Are the lengths 2 m and 1 m equal?',
      'No! Therefore, the rectangle is an irregular (non-regular) quadrilateral.',
    ],
  },
  {
    id: 'ch_s04_cylinder_net',
    nodeId: NODE_C6_MATH_068,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'When unrolling the metal sheet forming the curved surface of a cylindrical water tank of radius r and height h, what 2-D shape do you get, and what is its length?',
    options: [
      'A rectangle of length equal to the base circumference (2πr) and breadth equal to height (h)',
      'A circle of radius h and diameter 2πr',
      'A triangle of base 2πr and height h',
      'A sector of a circle with radius equal to r',
    ],
    correctIndex: 0,
    explanation: 'The curved surface of a cylinder unrolls into a flat rectangle. Its length must wrap completely around the circular base (circumference = 2πr), and its width/breadth is the cylinder height h.',
    hints: [
      'Imagine peeling the paper label off a tin can.',
      'The label is a rectangle.',
      'Its length equals the boundary around the circle (circumference 2πr) and breadth is h.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_s05_cone_net',
    nodeId: NODE_C6_MATH_068,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'When a paper party hat (cone) is sliced along its slant edge and flattened, what shape is the curved surface net?',
    options: [
      'A sector of a circle (pizza-slice shape) with radius equal to the slant height',
      'A flat triangle with straight edges',
      'A semi-circle only if the height is zero',
      'A rectangle of length equal to the slant height',
    ],
    correctIndex: 0,
    explanation: 'A cone\'s curved surface unrolls into a sector of a circle. The radius of this sector equals the slant height l of the cone, and its arc length matches the base circumference 2πr.',
    hints: [
      'A cone viewed from the side looks like a triangle, but its unfolded net is NOT a triangle.',
      'The edge wraps around a circle, so the cut pattern has a curved arc.',
      'It is a sector of a larger circle.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_s06_tetrahedron_elements',
    nodeId: NODE_C6_MATH_067,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A regular tetrahedral pyramid canopy is built with 4 equilateral triangular faces. How many vertices does it have?',
    correctAnswer: 4,
    tolerance: 0,
    unit: 'vertices',
    explanation: 'A tetrahedron has 4 triangular faces, 6 edges, and 4 vertices (3 on the triangular base + 1 apex at top).',
    hints: [
      'Count the 3 base corners plus the single apex point where the 3 triangular sides meet.',
      '3 + 1 = 4 vertices.',
      'Enter 4.',
    ],
  },
  {
    id: 'ch_s07_rect_symmetry',
    nodeId: NODE_C6_MATH_070,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How many axes (lines) of reflection symmetry does a NON-SQUARE rectangular glass pane have?',
    correctAnswer: 2,
    tolerance: 0,
    unit: 'axes',
    explanation: 'A non-square rectangle has exactly 2 axes of symmetry: one vertical midline and one horizontal midline. Its diagonals are NOT lines of symmetry because folding along a diagonal causes corners to stick out.',
    hints: [
      'Test vertical and horizontal folds: both halves match.',
      'Test diagonal fold: the corners do not cover each other (they stick out).',
      'Therefore, only 2 axes exist (vertical & horizontal).',
    ],
    misconceptionIndex: 2,
  },

  // ── ADVANCED TIER (7) ──
  {
    id: 'ch_a01_sort_geometry',
    nodeId: NODE_C6_MATH_064,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the quadrilateral classifications in order of INCREASING constraints (from most general to most strictly defined special shape).',
    sortItems: [
      'Convex Quadrilateral (4 line segments enclosing a plane)',
      'Trapezium (at least 1 pair of opposite sides parallel)',
      'Parallelogram (both pairs of opposite sides parallel & equal)',
      'Rectangle (parallelogram with all 4 angles equal to 90°)',
      'Square (rectangle with all 4 sides equal + diagonals perpendicular)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Hierarchy of quadrilaterals: Any 4-sided closed figure -> Trapezium (1 pair parallel) -> Parallelogram (2 pairs parallel) -> Rectangle (all 90° angles) -> Square (all sides equal and all 90° angles).',
    hints: [
      'Start with the broad 4-sided figure with fewest restrictions.',
      'Next comes 1 pair parallel (trapezium), then 2 pairs (parallelogram).',
      'Adding 90° gives rectangle; adding equal sides gives the square.',
    ],
  },
  {
    id: 'ch_a02_euler_polyhedra',
    nodeId: NODE_C6_MATH_067,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Verify Euler\'s Formula (Faces + Vertices = Edges + 2) for a triangular prism pavilion tent (5 faces, 6 vertices). What is the total number of EDGES?',
    correctAnswer: 9,
    tolerance: 0,
    unit: 'edges',
    explanation: 'For a triangular prism: Faces (F) = 5 (2 triangular ends + 3 rectangular sides), Vertices (V) = 6. Using F + V = E + 2: 5 + 6 = E + 2 => 11 = E + 2 => E = 9 edges (3 on front triangle, 3 on back triangle, 3 connecting bars).',
    hints: [
      'Use the formula: F + V = E + 2.',
      'Substitute F = 5 and V = 6: 5 + 6 = 11.',
      '11 - 2 = 9 edges.',
    ],
  },
  {
    id: 'ch_a03_construct_hierarchy',
    nodeId: NODE_C6_MATH_064,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the definition of a SQUARE by selecting the correct property tags in logical sequence.',
    availableParts: [
      'Parallelogram',
      'with 4 equal sides',
      'and 4 right angles (90°)',
      'and unequal diagonals',
      'with only 1 parallel pair',
    ],
    targetState: 'Parallelogram with 4 equal sides and 4 right angles (90°)',
    validationHint: 'A square is a parallelogram that has both equal sides and four 90° angles.',
    explanation: 'A square is formally defined as a parallelogram having all four sides equal (rhombus property) and all four interior angles equal to 90° (rectangle property).',
    hints: [
      'A square is rooted in the Parallelogram family.',
      'Add the equal sides property ("with 4 equal sides").',
      'Add the right angle property ("and 4 right angles (90°)").',
    ],
  },
  {
    id: 'ch_a04_tri_angles',
    nodeId: NODE_C6_MATH_063,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An apprentice drafts a pavilion support claiming it is a "triangle with two right angles (90° and 90°) and one 30° angle". Evaluate whether this triangle can exist.',
    options: [
      'Impossible: A triangle can have at most ONE right angle or ONE obtuse angle because two 90° angles would produce parallel lines that never meet to form a 3rd vertex.',
      'Possible: Any three angles can form a triangle if the sides are long enough.',
      'Possible: It is called a bi-perpendicular triangle.',
      'Impossible: Because all triangles must have three 60° angles.',
    ],
    correctIndex: 0,
    explanation: 'A triangle can have at most one right angle (90°) or one obtuse angle (> 90°). If two angles are 90°, the two arms would be perpendicular to the base and parallel to each other, never meeting at a 3rd vertex.',
    hints: [
      'Imagine drawing a base line and two vertical 90° lines going up from each end.',
      'Two lines perpendicular to the same base are parallel to each other.',
      'Parallel lines never meet, so they cannot close into a triangle!',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_a05_square_axes',
    nodeId: NODE_C6_MATH_070,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How many total axes of reflection symmetry does a regular square pavilion floor tile possess? (Count vertical, horizontal, and diagonal axes)',
    correctAnswer: 4,
    tolerance: 0,
    unit: 'axes',
    explanation: 'A square has 4 axes of symmetry: 1 vertical line, 1 horizontal line, and 2 diagonal lines. Folding along any of these 4 lines produces perfectly coinciding halves.',
    hints: [
      'Vertical midline = 1 axis.',
      'Horizontal midline = 1 axis.',
      'Two diagonal corner-to-corner folds = 2 axes. 1 + 1 + 2 = 4 axes.',
    ],
  },
  {
    id: 'ch_a06_equilateral_symmetry',
    nodeId: NODE_C6_MATH_070,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'How many axes of symmetry does an EQUILATERAL triangular window have? (Lines connecting each vertex to the midpoint of opposite side)',
    correctAnswer: 3,
    tolerance: 0,
    unit: 'axes',
    explanation: 'An equilateral triangle has 3 axes of symmetry, each passing through one vertex and the midpoint of the opposite side. (An isosceles has 1; a scalene has 0).',
    hints: [
      'From each of the 3 vertices, draw a straight line to the midpoint of the opposite side.',
      'Because all three sides and angles are equal, all 3 lines are valid fold axes.',
      'Enter 3.',
    ],
  },
  {
    id: 'ch_a07_stop_sign_octagon',
    nodeId: NODE_C6_MATH_065,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A traffic stop sign is a REGULAR OCTAGON. How many vertices and how many interior angles does it have in total?',
    correctAnswer: 8,
    tolerance: 0,
    unit: 'vertices',
    explanation: 'In any simple polygon, the number of sides, vertices, and interior angles is always equal. An octagon has 8 sides, 8 vertices, and 8 interior angles.',
    hints: [
      'Octa means 8.',
      'Number of sides = Number of vertices = Number of interior angles.',
      'Enter 8.',
    ],
  },
];

// ─── DEFAULT PROPS ──────────────────────────────────────────────────────────
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
  nodeId: NODE_C6_MATH_061,
  title: 'Geometry & Spatial Sense: Lines, Angles, Shapes, Nets & Symmetry',
  definition:
    'Comprehensive study of lines (intersecting, perpendicular, parallel), seven angle types, triangles, convex quadrilaterals, polygons up to octagons, 3D solids (elements & nets), and reflection symmetry axes.',
  eli5:
    'Think of geometry like building with magical sticks and paper! Straight sticks can cross, form square corners, or run side-by-side forever like train tracks. Open them to make angles, connect them into triangles and polygons, fold flat nets into 3D boxes and pyramids, and use mirrors to discover perfect symmetry!',
  misconceptions: [
    {
      misconception: 'Perpendicular lines are not intersecting lines.',
      correction: 'Perpendicular lines ARE intersecting lines — they are the special case where lines intersect at exactly 90 degrees.',
    },
    {
      misconception: 'A 180° angle is just a large obtuse angle.',
      correction: 'An obtuse angle is strictly between 90° and 180°. Exactly 180° is a distinct category called a straight angle.',
    },
    {
      misconception: 'The diagonals of every rectangle are lines of symmetry.',
      correction: 'In a non-square rectangle, folding along a diagonal leaves corners sticking out. Only a square has diagonal lines of symmetry.',
    },
    {
      misconception: 'A square and a rhombus are the same thing.',
      correction: 'A rhombus has 4 equal sides, but its angles need not be 90°. A square is a special rhombus with four 90° right angles.',
    },
    {
      misconception: 'The net of a cone is a flat triangle.',
      correction: 'The unrolled curved surface of a cone is a sector of a circle (pizza-slice shape) with radius equal to the slant height.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Two lines in the same plane that never meet and stay equal distance apart are:',
      options: ['Parallel lines', 'Perpendicular lines', 'Intersecting lines', 'Collinear rays'],
      correctIndex: 0,
    },
    {
      question: 'An angle measuring 240° is classified as:',
      options: ['Acute', 'Obtuse', 'Reflex', 'Complete'],
      correctIndex: 2,
    },
    {
      question: 'An equilateral triangle has all 3 sides equal. Its angles are always:',
      options: ['All 90°', 'All 60° (acute)', 'One 120° and two 30°', 'Different measures'],
      correctIndex: 1,
    },
    {
      question: 'A quadrilateral with exactly ONE pair of parallel sides is a:',
      options: ['Trapezium', 'Parallelogram', 'Rhombus', 'Rectangle'],
      correctIndex: 0,
    },
    {
      question: 'A simple polygon with 7 sides is called a:',
      options: ['Pentagon', 'Hexagon', 'Heptagon', 'Octagon'],
      correctIndex: 2,
    },
    {
      question: 'How many vertices does a cone have?',
      options: ['0', '1 (the apex)', '2', '3'],
      correctIndex: 1,
    },
    {
      question: 'How many faces, edges, and vertices does a cube have?',
      options: ['6 faces, 12 edges, 8 vertices', '6 faces, 8 edges, 12 vertices', '8 faces, 12 edges, 6 vertices', '4 faces, 6 edges, 4 vertices'],
      correctIndex: 0,
    },
    {
      question: 'How many lines of symmetry does a regular square have?',
      options: ['2', '4', '6', 'Infinitely many'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Student accurately classifies lines, angles, triangles, quadrilaterals, and polygons; calculates 3D solid elements (F, E, V); identifies valid nets; and locates all axes of reflection symmetry.',
};

// ─── EXPLORATION STEPS (5 INTERACTIVE BRILLIANT-STYLE LABS) ─────────────────
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Lines & Angle Studio',
    instruction: 'Drag the rotation slider to change line orientation and watch the angle classification and perpendicularity gauge update in real-time!',
    interactionType: 'slider-angle',
    nodeId: NODE_C6_MATH_061,
  },
  {
    title: 'Lab 2: Triangle Morphing Lab',
    instruction: 'Move the triangle vertex handles to morph the shape between Equilateral, Isosceles, Scalene, Right, and Obtuse triangles!',
    interactionType: 'drag-triangle',
    nodeId: NODE_C6_MATH_063,
  },
  {
    title: 'Lab 3: Polygon Generator (3 to 8 sides)',
    instruction: 'Adjust the side-count slider to dynamically construct polygons from Triangle to Octagon and toggle Regular vs Irregular modes!',
    interactionType: 'slider-polygon',
    nodeId: NODE_C6_MATH_065,
  },
  {
    title: 'Lab 4: 3-D Solid Net Unfolding Station',
    instruction: 'Slide the fold percentage to watch a flat 2-D net assemble into a 3-D solid (Cube, Cylinder, Cone, Tetrahedron) and inspect Faces, Edges & Vertices!',
    interactionType: 'slider-net',
    nodeId: NODE_C6_MATH_068,
  },
  {
    title: 'Lab 5: Mirror Symmetry & Reflection Axis',
    instruction: 'Select different shapes and toggle symmetry axes (vertical, horizontal, diagonal) to observe the mirror reflection in action!',
    interactionType: 'click-symmetry',
    nodeId: NODE_C6_MATH_070,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ──────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you rotate one of two perpendicular lines by exactly 90°, what relationship will the two lines form?',
    options: [
      'They will become parallel lines (or overlap as the same line)',
      'They will stay perpendicular at 90°',
      'They will turn into a triangle',
      'They will curve into a circle',
    ],
    correctIndex: 0,
    verifyInstruction: 'Drag the angle slider in Lab 1 to 0° or 180° to test your prediction!',
    nodeId: NODE_C6_MATH_061,
  },
  {
    question: 'Predict: If you unfold a cylinder of radius 10 cm and height 20 cm, what will the length of the rectangular sheet be?',
    options: [
      '20 cm (the height)',
      'Approximately 62.8 cm (the circumference 2 × π × 10 cm)',
      '10 cm (the radius)',
      '100 cm',
    ],
    correctIndex: 1,
    verifyInstruction: 'Select the Cylinder in Lab 4 and unfold the net to verify the circumference equation!',
    nodeId: NODE_C6_MATH_068,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In the Triangle Morphing Lab, what happens when you set two side lengths equal while keeping one angle at 90°?',
    observableOptions: [
      'It becomes an Isosceles Right-angled Triangle',
      'It becomes an Equilateral Triangle',
      'It becomes an Obtuse Scalene Triangle',
      'A triangle cannot have a 90° angle',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_MATH_063,
  },
  {
    question: 'Observation: In the Symmetry Lab, what happens when you attempt to fold a non-square rectangle along its diagonal?',
    observableOptions: [
      'The corners stick out and do NOT coincide — diagonals are not axes of symmetry for rectangles',
      'The two halves cover each other perfectly',
      'It turns into a square',
      'The area doubles',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_MATH_070,
  },
];

// ─── REAL WORLD ACTIVITY ────────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'Junior Geometric Surveyor Challenge',
  description: 'Walk around your home or school campus. Find 1 example of parallel lines (e.g. window bars), 1 perpendicular intersection (door frame), 1 regular polygon (hexagonal tile or stop sign), and 1 3-D object (can or tissue box). Sketch their symmetry axes and count their faces, edges, and vertices!',
  steps: [
    'Identify parallel lines and measure the constant perpendicular gap between them',
    'Locate a 90° perpendicular corner and verify with the corner of a notebook',
    'Find a 3-D solid, draw its flat unfolding net on paper, and cut & fold it',
    'Test your cut-out by folding along candidate axes to identify true reflection symmetry',
  ],
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
function C6_MathematicsPairLinesIntersectingSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C6_MATH_061,
  title = DEFAULT_PROPS.title || 'Geometry & Spatial Sense',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['mathematics'] || { name: 'Mathematics', emoji: '📐', color: 'blue' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);

  // Brilliant-style exploration & predict-then-check state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Lab state
  const [angleSlider, setAngleSlider] = useState(90); // 0 to 360 degrees
  const [parallelSpacing, setParallelSpacing] = useState(40);
  const [triVertexX, setTriVertexX] = useState(150);
  const [triVertexY, setTriVertexY] = useState(40);
  const [polygonSides, setPolygonSides] = useState(6);
  const [isRegularPolygon, setIsRegularPolygon] = useState(true);
  const [selectedSolid, setSelectedSolid] = useState<'cube' | 'cylinder' | 'cone' | 'tetrahedron'>('cube');
  const [netFoldProgress, setNetFoldProgress] = useState(0); // 0 = flat net, 100 = folded 3D
  const [activeSymmetryShape, setActiveSymmetryShape] = useState<'square' | 'rectangle' | 'equilateral_tri' | 'circle' | 'heart'>('square');
  const [showVerticalAxis, setShowVerticalAxis] = useState(true);
  const [showHorizontalAxis, setShowHorizontalAxis] = useState(false);
  const [showDiagonalAxis, setShowDiagonalAxis] = useState(false);
  const [isFoldedMirror, setIsFoldedMirror] = useState(false);

  // Sandbox variables
  const [sandboxLineType, setSandboxLineType] = useState<'intersecting' | 'perpendicular' | 'parallel'>('perpendicular');
  const [sandboxAngle, setSandboxAngle] = useState(45);
  const [sandboxShapeScale, setSandboxShapeScale] = useState(1);
  const [sandboxSolidInspect, setSandboxSolidInspect] = useState<'cube' | 'cuboid' | 'pyramid' | 'prism'>('cube');

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
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Sort & Numeric & Construct state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY ADAPTIVE DIFFICULTY ───────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD MASTERY (MOUNT) ─────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT-BASED ADAPTIVE DIFFICULTY EFFECT ─────────────────────────────────
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty: 'foundation' | 'standard' | 'advanced' =
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

  // ─── CANVAS 2-D ANIMATION EFFECT ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw dynamic glowing geometric coordinate grid
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

      // Animated rotating geometric polygon aura
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = 35 + Math.sin(t * 2) * 5;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.5);
      ctx.beginPath();
      const n = 6; // Hexagon
      for (let i = 0; i < n; i++) {
        const a = (i * 2 * Math.PI) / n;
        const px = radius * Math.cos(a);
        const py = radius * Math.sin(a);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      animFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // ─── DERIVED ANGLE NAME ───────────────────────────────────────────────────
  const angleCategoryName = useMemo(() => {
    const a = angleSlider;
    if (a === 0) return 'Zero Angle (0°)';
    if (a > 0 && a < 90) return `Acute Angle (${a}°)`;
    if (a === 90) return 'Right Angle (90° — Perpendicular ⊥)';
    if (a > 90 && a < 180) return `Obtuse Angle (${a}°)`;
    if (a === 180) return 'Straight Angle (180° — Straight Line)';
    if (a > 180 && a < 360) return `Reflex Angle (${a}°)`;
    return 'Complete / Full Angle (360°)';
  }, [angleSlider]);

  // ─── DERIVED TRIANGLE INFO ───────────────────────────────────────────────
  const triangleInfo = useMemo(() => {
    const ax = 50, ay = 180;
    const bx = 250, by = 180;
    const cx = triVertexX, cy = triVertexY;

    const c = Math.hypot(bx - ax, by - ay); // Base length = 200
    const a = Math.hypot(cx - bx, cy - by);
    const b = Math.hypot(cx - ax, cy - ay);

    const diffAB = Math.abs(a - b);
    const diffBC = Math.abs(b - c);
    const diffCA = Math.abs(c - a);
    let sideType = 'Scalene (no equal sides)';
    if (diffAB < 6 && diffBC < 6) {
      sideType = 'Equilateral (all 3 sides equal)';
    } else if (diffAB < 6 || diffBC < 6 || diffCA < 6) {
      sideType = 'Isosceles (2 equal sides)';
    }

    const cosC = (a * a + b * b - c * c) / (2 * a * b);
    const angleCDeg = Math.round((Math.acos(Math.max(-1, Math.min(1, cosC))) * 180) / Math.PI);

    let angleType = 'Acute-angled (all angles < 90°)';
    if (Math.abs(angleCDeg - 90) <= 4 || (Math.abs(cx - 50) < 5 && cy < 180) || (Math.abs(cx - 250) < 5 && cy < 180)) {
      angleType = 'Right-angled (one 90° angle, hypotenuse marked)';
    } else if (angleCDeg > 94) {
      angleType = `Obtuse-angled (vertex angle ${angleCDeg}° > 90°)`;
    }

    return {
      sideA: Math.round(a),
      sideB: Math.round(b),
      sideC: Math.round(c),
      angleC: angleCDeg,
      sideType,
      angleType,
    };
  }, [triVertexX, triVertexY]);

  // ─── DERIVED SOLID NET DATA ───────────────────────────────────────────────
  const solidDetails = useMemo(() => {
    switch (selectedSolid) {
      case 'cube':
        return {
          name: 'Cube',
          faces: 6,
          edges: 12,
          vertices: 8,
          faceShape: '6 identical squares',
          description: '6 equal square faces meeting at 90° angles.',
        };
      case 'cylinder':
        return {
          name: 'Cylinder',
          faces: 3,
          edges: 2,
          vertices: 0,
          faceShape: '2 flat circles + 1 unrolled rectangle (2πr × h)',
          description: '2 flat circular bases and 1 unrolled rectangular curved surface.',
        };
      case 'cone':
        return {
          name: 'Cone',
          faces: 2,
          edges: 1,
          vertices: 1,
          faceShape: '1 circular base + 1 circle sector (radius = slant height)',
          description: '1 flat circular base and 1 pizza-slice sector narrowing to apex.',
        };
      case 'tetrahedron':
        return {
          name: 'Regular Tetrahedron (Triangular Pyramid)',
          faces: 4,
          edges: 6,
          vertices: 4,
          faceShape: '4 equilateral triangles',
          description: '4 equilateral triangles folding into a pyramid.',
        };
    }
  }, [selectedSolid]);

  // ─── DERIVED SYMMETRY AXES COUNT ──────────────────────────────────────────
  const symmetryInfo = useMemo(() => {
    switch (activeSymmetryShape) {
      case 'square':
        return { name: 'Square', axes: 4, types: 'Vertical, Horizontal, 2 Diagonals' };
      case 'rectangle':
        return { name: 'Non-Square Rectangle', axes: 2, types: 'Vertical midline & Horizontal midline (Diagonals FAIL fold test)' };
      case 'equilateral_tri':
        return { name: 'Equilateral Triangle', axes: 3, types: '3 lines from each vertex to opposite side midpoint' };
      case 'circle':
        return { name: 'Circle', axes: Infinity, types: 'Infinitely many (every diameter is an axis)' };
      case 'heart':
        return { name: 'Symmetric Heart Motif', axes: 1, types: '1 Vertical central axis only' };
    }
  }, [activeSymmetryShape]);

  // ─── CALLBACKS ────────────────────────────────────────────────────────────

  // 1. Discovery Answer
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const correct = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoverySelected(idx);
    setDiscoveryCorrect(correct);
    setDiscoveryAnswered(true);
    audioManager.play(correct ? 'success' : 'pop');
    speechManager.speak(
      correct
        ? 'Excellent observation! Parallel lines stay equal distance apart and never cross.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  // 2. Advance to Exploration
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Geometric Pavilion Interactive Labs! Let us explore by doing.');
  }, []);

  // 3. Advance to Sandbox
  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Play with shapes and lines without grading pressure!');
  }, []);

  // 4. Advance to Challenges
  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Prepare for the Architect Competency Challenges!');
  }, []);

  // 5. Predict handler
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Now drag the controls to verify what happens.');
  }, []);

  // 6. Observation handler
  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on observation!' : 'Look closely at how the edges and angles align.');
  }, []);

  // 7. Escalating hints handler
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
      speechManager.speak('Here is the full step-by-step mathematical reasoning.');
    }
  }, [hintCount, challenge]);

  // 8. Inactivity timer reset
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // 9. Completion handler
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Pavilion Construction Certified! Outstanding geometric mastery.');
  }, [errors, onComplete]);

  // 10. Next challenge handler
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

  // 11. Core Answer handler
  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string, event?: React.MouseEvent) => {
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
        isCorrect = (answer as string).trim() === challenge.targetState?.trim();
      }

      if (event) {
        setSparklePos({ x: event.clientX, y: event.clientY });
        setShowSparkle(true);
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Well done.');
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
          speechManager.speak('Let us study the complete solution together.');

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

  // 12. Drag Start
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  // 13. Drag Drop
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

  // 14. Sort Move
  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        let base = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
        const [moved] = base.splice(fromIdx, 1);
        base.splice(toIdx, 0, moved);
        return base;
      });
    },
    [challenge]
  );

  // 15. Sort Submit
  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // 16. Cleanup on Unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── RENDER ────────────────────────────────────────────────��──────────────
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ── HEADER & BREADCRUMBS ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-800">
                Class 6 ICSE Math
              </span>
              <span className="text-xs text-slate-400">Node Cluster: c6_math_061 to 070</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                phase === p
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* ── PHASE 1: DISCOVERY HOOK ─��� */}
        {phase === 'discovery' && (
          <motion.div
            key="discovery-phase"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="space-y-6"
          >
            {/* Narrative Scenario Hero */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden p-6 md:p-8 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-700/40 shadow-xl"
            >
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-800/60 inline-block mb-3">
                  🏛️ Architect Mission Briefing
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">{SCENARIO.title}</h2>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">{SCENARIO.intro}</p>
                <p className="text-xs text-indigo-300 bg-indigo-950/50 p-3 rounded-xl border border-indigo-900">
                  💡 <span className="font-semibold text-white">Your Mission:</span> {SCENARIO.context}
                </p>
              </div>
              {/* Background Canvas Visual */}
              <div className="absolute right-4 top-4 hidden md:block w-48 h-48 opacity-40 pointer-events-none">
                <canvas ref={canvasRef} width={200} height={200} className="w-full h-full" />
              </div>
            </motion.div>

            {/* Curiosity Hook Interaction */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-800/60 rounded-2xl border border-slate-700/60 shadow-lg"
            >
              <h3 className="text-lg font-bold text-amber-300 mb-2">🤔 Warm-Up Curiosity Question</h3>
              <p className="text-white text-base font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={discoveryAnswered}
                    onClick={() => handleDiscoveryAnswer(i)}
                    className={`p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                      discoverySelected === i
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-900/70 border-emerald-500 text-emerald-100'
                          : 'bg-rose-900/70 border-rose-500 text-rose-100'
                        : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-indigo-400">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-4 rounded-xl bg-indigo-950/60 border border-indigo-700 flex flex-wrap items-center justify-between gap-4"
                >
                  <div>
                    <p
                      className={`text-sm font-bold ${
                        discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {discoveryCorrect ? '✓ Spot on intuition!' : '💡 Great attempt!'}
                    </p>
                    <p className="text-xs text-slate-300 mt-1">{DISCOVERY_QUESTION.hintAfter}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ── PHASE 2: INTERACTIVE GUIDED EXPLORATION ── */}
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Exploration Step Bar */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between bg-slate-950 p-3 rounded-2xl border border-slate-800"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-950 px-2.5 py-1 rounded-md border border-indigo-800">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h3 className="text-sm md:text-base font-bold text-white">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
              </div>
              <div className="flex items-center gap-1.5">
                {EXPLORATION_STEPS.map((_, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ width: idx === currentSlide ? 24 : 8 }}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentSlide ? 'bg-indigo-500' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs md:text-sm text-amber-300 bg-amber-950/40 p-3 rounded-xl border border-amber-900/60"
            >
              👉 <span className="font-semibold">Your Action:</span>{' '}
              {EXPLORATION_STEPS[currentSlide].instruction}
            </motion.p>

            {/* ── VISUAL LAB CONTAINER ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-950/80 rounded-2xl p-4 md:p-6 border border-slate-800 min-h-[420px] relative shadow-inner"
            >
              {/* LAB 1: LINES & ANGLE STUDIO */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Interactive SVG Diagram */}
                    <div className="lg:col-span-2 bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-center min-h-[280px]">
                      <svg viewBox="0 0 400 300" className="w-full max-w-md h-auto">
                        <defs>
                          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="400" height="300" fill="url(#grid)" />

                        {/* Base Fixed Horizontal Line */}
                        <line x1="40" y1="200" x2="360" y2="200" stroke="#64748b" strokeWidth="4" strokeDasharray="6,4" />
                        <circle cx="200" cy="200" r="5" fill="#38bdf8" />
                        <text x="200" y="225" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
                          Vertex O (200, 200)
                        </text>

                        {/* Rotating Arm */}
                        {(() => {
                          const rad = (angleSlider * Math.PI) / 180;
                          const len = 140;
                          const endX = 200 + len * Math.cos(-rad);
                          const endY = 200 + len * Math.sin(-rad);

                          const arcR = 40;
                          const arcEndX = 200 + arcR * Math.cos(-rad);
                          const arcEndY = 200 + arcR * Math.sin(-rad);
                          const largeArcFlag = angleSlider > 180 ? 1 : 0;

                          return (
                            <g>
                              {angleSlider > 0 && angleSlider < 360 && (
                                <path
                                  d={`M 240 200 A ${arcR} ${arcR} 0 ${largeArcFlag} 0 ${arcEndX} ${arcEndY}`}
                                  fill="none"
                                  stroke="#f59e0b"
                                  strokeWidth="3"
                                />
                              )}
                              {angleSlider === 90 && (
                                <rect x="200" y="175" width="25" height="25" fill="none" stroke="#22c55e" strokeWidth="2.5" />
                              )}

                              <line x1="200" y1="200" x2={endX} y2={endY} stroke="#38bdf8" strokeWidth="4" />
                              <circle cx={endX} cy={endY} r="7" fill="#f59e0b" />
                              <text x={endX + 10} y={endY} fill="#f59e0b" fontSize="11" fontWeight="bold">
                                Arm D ({angleSlider}°)
                              </text>
                            </g>
                          );
                        })()}
                      </svg>
                    </div>

                    {/* Real-time Angle & Line Type Gauge */}
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4 bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xs uppercase font-bold text-indigo-400">Real-Time Classification</span>
                        <h4 className="text-lg font-black text-white mt-1">{angleCategoryName}</h4>

                        <div className="mt-4 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                          <p>
                            <span className="font-bold text-white">Line Relationship:</span>{' '}
                            {angleSlider === 90
                              ? 'Perpendicular (AB ⊥ CD at 90°)'
                              : angleSlider === 0 || angleSlider === 180
                              ? 'Collinear / Parallel arms'
                              : 'Intersecting at Vertex O'}
                          </p>
                          <p>
                            <span className="font-bold text-white">Rotation Amount:</span>{' '}
                            {Math.round((angleSlider / 360) * 100)}% of full turn
                          </p>
                        </div>
                      </div>

                      {/* Interactive Slider */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold text-slate-400">
                          <span>Rotate Arm: 0°</span>
                          <span className="text-amber-400 font-bold">{angleSlider}°</span>
                          <span>360°</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={360}
                          step={1}
                          value={angleSlider}
                          aria-label="Rotate line angle slider"
                          onChange={(e) => {
                            setAngleSlider(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Predict-Then-Check Hook inside Lab 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60"
                  >
                    {!predictionMade ? (
                      <div className="space-y-2">
                        <p className="text-xs font-bold uppercase text-amber-400">🔮 Predict-Then-Check</p>
                        <p className="text-sm text-white font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePrediction(i)}
                              className="p-2.5 text-left text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span>
                          ✅ Your Prediction locked! Test the rotation slider above to verify.
                        </span>
                        <span className="text-emerald-400 font-bold">Verified in Visual Studio</span>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}

              {/* LAB 2: TRIANGLE MORPHING LAB */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Dynamic SVG Triangle */}
                    <div className="lg:col-span-2 bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-center min-h-[280px]">
                      <svg viewBox="0 0 320 240" className="w-full max-w-md h-auto">
                        <line x1="50" y1="180" x2="250" y2="180" stroke="#64748b" strokeWidth="3" />
                        <line x1="50" y1="180" x2={triVertexX} y2={triVertexY} stroke="#38bdf8" strokeWidth="3" />
                        <line x1="250" y1="180" x2={triVertexX} y2={triVertexY} stroke="#f59e0b" strokeWidth="3" />

                        {/* Vertex Points */}
                        <circle cx="50" cy="180" r="6" fill="#38bdf8" />
                        <text x="35" y="195" fill="#94a3b8" fontSize="12" fontWeight="bold">A</text>
                        <circle cx="250" cy="180" r="6" fill="#f59e0b" />
                        <text x="260" y="195" fill="#94a3b8" fontSize="12" fontWeight="bold">B</text>
                        <circle cx={triVertexX} cy={triVertexY} r="9" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
                        <text x={triVertexX} y={triVertexY - 12} textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">
                          Vertex C ({triVertexX}, {triVertexY})
                        </text>

                        {/* Side Length Indicators */}
                        <text x="150" y="200" textAnchor="middle" fill="#64748b" fontSize="10">
                          Base = {triangleInfo.sideC}
                        </text>
                        <text x={(50 + triVertexX) / 2 - 15} y={(180 + triVertexY) / 2} fill="#38bdf8" fontSize="10">
                          b = {triangleInfo.sideB}
                        </text>
                        <text x={(250 + triVertexX) / 2 + 10} y={(180 + triVertexY) / 2} fill="#f59e0b" fontSize="10">
                          a = {triangleInfo.sideA}
                        </text>
                      </svg>
                    </div>

                    {/* Dual Classification Real-Time Panel */}
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4 bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xs uppercase font-bold text-indigo-400">Simultaneous Classifications</span>
                        <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                          <div>
                            <p className="text-xs text-slate-400 font-semibold">1. Basis of SIDES:</p>
                            <p className="text-sm font-bold text-emerald-400">{triangleInfo.sideType}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-semibold">2. Basis of ANGLES:</p>
                            <p className="text-sm font-bold text-amber-400">{triangleInfo.angleType}</p>
                          </div>
                        </div>
                      </div>

                      {/* Presets & Draggers */}
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-slate-400">Quick Shape Presets:</span>
                        <div className="grid grid-cols-3 gap-1.5">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setTriVertexX(150);
                              setTriVertexY(20);
                              audioManager.play('pop');
                            }}
                            className="px-2 py-1 text-xs bg-slate-800 hover:bg-slate-700 rounded text-slate-200"
                          >
                            Equilateral
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setTriVertexX(50);
                              setTriVertexY(50);
                              audioManager.play('pop');
                            }}
                            className="px-2 py-1 text-xs bg-slate-800 hover:bg-slate-700 rounded text-slate-200"
                          >
                            Right △
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setTriVertexX(270);
                              setTriVertexY(100);
                              audioManager.play('pop');
                            }}
                            className="px-2 py-1 text-xs bg-slate-800 hover:bg-slate-700 rounded text-slate-200"
                          >
                            Obtuse △
                          </motion.button>
                        </div>

                        <div className="pt-2">
                          <label className="text-xs text-slate-400">Move Vertex C (X Axis): {triVertexX}</label>
                          <input
                            type="range"
                            min={30}
                            max={270}
                            value={triVertexX}
                            aria-label="Move triangle vertex X"
                            onChange={(e) => {
                              setTriVertexX(Number(e.target.value));
                              audioManager.play('count');
                            }}
                            className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* LAB 3: POLYGON GENERATOR */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Polygon SVG Viewer */}
                    <div className="lg:col-span-2 bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-center min-h-[280px]">
                      <svg viewBox="0 0 300 300" className="w-full max-w-xs h-auto">
                        {(() => {
                          const cx = 150, cy = 150, r = 100;
                          const pts: { x: number; y: number }[] = [];
                          for (let i = 0; i < polygonSides; i++) {
                            const angle = (i * 2 * Math.PI) / polygonSides - Math.PI / 2;
                            const currentR = isRegularPolygon ? r : i % 2 === 0 ? r : r * 0.65;
                            pts.push({
                              x: cx + currentR * Math.cos(angle),
                              y: cy + currentR * Math.sin(angle),
                            });
                          }
                          const pointsStr = pts.map((p) => `${p.x},${p.y}`).join(' ');

                          return (
                            <g>
                              <polygon
                                points={pointsStr}
                                fill="rgba(99, 102, 241, 0.2)"
                                stroke="#6366f1"
                                strokeWidth="3"
                              />
                              {pts.map((p, idx) => (
                                <g key={idx}>
                                  <circle cx={p.x} cy={p.y} r="5" fill="#f59e0b" />
                                  <text x={p.x + (p.x > cx ? 8 : -14)} y={p.y + (p.y > cy ? 12 : -8)} fill="#94a3b8" fontSize="10">
                                    V{idx + 1}
                                  </text>
                                </g>
                              ))}
                            </g>
                          );
                        })()}
                      </svg>
                    </div>

                    {/* Polygon Metrics Panel */}
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4 bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xs uppercase font-bold text-indigo-400">Polygon Geometry</span>
                        <h4 className="text-xl font-black text-white mt-1">
                          {isRegularPolygon ? 'Regular' : 'Non-Regular (Irregular)'}{' '}
                          {polygonSides === 3
                            ? 'Triangle'
                            : polygonSides === 4
                            ? 'Quadrilateral'
                            : polygonSides === 5
                            ? 'Pentagon'
                            : polygonSides === 6
                            ? 'Hexagon'
                            : polygonSides === 7
                            ? 'Heptagon'
                            : 'Octagon'}
                        </h4>

                        <div className="mt-3 grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <p className="text-xs text-slate-400">Sides</p>
                            <p className="text-lg font-black text-amber-400">{polygonSides}</p>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <p className="text-xs text-slate-400">Vertices</p>
                            <p className="text-lg font-black text-indigo-400">{polygonSides}</p>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <p className="text-xs text-slate-400">Angles</p>
                            <p className="text-lg font-black text-emerald-400">{polygonSides}</p>
                          </motion.div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400 font-semibold">Side Count: {polygonSides}</span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setIsRegularPolygon(!isRegularPolygon);
                              audioManager.play('tap');
                            }}
                            className={`px-3 py-1 rounded text-xs font-bold ${
                              isRegularPolygon ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                            }`}
                          >
                            {isRegularPolygon ? 'Regular Mode' : 'Irregular Mode'}
                          </motion.button>
                        </div>

                        <input
                          type="range"
                          min={3}
                          max={8}
                          step={1}
                          value={polygonSides}
                          aria-label="Set polygon side count"
                          onChange={(e) => {
                            setPolygonSides(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* LAB 4: 3-D SOLID NET UNTIE STATION */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* SVG Net Unfolding Canvas */}
                    <div className="lg:col-span-2 bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-center min-h-[280px]">
                      <svg viewBox="0 0 360 260" className="w-full max-w-md h-auto">
                        {selectedSolid === 'cube' && (
                          <g transform="translate(60, 30)">
                            <rect x="80" y="20" width="40" height="40" fill="#3b82f6" opacity="0.8" stroke="#ffffff" />
                            <rect x="0" y="60" width="40" height="40" fill="#3b82f6" opacity="0.8" stroke="#ffffff" />
                            <rect x="40" y="60" width="40" height="40" fill="#22c55e" opacity="0.8" stroke="#ffffff" />
                            <rect x="80" y="60" width="40" height="40" fill="#3b82f6" opacity="0.8" stroke="#ffffff" />
                            <rect x="120" y="60" width="40" height="40" fill="#3b82f6" opacity="0.8" stroke="#ffffff" />
                            <rect x="80" y="100" width="40" height="40" fill="#3b82f6" opacity="0.8" stroke="#ffffff" />
                            <text x="100" y="170" textAnchor="middle" fill="#94a3b8" fontSize="11">
                              Cube Net: 6 identical squares
                            </text>
                          </g>
                        )}
                        {selectedSolid === 'cylinder' && (
                          <g transform="translate(60, 30)">
                            <circle cx="120" cy="30" r="25" fill="#f59e0b" opacity="0.8" stroke="#ffffff" />
                            <rect x="40" y="65" width="160" height="70" fill="#3b82f6" opacity="0.8" stroke="#ffffff" />
                            <circle cx="120" cy="170" r="25" fill="#f59e0b" opacity="0.8" stroke="#ffffff" />
                            <text x="120" y="105" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                              Length = 2πr (Circumference)
                            </text>
                          </g>
                        )}
                        {selectedSolid === 'cone' && (
                          <g transform="translate(60, 30)">
                            <circle cx="80" cy="120" r="25" fill="#f59e0b" opacity="0.8" stroke="#ffffff" />
                            <path d="M 180 120 L 250 50 A 100 100 0 0 1 250 190 Z" fill="#ec4899" opacity="0.8" stroke="#ffffff" />
                            <text x="160" y="215" textAnchor="middle" fill="#94a3b8" fontSize="11">
                              Cone Net: 1 circle + 1 circle sector
                            </text>
                          </g>
                        )}
                        {selectedSolid === 'tetrahedron' && (
                          <g transform="translate(60, 30)">
                            <polygon points="120,40 70,120 170,120" fill="#22c55e" opacity="0.8" stroke="#ffffff" />
                            <polygon points="120,40 170,120 220,40" fill="#3b82f6" opacity="0.8" stroke="#ffffff" />
                            <polygon points="70,120 170,120 120,200" fill="#3b82f6" opacity="0.8" stroke="#ffffff" />
                            <polygon points="120,40 70,120 20,40" fill="#3b82f6" opacity="0.8" stroke="#ffffff" />
                            <text x="120" y="225" textAnchor="middle" fill="#94a3b8" fontSize="11">
                              Tetrahedron Net: 4 triangles
                            </text>
                          </g>
                        )}
                      </svg>
                    </div>

                    {/* 3D Elements Inspector Panel */}
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4 bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xs uppercase font-bold text-indigo-400">Solid Elements Inspector</span>
                        <h4 className="text-xl font-black text-white mt-1">{solidDetails.name}</h4>

                        <div className="mt-3 grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <p className="text-xs text-slate-400">Faces (F)</p>
                            <p className="text-lg font-black text-emerald-400">{solidDetails.faces}</p>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <p className="text-xs text-slate-400">Edges (E)</p>
                            <p className="text-lg font-black text-amber-400">{solidDetails.edges}</p>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <p className="text-xs text-slate-400">Vertices (V)</p>
                            <p className="text-lg font-black text-indigo-400">{solidDetails.vertices}</p>
                          </motion.div>
                        </div>

                        <p className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800 mt-2">
                          <span className="font-bold text-white">Face Geometry:</span> {solidDetails.faceShape}
                        </p>
                      </div>

                      {/* Solid Selector Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        {(['cube', 'cylinder', 'cone', 'tetrahedron'] as const).map((s) => (
                          <motion.button
                            key={s}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSelectedSolid(s);
                              audioManager.play('pop');
                            }}
                            className={`p-2 rounded-lg text-xs font-bold capitalize transition-all ${
                              selectedSolid === s
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            {s}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* LAB 5: MIRROR SYMMETRY & REFLECTION AXIS */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Interactive Symmetry Mirror SVG */}
                    <div className="lg:col-span-2 bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-center min-h-[280px]">
                      <svg viewBox="0 0 300 300" className="w-full max-w-xs h-auto">
                        {activeSymmetryShape === 'square' && (
                          <rect x="75" y="75" width="150" height="150" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="3" />
                        )}
                        {activeSymmetryShape === 'rectangle' && (
                          <rect x="50" y="90" width="200" height="120" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="3" />
                        )}
                        {activeSymmetryShape === 'equilateral_tri' && (
                          <polygon points="150,50 60,220 240,220" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="3" />
                        )}
                        {activeSymmetryShape === 'circle' && (
                          <circle cx="150" cy="150" r="80" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="3" />
                        )}
                        {activeSymmetryShape === 'heart' && (
                          <path
                            d="M 150 240 C 90 180 50 140 50 100 C 50 60 90 60 120 80 C 135 90 150 110 150 110 C 150 110 165 90 180 80 C 210 60 250 60 250 100 C 250 140 210 180 150 240 Z"
                            fill="rgba(236, 72, 153, 0.3)"
                            stroke="#ec4899"
                            strokeWidth="3"
                          />
                        )}

                        {showVerticalAxis && (
                          <line x1="150" y1="20" x2="150" y2="280" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5,5" />
                        )}
                        {showHorizontalAxis && (
                          <line x1="20" y1="150" x2="280" y2="150" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="5,5" />
                        )}
                        {showDiagonalAxis && (
                          <>
                            <line x1="40" y1="40" x2="260" y2="260" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="5,5" />
                            <line x1="260" y1="40" x2="40" y2="260" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="5,5" />
                          </>
                        )}
                      </svg>
                    </div>

                    {/* Symmetry Axis Analysis Panel */}
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4 bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xs uppercase font-bold text-indigo-400">Reflection Axis Analysis</span>
                        <h4 className="text-xl font-black text-white mt-1">{symmetryInfo.name}</h4>
                        <p className="text-sm font-bold text-amber-400 mt-1">
                          Total Axes: {symmetryInfo.axes === Infinity ? '∞ (Infinitely Many)' : symmetryInfo.axes}
                        </p>
                        <p className="text-xs text-slate-300 mt-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                          {symmetryInfo.types}
                        </p>
                      </div>

                      {/* Shape Selector & Axis Controls */}
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1.5">
                          {(['square', 'rectangle', 'equilateral_tri', 'circle', 'heart'] as const).map((sh) => (
                            <motion.button
                              key={sh}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setActiveSymmetryShape(sh);
                                audioManager.play('pop');
                              }}
                              className={`px-2.5 py-1 rounded text-xs font-bold capitalize transition-all ${
                                activeSymmetryShape === sh
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                              }`}
                            >
                              {sh.replace('_', ' ')}
                            </motion.button>
                          ))}
                        </div>

                        <div className="grid grid-cols-3 gap-1.5 pt-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setShowVerticalAxis(!showVerticalAxis);
                              audioManager.play('tap');
                            }}
                            className={`p-1.5 text-xs rounded font-semibold ${
                              showVerticalAxis ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            Vertical
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setShowHorizontalAxis(!showHorizontalAxis);
                              audioManager.play('tap');
                            }}
                            className={`p-1.5 text-xs rounded font-semibold ${
                              showHorizontalAxis ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            Horizontal
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setShowDiagonalAxis(!showDiagonalAxis);
                              audioManager.play('tap');
                            }}
                            className={`p-1.5 text-xs rounded font-semibold ${
                              showDiagonalAxis ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            Diagonals
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* ── PREV / NEXT NAVIGATION BAR ── */}
            <div className="flex items-center justify-between pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentSlide === 0}
                onClick={() => {
                  setCurrentSlide((s) => Math.max(0, s - 1));
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm disabled:opacity-40 transition-all border border-slate-700"
              >
                ← Previous Lab
              </motion.button>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide((s) => s + 1);
                    audioManager.play('whoosh');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-600/30"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-600/30"
                >
                  Enter Sandbox Mode →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* ── PHASE 3: FREE PLAY SANDBOX MODE ── */}
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-800/60 rounded-2xl border border-slate-700/60 flex flex-wrap items-center justify-between gap-4"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800">
                  🎨 Free Exploration Sandbox
                </span>
                <h2 className="text-xl md:text-2xl font-black text-white mt-1">
                  Zero-Stress Geometry Sandbox
                </h2>
                <p className="text-slate-400 text-xs md:text-sm mt-1">
                  Freely manipulate intersecting angle rays, test parallel railway tracks, and inspect 3-D solid elements.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-indigo-600/30"
              >
                Ready for Architect Challenges! →
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sandbox Intersecting / Parallel Studio */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4"
              >
                <h3 className="text-sm font-bold text-amber-300">Lines & Ray Sandbox</h3>
                <div className="flex gap-2">
                  {(['perpendicular', 'parallel', 'intersecting'] as const).map((t) => (
                    <motion.button
                      key={t}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSandboxLineType(t);
                        audioManager.play('tap');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize ${
                        sandboxLineType === t ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {t}
                    </motion.button>
                  ))}
                </div>

                <svg viewBox="0 0 300 180" className="w-full bg-slate-900 rounded-xl border border-slate-800">
                  {sandboxLineType === 'parallel' && (
                    <>
                      <line x1="30" y1="60" x2="270" y2="60" stroke="#38bdf8" strokeWidth="4" />
                      <line x1="30" y1="120" x2="270" y2="120" stroke="#38bdf8" strokeWidth="4" />
                      <line x1="150" y1="60" x2="150" y2="120" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
                      <text x="160" y="95" fill="#f59e0b" fontSize="11" fontWeight="bold">d = 60 px (Constant)</text>
                    </>
                  )}
                  {sandboxLineType === 'perpendicular' && (
                    <>
                      <line x1="30" y1="140" x2="270" y2="140" stroke="#64748b" strokeWidth="4" />
                      <line x1="150" y1="20" x2="150" y2="170" stroke="#38bdf8" strokeWidth="4" />
                      <rect x="150" y="115" width="25" height="25" fill="none" stroke="#22c55e" strokeWidth="2" />
                      <text x="180" y="130" fill="#22c55e" fontSize="11" fontWeight="bold">90° (⊥)</text>
                    </>
                  )}
                  {sandboxLineType === 'intersecting' && (
                    <>
                      <line x1="40" y1="140" x2="260" y2="40" stroke="#38bdf8" strokeWidth="3" />
                      <line x1="40" y1="40" x2="260" y2="140" stroke="#f59e0b" strokeWidth="3" />
                      <circle cx="150" cy="90" r="6" fill="#ec4899" />
                      <text x="150" y="115" textAnchor="middle" fill="#ec4899" fontSize="11" fontWeight="bold">
                        Point of Intersection
                      </text>
                    </>
                  )}
                </svg>
              </motion.div>

              {/* Sandbox 3D Solid Inspector */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4"
              >
                <h3 className="text-sm font-bold text-amber-300">3-D Figures Visualizer</h3>
                <div className="flex gap-2">
                  {(['cube', 'cuboid', 'pyramid', 'prism'] as const).map((sol) => (
                    <motion.button
                      key={sol}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSandboxSolidInspect(sol);
                        audioManager.play('tap');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize ${
                        sandboxSolidInspect === sol ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {sol}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                  <p className="font-bold text-white text-sm capitalize">{sandboxSolidInspect} Properties:</p>
                  {sandboxSolidInspect === 'cube' && (
                    <p>Faces: 6 squares | Edges: 12 | Vertices: 8 (All equal lengths)</p>
                  )}
                  {sandboxSolidInspect === 'cuboid' && (
                    <p>Faces: 6 rectangles (3 equal pairs) | Edges: 12 | Vertices: 8</p>
                  )}
                  {sandboxSolidInspect === 'pyramid' && (
                    <p>Square Pyramid: 5 faces (1 square + 4 triangles) | Edges: 8 | Vertices: 5</p>
                  )}
                  {sandboxSolidInspect === 'prism' && (
                    <p>Triangular Prism: 5 faces (2 triangles + 3 rectangles) | Edges: 9 | Vertices: 6</p>
                  )}
                  <p className="text-indigo-400 font-semibold pt-1">
                    Euler Formula Test: F + V = E + 2 holds true for all flat polyhedra!
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ── PHASE 4: ARCHITECT COMPETENCY CHALLENGES ── */}
        {phase === 'challenge' && (
          <motion.div
            key="challenge-phase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Challenge Header & Live Adaptive Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-wrap items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800 gap-3"
            >
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Question {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  Competency Level:{' '}
                  <span className="text-indigo-400 capitalize">{challenge.competencyLevel}</span>
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                      : difficulty === 'advanced'
                      ? 'bg-rose-950 text-rose-400 border-rose-700'
                      : 'bg-amber-950 text-amber-400 border-amber-700'
                  }`}
                >
                  Tier: {difficulty}
                </motion.span>
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.3 }}
                  className="text-xs text-slate-400 font-medium"
                >
                  Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
                </motion.span>
              </div>
            </motion.div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%`,
                }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* ── QUESTION CARD ── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-2xl bg-slate-900 border transition-all ${
                wrongFlash
                  ? 'bg-rose-950/70 border-rose-500 shadow-rose-900/40 shadow-lg'
                  : 'border-slate-800 shadow-xl'
              }`}
            >
              <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">
                {challenge.question}
              </h3>

              {/* MCQ Options Rendering */}
              {(challenge.type === 'classify' ||
                challenge.type === 'distinguish' ||
                challenge.type === 'match') &&
                challenge.options && (
                  <div className="grid grid-cols-1 gap-3">
                    {challenge.options.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                        transition={{ duration: 0.4 }}
                        disabled={showExplanation}
                        onClick={(e) => handleAnswer(i, e)}
                        className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                          showExplanation && i === challenge.correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : 'bg-slate-950/80 hover:bg-slate-800/80 border-slate-800 text-slate-200'
                        }`}
                      >
                        <span className="font-bold text-indigo-400 mr-2">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                )}

              {/* Drag-Label Rendering */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-bold self-center mr-2">
                      Drag Labels:
                    </span>
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg cursor-grab text-xs font-bold shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['side_5', 'side_6', 'side_7', 'side_8'].map((targetKey) => (
                      <motion.div
                        key={targetKey}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetKey)}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-xl bg-slate-950 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px] text-center"
                      >
                        <span className="text-xs font-bold text-slate-400 mb-1">
                          {targetKey.replace('_', ' ').toUpperCase()}
                        </span>
                        <span
                          className={`text-sm font-black ${
                            droppedLabels[targetKey] ? 'text-emerald-400' : 'text-slate-600'
                          }`}
                        >
                          {droppedLabels[targetKey] || 'Drop Here'}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={(e) => handleAnswer(droppedLabels, e)}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm"
                  >
                    Verify Drag Labels
                  </motion.button>
                </div>
              )}

              {/* Drag-Sort Rendering */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <span className="text-xs text-slate-400">Drag items to rearrange sequence:</span>
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => setDraggedItem(String(idx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, idx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs md:text-sm text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-indigo-400 mr-2">{idx + 1}.</strong>
                        {item}
                      </span>
                      <span className="text-slate-500">☰</span>
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm mt-2"
                  >
                    Check Sequence Order
                  </motion.button>
                </div>
              )}

              {/* Numeric Input Rendering */}
              {challenge.type === 'numeric' && (
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter exact number"
                    aria-label="Numeric challenge input"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 w-44"
                  />
                  <span className="text-slate-400 text-sm font-semibold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    disabled={showExplanation || numericInput === ''}
                    onClick={(e) => handleAnswer(numericInput, e)}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow"
                  >
                    Submit Value
                  </motion.button>
                </div>
              )}

              {/* Construct Rendering */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-3 pt-2">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setConstructParts((prev) => [...prev, part]);
                          audioManager.play('tap');
                        }}
                        className="px-3 py-1.5 bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 text-indigo-200 rounded-lg text-xs font-semibold"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  {/* Construction Zone */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2">
                    {constructParts.map((p, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 bg-indigo-600 text-white rounded-md text-xs font-bold flex items-center gap-1.5 shadow"
                      >
                        {p}
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() =>
                            setConstructParts((prev) => prev.filter((_, i) => i !== idx))
                          }
                          className="text-indigo-200 hover:text-white ml-1"
                        >
                          ✕
                        </motion.button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-600">Click tags above to build definition...</span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    disabled={showExplanation || constructParts.length === 0}
                    onClick={(e) => handleAnswer(constructParts.join(' '), e)}
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm"
                  >
                    Validate Construction
                  </motion.button>
                </div>
              )}

              {/* ── STEP-BY-STEP PROGRESSIVE EXPLANATION CARD ── */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 rounded-2xl bg-amber-950/40 border border-amber-700/60 space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">📖</span>
                    <h4 className="text-sm font-bold text-amber-300">Step-by-Step Solution Breakdown</h4>
                  </div>

                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-amber-100/90 leading-relaxed"
                      >
                        <strong className="text-amber-400 font-bold mr-1.5">{idx + 1}.</strong>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}

                  <div className="pt-2 flex flex-wrap gap-3">
                    {revealedSteps <
                      challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setRevealedSteps((s) => s + 1);
                          audioManager.play('pop');
                        }}
                        className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                      >
                        Reveal Next Step →
                      </motion.button>
                    )}

                    {revealedSteps >=
                      challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length
                          ? 'Finish Pavilion Certification →'
                          : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ── PHASE 5: COMPLETION & REAL-WORLD CERTIFICATION ── */}
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Certificate Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 border border-emerald-500/50 text-center shadow-2xl space-y-4"
            >
              <motion.span
                animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                className="text-4xl inline-block"
              >
                🏆
              </motion.span>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Pavilion Geometric Architecture Complete!
              </h2>
              <p className="text-slate-300 text-sm max-w-xl mx-auto">
                You have mastered Class 6 ICSE Geometry — from intersecting perpendicular beams and angle classifications to 3-D unfolding nets and reflection symmetry axes!
              </p>

              {/* Score & Mastery Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="px-5 py-3 rounded-2xl bg-slate-900/80 border border-slate-700 text-center"
                >
                  <span className="text-xs text-slate-400 uppercase font-bold">Accuracy Score</span>
                  <p className="text-2xl font-black text-emerald-400">
                    {Math.max(0, 100 - errors * 5)}%
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="px-5 py-3 rounded-2xl bg-slate-900/80 border border-slate-700 text-center"
                >
                  <span className="text-xs text-slate-400 uppercase font-bold">Mastery Level</span>
                  <p className="text-2xl font-black text-indigo-400 capitalize">{masteryLevel}</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Performance & Motivational Feedback */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800 text-xs md:text-sm text-emerald-200"
            >
              <strong>Evaluator Feedback: </strong>
              {errors === 0
                ? 'PERFECT SCORE! Flawless spatial intuition and geometric mastery.'
                : errors <= 3
                ? 'Great performance! You demonstrated solid understanding of lines, polygons, and 3-D figures.'
                : 'Good effort! Review the misconception profile below to solidify your understanding.'}
            </motion.div>

            {/* Misconception Profile */}
            {hitMisconceptions.length > 0 && misconceptions && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-rose-950/40 border border-rose-900 space-y-3"
              >
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                  Personalized Misconception Gaps Cleared:
                </h3>
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions[mIdx];
                  if (!m) return null;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-950/80 rounded-xl border border-rose-900/60 text-xs space-y-1"
                    >
                      <p className="text-rose-300 font-bold">❌ Mistake: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Correction: {m.correction}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Spaced Repetition SRS Notice */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-800 text-xs text-slate-300 flex items-center justify-between"
            >
              <div>
                <p className="font-bold text-white">📅 Spaced Repetition Schedule (SM-2)</p>
                <p className="text-indigo-300 mt-0.5">
                  Next memory reinforcement review recommended in{' '}
                  <span className="font-bold text-white">
                    {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                  </span>
                  .
                </p>
              </div>
              <span className="text-2xl">🧠</span>
            </motion.div>

            {/* Real World Activity Arc */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-3"
            >
              <h3 className="text-sm font-bold text-amber-300">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300"
                  >
                    <span className="font-bold text-indigo-400 mr-1.5">{i + 1}.</span> {st}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SIM ENGINE FEEDBACK OVERLAYS ── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_MathematicsPairLinesIntersectingSim;
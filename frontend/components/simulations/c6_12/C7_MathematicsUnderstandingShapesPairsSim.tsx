'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ============================================================================
// CURRICULUM NODE DEFINITIONS: ICSE Class 7 Mathematics (Shapes & Pairs)
// ============================================================================
const NODE_C7_MATH_031 = 'c7_math_031'; // Pairs of Angles (Complementary, Supplementary, Linear Pair, Vertically Opposite)
const NODE_C7_MATH_032 = 'c7_math_032'; // Parallel Lines & Transversals (Corresponding, Alternate, Co-interior)
const NODE_C7_MATH_033 = 'c7_math_033'; // Properties of Triangles: Angle Sum Property & Exterior Angle Property
const NODE_C7_MATH_034 = 'c7_math_034'; // Exterior Angle Property & Inequalities in Triangles
const NODE_C7_MATH_035 = 'c7_math_035'; // Pythagoras Theorem & Pythagorean Triplets
const NODE_C7_MATH_036 = 'c7_math_036'; // Symmetry: Reflection Symmetry & Line of Symmetry
const NODE_C7_MATH_037 = 'c7_math_037'; // Rotational Symmetry (Order & Angle of Rotation)
const NODE_C7_MATH_038 = 'c7_math_038'; // Representing 3D in 2D (Faces, Edges, Vertices, Nets of Solids)
const NODE_C7_MATH_039 = 'c7_math_039'; // Practical Geometry & Compass Directions
const NODE_C7_MATH_040 = 'c7_math_040'; // Congruence of Simple 2D Figures by Superimposition

const ALL_NODE_IDS = [
  NODE_C7_MATH_031,
  NODE_C7_MATH_032,
  NODE_C7_MATH_033,
  NODE_C7_MATH_034,
  NODE_C7_MATH_035,
  NODE_C7_MATH_036,
  NODE_C7_MATH_037,
  NODE_C7_MATH_038,
  NODE_C7_MATH_039,
  NODE_C7_MATH_040,
];

const NODE_METADATA: Record<string, { title: string; icseCode: string; keyFormula: string }> = {
  [NODE_C7_MATH_031]: {
    title: 'Angle Pairs & Linear Relations',
    icseCode: 'ICSE-7-GEOM-P1',
    keyFormula: 'Comp: a+b=90° | Supp: a+b=180° | Vert: ∠1=∠3',
  },
  [NODE_C7_MATH_032]: {
    title: 'Parallel Lines & Transversals',
    icseCode: 'ICSE-7-GEOM-P2',
    keyFormula: 'Alt-Int: ∠3=∠5 | Corr: ∠1=∠5 | Co-Int: ∠3+∠6=180°',
  },
  [NODE_C7_MATH_033]: {
    title: 'Triangle Interior Angle Sum',
    icseCode: 'ICSE-7-GEOM-T1',
    keyFormula: '∠A + ∠B + ∠C = 180°',
  },
  [NODE_C7_MATH_034]: {
    title: 'Exterior Angle Theorem',
    icseCode: 'ICSE-7-GEOM-T2',
    keyFormula: 'Ext ∠ = Int Opp ∠1 + Int Opp ∠2',
  },
  [NODE_C7_MATH_035]: {
    title: 'Pythagoras Theorem',
    icseCode: 'ICSE-7-GEOM-T3',
    keyFormula: 'h² = a² + b² => h = √(a² + b²)',
  },
  [NODE_C7_MATH_036]: {
    title: 'Reflection Symmetry',
    icseCode: 'ICSE-7-GEOM-S1',
    keyFormula: 'Axis divides shape into mirror-image halves',
  },
  [NODE_C7_MATH_037]: {
    title: 'Rotational Symmetry',
    icseCode: 'ICSE-7-GEOM-S2',
    keyFormula: 'Angle of Rotation = 360° / Order of Symmetry',
  },
  [NODE_C7_MATH_038]: {
    title: '3D Solids & Folding Nets',
    icseCode: 'ICSE-7-GEOM-3D',
    keyFormula: "Euler's Formula: V - E + F = 2",
  },
  [NODE_C7_MATH_039]: {
    title: 'Directional Grid & Angles',
    icseCode: 'ICSE-7-GEOM-DIR',
    keyFormula: 'N(000°) | E(090°) | S(180°) | W(270°)',
  },
  [NODE_C7_MATH_040]: {
    title: 'Congruence by Superimposition',
    icseCode: 'ICSE-7-GEOM-CG',
    keyFormula: 'Shape 1 ≅ Shape 2 <=> Exact overlay match',
  },
};

// ============================================================================
// NARRATIVE & DISCOVERY SCENARIOS
// ============================================================================
const SCENARIO = {
  title: 'Chief Structural Engineer: Metrorail High-Speed Viaduct Corridor',
  role: 'Principal Civil & Structural Systems Architect',
  intro: 'You are heading the design of an elevated metro viaduct system featuring steel Pratt trusses, cantilever station roofs, diagonal tie-rod pylons, and ventilation impellers. Every single steel beam, transversal deck cut, triangular bracing member, and cast-concrete foundation block must obey Euclidean geometric theorems with zero margin of error.',
  context: 'Validate complementary and supplementary angles, parallel transversal theorems, triangle angle sums, exterior angle properties, Pythagoras cable load ratings, rotational symmetry of cooling exhausts, 2D folding nets of piers, and superimposition congruence to earn structural certification.',
  siteLocation: 'Sector 9 Metro Interchange, Greenfield Viaduct Phase 2',
  targetStandards: 'ICSE Curriculum Standards & Bureau of Indian Standards (BIS SP-46)',
};

const DISCOVERY_QUESTION = {
  question: 'Two intersecting flyover support girders form an acute angle of 68°. What is the measure of the angle vertically opposite to it, and what is the measure of its adjacent supplementary angle along the continuous linear girder?',
  options: [
    'Vertically opposite is 68°; adjacent is 112° (they form a linear pair summing to 180°)',
    'Vertically opposite is 112°; adjacent is 68° (vertically opposite angles sum to 180°)',
    'Both angles must be 68° because all angles formed at an intersection are equal',
    'Vertically opposite is 22° because intersecting angles are complementary (sum to 90°)',
  ],
  correctIndex: 0,
  hintAfter: 'Remember: Vertically opposite angles across an intersection are ALWAYS EQUAL, while adjacent angles along a straight line form a linear pair summing to 180°!',
  scientificInsight: 'In structural engineering, intersecting cross-bracing transmits identical tensile/compressive loads through vertically opposite angles while maintaining dynamic equilibrium along straight 180° beams.',
};

// ============================================================================
// INTERFACE TYPES
// ============================================================================
export interface Challenge {
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

export interface Props {
  nodeId?: string;
  title?: string;
  definition?: string;
  eli5?: string;
  misconceptions?: { misconception: string; correction: string }[];
  diagnosticQuestions?: { question: string; options: string[]; correctIndex: number }[];
  masteryCriteria?: string;
  onComplete?: (score: number) => void;
}

// ============================================================================
// CHALLENGE REPOSITORY (25 Comprehensive Challenges across all 10 ICSE Nodes)
// ============================================================================
const CHALLENGES: Challenge[] = [
  // 1. Foundation: Complementary Angles
  {
    id: 'ch_math_001',
    nodeId: NODE_C7_MATH_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Two angles in a bridge gusset plate are complementary. If one angle measures 34°, what is the exact measure of the second angle?',
    options: ['56°', '146°', '66°', '34°'],
    correctIndex: 0,
    explanation: 'Complementary angles sum to exactly 90°. Therefore, the required angle is 90° - 34° = 56°.',
    hints: [
      'Recall the definition: What is the sum of two complementary angles?',
      'Complementary angles add up to 90 degrees.',
      'Calculate 90 minus 34: 90 - 34 = 56°.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation: Linear Pair
  {
    id: 'ch_math_002',
    nodeId: NODE_C7_MATH_031,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Two adjacent angles form a linear pair along a continuous steel viaduct beam. If one angle measures 125°, find the measure of the adjacent angle in degrees.',
    correctAnswer: 55,
    tolerance: 0,
    unit: 'degrees',
    explanation: 'A linear pair of angles lies along a straight line and sums to 180°. Hence, 180° - 125° = 55°.',
    hints: [
      'A straight line forms an angle of 180 degrees.',
      'Angles in a linear pair are supplementary.',
      'Subtract 125 from 180: 180 - 125 = 55.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation: Alternate Interior Angles
  {
    id: 'ch_math_003',
    nodeId: NODE_C7_MATH_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A diagonal cross-tie cuts two parallel railway tracks. If one interior angle on the left is 72°, what is the measure of its alternate interior angle on the right?',
    options: ['72°', '108°', '18°', '90°'],
    correctIndex: 0,
    explanation: 'When a transversal intersects two parallel lines, alternate interior angles (forming the Z-pattern) are equal. Hence the angle is 72°.',
    hints: [
      'Look for the Z-shape formed between the two parallel rails.',
      'Alternate interior angles across parallel lines are equal in measure.',
      'The alternate interior angle equals the given angle: 72°.',
    ],
    misconceptionIndex: 1,
  },
  // 4. Foundation: Triangle Angle Sum
  {
    id: 'ch_math_004',
    nodeId: NODE_C7_MATH_033,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A triangular support truss has two measured interior angles of 58° and 62°. Calculate the third interior angle in degrees.',
    correctAnswer: 60,
    tolerance: 0,
    unit: 'degrees',
    explanation: 'By the angle sum property of a triangle, the sum of all three interior angles is always 180°. Thus, 180° - (58° + 62°) = 180° - 120° = 60°.',
    hints: [
      'The sum of all three interior angles in any triangle is 180 degrees.',
      'First add the two known angles: 58 + 62 = 120°.',
      'Subtract 120 from 180: 180 - 120 = 60°.',
    ],
  },
  // 5. Foundation: Reflection Symmetry of Rectangle
  {
    id: 'ch_math_005',
    nodeId: NODE_C7_MATH_036,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How many lines of reflection symmetry does a standard non-square rectangular display sign possess?',
    options: ['2 lines (horizontal and vertical midlines)', '4 lines (including both diagonals)', '1 line (vertical midline only)', '0 lines'],
    correctIndex: 0,
    explanation: 'A non-square rectangle has exactly 2 lines of symmetry: the vertical and horizontal midlines. Folding along a diagonal does not make opposite vertices coincide.',
    hints: [
      'Think about folding a sheet of A4 paper diagonally — do the corners meet exactly?',
      'Only lines passing through opposite side midpoints form matching halves.',
      'Count the horizontal midline and vertical midline = 2.',
    ],
    misconceptionIndex: 2,
  },
  // 6. Foundation: Euler Formula on Cuboid
  {
    id: 'ch_math_006',
    nodeId: NODE_C7_MATH_038,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How many vertices (V), edges (E), and faces (F) does a solid rectangular concrete pier (cuboid) contain?',
    options: [
      '8 vertices, 12 edges, 6 faces',
      '6 vertices, 12 edges, 8 faces',
      '8 vertices, 8 edges, 6 faces',
      '12 vertices, 8 edges, 6 faces',
    ],
    correctIndex: 0,
    explanation: 'A cuboid possesses 8 corner vertices, 12 straight bounding edges, and 6 flat rectangular faces (satisfying Euler formula V - E + F = 8 - 12 + 6 = 2).',
    hints: [
      'Picture a standard building brick or 6-sided dice.',
      'Count the 4 top corners plus 4 bottom corners = 8 vertices.',
      'Count 4 top edges + 4 bottom edges + 4 vertical pillars = 12 edges, with 6 faces.',
    ],
  },
  // 7. Foundation: Drag Label Angle Pairs
  {
    id: 'ch_math_007',
    nodeId: NODE_C7_MATH_031,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Correctly label the geometric angle pairs formed by two intersecting structural steel girders.',
    dragItems: [
      { label: 'Vertically Opposite', targetId: 'target_vert' },
      { label: 'Linear Pair', targetId: 'target_linear' },
    ],
    correctMapping: {
      target_vert: 'Vertically Opposite',
      target_linear: 'Linear Pair',
    },
    explanation: 'Opposite angles sharing only the intersection vertex are Vertically Opposite (and equal). Adjacent angles sharing a common ray along a straight line form a Linear Pair (summing to 180°).',
    hints: [
      'Which pair forms an X across the center vertex?',
      'Which pair sits side-by-side along a flat girder line?',
      'Match Vertically Opposite to across vertex, and Linear Pair to the straight line.',
    ],
  },
  // 8. Standard: Co-interior Angles Equation
  {
    id: 'ch_math_008',
    nodeId: NODE_C7_MATH_032,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A transversal cuts two parallel bridge deck lines. Two co-interior (consecutive interior) angles on the same side measure (2x)° and 100°. What is the value of x in degrees?',
    correctAnswer: 40,
    tolerance: 0,
    unit: 'degrees',
    explanation: 'Co-interior angles formed by parallel lines cut by a transversal are supplementary (sum = 180°). Thus, 2x + 100 = 180 => 2x = 80 => x = 40°.',
    hints: [
      'Co-interior angles on the same side of a transversal add up to 180 degrees.',
      'Set up the linear equation: 2x + 100 = 180.',
      'Subtract 100: 2x = 80, then divide by 2 to get x = 40.',
    ],
    misconceptionIndex: 1,
  },
  // 9. Standard: Exterior Angle Theorem
  {
    id: 'ch_math_009',
    nodeId: NODE_C7_MATH_034,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a triangular support frame ABC, the exterior angle at vertex C is 118°. One interior opposite angle at A is 46°. What is the measure of the second interior opposite angle at B in degrees?',
    correctAnswer: 72,
    tolerance: 0,
    unit: 'degrees',
    explanation: 'By the Exterior Angle Theorem, an exterior angle of a triangle equals the sum of the two opposite interior angles. Angle B = 118° - 46° = 72°.',
    hints: [
      'Exterior angle property: Exterior angle = Interior Opposite 1 + Interior Opposite 2.',
      'Subtract the known interior opposite angle from the exterior angle.',
      'Compute 118 - 46 = 72°.',
    ],
    misconceptionIndex: 3,
  },
  // 10. Standard: Pythagoras Cable Rating
  {
    id: 'ch_math_010',
    nodeId: NODE_C7_MATH_035,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A crane tension cable forms the hypotenuse of a right-angled structural triangle. The vertical mast is 9 m and the horizontal anchor distance is 12 m. What is the required cable length in meters?',
    correctAnswer: 15,
    tolerance: 0,
    unit: 'meters',
    explanation: 'By Pythagoras Theorem: h² = a² + b² = 9² + 12² = 81 + 144 = 225. Therefore, h = √225 = 15 meters.',
    hints: [
      'Use Pythagoras formula: h² = a² + b².',
      'Calculate 9² (81) + 12² (144) = 225.',
      'Take the square root: √225 = 15 meters.',
    ],
    misconceptionIndex: 4,
  },
  // 11. Standard: Rotational Symmetry Impeller
  {
    id: 'ch_math_011',
    nodeId: NODE_C7_MATH_037,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A tunnel ventilation fan has 3 identical symmetrical blades evenly spaced at 120° intervals. What is the order of rotational symmetry and its smallest angle of rotation?',
    options: [
      'Order 3, Angle of rotation = 120°',
      'Order 3, Angle of rotation = 60°',
      'Order 6, Angle of rotation = 60°',
      'Order 1, Angle of rotation = 360°',
    ],
    correctIndex: 0,
    explanation: 'An object with 3 identical equally spaced blades coincides with its initial position 3 times during a complete 360° rotation. Angle of rotation = 360° / 3 = 120°.',
    hints: [
      'How many times does the 3-blade impeller match its starting outline in one 360° turn?',
      'Angle of rotation = 360° / Order.',
      '360° / 3 = 120°, so Order = 3 and Angle = 120°.',
    ],
  },
  // 12. Standard: Drag Sort Pythagoras Verification
  {
    id: 'ch_math_012',
    nodeId: NODE_C7_MATH_035,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Order the geometric steps to experimentally verify Pythagoras Theorem for legs a and b on grid paper.',
    sortItems: [
      'Construct perpendicular legs of lengths a and b forming a 90° angle',
      'Join the endpoints to form hypotenuse h and measure its length with a ruler',
      'Calculate numerical values for a² and b² and compute their sum (a² + b²)',
      'Calculate h² and verify that h² exactly equals (a² + b²)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Construct the right triangle, measure the hypotenuse, compute the sum of squares of the legs, and finally verify numerical equivalence with the square of the hypotenuse.',
    hints: [
      'First draw the physical perpendicular legs on the paper.',
      'Measure the third side (hypotenuse) before squaring numbers.',
      'Sum the squares of the legs, then compare against the hypotenuse square.',
    ],
  },
  // 13. Standard: Congruence vs Area
  {
    id: 'ch_math_013',
    nodeId: NODE_C7_MATH_040,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Paver tile X is a 6 cm × 2 cm rectangle (area 12 cm²). Paver tile Y is a 4 cm × 3 cm rectangle (area 12 cm²). Are these tiles congruent by the method of superimposition?',
    options: [
      'No — when superimposed, their boundaries do not coincide despite having equal area',
      'Yes — any two figures with identical area are automatically congruent',
      'Yes — both figures are rectangles, so their geometric shapes are identical',
      'No — congruence can only ever be evaluated for triangles',
    ],
    correctIndex: 0,
    explanation: 'Geometric congruence requires BOTH identical shape and exact matching dimensions so that one figure covers the other completely upon superimposition. Equal area alone does not imply congruence.',
    hints: [
      'Imagine placing a long 6×2 cm strip directly over a 4×3 cm block.',
      'Will the edges and corners coincide completely without overhangs?',
      'Equal area is insufficient; outer perimeters and dimensions must match perfectly.',
    ],
  },
  // 14. Standard: Directional Bearing
  {
    id: 'ch_math_014',
    nodeId: NODE_C7_MATH_039,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'On a standard engineering site blueprint where North points directly toward the top of the sheet, in which compass direction is a pumping station located if it lies toward the bottom-left of the central hub?',
    options: ['South-West (SW)', 'South-East (SE)', 'North-West (NW)', 'North-East (NE)'],
    correctIndex: 0,
    explanation: 'Top is North, Bottom is South, Right is East, and Left is West. Bottom-left corresponds to South-West (SW).',
    hints: [
      'Top = North, Bottom = South, Right = East, Left = West.',
      'Combine bottom (South) with left (West).',
      'The resultant vector points South-West (SW).',
    ],
  },
  // 15. Advanced: Construct Triangle Angle Sum Proof
  {
    id: 'ch_math_015',
    nodeId: NODE_C7_MATH_033,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the deductive mathematical proof for the Triangle Angle Sum Theorem (∠A + ��B + ∠C = 180°) using a line drawn parallel to BC through vertex A.',
    availableParts: [
      'Draw line XY parallel to BC through vertex A',
      '∠1 + ∠A + ∠2 = 180° (angles on straight line XY)',
      '∠1 = ∠B and ∠2 = ∠C (alternate interior angles)',
      'Substitute to get: ∠A + ∠B + ∠C = 180°',
    ],
    targetState: 'Draw line XY parallel to BC through vertex A ∠1 + ∠A + ∠2 = 180° (angles on straight line XY) ∠1 = ∠B and ∠2 = ∠C (alternate interior angles) Substitute to get: ∠A + ∠B + ∠C = 180°',
    validationHint: 'Establish the parallel auxiliary line first, state the straight-line angle sum, equate alternate interior angles, and substitute to conclude.',
    explanation: 'An auxiliary line through vertex A parallel to base BC creates a straight angle summing to 180°. Substituting the alternate interior angles ∠1 = ∠B and ∠2 = ∠C yields ∠A + ∠B + ∠C = 180°.',
    hints: [
      'Begin by constructing the parallel line through the top vertex.',
      'Write the straight-line angle sum at the top.',
      'Use alternate interior angles to replace top angles with base angles.',
    ],
  },
  // 16. Advanced: Alternate Exterior Angles Equation
  {
    id: 'ch_math_016',
    nodeId: NODE_C7_MATH_032,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Two parallel viaduct tracks are crossed by an access gantry. Two alternate exterior angles are given as (3x - 15)° and (2x + 20)°. Find the actual measure of these angles in degrees.',
    correctAnswer: 90,
    tolerance: 0,
    unit: 'degrees',
    explanation: 'Alternate exterior angles formed by parallel lines are equal: 3x - 15 = 2x + 20 => x = 35°. Substituting x = 35° into 2(35) + 20 gives 70 + 20 = 90°.',
    hints: [
      'Alternate exterior angles are equal: set (3x - 15) = (2x + 20).',
      'Solve for x: 3x - 2x = 20 + 15 => x = 35.',
      'Substitute x = 35 into either angle expression to find the angle measure: 3(35) - 15 = 90°.',
    ],
  },
  // 17. Advanced: Pythagorean Triplet Identification
  {
    id: 'ch_math_017',
    nodeId: NODE_C7_MATH_035,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Which of the following triplets of structural steel beam lengths can form a structurally sound right-angled triangle truss without warping or distortion?',
    options: ['8 m, 15 m, 17 m', '7 m, 10 m, 13 m', '6 m, 9 m, 12 m', '5 m, 11 m, 13 m'],
    correctIndex: 0,
    explanation: 'For a right triangle, a² + b² must equal c²: 8² + 15² = 64 + 225 = 289, and 17² = 289. Thus (8, 15, 17) is an exact Pythagorean triplet.',
    hints: [
      'Check if the sum of squares of the two smaller sides equals the square of the largest side.',
      'Calculate 8² = 64, 15² = 225; sum = 289.',
      '17² = 289, verifying that 8-15-17 forms a right triangle.',
    ],
    misconceptionIndex: 4,
  },
  // 18. Advanced: Rotational Symmetry of Regular Square
  {
    id: 'ch_math_018',
    nodeId: NODE_C7_MATH_037,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A square decorative ventilation panel possesses 4 lines of reflection symmetry. What is its order of rotational symmetry and its fundamental angle of rotation?',
    options: [
      'Order 4, Angle = 90°',
      'Order 2, Angle = 180°',
      'Order 4, Angle = 45°',
      'Order 8, Angle = 45°',
    ],
    correctIndex: 0,
    explanation: 'A regular 4-sided polygon (square) has rotational symmetry of order 4 with fundamental angle of rotation = 360° / 4 = 90°.',
    hints: [
      'A square coincides with itself every quarter-turn (90°).',
      'There are 4 matching orientations within a 360° rotation.',
      'Angle of rotation = 360° / 4 = 90°.',
    ],
  },
  // 19. Advanced: 2D Net of Cylinder
  {
    id: 'ch_math_019',
    nodeId: NODE_C7_MATH_038,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Which 2-D net correctly folds into a closed right circular concrete foundation cylinder with top and bottom circular caps?',
    options: [
      'One rectangle with 2 identical circles attached to opposite long edges',
      'One rectangle with 2 equilateral triangles attached',
      'Three consecutive connected circles in a line',
      'One square with four semicircular flaps on its sides',
    ],
    correctIndex: 0,
    explanation: 'The curved surface of a right circular cylinder unfolds into a flat rectangle (length = 2πr, height = h), with 2 identical circular bases attached to opposite edges.',
    hints: [
      'Unrolling the curved wall of a soup can yields what 2D shape?',
      'The top lid and bottom base must be circular.',
      'Select the rectangle with 2 matching circular discs attached.',
    ],
  },
  // 20. Advanced: Superimposition Vertex Mapping
  {
    id: 'ch_math_020',
    nodeId: NODE_C7_MATH_040,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Two structural triangle trusses ABC and PQR are given with AB = PQ, BC = QR, and CA = RP. If vertex A is placed onto vertex P and side AB aligns with side PQ, which vertex must vertex B coincide with for complete congruence?',
    options: ['Vertex Q', 'Vertex R', 'Cannot be determined', 'Any vertex arbitrarily'],
    correctIndex: 0,
    explanation: 'Because side segment AB equals PQ and vertex A coincides with P, vertex B must fall precisely on vertex Q to maintain side congruence and orientation.',
    hints: [
      'Follow vertex correspondence: segment AB maps to segment PQ.',
      'If A is fixed onto P, then endpoint B must reach endpoint Q.',
      'The complete correspondence is A ↔ P, B ↔ Q, C ↔ R.',
    ],
  },
  // 21. Advanced: Triangle Inequality Theorem
  {
    id: 'ch_math_021',
    nodeId: NODE_C7_MATH_034,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A structural engineer needs to construct a triangular roof truss. Which of the following sets of beam lengths CANNOT form a valid triangle?',
    options: [
      '3 m, 5 m, 9 m (sum of 3 + 5 < 9)',
      '6 m, 8 m, 10 m',
      '7 m, 7 m, 11 m',
      '5 m, 12 m, 13 m',
    ],
    correctIndex: 0,
    explanation: 'According to the Triangle Inequality Theorem, the sum of lengths of any two sides of a triangle must be strictly greater than the third side. Since 3 + 5 = 8 < 9, these lengths cannot close into a triangle.',
    hints: [
      'Check if the sum of the two shorter sides is strictly greater than the longest side.',
      'For (3, 5, 9): is 3 + 5 > 9?',
      '8 is not greater than 9, so a triangle cannot form.',
    ],
  },
  // 22. Advanced: Angle in a Regular Hexagon
  {
    id: 'ch_math_022',
    nodeId: NODE_C7_MATH_037,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A hexagonal decorative tile has 6-fold rotational symmetry. What is the minimum non-zero angle of rotation in degrees needed for the tile to coincide with its original position?',
    correctAnswer: 60,
    tolerance: 0,
    unit: 'degrees',
    explanation: 'Angle of rotation = 360° / Order of rotational symmetry. For a regular hexagon with order 6, the angle is 360° / 6 = 60°.',
    hints: [
      'Divide 360° by the order of symmetry.',
      'The order of symmetry for a regular hexagon is 6.',
      '360 / 6 = 60 degrees.',
    ],
  },
  // 23. Advanced: Vertically Opposite Angle Variable
  {
    id: 'ch_math_023',
    nodeId: NODE_C7_MATH_031,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Two lines intersect such that vertically opposite angles are (5x - 20)° and (3x + 40)°. Find the value of x in degrees.',
    correctAnswer: 30,
    tolerance: 0,
    unit: 'degrees',
    explanation: 'Vertically opposite angles are equal: 5x - 20 = 3x + 40 => 2x = 60 => x = 30°.',
    hints: [
      'Set the two vertically opposite angle expressions equal to each other: 5x - 20 = 3x + 40.',
      'Subtract 3x from both sides: 2x - 20 = 40.',
      'Add 20: 2x = 60, hence x = 30.',
    ],
  },
  // 24. Advanced: Net of a Triangular Prism
  {
    id: 'ch_math_024',
    nodeId: NODE_C7_MATH_038,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'understanding',
    question: 'What 2D shapes constitute the unfolding net of a standard triangular prism girder?',
    options: [
      '3 rectangles and 2 congruent triangles',
      '2 rectangles and 3 congruent triangles',
      '4 triangles and 1 square',
      '6 rectangles and no triangles',
    ],
    correctIndex: 0,
    explanation: 'A triangular prism consists of 2 congruent triangular end-faces joined by 3 rectangular side-faces.',
    hints: [
      'Think of a Toblerone chocolate box unrolled flat.',
      'It has two triangular end caps.',
      'The lateral body unfolds into 3 connected rectangular faces.',
    ],
  },
  // 25. Advanced: Pythagoras Missing Leg
  {
    id: 'ch_math_025',
    nodeId: NODE_C7_MATH_035,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A right-angled diagonal bridge strut has a hypotenuse of 25 meters and one horizontal leg of 20 meters. Find the vertical height in meters.',
    correctAnswer: 15,
    tolerance: 0,
    unit: 'meters',
    explanation: 'By Pythagoras Theorem: a² + b² = h² => a² + 20² = 25² => a² + 400 = 625 => a² = 225 => a = √225 = 15 meters.',
    hints: [
      'Rearrange Pythagoras formula: a² = h² - b².',
      'Calculate 25² (625) - 20² (400) = 225.',
      'Square root of 225 is 15 meters.',
    ],
  },
];

// ============================================================================
// DEFAULT PROPS & MISCONCEPTIONS
// ============================================================================
const DEFAULT_PROPS: Props = {
  nodeId: 'c7_math_031',
  title: 'Understanding Shapes & Angle Pairs',
  definition: 'Geometric laws govern angle pairs (linear, supplementary, complementary, vertically opposite), parallel lines cut by transversals, triangle theorems (angle sum, exterior angle, Pythagoras theorem), reflection/rotational symmetry, 3D nets, and congruence by superimposition.',
  eli5: 'Think of geometry like precision engineering: angles and beams lock together with strict mathematical rules. Change one angle, and every connected component reacts predictably!',
  misconceptions: [
    {
      misconception: 'All supplementary angles form a linear pair.',
      correction: 'Supplementary means adding to 180°. A linear pair MUST be adjacent on the exact same straight line.',
    },
    {
      misconception: 'Co-interior angles on parallel lines are equal.',
      correction: 'Co-interior angles are supplementary (add to 180°), not equal, unless transversal is perpendicular.',
    },
    {
      misconception: 'A rectangle has 4 lines of reflection symmetry including both diagonals.',
      correction: 'A non-square rectangle has only 2 lines of symmetry (midlines). Folding along a diagonal does not align corners.',
    },
    {
      misconception: 'The exterior angle of a triangle equals the sum of all three interior angles.',
      correction: 'The exterior angle equals the sum of only the TWO OPPOSITE interior angles.',
    },
    {
      misconception: 'Pythagoras theorem states that hypotenuse = leg a + leg b.',
      correction: 'It relates the squares of side lengths: h² = a² + b², meaning h = √(a² + b²).',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the complement of 42°?', options: ['48°', '138°', '90°', '42°'], correctIndex: 0 },
    { question: 'What is the supplement of 115°?', options: ['65°', '75°', '25°', '180°'], correctIndex: 0 },
    { question: 'If two lines intersect, vertically opposite angles are:', options: ['Equal', 'Supplementary', 'Complementary', 'Unequal'], correctIndex: 0 },
    { question: 'The angle sum of any triangle in degrees is:', options: ['180°', '360°', '90°', '270°'], correctIndex: 0 },
    { question: 'An exterior angle of a triangle equals the sum of:', options: ['Two opposite interior angles', 'All three angles', 'Adjacent angle + 90°', '180°'], correctIndex: 0 },
    { question: 'In a right triangle with legs 3 and 4, the hypotenuse is:', options: ['5', '7', '12', '25'], correctIndex: 0 },
    { question: 'The order of rotational symmetry of a square is:', options: ['4', '2', '8', '1'], correctIndex: 0 },
    { question: 'Figures that have the same area are always congruent:', options: ['False', 'True', 'Only if circles', 'Only if triangles'], correctIndex: 0 },
  ],
  masteryCriteria: 'Master angle pairs, parallel transversals, triangle theorems, Pythagoras verification, rotational symmetry, 3D solid nets, and superimposition congruence.',
};

// ============================================================================
// GUIDED EXPLORATION STEPS & LABS
// ============================================================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Angle Pairs & Intersecting Lines',
    instruction: 'Drag the intersection slider to rotate the girder and observe live how vertically opposite angles remain equal while adjacent angles sum to 180°.',
    interactionType: 'slider-intersect',
    nodeId: NODE_C7_MATH_031,
    focus: 'Vertically opposite equality & linear pair supplementarity',
  },
  {
    title: 'Lab 2: Parallel Lines & Transversal Geometry',
    instruction: 'Adjust the transversal slant angle and watch corresponding, alternate interior, and co-interior angles dynamically update in real time.',
    interactionType: 'slider-transversal',
    nodeId: NODE_C7_MATH_032,
    focus: 'Z-pattern alternate interior, F-pattern corresponding, C-pattern co-interior',
  },
  {
    title: 'Lab 3: Triangle Angle Sum & Exterior Property',
    instruction: 'Drag the top vertex slider to deform the triangle. Notice interior angles always sum to 180° while exterior angle matches the two opposite interiors.',
    interactionType: 'slider-triangle',
    nodeId: NODE_C7_MATH_033,
    focus: 'Angle sum invariance (180°) & Exterior angle theorem',
  },
  {
    title: 'Lab 4: Visual Pythagoras Verification',
    instruction: 'Adjust legs a and b to watch square areas a² and b² dynamically combine to equal the hypotenuse square h².',
    interactionType: 'slider-pythagoras',
    nodeId: NODE_C7_MATH_035,
    focus: 'Area conservation: a² + b² = h²',
  },
  {
    title: 'Lab 5: Rotational Symmetry & Congruence',
    instruction: 'Rotate 2D shapes (square, equilateral triangle, rectangle) through 360° to observe coincidence angles and symmetry order.',
    interactionType: 'slider-symmetry',
    nodeId: NODE_C7_MATH_037,
    focus: 'Order of rotational symmetry = 360° / fundamental angle',
  },
  {
    title: 'Lab 6: 3D Solids & 2D Unfolding Nets',
    instruction: 'Inspect the folding net of a 3D cuboid pillar and count its faces (6), edges (12), and vertices (8) to verify Euler formula.',
    interactionType: 'inspect-3d-net',
    nodeId: NODE_C7_MATH_038,
    focus: "Euler's Polyhedron Formula: V - E + F = 2",
  },
  {
    title: 'Lab 7: Superimposition Congruence Inspector',
    instruction: 'Translate and superimpose Shape B over Shape A to test whether equal area guarantees exact geometric congruence.',
    interactionType: 'superimpose-test',
    nodeId: NODE_C7_MATH_040,
    focus: 'Exact boundary match vs equal area distinction',
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If two intersecting lines form one angle of 50°, what are the measures of the other three angles in cyclic order around the intersection?',
    options: ['130°, 50°, 130°', '50°, 50°, 50°', '40°, 50°, 40°', '180°, 50°, 180°'],
    correctIndex: 0,
    verifyInstruction: 'Set the intersection angle slider to 50° in Lab 1 to verify your prediction!',
    nodeId: NODE_C7_MATH_031,
  },
  {
    question: 'Predict: If a right triangle has perpendicular legs of 6 m and 8 m, what will the area of the square on its hypotenuse be?',
    options: ['100 m² (6² + 8² = 36 + 64)', '14 m² (6 + 8)', '196 m² ((6+8)²)', '48 m² (6 × 8)'],
    correctIndex: 0,
    verifyInstruction: 'Set leg sliders to 6 and 8 in the Pythagoras lab to verify the total square area!',
    nodeId: NODE_C7_MATH_035,
  },
  {
    question: 'Predict: If a regular equilateral triangle is rotated about its center, after how many degrees will it first coincide with its initial silhouette?',
    options: ['120° (360° / 3)', '60°', '180°', '90°'],
    correctIndex: 0,
    verifyInstruction: 'Select the equilateral triangle in Lab 5 and rotate to 120° to verify perfect overlap!',
    nodeId: NODE_C7_MATH_037,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about co-interior angles as the transversal slant angle changes?',
    observableOptions: [
      'One angle increases while the other decreases, keeping their sum constant at 180°',
      'Both angles increase simultaneously',
      'Both angles always remain 90° regardless of slant',
      'Their total sum fluctuates depending on the slant',
    ],
    correctIndex: 0,
    nodeId: NODE_C7_MATH_032,
  },
  {
    question: 'What happens when a non-square rectangle is rotated by 90° versus 180°?',
    observableOptions: [
      'It does NOT coincide at 90° (width and height swap), but coincides perfectly at 180°',
      'It coincides at both 90° and 180°',
      'It only coincides after a full 360° rotation',
      'It never coincides with its starting outline',
    ],
    correctIndex: 0,
    nodeId: NODE_C7_MATH_037,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Metrorail Corridor Engineering Field Inspection & Mapping',
  description: 'Inspect a nearby bridge, window frame, staircase railing, or roof truss. Identify real-world instances of linear pairs, alternate interior angles in parallel railings, and right-triangle braces obeying Pythagoras Theorem.',
  steps: [
    'Spot 2 intersecting structural steel members and measure/estimate angles to verify vertically opposite angle equality',
    'Locate parallel staircase banister rails crossed by vertical baluster posts to identify matching alternate interior angles',
    'Find a right-triangle diagonal brace, measure perpendicular legs, and calculate hypotenuse cable tension length using h = √(a² + b²)',
    'Draft a rough engineering site map of your workspace with a prominent North arrow, landmark icons, and legend',
  ],
};

// ============================================================================
// MAIN SIMULATION COMPONENT
// ============================================================================
export function C7_MathematicsUnderstandingShapesPairsSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C7_MATH_031,
  title = DEFAULT_PROPS.title || 'Understanding Shapes & Angle Pairs',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['mathematics'] || { name: 'Mathematics', emoji: '📐', color: 'blue' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Brilliant Predict-Then-Check & Observation States
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Lab Visual States (Real-time Slider Connections)
  const [intersectAngle, setIntersectAngle] = useState(65);
  const [transversalAngle, setTransversalAngle] = useState(70);
  const [triangleTopX, setTriangleTopX] = useState(200);
  const [pythagLegA, setPythagLegA] = useState(6);
  const [pythagLegB, setPythagLegB] = useState(8);
  const [rotAngle, setRotAngle] = useState(0);
  const [selectedShape, setSelectedShape] = useState<'square' | 'triangle' | 'rectangle'>('square');
  const [netFoldProgress, setNetFoldProgress] = useState(0);
  const [superimposeOffset, setSuperimposeOffset] = useState({ x: 40, y: 30 });

  // Challenge Handling States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag & Sort & Numeric & Construct States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Feedback Animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Spaced Repetition State Tracking
  const [srsData, setSrsData] = useState<{ nextReviewDays: number; intervalDate: string; stabilityScore: number }>({
    nextReviewDays: 7,
    intervalDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    stabilityScore: 95,
  });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Adaptive Filtered Challenges
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load Mastery on Mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Update Difficulty on BKT changes
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

  // Calculate SRS Review Schedule dynamically whenever errors update
  useEffect(() => {
    let days = 7;
    let stability = 95;
    if (errors === 0) {
      days = 7;
      stability = 98;
    } else if (errors <= 3) {
      days = 3;
      stability = 82;
    } else {
      days = 1;
      stability = 60;
    }

    const reviewDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    const formattedDate = reviewDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    setSrsData({
      nextReviewDays: days,
      intervalDate: formattedDate,
      stabilityScore: stability,
    });
  }, [errors]);

  // HTML5 Canvas animation loop for telemetry banner
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

      // Subtle technical grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Animated telemetry radar beacon
      const pulse = Math.sin(frame * 0.05) * 3;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 25, 18, 6 + pulse, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#0284c7';
      ctx.font = '11px monospace';
      ctx.fillText(
        `GEOMETRIC ENGINE ONLINE | NODE: ${nodeId.toUpperCase()} | ANGLE: ${intersectAngle}° | HYP: ${Math.sqrt(
          pythagLegA * pythagLegA + pythagLegB * pythagLegB
        ).toFixed(2)}m`,
        12,
        22
      );

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [intersectAngle, pythagLegA, pythagLegB, nodeId]);

  // Inactivity Timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        if (challenge.hints[0]) {
          setCurrentHint(challenge.hints[0]);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak(challenge.hints[0]);
        }
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, challenge]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Escalating Hints
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
      speechManager.speak('Let us inspect the complete geometric solution.');
    }
  }, [hintCount, challenge]);

  // Discovery Answer Handler
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Great geometric intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // Phase Transitions
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive geometry lab. Manipulate the sliders to explore.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now test your concepts freely in the open sandbox.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for engineering challenges! Solve each structural problem.');
  }, []);

  // Prediction & Observation Handlers
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Now verify with the live visualization.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Check the angle gauges closely.');
  }, []);

  // Interactive Sliders Handlers
  const handleIntersectSlider = useCallback((val: number) => {
    setIntersectAngle(val);
    audioManager.play('count');
  }, []);

  const handleTransversalSlider = useCallback((val: number) => {
    setTransversalAngle(val);
    audioManager.play('count');
  }, []);

  const handlePythagLegASlider = useCallback((val: number) => {
    setPythagLegA(val);
    audioManager.play('count');
  }, []);

  const handlePythagLegBSlider = useCallback((val: number) => {
    setPythagLegB(val);
    audioManager.play('count');
  }, []);

  const handleRotationSlider = useCallback((val: number) => {
    setRotAngle(val);
    audioManager.play('pop');
  }, []);

  // Drag & Sort Handlers
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
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
      setSortArrangement(prev => {
        const arr = prev.length === (challenge.sortItems?.length || 0) ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  // Complete Simulation
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have mastered Class 7 Shapes & Angles.');
  }, [errors, onComplete]);

  // Next Challenge
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

  // Unified Answer Submission Handler
  const handleAnswer = useCallback(
    (ans: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = ans === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const num = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
        isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (ans as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Geometric property verified.');
        setShowConfetti(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(updatedSrs));
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
          speechManager.speak('Review the step-by-step mathematical reasoning.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  // Derived Values for Real-Time Visualizations
  const supplementaryAngle = useMemo(() => 180 - intersectAngle, [intersectAngle]);
  const pythagHypotenuse = useMemo(
    () => Math.sqrt(pythagLegA * pythagLegA + pythagLegB * pythagLegB).toFixed(2),
    [pythagLegA, pythagLegB]
  );

  // Dynamic calculated angles for triangle lab
  const calculatedTriangleAngles = useMemo(() => {
    const dxA = triangleTopX - 80;
    const dyA = 170 - 50;
    const angleA_rad = Math.atan2(dyA, dxA);
    const angleB_deg = Math.round((angleA_rad * 180) / Math.PI);

    const dxC = 280 - triangleTopX;
    const angleC_rad = Math.atan2(dyA, dxC);
    const angleC_deg = Math.round((angleC_rad * 180) / Math.PI);

    const angleTop_deg = 180 - angleB_deg - angleC_deg;
    const extAngle_deg = angleB_deg + angleTop_deg;

    return { angleB: angleB_deg, angleC: angleC_deg, angleTop: angleTop_deg, extAngle: extAngle_deg };
  }, [triangleTopX]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* Simulation Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-blue-950/80 rounded-2xl border border-blue-700">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-slate-400 font-medium">ICSE Class 7 Mathematics • Nodes: c7_math_031 to c7_math_040</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-purple-950 text-purple-400 border border-purple-700'
                : 'bg-blue-950 text-blue-400 border border-blue-700'
            }`}
          >
            Tier: {difficulty}
          </motion.div>
          <div className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            Phase: <span className="text-white font-bold uppercase">{phase}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-blue-950/60 to-slate-900 rounded-2xl border border-blue-800/60">
            <h2 className="text-xl font-bold text-blue-300 flex items-center gap-2">
              <span>🏗️</span> {SCENARIO.title}
            </h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <span className="text-slate-400 block font-semibold">📍 Engineering Project Site:</span>
                <span className="text-blue-300 font-medium">{SCENARIO.siteLocation}</span>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <span className="text-slate-400 block font-semibold">📐 Target Standards:</span>
                <span className="text-emerald-300 font-medium">{SCENARIO.targetStandards}</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                Diagnostic Curiosity Hook (Explore & Predict)
              </span>
              <span className="text-xs text-slate-400">Not Graded • Establishes Intuition</span>
            </div>
            <p className="text-base text-white font-medium leading-relaxed">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`p-4 text-left rounded-xl text-sm border transition ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-600 text-emerald-200'
                      : 'bg-slate-800/80 hover:bg-slate-700/90 text-slate-200 border-slate-700'
                  }`}
                >
                  <span className="font-bold text-blue-400 mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                <div
                  className={`p-4 rounded-xl border text-sm ${
                    discoveryCorrect
                      ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                      : 'bg-amber-950/60 border-amber-600 text-amber-300'
                  }`}
                >
                  <p className="font-bold mb-1">
                    {discoveryCorrect ? '✓ Spot on! Vertically opposite angles are equal.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">{DISCOVERY_QUESTION.scientificInsight}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  Enter Interactive Geometry Labs {'→'}
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <canvas ref={canvasRef} width={600} height={35} className="w-full bg-slate-900 rounded-xl border border-slate-800" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-blue-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <span className="text-xs text-slate-400">
                    Topic: {NODE_METADATA[EXPLORATION_STEPS[currentSlide].nodeId]?.title || 'Geometry'}
                  </span>
                </div>
                <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-400 font-bold">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
              </div>
              <p className="text-sm text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-800/40">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* SLIDE 0: ANGLE PAIRS LAB */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 400 220" className="w-full md:w-2/3 h-56 bg-slate-900/50 rounded-xl">
                      {/* Fixed horizontal girder line */}
                      <line x1="30" y1="110" x2="370" y2="110" stroke="#64748b" strokeWidth="3" />
                      {/* Rotating girder line */}
                      {(() => {
                        const rad = (intersectAngle * Math.PI) / 180;
                        const len = 150;
                        const x1 = 200 - len * Math.cos(rad);
                        const y1 = 110 + len * Math.sin(rad);
                        const x2 = 200 + len * Math.cos(rad);
                        const y2 = 110 - len * Math.sin(rad);
                        return (
                          <>
                            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#38bdf8" strokeWidth="3" />
                            <circle cx="200" cy="110" r="5" fill="#f59e0b" />
                            {/* Angle Labels */}
                            <text x="240" y="95" fill="#38bdf8" fontSize="13" fontWeight="bold">
                              ∠1 = {intersectAngle}°
                            </text>
                            <text x="140" y="95" fill="#a855f7" fontSize="13" fontWeight="bold">
                              ∠2 = {supplementaryAngle}°
                            </text>
                            <text x="140" y="135" fill="#38bdf8" fontSize="13" fontWeight="bold">
                              ∠3 = {intersectAngle}°
                            </text>
                            <text x="240" y="135" fill="#a855f7" fontSize="13" fontWeight="bold">
                              ∠4 = {supplementaryAngle}°
                            </text>
                          </>
                        );
                      })()}
                    </svg>

                    <div className="w-full md:w-1/3 space-y-3 text-xs">
                      <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-900">
                        <span className="font-bold text-blue-400">Vertically Opposite (Equal):</span>
                        <p className="text-slate-300 mt-1">∠1 = ∠3 = {intersectAngle}°</p>
                        <p className="text-slate-300">∠2 = ∠4 = {supplementaryAngle}°</p>
                      </div>
                      <div className="p-3 bg-purple-950/40 rounded-xl border border-purple-900">
                        <span className="font-bold text-purple-400">Linear Pair (Sum = 180°):</span>
                        <p className="text-slate-300 mt-1">∠1 + ∠2 = {intersectAngle + supplementaryAngle}°</p>
                        <p className="text-slate-300">∠3 + ∠4 = {intersectAngle + supplementaryAngle}°</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Girder Slant Angle: {intersectAngle}°</span>
                      <span>Linear Supplement: {supplementaryAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={160}
                      value={intersectAngle}
                      onChange={e => handleIntersectSlider(Number(e.target.value))}
                      aria-label="Set Intersection Angle"
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* SLIDE 1: PARALLEL TRANSVERSAL LAB */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 400 240" className="w-full md:w-2/3 h-60 bg-slate-900/50 rounded-xl">
                      {/* Parallel Lines */}
                      <line x1="30" y1="65" x2="370" y2="65" stroke="#94a3b8" strokeWidth="2.5" />
                      <line x1="30" y1="175" x2="370" y2="175" stroke="#94a3b8" strokeWidth="2.5" />
                      <text x="375" y="68" fill="#94a3b8" fontSize="10">Line m</text>
                      <text x="375" y="178" fill="#94a3b8" fontSize="10">Line n</text>

                      {/* Transversal */}
                      {(() => {
                        const rad = (transversalAngle * Math.PI) / 180;
                        const dx = 100 / Math.tan(rad);
                        const cx1 = 200 - dx;
                        const cx2 = 200 + dx;
                        return (
                          <>
                            <line x1={cx1 - 40} y1="20" x2={cx2 + 40} y2="220" stroke="#f59e0b" strokeWidth="3" />
                            {/* Angles at top */}
                            <circle cx={cx1} cy="65" r="4" fill="#38bdf8" />
                            <text x={cx1 + 10} y="55" fill="#38bdf8" fontSize="11" fontWeight="bold">
                              {transversalAngle}°
                            </text>
                            <text x={cx1 - 35} y="55" fill="#c084fc" fontSize="11">
                              {180 - transversalAngle}°
                            </text>

                            {/* Angles at bottom */}
                            <circle cx={cx2} cy="175" r="4" fill="#38bdf8" />
                            <text x={cx2 + 10} y="165" fill="#38bdf8" fontSize="11" fontWeight="bold">
                              {transversalAngle}°
                            </text>
                            <text x={cx2 - 35} y="165" fill="#c084fc" fontSize="11">
                              {180 - transversalAngle}°
                            </text>
                          </>
                        );
                      })()}
                    </svg>

                    <div className="w-full md:w-1/3 space-y-2 text-xs">
                      <div className="p-2.5 bg-blue-950/40 rounded-lg border border-blue-900">
                        <span className="font-bold text-blue-400">Corresponding Angles (=):</span>
                        <p className="text-slate-300">Matching corners = {transversalAngle}°</p>
                      </div>
                      <div className="p-2.5 bg-emerald-950/40 rounded-lg border border-emerald-900">
                        <span className="font-bold text-emerald-400">Alternate Interior (=):</span>
                        <p className="text-slate-300">Z-shape pairs = {transversalAngle}°</p>
                      </div>
                      <div className="p-2.5 bg-amber-950/40 rounded-lg border border-amber-900">
                        <span className="font-bold text-amber-400">Co-Interior (Sum 180°):</span>
                        <p className="text-slate-300">{transversalAngle}° + {180 - transversalAngle}° = 180°</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 mb-1 block">Transversal Slant Angle: {transversalAngle}°</label>
                    <input
                      type="range"
                      min={35}
                      max={145}
                      value={transversalAngle}
                      onChange={e => handleTransversalSlider(Number(e.target.value))}
                      aria-label="Set Transversal Slant"
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* SLIDE 2: TRIANGLE ANGLE SUM & EXTERIOR LAB */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-xs font-bold text-amber-400 uppercase">Predict First</p>
                      <p className="text-sm text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 400 220" className="w-full h-56 bg-slate-900/50 rounded-xl">
                      {/* Base Line extended */}
                      <line x1="40" y1="170" x2="380" y2="170" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
                      {/* Triangle */}
                      <polygon
                        points={`${triangleTopX},50 80,170 280,170`}
                        fill="#0284c7"
                        fillOpacity="0.2"
                        stroke="#38bdf8"
                        strokeWidth="3"
                      />
                      {/* Vertices */}
                      <circle cx={triangleTopX} cy={50} r="6" fill="#f59e0b" />
                      <circle cx="80" cy="170" r="5" fill="#38bdf8" />
                      <circle cx="280" cy="170" r="5" fill="#38bdf8" />

                      {/* Exterior Arc and Angle */}
                      <path d="M 315 170 A 35 35 0 0 0 295 140" fill="none" stroke="#f43f5e" strokeWidth="3" />
                      <text x="310" y="150" fill="#f43f5e" fontSize="12" fontWeight="bold">
                        Ext ∠ = {calculatedTriangleAngles.extAngle}°
                      </text>

                      {/* Interior Angle Labels */}
                      <text x="90" y="160" fill="#38bdf8" fontSize="11" fontWeight="bold">
                        ∠B = {calculatedTriangleAngles.angleB}°
                      </text>
                      <text x={triangleTopX - 15} y="40" fill="#f59e0b" fontSize="11" fontWeight="bold">
                        ∠A = {calculatedTriangleAngles.angleTop}°
                      </text>
                      <text x="240" y="160" fill="#a855f7" fontSize="11" fontWeight="bold">
                        ∠C = {calculatedTriangleAngles.angleC}°
                      </text>
                    </svg>

                    <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 bg-blue-950/40 rounded-xl border border-blue-900 text-center">
                        <span className="text-slate-400">Angle Sum Property:</span>
                        <p className="text-base font-bold text-blue-300">
                          {calculatedTriangleAngles.angleB}° + {calculatedTriangleAngles.angleTop}° + {calculatedTriangleAngles.angleC}° = 180°
                        </p>
                      </div>
                      <div className="p-2.5 bg-rose-950/40 rounded-xl border border-rose-900 text-center">
                        <span className="text-slate-400">Exterior Angle Property:</span>
                        <p className="text-base font-bold text-rose-300">
                          ∠A + ∠B = {calculatedTriangleAngles.angleTop}° + {calculatedTriangleAngles.angleB}° = {calculatedTriangleAngles.extAngle}°
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 mb-1 block">Drag Top Vertex Position (X-Axis): {triangleTopX}</label>
                    <input
                      type="range"
                      min={120}
                      max={260}
                      value={triangleTopX}
                      onChange={e => setTriangleTopX(Number(e.target.value))}
                      aria-label="Set Top Vertex Position"
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* SLIDE 3: PYTHAGORAS THEOREM VERIFICATION LAB */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 400 240" className="w-full md:w-2/3 h-60 bg-slate-900/50 rounded-xl">
                      {/* Right triangle at center */}
                      <polygon points="120,180 240,180 120,80" fill="#0284c7" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2.5" />
                      {/* Right angle marker */}
                      <rect x="120" y="165" width="15" height="15" fill="none" stroke="#f59e0b" strokeWidth="1.5" />

                      {/* Square on Leg B (bottom) */}
                      <rect x="120" y="180" width="120" height="40" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="1.5" />
                      <text x="180" y="205" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">
                        b² = {pythagLegB * pythagLegB}
                      </text>

                      {/* Square on Leg A (vertical) */}
                      <rect x="40" y="80" width="80" height="100" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
                      <text x="80" y="135" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                        a² = {pythagLegA * pythagLegA}
                      </text>

                      {/* Hypotenuse text */}
                      <text x="195" y="125" fill="#f59e0b" fontSize="12" fontWeight="bold">
                        h = {pythagHypotenuse} m
                      </text>
                    </svg>

                    <div className="w-full md:w-1/3 space-y-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400">Leg a = {pythagLegA} m</span>
                        <p className="text-emerald-400 font-bold text-sm">a² = {pythagLegA * pythagLegA}</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400">Leg b = {pythagLegB} m</span>
                        <p className="text-blue-400 font-bold text-sm">b² = {pythagLegB * pythagLegB}</p>
                      </div>
                      <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-900">
                        <span className="text-amber-400 font-bold">Hypotenuse Square h²:</span>
                        <p className="text-white text-sm font-bold">
                          {pythagLegA * pythagLegA} + {pythagLegB * pythagLegB} = {pythagLegA * pythagLegA + pythagLegB * pythagLegB}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-300">Leg a: {pythagLegA} m</label>
                      <input
                        type="range"
                        min={3}
                        max={12}
                        value={pythagLegA}
                        onChange={e => handlePythagLegASlider(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-300">Leg b: {pythagLegB} m</label>
                      <input
                        type="range"
                        min={3}
                        max={16}
                        value={pythagLegB}
                        onChange={e => handlePythagLegBSlider(Number(e.target.value))}
                        className="w-full accent-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: ROTATIONAL SYMMETRY & SUPERIMPOSITION */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {(['square', 'triangle', 'rectangle'] as const).map(shape => (
                      <motion.button
                        key={shape}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedShape(shape)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition ${
                          selectedShape === shape ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {shape}
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 300 200" className="w-full md:w-2/3 h-52 bg-slate-900/50 rounded-xl">
                      {/* Fixed reference outline */}
                      <g opacity="0.3" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" fill="none">
                        {selectedShape === 'square' && <rect x="100" y="50" width="100" height="100" />}
                        {selectedShape === 'triangle' && <polygon points="150,40 90,160 210,160" />}
                        {selectedShape === 'rectangle' && <rect x="80" y="65" width="140" height="70" />}
                      </g>

                      {/* Rotating Shape */}
                      <g transform={`rotate(${rotAngle}, 150, 100)`}>
                        {selectedShape === 'square' && (
                          <rect x="100" y="50" width="100" height="100" fill="#38bdf8" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="2" />
                        )}
                        {selectedShape === 'triangle' && (
                          <polygon points="150,40 90,160 210,160" fill="#a855f7" fillOpacity="0.4" stroke="#a855f7" strokeWidth="2" />
                        )}
                        {selectedShape === 'rectangle' && (
                          <rect x="80" y="65" width="140" height="70" fill="#f59e0b" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="2" />
                        )}
                        <circle cx="150" cy="100" r="4" fill="#f43f5e" />
                      </g>
                    </svg>

                    <div className="w-full md:w-1/3 text-xs space-y-2">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="font-bold text-white">Current Rotation:</span>
                        <p className="text-xl font-bold text-blue-400 mt-1">{rotAngle}°</p>
                        <p className="text-slate-400 mt-1">
                          {selectedShape === 'square' && 'Matches at 90°, 180°, 270°, 360° (Order 4)'}
                          {selectedShape === 'triangle' && 'Matches at 120°, 240°, 360° (Order 3)'}
                          {selectedShape === 'rectangle' && 'Matches at 180°, 360° (Order 2)'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300">Rotate Shape (0° to 360°): {rotAngle}°</label>
                    <input
                      type="range"
                      min={0}
                      max={360}
                      value={rotAngle}
                      onChange={e => handleRotationSlider(Number(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* SLIDE 5: 3D SOLIDS & NETS */}
              {currentSlide === 5 && (
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 400 240" className="w-full md:w-2/3 h-60 bg-slate-900/50 rounded-xl">
                      {/* Cuboid 2D Net representation */}
                      <g stroke="#38bdf8" strokeWidth="2" fill="#0284c7" fillOpacity="0.25">
                        {/* Central vertical strip */}
                        <rect x="150" y="30" width="60" height="40" />
                        <rect x="150" y="70" width="60" height="60" fillOpacity="0.4" />
                        <rect x="150" y="130" width="60" height="40" />
                        <rect x="150" y="170" width="60" height="60" />
                        {/* Side wings */}
                        <rect x="90" y="70" width="60" height="60" />
                        <rect x="210" y="70" width="60" height="60" />
                      </g>

                      {/* Face Labels */}
                      <text x="180" y="55" fill="#f8fafc" fontSize="10" textAnchor="middle">Top</text>
                      <text x="180" y="105" fill="#f8fafc" fontSize="10" textAnchor="middle">Front</text>
                      <text x="180" y="155" fill="#f8fafc" fontSize="10" textAnchor="middle">Bottom</text>
                      <text x="180" y="205" fill="#f8fafc" fontSize="10" textAnchor="middle">Back</text>
                      <text x="120" y="105" fill="#f8fafc" fontSize="10" textAnchor="middle">Left</text>
                      <text x="240" y="105" fill="#f8fafc" fontSize="10" textAnchor="middle">Right</text>
                    </svg>

                    <div className="w-full md:w-1/3 text-xs space-y-2">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                        <span className="font-bold text-amber-400">Cuboid Net Properties:</span>
                        <p className="text-slate-300">Faces (F) = 6 rectangular faces</p>
                        <p className="text-slate-300">Vertices (V) = 8 corners</p>
                        <p className="text-slate-300">Edges (E) = 12 line segments</p>
                        <p className="text-emerald-400 font-bold">Euler: 8 - 12 + 6 = 2 ✓</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 6: SUPERIMPOSITION CONGRUENCE */}
              {currentSlide === 6 && (
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 400 220" className="w-full md:w-2/3 h-56 bg-slate-900/50 rounded-xl">
                      {/* Fixed Shape A: 100 x 60 rectangle at (50, 70) */}
                      <rect x="50" y="70" width="100" height="60" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" />
                      <text x="100" y="105" fill="#93c5fd" fontSize="11" textAnchor="middle" fontWeight="bold">Shape A (60×100)</text>

                      {/* Movable Shape B */}
                      <rect
                        x={50 + superimposeOffset.x}
                        y={70 + superimposeOffset.y}
                        width="100"
                        height="60"
                        fill="#ec4899"
                        fillOpacity="0.4"
                        stroke="#f43f5e"
                        strokeWidth="2"
                        strokeDasharray="4 2"
                      />
                      <text
                        x={100 + superimposeOffset.x}
                        y={105 + superimposeOffset.y}
                        fill="#fca5a5"
                        fontSize="11"
                        textAnchor="middle"
                        fontWeight="bold"
                      >
                        Shape B
                      </text>
                    </svg>

                    <div className="w-full md:w-1/3 text-xs space-y-2">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="font-bold text-white">Superimposition Test:</span>
                        <p className="text-slate-300 mt-1">
                          Offset X: {superimposeOffset.x}px | Y: {superimposeOffset.y}px
                        </p>
                        {superimposeOffset.x === 0 && superimposeOffset.y === 0 ? (
                          <p className="text-emerald-400 font-bold mt-2">✓ PERFECT CONGRUENCE: All boundaries coincide!</p>
                        ) : (
                          <p className="text-amber-400 mt-2">Drag sliders to offset 0,0 to superimpose Shape B over Shape A.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-300">Align X Offset: {superimposeOffset.x}px</label>
                      <input
                        type="range"
                        min={-50}
                        max={50}
                        value={superimposeOffset.x}
                        onChange={e => setSuperimposeOffset(prev => ({ ...prev, x: Number(e.target.value) }))}
                        className="w-full accent-pink-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-300">Align Y Offset: {superimposeOffset.y}px</label>
                      <input
                        type="range"
                        min={-50}
                        max={50}
                        value={superimposeOffset.y}
                        onChange={e => setSuperimposeOffset(prev => ({ ...prev, y: Number(e.target.value) }))}
                        className="w-full accent-rose-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Exploration Prev / Next Nav */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
                >
                  ← Previous Lab
                </motion.button>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"
                  >
                    Next Lab {'→'}
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30"
                  >
                    Enter Free Sandbox {'→'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🧰</span> Interactive Geometric Sandbox (Free Architectural Modeling)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Manipulate all geometric angle and truss variables simultaneously without constraints or grading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase">Girder Intersection Controls</span>
              <input
                type="range"
                min={20}
                max={160}
                value={intersectAngle}
                onChange={e => handleIntersectSlider(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
              <div className="p-3 bg-slate-950 rounded-xl text-xs text-slate-300">
                Opposite: <span className="text-blue-400 font-bold">{intersectAngle}°</span> | Adjacent:{' '}
                <span className="text-purple-400 font-bold">{180 - intersectAngle}°</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase">Pythagoras Truss Live Calculator</span>
              <div className="flex gap-4">
                <input
                  type="range"
                  min={3}
                  max={15}
                  value={pythagLegA}
                  onChange={e => handlePythagLegASlider(Number(e.target.value))}
                  className="w-1/2 accent-emerald-500"
                />
                <input
                  type="range"
                  min={4}
                  max={20}
                  value={pythagLegB}
                  onChange={e => handlePythagLegBSlider(Number(e.target.value))}
                  className="w-1/2 accent-blue-500"
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl text-xs text-slate-300">
                Legs: {pythagLegA}m and {pythagLegB}m {'=>'} Hypotenuse:{' '}
                <span className="text-amber-400 font-bold">{pythagHypotenuse}m</span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/30 text-sm flex justify-center items-center gap-2"
          >
            I am Ready for Structural Challenges! {'→'}
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: ADAPTIVE CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress & Tier Tracker */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400">
              <span>
                CHALLENGE {currentChallenge + 1} OF {filteredChallenges.length}
              </span>
              <span className="capitalize text-blue-400">Competency: {challenge.competencyLevel}</span>
            </div>
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-400"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash ? 'bg-rose-950/80 border-rose-500' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                {NODE_METADATA[challenge.nodeId]?.title || 'ICSE Mathematics'}
              </span>
              <span className="text-xs bg-slate-800 px-2.5 py-1 rounded-lg text-slate-400">
                {NODE_METADATA[challenge.nodeId]?.icseCode || 'ICSE-7'}
              </span>
            </div>

            <h3 className="text-base md:text-lg font-semibold text-white leading-relaxed mb-6">
              {challenge.question}
            </h3>

            {/* MCQ Types (classify, distinguish, match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`p-4 text-left rounded-xl text-sm border font-medium transition ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-bold text-blue-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag Label Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-blue-700 text-white rounded-xl text-xs font-bold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('target_vert')}
                    className="p-6 bg-slate-950 border-2 border-dashed border-slate-700 rounded-2xl text-center"
                  >
                    <span className="text-xs text-slate-400 block mb-2">Across Intersection Center</span>
                    <span className="text-sm font-bold text-emerald-400">
                      {droppedLabels['target_vert'] || 'Drop Angle Pair Type Here'}
                    </span>
                  </div>

                  <div
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('target_linear')}
                    className="p-6 bg-slate-950 border-2 border-dashed border-slate-700 rounded-2xl text-center"
                  >
                    <span className="text-xs text-slate-400 block mb-2">Side-by-side along Straight Line</span>
                    <span className="text-sm font-bold text-purple-400">
                      {droppedLabels['target_linear'] || 'Drop Angle Pair Type Here'}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {/* Drag Sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, i) => (
                  <motion.div
                    key={i}
                    draggable
                    onDragStart={() => setDraggedItem(String(i))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, i);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-medium cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-900 text-blue-300 flex items-center justify-center font-bold text-[10px]">
                      {i + 1}
                    </span>
                    {item}
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs mt-2"
                >
                  Verify Step Order
                </motion.button>
              </div>
            )}

            {/* Numeric Input Type */}
            {challenge.type === 'numeric' && (
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value..."
                  className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                />
                <span className="text-sm font-semibold text-slate-400">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(numericInput)}
                  className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl text-xs"
                >
                  Submit Answer
                </motion.button>
              </div>
            )}

            {/* Construct Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400">{challenge.validationHint}</span>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-blue-300 rounded-xl text-xs border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[90px] p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <div key={idx} className="px-3 py-1.5 bg-blue-950 text-blue-200 rounded-lg text-xs border border-blue-800 flex items-center gap-2">
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click blocks above to assemble proof steps in order...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs"
                >
                  Verify Algebraic Construction
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-blue-950/40 border border-blue-800/80 rounded-2xl space-y-3"
              >
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold text-blue-300 uppercase">Step-by-Step Solution Breakdown</p>
                  <span className="text-[10px] text-slate-400">
                    Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
                  </span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-blue-400">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-1.5 bg-blue-800 text-white rounded-lg text-xs font-bold"
                  >
                    Reveal Next Step {'→'}
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNextChallenge}
                    className="mt-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-2"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length
                      ? 'Finalise Inspection →'
                      : 'Next Structural Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & SPACED REPETITION VISIBILITY ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950/60 to-slate-900 rounded-3xl border border-emerald-800 text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Structural Certification Complete!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You scored <span className="text-emerald-400 font-bold">{Math.max(0, 100 - errors * 5)}%</span> with{' '}
              <span className="text-blue-400 font-bold uppercase">{masteryLevel}</span> geometric mastery.
            </p>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 text-sm">
            {errors === 0 ? (
              <p className="text-emerald-300 font-bold">
                🌟 PERFECT SCORE! Every beam angle, theorem, and symmetry rotation was executed flawlessly.
              </p>
            ) : errors <= 3 ? (
              <p className="text-blue-300 font-bold">
                👍 Great execution! You have strong command over angle pairs, parallel lines, and triangle properties.
              </p>
            ) : (
              <p className="text-amber-300 font-bold">
                🛠️ Solid effort! Revisit the interactive labs below to strengthen the distinction between equal and supplementary angle pairs.
              </p>
            )}
          </div>

          {/* SPACED REPETITION VISIBILITY (SM-2 Visual Schedule Card) */}
          <div className="p-6 bg-gradient-to-r from-amber-950/40 via-slate-900 to-blue-950/40 rounded-3xl border border-amber-800/80 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📅</span>
                <div>
                  <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                    Spaced Repetition System (SRS) Next Review
                  </h3>
                  <p className="text-xs text-slate-400">SM-2 Adaptive Memory Retention Algorithm</p>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                Review in {srsData.nextReviewDays} {srsData.nextReviewDays === 1 ? 'day' : 'days'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold block">Scheduled Date</span>
                <p className="text-lg font-bold text-white">{srsData.intervalDate}</p>
                <p className="text-[11px] text-slate-500">Target review window</p>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold block">Memory Retention Factor</span>
                <p className="text-lg font-bold text-emerald-400">{srsData.stabilityScore}% Stability</p>
                <p className="text-[11px] text-slate-500">
                  {errors === 0 ? '0 errors (Long interval)' : errors <= 3 ? '1-3 errors (Medium interval)' : '4+ errors (Rapid interval)'}
                </p>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold block">Topics Scheduled for Recall</span>
                <p className="text-sm font-bold text-blue-300">Complementary, Transversals, Pythagoras</p>
                <p className="text-[11px] text-slate-500">10 Curriculum Nodes Synchronized</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800">
              💡 <span className="font-semibold text-amber-300">Why this schedule?</span> Spaced retrieval just before the memory decay threshold increases long-term neural recall strength by up to 300%. Check your dashboard on <span className="text-white font-bold">{srsData.intervalDate}</span>.
            </p>
          </div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-900 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Targeted Concept Repairs</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl text-xs space-y-1">
                    <p className="text-rose-400 font-bold">❌ Common Slip: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Accurate Rule: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real-World Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-blue-300 flex items-center gap-2">
              <span>📐</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-bold text-blue-400">{i + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Reusable Feedback Elements */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C7_MathematicsUnderstandingShapesPairsSim;
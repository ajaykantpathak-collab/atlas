'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS CONSTANTS (MANDATORY STRING LITERALS) ───
const NODE_C8_MATH_021 = 'c8_math_021';
const NODE_C8_MATH_022 = 'c8_math_022';
const NODE_C8_MATH_023 = 'c8_math_023';
const NODE_C8_MATH_024 = 'c8_math_024';
const NODE_C8_MATH_025 = 'c8_math_025';
const NODE_C8_MATH_026 = 'c8_math_026';
const NODE_C8_MATH_027 = 'c8_math_027';
const NODE_C8_MATH_028 = 'c8_math_028';
const NODE_C8_MATH_029 = 'c8_math_029';
const NODE_C8_MATH_030 = 'c8_math_030';

const ALL_NODE_IDS = [
  NODE_C8_MATH_021,
  NODE_C8_MATH_022,
  NODE_C8_MATH_023,
  NODE_C8_MATH_024,
  NODE_C8_MATH_025,
  NODE_C8_MATH_026,
  NODE_C8_MATH_027,
  NODE_C8_MATH_028,
  NODE_C8_MATH_029,
  NODE_C8_MATH_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Master Architect of Dholavira',
  intro: 'You are an apprentice mathematician restoring ancient heritage structures across Gujarat and designing modern architectural models. From factorising area blueprints and balancing structural loads to plotting coordinate surveying grids and verifying polyhedral domes, mathematics is your master tool.',
  context: 'Across your journey, you will decompose polynomial area tiles, solve contextual equations, verify parallelogram symmetry, inspect 3-D polyhedra with Euler��s formula, construct quadrilaterals, navigate circle geometry, and plot linear graph projections.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If you take an area model of a square of side x, add 5x to its area, and add 6 square units, what are the rectangular side dimensions of this new combined area?',
  options: [
    '(x + 5) and (x + 6)',
    '(x + 2) and (x + 3)',
    '(x + 1) and (x + 6)',
    '(x + 4) and (x + 2)',
  ],
  correctIndex: 1,
  hintAfter: 'Notice that (x + 2)(x + 3) expands to x² + 3x + 2x + 6 = x² + 5x + 6. Factorisation unpacks the area back into length times breadth!',
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

// ─── 22 PROGRESSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_math_01',
    nodeId: NODE_C8_MATH_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Identify the common monomial factor and the factorised form of 12xy - 18x.',
    options: [
      '6x(2y - 3)',
      '3x(4y - 6)',
      '6(2xy - 3x)',
      '12x(y - 1.5)',
    ],
    correctIndex: 0,
    explanation: 'The HCF of numerical coefficients 12 and 18 is 6. The common variable factor is x. Factoring out 6x yields 6x(2y - 3). Re-multiplication: 6x·2y - 6x·3 = 12xy - 18x.',
    hints: [
      'Find the highest common factor (HCF) of 12 and 18.',
      'Check which variables appear in both terms: xy and x both have x.',
      'Divide both terms by 6x: 12xy/(6x) = 2y, and -18x/(6x) = -3.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_math_02',
    nodeId: NODE_C8_MATH_029,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct geometric labels onto the corresponding parts of the circle diagram.',
    dragItems: [
      { label: 'Radius', targetId: 'target_radius' },
      { label: 'Diameter', targetId: 'target_diameter' },
      { label: 'Chord', targetId: 'target_chord' },
      { label: 'Sector', targetId: 'target_sector' },
    ],
    correctMapping: {
      target_radius: 'Radius',
      target_diameter: 'Diameter',
      target_chord: 'Chord',
      target_sector: 'Sector',
    },
    explanation: 'A radius connects the centre to the boundary (r). A diameter passes through the centre (d=2r). A chord connects any two perimeter points. A sector is a slice enclosed by two radii and an arc containing the centre.',
    hints: [
      'The line segment from centre O to point A is the radius.',
      'The longest chord passing straight through the centre is the diameter.',
      'The pizza slice containing the centre is the sector; the line connecting two rim points without passing through the centre is a chord.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_math_03',
    nodeId: NODE_C8_MATH_023,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Three interior angles of an architectural quadrilateral courtyard are 80°, 110°, and 100°. What is the measure of the fourth angle in degrees?',
    correctAnswer: 70,
    tolerance: 0.5,
    unit: 'degrees (°)',
    explanation: 'The angle sum of any quadrilateral is 360°. Fourth angle = 360° - (80° + 110° + 100°) = 360° - 290° = 70°.',
    hints: [
      'Remember that splitting any quadrilateral with a diagonal creates 2 triangles, each having 180°.',
      'Add the three known angles together: 80 + 110 + 100 = 290°.',
      'Subtract 290° from the total quadrilateral angle sum of 360°.',
    ],
  },
  {
    id: 'ch_math_04',
    nodeId: NODE_C8_MATH_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'For a standard solid cube or cuboid, what are the counts of Vertices (V), Edges (E), and Faces (F), and does Euler’s formula V - E + F = 2 hold?',
    options: [
      'V = 8, E = 12, F = 6; Formula gives 8 - 12 + 6 = 2 (Verified)',
      'V = 6, E = 12, F = 8; Formula gives 6 - 12 + 8 = 2 (Incorrect counts)',
      'V = 8, E = 6, F = 12; Formula gives 8 - 6 + 12 = 14',
      'V = 4, E = 6, F = 4; Formula gives 4 - 6 + 4 = 2',
    ],
    correctIndex: 0,
    explanation: 'A cube has 8 corner vertices (4 top, 4 bottom), 12 straight edges (4 top, 4 bottom, 4 vertical pillars), and 6 square faces. 8 - 12 + 6 = 2.',
    hints: [
      'Count the corners of a dice: 4 on top, 4 at base.',
      'Count the straight edges connecting the faces: 12 in total.',
      'Verify: V - E + F = 8 - 12 + 6 = 2.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_math_05',
    nodeId: NODE_C8_MATH_028,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How many lines of reflection symmetry does a standard non-square rectangle possess, and why are its diagonals not lines of symmetry?',
    options: [
      '2 lines of symmetry (horizontal and vertical midlines); folding along diagonals causes opposite corners to protrude.',
      '4 lines of symmetry; diagonals always divide any quadrilateral symmetrically.',
      '1 line of symmetry along the main diagonal only.',
      '0 lines of symmetry; only regular polygons have line symmetry.',
    ],
    correctIndex: 0,
    explanation: 'A rectangle has only 2 lines of reflection symmetry passing through the midpoints of opposite sides. Folding across a diagonal creates mismatched overlapping flaps rather than coincident congruent halves.',
    hints: [
      'Think of folding an A4 paper sheet along its midlines versus diagonally.',
      'When folded diagonally, do the opposite corners lie exactly on top of one another?',
      'Only shapes where both halves match completely upon folding possess reflection symmetry along that crease.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_math_06',
    nodeId: NODE_C8_MATH_022,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A solar power company technician knows that 2/3 of a battery bank capacity plus 15 kWh equals 55 kWh. What is the total battery capacity in kWh?',
    correctAnswer: 60,
    tolerance: 0.5,
    unit: 'kWh',
    explanation: 'Let total capacity be x. (2/3)x + 15 = 55. Subtract 15: (2/3)x = 40. Multiply by reciprocal (3/2): x = 40 × (3/2) = 60 kWh.',
    hints: [
      'Write the equation: (2/3)x + 15 = 55.',
      'Subtract 15 from both sides to isolate the fraction term: (2/3)x = 40.',
      'Multiply 40 by the reciprocal 3/2: (40 × 3) / 2 = 60.',
    ],
  },
  {
    id: 'ch_math_07',
    nodeId: NODE_C8_MATH_030,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the Cartesian plane, what does the ordered pair (x, y) = (-4, 5) represent in terms of motion from the origin (0,0)?',
    options: [
      'Move 4 units left along the x-axis, then 5 units up parallel to the y-axis (Quadrant II)',
      'Move 4 units down, then 5 units right (Quadrant IV)',
      'Move 5 units left, then 4 units up (Quadrant II)',
      'Move 4 units right, then 5 units down (Quadrant IV)',
    ],
    correctIndex: 0,
    explanation: 'The abscissa x = -4 specifies moving 4 units in the negative horizontal direction (left). The ordinate y = +5 specifies moving 5 units in the positive vertical direction (up), placing the point in Quadrant II.',
    hints: [
      'Remember the first number is x (horizontal), the second is y (vertical).',
      'Negative x means moving to the left of the origin.',
      'Positive y means moving upwards into Quadrant II.',
    ],
  },
  {
    id: 'ch_math_08',
    nodeId: NODE_C8_MATH_021,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the exact algebraic factorisation for the difference of squares: 49x² - 64y²',
    availableParts: ['(7x - 8y)', '(7x + 8y)', '(7x - 8y)²', '(49x - 64y)', '+', '·'],
    targetState: '(7x - 8y) (7x + 8y)',
    validationHint: 'Use the identity a² - b² = (a - b)(a + b) where a = 7x and b = 8y.',
    explanation: '49x² = (7x)² and 64y² = (8y)². Using a² - b² = (a - b)(a + b) gives (7x - 8y)(7x + 8y). Re-multiplication confirms 49x² - 56xy + 56xy - 64y² = 49x² - 64y².',
    hints: [
      'Identify the square roots of the two terms: √(49x²) = 7x and √(64y²) = 8y.',
      'Apply the difference of two squares identity: a² - b² = (a - b)(a + b).',
      'Click the two factors: (7x - 8y) and (7x + 8y).',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_math_09',
    nodeId: NODE_C8_MATH_021,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the logical algorithmic steps in factorising the quadratic trinomial x² - 7x + 12 by splitting the middle term.',
    sortItems: [
      'Identify constant q = 12 and coefficient p = -7',
      'Find pair of integers whose product is 12 and sum is -7: (-3, -4)',
      'Split middle term: x² - 3x - 4x + 12',
      'Factor in pairs: x(x - 3) - 4(x - 3) = (x - 3)(x - 4)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First identify product and sum targets, find factors with matching signs (-3 × -4 = 12 and -3 + -4 = -7), split the middle term, and group binomial factors.',
    hints: [
      'Start by identifying the target product and sum.',
      'Next determine the correct negative integer factors.',
      'Rewrite the polynomial with 4 terms, then extract common binomials.',
    ],
  },
  {
    id: 'ch_math_010',
    nodeId: NODE_C8_MATH_024,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a parallelogram ABCD, angle A = 115°. What are the measures of angles B, C, and D, and what can be stated about diagonals AC and BD?',
    options: [
      '∠B = 65°, ∠C = 115°, ∠D = 65°; Diagonals bisect each other at midpoint O (not necessarily equal)',
      '∠B = 115°, ∠C = 65°, ∠D = 115°; Diagonals are equal in length',
      '∠B = 65°, ∠C = 65°, ∠D = 115°; Diagonals meet at 90°',
      '∠B = 75°, ∠C = 115°, ∠D = 75°; Diagonals do not intersect',
    ],
    correctIndex: 0,
    explanation: 'In a parallelogram, opposite angles are equal (∠C = ∠A = 115°) and adjacent angles are supplementary (∠B = 180° - 115° = 65°, ∠D = 65°). Diagonals bisect each other, but are equal only in rectangles/squares.',
    hints: [
      'Adjacent angles on parallel lines sum to 180° (supplementary interior angles).',
      'Opposite angles in any parallelogram are equal.',
      'General parallelogram diagonals bisect each other, but are not equal in length unless right-angled.',
    ],
  },
  {
    id: 'ch_math_011',
    nodeId: NODE_C8_MATH_025,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'An architectural dome model consists of a hemisphere placed on top of a cuboidal tower base. How should this composite structure be classified and drawn in 2-D?',
    options: [
      'Joint shape (two solids attached externally); drawn as 3 visible parallelograms for the cuboid topped by a semi-ellipse dome.',
      'Nested shape (one solid inside another); drawn as a circle completely inside a rectangle.',
      'Single polyhedron; drawn as a flat hexagon with 6 vertices.',
      'Prism; drawn with 2 congruent triangles connected by rectangles.',
    ],
    correctIndex: 0,
    explanation: 'Because the hemisphere is attached on top rather than contained inside, it is a joint shape. In 2-D oblique/perspective, the cuboid displays 3 visible faces (front, top, side) with the hemisphere resting on the top face.',
    hints: [
      'Joint means attached together on the outside; nested means one solid is inside the interior of another.',
      'A cuboid in 2-D is represented using 3 joined parallelograms to convey depth.',
      'The dome resting on top is a hemisphere (joint arrangement).',
    ],
  },
  {
    id: 'ch_math_012',
    nodeId: NODE_C8_MATH_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'To construct quadrilateral ABCD given four sides AB, BC, CD, DA and diagonal AC, why MUST diagonal AC be drawn first?',
    options: [
      'AC serves as the common base dividing the quadrilateral into two independent SSS triangles (ABC and ACD) on opposite sides.',
      'AC is always horizontal and determines the area directly.',
      'AC is required to calculate the perimeter with a compass.',
      'AC bisects all four angles into equal 45° segments.',
    ],
    correctIndex: 0,
    explanation: 'Constructing a quadrilateral from 4 sides and 1 diagonal relies on reducing the problem to constructing two SSS triangles (ΔABC and ΔACD) sharing the base AC on opposite sides.',
    hints: [
      'Think of how a quadrilateral is formed by two triangles joined along a spine.',
      'Triangle construction requires 3 elements (SSS).',
      'Drawing AC first gives the fixed reference points A and C from which arcs for B and D can be swung.',
    ],
  },
  {
    id: 'ch_math_013',
    nodeId: NODE_C8_MATH_029,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the fundamental geometric distinction between a sector and a segment of a circle?',
    options: [
      'A sector is bounded by two radii and an arc and contains the centre O; a segment is bounded by a chord and an arc and does not contain the centre (unless it is a semicircle).',
      'A sector is bounded by two chords; a segment is bounded by two radii.',
      'A sector has straight curved edges; a segment has no curved boundaries.',
      'A sector and segment are mathematically identical in all circles.',
    ],
    correctIndex: 0,
    explanation: 'A sector is like a pizza slice whose vertex is at the centre O, bounded by 2 radii and an arc. A segment is the slice bounded by a straight chord and its corresponding arc, without reaching the centre.',
    hints: [
      'Think of a pizza: a sector goes all the way to the middle point.',
      'A chord cuts across the circle without having to touch the centre.',
      'Segment boundary = chord + arc; Sector boundary = 2 radii + arc.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_math_014',
    nodeId: NODE_C8_MATH_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A graph plots simple interest on ₹2000 at 7.5% per annum against time in years: I = 150t. Using this linear relation, what is the interest earned at t = 4.5 years in rupees (₹)?',
    correctAnswer: 675,
    tolerance: 1,
    unit: '₹',
    explanation: 'Interest I = 150 × t. For t = 4.5: I = 150 × 4.5 = ₹675. On a linear graph, tracing vertically from x = 4.5 to the line and across gives y = 675.',
    hints: [
      'The linear formula is y = 150x where x is time in years and y is interest.',
      'Multiply 150 by 4.5.',
      '150 × 4 = 600, plus 150 × 0.5 = 75, giving 675.',
    ],
  },
  {
    id: 'ch_math_015',
    nodeId: NODE_C8_MATH_022,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A father is 3 times as old as his daughter. In 12 years, the sum of their ages will be 72. Which algebraic model and solution correctly represent this scenario?',
    options: [
      'Let daughter = x, father = 3x; (x + 12) + (3x + 12) = 72 ⇒ 4x + 24 = 72 ⇒ x = 12; Father = 36, Daughter = 12',
      'Let daughter = x, father = x/3; (x + 12) + (x/3 + 12) = 72 ��� x = 36; Father = 12, Daughter = 36',
      'Let daughter = x, father = 3x; 3x + 12 = 72 ⇒ x = 20; Father = 60, Daughter = 20',
      'Let daughter = x, father = 3x; 4x = 72 ⇒ x = 18; Father = 54, Daughter = 18',
    ],
    correctIndex: 0,
    explanation: 'Setting daughter = x gives father = 3x. In 12 years, daughter is (x+12) and father is (3x+12). Sum: 4x + 24 = 72 ⇒ 4x = 48 ⇒ x = 12. Verification: in 12 years they are 24 and 48; 24 + 48 = 72.',
    hints: [
      'Name the smaller independent variable: Daughter = x.',
      'Write the age of both individuals 12 years in the future: (x + 12) and (3x + 12).',
      'Set their sum equal to 72 and solve for x using properties of equality.',
    ],
  },
  {
    id: 'ch_math_016',
    nodeId: NODE_C8_MATH_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Compare a triangular prism and a square pyramid. Which statement correctly analyses their Euler invariants?',
    options: [
      'Triangular prism (V=6, E=9, F=5) has 6 - 9 + 5 = 2; Square pyramid (V=5, E=8, F=5) has 5 - 8 + 5 = 2. Both verify V - E + F = 2.',
      'Triangular prism has V=5, E=8, F=5; Square pyramid has V=6, E=9, F=5.',
      'Euler’s formula applies to triangular prisms but fails for square pyramids.',
      'Both shapes have 8 vertices and 12 edges.',
    ],
    correctIndex: 0,
    explanation: 'Triangular prism: 2 triangle bases + 3 rectangles ⇒ V=3+3=6, E=3+3+3=9, F=2+3=5 (6-9+5=2). Square pyramid: 1 square base + 4 triangles ⇒ V=4+1=5, E=4+4=8, F=1+4=5 (5-8+5=2).',
    hints: [
      'A triangular prism has 3 vertices at top triangle and 3 at bottom triangle.',
      'A square pyramid has 4 base corners plus 1 top apex.',
      'Compute V - E + F for both polyhedra to verify they both equal 2.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_math_017',
    nodeId: NODE_C8_MATH_024,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims: "Because all four sides of a rhombus are equal, its diagonals must be equal in length." Evaluate this mathematical statement.',
    options: [
      'Incorrect. Equal sides guarantee diagonals bisect at 90° (perpendicular), but diagonal lengths are unequal unless the rhombus has 90° angles (becoming a square).',
      'Correct. Any equilateral quadrilateral must have equal diagonals.',
      'Partially correct. Diagonals are equal only if the perimeter exceeds 40 cm.',
      'Incorrect. Diagonals of a rhombus neither bisect nor meet at right angles.',
    ],
    correctIndex: 0,
    explanation: 'Equal side lengths force the diagonals to be perpendicular bisectors (rhombus property). Equality of diagonal lengths is a rectangle property (arising from 90° interior angles). Only a square satisfies both.',
    hints: [
      'Picture a stretched diamond shape (rhombus): one diagonal is visibly longer than the other.',
      'What angle do the diagonals make where they cross in a rhombus? (90°).',
      'Equal diagonal length is inherited from the rectangle family, not the rhombus family.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_math_018',
    nodeId: NODE_C8_MATH_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why are exactly FIVE independent elements required to construct a unique quadrilateral, even though a quadrilateral has ten elements in total?',
    options: [
      'A quadrilateral has 8 degrees of freedom in a plane minus 3 rigid motions (or 2 triangles requiring 3 + 2 = 5 independent parts).',
      'Because all quadrilaterals have 5 vertices.',
      'Four sides fix the shape and the 5th element determines the perimeter.',
      'Five angles must be specified because the angle sum is 360°.',
    ],
    correctIndex: 0,
    explanation: 'A quadrilateral has 10 elements (4 sides, 4 angles, 2 diagonals). Splitting along a diagonal yields two triangles. The first triangle requires 3 elements (e.g. SSS), and the attached second triangle requires 2 additional elements, totaling 5.',
    hints: [
      'Think of how a triangle needs 3 elements to be uniquely fixed.',
      'A quadrilateral is two triangles glued along a common edge.',
      '3 elements fix the first triangle, and 2 more fix the remaining vertex.',
    ],
  },
  {
    id: 'ch_math_019',
    nodeId: NODE_C8_MATH_030,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Comparing side length s vs Perimeter P = 4s and side length s vs Area A = s² on a Cartesian graph, what fundamental difference is observed?',
    options: [
      'Perimeter P = 4s yields a straight line through the origin (linear); Area A = s² yields an upward curving parabola (non-linear).',
      'Both P = 4s and A = s² form identical straight lines passing through (4,16).',
      'Perimeter forms a curve while area forms a straight line.',
      'Neither can be plotted on a Cartesian plane because s cannot be zero.',
    ],
    correctIndex: 0,
    explanation: 'P = 4s has a constant rate of change (slope 4), producing a straight linear graph through (0,0). A = s² has increasing differences (+3, +5, +7...), producing a non-linear quadratic curve.',
    hints: [
      'Calculate the differences between consecutive y-values for s = 1, 2, 3, 4.',
      'For perimeter: 4, 8, 12, 16 (constant difference of 4 ⇒ straight line).',
      'For area: 1, 4, 9, 16 (increasing differences ⇒ curved parabola).',
    ],
  },
  {
    id: 'ch_math_020',
    nodeId: NODE_C8_MATH_021,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the factorised binomial square expression for: 25x² - 30xy + 9y²',
    availableParts: ['(5x - 3y)²', '(5x + 3y)²', '(25x - 9y)', '(5x - 3y)(5x + 3y)', '·', '+'],
    targetState: '(5x - 3y)²',
    validationHint: 'Check that (5x)² = 25x², (3y)² = 9y², and middle term is -2(5x)(3y) = -30xy.',
    explanation: '25x² = (5x)², 9y² = (3y)², and middle term = -2(5x)(3y) = -30xy. Applying (a - b)² = a² - 2ab + b² yields (5x - 3y)². Expanding confirms: 25x² - 30xy + 9y².',
    hints: [
      'Check if the first and last terms are perfect squares: √(25x²) = 5x and √(9y²) = 3y.',
      'Check the sign of the middle term: -30xy is negative.',
      'Apply the perfect square identity (a - b)² = a² - 2ab + b².',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_math_021',
    nodeId: NODE_C8_MATH_023,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In an irregular quadrilateral land plot ABCD, the four angles are in the ratio 3 : 4 : 5 : 6. What is the measure of the largest angle in degrees?',
    correctAnswer: 120,
    tolerance: 0.5,
    unit: 'degrees (°)',
    explanation: 'Sum of ratio parts = 3 + 4 + 5 + 6 = 18 parts. 18x = 360° ⇒ x = 20°. The largest angle is 6x = 6 × 20° = 120°. Verification: 60° + 80° + 100° + 120° = 360°.',
    hints: [
      'Set up the equation: 3x + 4x + 5x + 6x = 360°.',
      'Combine like terms: 18x = 360°, so find x.',
      'Multiply x = 20° by 6 for the largest angle.',
    ],
  },
  {
    id: 'ch_math_022',
    nodeId: NODE_C8_MATH_026,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student asserts that Euler’s formula V - E + F = 2 applies to a cylinder and sphere. Evaluate this assertion from first geometric principles.',
    options: [
      'Invalid. Euler’s formula is strictly proven for polyhedra bounded by flat plane polygonal faces. Cylinders and spheres possess curved surfaces where straight edges and vertices are undefined.',
      'Valid. Any 3-D object automatically obeys Euler’s relation.',
      'Valid for cylinders (2 faces + 1 curved = 3) but invalid for spheres.',
      'Valid only if the sphere is inscribed in a cube.',
    ],
    correctIndex: 0,
    explanation: 'Euler’s formula V - E + F = 2 requires all faces to be flat polygons and all edges to be straight segments meeting at sharp vertex corners. Curved solids do not satisfy these polyhedral boundary conditions.',
    hints: [
      'Look at the definition of a polyhedron: must be bounded by flat polygonal faces.',
      'Does a sphere have straight edges or corner vertices?',
      'Curved shapes are excluded from the classical Euler polyhedral formula.',
    ],
    misconceptionIndex: 2,
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
  nodeId: NODE_C8_MATH_021,
  title: 'Class 8 Mathematics: Factorisation & Geometric Principles',
  definition: 'Factorisation is the decomposition of algebraic expressions into products of irreducible factors using common terms, identities, and middle-term splitting. Along with contextual linear equations, angle sums, parallelogram verification, polyhedral Euler invariants, quadrilateral construction, symmetry, circle parts, and Cartesian graphing, it forms the unified bedrock of Class 8 ICSE Mathematics.',
  eli5: 'Think of factorisation as unpacking a packed box to see the exact items that built it. Geometry does the same for shapes: splitting quadrilaterals into triangles, unpacking 3D boxes into flat nets, and plotting coordinates on a grid map.',
  misconceptions: [
    {
      misconception: 'Confusing perfect squares with simple product binomials (e.g. x² + 6x + 9 = (x + 9)(x + 1)).',
      correction: 'Check whether the end terms are squares (x)² and (3)² and if the middle term equals 2·x·3. Here it factorises to (x + 3)²',
    },
    {
      misconception: 'Believing a circle sector and segment are identical.',
      correction: 'A sector is enclosed by two radii and an arc and includes the centre; a segment is bounded by a chord and an arc and does not include the centre.',
    },
    {
      misconception: 'Applying Euler’s formula (V - E + F = 2) to curved solids like cones and cylinders.',
      correction: 'Euler’s invariant strictly applies to flat-faced polyhedra only, where vertices and edges are sharp straight lines.',
    },
    {
      misconception: 'Assuming the diagonals of all parallelograms and rectangles are lines of reflection symmetry.',
      correction: 'Folding along the diagonal of an oblique parallelogram or rectangle produces mismatched flaps. Only squares and rhombuses have diagonal line symmetry.',
    },
    {
      misconception: 'Writing a difference of squares as a squared binomial: a² - b² = (a - b)².',
      correction: 'a² - b² = (a - b)(a + b). Expanding (a - b)² yields a² - 2ab + b², which includes a middle term.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the factorisation of 4a² - 9b²?', options: ['(2a - 3b)(2a + 3b)', '(2a - 3b)²', '(4a - 9b)(a + b)', '2(a - 3b)'], correctIndex: 0 },
    { question: 'If 3 angles of a quadrilateral are 90°, 90°, and 120°, what is the 4th angle?', options: ['60°', '70°', '90°', '80°'], correctIndex: 0 },
    { question: 'What are the V, E, F counts for a triangular prism?', options: ['V=6, E=9, F=5', 'V=5, E=8, F=5', 'V=8, E=12, F=6', 'V=4, E=6, F=4'], correctIndex: 0 },
    { question: 'How many lines of symmetry does an equilateral triangle have?', options: ['3', '1', '2', '6'], correctIndex: 0 },
    { question: 'What is the longest chord of a circle?', options: ['Diameter', 'Radius', 'Secant', 'Arc'], correctIndex: 0 },
    { question: 'Solve: (3/4)x - 6 = 18. What is x?', options: ['32', '24', '30', '36'], correctIndex: 0 },
    { question: 'In a parallelogram ABCD, if ∠A = 70°, what is ∠B?', options: ['110°', '70°', '90°', '120°'], correctIndex: 0 },
    { question: 'Does the point (0, -5) lie on an axis?', options: ['Yes, on the negative y-axis', 'Yes, on the x-axis', 'In Quadrant III', 'In Quadrant IV'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student demonstrates proficiency in factorising simple algebraic cases, solving contextual linear equations, applying quadrilateral angle sums, verifying parallelogram properties, evaluating 3-D polyhedra with Euler’s formula, and plotting linear graphs.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Algebra Tiles & Factorisation Area Model',
    instruction: 'Adjust the x-dimension and constant sliders to see how algebraic expressions visually form a rectangular area: (x + a)(x + b) = x² + (a+b)x + ab.',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_MATH_021,
  },
  {
    title: 'Lab 2: Quadrilateral Angle Sum & Diagonal Split',
    instruction: 'Drag the quadrilateral vertices and toggle the diagonal to observe how two triangles (180° + 180°) always sum to 360°.',
    interactionType: 'drag-position',
    nodeId: NODE_C8_MATH_023,
  },
  {
    title: 'Lab 3: Parallelogram & Diagonal Verification',
    instruction: 'Adjust the shear slant and side length sliders to verify that opposite sides remain equal and diagonals bisect each other.',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_MATH_024,
  },
  {
    title: 'Lab 4: 3-D Polyhedra & Euler’s Invariant (V - E + F = 2)',
    instruction: 'Switch between Polyhedra (Cube, Triangular Prism, Square Pyramid, Tetrahedron) to inspect vertices, edges, and faces in real-time.',
    interactionType: 'click-parts',
    nodeId: NODE_C8_MATH_026,
  },
  {
    title: 'Lab 5: Interactive Circle Geometry & Cartesian Plotter',
    instruction: 'Adjust the radius and arc angle to distinguish sectors from segments, and inspect point coordinates on the Cartesian plane.',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_MATH_029,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you expand a rectangle of width (x + 3) and length (x + 4), what will be the coefficient of the middle x term and the constant term?',
    options: [
      'Middle coefficient = 7, Constant = 12',
      'Middle coefficient = 12, Constant = 7',
      'Middle coefficient = 7, Constant = 7',
      'Middle coefficient = 1, Constant = 12',
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the sliders to a = 3 and b = 4 in the interactive area model below to verify x² + 7x + 12.',
    nodeId: NODE_C8_MATH_021,
  },
  {
    question: 'Predict: If you increase the shear angle of a parallelogram while keeping side lengths fixed, what happens to the sum of all 4 interior angles?',
    options: [
      'The sum remains strictly 360° because it remains a quadrilateral.',
      'The sum increases beyond 360° as the acute angles get larger.',
      'The sum decreases towards 180° as the shape flattens.',
      'The sum changes depending on whether it is a rhombus or rectangle.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Drag the parallelogram shear slider in Lab 3 to see opposite angles adjust while the total remains precisely 360°.',
    nodeId: NODE_C8_MATH_024,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the four sub-regions inside the area model when you set length = (x + a) and width = (x + b)?',
    observableOptions: [
      'There is 1 square of x², two rectangles of ax and bx, and 1 constant box of ab.',
      'There are only 2 square tiles of equal area.',
      'The total area equals x² + ab with no middle terms.',
      'The tiles overlap and lose area.',
    ],
    correctIndex: 0,
    nodeId: NODE_C8_MATH_021,
  },
  {
    question: 'What pattern holds for Euler’s invariant V - E + F across ALL four polyhedra in Lab 4?',
    observableOptions: [
      'V - E + F is always exactly equal to 2 for all flat-faced polyhedra.',
      'V - E + F increases as the number of faces increases.',
      'V - E + F equals 0 for prisms and 2 for pyramids.',
      'V - E + F fluctuates randomly.',
    ],
    correctIndex: 0,
    nodeId: NODE_C8_MATH_026,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Architectural Blueprint & Heritage Survey',
  description: 'Apply your Class 8 Mathematics toolkit to plan an authentic community park or heritage pavilion. Use factorised area modules for pavement tiles, calculate roof truss angles using quadrilateral angle sums, verify polyhedral dome frames using Euler’s formula, and map solar lamp coordinates on a Cartesian layout.',
  steps: [
    'Design a modular pavilion floor plan with an area represented by x² + 8x + 15 and factorise it to find modular wall lengths (x + 3)(x + 5).',
    'Calculate the 4th support angle of an irregular quadrilateral roof canopy given three structural joint angles: 85°, 105°, and 95°.',
    'Verify that the geodesic glass pavilion dome (built of 12 pentagons and 20 hexagons) obeys Euler’s formula V - E + F = 2.',
    'Draw a Cartesian grid of the park with the fountain at origin (0,0) and plot light posts along the linear path y = 2x + 1.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C8_MathematicsFactorisationsimpleCasesSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C8_MATH_021,
  title = DEFAULT_PROPS.title || 'Class 8 Mathematics',
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant-style Predict & Observe State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [selectedPolyhedron, setSelectedPolyhedron] = useState<'cube' | 'prism' | 'pyramid' | 'tetrahedron'>('cube');

  // Interactive Exploration Variables
  const [tileX, setTileX] = useState(4);
  const [tileA, setTileA] = useState(2);
  const [tileB, setTileB] = useState(3);
  const [quadAngleA, setQuadAngleA] = useState(80);
  const [quadAngleB, setQuadAngleB] = useState(110);
  const [quadAngleC, setQuadAngleC] = useState(100);
  const [showDiagonal, setShowDiagonal] = useState(true);
  const [paraSlant, setParaSlant] = useState(25);
  const [paraBase, setParaBase] = useState(120);
  const [paraHeight, setParaHeight] = useState(70);
  const [showDiagonalsPara, setShowDiagonalsPara] = useState(true);
  const [circleRadius, setCircleRadius] = useState(60);
  const [circleArcAngle, setCircleArcAngle] = useState(75);
  const [showSector, setShowSector] = useState(true);
  const [showSegment, setShowSegment] = useState(true);
  const [cartesianX, setCartesianX] = useState(3);
  const [cartesianM, setCartesianM] = useState(2);
  const [cartesianC, setCartesianC] = useState(1);
  const [activeTabExplore, setActiveTabExplore] = useState<'visual' | 'equation' | 'geometry'>('visual');

  // Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints and reveal state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag & Drop / Challenge state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [wrongOptionIndex, setWrongOptionIndex] = useState<number | null>(null);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE CHALLENGES FILTER ───
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

  // ─── BKT UPDATE EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
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
    let animId: number;
    let frame = 0;

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
      ctx.lineWidth = 2.5;
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x + frame * 1.5) * 0.04) * 14;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const trackerX = (frame * 2) % canvas.width;
      const trackerY = canvas.height / 2 + Math.sin((trackerX + frame * 1.5) * 0.04) * 14;
      ctx.beginPath();
      ctx.arc(trackerX, trackerY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── CALLBACKS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint: ${hintMsg}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us review the step-by-step mathematical reasoning.');
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

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    setSelectedOptionIndex(selectedIndex);
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (!isCorrect) {
      setWrongOptionIndex(selectedIndex);
    }
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent insight! (x+2)(x+3) equals x² + 5x + 6.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Explore each concept hands-on.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test values in Sandbox mode before taking on the challenges.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Mode Activated. Read each problem carefully.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction noted! Now manipulate the sliders to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation!' : 'Inspect the four sub-regions of the visual model.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations on completing the Mathematics Mastery Simulation!');
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
    setSelectedOptionIndex(null);
    setWrongOptionIndex(null);

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
      const idx = answer as number;
      setSelectedOptionIndex(idx);
      isCorrect = idx === challenge.correctIndex;
      if (!isCorrect) {
        setWrongOptionIndex(idx);
      }
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (typeof answer === 'string' ? answer.trim() : '') === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct answer! Well done.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify({ score: 100, timestamp: Date.now() }));
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
        speechManager.speak('Here is the full mathematical explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

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
      let arr = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleAddConstructPart = useCallback((part: string) => {
    audioManager.play('tap');
    setConstructParts(prev => [...prev, part]);
  }, []);

  const handleRemoveConstructPart = useCallback((index: number) => {
    audioManager.play('pop');
    setConstructParts(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleSlideChange = useCallback((newSlide: number) => {
    setCurrentSlide(newSlide);
    audioManager.play('whoosh');
  }, []);

  // ─── DERIVED VALUES FOR REAL-TIME LAB COMPUTATIONS ───
  const calculated4thAngle = useMemo(() => {
    return Math.max(10, 360 - (quadAngleA + quadAngleB + quadAngleC));
  }, [quadAngleA, quadAngleB, quadAngleC]);

  const factorisedExpression = useMemo(() => {
    const sumAB = tileA + tileB;
    const prodAB = tileA * tileB;
    return `x² + ${sumAB}x + ${prodAB} = (x + ${tileA})(x + ${tileB})`;
  }, [tileA, tileB]);

  const polyData = useMemo(() => {
    switch (selectedPolyhedron) {
      case 'cube':
        return { name: 'Cube / Cuboid', v: 8, e: 12, f: 6, verified: '8 - 12 + 6 = 2' };
      case 'prism':
        return { name: 'Triangular Prism', v: 6, e: 9, f: 5, verified: '6 - 9 + 5 = 2' };
      case 'pyramid':
        return { name: 'Square Pyramid', v: 5, e: 8, f: 5, verified: '5 - 8 + 5 = 2' };
      case 'tetrahedron':
        return { name: 'Tetrahedron (Triangular Pyramid)', v: 4, e: 6, f: 4, verified: '4 - 6 + 4 = 2' };
    }
  }, [selectedPolyhedron]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gold-600/30 border border-gold-500/40 flex items-center justify-center text-2xl shadow-inner"
            aria-label="Simulation subject icon"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              {title}
            </h1>
            <p className="text-xs text-gold-400 font-medium">
              ICSE Class 8 • NEP 2020 Competency Simulator • Active Node: <span className="font-mono text-slate-300">{nodeId}</span>
            </p>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800 gap-1 text-xs font-semibold">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              aria-label={`Switch to ${p} phase`}
              className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
                phase === p ? 'bg-gold-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mt-6 space-y-6"
          >
            {/* Narrative Scenario Banner */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 bg-gradient-to-br from-gold-950/80 via-slate-900 to-slate-900 rounded-3xl border border-gold-700/50 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <span className="px-3 py-1 bg-gold-500/20 text-gold-300 rounded-full text-xs font-bold uppercase tracking-wider border border-gold-500/30">
                  Architectural Mission
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white mt-2">{SCENARIO.title}</h2>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
                <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-gold-300 font-mono">
                  🏛️ Mission Target: Master Factorisation (c8_math_021), Polygons (c8_math_023-024), 3D Polyhedra (c8_math_025-026), Symmetry (c8_math_028), Circles (c8_math_029), and Coordinate Graphs (c8_math_030).
                </div>
              </div>
            </motion.div>

            {/* Curiosity Hook Question */}
            <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-lg">💡</span>
                <h3 className="text-base font-bold text-white">Curiosity Challenge: The Blueprint Unpacking</h3>
              </div>
              <p className="text-slate-200 text-sm font-medium">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={wrongOptionIndex === i ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`p-4 rounded-2xl text-left text-sm font-semibold transition-all border flex items-center justify-between ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : discoveryAnswered && wrongOptionIndex === i
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-900 border-slate-800 text-slate-500 opacity-50'
                        : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span>
                      <span className="font-mono text-gold-400 mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                    </span>
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                      <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                    )}
                    {discoveryAnswered && wrongOptionIndex === i && (
                      <span className="text-rose-400 font-bold ml-2">✗ Incorrect</span>
                    )}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 bg-gold-950/40 rounded-2xl border border-gold-800/60 mt-4 space-y-3"
                >
                  <p className={discoveryCorrect ? 'text-emerald-400 text-sm font-bold flex items-center gap-1' : 'text-amber-300 text-sm font-bold flex items-center gap-1'}>
                    <span>{discoveryCorrect ? '✓' : '👉'}</span>
                    <span>{discoveryCorrect ? 'Spot on! Length and breadth are the factors of the polynomial area.' : 'Let’s discover why this holds in the interactive labs!'}</span>
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">{DISCOVERY_QUESTION.hintAfter}</p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAdvanceToExploration}
                    aria-label="Launch Interactive Labs"
                    className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-purple-600 text-white font-bold text-sm rounded-xl shadow-lg flex items-center gap-2"
                  >
                    Launch Interactive Labs →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 2. GUIDED INTERACTIVE EXPLORATION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mt-6 space-y-6"
          >
            {/* Exploration Slide Header */}
            <div className="flex flex-wrap items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800 gap-2">
              <div>
                <span className="text-xs font-mono text-gold-400 uppercase tracking-wider">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-slate-800 rounded-lg text-xs font-mono text-slate-400">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>
            </div>

            <p className="text-sm text-amber-300/90 font-medium bg-amber-950/30 p-3 rounded-xl border border-amber-900/40">
              👉 {EXPLORATION_STEPS[currentSlide].instruction}
            </p>

            {/* LAB 1: FACTORISATION & ALGEBRA TILES */}
            {currentSlide === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 bg-slate-900/80 rounded-3xl border border-slate-800"
              >
                <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center min-h-[320px]">
                  <svg viewBox="0 0 340 300" className="w-full max-w-xs md:max-w-sm" aria-label="Algebra tile area model diagram">
                    <rect x="40" y="40" width="140" height="140" fill="#4338ca" stroke="#818cf8" strokeWidth="2" rx="4" />
                    <text x="110" y="115" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">x²</text>

                    <rect x="185" y="40" width={tileB * 24} height="140" fill="#047857" stroke="#34d399" strokeWidth="2" rx="4" />
                    <text x={185 + (tileB * 12)} y="115" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">{tileB}x</text>

                    <rect x="40" y="185" width="140" height={tileA * 24} fill="#0369a1" stroke="#38bdf8" strokeWidth="2" rx="4" />
                    <text x="110" y={185 + (tileA * 14)} fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">{tileA}x</text>

                    <rect x="185" y="185" width={tileB * 24} height={tileA * 24} fill="#b45309" stroke="#fbbf24" strokeWidth="2" rx="4" />
                    <text x={185 + (tileB * 12)} y={185 + (tileA * 14)} fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">
                      {tileA * tileB}
                    </text>

                    <text x="110" y="30" fill="#94a3b8" fontSize="12" textAnchor="middle">Width = x + {tileB}</text>
                    <text x="25" y="115" fill="#94a3b8" fontSize="12" textAnchor="middle" transform="rotate(-90 25 115)">Height = x + {tileA}</text>
                  </svg>
                  <p className="text-xs text-slate-400 mt-2 font-mono">Total Rectangular Area = (x + {tileA})(x + {tileB})</p>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <label className="text-xs font-bold text-slate-300 flex justify-between" htmlFor="tile-a-slider">
                      <span>Tile Parameter a:</span>
                      <span className="text-gold-400 font-mono">{tileA}</span>
                    </label>
                    <input
                      id="tile-a-slider"
                      type="range"
                      min={1}
                      max={5}
                      value={tileA}
                      aria-label="Tile parameter a"
                      onChange={(e) => {
                        setTileA(Number(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-gold-500"
                    />

                    <label className="text-xs font-bold text-slate-300 flex justify-between" htmlFor="tile-b-slider">
                      <span>Tile Parameter b:</span>
                      <span className="text-emerald-400 font-mono">{tileB}</span>
                    </label>
                    <input
                      id="tile-b-slider"
                      type="range"
                      min={1}
                      max={5}
                      value={tileB}
                      aria-label="Tile parameter b"
                      onChange={(e) => {
                        setTileB(Number(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-emerald-500"
                    />
                  </div>

                  <div className="p-4 bg-gold-950/60 rounded-2xl border border-gold-800">
                    <span className="text-xs text-gold-300 font-bold uppercase tracking-wider">Multi-Representation:</span>
                    <p className="text-base font-black text-white font-mono mt-1">{factorisedExpression}</p>
                    <p className="text-xs text-slate-300 mt-1">
                      Middle term splitting: {tileA + tileB}x breaks into {tileA}x + {tileB}x.
                    </p>
                  </div>

                  {!predictionMade ? (
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-xs font-bold text-amber-300">{PREDICTION_QUESTIONS[0].question}</p>
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction(i)}
                          aria-label={`Prediction option ${i + 1}: ${opt}`}
                          className="w-full text-left p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 border border-slate-800"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-950/50 rounded-xl border border-emerald-800 text-xs text-emerald-300 flex items-center gap-1.5">
                      <span className="font-bold">✓</span>
                      <span>Prediction recorded! Sliders verify that a=3, b=4 produces x² + 7x + 12.</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* LAB 2: QUADRILATERAL ANGLE SUM */}
            {currentSlide === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 bg-slate-900/80 rounded-3xl border border-slate-800"
              >
                <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center min-h-[320px]">
                  <svg viewBox="0 0 360 280" className="w-full max-w-sm" aria-label="Quadrilateral angle sum and diagonal split diagram">
                    <polygon
                      points="60,200 280,220 300,70 120,50"
                      fill="#1e1b4b"
                      stroke="#6366f1"
                      strokeWidth="3"
                    />

                    {showDiagonal && (
                      <line
                        x1="60"
                        y1="200"
                        x2="300"
                        y2="70"
                        stroke="#f59e0b"
                        strokeWidth="2.5"
                        strokeDasharray="5 5"
                      />
                    )}

                    <circle cx="60" cy="200" r="7" fill="#818cf8" />
                    <text x="45" y="215" fill="white" fontSize="13" fontWeight="bold">A ({quadAngleA}°)</text>

                    <circle cx="280" cy="220" r="7" fill="#818cf8" />
                    <text x="295" y="235" fill="white" fontSize="13" fontWeight="bold">B ({quadAngleB}°)</text>

                    <circle cx="300" cy="70" r="7" fill="#818cf8" />
                    <text x="315" y="65" fill="white" fontSize="13" fontWeight="bold">C ({quadAngleC}°)</text>

                    <circle cx="120" cy="50" r="7" fill="#818cf8" />
                    <text x="105" y="40" fill="white" fontSize="13" fontWeight="bold">D ({calculated4thAngle}°)</text>

                    {showDiagonal && (
                      <>
                        <text x="180" y="180" fill="#fbbf24" fontSize="12" fontWeight="bold">ΔABC (180°)</text>
                        <text x="170" y="100" fill="#fbbf24" fontSize="12" fontWeight="bold">ΔACD (180°)</text>
                      </>
                    )}
                  </svg>
                  <p className="text-xs text-slate-400 mt-2 font-mono">
                    Total Interior Angle Sum = {quadAngleA}° + {quadAngleB}° + {quadAngleC}° + {calculated4thAngle}° = 360°
                  </p>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <label className="text-xs font-bold text-slate-300 flex justify-between" htmlFor="angle-a-slider">
                      <span>Angle A:</span>
                      <span className="text-gold-400 font-mono">{quadAngleA}°</span>
                    </label>
                    <input
                      id="angle-a-slider"
                      type="range"
                      min={40}
                      max={120}
                      value={quadAngleA}
                      aria-label="Quadrilateral interior angle A"
                      onChange={(e) => {
                        setQuadAngleA(Number(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-gold-500"
                    />

                    <label className="text-xs font-bold text-slate-300 flex justify-between" htmlFor="angle-b-slider">
                      <span>Angle B:</span>
                      <span className="text-gold-400 font-mono">{quadAngleB}°</span>
                    </label>
                    <input
                      id="angle-b-slider"
                      type="range"
                      min={40}
                      max={130}
                      value={quadAngleB}
                      aria-label="Quadrilateral interior angle B"
                      onChange={(e) => {
                        setQuadAngleB(Number(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-gold-500"
                    />

                    <label className="text-xs font-bold text-slate-300 flex justify-between" htmlFor="angle-c-slider">
                      <span>Angle C:</span>
                      <span className="text-gold-400 font-mono">{quadAngleC}°</span>
                    </label>
                    <input
                      id="angle-c-slider"
                      type="range"
                      min={40}
                      max={140}
                      value={quadAngleC}
                      aria-label="Quadrilateral interior angle C"
                      onChange={(e) => {
                        setQuadAngleC(Number(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-gold-500"
                    />

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowDiagonal(prev => !prev);
                        audioManager.play('tap');
                      }}
                      aria-label="Toggle diagonal split line"
                      className="w-full py-2 bg-slate-800 text-xs font-bold rounded-xl border border-slate-700 text-amber-300"
                    >
                      {showDiagonal ? 'Hide Triangle Split Diagonal' : 'Show Triangle Split (2 × 180° = 360°)'}
                    </motion.button>
                  </div>

                  <div className="p-4 bg-gold-950/50 rounded-2xl border border-gold-800 text-xs text-slate-300">
                    <span className="font-bold text-gold-300">Deductive Proof:</span> Any quadrilateral splits along a diagonal into 2 triangles. Since ΔABC = 180° and ΔACD = 180°, the sum of all 4 corners equals 360°.
                  </div>
                </div>
              </motion.div>
            )}

            {/* LAB 3: PARALLELOGRAM PROPERTIES */}
            {currentSlide === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 bg-slate-900/80 rounded-3xl border border-slate-800"
              >
                <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center min-h-[320px]">
                  <svg viewBox="0 0 360 280" className="w-full max-w-sm" aria-label="Parallelogram side and diagonal symmetry diagram">
                    <polygon
                      points={`60,200 ${60 + paraBase},200 ${60 + paraBase + paraSlant},${200 - paraHeight} ${60 + paraSlant},${200 - paraHeight}`}
                      fill="#064e3b"
                      stroke="#10b981"
                      strokeWidth="3"
                    />

                    {showDiagonalsPara && (
                      <>
                        <line
                          x1="60"
                          y1="200"
                          x2={60 + paraBase + paraSlant}
                          y2={200 - paraHeight}
                          stroke="#38bdf8"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                        <line
                          x1={60 + paraBase}
                          y1="200"
                          x2={60 + paraSlant}
                          y2={200 - paraHeight}
                          stroke="#f43f5e"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                        <circle
                          cx={(60 + (60 + paraBase + paraSlant)) / 2}
                          cy={(200 + (200 - paraHeight)) / 2}
                          r="5"
                          fill="#fbbf24"
                        />
                        <text
                          x={(60 + (60 + paraBase + paraSlant)) / 2 + 10}
                          y={(200 + (200 - paraHeight)) / 2 - 5}
                          fill="#fbbf24"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          O (Bisector)
                        </text>
                      </>
                    )}

                    <text x="50" y="215" fill="white" fontSize="12" fontWeight="bold">A</text>
                    <text x={60 + paraBase + 5} y="215" fill="white" fontSize="12" fontWeight="bold">B</text>
                    <text x={60 + paraBase + paraSlant + 5} y={200 - paraHeight - 5} fill="white" fontSize="12" fontWeight="bold">C</text>
                    <text x={60 + paraSlant - 15} y={200 - paraHeight - 5} fill="white" fontSize="12" fontWeight="bold">D</text>
                  </svg>
                  <p className="text-xs text-slate-400 mt-2 font-mono">
                    Verified: AB = CD, AD = BC, AO = OC, BO = OD.
                  </p>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <label className="text-xs font-bold text-slate-300 flex justify-between" htmlFor="para-slant-slider">
                      <span>Shear Slant Offset:</span>
                      <span className="text-emerald-400 font-mono">{paraSlant}px</span>
                    </label>
                    <input
                      id="para-slant-slider"
                      type="range"
                      min={0}
                      max={60}
                      value={paraSlant}
                      aria-label="Parallelogram shear slant offset"
                      onChange={(e) => {
                        setParaSlant(Number(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-emerald-500"
                    />

                    <label className="text-xs font-bold text-slate-300 flex justify-between" htmlFor="para-base-slider">
                      <span>Base Length:</span>
                      <span className="text-emerald-400 font-mono">{paraBase}px</span>
                    </label>
                    <input
                      id="para-base-slider"
                      type="range"
                      min={80}
                      max={180}
                      value={paraBase}
                      aria-label="Parallelogram base length"
                      onChange={(e) => {
                        setParaBase(Number(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-emerald-500"
                    />

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowDiagonalsPara(p => !p);
                        audioManager.play('tap');
                      }}
                      aria-label="Toggle diagonals and intersection point"
                      className="w-full py-2 bg-slate-800 text-xs font-bold rounded-xl border border-slate-700 text-emerald-300"
                    >
                      {showDiagonalsPara ? 'Hide Diagonals' : 'Show Diagonals & Midpoint O'}
                    </motion.button>
                  </div>

                  <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-800 text-xs text-emerald-200">
                    <span className="font-bold">Key Invariant:</span> Diagonals always bisect each other at O. When the shear is 0°, the parallelogram becomes a rectangle and diagonals become equal!
                  </div>
                </div>
              </motion.div>
            )}

            {/* LAB 4: 3-D POLYHEDRA & EULER’S FORMULA */}
            {currentSlide === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 bg-slate-900/80 rounded-3xl border border-slate-800"
              >
                <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center min-h-[320px]">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(['cube', 'prism', 'pyramid', 'tetrahedron'] as const).map((poly) => (
                      <motion.button
                        key={poly}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedPolyhedron(poly);
                          audioManager.play('tap');
                        }}
                        aria-label={`Select polyhedron shape: ${poly}`}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                          selectedPolyhedron === poly
                            ? 'bg-gold-600 text-white shadow-lg'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {poly}
                      </motion.button>
                    ))}
                  </div>

                  <svg viewBox="0 0 320 220" className="w-full max-w-xs" aria-label="3-D Polyhedron visual geometry model">
                    {selectedPolyhedron === 'cube' && (
                      <g>
                        <rect x="70" y="80" width="100" height="100" fill="#312e81" stroke="#818cf8" strokeWidth="2" opacity="0.8" />
                        <rect x="110" y="40" width="100" height="100" fill="#4338ca" stroke="#818cf8" strokeWidth="2" opacity="0.6" />
                        <line x1="70" y1="80" x2="110" y2="40" stroke="#818cf8" strokeWidth="2" />
                        <line x1="170" y1="80" x2="210" y2="40" stroke="#818cf8" strokeWidth="2" />
                        <line x1="70" y1="180" x2="110" y2="140" stroke="#818cf8" strokeWidth="2" />
                        <line x1="170" y1="180" x2="210" y2="140" stroke="#818cf8" strokeWidth="2" />
                      </g>
                    )}
                    {selectedPolyhedron === 'prism' && (
                      <g>
                        <polygon points="60,160 160,160 110,90" fill="#065f46" stroke="#34d399" strokeWidth="2" opacity="0.7" />
                        <polygon points="120,110 220,110 170,40" fill="#047857" stroke="#34d399" strokeWidth="2" opacity="0.5" />
                        <line x1="60" y1="160" x2="120" y2="110" stroke="#34d399" strokeWidth="2" />
                        <line x1="160" y1="160" x2="220" y2="110" stroke="#34d399" strokeWidth="2" />
                        <line x1="110" y1="90" x2="170" y2="40" stroke="#34d399" strokeWidth="2" />
                      </g>
                    )}
                    {selectedPolyhedron === 'pyramid' && (
                      <g>
                        <polygon points="60,160 180,180 240,140 120,120" fill="#854d0e" stroke="#facc15" strokeWidth="2" opacity="0.6" />
                        <line x1="60" y1="160" x2="150" y2="40" stroke="#facc15" strokeWidth="2" />
                        <line x1="180" y1="180" x2="150" y2="40" stroke="#facc15" strokeWidth="2" />
                        <line x1="240" y1="140" x2="150" y2="40" stroke="#facc15" strokeWidth="2" />
                        <line x1="120" y1="120" x2="150" y2="40" stroke="#facc15" strokeWidth="2" strokeDasharray="4 4" />
                        <circle cx="150" cy="40" r="5" fill="#facc15" />
                      </g>
                    )}
                    {selectedPolyhedron === 'tetrahedron' && (
                      <g>
                        <polygon points="70,170 230,170 150,130" fill="#9f1239" stroke="#fb7185" strokeWidth="2" opacity="0.6" />
                        <line x1="70" y1="170" x2="150" y2="30" stroke="#fb7185" strokeWidth="2" />
                        <line x1="230" y1="170" x2="150" y2="30" stroke="#fb7185" strokeWidth="2" />
                        <line x1="150" y1="130" x2="150" y2="30" stroke="#fb7185" strokeWidth="2" strokeDasharray="4 4" />
                        <circle cx="150" cy="30" r="5" fill="#fb7185" />
                      </g>
                    )}
                  </svg>
                  <p className="text-xs text-slate-400 mt-2 font-mono">
                    Euler Invariant: V ({polyData.v}) - E ({polyData.e}) + F ({polyData.f}) = 2
                  </p>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <h3 className="text-sm font-bold text-white">{polyData.name} Structural Counts</h3>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400">Vertices (V)</span>
                        <p className="text-lg font-black text-gold-400 font-mono">{polyData.v}</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400">Edges (E)</span>
                        <p className="text-lg font-black text-rose-400 font-mono">{polyData.e}</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400">Faces (F)</span>
                        <p className="text-lg font-black text-emerald-400 font-mono">{polyData.f}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-gold-950/60 rounded-xl border border-gold-800 font-mono text-xs text-center text-gold-300 font-bold">
                      {polyData.verified}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300">
                    <span className="font-bold text-amber-300">CISCE Scope Note:</span> Euler’s relation holds universally for polyhedra with flat faces, but does NOT apply to curved surfaces (spheres, cones, cylinders).
                  </div>
                </div>
              </motion.div>
            )}

            {/* LAB 5: CIRCLE ANATOMY & CARTESIAN PLOTTER */}
            {currentSlide === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 bg-slate-900/80 rounded-3xl border border-slate-800"
              >
                <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center min-h-[320px]">
                  <svg viewBox="0 0 320 280" className="w-full max-w-xs" aria-label="Circle radius, chord, segment, and sector geometry diagram">
                    <circle cx="160" cy="140" r={circleRadius} fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                    <circle cx="160" cy="140" r="4" fill="#f43f5e" />
                    <text x="165" y="135" fill="#f43f5e" fontSize="12" fontWeight="bold">O (Centre)</text>

                    {showSector && (
                      <path
                        d={`M 160 140 L ${160 + circleRadius} 140 A ${circleRadius} ${circleRadius} 0 0 0 ${
                          160 + circleRadius * Math.cos((circleArcAngle * Math.PI) / 180)
                        } ${140 - circleRadius * Math.sin((circleArcAngle * Math.PI) / 180)} Z`}
                        fill="#38bdf8"
                        fillOpacity="0.35"
                        stroke="#0284c7"
                        strokeWidth="2"
                      />
                    )}

                    {showSegment && (
                      <g>
                        <line
                          x1={160 - circleRadius * 0.7}
                          y1={140 + circleRadius * 0.7}
                          x2={160 + circleRadius * 0.7}
                          y2={140 + circleRadius * 0.7}
                          stroke="#f59e0b"
                          strokeWidth="2.5"
                        />
                        <text x="160" y={140 + circleRadius * 0.7 - 6} fill="#fbbf24" fontSize="10" textAnchor="middle">
                          Chord AB
                        </text>
                      </g>
                    )}

                    <line x1="160" y1="140" x2={160 + circleRadius} y2="140" stroke="#ec4899" strokeWidth="2" />
                    <text x={160 + circleRadius / 2} y="135" fill="#f472b6" fontSize="11" fontWeight="bold">r = {circleRadius}px</text>
                  </svg>
                  <p className="text-xs text-slate-400 mt-2 font-mono">
                    Sector contains centre O; Segment is cut by chord AB.
                  </p>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <label className="text-xs font-bold text-slate-300 flex justify-between" htmlFor="circle-radius-slider">
                      <span>Circle Radius:</span>
                      <span className="text-pink-400 font-mono">{circleRadius}px</span>
                    </label>
                    <input
                      id="circle-radius-slider"
                      type="range"
                      min={40}
                      max={90}
                      value={circleRadius}
                      aria-label="Circle radius in pixels"
                      onChange={(e) => {
                        setCircleRadius(Number(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-pink-500"
                    />

                    <label className="text-xs font-bold text-slate-300 flex justify-between" htmlFor="circle-arc-slider">
                      <span>Sector Central Angle:</span>
                      <span className="text-gold-400 font-mono">{circleArcAngle}°</span>
                    </label>
                    <input
                      id="circle-arc-slider"
                      type="range"
                      min={30}
                      max={150}
                      value={circleArcAngle}
                      aria-label="Sector central angle in degrees"
                      onChange={(e) => {
                        setCircleArcAngle(Number(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-gold-500"
                    />

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setShowSector(s => !s);
                          audioManager.play('tap');
                        }}
                        aria-label="Toggle circle sector visibility"
                        className="flex-1 py-2 bg-slate-800 text-xs font-bold rounded-xl text-gold-300 border border-slate-700"
                      >
                        {showSector ? 'Hide Sector' : 'Show Sector'}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setShowSegment(s => !s);
                          audioManager.play('tap');
                        }}
                        aria-label="Toggle circle segment visibility"
                        className="flex-1 py-2 bg-slate-800 text-xs font-bold rounded-xl text-amber-300 border border-slate-700"
                      >
                        {showSegment ? 'Hide Segment' : 'Show Segment'}
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-4 bg-gold-950/40 rounded-2xl border border-gold-800 text-xs text-gold-200">
                    <span className="font-bold">Crucial Distinction:</span> Sector = 2 Radii + Arc (contains centre). Segment = 1 Chord + Arc (does not contain centre).
                  </div>
                </div>
              </motion.div>
            )}

            {/* Slide Navigation Controls */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSlideChange(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                aria-label="Previous laboratory step"
                className="px-5 py-2.5 bg-slate-800 text-white font-bold rounded-xl disabled:opacity-40"
              >
                ← Prev Lab
              </motion.button>

              <div className="flex gap-1.5" aria-hidden="true">
                {EXPLORATION_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentSlide === i ? 'bg-gold-500 w-6' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSlideChange(currentSlide + 1)}
                  aria-label="Next laboratory step"
                  className="px-5 py-2.5 bg-gold-600 text-white font-bold rounded-xl"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  aria-label="Enter Free Sandbox Mode"
                  className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl shadow-lg"
                >
                  Enter Free Sandbox →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 3. FREE SANDBOX MODE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-6"
          >
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider">
                Open Sandbox
              </span>
              <h2 className="text-xl font-bold text-white">Cartesian Coordinate Grapher & Geometry Free Play</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Experiment freely without pressure or grading. Adjust the linear slope m and intercept c, or test point coordinates on the live Cartesian canvas.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 bg-slate-900/80 rounded-3xl border border-slate-800">
              <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center min-h-[320px]">
                <svg viewBox="-120 -120 240 240" className="w-full max-w-sm" aria-label="Interactive Cartesian coordinate grid with plotted line and point">
                  {[-80, -40, 40, 80].map((val) => (
                    <g key={val}>
                      <line x1={val} y1="-120" x2={val} y2="120" stroke="#1e293b" strokeWidth="1" />
                      <line x1="-120" y1={val} x2="120" y2={val} stroke="#1e293b" strokeWidth="1" />
                    </g>
                  ))}

                  <line x1="-120" y1="0" x2="120" y2="0" stroke="#64748b" strokeWidth="2" />
                  <line x1="0" y1="-120" x2="0" y2="120" stroke="#64748b" strokeWidth="2" />

                  <text x="105" y="-5" fill="#94a3b8" fontSize="10" fontWeight="bold">+X</text>
                  <text x="5" y="-105" fill="#94a3b8" fontSize="10" fontWeight="bold">+Y</text>

                  <line
                    x1="-80"
                    y1={-((-80 * cartesianM) / 5 + cartesianC * 10)}
                    x2="80"
                    y2={-((80 * cartesianM) / 5 + cartesianC * 10)}
                    stroke="#6366f1"
                    strokeWidth="3"
                  />

                  <circle
                    cx={cartesianX * 15}
                    cy={-(cartesianX * cartesianM * 3 + cartesianC * 10)}
                    r="6"
                    fill="#22c55e"
                  />
                  <text
                    x={cartesianX * 15 + 8}
                    y={-(cartesianX * cartesianM * 3 + cartesianC * 10) - 8}
                    fill="#22c55e"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    ({cartesianX}, {cartesianX * cartesianM + cartesianC})
                  </text>
                </svg>
                <p className="text-xs text-slate-400 mt-2 font-mono">
                  Linear Function: y = {cartesianM}x + {cartesianC}
                </p>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <label className="text-xs font-bold text-slate-300 flex justify-between" htmlFor="slope-m-slider">
                    <span>Slope / Multiplier m:</span>
                    <span className="text-gold-400 font-mono">{cartesianM}</span>
                  </label>
                  <input
                    id="slope-m-slider"
                    type="range"
                    min={-3}
                    max={4}
                    value={cartesianM}
                    aria-label="Linear slope m"
                    onChange={(e) => {
                      setCartesianM(Number(e.target.value));
                      audioManager.play('tap');
                    }}
                    className="w-full accent-gold-500"
                  />

                  <label className="text-xs font-bold text-slate-300 flex justify-between" htmlFor="intercept-c-slider">
                    <span>Y-Intercept c:</span>
                    <span className="text-gold-400 font-mono">{cartesianC}</span>
                  </label>
                  <input
                    id="intercept-c-slider"
                    type="range"
                    min={-4}
                    max={5}
                    value={cartesianC}
                    aria-label="Linear Y-intercept c"
                    onChange={(e) => {
                      setCartesianC(Number(e.target.value));
                      audioManager.play('tap');
                    }}
                    className="w-full accent-gold-500"
                  />

                  <label className="text-xs font-bold text-slate-300 flex justify-between" htmlFor="point-x-slider">
                    <span>Point X-Coordinate:</span>
                    <span className="text-emerald-400 font-mono">{cartesianX}</span>
                  </label>
                  <input
                    id="point-x-slider"
                    type="range"
                    min={-4}
                    max={4}
                    value={cartesianX}
                    aria-label="Point X coordinate value"
                    onChange={(e) => {
                      setCartesianX(Number(e.target.value));
                      audioManager.play('tap');
                    }}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToChallenge}
                  aria-label="Proceed to Challenge Mode"
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2"
                >
                  Ready for Challenges! →
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 4. ADAPTIVE CHALLENGE PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mt-6 space-y-6"
          >
            <canvas ref={canvasRef} width={600} height={40} className="w-full rounded-xl bg-slate-900 border border-slate-800" />

            {/* Challenge Progress Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-gold-400 uppercase tracking-wider">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <motion.span
                    key={difficulty}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      difficulty === 'foundation'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : difficulty === 'advanced'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-gold-500/20 text-gold-300 border border-gold-500/30'
                    }`}
                  >
                    {difficulty} TIER
                  </motion.span>
                  <span className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs rounded-full font-mono">
                    NEP: {challenge.competencyLevel.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400">Mastery Level:</span>
                <p className="text-sm font-black text-gold-400 capitalize">{masteryLevel}</p>
              </div>
            </div>

            {/* Animated Progress Bar */}
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-pink-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <div className="text-xs text-gold-300 mt-1">
              📅 SM-2 Spaced Repetition: review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to strengthen your memory.
            </div>

            {/* Question Card */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-6 rounded-3xl border transition-all ${
                wrongFlash
                  ? 'bg-rose-950/70 border-rose-500'
                  : 'bg-slate-900/90 border-slate-800'
              }`}
            >
              <h3 className="text-base md:text-lg font-bold text-white leading-snug mb-4">
                {challenge.question}
              </h3>

              {/* MCQ Types */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongOptionIndex === i ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`w-full text-left p-4 rounded-2xl text-sm font-semibold transition-all border flex items-center justify-between ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : showExplanation && wrongOptionIndex === i
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : showExplanation && i !== challenge.correctIndex
                          ? 'bg-slate-900 border-slate-800 text-slate-500 opacity-50'
                          : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span>
                        <span className="font-mono text-gold-400 mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                      </span>
                      {showExplanation && i === challenge.correctIndex && (
                        <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                      )}
                      {showExplanation && wrongOptionIndex === i && (
                        <span className="text-rose-400 font-bold ml-2">✗ Incorrect</span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Drag-Label Type Challenge */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 self-center mr-2">Palette:</span>
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        role="button"
                        tabIndex={0}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Draggable label: ${item.label}`}
                        className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold cursor-grab shadow-md"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <svg viewBox="0 0 380 260" className="w-full bg-slate-950 rounded-2xl border border-slate-800" aria-label="Drop target geometry diagram">
                    <circle cx="190" cy="130" r="80" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                    <circle cx="190" cy="130" r="4" fill="#f43f5e" />

                    <line x1="190" y1="130" x2="270" y2="130" stroke="#38bdf8" strokeWidth="2" />
                    <g
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('target_radius')}
                      className="cursor-pointer"
                      role="region"
                      aria-label="Radius drop target area"
                    >
                      <rect x="205" y="105" width="75" height="24" rx="6" fill="#1e293b" stroke="#38bdf8" />
                      <text x="242" y="121" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">
                        {droppedLabels.target_radius || 'Drop Radius'}
                      </text>
                    </g>

                    <line x1="110" y1="130" x2="270" y2="130" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
                    <g
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('target_diameter')}
                      className="cursor-pointer"
                      role="region"
                      aria-label="Diameter drop target area"
                    >
                      <rect x="100" y="105" width="85" height="24" rx="6" fill="#1e293b" stroke="#10b981" />
                      <text x="142" y="121" fill="#10b981" fontSize="10" textAnchor="middle" fontWeight="bold">
                        {droppedLabels.target_diameter || 'Drop Diameter'}
                      </text>
                    </g>

                    <line x1="135" y1="185" x2="245" y2="185" stroke="#f59e0b" strokeWidth="2.5" />
                    <g
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('target_chord')}
                      className="cursor-pointer"
                      role="region"
                      aria-label="Chord drop target area"
                    >
                      <rect x="150" y="195" width="80" height="24" rx="6" fill="#1e293b" stroke="#f59e0b" />
                      <text x="190" y="211" fill="#f59e0b" fontSize="10" textAnchor="middle" fontWeight="bold">
                        {droppedLabels.target_chord || 'Drop Chord'}
                      </text>
                    </g>

                    <g
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('target_sector')}
                      className="cursor-pointer"
                      role="region"
                      aria-label="Sector drop target area"
                    >
                      <rect x="150" y="45" width="80" height="24" rx="6" fill="#1e293b" stroke="#a855f7" />
                      <text x="190" y="61" fill="#c084fc" fontSize="10" textAnchor="middle" fontWeight="bold">
                        {droppedLabels.target_sector || 'Drop Sector'}
                      </text>
                    </g>
                  </svg>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    aria-label="Validate placed labels on diagram"
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Check Label Placements
                  </motion.button>
                </div>
              )}

              {/* Drag-Sort Type Challenge */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Drag to arrange in correct chronological/logical sequence:</p>
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, index) => (
                    <motion.div
                      key={index}
                      role="button"
                      tabIndex={0}
                      draggable
                      onDragStart={() => setDraggedItem(String(index))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, index);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      aria-label={`Sort item ${index + 1}: ${item}`}
                      className="p-3.5 bg-slate-800 rounded-2xl border border-slate-700 text-slate-200 text-xs font-semibold cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-gold-600/40 text-gold-300 flex items-center justify-center font-mono">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    aria-label="Submit sorted step sequence"
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Verify Step Sequence
                  </motion.button>
                </div>
              )}

              {/* Numeric Type Challenge */}
              {challenge.type === 'numeric' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter value"
                      aria-label={`Numeric input in ${challenge.unit || 'units'}`}
                      className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-white font-mono text-base focus:outline-none focus:border-gold-500"
                    />
                    <span className="text-slate-400 text-sm font-semibold">{challenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      aria-label="Submit numeric answer"
                      className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-2xl shadow-md"
                    >
                      Submit Answer
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Construct Type Challenge */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddConstructPart(part)}
                        aria-label={`Add expression part: ${part}`}
                        className="px-3.5 py-2 bg-gold-900/60 hover:bg-gold-800 text-gold-200 border border-gold-700/60 rounded-xl text-xs font-mono font-bold"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="min-h-[80px] p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-wrap items-center gap-2">
                    {constructParts.map((part, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-3.5 py-1.5 bg-gold-600 text-white font-mono text-xs font-bold rounded-xl flex items-center gap-2 shadow"
                      >
                        <span>{part}</span>
                        <button
                          onClick={() => handleRemoveConstructPart(i)}
                          aria-label={`Remove expression part: ${part}`}
                          className="text-rose-300 hover:text-white"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-slate-500 text-xs italic">Click parts above to construct the algebraic statement</span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    aria-label="Validate algebraic construction"
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Validate Construction
                  </motion.button>
                </div>
              )}

              {/* Step-by-Step Explanation Card */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-amber-950/40 border border-amber-800/80 rounded-2xl space-y-3"
                >
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <span>📖</span> Step-by-Step Mathematical Explanation:
                  </h4>
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
                          className="text-xs text-amber-200 leading-relaxed font-medium"
                        >
                          <span className="font-bold text-amber-400 font-mono mr-1">{i + 1}.</span>
                          {sentence}{!sentence.endsWith('.') && '.'}
                        </motion.p>
                      ))}
                  </div>

                  {revealedSteps <
                    challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setRevealedSteps(s => s + 1);
                        audioManager.play('tap');
                      }}
                      aria-label="Show next reasoning step"
                      className="px-4 py-1.5 bg-amber-700/80 hover:bg-amber-600 text-white text-xs font-bold rounded-lg"
                    >
                      Show Next Reasoning Step →
                    </motion.button>
                  )}

                  {revealedSteps >=
                    challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Advance to next challenge or complete"
                      className="block mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Simulation →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 5. COMPLETION & MASTERY SUMMARY ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-6"
          >
            {/* Completion Hero Banner */}
            <div className="p-8 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-900 rounded-3xl border border-emerald-600/40 text-center space-y-4">
              <span className="px-4 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider">
                Simulation Complete
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white">Mastery Certificate Earned!</h2>
              <p className="text-sm text-slate-300 max-w-xl mx-auto">
                You have solved complex factorisations, validated polygon invariants, surveyed polyhedral 3-D Euler formulas, and mapped Cartesian graphs.
              </p>

              <div className="flex justify-center gap-6 mt-4">
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400">Final Score</span>
                  <p className="text-2xl font-black text-emerald-400 font-mono">
                    {Math.max(0, 100 - errors * 5)}%
                  </p>
                </div>
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400">Mastery Tier</span>
                  <p className="text-2xl font-black text-gold-400 capitalize">{masteryLevel}</p>
                </div>
              </div>
            </div>

            {/* Personalized Motivational Feedback Banner based on error count */}
            <div className="p-6 bg-gold-950/40 rounded-2xl border border-gold-800/60 text-center">
              <h3 className="text-lg font-black text-gold-300 mb-1">
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors >= 1 && errors <= 3
                  ? 'Great work!'
                  : errors >= 4 && errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </h3>
              <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
                {errors === 0
                  ? 'Flawless comprehension across all Class 8 ICSE Mathematics core concepts.'
                  : errors <= 3
                  ? 'You demonstrated a rock-solid grasp of algebraic factoring, geometry invariants, and coordinate graphing.'
                  : errors <= 7
                  ? 'Solid foundation established. Review the misconceptions below to reinforce tricky edge cases.'
                  : 'Mathematics develops with practice and persistence. Review each reasoning step carefully!'}
              </p>
            </div>

            {/* Misconception Profile Tracking */}
            {hitMisconceptions.length > 0 && (
              <div className="p-6 bg-rose-950/30 rounded-3xl border border-rose-900/60 space-y-3">
                <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                  <span>⚠️</span> Diagnostic Misconception Profile:
                </h3>
                <div className="space-y-3">
                  {hitMisconceptions.map((idx, i) => {
                    const m = misconceptions?.[idx];
                    if (!m) return null;
                    return (
                      <div key={i} className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
                        <p className="text-xs font-bold text-rose-400 font-mono">✗ {m.misconception}</p>
                        <p className="text-xs text-emerald-300 font-medium">✓ {m.correction}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Spaced Repetition Visibility */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-amber-300">Spaced Repetition Schedule (SM-2):</span>
              <p>
                Based on your performance, this module is scheduled for memory consolidation review in{' '}
                <span className="font-bold text-amber-300">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </span>
                .
              </p>
            </div>

            {/* Real World Culmination Activity */}
            <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>📐</span> {REAL_WORLD_ACTIVITY.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="space-y-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                    <span className="font-mono text-gold-400 font-bold">{i + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C8_MathematicsFactorisationsimpleCasesSim;
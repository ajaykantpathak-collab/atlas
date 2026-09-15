'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── REQUIRED NODE IDS AS STRING LITERALS ───
const NODE_C10_MATH_041 = 'c10_math_041';
const NODE_C10_MATH_042 = 'c10_math_042';
const NODE_C10_MATH_043 = 'c10_math_043';
const NODE_C10_MATH_044 = 'c10_math_044';
const NODE_C10_MATH_045 = 'c10_math_045';
const NODE_C10_MATH_046 = 'c10_math_046';
const NODE_C10_MATH_047 = 'c10_math_047';
const NODE_C10_MATH_048 = 'c10_math_048';
const NODE_C10_MATH_049 = 'c10_math_049';
const NODE_C10_MATH_050 = 'c10_math_050';

const ALL_NODE_IDS = [
  NODE_C10_MATH_041,
  NODE_C10_MATH_042,
  NODE_C10_MATH_043,
  NODE_C10_MATH_044,
  NODE_C10_MATH_045,
  NODE_C10_MATH_046,
  NODE_C10_MATH_047,
  NODE_C10_MATH_048,
  NODE_C10_MATH_049,
  NODE_C10_MATH_050,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Urban Architect & Metro Planner: Smart City Masterplan',
  intro: 'You are the Chief Geometric Planner designing a futuristic smart corridor in Navi Mumbai. You must align parallel metro tracks, perpendicular power grids, similar model developments, bridge span proportions, and security scanner loci.',
  context: 'Mastering line relationships (slopes m1=m2, m1*m2=-1), triangle similarity, scale models, and locus paths is crucial to avoid catastrophic civil engineering collisions!',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Two metro lines run along slopes m1 = 3/4 and m2 = -4/3. How do these tracks interact at the central terminal junction?',
  options: [
    'They are parallel and will never intersect',
    'They meet at a sharp 45° angle',
    'They meet at an exact 90° right angle (perpendicular)',
    'They are identical coincident tracks',
  ],
  correctIndex: 2,
  hintAfter: 'Notice that (3/4) × (-4/3) = -1. When the product of two slopes is -1, the lines meet perpendicularly at 90°!',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 Aligned) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Slope Parallel (Recall)
  {
    id: 'ch_01',
    nodeId: NODE_C10_MATH_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Two straight lines have slopes m1 and m2. What is the algebraic condition for them to be parallel?',
    options: ['m1 × m2 = -1', 'm1 = m2', 'm1 + m2 = 0', 'm1 = -1/m2'],
    correctIndex: 1,
    explanation: 'Lines are parallel when they have identical steepness, meaning m1 = m2.',
    hints: [
      'Parallel lines rise and fall at the exact same rate.',
      'Their slopes must be numerically identical.',
      'Hence m1 = m2 is the condition for parallel lines.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Slope Perpendicular (Recall)
  {
    id: 'ch_02',
    nodeId: NODE_C10_MATH_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the condition for two lines with non-zero finite slopes m1 and m2 to be perpendicular?',
    options: ['m1 = m2', 'm1 × m2 = 1', 'm1 × m2 = -1', 'm1 - m2 = -1'],
    correctIndex: 2,
    explanation: 'Perpendicular lines meet at 90°, and their slopes satisfy m1 × m2 = -1 (negative reciprocals).',
    hints: [
      'One slope is positive while the other is negative, and their magnitudes invert.',
      'Multiply the two slopes together.',
      'The product of perpendicular slopes is always -1.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Similarity Concept (Understanding)
  {
    id: 'ch_03',
    nodeId: NODE_C10_MATH_042,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which statement accurately describes geometric similarity as a size transformation?',
    options: [
      'Shapes change, but all side lengths remain equal',
      'Corresponding angles are equal and corresponding sides are proportional',
      'Both shapes and sizes are strictly identical',
      'Scale factor k must always be equal to 1',
    ],
    correctIndex: 1,
    explanation: 'Similarity preserves angular shape while scaling all dimensions proportionally by a factor k.',
    hints: [
      'Think of zooming in or out on a digital photo.',
      'The angles stay the same while side lengths scale by k.',
      'Both equal angles and proportional sides are required.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation - Drag Label: Geometric Relationships
  {
    id: 'ch_04',
    nodeId: NODE_C10_MATH_041,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each condition label to match its geometric line relationship.',
    dragItems: [
      { label: 'm1 = m2', targetId: 'box_parallel' },
      { label: 'm1 · m2 = -1', targetId: 'box_perpendicular' },
      { label: 'k = 1', targetId: 'box_congruent' },
      { label: 'Area Ratio = k²', targetId: 'box_similar_area' },
    ],
    correctMapping: {
      box_parallel: 'm1 = m2',
      box_perpendicular: 'm1 · m2 = -1',
      box_congruent: 'k = 1',
      box_similar_area: 'Area Ratio = k²',
    },
    explanation: 'Parallel lines have equal slopes; perpendicular slopes multiply to -1; congruence has k=1; similar areas scale as k².',
    hints: [
      'Which formula shows equal steepness?',
      'Which product gives -1 for right angles?',
      'Congruency is similarity where the scale factor k is exactly 1.',
    ],
  },
  // 5. Foundation - Loci Circle (Recall)
  {
    id: 'ch_05',
    nodeId: NODE_C10_MATH_049,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the locus of a point moving in a plane at a constant distance of 5 m from a fixed point O?',
    options: [
      'A solid disk of radius 5 m',
      'A circle of radius 5 m with centre O',
      'A straight line passing through O',
      'The perpendicular bisector through O',
    ],
    correctIndex: 1,
    explanation: 'The locus is the boundary circumference (a circle of radius 5 m with centre O), not the filled disk.',
    hints: [
      'Locus is the exact boundary of points satisfying the equality.',
      'Only points exactly 5 m away qualify.',
      'This traces a circle with centre O and radius 5 m.',
    ],
    misconceptionIndex: 3,
  },
  // 6. Foundation - Angle Bisector Locus (Understanding)
  {
    id: 'ch_06',
    nodeId: NODE_C10_MATH_050,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'The locus of points equidistant from two intersecting lines consists of:',
    options: [
      'A single line parallel to both',
      'The pair of perpendicular angle bisectors passing through the intersection',
      'A circle centred at the intersection point',
      'The segment joining the two lines',
    ],
    correctIndex: 1,
    explanation: 'Intersecting lines produce two angle bisectors (acute and obtuse) that are mutually perpendicular.',
    hints: [
      'Intersecting lines form four angles (two pairs of vertically opposite angles).',
      'There is a bisector for each pair.',
      'These two bisector lines are mutually perpendicular.',
    ],
    misconceptionIndex: 4,
  },
  // 7. Foundation - Drag Sort: Slope Extraction Steps
  {
    id: 'ch_07',
    nodeId: NODE_C10_MATH_041,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the systematic steps to extract the slope m from the general equation ax + by + c = 0.',
    sortItems: [
      'Isolate the y-term: by = -ax - c',
      'Divide through by b: y = (-a/b)x - c/b',
      'Identify slope as m = -a/b',
      'Compare with standard form y = mx + c',
    ],
    correctOrder: [0, 1, 3, 2],
    explanation: 'First isolate by, divide by b to get y = (-a/b)x - c/b, match with y = mx + c, and identify m = -a/b.',
    hints: [
      'Start by keeping by on the left and moving other terms to the right.',
      'Divide by the coefficient b so y stands alone.',
      'Compare the resulting equation with y = mx + c to read m.',
    ],
  },
  // 8. Standard - Slope Extraction Parameter (Application)
  {
    id: 'ch_08',
    nodeId: NODE_C10_MATH_041,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find parameter k if line kx + 2y = 5 is perpendicular to line 3x + y = 7. (Express as decimal to 2 decimal places or fraction -0.67)',
    correctAnswer: -0.67,
    tolerance: 0.05,
    unit: '',
    explanation: 'Line 1 slope m1 = -k/2. Line 2 slope m2 = -3. Perpendicular condition: (-k/2)(-3) = -1 => 3k/2 = -1 => k = -2/3 ≈ -0.67.',
    hints: [
      'Find slope of kx + 2y = 5: m1 = -k/2.',
      'Find slope of 3x + y = 7: m2 = -3.',
      'Set m1 · m2 = -1: (-k/2) · (-3) = -1 => 3k/2 = -1 => k = -2/3.',
    ],
  },
  // 9. Standard - BPT Application (Application)
  {
    id: 'ch_09',
    nodeId: NODE_C10_MATH_045,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In △ABC, DE ∥ BC. AD = 3 cm, DB = 6 cm, and AE = 4 cm. Calculate the length of segment EC in cm.',
    correctAnswer: 8,
    tolerance: 0.1,
    unit: 'cm',
    explanation: 'By Basic Proportionality Theorem: AD/DB = AE/EC => 3/6 = 4/EC => 1/2 = 4/EC => EC = 8 cm.',
    hints: [
      'Apply Thales Theorem: AD / DB = AE / EC.',
      'Substitute known values: 3 / 6 = 4 / EC.',
      'Cross-multiply: 3 × EC = 24 => EC = 8 cm.',
    ],
  },
  // 10. Standard - Similar Triangles Area Ratio (Analysis)
  {
    id: 'ch_10',
    nodeId: NODE_C10_MATH_046,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: '△ABC ~ △DEF with corresponding sides in ratio 3 : 5. If Area(△ABC) = 36 cm², what is Area(△DEF)?',
    options: ['60 cm²', '100 cm²', '120 cm²', '300 cm²'],
    correctIndex: 1,
    explanation: 'Area ratio = (side ratio)² = (3/5)² = 9/25. Area(DEF) = 36 × (25/9) = 4 × 25 = 100 cm².',
    hints: [
      'Area scales with the SQUARE of the linear ratio.',
      'Ratio of areas = 3² / 5² = 9 / 25.',
      '36 / Area(DEF) = 9 / 25 => Area(DEF) = 36 × 25 / 9 = 100 cm².',
    ],
  },
  // 11. Standard - Similarity Conditions SSS/SAS/AA (Understanding)
  {
    id: 'ch_11',
    nodeId: NODE_C10_MATH_044,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In △ABC and △PQR, AB/PQ = AC/PR = 1/2. Which additional piece of information guarantees similarity by SAS?',
    options: ['∠B = ∠Q', '∠C = ∠R', '∠A = ∠P (the included angle)', 'BC = QR'],
    correctIndex: 2,
    explanation: 'SAS similarity strictly requires the EQUAL angle to be the INCLUDED angle between the proportional sides (∠A and ∠P).',
    hints: [
      'Look at the letters: side AB and side AC form vertex A.',
      'Sides PQ and PR form vertex P.',
      'The angle MUST be between the proportional sides: ∠A = ∠P.',
    ],
  },
  // 12. Standard - Map Scale Model Linear vs Area (Application)
  {
    id: 'ch_12',
    nodeId: NODE_C10_MATH_047,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A map has linear scale 1 : 50,000. Two metro stations are 4 cm apart on the map. What is the actual distance in km?',
    correctAnswer: 2,
    tolerance: 0.05,
    unit: 'km',
    explanation: 'Actual distance = 4 cm × 50,000 = 200,000 cm = 2,000 m = 2 km.',
    hints: [
      'Multiply map distance by scale factor: 4 × 50,000 = 200,000 cm.',
      'Convert cm to metres by dividing by 100: 2,000 m.',
      'Convert metres to kilometres by dividing by 1000: 2 km.',
    ],
  },
  // 13. Standard - Map Area Scaling (Application)
  {
    id: 'ch_13',
    nodeId: NODE_C10_MATH_047,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A township park on a 1 : 1,000 scale blueprint measures 3 cm by 2 cm. What is the actual area of the park in m²?',
    correctAnswer: 600,
    tolerance: 1,
    unit: 'm²',
    explanation: 'Actual length = 3 cm × 1000 = 3000 cm = 30 m. Actual width = 2 cm × 1000 = 2000 cm = 20 m. Actual area = 30 × 20 = 600 m².',
    hints: [
      'Method 1: Find real dimensions first. 3 cm = 30 m, 2 cm = 20 m.',
      'Multiply real length × width = 30 m × 20 m = 600 m².',
      'Method 2: Map area = 6 cm² × (1000)² = 6,000,000 cm² = 600 m².',
    ],
  },
  // 14. Standard - Construct Similarity Proof Formula (Construct)
  {
    id: 'ch_14',
    nodeId: NODE_C10_MATH_046,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Assemble the formula proving why the area ratio of two similar triangles equals the square of their scale factor k.',
    availableParts: ['Area Ratio =', '(1/2·a1·b1·sinC)', '/', '(1/2·a2·b2·sinC)', '=', '(k·a2 · k·b2)/(a2·b2)', '=', 'k²'],
    targetState: 'Area Ratio = (1/2·a1·b1·sinC) / (1/2·a2·b2·sinC) = (k·a2 · k·b2)/(a2·b2) = k²',
    validationHint: 'Combine the area ratio expression with sinC cancellation to yield k²',
    explanation: 'Using Area = 1/2 ab sinC, the equal angle gives identical sinC which cancels, leaving (k·a)(k·b)/(ab) = k².',
    hints: [
      'Start with Area Ratio = (1/2��a1·b1·sinC) / (1/2·a2·b2·sinC)',
      'Substitute a1 = k·a2 and b1 = k·b2',
      'Cancel matching factors to reach = k²',
    ],
  },
  // 15. Advanced - Quadrilateral Classification via Slopes (Analysis)
  {
    id: 'ch_15',
    nodeId: NODE_C10_MATH_041,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Quadrilateral ABCD has vertices A(0,0), B(4,2), C(5,6), D(1,4). Side slopes are m_AB=1/2, m_BC=4, m_CD=1/2, m_DA=4. Which best classifies ABCD?',
    options: [
      'Rectangle (opposite sides parallel and adjacent perpendicular)',
      'Parallelogram but NOT a rectangle (opposite sides parallel, adjacent slopes 1/2 × 4 = 2 ≠ -1)',
      'Trapezium (only one pair of opposite sides parallel)',
      'Rhombus with right angles',
    ],
    correctIndex: 1,
    explanation: 'm_AB = m_CD = 1/2 (parallel) and m_BC = m_DA = 4 (parallel), so it is a parallelogram. However, (1/2)(4) = 2 ≠ -1, so adjacent sides are not perpendicular.',
    hints: [
      'Compare opposite side slopes: AB with CD, and BC with DA.',
      'Both opposite pairs match, so it is a parallelogram.',
      'Check adjacent perpendicularity: m_AB · m_BC = (1/2)(4) = 2 ≠ -1, so angles are not 90°.',
    ],
  },
  // 16. Advanced - BPT with Algebraic Binomials (Application)
  {
    id: 'ch_16',
    nodeId: NODE_C10_MATH_045,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In △ABC, DE ∥ BC with AD = x, DB = x-2, AE = x+2, and EC = x-1. Solve for x.',
    correctAnswer: 4,
    tolerance: 0.1,
    unit: '',
    explanation: 'By BPT: x/(x-2) = (x+2)/(x-1) => x(x-1) = (x-2)(x+2) => x² - x = x² - 4 => -x = -4 => x = 4.',
    hints: [
      'Set up BPT proportion: AD/DB = AE/EC => x/(x-2) = (x+2)/(x-1).',
      'Cross-multiply: x(x-1) = (x+2)(x-2).',
      'Expand: x² - x = x² - 4. Subtract x² from both sides to get x = 4.',
    ],
  },
  // 17. Advanced - Double Loci Intersection (Analysis)
  {
    id: 'ch_17',
    nodeId: NODE_C10_MATH_048,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Points A and B are 6 cm apart. Locus L1 is the perpendicular bisector of AB. Locus L2 is a circle of radius 4 cm centred at A. How many points satisfy both L1 and L2?',
    correctAnswer: 2,
    tolerance: 0,
    unit: 'points',
    explanation: 'Distance from A to the bisector is 3 cm. Since radius r = 4 cm > 3 cm, the circle cuts the perpendicular bisector in exactly 2 distinct points.',
    hints: [
      'The perpendicular bisector passes through midpoint M where AM = 3 cm.',
      'Circle centred at A has radius 4 cm.',
      'Because radius 4 > distance 3, the circle cuts the line at 2 points.',
    ],
  },
  // 18. Advanced - Perpendicular Angle Bisectors Verification (Evaluation)
  {
    id: 'ch_18',
    nodeId: NODE_C10_MATH_050,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Two arterial roads intersect at 60°. What is the angle between the acute angle bisector and the obtuse angle bisector?',
    options: ['60°', '75°', '90° (always perpendicular)', '120°'],
    correctIndex: 2,
    explanation: 'Acute angle is 60° (bisector at 30°), obtuse is 120° (bisector at 60°). The angle between bisectors is 30° + 60° = 90° (always perpendicular!).',
    hints: [
      'Half of the acute angle is 60° / 2 = 30°.',
      'Half of the adjacent supplementary obtuse angle is 120° / 2 = 60°.',
      'Sum of half-angles: 30° + 60° = 90°.',
    ],
  },
  // 19. Advanced - Real-world Map Area Conversion (Application)
  {
    id: 'ch_19',
    nodeId: NODE_C10_MATH_047,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A tea estate in Munnar is drawn on a 1 : 50,000 topographical sheet with dimensions 6 cm by 2 cm. What is the actual estate area in square kilometres (km²)?',
    correctAnswer: 3,
    tolerance: 0.1,
    unit: 'km²',
    explanation: 'Actual length = 6 cm × 0.5 km/cm = 3 km. Actual breadth = 2 cm × 0.5 km/cm = 1 km. Area = 3 × 1 = 3 km².',
    hints: [
      '1 cm on map = 50,000 cm = 500 m = 0.5 km.',
      'Actual length = 6 × 0.5 = 3 km.',
      'Actual width = 2 × 0.5 = 1 km. Actual area = 3 km × 1 km = 3 km².',
    ],
  },
  // 20. Advanced - Evaluation of Geometric Claim (Evaluation)
  {
    id: 'ch_20',
    nodeId: NODE_C10_MATH_043,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A junior engineer claims: "All equilateral triangles are congruent because all three angles are 60°." Evaluate this statement.',
    options: [
      'Correct, equal angles guarantee identical side lengths',
      'Incorrect, equal angles only guarantee SIMILARITY (AAA); sides can be scaled by any factor k ≠ 1',
      'Correct only when side length exceeds 10 cm',
      'Incorrect because equilateral triangles do not have 60° angles',
    ],
    correctIndex: 1,
    explanation: 'Equal corresponding angles guarantee similarity, but congruence requires the scale factor k = 1 (equal side lengths).',
    hints: [
      'Can you draw a 2 cm equilateral triangle and a 10 cm equilateral triangle?',
      'They have identical 60° angles, but are they the same size?',
      'They are similar, not congruent, unless their sides are equal.',
    ],
  },
  // 21. Advanced - Creative Airport Runway Planning (Creativity)
  {
    id: 'ch_21',
    nodeId: NODE_C10_MATH_041,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You must design a cross-runway for emergency crosswind landings perpendicular to the main runway 2x - 5y + 10 = 0. What slope must the cross-runway have?',
    options: ['2/5', '-5/2', '5/2', '-2/5'],
    correctIndex: 1,
    explanation: 'Main runway 5y = 2x + 10 => slope m1 = 2/5. Perpendicular slope m2 = -1 / (2/5) = -5/2.',
    hints: [
      'Isolate y: 5y = 2x + 10 => y = (2/5)x + 2, so m1 = 2/5.',
      'Apply perpendicular condition: m2 = -1 / m1.',
      'Invert and negate: -5/2.',
    ],
  },
  // 22. Advanced - Master Civil Engineering Grid (Creativity)
  {
    id: 'ch_22',
    nodeId: NODE_C10_MATH_049,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A radio beacon tower at origin (0,0) transmits a circular signal range of radius 5 km. A straight highway runs along y = 3. What is the total length in km of the highway segment that receives the signal?',
    correctAnswer: 8,
    tolerance: 0.1,
    unit: 'km',
    explanation: 'Circle x² + y² = 25. Intersection with y = 3 gives x² + 9 = 25 => x² = 16 => x = ±4. Segment length from -4 to +4 is 8 km.',
    hints: [
      'Equation of circle: x² + y² = 5² = 25.',
      'Substitute y = 3: x² + 9 = 25 => x² = 16 => x = 4 and x = -4.',
      'The distance between (-4, 3) and (4, 3) is 4 - (-4) = 8 km.',
    ],
  },
  // ─── Class 10 board-depth additions: coordinate-geometry diagnostics ───
  {
    id: 'ch_depth_coord_school_distance',
    nodeId: 'c10_math_cbse_07_001',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Create a real-life Indian school problem that needs the DISTANCE formula. Which framing is the correct model?',
    options: [
      'A school of 1,200 students plans one water cooler between two classroom blocks at A(2, 3) and B(8, 11) on a 1 cm = 10 m map: the pipe run is the distance AB = square root of ((8-2)^2 + (11-3)^2) = square root of 100 = 10 units = 100 m -- the distance formula measures the straight connector between two map points',
      'Add the x-coordinates and the y-coordinates separately and call the sum the distance',
      'The distance formula applies only to circles',
      'Distance = (x2 - x1) alone is enough for any pair of points'
    ],
    correctIndex: 0,
    explanation:
      'Distance formula = Pythagoras in disguise: horizontal leg (dx) and vertical leg (dy) make a right triangle. School-context variants: shortest cable between two labs, running track diagonal, distance a student walks between the gate (0,0) and a classroom. Always state the SCALE of the map and multiply units at the end.',
    hints: [
      'dx, dy are the legs; the formula is the hypotenuse.',
      'State units and scale in your created problem.',
      'Check with an easy pair first: (0,0) to (3,4) is 5.'
    ],
  },
  {
    id: 'ch_depth_coord_axis_points',
    nodeId: 'c10_math_cbse_07_003',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A(a, 0) lies on the x-axis and B(0, b) on the y-axis. C is on the x-axis with AC = 3 units, C lying between A and the origin. If A = (7, 0), give the coordinates of C and the length AB when b = 4.',
    correctAnswer: 5,
    tolerance: 0.01,
    unit: 'units (OC length)',
    explanation: 'C = (7 - 3, 0) = (4, 0), so OC = 4 and the configuration is complete; AB = square root of (7^2 + 4^2) = square root of 65, about 8.06 units. The axis trick: points on the x-axis have y = 0, so distances along the axis are simple subtractions -- reserve the full distance formula for the cross-axis pair AB.',
    hints: [
      'Moving along the x-axis changes only x.',
      'C = (7 - 3, 0); then read OC directly.',
      'AB needs the full formula: legs 7 and 4.'
    ],
  },
  {
    id: 'ch_depth_coord_park_area',
    nodeId: 'c10_math_cbse_07_008',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Create a word problem where a triangular park\'s AREA is found from coordinates. Which solution skeleton is correct?',
    options: [
      'A triangular park has gates at A(1, 2), B(7, 2), C(4, 8): area = (1/2) x base x height with base AB = 6 (horizontal, easy) and height = vertical distance of C from AB = 6, giving 18 square units -- or the coordinate formula (1/2)|x1(y2-y3) + x2(y3-y1) + x3(y1-y2)|',
      'Area of a coordinate triangle is (x2-x1) x (y2-y1)',
      'Add the three side lengths to get the area',
      'Coordinate triangles have no definable area'
    ],
    correctIndex: 0,
    explanation:
      'Two valid routes: (1) pick a horizontal/vertical side as base and drop a perpendicular height; (2) the shoelace formula works for any orientation. Word-problem wrappers: parking layout, farm plot pricing at Rs per square metre, roof tiles for a triangular loft -- finish with a rupee or tile count to make it real.',
    hints: [
      'A horizontal base makes the height a subtraction.',
      'Shoelace formula never fails -- base-height just makes it easier.',
      'Price x area turns geometry into a word problem.'
    ],
  }
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
  nodeId: NODE_C10_MATH_041,
  title: 'Lines, Similarity & Loci Mastery Lab',
  definition:
    'Coordinate slope relationships (parallel m1=m2, perpendicular m1·m2=-1), triangle similarity transformations (scale factor k, SSS, SAS, AA, BPT, area ratio k²), map models, and loci paths (circle, angle bisectors).',
  eli5:
    'Parallel lines are train tracks with identical tilt. Perpendicular lines cross like crossroads at 90°. Similar triangles are zoom-ins of each other where area grows as zoom-squared. Loci are boundary paths following strict rules.',
  misconceptions: [
    { misconception: 'Slope of ax + by + c = 0 is a/b', correction: 'Rearranging by = -ax - c gives slope m = -a/b (the negative sign is crucial).' },
    { misconception: 'Perpendicular lines have m1 = m2 = -1 or sum to -1', correction: 'The perpendicular condition is the product m1 × m2 = -1 (negative reciprocals).' },
    { misconception: 'Equal angles make figures congruent', correction: 'Equal angles only guarantee similarity. Congruency additionally requires side ratio k = 1.' },
    { misconception: 'Locus of points at distance r is the entire filled disc', correction: 'The locus is strictly the boundary circumference circle of radius r, not the interior.' },
    { misconception: 'Intersecting lines have only a single angle bisector', correction: 'Intersecting lines have TWO perpendicular angle bisectors (acute and obtuse).' },
  ],
  diagnosticQuestions: [
    { question: 'What is the slope of 4x - 2y + 7 = 0?', options: ['-2', '2', '-4', '1/2'], correctIndex: 1 },
    { question: 'If m1 = 2/3, what is the perpendicular slope m2?', options: ['2/3', '-2/3', '-3/2', '3/2'], correctIndex: 2 },
    { question: 'If two similar triangles have side ratio 2:5, what is their area ratio?', options: ['2:5', '4:10', '4:25', '8:125'], correctIndex: 2 },
    { question: 'In △ABC with DE∥BC, AD=2, DB=4, AE=3. What is EC?', options: ['3', '5', '6', '8'], correctIndex: 2 },
    { question: 'What is the locus of a point 6 cm from point P?', options: ['Perpendicular bisector', 'Circle with centre P radius 6 cm', 'Angle bisector', 'Straight line'], correctIndex: 1 },
    { question: 'What is the angle between the two bisectors of intersecting lines?', options: ['45°', '60°', '90°', '180°'], correctIndex: 2 },
    { question: 'A 1:100 scale model of a 15 m wall has length:', options: ['1.5 cm', '15 cm', '150 cm', '0.15 cm'], correctIndex: 1 },
    { question: 'Which similarity criterion uses two proportional sides and the angle between them?', options: ['SSS', 'AAA', 'SAS', 'RHS'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student achieves ≥80% across coordinate line conditions, similarity theorems, scaling applications, and locus path constructions.',
};

// ─── EXPLORATION STEPS (Interactive Guided Learning) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Coordinate Slopes & Line Intersections',
    instruction: 'Adjust the slope slider of Line 1 and Line 2. Observe when they become Parallel (m1=m2) and Perpendicular (m1·m2=-1).',
    interactionType: 'slider-slope',
    nodeId: NODE_C10_MATH_041,
  },
  {
    title: 'Lab 2: Similarity & Scale Factor Transformation',
    instruction: 'Drag the Scale Factor (k) slider to zoom the triangle. Watch side lengths scale by k and Area scale by k² in real-time!',
    interactionType: 'slider-similarity',
    nodeId: NODE_C10_MATH_042,
  },
  {
    title: 'Lab 3: Basic Proportionality Theorem (BPT / Thales)',
    instruction: 'Slide the parallel line DE up and down. Notice how the ratio AD/DB always equals AE/EC perfectly.',
    interactionType: 'slider-bpt',
    nodeId: NODE_C10_MATH_045,
  },
  {
    title: 'Lab 4: Locus at Fixed Distance (The Circle)',
    instruction: 'Change the tether distance r. See the point trace the exact circular boundary locus around beacon O.',
    interactionType: 'slider-circle-locus',
    nodeId: NODE_C10_MATH_049,
  },
  {
    title: 'Lab 5: Locus of Intersecting Lines (Angle Bisectors)',
    instruction: 'Rotate line L2 and observe the two perpendicular angle bisectors that form the equidistant locus.',
    interactionType: 'slider-angle-bisector',
    nodeId: NODE_C10_MATH_050,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you double all sides of a triangle (k = 2), how many times larger does its area become?',
    options: ['2 times larger', '3 times larger', '4 times larger (2²)', '8 times larger'],
    correctIndex: 2,
    verifyInstruction: 'Now drag the Scale Factor slider in Lab 2 to k = 2.0 and observe the Area Gauge reading exactly 4.0×!',
    nodeId: NODE_C10_MATH_046,
  },
  {
    question: 'Predict: If Line 1 has slope m1 = 2, what slope must Line 2 have to be perfectly perpendicular?',
    options: ['m2 = 2', 'm2 = -2', 'm2 = -0.5 (-1/2)', 'm2 = 0.5'],
    correctIndex: 2,
    verifyInstruction: 'Adjust Line 2 slope to -0.5 in Lab 1 and watch the product gauge hit -1.0 with a green 90° lock!',
    nodeId: NODE_C10_MATH_041,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the area gauge when the scale factor k increases from 1 to 3?',
    observableOptions: [
      'Area increases linearly to 3×',
      'Area grows exponentially to 9× (k²)',
      'Area stays unchanged',
      'Area drops to 1/3',
    ],
    correctIndex: 1,
    nodeId: NODE_C10_MATH_046,
  },
  {
    question: 'What do you observe about the angle between the acute and obtuse angle bisectors when intersecting lines rotate?',
    observableOptions: [
      'The angle fluctuates between 30° and 150°',
      'The angle stays strictly constant at 90° (mutually perpendicular)',
      'The bisectors merge into a single line',
      'The angle equals the line intersection angle',
    ],
    correctIndex: 1,
    nodeId: NODE_C10_MATH_050,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Masterplan Architect: Build Your Smart Grid',
  description:
    'Choose an Indian infrastructure project (e.g., Bandra-Worli Sea Link, Dholera Smart City, or Bengaluru Metro Phase 2). Map out 2 parallel corridors, 1 perpendicular bridge, and a circular radar scan locus with a 1:25,000 scale map calculation.',
  steps: [
    'Define two parallel roads with equal slope m = 1.5',
    'Calculate the perpendicular drainage canal slope m_perp = -1/1.5 = -0.67',
    'Scale a 12 cm map sector to real km: 12 × 0.25 km = 3.0 km',
    'Plot the circular radar safety zone of radius 4 km (x² + y² = 16)',
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
function C10_MathematicsConditionsParallelPerpendicularSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // Subject config
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow state
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Brilliant.org interaction patterns
  const [predictionMade, setPredictionMade] = useState<boolean>(false);
  const [predictionIndex, setPredictionIndex] = useState<number>(-1);
  const [predictionVerified, setPredictionVerified] = useState<boolean>(false);
  const [observationAnswered, setObservationAnswered] = useState<boolean>(false);
  const [observationIndex, setObservationIndex] = useState<number>(-1);
  const [sandboxReady, setSandboxReady] = useState<boolean>(false);

  // Lab 1: Slopes state
  const [slope1, setSlope1] = useState<number>(1.0);
  const [slope2, setSlope2] = useState<number>(-1.0);
  const [intercept1, setIntercept1] = useState<number>(0);
  const [intercept2, setIntercept2] = useState<number>(2);

  // Lab 2: Similarity state
  const [scaleFactorK, setScaleFactorK] = useState<number>(1.5);
  const [baseTriangle, setBaseTriangle] = useState<{ a: number; b: number; c: number }>({ a: 3, b: 4, c: 5 });

  // Lab 3: BPT state
  const [bptSplitRatio, setBptSplitRatio] = useState<number>(0.4); // AD / AB ratio

  // Lab 4: Circle Locus state
  const [circleRadius, setCircleRadius] = useState<number>(60);
  const [pointAngle, setPointAngle] = useState<number>(45);

  // Lab 5: Angle Bisectors state
  const [intersectionAngle, setIntersectionAngle] = useState<number>(60);

  // Difficulty & BKT state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [errors, setErrors] = useState<number>(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  // Drag & drop / Interactive inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);

  // Misconception tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Active tab in sandbox
  const [sandboxTab, setSandboxTab] = useState<'slopes' | 'similarity' | 'bpt' | 'loci'>('slopes');

  // Reflection responses state
  const [reflectionResponses, setReflectionResponses] = useState<{ [key: string]: string }>({});

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE DIFFICULTY VIA BKT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff: 'foundation' | 'standard' | 'advanced' =
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

  // ─── 2D CANVAS ANIMATION (Radar & Geometry Grid) ───
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

      // Draw subtle coordinate grid
      ctx.strokeStyle = '#334155';
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

      // Draw rotating radar beam for loci representation
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const angle = (frame * 0.03) % (Math.PI * 2);

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, 45, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * 45, cy + Math.sin(angle) * 45);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── MEMOISED EVENT HANDLERS ───

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
    speechManager.speak(isCorrect ? 'Outstanding deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Geometric Exploration Lab.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test slopes, similarity scaling, and locus paths freely!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for the Civil Engineering Masterplan challenges!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the slider to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation! Mathematics confirms your visual intuition.' : 'Examine the gauge closely.');
  }, []);

  const handleSlope1Change = useCallback((val: number) => {
    setSlope1(val);
    audioManager.play('count');
  }, []);

  const handleSlope2Change = useCallback((val: number) => {
    setSlope2(val);
    audioManager.play('count');
  }, []);

  const handleScaleFactorChange = useCallback((val: number) => {
    setScaleFactorK(val);
    audioManager.play('swoop');
    if (predictionMade && Math.abs(val - 2.0) < 0.1) {
      setPredictionVerified(true);
    }
  }, [predictionMade]);

  const handleBptRatioChange = useCallback((val: number) => {
    setBptSplitRatio(val);
    audioManager.play('balance');
  }, []);

  const handleCircleRadiusChange = useCallback((val: number) => {
    setCircleRadius(val);
    audioManager.play('count');
  }, []);

  const handleIntersectionAngleChange = useCallback((val: number) => {
    setIntersectionAngle(val);
    audioManager.play('count');
  }, []);

  const handleCompleteSim = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Exceptional work! You have mastered ICSE Class 10 Coordinate Lines, Similarity, and Loci.');
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
      handleCompleteSim();
    } else {
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSim]);

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
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.01);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Brilliant deduction.');
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
          speechManager.speak('Let us study the complete mathematical walkthrough.');
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
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

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
    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(ans);
  }, [sortArrangement, challenge, handleAnswer]);

  // Derived mathematical states
  const slopeProduct = useMemo(() => +(slope1 * slope2).toFixed(2), [slope1, slope2]);
  const isParallel = useMemo(() => Math.abs(slope1 - slope2) < 0.05, [slope1, slope2]);
  const isPerpendicular = useMemo(() => Math.abs(slopeProduct + 1.0) < 0.08, [slopeProduct]);

  // Motivational message helper
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors >= 1 && errors <= 3) return 'Great work!';
    if (errors >= 4 && errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl space-y-6 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              ICSE Class 10 Mathematics • Nodes c10_math_041 to c10_math_050
            </p>
          </div>
        </div>

        {/* Difficulty Badge & Status */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-700'
                : 'bg-indigo-950/60 text-indigo-400 border-indigo-700'
            }`}
          >
            {difficulty} Tier
          </motion.span>
          <div className="text-right hidden sm:block">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Mastery</span>
            <span className="text-xs font-bold text-sky-400 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Narrative Card */}
          <div className="p-5 md:p-6 bg-gradient-to-br from-indigo-950/70 to-slate-900/90 rounded-2xl border border-indigo-700/50 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm tracking-wider uppercase">
              <span>🚇</span> {SCENARIO.title}
            </div>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 italic bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              {SCENARIO.context}
            </p>
          </div>

          {/* Curiosity Interactive Hook */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 font-bold text-xs">
                Intuition Check
              </span>
              <h2 className="text-base md:text-lg font-bold text-white">{DISCOVERY_QUESTION.question}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/40 border-slate-700/50 text-slate-400'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-slate-400 text-xs mt-0.5">[{String.fromCharCode(65 + i)}]</span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on!' : '💡 '} {DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 text-sm whitespace-nowrap"
                >
                  Enter Geometric Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-6"
            >
              {/* Step Navigation Header */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                    Guided Exploration Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                  </span>
                  <h2 className="text-lg md:text-xl font-bold text-white mt-1">
                    {EXPLORATION_STEPS[currentSlide].title}
                  </h2>
                </div>
                <div className="flex gap-1">
                  {EXPLORATION_STEPS.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentSlide ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-sm text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-800/40">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* STEP 0: COORDINATE SLOPES */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 400 300" className="w-full max-w-md h-64 select-none">
                      {[-4, -2, 0, 2, 4].map((gridVal) => (
                        <g key={gridVal}>
                          <line
                            x1={200 + gridVal * 35}
                            y1="0"
                            x2={200 + gridVal * 35}
                            y2="300"
                            stroke="#1e293b"
                            strokeWidth="1"
                          />
                          <line
                            x1="0"
                            y1={150 - gridVal * 30}
                            x2="400"
                            y2={150 - gridVal * 30}
                            stroke="#1e293b"
                            strokeWidth="1"
                          />
                        </g>
                      ))}
                      <line x1="0" y1="150" x2="400" y2="150" stroke="#475569" strokeWidth="2" />
                      <line x1="200" y1="0" x2="200" y2="300" stroke="#475569" strokeWidth="2" />
                      <text x="385" y="142" fill="#64748b" fontSize="10">x</text>
                      <text x="208" y="15" fill="#64748b" fontSize="10">y</text>

                      {/* Line 1 */}
                      <line
                        x1="20"
                        y1={150 - (-180 * slope1 + intercept1 * 25)}
                        x2="380"
                        y2={150 - (180 * slope1 + intercept1 * 25)}
                        stroke="#6366f1"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      {/* Line 2 */}
                      <line
                        x1="20"
                        y1={150 - (-180 * slope2 + intercept2 * 25)}
                        x2="380"
                        y2={150 - (180 * slope2 + intercept2 * 25)}
                        stroke="#38bdf8"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      <rect x="10" y="10" width="160" height="40" rx="8" fill="#0f172a" stroke="#334155" />
                      <text x="20" y="26" fill="#818cf8" fontSize="11" fontWeight="bold">
                        Line 1 (m1): {slope1.toFixed(2)}
                      </text>
                      <text x="20" y="42" fill="#38bdf8" fontSize="11" fontWeight="bold">
                        Line 2 (m2): {slope2.toFixed(2)}
                      </text>
                    </svg>

                    <div className="w-full mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-around text-xs">
                      <div>
                        <span className="text-slate-400 block">Product m1 × m2</span>
                        <span className={`font-mono font-bold text-sm ${isPerpendicular ? 'text-emerald-400' : 'text-slate-200'}`}>
                          {slopeProduct}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block">Status</span>
                        <span
                          className={`font-bold px-2.5 py-0.5 rounded-full text-xs ${
                            isParallel
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-600'
                              : isPerpendicular
                              ? 'bg-sky-950 text-sky-400 border border-sky-600'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {isParallel ? 'PARALLEL (m1 = m2)' : isPerpendicular ? 'PERPENDICULAR (90°)' : 'Intersecting'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-indigo-400">Line 1 Slope (m1)</span>
                        <span className="font-mono text-white">{slope1.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="-3"
                        max="3"
                        step="0.1"
                        value={slope1}
                        onChange={(e) => handleSlope1Change(parseFloat(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Set Line 1 Slope"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-sky-400">Line 2 Slope (m2)</span>
                        <span className="font-mono text-white">{slope2.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="-3"
                        max="3"
                        step="0.1"
                        value={slope2}
                        onChange={(e) => handleSlope2Change(parseFloat(e.target.value))}
                        className="w-full accent-sky-500"
                        aria-label="Set Line 2 Slope"
                      />
                    </div>

                    <div className="pt-2 flex flex-wrap gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSlope1(1.5);
                          setSlope2(1.5);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-700 text-indigo-300 text-xs font-semibold"
                      >
                        Snap Parallel (m=1.5)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSlope1(2.0);
                          setSlope2(-0.5);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-sky-950/60 border border-sky-700 text-sky-300 text-xs font-semibold"
                      >
                        Snap Perpendicular (2 · -0.5 = -1)
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 1: SIMILARITY AS SIZE TRANSFORMATION */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/40 border border-indigo-700/60 rounded-xl space-y-3">
                      <p className="text-sm font-bold text-white">🔮 {PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 rounded-lg bg-slate-800 text-left text-xs font-medium text-slate-200 hover:bg-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-xl text-xs font-semibold border ${
                        predictionIndex === PREDICTION_QUESTIONS[0].correctIndex
                          ? 'bg-emerald-950/50 border-emerald-600 text-emerald-300'
                          : 'bg-amber-950/50 border-amber-600 text-amber-300'
                      }`}
                    >
                      {predictionIndex === PREDICTION_QUESTIONS[0].correctIndex
                        ? '✓ Correct hypothesis! Verify it using the Scale Factor (k) slider below.'
                        : `Notice: Area scales with k² (k squared). Drag the slider to 2.0 to check!`}
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                      <svg viewBox="0 0 380 240" className="w-full max-w-md h-56 select-none">
                        <polygon
                          points="40,200 130,200 40,80"
                          fill="rgba(99, 102, 241, 0.25)"
                          stroke="#6366f1"
                          strokeWidth="2"
                        />
                        <text x="75" y="195" fill="#818cf8" fontSize="10">Base = 3</text>
                        <text x="15" y="145" fill="#818cf8" fontSize="10">Ht = 4</text>
                        <text x="55" y="160" fill="#a5b4fc" fontSize="11" fontWeight="bold">
                          Orig Area = 6
                        </text>

                        <polygon
                          points={`180,200 ${180 + 40 * scaleFactorK},200 180,${200 - 50 * scaleFactorK}`}
                          fill="rgba(56, 189, 248, 0.3)"
                          stroke="#38bdf8"
                          strokeWidth="2.5"
                        />
                        <text x={180 + 15 * scaleFactorK} y="195" fill="#7dd3fc" fontSize="10">
                          Base = {(3 * scaleFactorK).toFixed(1)}
                        </text>
                        <text x="150" y={200 - 25 * scaleFactorK} fill="#7dd3fc" fontSize="10">
                          {(4 * scaleFactorK).toFixed(1)}
                        </text>
                        <text
                          x={190}
                          y={200 - 15 * scaleFactorK}
                          fill="#38bdf8"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          Area = {(6 * scaleFactorK * scaleFactorK).toFixed(1)}
                        </text>
                      </svg>

                      <div className="w-full grid grid-cols-3 gap-2 mt-2 text-center text-xs">
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-400 block">Linear Scale (k)</span>
                          <span className="font-bold text-sky-400 text-sm font-mono">{scaleFactorK.toFixed(1)}×</span>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-400 block">Perimeter Ratio</span>
                          <span className="font-bold text-indigo-400 text-sm font-mono">{scaleFactorK.toFixed(1)}×</span>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-400 block">Area Ratio (k²)</span>
                          <span className="font-bold text-emerald-400 text-sm font-mono">
                            {(scaleFactorK * scaleFactorK).toFixed(2)}×
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-5 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-sky-400">Scale Factor (k)</span>
                          <span className="font-mono text-white">{scaleFactorK.toFixed(1)}</span>
                        </div>
                        <input
                          type="range"
                          min="0.5"
                          max="3.0"
                          step="0.1"
                          value={scaleFactorK}
                          onChange={(e) => handleScaleFactorChange(parseFloat(e.target.value))}
                          className="w-full accent-sky-500"
                          aria-label="Set Scale Factor k"
                        />
                      </div>

                      {scaleFactorK >= 2.0 && !observationAnswered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 space-y-2"
                        >
                          <p className="text-xs font-bold text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleObservation(i)}
                              className="w-full text-left p-2 rounded-lg bg-slate-900/80 hover:bg-slate-700 text-[11px] text-slate-300"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: BASIC PROPORTIONALITY THEOREM */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 360 260" className="w-full max-w-md h-60 select-none">
                      <polygon points="180,30 60,230 300,230" fill="none" stroke="#64748b" strokeWidth="2" />

                      {(() => {
                        const r = bptSplitRatio;
                        const dX = 180 + (60 - 180) * r;
                        const dY = 30 + (230 - 30) * r;
                        const eX = 180 + (300 - 180) * r;
                        const eY = 30 + (230 - 30) * r;

                        const AD = (r * 10).toFixed(1);
                        const DB = ((1 - r) * 10).toFixed(1);
                        const AE = (r * 12).toFixed(1);
                        const EC = ((1 - r) * 12).toFixed(1);

                        return (
                          <g>
                            <line x1={dX} y1={dY} x2={eX} y2={eY} stroke="#38bdf8" strokeWidth="3.5" />
                            <circle cx={dX} cy={dY} r="4" fill="#38bdf8" />
                            <circle cx={eX} cy={eY} r="4" fill="#38bdf8" />

                            <text x="175" y="24" fill="#f8fafc" fontWeight="bold" fontSize="12">A</text>
                            <text x="45" y="238" fill="#f8fafc" fontWeight="bold" fontSize="12">B</text>
                            <text x="310" y="238" fill="#f8fafc" fontWeight="bold" fontSize="12">C</text>
                            <text x={dX - 18} y={dY + 4} fill="#38bdf8" fontWeight="bold" fontSize="12">D</text>
                            <text x={eX + 8} y={eY + 4} fill="#38bdf8" fontWeight="bold" fontSize="12">E</text>

                            <text x={(180 + dX) / 2 - 25} y={(30 + dY) / 2} fill="#818cf8" fontSize="10">
                              AD={AD}
                            </text>
                            <text x={(60 + dX) / 2 - 28} y={(230 + dY) / 2} fill="#818cf8" fontSize="10">
                              DB={DB}
                            </text>
                            <text x={(180 + eX) / 2 + 10} y={(30 + eY) / 2} fill="#34d399" fontSize="10">
                              AE={AE}
                            </text>
                            <text x={(300 + eX) / 2 + 10} y={(230 + eY) / 2} fill="#34d399" fontSize="10">
                              EC={EC}
                            </text>
                          </g>
                        );
                      })()}
                    </svg>

                    <div className="w-full mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-around text-xs font-mono font-bold">
                      <div className="text-indigo-300">
                        Left Ratio AD/DB = {(bptSplitRatio / (1 - bptSplitRatio)).toFixed(2)}
                      </div>
                      <div className="text-emerald-300">
                        Right Ratio AE/EC = {(bptSplitRatio / (1 - bptSplitRatio)).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-5 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-indigo-400">Position of Parallel Line DE</span>
                        <span className="font-mono text-white">{Math.round(bptSplitRatio * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="0.9"
                        step="0.05"
                        value={bptSplitRatio}
                        onChange={(e) => handleBptRatioChange(parseFloat(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Set Parallel Line DE Position"
                      />
                    </div>
                    <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      💡 <strong>Key Insight:</strong> Because DE ∥ BC, △ADE is similar to △ABC (AA similarity). Therefore AD/DB = AE/EC always holds!
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: CIRCLE LOCUS */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 300 240" className="w-full max-w-md h-56 select-none">
                      <circle cx="150" cy="120" r="5" fill="#f43f5e" />
                      <text x="156" y="115" fill="#f43f5e" fontWeight="bold" fontSize="12">O (Beacon)</text>

                      <circle
                        cx="150"
                        cy="120"
                        r={circleRadius}
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="3"
                        strokeDasharray="4 2"
                      />

                      {(() => {
                        const rad = (pointAngle * Math.PI) / 180;
                        const px = 150 + circleRadius * Math.cos(rad);
                        const py = 120 + circleRadius * Math.sin(rad);
                        return (
                          <g>
                            <line x1="150" y1="120" x2={px} y2={py} stroke="#38bdf8" strokeWidth="1.5" />
                            <circle cx={px} cy={py} r="6" fill="#38bdf8" />
                            <text x={px + 8} y={py + 4} fill="#38bdf8" fontWeight="bold" fontSize="11">
                              P (r = {circleRadius}m)
                            </text>
                          </g>
                        );
                      })()}
                    </svg>

                    <p className="text-xs text-slate-400 mt-2">
                      Locus = The circular path traced by point P at constant radius r = {circleRadius}m.
                    </p>
                  </div>

                  <div className="md:col-span-5 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-indigo-400">Fixed Distance (Radius r)</span>
                        <span className="font-mono text-white">{circleRadius} m</span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max="90"
                        step="5"
                        value={circleRadius}
                        onChange={(e) => handleCircleRadiusChange(parseInt(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Set Circle Radius"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-sky-400">Rotate Position Angle</span>
                        <span className="font-mono text-white">{pointAngle}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        step="5"
                        value={pointAngle}
                        onChange={(e) => setPointAngle(parseInt(e.target.value))}
                        className="w-full accent-sky-500"
                        aria-label="Rotate Position Angle"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: ANGLE BISECTORS LOCUS */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 340 240" className="w-full max-w-md h-56 select-none">
                      <line x1="20" y1="120" x2="320" y2="120" stroke="#64748b" strokeWidth="2.5" />
                      <text x="305" y="112" fill="#64748b" fontSize="10">Line 1</text>

                      {(() => {
                        const rad = (intersectionAngle * Math.PI) / 180;
                        const len = 130;
                        const x1 = 170 - len * Math.cos(rad);
                        const y1 = 120 + len * Math.sin(rad);
                        const x2 = 170 + len * Math.cos(rad);
                        const y2 = 120 - len * Math.sin(rad);

                        const b1Rad = rad / 2;
                        const bx1 = 170 - len * Math.cos(b1Rad);
                        const by1 = 120 + len * Math.sin(b1Rad);
                        const bx2 = 170 + len * Math.cos(b1Rad);
                        const by2 = 120 - len * Math.sin(b1Rad);

                        const b2Rad = b1Rad + Math.PI / 2;
                        const cx1 = 170 - len * Math.cos(b2Rad);
                        const cy1 = 120 + len * Math.sin(b2Rad);
                        const cx2 = 170 + len * Math.cos(b2Rad);
                        const cy2 = 120 - len * Math.sin(b2Rad);

                        return (
                          <g>
                            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth="2.5" />
                            <text x={x2 - 10} y={y2 - 8} fill="#64748b" fontSize="10">Line 2</text>

                            <line x1={bx1} y1={by1} x2={bx2} y2={by2} stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 3" />
                            <line x1={cx1} y1={cy1} x2={cx2} y2={cy2} stroke="#a855f7" strokeWidth="2" strokeDasharray="5 3" />

                            <circle cx="170" cy="120" r="4" fill="#f8fafc" />
                          </g>
                        );
                      })()}
                    </svg>

                    <div className="w-full mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-center text-xs">
                      <span className="text-purple-300 font-bold">
                        Angle between Bisectors = (θ/2) + ((180°-θ)/2) = 90° (Always Perpendicular)
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-5 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-purple-400">Intersection Angle (θ)</span>
                        <span className="font-mono text-white">{intersectionAngle}°</span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max="120"
                        step="5"
                        value={intersectionAngle}
                        onChange={(e) => handleIntersectionAngleChange(parseInt(e.target.value))}
                        className="w-full accent-purple-500"
                        aria-label="Set Intersection Angle"
                      />
                    </div>
                    <p className="text-xs text-slate-400">
                      Both angle bisectors are required to capture the full locus of points equidistant from both intersecting lines.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 disabled:opacity-40 text-xs font-bold"
                >
                  ← Previous Lab
                </motion.button>

                <span className="text-xs font-semibold text-slate-400">
                  {currentSlide + 1} / {EXPLORATION_STEPS.length}
                </span>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide((s) => s + 1)}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30"
                  >
                    Enter Free Sandbox Mode →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white">🎨 Free Exploration Sandbox</h2>
              <p className="text-xs text-slate-400">
                Experiment with all geometric controls without timer or grading pressure!
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
            >
              I Am Ready For Challenges! →
            </motion.button>
          </div>

          <div className="flex gap-2 border-b border-slate-800 pb-2">
            {[
              { id: 'slopes', label: '1. Slopes Grid' },
              { id: 'similarity', label: '2. Similarity Scaling' },
              { id: 'bpt', label: '3. Thales BPT' },
              { id: 'loci', label: '4. Loci Paths' },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSandboxTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  sandboxTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800">
            {sandboxTab === 'slopes' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-indigo-300">Slope Calculator</h3>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Line 1 Slope: {slope1.toFixed(2)}</label>
                    <input
                      type="range"
                      min="-3"
                      max="3"
                      step="0.1"
                      value={slope1}
                      onChange={(e) => handleSlope1Change(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Line 2 Slope: {slope2.toFixed(2)}</label>
                    <input
                      type="range"
                      min="-3"
                      max="3"
                      step="0.1"
                      value={slope2}
                      onChange={(e) => handleSlope2Change(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-2">
                  <span className="text-xs text-slate-400">Slope Product</span>
                  <p className="text-2xl font-mono font-bold text-sky-400">{slopeProduct}</p>
                  <p className="text-xs font-semibold text-emerald-400">
                    {isParallel ? '✓ Lines are Parallel' : isPerpendicular ? '✓ Lines are Perpendicular' : 'Intersecting'}
                  </p>
                </div>
              </div>
            )}

            {sandboxTab === 'similarity' && (
              <div className="space-y-4">
                <label className="text-xs text-slate-400 block">Scale Factor k: {scaleFactorK.toFixed(1)}×</label>
                <input
                  type="range"
                  min="0.5"
                  max="4.0"
                  step="0.1"
                  value={scaleFactorK}
                  onChange={(e) => handleScaleFactorChange(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 block">Perimeter Multiplier</span>
                    <span className="text-xl font-bold text-indigo-400 font-mono">{scaleFactorK.toFixed(1)}×</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 block">Area Multiplier (k²)</span>
                    <span className="text-xl font-bold text-emerald-400 font-mono">
                      {(scaleFactorK * scaleFactorK).toFixed(2)}×
                    </span>
                  </div>
                </div>
              </div>
            )}

            {sandboxTab === 'bpt' && (
              <div className="space-y-4">
                <label className="text-xs text-slate-400 block">Parallel Cut Level: {Math.round(bptSplitRatio * 100)}%</label>
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.05"
                  value={bptSplitRatio}
                  onChange={(e) => handleBptRatioChange(parseFloat(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-indigo-300">
                  Thales Equality: AD/DB ({(bptSplitRatio / (1 - bptSplitRatio)).toFixed(2)}) = AE/EC ({(bptSplitRatio / (1 - bptSplitRatio)).toFixed(2)})
                </p>
              </div>
            )}

            {sandboxTab === 'loci' && (
              <div className="space-y-4">
                <label className="text-xs text-slate-400 block">Circle Radius: {circleRadius} m</label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={circleRadius}
                  onChange={(e) => handleCircleRadiusChange(parseInt(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-slate-400">
                  Remember: Circumference = 2πr is the locus, not the filled disk area!
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: STRUCTURED CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <canvas ref={canvasRef} width={80} height={40} className="rounded-lg bg-slate-950 border border-slate-800" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <h2 className="text-sm md:text-base font-bold text-white">
                  NEP Competency: <span className="capitalize text-sky-400">{challenge.competencyLevel}</span>
                </h2>
              </div>
            </div>

            <div className="w-full sm:w-48">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>Progress</span>
                <span>{Math.round(((currentChallenge + 1) / filteredChallenges.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                : 'bg-slate-900/90 border-slate-800 text-slate-100'
            }`}
          >
            <p className="text-base md:text-lg font-semibold mb-4 leading-relaxed">{challenge.question}</p>

            {/* MCQ */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      aria-label={`Select ${opt}`}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all ${
                        showExplanation
                          ? i === challenge.correctIndex
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                            : 'bg-slate-800/40 border-slate-800 text-slate-400'
                          : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="font-bold text-slate-400 text-xs mt-0.5">[{String.fromCharCode(65 + i)}]</span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag-Label */}
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
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                  {Object.keys(challenge.correctMapping || {}).map((targetId) => (
                    <div
                      key={targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-3 bg-slate-900 border-2 border-dashed border-slate-700 rounded-xl text-center min-h-[50px] flex items-center justify-center text-xs font-mono"
                    >
                      {droppedLabels[targetId] ? (
                        <span className="text-emerald-400 font-bold">{droppedLabels[targetId]}</span>
                      ) : (
                        <span className="text-slate-500">Drop matching formula here</span>
                      )}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* Drag-Sort */}
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
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center font-bold text-[10px]">
                        {displayIndex + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs"
                >
                  Verify Order
                </motion.button>
              </div>
            )}

            {/* Numeric */}
            {challenge.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <input
                  type="number"
                  step="any"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter value"
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
                {challenge.unit && <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || numericInput === ''}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-md"
                >
                  Check Answer
                </motion.button>
              </div>
            )}

            {/* Construct */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-mono text-slate-200"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[50px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <motion.div
                      key={idx}
                      className="px-2.5 py-1 bg-indigo-950 border border-indigo-700 text-indigo-300 rounded-lg text-xs font-mono flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts((p) => p.filter((_, i) => i !== idx))}
                        className="text-rose-400 font-bold hover:text-rose-300"
                      >
                        ×
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click formula blocks above to construct the derivation</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs"
                >
                  Verify Derivation
                </motion.button>
              </div>
            )}

            {/* Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  Step-by-Step Mathematical Walkthrough:
                </span>
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-300 leading-relaxed"
                    >
                      <span className="font-bold text-indigo-400">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-xs font-bold border border-slate-700"
                  >
                    Reveal Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length
                      ? 'Finish Simulation →'
                      : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MASTERY PROFILE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 md:p-8 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 rounded-3xl border border-indigo-700/60 text-center space-y-4 shadow-2xl">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Smart City Masterplan Approved!</h2>
            <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto">
              You have successfully verified coordinate slope intersections, similarity scale factors, Thales theorem proportions, and security locus boundaries!
            </p>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Final Score</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  {Math.max(0, 100 - errors * 5)}%
                </span>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Mastery Tier</span>
                <span className="text-2xl font-black text-sky-400 capitalize font-mono">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK */}
          <div
            className={`p-5 rounded-2xl border text-center ${
              errors === 0
                ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200'
                : errors <= 3
                ? 'bg-sky-950/60 border-sky-500/80 text-sky-200'
                : errors <= 7
                ? 'bg-amber-950/60 border-amber-500/80 text-amber-200'
                : 'bg-rose-950/60 border-rose-500/80 text-rose-200'
            }`}
          >
            <span className="text-xl md:text-2xl font-black tracking-wide block mb-1">
              {motivationalMessage}
            </span>
            <p className="text-xs md:text-sm text-slate-300">
              {errors === 0
                ? 'Flawless performance! You demonstrated complete mastery across all geometric principles.'
                : errors <= 3
                ? 'Outstanding work! Your geometric reasoning and problem-solving skills are very strong.'
                : errors <= 7
                ? 'Solid effort! You tackled complex challenges and made great progress.'
                : 'Every challenge is a stepping stone. Review the concepts and try again to build your confidence!'}
            </p>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">💭</span>
              <h3 className="text-base font-bold text-indigo-300 uppercase tracking-wider">
                Reflection & Deep Understanding
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Take a moment to solidify your mental models by reflecting on these core questions:
            </p>

            <div className="space-y-4 pt-2">
              {[
                {
                  id: 'q1',
                  question: 'What was the most surprising thing you learned?',
                  placeholder: 'e.g., How area scales with the square of the scale factor k², or why perpendicular angle bisectors always meet at 90°...',
                },
                {
                  id: 'q2',
                  question: 'How would you explain this to a friend?',
                  placeholder: 'e.g., Slopes are steepness, perpendicular lines are negative flips of each other, and similarity is pure geometric zoom...',
                },
                {
                  id: 'q3',
                  question: 'Where in real life might you use this?',
                  placeholder: 'e.g., Architectural blueprints, GPS maps, road planning, camera lenses, or construction site layouts...',
                },
              ].map((item, idx) => (
                <div key={item.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-slate-200 block">
                    <span className="text-indigo-400 mr-1.5">{idx + 1}.</span>
                    {item.question}
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionResponses[item.id] || ''}
                    onChange={(e) =>
                      setReflectionResponses((prev) => ({ ...prev, [item.id]: e.target.value }))
                    }
                    placeholder={item.placeholder}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Misconception Review */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 border border-rose-800/50 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300">
                Identified Concept Clarifications:
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-300 font-semibold">❌ {m.misconception}</p>
                    <p className="text-emerald-300 font-medium">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real-World Activity Card */}
          <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">
              🏗️ Real-World Engineering Challenge: {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Spaced Repetition Notification */}
          <div className="p-4 bg-amber-950/30 border border-amber-800/40 rounded-2xl text-xs text-amber-300 flex items-center justify-between">
            <span>
              📅 Next Spaced Review scheduled in{' '}
              <strong>{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to cement your memory!
            </span>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Stage Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export { C10_MathematicsConditionsParallelPerpendicularSim };
export default C10_MathematicsConditionsParallelPerpendicularSim;
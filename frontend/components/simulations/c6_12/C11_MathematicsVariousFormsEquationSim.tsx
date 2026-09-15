'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS CONSTANTS (ALL 10 ISC CLASS 11 MATHEMATICS NODES) ───
const NODE_C11_MATH_072 = 'c11_math_072'; // Various forms of equation of a line
const NODE_C11_MATH_073 = 'c11_math_073'; // General equation of a line
const NODE_C11_MATH_074 = 'c11_math_074'; // Distance of a point from a line
const NODE_C11_MATH_075 = 'c11_math_075'; // Distance between parallel lines and angle bisectors
const NODE_C11_MATH_076 = 'c11_math_076'; // Family of lines and locus
const NODE_C11_MATH_077 = 'c11_math_077'; // Section formula, incentre, collinearity
const NODE_C11_MATH_078 = 'c11_math_078'; // Circles - standard, diameter, general, parametric
const NODE_C11_MATH_079 = 'c11_math_079'; // Centre, radius, and circle construction
const NODE_C11_MATH_080 = 'c11_math_080'; // Conic sections - foci, directrix, eccentricity
const NODE_C11_MATH_081 = 'c11_math_081'; // Parabola - standard equations and properties

const ALL_NODE_IDS = [
  NODE_C11_MATH_072,
  NODE_C11_MATH_073,
  NODE_C11_MATH_074,
  NODE_C11_MATH_075,
  NODE_C11_MATH_076,
  NODE_C11_MATH_077,
  NODE_C11_MATH_078,
  NODE_C11_MATH_079,
  NODE_C11_MATH_080,
  NODE_C11_MATH_081,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Chandrayaan Trajectory & Radar Tracking Lab',
  intro: 'You are the lead orbital dynamicist at ISRO Telemetry, Tracking and Command Network (ISTRAC) in Bengaluru. To guide landing craft, align satellite tracking dishes, and construct parabolic antenna reflectors, you need mastery of Cartesian lines, circle envelopes, and conic sections.',
  context: 'Coordinate geometry forms the exact mathematical foundation for calculating distances to flight paths, designing circular orbital insertion corridors, and focusing signals into parabolic feeds.',
};

// ─── DISCOVERY HOOK QUESTION (Before exploration) ───
const DISCOVERY_QUESTION = {
  question: 'An ISRO radar dish is shaped like a parabola. Radio signals bounce off the dish and meet at a single focal point. If a tracking point P(x,y) moves such that its distance from the focus S(3,0) equals its perpendicular distance from the line x = -3, what curve is traced?',
  options: [
    'A circle of radius 3 centred at origin',
    'A parabola with equation y² = 12x',
    'An ellipse with major axis 6',
    'A straight line parallel to the y-axis',
  ],
  correctIndex: 1,
  hintAfter: 'Because the distance to the focus equals the distance to the directrix (eccentricity e = 1), it forms a parabola! Let us explore how all line, circle, and conic equations work.',
};

// ─── CHALLENGE INTERFACE (NEP 2020 / CISCE 2026 Aligned) ───
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation Recall - c11_math_072
  {
    id: 'ch_01_line_forms',
    nodeId: NODE_C11_MATH_072,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A line passes through point (2, 3) with slope m = 4. What is its point-slope equation form?',
    options: ['y - 3 = 4(x - 2)', 'y - 2 = 4(x - 3)', 'x - 2 = 4(y - 3)', 'y = 4x + 3'],
    correctIndex: 0,
    explanation: 'Point-slope form is y - y₁ = m(x - x₁). Substituting (x₁, y₁) = (2, 3) and m = 4 gives y - 3 = 4(x - 2). Expanding gives y = 4x - 5.',
    hints: [
      'Recall the point-slope formula: (y - y₁) = m(x - x₁).',
      'The x-coordinate is 2 (so x₁ = 2) and y-coordinate is 3 (so y₁ = 3).',
      'Substitute directly: y - 3 on the left, and 4*(x - 2) on the right.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation Understanding - c11_math_073
  {
    id: 'ch_02_general_slope',
    nodeId: NODE_C11_MATH_073,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the slope (m) and y-intercept (c) of the line 3x + 4y + 12 = 0?',
    options: [
      'm = 3/4, y-intercept = 3',
      'm = -3/4, y-intercept = -3',
      'm = -3/4, y-intercept = 3',
      'm = 4/3, y-intercept = -4',
    ],
    correctIndex: 1,
    explanation: 'Rearranging 3x + 4y + 12 = 0 gives 4y = -3x - 12 => y = (-3/4)x - 3. Thus slope m = -a/b = -3/4 and y-intercept = -c/b = -12/4 = -3.',
    hints: [
      'Solve the general form ax + by + c = 0 for y: y = (-a/b)x - c/b.',
      'Remember that moving 3x and 12 across the equals sign flips their signs to negative.',
      'Divide both -3x and -12 by the coefficient of y, which is 4.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation Numeric - c11_math_074
  {
    id: 'ch_03_pt_line_dist',
    nodeId: NODE_C11_MATH_074,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Calculate the perpendicular distance from ISRO tracking station P(3, 4) to telemetry boundary line 3x + 4y - 10 = 0 in km.',
    correctAnswer: 3,
    tolerance: 0.05,
    unit: 'km',
    explanation: 'd = |ax₁ + by₁ + c| / √(a² + b²) = |3(3) + 4(4) - 10| / √(3² + 4²) = |9 + 16 - 10| / 5 = 15 / 5 = 3 km.',
    hints: [
      'Use the formula d = |ax₁ + by₁ + c| / √(a² + b²).',
      'Calculate numerator: |3*3 + 4*4 - 10| = |9 + 16 - 10| = 15.',
      'Calculate denominator: ���(3² + 4²) = √(9 + 16) = 5. Divide 15 by 5.',
    ],
  },
  // 4. Foundation Drag-Label - c11_math_081
  {
    id: 'ch_04_parabola_parts',
    nodeId: NODE_C11_MATH_081,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct geometric descriptors to the components of the standard parabola y² = 4ax.',
    dragItems: [
      { label: 'Focus S(a,0)', targetId: 'target_focus' },
      { label: 'Directrix x = -a', targetId: 'target_directrix' },
      { label: 'Vertex (0,0)', targetId: 'target_vertex' },
      { label: 'Latus Rectum (4a)', targetId: 'target_lr' },
    ],
    correctMapping: {
      target_focus: 'Focus S(a,0)',
      target_directrix: 'Directrix x = -a',
      target_vertex: 'Vertex (0,0)',
      target_lr: 'Latus Rectum (4a)',
    },
    explanation: 'For y² = 4ax, the vertex is at (0,0), focus is on positive x-axis at (a,0), directrix is vertical line x = -a, and latus rectum length is 4a.',
    hints: [
      'The focus sits inside the cup along the x-axis at distance a from vertex.',
      'The directrix is behind the vertex at x = -a.',
      'The chord perpendicular to the axis passing through focus is the latus rectum.',
    ],
    misconceptionIndex: 3,
  },
  // 5. Standard Understanding - c11_math_075
  {
    id: 'ch_05_parallel_lines_dist',
    nodeId: NODE_C11_MATH_075,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the perpendicular distance between the two parallel railway tracks 3x + 4y - 10 = 0 and 3x + 4y + 20 = 0.',
    correctAnswer: 6,
    tolerance: 0.05,
    unit: 'units',
    explanation: 'd = |c₁ - c₂| / √(a² + b²) = |20 - (-10)| / √(3² + 4²) = 30 / 5 = 6 units.',
    hints: [
      'For lines ax + by + c₁ = 0 and ax + by + c₂ = 0, distance d = |c₁ - c₂| / √(a² + b²).',
      'c₁ = -10 and c₂ = 20, so |c₁ - c₂| = |-10 - 20| = 30.',
      'Divide 30 by √(3² + 4²) = 5.',
    ],
    misconceptionIndex: 1,
  },
  // 6. Standard Drag-Sort - c11_math_076
  {
    id: 'ch_06_locus_derivation_sort',
    nodeId: NODE_C11_MATH_076,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the systematic steps for deriving the locus equation of a point P equidistant from A(1,2) and B(3,4).',
    sortItems: [
      'Let coordinates of moving point be P(x, y)',
      'State geometric condition: Distance PA = Distance PB',
      'Square both sides: (x - 1)² + (y - 2)² = (x - 3)² + (y - 4)²',
      'Expand terms and cancel x² + y² to get 4x + 4y - 20 = 0',
      'Simplify to standard line equation x + y = 5 (Perpendicular Bisector)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'To derive a locus: 1. Define P(x,y) -> 2. Write constraint PA = PB -> 3. Use distance formula & square -> 4. Expand and eliminate quadratic terms -> 5. Simplify to final Cartesian equation.',
    hints: [
      'Always start by setting variable point P(x,y).',
      'Translate the English constraint into algebraic distance relations before expanding.',
      'Simplify and cancel common x² + y² terms at the end.',
    ],
  },
  // 7. Standard Application - c11_math_077
  {
    id: 'ch_07_section_external',
    nodeId: NODE_C11_MATH_077,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Point R divides segment joining P(2, -3) and Q(5, 6) externally in ratio 3 : 2. What are coordinates of R?',
    options: ['(11, 24)', '(19/5, 12/5)', '(7, 9)', '(1, -12)'],
    correctIndex: 0,
    explanation: 'External section formula: ((mx₂ - nx₁)/(m - n), (my₂ - ny₁)/(m - n)). x = (3*5 - 2*2)/(3 - 2) = 15 - 4 = 11. y = (3*6 - 2*(-3))/(3 - 2) = 18 + 6 = 24. So R = (11, 24).',
    hints: [
      'External division has MINUS signs: x = (m*x₂ - n*x₁) / (m - n).',
      'm = 3, n = 2, x₁ = 2, x₂ = 5 => x = (3*5 - 2*2) / 1 = 11.',
      'For y: y = (3*6 - 2*(-3)) / (3 - 2) = (18 + 6) / 1 = 24.',
    ],
    misconceptionIndex: 2,
  },
  // 8. Standard Understanding - c11_math_078
  {
    id: 'ch_08_circle_centre_radius',
    nodeId: NODE_C11_MATH_078,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'For circle x² + y² - 6x + 8y + 5 = 0, identify its centre C and radius r.',
    options: [
      'Centre (-3, 4), radius = √20',
      'Centre (3, -4), radius = 2√5',
      'Centre (6, -8), radius = 5',
      'Centre (-6, 8), radius = √45',
    ],
    correctIndex: 1,
    explanation: 'Comparing with x² + y² + 2gx + 2fy + c = 0: 2g = -6 => g = -3; 2f = 8 => f = 4; c = 5. Centre is (-g, -f) = (3, -4). Radius r = √(g² + f² - c) = √(9 + 16 - 5) = √20 = 2√5.',
    hints: [
      'The centre is (-g, -f), where 2g is the coefficient of x and 2f is the coefficient of y.',
      'Halve -6 to get g = -3, so -g = +3. Halve 8 to get f = 4, so -f = -4.',
      'Radius formula is √(g² + f² - c), remember to SUBTRACT c = 5.',
    ],
    misconceptionIndex: 0,
  },
  // 9. Standard Application - c11_math_079
  {
    id: 'ch_09_two_circles_touch',
    nodeId: NODE_C11_MATH_079,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Circle C₁ has centre (0,0) and radius 3. Circle C₂ has centre (4,0) and radius 1. How do these two circles relate?',
    options: [
      'Touch externally at (3, 0)',
      'Touch internally at (1, 0)',
      'Intersect at two points',
      'Completely separate with no contact',
    ],
    correctIndex: 0,
    explanation: 'Distance between centres d = √((4-0)² + (0-0)²) = 4. Sum of radii r₁ + r₂ = 3 + 1 = 4. Since d = r₁ + r₂, the circles touch externally.',
    hints: [
      'Find distance between centres: d = |4 - 0| = 4.',
      'Sum of radii = 3 + 1 = 4.',
      'When distance between centres d equals r₁ + r₂, circles touch externally.',
    ],
  },
  // 10. Standard Understanding - c11_math_080
  {
    id: 'ch_10_eccentricity_conic',
    nodeId: NODE_C11_MATH_080,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A deep space probe moves such that its distance from Earth (focus) is 1.6 times its distance from a reference solar radiation plane (directrix). What is the trajectory conic?',
    options: ['Ellipse', 'Parabola', 'Hyperbola', 'Circle'],
    correctIndex: 2,
    explanation: 'Focus-directrix definition: PS = e*PL. Here e = 1.6. Since e > 1, the locus is a Hyperbola. (e = 0 is circle, e < 1 is ellipse, e = 1 is parabola).',
    hints: [
      'Check the value of eccentricity e = 1.6.',
      'e < 1 gives ellipse, e = 1 gives parabola, e > 1 gives hyperbola.',
      'Since 1.6 > 1, the curve must be a hyperbola.',
    ],
  },
  // 11. Advanced Analysis - c11_math_072
  {
    id: 'ch_11_normal_form_convert',
    nodeId: NODE_C11_MATH_072,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Convert line √3 x + y - 8 = 0 into normal form x cos α + y sin α = p. What are α and p?',
    options: [
      'α = 30°, p = 4',
      'α = 60°, p = 4',
      'α = 30°, p = 8',
      'α = 45°, p = 4√2',
    ],
    correctIndex: 0,
    explanation: 'Rewrite: √3 x + y = 8. Divide by √(a² + b²) = √(3 + 1) = 2. We get (√3/2)x + (1/2)y = 4. Comparing with x cos α + y sin α = p: cos α = √3/2, sin α = 1/2 => α = 30°, p = 4.',
    hints: [
      'Move constant to RHS: √3 x + y = 8.',
      'Divide by √( (√3)² + 1² ) = √4 = 2.',
      'cos α = √3/2 and sin α = 1/2 gives angle α = 30°, with perpendicular distance p = 8/2 = 4.',
    ],
    misconceptionIndex: 0,
  },
  // 12. Advanced Construct - c11_math_073
  {
    id: 'ch_12_construct_line_form',
    nodeId: NODE_C11_MATH_073,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the general form equation of a line passing through (0, -2) and (3, 0) in the form Ax + By + C = 0.',
    availableParts: ['2x', '-3y', '-6', '+6', '= 0', '3x', '+2y', '-2x'],
    targetState: '2x -3y -6 = 0',
    validationHint: 'Use intercept form x/3 + y/(-2) = 1 => 2x - 3y - 6 = 0.',
    explanation: 'Intercepts are a = 3, b = -2. Intercept form is x/3 + y/(-2) = 1 => 2x - 3y = 6 => 2x - 3y - 6 = 0.',
    hints: [
      'Start with x-intercept a = 3 and y-intercept b = -2.',
      'Write x/3 - y/2 = 1. Multiply throughout by 6: 2x - 3y = 6.',
      'Subtract 6 from both sides to assemble: 2x -3y -6 = 0.',
    ],
  },
  // 13. Advanced Analysis - c11_math_075
  {
    id: 'ch_13_angle_bisector_acute',
    nodeId: NODE_C11_MATH_075,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'For intersecting optical beams 3x + 4y - 7 = 0 and 4x - 3y + 5 = 0, what angle do the two bisectors make with each other?',
    options: ['90° (Always perpendicular)', '45°', '60°', 'Depends on the lines'],
    correctIndex: 0,
    explanation: 'The angle bisectors of ANY pair of intersecting lines are ALWAYS perpendicular to each other (angle = 90°). Here, slopes are -1/7 and 7; product m₁*m₂ = -1.',
    hints: [
      'Consider the geometry of internal and external angle bisectors.',
      'The sum of adjacent supplementary angles is 180°, so the sum of their halves is 90°.',
      'Hence the two angle bisectors are always at 90° to each other.',
    ],
  },
  // 14. Advanced Application - c11_math_076
  {
    id: 'ch_14_family_lines_parallel',
    nodeId: NODE_C11_MATH_076,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Find the line through the intersection of L₁: 2x + y - 5 = 0 and L₂: x - y - 1 = 0 that is parallel to 3x + 4y = 7.',
    options: ['3x + 4y - 10 = 0', '3x + 4y - 14 = 0', '4x - 3y - 5 = 0', '3x + 4y + 2 = 0'],
    correctIndex: 0,
    explanation: 'Intersection of L₁ and L₂ is (2, 1). Required line is parallel to 3x + 4y = 7, so it has form 3x + 4y + k = 0. Substituting (2, 1): 3(2) + 4(1) + k = 0 => 10 + k = 0 => k = -10. Equation is 3x + 4y - 10 = 0.',
    hints: [
      'Solve L₁ and L₂ simultaneously: adding gives 3x = 6 => x = 2, y = 1.',
      'Any parallel line has equation 3x + 4y + k = 0.',
      'Substitute point (2, 1): 3(2) + 4(1) + k = 0 => k = -10.',
    ],
  },
  // 15. Advanced Application - c11_math_077
  {
    id: 'ch_15_incentre_calc',
    nodeId: NODE_C11_MATH_077,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Calculate the incentre of right-angled triangle with vertices A(0,0), B(4,0), and C(0,3).',
    options: ['(1, 1)', '(4/3, 1)', '(1, 5/4)', '(2, 2)'],
    correctIndex: 0,
    explanation: 'Sides opposite to vertices: a = BC = 5, b = CA = 3, c = AB = 4. Incentre = ((a*x₁ + b*x₂ + c*x₃)/(a+b+c), (a*y₁ + b*y₂ + c*y₃)/(a+b+c)) = ((5*0 + 3*4 + 4*0)/(12), (5*0 + 3*0 + 4*3)/(12)) = (12/12, 12/12) = (1, 1).',
    hints: [
      'Side lengths: a = BC = √(4² + 3²) = 5; b = CA = 3; c = AB = 4. Perimeter = 12.',
      'Weighted coordinates: x = (a*x_A + b*x_B + c*x_C)/(a+b+c) = (5*0 + 3*4 + 4*0)/12.',
      'y = (5*0 + 3*0 + 4*3)/12 = 12/12 = 1. So incenter is (1, 1).',
    ],
    misconceptionIndex: 1,
  },
  // 16. Advanced Application - c11_math_078
  {
    id: 'ch_16_diameter_circle',
    nodeId: NODE_C11_MATH_078,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Endpoints of a circle diameter are A(1, 2) and B(5, 6). What is its equation in standard general form?',
    options: [
      'x² + y² - 6x - 8y + 17 = 0',
      'x² + y² - 6x - 8y + 25 = 0',
      'x² + y² + 6x + 8y - 17 = 0',
      '(x - 3)² + (y - 4)² = 16',
    ],
    correctIndex: 0,
    explanation: 'Diameter form is (x - 1)(x - 5) + (y - 2)(y - 6) = 0 => x² - 6x + 5 + y² - 8y + 12 = 0 => x² + y² - 6x - 8y + 17 = 0.',
    hints: [
      'Use diameter formula: (x - x₁)(x - x₂) + (y - y₁)(y - y₂) = 0.',
      'Expand (x - 1)(x - 5) = x² - 6x + 5.',
      'Expand (y - 2)(y - 6) = y² - 8y + 12. Add them: x² + y² - 6x - 8y + 17 = 0.',
    ],
  },
  // 17. Advanced Evaluation - c11_math_079
  {
    id: 'ch_17_collinear_three_points',
    nodeId: NODE_C11_MATH_079,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why can NO UNIQUE real circle pass through the three points (1, 1), (2, 2), and (4, 4)?',
    options: [
      'The points are collinear (area of triangle = 0, radius would be infinite)',
      'The points are all in the 1st quadrant',
      'The center would have negative coordinates',
      'The radius equation produces an imaginary number',
    ],
    correctIndex: 0,
    explanation: 'A circle requires 3 non-collinear points. Points (1,1), (2,2), (4,4) all lie on the line y = x. The perpendicular bisectors are parallel and never meet, meaning centre is at infinity.',
    hints: [
      'Notice that y = x for all three points.',
      'Check slope: (2-1)/(2-1) = 1 and (4-2)/(4-2) = 1.',
      'Since they lie on a straight line, they cannot lie on a curved circle of finite radius.',
    ],
  },
  // 18. Advanced Analysis - c11_math_080
  {
    id: 'ch_18_cone_cut_parabola',
    nodeId: NODE_C11_MATH_080,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A cutting plane intersects a right circular double cone with semi-vertical angle α. If the cutting plane makes angle β with the cone axis, which condition produces a PARABOLA?',
    options: ['β = α (Plane parallel to generator)', 'β = 90°', 'α < β < 90°', '0 ≤ β < α'],
    correctIndex: 0,
    explanation: 'When β = α, the plane is parallel to exactly one generator, slicing through only one nappe without closing, yielding a PARABOLA. (β = 90° is circle, α < β < 90° is ellipse, β < α is hyperbola).',
    hints: [
      'A parabola is the boundary case between closed ellipse and two-branched hyperbola.',
      'This occurs when the plane angle β exactly equals the semi-vertical angle α.',
      'This makes the cutting plane strictly parallel to one slant line (generator).',
    ],
  },
  // 19. Advanced Numeric - c11_math_081
  {
    id: 'ch_19_parabola_lr_calc',
    nodeId: NODE_C11_MATH_081,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An ISRO deep-space dish has parabola equation x² = 24y. What is the focal distance parameter "a" in meters?',
    correctAnswer: 6,
    tolerance: 0.05,
    unit: 'm',
    explanation: 'Standard form is x² = 4ay. Comparing 4a = 24 gives a = 6 meters. (Focus is at (0, 6) and directrix is y = -6).',
    hints: [
      'Compare x² = 24y with x² = 4ay.',
      'Set 4a = 24.',
      'Divide 24 by 4 to get a = 6.',
    ],
    misconceptionIndex: 3,
  },
  // 20. Advanced Analysis - c11_math_081
  {
    id: 'ch_20_parabola_quadrants',
    nodeId: NODE_C11_MATH_081,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In which quadrants does the parabola y² = -8x lie?',
    options: [
      'Quadrants II and III (x must be ≤ 0)',
      'Quadrants I and IV',
      'Quadrants I and II',
      'Quadrants III and IV',
    ],
    correctIndex: 0,
    explanation: 'Since y² ≥ 0 for all real y, -8x ≥ 0 => x ≤ 0. Therefore x is negative while y can be positive (Quad II) or negative (Quad III). It opens to the left.',
    hints: [
      'Because y² cannot be negative, -8x must be ≥ 0.',
      'This requires x to be negative or zero (x ≤ 0).',
      'Points with negative x lie in Quadrants II (y > 0) and III (y < 0).',
    ],
  },
  // 21. Standard Evaluation - c11_math_074
  {
    id: 'ch_21_distance_from_origin',
    nodeId: NODE_C11_MATH_074,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate perpendicular distance from origin (0, 0) to line 5x - 12y + 26 = 0.',
    correctAnswer: 2,
    tolerance: 0.05,
    unit: 'units',
    explanation: 'p = |c| / √(a² + b²) = |26| / √(5² + (-12)²) = 26 / √(25 + 144) = 26 / 13 = 2 units.',
    hints: [
      'Distance from origin is p = |c| / √(a² + b²).',
      'Numerator is |26| = 26.',
      'Denominator is √(5² + 12²) = √169 = 13. 26 / 13 = 2.',
    ],
  },
  // 22. Advanced Creativity - c11_math_077
  {
    id: 'ch_22_collinearity_determinant',
    nodeId: NODE_C11_MATH_077,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Three satellite stations are at (1, 2), (3, k), and (5, 6). If they lie strictly on one straight alignment (collinear), what is k?',
    options: ['k = 4', 'k = 3', 'k = 5', 'k = 2'],
    correctIndex: 0,
    explanation: 'Area of triangle = 0 => 1(k - 6) + 3(6 - 2) + 5(2 - k) = 0 => k - 6 + 12 + 10 - 5k = 0 => -4k + 16 = 0 => k = 4. (Or slope (k-2)/2 = (6-k)/2 => 2k = 8 => k = 4).',
    hints: [
      'Equal slopes condition: (k - 2)/(3 - 1) = (6 - k)/(5 - 3).',
      '(k - 2)/2 = (6 - k)/2.',
      'k - 2 = 6 - k => 2k = 8 => k = 4.',
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
  nodeId: NODE_C11_MATH_072,
  title: 'Cartesian Lines, Circles & Parabolic Conics Laboratory',
  definition:
    'Comprehensive coordinate geometry covering line equation forms (point-slope, two-point, intercept, normal, general), perpendicular distance, parallel separation, angle bisectors, family of lines, locus, internal/external section formula, incentre, collinearity, standard/general/diameter/parametric circles, relative positions, conic eccentricity classification, and standard parabolas.',
  eli5:
    'Coordinate geometry lets you turn shapes into algebraic formulas and formulas into shapes on a grid. You can find the shortest distance from a ship to a flight path, build circular safety radar bubbles, and shape satellite reflectors so signals bounce right into the receiver focus.',
  misconceptions: [
    {
      misconception: 'In normal form x cos α + y sin α = p, α is the inclination of the line itself.',
      correction:
        'α is the angle of the PERPENDICULAR NORMAL from the origin to the line, NOT the line itself. The line inclination is α ± 90° and slope is -cot α.',
    },
    {
      misconception: 'The distance between parallel lines ax + by + c₁ = 0 and ax + by + c₂ = 0 is just |c₁ - c₂|.',
      correction:
        'You MUST divide by the magnitude of the normal vector: d = |c₁ - c₂| / √(a² + b²). Dropping the denominator is a major error.',
    },
    {
      misconception: 'External section formula uses the same addition signs as internal division.',
      correction:
        'External division has MINUS signs: ((mx₂ - nx₁)/(m - n), (my₂ - ny₁)/(m - n)). Plus signs place the point inside the segment!',
    },
    {
      misconception: 'The latus rectum length of parabola y² = 4ax is 2a.',
      correction:
        'The latus rectum is the FULL focal chord perpendicular to the axis, with endpoints (a, 2a) and (a, -2a). Its total length is 4a.',
    },
    {
      misconception: 'Any second-degree equation with x² and y² represents a circle.',
      correction:
        'It represents a circle ONLY if coefficients of x² and y² are equal (a = b) AND there is NO xy term (h = 0) AND g² + f² - c ≥ 0.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is the perpendicular distance from point (x₁, y₁) to the line ax + by + c = 0?',
      options: ['|ax₁ + by₁ + c| / √(a² + b²)', '(ax₁ + by₁ + c) / (a + b)', '|ax₁ + by₁| / √(a² + b²)', '√(ax₁² + by₁² + c²)'],
      correctIndex: 0,
    },
    {
      question: 'What is the eccentricity of a parabola?',
      options: ['e = 0', '0 < e < 1', 'e = 1', 'e > 1'],
      correctIndex: 2,
    },
    {
      question: 'What is the centre of circle x² + y² + 2gx + 2fy + c = 0?',
      options: ['(g, f)', '(-g, -f)', '(2g, 2f)', '(-2g, -2f)'],
      correctIndex: 1,
    },
    {
      question: 'What is the condition for three points to be collinear?',
      options: ['Area of formed triangle = 0', 'Sum of x-coordinates = 0', 'Product of slopes = -1', 'Centroid is at origin'],
      correctIndex: 0,
    },
    {
      question: 'For the standard parabola y² = 4ax, what is the directrix equation?',
      options: ['x = a', 'x = -a', 'y = -a', 'y = a'],
      correctIndex: 1,
    },
    {
      question: 'If two circles with centres C₁, C₂ and radii r₁, r₂ have centre distance d = r₁ + r₂, how do they touch?',
      options: ['Externally', 'Internally', 'They intersect at 2 points', 'They are concentric'],
      correctIndex: 0,
    },
    {
      question: 'In the intercept form x/a + y/b = 1, what does "a" represent?',
      options: ['x-intercept (point (a,0))', 'y-intercept', 'Slope of line', 'Normal distance from origin'],
      correctIndex: 0,
    },
    {
      question: 'What is the section formula for internal division of PQ in ratio m : n?',
      options: [
        '((mx₂ + nx₁)/(m + n), (my₂ + ny₁)/(m + n))',
        '((mx₁ + nx₂)/(m + n), (my₁ + ny₂)/(m + n))',
        '((mx₂ - nx₁)/(m - n), (my₂ - ny₁)/(m - n))',
        '((x₁ + x₂)/2, (y₁ + y₂)/2)',
      ],
      correctIndex: 0,
    },
  ],
  masteryCriteria: 'Mastery of all 10 CISCE Class 11 coordinate geometry nodes: lines, circles, conics & parabolas.',
};

// ─── EXPLORATION STEPS (Brilliant.org Learn-By-Doing) ───
const EXPLORATION_STEPS = [
  {
    title: 'Interactive Line Forms & Perpendicular Distance',
    instruction: 'Drag the slope (m) and y-intercept (c) sliders. Watch the line redraw, observe the normal form angle (α), and see the live perpendicular distance from tracking point P(2,3).',
    interactionType: 'slider-line',
    nodeId: NODE_C11_MATH_072,
  },
  {
    title: 'Parallel Lines Gap & Angle Bisectors',
    instruction: 'Adjust the line constant c₂ to see the constant gap |c₁ - c₂|/√(a²+b²) between parallel lines, and toggle the orthogonal angle bisectors.',
    interactionType: 'slider-parallel',
    nodeId: NODE_C11_MATH_075,
  },
  {
    title: 'Section Formula & Triangle Incentre',
    instruction: 'Slide the division ratio m:n to move point R between internal and external positions on segment PQ, and see the incircle inside △ABC.',
    interactionType: 'slider-section',
    nodeId: NODE_C11_MATH_077,
  },
  {
    title: 'Circle Envelope & Parametric Motion',
    instruction: 'Drag radius (r) and centre coordinates (h,k). Slide the angle θ parameter to trace a point around the circle x = h + r cos θ, y = k + r sin θ.',
    interactionType: 'slider-circle',
    nodeId: NODE_C11_MATH_078,
  },
  {
    title: 'Conic Eccentricity Morpher & Parabola PS = ePL',
    instruction: 'Morph eccentricity "e" from 0 (Circle) -> 0.6 (Ellipse) -> 1.0 (Parabola) -> 2.0 (Hyperbola). Verify that for Parabola (e=1), distance to focus equals distance to directrix!',
    interactionType: 'slider-conic',
    nodeId: NODE_C11_MATH_080,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you double the radius "r" of a circle from 2 to 4 while keeping its centre fixed, what happens to the area enclosed?',
    options: ['Area doubles (2x)', 'Area quadruples (4x)', 'Area increases by √2', 'Area stays the same'],
    correctIndex: 1,
    verifyInstruction: 'Adjust the circle radius slider to r=4 and observe the area readout quadrupling (from 4π to 16π)!',
    nodeId: NODE_C11_MATH_078,
  },
  {
    question: 'Predict: If a line 3x + 4y - 10 = 0 is shifted parallel to 3x + 4y + 20 = 0, what is the exact shortest perpendicular gap between them?',
    options: ['30 units', '10 units', '6 units', '5 units'],
    correctIndex: 2,
    verifyInstruction: 'Check the parallel line separation gauge: |20 - (-10)| / 5 = 30 / 5 = 6 units.',
    nodeId: NODE_C11_MATH_075,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the two angle bisectors of ANY pair of intersecting lines on the graph?',
    observableOptions: [
      'They are always perpendicular (at 90°) to each other',
      'They are always parallel to each other',
      'They always have equal positive slopes',
      'They never pass through the intersection point',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_MATH_075,
  },
  {
    question: 'On the Parabola (e = 1), what is true for ANY point P chosen on the curve?',
    observableOptions: [
      'Distance to Focus S equals perpendicular distance to Directrix L (PS = PL)',
      'Distance to Focus is twice the distance to Directrix',
      'Distance to Focus is constant regardless of position',
      'The point is always closer to the directrix than to the focus',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_MATH_081,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Deep-Space Tracking Dish Calibration',
  description:
    'Design an astronomical parabolic antenna reflector for receiving weak radio signals from Mars Orbiter Mission. Set the vertex at origin (0,0), place the microwave receiver horn at the focal point S(0, 4.5 meters), and calculate the dish aperture width along the latus rectum.',
  steps: [
    'Identify standard upward parabola form: x² = 4ay with a = 4.5 m',
    'Calculate the latus rectum width: Aperture = 4a = 4 * 4.5 = 18 meters',
    'Verify directrix location: y = -4.5 m behind the dish vertex',
    'Construct the equation: x² = 18y and verify all incoming parallel vertical wavefronts reflect directly into the focus!',
  ],
};

// ─── COMPONENT IMPLEMENTATION ──���
export function C11_MathematicsVariousFormsEquationSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_MATH_072,
  title = DEFAULT_PROPS.title || 'Cartesian Lines, Circles & Parabolic Conics',
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['mathematics'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const bktStateRef = useRef(createBKTState());

  // Interactive Laboratory Controls State
  const [lineSlope, setLineSlope] = useState(1.5); // m
  const [lineIntercept, setLineIntercept] = useState(-2); // c
  const [targetPointX, setTargetPointX] = useState(2);
  const [targetPointY, setTargetPointY] = useState(3);
  const [parallelC1, setParallelC1] = useState(-10);
  const [parallelC2, setParallelC2] = useState(20);
  const [showBisectors, setShowBisectors] = useState(true);

  const [sectionM, setSectionM] = useState(3);
  const [sectionN, setSectionN] = useState(2);
  const [isExternalSection, setIsExternalSection] = useState(false);

  const [circleH, setCircleH] = useState(0);
  const [circleK, setCircleK] = useState(0);
  const [circleR, setCircleR] = useState(4);
  const [circleTheta, setCircleTheta] = useState(45); // degrees

  const [eccentricity, setEccentricity] = useState(1.0); // Conic: 0 circle, 0.6 ellipse, 1.0 parabola, 1.8 hyperbola
  const [parabolaA, setParabolaA] = useState(2);

  // Discovery & Exploration Interactive States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [selectedToolTab, setSelectedToolTab] = useState<'line' | 'parallel' | 'section' | 'circle' | 'conic'>('line');

  // Challenges State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Timers & Canvas Ref
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── MOTIVATIONAL FEEDBACK HELPER ───
  const getMotivationalMessage = (errCount: number) => {
    if (errCount === 0) return 'PERFECT SCORE!';
    if (errCount <= 3) return 'Great work!';
    if (errCount <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  };

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── ESCALATING HINTS HANDLER ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
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
      speechManager.speak('Let us study the complete mathematical solution together.');
    }
  }, [hintCount, challenge]);

  // ─── INACTIVITY AUTO-HINT ───
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

  // ─���─ HANDLERS FOR PHASES ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction! You recognize the parabola focus-directrix property.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive Cartesian geometry lab! Manipulate the sliders to explore lines, circles, and conics.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Test any parameters without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Starting challenge mode. Test your mastery with CISCE and NEP competency questions.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Now verify your prediction using the interactive controls!');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[1].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent observation! Mathematical invariants verified.' : 'Look closely at the perpendicular orientation.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! Simulation complete. You scored ${finalScore} percent.`);
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

  // ─── ANSWER HANDLER ───
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
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.05);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === challenge.targetState?.trim();
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
          speechManager.speak('All hints used. Review the complete step-by-step mathematical reasoning.');
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

  // ─── DRAG & DROP HANDLERS ───
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

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const arr = prev.length === 0 ? (challenge.sortItems?.map((_, i) => i) || []) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── DERIVED GEOMETRIC CALCULATIONS (Lines & Perpendiculars) ───
  const linePerpDistance = useMemo(() => {
    const a = lineSlope;
    const b = -1;
    const c = lineIntercept;
    const num = Math.abs(a * targetPointX + b * targetPointY + c);
    const den = Math.sqrt(a * a + b * b);
    return den > 0 ? num / den : 0;
  }, [lineSlope, lineIntercept, targetPointX, targetPointY]);

  // Normal Form parameters
  const normalFormP = useMemo(() => {
    const a = lineSlope;
    const b = -1;
    const c = lineIntercept;
    const den = Math.sqrt(a * a + b * b);
    return Math.abs(c) / den;
  }, [lineSlope, lineIntercept]);

  const normalFormAlphaDeg = useMemo(() => {
    const a = lineSlope;
    const b = -1;
    let rad = Math.atan2(b, a);
    if (rad < 0) rad += 2 * Math.PI;
    return (rad * 180) / Math.PI;
  }, [lineSlope]);

  // Section division point
  const sectionPoint = useMemo(() => {
    const P = { x: 1, y: 1 };
    const Q = { x: 7, y: 7 };
    const m = sectionM;
    const n = sectionN;
    if (!isExternalSection) {
      return {
        x: (m * Q.x + n * P.x) / (m + n),
        y: (m * Q.y + n * P.y) / (m + n),
      };
    } else {
      const denom = m - n !== 0 ? m - n : 0.0001;
      return {
        x: (m * Q.x - n * P.x) / denom,
        y: (m * Q.y - n * P.y) / denom,
      };
    }
  }, [sectionM, sectionN, isExternalSection]);

  // Parametric circle point
  const parametricPoint = useMemo(() => {
    const rad = (circleTheta * Math.PI) / 180;
    return {
      x: circleH + circleR * Math.cos(rad),
      y: circleK + circleR * Math.sin(rad),
    };
  }, [circleH, circleK, circleR, circleTheta]);

  // ─── 2D CANVAS ANIMATION (HTML <canvas> with requestAnimationFrame) ───
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

      // Radar grid background circles
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(150, 75, 55, 0, Math.PI * 2);
      ctx.arc(150, 75, 35, 0, Math.PI * 2);
      ctx.arc(150, 75, 15, 0, Math.PI * 2);
      ctx.stroke();

      // Axis crosshairs
      ctx.beginPath();
      ctx.moveTo(150, 10);
      ctx.lineTo(150, 140);
      ctx.moveTo(85, 75);
      ctx.lineTo(215, 75);
      ctx.strokeStyle = '#334155';
      ctx.stroke();

      // Sweeping radar arm
      const sweepAngle = (frame * 0.035) % (Math.PI * 2);
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(150, 75);
      ctx.lineTo(150 + 55 * Math.cos(sweepAngle), 75 + 55 * Math.sin(sweepAngle));
      ctx.stroke();

      // Incoming parabolic wave rays
      const waveOffset = (frame * 1.5) % 40;
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 3; i++) {
        const yPos = 35 + i * 40;
        ctx.beginPath();
        ctx.moveTo(20 + waveOffset, yPos);
        ctx.lineTo(120, yPos);
        ctx.stroke();
      }

      // Reflected focal rays converging on (150, 75)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
      ctx.beginPath();
      ctx.moveTo(110, 40);
      ctx.lineTo(150, 75);
      ctx.moveTo(110, 110);
      ctx.lineTo(150, 75);
      ctx.stroke();

      // Pulsing focus dot
      const pulseR = 3.5 + Math.sin(frame * 0.1) * 1.5;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(150, 75, pulseR, 0, Math.PI * 2);
      ctx.fill();

      // Live status text
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText('ISRO ISTRAC RADAR BEACON • ACTIVE', 12, 18);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── SVG COORDINATE SYSTEM HELPERS ───
  const toSvgX = (x: number) => 200 + x * 18;
  const toSvgY = (y: number) => 200 - y * 18;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50 shadow-inner" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-full border border-indigo-800">
                ISC Class 11 Mathematics
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : difficulty === 'standard'
                    ? 'bg-blue-950 text-blue-400 border border-blue-800'
                    : 'bg-rose-950 text-rose-400 border border-rose-800'
                }`}
              >
                {difficulty} Tier
              </motion.span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-1">{title}</h1>
          </div>
        </div>

        {/* Phase Badges & Controls */}
        <div className="flex items-center gap-2" role="navigation" aria-label="Simulation Phases">
          {['discovery', 'explore', 'sandbox', 'challenge', 'complete'].map((p) => (
            <span
              key={p}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg capitalize transition-all ${
                phase === p
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-slate-900 text-slate-500 border border-slate-800'
              }`}
            >
              {p}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ─── LIVE ISRO RADAR HTML CANVAS BANNER ─── */}
      <div className="mb-6 p-3 bg-slate-900/70 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[240px]">
          <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            ISRO Satellite Radar & Parabolic Telemetry Feed
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time optical/radio wave convergence at focus S(a, 0) based on standard Cartesian conic definitions.
          </p>
        </div>
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={300}
            height={150}
            className="w-[260px] h-[130px] rounded-xl border border-slate-800 bg-slate-950 shadow-inner"
            aria-label="Real-time HTML5 Canvas Simulation of ISRO Satellite Tracking Radar and Parabolic Wavefronts"
          />
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/60 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🚀 Mission Scenario</span>
            </div>
            <h2 className="text-2xl font-black text-white mb-3">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-xs bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              💡 {SCENARIO.context}
            </p>
          </div>

          {/* Interactive Curiosity Question */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">
              Curiosity Hook • Pre-Exploration Challenge
            </h3>
            <p className="text-white text-base font-semibold mb-4 leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold text-indigo-400 mr-2">
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓ ' : discoveryAnswered ? '✗ ' : `${String.fromCharCode(65 + i)}.`}
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-800">
                <p className={`text-sm font-semibold mb-4 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! e = 1 defines the parabola locus PS = PL.'
                    : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Launch interactive Cartesian geometry laboratory"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/25 flex items-center gap-2"
                >
                  <span>Launch Interactive Laboratory</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION (Brilliant.org style) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Exploration Navigation Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">
                Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                aria-label="Previous exploration step"
                className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold disabled:opacity-40"
              >
                ← Prev
              </motion.button>
              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide((s) => s + 1)}
                  aria-label="Next exploration step"
                  className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow-md shadow-indigo-500/30"
                >
                  Next Step →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  aria-label="Enter free exploration sandbox"
                  className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-md shadow-emerald-500/30"
                >
                  Enter Free Sandbox →
                </motion.button>
              )}
            </div>
          </div>

          <p className="text-amber-300 text-sm bg-amber-950/40 p-3 rounded-xl border border-amber-800/50">
            ��� <strong>Interactive Task:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* MAIN INTERACTIVE VISUALIZER WORKBENCH */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* SVG Visual Graph Canvas (7 cols) */}
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 relative overflow-hidden shadow-inner flex flex-col items-center justify-center">
              <svg viewBox="0 0 400 400" className="w-full max-w-[420px] aspect-square select-none" aria-label="Cartesian coordinate geometry graph visualizer">
                {/* Background Grid */}
                <defs>
                  <pattern id="grid" width="18" height="18" patternUnits="userSpaceOnUse">
                    <path d="M 18 0 L 0 0 0 18" fill="none" stroke="#1e293b" strokeWidth="0.7" />
                  </pattern>
                </defs>
                <rect width="400" height="400" fill="url(#grid)" />

                {/* Axes */}
                <line x1="0" y1="200" x2="400" y2="200" stroke="#475569" strokeWidth="1.5" />
                <line x1="200" y1="0" x2="200" y2="400" stroke="#475569" strokeWidth="1.5" />
                <text x="390" y="195" fill="#94a3b8" fontSize="10" textAnchor="end">x</text>
                <text x="205" y="15" fill="#94a3b8" fontSize="10">y</text>
                <circle cx="200" cy="200" r="3" fill="#94a3b8" />

                {/* VISUALIZER 1 & 2: LINE & PERPENDICULAR DISTANCE */}
                {(currentSlide === 0 || currentSlide === 1) && (
                  <g>
                    {/* Primary Line */}
                    {(() => {
                      const xA = -10;
                      const yA = lineSlope * xA + lineIntercept;
                      const xB = 10;
                      const yB = lineSlope * xB + lineIntercept;
                      return (
                        <line
                          x1={toSvgX(xA)}
                          y1={toSvgY(yA)}
                          x2={toSvgX(xB)}
                          y2={toSvgY(yB)}
                          stroke="#6366f1"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      );
                    })()}

                    {/* Target Tracking Point P(x, y) */}
                    <circle cx={toSvgX(targetPointX)} cy={toSvgY(targetPointY)} r="6" fill="#f59e0b" />
                    <text
                      x={toSvgX(targetPointX) + 8}
                      y={toSvgY(targetPointY) - 8}
                      fill="#f59e0b"
                      fontSize="11"
                      fontWeight="bold"
                    >
                      P({targetPointX}, {targetPointY})
                    </text>

                    {/* Perpendicular Drop Line from P to Line */}
                    {(() => {
                      const m = lineSlope;
                      const c = lineIntercept;
                      const xFoot = (targetPointX + m * (targetPointY - c)) / (1 + m * m);
                      const yFoot = (m * (targetPointX + m * targetPointY) + c) / (1 + m * m);
                      return (
                        <g>
                          <line
                            x1={toSvgX(targetPointX)}
                            y1={toSvgY(targetPointY)}
                            x2={toSvgX(xFoot)}
                            y2={toSvgY(yFoot)}
                            stroke="#ef4444"
                            strokeWidth="2"
                            strokeDasharray="4 3"
                          />
                          <circle cx={toSvgX(xFoot)} cy={toSvgY(yFoot)} r="4" fill="#ef4444" />
                          <text
                            x={toSvgX((targetPointX + xFoot) / 2) + 5}
                            y={toSvgY((targetPointY + yFoot) / 2)}
                            fill="#ef4444"
                            fontSize="10"
                            fontWeight="bold"
                          >
                            d = {linePerpDistance.toFixed(2)}
                          </text>
                        </g>
                      );
                    })()}

                    {/* Normal vector angle arc from origin */}
                    <line x1="200" y1="200" x2={toSvgX(Math.cos((normalFormAlphaDeg * Math.PI) / 180) * 3)} y2={toSvgY(Math.sin((normalFormAlphaDeg * Math.PI) / 180) * 3)} stroke="#10b981" strokeWidth="2" />
                    <text x="210" y="185" fill="#10b981" fontSize="9">α = {normalFormAlphaDeg.toFixed(0)}°</text>
                  </g>
                )}

                {/* VISUALIZER 3: SECTION FORMULA & TRIANGLE */}
                {currentSlide === 2 && (
                  <g>
                    {/* Line segment PQ */}
                    <line x1={toSvgX(1)} y1={toSvgY(1)} x2={toSvgX(7)} y2={toSvgY(7)} stroke="#38bdf8" strokeWidth="3" />
                    <circle cx={toSvgX(1)} cy={toSvgY(1)} r="5" fill="#38bdf8" />
                    <text x={toSvgX(1) - 15} y={toSvgY(1) + 15} fill="#38bdf8" fontSize="10">P(1,1)</text>
                    <circle cx={toSvgX(7)} cy={toSvgY(7)} r="5" fill="#38bdf8" />
                    <text x={toSvgX(7) + 8} y={toSvgY(7)} fill="#38bdf8" fontSize="10">Q(7,7)</text>

                    {/* Dividing Point R */}
                    <circle cx={toSvgX(sectionPoint.x)} cy={toSvgY(sectionPoint.y)} r="7" fill="#f43f5e" />
                    <text
                      x={toSvgX(sectionPoint.x) + 8}
                      y={toSvgY(sectionPoint.y) - 8}
                      fill="#f43f5e"
                      fontSize="11"
                      fontWeight="bold"
                    >
                      R({sectionPoint.x.toFixed(1)}, {sectionPoint.y.toFixed(1)})
                    </text>

                    {/* Right-angled Triangle Incentre Demo */}
                    <polygon
                      points={`${toSvgX(0)},${toSvgY(0)} ${toSvgX(4)},${toSvgY(0)} ${toSvgX(0)},${toSvgY(3)}`}
                      fill="rgba(99, 102, 241, 0.15)"
                      stroke="#818cf8"
                      strokeWidth="2"
                    />
                    <circle cx={toSvgX(1)} cy={toSvgY(1)} r={18 * 1} fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3 2" />
                    <circle cx={toSvgX(1)} cy={toSvgY(1)} r="3" fill="#22c55e" />
                    <text x={toSvgX(1) + 5} y={toSvgY(1) - 5} fill="#22c55e" fontSize="9" fontWeight="bold">Incentre(1,1)</text>
                  </g>
                )}

                {/* VISUALIZER 4: CIRCLE STANDARD & PARAMETRIC */}
                {currentSlide === 3 && (
                  <g>
                    {/* Standard Circle */}
                    <circle
                      cx={toSvgX(circleH)}
                      cy={toSvgY(circleK)}
                      r={circleR * 18}
                      fill="rgba(99, 102, 241, 0.1)"
                      stroke="#6366f1"
                      strokeWidth="2.5"
                    />
                    <circle cx={toSvgX(circleH)} cy={toSvgY(circleK)} r="4" fill="#a855f7" />
                    <text x={toSvgX(circleH) + 6} y={toSvgY(circleK) - 6} fill="#c084fc" fontSize="10">
                      C({circleH}, {circleK})
                    </text>

                    {/* Radius ray to parametric point */}
                    <line
                      x1={toSvgX(circleH)}
                      y1={toSvgY(circleK)}
                      x2={toSvgX(parametricPoint.x)}
                      y2={toSvgY(parametricPoint.y)}
                      stroke="#38bdf8"
                      strokeWidth="2"
                    />
                    <circle cx={toSvgX(parametricPoint.x)} cy={toSvgY(parametricPoint.y)} r="6" fill="#38bdf8" />
                    <text
                      x={toSvgX(parametricPoint.x) + 8}
                      y={toSvgY(parametricPoint.y) - 6}
                      fill="#38bdf8"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      P(θ={circleTheta}°)
                    </text>
                  </g>
                )}

                {/* VISUALIZER 5: CONIC SECTIONS & PARABOLA FOCUS-DIRECTRIX */}
                {currentSlide === 4 && (
                  <g>
                    {/* Directrix x = -parabolaA */}
                    <line
                      x1={toSvgX(-parabolaA)}
                      y1="0"
                      x2={toSvgX(-parabolaA)}
                      y2="400"
                      stroke="#f43f5e"
                      strokeWidth="2"
                      strokeDasharray="5 3"
                    />
                    <text x={toSvgX(-parabolaA) - 8} y="30" fill="#f43f5e" fontSize="10" textAnchor="end">
                      Directrix x = -{parabolaA}
                    </text>

                    {/* Focus S(parabolaA, 0) */}
                    <circle cx={toSvgX(parabolaA)} cy={toSvgY(0)} r="5" fill="#10b981" />
                    <text x={toSvgX(parabolaA) + 6} y={toSvgY(0) - 8} fill="#10b981" fontSize="10" fontWeight="bold">
                      Focus S({parabolaA}, 0)
                    </text>

                    {/* Parabola Curve y² = 4ax => x = y² / (4a) */}
                    <path
                      d={(() => {
                        let pathStr = '';
                        for (let yVal = -8; yVal <= 8; yVal += 0.5) {
                          const xVal = (yVal * yVal) / (4 * parabolaA);
                          const svgX = toSvgX(xVal);
                          const svgY = toSvgY(yVal);
                          if (pathStr === '') pathStr += `M ${svgX} ${svgY}`;
                          else pathStr += ` L ${svgX} ${svgY}`;
                        }
                        return pathStr;
                      })()}
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="3"
                    />

                    {/* Test point P on parabola at (a, 2a) */}
                    {(() => {
                      const pX = parabolaA;
                      const pY = 2 * parabolaA;
                      return (
                        <g>
                          <circle cx={toSvgX(pX)} cy={toSvgY(pY)} r="5" fill="#38bdf8" />
                          <text x={toSvgX(pX) + 8} y={toSvgY(pY)} fill="#38bdf8" fontSize="10">
                            P({pX}, {pY})
                          </text>
                          <line
                            x1={toSvgX(pX)}
                            y1={toSvgY(pY)}
                            x2={toSvgX(parabolaA)}
                            y2={toSvgY(0)}
                            stroke="#10b981"
                            strokeWidth="1.5"
                          />
                          <line
                            x1={toSvgX(pX)}
                            y1={toSvgY(pY)}
                            x2={toSvgX(-parabolaA)}
                            y2={toSvgY(pY)}
                            stroke="#f43f5e"
                            strokeWidth="1.5"
                          />
                          <text x={toSvgX(pX / 2)} y={toSvgY(pY) - 5} fill="#fbbf24" fontSize="9" fontWeight="bold">
                            PS = PL = {2 * parabolaA} (e=1.0)
                          </text>
                        </g>
                      );
                    })()}
                  </g>
                )}
              </svg>
            </div>

            {/* Interactive Control Gauges (5 cols) */}
            <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">
                Real-Time Mathematical Parameters
              </h3>

              {/* Controls for Step 0: Line Forms */}
              {currentSlide === 0 && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400 flex justify-between">
                      <span>Slope (m):</span>
                      <span className="text-indigo-300 font-bold">{lineSlope.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min={-3}
                      max={3}
                      step={0.1}
                      value={lineSlope}
                      onChange={(e) => setLineSlope(parseFloat(e.target.value))}
                      aria-label="Adjust slope of line"
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 flex justify-between">
                      <span>y-Intercept (c):</span>
                      <span className="text-indigo-300 font-bold">{lineIntercept}</span>
                    </label>
                    <input
                      type="range"
                      min={-6}
                      max={6}
                      step={1}
                      value={lineIntercept}
                      onChange={(e) => setLineIntercept(parseInt(e.target.value))}
                      aria-label="Adjust y-intercept of line"
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs">
                    <p className="text-slate-300">
                      <strong>General Form:</strong> {lineSlope.toFixed(2)}x - y + ({lineIntercept}) = 0
                    </p>
                    <p className="text-slate-300">
                      <strong>Slope-Intercept:</strong> y = {lineSlope.toFixed(2)}x + ({lineIntercept})
                    </p>
                    <p className="text-amber-400 font-bold">
                      <strong>Perpendicular Distance from P(2,3):</strong> d = {linePerpDistance.toFixed(3)} units
                    </p>
                    <p className="text-emerald-400">
                      <strong>Normal Form:</strong> x cos({normalFormAlphaDeg.toFixed(0)}°) + y sin({normalFormAlphaDeg.toFixed(0)}°) = {normalFormP.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}

              {/* Controls for Step 1: Parallel Lines & Angle Bisectors */}
              {currentSlide === 1 && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400 flex justify-between">
                      <span>Track 1 Constant (c₁):</span>
                      <span className="text-indigo-300 font-bold">{parallelC1}</span>
                    </label>
                    <input
                      type="range"
                      min={-20}
                      max={20}
                      step={1}
                      value={parallelC1}
                      onChange={(e) => setParallelC1(parseInt(e.target.value))}
                      aria-label="Adjust parallel line constant c1"
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 flex justify-between">
                      <span>Track 2 Constant (c₂):</span>
                      <span className="text-indigo-300 font-bold">{parallelC2}</span>
                    </label>
                    <input
                      type="range"
                      min={-20}
                      max={20}
                      step={1}
                      value={parallelC2}
                      onChange={(e) => setParallelC2(parseInt(e.target.value))}
                      aria-label="Adjust parallel line constant c2"
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-slate-300">
                      <strong>Formula:</strong> d = |c₁ - c₂| / √(a² + b²)
                    </p>
                    <p className="text-emerald-400 font-bold">
                      <strong>Separation Gap:</strong> |{parallelC1} - {parallelC2}| / √(3² + 4²) = {(Math.abs(parallelC1 - parallelC2) / 5).toFixed(2)} units
                    </p>
                  </div>

                  {/* PREDICT-THEN-CHECK */}
                  {!predictionMade && (
                    <div className="p-3 bg-indigo-950/60 rounded-xl border border-indigo-800">
                      <p className="text-xs text-indigo-200 font-bold mb-2">{PREDICTION_QUESTIONS[1].question}</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Predict option ${i + 1}: ${opt}`}
                            className="p-2 text-left bg-slate-900 hover:bg-slate-800 text-slate-200 rounded text-xs border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                  {predictionMade && (
                    <p className="text-xs text-emerald-400 bg-emerald-950/50 p-2 rounded-lg border border-emerald-800">
                      ✓ Prediction registered! Verified gap is 6 units.
                    </p>
                  )}
                </div>
              )}

              {/* Controls for Step 2: Section Formula */}
              {currentSlide === 2 && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsExternalSection(false)}
                      aria-label="Switch to internal division"
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${
                        !isExternalSection ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      Internal (m : n)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsExternalSection(true)}
                      aria-label="Switch to external division"
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${
                        isExternalSection ? 'bg-rose-600 text-white border-rose-400' : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      External (m : n)
                    </motion.button>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 flex justify-between">
                      <span>Ratio Weight m:</span>
                      <span className="text-indigo-300 font-bold">{sectionM}</span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={sectionM}
                      onChange={(e) => setSectionM(parseInt(e.target.value))}
                      aria-label="Adjust ratio weight m"
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 flex justify-between">
                      <span>Ratio Weight n:</span>
                      <span className="text-indigo-300 font-bold">{sectionN}</span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={sectionN}
                      onChange={(e) => setSectionN(parseInt(e.target.value))}
                      aria-label="Adjust ratio weight n"
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-bold">
                      <strong>Point R:</strong> ({sectionPoint.x.toFixed(2)}, {sectionPoint.y.toFixed(2)})
                    </p>
                    <p className="text-slate-400">
                      Formula: (({sectionM}·x₂ {isExternalSection ? '-' : '+'} {sectionN}·x₁) / ({sectionM} {isExternalSection ? '-' : '+'} {sectionN}))
                    </p>
                  </div>
                </div>
              )}

              {/* Controls for Step 3: Circle */}
              {currentSlide === 3 && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400 flex justify-between">
                      <span>Radius (r):</span>
                      <span className="text-indigo-300 font-bold">{circleR}</span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={7}
                      step={0.5}
                      value={circleR}
                      onChange={(e) => setCircleR(parseFloat(e.target.value))}
                      aria-label="Adjust circle radius r"
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 flex justify-between">
                      <span>Parametric Angle (θ):</span>
                      <span className="text-indigo-300 font-bold">{circleTheta}°</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={360}
                      step={5}
                      value={circleTheta}
                      onChange={(e) => setCircleTheta(parseInt(e.target.value))}
                      aria-label="Adjust circle parametric angle theta"
                      className="w-full accent-sky-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-indigo-300">
                      <strong>Standard Form:</strong> (x - {circleH})² + (y - {circleK})² = {(circleR * circleR).toFixed(1)}
                    </p>
                    <p className="text-sky-300">
                      <strong>Parametric Coordinates:</strong> x = {parametricPoint.x.toFixed(2)}, y = {parametricPoint.y.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}

              {/* Controls for Step 4: Conic Sections & Parabola */}
              {currentSlide === 4 && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400 flex justify-between">
                      <span>Focal Parameter (a):</span>
                      <span className="text-amber-400 font-bold">{parabolaA}</span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      step={0.5}
                      value={parabolaA}
                      onChange={(e) => setParabolaA(parseFloat(e.target.value))}
                      aria-label="Adjust focal parameter a of parabola"
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-amber-400 font-bold">
                      <strong>Equation:</strong> y² = 4ax = {4 * parabolaA}x
                    </p>
                    <p className="text-emerald-400">
                      <strong>Focus:</strong> S({parabolaA}, 0)
                    </p>
                    <p className="text-rose-400">
                      <strong>Directrix:</strong> x = -{parabolaA}
                    </p>
                    <p className="text-indigo-300">
                      <strong>Latus Rectum Length:</strong> 4a = {4 * parabolaA} units
                    </p>
                  </div>

                  {/* OBSERVATION QUESTION */}
                  {!observationAnswered && (
                    <div className="p-3 bg-indigo-950/60 rounded-xl border border-indigo-800">
                      <p className="text-xs text-indigo-200 font-bold mb-2">{OBSERVATION_QUESTIONS[1].question}</p>
                      <div className="space-y-1">
                        {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            aria-label={`Select observation ${i + 1}: ${opt}`}
                            className="w-full text-left p-2 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded text-xs border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                  {observationAnswered && (
                    <p className="text-xs text-emerald-400 bg-emerald-950/50 p-2 rounded-lg border border-emerald-800">
                      ��� Mastered! PS = PL defines the parabola with eccentricity e = 1.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">Coordinate Geometry Sandbox (No Pressure)</h2>
              <p className="text-xs text-slate-400">Switch tabs to freely experiment with any geometric structure.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Advance to graded challenge mode"
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/25"
            >
              Ready for Graded Challenges →
            </motion.button>
          </div>

          {/* Sandbox Tab Switcher */}
          <div className="flex gap-2 border-b border-slate-800 pb-2" role="tablist">
            {[
              { id: 'line', label: 'Lines & Distance' },
              { id: 'circle', label: 'Circle Envelope' },
              { id: 'conic', label: 'Parabola & Conics' },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                role="tab"
                aria-selected={selectedToolTab === tab.id}
                aria-label={`Switch to ${tab.label} sandbox view`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedToolTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedToolTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Sandbox Live Grid View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex justify-center items-center">
              <svg viewBox="0 0 400 400" className="w-full max-w-[340px] aspect-square bg-slate-950 rounded-xl border border-slate-800" aria-label="Sandbox interactive Cartesian plot">
                <line x1="0" y1="200" x2="400" y2="200" stroke="#334155" strokeWidth="1.5" />
                <line x1="200" y1="0" x2="200" y2="400" stroke="#334155" strokeWidth="1.5" />
                {selectedToolTab === 'line' && (
                  <line
                    x1={toSvgX(-10)}
                    y1={toSvgY(lineSlope * -10 + lineIntercept)}
                    x2={toSvgX(10)}
                    y2={toSvgY(lineSlope * 10 + lineIntercept)}
                    stroke="#818cf8"
                    strokeWidth="3"
                  />
                )}
                {selectedToolTab === 'circle' && (
                  <circle cx={toSvgX(circleH)} cy={toSvgY(circleK)} r={circleR * 18} fill="rgba(99,102,241,0.2)" stroke="#6366f1" strokeWidth="3" />
                )}
                {selectedToolTab === 'conic' && (
                  <path
                    d={(() => {
                      let str = '';
                      for (let y = -8; y <= 8; y += 0.5) {
                        const x = (y * y) / (4 * parabolaA);
                        str += `${str === '' ? 'M' : 'L'} ${toSvgX(x)} ${toSvgY(y)}`;
                      }
                      return str;
                    })()}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="3"
                  />
                )}
              </svg>
            </div>

            <div className="space-y-4 flex flex-col justify-center">
              {selectedToolTab === 'line' && (
                <>
                  <div>
                    <label className="text-xs text-slate-400">Slope m: {lineSlope}</label>
                    <input type="range" min={-3} max={3} step={0.1} value={lineSlope} onChange={(e) => setLineSlope(parseFloat(e.target.value))} aria-label="Sandbox slope slider" className="w-full accent-indigo-500" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Intercept c: {lineIntercept}</label>
                    <input type="range" min={-5} max={5} value={lineIntercept} onChange={(e) => setLineIntercept(parseInt(e.target.value))} aria-label="Sandbox intercept slider" className="w-full accent-indigo-500" />
                  </div>
                </>
              )}
              {selectedToolTab === 'circle' && (
                <>
                  <div>
                    <label className="text-xs text-slate-400">Radius r: {circleR}</label>
                    <input type="range" min={1} max={7} value={circleR} onChange={(e) => setCircleR(parseFloat(e.target.value))} aria-label="Sandbox circle radius slider" className="w-full accent-indigo-500" />
                  </div>
                </>
              )}
              {selectedToolTab === 'conic' && (
                <>
                  <div>
                    <label className="text-xs text-slate-400">Focal parameter a: {parabolaA}</label>
                    <input type="range" min={1} max={5} step={0.5} value={parabolaA} onChange={(e) => setParabolaA(parseFloat(e.target.value))} aria-label="Sandbox parabola focal parameter slider" className="w-full accent-amber-500" />
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: GRADED CHALLENGES (Adaptive + NEP 2020) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress Bar & Difficulty Indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="uppercase text-indigo-400">Competency: {challenge.competencyLevel}</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/70 border-rose-500' : 'border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                {challenge.difficulty}
              </span>
              <span className="text-xs text-slate-500">Node ID: {challenge.nodeId}</span>
            </div>
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">{challenge.question}</h3>

            {/* MCQ OPTIONS */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => {
                  const isCorrectAnswer = i === challenge.correctIndex;
                  return (
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
                        showExplanation && isCorrectAnswer
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-900/30'
                          : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-bold text-indigo-400 mr-2">
                        {showExplanation && isCorrectAnswer ? '✓ ' : showExplanation ? '✗ ' : `${String.fromCharCode(65 + i)}.`}
                      </span>
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* DRAG-LABEL CHALLENGE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag items to drop targets:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {['target_focus', 'target_directrix', 'target_vertex', 'target_lr'].map((targetId) => (
                    <div
                      key={targetId}
                      role="region"
                      aria-label={`Drop target for ${targetId.replace('target_', '')}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[70px]"
                    >
                      <span className="text-xs text-slate-500 uppercase">{targetId.replace('target_', '')}</span>
                      <span className="text-sm font-bold text-amber-400 mt-1">
                        {droppedLabels[targetId] || '[Drop Target Here]'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Verify diagram label assignments"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/25"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Step ${displayIdx + 1}: ${item}. Drag to reorder.`}
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 hover:bg-slate-750 rounded-xl text-sm text-slate-200 border border-slate-700 cursor-grab flex items-center gap-3"
                    >
                      <span className="font-bold text-indigo-400">{displayIdx + 1}.</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Verify step ordering sequence"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/25"
                >
                  Verify Step Ordering
                </motion.button>
              </div>
            )}

            {/* NUMERIC CHALLENGE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    aria-label={`Enter numerical value in ${challenge.unit || 'units'}`}
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-indigo-500 outline-none w-44"
                  />
                  <span className="text-slate-400 font-bold text-sm">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit numeric calculation"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold disabled:opacity-40"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT CHALLENGE */}
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
                      aria-label={`Add component ${part}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-mono font-bold text-indigo-300 border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[50px] p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-indigo-900 text-white text-xs font-mono rounded flex items-center gap-1">
                      {part}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        aria-label={`Remove component ${part}`}
                        className="text-rose-400 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500 italic">Click pieces above to build equation</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Verify constructed equation formula"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Construction
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-amber-950/40 rounded-xl border border-amber-700/60 space-y-3">
                <h4 className="text-xs font-bold uppercase text-amber-400 tracking-wider">Step-by-Step Mathematical Proof</h4>
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-amber-200 leading-relaxed">
                      <span className="font-bold text-amber-400 mr-1.5">{idx + 1}.</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    aria-label="Show next step of mathematical proof"
                    className="px-3 py-1 bg-amber-800/80 hover:bg-amber-700 text-amber-100 rounded text-xs font-bold"
                  >
                    Show Next Proof Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    aria-label="Proceed to next challenge"
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Laboratory Results →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/80 to-slate-900 rounded-2xl border border-emerald-700/80 shadow-2xl">
            <h2 className="text-2xl font-black text-white mb-1">🎉 Laboratory Mission Complete!</h2>
            
            {/* MOTIVATIONAL FEEDBACK REQUIREMENT */}
            <div className="my-3 p-3 bg-slate-950/90 rounded-xl border border-emerald-500/40">
              <p className="text-xl font-black text-amber-300 tracking-wide">
                {getMotivationalMessage(errors)}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Errors logged: <span className="text-rose-400 font-bold">{errors}</span> • Performance Rate:{' '}
                <span className="text-emerald-400 font-bold">{Math.max(0, 100 - errors * 5)}%</span>
              </p>
            </div>

            <p className="text-slate-300 text-sm mb-4">
              Final Calculated Score: <strong className="text-emerald-400 text-lg">{Math.max(0, 100 - errors * 5)}%</strong> • Adaptive Mastery: <span className="uppercase text-indigo-400 font-bold">{masteryLevel}</span>
            </p>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-xs leading-relaxed text-slate-300">
              {errors === 0
                ? '🌟 FLAWLESS MASTERY! You solved all Cartesian lines, circles, and conic challenges with zero errors!'
                : errors <= 3
                ? '👏 HIGH PROFICIENCY! You demonstrate deep conceptual grasp of ISC coordinate geometry.'
                : '💪 SOLID LEARNING FOUNDATION! Coordinate geometry formulas improve with spaced practice. Review the misconception profile below.'}
            </div>
          </div>

          {/* MISCONCEPTION PROFILE TRACKER */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                Targeted Misconception Diagnostics
              </h3>
              {hitMisconceptions.map((mIdx, i) => {
                const m = misconceptions?.[mIdx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-900/60 text-xs">
                    <p className="text-rose-300 font-bold">✗ {m.misconception}</p>
                    <p className="text-emerald-300 mt-1">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* ─── SPACED REPETITION SCHEDULE (SRS VISIBILITY) ─── */}
          <div className="p-6 bg-gradient-to-r from-indigo-950/70 to-purple-950/70 rounded-2xl border border-indigo-700/80 shadow-lg space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl" aria-hidden="true">📅</span>
                <div>
                  <h3 className="text-base font-black text-white tracking-wide">
                    Spaced Repetition Schedule (SM-2 Learning System)
                  </h3>
                  <p className="text-xs text-indigo-300">
                    Optimized memory consolidation intervals for long-term retention
                  </p>
                </div>
              </div>
              <div className="px-3 py-1 bg-indigo-900/80 rounded-full border border-indigo-500/50 text-xs font-bold text-indigo-200">
                {errors === 0 ? 'Optimal Memory Phase' : errors <= 3 ? 'Reinforcement Phase' : 'Active Recall Phase'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className={`p-3 rounded-xl border flex flex-col justify-between ${
                errors === 0 ? 'bg-indigo-900/40 border-indigo-400 shadow-md ring-1 ring-indigo-400/50' : 'bg-slate-950/60 border-slate-800 opacity-60'
              }`}>
                <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>0 Errors (Mastery)</span>
                  {errors === 0 && <span className="text-emerald-400 font-bold">● Your Path</span>}
                </div>
                <div className="mt-2">
                  <span className="text-lg font-black text-white">review in 7 days</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">High synaptic retention</p>
                </div>
              </div>

              <div className={`p-3 rounded-xl border flex flex-col justify-between ${
                errors >= 1 && errors <= 3 ? 'bg-indigo-900/40 border-indigo-400 shadow-md ring-1 ring-indigo-400/50' : 'bg-slate-950/60 border-slate-800 opacity-60'
              }`}>
                <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>1–3 Errors (Proficient)</span>
                  {errors >= 1 && errors <= 3 && <span className="text-amber-400 font-bold">● Your Path</span>}
                </div>
                <div className="mt-2">
                  <span className="text-lg font-black text-white">review in 3 days</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Consolidate core formulas</p>
                </div>
              </div>

              <div className={`p-3 rounded-xl border flex flex-col justify-between ${
                errors >= 4 ? 'bg-indigo-900/40 border-indigo-400 shadow-md ring-1 ring-indigo-400/50' : 'bg-slate-950/60 border-slate-800 opacity-60'
              }`}>
                <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>4+ Errors (Review Needed)</span>
                  {errors >= 4 && <span className="text-rose-400 font-bold">● Your Path</span>}
                </div>
                <div className="mt-2">
                  <span className="text-lg font-black text-white">review in 1 day</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Immediate concept refresh</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-indigo-900/60 text-xs text-indigo-200 flex items-center justify-between">
              <span>
                🎯 <strong>Recommended Next Review:</strong>{' '}
                <strong className="text-amber-300 uppercase">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </strong>
              </span>
              <span className="text-slate-400 text-[11px]">Next SRS Session Auto-Scheduled</span>
            </div>
          </div>

          {/* REAL-WORLD ACTIVITY COMPLETION */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((s, idx) => (
                <li key={idx}>✓ {s}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_MathematicsVariousFormsEquationSim;
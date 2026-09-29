'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C6_MATH_041 = 'c6_math_041';
const NODE_C6_MATH_042 = 'c6_math_042';
const NODE_C6_MATH_043 = 'c6_math_043';
const NODE_C6_MATH_044 = 'c6_math_044';
const NODE_C6_MATH_045 = 'c6_math_045';
const NODE_C6_MATH_046 = 'c6_math_046';
const NODE_C6_MATH_047 = 'c6_math_047';
const NODE_C6_MATH_048 = 'c6_math_048';
const NODE_C6_MATH_049 = 'c6_math_049';
const NODE_C6_MATH_050 = 'c6_math_050';

const ALL_NODE_IDS = [
  NODE_C6_MATH_041,
  NODE_C6_MATH_042,
  NODE_C6_MATH_043,
  NODE_C6_MATH_044,
  NODE_C6_MATH_045,
  NODE_C6_MATH_046,
  NODE_C6_MATH_047,
  NODE_C6_MATH_048,
  NODE_C6_MATH_049,
  NODE_C6_MATH_050,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Indian Math Carnival',
  intro: 'You are the chief architect of the Jaipur Math Fair! To get the rides running, stalls discounted fairly, train tracks aligned, and geometric stage setups ready, you must master percentages, speed calculations, algebraic equations, and 2D geometry.',
  context: 'Thousands of students are arriving. Build interactive grids, balance mystery scales, calculate express speeds, and construct polynomial banners!',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'At the Carnival ticket stall, Section A gives 17 passes out of 20, while Section B gives 42 passes out of 50. Which stall had a higher pass rate?',
  options: [
    'Section B — because 42 is much larger than 17',
    'Section A — because 17/20 is 85%, whereas 42/50 is only 84%',
    'Both gave the exact same rate',
    'It is impossible to compare tests with different maximum totals',
  ],
  correctIndex: 1,
  hintAfter: 'Raw counts can deceive! Converting fractions to a standard base of 100 (percent) makes any comparison fair and instant.',
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

// ─── 24 CHALLENGES ARRAY ACROSS ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  // Foundation (1-8)
  {
    id: 'ch_01_pct_def',
    nodeId: NODE_C6_MATH_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What does the term "percent" literally mean from its Latin root "per centum"?',
    options: ['Per thousand (out of 1000)', 'Per hundred (out of 100)', 'Divided by ten', 'One part of any total'],
    correctIndex: 1,
    explanation: '"Percent" comes from Latin "per centum", meaning "out of every hundred". Thus 40% is simply 40/100.',
    hints: [
      'Think of "century" or "cent" in money — how many years or units are there?',
      'Centum refers to the number 100.',
      'Percent literally translates to "per hundred", with a fixed denominator of 100.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_pct_simplest',
    nodeId: NODE_C6_MATH_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Express 40% as a fraction in its simplest (lowest) form.',
    options: ['40/100', '4/10', '2/5', '1/4'],
    correctIndex: 2,
    explanation: '40% = 40/100. Dividing both numerator and denominator by their greatest common divisor (20) gives 2/5.',
    hints: [
      'First write 40% as 40/100.',
      'Now divide both top and bottom by 10 to get 4/10.',
      'Can you reduce 4/10 further by dividing top and bottom by 2? You get 2/5.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_03_speed_formula',
    nodeId: NODE_C6_MATH_042,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following correctly states the primary relationship between speed (s), distance (d), and time (t)?',
    options: ['Speed = Distance × Time', 'Speed = Distance / Time', 'Speed = Time / Distance', 'Speed = Distance + Time'],
    correctIndex: 1,
    explanation: 'Speed is distance covered per unit time: Speed = Distance / Time. By rearranging: Distance = Speed × Time, and Time = Distance / Speed.',
    hints: [
      'Think about units: km/h is kilometres per hour (distance divided by time).',
      'If you cover 100 km in 2 hours, your rate is 50 km in 1 hour.',
      'Speed = Distance / Time.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_04_constant_var',
    nodeId: NODE_C6_MATH_043,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In the algebraic expression 2n, which part is the constant and which is the variable?',
    options: ['2 is the variable, n is the constant', 'Both 2 and n are variables', '2 is the constant, n is the variable', 'Neither is a constant'],
    correctIndex: 2,
    explanation: '2 is a fixed number that never changes (constant), whereas n is a literal letter that can take any natural number (variable).',
    hints: [
      'Constants remain fixed in value.',
      'Variables can vary or take different values.',
      '2 always doubles whatever input you feed in; n changes.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_05_algebra_terms',
    nodeId: NODE_C6_MATH_046,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In the expression 3x + 5y - 7, what is the numerical coefficient of the third term?',
    options: ['7', '-7', '5', '+3'],
    correctIndex: 1,
    explanation: 'The plus and minus signs belong to the terms immediately following them. Thus the third term is -7, and its coefficient is -7.',
    hints: [
      'Look at the sign right in front of the number 7.',
      'Minus signs belong to the term they precede.',
      'The third term is -7, so its numerical value/coefficient is -7.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_06_geometry_circle',
    nodeId: NODE_C6_MATH_050,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How many straight sides and corners (vertices) does a geometric circle have?',
    options: ['1 straight side, 0 corners', '0 straight sides, 0 corners (1 continuous curved boundary)', '4 straight sides, 4 corners', 'Infinite straight sides, infinite corners'],
    correctIndex: 1,
    explanation: 'In 2-D geometry, a "side" refers to a straight line segment. A circle is formed by a single smooth curved boundary and possesses 0 straight sides and 0 corners.',
    hints: [
      'Does a coin or round dinner plate have any sharp corners?',
      'Does a circle have straight line segments?',
      'A circle is bounded by a curve, so it has 0 straight sides and 0 corners.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_07_drag_geometry',
    nodeId: NODE_C6_MATH_050,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Label the 2-D geometric figures to identify their corner counts.',
    dragItems: [
      { label: 'Triangle (3 Corners)', targetId: 'geom_tri' },
      { label: 'Square (4 Equal Sides)', targetId: 'geom_sq' },
      { label: 'Rectangle (4 Corners, Opp Sides =)', targetId: 'geom_rect' },
      { label: 'Circle (0 Corners, Curved)', targetId: 'geom_circ' },
    ],
    correctMapping: {
      geom_tri: 'Triangle (3 Corners)',
      geom_sq: 'Square (4 Equal Sides)',
      geom_rect: 'Rectangle (4 Corners, Opp Sides =)',
      geom_circ: 'Circle (0 Corners, Curved)',
    },
    explanation: 'Triangles have 3 straight edges & 3 vertices; Squares & Rectangles have 4 vertices; Circles have 0 corners with a continuous smooth curve.',
    hints: [
      'Match the 3-sided figure to the Triangle.',
      'Match the shape with all 4 equal sides to the Square.',
      'Match the smooth round figure to the Circle.',
    ],
  },
  {
    id: 'ch_08_decimal_to_percent',
    nodeId: NODE_C6_MATH_041,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Convert the decimal 0.65 into a percentage.',
    correctAnswer: 65,
    tolerance: 0,
    unit: '%',
    explanation: 'To convert a decimal to a percentage, multiply by 100: 0.65 × 100 = 65%.',
    hints: [
      'Percent means "per hundred".',
      'Shift the decimal point two places to the right.',
      '0.65 × 100 = 65%.',
    ],
  },

  // Standard (9-16)
  {
    id: 'ch_09_pattern_odd',
    nodeId: NODE_C6_MATH_044,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which compact algebraic expression generates the odd numbers 1, 3, 5, 7, 9, ... for n = 1, 2, 3, 4, 5, ...?',
    options: ['n + 1', '2n + 1', '2n - 1', 'n^2'],
    correctIndex: 2,
    explanation: 'Even numbers are 2n. Odd numbers are one less than the matching even numbers: 2(1)-1=1, 2(2)-1=3, 2(3)-1=5. Hence 2n - 1.',
    hints: [
      'Test n = 1: which expression gives 1?',
      '2n + 1 gives 3 when n=1. That misses 1!',
      '2(1) - 1 = 1, 2(2) - 1 = 3, 2(3) - 1 = 5. So 2n - 1 is correct.',
    ],
  },
  {
    id: 'ch_10_speed_calc',
    nodeId: NODE_C6_MATH_042,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The Jaipur Express travels 240 km in 4 hours at a uniform speed. What is its speed in km/h?',
    correctAnswer: 60,
    tolerance: 0,
    unit: 'km/h',
    explanation: 'Speed = Distance / Time = 240 km / 4 h = 60 km/h.',
    hints: [
      'Use the formula: Speed = Distance / Time.',
      'Distance = 240, Time = 4.',
      'Compute 240 divided by 4.',
    ],
  },
  {
    id: 'ch_11_framing_sub',
    nodeId: NODE_C6_MATH_047,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How should the English phrase "7 less than twice a number p" be correctly framed in algebra?',
    options: ['7 - 2p', '2p - 7', '2(p - 7)', '7 / 2p'],
    correctIndex: 1,
    explanation: '"Twice a number p" is 2p. "7 less than" that quantity means starting from 2p and taking 7 away: 2p - 7. Subtraction is not commutative!',
    hints: [
      'Identify what quantity you are starting with: "twice p" is 2p.',
      '"7 less than X" means X - 7, not 7 - X.',
      'Therefore, the expression is 2p - 7.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_12_eval_bodmas',
    nodeId: NODE_C6_MATH_048,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Evaluate the algebraic expression 3(x + 4) when x = 2.',
    correctAnswer: 18,
    tolerance: 0,
    unit: '',
    explanation: 'Follow BODMAS: evaluate inside brackets first: (2 + 4) = 6. Then multiply: 3 × 6 = 18.',
    hints: [
      'Substitute x = 2 into the bracket: 3(2 + 4).',
      'According to BODMAS, clear brackets first: 2 + 4 = 6.',
      'Multiply 3 × 6 = 18.',
    ],
    misconceptionIndex: 8,
  },
  {
    id: 'ch_13_equation_solve',
    nodeId: NODE_C6_MATH_045,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Solve for y in the single-operation equation: 4y = 28.',
    correctAnswer: 7,
    tolerance: 0,
    unit: '',
    explanation: 'The operation acting on y is multiplication by 4. Apply the inverse operation (division): y = 28 / 4 = 7.',
    hints: [
      '4y means 4 multiplied by y.',
      'To undo multiplication, divide both sides by 4.',
      '28 / 4 = 7.',
    ],
  },
  {
    id: 'ch_14_drag_sort_steps',
    nodeId: NODE_C6_MATH_049,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the logical steps to solve the linear equation 2p - 4 = 10 using inverse operations.',
    sortItems: [
      'Identify that 2 is multiplied and 4 is subtracted from p',
      'Add 4 to both sides: 2p - 4 + 4 = 10 + 4, giving 2p = 14',
      'Divide both sides by 2: 2p / 2 = 14 / 2, giving p = 7',
      'Verify by substitution: LHS = 2(7) - 4 = 14 - 4 = 10 = RHS',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Unwrap the outer operation first (add 4), then undo multiplication (divide by 2), and finally verify by substitution.',
    hints: [
      'First identify the structure and operations.',
      'Undo the subtraction (-4) before dividing by 2.',
      'Always finish with the verification check LHS = RHS.',
    ],
  },
  {
    id: 'ch_15_like_unlike',
    nodeId: NODE_C6_MATH_046,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why are 4x^2 and 4x considered UNLIKE terms even though they both contain the variable x?',
    options: [
      'Because they have different numerical coefficients',
      'Because their literal parts have different powers (exponents 2 vs 1)',
      'Because they are separated by an equals sign',
      'They are actually like terms',
    ],
    correctIndex: 1,
    explanation: 'Like terms must have identical literal parts, which includes matching exponents. x^2 has degree 2, while x has degree 1.',
    hints: [
      'Look at the exponent of x in both terms.',
      '4x^2 is 4 · x · x, while 4x is 4 · x.',
      'Since the powers differ, they cannot be combined as like terms.',
    ],
    misconceptionIndex: 9,
  },
  {
    id: 'ch_16_avg_speed',
    nodeId: NODE_C6_MATH_042,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A bus travels 60 km at 30 km/h and then 60 km at 60 km/h. What is the average speed for the entire 120 km journey?',
    options: ['45 km/h (arithmetic average)', '40 km/h (total distance / total time)', '50 km/h', '35 km/h'],
    correctIndex: 1,
    explanation: 'Time 1 = 60/30 = 2 h. Time 2 = 60/60 = 1 h. Total time = 3 h. Total distance = 120 km. Average speed = 120 / 3 = 40 km/h. Never average the speeds directly!',
    hints: [
      'Calculate time taken for the first 60 km: 60/30 = 2 hours.',
      'Calculate time taken for the second 60 km: 60/60 = 1 hour.',
      'Average speed = Total Distance (120 km) / Total Time (3 h) = 40 km/h.',
    ],
    misconceptionIndex: 5,
  },

  // Advanced (17-24)
  {
    id: 'ch_17_discount_app',
    nodeId: NODE_C6_MATH_041,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A tent at the Math Carnival is marked at Rs 400 with a 25% discount. What is the final price in Rupees paid by the customer?',
    correctAnswer: 300,
    tolerance: 0,
    unit: 'Rs',
    explanation: '25% discount on Rs 400 = (25/100) × 400 = Rs 100. Final Price = 400 - 100 = Rs 300 (or 75% of 400 = 300).',
    hints: [
      '25% means 25/100 = 1/4.',
      'Find 1/4 of Rs 400 = Rs 100 discount.',
      'Subtract discount: Rs 400 - Rs 100 = Rs 300.',
    ],
  },
  {
    id: 'ch_18_construct_poly',
    nodeId: NODE_C6_MATH_046,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct a trinomial of degree 2 by picking and assembling the correct algebraic tokens in standard order.',
    availableParts: ['4x^2', '+ 3x', '- 5', '+ 2x^3', '= 0'],
    targetState: '4x^2 + 3x - 5',
    validationHint: 'A degree-2 trinomial has 3 terms with highest power 2 (do not include equation "= 0" or degree 3 terms).',
    explanation: '4x^2 + 3x - 5 has exactly three terms (trinomial) and the highest exponent of x is 2 (degree 2). Including "= 0" would make it an equation!',
    hints: [
      'Pick the quadratic term: 4x^2.',
      'Add the linear term (+ 3x) and constant term (- 5).',
      'Do not include "= 0" (that makes it an equation) or "+ 2x^3" (that makes degree 3).',
    ],
  },
  {
    id: 'ch_19_square_pattern',
    nodeId: NODE_C6_MATH_043,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Given the pattern: 1 = 1^2, 1+3 = 4 = 2^2, 1+3+5 = 9 = 3^2, ... What is the sum of the first 15 odd numbers?',
    correctAnswer: 225,
    tolerance: 0,
    unit: '',
    explanation: 'The sum of the first n odd numbers is generalised as n^2. For n = 15: 15^2 = 15 × 15 = 225.',
    hints: [
      'Recall the generalisation: Sum of first n odd numbers = n^2.',
      'Here n = 15.',
      'Compute 15 squared (15 × 15 = 225).',
    ],
  },
  {
    id: 'ch_20_speed_conversion',
    nodeId: NODE_C6_MATH_042,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Convert a train speed of 72 km/h into metres per second (m/s). (Hint: 1 km/h = 5/18 m/s).',
    correctAnswer: 20,
    tolerance: 0,
    unit: 'm/s',
    explanation: 'To convert km/h to m/s, multiply by 5/18: 72 × (5/18) = 4 × 5 = 20 m/s.',
    hints: [
      '1 km = 1000 m, 1 hour = 3600 s; 1000/3600 simplifies to 5/18.',
      'Multiply 72 by 5/18.',
      '72 divided by 18 is 4; 4 × 5 = 20 m/s.',
    ],
  },
  {
    id: 'ch_21_eval_two_var',
    nodeId: NODE_C6_MATH_048,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'If a = 3 and b = 7, evaluate 2a^2 + 3b - 5.',
    correctAnswer: 34,
    tolerance: 0,
    unit: '',
    explanation: 'Substitute: 2(3^2) + 3(7) - 5 = 2(9) + 21 - 5 = 18 + 21 - 5 = 39 - 5 = 34.',
    hints: [
      'Handle powers first: 3^2 = 9.',
      'Multiply: 2(9) = 18, and 3(7) = 21.',
      'Combine: 18 + 21 - 5 = 34.',
    ],
  },
  {
    id: 'ch_22_expression_vs_equation',
    nodeId: NODE_C6_MATH_049,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Which of the following is the defining property that separates a linear equation from an algebraic expression?',
    options: [
      'An equation contains variables, while an expression contains only numbers',
      'An equation contains an equality sign (=) asserting balance, which can be solved for a specific root',
      'An expression has a degree, while an equation does not',
      'An equation always has at least three terms',
    ],
    correctIndex: 1,
    explanation: 'An expression (e.g. 2x + 3) makes no statement of equality. An equation (2x + 3 = 11) asserts equality and asks for the unique value of x satisfying the balance.',
    hints: [
      'Look for the equality sign (=).',
      'Can you "solve" 2x + 3 without an equals sign?',
      'The equality sign turns a phrase into a balanced sentence with a root.',
    ],
  },
  {
    id: 'ch_23_plane_reasoning',
    nodeId: NODE_C6_MATH_050,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is the flat top of a study table considered a model of a geometric plane, while the surface of a cricket ball is not?',
    options: [
      'Because the table is made of wood and the ball is made of leather',
      'Because a plane is flat with only length and breadth (2-D), while a ball has a 3-D curved surface',
      'Because tables have 4 corners and balls have none',
      'Both are actually geometric planes',
    ],
    correctIndex: 1,
    explanation: 'A geometric plane is a flat, smooth 2-D surface extending endlessly in two dimensions. Curved surfaces like spheres bulge in 3D and cannot lie flat.',
    hints: [
      'What happens if you try to lay a flat sheet of paper on a ball without creasing?',
      'Flatness is the essential feature of a 2-D plane.',
      'The table top is flat (2-D); the ball is curved in 3-D space.',
    ],
  },
  {
    id: 'ch_24_two_step_eqn',
    nodeId: NODE_C6_MATH_049,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Solve for m in the equation: 3m + 5 = 26.',
    correctAnswer: 7,
    tolerance: 0,
    unit: '',
    explanation: 'First subtract 5 from both sides: 3m = 21. Then divide both sides by 3: m = 7.',
    hints: [
      'Undo addition first: 26 - 5 = 21.',
      'Now 3m = 21.',
      'Divide 21 by 3 to find m = 7.',
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
  nodeId: NODE_C6_MATH_041,
  title: 'Percentages, Speed, Algebra & Geometry Foundation',
  definition: 'Percent is a special ratio with 100 as denominator. Linear equations use inverse operations to preserve balance. Algebra captures infinite patterns into compact generalisations.',
  eli5: 'Percent means "out of 100". Equations are balanced see-saws where you unwrap mystery boxes using inverse math moves.',
  misconceptions: [
    { misconception: '40% and 40/100 are different quantities', correction: 'They are identical values written in different formats. The % sign literally means /100.' },
    { misconception: 'To convert decimal 0.6 to percent, divide by 100 to get 0.6%', correction: 'Multiply by 100: 0.6 × 100 = 60%. Shifting two places right.' },
    { misconception: '75% in simplest form is 75/100', correction: 'It must be reduced to lowest terms: 75/100 = 3/4.' },
    { misconception: 'In 3x + 5y - 7, the coefficient of the third term is 7', correction: 'The sign belongs to the term: the coefficient is -7.' },
    { misconception: 'In 2n, both 2 and n are variables', correction: '2 is a fixed constant; only n is the variable.' },
    { misconception: 'Average speed is the arithmetic average of two speeds: (v1+v2)/2', correction: 'Average speed = Total Distance / Total Time.' },
    { misconception: 'A circle has 1 straight side', correction: 'A circle has 0 straight sides and 0 corners; it is a single continuous curved boundary.' },
    { misconception: '"7 less than 2p" is written as 7 - 2p', correction: 'It is 2p - 7. Subtraction order matters!' },
    { misconception: '4x^2 and 4x are like terms because both have x', correction: 'Like terms require identical variable powers. Exponents 2 and 1 are different.' },
    { misconception: '2x + 3 is a linear equation', correction: '2x + 3 is an algebraic expression. It needs an "=" sign to become an equation.' },
  ],
  diagnosticQuestions: [
    { question: 'What does 25% mean as a simplified fraction?', options: ['25/10', '1/4', '1/25', '2/5'], correctIndex: 1 },
    { question: 'If a car travels 180 km in 3 hours, what is its uniform speed?', options: ['60 km/h', '540 km/h', '183 km/h', '50 km/h'], correctIndex: 0 },
    { question: 'What is the sum of the first 4 odd numbers (1+3+5+7)?', options: ['12', '16 (4^2)', '15', '20'], correctIndex: 1 },
    { question: 'Solve x + 7 = 15:', options: ['x = 22', 'x = 8', 'x = 105', 'x = 7'], correctIndex: 1 },
    { question: 'In 6xy, what is the numerical coefficient?', options: ['x', 'y', '6', 'xy'], correctIndex: 2 },
    { question: 'Frame: "5 more than thrice a number y":', options: ['5y + 3', '3y + 5', '3(y + 5)', 'y/3 + 5'], correctIndex: 1 },
    { question: 'Evaluate 2x^2 for x = 3:', options: ['12', '18', '36', '8'], correctIndex: 1 },
    { question: 'Which shape has 3 straight sides and 3 corners?', options: ['Square', 'Triangle', 'Circle', 'Rectangle'], correctIndex: 1 },
  ],
  masteryCriteria: 'Master percent conversions, speed/time/distance unitary calculations, variable generalisations, expression evaluation, linear balance, and basic 2-D geometry.',
};

// ─── 6 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The 100-Grid Percent Visualizer',
    instruction: 'Drag the slider to color the 100-square grid. Observe how Percent, Fraction, and Decimal represent the EXACT same portion!',
    interactionType: 'slider-grid',
    nodeId: NODE_C6_MATH_041,
  },
  {
    title: '2. Speed, Distance & Time Runner',
    instruction: 'Adjust the distance and time sliders. Watch the runner sprint across the stadium track and observe how speed updates in real-time!',
    interactionType: 'runner-sim',
    nodeId: NODE_C6_MATH_042,
  },
  {
    title: '3. Pattern Generaliser (Odd Numbers & Squares)',
    instruction: 'Click on the staircase layers to add odd numbers (1, 3, 5, 7...). Discover how they magically assemble into perfect squares (n²)!',
    interactionType: 'pattern-builder',
    nodeId: NODE_C6_MATH_043,
  },
  {
    title: '4. The Balance Scale Equation Solver',
    instruction: 'Add or remove weights from both pans to isolate the mystery box x. Maintain perfect balance to find the root!',
    interactionType: 'balance-scale',
    nodeId: NODE_C6_MATH_049,
  },
  {
    title: '5. 2-D Shape Property Inspector',
    instruction: 'Click each geometric shape (Triangle, Rectangle, Square, Circle) to reveal its sides, vertices, and real-life models!',
    interactionType: 'shape-inspector',
    nodeId: NODE_C6_MATH_050,
  },
  {
    title: '6. Unitary Speed & Ratio Converter',
    instruction: 'Convert km/h directly into m/s and inspect the conversion constant (5/18) derived from 1000m / 3600s.',
    interactionType: 'ratio-converter',
    nodeId: NODE_C6_MATH_042,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you shade 25 squares out of 100 on the grid, what simplified fraction does it create?',
    options: ['1/2 (half the grid)', '1/4 (one quarter of the grid)', '1/5 (one fifth of the grid)', '2/5'],
    correctIndex: 1,
    verifyInstruction: 'Drag the percent slider to 25% and look at the simplified fraction gauge.',
    nodeId: NODE_C6_MATH_041,
  },
  {
    question: 'Predict: If a train doubles its speed while distance remains constant, what happens to the travel time?',
    options: ['Time doubles', 'Time stays unchanged', 'Time is halved', 'Time becomes zero'],
    correctIndex: 2,
    verifyInstruction: 'Double the speed in the Runner Sim and observe the total elapsed time clock.',
    nodeId: NODE_C6_MATH_042,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the relation between odd number sum and the grid shape?',
    observableOptions: [
      'Adding consecutive odd numbers always forms an L-layer that expands a square of side n',
      'Odd sums form irregular triangular blobs',
      'The sum becomes an even number only when n is 10',
      'There is no visual pattern',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_MATH_043,
  },
  {
    question: 'What happens to the balance scale if you subtract 5 from only the left pan?',
    observableOptions: [
      'The scale stays perfectly level',
      'The scale tilts immediately because the balance of equality is broken',
      'The right side automatically decreases by 5',
      'The mystery box multiplies by 5',
    ],
    correctIndex: 1,
    nodeId: NODE_C6_MATH_049,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Design Your Own School Sports Day Tracker',
  description: 'Apply your math powers to plan an athletic meet! Calculate running speeds of 100m runners, compute the win percentage of your house team, and write an algebraic equation for ticket revenue.',
  steps: [
    'Measure the time taken by 3 friends to run 60 metres. Calculate their speed in m/s and km/h.',
    'Create a 100-grid chart to show the percentage of students participating in each sport.',
    'Frame an expression for ticket sales: Rs 50 per student ticket (s) and Rs 100 per adult ticket (a).',
    'Verify that 50s + 100a equals total collections for s=20 and a=10.',
  ],
};

// ─── REFLECTION QUESTIONS ───
const REFLECTION_QUESTIONS = [
  {
    id: 'ref_1',
    prompt: 'What was the most surprising thing you learned?',
    sampleAnswer: 'How consecutive odd numbers (1, 3, 5, 7...) naturally assemble into square shapes (n²), or how average speed is NOT just the arithmetic average of two speeds!',
  },
  {
    id: 'ref_2',
    prompt: 'How would you explain this to a friend?',
    sampleAnswer: 'Percentages are just fractions with a fixed denominator of 100, and equations are balanced see-saws where whatever you do to one side, you must do to the other.',
  },
  {
    id: 'ref_3',
    prompt: 'Where in real life might you use this?',
    sampleAnswer: 'Calculating discounts during shopping sales, planning travel times for road trips, and budgeting money for carnival stalls.',
  },
];

// ─── HELPER FOR FRACTION REDUCTION ───
function reduceFraction(num: number, den: number): string {
  if (num === 0) return '0';
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const common = gcd(num, den);
  const n = num / common;
  const d = den / common;
  return d === 1 ? `${n}` : `${n}/${d}`;
}

// ─── MAIN COMPONENT ───
function C6_MathematicsIdeaPercentFractionSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['mathematics'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant-style discovery & prediction state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration & Sandbox States
  const [percentSlider, setPercentSlider] = useState(40);
  const [distanceVal, setDistanceVal] = useState(120);
  const [timeVal, setTimeVal] = useState(2);
  const [runnerPos, setRunnerPos] = useState(0);
  const [isRunnerActive, setIsRunnerActive] = useState(false);
  const [patternN, setPatternN] = useState(3);
  const [scaleBoxX, setScaleBoxX] = useState(8);
  const [scaleConstant, setScaleConstant] = useState(7);
  const [selectedShape, setSelectedShape] = useState<'triangle' | 'rectangle' | 'square' | 'circle'>('triangle');
  const [exprVarX, setExprVarX] = useState(4);
  const [exprVarY, setExprVarY] = useState(3);
  const [converterKmh, setConverterKmh] = useState(72);

  // Reflection responses state
  const [reflectionResponses, setReflectionResponses] = useState<Record<string, string>>({});
  const [showReflectionHelp, setShowReflectionHelp] = useState<Record<string, boolean>>({});

  // Difficulty & BKT
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints & progressive disclosure
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag & Sort & Construct states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Misconception tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Adaptive difficulty filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT adaptive difficulty effect
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Runner animation effect
  useEffect(() => {
    let animId: number;
    if (isRunnerActive) {
      const startTime = Date.now();
      const duration = (timeVal * 1000) / 2;
      const loop = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(1, elapsed / duration);
        setRunnerPos(progress * 100);
        if (progress < 1) {
          animId = requestAnimationFrame(loop);
        } else {
          setIsRunnerActive(false);
          audioManager.play('chime');
        }
      };
      animId = requestAnimationFrame(loop);
    }
    return () => cancelAnimationFrame(animId);
  }, [isRunnerActive, timeVal]);

  // Canvas particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#6366f1';
      ctx.font = '12px sans-serif';
      ctx.fillText(`Math Carnival Station Active • Lab Step ${currentSlide + 1}`, 10, 18);
      const r = 4 + Math.sin(frame * 0.08) * 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 20, 14, r, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [currentSlide]);

  // Escalating hints handler
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

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Discovery answer handler
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive Math Discovery Lab! Touch, drag, and experiment.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with values with zero pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Mode activated. Test your understanding across all concepts!');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now slide the controller to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Brilliant observation!' : 'Look closer at how the visual shifts.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered the Grade 6 Mathematics Foundations!');
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
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

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
      let arr = prev.length === challenge.sortItems?.length ? [...prev] : challenge.sortItems?.map((_, i) => i) || [];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
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

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent reasoning.');
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
        speechManager.speak('Let us review the complete step-by-step method.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleTriggerRunner = useCallback(() => {
    setRunnerPos(0);
    setIsRunnerActive(true);
    audioManager.play('swoop');
  }, []);

  const handleBalanceAdjust = useCallback((delta: number) => {
    setScaleBoxX(prev => Math.max(1, prev + delta));
    audioManager.play('balance');
  }, []);

  const handleShapeSelect = useCallback((shape: 'triangle' | 'rectangle' | 'square' | 'circle') => {
    setSelectedShape(shape);
    audioManager.play('tap');
    const shapeSpeech: Record<string, string> = {
      triangle: 'Triangle: 3 straight sides, 3 corners!',
      rectangle: 'Rectangle: 4 straight sides, opposite sides equal, 4 right angles!',
      square: 'Square: 4 equal sides, 4 right angles!',
      circle: 'Circle: Continuous smooth curved boundary, 0 corners!',
    };
    speechManager.speak(shapeSpeech[shape] || '');
  }, []);

  const handleReflectionChange = useCallback((id: string, val: string) => {
    setReflectionResponses(prev => ({ ...prev, [id]: val }));
  }, []);

  const toggleReflectionHelp = useCallback((id: string) => {
    setShowReflectionHelp(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gold-600/30 flex items-center justify-center text-2xl border border-gold-500/30"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs sm:text-sm text-gold-400 font-medium">ICSE Class 6 Mathematics • Multi-Node Core Sim</p>
          </div>
        </div>

        {/* Phase Pill / Difficulty Badge */}
        <div className="flex items-center gap-2">
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                difficulty === 'standard' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}
            >
              {difficulty} Level
            </motion.span>
          )}
          <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded-full border border-slate-700">
            {phase.toUpperCase()}
          </span>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY (Curiosity Hook) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 sm:p-6 bg-gradient-to-br from-gold-950/80 to-slate-900 rounded-2xl border border-gold-800/60 shadow-lg">
            <div className="flex items-center gap-2 text-gold-400 text-sm font-bold mb-2">
              <span>🎪</span>
              <span>SCENARIO INTRO</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs sm:text-sm text-gold-300/80 mt-2 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>🔍</span>
              <span>Discovery Probe (Not Graded)</span>
            </div>
            <p className="text-base sm:text-lg font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/40 text-slate-500 border border-slate-800'
                      : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/60'
                  }`}
                >
                  <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Fantastic intuition! 17/20 = 85%, which beats 42/50 = 84%.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-gold-600/30 flex items-center gap-2 whitespace-nowrap"
                >
                  <span>Enter Discovery Lab</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <canvas ref={canvasRef} width={400} height={28} className="w-full rounded-lg bg-slate-900 border border-slate-800" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 sm:p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-black text-gold-300">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <span className="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
              </div>
              <p className="text-amber-300 text-sm font-medium bg-amber-950/30 p-3 rounded-xl border border-amber-800/40">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* SLIDE 0: 100-GRID PERCENT VISUALIZER */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
                  <div className="flex flex-col items-center">
                    <svg viewBox="0 0 200 200" className="w-56 h-56 bg-slate-950 p-2 rounded-2xl border border-slate-800 shadow-inner">
                      {Array.from({ length: 100 }).map((_, i) => {
                        const row = Math.floor(i / 10);
                        const col = i % 10;
                        const isFilled = i < percentSlider;
                        return (
                          <rect
                            key={i}
                            x={col * 19 + 5}
                            y={row * 19 + 5}
                            width="16"
                            height="16"
                            rx="2"
                            fill={isFilled ? '#6366f1' : '#1e293b'}
                            stroke="#0f172a"
                            strokeWidth="1"
                            className="transition-colors duration-200"
                          />
                        );
                      })}
                    </svg>
                    <span className="text-xs text-slate-400 mt-2 font-mono">10 × 10 Grid (Total = 100 squares)</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                        <span>Percent Shaded:</span>
                        <span className="text-gold-400 text-base">{percentSlider}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={percentSlider}
                        onChange={(e) => {
                          setPercentSlider(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="Set grid percentage"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                      <div className="p-2 bg-slate-900 rounded-lg">
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Percent</div>
                        <div className="text-sm font-black text-gold-300">{percentSlider}%</div>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg">
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Fraction</div>
                        <div className="text-sm font-black text-emerald-300">{reduceFraction(percentSlider, 100)}</div>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg">
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Decimal</div>
                        <div className="text-sm font-black text-amber-300">{(percentSlider / 100).toFixed(2)}</div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      Notice: <strong className="text-white">{percentSlider}%</strong> is literally <strong className="text-white">{percentSlider}/100</strong>, which simplifies to <strong className="text-emerald-400">{reduceFraction(percentSlider, 100)}</strong>.
                    </p>
                  </div>
                </div>
              )}

              {/* SLIDE 1: SPEED RUNNER SIMULATOR */}
              {currentSlide === 1 && (
                <div className="space-y-4 pt-2">
                  <div className="relative bg-slate-950 h-28 rounded-2xl border border-slate-800 p-3 overflow-hidden flex flex-col justify-between">
                    <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                      <span>STADIUM START (0 km)</span>
                      <span>FINISH LINE ({distanceVal} km)</span>
                    </div>

                    {/* Track */}
                    <div className="relative w-full h-8 bg-slate-900 rounded-full border border-slate-800 flex items-center px-2">
                      <motion.div
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 flex items-center justify-center text-sm shadow-md"
                        style={{ left: `calc(${runnerPos}% - 16px)` }}
                        animate={{ left: `calc(${runnerPos}% - 16px)` }}
                      >
                        🏃
                      </motion.div>
                    </div>

                    <div className="flex justify-between text-xs text-gold-400 font-bold">
                      <span>Calculated Speed = {distanceVal} km ÷ {timeVal} h = <span className="text-emerald-400 text-sm">{(distanceVal / timeVal).toFixed(1)} km/h</span></span>
                      <span>({((distanceVal / timeVal) * (5 / 18)).toFixed(1)} m/s)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-300 font-bold mb-1">
                        <span>Distance (d):</span>
                        <span className="text-gold-400">{distanceVal} km</span>
                      </div>
                      <input
                        type="range"
                        min={30}
                        max={300}
                        step={10}
                        value={distanceVal}
                        onChange={(e) => setDistanceVal(Number(e.target.value))}
                        className="w-full accent-gold-500"
                        aria-label="Set runner distance"
                      />
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-300 font-bold mb-1">
                        <span>Time (t):</span>
                        <span className="text-amber-400">{timeVal} hours</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={6}
                        step={0.5}
                        value={timeVal}
                        onChange={(e) => setTimeVal(Number(e.target.value))}
                        className="w-full accent-amber-500"
                        aria-label="Set runner time"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleTriggerRunner}
                    disabled={isRunnerActive}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold rounded-xl shadow-md"
                  >
                    {isRunnerActive ? 'Sprint in Progress...' : '▶ Run Simulation Track'}
                  </motion.button>
                </div>
              )}

              {/* SLIDE 2: PATTERNS & GENERALISATIONS */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
                  <div className="flex flex-col items-center">
                    <svg viewBox="0 0 160 160" className="w-48 h-48 bg-slate-950 p-2 rounded-2xl border border-slate-800">
                      {Array.from({ length: patternN }).map((_, r) => (
                        Array.from({ length: patternN }).map((__, c) => {
                          const layer = Math.max(r, c) + 1;
                          const colors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#3b82f6'];
                          return (
                            <rect
                              key={`${r}-${c}`}
                              x={c * 28 + 10}
                              y={r * 28 + 10}
                              width="24"
                              height="24"
                              rx="3"
                              fill={colors[(layer - 1) % colors.length]}
                              stroke="#0f172a"
                              strokeWidth="1.5"
                            />
                          );
                        })
                      ))}
                    </svg>
                    <span className="text-xs text-gold-400 mt-2 font-mono">Side n = {patternN} → Total Squares = {patternN * patternN}</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <motion.button
                          key={num}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setPatternN(num);
                            audioManager.play('pop');
                          }}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold ${
                            patternN === num ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          n = {num}
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                      <div className="text-slate-300 font-semibold">Odd Sum Formula:</div>
                      <div className="text-amber-300 font-mono">
                        {Array.from({ length: patternN }, (_, i) => 2 * (i + 1) - 1).join(' + ')} = <strong className="text-emerald-400">{patternN * patternN}</strong>
                      </div>
                      <div className="text-gold-300 pt-1 border-t border-slate-800">
                        General Rule: <strong>Sum of first n odd numbers = n²</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: BALANCE SCALE EQUATION SOLVER */}
              {currentSlide === 3 && (
                <div className="space-y-4 pt-2">
                  <div className="flex flex-col items-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 300 130" className="w-full max-w-sm h-32">
                      <polygon points="150,50 140,110 160,110" fill="#475569" />
                      <line x1="40" y1="50" x2="260" y2="50" stroke="#94a3b8" strokeWidth="4" />
                      <line x1="70" y1="50" x2="70" y2="90" stroke="#64748b" strokeWidth="2" />
                      <path d="M 40 90 Q 70 105 100 90 Z" fill="#334155" />
                      <text x="70" y="85" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">x + {scaleConstant}</text>
                      <line x1="230" y1="50" x2="230" y2="90" stroke="#64748b" strokeWidth="2" />
                      <path d="M 200 90 Q 230 105 260 90 Z" fill="#334155" />
                      <text x="230" y="85" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">{scaleBoxX + scaleConstant}</text>
                    </svg>

                    <div className="mt-2 text-center text-sm font-bold text-slate-200">
                      Equation: <span className="text-gold-400">x + {scaleConstant} = {scaleBoxX + scaleConstant}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-300 font-medium">Isolate mystery box x by inverse subtraction:</span>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleBalanceAdjust(-1)}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg border border-slate-700"
                      >
                        -1 Weight
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleBalanceAdjust(1)}
                        className="px-3 py-1 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-lg"
                      >
                        +1 Weight
                      </motion.button>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold">x = {scaleBoxX}</span>
                  </div>
                </div>
              )}

              {/* SLIDE 4: 2-D SHAPE PROPERTY INSPECTOR */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
                  <div className="flex flex-wrap justify-center gap-3">
                    {[
                      { id: 'triangle' as const, name: 'Triangle', icon: '🔺' },
                      { id: 'rectangle' as const, name: 'Rectangle', icon: '▭' },
                      { id: 'square' as const, name: 'Square', icon: '⏹' },
                      { id: 'circle' as const, name: 'Circle', icon: '⭕' },
                    ].map((s) => (
                      <motion.button
                        key={s.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleShapeSelect(s.id)}
                        className={`p-3 rounded-xl flex flex-col items-center gap-1 w-20 ${
                          selectedShape === s.id ? 'bg-gold-600 text-white shadow-lg' : 'bg-slate-950 text-slate-300 border border-slate-800'
                        }`}
                      >
                        <span className="text-2xl">{s.icon}</span>
                        <span className="text-[10px] font-bold">{s.name}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                    <div className="text-sm font-black text-white capitalize flex items-center gap-2">
                      <span className="text-gold-400">●</span>
                      <span>{selectedShape} Properties</span>
                    </div>
                    {selectedShape === 'triangle' && (
                      <ul className="space-y-1 text-slate-300">
                        <li>• <strong className="text-gold-300">3 Straight Sides</strong> & <strong className="text-gold-300">3 Corners (Vertices)</strong></li>
                        <li>• Real Models: Samosa, Yield Road Sign, Roof Truss</li>
                      </ul>
                    )}
                    {selectedShape === 'rectangle' && (
                      <ul className="space-y-1 text-slate-300">
                        <li>• <strong className="text-gold-300">4 Straight Sides</strong>, Opposite sides equal</li>
                        <li>• <strong className="text-gold-300">4 Right Angles (Corners)</strong></li>
                        <li>• Real Models: Textbook Cover, Blackboard, Door</li>
                      </ul>
                    )}
                    {selectedShape === 'square' && (
                      <ul className="space-y-1 text-slate-300">
                        <li>• <strong className="text-gold-300">4 Equal Straight Sides</strong> & <strong className="text-gold-300">4 Right Angles</strong></li>
                        <li>• Special case of a rectangle with all sides equal!</li>
                        <li>• Real Models: Floor Tiles, Square Wall Clock</li>
                      </ul>
                    )}
                    {selectedShape === 'circle' && (
                      <ul className="space-y-1 text-slate-300">
                        <li>• <strong className="text-gold-300">0 Straight Sides</strong> & <strong className="text-gold-300">0 Corners</strong></li>
                        <li>• 1 continuous smooth curved boundary</li>
                        <li>• Real Models: One-Rupee Coin, Wheel, Dinner Plate</li>
                      </ul>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 5: UNITARY SPEED & RATIO CONVERTER */}
              {currentSlide === 5 && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-300">Adjust Train Speed:</span>
                      <span className="text-sm font-black text-gold-400">{converterKmh} km/h</span>
                    </div>
                    <input
                      type="range"
                      min={18}
                      max={180}
                      step={18}
                      value={converterKmh}
                      onChange={(e) => {
                        setConverterKmh(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-gold-500 cursor-pointer"
                      aria-label="Set converter speed in km/h"
                    />

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Kilometres / Hour</div>
                        <div className="text-lg font-black text-white">{converterKmh} km/h</div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-gold-700/50 text-center">
                        <div className="text-[10px] text-gold-400 font-bold uppercase">Metres / Second (× 5/18)</div>
                        <div className="text-lg font-black text-emerald-400">{((converterKmh * 5) / 18).toFixed(1)} m/s</div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed pt-1">
                      Derivation: 1 km = 1,000 m and 1 h = 3,600 s. Dividing gives <strong className="text-white">1000/3600 = 5/18</strong>. Multiply by 5/18 for m/s; multiply by 18/5 for km/h!
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentSlide === 0}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-sm font-bold rounded-xl border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-sm font-bold rounded-xl shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX (Free Play) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-slate-900 to-gold-950/40 rounded-2xl border border-gold-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-white">Math Carnival Free Play Sandbox</h3>
              <p className="text-xs sm:text-sm text-slate-300">Play with algebraic values, evaluate polynomials in real-time, and observe balance changes without grading pressure.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-black rounded-xl shadow-lg shadow-emerald-600/30 whitespace-nowrap"
            >
              Ready for Challenges! 🎯
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Expression Evaluator Sandbox */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-gold-400 uppercase">Live Algebraic Evaluator</div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Variable x: {exprVarX}</span>
                  <span>Variable y: {exprVarY}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={exprVarX}
                  onChange={(e) => setExprVarX(Number(e.target.value))}
                  className="w-full accent-gold-500"
                  aria-label="Set expression variable x"
                />
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={exprVarY}
                  onChange={(e) => setExprVarY(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                  aria-label="Set expression variable y"
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs space-y-1">
                <div className="text-slate-300">Expression 1: <strong className="text-white">2x + 3y</strong> = 2({exprVarX}) + 3({exprVarY}) = <span className="text-emerald-400 font-bold">{2 * exprVarX + 3 * exprVarY}</span></div>
                <div className="text-slate-300">Expression 2: <strong className="text-white">x² - y</strong> = ({exprVarX})² - {exprVarY} = <span className="text-amber-400 font-bold">{exprVarX * exprVarX - exprVarY}</span></div>
              </div>
            </div>

            {/* Speed & Distance Calculator */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-emerald-400 uppercase">Speed Unit Converter</div>
              <div className="p-3 bg-slate-950 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Speed: <strong>{distanceVal} km/h</strong></span>
                  <span className="text-emerald-400 font-bold">{((distanceVal * 5) / 18).toFixed(2)} m/s</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Multiplying by <strong>5/18</strong> converts km/h directly into m/s. (1000m / 3600s = 5/18).
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* Progress Bar & Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
              <span>Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
              <span className="text-gold-400">Score: {scoreBreakdown.correct} / {scoreBreakdown.total}</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Challenge Box */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={wrongShake ? { duration: 0.4 } : { duration: 0.3 }}
            className={`p-5 sm:p-6 rounded-2xl border shadow-xl transition-colors ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500/80'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-gold-900/60 text-gold-300 border border-gold-700/50">
                {challenge.competencyLevel.toUpperCase()}
              </span>
              <span className="text-[11px] font-mono text-slate-500">ID: {challenge.nodeId}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">
              {challenge.question}
            </h3>

            {/* MCQ Types (classify, distinguish, match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 3 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={showExplanation}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-100 font-bold'
                        : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/60'
                    }`}
                  >
                    <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag these labels onto matching targets below:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-600 hover:bg-gold-500 rounded-lg text-white text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'geom_tri', label: 'Triangle' },
                    { id: 'geom_sq', label: 'Square' },
                    { id: 'geom_rect', label: 'Rectangle' },
                    { id: 'geom_circ', label: 'Circle' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] text-center ${
                        droppedLabels[target.id] ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold text-xs' : 'bg-slate-950 border-slate-700 text-slate-400 text-xs'
                      }`}
                    >
                      <span>{droppedLabels[target.id] || `Drop [${target.label}] Label Here`}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="w-full py-2.5 bg-gold-600 text-white text-xs font-bold rounded-xl"
                >
                  Verify All Placed Labels
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder steps into proper logical sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length ? sortArrangement : challenge.sortItems.map((_, i) => i)).map((itemIdx, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                        setDraggedItem(null);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs font-medium text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-gold-600/40 text-gold-300 flex items-center justify-center font-bold text-[10px]">
                        {displayIdx + 1}
                      </span>
                      <span>{challenge.sortItems![itemIdx]}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i))}
                  className="w-full py-2.5 bg-gold-600 text-white text-xs font-bold rounded-xl"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Input Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value..."
                    className="flex-1 p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-gold-500"
                  />
                  {challenge.unit && <span className="text-xs font-bold text-slate-400">{challenge.unit}</span>}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!numericInput}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl"
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-700/60 hover:bg-gold-600 text-white text-xs font-mono font-bold rounded-lg border border-gold-500/30"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[60px] p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-gold-600 text-white rounded-lg text-xs font-mono font-bold flex items-center gap-1.5">
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-300 hover:text-white"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Tap tokens above to assemble...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={constructParts.length === 0}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
                >
                  Verify Constructed Banner
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 sm:p-5 bg-amber-950/40 rounded-2xl border border-amber-700/60 space-y-3"
              >
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                  <span>💡</span>
                  <span>Step-by-Step ICSE Master Method:</span>
                </div>

                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((step, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs sm:text-sm text-amber-100/90 leading-relaxed"
                  >
                    <strong className="text-amber-400 font-mono">Step {idx + 1}:</strong> {step}{!step.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-amber-700/80 hover:bg-amber-600 text-white text-xs font-bold rounded-lg"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-black rounded-xl shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Carnival →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950 via-slate-900 to-emerald-950 rounded-3xl border border-gold-700/60 shadow-2xl text-center space-y-3">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Mathematics Carnival Complete!</h2>
            <p className="text-sm text-slate-300">You engineered the fair with precision across all 10 ICSE Class 6 learning nodes.</p>

            <div className="flex justify-center gap-4 py-2">
              <div className="px-5 py-3 bg-slate-900/80 rounded-2xl border border-slate-700">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Final Accuracy</div>
                <div className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="px-5 py-3 bg-slate-900/80 rounded-2xl border border-slate-700">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Mastery State</div>
                <div className="text-2xl font-black text-gold-400 capitalize">{masteryLevel}</div>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-700/60 text-xs sm:text-sm text-emerald-300 leading-relaxed">
            {errors === 0
              ? '🌟 PERFECT SCORE! You have total mastery over percentages, speed formulas, equations, and 2-D geometry!'
              : errors <= 3
              ? '🎉 Excellent performance! You demonstrated firm command of algebra, patterns, and ratios.'
              : errors <= 7
              ? '👍 Good effort! Review your misconception profile below to solidify your understanding.'
              : '💪 Keep persevering! Mathematics grows stronger with every mistake analyzed and corrected.'}
          </div>

          {/* ─── REFLECTION QUESTIONS SECTION ─── */}
          <div className="p-5 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-700/50 space-y-4">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>💭</span>
              <span>Reflect on Your Learning</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consolidate your knowledge by putting your insights into your own words:
            </p>

            <div className="space-y-4">
              {REFLECTION_QUESTIONS.map((q) => (
                <div key={q.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{q.prompt}</span>
                    <button
                      onClick={() => toggleReflectionHelp(q.id)}
                      className="text-[11px] text-gold-400 hover:text-gold-300 font-medium underline"
                    >
                      {showReflectionHelp[q.id] ? 'Hide Example' : 'Show Example'}
                    </button>
                  </div>

                  <textarea
                    rows={2}
                    value={reflectionResponses[q.id] || ''}
                    onChange={(e) => handleReflectionChange(q.id, e.target.value)}
                    placeholder="Type your reflection here..."
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-gold-500 resize-none"
                  />

                  {showReflectionHelp[q.id] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-2.5 bg-gold-950/40 rounded-lg border border-gold-800/40 text-[11px] text-gold-300 italic"
                    >
                      💡 Example thought: &quot;{q.sampleAnswer}&quot;
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span>
                <span>Personalized Concept Revision Profile:</span>
              </h3>
              {hitMisconceptions.map((mIdx, i) => {
                const item = misconceptions?.[mIdx];
                if (!item) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                    <div className="text-rose-400 font-semibold">❌ Trap: {item.misconception}</div>
                    <div className="text-emerald-300 font-semibold">✓ ICSE Rule: {item.correction}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real-World Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>🚀</span>
              <span>{REAL_WORLD_ACTIVITY.title}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-gold-400 font-bold">{i + 1}.</span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Spaced Repetition Schedule */}
          <div className="p-4 bg-gold-950/40 rounded-2xl border border-gold-800/60 text-center text-xs text-slate-300">
            📅 Spaced Memory Review scheduled in <strong className="text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
          </div>
        </motion.div>
      )}

      {/* ─── PLATFORM OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Stage Cleared Successfully!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_MathematicsIdeaPercentFractionSim;
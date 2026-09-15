'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS AS STRING LITERALS ───
const NODE_C11_MATH_001 = 'c11_math_001';
const NODE_C11_MATH_002 = 'c11_math_002';
const NODE_C11_MATH_003 = 'c11_math_003';
const NODE_C11_MATH_004 = 'c11_math_004';
const NODE_C11_MATH_005 = 'c11_math_005';
const NODE_C11_MATH_006 = 'c11_math_006';
const NODE_C11_MATH_007 = 'c11_math_007';
const NODE_C11_MATH_008 = 'c11_math_008';
const NODE_C11_MATH_009 = 'c11_math_009';
const NODE_C11_MATH_010 = 'c11_math_010';

const ALL_NODE_IDS = [
  NODE_C11_MATH_001,
  NODE_C11_MATH_002,
  NODE_C11_MATH_003,
  NODE_C11_MATH_004,
  NODE_C11_MATH_005,
  NODE_C11_MATH_006,
  NODE_C11_MATH_007,
  NODE_C11_MATH_008,
  NODE_C11_MATH_009,
  NODE_C11_MATH_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission ISRO: The Orbit & Telemetry Architecture',
  intro: 'You are the Chief Data Architect at ISRO Telemetry, Tracking and Command Network (ISTRAC) in Bengaluru. To track satellite constellations, process ground station links, and ensure signal integrity, you must structure raw sensor feeds into rigorous Mathematical Sets, Relations, and Deterministic Functions.',
  context: 'From filtering invalid frequency intervals and computing Cartesian sensor coordinates to verifying one-to-one telemetry mappings, set theory is the bedrock of space navigation.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Telemetry sensor S sends data packets. If an antenna records the set of calibration readings A = {0} and B = ∅ (the empty set), are A and B identical?',
  options: [
    'Yes — 0 means null/nothing, so {0} and ∅ both mean empty.',
    'No — {0} contains one distinct element (the number zero), whereas ∅ contains zero elements.',
    'Yes — in digital systems, empty arrays evaluate to 0.',
    'No — ∅ is infinite while {0} is finite.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: {0} is a box containing the number zero (cardinality 1), while ∅ is a completely empty box (cardinality 0)! Let us explore this visually.',
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

// ─── CHALLENGES ARRAY (22 Progressive Challenges across all 10 nodes) ───
const CHALLENGES: Challenge[] = [
  // Foundation 1: c11_math_001
  {
    id: 'ch_001',
    nodeId: NODE_C11_MATH_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following collections is a mathematically "well-defined" set according to ISC standards?',
    options: [
      'The collection of the 5 most difficult space missions in India',
      'The collection of Indian states that have an active ISRO launch center',
      'The collection of brilliant scientists at ISTRAC',
      'The collection of high-altitude telemetry peaks',
    ],
    correctIndex: 1,
    explanation: 'A set must be well-defined: membership must be unambiguous and verifiable without personal opinion. Geographic and institutional facts (like Sriharikota in Andhra Pradesh) provide objective membership.',
    hints: [
      'Think about whether two people could reasonably disagree on who belongs in the collection.',
      'Words like "most difficult", "brilliant", and "high-altitude" are subjective adjectives.',
      'Having an active ISRO launch center is an objective fact with an exact list of states.',
    ],
    misconceptionIndex: 0,
  },
  // Foundation 2: c11_math_001 (Distinguish empty set)
  {
    id: 'ch_002',
    nodeId: NODE_C11_MATH_001,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Consider three sets: X = ∅, Y = {0}, and Z = {∅}. What are their respective cardinal numbers n(X), n(Y), and n(Z)?',
    options: [
      'n(X) = 0, n(Y) = 0, n(Z) = 1',
      'n(X) = 0, n(Y) = 1, n(Z) = 1',
      'n(X) = 1, n(Y) = 1, n(Z) = 1',
      'n(X) = 0, n(Y) = 1, n(Z) = 0',
    ],
    correctIndex: 1,
    explanation: 'X = ∅ has 0 elements. Y = {0} contains the single element 0, so n(Y) = 1. Z = {∅} contains the empty set as a single element, so n(Z) = 1.',
    hints: [
      'Count the number of items strictly inside the outer curly braces.',
      'Zero is a number, not nothingness. A set containing zero has one item.',
      '{∅} is a box containing an empty box — count of outer contents is 1.',
    ],
    misconceptionIndex: 0,
  },
  // Foundation 3: c11_math_002 (Intervals on Number Line)
  {
    id: 'ch_003',
    nodeId: NODE_C11_MATH_002,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the interval notations to their exact inequality representations on the real number line.',
    dragItems: [
      { label: '{x ∈ R : 2 < x < 5}', targetId: 'int_open' },
      { label: '{x ∈ R : 2 ≤ x ≤ 5}', targetId: 'int_closed' },
      { label: '{x ∈ R : 2 ≤ x < 5}', targetId: 'int_semi_right_open' },
      { label: '{x ∈ R : 2 < x ≤ 5}', targetId: 'int_semi_left_open' },
    ],
    correctMapping: {
      int_open: '{x ∈ R : 2 < x < 5}',
      int_closed: '{x ∈ R : 2 ≤ x ≤ 5}',
      int_semi_right_open: '{x ∈ R : 2 ≤ x < 5}',
      int_semi_left_open: '{x ∈ R : 2 < x ≤ 5}',
    },
    explanation: '(2, 5) represents 2 < x < 5 (open endpoints). [2, 5] represents 2 ≤ x ≤ 5 (closed endpoints). [2, 5) includes 2 but excludes 5. (2, 5] excludes 2 but includes 5.',
    hints: [
      'Round parentheses () always signify strict inequalities (< or >) with hollow dots.',
      'Square brackets [] always signify inclusive inequalities (≤ or ≥) with solid dots.',
      'Match left and right bracket types independently.',
    ],
    misconceptionIndex: 1,
  },
  // Foundation 4: c11_math_003 (Power set cardinality)
  {
    id: 'ch_004',
    nodeId: NODE_C11_MATH_003,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A satellite telemetry unit monitors 4 independent telemetry sensors: A = {Temp, Voltage, Spin, Altitude}. How many total subsets exist in the power set P(A)?',
    correctAnswer: 16,
    tolerance: 0,
    unit: 'subsets',
    explanation: 'The cardinality of the power set is |P(A)| = 2^n. For n = 4 sensors, |P(A)| = 2^4 = 16 subsets.',
    hints: [
      'Each element has 2 independent choices: either included in the subset or excluded.',
      'Use the formula 2^n where n is the number of elements in the set.',
      'Calculate 2 × 2 × 2 × 2.',
    ],
    misconceptionIndex: 2,
  },
  // Foundation 5: c11_math_004 (Venn diagram regions)
  {
    id: 'ch_005',
    nodeId: NODE_C11_MATH_004,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In a Venn diagram with Universal set U, if Set A is a proper subset of Set B (A ⊂ B), how must the circles be drawn?',
    options: [
      'Two separate non-touching circles with a visible gap',
      'Two overlapping circles intersecting in a lens-shaped region',
      'Circle A drawn completely inside Circle B with no part extending outside',
      'Circle B drawn completely inside Circle A',
    ],
    correctIndex: 2,
    explanation: 'Because every element of A is also inside B, Circle A must lie strictly and wholly inside Circle B without protruding.',
    hints: [
      'A ⊂ B means if an element is in A, it is guaranteed to be in B.',
      'Can any point in circle A lie outside circle B?',
      'Subset containment geometrically translates to nested circles.',
    ],
  },
  // Foundation 6: c11_math_005 (Union and Intersection)
  {
    id: 'ch_006',
    nodeId: NODE_C11_MATH_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Let Ground Stations A = {Delhi, Bengaluru, Mauritius} and B = {Bengaluru, Port Blair, Mauritius}. What is A ∩ B?',
    options: [
      '{Delhi, Bengaluru, Mauritius, Port Blair}',
      '{Bengaluru, Mauritius}',
      '{Delhi, Port Blair}',
      '∅',
    ],
    correctIndex: 1,
    explanation: 'Intersection A ∩ B collects only elements common to both sets. Bengaluru and Mauritius appear in both A and B.',
    hints: [
      'Intersection means "AND" — elements present in Station A AND Station B.',
      'Check which station names appear in both lists.',
      'Bengaluru and Mauritius are shared.',
    ],
  },
  // Foundation 7: c11_math_007 (Cartesian product count)
  {
    id: 'ch_007',
    nodeId: NODE_C11_MATH_007,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A rocket engine has 3 stage options S = {PS1, PS2, PS3} and 4 propellant types P = {Solid, Liquid, Cryo, SemiCryo}. How many ordered pairs exist in S × P?',
    correctAnswer: 12,
    tolerance: 0,
    unit: 'ordered pairs',
    explanation: 'n(S × P) = n(S) × n(P) = 3 × 4 = 12 ordered pairs.',
    hints: [
      'Cartesian product pairs every element of the first set with every element of the second set.',
      'Multiply the cardinalities: n(S) × n(P).',
      '3 × 4 = ?',
    ],
    misconceptionIndex: 3,
  },
  // Standard 1: c11_math_002 (Proper subsets count)
  {
    id: 'ch_008',
    nodeId: NODE_C11_MATH_002,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'For telemetry band F = {UHF, S-band, X-band}, what is the number of PROPER subsets?',
    correctAnswer: 7,
    tolerance: 0,
    unit: 'proper subsets',
    explanation: 'Total subsets = 2^n = 2^3 = 8. A proper subset cannot equal the set itself, so number of proper subsets = 2^n - 1 = 8 - 1 = 7.',
    hints: [
      'Calculate total subsets first: 2^3.',
      'Does a proper subset allow the original set F itself?',
      'Subtract 1 for the improper subset (F itself): 8 - 1.',
    ],
    misconceptionIndex: 2,
  },
  // Standard 2: c11_math_006 (De Morgan\'s Law verification)
  {
    id: 'ch_009',
    nodeId: NODE_C11_MATH_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'According to De Morgan\'s First Law of set operations, the complement of a union (A ∪ B)\' is identically equal to:',
    options: [
      'A\' ∪ B\'',
      'A\' ∩ B\'',
      '(A ∩ B)\'',
      'U - (A ∩ B)',
    ],
    correctIndex: 1,
    explanation: '(A ∪ B)\' = A\' ∩ B\'. The complement operation inverts the union connective "OR" into the intersection connective "AND".',
    hints: [
      'Think: "Not (A or B)" means "Not in A AND Not in B".',
      'The union symbol ∪ flips to intersection ∩ under complementation.',
      'So (A ∪ B)\' = A\' ∩ B\'.',
    ],
    misconceptionIndex: 4,
  },
  // Standard 3: c11_math_006 (Set difference)
  {
    id: 'ch_010',
    nodeId: NODE_C11_MATH_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Let U = {1, 2, 3, 4, 5, 6, 7, 8}, A = {2, 4, 6, 8}, and B = {2, 3, 5, 7}. What is the set difference A - B?',
    options: [
      '{4, 6, 8}',
      '{3, 5, 7}',
      '{2}',
      '{1, 4, 6, 8}',
    ],
    correctIndex: 0,
    explanation: 'A - B contains elements that belong to A but DO NOT belong to B. Removing the common element 2 from A leaves {4, 6, 8}.',
    hints: [
      'Start with all elements of A: {2, 4, 6, 8}.',
      'Identify elements of A that also appear in B (A ∩ B = {2}).',
      'Remove 2 from A to get A - B.',
    ],
  },
  // Standard 4: c11_math_008 (Domain, Range, Co-domain)
  {
    id: 'ch_011',
    nodeId: NODE_C11_MATH_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Let A = {1, 2, 3} and B = {4, 5, 6, 7}. A relation R from A to B is defined as R = {(1, 4), (2, 6)}. Identify the range and co-domain of R.',
    options: [
      'Range = {4, 6}, Co-domain = {4, 5, 6, 7}',
      'Range = {4, 5, 6, 7}, Co-domain = {4, 6}',
      'Range = {1, 2}, Co-domain = {4, 5, 6, 7}',
      'Range = {4, 6}, Co-domain = {1, 2, 3}',
    ],
    correctIndex: 0,
    explanation: 'The co-domain is the entire target set B = {4, 5, 6, 7}. The range is the subset of B actually appearing as second elements in R, which is {4, 6}.',
    hints: [
      'The co-domain is always the given destination set B.',
      'The range contains only the actual output numbers hit by the relation.',
      '4 and 6 are hit; 5 and 7 are untouched in the co-domain.',
    ],
  },
  // Standard 5: c11_math_008 (Number of relations)
  {
    id: 'ch_012',
    nodeId: NODE_C11_MATH_008,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If Set A has 2 elements and Set B has 3 elements, what is the TOTAL number of possible relations from A to B?',
    correctAnswer: 64,
    tolerance: 0,
    unit: 'relations',
    explanation: 'The Cartesian product AxB has 2 × 3 = 6 pairs. A relation is any subset of AxB, so total relations = 2^(n(A)×n(B)) = 2^6 = 64.',
    hints: [
      'Find n(A × B) = 2 × 3 = 6.',
      'Every subset of A × B is a distinct relation.',
      'Calculate 2^6.',
    ],
  },
  // Standard 6: c11_math_009 (Function definition & uniqueness)
  {
    id: 'ch_013',
    nodeId: NODE_C11_MATH_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which of the following relations from A = {1, 2, 3} to B = {x, y, z} defines a valid FUNCTION?',
    options: [
      'R1 = {(1, x), (2, y), (1, z)}',
      'R2 = {(1, x), (2, x), (3, x)}',
      'R3 = {(1, y), (3, z)}',
      'R4 = {(1, x), (2, y), (3, z), (2, x)}',
    ],
    correctIndex: 1,
    explanation: 'In R2, every domain element {1, 2, 3} appears as a first element exactly once. A many-to-one mapping (all pointing to x) is completely valid for a function.',
    hints: [
      'Check: Does every input 1, 2, 3 have exactly one outgoing arrow?',
      'R1 and R4 fail because input 1 or 2 maps to multiple different outputs.',
      'R3 fails because input 2 is missing an image.',
    ],
  },
  // Standard 7: c11_math_009 (Equations as functions test)
  {
    id: 'ch_014',
    nodeId: NODE_C11_MATH_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why does the circle equation x² + y² = 25 FAIL to define y as a function of x over the real interval [-5, 5]?',
    options: [
      'Because 25 is not a prime number',
      'Because for an input like x = 3, y produces two distinct outputs (y = +4 and y = -4)',
      'Because circles cannot be drawn on the Cartesian plane',
      'Because negative numbers are not allowed in domains',
    ],
    correctIndex: 1,
    explanation: 'Solving for y gives y = ±√(25 - x²). An input of x = 3 yields both +4 and -4, violating the single-valued uniqueness condition of functions.',
    hints: [
      'Solve for y: y = ±√(25 - x²).',
      'Does a single x produce one y or two y values?',
      'A function must assign exactly one output per input.',
    ],
  },
  // Advanced 1: c11_math_010 (Domain of rational square root)
  {
    id: 'ch_015',
    nodeId: NODE_C11_MATH_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Find the natural domain of the real-valued function f(x) = √(x - 4) / (x - 7).',
    options: [
      '[4, ∞)',
      '[4, 7) ∪ (7, ∞)',
      '(4, 7) ∪ (7, ∞)',
      'R - {7}',
    ],
    correctIndex: 1,
    explanation: 'Two conditions must hold: (1) Numerator square root requires x - 4 ≥ 0 ⇒ x ≥ 4. (2) Denominator cannot be zero: x - 7 ≠ 0 ⇒ x ≠ 7. Combining gives [4, 7) ∪ (7, ∞).',
    hints: [
      'Condition 1: What is required under the square root? (x - 4 ≥ 0).',
      'Condition 2: What value makes the denominator zero? (x ≠ 7).',
      'Intersect x ≥ 4 with x ≠ 7 in interval notation.',
    ],
  },
  // Advanced 2: c11_math_010 (Range of quadratic function)
  {
    id: 'ch_016',
    nodeId: NODE_C11_MATH_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Telemetry signal strength is modelled by f(x) = x² + 6x + 14 for x ∈ R. What is the Range of f(x)?',
    options: [
      '[14, ∞)',
      '[5, ∞)',
      '[-3, ∞)',
      'R',
    ],
    correctIndex: 1,
    explanation: 'Completing the square: f(x) = (x + 3)² + 5. Since (x + 3)² ≥ 0 for all real x, minimum value of f(x) is 5 when x = -3. Hence Range = [5, ∞).',
    hints: [
      'Complete the square: x² + 6x + 14 = (x + 3)² + ?',
      '(x + 3)² is always ≥ 0.',
      'The minimum output is 0 + 5 = 5.',
    ],
  },
  // Advanced 3: c11_math_005 (Venn inclusion-exclusion problem)
  {
    id: 'ch_017',
    nodeId: NODE_C11_MATH_005,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In a telemetry array of 100 satellites, 65 track GPS (G), 45 track NavIC (N), and 20 track BOTH. How many satellites track NEITHER system?',
    correctAnswer: 10,
    tolerance: 0,
    unit: 'satellites',
    explanation: 'n(G ∪ N) = n(G) + n(N) - n(G ∩ N) = 65 + 45 - 20 = 90. Satellites tracking neither = Total - n(G ∪ N) = 100 - 90 = 10.',
    hints: [
      'Use the formula: n(G ∪ N) = n(G) + n(N) - n(G ∩ N).',
      'Compute n(G ∪ N) = 65 + 45 - 20 = 90.',
      'Subtract from total 100: 100 - 90 = ?',
    ],
  },
  // Advanced 4: c11_math_007 (Cartesian Equality)
  {
    id: 'ch_018',
    nodeId: NODE_C11_MATH_007,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'If ordered pairs (2x + y, 7) and (9, x - 2y) are equal, find the value of (x + y).',
    correctAnswer: 4,
    tolerance: 0,
    unit: '',
    explanation: 'By equality of ordered pairs: 2x + y = 9 and x - 2y = 7. From second eq, x = 2y + 7. Substitute into first: 2(2y + 7) + y = 9 ⇒ 5y + 14 = 9 ⇒ 5y = -5 ⇒ y = -1. Then x = 2(-1) + 7 = 5. Thus x + y = 5 + (-1) = 4.',
    hints: [
      'Set first coordinates equal: 2x + y = 9.',
      'Set second coordinates equal: x - 2y = 7.',
      'Solve this linear system for x and y, then calculate x + y.',
    ],
  },
  // Advanced 5: c11_math_003 (Power set non-empty proper subsets)
  {
    id: 'ch_019',
    nodeId: NODE_C11_MATH_003,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How many NON-EMPTY PROPER subsets does a set of 5 distinct telemetry ground codes possess?',
    correctAnswer: 30,
    tolerance: 0,
    unit: 'subsets',
    explanation: 'Total subsets = 2^5 = 32. Non-empty proper subsets exclude both the empty set ∅ and the full set itself: 2^5 - 2 = 32 - 2 = 30.',
    hints: [
      'Total subsets for n = 5 is 2^5 = 32.',
      'Exclude the empty set ∅ (1 subset).',
      'Exclude the original set itself (1 subset). So 32 - 2 = 30.',
    ],
  },
  // Advanced 6: c11_math_006 (Algebraic simplification of complement)
  {
    id: 'ch_020',
    nodeId: NODE_C11_MATH_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Simplify the set expression: [ (A ∩ B)\' ∩ A\' ] using Set Algebra laws.',
    options: [
      'A\'',
      'B\'',
      'U',
      '∅',
    ],
    correctIndex: 0,
    explanation: 'By De Morgan\'s Law: (A ∩ B)\' = A\' ∪ B\'. The expression becomes (A\' ∪ B\') ∩ A\'. By the Absorption Law of set intersection, (X ∪ Y) ∩ X = X. Letting X = A\', this reduces to A\'.',
    hints: [
      'Apply De Morgan: (A ∩ B)\' = A\' ∪ B\'.',
      'Now simplify (A\' ∪ B\') ∩ A\'.',
      'Recall the absorption law: (X ∪ Y) ∩ X = X.',
    ],
  },
  // Advanced 7: c11_math_010 (Pre-images analysis)
  {
    id: 'ch_021',
    nodeId: NODE_C11_MATH_010,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Arrange the sequence of steps required to rigorously determine the domain and range of f(x) = 1/√(9 - x²).',
    sortItems: [
      'Set denominator radicand strictly positive: 9 - x² > 0',
      'Solve quadratic inequality (3 - x)(3 + x) > 0 to get Domain = (-3, 3)',
      'Analyze output limits: as x² ranges from 0 to <9, √(9-x²) ranges in (0, 3]',
      'Invert bounds to determine Range = [1/3, ∞)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Step 1: radicand must be > 0 (avoid negative root and zero division). Step 2: solve for domain (-3, 3). Step 3: find bounds of denominator. Step 4: invert bounds for Range [1/3, ∞).',
    hints: [
      'Start with the primary mathematical condition under the radical.',
      'Solve the inequality next to establish the domain.',
      'Find the denominator range before taking the reciprocal.',
    ],
  },
  // Advanced 8: c11_math_009 (Real-world mapping synthesis)
  {
    id: 'ch_022',
    nodeId: NODE_C11_MATH_009,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the valid function formula mapping satellite orbital period T in hours to orbital radius ratio R = ∛(T²). Click the required mathematical operators.',
    availableParts: ['R(T)', '=', '∛(', 'T²', ')', '+ 1', '/ 2'],
    targetState: 'R(T) = ∛( T² )',
    validationHint: 'Assemble: R(T) = ∛( T² )',
    explanation: 'By Kepler\'s 3rd Law, the orbital radius ratio R is a deterministic single-valued function of period T given by R(T) = ∛(T²). Every positive period T produces exactly one orbital radius.',
    hints: [
      'Start with the function symbol: R(T)',
      'Add the equality sign = and cube root bracket ∛(',
      'Place T² inside the root bracket and close with )',
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
  nodeId: NODE_C11_MATH_001,
  title: 'Sets, Representations, Relations & Mappings',
  definition: 'A comprehensive ISC Class 11 mathematical foundation covering set representations, empty sets, subsets, intervals, power sets, Venn diagrams, set operations, Cartesian products, and functions as single-valued relation mappings.',
  eli5: 'Think of sets as labeled containers of distinct items. We can group them, find overlaps, take cross-products like grid coordinates, and build function machines where each input coin gives exactly one drink.',
  misconceptions: [
    { misconception: 'The empty set ∅ is identical to {0} or {∅}.', correction: '∅ contains 0 elements (n=0); {0} contains the number zero (n=1); {∅} contains the empty set itself (n=1).' },
    { misconception: 'Open interval (a, b) and closed interval [a, b] are the same set of numbers.', correction: '(a, b) excludes the boundaries a and b; [a, b] includes both endpoints. This distinction is critical in calculus.' },
    { misconception: 'The number of subsets for n elements is n² or 2n.', correction: 'Because each element has 2 independent choices (in or out), total subsets = 2^n.' },
    { misconception: 'AxB = BxA because scalar multiplication is commutative.', correction: 'While n(AxB) = n(BxA), the ordered pairs are reversed: (1, 2) ≠ (2, 1). Hence AxB ≠ BxA unless A = B.' },
    { misconception: 'De Morgan\'s law distributes complement directly as (A ∪ B)\' = A\' ∪ B\'.', correction: 'Complement flips the connective: (A ∪ B)\' = A\' ∩ B\' and (A ∩ B)\' = A\' ∪ B\'.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the cardinal number of the set of vowels in "SATELLITE"?', options: ['3', '4', '5', '9'], correctIndex: 0 },
    { question: 'Which bracket notation represents numbers from 3 to 8 excluding 3 but including 8?', options: ['(3, 8)', '[3, 8]', '(3, 8]', '[3, 8)'], correctIndex: 2 },
    { question: 'If A = {1, 2}, how many elements are in P(P(A))?', options: ['4', '8', '16', '256'], correctIndex: 2 },
    { question: 'If A and B are disjoint sets, what is A ∩ B?', options: ['U', 'A', 'B', '∅'], correctIndex: 3 },
    { question: 'What is the value of (A\')\' for any set A in universe U?', options: ['U', '∅', 'A', 'A\''], correctIndex: 2 },
    { question: 'In the relation R = {(1, 2), (3, 4), (5, 6)}, what is the domain?', options: ['{2, 4, 6}', '{1, 3, 5}', '{1, 2, 3, 4, 5, 6}', 'R'], correctIndex: 1 },
    { question: 'Which equation fails the vertical line / function uniqueness test?', options: ['y = 2x + 1', 'y = x²', 'x² + y² = 16', 'y = √x'], correctIndex: 2 },
    { question: 'What is the natural domain of f(x) = 1/(x - 5)?', options: ['[5, ∞)', 'R - {5}', '(5, ∞)', 'R'], correctIndex: 1 },
  ],
  masteryCriteria: 'Master all 10 foundational nodes of ISC Class 11 Sets and Relations: representations, subsets, intervals, power sets, Venn algebra, Cartesian products, and function domain/range mappings.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Sets, Roster vs Set-Builder & Cardinality',
    instruction: 'Toggle elements in the satellite telemetry register to observe Roster Form, Set-Builder Form, and Cardinality in real time.',
    interactionType: 'toggle-elements',
    nodeId: NODE_C11_MATH_001,
  },
  {
    title: 'Lab 2: Real Number Line & Interval Notations',
    instruction: 'Adjust the lower and upper bounds and toggle Open/Closed endpoints to inspect interval notation and inequalities.',
    interactionType: 'slider-interval',
    nodeId: NODE_C11_MATH_002,
  },
  {
    title: 'Lab 3: Power Set & Binary Combinations Tree',
    instruction: 'Turn inclusion switches ON/OFF to generate all 2ⁿ subsets of the sensor set and verify the power set formula.',
    interactionType: 'power-set-builder',
    nodeId: NODE_C11_MATH_003,
  },
  {
    title: 'Lab 4: Dynamic 2-Set Venn Diagram & De Morgan Algebra',
    instruction: 'Select operations (Union, Intersection, Difference, Complement) to shade Venn regions and see element listings.',
    interactionType: 'venn-operations',
    nodeId: NODE_C11_MATH_004,
  },
  {
    title: 'Lab 5: Relations vs Function Mapping Engine',
    instruction: 'Connect telemetry inputs to outputs. Observe whether the mapping satisfies the strict Uniqueness Condition of a Function.',
    interactionType: 'mapping-engine',
    nodeId: NODE_C11_MATH_009,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you have a set with 3 elements, how many TOTAL subsets will be in its Power Set?',
    options: ['3 subsets', '6 subsets', '8 subsets', '9 subsets'],
    correctIndex: 2,
    verifyInstruction: 'Go to the Power Set Lab below and count the generated subsets when 3 elements are enabled.',
    nodeId: NODE_C11_MATH_003,
  },
  {
    question: 'Predict: If an arrow leaves input "Sensor 1" and points to BOTH "Antenna A" and "Antenna B", will it be a valid Function?',
    options: ['Yes — more antennas mean stronger redundancy', 'No — a single input cannot map to multiple distinct outputs', 'Yes — it is a one-to-one function', 'Only if the antennas are equal'],
    correctIndex: 1,
    verifyInstruction: 'Test this in Lab 5: connect Sensor 1 to two outputs and check the Function Validator banner.',
    nodeId: NODE_C11_MATH_009,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'In the Venn Lab, what do you observe when you compare (A ∪ B)\' with (A\' ∩ B\')?',
    observableOptions: [
      'They shade completely different regions',
      'Both operations highlight the EXACT same region outside both circles',
      '(A ∪ B)\' is larger than (A\' ∩ B\')',
      'Neither can be represented on a Venn diagram',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_MATH_006,
  },
  {
    question: 'In the Mapping Lab, what happens when two different inputs (e.g. S1 and S2) point to the SAME output (e.g. A1)?',
    observableOptions: [
      'It instantly breaks the function rule',
      'It is still a valid function (many-to-one mapping is permitted)',
      'It converts into an empty set',
      'The domain becomes undefined',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_MATH_009,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISTRAC Flight Dynamics Telemetry Challenge',
  description: 'Design a deterministic ground-station assignment matrix for Chandrayaan communication passes.',
  steps: [
    'Define Universal set U = {Station_1, Station_2, Station_3, Station_4, Station_5}',
    'Set up frequency interval F = [2.2 GHz, 2.3 GHz] for S-band downlink',
    'Verify that the mapping f: Satellite_ID → Primary_Antenna is a valid function (each satellite has exactly one primary)',
    'Calculate the Cartesian product S × F to find all valid channel configurations',
  ],
};

function C11_MathematicsSetsRepresentationsEmptySim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['mathematics'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predictions & Observations state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Escalating hints & progressive disclosure
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Visual feedback & animations
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Sort & Construct states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── INTERACTIVE LAB 1 STATE: Set Roster & Builder ───
  const [selectedElements, setSelectedElements] = useState<number[]>([2, 4, 6]);
  const [elementCandidate, setElementCandidate] = useState<number>(8);

  // ─── INTERACTIVE LAB 2 STATE: Real Intervals ───
  const [intervalLeft, setIntervalLeft] = useState<number>(2);
  const [intervalRight, setIntervalRight] = useState<number>(7);
  const [leftClosed, setLeftClosed] = useState<boolean>(true);
  const [rightClosed, setRightClosed] = useState<boolean>(false);
  const [testPoint, setTestPoint] = useState<number>(5);

  // ─── INTERACTIVE LAB 3 STATE: Power Set Builder ───
  const [powerSetItems, setPowerSetItems] = useState<string[]>(['α', 'β', 'γ']);
  const [binarySwitch, setBinarySwitch] = useState<boolean[]>([true, false, true]);

  // ─── INTERACTIVE LAB 4 STATE: Venn Operations ───
  const [vennOp, setVennOp] = useState<'A' | 'B' | 'union' | 'intersection' | 'diffA_B' | 'diffB_A' | 'compA' | 'compB' | 'deMorgan1' | 'deMorgan2'>('union');
  const [setAElements, setSetAElements] = useState<number[]>([1, 2, 3, 4]);
  const [setBElements, setSetBElements] = useState<number[]>([3, 4, 5, 6]);
  const [universeElements] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  // ─── INTERACTIVE LAB 5 STATE: Mapping Engine ───
  const [mappingArrows, setMappingArrows] = useState<Record<string, string[]>>({
    S1: ['A1'],
    S2: ['A2'],
    S3: ['A3'],
  });
  const [activeSourceNode, setActiveSourceNode] = useState<string | null>(null);

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── DERIVED VALUES FOR LABS ───
  const isTestPointInInterval = useMemo(() => {
    const leftValid = leftClosed ? testPoint >= intervalLeft : testPoint > intervalLeft;
    const rightValid = rightClosed ? testPoint <= intervalRight : testPoint < intervalRight;
    return leftValid && rightValid;
  }, [testPoint, intervalLeft, intervalRight, leftClosed, rightClosed]);

  const powerSetGenerated = useMemo(() => {
    const n = powerSetItems.length;
    const totalSubsets = 1 << n; // 2^n
    const subsets: string[][] = [];
    for (let i = 0; i < totalSubsets; i++) {
      const current: string[] = [];
      for (let j = 0; j < n; j++) {
        if ((i & (1 << j)) !== 0) {
          current.push(powerSetItems[j]);
        }
      }
      subsets.push(current);
    }
    return subsets;
  }, [powerSetItems]);

  const currentSubsetFromSwitches = useMemo(() => {
    return powerSetItems.filter((_, idx) => binarySwitch[idx]);
  }, [powerSetItems, binarySwitch]);

  const vennComputed = useMemo(() => {
    const A = setAElements;
    const B = setBElements;
    const U = universeElements;
    const intersection = A.filter(x => B.includes(x));
    const union = Array.from(new Set([...A, ...B])).sort((a, b) => a - b);
    const diffA_B = A.filter(x => !B.includes(x));
    const diffB_A = B.filter(x => !A.includes(x));
    const compA = U.filter(x => !A.includes(x));
    const compB = U.filter(x => !B.includes(x));
    const compUnion = U.filter(x => !union.includes(x));
    const compIntersect = U.filter(x => !intersection.includes(x));
    const deMorgan1 = compA.filter(x => compB.includes(x));
    const deMorgan2 = Array.from(new Set([...compA, ...compB])).sort((a, b) => a - b);

    let activeList: number[] = [];
    let mathLatex = '';
    let explanationText = '';

    switch (vennOp) {
      case 'A':
        activeList = A;
        mathLatex = 'A';
        explanationText = 'Elements belonging to Set A.';
        break;
      case 'B':
        activeList = B;
        mathLatex = 'B';
        explanationText = 'Elements belonging to Set B.';
        break;
      case 'union':
        activeList = union;
        mathLatex = 'A ∪ B';
        explanationText = 'Elements in A, OR in B, or in both (A ∪ B = {x : x ∈ A or x ∈ B}).';
        break;
      case 'intersection':
        activeList = intersection;
        mathLatex = 'A ∩ B';
        explanationText = 'Common elements in both A AND B (A ∩ B = {x : x ∈ A and x ∈ B}).';
        break;
      case 'diffA_B':
        activeList = diffA_B;
        mathLatex = 'A - B';
        explanationText = 'Elements in A but NOT in B (relative complement of B in A).';
        break;
      case 'diffB_A':
        activeList = diffB_A;
        mathLatex = 'B - A';
        explanationText = 'Elements in B but NOT in A (note: A - B ≠ B - A).';
        break;
      case 'compA':
        activeList = compA;
        mathLatex = "A' = U - A";
        explanationText = 'All elements in Universal Set U outside Set A.';
        break;
      case 'compB':
        activeList = compB;
        mathLatex = "B' = U - B";
        explanationText = 'All elements in Universal Set U outside Set B.';
        break;
      case 'deMorgan1':
        activeList = compUnion;
        mathLatex = "(A ∪ B)' = A' ∩ B'";
        explanationText = "De Morgan's 1st Law: Complement of Union equals Intersection of Complements.";
        break;
      case 'deMorgan2':
        activeList = compIntersect;
        mathLatex = "(A ∩ B)' = A' ∪ B'";
        explanationText = "De Morgan's 2nd Law: Complement of Intersection equals Union of Complements.";
        break;
    }

    return {
      intersection,
      union,
      diffA_B,
      diffB_A,
      compA,
      compB,
      compUnion,
      deMorgan1,
      deMorgan2,
      activeList,
      mathLatex,
      explanationText,
    };
  }, [setAElements, setBElements, universeElements, vennOp]);

  const mappingEvaluation = useMemo(() => {
    const domain = ['S1', 'S2', 'S3', 'S4'];
    const codomain = ['A1', 'A2', 'A3', 'A4'];
    const hits: Record<string, string[]> = mappingArrows;

    let isFunction = true;
    let violationMessage = '';
    const actualDomainUsed: string[] = [];
    const actualRange: string[] = [];

    for (const d of domain) {
      const targets = hits[d] || [];
      if (targets.length === 0) {
        isFunction = false;
        violationMessage = `Input ${d} has NO mapped output! Every domain element must map to an image.`;
      } else if (targets.length > 1) {
        isFunction = false;
        violationMessage = `Input ${d} has MULTIPLE outputs: [${targets.join(', ')}]! Violates function uniqueness.`;
      } else {
        actualDomainUsed.push(d);
        if (!actualRange.includes(targets[0])) {
          actualRange.push(targets[0]);
        }
      }
    }

    return {
      isFunction,
      violationMessage,
      actualDomainUsed,
      codomain,
      actualRange: actualRange.sort(),
    };
  }, [mappingArrows]);

  // ─── INITIAL MASTERY LOAD EFFECT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE DIFFICULTY EFFECT ───
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

  // ─── CANVAS PARTICLE & WAVE ANIMATION EFFECT ───
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

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * 0.04 + frame * 0.05) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const pingX = (frame * 2) % canvas.width;
      const pingY = canvas.height / 2 + Math.sin(pingX * 0.04 + frame * 0.05) * 8;
      ctx.beginPath();
      ctx.arc(pingX, pingY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction! {0} is a set with cardinality 1.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Sets & Relations Discovery Labs. Learn each concept by hands-on interaction.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free Sandbox Mode. Experiment with intervals, Venn diagrams, and mapping engines with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commencing Telemetry Architecture Challenges. Apply your mastery!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the live simulation below to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on observation!' : 'Check the highlighted regions again carefully.');
  }, []);

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
      setShowExplanation(true);
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

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Mission Complete! Final Telemetry Score: ${finalScore} percent.`);
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
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Verified with mathematical precision.');
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
          speechManager.speak('Let us review the step-by-step mathematical reasoning.');
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

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let current = prev.length > 0 ? [...prev] : [0, 1, 2, 3];
      const [moved] = current.splice(fromIndex, 1);
      current.splice(toIndex, 0, moved);
      return current;
    });
  }, []);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3];
    handleAnswer(answer);
  }, [sortArrangement, handleAnswer]);

  const handleMappingNodeClick = useCallback(
    (nodeType: 'source' | 'target', nodeIdStr: string) => {
      audioManager.play('tap');
      if (nodeType === 'source') {
        setActiveSourceNode(nodeIdStr);
      } else if (nodeType === 'target' && activeSourceNode) {
        setMappingArrows(prev => {
          const current = prev[activeSourceNode] || [];
          const exists = current.includes(nodeIdStr);
          const next = exists ? current.filter(x => x !== nodeIdStr) : [...current, nodeIdStr];
          return { ...prev, [activeSourceNode]: next };
        });
        audioManager.play('drop-correct');
      }
    },
    [activeSourceNode]
  );

  const handleAddSetElement = useCallback(() => {
    if (!selectedElements.includes(elementCandidate)) {
      setSelectedElements(prev => [...prev, elementCandidate].sort((a, b) => a - b));
      audioManager.play('pop');
    }
  }, [elementCandidate, selectedElements]);

  const handleRemoveSetElement = useCallback((val: number) => {
    setSelectedElements(prev => prev.filter(x => x !== val));
    audioManager.play('pop');
  }, []);

  const handleTogglePowerSwitch = useCallback((idx: number) => {
    setBinarySwitch(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
    audioManager.play('tap');
  }, []);

  // Cleanup inactivity timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                ISC Class 11 Math
              </span>
              <span className="text-xs text-slate-400">c11_math_001 → 010</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : difficulty === 'advanced'
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
            Mastery: {masteryLevel}
          </span>
        </div>
      </header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-800/50 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🚀</span>
              <span>{SCENARIO.title}</span>
            </div>
            <p className="text-slate-200 text-base leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 bg-indigo-900/30 p-3 rounded-xl border border-indigo-700/30">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Curiosity Discovery Hook</span>
              <span className="text-xs text-slate-400">Low-stakes Intuition Test</span>
            </div>
            <h3 className="text-lg font-bold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all duration-200 border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/70 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-indigo-500'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && <span className="text-slate-500 font-bold mr-1">✗ </span>}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                <div
                  className={`p-4 rounded-xl border text-sm leading-relaxed ${
                    discoveryCorrect
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                      : 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                  }`}
                >
                  <p className="font-bold mb-1">{discoveryCorrect ? '✓ Excellent Intuition!' : '💡 Key Mathematical Discovery:'}</p>
                  <p>{discoveryCorrect ? 'You understood the fundamental distinction between cardinality zero (∅) and the singleton set {0}!' : DISCOVERY_QUESTION.hintAfter}</p>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    aria-label="Enter Guided Discovery Labs"
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black rounded-xl shadow-lg flex items-center gap-2"
                  >
                    <span>Enter Guided Discovery Labs</span>
                    <span>→</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Selector Tab Navigation */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {EXPLORATION_STEPS.map((step, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Switch to Lab ${idx + 1}: ${step.title}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    currentSlide === idx
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  Lab {idx + 1}: {step.title.split(':')[1] || step.title}
                </motion.button>
              ))}
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Step {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
          </div>

          {/* Current Step Instruction Banner */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
              <p className="text-xs text-amber-400 mt-1 flex items-center gap-1.5">
                <span>👉</span>
                <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
              Node: {EXPLORATION_STEPS[currentSlide].nodeId}
            </span>
          </div>

          {/* ─── DYNAMIC LAB VISUALIZATIONS ─── */}
          <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-inner min-h-[420px]">
            {/* LAB 1: Roster vs Set-Builder */}
            {currentSlide === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-400 uppercase">1. Roster Form</span>
                    <div className="text-lg font-mono font-bold text-indigo-300 mt-2 break-all">
                      S = &#123;{selectedElements.length > 0 ? selectedElements.join(', ') : '∅'}&#125;
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Explicit enumeration inside curly braces without duplicate elements.</p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-400 uppercase">2. Set-Builder Form</span>
                    <div className="text-sm font-mono font-bold text-emerald-300 mt-2">
                      S = &#123; x : x ∈ 2N and x ≤ {selectedElements.length > 0 ? Math.max(...selectedElements) : 0} &#125;
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Defines membership via a rigorous mathematical rule or property P(x).</p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-400 uppercase">3. Cardinal Number n(S)</span>
                    <div className="text-2xl font-black text-amber-400 mt-1">
                      n(S) = {selectedElements.length}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {selectedElements.length === 0 ? 'Empty Set (Null set, ∅)' : 'Finite Set of distinct elements'}
                    </p>
                  </div>
                </div>

                {/* Element manipulation register */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-slate-300">Active Sensor Telemetry Elements:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedElements.map(el => (
                      <motion.div
                        key={el}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1.5 bg-indigo-900/60 border border-indigo-500/50 rounded-xl text-white font-mono text-sm flex items-center gap-2"
                      >
                        <span>Elem: {el}</span>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => handleRemoveSetElement(el)}
                          aria-label={`Remove element ${el}`}
                          className="text-rose-400 hover:text-rose-300"
                        >
                          ✕
                        </motion.button>
                      </motion.div>
                    ))}
                    {selectedElements.length === 0 && (
                      <span className="text-sm text-slate-500 italic">No elements in set. S = ∅ (Empty set).</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs text-slate-400">Add Even Value:</span>
                    <input
                      type="number"
                      value={elementCandidate}
                      onChange={e => setElementCandidate(Number(e.target.value))}
                      aria-label="New element value"
                      className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-white w-20 text-sm font-mono"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddSetElement}
                      aria-label="Insert candidate value into set"
                      className="px-4 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold"
                    >
                      + Insert Into Set
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedElements([])}
                      aria-label="Empty the set"
                      className="px-4 py-1 bg-slate-800 hover:bg-slate-700 text-rose-300 rounded-lg text-xs font-bold"
                    >
                      Empty to ∅
                    </motion.button>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: Real Intervals on Number Line */}
            {currentSlide === 1 && (
              <div className="space-y-6">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Interval Notation</span>
                    <div className="text-2xl font-mono font-black text-indigo-400 mt-1">
                      {leftClosed ? '[' : '('} {intervalLeft}, {intervalRight} {rightClosed ? ']' : ')'}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Set-Builder Definition</span>
                    <div className="text-base font-mono font-bold text-emerald-400 mt-1">
                      &#123; x ∈ R : {intervalLeft} {leftClosed ? '≤' : '<'} x {rightClosed ? '≤' : '<'} {intervalRight} &#125;
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setLeftClosed(!leftClosed)}
                      aria-label={`Toggle left endpoint between open and closed, currently ${leftClosed ? 'closed' : 'open'}`}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                        leftClosed ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      Left Endpoint: {leftClosed ? 'Closed [•]' : 'Open (○)'}
                    </button>
                    <button
                      onClick={() => setRightClosed(!rightClosed)}
                      aria-label={`Toggle right endpoint between open and closed, currently ${rightClosed ? 'closed' : 'open'}`}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                        rightClosed ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      Right Endpoint: {rightClosed ? 'Closed [•]' : 'Open (○)'}
                    </button>
                  </div>
                </div>

                {/* SVG Real Number Line */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <svg viewBox="0 0 600 120" className="w-full h-32">
                    <line x1="40" y1="60" x2="560" y2="60" stroke="#475569" strokeWidth="3" />
                    <polygon points="35,60 45,55 45,65" fill="#475569" />
                    <polygon points="565,60 555,55 555,65" fill="#475569" />

                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => {
                      const x = 50 + val * 50;
                      return (
                        <g key={val}>
                          <line x1={x} y1="52" x2={x} y2="68" stroke="#64748b" strokeWidth="2" />
                          <text x={x} y="88" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="monospace">
                            {val}
                          </text>
                        </g>
                      );
                    })}

                    {intervalRight > intervalLeft && (
                      <line
                        x1={50 + intervalLeft * 50}
                        y1="60"
                        x2={50 + intervalRight * 50}
                        y2="60"
                        stroke="#6366f1"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                    )}

                    <circle
                      cx={50 + intervalLeft * 50}
                      cy="60"
                      r="7"
                      fill={leftClosed ? '#6366f1' : '#020617'}
                      stroke="#6366f1"
                      strokeWidth="3"
                    />

                    <circle
                      cx={50 + intervalRight * 50}
                      cy="60"
                      r="7"
                      fill={rightClosed ? '#6366f1' : '#020617'}
                      stroke="#6366f1"
                      strokeWidth="3"
                    />

                    <g transform={`translate(${50 + testPoint * 50}, 35)`}>
                      <polygon points="0,15 -6,0 6,0" fill={isTestPointInInterval ? '#22c55e' : '#f43f5e'} />
                      <text x="0" y="-4" textAnchor="middle" fill={isTestPointInInterval ? '#22c55e' : '#f43f5e'} fontSize="11" fontWeight="bold">
                        x={testPoint} ({isTestPointInInterval ? '✓ ∈' : '✗ ∉'})
                      </text>
                    </g>
                  </svg>

                  {/* Sliders for Bounds */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="text-xs text-slate-400 font-bold block mb-1">
                        Lower Bound (a): {intervalLeft}
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={9}
                        value={intervalLeft}
                        aria-label="Lower bound slider"
                        onChange={e => {
                          const val = Number(e.target.value);
                          if (val < intervalRight) setIntervalLeft(val);
                        }}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 font-bold block mb-1">
                        Upper Bound (b): {intervalRight}
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={10}
                        value={intervalRight}
                        aria-label="Upper bound slider"
                        onChange={e => {
                          const val = Number(e.target.value);
                          if (val > intervalLeft) setIntervalRight(val);
                        }}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 font-bold block mb-1">
                        Test Point (x): {testPoint}
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={10}
                        step={0.5}
                        value={testPoint}
                        aria-label="Test point slider"
                        onChange={e => setTestPoint(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: Power Set Builder & Binary Tree */}
            {currentSlide === 2 && (
              <div className="space-y-6">
                {!predictionMade && (
                  <div className="p-4 bg-indigo-950/70 border border-indigo-700/60 rounded-2xl space-y-3">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      🎯 Brilliant Predict-Then-Check
                    </span>
                    <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handlePrediction(i)}
                          aria-label={`Predict option: ${opt}`}
                          className="p-2.5 bg-slate-900 border border-slate-700 hover:border-indigo-500 rounded-xl text-xs font-bold text-slate-200"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {predictionMade && (
                  <div className="p-3 bg-indigo-900/30 rounded-xl border border-indigo-500/40 text-xs text-indigo-300">
                    💡 {PREDICTION_QUESTIONS[0].verifyInstruction}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Binary Toggle Switches */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase">Binary Inclusion Switches</span>
                      <span className="text-xs text-indigo-400 font-mono">2³ = 8 Branches</span>
                    </div>

                    <div className="space-y-2">
                      {powerSetItems.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="font-mono text-sm font-bold text-white">Element {item}</span>
                          <button
                            onClick={() => handleTogglePowerSwitch(idx)}
                            aria-label={`Toggle element ${item} inclusion, currently ${binarySwitch[idx] ? 'included' : 'excluded'}`}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              binarySwitch[idx]
                                ? 'bg-emerald-600 text-white shadow-md'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {binarySwitch[idx] ? '✓ 1: INCLUDED' : '✗ 0: EXCLUDED'}
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 mt-2">
                      <span className="text-xs text-slate-400 font-bold">Current Selected Subset:</span>
                      <div className="text-lg font-mono font-bold text-amber-400 mt-1">
                        &#123; {currentSubsetFromSwitches.join(', ') || '∅'} &#125;
                      </div>
                    </div>
                  </div>

                  {/* Generated Full Power Set */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase">Power Set P(A) — |P(A)| = 2³ = 8</span>
                      <span className="text-xs font-bold text-emerald-400">{powerSetGenerated.length} Subsets</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                      {powerSetGenerated.map((sub, i) => {
                        const isMatch = JSON.stringify(sub) === JSON.stringify(currentSubsetFromSwitches);
                        return (
                          <div
                            key={i}
                            className={`p-2 rounded-xl text-xs font-mono border transition-all ${
                              isMatch
                                ? 'bg-indigo-950 border-indigo-500 text-white font-bold shadow-lg ring-1 ring-indigo-500'
                                : 'bg-slate-900 border-slate-800 text-slate-300'
                            }`}
                          >
                            {i + 1}. &#123;{sub.length > 0 ? sub.join(', ') : '∅'}&#125;
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4: Venn Diagram & De Morgan Algebra */}
            {currentSlide === 3 && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'union' as const, label: 'Union (A ∪ B)' },
                    { id: 'intersection' as const, label: 'Intersection (A ∩ B)' },
                    { id: 'diffA_B' as const, label: 'Difference (A - B)' },
                    { id: 'diffB_A' as const, label: 'Difference (B - A)' },
                    { id: 'compA' as const, label: "Complement (A')" },
                    { id: 'deMorgan1' as const, label: "De Morgan 1: (A ∪ B)'" },
                    { id: 'deMorgan2' as const, label: "De Morgan 2: (A ∩ B)'" },
                  ].map(op => (
                    <motion.button
                      key={op.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setVennOp(op.id)}
                      aria-label={`Select Venn operation: ${op.label}`}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        vennOp === op.id
                          ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {op.label}
                    </motion.button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 360 220" className="w-full h-52">
                      <rect
                        x="10"
                        y="10"
                        width="340"
                        height="200"
                        rx="16"
                        fill={vennOp === 'compA' || vennOp === 'deMorgan1' || vennOp === 'deMorgan2' ? '#1e1b4b' : '#0f172a'}
                        stroke="#475569"
                        strokeWidth="2"
                      />
                      <text x="30" y="35" fill="#94a3b8" fontSize="12" fontWeight="bold">U = &#123;1..10&#125;</text>

                      <circle
                        cx="135"
                        cy="110"
                        r="65"
                        fill={
                          vennOp === 'A' || vennOp === 'union' || vennOp === 'diffA_B'
                            ? '#4f46e5'
                            : '#1e293b'
                        }
                        fillOpacity="0.6"
                        stroke="#818cf8"
                        strokeWidth="2"
                      />
                      <text x="95" y="80" fill="#ffffff" fontSize="14" fontWeight="bold">A</text>
                      <text x="100" y="115" fill="#c7d2fe" fontSize="11" fontFamily="monospace">1, 2</text>

                      <circle
                        cx="225"
                        cy="110"
                        r="65"
                        fill={
                          vennOp === 'B' || vennOp === 'union' || vennOp === 'diffB_A'
                            ? '#065f46'
                            : '#1e293b'
                        }
                        fillOpacity="0.6"
                        stroke="#34d399"
                        strokeWidth="2"
                      />
                      <text x="255" y="80" fill="#ffffff" fontSize="14" fontWeight="bold">B</text>
                      <text x="245" y="115" fill="#a7f3d0" fontSize="11" fontFamily="monospace">5, 6</text>

                      <text x="180" y="115" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold" fontFamily="monospace">
                        3, 4
                      </text>

                      <text x="40" y="180" fill="#64748b" fontSize="10" fontFamily="monospace">7, 8, 9, 10</text>
                    </svg>
                  </div>

                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Live Set Equation
                    </span>
                    <div className="text-xl font-mono font-black text-indigo-300">
                      {vennComputed.mathLatex} = &#123; {vennComputed.activeList.join(', ')} &#125;
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
                      {vennComputed.explanationText}
                    </p>

                    <div className="text-xs text-slate-400 pt-1">
                      <span>Cardinal count: </span>
                      <strong className="text-emerald-400 font-mono">n = {vennComputed.activeList.length} elements</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: Relations vs Function Mapping Engine */}
            {currentSlide === 4 && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        mappingEvaluation.isFunction ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                      }`}
                    />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Engine Status:
                    </span>
                    <span
                      className={`text-xs font-black px-2 py-0.5 rounded ${
                        mappingEvaluation.isFunction
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {mappingEvaluation.isFunction ? '✓ VALID FUNCTION f: A → B' : '✗ RELATION ONLY (NOT A FUNCTION)'}
                    </span>
                  </div>

                  {mappingEvaluation.violationMessage && (
                    <span className="text-xs text-rose-300 font-medium">
                      ⚠️ {mappingEvaluation.violationMessage}
                    </span>
                  )}
                </div>

                {/* Interactive Bipartite Mapping Canvas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-indigo-400 uppercase block text-center">
                      Domain Set A (Inputs)
                    </span>
                    {['S1', 'S2', 'S3', 'S4'].map(node => (
                      <motion.button
                        key={node}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMappingNodeClick('source', node)}
                        aria-label={`Select domain input node ${node}`}
                        className={`w-full p-3 rounded-xl font-mono text-sm font-bold flex items-center justify-between border transition-all ${
                          activeSourceNode === node
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg ring-2 ring-indigo-400'
                            : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-indigo-500'
                        }`}
                      >
                        <span>{node} (Sensor)</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
                          → {(mappingArrows[node] || []).join(', ') || 'none'}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="text-center p-3 space-y-2">
                    <span className="text-xs text-slate-500 font-bold uppercase">Mapping Director</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      1. Click an Input on the Left.<br />
                      2. Click an Output on the Right to toggle an arrow.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setMappingArrows({ S1: ['A1'], S2: ['A2'], S3: ['A3'], S4: ['A4'] })}
                      aria-label="Reset mapping to standard 1-to-1 function"
                      className="px-3 py-1.5 bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 text-indigo-300 rounded-xl text-xs font-bold"
                    >
                      Reset to 1-to-1 Mapping
                    </motion.button>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-bold text-emerald-400 uppercase block text-center">
                      Co-domain Set B (Outputs)
                    </span>
                    {['A1', 'A2', 'A3', 'A4'].map(node => {
                      const isHit = mappingEvaluation.actualRange.includes(node);
                      return (
                        <motion.button
                          key={node}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleMappingNodeClick('target', node)}
                          aria-label={`Select co-domain target node ${node}`}
                          className={`w-full p-3 rounded-xl font-mono text-sm font-bold flex items-center justify-between border transition-all ${
                            isHit
                              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                              : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-emerald-500'
                          }`}
                        >
                          <span>{node} (Antenna)</span>
                          <span className={`text-xs px-2 py-0.5 rounded ${isHit ? 'bg-emerald-900 text-emerald-300' : 'bg-slate-800 text-slate-500'}`}>
                            {isHit ? '✓ In Range' : 'Unused'}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-bold block">Domain:</span>
                    <span className="text-sm font-mono text-indigo-300 font-bold">&#123;S1, S2, S3, S4&#125;</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-bold block">Co-domain:</span>
                    <span className="text-sm font-mono text-slate-300 font-bold">&#123;A1, A2, A3, A4&#125;</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-bold block">Range (Actual Outputs Hit):</span>
                    <span className="text-sm font-mono text-emerald-400 font-bold">
                      &#123; {mappingEvaluation.actualRange.join(', ') || '∅'} &#125;
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              aria-label="Go to previous lab"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-sm font-bold"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                aria-label="Go to next lab"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Proceed to sandbox exploration"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-sm font-black shadow-lg"
              >
                Proceed to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-white">Interactive Sandbox & Lab Simulator</h3>
              <p className="text-xs text-slate-400 mt-1">
                Explore any of the 5 mathematical systems freely. Test edge cases with zero grading before starting challenges.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Start challenges"
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black rounded-xl shadow-lg flex items-center gap-2"
            >
              <span>Ready for Challenges!</span>
              <span>→</span>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase block">Venn Operations Sandbox</span>
              <div className="flex flex-wrap gap-1.5">
                {(['union', 'intersection', 'diffA_B', 'deMorgan1'] as const).map(op => (
                  <button
                    key={op}
                    onClick={() => setVennOp(op)}
                    aria-label={`Sandbox switch Venn operation to ${op}`}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      vennOp === op ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    {op}
                  </button>
                ))}
              </div>
              <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-amber-300">
                Active: {vennComputed.mathLatex} = &#123;{vennComputed.activeList.join(', ')}&#125;
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase block">Function Uniqueness Tester</span>
              <div className="p-3 bg-slate-900 rounded-xl text-xs space-y-1">
                <p className="text-white font-bold">Current Status: {mappingEvaluation.isFunction ? '✓ Valid Function' : '✗ Relation Only'}</p>
                <p className="text-slate-400">Range: &#123;{mappingEvaluation.actualRange.join(', ')}&#125;</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES & COMPETENCY ENGINE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <canvas ref={canvasRef} width={600} height={32} className="w-full h-8 rounded-xl bg-slate-950 border border-slate-800" />

          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                  Node: {challenge.nodeId}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 capitalize">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>
              <h2 className="text-base font-bold text-white mt-1">{challenge.question}</h2>
            </div>

            <motion.span
              key={challenge.difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                challenge.difficulty === 'foundation'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : challenge.difficulty === 'advanced'
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              }`}
            >
              {challenge.difficulty}
            </motion.span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* ─── CHALLENGE TYPE 1: MCQ ─── */}
          {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              {challenge.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(i)}
                  disabled={answerRevealed || showExplanation}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`p-4 text-left rounded-2xl text-sm font-medium transition-all border ${
                    wrongFlash
                      ? 'bg-rose-900/60 border-rose-500 text-rose-100'
                      : showExplanation && i === challenge.correctIndex
                      ? 'bg-emerald-900/60 border-emerald-500 text-emerald-100'
                      : 'bg-slate-900/90 hover:bg-slate-800/90 border-slate-800 text-slate-200 hover:border-indigo-500'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                  {showExplanation && i === challenge.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                  {showExplanation && i !== challenge.correctIndex && <span className="text-slate-500 font-bold mr-1">�� </span>}
                  {opt}
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* ─── CHALLENGE TYPE 2: DRAG-LABEL ─── */}
          {challenge.type === 'drag-label' && challenge.dragItems && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-indigo-400 uppercase">Available Item Palette (Drag onto target):</span>
              <div className="flex flex-wrap gap-2">
                {challenge.dragItems.map((item, i) => (
                  <motion.div
                    key={i}
                    role="button"
                    tabIndex={0}
                    aria-label={`Draggable item: ${item.label}`}
                    draggable
                    onDragStart={() => handleDragStart(item.label)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-indigo-700/80 hover:bg-indigo-600 border border-indigo-400/50 rounded-xl cursor-grab text-white font-mono text-xs font-bold shadow"
                  >
                    {item.label}
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'int_open', name: 'Open Interval (2, 5)' },
                  { id: 'int_closed', name: 'Closed Interval [2, 5]' },
                  { id: 'int_semi_right_open', name: 'Semi-open Right [2, 5)' },
                  { id: 'int_semi_left_open', name: 'Semi-open Left (2, 5]' },
                ].map(t => (
                  <div
                    key={t.id}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop(t.id)}
                    className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 flex items-center justify-between"
                  >
                    <span className="text-xs text-slate-400 font-bold">{t.name}:</span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                      {droppedLabels[t.id] || '[ Drop Matching Inequality Here ]'}
                    </span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(droppedLabels)}
                aria-label="Verify dropped labels"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black"
              >
                Verify Dropped Labels →
              </motion.button>
            </div>
          )}

          {/* ─── CHALLENGE TYPE 3: DRAG-SORT ─── */}
          {challenge.type === 'drag-sort' && challenge.sortItems && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-indigo-400 uppercase">
                Drag to Re-order Mathematical Derivation Steps:
              </span>
              <div className="space-y-2">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((step, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Step ${displayIdx + 1}: ${step}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-indigo-900/60 text-indigo-300 font-bold flex items-center justify-center text-xs">
                      {displayIdx + 1}
                    </span>
                    <span>{step}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSortSubmit}
                disabled={showExplanation}
                aria-label="Validate the sequence of steps"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black"
              >
                Validate Step Sequence →
              </motion.button>
            </div>
          )}

          {/* ─── CHALLENGE TYPE 4: NUMERIC INPUT ─── */}
          {challenge.type === 'numeric' && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-indigo-400 uppercase">Numeric Response Required:</span>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter exact integer..."
                  aria-label="Numeric answer input"
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48 focus:border-indigo-500 focus:outline-none"
                />
                <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  aria-label="Submit calculated numeric value"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black"
                >
                  Submit Calculated Value →
                </motion.button>
              </div>
            </div>
          )}

          {/* ─── CHALLENGE TYPE 5: CONSTRUCT STATE ─── */}
          {challenge.type === 'construct' && challenge.availableParts && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-indigo-400 uppercase">Equation Assembler Palette:</span>
              <div className="flex flex-wrap gap-2">
                {challenge.availableParts.map((part, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setConstructParts(prev => [...prev, part])}
                    aria-label={`Add part ${part} to equation`}
                    className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 rounded-lg text-white font-mono text-xs font-bold"
                  >
                    + {part}
                  </motion.button>
                ))}
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[80px] flex flex-wrap items-center gap-2">
                {constructParts.map((part, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-indigo-950 border border-indigo-600 rounded-lg text-indigo-300 font-mono text-sm flex items-center gap-1.5"
                  >
                    {part}
                    <button
                      onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                      aria-label={`Remove part ${part}`}
                      className="text-rose-400 text-xs font-bold"
                    >
                      ✕
                    </button>
                  </span>
                ))}
                {constructParts.length === 0 && (
                  <span className="text-xs text-slate-500 italic">Click parts above to construct the formula.</span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(constructParts.join(' '))}
                disabled={showExplanation || constructParts.length === 0}
                aria-label="Validate constructed equation formula"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black"
              >
                Validate Constructed Formula →
              </motion.button>
            </div>
          )}

          {/* ─── PROGRESSIVE DISCLOSURE EXPLANATION CARD ─── */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 border border-amber-600/50 rounded-2xl space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Step-by-Step Mathematical Explanation:
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {revealedSteps + 1} / {challenge.explanation.split('. ').filter(s => s.trim()).length} Steps Revealed
                </span>
              </div>

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
                      className="text-slate-200 text-sm leading-relaxed"
                    >
                      <strong className="text-amber-400 font-mono">{i + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim()).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    aria-label="Reveal next explanation step"
                    className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                  >
                    Show Next Step →
                  </motion.button>
                ) : (
                  <div />
                )}

                {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim()).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalise mission' : 'Proceed to next challenge'}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-sm font-black shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Mission Score →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-indigo-950 to-slate-900 rounded-3xl border border-indigo-800 text-center space-y-3">
            <span className="text-4xl">🛰️</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">ISTRAC Telemetry Architecture Verified!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have systematically applied the rigorous foundations of ISC Class 11 Sets, Intervals, Power Sets, Venn Algebra, Cartesian Products, and Function Mappings.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <div className="px-5 py-2 bg-slate-900/80 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400 block font-bold">Accuracy Score</span>
                <span className="text-2xl font-mono font-black text-emerald-400">
                  {Math.max(0, 100 - errors * 5)}%
                </span>
              </div>
              <div className="px-5 py-2 bg-slate-900/80 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400 block font-bold">Mastery Level</span>
                <span className="text-2xl font-mono font-black text-indigo-400 uppercase">
                  {masteryLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-700/50 text-sm text-emerald-300">
            <strong className="block mb-1 text-emerald-200">
              {errors === 0
                ? 'PERFECT SCORE! 🏆 Flawless mastery of ISC Set Theory.'
                : errors <= 3
                ? 'Great work! ✨ Solid command of mathematical rigor.'
                : errors <= 7
                ? 'Good effort! 📈 Keep practicing the fundamental rules.'
                : 'Do not give up — You WILL get this! 💪 Review the concepts below and try again.'}
            </strong>
          </div>

          {/* Misconceptions Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800/50 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                Targeted Misconception Diagnostic Profile:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-900/40 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Visibility Banner */}
          <div className="p-5 bg-amber-950/40 rounded-2xl border border-amber-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                  SM-2 Spaced Repetition Schedule
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {errors === 0 ? 'Optimal Retention' : errors <= 3 ? 'Review Required' : 'Reinforcement Needed'}
                </span>
              </div>
              <p className="text-sm text-slate-200">
                Recommended next session:{' '}
                <strong className="text-amber-300 font-bold underline">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </strong>{' '}
                ({errors} error{errors === 1 ? '' : 's'} recorded during mission).
              </p>
              <p className="text-xs text-slate-400">
                Spaced repetition automatically schedules retrieval practice to prevent memory decay of set definitions and function mappings.
              </p>
            </div>
            <div className="flex sm:flex-col items-center justify-center p-3 rounded-xl bg-amber-900/30 border border-amber-600/40 text-center min-w-[120px]">
              <span className="text-2xl mb-1">📅</span>
              <span className="text-xs font-bold text-amber-200 uppercase">
                {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
              </span>
            </div>
          </div>

          {/* Real World Application Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              {REAL_WORLD_ACTIVITY.title}
            </span>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-bold text-indigo-400">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── GLOBAL FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Telemetry Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_MathematicsSetsRepresentationsEmptySim;
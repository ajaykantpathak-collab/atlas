'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C11_APPMATH_031 = 'c11_appmath_031';
const NODE_C11_APPMATH_032 = 'c11_appmath_032';
const NODE_C11_APPMATH_033 = 'c11_appmath_033';
const NODE_C11_APPMATH_034 = 'c11_appmath_034';
const NODE_C11_APPMATH_035 = 'c11_appmath_035';
const NODE_C11_APPMATH_036 = 'c11_appmath_036';
const NODE_C11_APPMATH_037 = 'c11_appmath_037';
const NODE_C11_APPMATH_038 = 'c11_appmath_038';
const NODE_C11_APPMATH_039 = 'c11_appmath_039';
const NODE_C11_APPMATH_040 = 'c11_appmath_040';

const ALL_NODE_IDS = [
  NODE_C11_APPMATH_031,
  NODE_C11_APPMATH_032,
  NODE_C11_APPMATH_033,
  NODE_C11_APPMATH_034,
  NODE_C11_APPMATH_035,
  NODE_C11_APPMATH_036,
  NODE_C11_APPMATH_037,
  NODE_C11_APPMATH_038,
  NODE_C11_APPMATH_039,
  NODE_C11_APPMATH_040,
];

// ─── PREDICTION QUESTIONS (Brilliant.org Predict-then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If the leading coefficient a in f(x) = ax² + bx + c is changed from negative to positive, what happens to the trajectory vertex?',
    options: [
      'It switches from a maximum (peak apex) to a minimum (valley trough)',
      'It remains a maximum but shifts horizontally to the right',
      'The parabola becomes a flat horizontal line',
      'The vertex disappears completely',
    ],
    correctIndex: 0,
    explanation: 'When a > 0, the parabola curves upward like a cup, meaning the vertex is the absolute lowest minimum point. When a < 0, it opens downward like a hill with a peak maximum.',
    verifyInstruction: 'Adjust the curvature slider a in Lab 1 from -1 to +1 and observe the vertex invert immediately from a peak to a valley.',
  },
  {
    id: 'pred_2',
    question: 'For a quadratic inequality (x - r₁)(x - r₂) < 0 where r₁ < r₂, what sign does the expression take between the two roots?',
    options: [
      'Strictly negative (-): the region strictly between roots lies below the axis',
      'Strictly positive (+): the region between roots always stays above the axis',
      'Zero (0) across the entire interval between the roots',
      'It alternates between positive and negative infinitely',
    ],
    correctIndex: 0,
    explanation: 'For an upward-opening parabola with roots r₁ and r₂, the function dips beneath the x-axis between the roots, yielding negative product values.',
    verifyInstruction: 'In Lab 2, place the test probe slider between r₁ and r₂ to verify that the probe reads a negative (-) value.',
  },
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Space Mission Trajectory & Logistics Command',
  intro: 'You are the Chief Quantitative Analyst at ISRO Space Applications Centre, Bengaluru. Your mission: calculate the parabolic rocket ascent trajectory, configure safety threshold intervals for booster burn times, manage payload satellite arrangements without positional collisions, distribute sensor payloads among research units, and compute multi-stage expansion coefficients.',
  context: 'From parabolic trajectory apex to permutation security locks and binomial thermal shield expansion, algebra and combinatorics power every launch decision.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'An ISRO sub-orbital test rocket altitude follows h(t) = -5t² + 40t + 10 (metres). What is its maximum altitude and how does the coefficient of t² determine this shape?',
  options: [
    'Max altitude is 90m; negative leading coefficient means curve opens downwards with a peak vertex',
    'Max altitude is 40m; positive linear term means curve opens upwards with a minimum',
    'Max altitude is 10m; constant term is the absolute highest value on any quadratic graph',
    'Max altitude is infinite; all quadratics increase without bound',
  ],
  correctIndex: 0,
  hintAfter: 'Let us see why: for f(t) = at² + bt + c, a < 0 curves downwards like a hill, reaching its maximum at vertex t = -b/(2a) = 4s, giving h(4) = 90m.',
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

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the parabola when you change the leading coefficient a from positive to negative?',
    observableOptions: [
      'The parabola flips from opening upward (cup) to opening downward (hill) (✓)',
      'The parabola shifts horizontally to the right (✗)',
      'The parabola becomes a straight line (✗)',
      'The vertex disappears entirely (✗)',
    ],
    correctIndex: 0,
  },
  {
    question: 'When you adjust the constant c in f(x) = ax² + bx + c, what happens to the graph?',
    observableOptions: [
      'The entire parabola shifts vertically up or down (✓)',
      'The parabola rotates 90 degrees (✗)',
      'The vertex moves horizontally only (✗)',
      'The parabola widens or narrows (✗)',
    ],
    correctIndex: 0,
  },
];

// ─── 22 CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_quad_maxmin',
    nodeId: NODE_C11_APPMATH_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'For quadratic function f(x) = -2x² + 12x - 7, what is the nature and coordinate of the vertex?',
    options: [
      'Maximum at (3, 11)',
      'Minimum at (3, 11)',
      'Maximum at (-3, -61)',
      'Minimum at (6, -7)',
    ],
    correctIndex: 0,
    explanation: 'Since a = -2 < 0, the parabola opens downward, giving a MAXIMUM.\nThe axis of symmetry is x = -b/(2a) = -12/(2 × -2) = 3.\nSubstituting x = 3: f(3) = -2(9) + 12(3) - 7 = -18 + 36 - 7 = 11.\nTherefore, the vertex is a maximum at (3, 11).',
    hints: [
      'Check the sign of a: if a < 0, it opens down (maximum).',
      'Use x_vertex = -b / (2a) = -12 / (-4) = 3.',
      'Substitute x = 3 back into f(x) to get y = -2(9) + 36 - 7 = 11.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_quad_sketch_label',
    nodeId: NODE_C11_APPMATH_031,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Identify the key features of the quadratic function y = x² - 4x + 3 by placing the labels on the diagram.',
    dragItems: [
      { label: 'Vertex (2, -1)', targetId: 'feat_vertex' },
      { label: 'Axis of Symmetry x=2', targetId: 'feat_axis' },
      { label: 'y-intercept (0, 3)', targetId: 'feat_yint' },
      { label: 'Roots x=1, x=3', targetId: 'feat_roots' },
    ],
    correctMapping: {
      feat_vertex: 'Vertex (2, -1)',
      feat_axis: 'Axis of Symmetry x=2',
      feat_yint: 'y-intercept (0, 3)',
      feat_roots: 'Roots x=1, x=3',
    },
    explanation: 'For y = x² - 4x + 3: a=1 > 0, so it opens upward.\nVertex is at x = -(-4)/2 = 2, yielding y = 4 - 8 + 3 = -1, hence (2, -1).\nAxis of symmetry is the line x = 2.\nSetting x = 0 gives y-intercept (0, 3), and factoring (x - 1)(x - 3) = 0 yields roots x = 1, 3.',
    hints: [
      'The turning point at the bottom is the vertex.',
      'The vertical dashed line through the center is the axis of symmetry.',
      'Where the curve cuts the x-axis are the roots; where it cuts the y-axis is the y-intercept.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_03_lin_ineq_reversal',
    nodeId: NODE_C11_APPMATH_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Solve the linear inequality in one variable: -3x + 8 ≥ 29. What is the solution set in interval notation?',
    options: [
      '(-∞, -7]',
      '[-7, ∞)',
      '(-∞, -7)',
      '[7, ∞)',
    ],
    correctIndex: 0,
    explanation: 'Subtract 8 from both sides: -3x ≥ 21.\nDividing both sides by -3 (a negative quantity) requires reversing the inequality sign: x ≤ -7.\nIn continuous interval notation, this represents (-∞, -7].',
    hints: [
      'Subtract 8 from both sides: -3x >= 21.',
      'When dividing by negative 3, flip >= to <=.',
      'x <= -7 includes all numbers from negative infinity up to and including -7: (-inf, -7].',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_04_lin_ineq_numeric',
    nodeId: NODE_C11_APPMATH_032,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An ISRO cleanroom sensor budget allows: 4x + 120 ≤ 400, where x is the number of additional cryogenic sensors. What is the MAXIMUM integer value of x?',
    correctAnswer: 70,
    tolerance: 0,
    unit: 'sensors',
    explanation: 'Subtract 120 from both sides: 4x ≤ 280.\nDivide both sides by positive 4 (inequality sign does not change): x ≤ 70.\nThe maximum integer number of sensors is 70.',
    hints: [
      'Isolate 4x by subtracting 120 from 400.',
      '4x <= 280.',
      'Divide 280 by 4 to get x <= 70.',
    ],
  },
  {
    id: 'ch_05_quad_ineq_wavy',
    nodeId: NODE_C11_APPMATH_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Solve the quadratic inequality x² - 5x - 6 ≥ 0 using the method of intervals (wavy curve).',
    options: [
      '(-∞, -1] ∪ [6, ∞)',
      '[-1, 6]',
      '(-1, 6)',
      '(-∞, -6] ∪ [1, ∞)',
    ],
    correctIndex: 0,
    explanation: 'Factor the quadratic into (x - 6)(x + 1) ≥ 0.\nIdentify critical roots at x = -1 and x = 6.\nApply sign analysis: positive on x ≤ -1 and x ≥ 6, negative on (-1, 6).\nSince ≥ 0 is required, solution set is (-∞, -1] ∪ [6, ∞).',
    hints: [
      'Factorise x^2 - 5x - 6 into (x - 6)(x + 1).',
      'The critical roots are -1 and 6.',
      'Since a = 1 > 0, the curve is positive on outer wings (<= -1 and >= 6).',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_06_quad_ineq_sq',
    nodeId: NODE_C11_APPMATH_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the solution set for the inequality (2x - 5)² ≤ 0 across all real numbers x.',
    options: [
      'Singleton set { 2.5 }',
      'No real solution (empty set ∅)',
      'All real numbers (-∞, ∞)',
      '(-∞, 2.5]',
    ],
    correctIndex: 0,
    explanation: 'A real squared term (2x - 5)² is strictly ≥ 0 for every real number x.\nIt can never be strictly negative (< 0).\nThus (2x - 5)² ≤ 0 is satisfied ONLY when (2x - 5)² = 0, giving 2x = 5 => x = 2.5.',
    hints: [
      'Can any squared real number ever be strictly negative?',
      'No, a square is always >= 0.',
      'So the only way (2x - 5)^2 <= 0 is if (2x - 5)^2 = 0, meaning x = 5/2.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_07_perm_basic',
    nodeId: NODE_C11_APPMATH_034,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Compute 7P3, the number of permutations of 7 distinct telemetry satellite codes taken 3 at a time.',
    correctAnswer: 210,
    tolerance: 0,
    unit: 'ways',
    explanation: 'Use permutation formula: ⁿPᵣ = n! / (n - r)!\nHere ⁷P₃ = 7! / (7 - 3)! = 7! / 4!\nCalculate product: 7 × 6 × 5 = 210 ways.',
    hints: [
      'Use the formula nPr = n! / (n - r)!.',
      '7P3 = 7 × 6 × 5.',
      '7 × 30 = 210.',
    ],
  },
  {
    id: 'ch_08_perm_restricted_together',
    nodeId: NODE_C11_APPMATH_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: '6 flight engineers are seated in a row. Two specific specialists, Dr. Raman and Dr. Sarabhai, must ALWAYS sit together. How many arrangements exist?',
    options: [
      '240 arrangements',
      '120 arrangements',
      '720 arrangements',
      '480 arrangements',
    ],
    correctIndex: 0,
    explanation: 'Treat the 2 doctors as 1 composite block.\nWe now arrange 5 items: {Block, Eng3, Eng4, Eng5, Eng6} in 5! = 120 ways.\nInside the block, the 2 doctors rearrange in 2! = 2 ways.\nTotal valid arrangements = 5! × 2! = 120 × 2 = 240.',
    hints: [
      'Bundle the 2 people who must stay together into 1 super-unit.',
      'Now arrange 5 units: 5! = 120.',
      'Multiply by internal rearrangements of the block: 120 × 2! = 240.',
    ],
  },
  {
    id: 'ch_09_perm_restricted_never',
    nodeId: NODE_C11_APPMATH_034,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'From 6 engineers, how many row seating arrangements ensure that Dr. Raman and Dr. Sarabhai NEVER sit next to each other?',
    correctAnswer: 480,
    tolerance: 0,
    unit: 'arrangements',
    explanation: 'Total unrestricted seating arrangements = 6! = 720.\nArrangements where they sit together = 5! × 2! = 240.\nApply subtraction principle: Total - Together = 720 - 240 = 480 arrangements.',
    hints: [
      'Use the subtraction principle: Total arrangements minus "Together" arrangements.',
      'Total 6! = 720.',
      '720 - 240 = 480.',
    ],
  },
  {
    id: 'ch_10_perm_alike_banana',
    nodeId: NODE_C11_APPMATH_035,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Find the number of distinct linear signals that can be formed from the letters of the navigational beacon code CHENNAI (7 letters: C, H, E, N, N, A, I where N is repeated twice).',
    correctAnswer: 2520,
    tolerance: 0,
    unit: 'words',
    explanation: 'Total letters n = 7, with letter N repeated 2 times.\nPermutation formula for alike objects: n! / (p! · q!...)\nCalculate: 7! / 2! = 5040 / 2 = 2520 distinct permutations.',
    hints: [
      'Total letters = 7, so numerator is 7! = 5040.',
      'The letter N repeats 2 times, so denominator is 2! = 2.',
      '5040 / 2 = 2520.',
    ],
  },
  {
    id: 'ch_11_perm_circular_table_necklace',
    nodeId: NODE_C11_APPMATH_035,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare seating 8 flight controllers around a round conference table versus stringing 8 distinct optical sensor beads onto a circular satellite calibration ring (which can be flipped in 3D space).',
    options: [
      'Table: (8-1)! = 5040 ways; Ring: (8-1)!/2 = 2520 ways due to flip reflection symmetry',
      'Table: 8! = 40320 ways; Ring: 8!/2 = 20160 ways',
      'Table: (8-1)!/2 = 2520 ways; Ring: (8-1)! = 5040 ways',
      'Both have identical counts of (8-1)! = 5040 ways',
    ],
    correctIndex: 0,
    explanation: 'For circular seating with fixed orientation, arrangements = (n-1)! = 7! = 5040.\nA ring or necklace can be inverted in 3D space, making clockwise and anti-clockwise views identical.\nHence divide by 2: (n-1)! / 2 = 5040 / 2 = 2520.',
    hints: [
      'Circular permutation with fixed orientation is (n-1)!. For 8 people, 7! = 5040.',
      'If the object can be flipped over in 3D space (like a necklace/ring), divide by 2.',
      '5040 / 2 = 2520 for the ring.',
    ],
  },
  {
    id: 'ch_12_comb_symmetry_equation',
    nodeId: NODE_C11_APPMATH_036,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'If 18C(r) = 18C(r + 4), find the value of r using combination symmetry properties.',
    options: [
      'r = 7',
      'r = 4',
      'r = 9',
      'r = 8',
    ],
    correctIndex: 0,
    explanation: 'By combination symmetry property: if ⁿCₓ = ⁿCᵧ and x ≠ y, then x + y = n.\nSet the sum of indices equal to 18: r + (r + 4) = 18.\nSolve equation: 2r + 4 = 18 => 2r = 14 => r = 7.',
    hints: [
      'Recall property: if nCx = nCy and x ≠ y, then x + y = n.',
      'Set r + (r + 4) = 18.',
      '2r + 4 = 18 => 2r = 14 => r = 7.',
    ],
  },
  {
    id: 'ch_13_comb_pascal_identity',
    nodeId: NODE_C11_APPMATH_036,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'According to Pascal\'s Identity, what single binomial coefficient is equal to 14C5 + 14C6?',
    options: [
      '15C6',
      '15C5',
      '14C11',
      '28C11',
    ],
    correctIndex: 0,
    explanation: 'Pascal\'s Identity formula: ⁿCᵣ₋₁ + ⁿCᵣ = ⁿ⁺¹Cᵣ.\nHere n = 14 and r = 6.\nTherefore, ¹⁴C₅ + ¹⁴C₆ = ¹⁵C₆.',
    hints: [
      'Formula: nCr-1 + nCr = (n+1)Cr.',
      'n = 14, r = 6.',
      '(14+1)C6 = 15C6.',
    ],
  },
  {
    id: 'ch_14_comb_division_equal_groups',
    nodeId: NODE_C11_APPMATH_037,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In how many ways can 12 distinct experimental payload sensors be divided into 3 UNLABELLED equal piles of 4 sensors each?',
    options: [
      '(12C4 × 8C4 × 4C4) / 3! = 5,775 ways',
      '12C4 × 8C4 × 4C4 = 34,650 ways',
      '(12C4 × 8C4 × 4C4) / 4! = 1,443 ways',
      '12! / (4!)³ = 34,650 ways',
    ],
    correctIndex: 0,
    explanation: 'Sequential group selection gives ¹²C₄ × ⁸C₄ × ⁴C₄ = 34,650 ways.\nBecause the 3 groups are of equal size (4 each) and UNLABELLED, their 3! permutations are indistinguishable.\nDivide by 3!: 34,650 / 6 = 5,775 ways.',
    hints: [
      'Compute the sequential selections: 12C4 × 8C4 × 4C4 = 34,650.',
      'Since the piles have no names and are equal in size, order of groups does not matter.',
      'Divide by 3! = 6 to remove duplicate partitions: 34650 / 6 = 5775.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_15_comb_distribution_distinguishable',
    nodeId: NODE_C11_APPMATH_037,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: '10 distinct micro-satellites are distributed among 2 NAMED tracking ground stations (Station Alpha gets 6, Station Beta gets 4). How many distributions exist?',
    correctAnswer: 210,
    tolerance: 0,
    unit: 'ways',
    explanation: 'Because stations Alpha and Beta are named (distinguishable), select 6 for Alpha in ¹⁰C₆ ways.\nThe remaining 4 automatically go to Beta in ⁴C₄ = 1 way.\nTotal distributions = ¹⁰C₆ = 210 ways.',
    hints: [
      'Are the recipient stations named? Yes, Alpha and Beta are distinct.',
      'Choose 6 out of 10 for Alpha in 10C6 ways.',
      '10C6 = 10! / (6! 4!) = (10×9×8×7)/(4×3×2×1) = 210.',
    ],
  },
  {
    id: 'ch_16_mixed_committee_roles',
    nodeId: NODE_C11_APPMATH_038,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'From 10 ISRO mission candidates, a 4-person crew is chosen, and then 2 of them are assigned Commander and Pilot. How many ways can this entire process be executed?',
    options: [
      '10C4 × 4P2 = 210 × 12 = 2,520 ways',
      '10C4 × 4C2 = 210 × 6 = 1,260 ways',
      '10P4 = 5,040 ways',
      '10C2 × 8C2 = 45 × 28 = 1,260 ways',
    ],
    correctIndex: 0,
    explanation: 'Step 1: Choose 4 crew members from 10 in ¹⁰C₄ = 210 combinations.\nStep 2: Assign 2 distinct posts (Commander, Pilot) from the 4 selected crew in ⁴P₂ = 12 ways.\nTotal product = 210 × 12 = 2,520 ways.',
    hints: [
      'Break into two sequential stages: Select crew (combinations) then Assign posts (permutations).',
      'Stage 1: 10C4 = 210.',
      'Stage 2: 4P2 = 4 × 3 = 12. Multiply both: 210 × 12 = 2520.',
    ],
  },
  {
    id: 'ch_17_mixed_at_least_girls',
    nodeId: NODE_C11_APPMATH_038,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A 4-member robotics team is to be formed from 5 male and 4 female scientists. The team must contain AT LEAST 2 female scientists. How many distinct teams can be formed?',
    correctAnswer: 81,
    tolerance: 0,
    unit: 'teams',
    explanation: 'Partition into 3 disjoint valid cases:\nCase 1 (2F, 2M): ⁴C₂ × ⁵C₂ = 6 × 10 = 60\nCase 2 (3F, 1M): ⁴C₃ × ⁵C₁ = 4 × 5 = 20\nCase 3 (4F, 0M): ⁴C₄ × ⁵C₀ = 1 × 1 = 1\nSum of all cases = 60 + 20 + 1 = 81 teams.',
    hints: [
      'Split "at least 2 females" into 3 cases: 2F+2M, 3F+1M, 4F+0M.',
      'Case 1: 4C2 �� 5C2 = 6 × 10 = 60.',
      'Case 2: 4 × 5 = 20. Case 3: 1 × 1 = 1. Add them: 60 + 20 + 1 = 81.',
    ],
  },
  {
    id: 'ch_18_bin_pascal_row',
    nodeId: NODE_C11_APPMATH_039,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Arrange the binomial coefficients for Row 4 in Pascal\'s Triangle (expansion of (x + y)⁴) in sequential left-to-right order.',
    sortItems: ['4C0 = 1', '4C1 = 4', '4C2 = 6', '4C3 = 4', '4C4 = 1'],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Row 4 corresponds to n = 4 with 5 terms in total.\nCoefficients are: ⁴C₀ = 1, ⁴C₁ = 4, ⁴C₂ = 6, ⁴C₃ = 4, ⁴C₄ = 1.\nThe sequence is completely symmetric around the center 6.',
    hints: [
      'The row starts with 1 and ends with 1.',
      '4C1 = 4 and 4C3 = 4.',
      'The peak middle term is 4C2 = 6.',
    ],
  },
  {
    id: 'ch_19_bin_coeff_term',
    nodeId: NODE_C11_APPMATH_039,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the numerical coefficient of x³ in the binomial expansion of (x + 2)⁵.',
    correctAnswer: 40,
    tolerance: 0,
    unit: '',
    explanation: 'General term: T(k+1) = ⁵Cₖ · x^(5-k) · 2^k.\nFor term containing x³, set 5 - k = 3 => k = 2.\nEvaluate term: ⁵C₂ · x³ · 2² = 10 · x³ · 4 = 40x³.\nNumerical coefficient is 40.',
    hints: [
      'In (x + 2)^5, the term with x^3 has k = 2 because 5 - 2 = 3.',
      'Binomial coefficient is 5C2 = 10.',
      'Multiply by 2^k = 2^2 = 4: 10 × 4 = 40.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_20_bin_general_middle_even',
    nodeId: NODE_C11_APPMATH_040,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'For the expansion of (x + y)⁸ (even index n = 8), how many terms exist in total, which term is the middle term, and what is its value of k?',
    options: [
      '9 terms in total; single middle term is T(5) with k = 4',
      '8 terms in total; middle term is T(4) with k = 4',
      '9 terms in total; two middle terms T(4) and T(5)',
      '7 terms in total; middle term is T(4) with k = 3',
    ],
    correctIndex: 0,
    explanation: 'For even n = 8, number of terms = n + 1 = 9 (odd number of terms).\nSingle middle term position: (n/2 + 1) = (8/2 + 1) = 5th term T(5).\nIn the general formula T(k+1), 5th term has index k = 4.',
    hints: [
      'Number of terms in (x+y)^n is always n + 1.',
      'For n = 8, 8 + 1 = 9 terms.',
      'Middle of 9 terms is the 5th term (T5), where index k = 5 - 1 = 4.',
    ],
  },
  {
    id: 'ch_21_bin_odd_two_middle',
    nodeId: NODE_C11_APPMATH_040,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In the thermal shield expansion (2a - 3b)⁷ (odd index n = 7), which terms represent the two middle terms?',
    options: [
      'T(4) and T(5), with k = 3 and k = 4',
      'T(3) and T(4), with k = 2 and k = 3',
      'T(5) and T(6), with k = 4 and k = 5',
      'Only one middle term at T(4)',
    ],
    correctIndex: 0,
    explanation: 'For odd n = 7, total number of terms = 7 + 1 = 8 (even count).\nTwo middle terms exist at: T((7+1)/2) = T(4) and T((7+3)/2) = T(5).\nTheir respective k indices in general formula are k = 3 and k = 4.',
    hints: [
      'Odd power n = 7 gives 7 + 1 = 8 terms.',
      '8 terms have two central positions: 4th and 5th terms (T4 and T5).',
      'For T4, k = 3; for T5, k = 4.',
    ],
  },
  {
    id: 'ch_22_construct_general_term',
    nodeId: NODE_C11_APPMATH_040,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the algebraic formula for the (k+1)-th general term in the binomial expansion of (a + b)ⁿ by clicking the components in proper mathematical sequence.',
    availableParts: ['T(k+1)', '=', 'nCk', 'a^(n-k)', 'b^k', '+', 'nPr', 'k!'],
    targetState: 'T(k+1) = nCk a^(n-k) b^k',
    validationHint: 'Form the exact standard formula: T(k+1) = nCk a^(n-k) b^k',
    explanation: 'The standard (k+1)-th general term is T(k+1) = ⁿCₖ · a^(n-k) · b^k.\nHere k ranges from 0 to n, indexing every single term in the expansion.',
    hints: [
      'Start with the term identifier: T(k+1)',
      'Follow with = then the binomial coefficient nCk',
      'Multiply by the descending power a^(n-k) and ascending power b^k',
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
  nodeId: NODE_C11_APPMATH_031,
  title: 'Parabolas, Inequalities & Combinatorics Lab',
  definition: 'Comprehensive mastery of quadratic functions, method of intervals for inequalities, permutations, combinations, and the binomial theorem in applied mathematics.',
  eli5: 'Learn how parabolas chart rocket paths, how wavy curves solve safety zones, how factorials organize astronaut teams, and how Pascal\'s triangle unfolds high-power formulas!',
  misconceptions: [
    {
      misconception: 'For f(x) = ax² + bx + c, the vertex is always a minimum regardless of a',
      correction: 'If a > 0 the curve opens upward (minimum vertex); if a < 0 it opens downward (maximum vertex).',
    },
    {
      misconception: 'Multiplying or dividing an inequality by a negative number preserves the sign direction',
      correction: 'Whenever you multiply or divide by a negative number, the inequality sign MUST reverse direction.',
    },
    {
      misconception: 'A quadratic inequality solution is just the two root numbers, not intervals',
      correction: 'Quadratic inequalities yield continuous interval ranges on the number line, not just isolated roots.',
    },
    {
      misconception: 'Unlabelled equal group divisions do not need division by factorial',
      correction: 'When n items are partitioned into k unlabelled groups of equal size, divide by k! to eliminate overcounting.',
    },
    {
      misconception: 'The coefficient of x^k in (x + c)^n is just nCk without raising c to power',
      correction: 'The complete coefficient is nC(n-k) × c^(n-k) or nCk × c^k depending on positioning; the constant c MUST be raised to its exponent.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the axis of symmetry for f(x) = ax² + bx + c?', options: ['x = -b/(2a)', 'x = b/(2a)', 'x = -c/a', 'x = -b/a'], correctIndex: 0 },
    { question: 'If -2x < 10, what is the solved inequality?', options: ['x > -5', 'x < -5', 'x > 5', 'x < 5'], correctIndex: 0 },
    { question: 'What is the value of (x - 4)² ≥ 0 for real x?', options: ['All real numbers (-∞, ∞)', 'Only x = 4', 'No real solutions', '[4, ���)'], correctIndex: 0 },
    { question: 'Evaluate 5P2:', options: ['20', '10', '60', '120'], correctIndex: 0 },
    { question: 'How many distinct words can be made from letters of LEVEL (5 letters: 2 L, 2 E, 1 V)?', options: ['30', '120', '60', '15'], correctIndex: 0 },
    { question: 'What is 10C3 equal to by symmetry?', options: ['10C7', '10C3', '7C3', '10C0'], correctIndex: 0 },
    { question: 'Number of terms in the expansion of (a + b)⁹ is:', options: ['10', '9', '8', '11'], correctIndex: 0 },
    { question: 'In (x + y)⁶, the single middle term is at position:', options: ['4th term T(4)', '3rd term T(3)', '5th term T(5)', '6th term T(6)'], correctIndex: 0 },
  ],
  masteryCriteria: 'Demonstrate rigorous competency across parabolas, inequality intervals, permutations with restrictions, combinations group distributions, and binomial expansions.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Parabola Trajectory & Vertex Control',
    instruction: 'Adjust the sliders for quadratic coefficients a, b, and c to observe vertex shifts, axis of symmetry, and roots in real time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_APPMATH_031,
  },
  {
    title: 'Lab 2: Method of Intervals (Wavy Curve)',
    instruction: 'Change the root milestones r1 and r2 to inspect where the quadratic curve is positive (+) vs negative (-).',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_APPMATH_033,
  },
  {
    title: 'Lab 3: Permutations & Restricted Bundling',
    instruction: 'Toggle the "Bundle Together" switch to see how treating two specialists as a super-object cuts down available row configurations.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_APPMATH_034,
  },
  {
    title: 'Lab 4: Combinations & Unlabelled Group Partition',
    instruction: 'Toggle between Labelled Stations vs Unlabelled Bins to visualize why equal-sized groups require division by k!.',
    interactionType: 'drag-match',
    nodeId: NODE_C11_APPMATH_037,
  },
  {
    title: 'Lab 5: Pascal\'s Triangle & General Term Navigator',
    instruction: 'Select expansion power n and step through k to locate individual terms, binomial coefficients, and middle terms.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_APPMATH_039,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Mission Flight Dynamics & Logistics Architecture',
  description: 'Apply ISRO mathematical modelling: optimize a sounding rocket trajectory vertex, budget sensor battery burn intervals, arrange antenna arrays with circular rotation invariance, and compute high-order payload thermal expansion using the Binomial general term.',
  steps: [
    '1. Trajectory Optimization: Set a = -4.9, b = 98 to pinpoint apex apogee time and maximum flight altitude.',
    '2. Safety Threshold: Solve safety burn inequality 5t² - 45t + 100 ≤ 0 using interval factorisation.',
    '3. Transponder Codes: Calculate 8P3 distinct radio channels without frequency duplication.',
    '4. Heat Shield Expansion: Use T(k+1) = nCk a^(n-k) b^k to find the 4th expansion mode of (x + 3y)⁶.',
  ],
};

function C11_AppliedMathsGraphQuadraticFunctionSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['appmath'] || { name: 'Applied Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery -> predict -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'predict' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Prediction phase state (Brilliant predict-then-check)
  const [activePredictionIdx, setActivePredictionIdx] = useState(0);
  const [predictionSelected, setPredictionSelected] = useState<number | null>(null);
  const [predictionSubmitted, setPredictionSubmitted] = useState(false);

  // Lab 1: Quadratic coefficients with real-time slider state
  const [coeffA, setCoeffA] = useState<number>(-1);
  const [coeffB, setCoeffB] = useState<number>(4);
  const [coeffC, setCoeffC] = useState<number>(5);

  // Lab 2: Interval roots
  const [root1, setRoot1] = useState<number>(-2);
  const [root2, setRoot2] = useState<number>(3);
  const [testPointX, setTestPointX] = useState<number>(0);

  // Lab 3: Permutation state
  const [bundleTogether, setBundleTogether] = useState<boolean>(false);
  const [totalItemsN, setTotalItemsN] = useState<number>(5);

  // Lab 4: Group partition toggle
  const [groupsLabelled, setGroupsLabelled] = useState<boolean>(false);

  // Lab 5: Binomial navigator
  const [binomialPowerN, setBinomialPowerN] = useState<number>(5);
  const [selectedTermK, setSelectedTermK] = useState<number>(2);

  // Adaptive mastery & scoring
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints & Progressive disclosure explanation state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(1);

  // Drag & drop state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);

  // Numeric & Construct challenge state
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Active tab in Complete view
  const [activeCompleteTab, setActiveCompleteTab] = useState<'summary' | 'misconceptions' | 'reflection' | 'activity'>('summary');

  // Persisting BKT state
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Canvas ref for animated particle / trajectory loop
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOTIVATIONAL FEEDBACK HELPER ───
  const getMotivationalFeedback = (errCount: number) => {
    if (errCount === 0) return 'PERFECT SCORE!';
    if (errCount <= 3) return 'Great work!';
    if (errCount <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  };

  // ─── MOUNT MASTERY INITIALIZATION ───
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
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS ANIMATION (Quadratic Trajectory Sparkle Effect) ───
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

      // Draw subtle grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Parabolic trajectory line
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const originX = 40;
      const originY = canvas.height - 30;
      for (let px = 0; px < canvas.width - 60; px += 4) {
        const t = px / 35;
        const simY = -(-0.18 * t * t + 1.6 * t) * 25;
        const drawX = originX + px;
        const drawY = originY + simY;
        if (px === 0) ctx.moveTo(drawX, drawY);
        else ctx.lineTo(drawX, drawY);
      }
      ctx.stroke();

      // Pulsing Apex / Rocket marker
      const markerT = ((frame * 0.8) % (canvas.width - 100)) / 35;
      const markerY = -(-0.18 * markerT * markerT + 1.6 * markerT) * 25;
      const markerDrawX = originX + markerT * 35;
      const markerDrawY = originY + markerY;

      ctx.beginPath();
      ctx.arc(markerDrawX, markerDrawY, 5 + Math.sin(frame * 0.1) * 2, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── DERIVED QUADRATIC CALCULATIONS (Lab 1) ───
  const quadCalculations = useMemo(() => {
    const a = coeffA;
    const b = coeffB;
    const c = coeffC;
    const isMax = a < 0;
    const vertexX = a !== 0 ? -b / (2 * a) : 0;
    const vertexY = a * vertexX * vertexX + b * vertexX + c;
    const discriminant = b * b - 4 * a * c;
    let roots: number[] = [];
    if (discriminant > 0 && a !== 0) {
      roots = [
        (-b + Math.sqrt(discriminant)) / (2 * a),
        (-b - Math.sqrt(discriminant)) / (2 * a),
      ].sort((p, q) => p - q);
    } else if (discriminant === 0 && a !== 0) {
      roots = [-b / (2 * a)];
    }
    return { isMax, vertexX, vertexY, discriminant, roots };
  }, [coeffA, coeffB, coeffC]);

  // ─── DERIVED PASCAL ROW (Lab 5) ───
  const pascalRow = useMemo(() => {
    const n = binomialPowerN;
    const row: number[] = [];
    let c = 1;
    for (let r = 0; r <= n; r++) {
      row.push(c);
      c = (c * (n - r)) / (r + 1);
    }
    return row;
  }, [binomialPowerN]);

  // ─── FACTORIAL HELPER ───
  const factorial = useCallback((num: number): number => {
    if (num <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= num; i++) res *= i;
    return res;
  }, []);

  // ─── ESCALATING HINTS CALLBACK ───
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

  // ─── AUTO-HINT INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── DISCOVERY HANDLER ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding physics insight!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── PHASE ADVANCE HANDLERS ───
  const handleAdvanceToPrediction = useCallback(() => {
    setPhase('predict');
    setActivePredictionIdx(0);
    setPredictionSelected(null);
    setPredictionSubmitted(false);
    audioManager.play('whoosh');
    speechManager.speak('First, test your intuitive mathematical predictions before launching the lab.');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Applied Maths Lab. Manipulate the equations and observe changes.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now test and explore freely in sandbox mode with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setRevealedSteps(1);
    audioManager.play('whoosh');
    speechManager.speak('Mission active. Solve the quantitative flight challenges.');
  }, []);

  // ─── PREDICTION SUBMIT HANDLER ───
  const handlePredictionSubmit = useCallback(() => {
    if (predictionSelected === null) return;
    setPredictionSubmitted(true);
    const pred = PREDICTION_QUESTIONS[activePredictionIdx];
    const isCorrect = predictionSelected === pred.correctIndex;
    audioManager.play(isCorrect ? 'success' : 'tap');
  }, [predictionSelected, activePredictionIdx]);

  const handleNextPrediction = useCallback(() => {
    if (activePredictionIdx + 1 < PREDICTION_QUESTIONS.length) {
      setActivePredictionIdx(prev => prev + 1);
      setPredictionSelected(null);
      setPredictionSubmitted(false);
      audioManager.play('whoosh');
    } else {
      handleAdvanceToExploration();
    }
  }, [activePredictionIdx, handleAdvanceToExploration]);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Mission accomplished! Exceptional quantitative analysis.');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───
  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setRevealedSteps(1);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setConstructParts([]);
    setWrongShake(false);
    setWrongFlash(false);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // ─── ANSWER HANDLER ───
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
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Impeccable deduction.');
      setShowConfetti(true);
      setShowExplanation(true);
      setRevealedSteps(1);
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
        setRevealedSteps(1);
        speechManager.speak('Let us review the complete mathematical proof.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, resetInactivityTimer, showNextHint]);

  // ─── DRAG HANDLERS ───
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
      const arr = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── CLEANUP TIMER ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Split explanation into discrete progressive disclosure steps
  const explanationSteps = useMemo(() => {
    if (!challenge.explanation) return [];
    const lines = challenge.explanation.split('\n').filter(s => s.trim().length > 0);
    if (lines.length > 1) return lines;
    return challenge.explanation
      .split(/(?<=[.!?])\s+/)
      .filter(s => s.trim().length > 0);
  }, [challenge.explanation]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/80 rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-xl bg-indigo-600/30 flex items-center justify-center text-3xl border border-indigo-500/40 shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-800">
                ISC Class 11 Applied Maths
              </span>
              <span className="text-xs text-slate-400 font-mono">10 Competency Units</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-3">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/70 border-emerald-600 text-emerald-400'
                : difficulty === 'advanced'
                ? 'bg-rose-950/70 border-rose-600 text-rose-400'
                : 'bg-indigo-950/70 border-indigo-500 text-indigo-300'
            }`}
          >
            {difficulty} Tier
          </motion.div>
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-slate-400 uppercase font-bold">Phase</p>
            <p className="text-sm font-bold text-amber-400 capitalize">{phase}</p>
          </div>
        </div>
      </motion.div>

      {/* ─── DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-2 uppercase tracking-wider">
              <span>🚀</span> Mission Scenario
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-slate-400">
              <span className="font-semibold text-slate-200">Flight Telemetry:</span> {SCENARIO.context}
            </div>
          </div>

          {/* Interactive Sparkle Canvas */}
          <div className="relative p-4 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Live ISRO Sounding Rocket Trajectory Simulation</span>
              <span className="text-xs text-amber-400 font-mono">h(t) = -5t² + 40t + 10</span>
            </div>
            <canvas ref={canvasRef} width={640} height={160} className="w-full rounded-xl bg-slate-950 border border-slate-800" />
          </div>

          {/* Curiosity Hook Question */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-white">
              <span className="text-indigo-400 mr-2">Curiosity Diagnostic:</span>
              {DISCOVERY_QUESTION.question}
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-xl font-medium text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect && i === 1
                      ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                      : 'bg-slate-800/80 border-slate-700 hover:bg-slate-750 text-slate-200'
                  }`}
                >
                  <span className="font-bold text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 mt-4">
                <p className={`text-sm mb-4 ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! The quadratic vertex gives the exact peak apogee.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToPrediction}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl shadow-lg flex items-center gap-2"
                >
                  <span>Begin Predict-Then-Check Phase</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PREDICTION PHASE (Brilliant.org Predict-then-Check Pattern) ─── */}
      {phase === 'predict' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Brilliant Predict-Then-Check • Question {activePredictionIdx + 1} of {PREDICTION_QUESTIONS.length}
              </span>
              <p className="text-sm font-semibold text-white">Make your hypothesis before manipulating the live simulators</p>
            </div>
            <span className="text-xs font-mono px-3 py-1 bg-slate-950 rounded-lg border border-slate-800 text-slate-400">
              {activePredictionIdx + 1}/{PREDICTION_QUESTIONS.length}
            </span>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {PREDICTION_QUESTIONS[activePredictionIdx].question}
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {PREDICTION_QUESTIONS[activePredictionIdx].options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 3 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => !predictionSubmitted && setPredictionSelected(i)}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                    predictionSelected === i && !predictionSubmitted
                      ? 'bg-indigo-600/30 border-indigo-500 text-white'
                      : predictionSubmitted && i === PREDICTION_QUESTIONS[activePredictionIdx].correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : predictionSubmitted && predictionSelected === i && i !== PREDICTION_QUESTIONS[activePredictionIdx].correctIndex
                      ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                      : 'bg-slate-800/80 border-slate-700 hover:bg-slate-750 text-slate-200'
                  }`}
                >
                  <span className="font-bold text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {!predictionSubmitted ? (
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handlePredictionSubmit}
                  disabled={predictionSelected === null}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow disabled:opacity-40"
                >
                  Confirm Hypothesis & Check
                </motion.button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">🔎 How to Verify in Lab:</span>
                </div>
                <p className="text-xs text-amber-200 bg-amber-950/40 p-3 rounded-lg border border-amber-900/60 font-medium">
                  {PREDICTION_QUESTIONS[activePredictionIdx].verifyInstruction}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {PREDICTION_QUESTIONS[activePredictionIdx].explanation}
                </p>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNextPrediction}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow"
                  >
                    {activePredictionIdx + 1 < PREDICTION_QUESTIONS.length ? 'Next Prediction Question →' : 'Launch Interactive Lab Explorations →'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── EXPLORATION PHASE (Interactive Labs) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Lab Step Tabs */}
          <div className="flex flex-wrap gap-2 p-2 bg-slate-900 rounded-2xl border border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCurrentSlide(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  currentSlide === idx
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white'
                }`}
              >
                Lab {idx + 1}: {step.title.split(':')[1]?.trim() || step.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
                  <p className="text-xs text-amber-400 mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
                </div>
                <span className="text-xs font-mono text-slate-500 uppercase bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                  Unit: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>

              {/* ── LAB 1: Quadratic Trajectory Visualization with Real-Time Direct Slider Binding ── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5 space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">Quadratic Coefficients</h3>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>a (Curvature & Direction)</span>
                        <span className="font-mono text-white font-bold">{coeffA}</span>
                      </div>
                      <input
                        type="range"
                        min={-3}
                        max={3}
                        step={0.5}
                        value={coeffA}
                        onChange={(e) => setCoeffA(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Set quadratic coefficient a"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>b (Linear Tilt)</span>
                        <span className="font-mono text-white font-bold">{coeffB}</span>
                      </div>
                      <input
                        type="range"
                        min={-8}
                        max={8}
                        step={1}
                        value={coeffB}
                        onChange={(e) => setCoeffB(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Set quadratic coefficient b"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>c (y-intercept)</span>
                        <span className="font-mono text-white font-bold">{coeffC}</span>
                      </div>
                      <input
                        type="range"
                        min={-10}
                        max={10}
                        step={1}
                        value={coeffC}
                        onChange={(e) => setCoeffC(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Set quadratic constant c"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>Equation:</span>
                        <span className="font-mono text-indigo-300 font-bold">
                          f(x) = {coeffA}x² {coeffB >= 0 ? `+ ${coeffB}` : coeffB}x {coeffC >= 0 ? `+ ${coeffC}` : coeffC}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Vertex Type:</span>
                        <span className={`font-bold ${quadCalculations.isMax ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {quadCalculations.isMax ? 'MAXIMUM (Hill Peak)' : 'MINIMUM (Valley Bottom)'}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Vertex Coordinates:</span>
                        <span className="font-mono text-white">({quadCalculations.vertexX.toFixed(2)}, {quadCalculations.vertexY.toFixed(2)})</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Discriminant (b² - 4ac):</span>
                        <span className="font-mono text-white">{quadCalculations.discriminant.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  {/* SVG Live Graph */}
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                    <svg viewBox="-80 -60 160 120" className="w-full h-64 overflow-visible">
                      <line x1="-75" y1="0" x2="75" y2="0" stroke="#334155" strokeWidth="0.8" />
                      <line x1="0" y1="-55" x2="0" y2="55" stroke="#334155" strokeWidth="0.8" />

                      {coeffA !== 0 && (
                        <line
                          x1={quadCalculations.vertexX * 6}
                          y1="-50"
                          x2={quadCalculations.vertexX * 6}
                          y2="50"
                          stroke="#eab308"
                          strokeWidth="0.8"
                          strokeDasharray="2,2"
                        />
                      )}

                      <path
                        d={(() => {
                          const points: string[] = [];
                          for (let px = -10; px <= 10; px += 0.25) {
                            const py = coeffA * px * px + coeffB * px + coeffC;
                            const sx = px * 6;
                            const sy = -py * 2.5;
                            if (Math.abs(sy) < 55) {
                              points.push(`${points.length === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
                            }
                          }
                          return points.join(' ');
                        })()}
                        fill="none"
                        stroke={coeffA < 0 ? '#f43f5e' : '#10b981'}
                        strokeWidth="2.5"
                      />

                      {coeffA !== 0 && (
                        <circle
                          cx={quadCalculations.vertexX * 6}
                          cy={-quadCalculations.vertexY * 2.5}
                          r="3"
                          fill="#facc15"
                          stroke="#000"
                          strokeWidth="0.8"
                        />
                      )}

                      <text x="70" y="-4" fill="#64748b" fontSize="4" textAnchor="end">x</text>
                      <text x="4" y="-50" fill="#64748b" fontSize="4">y</text>
                      {coeffA !== 0 && (
                        <text
                          x={quadCalculations.vertexX * 6 + 4}
                          y={-quadCalculations.vertexY * 2.5 - 4}
                          fill="#facc15"
                          fontSize="4"
                          fontWeight="bold"
                        >
                          V({quadCalculations.vertexX.toFixed(1)}, {quadCalculations.vertexY.toFixed(1)})
                        </text>
                      )}
                    </svg>

                    <div className="text-center text-xs text-slate-400 mt-2">
                      Parabola opens <span className="font-bold text-white">{coeffA < 0 ? 'DOWNWARD' : 'UPWARD'}</span> (a = {coeffA}) with Axis of Symmetry at <span className="font-mono text-amber-400">x = {quadCalculations.vertexX.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 2: Method of Intervals (Wavy Curve) ── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Critical Root 1 (r₁): <span className="text-indigo-300 font-bold">{root1}</span></label>
                      <input
                        type="range"
                        min={-5}
                        max={0}
                        step={1}
                        value={root1}
                        onChange={(e) => setRoot1(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Set critical root 1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Critical Root 2 (r₂): <span className="text-indigo-300 font-bold">{root2}</span></label>
                      <input
                        type="range"
                        min={1}
                        max={6}
                        step={1}
                        value={root2}
                        onChange={(e) => setRoot2(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Set critical root 2"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Test Probe Point (x): <span className="text-amber-400 font-bold">{testPointX}</span></label>
                      <input
                        type="range"
                        min={-6}
                        max={7}
                        step={0.5}
                        value={testPointX}
                        onChange={(e) => setTestPointX(Number(e.target.value))}
                        className="w-full accent-amber-500"
                        aria-label="Set test probe point"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="-80 -30 160 60" className="w-full h-36">
                      <line x1="-70" y1="0" x2="70" y2="0" stroke="#475569" strokeWidth="1.5" />
                      <polygon points="70,-2 74,0 70,2" fill="#475569" />
                      <polygon points="-70,-2 -74,0 -70,2" fill="#475569" />

                      <rect x="-70" y="-18" width={root1 * 10 + 70} height="36" fill="#10b981" fillOpacity="0.12" rx="4" />
                      <rect x={root1 * 10} y="-18" width={(root2 - root1) * 10} height="36" fill="#f43f5e" fillOpacity="0.12" rx="4" />
                      <rect x={root2 * 10} y="-18" width={70 - root2 * 10} height="36" fill="#10b981" fillOpacity="0.12" rx="4" />

                      <circle cx={root1 * 10} cy="0" r="3" fill="#6366f1" />
                      <text x={root1 * 10} y="8" textAnchor="middle" fill="#818cf8" fontSize="4.5" fontWeight="bold">{root1}</text>
                      <text x={root1 * 10} y="-6" textAnchor="middle" fill="#cbd5e1" fontSize="3.5">Root r₁</text>

                      <circle cx={root2 * 10} cy="0" r="3" fill="#6366f1" />
                      <text x={root2 * 10} y="8" textAnchor="middle" fill="#818cf8" fontSize="4.5" fontWeight="bold">{root2}</text>
                      <text x={root2 * 10} y="-6" textAnchor="middle" fill="#cbd5e1" fontSize="3.5">Root r₂</text>

                      <text x={(root1 * 10 - 70) / 2} y="-6" textAnchor="middle" fill="#34d399" fontSize="6" fontWeight="bold">+</text>
                      <text x={(root1 * 10 + root2 * 10) / 2} y="-6" textAnchor="middle" fill="#fb7185" fontSize="6" fontWeight="bold">-</text>
                      <text x={(root2 * 10 + 70) / 2} y="-6" textAnchor="middle" fill="#34d399" fontSize="6" fontWeight="bold">+</text>

                      <circle cx={testPointX * 10} cy="0" r="4" fill="#f59e0b" stroke="#fff" strokeWidth="0.8" />
                      <line x1={testPointX * 10} y1="-15" x2={testPointX * 10} y2="15" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="1,1" />
                      <text x={testPointX * 10} y="-17" textAnchor="middle" fill="#f59e0b" fontSize="4" fontWeight="bold">
                        Probe x={testPointX} ({((testPointX - root1) * (testPointX - root2)) >= 0 ? '+' : '-'})
                      </text>
                    </svg>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4 text-xs">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-emerald-400 font-bold block mb-1">For (x - r₁)(x - r₂) ≥ 0:</span>
                        <span className="font-mono text-slate-200">Solution Interval: (-∞, {root1}] ∪ [{root2}, ∞)</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-rose-400 font-bold block mb-1">For (x - r₁)(x - r₂) ≤ 0:</span>
                        <span className="font-mono text-slate-200">Solution Interval: [{root1}, {root2}]</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: Permutations & Bundling Visualizer ── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 uppercase font-bold">Total Flight Specialists:</span>
                      <div className="flex gap-1.5">
                        {[4, 5, 6, 7].map(num => (
                          <motion.button
                            key={num}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setTotalItemsN(num)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold ${
                              totalItemsN === num ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {num}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 font-bold">Specialist Restriction:</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setBundleTogether(prev => !prev)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          bundleTogether
                            ? 'bg-amber-600/30 border-amber-500 text-amber-300'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        {bundleTogether ? '✓ Specialist Pair BUNDLED (Always Together)' : 'Unrestricted Free Seating'}
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                      {bundleTogether ? (
                        <>
                          <div className="flex gap-1.5 p-2 bg-amber-950/60 border-2 border-amber-500 rounded-2xl shadow-lg">
                            <span className="px-3 py-2 bg-amber-600 text-white rounded-lg text-xs font-bold">Dr. Raman</span>
                            <span className="px-3 py-2 bg-amber-600 text-white rounded-lg text-xs font-bold">Dr. Sarabhai</span>
                          </div>
                          {Array.from({ length: totalItemsN - 2 }).map((_, i) => (
                            <div key={i} className="px-3.5 py-3.5 bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold">
                              Eng {i + 3}
                            </div>
                          ))}
                        </>
                      ) : (
                        Array.from({ length: totalItemsN }).map((_, i) => (
                          <div key={i} className="px-3.5 py-3.5 bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold">
                            {i === 0 ? 'Dr. Raman' : i === 1 ? 'Dr. Sarabhai' : `Eng ${i + 1}`}
                          </div>
                        ))
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-center text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block mb-1">Unrestricted ⁿPₙ</span>
                        <span className="text-base font-bold text-white">{factorial(totalItemsN)} ways</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-amber-400 block mb-1">Together (Super-Object)</span>
                        <span className="text-base font-bold text-amber-300">
                          {factorial(totalItemsN - 1)} × 2! = {factorial(totalItemsN - 1) * 2} ways
                        </span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-rose-400 block mb-1">Never Together (Subtracted)</span>
                        <span className="text-base font-bold text-rose-300">
                          {factorial(totalItemsN) - factorial(totalItemsN - 1) * 2} ways
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: Combinations & Equal Group Division ── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-slate-400 font-bold">Scenario: Dividing 6 Dissimilar Sensors into 2 Groups of 3</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setGroupsLabelled(prev => !prev)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        groupsLabelled
                          ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                          : 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                      }`}
                    >
                      {groupsLabelled ? 'Distinguishable: Named Ground Stations A & B' : 'Indistinguishable: 2 Unlabelled Bins'}
                    </motion.button>
                  </div>

                  <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300">{groupsLabelled ? 'Station Alpha (3)' : 'Pile 1 (3 items)'}</span>
                        <span className="text-[10px] text-indigo-400">6C3 = 20 ways</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-xs">S1</span>
                        <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-xs">S2</span>
                        <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-xs">S3</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300">{groupsLabelled ? 'Station Beta (3)' : 'Pile 2 (3 items)'}</span>
                        <span className="text-[10px] text-indigo-400">3C3 = 1 way</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center font-bold text-xs">S4</span>
                        <span className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center font-bold text-xs">S5</span>
                        <span className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center font-bold text-xs">S6</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
                    <span className="text-slate-300">Total Valid Combinations:</span>
                    <span className="font-mono text-base font-bold text-amber-400">
                      {groupsLabelled ? '6C3 × 3C3 = 20 distributions' : '(6C3 × 3C3) / 2! = 10 unlabelled divisions'}
                    </span>
                  </div>
                </div>
              )}

              {/* ── LAB 5: Pascal's Triangle & General Term ── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 font-bold">Select Power (n):</span>
                      <div className="flex gap-1.5">
                        {[3, 4, 5, 6].map(p => (
                          <motion.button
                            key={p}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setBinomialPowerN(p);
                              setSelectedTermK(k => Math.min(k, p));
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-bold ${
                              binomialPowerN === p ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            (x + y)^{p}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 font-mono">
                      Total Terms = <span className="text-white font-bold">{binomialPowerN + 1}</span>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-xs text-indigo-300 uppercase font-bold mb-3">
                      Row {binomialPowerN} Coefficients ({binomialPowerN}C₀ ... {binomialPowerN}C_{binomialPowerN})
                    </span>

                    <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                      {pascalRow.map((coeff, k) => (
                        <motion.button
                          key={k}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedTermK(k)}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                            selectedTermK === k
                              ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/40'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-lg font-extrabold">{coeff}</span>
                          <span className="text-[10px] text-slate-400 mt-0.5">T({k + 1}) [k={k}]</span>
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 w-full text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Inspecting Term:</span>
                        <span className="font-bold text-amber-400">T({selectedTermK + 1}) — {selectedTermK + 1}th term</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Formula:</span>
                        <span className="font-mono text-indigo-300 font-bold">
                          T({selectedTermK + 1}) = {binomialPowerN}C{selectedTermK} · x^({binomialPowerN - selectedTermK}) · y^({selectedTermK})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Evaluated Term:</span>
                        <span className="font-mono text-emerald-400 font-bold">
                          {pascalRow[selectedTermK]} x^{binomialPowerN - selectedTermK} y^{selectedTermK}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-mono">
              Laboratory {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-md"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── SANDBOX FREE PLAY PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-1">Free Experimentation Flight Deck</h2>
            <p className="text-slate-400 text-xs">Manipulate quadratic curvature, test intervals, and expand binomial powers with real-time feedback and zero grading constraints.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quadratic Sandbox with direct live reactive sliders */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-300 uppercase">Interactive Parabola Apex Sandbox</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Curvature a:</span>
                    <span className="font-mono text-white font-bold">{coeffA}</span>
                  </div>
                  <input
                    type="range"
                    min={-3}
                    max={3}
                    step={0.5}
                    value={coeffA}
                    onChange={(e) => setCoeffA(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                    aria-label="Sandbox quadratic coefficient a"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Slope b:</span>
                    <span className="font-mono text-white font-bold">{coeffB}</span>
                  </div>
                  <input
                    type="range"
                    min={-8}
                    max={8}
                    step={1}
                    value={coeffB}
                    onChange={(e) => setCoeffB(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                    aria-label="Sandbox quadratic coefficient b"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400">Calculated Vertex:</span>{' '}
                <span className="font-mono font-bold text-amber-400">
                  ({quadCalculations.vertexX.toFixed(2)}, {quadCalculations.vertexY.toFixed(2)}) [{quadCalculations.isMax ? 'MAX' : 'MIN'}]
                </span>
              </div>
            </div>

            {/* Binomial Sandbox */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-purple-300 uppercase">Binomial Expansion Navigator</h3>
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Power n:</span>
                  <span className="font-mono text-white font-bold">{binomialPowerN}</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={7}
                  step={1}
                  value={binomialPowerN}
                  onChange={(e) => setBinomialPowerN(Number(e.target.value))}
                  className="w-full accent-purple-500"
                  aria-label="Sandbox binomial power n"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400 block mb-1">Pascal Row {binomialPowerN}:</span>
                <span className="font-mono font-bold text-indigo-300">{pascalRow.join('  —  ')}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl shadow-lg flex items-center gap-2"
            >
              <span>Ready for Quantitative Challenges!</span>
              <span>→</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress Header */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  Unit: {challenge.nodeId} • Competency: <span className="text-amber-300 capitalize">{challenge.competencyLevel}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 font-mono">
                  Correct: {scoreBreakdown.correct} / {scoreBreakdown.total}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-relaxed">
              {challenge.question}
            </h3>

            {/* 1. MCQ Challenges */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015, x: 4 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl font-medium text-sm transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 border-slate-700 hover:bg-slate-750 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* 2. Drag-Label Diagram */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['feat_vertex', 'feat_axis', 'feat_yint', 'feat_roots'].map(targetKey => (
                    <div
                      key={targetKey}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetKey)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[70px]"
                    >
                      <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">
                        Target: {targetKey.replace('feat_', '')}
                      </span>
                      <span className="text-xs font-bold text-amber-300">
                        {droppedLabels[targetKey] || 'Drop Label Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {/* 3. Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-xs font-medium text-slate-200 cursor-grab active:cursor-grabbing flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-700 flex items-center justify-center font-bold text-slate-300 text-xs">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Confirm Sorted Sequence
                </motion.button>
              </div>
            )}

            {/* 4. Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numerical answer"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                    aria-label="Enter numerical answer"
                  />
                  {challenge.unit && <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow disabled:opacity-40"
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-3 py-1 bg-indigo-900/90 text-indigo-200 border border-indigo-700 rounded-lg text-xs font-mono flex items-center gap-1.5">
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 font-bold ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-slate-500 text-xs italic">Click formula components above in sequential order</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow disabled:opacity-40"
                >
                  Verify Constructed Formula
                </motion.button>
              </div>
            )}

            {/* CLICK-TO-REVEAL Progressive Step-by-Step Disclosure */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-indigo-950/50 border border-indigo-800 rounded-xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
                    <span>💡</span> Rigorous Mathematical Derivation
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Step {revealedSteps} of {explanationSteps.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {explanationSteps.slice(0, revealedSteps).map((stepText, sIdx) => (
                    <motion.div
                      key={sIdx}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans"
                    >
                      <span className="font-bold text-indigo-400 mr-2">Step {sIdx + 1}:</span>
                      {stepText}
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {revealedSteps < explanationSteps.length ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(prev => prev + 1)}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
                    >
                      <span>Show next step</span>
                      <span>({revealedSteps + 1}/{explanationSteps.length})</span>
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2"
                    >
                      <span>{currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission Score' : 'Proceed to Next Challenge'}</span>
                      <span>→</span>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── COMPLETION PHASE WITH SPACED REPETITION VISIBILITY ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-indigo-950/80 to-slate-900 rounded-3xl border border-indigo-800 shadow-2xl text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
              className="w-20 h-20 rounded-3xl bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-4xl shadow-inner"
            >
              🚀
            </motion.div>

            {/* Motivational Banner */}
            <div className="inline-block px-5 py-2 rounded-2xl bg-amber-500/20 border border-amber-400/50 shadow-md">
              <span className="text-xl sm:text-2xl font-black text-amber-300 tracking-wide uppercase">
                {getMotivationalFeedback(errors)}
              </span>
            </div>

            <h2 className="text-3xl font-extrabold text-white tracking-tight">Mission Simulation Complete!</h2>
            <p className="text-slate-300 text-sm max-w-lg mx-auto">
              You have successfully commanded mathematical flight operations across quadratic trajectories, inequality intervals, combinatorics permutations, and binomial expansions.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Accuracy Score</p>
                <p className="text-xl font-mono font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Total Errors</p>
                <p className="text-xl font-mono font-bold text-amber-400">{errors}</p>
              </div>
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase font-bold">BKT Mastery</p>
                <p className="text-xl font-bold text-indigo-300 capitalize">{masteryLevel}</p>
              </div>
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Spaced Repetition</p>
                <p className="text-xs font-bold text-purple-300">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </p>
              </div>
            </div>

            {/* SRS Prominent Notification Banner */}
            <div className="p-4 bg-purple-950/50 border border-purple-800 rounded-2xl max-w-xl mx-auto text-left flex items-center gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <p className="text-xs font-bold text-purple-200 uppercase tracking-wider">Spaced Repetition Schedule (SM-2)</p>
                <p className="text-xs text-purple-300">
                  Optimal memory retention target: <span className="font-bold text-white underline">{errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}</span> to lock in these applied mathematics concepts.
                </p>
              </div>
            </div>
          </div>

          {/* Tab navigation for complete phase */}
          <div className="flex flex-wrap gap-2 p-2 bg-slate-900 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveCompleteTab('summary')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCompleteTab === 'summary' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Motivational Feedback
            </button>
            <button
              onClick={() => setActiveCompleteTab('misconceptions')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCompleteTab === 'misconceptions' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Misconceptions Profile ({hitMisconceptions.length})
            </button>
            <button
              onClick={() => setActiveCompleteTab('reflection')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCompleteTab === 'reflection' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Reflective Thinking
            </button>
            <button
              onClick={() => setActiveCompleteTab('activity')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCompleteTab === 'activity' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Real-World Capstone
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            {activeCompleteTab === 'summary' && (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800">
                  <p className="text-emerald-300 text-sm font-semibold leading-relaxed">
                    <span className="font-extrabold text-amber-300 block mb-1">
                      {getMotivationalFeedback(errors)}
                    </span>
                    {errors === 0
                      ? 'Your mastery of ISC Class 11 Applied Mathematics topics is exemplary. Every trajectory, inequality interval, and combinatorial expansion was executed with precision!'
                      : errors <= 3
                      ? 'You demonstrated firm command of parabolic extrema, the wavy curve method, and permutations. Review the few missed concepts below to seal your 100% board exam readiness.'
                      : errors <= 7
                      ? 'You are constructing deep mathematical reasoning step by step. Review the diagnostic misconceptions below and re-run the interactive labs to master the concepts.'
                      : 'Keep practicing! With repeated interaction and conceptual review, you will master every formula and interval.'}
                  </p>
                </div>
              </div>
            )}

            {activeCompleteTab === 'misconceptions' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-rose-300 uppercase">Diagnosed Misconceptions & Corrections</h3>
                {DEFAULT_PROPS.misconceptions?.map((m, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <p className="text-xs font-bold text-rose-400">❌ {m.misconception}</p>
                    <p className="text-xs text-emerald-300">✓ {m.correction}</p>
                  </div>
                ))}
              </div>
            )}

            {activeCompleteTab === 'reflection' && (
              <div className="space-y-3 text-xs text-slate-300">
                <h3 className="text-sm font-bold text-indigo-300 uppercase">Metacognitive Reflection Prompts</h3>
                <ul className="space-y-2 list-disc list-inside text-slate-400">
                  <li>Why does multiplying an inequality by a negative number reverse the direction on a number line?</li>
                  <li>How does the symmetry of Pascal\'s Triangle relate to the combination identity ⁿCᵣ = ⁿCₙ₋ᵣ?</li>
                  <li>In rocket flight modeling, why is finding the vertex coordinate essential for fuel burn optimization?</li>
                  <li>Why must unlabelled equal-size groups be divided by k! to avoid combinatorial duplication?</li>
                </ul>
              </div>
            )}

            {activeCompleteTab === 'activity' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-amber-300 uppercase">{REAL_WORLD_ACTIVITY.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
                <div className="space-y-2 mt-2">
                  {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                    <div key={sIdx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── SYSTEM FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Accomplished!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_AppliedMathsGraphQuadraticFunctionSim;
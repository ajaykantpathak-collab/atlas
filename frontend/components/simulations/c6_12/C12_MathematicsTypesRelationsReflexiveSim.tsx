'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 12 MATH NODES ───
const NODE_C12_MATH_001 = 'c12_math_001';
const NODE_C12_MATH_002 = 'c12_math_002';
const NODE_C12_MATH_003 = 'c12_math_003';
const NODE_C12_MATH_004 = 'c12_math_004';
const NODE_C12_MATH_005 = 'c12_math_005';
const NODE_C12_MATH_006 = 'c12_math_006';
const NODE_C12_MATH_007 = 'c12_math_007';
const NODE_C12_MATH_008 = 'c12_math_008';
const NODE_C12_MATH_009 = 'c12_math_009';
const NODE_C12_MATH_010 = 'c12_math_010';

const ALL_NODE_IDS = [
  NODE_C12_MATH_001,
  NODE_C12_MATH_002,
  NODE_C12_MATH_003,
  NODE_C12_MATH_004,
  NODE_C12_MATH_005,
  NODE_C12_MATH_006,
  NODE_C12_MATH_007,
  NODE_C12_MATH_008,
  NODE_C12_MATH_009,
  NODE_C12_MATH_010,
];

// ─── SCENARIO & HOOK ───
const SCENARIO = {
  title: 'Cryptography & Invertibility Protocol at ISRO',
  intro: 'You are designing an encrypted command channel for the Aditya-L1 spacecraft. Every transmission packet must pass through relation filters, bijective encoding channels, and inverse trigonometric phase shifts. If a relation leaks reflexivity or an encoding fails injectivity, signals get corrupted in deep space!',
  context: 'Map relations on discrete packet states {1, 2, 3}, inspect function bijections, verify mirror reflections along y = x, and lock in principal branch ranges for trigonometric phase modulations.',
};

const DISCOVERY_QUESTION = {
  question: 'Suppose a telemetry relation on packet states {1, 2, 3} has R = {(1,2), (2,1)}. If a relation is both symmetric and transitive, MUST it automatically be reflexive?',
  options: [
    'Yes — if (1,2) and (2,1) exist, transitivity creates (1,1) and symmetry forces everything else.',
    'No — elements not appearing in any pair (like state 3) have no diagonal loops like (3,3).',
    'Yes — because symmetry reflects all pairs across the diagonal.',
    'No — because relations on 3 elements cannot be symmetric.',
  ],
  correctIndex: 1,
  hintAfter: 'Curious puzzle! Let us see why transitivity only acts on existing chains, leaving untouched elements un-looped!',
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

// ─── 21 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation: Recall / Definition of Reflexivity
  {
    id: 'ch_01',
    nodeId: NODE_C12_MATH_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On set A = {1, 2, 3}, which condition is strictly necessary and sufficient for a relation R to be reflexive?',
    options: [
      'At least one pair of the form (a, a) must be present in R',
      '(a, a) must belong to R for every a in A — i.e., (1,1), (2,2), and (3,3) must all be present',
      'If (a, b) in R, then (b, a) in R',
      'If (a, b) and (b, c) in R, then (a, c) in R',
    ],
    correctIndex: 1,
    explanation: 'A relation R on A is reflexive if and only if (a, a) in R for every element a in A. Missing even one diagonal pair (e.g., omitting (3,3)) ruins reflexivity.',
    hints: [
      'Think about every single element standing in the set A = {1, 2, 3}.',
      'Reflexive means every element reflects upon itself.',
      'All diagonal self-loops (1,1), (2,2), and (3,3) must be inside R.',
    ],
    misconceptionIndex: 1,
  },
  // 2. Foundation: Drag-label on Relation Matrix
  {
    id: 'ch_02',
    nodeId: NODE_C12_MATH_001,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct property labels to the structural pattern in the 3x3 relation matrix on A = {1, 2, 3}.',
    dragItems: [
      { label: 'Reflexive Diagonals', targetId: 'cell_diag' },
      { label: 'Symmetric Pair', targetId: 'cell_symm' },
      { label: 'Transitive Shortcut', targetId: 'cell_trans' },
      { label: 'Universal Matrix', targetId: 'cell_all' },
    ],
    correctMapping: {
      cell_diag: 'Reflexive Diagonals',
      cell_symm: 'Symmetric Pair',
      cell_trans: 'Transitive Shortcut',
      cell_all: 'Universal Matrix',
    },
    explanation: 'The main diagonal (1,1),(2,2),(3,3) enforces reflexivity. Matrix symmetry across the diagonal corresponds to symmetric relations. Shortcut paths (a->b, b->c => a->c) satisfy transitivity. The full matrix is the Universal relation A x A.',
    hints: [
      'Where do self-loops (a, a) live on a square coordinate grid?',
      'If you flip across the diagonal axis, (a,b) lands on (b,a).',
      'Chains connecting row a to column c via intermediary b represent transitivity shortcuts.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation: Diagnostic check on Equivalence
  {
    id: 'ch_03',
    nodeId: NODE_C12_MATH_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'An equivalence relation R on a set A must simultaneously satisfy which set of conditions?',
    options: [
      'Reflexive and Symmetric only',
      'Symmetric and Transitive only',
      'Reflexive, Symmetric, and Transitive',
      'Reflexive and Anti-symmetric',
    ],
    correctIndex: 2,
    explanation: 'By definition, an equivalence relation is a relation that is simultaneously reflexive, symmetric, and transitive. Failing even one property disqualifies it.',
    hints: [
      'Recall the three fundamental tests of relation classification.',
      'Think of equality: a = a, a = b => b = a, and a = b, b = c => a = c.',
      'It requires all three: Reflexive + Symmetric + Transitive.',
    ],
    misconceptionIndex: 0,
  },
  // 4. Foundation: Special Relations (Empty & Universal)
  {
    id: 'ch_04',
    nodeId: NODE_C12_MATH_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Consider the empty relation R = ∅ on a non-empty set A = {1, 2, 3}. Why is R NOT reflexive, yet vacuously symmetric and transitive?',
    options: [
      'It has too many pairs for reflexivity.',
      'Reflexivity requires positive presence of all (a, a), which ∅ lacks; symmetry and transitivity have no counterexamples to violate the conditional.',
      'Empty relations are never transitive.',
      'Empty relations are reflexive only when |A| is odd.',
    ],
    correctIndex: 1,
    explanation: 'Reflexivity is a positive existential demand: (a, a) must be in R for all a in A. Since ∅ contains no pairs, it fails reflexivity. However, "if (a,b) in R" is false for all pairs, making the implication vacuously true for symmetry and transitivity.',
    hints: [
      'Does the empty set contain (1,1), (2,2), or (3,3)? No.',
      'Can you find any pair in ∅ where (a,b) is present but (b,a) is missing?',
      'An implication P => Q is automatically true when the premise P is always false.',
    ],
    misconceptionIndex: 0,
  },
  // 5. Foundation: One-to-One and Onto
  {
    id: 'ch_05',
    nodeId: NODE_C12_MATH_004,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A real-valued function f: A -> B is bijective if and only if:',
    options: [
      'It is strictly positive on its domain.',
      'It is one-to-one (injective) and onto (surjective).',
      'Its derivative is zero everywhere.',
      'Its graph passes through the origin (0, 0).',
    ],
    correctIndex: 1,
    explanation: 'Bijective means both injective (distinct inputs map to distinct outputs, f(a)=f(b) => a=b) and surjective (range equals co-domain).',
    hints: [
      'Bi- stands for dual conditions: injective plus surjective.',
      'Every target has at least one pre-image and at most one pre-image.',
      'Bijective = One-to-one AND Onto.',
    ],
  },
  // 6. Foundation: Numeric Count of Ordered Pairs
  {
    id: 'ch_06',
    nodeId: NODE_C12_MATH_003,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'For a satellite telemetry set A = {1, 2, 3, 4}, how many total ordered pairs are in the Universal relation U = A x A?',
    correctAnswer: 16,
    tolerance: 0,
    unit: 'pairs',
    explanation: 'The universal relation on set A contains |A| x |A| pairs. Here 4 x 4 = 16 pairs.',
    hints: [
      'Universal relation contains every possible pair (a, b) where a in A and b in A.',
      'Multiply the cardinality of A by itself: |A|^2.',
      '4 x 4 = 16.',
    ],
  },
  // 7. Foundation: Inverse Trig Principal Branch (sin^-1)
  {
    id: 'ch_07',
    nodeId: NODE_C12_MATH_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the exact principal value branch (range) of y = sin⁻¹(x)?',
    options: [
      '[0, π]',
      '(-π/2, π/2)',
      '[-π/2, π/2]',
      '[0, 2π]',
    ],
    correctIndex: 2,
    explanation: 'The sine function is restricted to [-π/2, π/2] to make it strictly increasing and bijective onto [-1, 1]. Hence the principal value branch of sin⁻¹(x) is [-π/2, π/2].',
    hints: [
      'Sine passes through -1 at -π/2 and +1 at π/2.',
      'The endpoints are included (closed interval).',
      'The range is [-π/2, π/2].',
    ],
  },
  // 8. Standard: Equivalence Relation Modulo Arithmetic (NEP Application)
  {
    id: 'ch_08',
    nodeId: NODE_C12_MATH_002,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a digital banking protocol, let R on integers Z be defined by a R b iff 3 divides (a - b). What is the equivalence class [1] on {0, 1, 2, 3, 4, 5, 6}?',
    options: [
      '{1, 3, 5}',
      '{1, 4}',
      '{0, 3, 6}',
      '{2, 5}',
    ],
    correctIndex: 1,
    explanation: 'The equivalence class [1] consists of all elements x in {0,1,2,3,4,5,6} such that 3 divides (x - 1). (1-1)=0 (divisible by 3), (4-1)=3 (divisible by 3). Thus [1] = {1, 4}.',
    hints: [
      'Check which numbers in the set give a remainder of 1 when divided by 3.',
      'Test: 1 mod 3 = 1, 4 mod 3 = 1.',
      'The elements are 1 and 4.',
    ],
    misconceptionIndex: 2,
  },
  // 9. Standard: Composite Function Evaluation
  {
    id: 'ch_09',
    nodeId: NODE_C12_MATH_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Let sensor calibration functions be f(x) = x² + 1 and g(x) = 2x + 3 on R. What is the explicit formula for (g ∘ f)(x)?',
    options: [
      '2x² + 5',
      '4x² + 12x + 10',
      '2x³ + 3',
      '2x² + 6',
    ],
    correctIndex: 0,
    explanation: '(g ∘ f)(x) = g(f(x)) = g(x² + 1) = 2(x² + 1) + 3 = 2x² + 2 + 3 = 2x² + 5. Notice (f ∘ g)(x) = (2x+3)² + 1 = 4x² + 12x + 10, proving g ∘ f ≠ f ∘ g.',
    hints: [
      'g is the outer function: replace the variable in g with the entire formula of f(x).',
      'g(□) = 2(□) + 3. Insert (x² + 1) into □.',
      '2*(x^2 + 1) + 3 = 2x^2 + 5.',
    ],
    misconceptionIndex: 0,
  },
  // 10. Standard: Drag-sort steps to construct an inverse function
  {
    id: 'ch_10',
    nodeId: NODE_C12_MATH_006,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the mathematical steps to find and verify the inverse of f(x) = (x - 1)/(x + 2) in correct rigorous order.',
    sortItems: [
      'Verify f is injective by checking f(a) = f(b) ⇒ a = b and surjective on R\\{1}',
      'Set y = f(x) and cross-multiply: y(x + 2) = x - 1',
      'Rearrange terms to isolate x: x(1 - y) = 1 + 2y ⇒ x = (1 + 2y)/(1 - y)',
      'Interchange variables to write f⁻¹(x) = (1 + 2x)/(1 - x)',
      'Verify both compositions: (f⁻¹ ∘ f)(x) = x and (f ∘ f⁻¹)(x) = x',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Rigorous inverse derivation requires: (1) establishing bijectivity, (2) expressing y = f(x), (3) solving for x, (4) swapping variables for f⁻¹(x), and (5) verifying both composite identities.',
    hints: [
      'You cannot legitimately invert without first checking bijectivity.',
      'Set y = f(x) and solve algebraically for x in terms of y.',
      'Verification of f ∘ f⁻¹ = I and f⁻¹ ∘ f = I is the final proof step.',
    ],
  },
  // 11. Standard: Principal value of cos⁻¹(-1/2) (Evaluation)
  {
    id: 'ch_11',
    nodeId: NODE_C12_MATH_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A student claims cos⁻¹(-1/2) = -2π/3 because cos(-2π/3) = -1/2. Evaluate this claim and identify the true principal value.',
    options: [
      'The claim is correct because cosine is an even function.',
      'The claim is false; the principal value branch of cos⁻¹ is [0, π], so cos⁻¹(-1/2) = π - π/3 = 2π/3.',
      'The claim is false; the true value is 4π/3.',
      'The claim is correct in Quadrant III.',
    ],
    correctIndex: 1,
    explanation: 'While cos(-2π/3) = -1/2, -2π/3 is negative and lies strictly outside the principal branch [0, π]. The unique angle in [0, π] with cosine -1/2 is 2π/3 (120°).',
    hints: [
      'Remember the principal value branch for cos⁻¹ is [0, π].',
      'Is -2π/3 inside [0, π]? No, it is negative.',
      'Use the identity cos⁻¹(-x) = π - cos⁻¹(x). π - π/3 = 2π/3.',
    ],
    misconceptionIndex: 0,
  },
  // 12. Standard: Geometry of Inverse Reflection across y = x
  {
    id: 'ch_12',
    nodeId: NODE_C12_MATH_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'If point (2, 7) lies on the graph of an invertible function y = f(x), which point MUST lie on the graph of y = f⁻¹(x)?',
    options: [
      '(-2, -7)',
      '(7, 2)',
      '(-7, -2)',
      '(1/2, 1/7)',
    ],
    correctIndex: 1,
    explanation: 'Because f(2) = 7, by definition of inverse f⁻¹(7) = 2. Geometrically, reflection across the diagonal line y = x interchanges the coordinates (a, b) ↦ (b, a).',
    hints: [
      'The line y = x acts as a mirror that swaps x and y.',
      'If f sends 2 to 7, f⁻¹ sends 7 back to 2.',
      'Swap the coordinates: (2, 7) becomes (7, 2).',
    ],
    misconceptionIndex: 0,
  },
  // 13. Standard: Numeric Principal Value Evaluation (tan^-1)
  {
    id: 'ch_13',
    nodeId: NODE_C12_MATH_009,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'What is the principal value of tan⁻¹(1) expressed in degrees?',
    correctAnswer: 45,
    tolerance: 0,
    unit: 'degrees',
    explanation: 'tan(45°) = tan(π/4) = 1. Since 45° lies in the open branch (-90°, 90°), the principal value is exactly 45° (or π/4 radians).',
    hints: [
      'What acute angle has a tangent equal to 1?',
      'tan(θ) = sin(θ)/cos(θ) = 1 when sin(θ) = cos(θ).',
      'The angle is 45 degrees.',
    ],
  },
  // 14. Standard: Horizontal Line Test Analysis
  {
    id: 'ch_14',
    nodeId: NODE_C12_MATH_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Consider f: R -> R with f(x) = x³ - 3x. Using the horizontal line test, what can you deduce about f?',
    options: [
      'It is one-to-one because it is a cubic polynomial.',
      'It is many-to-one because the horizontal line y = 0 intersects the curve at three distinct points: x = -√3, 0, +√3.',
      'It is not onto because cubics cannot attain negative values.',
      'It is an identity relation.',
    ],
    correctIndex: 1,
    explanation: 'Setting x³ - 3x = 0 gives x(x² - 3) = 0, so x = -√3, 0, √3. The horizontal line y = 0 intersects the graph at 3 points. Thus f fails injectivity (many-to-one).',
    hints: [
      'Factorise f(x) = x(x - √3)(x + √3).',
      'How many times does the x-axis (y = 0) cut this curve?',
      '3 intersections means 3 distinct inputs produce output 0. Hence many-to-one.',
    ],
  },
  // 15. Advanced: Construct Transitive Closure
  {
    id: 'ch_15',
    nodeId: NODE_C12_MATH_001,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Given relation R = {(1,2), (2,3)} on A = {1, 2, 3}, assemble the EXACT missing pair needed to make R transitive.',
    availableParts: ['(1,3)', '(3,1)', '(2,1)', '(3,2)', '(1,1)', '(2,2)', '(3,3)'],
    targetState: '(1,3)',
    validationHint: 'Look for the chain (1 -> 2) and (2 -> 3). What direct shortcut is required?',
    explanation: 'In R = {(1,2), (2,3)}, we have a chain where the second element of (1,2) matches the first element of (2,3). Transitivity demands the shortcut (1,3) be in R.',
    hints: [
      'Follow the path: 1 goes to 2, and 2 goes to 3.',
      'Transitivity requires the direct jump from start to finish.',
      'Select (1,3).',
    ],
  },
  // 16. Advanced: Equivalence Classes Partitioning
  {
    id: 'ch_16',
    nodeId: NODE_C12_MATH_002,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Let R be an equivalence relation on set A. Why is it impossible for two distinct equivalence classes [a] and [b] to have a non-empty intersection without being completely identical?',
    options: [
      'Because equivalence classes always have prime cardinality.',
      'If c ∈ [a] ∩ [b], then cRa and cRb. By symmetry and transitivity, aRb, which forces [a] = [b]. Thus classes are either disjoint or identical.',
      'Because partitions only exist on finite sets.',
      'Because universal relations have no subsets.',
    ],
    correctIndex: 1,
    explanation: 'The fundamental theorem of equivalence classes: if [a] ∩ [b] ≠ ∅, let c be in both. Then aRc and cRb ⇒ aRb (by symmetry & transitivity). Any element x ∈ [a] satisfies xRa ⇒ xRb ⇒ x ∈ [b]. Thus [a] = [b].',
    hints: [
      'Suppose an element c is shared by both classes.',
      'Use symmetry (cRa ⇒ aRc) and transitivity (aRc and cRb ⇒ aRb).',
      'Once a and b are related, every element related to a is also related to b.',
    ],
    misconceptionIndex: 1,
  },
  // 17. Advanced: Domain Restriction for Invertibility (Real-world Rocket telemetry)
  {
    id: 'ch_17',
    nodeId: NODE_C12_MATH_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An Aditya-L1 thruster altitude sensor produces signal f(t) = (t - 4)² + 10 for time t ∈ R. To make f invertible so telemetry can deduce exact elapsed time t from altitude, what domain restriction is required?',
    options: [
      't ∈ (-∞, ∞)',
      't ∈ [4, ∞) or t ∈ (-∞, 4]',
      't ∈ [0, 10]',
      't ∈ [-4, 4]',
    ],
    correctIndex: 1,
    explanation: 'The parabola has vertex at t = 4. On [4, ∞) the function is strictly increasing; on (-∞, 4] it is strictly decreasing. Restricting to either monotonic half guarantees injectivity and invertibility.',
    hints: [
      'Find the vertex of the quadratic (t - 4)² + 10.',
      'A parabola fails the horizontal line test across both sides of its vertex.',
      'Restricting to t ≥ 4 makes it strictly increasing and bijective.',
    ],
  },
  // 18. Advanced: Parity & Graph of y = cos⁻¹(x)
  {
    id: 'ch_18',
    nodeId: NODE_C12_MATH_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is the graph of y = cos⁻¹(x) NEITHER symmetric about the origin nor symmetric about the y-axis?',
    options: [
      'Because cos⁻¹(x) is discontinuous on [-1, 1].',
      'Because cos⁻¹(-x) = π - cos⁻¹(x), which equals neither cos⁻¹(x) (even) nor -cos⁻¹(x) (odd); the range is entirely [0, π] above the x-axis.',
      'Because its domain is unrestricted.',
      'Because the derivative is everywhere positive.',
    ],
    correctIndex: 1,
    explanation: 'cos⁻¹(-x) = π - cos⁻¹(x). It does not satisfy f(-x) = f(x) (even) or f(-x) = -f(x) (odd). Its graph spans from (-1, π) to (1, 0), residing entirely in y ≥ 0.',
    hints: [
      'Check the range of cos⁻¹(x): [0, π]. Can it be symmetric about the origin when y is never negative?',
      'Test the identity: cos⁻¹(-1/2) = 2π/3, whereas -cos⁻¹(1/2) = -π/3.',
      'Since cos⁻¹(-x) = π - cos⁻¹(x), it is neither odd nor even.',
    ],
    misconceptionIndex: 0,
  },
  // 19. Advanced: Asymptotes of Inverse Trigonometric Graphs
  {
    id: 'ch_19',
    nodeId: NODE_C12_MATH_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How do the vertical asymptotes of tan(x) at x = ±π/2 transform on the inverse graph y = tan⁻¹(x)?',
    options: [
      'They become vertical asymptotes at x = ±1.',
      'They transform into horizontal asymptotes at y = π/2 (as x → +∞) and y = -π/2 (as x → -∞) due to reflection across y = x.',
      'They disappear completely with no asymptotic behaviour.',
      'They become points of discontinuity at x = 0.',
    ],
    correctIndex: 1,
    explanation: 'Reflecting in y = x interchanges x and y coordinates. The vertical lines x = ±π/2 on tan(x) become the horizontal lines y = ±π/2 on tan⁻¹(x). The domain of tan⁻¹(x) is R and range is (-π/2, π/2).',
    hints: [
      'Reflection across y = x turns vertical lines into horizontal lines.',
      'As x → ∞, what angle does tan(θ) approach? θ → π/2.',
      'The horizontal asymptotes are y = ±π/2.',
    ],
    misconceptionIndex: 1,
  },
  // 20. Advanced: Composition Invertibility Theorem
  {
    id: 'ch_20',
    nodeId: NODE_C12_MATH_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'If f: A -> B and g: B -> C are both bijective functions, what is the inverse of the composite function (g ∘ f)?',
    options: [
      'g⁻¹ ∘ f⁻¹',
      'f⁻¹ ∘ g⁻¹ (the socks-and-shoes property: reverse the operations in reverse order)',
      '(f ∘ g)⁻¹',
      'f ∘ g',
    ],
    correctIndex: 1,
    explanation: '(g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹. Proof: (f⁻¹ ∘ g⁻¹) ∘ (g ∘ f) = f⁻¹ ∘ (g⁻¹ ∘ g) ∘ f = f⁻¹ ∘ I_B ∘ f = f⁻¹ ∘ f = I_A. Putting on socks then shoes is undone by removing shoes first, then socks!',
    hints: [
      'Think of undoing a sequence of actions: the last action performed must be undone first.',
      'Outer function g was applied second, so g⁻¹ must act first on the output.',
      '(g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹.',
    ],
  },
  // 21. Advanced: Comprehensive Relation Classification on A = {1, 2, 3}
  {
    id: 'ch_21',
    nodeId: NODE_C12_MATH_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'On A = {1, 2, 3}, let R = {(1,1), (2,2), (3,3), (1,2), (2,1), (2,3), (3,2)}. Classify R completely:',
    options: [
      'Equivalence relation',
      'Reflexive and Symmetric, but NOT Transitive (missing (1,3) and (3,1))',
      'Reflexive and Transitive, but NOT Symmetric',
      'Symmetric only',
    ],
    correctIndex: 1,
    explanation: 'Reflexive: contains (1,1),(2,2),(3,3). Symmetric: (1,2)↔(2,1) and (2,3)↔(3,2). Transitive? Chain (1,2) and (2,3) requires (1,3), which is MISSING! Hence R is reflexive and symmetric, but not transitive.',
    hints: [
      'Are all diagonal pairs (1,1), (2,2), (3,3) present? Yes, reflexive.',
      'Does every arrow have a two-way return arrow? Yes, symmetric.',
      'Check chain 1 -> 2 and 2 -> 3. Is (1,3) in R? No! Transitivity fails.',
    ],
    misconceptionIndex: 0,
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
  nodeId: NODE_C12_MATH_001,
  title: 'Relations, Functions & Inverse Trigonometry',
  definition: 'Comprehensive mastery of relation properties (reflexive, symmetric, transitive, equivalence), special relations, function bijections, compositions, inverse graphs across y = x, and principal value branches of inverse trigonometric functions.',
  eli5: 'Think of relations as arrow connections between friends, bijections as perfect two-way secret decoders, and inverse trig as locking a spinning wheel into one exact slice so every signal has one unique answer!',
  misconceptions: [
    {
      misconception: 'If a relation is symmetric and transitive, it must automatically be reflexive.',
      correction: 'False. An element in set A that is not part of any pair at all escapes transitivity and symmetry, leaving its self-loop missing.',
    },
    {
      misconception: 'Different equivalence classes can partially overlap, e.g., sharing just one element.',
      correction: 'False. Equivalence classes either coincide completely ([a] = [b]) or are completely disjoint ([a] ∩ [b] = ∅).',
    },
    {
      misconception: 'f⁻¹(x) means 1 / f(x).',
      correction: 'False! f⁻¹(x) denotes the inverse mapping function, whereas 1/f(x) is the algebraic reciprocal.',
    },
    {
      misconception: 'The principal value branch of tan⁻¹(x) is [-π/2, π/2] closed.',
      correction: 'False. tan(x) is undefined at ±π/2, so the principal branch for tan⁻¹(x) is the OPEN interval (-π/2, π/2).',
    },
    {
      misconception: 'The graph of y = cos⁻¹(x) is an odd function centered at the origin like sin⁻¹(x).',
      correction: 'False. cos⁻¹(-x) = π - cos⁻¹(x), placing the curve entirely in [0, π] above the x-axis, making it neither odd nor even.',
    },
  ],
  diagnosticQuestions: [
    { question: 'On A = {1, 2}, R = {(1,1), (2,2)} is:', options: ['Reflexive only', 'Equivalence relation', 'Symmetric only', 'Not a relation'], correctIndex: 1 },
    { question: 'The range of f(x) = e^x on R is:', options: ['R', '[0, ∞)', '(0, ∞)', '(-∞, 0)'], correctIndex: 2 },
    { question: 'cos⁻¹(cos(2π/3)) equals:', options: ['2π/3', '-2π/3', '4π/3', 'π/3'], correctIndex: 0 },
    { question: 'If f(x) = 2x + 1, then f⁻¹(5) is:', options: ['11', '2', '3', '0.5'], correctIndex: 1 },
    { question: 'The empty relation on A = {1} is:', options: ['Reflexive', 'Not Reflexive', 'Universal', 'Identity'], correctIndex: 1 },
    { question: 'sin⁻¹(-1/2) principal value is:', options: ['π/6', '-π/6', '5π/6', '7π/6'], correctIndex: 1 },
    { question: 'Horizontal line test checks for:', options: ['Surjectivity', 'Injectivity (one-to-one)', 'Continuity', 'Differentiability'], correctIndex: 1 },
    { question: 'Mirror line between f and f⁻¹ is:', options: ['x-axis', 'y-axis', 'y = x', 'y = -x'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student demonstrates rigorous understanding of relation matrices, equivalence partitions, bijective invertibility, graph reflections across y = x, and inverse trigonometric principal branches.',
};

// ─── EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: 'Interactive Relation Matrix & Directed Graph',
    instruction: 'Toggle pair connections in the 3x3 matrix for set A = {1, 2, 3}. Watch how reflexivity, symmetry, and transitivity indicators respond in real time!',
    interactionType: 'matrix-builder',
    nodeId: NODE_C12_MATH_001,
  },
  {
    title: 'Equivalence Classes & Spacecraft State Partitioning',
    instruction: 'Select a modulo divisor (m = 2 or m = 3) to see how the equivalence relation partitions integers {0..7} into non-overlapping disjoint blocks.',
    interactionType: 'partition-visualizer',
    nodeId: NODE_C12_MATH_002,
  },
  {
    title: 'Function Invertibility & Mirror Reflection across y = x',
    instruction: 'Adjust the curve slope and domain threshold. See how points (x, y) reflect across the diagonal mirror y = x to form (y, x).',
    interactionType: 'reflection-lab',
    nodeId: NODE_C12_MATH_007,
  },
  {
    title: 'Trigonometric Principal Branch Restriction',
    instruction: 'Drag the angle slider θ along the unit circle. Observe how the restricted branch [-π/2, π/2] guarantees a unique principal inverse output.',
    interactionType: 'trig-branch-explorer',
    nodeId: NODE_C12_MATH_008,
  },
  {
    title: 'Inverse Trigonometric Graphs & Asymptote Ceilings',
    instruction: 'Switch between y = sin⁻¹(x), y = cos⁻¹(x), and y = tan⁻¹(x). Inspect domain boundaries [-1, 1] and horizontal asymptotes y = ±π/2.',
    interactionType: 'graph-asymptote-lab',
    nodeId: NODE_C12_MATH_010,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If we turn ON all three diagonal cells (1,1), (2,2), and (3,3), does that alone guarantee the relation is an Equivalence relation?',
    options: [
      'Yes, because self-loops are all that equivalence requires.',
      'No, because we must also check whether off-diagonal pairs satisfy Symmetry and Transitivity.',
      'Yes, because the diagonal matrix is universal.',
      'No, because reflexivity requires 0 pairs.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Toggle on the diagonal pairs and add an asymmetric pair like (1,2) to watch the symmetry indicator flag red!',
    nodeId: NODE_C12_MATH_001,
  },
  {
    question: 'Predict: What happens to the graph of y = tan⁻¹(x) as x approaches +1000 (very large positive numbers)?',
    options: [
      'y shoots off to infinity without bound.',
      'y flattens out asymptotically right below π/2 (~1.57 radians).',
      'y drops to 0.',
      'y oscillates like a sine wave.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Select the tan⁻¹(x) graph and slide x towards large positive values to inspect the horizontal asymptote ceiling.',
    nodeId: NODE_C12_MATH_010,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the relationship between two distinct equivalence classes [a] and [b]?',
    observableOptions: [
      'They can share some elements while differing in others.',
      'They are either completely identical or share zero elements (pairwise disjoint).',
      'Their intersection is always equal to set A.',
      'They never contain their own representative elements.',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_MATH_002,
  },
  {
    question: 'What do you observe when a point (a, b) on curve y = f(x) is reflected across the line y = x?',
    observableOptions: [
      'The point becomes (-a, -b).',
      'The x and y coordinates swap positions to become (b, a) on y = f⁻¹(x).',
      'The point moves along the y-axis only.',
      'The point vanishes.',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_MATH_007,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Aditya-L1 Spacecraft Telemetry Protocol Engineer',
  description: 'Design a 3-stage validation pipeline for deep-space telemetry packets: 1. Verify packet parity relation is an equivalence relation. 2. Verify signal modulation function f(t) = 3t + 5 is bijective. 3. Lock sensor phase angles strictly within principal value branches [-π/2, π/2].',
  steps: [
    'Stage 1: Verify parity check: a ≡ b (mod 4) satisfies reflexivity, symmetry, and transitivity on telemetry packet IDs.',
    'Stage 2: Calculate the telemetry decoding inverse f⁻¹(x) = (x - 5)/3 and verify (f ∘ f⁻¹)(x) = x.',
    'Stage 3: Compute phase offset principal value: sin⁻¹(-√3/2) = -π/3 radians (-60°).',
    'Stage 4: Document the complete protocol in the ISRO Mission Operations Report.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN SIMULATION COMPONENT ───
function C12_MathematicsTypesRelationsReflexiveSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_MATH_001,
  title = DEFAULT_PROPS.title || 'Relations, Functions & Inverse Trigonometry',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['mathematics'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // ─── STATE MANAGEMENT ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Brilliant Predict-Then-Check & Observation
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Escalating Hints & Explanations
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-Drop & Numeric & Construct
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Feedback & Animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Interactive Exploration State
  // 1. Relation Matrix 3x3 on A = {1, 2, 3}
  const [matrixPairs, setMatrixPairs] = useState<Record<string, boolean>>({
    '1-1': true, '1-2': false, '1-3': false,
    '2-1': false, '2-2': true, '2-3': false,
    '3-1': false, '3-2': false, '3-3': true,
  });

  // 2. Modulo Equivalence Partition state
  const [moduloM, setModuloM] = useState<number>(3);
  const [selectedPartitionElement, setSelectedPartitionElement] = useState<number | null>(null);

  // 3. Reflection across y = x state
  const [funcSlope, setFuncSlope] = useState<number>(2);
  const [funcIntercept, setFuncIntercept] = useState<number>(1);
  const [probeX, setProbeX] = useState<number>(1.5);

  // 4. Unit circle & Principal branch state
  const [circleAngleDeg, setCircleAngleDeg] = useState<number>(30);
  const [activeTrigFunction, setActiveTrigFunction] = useState<'sin' | 'cos' | 'tan'>('sin');

  // 5. Graph Asymptotes probe
  const [graphProbeX, setGraphProbeX] = useState<number>(0.5);
  const [selectedGraphType, setSelectedGraphType] = useState<'arcsin' | 'arccos' | 'arctan'>('arcsin');

  // Sandbox free controls
  const [sandboxRelationPreset, setSandboxRelationPreset] = useState<'identity' | 'empty' | 'universal' | 'custom'>('identity');
  const [sandboxFunctionType, setSandboxFunctionType] = useState<'linear' | 'quadratic' | 'cubic'>('linear');

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── RELATION MATRIX PROPERTY CHECKS (REAL-TIME COMPUTATION) ───
  const relationProperties = useMemo(() => {
    // Reflexive: (1,1), (2,2), (3,3)
    const isReflexive = !!(matrixPairs['1-1'] && matrixPairs['2-2'] && matrixPairs['3-3']);

    // Symmetric: for all (i, j), (j, i) must match
    let isSymmetric = true;
    const elements = [1, 2, 3];
    for (let i of elements) {
      for (let j of elements) {
        if (matrixPairs[`${i}-${j}`] && !matrixPairs[`${j}-${i}`]) {
          isSymmetric = false;
          break;
        }
      }
      if (!isSymmetric) break;
    }

    // Transitive: if (i, j) and (j, k), then (i, k)
    let isTransitive = true;
    let missingChain: string | null = null;
    for (let i of elements) {
      for (let j of elements) {
        for (let k of elements) {
          if (matrixPairs[`${i}-${j}`] && matrixPairs[`${j}-${k}`] && !matrixPairs[`${i}-${k}`]) {
            isTransitive = false;
            missingChain = `(${i},${j}) & (${j},${k}) ⇒ missing (${i},${k})`;
            break;
          }
        }
        if (!isTransitive) break;
      }
      if (!isTransitive) break;
    }

    const isEquivalence = isReflexive && isSymmetric && isTransitive;

    return { isReflexive, isSymmetric, isTransitive, isEquivalence, missingChain };
  }, [matrixPairs]);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── USE EFFECT 1: Load Existing Mastery on Mount ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── USE EFFECT 2: BKT Adaptive Difficulty Adjustment ───
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

  // ─── USE EFFECT 3: HTML5 2D Canvas Wave / Telemetry Animation ───
  useEffect(() => {
    if (phase !== 'challenge' && phase !== 'explore') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Sine & Inverse Sine wave dynamics
      ctx.beginPath();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * 0.04 + frame * 0.05) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Pulsing pulse node
      const pulseX = (frame * 2) % canvas.width;
      const pulseY = canvas.height / 2 + Math.sin(pulseX * 0.04 + frame * 0.05) * 12;
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── USE EFFECT 4: Cleanup Inactivity Timer on Unmount ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── USE EFFECT 5: Speech Announcements on Phase Change ───
  useEffect(() => {
    if (phase === 'discovery') {
      speechManager.speak('Welcome to the Spacecraft Telemetry Protocol. Let us begin with an exploratory question.');
    } else if (phase === 'explore') {
      speechManager.speak('Interactive Exploration Phase. Manipulate the diagrams to discover mathematical properties.');
    } else if (phase === 'sandbox') {
      speechManager.speak('Sandbox mode activated. Free exploration with no grading.');
    } else if (phase === 'challenge') {
      speechManager.speak('Challenge phase begins. Test your mastery.');
    } else if (phase === 'complete') {
      speechManager.speak('Mission accomplished! Review your mastery profile and real-world mission task.');
    }
  }, [phase]);

  // ─── EXTRACTED USECALLBACK HANDLERS ───

  // 1. Toggle Matrix Cell
  const handleToggleMatrixPair = useCallback((pairKey: string) => {
    audioManager.play('tap');
    setMatrixPairs(prev => ({
      ...prev,
      [pairKey]: !prev[pairKey],
    }));
  }, []);

  // 2. Set Modulo Divisor
  const handleSetModulo = useCallback((m: number) => {
    audioManager.play('pop');
    setModuloM(m);
    setSelectedPartitionElement(null);
  }, []);

  // 3. Slope & Function Sliders
  const handleSlopeChange = useCallback((val: number) => {
    audioManager.play('count');
    setFuncSlope(val);
  }, []);

  const handleInterceptChange = useCallback((val: number) => {
    audioManager.play('count');
    setFuncIntercept(val);
  }, []);

  const handleProbeXChange = useCallback((val: number) => {
    audioManager.play('count');
    setProbeX(val);
  }, []);

  // 4. Circle Angle Slider
  const handleCircleAngleChange = useCallback((val: number) => {
    audioManager.play('count');
    setCircleAngleDeg(val);
  }, []);

  // 5. Discovery Hook Answer
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // 6. Navigation Transitions
  const handleAdvanceToExploration = useCallback(() => {
    audioManager.play('whoosh');
    setPhase('explore');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    audioManager.play('whoosh');
    setPhase('sandbox');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    audioManager.play('whoosh');
    setPhase('challenge');
  }, []);

  // 7. Prediction & Observation
  const handlePrediction = useCallback((idx: number) => {
    audioManager.play('tap');
    setPredictionIndex(idx);
    setPredictionMade(true);
    speechManager.speak('Prediction recorded. Now manipulate the matrix to verify!');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    audioManager.play('tap');
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Exact observation!' : 'Inspect the disjoint partition sets closely.');
  }, []);

  // 8. Escalating Hints
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      setShowHint(false);
    }
  }, [hintCount, challenge]);

  // 9. Reset Inactivity Timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // 10. Drag-and-Drop Handlers
  const handleDragStart = useCallback((label: string) => {
    audioManager.play('pickup');
    setDraggedItem(label);
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      audioManager.play('drop-correct');
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  // 11. Sort Move & Submit
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    const isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
  }, [sortArrangement, challenge]);

  // 12. Complete Mission Handler
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('All simulation challenges completed successfully.');
  }, [errors, onComplete]);

  // 13. Next Challenge Handler
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

  // 14. Answer Handler (Universal)
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
      speechManager.speak('Correct! Verified with mathematical precision.');
      setShowConfetti(true);
      setShowExplanation(true);

      // BKT update using ref
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      // SRS update
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify({ score: 100, timestamp: Date.now() }));
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
        speechManager.speak('Let us review the step-by-step mathematical proof.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 3000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // Preset Applier for Sandbox
  const handleApplySandboxPreset = useCallback((preset: 'identity' | 'empty' | 'universal') => {
    audioManager.play('pop');
    setSandboxRelationPreset(preset);
    if (preset === 'identity') {
      setMatrixPairs({
        '1-1': true, '1-2': false, '1-3': false,
        '2-1': false, '2-2': true, '2-3': false,
        '3-1': false, '3-2': false, '3-3': true,
      });
    } else if (preset === 'empty') {
      setMatrixPairs({
        '1-1': false, '1-2': false, '1-3': false,
        '2-1': false, '2-2': false, '2-3': false,
        '3-1': false, '3-2': false, '3-3': false,
      });
    } else if (preset === 'universal') {
      setMatrixPairs({
        '1-1': true, '1-2': true, '1-3': true,
        '2-1': true, '2-2': true, '2-3': true,
        '3-1': true, '3-2': true, '3-3': true,
      });
    }
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
              ISC Class 12 Science • {subjectConfig.name}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700/60'
                : difficulty === 'advanced'
                ? 'bg-rose-950/80 text-rose-400 border-rose-700/60'
                : 'bg-indigo-950/80 text-indigo-300 border-indigo-700/60'
            }`}
          >
            Tier: {difficulty}
          </motion.div>

          <div className="px-3 py-1 bg-slate-900 rounded-full border border-slate-700 text-xs font-semibold text-slate-300">
            Mastery: <span className="text-amber-400 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="mt-6 space-y-6"
        >
          {/* Mission Scenario Card */}
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/60 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-indigo-600/40 text-indigo-300 text-xs font-bold rounded">
                MISSION BRIEFING
              </span>
              <h2 className="text-lg font-bold text-indigo-200">{SCENARIO.title}</h2>
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 mt-3 pt-3 border-t border-indigo-900/50">
              🛰️ <span className="font-semibold">Context:</span> {SCENARIO.context}
            </p>
          </div>

          {/* Interactive Curiosity Hook */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-lg space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-xl font-bold">?</span>
              <h3 className="text-base font-bold text-white">Pre-Flight Diagnostic Puzzle</h3>
            </div>
            <p className="text-sm text-slate-200">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 border-t border-slate-800 space-y-3"
              >
                <div
                  className={`p-4 rounded-xl text-sm ${
                    discoveryCorrect
                      ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                      : 'bg-amber-950/60 border border-amber-800 text-amber-300'
                  }`}
                >
                  <span className="font-bold">{discoveryCorrect ? '✓ Remarkable Intuition!' : '💡 Insight Hook:'}</span>{' '}
                  {discoveryCorrect
                    ? 'Transitivity only governs existing chains. If element 3 has zero arrows attached, (3,3) is never produced!'
                    : DISCOVERY_QUESTION.hintAfter}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Launch interactive exploration phase"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2"
                >
                  <span>Launch Interactive Labs</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION LABS (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Step Navigation Pill */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}
            </span>
            <div className="flex gap-1">
              {EXPLORATION_STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    audioManager.play('pop');
                    setCurrentSlide(i);
                  }}
                  className={`w-8 h-2 rounded-full transition-all ${
                    i === currentSlide ? 'bg-indigo-500 w-12' : 'bg-slate-700'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-5"
            >
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🔬</span> {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-sm text-amber-300 font-medium">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB 0: RELATION MATRIX & DIRECTED GRAPH (c12_math_001) ─── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Interactive 3x3 Matrix Table */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                          Matrix Representation (A × A)
                        </span>
                        <span className="text-xs text-slate-400">Click cells to toggle</span>
                      </div>

                      <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                        <div className="p-2 text-slate-500 font-bold">R</div>
                        {[1, 2, 3].map(col => (
                          <div key={col} className="p-2 bg-slate-900 rounded font-bold text-indigo-400">
                            col {col}
                          </div>
                        ))}

                        {[1, 2, 3].map(row => (
                          <React.Fragment key={row}>
                            <div className="p-2 bg-slate-900 rounded font-bold text-indigo-400 flex items-center justify-center">
                              row {row}
                            </div>
                            {[1, 2, 3].map(col => {
                              const key = `${row}-${col}`;
                              const active = matrixPairs[key];
                              const isDiag = row === col;
                              return (
                                <motion.button
                                  key={key}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleToggleMatrixPair(key)}
                                  aria-label={`Toggle pair (${row}, ${col})`}
                                  className={`p-3 rounded-lg font-bold transition-all border ${
                                    active
                                      ? isDiag
                                        ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-900/40'
                                        : 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-900/40'
                                      : isDiag
                                      ? 'bg-slate-900 border-emerald-900/50 text-slate-500 hover:border-emerald-700'
                                      : 'bg-slate-900 border-slate-800 text-slate-600 hover:border-slate-700'
                                  }`}
                                >
                                  ({row},{col})
                                  <div className="text-[10px] font-normal">{active ? '✓ IN' : '—'}</div>
                                </motion.button>
                              );
                            })}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* SVG Directed Graph Visualizer */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                          Directed Graph (Digraph)
                        </span>
                        <span className="text-xs text-slate-400">Nodes: 1, 2, 3</span>
                      </div>

                      <svg viewBox="0 0 300 200" className="w-full h-48 bg-slate-900/50 rounded-lg">
                        <defs>
                          <marker id="arrow" viewBox="0 0 10 10" refX="20" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8" />
                          </marker>
                        </defs>

                        {/* Edges */}
                        {matrixPairs['1-2'] && <line x1="150" y1="40" x2="60" y2="150" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrow)" />}
                        {matrixPairs['2-1'] && <line x1="60" y1="150" x2="150" y2="40" stroke="#818cf8" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#arrow)" />}
                        {matrixPairs['2-3'] && <line x1="60" y1="150" x2="240" y2="150" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrow)" />}
                        {matrixPairs['3-2'] && <line x1="240" y1="150" x2="60" y2="150" stroke="#818cf8" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#arrow)" />}
                        {matrixPairs['1-3'] && <line x1="150" y1="40" x2="240" y2="150" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrow)" />}
                        {matrixPairs['3-1'] && <line x1="240" y1="150" x2="150" y2="40" stroke="#818cf8" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#arrow)" />}

                        {/* Self loops */}
                        {matrixPairs['1-1'] && <circle cx="150" cy="20" r="12" fill="none" stroke="#22c55e" strokeWidth="2" />}
                        {matrixPairs['2-2'] && <circle cx="40" cy="160" r="12" fill="none" stroke="#22c55e" strokeWidth="2" />}
                        {matrixPairs['3-3'] && <circle cx="260" cy="160" r="12" fill="none" stroke="#22c55e" strokeWidth="2" />}

                        {/* Nodes */}
                        <g>
                          <circle cx="150" cy="40" r="18" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                          <text x="150" y="45" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">1</text>
                        </g>
                        <g>
                          <circle cx="60" cy="150" r="18" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                          <text x="60" y="155" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">2</text>
                        </g>
                        <g>
                          <circle cx="240" cy="150" r="18" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                          <text x="240" y="155" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">3</text>
                        </g>
                      </svg>

                      {/* Property Gauges */}
                      <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-slate-800 text-center">
                        <div className={`p-2 rounded-lg border ${relationProperties.isReflexive ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300' : 'bg-rose-950/60 border-rose-800 text-rose-400'}`}>
                          <div className="text-[10px] font-bold uppercase">Reflexive</div>
                          <div className="text-xs font-black">{relationProperties.isReflexive ? 'PASS ✓' : 'FAIL ✗'}</div>
                        </div>

                        <div className={`p-2 rounded-lg border ${relationProperties.isSymmetric ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300' : 'bg-rose-950/60 border-rose-800 text-rose-400'}`}>
                          <div className="text-[10px] font-bold uppercase">Symmetric</div>
                          <div className="text-xs font-black">{relationProperties.isSymmetric ? 'PASS ✓' : 'FAIL ✗'}</div>
                        </div>

                        <div className={`p-2 rounded-lg border ${relationProperties.isTransitive ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300' : 'bg-rose-950/60 border-rose-800 text-rose-400'}`}>
                          <div className="text-[10px] font-bold uppercase">Transitive</div>
                          <div className="text-xs font-black">{relationProperties.isTransitive ? 'PASS ✓' : 'FAIL ✗'}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Real-time Status Card */}
                  <div className={`p-4 rounded-xl border flex items-center justify-between ${relationProperties.isEquivalence ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200' : 'bg-indigo-950/40 border-indigo-800/60 text-slate-300'}`}>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider">Classification Verdict:</span>
                      <h4 className="text-base font-bold text-white">
                        {relationProperties.isEquivalence ? '✨ EQUIVALENCE RELATION (All 3 Pass)' : 'Non-Equivalence Relation'}
                      </h4>
                      {relationProperties.missingChain && (
                        <p className="text-xs text-rose-400 mt-1">⚠️ Transitivity Break: {relationProperties.missingChain}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 1: MODULO EQUIVALENCE PARTITIONS (c12_math_002) ─── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Select Congruence Modulo m:</span>
                      <p className="text-xs text-slate-400">Rule: a R b iff m divides (a - b)</p>
                    </div>
                    <div className="flex gap-2">
                      {[2, 3, 4].map(m => (
                        <motion.button
                          key={m}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSetModulo(m)}
                          aria-label={`Set modulo ${m}`}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                            moduloM === m
                              ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-900/50'
                              : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                          }`}
                        >
                          Modulo {m}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Disjoint Partition Blocks Visualization */}
                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                      Induced Disjoint Equivalence Classes on A = {'{0, 1, 2, 3, 4, 5, 6, 7}'}
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Array.from({ length: moduloM }).map((_, rem) => {
                        const members = [0, 1, 2, 3, 4, 5, 6, 7].filter(x => x % moduloM === rem);
                        return (
                          <div
                            key={rem}
                            className="p-4 bg-slate-900 rounded-xl border border-indigo-800/50 space-y-2 shadow-md"
                          >
                            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                              <span className="text-xs font-bold text-indigo-400">
                                Class [{rem}] (Remainder {rem})
                              </span>
                              <span className="text-[10px] px-2 py-0.5 bg-indigo-950 text-indigo-300 rounded font-mono">
                                Size: {members.length}
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-1">
                              {members.map(elem => (
                                <span
                                  key={elem}
                                  className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-600 flex items-center justify-center font-bold text-white text-sm"
                                >
                                  {elem}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 bg-indigo-950/30 rounded-lg border border-indigo-800/40 text-xs text-indigo-300 flex items-center gap-2">
                      <span>💡</span>
                      <span>
                        Notice that every single element from 0 to 7 belongs to EXACTLY ONE class, with ZERO overlap! The union equals set A.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: INVERSE REFLECTION ACROSS y = x (c12_math_007) ─── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Controls with real-time sliders */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                      <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                        Linear Function Controls: y = mx + c
                      </span>

                      <div>
                        <label className="text-xs text-slate-300 flex justify-between">
                          <span>Slope (m): {funcSlope}</span>
                          <span className="text-indigo-400">f(x) = {funcSlope}x + {funcIntercept}</span>
                        </label>
                        <input
                          type="range"
                          min={0.5}
                          max={3}
                          step={0.5}
                          value={funcSlope}
                          onChange={(e) => setFuncSlope(Number(e.target.value))}
                          className="w-full mt-1 accent-indigo-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 flex justify-between">
                          <span>Intercept (c): {funcIntercept}</span>
                          <span className="text-emerald-400">f⁻¹(x) = (x - {funcIntercept})/{funcSlope}</span>
                        </label>
                        <input
                          type="range"
                          min={-2}
                          max={3}
                          step={1}
                          value={funcIntercept}
                          onChange={(e) => setFuncIntercept(Number(e.target.value))}
                          className="w-full mt-1 accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 flex justify-between">
                          <span>Probe Input x: {probeX}</span>
                        </label>
                        <input
                          type="range"
                          min={-2}
                          max={3}
                          step={0.5}
                          value={probeX}
                          onChange={(e) => setProbeX(Number(e.target.value))}
                          className="w-full mt-1 accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-1">
                        <div className="text-indigo-300 font-bold">
                          Point on f: ({probeX}, {(funcSlope * probeX + funcIntercept).toFixed(1)})
                        </div>
                        <div className="text-emerald-300 font-bold">
                          Point on f⁻¹: ({(funcSlope * probeX + funcIntercept).toFixed(1)}, {probeX})
                        </div>
                      </div>
                    </div>

                    {/* Coordinate Graph */}
                    <div className="lg:col-span-2 p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                          Reflection Mirror Graph
                        </span>
                        <div className="flex gap-3 text-xs">
                          <span className="text-indigo-400 font-bold">— f(x)</span>
                          <span className="text-amber-400 font-bold">--- y = x (Mirror)</span>
                          <span className="text-emerald-400 font-bold">— f⁻¹(x)</span>
                        </div>
                      </div>

                      <svg viewBox="-150 -150 300 300" className="w-full h-64 bg-slate-900 rounded-lg">
                        {/* Axes */}
                        <line x1="-140" y1="0" x2="140" y2="0" stroke="#475569" strokeWidth="1" />
                        <line x1="0" y1="-140" x2="0" y2="140" stroke="#475569" strokeWidth="1" />

                        {/* Diagonal Mirror line y = x */}
                        <line x1="-130" y1="130" x2="130" y2="-130" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" />

                        {/* Function line: y = mx + c */}
                        <line
                          x1={-100}
                          y1={-((-100 / 25) * funcSlope + funcIntercept) * 25}
                          x2={100}
                          y2={-((100 / 25) * funcSlope + funcIntercept) * 25}
                          stroke="#818cf8"
                          strokeWidth="2.5"
                        />

                        {/* Inverse Function line: y = (x - c)/m */}
                        <line
                          x1={-100}
                          y1={-(((-100 / 25) - funcIntercept) / funcSlope) * 25}
                          x2={100}
                          y2={-(((100 / 25) - funcIntercept) / funcSlope) * 25}
                          stroke="#34d399"
                          strokeWidth="2.5"
                        />

                        {/* Current Probe Points */}
                        {(() => {
                          const fx = funcSlope * probeX + funcIntercept;
                          const px = probeX * 25;
                          const py = -fx * 25;
                          const ipx = fx * 25;
                          const ipy = -probeX * 25;
                          return (
                            <g>
                              {/* Connector line between mirror points */}
                              <line x1={px} y1={py} x2={ipx} y2={ipy} stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="2 2" />
                              <circle cx={px} cy={py} r="5" fill="#818cf8" />
                              <circle cx={ipx} cy={ipy} r="5" fill="#34d399" />
                            </g>
                          );
                        })()}
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: TRIG PRINCIPAL BRANCH RESTRICTION (c12_math_008 & c12_math_009) ─── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Unit Circle Visualizer with real-time slider */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                        Unit Circle Phase Angle θ = {circleAngleDeg}° ({(circleAngleDeg * Math.PI / 180).toFixed(2)} rad)
                      </span>

                      <svg viewBox="-120 -120 240 240" className="w-full h-52 bg-slate-900 rounded-lg">
                        {/* Axes */}
                        <line x1="-110" y1="0" x2="110" y2="0" stroke="#475569" strokeWidth="1" />
                        <line x1="0" y1="-110" x2="0" y2="110" stroke="#475569" strokeWidth="1" />

                        {/* Unit circle */}
                        <circle cx="0" cy="0" r="80" fill="none" stroke="#64748b" strokeWidth="1.5" />

                        {/* Principal Branch Highlight for sin: right semicircle [-pi/2, pi/2] */}
                        <path
                          d="M 0 -80 A 80 80 0 0 1 0 80"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="4"
                          strokeOpacity="0.8"
                        />

                        {/* Angle Ray */}
                        {(() => {
                          const rad = (circleAngleDeg * Math.PI) / 180;
                          const px = 80 * Math.cos(rad);
                          const py = -80 * Math.sin(rad); // SVG y inverted
                          return (
                            <g>
                              <line x1="0" y1="0" x2={px} y2={py} stroke="#f59e0b" strokeWidth="2.5" />
                              <circle cx={px} cy={py} r="6" fill="#f59e0b" />
                              <line x1={px} y1={py} x2={px} y2="0" stroke="#818cf8" strokeWidth="2" strokeDasharray="3 3" />
                            </g>
                          );
                        })()}
                      </svg>

                      <input
                        type="range"
                        min={-180}
                        max={180}
                        step={5}
                        value={circleAngleDeg}
                        onChange={(e) => setCircleAngleDeg(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>

                    {/* Principal Evaluation Feedback */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                      <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                        Trigonometric Invertibility Test
                      </span>

                      {(() => {
                        const rad = (circleAngleDeg * Math.PI) / 180;
                        const sinVal = Math.sin(rad);
                        const inSinBranch = circleAngleDeg >= -90 && circleAngleDeg <= 90;
                        const principalSinDeg = Math.round((Math.asin(sinVal) * 180) / Math.PI);

                        return (
                          <div className="space-y-3 text-sm">
                            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                              <div className="text-slate-400 text-xs">Current Input sin(θ):</div>
                              <div className="text-lg font-bold text-indigo-300">
                                sin({circleAngleDeg}°) = {sinVal.toFixed(3)}
                              </div>
                            </div>

                            <div
                              className={`p-3 rounded-lg border ${
                                inSinBranch
                                  ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                                  : 'bg-amber-950/60 border-amber-600 text-amber-300'
                              }`}
                            >
                              <div className="text-xs font-bold uppercase">
                                {inSinBranch ? '✓ Inside Principal Branch [-90°, 90°]' : '⚠️ Outside Principal Branch!'}
                              </div>
                              <div className="text-xs mt-1">
                                Principal value returned by sin⁻¹({sinVal.toFixed(3)}) is{' '}
                                <span className="font-bold underline">{principalSinDeg}°</span>
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      <p className="text-xs text-slate-400">
                        Notice how angles outside [-90°, 90°] share identical sine values, which is why sine must be restricted to make it bijective!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: INVERSE TRIG GRAPHS & ASYMPTOTES (c12_math_010) ─── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                      Select Inverse Trigonometric Function:
                    </span>
                    <div className="flex gap-2">
                      {(['arcsin', 'arccos', 'arctan'] as const).map(type => (
                        <motion.button
                          key={type}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            audioManager.play('pop');
                            setSelectedGraphType(type);
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                            selectedGraphType === type
                              ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-900/50'
                              : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                          }`}
                        >
                          {type === 'arcsin' ? 'y = sin⁻¹(x)' : type === 'arccos' ? 'y = cos⁻¹(x)' : 'y = tan⁻¹(x)'}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Graph Canvas Display */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>
                        Domain:{' '}
                        <strong className="text-indigo-300">
                          {selectedGraphType === 'arctan' ? '(-∞, ∞)' : '[-1, 1]'}
                        </strong>
                      </span>
                      <span>
                        Range (Principal Branch):{' '}
                        <strong className="text-emerald-300">
                          {selectedGraphType === 'arcsin'
                            ? '[-π/2, π/2]'
                            : selectedGraphType === 'arccos'
                            ? '[0, π]'
                            : '(-π/2, π/2)'}
                        </strong>
                      </span>
                    </div>

                    <svg viewBox="-150 -100 300 200" className="w-full h-64 bg-slate-900 rounded-lg">
                      {/* Axes */}
                      <line x1="-140" y1="0" x2="140" y2="0" stroke="#475569" strokeWidth="1" />
                      <line x1="0" y1="-90" x2="0" y2="90" stroke="#475569" strokeWidth="1" />

                      {/* Asymptotes for tan^-1 */}
                      {selectedGraphType === 'arctan' && (
                        <g>
                          <line x1="-140" y1="-45" x2="140" y2="-45" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" />
                          <line x1="-140" y1="45" x2="140" y2="45" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" />
                          <text x="100" y="-50" fill="#ef4444" fontSize="9">y = π/2 asymptote</text>
                          <text x="100" y="58" fill="#ef4444" fontSize="9">y = -π/2 asymptote</text>
                        </g>
                      )}

                      {/* Curves */}
                      {selectedGraphType === 'arcsin' && (
                        <path
                          d="M -80 45 Q -40 30 0 0 Q 40 -30 80 -45"
                          fill="none"
                          stroke="#818cf8"
                          strokeWidth="3"
                        />
                      )}

                      {selectedGraphType === 'arccos' && (
                        <path
                          d="M -80 -90 Q -30 -60 0 -45 Q 40 -20 80 0"
                          fill="none"
                          stroke="#818cf8"
                          strokeWidth="3"
                        />
                      )}

                      {selectedGraphType === 'arctan' && (
                        <path
                          d="M -130 40 Q -50 35 0 0 Q 50 -35 130 -40"
                          fill="none"
                          stroke="#818cf8"
                          strokeWidth="3"
                        />
                      )}
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Bottom Lab Navigation */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                audioManager.play('pop');
                setCurrentSlide(s => Math.max(0, s - 1));
              }}
              disabled={currentSlide === 0}
              aria-label="Previous Lab"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-750 text-white font-semibold rounded-xl disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  audioManager.play('whoosh');
                  setCurrentSlide(s => s + 1);
                }}
                aria-label="Next Lab"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Proceed to Sandbox Mode"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg"
              >
                Launch Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX PLAY (NO PRESSURE) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🎮</span> Free Mathematical Sandbox
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Explore presets or build custom relations with zero time pressure or grading.
                </p>
              </div>

              <div className="flex gap-2">
                {(['identity', 'empty', 'universal'] as const).map(preset => (
                  <motion.button
                    key={preset}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleApplySandboxPreset(preset)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-bold rounded-lg capitalize"
                  >
                    Preset: {preset}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Sandbox Matrix Table */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono max-w-md mx-auto p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="p-2 text-slate-500 font-bold">A×A</div>
              {[1, 2, 3].map(col => (
                <div key={col} className="p-2 font-bold text-indigo-400">c{col}</div>
              ))}
              {[1, 2, 3].map(row => (
                <React.Fragment key={row}>
                  <div className="p-2 font-bold text-indigo-400 flex items-center justify-center">r{row}</div>
                  {[1, 2, 3].map(col => {
                    const key = `${row}-${col}`;
                    const active = matrixPairs[key];
                    return (
                      <button
                        key={key}
                        onClick={() => handleToggleMatrixPair(key)}
                        className={`p-3 rounded-lg font-bold border transition-all ${
                          active
                            ? 'bg-indigo-600 border-indigo-400 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-600'
                        }`}
                      >
                        {active ? '1' : '0'}
                      </button>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>

            {/* Sandbox Live Readout */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Reflexive:</span>
                <div className={`font-bold ${relationProperties.isReflexive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {relationProperties.isReflexive ? 'YES' : 'NO'}
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Symmetric:</span>
                <div className={`font-bold ${relationProperties.isSymmetric ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {relationProperties.isSymmetric ? 'YES' : 'NO'}
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Transitive:</span>
                <div className={`font-bold ${relationProperties.isTransitive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {relationProperties.isTransitive ? 'YES' : 'NO'}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Ready for Challenges"
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold text-base rounded-xl shadow-xl flex items-center gap-2"
              >
                <span>Ready for Flight Certification Challenges</span>
                <span>→</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CERTIFICATION CHALLENGES (ADAPTIVE & NEP 2020 ALIGNED) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Animated 2D Telemetry Wave Header */}
          <canvas ref={canvasRef} width={600} height={40} className="w-full rounded-xl bg-slate-950 border border-slate-800" />

          {/* Progress Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 bg-indigo-950 text-indigo-300 rounded border border-indigo-700 uppercase">
                {challenge.competencyLevel}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </h2>
            </div>

            <span className="text-xs text-slate-400">
              Score: <strong className="text-emerald-400">{scoreBreakdown.correct}</strong> / {scoreBreakdown.total}
            </span>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Challenge Box */}
          <div
            className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'border-slate-800 shadow-xl'
            }`}
          >
            <motion.p
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={wrongShake ? { duration: 0.4 } : {}}
              className="text-base sm:text-lg font-semibold text-slate-100 mb-6 leading-relaxed"
            >
              {challenge.question}
            </motion.p>

            {/* 1. MCQ Options */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* 2. Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag items to correct targets:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-xs font-bold text-white cursor-grab shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map(targetId => (
                    <div
                      key={targetId}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center min-h-[80px] transition-colors ${
                        droppedLabels[targetId]
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-700 text-slate-500'
                      }`}
                    >
                      <span className="text-xs uppercase font-semibold text-slate-400">Target Area:</span>
                      <span className="text-sm font-bold mt-1">
                        {droppedLabels[targetId] || 'Drop Label Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Verify Dropped Labels"
                  className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl"
                >
                  Verify Matrix Labels
                </motion.button>
              </div>
            )}

            {/* 3. Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
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
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs font-semibold text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(sortArrangement)}
                  disabled={showExplanation}
                  aria-label="Submit Sorted Order"
                  className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl"
                >
                  Verify Pipeline Order
                </motion.button>
              </div>
            )}

            {/* 4. Numeric Input */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numerical value"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-indigo-500 focus:outline-none w-48"
                  />
                  <span className="text-sm font-semibold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit Numeric Answer"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg"
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. Construct Assembly Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-amber-300">💡 {challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-2 bg-indigo-900/80 hover:bg-indigo-800 border border-indigo-600 rounded-lg text-xs font-mono font-bold text-white"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <div key={idx} className="px-3 py-1 bg-indigo-600 rounded-lg text-xs font-bold text-white flex items-center gap-2">
                      <span>{part}</span>
                      <button onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))} className="text-rose-300 font-bold">×</button>
                    </div>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click elements above to assemble</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl"
                >
                  Submit Construction
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-indigo-950/70 to-slate-900 rounded-xl border border-indigo-800/80 space-y-3"
              >
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                  <span>📜</span> Rigorous Mathematical Explanation:
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.p
                        key={sIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-slate-300 leading-relaxed"
                      >
                        <span className="text-indigo-400 font-bold">{sIdx + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-indigo-800 hover:bg-indigo-750 text-white rounded-lg text-xs font-bold"
                    >
                      Reveal Next Proof Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Proceed to Next Challenge"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission Score →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MASTERY PROFILE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          {/* Completion Header */}
          <div className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-2xl border border-indigo-700/60 text-center space-y-3 shadow-2xl">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Spacecraft Telemetry Protocol Certified!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have completed the full Class 12 ISC mathematical spectrum: relations, equivalence partitions, bijective invertibility, and inverse trigonometric principal branches.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-center min-w-[120px]">
                <span className="text-xs text-slate-400 uppercase font-bold">Accuracy Score</span>
                <div className="text-2xl font-black text-emerald-400 mt-1">
                  {Math.max(0, 100 - errors * 5)}%
                </div>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-center min-w-[120px]">
                <span className="text-xs text-slate-400 uppercase font-bold">BKT Mastery Tier</span>
                <div className="text-2xl font-black text-indigo-300 mt-1 capitalize">
                  {masteryLevel}
                </div>
              </div>
            </div>
          </div>

          {/* Motivational Feedback Banner (Personalised by Error Count) */}
          <div className="p-5 bg-gradient-to-r from-indigo-950/90 to-slate-900 rounded-xl border border-indigo-700/60 text-center space-y-1">
            <div className="text-lg font-black text-amber-300">
              {errors === 0 && 'PERFECT SCORE!'}
              {errors >= 1 && errors <= 3 && 'Great work!'}
              {errors >= 4 && errors <= 7 && 'Good effort!'}
              {errors >= 8 && 'Do not give up — You WILL get this!'}
            </div>
            <p className="text-xs text-slate-300">
              {errors === 0
                ? 'Flawless precision across all CISCE Class 12 concepts.'
                : errors <= 3
                ? 'Strong performance with sound algebraic and geometric intuition.'
                : errors <= 7
                ? 'You are making steady progress — practice the key relation proofs.'
                : 'Every attempt strengthens your understanding. Review the hints and try again!'}
            </p>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/50 rounded-2xl border border-rose-800 space-y-4">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-base">
                <span>⚠️</span> Identified Misconception Profile
              </div>
              <div className="space-y-3">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-4 bg-slate-900/90 rounded-xl border border-rose-900/50 space-y-1">
                      <p className="text-xs font-bold text-rose-400">❌ Misconception: {m.misconception}</p>
                      <p className="text-xs text-emerald-300 font-medium">✓ Correct Principle: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule (SM-2) */}
          <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              📅 Spaced Repetition Review Schedule
            </span>
            <p className="text-xs text-slate-300">
              To consolidate these mathematical patterns into long-term memory, next review interval is in{' '}
              <strong className="text-amber-300">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </strong>
              .
            </p>
          </div>

          {/* Real-World Mission Activity */}
          <div className="p-6 bg-gradient-to-br from-indigo-950/40 to-slate-900 rounded-2xl border border-indigo-800/50 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛰️</span>
              <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="text-xs text-indigo-300/90 flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Telemetry Checkpoint Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export { C12_MathematicsTypesRelationsReflexiveSim };
export const simComponent = C12_MathematicsTypesRelationsReflexiveSim;
export default C12_MathematicsTypesRelationsReflexiveSim;
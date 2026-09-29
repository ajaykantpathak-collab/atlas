'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 11 MATHEMATICS CURRICULUM NODE IDENTIFIERS ───
const NODE_C11_MATH_031 = 'c11_math_031'; // Half angle & one-third angle formulas
const NODE_C11_MATH_032 = 'c11_math_032'; // Proving simple trigonometric identities
const NODE_C11_MATH_033 = 'c11_math_033'; // Relationship between trigonometric functions & quadrant ASTC rules
const NODE_C11_MATH_034 = 'c11_math_034'; // Complex numbers - definition, standard form a + bi, equality
const NODE_C11_MATH_035 = 'c11_math_035'; // Algebraic properties of complex numbers (closure, commutative, associative, distributive)
const NODE_C11_MATH_036 = 'c11_math_036'; // Conjugate, modulus, and principal argument
const NODE_C11_MATH_037 = 'c11_math_037'; // Argand plane, polar representation, and geometric transformation
const NODE_C11_MATH_038 = 'c11_math_038'; // Operations on complex numbers (addition, subtraction, multiplication, rational division)
const NODE_C11_MATH_039 = 'c11_math_039'; // Additive & multiplicative inverses in field C
const NODE_C11_MATH_040 = 'c11_math_040'; // Square root of a complex number (algebraic derivation)

const ALL_NODE_IDS = [
  NODE_C11_MATH_031,
  NODE_C11_MATH_032,
  NODE_C11_MATH_033,
  NODE_C11_MATH_034,
  NODE_C11_MATH_035,
  NODE_C11_MATH_036,
  NODE_C11_MATH_037,
  NODE_C11_MATH_038,
  NODE_C11_MATH_039,
  NODE_C11_MATH_040,
];

// ─── NARRATIVE SCENARIO CONTEXT ───
const SCENARIO = {
  title: 'Quantum Radar Phaser Synthesis & Orbital Telemetry Navigation',
  intro: 'ISRO mission telemetry engineers at Sriharikota spaceport are calibrating advanced multi-frequency phased array radar dishes. High-frequency radar pulses undergo acute phase shifts, trigonometric wave folding, impedance matching, and complex power phasor reflections on the Argand plane.',
  context: 'Your role as Flight Dynamics Lead Mathematician: Master angle reduction derivations, trigonometric identity transformations, and 2D complex vector algebra to synthesize radar wave signals with pinpoint precision.',
  callsign: 'ASTRA-TELEMETRY-RADAR-11',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In microwave waveguide engineering, if an antenna signal angle is doubled to 2θ with cos(2θ) = 7/25 in Quadrant I (0 < 2θ < π/2), what is the exact magnitude of sin(θ)?',
  options: [
    'sin(θ) = 3/5 because sin²(θ) = (1 - cos 2θ) / 2',
    'sin(θ) = 4/5 because sin(θ) is half of cos(2θ)',
    'sin(θ) = 7/50 because you divide the ratio by 2',
    'sin(θ) = ±sqrt(7/25) with undefined quadrant sign',
  ],
  correctIndex: 0,
  hintAfter: 'Let us step into the interactive unit circle and Argand plane to discover how double-angle, half-angle reductions, and complex phasor geometry operate with absolute algebraic rigor!',
};

// ─── BRILLIANT-STYLE OBSERVATION QUESTIONS (WHAT DO YOU NOTICE?) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    prompt: 'What do you notice about the half-angle vector θ/2 (cyan dashed) as you drag the primary angle slider θ from 0° to 360°?',
    observableOptions: [
      'The half-angle θ/2 always traces exactly half the arc of θ, spanning only [0°, 180°] while θ covers [0°, 360°]',
      'The half-angle θ/2 rotates in the opposite clockwise direction compared to θ',
      'The vector length of θ/2 shrinks to half the radius of the unit circle',
      'The half-angle vector is restricted strictly to Quadrant IV',
    ],
    correctIndex: 0,
    explanation: 'Halving the input angle θ dynamically compresses the angular domain by a factor of 2. When θ spans 0° to 360°, the half-angle θ/2 sweeps smoothly from 0° to 180° across Quadrants I and II.',
  },
  {
    id: 'obs_2',
    prompt: 'What do you notice about the complex conjugate vector z̄ = a - bi relative to z = a + bi on the Argand plane?',
    observableOptions: [
      'z̄ is an exact horizontal mirror reflection across the Real axis with identical modulus |z| = |z̄|',
      'z̄ is reflected across the imaginary axis, flipping the sign of the real part',
      'z̄ always has a modulus twice as large as the original vector z',
      'z̄ is rotated 90 degrees counter-clockwise from z',
    ],
    correctIndex: 0,
    explanation: 'Complex conjugation negates the imaginary part b -> -b while preserving the real part a. Geometrically, this reflects the point across the horizontal real axis without changing Euclidean distance from origin.',
  },
];

// ─── CHALLENGE DATA STRUCTURE ───
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

// ─── 24 COMPREHENSIVE CHALLENGES (NEP 2020 / CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // ── 8 FOUNDATION CHALLENGES ──
  {
    id: 'ch_f01',
    nodeId: NODE_C11_MATH_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following expressions correctly defines the half-angle formula for sin²(θ/2) derived from the double-angle cosine identity cos(θ) = 1 - 2sin²(θ/2)?',
    options: [
      'sin²(θ/2) = (1 - cos θ) / 2',
      'sin²(θ/2) = (1 + cos θ) / 2',
      'sin²(θ/2) = (1 - sin θ) / 2',
      'sin²(θ/2) = (cos θ - 1) / 2',
    ],
    correctIndex: 0,
    explanation: 'From the fundamental identity cos θ = 1 - 2sin²(θ/2), we isolate 2sin²(θ/2) = 1 - cos θ. Dividing both sides by 2 gives sin²(θ/2) = (1 - cos θ) / 2.',
    hints: [
      'Recall the double-angle identity: cos(2x) = 1 - 2sin²(x).',
      'Set 2x = θ, which means x = θ/2.',
      'Rearrange the equation to place sin²(θ/2) strictly on the left-hand side.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_f02',
    nodeId: NODE_C11_MATH_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'For the complex number z = -7 + 4i, identify the real part Re(z) and the imaginary part Im(z).',
    options: [
      'Re(z) = -7, Im(z) = 4',
      'Re(z) = -7, Im(z) = 4i',
      'Re(z) = 7, Im(z) = -4',
      'Re(z) = 4, Im(z) = -7',
    ],
    correctIndex: 0,
    explanation: 'In the standard representation z = a + bi, the real part is Re(z) = a = -7, and the imaginary part Im(z) is defined strictly as the real coefficient b = 4, excluding the unit i.',
    hints: [
      'Every complex number has the form a + bi where a, b are real numbers.',
      'Re(z) is the standalone real component.',
      'Im(z) is the numerical coefficient multiplying i, not including i itself.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_f03',
    nodeId: NODE_C11_MATH_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'If angle x lies in Quadrant III (π < x < 3π/2), which trigonometric functions evaluate strictly to POSITIVE values?',
    options: [
      'tan x and cot x only',
      'sin x and cosec x only',
      'cos x and sec x only',
      'All six circular trigonometric functions',
    ],
    correctIndex: 0,
    explanation: 'In Quadrant III, both horizontal coordinate (cos x) and vertical coordinate (sin x) are negative. Their ratio tan x = sin x / cos x is (-)/(-) = (+), and cot x = 1/tan x is also (+). By the ASTC rule (Quadrant III = Tan), only tan and cot are positive.',
    hints: [
      'Remember the ASTC quadrant memory rule: All (Q1), Sin (Q2), Tan (Q3), Cos (Q4).',
      'In Quadrant III, x-coordinate < 0 and y-coordinate < 0.',
      'Dividing a negative value by another negative value yields a positive result.',
    ],
  },
  {
    id: 'ch_f04',
    nodeId: NODE_C11_MATH_036,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Calculate the exact modulus |z| of the complex number z = 6 - 8i.',
    correctAnswer: 10,
    tolerance: 0.1,
    unit: 'units',
    explanation: '|z| = sqrt(a² + b²) = sqrt(6² + (-8)²) = sqrt(36 + 64) = sqrt(100) = 10 units. Modulus represents Euclidean distance from the origin on the Argand plane.',
    hints: [
      'Apply the modulus formula |z| = sqrt(a² + b²).',
      'Square the real part: 6² = 36. Square the imaginary part: (-8)² = 64.',
      'Add the squares: 36 + 64 = 100, and evaluate sqrt(100).',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_f05',
    nodeId: NODE_C11_MATH_035,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What are the additive identity and multiplicative identity elements in the field of complex numbers C?',
    options: [
      'Additive identity = 0 + 0i (0), Multiplicative identity = 1 + 0i (1)',
      'Additive identity = 1 + 0i (1), Multiplicative identity = 0 + 0i (0)',
      'Additive identity = 0, Multiplicative identity = i',
      'Additive identity = -1, Multiplicative identity = 1 + i',
    ],
    correctIndex: 0,
    explanation: 'For any complex number z, z + (0 + 0i) = z (hence 0 is additive identity) and z * (1 + 0i) = z (hence 1 is multiplicative identity). The imaginary unit i is an operator, not an identity.',
    hints: [
      'What quantity added to z leaves z unchanged?',
      'What quantity multiplied by z leaves z unchanged?',
      'The identity elements are the real scalars 0 and 1 embedded within the complex plane.',
    ],
  },
  {
    id: 'ch_f06',
    nodeId: NODE_C11_MATH_038,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Compute the subtraction (8 + 5i) - (3 - 4i) and express the result in standard form a + bi.',
    options: [
      '5 + 9i',
      '5 + i',
      '11 + 9i',
      '5 - 9i',
    ],
    correctIndex: 0,
    explanation: 'Subtract component-wise: Re = 8 - 3 = 5; Im = 5 - (-4) = 5 + 4 = 9. The resulting complex number is 5 + 9i.',
    hints: [
      'Distribute the negative sign: - (3 - 4i) = -3 + 4i.',
      'Group real terms together: 8 - 3.',
      'Group imaginary terms together: 5i + 4i.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_f07',
    nodeId: NODE_C11_MATH_039,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the additive inverse of the complex number z = 4 - 9i?',
    options: [
      '-4 + 9i',
      '-4 - 9i',
      '4 + 9i',
      '(4 + 9i) / 97',
    ],
    correctIndex: 0,
    explanation: 'The additive inverse -z satisfies z + (-z) = 0. Therefore, -z = -(4 - 9i) = -4 + 9i. Both the real and imaginary parts must be negated.',
    hints: [
      'The additive inverse is obtained by multiplying the entire complex number by -1.',
      'Negate the real part: 4 -> -4.',
      'Negate the imaginary part: -9i -> +9i.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_f08',
    nodeId: NODE_C11_MATH_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'If two complex numbers z₁ = (2x - 3) + 5i and z₂ = 7 + (y + 1)i are equal (z₁ = z₂), find the values of the real variables x and y.',
    options: [
      'x = 5, y = 4',
      'x = 2, y = 6',
      'x = 5, y = 5',
      'x = 4, y = 4',
    ],
    correctIndex: 0,
    explanation: 'By the definition of equality in C, real parts must match and imaginary parts must match independently: 2x - 3 = 7 => 2x = 10 => x = 5; and 5 = y + 1 => y = 4.',
    hints: [
      'Two complex numbers are equal if and only if Re(z₁) = Re(z₂) and Im(z₁) = Im(z₂).',
      'Set 2x - 3 = 7 to solve for x.',
      'Set y + 1 = 5 to solve for y.',
    ],
  },

  // ── 8 STANDARD CHALLENGES ──
  {
    id: 'ch_s01',
    nodeId: NODE_C11_MATH_031,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Given cos(π/4) = 1/√2, evaluate the exact value of cos(π/8) using the half-angle formula. Note that π/8 lies in Quadrant I.',
    options: [
      'sqrt(2 + sqrt(2)) / 2',
      'sqrt(2 - sqrt(2)) / 2',
      '(1 + sqrt(2)) / 2',
      'sqrt(2) / 4',
    ],
    correctIndex: 0,
    explanation: 'Apply cos²(θ/2) = (1 + cos θ)/2 with θ = π/4: cos²(π/8) = (1 + 1/√2)/2 = (√2 + 1)/(2√2) = (2 + √2)/4. Taking the positive root since π/8 ∈ Q1 gives cos(π/8) = sqrt(2 + √2)/2.',
    hints: [
      'Use the cosine half-angle formula: cos(θ/2) = +sqrt((1 + cos θ) / 2) for θ/2 in Q1.',
      'Substitute cos(π/4) = 1/√2 into the formula.',
      'Rationalize (1 + 1/√2)/2 = (2 + √2)/4, then take the square root of numerator and denominator.',
    ],
  },
  {
    id: 'ch_s02',
    nodeId: NODE_C11_MATH_032,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the logical derivation steps to prove the trigonometric identity: (sin x + cos x)² = 1 + sin 2x.',
    sortItems: [
      'Step A: Expand binomial square: sin²x + 2 sin x cos x + cos²x',
      'Step B: Regroup terms: (sin²x + cos²x) + 2 sin x cos x',
      'Step C: Apply Pythagorean identity: substitute (sin²x + cos²x) = 1',
      'Step D: Apply double-angle formula: substitute 2 sin x cos x = sin 2x to obtain 1 + sin 2x',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First expand (a+b)² = a² + 2ab + b², group the square terms, substitute the fundamental identity sin²x + cos²x = 1, and substitute the double-angle identity 2sin x cos x = sin 2x.',
    hints: [
      'Start with algebraic binomial expansion of (sin x + cos x)².',
      'Reorder terms to place sine squared adjacent to cosine squared.',
      'Apply the Pythagorean identity before substituting the double-angle identity.',
    ],
  },
  {
    id: 'ch_s03',
    nodeId: NODE_C11_MATH_036,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Determine the exact principal argument arg(z) of the complex number z = -1 + i√3. Note that the point lies in Quadrant II.',
    options: [
      '2π/3 radians (120°)',
      '-π/3 radians (-60°)',
      '5π/6 radians (150°)',
      'π/3 radians (60°)',
    ],
    correctIndex: 0,
    explanation: 'For z = -1 + i√3, real part a = -1 < 0 and imaginary part b = √3 > 0, placing z in Quadrant II. The reference angle is α = tan⁻¹(|b/a|) = tan⁻¹(√3/1) = π/3 (60°). In Quadrant II, arg(z) = π - α = π - π/3 = 2π/3 radians (120°).',
    hints: [
      'Check the coordinate signs: (-1, √3) lies in Quadrant II.',
      'Compute the reference acute angle α = tan⁻¹(|b/a|) = tan⁻¹(√3) = π/3.',
      'In Quadrant II, principal argument is arg(z) = π - α.',
    ],
  },
  {
    id: 'ch_s04',
    nodeId: NODE_C11_MATH_037,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Map each complex number to its respective quadrant on the Argand plane based on the signs of Re(z) and Im(z).',
    dragItems: [
      { label: '3 + 4i', targetId: 'target_q1' },
      { label: '-2 + 5i', targetId: 'target_q2' },
      { label: '-3 - 3i', targetId: 'target_q3' },
      { label: '4 - 2i', targetId: 'target_q4' },
    ],
    correctMapping: {
      target_q1: '3 + 4i',
      target_q2: '-2 + 5i',
      target_q3: '-3 - 3i',
      target_q4: '4 - 2i',
    },
    explanation: 'Quadrant I requires (+a, +b), Quadrant II requires (-a, +b), Quadrant III requires (-a, -b), and Quadrant IV requires (+a, -b).',
    hints: [
      'Positive real and positive imaginary -> Quadrant I.',
      'Negative real and positive imaginary -> Quadrant II.',
      'Negative real and negative imaginary -> Quadrant III; positive real and negative imaginary -> Quadrant IV.',
    ],
  },
  {
    id: 'ch_s05',
    nodeId: NODE_C11_MATH_038,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the product (3 + 2i)(1 - 4i) and express in standard form a + bi.',
    options: [
      '11 - 10i',
      '3 - 10i',
      '11 + 10i',
      '-5 - 10i',
    ],
    correctIndex: 0,
    explanation: 'Expand using FOIL: (3)(1) + 3(-4i) + (2i)(1) + (2i)(-4i) = 3 - 12i + 2i - 8i². Since i² = -1, -8i² = +8. Thus, (3 + 8) + (-12 + 2)i = 11 - 10i.',
    hints: [
      'Use binomial distribution: (a + bi)(c + di) = (ac - bd) + (ad + bc)i.',
      'Remember that i² = -1, which flips the sign of the product of imaginary terms.',
      'Combine 3 + 8 = 11 and -12i + 2i = -10i.',
    ],
  },
  {
    id: 'ch_s06',
    nodeId: NODE_C11_MATH_039,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the multiplicative inverse (reciprocal) z⁻¹ of the complex number z = 3 + 4i.',
    options: [
      '3/25 - (4/25)i',
      '3 - 4i',
      '1/3 - (1/4)i',
      '-3/25 + (4/25)i',
    ],
    correctIndex: 0,
    explanation: 'The multiplicative inverse is z⁻¹ = z̄ / |z|². For z = 3 + 4i, conjugate z̄ = 3 - 4i and |z|² = 3² + 4² = 25. Therefore, z⁻¹ = (3 - 4i)/25 = 3/25 - (4/25)i.',
    hints: [
      'Multiply 1 / (3 + 4i) numerator and denominator by conjugate (3 - 4i).',
      'Denominator evaluates to 3² + 4² = 25.',
      'Separate the real and imaginary fractions.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_s07',
    nodeId: NODE_C11_MATH_038,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Divide (3 + 4i) by (1 + 2i) and express the quotient in standard form a + bi.',
    options: [
      '11/5 - (2/5)i',
      '3 + 2i',
      '-1 + 2i',
      '7/5 + (4/5)i',
    ],
    correctIndex: 0,
    explanation: 'Multiply numerator and denominator by the conjugate of denominator (1 - 2i): Numerator = (3 + 4i)(1 - 2i) = 3 - 6i + 4i - 8i² = 3 - 2i + 8 = 11 - 2i. Denominator = 1² + 2² = 5. Quotient = 11/5 - (2/5)i.',
    hints: [
      'Rationalize the denominator by multiplying top and bottom by (1 - 2i).',
      'The denominator simplifies to 1² + (-2)² = 5.',
      'Expand the numerator carefully using i² = -1.',
    ],
  },
  {
    id: 'ch_s08',
    nodeId: NODE_C11_MATH_040,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Determine the two complex square roots of z = 3 + 4i.',
    options: [
      '±(2 + i)',
      '±(1 + 2i)',
      '±(2 - i)',
      '±(sqrt(3) + 2i)',
    ],
    correctIndex: 0,
    explanation: 'Let sqrt(3 + 4i) = ±(x + yi). Here a = 3, b = 4, |z| = sqrt(3² + 4²) = 5. Formula: x = sqrt((|z| + a)/2) = sqrt((5 + 3)/2) = sqrt(4) = 2. y = sqrt((|z| - a)/2) = sqrt((5 - 3)/2) = sqrt(1) = 1. Since b = 4 > 0, x and y have the same sign: ±(2 + i). Verify: (2 + i)² = 4 - 1 + 4i = 3 + 4i.',
    hints: [
      'Calculate modulus: |z| = sqrt(3² + 4²) = 5.',
      'Compute real part magnitude: x = sqrt((|z| + a)/2) = sqrt(8/2) = 2.',
      'Compute imaginary part magnitude: y = sqrt((|z| - a)/2) = sqrt(2/2) = 1.',
      'Since b = +4 is positive, signs of x and y match.',
    ],
  },

  // ── 8 ADVANCED CHALLENGES ──
  {
    id: 'ch_a01',
    nodeId: NODE_C11_MATH_040,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Evaluate the square root of the complex number z = -5 + 12i. Pay particular attention to the negative real part a = -5.',
    options: [
      '±(2 + 3i)',
      '±(3 + 2i)',
      '±(2 - 3i)',
      '±(3 - 2i)',
    ],
    correctIndex: 0,
    explanation: 'For z = -5 + 12i, a = -5, b = 12. Modulus |z| = sqrt((-5)² + 12²) = sqrt(25 + 144) = sqrt(169) = 13. Then x² = (|z| + a)/2 = (13 + (-5))/2 = 8/2 = 4 => x = 2. y² = (|z| - a)/2 = (13 - (-5))/2 = 18/2 = 9 => y = 3. Since b = 12 > 0, signs of x and y match: ±(2 + 3i). Verify: (2 + 3i)² = 4 - 9 + 12i = -5 + 12i.',
    hints: [
      'Modulus is |z| = sqrt((-5)² + 12²) = 13.',
      'Substitute a = -5 into x² = (|z| + a)/2 = (13 - 5)/2 = 4.',
      'Substitute a = -5 into y² = (|z| - a)/2 = (13 - (-5))/2 = 9.',
      'Because b = +12 > 0, x and y share identical signs.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_a02',
    nodeId: NODE_C11_MATH_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'If cos θ = 3/5 and angle θ is in Quadrant IV (3π/2 < θ < 2π), find the exact values of sin(θ/2) and cos(θ/2).',
    options: [
      'sin(θ/2) = 1/√5, cos(θ/2) = -2/√5',
      'sin(θ/2) = -1/√5, cos(θ/2) = 2/√5',
      'sin(θ/2) = 1/√5, cos(θ/2) = 2/√5',
      'sin(θ/2) = -2/√5, cos(θ/2) = -1/√5',
    ],
    correctIndex: 0,
    explanation: 'Given 3π/2 < θ < 2π, divide by 2 to determine the interval of θ/2: 3π/4 < θ/2 < π (Quadrant II). In Quadrant II, sine is POSITIVE and cosine is NEGATIVE. sin(θ/2) = +sqrt((1 - cos θ)/2) = +sqrt((1 - 3/5)/2) = +sqrt(2/10) = 1/√5. cos(θ/2) = -sqrt((1 + cos θ)/2) = -sqrt((1 + 3/5)/2) = -sqrt(8/10) = -2/√5.',
    hints: [
      'Divide the interval bounds 3π/2 < θ < 2π by 2 to find that 3π/4 < θ/2 < π (Quadrant II).',
      'In Quadrant II, sine is positive while cosine is strictly negative.',
      'Apply sin(θ/2) = +sqrt((1 - cos θ)/2) and cos(θ/2) = -sqrt((1 + cos θ)/2).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_a03',
    nodeId: NODE_C11_MATH_032,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'To prove the identity cos⁴x - sin⁴x = cos 2x, which algebraic factoring identity provides the most direct proof?',
    options: [
      'Difference of squares: a² - b² = (a - b)(a + b) applied to (cos²x)² - (sin²x)²',
      'Sum of cubes: a³ + b³ = (a + b)(a² - ab + b²)',
      'Expansion of fourth power binomial (cos x - sin x)⁴',
      'Cross multiplying and squaring both sides',
    ],
    correctIndex: 0,
    explanation: 'Factor cos⁴x - sin⁴x as ((cos²x)² - (sin²x)²) = (cos²x - sin²x)(cos²x + sin²x). By Pythagorean identity, (cos²x + sin²x) = 1. By double angle cosine identity, (cos²x - sin²x) = cos 2x. Thus cos 2x * 1 = cos 2x immediately.',
    hints: [
      'Express cos⁴x as (cos²x)² and sin⁴x as (sin²x)².',
      'Factor as (cos²x - sin²x)(cos²x + sin²x).',
      'Replace cos²x + sin²x with 1 and cos²x - sin²x with cos 2x.',
    ],
  },
  {
    id: 'ch_a04',
    nodeId: NODE_C11_MATH_037,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the polar form representation of z = -2 - 2i by assembling the exact factors.',
    availableParts: ['2√2', '√8', 'cos(-3π/4)', '+ i sin(-3π/4)', 'cos(3π/4)', '+ i sin(3π/4)', 'cos(π/4)'],
    targetState: '2√2 cos(-3π/4) + i sin(-3π/4)',
    validationHint: 'Modulus is sqrt((-2)² + (-2)²) = 2√2. Both coordinates are negative, so principal argument in (-π, π] is -3π/4.',
    explanation: 'Modulus r = sqrt((-2)² + (-2)²) = sqrt(8) = 2√2. In Quadrant III, principal argument arg(z) = -π + π/4 = -3π/4. Polar form: 2√2 [cos(-3π/4) + i sin(-3π/4)].',
    hints: [
      'Compute modulus r = sqrt(4 + 4) = 2√2.',
      'Locate (-2, -2) in Quadrant III: principal argument is -3π/4 radians.',
      'Assemble 2√2, cos(-3π/4), and + i sin(-3π/4).',
    ],
  },
  {
    id: 'ch_a05',
    nodeId: NODE_C11_MATH_039,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Evaluate the sum of reciprocals 1/(2 + 3i) + 1/(2 - 3i). Enter the exact real numerator when the expression is written over the denominator 13.',
    correctAnswer: 4,
    tolerance: 0.05,
    unit: 'numerator / 13',
    explanation: '1/(2 + 3i) = (2 - 3i)/(2² + 3²) = (2 - 3i)/13. 1/(2 - 3i) = (2 + 3i)/(2² + (-3)²) = (2 + 3i)/13. Adding them gives ((2 - 3i) + (2 + 3i))/13 = 4/13. The numerator is 4.',
    hints: [
      'Rationalize both fractions using their conjugates: (2 - 3i) and (2 + 3i).',
      'Both denominators become 2² + 3² = 4 + 9 = 13.',
      'Add numerators: (2 - 3i) + (2 + 3i) = 4 + 0i.',
    ],
  },
  {
    id: 'ch_a06',
    nodeId: NODE_C11_MATH_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'From the triple-angle identity cos(3x) = 4cos³x - 3cos x, let x = 20° (so 3x = 60°). Which cubic polynomial equation does c = cos(20°) satisfy?',
    options: [
      '8c³ - 6c - 1 = 0',
      '4c³ - 3c - 1 = 0',
      '8c³ + 6c - 1 = 0',
      '4c³ - 3c + 1/2 = 0',
    ],
    correctIndex: 0,
    explanation: 'Since cos(60°) = 1/2, substitute into triple-angle identity: 1/2 = 4c³ - 3c. Multiply the entire equation by 2: 1 = 8c³ - 6c => 8c³ - 6c - 1 = 0.',
    hints: [
      'Substitute x = 20° into cos(3 * 20°) = cos(60°) = 1/2.',
      'Write equation: 1/2 = 4c³ - 3c.',
      'Multiply through by 2 and transpose 1 to the right.',
    ],
  },
  {
    id: 'ch_a07',
    nodeId: NODE_C11_MATH_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims that because cosec x = 1/sin x, the range of cosec x is the reciprocal interval [-1, 1]. Evaluate this mathematical statement.',
    options: [
      'False: As 0 < |sin x| <= 1, its reciprocal |cosec x| >= 1, giving the range (-∞, -1] ∪ [1, ∞)',
      'True: Reciprocal trigonometric functions always maintain identical bound intervals',
      'False: cosec x can only take positive values between 0 and 1',
      'True: Because sin x is bounded, cosec x must also be bounded within [-1, 1]',
    ],
    correctIndex: 0,
    explanation: 'Since |sin x| <= 1 for all real x, dividing 1 by any nonzero value with magnitude <= 1 produces |cosec x| = 1/|sin x| >= 1. As sin x approaches 0, cosec x diverges to ±∞. Thus the true range of cosec x is (-∞, -1] ∪ [1, ∞).',
    hints: [
      'Test sin x = 0.5: cosec x = 1/0.5 = 2, which exceeds 1.',
      'Test sin x = 0.1: cosec x = 1/0.1 = 10.',
      'The reciprocal of a fraction smaller than 1 is always greater than 1.',
    ],
  },
  {
    id: 'ch_a08',
    nodeId: NODE_C11_MATH_040,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'For the complex number z = 0 + 8i, compute the real part of its principal square root w = sqrt(8i).',
    correctAnswer: 2,
    tolerance: 0.05,
    unit: 'units',
    explanation: 'For z = 8i, a = 0, b = 8. Modulus |z| = 8. Real part x = sqrt((|z| + a)/2) = sqrt((8 + 0)/2) = sqrt(4) = 2. Imaginary part y = sqrt((8 - 0)/2) = 2. Thus sqrt(8i) = ±(2 + 2i). Principal real part is 2.',
    hints: [
      'For pure imaginary z = 8i, a = 0 and b = 8.',
      'Modulus is |z| = 8.',
      'Formula for real part x = sqrt((|z| + a)/2) = sqrt(8/2) = sqrt(4) = 2.',
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

// ─── DEFAULT ENRICHMENT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_MATH_031,
  title: 'Trigonometric Reductions & Complex Algebra in the Argand Plane',
  definition: 'Comprehensive mastery of Class 11 ISC Mathematics: Half-angle & one-third angle identities, proving trigonometric identities, algebraic and polar representations of complex numbers on the Argand plane, four fundamental operations, inverses, and algebraic determination of complex square roots.',
  eli5: 'Think of trigonometry as zooming in and folding angles in half on a circle, and complex numbers as 2D navigation coordinates with real east-west steps and imaginary north-south steps governed by i² = -1.',
  misconceptions: [
    { misconception: 'The imaginary part of a + bi is bi.', correction: 'Im(z) is strictly the real coefficient b, not bi. Im(3 + 4i) = 4.' },
    { misconception: 'Half-angle formulas always yield positive square roots regardless of quadrant.', correction: 'The sign of sin(θ/2) and cos(θ/2) is governed strictly by the quadrant in which θ/2 lies.' },
    { misconception: 'The modulus of a + bi is a² + b² without the square root.', correction: '|z| = sqrt(a² + b²), representing Euclidean distance from origin.' },
    { misconception: 'Complex division is done component-wise: (a+bi)/(c+di) = (a/c) + (b/d)i.', correction: 'Division requires rationalising the denominator using its complex conjugate (c - di).' },
    { misconception: 'The multiplicative inverse of z is simply its conjugate z̄.', correction: 'The multiplicative inverse is z⁻¹ = z̄ / |z|², dividing the conjugate by the square of the modulus.' },
  ],
  diagnosticQuestions: [
    { question: 'What is i² in the complex number system?', options: ['-1', '1', 'i', '-i'], correctIndex: 0 },
    { question: 'What is sin²(θ/2) expressed in terms of cos θ?', options: ['(1 - cos θ)/2', '(1 + cos θ)/2', '1 - cos θ', '(1 - sin θ)/2'], correctIndex: 0 },
    { question: 'What is the modulus of 3 + 4i?', options: ['5', '25', '7', '1'], correctIndex: 0 },
    { question: 'In which quadrant is tan positive while sin is negative?', options: ['Quadrant III', 'Quadrant I', 'Quadrant II', 'Quadrant IV'], correctIndex: 0 },
    { question: 'What is the conjugate of -2 - 7i?', options: ['-2 + 7i', '2 - 7i', '2 + 7i', '-2 - 7i'], correctIndex: 0 },
    { question: 'What is (1 + i)(1 - i)?', options: ['2', '0', '2i', '1 - i² = 0'], correctIndex: 0 },
    { question: 'What is the principal argument range?', options: ['(-π, π]', '[0, 2π)', '[0, π]', '[-π/2, π/2]'], correctIndex: 0 },
    { question: 'What is the additive inverse of 5 - 3i?', options: ['-5 + 3i', '-5 - 3i', '5 + 3i', '1/(5 - 3i)'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student demonstrates full proficiency across half-angle derivations, trigonometric identity proofs, quadrant sign determination, Argand plane polar conversions, complex arithmetic, and square roots.',
};

// ─── 6 INTERACTIVE BRILLIANT-STYLE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Unit Circle & Half-Angle Wave Folding',
    instruction: 'Drag the base angle slider θ to observe how θ/2 folds on the circle and dynamically updates sin²(θ/2) = (1 - cos θ)/2 and cos²(θ/2) = (1 + cos θ)/2.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_MATH_031,
  },
  {
    title: 'Trigonometric Function Family & ASTC Signs',
    instruction: 'Select each quadrant on the ASTC map to inspect active signs, reciprocal pairs, and domain singular asymptotes.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_MATH_033,
  },
  {
    title: 'Argand Plane Vector & Conjugate Geometry',
    instruction: 'Manipulate real (a) and imaginary (b) sliders to watch z, its reflection conjugate z̄, and additive inverse -z dynamically relocate.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_MATH_036,
  },
  {
    title: 'Polar Modulus-Argument Coordinate Transformer',
    instruction: 'Toggle between rectangular form a + bi and polar form r(cos θ + i sin θ) to inspect modulus r and principal angle θ in real-time.',
    interactionType: 'drag-position',
    nodeId: NODE_C11_MATH_037,
  },
  {
    title: 'Complex Square Root Dual-Vector Generator',
    instruction: 'Adjust the complex radicand z = a + bi to observe the two symmetric collinear square roots ±(x + yi) satisfying w² = z.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_MATH_040,
  },
  {
    title: 'Triple-Angle & One-Third Angle Synthesis',
    instruction: 'Explore how 3θ relates to θ via cos(3θ) = 4cos³θ - 3cos θ and how solving for one-third angles reduces to cubic polynomials.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_MATH_031,
  },
];

// ─── PREDICTION-VERIFICATION LAB QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you reflect z = -3 + 4i across the real axis to obtain its complex conjugate z̄, what happens to its modulus and principal argument?',
    options: [
      'Modulus remains 5, principal argument flips sign from +θ to -θ',
      'Modulus doubles to 10, principal argument remains unchanged',
      'Both modulus and argument become strictly negative numbers',
      'Modulus becomes -5, argument is rotated by exactly 180°',
    ],
    correctIndex: 0,
    verifyInstruction: 'Set a = -3 and b = 4 in the Argand lab below and observe the amber reflection vector z̄.',
    nodeId: NODE_C11_MATH_036,
  },
  {
    question: 'Predict: If an angle θ = 300° (Quadrant IV) is halved to θ/2 = 150°, what sign will cos(θ/2) possess and why?',
    options: [
      'cos(θ/2) is NEGATIVE because 150° lies in Quadrant II where cosine is negative',
      'cos(θ/2) is POSITIVE because the original angle 300° had positive cosine',
      'cos(θ/2) is POSITIVE because square roots in formulas are always defined positive',
      'cos(θ/2) is ZERO because 300° / 2 lands on a quadrant axis',
    ],
    correctIndex: 0,
    verifyInstruction: 'Move the angle slider to 300° and check the folded cyan vector in Quadrant II.',
    nodeId: NODE_C11_MATH_031,
  },
  {
    question: 'Predict: When multiplying any complex number z = a + bi by the imaginary unit i, what geometric transformation occurs on the Argand plane?',
    options: [
      'Pure counterclockwise rotation by 90° (π/2 radians) with invariant modulus',
      'Pure expansion stretching length by a factor of 2',
      'Reflection across the horizontal real axis',
      'Translation by 1 unit along the imaginary axis',
    ],
    correctIndex: 0,
    verifyInstruction: 'Notice that i * (a + bi) = -b + ai: length stays sqrt(a²+b²), angle increases by +90°.',
    nodeId: NODE_C11_MATH_038,
  },
];

// ─── REAL-WORLD ACTIVITY COMPLETION ARC ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Trajectory Radar Transponder Phase Calibration',
  description: 'Apply your mathematical tools to calculate the radar reflection impedance of a satellite microwave transponder.',
  steps: [
    'Antenna impedance Z = 30 + 40i ohms. Find its admittance Y = 1/Z (multiplicative inverse).',
    'Calculate the signal magnitude |Z| = sqrt(30² + 40²) = 50 ohms.',
    'Compute Y = (30 - 40i) / 2500 = 0.012 - 0.016i siemens.',
    'Verify that phase angle θ = tan⁻¹(40/30) ≈ 53.13° matches the radar waveguide half-angle.',
  ],
};

// ─── MAIN COMPONENT ───
export function C11_MathematicsHalfAngleOnethirdSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_MATH_031,
  title = DEFAULT_PROPS.title || 'Trigonometric Reductions & Complex Numbers',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase State: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Interactive Exploration & Sandbox State (Real-time Slider Controlled)
  const [thetaDeg, setThetaDeg] = useState(120);
  const [selectedQuadrant, setSelectedQuadrant] = useState<number>(2);
  const [realA, setRealA] = useState(3);
  const [imagB, setImagB] = useState(4);
  const [polarMode, setPolarMode] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(0);
  const [predictionSelected, setPredictionSelected] = useState<number | null>(null);
  const [predictionSubmitted, setPredictionSubmitted] = useState(false);

  // Brilliant-style Observation Questions State
  const [observationAnswers, setObservationAnswers] = useState<Record<string, number | null>>({});
  const [observationFeedback, setObservationFeedback] = useState<Record<string, boolean>>({});

  // Challenge & Gamification State
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

  // Drag & Drop / Input State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Misconception tracking & Feedback FX
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Persistence Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Adaptive difficulty challenges filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Derived Real-Time Trigonometric Calculations
  const thetaRad = (thetaDeg * Math.PI) / 180;
  const sinTheta = Math.sin(thetaRad);
  const cosTheta = Math.cos(thetaRad);
  const halfThetaDeg = thetaDeg / 2;
  const halfThetaRad = thetaRad / 2;
  const sinHalfTheta = Math.sin(halfThetaRad);
  const cosHalfTheta = Math.cos(halfThetaRad);
  const oneThirdThetaRad = thetaRad / 3;
  const cosOneThirdTheta = Math.cos(oneThirdThetaRad);

  // Derived Real-Time Complex Number Calculations
  const modZ = Math.sqrt(realA * realA + imagB * imagB);
  const argZRad = Math.atan2(imagB, realA);
  const argZDeg = (argZRad * 180) / Math.PI;

  // Derived Complex Square Roots: w = ±(x + yi)
  const sqrtX = Math.sqrt((modZ + realA) / 2);
  const sqrtY = (imagB >= 0 ? 1 : -1) * Math.sqrt(Math.max(0, (modZ - realA) / 2));

  // Spaced Repetition Review Interval calculation
  const reviewIntervalDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  // ─── INITIAL LOAD MASTERY CHECK ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY EFFECT ───
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

  // ─── ANIMATED CANVAS WAVE EFFECT (RADAR PHASOR) ───
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

      // Draw grid line
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Draw primary carrier wave
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * 0.04 + frame * 0.05) * 14 * Math.sin(thetaRad);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw half-angle envelope wave
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * 0.02 + frame * 0.025) * 12 * Math.sin(halfThetaRad);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw radar phaser particle
      const px = (frame * 2.5) % canvas.width;
      const py = canvas.height / 2 + Math.sin(px * 0.04 + frame * 0.05) * 14 * Math.sin(thetaRad);
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [thetaRad, halfThetaRad]);

  // ─── CALLBACK HANDLERS ───

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints && activeChallenge.hints[nextLevel - 1]) {
      const hintText = activeChallenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, activeChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((index: number) => {
    const isCorrect = index === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Entering interactive discovery laboratory.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration sandbox active. Test mathematical variables with real-time feedback.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge arena unlocked. Solve progressive problems to demonstrate mastery.');
  }, []);

  const handlePredictionSelect = useCallback((idx: number) => {
    setPredictionSelected(idx);
    audioManager.play('tap');
  }, []);

  const handlePredictionVerify = useCallback(() => {
    if (predictionSelected === null) return;
    setPredictionSubmitted(true);
    const isCorrect = predictionSelected === PREDICTION_QUESTIONS[predictionIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate prediction!' : 'Observe the interactive visualization to verify.');
  }, [predictionSelected, predictionIndex]);

  const handleNextPrediction = useCallback(() => {
    setPredictionSelected(null);
    setPredictionSubmitted(false);
    setPredictionIndex(p => (p + 1) % PREDICTION_QUESTIONS.length);
    audioManager.play('whoosh');
  }, []);

  const handleObservationSelect = useCallback((qId: string, optIndex: number, correctIdx: number) => {
    setObservationAnswers(prev => ({ ...prev, [qId]: optIndex }));
    const isCorrect = optIndex === correctIdx;
    setObservationFeedback(prev => ({ ...prev, [qId]: isCorrect }));
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Simulation complete with a final score of ${finalScore} percent.`);
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

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(num - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0.1);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = (answer as string).trim() === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding algebraic reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Review the step-by-step breakdown.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const correctLabel = activeChallenge.correctMapping?.[targetId];
    if (correctLabel === draggedItem) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === 0 && activeChallenge.sortItems ? activeChallenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleSortSubmit = useCallback(() => {
    const ans = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(ans);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  const handleQuadrantSelect = useCallback((q: number) => {
    setSelectedQuadrant(q);
    audioManager.play('tap');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Motivational message generation based on error count
  const getMotivationalFeedback = useCallback((errCount: number) => {
    if (errCount === 0) {
      return {
        title: 'PERFECT SCORE!',
        badge: '🏆 Flawless Calibration',
        message: 'Magnificent mastery! You solved every single trigonometric reduction, complex vector identity, inverse, and square root challenge without a single misstep. Your command of the ISC Class 11 curriculum is exceptional!',
        color: 'from-emerald-600 to-teal-500',
        borderColor: 'border-emerald-500',
      };
    } else if (errCount >= 1 && errCount <= 3) {
      return {
        title: 'Great work!',
        badge: '🌟 High Proficiency',
        message: 'Excellent algebraic fluency! You demonstrated sharp problem-solving across multi-angle reductions, Argand polar conversions, and complex arithmetic with only minor slips. Review the quadrant sign subtleties to achieve 100% perfection!',
        color: 'from-gold-600 to-gold-500',
        borderColor: 'border-gold-500',
      };
    } else if (errCount >= 4 && errCount <= 7) {
      return {
        title: 'Good effort!',
        badge: '💪 Solid Foundation',
        message: 'Solid progress through challenging material! Angle half reductions and complex square roots require meticulous sign tracking. Explore the misconception corrections below and re-test in 24 hours to cement your intuition.',
        color: 'from-amber-600 to-orange-500',
        borderColor: 'border-amber-500',
      };
    } else {
      return {
        title: 'Do not give up — You WILL get this!',
        badge: '🚀 Growth Mindset',
        message: 'Trigonometric identities and complex algebra represent some of the most rigorous concepts in higher mathematics. Every error is a stepping stone toward clarity. Revisit the interactive unit circle and Argand sandbox to rebuild your confidence!',
        color: 'from-rose-600 to-purple-600',
        borderColor: 'border-rose-500',
      };
    }
  }, []);

  const motivationalData = getMotivationalFeedback(errors);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-2xl bg-gold-600/20 border border-gold-500/40 flex items-center justify-center text-2xl shadow-inner cursor-pointer"
            aria-label="Simulation Topic Icon"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
            </h1>
            <p className="text-xs text-gold-400 font-semibold tracking-wide uppercase">
              ISC Class 11 • {subjectConfig.name} • 10 Curriculum Nodes Covered
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          {/* Phase Switcher Navigation */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
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
                className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                  phase === p
                    ? 'bg-gold-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {p}
              </motion.button>
            ))}
          </div>

          <motion.span
            key={difficulty}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-600/40'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-600/40'
                : 'bg-gold-950/60 text-gold-300 border-gold-600/40'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
        </div>
      </motion.div>

      {/* ─── ANNOUNCEMENT BANNER / ELI5 TOGGLE ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs"
      >
        <div className="flex items-center gap-2 text-slate-300">
          <span className="text-amber-400 font-bold">💡 Intuition:</span>
          <span>{eli5}</span>
        </div>
        <div className="flex items-center gap-2 text-gold-400 font-mono text-[11px] bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          <span>Target Mastery: BKT &gt; 0.85</span>
        </div>
      </motion.div>

      {/* ─── MAIN CONTENT AREA WITH ANIMATE PRESENCE ─── */}
      <AnimatePresence mode="wait">
        {/* ─── 1. DISCOVERY PHASE ─── */}
        {phase === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Narrative Scenario Card */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="p-6 bg-gradient-to-br from-gold-950/40 via-slate-900 to-slate-950 rounded-2xl border border-gold-800/50 relative overflow-hidden shadow-lg"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-8xl font-black font-mono">
                i² = -1
              </div>
              <div className="flex items-center gap-2 text-gold-400 text-xs font-bold tracking-wider uppercase mb-1">
                <span>🚀</span> ISRO Mission Scenario
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-white mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
              <p className="text-xs text-gold-300/80 italic">{SCENARIO.context}</p>
            </motion.div>

            {/* Discovery Curiosity Question */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <span>🔬</span> Curiosity Discovery Challenge
                </span>
                <span className="text-xs text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                  Ungraded Exploration Hook
                </span>
              </div>

              <p className="text-base md:text-lg font-semibold text-white">
                {DISCOVERY_QUESTION.question}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900/60 border-slate-800 text-slate-500'
                        : 'bg-slate-800/90 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-gold-500/60'
                    }`}
                  >
                    <span className="font-bold text-gold-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                    {discoveryAnswered && (
                      <span className="ml-2 font-bold">
                        {i === DISCOVERY_QUESTION.correctIndex ? ' ✓ Correct' : ' ✗'}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4 space-y-4"
                >
                  <div
                    className={`p-4 rounded-xl text-sm border flex items-center gap-2 ${
                      discoveryCorrect
                        ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                        : 'bg-amber-950/40 border-amber-800 text-amber-300'
                    }`}
                  >
                    <span>{discoveryCorrect ? '🎯' : '💡'}</span>
                    <span>
                      {discoveryCorrect
                        ? 'Spot on! The double-angle relation cos 2θ = 1 - 2sin²θ gives sin²θ = (1 - 7/25)/2 = 9/25, hence sin θ = 3/5.'
                        : DISCOVERY_QUESTION.hintAfter}
                    </span>
                  </div>

                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAdvanceToExploration}
                      aria-label="Start Interactive Discovery Lab"
                      className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl shadow-lg shadow-gold-600/30 flex items-center gap-2"
                    >
                      Start Interactive Discovery Lab →
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── 2. EXPLORE PHASE ─── */}
        {phase === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Exploration Header & Step Instruction */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 gap-3"
            >
              <div>
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                  Discovery Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h2 className="text-lg md:text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
              </div>
              <p className="text-xs md:text-sm text-amber-300 font-medium bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-800/50 flex items-center gap-1.5">
                <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>
            </motion.div>

            {/* INTERACTIVE LAB VISUALIZER CONTAINER */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900/90 p-4 md:p-6 rounded-2xl border border-slate-800 min-h-[440px] flex flex-col justify-center shadow-xl"
            >
              {/* STEP 0: Unit Circle & Half-Angle Wave Folding */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-6 flex justify-center">
                    <svg viewBox="-150 -150 300 300" className="w-full max-w-[320px] bg-slate-950 rounded-2xl border border-slate-800 shadow-inner" aria-label="Unit Circle Vector Visualization">
                      {/* Grid and Axes */}
                      <circle cx="0" cy="0" r="100" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="-130" y1="0" x2="130" y2="0" stroke="#475569" strokeWidth="1" />
                      <line x1="0" y1="-130" x2="0" y2="130" stroke="#475569" strokeWidth="1" />
                      <text x="135" y="4" fill="#94a3b8" fontSize="10">Re (cos)</text>
                      <text x="4" y="-135" fill="#94a3b8" fontSize="10">Im (sin)</text>

                      {/* Vector theta (Purple) */}
                      <line x1="0" y1="0" x2={100 * Math.cos(thetaRad)} y2={-100 * Math.sin(thetaRad)} stroke="#a855f7" strokeWidth="3" />
                      <circle cx={100 * Math.cos(thetaRad)} cy={-100 * Math.sin(thetaRad)} r="5" fill="#a855f7" />
                      <text x={110 * Math.cos(thetaRad)} y={-110 * Math.sin(thetaRad)} fill="#c084fc" fontSize="11" fontWeight="bold">θ ({thetaDeg}°)</text>

                      {/* Vector theta/2 (Cyan) */}
                      <line x1="0" y1="0" x2={100 * Math.cos(halfThetaRad)} y2={-100 * Math.sin(halfThetaRad)} stroke="#06b6d4" strokeWidth="3" strokeDasharray="4 2" />
                      <circle cx={100 * Math.cos(halfThetaRad)} cy={-100 * Math.sin(halfThetaRad)} r="5" fill="#06b6d4" />
                      <text x={110 * Math.cos(halfThetaRad)} y={-110 * Math.sin(halfThetaRad)} fill="#22d3ee" fontSize="11" fontWeight="bold">θ/2 ({halfThetaDeg.toFixed(1)}°)</text>

                      {/* Arc Indicator */}
                      <path
                        d={`M 30 0 A 30 30 0 ${thetaDeg > 180 ? 1 : 0} 0 ${30 * Math.cos(thetaRad)} ${-30 * Math.sin(thetaRad)}`}
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>

                  <div className="lg:col-span-6 space-y-4">
                    {/* Instant Real-Time Slider for Angle */}
                    <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-sm">
                        <label htmlFor="theta-slider" className="text-slate-300 font-semibold">
                          Angle θ Controller (Real-Time Drag):
                        </label>
                        <span className="text-purple-400 font-bold font-mono">{thetaDeg}° ({thetaRad.toFixed(2)} rad)</span>
                      </div>
                      <input
                        id="theta-slider"
                        type="range"
                        min="0"
                        max="360"
                        value={thetaDeg}
                        onChange={(e) => setThetaDeg(Number(e.target.value))}
                        aria-label="Adjust Angle Theta"
                        aria-valuenow={thetaDeg}
                        aria-valuemin={0}
                        aria-valuemax={360}
                        className="w-full accent-purple-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400 font-mono">cos(θ)</span>
                        <div className="text-lg font-bold text-white font-mono">{cosTheta.toFixed(3)}</div>
                      </div>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400 font-mono">sin(θ)</span>
                        <div className="text-lg font-bold text-white font-mono">{sinTheta.toFixed(3)}</div>
                      </div>
                      <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/60">
                        <span className="text-xs text-gold-300 font-semibold">cos²(θ/2) = (1+cos θ)/2</span>
                        <div className="text-lg font-bold text-gold-200 font-mono">{((1 + cosTheta) / 2).toFixed(3)}</div>
                        <span className="text-[11px] text-slate-400">cos(θ/2) = {cosHalfTheta.toFixed(3)}</span>
                      </div>
                      <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/60">
                        <span className="text-xs text-gold-300 font-semibold">sin²(θ/2) = (1-cos θ)/2</span>
                        <div className="text-lg font-bold text-gold-200 font-mono">{((1 - cosTheta) / 2).toFixed(3)}</div>
                        <span className="text-[11px] text-slate-400">sin(θ/2) = {sinHalfTheta.toFixed(3)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 1: ASTC Quadrant Map & Reciprocal Functions */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { q: 2, label: 'Quadrant II (90°-180°)', code: 'S', pos: 'sin, cosec (+)', neg: 'cos, sec, tan, cot (-)' },
                      { q: 1, label: 'Quadrant I (0°-90°)', code: 'A', pos: 'All 6 Functions (+)', neg: 'None' },
                      { q: 3, label: 'Quadrant III (180°-270°)', code: 'T', pos: 'tan, cot (+)', neg: 'sin, cosec, cos, sec (-)' },
                      { q: 4, label: 'Quadrant IV (270°-360°)', code: 'C', pos: 'cos, sec (+)', neg: 'sin, cosec, tan, cot (-)' },
                    ].map((item) => (
                      <motion.button
                        key={item.q}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleQuadrantSelect(item.q)}
                        aria-label={`Select ${item.label}`}
                        className={`p-4 rounded-xl text-left border transition-all ${
                          selectedQuadrant === item.q
                            ? 'bg-gold-600/30 border-gold-500 shadow-lg shadow-gold-600/20'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-gold-400">{item.label}</span>
                          <span className="text-lg font-black text-white px-2 py-0.5 rounded bg-slate-800">{item.code}</span>
                        </div>
                        <p className="text-xs text-emerald-400 font-semibold">{item.pos}</p>
                        <p className="text-xs text-slate-400">{item.neg}</p>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
                      <span>Quadrant {selectedQuadrant} Analysis</span>
                      <span className="text-xs text-gold-400 font-mono">ASTC Law</span>
                    </h3>
                    <div className="space-y-2 text-xs text-slate-300">
                      <p>• <strong className="text-gold-300">Pythagorean Law:</strong> sin²x + cos²x = 1 holds unconditionally across all 4 quadrants.</p>
                      <p>• <strong className="text-gold-300">Secant Identity:</strong> 1 + tan²x = sec²x (singular at odd multiples of π/2).</p>
                      <p>• <strong className="text-gold-300">Cosecant Identity:</strong> 1 + cot²x = cosec²x (singular at integer multiples of π).</p>
                    </div>
                    <canvas ref={canvasRef} width={300} height={60} className="w-full bg-slate-900 rounded-lg shadow-inner" aria-label="Animated Phasor Waveform" />
                  </div>
                </div>
              )}

              {/* STEP 2: Argand Plane Vector & Conjugate Geometry */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-6 flex justify-center">
                    <svg viewBox="-120 -120 240 240" className="w-full max-w-[320px] bg-slate-950 rounded-2xl border border-slate-800 shadow-inner" aria-label="Argand Plane Representation">
                      <line x1="-110" y1="0" x2="110" y2="0" stroke="#475569" strokeWidth="1" />
                      <line x1="0" y1="-110" x2="0" y2="110" stroke="#475569" strokeWidth="1" />
                      <circle cx="0" cy="0" r={modZ * 10} fill="none" stroke="#334155" strokeDasharray="3 3" />

                      {/* z vector (Green) */}
                      <line x1="0" y1="0" x2={realA * 10} y2={-imagB * 10} stroke="#22c55e" strokeWidth="3" />
                      <circle cx={realA * 10} cy={-imagB * 10} r="5" fill="#22c55e" />
                      <text x={realA * 10 + 6} y={-imagB * 10 - 6} fill="#4ade80" fontSize="10" fontWeight="bold">z ({realA} + {imagB}i)</text>

                      {/* z conjugate vector (Amber reflection) */}
                      <line x1="0" y1="0" x2={realA * 10} y2={imagB * 10} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                      <circle cx={realA * 10} cy={imagB * 10} r="4" fill="#f59e0b" />
                      <text x={realA * 10 + 6} y={imagB * 10 + 12} fill="#fbbf24" fontSize="10">z̄ ({realA} - {imagB}i)</text>

                      {/* -z additive inverse (Rose origin reflection) */}
                      <line x1="0" y1="0" x2={-realA * 10} y2={imagB * 10} stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2 2" />
                      <circle cx={-realA * 10} cy={imagB * 10} r="3" fill="#f43f5e" />
                      <text x={-realA * 10 - 30} y={imagB * 10 + 10} fill="#fb7185" fontSize="9">-z</text>
                    </svg>
                  </div>

                  <div className="lg:col-span-6 space-y-4">
                    {/* Instant Real-Time Sliders for a and b */}
                    <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <label htmlFor="real-a-slider">Real Part a: {realA}</label>
                          <span className="text-emerald-400 font-bold font-mono">Re(z) = {realA}</span>
                        </div>
                        <input
                          id="real-a-slider"
                          type="range"
                          min="-8"
                          max="8"
                          value={realA}
                          onChange={(e) => setRealA(Number(e.target.value))}
                          aria-label="Adjust Real Part a"
                          aria-valuenow={realA}
                          className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <label htmlFor="imag-b-slider">Imaginary Part b: {imagB}</label>
                          <span className="text-emerald-400 font-bold font-mono">Im(z) = {imagB}</span>
                        </div>
                        <input
                          id="imag-b-slider"
                          type="range"
                          min="-8"
                          max="8"
                          value={imagB}
                          onChange={(e) => setImagB(Number(e.target.value))}
                          aria-label="Adjust Imaginary Part b"
                          aria-valuenow={imagB}
                          className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Modulus |z|:</span>
                        <div className="text-sm font-bold text-white font-mono">{modZ.toFixed(2)}</div>
                      </div>
                      <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Principal arg(z):</span>
                        <div className="text-sm font-bold text-white font-mono">{argZDeg.toFixed(1)}° ({argZRad.toFixed(2)} rad)</div>
                      </div>
                      <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-amber-400 font-semibold">Conjugate Product:</span>
                        <div className="text-xs font-bold text-amber-300 font-mono">z * z̄ = {realA * realA + imagB * imagB} = |z|²</div>
                      </div>
                      <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-rose-400 font-semibold">Inverse Reciprocal:</span>
                        <div className="text-xs font-bold text-rose-300 font-mono">z⁻¹ = z̄ / {(realA * realA + imagB * imagB)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Polar Modulus-Argument Transformer */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300 font-medium">Dual Representation Transformer:</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPolarMode(!polarMode)}
                      aria-label="Toggle between Rectangular and Polar forms"
                      className="px-4 py-2 rounded-xl bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs shadow-md"
                    >
                      Switch to {polarMode ? 'Rectangular Form (a + bi)' : 'Polar Form (r(cos θ + i sin θ))'}
                    </motion.button>
                  </div>

                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-3">
                    <div className="text-2xl md:text-3xl font-black text-gold-300 font-mono">
                      {polarMode ? (
                        <span>{modZ.toFixed(2)} ( cos({argZRad.toFixed(2)}) + i sin({argZRad.toFixed(2)}) )</span>
                      ) : (
                        <span>{realA} {imagB >= 0 ? `+ ${imagB}i` : `- ${Math.abs(imagB)}i`}</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      Euler & Trigonometric Bridge: a = r cos(θ), b = r sin(θ), r = sqrt(a² + b²), θ = tan⁻¹(b/a) adjusted for quadrant.
                    </p>
                  </div>

                  {/* Prediction Component Inside Discovery */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-gold-900/50 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-gold-400 uppercase">Interactive Verification Prediction:</span>
                      <span className="text-slate-400">Scenario {predictionIndex + 1}/{PREDICTION_QUESTIONS.length}</span>
                    </div>
                    <p className="text-xs text-slate-200 font-semibold">{PREDICTION_QUESTIONS[predictionIndex].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                      {PREDICTION_QUESTIONS[predictionIndex].options.map((opt, pIdx) => (
                        <motion.button
                          key={pIdx}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePredictionSelect(pIdx)}
                          disabled={predictionSubmitted}
                          aria-label={`Prediction Option ${pIdx + 1}: ${opt}`}
                          className={`p-2.5 rounded-lg text-left text-xs transition-all border ${
                            predictionSubmitted
                              ? pIdx === PREDICTION_QUESTIONS[predictionIndex].correctIndex
                                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                                : pIdx === predictionSelected
                                ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                                : 'bg-slate-900 border-slate-800 text-slate-500'
                              : predictionSelected === pIdx
                              ? 'bg-gold-600/30 border-gold-500 text-white'
                              : 'bg-slate-900 hover:bg-slate-855 border-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="font-bold mr-1">{String.fromCharCode(65 + pIdx)}.</span> {opt}
                          {predictionSubmitted && (
                            <span className="ml-1 font-bold">
                              {pIdx === PREDICTION_QUESTIONS[predictionIndex].correctIndex ? ' ✓' : pIdx === predictionSelected ? ' ✗' : ''}
                            </span>
                          )}
                        </motion.button>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      {!predictionSubmitted ? (
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={handlePredictionVerify}
                          disabled={predictionSelected === null}
                          aria-label="Confirm Prediction"
                          className="px-4 py-1.5 bg-gold-600 hover:bg-gold-500 disabled:opacity-40 text-white font-bold rounded-lg text-xs"
                        >
                          Confirm Prediction
                        </motion.button>
                      ) : (
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs text-amber-300">💡 {PREDICTION_QUESTIONS[predictionIndex].verifyInstruction}</span>
                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={handleNextPrediction}
                            aria-label="Next Prediction Question"
                            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-xs"
                          >
                            Next Prediction →
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Complex Square Roots */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-6 flex justify-center">
                    <svg viewBox="-120 -120 240 240" className="w-full max-w-[320px] bg-slate-950 rounded-2xl border border-slate-800 shadow-inner" aria-label="Square Root Vectors on Argand Plane">
                      <line x1="-110" y1="0" x2="110" y2="0" stroke="#475569" strokeWidth="1" />
                      <line x1="0" y1="-110" x2="0" y2="110" stroke="#475569" strokeWidth="1" />

                      {/* Original z */}
                      <line x1="0" y1="0" x2={realA * 8} y2={-imagB * 8} stroke="#6366f1" strokeWidth="3" />
                      <circle cx={realA * 8} cy={-imagB * 8} r="5" fill="#6366f1" />
                      <text x={realA * 8 + 5} y={-imagB * 8} fill="#818cf8" fontSize="10">z ({realA}+{imagB}i)</text>

                      {/* Square Root w1 */}
                      <line x1="0" y1="0" x2={sqrtX * 15} y2={-sqrtY * 15} stroke="#22c55e" strokeWidth="2.5" />
                      <circle cx={sqrtX * 15} cy={-sqrtY * 15} r="4" fill="#22c55e" />
                      <text x={sqrtX * 15 + 5} y={-sqrtY * 15} fill="#4ade80" fontSize="10">w₁ (+)</text>

                      {/* Square Root w2 = -w1 */}
                      <line x1="0" y1="0" x2={-sqrtX * 15} y2={sqrtY * 15} stroke="#f43f5e" strokeWidth="2.5" />
                      <circle cx={-sqrtX * 15} cy={sqrtY * 15} r="4" fill="#f43f5e" />
                      <text x={-sqrtX * 15 - 25} y={sqrtY * 15} fill="#fb7185" fontSize="10">w₂ (-)</text>
                    </svg>
                  </div>

                  <div className="lg:col-span-6 space-y-3 text-xs">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-slate-400">Modulus of Root:</span>
                      <div className="text-sm font-bold text-white font-mono">|w| = sqrt(|z|) = {Math.sqrt(modZ).toFixed(2)}</div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-emerald-400 font-bold">Primary Root w₁:</span>
                      <div className="text-sm font-bold text-white font-mono">
                        +{sqrtX.toFixed(2)} {sqrtY >= 0 ? `+ ${sqrtY.toFixed(2)}i` : `- ${Math.abs(sqrtY).toFixed(2)}i`}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-rose-400 font-bold">Secondary Root w₂ (Collinear Inverse):</span>
                      <div className="text-sm font-bold text-white font-mono">
                        -{sqrtX.toFixed(2)} {sqrtY >= 0 ? `- ${sqrtY.toFixed(2)}i` : `+ ${Math.abs(sqrtY).toFixed(2)}i`}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Triple-Angle & One-Third Angle Synthesis */}
              {currentSlide === 5 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-xs text-gold-400 font-bold">Triple Angle Formula</span>
                      <div className="text-sm font-bold text-white font-mono">cos(3θ) = 4cos³θ - 3cos θ</div>
                      <p className="text-[11px] text-slate-400">Derived from cos(2θ + θ) expansion.</p>
                    </div>
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-xs text-gold-400 font-bold">Sine Triple Angle</span>
                      <div className="text-sm font-bold text-white font-mono">sin(3θ) = 3sin θ - 4sin³θ</div>
                      <p className="text-[11px] text-slate-400">Fundamental for cubic resonance.</p>
                    </div>
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-xs text-gold-400 font-bold">One-Third Angle</span>
                      <div className="text-sm font-bold text-white font-mono">θ/3 = {(thetaDeg / 3).toFixed(1)}°</div>
                      <p className="text-[11px] text-slate-400">cos(θ/3) = {cosOneThirdTheta.toFixed(3)}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gold-950/30 rounded-xl border border-gold-900/60 text-xs text-slate-300">
                    <p className="font-bold text-gold-300 mb-1">Key ISC Examination Takeaway:</p>
                    <p>Solving for cos(θ/3) given cos θ leads to the cubic equation 4c³ - 3c - cos θ = 0. This demonstrates why general angle trisection cannot be performed with straightedge and compass alone!</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* ─── BRILLIANT.ORG STYLE OBSERVATION QUESTIONS SECTION ─── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-slate-900 rounded-2xl border border-gold-900/40 space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🔍</span>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    What Do You Notice? (Guided Mathematical Observations)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Interact with the sliders above and test your visual deductions:
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {OBSERVATION_QUESTIONS.map((obsQ, qIdx) => {
                  const userAns = observationAnswers[obsQ.id];
                  const hasAnswered = userAns !== undefined && userAns !== null;
                  const isCorrect = observationFeedback[obsQ.id];

                  return (
                    <div key={obsQ.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <p className="text-xs md:text-sm font-semibold text-gold-200">
                        <span className="text-amber-400 mr-1.5">Observation {qIdx + 1}:</span>
                        {obsQ.prompt}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {obsQ.observableOptions.map((optText, optIdx) => (
                          <motion.button
                            key={optIdx}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservationSelect(obsQ.id, optIdx, obsQ.correctIndex)}
                            className={`p-3 rounded-lg text-left text-xs transition-all border ${
                              hasAnswered
                                ? optIdx === obsQ.correctIndex
                                  ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold'
                                  : optIdx === userAns
                                  ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                                  : 'bg-slate-900/60 border-slate-800 text-slate-500'
                                : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300'
                            }`}
                          >
                            <span className="font-bold mr-1.5">{String.fromCharCode(65 + optIdx)}.</span>
                            {optText}
                            {hasAnswered && optIdx === obsQ.correctIndex && ' ✓'}
                          </motion.button>
                        ))}
                      </div>

                      {hasAnswered && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`p-2.5 rounded-lg text-xs ${
                            isCorrect
                              ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/60'
                              : 'bg-amber-950/40 text-amber-300 border border-amber-800/60'
                          }`}
                        >
                          <strong className="mr-1">{isCorrect ? '✓ Spot on!' : '💡 Key Concept:'}</strong>
                          {obsQ.explanation}
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* SLIDE NAVIGATION CONTROLS */}
            <div className="flex items-center justify-between pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                aria-label="Previous Exploration Lab"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-750 disabled:opacity-40 text-white font-semibold rounded-xl text-sm"
              >
                ← Previous Lab
              </motion.button>

              <span className="text-xs font-bold text-slate-400">
                Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
              </span>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => s + 1)}
                  aria-label="Next Exploration Lab"
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-sm shadow-md"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  aria-label="Enter Free Exploration Sandbox"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-md"
                >
                  Enter Free Sandbox →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── 3. SANDBOX PHASE ─── */}
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <span>🎛️</span> Free Exploration Sandbox & Formula Laboratory
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Directly drag sliders and observe continuous instantaneous recalculation across trigonometry and complex algebra. Zero grading pressure.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToChallenge}
                  aria-label="Ready for Challenges"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                >
                  Ready for Challenges! 🚀
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {/* Real-Time Slider 1: Theta */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="sb-theta" className="font-bold text-gold-400">Angle Slider θ</label>
                    <span className="font-mono text-white font-bold">{thetaDeg}°</span>
                  </div>
                  <input
                    id="sb-theta"
                    type="range"
                    min="0"
                    max="360"
                    value={thetaDeg}
                    onChange={(e) => setThetaDeg(Number(e.target.value))}
                    aria-label="Sandbox Angle Theta Slider"
                    aria-valuenow={thetaDeg}
                    className="w-full accent-gold-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-400 font-mono space-y-0.5 pt-1">
                    <div>sin(θ/2) = {sinHalfTheta.toFixed(3)}</div>
                    <div>cos(θ/2) = {cosHalfTheta.toFixed(3)}</div>
                    <div>tan(θ/2) = {(sinHalfTheta / (cosHalfTheta || 0.0001)).toFixed(3)}</div>
                  </div>
                </div>

                {/* Real-Time Slider 2: Real A */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="sb-real-a" className="font-bold text-emerald-400">Complex Real a: Re(z)</label>
                    <span className="font-mono text-white font-bold">{realA}</span>
                  </div>
                  <input
                    id="sb-real-a"
                    type="range"
                    min="-10"
                    max="10"
                    value={realA}
                    onChange={(e) => setRealA(Number(e.target.value))}
                    aria-label="Sandbox Complex Real Part Slider"
                    aria-valuenow={realA}
                    className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-400 font-mono space-y-0.5 pt-1">
                    <div>Modulus |z| = {modZ.toFixed(2)}</div>
                    <div>|z|² = {(realA * realA + imagB * imagB).toFixed(0)}</div>
                    <div>w₁ real = +{sqrtX.toFixed(2)}</div>
                  </div>
                </div>

                {/* Real-Time Slider 3: Imag B */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="sb-imag-b" className="font-bold text-emerald-400">Complex Imag b: Im(z)</label>
                    <span className="font-mono text-white font-bold">{imagB}</span>
                  </div>
                  <input
                    id="sb-imag-b"
                    type="range"
                    min="-10"
                    max="10"
                    value={imagB}
                    onChange={(e) => setImagB(Number(e.target.value))}
                    aria-label="Sandbox Complex Imaginary Part Slider"
                    aria-valuenow={imagB}
                    className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-400 font-mono space-y-0.5 pt-1">
                    <div>Principal arg(z) = {argZDeg.toFixed(1)}°</div>
                    <div>z⁻¹ = ({(realA / (modZ * modZ || 1)).toFixed(3)}) + ({(-imagB / (modZ * modZ || 1)).toFixed(3)})i</div>
                    <div>w₁ imag = {sqrtY >= 0 ? '+' : ''}{sqrtY.toFixed(2)}i</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── 4. CHALLENGE PHASE ─── */}
        {phase === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Challenge Progress Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-white">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="font-mono">
                  Score: {scoreBreakdown.correct} / {scoreBreakdown.total} ({Math.round((scoreBreakdown.correct / Math.max(1, scoreBreakdown.total)) * 100)}%)
                </span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Active Challenge Card */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-6 bg-slate-900 rounded-2xl border transition-colors ${
                wrongFlash ? 'bg-rose-950/40 border-rose-600' : 'border-slate-800'
              } space-y-4`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-gold-950 text-gold-300 border border-gold-800 uppercase tracking-wider">
                  {activeChallenge.competencyLevel} • {activeChallenge.type}
                </span>
                <span className="text-xs text-slate-400 font-mono">Node: {activeChallenge.nodeId}</span>
              </div>

              <p className="text-base md:text-lg font-semibold text-white leading-snug">
                {activeChallenge.question}
              </p>

              {/* MCQ / CLASSIFY / DISTINGUISH / MATCH CHALLENGES */}
              {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-gold-500'
                      }`}
                    >
                      <span className="font-bold text-gold-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                      {showExplanation && (
                        <span className="ml-2 font-bold">
                          {i === activeChallenge.correctIndex ? ' ✓ Correct' : ''}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* NUMERIC CHALLENGE */}
              {activeChallenge.type === 'numeric' && (
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numeric value..."
                    aria-label="Enter numeric answer"
                    className="w-full sm:w-64 px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                  <span className="text-xs text-slate-400 font-semibold">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Verify Numeric Answer"
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl disabled:opacity-50"
                  >
                    Verify Number
                  </motion.button>
                </div>
              )}

              {/* DRAG-LABEL CHALLENGE */}
              {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {activeChallenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        role="button"
                        tabIndex={0}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Draggable complex number: ${item.label}`}
                        className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-lg cursor-grab text-xs font-bold shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {['target_q1', 'target_q2', 'target_q3', 'target_q4'].map((tid, idx) => (
                      <div
                        key={tid}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(tid)}
                        className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 min-h-[60px] flex items-center justify-between"
                      >
                        <span className="text-xs text-slate-400 font-semibold">Quadrant {idx + 1}:</span>
                        <span className="text-sm font-bold text-emerald-400">
                          {droppedLabels[tid] ? `✓ ${droppedLabels[tid]}` : 'Drop Here'}
                        </span>
                      </div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    aria-label="Check Quadrant Mapping"
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-sm"
                  >
                    Check Quadrant Mapping
                  </motion.button>
                </div>
              )}

              {/* DRAG-SORT CHALLENGE */}
              {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
                <div className="space-y-3 pt-2">
                  {(sortArrangement.length > 0 ? sortArrangement : activeChallenge.sortItems.map((_, i) => i)).map((itemIdx, pos) => (
                    <motion.div
                      key={pos}
                      role="button"
                      tabIndex={0}
                      draggable
                      onDragStart={() => setDraggedItem(String(pos))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, pos);
                      }}
                      whileHover={{ scale: 1.01 }}
                      aria-label={`Step ${pos + 1}: ${activeChallenge.sortItems![itemIdx]}`}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-sm cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-gold-400 font-bold text-xs flex items-center justify-center">
                        {pos + 1}
                      </span>
                      <span className="text-slate-200">{activeChallenge.sortItems![itemIdx]}</span>
                    </motion.div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSortSubmit}
                    aria-label="Verify Step Sequence"
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-sm"
                  >
                    Verify Step Sequence
                  </motion.button>
                </div>
              )}

              {/* CONSTRUCT CHALLENGE */}
              {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {activeChallenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        aria-label={`Add part ${part}`}
                        className="px-3 py-1.5 bg-gold-800 hover:bg-gold-700 text-white rounded-lg text-xs font-bold"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[50px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <span key={i} className="px-3 py-1 bg-gold-900 text-gold-200 rounded-md text-xs font-bold flex items-center gap-1 font-mono">
                        {part}
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))}
                          aria-label={`Remove part ${part}`}
                          className="text-rose-400 ml-1 font-bold"
                        >
                          ×
                        </motion.button>
                      </span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500 italic">Click formula blocks above to assemble the polar expression</span>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={constructParts.length === 0}
                    aria-label="Validate Expression"
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-sm disabled:opacity-40"
                  >
                    Validate Polar Expression
                  </motion.button>
                </div>
              )}

              {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 bg-gold-950/40 rounded-xl border border-gold-800/60 space-y-3"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <span>📝</span> Step-by-Step Formal Mathematical Solution:
                  </span>
                  <div className="space-y-1.5 text-xs md:text-sm text-slate-300">
                    {activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                      <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                        <strong className="text-gold-400 font-mono">{i + 1}.</strong> {sentence}{!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setRevealedSteps(s => s + 1)}
                        aria-label="Show Next Derivation Step"
                        className="px-4 py-1.5 bg-amber-600/30 border border-amber-600 text-amber-300 rounded-lg text-xs font-bold"
                      >
                        Show Next Derivation Step →
                      </motion.button>
                    ) : <div />}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Advance to Next Challenge"
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-md"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Mastery Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── 5. COMPLETION PHASE (MOTIVATIONAL FEEDBACK + SPACED REPETITION VISIBILITY) ─── */}
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Motivational Banner with Exact Error Thresholds */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-8 bg-gradient-to-br ${motivationalData.color} rounded-3xl border ${motivationalData.borderColor} text-center space-y-4 shadow-2xl relative overflow-hidden`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 mx-auto rounded-full bg-black/30 border border-white/20 flex items-center justify-center text-4xl shadow-inner"
              >
                🎓
              </motion.div>

              <span className="inline-block px-4 py-1 rounded-full bg-black/40 text-xs font-black uppercase tracking-widest text-white border border-white/20">
                {motivationalData.badge}
              </span>

              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                {motivationalData.title}
              </h2>

              <div className="text-5xl font-black text-white font-mono drop-shadow">
                {Math.max(0, 100 - errors * 5)}%
              </div>

              <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto leading-relaxed">
                {motivationalData.message}
              </p>

              <div className="flex justify-center items-center gap-4 pt-2 text-xs text-white/80 font-mono">
                <span>Total Errors: {errors}</span>
                <span>•</span>
                <span>Mastery: {masteryLevel.toUpperCase()}</span>
                <span>•</span>
                <span>Accuracy: {scoreBreakdown.correct}/{scoreBreakdown.total}</span>
              </div>
            </motion.div>

            {/* SPACED REPETITION (SM-2) VISIBILITY BADGE */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-gradient-to-r from-amber-950/40 via-gold-950/40 to-slate-900 rounded-2xl border border-amber-500/40 space-y-3"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🧠</span>
                  <div>
                    <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                      Spaced Repetition Schedule (SM-2 Interval)
                    </h3>
                    <p className="text-xs text-slate-300">
                      Based on your performance of <strong className="text-white">{errors} error{errors !== 1 ? 's' : ''}</strong>, your calculated memory consolidation interval is set.
                    </p>
                  </div>
                </div>
                <span className="px-4 py-2 bg-amber-500/20 text-amber-300 font-extrabold text-sm rounded-xl border border-amber-500/50">
                  📅 Review in {reviewIntervalDays} day{reviewIntervalDays > 1 ? 's' : ''}
                </span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 flex justify-between items-center font-mono">
                <span>Memory Decay Threshold: 0.85 BKT</span>
                <span className="text-gold-400">Next SRS Check: {new Date(Date.now() + reviewIntervalDays * 86400000).toLocaleDateString()}</span>
              </div>
            </motion.div>

            {/* Misconceptions Diagnostic Log */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 bg-rose-950/30 rounded-2xl border border-rose-900/60 space-y-3"
              >
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                  <span>⚠️</span> Targeted Misconception Diagnostics
                </h3>
                <div className="space-y-2">
                  {hitMisconceptions.map((idx, i) => {
                    const m = misconceptions?.[idx];
                    if (!m) return null;
                    return (
                      <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-900/30 text-xs">
                        <p className="text-rose-400 font-semibold">✗ Misconception: {m.misconception}</p>
                        <p className="text-emerald-400 font-medium mt-1">✓ Correction: {m.correction}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Reflection & Real-World Radar Synthesis Activity Arc */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2"
              >
                <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">Reflective Thinking</h4>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Why does cos(2x) produce three equivalent algebraic forms while sin(2x) produces one?</li>
                  <li>How does complex multiplication geometrically combine rotation (arg sum) and scaling (modulus product)?</li>
                  <li>Where do complex roots appear in electronic AC circuit analysis and signal filtering?</li>
                </ul>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.005 }}
                className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2"
              >
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  🛰️ {REAL_WORLD_ACTIVITY.title}
                </h4>
                <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
                <div className="grid grid-cols-1 gap-1 pt-1">
                  {REAL_WORLD_ACTIVITY.steps.slice(0, 2).map((st, i) => (
                    <div key={i} className="text-[11px] text-slate-400">
                      <strong className="text-gold-400 mr-1">{i + 1}.</strong> {st}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="flex justify-center pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPhase('explore');
                  setCurrentSlide(0);
                  setCurrentChallenge(0);
                  setErrors(0);
                }}
                aria-label="Restart Exploration Laboratory"
                className="px-8 py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl shadow-lg shadow-gold-600/30"
              >
                Restart Exploration Laboratory 🔄
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PLATFORM FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Calibration Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C11_MathematicsHalfAngleOnethirdSim;
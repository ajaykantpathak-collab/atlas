'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC APPLIED MATHS NODE IDS ───
const NODE_C11_APPMATH_061 = 'c11_appmath_061'; // Karl Pearson r & Covariance
const NODE_C11_APPMATH_062 = 'c11_appmath_062'; // Spearman rank rho
const NODE_C11_APPMATH_063 = 'c11_appmath_063'; // Lines of Regression & Least Squares
const NODE_C11_APPMATH_064 = 'c11_appmath_064'; // Regression Coefficients byx, bxy
const NODE_C11_APPMATH_065 = 'c11_appmath_065'; // Probability Sample Spaces & Events
const NODE_C11_APPMATH_066 = 'c11_appmath_066'; // Addition Theorem of Probability
const NODE_C11_APPMATH_067 = 'c11_appmath_067'; // Statements & Truth Tables
const NODE_C11_APPMATH_068 = 'c11_appmath_068'; // Converse, Contrapositive, Contradiction
const NODE_C11_APPMATH_069 = 'c11_appmath_069'; // Logical Puzzles & Syllogisms
const NODE_C11_APPMATH_070 = 'c11_appmath_070'; // Financial Mathematics Interest Rates

const ALL_NODE_IDS = [
  NODE_C11_APPMATH_061,
  NODE_C11_APPMATH_062,
  NODE_C11_APPMATH_063,
  NODE_C11_APPMATH_064,
  NODE_C11_APPMATH_065,
  NODE_C11_APPMATH_066,
  NODE_C11_APPMATH_067,
  NODE_C11_APPMATH_068,
  NODE_C11_APPMATH_069,
  NODE_C11_APPMATH_070,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Dalal Street & Tech Park Analytics Challenge',
  intro: 'You are the chief quantitative strategist at an Indian analytics fund in Mumbai. Your desk must evaluate high-stakes bivariate market correlations, predict crop revenues, verify probability risk models, inspect mathematical logic proofs, and calibrate interest rate returns against inflation.',
  context: 'Mastering Karl Pearson r, regression lines, probability addition theorems, logic equivalences, and nominal vs effective financial yields is crucial to unlocking full institutional precision.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'An analyst observes that district ice cream sales and sunburn cases have r = +0.92. Does this prove eating ice cream causes sunburn?',
  options: [
    'Yes — high positive correlation r > 0.9 strictly proves direct causation.',
    'No — correlation measures joint co-movement; a lurking third variable (summer heat) drives both.',
    'Yes — because Pearson r is a causal regression slope parameter.',
    'No — because Pearson r must be negative for medical conditions.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Correlation describes association, not direct mechanical causation!',
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

// ─── 22 CHALLENGES COVERING ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - c11_appmath_061
  {
    id: 'ch_01_pearson_bounds',
    nodeId: NODE_C11_APPMATH_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "What is the exact theoretical domain range of Karl Pearson's correlation coefficient r?",
    options: ['0 ≤ r ≤ 1', '−1 ≤ r ≤ +1', '−∞ < r < +∞', '−1 < r < 0 only'],
    correctIndex: 1,
    explanation: "Karl Pearson's correlation coefficient is a unitless standardized measure bounded strictly between −1 and +1 inclusive. At ±1 the relationship is perfectly linear.",
    hints: [
      'Think about whether correlation can be negative or positive.',
      'Covariance is divided by the product of standard deviations σ_x and σ_y.',
      'The standardized ratio cannot exceed 1 in magnitude, so it ranges from −1 to +1.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - c11_appmath_067
  {
    id: 'ch_02_logic_statement',
    nodeId: NODE_C11_APPMATH_067,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following is a mathematically acceptable statement?',
    options: [
      'Please open the window in Mumbai.',
      'Mathematics is the most enjoyable subject.',
      'Every prime number greater than 2 is odd.',
      'What a wonderful day for statistics!',
    ],
    correctIndex: 2,
    explanation: 'A mathematical statement is an unambiguous declarative sentence that is either definitely true or definitely false, but not both. Prime numbers > 2 are all odd (True).',
    hints: [
      'Statements cannot be commands, questions, or subjective personal feelings.',
      'Look for an objective fact that can be evaluated as strictly True or False.',
      'Odd prime rule is a universal mathematical fact.',
    ],
    misconceptionIndex: 2,
  },
  // 3. Foundation - c11_appmath_065
  {
    id: 'ch_03_prob_mutually_exclusive',
    nodeId: NODE_C11_APPMATH_065,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When rolling a fair six-faced die once, which pair of events is strictly mutually exclusive?',
    options: [
      'Getting a prime number {2, 3, 5} and getting an odd number {1, 3, 5}',
      'Getting an even number {2, 4, 6} and getting a multiple of 3 {3, 6}',
      'Getting a number less than 3 {1, 2} and getting a number greater than 4 {5, 6}',
      'Getting a square number {1, 4} and getting an even number {2, 4, 6}',
    ],
    correctIndex: 2,
    explanation: 'Mutually exclusive events cannot occur simultaneously; their intersection is empty (A ∩ B = ∅). {1, 2} ∩ {5, 6} = ∅.',
    hints: [
      'Check if the two sets share any single common die outcome.',
      '{1, 2} and {5, 6} have zero overlap.',
      'If intersection is empty, the events are mutually exclusive.',
    ],
    misconceptionIndex: 1,
  },
  // 4. Foundation - c11_appmath_070
  {
    id: 'ch_04_si_vs_ci',
    nodeId: NODE_C11_APPMATH_070,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Calculate the Simple Interest (SI in ₹) on a principal of ₹20,000 at 8% per annum for 3 years.',
    correctAnswer: 4800,
    tolerance: 10,
    unit: '₹',
    explanation: 'SI = (P × R × T) / 100 = (20,000 × 8 × 3) / 100 = ₹4,800.',
    hints: [
      'Use the standard linear formula: SI = (P · R · T) / 100.',
      'Multiply 20,000 by 8 and by 3, then divide by 100.',
      '200 × 24 = 4,800.',
    ],
    misconceptionIndex: 4,
  },
  // 5. Foundation - c11_appmath_062
  {
    id: 'ch_05_spearman_formula',
    nodeId: NODE_C11_APPMATH_062,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "What is Spearman's rank correlation coefficient formula when no ranks are tied?",
    options: [
      'ρ = 1 − [6 Σd²] / [n(n² − 1)]',
      'ρ = 1 + [6 Σd²] / [n(n² + 1)]',
      'ρ = [Σd²] / [n(n − 1)]',
      'ρ = 1 − [12 Σd²] / [n²(n − 1)]',
    ],
    correctIndex: 0,
    explanation: "Spearman's rank correlation coefficient without ties is ρ = 1 − (6 Σd²) / [n(n² − 1)], where d is the rank difference for each pair.",
    hints: [
      'Look for 1 minus a fraction involving 6 Σd².',
      'The denominator has n(n² − 1).',
      'Formula is ρ = 1 − 6Σd² / [n(n² − 1)].',
    ],
    misconceptionIndex: 0,
  },
  // 6. Foundation - c11_appmath_068
  {
    id: 'ch_06_contrapositive_def',
    nodeId: NODE_C11_APPMATH_068,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: "Given the implication p → q: 'If it rains in Chennai, then the cricket pitch is covered.' What is its contrapositive?",
    options: [
      'If the cricket pitch is covered, then it rains in Chennai.',
      'If it does not rain in Chennai, then the cricket pitch is not covered.',
      'If the cricket pitch is not covered, then it does not rain in Chennai.',
      'It rains in Chennai and the cricket pitch is not covered.',
    ],
    correctIndex: 2,
    explanation: 'The contrapositive of p → q is ~q → ~p (negate both and reverse order). It is logically equivalent to the original statement.',
    hints: [
      'Converse is q → p; Inverse is ~p → ~q; Contrapositive is ~q → ~p.',
      'Negate the consequent: pitch is not covered. Negate antecedent: it does not rain.',
      'Place not-q first: If the pitch is not covered, then it does not rain.',
    ],
    misconceptionIndex: 3,
  },
  // 7. Foundation - c11_appmath_069
  {
    id: 'ch_07_odd_man_out',
    nodeId: NODE_C11_APPMATH_069,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    question: 'Find the Odd Man Out from the set: { 28, 42, 56, 65, 84 } and state the mathematical rule.',
    options: [
      '42 — because it is divisible by 6.',
      '65 — because all other numbers are exact multiples of 7.',
      '28 — because it is the smallest number.',
      '84 — because it is a multiple of 12.',
    ],
    correctIndex: 1,
    explanation: '28 (7×4), 42 (7×6), 56 (7×8), and 84 (7×12) are all multiples of 7. 65 is not divisible by 7 (65 = 7×9 + 2).',
    hints: [
      'Test divisibility by a common prime factor.',
      'Check if numbers belong to the 7 times table.',
      '65 is 5 × 13, not a multiple of 7.',
    ],
    misconceptionIndex: 3,
  },
  // 8. Standard - c11_appmath_061 (Drag Label)
  {
    id: 'ch_08_drag_bivariate_formula',
    nodeId: NODE_C11_APPMATH_061,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: "Match the Karl Pearson components to their correct formula definitions:",
    dragItems: [
      { label: 'Cov(X,Y)', targetId: 'cov_box' },
      { label: 'σ_x', targetId: 'sigmax_box' },
      { label: 'r_xy', targetId: 'r_box' },
      { label: 'r²', targetId: 'r2_box' },
    ],
    correctMapping: {
      cov_box: 'Cov(X,Y)',
      sigmax_box: 'σ_x',
      r_box: 'r_xy',
      r2_box: 'r²',
    },
    explanation: 'Cov(X,Y) = Σ(x−x̄)(y−ȳ)/N, σ_x = √Var(X), r_xy = Cov(X,Y)/(σ_x·σ_y), and r² = byx · bxy (coefficient of determination).',
    hints: [
      'Covariance is the average product of deviations.',
      'Standard deviation is the square root of variance.',
      'r is standardized covariance, and r² is the product of regression slopes.',
    ],
  },
  // 9. Standard - c11_appmath_063
  {
    id: 'ch_09_regression_intersection',
    nodeId: NODE_C11_APPMATH_063,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Where do the two lines of regression (y on x, and x on y) always intersect in a Cartesian plane?',
    options: [
      'At the origin (0, 0)',
      'At the point of means (x̄, ȳ)',
      'At the point of standard deviations (σ_x, σ_y)',
      'They never intersect unless r = 1',
    ],
    correctIndex: 1,
    explanation: 'Both regression lines pass through the centroid (x̄, ȳ) of the bivariate distribution. Solving the two regression equations simultaneously yields x̄ and ȳ.',
    hints: [
      'The center of gravity of bivariate scatter data is the mean point.',
      'Substitute x = x̄ into y − ȳ = byx(x − x̄); you get y = ȳ.',
      'Hence they always intersect at (x̄, ȳ).',
    ],
    misconceptionIndex: 0,
  },
  // 10. Standard - c11_appmath_064
  {
    id: 'ch_10_reg_coeff_product',
    nodeId: NODE_C11_APPMATH_064,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Given the regression coefficients byx = 0.8 and bxy = 0.45. Compute the correlation coefficient r (rounded to 2 decimal places).',
    correctAnswer: 0.6,
    tolerance: 0.02,
    unit: '',
    explanation: 'r² = byx · bxy = 0.8 × 0.45 = 0.36. Since both coefficients are positive, r = +√0.36 = +0.60.',
    hints: [
      'Use the fundamental identity: r² = byx · bxy.',
      '0.8 × 0.45 = 0.36.',
      'Take the square root: √0.36 = 0.60.',
    ],
    misconceptionIndex: 0,
  },
  // 11. Standard - c11_appmath_066
  {
    id: 'ch_11_addition_theorem_cards',
    nodeId: NODE_C11_APPMATH_066,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A card is drawn from a 52-card pack. What is P(King ∪ Heart)? Enter probability as favourable card count out of 52.',
    correctAnswer: 16,
    tolerance: 0.1,
    unit: 'cards out of 52',
    explanation: 'P(K ∪ H) = P(K) + P(H) − P(K ∩ H) = 4/52 + 13/52 − 1/52 = 16/52 (which is 4/13). 16 cards are kings or hearts.',
    hints: [
      'There are 4 Kings and 13 Hearts.',
      'The King of Hearts is in both categories, so subtract 1.',
      '4 + 13 − 1 = 16 favourable cards.',
    ],
    misconceptionIndex: 1,
  },
  // 12. Standard - c11_appmath_067 (Construct)
  {
    id: 'ch_12_construct_implication',
    nodeId: NODE_C11_APPMATH_067,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Assemble the logical representation for: "p implies q is false if and only if p is true and q is false".',
    availableParts: ['~(p → q)', '≡', 'p', '∧', '~q', '∨', 'q → p'],
    targetState: '~(p → q) ≡ p ∧ ~q',
    validationHint: 'Click parts in order: ~(p → q) then ≡ then p then ∧ then ~q',
    explanation: 'The negation of an implication ~(p → q) is logically equivalent to p ∧ ~q (the single row where antecedent is True and consequent is False).',
    hints: [
      'Start with the negation of implication: ~(p → q).',
      'Use the equivalence symbol ���.',
      'The condition is p true AND not-q: p ∧ ~q.',
    ],
    misconceptionIndex: 2,
  },
  // 13. Standard - c11_appmath_069 (Coding)
  {
    id: 'ch_13_coding_city',
    nodeId: NODE_C11_APPMATH_069,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If PUNE is coded as SXQH with a +3 shift rule, how is PATNA coded under the exact same shift?',
    options: ['SDWQD', 'SDWQH', 'TCWQD', 'SDVRG'],
    correctIndex: 0,
    explanation: 'P(+3)=S, A(+3)=D, T(+3)=W, N(+3)=Q, A(+3)=D. Therefore PATNA becomes SDWQD.',
    hints: [
      'Shift each letter forward by 3 places in the alphabet.',
      'P → S, A → D, T → W.',
      'N → Q, A → D. The code is SDWQD.',
    ],
  },
  // 14. Standard - c11_appmath_070
  {
    id: 'ch_14_effective_rate',
    nodeId: NODE_C11_APPMATH_070,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Mumbai bank offers 12% nominal interest compounded quarterly. What is the Effective Annual Rate (AER in %)? Enter value up to 2 decimal places.',
    correctAnswer: 12.55,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Effective Rate = (1 + r/m)^m − 1 = (1 + 0.12/4)⁴ − 1 = (1.03)⁴ − 1 = 1.1255088 − 1 ≈ 12.55%.',
    hints: [
      'Quarterly rate = 12% / 4 = 3% = 0.03 per quarter.',
      'Annual growth multiplier = (1 + 0.03)⁴ = (1.03)⁴.',
      '1.03⁴ = 1.12551, so effective rate is 12.55%.',
    ],
    misconceptionIndex: 4,
  },
  // 15. Advanced - c11_appmath_061
  {
    id: 'ch_15_pearson_calc',
    nodeId: NODE_C11_APPMATH_061,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'If Cov(X,Y) = −24, Var(X) = 36, and Var(Y) = 64, what is Karl Pearson’s r and what does it indicate?',
    options: [
      'r = −0.50, moderate negative linear correlation',
      'r = −1.00, perfect negative linear correlation',
      'r = +0.50, moderate positive correlation',
      'r = −0.25, weak negative correlation',
    ],
    correctIndex: 0,
    explanation: 'σ_x = √36 = 6, σ_y = √64 = 8. r = Cov(X,Y)/(σ_x·σ_y) = −24 / (6 × 8) = −24 / 48 = −0.50. This indicates moderate negative correlation.',
    hints: [
      'Find the standard deviations: σ_x = √36 and σ_y = √64.',
      'Multiply standard deviations: 6 × 8 = 48.',
      'r = −24 / 48 = −0.50.',
    ],
    misconceptionIndex: 0,
  },
  // 16. Advanced - c11_appmath_062 (Drag Sort)
  {
    id: 'ch_16_spearman_steps',
    nodeId: NODE_C11_APPMATH_062,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: "Arrange the systematic steps for computing Spearman's Rank Correlation with tied ranks in correct sequence:",
    sortItems: [
      'Rank the observations of X and Y separately (assigning mean ranks to ties)',
      'Calculate the rank difference d = R_x − R_y for every observation pair',
      'Square each rank difference d² and compute the sum Σd²',
      'Compute tied correction factor CF = Σ [m(m² − 1)] / 12 for all tied groups',
      'Substitute into ρ = 1 − [6(Σd² + ΣCF)] / [n(n² − 1)]',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The rigorous method requires ranking first, obtaining differences d, calculating sum of d², determining tie correction factors CF, and finally evaluating ρ.',
    hints: [
      'You cannot compute rank differences until ranks are assigned.',
      'Sum of d² comes before applying the tie adjustment factor CF.',
      'Final substitution into the corrected formula is the ultimate step.',
    ],
  },
  // 17. Advanced - c11_appmath_064
  {
    id: 'ch_17_estimate_y_on_x',
    nodeId: NODE_C11_APPMATH_064,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'The regression equation of y on x is y = 1.5x + 10. If a student studies for x = 40 hours, what is the estimated score y?',
    correctAnswer: 70,
    tolerance: 0.5,
    unit: 'marks',
    explanation: 'Substitute x = 40 into the regression line of y on x: y = 1.5(40) + 10 = 60 + 10 = 70 marks.',
    hints: [
      'Use the line solved for y: y = 1.5x + 10.',
      'Replace x with 40: 1.5 × 40 = 60.',
      'Add the intercept 10 to get 70.',
    ],
    misconceptionIndex: 0,
  },
  // 18. Advanced - c11_appmath_066
  {
    id: 'ch_18_addition_theorem_3_events',
    nodeId: NODE_C11_APPMATH_066,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'If events A, B, C are pairwise mutually exclusive with P(A) = 0.25, P(B) = 0.35, P(C) = 0.20, what is P(A ∪ B ∪ C)?',
    options: ['0.80', '0.0175', '0.70', '1.00'],
    correctIndex: 0,
    explanation: 'For mutually exclusive events, intersections are zero. P(A ∪ B ∪ C) = P(A) + P(B) + P(C) = 0.25 + 0.35 + 0.20 = 0.80.',
    hints: [
      'Pairwise mutually exclusive means no two events can occur together.',
      'All intersection terms equal 0.',
      'Simply sum the individual probabilities: 0.25 + 0.35 + 0.20 = 0.80.',
    ],
    misconceptionIndex: 1,
  },
  // 19. Advanced - c11_appmath_068
  {
    id: 'ch_19_contrapositive_equivalence',
    nodeId: NODE_C11_APPMATH_068,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is a statement p → q logically equivalent to its contrapositive ~q → ~p, while its converse q → p is not?',
    options: [
      'Because both p → q and ~q → ~p are false in exactly the same truth table case: when p is True and q is False.',
      'Because converse and contrapositive always have the exact same number of letters.',
      'Because ~q → ~p is true only when both p and q are False.',
      'Because the converse requires a Venn diagram while contrapositive does not.',
    ],
    correctIndex: 0,
    explanation: 'p → q is False ONLY when p=T and q=F. In that exact case, ~q=T and ~p=F, making ~q → ~p False. In all other 3 rows both are True. The converse q → p is False when q=T and p=F, a different case.',
    hints: [
      'Compare the truth table truth conditions for each implication.',
      'An implication is broken only when the condition holds but conclusion fails.',
      'Truth table rows for p → q and ~q → ~p are identical in all 4 cases.',
    ],
    misconceptionIndex: 3,
  },
  // 20. Advanced - c11_appmath_069
  {
    id: 'ch_20_blood_relation_syllogism',
    nodeId: NODE_C11_APPMATH_069,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Clues: "Pointing to a photograph, Rohit says: She is the daughter of the only son of my grandfather." Who is the girl in the photograph to Rohit?',
    options: ['His Sister', 'His Mother', 'His Aunt', 'His Niece'],
    correctIndex: 0,
    explanation: "Rohit's grandfather's only son is Rohit's father. The daughter of Rohit's father is Rohit's sister.",
    hints: [
      'Break down the chain: "grandfather\'s only son".',
      'The only son of Rohit\'s grandfather is Rohit\'s father.',
      'The daughter of Rohit\'s father must be Rohit\'s sister.',
    ],
    misconceptionIndex: 3,
  },
  // 21. Advanced - c11_appmath_070
  {
    id: 'ch_21_fisher_real_rate',
    nodeId: NODE_C11_APPMATH_070,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'If an Indian corporate bond offers a nominal return of 9.5% per annum and the annual CPI inflation is 4.2%, calculate the approximate Real Interest Rate (%) using the Fisher equation.',
    correctAnswer: 5.3,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Real Rate ≈ Nominal Rate − Inflation Rate = 9.5% − 4.2% = 5.3%. The real rate measures true growth in purchasing power.',
    hints: [
      'Fisher approximation: r_real ≈ r_nominal − inflation.',
      'Subtract 4.2 from 9.5.',
      '9.5 − 4.2 = 5.3%.',
    ],
    misconceptionIndex: 4,
  },
  // 22. Advanced - c11_appmath_063
  {
    id: 'ch_22_orthogonal_regression',
    nodeId: NODE_C11_APPMATH_063,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'When Karl Pearson r = 0, what is the geometric relationship between the two regression lines y on x and x on y?',
    options: [
      'They are coincident (single identical line)',
      'They are mutually perpendicular (orthogonal, angle = 90°)',
      'They are parallel with a distance of 1 unit',
      'They make an acute angle of 45°',
    ],
    correctIndex: 1,
    explanation: 'When r = 0, byx = 0 (horizontal line y = ȳ) and bxy = 0 (vertical line x = x̄). The lines are parallel to the Cartesian axes and mutually perpendicular at (x̄, ȳ).',
    hints: [
      'When r = 0, the slopes byx and bxy both become zero.',
      'One line becomes y = ȳ (horizontal) and the other x = x̄ (vertical).',
      'A horizontal line and a vertical line meet at 90° (perpendicular).',
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

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_APPMATH_061,
  title: "Applied Mathematics: Correlation, Regression, Probability & Logic",
  definition: "Comprehensive ISC Class 11 Applied Mathematics mastery covering bivariate statistics (Karl Pearson r, Spearman rank, least-squares regression lines), axiomatic probability (addition theorem, sample spaces), mathematical reasoning (truth tables, contrapositive, syllogisms), and financial interest rates.",
  eli5: "Think of correlation as measuring how closely two dancers mirror each other's steps, regression as predicting where they will step next, probability as measuring the likelihood of random events, logic as testing unbreakable reasoning rules, and financial math as making sure your money beats inflation!",
  misconceptions: [
    {
      misconception: "Confusing Karl Pearson's correlation coefficient r with regression slopes byx and bxy.",
      correction: "r is a dimensionless symmetric index bounded between −1 and +1; regression coefficients are directional slopes with physical units satisfying byx · bxy = r².",
    },
    {
      misconception: "Adding probabilities P(A ∪ B) = P(A) + P(B) without subtracting intersection P(A ∩ B).",
      correction: "The simple sum applies only to mutually exclusive events where P(A ∩ B) = 0. For overlapping events, double-counted elements must be subtracted.",
    },
    {
      misconception: "Believing an implication p → q is equivalent to its converse q → p.",
      correction: "An implication is only logically equivalent to its contrapositive (~q → ~p). The converse (q → p) can be false even when p → q is true.",
    },
    {
      misconception: "Confusing mutually exclusive events with independent events.",
      correction: "Mutually exclusive means cannot happen together (P(A ∩ B) = 0). Independent means occurrence of one does not affect the probability of the other (P(A ∩ B) = P(A)P(B)).",
    },
    {
      misconception: "Treating advertised nominal bank interest rate as the true annual yield.",
      correction: "Nominal interest ignores intra-year compounding. The Effective Annual Rate (AER) = (1 + r/m)^m − 1 calculates true compound growth.",
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the value of r if byx = 0.9 and bxy = 0.4?', options: ['0.60', '0.36', '1.30', '0.65'], correctIndex: 0 },
    { question: 'What is the contrapositive of p → q?', options: ['~q → ~p', 'q → p', '~p → ~q', 'p ∧ ~q'], correctIndex: 0 },
    { question: 'If A and B are mutually exclusive, P(A ∩ B) is:', options: ['0', 'P(A)·P(B)', '1', 'P(A)+P(B)'], correctIndex: 0 },
    { question: 'AER for 8% compounded semi-annually is:', options: ['8.16%', '8.00%', '8.40%', '4.08%'], correctIndex: 0 },
    { question: 'Intersection point of two regression lines is:', options: ['(x̄, ȳ)', '(0, 0)', '(1, 1)', '(σx, σy)'], correctIndex: 0 },
    { question: 'Spearman rank correlation when Σd² = 0 is:', options: ['+1.00', '0.00', '−1.00', '0.50'], correctIndex: 0 },
    { question: 'Real interest rate approx formula is:', options: ['Nominal − Inflation', 'Nominal + Inflation', 'Nominal × Inflation', 'Nominal / Inflation'], correctIndex: 0 },
    { question: 'The negation of (p → q) is logically equivalent to:', options: ['p ∧ ~q', '~p ∧ q', '~p ∨ q', 'p → ~q'], correctIndex: 0 },
  ],
  masteryCriteria: "Student can compute Karl Pearson r, evaluate Spearman rank correlation, derive regression lines, apply probability addition theorem, construct truth tables, and convert nominal to effective interest rates.",
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Karl Pearson r & Scatter Co-Movement',
    instruction: 'Drag the correlation tilt slider and spread slider to observe how points and Pearson r change in real-time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_APPMATH_061,
  },
  {
    title: 'Lab 2: Twin Regression Lines & Centroid (x̄, ȳ)',
    instruction: 'Rotate the correlation slider to see how regression lines y-on-x and x-on-y scissor around the centroid.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_APPMATH_063,
  },
  {
    title: 'Lab 3: Probability Overlap & Addition Theorem',
    instruction: 'Adjust event circle radius and overlap to see P(A ∪ B) = P(A) + P(B) − P(A ∩ B) update live.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_APPMATH_066,
  },
  {
    title: 'Lab 4: Logic Truth Table & Equivalence Circuit',
    instruction: 'Toggle truth inputs for propositions p and q to verify that p → q and ~q → ~p always match.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_APPMATH_068,
  },
  {
    title: 'Lab 5: Financial Compounding & Inflation Erosion',
    instruction: 'Adjust compounding frequency and inflation slider to observe Nominal vs Effective (AER) vs Real yield.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_APPMATH_070,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you tighten the scatter points closer to a rising 45° line, what happens to Pearson r?',
    options: ['r approaches 0', 'r approaches +1.0', 'r becomes negative', 'r exceeds +2.0'],
    correctIndex: 1,
    verifyInstruction: 'Now set the correlation slider to +0.95 and observe the tight linear clustering and calculated r value.',
    nodeId: NODE_C11_APPMATH_061,
  },
  {
    question: 'Predict: If compounding frequency increases from annual (m=1) to daily (m=365) for a 12% nominal rate, the effective rate will:',
    options: ['Decrease below 12%', 'Stay exactly at 12%', 'Increase to approx 12.75%', 'Double to 24%'],
    correctIndex: 2,
    verifyInstruction: 'Adjust the Compounding Frequency slider to Monthly/Daily in Lab 5 to verify the upward curvature of AER.',
    nodeId: NODE_C11_APPMATH_070,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the two regression lines when correlation r = 0?',
    observableOptions: [
      'They become mutually perpendicular: one horizontal y = ȳ, one vertical x = x̄.',
      'They collapse into a single diagonal line.',
      'They spin uncontrollably into negative quadrant.',
      'They disappear completely from the plane.',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_APPMATH_063,
  },
  {
    question: 'What happens to the union probability P(A ∪ B) when you separate the two circles so overlap P(A ∩ B) = 0?',
    observableOptions: [
      'P(A ∪ B) becomes strictly equal to P(A) + P(B).',
      'P(A ∪ B) drops to 0.',
      'P(A ∪ B) becomes negative.',
      'P(A ∪ B) exceeds 1.0.',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_APPMATH_066,
  },
];

// ─── REAL-WORLD ACTIVITY ─���─
const REAL_WORLD_ACTIVITY = {
  title: 'Dalal Street & Agri-Tech Quant Portfolio Project',
  description: 'Choose any two Indian economic series (e.g., Monsoon Rainfall in mm vs Kharif Crop Yield in lakh tonnes, or Nifty 50 Index vs RBI Repo Rate). Collect 6 paired data points, construct a scatter plot, compute Karl Pearson r, fit the regression line y on x, and calculate the real yield after inflation.',
  steps: [
    'Tabulate 6 paired observations (x_i, y_i) from official RBI or IMD datasets.',
    'Compute mean x̄, mean ȳ, standard deviations σ_x, σ_y, and covariance Cov(X,Y).',
    'Calculate Karl Pearson r = Cov(X,Y)/(σ_x·σ_y) and check that −1 ≤ r ≤ +1.',
    'Formulate the regression equation y − ȳ = byx(x − x̄) and predict y for a new x.',
    'Assess a 1-year treasury deposit with nominal rate and subtract CPI inflation to find Real Rate.',
  ],
};

// ─── MAIN COMPONENT ───
function C11_AppliedMathsCorrelationCovarianceKarlSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C11_APPMATH_061,
    title = DEFAULT_PROPS.title || "Applied Mathematics",
    misconceptions = DEFAULT_PROPS.misconceptions,
    diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['appmath'] || { name: 'Applied Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant-style Interactive Lab States
  const [scatterCorrelation, setScatterCorrelation] = useState<number>(0.75);
  const [scatterNoise, setScatterNoise] = useState<number>(15);

  // Lab 3: Probability addition states
  const [probA, setProbA] = useState<number>(0.45);
  const [probB, setProbB] = useState<number>(0.35);
  const [probOverlap, setProbOverlap] = useState<number>(0.15);

  // Lab 4: Logic truth table inputs
  const [logicP, setLogicP] = useState<boolean>(true);
  const [logicQ, setLogicQ] = useState<boolean>(false);

  // Lab 5: Financial calculator states
  const [principalAmount] = useState<number>(50000);
  const [nominalRate, setNominalRate] = useState<number>(9.6);
  const [compoundFreq, setCompoundFreq] = useState<number>(4); // Quarterly
  const [inflationRate, setInflationRate] = useState<number>(4.5);
  const [termYears] = useState<number>(2);

  // Predict-then-check & Observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Adaptive & scoring states
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag & drop, sorting, numeric, construct states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Wrong answer shake tracking
  const [wrongOptionIndex, setWrongOptionIndex] = useState<number | null>(null);

  // Feedback UI states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection answer states
  const [reflectionAnswers, setReflectionAnswers] = useState({ q1: '', q2: '', q3: '' });

  // BKT persistence & Auto-hint Timer
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Canvas ref for dynamic statistical chart rendering
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT-BASED ADAPTIVE DIFFICULTY ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner' ? 'foundation' :
      mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
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
    }
  }, [hintCount, challenge]);

  // ─── DISCOVERY HANDLER ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (!isCorrect) {
      setWrongOptionIndex(selectedIndex);
      setTimeout(() => setWrongOptionIndex(null), 500);
    }
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb! You understand correlation does not imply causation.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive Applied Math labs. Manipulate variables to discover formulas.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with any math parameters without time limit or grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Now test your quantitative mastery against rigorous ISC Applied Mathematics challenges.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test with the slider to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation!' : 'Look closer at the angle between the regression lines.');
  }, []);

  const handleScatterSliderChange = useCallback((val: number) => {
    setScatterCorrelation(val);
    audioManager.play('count');
  }, []);

  const handleNoiseSliderChange = useCallback((val: number) => {
    setScatterNoise(val);
    audioManager.play('pop');
  }, []);

  const handleProbASliderChange = useCallback((val: number) => {
    setProbA(val);
    if (val < probOverlap) setProbOverlap(val);
    audioManager.play('count');
  }, [probOverlap]);

  const handleProbBSliderChange = useCallback((val: number) => {
    setProbB(val);
    if (val < probOverlap) setProbOverlap(val);
    audioManager.play('count');
  }, [probOverlap]);

  const handleProbOverlapSliderChange = useCallback((val: number) => {
    const maxPossible = Math.min(probA, probB);
    setProbOverlap(Math.min(val, maxPossible));
    audioManager.play('count');
  }, [probA, probB]);

  const handleLogicToggle = useCallback((target: 'p' | 'q') => {
    if (target === 'p') setLogicP(prev => !prev);
    else setLogicQ(prev => !prev);
    audioManager.play('tap');
  }, []);

  const handleFinancialFreqChange = useCallback((freq: number) => {
    setCompoundFreq(freq);
    audioManager.play('tap');
  }, []);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding! You have mastered ISC Class 11 Applied Mathematics.');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───
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
    setWrongOptionIndex(null);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // ─── AUTO-HINT TIMER (10s) ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── SUBMIT ANSWER HANDLER ───
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
      if (!isCorrect && typeof answer === 'number') {
        setWrongOptionIndex(answer);
      }
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.05);
    } else if (challenge.type === 'construct') {
      isCorrect = (typeof answer === 'string' ? answer.trim() : '') === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setWrongOptionIndex(null);
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Rigorous mathematical deduction.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
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
      setTimeout(() => setWrongOptionIndex(null), 500);

      if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, challenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us inspect the complete step-by-step mathematical reasoning.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // ─── DRAG & DROP HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  // ─── SORT HANDLERS ───
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
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── FINANCIAL CALCULATIONS (AER, REAL YIELD, FUTURE VALUE) ───
  const calculatedFinances = useMemo(() => {
    const rDec = nominalRate / 100;
    const m = compoundFreq;
    const effectiveRateVal = (Math.pow(1 + rDec / m, m) - 1) * 100;
    const realRateVal = effectiveRateVal - inflationRate;
    const maturityAmount = principalAmount * Math.pow(1 + rDec / m, m * termYears);
    const simpleMaturity = principalAmount * (1 + (rDec * termYears));
    return {
      aer: effectiveRateVal,
      realRate: realRateVal,
      maturity: maturityAmount,
      compoundInterest: maturityAmount - principalAmount,
      simpleInterest: simpleMaturity - principalAmount,
    };
  }, [nominalRate, compoundFreq, inflationRate, principalAmount, termYears]);

  // ─── CANVAS 2D ANIMATION EFFECT (Scatter & Regression Render) ─���─
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

      // Background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 30; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 30; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Axes
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(40, canvas.height - 30);
      ctx.lineTo(canvas.width - 20, canvas.height - 30); // X axis
      ctx.moveTo(40, canvas.height - 30);
      ctx.lineTo(40, 20); // Y axis
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText('Variable X (e.g. Rainfall mm)', canvas.width / 2 - 40, canvas.height - 10);
      ctx.save();
      ctx.translate(15, canvas.height / 2 + 30);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('Variable Y (Yield quintals)', 0, 0);
      ctx.restore();

      // Bivariate points based on scatterCorrelation & noise
      const r = scatterCorrelation;
      const noise = scatterNoise;
      const pointCount = 14;
      const cx = (canvas.width - 60) / 2 + 40;
      const cy = (canvas.height - 50) / 2 + 20;

      ctx.fillStyle = '#38bdf8';
      for (let i = 0; i < pointCount; i++) {
        const u = (i - pointCount / 2) * 14;
        const v = r * u + Math.sin(i * 1.7 + frame * 0.02) * (noise * 0.8);
        const px = cx + u;
        const py = cy - v;

        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();

        // Deviation cross
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.beginPath();
        ctx.moveTo(px, cy);
        ctx.lineTo(px, py);
        ctx.stroke();
      }

      // Draw Regression Line Y on X: y − ȳ = byx(x − x̄)
      const byx = r * 0.9;
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const x1 = 50;
      const y1 = cy - byx * (x1 - cx);
      const x2 = canvas.width - 30;
      const y2 = cy - byx * (x2 - cx);
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Draw Regression Line X on Y: x − x̄ = bxy(y − ȳ)
      const bxy = r * 0.9;
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      const yA = 30;
      const xA = cx + bxy * (cy - yA);
      const yB = canvas.height - 40;
      const xB = cx + bxy * (cy - yB);
      ctx.moveTo(xA, yA);
      ctx.lineTo(xB, yB);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Centroid (x̄, ȳ)
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('(x̄, ȳ)', cx + 8, cy - 8);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [scatterCorrelation, scatterNoise]);

  // ─── CLEANUP TIMERS ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-800/60 shadow-inner inline-block"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-xs px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30 font-medium"
              >
                ISC Class 11
              </motion.span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              10 Core Applied Maths Nodes • Karl Pearson r • Regression • Probability • Logic • AER
            </p>
          </div>
        </div>

        {/* Phase / Difficulty Pill */}
        <div className="flex items-center gap-2">
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`text-xs uppercase font-extrabold px-3 py-1 rounded-full border shadow-sm ${
                difficulty === 'foundation'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : difficulty === 'advanced'
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}
            >
              Tier: {difficulty}
            </motion.span>
          )}

          <motion.span
            key={phase}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700"
          >
            Phase: {phase.toUpperCase()}
          </motion.span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 md:p-6 bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-950 rounded-2xl border border-gold-800/60 shadow-xl"
            >
              <div className="flex items-center gap-2 text-gold-400 font-bold text-sm uppercase tracking-wider mb-2">
                <span>🎯</span> Narrative Case Study
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs text-gold-300/90 mt-3 p-3 bg-gold-900/30 rounded-xl border border-gold-800/40">
                💡 <strong>Applied Context:</strong> {SCENARIO.context}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-lg space-y-4"
            >
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <span>❓</span> Discovery Curiosity Check
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white">
                {DISCOVERY_QUESTION.question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={wrongOptionIndex === i ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`text-left p-4 rounded-xl text-sm transition-all border flex items-start gap-2 ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-md'
                          : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-gold-500/50'
                    }`}
                  >
                    <span className="font-bold text-gold-400 shrink-0">
                      {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓ ' : ''}
                      {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex ? '✗ ' : ''}
                      {String.fromCharCode(65 + i)}.
                    </span>
                    <span>{opt}</span>
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
                >
                  <div className="text-sm">
                    <p className={discoveryCorrect ? 'text-emerald-400 font-bold flex items-center gap-1.5' : 'text-amber-400 font-semibold flex items-center gap-1.5'}>
                      <span>{discoveryCorrect ? '✓' : '✗'}</span>
                      {discoveryCorrect ? 'Spot on insight!' : 'Key Distinction:'}
                    </p>
                    <p className="text-xs text-slate-300 mt-1">
                      {discoveryCorrect
                        ? 'Karl Pearson r is a pure symmetric measure of co-movement. Causation requires experimental or mechanical proof.'
                        : DISCOVERY_QUESTION.hintAfter}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    aria-label="Enter Interactive Labs"
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-600/30 whitespace-nowrap"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION (BRILLIANT LABS) ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {/* Diagnostic status banner */}
            {diagnosticQuestions && diagnosticQuestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between px-4 py-2.5 bg-gold-950/40 rounded-xl border border-gold-900/50 text-xs text-gold-300"
              >
                <span>📚 ISC Applied Maths Diagnostic Check: {diagnosticQuestions.length} Competency Benchmarks Active</span>
                <span className="font-mono bg-gold-900/50 px-2 py-0.5 rounded">Labs 1 to 5</span>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.3 }}
                className="p-5 md:p-6 bg-slate-900/95 rounded-2xl border border-slate-800 shadow-xl space-y-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                      Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                    </span>
                    <h3 className="text-lg md:text-xl font-black text-white mt-0.5">
                      {EXPLORATION_STEPS[currentSlide].title}
                    </h3>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                    {EXPLORATION_STEPS[currentSlide].nodeId}
                  </span>
                </div>

                <p className="text-sm text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-800/40">
                  👉 <strong>Action:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>

                {/* ── LAB 1: KARL PEARSON r & SCATTER CANVAS ── */}
                {currentSlide === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-5 bg-slate-950 p-4 rounded-2xl border border-slate-800/80"
                  >
                    <div className="lg:col-span-7 flex flex-col items-center">
                      <canvas
                        ref={canvasRef}
                        width={440}
                        height={280}
                        aria-label="Scatter plot and regression line visualization canvas"
                        className="w-full max-w-[440px] h-[280px] bg-slate-900 rounded-xl border border-slate-800 shadow-inner"
                      />
                      <div className="flex justify-between w-full text-[11px] text-slate-400 px-2 mt-2">
                        <span className="text-emerald-400 font-bold">● Green: y on x (byx={ (scatterCorrelation * 0.9).toFixed(2) })</span>
                        <span className="text-amber-400 font-bold">--- Orange: x on y</span>
                        <span className="text-pink-400 font-bold">● Centroid (x̄, ȳ)</span>
                      </div>
                    </div>

                    <div className="lg:col-span-5 space-y-4">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <label htmlFor="scatter-corr-slider" className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                          <span>Bivariate Linear Correlation (r):</span>
                          <span className="text-gold-400 font-mono font-bold text-sm">
                            {scatterCorrelation > 0 ? '+' : ''}{scatterCorrelation.toFixed(2)}
                          </span>
                        </label>
                        <input
                          id="scatter-corr-slider"
                          type="range"
                          min="-0.98"
                          max="0.98"
                          step="0.02"
                          value={scatterCorrelation}
                          aria-label="Karl Pearson correlation coefficient slider"
                          onChange={(e) => handleScatterSliderChange(parseFloat(e.target.value))}
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                          <span>−1.0 (Inverse)</span>
                          <span>0.0 (No Linear)</span>
                          <span>+1.0 (Perfect)</span>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <label htmlFor="scatter-noise-slider" className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                          <span>Residual Dispersion (Scatter Noise):</span>
                          <span className="text-gold-400 font-mono font-bold text-sm">{scatterNoise}</span>
                        </label>
                        <input
                          id="scatter-noise-slider"
                          type="range"
                          min="2"
                          max="35"
                          step="1"
                          value={scatterNoise}
                          aria-label="Scatter noise residual dispersion slider"
                          onChange={(e) => handleNoiseSliderChange(parseInt(e.target.value))}
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-900/60 text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Coefficient of Determination r²:</span>
                          <span className="font-mono text-emerald-400 font-bold">
                            {(scatterCorrelation * scatterCorrelation).toFixed(4)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Product byx · bxy:</span>
                          <span className="font-mono text-emerald-400 font-bold">
                            {(scatterCorrelation * scatterCorrelation * 0.81).toFixed(4)}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                          Notice how byx · bxy is strictly bounded in [0, 1]!
                        </p>
                      </div>

                      {/* Predict-Then-Check in Slide 1 */}
                      {!predictionMade ? (
                        <div className="p-3 bg-slate-900/90 rounded-xl border border-amber-900/50">
                          <p className="text-xs font-bold text-amber-300 mb-2">
                            🔮 {PREDICTION_QUESTIONS[0].question}
                          </p>
                          <div className="space-y-1.5">
                            {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                              <motion.button
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handlePrediction(i)}
                                aria-label={`Prediction option: ${opt}`}
                                className="w-full text-left p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                              >
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-emerald-400 bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-900/50">
                          ✓ Prediction locked! Test the slider above to verify your theoretical expectation.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* ── LAB 2: TWIN REGRESSION LINES & INTERSECTION (SVG 1: REGRESSION SCISSOR DIAGRAM) ── */}
                {currentSlide === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4"
                  >
                    {/* TOPIC-SPECIFIC SVG 1: Regression Lines Geometry */}
                    <div className="flex justify-center p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 420 180" className="w-full max-w-[420px]" aria-label="Geometric diagram of twin regression lines intersecting at centroid">
                        <rect width="420" height="180" rx="8" fill="#090d16" />
                        {/* Axes */}
                        <line x1="40" y1="150" x2="390" y2="150" stroke="#475569" strokeWidth="1.5" />
                        <line x1="40" y1="150" x2="40" y2="20" stroke="#475569" strokeWidth="1.5" />
                        <text x="375" y="145" fill="#94a3b8" fontSize="10" fontWeight="bold">X</text>
                        <text x="45" y="32" fill="#94a3b8" fontSize="10" fontWeight="bold">Y</text>

                        {/* Centroid grid lines */}
                        <line x1="210" y1="20" x2="210" y2="150" stroke="#334155" strokeDasharray="3,3" />
                        <line x1="40" y1="85" x2="390" y2="85" stroke="#334155" strokeDasharray="3,3" />
                        <text x="212" y="162" fill="#94a3b8" fontSize="9" textAnchor="middle">x̄</text>
                        <text x="28" y="88" fill="#94a3b8" fontSize="9">ȳ</text>

                        {/* Regression Line Y on X */}
                        <line x1="60" y1="135" x2="360" y2="35" stroke="#22c55e" strokeWidth="2.5" />
                        <text x="310" y="30" fill="#22c55e" fontSize="10" fontWeight="bold">y on x (slope = byx)</text>

                        {/* Regression Line X on Y */}
                        <line x1="120" y1="145" x2="300" y2="25" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" />
                        <text x="250" y="18" fill="#f59e0b" fontSize="10" fontWeight="bold">x on y (slope = 1/bxy)</text>

                        {/* Intersection Centroid */}
                        <circle cx="210" cy="85" r="5" fill="#ec4899" />
                        <circle cx="210" cy="85" r="9" fill="none" stroke="#ec4899" strokeWidth="1.5" opacity="0.6" />
                        <text x="222" y="82" fill="#f472b6" fontSize="10" fontWeight="bold">Centroid (x̄, ȳ)</text>

                        {/* Angle θ arc */}
                        <path d="M 240,75 A 35,35 0 0 0 235,65" fill="none" stroke="#a855f7" strokeWidth="2" />
                        <text x="245" y="68" fill="#c084fc" fontSize="9" fontWeight="bold">θ: acute when r &gt; 0</text>
                      </svg>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                        <h4 className="text-sm font-bold text-emerald-400">Line of Regression of y on x</h4>
                        <p className="text-xs font-mono text-slate-300">
                          y − ȳ = byx · (x − x̄)
                        </p>
                        <p className="text-xs text-slate-400">
                          Used to predict dependent <strong>y</strong> (e.g. Sales) when independent <strong>x</strong> (e.g. Ad Spend) is specified.
                        </p>
                        <div className="text-xs text-gold-300 font-mono bg-gold-950/40 p-2 rounded">
                          Slope byx = Cov(X,Y)/Var(X) = r · (σy / σx)
                        </div>
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                        <h4 className="text-sm font-bold text-amber-400">Line of Regression of x on y</h4>
                        <p className="text-xs font-mono text-slate-300">
                          x − x̄ = bxy · (y − ȳ)
                        </p>
                        <p className="text-xs text-slate-400">
                          Used to predict <strong>x</strong> from known <strong>y</strong>. Note: bxy is NOT 1/byx!
                        </p>
                        <div className="text-xs text-gold-300 font-mono bg-gold-950/40 p-2 rounded">
                          Slope bxy = Cov(X,Y)/Var(Y) = r · (σx / σy)
                        </div>
                      </div>
                    </div>

                    {/* Observation Question */}
                    {!observationAnswered ? (
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="text-xs font-bold text-white mb-2">
                          🔍 <strong>What do you notice?</strong> {OBSERVATION_QUESTIONS[0].question}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleObservation(i)}
                              aria-label={`Observation option: ${opt}`}
                              className="text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-300">
                        ✓ Exact! When r = 0, byx = 0 and bxy = 0, meaning the lines are perpendicular (y = ȳ horizontal, x = x̄ vertical).
                      </div>
                    )}
                  </motion.div>
                )}

                {/* ── LAB 3: PROBABILITY ADDITION THEOREM & VENN (SVG 2: VENN DIAGRAM) ── */}
                {currentSlide === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-slate-950 p-5 rounded-2xl border border-slate-800"
                  >
                    <div className="md:col-span-7 flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-800 min-h-[220px]">
                      {/* TOPIC-SPECIFIC SVG 2: Venn Diagram with Dynamic Geometric Radii */}
                      <svg viewBox="0 0 360 200" className="w-full max-w-[340px]" aria-label="Interactive Venn diagram for probability addition theorem">
                        {/* Sample Space S box */}
                        <rect x="10" y="10" width="340" height="180" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                        <text x="25" y="32" fill="#64748b" fontSize="12" fontWeight="bold">Sample Space S (P=1.0)</text>

                        {/* Circle A */}
                        <circle
                          cx="130"
                          cy="110"
                          r={Math.max(30, probA * 100)}
                          fill="rgba(59, 130, 246, 0.35)"
                          stroke="#3b82f6"
                          strokeWidth="2"
                        />
                        <text x="100" y="115" fill="#93c5fd" fontSize="12" fontWeight="bold">
                          P(A)={probA.toFixed(2)}
                        </text>

                        {/* Circle B */}
                        <circle
                          cx={230 - (probOverlap * 120)}
                          cy="110"
                          r={Math.max(30, probB * 100)}
                          fill="rgba(245, 158, 11, 0.35)"
                          stroke="#f59e0b"
                          strokeWidth="2"
                        />
                        <text x="220" y="115" fill="#fde68a" fontSize="12" fontWeight="bold">
                          P(B)={probB.toFixed(2)}
                        </text>

                        {/* Overlap Text */}
                        <text x="170" y="145" textAnchor="middle" fill="#ec4899" fontSize="10" fontWeight="bold">
                          P(A ∩ B) = {probOverlap.toFixed(2)}
                        </text>
                      </svg>
                    </div>

                    <div className="md:col-span-5 space-y-3">
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                        <label htmlFor="prob-a-slider" className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                          <span>P(A) [Event A]:</span>
                          <span className="font-mono text-gold-400 font-bold">{probA.toFixed(2)}</span>
                        </label>
                        <input
                          id="prob-a-slider"
                          type="range"
                          min="0.1"
                          max="0.6"
                          step="0.05"
                          value={probA}
                          aria-label="Probability of Event A slider"
                          onChange={(e) => handleProbASliderChange(parseFloat(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>

                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                        <label htmlFor="prob-b-slider" className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                          <span>P(B) [Event B]:</span>
                          <span className="font-mono text-amber-400 font-bold">{probB.toFixed(2)}</span>
                        </label>
                        <input
                          id="prob-b-slider"
                          type="range"
                          min="0.1"
                          max="0.6"
                          step="0.05"
                          value={probB}
                          aria-label="Probability of Event B slider"
                          onChange={(e) => handleProbBSliderChange(parseFloat(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>

                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                        <label htmlFor="prob-overlap-slider" className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                          <span>P(A ∩ B) [Overlap]:</span>
                          <span className="font-mono text-pink-400 font-bold">{probOverlap.toFixed(2)}</span>
                        </label>
                        <input
                          id="prob-overlap-slider"
                          type="range"
                          min="0.0"
                          max="0.4"
                          step="0.05"
                          value={probOverlap}
                          aria-label="Intersection probability overlap slider"
                          onChange={(e) => handleProbOverlapSliderChange(parseFloat(e.target.value))}
                          className="w-full accent-pink-500"
                        />
                      </div>

                      <div className="p-3 bg-gold-950/60 rounded-xl border border-gold-800 text-xs space-y-1 font-mono">
                        <div className="text-slate-300 font-bold">Addition Theorem Formula:</div>
                        <div className="text-emerald-400 font-bold">
                          P(A ∪ B) = P(A) + P(B) − P(A ∩ B)
                        </div>
                        <div className="text-slate-200">
                          = {probA.toFixed(2)} + {probB.toFixed(2)} − {probOverlap.toFixed(2)} ={' '}
                          <span className="text-white font-bold bg-gold-900 px-1.5 py-0.5 rounded">
                            {(probA + probB - probOverlap).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── LAB 4: LOGIC TRUTH TABLE & CONTRAPOSITIVE (SVG 3: LOGIC EQUIVALENCE FLOW) ── */}
                {currentSlide === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4"
                  >
                    {/* TOPIC-SPECIFIC SVG 3: Logic Gate Equivalence Diagram */}
                    <div className="flex justify-center p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 420 120" className="w-full max-w-[420px]" aria-label="Mathematical logic implication vs contrapositive schematic">
                        <rect width="420" height="120" rx="8" fill="#090d16" />

                        {/* Top: p -> q */}
                        <rect x="25" y="18" width="80" height="30" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                        <text x="65" y="37" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">p → q</text>
                        <line x1="105" y1="33" x2="160" y2="33" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow)" />

                        <rect x="160" y="18" width="130" height="30" rx="6" fill="#022c22" stroke="#10b981" strokeWidth="1.5" />
                        <text x="225" y="37" fill="#6ee7b7" fontSize="10" fontWeight="bold" textAnchor="middle">~p ∨ q (Material Imp)</text>

                        {/* Equivalence symbol in center */}
                        <text x="315" y="66" fill="#f59e0b" fontSize="18" fontWeight="black">≡</text>

                        {/* Bottom: ~q -> ~p */}
                        <rect x="25" y="68" width="80" height="30" rx="6" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="1.5" />
                        <text x="65" y="87" fill="#ddd6fe" fontSize="11" fontWeight="bold" textAnchor="middle">~q → ~p</text>
                        <line x1="105" y1="83" x2="160" y2="83" stroke="#8b5cf6" strokeWidth="2" />

                        <rect x="160" y="68" width="130" height="30" rx="6" fill="#022c22" stroke="#10b981" strokeWidth="1.5" />
                        <text x="225" y="87" fill="#6ee7b7" fontSize="10" fontWeight="bold" textAnchor="middle">~(~q) ∨ ~p ≡ q ∨ ~p</text>

                        {/* Result tag */}
                        <rect x="340" y="35" width="65" height="48" rx="6" fill="#14532d" stroke="#22c55e" strokeWidth="1.5" />
                        <text x="372" y="56" fill="#86efac" fontSize="9" fontWeight="bold" textAnchor="middle">ALWAYS</text>
                        <text x="372" y="70" fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle">MATCH</text>
                      </svg>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-300 font-semibold">Interactive Truth Switches:</span>
                      <div className="flex items-center gap-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleLogicToggle('p')}
                          aria-label={`Toggle proposition p, current value ${logicP ? 'True' : 'False'}`}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                            logicP ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-rose-950 border-rose-500 text-rose-300'
                          }`}
                        >
                          Proposition p = {logicP ? 'TRUE (T)' : 'FALSE (F)'}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleLogicToggle('q')}
                          aria-label={`Toggle proposition q, current value ${logicQ ? 'True' : 'False'}`}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                            logicQ ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-rose-950 border-rose-500 text-rose-300'
                          }`}
                        >
                          Proposition q = {logicQ ? 'TRUE (T)' : 'FALSE (F)'}
                        </motion.button>
                      </div>
                    </div>

                    {/* 4-Row Complete Truth Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border border-slate-800 rounded-xl">
                        <thead className="bg-slate-900 text-slate-400 font-mono">
                          <tr>
                            <th className="p-2.5">p</th>
                            <th className="p-2.5">q</th>
                            <th className="p-2.5">~p</th>
                            <th className="p-2.5">~q</th>
                            <th className="p-2.5 text-gold-400 font-bold">p → q (Implication)</th>
                            <th className="p-2.5 text-emerald-400 font-bold">~q → ~p (Contrapositive)</th>
                            <th className="p-2.5 text-amber-400 font-bold">q → p (Converse)</th>
                          </tr>
                        </thead>
                        <tbody className="font-mono divide-y divide-slate-800/60">
                          {[
                            { pVal: true, qVal: true },
                            { pVal: true, qVal: false },
                            { pVal: false, qVal: true },
                            { pVal: false, qVal: false },
                          ].map((row, idx) => {
                            const imp = !row.pVal || row.qVal;
                            const contra = row.qVal || !row.pVal; // ~q -> ~p is q || ~p
                            const conv = !row.qVal || row.pVal;
                            const isSelected = row.pVal === logicP && row.qVal === logicQ;

                            return (
                              <tr
                                key={idx}
                                className={isSelected ? 'bg-gold-950/80 font-bold text-white border-l-4 border-l-gold-500' : 'text-slate-300'}
                              >
                                <td className="p-2.5">{row.pVal ? 'T' : 'F'}</td>
                                <td className="p-2.5">{row.qVal ? 'T' : 'F'}</td>
                                <td className="p-2.5">{!row.pVal ? 'T' : 'F'}</td>
                                <td className="p-2.5">{!row.qVal ? 'T' : 'F'}</td>
                                <td className={`p-2.5 ${imp ? 'text-emerald-400' : 'text-rose-400 font-black'}`}>
                                  {imp ? 'T' : 'F'}
                                </td>
                                <td className={`p-2.5 ${contra ? 'text-emerald-400' : 'text-rose-400 font-black'}`}>
                                  {contra ? 'T' : 'F'}
                                </td>
                                <td className={`p-2.5 ${conv ? 'text-amber-400' : 'text-rose-400 font-black'}`}>
                                  {conv ? 'T' : 'F'}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <p className="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      💡 <strong>Observation:</strong> Columns <strong>p → q</strong> and <strong>~q → ~p</strong> are strictly identical in every single row. That proves they are logically equivalent! The converse is different in rows 2 & 3.
                    </p>
                  </motion.div>
                )}

                {/* ── LAB 5: FINANCIAL COMPOUNDING & INFLATION CALCULATOR (SVG 4: INTEREST ACCUMULATION) ── */}
                {currentSlide === 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4"
                  >
                    {/* TOPIC-SPECIFIC SVG 4: Compounding Yield Curves */}
                    <div className="flex justify-center p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 420 130" className="w-full max-w-[420px]" aria-label="Compound interest versus simple interest growth curves">
                        <rect width="420" height="130" rx="8" fill="#090d16" />
                        {/* Axes */}
                        <line x1="45" y1="105" x2="390" y2="105" stroke="#475569" strokeWidth="1.5" />
                        <line x1="45" y1="105" x2="45" y2="15" stroke="#475569" strokeWidth="1.5" />
                        <text x="375" y="118" fill="#94a3b8" fontSize="9">Time (Years)</text>
                        <text x="15" y="22" fill="#94a3b8" fontSize="9">₹ Total</text>

                        {/* Principal Base line */}
                        <line x1="45" y1="90" x2="390" y2="90" stroke="#334155" strokeDasharray="3,3" />
                        <text x="50" y="86" fill="#64748b" fontSize="8">Principal ₹50,000</text>

                        {/* Simple Interest Line */}
                        <line x1="45" y1="90" x2="380" y2="55" stroke="#38bdf8" strokeWidth="2" />
                        <text x="310" y="65" fill="#38bdf8" fontSize="9" fontWeight="bold">Simple (SI)</text>

                        {/* Compound Interest Exponential Curve */}
                        <path d="M 45,90 Q 210,75 380,30" fill="none" stroke="#22c55e" strokeWidth="2.5" />
                        <text x="300" y="25" fill="#22c55e" fontSize="9" fontWeight="bold">Compound (AER)</text>

                        {/* Inflation Discount Line */}
                        <line x1="45" y1="90" x2="380" y2="72" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4,2" />
                        <text x="280" y="80" fill="#f43f5e" fontSize="9">Real Yield (less CPI)</text>
                      </svg>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <label htmlFor="nominal-rate-slider" className="text-xs text-slate-400 block mb-1">Nominal Interest Rate (%):</label>
                        <input
                          id="nominal-rate-slider"
                          type="range"
                          min="4"
                          max="16"
                          step="0.2"
                          value={nominalRate}
                          aria-label="Nominal interest rate slider"
                          onChange={(e) => setNominalRate(parseFloat(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                        <div className="text-right font-mono text-gold-400 text-xs font-bold mt-1">
                          {nominalRate.toFixed(1)}% p.a.
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400 block mb-1">Compounding Frequency (m):</span>
                        <div className="grid grid-cols-4 gap-1 mt-1">
                          {[
                            { label: 'Ann', m: 1 },
                            { label: 'Half', m: 2 },
                            { label: 'Qtr', m: 4 },
                            { label: 'Mon', m: 12 },
                          ].map((opt) => (
                            <motion.button
                              key={opt.m}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleFinancialFreqChange(opt.m)}
                              aria-label={`Set compounding frequency to ${opt.label}`}
                              className={`py-1 text-[11px] font-bold rounded ${
                                compoundFreq === opt.m
                                  ? 'bg-gold-600 text-white'
                                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                              }`}
                            >
                              {opt.label}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <label htmlFor="inflation-rate-slider" className="text-xs text-slate-400 block mb-1">CPI Inflation Rate (%):</label>
                        <input
                          id="inflation-rate-slider"
                          type="range"
                          min="1"
                          max="10"
                          step="0.5"
                          value={inflationRate}
                          aria-label="CPI inflation rate slider"
                          onChange={(e) => setInflationRate(parseFloat(e.target.value))}
                          className="w-full accent-rose-500"
                        />
                        <div className="text-right font-mono text-rose-400 text-xs font-bold mt-1">
                          {inflationRate.toFixed(1)}% p.a.
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="text-xs text-slate-400">Effective Annual Rate (AER):</div>
                        <div className="text-xl font-black text-emerald-400 font-mono mt-1">
                          {calculatedFinances.aer.toFixed(2)}%
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1 font-mono">
                          (1 + {nominalRate / 100}/{compoundFreq})^{compoundFreq} − 1
                        </div>
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="text-xs text-slate-400">Real Yield (Purchasing Power):</div>
                        <div
                          className={`text-xl font-black font-mono mt-1 ${
                            calculatedFinances.realRate >= 0 ? 'text-gold-400' : 'text-rose-400'
                          }`}
                        >
                          {calculatedFinances.realRate.toFixed(2)}%
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1 font-mono">
                          AER − Inflation ({inflationRate}%)
                        </div>
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="text-xs text-slate-400">Maturity on ₹50,000 (2 Yrs):</div>
                        <div className="text-xl font-black text-amber-400 font-mono mt-1">
                          ₹{Math.round(calculatedFinances.maturity).toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1 font-mono">
                          CI Gain vs SI: +₹{Math.round(calculatedFinances.compoundInterest - calculatedFinances.simpleInterest).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                aria-label="Previous lab"
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700"
              >
                ← Previous Lab
              </motion.button>

              <span className="text-xs text-slate-400 font-semibold font-mono">
                Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
              </span>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => s + 1)}
                  aria-label="Next lab"
                  className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-md shadow-gold-600/30"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  aria-label="Open sandbox workspace"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30"
                >
                  Open Sandbox Workspace →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: SANDBOX (FREE PLAY) ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 bg-gradient-to-r from-slate-900 to-gold-950/70 rounded-2xl border border-gold-800/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div>
                <h3 className="text-lg font-black text-white">🧪 Quantitative Sandbox & Free Modeling Lab</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Zero pressure, no timers. Manipulate all bivariate correlation parameters, regression slopes, and financial interest yields freely.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Ready for graded challenges"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-emerald-600/30 whitespace-nowrap"
              >
                Ready for Graded Challenges! →
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Left Sandbox: Interactive Scatter & Regression Simulator */}
              <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-gold-400">Bivariate Linear & Regression Live Visualizer</h4>
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={230}
                  aria-label="Sandbox bivariate scatter and regression visualizer"
                  className="w-full h-[230px] bg-slate-950 rounded-xl border border-slate-800"
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="sandbox-corr-slider" className="text-[11px] text-slate-400 block mb-1">
                      Correlation r: <span className="text-white font-mono">{scatterCorrelation.toFixed(2)}</span>
                    </label>
                    <input
                      id="sandbox-corr-slider"
                      type="range"
                      min="-0.98"
                      max="0.98"
                      step="0.04"
                      value={scatterCorrelation}
                      aria-label="Sandbox correlation coefficient slider"
                      onChange={(e) => handleScatterSliderChange(parseFloat(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="sandbox-noise-slider" className="text-[11px] text-slate-400 block mb-1">
                      Noise: <span className="text-white font-mono">{scatterNoise}</span>
                    </label>
                    <input
                      id="sandbox-noise-slider"
                      type="range"
                      min="5"
                      max="30"
                      step="1"
                      value={scatterNoise}
                      aria-label="Sandbox noise dispersion slider"
                      onChange={(e) => handleNoiseSliderChange(parseInt(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>
                </div>
              </div>

              {/* Right Sandbox: Interactive Compounding & Logic Tester */}
              <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-gold-400">Financial AER & Logic Quick Matrix</h4>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Nominal Rate ({nominalRate}%):</span>
                    <span className="font-mono text-white">m={compoundFreq} periods</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Computed Effective Rate (AER):</span>
                    <span className="font-mono text-emerald-400 font-bold">{calculatedFinances.aer.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Real Rate (less {inflationRate}% inflation):</span>
                    <span className="font-mono text-gold-400 font-bold">{calculatedFinances.realRate.toFixed(2)}%</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs font-semibold text-slate-300">Quick Implication Evaluator:</div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleLogicToggle('p')}
                      aria-label={`Toggle logic proposition p, currently ${logicP ? 'True' : 'False'}`}
                      className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                        logicP ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-rose-950 text-rose-300 border border-rose-600'
                      }`}
                    >
                      p: {logicP ? 'T' : 'F'}
                    </motion.button>
                    <span className="text-gold-400 font-bold">→</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleLogicToggle('q')}
                      aria-label={`Toggle logic proposition q, currently ${logicQ ? 'True' : 'False'}`}
                      className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                        logicQ ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-rose-950 text-rose-300 border border-rose-600'
                      }`}
                    >
                      q: {logicQ ? 'T' : 'F'}
                    </motion.button>
                    <span className="text-slate-400 font-bold">=</span>
                    <span
                      className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                        !logicP || logicQ ? 'bg-emerald-900 text-emerald-200' : 'bg-rose-900 text-rose-200'
                      }`}
                    >
                      {!logicP || logicQ ? 'TRUE' : 'FALSE'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: CHALLENGES (ADAPTIVE BKT ENGINE) ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {/* Progress & Stats Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-white">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-gold-300 font-mono">
                  Mastery: {masteryLevel.toUpperCase()} • Accuracy: {scoreBreakdown.total > 0 ? Math.round((scoreBreakdown.correct / scoreBreakdown.total) * 100) : 100}%
                </span>
              </div>

              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-pink-500 rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Question Card */}
            <motion.div
              layout
              className={`p-5 md:p-6 rounded-2xl bg-slate-900/95 border transition-all duration-300 shadow-xl ${
                wrongFlash
                  ? 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-500'
                  : 'border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-gold-300 border border-slate-700 font-mono">
                  {challenge.nodeId}
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-800 uppercase font-semibold">
                  NEP 2020: {challenge.competencyLevel}
                </span>
              </div>

              <h3 className="text-base md:text-lg font-bold text-white leading-relaxed">
                {challenge.question}
              </h3>

              {/* 1. MCQ OPTIONS */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="grid grid-cols-1 gap-2.5 mt-5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={
                        wrongOptionIndex === i || (wrongShake && i === challenge.correctIndex)
                          ? { x: [0, -10, 10, -10, 10, 0] }
                          : { x: 0 }
                      }
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border flex items-start gap-2.5 ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                          : wrongOptionIndex === i
                          ? 'bg-rose-950/50 border-rose-600 text-rose-200'
                          : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-gold-500/50'
                      }`}
                    >
                      <span className="font-bold text-gold-400 shrink-0">
                        {showExplanation && i === challenge.correctIndex ? '✓ ' : ''}
                        {wrongOptionIndex === i ? '✗ ' : ''}
                        {String.fromCharCode(65 + i)}.
                      </span>
                      <span>{opt}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* 2. DRAG LABEL TYPE */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="mt-5 space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 w-full mb-1">Drag items to correct boxes:</span>
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        role="button"
                        aria-label={`Draggable item: ${item.label}`}
                        tabIndex={0}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3.5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-lg text-xs font-bold cursor-grab shadow-sm"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'cov_box', title: 'Covariance Formula' },
                      { id: 'sigmax_box', title: 'Std Dev σ_x' },
                      { id: 'r_box', title: 'Pearson Correlation' },
                      { id: 'r2_box', title: 'Coeff of Determination' },
                    ].map((target) => (
                      <div
                        key={target.id}
                        role="region"
                        aria-label={`Drop target for ${target.title}`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(target.id)}
                        className="p-3 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 hover:border-gold-500 min-h-[75px] flex flex-col justify-center items-center text-center"
                      >
                        <span className="text-[10px] text-slate-500">{target.title}</span>
                        <span className="text-xs font-bold text-emerald-400 mt-1">
                          {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : '[Drop Here]'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    aria-label="Verify all mappings"
                    className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                  >
                    Verify All Mappings →
                  </motion.button>
                </div>
              )}

              {/* 3. DRAG SORT TYPE */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="mt-5 space-y-3">
                  <div className="space-y-2">
                    {(sortArrangement.length === challenge.sortItems.length
                      ? sortArrangement.map((idx) => challenge.sortItems![idx])
                      : challenge.sortItems
                    ).map((item, displayIndex) => (
                      <motion.div
                        key={displayIndex}
                        role="button"
                        aria-label={`Step ${displayIndex + 1}: ${item}`}
                        tabIndex={0}
                        draggable
                        onDragStart={() => setDraggedItem(String(displayIndex))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const fromIdx = parseInt(draggedItem || '0');
                          handleSortMove(fromIdx, displayIndex);
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                      >
                        <span className="font-bold text-gold-400 px-2 py-0.5 bg-slate-900 rounded font-mono">
                          {displayIndex + 1}
                        </span>
                        {item}
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortSubmit}
                    aria-label="Check sequence order"
                    className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                  >
                    Check Sequence Order →
                  </motion.button>
                </div>
              )}

              {/* 4. NUMERIC INPUT TYPE */}
              {challenge.type === 'numeric' && (
                <div className="mt-5 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="number"
                      step="any"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter calculated value"
                      aria-label={`Enter numerical value in ${challenge.unit || 'units'}`}
                      className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-gold-500"
                    />
                    <span className="text-xs text-slate-400 font-semibold">{challenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      aria-label="Submit numeric answer"
                      className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-md"
                    >
                      Submit Answer →
                    </motion.button>
                  </div>
                </div>
              )}

              {/* 5. CONSTRUCT TYPE */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="mt-5 space-y-3">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        aria-label={`Add token ${part}`}
                        className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-mono font-bold"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[50px] flex items-center justify-between">
                    <span className="font-mono text-sm text-emerald-300 font-bold">
                      {constructParts.join(' ') || '[Click parts above to assemble]'}
                    </span>
                    {constructParts.length > 0 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts([])}
                        aria-label="Clear assembled tokens"
                        className="text-xs text-rose-400 hover:text-rose-300 ml-2"
                      >
                        Clear
                      </motion.button>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={constructParts.length === 0}
                    aria-label="Validate logical construction"
                    className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                  >
                    Validate Logical Construction →
                  </motion.button>
                </div>
              )}

              {/* PROGRESSIVE CLICK-TO-REVEAL EXPLANATION */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 md:p-5 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/80 space-y-3"
                >
                  <h4 className="text-xs font-bold text-gold-300 uppercase tracking-wider">
                    📖 Step-by-Step Mathematical Explanation:
                  </h4>

                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-slate-200 leading-relaxed"
                      >
                        <span className="font-bold text-gold-400">{i + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}

                  <div className="pt-2 flex items-center justify-between">
                    {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setRevealedSteps(s => s + 1)}
                        aria-label="Show next derivation step"
                        className="px-4 py-2 bg-gold-700 hover:bg-gold-600 text-white rounded-xl text-xs font-bold"
                      >
                        Show Next Derivation Step →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Portfolio Score' : 'Next Challenge'}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30 ml-auto"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Portfolio Score →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD SYNTHESIS ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* MOTIVATIONAL FEEDBACK BANNER */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl text-center font-black text-sm tracking-wide border shadow-lg ${
                errors === 0
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                  : errors <= 3
                  ? 'bg-gold-950/80 border-gold-500 text-gold-200'
                  : errors <= 7
                  ? 'bg-amber-950/80 border-amber-500 text-amber-200'
                  : 'bg-rose-950/80 border-rose-500 text-rose-200'
              }`}
            >
              {errors === 0 && '🌟 PERFECT SCORE! Flawless analytical mastery across all domains.'}
              {errors >= 1 && errors <= 3 && '👏 Great work! Solid grasp of correlation, probability, and financial mechanics.'}
              {errors >= 4 && errors <= 7 && '💪 Good effort! Review the tricky misconception items to tighten your precision.'}
              {errors >= 8 && '🔥 Do not give up — You WILL get this! Consistent practice creates mastery.'}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 md:p-8 bg-gradient-to-br from-emerald-950/70 via-slate-900 to-gold-950/70 rounded-3xl border border-emerald-800/60 shadow-2xl text-center space-y-3"
            >
              <span className="text-4xl">🏆</span>
              <h2 className="text-2xl md:text-3xl font-black text-white">Quantitative Analytics Mastery Achieved!</h2>
              <p className="text-sm text-slate-300 max-w-2xl mx-auto">
                You have completed the ISC Class 11 Applied Mathematics interactive simulation with full mastery across all 10 syllabus nodes.
              </p>

              <div className="flex justify-center gap-6 pt-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="px-5 py-3 bg-slate-900/90 rounded-2xl border border-slate-800"
                >
                  <div className="text-xs text-slate-400">Final Score</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    {Math.max(0, 100 - errors * 5)}%
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="px-5 py-3 bg-slate-900/90 rounded-2xl border border-slate-800"
                >
                  <div className="text-xs text-slate-400">BKT Mastery Status</div>
                  <div className="text-2xl font-black text-gold-400 font-mono">
                    {masteryLevel.toUpperCase()}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* SPACED REPETITION SCHEDULE VISIBILITY */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-gold-950/40 rounded-2xl border border-amber-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📅</span>
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Spaced Repetition Schedule (SM-2 SRS Algorithm)
                  </h4>
                </div>
                <p className="text-sm text-slate-200">
                  Recommended review cadence based on your error count ({errors} error{errors !== 1 ? 's' : ''}):
                </p>
                <p className="text-xs text-slate-400">
                  Target next review date:{' '}
                  <strong className="text-amber-300">
                    {new Date(Date.now() + (errors === 0 ? 7 : errors <= 3 ? 3 : 1) * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </strong>
                  . Regular spaced retrieval solidifies formula recall and problem-solving intuition.
                </p>
              </div>
              <div className="px-4 py-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-center shrink-0 w-full md:w-auto">
                <div className="text-[10px] uppercase font-bold text-amber-400">Next Review</div>
                <div className="text-lg font-black text-amber-300 font-mono">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </div>
              </div>
            </motion.div>

            {/* REFLECTION SECTION */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-4"
            >
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
                <span>💭</span> Metacognitive Reflection
              </div>
              <h3 className="text-base font-bold text-white">Consolidate Your Learning Insights</h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="ref-q1" className="block text-xs font-semibold text-slate-300 mb-1">
                    1. What was the most surprising thing you learned?
                  </label>
                  <textarea
                    id="ref-q1"
                    rows={2}
                    value={reflectionAnswers.q1}
                    onChange={(e) => setReflectionAnswers(prev => ({ ...prev, q1: e.target.value }))}
                    placeholder="E.g., How contrapositive maintains identical truth rows to the implication, or how AER grows with quarterly compounding..."
                    aria-label="Reflection on the most surprising thing learned"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label htmlFor="ref-q2" className="block text-xs font-semibold text-slate-300 mb-1">
                    2. How would you explain this to a friend?
                  </label>
                  <textarea
                    id="ref-q2"
                    rows={2}
                    value={reflectionAnswers.q2}
                    onChange={(e) => setReflectionAnswers(prev => ({ ...prev, q2: e.target.value }))}
                    placeholder="E.g., Explain Pearson correlation vs regression slopes using real-life examples like height and shoe size..."
                    aria-label="Reflection on explaining the concept to a friend"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label htmlFor="ref-q3" className="block text-xs font-semibold text-slate-300 mb-1">
                    3. Where in real life might you use this?
                  </label>
                  <textarea
                    id="ref-q3"
                    rows={2}
                    value={reflectionAnswers.q3}
                    onChange={(e) => setReflectionAnswers(prev => ({ ...prev, q3: e.target.value }))}
                    placeholder="E.g., Calculating real bond returns after inflation on Dalal Street or predicting crop yield from rainfall..."
                    aria-label="Reflection on real-life applications"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>
            </motion.div>

            {/* MISCONCEPTION PROFILE REVIEW */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-rose-950/40 rounded-2xl border border-rose-900/60 space-y-3"
              >
                <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                  <span>🔍</span> Diagnostic Misconception Review (Targeted Feedback):
                </h3>
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1"
                    >
                      <p className="text-rose-300 font-bold">✗ Trap: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Correct Rule: {m.correction}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* REAL-WORLD PROJECT COMPLETION */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex items-center gap-2 text-gold-400 font-bold text-xs uppercase tracking-wider">
                <span>💼</span> Capstone Applied Math Project
              </div>
              <h3 className="text-base md:text-lg font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <ol className="space-y-1.5 pt-1 text-xs text-slate-400 list-decimal list-inside font-sans">
                {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ol>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C11_AppliedMathsCorrelationCovarianceKarlSim;
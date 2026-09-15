'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// --- NODE CONSTANTS ---
const NODE_069 = 'c11_maths_cbse_069'; // Intro to Infinite Series and Sigma Notation
const NODE_070 = 'c11_maths_cbse_070'; // Generalized Binomial Theorem for Arbitrary Real Index
const NODE_071 = 'c11_maths_cbse_071'; // Convergence Condition for Generalized Binomial Series
const NODE_072 = 'c11_maths_cbse_072'; // Sum to Infinity of a Geometric Progression
const NODE_073 = 'c11_maths_cbse_073'; // Binomial Expansion of (a+b)^m for Any Real Index
const NODE_074 = 'c11_maths_cbse_074'; // Special Cases of Binomial Series for Negative/Fractional Exponents
const NODE_075 = 'c11_maths_cbse_075'; // Numerical Problem Solving Using Binomial Series Expansion
const NODE_076 = 'c11_maths_cbse_076'; // The Number e as an Infinite Series and Bounding Its Value
const NODE_077 = 'c11_maths_cbse_077'; // Exponential Series for e^x
const NODE_078 = 'c11_maths_cbse_078'; // Finding Coefficients in Exponential Series Expansions
const NODE_079 = 'c11_maths_cbse_079'; // Numerical Estimation Using Exponential Series
const NODE_080 = 'c11_maths_cbse_080'; // Logarithmic Series for log_e(1+x)
const NODE_081 = 'c11_maths_cbse_081'; // Applying Logarithmic Series to Prove Series Identities Using Quadratic Roots

const ALL_NODE_IDS = [
  NODE_069, NODE_070, NODE_071, NODE_072, NODE_073, NODE_074,
  NODE_075, NODE_076, NODE_077, NODE_078, NODE_079, NODE_080, NODE_081
];

// --- MANDATORY CONTENT SECTIONS ---

const SCENARIO = {
  title: 'Infinite Series & Mathematical Analysis Laboratory',
  intro: 'Welcome to the Advanced Mathematical Analysis Lab. In higher mathematics, financial modeling, and quantum physics, infinite series allow us to evaluate transcendental functions like e^x and ln(1+x), approximate complex radicals, and model continuous processes.',
  context: 'Here you will dynamically test convergence boundaries, compute infinite sums of geometric progressions, expand binomial expressions with negative and fractional exponents, bound Euler\'s number e, and solve root-identity problems using logarithmic expansions.'
};

const DISCOVERY_QUESTION = {
  question: 'What happens to the infinite binomial series expansion of (1 + x)^(-1) = 1 - x + x^2 - x^3 + ... when x = 1.5?',
  options: [
    'It converges smoothly to 1 / (1 + 1.5) = 0.4',
    'It oscillates between +1.5 and -1.5, averaging 0',
    'It diverges completely because the condition |x| < 1 is violated, rendering the infinite expansion invalid',
    'It equals infinity because all negative terms cancel out'
  ],
  correctIndex: 2,
  hintAfter: 'For non-integer or negative exponent m, the generalized binomial expansion produces an infinite number of terms. The series strictly converges IF AND ONLY IF |x| < 1.'
};

const DEFAULT_PROPS = {
  initialNodeId: NODE_069,
  onComplete: (score: number) => { console.log('Simulation completed with score:', score); }
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Geometric Progression & Infinity',
    instruction: 'Adjust the first term "a" and common ratio "r" (-1 < r < 1). Observe how the partial sum S_n approaches the limit S_inf = a / (1 - r).',
    interactionType: 'gp-lab',
    nodeId: NODE_072
  },
  {
    title: 'Lab 2: Generalized Binomial Expansion',
    instruction: 'Set index "m" (e.g., -1, -2, 1/2, -1/2) and "x". Toggle the number of partial sum terms N to see how (1+x)^m is approximated inside the convergence interval |x| < 1.',
    interactionType: 'binomial-lab',
    nodeId: NODE_070
  },
  {
    title: 'Lab 3: Euler\'s Constant e & Exponential Series',
    instruction: 'Increase the number of terms N in e = 1 + 1/1! + 1/2! + 1/3! + ... Observe how rapidly the series bounds e between 2.718 and 2.719.',
    interactionType: 'exponential-lab',
    nodeId: NODE_076
  },
  {
    title: 'Lab 4: Logarithmic Series & Interval of Validity',
    instruction: 'Compare ln(1+x) = x - x^2/2 + x^3/3 - x^4/4 + ... for x in (-1, 1]. Notice how convergence fails outside |x| <= 1.',
    interactionType: 'logarithmic-lab',
    nodeId: NODE_080
  },
  {
    title: 'Lab 5: Quadratic Roots & Log Series Identities',
    instruction: 'Explore how roots alpha and beta of ax^2 + bx + c = 0 transform logarithmic series into algebraic proofs for series sums.',
    interactionType: 'quadratic-log-lab',
    nodeId: NODE_081
  }
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you expand (1 - x)^(-2) using the infinite binomial theorem for |x| < 1, what is the coefficient of x^n?',
    options: ['n', 'n + 1', 'n - 1', '2^n'],
    correctIndex: 1,
    verifyInstruction: 'In Lab 2, select index m = -2 and negative x sign to inspect coefficients 1, 2, 3, 4... (n+1).',
    nodeId: NODE_074
  },
  {
    question: 'Predict: What is the sum of the infinite logarithmic series: 1/1 - 1/2 + 1/3 - 1/4 + 1/5 - ... ?',
    options: ['log_e(2)', 'e - 1', 'log_e(10)', 'pi / 4'],
    correctIndex: 0,
    verifyInstruction: 'In Lab 4, set x = 1 in the expansion for log_e(1+x).',
    nodeId: NODE_080
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the speed of convergence for the Exponential Series e^x compared to the Logarithmic Series ln(1+x)?',
    observableOptions: [
      'e^x converges much faster because of factorial denominators n! in contrast to polynomial denominators n in ln(1+x)',
      'ln(1+x) converges faster because signs alternate',
      'Both converge at identical geometric rates for all values of x',
      'e^x diverges for x > 1 while ln(1+x) converges for all x'
    ],
    correctIndex: 0,
    nodeId: NODE_077
  },
  {
    question: 'What happens to the infinite geometric series sum S_inf when the common ratio r satisfies |r| >= 1?',
    observableOptions: [
      'The sum approaches 0',
      'The series diverges and S_inf does not exist as a finite real number',
      'The sum equals a / (1 + r)',
      'The sum oscillates between a and -a smoothly'
    ],
    correctIndex: 1,
    nodeId: NODE_072
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Financial Compound Interest & Compound Growth Limits',
  description: 'In quantitative finance, continuous compounding of interest at rate r uses the exponential series limit e^r = lim(1 + r/n)^n. Actuaries and risk analysts use binomial expansions and logarithmic series to estimate bond yield curves and options pricing without computing massive power operations.',
  steps: [
    'Step 1: Given interest rate r = 5% (0.05), write continuous multiplier as e^0.05.',
    'Step 2: Use exponential series expansion: e^0.05 ≈ 1 + 0.05 + (0.05)^2/2! + (0.05)^3/3!.',
    'Step 3: Calculate terms: 1 + 0.05 + 0.00125 + 0.0000208 = 1.0512708.',
    'Step 4: Conclude that $1,000,000 grows to $1,051,270.80 continuously compounded in 1 year, accurate to 6 decimal places with only 4 terms!'
  ]
};

const MISCONCEPTIONS = [
  {
    id: 'misc_01',
    title: 'Binomial Theorem Works for Any x for Non-Integer Exponents',
    misconception: 'Believing that (1+x)^m = 1 + mx + m(m-1)/2! x^2 + ... is valid for any real x.',
    correction: 'When exponent m is negative or fractional, the series is INFINITE and only converges when |x| < 1. If |x| >= 1, the series diverges.',
    nodeId: NODE_071
  },
  {
    id: 'misc_02',
    title: 'Formula for Infinite GP Works for Any Common Ratio',
    misconception: 'Applying S_inf = a / (1 - r) even when r = 2 or r = -1.5.',
    correction: 'S_inf = a / (1 - r) is strictly derived for |r| < 1. If |r| >= 1, partial sums grow infinitely or oscillate infinitely.',
    nodeId: NODE_072
  },
  {
    id: 'misc_03',
    title: 'Logarithmic Series is Valid for All Positive x',
    misconception: 'Assuming log_e(1+x) = x - x^2/2 + x^3/3 - ... holds for x = 5.',
    correction: 'The logarithmic expansion log_e(1+x) converges ONLY for -1 < x <= 1. For x = 5, one must transform the argument to log_e(1 + x) via alternate identities.',
    nodeId: NODE_080
  },
  {
    id: 'misc_04',
    title: 'Confusing 1/n! with 1/n in Exponential vs Logarithmic Series',
    misconception: 'Mixing up denominator growth in e^x and log_e(1+x).',
    correction: 'e^x has factorial denominators (n!), causing extremely rapid convergence for all x. log(1+x) has simple linear denominators (n), converging much slower and only within |x| <= 1.',
    nodeId: NODE_077
  },
  {
    id: 'misc_05',
    title: 'Thinking e is a Rational Fractional Limit',
    misconception: 'Believing e can be expressed exactly as a ratio of two integers p/q.',
    correction: 'Euler\'s number e is irrational (e ≈ 2.718281828459...). Its infinite series sum 1 + 1/1! + 1/2! + ... never terminates or repeats.',
    nodeId: NODE_076
  },
  {
    id: 'misc_06',
    title: 'Expanding (a+b)^m without Factoring Out a',
    misconception: 'Trying to expand (a+b)^m directly as a^m + m*b + ... without checking |b/a| < 1.',
    correction: 'For (a+b)^m with real index m, one must write a^m * (1 + b/a)^m, requiring |b/a| < 1 for convergence.',
    nodeId: NODE_073
  }
];

// --- INTERFACE TYPES ---

interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'numeric' | 'drag-sort' | 'classify';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  itemsToSort?: string[];
  correctSortedOrder?: string[];
  categories?: string[];
  itemsToClassify?: { item: string; category: string }[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// --- 22+ CHALLENGES (Foundation 7, Standard 8, Advanced 7) ---

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (7) ---
  {
    id: 'c01',
    nodeId: NODE_069,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Symbol Recognition',
    question: 'What does the sigma notation ∑_{k=1}^{n} a_k represent?',
    options: [
      'The product of terms a_1 × a_2 × ... × a_n',
      'The sum of terms a_1 + a_2 + ... + a_n',
      'The arithmetic mean of terms a_1 to a_n',
      'The nth term of the sequence a_n'
    ],
    correctIndex: 1,
    explanation: 'The capital Greek letter Sigma (∑) represents summation of indexed terms from initial index k=1 up to upper limit n.',
    hints: [
      'Sigma stands for Sum.',
      'It adds all terms from k=1 to n.',
      'The notation ∑_{k=1}^n a_k = a_1 + a_2 + ... + a_n.'
    ]
  },
  {
    id: 'c02',
    nodeId: NODE_072,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'Formula Application',
    question: 'Find the sum to infinity of the geometric progression: 8, 4, 2, 1, 1/2, ...',
    correctAnswer: 16,
    tolerance: 0.01,
    explanation: 'First term a = 8, common ratio r = 4/8 = 0.5. Since |r| < 1, S_inf = a / (1 - r) = 8 / (1 - 0.5) = 8 / 0.5 = 16.',
    hints: [
      'Identify first term a and ratio r.',
      'a = 8, r = 1/2 = 0.5.',
      'S_inf = 8 / (1 - 0.5) = 16.'
    ]
  },
  {
    id: 'c03',
    nodeId: NODE_071,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Conceptual Understanding',
    question: 'For the generalized binomial series expansion (1 + x)^m where m is non-integer, what is the mandatory condition for convergence?',
    options: [
      'x > 1',
      '|x| < 1',
      'x = 0 only',
      'm must be positive'
    ],
    correctIndex: 1,
    explanation: 'For arbitrary real index m (negative or fractional), the binomial expansion generates an infinite series which converges if and only if |x| < 1.',
    hints: [
      'Check the absolute value of x.',
      'The absolute value must be strictly less than 1.',
      'Condition is |x| < 1.'
    ]
  },
  {
    id: 'c04',
    nodeId: NODE_074,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Special Case Expansion',
    question: 'Which of the following represents the expansion of (1 - x)^(-1) for |x| < 1?',
    options: [
      '1 - x + x^2 - x^3 + ...',
      '1 + x + x^2 + x^3 + ...',
      '1 - 2x + 3x^2 - 4x^3 + ...',
      '1 + 2x + 3x^2 + 4x^3 + ...'
    ],
    correctIndex: 1,
    explanation: '(1 - x)^(-1) = 1 + (-1)(-x) + [(-1)(-2)/2!](-x)^2 + ... = 1 + x + x^2 + x^3 + ... (an infinite GP with common ratio x).',
    hints: [
      'Both the exponent (-1) and term (-x) are negative.',
      'Negatives cancel out to yield all positive signs.',
      '(1-x)^(-1) = 1 + x + x^2 + x^3 + ...'
    ]
  },
  {
    id: 'c05',
    nodeId: NODE_076,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Bounds',
    question: 'Euler\'s number e is defined as the infinite series 1 + 1/1! + 1/2! + 1/3! + ... Which integer range bounds e?',
    options: [
      '1 < e < 2',
      '2 < e < 3',
      '3 < e < 4',
      '0 < e < 1'
    ],
    correctIndex: 1,
    explanation: 'Since 1 + 1 = 2, and 1/2! + 1/3! + ... = 0.71828..., e lies strictly between 2 and 3 (2 < e < 3).',
    hints: [
      'Calculate the first 3 terms: 1 + 1 + 0.5 = 2.5.',
      'The remaining terms sum to less than 0.5.',
      'Thus, 2 < e < 3.'
    ]
  },
  {
    id: 'c06',
    nodeId: NODE_077,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Formula Recognition',
    question: 'What is the infinite series expansion for e^x?',
    options: [
      '∑_{n=0}^{\infty} \frac{x^n}{n!}',
      '∑_{n=1}^{\infty} \frac{x^n}{n}',
      '∑_{n=0}^{\infty} (-1)^n \frac{x^n}{n!}',
      '∑_{n=1}^{\infty} \frac{(-1)^{n-1} x^n}{n}'
    ],
    correctIndex: 0,
    explanation: 'e^x = 1 + x + x^2/2! + x^3/3! + ... = ∑_{n=0}^{\infty} (x^n / n!).',
    hints: [
      'Denominator has factorials n!.',
      'All signs are positive for e^x.',
      'Starts at n=0 with 1.'
    ]
  },
  {
    id: 'c07',
    nodeId: NODE_080,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Formula Recognition',
    question: 'What is the expansion of log_e(1 + x) for -1 < x ≤ 1?',
    options: [
      'x + x^2/2 + x^3/3 + x^4/4 + ...',
      'x - x^2/2 + x^3/3 - x^4/4 + ...',
      '1 + x + x^2/2! + x^3/3! + ...',
      'x - x^3/3 + x^5/5 - x^7/7 + ...'
    ],
    correctIndex: 1,
    explanation: 'log_e(1+x) = x - x^2/2 + x^3/3 - x^4/4 + ... Notice simple linear denominators (n) and alternating signs.',
    hints: [
      'Denominators are n (not n!).',
      'Signs alternate: +, -, +, -, ...',
      'First term is x.'
    ]
  },

  // --- STANDARD (8) ---
  {
    id: 'c08',
    nodeId: NODE_072,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Problem Solving',
    question: 'If the sum to infinity of a geometric progression is 25 and its first term is 15, calculate the common ratio r.',
    correctAnswer: 0.4,
    tolerance: 0.01,
    explanation: 'S_inf = a / (1 - r) => 25 = 15 / (1 - r) => 1 - r = 15/25 = 0.6 => r = 1 - 0.6 = 0.4.',
    hints: [
      'Use S_inf = a / (1 - r).',
      '25 = 15 / (1 - r).',
      '1 - r = 15/25 = 3/5 = 0.6 => r = 0.4.'
    ]
  },
  {
    id: 'c09',
    nodeId: NODE_074,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Coefficients in Binomial Series',
    question: 'Find the coefficient of x^3 in the expansion of (1 - 2x)^(-1/2) for |2x| < 1.',
    correctAnswer: 1.25,
    tolerance: 0.01,
    explanation: 'T_{r+1} = [m(m-1)...(m-r+1)/r!] (-2x)^r. For r=3, m=-1/2: Term = [(-1/2)(-3/2)(-5/2) / 6] * (-8x^3) = (-15/48) * (-8 x^3) = 120/48 x^3 = 2.5/2 x^3 = 1.25 x^3.',
    hints: [
      'Use general term T_{r+1} formula.',
      'r = 3, m = -1/2, term = (-1/2)(-3/2)(-5/2)/6 * (-2)^3.',
      '(-15/48) * (-8) = 120/48 = 5/4 = 1.25.'
    ]
  },
  {
    id: 'c10',
    nodeId: NODE_073,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Manipulation of Expression',
    question: 'To expand (4 + 3x)^(1/2) using the generalized binomial series, how should it be rewritten?',
    options: [
      '4^(1/2) [ 1 + (3/4)x ]^(1/2) = 2 [ 1 + (3/4)x ]^(1/2) valid for |x| < 4/3',
      '3x^(1/2) [ 1 + 4/(3x) ]^(1/2) valid for |x| > 4/3',
      '4 [ 1 + 3x ]^(1/2) valid for |x| < 1/3',
      '[ 4^(1/2) + (3x)^(1/2) ]'
    ],
    correctIndex: 0,
    explanation: 'Factor out 4: (4 + 3x)^(1/2) = 4^(1/2) (1 + 3x/4)^(1/2) = 2 (1 + 3/4 x)^(1/2). Convergence requires |3x/4| < 1 => |x| < 4/3.',
    hints: [
      'Factor out the constant term 4 to make the first term 1.',
      '4^(1/2) = 2.',
      'Condition: |3x/4| < 1 => |x| < 4/3.'
    ]
  },
  {
    id: 'c11',
    nodeId: NODE_075,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Numerical Estimation',
    question: 'Use the first 3 terms of the binomial expansion for √(100 + 1) = 10(1 + 1/100)^(1/2) to approximate √101 to 4 decimal places.',
    correctAnswer: 10.0499,
    tolerance: 0.0002,
    explanation: '10 [ 1 + (1/2)(0.01) + (1/2)(-1/2)/2! (0.01)^2 ] = 10 [ 1 + 0.005 - 0.0000125 ] = 10 [ 1.0049875 ] = 10.049875 ≈ 10.0499.',
    hints: [
      '√101 = 10 (1 + 0.01)^(1/2).',
      'Expansion = 10 * (1 + 0.005 - 0.0000125).',
      '10 * 1.0049875 = 10.049875.'
    ]
  },
  {
    id: 'c12',
    nodeId: NODE_078,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Coefficient Extraction',
    question: 'Find the coefficient of x^2 in the expansion of e^(3x + 2).',
    correctAnswer: 33.25,
    tolerance: 0.1,
    explanation: 'e^(3x+2) = e^2 * e^(3x) = e^2 * [ 1 + 3x + (3x)^2/2! + ... ]. Coefficient of x^2 is e^2 * (9/2) = 7.389056 * 4.5 ≈ 33.25.',
    hints: [
      'Split e^(3x+2) = e^2 * e^(3x).',
      'Expand e^(3x) = 1 + 3x + 9x^2/2! + ...',
      'Multiply (9/2) by e^2 (≈ 7.389).'
    ]
  },
  {
    id: 'c13',
    nodeId: NODE_079,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Exponential Estimation',
    question: 'Using the approximation e^x ≈ 1 + x + x^2/2 + x^3/6, estimate e^(0.2) to 4 decimal places.',
    correctAnswer: 1.2213,
    tolerance: 0.001,
    explanation: '1 + 0.2 + (0.04)/2 + (0.008)/6 = 1 + 0.2 + 0.02 + 0.001333... = 1.221333... ≈ 1.2213.',
    hints: [
      'x = 0.2.',
      'Terms: 1 + 0.2 + 0.02 + 0.001333.',
      'Sum = 1.221333.'
    ]
  },
  {
    id: 'c14',
    nodeId: NODE_080,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Logarithmic Identity',
    question: 'What is log_e(1 - x) expanded for -1 ≤ x < 1?',
    options: [
      '- (x + x^2/2 + x^3/3 + x^4/4 + ...)',
      'x - x^2/2 + x^3/3 - x^4/4 + ...',
      '-x + x^2/2 - x^3/3 + x^4/4 - ...',
      '1 - x + x^2 - x^3 + ...'
    ],
    correctIndex: 0,
    explanation: 'Replace x with -x in log(1+x): log(1-x) = (-x) - (-x)^2/2 + (-x)^3/3 - (-x)^4/4 = - (x + x^2/2 + x^3/3 + ...). All terms become negative.',
    hints: [
      'Substitute -x into log_e(1+x).',
      'Every term becomes negative.',
      'Factor out -1: - (x + x^2/2 + x^3/3 + ...).'
    ]
  },
  {
    id: 'c15',
    nodeId: NODE_081,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Logarithmic Expansion Identity',
    question: 'What is log_e( (1+x)/(1-x) ) expressed as a series for |x| < 1?',
    options: [
      '2 [ x + x^3/3 + x^5/5 + x^7/7 + ... ]',
      '2 [ x^2/2 + x^4/4 + x^6/6 + ... ]',
      'x + x^2/2 + x^3/3 + ...',
      '2 [ x - x^3/3 + x^5/5 - ... ]'
    ],
    correctIndex: 0,
    explanation: 'log((1+x)/(1-x)) = log(1+x) - log(1-x) = (x - x^2/2 + x^3/3 - ...) - (-x - x^2/2 - x^3/3 - ...) = 2(x + x^3/3 + x^5/5 + ...). Even power terms cancel out!',
    hints: [
      'log( (1+x)/(1-x) ) = log(1+x) - log(1-x).',
      'Subtracting the two series cancels out even powers of x.',
      'Result is 2 times odd power terms.'
    ]
  },

  // --- ADVANCED (7) ---
  {
    id: 'c16',
    nodeId: NODE_074,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Advanced Series Summation',
    question: 'Find the sum of the infinite series: 1 + 2/3 + 3/9 + 4/27 + 5/81 + ...',
    correctAnswer: 2.25,
    tolerance: 0.01,
    explanation: 'This is an Arithmetico-Geometric Series (AGP) or (1 - 1/3)^(-2) = (2/3)^(-2) = (3/2)^2 = 9/4 = 2.25. (1-x)^(-2) = 1 + 2x + 3x^2 + 4x^3 + ... with x = 1/3.',
    hints: [
      'Recognize the binomial form (1 - x)^(-2) = 1 + 2x + 3x^2 + 4x^3 + ...',
      'Here x = 1/3.',
      'Sum = (1 - 1/3)^(-2) = (2/3)^(-2) = 9/4 = 2.25.'
    ]
  },
  {
    id: 'c17',
    nodeId: NODE_077,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Exponential Series Identity Sum',
    question: 'Calculate the value of the infinite sum: S = 1/2! + 2/3! + 3/4! + 4/5! + ...',
    correctAnswer: 1,
    tolerance: 0.01,
    explanation: 'nth term T_n = n / (n+1)! = [(n+1) - 1] / (n+1)! = 1/n! - 1/(n+1)!. Telescoping sum: S = (1/1! - 1/2!) + (1/2! - 1/3!) + (1/3! - 1/4!) + ... = 1/1! = 1.',
    hints: [
      'Rewrite numerator n as (n+1) - 1.',
      'Split T_n = 1/n! - 1/(n+1)!.',
      'Telescoping sum cancels all middle terms, leaving 1/1! = 1.'
    ]
  },
  {
    id: 'c18',
    nodeId: NODE_078,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Advanced Coefficients',
    question: 'Find the sum of the infinite series: S = 1 + (1+2)/2! + (1+2+3)/3! + (1+2+3+4)/4! + ...',
    correctAnswer: 4.077,
    tolerance: 0.05,
    explanation: 'nth term T_n = [n(n+1)/2] / n! = (n+1)/(2(n-1)!). For n=1: 1/2. For n >= 2: (n-1+2)/(2(n-1)!) = 1/(2(n-2)!) + 1/(2(n-1)!). Summing over n yields (3/2)e ≈ 4.077.',
    hints: [
      'Sum of first n integers is n(n+1)/2.',
      'T_n = n(n+1) / (2 * n!) = (n+1) / (2(n-1)!).',
      'Sum evaluate to (3/2)e ≈ 1.5 * 2.71828 = 4.0774.'
    ]
  },
  {
    id: 'c19',
    nodeId: NODE_081,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Quadratic Roots & Log Identities',
    question: 'If α and β are the roots of equation x^2 - p x + q = 0, what is log_e(1 + p x + q x^2) equal to in terms of α and β?',
    options: [
      'log_e(1 + α x) + log_e(1 + β x)',
      'log_e(1 - α x) + log_e(1 - β x)',
      'log_e(1 + α x) - log_e(1 + β x)',
      'log_e(1 - (α+β) x)'
    ],
    correctIndex: 0,
    explanation: 'Since x^2 - px + q = (x - α)(x - β), substituting 1/x gives 1 - px + qx^2 = (1 - α x)(1 - β x). For 1 + px + qx^2 with sign adjustments: 1 + px + qx^2 = (1 + α x)(1 + β x). Thus log(1 + px + qx^2) = log(1 + α x) + log(1 + β x).',
    hints: [
      'Factor quadratic in terms of roots α and β.',
      '1 + px + qx^2 = (1 + α x)(1 + β x).',
      'Logarithm of product is sum of logarithms.'
    ]
  },
  {
    id: 'c20',
    nodeId: NODE_075,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Higher-Order Binomial Approximation',
    question: 'Evaluate the limit L = lim_{x->0} [ (1 + x)^(1/x) - e ] / x.',
    correctAnswer: -1.359,
    tolerance: 0.05,
    explanation: '(1+x)^(1/x) = exp( ln(1+x)/x ) = exp( (x - x^2/2 + x^3/3...)/x ) = exp( 1 - x/2 + x^2/3... ) = e * e^(-x/2 + ...) ≈ e(1 - x/2 + ...). Thus [(1+x)^(1/x) - e]/x -> -e/2 ≈ -2.71828/2 = -1.35914.',
    hints: [
      'Use exponential form e^(ln(1+x)/x).',
      'Expand ln(1+x)/x = 1 - x/2 + x^2/3...',
      'Limit equals -e / 2 ≈ -1.359.'
    ]
  },
  {
    id: 'c21',
    nodeId: NODE_080,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Logarithmic Series Sum',
    question: 'Find the exact value of 1/(1·2) + 1/(3·4) + 1/(5·6) + 1/(7·8) + ...',
    correctAnswer: 0.693,
    tolerance: 0.01,
    explanation: '1/[(2k-1)(2k)] = 1/(2k-1) - 1/(2k). So the series is 1 - 1/2 + 1/3 - 1/4 + 1/5 - 1/6 + ... which is log_e(1+1) = log_e(2) ≈ 0.69315.',
    hints: [
      'Split partial fractions: 1/( (2k-1)(2k) ) = 1/(2k-1) - 1/(2k).',
      'Series becomes 1 - 1/2 + 1/3 - 1/4 + 1/5 - 1/6 + ...',
      'This is log_e(2) ≈ 0.69315.'
    ]
  },
  {
    id: 'c22',
    nodeId: NODE_071,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'Convergence Order Analysis',
    question: 'Sort these infinite series expansions by their speed of convergence for x = 0.5 (fastest to slowest):',
    itemsToSort: [
      'Exponential Series e^(0.5)',
      'Binomial Series (1 - 0.5)^(-2)',
      'Logarithmic Series log_e(1 + 0.5)'
    ],
    correctSortedOrder: [
      'Exponential Series e^(0.5)',
      'Binomial Series (1 - 0.5)^(-2)',
      'Logarithmic Series log_e(1 + 0.5)'
    ],
    explanation: 'Exponential series has 1/n! denominator (super-exponential decay). Binomial series has polynomial ratio decay. Logarithmic series has 1/n linear denominator (slowest).',
    hints: [
      'Factorial denominators n! shrink fastest.',
      'Polynomial/power terms come second.',
      'Linear denominators n shrink slowest.'
    ]
  }
];

// --- CUSTOM SVG VISUALIZERS ---

// Visualizer 1: Geometric Series Square Decomposition (Area Visualizer)
const GPSeriesVisualizer: React.FC<{ a: number; r: number; terms: number }> = ({ a, r, terms }) => {
  const sumInf = Math.abs(r) < 1 ? a / (1 - r) : Infinity;

  const partialSums = useMemo(() => {
    const list: number[] = [];
    let current = a;
    let total = 0;
    for (let i = 0; i < terms; i++) {
      total += current;
      list.push(total);
      current *= r;
    }
    return list;
  }, [a, r, terms]);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white flex flex-col items-center">
      <div className="flex justify-between w-full mb-2 text-sm text-cyan-300">
        <span>Geometric Infinite Series Visualizer</span>
        <span>S_inf = {isFinite(sumInf) ? sumInf.toFixed(4) : 'Divergent'}</span>
      </div>
      <svg width="340" height="200" viewBox="0 0 340 200" className="bg-slate-950 rounded-lg shadow-inner">
        {/* Axes */}
        <line x1="30" y1="170" x2="320" y2="170" stroke="#475569" strokeWidth="2" />
        <line x1="30" y1="20" x2="30" y2="170" stroke="#475569" strokeWidth="2" />

        {/* Asymptote for S_inf */}
        {isFinite(sumInf) && (
          <line
            x1="30"
            y1={Math.max(20, 170 - (sumInf / (sumInf * 1.25 || 1)) * 140)}
            x2="320"
            y2={Math.max(20, 170 - (sumInf / (sumInf * 1.25 || 1)) * 140)}
            stroke="#ef4444"
            strokeDasharray="4 4"
            strokeWidth="2"
          />
        )}

        {/* Bars for partial sum */}
        {partialSums.map((val, idx) => {
          const maxScale = isFinite(sumInf) ? sumInf * 1.2 : val * 1.2;
          const barHeight = (val / (maxScale || 1)) * 140;
          const xPos = 40 + idx * (270 / terms);
          const width = Math.max(8, 240 / terms - 6);
          return (
            <g key={idx}>
              <rect
                x={xPos}
                y={170 - barHeight}
                width={width}
                height={barHeight}
                fill={idx === terms - 1 ? '#38bdf8' : '#0284c7'}
                rx="3"
                className="transition-all duration-300"
              />
              <text x={xPos + width / 2} y="185" fill="#94a3b8" fontSize="10" textAnchor="middle">
                S_{idx + 1}
              </text>
              <text x={xPos + width / 2} y={165 - barHeight} fill="#38bdf8" fontSize="9" textAnchor="middle">
                {val.toFixed(2)}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="text-xs text-slate-400 mt-2">
        {Math.abs(r) < 1
          ? `Condition |r| = ${Math.abs(r).toFixed(2)} < 1 satisfied. Sum converges to ${sumInf.toFixed(4)}.`
          : `Condition |r| = ${Math.abs(r).toFixed(2)} >= 1 VIOLATED. Partial sums diverge!`}
      </div>
    </div>
  );
};

// Visualizer 2: Generalized Binomial Theorem Curve Plotter
const BinomialExpansionVisualizer: React.FC<{ m: number; xVal: number; terms: number }> = ({ m, xVal, terms }) => {
  // Calculate exact (1+x)^m vs partial sum
  const exact = Math.pow(1 + xVal, m);
  const isConvergent = Math.abs(xVal) < 1;

  const partialSum = useMemo(() => {
    let total = 1;
    let term = 1;
    for (let k = 1; k < terms; k++) {
      term = term * ((m - k + 1) / k) * xVal;
      total += term;
    }
    return total;
  }, [m, xVal, terms]);

  // Points for curve (-0.95 to 0.95)
  const exactPoints = useMemo(() => {
    const pts: string[] = [];
    for (let x = -0.9; x <= 0.9; x += 0.05) {
      const y = Math.pow(1 + x, m);
      const px = 170 + x * 140;
      const py = 100 - (y - 1) * 35;
      if (py >= 10 && py <= 190) pts.push(`${px},${py}`);
    }
    return pts.join(' ');
  }, [m]);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white flex flex-col items-center">
      <div className="flex justify-between w-full mb-2 text-sm font-mono text-emerald-400">
        <span>(1 + x)^({m}) Expansion</span>
        <span>Exact: {isNaN(exact) ? 'Undefined' : exact.toFixed(4)} | Term S_{terms}: {partialSum.toFixed(4)}</span>
      </div>
      <svg width="340" height="200" viewBox="0 0 340 200" className="bg-slate-950 rounded-lg shadow-inner">
        {/* Convergence Region Highlight |x| < 1 */}
        <rect x="30" y="10" width="280" height="180" fill="#065f46" fillOpacity="0.15" stroke="#10b981" strokeDasharray="3 3" />
        <text x="170" y="25" fill="#10b981" fontSize="10" textAnchor="middle">{'Convergence Interval (-1 < x < 1)'}</text>

        {/* Axes */}
        <line x1="30" y1="100" x2="310" y2="100" stroke="#475569" strokeWidth="1.5" />
        <line x1="170" y1="10" x2="170" y2="190" stroke="#475569" strokeWidth="1.5" />

        {/* Exact Curve */}
        <polyline points={exactPoints} fill="none" stroke="#10b981" strokeWidth="2.5" />

        {/* Current x indicator */}
        <line x1={170 + xVal * 140} y1="10" x2={170 + xVal * 140} y2="190" stroke="#f59e0b" strokeWidth="2" strokeDasharray="2 2" />
        <circle cx={170 + xVal * 140} cy={100 - (partialSum - 1) * 35} r="5" fill="#f59e0b" />
      </svg>
      <div className={`text-xs mt-2 font-semibold ${isConvergent ? 'text-emerald-400' : 'text-red-400'}`}>
        {isConvergent ? `|x| = ${Math.abs(xVal).toFixed(2)} < 1 (Series Converges)` : `|x| = ${Math.abs(xVal).toFixed(2)} >= 1 (DIVERGENT!)`}
      </div>
    </div>
  );
};

// Visualizer 3: Exponential vs Logarithmic Convergence Rate Comparison
const ExpLogSeriesVisualizer: React.FC<{ x: number; terms: number }> = ({ x, terms }) => {
  const expVal = Math.exp(x);
  const logVal = x > -1 ? Math.log(1 + x) : NaN;

  const expPartial = useMemo(() => {
    let sum = 0;
    let term = 1;
    for (let k = 0; k < terms; k++) {
      if (k === 0) term = 1;
      else term = (term * x) / k;
      sum += term;
    }
    return sum;
  }, [x, terms]);

  const logPartial = useMemo(() => {
    let sum = 0;
    for (let k = 1; k <= terms; k++) {
      const term = (Math.pow(-1, k - 1) * Math.pow(x, k)) / k;
      sum += term;
    }
    return sum;
  }, [x, terms]);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white flex flex-col items-center">
      <div className="flex justify-between w-full mb-2 text-xs font-mono text-amber-300">
        <span>e^{x} (Exact: {expVal.toFixed(4)}) ≈ {expPartial.toFixed(4)}</span>
        <span>ln(1+{x}) (Exact: {isNaN(logVal) ? 'N/A' : logVal.toFixed(4)}) ≈ {logPartial.toFixed(4)}</span>
      </div>

      <div className="w-full grid grid-cols-2 gap-2 mt-2">
        <div className="bg-slate-950 p-3 rounded-lg border border-amber-500/30">
          <div className="text-xs text-amber-400 font-bold mb-1">Exponential Series (Factorial Growth)</div>
          <div className="text-xs font-mono text-slate-300">Denominator: n!</div>
          <div className="text-xs text-emerald-400 mt-1">Convergence: Extremely Fast for all x ∈ ℝ</div>
          <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
            <div className="bg-amber-400 h-full" style={{ width: `${Math.min(100, (expPartial / (expVal || 1)) * 100)}%` }}></div>
          </div>
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-cyan-500/30">
          <div className="text-xs text-cyan-400 font-bold mb-1">Logarithmic Series (Linear Growth)</div>
          <div className="text-xs font-mono text-slate-300">Denominator: n</div>
          <div className="text-xs text-amber-400 mt-1">Convergence: Slow, Valid ONLY for -1 &lt; x ≤ 1</div>
          <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
            <div className="bg-cyan-400 h-full" style={{ width: `${Math.min(100, Math.abs((logPartial / (logVal || 1)) * 100))}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

export default function C11_MathsInfiniteSeriesCBSESim({
  initialNodeId = NODE_069,
  onComplete
}: {
  initialNodeId?: string;
  onComplete?: (score: number) => void;
}) {
  // Tabs & Navigation State
  const [activeTab, setActiveTab] = useState<'scenario' | 'discovery' | 'lab' | 'challenges' | 'misconceptions' | 'summary'>('scenario');
  const [currentNodeId, setCurrentNodeId] = useState<string>(initialNodeId);

  // Sound & Speech State
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Interactive Lab State
  const [gpFirstTerm, setGpFirstTerm] = useState<number>(8);
  const [gpRatio, setGpRatio] = useState<number>(0.5);
  const [gpTerms, setGpTerms] = useState<number>(6);

  const [binomialIndex, setBinomialIndex] = useState<number>(-1);
  const [binomialX, setBinomialX] = useState<number>(0.3);
  const [binomialTerms, setBinomialTerms] = useState<number>(5);

  const [expX, setExpX] = useState<number>(1.0);
  const [expTerms, setExpTerms] = useState<number>(5);

  const [logX, setLogX] = useState<number>(0.5);
  const [logTerms, setLogTerms] = useState<number>(5);

  const [quadP, setQuadP] = useState<number>(3);
  const [quadQ, setQuadQ] = useState<number>(2);

  // Questions State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);

  // Challenges State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedMcOption, setSelectedMcOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [sortedItems, setSortedItems] = useState<string[]>([]);
  const [challengeFeedback, setChallengeFeedback] = useState<string | null>(null);
  const [isChallengeCorrect, setIsChallengeCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);

  // SRS & BKT State
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState(id);
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const initial: Record<string, SRSItem> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Timer Ref for Auto-Hint after 10 seconds of inactivity
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    setShowHint(false);
    inactivityTimer.current = setTimeout(() => {
      const currentChallenge = CHALLENGES[currentChallengeIdx];
      if (currentChallenge && activeTab === 'challenges') {
        setCurrentHint(currentChallenge.hints[0]);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000);
  }, [currentChallengeIdx, activeTab]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [resetInactivityTimer]);

  // Handle Drag-Sort initialization
  useEffect(() => {
    const current = CHALLENGES[currentChallengeIdx];
    if (current && current.type === 'drag-sort' && current.itemsToSort) {
      setSortedItems([...current.itemsToSort].sort(() => Math.random() - 0.5));
    }
  }, [currentChallengeIdx]);

  // Play Speech on Tab Navigation
  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    audioManager.play('tap');
    if (tab === 'scenario') speechManager.speak('Welcome to the Infinite Series Laboratory.');
    if (tab === 'discovery') speechManager.speak('Test your intuition on infinite divergence.');
    if (tab === 'lab') speechManager.speak('Interactive Mathematics Exploration Deck.');
    if (tab === 'challenges') speechManager.speak('Solve progressive challenges to master series expansions.');
  };

  // Discovery Question Submit
  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    if (discoverySelected === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak('Correct! The infinite binomial expansion diverges when absolute x is greater than or equal to 1.');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      audioManager.play('error');
      speechManager.speak('Incorrect. Review the convergence condition for infinite binomial series.');
    }
  };

  // Answer Submission Logic for Challenges
  const handleChallengeSubmit = () => {
    const challenge = CHALLENGES[currentChallengeIdx];
    let correct = false;

    if (challenge.type === 'multiple-choice') {
      if (selectedMcOption === challenge.correctIndex) correct = true;
    } else if (challenge.type === 'numeric') {
      const val = parseFloat(numericInput);
      if (!isNaN(val) && challenge.correctAnswer !== undefined) {
        const tol = challenge.tolerance || 0.01;
        if (Math.abs(val - challenge.correctAnswer) <= tol) correct = true;
      }
    } else if (challenge.type === 'drag-sort') {
      if (
        challenge.correctSortedOrder &&
        JSON.stringify(sortedItems) === JSON.stringify(challenge.correctSortedOrder)
      ) {
        correct = true;
      }
    }

    setIsChallengeCorrect(correct);
    const nodeId = challenge.nodeId;

    // Update BKT & SRS
    const updatedBKT = bktUpdate(bktStates[nodeId] || createBKTState(nodeId), correct);
    const updatedSRS = sm2Update(srsItems[nodeId] || createReviewItem(nodeId), correct ? 5 : 1);

    setBktStates(prev => ({ ...prev, [nodeId]: updatedBKT }));
    setSrsItems(prev => ({ ...prev, [nodeId]: updatedSRS }));

    if (correct) {
      audioManager.play('success');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);
      setScore(prev => prev + 10);
      setChallengeFeedback('Outstanding! Correct derivation.');
      recordGameScore(nodeId, 100);
    } else {
      audioManager.play('error');
      setChallengeFeedback(`Incorrect. ${challenge.explanation}`);
      recordGameScore(nodeId, 0);
    }
  };

  const handleNextChallenge = () => {
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx(prev => prev + 1);
      setSelectedMcOption(null);
      setNumericInput('');
      setChallengeFeedback(null);
      setIsChallengeCorrect(null);
      audioManager.play('whoosh');
    } else {
      audioManager.play('celebration');
      setShowSuccess(true);
      setShowConfetti(true);
      speechManager.speak('Congratulations! You have completed all Infinite Series Challenges.');
      if (onComplete) onComplete(score + 10);
    }
  };

  const moveSortedItem = (fromIndex: number, toIndex: number) => {
    const updated = [...sortedItems];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setSortedItems(updated);
    audioManager.play('pickup');
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4 font-sans">
      {/* HEADER BAR */}
      <header className="w-full max-w-6xl flex flex-wrap items-center justify-between p-4 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl backdrop-blur mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-xl shadow-lg">
            ∑
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
              Infinite Series Laboratory
            </h1>
            <p className="text-xs text-slate-400">Class 11 ISC Maths • Chapter: Infinite Series</p>
          </div>
        </div>

        {/* TOP TABS */}
        <nav className="flex space-x-1 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
          {(['scenario', 'discovery', 'lab', 'challenges', 'misconceptions', 'summary'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      {/* HINT BUBBLE & CONFETTI OVERLAYS */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Infinite Series Master Certificate Achieved!" />
      <SparkleBurst show={showSparkle} x={500} y={300} />

      {/* TAB CONTENT AREA */}
      <main className="w-full max-w-6xl flex-grow">
        {/* TAB 1: SCENARIO */}
        {activeTab === 'scenario' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 animate-fadeIn">
            <div className="border-l-4 border-cyan-500 pl-4 py-1">
              <h2 className="text-2xl font-bold text-cyan-400">{SCENARIO.title}</h2>
              <p className="text-slate-300 mt-2 text-base leading-relaxed">{SCENARIO.intro}</p>
            </div>
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 leading-relaxed text-slate-300">
              <h3 className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-wider">Experimental Context</h3>
              <p>{SCENARIO.context}</p>
            </div>

            {/* CURRICULUM NODES COVERED */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Curriculum Nodes Included:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                {ALL_NODE_IDS.map(nodeId => {
                  const nodeTitle = SUBJECT_CONFIG[nodeId]?.title || nodeId;
                  const bkt = bktStates[nodeId];
                  const mastery = bkt ? Math.round(masteryProb(bkt) * 100) : 0;
                  return (
                    <div key={nodeId} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-300 truncate pr-2" title={nodeTitle}>{nodeTitle}</span>
                      <span className="px-2 py-0.5 rounded bg-blue-900/50 text-blue-300 font-mono text-[10px]">{mastery}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => handleTabChange('discovery')}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl shadow-lg transition-all"
            >
              Begin Exploration Deck →
            </button>
          </div>
        )}

        {/* TAB 2: DISCOVERY QUESTION & PREDICTIONS */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* COUNTERINTUITIVE DISCOVERY QUESTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                <span>💡</span>
                <span>COUNTERINTUITIVE DISCOVERY QUESTION</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-100">{DISCOVERY_QUESTION.question}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setDiscoverySelected(idx); audioManager.play('tap'); }}
                    className={`p-4 rounded-xl text-left text-sm border transition-all ${
                      discoverySelected === idx
                        ? 'border-cyan-500 bg-cyan-950/40 text-cyan-200'
                        : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
              <button
                onClick={handleDiscoverySubmit}
                disabled={discoverySelected === null}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg transition-all"
              >
                Submit Discovery Hypothesis
              </button>

              {discoverySubmitted && (
                <div className="p-4 bg-slate-950 rounded-xl border border-cyan-800/50 text-sm text-cyan-200 animate-fadeIn">
                  <p className="font-bold text-cyan-400 mb-1">Mathematical Reality:</p>
                  <p>{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS MAP */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-md font-bold text-cyan-400 uppercase tracking-wider">Predictive Hypotheses</h3>
              {PREDICTION_QUESTIONS.map((pq, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-sm font-medium text-slate-200">{pq.question}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {pq.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => {
                          const updated = [...predictionAnswers];
                          updated[idx] = optIdx;
                          setPredictionAnswers(updated);
                          audioManager.play('tap');
                        }}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          predictionAnswers[idx] === optIdx
                            ? 'border-blue-500 bg-blue-950/40 text-blue-200'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500 italic">Verify Instruction: {pq.verifyInstruction}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: INTERACTIVE LAB (EXPLORATION STEPS) */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* EXPLORATION STEPS RENDER */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {EXPLORATION_STEPS.map((step, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{step.title}</h4>
                  <p className="text-xs text-slate-300">{step.instruction}</p>
                </div>
              ))}
            </div>

            {/* LAB 1: GEOMETRIC PROGRESSION VISUALIZER */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-cyan-300">Lab 1: Infinite Geometric Progression Visualizer</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GPSeriesVisualizer a={gpFirstTerm} r={gpRatio} terms={gpTerms} />
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <label className="text-xs font-bold text-slate-300 flex justify-between">
                      <span>First Term (a): {gpFirstTerm}</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={gpFirstTerm}
                      onChange={e => { setGpFirstTerm(Number(e.target.value)); audioManager.play('tap'); }}
                      className="w-full accent-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 flex justify-between">
                      <span>Common Ratio (r): {gpRatio}</span>
                    </label>
                    <input
                      type="range"
                      min="-1.5"
                      max="1.5"
                      step="0.1"
                      value={gpRatio}
                      onChange={e => { setGpRatio(Number(e.target.value)); audioManager.play('tap'); }}
                      className="w-full accent-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 flex justify-between">
                      <span>Number of Partial Sum Terms (N): {gpTerms}</span>
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="15"
                      value={gpTerms}
                      onChange={e => { setGpTerms(Number(e.target.value)); audioManager.play('tap'); }}
                      className="w-full accent-cyan-500"
                    />
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-cyan-200">
                    S_N = a(1 - r^N) / (1 - r) = { (gpFirstTerm * (1 - Math.pow(gpRatio, gpTerms))) / (1 - gpRatio) }
                  </div>
                </div>
              </div>
            </div>

            {/* LAB 2: GENERALIZED BINOMIAL EXPANSION VISUALIZER */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-emerald-300">Lab 2: Generalized Binomial Expansion (1+x)^m</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BinomialExpansionVisualizer m={binomialIndex} xVal={binomialX} terms={binomialTerms} />
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <label className="text-xs font-bold text-slate-300 flex justify-between">
                      <span>Exponent (m): {binomialIndex}</span>
                    </label>
                    <input
                      type="range"
                      min="-3"
                      max="3"
                      step="0.5"
                      value={binomialIndex}
                      onChange={e => { setBinomialIndex(Number(e.target.value)); audioManager.play('tap'); }}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 flex justify-between">
                      <span>Variable (x): {binomialX}</span>
                    </label>
                    <input
                      type="range"
                      min="-1.5"
                      max="1.5"
                      step="0.05"
                      value={binomialX}
                      onChange={e => { setBinomialX(Number(e.target.value)); audioManager.play('tap'); }}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 flex justify-between">
                      <span>Terms N: {binomialTerms}</span>
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="10"
                      value={binomialTerms}
                      onChange={e => { setBinomialTerms(Number(e.target.value)); audioManager.play('tap'); }}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* LAB 3 & 4: EXPONENTIAL & LOGARITHMIC COMPARISON */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-amber-300">Lab 3 & 4: Exponential e^x vs Logarithmic log_e(1+x) Lab</h3>
              <ExpLogSeriesVisualizer x={expX} terms={expTerms} />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300">Input Value x: {expX}</label>
                  <input
                    type="range"
                    min="-0.9"
                    max="1.0"
                    step="0.1"
                    value={expX}
                    onChange={e => { setExpX(Number(e.target.value)); audioManager.play('tap'); }}
                    className="w-full accent-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300">Number of Series Terms: {expTerms}</label>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    value={expTerms}
                    onChange={e => { setExpTerms(Number(e.target.value)); audioManager.play('tap'); }}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* OBSERVATION QUESTIONS MAP */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-md font-bold text-cyan-400 uppercase tracking-wider">Lab Observations</h3>
              {OBSERVATION_QUESTIONS.map((oq, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-sm font-medium text-slate-200">{oq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {oq.observableOptions.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => {
                          const updated = [...observationAnswers];
                          updated[idx] = optIdx;
                          setObservationAnswers(updated);
                          audioManager.play('tap');
                        }}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          observationAnswers[idx] === optIdx
                            ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            {/* PROGRESS & MASTERY HEADER */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </span>
                <h3 className="text-lg font-bold text-slate-100">
                  {CHALLENGES[currentChallengeIdx].competencyLevel}
                </h3>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  CHALLENGES[currentChallengeIdx].difficulty === 'foundation'
                    ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                    : CHALLENGES[currentChallengeIdx].difficulty === 'standard'
                    ? 'bg-amber-900/60 text-amber-300 border border-amber-700'
                    : 'bg-red-900/60 text-red-300 border border-red-700'
                }`}>
                  {CHALLENGES[currentChallengeIdx].difficulty}
                </span>
                <span className="text-sm font-bold text-cyan-400 font-mono">Score: {score}</span>
              </div>
            </div>

            {/* QUESTION TEXT */}
            <div className="text-base font-medium text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {CHALLENGES[currentChallengeIdx].question}
            </div>

            {/* INTERACTION AREA ACCORDING TO TYPE */}
            {CHALLENGES[currentChallengeIdx].type === 'multiple-choice' && CHALLENGES[currentChallengeIdx].options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CHALLENGES[currentChallengeIdx].options!.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedMcOption(idx); audioManager.play('tap'); resetInactivityTimer(); }}
                    className={`p-4 rounded-xl text-left text-sm border transition-all ${
                      selectedMcOption === idx
                        ? 'border-blue-500 bg-blue-950/50 text-blue-200 shadow-md'
                        : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {CHALLENGES[currentChallengeIdx].type === 'numeric' && (
              <div className="space-y-3">
                <input
                  type="number"
                  step="any"
                  value={numericInput}
                  onChange={e => { setNumericInput(e.target.value); resetInactivityTimer(); }}
                  placeholder="Enter numerical answer..."
                  className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-lg focus:border-blue-500 outline-none"
                />
              </div>
            )}

            {CHALLENGES[currentChallengeIdx].type === 'drag-sort' && (
              <div className="space-y-2">
                <p className="text-xs text-slate-400">Reorder items from highest to lowest rate of convergence:</p>
                {sortedItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-sm font-medium text-slate-200">{item}</span>
                    <div className="flex space-x-1">
                      <button
                        disabled={idx === 0}
                        onClick={() => moveSortedItem(idx, idx - 1)}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded text-xs font-bold"
                      >
                        ↑
                      </button>
                      <button
                        disabled={idx === sortedItems.length - 1}
                        onClick={() => moveSortedItem(idx, idx + 1)}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded text-xs font-bold"
                      >
                        ↓
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* FEEDBACK & SUBMIT BUTTON */}
            {challengeFeedback && (
              <div className={`p-4 rounded-xl border text-sm animate-fadeIn ${
                isChallengeCorrect ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' : 'bg-red-950/40 border-red-800 text-red-300'
              }`}>
                {challengeFeedback}
              </div>
            )}

            <div className="flex space-x-3">
              {isChallengeCorrect === null ? (
                <button
                  onClick={handleChallengeSubmit}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 font-bold text-white rounded-xl shadow-lg transition-all"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 font-bold text-white rounded-xl shadow-lg transition-all"
                >
                  Continue to Next Challenge →
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: MISCONCEPTIONS */}
        {activeTab === 'misconceptions' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-cyan-400">Common Infinite Series Misconceptions & Corrections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS.map(m => (
                <div key={m.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-lg">
                  <h3 className="text-md font-bold text-red-400">{m.title}</h3>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                    <span className="font-bold text-red-400">Flawed Thinking: </span>
                    {m.misconception}
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-emerald-900/50 text-xs text-emerald-300">
                    <span className="font-bold text-emerald-400">Mathematical Truth: </span>
                    {m.correction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SUMMARY & REAL WORLD APPLICATION */}
        {activeTab === 'summary' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="border-l-4 border-emerald-500 pl-4 py-1">
              <h2 className="text-2xl font-bold text-emerald-400">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-slate-300 mt-2 text-sm leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Industrial Quantitative Steps:</h3>
              <div className="grid grid-cols-1 gap-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 font-mono">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Mastery Summary Report</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400">Total Score</div>
                  <div className="text-xl font-bold text-cyan-400 font-mono">{score}</div>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400">Challenges Cleared</div>
                  <div className="text-xl font-bold text-emerald-400 font-mono">{currentChallengeIdx} / {CHALLENGES.length}</div>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400">Concepts Covered</div>
                  <div className="text-xl font-bold text-amber-400 font-mono">{ALL_NODE_IDS.length}</div>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400">Overall Mastery</div>
                  <div className="text-xl font-bold text-blue-400 font-mono">
                    {Math.round((score / (CHALLENGES.length * 10)) * 100)}%
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => { setActiveTab('challenges'); setCurrentChallengeIdx(0); setScore(0); }}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold rounded-xl shadow-lg transition-all"
            >
              Restart Simulation Deck 🔄
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
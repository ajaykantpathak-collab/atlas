'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C11_ECON_070 = 'c11_econ_070';
const NODE_C11_ECON_071 = 'c11_econ_071';
const NODE_C11_ECON_072 = 'c11_econ_072';
const NODE_C11_ECON_073 = 'c11_econ_073';
const NODE_C11_ECON_074 = 'c11_econ_074';
const NODE_C11_ECON_075 = 'c11_econ_075';
const NODE_C11_ECON_076 = 'c11_econ_076';
const NODE_C11_ECON_077 = 'c11_econ_077';
const NODE_C11_ECON_078 = 'c11_econ_078';
const NODE_C11_ECON_079 = 'c11_econ_079';
const NODE_C11_ECON_080 = 'c11_econ_080';

const ALL_NODE_IDS = [
  NODE_C11_ECON_070,
  NODE_C11_ECON_071,
  NODE_C11_ECON_072,
  NODE_C11_ECON_073,
  NODE_C11_ECON_074,
  NODE_C11_ECON_075,
  NODE_C11_ECON_076,
  NODE_C11_ECON_077,
  NODE_C11_ECON_078,
  NODE_C11_ECON_079,
  NODE_C11_ECON_080,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Indian Economic Intelligence Bureau',
  intro: 'You are appointed Chief Statistical Analyst for the Ministry of Statistics & Programme Implementation (MoSPI). India’s economic growth is booming, but the Union Finance Minister and the RBI Governor need precise answers on regional income inequality, price inflation, industrial production, and macro correlations.',
  context: 'Averages alone hide the real disparities. You must master Measures of Dispersion (Range, SD, QD, MD, CV), Correlation (Scatter, Pearson, Spearman), and Index Numbers (Laspeyre, Paasche, Fisher, WPI, CPI, IIP, and Linear Trends) to guide crucial public policy decisions.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Karnataka and Bihar both report a sample mean per capita income of ₹1,70,000. Can we conclude both states have identical economic prosperity and equality?',
  options: [
    'Yes — if the means are equal, their economic conditions must be identical',
    'No — Karnataka incomes could be tightly clustered while Bihar has extreme rich and poor',
    'Yes — central tendency measures tell us everything about income distribution',
    'No — but only if their total populations are completely different',
  ],
  correctIndex: 1,
  hintAfter: 'Don’t worry! That is why we study Dispersion. Two distributions can have identical means but utterly different spreads!',
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

// ─── CHALLENGES ARRAY (22 diverse challenges covering nodes 070 to 080) ───
const CHALLENGES: Challenge[] = [
  // 1. Range (070) - Foundation (Recall)
  {
    id: 'ch_econ_001',
    nodeId: NODE_C11_ECON_070,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the statistical definition of the Range in a dataset with largest value L and smallest value S?',
    options: ['Range = L + S', 'Range = L − S', 'Range = (L − S) / 2', 'Range = (L − S) / (L + S)'],
    correctIndex: 1,
    explanation: 'The Range is the simplest absolute measure of dispersion, defined as the difference between the largest (L) and smallest (S) values: Range = L − S.',
    hints: [
      'Think about the distance from the minimum to the maximum.',
      'It is a single subtraction between the extremes.',
      'Range equals Largest minus Smallest (L − S).',
    ],
    misconceptionIndex: 0,
  },
  // 2. Coefficient of Range (070) - Numeric Application
  {
    id: 'ch_econ_002',
    nodeId: NODE_C11_ECON_070,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Five workers in Maharashtra earn daily wages of ₹300, ₹350, ₹400, ₹450, and ₹500. Calculate the Coefficient of Range: (L − S) / (L + S).',
    correctAnswer: 0.25,
    tolerance: 0.02,
    unit: 'ratio',
    explanation: 'L = 500, S = 300. Range = 500 − 300 = 200. Coefficient of Range = 200 / (500 + 300) = 200 / 800 = 0.25.',
    hints: [
      'Identify L = 500 and S = 300.',
      'Formula: (L − S) / (L + S) = (500 − 300) / (500 + 300).',
      'Compute 200 / 800 = 0.25.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Standard Deviation (071) - Drag-Sort (Analysis)
  {
    id: 'ch_econ_003',
    nodeId: NODE_C11_ECON_071,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the steps for computing the Standard Deviation (σ) by the Direct Method in the correct sequence.',
    sortItems: [
      'Calculate the arithmetic mean (x̄)',
      'Find deviations of each observation from the mean (x − x̄)',
      'Square each deviation to make them all positive: (x − x̄)²',
      'Sum the squared deviations and divide by n to get the variance',
      'Take the positive square root of variance: σ = √[Σ(x − x̄)² / n]',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'First find the mean, then deviations, square deviations (prevents zero cancellation), average them for variance, and finally take the square root.',
    hints: [
      'You cannot find deviations before knowing the central mean.',
      'Deviations must be squared before averaging to avoid summing to zero.',
      'Taking the square root is the very last step to return to original units.',
    ],
    misconceptionIndex: 1,
  },
  // 4. Standard Deviation Merit (071) - Understanding
  {
    id: 'ch_econ_004',
    nodeId: NODE_C11_ECON_071,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is Standard Deviation regarded as the most mathematically reliable measure of dispersion in econometrics?',
    options: [
      'Because it ignores extreme values completely',
      'Because it is based on every observation and possesses algebraic properties suitable for advanced inferential statistics',
      'Because it is calculated simply by subtracting the lowest rank from highest',
      'Because it is always smaller than the range and median',
    ],
    correctIndex: 1,
    explanation: 'Standard deviation uses all observations, treats deviations quadratically, and possesses algebraic tractability for correlation, regression, and hypothesis testing.',
    hints: [
      'Does SD ignore data or use all observations?',
      'Think about its connection to variances and normal distribution.',
      'It uses every single observation and allows further mathematical manipulation.',
    ],
  },
  // 5. Quartile Deviation (072) - Application
  {
    id: 'ch_econ_005',
    nodeId: NODE_C11_ECON_072,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For an NSSO survey of milk output, Q1 is 12 litres and Q3 is 28 litres. Calculate the Quartile Deviation (QD = (Q3 − Q1)/2).',
    correctAnswer: 8,
    tolerance: 0.1,
    unit: 'litres',
    explanation: 'Quartile Deviation = (Q3 − Q1) / 2 = (28 − 12) / 2 = 16 / 2 = 8 litres.',
    hints: [
      'QD is also called semi-interquartile range.',
      'Compute Q3 − Q1 first: 28 − 12 = 16.',
      'Divide 16 by 2 to get 8 litres.',
    ],
  },
  // 6. Quartile Deviation Resilience (072) - Evaluation
  {
    id: 'ch_econ_006',
    nodeId: NODE_C11_ECON_072,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In Indian wealth distribution data where a billionaire like Mukesh Ambani is added to a local village survey, why is QD preferred over SD to describe typical household spread?',
    options: [
      'QD uses only the middle 50% of the distribution (Q1 to Q3) and is unaffected by extreme outliers in the top 25%',
      'QD uses 100% of observations and squares the billionaire’s wealth',
      'QD is always equal to the mean deviation about mode',
      'QD produces negative values for rich households',
    ],
    correctIndex: 0,
    explanation: 'Quartile Deviation depends purely on the positions of Q1 and Q3, bounding the middle 50% of the population, thereby completely ignoring extreme tails and outliers.',
    hints: [
      'Consider where an extreme billionaire falls: in the top 25% or the middle 50%?',
      'Q3 is at the 75th percentile; observations above it do not shift Q3’s value.',
      'QD ignores the top and bottom 25%, isolating the typical middle 50%.',
    ],
  },
  // 7. Mean Deviation Minimisation (073) - Understanding
  {
    id: 'ch_econ_007',
    nodeId: NODE_C11_ECON_073,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is the Mean Deviation about the Median mathematically smaller than (or equal to) the Mean Deviation about the Mean?',
    options: [
      'Because the median is always zero in economic surveys',
      'Because of the mathematical theorem: the sum of absolute deviations Σ|x − A| is minimised when A is the Median',
      'Because the mean squares deviations while the median ignores all signs',
      'Because the median is only computed on grouped frequencies',
    ],
    correctIndex: 1,
    explanation: 'A fundamental statistical theorem proves that the sum of absolute deviations Σ|x − A| is at its global minimum when deviations are taken from the median.',
    hints: [
      'Think about what property makes the median unique for absolute values.',
      'The mean minimises squared deviations; what minimises absolute deviations?',
      'The median minimises Σ|x − A|.',
    ],
    misconceptionIndex: 2,
  },
  // 8. Coefficient of Variation (074) - Analysis
  {
    id: 'ch_econ_008',
    nodeId: NODE_C11_ECON_074,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Punjab rural incomes have Mean = ₹15,000, SD = ₹3,000 (CV = 20%). Bihar rural incomes have Mean = ₹8,000, SD = ₹2,000 (CV = 25%). Which state has greater relative variability (less consistency)?',
    options: [
      'Punjab, because its absolute standard deviation ₹3,000 is larger than ₹2,000',
      'Bihar, because its Coefficient of Variation (25%) is higher than Punjab’s (20%)',
      'Both states have equal variability because both standard deviations are positive',
      'Neither, because CV cannot be used to compare different states',
    ],
    correctIndex: 1,
    explanation: 'When means differ, absolute SD is misleading. CV normalises SD by the mean: Bihar’s CV of 25% > Punjab’s 20%, proving Bihar’s incomes fluctuate more relative to their average.',
    hints: [
      'Remember: higher absolute SD does NOT mean higher relative variability if the mean is much higher.',
      'Compare CV_Punjab (20%) with CV_Bihar (25%).',
      'Higher CV means less consistency and greater relative volatility.',
    ],
    misconceptionIndex: 3,
  },
  // 9. Drag-Label: Dispersion Formulas (070-074)
  {
    id: 'ch_econ_009',
    nodeId: NODE_C11_ECON_074,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match each statistical measure of dispersion to its correct formula definition.',
    dragItems: [
      { label: 'Range', targetId: 'box_range' },
      { label: 'Standard Deviation', targetId: 'box_sd' },
      { label: 'Quartile Deviation', targetId: 'box_qd' },
      { label: 'Coefficient of Variation', targetId: 'box_cv' },
    ],
    correctMapping: {
      box_range: 'Range',
      box_sd: 'Standard Deviation',
      box_qd: 'Quartile Deviation',
      box_cv: 'Coefficient of Variation',
    },
    explanation: 'Range = L − S; SD = √[Σ(x−x̄)²/n]; QD = (Q3−Q1)/2; CV = (σ/x̄) × 100.',
    hints: [
      'L − S is the simplest measure: Range.',
      'Root-mean-square deviation is Standard Deviation.',
      '(σ/x̄) × 100 expresses spread as a percentage: CV.',
    ],
  },
  // 10. Correlation Concept (075) - Recall / Direction
  {
    id: 'ch_econ_010',
    nodeId: NODE_C11_ECON_075,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When the retail price of onions in Delhi rises from ₹20 to ₹80/kg and household demand falls from 10kg to 2kg, what type of correlation exists between price and quantity demanded?',
    options: ['Positive correlation', 'Negative (inverse) correlation', 'Zero correlation', 'Perfect non-linear cubic correlation'],
    correctIndex: 1,
    explanation: 'When one variable increases while the other decreases, the relationship is negative (inverse) correlation.',
    hints: [
      'Price goes UP; Quantity goes DOWN.',
      'Moving in opposite directions means negative correlation.',
      'Law of demand represents negative correlation.',
    ],
  },
  // 11. Correlation vs Causation (075) - Evaluation
  {
    id: 'ch_econ_011',
    nodeId: NODE_C11_ECON_075,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'During Indian summers, ice cream sales and drowning deaths show a high correlation (r = +0.88). What does this prove?',
    options: [
      'Eating ice cream causes swimming cramps and drowning',
      'Drowning incidents stimulate appetite for ice cream',
      'Correlation measures association, not causation; both are driven by a third confounding variable (summer heat)',
      'The correlation coefficient was computed incorrectly',
    ],
    correctIndex: 2,
    explanation: 'Correlation indicates that two variables move together, but does NOT establish causation. Summer heat independently causes both higher ice cream consumption and more swimming.',
    hints: [
      'Think about summer temperatures affecting both activities.',
      'Never confuse statistical co-movement with causal mechanism.',
      'Correlation != Causation.',
    ],
    misconceptionIndex: 4,
  },
  // 12. Scatter Diagram Interpretation (076) - Understanding
  {
    id: 'ch_econ_012',
    nodeId: NODE_C11_ECON_076,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In a scatter diagram, points tightly cluster along a line sloping downwards from top-left to bottom-right. This visually depicts:',
    options: [
      'High positive linear correlation',
      'High negative linear correlation',
      'Zero correlation',
      'Curvilinear non-monotonic correlation',
    ],
    correctIndex: 1,
    explanation: 'A downward slope from top-left to bottom-right indicates that as X increases, Y decreases (negative direction), and the tight clustering indicates a high degree.',
    hints: [
      'Top-left means high Y with low X; bottom-right means low Y with high X.',
      'Downward slope = negative.',
      'Tight clustering = high degree.',
    ],
  },
  // 13. Karl Pearson’s r Bounds (077) - Recall
  {
    id: 'ch_econ_013',
    nodeId: NODE_C11_ECON_077,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the mathematical range of Karl Pearson’s coefficient of correlation (r)?',
    options: ['0 to +1', '−1 to +1 (inclusive)', '−∞ to +∞', '0 to 100%'],
    correctIndex: 1,
    explanation: 'Karl Pearson’s r is always bounded strictly between −1.0 and +1.0. A value outside this interval indicates a calculation error.',
    hints: [
      'It can be both negative and positive.',
      'The maximum strength in either direction is 1.0.',
      'Bounded by [−1, +1].',
    ],
  },
  // 14. Karl Pearson’s Calculation (077) - Numeric
  {
    id: 'ch_econ_014',
    nodeId: NODE_C11_ECON_077,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Given covariance term Σ(x−x̄)(y−ȳ) = 200, Σ(x−x̄)² = 40, and Σ(y−ȳ)² = 1000. Calculate Karl Pearson’s r: r = Σ(x−x̄)(y−ȳ) / √[Σ(x−x̄)² × Σ(y−ȳ)²].',
    correctAnswer: 1.0,
    tolerance: 0.05,
    unit: 'r',
    explanation: 'Denominator = √(40 × 1000) = √40,000 = 200. r = 200 / 200 = +1.0 (perfect positive linear correlation).',
    hints: [
      'Multiply 40 by 1000 = 40,000.',
      'Take the square root of 40,000 = 200.',
      'r = 200 / 200 = 1.0.',
    ],
  },
  // 15. Spearman’s Rank Correlation (078) - Application / Numeric
  {
    id: 'ch_econ_015',
    nodeId: NODE_C11_ECON_078,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Six Indian states (n = 6) are ranked on HDI and GDP. The sum of squared rank differences Σd² = 12. Calculate Spearman’s rho: ρ = 1 − [6Σd² / (n(n² − 1))]. (Round to 3 decimals).',
    correctAnswer: 0.657,
    tolerance: 0.01,
    unit: 'rho',
    explanation: 'n = 6, n²−1 = 35. Denominator = 6 × 35 = 210. Numerator = 6 × 12 = 72. ρ = 1 − (72 / 210) = 1 − 0.3428 = 0.657.',
    hints: [
      'Compute n(n² − 1) = 6 × (36 − 1) = 210.',
      'Compute 6 × Σd² = 6 × 12 = 72.',
      'ρ = 1 − (72 / 210) ≈ 0.657.',
    ],
  },
  // 16. Spearman’s Advantage (078) - Analysis
  {
    id: 'ch_econ_016',
    nodeId: NODE_C11_ECON_078,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'When is Spearman’s Rank Correlation (ρ) strictly preferred over Karl Pearson’s r in NITI Aayog SDG Index assessments?',
    options: [
      'When variables are continuous, normally distributed, and strictly linear',
      'When data consists of qualitative/ordinal rankings, non-linear monotonic trends, or extreme outliers',
      'When the number of observations n exceeds 1,000,000',
      'When all rank differences d are strictly negative',
    ],
    correctIndex: 1,
    explanation: 'Spearman’s rho is non-parametric; it works on ordinal ranks, captures monotonic curves, and compresses extreme outliers.',
    hints: [
      'Rank correlation works with ranks rather than exact continuous measurements.',
      'Think about ordinal scales (1st, 2nd, 3rd) and resistance to outliers.',
      'It is non-parametric and ideal for rankings and monotonic patterns.',
    ],
  },
  // 17. Index Number Weights (079) - Recall
  {
    id: 'ch_econ_017',
    nodeId: NODE_C11_ECON_079,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which weights are used by Laspeyre’s and Paasche’s price index numbers respectively?',
    options: [
      'Laspeyre uses base-year quantities (q0); Paasche uses current-year quantities (q1)',
      'Laspeyre uses current-year quantities (q1); Paasche uses base-year quantities (q0)',
      'Both use base-year quantities (q0)',
      'Laspeyre uses prices as weights; Paasche uses revenues',
    ],
    correctIndex: 0,
    explanation: 'Laspeyre’s uses base-year quantities q0 (L for Last/Base year), while Paasche’s uses current-year quantities q1 (P for Present/Current year).',
    hints: [
      'L = Last (base year q0).',
      'P = Present (current year q1).',
      'Laspeyre = q0, Paasche = q1.',
    ],
  },
  // 18. Fisher’s Ideal Index (079) - Understanding
  {
    id: 'ch_econ_018',
    nodeId: NODE_C11_ECON_079,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is Fisher’s Price Index called the "Ideal Index"?',
    options: [
      'It is the simple arithmetic mean of Laspeyre and Paasche and always equals 100',
      'It is the geometric mean of Laspeyre and Paasche (F = √(L × P)) and satisfies both the Time-Reversal and Factor-Reversal tests',
      'It completely ignores quantity changes across years',
      'It does not require any base year data',
    ],
    correctIndex: 1,
    explanation: 'Fisher’s index is the geometric mean √(L × P). It is ideal because it satisfies both time-reversal (P01 × P10 = 1) and factor-reversal (P01 × Q01 = V01) tests.',
    hints: [
      'Geometric mean, NOT arithmetic mean.',
      'It satisfies two crucial mathematical reversal tests.',
      'F = √(L × P) balances upward and downward biases.',
    ],
  },
  // 19. WPI vs CPI Services (080) - Analysis
  {
    id: 'ch_econ_019',
    nodeId: NODE_C11_ECON_080,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is a fundamental difference in coverage between India’s Wholesale Price Index (WPI) and Consumer Price Index (CPI)?',
    options: [
      'WPI includes services like education and healthcare, whereas CPI strictly excludes them',
      'WPI strictly excludes services (goods only at wholesale mandi/factory gate), while CPI-Combined includes services (education, health, transport, housing)',
      'WPI is compiled by RBI, while CPI is compiled by the World Bank',
      'CPI measures physical volume of factory output, while WPI measures prices',
    ],
    correctIndex: 1,
    explanation: 'WPI covers only physical commodities at the wholesale stage and excludes services. CPI-Combined covers retail consumer baskets including 28.3% weight in miscellaneous services.',
    hints: [
      'Does your family pay for services (school fees, doctor visits, mobile recharge)?',
      'CPI measures retail cost of living and includes services.',
      'WPI is wholesale goods only.',
    ],
  },
  // 20. IIP Nature (080) - Recall / Distinction
  {
    id: 'ch_econ_020',
    nodeId: NODE_C11_ECON_080,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How does the Index of Industrial Production (IIP) differ from WPI and CPI?',
    options: [
      'IIP measures inflation in agriculture',
      'IIP is a volume (physical quantity output) index for mining, manufacturing, and electricity — not a price index',
      'IIP measures stock market price changes on BSE Sensex',
      'IIP is calculated only once every decade during the Census',
    ],
    correctIndex: 1,
    explanation: 'While WPI and CPI measure price levels, IIP measures the physical volume of industrial production across mining (14.2%), manufacturing (77.6%), and electricity (8.2%).',
    hints: [
      'Is IIP measuring prices or production volume?',
      'It tracks how many tonnes of steel, cars, and megawatt-hours are produced.',
      'It is a quantity/volume index.',
    ],
  },
  // 21. Slope of Straight Line (080) - Application / Numeric
  {
    id: 'ch_econ_021',
    nodeId: NODE_C11_ECON_080,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Indian Real GDP trend data has points (X1 = 0, Y1 = 189 lakh crore) in 2018-19 and (X2 = 5, Y2 = 325 lakh crore) in 2023-24. Calculate the slope m = (Y2 − Y1) / (X2 − X1).',
    correctAnswer: 27.2,
    tolerance: 0.2,
    unit: '₹ lakh cr/yr',
    explanation: 'm = (325 − 189) / (5 − 0) = 136 / 5 = 27.2 lakh crore per year.',
    hints: [
      'Slope is rise over run: (Y2 − Y1) / (X2 − X1).',
      '325 − 189 = 136.',
      '136 / 5 = 27.2.',
    ],
    misconceptionIndex: 5,
  },
  // 22. Construct: Straight Line Equation (080) - Construct / Creativity
  {
    id: 'ch_econ_022',
    nodeId: NODE_C11_ECON_080,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the linear regression trend equation for consumption C where autonomous consumption c = 50 and marginal propensity to consume m = 0.8 on income Y.',
    availableParts: ['C', '=', '0.8Y', '+', '50', '−', '189', 'X'],
    targetState: 'C = 0.8Y + 50',
    validationHint: 'Form the standard line equation y = mx + c with C, =, 0.8Y, +, 50.',
    explanation: 'The linear consumption function is C = mY + c = 0.8Y + 50, where 0.8 is the MPC (slope) and 50 is autonomous consumption (intercept).',
    hints: [
      'The dependent variable is C.',
      'Slope 0.8 multiplies income Y: 0.8Y.',
      'Add intercept 50: C = 0.8Y + 50.',
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
  nodeId: NODE_C11_ECON_070,
  title: 'Measures of Dispersion, Correlation & Index Numbers',
  definition: 'Dispersion measures the spread of data around the central value. Correlation measures the direction and strength of linear/monotonic association between two variables. Index numbers measure relative price or quantity change over time against a base period (100).',
  eli5: 'Think of the mean as where the team stands on the field, dispersion as how spread out the players are, correlation as whether two players run together or in opposite directions, and index numbers as a scorecard showing how much faster they run this year compared to year 1.',
  misconceptions: [
    { misconception: 'Range is written as an interval like ₹100 to ₹500', correction: 'The range is a single number: the difference L − S (e.g. ₹400).' },
    { misconception: 'Variance is the final standard deviation', correction: 'Variance is σ²; you MUST take the positive square root to get Standard Deviation (σ).' },
    { misconception: 'Mean deviation about mean is always smaller than about median', correction: 'The sum of absolute deviations is mathematically minimised about the MEDIAN, not the mean.' },
    { misconception: 'Higher standard deviation always means higher variability', correction: 'When means differ, you must compare the Coefficient of Variation (CV = σ/x̄ × 100), not absolute SD.' },
    { misconception: 'High correlation proves that X causes Y', correction: 'Correlation measures association only. A third confounding variable (like heat) can cause both.' },
    { misconception: 'Slope is run over rise: (x2 − x1)/(y2 − y1)', correction: 'Slope is rise over run: m = (y2 − y1) / (x2 − x1).' },
  ],
  diagnosticQuestions: [
    { question: 'What is the Range for data: 12, 18, 25, 45, 90?', options: ['12 to 90', '78', '45', '102'], correctIndex: 1 },
    { question: 'Which dispersion measure is resilient to extreme wealth outliers?', options: ['Range', 'Standard Deviation', 'Quartile Deviation', 'Mean Deviation about Mode'], correctIndex: 2 },
    { question: 'If Mean = 50 and SD = 10, what is the Coefficient of Variation (CV)?', options: ['5%', '20%', '50%', '500%'], correctIndex: 1 },
    { question: 'Karl Pearson’s r = −0.92 indicates:', options: ['Weak positive', 'High negative linear correlation', 'Zero correlation', 'Calculation mistake'], correctIndex: 1 },
    { question: 'Spearman’s rho formula uses differences between:', options: ['Actual values (X − Y)', 'Means (x̄ − ȳ)', 'Ranks (Rx − Ry)', 'Variances (σx² − σy²)'], correctIndex: 2 },
    { question: 'Laspeyre’s price index uses which weights?', options: ['Current year quantities q1', 'Base year quantities q0', 'Average prices', 'GDP shares'], correctIndex: 1 },
    { question: 'Which official index includes services and is used by the RBI for inflation targeting?', options: ['WPI', 'CPI-Combined', 'IIP', 'Sensex'], correctIndex: 1 },
    { question: 'What is the slope of the line passing through (0, 100) and (4, 260)?', options: ['40', '160', '0.025', '65'], correctIndex: 0 },
  ],
  masteryCriteria: 'Master all 11 nodes: compute Range, SD, QD, MD, CV; interpret Scatter, Pearson r, Spearman rho; calculate Laspeyre, Paasche, Fisher indices; understand WPI, CPI, IIP, and straight-line slopes.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Range, Quartiles & Spread Dynamics',
    instruction: 'Adjust the highest income slider for Bihar to observe how a single outlier expands the Range (L − S) while Quartile Deviation protects the middle 50%.',
    interactionType: 'slider-range',
    nodeId: NODE_C11_ECON_070,
  },
  {
    title: 'Lab 2: Standard Deviation & Variance Engine',
    instruction: 'Drag data points to watch deviations square and see how standard deviation balances positive and negative spreads.',
    interactionType: 'slider-sd',
    nodeId: NODE_C11_ECON_071,
  },
  {
    title: 'Lab 3: Relative Variability (CV) Comparator',
    instruction: 'Compare high-mean Punjab vs low-mean Bihar. Notice how higher SD can still have a lower CV!',
    interactionType: 'slider-cv',
    nodeId: NODE_C11_ECON_074,
  },
  {
    title: 'Lab 4: Correlation & Scatter Dynamics',
    instruction: 'Adjust the correlation slider from −1.0 to +1.0 to see the live scatter diagram tilt and cluster in real-time.',
    interactionType: 'slider-corr',
    nodeId: NODE_C11_ECON_076,
  },
  {
    title: 'Lab 5: Price Index & Basket Weighting',
    instruction: 'Alter base vs current prices of staple items to observe Laspeyre vs Paasche vs Fisher indices react.',
    interactionType: 'slider-index',
    nodeId: NODE_C11_ECON_079,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If one super-rich resident earning ₹10,00,000 enters Bihar’s 5-person sample, which measure will expand drastically while Quartile Deviation stays steady?',
    options: ['Range and Standard Deviation', 'Quartile Deviation only', 'Both will remain completely unchanged', 'Neither measure can be computed'],
    correctIndex: 0,
    verifyInstruction: 'Adjust the outlier slider in Lab 1 or the Sandbox to observe Range surge while middle quartiles remain unaffected.',
    nodeId: NODE_C11_ECON_072,
  },
  {
    question: 'Predict: A company has Mean Sales ₹1,00,000 (SD ₹10,000). A small shop has Mean Sales ₹10,000 (SD ₹2,000). Which business is more volatile relative to its size?',
    options: ['The big company (SD ₹10,000 > ₹2,000)', 'The small shop (CV 20% > 10%)', 'Both have identical risk', 'Cannot be determined without GDP data'],
    correctIndex: 1,
    verifyInstruction: 'Check Lab 3: Small shop CV = (2,000/10,000)×100 = 20%, whereas big company CV = (10,000/1,00,000)×100 = 10%!',
    nodeId: NODE_C11_ECON_074,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the scatter diagram as Pearson’s r moves from 0 to +1.0?',
    observableOptions: [
      'Points become random and circular',
      'Points align tighter and tighter along an upward-sloping straight line',
      'Points flip upside down into a parabolic U-shape',
      'All points vanish from the graph',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_ECON_076,
  },
  {
    question: 'What do you observe about Fisher’s Ideal Index compared to Laspeyre and Paasche?',
    observableOptions: [
      'Fisher is always double the sum of both',
      'Fisher lies between Laspeyre and Paasche, balancing their upward and downward substitution biases',
      'Fisher is always zero when prices increase',
      'Fisher only uses base year quantities',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_ECON_079,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Ministry Policy Task: The State Inflation & Inequality Report',
  description: 'Download the latest RBI Bulletin or MoSPI Monthly Economic Report. Select 5 Indian states. Compute the Range and CV of per capita NSDP, and compare the CPI-Combined inflation rate against the RBI 4% ± 2% mandate.',
  steps: [
    'Gather per capita NSDP for 5 states (e.g. Maharashtra, Karnataka, Gujarat, Odisha, Bihar).',
    'Calculate L, S, Range (L − S), and Coefficient of Range.',
    'Compute the Mean, SD, and CV (σ/x̄ × 100) to rank stability.',
    'Check if CPI-Combined is within the RBI 2% to 6% band and write a 3-bullet advisory for the Finance Minister.',
  ],
};

// ─── SVG DIAGRAM 1: DISPERSION & QUARTILE ANATOMY ───
function DispersionDiagramSVG() {
  return (
    <svg viewBox="0 0 540 160" className="w-full h-auto bg-slate-950/80 rounded-xl p-2 border border-slate-800" aria-label="Measures of Dispersion Anatomy Diagram">
      <defs>
        <linearGradient id="iqrGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.25" />
        </linearGradient>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
        </marker>
        <marker id="arrowAmber" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
        </marker>
      </defs>

      {/* Axis line */}
      <line x1="40" y1="105" x2="500" y2="105" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" />

      {/* Extreme Points S & L */}
      <circle cx="50" cy="105" r="5" fill="#f43f5e" />
      <text x="50" y="125" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">S (Smallest)</text>

      <circle cx="490" cy="105" r="5" fill="#f43f5e" />
      <text x="490" y="125" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">L (Largest)</text>

      {/* Range Bracket */}
      <line x1="50" y1="140" x2="490" y2="140" stroke="#f59e0b" strokeWidth="2" markerStart="url(#arrowAmber)" markerEnd="url(#arrowAmber)" />
      <text x="270" y="154" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">Total Range = L − S (Sensitive to Extreme Outliers)</text>

      {/* IQR Box (Middle 50%) */}
      <rect x="160" y="55" width="220" height="50" rx="6" fill="url(#iqrGrad)" stroke="#10b981" strokeWidth="2" />

      {/* Quartile markers */}
      <line x1="160" y1="45" x2="160" y2="105" stroke="#10b981" strokeWidth="2" />
      <text x="160" y="38" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Q1 (25%)</text>

      <line x1="270" y1="45" x2="270" y2="105" stroke="#38bdf8" strokeWidth="3" />
      <text x="270" y="38" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Median Q2 (50%)</text>

      <line x1="380" y1="45" x2="380" y2="105" stroke="#10b981" strokeWidth="2" />
      <text x="380" y="38" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Q3 (75%)</text>

      {/* Semi-interquartile indicator */}
      <text x="270" y="82" fill="#ecfeff" fontSize="11" fontWeight="bold" textAnchor="middle">Middle 50% = IQR (Q3 − Q1)</text>
      <text x="270" y="96" fill="#a7f3d0" fontSize="10" textAnchor="middle">Quartile Dev (QD) = (Q3 − Q1) / 2</text>
    </svg>
  );
}

// ─── SVG DIAGRAM 2: CORRELATION SPECTRUM DIAGRAM ───
function CorrelationSpectrumSVG() {
  return (
    <svg viewBox="0 0 540 150" className="w-full h-auto bg-slate-950/80 rounded-xl p-2 border border-slate-800" aria-label="Correlation Spectrum Diagram">
      {/* Box 1: Negative Correlation */}
      <g transform="translate(15, 10)">
        <rect width="155" height="130" rx="8" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
        <text x="77" y="20" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">Negative (r = −0.9)</text>
        {/* downward scatter points */}
        <circle cx="30" cy="40" r="3" fill="#f87171" />
        <circle cx="45" cy="48" r="3" fill="#f87171" />
        <circle cx="65" cy="65" r="3" fill="#f87171" />
        <circle cx="85" cy="78" r="3" fill="#f87171" />
        <circle cx="110" cy="98" r="3" fill="#f87171" />
        <circle cx="130" cy="110" r="3" fill="#f87171" />
        <line x1="25" y1="35" x2="135" y2="115" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
        <text x="77" y="125" fill="#94a3b8" fontSize="9" textAnchor="middle">e.g. Price ↑ Demand ↓</text>
      </g>

      {/* Box 2: Zero Correlation */}
      <g transform="translate(192, 10)">
        <rect width="155" height="130" rx="8" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
        <text x="77" y="20" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">Zero / Uncorrelated (r ≈ 0)</text>
        {/* random scatter points */}
        <circle cx="35" cy="45" r="3" fill="#cbd5e1" />
        <circle cx="120" cy="40" r="3" fill="#cbd5e1" />
        <circle cx="75" cy="70" r="3" fill="#cbd5e1" />
        <circle cx="45" cy="100" r="3" fill="#cbd5e1" />
        <circle cx="115" cy="95" r="3" fill="#cbd5e1" />
        <circle cx="80" cy="42" r="3" fill="#cbd5e1" />
        <circle cx="95" cy="110" r="3" fill="#cbd5e1" />
        <circle cx="55" cy="65" r="3" fill="#cbd5e1" />
        <text x="77" y="125" fill="#94a3b8" fontSize="9" textAnchor="middle">No linear co-movement</text>
      </g>

      {/* Box 3: Positive Correlation */}
      <g transform="translate(370, 10)">
        <rect width="155" height="130" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
        <text x="77" y="20" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Positive (r = +0.9)</text>
        {/* upward scatter points */}
        <circle cx="30" cy="110" r="3" fill="#34d399" />
        <circle cx="50" cy="92" r="3" fill="#34d399" />
        <circle cx="75" cy="72" r="3" fill="#34d399" />
        <circle cx="95" cy="58" r="3" fill="#34d399" />
        <circle cx="115" cy="42" r="3" fill="#34d399" />
        <circle cx="135" cy="30" r="3" fill="#34d399" />
        <line x1="25" y1="115" x2="140" y2="25" stroke="#10b981" strokeWidth="2" strokeDasharray="3 2" />
        <text x="77" y="125" fill="#94a3b8" fontSize="9" textAnchor="middle">e.g. Income ↑ Output ↑</text>
      </g>
    </svg>
  );
}

// ─── SVG DIAGRAM 3: INDEX NUMBERS WEIGHTING TREE ───
function IndexNumbersWeightingSVG() {
  return (
    <svg viewBox="0 0 540 150" className="w-full h-auto bg-slate-950/80 rounded-xl p-2 border border-slate-800" aria-label="Index Numbers Synthesis Diagram">
      {/* Laspeyre Node */}
      <g transform="translate(20, 15)">
        <rect width="150" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
        <text x="75" y="24" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">Laspeyre’s Index (L)</text>
        <text x="75" y="44" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">Σ(p1·q0) / Σ(p0·q0)</text>
        <text x="75" y="60" fill="#6ee7b7" fontSize="9" textAnchor="middle">Weights: Base Year (q0)</text>
      </g>

      {/* Paasche Node */}
      <g transform="translate(370, 15)">
        <rect width="150" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
        <text x="75" y="24" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">Paasche’s Index (P)</text>
        <text x="75" y="44" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">Σ(p1·q1) / Σ(p0·q1)</text>
        <text x="75" y="60" fill="#a5b4fc" fontSize="9" textAnchor="middle">Weights: Current Year (q1)</text>
      </g>

      {/* Connecting Flow Lines */}
      <path d="M 170 50 Q 270 50 270 95" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
      <path d="M 370 50 Q 270 50 270 95" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 2" />

      {/* Fisher Ideal Node */}
      <g transform="translate(170, 95)">
        <rect width="200" height="48" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
        <text x="100" y="20" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">Fisher’s Ideal Index (F)</text>
        <text x="100" y="38" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">F = √( L × P )</text>
      </g>

      <circle cx="270" cy="50" r="4" fill="#fbbf24" />
      <text x="270" y="42" fill="#fbbf24" fontSize="9" textAnchor="middle">Geometric Mean</text>
    </svg>
  );
}

// ─── MAIN COMPONENT ───
export default function C11_EconomicsMeasuresDispersionDefinitionSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['economics'] || { name: 'Economics', emoji: '📈', color: 'emerald' };

  // ─── STATE MANAGEMENT ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });

  // Discovery & Predict-Check State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Hints & Visual Feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection Responses
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');
  const [reflectionsSaved, setReflectionsSaved] = useState(false);

  // Interactive Lab Sliders & Live State
  const [biharMaxIncome, setBiharMaxIncome] = useState(380); // in thousands
  const [biharMinIncome, setBiharMinIncome] = useState(50);
  const [sdDataPoints, setSdDataPoints] = useState([15, 20, 25, 30, 60]);
  const [punjabMean, setPunjabMean] = useState(15000);
  const [punjabSD, setPunjabSD] = useState(3000);
  const [biharMean, setBiharMean] = useState(8000);
  const [biharSD, setBiharSD] = useState(2000);
  const [liveCorrSlider, setLiveCorrSlider] = useState(0.85);
  const [riceBaseP, setRiceBaseP] = useState(40);
  const [riceCurrP, setRiceCurrP] = useState(60);
  const [riceBaseQ, setRiceBaseQ] = useState(10);
  const [riceCurrQ, setRiceCurrQ] = useState(8);
  const [wheatBaseP, setWheatBaseP] = useState(25);
  const [wheatCurrP, setWheatCurrP] = useState(35);
  const [wheatBaseQ, setWheatBaseQ] = useState(8);
  const [wheatCurrQ, setWheatCurrQ] = useState(6);
  const [lineSlopeX2, setLineSlopeX2] = useState(5);
  const [lineSlopeY2, setLineSlopeY2] = useState(325);

  // Interactive Challenge States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT MASTERY CHECK ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE MASTERY EFFECT ───
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

  // ─── CANVAS ANIMATION EFFECT ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animFrame: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.strokeStyle = '#10b98133';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 4) {
        const y = canvas.height / 2 + Math.sin(x * 0.03 + t) * 8 * Math.exp(-Math.pow((x - canvas.width / 2) / 80, 2));
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animFrame = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animFrame);
  }, [phase]);

  // ─── REAL TIME CALCULATIONS ───
  const rangeBihar = biharMaxIncome - biharMinIncome;
  const coeffRangeBihar = (biharMaxIncome - biharMinIncome) / (biharMaxIncome + biharMinIncome);

  const sdCalculated = useMemo(() => {
    const n = sdDataPoints.length;
    const mean = sdDataPoints.reduce((a, b) => a + b, 0) / n;
    const variance = sdDataPoints.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
    return { mean, variance, sd: Math.sqrt(variance) };
  }, [sdDataPoints]);

  const cvPunjabCalc = useMemo(() => ((punjabSD / punjabMean) * 100).toFixed(1), [punjabSD, punjabMean]);
  const cvBiharCalc = useMemo(() => ((biharSD / biharMean) * 100).toFixed(1), [biharSD, biharMean]);

  const indexNumbersCalc = useMemo(() => {
    const p0q0 = riceBaseP * riceBaseQ + wheatBaseP * wheatBaseQ;
    const p1q0 = riceCurrP * riceBaseQ + wheatCurrP * wheatBaseQ;
    const p0q1 = riceBaseP * riceCurrQ + wheatBaseP * wheatCurrQ;
    const p1q1 = riceCurrP * riceCurrQ + wheatCurrP * wheatCurrQ;

    const laspeyre = p0q0 > 0 ? (p1q0 / p0q0) * 100 : 100;
    const paasche = p0q1 > 0 ? (p1q1 / p0q1) * 100 : 100;
    const fisher = Math.sqrt(laspeyre * paasche);

    return { p0q0, p1q0, p0q1, p1q1, laspeyre, paasche, fisher };
  }, [riceBaseP, riceCurrP, riceBaseQ, riceCurrQ, wheatBaseP, wheatCurrP, wheatBaseQ, wheatCurrQ]);

  // Live scatter chart data
  const scatterPlotData = useMemo(() => {
    const basePoints = [
      { x: 10, base: 20 },
      { x: 20, base: 35 },
      { x: 30, base: 50 },
      { x: 40, base: 65 },
      { x: 50, base: 80 },
    ];
    return basePoints.map((pt) => {
      const y = liveCorrSlider >= 0
        ? pt.base * liveCorrSlider + (1 - liveCorrSlider) * (50 + Math.sin(pt.x) * 20)
        : 100 - pt.base * Math.abs(liveCorrSlider) + (1 - Math.abs(liveCorrSlider)) * (50 + Math.cos(pt.x) * 20);
      return { x: pt.x, y: Math.round(y) };
    });
  }, [liveCorrSlider]);

  // ─── CALLBACK HANDLERS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        const nextHint = challenge.hints[0] || 'Take a close look at the question and formula.';
        setCurrentHint(nextHint);
        setShowHint(true);
        setHintCount(1);
        audioManager.play('hint');
        speechManager.speak('Need a quick hint? Check this out.');
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, challenge]);

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
      speechManager.speak('Let us inspect the full step-by-step solution together.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const correct = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(correct);
    setDiscoveryAnswered(true);
    audioManager.play(correct ? 'success' : 'pop');
    speechManager.speak(correct ? 'Spot on! Dispersion reveals the truth.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Let us explore dispersion, correlation, and indices.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('You now have full access to the Macroeconomic Sandbox. Experiment freely without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Mode initiated. Apply your econometric skills to solve the tasks.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Now verify with the live controls below.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const correct = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(correct ? 'success' : 'pop');
    speechManager.speak(correct ? 'Excellent statistical observation!' : 'Check the scatter trend line again.');
  }, []);

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

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === challenge.sortItems?.length ? [...prev] : challenge.sortItems!.map((_, i) => i);
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const ans = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    const isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Perfect sequence! Steps arranged logically.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      if (hintCount < 3) showNextHint();
    }
  }, [sortArrangement, challenge, hintCount, showNextHint]);

  const handleCompleteSimulation = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding! You have completed the comprehensive Economics dispersion simulation!');
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
      handleCompleteSimulation();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSimulation]);

  const handleAnswer = useCallback((ans: number | Record<string, string> | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = ans === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'numeric') {
      const parsed = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
      isCorrect = Math.abs(parsed - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.05);
    } else if (challenge.type === 'construct') {
      isCorrect = ans === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding analytical thinking.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us review the step-by-step mathematical derivation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700/50 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                ISC Class 11 • Commerce
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                11 Concepts Covered
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <nav aria-label="Simulation Phases" className="flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800 gap-1 text-xs font-semibold">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              aria-label={`Go to ${p} phase`}
              className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </nav>
      </motion.header>

      {/* ─── CANVAS WAVE INDICATOR ─── */}
      <canvas ref={canvasRef} width={600} height={24} className="w-full mb-3 rounded-lg opacity-80" />

      {/* ══════════════════════════════════════════════════════════════════
          1. DISCOVERY PHASE (Curiosity Hook)
         ══════════════════════════════════════════════════════════════════ */}
      {phase === 'discovery' && (
        <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 rounded-3xl border border-emerald-800/40 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
              <span>🏛️</span>
              <span>{SCENARIO.title}</span>
            </div>
            <p className="text-slate-200 text-base leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-sm mt-3 pt-3 border-t border-slate-800/80">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-xs font-bold uppercase tracking-wider">
                Discovery Curiosity Hook
              </span>
              <span className="text-xs text-slate-400">(Not graded — test your intuition!)</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Discovery option ${i + 1}: ${opt}`}
                  className={`p-4 text-left rounded-2xl border transition-all text-sm font-medium ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-emerald-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <p className={discoveryCorrect ? 'text-emerald-400 text-sm font-semibold mb-3' : 'text-amber-400 text-sm font-semibold mb-3'}>
                  {discoveryCorrect ? '✓ Spot on! Equal means do not mean equal spreads.' : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/30 flex items-center gap-2"
                  >
                    <span>Enter Guided Labs</span>
                    <span>→</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          2. EXPLORATION PHASE (5 Interactive Labs + 3 Topic SVGs)
         ══════════════════════════════════════════════════════════════════ */}
      {phase === 'explore' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono px-3 py-1 bg-emerald-950 text-emerald-400 rounded-full border border-emerald-800">
              Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-6 bg-emerald-500' : 'w-2 bg-slate-800'
                  }`}
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
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-5"
            >
              <div>
                <h2 className="text-xl font-black text-emerald-300">{EXPLORATION_STEPS[currentSlide].title}</h2>
                <p className="text-amber-300 text-sm mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── LAB 1: RANGE & SPREAD DYNAMICS (Includes Topic SVG 1) ─── */}
              {currentSlide === 0 && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  {/* TOPIC SVG 1: Range & Quartile Anatomy */}
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Concept Schematic: Measures of Spread</span>
                    <div className="mt-2">
                      <DispersionDiagramSVG />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Karnataka Card */}
                    <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
                      <h4 className="text-sm font-bold text-emerald-400">Karnataka (Clustered Data)</h4>
                      <p className="text-xs text-slate-400 mt-1">Incomes: ₹150k, ₹160k, ₹170k, ₹180k, ₹190k</p>
                      <div className="mt-3 flex justify-between items-center text-xs font-mono">
                        <span className="text-slate-400">Mean: ₹170,000</span>
                        <span className="text-emerald-300 font-bold">Range: ₹40,000</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[20%]" />
                      </div>
                    </div>

                    {/* Bihar Card with Live Outlier Slider */}
                    <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
                      <h4 className="text-sm font-bold text-amber-400">Bihar (Scattered Data + Outlier)</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Incomes: ₹{biharMinIncome}k, ₹60k, ₹170k, ₹280k, ₹{biharMaxIncome}k
                      </p>
                      <div className="mt-3 flex justify-between items-center text-xs font-mono">
                        <span className="text-slate-400">Min: ₹{biharMinIncome}k | Max: ₹{biharMaxIncome}k</span>
                        <span className="text-amber-300 font-bold">Range: ₹{rangeBihar}k</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-amber-500"
                          animate={{ width: `${Math.min(100, (rangeBihar / 600) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Outlier Control */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs text-slate-300 font-mono">
                      <span>Adjust Bihar’s Highest Income Outlier (L):</span>
                      <span className="text-amber-400 font-bold">₹{biharMaxIncome},000</span>
                    </div>
                    <input
                      type="range"
                      min={200}
                      max={1000}
                      step={20}
                      value={biharMaxIncome}
                      onChange={(e) => setBiharMaxIncome(Number(e.target.value))}
                      aria-label="Adjust Bihar Highest Income Outlier"
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Coeff. of Range: <strong className="text-white">{coeffRangeBihar.toFixed(3)}</strong></span>
                      <span className="text-slate-500">Notice: Range increases drastically from a single extreme value!</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: STANDARD DEVIATION ENGINE ─── */}
              {currentSlide === 1 && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Arithmetic Mean (x̄)</p>
                      <p className="text-lg font-black text-emerald-400 font-mono">₹{sdCalculated.mean.toFixed(1)}k</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Variance (σ²)</p>
                      <p className="text-lg font-black text-gold-400 font-mono">{sdCalculated.variance.toFixed(1)}</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Standard Deviation (σ)</p>
                      <p className="text-lg font-black text-amber-400 font-mono">₹{sdCalculated.sd.toFixed(2)}k</p>
                    </div>
                  </div>

                  {/* Dynamic Deviations Visualization */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-slate-300 mb-3">5 Wage Observations & Their Squared Deviations:</p>
                    <div className="space-y-2">
                      {sdDataPoints.map((val, idx) => {
                        const dev = val - sdCalculated.mean;
                        const sqDev = Math.pow(dev, 2);
                        return (
                          <div key={idx} className="flex items-center gap-3 text-xs font-mono">
                            <span className="w-16 text-slate-400">W{idx + 1}: ₹{val}k</span>
                            <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden flex items-center">
                              <motion.div
                                className={`h-full ${dev >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                                animate={{ width: `${Math.min(100, Math.abs(dev) * 3)}%` }}
                              />
                            </div>
                            <span className="w-24 text-right text-slate-300">
                              (x−x̄)² = {sqDev.toFixed(0)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: RELATIVE VARIABILITY (CV) ─── */}
              {currentSlide === 2 && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800/60">
                      <p className="text-sm font-bold text-gold-300 mb-3">{PREDICTION_QUESTIONS[1].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Prediction option ${i + 1}: ${opt}`}
                            className="p-2.5 text-left bg-slate-900 border border-slate-800 hover:border-gold-500 rounded-xl text-xs text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Punjab Card */}
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-bold text-emerald-400">Punjab Rural Incomes</h4>
                          <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">
                            CV = {cvPunjabCalc}%
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 space-y-1">
                          <div className="flex justify-between">
                            <span>Mean (x̄): ₹{punjabMean.toLocaleString()}</span>
                            <span>SD (σ): ₹{punjabSD.toLocaleString()}</span>
                          </div>
                          <input
                            type="range"
                            min={1000}
                            max={6000}
                            step={200}
                            value={punjabSD}
                            onChange={(e) => setPunjabSD(Number(e.target.value))}
                            aria-label="Adjust Punjab SD"
                            className="w-full accent-emerald-500 cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Bihar Card */}
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-bold text-amber-400">Bihar Rural Incomes</h4>
                          <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">
                            CV = {cvBiharCalc}%
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 space-y-1">
                          <div className="flex justify-between">
                            <span>Mean (x̄): ₹{biharMean.toLocaleString()}</span>
                            <span>SD (σ): ₹{biharSD.toLocaleString()}</span>
                          </div>
                          <input
                            type="range"
                            min={1000}
                            max={4000}
                            step={100}
                            value={biharSD}
                            onChange={(e) => setBiharSD(Number(e.target.value))}
                            aria-label="Adjust Bihar SD"
                            className="w-full accent-amber-500 cursor-pointer"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── LAB 4: SCATTER DIAGRAM & CORRELATION DYNAMICS (Includes Topic SVG 2) ─── */}
              {currentSlide === 3 && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  {/* TOPIC SVG 2: Correlation Spectrum */}
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Concept Schematic: Correlation Spectrum</span>
                    <div className="mt-2">
                      <CorrelationSpectrumSVG />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs text-slate-300 font-mono">
                      Correlation Slider (r): <strong className="text-emerald-400">{liveCorrSlider.toFixed(2)}</strong>
                    </span>
                    <span className="text-xs px-2 py-1 bg-slate-900 rounded-lg text-slate-400 font-mono">
                      {liveCorrSlider > 0.75 ? 'High Positive' : liveCorrSlider > 0.25 ? 'Moderate Positive' : liveCorrSlider < -0.75 ? 'High Negative' : liveCorrSlider < -0.25 ? 'Moderate Negative' : 'Low / Zero'}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={-1.0}
                    max={1.0}
                    step={0.05}
                    value={liveCorrSlider}
                    onChange={(e) => setLiveCorrSlider(Number(e.target.value))}
                    aria-label="Set Pearson Correlation r"
                    className="w-full accent-emerald-500 cursor-pointer"
                  />

                  {/* Recharts Scatter/Line Plot */}
                  <div className="h-44 w-full bg-slate-900 rounded-xl p-2 border border-slate-800">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={scatterPlotData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="x" stroke="#94a3b8" />
                        <YAxis domain={[0, 100]} stroke="#94a3b8" />
                        <Tooltip />
                        <Line type="monotone" dataKey="y" stroke="#10b981" strokeWidth={3} dot={{ r: 5, fill: '#34d399' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Observation Question */}
                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-xs font-bold text-slate-200 mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            aria-label={`Observation option ${i + 1}: ${opt}`}
                            className="p-2 text-left bg-slate-950 border border-slate-800 hover:border-emerald-500 rounded-lg text-xs text-slate-300"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── LAB 5: INDEX NUMBER BASKET & FORMULAS (Includes Topic SVG 3) ─── */}
              {currentSlide === 4 && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  {/* TOPIC SVG 3: Index Numbers Weighting Synthesis */}
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Concept Schematic: Index Formula Synthesis</span>
                    <div className="mt-2">
                      <IndexNumbersWeightingSVG />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Laspeyre (q0 weights)</p>
                      <p className="text-lg font-black text-emerald-400 font-mono">{indexNumbersCalc.laspeyre.toFixed(1)}</p>
                      <p className="text-[10px] text-slate-500">Fixed base basket (upward bias)</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Paasche (q1 weights)</p>
                      <p className="text-lg font-black text-gold-400 font-mono">{indexNumbersCalc.paasche.toFixed(1)}</p>
                      <p className="text-[10px] text-slate-500">Current basket (downward bias)</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Fisher’s Ideal (√(L × P))</p>
                      <p className="text-lg font-black text-amber-400 font-mono">{indexNumbersCalc.fisher.toFixed(1)}</p>
                      <p className="text-[10px] text-slate-500">Satisfies both reversal tests</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <p className="font-bold text-emerald-300">Rice: Base p0=₹{riceBaseP}, q0={riceBaseQ}kg</p>
                      <label className="text-[11px] text-slate-400 flex justify-between">
                        <span>Current Price p1: ₹{riceCurrP}</span>
                        <input
                          type="range"
                          min={30}
                          max={80}
                          value={riceCurrP}
                          onChange={(e) => setRiceCurrP(Number(e.target.value))}
                          aria-label="Set Rice Current Price"
                          className="w-24 accent-emerald-500"
                        />
                      </label>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <p className="font-bold text-gold-300">Wheat: Base p0=₹{wheatBaseP}, q0={wheatBaseQ}kg</p>
                      <label className="text-[11px] text-slate-400 flex justify-between">
                        <span>Current Price p1: ₹{wheatCurrP}</span>
                        <input
                          type="range"
                          min={20}
                          max={60}
                          value={wheatCurrP}
                          onChange={(e) => setWheatCurrP(Number(e.target.value))}
                          aria-label="Set Wheat Current Price"
                          className="w-24 accent-gold-500"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Lab Footer Navigation */}
              <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  aria-label="Previous Lab Step"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    aria-label="Next Lab Step"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-950"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    aria-label="Advance to Free Sandbox"
                    className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-950"
                  >
                    Open Full Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          3. SANDBOX / FREE PLAY MODE
         ══════════════════════════════════════════════════════════════════ */}
      {phase === 'sandbox' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-slate-900 via-gold-950/40 to-slate-900 rounded-3xl border border-gold-800/40 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-gold-300">Macroeconomic Statistics Sandbox</h2>
              <p className="text-xs text-slate-400 mt-1">Free play: manipulate macro parameters, verify dispersion formulas, and check linear trends.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Ready for Challenges"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-900/40"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Linear Equation Live Calculator (Node 080) */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400">Mathematical Tool: GDP Straight Line Slope</h3>
              <p className="text-xs text-slate-400">Point 1: (0, 189) in 2018-19. Adjust Point 2 (Year X, GDP Y):</p>
              <div className="flex gap-4 text-xs">
                <label className="flex-1">
                  <span className="text-slate-400">Year X2: {lineSlopeX2}</span>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={lineSlopeX2}
                    onChange={(e) => setLineSlopeX2(Number(e.target.value))}
                    aria-label="Adjust X2 year"
                    className="w-full accent-emerald-500"
                  />
                </label>
                <label className="flex-1">
                  <span className="text-slate-400">GDP Y2 (₹ lakh cr): {lineSlopeY2}</span>
                  <input
                    type="range"
                    min={200}
                    max={450}
                    value={lineSlopeY2}
                    onChange={(e) => setLineSlopeY2(Number(e.target.value))}
                    aria-label="Adjust Y2 GDP"
                    className="w-full accent-emerald-500"
                  />
                </label>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-emerald-300">
                Slope m = (Y2 − 189) / (X2 − 0) = {((lineSlopeY2 - 189) / lineSlopeX2).toFixed(2)} lakh cr/yr
                <div className="text-slate-400 text-[11px] mt-1">Equation: Y = {((lineSlopeY2 - 189) / lineSlopeX2).toFixed(1)}X + 189</div>
              </div>
            </div>

            {/* Quick Dispersion Snapshot */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-amber-400">Dispersion Quick Reference</h3>
              <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
                <li>• Range: L − S (absolute, simple)</li>
                <li>• Quartile Dev (QD): (Q3 − Q1) / 2 (ignores outliers)</li>
                <li>• Mean Dev (MD): Σ|x − Median| / n (minimum absolute spread)</li>
                <li>• Standard Dev (σ): √[Σ(x − x̄)² / n] (most reliable)</li>
                <li>• Coeff of Variation: (σ / x̄) × 100 (unit-free relative %)</li>
              </ul>
            </div>
          </div>
        </motion.section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          4. CHALLENGE PHASE (Adaptive BKT + 22 Rich Questions)
         ══════════════════════════════════════════════════════════════════ */}
      {phase === 'challenge' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Header Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : difficulty === 'advanced'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                }`}
              >
                {difficulty}
              </motion.span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-mono">
                Competency: {challenge.competencyLevel}
              </span>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Mastery: <span className="text-emerald-400 font-bold capitalize">{masteryLevel}</span>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Main Question Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-3xl border transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-800'
            }`}
          >
            <h2 className="text-lg md:text-xl font-bold text-white mb-4 leading-relaxed">{challenge.question}</h2>

            {/* ─── MCQ RENDERING (Classify / Distinguish / Match) ─── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`p-4 text-left rounded-2xl border transition-all text-sm font-medium ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/90 border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-emerald-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* ─── NUMERIC CHALLENGE RENDERING ─── */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value..."
                    aria-label="Numeric answer input"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-sm font-bold text-slate-400 font-mono">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit numeric answer"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm disabled:opacity-50"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── DRAG-LABEL CHALLENGE RENDERING ─── */}
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
                      role="button"
                      aria-label={`Draggable label: ${item.label}`}
                      className="px-3 py-1.5 bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'box_range', title: 'L − S' },
                    { id: 'box_sd', title: '√[Σ(x−x̄)² / n]' },
                    { id: 'box_qd', title: '(Q3 − Q1) / 2' },
                    { id: 'box_cv', title: '(σ / x̄) × 100' },
                  ].map((box) => (
                    <div
                      key={box.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(box.id)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px]"
                    >
                      <span className="text-xs font-mono text-slate-400">{box.title}</span>
                      <span className="text-sm font-bold text-emerald-300 mt-1">
                        {droppedLabels[box.id] || '[ Drop Label Here ]'}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    aria-label="Check dropped labels"
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs"
                  >
                    Check Mapping
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── DRAG-SORT CHALLENGE RENDERING ─── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag and re-order cards from step 1 to final step:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      role="button"
                      aria-label={`Sort step ${displayIdx + 1}: ${item}`}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="px-2 py-1 bg-slate-800 text-emerald-400 font-bold rounded-md">{displayIdx + 1}</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-end pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    aria-label="Check sort sequence"
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs"
                  >
                    Check Sequence
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── CONSTRUCT CHALLENGE RENDERING ─── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add formula part ${part}`}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white text-xs font-bold rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex items-center gap-2 flex-wrap font-mono">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-3 py-1 bg-gold-900/80 text-white text-xs rounded-lg flex items-center gap-1">
                      {part}
                      <button
                        onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))}
                        className="text-rose-400 font-bold ml-1 hover:text-rose-300"
                        aria-label={`Remove part ${part}`}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click parts above to build equation...</span>}
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    aria-label="Check constructed equation"
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs"
                  >
                    Check Equation
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── CLICK-TO-REVEAL STEP-BY-STEP EXPLANATION ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2 text-amber-300 text-sm font-bold">
                  <span>💡</span>
                  <span>Step-by-Step Econometric Solution:</span>
                </div>

                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-amber-100 text-xs md:text-sm leading-relaxed"
                  >
                    <strong className="text-amber-400">{i + 1}.</strong> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="flex justify-between items-center pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Show next explanation step"
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : <div />}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Proceed to next challenge"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-950"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'View Final Results →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          5. COMPLETION, MASTERY & REFLECTION SECTION
         ══════════════════════════════════════════════════════════════════ */}
      {phase === 'complete' && (
        <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-900 rounded-3xl border border-emerald-700/60 text-center space-y-3">
            <h2 className="text-3xl font-black text-white">Simulation Completed!</h2>
            <div className="flex justify-center gap-6 py-2">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <p className="text-xs text-slate-400">Final Score</p>
                <p className="text-2xl font-black text-emerald-400 font-mono">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <p className="text-xs text-slate-400">Mastery Level</p>
                <p className="text-2xl font-black text-teal-400 capitalize">{masteryLevel}</p>
              </div>
            </div>

            {/* Motivational Feedback */}
            <p className="text-sm text-emerald-300 max-w-xl mx-auto font-medium">
              {errors === 0
                ? '🌟 PERFECT SCORE! You have mastered all 11 dispersion, correlation, and index number concepts!'
                : errors <= 3
                ? '👏 Excellent work! You demonstrate high statistical competence for ISC Class 11.'
                : '💪 Solid effort! Every error is a learning stepping stone. Review the misconceptions below to master the topic.'}
            </p>
          </div>

          {/* ─── REQUIRED REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-emerald-800/50 space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤔</span>
              <h3 className="text-lg font-bold text-white">Post-Simulation Reflection</h3>
            </div>
            <p className="text-xs text-slate-400">
              Deepen your learning synthesis by reflecting on these core questions before proceeding to the next unit:
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="block text-xs font-bold text-emerald-400">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  rows={2}
                  value={reflection1}
                  onChange={(e) => setReflection1(e.target.value)}
                  placeholder="e.g. How the sum of absolute deviations is minimised at the median, or how Fisher's index balances substitution bias..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="block text-xs font-bold text-emerald-400">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  rows={2}
                  value={reflection2}
                  onChange={(e) => setReflection2(e.target.value)}
                  placeholder="e.g. The mean is like the average score in a match, but dispersion tells you if everyone scored evenly or one player carried the whole game..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="block text-xs font-bold text-emerald-400">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  rows={2}
                  value={reflection3}
                  onChange={(e) => setReflection3(e.target.value)}
                  placeholder="e.g. Assessing risk vs return on mutual funds using CV, calculating real salary inflation with CPI, or checking whether study hours correlate with test scores..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setReflectionsSaved(true);
                    audioManager.play('success');
                    speechManager.speak('Your reflective insights have been logged successfully!');
                  }}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-950"
                >
                  {reflectionsSaved ? '✓ Reflections Saved' : 'Save Reflections'}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Misconception Review */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-3xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Profile:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
                      <p className="text-xs font-bold text-rose-400">❌ {m.misconception}</p>
                      <p className="text-xs text-emerald-400">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Review Schedule */}
          <div className="p-5 bg-amber-950/40 rounded-3xl border border-amber-800/50 space-y-2">
            <h3 className="text-sm font-bold text-amber-300">SM-2 Spaced Repetition Memory Schedule:</h3>
            <p className="text-xs text-slate-300">
              Based on your response accuracy, this topic is scheduled for review in{' '}
              <strong className="text-amber-400">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>. Regular retrieval practice cements long-term neural pathways.
            </p>
          </div>

          {/* Real World Policy Activity */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-emerald-400">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ol className="list-decimal list-inside text-xs text-slate-400 space-y-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </motion.section>
      )}

      {/* ─── SIM-ENGINE MODAL COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export { C11_EconomicsMeasuresDispersionDefinitionSim };
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC ECONOMICS NODE IDS (CLASS 11) ─────────────────────────────────────────
const NODE_C11_ECON_060 = 'c11_econ_060'; // Tabular & Bar Diagram
const NODE_C11_ECON_061 = 'c11_econ_061'; // Pie Diagram & Line Graph
const NODE_C11_ECON_062 = 'c11_econ_062'; // Histogram & Frequency Polygon
const NODE_C11_ECON_063 = 'c11_econ_063'; // Ogive Curve (Median determination)
const NODE_C11_ECON_064 = 'c11_econ_064'; // Simple Arithmetic Mean
const NODE_C11_ECON_065 = 'c11_econ_065'; // Weighted & Grouped Mean
const NODE_C11_ECON_066 = 'c11_econ_066'; // Median (Ungrouped & Grouped)
const NODE_C11_ECON_067 = 'c11_econ_067'; // Mode (Ungrouped & Grouped)
const NODE_C11_ECON_068 = 'c11_econ_068'; // Relationship: Mean, Median, Mode
const NODE_C11_ECON_069 = 'c11_econ_069'; // Skewed Distributions (Symmetric, +ve, -ve)

const ALL_NODE_IDS = [
  NODE_C11_ECON_060,
  NODE_C11_ECON_061,
  NODE_C11_ECON_062,
  NODE_C11_ECON_063,
  NODE_C11_ECON_064,
  NODE_C11_ECON_065,
  NODE_C11_ECON_066,
  NODE_C11_ECON_067,
  NODE_C11_ECON_068,
  NODE_C11_ECON_069,
];

// ─── NARRATIVE SCENARIO ───────────────────────────────────��───────────────────
const SCENARIO = {
  title: 'Chief Statistical Officer at MoSPI: Deciphering India’s Economic Pulse',
  intro: 'You are appointed as the Lead Data Analyst for the Ministry of Statistics and Programme Implementation (MoSPI). The Finance Minister requires visual presentations and statistical averages for the upcoming Economic Survey 2024-25.',
  context: 'Your task is to transform raw household consumption expenditure (HCES), industrial output, and sectoral GVA into valid tables, bar diagrams, pies, histograms, ogives, and robust averages (Mean, Median, Mode). You must also identify the skewness in Indian wealth distributions.',
};

// ─── DISCOVERY QUESTION ───────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'In India’s Rural Household Consumption Expenditure Survey, average spending (Mean) is ₹3,773 while the middle household (Median) spends ₹2,466. Why does the Mean exceed the Median by over 50%?',
  options: [
    'A arithmetic calculation error occurred in MoSPI data collection',
    'A small number of high-spending affluent households pull the Mean upward (Positive Skew)',
    'Rural spending is uniformly distributed, so Mean and Median are interchangeable',
    'The survey used class limits instead of class marks, understating the Median',
  ],
  correctIndex: 1,
  hintAfter: 'Don’t worry if you missed it! You will see in real time how extreme values pull the balance point of a distribution.',
};

// ─── CHALLENGE INTERFACE ──────────────────────────────────────────────────────
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE ALIGNED) ─────────────────────
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c11_econ_060)
  {
    id: 'ch_01',
    nodeId: NODE_C11_ECON_060,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which component of a formal statistical table is placed on the left side to identify the rows?',
    options: ['Caption (Column Headings)', 'Stubs (Row Headings)', 'Headnote', 'Source Note'],
    correctIndex: 1,
    explanation: 'Stubs are the row labels on the extreme left. Captions are column labels at the top. A headnote appears under the title, and the source note is at the bottom.',
    hints: [
      'Think of what labels the horizontal rows.',
      'Captions label columns; another term labels rows.',
      'Row designations on the left margin are called Stubs.',
    ],
    misconceptionIndex: 1,
  },
  // 2. Foundation - Understanding (c11_econ_060)
  {
    id: 'ch_02',
    nodeId: NODE_C11_ECON_060,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why MUST a Bar Diagram have gaps between bars, whereas a Histogram has touching bars?',
    options: [
      'Bar diagrams represent discrete or categorical data; histograms represent continuous contiguous intervals.',
      'Bar diagrams are drawn by hand; histograms are rendered by computers.',
      'Bar diagrams cannot show values greater than 100.',
      'Histograms only display time-series data.',
    ],
    correctIndex: 0,
    explanation: 'Gaps in a bar diagram emphasize that categories (like Agriculture, Industry, Services) are separate entities. Histograms represent continuous class intervals where the upper limit of one class is the lower limit of the next.',
    hints: [
      'Look at whether the data variable is discrete categories or continuous intervals.',
      'Continuous variables have adjacent boundaries with no gaps between them.',
      'Bar diagrams are for discrete/categorical data; histograms are for continuous grouped data.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation - Drag-Label (c11_econ_060)
  {
    id: 'ch_03',
    nodeId: NODE_C11_ECON_060,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Drag the 4 key components of a statistical table to their correct structural positions.',
    dragItems: [
      { label: 'Title & Headnote', targetId: 'top' },
      { label: 'Stubs (Row Headings)', targetId: 'left' },
      { label: 'Caption (Column Headings)', targetId: 'header' },
      { label: 'Source Note & Footnote', targetId: 'bottom' },
    ],
    correctMapping: {
      top: 'Title & Headnote',
      left: 'Stubs (Row Headings)',
      header: 'Caption (Column Headings)',
      bottom: 'Source Note & Footnote',
    },
    explanation: 'Every ISC-standard statistical table must feature Title/Headnote at the top, Captions at the column tops, Stubs along the left margin, and Footnotes/Source Notes at the baseline.',
    hints: [
      'The Title and units (headnote) sit at the very top.',
      'Row labels belong on the left; column labels are column headers.',
      'Source references and footnotes belong at the very bottom.',
    ],
    misconceptionIndex: 1,
  },
  // 4. Foundation - Recall (c11_econ_061)
  {
    id: 'ch_04',
    nodeId: NODE_C11_ECON_061,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'The Union Budget allocates 25% of its total expenditure to Interest Payments. Calculate the sector angle for a Pie Diagram in degrees (°).',
    correctAnswer: 90,
    tolerance: 0.5,
    unit: 'degrees',
    explanation: 'Sector Angle = (Component Share / Total) × 360°. Here: (25 / 100) × 360° = 90°.',
    hints: [
      'A full circle encompasses 360 degrees, not 100.',
      'Multiply the percentage (25%) or fraction (0.25) by 360°.',
      '0.25 × 360 = 90°.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Foundation - Understanding (c11_econ_061)
  {
    id: 'ch_05',
    nodeId: NODE_C11_ECON_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When plotting India’s GDP growth rate from 2018-19 to 2023-24 on a Line Graph, which variable MUST be placed on the horizontal (X) axis?',
    options: ['Time (Years) as the independent variable', 'GDP growth rate (%)', 'Rupee valuation', 'Inflation index'],
    correctIndex: 0,
    explanation: 'By standard statistical convention, time is the independent variable and is always plotted on the horizontal X-axis. The dependent economic variable is plotted on the Y-axis.',
    hints: [
      'Think about which variable progresses steadily and independently.',
      'Independent variables belong on the X-axis.',
      'Time (Years) always goes on the X-axis.',
    ],
    misconceptionIndex: 3,
  },
  // 6. Foundation - Recall (c11_econ_064)
  {
    id: 'ch_06',
    nodeId: NODE_C11_ECON_064,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Five casual workers in Surat earn daily wages of ₹280, ₹320, ₹350, ₹380, and ₹420. Compute the Simple Arithmetic Mean (₹).',
    correctAnswer: 350,
    tolerance: 0.5,
    unit: '₹',
    explanation: 'Sum = 280 + 320 + 350 + 380 + 420 = 1750. Mean = 1750 / 5 = ₹350.',
    hints: [
      'Add all 5 daily wage figures together.',
      'Sum = 1750.',
      'Divide 1750 by 5 to get ₹350.',
    ],
  },
  // 7. Foundation - Understanding (c11_econ_064)
  {
    id: 'ch_07',
    nodeId: NODE_C11_ECON_064,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the sum of deviations of individual observations from their arithmetic mean: Σ(x - x̄)?',
    options: ['Always equals 0', 'Equals the total sample size n', 'Equals the variance', 'Always equals 1'],
    correctIndex: 0,
    explanation: 'The arithmetic mean acts as the physical center of gravity of the data; the positive and negative deviations exactly balance, so Σ(x - x̄) = 0.',
    hints: [
      'The mean is the exact balance point of a dataset.',
      'Negative deviations below the mean cancel out positive deviations above it.',
      'The algebraic sum of deviations from the mean is always zero.',
    ],
  },
  // 8. Standard - Drag-Sort (c11_econ_062)
  {
    id: 'ch_08',
    nodeId: NODE_C11_ECON_062,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of steps to construct a closed Frequency Polygon from grouped wage data.',
    sortItems: [
      'Plot adjacent rectangular bars touching each other on class boundaries (Histogram)',
      'Mark midpoints (class marks) on the top edge of each histogram bar',
      'Join consecutive midpoints with straight line segments',
      'Extend lines to midpoints of imaginary adjacent classes with frequency zero at the baseline',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'A frequency polygon is created by erecting a histogram, plotting class midpoints, connecting them with line segments, and closing the figure with two zero-frequency baseline anchors.',
    hints: [
      'Start with the visual histogram bars.',
      'Identify the top-middle point of each bar next.',
      'Connect the midpoints, and lastly anchor to the baseline to close the polygon.',
    ],
    misconceptionIndex: 4,
  },
  // 9. Standard - Application (c11_econ_062)
  {
    id: 'ch_09',
    nodeId: NODE_C11_ECON_062,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a wage distribution, standard class width is ₹500. A wide class ₹1500-₹2500 (width ₹1000) has a frequency of 14 workers. What is its adjusted height for the histogram?',
    correctAnswer: 7,
    tolerance: 0.1,
    unit: 'frequency density',
    explanation: 'Adjusted Height = Frequency × (Standard Width / Actual Width) = 14 × (500 / 1000) = 7. This ensures the area of the bar remains proportional to frequency.',
    hints: [
      'When class width is doubled, raw frequency must be scaled down to keep bar area true.',
      'Adjusted Height = fi × (Standard Width / Actual Width).',
      '14 × (500 / 1000) = 14 × 0.5 = 7.',
    ],
  },
  // 10. Standard - Understanding (c11_econ_063)
  {
    id: 'ch_10',
    nodeId: NODE_C11_ECON_063,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'When drawing a "Less Than" Ogive curve, which class boundaries are plotted on the horizontal X-axis?',
    options: [
      'Upper class boundaries (since we count cumulative observations up to the top of each class)',
      'Lower class boundaries',
      'Class midpoints (class marks)',
      'Total cumulative frequency N',
    ],
    correctIndex: 0,
    explanation: '"Less than" means cumulative items below a ceiling; thus it must be plotted at the Upper Class Boundary. "More than" ogives use Lower Class Boundaries.',
    hints: [
      'Think: "Less than ₹300" includes all workers earning up to ₹300.',
      'The threshold is the top limit of the class interval.',
      'Less-than uses Upper Boundaries; More-than uses Lower Boundaries.',
    ],
    misconceptionIndex: 5,
  },
  // 11. Standard - Application (c11_econ_063)
  {
    id: 'ch_11',
    nodeId: NODE_C11_ECON_063,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Where the "Less Than" Ogive and "More Than" Ogive intersect on the same graph paper, the X-coordinate of this intersection gives which statistical measure?',
    options: ['The Median of the distribution', 'The Arithmetic Mean', 'The Mode', 'The Standard Deviation'],
    correctIndex: 0,
    explanation: 'The intersection of less-than and more-than ogives occurs at cumulative frequency N/2 (50% of the sample). Its X-coordinate corresponds exactly to the Median.',
    hints: [
      'The intersection splits the total cumulative frequency exactly in half (N/2).',
      'The 50th percentile (middle position) is known as...',
      'The X-coordinate gives the graphical Median.',
    ],
  },
  // 12. Standard - Numeric Weighted Mean (c11_econ_065)
  {
    id: 'ch_12',
    nodeId: NODE_C11_ECON_065,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An ISC student scores 80 in Economics Theory (weight = 70%) and 20 in the Project component (weight = 30%). Calculate their Weighted Arithmetic Mean mark.',
    correctAnswer: 62,
    tolerance: 0.2,
    unit: 'marks',
    explanation: 'x̄w = (80 × 0.70 + 20 × 0.30) / (0.70 + 0.30) = (56 + 6) / 1.0 = 62 marks.',
    hints: [
      'Multiply each component score by its corresponding weight.',
      'Theory: 80 × 0.7 = 56; Project: 20 × 0.3 = 6.',
      'Sum the weighted products: 56 + 6 = 62.',
    ],
  },
  // 13. Standard - Step-Deviation (c11_econ_065)
  {
    id: 'ch_13',
    nodeId: NODE_C11_ECON_065,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Using step-deviation: Assumed Mean A = 325, common width h = 50, total frequency N = 20, and Σ(fi × ui) = 8. What is the grouped arithmetic mean x̄?',
    correctAnswer: 345,
    tolerance: 0.5,
    unit: '₹',
    explanation: 'x̄ = A + [Σ(fi × ui) / N] × h = 325 + [8 / 20] × 50 = 325 + 0.4 × 50 = 325 + 20 = 345.',
    hints: [
      'Use the formula x̄ = A + (Σfi ui / N) × h.',
      'First calculate (8 / 20) × 50 = 20.',
      'Add the correction (20) to Assumed Mean 325 to get 345.',
    ],
    misconceptionIndex: 6,
  },
  // 14. Standard - Grouped Median (c11_econ_066)
  {
    id: 'ch_14',
    nodeId: NODE_C11_ECON_066,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Given N = 20 (so N/2 = 10). Median class is 300-350 with lower limit L = 300, preceding CF = 6, frequency f = 4, and class width h = 50. Calculate the Median.',
    correctAnswer: 350,
    tolerance: 0.5,
    unit: '₹',
    explanation: 'Median = L + [(N/2 - CF) / f] × h = 300 + [(10 - 6) / 4] × 50 = 300 + (4/4) × 50 = 300 + 50 = 350.',
    hints: [
      'Apply Median = L + [(N/2 - CF)/f] × h.',
      '(10 - 6) / 4 = 4 / 4 = 1.',
      '300 + 1 × 50 = 350.',
    ],
  },
  // 15. Standard - Grouped Mode (c11_econ_067)
  {
    id: 'ch_15',
    nodeId: NODE_C11_ECON_067,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For a modal class 70-80: L = 70, modal frequency f1 = 14, preceding frequency f0 = 9, succeeding frequency f2 = 8, width h = 10. Calculate the Mode.',
    correctAnswer: 74.55,
    tolerance: 0.5,
    unit: 'units',
    explanation: 'Mode = L + [(f1 - f0) / (2f1 - f0 - f2)] × h = 70 + [(14 - 9) / (28 - 9 - 8)] × 10 = 70 + [5 / 11] × 10 = 70 + 4.545 = 74.55.',
    hints: [
      'Mode formula = L + [(f1 - f0) / (2f1 - f0 - f2)] × h.',
      'Numerator = 14 - 9 = 5. Denominator = 28 - 17 = 11.',
      '70 + (5 / 11) × 10 = 70 + 4.55 = 74.55.',
    ],
  },
  // 16. Advanced - Empirical Relationship (c11_econ_068)
  {
    id: 'ch_16',
    nodeId: NODE_C11_ECON_068,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A Pune manufacturing firm finds Mean wage = ₹620 and Mode wage = ₹560 for a moderately skewed unimodal workforce. Estimate the Median wage using Karl Pearson’s formula.',
    correctAnswer: 600,
    tolerance: 1.0,
    unit: '₹',
    explanation: 'Mode = 3 × Median - 2 × Mean ⇒ Median = (Mode + 2 × Mean) / 3 = (560 + 2 × 620) / 3 = (560 + 1240) / 3 = 1800 / 3 = ₹600.',
    hints: [
      'Start with Karl Pearson’s relation: Mode = 3 Median - 2 Mean.',
      'Rearrange for Median: Median = (Mode + 2 Mean) / 3.',
      '(560 + 1240) / 3 = 1800 / 3 = 600.',
    ],
  },
  // 17. Advanced - Evaluation of Pearson Formula (c11_econ_068)
  {
    id: 'ch_17',
    nodeId: NODE_C11_ECON_068,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In MoSPI rural consumption data: Mean = ₹3,773 and Median = ₹2,466. Karl Pearson’s formula yields Mode = 3(2466) - 2(3773) = -₹148. Why did the formula generate this impossible negative consumption value?',
    options: [
      'The empirical formula is valid only for moderately skewed distributions; India’s extreme right-skew (Mean > Median by 53%) violates this condition.',
      'Rural survey respondents failed to report negative incomes.',
      'Karl Pearson’s formula is only valid for physics and biology, never economics.',
      'The data should have been sorted descending instead of ascending.',
    ],
    correctIndex: 0,
    explanation: 'Pearson’s relation is an empirical approximation for mild asymmetry. Extreme positive skewness (top earners stretching the tail far to the right) causes the linear 1:2 ratio to break down completely.',
    hints: [
      'Look at the massive difference between ₹3,773 and ₹2,466 (over 50% gap).',
      'Pearson’s relationship relies on "moderate" unimodal skewness.',
      'Extreme positive skew violates the formula’s fundamental assumption.',
    ],
  },
  // 18. Advanced - Construct Skewed Relationship (c11_econ_069)
  {
    id: 'ch_18',
    nodeId: NODE_C11_ECON_069,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Construct the algebraic inequality chain that characterizes a POSITIVELY SKEWED (Right-Skewed) economic distribution.',
    availableParts: ['Mean', '>', '<', '=', 'Median', 'Mode'],
    targetState: 'Mean > Median > Mode',
    validationHint: 'Select and assemble: Mean, >, Median, >, Mode',
    explanation: 'In a positively skewed distribution, the long tail stretches to the right. The Mean is pulled furthest towards extreme high values, followed by the Median, while the Mode remains at the peak on the left: Mean > Median > Mode.',
    hints: [
      'Remember: the Mean is pulled furthest in the direction of the long tail.',
      'In a right-skewed distribution, high outliers inflate the Mean.',
      'Target order: Mean > Median > Mode.',
    ],
  },
  // 19. Advanced - Skewness Analysis (c11_econ_069)
  {
    id: 'ch_19',
    nodeId: NODE_C11_ECON_069,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'An ISC Economics mock exam reveals: Mean = 58 marks, Median = 64 marks, Mode = 72 marks. What is the skewness, and what does it reveal about exam difficulty?',
    options: [
      'Negatively skewed (Left-skewed, Mean < Median < Mode); the exam was relatively easy, with most scoring high and a few pulling the average down.',
      'Positively skewed; the exam was extremely difficult for everyone.',
      'Symmetric; marks form a perfect bell curve.',
      'Bi-modal distribution with no unique performance trend.',
    ],
    correctIndex: 0,
    explanation: 'Since Mean (58) < Median (64) < Mode (72), the tail extends to the left (negative skew). The peak is at 72 (high marks), meaning the test was relatively easy with only a few very low outlier scores.',
    hints: [
      'Observe the order: Mean (58) < Median (64) < Mode (72).',
      'When the tail extends towards lower numbers, it is negatively skewed.',
      'High peak at 72 means most students did well (easy paper).',
    ],
  },
  // 20. Advanced - Policy Evaluation (c11_econ_069)
  {
    id: 'ch_20',
    nodeId: NODE_C11_ECON_069,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does the World Bank and NSO use the MEDIAN (rather than the Mean) when setting household poverty lines and welfare eligibility thresholds?',
    options: [
      'The Median is a robust positional average unaffected by extreme billionaire wealth at the upper tail, reflecting the true typical household.',
      'The Median is always mathematically larger than the Mean.',
      'The Mean cannot be calculated for samples larger than 1000.',
      'The Median allows governments to artificially increase reported tax revenues.',
    ],
    correctIndex: 0,
    explanation: 'In heavily right-skewed income distributions, billionaires and high-income earners inflate the Mean far above what ordinary citizens earn. The Median represents the exact 50th percentile household.',
    hints: [
      'Consider the effect of extreme wealth (e.g. Mukesh Ambani, Gautam Adani) on the Mean.',
      'Does the Mean represent the "typical" rural worker if a few billionaires raise the sum?',
      'The Median is resistant to extreme outliers and accurately locates the central citizen.',
    ],
  },
  // 21. Advanced - Qualitative Mode Selection (c11_econ_067)
  {
    id: 'ch_21',
    nodeId: NODE_C11_ECON_067,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Maruti Suzuki is planning next month’s manufacturing schedule for the Swift car colors (White, Silver, Red, Blue). Which average MUST the inventory manager use to decide color batches?',
    options: [
      'The Mode (identifying the most frequently demanded color category)',
      'The Arithmetic Mean (computing the average color code numerically)',
      'The Median (finding the middle color after sorting alphabetically)',
      'The Weighted Geometric Mean of color wavelengths',
    ],
    correctIndex: 0,
    explanation: 'Color is a qualitative (nominal) categorical variable. Mean and Median are mathematically undefined for nominal data. The Mode (most popular choice) is the only valid average for inventory and demand planning.',
    hints: [
      'Can you calculate the arithmetic average of "White" and "Red"? No.',
      'Only one average works on non-numerical qualitative categories.',
      'The Mode represents the most popular or highest frequency category.',
    ],
  },
  // 22. Advanced - Match Average to Economic Scenario (c11_econ_064)
  {
    id: 'ch_22',
    nodeId: NODE_C11_ECON_064,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Match each economic dataset to its most statistically appropriate summary measure: (1) Per Capita National Income, (2) Rural Poverty Threshold, (3) Bata Store Shoe Inventory.',
    options: [
      '(1) Mean for aggregate accounting, (2) Median for skewed typical welfare, (3) Mode for inventory demand',
      '(1) Mode, (2) Mean, (3) Median',
      '(1) Median, (2) Mode, (3) Mean',
      '(1) Standard Deviation, (2) Variance, (3) Ogive',
    ],
    correctIndex: 0,
    explanation: 'National Income per capita uses Mean because Mean × Population = Total GDP (algebraic tractability). Welfare poverty lines use Median (robust to skew). Retail inventory uses Mode (most frequent size demanded).',
    hints: [
      'Aggregate GDP requires an average that multiplies back to total output (Mean).',
      'Welfare lines require an average immune to billionaire outliers (Median).',
      'Shoe stocking requires knowing the single most demanded shoe size (Mode).',
    ],
  },
];

// ─── EXPLORATION STEPS (BRILLIANT.ORG INTERACTIVE DISCOVERY) ──────────────────
const EXPLORATION_STEPS = [
  {
    title: '1. Tabular vs Bar Diagram Architecture',
    instruction: 'Drag the Sectoral GVA slider to simulate changes in Agriculture, Industry, and Services. Watch how the statistical table and bar heights update in real time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_ECON_060,
  },
  {
    title: '2. The 360° Circular Geometry of Pie Diagrams',
    instruction: 'Adjust the Union Budget allocation for Defence and Subsidies. Observe how sector degrees are computed as (Component / Total) × 360°.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_ECON_061,
  },
  {
    title: '3. Continuous Histogram & Frequency Polygon',
    instruction: 'Change the frequency of Delhi NCR wage classes. See how touching bars form a Histogram and class midpoints connect to form a closed Polygon.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_ECON_062,
  },
  {
    title: '4. Dual Ogives & Graphical Median Pinpointer',
    instruction: 'Toggle between "Less-Than" and "More-Than" ogive curves. Watch them intersect precisely at the Median wage (N/2 = 50th percentile).',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_ECON_063,
  },
  {
    title: '5. The Tug-of-War: Mean, Median, Mode & Skewness',
    instruction: 'Add a billionaire outlier (₹5,00,000 income) to the sample. Observe how the Mean gets pulled violently to the right while the Median stays anchored.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_ECON_069,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ─────────────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an outlier earning ₹10,00,000 joins a small team of 4 workers earning ₹20,000 each, what will happen to the Mean vs the Median?',
    options: [
      'Mean will skyrocket to over ₹2,00,000, while Median will remain exactly ₹20,000',
      'Both Mean and Median will increase equally by ₹2,00,000',
      'Median will become ₹10,00,000 while Mean stays ₹20,000',
      'Neither Mean nor Median will change',
    ],
    correctIndex: 0,
    verifyInstruction: 'Now drag the "Outlier Income" slider in the interactive visualizer below to see the Mean line surge rightward while the Median barely shifts!',
  },
  {
    question: 'Predict: If the budget share for Subsidies is doubled from 10% to 20%, what is the exact change in its Pie Diagram sector angle?',
    options: [
      'Angle doubles from 36° to 72° (since 0.10 × 360 = 36° and 0.20 × 360 = 72°)',
      'Angle increases by 10° (from 10° to 20°)',
      'Angle increases to 100°',
      'No change because the circle is always 360°',
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the Subsidies share slider to 20% to verify that its circular sector angle expands to exactly 72°!',
  },
];

// ─── OBSERVATION QUESTIONS ────────────────────────────────────────────────────
const OBSERVATION_QUESTIONS = [
  {
    question: 'Look at the Ogive graph: at what vertical cumulative frequency coordinate (Y-axis) do the Less-Than and More-Than ogives cross?',
    observableOptions: [
      'Exactly at Y = N/2 (50% of total frequency)',
      'At Y = 0 (baseline)',
      'At Y = N (100% total)',
      'At Y = Mode frequency',
    ],
    correctIndex: 0,
  },
  {
    question: 'In the Skewness visualizer, what happens to the order of averages when you drag the distribution from Symmetric to Extreme Right-Skew?',
    observableOptions: [
      'Mean pulls furthest right, resulting in: Mean > Median > Mode',
      'Mode pulls furthest right, resulting in: Mode > Median > Mean',
      'All three averages stay permanently merged at the center',
      'Median drops to zero',
    ],
    correctIndex: 0,
  },
];

// ─── REAL WORLD ACTIVITY ──────────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'MoSPI National Survey Challenge: Analyze Your State’s Economy',
  description: 'Download the latest RBI State Finances report or NSSO bulletin for your state (e.g. Maharashtra, West Bengal, Tamil Nadu, Uttar Pradesh).',
  steps: [
    'Construct a complete statistical table with all 8 components showing sectoral GVA shares (Agriculture, Industry, Services).',
    'Calculate the sector angles in degrees (Share × 3.6) and sketch an accurate 360° Pie Diagram.',
    'Group the per-capita district incomes into 5 equal class intervals and plot a continuous Histogram.',
    'Compute both the Arithmetic Mean and Median of the district incomes. State whether your state shows positive or negative skewness.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── DEFAULT PROPS ─────────────────────────────────────────���──────────────────
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
  nodeId: NODE_C11_ECON_060,
  title: 'Presentation of Data & Measures of Central Tendency',
  definition: 'Statistical presentation structures raw grouped data into readable tables, bar diagrams, pies, histograms, and ogives. Measures of central value (Mean, Median, Mode) identify the balance point, positional midpoint, and modal peak of economic distributions.',
  eli5: 'Think of presentation as taking a messy pile of 10,000 rupee notes and sorting them into neat bar towers, pie slices, and finding the exact middle note that describes the typical family.',
  misconceptions: [
    { misconception: 'A bar diagram can be used for continuous wage classes with no gaps.', correction: 'Bar diagrams are strictly for discrete categories with gaps. Continuous class intervals require a Histogram where adjacent bars touch.' },
    { misconception: 'Table titles and source notes are optional decorations.', correction: 'In ISC exams and official statistics, omitting the Title, Stubs, Captions, or Source Note renders a table incomplete, incurring heavy penalties.' },
    { misconception: 'Pie sector angles are calculated by multiplying percentages by 100.', correction: 'A full circle contains 360°. The sector angle is (Component / Total) × 360°, not × 100.' },
    { misconception: 'In a line graph, time can be placed on either axis arbitrarily.', correction: 'Time is the independent variable and MUST be placed on the horizontal X-axis by universal statistical convention.' },
    { misconception: 'A Frequency Polygon is complete when class midpoints are connected.', correction: 'The polygon must be closed at the baseline by anchoring to the midpoints of imaginary preceding and succeeding classes with zero frequency.' },
    { misconception: 'Less-than ogives should be plotted at lower class limits.', correction: 'Less-than counts cumulative items up to the top of the class, so it must be plotted at the UPPER class boundaries.' },
    { misconception: 'In the step-deviation method, the final answer is simply A + Σfiui/N.', correction: 'You must multiply back by class width h: x̄ = A + [Σ(fiui)/N] × h to restore original physical units.' },
  ],
  diagnosticQuestions: [
    { question: 'Which diagram is ideal for showing components of the Union Budget at a single point in time?', options: ['Line Graph', 'Pie Diagram', 'Ogive', 'Frequency Polygon'], correctIndex: 1 },
    { question: 'What is the sum of deviations of all observations from their arithmetic mean?', options: ['0', '1', 'Sample size N', 'Variance'], correctIndex: 0 },
    { question: 'In grouped data, where is the median class identified from?', options: ['Individual frequency column fi', 'Cumulative frequency column CF reaching N/2', 'Class marks', 'Assumed mean'], correctIndex: 1 },
    { question: 'Which average is the ONLY one computable for qualitative categorical data like car colors?', options: ['Mean', 'Median', 'Mode', 'Geometric Mean'], correctIndex: 2 },
    { question: 'In a positively skewed distribution, what is the correct relationship between averages?', options: ['Mean > Median > Mode', 'Mode > Median > Mean', 'Mean = Median = Mode', 'Median > Mean > Mode'], correctIndex: 0 },
    { question: 'Where do less-than and more-than ogives intersect?', options: ['At the Mode', 'At the Mean', 'At the Median (N/2)', 'At the upper quartile'], correctIndex: 2 },
    { question: 'What happens to the Mean if an extreme high outlier is added to a dataset?', options: ['It gets pulled towards the outlier', 'It stays unchanged', 'It decreases', 'It becomes equal to the mode'], correctIndex: 0 },
    { question: 'What is the formula for Karl Pearson’s empirical relationship?', options: ['Mode = 3 Median - 2 Mean', 'Mean = 3 Mode - 2 Median', 'Median = 3 Mean - 2 Mode', 'Mode = 2 Median - 3 Mean'], correctIndex: 0 },
  ],
  masteryCriteria: 'Can construct statistical tables, bar charts, pies, histograms, ogives; compute simple/weighted/grouped Mean, Median, Mode; apply Pearson empirical formula; and identify distribution skewness.',
};

// ─── MAIN SIMULATION COMPONENT ────────────────────────────────────────────────
export default function C11_EconomicsPresentationDataTabularSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_ECON_060,
  title = DEFAULT_PROPS.title || 'Presentation of Data & Central Value',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props) {
  // ── Subject Configuration ──
  const subjectConfig = SUBJECT_CONFIG['economics'] || { name: 'Economics', emoji: '📈', color: 'emerald' };

  // ── Flow Phase State ──
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ── Adaptive Mastery & Difficulty State ──
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ── Brilliant Interactivity State ──
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ── Interactive Exploration / Sandbox Variables ──
  const [agriGVA, setAgriGVA] = useState(19);      // %
  const [indusGVA, setIndusGVA] = useState(28);    // %
  const [servGVA, setServGVA] = useState(53);      // %
  const [defenceBudget, setDefenceBudget] = useState(15); // %
  const [subsidyBudget, setSubsidyBudget] = useState(10); // %
  const [outlierIncome, setOutlierIncome] = useState(30000); // Outlier income in ₹
  const [activeOgiveType, setActiveOgiveType] = useState<'both' | 'less' | 'more'>('both');
  const [selectedBarCategory, setSelectedBarCategory] = useState<string | null>(null);
  const [selectedHistogramBin, setSelectedHistogramBin] = useState<number | null>(null);

  // ── Challenge Response State ──
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [numericInput, setNumericInput] = useState('');
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ── Visual Feedback & Animations ──
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'visual' | 'table' | 'formula'>('visual');

  // ── BKT & Timer Refs ──
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ── Filter Challenges By Difficulty ──
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ── Load Existing Mastery on Mount ──
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ── Adaptive Difficulty Effect ──
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = (mastery === 'not-started' || mastery === 'beginner')
      ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ── Spoken Intro on Phase Change ──
  useEffect(() => {
    if (phase === 'discovery') {
      speechManager.speak('Welcome, Chief Statistical Officer. Let us explore how India presents and measures economic data.');
    } else if (phase === 'explore') {
      speechManager.speak('Interact with each visual model to master tables, bars, pies, histograms, and skewed averages.');
    } else if (phase === 'sandbox') {
      speechManager.speak('Feel free to manipulate all data variables without grading.');
    } else if (phase === 'challenge') {
      speechManager.speak('Solve these real-world economic challenges to prove your mastery.');
    }
  }, [phase]);

  // ── 2D Canvas Background Animation (Live Economic Data Wave) ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw faint statistical grid lines
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.12)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw animated normal/skew wave
      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 4) {
        const norm = (x - canvas.width / 2) / 60;
        const bell = Math.exp(-0.5 * norm * norm);
        const y = canvas.height - (bell * 30 + Math.sin(x * 0.05 + t) * 4 + 10);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ── Handlers (useCallback) ──
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight! High incomes pull the Mean upward.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Verify it now using the interactive controls.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === 0;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation!' : 'Check the curve intersection carefully.');
  }, []);

  const handleAgriGVAChange = useCallback((val: number) => {
    setAgriGVA(val);
    const remaining = 100 - val;
    setIndusGVA(Math.round(remaining * 0.35));
    setServGVA(100 - val - Math.round(remaining * 0.35));
    audioManager.play('count');
  }, []);

  const handleOutlierIncomeChange = useCallback((val: number) => {
    setOutlierIncome(val);
    audioManager.play('balance');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! Simulation complete with score ${finalScore} percent.`);
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Well calculated.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
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
        speechManager.speak('Let us study the complete step-by-step resolution.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('drop-correct');
    setDraggedItem(null);
  }, [draggedItem]);

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

  const handleConstructToggle = useCallback((part: string) => {
    audioManager.play('tap');
    setConstructParts(prev => [...prev, part]);
  }, []);

  const handleConstructRemove = useCallback((index: number) => {
    audioManager.play('pop');
    setConstructParts(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleResetChallenge = useCallback(() => {
    audioManager.play('whoosh');
    setDroppedLabels({});
    setSortArrangement([]);
    setConstructParts([]);
    setNumericInput('');
  }, []);

  // ── Clean Up Timer on Unmount ──
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ── Derived Live Mathematical Values ──
  const sampleWages = useMemo(() => [20000, 22000, 25000, 28000, outlierIncome], [outlierIncome]);
  const liveMean = useMemo(() => Math.round(sampleWages.reduce((a, b) => a + b, 0) / sampleWages.length), [sampleWages]);
  const liveMedian = useMemo(() => {
    const sorted = [...sampleWages].sort((a, b) => a - b);
    return sorted[2];
  }, [sampleWages]);
  const liveMode = 22000; // illustrative base cluster

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden font-sans">
      {/* Background Canvas Ambient Effect */}
      <canvas ref={canvasRef} width={800} height={60} className="absolute top-0 left-0 w-full h-16 pointer-events-none opacity-40" />

      {/* ─── HEADER BAR ──────────────────────────────────────────────────────── */}
      <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80 mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-2xl shadow-lg shadow-emerald-900/30"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800">
                ISC Class 11 • {subjectConfig.name}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-xs font-bold uppercase px-2 py-0.5 rounded-md border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                    : difficulty === 'standard'
                    ? 'bg-blue-950 text-blue-400 border-blue-700'
                    : 'bg-amber-950 text-amber-400 border-amber-700'
                }`}
              >
                {difficulty} Tier
              </motion.span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-white mt-0.5 tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <nav aria-label="Simulation Phases" className="flex items-center bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </nav>
      </header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─────────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 rounded-2xl border border-emerald-800/60 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
              <span>🏛️</span> MoSPI Economic Briefing Scenario
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-emerald-300">
              📌 {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Curiosity Investigation</span>
            <h3 className="text-base sm:text-lg font-semibold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all flex items-start justify-between ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 border border-slate-700 text-slate-400'
                      : 'bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:border-slate-600'
                  }`}
                >
                  <span>{opt}</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 font-bold">✓ True Reason</span>}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '🎉 Correct! Extreme upper-tail values pull the Mean away from the Median.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/40 flex items-center gap-2"
                >
                  Begin Visual Exploration Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ──────────────────────────── */}
      {phase === 'explore' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentSlide ? 'bg-emerald-500 scale-110' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-2xl text-sm text-emerald-300 flex items-center gap-2">
            <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
          </div>

          {/* Interactive Visualizations for Exploration */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl min-h-[380px]">
            {/* Step 1: Statistical Table & Bar Diagram (c11_econ_060) */}
            {currentSlide === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Real-time Statistical Table */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="text-center mb-3">
                      <p className="text-[10px] text-slate-500 font-mono">TABLE 1.1 (MoSPI Official)</p>
                      <h4 className="text-xs font-bold text-slate-200 uppercase">Sectoral Composition of India’s GVA, 2023-24</h4>
                      <p className="text-[10px] text-emerald-400">(at current prices, in % shares)</p>
                    </div>

                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-700 text-slate-400">
                          <th className="py-1.5 px-2">Stubs (Sector)</th>
                          <th className="py-1.5 px-2 text-right">Share (%)</th>
                          <th className="py-1.5 px-2 text-right">Bar Height</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300">
                        <tr className={selectedBarCategory === 'Agriculture' ? 'bg-emerald-950/60 text-emerald-300 font-bold' : ''}>
                          <td className="py-1.5 px-2 font-medium">Agriculture & Allied</td>
                          <td className="py-1.5 px-2 text-right text-emerald-400 font-mono">{agriGVA}%</td>
                          <td className="py-1.5 px-2 text-right font-mono">{(agriGVA * 0.15).toFixed(1)} cm</td>
                        </tr>
                        <tr className={selectedBarCategory === 'Industry' ? 'bg-blue-950/60 text-blue-300 font-bold' : ''}>
                          <td className="py-1.5 px-2 font-medium">Industry & Manufacturing</td>
                          <td className="py-1.5 px-2 text-right text-blue-400 font-mono">{indusGVA}%</td>
                          <td className="py-1.5 px-2 text-right font-mono">{(indusGVA * 0.15).toFixed(1)} cm</td>
                        </tr>
                        <tr className={selectedBarCategory === 'Services' ? 'bg-purple-950/60 text-purple-300 font-bold' : ''}>
                          <td className="py-1.5 px-2 font-medium">Services (Tertiary)</td>
                          <td className="py-1.5 px-2 text-right text-purple-400 font-mono">{servGVA}%</td>
                          <td className="py-1.5 px-2 text-right font-mono">{(servGVA * 0.15).toFixed(1)} cm</td>
                        </tr>
                        <tr className="font-bold border-t border-slate-700 text-white">
                          <td className="py-1.5 px-2">Total GVA</td>
                          <td className="py-1.5 px-2 text-right font-mono">100%</td>
                          <td className="py-1.5 px-2 text-right font-mono">15.0 cm</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
                      <span>Footnote: Provisional estimates</span>
                      <span>Source: NSO, MoSPI 2024</span>
                    </div>
                  </div>

                  {/* Real-time Dynamic SVG Bar Diagram */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-300">Simple Vertical Bar Diagram</span>
                      <span className="text-[10px] text-emerald-400">Notice uniform gaps between discrete bars</span>
                    </div>

                    <svg viewBox="0 0 320 180" className="w-full h-44 bg-slate-900/60 rounded-xl p-2">
                      {/* Grid Lines */}
                      <line x1="30" y1="20" x2="310" y2="20" stroke="#334155" strokeDasharray="2,2" />
                      <line x1="30" y1="75" x2="310" y2="75" stroke="#334155" strokeDasharray="2,2" />
                      <line x1="30" y1="130" x2="310" y2="130" stroke="#334155" strokeDasharray="2,2" />
                      <line x1="30" y1="140" x2="310" y2="140" stroke="#64748b" strokeWidth="1.5" />
                      <line x1="30" y1="20" x2="30" y2="140" stroke="#64748b" strokeWidth="1.5" />

                      {/* Y-Axis Labels */}
                      <text x="25" y="24" textAnchor="end" fill="#94a3b8" fontSize="8">60%</text>
                      <text x="25" y="79" textAnchor="end" fill="#94a3b8" fontSize="8">30%</text>
                      <text x="25" y="134" textAnchor="end" fill="#94a3b8" fontSize="8">0%</text>

                      {/* Agriculture Bar */}
                      <motion.rect
                        x="60"
                        y={140 - (agriGVA * 1.8)}
                        width="45"
                        height={agriGVA * 1.8}
                        rx="4"
                        fill="#10b981"
                        className="cursor-pointer hover:opacity-90"
                        onClick={() => setSelectedBarCategory('Agriculture')}
                        animate={{ y: 140 - (agriGVA * 1.8), height: agriGVA * 1.8 }}
                      />
                      <text x="82" y={135 - (agriGVA * 1.8)} textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">
                        {agriGVA}%
                      </text>
                      <text x="82" y="154" textAnchor="middle" fill="#cbd5e1" fontSize="8">Agri</text>

                      {/* Industry Bar */}
                      <motion.rect
                        x="145"
                        y={140 - (indusGVA * 1.8)}
                        width="45"
                        height={indusGVA * 1.8}
                        rx="4"
                        fill="#3b82f6"
                        className="cursor-pointer hover:opacity-90"
                        onClick={() => setSelectedBarCategory('Industry')}
                        animate={{ y: 140 - (indusGVA * 1.8), height: indusGVA * 1.8 }}
                      />
                      <text x="167" y={135 - (indusGVA * 1.8)} textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">
                        {indusGVA}%
                      </text>
                      <text x="167" y="154" textAnchor="middle" fill="#cbd5e1" fontSize="8">Industry</text>

                      {/* Services Bar */}
                      <motion.rect
                        x="230"
                        y={140 - (servGVA * 1.8)}
                        width="45"
                        height={servGVA * 1.8}
                        rx="4"
                        fill="#a855f7"
                        className="cursor-pointer hover:opacity-90"
                        onClick={() => setSelectedBarCategory('Services')}
                        animate={{ y: 140 - (servGVA * 1.8), height: servGVA * 1.8 }}
                      />
                      <text x="252" y={135 - (servGVA * 1.8)} textAnchor="middle" fill="#c084fc" fontSize="9" fontWeight="bold">
                        {servGVA}%
                      </text>
                      <text x="252" y="154" textAnchor="middle" fill="#cbd5e1" fontSize="8">Services</text>
                    </svg>

                    <div className="mt-2">
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Adjust Agriculture Share:</span>
                        <span className="font-bold text-emerald-400 font-mono">{agriGVA}%</span>
                      </label>
                      <input
                        type="range"
                        min={10}
                        max={40}
                        value={agriGVA}
                        onChange={(e) => handleAgriGVAChange(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Adjust Agriculture Share"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Pie Diagram Circular Geometry (c11_econ_061) */}
            {currentSlide === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase text-amber-400">Formula Check</span>
                    <h4 className="text-base font-bold text-white">Sector Angle (θ) = (Component Share / 100) × 360°</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Because a full geometric circle equals 360°, each 1% share occupies exactly <span className="text-emerald-400 font-bold">3.6°</span>.
                    </p>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-red-400 font-bold">Defence Outlay: {defenceBudget}%</span>
                          <span className="text-red-300 font-mono">{(defenceBudget * 3.6).toFixed(1)}°</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={35}
                          value={defenceBudget}
                          onChange={(e) => setDefenceBudget(Number(e.target.value))}
                          className="w-full accent-red-500"
                          aria-label="Defence Budget Slider"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-amber-400 font-bold">Subsidies: {subsidyBudget}%</span>
                          <span className="text-amber-300 font-mono">{(subsidyBudget * 3.6).toFixed(1)}°</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={30}
                          value={subsidyBudget}
                          onChange={(e) => setSubsidyBudget(Number(e.target.value))}
                          className="w-full accent-amber-500"
                          aria-label="Subsidy Budget Slider"
                        />
                      </div>

                      <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                        Remaining expenditure (Interest + Schemes + Pensions) = <span className="text-emerald-400 font-mono">{100 - defenceBudget - subsidyBudget}%</span> ({( (100 - defenceBudget - subsidyBudget) * 3.6 ).toFixed(1)}°)
                      </div>
                    </div>
                  </div>

                  {/* SVG Pie Visualization */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 200 200" className="w-48 h-48">
                      {/* Interactive Circular Slices */}
                      {(() => {
                        const defAngle = defenceBudget * 3.6;
                        const subAngle = subsidyBudget * 3.6;
                        const restAngle = 360 - defAngle - subAngle;

                        const rad = Math.PI / 180;
                        const x1 = 100 + 80 * Math.sin(defAngle * rad);
                        const y1 = 100 - 80 * Math.cos(defAngle * rad);
                        const x2 = 100 + 80 * Math.sin((defAngle + subAngle) * rad);
                        const y2 = 100 - 80 * Math.cos((defAngle + subAngle) * rad);

                        return (
                          <g>
                            {/* Slice 1: Defence */}
                            <path
                              d={`M 100 100 L 100 20 A 80 80 0 ${defAngle > 180 ? 1 : 0} 1 ${x1} ${y1} Z`}
                              fill="#ef4444"
                              opacity={0.9}
                            />
                            {/* Slice 2: Subsidies */}
                            <path
                              d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${subAngle > 180 ? 1 : 0} 1 ${x2} ${y2} Z`}
                              fill="#f59e0b"
                              opacity={0.9}
                            />
                            {/* Slice 3: Other */}
                            <path
                              d={`M 100 100 L ${x2} ${y2} A 80 80 0 ${restAngle > 180 ? 1 : 0} 1 100 20 Z`}
                              fill="#10b981"
                              opacity={0.8}
                            />
                            <circle cx="100" cy="100" r="28" fill="#020617" />
                            <text x="100" y="104" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold">360°</text>
                          </g>
                        );
                      })()}
                    </svg>
                    <div className="flex gap-4 text-[10px] mt-2">
                      <span className="flex items-center gap-1 text-red-400"><span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span> Defence</span>
                      <span className="flex items-center gap-1 text-amber-400"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span> Subsidies</span>
                      <span className="flex items-center gap-1 text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> Other</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Continuous Histogram & Frequency Polygon (c11_econ_062) */}
            {currentSlide === 2 && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-white">Delhi NCR Household Wage Histogram & Polygon</h4>
                    <p className="text-xs text-slate-400">Class Intervals (₹000s): 0-10, 10-20, 20-30, 30-40, 40-50</p>
                  </div>
                  <div className="text-xs text-emerald-400 font-mono bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                    Total N = 50 households
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <svg viewBox="0 0 400 180" className="w-full h-48 bg-slate-900/60 rounded-xl p-2">
                    {/* Histogram Bars (Touching!) */}
                    {[
                      { classLabel: '0-10', f: 8, x: 50, mid: 75 },
                      { classLabel: '10-20', f: 15, x: 100, mid: 125 },
                      { classLabel: '20-30', f: 12, x: 150, mid: 175 },
                      { classLabel: '30-40', f: 10, x: 200, mid: 225 },
                      { classLabel: '40-50', f: 5, x: 250, mid: 275 },
                    ].map((bin, i) => (
                      <g key={i}>
                        <motion.rect
                          x={bin.x}
                          y={150 - bin.f * 8}
                          width="50"
                          height={bin.f * 8}
                          fill={selectedHistogramBin === i ? '#10b981' : '#1e293b'}
                          stroke="#38bdf8"
                          strokeWidth="1.5"
                          className="cursor-pointer hover:fill-emerald-800/60 transition-colors"
                          onClick={() => setSelectedHistogramBin(i)}
                        />
                        <text x={bin.mid} y={145 - bin.f * 8} textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">
                          {bin.f}
                        </text>
                      </g>
                    ))}

                    {/* Baseline & Y-axis */}
                    <line x1="25" y1="150" x2="350" y2="150" stroke="#94a3b8" strokeWidth="1.5" />
                    <line x1="50" y1="20" x2="50" y2="150" stroke="#94a3b8" strokeWidth="1.5" />

                    {/* Class Boundaries on X-axis */}
                    <text x="50" y="162" textAnchor="middle" fill="#cbd5e1" fontSize="8">0</text>
                    <text x="100" y="162" textAnchor="middle" fill="#cbd5e1" fontSize="8">10k</text>
                    <text x="150" y="162" textAnchor="middle" fill="#cbd5e1" fontSize="8">20k</text>
                    <text x="200" y="162" textAnchor="middle" fill="#cbd5e1" fontSize="8">30k</text>
                    <text x="250" y="162" textAnchor="middle" fill="#cbd5e1" fontSize="8">40k</text>
                    <text x="300" y="162" textAnchor="middle" fill="#cbd5e1" fontSize="8">50k</text>

                    {/* Frequency Polygon Lines (With baseline imaginary classes) */}
                    <polyline
                      points="25,150 75,86 125,30 175,54 225,70 275,110 325,150"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                    />

                    {/* Midpoint Dots */}
                    {[
                      { x: 25, y: 150 }, // Imaginary class -10k to 0
                      { x: 75, y: 86 },
                      { x: 125, y: 30 },
                      { x: 175, y: 54 },
                      { x: 225, y: 70 },
                      { x: 275, y: 110 },
                      { x: 325, y: 150 }, // Imaginary class 50k to 60k
                    ].map((pt, i) => (
                      <circle key={i} cx={pt.x} cy={pt.y} r="3.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
                    ))}
                  </svg>
                  <div className="flex justify-between items-center text-[11px] text-slate-400 mt-2">
                    <span className="text-cyan-400">■ Blue Rectangles: Histogram (Bars Touch)</span>
                    <span className="text-amber-400 font-semibold">● Orange Line: Closed Frequency Polygon</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Ogives & Graphical Median (c11_econ_063) */}
            {currentSlide === 3 && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-white">Surat Textile Workers Daily Wage Ogives</h4>
                    <p className="text-xs text-slate-400">Intersection identifies Median Wage (₹350 at N/2 = 10)</p>
                  </div>
                  <div className="flex gap-2">
                    {(['both', 'less', 'more'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => {
                          setActiveOgiveType(mode);
                          audioManager.play('tap');
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${
                          activeOgiveType === mode ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {mode === 'both' ? 'Dual Ogives' : mode + ' than'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <svg viewBox="0 0 400 180" className="w-full h-48 bg-slate-900/60 rounded-xl p-2">
                    {/* Axes */}
                    <line x1="40" y1="20" x2="40" y2="150" stroke="#64748b" strokeWidth="1.5" />
                    <line x1="40" y1="150" x2="360" y2="150" stroke="#64748b" strokeWidth="1.5" />

                    {/* Median Guides */}
                    <line x1="40" y1="85" x2="200" y2="85" stroke="#10b981" strokeDasharray="3,3" strokeWidth="1.5" />
                    <line x1="200" y1="85" x2="200" y2="150" stroke="#10b981" strokeDasharray="3,3" strokeWidth="1.5" />
                    <circle cx="200" cy="85" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                    <text x="205" y="80" fill="#10b981" fontSize="9" fontWeight="bold">Intersection (Median ₹350, N/2=10)</text>

                    {/* Less-Than Ogive (Rising S-curve through upper limits) */}
                    {(activeOgiveType === 'both' || activeOgiveType === 'less') && (
                      <g>
                        <path
                          d="M 40 150 Q 100 137, 150 111 T 200 85 T 250 59 T 320 20"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2.5"
                        />
                        <text x="325" y="25" fill="#38bdf8" fontSize="8" fontWeight="bold">Less-than</text>
                      </g>
                    )}

                    {/* More-Than Ogive (Falling curve through lower limits) */}
                    {(activeOgiveType === 'both' || activeOgiveType === 'more') && (
                      <g>
                        <path
                          d="M 40 20 Q 100 33, 150 59 T 200 85 T 250 111 T 320 137"
                          fill="none"
                          stroke="#f43f5e"
                          strokeWidth="2.5"
                        />
                        <text x="325" y="140" fill="#f43f5e" fontSize="8" fontWeight="bold">More-than</text>
                      </g>
                    )}

                    {/* Axis Labels */}
                    <text x="35" y="88" textAnchor="end" fill="#10b981" fontSize="8" fontWeight="bold">N/2=10</text>
                    <text x="35" y="24" textAnchor="end" fill="#94a3b8" fontSize="8">N=20</text>
                    <text x="200" y="164" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">₹350</text>
                    <text x="320" y="164" textAnchor="middle" fill="#cbd5e1" fontSize="8">₹450</text>
                  </svg>
                </div>
              </div>
            )}

            {/* Step 5: Tug-of-War: Mean, Median, Mode (c11_econ_069) */}
            {currentSlide === 4 && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Outlier Experiment: Mean vs Median Tug-of-War</h4>
                  <p className="text-xs text-slate-300">
                    Watch how adding a wealthy supervisor’s salary distorts the balance point (Mean), while the middle rank (Median) stays rock steady.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-amber-400 font-bold">Adjust 5th Worker (Outlier Salary):</span>
                    <span className="text-emerald-400 font-mono font-bold text-sm">₹{outlierIncome.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={30000}
                    max={250000}
                    step={5000}
                    value={outlierIncome}
                    onChange={(e) => handleOutlierIncomeChange(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                    aria-label="Adjust Outlier Income"
                  />

                  {/* Visual Balance Scale */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-slate-900 rounded-xl border border-emerald-800/80">
                      <span className="text-[10px] uppercase text-slate-400">Arithmetic Mean (x̄)</span>
                      <p className="text-lg font-black text-emerald-400 font-mono">₹{liveMean.toLocaleString()}</p>
                      <span className="text-[10px] text-amber-300">Pulled rightward by outlier!</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-blue-800/80">
                      <span className="text-[10px] uppercase text-slate-400">Median (50th %ile)</span>
                      <p className="text-lg font-black text-blue-400 font-mono">₹{liveMedian.toLocaleString()}</p>
                      <span className="text-[10px] text-blue-300">Unaffected by extremes</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-purple-800/80">
                      <span className="text-[10px] uppercase text-slate-400">Distribution Skew</span>
                      <p className="text-base font-bold text-purple-400">
                        {liveMean > liveMedian + 5000 ? 'Positive Skew (Right Tail)' : 'Symmetric'}
                      </p>
                      <span className="text-[10px] text-purple-300">Mean &gt; Median &gt; Mode</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Slide Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 text-white rounded-xl font-bold text-xs disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-mono">Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}</span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-900/40"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-900/50"
              >
                Enter Sandbox Mode 🎮 →
              </motion.button>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─────────────────────���──────────────── */}
      {phase === 'sandbox' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap justify-between items-center gap-4">
            <div>
              <span className="text-xs font-bold uppercase text-emerald-400">Ungraded Laboratory</span>
              <h2 className="text-xl font-black text-white">Free Exploration Sandbox</h2>
              <p className="text-xs text-slate-400 mt-1">
                Toggle representations and test how parameters impact Pie angles, Ogives, and Mean-Median-Mode skewness.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-emerald-900/40"
            >
              Ready for Graded Challenges! 🎯 →
            </motion.button>
          </div>

          {/* Sandbox Live Workbench */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-emerald-400">1. National GVA Multi-Bar</span>
              <input
                type="range"
                min={10}
                max={45}
                value={agriGVA}
                onChange={(e) => handleAgriGVAChange(Number(e.target.value))}
                className="w-full accent-emerald-500"
                aria-label="GVA Agri slider"
              />
              <div className="text-xs text-slate-300 font-mono flex justify-between">
                <span>Agri: {agriGVA}%</span>
                <span>Indus: {indusGVA}%</span>
                <span>Serv: {servGVA}%</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400">2. Outlier Salary Simulator</span>
              <input
                type="range"
                min={30000}
                max={300000}
                step={10000}
                value={outlierIncome}
                onChange={(e) => handleOutlierIncomeChange(Number(e.target.value))}
                className="w-full accent-amber-500"
                aria-label="Outlier salary slider"
              />
              <div className="text-xs text-slate-300 font-mono flex justify-between">
                <span>Mean: ₹{liveMean}</span>
                <span>Median: ₹{liveMedian}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-purple-400">3. Pearson’s Empirical Mode</span>
              <p className="text-xs text-slate-300 font-mono">
                Mode ≈ 3(Median) - 2(Mean)
              </p>
              <div className="text-xs text-emerald-400 font-mono font-bold">
                ≈ ₹{Math.round(3 * liveMedian - 2 * liveMean)}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 4: GRADED CHALLENGE ARENA ─────────────────────────────────── */}
      {phase === 'challenge' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-emerald-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  {challenge.competencyLevel}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mt-1">Topic: {challenge.nodeId}</h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] uppercase text-slate-400">Score</span>
                <p className="text-sm font-black text-emerald-400 font-mono">{scoreBreakdown.correct} / {scoreBreakdown.total}</p>
              </div>
              <div className="w-28 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-3xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <h2 className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">
              {challenge.question}
            </h2>

            {/* MCQ Type Render */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation || answerRevealed}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-100'
                        : 'bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200'
                    }`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Type Render */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Palette:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Target Diagram Drop Area */}
                <div className="grid grid-cols-2 gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop('top')}
                    className="p-3 bg-slate-900 border border-dashed border-emerald-600/60 rounded-xl min-h-[48px] flex items-center justify-between"
                  >
                    <span className="text-slate-400">Top Header:</span>
                    <span className="font-bold text-emerald-400">{droppedLabels.top || '[Drop Title Here]'}</span>
                  </div>

                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop('header')}
                    className="p-3 bg-slate-900 border border-dashed border-blue-600/60 rounded-xl min-h-[48px] flex items-center justify-between"
                  >
                    <span className="text-slate-400">Column Tops:</span>
                    <span className="font-bold text-blue-400">{droppedLabels.header || '[Drop Caption Here]'}</span>
                  </div>

                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop('left')}
                    className="p-3 bg-slate-900 border border-dashed border-purple-600/60 rounded-xl min-h-[48px] flex items-center justify-between"
                  >
                    <span className="text-slate-400">Left Row Labels:</span>
                    <span className="font-bold text-purple-400">{droppedLabels.left || '[Drop Stubs Here]'}</span>
                  </div>

                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop('bottom')}
                    className="p-3 bg-slate-900 border border-dashed border-amber-600/60 rounded-xl min-h-[48px] flex items-center justify-between"
                  >
                    <span className="text-slate-400">Baseline Margins:</span>
                    <span className="font-bold text-amber-400">{droppedLabels.bottom || '[Drop Source Note Here]'}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs"
                >
                  Verify Table Structure
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Type Render */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to arrange them in strict methodological order:</p>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, idx) => (
                  <motion.div
                    key={idx}
                    draggable
                    onDragStart={() => setDraggedItem(String(idx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, idx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs font-medium cursor-grab text-slate-200 flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-emerald-400">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge Render */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value..."
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                    aria-label="Numeric answer input"
                  />
                  <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge Render */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">Click elements from palette to construct the algebraic statement:</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConstructToggle(part)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-bold text-emerald-400"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[56px] flex flex-wrap items-center gap-2">
                  {constructParts.map((p, i) => (
                    <span
                      key={i}
                      onClick={() => handleConstructRemove(i)}
                      className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-lg text-xs font-mono font-bold cursor-pointer hover:bg-rose-950 hover:text-rose-400"
                    >
                      {p} ✕
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">[Click palette items above]</span>
                  )}
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={constructParts.length === 0}
                    className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs"
                  >
                    Verify Inequality
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleResetChallenge}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
                  >
                    Clear
                  </motion.button>
                </div>
              </div>
            )}

            {/* Click-to-Reveal Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-slate-950/90 rounded-2xl border border-emerald-800/80 space-y-3"
              >
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                  <span>💡</span> Official ISC Step-by-Step Resolution
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-slate-300 leading-relaxed"
                    >
                      <span className="text-emerald-400 font-bold font-mono mr-1">{idx + 1}.</span>
                      {sentence}{!sentence.endsWith('.') ? '.' : ''}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="mt-2 px-3 py-1.5 bg-emerald-800/60 hover:bg-emerald-700 text-emerald-200 rounded-lg text-xs font-bold"
                  >
                    Reveal Next Deductive Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="mt-3 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-900/50 block"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Economics Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ─── PHASE 5: MASTERY COMPLETION & REFLECTION ─────────────────────────── */}
      {phase === 'complete' && (
        <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 rounded-3xl border border-emerald-700 text-center space-y-4 shadow-2xl">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Chief Statistical Officer Certification</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have successfully completed the MoSPI Economic Data Presentation & Measures of Central Tendency Simulation.
            </p>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-[10px] text-slate-400 uppercase">Final Score</span>
                <p className="text-2xl font-black text-emerald-400 font-mono">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-[10px] text-slate-400 uppercase">BKT Mastery</span>
                <p className="text-2xl font-black text-teal-400 capitalize">{masteryLevel}</p>
              </div>
            </div>

            {/* Motivational Performance Feedback */}
            <div className="p-4 bg-slate-900/60 rounded-2xl border border-emerald-800/60 text-xs text-emerald-300 max-w-lg mx-auto">
              {errors === 0
                ? '🌟 Flawless Mastery! You demonstrated complete command over all statistical presentations and formulas.'
                : errors <= 3
                ? '👍 Exceptional Work! You possess high analytical aptitude for macroeconomic data interpretation.'
                : '📈 Good Effort! Review the specific misconception corrections below to solidify your understanding.'}
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-3xl border border-rose-900 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Diagnostic Misconception Review
              </h3>
              <p className="text-xs text-slate-400">Review the key conceptual distinctions where points were dropped:</p>

              <div className="grid grid-cols-1 gap-3">
                {hitMisconceptions.map((mIdx) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={mIdx} className="p-3 bg-slate-900 rounded-xl border border-rose-900/60 text-xs space-y-1">
                      <p className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity Card */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <span>📊</span> Practical Application: {REAL_WORLD_ACTIVITY.title}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ol className="space-y-2 text-xs text-slate-400 list-decimal list-inside">
              {REAL_WORLD_ACTIVITY.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>

          {/* Spaced Repetition Notification */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-center text-xs text-slate-400">
            ⏰ Spaced Review Scheduled: Return in <span className="text-emerald-400 font-bold">{errors === 0 ? '7 days' : '3 days'}</span> to retain long-term memory for the ISC Board Examinations.
          </div>
        </motion.section>
      )}

      {/* ─── POPUP FEEDBACK COMPONENTS ───────────────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Level Advanced!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}
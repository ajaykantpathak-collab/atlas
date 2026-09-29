'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDENTIFIERS ───
const NODE_C6_MATH_081 = 'c6_math_081';
const NODE_C6_MATH_082 = 'c6_math_082';
const NODE_C6_MATH_083 = 'c6_math_083';
const NODE_C6_MATH_084 = 'c6_math_084';
const ALL_NODE_IDS = [NODE_C6_MATH_081, NODE_C6_MATH_082, NODE_C6_MATH_083, NODE_C6_MATH_084];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Annual Sports Day Data Challenge',
  intro: 'St. Xavier’s School in Kolkata is organising its Annual Sports Carnival! 200 excited students are registering for events, ordering team jerseys, tracking relay timings, and tallying canteen fruit snacks.',
  context: 'As the Chief Student Data Analyst, the Sports Captain needs your help to collect raw observations, build error-free tally frequency tables, scale pictographs, construct crisp bar graphs on coordinate grids, and compute the mean and median balance points of tournament scores.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In a survey of 20 students, the responses are recorded as: Cricket, Football, Cricket, Badminton, Cricket... What makes this "raw data" tricky to use immediately?',
  options: [
    'Raw data contains made-up numbers that are not true',
    'Items are scattered and unsorted, making counting slow and prone to errors',
    'Raw data only works for small groups under 5 students',
    'Raw data automatically loses the names of the items'
  ],
  correctIndex: 1,
  hintAfter: 'Spot on! Raw data preserves every single response, but because it is unorganised, we cannot compare categories at a glance. Let us explore how tally tables, pictographs, bar graphs, and averages transform raw data into powerful insights!',
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

// ─── 22 CHALLENGES (NEP 2020 & CISCE 2026 Aligned) ───
const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (1-7)
  {
    id: 'ch_01_tally_bundle',
    nodeId: NODE_C6_MATH_081,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How is the count of 5 correctly drawn in a standard tally chart?',
    options: [
      'Five upright vertical strokes: |||||',
      'Four upright vertical strokes with a fifth diagonal stroke across them: ||||\\',
      'A square with a dot in the middle',
      'Two vertical strokes crossed with three horizontal lines'
    ],
    correctIndex: 1,
    explanation: 'Tallies are bundled in groups of five. The first 4 strokes are vertical (||||), and the 5th stroke is drawn diagonally across them (||||\\) to close the bundle. This lets the eye count in quick multiples of 5.',
    hints: [
      'Think about why we group tally marks instead of drawing individual strokes.',
      'Remember the "gate" rule: 4 posts and 1 crossbar.',
      'Four vertical strokes plus one diagonal slash makes a complete bundle of 5.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_tally_read',
    nodeId: NODE_C6_MATH_081,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A frequency table shows the tally marks for Apples as two complete bundles of 5 plus three single strokes (||||\\  ||||\\  |||). What is the frequency?',
    correctAnswer: 13,
    tolerance: 0,
    unit: 'students',
    explanation: 'Each bundle represents 5. So two bundles = 5 + 5 = 10. Adding the 3 individual strokes gives 10 + 3 = 13.',
    hints: [
      'Count each crossed bundle as 5.',
      'Two bundles equal 5 × 2 = 10.',
      'Now add the 3 single upright strokes: 10 + 3 = 13.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_picto_scale_read',
    nodeId: NODE_C6_MATH_082,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In a pictograph, the scale key states: "1 Football symbol = 10 students". If Grade 6 has 4 full football symbols, how many students chose football?',
    options: ['4 students', '14 students', '40 students', '400 students'],
    correctIndex: 2,
    explanation: 'Always multiply the number of symbols by the scale factor in the key: 4 symbols × 10 students/symbol = 40 students.',
    hints: [
      'Look at the key: one symbol is NOT just 1 student.',
      'Multiply the number of symbols (4) by the value of 1 symbol (10).',
      '4 × 10 = 40 students.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_04_picto_half_symbol',
    nodeId: NODE_C6_MATH_082,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'If 1 Book symbol = 10 books in the library pictograph, what number of books is represented by 3 full symbols and 1 half symbol?',
    correctAnswer: 35,
    tolerance: 0,
    unit: 'books',
    explanation: '3 full symbols = 3 × 10 = 30 books. A half symbol represents half of the scale value: 10 / 2 = 5 books. Total = 30 + 5 = 35 books.',
    hints: [
      'Calculate the full symbols first: 3 × 10 = 30.',
      'A half symbol means half of the scale (half of 10 = 5), not half a book.',
      'Add them together: 30 + 5 = 35.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_05_bargraph_features',
    nodeId: NODE_C6_MATH_083,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct component labels to their positions on the bar graph structure.',
    dragItems: [
      { label: 'Title', targetId: 'target_title' },
      { label: 'Vertical Axis (Scale)', targetId: 'target_y_axis' },
      { label: 'Horizontal Axis (Categories)', targetId: 'target_x_axis' },
      { label: 'Uniform Bar Height', targetId: 'target_bar' }
    ],
    correctMapping: {
      target_title: 'Title',
      target_y_axis: 'Vertical Axis (Scale)',
      target_x_axis: 'Horizontal Axis (Categories)',
      target_bar: 'Uniform Bar Height'
    },
    explanation: 'A standard bar graph has a descriptive Title at the top, a Vertical y-axis with numerical scale, a Horizontal x-axis with categorical labels, and vertical bars of equal width and equal spacing whose heights indicate frequency.',
    hints: [
      'The descriptive headline sits at the top of the chart.',
      'The vertical line on the left carries the number ruler/scale.',
      'The horizontal line at the bottom carries the names of categories.'
    ],
  },
  {
    id: 'ch_06_mean_definition',
    nodeId: NODE_C6_MATH_084,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the mathematical definition of the Mean (average) of a data set?',
    options: [
      'The highest observation minus the lowest observation',
      'The middle value when observations are arranged in order',
      'The sum of all observations divided by the total number of observations',
      'The value that appears most frequently in the set'
    ],
    correctIndex: 2,
    explanation: 'Mean = (Sum of all observations) / (Total number of observations). It represents the fair-share or balance point if all values were pooled and distributed equally.',
    hints: [
      'Think of pooling all items together and sharing them equally among everyone.',
      'It involves adding all numbers and dividing by the count.',
      'Sum divided by count is the formula for the mean.'
    ],
  },
  {
    id: 'ch_07_median_odd_count',
    nodeId: NODE_C6_MATH_084,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Find the median of the 5 numbers: 9, 3, 7, 2, 5.',
    correctAnswer: 5,
    tolerance: 0,
    unit: '',
    explanation: 'First, ALWAYS arrange the numbers in ascending order: 2, 3, 5, 7, 9. Since n = 5 (odd), the median is the middle (3rd) number, which is 5.',
    hints: [
      'Step 1: Never pick the middle number from the unsorted list! First sort them from smallest to largest.',
      'Sorted list: 2, 3, 5, 7, 9.',
      'The middle position (3rd value) is 5.'
    ],
    misconceptionIndex: 2,
  },

  // STANDARD TIER (8-15)
  {
    id: 'ch_08_freq_table_conservation',
    nodeId: NODE_C6_MATH_081,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a class survey of 30 students about modes of transport: Bus = 12, Walk = 8, Bicycle = 6. How many students travel by Car if every student chose exactly one mode?',
    correctAnswer: 4,
    tolerance: 0,
    unit: 'students',
    explanation: 'The sum of all frequencies must equal the total number of respondents: 12 + 8 + 6 + Car = 30. 26 + Car = 30, so Car = 30 - 26 = 4.',
    hints: [
      'All category frequencies must add up to the total raw count of 30.',
      'Sum the known categories: 12 + 8 + 6 = 26.',
      'Subtract from 30: 30 - 26 = 4.'
    ],
  },
  {
    id: 'ch_09_scale_selection_reasoning',
    nodeId: NODE_C6_MATH_082,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'You have attendance data for 5 school houses: Red (150), Blue (200), Green (125), Yellow (175). Which scale is MOST suitable for drawing a clean pictograph?',
    options: [
      '1 symbol = 1 student (needs up to 200 symbols per row)',
      '1 symbol = 25 students (gives 6, 8, 5, 7 neat symbols)',
      '1 symbol = 1000 students (all rows would be tiny slivers)',
      '1 symbol = 13 students (creates awkward fractional symbols for all)'
    ],
    correctIndex: 1,
    explanation: 'A good scale keeps the number of symbols between 4 and 10 and divides the data values cleanly into whole or half symbols. With 1 symbol = 25 students: 150/25=6, 200/25=8, 125/25=5, 175/25=7. Perfect whole numbers!',
    hints: [
      'A good scale produces between 4 and 10 symbols per category.',
      'Check which scale divides 150, 200, 125, and 175 without messy fractions.',
      '25 divides all numbers cleanly: 150/25=6, 200/25=8, etc.'
    ],
  },
  {
    id: 'ch_10_picto_difference_calc',
    nodeId: NODE_C6_MATH_082,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a sports day pictograph (1 Medallion symbol = 8 medals), Red House has 5 symbols and Blue House has 2 symbols. How many MORE medals did Red House win than Blue House?',
    correctAnswer: 24,
    tolerance: 0,
    unit: 'medals',
    explanation: 'Method 1: Red = 5 × 8 = 40 medals. Blue = 2 × 8 = 16 medals. Difference = 40 - 16 = 24 medals. Method 2: Red has 5 - 2 = 3 more symbols. 3 symbols × 8 medals/symbol = 24 medals.',
    hints: [
      'You can find the difference in symbols first, or calculate total medals for each house.',
      'Red has 5 symbols, Blue has 2 symbols. Difference in symbols = 3.',
      'Multiply 3 symbols by 8 medals/symbol = 24 medals.'
    ],
  },
  {
    id: 'ch_11_bargraph_interpretation',
    nodeId: NODE_C6_MATH_083,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'On a bar graph where the vertical scale is 1 cm = 5 marks, Rohan’s bar has a height of 14 cm. What mark did Rohan score in the examination?',
    correctAnswer: 70,
    tolerance: 0,
    unit: 'marks',
    explanation: 'Value = Bar Height × Scale factor = 14 cm × 5 marks/cm = 70 marks.',
    hints: [
      'Each 1 cm represents 5 marks on the vertical scale.',
      'Multiply the height of the bar by the scale factor.',
      '14 × 5 = 70 marks.'
    ],
  },
  {
    id: 'ch_12_bargraph_order_steps',
    nodeId: NODE_C6_MATH_083,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Arrange the 4 steps of constructing a bar graph on graph paper in the correct sequential order.',
    sortItems: [
      'Draw horizontal (x) and vertical (y) perpendicular axes meeting at the origin',
      'Choose an appropriate vertical scale based on the data range',
      'Mark categories equally on x-axis and scale values on y-axis',
      'Draw rectangular bars of equal width and equal gaps matching the category heights'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The logical construction order is: (1) Draw the coordinate axes, (2) Choose the vertical scale, (3) Label the axes with uniform markings, and (4) Draw the uniform-width bars with equal spacing up to their correct values.',
    hints: [
      'You must establish the axes before you can choose a scale.',
      'Scale and labels come before drawing the actual rectangular bars.',
      'Drawing the bars is the final execution step.'
    ],
  },
  {
    id: 'ch_13_mean_calculation_six',
    nodeId: NODE_C6_MATH_084,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In 6 cricket matches, Virat scored: 45, 60, 55, 40, 70, 90 runs. What is his mean score per match?',
    correctAnswer: 60,
    tolerance: 0,
    unit: 'runs',
    explanation: 'Sum of runs = 45 + 60 + 55 + 40 + 70 + 90 = 360 runs. Number of matches = 6. Mean = 360 / 6 = 60 runs.',
    hints: [
      'Step 1: Find the sum of all 6 scores.',
      '45 + 60 + 55 + 40 + 70 + 90 = 360.',
      'Step 2: Divide the sum by 6: 360 / 6 = 60.'
    ],
  },
  {
    id: 'ch_14_median_even_count',
    nodeId: NODE_C6_MATH_084,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the median of the 6 test scores: 12, 18, 14, 20, 10, 16.',
    correctAnswer: 15,
    tolerance: 0,
    unit: 'marks',
    explanation: 'First, arrange in ascending order: 10, 12, 14, 16, 18, 20. Since n = 6 (even count), the two middle values are the 3rd (14) and 4th (16). Median = (14 + 16) / 2 = 30 / 2 = 15.',
    hints: [
      'First arrange in ascending order: 10, 12, 14, 16, 18, 20.',
      'For an even number of items, identify the two middle numbers: 14 and 16.',
      'Calculate their average: (14 + 16) / 2 = 30 / 2 = 15.'
    ],
  },
  {
    id: 'ch_15_mean_vs_median_concept',
    nodeId: NODE_C6_MATH_084,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Consider the data set: 2, 3, 4, 5, 100. Why is the median (4) a better representative of the typical value than the mean (22.8)?',
    options: [
      'Because the median is always easier to compute than the mean',
      'Because the mean is pulled heavily by the extreme outlier (100), whereas the median depends only on rank order',
      'Because the mean formula only works for even counts of numbers',
      'Because the median is always exactly double the mean'
    ],
    correctIndex: 1,
    explanation: 'The mean uses every value in its sum, so an extreme value (outlier like 100) drags the mean far above typical values. The median depends only on positional order and is robust against extreme values.',
    hints: [
      'Look at 4 of the 5 values: they are between 2 and 5.',
      'Does 22.8 look like any of the typical numbers in the set?',
      'Extreme values distort the mean (balance point), but do not move the middle position (median).'
    ],
  },

  // ADVANCED TIER (16-22)
  {
    id: 'ch_16_construct_frequency_table',
    nodeId: NODE_C6_MATH_081,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the frequency table components in correct order for: "Survey on Favourite Snacks: Samosa (15), Idli (10), Fruit (5)".',
    availableParts: ['Category Column', 'Tally Marks Column', 'Frequency Column', 'Total Row = 30'],
    targetState: 'Category Column Tally Marks Column Frequency Column Total Row = 30',
    validationHint: 'Add Category, Tally Marks, Frequency columns, then the Total Row.',
    explanation: 'A formal frequency table contains three main columns: Category name, Tally Marks (showing grouped bundles of 5), and Frequency (numerical count), followed by a Total row verifying all raw observations.',
    hints: [
      'Start with the identifying column: Category.',
      'Next comes the tally counting column: Tally Marks.',
      'Follow with the count: Frequency, and finally the Total Row.'
    ],
  },
  {
    id: 'ch_17_evaluate_graph_error',
    nodeId: NODE_C6_MATH_083,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student draws a bar graph where the "Rent" bar is twice as wide as the "Food" bar because "Rent is a bigger expense". Why is this mathematically incorrect?',
    options: [
      'Wider bars take up too much paper ink',
      'In a bar graph, bar width must be uniform; only height represents numerical frequency. Changing width misleads visual perception of area',
      'Rent should always be drawn as a circle, not a bar',
      'The student should have made the Rent bar narrower instead'
    ],
    correctIndex: 1,
    explanation: 'In a bar graph, all bars MUST have identical widths and equal spacing. The height alone carries the numerical information. Varying bar widths creates an optical illusion of greater area, violating standard data presentation rules.',
    hints: [
      'What feature of a bar represents the numerical data?',
      'Height alone carries the data value.',
      'Uniform bar width and equal spacing ensure honest visual comparison.'
    ],
  },
  {
    id: 'ch_18_reverse_mean_calc',
    nodeId: NODE_C6_MATH_084,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'The mean height of 5 basketball players is 160 cm. When a 6th player joins the team, the new mean height becomes 162 cm. What is the height of the 6th player in cm?',
    correctAnswer: 172,
    tolerance: 0,
    unit: 'cm',
    explanation: 'Total height of 5 players = 5 × 160 = 800 cm. Total height of 6 players = 6 × 162 = 972 cm. Height of 6th player = 972 - 800 = 172 cm.',
    hints: [
      'Find the total sum of heights for 5 players: 5 × 160.',
      'Find the total sum of heights for 6 players: 6 × 162.',
      'Subtract the original total from the new total: 972 - 800 = 172 cm.'
    ],
  },
  {
    id: 'ch_19_median_missing_variable',
    nodeId: NODE_C6_MATH_084,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Seven numbers are arranged in ascending order: 4, 7, 9, x, 15, 18, 22. If the median of these numbers is 12, what is the value of x?',
    correctAnswer: 12,
    tolerance: 0,
    unit: '',
    explanation: 'For n = 7 observations in ascending order, the median is the 4th value: (7 + 1) / 2 = 4th position. The 4th value in the sorted list is x. Therefore, x = 12.',
    hints: [
      'The data is already sorted in ascending order.',
      'For 7 numbers, which position is the exact middle value?',
      'Position 4 is the median, so x = 12.'
    ],
  },
  {
    id: 'ch_20_picto_budget_scale',
    nodeId: NODE_C6_MATH_082,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A charity raised money: Class 6A raised ₹2400, Class 6B raised ₹3600, Class 6C raised ₹1800. If 1 Rupee Coin symbol = ₹600, how many TOTAL symbols must be drawn for all three classes combined?',
    correctAnswer: 13,
    tolerance: 0,
    unit: 'symbols',
    explanation: 'Total money = 2400 + 3600 + 1800 = ₹7800. Symbols needed = 7800 / 600 = 13 symbols. (Or: Class 6A = 4 symbols, 6B = 6 symbols, 6C = 3 symbols; 4 + 6 + 3 = 13 symbols).',
    hints: [
      'Calculate the symbols for each class or find the grand total first.',
      'Class 6A = 2400/600 = 4; Class 6B = 3600/600 = 6; Class 6C = 1800/600 = 3.',
      '4 + 6 + 3 = 13 symbols.'
    ],
  },
  {
    id: 'ch_21_design_data_set',
    nodeId: NODE_C6_MATH_084,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You need to create a data set of 5 positive whole numbers where the Mean is 10 and the Median is 8. Which of the following data sets satisfies BOTH conditions?',
    options: [
      '4, 6, 8, 12, 20 (Sum = 50, Median = 8)',
      '2, 4, 8, 10, 12 (Sum = 36, Median = 8)',
      '10, 10, 10, 10, 10 (Sum = 50, Median = 10)',
      '8, 8, 8, 8, 8 (Sum = 40, Median = 8)'
    ],
    correctIndex: 0,
    explanation: 'Condition 1: Mean = 10 for 5 numbers requires Sum = 5 × 10 = 50. Condition 2: Median = 8 requires the 3rd number in sorted order to be 8. For [4, 6, 8, 12, 20], Sum = 4 + 6 + 8 + 12 + 20 = 50 and middle value is 8. Perfect!',
    hints: [
      'Check the sum condition: 5 numbers with mean 10 must add up to 50.',
      'Check the median condition: the 3rd number when sorted must be 8.',
      '4 + 6 + 8 + 12 + 20 = 50, and 8 is in the middle.'
    ],
  },
  {
    id: 'ch_22_raw_to_bargraph_synthesis',
    nodeId: NODE_C6_MATH_083,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A bar graph has 4 bars with heights 15 cm, 25 cm, 10 cm, and 30 cm. If the scale is 1 cm = 4 students, what is the total number of students represented in the entire graph?',
    correctAnswer: 320,
    tolerance: 0,
    unit: 'students',
    explanation: 'Total height in cm = 15 + 25 + 10 + 30 = 80 cm. Total students = 80 cm × 4 students/cm = 320 students.',
    hints: [
      'Add the heights of all 4 bars together.',
      '15 + 25 + 10 + 30 = 80 cm total height.',
      'Multiply total height by scale factor 4: 80 × 4 = 320 students.'
    ],
  }
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
  nodeId: NODE_C6_MATH_081,
  title: 'Collection & Organisation of Data: Tallies, Pictographs, Bar Graphs, Mean & Median',
  definition: 'Data handling is the process of collecting raw observations from real-life situations, organising them systematically in tally frequency tables, representing them visually with scaled pictographs and bar graphs, and calculating central tendencies like mean and median.',
  eli5: 'Think of data handling as organising a chaotic toy box! First, we sort toys into neat piles and count them in bundles of five. Next, we draw picture icons or vertical towers to compare piles at a glance. Finally, we find the fair-share split (mean) and the middle-sized toy (median)!',
  misconceptions: [
    { misconception: 'Five tallies are drawn as five separate upright strokes |||||', correction: 'The 5th tally must be drawn diagonally across the first four (||||\\) to close the bundle of five.' },
    { misconception: 'Frequency is the number of bundles, not the number of items', correction: 'Frequency is the total count of responses. Two bundles plus two strokes means frequency 12, not 2.' },
    { misconception: 'The median is the middle number of raw data in original unsorted order', correction: 'Data MUST always be arranged in ascending order first before finding the middle value.' },
    { misconception: 'In pictographs, 1 symbol always equals 1 unit', correction: 'In scaled pictographs, one symbol represents multiple units as specified in the scale key (legend).' },
    { misconception: 'A half symbol in a pictograph means half an item (e.g., 0.5 of an apple)', correction: 'A half symbol represents half of the scale value. If 1 symbol = 10 items, half symbol = 5 items.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the primary benefit of bundling tallies in groups of five?', options: ['It uses less ink', 'It allows the human eye to count rapidly in fives rather than ones', 'It makes the table taller', 'It hides duplicate entries'], correctIndex: 1 },
    { question: 'In a pictograph where 1 Star = 20 points, what do 3.5 stars represent?', options: ['70 points', '35 points', '23.5 points', '60 points'], correctIndex: 0 },
    { question: 'What must be identical across all bars in a standard bar graph?', options: ['Bar height', 'Bar color only', 'Bar width and the gaps between consecutive bars', 'The category names'], correctIndex: 2 },
    { question: 'What is the median of: 8, 1, 6, 3, 9?', options: ['6 (after sorting: 1, 3, 6, 8, 9)', '8', '1', '3'], correctIndex: 0 },
    { question: 'If 4 observations are 10, 20, 30, 40, what is the mean?', options: ['20', '25', '30', '100'], correctIndex: 1 },
    { question: 'For an even number of observations (e.g., 6 items), how is the median determined?', options: ['Pick the 3rd item only', 'Pick the 4th item only', 'Take the mean (average) of the 3rd and 4th items in sorted order', 'The median does not exist'], correctIndex: 2 },
    { question: 'Why does an extreme outlier (e.g., 100 in {2, 3, 4, 100}) affect the mean more than median?', options: ['Because mean uses every value in its sum, whereas median only depends on position', 'Because median is always smaller than mean', 'Outliers never affect mean', 'Median cannot be calculated with outliers'], correctIndex: 0 },
    { question: 'What is the sum of frequencies in a frequency table always equal to?', options: ['The largest single category', 'The total number of raw observations collected', 'Zero', 'Always 100'], correctIndex: 1 }
  ],
  masteryCriteria: 'Mastery is achieved when a student can fluently organize raw data into bundled tally frequency tables, construct and interpret scaled pictographs and bar graphs, and compute/differentiate mean and median for data sets up to 10 observations.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Tally Counter & Frequency Table',
    instruction: 'Click the fruit buttons below to add raw votes. Watch how the tally marks group into bundles of 5 with a diagonal slash and update the frequency table in real-time!',
    interactionType: 'tally-lab',
    nodeId: NODE_C6_MATH_081,
  },
  {
    title: 'Lab 2: Pictograph Scaler & Key Legend',
    instruction: 'Adjust the Scale Slider (1 Star = 2, 5, 10, or 20 points) to see how scaling compresses large numbers into manageable symbols, including half-stars for remainders.',
    interactionType: 'picto-lab',
    nodeId: NODE_C6_MATH_082,
  },
  {
    title: 'Lab 3: Interactive Bar Graph Coordinate Grid',
    instruction: 'Drag the bar height sliders on graph paper. Notice how bar widths and gaps stay strictly uniform while heights match the vertical scale markings.',
    interactionType: 'bargraph-lab',
    nodeId: NODE_C6_MATH_083,
  },
  {
    title: 'Lab 4: Mean Balance Beam (The Fulcrum)',
    instruction: 'Place weight tokens on the numbered seesaw. Watch the fulcrum balance point shift to exactly the mathematical Mean of the weights!',
    interactionType: 'mean-lab',
    nodeId: NODE_C6_MATH_084,
  },
  {
    title: 'Lab 5: Median Sorter (Odd vs Even Data Sets)',
    instruction: 'Add numbers to the sorting tray. Click "Sort Ascending" and watch the algorithm highlight the true middle value (or average of two middle values).',
    interactionType: 'median-lab',
    nodeId: NODE_C6_MATH_084,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you have 23 votes for Mango, how many full bundles of 5 and remaining individual strokes will be drawn?',
    options: [
      '4 full bundles of 5 and 3 single strokes (4 × 5 + 3 = 23)',
      '2 bundles of 10 and 3 strokes',
      '23 separate single strokes without slashes',
      '5 full bundles of 5'
    ],
    correctIndex: 0,
    verifyInstruction: 'Now click "Add Mango" in the lab below until it reaches 23 to verify the visual bundle formation!',
    nodeId: NODE_C6_MATH_081,
  },
  {
    question: 'Predict: If a sports score set is [10, 10, 10, 10, 90], what will happen to the Mean compared to the Median?',
    options: [
      'The Mean and Median will stay exactly the same (10)',
      'The single large outlier (90) will pull the Mean up to 26, while the Median remains 10',
      'The Median will jump to 90 and the Mean will stay 10',
      'Both Mean and Median will become 90'
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Mean Balance Beam to place weights at 10, 10, 10, 10, and 90 to see the fulcrum shift!',
    nodeId: NODE_C6_MATH_084,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the tally bundle whenever the count reaches a multiple of 5 (5, 10, 15...)?',
    observableOptions: [
      'The 5th stroke is drawn diagonally across the 4 vertical strokes to lock the bundle',
      'The previous 4 strokes disappear',
      'A new circle is drawn around the table',
      'The frequency resets to zero'
    ],
    correctIndex: 0,
    nodeId: NODE_C6_MATH_081,
  },
  {
    question: 'When you increase the Pictograph Scale from 1 to 10, what happens to the total number of symbols drawn?',
    observableOptions: [
      'More symbols must be drawn',
      'The number of symbols decreases by a factor of 10, making large data compact and readable',
      'The symbols turn into squares',
      'The scale key disappears'
    ],
    correctIndex: 1,
    nodeId: NODE_C6_MATH_082,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief School Sports Carnival Auditor',
  description: 'Apply your data handling mastery to conduct a live mini-census of sports equipment or classmate attendance.',
  steps: [
    'Record raw tallies of 20 items (e.g., cricket bats, footballs, skipping ropes, chessboards).',
    'Construct a 3-column frequency table with bundles of five (||||\\).',
    'Pick an optimal scale (e.g., 1 symbol = 4 items) and draft a compact pictograph.',
    'Draw a bar graph on squared grid paper with equal widths and gaps.',
    'Calculate the mean and median items per category to report to the Principal.'
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C6_MathematicsCollectionOrganisationDataSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C6_MATH_081,
  title = DEFAULT_PROPS.title || 'Collection & Organisation of Data',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict-then-Check & Observation State
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [, setObservationIndex] = useState(-1);

  // Interactive Exploration Labs State
  // Lab 1: Tally
  const [tallyCounts, setTallyCounts] = useState<Record<string, number>>({ Apple: 7, Mango: 12, Banana: 5, Guava: 3 });
  const [rawVotesList, setRawVotesList] = useState<string[]>(['Apple', 'Mango', 'Mango', 'Banana', 'Guava', 'Apple', 'Mango']);
  // Lab 2: Pictograph
  const [pictoScale, setPictoScale] = useState<number>(5);
  const [pictoData] = useState<Record<string, number>>({ Cricket: 35, Football: 25, Basketball: 15, Tennis: 10 });
  // Lab 3: Bar Graph
  const [barValues, setBarValues] = useState<Record<string, number>>({ Monday: 40, Tuesday: 60, Wednesday: 80, Thursday: 50, Friday: 70 });
  const [barYScale] = useState<number>(10);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  // Lab 4: Mean Balance Beam
  const [beamWeights, setBeamWeights] = useState<number[]>([20, 40, 60, 80, 100]);
  const [newWeightInput, setNewWeightInput] = useState<number>(50);
  // Lab 5: Median Sorter
  const [medianItems, setMedianItems] = useState<number[]>([14, 8, 22, 5, 19, 12, 17]);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  // Reflection State
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explain: '',
    realLife: ''
  });

  // Challenge System State
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

  // Challenge Interaction Specifics
  const [draggedLabelItem, setDraggedLabelItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // UI Feedback States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Canvas Ref for real-time statistical animation
  const statsCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Inactivity & Adaptive Engine Refs
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bktStateRef = useRef(createBKTState());

  // ─── ADAPTIVE CHALLENGE FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') {
      return CHALLENGES.filter(c => c.difficulty === 'foundation');
    }
    if (difficulty === 'standard') {
      return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    }
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT EFFECT: LOAD PERSISTED MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY ADAPTATION EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const currentMastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(currentMastery);
    const newTier = (currentMastery === 'not-started' || currentMastery === 'beginner')
      ? 'foundation'
      : currentMastery === 'developing'
      ? 'standard'
      : 'advanced';

    setDifficulty(prev => {
      if (prev !== newTier) {
        setCurrentChallenge(0);
        return newTier;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── DERIVED LAB CALCULATIONS ───
  // Mean Calculation for Lab 4
  const currentMean = useMemo(() => {
    if (beamWeights.length === 0) return 0;
    const sum = beamWeights.reduce((acc, val) => acc + val, 0);
    return Math.round((sum / beamWeights.length) * 10) / 10;
  }, [beamWeights]);

  // Median Calculation for Lab 5
  const currentMedian = useMemo(() => {
    if (medianItems.length === 0) return 0;
    const sorted = [...medianItems].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 !== 0) {
      return sorted[mid];
    }
    return Math.round(((sorted[mid - 1] + sorted[mid]) / 2) * 10) / 10;
  }, [medianItems]);

  // ─── REAL-TIME STATS CANVAS ANIMATION ───
  useEffect(() => {
    const canvas = statsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background grid lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw dynamic pulse wave representing data flow
      ctx.beginPath();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2.5;
      for (let x = 0; x < canvas.width; x++) {
        const y = (canvas.height / 2) + Math.sin((x + tick * 2) * 0.05) * 8 * Math.cos(x * 0.01);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw glowing balance point
      const meanX = Math.min(canvas.width - 20, Math.max(20, (currentMean / 100) * canvas.width));
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(meanX, canvas.height / 2, 6 + Math.sin(tick * 0.1) * 2, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [currentMean]);

  // ─── EVENT HANDLERS ───

  // 1. Discovery Answer
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Superb! Raw data is hard to interpret without organisation.');
    } else {
      audioManager.play('pop');
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  // 2. Navigation between Phases
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive data labs! Let us explore by doing.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now take the driver seat in Free Play mode. Test any data values without grading pressure!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for the Sports Day Data Challenge! Let us put your skills to the test.');
  }, []);

  // 3. Tally Lab Add Vote
  const handleAddTallyVote = useCallback((fruit: string) => {
    audioManager.play('tap');
    setTallyCounts(prev => ({
      ...prev,
      [fruit]: (prev[fruit] || 0) + 1
    }));
    setRawVotesList(prev => [...prev.slice(-14), fruit]);
    audioManager.play('count');
  }, []);

  // 4. Reset Tally Votes
  const handleResetTallies = useCallback(() => {
    audioManager.play('whoosh');
    setTallyCounts({ Apple: 0, Mango: 0, Banana: 0, Guava: 0 });
    setRawVotesList([]);
  }, []);

  // 5. Pictograph Scale Change
  const handlePictoScaleChange = useCallback((newScale: number) => {
    setPictoScale(newScale);
    audioManager.play('pop');
    speechManager.speak(`Scale updated: one symbol now equals ${newScale} points.`);
  }, []);

  // 6. Bar Graph Value Change
  const handleBarValueChange = useCallback((category: string, newVal: number) => {
    setBarValues(prev => ({
      ...prev,
      [category]: newVal
    }));
    audioManager.play('count');
  }, []);

  // 7. Mean Beam Add Weight
  const handleAddBeamWeight = useCallback(() => {
    if (beamWeights.length >= 10) {
      speechManager.speak('Maximum of 10 observations reached for Class 6 syllabus.');
      return;
    }
    audioManager.play('balance');
    setBeamWeights(prev => [...prev, newWeightInput]);
  }, [beamWeights.length, newWeightInput]);

  // 8. Mean Beam Remove Weight
  const handleRemoveBeamWeight = useCallback((indexToRemove: number) => {
    audioManager.play('pop');
    setBeamWeights(prev => prev.filter((_, idx) => idx !== indexToRemove));
  }, []);

  // 9. Median Sorter Toggle
  const handleSortMedianList = useCallback(() => {
    audioManager.play('whoosh');
    if (!isSorted) {
      setMedianItems(prev => [...prev].sort((a, b) => a - b));
      setIsSorted(true);
      speechManager.speak('Sorted in ascending order! Notice the central value.');
    } else {
      setMedianItems([14, 8, 22, 5, 19, 12, 17]);
      setIsSorted(false);
    }
  }, [isSorted]);

  // 10. Predict-Then-Check Submission
  const handlePredictionSubmit = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Now interact with the lab to verify your hypothesis.');
  }, []);

  // 11. Observation Question Submission
  const handleObservationSubmit = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Excellent scientific observation! Bundles of five streamline counting.');
    } else {
      audioManager.play('pop');
      speechManager.speak('Check the visual bundle: four upright posts and one diagonal slash.');
    }
  }, []);

  // 12. Escalating Hints Handler
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      setCurrentHint(activeChallenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us review the complete step-by-step mathematical reasoning.');
    }
  }, [hintCount, activeChallenge]);

  // 13. Auto-hint Inactivity Timer Reset
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // 14. Standardized Drag and Drop Handlers for Challenges
  const handleDragStart = useCallback((label: string) => {
    setDraggedLabelItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedLabelItem) return;
    const isTargetCorrect = activeChallenge.correctMapping?.[targetId] === draggedLabelItem;
    if (isTargetCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedLabelItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
    }
    setDraggedLabelItem(null);
  }, [draggedLabelItem, activeChallenge]);

  // 15. Drag-Sort Move Handler
  const handleSortItemMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length === 0 && activeChallenge.sortItems
        ? activeChallenge.sortItems.map((_, i) => i)
        : [...prev];
      const [moved] = base.splice(fromIndex, 1);
      base.splice(toIndex, 0, moved);
      return base;
    });
  }, [activeChallenge]);

  // 16. Complete Session Handler
  const handleCompleteSession = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding! You have mastered Class 6 Data Handling!');
  }, [errors, onComplete]);

  // 17. Advance to Next Challenge
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
      handleCompleteSession();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSession]);

  // 18. Central Answer Evaluation Handler
  const handleAnswerSubmit = useCallback((userAnswer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = userAnswer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(userAnswer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(userAnswer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const val = typeof userAnswer === 'string' ? parseFloat(userAnswer) : userAnswer as number;
      isCorrect = Math.abs(val - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = userAnswer === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Well done.');
      setShowConfetti(true);
      setShowExplanation(true);

      // BKT Update
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      // Spaced Repetition Update
      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      // Record Misconception
      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Review the step-by-step proof below before continuing.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, hitMisconceptions, resetInactivityTimer, showNextHint]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Helper for rendering SVG Tally marks
  const renderTallySVG = (count: number) => {
    const bundles = Math.floor(count / 5);
    const remainder = count % 5;
    return (
      <div className="flex items-center gap-3 flex-wrap">
        {Array.from({ length: bundles }).map((_, bIdx) => (
          <svg key={`b_${bIdx}`} viewBox="0 0 45 40" className="w-10 h-9 bg-slate-900/80 p-1 rounded border border-gold-500/30">
            {/* 4 Vertical strokes */}
            <line x1="8" y1="6" x2="8" y2="34" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
            <line x1="16" y1="6" x2="16" y2="34" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
            <line x1="24" y1="6" x2="24" y2="34" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
            <line x1="32" y1="6" x2="32" y2="34" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
            {/* 5th Diagonal slash */}
            <line x1="4" y1="34" x2="36" y2="6" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        ))}
        {remainder > 0 && (
          <svg viewBox="0 0 45 40" className="w-10 h-9 bg-slate-900/80 p-1 rounded border border-gold-500/30">
            {Array.from({ length: remainder }).map((_, rIdx) => (
              <line
                key={`r_${rIdx}`}
                x1={8 + rIdx * 8}
                y1="6"
                x2={8 + rIdx * 8}
                y2="34"
                stroke="#60a5fa"
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}
          </svg>
        )}
        {count === 0 && <span className="text-slate-500 text-xs italic">No votes yet</span>}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gold-600/20 border border-gold-500/40 flex items-center justify-center text-2xl shadow-inner">
            {subjectConfig.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-bold text-gold-400 bg-gold-950/80 px-2.5 py-0.5 rounded-full border border-gold-800">
                ICSE Class 6 Math
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' :
                  difficulty === 'advanced' ? 'bg-purple-950 text-purple-400 border border-purple-700' :
                  'bg-gold-950 text-gold-400 border border-gold-700'
                }`}
              >
                {difficulty}
              </motion.span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white mt-1">
              {title}
            </h1>
          </div>
        </div>

        {/* Global Progress & Score Pill */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400 font-medium">BKT Mastery</p>
            <p className="text-sm font-bold text-gold-300 capitalize">{masteryLevel}</p>
          </div>
          <div className="px-4 py-2 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-2">
            <span className="text-emerald-400 font-mono font-bold">{scoreBreakdown.correct}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-300 font-mono">{scoreBreakdown.total}</span>
          </div>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY (Curiosity Hook) ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.section
            key="discovery_phase"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="mt-6 space-y-6"
          >
            {/* Narrative Context Card */}
            <div className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-900 rounded-2xl border border-gold-800/60 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🏆</span>
                <h2 className="text-xl font-bold text-gold-300">{SCENARIO.title}</h2>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs text-gold-200/70 mt-3 pt-3 border-t border-gold-900/50">
                🎯 <strong className="text-gold-300">Mission:</strong> {SCENARIO.context}
              </p>
            </div>

            {/* Hook Question */}
            <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400 bg-amber-950/50 px-2.5 py-1 rounded-md border border-amber-800/60 inline-block mb-3">
                Curiosity Discovery Hook
              </span>
              <p className="text-base sm:text-lg font-semibold text-white mb-4">
                {DISCOVERY_QUESTION.question}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleDiscoveryAnswer(idx)}
                    disabled={discoveryAnswered}
                    className={`p-4 rounded-xl text-left text-sm font-medium transition-all duration-200 border ${
                      discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : discoveryAnswered && !discoveryCorrect
                        ? 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-gold-400 font-bold">{String.fromCharCode(65 + idx)}.</span>
                      <span>{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <p className="text-xs sm:text-sm text-slate-300">
                    {discoveryCorrect ? (
                      <span className="text-emerald-400 font-semibold">✓ Correct Insight! </span>
                    ) : (
                      <span className="text-amber-400 font-semibold">💡 Key Discovery: </span>
                    )}
                    {DISCOVERY_QUESTION.hintAfter}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-gold-600/30 whitespace-nowrap transition-colors"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}

        {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
        {phase === 'explore' && (
          <motion.section
            key="explore_phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-6"
          >
            {/* Lab Step Tabs */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 border-b border-slate-800">
              {EXPLORATION_STEPS.map((step, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    currentSlide === idx
                      ? 'bg-gold-600 text-white shadow-md shadow-gold-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {idx + 1}. {step.title.split(':')[0]}
                </motion.button>
              ))}
            </div>

            {/* Active Lab Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-gold-300">
                    {EXPLORATION_STEPS[currentSlide].title}
                  </h3>
                  <p className="text-amber-400 text-xs sm:text-sm mt-1">
                    👉 {EXPLORATION_STEPS[currentSlide].instruction}
                  </p>
                </div>

                {/* LAB 1: TALLY & FREQUENCY TABLE */}
                {currentSlide === 0 && (
                  <div className="space-y-6">
                    {/* Live Fruit Clicker Palette */}
                    <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 font-bold uppercase">Cast Raw Votes:</span>
                      {['Apple', 'Mango', 'Banana', 'Guava'].map(fruit => (
                        <motion.button
                          key={fruit}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddTallyVote(fruit)}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-2 shadow"
                        >
                          <span>{fruit === 'Apple' ? '🍎' : fruit === 'Mango' ? '🥭' : fruit === 'Banana' ? '🍌' : '🍈'}</span>
                          <span>+ {fruit}</span>
                        </motion.button>
                      ))}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleResetTallies}
                        className="ml-auto px-3 py-2 bg-rose-950/60 hover:bg-rose-900 text-rose-300 rounded-xl text-xs font-bold border border-rose-800"
                      >
                        Reset Table
                      </motion.button>
                    </div>

                    {/* Raw Stream Display */}
                    <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs font-mono text-slate-400 overflow-x-auto whitespace-nowrap">
                      <strong className="text-gold-400">Raw Stream: </strong>
                      {rawVotesList.length > 0 ? rawVotesList.join(', ') : 'Waiting for raw survey votes...'}
                    </div>

                    {/* Real-Time Frequency Table */}
                    <div className="overflow-x-auto rounded-xl border border-slate-800">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-slate-950 text-slate-300 uppercase tracking-wider font-bold">
                          <tr>
                            <th className="p-3 border-b border-slate-800">Category (Fruit)</th>
                            <th className="p-3 border-b border-slate-800">Tally Marks (Bundles of 5)</th>
                            <th className="p-3 border-b border-slate-800 text-right">Frequency (Count)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                          {Object.entries(tallyCounts).map(([fruit, count]) => (
                            <tr key={fruit} className="hover:bg-slate-800/40 transition-colors">
                              <td className="p-3 font-semibold text-white flex items-center gap-2">
                                <span>{fruit === 'Apple' ? '🍎' : fruit === 'Mango' ? '🥭' : fruit === 'Banana' ? '🍌' : '🍈'}</span>
                                {fruit}
                              </td>
                              <td className="p-3">{renderTallySVG(count)}</td>
                              <td className="p-3 text-right font-mono font-bold text-gold-300 text-base">{count}</td>
                            </tr>
                          ))}
                          <tr className="bg-slate-950/90 font-bold text-white">
                            <td className="p-3" colSpan={2}>Total Number of Observations</td>
                            <td className="p-3 text-right font-mono text-emerald-400 text-base">
                              {Object.values(tallyCounts).reduce((a, b) => a + b, 0)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Observation Question */}
                    {!observationAnswered && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-gold-950/40 rounded-xl border border-gold-800">
                        <p className="text-xs font-bold text-gold-300 mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, oIdx) => (
                            <motion.button
                              key={oIdx}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleObservationSubmit(oIdx)}
                              className="p-2.5 text-left text-xs bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-200 border border-slate-800"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* LAB 2: PICTOGRAPH SCALER */}
                {currentSlide === 1 && (
                  <div className="space-y-6">
                    {/* Predict-Then-Check Box */}
                    {!predictionMade && (
                      <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800">
                        <span className="text-xs font-bold text-amber-400">Step 1: Predict Before Interacting</span>
                        <p className="text-xs sm:text-sm text-white font-semibold mt-1 mb-3">
                          {PREDICTION_QUESTIONS[0].question}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {PREDICTION_QUESTIONS[0].options.map((opt, pIdx) => (
                            <motion.button
                              key={pIdx}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handlePredictionSubmit(pIdx)}
                              className="p-2.5 text-left text-xs bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-200 border border-slate-800"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Scale Selector Controller */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <label className="text-xs text-slate-400 font-bold uppercase block mb-1">
                          Pictograph Scale Legend (Key):
                        </label>
                        <span className="text-sm font-extrabold text-amber-300">
                          ⭐ 1 Star Symbol = {pictoScale} points
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {[2, 5, 10, 20].map(sVal => (
                          <motion.button
                            key={sVal}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePictoScaleChange(sVal)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              pictoScale === sVal
                                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            Scale {sVal}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Visual Pictograph Rows */}
                    <div className="space-y-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Sports Carnival Points Pictograph
                      </h4>
                      {Object.entries(pictoData).map(([sport, value]) => {
                        const fullStars = Math.floor(value / pictoScale);
                        const remainder = value % pictoScale;
                        const hasHalf = remainder >= pictoScale / 2;

                        return (
                          <div key={sport} className="p-3 bg-slate-900 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border border-slate-800">
                            <div className="w-28 font-bold text-white text-xs sm:text-sm">
                              {sport}:
                            </div>
                            {/* Stars Display */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {Array.from({ length: fullStars }).map((_, stIdx) => (
                                <motion.span
                                  key={`full_${stIdx}`}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="text-lg text-amber-400"
                                >
                                  ⭐
                                </motion.span>
                              ))}
                              {hasHalf && (
                                <span className="text-sm text-amber-300 font-bold bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800">
                                  ½⭐
                                </span>
                              )}
                            </div>
                            <div className="text-right font-mono text-xs text-gold-300">
                              {value} pts <span className="text-slate-500 text-[10px]">({fullStars} full {hasHalf ? '+ ½' : ''})</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* LAB 3: BAR GRAPH COORDINATE GRID */}
                {currentSlide === 2 && (
                  <div className="space-y-6">
                    {/* Interactive Slider Bar Controls */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                      {Object.entries(barValues).map(([day, val]) => (
                        <div key={day} className="space-y-1">
                          <div className="flex justify-between text-xs text-slate-300">
                            <span>{day.slice(0, 3)}</span>
                            <span className="font-mono text-gold-400 font-bold">{val}</span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            step={10}
                            value={val}
                            aria-label={`Set bar value for ${day}`}
                            onChange={e => handleBarValueChange(day, parseInt(e.target.value))}
                            className="w-full accent-gold-500 cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Visual Bar Graph SVG on Graph Grid */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-center text-xs font-bold text-slate-300 mb-2">
                        Daily Tournament Attendance (Vertical Scale: 1 unit = {barYScale} students)
                      </div>
                      <svg viewBox="0 0 500 240" className="w-full max-h-64 bg-slate-900/80 rounded-xl p-2">
                        {/* Grid Lines */}
                        {[0, 20, 40, 60, 80, 100].map((gridVal, gIdx) => {
                          const yPos = 190 - (gridVal / 100) * 160;
                          return (
                            <g key={gIdx}>
                              <line x1="45" y1={yPos} x2="480" y2={yPos} stroke="#334155" strokeDasharray="3,3" />
                              <text x="35" y={yPos + 4} fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">
                                {gridVal}
                              </text>
                            </g>
                          );
                        })}

                        {/* Axes */}
                        <line x1="45" y1="190" x2="480" y2="190" stroke="#cbd5e1" strokeWidth="2" />
                        <line x1="45" y1="20" x2="45" y2="190" stroke="#cbd5e1" strokeWidth="2" />

                        {/* Rectangular Bars */}
                        {Object.entries(barValues).map(([day, val], bIdx) => {
                          const barWidth = 45;
                          const gap = 38;
                          const xPos = 65 + bIdx * (barWidth + gap);
                          const barHeight = (val / 100) * 160;
                          const yPos = 190 - barHeight;
                          const isHovered = hoveredBar === day;

                          return (
                            <g
                              key={day}
                              onMouseEnter={() => setHoveredBar(day)}
                              onMouseLeave={() => setHoveredBar(null)}
                              className="cursor-pointer transition-all"
                            >
                              <motion.rect
                                initial={false}
                                animate={{ height: barHeight, y: yPos }}
                                transition={{ type: 'spring', damping: 20 }}
                                x={xPos}
                                width={barWidth}
                                rx="4"
                                fill={isHovered ? '#818cf8' : '#4f46e5'}
                                stroke="#6366f1"
                                strokeWidth="1"
                              />
                              <text x={xPos + barWidth / 2} y="205" fill="#cbd5e1" fontSize="10" textAnchor="middle">
                                {day.slice(0, 3)}
                              </text>
                              {val > 0 && (
                                <text x={xPos + barWidth / 2} y={yPos - 6} fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                                  {val}
                                </text>
                              )}
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                )}

                {/* LAB 4: MEAN BALANCE BEAM (FULCRUM) */}
                {currentSlide === 3 && (
                  <div className="space-y-6">
                    {/* Live Stats Canvas */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold uppercase text-slate-400">Mean Fulcrum Wave Analysis</span>
                        <span className="text-xs font-mono text-emerald-400 font-bold">
                          Mean (Balance Point) = {currentMean}
                        </span>
                      </div>
                      <canvas ref={statsCanvasRef} width={500} height={50} className="w-full h-12 rounded-lg bg-slate-900" />
                    </div>

                    {/* Weight Adder Controls */}
                    <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 font-bold">Add Observation:</span>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={newWeightInput}
                        aria-label="New weight value"
                        onChange={e => setNewWeightInput(Number(e.target.value))}
                        className="w-20 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddBeamWeight}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow"
                      >
                        + Place Weight
                      </motion.button>
                      <div className="ml-auto text-xs text-slate-400">
                        Total Sum: <strong className="text-white font-mono">{beamWeights.reduce((a, b) => a + b, 0)}</strong> | Count: <strong className="text-white font-mono">{beamWeights.length}</strong>
                      </div>
                    </div>

                    {/* Interactive Seesaw Diagram */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 500 160" className="w-full max-h-48 bg-slate-900/90 rounded-xl">
                        {/* Seesaw Planks */}
                        <line x1="30" y1="90" x2="470" y2="90" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />

                        {/* Dynamic Fulcrum Triangle sitting under the Mean */}
                        {(() => {
                          const fulcrumX = 30 + (currentMean / 100) * 440;
                          return (
                            <g>
                              <polygon
                                points={`${fulcrumX},90 ${fulcrumX - 16},130 ${fulcrumX + 16},130`}
                                fill="#10b981"
                                stroke="#059669"
                                strokeWidth="2"
                              />
                              <text x={fulcrumX} y="145" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">
                                Mean = {currentMean}
                              </text>
                            </g>
                          );
                        })()}

                        {/* Weight Blocks on the Beam */}
                        {beamWeights.map((wt, wIdx) => {
                          const wX = 30 + (wt / 100) * 440;
                          return (
                            <g key={wIdx} onClick={() => handleRemoveBeamWeight(wIdx)} className="cursor-pointer">
                              <title>Click to remove weight</title>
                              <circle cx={wX} cy="75" r="10" fill="#6366f1" stroke="#818cf8" strokeWidth="2" />
                              <text x={wX} y="79" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                                {wt}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                      <p className="text-[11px] text-slate-400 text-center mt-2">
                        (Click any weight circle above to remove it from the data set)
                      </p>
                    </div>
                  </div>
                )}

                {/* LAB 5: MEDIAN ORDERING LAB */}
                {currentSlide === 4 && (
                  <div className="space-y-6">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-xs text-slate-400 font-bold uppercase block">Current Status:</span>
                        <span className={`text-sm font-bold ${isSorted ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {isSorted ? '✓ Sorted in Ascending Order' : '⚠️ Unsorted Raw Sequence'}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSortMedianList}
                        className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-600/30"
                      >
                        {isSorted ? 'Shuffle List' : 'Sort Ascending →'}
                      </motion.button>
                    </div>

                    {/* Number Tile Sequence */}
                    <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-center gap-3">
                      {medianItems.map((val, idx) => {
                        const isMiddle = isSorted && idx === Math.floor(medianItems.length / 2);
                        return (
                          <motion.div
                            key={idx}
                            layout
                            className={`w-14 h-16 rounded-xl flex flex-col items-center justify-center border-2 transition-all ${
                              isMiddle
                                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/20 scale-110'
                                : 'bg-slate-900 border-slate-700 text-slate-200'
                            }`}
                          >
                            <span className="text-base font-extrabold font-mono">{val}</span>
                            <span className="text-[9px] text-slate-500 mt-1">pos {idx + 1}</span>
                          </motion.div>
                        );
                      })}
                    </div>

                    {isSorted && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800 text-center">
                        <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">Exact Middle Value</span>
                        <p className="text-lg font-extrabold text-white mt-1">
                          Median = <span className="text-emerald-400 font-mono">{currentMedian}</span>
                        </p>
                        <p className="text-xs text-slate-300 mt-1">
                          Since n = {medianItems.length} (odd count), the median is located at position (7 + 1)/2 = 4th item.
                        </p>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Exploration Footer Navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                    disabled={currentSlide === 0}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl text-xs font-bold border border-slate-700"
                  >
                    ← Previous Lab
                  </motion.button>

                  <span className="text-xs font-mono text-slate-400">
                    Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                  </span>

                  {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentSlide(s => s + 1)}
                      className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow"
                    >
                      Next Lab →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAdvanceToSandbox}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                    >
                      Try Free Play Sandbox →
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.section>
        )}

        {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
        {phase === 'sandbox' && (
          <motion.section
            key="sandbox_phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-6"
          >
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gold-300">Data Play Sandbox</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Explore relationships between tally bundles, pictograph scales, bar heights, and mean balance points without scoring.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToChallenge}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                >
                  Ready for Challenges! →
                </motion.button>
              </div>

              {/* Combined Sandbox Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {/* Tally & Bar Hybrid */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-xs uppercase font-bold text-gold-400">1. Instant Tally & Bar Sync</span>
                  <div className="space-y-2">
                    {Object.entries(tallyCounts).map(([fruit, count]) => (
                      <div key={fruit} className="flex items-center justify-between gap-2">
                        <span className="text-xs text-slate-300 w-16">{fruit}:</span>
                        <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gold-500 rounded-full"
                            animate={{ width: `${Math.min(100, count * 5)}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono text-gold-300 w-8 text-right">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mean & Median Comparison */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-xs uppercase font-bold text-emerald-400">2. Central Tendency Comparison</span>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Mean (Equal Split)</span>
                      <p className="text-lg font-mono font-bold text-emerald-400 mt-1">{currentMean}</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Median (Middle Rank)</span>
                      <p className="text-lg font-mono font-bold text-gold-400 mt-1">{currentMedian}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* ─── PHASE 4: CHALLENGE SUITE (Adaptive 3-Tier NEP 2020) ─── */}
        {phase === 'challenge' && (
          <motion.section
            key="challenge_phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-6"
          >
            {/* Top Challenge Progress & Meta */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gold-400">
                    Challenge {currentChallenge + 1} of {filteredChallenges.length}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                    Competency: <strong className="text-amber-300">{activeChallenge.competencyLevel}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Difficulty:</span>
                  <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${
                    activeChallenge.difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                    activeChallenge.difficulty === 'standard' ? 'bg-gold-950 text-gold-300 border border-gold-800' :
                    'bg-purple-950 text-purple-300 border border-purple-800'
                  }`}>
                    {activeChallenge.difficulty}
                  </span>
                </div>
              </div>

              {/* Dynamic Animated Progress Bar */}
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-500 rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Active Challenge Card */}
            <motion.div
              animate={wrongShake ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={`p-6 bg-slate-900 rounded-2xl border transition-colors duration-300 ${
                wrongFlash ? 'border-rose-500 bg-rose-950/20' : 'border-slate-800'
              }`}
            >
              <h3 className="text-base sm:text-lg font-bold text-white mb-6 leading-relaxed">
                {activeChallenge.question}
              </h3>

              {/* 1. MCQ FORMAT (classify, distinguish, match) */}
              {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {activeChallenge.options.map((option, oIdx) => (
                    <motion.button
                      key={oIdx}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswerSubmit(oIdx)}
                      disabled={showExplanation || answerRevealed}
                      className={`p-4 rounded-xl text-left text-sm font-medium border transition-all ${
                        showExplanation && oIdx === activeChallenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : showExplanation
                          ? 'bg-slate-950/50 border-slate-800 text-slate-500'
                          : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-mono text-xs text-gold-400 font-bold border border-slate-700">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="flex-1">{option}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* 2. NUMERIC INPUT FORMAT */}
              {activeChallenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={e => setNumericInput(e.target.value)}
                      placeholder="Enter exact number..."
                      aria-label="Numerical challenge input"
                      disabled={showExplanation}
                      className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-gold-500 outline-none w-48"
                    />
                    {activeChallenge.unit && (
                      <span className="text-sm font-semibold text-slate-400">{activeChallenge.unit}</span>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswerSubmit(numericInput)}
                      disabled={!numericInput || showExplanation}
                      className="px-6 py-3 bg-gold-600 hover:bg-gold-500 disabled:opacity-40 text-white text-sm font-bold rounded-xl shadow-lg shadow-gold-600/30"
                    >
                      Check Answer
                    </motion.button>
                  </div>
                </div>
              )}

              {/* 3. DRAG-LABEL FORMAT */}
              {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
                <div className="space-y-4">
                  {/* Label Palette */}
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-bold self-center mr-2">Drag Labels:</span>
                    {activeChallenge.dragItems.map((item, dIdx) => (
                      <motion.div
                        key={dIdx}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-gold-600 text-white rounded-lg text-xs font-bold cursor-grab shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  {/* Target Diagram Drop Zones */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    {Object.keys(activeChallenge.correctMapping || {}).map(targetKey => (
                      <div
                        key={targetKey}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetKey)}
                        className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[70px] transition-colors ${
                          droppedLabels[targetKey]
                            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                            : 'bg-slate-900 border-slate-700 text-slate-400'
                        }`}
                      >
                        <span className="text-[11px] uppercase font-bold text-slate-500 mb-1">
                          Drop Target: {targetKey.replace('target_', '').replace('_', ' ')}
                        </span>
                        <span className="text-xs font-bold text-white">
                          {droppedLabels[targetKey] || '📥 Drag Matching Label Here'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswerSubmit(droppedLabels)}
                    disabled={showExplanation || Object.keys(droppedLabels).length < Object.keys(activeChallenge.correctMapping || {}).length}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow"
                  >
                    Validate Labels
                  </motion.button>
                </div>
              )}

              {/* 4. DRAG-SORT FORMAT */}
              {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">Drag items to arrange in correct chronological sequence:</p>
                  <div className="space-y-2">
                    {(sortArrangement.length === activeChallenge.sortItems.length
                      ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                      : activeChallenge.sortItems
                    ).map((item, sIdx) => (
                      <motion.div
                        key={sIdx}
                        draggable
                        onDragStart={() => setDraggedLabelItem(String(sIdx))}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => {
                          const from = parseInt(draggedLabelItem || '0');
                          handleSortItemMove(from, sIdx);
                        }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 cursor-grab flex items-center gap-3"
                      >
                        <span className="w-5 h-5 rounded bg-gold-600/30 text-gold-400 font-mono font-bold flex items-center justify-center text-xs">
                          {sIdx + 1}
                        </span>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const ans = sortArrangement.length > 0 ? sortArrangement : activeChallenge.sortItems!.map((_, i) => i);
                      handleAnswerSubmit(ans);
                    }}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow"
                  >
                    Check Sequential Order
                  </motion.button>
                </div>
              )}

              {/* 5. CONSTRUCT CHALLENGE */}
              {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-bold self-center mr-2">Available Elements:</span>
                    {activeChallenge.availableParts.map((part, pIdx) => (
                      <motion.button
                        key={pIdx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        className="px-3 py-1.5 bg-gold-600 hover:bg-gold-500 text-white rounded-lg text-xs font-bold shadow"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                    {constructParts.map((part, cIdx) => (
                      <motion.span
                        key={cIdx}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 bg-gold-950 text-gold-300 rounded-lg text-xs font-bold border border-gold-700 flex items-center gap-1.5"
                      >
                        {part}
                        <button
                          onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== cIdx))}
                          className="text-rose-400 hover:text-rose-300"
                        >
                          ✕
                        </button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500 italic">Click parts above to assemble your solution...</span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswerSubmit(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow"
                  >
                    Verify Construction
                  </motion.button>
                </div>
              )}

              {/* Step-by-Step Progressive Disclosure Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-950 rounded-2xl border border-amber-800/80 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                      Step-by-Step Solution Breakdown
                    </span>
                    <span className="text-xs text-slate-400">
                      Step {Math.min(revealedSteps + 1, activeChallenge.explanation.split('. ').length)} of {activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {activeChallenge.explanation
                      .split('. ')
                      .filter(s => s.trim().length > 0)
                      .slice(0, revealedSteps + 1)
                      .map((sentence, sIdx) => (
                        <motion.p
                          key={sIdx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-xs sm:text-sm text-amber-200/90 leading-relaxed"
                        >
                          <strong className="text-amber-400 font-mono">{sIdx + 1}.</strong> {sentence}{sentence.endsWith('.') ? '' : '.'}
                        </motion.p>
                      ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setRevealedSteps(s => s + 1)}
                        className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow"
                      >
                        Show Next Step →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/30 ml-auto"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Final Review →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.section>
        )}

        {/* ─── PHASE 5: COMPLETION & REAL-WORLD SYNTHESIS ─── */}
        {phase === 'complete' && (
          <motion.section
            key="complete_phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 space-y-6"
          >
            {/* Celebration Score Banner */}
            <div className="p-6 bg-gradient-to-br from-gold-950 via-slate-900 to-slate-900 rounded-3xl border border-gold-800 text-center space-y-4">
              <span className="text-4xl">🎉</span>
              <h2 className="text-2xl font-black text-white">
                Sports Carnival Data Mastery Complete!
              </h2>
              <div className="flex justify-center items-center gap-6">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Accuracy Score</p>
                  <p className="text-3xl font-black text-emerald-400 font-mono mt-1">
                    {Math.max(0, 100 - errors * 5)}%
                  </p>
                </div>
                <div className="h-10 w-px bg-slate-800" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Mastery Level</p>
                  <p className="text-3xl font-black text-gold-300 capitalize mt-1">
                    {masteryLevel}
                  </p>
                </div>
              </div>
            </div>

            {/* Motivational Tailored Feedback */}
            <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-800/80">
              <h3 className="text-xs font-bold uppercase text-emerald-400 tracking-wider mb-1">
                Performance Evaluation
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200">
                {errors === 0
                  ? '🌟 PERFECT SCORE! You showed pristine mathematical precision across tallying, pictograph scaling, bar graphs, and central tendency measures!'
                  : errors <= 3
                  ? '👏 EXCELLENT RUN! You have solid mastery of data organisation and graph construction. Review any minor slips below to reach 100%!'
                  : '💪 COMMENDABLE EFFORT! Data handling takes practice. Review the misconception profile and fulcrum balance rules below, then retry to cement your skills!'}
              </p>
            </div>

            {/* ─── REFLECTION SECTION ─── */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤔</span>
                <h3 className="text-base font-bold text-gold-300">Reflect & Connect</h3>
              </div>
              <p className="text-xs text-slate-400">
                Deepen your understanding by reflecting on these core questions:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-amber-300">Surprising Insight</h4>
                  <p className="text-xs text-slate-300">What was the most surprising thing you learned?</p>
                  <textarea
                    rows={3}
                    value={reflectionResponses.surprising}
                    onChange={e => setReflectionResponses(prev => ({ ...prev, surprising: e.target.value }))}
                    placeholder="Type your thoughts here..."
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 outline-none focus:border-gold-500 resize-none"
                  />
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-300">Explain to a Friend</h4>
                  <p className="text-xs text-slate-300">How would you explain this to a friend?</p>
                  <textarea
                    rows={3}
                    value={reflectionResponses.explain}
                    onChange={e => setReflectionResponses(prev => ({ ...prev, explain: e.target.value }))}
                    placeholder="Type your explanation..."
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 outline-none focus:border-gold-500 resize-none"
                  />
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-gold-300">Real-World Application</h4>
                  <p className="text-xs text-slate-300">Where in real life might you use this?</p>
                  <textarea
                    rows={3}
                    value={reflectionResponses.realLife}
                    onChange={e => setReflectionResponses(prev => ({ ...prev, realLife: e.target.value }))}
                    placeholder="Where would you use this..."
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 outline-none focus:border-gold-500 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Misconception Review Profile */}
            {hitMisconceptions.length > 0 && (
              <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-900/60 space-y-3">
                <h3 className="text-xs font-bold uppercase text-rose-400 tracking-wider">
                  Targeted Misconception Correction Profile
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {hitMisconceptions.map((mIdx, i) => {
                    const m = misconceptions?.[mIdx];
                    if (!m) return null;
                    return (
                      <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                        <p className="text-rose-300 font-semibold">❌ Trap: {m.misconception}</p>
                        <p className="text-emerald-300 font-semibold mt-1">✓ ICSE Correction: {m.correction}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Spaced Repetition Review Schedule */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <h3 className="text-xs font-bold uppercase text-gold-400 tracking-wider">
                Spaced Repetition Schedule (SM-2)
              </h3>
              <p className="text-xs text-slate-300">
                To guarantee long-term retention for your Class 6 ICSE examinations, this topic is scheduled for smart review in{' '}
                <strong className="text-amber-300">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </strong>.
              </p>
            </div>

            {/* Real-World Activity Card */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">📋</span>
                <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
              </div>
              <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <ul className="space-y-1.5 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                  <li key={sIdx} className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="font-mono text-gold-400 font-bold">{sIdx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── CONDITIONAL SIM FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Sports Day Challenge Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C6_MathematicsCollectionOrganisationDataSim;
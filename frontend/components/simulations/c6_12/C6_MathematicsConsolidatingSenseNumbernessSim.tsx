'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID CONSTANTS (MANDATORY STRING LITERALS) ───
const NODE_C6_MATH_001 = 'c6_math_001';
const NODE_C6_MATH_002 = 'c6_math_002';
const NODE_C6_MATH_003 = 'c6_math_003';
const NODE_C6_MATH_004 = 'c6_math_004';
const NODE_C6_MATH_005 = 'c6_math_005';
const NODE_C6_MATH_006 = 'c6_math_006';
const NODE_C6_MATH_007 = 'c6_math_007';
const NODE_C6_MATH_008 = 'c6_math_008';
const NODE_C6_MATH_009 = 'c6_math_009';
const NODE_C6_MATH_010 = 'c6_math_010';

const ALL_NODE_IDS = [
  NODE_C6_MATH_001,
  NODE_C6_MATH_002,
  NODE_C6_MATH_003,
  NODE_C6_MATH_004,
  NODE_C6_MATH_005,
  NODE_C6_MATH_006,
  NODE_C6_MATH_007,
  NODE_C6_MATH_008,
  NODE_C6_MATH_009,
  NODE_C6_MATH_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission Chandrayaan Logistics: Number Operations & Scale Command',
  intro: 'You are the Chief Data Officer at ISRO Ground Command. As the space mission prepares its next launch, huge quantities of fuel, massive distances in kilometres, cargo weights in kilograms, and national budget figures in crores of rupees must be tracked, converted, rounded, and computed without a single flaw.',
  context: 'From 5-digit telemetry feeds up to 8-digit national budget allocations, your master sense of numbers, place values, number system conversions, and arithmetic laws is the mission lifeline.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Telemetry sends two payload weight readings: 48,375 kg and 48,297 kg. Which place value first tells you which payload is heavier?',
  options: [
    'The ones place (5 vs 7) because we always compare starting from the right',
    'The hundreds place (3 vs 2) because we compare left-to-right at the first differing digit',
    'The ten-thousands place (4 vs 4) because 4 is the largest face value',
    'Both numbers are identical because they both start with 48 thousand'
  ],
  correctIndex: 1,
  hintAfter: "Remember: Place value dominates from the leftmost digit! Let's explore why comparing left-to-right never fails.",
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
    question: 'What do you observe when you multiply a number by 10, 100, and 1000 sequentially?',
    observableOptions: [
      'The digits shift left, adding zeros — place value increases by powers of 10 (✓)',
      'The digits shift right, removing zeros (✗)',
      'The number stays the same (✗)',
      'Only the last digit changes (✗)',
    ],
    correctIndex: 0,
  },
  {
    question: 'When comparing 0.5 and 0.05 on a place value chart, what do you notice?',
    observableOptions: [
      '0.5 is ten times larger than 0.05 because the 5 is in the tenths vs hundredths place (✓)',
      '0.05 is larger than 0.5 (✗)',
      'They are equal (✗)',
      'Both are greater than 1 (✗)',
    ],
    correctIndex: 0,
  },
];

// ─── 22 RICH PROGRESSIVE CHALLENGES (NEP 2020 Aligned) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_compare5',
    nodeId: NODE_C6_MATH_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Two cricket match attendances in Ahmedabad are 74,820 and 74,865. At which place value do they first differ when comparing from the left?',
    options: ['Ten-thousands place', 'Thousands place', 'Hundreds place', 'Tens place (2 vs 6)'],
    correctIndex: 3,
    explanation: 'From the left: Ten-thousands are equal (7 = 7), thousands are equal (4 = 4), hundreds are equal (8 = 8). At the tens place, 2 < 6, so 74,865 is greater.',
    hints: [
      'Compare digits one by one starting from the leftmost position.',
      '7=7, 4=4, 8=8... keep moving right.',
      'The fourth digit from the left is the tens place: 2 in the first and 6 in the second.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_face_place',
    nodeId: NODE_C6_MATH_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the number 6,43,892, what is the place value and face value of the digit 4?',
    options: [
      'Place Value: 40,000; Face Value: 4',
      'Place Value: 4; Face Value: 40,000',
      'Place Value: 4,000; Face Value: 4',
      'Place Value: 4,00,000; Face Value: 40,000'
    ],
    correctIndex: 0,
    explanation: 'Face value is always the digit itself (4). The digit 4 sits in the ten-thousands place, so its place value is 4 × 10,000 = 40,000.',
    hints: [
      'Face value never changes: it is just the digit itself.',
      'Check which position 4 sits in: units, tens, hundreds, thousands, ten-thousands...',
      '4 in the ten-thousands place has a place value of 40,000.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_natural_def',
    nodeId: NODE_C6_MATH_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following belongs strictly to the set of Natural numbers {1, 2, 3, ...}?',
    options: ['0', '-12', '45', '3.5'],
    correctIndex: 2,
    explanation: 'Natural numbers are positive counting numbers starting from 1. Zero, negative numbers, fractions, and decimals are not natural numbers.',
    hints: [
      'Natural numbers are the numbers you count with: 1, 2, 3...',
      'Can you count 0 apples or -12 pencils as physical items?',
      'Only positive whole numbers starting at 1 are natural numbers: 45 is the correct choice.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04_whole_zero_rule',
    nodeId: NODE_C6_MATH_009,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which statement accurately describes the additive identity for whole numbers?',
    options: [
      '1 is the additive identity because 25 + 1 = 26',
      '0 is the additive identity because a + 0 = a for any whole number',
      '0 is the multiplicative identity because a �� 0 = 0',
      'Whole numbers have no identity element under addition'
    ],
    correctIndex: 1,
    explanation: 'Adding zero to any whole number leaves it unchanged (a + 0 = a). Hence, 0 is called the additive identity.',
    hints: [
      'Identity means "leaves the number unchanged".',
      'What do you add to 50 so that you still have 50?',
      '50 + 0 = 50. Zero is the additive identity.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05_drag_label_places',
    nodeId: NODE_C6_MATH_002,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the Indian place value names to their correct place column from right to left.',
    dragItems: [
      { label: 'Ten Thousands', targetId: 'place_4' },
      { label: 'Thousands', targetId: 'place_3' },
      { label: 'Hundreds', targetId: 'place_2' },
      { label: 'Tens', targetId: 'place_1' },
    ],
    correctMapping: {
      place_4: 'Ten Thousands',
      place_3: 'Thousands',
      place_2: 'Hundreds',
      place_1: 'Tens',
    },
    explanation: 'Starting from rightmost (units/ones = place 0), we have: Tens (10¹), Hundreds (10²), Thousands (10³), and Ten Thousands (10⁴).',
    hints: [
      'The rightmost after Ones is Tens.',
      'Next to Tens is Hundreds, then Thousands.',
      'The fifth column from the right is Ten Thousands.',
    ],
  },
  {
    id: 'ch_06_round_5digit',
    nodeId: NODE_C6_MATH_001,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'ISRO tracks a booster flight path at 64,820 metres altitude. Round 64,820 to the nearest thousand.',
    correctAnswer: 65000,
    tolerance: 0,
    unit: 'metres',
    explanation: 'To round to the nearest thousand, inspect the hundreds digit (8). Since 8 ≥ 5, round the thousands digit (4) up to 5: 65,000.',
    hints: [
      'Look at the digit immediately to the right of the thousands place: the hundreds digit.',
      'In 64,820 the hundreds digit is 8.',
      'Since 8 is 5 or more, round up 64,000 to 65,000.',
    ],
  },
  {
    id: 'ch_07_properties_identity',
    nodeId: NODE_C6_MATH_010,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the multiplicative identity for whole numbers?',
    options: ['0', '1', '10', 'It does not exist'],
    correctIndex: 1,
    explanation: 'Multiplying any whole number by 1 leaves it unchanged (a × 1 = a). Therefore, 1 is the multiplicative identity.',
    hints: [
      'Identity element leaves the number unchanged during multiplication.',
      '24 × ? = 24.',
      '24 × 1 = 24. So 1 is the multiplicative identity.',
    ],
  },
  {
    id: 'ch_08_subtraction_align',
    nodeId: NODE_C6_MATH_003,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Bengaluru warehouse dispatched 24,56,789 litres of water and received a return of 3,89,234 litres. What is the net water dispatched in litres?',
    correctAnswer: 2067555,
    tolerance: 0,
    unit: 'litres',
    explanation: '24,56,789 - 3,89,234 = 20,67,555 litres. Aligning by place value and carrying out borrows from right to left gives exactly 20,67,555.',
    hints: [
      'Subtract column by column from the units place.',
      'Borrow carefully across the ten-thousands and thousands places.',
      '24,56,789 minus 3,89,234 = 20,67,555.',
    ],
  },
  {
    id: 'ch_09_unit_conversion_mass',
    nodeId: NODE_C6_MATH_004,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A food relief convoy carries 43,250 kg of pulses. Express this total mass in grams (g). (1 kg = 1,000 g)',
    correctAnswer: 43250000,
    tolerance: 0,
    unit: 'g',
    explanation: 'To convert from kg to g, multiply by 1,000: 43,250 × 1,000 = 4,32,50,000 g (43,250,000 g).',
    hints: [
      'Converting from a larger unit (kg) to a smaller unit (g) requires multiplication.',
      '1 kg = 1,000 g.',
      'Multiply 43,250 by 1,000 to get 43,250,000 g.',
    ],
  },
  {
    id: 'ch_10_indian_vs_international',
    nodeId: NODE_C6_MATH_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How is the 8-digit number 45678912 written in the International system with proper comma grouping?',
    options: ['4,56,78,912', '45,678,912', '456,78,912', '4567,8912'],
    correctIndex: 1,
    explanation: 'The International system groups digits into periods of three from the right: 45,678,912 (forty-five million six hundred seventy-eight thousand nine hundred twelve).',
    hints: [
      'The International system uses commas every 3 digits from the right.',
      'Count 3 digits: 912, then next 3 digits: 678, remaining: 45.',
      'This yields 45,678,912.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_11_estimate_direction',
    nodeId: NODE_C6_MATH_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'To estimate 48,750 + 32,100, we round both numbers to the nearest ten thousand (50,000 + 30,000 = 80,000). Is 80,000 an overestimate or underestimate, and why?',
    options: [
      'Overestimate because 48,750 was rounded up to 50,000',
      'Underestimate because the net effect (+1,250 - 2,100 = -850) makes the estimate 850 less than the actual sum 80,850',
      'Exact estimate because 50,000 + 30,000 equals 80,000',
      'Overestimate because 80,000 has four zeros'
    ],
    correctIndex: 1,
    explanation: 'Actual sum = 48,750 + 32,100 = 80,850. 48,750 gained 1,250 on rounding up, but 32,100 lost 2,100 on rounding down. Net change = -850. The estimate 80,000 is 850 less than actual, making it an underestimate.',
    hints: [
      'Calculate the actual sum first: 48,750 + 32,100 = 80,850.',
      'Compare 80,000 with 80,850.',
      'Since 80,000 < 80,850, it is an underestimate.',
    ],
  },
  {
    id: 'ch_12_drag_sort_steps',
    nodeId: NODE_C6_MATH_004,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Order the correct problem-solving steps for: "A rope is 5 km 450 m long. A 1 km 200 m piece is cut. Find remaining length in centimetres."',
    sortItems: [
      'Convert mixed forms to metres: 5,450 m and 1,200 m',
      'Subtract to find remaining metres: 5,450 - 1,200 = 4,250 m',
      'Multiply by 100 to convert metres to centimetres: 4,25,000 cm',
      'State final answer with unit: 4,25,000 cm',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First convert mixed units into a single working unit (metres), perform the subtraction, convert to the required smaller unit (cm by ×100), and state the answer.',
    hints: [
      'You cannot subtract mixed km and m without converting to a common unit first.',
      'After finding the remaining metres, convert to centimetres.',
      'The final step is stating the answer with units.',
    ],
  },
  {
    id: 'ch_13_distributive_mental',
    nodeId: NODE_C6_MATH_010,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Use the distributive property 7 × 14 = 7 × (10 + 4) = (7 × 10) + (7 × 4) to calculate the product.',
    correctAnswer: 98,
    tolerance: 0,
    unit: '',
    explanation: '7 × 10 = 70, 7 × 4 = 28. Adding them gives 70 + 28 = 98.',
    hints: [
      'Multiply 7 by 10 to get 70.',
      'Multiply 7 by 4 to get 28.',
      'Add 70 + 28 = 98.',
    ],
  },
  {
    id: 'ch_14_8digit_pattern',
    nodeId: NODE_C6_MATH_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the value of 9,99,99,999 + 1 in the Indian numbering system?',
    correctAnswer: 100000000,
    tolerance: 0,
    unit: '(Ten Crores)',
    explanation: 'Adding 1 to eight 9s causes a carry ripple through all 8 places, yielding 1 followed by eight zeros: 10,00,00,000 (10 crore).',
    hints: [
      '99 + 1 = 100 (two 9s -> 1 with two 0s).',
      '9,99,999 + 1 = 10,00,000 (six 9s -> 1 with six 0s).',
      'Eight 9s + 1 = 1 followed by eight 0s = 10,00,00,000 (100,000,000).',
    ],
  },
  {
    id: 'ch_15_division_by_zero',
    nodeId: NODE_C6_MATH_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why is the mathematical expression 25 ÷ 0 described as "not defined"?',
    options: [
      'Because 25 ÷ 0 equals 0',
      'Because 25 ÷ 0 equals 25',
      'Because there exists no whole number k such that k × 0 = 25',
      'Because only negative numbers can be divided by 0'
    ],
    correctIndex: 2,
    explanation: 'Division a ÷ b asks "what number multiplied by b gives a?". Since any whole number multiplied by 0 is 0, no number multiplied by 0 can equal 25.',
    hints: [
      'Think about the inverse operation of division: multiplication.',
      'If 25 ÷ 0 = k, then k × 0 must equal 25.',
      'Since k × 0 = 0 for all numbers, it can never equal 25. Hence, undefined.',
    ],
  },
  {
    id: 'ch_16_multistep_word_cement',
    nodeId: NODE_C6_MATH_004,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A highway construction firm in Nagpur transports 15,000 kg of gravel per truck trip. If a fleet of 8 trucks makes 1 trip each, what is the total mass transported in grams (g)?',
    correctAnswer: 120000000,
    tolerance: 0,
    unit: 'g',
    explanation: 'Total kg = 15,000 × 8 = 1,20,000 kg. In grams: 1,20,000 × 1,000 = 12,00,00,000 g (120,000,000 g or 12 crore grams).',
    hints: [
      'First calculate total kilograms: 15,000 × 8.',
      '15,000 × 8 = 120,000 kg.',
      'Convert to grams: 120,000 × 1,000 = 120,000,000 g.',
    ],
  },
  {
    id: 'ch_17_construct_distributive',
    nodeId: NODE_C6_MATH_010,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the algebraic identity for the Distributive Property of Multiplication over Addition using the tokens below:',
    availableParts: ['a × (b + c)', '=', 'a × b', '+', 'a × c', '(', 'b × c', ')'],
    targetState: 'a × (b + c) = a × b + a × c',
    validationHint: 'The LHS should be a × (b + c), followed by =, then the distributed sum a × b + a × c.',
    explanation: 'The distributive law states that multiplying a number by a sum is equal to multiplying each addend separately and adding the products: a × (b + c) = a × b + a × c.',
    hints: [
      'Start with the left-hand side showing multiplication over brackets: a × (b + c)',
      'Add the equals sign =',
      'The right-hand side is a × b + a × c',
    ],
  },
  {
    id: 'ch_18_approx_8digit_tenlakh',
    nodeId: NODE_C6_MATH_006,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'The annual education budget of a state is ₹7,89,43,216. Round this amount to the nearest Ten Lakh (10,00,000).',
    correctAnswer: 79000000,
    tolerance: 0,
    unit: '₹',
    explanation: 'In 7,89,43,216, the ten-lakhs digit is 8. The digit to its right (lakhs place) is 9. Since 9 ≥ 5, round the ten-lakhs digit up to 9, giving 7,90,00,000.',
    hints: [
      'Identify the ten-lakhs place: it is 8 (in 89 lakh).',
      'Inspect the digit immediately to its right: the lakhs place is 9.',
      'Since 9 is 5 or more, 7,80,00,000 rounds up to 7,90,00,000.',
    ],
  },
  {
    id: 'ch_19_associative_verify',
    nodeId: NODE_C6_MATH_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does the Associative Property hold for addition (a + b) + c = a + (b + c), but FAILS for subtraction (a - b) - c ≠ a - (b - c)? Verify with a=10, b=4, c=2.',
    options: [
      '(10 - 4) - 2 = 4, but 10 - (4 - 2) = 8. Since 4 ≠ 8, subtraction is not associative',
      'Subtraction is associative because both group to 4',
      'It fails only when negative integers are introduced',
      'Subtraction is associative for all numbers greater than 100'
    ],
    correctIndex: 0,
    explanation: '(10 - 4) - 2 = 6 - 2 = 4. However, 10 - (4 - 2) = 10 - 2 = 8. Because 4 ≠ 8, the grouping changes the outcome, proving subtraction is not associative.',
    hints: [
      'Calculate (10 - 4) - 2 step-by-step: 10 - 4 = 6, then 6 - 2 = 4.',
      'Calculate 10 - (4 - 2) step-by-step: 4 - 2 = 2, then 10 - 2 = 8.',
      'Compare 4 and 8. They are not equal, so subtraction is not associative.',
    ],
  },
  {
    id: 'ch_20_long_division_verify',
    nodeId: NODE_C6_MATH_003,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'ISRO distributes 7,89,600 test data packets equally among 12 telemetry stations. What is the quotient received by each station?',
    correctAnswer: 65800,
    tolerance: 0,
    unit: 'packets',
    explanation: '7,89,600 ÷ 12 = 65,800 with remainder 0. Verification: 12 × 65,800 + 0 = 7,89,600.',
    hints: [
      '78 ÷ 12 = 6 with remainder 6 (bring down 9 -> 69).',
      '69 ÷ 12 = 5 with remainder 9 (bring down 6 -> 96).',
      '96 ÷ 12 = 8 with remainder 0. Bring down zeros to get 65,800.',
    ],
  },
  {
    id: 'ch_21_compare_across_systems',
    nodeId: NODE_C6_MATH_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims that 99,99,999 (Indian) is smaller than 9,999,999 (International) because the second number has fewer commas. Evaluate this claim.',
    options: [
      'The claim is true because more commas indicate smaller decimal parts',
      'The claim is false: both represent the exact same 7-digit quantity (9,999,999 = 99,99,999)',
      'The claim is true because millions are larger than lakhs in every digit count',
      'The claim is false because 99,99,999 is an 8-digit number'
    ],
    correctIndex: 1,
    explanation: 'Commas are reading aids that do not alter magnitude. Stripping commas from both reveals 9999999 in both cases. They are exactly equal.',
    hints: [
      'Strip the commas from both numbers to see the raw digits.',
      'Both numbers consist of seven nines: 9999999.',
      'They represent the exact same quantity; comma grouping is only a linguistic convention.',
    ],
  },
  {
    id: 'ch_22_word_problem_swatches',
    nodeId: NODE_C6_MATH_004,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A school uniform department has 3 km 750 m of fabric. After making blazers, 1 km 250 m remains. If the used fabric is cut into sample strips of 50 cm each, how many sample strips are produced?',
    correctAnswer: 5000,
    tolerance: 0,
    unit: 'strips',
    explanation: 'Total = 3,750 m. Leftover = 1,250 m. Used = 3,750 - 1,250 = 2,500 m = 2,50,000 cm. Strips = 2,50,000 ÷ 50 = 5,000 strips.',
    hints: [
      'Find used fabric in metres: 3,750 m - 1,250 m = 2,500 m.',
      'Convert used fabric to centimetres: 2,500 × 100 = 250,000 cm.',
      'Divide 250,000 cm by 50 cm = 5,000 sample strips.',
    ],
  },
];

// ──�� PROPS INTERFACE ───
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
  nodeId: NODE_C6_MATH_001,
  title: 'Mathematics: Consolidating Number Sense & Operations',
  definition: 'Consolidating number sense from 5 to 8 digits, place value extension in Indian and International systems, four arithmetic operations, word problems with length/mass conversions, estimation, and foundational properties of Natural and Whole numbers.',
  eli5: 'Think of numbers as high-tech measuring tapes and cargo containers. We learn how to read huge amounts up to crores and millions, convert kilometres to centimetres and kilograms to grams, estimate answers before computing, and discover the magical laws of 0, 1, and bracket grouping!',
  misconceptions: [
    {
      misconception: 'Compare numbers from right to left starting at the ones digit.',
      correction: 'Always compare from the leftmost place because higher place values dominate total numerical magnitude.',
    },
    {
      misconception: 'Place value and Face value are the same thing.',
      correction: 'Face value is just the digit itself (0-9). Place value is the face value multiplied by its position value (e.g., 4 × 10,000 = 40,000).',
    },
    {
      misconception: 'Zero is a natural counting number.',
      correction: 'Natural numbers start at 1 (1, 2, 3...). Whole numbers start at 0 (0, 1, 2, 3...).',
    },
    {
      misconception: 'Adding zero makes everything zero (confusing addition with multiplication).',
      correction: 'a + 0 = a (additive identity leaves the number unchanged). a × 0 = 0 (zero groups of a number equals zero).',
    },
    {
      misconception: 'One lakh equals one million.',
      correction: '1 Lakh = 1,00,000 (5 zeros), whereas 1 Million = 10,00,000 (6 zeros). 1 Million = 10 Lakhs.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which is the smallest whole number?',
      options: ['1', '0', '-1', '10'],
      correctIndex: 1,
    },
    {
      question: 'What is the predecessor of 1 in the set of Natural numbers?',
      options: ['0', '2', 'There is no predecessor in Natural numbers', '-1'],
      correctIndex: 2,
    },
    {
      question: 'In 5,24,376, what is the place value of 5?',
      options: ['50,000', '5,00,000 (5 Lakh)', '5,000', '500'],
      correctIndex: 1,
    },
    {
      question: 'How many centimetres are there in 4.5 metres?',
      options: ['45 cm', '450 cm', '4,500 cm', '0.45 cm'],
      correctIndex: 1,
    },
    {
      question: 'Which property is demonstrated by 18 + 25 = 25 + 18?',
      options: ['Associative Property', 'Distributive Property', 'Commutative Property of Addition', 'Additive Identity'],
      correctIndex: 2,
    },
    {
      question: 'What is 48,750 rounded to the nearest thousand?',
      options: ['48,000', '49,000', '50,000', '40,000'],
      correctIndex: 1,
    },
    {
      question: '1 Million in the International system is equal to how many Lakhs in the Indian system?',
      options: ['1 Lakh', '10 Lakhs', '100 Lakhs (1 Crore)', '0.1 Lakh'],
      correctIndex: 1,
    },
    {
      question: 'What is the outcome of 15 ÷ 0?',
      options: ['0', '15', '1', 'Not defined'],
      correctIndex: 3,
    },
  ],
  masteryCriteria: 'Student understands place values up to 8 digits, converts across Indian/International systems, solves unit conversion word problems, and applies number properties accurately.',
};

// ─── BRILLIANT.ORG INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Place Value & The Left-to-Right Rule',
    instruction: 'Adjust the slider to change the 5-digit number and watch the place value breakdown and comparator update live.',
    interactionType: 'slider-observe',
    nodeId: NODE_C6_MATH_001,
  },
  {
    title: 'Indian vs International System Regrouping',
    instruction: 'Toggle between Indian (3-2-2) and International (3-3-3) periods to see how commas re-align without changing the total count.',
    interactionType: 'toggle-period',
    nodeId: NODE_C6_MATH_007,
  },
  {
    title: 'The Measurement Multiplier (km → m → cm & kg → g)',
    instruction: 'Drag the cargo mass slider and observe how units scale by factors of 1,000 and 100 in real time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C6_MATH_004,
  },
  {
    title: 'Distributive Property Area Model: a × (b + c)',
    instruction: 'Change the dimensions a, b, and c to see how splitting a large rectangle into two smaller rectangles simplifies mental multiplication.',
    interactionType: 'interactive-area',
    nodeId: NODE_C6_MATH_010,
  },
  {
    title: 'Whole Numbers & Zero on the Number Line',
    instruction: 'Click the operation buttons (+0, -0, ×0, ÷0) to visualize how zero behaves on the number line.',
    interactionType: 'click-operations',
    nodeId: NODE_C6_MATH_009,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you have 35 kilograms of space cargo and convert it to grams, will the numerical value become LARGER or SMALLER?',
    options: [
      'Larger (35,000) because grams are smaller units, so you need more of them',
      'Smaller (0.035) because cargo is heavy',
      'It stays 35 because mass does not change',
      'It becomes 3,500'
    ],
    correctIndex: 0,
    verifyInstruction: 'Move the mass slider in the explorer to 35 kg and verify that the grams gauge shows 35,000 g!',
    nodeId: NODE_C6_MATH_004,
  },
  {
    question: 'Predict: What happens when you calculate 8 × 15 by splitting 15 into (10 + 5)?',
    options: [
      '(8 × 10) + (8 × 5) = 80 + 40 = 120',
      '(8 × 10) × (8 × 5) = 80 × 40 = 3200',
      '8 + 10 + 5 = 23',
      '80 - 40 = 40'
    ],
    correctIndex: 0,
    verifyInstruction: 'Check the Distributive Area Model below with a=8, b=10, c=5 to confirm the total area of 120.',
    nodeId: NODE_C6_MATH_010,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Indian Space Logistics: Telemetry & Budget Master',
  description: 'Apply your mathematical number sense to plan a satellite launch mission. Record the satellite weight in kilograms and grams, convert ground distances in kilometres to centimetres, and format the launch budget in both Indian Crores and International Millions.',
  steps: [
    'Take a satellite payload mass of 3,450 kg and convert it into grams by multiplying by 1,000.',
    'Map out a launch trajectory of 4 km 250 m and convert the total distance into centimetres.',
    'Write the launch project allocation of ₹4,50,00,000 in words in both Indian (4 Crore 50 Lakh) and International (45 Million) systems.',
    'Verify that the associative and distributive properties let you compute fuel costs mentally without a calculator.',
  ],
};

// ─── MAIN COMPONENT ───
function C6_MathematicsConsolidatingSenseNumbernessSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'emerald' };

  // ─── PHASES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── DISCOVERY STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ─── PREDICTION & OBSERVATION STATE ───
  const [predictionMade, setPredictionMade] = useState(false);

  // ─── INTERACTIVE SIMULATION LAB VARIABLES ───
  const [sliderNumber, setSliderNumber] = useState<number>(48375);
  const [compareTarget] = useState<number>(48297);
  const [systemMode, setSystemMode] = useState<'indian' | 'international'>('indian');
  const [cargoKg, setCargoKg] = useState<number>(43);
  const [distA, setDistA] = useState<number>(6);
  const [distB, setDistB] = useState<number>(10);
  const [distC, setDistC] = useState<number>(4);
  const [numberLinePos, setNumberLinePos] = useState<number>(5);
  const [zeroOpResult, setZeroOpResult] = useState<string>('Select an operation below');

  // ─── REFLECTION STATE (MANDATORY REQUIREMENT) ───
  const [reflections, setReflections] = useState({
    surprising: '',
    explainFriend: '',
    realLife: '',
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // ─── ADAPTIVE & BKT MASTERY STATE ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const bktStateRef = useRef(createBKTState());

  // ─── HINTS & REVEAL STATE ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ─── INTERACTIVE CHALLENGE INPUTS ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── VISUAL FEEDBACK & FX ───
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── INACTIVITY AUTO-HINT TIMER ───
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── CANVAS REF FOR DYNAMIC PLACE-VALUE PARTICLE ANIMATION ───
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD INITIAL MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C6_MATH_001);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT-BASED DIFFICULTY ADAPTATION ───
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

  // ─── 2D CANVAS BACKGROUND ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * 600,
      y: Math.random() * 80,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 3 + 1,
      digit: Math.floor(Math.random() * 10),
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = 'rgba(99, 102, 241, 0.35)';
        ctx.font = '10px monospace';
        ctx.fillText(String(p.digit), p.x, p.y);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── ESCALATING HINTS HANDLER ───
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

  // ─── INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── DISCOVERY ANSWER HANDLER ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Exact! The hundreds place settled the comparison.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the place value systems and number properties.');
  }, []);

  const handleSliderChange = useCallback((val: number) => {
    setSliderNumber(val);
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to experiment with all number tools without any tests.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Mission Challenge sequence activated. Test your number mastery!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulator to verify.');
  }, []);

  const handleSliderNumberChange = useCallback((val: number) => {
    setSliderNumber(val);
    audioManager.play('count');
  }, []);

  const handleCargoKgChange = useCallback((val: number) => {
    setCargoKg(val);
    audioManager.play('balance');
  }, []);

  const handleAreaParamChange = useCallback((param: 'a' | 'b' | 'c', val: number) => {
    if (param === 'a') setDistA(val);
    if (param === 'b') setDistB(val);
    if (param === 'c') setDistC(val);
    audioManager.play('tap');
  }, []);

  const handleZeroOperation = useCallback((op: '+0' | '-0' | '*0' | '/0') => {
    audioManager.play('tap');
    if (op === '+0') {
      setZeroOpResult(`${numberLinePos} + 0 = ${numberLinePos} (Additive Identity: unchanged)`);
      speechManager.speak(`Adding zero leaves ${numberLinePos} unchanged.`);
    } else if (op === '-0') {
      setZeroOpResult(`${numberLinePos} - 0 = ${numberLinePos} (Subtracting zero: unchanged)`);
      speechManager.speak(`Subtracting zero leaves ${numberLinePos} unchanged.`);
    } else if (op === '*0') {
      setZeroOpResult(`${numberLinePos} × 0 = 0 (Zero groups: becomes zero)`);
      speechManager.speak(`Multiplying by zero produces zero.`);
    } else if (op === '/0') {
      setZeroOpResult(`${numberLinePos} ÷ 0 = NOT DEFINED (No number × 0 = ${numberLinePos})`);
      speechManager.speak(`Division by zero is not defined.`);
    }
  }, [numberLinePos]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Mission Accomplished! You have consolidated complete number mastery.');
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
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding deduction.');
      setShowConfetti(true);
      setShowExplanation(true);
      setSparklePos({ x: 300, y: 200 });
      setShowSparkle(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify({ score: 100, updated: Date.now() }));
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
        speechManager.speak('All hints used. Review the step-by-step breakdown.');
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
    const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
    if (isMatch) {
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

  const handleSlideNext = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handleSlidePrev = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  // ─── NUMBERNESS CALCULATION HELPERS ───
  const sliderDigits = useMemo(() => {
    const str = String(sliderNumber).padStart(5, '0');
    return {
      tth: parseInt(str[0], 10),
      th: parseInt(str[1], 10),
      h: parseInt(str[2], 10),
      t: parseInt(str[3], 10),
      u: parseInt(str[4], 10),
    };
  }, [sliderNumber]);

  const compareDigits = useMemo(() => {
    const str = String(compareTarget).padStart(5, '0');
    return {
      tth: parseInt(str[0], 10),
      th: parseInt(str[1], 10),
      h: parseInt(str[2], 10),
      t: parseInt(str[3], 10),
      u: parseInt(str[4], 10),
    };
  }, [compareTarget]);

  const firstDiffPlace = useMemo(() => {
    if (sliderDigits.tth !== compareDigits.tth) return 'Ten-Thousands Place';
    if (sliderDigits.th !== compareDigits.th) return 'Thousands Place';
    if (sliderDigits.h !== compareDigits.h) return 'Hundreds Place';
    if (sliderDigits.t !== compareDigits.t) return 'Tens Place';
    if (sliderDigits.u !== compareDigits.u) return 'Ones Place';
    return 'Numbers are identical';
  }, [sliderDigits, compareDigits]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/60 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">ICSE Class 6 Mathematics</span>
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-indigo-900/60 text-indigo-300 border border-indigo-700/40">
                NEP 2020 Aligned
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase & Mastery Badge */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider border shadow-sm ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                : difficulty === 'advanced'
                ? 'bg-purple-950/80 text-purple-300 border-purple-700/60'
                : 'bg-blue-950/80 text-blue-300 border-blue-700/60'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 font-mono">
            Phase: <span className="text-amber-400 font-bold uppercase">{phase}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── BACKGROUND CANVAS VISUALIZER ─── */}
      <div className="relative overflow-hidden rounded-2xl mb-6 bg-slate-900/80 border border-slate-800/80">
        <canvas ref={canvasRef} width={600} height={40} className="w-full h-10 block opacity-70" />
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🚀</span>
              <h3 className="text-lg font-bold text-indigo-300">{SCENARIO.title}</h3>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-xs mt-3 italic border-l-2 border-indigo-500 pl-3">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <h4 className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">Curiosity Discovery Challenge</h4>
            <p className="text-white text-base md:text-lg font-semibold mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/90 hover:bg-slate-750 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="inline-block w-6 h-6 text-center leading-6 rounded-full bg-slate-700/60 text-xs mr-2 font-mono">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                    <span className="ml-2 text-emerald-400 font-bold" aria-hidden="true">✓</span>
                  )}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && discoveryCorrect === false && (
                    <span className="ml-2 text-rose-400 font-bold" aria-hidden="true">✗</span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className={discoveryCorrect ? 'text-emerald-400 text-sm font-medium' : 'text-amber-300 text-sm font-medium'}>
                  {discoveryCorrect ? '✓ Correct! Place values always dominate from the left.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Labs"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 whitespace-nowrap"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>EXPLORATION LAB {currentSlide + 1} OF {EXPLORATION_STEPS.length}</span>
            <span>Target Node: {EXPLORATION_STEPS[currentSlide].nodeId}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-indigo-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-400 text-sm mt-1 flex items-center gap-1.5">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB SLIDE 0: 5-DIGIT COMPARATOR & SVG PLACE VALUE POWER BARS ─── */}
              {currentSlide === 0 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="w-full md:w-auto">
                      <label htmlFor="payload-slider" className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Payload Telemetry Value: <span className="text-indigo-400 font-mono text-base">{sliderNumber.toLocaleString()}</span>
                      </label>
                      <input
                        id="payload-slider"
                        type="range"
                        min={10000}
                        max={99999}
                        value={sliderNumber}
                        aria-label="Adjust 5-digit telemetry value"
                        onChange={e => handleSliderNumberChange(Number(e.target.value))}
                        className="w-full md:w-96 accent-indigo-500"
                      />
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Comparing with Base Target:</span>
                      <span className="text-base font-mono font-bold text-emerald-400">{compareTarget.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* SVG Place Value Magnitude Tower */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[11px] font-bold text-indigo-300 block mb-1">SVG Place Value Magnitude Visualizer</span>
                    <svg viewBox="0 0 540 130" className="w-full h-auto bg-slate-950 rounded-lg p-2" role="img" aria-label="Dynamic Place Value Comparison Chart">
                      {[
                        { label: 'T-Th (10⁴)', x: 30, color: '#6366f1', dVal: sliderDigits.tth, tVal: compareDigits.tth },
                        { label: 'Th (10³)', x: 135, color: '#3b82f6', dVal: sliderDigits.th, tVal: compareDigits.th },
                        { label: 'H (10²)', x: 240, color: '#10b981', dVal: sliderDigits.h, tVal: compareDigits.h },
                        { label: 'T (10¹)', x: 345, color: '#f59e0b', dVal: sliderDigits.t, tVal: compareDigits.t },
                        { label: 'U (10⁰)', x: 450, color: '#ec4899', dVal: sliderDigits.u, tVal: compareDigits.u },
                      ].map((col, i) => {
                        const barHeight1 = Math.max(4, col.dVal * 8);
                        const barHeight2 = Math.max(4, col.tVal * 8);
                        const isDiff = col.dVal !== col.tVal;
                        return (
                          <g key={i}>
                            <rect x={col.x - 5} y={15} width={70} height={90} rx={4} fill={isDiff ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.02)'} stroke={isDiff ? '#f87171' : '#334155'} strokeDasharray={isDiff ? '2,2' : 'none'} />
                            <text x={col.x + 30} y={28} textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">{col.label}</text>
                            <rect x={col.x + 5} y={100 - barHeight1} width={22} height={barHeight1} rx={3} fill={col.color} />
                            <text x={col.x + 16} y={96 - barHeight1} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">{col.dVal}</text>
                            <rect x={col.x + 33} y={100 - barHeight2} width={22} height={barHeight2} rx={3} fill="#64748b" opacity={0.8} />
                            <text x={col.x + 44} y={96 - barHeight2} textAnchor="middle" fill="#cbd5e1" fontSize="9">{col.tVal}</text>
                            <text x={col.x + 30} y={118} textAnchor="middle" fill={isDiff ? '#fbbf24' : '#64748b'} fontSize="8" fontWeight="bold">
                              {isDiff ? (col.dVal > col.tVal ? '✓ Higher' : '✗ Lower') : 'Equal'}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/60 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider block">Decision Point</span>
                      <span className="text-sm font-semibold text-slate-200">First Differing Place: <strong className="text-amber-400">{firstDiffPlace}</strong></span>
                    </div>
                    <span className="text-sm font-mono font-bold text-slate-300">
                      {sliderNumber > compareTarget ? `${sliderNumber} > ${compareTarget} (✓ Higher)` : sliderNumber < compareTarget ? `${sliderNumber} < ${compareTarget} (✗ Lower)` : `${sliderNumber} = ${compareTarget} (= Equal)`}
                    </span>
                  </div>
                </div>
              )}

              {/* ─── LAB SLIDE 1: INDIAN VS INTERNATIONAL REGROUPER ─── */}
              {currentSlide === 1 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex justify-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Switch to Indian System (3-2-2 grouping)"
                      onClick={() => { setSystemMode('indian'); audioManager.play('tap'); }}
                      className={`px-5 py-2.5 rounded-xl text-sm font-bold border ${
                        systemMode === 'indian'
                          ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      🇮🇳 Indian System (3-2-2)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Switch to International System (3-3-3 grouping)"
                      onClick={() => { setSystemMode('international'); audioManager.play('tap'); }}
                      className={`px-5 py-2.5 rounded-xl text-sm font-bold border ${
                        systemMode === 'international'
                          ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      🌐 International System (3-3-3)
                    </motion.button>
                  </div>

                  <div className="p-6 bg-slate-900 rounded-xl text-center space-y-4 border border-slate-800">
                    <span className="text-xs text-slate-400 uppercase tracking-widest block font-mono">Raw 8-Digit Payload ID: 45678912</span>
                    <div className="text-3xl md:text-4xl font-black font-mono text-amber-400 tracking-wider">
                      {systemMode === 'indian' ? '4,56,78,912' : '45,678,912'}
                    </div>
                    <div className="text-sm md:text-base font-semibold text-indigo-300">
                      {systemMode === 'indian'
                        ? 'Four Crore, Fifty-Six Lakh, Seventy-Eight Thousand, Nine Hundred Twelve'
                        : 'Forty-Five Million, Six Hundred Seventy-Eight Thousand, Nine Hundred Twelve'}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
                    <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                      <strong className="text-indigo-400 block mb-1">Key Insight:</strong>
                      1 Million = 10 Lakhs (1,000,000 = 10,00,000). Both have 6 zeros!
                    </div>
                    <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                      <strong className="text-emerald-400 block mb-1">Conversion Rule:</strong>
                      Remove commas and re-insert in threes from right to convert to International.
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB SLIDE 2: UNIT CONVERSION MEASUREMENT MULTIPLIER ─── */}
              {currentSlide === 2 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  {!predictionMade ? (
                    <div className="p-4 bg-indigo-950/50 rounded-xl border border-indigo-800/60 space-y-3">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Predict Before Testing:</span>
                      <p className="text-white text-sm font-semibold">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            aria-label={`Predict option ${i + 1}`}
                            onClick={() => handlePrediction(i)}
                            className="p-3 text-left bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 font-medium"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/60 text-emerald-300 text-xs font-medium">
                      ✓ Prediction recorded! Now test the live converter below:
                    </div>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="cargo-slider" className="text-xs font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                      <span>Cargo Rocket Payload Mass:</span>
                      <span className="text-indigo-400 font-mono text-base">{cargoKg} kg</span>
                    </label>
                    <input
                      id="cargo-slider"
                      type="range"
                      min={1}
                      max={100}
                      value={cargoKg}
                      aria-label="Adjust cargo rocket mass in kilograms"
                      onChange={e => handleCargoKgChange(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[11px] font-bold text-indigo-300 block mb-1">SVG Metric Scaling Ladder</span>
                    <svg viewBox="0 0 520 110" className="w-full h-auto bg-slate-950 rounded-lg p-2" role="img" aria-label="Metric Conversion Scale Diagram">
                      <rect x="20" y="25" width="130" height="60" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth={2} />
                      <text x="85" y="50" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="bold">Kilograms (kg)</text>
                      <text x="85" y="70" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold" fontFamily="monospace">{cargoKg} kg</text>

                      <path d="M 160 55 L 340 55" stroke="#10b981" strokeWidth="3" />
                      <polygon points="340,55 330,49 330,61" fill="#10b981" />
                      <text x="250" y="45" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">× 1,000 (1 kg = 1000 g)</text>

                      <rect x="350" y="25" width="150" height="60" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth={2} />
                      <text x="425" y="50" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold">Grams (g)</text>
                      <text x="425" y="70" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily="monospace">{(cargoKg * 1000).toLocaleString()} g</text>
                    </svg>
                  </div>
                </div>
              )}

              {/* ─── LAB SLIDE 3: DISTRIBUTIVE PROPERTY AREA MODEL ─── */}
              {currentSlide === 3 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="slider-a" className="text-[10px] text-slate-400 font-bold block mb-1">Multiplier a = {distA}</label>
                      <input id="slider-a" type="range" min={2} max={12} value={distA} aria-label="Multiplier a slider" onChange={e => handleAreaParamChange('a', Number(e.target.value))} className="w-full accent-indigo-500" />
                    </div>
                    <div>
                      <label htmlFor="slider-b" className="text-[10px] text-slate-400 font-bold block mb-1">Tens split b = {distB}</label>
                      <input id="slider-b" type="range" min={5} max={20} step={5} value={distB} aria-label="Tens split b slider" onChange={e => handleAreaParamChange('b', Number(e.target.value))} className="w-full accent-emerald-500" />
                    </div>
                    <div>
                      <label htmlFor="slider-c" className="text-[10px] text-slate-400 font-bold block mb-1">Units split c = {distC}</label>
                      <input id="slider-c" type="range" min={1} max={9} value={distC} aria-label="Units split c slider" onChange={e => handleAreaParamChange('c', Number(e.target.value))} className="w-full accent-amber-500" />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[11px] font-bold text-indigo-300 block mb-1">SVG Geometric Distributive Area Model</span>
                    <svg viewBox="0 0 500 160" className="w-full bg-slate-950 rounded-xl border border-slate-800 p-2" role="img" aria-label="Distributive Property Area Model">
                      <rect x="50" y="30" width="220" height="90" fill="#4f46e5" fillOpacity="0.3" stroke="#6366f1" strokeWidth="2" rx="4" />
                      <text x="160" y="80" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontWeight="bold">
                        Area 1: {distA} × {distB} = {distA * distB}
                      </text>

                      <rect x="270" y="30" width="130" height="90" fill="#f59e0b" fillOpacity="0.3" stroke="#fbbf24" strokeWidth="2" rx="4" />
                      <text x="335" y="80" textAnchor="middle" fill="#fde68a" fontSize="12" fontWeight="bold">
                        Area 2: {distA} × {distC} = {distA * distC}
                      </text>

                      <text x="35" y="80" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">a = {distA}</text>
                      <text x="160" y="20" textAnchor="middle" fill="#a5b4fc" fontSize="12">b = {distB}</text>
                      <text x="335" y="20" textAnchor="middle" fill="#fde68a" fontSize="12">c = {distC}</text>
                    </svg>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center font-mono text-sm md:text-base">
                    <span className="text-indigo-400 font-bold">{distA} × ({distB} + {distC})</span> = ({distA} × {distB}) + ({distA} × {distC}) = {distA * distB} + {distA * distC} = <strong className="text-emerald-400">{distA * (distB + distC)}</strong>
                  </div>
                </div>
              )}

              {/* ─── LAB SLIDE 4: WHOLE NUMBERS & ZERO RULES ─── */}
              {currentSlide === 4 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-slate-400 uppercase font-bold">Pick Whole Number Position: {numberLinePos}</span>
                    <div className="flex gap-2">
                      {[1, 5, 12, 25, 50].map(val => (
                        <motion.button
                          key={val}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Select whole number ${val}`}
                          onClick={() => { setNumberLinePos(val); audioManager.play('tap'); }}
                          className={`px-3 py-1 text-xs rounded-lg font-mono font-bold border ${
                            numberLinePos === val ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {val}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[11px] font-bold text-indigo-300 block mb-1">SVG Whole Numbers Ray Starting at Zero</span>
                    <svg viewBox="0 0 520 80" className="w-full h-auto bg-slate-950 rounded-lg p-2" role="img" aria-label="Whole Number Ray Diagram">
                      <line x1="30" y1="45" x2="490" y2="45" stroke="#94a3b8" strokeWidth="3" />
                      <circle cx="40" cy="45" r="6" fill="#ec4899" />
                      <text x="40" y="65" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">0 (Whole)</text>

                      {[10, 20, 30, 40, 50].map(tick => {
                        const tx = 40 + (tick / 50) * 420;
                        return (
                          <g key={tick}>
                            <line x1={tx} y1="40" x2={tx} y2="50" stroke="#64748b" strokeWidth="2" />
                            <text x={tx} y="65" textAnchor="middle" fill="#94a3b8" fontSize="9">{tick}</text>
                          </g>
                        );
                      })}

                      <circle cx={40 + (numberLinePos / 50) * 420} cy="45" r="8" fill="#6366f1" stroke="#a5b4fc" strokeWidth="2" />
                      <text x={40 + (numberLinePos / 50) * 420} y="25" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="bold">Pos: {numberLinePos}</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label="Perform addition with zero"
                      onClick={() => handleZeroOperation('+0')}
                      className="p-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-center"
                    >
                      <span className="text-indigo-400 font-bold block text-sm">+ 0 (Add)</span>
                      <span className="text-[10px] text-slate-400">Additive Identity</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label="Perform subtraction with zero"
                      onClick={() => handleZeroOperation('-0')}
                      className="p-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-center"
                    >
                      <span className="text-blue-400 font-bold block text-sm">- 0 (Subtract)</span>
                      <span className="text-[10px] text-slate-400">No Change</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label="Perform multiplication by zero"
                      onClick={() => handleZeroOperation('*0')}
                      className="p-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-center"
                    >
                      <span className="text-amber-400 font-bold block text-sm">× 0 (Multiply)</span>
                      <span className="text-[10px] text-slate-400">Zero Rule</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label="Perform division by zero"
                      onClick={() => handleZeroOperation('/0')}
                      className="p-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-center"
                    >
                      <span className="text-rose-400 font-bold block text-sm">÷ 0 (Divide)</span>
                      <span className="text-[10px] text-slate-400">Undefined</span>
                    </motion.button>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-center text-sm text-emerald-300 font-bold">
                    {zeroOpResult}
                  </div>
                </div>
              )}

              {/* Slide Navigation */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Go to previous lab"
                  onClick={handleSlidePrev}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>
                <span className="text-xs font-mono text-slate-400">{currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Go to next lab"
                    onClick={handleSlideNext}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Enter free sandbox"
                    onClick={handleAdvanceToSandbox}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                  >
                    Enter Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-emerald-400">Free Exploration Sandbox</h3>
            <p className="text-slate-300 text-sm">
              Experiment freely with the multi-digit converter, unit scaler, and distributive area model. No grading, no timer!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <label htmlFor="sandbox-num" className="text-xs text-indigo-400 font-bold uppercase">Test Any Number:</label>
                <input
                  id="sandbox-num"
                  type="number"
                  value={sliderNumber}
                  aria-label="Test any custom number in sandbox"
                  onChange={e => setSliderNumber(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                />
                <div className="text-xs text-slate-400 space-y-1">
                  <div>Indian: <span className="font-mono text-amber-300">{sliderNumber.toLocaleString('en-IN')}</span></div>
                  <div>International: <span className="font-mono text-emerald-300">{sliderNumber.toLocaleString('en-US')}</span></div>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <label htmlFor="sandbox-kg" className="text-xs text-emerald-400 font-bold uppercase">Mass to Grams Scaler:</label>
                <input
                  id="sandbox-kg"
                  type="number"
                  value={cargoKg}
                  aria-label="Test custom cargo weight in kilograms"
                  onChange={e => setCargoKg(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                />
                <div className="text-xs text-slate-300 font-mono">
                  {cargoKg.toLocaleString()} kg = <strong className="text-emerald-400">{(cargoKg * 1000).toLocaleString()} g</strong>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Start Challenge Mode"
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-sm shadow-xl shadow-indigo-600/30"
              >
                I Am Ready for Challenges! 🎯 →
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: ADAPTIVE CHALLENGES (20+ Items) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-slate-400 font-mono">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Competency: {challenge.competencyLevel}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">Node: {challenge.nodeId}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-emerald-400 font-bold">
                Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
              </span>
              <div className="w-28 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/40 border-rose-500' : 'border-slate-800'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white mb-6 leading-relaxed">
              {challenge.question}
            </h3>

            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`p-4 text-left rounded-xl text-sm font-medium transition-all border flex items-center justify-between ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : wrongFlash
                        ? 'bg-rose-900/30 border-rose-500 text-rose-200'
                        : 'bg-slate-800/90 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-700 text-xs font-mono font-bold">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {showExplanation && i === challenge.correctIndex && (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">✓ Correct</span>
                    )}
                    {wrongFlash && (
                      <span className="text-rose-400 font-bold flex items-center gap-1">✗ Incorrect</span>
                    )}
                  </motion.button>
                ))}
              </div>
            )}

            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="w-full text-xs text-slate-400 mb-1 font-semibold">Draggable Labels Palette:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      draggable
                      aria-label={`Draggable label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg cursor-grab text-xs font-bold shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['place_4', 'place_3', 'place_2', 'place_1'].map((targetKey, idx) => (
                    <div
                      key={targetKey}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetKey)}
                      aria-label={`Drop target Column ${4 - idx}`}
                      className={`p-4 rounded-xl border-2 border-dashed text-center min-h-[90px] flex flex-col items-center justify-center transition-all ${
                        droppedLabels[targetKey]
                          ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200'
                          : 'bg-slate-950/60 border-slate-700 text-slate-500'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Column {4 - idx}
                      </span>
                      <strong className="text-xs">
                        {droppedLabels[targetKey] || 'Drop Label Here'}
                      </strong>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Verify label mappings"
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Mappings →
                </motion.button>
              </div>
            )}

            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">Drag to arrange into chronological problem-solving order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      draggable
                      aria-label={`Sort item ${idx + 1}: ${item}`}
                      onDragStart={() => setDraggedItem(String(idx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0', 10);
                        handleSortMove(from, idx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs font-medium cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center font-mono text-[10px]">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Check sort sequence order"
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Check Sequence Order →
                </motion.button>
              </div>
            )}

            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    aria-label={`Enter numerical value in ${challenge.unit || 'units'}`}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value..."
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-64 focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Submit numeric answer"
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold disabled:opacity-50"
                  >
                    Submit Answer →
                  </motion.button>
                </div>
              </div>
            )}

            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Add token ${part}`}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-800/80 hover:bg-indigo-700 text-white rounded-lg text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-2.5 py-1 bg-indigo-600 text-white rounded-md text-xs font-mono font-bold flex items-center gap-1"
                    >
                      {part}
                      <button
                        aria-label={`Remove token ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-300 hover:text-white text-[10px]"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 italic">Click tokens above to construct the algebraic statement</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Verify constructed algebraic identity"
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold disabled:opacity-50"
                >
                  Verify Construction →
                </motion.button>
              </div>
            )}

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-indigo-950/40 border border-indigo-700/60 rounded-2xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Step-by-Step Logic Breakdown:
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">CISCE Method Standard</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-slate-200 text-xs md:text-sm leading-relaxed"
                    >
                      <strong className="text-indigo-400 font-mono mr-1">{i + 1}.</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label="Reveal next explanation step"
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-indigo-700 text-white rounded-lg text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission' : 'Next Challenge'}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: MISSION COMPLETION, REFLECTION & MASTERY PROFILE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 rounded-3xl border border-indigo-700 text-center space-y-4 shadow-2xl">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Mission Chandrayaan Numbers Mastered!</h2>
            <p className="text-indigo-200 text-sm max-w-xl mx-auto">
              Your telemetry, arithmetic algorithms, unit conversions, and number property validations meet full ICSE Class 6 standards.
            </p>

            <div className="flex justify-center gap-6 pt-2 font-mono">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Final Score</span>
                <strong className="text-xl text-emerald-400">{Math.max(0, 100 - errors * 5)}%</strong>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Mastery State</span>
                <strong className="text-xl text-indigo-400 capitalize">{masteryLevel}</strong>
              </div>
            </div>

            {/* SPACED REPETITION VISIBILITY */}
            <div className="mt-4 p-4 bg-indigo-900/40 rounded-2xl border border-indigo-600/60 max-w-md mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block mb-1">
                📅 Spaced Repetition Schedule (SM-2)
              </span>
              <p className="text-sm font-semibold text-white">
                {errors === 0
                  ? 'Mastery Level High! Recommended next review in 7 days.'
                  : errors <= 3
                  ? 'Solid Progress! Recommended next review in 3 days.'
                  : 'Needs Reinforcement! Recommended next review in 1 day.'}
              </p>
            </div>
          </div>

          {/* ─── MANDATORY REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-indigo-800/80 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤔</span>
              <h4 className="text-indigo-300 font-bold text-base">Self-Reflection & Metacognition</h4>
            </div>
            <p className="text-slate-300 text-xs">
              Consolidate your mathematical intuition by reflecting on your problem-solving experience:
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="ref-surprising" className="text-xs font-semibold text-slate-200 block mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  id="ref-surprising"
                  rows={2}
                  value={reflections.surprising}
                  aria-label="What was the most surprising thing you learned?"
                  onChange={e => setReflections({ ...reflections, surprising: e.target.value })}
                  placeholder="e.g., How commas don't change magnitude, or why division by zero is not defined..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="ref-explain" className="text-xs font-semibold text-slate-200 block mb-1">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  id="ref-explain"
                  rows={2}
                  value={reflections.explainFriend}
                  aria-label="How would you explain this to a friend?"
                  onChange={e => setReflections({ ...reflections, explainFriend: e.target.value })}
                  placeholder="e.g., Always compare from the leftmost digit because higher place values dominate..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="ref-reallife" className="text-xs font-semibold text-slate-200 block mb-1">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  id="ref-reallife"
                  rows={2}
                  value={reflections.realLife}
                  aria-label="Where in real life might you use this?"
                  onChange={e => setReflections({ ...reflections, realLife: e.target.value })}
                  placeholder="e.g., Budget planning in crores/lakhs, converting grocery weights, or rocket fuel measurements..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Save Reflection"
                  onClick={() => {
                    setReflectionSubmitted(true);
                    audioManager.play('success');
                    speechManager.speak('Great reflections! Self-explanation cements mathematical concepts.');
                  }}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  {reflectionSubmitted ? '✓ Reflection Saved' : 'Save Reflection Answers'}
                </motion.button>
              </div>
            </div>
          </div>

          <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-800/60">
            <h4 className="text-emerald-300 font-bold text-sm mb-1">Performance Evaluation:</h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              {errors === 0
                ? '✓ PERFECT SCORE! Flawless execution across 5-digit comparisons, 8-digit approximations, long division, and algebraic properties.'
                : errors <= 3
                ? '✓ Outstanding performance! You have built a rock-solid foundation for middle school arithmetic.'
                : '✓ Good persistence! Review the misconception diagnostics below to fortify your understanding.'}
            </p>
          </div>

          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h4 className="text-rose-300 font-bold text-sm">Identified Gaps & Corrections:</h4>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-300 font-semibold">✗ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300 font-semibold">✓ CISCE Standard: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-indigo-300 font-bold text-sm">{REAL_WORLD_ACTIVITY.title}</h4>
            <p className="text-slate-300 text-xs">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="text-slate-400 text-xs flex items-start gap-2">
                  <span className="text-indigo-400 font-mono font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_MathematicsConsolidatingSenseNumbernessSim;
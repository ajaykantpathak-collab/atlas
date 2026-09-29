'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE CONSTANTS ────────────────────────────────────────────────────────
const NODE_C10_CS_011 = 'c10_cs_011';
const NODE_C10_CS_012 = 'c10_cs_012';
const NODE_C10_CS_013 = 'c10_cs_013';
const NODE_C10_CS_014 = 'c10_cs_014';
const NODE_C10_CS_015 = 'c10_cs_015';
const NODE_C10_CS_016 = 'c10_cs_016';
const NODE_C10_CS_017 = 'c10_cs_017';
const NODE_C10_CS_018 = 'c10_cs_018';
const NODE_C10_CS_019 = 'c10_cs_019';
const NODE_C10_CS_020 = 'c10_cs_020';

const ALL_NODE_IDS = [
  NODE_C10_CS_011,
  NODE_C10_CS_012,
  NODE_C10_CS_013,
  NODE_C10_CS_014,
  NODE_C10_CS_015,
  NODE_C10_CS_016,
  NODE_C10_CS_017,
  NODE_C10_CS_018,
  NODE_C10_CS_019,
  NODE_C10_CS_020
];

// ─── NARRATIVE SCENARIO ───────────────────────────────────────────────────
const SCENARIO = {
  title: 'Mission: Bengaluru Metro Automated Transit Kernel',
  intro: 'You are the lead software engineer for Bengaluru Namma Metro. A legacy Java software kernel controlling train ticketing, smart card balances, route matrices, station LED displays, and commuter token security has encountered critical runtime bugs.',
  context: 'Type overflow, operator precedence slips, string pool leaks, matrix boundary errors, and loop indexing bugs are threatening metro operations across the Purple and Green lines. Rebuild, test, and verify the Java core modules to ensure safe commuter transit!'
};

// ─── DISCOVERY HOOK ────────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'In the fare calculator, a programmer wrote:\n\ndouble fare = 15 / 2;\n\nWhat is the exact value stored in the variable fare?',
  options: ['7.5 (exact division)', '7.0 (integer division first, then widened)', '7 (stored as integer)', 'Compilation Error: incompatible types'],
  correctIndex: 1,
  hintAfter: 'Surprised? In Java, 15 and 2 are both primitive `int` literals. 15 / 2 evaluates to 7 FIRST, and only then converts to 7.0! Let us explore why.'
};

// ─── CHALLENGE INTERFACE ─────────────────────────────────────────��─────────
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  codeSnippet?: string;
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

// ─── 22 CHALLENGES (Foundation, Standard, Advanced with NEP 2020) ───────────
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_cs_01',
    nodeId: NODE_C10_CS_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How many bits of memory does a single Java `char` data type occupy, and what encoding standard does it follow?',
    options: [
      '8 bits, ASCII encoding',
      '16 bits, Unicode UTF-16 encoding',
      '32 bits, UTF-32 encoding',
      '64 bits, IEEE-754 encoding'
    ],
    correctIndex: 1,
    explanation: 'A Java `char` occupies 16 bits (2 bytes) of memory and represents an unsigned Unicode character (from 0 to 65,535). Unlike C/C++ which uses 8-bit ASCII, Java was designed for internationalization with 16-bit Unicode.',
    hints: [
      'Think about whether Java uses ASCII (8 bits) or international Unicode.',
      'A byte is 8 bits, short is 16 bits, int is 32 bits. Where does char fit?',
      'Java char is 16-bit unsigned Unicode.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_cs_02',
    nodeId: NODE_C10_CS_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the Java primitive types to their exact memory capacity boxes.',
    dragItems: [
      { label: 'byte (8 bits)', targetId: 'box_8' },
      { label: 'int (32 bits)', targetId: 'box_32' },
      { label: 'long (64 bits)', targetId: 'box_64' },
      { label: 'short / char (16 bits)', targetId: 'box_16' }
    ],
    correctMapping: {
      box_8: 'byte (8 bits)',
      box_16: 'short / char (16 bits)',
      box_32: 'int (32 bits)',
      box_64: 'long (64 bits)'
    },
    explanation: 'Memory hierarchy in Java: byte (8-bit) < short & char (16-bit) < int & float (32-bit) < long & double (64-bit). Widening is safe along this chain; narrowing requires an explicit cast.',
    hints: [
      'Byte is the smallest 8-bit container.',
      'Short and char both take 16 bits (2 bytes).',
      'Int takes 32 bits, Long takes 64 bits.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_cs_03',
    nodeId: NODE_C10_CS_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    codeSnippet: 'Integer balance = null;\nint fare = 40;\nint updated = balance + fare;',
    question: 'What happens when this Metro smart card auto-debit code executes?',
    options: [
      'balance becomes 0, updated = 40',
      'Throws NullPointerException during unboxing at runtime',
      'Compilation Error: cannot add Integer and int',
      'updated becomes 40 without any error'
    ],
    correctIndex: 1,
    explanation: 'When evaluating `balance + fare`, Java automatically unboxes the `Integer balance` object into a primitive `int` by calling `balance.intValue()`. Since `balance` is `null`, invoking any method on it throws a runtime `NullPointerException`.',
    hints: [
      'Autoboxing turns primitive to object; unboxing turns object to primitive.',
      'To add `balance` to `fare`, the JVM must extract the primitive value from `balance`.',
      'Calling an unboxing method on a `null` reference results in a NullPointerException.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_cs_04',
    nodeId: NODE_C10_CS_012,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    codeSnippet: 'int p = 5;\nint cost = p++ * 3 + ++p;\n// What is the value of cost?',
    question: 'Calculate the exact value of `cost` after executing the expression for Kolkata Metro ticket surge pricing.',
    correctAnswer: 22,
    tolerance: 0,
    unit: 'rupees',
    explanation: 'Step 1: `p++ * 3` uses original p=5 in multiplication (5 * 3 = 15), then p becomes 6.\nStep 2: `++p` increments p from 6 to 7, using 7 in addition.\nStep 3: 15 + 7 = 22. Final value of cost is 22 (and p ends at 7).',
    hints: [
      'In postfix `p++`, the current value 5 is used, and p increments to 6.',
      'Then multiplication has higher precedence: 5 * 3 = 15.',
      'Next prefix `++p` turns 6 into 7. 15 + 7 = 22.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_cs_05',
    nodeId: NODE_C10_CS_012,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Arrange these Java operators from HIGHEST precedence (evaluated first) to LOWEST precedence (evaluated last).',
    sortItems: [
      'Postfix Increment (x++)',
      'Multiplicative (*, /, %)',
      'Relational (>, <, >=, <=)',
      'Logical AND (&&)',
      'Assignment (=, +=)'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Java operator precedence hierarchy: Postfix unary (x++, x--) > Prefix & Unary (++x, !) > Multiplicative (*, /, %) > Additive (+, -) > Relational (<, >, <=, >=) > Equality (==, !=) > Logical AND (&&) > Logical OR (||) > Ternary (?:) > Assignment (=, +=).',
    hints: [
      'Unary and postfix always bind tightest at the very top.',
      'Arithmetic (*, /) precedes relational comparisons (<, >).',
      'Assignment operators (=) sit at the very bottom.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_cs_06',
    nodeId: NODE_C10_CS_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    codeSnippet: 'int marks = 94;\nString grade = "F";\nif (marks >= 60) grade = "D";\nelse if (marks >= 75) grade = "C";\nelse if (marks >= 90) grade = "A";',
    question: 'Evaluate this ICSE report card generator logic for a student with 94 marks. What grade is assigned and why?',
    options: [
      'Grade A, because 94 matches the highest branch',
      'Grade D, because Java evaluates top-to-bottom and 94 >= 60 is immediately true',
      'Grade C, because 94 falls in the 75-90 bracket',
      'Compilation error: unreachable else-if conditions'
    ],
    correctIndex: 1,
    explanation: 'In an else-if ladder, Java executes the FIRST branch whose boolean condition evaluates to true and skips all remaining branches. Since 94 >= 60 is true, `grade` becomes "D". To fix this, conditions must be written in descending order (highest slab first: >=90, then >=75, etc.).',
    hints: [
      'Remember how an else-if ladder stops immediately on the first true match.',
      'Is 94 >= 60? Yes. Does Java check the rest of the ladder?',
      'No, the remaining branches are skipped, so grade becomes "D".'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_cs_07',
    nodeId: NODE_C10_CS_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Which of the following boolean expressions correctly identifies whether an Indian railway fiscal year `y` is a leap year?',
    options: [
      'y % 4 == 0 || y % 400 == 0',
      '(y % 4 == 0 && y % 100 != 0) || (y % 400 == 0)',
      'y % 4 == 0 && (y % 100 != 0 || y % 400 == 0)',
      'y % 4 == 0 && y % 100 == 0 && y % 400 == 0'
    ],
    correctIndex: 1,
    explanation: 'A year is a leap year if either: (1) it is divisible by 4 but NOT by 100 (e.g. 2024, 2028), OR (2) it is divisible by 400 (e.g. 1600, 2000). Century years like 1900 and 2100 are NOT leap years.',
    hints: [
      'Think about century years like 1900 (not a leap year) vs 2000 (leap year).',
      'The expression needs two main alternatives separated by OR (||).',
      '`(y % 4 == 0 && y % 100 != 0) || (y % 400 == 0)` handles both rules.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_cs_08',
    nodeId: NODE_C10_CS_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    codeSnippet: 'for (int i = 1; i <= 4; i++) {\n  for (int j = 1; j <= i; j++) {\n    System.out.print(i + " ");\n  }\n  System.out.println();\n}',
    question: 'Analyze this nested loop and determine its exact printed output pattern.',
    options: [
      '1\n1 2\n1 2 3\n1 2 3 4',
      '1\n2 2\n3 3 3\n4 4 4 4',
      '1 2 3 4\n1 2 3\n1 2\n1',
      '4 4 4 4\n3 3 3\n2 2\n1'
    ],
    correctIndex: 1,
    explanation: 'The outer loop variable `i` controls the row value and the inner loop runs `i` times, printing `i` on each turn. When i=1: prints "1". When i=2: prints "2 2". When i=3: prints "3 3 3". When i=4: prints "4 4 4 4".',
    hints: [
      'Look at what is printed inside the inner loop: `i`, not `j`.',
      'On row 2, `i` is 2, and the inner loop runs twice.',
      'The row number itself is printed repeatedly on each row.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_cs_09',
    nodeId: NODE_C10_CS_014,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'In a metro security token generator using the Fibonacci series starting at 0, 1, 1, 2, 3, 5... what is the 8th term (1-indexed)?',
    correctAnswer: 13,
    tolerance: 0,
    unit: 'term value',
    explanation: 'Fibonacci series terms:\nTerm 1: 0\nTerm 2: 1\nTerm 3: 1\nTerm 4: 2\nTerm 5: 3\nTerm 6: 5\nTerm 7: 8\nTerm 8: 13 (8 + 5 = 13).',
    hints: [
      'Start with a=0, b=1.',
      'Next terms: 0+1=1, 1+1=2, 1+2=3, 2+3=5, 3+5=8, 5+8=13.',
      'Count the terms carefully up to the 8th position.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_cs_10',
    nodeId: NODE_C10_CS_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    codeSnippet: 'int[] fares = {45, 12, 85, 32, 10};\n// After Pass 1 of ascending Bubble Sort:',
    question: 'What is the state of the array `fares` after exactly ONE complete pass of ascending Bubble Sort?',
    options: [
      '{10, 12, 32, 45, 85}',
      '{12, 45, 32, 10, 85}',
      '{12, 32, 10, 45, 85}',
      '{85, 45, 32, 12, 10}'
    ],
    correctIndex: 1,
    explanation: 'Tracing Pass 1:\nCompare (45,12) -> swap -> {12, 45, 85, 32, 10}\nCompare (45,85) -> no swap\nCompare (85,32) -> swap -> {12, 45, 32, 85, 10}\nCompare (85,10) -> swap -> {12, 45, 32, 10, 85}.\nThe maximum element (85) bubbles up to the last index!',
    hints: [
      'Bubble sort compares adjacent pairs and swaps if left > right.',
      'Watch 85 move to the end as it is compared with 32 and then 10.',
      'The result after Pass 1 is {12, 45, 32, 10, 85}.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_cs_11',
    nodeId: NODE_C10_CS_015,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Construct the correct Java statement to compute high-precision `double avg` from `int sum` and `int[] arr`.',
    validationHint: 'You need `(double)` cast before `sum`, divided by `arr.length` without parentheses.',
    availableParts: ['double avg =', '(double) sum', '/', 'arr.length', 'arr.length()', 'sum / arr.length;'],
    targetState: 'double avg = (double) sum / arr.length',
    explanation: 'To avoid truncation from integer division, cast `sum` to `double` before dividing. Remember `arr.length` is an instance field for arrays, NOT a method `length()`!',
    hints: [
      'Begin with `double avg =`.',
      'Cast `sum` explicitly using `(double) sum`.',
      'Use `arr.length` (arrays use `.length`, strings use `.length()`).'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_cs_12',
    nodeId: NODE_C10_CS_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    codeSnippet: 'int[][] metroGrid = new int[4][6];',
    question: 'For this metro seating matrix, what do `metroGrid.length` and `metroGrid[0].length` represent?',
    options: [
      '4 columns and 6 rows',
      '4 rows and 6 columns in each row',
      '24 total elements and 4 rows',
      '6 rows and 4 columns'
    ],
    correctIndex: 1,
    explanation: 'In Java, a 2D array is an array of 1D arrays. `metroGrid.length` returns the number of rows (4), while `metroGrid[0].length` returns the number of columns in row 0 (6).',
    hints: [
      'The first bracket is row count, second bracket is column count.',
      '`matrix.length` gives the outer array length (rows).',
      '`matrix[0].length` gives the length of the first row (columns).'
    ],
    misconceptionIndex: 6
  },
  {
    id: 'ch_cs_13',
    nodeId: NODE_C10_CS_016,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    codeSnippet: 'int[][] grid = {\n  {10, 20, 30},\n  {40, 50, 60},\n  {70, 80, 90}\n};\n// Find sum of secondary diagonal (top-right to bottom-left)',
    question: 'Calculate the sum of the secondary diagonal elements (grid[0][2] + grid[1][1] + grid[2][0]).',
    correctAnswer: 150,
    tolerance: 0,
    unit: 'sum',
    explanation: 'Secondary diagonal elements:\ngrid[0][2] = 30\ngrid[1][1] = 50\ngrid[2][0] = 70\nSum = 30 + 50 + 70 = 150.',
    hints: [
      'Row 0, Col 2 is 30.',
      'Row 1, Col 1 is 50.',
      'Row 2, Col 0 is 70. 30 + 50 + 70 = 150.'
    ],
    misconceptionIndex: 6
  },
  {
    id: 'ch_cs_14',
    nodeId: NODE_C10_CS_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    codeSnippet: 'int[] arr = {1, 2, 3, 4, 5};\nint start = 0, end = arr.length - 1;\nwhile (start < end) {\n  int temp = arr[start];\n  arr[start] = arr[end];\n  arr[end] = temp;\n  start++;\n  end--;\n}',
    question: 'How many total swap operations occur during this in-place array reversal of 5 elements?',
    options: ['5 swaps', '2 swaps', '3 swaps', '4 swaps'],
    correctIndex: 1,
    explanation: 'For an array of length n=5: Iteration 1 swaps index 0 & 4 (start=0, end=4). Iteration 2 swaps index 1 & 3 (start=1, end=3). Then start=2, end=2 -> loop terminates because start is not < end. The middle element 3 stays in place. Total swaps = 2 (n / 2).',
    hints: [
      'The loop terminates when start and end meet at index 2.',
      'How many times does the while body execute?',
      'Only 2 swaps are performed: (0 with 4) and (1 with 3).'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_cs_15',
    nodeId: NODE_C10_CS_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    codeSnippet: 'for (int i = 0; i < arr.length; i++) {\n  for (int j = 0; j < arr.length; j++) {\n    if (arr[i] == arr[j]) {\n      System.out.println("Duplicate: " + arr[i]);\n    }\n  }\n}',
    question: 'Critique this junior programmer\'s duplicate detection algorithm. What severe flaw does it contain?',
    options: [
      'It fails to compile because nested loops cannot use the same array',
      'It flags every single element as duplicate because `i == j` compares an element to itself',
      'It throws an ArrayIndexOutOfBoundsException on the last iteration',
      'It only checks adjacent elements and misses distant duplicates'
    ],
    correctIndex: 1,
    explanation: 'When `j` starts from 0, at `i == j` the condition `arr[i] == arr[j]` is ALWAYS true, falsely reporting every element as a duplicate of itself! The inner loop must start from `j = i + 1` to compare only with subsequent elements.',
    hints: [
      'Look at the start index of the inner loop: `j = 0`.',
      'What happens when i=0 and j=0?',
      '`arr[0] == arr[0]` is true, matching itself!'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_cs_16',
    nodeId: NODE_C10_CS_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    codeSnippet: 'String s1 = "Bengaluru";\nString s2 = "Bengaluru";\nString s3 = new String("Bengaluru");\nboolean b1 = (s1 == s2);\nboolean b2 = (s1 == s3);\nboolean b3 = s1.equals(s3);',
    question: 'Determine the boolean values of `b1`, `b2`, and `b3`.',
    options: [
      'b1 = true, b2 = true, b3 = true',
      'b1 = true, b2 = false, b3 = true',
      'b1 = false, b2 = false, b3 = true',
      'b1 = true, b2 = false, b3 = false'
    ],
    correctIndex: 1,
    explanation: 's1 and s2 point to the SAME shared literal in the String Constant Pool, so `s1 == s2` is true. s3 is created with `new`, allocating a distinct object in Heap memory, so `s1 == s3` is false (reference mismatch). `s1.equals(s3)` tests character content, which is identical, returning true.',
    hints: [
      '`==` compares memory addresses (reference identity).',
      'String literals share memory in the String pool.',
      '`new String()` creates a new heap object, but `.equals()` checks character content.'
    ],
    misconceptionIndex: 7
  },
  {
    id: 'ch_cs_17',
    nodeId: NODE_C10_CS_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    codeSnippet: 'String metro = "Namma";\nmetro.concat(" Metro");\nSystem.out.println(metro);',
    question: 'What is printed to the terminal, and why?',
    options: [
      '"Namma Metro", because concat() appends the text',
      '"Namma", because Strings in Java are immutable and the result was not reassigned',
      'Compilation Error: concat() cannot be called as a standalone statement',
      '" Metro", because concat replaces original prefix'
    ],
    correctIndex: 1,
    explanation: 'Java Strings are immutable: their internal character array can never be modified. `metro.concat(" Metro")` creates and returns a NEW String "Namma Metro", but since it was not assigned back (`metro = metro.concat(...)`), the variable `metro` still refers to "Namma".',
    hints: [
      'Remember the stone carving analogy: you cannot edit a stone, you can only carve a new one.',
      'Did the code assign the return value back to `metro = ...`?',
      'No reassignment means `metro` remains "Namma".'
    ],
    misconceptionIndex: 7
  },
  {
    id: 'ch_cs_18',
    nodeId: NODE_C10_CS_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    codeSnippet: 'String station = "MAJESTIC";\nString sub = station.substring(2, 6);',
    question: 'What is the exact value stored in `sub`?',
    options: ['"JEST"', '"AJES"', '"JESTI"', '"MAJE"'],
    correctIndex: 0,
    explanation: 'Indices for "MAJESTIC":\n0:M, 1:A, 2:J, 3:E, 4:S, 5:T, 6:I, 7:C.\n`substring(beginIndex, endIndex)` extracts from beginIndex (2) inclusive up to endIndex (6) EXCLUSIVE (indices 2, 3, 4, 5). Characters at indices 2,3,4,5 are "JEST".',
    hints: [
      'Index 0: M, 1: A, 2: J, 3: E, 4: S, 5: T, 6: I.',
      'The end index 6 is EXCLUDED from the slice.',
      'Indices 2, 3, 4, 5 produce "JEST".'
    ],
    misconceptionIndex: 8
  },
  {
    id: 'ch_cs_19',
    nodeId: NODE_C10_CS_019,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    codeSnippet: 'String a = "DELHI";\nString b = "CHENNAI";\nint diff = a.compareTo(b);',
    question: 'Calculate the exact integer returned by `"DELHI".compareTo("CHENNAI")` based on first differing Unicode character values (ASCII of \'D\' is 68, \'C\' is 67).',
    correctAnswer: 1,
    tolerance: 0,
    unit: 'Unicode diff',
    explanation: '`compareTo()` compares strings character-by-character. The first differing character is at index 0: \'D\' in "DELHI" (Unicode 68) vs \'C\' in "CHENNAI" (Unicode 67). 68 - 67 = 1. A positive value indicates "DELHI" comes after "CHENNAI" in lexicographical order.',
    hints: [
      'Compare first characters: \'D\' vs \'C\'.',
      'Unicode of \'D\' is 68; Unicode of \'C\' is 67.',
      'Return value = 68 - 67 = 1.'
    ],
    misconceptionIndex: 8
  },
  {
    id: 'ch_cs_20',
    nodeId: NODE_C10_CS_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    codeSnippet: 'String word = "Madam";\nString rev = "";\nfor (int i = word.length() - 1; i >= 0; i--) {\n  rev = rev + word.charAt(i);\n}\nboolean isPal = word.equals(rev);',
    question: 'Evaluate `isPal`. Is "Madam" detected as a palindrome by this code?',
    options: [
      'true, because madam is spelled the same forwards and backwards',
      'false, because rev is "madaM" and equals() is case-sensitive (\'M\' != \'m\')',
      'Throws StringIndexOutOfBoundsException inside the loop',
      'Compilation error due to string concatenation inside loop'
    ],
    correctIndex: 1,
    explanation: '`rev` becomes "madaM". Because `equals()` compares exact ASCII/Unicode values and \'M\' (ASCII 77) != \'m\' (ASCII 109), `word.equals(rev)` returns FALSE! To fix this in ICSE programs, always normalize case first with `.equalsIgnoreCase(rev)` or convert both with `.toLowerCase()`.',
    hints: [
      'What is the reverse of "Madam"? It is "madaM".',
      'Does \'M\' at index 0 match \'m\' at the end in `.equals()`?',
      'No, `.equals()` is strictly case-sensitive.'
    ],
    misconceptionIndex: 9
  },
  {
    id: 'ch_cs_21',
    nodeId: NODE_C10_CS_020,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Order the robust algorithm steps to check if two station names are Anagrams (e.g. "TRIANGLE" and "INTEGRAL") using frequency analysis.',
    sortItems: [
      'Convert both strings to lowercase and verify lengths are equal',
      'Allocate int[] freq = new int[26] initialized to 0',
      'Loop through string 1 incrementing freq[ch - \'a\']',
      'Loop through string 2 decrementing freq[ch - \'a\']',
      'Scan freq array: if any cell != 0 return false, else true'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The 26-element frequency array approach is the most efficient anagram checker for ICSE: (1) Normalize case and length check, (2) Create 26-int frequency table, (3) Count occurrences in word 1 (+1), (4) Cancel occurrences in word 2 (-1), (5) Verify all cells return to exactly zero.',
    hints: [
      'Always start with normalization and length verification.',
      'Initialize your 26-bucket frequency table next.',
      'Add counts for string 1, subtract for string 2, then check for zeros.'
    ],
    misconceptionIndex: 9
  },
  {
    id: 'ch_cs_22',
    nodeId: NODE_C10_CS_020,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the robust CISCE-recommended one-liner to calculate the word count of a user input sentence `String s`.',
    validationHint: 'Trim first, then split with whitespace regex `\\\\s+`, then get array length.',
    availableParts: ['int words =', 's.trim()', '.split("\\\\s+")', '.length;', '.length();', 's.indexOf(" ") + 1;'],
    targetState: 'int words = s.trim() .split("\\\\s+") .length;',
    explanation: '`s.trim().split("\\\\s+").length` is the safest way to count words in Java: `trim()` removes leading/trailing spaces, `split("\\\\s+")` handles consecutive multiple spaces or tabs seamlessly, and `.length` returns the count of tokens.',
    hints: [
      'First remove outer spaces using `.trim()`.',
      'Split by one or more spaces using `.split("\\\\s+")`.',
      'Array length is a field: `.length;` without parentheses.'
    ],
    misconceptionIndex: 9
  }
];

// ─── PROPS INTERFACE ───────────────────────────────────────────────────────
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

// ─── DEFAULT PROPS ─────────────────────────────────────────────────────────
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C10_CS_011,
  title: 'Java Data Types, Operators, Control & String Mastery',
  definition: 'Comprehensive mastery of the Java programming language core for ICSE Class 10: primitive type hierarchies, explicit narrowing casts, operator precedence and associativity, robust multi-way branching, nested loop patterns, 1D/2D array algorithms, String immutability, and textual analysis algorithms.',
  eli5: 'Think of Java as an automated metro network: variables are ticket counters of fixed sizes, operators are calculation gears, conditionals and loops switch tracks and run trains, arrays are rows and grids of seats, and Strings are text messages on the announcement board.',
  misconceptions: [
    { misconception: 'Primitive types like char are 8-bit ASCII in Java just like in old C.', correction: 'Java uses 16-bit unsigned Unicode (0 to 65,535) for chars to support global languages.' },
    { misconception: 'Autoboxing is always 100% safe and can never cause runtime crashes.', correction: 'Unboxing a null wrapper object throws a fatal NullPointerException at runtime.' },
    { misconception: 'Every Java expression evaluates strictly left-to-right regardless of operators.', correction: 'Operator precedence (BODMAS-like) dictates order: multiplication and increment happen before addition.' },
    { misconception: 'In an else-if ladder, Java tests all conditions and picks the closest match.', correction: 'Java executes ONLY the first true branch from the top and skips all remaining branches.' },
    { misconception: 'Array sizes are queried with length() and strings with length.', correction: 'Arrays use the public field .length (no parentheses); Strings use the method .length().' },
    { misconception: 'A 2D array in Java is a single flat block where matrix.length gives column count.', correction: 'Java 2D arrays are arrays of 1D arrays: matrix.length gives rows, matrix[0].length gives columns.' },
    { misconception: 'String concatenation or toUpperCase() alters the existing string in-place.', correction: 'Java Strings are immutable; methods return brand new objects leaving the original untouched.' },
    { misconception: 'The end index in substring(start, end) is included in the returned slice.', correction: 'substring(start, end) is exclusive of the end index: it extracts indices from start to end-1.' },
    { misconception: 'Word count can always be found simply by counting space characters and adding 1.', correction: 'Counting spaces fails on leading, trailing, and multiple consecutive spaces. Use s.trim().split("\\s+").length.' }
  ],
  diagnosticQuestions: [
    { question: 'What is the size of a Java `int` in bits?', options: ['16 bits', '32 bits', '64 bits', '8 bits'], correctIndex: 1 },
    { question: 'What is the result of `(int) 8.9` in Java?', options: ['9 (rounded)', '8 (truncated)', '8.9', 'Compilation error'], correctIndex: 1 },
    { question: 'What operator checks object identity rather than character content for Strings?', options: ['.equals()', '==', '.compareTo()', 'instanceof'], correctIndex: 1 },
    { question: 'Which index does `station.charAt(0)` return?', options: ['First character', 'Second character', 'Last character', 'Length of string'], correctIndex: 0 },
    { question: 'What is the default value of an uninitialized `int` array element?', options: ['null', '0', 'Garbage value', '-1'], correctIndex: 1 },
    { question: 'How do you check length of a 1D array `arr`?', options: ['arr.length()', 'arr.length', 'arr.size()', 'arr.count'], correctIndex: 1 },
    { question: 'Which loop is guaranteed to execute its body at least once?', options: ['for loop', 'while loop', 'do-while loop', 'enhanced for-each'], correctIndex: 2 },
    { question: 'What value does `indexOf()` return when a character is not found?', options: ['0', 'null', '-1', 'string length'], correctIndex: 2 }
  ],
  masteryCriteria: 'Student achieves >=80% BKT mastery across primitive types, operators, branching, nested loops, matrix arrays, and immutable String programs.'
};

// ─── EXPLORATION STEPS (Interactive Guided Discovery) ──────────────���──────
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Memory Containers & Narrowing Flasks',
    instruction: 'Adjust the primitive value sliders to observe memory bit-widths and watch explicit cast truncation.',
    interactionType: 'slider-type-cast',
    nodeId: NODE_C10_CS_011
  },
  {
    title: 'Lab 2: Operator Precedence & Postfix Workbench',
    instruction: 'Toggle prefix (++x) vs postfix (x++) in a real-time expression calculator to inspect evaluation order.',
    interactionType: 'toggle-operator-workbench',
    nodeId: NODE_C10_CS_012
  },
  {
    title: 'Lab 3: Metro Route Nested Loop Pattern Matrix',
    instruction: 'Drag the row slider to see how nested loops generate 2D patterns and control console cursor flow.',
    interactionType: 'slider-pattern-generator',
    nodeId: NODE_C10_CS_014
  },
  {
    title: 'Lab 4: 2D Seating Matrix & Diagonal Visualizer',
    instruction: 'Click matrix cells to inspect row/column index coordinates and live aggregate row/column totals.',
    interactionType: 'click-matrix-traversal',
    nodeId: NODE_C10_CS_016
  },
  {
    title: 'Lab 5: String Constant Pool vs Heap Inspector',
    instruction: 'Create string literals vs `new String()` objects and test `==` vs `.equals()` live on the memory map.',
    interactionType: 'toggle-string-pool',
    nodeId: NODE_C10_CS_018
  }
];

// ─── PREDICTION QUESTIONS ──────────────────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you cast `(int) 1847.85`, what will the integer store?',
    options: ['1848 (rounded up)', '1847 (decimal truncated)', '0 (overflow)', 'Compilation Error'],
    correctIndex: 1,
    verifyInstruction: 'Now slide the double value to 1847.85 in Lab 1 to verify the truncation in real-time!',
    nodeId: NODE_C10_CS_011
  },
  {
    question: 'Predict: If s1 = "Metro" and s2 = new String("Metro"), what will `s1 == s2` return?',
    options: ['true (identical text)', 'false (different memory references)', 'NullPointerException', 'true only if interned'],
    correctIndex: 1,
    verifyInstruction: 'Inspect the String Pool visualizer in Lab 5 to see the distinct heap memory address!',
    nodeId: NODE_C10_CS_018
  }
];

// ─── OBSERVATION QUESTIONS ─────────────────────────────────────────────────
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice happens to the fractional decimal when casting double to int?',
    observableOptions: [
      'It rounds to nearest integer according to standard math rules',
      'The decimal part is completely discarded (truncated towards zero)',
      'It throws an ArithmeticException if decimals exist',
      'It stores the decimal in a temporary register'
    ],
    correctIndex: 1,
    nodeId: NODE_C10_CS_011
  },
  {
    question: 'What pattern do you notice about `matrix.length` vs `matrix[0].length` in a 3x5 grid?',
    observableOptions: [
      'Both return 15 (the total cell count)',
      'matrix.length gives row count (3), matrix[0].length gives column count (5)',
      'matrix.length gives column count, matrix[0].length gives row count',
      'matrix[0].length is only valid for square matrices'
    ],
    correctIndex: 1,
    nodeId: NODE_C10_CS_016
  }
];

// ─── REAL WORLD ACTIVITY ───────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'Namma Metro Ticket Security Architect',
  description: 'Design a high-reliability Java utility class `MetroTokenSecurity` for Bengaluru Metro. Your module will parse encrypted commuter smart card tokens, compute discounted fares with zero truncation bugs, and inspect station code palindromes.',
  steps: [
    'Create an array of station fare codes: `int[] baseFares = {15, 20, 25, 30, 45, 60};`',
    'Calculate average station fare using `(double) sum / baseFares.length;`',
    'Verify station name palindromes (e.g. "NAVAPAVAN") ignoring case using `.equalsIgnoreCase()`',
    'Tokenize commuter route logs with `routeLog.trim().split("\\\\s+");` to verify journey stops.'
  ]
};

// ─── MAIN SIMULATION COMPONENT ─────────────────────────────────────────────
function C10_ComputerScienceJavaDataTypesSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  onComplete
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['compsci'] || { name: 'Computer Science', emoji: '💻', color: 'cyan' };

  // ─── REACT STATES ─────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Discovery & Predict-Check states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Sandbox & Lab Interactive States
  const [doubleVal, setDoubleVal] = useState<number>(45.85);
  const [byteVal, setByteVal] = useState<number>(120);
  const [operatorX, setOperatorX] = useState<number>(4);
  const [isPrefix, setIsPrefix] = useState<boolean>(false);
  const [patternRows, setPatternRows] = useState<number>(4);
  const [selectedMatrixCell, setSelectedMatrixCell] = useState<{ r: number; c: number } | null>({ r: 0, c: 0 });
  const [stringPoolMode, setStringPoolMode] = useState<'literal' | 'new'>('literal');
  const [testString, setTestString] = useState<string>('MAJESTIC');
  const [subStart, setSubStart] = useState<number>(2);
  const [subEnd, setSubEnd] = useState<number>(6);
  const [sandboxTab, setSandboxTab] = useState<'types' | 'operators' | 'loops' | 'arrays' | 'strings'>('types');

  // Performance, BKT & SRS States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Challenge Drag, Sort, Numeric & Construct States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Hints & Visual Feedback States
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── REFS ────────────────────────────────────────────────────────────────
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE CHALLENGES FILTER ──────────────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ────────────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE EFFECT ─────────────────────────────────────────────────
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS ANIMATION (RAM & Byte Register visualization) ─────────────
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

      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(10, 20);
      ctx.lineTo(canvas.width - 10, 20);
      ctx.stroke();

      const packetX = 15 + ((frame * 2.5) % (canvas.width - 30));
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(packetX, 20, 5 + Math.sin(frame * 0.1) * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(`JVM Stack Memory Bus | Reg X: 0x${((frame * 4) % 255).toString(16).toUpperCase()} | Active Phase: ${phase.toUpperCase()}`, 10, 42);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── MEMOIZED HANDLERS ───────────────────────────────────────────────────
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding prediction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive Java labs. Let us explore!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play sandbox unlocked. Experiment with all Java constructs.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Time for the certification challenges. You can do this!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now slide the double value to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation! Truncation discards decimals.' : 'Check the flask again carefully.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Java Mastery Simulation.');
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

  const handleAnswer = useCallback((ans: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = ans === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const num = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      const cleanTarget = (challenge.targetState || '').replace(/\s+/g, ' ').trim();
      const cleanAns = (typeof ans === 'string' ? ans : '').replace(/\s+/g, ' ').trim();
      isCorrect = cleanAns === cleanTarget;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent logic.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(bktStateRef.current));
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
        speechManager.speak('Here is the comprehensive explanation to learn from.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleDragStart = useCallback((lbl: string) => {
    setDraggedItem(lbl);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((tgtId: string) => {
    if (!draggedItem) return;
    const isMatch = challenge.correctMapping?.[tgtId] === draggedItem;
    if (isMatch) {
      setDroppedLabels(prev => ({ ...prev, [tgtId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((from: number, to: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let base = prev.length === challenge.sortItems?.length ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = base.splice(from, 1);
      base.splice(to, 0, moved);
      return base;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleDoubleSlider = useCallback((val: number) => {
    setDoubleVal(val);
    audioManager.play('count');
  }, []);

  const handleOperatorSlider = useCallback((val: number) => {
    setOperatorX(val);
    audioManager.play('count');
  }, []);

  const handleMatrixCellClick = useCallback((r: number, c: number) => {
    setSelectedMatrixCell({ r, c });
    audioManager.play('tap');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── DERIVED VALUES FOR LAB VISUALIZATIONS ──────────────────────────��─────
  const castIntResult = useMemo(() => Math.trunc(doubleVal), [doubleVal]);
  const operatorResult = useMemo(() => {
    if (isPrefix) {
      const newX = operatorX + 1;
      return { cost: newX * 3, finalX: newX, explanation: `++x makes x=${newX} first, then ${newX} * 3 = ${newX * 3}` };
    } else {
      const cost = operatorX * 3;
      const finalX = operatorX + 1;
      return { cost, finalX, explanation: `x++ uses x=${operatorX} in multiplication (${operatorX} * 3 = ${cost}), then x becomes ${finalX}` };
    }
  }, [operatorX, isPrefix]);

  const matrixData = useMemo(() => [
    [15, 25, 35, 45],
    [20, 30, 40, 50],
    [10, 20, 30, 40]
  ], []);

  const stringSubResult = useMemo(() => {
    try {
      if (subStart >= 0 && subEnd <= testString.length && subStart <= subEnd) {
        return testString.substring(subStart, subEnd);
      }
      return 'IndexError';
    } catch {
      return 'Error';
    }
  }, [testString, subStart, subEnd]);

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER JSX
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-gold-900/40 font-sans">
      {/* ─── HEADER BAR ────────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gold-950/80 border border-gold-500/30 rounded-2xl text-2xl shadow-inner">
            {subjectConfig.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-gold-900/60 text-gold-300 font-semibold uppercase tracking-wider">
                ICSE Class 10
              </span>
              <span className="text-xs font-mono text-slate-400">c10_cs_011 — c10_cs_020</span>
            </div>
            <h1 className="text-lg md:text-xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase / Difficulty / Navigation Pill */}
        <div className="flex items-center gap-2">
          {phase !== 'discovery' && phase !== 'complete' && (
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPhase('explore')}
                className={`px-3 py-1.5 rounded-lg transition-all ${phase === 'explore' ? 'bg-gold-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                🔬 Labs
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPhase('sandbox')}
                className={`px-3 py-1.5 rounded-lg transition-all ${phase === 'sandbox' ? 'bg-gold-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                🎮 Sandbox
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPhase('challenge')}
                className={`px-3 py-1.5 rounded-lg transition-all ${phase === 'challenge' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                🎯 Challenges
              </motion.button>
            </div>
          )}

          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`text-xs px-3 py-1.5 rounded-xl font-black uppercase tracking-wider shadow ${
                difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                difficulty === 'advanced' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                'bg-gold-500/20 text-gold-300 border border-gold-500/40'
              }`}
            >
              {difficulty}
            </motion.span>
          )}
        </div>
      </motion.header>

      {/* ─── LIVE JVM CANVAS HARDWARE INDICATOR ──────────────────────────── */}
      <div className="my-3 rounded-xl overflow-hidden bg-slate-900 border border-slate-800/80">
        <canvas ref={canvasRef} width={900} height={48} className="w-full h-12 block" />
      </div>

      {/* ────────────────────────────────────────────────────────────��──── */}
      {/* 1. DISCOVERY HOOK PHASE                                           */}
      {/* ───────────────────────────────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 my-4">
          {/* Real-world Scenario Card */}
          <div className="p-5 bg-gradient-to-br from-gold-950/70 via-slate-900 to-gold-950/70 rounded-2xl border border-gold-800/50 shadow-xl">
            <div className="flex items-center gap-2 text-gold-400 text-xs font-mono font-bold uppercase tracking-widest mb-1">
              <span>🚇</span> NARRATIVE CHALLENGE CONTEXT
            </div>
            <h2 className="text-xl font-extrabold text-gold-200">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300/80 mt-2 font-mono bg-gold-950/40 p-2.5 rounded-lg border border-gold-900/50">
              📌 {SCENARIO.context}
            </p>
          </div>

          {/* Curiosity Diagnostic Question */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider">
                💡 Quick Curiosity Hook (Not Graded)
              </span>
              <span className="text-xs text-slate-400">Think like a JVM compiler!</span>
            </div>
            <h3 className="text-base font-semibold text-white whitespace-pre-line leading-relaxed">
              {DISCOVERY_QUESTION.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${opt}`}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/90 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-gold-500/50'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gold-950/60 rounded-xl border border-gold-700/60 space-y-3"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-300 font-bold' : 'text-amber-300 font-medium'}`}>
                  {discoveryCorrect ? '✓ Spot on! You reasoned through integer division promotion.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white text-sm font-black rounded-xl shadow-lg flex items-center gap-2"
                >
                  Enter Interactive Discovery Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* 2. EXPLORATION PHASE (Interactive Discovery Labs)                 */}
      {/* ───────────────────────────────────────────────────────────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 my-2">
          {/* Lab Step Stepper */}
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-gold-400 uppercase">
                Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
            </div>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-6 bg-gold-400' : 'w-2 bg-slate-700'
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
              className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <div>
                <h3 className="text-lg font-black text-gold-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-xs text-amber-300 font-mono mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ── LAB 1: TYPE CASTING & NARROWING FLASKS ── */}
              {currentSlide === 0 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {/* Predict-Then-Check Box */}
                  {!predictionMade && (
                    <div className="p-3 bg-gold-950/60 rounded-xl border border-gold-800 space-y-2">
                      <p className="text-xs font-bold text-gold-300 font-mono">🔮 PREDICTION CHALLENGE</p>
                      <p className="text-xs text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2 bg-slate-800 text-xs rounded-lg text-slate-300 text-left hover:bg-gold-900 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && !predictionVerified && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-amber-400 font-mono">
                      {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </motion.div>
                  )}

                  {/* Interactive Double to Int Casting Slider */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-xs font-mono text-gold-400 flex justify-between">
                        <span>Original `double billAmount` (64 bits)</span>
                        <span className="font-bold text-white">{doubleVal.toFixed(2)}</span>
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={0.05}
                        value={doubleVal}
                        onChange={(e) => handleDoubleSlider(parseFloat(e.target.value))}
                        aria-label="Adjust double value"
                        className="w-full accent-gold-500"
                      />

                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs space-y-1">
                        <p className="text-slate-400">// Narrowing cast in Java source:</p>
                        <p className="text-gold-300 font-bold">int rupees = (int) {doubleVal.toFixed(2)};</p>
                        <p className="text-emerald-400">Result stored in rupees = <span className="text-white text-sm font-black">{castIntResult}</span></p>
                        <p className="text-rose-400 text-[10px]">Data lost: .{(doubleVal - castIntResult).toFixed(2).split('.')[1]} (Truncated!)</p>
                      </div>
                    </div>

                    {/* SVG Visual Flask / Container Representation */}
                    <div className="flex items-center justify-center p-2 bg-slate-900 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 280 140" className="w-full max-h-36">
                        <rect x="20" y="20" width="100" height="100" rx="8" fill="#0e7490" fillOpacity="0.2" stroke="#06b6d4" strokeWidth="2" />
                        <text x="70" y="40" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">double (64 bits)</text>
                        <rect x="30" y={110 - (doubleVal)} width="80" height={doubleVal} fill="#06b6d4" rx="4" />
                        <text x="70" y="80" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">{doubleVal.toFixed(2)}</text>

                        <path d="M 125 70 L 155 70" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4 2" />
                        <text x="140" y="60" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">(int) cast</text>

                        <rect x="160" y="35" width="90" height="85" rx="8" fill="#1e1b4b" fillOpacity="0.3" stroke="#818cf8" strokeWidth="2" />
                        <text x="205" y="52" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">int (32 bits)</text>
                        <rect x="170" y={115 - (castIntResult * 0.8)} width="70" height={castIntResult * 0.8} fill="#6366f1" rx="4" />
                        <text x="205" y="85" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">{castIntResult}</text>
                      </svg>
                    </div>
                  </div>

                  {/* Observation Question */}
                  {!observationAnswered && (
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-xs font-bold text-gold-300 font-mono">🔍 OBSERVATION CHECK</p>
                      <p className="text-xs text-slate-200">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="p-2 bg-slate-800 text-xs rounded-lg text-slate-300 text-left hover:bg-slate-750 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── LAB 2: OPERATOR PRECEDENCE & POSTFIX WORKBENCH ── */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono text-gold-400">Initial `int x` value:</label>
                        <span className="font-mono text-base font-bold text-gold-300">{operatorX}</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={10}
                        value={operatorX}
                        onChange={(e) => handleOperatorSlider(parseInt(e.target.value))}
                        aria-label="Adjust operator operand"
                        className="w-full accent-gold-500"
                      />

                      <div className="flex gap-2 pt-2">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => { setIsPrefix(false); audioManager.play('tap'); }}
                          className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                            !isPrefix ? 'bg-gold-600 text-white border-gold-400 shadow' : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          Postfix: `x++ * 3`
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => { setIsPrefix(true); audioManager.play('tap'); }}
                          className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                            isPrefix ? 'bg-gold-600 text-white border-gold-400 shadow' : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          Prefix: `++x * 3`
                        </motion.button>
                      </div>
                    </div>

                    {/* Step-by-Step Execution Box */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                      <div className="text-amber-300 font-bold">⚡ JVM Execution Trace:</div>
                      <div className="p-2 bg-slate-950 rounded-lg text-slate-300 space-y-1">
                        <p>Mode: <span className="text-gold-400 font-bold">{isPrefix ? 'PREFIX (++x)' : 'POSTFIX (x++)'}</span></p>
                        <p className="text-emerald-300">{operatorResult.explanation}</p>
                        <p className="text-white font-bold pt-1">
                          Evaluated expression value = <span className="text-base text-yellow-300">{operatorResult.cost}</span>
                        </p>
                        <p className="text-slate-400">Final variable x in memory = <span className="text-gold-300 font-bold">{operatorResult.finalX}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: NESTED LOOP PATTERN GENERATOR ── */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-xs font-mono text-gold-400 flex justify-between">
                        <span>Outer Loop Rows (n):</span>
                        <span className="font-bold text-white">{patternRows}</span>
                      </label>
                      <input
                        type="range"
                        min={2}
                        max={6}
                        value={patternRows}
                        onChange={(e) => { setPatternRows(parseInt(e.target.value)); audioManager.play('count'); }}
                        aria-label="Adjust pattern rows"
                        className="w-full accent-gold-500"
                      />

                      <div className="font-mono text-xs p-2 bg-slate-950 rounded-lg text-slate-300 border border-slate-800">
                        <p className="text-slate-500">// ICSE Pattern Java Code:</p>
                        <p className="text-gold-400">for (int i = 1; i &lt;= {patternRows}; i++) &#123;</p>
                        <p className="text-gold-300 pl-4">for (int j = 1; j &lt;= i; j++) &#123;</p>
                        <p className="text-emerald-300 pl-8">System.out.print(i + " ");</p>
                        <p className="text-gold-300 pl-4">&#125;</p>
                        <p className="text-amber-300 pl-4">System.out.println();</p>
                        <p className="text-gold-400">&#125;</p>
                      </div>
                    </div>

                    {/* Live Console Output Visualizer */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-1">
                        <span>Terminal Output</span>
                        <span className="text-emerald-400">System.out</span>
                      </div>
                      <div className="bg-black p-4 rounded-lg font-mono text-emerald-400 text-sm space-y-1 min-h-[140px] flex flex-col justify-center">
                        {Array.from({ length: patternRows }).map((_, rIdx) => {
                          const rowNum = rIdx + 1;
                          const rowContent = Array.from({ length: rowNum }).map(() => rowNum).join(' ');
                          return (
                            <motion.div
                              key={rIdx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="tracking-widest"
                            >
                              {rowContent}
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: 2D SEATING MATRIX TRAVERSAL ── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Interactive 3x4 Matrix */}
                    <div className="space-y-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-xs font-mono text-gold-400">
                        Click cells in `int[][] grid` (3 rows x 4 cols):
                      </div>

                      <div className="grid grid-cols-4 gap-2 pt-2">
                        {matrixData.map((row, r) =>
                          row.map((val, c) => {
                            const isSelected = selectedMatrixCell?.r === r && selectedMatrixCell?.c === c;
                            return (
                              <motion.button
                                key={`${r}-${c}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleMatrixCellClick(r, c)}
                                aria-label={`Cell row ${r} col ${c}`}
                                className={`p-3 rounded-xl font-mono text-sm font-bold border transition-all ${
                                  isSelected
                                    ? 'bg-gold-600 text-white border-gold-300 shadow-lg ring-2 ring-gold-400'
                                    : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-750'
                                }`}
                              >
                                <div className="text-[9px] text-slate-400">[{r}][{c}]</div>
                                <div>{val}</div>
                              </motion.button>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {/* Cell Inspection & Row/Col Properties */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                      <div className="text-gold-300 font-bold">📊 Matrix Subscript Inspector:</div>
                      {selectedMatrixCell ? (
                        <div className="p-2.5 bg-slate-950 rounded-lg space-y-1.5 text-slate-300">
                          <p>Selected Coordinate: <span className="text-yellow-300 font-bold">grid[{selectedMatrixCell.r}][{selectedMatrixCell.c}]</span></p>
                          <p>Cell Value: <span className="text-emerald-400 font-bold">{matrixData[selectedMatrixCell.r][selectedMatrixCell.c]}</span></p>
                          <p className="text-slate-400">Outer Dimension (`grid.length`): <span className="text-gold-300">3 rows</span></p>
                          <p className="text-slate-400">Inner Dimension (`grid[0].length`): <span className="text-gold-300">4 columns</span></p>
                          <p className="text-amber-300 text-[11px] pt-1">
                            Sum of Row {selectedMatrixCell.r}: {matrixData[selectedMatrixCell.r].reduce((a, b) => a + b, 0)}
                          </p>
                        </div>
                      ) : (
                        <p className="text-slate-500">Click any coordinate above to inspect.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 5: STRING POOL VS HEAP & SUBSTRING INSPECTOR ── */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* String Memory Diagram */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                      <div className="text-gold-400 font-bold">🧠 JVM Memory: String Constant Pool vs Heap</div>
                      <svg viewBox="0 0 280 140" className="w-full">
                        <rect x="5" y="5" width="270" height="130" rx="10" fill="#0f172a" stroke="#334155" />
                        <text x="15" y="20" fill="#64748b" fontSize="8" fontFamily="monospace">JVM HEAP MEMORY</text>

                        <rect x="130" y="25" width="135" height="100" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                        <text x="197" y="40" fill="#a5b4fc" fontSize="9" fontWeight="bold" textAnchor="middle">String Constant Pool</text>
                        <rect x="145" y="50" width="105" height="25" rx="4" fill="#312e81" stroke="#818cf8" />
                        <text x="197" y="66" fill="#ffffff" fontSize="10" textAnchor="middle">"MAJESTIC"</text>

                        <rect x="15" y="45" width="100" height="45" rx="6" fill="#064e3b" stroke="#10b981" />
                        <text x="65" y="60" fill="#6ee7b7" fontSize="8" textAnchor="middle">new String Object</text>
                        <text x="65" y="76" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">"MAJESTIC"</text>

                        <path d="M 65 90 L 145 65" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
                      </svg>
                    </div>

                    {/* Substring Interactive Slicer */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                      <div className="text-gold-300 font-bold">✂️ substring(start, end) Slicer:</div>
                      <div className="flex gap-2">
                        {testString.split('').map((ch, idx) => (
                          <div
                            key={idx}
                            className={`flex-1 text-center p-1.5 rounded border ${
                              idx >= subStart && idx < subEnd
                                ? 'bg-gold-600 text-white border-gold-400 font-bold shadow'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            <div className="text-[9px] text-slate-400">{idx}</div>
                            <div className="text-sm">{ch}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <label className="text-slate-400">Start (inc):</label>
                        <input
                          type="number"
                          min={0}
                          max={testString.length}
                          value={subStart}
                          onChange={(e) => setSubStart(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-14 p-1 bg-slate-950 border border-slate-700 rounded text-center text-white"
                        />
                        <label className="text-slate-400">End (exc):</label>
                        <input
                          type="number"
                          min={0}
                          max={testString.length}
                          value={subEnd}
                          onChange={(e) => setSubEnd(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-14 p-1 bg-slate-950 border border-slate-700 rounded text-center text-white"
                        />
                      </div>

                      <div className="p-2 bg-slate-950 rounded-lg text-emerald-400 font-mono">
                        `"{testString}".substring({subStart}, {subEnd})` = <span className="text-yellow-300 font-bold">"{stringSubResult}"</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Stepper Navigation Buttons */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setCurrentSlide(s => Math.max(0, s - 1)); audioManager.play('tap'); }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs font-mono text-slate-400">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setCurrentSlide(s => s + 1); audioManager.play('whoosh'); }}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black rounded-xl shadow-lg"
              >
                Try Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* 3. SANDBOX PHASE (Free Play & Variable Manipulation)              */}
      {/* ─────────────────��─────────────────────────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4 my-2">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap justify-between items-center gap-2">
            <div>
              <h3 className="text-base font-black text-gold-300">🎮 Free Exploration Sandbox</h3>
              <p className="text-xs text-slate-400">Play with values freely without grading to build deep intuition.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xs font-black rounded-xl shadow-lg"
            >
              Ready for Certification Challenges! 🎯 →
            </motion.button>
          </div>

          {/* Sandbox Tabs */}
          <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
            {(['types', 'operators', 'loops', 'arrays', 'strings'] as const).map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setSandboxTab(tab); audioManager.play('tap'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition-all ${
                  sandboxTab === tab ? 'bg-gold-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </motion.button>
            ))}
          </div>

          {/* Tab Content Workbench */}
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 min-h-[220px]">
            {sandboxTab === 'types' && (
              <div className="space-y-3 font-mono text-xs">
                <p className="text-gold-300 font-bold">Byte Overflow & Truncation Lab:</p>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">byte slider (-128 to 127):</span>
                  <input
                    type="range"
                    min={-128}
                    max={127}
                    value={byteVal}
                    onChange={(e) => setByteVal(parseInt(e.target.value))}
                    className="flex-1 accent-gold-500"
                  />
                  <span className="text-white font-bold">{byteVal}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg text-slate-300 border border-slate-800 space-y-1">
                  <p>Binary representation (8-bit signed two's complement):</p>
                  <p className="text-emerald-400 font-bold text-sm tracking-widest">
                    {(byteVal >>> 0).toString(2).slice(-8).padStart(8, '0')}
                  </p>
                  <p className="text-slate-400 text-[11px]">byte range: -128 (0x80) to +127 (0x7F)</p>
                </div>
              </div>
            )}

            {sandboxTab === 'operators' && (
              <div className="space-y-3 font-mono text-xs">
                <p className="text-gold-300 font-bold">Complex Expression Resolver:</p>
                <p className="text-slate-300">Evaluating: `int r = 10 / 2 * 3 + (5 % 2);`</p>
                <div className="p-3 bg-slate-950 rounded-lg space-y-1 text-slate-300 border border-slate-800">
                  <p>1. `10 / 2` (left-to-right division) = <span className="text-gold-300">5</span></p>
                  <p>2. `5 * 3` (multiplication) = <span className="text-gold-300">15</span></p>
                  <p>3. `5 % 2` (remainder) = <span className="text-gold-300">1</span></p>
                  <p>4. `15 + 1` = <span className="text-yellow-300 font-bold text-sm">16</span></p>
                </div>
              </div>
            )}

            {sandboxTab === 'loops' && (
              <div className="space-y-3 font-mono text-xs">
                <p className="text-gold-300 font-bold">Fibonacci Generator Sequence:</p>
                <div className="flex flex-wrap gap-2">
                  {[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55].map((val, idx) => (
                    <div key={idx} className="p-2 bg-slate-950 border border-slate-800 rounded-lg text-center min-w-[45px]">
                      <div className="text-[9px] text-slate-500">T{idx + 1}</div>
                      <div className="text-gold-300 font-bold">{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {sandboxTab === 'arrays' && (
              <div className="space-y-3 font-mono text-xs">
                <p className="text-gold-300 font-bold">1D Array Reversal Visualizer:</p>
                <div className="flex gap-2">
                  {['M', 'A', 'J', 'E', 'S', 'T', 'I', 'C'].map((ch, idx) => (
                    <div key={idx} className="flex-1 p-2 bg-slate-950 border border-gold-900 rounded-lg text-center">
                      <div className="text-[9px] text-slate-400">arr[{idx}]</div>
                      <div className="text-sm font-bold text-white">{ch}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {sandboxTab === 'strings' && (
              <div className="space-y-3 font-mono text-xs">
                <p className="text-gold-300 font-bold">String Methods Playground:</p>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 text-slate-300">
                  <p>`"NAMMA METRO".toLowerCase()` → <span className="text-emerald-300">"namma metro"</span></p>
                  <p>`"  KOLKATA  ".trim()` → <span className="text-emerald-300">"KOLKATA"</span></p>
                  <p>`"CHENNAI".indexOf('N')` → <span className="text-yellow-300">3</span> (first index)</p>
                  <p>`"MADAM".replace('A', '@')` → <span className="text-emerald-300">"M@D@M"</span></p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* 4. CHALLENGE PHASE (Adaptive, NEP 2020, Multi-type)              */}
      {/* ───────────────────────────────────────────────────────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 my-2">
          {/* Progress Bar & Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-gold-400 font-bold">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-slate-400">
                Competency: <span className="text-gold-300 uppercase font-bold">{challenge.competencyLevel}</span>
              </span>
            </div>

            <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-gold-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-5 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 ring-2 ring-rose-500/50'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <h2 className="text-base md:text-lg font-bold text-white mb-2 leading-snug">
              {challenge.question}
            </h2>

            {challenge.codeSnippet && (
              <div className="my-3 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-gold-300 whitespace-pre-wrap">
                {challenge.codeSnippet}
              </div>
            )}

            {/* ── TYPE 1: MCQ (classify, distinguish, match) ── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {challenge.options.map((opt, i) => {
                  const isChosenCorrect = showExplanation && i === challenge.correctIndex;
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option: ${opt}`}
                      className={`p-4 rounded-xl text-left text-xs md:text-sm font-medium transition-all border ${
                        isChosenCorrect
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 shadow-lg'
                          : showExplanation && i !== challenge.correctIndex
                          ? 'bg-slate-900/40 border-slate-800/80 text-slate-500'
                          : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-gold-500/50'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1">{opt}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* ── TYPE 2: DRAG-LABEL CHALLENGE ── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 mt-3">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center font-mono mr-2">Drag labels:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-lg cursor-grab text-xs font-mono font-bold shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'box_8', name: '8 Bits (1 Byte)' },
                    { id: 'box_16', name: '16 Bits (2 Bytes)' },
                    { id: 'box_32', name: '32 Bits (4 Bytes)' },
                    { id: 'box_64', name: '64 Bits (8 Bytes)' }
                  ].map((box) => (
                    <div
                      key={box.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(box.id)}
                      className={`p-4 rounded-xl border-2 border-dashed text-center min-h-[90px] flex flex-col justify-center items-center transition-all ${
                        droppedLabels[box.id]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950/60 border-slate-700 text-slate-400'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-slate-400">{box.name}</div>
                      <div className="text-xs font-bold font-mono mt-1 text-white">
                        {droppedLabels[box.id] || 'Drop label here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow"
                >
                  Verify Memory Mapping
                </motion.button>
              </div>
            )}

            {/* ── TYPE 3: DRAG-SORT CHALLENGE ── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 mt-3">
                <p className="text-xs text-slate-400 font-mono">Drag or rearrange items into correct sequence:</p>
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
                      className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs md:text-sm font-mono text-slate-200 cursor-grab flex items-center gap-3 shadow-sm"
                    >
                      <span className="px-2 py-0.5 rounded bg-gold-900 text-gold-300 font-bold text-xs">
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
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* ── TYPE 4: NUMERIC CHALLENGE ── */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3 mt-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated number"
                    aria-label="Numeric input"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48 focus:border-gold-500 outline-none"
                  />
                  {challenge.unit && <span className="text-xs font-mono text-slate-400">{challenge.unit}</span>}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || numericInput === ''}
                    className="px-5 py-3 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* ── TYPE 5: CONSTRUCT CHALLENGE ── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3 mt-3">
                <p className="text-xs text-amber-300 font-mono">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { setConstructParts(prev => [...prev, part]); audioManager.play('tap'); }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white text-xs font-mono rounded-lg shadow"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1 bg-gold-900 border border-gold-500 rounded-lg text-xs font-mono text-gold-200 flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs font-mono text-slate-500">Click components above to build syntax.</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow"
                >
                  Verify Code Construction
                </motion.button>
              </div>
            )}

            {/* ── STEP-BY-STEP PROGRESSIVE DISCLOSURE EXPLANATION ── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-gradient-to-br from-gold-950/70 to-slate-950 rounded-2xl border border-gold-700/60 space-y-3"
              >
                <div className="flex items-center gap-2 text-gold-300 font-mono text-xs font-bold uppercase tracking-wider">
                  <span>📖</span> ICSE Step-by-Step Code Walkthrough:
                </div>

                <div className="space-y-2">
                  {challenge.explanation.split('\n').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-gold-100 font-sans leading-relaxed pl-3 border-l-2 border-gold-400"
                    >
                      {sentence}
                    </motion.p>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  {revealedSteps < challenge.explanation.split('\n').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-gold-700 hover:bg-gold-600 text-white text-xs font-bold rounded-xl shadow"
                    >
                      Show Next Explanation Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xs font-black rounded-xl shadow-lg flex items-center gap-2"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Certification →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* 5. COMPLETION PHASE                                               */}
      {/* ───────────────────────────────────────────────────────────────── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5 my-4">
          {/* Master Score Banner */}
          <div className="p-6 bg-gradient-to-br from-slate-900 via-gold-950 to-slate-900 rounded-3xl border border-gold-500/40 text-center space-y-3 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-black text-white">
              🎉 Java Metro Core Certification Complete!
            </h2>
            <div className="flex justify-center items-center gap-4 text-sm font-mono">
              <span className="px-3 py-1 bg-emerald-950 border border-emerald-500 rounded-xl text-emerald-300 font-bold">
                Final Score: {Math.max(0, 100 - errors * 5)}%
              </span>
              <span className="px-3 py-1 bg-gold-950 border border-gold-500 rounded-xl text-gold-300 font-bold">
                BKT Mastery: {masteryLevel.toUpperCase()}
              </span>
            </div>

            {/* Personalized Motivational Feedback */}
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs md:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              <p className="font-bold text-sm md:text-base text-gold-300 mb-1">
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </p>
              <p>
                {errors === 0
                  ? 'You mastered Java data types, operators, matrices, and string algorithms with zero compilation errors!'
                  : errors <= 3
                  ? 'Your Java mental model is solid and exam-ready. Review the minor slips below to hit 100%.'
                  : errors <= 7
                  ? 'You made good progress through tough concepts. Review the targeted misconceptions below!'
                  : 'Computer science mastery grows by inspecting stack traces. Review your targeted misconception profile below and re-run the labs!'}
              </p>
            </div>
          </div>

          {/* Spaced Repetition (SRS) Scheduled Review Visibility Banner */}
          <div className="p-5 bg-gradient-to-r from-amber-950/60 via-slate-900 to-gold-950/60 rounded-2xl border-2 border-amber-500/60 shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">📅</span>
                <span className="font-mono text-sm font-black text-amber-300 uppercase tracking-wider">
                  Adaptive Spaced Repetition (SRS) Schedule
                </span>
              </div>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full font-mono font-bold text-xs">
                {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
              Based on your test accuracy ({errors} error{errors === 1 ? '' : 's'}), the SM-2 algorithm has scheduled your next retention review for{' '}
              <strong className="text-amber-300">
                {errors === 0 ? '7 days from now' : errors <= 3 ? '3 days from now' : 'tomorrow (1 day)'}
              </strong>
              . Revisit then to lock these Java concepts into long-term memory!
            </p>
          </div>

          {/* Targeted Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 font-mono uppercase tracking-wider flex items-center gap-2">
                <span>⚠️</span> Identified Misconception Profile:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/50 space-y-1 text-xs">
                      <p className="text-rose-300 font-bold">❌ Common Trap: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ ICSE Rule: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Reflection Section */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-gold-300 font-mono uppercase tracking-wider">
              🤔 Reflection & Synthesis
            </h3>
            <div className="space-y-2">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-xs font-semibold text-slate-200">1. What was the most surprising thing you learned?</p>
                <p className="text-xs text-slate-400 mt-1">E.g., How integer division truncates before widening, or how String pool equality works differently with new String().</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-xs font-semibold text-slate-200">2. How would you explain this to a friend?</p>
                <p className="text-xs text-slate-400 mt-1">E.g., Using the analogy of fixed-size ticket boxes and immutable announcement boards.</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-xs font-semibold text-slate-200">3. Where in real life might you use this?</p>
                <p className="text-xs text-slate-400 mt-1">E.g., Developing real-time transport fare systems, validating input tokens, or indexing grid matrices.</p>
              </div>
            </div>
          </div>

          {/* Real-world Culminating Activity */}
          <div className="p-5 bg-gold-950/40 rounded-2xl border border-gold-800/60 space-y-3">
            <h3 className="text-sm font-bold text-gold-300 font-mono uppercase tracking-wider">
              🛠️ {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="text-xs text-slate-400 font-mono flex items-start gap-2">
                  <span className="text-gold-400 font-bold">{i + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE FEEDBACK OVERLAYS ─────────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_ComputerScienceJavaDataTypesSim;
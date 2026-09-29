'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst,
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C11_CS_021 = 'c11_cs_021';
const NODE_C11_CS_022 = 'c11_cs_022';
const NODE_C11_CS_023 = 'c11_cs_023';
const NODE_C11_CS_024 = 'c11_cs_024';
const NODE_C11_CS_025 = 'c11_cs_025';
const NODE_C11_CS_026 = 'c11_cs_026';
const NODE_C11_CS_027 = 'c11_cs_027';
const NODE_C11_CS_028 = 'c11_cs_028';
const NODE_C11_CS_029 = 'c11_cs_029';
const NODE_C11_CS_030 = 'c11_cs_030';

const ALL_NODE_IDS = [
  NODE_C11_CS_021,
  NODE_C11_CS_022,
  NODE_C11_CS_023,
  NODE_C11_CS_024,
  NODE_C11_CS_025,
  NODE_C11_CS_026,
  NODE_C11_CS_027,
  NODE_C11_CS_028,
  NODE_C11_CS_029,
  NODE_C11_CS_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'CyberVidyalaya Examination Engine',
  intro:
    'You are the lead architect building the core data processing backend for CISCE online examinations across 2,500 schools in India. High throughput, flawless memory allocation, strict exception management, and fast algorithmic processing are mission critical.',
  context:
    'You must configure Student object memory heaps, compute 2D matrix marksheets, execute recursive merit ranking, search roll numbers with binary search, and build fault-tolerant custom exception handlers before the board exam goes live!',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question:
    'You execute: Student[] students = new Student[5]; in Java. How many Student objects have been constructed in heap memory so far?',
  options: [
    '5 Student objects initialized with default fields',
    '0 Student objects — only 1 array object containing 5 null references',
    '1 Student object representing a container of 5 elements',
    '5 Student objects and 1 master registry object',
  ],
  correctIndex: 1,
  hintAfter:
    'The statement creates a row of 5 reference lockers, but each holds null! A second round of `new` is required for each object.',
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

// ─── 22 CHALLENGES (Foundation, Standard, Advanced across all 10 nodes) ───
const CHALLENGES: Challenge[] = [
  // Foundation: Arrays of Objects (c11_cs_021)
  {
    id: 'ch_01',
    nodeId: NODE_C11_CS_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'In an enhanced for-loop `for (Student s : students) { s.setMarks(95); }`, does this mutate the actual student records stored in the array?',
    options: [
      'No, because `s` is a primitive copy passed by value',
      'Yes, because `s` is a copy of the reference pointing to the identical heap object',
      'No, enhanced for-loops are strictly read-only and block all mutators',
      'Yes, but only if the array was declared as volatile',
    ],
    correctIndex: 1,
    explanation:
      'In an array of objects, the loop variable `s` receives a copy of the reference. Invoking mutators through `s` modifies the shared heap object directly.',
    hints: [
      'Is `s` a primitive or an object reference variable?',
      'Both `students[i]` and `s` hold memory addresses pointing to the same object on the heap.',
      'Calling mutator methods via a shared reference changes the original object.',
    ],
    misconceptionIndex: 0,
  },
  // Foundation: 2D Array Dimensions (c11_cs_022)
  {
    id: 'ch_02',
    nodeId: NODE_C11_CS_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'To compute matrix product C = A × B where Matrix A is 3 × 4, what MUST the dimensions of Matrix B be, and what will be the dimensions of C?',
    options: [
      'B must be 3 × 4; C will be 3 × 4',
      'B must be 4 × p (any column count p); C will be 3 × p',
      'B must be p × 3; C will be 4 × p',
      'B must be 4 × 3; C will be 4 × 4',
    ],
    correctIndex: 1,
    explanation:
      'Matrix multiplication requires columns of A (4) to equal rows of B (4). Resulting matrix C adopts rows of A (3) and columns of B (p).',
    hints: [
      'Remember the inner dimension matching rule: (m × n) multiplied by (n × p).',
      'The shared inner dimension is 4, which collapses during row-column dot products.',
      'Matrix B must have 4 rows, yielding a 3 × p result matrix.',
    ],
    misconceptionIndex: 1,
  },
  // Foundation: Sorting comparisons (c11_cs_023)
  {
    id: 'ch_03',
    nodeId: NODE_C11_CS_023,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    question:
      'Arrange the passes of Bubble Sort on array [82, 45, 91, 67, 29] into their correct sequential order.',
    sortItems: [
      'Pass 1 Result: [45, 82, 67, 29, 91]',
      'Pass 2 Result: [45, 67, 29, 82, 91]',
      'Pass 3 Result: [45, 29, 67, 82, 91]',
      'Pass 4 Result: [29, 45, 67, 82, 91]',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Each complete pass pushes the largest unsorted element to the rightmost boundary: 91 bubbles first, then 82, then 67, then 45.',
    hints: [
      'In Pass 1, 91 is compared against all neighbors and bubbles to the last index.',
      'In Pass 2, 82 moves to the second-last index.',
      'Notice how the sorted subarray grows from the right boundary inward.',
    ],
    misconceptionIndex: 2,
  },
  // Foundation: String Immutability vs StringBuffer (c11_cs_025)
  {
    id: 'ch_04',
    nodeId: NODE_C11_CS_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'What is the output of the following Java snippet?\nString city = "Kolkata";\ncity.concat(" Metro");\nSystem.out.println(city);',
    options: ['Kolkata Metro', 'Kolkata', 'Metro', 'NullPointerException'],
    correctIndex: 1,
    explanation:
      'String is immutable. The `concat()` method returns a newly created String object. Because the return value was not reassigned to `city`, `city` remains "Kolkata".',
    hints: [
      'Remember: String objects are carved in stone in memory.',
      '`city.concat(...)` produces a brand-new object in the heap that is discarded here.',
      'Without `city = city.concat(...)`, `city` continues pointing to its original string literal.',
    ],
    misconceptionIndex: 3,
  },
  // Foundation: Math Class Angles (c11_cs_027)
  {
    id: 'ch_05',
    nodeId: NODE_C11_CS_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Why does `double res = Math.sin(30);` return approximately -0.988 instead of 0.5 in Java?',
    options: [
      'Java uses degrees, but precision truncation alters the decimal',
      'Math.sin() expects the parameter angle in radians, not degrees',
      'The return type is double, which inverts negative quadrant signs',
      'Math.sin requires an explicit MathContext configuration',
    ],
    correctIndex: 1,
    explanation:
      'Java trigonometric methods (sin, cos, tan) interpret arguments as radians. To evaluate 30 degrees, one must use `Math.sin(Math.toRadians(30))`.',
    hints: [
      'Think about mathematical units in computer trigonometry libraries.',
      '30 is treated as 30 radians (~1718 degrees)!',
      'Use `Math.toRadians(30)` to convert before calling trigonometric methods.',
    ],
    misconceptionIndex: 4,
  },
  // Foundation: Exception Keywords (c11_cs_028)
  {
    id: 'ch_06',
    nodeId: NODE_C11_CS_028,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Drag each exception keyword to its matching architectural role in the Java runtime model.',
    dragItems: [
      { label: 'try', targetId: 'slot_guard' },
      { label: 'catch', targetId: 'slot_handler' },
      { label: 'finally', targetId: 'slot_cleanup' },
      { label: 'throw', targetId: 'slot_raise' },
    ],
    correctMapping: {
      slot_guard: 'try',
      slot_handler: 'catch',
      slot_cleanup: 'finally',
      slot_raise: 'throw',
    },
    explanation:
      '`try` defines the protected zone, `catch` handles specific exceptions, `finally` guarantees resource cleanup, and `throw` explicitly instantiates and dispatches an exception.',
    hints: [
      '`try` watches over the guarded code block.',
      '`catch` intercepts the thrown exception object.',
      '`finally` executes unconditionally for closing resources.',
    ],
  },
  // Foundation: Recursion Base Case (c11_cs_030)
  {
    id: 'ch_07',
    nodeId: NODE_C11_CS_030,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'What fatal runtime error occurs if a recursive Java method lacks a valid terminating base case?',
    options: [
      'NullPointerException',
      'StackOverflowError',
      'OutOfMemoryError: Java heap space',
      'ArithmeticException: infinite loop',
    ],
    correctIndex: 1,
    explanation:
      'Every recursive call pushes an activation frame onto the JVM call stack. Without a base case, calls chain endlessly until the thread stack is exhausted, triggering `StackOverflowError`.',
    hints: [
      'Where are active method frames, local variables, and return addresses stored during execution?',
      'The call stack has a finite size allocated per thread.',
      'Infinite self-calls overflow the call stack.',
    ],
  },

  // Standard: Binary Search Comparisons (c11_cs_024)
  {
    id: 'ch_08',
    nodeId: NODE_C11_CS_024,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Given a sorted array of 1024 unique ISC student roll numbers, what is the MAXIMUM number of comparisons binary search requires to find a key or determine absence?',
    correctAnswer: 11,
    tolerance: 1,
    unit: 'comparisons',
    explanation:
      'Binary search exhibits O(log2 N) complexity. For N = 1024, log2(1024) = 10, plus at most 1 final equality check when low equals high, making at most 11 comparisons.',
    hints: [
      'How many times can you divide 1024 by 2 before reaching 1 element?',
      '2^10 = 1024.',
      'Floor(log2(1024)) + 1 = 11 comparisons in the worst case.',
    ],
  },
  // Standard: Matrix Transpose Logic (c11_cs_022)
  {
    id: 'ch_09',
    nodeId: NODE_C11_CS_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'You are transposing a 2D array `int[][] M` of size 4 rows × 3 columns into `int[][] T`. What are the dimensions of `T` and the assignment formula inside nested loops?',
    options: [
      'T is 4 × 3; T[i][j] = M[i][j];',
      'T is 3 × 4; T[j][i] = M[i][j]; (or T[i][j] = M[j][i])',
      'T is 3 × 3; T[i][i] = M[i][i];',
      'T is 4 × 4; T[i][j] = M[j][i];',
    ],
    correctIndex: 1,
    explanation:
      'Transposition swaps rows and columns. A 4 × 3 matrix becomes 3 × 4. Element at row `i`, col `j` of `M` moves to row `j`, col `i` in `T`.',
    hints: [
      'If the original matrix has 4 rows and 3 columns, how many rows will the flipped matrix have?',
      'Row indices 0..3 become column indices 0..3.',
      '`T` must be sized `new int[3][4]`, populated by `T[j][i] = M[i][j]`.',
    ],
  },
  // Standard: String Tokenizing and Parsing (c11_cs_026)
  {
    id: 'ch_10',
    nodeId: NODE_C11_CS_026,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Assemble the Java statement sequence to tokenize a CSV line `"Aarav,88,94"` and extract the first test mark as an `int`.',
    availableParts: [
      'String[] parts = line.split(",");',
      'int m1 = Integer.parseInt(parts[1]);',
      'String[] parts = line.split(";");',
      'int m1 = parts[1].toInt();',
    ],
    targetState: 'String[] parts = line.split(","); int m1 = Integer.parseInt(parts[1]);',
    validationHint:
      'Split by comma delimiter, then use static `Integer.parseInt()` on index 1.',
    explanation:
      '`line.split(",")` yields `["Aarav", "88", "94"]`. Index 1 contains `"88"`, which is parsed to primitive int using `Integer.parseInt(parts[1])`.',
    hints: [
      'The delimiter between tokens in `"Aarav,88,94"` is a comma `,`.',
      'Array indices are zero-based: parts[0] is `"Aarav"`, parts[1] is `"88"`.',
      'In Java, string to int conversion uses `Integer.parseInt()`.',
    ],
  },
  // Standard: Math Ceiling vs Floor Negatives (c11_cs_027)
  {
    id: 'ch_11',
    nodeId: NODE_C11_CS_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'What are the exact evaluated values of `Math.ceil(-3.7)` and `Math.floor(-3.7)` in Java?',
    options: [
      'ceil = -4.0, floor = -3.0',
      'ceil = -3.0, floor = -4.0',
      'ceil = -3.0, floor = -3.0',
      'ceil = -4.0, floor = -4.0',
    ],
    correctIndex: 1,
    explanation:
      'Ceiling returns the smallest whole double ≥ argument (moves right on the number line: -3.0). Floor returns the largest whole double ≤ argument (moves left: -4.0).',
    hints: [
      'Visualize the number line: -4.0 is to the left of -3.7, and -3.0 is to the right.',
      'Ceiling moves towards positive infinity.',
      'Floor moves towards negative infinity.',
    ],
    misconceptionIndex: 4,
  },
  // Standard: Checked vs Unchecked Custom Exceptions (c11_cs_029)
  {
    id: 'ch_12',
    nodeId: NODE_C11_CS_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'A banking portal requires that any `OverdraftExceededException` MUST be checked at compile-time by all calling methods. How must this class be declared?',
    options: [
      'public class OverdraftExceededException extends RuntimeException',
      'public class OverdraftExceededException extends Exception',
      'public class OverdraftExceededException implements Throwable',
      'public class OverdraftExceededException extends Error',
    ],
    correctIndex: 1,
    explanation:
      'Direct subclasses of `Exception` (that do not extend `RuntimeException`) are checked exceptions. The Java compiler enforces either a `try-catch` block or a `throws` declaration.',
    hints: [
      'Does `RuntimeException` create checked or unchecked exceptions?',
      'Subclasses of `RuntimeException` are unchecked.',
      'Directly extending `java.lang.Exception` enforces compile-time checking.',
    ],
  },
  // Standard: Euclid GCD Recursion (c11_cs_030)
  {
    id: 'ch_13',
    nodeId: NODE_C11_CS_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Trace `gcd(48, 18)` where `gcd(a, b)` returns `b == 0 ? a : gcd(b, a % b)`. How many total recursive method invocations occur (including the initial call)?',
    correctAnswer: 4,
    tolerance: 0,
    unit: 'calls',
    explanation:
      'Call 1: gcd(48, 18) -> Call 2: gcd(18, 12) -> Call 3: gcd(12, 6) -> Call 4: gcd(6, 0) which hits base case and returns 6. Total = 4 calls.',
    hints: [
      '48 % 18 = 12.',
      '18 % 12 = 6.',
      '12 % 6 = 0 -> hits base case b == 0!',
    ],
  },
  // Standard: Selection Sort Swap Count (c11_cs_023)
  {
    id: 'ch_14',
    nodeId: NODE_C11_CS_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question:
      'Why is Selection Sort preferred over Bubble Sort when write operations (memory swaps) to flash storage are extremely slow and expensive?',
    options: [
      'Selection Sort has O(N log N) comparison complexity',
      'Selection Sort makes at most O(N) swaps (at most 1 swap per pass), whereas Bubble Sort can make O(N²) swaps',
      'Selection Sort does not require a temporary variable for swapping',
      'Selection Sort executes on multiple threads concurrently',
    ],
    correctIndex: 1,
    explanation:
      'Selection Sort scans the unsorted subarray to find the minimum element and performs at most 1 swap per outer pass (O(N) swaps total). Bubble sort can swap on every comparison.',
    hints: [
      'How many swaps does selection sort perform in each outer pass?',
      'It locates the minimum first, then swaps only once.',
      'Total swaps for selection sort is strictly bounded by N - 1.',
    ],
  },

  // Advanced: Catch Block Hierarchy Order (c11_cs_028)
  {
    id: 'ch_15',
    nodeId: NODE_C11_CS_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Why does placing `catch (Exception e)` BEFORE `catch (ArithmeticException ae)` result in a compile-time error in Java?',
    options: [
      'Exception is an interface and cannot be instantiated in catch blocks',
      'ArithmeticException becomes unreachable code because the superclass Exception intercepts all subtype instances',
      'Java requires catch blocks to be alphabetically ordered',
      'ArithmeticException must be caught in a separate method',
    ],
    correctIndex: 1,
    explanation:
      'In Java inheritance, `ArithmeticException` is a subclass of `Exception`. A general handler placed first catches all instances, making subsequent subclass catch blocks dead/unreachable code.',
    hints: [
      'Consider the class hierarchy: Exception is the ancestor of ArithmeticException.',
      'Will control ever reach the second catch block?',
      'Java forbids unreachable statements as a compile-time fatal error.',
    ],
  },
  // Advanced: Matrix Multiplication Algorithm (c11_cs_022)
  {
    id: 'ch_16',
    nodeId: NODE_C11_CS_022,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'Build the correct 3-nested-loop accumulator statement for Matrix Multiplication `C[i][j]` from matrices `A[m][n]` and `B[n][p]`.',
    availableParts: [
      'sum += A[i][k] * B[k][j];',
      'sum += A[k][i] * B[j][k];',
      'C[i][j] = sum;',
      'sum += A[i][j] * B[i][j];',
    ],
    targetState: 'sum += A[i][k] * B[k][j]; C[i][j] = sum;',
    validationHint:
      'Accumulate dot product across shared dimension k, then store in C[i][j].',
    explanation:
      'The dot product of row `i` of Matrix A and column `j` of Matrix B is computed by iterating `k` from 0 to n-1: `sum += A[i][k] * B[k][j];` and finally writing `C[i][j] = sum;`.',
    hints: [
      'Row index `i` is fixed for Matrix A, Column index `j` is fixed for Matrix B.',
      'The inner index `k` traverses columns of A and rows of B simultaneously.',
      'Assign the accumulated sum into `C[i][j]`.',
    ],
  },
  // Advanced: String compareTo() return semantics (c11_cs_025)
  {
    id: 'ch_17',
    nodeId: NODE_C11_CS_025,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'What integer value is returned by `"Delhi".compareTo("Dehradun")` in Java? (Based on Unicode ASCII difference of first mismatching char)',
    correctAnswer: 4,
    tolerance: 0,
    unit: 'ASCII diff',
    explanation:
      'Both start with "De". The 3rd character in "Delhi" is \'l\' (ASCII 108) and in "Dehradun" is \'h\' (ASCII 104). The difference is 108 - 104 = +4.',
    hints: [
      'Characters match at index 0 (\'D\') and index 1 (\'e\').',
      'Compare index 2: \'l\' vs \'h\'.',
      'ASCII(\'l\') = 108, ASCII(\'h\') = 104. Value is 108 - 104 = 4.',
    ],
  },
  // Advanced: User Defined Exception Constructor Architecture (c11_cs_029)
  {
    id: 'ch_18',
    nodeId: NODE_C11_CS_029,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'Assemble a complete custom checked exception class `InvalidVoterException` with a message constructor.',
    availableParts: [
      'class InvalidVoterException extends Exception {',
      'public InvalidVoterException(String msg) { super(msg); }',
      '}',
      'class InvalidVoterException extends RuntimeException {',
    ],
    targetState:
      'class InvalidVoterException extends Exception { public InvalidVoterException(String msg) { super(msg); } }',
    validationHint:
      'Extend Exception for checked behavior and delegate string message using super(msg).',
    explanation:
      'Custom checked exceptions extend `java.lang.Exception` and forward the error message string to `super(msg)` so that `e.getMessage()` and stack traces preserve diagnostic information.',
    hints: [
      'Checked exceptions must extend `Exception`.',
      'The constructor accepts a `String msg`.',
      '`super(msg)` calls the parent Exception constructor.',
    ],
  },
  // Advanced: Fibonacci Call Tree Complexity (c11_cs_030)
  {
    id: 'ch_19',
    nodeId: NODE_C11_CS_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Why is naive recursive `fib(n) = fib(n-1) + fib(n-2)` with base cases fib(0)=0, fib(1)=1 considered dangerous for n = 50 in production systems?',
    options: [
      'It triggers ArithmeticException due to 64-bit integer overflow',
      'It creates an O(2^N) exponential call tree, recomputing redundant overlapping subproblems trillions of times',
      'Java limits method names to single recursive calls',
      'The JVM compiler refuses to compile double self-calls',
    ],
    correctIndex: 1,
    explanation:
      'Binary branching recursion creates an exponential O(2^N) execution tree. For n=50, it would perform over 10^14 redundant method calls, taking hours or crashing the thread stack.',
    hints: [
      'Draw the call tree for fib(5): how many times is fib(2) called?',
      'Each call branches into two more calls.',
      'Branching factor of 2 leads to 2^N growth.',
    ],
  },
  // Advanced: String.format specifiers (c11_cs_026)
  {
    id: 'ch_20',
    nodeId: NODE_C11_CS_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'Which format string produces a 15-character LEFT-ALIGNED student name, 5-character right-aligned roll number, and marks with 2 decimal places?',
    options: [
      '"%15s %5d %f"',
      '"%-15s %5d %.2f%n"',
      '"%s:15 %d:5 %2.f"',
      '"%-15string %5int %.2double"',
    ],
    correctIndex: 1,
    explanation:
      '`%-15s` left-aligns string in 15 spaces (minus sign denotes left alignment), `%5d` right-aligns integer in 5 spaces, `%.2f` rounds floating point to 2 decimals, `%n` creates a platform-independent newline.',
    hints: [
      'The `-` flag denotes left-alignment in format specifiers.',
      '`%d` is for integers, `%.2f` formats 2 decimal places.',
      '`%n` is the portable line separator.',
    ],
  },
  // Advanced: Method Array Reference Mutation (c11_cs_021)
  {
    id: 'ch_21',
    nodeId: NODE_C11_CS_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Method `void modify(int[] a) { a = new int[]{99, 100}; }` is called with `marks = new int[]{10, 20}`. What does `marks[0]` contain after the method returns?',
    options: [
      '99, because arrays in Java are passed by reference',
      '10, because the parameter `a` was reassigned locally to a new heap object without changing the caller\'s reference',
      '0, because reallocating arrays nullifies the source memory',
      'Compilation fails: cannot reassign array parameters',
    ],
    correctIndex: 1,
    explanation:
      'Java is strictly pass-by-value. The method receives a copy of the reference. Reassigning `a` points the local copy to a new array, leaving the caller\'s `marks` reference untouched.',
    hints: [
      'Did the method change an element inside `a[i]`, or did it overwrite the pointer `a` itself?',
      'Reassigning the parameter variable only changes the local copy of the pointer.',
      'The caller\'s original array remains at its original memory address.',
    ],
  },
  // Advanced: Insertion Sort Invariants (c11_cs_023)
  {
    id: 'ch_22',
    nodeId: NODE_C11_CS_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'What is the best-case time complexity of Insertion Sort on an array that is ALREADY sorted in ascending order?',
    options: [
      'O(N²) because both nested loops always run to completion',
      'O(N) because the inner while-loop comparison fails immediately on first check without shifting',
      'O(N log N) using binary search insertion points',
      'O(1) because no operations are needed',
    ],
    correctIndex: 1,
    explanation:
      'For an already sorted array, each element is compared once with its immediate left predecessor and stops immediately without any shifts, yielding linear O(N) time.',
    hints: [
      'In insertion sort, when does the inner shift loop terminate?',
      'If arr[j] is not greater than the key, the inner loop breaks immediately.',
      'N-1 single comparisons are made -> O(N) runtime.',
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
  nodeId: NODE_C11_CS_021,
  title: 'Java Advanced Arrays, Strings, Math, Exceptions & Recursion',
  definition:
    'Mastery of Class 11 ISC Computer Science core architectures: multi-stage heap allocation of object arrays, 2D matrix transformations, algorithmic sorting and searching paradigms, String vs StringBuffer memory mutability, robust exception hierarchies, and recursive call-stack execution models.',
  eli5:
    'Think of Java programming like running a school: arrays of objects are rows of student lockers waiting for student boxes; 2D arrays are classroom seating charts; sorting and searching organize student roll numbers; Strings are printed certificates while StringBuffer is a reusable blackboard; exceptions are fire alarms with safety drills; and recursion is opening nested Russian dolls until you reach the base prize.',
  misconceptions: [
    {
      misconception: 'Declaring `Student[] arr = new Student[5];` constructs 5 Student objects.',
      correction:
        'The first `new` creates 1 array object containing 5 null references. Each individual student must be constructed with `arr[i] = new Student(...)`.',
    },
    {
      misconception: 'Matrix multiplication can be performed between any two matrices of identical size.',
      correction:
        'Matrix addition requires identical dimensions (m × n with m × n). Matrix multiplication requires inner dimensions to match (m × n with n × p).',
    },
    {
      misconception: 'Selection sort and Bubble sort perform the same number of array swaps.',
      correction:
        'Bubble sort can perform up to O(N²) swaps per pass. Selection sort performs at most 1 swap per pass (O(N) total swaps).',
    },
    {
      misconception: 'String methods like `replace()` or `toUpperCase()` alter the string in place.',
      correction:
        'Strings are immutable. All String transformation methods return a brand new String object leaving the original unchanged.',
    },
    {
      misconception: 'Math.ceil(-2.3) rounds to -3.0 because 3 is larger in magnitude than 2.',
      correction:
        'Ceiling moves towards positive infinity. On the number line, -2.0 is greater than -2.3, so `Math.ceil(-2.3)` returns `-2.0`.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is stored in elements of `Student[] s = new Student[3]` before initialization?',
      options: ['0', 'null', 'Empty Student instance', 'Garbage memory'],
      correctIndex: 1,
    },
    {
      question: 'Which method returns the length of a 1D Java array `arr`?',
      options: ['arr.length()', 'arr.length', 'arr.size()', 'arr.capacity()'],
      correctIndex: 1,
    },
    {
      question: 'What is the worst-case time complexity of Binary Search?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
      correctIndex: 1,
    },
    {
      question: 'Which class is mutable and designed for heavy concatenation?',
      options: ['String', 'StringBuffer', 'Character', 'Scanner'],
      correctIndex: 1,
    },
    {
      question: 'Which block in a try-catch construct is guaranteed to execute?',
      options: ['try', 'catch', 'finally', 'throw'],
      correctIndex: 2,
    },
    {
      question: 'What keyword connects a custom checked exception class to Java’s hierarchy?',
      options: ['implements Exception', 'extends Exception', 'throws Exception', 'uses Exception'],
      correctIndex: 1,
    },
    {
      question: 'What stopping condition must every recursive method contain?',
      options: ['Loop break', 'Base case', 'Thread sleep', 'Null pointer check'],
      correctIndex: 1,
    },
    {
      question: 'What does `Math.floor(4.9)` return?',
      options: ['5.0', '4.0', '4', '4.9'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Demonstrate flawless multi-stage object allocation, matrix arithmetic, logarithmic search tracing, string tokenization, checked exception design, and recursive stack simulation with >80% accuracy.',
};

// ─── INTERACTIVE EXPLORATION LABS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Object Array Heap Allocator',
    instruction:
      'Click each null reference slot to allocate a real Student object in heap memory. Observe how pointer addresses connect.',
    interactionType: 'allocate-heap',
    nodeId: NODE_C11_CS_021,
  },
  {
    title: 'Lab 2: 2D Matrix Dot-Product Engine',
    instruction:
      'Click on any result cell C[i][j] to watch real-time row-by-column dot product accumulation with memory dimension mapping.',
    interactionType: 'matrix-multiply',
    nodeId: NODE_C11_CS_022,
  },
  {
    title: 'Lab 3: Sorting & Searching Visualizer',
    instruction:
      'Step through Bubble vs Selection sort passes and trace Binary Search midpoint eliminations on sorted arrays.',
    interactionType: 'sort-search',
    nodeId: NODE_C11_CS_023,
  },
  {
    title: 'Lab 4: String vs StringBuffer Mutability',
    instruction:
      'Click suffix buttons to append text. Observe how String spawns new heap objects while StringBuffer mutates in-place.',
    interactionType: 'string-mutator',
    nodeId: NODE_C11_CS_025,
  },
  {
    title: 'Lab 5: Recursive Call Stack Unwinder',
    instruction:
      'Set N for Factorial. Step forward to push stack activation frames, hit the base case, and watch the stack unwind returned values.',
    interactionType: 'recursion-stack',
    nodeId: NODE_C11_CS_030,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: If you invoke `sb.append(" ISC")` on `StringBuffer sb = new StringBuffer("Class 11");`, will `sb.hashCode()` memory address change?',
    options: [
      'Yes, Java allocates a brand new StringBuffer object in heap',
      'No, the exact same StringBuffer instance mutates its internal char array',
      'Yes, but only if capacity exceeds 16 characters',
      'No, but the old string remains in the String Constant Pool',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Test this in Lab 4 by appending characters and monitoring the StringBuffer Object ID!',
  },
  {
    question:
      'Predict: In Binary Search for key 47 in [10, 25, 36, 47, 58, 69, 70, 81, 94, 100], which midpoint index is checked FIRST?',
    options: [
      'Index 0 (value 10)',
      'Index 4 (value 58)',
      'Index 5 (value 69)',
      'Index 9 (value 100)',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Low = 0, High = 9 -> Mid = (0 + 9) / 2 = 4 (value 58). Observe the high pointer contract to mid-1 in the visualizer!',
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question:
      'What happens to the Call Stack height as recursive `factorial(5)` executes before any values return?',
    observableOptions: [
      'Stack height stays constant at 1 frame',
      'Stack frames grow from factorial(5) down to factorial(0) before unwinding upwards',
      'Stack frames are immediately cleared after each multiplication',
      'Heap memory overflows while stack remains empty',
    ],
    correctIndex: 1,
  },
  {
    question:
      'In 2D Matrix Multiplication, what happens if columns of Matrix A do not equal rows of Matrix B?',
    observableOptions: [
      'The engine automatically pads with zeros',
      'The dot product is mathematically undefined and throws ArrayIndexOutOfBoundsException in loops',
      'Matrix B is automatically transposed',
      'The operation converts into scalar addition',
    ],
    correctIndex: 1,
  },
];

// ─── REAL WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISC Board Examination Portal Architecture',
  description:
    'Design a complete backend module for CISCE that parses 50,000 student result CSV strings, validates marks against custom `InvalidMarksException`, sorts roll numbers via Binary Insertion Sort, and computes school-level matrix statistics.',
  steps: [
    'Define class Student with rollNo, name, marks[] and grade computed via Math class methods.',
    'Implement a two-stage object array allocator for 50 student batches.',
    'Tokenize CSV records using `line.split(",")` and format tabular output using `String.format("%-15s %8d %6.2f%n")`.',
    'Wrap grade computations in try-catch-finally handling `InvalidMarksException`.',
    'Write recursive method `calcMeritRank(Student[] s, int index)` to compute state percentiles.',
  ],
};

// ─── MAIN COMPONENT FUNCTION ───
function C11_ComputerScienceJavaArraysAdvancedSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // Config & Subject details
  const subjectConfig = SUBJECT_CONFIG['compsci'] || {
    name: 'Computer Science',
    emoji: '💻',
    color: 'emerald',
  };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org pattern state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Adaptive Difficulty & BKT
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

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Misconceptions tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Challenge Sub-states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Interactive Labs State
  // Lab 1: Array of Objects Heap Allocator
  const [allocatedSlots, setAllocatedSlots] = useState<boolean[]>([true, false, false, false, false]);
  const [studentNames] = useState<string[]>(['Aarav', 'Priya', 'Kabir', 'Riya', 'Neha']);
  const [selectedLockerIndex, setSelectedLockerIndex] = useState<number | null>(0);

  // Lab 2: Matrix Operations
  const [activeMatrixCell, setActiveMatrixCell] = useState<{ r: number; c: number } | null>({ r: 0, c: 0 });

  // Lab 3: Sort & Search Visualizer
  const [sortArray, setSortArray] = useState<number[]>([64, 25, 12, 22, 11]);
  const [sortingAlgorithm, setSortingAlgorithm] = useState<'bubble' | 'selection' | 'insertion'>('bubble');
  const [sortPass, setSortPass] = useState(0);
  const [searchKey] = useState(22);
  const [binarySearchLow, setBinarySearchLow] = useState(0);
  const [binarySearchHigh, setBinarySearchHigh] = useState(4);
  const [binarySearchMid, setBinarySearchMid] = useState(2);
  const [searchFound, setSearchFound] = useState<boolean | null>(null);

  // Lab 4: String vs StringBuffer
  const [inputStringText, setInputStringText] = useState('Kolkata');
  const [inputBufferText, setInputBufferText] = useState('Kolkata');
  const [stringObjectCount, setStringObjectCount] = useState(1);
  const [stringLog, setStringLog] = useState<string[]>(['Created String@0x101: "Kolkata"']);
  const [bufferLog, setBufferLog] = useState<string[]>(['Created StringBuffer@0x888: "Kolkata"']);

  // Lab 5: Recursion Stack Unwinder
  const [recursionN] = useState(4);
  const [callStackFrames, setCallStackFrames] = useState<{ n: number; val?: number; state: 'calling' | 'returned' }[]>([]);
  const [recursionStep, setRecursionStep] = useState(0);
  const [recursionFinished, setRecursionFinished] = useState(false);

  // Sandbox Live Variables
  const [sandboxAngleDeg, setSandboxAngleDeg] = useState(30);
  const [sandboxRoundVal, setSandboxRoundVal] = useState(-3.7);
  const [sandboxCustomExceptionMsg, setSandboxCustomExceptionMsg] = useState('Invalid roll number entered!');
  const [sandboxTryCatchTriggered, setSandboxTryCatchTriggered] = useState(false);

  // Reflection Responses
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');

  // Canvas ref for sorting & memory animation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Filter challenges by difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load Initial Mastery on Mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C11_CS_021);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adaptive Difficulty Update
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Canvas 2D Animation Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / (sortArray.length || 5);
      sortArray.forEach((val, idx) => {
        const height = (val / 100) * (canvas.height - 25);
        const isMid = idx === binarySearchMid && currentSlide === 2;
        ctx.fillStyle = isMid ? '#10b981' : '#6366f1';
        ctx.fillRect(idx * barWidth + 6, canvas.height - height - 15, barWidth - 12, height);

        ctx.fillStyle = '#ffffff';
        ctx.font = '10px monospace';
        ctx.fillText(String(val), idx * barWidth + barWidth / 2 - 8, canvas.height - 4);
      });

      ctx.beginPath();
      ctx.arc(
        (Math.sin(tick * 0.04) * 0.5 + 0.5) * canvas.width,
        12 + Math.cos(tick * 0.06) * 4,
        4,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [sortArray, binarySearchMid, currentSlide]);

  // Next Hint Handler
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  // Discovery Answer Handler
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Spot on! The array holds only null references until objects are constructed.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  // Phase Navigation
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive labs. Let us build Java architectures together.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test real-time calculations and mutations in the sandbox.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Put your Class 11 Java skills to the test!');
  }, []);

  // Predict-then-Check
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive controls to verify.');
  }, []);

  // Complete Simulation
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have mastered Class 11 Advanced Java concepts.');
  }, [errors, onComplete]);

  // Next Challenge Handler
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
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // Inactivity Auto-hint Timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Answer Evaluation Handler
  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
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
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent Java execution.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (
          challenge.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(challenge.misconceptionIndex)
        ) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the step-by-step Java solution.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  // Drag & Drop Handlers
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isMatch) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  // Drag Sort Reordering
  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        let arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  // Interactive Lab 1: Allocate Student Object Locker
  const handleAllocateLocker = useCallback((idx: number) => {
    setAllocatedSlots((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
    setSelectedLockerIndex(idx);
    audioManager.play('pop');
    speechManager.speak(
      allocatedSlots[idx]
        ? `Locker ${idx} deallocated to null.`
        : `Allocated new Student("${studentNames[idx]}", 10${idx + 1}) on heap!`
    );
  }, [allocatedSlots, studentNames]);

  // Interactive Lab 3: Step Sorting & Searching
  const handleSortStep = useCallback(() => {
    audioManager.play('count');
    setSortArray((prev) => {
      const arr = [...prev];
      if (sortingAlgorithm === 'bubble') {
        for (let i = 0; i < arr.length - 1; i++) {
          if (arr[i] > arr[i + 1]) {
            const temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
            break;
          }
        }
      } else if (sortingAlgorithm === 'selection') {
        let minIdx = sortPass;
        for (let j = sortPass + 1; j < arr.length; j++) {
          if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx !== sortPass) {
          const t = arr[sortPass];
          arr[sortPass] = arr[minIdx];
          arr[minIdx] = t;
        }
      }
      return arr;
    });
    setSortPass((p) => p + 1);
  }, [sortingAlgorithm, sortPass]);

  const handleBinarySearchStep = useCallback(() => {
    audioManager.play('count');
    if (binarySearchLow <= binarySearchHigh) {
      const mid = Math.floor((binarySearchLow + binarySearchHigh) / 2);
      setBinarySearchMid(mid);
      const val = sortArray[mid];

      if (val === searchKey) {
        setSearchFound(true);
        audioManager.play('success');
        speechManager.speak(`Key ${searchKey} found at index ${mid}!`);
      } else if (val < searchKey) {
        setBinarySearchLow(mid + 1);
        speechManager.speak(`${val} < ${searchKey}, eliminating left half. Low becomes ${mid + 1}.`);
      } else {
        setBinarySearchHigh(mid - 1);
        speechManager.speak(`${val} > ${searchKey}, eliminating right half. High becomes ${mid - 1}.`);
      }
    } else {
      setSearchFound(false);
      audioManager.play('error');
      speechManager.speak(`Key ${searchKey} not present in array.`);
    }
  }, [binarySearchLow, binarySearchHigh, sortArray, searchKey]);

  // Interactive Lab 4: String vs StringBuffer Mutator
  const handleStringAppend = useCallback(
    (suffix: string) => {
      audioManager.play('tap');
      const newStr = inputStringText + suffix;
      setInputStringText(newStr);
      setStringObjectCount((c) => c + 1);
      setStringLog((prev) => [
        `new String@0x${101 + stringObjectCount} ("${newStr}") created`,
        ...prev.slice(0, 3),
      ]);

      const newBuf = inputBufferText + suffix;
      setInputBufferText(newBuf);
      setBufferLog((prev) => [
        `StringBuffer@0x888 appended "${suffix}" in-place (Len: ${newBuf.length})`,
        ...prev.slice(0, 3),
      ]);
    },
    [inputStringText, inputBufferText, stringObjectCount]
  );

  // Interactive Lab 5: Step Recursion Call Stack
  const handleRecursionStep = useCallback(() => {
    audioManager.play('pop');
    if (recursionStep <= recursionN) {
      const currentCallN = recursionN - recursionStep;
      setCallStackFrames((prev) => [
        { n: currentCallN, state: 'calling' },
        ...prev,
      ]);
      setRecursionStep((s) => s + 1);
      speechManager.speak(`Pushed factorial(${currentCallN}) onto call stack.`);
    } else {
      setRecursionFinished(true);
      audioManager.play('drop-correct');
      speechManager.speak('Base case hit at factorial(0)=1! Unwinding return values.');
    }
  }, [recursionStep, recursionN]);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gold-600/20 border border-gold-500/30 flex items-center justify-center text-2xl shadow-inner"
            aria-label="Computer Science Icon"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-gold-900/60 text-gold-300 border border-gold-700/50">
                ISC Class 11
              </span>
              <span className="text-xs text-slate-400 font-mono">10 Nodes Capstone</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800" role="tablist" aria-label="Simulation Phases">
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
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-gold-600 text-white shadow-md shadow-gold-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.section
          key="discovery"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          {/* Narrative Scenario Box */}
          <motion.div
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-900 border border-gold-800/50 shadow-xl"
          >
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm tracking-wide uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              Mission Briefing
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 text-xs sm:text-sm text-gold-200 font-mono">
              ⚡ {SCENARIO.context}
            </div>
          </motion.div>

          {/* Curiosity Diagnostic Hook */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg">
            <h3 className="text-lg font-bold text-amber-300 mb-2 flex items-center gap-2">
              <span>🤔</span> Discovery Challenge: Memory Allocation Trap
            </h3>
            <p className="text-white text-base font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-gold-500'
                  }`}
                >
                  <span className="font-mono text-xs text-gold-400 mr-2">[{String.fromCharCode(65 + i)}]</span>
                  {discoveryAnswered && (
                    <span className="mr-1.5 font-bold">
                      {i === DISCOVERY_QUESTION.correctIndex ? '✓' : '✗'}
                    </span>
                  )}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div>
                  <p
                    className={`text-sm font-semibold flex items-center gap-1.5 ${
                      discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    <span>{discoveryCorrect ? '✓' : '💡'}</span>
                    <span>{discoveryCorrect ? 'Spot on! Java uses a two-stage construction model.' : 'Key Discovery:'}</span>
                  </p>
                  <p className="text-xs text-slate-300 mt-1">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Visual Labs"
                  className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-600/30 whitespace-nowrap"
                >
                  Enter Visual Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION LABS ─── */}
      {phase === 'explore' && (
        <motion.section
          key="explore"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Lab Step Controller */}
          <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                aria-label="Previous Interactive Lab"
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold disabled:opacity-40"
              >
                ← Prev
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) {
                    setCurrentSlide((s) => s + 1);
                    audioManager.play('whoosh');
                  } else {
                    handleAdvanceToSandbox();
                  }
                }}
                aria-label="Next Interactive Lab or Launch Sandbox"
                className="px-4 py-1.5 rounded-xl bg-gold-600 text-white text-xs font-bold shadow-md shadow-gold-600/30"
              >
                {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Lab →' : 'Launch Sandbox 🚀'}
              </motion.button>
            </div>
          </div>

          <p className="text-sm font-medium text-amber-300/90 bg-amber-950/30 p-3 rounded-xl border border-amber-800/40">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* ─── LAB 1: OBJECT ARRAY HEAP VISUALIZER (SVG Diagram 1) ─── */}
          {currentSlide === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gold-400">Memory Diagram: Student[] students = new Student[5];</span>
                <span className="text-xs text-slate-400 font-mono">
                  Allocated Objects: {allocatedSlots.filter(Boolean).length} / 5
                </span>
              </div>

              {/* Memory Lockers SVG Diagram 1 */}
              <svg viewBox="0 0 600 200" className="w-full bg-slate-950 rounded-xl p-2 border border-slate-800" role="img" aria-label="Object Array Heap Memory Layout Diagram">
                <defs>
                  <marker id="arrow1" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                  </marker>
                </defs>
                <rect x="20" y="60" width="100" height="80" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="70" y="90" textAnchor="middle" fill="#818cf8" fontSize="11" fontWeight="bold">Stack Ref</text>
                <text x="70" y="110" textAnchor="middle" fill="#c7d2fe" fontSize="10">students</text>
                <line x1="120" y1="100" x2="160" y2="100" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow1)" />

                <rect x="160" y="30" width="410" height="140" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                <text x="180" y="50" fill="#94a3b8" fontSize="10" fontWeight="bold">Heap: Student[] (Size: 5)</text>

                {[0, 1, 2, 3, 4].map((i) => {
                  const x = 180 + i * 76;
                  const isAllocated = allocatedSlots[i];
                  return (
                    <g
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Locker slot ${i}, status: ${isAllocated ? 'Allocated' : 'null'}`}
                      onClick={() => handleAllocateLocker(i)}
                      className="cursor-pointer transition-transform hover:scale-105"
                    >
                      <rect
                        x={x}
                        y="70"
                        width="68"
                        height="75"
                        rx="6"
                        fill={isAllocated ? '#064e3b' : '#1e293b'}
                        stroke={isAllocated ? '#10b981' : '#475569'}
                        strokeWidth={selectedLockerIndex === i ? 2.5 : 1}
                      />
                      <text x={x + 34} y="90" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                        [{i}]
                      </text>
                      <text
                        x={x + 34}
                        y="110"
                        textAnchor="middle"
                        fill={isAllocated ? '#34d399' : '#f87171'}
                        fontSize="11"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {isAllocated ? `✓ @0x${100 + i}` : '✗ null'}
                      </text>
                      <text x={x + 34} y="130" textAnchor="middle" fill="#e2e8f0" fontSize="9">
                        {isAllocated ? studentNames[i] : 'Empty'}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Code Walkthrough Terminal */}
              <div className="p-4 bg-slate-950 rounded-xl font-mono text-xs text-slate-300 border border-slate-800">
                <p className="text-gold-400">// Java Code Representation</p>
                <p>Student[] students = new Student[5]; <span className="text-slate-500">// Step 1: Allocates 5 null slots</span></p>
                {allocatedSlots.map((isAlloc, idx) =>
                  isAlloc ? (
                    <p key={idx} className="text-emerald-400">
                      ✓ students[{idx}] = new Student("{studentNames[idx]}", 10{idx + 1});{' '}
                      <span className="text-slate-500">// Step 2: Constructed!</span>
                    </p>
                  ) : null
                )}
                {allocatedSlots.some((s) => !s) && (
                  <p className="text-rose-400 mt-1">
                    ✗ ⚠ Warning: Calling students[{allocatedSlots.indexOf(false)}].getMarks() triggers NullPointerException!
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* ─── LAB 2: 2D MATRIX MULTIPLICATION (SVG Diagram 2) ─── */}
          {currentSlide === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              {/* Matrix Dimensions Flow SVG Diagram 2 */}
              <svg viewBox="0 0 600 120" className="w-full bg-slate-950 rounded-xl p-2 border border-slate-800" role="img" aria-label="Matrix Dimension Matching Rule SVG Diagram">
                <rect x="30" y="25" width="130" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="95" y="55" textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="bold">Matrix A</text>
                <text x="95" y="75" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontFamily="monospace">2 rows × 3 cols</text>

                <text x="185" y="65" textAnchor="middle" fill="#f59e0b" fontSize="18" fontWeight="bold">×</text>

                <rect x="210" y="25" width="130" height="70" rx="8" fill="#2e1065" stroke="#a855f7" strokeWidth="2" />
                <text x="275" y="55" textAnchor="middle" fill="#c084fc" fontSize="12" fontWeight="bold">Matrix B</text>
                <text x="275" y="75" textAnchor="middle" fill="#e9d5ff" fontSize="11" fontFamily="monospace">3 rows × 2 cols</text>

                <text x="365" y="65" textAnchor="middle" fill="#10b981" fontSize="18" fontWeight="bold">=</text>

                <rect x="390" y="25" width="170" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="475" y="55" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Result C</text>
                <text x="475" y="75" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontFamily="monospace">2 rows × 2 cols (Dot Product)</text>
              </svg>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Matrix A Box */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-mono text-gold-400 font-bold mb-2">Matrix A (2 × 3)</h4>
                  <div className="grid grid-cols-3 gap-2 text-center font-mono text-sm">
                    {[[2, 4, 1], [3, 1, 5]].map((row, r) =>
                      row.map((val, c) => (
                        <div
                          key={`${r}-${c}`}
                          className={`p-2 rounded border ${
                            activeMatrixCell?.r === r
                              ? 'bg-gold-950 border-gold-500 text-gold-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          {val}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Matrix B Box */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-mono text-gold-400 font-bold mb-2">Matrix B (3 × 2)</h4>
                  <div className="grid grid-cols-2 gap-2 text-center font-mono text-sm">
                    {[[1, 2], [3, 0], [4, 1]].map((row, r) =>
                      row.map((val, c) => (
                        <div
                          key={`${r}-${c}`}
                          className={`p-2 rounded border ${
                            activeMatrixCell?.c === c
                              ? 'bg-purple-950 border-purple-500 text-purple-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          {val}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Result Matrix C Box */}
                <div className="p-4 bg-slate-950 rounded-xl border border-emerald-900/50">
                  <h4 className="text-xs font-mono text-emerald-400 font-bold mb-2">Result C = A × B (2 × 2)</h4>
                  <div className="grid grid-cols-2 gap-2 text-center font-mono text-sm font-bold">
                    {[[18, 5], [26, 11]].map((row, r) =>
                      row.map((val, c) => (
                        <motion.div
                          key={`${r}-${c}`}
                          role="button"
                          tabIndex={0}
                          aria-label={`Result cell C ${r} ${c}, value: ${val}`}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => {
                            setActiveMatrixCell({ r, c });
                            audioManager.play('tap');
                          }}
                          className={`p-3 rounded-lg border cursor-pointer ${
                            activeMatrixCell?.r === r && activeMatrixCell?.c === c
                              ? 'bg-emerald-900/80 border-emerald-400 text-emerald-100 shadow-md'
                              : 'bg-slate-900 border-slate-800 text-slate-300'
                          }`}
                        >
                          C[{r}][{c}] = {val}
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Dot Product Calculation Formula Bar */}
              {activeMatrixCell && (
                <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800 font-mono text-xs sm:text-sm text-gold-200">
                  <span className="font-bold text-amber-300">Dot-Product Trace for C[{activeMatrixCell.r}][{activeMatrixCell.c}]:</span>
                  <p className="mt-1">
                    sum = A[{activeMatrixCell.r}][0]*B[0][{activeMatrixCell.c}] + A[{activeMatrixCell.r}][1]*B[1][{activeMatrixCell.c}] + A[{activeMatrixCell.r}][2]*B[2][{activeMatrixCell.c}]
                  </p>
                  <p className="text-emerald-400 mt-1 font-bold">
                    = {activeMatrixCell.r === 0 && activeMatrixCell.c === 0 ? '(2×1) + (4×3) + (1×4) = 2 + 12 + 4 = 18' : ''}
                    {activeMatrixCell.r === 0 && activeMatrixCell.c === 1 ? '(2×2) + (4×0) + (1×1) = 4 + 0 + 1 = 5' : ''}
                    {activeMatrixCell.r === 1 && activeMatrixCell.c === 0 ? '(3×1) + (1×3) + (5×4) = 3 + 3 + 20 = 26' : ''}
                    {activeMatrixCell.r === 1 && activeMatrixCell.c === 1 ? '(3×2) + (1×0) + (5×1) = 6 + 0 + 5 = 11' : ''}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* ─── LAB 3: SORTING & SEARCHING LAB ─── */}
          {currentSlide === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2">
                  {(['bubble', 'selection'] as const).map((alg) => (
                    <motion.button
                      key={alg}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Select ${alg} sort algorithm`}
                      onClick={() => {
                        setSortingAlgorithm(alg);
                        setSortArray([64, 25, 12, 22, 11]);
                        setSortPass(0);
                        audioManager.play('tap');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${
                        sortingAlgorithm === alg ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {alg} Sort
                    </motion.button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortStep}
                    aria-label={`Step sort pass number ${sortPass}`}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md"
                  >
                    Step Sort Pass ({sortPass})
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBinarySearchStep}
                    aria-label={`Binary search for key ${searchKey}`}
                    className="px-4 py-1.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-md"
                  >
                    Binary Search (Key: {searchKey})
                  </motion.button>
                </div>
              </div>

              {/* 2D Animation Canvas for Sorting/Searching */}
              <div className="rounded-xl overflow-hidden border border-slate-800 shadow-inner">
                <canvas ref={canvasRef} width={580} height={140} className="w-full bg-slate-950 block" />
              </div>

              {/* Status Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                <div className="p-2 bg-slate-950 rounded border border-slate-800 text-slate-300">
                  Pass: {sortPass}
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800 text-gold-400">
                  Low: {binarySearchLow}
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800 text-emerald-400">
                  Mid: {binarySearchMid} ({sortArray[binarySearchMid]})
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800 text-purple-400">
                  High: {binarySearchHigh}
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── LAB 4: STRING MUTABILITY (SVG Diagram 3) ─── */}
          {currentSlide === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              {/* String Constant Pool vs Heap Memory Layout SVG Diagram 3 */}
              <svg viewBox="0 0 600 130" className="w-full bg-slate-950 rounded-xl p-2 border border-slate-800" role="img" aria-label="String Immutability vs StringBuffer Heap Layout Diagram">
                <rect x="20" y="20" width="260" height="90" rx="8" fill="#450a0a" stroke="#f87171" strokeWidth="1.5" />
                <text x="150" y="45" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">String Pool (Immutable)</text>
                <text x="150" y="65" textAnchor="middle" fill="#fecaca" fontSize="10" fontFamily="monospace">"Kolkata" → "Kolkata Metro"</text>
                <text x="150" y="85" textAnchor="middle" fill="#f87171" fontSize="9">Spawns NEW object on mutation</text>

                <rect x="320" y="20" width="260" height="90" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
                <text x="450" y="45" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">Heap Memory (Mutable)</text>
                <text x="450" y="65" textAnchor="middle" fill="#bbf7d0" fontSize="10" fontFamily="monospace">StringBuffer @0x888 [char[]]</text>
                <text x="450" y="85" textAnchor="middle" fill="#34d399" fontSize="9">Mutates same instance IN-PLACE</text>
              </svg>

              {/* Predict-then-Check embedded hook */}
              {!predictionMade ? (
                <div className="p-4 bg-gold-950/60 rounded-xl border border-gold-800">
                  <p className="text-sm font-bold text-gold-200 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePrediction(i)}
                        aria-label={`Prediction option ${i + 1}: ${opt}`}
                        className="p-2.5 bg-slate-900 rounded-lg text-left text-xs text-slate-300 border border-slate-800 hover:border-gold-500"
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Mutator Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Append Suffix:</span>
                {[' Metro', ' 2026', ', WB', ' Express'].map((suf) => (
                  <motion.button
                    key={suf}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleStringAppend(suf)}
                    aria-label={`Append suffix ${suf}`}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-gold-300 text-xs font-mono font-bold rounded-lg border border-slate-700"
                  >
                    +{suf}
                  </motion.button>
                ))}
              </div>

              {/* Memory Comparison Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* String Box */}
                <div className="p-4 bg-slate-950 rounded-xl border border-rose-950/60">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono text-rose-400 font-bold">✗ java.lang.String (Immutable)</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-900/40 text-rose-300">
                      Heap Objects Created: {stringObjectCount}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded font-mono text-sm text-rose-200 font-bold mb-2">
                    "{inputStringText}"
                  </div>
                  <div className="space-y-1 text-xs font-mono text-slate-400">
                    {stringLog.map((log, i) => (
                      <p key={i}>• {log}</p>
                    ))}
                  </div>
                </div>

                {/* StringBuffer Box */}
                <div className="p-4 bg-slate-950 rounded-xl border border-emerald-950/60">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono text-emerald-400 font-bold">✓ java.lang.StringBuffer (Mutable)</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-900/40 text-emerald-300">
                      Heap Objects Created: 1
                    </span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded font-mono text-sm text-emerald-200 font-bold mb-2">
                    "{inputBufferText}"
                  </div>
                  <div className="space-y-1 text-xs font-mono text-slate-400">
                    {bufferLog.map((log, i) => (
                      <p key={i}>• {log}</p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── LAB 5: RECURSIVE CALL STACK (SVG Diagram 4) ─── */}
          {currentSlide === 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              {/* Call Stack Execution Model SVG Diagram 4 */}
              <svg viewBox="0 0 600 110" className="w-full bg-slate-950 rounded-xl p-2 border border-slate-800" role="img" aria-label="Recursive Call Stack Activation Records Diagram">
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                <text x="100" y="45" textAnchor="middle" fill="#818cf8" fontSize="11" fontWeight="bold">Activation Frame #1</text>
                <text x="100" y="65" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontFamily="monospace">fact(4) = 4 * fact(3)</text>

                <path d="M 180 55 L 215 55" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow1)" />

                <rect x="220" y="20" width="160" height="70" rx="8" fill="#2e1065" stroke="#a855f7" strokeWidth="1.5" />
                <text x="300" y="45" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold">Activation Frame #2</text>
                <text x="300" y="65" textAnchor="middle" fill="#e9d5ff" fontSize="10" fontFamily="monospace">fact(3) = 3 * fact(2)</text>

                <path d="M 380 55 L 415 55" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow1)" />

                <rect x="420" y="20" width="160" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="500" y="45" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Base Frame #5</text>
                <text x="500" y="65" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontFamily="monospace">fact(0) = 1 (Unwinds)</text>
              </svg>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-mono font-bold text-gold-400">Recursion Trace: int fact(int n)</h3>
                  <p className="text-xs text-slate-400">Base case: if (n == 0) return 1; else return n * fact(n - 1);</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRecursionStep}
                  disabled={recursionFinished}
                  aria-label="Step Recursion Activation Frame"
                  className="px-4 py-2 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md shadow-gold-600/30"
                >
                  {recursionFinished ? 'Stack Unwound ✓' : `Step Recursion Frame (${recursionStep})`}
                </motion.button>
              </div>

              {/* Call Stack Tower */}
              <div className="min-h-[160px] p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col-reverse gap-2 items-center justify-start">
                {callStackFrames.length === 0 ? (
                  <p className="text-xs font-mono text-slate-500 py-12">Call stack empty. Click 'Step Recursion Frame' to push.</p>
                ) : (
                  callStackFrames.map((frame, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8, y: -20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="w-full max-w-md p-2.5 rounded-lg bg-gold-950 border border-gold-600/60 flex items-center justify-between text-xs font-mono text-gold-200 shadow-md"
                    >
                      <span className="font-bold text-white">Stack Frame #{callStackFrames.length - i}: fact({frame.n})</span>
                      <span className="text-amber-400">
                        {frame.n === 0 ? '✓ Base Case -> Returns 1' : `Waiting for fact(${frame.n - 1})`}
                      </span>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </motion.section>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.section
          key="sandbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Java Architect Free Exploration Sandbox</h2>
              <p className="text-xs text-slate-400">
                Experiment freely with Math calculations, exceptions, and token parsing without scoring pressure.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Advance to Graded Challenges Phase"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
            >
              Ready for Graded Challenges! 🎯
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Math Class Trigonometry & Rounding Sandbox */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-gold-400 uppercase tracking-wider font-mono">
                Math Class Engine (c11_cs_027)
              </h3>
              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                  <span>Trigonometric Angle: {sandboxAngleDeg}°</span>
                  <span className="text-gold-400">Radians: {(sandboxAngleDeg * Math.PI / 180).toFixed(4)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={sandboxAngleDeg}
                  onChange={(e) => setSandboxAngleDeg(Number(e.target.value))}
                  aria-label="Trigonometric angle in degrees"
                  className="w-full accent-gold-500"
                />
                <div className="grid grid-cols-3 gap-2 mt-2 font-mono text-xs text-center">
                  <div className="p-2 bg-slate-950 rounded border border-slate-800">
                    sin: {Math.sin((sandboxAngleDeg * Math.PI) / 180).toFixed(3)}
                  </div>
                  <div className="p-2 bg-slate-950 rounded border border-slate-800">
                    cos: {Math.cos((sandboxAngleDeg * Math.PI) / 180).toFixed(3)}
                  </div>
                  <div className="p-2 bg-slate-950 rounded border border-slate-800">
                    tan: {Math.abs(Math.cos((sandboxAngleDeg * Math.PI) / 180)) < 0.001 ? '∞' : Math.tan((sandboxAngleDeg * Math.PI) / 180).toFixed(3)}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                  <span>Decimal Input: {sandboxRoundVal}</span>
                </div>
                <input
                  type="range"
                  min={-100}
                  max={100}
                  step={1}
                  value={sandboxRoundVal * 10}
                  onChange={(e) => setSandboxRoundVal(Number(e.target.value) / 10)}
                  aria-label="Decimal number to test Math ceil, floor, and round"
                  className="w-full accent-amber-500"
                />
                <div className="grid grid-cols-3 gap-2 mt-2 font-mono text-xs text-center">
                  <div className="p-2 bg-slate-950 rounded border border-slate-800">
                    ceil(): {Math.ceil(sandboxRoundVal).toFixed(1)}
                  </div>
                  <div className="p-2 bg-slate-950 rounded border border-slate-800">
                    floor(): {Math.floor(sandboxRoundVal).toFixed(1)}
                  </div>
                  <div className="p-2 bg-slate-950 rounded border border-slate-800">
                    round(): {Math.round(sandboxRoundVal)}
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Exception Simulator Sandbox */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-gold-400 uppercase tracking-wider font-mono">
                Custom Exception Handler (c11_cs_028 & c11_cs_029)
              </h3>
              <div className="space-y-2">
                <label htmlFor="custom-ex-msg" className="text-xs text-slate-300 font-mono">Exception Message:</label>
                <input
                  id="custom-ex-msg"
                  type="text"
                  value={sandboxCustomExceptionMsg}
                  onChange={(e) => setSandboxCustomExceptionMsg(e.target.value)}
                  aria-label="Custom Exception Message"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSandboxTryCatchTriggered(true);
                    audioManager.play('error');
                    speechManager.speak(`Exception thrown: ${sandboxCustomExceptionMsg}`);
                  }}
                  aria-label="Throw custom student data exception"
                  className="w-full py-2 bg-rose-700 hover:bg-rose-600 text-white rounded-lg text-xs font-bold font-mono shadow-md"
                >
                  throw new InvalidStudentDataException(...)
                </motion.button>
              </div>

              {sandboxTryCatchTriggered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-slate-950 rounded-xl border border-rose-500/50 font-mono text-xs space-y-1"
                >
                  <p className="text-amber-400">try {'{ /* guarded block */ }'}</p>
                  <p className="text-rose-400 font-bold">catch (InvalidStudentDataException e) {'{'}</p>
                  <p className="text-slate-300 pl-4">System.err.println(e.getMessage());</p>
                  <p className="text-slate-400 pl-4">// Output: "{sandboxCustomExceptionMsg}"</p>
                  <p className="text-rose-400">{'}'}</p>
                  <p className="text-emerald-400">finally {'{ System.out.println("Cleanup executed!"); }'}</p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 4: GRADED CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.section
          key="challenge"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-5"
        >
          {/* Challenge Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-gold-900/60 text-gold-300 font-mono">
                  Competency: {challenge.competencyLevel}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                Node Focus: <span className="font-mono text-gold-400">{challenge.nodeId}</span>
              </h2>
            </div>

            {/* Adaptive Difficulty Badge */}
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider ${
                difficulty === 'foundation'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : difficulty === 'standard'
                  ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}
            >
              {difficulty}
            </motion.span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <p className="text-white text-base sm:text-lg font-semibold leading-relaxed whitespace-pre-line">
              {challenge.question}
            </p>

            {/* MCQ Options Rendering */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 gap-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : { duration: 0.2 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`w-full text-left p-4 rounded-xl font-medium text-sm transition-all border ${
                        wrongFlash
                          ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-100 shadow-lg'
                          : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-gold-500'
                      }`}
                    >
                      <span className="font-mono text-xs text-gold-400 mr-2">[{String.fromCharCode(65 + i)}]</span>
                      {showExplanation && (
                        <span className="mr-2 font-bold">
                          {i === challenge.correctIndex ? '✓' : '✗'}
                        </span>
                      )}
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag-Label Challenge Rendering */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      draggable
                      aria-label={`Draggable architectural keyword ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-lg text-xs font-mono font-bold cursor-grab active:cursor-grabbing shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'slot_guard', label: 'Guarded Block' },
                    { id: 'slot_handler', label: 'Exception Interceptor' },
                    { id: 'slot_cleanup', label: 'Guaranteed Cleanup' },
                    { id: 'slot_raise', label: 'Instantiate & Dispatch' },
                  ].map((slot) => (
                    <div
                      key={slot.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(slot.id)}
                      aria-label={`Drop target zone for ${slot.label}`}
                      className="p-4 rounded-xl bg-slate-950 border-2 border-dashed border-slate-700 text-center min-h-[90px] flex flex-col justify-center items-center"
                    >
                      <span className="text-xs text-slate-500 mb-1">{slot.label}</span>
                      <span className="text-sm font-mono font-bold text-emerald-400">
                        {droppedLabels[slot.id] ? `✓ ${droppedLabels[slot.id]}` : 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Verify Architecture Labels"
                  className="px-6 py-2 bg-gold-600 text-white rounded-xl font-bold text-xs shadow-md"
                >
                  Verify Architecture Labels
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge Rendering */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to rearrange into chronological order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      draggable
                      aria-label={`Sort pass item: ${item}`}
                      onDragStart={() => setDraggedItem(String(idx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, idx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs sm:text-sm font-mono text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>{item}</span>
                      <span className="text-slate-500 font-bold">Step {idx + 1}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    handleAnswer(
                      sortArrangement.length > 0
                        ? sortArrangement
                        : challenge.sortItems!.map((_, i) => i)
                    )
                  }
                  aria-label="Check Pass Order"
                  className="px-6 py-2 bg-gold-600 text-white rounded-xl font-bold text-xs shadow-md"
                >
                  Check Pass Order
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge Rendering */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated integer"
                    aria-label="Calculated integer answer"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl font-mono text-sm text-white focus:outline-none focus:border-gold-500 w-48"
                  />
                  <span className="text-xs font-mono text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    aria-label="Submit numeric answer"
                    className="px-6 py-2 bg-gold-600 text-white rounded-xl font-bold text-xs shadow-md"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge Rendering */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      aria-label={`Add code block part: ${part}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-gold-300 rounded-lg text-xs font-mono border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[70px] p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-gold-950 text-gold-200 border border-gold-700/60 rounded-lg text-xs font-mono flex items-center gap-2"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts((p) => p.filter((_, i) => i !== idx))}
                        aria-label={`Remove part ${part}`}
                        className="text-rose-400 hover:text-rose-200"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  aria-label="Verify Code Structure"
                  className="px-6 py-2 bg-gold-600 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-md"
                >
                  Verify Code Structure
                </motion.button>
              </div>
            )}

            {/* ─── PROGRESSIVE DISCLOSURE EXPLANATION ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-amber-950/40 border border-amber-800/60 space-y-3"
              >
                <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider font-mono">
                  ISC Examination Solution Breakdown:
                </h4>
                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((step, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-mono"
                      >
                        <span className="font-bold text-amber-400 font-sans mr-1.5">[{idx + 1}]</span>
                        {step}
                        {!step.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps <
                    challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps((r) => r + 1)}
                      aria-label="Show Next Step in Explanation"
                      className="px-4 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-xl text-xs font-bold font-sans"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Proceed to next challenge or view report"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold font-sans shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'View Examination Mastery Report 🏆'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 5: COMPLETION & REFLECTION SECTION ─── */}
      {phase === 'complete' && (
        <motion.section
          key="complete"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Mastery Banner */}
          <div className="p-6 bg-gradient-to-r from-emerald-950 via-slate-900 to-gold-950 rounded-2xl border border-emerald-800/60 text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">Simulation Completed!</h2>
            <p className="text-emerald-400 font-mono text-sm font-bold">
              Final Accuracy Score: {Math.max(0, 100 - errors * 5)}% • BKT Level: {masteryLevel.toUpperCase()}
            </p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300">
            {errors === 0
              ? '🌟 Flawless Mastery! You demonstrated exceptional understanding of ISC Java memory allocation, sorting, strings, and recursion.'
              : errors <= 3
              ? '👏 Great Performance! You are well prepared for board-level programming challenges. Review any misconceptions below.'
              : '💪 Good Effort! Solidify your two-stage object allocation, matrix loops, and recursion base case rules with spaced repetition.'}
          </div>

          {/* ─── SPACED REPETITION VISIBILITY CARD (SRS) ─── */}
          <div className="p-5 bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-900 rounded-2xl border border-gold-500/40 shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-gold-300 font-bold text-sm">
                <span className="text-xl">📅</span>
                <span>Spaced Repetition Schedule (SM-2 Learning System)</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-gold-900/80 text-gold-200 border border-gold-700 font-mono font-semibold">
                {errors === 0 ? 'Optimal Retention' : errors <= 3 ? 'Review Soon' : 'Needs Quick Reinforcement'}
              </span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-sm font-semibold text-white flex items-center gap-2">
                  <span>Recommended Review:</span>
                  <span className="text-amber-300 font-bold text-base bg-amber-950/50 px-2.5 py-0.5 rounded-lg border border-amber-800/60 font-mono">
                    {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {errors === 0
                    ? '0 errors logged: Mastered! The SM-2 interval is extended to 7 days to preserve long-term consolidation.'
                    : errors <= 3
                    ? `${errors} error(s) logged: Good foundation! Review in 3 days to reinforce tricky edge cases and syntax.`
                    : `${errors} error(s) logged: Several concepts challenged you. Review in 1 day (tomorrow) for quick reinforcement.`}
                </p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800 gap-1 text-xs font-mono text-gold-300">
                <span className="text-slate-500">Next SRS Interval:</span>
                <span className="text-emerald-400 font-bold text-sm">
                  {errors === 0 ? '+7 Days' : errors <= 3 ? '+3 Days' : '+1 Day'}
                </span>
              </div>
            </div>
          </div>

          {/* ─── GUIDED REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-gold-900/60 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>💭</span> Key Learning Reflections
            </h3>
            <p className="text-xs text-slate-400">
              Take a moment to solidify your understanding by answering these three conceptual reflections:
            </p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="reflection-1" className="text-xs font-semibold text-gold-300">
                  1. What was the most surprising thing you learned about Java memory and object arrays?
                </label>
                <textarea
                  id="reflection-1"
                  value={reflection1}
                  onChange={(e) => setReflection1(e.target.value)}
                  placeholder="e.g., How Student[] creates null references instead of objects initially..."
                  aria-label="Reflection on most surprising concept"
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="reflection-2" className="text-xs font-semibold text-gold-300">
                  2. How would you explain the difference between String and StringBuffer to a friend?
                </label>
                <textarea
                  id="reflection-2"
                  value={reflection2}
                  onChange={(e) => setReflection2(e.target.value)}
                  placeholder="e.g., String is like an engraved stone, while StringBuffer is an erasable chalkboard..."
                  aria-label="Reflection on explaining concepts to a friend"
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="reflection-3" className="text-xs font-semibold text-gold-300">
                  3. Where in real life might you use matrix multiplication, sorting, or custom exceptions?
                </label>
                <textarea
                  id="reflection-3"
                  value={reflection3}
                  onChange={(e) => setReflection3(e.target.value)}
                  placeholder="e.g., CISCE board result rank processing, banking validation, 3D graphics..."
                  aria-label="Reflection on real-world application"
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider font-mono">
                Your Misconception Diagnostic Profile:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-semibold">✗ {m.misconception}</p>
                      <p className="text-emerald-300">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Capstone Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🚀</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono">
                  <span className="text-gold-400 font-bold mr-2">[{i + 1}]</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Benchmark Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_ComputerScienceJavaArraysAdvancedSim;
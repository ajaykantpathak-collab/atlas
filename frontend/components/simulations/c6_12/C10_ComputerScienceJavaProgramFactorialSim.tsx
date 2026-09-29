'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (Mandatory Literals) ───
const NODE_C10_CS_031 = 'c10_cs_031';
const NODE_C10_CS_032 = 'c10_cs_032';
const NODE_C10_CS_033 = 'c10_cs_033';
const NODE_C10_CS_034 = 'c10_cs_034';
const NODE_C10_CS_035 = 'c10_cs_035';
const NODE_C10_CS_036 = 'c10_cs_036';
const NODE_C10_CS_037 = 'c10_cs_037';
const NODE_C10_CS_038 = 'c10_cs_038';
const NODE_C10_CS_039 = 'c10_cs_039';
const NODE_C10_CS_040 = 'c10_cs_040';
const NODE_C10_CS_041 = 'c10_cs_041';
const NODE_C10_CS_043 = 'c10_cs_043';

const ALL_NODE_IDS = [
  NODE_C10_CS_031,
  NODE_C10_CS_032,
  NODE_C10_CS_033,
  NODE_C10_CS_034,
  NODE_C10_CS_035,
  NODE_C10_CS_036,
  NODE_C10_CS_037,
  NODE_C10_CS_038,
  NODE_C10_CS_039,
  NODE_C10_CS_040,
  NODE_C10_CS_041,
  NODE_C10_CS_043,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'CyberVidyalaya: The Board Examination Code Challenge',
  intro:
    'You are the lead student developer at St. Xavier’s Tech Lab preparing for the ICSE Class 10 Board Examinations. A real-world server crash just struck the school registration portal!',
  context:
    'You need to trace factorial call stacks, debug prime checks, construct SQL student queries, patch network topology bottlenecks, and inspect cloud deployment architectures.',
};

// ─── DISCOVERY QUESTION (Curiosity Hook) ───
const DISCOVERY_QUESTION = {
  question: 'What happens in memory when factorial(100000) is called using pure recursion without a base case?',
  options: [
    'It returns 0 instantly because numbers wrap around.',
    'It throws a StackOverflowError as the call stack exceeds memory.',
    'It switches automatically to a for-loop accumulator.',
    'It executes smoothly using CPU cache registers.',
  ],
  correctIndex: 1,
  hintAfter: 'Calls keep piling up frames on the JVM call stack until memory is exhausted! Let us explore how it works.',
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

// ─── 22 PROGRESSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Factorial Base Case (c10_cs_031) - Recall
  {
    id: 'ch_01',
    nodeId: NODE_C10_CS_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a recursive Java method `int fact(int n)`, what must the base case return when n == 0?',
    options: ['return 0;', 'return 1;', 'return n;', 'return fact(0);'],
    correctIndex: 1,
    explanation: '0! is defined mathematically as 1 (the multiplicative identity). Returning 0 would turn the entire product to 0.',
    hints: [
      'Think about the identity element for multiplication.',
      'If you multiply any number by 0, the whole result collapses to zero.',
      '0! = 1, so when n == 0, the method must return 1.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Factorial Loop Initialisation (c10_cs_031) - Understanding
  {
    id: 'ch_02',
    nodeId: NODE_C10_CS_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'An iterative factorial accumulator `int fact` must be initialised to which value before a for loop starts?',
    options: ['int fact = 0;', 'int fact = 1;', 'int fact = n;', 'int fact = -1;'],
    correctIndex: 1,
    explanation: 'An accumulator for multiplication must start at 1. If started at 0, repeated multiplication by i keeps the result 0.',
    hints: [
      'Multiplication by 0 results in 0.',
      'Sum accumulators start at 0, product accumulators start at 1.',
      'Initialise with `int fact = 1;`.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation - Prime Check Flag (c10_cs_032) - Recall
  {
    id: 'ch_03',
    nodeId: NODE_C10_CS_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is a boolean flag like `boolean isPrime = true;` used in prime checking rather than printing inside the loop?',
    options: [
      'To prevent Java compile-time type errors.',
      'To avoid printing "Prime" or "Not Prime" repeatedly for every single divisor test.',
      'Because Java does not permit System.out.println inside loops.',
      'To automatically calculate the square root of the number.',
    ],
    correctIndex: 1,
    explanation: 'Printing inside the loop outputs a message for every divisor checked. A boolean flag stores the conclusion and prints once at the end.',
    hints: [
      'What happens if you print inside a loop running 50 times?',
      'You only want one final verdict per number.',
      'The boolean flag stores the search outcome so output happens cleanly after the loop.',
    ],
    misconceptionIndex: 1,
  },
  // 4. Foundation - Armstrong Digit Extraction (c10_cs_033) - Understanding
  {
    id: 'ch_04',
    nodeId: NODE_C10_CS_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which pair of Java operations extracts the rightmost digit and removes it from an integer n?',
    options: [
      'd = n / 10; and n = n % 10;',
      'd = n % 10; and n = n / 10;',
      'd = n - 10; and n = n + 10;',
      'd = Math.sqrt(n); and n = n / 2;',
    ],
    correctIndex: 1,
    explanation: '`n % 10` extracts the remainder (units digit), and `n / 10` uses integer division to discard the units place.',
    hints: [
      'Modulo (%) gives the remainder when divided by 10.',
      'Division (/) by 10 truncates the decimal and shifts digits right.',
      'd = n % 10 gets the last digit, and n = n / 10 removes it.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Foundation - Star Pattern Print vs Println (c10_cs_034) - Recall
  {
    id: 'ch_05',
    nodeId: NODE_C10_CS_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In nested loop pattern printing, where should `System.out.println();` (new line) be placed?',
    options: [
      'Inside the innermost loop after each star.',
      'Outside the inner loop, directly inside the outer loop body after the row completes.',
      'Before the outer loop begins.',
      'Inside the boolean condition of the for loop.',
    ],
    correctIndex: 1,
    explanation: '`System.out.print()` is used in the inner loop to keep columns on one line; `System.out.println()` is called after the inner loop finishes to drop to the next row.',
    hints: [
      'A row consists of multiple stars side-by-side.',
      'If you drop to a new line on every star, you get a single vertical column.',
      'Place `println()` right after the inner loop finishes.',
    ],
    misconceptionIndex: 3,
  },
  // 6. Foundation - Network Topology Star Hub (c10_cs_035) - Understanding
  {
    id: 'ch_06',
    nodeId: NODE_C10_CS_035,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the primary single point of failure in a Star Network Topology?',
    options: [
      'A break in any individual node workstation cable.',
      'The central switch or hub.',
      'The terminating resistors at cable ends.',
      'The circular token passing sequence.',
    ],
    correctIndex: 1,
    explanation: 'In a Star topology, all nodes connect to a central hub/switch. If the hub fails, the entire network goes down.',
    hints: [
      'All nodes send packets through one central hardware unit.',
      'If an individual node cable breaks, only that node goes offline.',
      'If the central hub fails, all communication collapses.',
    ],
    misconceptionIndex: 4,
  },
  // 7. Foundation - SQL DDL vs DML (c10_cs_037) - Recall
  {
    id: 'ch_07',
    nodeId: NODE_C10_CS_037,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following SQL commands is classified under DDL (Data Definition Language)?',
    options: ['INSERT INTO', 'UPDATE', 'CREATE TABLE', 'DELETE'],
    correctIndex: 2,
    explanation: 'DDL deals with table schema and structure (CREATE, ALTER, DROP). DML deals with rows/data inside tables (INSERT, UPDATE, DELETE).',
    hints: [
      'DDL builds or alters the blueprint of the house.',
      'DML moves furniture inside the rooms.',
      'CREATE TABLE modifies structure, so it is DDL.',
    ],
    misconceptionIndex: 5,
  },
  // 8. Standard - Drag-label Topologies (c10_cs_035) - Application
  {
    id: 'ch_08',
    nodeId: NODE_C10_CS_035,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Drag the correct topology names to their architectural characteristics.',
    dragItems: [
      { label: 'Star', targetId: 'top_hub' },
      { label: 'Bus', targetId: 'top_backbone' },
      { label: 'Ring', targetId: 'top_token' },
      { label: 'Mesh', targetId: 'top_redundant' },
    ],
    correctMapping: {
      top_hub: 'Star',
      top_backbone: 'Bus',
      top_token: 'Ring',
      top_redundant: 'Mesh',
    },
    explanation: 'Star relies on a central hub; Bus uses a linear backbone cable; Ring circulates a token; Mesh features point-to-point links between all nodes.',
    hints: [
      'Match the central hub to the Star layout.',
      'A single common line cable is a Bus backbone.',
      'Unidirectional token passing belongs to Ring; all-to-all links belong to Mesh.',
    ],
  },
  // 9. Standard - Prime Square Root Optimization (c10_cs_032) - Analysis
  {
    id: 'ch_09',
    nodeId: NODE_C10_CS_032,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'To check if n = 97 is prime using the square-root optimization `i * i <= n`, what is the maximum integer divisor i tested?',
    correctAnswer: 9,
    tolerance: 0,
    unit: 'divisor limit',
    explanation: '√97 ≈ 9.84. The loop condition `i * i <= 97` allows i up to 9 (since 9² = 81 <= 97 and 10² = 100 > 97).',
    hints: [
      'Find the largest integer whose square is less than or equal to 97.',
      '9 * 9 = 81 <= 97, whereas 10 * 10 = 100 > 97.',
      'The integer bound is 9.',
    ],
  },
  // 10. Standard - Recursive Call Trace (c10_cs_031) - Application
  {
    id: 'ch_10',
    nodeId: NODE_C10_CS_031,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How many total stack frames are pushed to compute `factorial(4)` including the base case `factorial(0)`?',
    correctAnswer: 5,
    tolerance: 0,
    unit: 'stack frames',
    explanation: 'The calls pushed are factorial(4), factorial(3), factorial(2), factorial(1), and factorial(0). That makes 5 frames total.',
    hints: [
      'List every call starting from 4 down to the base case.',
      'Calls: fact(4) -> fact(3) -> fact(2) -> fact(1) -> fact(0).',
      'Count all 5 invocations.',
    ],
  },
  // 11. Standard - Drag-Sort Execution Order of SQL (c10_cs_038) - Analysis
  {
    id: 'ch_11',
    nodeId: NODE_C10_CS_038,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the SQL clauses in their mandatory written syntactic order.',
    sortItems: ['SELECT column_names', 'FROM table_name', 'WHERE condition', 'ORDER BY column_name DESC'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Standard SQL syntax strictly demands: SELECT ... FROM ... WHERE ... ORDER BY.',
    hints: [
      'You specify what to retrieve first (SELECT).',
      'Next you name the table (FROM), then filter rows (WHERE), then sort (ORDER BY).',
      'The order is SELECT -> FROM -> WHERE -> ORDER BY.',
    ],
  },
  // 12. Standard - Perfect Number Property (c10_cs_033) - Application
  {
    id: 'ch_12',
    nodeId: NODE_C10_CS_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why does the loop for finding proper factors of n in a Perfect Number check run only up to `n / 2`?',
    options: [
      'Because odd numbers have no factors greater than 3.',
      'Because no factor of n (other than n itself) can be strictly greater than n/2.',
      'Because Java automatically rounds down square roots.',
      'To prevent an infinite loop in while constructs.',
    ],
    correctIndex: 1,
    explanation: 'The smallest possible non-trivial divisor is 2, meaning the largest proper divisor cannot exceed n/2. For 28, the largest proper factor is 14.',
    hints: [
      'What is the largest factor of 28 excluding 28 itself?',
      '28 / 2 = 14.',
      'No integer between n/2 + 1 and n - 1 can divide n evenly.',
    ],
  },
  // 13. Standard - HTTPS Security & Encryption (c10_cs_036) - Understanding
  {
    id: 'ch_13',
    nodeId: NODE_C10_CS_036,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why do Indian banking apps like SBI YONO mandate HTTPS (Port 443) over HTTP (Port 80)?',
    options: [
      'HTTP is restricted to government portals.',
      'HTTPS uses SSL/TLS encryption to prevent plaintext interception of credentials and OTPs.',
      'HTTPS increases packet transmission speed by 50%.',
      'HTTP cannot transmit numeric digits.',
    ],
    correctIndex: 1,
    explanation: 'HTTP transmits packets as plaintext, vulnerable to sniffing. HTTPS encrypts traffic using SSL/TLS cryptographic keys on Port 443.',
    hints: [
      'Think about Wi-Fi eavesdropping on passwords.',
      'Port 80 is unencrypted plaintext.',
      'HTTPS combines HTTP with SSL/TLS encryption.',
    ],
  },
  // 14. Standard - Cloud Service Model Classification (c10_cs_041) - Application
  {
    id: 'ch_14',
    nodeId: NODE_C10_CS_041,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A school in Bengaluru uses Google Docs for student assignments without managing any server or runtime. Which cloud model is this?',
    options: ['IaaS (Infrastructure as a Service)', 'PaaS (Platform as a Service)', 'SaaS (Software as a Service)', 'DaaS (Data as a Service)'],
    correctIndex: 2,
    explanation: 'Google Docs is an on-demand, ready-to-use finished application accessed via web browser, making it SaaS.',
    hints: [
      'Are they writing server code or just using an existing web application?',
      'End-user applications like Gmail and Google Docs fall under one specific acronym.',
      'It is Software as a Service (SaaS).',
    ],
  },
  // 15. Standard - Object Array NullPointerException (c10_cs_039) - Analysis
  {
    id: 'ch_15',
    nodeId: NODE_C10_CS_039,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A student writes `Student[] s = new Student[10]; s[0].name = "Aarav";`. Why does this throw a `NullPointerException`?',
    options: [
      'Because arrays in Java cannot store objects.',
      '`new Student[10]` only allocates an array of references; each element `s[i]` remains null until `new Student()` is called.',
      'Because "Aarav" must be declared in double quotes with Scanner.',
      'Because Java requires arrays to start at index 1.',
    ],
    correctIndex: 1,
    explanation: 'Declaring `new Student[10]` creates 10 null pointers. You must instantiate each slot: `s[0] = new Student();` before accessing members.',
    hints: [
      'An array of objects is an array of empty reference slots.',
      'What value does s[0] hold right after creating the array container?',
      's[0] is null until explicitly initialized with `new Student()`.',
    ],
    misconceptionIndex: 6,
  },
  // 16. Advanced - Construct Recursive Factorial (c10_cs_031) - Creativity
  {
    id: 'ch_16',
    nodeId: NODE_C10_CS_031,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Build the return statement for the recursive step of factorial computation.',
    availableParts: ['return', 'n', '*', 'fact(n - 1);', 'fact(n);', '+', '1;'],
    targetState: 'return n * fact(n - 1);',
    validationHint: 'Assemble: return + n + * + fact(n - 1);',
    explanation: 'The mathematical reduction n! = n × (n - 1)! translates in Java to `return n * fact(n - 1);`.',
    hints: [
      'Start with the keyword `return`.',
      'Multiply current number `n` by the recursive call on the smaller sub-problem.',
      'Combine: return + n + * + fact(n - 1);',
    ],
  },
  // 17. Advanced - Trace Dry Run Array Evaluation (c10_cs_040) - Evaluation
  {
    id: 'ch_17',
    nodeId: NODE_C10_CS_040,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Trace this loop: `int[] a = {3, 1, 4, 1, 5}; int s = 0; for(int x : a) { s += (x % 2 == 0) ? x * 2 : x; }`. What is the final value of s?',
    correctAnswer: 18,
    tolerance: 0,
    unit: 'sum total',
    explanation: 'Odds add as is: 3 + 1 + 1 + 5 = 10. Even (4) is doubled: 4 * 2 = 8. Total = 10 + 8 = 18.',
    hints: [
      'Check each element: 3 (odd -> 3), 1 (odd -> 1), 4 (even -> 4*2=8), 1 (odd -> 1), 5 (odd -> 5).',
      'Sum = 3 + 1 + 8 + 1 + 5.',
      '3 + 1 + 8 + 1 + 5 = 18.',
    ],
  },
  // 18. Advanced - SQL Aggregate with Filter (c10_cs_038) - Evaluation
  {
    id: 'ch_18',
    nodeId: NODE_C10_CS_038,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Which query correctly calculates the average marks of Class 10 students from Mumbai who scored at least 50?',
    options: [
      'SELECT AVG(marks) FROM students WHERE city = "Mumbai" AND marks >= 50;',
      'SELECT marks, AVG() FROM students WHERE city = "Mumbai" ORDER BY 50;',
      'SELECT SUM(marks) / COUNT(city) WHERE marks > 50 FROM Mumbai;',
      'SELECT AVG(*) FROM students HAVING city = "Mumbai";',
    ],
    correctIndex: 0,
    explanation: '`AVG(marks)` is the aggregate function, filtered by `WHERE city = "Mumbai" AND marks >= 50`.',
    hints: [
      'Aggregate function for mean is AVG(column).',
      'Filter with WHERE using boolean AND operator.',
      '`SELECT AVG(marks) FROM students WHERE city = "Mumbai" AND marks >= 50;` is correct.',
    ],
  },
  // 19. Advanced - Java Debugging Exception Type (c10_cs_043) - Analysis
  {
    id: 'ch_19',
    nodeId: NODE_C10_CS_043,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A program executes `int a = 10 / 0;`. Which specific runtime exception is triggered in the JVM?',
    options: ['NullPointerException', 'ArrayIndexOutOfBoundsException', 'ArithmeticException', 'NumberFormatException'],
    correctIndex: 2,
    explanation: 'Integer division by zero in Java throws `java.lang.ArithmeticException: / by zero`.',
    hints: [
      'It is a mathematical error during runtime.',
      'Division by zero is an arithmetic violation.',
      'The exception class is `ArithmeticException`.',
    ],
  },
  // 20. Advanced - Multi-floor Network Topology Choice (c10_cs_035) - Evaluation
  {
    id: 'ch_20',
    nodeId: NODE_C10_CS_035,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A 3-floor school building has a server on Ground floor, a Star lab on Floor 1, and Star staffroom on Floor 2. What overall topology is formed?',
    options: ['Pure Ring Topology', 'Tree (Hierarchical) Topology', 'Pure Bus Topology', 'Full Mesh Topology'],
    correctIndex: 1,
    explanation: 'Connecting multiple star-configured networks across floors via a central backbone creates a hierarchical Tree topology.',
    hints: [
      'Look at the root server branching into departmental star hubs.',
      'A combination of star networks over a central spine is hierarchical.',
      'This hierarchical structure is a Tree topology.',
    ],
  },
  // 21. Advanced - ICSE Exam Strategy Time Allocation (c10_cs_040) - Evaluation
  {
    id: 'ch_21',
    nodeId: NODE_C10_CS_040,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In the 2-hour (120 min) ICSE Computer Applications exam (40 marks Sec A, 60 marks Sec B), what is the optimal time budget?',
    options: [
      '75 mins on Sec A, 45 mins on Sec B.',
      '40 mins on Sec A, 75 mins on Sec B, 5 mins revision.',
      '110 mins on Sec A, 10 mins on Sec B.',
      'Equal split: 60 mins each without reviewing.',
    ],
    correctIndex: 1,
    explanation: 'Section A needs ~40 mins. Section B requires ~75 mins to code, trace, and format four 15-mark programs, leaving 5 mins for final review.',
    hints: [
      'Section B carries 60% of marks and requires full program writing.',
      'Spending too long on Section A leaves insufficient time for code writing.',
      'Budget ~40 mins for Sec A and ~75 mins for Sec B.',
    ],
  },
  // 22. Advanced - Cloud Model Selection for Custom App (c10_cs_041) - Application
  {
    id: 'ch_22',
    nodeId: NODE_C10_CS_041,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A developer wants to write custom Java web code and deploy without configuring Linux OS patches or hardware. Which cloud model fits best?',
    options: ['IaaS', 'PaaS', 'SaaS', 'On-Premise Private Bare-Metal'],
    correctIndex: 1,
    explanation: 'PaaS (Platform as a Service, e.g., Google App Engine / Heroku) manages OS runtime and hardware while allowing developers to deploy custom code.',
    hints: [
      'The developer writes code but doesn\'t want to configure OS/VMs.',
      'It sits between raw infrastructure (IaaS) and ready-made software (SaaS).',
      'Platform as a Service (PaaS) is the ideal match.',
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
  nodeId: NODE_C10_CS_031,
  title: 'Java Factorial, Algorithms & ICSE Board Suite',
  definition:
    'Comprehensive mastery of Java algorithms (Factorial recursion vs loops, Primes, Armstrong, Patterns), OOP, SQL databases, Network topologies, and ICSE exam strategies.',
  eli5:
    'Learn how computers calculate factorials by asking smaller versions of themselves, find prime numbers using smart square-root boundaries, and connect machines into robust networks.',
  misconceptions: [
    {
      misconception: 'Factorial base case returning 0 instead of 1.',
      correction: '0! = 1. If a recursive method returns 0 for n == 0, the whole accumulated product turns to 0.',
    },
    {
      misconception: 'Printing "Prime" / "Not Prime" inside the divisibility loop.',
      correction: 'Divisibility must be tested silently with a boolean flag, printing the conclusion once after the loop completes.',
    },
    {
      misconception: 'Using n / 10 to get the last digit instead of n % 10.',
      correction: 'Modulo (n % 10) extracts the remainder units digit; division (n / 10) removes the units digit.',
    },
    {
      misconception: 'Calling System.out.println() inside the inner loop for star triangles.',
      correction: 'print() keeps characters in the same row; println() must only be called once per completed row.',
    },
    {
      misconception: 'Thinking Star topology cables fail the entire network.',
      correction: 'In Star, an individual cable cut isolates only that workstation. The network only fails if the central hub dies.',
    },
    {
      misconception: 'Confusing DDL (CREATE/ALTER) with DML (INSERT/UPDATE/DELETE).',
      correction: 'DDL modifies the database structure and table definitions; DML modifies the record contents inside the tables.',
    },
    {
      misconception: 'Assuming `Student[] s = new Student[5]` creates 5 Student objects.',
      correction: 'It creates an array of 5 null references. Each slot must be separately instantiated with `s[i] = new Student();`.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is 0! in mathematics and Java factorial logic?', options: ['0', '1', 'Undefined', '-1'], correctIndex: 1 },
    { question: 'Which keyword in Java terminates loop execution immediately?', options: ['continue', 'return', 'break', 'exit'], correctIndex: 2 },
    { question: 'What is the smallest 3-digit Armstrong number?', options: ['100', '153', '370', '407'], correctIndex: 1 },
    { question: 'Which port is standard for encrypted HTTPS traffic?', options: ['80', '21', '25', '443'], correctIndex: 3 },
    { question: 'Which SQL clause is used to filter records?', options: ['ORDER BY', 'WHERE', 'GROUP', 'SELECT'], correctIndex: 1 },
    { question: 'Which loop is guaranteed to execute at least once?', options: ['for', 'while', 'do-while', 'nested-for'], correctIndex: 2 },
    { question: 'Which cloud model delivers finished applications to end users?', options: ['IaaS', 'PaaS', 'SaaS', 'Serverless'], correctIndex: 2 },
    { question: 'What is the compulsory section weightage in ICSE Computer Applications?', options: ['20 marks', '40 marks', '60 marks', '50 marks'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student achieves 80%+ across recursive algorithms, loops, SQL queries, and network models.',
};

// ─── EXPLORATION STEPS (Interactive Learning) ───
const EXPLORATION_STEPS = [
  {
    title: '1. Factorial: Recursion vs Iteration Stack',
    instruction: 'Adjust the slider N to trace the call stack growth and watch values unwind!',
    interactionType: 'slider-factorial',
    nodeId: NODE_C10_CS_031,
  },
  {
    title: '2. Prime Number Detective & √N Boundary',
    instruction: 'Test candidate numbers and see why testing divisors up to √N is 100% sufficient!',
    interactionType: 'prime-detective',
    nodeId: NODE_C10_CS_032,
  },
  {
    title: '3. Special Numbers: Armstrong & Fibonacci',
    instruction: 'Extract digits using % 10 and / 10 to test for Armstrong and Fibonacci chains!',
    interactionType: 'special-numbers',
    nodeId: NODE_C10_CS_033,
  },
  {
    title: '4. Dynamic Pattern Matrix Generator',
    instruction: 'Change row count and toggle shape modes to observe nested loop row/column coordination.',
    interactionType: 'pattern-matrix',
    nodeId: NODE_C10_CS_034,
  },
  {
    title: '5. Network Topology Packet Routing',
    instruction: 'Click network nodes to simulate packet delivery across Star, Bus, Ring, and Mesh topologies.',
    interactionType: 'network-sim',
    nodeId: NODE_C10_CS_035,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you test n = 49 for primality with the square-root bound, will it test divisor 7?',
    options: [
      'No, because √49 = 7 and the bound stops strictly before 7.',
      'Yes, because the loop condition is i * i <= n (or i <= √n), so 7 * 7 <= 49 is included.',
      'No, prime loops only test even numbers.',
      'Yes, but it skips 7 and tests 8.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the prime tester to 49 and observe the factor verification gauge hitting 7!',
    nodeId: NODE_C10_CS_032,
  },
  {
    question: 'Predict: What is the output of 153 in an Armstrong check (1³ + 5³ + 3³)?',
    options: [
      '1 + 125 + 27 = 153 (True, Armstrong)',
      '1 + 15 + 9 = 25 (False)',
      '1 + 25 + 9 = 35 (False)',
      '3 + 15 + 1 = 19 (False)',
    ],
    correctIndex: 0,
    verifyInstruction: 'Select 153 on the digit cube accumulator to watch 1 + 125 + 27 = 153 lock in!',
    nodeId: NODE_C10_CS_033,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the Call Stack height as you increase N from 1 to 5 in recursive Factorial?',
    observableOptions: [
      'Stack depth increases linearly by 1 for each added value of N before unwinding.',
      'Stack depth stays at 1 because Java executes all recursive calls simultaneously.',
      'Stack depth decreases as numbers get larger.',
      'Stack frames are replaced immediately without waiting for returns.',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_CS_031,
  },
  {
    question: 'In the Star topology visualization, what happens when you sever a single workstation link?',
    observableOptions: [
      'All computers in the network immediately disconnect.',
      'Only that specific workstation is isolated; all other nodes communicate normally through the switch.',
      'The central switch bursts into error state.',
      'Packets reroute through the isolated computer automatically.',
    ],
    correctIndex: 1,
    nodeId: NODE_C10_CS_035,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ICSE Master Coder: Building the Portal Engine',
  description:
    'Design a modular Java solution for your school portal integrating a Student class with encapsulated roll, name, and marks. Test it against sample data and draft the SQL schema for persistence.',
  steps: [
    'Define class Student with private String name, int roll, double marks.',
    'Implement public void add() and public void display() instance methods.',
    'Create an array of Student objects and populate each index using `new Student()`.',
    'Write a menu-driven switch-case in main() supporting linear search by roll number.',
    'Formulate the corresponding SQL DDL statement `CREATE TABLE Student(...)` with proper constraints.',
  ],
};

// ─── MAIN COMPONENT ───
export function C10_ComputerScienceJavaProgramFactorialSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C10_CS_031,
    title = DEFAULT_PROPS.title || 'Java Factorial & ICSE Suite',
    diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
    misconceptions = DEFAULT_PROPS.misconceptions,
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['compsci'] || { name: 'Computer Science', emoji: '💻', color: 'cyan' };

  // ─── PHASES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── INTERACTIVE VISUALIZER STATES ───
  const [factN, setFactN] = useState<number>(4);
  const [activeTab, setActiveTab] = useState<'recursion' | 'iteration'>('recursion');
  const [animStep, setAnimStep] = useState<number>(0);
  const [primeCandidate, setPrimeCandidate] = useState<number>(29);
  const [primeTestingIndex, setPrimeTestingIndex] = useState<number>(2);
  const [primeFoundFactor, setPrimeFoundFactor] = useState<number | null>(null);
  const [armstrongInput, setArmstrongInput] = useState<number>(153);
  const [fibCount, setFibCount] = useState<number>(7);
  const [patternRows, setPatternRows] = useState<number>(4);
  const [patternType, setPatternType] = useState<'starTriangle' | 'pyramid' | 'numberTriangle'>('starTriangle');
  const [selectedTopology, setSelectedTopology] = useState<'star' | 'bus' | 'ring' | 'mesh' | 'tree'>('star');
  const [activePacketSource, setActivePacketSource] = useState<number>(0);
  const [activePacketDest, setActivePacketDest] = useState<number>(2);
  const [packetProgress, setPacketProgress] = useState<number>(0);
  const [brokenLinkIndex, setBrokenLinkIndex] = useState<number | null>(null);
  const [sqlQueryInput, setSqlQueryInput] = useState<string>('SELECT name, marks FROM students WHERE marks >= 80;');
  const [sqlFilteredCount, setSqlFilteredCount] = useState<number>(2);

  // ─── REFLECTION RESPONSES ───
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // ─── DISCOVERY & PEDAGOGICAL STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [sandboxMode, setSandboxMode] = useState<'factorial' | 'prime' | 'pattern' | 'network' | 'sql'>('factorial');

  // ─── CHALLENGE & ADAPTIVE BKT STATE ───
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

  // Non-MCQ challenge interactive states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Feedback animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT UPDATE ADAPTIVITY EFFECT ───
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

  // ─── CANVAS ANIMATION (Packet Route in Network Topology) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw active packet wave
      const waveY = canvas.height / 2 + Math.sin(t * 3) * 8;
      const progressX = (t * 60) % canvas.width;

      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(progressX, waveY, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '10px monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`JVM Call Stack & Packet Bus: ACTIVE [t=${t.toFixed(1)}s]`, 10, 16);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── HANDLERS ───

  // 1. Show next escalating hint
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

  // 2. Discovery handler
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding prediction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // 3. Advance to exploration
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive lab. Manipulate the algorithms in real-time!');
  }, []);

  // 4. Advance to sandbox
  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free sandbox mode unlocked. Test edge cases without grading pressure.');
  }, []);

  // 5. Advance to challenges
  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode initiated. Solve these ICSE competency problems!');
  }, []);

  // 6. Handle prediction check
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    const isCorrect = idx === PREDICTION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulation to verify.');
  }, []);

  // 7. Handle observation answer
  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Great analytical eye!' : 'Observe how the call stack frames behave.');
  }, []);

  // 8. Factorial slider change
  const handleFactChange = useCallback((newN: number) => {
    setFactN(newN);
    setAnimStep(0);
    audioManager.play('count');
  }, []);

  // 9. Prime number candidate change
  const handlePrimeCandidateChange = useCallback((n: number) => {
    setPrimeCandidate(n);
    let found: number | null = null;
    const limit = Math.floor(Math.sqrt(n));
    for (let i = 2; i <= limit; i++) {
      if (n % i === 0) {
        found = i;
        break;
      }
    }
    setPrimeFoundFactor(found);
    audioManager.play('tap');
  }, []);

  // 10. Drag start handler
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  // 11. Drag drop handler
  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  // 12. Sort move handler
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const arr = prev.length > 0 ? [...prev] : [0, 1, 2, 3];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, []);

  // 13. Sort submit handler
  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3];
    const isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Perfect sequence order!');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors((e) => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      showNextHint();
    }
  }, [sortArrangement, challenge, showNextHint]);

  // 14. Reset Inactivity Timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // 15. Completion handler
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Module completed! Review your ICSE board mastery profile.');
  }, [errors, onComplete]);

  // 16. Next Challenge Handler
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

  // 17. Master Answer Handler
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
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding work.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us study the complete step-by-step ICSE walkthrough.');
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
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  // Inactivity timer cleanup
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── DERIVED VALUES FOR VISUALIZATIONS ───
  const factorialResult = useMemo(() => {
    let res = 1;
    for (let i = 1; i <= factN; i++) res *= i;
    return res;
  }, [factN]);

  const callStackFrames = useMemo(() => {
    const frames = [];
    for (let i = factN; i >= 0; i--) {
      frames.push({
        call: `factorial(${i})`,
        status: i === 0 ? 'Base Case (returns 1)' : `Waiting for factorial(${i - 1})`,
        returnVal: i === 0 ? 1 : null,
      });
    }
    return frames;
  }, [factN]);

  const isPrimeResult = useMemo(() => {
    if (primeCandidate <= 1) return false;
    for (let i = 2; i * i <= primeCandidate; i++) {
      if (primeCandidate % i === 0) return false;
    }
    return true;
  }, [primeCandidate]);

  const armstrongDetails = useMemo(() => {
    const digits = String(armstrongInput).split('').map(Number);
    const sumCubes = digits.reduce((acc, d) => acc + d * d * d, 0);
    const isArmstrong = sumCubes === armstrongInput;
    return { digits, sumCubes, isArmstrong };
  }, [armstrongInput]);

  const fibonacciSequence = useMemo(() => {
    const seq = [0, 1];
    while (seq.length < fibCount) {
      seq.push(seq[seq.length - 1] + seq[seq.length - 2]);
    }
    return seq.slice(0, fibCount);
  }, [fibCount]);

  const patternLines = useMemo(() => {
    const lines = [];
    for (let i = 1; i <= patternRows; i++) {
      if (patternType === 'starTriangle') {
        lines.push('* '.repeat(i).trim());
      } else if (patternType === 'pyramid') {
        const spaces = ' '.repeat((patternRows - i) * 2);
        const stars = '* '.repeat(2 * i - 1).trim();
        lines.push(spaces + stars);
      } else {
        let nums = '';
        for (let j = 1; j <= i; j++) nums += j + ' ';
        lines.push(nums.trim());
      }
    }
    return lines;
  }, [patternRows, patternType]);

  // Spaced Repetition calculation
  const srsIntervalText = useMemo(() => {
    if (errors === 0) return { days: 7, text: 'Review in 7 days', badge: 'Optimal Retention (7 Days)', color: 'border-emerald-500 bg-emerald-950/60 text-emerald-300' };
    if (errors <= 3) return { days: 3, text: 'Review in 3 days', badge: 'Solid Practice Needed (3 Days)', color: 'border-gold-500 bg-gold-950/60 text-gold-300' };
    return { days: 1, text: 'Review in 1 day', badge: 'Immediate Reinforcement (1 Day)', color: 'border-amber-500 bg-amber-950/60 text-amber-300' };
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 pb-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/60 border border-gold-800 rounded-2xl">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                ICSE Class 10
              </span>
              <span className="text-xs font-mono text-slate-400">c10_cs_031–c10_cs_043</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/40 via-slate-900 to-gold-950/30 rounded-2xl border border-gold-800/40 shadow-inner">
            <span className="text-xs uppercase tracking-wider font-bold text-gold-400 bg-gold-950/80 px-3 py-1 rounded-full border border-gold-700">
              Board Mission Scenario
            </span>
            <h2 className="text-xl font-bold text-white mt-3">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800">
            <h3 className="text-base font-semibold text-gold-300 mb-4 flex items-center gap-2">
              <span>⚡</span> Curiosity Hook: Think Before We Compute
            </h3>
            <p className="text-white text-base font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${opt}`}
                  className={`text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-slate-800/40 border-slate-700 text-slate-500'
                      : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:border-gold-500 hover:bg-slate-800'
                  }`}
                >
                  <span className="inline-block w-6 font-bold text-gold-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Recursion without terminating base conditions blows the stack memory.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold shadow-lg shadow-gold-600/30 text-sm"
                >
                  Enter Interactive Simulation Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORE PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">
              Module Step <strong className="text-gold-400">{currentSlide + 1}</strong> of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentSlide ? 'w-6 bg-gold-500' : 'w-2 bg-slate-700'
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
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-6"
            >
              <div>
                <h2 className="text-lg font-bold text-gold-300">{EXPLORATION_STEPS[currentSlide].title}</h2>
                <p className="text-sm text-amber-300 mt-1 flex items-center gap-1.5">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── SLIDE 0: Factorial Stack vs Loop Visualizer (SVG #1 included) ─── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Visualizer Column */}
                    <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-300">
                          Calculate <strong className="text-gold-400 font-mono text-base">{factN}!</strong>
                        </label>
                        <span className="text-xs px-2.5 py-1 bg-gold-950 border border-gold-800 text-gold-300 rounded-lg font-mono">
                          Value = {factorialResult.toLocaleString()}
                        </span>
                      </div>

                      <input
                        type="range"
                        min={0}
                        max={7}
                        value={factN}
                        aria-label="Factorial input value"
                        onChange={(e) => handleFactChange(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                      />

                      {/* Topic-Specific SVG #1: Recursion Tree & Call Stack */}
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-xs font-mono text-gold-300 mb-2 block font-semibold">
                          SVG 1: JVM Recursion Tree & Unwinding Path
                        </span>
                        <svg viewBox="0 0 450 160" className="w-full h-40">
                          <defs>
                            <linearGradient id="stackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#0891b2" />
                              <stop offset="100%" stopColor="#4f46e5" />
                            </linearGradient>
                          </defs>
                          {/* Winding Arrow (Call Down) */}
                          <path d="M 40 20 L 40 140" stroke="#06b6d4" strokeWidth="2.5" markerEnd="url(#arrow)" />
                          <text x="50" y="30" fill="#06b6d4" fontSize="10" fontFamily="monospace">Push: fact(n) → fact(n-1)</text>

                          {/* Unwinding Arrow (Return Up) */}
                          <path d="M 410 140 L 410 20" stroke="#10b981" strokeWidth="2.5" strokeDasharray="4 2" />
                          <text x="310" y="30" fill="#10b981" fontSize="10" fontFamily="monospace">Unwind: return n * fact(n-1)</text>

                          {/* Stack Frame Boxes */}
                          {[...Array(Math.min(factN + 1, 5))].map((_, i) => {
                            const currentVal = factN - i;
                            const yPos = 20 + i * 26;
                            const isBase = currentVal === 0;
                            return (
                              <g key={i}>
                                <rect
                                  x="120"
                                  y={yPos}
                                  width="210"
                                  height="22"
                                  rx="5"
                                  fill={isBase ? '#064e3b' : '#1e293b'}
                                  stroke={isBase ? '#10b981' : '#38bdf8'}
                                  strokeWidth="1.5"
                                />
                                <text
                                  x="130"
                                  y={yPos + 15}
                                  fill={isBase ? '#34d399' : '#f8fafc'}
                                  fontSize="10"
                                  fontFamily="monospace"
                                  fontWeight="bold"
                                >
                                  fact({currentVal}) {isBase ? '== 1 (Base)' : `→ ${currentVal} * fact(${currentVal - 1})`}
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                      </div>

                      {/* Stack Visualization Table */}
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-xs font-mono text-slate-400 mb-2 block">
                          JVM Call Stack Frame Sequence:
                        </span>
                        <div className="space-y-1 max-h-36 overflow-y-auto">
                          {callStackFrames.map((frame, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`p-1.5 rounded border text-xs font-mono flex items-center justify-between ${
                                frame.call === 'factorial(0)'
                                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                                  : 'bg-slate-800/80 border-slate-700 text-gold-200'
                              }`}
                            >
                              <span>{frame.call}</span>
                              <span className="text-slate-400 text-[11px]">{frame.status}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Dual Representation (Code + Trace) */}
                    <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setActiveTab('recursion')}
                          className={`px-3 py-1 text-xs rounded-lg font-mono font-bold ${
                            activeTab === 'recursion'
                              ? 'bg-gold-600 text-white'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          Recursive Code
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setActiveTab('iteration')}
                          className={`px-3 py-1 text-xs rounded-lg font-mono font-bold ${
                            activeTab === 'iteration'
                              ? 'bg-gold-600 text-white'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          Iterative for-Loop
                        </motion.button>
                      </div>

                      <div className="p-4 bg-slate-900/90 rounded-lg border border-slate-800 font-mono text-xs leading-relaxed text-slate-300 overflow-x-auto">
                        {activeTab === 'recursion' ? (
                          <pre className="text-gold-300">
{`int factorial(int n) {
    if (n == 0)      // BASE CASE
        return 1;
    else             // RECURSIVE CASE
        return n * factorial(n - 1);
}`}
                          </pre>
                        ) : (
                          <pre className="text-emerald-300">
{`int fact = 1;        // ACCUMULATOR
for (int i = 1; i <= n; i++) {
    fact = fact * i; // COMPOUND MULTIPLY
}
System.out.println(fact);`}
                          </pre>
                        )}
                      </div>

                      <div className="text-xs text-slate-400 leading-relaxed bg-slate-900/40 p-3 rounded-lg">
                        <strong>Memory Contrast:</strong> Iteration consumes <em>O(1) auxiliary space</em> (1 variable), whereas recursion pushes <em>O(N) stack frames</em> onto the JVM runtime stack.
                      </div>
                    </div>
                  </div>

                  {/* Observation Question for Step 0 */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-gold-900/50">
                    <p className="text-xs font-semibold text-gold-300 mb-2">
                      🔬 Scientific Observation: {OBSERVATION_QUESTIONS[0].question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservation(i)}
                          className={`text-left p-2.5 rounded-lg text-xs font-medium border ${
                            observationAnswered
                              ? i === OBSERVATION_QUESTIONS[0].correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-slate-900 border-slate-800 text-slate-500'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-gold-500'
                          }`}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: Prime Number Detective & √N Boundary (SVG #2 included) ─── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {/* Predict-then-check block */}
                  {!predictionMade ? (
                    <div className="p-4 bg-slate-950 rounded-xl border border-gold-800/50">
                      <p className="text-xs font-semibold text-gold-300 mb-2">
                        🔮 Make a Prediction: {PREDICTION_QUESTIONS[0].question}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="text-left p-2.5 rounded-lg text-xs bg-slate-900 border border-slate-800 hover:border-gold-500 text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-gold-950/40 rounded-lg border border-gold-800 text-xs text-gold-300 flex items-center justify-between">
                      <span>✓ {PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                      <span className="font-bold">Verified Factor Search Active</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-slate-300">
                          Candidate Number N: <strong className="text-gold-400 font-mono">{primeCandidate}</strong>
                        </label>
                        <span
                          className={`text-xs px-2.5 py-1 rounded-lg font-bold ${
                            isPrimeResult
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                              : 'bg-rose-950 text-rose-300 border border-rose-500'
                          }`}
                        >
                          {isPrimeResult ? 'PRIME NUMBER' : `COMPOSITE (Divisible by ${primeFoundFactor})`}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {[2, 7, 9, 29, 49, 91, 97].map((num) => (
                          <motion.button
                            key={num}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePrimeCandidateChange(num)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold ${
                              primeCandidate === num
                                ? 'bg-gold-600 text-white'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            n = {num}
                          </motion.button>
                        ))}
                      </div>

                      {/* Topic-Specific SVG #2: Square Root Divisor Boundary Gauge */}
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-xs font-mono text-gold-300 mb-1 block font-semibold">
                          SVG 2: Divisor Search Boundary [2 → √{primeCandidate}]
                        </span>
                        <svg viewBox="0 0 420 100" className="w-full h-24">
                          {/* Number Line */}
                          <line x1="30" y1="50" x2="390" y2="50" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
                          {/* Active search boundary highlight */}
                          {(() => {
                            const sqrtVal = Math.sqrt(primeCandidate);
                            const maxScale = Math.max(10, primeCandidate);
                            const boundaryX = 30 + (sqrtVal / maxScale) * 360;
                            const targetX = 30 + (primeCandidate / maxScale) * 360;
                            return (
                              <g>
                                <line x1="30" y1="50" x2={boundaryX} stroke="#06b6d4" strokeWidth="6" strokeLinecap="round" />
                                <circle cx="30" cy="50" r="6" fill="#10b981" />
                                <text x="30" y="72" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">i=2</text>
                                
                                <line x1={boundaryX} y1="20" x2={boundaryX} y2="80" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                                <circle cx={boundaryX} cy="50" r="7" fill="#f59e0b" />
                                <text x={boundaryX} y="35" textAnchor="middle" fill="#fcd34d" fontSize="10" fontFamily="monospace" fontWeight="bold">
                                  √{primeCandidate} ≈ {sqrtVal.toFixed(1)}
                                </text>
                                <text x={boundaryX} y="95" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                                  Loop stops at {Math.floor(sqrtVal)}
                                </text>

                                <circle cx={targetX} cy="50" r="6" fill="#ef4444" />
                                <text x={targetX} y="72" textAnchor="middle" fill="#fca5a5" fontSize="10" fontFamily="monospace">N={primeCandidate}</text>
                              </g>
                            );
                          })()}
                        </svg>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono space-y-1">
                        <div className="text-slate-400">
                          Square root bound: <strong>√{primeCandidate} ≈ {Math.sqrt(primeCandidate).toFixed(2)}</strong>
                        </div>
                        <div className="text-gold-300">
                          Loop range: <code>i = 2; i * i &lt;= {primeCandidate}; (i up to {Math.floor(Math.sqrt(primeCandidate))})</code>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                      <span className="text-slate-400 block font-bold">Standard ICSE Prime Method:</span>
                      <pre className="text-gold-300 p-3 bg-slate-900 rounded-lg overflow-x-auto">
{`boolean isPrime = true;
if (n <= 1) isPrime = false;
for (int i = 2; i * i <= n; i++) {
    if (n % i == 0) {
        isPrime = false;
        break; // Early exit
    }
}`}
                      </pre>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        <strong>Why √N works:</strong> If a × b = n, one factor must be ≤ √n and the other ≥ √n. Finding no divisors up to √n guarantees no factors exist above it!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: Special Numbers (Armstrong & Fibonacci with SVG #3) ─── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Armstrong Box with Topic-Specific SVG #3 */}
                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                      Armstrong Number (Sum of Digit Cubes)
                    </span>
                    <div className="flex gap-2">
                      {[153, 370, 371, 407, 125].map((num) => (
                        <motion.button
                          key={num}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setArmstrongInput(num);
                            audioManager.play('tap');
                          }}
                          className={`px-3 py-1 text-xs font-mono font-bold rounded-lg ${
                            armstrongInput === num
                              ? 'bg-gold-600 text-white'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {num}
                        </motion.button>
                      ))}
                    </div>

                    {/* Topic Specific SVG #3: Digit Extractor Pipeline */}
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-xs font-mono text-gold-300 mb-1 block font-semibold">
                        SVG 3: Modulo & Division Digit Slicing Pipeline
                      </span>
                      <svg viewBox="0 0 420 120" className="w-full h-28">
                        {/* Pipeline flow */}
                        <rect x="20" y="30" width="80" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="60" y="52" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">N={armstrongInput}</text>
                        <text x="60" y="68" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">Original</text>

                        {/* Modulo Arrow */}
                        <path d="M 100 45 L 170 45" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
                        <text x="135" y="38" textAnchor="middle" fill="#10b981" fontSize="9" fontFamily="monospace">% 10</text>

                        {/* Cube accumulator */}
                        <rect x="170" y="25" width="120" height="60" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                        <text x="230" y="48" textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold">d³ Sum</text>
                        <text x="230" y="66" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontFamily="monospace">={armstrongDetails.sumCubes}</text>

                        {/* Truncate Arrow */}
                        <path d="M 290 55 L 340 55" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
                        <text x="315" y="48" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="monospace">/ 10</text>

                        {/* Truncated N */}
                        <rect x="340" y="35" width="65" height="40" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                        <text x="372" y="60" textAnchor="middle" fill="#fcd34d" fontSize="10" fontFamily="monospace">n = {Math.floor(armstrongInput / 10)}</text>
                      </svg>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono space-y-2">
                      <div className="flex items-center gap-2">
                        {armstrongDetails.digits.map((d, i) => (
                          <span key={i} className="px-2 py-1 bg-slate-800 rounded text-gold-300">
                            {d}³ = {d * d * d}
                          </span>
                        ))}
                      </div>
                      <div className="text-slate-300">
                        Sum = {armstrongDetails.digits.map((d) => `${d}³`).join(' + ')} ={' '}
                        <strong>{armstrongDetails.sumCubes}</strong>
                      </div>
                      <div
                        className={
                          armstrongDetails.isArmstrong ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'
                        }
                      >
                        Verdict: {armstrongDetails.isArmstrong ? '✓ Perfect Armstrong Match' : '✗ Not Armstrong'}
                      </div>
                    </div>
                  </div>

                  {/* Fibonacci Box */}
                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                      Fibonacci Series (c = a + b)
                    </span>
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <label>Terms to Generate: <strong className="text-gold-400 font-mono">{fibCount}</strong></label>
                      <input
                        type="range"
                        min={3}
                        max={10}
                        value={fibCount}
                        aria-label="Fibonacci term count"
                        onChange={(e) => {
                          setFibCount(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-32 accent-gold-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs flex flex-wrap gap-2">
                      {fibonacciSequence.map((val, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="px-2.5 py-1 bg-gold-950/80 border border-gold-700 text-gold-200 rounded-lg font-bold"
                        >
                          {val}
                        </motion.span>
                      ))}
                    </div>
                    <pre className="text-[11px] font-mono text-slate-400 bg-slate-900 p-2 rounded">
{`int a = 0, b = 1;
System.out.print(a + " " + b);
for(int i = 3; i <= n; i++) {
    int c = a + b;
    System.out.print(" " + c);
    a = b; b = c;
}`}
                    </pre>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: Dynamic Pattern Matrix ─── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                      Nested Loop Pattern Controller
                    </span>

                    <div className="flex gap-2">
                      {(['starTriangle', 'pyramid', 'numberTriangle'] as const).map((mode) => (
                        <motion.button
                          key={mode}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setPatternType(mode);
                            audioManager.play('tap');
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize ${
                            patternType === mode
                              ? 'bg-gold-600 text-white'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {mode === 'starTriangle' ? 'Star Right △' : mode === 'pyramid' ? 'Pyramid ▲' : 'Number 1-2-3'}
                        </motion.button>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <label>Rows (N): <strong className="text-gold-400 font-mono">{patternRows}</strong></label>
                      <input
                        type="range"
                        min={2}
                        max={6}
                        value={patternRows}
                        aria-label="Pattern row count"
                        onChange={(e) => {
                          setPatternRows(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-40 accent-gold-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-gold-300 flex flex-col justify-center items-center min-h-[160px] bg-grid-pattern">
                    <div className="space-y-1 text-center">
                      {patternLines.map((line, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="tracking-widest font-black text-sm text-gold-400"
                        >
                          {line}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: Network Topologies (SVG #4 included) ─── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {(['star', 'bus', 'ring', 'mesh', 'tree'] as const).map((top) => (
                      <motion.button
                        key={top}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedTopology(top);
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                          selectedTopology === top
                            ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {top} Topology
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG Topology Diagram (SVG #4) */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-center items-center">
                    <svg viewBox="0 0 500 240" className="w-full max-w-lg h-52">
                      {selectedTopology === 'star' && (
                        <g>
                          {/* Central Switch */}
                          <rect x="220" y="90" width="60" height="60" rx="10" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                          <text x="250" y="125" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">SWITCH</text>
                          {/* Satellite Nodes */}
                          {[
                            { x: 90, y: 40, id: 'PC-1' },
                            { x: 410, y: 40, id: 'PC-2' },
                            { x: 90, y: 200, id: 'PC-3' },
                            { x: 410, y: 200, id: 'Server' },
                          ].map((node, i) => (
                            <g key={i}>
                              <line x1="250" y1="120" x2={node.x} y2={node.y} stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                              <circle cx={node.x} cy={node.y} r="22" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
                              <text x={node.x} y={node.y + 4} textAnchor="middle" fill="white" fontSize="9">{node.id}</text>
                            </g>
                          ))}
                        </g>
                      )}

                      {selectedTopology === 'bus' && (
                        <g>
                          {/* Backbone Line */}
                          <line x1="40" y1="120" x2="460" y2="120" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                          <rect x="25" y="105" width="15" height="30" fill="#ef4444" rx="2" />
                          <rect x="460" y="105" width="15" height="30" fill="#ef4444" rx="2" />
                          <text x="250" y="140" textAnchor="middle" fill="#fcd34d" fontSize="10">Shared Backbone Cable</text>
                          {[80, 180, 280, 380].map((x, i) => (
                            <g key={i}>
                              <line x1={x} y1="120" x2={x} y2={i % 2 === 0 ? 50 : 190} stroke="#94a3b8" strokeWidth="2" />
                              <rect x={x - 25} y={i % 2 === 0 ? 25 : 170} width="50" height="35" rx="6" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.5" />
                              <text x={x} y={i % 2 === 0 ? 46 : 191} textAnchor="middle" fill="white" fontSize="9">Node {i + 1}</text>
                            </g>
                          ))}
                        </g>
                      )}

                      {selectedTopology === 'ring' && (
                        <g>
                          <circle cx="250" cy="120" r="75" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="6 3" />
                          {[0, 72, 144, 216, 288].map((angle, i) => {
                            const rad = (angle * Math.PI) / 180;
                            const cx = 250 + 75 * Math.cos(rad);
                            const cy = 120 + 75 * Math.sin(rad);
                            return (
                              <g key={i}>
                                <circle cx={cx} cy={cy} r="18" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                                <text x={cx} y={cy + 4} textAnchor="middle" fill="white" fontSize="8">N{i + 1}</text>
                              </g>
                            );
                          })}
                          <text x="250" y="125" textAnchor="middle" fill="#6ee7b7" fontSize="10">Token →</text>
                        </g>
                      )}

                      {selectedTopology === 'mesh' && (
                        <g>
                          {[
                            { x: 150, y: 50 },
                            { x: 350, y: 50 },
                            { x: 400, y: 170 },
                            { x: 250, y: 210 },
                            { x: 100, y: 170 },
                          ].map((n1, i, arr) => (
                            <g key={i}>
                              {arr.map((n2, j) => (
                                <line key={j} x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke="#6366f1" strokeWidth="1" opacity="0.6" />
                              ))}
                              <circle cx={n1.x} cy={n1.y} r="18" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                              <text x={n1.x} y={n1.y + 4} textAnchor="middle" fill="white" fontSize="9">M{i + 1}</text>
                            </g>
                          ))}
                        </g>
                      )}

                      {selectedTopology === 'tree' && (
                        <g>
                          {/* Root */}
                          <circle cx="250" cy="35" r="20" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                          <text x="250" y="39" textAnchor="middle" fill="white" fontSize="9">Root</text>
                          {/* Branch Switches */}
                          <line x1="250" y1="55" x2="160" y2="105" stroke="#94a3b8" strokeWidth="2" />
                          <line x1="250" y1="55" x2="340" y2="105" stroke="#94a3b8" strokeWidth="2" />
                          <rect x="135" y="95" width="50" height="30" rx="6" fill="#1e293b" stroke="#38bdf8" />
                          <text x="160" y="113" textAnchor="middle" fill="white" fontSize="8">Floor 1</text>
                          <rect x="315" y="95" width="50" height="30" rx="6" fill="#1e293b" stroke="#38bdf8" />
                          <text x="340" y="113" textAnchor="middle" fill="white" fontSize="8">Floor 2</text>
                          {/* Leaf Nodes */}
                          {[100, 160, 220, 280, 340, 400].map((x, i) => (
                            <g key={i}>
                              <line x1={i < 3 ? 160 : 340} y1="125" x2={x} y2="185" stroke="#475569" strokeWidth="1.5" />
                              <circle cx={x} cy={195} r="14" fill="#0f172a" stroke="#64748b" />
                              <text x={x} y={198} textAnchor="middle" fill="#cbd5e1" fontSize="8">PC</text>
                            </g>
                          ))}
                        </g>
                      )}
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Exploration Navigation */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2 rounded-xl bg-slate-800 text-slate-300 disabled:opacity-40 text-sm font-semibold"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('tap');
                }}
                className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30"
              >
                Launch Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE (Free Play) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-emerald-300">Free Exploration Sandbox</h2>
              <p className="text-xs text-slate-400 mt-1">
                Zero grading stress. Test recursive boundaries, composite prime candidates, and SQL queries.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
            >
              I am Ready for Board Challenges →
            </motion.button>
          </div>

          <div className="flex gap-2">
            {(['factorial', 'prime', 'network', 'sql'] as const).map((mode) => (
              <motion.button
                key={mode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSandboxMode(mode);
                  audioManager.play('tap');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase ${
                  sandboxMode === mode
                    ? 'bg-gold-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {mode} Lab
              </motion.button>
            ))}
          </div>

          {/* Sandbox Visualizer Display */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            {sandboxMode === 'factorial' && (
              <div className="space-y-4">
                <label className="text-xs text-slate-300">Factorial Value: {factN}</label>
                <input
                  type="range"
                  min={0}
                  max={8}
                  value={factN}
                  aria-label="Sandbox Factorial Input"
                  onChange={(e) => handleFactChange(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
                <div className="p-4 bg-slate-950 rounded-xl font-mono text-xs text-gold-300">
                  {factN}! = {factorialResult.toLocaleString()}
                </div>
              </div>
            )}

            {sandboxMode === 'prime' && (
              <div className="space-y-4">
                <label className="text-xs text-slate-300">Test Prime Candidate: {primeCandidate}</label>
                <input
                  type="number"
                  value={primeCandidate}
                  aria-label="Sandbox Prime Input"
                  onChange={(e) => handlePrimeCandidateChange(Number(e.target.value))}
                  className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-sm w-44 block"
                />
                <p className={isPrimeResult ? 'text-emerald-400 font-bold text-sm' : 'text-rose-400 font-bold text-sm'}>
                  {isPrimeResult ? `✓ ${primeCandidate} is a valid PRIME.` : `✗ ${primeCandidate} is COMPOSITE.`}
                </p>
              </div>
            )}

            {sandboxMode === 'sql' && (
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-300">Live SQL Query Simulator (students table)</span>
                <input
                  type="text"
                  value={sqlQueryInput}
                  aria-label="SQL query input"
                  onChange={(e) => {
                    setSqlQueryInput(e.target.value);
                    audioManager.play('tap');
                  }}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-gold-300"
                />
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="p-1.5">roll_no</th>
                        <th className="p-1.5">name</th>
                        <th className="p-1.5">city</th>
                        <th className="p-1.5">marks</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300">
                      <tr className="border-b border-slate-800/50">
                        <td className="p-1.5">1</td>
                        <td className="p-1.5">Ananya Sharma</td>
                        <td className="p-1.5">Delhi</td>
                        <td className="p-1.5 text-emerald-400">88</td>
                      </tr>
                      <tr className="border-b border-slate-800/50">
                        <td className="p-1.5">2</td>
                        <td className="p-1.5">Ravi Iyer</td>
                        <td className="p-1.5">Mumbai</td>
                        <td className="p-1.5 text-emerald-400">82</td>
                      </tr>
                      <tr>
                        <td className="p-1.5">3</td>
                        <td className="p-1.5">Priya Nair</td>
                        <td className="p-1.5">Bengaluru</td>
                        <td className="p-1.5 text-slate-400">45</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Header Animation Canvas Indicator */}
          <canvas ref={canvasRef} width={500} height={32} className="w-full rounded-xl bg-slate-950 border border-slate-800" />

          {/* Challenge Status Bar */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-500'
                    : difficulty === 'standard'
                    ? 'bg-gold-950 text-gold-400 border-gold-500'
                    : 'bg-rose-950 text-rose-400 border-rose-500'
                }`}
              >
                {difficulty.toUpperCase()} TIER
              </motion.span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-gold-300 border border-gold-700/50">
                NEP 2020: {challenge.competencyLevel.toUpperCase()}
              </span>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Score: <strong className="text-gold-400">{scoreBreakdown.correct}</strong> / {scoreBreakdown.total}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-gold-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Box */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-semibold text-white leading-relaxed">{challenge.question}</h3>

            {/* MCQ Type */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`text-left p-4 rounded-xl text-sm transition-all border ${
                        wrongFlash
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-gold-500 hover:bg-slate-800'
                      }`}
                    >
                      <span className="font-bold text-gold-400 mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag-label Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      ☰ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {challenge.dragItems.map((target, i) => (
                    <div
                      key={i}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed text-center min-h-[90px] flex flex-col justify-center items-center ${
                        droppedLabels[target.targetId]
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">
                        {target.targetId.replace('top_', '')}
                      </span>
                      <strong className="text-xs">{droppedLabels[target.targetId] || 'Drop Here'}</strong>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-gold-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-gold-600/30"
                >
                  Verify Topology Labels
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                {(sortArrangement.length > 0
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
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
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs font-mono flex items-center justify-between cursor-grab"
                  >
                    <span>
                      <strong className="text-gold-400 mr-2">{displayIdx + 1}.</strong> {item}
                    </span>
                    <span className="text-slate-500 text-xs">☰ Drag</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  className="px-5 py-2 bg-gold-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-gold-600/30"
                >
                  Confirm SQL Order
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {challenge.type === 'numeric' && (
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="number"
                  value={numericInput}
                  aria-label="Numeric answer input"
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value"
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48 focus:border-gold-500 outline-none"
                />
                <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(numericInput)}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-600/30"
                >
                  Submit
                </motion.button>
              </div>
            )}

            {/* Construct Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setConstructParts((prev) => [...prev, part]);
                        audioManager.play('tap');
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-gold-300 rounded-lg text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                      className="px-3 py-1 bg-gold-900/60 border border-gold-600 text-gold-200 rounded-lg font-mono text-xs cursor-pointer hover:bg-rose-950"
                    >
                      {part} ✕
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 italic">Click parts above to construct your line</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-5 py-2 bg-gold-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-gold-600/30"
                >
                  Validate Constructed Code
                </motion.button>
              </div>
            )}

            {/* Progressive Explanation Reveal */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-amber-950/40 to-slate-900 rounded-2xl border border-amber-700/60 space-y-3"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Step-by-Step ICSE Board Walkthrough:
                </span>

                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-amber-100/90 leading-relaxed font-sans"
                    >
                      <strong className="text-amber-400 mr-1.5">{i + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-2 bg-amber-700 text-white rounded-xl text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Review →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE (With Mandatory Reflection & SRS Visibility) ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-gold-950 via-slate-900 to-gold-950 rounded-3xl border border-gold-800 shadow-2xl text-center space-y-4">
            <span className="text-5xl">🎓</span>
            <h2 className="text-2xl font-black text-white">ICSE Module Certified Complete!</h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              You have completed all algorithmic traces, topology investigations, SQL queries, and exam strategy routines.
            </p>

            <div className="flex justify-center gap-6 py-4">
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block uppercase">Final Score</span>
                <strong className="text-2xl font-mono text-gold-400">{Math.max(0, 100 - errors * 5)}%</strong>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block uppercase">BKT Mastery</span>
                <strong className="text-2xl font-mono text-emerald-400 capitalize">{masteryLevel}</strong>
              </div>
            </div>

            {/* Motivational Feedback */}
            <div className="p-4 bg-emerald-950/50 rounded-xl border border-emerald-700 text-xs text-emerald-300 font-medium">
              {errors === 0
                ? '🌟 PERFECT SCORE: Full marks predicted in ICSE Section A & Section B!'
                : errors <= 3
                ? '👍 Strong Performance: Minor syntax adjustments needed for full marks.'
                : '📚 Solid Effort: Re-read the recursion base case and square-root optimization rules.'}
            </div>
          </div>

          {/* ─── SPACED REPETITION SCHEDULE VISIBILITY ─── */}
          <div className={`p-6 rounded-2xl border ${srsIntervalText.color} space-y-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">📅</span>
                <h3 className="text-sm font-bold uppercase tracking-wider">Spaced Repetition Schedule</h3>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-900 border border-slate-700">
                {srsIntervalText.badge}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-200">
              Based on your performance ({errors} error{errors === 1 ? '' : 's'}), our SM-2 algorithm recommends you{' '}
              <strong className="text-white underline">{srsIntervalText.text}</strong> to lock these recursion stack and SQL concepts into long-term board memory.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
              <span>Next Review Target:</span>
              <span className="font-mono text-gold-300 font-semibold">
                {new Date(Date.now() + srsIntervalText.days * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* ─── POST-COMPLETION REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-gold-300 flex items-center gap-2">
              <span>💭</span> Metacognitive Reflection & Consolidation
            </h3>
            <p className="text-xs text-slate-400">
              Take a moment to solidify your understanding before closing the simulator.
            </p>

            <div className="space-y-4 pt-2">
              {/* Question 1 */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block">
                  1. What was the most surprising thing you learned?
                </label>
                <input
                  type="text"
                  placeholder="e.g., How factorial(0) must return 1 to preserve products..."
                  value={reflectionAnswers.surprising}
                  onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, surprising: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-gold-200 focus:border-gold-500 outline-none"
                />
              </div>

              {/* Question 2 */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block">
                  2. How would you explain this to a friend?
                </label>
                <input
                  type="text"
                  placeholder="e.g., Recursion is like delegating a smaller task until reaching the simplest base answer..."
                  value={reflectionAnswers.explain}
                  onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, explain: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-gold-200 focus:border-gold-500 outline-none"
                />
              </div>

              {/* Question 3 */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block">
                  3. Where in real life might you use this?
                </label>
                <input
                  type="text"
                  placeholder="e.g., Designing school database queries or debugging bank network topologies..."
                  value={reflectionAnswers.realLife}
                  onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, realLife: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-gold-200 focus:border-gold-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Misconceptions Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Detected Diagnostic Remediation Gaps:
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Board Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real World Activity */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-mono text-gold-400 font-bold">{i + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION ENGINE NOTIFICATIONS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_ComputerScienceJavaProgramFactorialSim;
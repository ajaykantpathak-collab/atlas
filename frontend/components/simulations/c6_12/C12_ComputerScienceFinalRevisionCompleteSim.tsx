'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C12_CS_081 = 'c12_cs_081';
const NODE_C12_CS_082 = 'c12_cs_082';
const NODE_C12_CS_083 = 'c12_cs_083';
const NODE_C12_CS_084 = 'c12_cs_084';
const NODE_C12_CS_085 = 'c12_cs_085';
const ALL_NODE_IDS = [NODE_C12_CS_081, NODE_C12_CS_082, NODE_C12_CS_083, NODE_C12_CS_084, NODE_C12_CS_085];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Board Exam Command Center',
  intro: 'You are 48 hours away from the ISC Class 12 Computer Science Theory Examination. You have been selected as the Chief Peer Mentor for your school in Kolkata to run a live final revision marathon.',
  context: 'Your challenge: Audit 5 core mission zones — Full Syllabus Integration, Java Programming & Data Structures, Boolean Algebra & Digital Circuits, Exam Day Strategy & Time Budgeting, and the Beyond-ISC Bridge to University CS & Competitive Coding.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In a 100-mark, 3-hour ISC Computer Science Paper with a 15-minute mandatory reading period, what is the single most lethal strategic blunder according to CISCE examiner reports?',
  options: [
    'Writing the entire 40-mark compulsory Section A in rigid sequential order without scanning Sections B and C during reading time',
    'Using recursion with a base case instead of a while loop',
    'Using an octal-to-binary encoder with 8 inputs and 3 OR gates',
    'Allocating 1.5 minutes per mark across all three sections',
  ],
  correctIndex: 0,
  hintAfter: 'Reading time is not for writing — it is a strategic radar sweep to rank questions and lock in high-confidence marks!',
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

// ─── CHALLENGES ARRAY ───
const CHALLENGES: Challenge[] = [
  // FOUNDATION 1 (c12_cs_081) - Recall
  {
    id: 'ch_01',
    nodeId: NODE_C12_CS_081,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following represents the correct sequence of steps to establish a JDBC connection in a standard Java application?',
    options: [
      'Load Driver → Create Connection → Create Statement → Execute Query → Process ResultSet → Close Resources',
      'Create Connection → Load Driver → Execute Query → Create Statement → Close Resources',
      'Execute Query → Create Statement → Load Driver → Process ResultSet → Close Resources',
      'Load Driver → Execute Query → Create Connection → Process ResultSet → Close Resources',
    ],
    correctIndex: 0,
    explanation: 'The canonical JDBC lifecycle begins by loading the driver class, establishing the physical database connection via DriverManager.getConnection, instantiating a Statement or PreparedStatement, executing the SQL query, traversing the ResultSet, and closing resources in reverse order to prevent connection leaks.',
    hints: [
      'Think about what must exist before a network socket can be opened to the database.',
      'The driver must be known to JVM before DriverManager can open a connection.',
      'Always close resources at the very end in reverse order: ResultSet, Statement, Connection.',
    ],
    misconceptionIndex: 0,
  },
  // FOUNDATION 2 (c12_cs_082) - Understanding
  {
    id: 'ch_02',
    nodeId: NODE_C12_CS_082,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does CISCE penalize using (str1 == str2) or (new StringBuffer(str).reverse().toString() == str) when testing for a palindrome in Class 12 board answers?',
    options: [
      'The == operator compares heap object memory references rather than lexical content, and StringBuffer hides the two-pointer algorithmic logic',
      'The == operator performs case-insensitive comparisons automatically in Java',
      'StringBuffer is deprecated in Java 17 and throws a runtime exception',
      'CISCE mandates that only bitwise operators may be used for string comparison',
    ],
    correctIndex: 0,
    explanation: 'In Java, the == operator checks reference equality (memory addresses), not character content. Using == on distinct string objects yields false even if contents match. Furthermore, examiners expect explicit algorithmic index checks such as s.charAt(i) == s.charAt(len - 1 - i) rather than high-level library shortcuts.',
    hints: [
      'In Java, String is an object reference type, not a primitive.',
      'Reference equality is not content equality.',
      'Use s.charAt(i) loop comparisons or .equals() to check actual character values.',
    ],
    misconceptionIndex: 1,
  },
  // FOUNDATION 3 (c12_cs_083) - Recall
  {
    id: 'ch_03',
    nodeId: NODE_C12_CS_083,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What are the Boolean expressions for the Sum (S) and Carry-out (Cout) of a Full Adder with inputs A, B, and Carry-in (Cin)?',
    options: [
      'S = A ⊕ B ⊕ Cin, Cout = AB + BCin + ACin',
      'S = A + B + Cin, Cout = A ⊕ B ⊕ Cin',
      'S = AB + BCin + ACin, Cout = A ⊕ B ⊕ Cin',
      'S = (A ⊕ B)Cin, Cout = AB + Cin',
    ],
    correctIndex: 0,
    explanation: 'A Full Adder computes the binary sum of three single bits. The Sum output is 1 when an odd number of inputs are 1 (3-input XOR: A ⊕ B ⊕ Cin). The Carry output is 1 when at least two inputs are 1 (majority function: AB + BCin + ACin).',
    hints: [
      'The Sum bit checks for odd parity among the three inputs.',
      'The Carry bit turns high whenever 2 or 3 inputs are high.',
      'S = A ⊕ B ⊕ Cin and Cout = AB + BCin + ACin.',
    ],
    misconceptionIndex: 2,
  },
  // FOUNDATION 4 (c12_cs_084) - Recall
  {
    id: 'ch_04',
    nodeId: NODE_C12_CS_084,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a 100-mark, 3-hour ISC theory paper, if you strictly budget 1.5 minutes per mark, how many minutes are reserved as an emergency buffer for checking syntax, K-maps, and question numbers?',
    correctAnswer: 30,
    tolerance: 0,
    unit: 'minutes',
    explanation: '100 marks × 1.5 minutes/mark = 150 minutes of active writing. Since the total time is 180 minutes, 180 - 150 = 30 minutes remain for planning, rough work, and end-of-paper verification.',
    hints: [
      'Multiply 100 marks by 1.5 minutes.',
      '100 × 1.5 = 150 minutes.',
      'Subtract 150 from the total 180 minutes of the exam.',
    ],
  },
  // FOUNDATION 5 (c12_cs_085) - Recall
  {
    id: 'ch_05',
    nodeId: NODE_C12_CS_085,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which cloud computing service model delivers virtualized raw hardware resources (such as AWS EC2 or Google Compute Engine virtual servers)?',
    options: [
      'IaaS (Infrastructure as a Service)',
      'PaaS (Platform as a Service)',
      'SaaS (Software as a Service)',
      'FaaS (Function as a Service only)',
    ],
    correctIndex: 0,
    explanation: 'IaaS provides raw infrastructure including virtual machines, storage, and networking. PaaS provides managed development environments (like Google App Engine), and SaaS delivers turnkey end-user software applications (like Microsoft 365 or Google Workspace).',
    hints: [
      'Think of raw infrastructure: virtual machines and network hardware.',
      'Infrastructure is the foundation level of cloud computing.',
      'IaaS stands for Infrastructure as a Service.',
    ],
  },
  // FOUNDATION 6 (c12_cs_082) - Drag Label
  {
    id: 'ch_06',
    nodeId: NODE_C12_CS_082,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each OOP role to its matching position in a Class 12 Java inheritance hierarchy.',
    dragItems: [
      { label: 'Superclass Constructor', targetId: 'target_super' },
      { label: 'Subclass Keyword', targetId: 'target_extends' },
      { label: 'Dynamic Polymorphism', targetId: 'target_override' },
      { label: 'Instance Encapsulation', targetId: 'target_private' },
    ],
    correctMapping: {
      target_super: 'Superclass Constructor',
      target_extends: 'Subclass Keyword',
      target_override: 'Dynamic Polymorphism',
      target_private: 'Instance Encapsulation',
    },
    explanation: 'In ISC OOP design: super() invokes the parent constructor (must be the very first statement in the subclass constructor); extends links the derived class to the base class; @Override methods enable dynamic runtime polymorphism; and private instance variables guarantee encapsulation.',
    hints: [
      'extends creates the subclass relationship.',
      'super() invokes the parent class constructor.',
      'Overridden methods resolve dynamically at runtime.',
    ],
  },
  // FOUNDATION 7 (c12_cs_083) - Drag Sort
  {
    id: 'ch_07',
    nodeId: NODE_C12_CS_083,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the 7 OSI model layers in the correct top-to-bottom order (from Application Layer down to Physical Layer).',
    sortItems: [
      'Application Layer (Layer 7)',
      'Presentation Layer (Layer 6)',
      'Session Layer (Layer 5)',
      'Transport Layer (Layer 4)',
      'Network Layer (Layer 3)',
      'Data Link Layer (Layer 2)',
      'Physical Layer (Layer 1)',
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    explanation: 'The OSI model top-to-bottom sequence is Application (L7), Presentation (L6), Session (L5), Transport (L4), Network (L3), Data Link (L2), and Physical (L1). A standard mnemonic is: All People Seem To Need Data Processing.',
    hints: [
      'The user interacts directly with the Application layer at the top.',
      'Network layer handles IP routing; Data Link handles MAC frames.',
      'Physical layer transmits raw binary bits over copper, fiber, or radio.',
    ],
  },

  // STANDARD 1 (c12_cs_081) - Application
  {
    id: 'ch_08',
    nodeId: NODE_C12_CS_081,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An ISC student is writing a method to count vowels in a singly linked list storing characters. What happens if the traversal loop is written as while(temp.next != null) instead of while(temp != null)?',
    options: [
      'The last node of the linked list will be skipped and its character will never be inspected',
      'A NullPointerException is thrown on the first node',
      'The loop becomes an infinite loop because temp never updates',
      'The first node data is counted twice',
    ],
    correctIndex: 0,
    explanation: 'Using while(temp.next != null) stops the loop as soon as temp points to the last node (where temp.next is null), exiting BEFORE executing the loop body on that last node. The correct standard linked-list idiom is while(temp != null), which visits every node including the tail.',
    hints: [
      'Consider what happens when temp reaches the final node of the chain.',
      'At the final node, temp.next is null, so temp.next != null evaluates to false immediately.',
      'Thus the loop body does not run for the tail node, missing its value.',
    ],
    misconceptionIndex: 0,
  },
  // STANDARD 2 (c12_cs_082) - Analysis
  {
    id: 'ch_09',
    nodeId: NODE_C12_CS_082,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Analyze the following recursive method:\nint mystery(int n) {\n  if (n <= 1) return 1;\n  return n * mystery(n - 2);\n}\nWhat is the return value of mystery(6)?',
    options: [
      '48 (6 × 4 × 2 × 1)',
      '720 (6!)',
      '120 (5!)',
      'Infinite recursion / StackOverflowError',
    ],
    correctIndex: 0,
    explanation: 'Tracing mystery(6): 6 * mystery(4) = 6 * (4 * mystery(2)) = 6 * 4 * (2 * mystery(0)). For n = 0, n <= 1 is true, returning 1. Total = 6 × 4 × 2 × 1 = 48. This computes the double factorial (6!!).',
    hints: [
      'Notice that the parameter decreases by 2 each call: 6 → 4 → 2 → 0.',
      'When n = 0, n <= 1 is true and returns 1.',
      'Multiply: 6 × 4 × 2 × 1 = 48.',
    ],
  },
  // STANDARD 3 (c12_cs_083) - Application
  {
    id: 'ch_10',
    nodeId: NODE_C12_CS_083,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Simplify the 4-variable Boolean function F(A,B,C,D) = Σm(0, 2, 8, 10) on a Karnaugh Map using corner adjacency.',
    options: [
      'B\'D\'',
      'A\'C\'',
      'B\'C',
      'A\'D\'',
    ],
    correctIndex: 0,
    explanation: 'Minterms 0 (0000), 2 (0010), 8 (1000), and 10 (1010) occupy the four outermost corners of a 4-variable K-map. Comparing all four corners: A changes (0 to 1), B is constant 0 (B\'), C changes (0 to 1), D is constant 0 (D\'). The simplified SOP term is B\'D\'.',
    hints: [
      'Look at the binary coordinates: 0000, 0010, 1000, 1010.',
      'Which variables stay constant across all four terms?',
      'B is always 0 (B\') and D is always 0 (D\'). Result: B\'D\'.',
    ],
    misconceptionIndex: 2,
  },
  // STANDARD 4 (c12_cs_084) - Evaluation
  {
    id: 'ch_11',
    nodeId: NODE_C12_CS_084,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'During reading time, a student notices Question 4 (Section B, 10 marks on circular queue) looks confusing, while Question 5 (Section B, 10 marks on recursive digit sum) is crystal clear. What is the optimal exam strategy?',
    options: [
      'Select and solve Question 5 immediately; do not spend 20 minutes getting trapped on Question 4',
      'Attempt Question 4 first to get the hardest problem out of the way',
      'Attempt both questions fully to see which one the examiner grades higher',
      'Write rough pseudo-code for Question 4 inside the question paper margins during reading time',
    ],
    correctIndex: 0,
    explanation: 'ISC gives options in Section B and Section C. Attempting familiar, high-confidence questions first secures maximum marks early, builds momentum, and avoids getting bogged down. Writing answers during reading time is strictly prohibited by CISCE regulations.',
    hints: [
      'Maximize guaranteed marks early in the exam session.',
      'Securing full marks on a familiar question builds psychological confidence.',
      'Choose the question where you know the algorithm and edge cases with certainty.',
    ],
  },
  // STANDARD 5 (c12_cs_085) - Analysis
  {
    id: 'ch_12',
    nodeId: NODE_C12_CS_085,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is Big-O notation preferred over raw execution wall-clock time when evaluating algorithmic efficiency in university CS and competitive platforms like CodeChef/LeetCode?',
    options: [
      'Big-O measures asymptotic growth rate independently of hardware specs, CPU clock speeds, background OS threads, and compiler optimizations',
      'Big-O calculates the exact microsecond execution time on any Intel Core i7 machine',
      'Big-O is only applicable to Java and cannot be used for C++ or Python',
      'Wall-clock time is mathematically impossible to measure on modern computers',
    ],
    correctIndex: 0,
    explanation: 'Big-O notation characterizes the upper bound of operational growth as input size n approaches infinity. It provides an objective, machine-agnostic metric that compares algorithms regardless of processor speed, memory architecture, or runtime environments.',
    hints: [
      'Think about running code on a supercomputer versus a budget mobile phone.',
      'An O(n) algorithm will always outscale an O(n²) algorithm for large n on any machine.',
      'Big-O is machine-independent asymptotic complexity.',
    ],
  },
  // STANDARD 6 (c12_cs_083) - Construct
  {
    id: 'ch_13',
    nodeId: NODE_C12_CS_083,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the SQL query to find the names and total marks of students having total marks greater than 250, grouped by student ID and Name.',
    availableParts: [
      'SELECT Name, SUM(Marks)',
      'FROM Student JOIN Marks ON Student.Id = Marks.Id',
      'GROUP BY Student.Id, Name',
      'HAVING SUM(Marks) > 250',
      'WHERE SUM(Marks) > 250',
      'ORDER BY Total',
    ],
    targetState: 'SELECT Name, SUM(Marks) FROM Student JOIN Marks ON Student.Id = Marks.Id GROUP BY Student.Id, Name HAVING SUM(Marks) > 250',
    validationHint: 'Remember that aggregate filters must use HAVING, not WHERE, and follow the GROUP BY clause.',
    explanation: 'Standard SQL execution order requires SELECT, FROM with JOIN, GROUP BY for the grouping columns, and HAVING to filter aggregated results (SUM(Marks) > 250). WHERE cannot filter aggregated expressions.',
    hints: [
      'Start with SELECT and the columns/aggregates.',
      'Add the FROM clause with the table JOIN condition.',
      'Use GROUP BY followed by HAVING (not WHERE) for aggregate conditions.',
    ],
  },
  // STANDARD 7 (c12_cs_082) - Drag Sort
  {
    id: 'ch_14',
    nodeId: NODE_C12_CS_082,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the steps for multiplying two matrices A (size M×K) and B (size K×N) to generate matrix C (size M×N) in correct nested-loop order.',
    sortItems: [
      'Outer Loop: iterate row index i from 0 to M - 1',
      'Middle Loop: iterate column index j from 0 to N - 1',
      'Initialize accumulator sum = 0 for cell C[i][j]',
      'Inner Loop: iterate dot-product index k from 0 to K - 1',
      'Accumulate: sum = sum + A[i][k] * B[k][j]',
      'Assign result: C[i][j] = sum',
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation: 'Matrix multiplication requires 3 nested loops: row index i across A, column index j across B, initializing an accumulator, and dot-product loop k multiplying A[i][k] with B[k][j], finally assigning the dot-product sum to C[i][j].',
    hints: [
      'Outer loop fixes the row of the result matrix.',
      'Middle loop fixes the column of the result matrix.',
      'Inner loop traverses columns of A and rows of B to compute the dot product.',
    ],
  },

  // ADVANCED 1 (c12_cs_081) - Evaluation
  {
    id: 'ch_15',
    nodeId: NODE_C12_CS_081,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate this scenario: A student implements multi-threaded bank transaction processing in Java with two threads invoking withdraw() on the same BankAccount instance concurrently without synchronization. What is the fundamental risk?',
    options: [
      'Race condition leading to a corrupted account balance due to non-atomic read-modify-write interleaved operations',
      'A compile-time syntax error on the Thread.start() method',
      'The JVM automatically promotes local variables to volatile registers, preventing anomalies',
      'Deadlock occurs immediately upon launching the second thread',
    ],
    correctIndex: 0,
    explanation: 'Without synchronization, concurrent threads accessing shared mutable state execute interleaved read-modify-write instructions (a race condition), causing lost updates and corrupted balances. Enclosing the critical section in a synchronized method or block guarantees mutual exclusion.',
    hints: [
      'Thread 1 reads balance 1000, Thread 2 reads balance 1000 before Thread 1 writes 800.',
      'Both threads update based on stale data, overwriting each other.',
      'This non-atomic interleaving is called a Race Condition.',
    ],
  },
  // ADVANCED 2 (c12_cs_082) - Creativity
  {
    id: 'ch_16',
    nodeId: NODE_C12_CS_082,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'In an ISC board programming question, you must design a Queue class using an array of capacity MAX. How must the insert (enqueue) and remove (dequeue) pointer conditions be handled in a linear array implementation with front and rear pointers?',
    options: [
      'Underflow: front == -1 || front > rear; Overflow: rear == MAX - 1; Enqueue: rear++; Dequeue: front++',
      'Underflow: rear == 0; Overflow: front == MAX; Enqueue: front++; Dequeue: rear++',
      'Underflow: front == rear; Overflow: rear == 0; Enqueue: rear--; Dequeue: front--',
      'Underflow: front == MAX - 1; Overflow: rear == -1; Enqueue: rear = 0; Dequeue: front = 0',
    ],
    correctIndex: 0,
    explanation: 'In a standard linear queue: initial state has front = -1, rear = -1. When first item is inserted, front = 0, rear = 0. Subsequent enqueues increment rear until rear == MAX - 1 (Overflow). Dequeue increments front; if front > rear or front == -1, the queue is empty (Underflow).',
    hints: [
      'Queue is FIFO: insertions happen at rear, deletions at front.',
      'Overflow occurs when rear reaches MAX - 1.',
      'Underflow occurs when front is -1 or when front passes rear (front > rear).',
    ],
    misconceptionIndex: 0,
  },
  // ADVANCED 3 (c12_cs_083) - Analysis
  {
    id: 'ch_17',
    nodeId: NODE_C12_CS_083,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Compare an Octal-to-Binary Encoder with a 3-to-8 Binary Decoder. Which statement accurately captures their structural input/output and gate architecture?',
    options: [
      'Encoder has 8 input lines and 3 output lines using OR gates; Decoder has 3 input lines and 8 output lines using AND/NAND gates',
      'Encoder has 3 input lines and 8 output lines using AND gates; Decoder has 8 inputs and 3 outputs using OR gates',
      'Both encoder and decoder have 8 inputs and 8 outputs with identical XOR gate trees',
      'Encoder uses exclusively NOT gates; Decoder uses exclusively multiplexer selectors',
    ],
    correctIndex: 0,
    explanation: 'An Octal-to-Binary Encoder converts 8 mutually exclusive active input lines into a 3-bit binary code (2³ = 8) using OR gates to combine active inputs. A 3-to-8 Decoder does the inverse: it takes a 3-bit binary input and activates exactly 1 of 8 output lines using AND/NAND gates.',
    hints: [
      'Encoder: 2ⁿ inputs to n outputs (8 to 3).',
      'Decoder: n inputs to 2ⁿ outputs (3 to 8).',
      'Encoder synthesizes bits using OR gates; Decoder decodes minterms using AND gates.',
    ],
    misconceptionIndex: 2,
  },
  // ADVANCED 4 (c12_cs_084) - Application
  {
    id: 'ch_18',
    nodeId: NODE_C12_CS_084,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An ISC paper has: Section A (40 marks compulsory), Section B (30 marks from 3 chosen 10-mark programs), and Section C (30 marks from 3 chosen 10-mark theory/Boolean questions). If you allocate 60 mins to Section A and 45 mins to Section B, and reserve a 15-min final buffer, exactly how many minutes remain for Section C?',
    correctAnswer: 60,
    tolerance: 0,
    unit: 'minutes',
    explanation: 'Total writing time = 180 minutes. Subtract: 60 (Sec A) + 45 (Sec B) + 15 (Buffer) = 120 minutes. 180 - 120 = 60 minutes remaining for Section C (averaging 20 mins per 10-mark question).',
    hints: [
      'Total available writing duration is 180 minutes.',
      'Sum up allocated minutes: 60 + 45 + 15 = 120 minutes.',
      'Subtract 120 from 180.',
    ],
  },
  // ADVANCED 5 (c12_cs_085) - Evaluation
  {
    id: 'ch_19',
    nodeId: NODE_C12_CS_085,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In competitive programming, you need to find the shortest path in a weighted graph with non-negative edge weights. Which algorithm and data structure combination achieves optimal O((V + E) log V) time complexity?',
    options: [
      'Dijkstra\'s Algorithm implemented with a Min-Priority Queue (Binary Heap)',
      'Floyd-Warshall Algorithm with an adjacency matrix',
      'Breadth First Search (BFS) with a simple FIFO Queue',
      'Depth First Search (DFS) with recursive backtracking',
    ],
    correctIndex: 0,
    explanation: 'Dijkstra\'s algorithm computes single-source shortest paths on non-negative weighted graphs in O((V + E) log V) using a binary heap / priority queue. BFS only works for unweighted graphs (O(V+E)), Floyd-Warshall is O(V³) for all-pairs, and DFS cannot guarantee shortest paths.',
    hints: [
      'Graph has weights (so simple BFS queue is insufficient).',
      'Weights are non-negative.',
      'Dijkstra\'s algorithm paired with a Min-Heap / PriorityQueue.',
    ],
  },
  // ADVANCED 6 (c12_cs_081) - Drag Label
  {
    id: 'ch_20',
    nodeId: NODE_C12_CS_081,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Drag the correct Java Stream API operation to its appropriate stage in a student mark processing pipeline.',
    dragItems: [
      { label: 'filter(s -> s.getMarks() >= 40)', targetId: 'stage_filter' },
      { label: 'map(Student::getName)', targetId: 'stage_map' },
      { label: 'sorted(Comparator.naturalOrder())', targetId: 'stage_sort' },
      { label: 'collect(Collectors.toList())', targetId: 'stage_collect' },
    ],
    correctMapping: {
      stage_filter: 'filter(s -> s.getMarks() >= 40)',
      stage_map: 'map(Student::getName)',
      stage_sort: 'sorted(Comparator.naturalOrder())',
      stage_collect: 'collect(Collectors.toList())',
    },
    explanation: 'In Java Streams: filter() discards failing elements based on a Predicate; map() transforms objects to names via a Function; sorted() reorders elements; and collect() is the terminal operation that accumulates results into a List.',
    hints: [
      'filter removes failing students.',
      'map extracts student names from student objects.',
      'collect is the terminal operation returning the final List.',
    ],
  },
  // ADVANCED 7 (c12_cs_083) - Drag Sort
  {
    id: 'ch_21',
    nodeId: NODE_C12_CS_083,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the steps of the Quine-McCluskey (Tabular) minimization method in strict logical order.',
    sortItems: [
      'List minterms in binary and group by number of 1s (Hamming weight)',
      'Compare adjacent groups that differ by exactly 1 bit, place a dash (-) in that position',
      'Repeat comparisons until no further combinations are possible to find Prime Implicants',
      'Construct Prime Implicant Chart with prime implicants as rows and minterms as columns',
      'Identify Essential Prime Implicants (columns with a single checkmark)',
      'Select minimal additional prime implicants to cover any remaining minterms',
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation: 'Quine-McCluskey systematically reduces Boolean functions: (1) group by Hamming weight, (2) merge 1-bit differing pairs with dashes, (3) iterate to isolate Prime Implicants, (4) set up coverage chart, (5) identify Essential Prime Implicants, (6) obtain minimum cover.',
    hints: [
      'Start by grouping binary terms by their count of 1s.',
      'Merge terms with single bit differences into dashed implicants.',
      'Chart coverage and extract Essential Prime Implicants first.',
    ],
  },
  // ADVANCED 8 (c12_cs_085) - Creativity
  {
    id: 'ch_22',
    nodeId: NODE_C12_CS_085,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the competitive programming problem-solving workflow used by top contestants.',
    availableParts: [
      '1. Read constraints & sample cases',
      '2. Identify algorithm (Greedy/DP/Graph)',
      '3. Implement clean modular code',
      '4. Test edge cases (min/max/0/duplicates)',
      'Ignore constraints',
      'Submit without local testing',
    ],
    targetState: '1. Read constraints & sample cases 2. Identify algorithm (Greedy/DP/Graph) 3. Implement clean modular code 4. Test edge cases (min/max/0/duplicates)',
    validationHint: 'The golden rule is: Read → Identify → Implement → Test Edge Cases.',
    explanation: 'Top competitive programmers follow a rigorous 4-step cadence: meticulously reading constraints, pattern-matching the algorithm, implementing within time limits, and testing corner/edge cases before judge submission.',
    hints: [
      'Always start with reading constraints.',
      'Identify the underlying algorithm second.',
      'Finish by thoroughly testing edge cases before submitting.',
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
  nodeId: NODE_C12_CS_081,
  title: 'ISC Class 12 Computer Science: Final Revision Master',
  definition: 'Comprehensive capstone synthesis of Class 12 Computer Science covering Java OOP, Data Structures (BST, Linked Lists, Stacks, Queues), DBMS & SQL, Boolean Algebra & Logic Circuits, Exam Day Strategy, and the Bridge to College CS.',
  eli5: 'Think of this as your ultimate board exam simulator! We review all Java code patterns, logic gates, truth tables, and exam timing tricks, making you 100% board-ready.',
  misconceptions: [
    {
      misconception: 'Linked list while loops should check temp.next != null to visit all elements.',
      correction: 'Checking temp.next != null stops prematurely at the tail node, skipping it! Always check while (temp != null) with temp = temp.next inside.',
    },
    {
      misconception: 'In Java string processing, using == compares the text characters.',
      correction: 'The == operator compares memory references! In board exams, always use .equals() or explicit character indexing with charAt().',
    },
    {
      misconception: 'An encoder and decoder can be drawn with identical logic gates.',
      correction: 'An encoder converts 2ⁿ inputs to n outputs using OR gates; a decoder converts n inputs to 2ⁿ outputs using AND/NAND gates.',
    },
    {
      misconception: 'Attempting board questions in printed numerical order is mandatory.',
      correction: 'You have full freedom to sequence answers! Always solve high-confidence questions first to secure marks and build psychological momentum.',
    },
    {
      misconception: 'Competitive programming and college CS only require memorizing Java syntax.',
      correction: 'University CS and competitive coding require asymptotic Big-O efficiency, discrete math, and scalable algorithmic design.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the base case condition for recursive binary search when key is not present?', options: ['low > high', 'low == high', 'mid == 0', 'arr[mid] == null'], correctIndex: 0 },
    { question: 'Which SQL keyword filters rows AFTER an aggregate GROUP BY operation?', options: ['WHERE', 'HAVING', 'ORDER BY', 'DISTINCT'], correctIndex: 1 },
    { question: 'What is the dual of the Boolean expression (A + B)(C + 0)?', options: ['AB + C · 1', 'A\'B\' + C\' · 0', 'AB + C + 1', 'A + B + C'], correctIndex: 0 },
    { question: 'How many select lines does an 8-to-1 Multiplexer possess?', options: ['3', '8', '1', '4'], correctIndex: 0 },
    { question: 'What is the time complexity of pushing an element onto an array-based Stack?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correctIndex: 0 },
    { question: 'Which section of the ISC Computer Science Theory paper is compulsory?', options: ['Section A', 'Section B', 'Section C', 'Section D'], correctIndex: 0 },
    { question: 'In the OSI model, which layer manages logical IP addressing and routing?', options: ['Network Layer', 'Transport Layer', 'Data Link Layer', 'Physical Layer'], correctIndex: 0 },
    { question: 'What does the super() keyword do in a subclass constructor?', options: ['Invokes the superclass constructor', 'Creates a static super object', 'Destroys the child object', 'Overwrites parent memory'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student demonstrates integrated mastery of Java DSA, Boolean circuit simplification, SQL database queries, timed exam strategy, and college CS fundamentals.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Interactive Java Memory & Execution Tracer',
    instruction: 'Toggle variables, trace recursion stack frames, and watch heap allocation update in real-time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_CS_082,
  },
  {
    title: 'Data Structure Lab: Linked List vs BST',
    instruction: 'Insert nodes into the Binary Search Tree and observe pre-order, in-order, and post-order traversals.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_CS_081,
  },
  {
    title: 'Digital Circuit & K-Map Synthesizer',
    instruction: 'Toggle binary inputs (A, B, Cin) to observe the live Full Adder gate outputs and K-Map grouping.',
    interactionType: 'toggle-circuits',
    nodeId: NODE_C12_CS_083,
  },
  {
    title: 'Exam Time Budget & Mark Allocator',
    instruction: 'Drag the exam time slider to balance minutes per mark across Section A, B, and C with a safe buffer.',
    interactionType: 'drag-position',
    nodeId: NODE_C12_CS_084,
  },
  {
    title: 'Beyond ISC: Big-O Complexity & Growth Visualizer',
    instruction: 'Adjust input size N and compare O(1), O(log N), O(N), O(N log N), and O(N²) execution operations.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_CS_085,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an in-order traversal is executed on a valid Binary Search Tree with values [45, 12, 78, 23, 6], what sequence will be produced?',
    options: [
      '[6, 12, 23, 45, 78] (strictly sorted ascending order)',
      '[45, 12, 6, 23, 78] (root-left-right order)',
      '[6, 23, 12, 78, 45] (post-order sequence)',
      '[78, 45, 23, 12, 6] (descending order)',
    ],
    correctIndex: 0,
    verifyInstruction: 'Now click "In-Order" in the BST explorer above to inspect the sorted output stream.',
    nodeId: NODE_C12_CS_081,
  },
  {
    question: 'Predict: If you set input size N = 50 in the complexity visualizer, which algorithmic complexity class will require exactly 2,500 operations?',
    options: [
      'O(N²) Quadratic Complexity',
      'O(N log N) Linearithmic Complexity',
      'O(N) Linear Complexity',
      'O(log N) Logarithmic Complexity',
    ],
    correctIndex: 0,
    verifyInstruction: 'Navigate to Lab 5 (Beyond ISC: Big-O Visualizer), adjust N to 50, and inspect the O(N²) operational count card.',
    nodeId: NODE_C12_CS_085,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the Full Adder Sum output when exactly TWO inputs (e.g., A=1, B=1, Cin=0) are high?',
    observableOptions: [
      'Sum is 0 and Carry is 1 (because 1 + 1 = 10 in binary)',
      'Sum is 1 and Carry is 1',
      'Both Sum and Carry are 0',
      'Sum is 1 and Carry is 0',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_CS_083,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Software Architect Mock Audit',
  description: 'Design a full production microservice for an Indian Railway e-ticketing platform (IRCTC). Specify the Java OOP class hierarchy with thread-safe synchronized booking methods, the SQL schema with normalized passenger tables, the Boolean security gate circuit, and the Big-O time complexity for concurrent seat allocation.',
  steps: [
    'Define class Passenger and class TicketBooking with synchronized boolean bookSeat(int trainNo, int seatCount).',
    'Write a normalized 3NF SQL table schema for Trains, Bookings, and Passengers with foreign keys.',
    'Formulate a 4-variable logic circuit for granting VIP booking approval (F = Age>60 OR Emergency Quota).',
    'Analyze the seat allocation algorithm using O(log N) Red-Black Tree search vs O(N) linear scan.',
  ],
};

// ─── MAIN COMPONENT ───
function C12_ComputerScienceFinalRevisionCompleteSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_CS_081,
  title = DEFAULT_PROPS.title || 'ISC Computer Science Final Revision Master',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['computerscience'] || { name: 'Computer Science', emoji: '💻', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const bktStateRef = useRef(createBKTState());

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict & Observation State
  const [predictionMade, setPredictionMade] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Interactive Exploration Controls State
  const [traceStep, setTraceStep] = useState(1);
  const [recursionN, setRecursionN] = useState(4);
  const [bstTraversalMode, setBstTraversalMode] = useState<'inorder' | 'preorder' | 'postorder'>('inorder');
  const [logicA, setLogicA] = useState(1);
  const [logicB, setLogicB] = useState(0);
  const [logicCin, setLogicCin] = useState(1);
  const [timeSectionA, setTimeSectionA] = useState(60);
  const [timeSectionB, setTimeSectionB] = useState(50);
  const [timeSectionC, setTimeSectionC] = useState(50);
  const [complexityN, setComplexityN] = useState(50);
  const [kmapValues, setKmapValues] = useState<number[]>([1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1]);

  // Sandbox State
  const [sandboxStack, setSandboxStack] = useState<number[]>([10, 20, 30]);
  const [sandboxInputVal, setSandboxInputVal] = useState(40);

  // Challenge Handling State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop & Input State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual & Audio Feedback State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Post-completion reflection answers state
  const [reflectionAnswers, setReflectionAnswers] = useState({ q1: '', q2: '', q3: '' });

  // Auto-hint Inactivity Timer
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES ───
  const fullAdderOutputs = useMemo(() => {
    const sum = (logicA ^ logicB ^ logicCin);
    const carry = ((logicA & logicB) | (logicB & logicCin) | (logicA & logicCin));
    return { sum, carry };
  }, [logicA, logicB, logicCin]);

  const examTimeAudit = useMemo(() => {
    const totalMinutes = 180;
    const allocated = timeSectionA + timeSectionB + timeSectionC;
    const buffer = totalMinutes - allocated;
    const minPerMarkSecA = (timeSectionA / 40).toFixed(2);
    const minPerMarkSecB = (timeSectionB / 30).toFixed(2);
    const minPerMarkSecC = (timeSectionC / 30).toFixed(2);
    return { allocated, buffer, minPerMarkSecA, minPerMarkSecB, minPerMarkSecC };
  }, [timeSectionA, timeSectionB, timeSectionC]);

  const bstTraversalResult = useMemo(() => {
    if (bstTraversalMode === 'inorder') return '[6, 12, 23, 45, 78] (Ascending Sorted)';
    if (bstTraversalMode === 'preorder') return '[45, 12, 6, 23, 78] (Root-Left-Right)';
    return '[6, 23, 12, 78, 45] (Left-Right-Post)';
  }, [bstTraversalMode]);

  const complexityCounts = useMemo(() => {
    const n = complexityN;
    const cConstant = 1;
    const cLogN = Math.round(Math.log2(n || 1));
    const cLinear = n;
    const cNLogN = Math.round(n * Math.log2(n || 1));
    const cQuadratic = n * n;
    return { cConstant, cLogN, cLinear, cNLogN, cQuadratic };
  }, [complexityN]);

  // Motivational Feedback Message based on Error Count
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors >= 1 && errors <= 3) return 'Great work!';
    if (errors >= 4 && errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // ─── ADAPTIVE CHALLENGES FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTATION EFFECT ───
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

  // ─── 2D CANVAS ALGORITHM VISUALIZATION ───
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

      // Background Grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Animated Binary Search Stream / Packets
      const packetX = (frame * 2.5) % (canvas.width + 40) - 20;
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(packetX, 16, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#a5b4fc';
      ctx.font = '10px monospace';
      ctx.fillText(`Bitstream Sync: 0x${((frame * 17) % 255).toString(16).toUpperCase()}`, 10, 20);
      ctx.fillText(`Mastery: ${masteryLevel.toUpperCase()} | P(L): ${(bktStateRef.current.pKnown * 100).toFixed(0)}%`, canvas.width - 180, 20);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [masteryLevel]);

  // ─── AUTO-HINT INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0 && challenge) {
        if (challenge.hints && challenge.hints.length > 0) {
          setCurrentHint(challenge.hints[0]);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak('Need a quick nudge? Check this hint.');
        }
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, challenge]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── CALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (challenge && challenge.hints && nextLevel <= challenge.hints.length) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us review the complete step-by-step model solution.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const correct = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(correct);
    setDiscoveryAnswered(true);
    audioManager.play(correct ? 'success' : 'pop');
    speechManager.speak(correct ? 'Superb insight! You understand board paper timing!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Command Center. Explore each topic hands-on.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Sandbox unlocked! Experiment freely with zero stress or scoring.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Entering Challenge Mode. Show your Class 12 board readiness!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now verify it interactively in the simulation.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation! That is core digital logic.' : 'Look closer at the binary truth output.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have completed the ISC Class 12 Computer Science Master Revision!');
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
    if (!challenge) return;
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
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Brilliant synthesis.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
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

      if (hintCount < (challenge.hints ? challenge.hints.length : 3)) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Hints exhausted. Let us inspect the model breakdown.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem || !challenge) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    if (!challenge || !challenge.sortItems) return;
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const currentArr = prev.length === challenge.sortItems!.length ? [...prev] : challenge.sortItems!.map((_, i) => i);
      const [moved] = currentArr.splice(fromIndex, 1);
      currentArr.splice(toIndex, 0, moved);
      return currentArr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    if (!challenge || !challenge.sortItems) return;
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems.map((_, i) => i);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handlePushSandboxStack = useCallback(() => {
    if (sandboxStack.length >= 5) {
      audioManager.play('error');
      speechManager.speak('Stack Overflow! Maximum capacity reached.');
      return;
    }
    setSandboxStack(prev => [...prev, sandboxInputVal]);
    setSandboxInputVal(v => v + 10);
    audioManager.play('pop');
  }, [sandboxStack, sandboxInputVal]);

  const handlePopSandboxStack = useCallback(() => {
    if (sandboxStack.length === 0) {
      audioManager.play('error');
      speechManager.speak('Stack Underflow! Stack is completely empty.');
      return;
    }
    setSandboxStack(prev => prev.slice(0, -1));
    audioManager.play('whoosh');
  }, [sandboxStack]);

  const handleKmapToggle = useCallback((idx: number) => {
    setKmapValues(prev => {
      const next = [...prev];
      next[idx] = next[idx] === 1 ? 0 : 1;
      return next;
    });
    audioManager.play('tap');
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/90 rounded-2xl border border-slate-800 backdrop-blur-md mb-6"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 rounded-xl bg-gold-600/30 border border-gold-500/50 flex items-center justify-center text-2xl shadow-inner"
            aria-label="Computer Science icon"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">{title}</h1>
            <p className="text-xs text-gold-400 font-medium">ISC Class 12 Capstone • Nodes 081–085 Synchronized</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 text-xs font-bold rounded-full border ${
              difficulty === 'foundation' ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700' :
              difficulty === 'advanced' ? 'bg-rose-950/80 text-rose-400 border-rose-700' :
              'bg-gold-950/80 text-gold-400 border-gold-700'
            }`}
          >
            {difficulty.toUpperCase()} TIER
          </motion.span>

          <div className="px-3 py-1 bg-slate-800/80 rounded-full border border-slate-700 text-xs text-slate-300">
            Phase: <span className="text-gold-300 font-bold capitalize">{phase}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-900 rounded-2xl border border-gold-800/60 shadow-lg">
            <div className="flex items-center gap-2 mb-2 text-gold-400 font-semibold text-sm">
              <span>🚀</span> NARRATIVE MISSION BRIEFING
            </div>
            <h2 className="text-2xl font-black text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300/80 bg-gold-950/50 p-3 rounded-xl border border-gold-900">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-wide uppercase mb-3">
              <span>⚡</span> Curiosity Hook Diagnostic
            </div>
            <p className="text-base text-white font-bold mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-gold-500'
                  }`}
                >
                  <span className="font-bold mr-2 text-gold-400">[{String.fromCharCode(65 + i)}]</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 mr-2 font-bold">✓</span>}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className={`text-sm mb-4 font-medium flex items-center gap-2 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  <span>{discoveryCorrect ? '✓' : 'ℹ'}</span>
                  <span>
                    {discoveryCorrect
                      ? 'Spot on! Reading time is tactical planning time to evaluate question options!'
                      : DISCOVERY_QUESTION.hintAfter}
                  </span>
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Launch Live Revision Labs"
                  className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-gold-950/50 flex items-center gap-2"
                >
                  Launch Live Revision Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── EXPLORATION PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-lg">🧪</span>
              <span className="text-sm font-bold text-white">Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}:</span>
              <span className="text-sm text-gold-300 font-semibold">{EXPLORATION_STEPS[currentSlide].title}</span>
            </div>
            <div className="flex gap-2">
              {EXPLORATION_STEPS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Jump to lab ${idx + 1}`}
                  className={`w-3 h-3 rounded-full transition-all ${currentSlide === idx ? 'bg-gold-500 w-8' : 'bg-slate-700'}`}
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
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-900/50 text-gold-300 text-xs font-medium">
                🎯 {EXPLORATION_STEPS[currentSlide].instruction}
              </div>

              {/* SLIDE 0: Java Execution & Recursion Memory Tracer */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase">Interactive Recursion Call Stack</span>
                      <span className="text-xs text-gold-400 font-mono">factorial({recursionN})</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <label htmlFor="recursion-slider" className="text-xs text-slate-300">Set n:</label>
                      <input
                        id="recursion-slider"
                        aria-label="Set recursion depth n"
                        type="range"
                        min={1}
                        max={6}
                        value={recursionN}
                        onChange={(e) => setRecursionN(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                      <span className="text-sm font-mono font-bold text-white">{recursionN}</span>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
                      <p className="text-gold-400 font-bold">// Model ISC Recursive Method</p>
                      <p><span className="text-purple-400">int</span> fact(<span className="text-purple-400">int</span> n) &#123;</p>
                      <p className="pl-4"><span className="text-rose-400">if</span> (n &lt;= 1) <span className="text-rose-400">return</span> 1; <span className="text-slate-500">// Base Case</span></p>
                      <p className="pl-4"><span className="text-rose-400">return</span> n * fact(n - 1); <span className="text-slate-500">// Recursive Step</span></p>
                      <p>&#125;</p>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setTraceStep(s => Math.min(recursionN, s + 1))}
                        aria-label="Step deeper in recursion stack"
                        className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                      >
                        Step Deeper ↓
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setTraceStep(s => Math.max(1, s - 1))}
                        aria-label="Unwind recursion stack"
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
                      >
                        Unwind Stack ↑
                      </motion.button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-400 uppercase">JVM Stack Frames Visualizer</span>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 min-h-[220px] flex flex-col-reverse justify-start gap-2">
                      {Array.from({ length: traceStep }).map((_, i) => {
                        const currentVal = recursionN - i;
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`p-2.5 rounded-lg border font-mono text-xs flex justify-between items-center ${
                              i === traceStep - 1
                                ? 'bg-gold-950/80 border-gold-500 text-gold-200 shadow-md'
                                : 'bg-slate-800 border-slate-700 text-slate-400'
                            }`}
                          >
                            <span>Frame #{i + 1}: fact({currentVal})</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-gold-300">
                              {currentVal <= 1 ? 'Base Hit: returns 1' : `Waiting on fact(${currentVal - 1})`}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: Data Structure Lab (BST & Linked List) */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-bold text-slate-400 uppercase">Binary Search Tree Traversals</span>
                    <div className="flex gap-2">
                      {(['inorder', 'preorder', 'postorder'] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setBstTraversalMode(mode)}
                          aria-label={`Set BST traversal to ${mode}`}
                          className={`px-3 py-1 text-xs font-bold rounded-lg capitalize border ${
                            bstTraversalMode === mode
                              ? 'bg-gold-600 border-gold-400 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SVG BST Diagram */}
                  <div className="flex justify-center p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 400 180" className="w-full max-w-md h-auto" aria-label="Binary Search Tree Diagram">
                      <line x1="200" y1="35" x2="120" y2="85" stroke="#475569" strokeWidth="2" />
                      <line x1="200" y1="35" x2="280" y2="85" stroke="#475569" strokeWidth="2" />
                      <line x1="120" y1="85" x2="70" y2="140" stroke="#475569" strokeWidth="2" />
                      <line x1="120" y1="85" x2="170" y2="140" stroke="#475569" strokeWidth="2" />

                      <circle cx="200" cy="35" r="18" fill="#4338ca" stroke="#818cf8" strokeWidth="2" />
                      <text x="200" y="40" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">45</text>

                      <circle cx="120" cy="85" r="16" fill="#312e81" stroke="#6366f1" strokeWidth="2" />
                      <text x="120" y="89" textAnchor="middle" fill="#ffffff" fontSize="10">12</text>

                      <circle cx="280" cy="85" r="16" fill="#312e81" stroke="#6366f1" strokeWidth="2" />
                      <text x="280" y="89" textAnchor="middle" fill="#ffffff" fontSize="10">78</text>

                      <circle cx="70" cy="140" r="14" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="2" />
                      <text x="70" y="144" textAnchor="middle" fill="#ffffff" fontSize="9">6</text>

                      <circle cx="170" cy="140" r="14" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="2" />
                      <text x="170" y="144" textAnchor="middle" fill="#ffffff" fontSize="9">23</text>
                    </svg>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
                    <span className="text-slate-400">Generated Stream:</span>
                    <span className="font-mono text-gold-300 font-bold">{bstTraversalResult}</span>
                  </div>

                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/50 rounded-xl border border-gold-800/80 space-y-3">
                      <p className="text-xs font-bold text-gold-200">🔮 Predict-Then-Check: {PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Prediction choice ${i + 1}: ${opt}`}
                            className="p-2.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-left text-xs text-slate-300 border border-slate-800 hover:border-gold-500"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SLIDE 2: Digital Circuit & K-Map Synthesizer */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-bold text-slate-400 uppercase">Live Full Adder Gate Simulator</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Toggle Inputs:</span>
                      <button
                        onClick={() => setLogicA(a => (a === 1 ? 0 : 1))}
                        aria-label={`Toggle Input A current ${logicA}`}
                        className={`px-3 py-1 rounded text-xs font-mono font-bold ${logicA ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                      >
                        A={logicA}
                      </button>
                      <button
                        onClick={() => setLogicB(b => (b === 1 ? 0 : 1))}
                        aria-label={`Toggle Input B current ${logicB}`}
                        className={`px-3 py-1 rounded text-xs font-mono font-bold ${logicB ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                      >
                        B={logicB}
                      </button>
                      <button
                        onClick={() => setLogicCin(c => (c === 1 ? 0 : 1))}
                        aria-label={`Toggle Input Carry In current ${logicCin}`}
                        className={`px-3 py-1 rounded text-xs font-mono font-bold ${logicCin ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                      >
                        Cin={logicCin}
                      </button>
                    </div>
                  </div>

                  {/* SVG Full Adder Logic Diagram */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 450 160" className="w-full max-w-lg h-auto" aria-label="Full Adder Logic Circuit">
                      <text x="20" y="35" fill="#94a3b8" fontSize="11" fontFamily="monospace">A = {logicA}</text>
                      <text x="20" y="75" fill="#94a3b8" fontSize="11" fontFamily="monospace">B = {logicB}</text>
                      <text x="20" y="125" fill="#94a3b8" fontSize="11" fontFamily="monospace">Cin = {logicCin}</text>

                      <rect x="100" y="25" width="60" height="40" rx="6" fill="#312e81" stroke="#6366f1" strokeWidth="2" />
                      <text x="130" y="49" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">XOR 1</text>

                      <rect x="220" y="35" width="60" height="40" rx="6" fill="#312e81" stroke="#6366f1" strokeWidth="2" />
                      <text x="250" y="59" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">XOR 2</text>

                      <rect x="220" y="95" width="80" height="40" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                      <text x="260" y="119" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Carry Gen</text>

                      <line x1="160" y1="45" x2="220" y2="45" stroke="#818cf8" strokeWidth="2" />
                      <line x1="280" y1="55" x2="360" y2="55" stroke="#818cf8" strokeWidth="2" />
                      <line x1="300" y1="115" x2="360" y2="115" stroke="#34d399" strokeWidth="2" />

                      <circle cx="390" cy="55" r="16" fill={fullAdderOutputs.sum ? '#10b981' : '#334155'} />
                      <text x="390" y="59" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">S={fullAdderOutputs.sum}</text>

                      <circle cx="390" cy="115" r="16" fill={fullAdderOutputs.carry ? '#10b981' : '#334155'} />
                      <text x="390" y="119" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">C={fullAdderOutputs.carry}</text>
                    </svg>
                  </div>

                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-xs font-bold text-amber-300">🔎 Observation Check: {OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleObservation(i)}
                            aria-label={`Observation option ${i + 1}: ${opt}`}
                            className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-left text-xs text-slate-300 border border-slate-700 hover:border-gold-500"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* SLIDE 3: Exam Time Budget & Mark Allocator */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 uppercase">Interactive ISC 3-Hour Exam Allocator (180 Mins Total)</span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gold-400 font-bold">Section A (40 Marks)</span>
                        <span className="font-mono text-white">{timeSectionA} min</span>
                      </div>
                      <input
                        type="range"
                        min={30}
                        max={90}
                        value={timeSectionA}
                        onChange={(e) => setTimeSectionA(Number(e.target.value))}
                        aria-label="Section A allocated minutes"
                        className="w-full accent-gold-500"
                      />
                      <p className="text-[10px] text-slate-400">Pace: {examTimeAudit.minPerMarkSecA} min/mark</p>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-emerald-400 font-bold">Section B (30 Marks)</span>
                        <span className="font-mono text-white">{timeSectionB} min</span>
                      </div>
                      <input
                        type="range"
                        min={30}
                        max={75}
                        value={timeSectionB}
                        onChange={(e) => setTimeSectionB(Number(e.target.value))}
                        aria-label="Section B allocated minutes"
                        className="w-full accent-emerald-500"
                      />
                      <p className="text-[10px] text-slate-400">Pace: {examTimeAudit.minPerMarkSecB} min/mark</p>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-purple-400 font-bold">Section C (30 Marks)</span>
                        <span className="font-mono text-white">{timeSectionC} min</span>
                      </div>
                      <input
                        type="range"
                        min={30}
                        max={75}
                        value={timeSectionC}
                        onChange={(e) => setTimeSectionC(Number(e.target.value))}
                        aria-label="Section C allocated minutes"
                        className="w-full accent-purple-500"
                      />
                      <p className="text-[10px] text-slate-400">Pace: {examTimeAudit.minPerMarkSecC} min/mark</p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border text-xs flex justify-between items-center ${
                    examTimeAudit.buffer >= 15 ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200' :
                    examTimeAudit.buffer > 0 ? 'bg-amber-950/60 border-amber-600 text-amber-200' :
                    'bg-rose-950/60 border-rose-600 text-rose-200'
                  }`}>
                    <span className="font-bold">Total Writing Time: {examTimeAudit.allocated} / 180 mins</span>
                    <span className="font-mono font-bold">
                      {examTimeAudit.buffer >= 0 ? `✓ Safe Buffer: ${examTimeAudit.buffer} mins` : `✗ CRITICAL OVERRUN: ${Math.abs(examTimeAudit.buffer)} mins deficit!`}
                    </span>
                  </div>
                </div>
              )}

              {/* SLIDE 4: Beyond ISC: Big-O Complexity Visualizer */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase">Asymptotic Big-O Scaling Inspector</span>
                    <span className="text-xs text-gold-400 font-mono">Input Size N = {complexityN}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <label htmlFor="complexity-slider" className="text-xs text-slate-300">Adjust N:</label>
                    <input
                      id="complexity-slider"
                      type="range"
                      min={5}
                      max={200}
                      value={complexityN}
                      onChange={(e) => setComplexityN(Number(e.target.value))}
                      aria-label="Input size N slider"
                      className="w-full accent-gold-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <p className="text-[10px] text-emerald-400 font-bold font-mono">O(1)</p>
                      <p className="text-sm font-mono text-white font-bold">{complexityCounts.cConstant}</p>
                      <p className="text-[9px] text-slate-500">Hash Lookup</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <p className="text-[10px] text-teal-400 font-bold font-mono">O(log N)</p>
                      <p className="text-sm font-mono text-white font-bold">{complexityCounts.cLogN}</p>
                      <p className="text-[9px] text-slate-500">Binary Search</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <p className="text-[10px] text-gold-400 font-bold font-mono">O(N)</p>
                      <p className="text-sm font-mono text-white font-bold">{complexityCounts.cLinear}</p>
                      <p className="text-[9px] text-slate-500">Linear Scan</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <p className="text-[10px] text-amber-400 font-bold font-mono">O(N log N)</p>
                      <p className="text-sm font-mono text-white font-bold">{complexityCounts.cNLogN}</p>
                      <p className="text-[9px] text-slate-500">Merge/Quick Sort</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center col-span-2 sm:col-span-1">
                      <p className="text-[10px] text-rose-400 font-bold font-mono">O(N²)</p>
                      <p className="text-sm font-mono text-white font-bold">{complexityCounts.cQuadratic}</p>
                      <p className="text-[9px] text-slate-500">Nested Matrix</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex justify-between items-center pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  aria-label="Previous Lab"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Prev Lab
                </motion.button>

                <span className="text-xs text-slate-500">Slide {currentSlide + 1} / {EXPLORATION_STEPS.length}</span>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    aria-label="Next Lab"
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    aria-label="Enter Free Sandbox"
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                  >
                    Enter Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-black text-white">Free Sandbox & Code Laboratory</h3>
              <p className="text-xs text-slate-400">Zero pressure zone. Test logic gates, stack pushes/pops, and Karnaugh map grouping freely.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Start Timed Challenges"
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/50"
            >
              Start Timed Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sandbox Module 1: Stack LIFO Experiment */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase">Array Stack (LIFO) Sandbox</span>
                <span className="text-xs font-mono text-gold-400">Capacity: 5 | Size: {sandboxStack.length}</span>
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePushSandboxStack}
                  aria-label={`Push element ${sandboxInputVal} to stack`}
                  className="flex-1 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Push({sandboxInputVal})
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePopSandboxStack}
                  aria-label="Pop top element from stack"
                  className="flex-1 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold"
                >
                  Pop()
                </motion.button>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[160px] flex flex-col-reverse items-center justify-start gap-2">
                {sandboxStack.length === 0 ? (
                  <span className="text-xs text-slate-600 my-auto">[ Stack is empty (Underflow) ]</span>
                ) : (
                  sandboxStack.map((val, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`w-full max-w-xs py-2 px-4 rounded-lg font-mono text-xs text-center border ${
                        idx === sandboxStack.length - 1
                          ? 'bg-gold-950/80 border-gold-400 text-gold-200 font-bold'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      {idx === sandboxStack.length - 1 ? `TOP → [${val}]` : `[${val}]`}
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Sandbox Module 2: Interactive 4-Variable K-Map Grid */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase">Interactive 4-Variable K-Map Grid</span>
                <span className="text-xs text-slate-500 font-mono">Click cells to toggle 0/1</span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 p-3 bg-slate-950 rounded-xl border border-slate-800">
                {kmapValues.map((val, i) => (
                  <button
                    key={i}
                    onClick={() => handleKmapToggle(i)}
                    aria-label={`Toggle minterm m${i} current value ${val}`}
                    className={`h-10 rounded font-mono text-xs font-bold transition-all ${
                      val === 1 ? 'bg-gold-600 text-white shadow' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
                    }`}
                  >
                    m{i}: {val}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 text-center">
                Corners m0, m2, m8, m10 toggle simplifies to <span className="text-gold-400 font-mono font-bold">B&apos;D&apos;</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── CHALLENGE PHASE ─── */}
      {phase === 'challenge' && challenge && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Top Algorithm Canvas Animation */}
          <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
            <canvas ref={canvasRef} width={600} height={32} className="w-full h-8 rounded" aria-label="Bitstream sync visualization" />
          </div>

          {/* Progress Header */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-gold-400 font-medium">
                Competency: <span className="font-bold uppercase">{challenge.competencyLevel}</span>
              </span>
            </div>

            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-teal-400 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Challenge Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-colors ${
              wrongFlash ? 'bg-rose-950/60 border-rose-600' : 'border-slate-800'
            }`}
          >
            <p className="text-base text-white font-bold mb-4 whitespace-pre-line">{challenge.question}</p>

            {/* TYPE 1: MCQ (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-200 hover:border-gold-500'
                    }`}
                  >
                    <span>
                      <span className="font-bold mr-2 text-gold-400">[{String.fromCharCode(65 + i)}]</span>
                      {opt}
                    </span>
                    {showExplanation && (
                      <span className="font-bold text-base ml-2">
                        {i === challenge.correctIndex ? '✓' : ''}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            )}

            {/* TYPE 2: Drag-Label onto Diagram */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Draggable label: ${item.label}`}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-bold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {challenge.dragItems.map((item, i) => {
                    const droppedVal = droppedLabels[item.targetId];
                    return (
                      <div
                        key={i}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(item.targetId)}
                        aria-label={`Target slot ${i + 1} with current value ${droppedVal || 'empty'}`}
                        className={`p-4 rounded-xl border-2 border-dashed flex flex-col justify-center items-center min-h-[70px] text-xs transition-colors ${
                          droppedVal ? 'bg-gold-950/40 border-gold-500 text-gold-200' : 'bg-slate-950/50 border-slate-700 text-slate-500'
                        }`}
                      >
                        <span className="text-[10px] text-slate-400 mb-1">Target Slot #{i + 1}</span>
                        <span className="font-bold flex items-center gap-1">
                          {droppedVal ? `✓ ${droppedVal}` : 'Drop matching label here'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={wrongShake ? { duration: 0.4 } : {}}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  aria-label="Verify Mappings"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Mappings →
                </motion.button>
              </div>
            )}

            {/* TYPE 3: Drag-Sort */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIndex) => (
                  <motion.div
                    key={displayIndex}
                    role="button"
                    tabIndex={0}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIndex))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0', 10);
                      handleSortMove(fromIdx, displayIndex);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    aria-label={`Sortable item ${displayIndex + 1}: ${item}`}
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 flex items-center justify-between cursor-grab"
                  >
                    <span>
                      <span className="font-bold text-gold-400 mr-2">{displayIndex + 1}.</span>
                      {item}
                    </span>
                    <span className="text-slate-500 text-xs">↕ Drag</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={wrongShake ? { duration: 0.4 } : {}}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Check Sequence"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold mt-2"
                >
                  Check Sequence →
                </motion.button>
              </div>
            )}

            {/* TYPE 4: Numeric */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    aria-label="Numeric answer input"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-gold-500"
                  />
                  <span className="text-xs text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation}
                    aria-label="Submit Number"
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                  >
                    Submit Number →
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 5: Construct */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(p => [...p, part])}
                      aria-label={`Add block: ${part}`}
                      className="px-3 py-1.5 bg-gold-800 hover:bg-gold-700 text-white rounded-lg text-xs font-medium border border-gold-600"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[80px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-3 py-1 bg-gold-900 text-gold-200 rounded-lg text-xs border border-gold-700 flex items-center gap-2">
                      {part}
                      <button
                        onClick={() => setConstructParts(cp => cp.filter((_, idx) => idx !== i))}
                        aria-label={`Remove block: ${part}`}
                        className="text-rose-400 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={wrongShake ? { duration: 0.4 } : {}}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Verify Constructed Logic"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Constructed Logic →
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gold-950/40 border border-gold-800 rounded-xl space-y-4"
              >
                <div className="flex items-center gap-2 text-gold-300 font-bold text-xs">
                  <span>💡</span> Model ISC Marking Breakdown & Explanation
                </div>

                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-slate-300 text-xs leading-relaxed"
                  >
                    <span className="font-bold text-gold-400 mr-1.5">{i + 1}.</span>
                    {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="flex justify-between items-center pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Show Next Point"
                      className="px-4 py-2 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Point →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Proceed to Next Challenge"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950/50 ml-auto"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Review →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 rounded-3xl border border-emerald-700/60 text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-3xl"
            >
              🎓
            </motion.div>
            <h2 className="text-3xl font-black text-white">ISC Board Revision Complete!</h2>

            {/* Motivational Feedback Banner */}
            <div className="inline-block px-5 py-2 rounded-2xl bg-gold-950/80 border border-gold-500/50 text-gold-300 font-black text-lg tracking-wide shadow-lg">
              {motivationalMessage}
            </div>

            <p className="text-emerald-400 text-sm font-semibold">
              Final Revision Mastery Score: {Math.max(0, 100 - errors * 5)}% • Total Errors: {errors} • Tier: {masteryLevel.toUpperCase()}
            </p>

            <div className="max-w-md mx-auto p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300">
              {errors === 0
                ? '🏆 Outstanding! 100% Precision. You are thoroughly prepared for the ISC Computer Science Theory Paper 1!'
                : errors <= 3
                ? '⭐ Excellent work! You demonstrate strong algorithmic synthesis. Review the misconceptions below before exam morning.'
                : errors <= 7
                ? '💪 Solid effort! Solidify your K-map and pointer idioms using the spaced review schedule below.'
                : '��� Consistent practice makes masters! Review the foundational lessons and re-attempt the revision marathon.'}
            </div>
          </div>

          {/* ─── REFLECTION QUESTIONS SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm">
              <span>💭</span> POST-SIMULATION METACOGNITIVE REFLECTION
            </div>
            <p className="text-xs text-slate-400">
              Take a moment to solidify your mental models by reflecting on these core questions:
            </p>

            <div className="space-y-3">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="reflection-q1" className="text-xs font-bold text-slate-200">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  id="reflection-q1"
                  rows={2}
                  value={reflectionAnswers.q1}
                  onChange={(e) => setReflectionAnswers(prev => ({ ...prev, q1: e.target.value }))}
                  placeholder="e.g., How String comparison with == actually behaves in Java memory..."
                  aria-label="Reflection: What was the most surprising thing you learned?"
                  className="w-full p-2.5 bg-slate-900 border border-slate-750 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="reflection-q2" className="text-xs font-bold text-slate-200">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  id="reflection-q2"
                  rows={2}
                  value={reflectionAnswers.q2}
                  onChange={(e) => setReflectionAnswers(prev => ({ ...prev, q2: e.target.value }))}
                  placeholder="e.g., A full adder simply adds three bits and separates the sum and carry using XOR and AND gates..."
                  aria-label="Reflection: How would you explain this to a friend?"
                  className="w-full p-2.5 bg-slate-900 border border-slate-750 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="reflection-q3" className="text-xs font-bold text-slate-200">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  id="reflection-q3"
                  rows={2}
                  value={reflectionAnswers.q3}
                  onChange={(e) => setReflectionAnswers(prev => ({ ...prev, q3: e.target.value }))}
                  placeholder="e.g., Scaling database queries with HAVING or optimizing backend service latency using O(log N) structures..."
                  aria-label="Reflection: Where in real life might you use this?"
                  className="w-full p-2.5 bg-slate-900 border border-slate-750 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && misconceptions && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Targeted Misconception Audit</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-bold">✗ Common Trap: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Examiner Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Schedule */}
          <div className="p-6 bg-gold-950/40 rounded-2xl border border-gold-800 flex justify-between items-center text-xs">
            <div>
              <p className="font-bold text-white mb-1">📅 Recommended Spaced Review Schedule (SM-2)</p>
              <p className="text-slate-400">Re-visit high-frequency templates (Recursion & Full Adders) in:</p>
            </div>
            <span className="px-4 py-2 bg-gold-600 text-white font-mono font-bold rounded-xl">
              {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '24 Hours'}
            </span>
          </div>

          {/* Real World Activity Arc */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white">Capstone Beyond-Board Project</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-2.5 bg-slate-950 rounded-lg text-[11px] text-slate-400 border border-slate-800">
                  <span className="text-gold-400 font-bold mr-1">#{i + 1}</span> {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SYSTEM FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_ComputerScienceFinalRevisionCompleteSim;
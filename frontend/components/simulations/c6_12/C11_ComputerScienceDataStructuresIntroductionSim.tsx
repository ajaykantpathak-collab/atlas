'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C11_CS_031 = 'c11_cs_031';
const NODE_C11_CS_032 = 'c11_cs_032';
const NODE_C11_CS_033 = 'c11_cs_033';
const NODE_C11_CS_034 = 'c11_cs_034';
const NODE_C11_CS_035 = 'c11_cs_035';
const NODE_C11_CS_036 = 'c11_cs_036';
const NODE_C11_CS_037 = 'c11_cs_037';
const NODE_C11_CS_038 = 'c11_cs_038';
const NODE_C11_CS_039 = 'c11_cs_039';
const NODE_C11_CS_040 = 'c11_cs_040';

const ALL_CS_NODE_IDS = [
  NODE_C11_CS_031,
  NODE_C11_CS_032,
  NODE_C11_CS_033,
  NODE_C11_CS_034,
  NODE_C11_CS_035,
  NODE_C11_CS_036,
  NODE_C11_CS_037,
  NODE_C11_CS_038,
  NODE_C11_CS_039,
  NODE_C11_CS_040,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'IRCTC Tatkal Booking Engine & Core Data Architecture',
  intro: 'You are the Chief Systems Architect redesigning the core booking engine for Indian Railways (IRCTC). At 10:00 AM, 3.5 million passengers hit the servers simultaneously.',
  context: 'A single wrong choice in your memory structures, sorting routines, queue buffers, or relational schema will cause server crash or double-booking catastrophes.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'When 50,000 users click "Book Ticket" in the same millisecond, which data structure ensures strict First-Come, First-Served ticket allocation without skipping anyone?',
  options: [
    'Stack (LIFO) — the latest request is processed immediately',
    'Queue (FIFO) — requests wait in line and get served in arrival order',
    'Binary Tree — requests branch out randomly',
    'Array with random access — requests are picked by index',
  ],
  correctIndex: 1,
  hintAfter: 'Think about standing in line at a physical reservation counter in New Delhi station. First in line gets served first!',
};

// ─── INTERFACES ───
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

interface LinkedListNode {
  id: string;
  val: number;
  address: string;
  nextAddress: string | null;
}

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

// ─── DEFAULT ENRICHMENT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_CS_031,
  title: 'Data Structures, Algorithms & Database Systems',
  definition: 'A data structure is a systematic way of organising and storing data in computer memory to enable efficient access and modification. Linear structures (arrays, stacks, queues, linked lists) arrange elements sequentially, while non-linear structures (trees, graphs) maintain hierarchical or network relationships.',
  eli5: 'Think of data structures like specialized storage containers in a warehouse: a stack is a pile of trays, a queue is a ticket queue, a linked list is a scavenger hunt chain of clues, and a database is an organised spreadsheet filing cabinet.',
  misconceptions: [
    {
      misconception: 'Pop in a stack deletes the bottom-most item first because array indexing begins at 0.',
      correction: 'A stack is strictly LIFO (Last-In-First-Out). Pop removes the item at index `top` (the most recently pushed item).',
    },
    {
      misconception: 'In an array-based stack, top should start at 0 when empty.',
      correction: 'An empty stack has top = -1. If top was 0, arr[0] would be treated as an occupied element.',
    },
    {
      misconception: 'Selection Sort is stable because it finds the absolute minimum each pass.',
      correction: 'Selection sort is UNSTABLE. Swapping the minimum with an element far away can jump over equal elements and invert their relative order.',
    },
    {
      misconception: 'A Primary Key and a UNIQUE constraint are identical.',
      correction: 'A Primary Key uniquely identifies a row and CANNOT contain NULL. A UNIQUE constraint allows one NULL value and is not necessarily the table identifier.',
    },
    {
      misconception: 'A Foreign Key must always be unique in its own table.',
      correction: 'A Foreign Key references a unique primary key in another table, but can repeat multiple times in its own table (e.g. many ticket bookings for one train).',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which principle governs a computer Stack data structure?', options: ['FIFO', 'LIFO', 'LILO', 'Random'], correctIndex: 1 },
    { question: 'What is the initial value of the `top` pointer for an empty array-based stack?', options: ['0', '-1', 'null', '1'], correctIndex: 1 },
    { question: 'Which data structure has O(1) time complexity for insertion at the head without shifting?', options: ['Array', 'Singly Linked List', 'Sorted Array', 'Binary Heap'], correctIndex: 1 },
    { question: 'What is the worst-case time complexity of Merge Sort?', options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(1)'], correctIndex: 1 },
    { question: 'What does the `front` index of a linear queue point to?', options: ['The next available free slot', 'The oldest element waiting to be dequeued', 'The newest element', 'The middle item'], correctIndex: 1 },
    { question: 'Which key enforces referential integrity across relational tables?', options: ['Candidate Key', 'Primary Key', 'Foreign Key', 'Alternate Key'], correctIndex: 2 },
    { question: 'In Big O notation, which term dominates in the polynomial 4n^2 + 100n + 5000?', options: ['5000', '100n', 'n^2', 'n log n'], correctIndex: 2 },
    { question: 'What is the degree of a relational table?', options: ['Total number of rows', 'Total number of columns/attributes', 'Number of primary keys', 'Number of foreign keys'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student must demonstrate deep conceptual and practical mastery of Linear/Non-linear structures, Stacks, Queues, Linked Lists, Big O complexity, Sorting algorithms, and Relational Database schema design.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Stack Engine: LIFO & Top Pointer',
    instruction: 'Push values into the stack. Notice how `top` increments from -1, and watch how Pop removes from the top only.',
    interactionType: 'stack-lab',
    nodeId: NODE_C11_CS_032,
  },
  {
    title: '2. Queue Dispatcher: FIFO & Front/Rear',
    instruction: 'Enqueue passengers into the IRCTC queue and Dequeue them. Observe how Rear advances on entry and Front advances on departure.',
    interactionType: 'queue-lab',
    nodeId: NODE_C11_CS_034,
  },
  {
    title: '3. Singly Linked List: Pointer Chains & Memory',
    instruction: 'Insert nodes at Head or Tail. See how dynamic nodes link together via memory addresses with no contiguous constraints.',
    interactionType: 'linkedlist-lab',
    nodeId: NODE_C11_CS_035,
  },
  {
    title: '4. Big-O Complexity Growth Curve',
    instruction: 'Slide the Input Size (n) from 4 to 64. Compare the operation count of O(1), O(log n), O(n), O(n log n), and O(n²).',
    interactionType: 'complexity-lab',
    nodeId: NODE_C11_CS_037,
  },
  {
    title: '5. Relational Schema & Key Mapping',
    instruction: 'Inspect the Train and Booking tables. Notice how the Foreign Key constraint enforces Referential Integrity across entities.',
    interactionType: 'dbms-lab',
    nodeId: NODE_C11_CS_040,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an array-based stack has capacity 4, and you push 10, 20, 30, 40, pop once, and push 50, what is the value at the top and the top index?',
    options: ['Value: 40, Top: 3', 'Value: 50, Top: 3', 'Value: 50, Top: 4 (Overflow)', 'Value: 30, Top: 2'],
    correctIndex: 1,
    verifyInstruction: 'Use the Stack simulation controls below: Push 10, 20, 30, 40, click Pop, then Push 50. Watch the `top` indicator!',
    nodeId: NODE_C11_CS_032,
  },
  {
    question: 'Predict: If you double input size n from 50 to 100 in Bubble Sort (O(n²)), by what factor will the operations multiply?',
    options: ['2x (doubles)', '4x (quadruples)', '10x', 'Remains unchanged'],
    correctIndex: 1,
    verifyInstruction: 'Move the input size slider from 50 to 100 in the Big-O visualizer and observe the O(n²) bar grow from 2,500 to 10,000!',
    nodeId: NODE_C11_CS_037,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the addresses in the Singly Linked List vs an Array?',
    observableOptions: [
      'Array indices must be contiguous (0,1,2...), while Linked List node memory addresses can be scattered arbitrarily across RAM',
      'Linked lists cannot hold integers',
      'Arrays require references in each element',
      'Linked lists have fixed sizes decided at compile time',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_CS_036,
  },
  {
    question: 'In the Queue simulation, when the last element is dequeued leaving the queue empty, what happens to front and rear?',
    observableOptions: [
      'Both reset to -1 indicating an empty queue underflow state',
      'Both stay at the last index and wrap automatically without check',
      'Front goes to 100 and rear becomes 0',
      'The queue crashes immediately',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_CS_034,
  },
];

// ─── 20 CHALLENGES (NEP 2020 & CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION TIER (1-7) ──
  {
    id: 'ch_001_cs',
    nodeId: NODE_C11_CS_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is a non-linear data structure?',
    options: ['Queue', 'Array', 'Binary Tree', 'Singly Linked List'],
    correctIndex: 2,
    explanation: 'A Binary Tree is a non-linear hierarchical data structure where nodes branch into parent-child relationships, unlike arrays, stacks, queues, and linked lists which arrange elements in a linear sequence.',
    hints: [
      'Linear structures arrange items one after another in a straight line.',
      'Non-linear structures branch out hierarchically or as networks.',
      'A tree has a root with branching children, making it non-linear.',
    ],
  },
  {
    id: 'ch_002_cs',
    nodeId: NODE_C11_CS_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In an array-based stack implementation with capacity 5, what condition indicates a Stack Underflow?',
    options: ['top == 0', 'top == 4', 'top == -1', 'top == 5'],
    correctIndex: 2,
    explanation: 'An empty stack has its top pointer at -1. Attempting to pop when top == -1 triggers a Stack Underflow runtime error.',
    hints: [
      'Array index 0 holds the very first element.',
      'If top is 0, the stack already contains 1 item at arr[0].',
      'Therefore, the sentinel value representing "no items" is top == -1.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_003_cs',
    nodeId: NODE_C11_CS_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In a standard linear Queue implemented with an array, where do insertions and deletions take place?',
    options: [
      'Both insertion and deletion at the Top',
      'Insertion at the Front, Deletion at the Rear',
      'Insertion at the Rear (Enqueue), Deletion at the Front (Dequeue)',
      'Arbitrary insertion anywhere using direct subscript',
    ],
    correctIndex: 2,
    explanation: 'A Queue follows FIFO (First-In, First-Out): new arrivals enter at the rear (Enqueue) and the oldest waiting element leaves from the front (Dequeue).',
    hints: [
      'Think of standing in a queue for a train ticket.',
      'New passengers join at the back (rear).',
      'Tickets are issued and passengers leave from the front.',
    ],
  },
  {
    id: 'ch_004_cs',
    nodeId: NODE_C11_CS_035,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each structural part of a Singly Linked List Node to its correct diagram box.',
    dragItems: [
      { label: 'Data Field', targetId: 'box_data' },
      { label: 'Next Pointer', targetId: 'box_next' },
      { label: 'Head Pointer', targetId: 'box_head' },
      { label: 'Null Terminator', targetId: 'box_null' },
    ],
    correctMapping: {
      box_head: 'Head Pointer',
      box_data: 'Data Field',
      box_next: 'Next Pointer',
      box_null: 'Null Terminator',
    },
    explanation: 'A Singly Linked List begins at Head, each node contains a Data Field and a Next Pointer storing the reference to the successor node, and the last node points to Null.',
    hints: [
      'The entry pointer to the first node is Head.',
      'Inside each node, one compartment holds the payload value (Data).',
      'The address link pointing forward is Next, and the terminating link is Null.',
    ],
  },
  {
    id: 'ch_005_cs',
    nodeId: NODE_C11_CS_037,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the time complexity of accessing an element in an array by its index arr[k]?',
    options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
    correctIndex: 2,
    explanation: 'Because array elements are stored in contiguous memory, the hardware computes address = base + k * size in a single calculation, giving O(1) constant time random access.',
    hints: [
      'Does the computer need to loop through earlier elements to reach index k?',
      'Memory address calculation uses direct math: Base + k * element_size.',
      'Direct index access takes constant time O(1).',
    ],
  },
  {
    id: 'ch_006_cs',
    nodeId: NODE_C11_CS_039,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the term for the overall structural design or blueprint of a database?',
    options: ['Database Instance', 'Database Schema', 'Data Dictionary', 'Query Optimizer'],
    correctIndex: 1,
    explanation: 'The Database Schema is the formal logical blueprint describing tables, attributes, types, and constraints. The Instance is the actual data populated at a specific point in time.',
    hints: [
      'Think of an architect blueprint for a building vs the people inside.',
      'The blueprint that defines the structure is the Schema.',
      'The changing records inside make up the Instance.',
    ],
  },
  {
    id: 'ch_007_cs',
    nodeId: NODE_C11_CS_040,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'If a Student table has 5 columns (RollNo, Name, Class, DOB, City) and contains 120 student records, what are its Degree and Cardinality?',
    options: [
      'Degree = 120, Cardinality = 5',
      'Degree = 5, Cardinality = 120',
      'Degree = 25, Cardinality = 600',
      'Degree = 600, Cardinality = 5',
    ],
    correctIndex: 1,
    explanation: 'Degree is the number of attributes (columns) = 5. Cardinality is the number of tuples (rows) = 120.',
    hints: [
      'Degree counts columns (attributes).',
      'Cardinality counts rows (tuples/records).',
      '5 columns = Degree 5; 120 rows = Cardinality 120.',
    ],
  },

  // ── STANDARD TIER (8-14) ──
  {
    id: 'ch_008_cs',
    nodeId: NODE_C11_CS_032,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An empty array-based stack of capacity 6 undergoes: push(12), push(25), push(9), pop(), push(33), push(45), pop(), push(18). What is the FINAL value of `top` index?',
    correctAnswer: 3,
    tolerance: 0,
    unit: 'index',
    explanation: 'Trace: push(12)->top 0; push(25)->top 1; push(9)->top 2; pop()->top 1; push(33)->top 2; push(45)->top 3; pop()->top 2; push(18)->top 3. Final top is 3.',
    hints: [
      'Start with top = -1.',
      'Each push increments top by +1. Each pop decrements top by -1.',
      'Total: 5 pushes (+5) and 2 pops (-2). Initial -1 + 5 - 2 = 2. Trace step-by-step: -1+1=0, +1=1, +1=2, -1=1, +1=2, +1=3, -1=2, +1=3.',
    ],
  },
  {
    id: 'ch_009_cs',
    nodeId: NODE_C11_CS_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Convert the infix expression `(A + B) * C - D / E` to its correct Postfix (RPN) form.',
    options: [
      'A B + C * D E / -',
      'A B C + * D E / -',
      'A B + * C D E / -',
      '+ A B * C - / D E',
    ],
    correctIndex: 0,
    explanation: 'Parentheses evaluate `(A + B)` first -> `AB+`. Next `* C` -> `AB+C*`. Then `D / E` -> `DE/`. Finally `-` -> `AB+C*DE/-`.',
    hints: [
      'Operators inside parentheses have highest priority: (A + B) becomes AB+.',
      'Next evaluate multiplication with C: AB+C*.',
      'Then evaluate division: DE/. Finally combine with subtraction: AB+C*DE/-.',
    ],
  },
  {
    id: 'ch_010_cs',
    nodeId: NODE_C11_CS_033,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Evaluate the postfix expression: `6 3 2 + * 5 -`. What is the resulting numerical value?',
    correctAnswer: 25,
    tolerance: 0,
    unit: '',
    explanation: 'Scan tokens: push 6, push 3, push 2. See `+` -> pop 2 and 3, compute 3+2=5, push 5. Stack: [6, 5]. See `*` -> pop 5 and 6, compute 6*5=30, push 30. Push 5. See `-` -> pop 5 and 30, compute 30-5=25.',
    hints: [
      'First operator is `+` on operands 3 and 2 -> 3 + 2 = 5.',
      'Next operator is `*` on operands 6 and 5 -> 6 * 5 = 30.',
      'Final operator is `-` on operands 30 and 5 -> 30 - 5 = 25.',
    ],
  },
  {
    id: 'ch_011_cs',
    nodeId: NODE_C11_CS_035,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the pointer operations in correct sequential order to insert a `newNode` at the BEGINNING (Head) of a singly linked list without losing memory links.',
    sortItems: [
      'Allocate memory and assign data to newNode',
      'Set newNode.next = head (link newNode to existing chain)',
      'Update head = newNode (declare newNode as the new head)',
      'Return updated head reference',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'You MUST point `newNode.next` to the existing `head` BEFORE updating `head = newNode`. If you update `head` first, you lose the reference to the rest of the list forever!',
    hints: [
      'First allocate the new node.',
      'CRITICAL: Link the new node to the old list before changing the head pointer.',
      'Lastly point the head pointer to the new node.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_012_cs',
    nodeId: NODE_C11_CS_036,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'IRCTC passenger waiting list requires frequent insertions and deletions at unpredictable positions. Why is a Linked List preferred over an Array for this specific requirement?',
    options: [
      'Linked lists allow O(1) random index access',
      'Inserting/deleting in an array requires O(n) shifting of elements, whereas linked list nodes just update pointers',
      'Arrays use more memory per integer than linked lists',
      'Linked lists store data contiguously in CPU L1 cache',
    ],
    correctIndex: 1,
    explanation: 'In an array, removing or inserting an item in the middle forces all subsequent elements to shift forward or backward (O(n)). In a linked list, inserting/deleting at a known node is O(1) pointer redirection.',
    hints: [
      'What happens when you delete an item from index 2 in an array of 5,000 items?',
      'All 4,997 remaining elements must be shifted in memory.',
      'In a linked list, only pointer references are adjusted.',
    ],
  },
  {
    id: 'ch_013_cs',
    nodeId: NODE_C11_CS_038,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is Selection Sort classified as an UNSTABLE sorting algorithm?',
    options: [
      'Because its worst-case time complexity is O(n log n)',
      'Because a long-distance swap of the minimum element can jump over identical elements and reverse their original order',
      'Because it uses recursive divide-and-conquer calls',
      'Because it requires O(n) auxiliary memory',
    ],
    correctIndex: 1,
    explanation: 'Stability means elements with equal keys maintain their relative initial order. In Selection Sort, swapping the found minimum with the element at the beginning of the unsorted sub-array can jump over an identical element, destroying stability.',
    hints: [
      'Consider sorting cards with values [3a, 3b, 1].',
      'Selection sort finds 1 as minimum and swaps it with the first element 3a.',
      'The array becomes [1, 3b, 3a]. The relative order of 3a and 3b was reversed!',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_014_cs',
    nodeId: NODE_C11_CS_040,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a railway database with `Train(TrainNo PK, TrainName)` and `Booking(PNR PK, PassengerName, TrainNo FK)`, which constraint prevents booking a ticket for a non-existent TrainNo?',
    options: ['NOT NULL constraint', 'UNIQUE constraint on PassengerName', 'Foreign Key Referential Integrity constraint', 'DEFAULT constraint'],
    correctIndex: 2,
    explanation: 'The Foreign Key constraint enforces Referential Integrity: any TrainNo entered in the Booking table MUST already exist in the parent Train table as a valid primary key.',
    hints: [
      'The child table column references the parent table primary key.',
      'This relationship ensures references never point to ghost records.',
      'This is called Foreign Key Referential Integrity.',
    ],
    misconceptionIndex: 4,
  },

  // ── ADVANCED TIER (15-20) ──
  {
    id: 'ch_015_cs',
    nodeId: NODE_C11_CS_037,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'An algorithm has exact step count T(n) = 5n² + 40n + 120. If n = 200, what percentage of the total operations is contributed by the DOMINANT quadratic term (5n²)? (Round to nearest integer)',
    correctAnswer: 96,
    tolerance: 1,
    unit: '%',
    explanation: '5*(200²) = 5*40,000 = 200,000. Linear term = 40*200 = 8,000. Constant = 120. Total = 208,120. Dominant share = (200,000 / 208,120) * 100 = 96.1%. This proves why Big-O ignores lower order terms!',
    hints: [
      'Calculate 5 * (200)^2 = 200,000.',
      'Calculate total = 200,000 + 8,000 + 120 = 208,120.',
      'Compute (200,000 / 208,120) * 100.',
    ],
  },
  {
    id: 'ch_016_cs',
    nodeId: NODE_C11_CS_038,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'For an already NEARLY-SORTED array of 100,000 student marks, which sorting algorithm will execute in close to O(n) linear time with O(1) auxiliary space?',
    options: ['Selection Sort', 'Insertion Sort', 'Merge Sort', 'Unoptimized Bubble Sort'],
    correctIndex: 1,
    explanation: 'Insertion Sort only makes comparisons against immediately preceding elements. If data is nearly sorted, inner loop shifts terminate in O(1) per element, yielding O(n) overall time with zero extra heap memory.',
    hints: [
      'Selection sort always scans the entire remaining sub-array regardless of order (O(n²)).',
      'Merge sort always divides and merges in O(n log n) with O(n) memory.',
      'Insertion sort checks adjacent elements and stops early when in order, running in O(n) on nearly-sorted data.',
    ],
  },
  {
    id: 'ch_017_cs',
    nodeId: NODE_C11_CS_033,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the algorithmic condition for Balanced Parentheses: when a closing bracket `)` is scanned, what checks must succeed?',
    availableParts: ['!stack.isEmpty()', '&&', 'stack.pop() == (', 'stack.push()', '||', 'stack.peek() == )'],
    targetState: '!stack.isEmpty() && stack.pop() == (',
    validationHint: 'The stack must NOT be empty AND the popped top bracket must match the opening pair `(`.',
    explanation: 'To match a closing parenthesis `)`, we must ensure the stack is not empty (otherwise underflow / unbalanced), and the popped bracket must be the corresponding opening `(`.',
    hints: [
      'Check if stack has brackets left: `!stack.isEmpty()`.',
      'Combine with logical AND `&&`.',
      'Pop and check matching character: `stack.pop() == (`.',
    ],
  },
  {
    id: 'ch_018_cs',
    nodeId: NODE_C11_CS_040,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What is the fundamental difference between a Primary Key and a column with a UNIQUE constraint in SQL?',
    options: [
      'There is no difference; they are interchangeable synonyms in all RDBMS',
      'A table can have only ONE Primary Key and it strictly forbids NULL values; a table can have multiple UNIQUE constraints and UNIQUE permits a NULL value',
      'Primary Keys can only be integers, while UNIQUE can only be strings',
      'UNIQUE constraints automatically create foreign keys in other tables',
    ],
    correctIndex: 1,
    explanation: 'A relation can have at most one Primary Key which guarantees entity integrity (unique + NOT NULL). A relation can have multiple UNIQUE columns, and according to SQL standards, UNIQUE allows a NULL value.',
    hints: [
      'Can a table have 3 primary keys?',
      'Can a Primary Key column be left NULL / blank?',
      'Primary Key is unique + NOT NULL (max 1 per table); UNIQUE constraint allows NULL (multiple per table).',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_019_cs',
    nodeId: NODE_C11_CS_034,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In a Circular Queue of size 5 with 0-based indexing, if front = 2 and rear = 4, what are the new values of front and rear after one ENQUEUE followed by one DEQUEUE?',
    options: [
      'front = 3, rear = 0',
      'front = 2, rear = 0',
      'front = 3, rear = 4',
      'front = 0, rear = 0',
    ],
    correctIndex: 0,
    explanation: 'Enqueue: rear = (4 + 1) % 5 = 0. Queue now has rear = 0. Dequeue: front = (2 + 1) % 5 = 3. Final state: front = 3, rear = 0.',
    hints: [
      'Modulo arithmetic for circular queue: index = (index + 1) % size.',
      'Enqueue advances rear: (4 + 1) % 5 = 0.',
      'Dequeue advances front: (2 + 1) % 5 = 3.',
    ],
  },
  {
    id: 'ch_020_cs',
    nodeId: NODE_C11_CS_039,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How does Logical Data Independence differ from Physical Data Independence in database architecture?',
    options: [
      'Logical data independence protects external views when conceptual schema changes; Physical data independence protects conceptual schema when disk/hardware storage structures change',
      'Logical data independence is about SQL syntax; Physical data independence is about Java bytecode',
      'Physical data independence only applies to NoSQL databases',
      'Logical independence means you do not need primary keys',
    ],
    correctIndex: 0,
    explanation: 'Logical Data Independence isolates application programs from alterations in the logical design (e.g. adding a new table column). Physical Data Independence isolates the logical schema from hardware storage changes (e.g. upgrading to NVMe SSDs or changing B-Tree indexing).',
    hints: [
      'Physical relates to hard drives, SSD storage, and byte-level file organization.',
      'Logical relates to tables, columns, and conceptual schema entities.',
      'Logical independence protects user views; Physical independence protects conceptual schema from storage changes.',
    ],
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'IRCTC Architecture Audit Challenge',
  description: 'Design the data architecture for a real-time Tatkal Emergency Booking System handling 10,000 passenger requests per second.',
  steps: [
    'Choose the optimal in-memory queue buffer structure (Linear array with shifting vs Circular queue vs Linked List queue) and justify why circular queue avoids memory exhaustion.',
    'Formulate the schema for PASSENGER, TICKET, and TRAIN tables with primary keys, foreign keys, and CHECK constraints (e.g. Age > 0 and CoachNo BETWEEN 1 AND 24).',
    'Calculate the Big-O time complexity for sorting 500,000 waiting list passengers by booking timestamp using Merge Sort vs Bubble Sort.',
    'Present your architectural blueprint to your teacher or peer review team.',
  ],
};

function C11_ComputerScienceDataStructuresIntroductionSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_CS_031,
  title = DEFAULT_PROPS.title || 'Data Structures Introduction',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['compsci'] || { name: 'Computer Science', emoji: '💻', color: 'indigo' };

  // ── Phase Flow State ──
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ── Discovery & Curiosity Hook ──
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ── Predict-then-Check & Observation State ──
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ── Interactive Visualizer States ──
  // 1. Stack State
  const [stackItems, setStackItems] = useState<number[]>([10, 20]);
  const [stackCapacity] = useState(5);
  const [stackTop, setStackTop] = useState(1);
  const [stackInputVal, setStackInputVal] = useState(30);

  // 2. Queue State
  const [queueItems, setQueueItems] = useState<(string | null)[]>([null, null, null, null, null]);
  const [queueCapacity] = useState(5);
  const [queueFront, setQueueFront] = useState(-1);
  const [queueRear, setQueueRear] = useState(-1);
  const [queuePassengerName, setQueuePassengerName] = useState('P1');

  // 3. Linked List State
  const [linkedList, setLinkedList] = useState<LinkedListNode[]>([
    { id: 'n1', val: 101, address: '0x1A4', nextAddress: '0x2B8' },
    { id: 'n2', val: 102, address: '0x2B8', nextAddress: '0x3C4' },
    { id: 'n3', val: 103, address: '0x3C4', nextAddress: null },
  ]);
  const [newListNodeVal, setNewListNodeVal] = useState(104);

  // 4. Complexity & Algorithm Curve State
  const [inputSizeN, setInputSizeN] = useState(16);
  const [activeSortAlgo, setActiveSortAlgo] = useState<'bubble' | 'selection' | 'insertion' | 'merge'>('bubble');

  // ── Adaptive & Mastery State ──
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ── Hints & Feedback States ──
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ── Drag and Interactive Challenges State ──
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ── Reflection State ──
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // ── UI Visual Feedback ──
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // ── Misconception Tracker ──
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ── Refs ──
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ── Filtered Challenges by Adaptive Difficulty ──
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
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ── Real-time Stack Helpers ──
  const handleStackPush = useCallback(() => {
    if (stackItems.length >= stackCapacity) {
      audioManager.play('error');
      speechManager.speak('Stack Overflow! The stack is at full capacity.');
      return;
    }
    const val = stackInputVal;
    setStackItems(prev => [...prev, val]);
    setStackTop(prev => prev + 1);
    setStackInputVal(v => v + 10);
    audioManager.play('count');
    speechManager.speak(`Pushed ${val} onto top of stack.`);
  }, [stackItems.length, stackCapacity, stackInputVal]);

  const handleStackPop = useCallback(() => {
    if (stackItems.length === 0) {
      audioManager.play('error');
      speechManager.speak('Stack Underflow! Top is minus 1.');
      return;
    }
    const poppedVal = stackItems[stackItems.length - 1];
    setStackItems(prev => prev.slice(0, prev.length - 1));
    setStackTop(prev => prev - 1);
    audioManager.play('pop');
    speechManager.speak(`Popped ${poppedVal} from top.`);
  }, [stackItems]);

  const handleStackPeek = useCallback(() => {
    if (stackItems.length === 0) {
      speechManager.speak('Stack is empty.');
      return;
    }
    const topVal = stackItems[stackItems.length - 1];
    audioManager.play('chime');
    speechManager.speak(`Top element is ${topVal} at index ${stackTop}`);
  }, [stackItems, stackTop]);

  // ���─ Real-time Queue Helpers ──
  const handleQueueEnqueue = useCallback(() => {
    let count = 0;
    for (const item of queueItems) {
      if (item !== null) count++;
    }
    if (count >= queueCapacity) {
      audioManager.play('error');
      speechManager.speak('Queue Overflow! All buffer slots occupied.');
      return;
    }

    const nextRear = queueRear === -1 ? 0 : (queueRear + 1) % queueCapacity;
    const nextFront = queueFront === -1 ? 0 : queueFront;
    const newArr = [...queueItems];
    newArr[nextRear] = queuePassengerName;

    setQueueItems(newArr);
    setQueueRear(nextRear);
    setQueueFront(nextFront);
    const pNum = parseInt(queuePassengerName.replace('P', ''), 10) || 1;
    setQueuePassengerName(`P${pNum + 1}`);
    audioManager.play('pickup');
    speechManager.speak(`Enqueued passenger at rear index ${nextRear}.`);
  }, [queueItems, queueCapacity, queueRear, queueFront, queuePassengerName]);

  const handleQueueDequeue = useCallback(() => {
    if (queueFront === -1) {
      audioManager.play('error');
      speechManager.speak('Queue Underflow! Queue is empty.');
      return;
    }

    const removedPassenger = queueItems[queueFront];
    const newArr = [...queueItems];
    newArr[queueFront] = null;

    if (queueFront === queueRear) {
      setQueueFront(-1);
      setQueueRear(-1);
    } else {
      setQueueFront((queueFront + 1) % queueCapacity);
    }

    setQueueItems(newArr);
    audioManager.play('pop');
    speechManager.speak(`Dequeued ${removedPassenger} from front.`);
  }, [queueFront, queueRear, queueItems, queueCapacity]);

  // ── Real-time Linked List Helpers ──
  const handleLinkedListInsertHead = useCallback(() => {
    const newAddress = '0x' + Math.floor(Math.random() * 0xFFF).toString(16).toUpperCase().padStart(3, '0');
    const headNext = linkedList.length > 0 ? linkedList[0].address : null;
    const newNode: LinkedListNode = {
      id: 'n_' + Date.now(),
      val: newListNodeVal,
      address: newAddress,
      nextAddress: headNext,
    };
    setLinkedList(prev => [newNode, ...prev]);
    setNewListNodeVal(v => v + 5);
    audioManager.play('drop-correct');
    speechManager.speak(`Inserted node ${newNode.val} at head.`);
  }, [linkedList, newListNodeVal]);

  const handleLinkedListDeleteHead = useCallback(() => {
    if (linkedList.length === 0) {
      audioManager.play('error');
      speechManager.speak('Linked list is already empty.');
      return;
    }
    const removed = linkedList[0].val;
    setLinkedList(prev => prev.slice(1));
    audioManager.play('pop');
    speechManager.speak(`Removed head node ${removed}.`);
  }, [linkedList]);

  // ── Sorting & Canvas Animation Effect ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;
    const rawArray = [45, 12, 78, 23, 67, 34, 89, 15, 56, 90];

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = 24;
      const gap = 8;
      const startX = 20;

      rawArray.forEach((val, idx) => {
        const x = startX + idx * (barWidth + gap);
        const barHeight = (val / 100) * (canvas.height - 40);
        const y = canvas.height - 20 - barHeight;

        const isHighlight = Math.floor((tick / 30) % rawArray.length) === idx;
        ctx.fillStyle = isHighlight ? '#38bdf8' : '#6366f1';

        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
        ctx.fill();

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '10px monospace';
        ctx.fillText(String(val), x + 4, canvas.height - 6);
      });

      ctx.fillStyle = '#38bdf8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Algorithm: ${activeSortAlgo.toUpperCase()} SORT`, 15, 18);

      const complexityText =
        activeSortAlgo === 'merge' ? 'Time: O(n log n) | Stable: YES' :
        activeSortAlgo === 'insertion' ? 'Time: O(n²) worst, O(n) best | Stable: YES' :
        activeSortAlgo === 'selection' ? 'Time: O(n²) | Stable: NO' :
        'Time: O(n²) | Stable: YES';

      ctx.fillStyle = '#94a3b8';
      ctx.fillText(complexityText, 15, 32);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeSortAlgo]);

  // ── Escalating Hints ──
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
    }
  }, [hintCount, challenge]);

  // ── Auto-hint Inactivity Timer ──
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ── Discovery Handlers ──
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Great intuition! FIFO queues prevent ticket hoarding and preserve fairness.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive data structures lab. Step through and manipulate each structure.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Sandbox mode: test any data structure freely with no grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenges initiated. Let us prove your computer science mastery!');
  }, []);

  // ── Prediction & Observation Handlers ──
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Now verify by interacting with the visual controls.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Check the memory address pointers again.');
  }, []);

  // ── Drag and Drop Handlers ──
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
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 400);
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  // ── Sort Handlers ──
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = [...prev];
      if (arr.length === 0 && challenge.sortItems) {
        arr = challenge.sortItems.map((_, i) => i);
      }
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0
        ? sortArrangement
        : challenge.sortItems?.map((_, i) => i) || [];
    const isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Correct algorithmic sequence!');
      setShowConfetti(true);
      setShowExplanation(true);
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('error');
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      setErrors(e => e + 1);
      showNextHint();
    }
  }, [sortArrangement, challenge, showNextHint]);

  // ── General Answer Handler ──
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
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
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding technical analysis.');
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
        speechManager.speak('Let us study the complete algorithmic derivation together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // ── Completion Handler ──
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_CS_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have successfully mastered Data Structures, Algorithms and Database Concepts.');
  }, [errors, onComplete]);

  // ── Next Challenge Handler ──
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

  // ── Clean Up on Unmount ──
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ── HEADER HUD ── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300">
              {title}
            </h1>
            <p className="text-xs text-slate-400">Class 11 ISC Computer Science (2026 NEP Standard)</p>
          </div>
        </div>

        {/* Status Pill & Difficulty Badge */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 border-rose-500/50 text-rose-400'
                : 'bg-indigo-950/60 border-indigo-500/50 text-indigo-400'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="px-3 py-1 bg-slate-800/80 rounded-full text-xs text-slate-300 border border-slate-700">
            Phase: <strong className="text-sky-400 capitalize">{phase}</strong>
          </span>
        </div>
      </motion.div>

      {/* ── PHASE 1: DISCOVERY HOOK ── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-6 space-y-6">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/30">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Scenario Mission</span>
            <h2 className="text-lg md:text-xl font-bold text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-amber-300/90 mt-2 font-medium bg-amber-950/30 p-2.5 rounded-lg border border-amber-800/40">
              ⚠️ {SCENARIO.context}
            </p>
          </div>

          {/* TOPIC SVG DIAGRAM 1: LIFO vs FIFO Architectural Model */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              System Architecture Diagram: Stack (LIFO) vs Queue (FIFO) Data Flow
            </span>
            <svg viewBox="0 0 680 150" className="w-full h-auto bg-slate-900/80 rounded-xl p-2 border border-slate-800">
              {/* Stack Architecture Section */}
              <rect x="20" y="15" width="300" height="120" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="170" y="35" textAnchor="middle" fill="#a5b4fc" fontWeight="bold" fontSize="12">
                STACK (LIFO Engine)
              </text>
              <rect x="60" y="50" width="80" height="24" rx="4" fill="#312e81" stroke="#818cf8" />
              <text x="100" y="66" textAnchor="middle" fill="#e0e7ff" fontSize="10">Push Item ➔</text>
              <rect x="60" y="80" width="80" height="24" rx="4" fill="#312e81" stroke="#818cf8" />
              <text x="100" y="96" textAnchor="middle" fill="#e0e7ff" fontSize="10">⮌ Pop Item</text>
              <rect x="180" y="50" width="110" height="60" rx="4" fill="#0f172a" stroke="#cbd5e1" strokeDasharray="3 3" />
              <text x="235" y="75" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Top Pointer</text>
              <text x="235" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Single End I/O</text>

              {/* Queue Architecture Section */}
              <rect x="360" y="15" width="300" height="120" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="510" y="35" textAnchor="middle" fill="#6ee7b7" fontWeight="bold" fontSize="12">
                QUEUE (FIFO Booking Buffer)
              </text>
              {/* Enqueue side */}
              <rect x="380" y="55" width="70" height="40" rx="4" fill="#022c22" stroke="#34d399" />
              <text x="415" y="73" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">REAR</text>
              <text x="415" y="87" textAnchor="middle" fill="#6ee7b7" fontSize="8">Enqueue ➔</text>
              <path d="M 455 75 L 565 75" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow-green)" strokeDasharray="4 2" />
              {/* Dequeue side */}
              <rect x="570" y="55" width="70" height="40" rx="4" fill="#022c22" stroke="#34d399" />
              <text x="605" y="73" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">FRONT</text>
              <text x="605" y="87" textAnchor="middle" fill="#6ee7b7" fontSize="8">➔ Dequeue</text>
            </svg>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700">
            <span className="text-xs text-sky-400 font-bold uppercase tracking-wider">Discovery Challenge</span>
            <p className="text-base font-semibold text-white mt-2 mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${opt}`}
                  className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : 'bg-slate-900/80 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <span className="font-mono text-xs text-slate-400 mr-2">[{String.fromCharCode(65 + i)}]</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 pt-4 border-t border-slate-700">
                <p className={`text-sm mb-4 leading-relaxed ${discoveryCorrect ? 'text-emerald-300 font-medium' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '✓ Correct! Queues operate on First-In-First-Out, providing equitable order processing.'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 text-sm"
                >
                  Enter Interactive Architecture Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ── PHASE 2: GUIDED INTERACTIVE EXPLORATION ── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">
                Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-3 py-1.5 bg-slate-800 rounded-lg text-xs font-semibold disabled:opacity-40"
              >
                ← Prev
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) setCurrentSlide(s => s + 1);
                  else handleAdvanceToSandbox();
                }}
                className="px-3.5 py-1.5 bg-indigo-600 rounded-lg text-xs font-bold text-white shadow"
              >
                {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next →' : 'Enter Sandbox →'}
              </motion.button>
            </div>
          </div>

          <p className="text-xs md:text-sm text-sky-300 bg-sky-950/40 p-3 rounded-xl border border-sky-800/40 flex items-center gap-2">
            <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* INTERACTIVE VISUAL CANVAS */}
          <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 min-h-[360px]">
            {/* 1. STACK LAB */}
            {currentSlide === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="flex flex-col items-center">
                  <div className="text-xs font-mono text-slate-400 mb-2">
                    STACK ARRAY (Capacity: {stackCapacity}) | <span className="text-amber-400 font-bold">top = {stackTop}</span>
                  </div>
                  {/* Vertical Stack Container */}
                  <div className="w-56 h-64 border-2 border-t-0 border-indigo-500/60 rounded-b-xl bg-slate-900/60 p-2 flex flex-col-reverse gap-2 relative">
                    {Array.from({ length: stackCapacity }).map((_, index) => {
                      const item = stackItems[index];
                      const isTop = index === stackTop && item !== undefined;
                      return (
                        <motion.div
                          key={index}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className={`h-9 rounded-lg flex items-center justify-between px-3 font-mono text-xs border transition-all ${
                            item !== undefined
                              ? isTop
                                ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/40 font-bold'
                                : 'bg-slate-800 border-slate-700 text-slate-200'
                              : 'border-dashed border-slate-700/60 text-slate-600'
                          }`}
                        >
                          <span>Index [{index}]</span>
                          <span>{item !== undefined ? item : 'empty'}</span>
                          {isTop && <span className="text-[10px] bg-amber-400 text-slate-900 px-1.5 rounded font-black">TOP</span>}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Stack Controls */}
                <div className="space-y-4">
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <h3 className="text-sm font-bold text-indigo-300 mb-3">Stack Operations (LIFO)</h3>
                    <div className="flex flex-wrap gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleStackPush}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow"
                      >
                        Push({stackInputVal})
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleStackPop}
                        className="px-4 py-2 bg-rose-600 text-white rounded-lg text-xs font-bold shadow"
                      >
                        Pop()
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleStackPeek}
                        className="px-4 py-2 bg-slate-700 text-white rounded-lg text-xs font-bold"
                      >
                        Peek()
                      </motion.button>
                    </div>
                  </div>

                  {/* Predict Check for Stack */}
                  {!predictionMade ? (
                    <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-xl">
                      <p className="text-xs font-semibold text-amber-300 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2 text-left bg-slate-800 hover:bg-slate-700 rounded text-xs text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-indigo-950/40 border border-indigo-800/40 rounded-xl">
                      <p className="text-xs text-sky-300 font-medium">{PREDICTION_QUESTIONS[0].verifyInstruction}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. QUEUE LAB */}
            {currentSlide === 1 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                  <span>CIRCULAR QUEUE BUFFER (Size: {queueCapacity})</span>
                  <span>
                    Front: <strong className="text-emerald-400">{queueFront}</strong> | Rear:{' '}
                    <strong className="text-amber-400">{queueRear}</strong>
                  </span>
                </div>

                {/* Queue Slots Horizontal */}
                <div className="grid grid-cols-5 gap-3">
                  {queueItems.map((passenger, idx) => {
                    const isFront = idx === queueFront;
                    const isRear = idx === queueRear;
                    return (
                      <motion.div
                        key={idx}
                        layout
                        className={`h-24 rounded-xl border-2 flex flex-col items-center justify-center p-2 text-center transition-all ${
                          passenger !== null
                            ? 'bg-slate-800 border-indigo-500 text-white shadow-md'
                            : 'bg-slate-900 border-dashed border-slate-700 text-slate-600'
                        }`}
                      >
                        <span className="text-[10px] text-slate-400 font-mono">[{idx}]</span>
                        <span className="text-sm font-bold my-1 text-sky-300">{passenger || 'empty'}</span>
                        <div className="flex gap-1 mt-1">
                          {isFront && <span className="text-[9px] bg-emerald-500 text-slate-950 font-black px-1 rounded">FRONT</span>}
                          {isRear && <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1 rounded">REAR</span>}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="flex gap-3 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleQueueEnqueue}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Enqueue({queuePassengerName}) [Rear +1]
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleQueueDequeue}
                    className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Dequeue() [Front +1]
                  </motion.button>
                </div>
              </div>
            )}

            {/* 3. LINKED LIST LAB */}
            {currentSlide === 2 && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    HEAD POINTER → <strong className="text-indigo-400">{linkedList.length > 0 ? linkedList[0].address : 'null'}</strong>
                  </span>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLinkedListInsertHead}
                      className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg"
                    >
                      + Insert Head ({newListNodeVal})
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLinkedListDeleteHead}
                      className="px-3 py-1.5 bg-rose-600 text-white text-xs font-bold rounded-lg"
                    >
                      - Delete Head
                    </motion.button>
                  </div>
                </div>

                {/* Linked List Node Diagram */}
                <div className="flex flex-wrap items-center gap-3 overflow-x-auto p-4 bg-slate-900 rounded-xl border border-slate-800 min-h-[140px]">
                  {linkedList.map((node, i) => (
                    <React.Fragment key={node.id}>
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex border-2 border-indigo-500/70 rounded-xl bg-slate-950 overflow-hidden shadow-lg"
                      >
                        <div className="p-2.5 bg-indigo-950/60 border-r border-indigo-500/40 text-center">
                          <span className="text-[9px] text-slate-400 block font-mono">DATA</span>
                          <span className="text-sm font-bold text-white font-mono">{node.val}</span>
                        </div>
                        <div className="p-2.5 bg-slate-900 text-center min-w-[70px]">
                          <span className="text-[9px] text-slate-400 block font-mono">NEXT PTR</span>
                          <span className="text-xs font-mono text-sky-400">{node.nextAddress || 'null'}</span>
                        </div>
                      </motion.div>
                      {i < linkedList.length - 1 && <span className="text-indigo-400 font-bold text-lg">➔</span>}
                    </React.Fragment>
                  ))}
                  {linkedList.length === 0 && <p className="text-xs text-slate-500 italic">List is empty (head == null)</p>}
                </div>

                {/* Observation check */}
                {!observationAnswered ? (
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <p className="text-xs text-slate-300 font-semibold mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="space-y-1.5">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservation(i)}
                          className="w-full text-left p-2 rounded bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-emerald-400 bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-800/40">
                    ✓ Verified: Linked list nodes hold memory addresses connecting scattered heap allocations.
                  </p>
                )}
              </div>
            )}

            {/* 4. COMPLEXITY & SORTING LAB */}
            {currentSlide === 3 && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Real-time Big-O Operation Calculator */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                      <span>Input Size (n): <strong className="text-sky-300">{inputSizeN}</strong></span>
                    </div>
                    <input
                      type="range"
                      min={4}
                      max={64}
                      value={inputSizeN}
                      onChange={e => setInputSizeN(Number(e.target.value))}
                      aria-label="Input size n slider"
                      className="w-full accent-indigo-500"
                    />

                    <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-mono">
                      <div className="p-2 bg-slate-950 rounded border border-slate-800">
                        <span className="text-slate-400 block">O(1):</span>
                        <strong className="text-emerald-400">1 op</strong>
                      </div>
                      <div className="p-2 bg-slate-950 rounded border border-slate-800">
                        <span className="text-slate-400 block">O(log n):</span>
                        <strong className="text-sky-400">{Math.round(Math.log2(inputSizeN))} ops</strong>
                      </div>
                      <div className="p-2 bg-slate-950 rounded border border-slate-800">
                        <span className="text-slate-400 block">O(n log n):</span>
                        <strong className="text-amber-400">{Math.round(inputSizeN * Math.log2(inputSizeN))} ops</strong>
                      </div>
                      <div className="p-2 bg-slate-950 rounded border border-slate-800">
                        <span className="text-slate-400 block">O(n²):</span>
                        <strong className="text-rose-400">{inputSizeN * inputSizeN} ops</strong>
                      </div>
                    </div>
                  </div>

                  {/* Canvas 2D Animated Sorting Bar Graph */}
                  <div className="flex flex-col items-center">
                    <canvas ref={canvasRef} width={320} height={150} className="w-full rounded-xl bg-slate-950 border border-slate-800" />
                    <div className="flex gap-2 mt-2">
                      {(['bubble', 'selection', 'insertion', 'merge'] as const).map(algo => (
                        <motion.button
                          key={algo}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveSortAlgo(algo)}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold capitalize transition-colors ${
                            activeSortAlgo === algo ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {algo}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* TOPIC SVG DIAGRAM 2: Big-O Asymptotic Growth Chart */}
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Big-O Asymptotic Complexity Curves Diagram
                  </span>
                  <svg viewBox="0 0 600 130" className="w-full h-28 bg-slate-950 rounded-lg">
                    {/* Axes */}
                    <line x1="40" y1="110" x2="570" y2="110" stroke="#475569" strokeWidth="1.5" />
                    <line x1="40" y1="110" x2="40" y2="15" stroke="#475569" strokeWidth="1.5" />
                    <text x="560" y="124" fill="#94a3b8" fontSize="10" textAnchor="end">n (Input Size)</text>
                    <text x="35" y="18" fill="#94a3b8" fontSize="10" textAnchor="end">Ops</text>

                    {/* O(1) Constant */}
                    <line x1="40" y1="102" x2="550" y2="102" stroke="#10b981" strokeWidth="2" />
                    <text x="555" y="105" fill="#10b981" fontSize="9" fontWeight="bold">O(1)</text>

                    {/* O(log n) */}
                    <path d="M 40 108 Q 200 95, 550 85" fill="none" stroke="#38bdf8" strokeWidth="2" />
                    <text x="555" y="88" fill="#38bdf8" fontSize="9" fontWeight="bold">O(log n)</text>

                    {/* O(n) */}
                    <line x1="40" y1="108" x2="550" y2="55" stroke="#818cf8" strokeWidth="2" />
                    <text x="555" y="58" fill="#818cf8" fontSize="9" fontWeight="bold">O(n)</text>

                    {/* O(n^2) Quadratic */}
                    <path d="M 40 108 Q 180 90, 320 20" fill="none" stroke="#f43f5e" strokeWidth="2" />
                    <text x="325" y="24" fill="#f43f5e" fontSize="9" fontWeight="bold">O(n²)</text>
                  </svg>
                </div>
              </div>
            )}

            {/* 5. DATABASE & RELATIONAL SCHEMA LAB */}
            {currentSlide === 4 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Parent Table */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-indigo-500/40">
                    <span className="text-[11px] font-bold text-indigo-300 block mb-2">PARENT TABLE: TRAIN</span>
                    <table className="w-full text-xs font-mono">
                      <thead>
                        <tr className="text-slate-400 border-b border-slate-800">
                          <th className="text-left pb-1 text-amber-400 font-bold">TrainNo [PK]</th>
                          <th className="text-left pb-1">TrainName</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-800/40">
                          <td className="text-amber-300 font-bold py-1">12951</td>
                          <td>Mumbai Rajdhani</td>
                        </tr>
                        <tr>
                          <td className="text-amber-300 font-bold py-1">12002</td>
                          <td>Shatabdi Express</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Child Table with Foreign Key */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-sky-500/40">
                    <span className="text-[11px] font-bold text-sky-300 block mb-2">CHILD TABLE: BOOKING</span>
                    <table className="w-full text-xs font-mono">
                      <thead>
                        <tr className="text-slate-400 border-b border-slate-800">
                          <th className="text-left pb-1 text-amber-400">PNR [PK]</th>
                          <th className="text-left pb-1">Passenger</th>
                          <th className="text-left pb-1 text-sky-400 font-bold">TrainNo [FK]</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-800/40">
                          <td className="py-1">821034</td>
                          <td>Aarav Mehta</td>
                          <td className="text-sky-300 font-bold">12951</td>
                        </tr>
                        <tr>
                          <td className="py-1">821035</td>
                          <td>Pooja Sharma</td>
                          <td className="text-sky-300 font-bold">12951</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* TOPIC SVG DIAGRAM 3: Relational Schema & Foreign Key Mapping */}
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Relational Schema Referential Integrity Diagram
                  </span>
                  <svg viewBox="0 0 600 110" className="w-full h-24 bg-slate-950 rounded-lg">
                    {/* Entity 1 */}
                    <rect x="30" y="20" width="180" height="70" rx="6" fill="#1e1b4b" stroke="#818cf8" />
                    <text x="120" y="40" textAnchor="middle" fill="#c7d2fe" fontWeight="bold" fontSize="11">TRAIN (Parent Entity)</text>
                    <text x="120" y="60" textAnchor="middle" fill="#fbbf24" fontSize="10 font-mono">TrainNo: PK (Unique + NOT NULL)</text>
                    <text x="120" y="76" textAnchor="middle" fill="#94a3b8" fontSize="9">TrainName</text>

                    {/* Linking arrow */}
                    <path d="M 210 55 L 370 55" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                    <text x="290" y="48" textAnchor="middle" fill="#38bdf8" fontSize="9">1-to-Many Link</text>

                    {/* Entity 2 */}
                    <rect x="370" y="20" width="200" height="70" rx="6" fill="#0f172a" stroke="#38bdf8" />
                    <text x="470" y="40" textAnchor="middle" fill="#bae6fd" fontWeight="bold" fontSize="11">BOOKING (Child Entity)</text>
                    <text x="470" y="60" textAnchor="middle" fill="#38bdf8" fontSize="10 font-mono">TrainNo: FK (References PK)</text>
                    <text x="470" y="76" textAnchor="middle" fill="#94a3b8" fontSize="9">PNR (PK), PassengerName</text>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ── PHASE 3: FREE SANDBOX EXPLORATION ── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-white">Free Architecture Sandbox</h3>
              <p className="text-xs text-slate-400 mt-1">Experiment with live data structures simultaneously with zero grading penalties.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Quick Stack Sandbox */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-indigo-400 block mb-2">Stack (LIFO)</span>
              <div className="flex gap-2 mb-3">
                <button onClick={handleStackPush} className="px-3 py-1 bg-indigo-600 text-xs rounded font-bold">Push</button>
                <button onClick={handleStackPop} className="px-3 py-1 bg-rose-600 text-xs rounded font-bold">Pop</button>
              </div>
              <p className="text-xs font-mono text-slate-300">Stack: [{stackItems.join(', ')}]</p>
              <p className="text-[11px] font-mono text-amber-400">Top Index: {stackTop}</p>
            </div>

            {/* Quick Queue Sandbox */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-sky-400 block mb-2">Queue (FIFO)</span>
              <div className="flex gap-2 mb-3">
                <button onClick={handleQueueEnqueue} className="px-3 py-1 bg-sky-600 text-xs rounded font-bold">Enqueue</button>
                <button onClick={handleQueueDequeue} className="px-3 py-1 bg-rose-600 text-xs rounded font-bold">Dequeue</button>
              </div>
              <p className="text-xs font-mono text-slate-300">Queue: [{queueItems.filter(Boolean).join(', ')}]</p>
              <p className="text-[11px] font-mono text-emerald-400">Front: {queueFront} | Rear: {queueRear}</p>
            </div>

            {/* Quick Linked List Sandbox */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-emerald-400 block mb-2">Linked List</span>
              <div className="flex gap-2 mb-3">
                <button onClick={handleLinkedListInsertHead} className="px-3 py-1 bg-emerald-600 text-xs rounded font-bold">+Head</button>
                <button onClick={handleLinkedListDeleteHead} className="px-3 py-1 bg-rose-600 text-xs rounded font-bold">-Head</button>
              </div>
              <p className="text-xs font-mono text-slate-300">Nodes: {linkedList.length}</p>
              <p className="text-[11px] font-mono text-slate-400">Head: {linkedList[0]?.address || 'null'}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── PHASE 4: CHALLENGES WITH ADAPTIVE BKT & ESCALATING HINTS ── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          {/* Challenge Header HUD */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 uppercase">
                  {challenge.competencyLevel}
                </span>
                <span className="text-[11px] font-mono text-slate-400">Node: {challenge.nodeId}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-36 md:w-48">
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-sky-400"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* QUESTION CARD */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-5 rounded-2xl transition-all border ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'bg-slate-800/80 border-slate-700'
            }`}
          >
            <p className="text-base md:text-lg font-semibold text-white leading-relaxed mb-4">
              {challenge.question}
            </p>

            {/* TYPE 1: MCQ (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015, x: 4 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <span className="font-mono text-xs text-slate-400 mr-2">[{String.fromCharCode(65 + i)}]</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* TYPE 2: DRAG-LABEL (Interactive Diagram Labeling) */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag Labels onto Target Boxes:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-600 rounded-lg text-xs font-bold text-white cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* SVG Drop Targets */}
                <svg viewBox="0 0 500 120" className="w-full bg-slate-950 rounded-xl border border-slate-800">
                  {/* Head Box */}
                  <rect x="20" y="35" width="90" height="45" rx="6" fill="#1e293b" stroke="#475569" />
                  <text x="65" y="62" textAnchor="middle" fill="#38bdf8" fontSize="10">
                    {droppedLabels.box_head || '[Drop Head]'}
                  </text>
                  <rect
                    x="20"
                    y="35"
                    width="90"
                    height="45"
                    fill="transparent"
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('box_head')}
                    className="cursor-pointer"
                  />

                  <path d="M 110 57 L 140 57" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Data Box */}
                  <rect x="140" y="25" width="85" height="65" rx="6" fill="#1e293b" stroke="#475569" />
                  <text x="182" y="62" textAnchor="middle" fill="#38bdf8" fontSize="10">
                    {droppedLabels.box_data || '[Drop Data]'}
                  </text>
                  <rect
                    x="140"
                    y="25"
                    width="85"
                    height="65"
                    fill="transparent"
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('box_data')}
                    className="cursor-pointer"
                  />

                  {/* Next Box */}
                  <rect x="225" y="25" width="85" height="65" rx="6" fill="#1e293b" stroke="#475569" />
                  <text x="267" y="62" textAnchor="middle" fill="#38bdf8" fontSize="10">
                    {droppedLabels.box_next || '[Drop Next]'}
                  </text>
                  <rect
                    x="225"
                    y="25"
                    width="85"
                    height="65"
                    fill="transparent"
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('box_next')}
                    className="cursor-pointer"
                  />

                  <path d="M 310 57 L 350 57" stroke="#6366f1" strokeWidth="2" />

                  {/* Null Box */}
                  <rect x="350" y="35" width="90" height="45" rx="6" fill="#1e293b" stroke="#475569" />
                  <text x="395" y="62" textAnchor="middle" fill="#38bdf8" fontSize="10">
                    {droppedLabels.box_null || '[Drop Null]'}
                  </text>
                  <rect
                    x="350"
                    y="35"
                    width="90"
                    height="45"
                    fill="transparent"
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('box_null')}
                    className="cursor-pointer"
                  />
                </svg>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {/* TYPE 3: DRAG-SORT */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder items into correct execution order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0', 10);
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold">
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
                  className="px-5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow mt-2"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* TYPE 4: NUMERIC */}
            {challenge.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <input
                  type="number"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter value"
                  aria-label="Numeric input answer"
                  className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white font-mono focus:border-indigo-500 focus:outline-none"
                />
                <span className="text-xs text-slate-400">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow"
                >
                  Submit Value
                </motion.button>
              </div>
            )}

            {/* TYPE 5: CONSTRUCT */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1 bg-slate-900 border border-indigo-500/50 text-indigo-300 rounded-lg text-xs font-mono"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-700 min-h-[50px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-indigo-600 text-white rounded text-xs font-mono flex items-center gap-1">
                      {part}
                      <button onClick={() => setConstructParts(p => p.filter((_, i) => i !== idx))} className="text-rose-300 font-bold ml-1">
                        ×
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500 italic">Click tokens above to construct</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow"
                >
                  Verify Constructed Code
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* PROGRESSIVE DISCLOSURE STEP-BY-STEP EXPLANATION */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-indigo-950/50 border border-indigo-700/60 rounded-2xl space-y-3"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Step-by-Step Technical Explanation:
              </span>

              {challenge.explanation
                .split('. ')
                .filter(s => s.trim().length > 0)
                .slice(0, revealedSteps + 1)
                .map((sentence, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs md:text-sm text-slate-200 leading-relaxed"
                  >
                    <strong className="text-indigo-400 font-mono">[{idx + 1}]</strong> {sentence}
                    {!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

              <div className="pt-2 flex gap-3">
                {revealedSteps <
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold"
                  >
                    Show Next Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mastery Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ── PHASE 5: COMPLETION, MOTIVATIONAL FEEDBACK & REFLECTION SECTION ── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl font-bold text-white">ISC Computer Science Mastery Certified</h2>
            <p className="text-sm text-slate-300">
              Final System Architecture Score: <strong className="text-emerald-400 text-lg">{Math.max(0, 100 - errors * 5)}%</strong>
            </p>
          </div>

          {/* MOTIVATIONAL FEEDBACK BASED ON ERRORS */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 border border-indigo-500/40 text-center shadow-lg">
            <h3 className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300 mb-1">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              {errors === 0
                ? 'Zero errors detected. You demonstrated textbook mastery of Data Structures, Big-O Analysis, and Relational Database design!'
                : errors <= 3
                ? 'High conceptual proficiency and algorithm tracing ability. Strong foundation for board exams!'
                : errors <= 7
                ? 'Solid progress. Continue reinforcing edge-case conditions and memory pointer relationships.'
                : 'Computer Science concepts take iteration and practice. Review the derivations below and try again!'}
            </p>
          </div>

          {/* SPACED REPETITION VISIBILITY CARD */}
          <div className="p-5 bg-gradient-to-r from-amber-950/40 via-indigo-950/50 to-slate-900 rounded-2xl border border-amber-500/40 shadow-md flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📅</span>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300">
                  Spaced Repetition Schedule (SM-2 Algorithm)
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Based on your performance ({errors} error{errors !== 1 ? 's' : ''}), your optimal retention window is scheduled.
                </p>
              </div>
            </div>
            <div className="px-4 py-2 bg-amber-500/20 border border-amber-400/50 rounded-xl text-center">
              <span className="text-[10px] text-amber-300 uppercase tracking-wider block font-semibold">Recommended Review</span>
              <strong className="text-base text-amber-200 font-extrabold">
                {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
              </strong>
            </div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-4">
            <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider flex items-center gap-2">
              <span>💭</span> Key Concept Reflections:
            </h3>

            {/* Reflection Question 1 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-200 block">
                1. What was the most surprising thing you learned?
              </label>
              <textarea
                rows={2}
                value={reflectionResponses.surprising}
                onChange={e => setReflectionResponses(prev => ({ ...prev, surprising: e.target.value }))}
                placeholder="e.g., Selection Sort is unstable because long-distance swaps bypass equal elements, or array index access is always O(1)..."
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Reflection Question 2 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-200 block">
                2. How would you explain this to a friend?
              </label>
              <textarea
                rows={2}
                value={reflectionResponses.explain}
                onChange={e => setReflectionResponses(prev => ({ ...prev, explain: e.target.value }))}
                placeholder="e.g., A stack is like a stack of trays (LIFO) while a queue is a ticket line (FIFO), and linked lists link memory using pointers..."
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Reflection Question 3 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-200 block">
                3. Where in real life might you use this?
              </label>
              <textarea
                rows={2}
                value={reflectionResponses.realLife}
                onChange={e => setReflectionResponses(prev => ({ ...prev, realLife: e.target.value }))}
                placeholder="e.g., Designing real-time reservation queues in IRCTC, browser back button history with stacks, or database foreign keys for e-commerce..."
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Misconception Profile Tracker */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/50 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Specific Knowledge Gaps Identified:
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-300 font-semibold">❌ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Board Standard Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real World Activity Arc */}
          <div className="p-5 bg-indigo-950/40 rounded-2xl border border-indigo-800/50 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-indigo-400 font-bold">{idx + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ── FEEDBACK OVERLAYS ── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Milestone Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_ComputerScienceDataStructuresIntroductionSim;
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

// ─── NODE IDS ───
const NODE_C11_CS_081 = 'c11_cs_081';
const NODE_C11_CS_082 = 'c11_cs_082';
const NODE_C11_CS_083 = 'c11_cs_083';
const NODE_C11_CS_084 = 'c11_cs_084';
const NODE_C11_CS_085 = 'c11_cs_085';

const ALL_NODE_IDS = [
  NODE_C11_CS_081,
  NODE_C11_CS_082,
  NODE_C11_CS_083,
  NODE_C11_CS_084,
  NODE_C11_CS_085
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The ISC Computer Science Board Rehearsal',
  intro: 'You are stepping into the final mock examination for ISC Computer Science (Subject Code 868). With 70 marks at stake across Hardware/Logic (Sec A: 25M), Java OOP (Sec B: 30M), and Python/Ethics/DBMS (Sec C: 15M), you must debug logic circuits, untangle polymorphic object references, simulate circular queues, and master number systems.',
  context: 'Examiners from CISCE have flagged recurrent student pitfalls: forgetting array allocation with new, ignoring circular queue modulo arithmetic, drawing AND instead of OR gates, and misallocating 15-minute reading time.'
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In a 4-bit two\'s complement binary system, what decimal number does the bit pattern 1011 represent?',
  options: ['+11 in decimal', '-5 in decimal', '-3 in decimal', '-11 in decimal'],
  correctIndex: 1,
  hintAfter: 'Remember: MSB is negative weight (-8), followed by +2 and +1 -> -8 + 2 + 1 = -5. Let us explore the digital foundations!'
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_081_01',
    nodeId: NODE_C11_CS_081,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the exact marks distribution for Sections A, B, and C in the ISC Class 11 Computer Science (868) Theory Paper (70 Marks)?',
    options: [
      'Section A: 20 marks, Section B: 35 marks, Section C: 15 marks',
      'Section A: 25 marks, Section B: 30 marks, Section C: 15 marks',
      'Section A: 30 marks, Section B: 25 marks, Section C: 15 marks',
      'Section A: 25 marks, Section B: 25 marks, Section C: 20 marks'
    ],
    correctIndex: 1,
    explanation: 'Section A (Hardware, Logic, Numeration) carries 25 marks. Section B (Java OOP & Algorithms) carries 30 marks. Section C (Python, Ethics, Trends) carries 15 marks.',
    hints: [
      'Section B on Java carries the single highest mark weightage.',
      'Section A is 25 marks and Section C is 15 marks.',
      'The exact split is 25 + 30 + 15 = 70 total theory marks.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_082_01',
    nodeId: NODE_C11_CS_082,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'According to De Morgan\'s Law, what is the equivalent simplified expression for (A + B\')\'?',
    options: [
      'A\' + B',
      'A\' · B',
      'A · B\'',
      '(A · B)\''
    ],
    correctIndex: 1,
    explanation: 'Applying (X + Y)\' = X\' · Y\' with X = A and Y = B\': (A + B\')\' = A\' · (B\')\' = A\' · B by the involution law.',
    hints: [
      'The complement of a sum becomes the product of the complements.',
      'Remember the involution law: (B\')\' = B.',
      'Combine: A complement is A\', and B\' complement is B, joined by AND: A\' · B.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_082_02',
    nodeId: NODE_C11_CS_082,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each logic function to its corresponding half-adder output or universal gate representation.',
    dragItems: [
      { label: 'Sum (A ⊕ B)', targetId: 'target_sum' },
      { label: 'Carry (A · B)', targetId: 'target_carry' },
      { label: 'NAND (A · B)\'', targetId: 'target_nand' },
      { label: 'NOR (A + B)\'', targetId: 'target_nor' }
    ],
    correctMapping: {
      target_sum: 'Sum (A ⊕ B)',
      target_carry: 'Carry (A · B)',
      target_nand: 'NAND (A · B)\'',
      target_nor: 'NOR (A + B)\''
    },
    explanation: 'In a half-adder: Sum is produced by XOR (A ⊕ B) and Carry is produced by AND (A · B). NAND and NOR are universal gates.',
    hints: [
      'The sum bit is 1 when inputs differ (XOR operation).',
      'The carry bit is 1 only when both inputs are 1 (AND operation).',
      'NAND is inverted product; NOR is inverted sum.'
    ]
  },
  {
    id: 'ch_083_01',
    nodeId: NODE_C11_CS_083,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A student writes: Student[] list = new Student[5]; What happens in memory immediately after this line executes in Java?',
    options: [
      '5 Student objects are instantiated with default field values',
      'An array object of 5 null references is created; no Student objects exist yet',
      'Memory is allocated and default constructor Student() runs 5 times',
      'A compilation error occurs because Student constructor parameters are missing'
    ],
    correctIndex: 1,
    explanation: 'Declaring and instantiating an array of objects creates only the array holding reference slots (all initialized to null). Each individual element must still be created via list[i] = new Student();',
    hints: [
      'Notice whether the Student() constructor was invoked with parentheses.',
      'Creating the array container is distinct from creating the objects inside.',
      'The slots contain null until individual `new Student()` calls occur.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_084_01',
    nodeId: NODE_C11_CS_084,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does a simple linear array queue suffer from "false overflow"?',
    options: [
      'Because array elements automatically double when full',
      'Because the rear pointer reaches the end of the array even if previous dequeues freed space at the front',
      'Because the front pointer moves backwards upon deletion',
      'Because dynamic memory deallocation fails in Java garbage collection'
    ],
    correctIndex: 1,
    explanation: 'In a linear queue, elements are deleted from front and inserted at rear. When rear reaches index (size - 1), no further insertions are permitted even though vacant slots exist before front.',
    hints: [
      'Think about where deletions happen and where additions happen.',
      'Linear queues do not wrap around to index 0.',
      'Rear stays at the high index while front has moved forward, stranding empty cells.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_085_01',
    nodeId: NODE_C11_CS_085,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Convert the decimal integer 77 into its Octal (base-8) representation.',
    correctAnswer: 115,
    tolerance: 0,
    unit: 'octal',
    explanation: '77 ÷ 8 = 9 remainder 5; 9 ÷ 8 = 1 remainder 1; 1 ÷ 8 = 0 remainder 1. Reading remainders bottom-up gives 115 in octal (1*64 + 1*8 + 5*1 = 77).',
    hints: [
      'Repeatedly divide 77 by 8 and record the integer remainders.',
      '77 = 8 * 9 + 5 (least significant digit is 5).',
      '9 = 8 * 1 + 1 (middle digit is 1), leaving 1 (most significant digit is 1) -> 115.'
    ]
  },
  {
    id: 'ch_081_02',
    nodeId: NODE_C11_CS_081,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'evaluation',
    question: 'Arrange the sequence of actions a candidate should follow during the 15-minute reading time and initial 30 minutes of the ISC CS Theory Exam.',
    sortItems: [
      'Scan entire question paper without writing to choose optional questions',
      'Identify tricky requirements (e.g. wrapper classes, recursive base cases)',
      'Draft rough boolean truth tables / trace tables on rough margin',
      'Begin answering high-confidence Section B programming logic with clean indentation'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'CISCE instructions prohibit writing during 15-minute reading time: scan first, evaluate question constraints, plan rough traces, and start coding cleanly once writing time begins.',
    hints: [
      'Start with a bird\'s-eye view of all three sections.',
      'Pinpoint specific constraints before picking which optional question to answer.',
      'Writing begins only after reading time concludes, starting with your strongest questions.'
    ]
  },
  {
    id: 'ch_083_02',
    nodeId: NODE_C11_CS_083,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Given:\nclass Parent { void show() { System.out.print("P "); } }\nclass Child extends Parent { void show() { System.out.print("C "); } }\nParent obj = new Child(); obj.show();\nWhat is printed and why?',
    options: [
      '"P " because the reference type is Parent and binding occurs at compile time',
      '"C " because dynamic method dispatch invokes the overridden method of the actual runtime object',
      'A compilation error because Parent cannot reference a Child instance',
      '"P C " because constructors and methods cascade sequentially'
    ],
    correctIndex: 1,
    explanation: 'Java uses dynamic method dispatch (late binding) for instance methods. The JVM examines the actual runtime object (Child), invoking Child\'s show().',
    hints: [
      'Reference type controls what methods can be called, but runtime object controls which implementation executes.',
      'Overridden methods are resolved at runtime by the JVM.',
      'The actual object created with `new` is `Child`.'
    ]
  },
  {
    id: 'ch_084_02',
    nodeId: NODE_C11_CS_084,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a circular queue of capacity 8, currently rear = 7. After a successful enqueue operation, what will be the new value of rear?',
    correctAnswer: 0,
    tolerance: 0,
    unit: 'index',
    explanation: 'In circular queue modulo arithmetic: new_rear = (rear + 1) % capacity = (7 + 1) % 8 = 8 % 8 = 0.',
    hints: [
      'Use the circular queue pointer formula: (rear + 1) % size.',
      '7 + 1 = 8.',
      '8 modulo 8 equals 0 (wrap-around to start of buffer).'
    ]
  },
  {
    id: 'ch_082_03',
    nodeId: NODE_C11_CS_082,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'On a 3-variable Karnaugh Map (A, B, C), a quad group of four adjacent 1s eliminates how many variables from the resulting product term?',
    options: [
      '1 variable eliminated, leaving 2 variables',
      '2 variables eliminated, leaving 1 variable',
      '3 variables eliminated, leaving a constant 1',
      '0 variables eliminated'
    ],
    correctIndex: 1,
    explanation: 'In a K-map: a pair (2 cells) eliminates 1 variable; a quad (4 cells) eliminates 2 variables (log2(4) = 2); an octet (8 cells) eliminates 3 variables.',
    hints: [
      'Formula: number of eliminated variables = log2(group_size).',
      'For a group of 4: log2(4) = 2 variables change state across the group.',
      '4 cells in a 3-variable map leave 3 - 2 = 1 variable in the product term.'
    ]
  },
  {
    id: 'ch_083_03',
    nodeId: NODE_C11_CS_083,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Assemble the correct Java constructor header and super invocation for subclass `SavingsAccount` extending `Account(String accNo, double bal)`.',
    availableParts: [
      'public SavingsAccount(String a, double b, double r)',
      '{',
      'super(a, b);',
      'interestRate = r;',
      '}',
      'Account(a, b);',
      'super.Account(a, b);'
    ],
    targetState: 'public SavingsAccount(String a, double b, double r) { super(a, b); interestRate = r; }',
    validationHint: 'Ensure constructor signature starts the block, immediately followed by super(a, b); then field assignment.',
    explanation: 'The subclass constructor must invoke the parent constructor using `super(args)` as its very first executable statement before initializing its own fields.',
    hints: [
      'The subclass constructor name must match the class name `SavingsAccount`.',
      'The call to the parent constructor must use the keyword `super`, not the class name.',
      'Order: Header -> { -> super(a, b); -> child field assignment -> }'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_084_03',
    nodeId: NODE_C11_CS_084,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Compare the worst-case time complexity of Binary Search versus Linear Search on an array of 1,000,000 elements.',
    options: [
      'Binary Search: O(log n) (~20 checks); Linear Search: O(n) (1,000,000 checks)',
      'Binary Search: O(n log n) (~20,000 checks); Linear Search: O(n^2)',
      'Binary Search: O(1); Linear Search: O(n)',
      'Both require O(n) worst-case comparisons if the element is at the end'
    ],
    correctIndex: 0,
    explanation: 'Binary search halves the search space each step: log2(1,000,000) ≈ 20 comparisons. Linear search in the worst case inspects all 1,000,000 items.',
    hints: [
      'Binary search requires sorted data and divides search space by 2 each iteration.',
      'log2(10^6) is approximately 20.',
      'Linear search must check every single position if the element is at the last index.'
    ]
  },
  {
    id: 'ch_085_02',
    nodeId: NODE_C11_CS_085,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In a school database with tables `STUDENT(RollNo, Name, ClassID)` and `CLASS_SECTION(ClassID, RoomNo, TeacherName)`, what role does `ClassID` play in `STUDENT`?',
    options: [
      'Primary Key',
      'Candidate Key',
      'Foreign Key referencing CLASS_SECTION',
      'Composite Key'
    ],
    correctIndex: 2,
    explanation: 'ClassID uniquely identifies a row in CLASS_SECTION (Primary Key there), but in the STUDENT table it serves as a Foreign Key establishing referential integrity.',
    hints: [
      'RollNo is the primary key of STUDENT.',
      'ClassID links a student to their respective classroom section.',
      'A column that references a primary key in another table is a Foreign Key.'
    ]
  },
  {
    id: 'ch_085_03',
    nodeId: NODE_C11_CS_085,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which network protocol operates at the Transport Layer of the TCP/IP stack to provide reliable, connection-oriented data transfer?',
    options: [
      'IP (Internet Protocol)',
      'TCP (Transmission Control Protocol)',
      'HTTP (HyperText Transfer Protocol)',
      'Ethernet / MAC'
    ],
    correctIndex: 1,
    explanation: 'TCP operates at the Transport layer providing connection-oriented, sequenced, and error-checked byte stream delivery. IP operates at the Internet/Network layer.',
    hints: [
      'HTTP is Application layer.',
      'IP is Network / Internet layer.',
      'TCP guarantees packet ordering and retransmission at the Transport layer.'
    ]
  },
  {
    id: 'ch_084_04',
    nodeId: NODE_C11_CS_084,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A student writes a loop to traverse a singly linked list:\nwhile (head != null) { System.out.println(head.data); head = head.next; }\nWhat fatal error was reported by CISCE examiners for this pattern?',
    options: [
      'The loop throws an immediate NullPointerException on line 1',
      'The code destroys the original list reference by advancing the head pointer to null',
      'The loop enters an infinite cycle because next is never null',
      'Syntax error: `head.data` cannot be accessed without getters'
    ],
    correctIndex: 1,
    explanation: 'Advancing `head = head.next` mutates the permanent start reference of the linked list. Once the loop ends, head is null, permanently orphaning all list nodes in memory. A temporary pointer `Node temp = head;` must be used.',
    hints: [
      'What is the value of `head` after the loop finishes?',
      'If you lose the reference to the first node, can you ever access the list again?',
      'Always traverse with a temporary pointer (`Node ptr = head`), keeping `head` intact.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_082_04',
    nodeId: NODE_C11_CS_082,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Simplify the Boolean expression: F = A · B + A · (B + C) + B · (B + C)\nusing Boolean theorems.',
    options: [
      'A + B · C',
      'A · C + B',
      'B + A · C',
      'B + A'
    ],
    correctIndex: 3,
    explanation: '1) By absorption: B · (B + C) = B.\n2) Distribute: A · (B + C) = A·B + A·C.\n3) Expression becomes: A·B + A·B + A·C + B = A·B + A·C + B.\n4) Factor B: B · (1 + A) + A·C = B · 1 + A·C = B + A·C.\n5) By consensus/absorption with Boolean expansion: F simplifies to B + A.',
    hints: [
      'Apply absorption first: B · (B + C) reduces directly to B.',
      'Combine A·B + B into B (since B(A + 1) = B · 1 = B).',
      'Notice B + A·B + A·B + A·C = B + A·C.'
    ]
  },
  {
    id: 'ch_084_05',
    nodeId: NODE_C11_CS_084,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Trace Pass 1 of Bubble Sort on array [45, 12, 89, 23, 7]. Arrange the intermediate comparisons in correct execution order.',
    sortItems: [
      'Compare 45 & 12 -> Swap -> [12, 45, 89, 23, 7]',
      'Compare 45 & 89 -> No Swap -> [12, 45, 89, 23, 7]',
      'Compare 89 & 23 -> Swap -> [12, 45, 23, 89, 7]',
      'Compare 89 & 7 -> Swap -> [12, 45, 23, 7, 89] (89 locked at end)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Pass 1 bubbles the largest value (89) to the final index via adjacent swaps: (45,12)->swap; (45,89)->no swap; (89,23)->swap; (89,7)->swap.',
    hints: [
      'Bubble sort starts at index 0 and compares adjacent pairs [j] and [j+1].',
      '45 is greater than 12, so they swap first.',
      'The largest element 89 travels to the end of the array by the end of Pass 1.'
    ]
  },
  {
    id: 'ch_085_04',
    nodeId: NODE_C11_CS_085,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Perform the binary subtraction (28 - 13) using 8-bit Two\'s Complement representation. What is the 8-bit result?',
    options: [
      '00001111 (which equals +15 in decimal)',
      '00010001 (which equals +17 in decimal)',
      '11110001 (which equals -15 in decimal)',
      '00001101 (which equals +13 in decimal)'
    ],
    correctIndex: 0,
    explanation: '28 in 8-bit = 00011100. 13 = 00001101 -> 1\'s comp = 11110010 -> 2\'s comp (-13) = 11110011.\nAdd: 00011100 + 11110011 = (1)00001111. Discard carry bit 1 -> 00001111 = 8 + 4 + 2 + 1 = 15.',
    hints: [
      'Convert +13 to 2\'s complement by inverting bits and adding 1.',
      'Add binary +28 to the 2\'s complement of 13.',
      'Discard the end-around carry: 28 - 13 = 15 = 00001111.'
    ]
  },
  {
    id: 'ch_085_05',
    nodeId: NODE_C11_CS_085,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Under Section 66 of the Indian Information Technology Act (2000), accessing a secured server without authorization—even if no data is deleted or altered—constitutes:',
    options: [
      'Fair use research and is fully protected',
      'A cognizable cyber crime punishable by imprisonment and fine',
      'A civil infraction requiring only an apology letter',
      'An offense only if commercial financial fraud exceeds ₹10 Lakhs'
    ],
    correctIndex: 1,
    explanation: 'The IT Act 2000 strictly penalizes unauthorized access and hacking under Section 66 regardless of whether malicious alteration occurred. Intentional unauthorized penetration is a criminal offense.',
    hints: [
      'CISCE examiners criticize vague answers like "hacking is just bad".',
      'Cite statutory legal frameworks: IT Act 2000 Section 66.',
      'Unauthorized entry itself is a cognizable cyber crime.'
    ]
  },
  {
    id: 'ch_085_06',
    nodeId: NODE_C11_CS_085,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Given:\nTable EMPLOYEE(EmpID, Name, DeptID)\nTable DEPT(DeptID, DeptName)\nWhat happens if a student writes: SELECT Name, DeptName FROM EMPLOYEE, DEPT; without a WHERE clause?',
    options: [
      'SQL throws a mandatory syntax error',
      'It performs a Cartesian Product (Cross Join), pairing every employee with every department',
      'It automatically joins on columns with the same name (Natural Join)',
      'It displays only rows where DeptID is not null'
    ],
    correctIndex: 1,
    explanation: 'Listing multiple tables in the FROM clause without a WHERE or ON join condition produces a Cartesian Product (m × n rows), incorrectly pairing every employee with all departments.',
    hints: [
      'Without an explicit join condition, relational databases compute the product of rows.',
      'If EMPLOYEE has 10 rows and DEPT has 4 rows, the output will have 40 rows.',
      'This is known as a Cartesian Product or Cross Join.'
    ]
  },
  {
    id: 'ch_083_04',
    nodeId: NODE_C11_CS_083,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Trace the output of `mystery(4)`:\nint mystery(int n) {\n  if (n <= 1) return 1;\n  return n * mystery(n - 1) + mystery(n - 2);\n}',
    correctAnswer: 43,
    tolerance: 0,
    unit: 'value',
    explanation: 'mystery(0) = 1, mystery(1) = 1.\nmystery(2) = 2 * mystery(1) + mystery(0) = 2(1) + 1 = 3.\nmystery(3) = 3 * mystery(2) + mystery(1) = 3(3) + 1 = 10.\nmystery(4) = 4 * mystery(3) + mystery(2) = 4(10) + 3 = 43.',
    hints: [
      'Calculate bottom-up: mystery(0) = 1, mystery(1) = 1.',
      'mystery(2) = 2(1) + 1 = 3; mystery(3) = 3(3) + 1 = 10.',
      'mystery(4) = 4(10) + 3 = 43.'
    ]
  },
  {
    id: 'ch_082_05',
    nodeId: NODE_C11_CS_082,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In the CISCE 2025 examiner report, what common error did candidates make regarding Encoders versus Decoders?',
    options: [
      'Drew 8 input lines and 3 output lines for a 3-to-8 Decoder instead of 3 inputs and 8 outputs',
      'Used NAND gates instead of basic transistors',
      'Confused decimal and octal numbering without drawing logic lines',
      'Omitted power supply Vcc connections'
    ],
    correctIndex: 0,
    explanation: 'Examiners noted students frequently inverted the pin count: a Decoder converts n inputs to 2^n outputs (3 inputs -> 8 outputs), while an Encoder converts 2^n inputs into n outputs (8 inputs -> 3 outputs).',
    hints: [
      'Decoder: small number of coded bits decoded into 1-of-N active lines.',
      'Encoder: N active input lines encoded into binary bits.',
      '3-to-8 Decoder has 3 inputs and 8 outputs.'
    ],
    misconceptionIndex: 0
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_CS_081,
  title: 'ISC Class 11 Computer Science: Exam Preparation Master Simulation',
  definition: 'An integrated laboratory reviewing all five major pillars of the ISC Computer Science (868) syllabus: Paper Pattern & Strategy, Boolean Algebra & Logic Gates, Java OOP & Dynamic Dispatch, Data Structures & Algorithms, and System Architecture & DBMS.',
  eli5: 'Think of this simulation as your final flight simulator before the real board exam. You will test logic circuits, run Java memory allocations, push and pop circular queues, and verify number conversions step-by-step.',
  misconceptions: [
    {
      misconception: 'If I know Java syntax, I do not need to revise hardware and logic gates.',
      correction: 'Section A alone carries 25 marks (more than 35% of the theory paper) covering number systems, K-maps, encoders, and logic gates.'
    },
    {
      misconception: 'Linked list algorithms can be written by moving the head pointer directly in loops.',
      correction: 'Moving head directly destroys the list in memory. Always use a temporary traversal pointer (`Node ptr = head`).'
    },
    {
      misconception: 'Creating an array of objects creates the individual objects automatically.',
      correction: '`new ClassName[N]` allocates an array of null references. Each object must still be instantiated individually with `new ClassName()`.'
    },
    {
      misconception: 'Linear queues and circular queues behave the same when deleting and adding elements.',
      correction: 'Linear queues suffer from false overflow when rear reaches the array end. Circular queues wrap pointers around using modulo arithmetic `(ptr + 1) % size`.'
    },
    {
      misconception: 'Subclass constructors do not need super() if the parent constructor has parameters.',
      correction: 'If a parent class lacks a default constructor, the child constructor MUST explicitly invoke `super(...)` as its very first statement.'
    }
  ],
  diagnosticQuestions: [
    { question: 'What is the duration and total marks of ISC CS Paper I (Theory)?', options: ['2 Hours, 70 Marks', '3 Hours, 70 Marks', '3 Hours, 100 Marks', '2.5 Hours, 80 Marks'], correctIndex: 1 },
    { question: 'Which gate outputs 1 only when both inputs differ?', options: ['XOR', 'XNOR', 'NAND', 'NOR'], correctIndex: 0 },
    { question: 'Which keyword is used to access superclass methods or constructors in Java?', options: ['this', 'super', 'parent', 'base'], correctIndex: 1 },
    { question: 'What is the time complexity of binary search on a sorted array?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correctIndex: 2 },
    { question: 'What is the circular increment formula for pointer p in size S?', options: ['p = p + 1', 'p = (p + 1) % S', 'p = (p % S) + 1', 'p = p % S'], correctIndex: 1 },
    { question: 'How many bytes are in a Java 32-bit int?', options: ['2 bytes', '4 bytes', '8 bytes', '1 byte'], correctIndex: 1 },
    { question: 'Which SQL clause is used to filter records after aggregation in GROUP BY?', options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'], correctIndex: 1 },
    { question: 'Which encoding system was designed specifically for Indian languages?', options: ['ASCII', 'ISCII', 'EBCDIC', 'UTF-8'], correctIndex: 1 }
  ],
  masteryCriteria: 'Candidate achieves >= 80% accuracy across all 5 ISC syllabus nodes, accurately traces dynamic dispatch and circular buffers, and produces error-free boolean logic.'
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Number System & Bit Architecture',
    instruction: 'Toggle the 8-bit binary switches below to observe real-time Decimal, Hexadecimal, and Two\'s Complement conversions.',
    interactionType: 'bit-toggle',
    nodeId: NODE_C11_CS_085
  },
  {
    title: 'Lab 2: Interactive Logic Gate & Truth Table',
    instruction: 'Change inputs A and B, select gate types (AND, OR, NAND, NOR, XOR), and watch live electrical output and Boolean expressions.',
    interactionType: 'gate-simulator',
    nodeId: NODE_C11_CS_082
  },
  {
    title: 'Lab 3: Java Memory Stack & Heap Visualizer',
    instruction: 'Simulate object creation and reference assignment. Notice the distinction between stack references and heap memory allocation.',
    interactionType: 'memory-inspector',
    nodeId: NODE_C11_CS_083
  },
  {
    title: 'Lab 4: Circular Queue Pointer Simulation',
    instruction: 'Enqueue and dequeue elements to witness modulo wrap-around `(rear + 1) % 6` and avoid false overflow.',
    interactionType: 'queue-runner',
    nodeId: NODE_C11_CS_084
  },
  {
    title: 'Lab 5: ISC Paper Weightage & Time Allocation',
    instruction: 'Adjust the study hours slider to balance your prep across Section A (25M), Section B (30M), and Section C (15M).',
    interactionType: 'time-balancer',
    nodeId: NODE_C11_CS_081
  }
];

// ─── PREDICTION & OBSERVATION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you invert all 8 bits of 00001010 (+10) and add 1, what negative decimal value will it represent in 2\'s complement?',
    options: ['-10', '-9', '-11', '-246'],
    correctIndex: 0,
    verifyInstruction: 'Toggle the bits in Lab 1 to verify the 2\'s complement value!',
    nodeId: NODE_C11_CS_085
  },
  {
    question: 'Predict: In a circular queue of capacity 6 with front=4 and rear=5, what will rear become after one more enqueue?',
    options: ['rear = 6 (IndexOutOfBounds)', 'rear = 0 (Wrap-around)', 'rear = 5 (No change)', 'rear = -1 (Reset)'],
    correctIndex: 1,
    verifyInstruction: 'Run the Enqueue button in Lab 4 to watch the pointer wrap to index 0!',
    nodeId: NODE_C11_CS_084
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the XOR gate output when both inputs A and B are identical (both 0 or both 1)?',
    observableOptions: ['Output is 1', 'Output is 0', 'Output alternates', 'Output is undefined'],
    correctIndex: 1,
    nodeId: NODE_C11_CS_082
  },
  {
    question: 'In the Java memory model, what happens when two references (obj1 and obj2) point to the same object and obj1 modifies a field?',
    observableOptions: [
      'Only obj1 sees the change',
      'Both obj1 and obj2 see the change because they share the same heap memory',
      'A new copy is cloned automatically',
      'The program crashes with ConcurrentModificationException'
    ],
    correctIndex: 1,
    nodeId: NODE_C11_CS_083
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'ISC Board Room Mock Audit',
  description: 'Conduct a personal 45-minute sprint: solve 1 K-Map 4-variable simplification on paper, write a circular queue class in Java with modulo arithmetic, and trace 1 inheritance polymorphic hierarchy without a computer.',
  steps: [
    'Draw a 4-variable Gray code K-Map for Σ(0,2,5,7,8,10,13,15) and form quad groupings.',
    'Write the Java class `CircularQueue` with `int[] arr`, `front`, `rear`, `capacity`, `enqueue()`, and `dequeue()`.',
    'Execute manual dry-run trace table for 5 enqueue and 3 dequeue operations.',
    'Compare your handwritten answers with CISCE 2025 specimen answer keys.'
  ]
};

// ─── MAIN COMPONENT ───
export function C11_ComputerScienceExamPreparationPaperSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete
}: Props) {
  const subjectConfig = SUBJECT_CONFIG['cs'] || { name: 'Computer Science', emoji: '💻', color: 'cyan' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant-Style Interactive Exploration State
  const [bitArray, setBitArray] = useState<number[]>([0, 0, 1, 0, 1, 1, 0, 1]); // 45 decimal
  const [selectedGate, setSelectedGate] = useState<'AND' | 'OR' | 'NAND' | 'NOR' | 'XOR'>('XOR');
  const [gateInputA, setGateInputA] = useState<boolean>(true);
  const [gateInputB, setGateInputB] = useState<boolean>(false);

  // Memory Model Visualizer State
  const [heapObjects, setHeapObjects] = useState<{ id: string; name: string; val: number }[]>([
    { id: 'obj_101', name: 'Student("Aarav")', val: 92 }
  ]);
  const [ref1PointsTo, setRef1PointsTo] = useState<string>('obj_101');
  const [ref2PointsTo, setRef2PointsTo] = useState<string>('obj_101');

  // Circular Queue Visualizer State
  const [queueBuffer, setQueueBuffer] = useState<(string | null)[]>(['P1', 'P2', null, null, null, null]);
  const [queueFront, setQueueFront] = useState<number>(0);
  const [queueRear, setQueueRear] = useState<number>(1);
  const [queueCapacity] = useState<number>(6);

  // Time Balancer State (Total 30 hours)
  const [studyHoursA, setStudyHoursA] = useState<number>(10);
  const [studyHoursB, setStudyHoursB] = useState<number>(14);
  const [studyHoursC, setStudyHoursC] = useState<number>(6);

  // Predict & Observe State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Challenge & Adaptive Mastery State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Escalating Hints & Feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-Drop & Numeric State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback FX
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

  // ─── DERIVED VALUES FOR EXPLORATION ───
  const decimalValue = useMemo(() => {
    return bitArray.reduce((acc, bit, idx) => acc + bit * Math.pow(2, 7 - idx), 0);
  }, [bitArray]);

  const hexValue = useMemo(() => {
    return decimalValue.toString(16).toUpperCase().padStart(2, '0');
  }, [decimalValue]);

  const twosComplementValue = useMemo(() => {
    if (bitArray[0] === 0) return decimalValue;
    return decimalValue - 256;
  }, [bitArray, decimalValue]);

  const gateOutput = useMemo(() => {
    if (selectedGate === 'AND') return gateInputA && gateInputB;
    if (selectedGate === 'OR') return gateInputA || gateInputB;
    if (selectedGate === 'NAND') return !(gateInputA && gateInputB);
    if (selectedGate === 'NOR') return !(gateInputA || gateInputB);
    if (selectedGate === 'XOR') return gateInputA !== gateInputB;
    return false;
  }, [selectedGate, gateInputA, gateInputB]);

  // ──�� ADAPTIVE CHALLENGE FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD INITIAL MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT UPDATE EFFECT ───
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

  // ─── CANVAS SORTING ANIMATION ───
  useEffect(() => {
    if (phase !== 'challenge' && phase !== 'sandbox') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;
    const sampleBars = [18, 42, 85, 29, 64, 12, 95, 51, 73, 33];

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = 22;
      const gap = 6;
      const startX = 20;

      sampleBars.forEach((val, idx) => {
        const x = startX + idx * (barWidth + gap);
        const barHeight = (val / 100) * 45;
        const y = canvas.height - barHeight - 12;

        const isHighlight = Math.floor((frame / 30) % sampleBars.length) === idx;
        ctx.fillStyle = isHighlight ? '#38bdf8' : '#6366f1';
        ctx.fillRect(x, y, barWidth, barHeight);

        ctx.strokeStyle = isHighlight ? '#0284c7' : '#4338ca';
        ctx.strokeRect(x, y, barWidth, barHeight);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '9px monospace';
        ctx.fillText(String(val), x + 4, y - 3);
      });

      const scanX = startX + ((frame * 1.5) % (sampleBars.length * (barWidth + gap)));
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(scanX, 5);
      ctx.lineTo(scanX, canvas.height - 5);
      ctx.stroke();

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '10px sans-serif';
      ctx.fillText('Live Algorithm Comparator: Binary Halving vs Bubble Passes', 300, 18);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── MEMOIZED HANDLERS ───
  const handleToggleBit = useCallback((index: number) => {
    audioManager.play('tap');
    setBitArray(prev => {
      const next = [...prev];
      next[index] = next[index] === 1 ? 0 : 1;
      return next;
    });
  }, []);

  const handleSelectGate = useCallback((gate: 'AND' | 'OR' | 'NAND' | 'NOR' | 'XOR') => {
    audioManager.play('pop');
    setSelectedGate(gate);
  }, []);

  const handleToggleGateInputA = useCallback(() => {
    audioManager.play('tap');
    setGateInputA(prev => !prev);
  }, []);

  const handleToggleGateInputB = useCallback(() => {
    audioManager.play('tap');
    setGateInputB(prev => !prev);
  }, []);

  const handleDragStart = useCallback((itemLabel: string) => {
    setDraggedItem(itemLabel);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string, expectedMapping?: Record<string, string>) => {
    if (!draggedItem) return;
    const isCorrect = expectedMapping ? expectedMapping[targetId] === draggedItem : true;
    audioManager.play(isCorrect ? 'drop-correct' : 'drop-wrong');
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    setDraggedItem(null);
  }, [draggedItem]);

  const handleEnqueue = useCallback(() => {
    const nextRear = (queueRear + 1) % queueCapacity;
    if (nextRear === queueFront && queueBuffer[queueRear] !== null) {
      audioManager.play('error');
      speechManager.speak('Queue Overflow! Cannot enqueue into a full circular buffer.');
      return;
    }
    audioManager.play('drop-correct');
    const pid = 'P' + (Math.floor(Math.random() * 80) + 10);
    setQueueBuffer(prev => {
      const copy = [...prev];
      copy[nextRear] = pid;
      return copy;
    });
    setQueueRear(nextRear);
    speechManager.speak(`Enqueued ${pid} at rear index ${nextRear}`);
  }, [queueRear, queueCapacity, queueFront, queueBuffer]);

  const handleDequeue = useCallback(() => {
    if (queueFront === queueRear && queueBuffer[queueFront] === null) {
      audioManager.play('error');
      speechManager.speak('Queue Underflow! Buffer is already empty.');
      return;
    }
    audioManager.play('pickup');
    const removedItem = queueBuffer[queueFront];
    setQueueBuffer(prev => {
      const copy = [...prev];
      copy[queueFront] = null;
      return copy;
    });
    const nextFront = (queueFront + 1) % queueCapacity;
    setQueueFront(nextFront);
    speechManager.speak(`Dequeued ${removedItem || 'item'} from front index ${queueFront}`);
  }, [queueFront, queueRear, queueCapacity, queueBuffer]);

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
    }
  }, [hintCount, activeChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive labs. Explore each topic hands-on!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with any component with zero grading stress.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commencing timed board challenges. Read carefully!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction registered! Verify with the lab controls below.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation!' : 'Review the visualization diagram closely.');
  }, []);

  const handleCompleteSimulation = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding performance! You have finished the ISC Exam Master Simulation.');
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

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (activeChallenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! That matches ISC marking scheme criteria.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Explanations revealed. Study the step-by-step logic.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                ISC 868 Class 11
              </span>
            </h1>
            <p className="text-xs text-slate-400">Section A (25M) • Section B (30M) • Section C (15M) Comprehensive Rehearsal</p>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800" role="tablist" aria-label="Simulation Phases">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <motion.button
              key={p}
              role="tab"
              aria-selected={phase === p}
              aria-label={`Switch to ${p} phase`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all capitalize ${
                phase === p
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-700/40 shadow-xl">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-2">
                <span>⚡ Curiosity Challenge</span>
              </div>
              <h2 className="text-xl font-black text-indigo-200">{SCENARIO.title}</h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <div className="mt-4 p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/60 text-xs text-indigo-300">
                ⚠️ <span className="font-bold">Examiner Insight:</span> {SCENARIO.context}
              </div>
            </div>

            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg">
              <p className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                {DISCOVERY_QUESTION.question}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    aria-label={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(idx)}
                    disabled={discoveryAnswered}
                    className={`text-left p-4 rounded-xl text-sm font-medium border transition-all ${
                      discoveryAnswered
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
                        : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-indigo-500'
                    }`}
                  >
                    <span className="font-mono text-xs text-indigo-400 mr-2">[{String.fromCharCode(65 + idx)}]</span>
                    {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex && <span className="mr-1 text-emerald-400">✓</span>}
                    {discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex && <span className="mr-1 text-rose-400">✗</span>}
                    {option}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-bold' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '✓ Spot on! Two\'s complement handles negative numbers with MSB sign weighting.' : DISCOVERY_QUESTION.hintAfter}
                  </p>
                  <motion.button
                    aria-label="Begin interactive laboratory exercises"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 whitespace-nowrap"
                  >
                    Begin Interactive Labs →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-black tracking-wider uppercase text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Target Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white mb-2">{EXPLORATION_STEPS[currentSlide].title}</h2>
              <p className="text-sm text-indigo-300 mb-6 bg-indigo-950/40 p-3 rounded-xl border border-indigo-900/60">
                👉 <strong className="text-indigo-200">Action:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ── LAB 1: NUMBER SYSTEM & BIT TOGGLES WITH TOPIC SVG 1 ─�� */}
              {currentSlide === 0 && (
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-6">
                  {/* SVG DIAGRAM 1: 8-BIT REGISTER ARCHITECTURE */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                    <div className="text-xs font-mono text-cyan-400 mb-2 font-bold">Topic SVG Diagram 1: 8-Bit Architecture Register Map</div>
                    <svg viewBox="0 0 540 80" className="w-full max-w-xl" aria-label="8-bit binary register architecture diagram">
                      <rect x="10" y="10" width="520" height="60" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                      {bitArray.map((b, i) => {
                        const x = 20 + i * 62;
                        return (
                          <g key={i}>
                            <rect
                              x={x}
                              y="16"
                              width="56"
                              height="48"
                              rx="6"
                              fill={b === 1 ? '#0369a1' : '#1e293b'}
                              stroke={b === 1 ? '#38bdf8' : '#475569'}
                              strokeWidth="1.5"
                            />
                            <text x={x + 28} y="34" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                              {i === 0 ? 'MSB (-128)' : `2^${7 - i}`}
                            </text>
                            <text x={x + 28} y="54" textAnchor="middle" fill={b === 1 ? '#ffffff' : '#64748b'} fontSize="16" fontWeight="bold" fontFamily="monospace">
                              {b}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      8-Bit Register Switchboard (Click bits to flip 0 ↔ 1)
                    </div>
                    <div className="grid grid-cols-8 gap-2">
                      {bitArray.map((bit, idx) => {
                        const power = 7 - idx;
                        const weight = Math.pow(2, power);
                        return (
                          <motion.button
                            key={idx}
                            aria-label={`Toggle bit index ${idx}, 2 to the power ${power}, current value ${bit}`}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => handleToggleBit(idx)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                              bit === 1
                                ? 'bg-cyan-600/30 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20'
                                : 'bg-slate-900 border-slate-800 text-slate-500'
                            }`}
                          >
                            <span className="text-xs font-mono text-slate-400">2^{power}</span>
                            <span className="text-2xl font-black my-1">{bit}</span>
                            <span className="text-[10px] text-slate-400">{weight}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Real-time Base Representation Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
                      <div className="text-xs text-slate-400">Unsigned Decimal (Base 10)</div>
                      <div className="text-2xl font-black text-cyan-400 mt-1">{decimalValue}</div>
                    </div>
                    <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
                      <div className="text-xs text-slate-400">Hexadecimal (Base 16)</div>
                      <div className="text-2xl font-black text-indigo-400 mt-1">0x{hexValue}</div>
                    </div>
                    <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
                      <div className="text-xs text-slate-400">Two's Complement (Signed 8-Bit)</div>
                      <div className="text-2xl font-black text-emerald-400 mt-1">{twosComplementValue}</div>
                    </div>
                  </div>

                  {/* PREDICT-THEN-CHECK */}
                  <div className="p-4 bg-indigo-950/30 rounded-xl border border-indigo-800/50">
                    <p className="text-xs font-bold text-indigo-300 mb-2">🧠 Predict-Then-Check:</p>
                    {!predictionMade ? (
                      <div>
                        <p className="text-xs text-slate-300 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              aria-label={`Select prediction option: ${opt}`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePrediction(i)}
                              className="text-left p-2.5 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800 hover:border-indigo-500"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-emerald-400 font-semibold">
                        ✓ Prediction locked! Test the switches above to verify your result.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── LAB 2: LOGIC GATES WITH TOPIC SVG 2 ── */}
              {currentSlide === 1 && (
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-6">
                  {/* Gate Selector */}
                  <div className="flex flex-wrap items-center gap-2">
                    {(['AND', 'OR', 'NAND', 'NOR', 'XOR'] as const).map((g) => (
                      <motion.button
                        key={g}
                        aria-label={`Select ${g} Gate`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSelectGate(g)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedGate === g
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {g} Gate
                      </motion.button>
                    ))}
                  </div>

                  {/* Interactive SVG Gate Diagram (SVG 2) */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col gap-4">
                      <motion.button
                        aria-label={`Toggle Input A: currently ${gateInputA ? '1' : '0'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleToggleGateInputA}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border ${
                          gateInputA
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                            : 'bg-rose-950 border-rose-500 text-rose-300'
                        }`}
                      >
                        {gateInputA ? '✓' : '✗'} Input A: {gateInputA ? '1 (HIGH)' : '0 (LOW)'}
                      </motion.button>

                      <motion.button
                        aria-label={`Toggle Input B: currently ${gateInputB ? '1' : '0'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleToggleGateInputB}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border ${
                          gateInputB
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                            : 'bg-rose-950 border-rose-500 text-rose-300'
                        }`}
                      >
                        {gateInputB ? '✓' : '✗'} Input B: {gateInputB ? '1 (HIGH)' : '0 (LOW)'}
                      </motion.button>
                    </div>

                    <svg viewBox="0 0 320 140" className="w-full max-w-xs" aria-label={`Schematic for ${selectedGate} logic gate`}>
                      <path d="M 20 40 L 100 40" stroke={gateInputA ? '#10b981' : '#f43f5e'} strokeWidth="3" fill="none" />
                      <path d="M 20 100 L 100 100" stroke={gateInputB ? '#10b981' : '#f43f5e'} strokeWidth="3" fill="none" />

                      {selectedGate === 'AND' && (
                        <path d="M 100 20 L 160 20 A 50 50 0 0 1 160 120 L 100 120 Z" fill="#1e1b4b" stroke="#6366f1" strokeWidth="3" />
                      )}
                      {selectedGate === 'OR' && (
                        <path d="M 95 20 Q 130 70 95 120 Q 180 120 200 70 Q 180 20 95 20 Z" fill="#1e1b4b" stroke="#6366f1" strokeWidth="3" />
                      )}
                      {selectedGate === 'NAND' && (
                        <g>
                          <path d="M 100 20 L 160 20 A 50 50 0 0 1 160 120 L 100 120 Z" fill="#1e1b4b" stroke="#6366f1" strokeWidth="3" />
                          <circle cx="216" cy="70" r="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                        </g>
                      )}
                      {selectedGate === 'NOR' && (
                        <g>
                          <path d="M 95 20 Q 130 70 95 120 Q 180 120 200 70 Q 180 20 95 20 Z" fill="#1e1b4b" stroke="#6366f1" strokeWidth="3" />
                          <circle cx="206" cy="70" r="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                        </g>
                      )}
                      {selectedGate === 'XOR' && (
                        <g>
                          <path d="M 85 20 Q 120 70 85 120" stroke="#6366f1" strokeWidth="3" fill="none" />
                          <path d="M 98 20 Q 133 70 98 120 Q 183 120 203 70 Q 183 20 98 20 Z" fill="#1e1b4b" stroke="#6366f1" strokeWidth="3" />
                        </g>
                      )}

                      <path d="M 220 70 L 300 70" stroke={gateOutput ? '#10b981' : '#f43f5e'} strokeWidth="3" fill="none" />
                      <circle cx="300" cy="70" r="4" fill={gateOutput ? '#10b981' : '#f43f5e'} />
                      <text x="150" y="75" textAnchor="middle" fill="#c7d2fe" fontSize="12" fontWeight="bold">
                        {selectedGate}
                      </text>
                    </svg>

                    <div className="flex flex-col items-center p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-xs text-slate-400">Final Output Y</span>
                      <span className={`text-3xl font-black mt-1 font-mono flex items-center gap-1 ${gateOutput ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {gateOutput ? '✓ 1 (TRUE)' : '✗ 0 (FALSE)'}
                      </span>
                    </div>
                  </div>

                  {/* Observation Question */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-cyan-300 mb-2">👁️ Observation Query:</p>
                    <p className="text-xs text-slate-300 mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          aria-label={`Select observation answer: ${opt}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleObservation(i)}
                          className={`text-left p-2.5 rounded-lg text-xs border ${
                            observationAnswered
                              ? i === OBSERVATION_QUESTIONS[0].correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                                : 'bg-slate-950 border-slate-800 text-slate-500'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-cyan-500'
                          }`}
                        >
                          {observationAnswered && i === OBSERVATION_QUESTIONS[0].correctIndex && <span className="mr-1 text-emerald-400">✓</span>}
                          {observationAnswered && i !== OBSERVATION_QUESTIONS[0].correctIndex && <span className="mr-1 text-rose-400">✗</span>}
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: JAVA MEMORY STACK & HEAP WITH TOPIC SVG 3 ── */}
              {currentSlide === 2 && (
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-6">
                  {/* TOPIC SVG DIAGRAM 3: STACK VS HEAP MEMORY */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                    <div className="text-xs font-mono text-cyan-400 mb-2 font-bold">Topic SVG Diagram 3: Java JVM Stack Reference vs Heap Object Allocation</div>
                    <svg viewBox="0 0 540 140" className="w-full max-w-xl" aria-label="Java Stack and Heap Memory Reference Map">
                      {/* Stack Box */}
                      <rect x="20" y="15" width="200" height="110" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="120" y="35" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">JVM STACK FRAME</text>
                      <rect x="35" y="48" width="170" height="28" rx="4" fill="#0f172a" stroke="#4338ca" />
                      <text x="45" y="66" fill="#38bdf8" fontSize="10" fontFamily="monospace">Student s1 = @{ref1PointsTo}</text>
                      <rect x="35" y="84" width="170" height="28" rx="4" fill="#0f172a" stroke="#4338ca" />
                      <text x="45" y="102" fill="#38bdf8" fontSize="10" fontFamily="monospace">Student s2 = @{ref2PointsTo}</text>

                      {/* Pointer Arrow */}
                      <path d="M 220 62 L 310 62" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrowhead)" strokeDasharray="4 2" />
                      <path d="M 220 98 L 310 75" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 2" />

                      {/* Heap Box */}
                      <rect x="320" y="15" width="200" height="110" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                      <text x="420" y="35" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">HEAP MEMORY</text>
                      <rect x="335" y="48" width="170" height="64" rx="4" fill="#0f172a" stroke="#059669" />
                      <text x="345" y="68" fill="#34d399" fontSize="10" fontFamily="monospace">Instance @obj_101</text>
                      <text x="345" y="85" fill="#e2e8f0" fontSize="10" fontFamily="monospace">name: "Aarav"</text>
                      <text x="345" y="102" fill="#e2e8f0" fontSize="10" fontFamily="monospace">marks: 92</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-900 rounded-xl border border-indigo-900/60">
                      <div className="text-xs font-bold text-indigo-400 uppercase mb-3 flex items-center justify-between">
                        <span>Stack Frame (Local References)</span>
                        <span className="text-[10px] text-slate-500 font-mono">Fast / LIFO</span>
                      </div>
                      <div className="space-y-3 font-mono text-xs">
                        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                          <div>
                            <span className="text-cyan-400">Student</span> s1
                          </div>
                          <span className="text-indigo-300">→ points to {ref1PointsTo}</span>
                        </div>
                        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                          <div>
                            <span className="text-cyan-400">Student</span> s2
                          </div>
                          <span className="text-indigo-300">→ points to {ref2PointsTo}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <motion.button
                          aria-label="Assign reference s2 to s1"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => {
                            audioManager.play('tap');
                            setRef2PointsTo(ref1PointsTo);
                            speechManager.speak('s2 is now assigned s1 reference. Both point to the exact same heap memory!');
                          }}
                          className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold"
                        >
                          Execute: s2 = s1;
                        </motion.button>
                        <motion.button
                          aria-label="Allocate new Student object to s2"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => {
                            audioManager.play('tap');
                            const newId = 'obj_' + (Math.floor(Math.random() * 800) + 200);
                            setHeapObjects(prev => [...prev, { id: newId, name: 'Student("New")', val: 75 }]);
                            setRef2PointsTo(newId);
                            speechManager.speak('s2 now references a distinct new Student instance allocated on heap.');
                          }}
                          className="px-3 py-1.5 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg text-xs font-bold"
                        >
                          Execute: s2 = new Student();
                        </motion.button>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-cyan-900/60">
                      <div className="text-xs font-bold text-cyan-400 uppercase mb-3 flex items-center justify-between">
                        <span>Heap Memory (Dynamic Objects)</span>
                        <span className="text-[10px] text-slate-500 font-mono">Garbage Collected</span>
                      </div>
                      <div className="space-y-2">
                        {heapObjects.map((obj) => (
                          <div
                            key={obj.id}
                            className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between"
                          >
                            <div>
                              <div className="text-xs font-mono text-emerald-400">Memory @{obj.id}</div>
                              <div className="text-xs font-bold text-white">{obj.name}</div>
                            </div>
                            <span className="text-xs bg-slate-800 px-2 py-1 rounded text-cyan-300 font-mono">
                              marks = {obj.val}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: CIRCULAR QUEUE WITH TOPIC SVG 4 ── */}
              {currentSlide === 3 && (
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-6">
                  {/* TOPIC SVG DIAGRAM 4: CIRCULAR QUEUE BUFFER */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                    <div className="text-xs font-mono text-cyan-400 mb-2 font-bold">Topic SVG Diagram 4: Circular Queue Modulo Wrap-Around Ring (Capacity = 6)</div>
                    <svg viewBox="0 0 300 200" className="w-full max-w-xs" aria-label="Circular Queue Modulo Ring Buffer">
                      <circle cx="150" cy="100" r="70" fill="none" stroke="#334155" strokeWidth="24" />
                      {[0, 1, 2, 3, 4, 5].map((idx) => {
                        const angle = (idx * 60 - 90) * (Math.PI / 180);
                        const cx = 150 + 70 * Math.cos(angle);
                        const cy = 100 + 70 * Math.sin(angle);
                        const isFront = idx === queueFront;
                        const isRear = idx === queueRear;
                        const hasVal = queueBuffer[idx] !== null;
                        return (
                          <g key={idx}>
                            <circle
                              cx={cx}
                              cy={cy}
                              r="16"
                              fill={hasVal ? '#4338ca' : '#1e293b'}
                              stroke={isFront ? '#10b981' : isRear ? '#f59e0b' : '#64748b'}
                              strokeWidth={isFront || isRear ? '3' : '1.5'}
                            />
                            <text x={cx} y={cy + 4} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace">
                              {queueBuffer[idx] || idx}
                            </text>
                          </g>
                        );
                      })}
                      <text x="150" y="98" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">MODULO 6</text>
                      <text x="150" y="112" textAnchor="middle" fill="#94a3b8" fontSize="8">(i + 1) % 6</text>
                    </svg>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center justify-between">
                      <span>Circular Array Buffer (Size = 6)</span>
                      <span className="text-xs font-mono text-cyan-400">
                        Front: [{queueFront}] • Rear: [{queueRear}]
                      </span>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      {queueBuffer.map((val, idx) => {
                        const isFront = idx === queueFront;
                        const isRear = idx === queueRear;
                        return (
                          <div
                            key={idx}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border relative transition-all ${
                              val !== null
                                ? 'bg-indigo-950/70 border-indigo-500 text-indigo-200'
                                : 'bg-slate-900 border-slate-800 text-slate-600'
                            }`}
                          >
                            <span className="text-[10px] font-mono text-slate-400 mb-1">Index {idx}</span>
                            <span className="text-lg font-black">{val || '—'}</span>
                            <div className="flex gap-1 mt-2">
                              {isFront && (
                                <span className="text-[9px] font-bold px-1 rounded bg-emerald-900 text-emerald-300">
                                  ✓ FRONT
                                </span>
                              )}
                              {isRear && (
                                <span className="text-[9px] font-bold px-1 rounded bg-amber-900 text-amber-300">
                                  ★ REAR
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Operation Controls */}
                  <div className="flex flex-wrap items-center gap-3">
                    <motion.button
                      aria-label="Enqueue element into circular queue"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleEnqueue}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                    >
                      + Enqueue Element (rear = (rear + 1) % 6)
                    </motion.button>
                    <motion.button
                      aria-label="Dequeue element from circular queue"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDequeue}
                      className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/30"
                    >
                      − Dequeue Element (front = (front + 1) % 6)
                    </motion.button>
                  </div>
                </div>
              )}

              {/* ── LAB 5: TIME BALANCER & MARK STRATEGY ── */}
              {currentSlide === 4 && (
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <span>Section A (25 Marks)</span>
                        <span className="text-cyan-400">{studyHoursA} hrs</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Section A study hours slider"
                        min={2}
                        max={18}
                        value={studyHoursA}
                        onChange={(e) => {
                          setStudyHoursA(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-cyan-500"
                      />
                      <p className="text-[11px] text-slate-400 mt-2">Hardware, Encoders, K-Maps & Numeration</p>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <span>Section B (30 Marks)</span>
                        <span className="text-indigo-400">{studyHoursB} hrs</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Section B study hours slider"
                        min={4}
                        max={20}
                        value={studyHoursB}
                        onChange={(e) => {
                          setStudyHoursB(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-indigo-500"
                      />
                      <p className="text-[11px] text-slate-400 mt-2">Java OOP, Recursion, Arrays & Stacks/Queues</p>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <span>Section C (15 Marks)</span>
                        <span className="text-emerald-400">{studyHoursC} hrs</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Section C study hours slider"
                        min={1}
                        max={10}
                        value={studyHoursC}
                        onChange={(e) => {
                          setStudyHoursC(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500"
                      />
                      <p className="text-[11px] text-slate-400 mt-2">Python, Ethics, Cyber Law & DBMS SQL</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Total Revision Budget</div>
                      <div className="text-xl font-bold text-white">{studyHoursA + studyHoursB + studyHoursC} Hours Planned</div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
                        {studyHoursB >= 12 ? '✓ Balanced Section B Priority' : '⚠️ Allocate more time to Java'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Exploration Prev / Next Controls */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-800">
                <motion.button
                  aria-label="Previous Lab"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  disabled={currentSlide === 0}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>

                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {EXPLORATION_STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === currentSlide ? 'bg-indigo-500 scale-125' : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    aria-label="Next Lab"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('tap');
                    }}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Enter Free Sandbox Mode"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                  >
                    Enter Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: SANDBOX FREE PLAY ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    🛠️ Free Experimentation Sandbox
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Zero timers, zero grading. Test circuits, toggle registers, or run the sorting visualizer.
                  </p>
                </div>
                <motion.button
                  aria-label="Ready for Graded Challenges"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToChallenge}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/30"
                >
                  Ready For Graded Challenges! 🎯
                </motion.button>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 mb-6">
                <canvas ref={canvasRef} width={640} height={80} className="w-full rounded-lg" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="text-xs font-bold text-cyan-400 uppercase mb-3">Live 8-Bit Converter</div>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {bitArray.slice(0, 4).map((b, i) => (
                      <motion.button
                        key={i}
                        aria-label={`Toggle bit ${i}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleToggleBit(i)}
                        className={`p-2 rounded-lg text-sm font-black border ${
                          b ? 'bg-cyan-600/40 border-cyan-400 text-cyan-200' : 'bg-slate-900 border-slate-800 text-slate-500'
                        }`}
                      >
                        {b}
                      </motion.button>
                    ))}
                  </div>
                  <div className="text-xs text-slate-300">
                    Decimal: <span className="text-cyan-400 font-mono font-bold">{decimalValue}</span> | Hex: <span className="text-indigo-400 font-mono font-bold">0x{hexValue}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="text-xs font-bold text-emerald-400 uppercase mb-3">Circular Queue Tester</div>
                  <div className="flex gap-2 mb-3">
                    <motion.button
                      aria-label="Sandbox Enqueue"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleEnqueue}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold"
                    >
                      + Enqueue
                    </motion.button>
                    <motion.button
                      aria-label="Sandbox Dequeue"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDequeue}
                      className="px-3 py-1.5 bg-rose-700 hover:bg-rose-600 text-white rounded-lg text-xs font-bold"
                    >
                      − Dequeue
                    </motion.button>
                  </div>
                  <div className="text-xs text-slate-300 font-mono">
                    Buffer: [{queueBuffer.map(v => v || '_').join(', ')}]
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: CHALLENGE STAGE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
              <canvas ref={canvasRef} width={640} height={60} className="w-full rounded-xl" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase border ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                      : difficulty === 'advanced'
                      ? 'bg-rose-950/80 text-rose-400 border-rose-800'
                      : 'bg-cyan-950/80 text-cyan-400 border-cyan-800'
                  }`}
                >
                  {difficulty} TIER
                </motion.span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  NEP: {activeChallenge.competencyLevel}
                </span>
              </div>

              <div className="w-full md:w-48 h-2 bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={(currentChallenge + 1) / filteredChallenges.length * 100} aria-valuemin={0} aria-valuemax={100}>
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"
                  animate={{
                    width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%`
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-6"
            >
              <div className="text-base font-bold text-white whitespace-pre-line leading-relaxed">
                {activeChallenge.question}
              </div>

              {/* 1. MCQ */}
              {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
                <div className="space-y-3" role="radiogroup" aria-label="Multiple choice answers">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      role="radio"
                      aria-checked={showExplanation && i === activeChallenge.correctIndex}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium border transition-all ${
                        wrongFlash
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-indigo-500'
                      }`}
                    >
                      <span className="font-mono text-xs text-indigo-400 mr-2">[{String.fromCharCode(65 + i)}]</span>
                      {showExplanation && i === activeChallenge.correctIndex && <span className="mr-1 text-emerald-400">✓</span>}
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* 2. Drag-Label Challenge */}
              {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {activeChallenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        role="button"
                        tabIndex={0}
                        aria-label={`Draggable item: ${item.label}`}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['target_sum', 'target_carry', 'target_nand', 'target_nor'].map((targetId) => (
                      <div
                        key={targetId}
                        role="region"
                        aria-label={`Drop target for ${targetId.replace('target_', '').toUpperCase()}`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId, activeChallenge.correctMapping)}
                        className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px]"
                      >
                        <span className="text-[10px] text-slate-500 font-mono mb-1">
                          {targetId.replace('target_', '').toUpperCase()}
                        </span>
                        <span className="text-xs font-bold text-cyan-300 text-center">
                          {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : 'Drop Here'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Validate Architecture Mapping"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                  >
                    Validate Architecture Mapping
                  </motion.button>
                </div>
              )}

              {/* 3. Drag-Sort Challenge */}
              {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Drag and re-order the items into proper chronological sequence:</p>
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => handleDragStart(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        const toIdx = displayIdx;
                        audioManager.play('drop-correct');
                        setSortArrangement(prev => {
                          if (prev.length === 0 && activeChallenge.sortItems) {
                            prev = activeChallenge.sortItems.map((_, i) => i);
                          }
                          const arr = [...prev];
                          const [moved] = arr.splice(fromIdx, 1);
                          arr.splice(toIdx, 0, moved);
                          return arr;
                        });
                        setDraggedItem(null);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-950 rounded-xl text-xs text-slate-200 border border-slate-800 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-mono text-[10px] text-indigo-400">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}

                  <motion.button
                    aria-label="Check Order Sequence"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      const answer = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
                      handleAnswer(answer);
                    }}
                    disabled={showExplanation}
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                  >
                    Check Order Sequence
                  </motion.button>
                </div>
              )}

              {/* 4. Numeric Challenge */}
              {activeChallenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      aria-label={`Numeric answer input in ${activeChallenge.unit}`}
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter integer / numerical answer"
                      className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-indigo-500 w-64"
                    />
                    <span className="text-xs text-slate-400 font-mono">[{activeChallenge.unit}]</span>
                    <motion.button
                      aria-label="Submit Number"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                    >
                      Submit Number
                    </motion.button>
                  </div>
                </div>
              )}

              {/* 5. Construct Challenge */}
              {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {activeChallenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        aria-label={`Add code piece: ${part}`}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => {
                          setConstructParts(prev => [...prev, part]);
                          audioManager.play('pop');
                        }}
                        className="px-3 py-1.5 bg-indigo-900/60 hover:bg-indigo-800 border border-indigo-700 text-indigo-200 rounded-lg text-xs font-mono"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-mono"
                      >
                        {part}
                        <button
                          aria-label={`Remove code snippet ${part}`}
                          onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                          className="text-rose-300 hover:text-white text-xs font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500">Click code snippets above to assemble the statement.</span>
                    )}
                  </div>

                  <motion.button
                    aria-label="Validate Code Assembly"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                  >
                    Validate Code Assembly
                  </motion.button>
                </div>
              )}

              {/* Progressive Step-by-Step Reveal Card */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-600/40 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Examiner Step-By-Step Solution
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">CISCE 2025 Standard</span>
                  </div>

                  {activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans"
                    >
                      <strong className="text-amber-400 font-mono mr-1">{i + 1}.</strong>
                      {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                  <div className="flex items-center justify-between pt-2">
                    {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        aria-label="Show Next Step of Explanation"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => {
                          setRevealedSteps(s => s + 1);
                          audioManager.play('tap');
                        }}
                        className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                      >
                        Show Next Step →
                      </motion.button>
                    ) : (
                      <motion.button
                        aria-label="Advance to next challenge or final exam results"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Exam Results →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL REFLECTION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="p-8 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-900 rounded-3xl border border-indigo-700/50 text-center space-y-4">
              <span className="text-5xl" aria-hidden="true">🏆</span>
              <h2 className="text-2xl md:text-3xl font-black text-white">ISC Examination Simulation Complete</h2>
              <p className="text-sm text-slate-300 max-w-xl mx-auto">
                You have completed the full Class 11 Computer Science diagnostic syllabus review spanning hardware gates, Java dynamic dispatch, circular buffers, and relational DBMS.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto pt-2">
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">Calculated Score</div>
                  <div className="text-3xl font-black text-cyan-400 mt-1">{Math.max(0, 100 - errors * 5)}%</div>
                </div>
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">Total Errors</div>
                  <div className="text-3xl font-black text-rose-400 mt-1">{errors}</div>
                </div>
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">BKT Mastery</div>
                  <div className="text-xl font-black text-emerald-400 mt-2 uppercase">{masteryLevel}</div>
                </div>
              </div>
            </div>

            {/* Motivational Performance Message */}
            <div className="p-5 bg-indigo-950/40 rounded-2xl border border-indigo-700/50 text-indigo-200 text-sm md:text-base font-bold leading-relaxed text-center">
              {errors === 0
                ? '🌟 PERFECT SCORE!'
                : errors <= 3
                ? '👏 Great work!'
                : errors <= 7
                ? '👍 Good effort!'
                : '💪 Do not give up — You WILL get this!'}
            </div>

            {/* Misconception Profile */}
            {hitMisconceptions.length > 0 && (
              <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-800/50 space-y-3">
                <h3 className="text-sm font-bold text-rose-300">⚠️ Your Targeted Examiner Misconception Profile:</h3>
                <div className="space-y-2">
                  {hitMisconceptions.map((mIdx, i) => {
                    const item = misconceptions?.[mIdx];
                    if (!item) return null;
                    return (
                      <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                        <div className="text-rose-400 font-bold">✗ Common Trap: {item.misconception}</div>
                        <div className="text-emerald-400 mt-1">✓ Examiner Rule: {item.correction}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Spaced Repetition Schedule */}
            <div className="p-5 bg-indigo-950/30 rounded-2xl border border-indigo-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-indigo-300">Spaced Repetition System (SRS) Schedule</div>
                <p className="text-xs text-slate-400 mt-1">
                  Topic retention decays over time. Your personalized memory retention review schedule:
                </p>
              </div>
              <span className="text-sm font-black px-4 py-2 rounded-xl bg-indigo-700 text-white whitespace-nowrap">
                {errors === 0 ? 'Review in 7 days (Maintenance)' : errors <= 3 ? 'Review in 3 days (Reinforcement)' : 'Review in 1 day (Active Recall)'}
              </span>
            </div>

            {/* Real World Activity */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-cyan-300">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <ul className="space-y-1.5 pt-1">
                {REAL_WORLD_ACTIVITY.steps.map((st, idx) => (
                  <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">{idx + 1}.</span> {st}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="ISC Simulation Mastery Level Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_ComputerScienceExamPreparationPaperSim;
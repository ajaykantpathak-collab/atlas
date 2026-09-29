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
import { recordGameScore, getNodeMastery, getNodesNeedingReview } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS CONSTANTS (ALL 10 NODES PRESENT AS STRING LITERALS) ───
const NODE_C9_CS_011 = 'c9_cs_011';
const NODE_C9_CS_012 = 'c9_cs_012';
const NODE_C9_CS_013 = 'c9_cs_013';
const NODE_C9_CS_014 = 'c9_cs_014';
const NODE_C9_CS_015 = 'c9_cs_015';
const NODE_C9_CS_016 = 'c9_cs_016';
const NODE_C9_CS_017 = 'c9_cs_017';
const NODE_C9_CS_018 = 'c9_cs_018';
const NODE_C9_CS_019 = 'c9_cs_019';
const NODE_C9_CS_020 = 'c9_cs_020';

const ALL_NODE_IDS = [
  NODE_C9_CS_011,
  NODE_C9_CS_012,
  NODE_C9_CS_013,
  NODE_C9_CS_014,
  NODE_C9_CS_015,
  NODE_C9_CS_016,
  NODE_C9_CS_017,
  NODE_C9_CS_018,
  NODE_C9_CS_019,
  NODE_C9_CS_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Chandrayaan Avionics & Software Hub',
  intro: 'You are a junior flight-software and hardware engineer at ISRO Sriharikota. The autonomous lander navigation subsystem is preparing for lunar descent. You must verify the logic gates in the sensor-voter circuits, test the De Morgan simplified fail-safe expressions, dry-run fuel-throttling algorithms, and validate the Java ground telemetry pipeline (JDK -> Bytecode -> JVM) before launch clearance is granted.',
  context: 'The payload contains 4 primary systems: Digital Logic Core (AND/OR/XOR/NAND/NOR), Algorithm Engine (Trace Tables & Flowcharts), Language Translators (Compilers vs Interpreters), and Java Telemetry Stack (JVM Sandbox).',
};

// ─── BRILLIANT.ORG PREDICTION QUESTIONS (PREDICT-THEN-CHECK PATTERN) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'Prediction: If input A is 1 and input B is 0 in an XOR gate, what will the output Y be?',
    options: ['0 (LOW)', '1 (HIGH)', 'High-Impedance (Z)', 'Floating / Undefined'],
    correctIndex: 1,
    verifyInstruction: 'Set Input A = 1, Input B = 0 and select XOR gate in the circuit simulator to verify.',
    explanation: 'An XOR gate outputs 1 (HIGH) when inputs are different (1 and 0 are unequal).',
  },
  {
    id: 'pred_2',
    question: 'Prediction: What happens to the output of a NAND gate if BOTH inputs A and B are set to 1?',
    options: ['Output remains 1 (HIGH)', 'Output switches to 0 (LOW)', 'Output oscillates', 'Output doubles in voltage'],
    correctIndex: 1,
    verifyInstruction: 'Select the NAND gate and toggle both Input A and B to 1 to observe the LED output.',
    explanation: 'NAND is the negation of AND: 1 · 1 = 1, and NOT(1) = 0.',
  },
];

// ─── BRILLIANT.ORG OBSERVATION QUESTIONS ('WHAT DO YOU NOTICE?' PATTERN) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'Observation: When you increase the Circuit Voltage Slider from 1.0V to 10.0V, what do you notice on the live oscilloscope waveform and LED glow?',
    observableOptions: [
      'The signal wave amplitude expands and line thickness/pulse glow intensifies',
      'The wave frequency shifts into a sawtooth pattern',
      'The logic gate automatically switches into a NOT gate',
      'The truth table columns invert their binary values',
    ],
    correctIndex: 0,
    explanation: 'Higher supply voltage V_CC increases signal wave amplitude and LED brightness in the live oscilloscope simulation.',
  },
  {
    id: 'obs_2',
    question: 'Observation: Look at the trace table execution log during Lab 4 loop execution. What pattern is added to `sum` in each iteration step?',
    observableOptions: [
      'Consecutive perfect squares: 1 (1²), 4 (2²), 9 (3²), 16 (4²)...',
      'Doubling values: 2, 4, 8, 16...',
      'Constant value of 1 added every single step',
      'Decrementing odd numbers: 9, 7, 5, 3...',
    ],
    correctIndex: 0,
    explanation: 'The loop executes `sum = sum + (k * k)`, accumulating 1² + 2² + 3² + 4² = 30.',
  },
];

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In an autonomous lunar lander, two altitude sensors A and B trigger engine cut-off. To prevent false alarms from noise, both sensors must simultaneously report "Ground Contact = HIGH (1)". Which logic gate represents this fail-safe condition?',
  options: [
    'OR Gate — because either sensor touching is enough',
    'AND Gate — because both A AND B must be 1 to trigger',
    'NOT Gate — because it inverts the altitude signal',
    'XOR Gate — because only one sensor should differ',
  ],
  correctIndex: 1,
  hintAfter: 'Think about physical safety: If one sensor glitches to 1 due to dust, an OR gate would fire prematurely! An AND gate requires unanimous agreement (1 AND 1 = 1). Let us explore all gates in action.',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation Recall - c9_cs_011
  {
    id: 'ch_01',
    nodeId: NODE_C9_CS_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Identify the logic gate whose ANSI/IEEE symbol has a flat input back and rounded output (D-shape), outputting 1 only when all inputs are 1.',
    options: ['OR Gate', 'AND Gate', 'NOT Gate', 'NOR Gate'],
    correctIndex: 1,
    explanation: 'The AND gate has a flat-backed D-shape symbol. Its Boolean rule is Y = A · B, producing HIGH only when both inputs are 1.',
    hints: [
      'Check the geometry: flat back means series switches.',
      'It requires ALL inputs to be closed for current to flow.',
      'The flat D-shaped symbol represents the AND operation.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation Recall - c9_cs_012
  {
    id: 'ch_02',
    nodeId: NODE_C9_CS_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following gate pairs are universally recognized as Universal Logic Gates in digital electronics?',
    options: ['AND and OR', 'XOR and XNOR', 'NAND and NOR', 'NOT and AND'],
    correctIndex: 2,
    explanation: 'NAND and NOR are universal gates because any fundamental Boolean function (AND, OR, NOT) can be synthesized solely from either one.',
    hints: [
      'Look for the inverted versions of basic multi-input gates.',
      'XOR and XNOR cannot by themselves synthesize basic gates.',
      'NAND and NOR both possess complete logical universality.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation Understanding - c9_cs_016
  {
    id: 'ch_03',
    nodeId: NODE_C9_CS_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'An ISRO engineer writes assembly code with instructions `MOV AX, 01H` and `ADD AX, BX`. Which language generation and translation tool does this use?',
    options: [
      '1st Generation (Machine language) with no translator',
      '2nd Generation (Assembly language) with an Assembler',
      '3rd Generation (High-Level language) with a Compiler',
      '4th Generation (Declarative language) with an Interpreter',
    ],
    correctIndex: 1,
    explanation: 'Assembly language is 2nd generation, using mnemonic abbreviations (MOV, ADD) which are translated one-to-one into binary opcodes by an Assembler.',
    hints: [
      'Look at the keywords: MOV, ADD are mnemonics.',
      'Mnemonics belong to the second generation of programming.',
      'The specific translator for mnemonic code is the Assembler.',
    ],
    misconceptionIndex: 3,
  },
  // 4. Foundation Understanding - c9_cs_019
  {
    id: 'ch_04',
    nodeId: NODE_C9_CS_019,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who created the Java programming language at Sun Microsystems in 1995 (originally named "Oak")?',
    options: ['Dennis Ritchie', 'James Gosling', 'Bjarne Stroustrup', 'Guido van Rossum'],
    correctIndex: 1,
    explanation: 'James Gosling developed Java at Sun Microsystems in 1995. It was originally named Oak after an oak tree outside his office window.',
    hints: [
      'He is often referred to as Dr. Java.',
      'He led the Green Project team at Sun Microsystems.',
      'The lead creator is James Gosling.',
    ],
  },
  // 5. Foundation Drag-Label (Visual Diagram) - c9_cs_019
  {
    id: 'ch_05',
    nodeId: NODE_C9_CS_019,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each Java Architecture tier to its correct nested container position in the Java hierarchy.',
    dragItems: [
      { label: 'JDK (Development Kit)', targetId: 'box_outer' },
      { label: 'JRE (Runtime Env)', targetId: 'box_middle' },
      { label: 'JVM (Virtual Engine)', targetId: 'box_inner' },
      { label: 'Core API Libraries', targetId: 'box_libs' },
    ],
    correctMapping: {
      box_outer: 'JDK (Development Kit)',
      box_middle: 'JRE (Runtime Env)',
      box_inner: 'JVM (Virtual Engine)',
      box_libs: 'Core API Libraries',
    },
    explanation: 'JDK is the outermost toolkit containing javac & tools; JRE is the intermediate runtime containing libraries and JVM; JVM is the inner engine executing bytecode.',
    hints: [
      'JDK is the largest superset box containing compilers and debugging utilities.',
      'JRE sits inside JDK and bundles standard runtime libraries.',
      'JVM is the innermost execution engine that directly executes bytecode.',
    ],
    misconceptionIndex: 4,
  },
  // 6. Foundation Drag-Sort (Pipeline) - c9_cs_020
  {
    id: 'ch_06',
    nodeId: NODE_C9_CS_020,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of steps in the Java compilation and execution pipeline in chronological order.',
    sortItems: [
      'Write source code in Rover.java',
      'Execute `javac Rover.java` to generate bytecode',
      'Rover.class platform-independent bytecode generated',
      'JVM loads bytecode via `java Rover`',
      'Host CPU executes native machine instructions',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The pipeline starts with human-written .java source code, compiled by javac into .class bytecode, loaded by JVM with `java`, and translated to native machine code.',
    hints: [
      'You must write the .java source file before compiling.',
      '`javac` compiles source code into .class bytecode.',
      'Finally, `java` runs the JVM which produces machine instructions.',
    ],
  },
  // 7. Foundation Application - c9_cs_013
  {
    id: 'ch_07',
    nodeId: NODE_C9_CS_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'According to De Morgan\'s first law, what is the equivalent simplified expression of `~(A · B)` (or `NOT (A AND B)`)?',
    options: ['~A · ~B', '~A + ~B', 'A + B', '~(A + B)'],
    correctIndex: 1,
    explanation: 'De Morgan\'s Law 1 states ~(A · B) = ~A + ~B. The NOT breaks the conjunction and flips AND into OR.',
    hints: [
      'Break the bar, change the sign.',
      'When you negate an AND, it becomes an OR of the negated terms.',
      'The dot (AND) converts to a plus (OR) with individual complements: ~A + ~B.',
    ],
    misconceptionIndex: 2,
  },
  // 8. Standard Application (Indian Scenario) - c9_cs_011
  {
    id: 'ch_08',
    nodeId: NODE_C9_CS_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A smart solar irrigation pump in Punjab turns ON (1) if Solar Power is available (A=1) OR Battery Backup is charged (B=1), but ONLY IF the Master Safety Switch (C=1) is closed. What is the Boolean expression for Pump Output Y?',
    options: ['Y = (A · B) + C', 'Y = (A + B) · C', 'Y = A + (B · C)', 'Y = A\' · B · C'],
    correctIndex: 1,
    explanation: 'Either Solar (A) OR Battery (B) satisfies the power requirement (A + B), AND Master Switch C must be 1, giving Y = (A + B) · C.',
    hints: [
      'Group the alternative power sources with an OR operator (+).',
      'The master switch is an essential series condition (AND ·).',
      'The resulting composite expression is Y = (A + B) · C.',
    ],
  },
  // 9. Standard Analysis - c9_cs_012
  {
    id: 'ch_09',
    nodeId: NODE_C9_CS_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A 2-input XOR gate is fed with inputs A = 1 and B = 1. What is the output Y, and how does this relate to single-bit binary addition?',
    options: [
      'Y = 1; it equals the sum bit of 1 + 1',
      'Y = 0; it equals the SUM bit of 1 + 1 (with Carry = 1 generated by an AND gate)',
      'Y = 0; because XOR outputs 1 only when both inputs match',
      'Y = 1; because any HIGH input turns XOR ON',
    ],
    correctIndex: 1,
    explanation: 'In binary arithmetic, 1 + 1 = 10₂ (sum = 0, carry = 1). An XOR gate computes the SUM bit (1 ⊕ 1 = 0), while an AND gate computes the CARRY bit (1 · 1 = 1).',
    hints: [
      'XOR outputs 1 only when inputs DIFFER (01 or 10).',
      'For inputs 1 and 1, XOR yields 0.',
      'In binary addition, 1+1 gives sum 0 and carry 1.',
    ],
  },
  // 10. Standard Numeric - c9_cs_014
  {
    id: 'ch_10',
    nodeId: NODE_C9_CS_014,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Given the algorithm loop: `sum = 0; k = 1; WHILE k <= 4 DO sum = sum + (k * k); k = k + 1 ENDWHILE`. What is the final value of `sum` in the trace table?',
    correctAnswer: 30,
    tolerance: 0,
    unit: '',
    explanation: 'The loop computes the sum of squares of the first 4 natural numbers: 1² + 2² + 3² + 4² = 1 + 4 + 9 + 16 = 30.',
    hints: [
      'Trace iteration by iteration: k=1: sum=0+1=1.',
      'k=2: sum=1+4=5; k=3: sum=5+9=14.',
      'k=4: sum=14+16=30. Loop terminates when k reaches 5.',
    ],
  },
  // 11. Standard Construct - c9_cs_013
  {
    id: 'ch_11',
    nodeId: NODE_C9_CS_013,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Construct the simplified form of the Boolean expression `F = A·B + A·B\'` by applying common factor extraction and identity laws.',
    availableParts: ['A', 'B', 'B\'', '·', '+', '1', '0', '(', ')'],
    targetState: 'A · ( B + B\' ) = A · 1 = A',
    validationHint: 'Factor out A: A · ( B + B\' ), then replace (B + B\') with 1 to get A.',
    explanation: 'Factoring gives A · (B + B\'). By the Complementarity Law B + B\' = 1, and by Identity Law A · 1 = A.',
    hints: [
      'Both terms share the common variable A.',
      'Recall the identity rule: any variable ORed with its complement equals 1.',
      'A · 1 collapses directly into A.',
    ],
  },
  // 12. Standard Analysis - c9_cs_017
  {
    id: 'ch_12',
    nodeId: NODE_C9_CS_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In Indian Railways Passenger Reservation software, why is the backend core written in compiled C/C++ or compiled Java bytecode rather than purely interpreted line-by-line scripts?',
    options: [
      'Interpreted code needs no memory while compiled code uses zero CPU cycles',
      'Compiled code translates ahead of time into reusable machine/bytecode, executing orders of magnitude faster without per-line translation overhead',
      'Interpreters cannot detect syntax errors while compilers ignore runtime exceptions',
      'Compiled programs can run without any operating system kernel',
    ],
    correctIndex: 1,
    explanation: 'Compilers translate source code into persistent object/bytecode upfront. At execution, the CPU runs pre-translated code without the repeated translation latency of interpreters.',
    hints: [
      'Think about repeated translation vs one-time upfront translation.',
      'High-traffic ticketing servers process millions of requests per second.',
      'Compiled executables eliminate real-time interpretation delays.',
    ],
  },
  // 13. Standard Understanding - c9_cs_018
  {
    id: 'ch_13',
    nodeId: NODE_C9_CS_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the primary architectural advantage of a Modular Top-Down approach with single-entry and single-exit modules in software engineering?',
    options: [
      'It allows functions to jump to random line numbers anywhere in memory',
      'It isolates complexity into independent, testable, and reusable subroutines that can be developed in parallel',
      'It eliminates the need for internal documentation and comments',
      'It forces all variables in the entire project to be declared global',
    ],
    correctIndex: 1,
    explanation: 'Top-down decomposition breaks large problems into manageable modules with explicit parameters and return points, facilitating unit testing, team collaboration, and code reuse.',
    hints: [
      'Think about team collaboration on a large software project.',
      'Modules with single entry/exit points are deterministic and easy to debug.',
      'Independent subroutines can be reused and maintained without side effects.',
    ],
  },
  // 14. Standard Application - c9_cs_020
  {
    id: 'ch_14',
    nodeId: NODE_C9_CS_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why MUST the keyword `static` be included in the Java entry signature `public static void main(String args[])`?',
    options: [
      'Because `static` prevents other programmers from reading the bytecode',
      'Because the JVM must execute `main` upon startup before any class instance/object has been instantiated in memory',
      'Because `static` tells the compiler that the method returns an integer status code',
      'Because all variables inside `main` automatically become constant values',
    ],
    correctIndex: 1,
    explanation: '`static` binds the method to the Class itself rather than an object instance. The JVM can call `Telemetry.main()` directly without needing to execute `new Telemetry()`.',
    hints: [
      'Consider what exists in RAM when the JVM first launches the program.',
      'No object of the host class has been constructed yet.',
      '`static` enables invoking a class-level method without an instance.',
    ],
  },
  // 15. Advanced Evaluation - c9_cs_012
  {
    id: 'ch_15',
    nodeId: NODE_C9_CS_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate this statement: "An XNOR gate is identical to an XOR gate whose output is connected to a NOT gate, making it an Equality Comparator."',
    options: [
      'False — XNOR outputs 1 only when inputs differ',
      'True — XNOR outputs 1 when both inputs are identical (00->1 and 11->1), functioning as a 2-bit equality detector',
      'False — XNOR is a universal gate and cannot compare bits',
      'True — but XNOR can only accept 3 or more inputs',
    ],
    correctIndex: 1,
    explanation: 'XNOR (Exclusive NOR) has the Boolean equation Y = A·B + A\'·B\'. Its truth table yields 1 for 00 and 11, serving as an exact hardware coincidence/equality detector.',
    hints: [
      'Examine the outputs when A=0, B=0 and when A=1, B=1.',
      'In both identical cases, XNOR yields HIGH (1).',
      'It literally checks whether input A is identical to input B.',
    ],
  },
  // 16. Advanced Analysis - c9_cs_013
  {
    id: 'ch_16',
    nodeId: NODE_C9_CS_013,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A 3-variable truth table has output F = 1 only on rows (A=0,B=1,C=1) and (A=1,B=1,C=1). What is the canonical Sum-Of-Products (SOP) minterm equation and its minimal form?',
    options: [
      'F = A\'BC + ABC; simplifying to F = BC',
      'F = AB\'C\' + ABC; simplifying to F = AC',
      'F = (A+B+C) · (A\'+B\'+C\'); simplifying to F = B',
      'F = A\'B\'C + ABC\'; simplifying to F = C',
    ],
    correctIndex: 0,
    explanation: 'Row (0,1,1) gives minterm A\'BC. Row (1,1,1) gives ABC. F = A\'BC + ABC = (A\' + A)BC = 1 · BC = BC.',
    hints: [
      'For A=0 use A\', for A=1 use A.',
      'Combine: A\'·B·C + A·B·C.',
      'Factor out BC: (A\' + A) · BC = 1 · BC = BC.',
    ],
  },
  // 17. Advanced Application - c9_cs_015
  {
    id: 'ch_17',
    nodeId: NODE_C9_CS_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In a flowchart designed to calculate the GCD of two numbers using the Euclidean algorithm with loops, which flowchart symbol must contain the loop termination check `B == 0`?',
    options: [
      'Parallelogram (Input/Output)',
      'Diamond (Decision symbol)',
      'Rectangle (Process box)',
      'Oval/Pill (Terminator symbol)',
    ],
    correctIndex: 1,
    explanation: 'All conditional tests and loop termination criteria in standard ANSI flowcharts must be placed inside Diamond decision symbols with branching "Yes" and "No" lines.',
    hints: [
      'Conditionals split execution into multiple branching paths.',
      'The shape has one entry and two (or three) exit arrows.',
      'The Diamond is the standard decision shape.',
    ],
  },
  // 18. Advanced Analysis - c9_cs_017
  {
    id: 'ch_18',
    nodeId: NODE_C9_CS_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is Java described as BOTH a compiled and an interpreted language?',
    options: [
      'Because `javac` compiles to native machine code on Windows, but interprets on Linux',
      'Because `javac` compiles source code into intermediate bytecode (.class), and the platform-specific JVM interprets/JIT-compiles that bytecode at runtime',
      'Because it runs two separate compilers simultaneously to eliminate syntax errors',
      'Because Java compiles HTML and interprets JavaScript',
    ],
    correctIndex: 1,
    explanation: 'Java uses a hybrid 2-tier translation model: javac compiles .java text into platform-neutral bytecode, and the host JVM interprets or JIT-compiles that bytecode into native CPU instructions.',
    hints: [
      'Step 1 produces .class bytecode (compilation).',
      'Step 2 translates bytecode on the destination OS at runtime (interpretation/JIT).',
      'This two-stage model enables "Write Once, Run Anywhere".',
    ],
  },
  // 19. Advanced Creativity (Design) - c9_cs_018
  {
    id: 'ch_19',
    nodeId: NODE_C9_CS_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are architecting an automated Aadhaar-based Direct Benefit Transfer system for rural farmers. How should you structure the top-down modular decomposition?',
    options: [
      'Write a 4000-line monolithic `main()` function with global goto labels',
      'Separate into distinct modules: `verifyAadhaarBio()`, `checkLandRecord()`, `calcDisbursement()`, `initiateNEFT()`, and `logAudit()`',
      'Place all database passwords and credentials in plaintext comments inside `display()`',
      'Execute all bank transfers inside an infinite while loop without error checks',
    ],
    correctIndex: 1,
    explanation: 'Top-down modular design decomposes the complex system into single-responsibility subroutines: identity verification, entitlement checks, financial calculation, banking transaction, and audit logging.',
    hints: [
      'Follow the principle of Single Responsibility per module.',
      'Each sub-task should be a distinct callable function with clear inputs and outputs.',
      'Option B demonstrates professional modular architecture.',
    ],
  },
  // 20. Advanced Analysis - c9_cs_020
  {
    id: 'ch_20',
    nodeId: NODE_C9_CS_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A student creates a file named `SatelliteTracker.java` containing `public class OrbitCalc { public static void main(String args[]){...} }`. What happens when executing `javac SatelliteTracker.java`?',
    options: [
      'It compiles successfully and creates SatelliteTracker.class',
      'Compile error: class OrbitCalc is public, should be declared in a file named OrbitCalc.java',
      'The JVM automatically renames the file to OrbitCalc.java',
      'The program runs directly without creating any .class file',
    ],
    correctIndex: 1,
    explanation: 'In Java, a public class MUST reside in a source file matching its exact name and casing (`OrbitCalc.java`). Otherwise, javac throws a compilation error.',
    hints: [
      'Recall Java\'s strict naming rule for public classes.',
      'The file name must match the public class name exactly, including case sensitivity.',
      'Because the names differ (`SatelliteTracker` vs `OrbitCalc`), compilation fails.',
    ],
    misconceptionIndex: 5,
  },
  // 21. Advanced Drag-Sort (Algorithm Steps) - c9_cs_014
  {
    id: 'ch_21',
    nodeId: NODE_C9_CS_014,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Order the algorithm stages to compute the Factorial of N using structured pseudocode with validation.',
    sortItems: [
      'INPUT N from telemetry stream',
      'IF N < 0 THEN OUTPUT "Invalid Negative" and EXIT',
      'INITIALISE fact = 1, i = 1',
      'WHILE i <= N DO fact = fact * i; i = i + 1 ENDWHILE',
      'OUTPUT "Factorial = ", fact',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Structured algorithm design: 1. Input acquisition, 2. Boundary validation check, 3. Accumulator initialization, 4. Iteration with update step, 5. Output presentation.',
    hints: [
      'Always validate input boundaries right after reading data.',
      'Accumulator initialization must occur prior to entering the loop.',
      'Displaying results is the final step.',
    ],
  },
  // 22. Advanced Evaluation - c9_cs_016
  {
    id: 'ch_22',
    nodeId: NODE_C9_CS_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the core difference between Procedural Programming (e.g., C) and Object-Oriented Programming (e.g., Java):',
    options: [
      'Procedural code is written in English, while OOP code is pure binary numbers',
      'Procedural programming separates data from procedures with functions acting on loose data; OOP encapsulates state (attributes) and behavior (methods) together inside objects',
      'Procedural programming allows multiple inheritance while OOP forbids classes',
      'Procedural languages do not require compilers while OOP languages only use interpreters',
    ],
    correctIndex: 1,
    explanation: 'The fundamental paradigm shift is encapsulation: Procedural focuses on a sequence of actions on external data (verbs first), while OOP binds data and the methods that operate on that data into unified objects (nouns with behaviors).',
    hints: [
      'Think about how data and functions are bundled.',
      'In OOP, state (data) and behavior (methods) live together inside a class.',
      'In procedural C, data is passed into free-standing functions.',
    ],
    misconceptionIndex: 3,
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

// ─── DEFAULT PROPS WITH FULL ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C9_CS_011,
  title: 'Basic & Derived Logic Gates, Boolean Algebra, Algorithms & Java Architecture',
  definition: 'A logic gate is an electronic circuit that implements a Boolean operation on binary inputs producing a binary output. Java is a high-level, class-based, object-oriented language that compiles to platform-independent bytecode executed by the JVM.',
  eli5: 'Logic gates are tiny electronic switches that make decisions with 0s (OFF) and 1s (ON). Java writes a recipe in universal bytecode so any computer with a JVM can execute it anywhere in the world!',
  misconceptions: [
    {
      misconception: 'AND and OR gate symbols look similar and can be swapped interchangeably.',
      correction: 'AND gate has a flat back (D-shape), whereas OR gate has a curved back and pointed output tip.',
    },
    {
      misconception: 'XOR and XNOR are universal gates like NAND and NOR.',
      correction: 'Only NAND and NOR are universal gates because only they can synthesize all basic gates (AND, OR, NOT) without auxiliary chips.',
    },
    {
      misconception: 'De Morgan\'s law keeps the same operator: ~(A · B) = ~A · ~B.',
      correction: 'De Morgan\'s law flips the operator: ~(A · B) = ~A + ~B, and ~(A + B) = ~A · ~B.',
    },
    {
      misconception: 'Assembly language is fully portable because it uses English words like MOV and ADD.',
      correction: 'Assembly language mnemonics map directly to a specific processor family opcode set (e.g., x86 vs ARM) and is not portable.',
    },
    {
      misconception: 'The JDK, JRE, and JVM are three different competing programming languages.',
      correction: 'They are nested components of the Java platform: JDK ⊃ JRE ⊃ JVM. JDK contains development tools, JRE provides runtime libraries, and JVM is the execution engine.',
    },
    {
      misconception: 'The .class file produced by javac contains native machine code directly executable by the CPU.',
      correction: 'The .class file contains bytecode (a platform-neutral virtual instruction set). Only the host JVM translates bytecode into native CPU machine code at runtime.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is the output of a 2-input AND gate when input A=1 and input B=0?',
      options: ['0', '1', 'Undefined', 'High Impedance'],
      correctIndex: 0,
    },
    {
      question: 'Which gate produces an output of 1 when inputs DIFFER (0,1 or 1,0)?',
      options: ['AND Gate', 'XOR Gate', 'XNOR Gate', 'NOR Gate'],
      correctIndex: 1,
    },
    {
      question: 'What is the output of NOT (A OR B) when A=0 and B=0?',
      options: ['0', '1', 'A', 'B'],
      correctIndex: 1,
    },
    {
      question: 'Which tool translates Java source code (.java) into bytecode (.class)?',
      options: ['JVM', 'javac compiler', 'javadoc', 'g++'],
      correctIndex: 1,
    },
    {
      question: 'In a flowchart, what shape is strictly used for loop conditions and decisions?',
      options: ['Rectangle', 'Diamond', 'Parallelogram', 'Circle'],
      correctIndex: 1,
    },
    {
      question: 'What does JVM stand for in the Java runtime hierarchy?',
      options: ['Java Visual Manager', 'Java Virtual Machine', 'Java Variable Memory', 'Java Vector Model'],
      correctIndex: 1,
    },
    {
      question: 'Which law states that A + A\' = 1?',
      options: ['De Morgan\'s Law', 'Complementarity / Identity Law', 'Involution Law', 'Commutative Law'],
      correctIndex: 1,
    },
    {
      question: 'In an algorithm trace table, what is recorded in the rows?',
      options: ['Only the final answer', 'Variable values after every significant step/iteration', 'Hardware clock speeds', 'Source code comments'],
      correctIndex: 1,
    },
  ],
  masteryCriteria: 'Student demonstrates comprehensive understanding of all 10 syllabus nodes: constructing truth tables for basic/derived gates, applying De Morgan laws, tracing pseudocode loops, classifying language generations/translators, and explaining the Java compilation pipeline.',
};

// ─── BRILLIANT.ORG INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Basic Gates Sandbox: Hardware Voltage Realization',
    instruction: 'Toggle Input Pins A and B to send HIGH (5V = 1) or LOW (0V = 0) signals through the ANSI logic gates and observe the live voltage output.',
    interactionType: 'toggle-pins',
    nodeId: NODE_C9_CS_011,
  },
  {
    title: '2. Universal & Derived Gates: NAND, NOR, XOR, XNOR',
    instruction: 'Switch gate types to test how derived gates combine basic operations and verify why XOR powers single-bit binary adders.',
    interactionType: 'derived-selector',
    nodeId: NODE_C9_CS_012,
  },
  {
    title: '3. De Morgan\'s Law & Expression Simplification Engine',
    instruction: 'Adjust the Boolean formula variables to see the real-time circuit simplification and verify equivalent truth tables.',
    interactionType: 'demorgan-slider',
    nodeId: NODE_C9_CS_013,
  },
  {
    title: '4. Algorithm Trace Table & Flowchart Step-Through',
    instruction: 'Click "Step Loop" to execute pseudocode line-by-line and watch variables update live inside the memory trace table.',
    interactionType: 'trace-stepper',
    nodeId: NODE_C9_CS_014,
  },
  {
    title: '5. Java Compilation Pipeline: Source -> Bytecode -> JVM',
    instruction: 'Click "Compile (javac)" and "Run (JVM)" to watch Rover.java transform into platform-neutral bytecode and execute on Windows, Mac, or Linux.',
    interactionType: 'java-pipeline',
    nodeId: NODE_C9_CS_019,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Avionics & Software Verification Engineer',
  description: 'Design a fail-safe payload telemetry controller for the Gaganyaan crew module. Combine two sensor signals using Boolean logic, sketch a structured loop algorithm in pseudocode with a trace table, and construct the Java class skeleton to transmit telemetry packets.',
  steps: [
    'Draw a 2-input logic circuit where Cabin Pressure (P=1) AND Oxygen Level (O=1) activate LifeSupport',
    'Write a De Morgan equivalent expression for when LifeSupport ALARM activates: ~(P · O) = ~P + ~O',
    'Design pseudocode with a WHILE loop to monitor temperature sensor packets for 10 cycles and trace variables',
    'Write a complete Java class `CrewModule` with `public static void main(String args[])` and print "Telemetry Nominal"',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C9_ComputerScienceBasicLogicGatesSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C9_CS_011,
  title = DEFAULT_PROPS.title || 'Basic Logic Gates & Java Architecture',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // ─── STATE DECLARATIONS ───
  const subjectConfig = SUBJECT_CONFIG['compsci'] || { name: 'Computer Science', emoji: '💻', color: 'cyan' };

  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Discovery & Predict-Check states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Prediction Questions State
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [predictionSubmitted, setPredictionSubmitted] = useState<Record<number, boolean>>({});

  // Observation Questions State
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});
  const [observationSubmitted, setObservationSubmitted] = useState<Record<number, boolean>>({});

  // Interactive Gate Simulator states (with real-time connected slider)
  const [inputA, setInputA] = useState<number>(1);
  const [inputB, setInputB] = useState<number>(0);
  const [selectedGate, setSelectedGate] = useState<'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR'>('AND');
  const [circuitVoltage, setCircuitVoltage] = useState<number>(5.0);

  // Algorithm & Trace Table States
  const [traceN, setTraceN] = useState<number>(4);
  const [traceStep, setTraceStep] = useState<number>(0);
  const [traceHistory, setTraceHistory] = useState<Array<{ k: number; sum: number; line: string }>>([
    { k: 1, sum: 0, line: 'Initialise sum = 0, k = 1' },
  ]);
  const [traceRunning, setTraceRunning] = useState<boolean>(false);

  // Java Pipeline Visualizer States
  const [javaSourceCode, setJavaSourceCode] = useState<string>(
    'public class Lander {\n  public static void main(String args[]) {\n    System.out.println("Touchdown Nominal!");\n  }\n}'
  );
  const [isCompiled, setIsCompiled] = useState<boolean>(false);
  const [compiledBytecode, setCompiledBytecode] = useState<string>('0xCAFEBABE 0003002D 001B0700 ... Code: invokevirtual #4');
  const [targetPlatform, setTargetPlatform] = useState<'Windows x64' | 'macOS ARM64' | 'Linux Server'>('Windows x64');
  const [jvmExecutionOutput, setJvmExecutionOutput] = useState<string>('');

  // Adaptive BKT, Difficulty & SRS
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Spaced Repetition Days
  const srsDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  // Reflection responses
  const [reflections, setReflections] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Escalating hints & feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Sort & Interactive inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual effects
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

  // ─── GATE CALCULATION HELPER ───
  const gateOutput = useMemo(() => {
    switch (selectedGate) {
      case 'AND':
        return inputA === 1 && inputB === 1 ? 1 : 0;
      case 'OR':
        return inputA === 1 || inputB === 1 ? 1 : 0;
      case 'NOT':
        return inputA === 1 ? 0 : 1;
      case 'NAND':
        return !(inputA === 1 && inputB === 1) ? 1 : 0;
      case 'NOR':
        return !(inputA === 1 || inputB === 1) ? 1 : 0;
      case 'XOR':
        return inputA !== inputB ? 1 : 0;
      case 'XNOR':
        return inputA === inputB ? 1 : 0;
      default:
        return 0;
    }
  }, [selectedGate, inputA, inputB]);

  // ─── ADAPTIVE DIFFICULTY FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── USEEFFECT HOOKS ───

  // Effect 1: Initial mastery load on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 85) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
    speechManager.speak('Welcome to the ISRO Avionics and Logic Gate Simulation.');
  }, [nodeId]);

  // Effect 2: Adaptive BKT mastery update
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Effect 3: HTML5 Canvas 2D Signal Pulse Animation responsive to slider (circuitVoltage)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const render = () => {
      tick += 1;
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

      // Signal wave amplitude scaled directly by circuitVoltage slider
      const voltageScale = circuitVoltage / 5.0;
      ctx.beginPath();
      ctx.strokeStyle = gateOutput === 1 ? '#22c55e' : '#64748b';
      ctx.lineWidth = 3;
      for (let x = 0; x < canvas.width; x++) {
        const freq = 0.05;
        const amp = (gateOutput === 1 ? 12 : 2) * voltageScale;
        const y = canvas.height / 2 + Math.sin(x * freq + tick * 0.08) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Traveling signal pulse packet
      const packetX = (tick * 3) % canvas.width;
      ctx.fillStyle = gateOutput === 1 ? '#4ade80' : '#94a3b8';
      ctx.beginPath();
      ctx.arc(packetX, canvas.height / 2, 4 + voltageScale * 2, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [gateOutput, circuitVoltage]);

  // Effect 4: Algorithm Trace Loop stepper timer
  useEffect(() => {
    if (!traceRunning) return;
    const timer = setInterval(() => {
      setTraceStep((prevStep) => {
        const nextK = prevStep + 1;
        if (nextK <= traceN) {
          const currentSum = traceHistory[traceHistory.length - 1]?.sum || 0;
          const newSum = currentSum + nextK * nextK;
          setTraceHistory((prev) => [
            ...prev,
            { k: nextK, sum: newSum, line: `Step ${nextK}: sum = ${currentSum} + (${nextK}*${nextK}) = ${newSum}` },
          ]);
          audioManager.play('count');
          return nextK;
        } else {
          setTraceRunning(false);
          audioManager.play('success');
          speechManager.speak(`Trace finished. Final sum of squares is ${traceHistory[traceHistory.length - 1]?.sum}`);
          return prevStep;
        }
      });
    }, 700);

    return () => clearInterval(timer);
  }, [traceRunning, traceN, traceHistory]);

  // Effect 5: Auto-inactivity cleanup
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── CALLBACK HANDLERS ───

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount]);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintMsg}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      audioManager.play('pop');
      speechManager.speak('Let us study the complete solution breakdown together.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'error');
    speechManager.speak(isCorrect ? 'Excellent deduction! Both sensors must agree for an AND gate.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handlePredictionAnswer = useCallback((qIndex: number, optIndex: number) => {
    setPredictionAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
    setPredictionSubmitted((prev) => ({ ...prev, [qIndex]: true }));
    const isCorrect = optIndex === PREDICTION_QUESTIONS[qIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Good prediction! Now test it in the lab.' : 'Prediction noted. Interact below to verify!');
  }, []);

  const handleObservationAnswer = useCallback((qIndex: number, optIndex: number) => {
    setObservationAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
    setObservationSubmitted((prev) => ({ ...prev, [qIndex]: true }));
    const isCorrect = optIndex === OBSERVATION_QUESTIONS[qIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'error');
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
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleTogglePinA = useCallback(() => {
    setInputA((prev) => (prev === 1 ? 0 : 1));
    audioManager.play('tap');
  }, []);

  const handleTogglePinB = useCallback(() => {
    setInputB((prev) => (prev === 1 ? 0 : 1));
    audioManager.play('tap');
  }, []);

  const handleSelectGate = useCallback((gate: 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR') => {
    setSelectedGate(gate);
    audioManager.play('pop');
  }, []);

  const handleStartTrace = useCallback(() => {
    setTraceStep(0);
    setTraceHistory([{ k: 1, sum: 0, line: 'Initialise sum = 0, k = 1' }]);
    setTraceRunning(true);
    audioManager.play('whoosh');
  }, []);

  const handleResetTrace = useCallback(() => {
    setTraceRunning(false);
    setTraceStep(0);
    setTraceHistory([{ k: 1, sum: 0, line: 'Initialise sum = 0, k = 1' }]);
    audioManager.play('pop');
  }, []);

  const handleCompileJava = useCallback(() => {
    audioManager.play('count');
    setIsCompiled(true);
    setCompiledBytecode('0xCAFEBABE (Magic Number)\nMajor Version: 61.0\n0: getstatic #2 // System.out\n3: ldc #3 // "Touchdown Nominal!"\n5: invokevirtual #4 // println\n8: return');
    speechManager.speak('Compilation successful. Bytecode generated in Lander.class');
  }, []);

  const handleRunJvm = useCallback(() => {
    if (!isCompiled) {
      audioManager.play('error');
      speechManager.speak('Compile with javac first!');
      return;
    }
    audioManager.play('success');
    setJvmExecutionOutput(`[JVM ${targetPlatform}] Loaded Lander.class -> Verified Bytecode -> Native Execution:\n>> Touchdown Nominal!`);
    speechManager.speak('JVM executed bytecode successfully on ' + targetPlatform);
  }, [isCompiled, targetPlatform]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

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

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const arr = prev.length > 0 ? [...prev] : (challenge.sortItems || []).map((_, i) => i);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Mission Accomplished!');
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
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

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
        isCorrect = (answer as string).replace(/\s+/g, '') === (challenge.targetState || '').replace(/\s+/g, '');
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding work.');
        setShowConfetti(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3000);
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
          speechManager.speak('Let us review the step-by-step logic breakdown.');
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
    [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/60 border border-gold-700/50 rounded-2xl">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 bg-gold-900/50 text-gold-300 rounded-md border border-gold-700/40">
                ICSE Class 9
              </span>
              <span className="text-xs text-slate-400">ISRO Avionics Simulation</span>
            </div>
            <h1 className="text-lg md:text-xl font-extrabold text-white">{title}</h1>
          </div>
        </div>

        {/* Dynamic difficulty & mastery pill */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/50'
                : difficulty === 'standard'
                ? 'bg-amber-950/80 text-amber-300 border border-amber-600/50'
                : 'bg-rose-950/80 text-rose-300 border border-rose-600/50'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            Mastery: {masteryLevel}
          </span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/70 via-slate-900 to-gold-950/60 rounded-2xl border border-gold-800/50 shadow-lg">
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm mb-2 uppercase tracking-wide">
              <span>🚀</span> Mission Scenario Hook
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 bg-slate-900/80 p-3 rounded-xl border border-slate-800">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <h3 className="text-white font-semibold text-base md:text-lg mb-4 flex items-center gap-2">
              <span className="text-amber-400">⚡</span> {DISCOVERY_QUESTION.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${opt}`}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700/70 text-slate-200'
                  }`}
                >
                  <span className="font-bold text-gold-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <p className={discoveryCorrect ? 'text-emerald-400 text-sm font-medium' : 'text-amber-400 text-sm font-medium'}>
                  {discoveryCorrect ? '✓ Spot on! Both inputs must be HIGH for an AND gate to conduct.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <div className="mt-4 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    aria-label="Proceed to exploration"
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-950 flex items-center gap-2"
                  >
                    Enter Interactive Avionics Labs →
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (BRILLIANT.ORG STYLE) ��── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* ── PREDICT-THEN-CHECK CARD (BRILLIANT.ORG PATTERN) ── */}
          <div className="p-5 bg-gradient-to-r from-amber-950/60 via-slate-900 to-gold-950/60 rounded-2xl border border-amber-600/40">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>🔮</span> Predict-Then-Check Engine (Brilliant Pattern)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PREDICTION_QUESTIONS.map((pq, pIdx) => {
                const isAnswered = predictionSubmitted[pIdx];
                const selected = predictionAnswers[pIdx];
                return (
                  <div key={pq.id} className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-200 mb-2">{pq.question}</p>
                      <div className="space-y-1.5">
                        {pq.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => handlePredictionAnswer(pIdx, oIdx)}
                            disabled={isAnswered}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition border ${
                              isAnswered
                                ? oIdx === pq.correctIndex
                                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                                  : oIdx === selected
                                  ? 'bg-rose-950/60 border-rose-600 text-rose-300'
                                  : 'bg-slate-900/40 border-slate-800 text-slate-500'
                                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                            }`}
                          >
                            <span className="text-gold-400 font-mono mr-1.5">{oIdx + 1}.</span>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    {isAnswered && (
                      <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-amber-300">
                        <span className="font-bold">👉 Verification: </span>
                        {pq.verifyInstruction}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            {EXPLORATION_STEPS.map((st, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-semibold text-center border transition-all ${
                  currentSlide === idx
                    ? 'bg-gold-950 text-gold-300 border-gold-500 shadow-md shadow-gold-950'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                Lab {idx + 1}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg md:text-xl font-bold text-gold-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-400 font-mono">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>
              <p className="text-amber-300 text-sm mb-4 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>

              {/* ── LAB 1 & 2: LOGIC GATE CIRCUIT ENGINE (SVG DIAGRAM 1) ── */}
              {(currentSlide === 0 || currentSlide === 1) && (
                <div className="space-y-4">
                  {/* Gate Selector Bar */}
                  <div className="flex flex-wrap gap-2">
                    {(currentSlide === 0 ? ['AND', 'OR', 'NOT'] : ['NAND', 'NOR', 'XOR', 'XNOR']).map((g) => (
                      <motion.button
                        key={g}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSelectGate(g as any)}
                        aria-label={`Select ${g} gate`}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all border ${
                          selectedGate === g
                            ? 'bg-gold-600 text-white border-gold-400 shadow-md shadow-gold-950'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {g} Gate
                      </motion.button>
                    ))}
                  </div>

                  {/* Real-time slider controlling circuit voltage and pulse amplitude */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <label className="text-xs font-semibold text-gold-300 flex items-center gap-2">
                      <span>⚡ Circuit Voltage Slider (Live Real-Time Control):</span>
                      <strong className="text-amber-400 font-mono">{circuitVoltage.toFixed(1)} V</strong>
                    </label>
                    <input
                      type="range"
                      min="1.0"
                      max="10.0"
                      step="0.1"
                      value={circuitVoltage}
                      onChange={(e) => setCircuitVoltage(Number(e.target.value))}
                      aria-label="Circuit Voltage Slider"
                      className="w-full md:w-64 accent-gold-400 cursor-pointer"
                    />
                  </div>

                  {/* Multi-Representation Visualizer: SVG Schematic 1 + Live Truth Table */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* SVG Circuit Schematic 1 */}
                    <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                        <span>Interactive Schematic (ANSI/IEEE Gate Diagram)</span>
                        <span className="text-gold-400 font-mono">V_CC = {circuitVoltage.toFixed(1)}V</span>
                      </div>

                      <svg viewBox="0 0 450 200" className="w-full h-auto">
                        {/* Input Switch A */}
                        <g onClick={handleTogglePinA} className="cursor-pointer">
                          <rect x="20" y="40" width="60" height="30" rx="6" fill={inputA === 1 ? '#065f46' : '#334155'} stroke={inputA === 1 ? '#10b981' : '#64748b'} strokeWidth="2" />
                          <text x="50" y="60" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">A: {inputA === 1 ? '1 (HIGH)' : '0 (LOW)'}</text>
                        </g>

                        {/* Input Wire A */}
                        <path d="M 80 55 L 160 55" stroke={inputA === 1 ? '#22c55e' : '#475569'} strokeWidth={inputA === 1 ? 2 + circuitVoltage * 0.3 : 2} fill="none" />

                        {/* Input Switch B */}
                        {selectedGate !== 'NOT' && (
                          <>
                            <g onClick={handleTogglePinB} className="cursor-pointer">
                              <rect x="20" y="130" width="60" height="30" rx="6" fill={inputB === 1 ? '#065f46' : '#334155'} stroke={inputB === 1 ? '#10b981' : '#64748b'} strokeWidth="2" />
                              <text x="50" y="150" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">B: {inputB === 1 ? '1 (HIGH)' : '0 (LOW)'}</text>
                            </g>
                            <path d="M 80 145 L 160 145" stroke={inputB === 1 ? '#22c55e' : '#475569'} strokeWidth={inputB === 1 ? 2 + circuitVoltage * 0.3 : 2} fill="none" />
                          </>
                        )}

                        {/* Gate Body Shapes */}
                        {selectedGate === 'AND' && (
                          <g>
                            <path d="M 160 30 L 220 30 A 70 70 0 0 1 220 170 L 160 170 Z" fill="#1e293b" stroke="#06b6d4" strokeWidth="3" />
                            <text x="200" y="105" textAnchor="middle" fill="#38bdf8" fontSize="14" fontWeight="bold">AND</text>
                            <path d="M 290 100 L 370 100" stroke={gateOutput === 1 ? '#22c55e' : '#475569'} strokeWidth={gateOutput === 1 ? 2 + circuitVoltage * 0.4 : 2} fill="none" />
                          </g>
                        )}

                        {selectedGate === 'OR' && (
                          <g>
                            <path d="M 150 30 Q 200 100 150 170 Q 240 170 280 100 Q 240 30 150 30 Z" fill="#1e293b" stroke="#06b6d4" strokeWidth="3" />
                            <text x="210" y="105" textAnchor="middle" fill="#38bdf8" fontSize="14" fontWeight="bold">OR</text>
                            <path d="M 280 100 L 370 100" stroke={gateOutput === 1 ? '#22c55e' : '#475569'} strokeWidth={gateOutput === 1 ? 2 + circuitVoltage * 0.4 : 2} fill="none" />
                          </g>
                        )}

                        {selectedGate === 'NOT' && (
                          <g>
                            <path d="M 160 40 L 240 100 L 160 160 Z" fill="#1e293b" stroke="#06b6d4" strokeWidth="3" />
                            <circle cx="247" cy="100" r="7" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
                            <text x="195" y="105" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">NOT</text>
                            <path d="M 254 100 L 370 100" stroke={gateOutput === 1 ? '#22c55e' : '#475569'} strokeWidth={gateOutput === 1 ? 2 + circuitVoltage * 0.4 : 2} fill="none" />
                          </g>
                        )}

                        {selectedGate === 'NAND' && (
                          <g>
                            <path d="M 160 30 L 220 30 A 70 70 0 0 1 220 170 L 160 170 Z" fill="#1e293b" stroke="#06b6d4" strokeWidth="3" />
                            <circle cx="296" cy="100" r="6" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
                            <text x="200" y="105" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">NAND</text>
                            <path d="M 302 100 L 370 100" stroke={gateOutput === 1 ? '#22c55e' : '#475569'} strokeWidth={gateOutput === 1 ? 2 + circuitVoltage * 0.4 : 2} fill="none" />
                          </g>
                        )}

                        {selectedGate === 'NOR' && (
                          <g>
                            <path d="M 150 30 Q 200 100 150 170 Q 240 170 280 100 Q 240 30 150 30 Z" fill="#1e293b" stroke="#06b6d4" strokeWidth="3" />
                            <circle cx="286" cy="100" r="6" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
                            <text x="210" y="105" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">NOR</text>
                            <path d="M 292 100 L 370 100" stroke={gateOutput === 1 ? '#22c55e' : '#475569'} strokeWidth={gateOutput === 1 ? 2 + circuitVoltage * 0.4 : 2} fill="none" />
                          </g>
                        )}

                        {selectedGate === 'XOR' && (
                          <g>
                            <path d="M 140 30 Q 190 100 140 170" fill="none" stroke="#06b6d4" strokeWidth="3" />
                            <path d="M 155 30 Q 205 100 155 170 Q 245 170 285 100 Q 245 30 155 30 Z" fill="#1e293b" stroke="#06b6d4" strokeWidth="3" />
                            <text x="215" y="105" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">XOR</text>
                            <path d="M 285 100 L 370 100" stroke={gateOutput === 1 ? '#22c55e' : '#475569'} strokeWidth={gateOutput === 1 ? 2 + circuitVoltage * 0.4 : 2} fill="none" />
                          </g>
                        )}

                        {selectedGate === 'XNOR' && (
                          <g>
                            <path d="M 140 30 Q 190 100 140 170" fill="none" stroke="#06b6d4" strokeWidth="3" />
                            <path d="M 155 30 Q 205 100 155 170 Q 245 170 285 100 Q 245 30 155 30 Z" fill="#1e293b" stroke="#06b6d4" strokeWidth="3" />
                            <circle cx="291" cy="100" r="6" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
                            <text x="215" y="105" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">XNOR</text>
                            <path d="M 297 100 L 370 100" stroke={gateOutput === 1 ? '#22c55e' : '#475569'} strokeWidth={gateOutput === 1 ? 2 + circuitVoltage * 0.4 : 2} fill="none" />
                          </g>
                        )}

                        {/* Output LED Bulb */}
                        <g>
                          <circle cx="395" cy="100" r={16 + circuitVoltage * 0.8} fill={gateOutput === 1 ? '#22c55e' : '#1e293b'} stroke={gateOutput === 1 ? '#86efac' : '#475569'} strokeWidth="3" />
                          {gateOutput === 1 && (
                            <circle cx="395" cy="100" r={24 + circuitVoltage * 1.2} fill="none" stroke="#4ade80" strokeWidth="2" strokeDasharray="4 2" opacity="0.7" />
                          )}
                          <text x="395" y="104" textAnchor="middle" fill={gateOutput === 1 ? '#022c22' : '#94a3b8'} fontSize="11" fontWeight="bold">
                            Y: {gateOutput}
                          </text>
                        </g>
                      </svg>

                      {/* Live Canvas Oscilloscope */}
                      <div className="mt-2">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Real-Time Signal Bus</span>
                        <canvas ref={canvasRef} width={400} height={35} className="w-full rounded-lg bg-slate-900 border border-slate-800" />
                      </div>
                    </div>

                    {/* Live Truth Table & Boolean Form */}
                    <div className="lg:col-span-5 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                          <span>Dynamic Truth Table</span>
                          <span className="text-amber-400 font-bold">
                            {selectedGate === 'AND' && 'Y = A · B'}
                            {selectedGate === 'OR' && 'Y = A + B'}
                            {selectedGate === 'NOT' && 'Y = A\''}
                            {selectedGate === 'NAND' && 'Y = (A · B)\''}
                            {selectedGate === 'NOR' && 'Y = (A + B)\''}
                            {selectedGate === 'XOR' && 'Y = A ⊕ B'}
                            {selectedGate === 'XNOR' && 'Y = A ⊙ B'}
                          </span>
                        </div>

                        <table className="w-full text-xs text-center border-collapse">
                          <thead>
                            <tr className="bg-slate-900 text-gold-300 border-b border-slate-800">
                              <th className="p-2">A</th>
                              {selectedGate !== 'NOT' && <th className="p-2">B</th>}
                              <th className="p-2">Output (Y)</th>
                              <th className="p-2">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedGate === 'NOT' ? (
                              [
                                { a: 0, out: 1 },
                                { a: 1, out: 0 },
                              ].map((row, idx) => {
                                const isCurrent = inputA === row.a;
                                return (
                                  <tr key={idx} className={isCurrent ? 'bg-gold-950/70 text-gold-200 font-bold' : 'text-slate-400'}>
                                    <td className="p-2 border-b border-slate-800/50">{row.a}</td>
                                    <td className="p-2 border-b border-slate-800/50 text-emerald-400 font-mono">{row.out}</td>
                                    <td className="p-2 border-b border-slate-800/50">{isCurrent ? 'Active ⚡' : '-'}</td>
                                  </tr>
                                );
                              })
                            ) : (
                              [
                                {
                                  a: 0,
                                  b: 0,
                                  out:
                                    selectedGate === 'AND'
                                      ? 0
                                      : selectedGate === 'OR'
                                      ? 0
                                      : selectedGate === 'NAND'
                                      ? 1
                                      : selectedGate === 'NOR'
                                      ? 1
                                      : selectedGate === 'XOR'
                                      ? 0
                                      : 1,
                                },
                                {
                                  a: 0,
                                  b: 1,
                                  out:
                                    selectedGate === 'AND'
                                      ? 0
                                      : selectedGate === 'OR'
                                      ? 1
                                      : selectedGate === 'NAND'
                                      ? 1
                                      : selectedGate === 'NOR'
                                      ? 0
                                      : selectedGate === 'XOR'
                                      ? 1
                                      : 0,
                                },
                                {
                                  a: 1,
                                  b: 0,
                                  out:
                                    selectedGate === 'AND'
                                      ? 0
                                      : selectedGate === 'OR'
                                      ? 1
                                      : selectedGate === 'NAND'
                                      ? 1
                                      : selectedGate === 'NOR'
                                      ? 0
                                      : selectedGate === 'XOR'
                                      ? 1
                                      : 0,
                                },
                                {
                                  a: 1,
                                  b: 1,
                                  out:
                                    selectedGate === 'AND'
                                      ? 1
                                      : selectedGate === 'OR'
                                      ? 1
                                      : selectedGate === 'NAND'
                                      ? 0
                                      : selectedGate === 'NOR'
                                      ? 0
                                      : selectedGate === 'XOR'
                                      ? 0
                                      : 1,
                                },
                              ].map((row, idx) => {
                                const isCurrent = inputA === row.a && inputB === row.b;
                                return (
                                  <tr key={idx} className={isCurrent ? 'bg-gold-950/70 text-gold-200 font-bold' : 'text-slate-400'}>
                                    <td className="p-2 border-b border-slate-800/50">{row.a}</td>
                                    <td className="p-2 border-b border-slate-800/50">{row.b}</td>
                                    <td className="p-2 border-b border-slate-800/50 text-emerald-400 font-mono">{row.out}</td>
                                    <td className="p-2 border-b border-slate-800/50">{isCurrent ? 'Active ⚡' : '-'}</td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-3 p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                        <span className="font-bold text-gold-400">ICSE Examiner Tip: </span>
                        {selectedGate === 'AND' && 'Always draw a flat back on the AND gate. Series switches analogy.'}
                        {selectedGate === 'OR' && 'Curved back with pointed nose. Parallel switches analogy.'}
                        {selectedGate === 'NOT' && 'Single input only. The bubble denotes inversion.'}
                        {selectedGate === 'NAND' && 'Universal gate: NOT applied after AND.'}
                        {selectedGate === 'NOR' && 'Universal gate: NOT applied after OR.'}
                        {selectedGate === 'XOR' && 'Outputs 1 ONLY when inputs differ. Powers half-adder SUM bit.'}
                        {selectedGate === 'XNOR' && 'Outputs 1 when inputs MATCH. Acts as equality detector.'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: DE MORGAN'S LAWS & BOOLEAN SIMPLIFIER ── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <h4 className="text-sm font-bold text-gold-300 mb-2">De Morgan Laws Interactive Equivalence</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs font-bold text-amber-400">Law 1: ~(A · B) ≡ ~A + ~B</span>
                        <p className="text-xs text-slate-300 mt-1">Negation of a conjunction equals the disjunction of the negations.</p>
                        <div className="mt-3 flex items-center justify-between text-xs bg-slate-950 p-2 rounded-lg font-mono">
                          <span>A={inputA}, B={inputB}</span>
                          <span className="text-emerald-400">LHS = {!(inputA === 1 && inputB === 1) ? 1 : 0} | RHS = {inputA === 0 || inputB === 0 ? 1 : 0}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs font-bold text-amber-400">Law 2: ~(A + B) ≡ ~A · ~B</span>
                        <p className="text-xs text-slate-300 mt-1">Negation of a disjunction equals the conjunction of the negations.</p>
                        <div className="mt-3 flex items-center justify-between text-xs bg-slate-950 p-2 rounded-lg font-mono">
                          <span>A={inputA}, B={inputB}</span>
                          <span className="text-emerald-400">LHS = {!(inputA === 1 || inputB === 1) ? 1 : 0} | RHS = {inputA === 0 && inputB === 0 ? 1 : 0}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleTogglePinA} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl border border-slate-700">
                        Toggle Variable A (now {inputA})
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleTogglePinB} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl border border-slate-700">
                        Toggle Variable B (now {inputB})
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: ALGORITHM TRACE TABLE & FLOWCHART (SVG DIAGRAM 2) ── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* Real-time loop limit slider */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <label className="text-xs font-semibold text-gold-300 flex items-center gap-2">
                      <span>🔄 Algorithm Iteration Bound (N):</span>
                      <strong className="text-amber-400 font-mono">N = {traceN}</strong>
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="8"
                      value={traceN}
                      onChange={(e) => {
                        setTraceN(Number(e.target.value));
                        handleResetTrace();
                      }}
                      className="w-full md:w-64 accent-gold-400 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* SVG Flowchart Diagram (Diagram 2) */}
                    <div className="md:col-span-6 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                      <span className="text-xs text-slate-400 font-mono self-start mb-2">Algorithm Flowchart (ANSI Standard)</span>
                      <svg viewBox="0 0 280 320" className="w-full max-w-[260px] h-auto">
                        {/* Start Terminator */}
                        <rect x="90" y="10" width="100" height="30" rx="15" fill="#0f766e" stroke="#2dd4bf" strokeWidth="2" />
                        <text x="140" y="30" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">START</text>

                        <line x1="140" y1="40" x2="140" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

                        {/* Input Parallelogram */}
                        <polygon points="80,60 210,60 190,90 60,90" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="135" y="80" textAnchor="middle" fill="#e2e8f0" fontSize="10">INPUT N = {traceN}</text>

                        <line x1="135" y1="90" x2="135" y2="110" stroke="#94a3b8" strokeWidth="2" />

                        {/* Process Box */}
                        <rect x="75" y="110" width="120" height="30" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="135" y="130" textAnchor="middle" fill="#e2e8f0" fontSize="10">sum = 0, k = 1</text>

                        <line x1="135" y1="140" x2="135" y2="160" stroke="#94a3b8" strokeWidth="2" />

                        {/* Decision Diamond */}
                        <polygon
                          points="135,160 210,195 135,230 60,195"
                          fill={traceRunning ? '#701a75' : '#1e293b'}
                          stroke={traceRunning ? '#f472b6' : '#c084fc'}
                          strokeWidth="2"
                        />
                        <text x="135" y="198" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">k &lt;= {traceN} ?</text>

                        {/* Loop Yes Process */}
                        <line x1="135" y1="230" x2="135" y2="250" stroke="#22c55e" strokeWidth="2" />
                        <text x="145" y="242" fill="#4ade80" fontSize="9">Yes</text>
                        <rect x="65" y="250" width="140" height="30" fill="#1e293b" stroke="#4ade80" strokeWidth="2" />
                        <text x="135" y="270" textAnchor="middle" fill="#86efac" fontSize="9">sum += k*k; k++</text>

                        {/* End oval */}
                        <line x1="210" y1="195" x2="245" y2="195" stroke="#f43f5e" strokeWidth="2" />
                        <line x1="245" y1="195" x2="245" y2="300" stroke="#f43f5e" strokeWidth="2" />
                        <line x1="245" y1="300" x2="180" y2="300" stroke="#f43f5e" strokeWidth="2" />
                        <rect x="90" y="290" width="90" height="25" rx="12" fill="#991b1b" stroke="#f87171" strokeWidth="2" />
                        <text x="135" y="306" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">END (sum)</text>
                      </svg>

                      <div className="mt-2 flex gap-2 w-full">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleStartTrace}
                          disabled={traceRunning}
                          className="flex-1 py-1.5 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs"
                        >
                          {traceRunning ? 'Tracing...' : 'Run Auto Trace ▶'}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleResetTrace}
                          className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-xl text-xs"
                        >
                          Reset
                        </motion.button>
                      </div>
                    </div>

                    {/* Live Trace Table */}
                    <div className="md:col-span-6 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <span className="text-xs text-slate-400 font-mono block mb-2">Memory Execution Log (Trace Table)</span>
                        <div className="max-h-[220px] overflow-y-auto">
                          <table className="w-full text-xs text-left">
                            <thead>
                              <tr className="bg-slate-900 text-gold-300 border-b border-slate-800">
                                <th className="p-2">Step</th>
                                <th className="p-2">k</th>
                                <th className="p-2">sum</th>
                                <th className="p-2">Statement Executed</th>
                              </tr>
                            </thead>
                            <tbody>
                              {traceHistory.map((row, i) => (
                                <tr key={i} className="border-b border-slate-800/40 text-slate-300 font-mono">
                                  <td className="p-2 text-gold-400">#{i}</td>
                                  <td className="p-2 text-amber-300">{row.k}</td>
                                  <td className="p-2 text-emerald-400 font-bold">{row.sum}</td>
                                  <td className="p-2 text-slate-400 text-[11px]">{row.line}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="mt-2 p-2 bg-slate-900 rounded-lg text-[11px] text-slate-400">
                        Total Sum calculated for N={traceN}: <strong className="text-emerald-400">{traceHistory[traceHistory.length - 1]?.sum}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 5: JAVA ARCHITECTURE & PIPELINE (SVG DIAGRAM 3) ── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  {/* SVG Java Architecture Ecosystem (Diagram 3) */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-mono block mb-2">Java Architecture Nested Ecosystem (JDK ⊃ JRE ⊃ JVM)</span>
                    <svg viewBox="0 0 600 160" className="w-full h-auto">
                      {/* JDK Outer Box */}
                      <rect x="10" y="10" width="580" height="140" rx="12" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" strokeDasharray="6 3" />
                      <text x="30" y="32" fill="#a5b4fc" fontSize="13" fontWeight="bold">JDK (Java Development Kit) — Includes javac, debugger &amp; tools</text>

                      {/* JRE Middle Box */}
                      <rect x="30" y="45" width="540" height="95" rx="10" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
                      <text x="45" y="65" fill="#7dd3fc" fontSize="12" fontWeight="bold">JRE (Java Runtime Environment)</text>

                      {/* Core Libraries */}
                      <rect x="45" y="75" width="230" height="55" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="160" y="100" textAnchor="middle" fill="#e0f2fe" fontSize="11" fontWeight="bold">Java Class Libraries (APIs)</text>
                      <text x="160" y="118" textAnchor="middle" fill="#94a3b8" fontSize="9">rt.jar, java.lang, java.util</text>

                      {/* JVM Engine Box */}
                      <rect x="290" y="75" width="265" height="55" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                      <text x="422" y="98" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">JVM (Java Virtual Machine)</text>
                      <text x="422" y="116" textAnchor="middle" fill="#6ee7b7" fontSize="9">Classloader + Bytecode Verifier + JIT Compiler</text>
                    </svg>
                  </div>

                  {/* 3-Tier Compilation Sandbox */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Source Code (.java) */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs">
                      <div className="flex items-center justify-between text-slate-400 pb-1 mb-2 border-b border-slate-800">
                        <span>1. Lander.java (Source)</span>
                        <span className="text-gold-400">JDK</span>
                      </div>
                      <pre className="text-slate-300 text-[11px] overflow-x-auto leading-relaxed">{javaSourceCode}</pre>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleCompileJava}
                        className="mt-3 w-full py-1.5 bg-gold-600 hover:bg-gold-500 text-white rounded-lg font-bold text-xs"
                      >
                        Execute `javac Lander.java`
                      </motion.button>
                    </div>

                    {/* Bytecode (.class) */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs">
                      <div className="flex items-center justify-between text-slate-400 pb-1 mb-2 border-b border-slate-800">
                        <span>2. Lander.class (Bytecode)</span>
                        <span className="text-amber-400">Platform-Neutral</span>
                      </div>
                      <pre className="text-amber-300/80 text-[10px] overflow-x-auto h-[100px] bg-slate-900/80 p-2 rounded">
                        {isCompiled ? compiledBytecode : '// Waiting for javac compilation...'}
                      </pre>
                      <div className="mt-3 flex items-center gap-1">
                        <select
                          value={targetPlatform}
                          onChange={(e) => setTargetPlatform(e.target.value as any)}
                          className="bg-slate-900 text-slate-200 text-xs p-1.5 rounded border border-slate-700 w-full"
                        >
                          <option value="Windows x64">Host: Windows x64 JVM</option>
                          <option value="macOS ARM64">Host: Apple Silicon JVM</option>
                          <option value="Linux Server">Host: Linux Cloud JVM</option>
                        </select>
                      </div>
                    </div>

                    {/* JVM Execution */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-slate-400 pb-1 mb-2 border-b border-slate-800">
                          <span>3. JVM Execution</span>
                          <span className="text-emerald-400">Native CPU</span>
                        </div>
                        <pre className="text-emerald-400 text-[10px] h-[80px] bg-black p-2 rounded overflow-x-auto whitespace-pre-wrap">
                          {jvmExecutionOutput || '// Type `java Lander` to launch JVM engine...'}
                        </pre>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleRunJvm}
                        className="mt-3 w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs"
                      >
                        Execute `java Lander`
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ── 'WHAT DO YOU NOTICE?' OBSERVATION QUESTIONS (BRILLIANT PATTERN) ── */}
          <div className="p-5 bg-gradient-to-r from-gold-950/60 via-slate-900 to-emerald-950/60 rounded-2xl border border-gold-700/40 space-y-3">
            <div className="flex items-center gap-2 text-gold-300 text-xs font-bold uppercase tracking-wider">
              <span>👀</span> Guided Visual Observations ('What do you notice?')
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OBSERVATION_QUESTIONS.map((oq, oIdx) => {
                const isAnswered = observationSubmitted[oIdx];
                const selected = observationAnswers[oIdx];
                return (
                  <div key={oq.id} className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-200 mb-2">{oq.question}</p>
                      <div className="space-y-1.5">
                        {oq.observableOptions.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => handleObservationAnswer(oIdx, optIdx)}
                            disabled={isAnswered}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition border ${
                              isAnswered
                                ? optIdx === oq.correctIndex
                                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                                  : optIdx === selected
                                  ? 'bg-rose-950/60 border-rose-600 text-rose-300'
                                  : 'bg-slate-900/40 border-slate-800 text-slate-500'
                                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                            }`}
                          >
                            <span className="text-gold-400 font-mono mr-1.5">{optIdx + 1}.</span>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    {isAnswered && (
                      <p className="mt-2 text-[11px] text-emerald-400 bg-emerald-950/50 p-2 rounded border border-emerald-800/40">
                        ✓ {oq.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              aria-label="Previous Lab"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold border border-slate-700"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-mono">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                aria-label="Next Lab"
                className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-950"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Enter Sandbox"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-bold text-gold-300">🎮 Free Avionics Logic Sandbox</h3>
            <p className="text-slate-400 text-xs md:text-sm mt-1">
              Explore freely without timer or grading. Switch gates, flip voltage inputs, and observe live circuit reactions!
            </p>
          </div>

          <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800">
            <div className="flex flex-wrap gap-2 mb-4">
              {(['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'] as const).map((g) => (
                <motion.button
                  key={g}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelectGate(g)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase border ${
                    selectedGate === g ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {g}
                </motion.button>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-around gap-6 p-4 bg-slate-900 rounded-xl">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleTogglePinA}
                className={`px-5 py-3 rounded-xl font-bold text-sm shadow-md ${
                  inputA === 1 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Input A: {inputA}
              </motion.button>

              {selectedGate !== 'NOT' && (
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleTogglePinB}
                  className={`px-5 py-3 rounded-xl font-bold text-sm shadow-md ${
                    inputB === 1 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Input B: {inputB}
                </motion.button>
              )}

              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-xs uppercase font-mono">Output (Y):</span>
                <span
                  className={`text-2xl font-black px-4 py-1.5 rounded-xl border ${
                    gateOutput === 1
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-lg shadow-emerald-950'
                      : 'bg-slate-900 text-slate-500 border-slate-700'
                  }`}
                >
                  {gateOutput}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white rounded-xl font-bold text-sm shadow-xl"
            >
              I Am Ready for Graded Challenges! 🎯 →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: PROGRESSIVE CHALLENGES (NEP 2020 / CISCE 2026) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gold-400 font-bold uppercase tracking-wider">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-slate-400 font-mono">
                Competency: <strong className="text-amber-300 uppercase">{challenge.competencyLevel}</strong>
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-gold-500 to-purple-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                {challenge.nodeId}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={showNextHint}
                disabled={answerRevealed || showExplanation}
                className="text-xs px-3 py-1 bg-amber-950/80 text-amber-300 border border-amber-600/50 rounded-lg font-bold flex items-center gap-1"
              >
                <span>💡 Hint ({3 - hintCount} left)</span>
              </motion.button>
            </div>

            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">{challenge.question}</h3>

            {/* MCQ Type Options */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015, x: 4 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm font-medium transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700/80 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-gold-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Visual Challenge */}
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
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-lg cursor-grab text-xs font-bold"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  {['box_outer', 'box_middle', 'box_inner', 'box_libs'].map((boxId) => (
                    <div
                      key={boxId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(boxId)}
                      className="p-3 bg-slate-900 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-between"
                    >
                      <span className="text-xs text-slate-400 font-mono">Drop Slot: {boxId.toUpperCase()}</span>
                      <span className="text-xs font-bold text-gold-300 bg-slate-800 px-3 py-1 rounded-md">
                        {droppedLabels[boxId] || '👉 Drag Matching Label Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Validate Label Placements
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Sequential Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, dIdx) => (
                    <motion.div
                      key={dIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(dIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, dIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs md:text-sm font-medium text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="px-2 py-0.5 bg-gold-900/60 text-gold-300 rounded font-mono text-xs">{dIdx + 1}</span>
                      {item}
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Pipeline Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numerical answer..."
                  aria-label="Enter numeric solution"
                  className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-gold-500"
                />
                <span className="text-slate-400 text-xs">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || numericInput === ''}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Check Calculation
                </motion.button>
              </div>
            )}

            {/* Construct Expression Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-gold-300 font-mono text-xs rounded-lg border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[50px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-2.5 py-1 bg-gold-900/80 text-white rounded font-mono text-xs flex items-center gap-1.5"
                    >
                      {part}
                      <button onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))} className="text-rose-400 text-xs">
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click expression tokens above to construct formula</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Simplified Formula
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 bg-slate-950 rounded-2xl border border-gold-800/60 space-y-3">
                <div className="flex items-center gap-2 text-gold-300 font-bold text-xs uppercase tracking-wider">
                  <span>📖</span> Detailed Methodical Solution
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.p key={sIdx} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs md:text-sm text-slate-300 leading-relaxed">
                        <strong className="text-gold-400">{sIdx + 1}.</strong> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-gold-300 text-xs font-bold rounded-lg border border-slate-700"
                  >
                    Show Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-950"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Certification →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION, MOTIVATIONAL FEEDBACK, SPACED REPETITION & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950 via-slate-900 to-gold-950 rounded-3xl border border-gold-800/60 shadow-2xl text-center space-y-3">
            <span className="text-5xl">🎖️</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Avionics Certification Complete!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              Your final score: <strong className="text-gold-300 text-lg">{Math.max(0, 100 - errors * 5)}%</strong> | Difficulty Achieved:{' '}
              <strong className="text-amber-300 uppercase">{difficulty}</strong>
            </p>
          </div>

          {/* MOTIVATIONAL FEEDBACK (Personalised message based strictly on error count) */}
          <div className={`p-4 rounded-2xl border text-sm md:text-base font-bold text-center ${
            errors === 0
              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
              : errors <= 3
              ? 'bg-gold-950/80 border-gold-500 text-gold-300'
              : errors <= 7
              ? 'bg-amber-950/80 border-amber-500 text-amber-300'
              : 'bg-rose-950/80 border-rose-500 text-rose-300'
          }`}>
            {errors === 0 && '🌟 PERFECT SCORE! Flawless logical deduction and engineering precision!'}
            {errors >= 1 && errors <= 3 && '👏 Great work! You demonstrated solid competency in logic gates and Java execution pipelines.'}
            {errors >= 4 && errors <= 7 && '💪 Good effort! With a little more practice on truth tables, you will master this!'}
            {errors >= 8 && '🔥 Do not give up — You WILL get this! Review the core concepts and try again.'}
          </div>

          {/* ── SPACED REPETITION VISIBILITY CARD (VISIBLE MEMORY SCHEDULE) ── */}
          <div className="p-5 bg-gradient-to-r from-amber-950/70 via-slate-900 to-gold-950/70 rounded-2xl border-2 border-amber-500/60 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-300 flex items-center gap-2">
                <span>🧠</span> Active Spaced Repetition (SRS SM-2 Memory Schedule)
              </span>
              <span className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs uppercase rounded-full shadow-md">
                Review in {srsDays} {srsDays === 1 ? 'Day' : 'Days'}
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
              Based on your session error count (<strong className="text-amber-300">{errors} mistakes</strong>), your memory consolidation interval is set to{' '}
              <strong className="text-gold-300 font-bold">
                {errors === 0 ? '7 days (Mastery level: Strong Retention)' : errors <= 3 ? '3 days (Intermediate Reinforcement)' : '1 day (Immediate Remediation)'}
              </strong>.
            </p>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1 font-mono">
              <div className={`p-2 rounded-lg border ${errors === 0 ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold' : 'bg-slate-950/60 border-slate-800 text-slate-500'}`}>
                0 errors: Review in 7 days
              </div>
              <div className={`p-2 rounded-lg border ${errors >= 1 && errors <= 3 ? 'bg-amber-950 border-amber-500 text-amber-300 font-bold' : 'bg-slate-950/60 border-slate-800 text-slate-500'}`}>
                1-3 errors: Review in 3 days
              </div>
              <div className={`p-2 rounded-lg border ${errors >= 4 ? 'bg-rose-950 border-rose-500 text-rose-300 font-bold' : 'bg-slate-950/60 border-slate-800 text-slate-500'}`}>
                4+ errors: Review in 1 day
              </div>
            </div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>💭</span> Key Concept Reflection
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflections.surprising}
                  onChange={(e) => setReflections({ ...reflections, surprising: e.target.value })}
                  placeholder="e.g., How NAND and NOR gates can synthesize every other gate..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflections.explain}
                  onChange={(e) => setReflections({ ...reflections, explain: e.target.value })}
                  placeholder="e.g., An AND gate is like two switches in a row — both need to be closed for current to flow..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflections.realLife}
                  onChange={(e) => setReflections({ ...reflections, realLife: e.target.value })}
                  placeholder="e.g., Designing safety interlocks for ovens, elevators, or autonomous spacecraft..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/50 rounded-2xl border border-rose-800/60 space-y-3">
              <h4 className="text-rose-300 font-bold text-sm">⚠️ Identified Conceptual Gaps & Corrections:</h4>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-semibold">❌ {m.misconception}</p>
                      <p className="text-emerald-300">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Practical Capstone Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>🛰️</span> Real-World Capstone Activity: {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs md:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ol className="space-y-1.5 text-xs text-slate-400 pl-4 list-decimal">
              {REAL_WORLD_ACTIVITY.steps.map((st, sIdx) => (
                <li key={sIdx}>{st}</li>
              ))}
            </ol>
          </div>
        </motion.div>
      )}

      {/* ─── PLATFORM MODALS & PARTICLES ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Stage Cleared!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_ComputerScienceBasicLogicGatesSim;
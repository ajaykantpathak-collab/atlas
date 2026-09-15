'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ICSE CLASS 8 COMPUTER SCIENCE) ────────────────────��───────────
const NODE_C8_CS_011 = 'c8_cs_011';
const NODE_C8_CS_012 = 'c8_cs_012';
const NODE_C8_CS_013 = 'c8_cs_013';
const NODE_C8_CS_014 = 'c8_cs_014';
const NODE_C8_CS_015 = 'c8_cs_015';
const NODE_C8_CS_016 = 'c8_cs_016';
const NODE_C8_CS_017 = 'c8_cs_017';
const NODE_C8_CS_018 = 'c8_cs_018';
const NODE_C8_CS_019 = 'c8_cs_019';
const NODE_C8_CS_020 = 'c8_cs_020';

const ALL_NODE_IDS = [
  NODE_C8_CS_011,
  NODE_C8_CS_012,
  NODE_C8_CS_013,
  NODE_C8_CS_014,
  NODE_C8_CS_015,
  NODE_C8_CS_016,
  NODE_C8_CS_017,
  NODE_C8_CS_018,
  NODE_C8_CS_019,
  NODE_C8_CS_020,
];

// ─── NARRATIVE SCENARIO ────────────────────────────────────────────────────────
const SCENARIO = {
  title: 'ISRO Chandrayaan Trajectory Control System',
  intro: 'You are the Chief Software Architect at ISRO Telemetry, Tracking & Command Network (ISTRAC), Bengaluru. The guidance computer needs robust algorithms, clean flowcharts, and faultless Java control logic for lunar descent trajectory calculations.',
  context: 'A single logic glitch or infinite loop will derail the lander. Master algorithm properties, flowcharts, OOP blueprints in BlueJ, variables, branching gates, and loop accumulators to execute a perfect lunar touchdown.',
};

// ─── BRILLIANT.ORG PREDICTION QUESTIONS (PREDICT-THEN-CHECK PATTERN) ──────────
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If telemetry frequency A = 48 and B = 18 are fed into Euclid’s subtraction GCD algorithm, what will happen in Step 1?',
    options: [
      'A will become 30 (48 - 18) while B remains 18',
      'B will become 30 while A remains 48',
      'Both values will be divided by 2 immediately',
      'The loop terminates instantly',
    ],
    correctIndex: 0,
    explanation: 'Since A (48) > B (18), the algorithm subtracts B from A: new A = 48 - 18 = 30.',
    verifyInstruction: 'Set A = 48 and B = 18 in Lab 1 and click "Next Subtraction Step" to verify that A updates to 30!',
  },
  {
    id: 'pred_2',
    question: 'In an accumulator loop calculating Factorial (5!), what value will the accumulator register hold after exactly 3 iterations (i = 1, 2, 3)?',
    options: [
      '6 (from 1 × 2 × 3)',
      '15 (from 1 + 2 + 3 + 4 + 5)',
      '24 (4!)',
      '120 (5!)',
    ],
    correctIndex: 0,
    explanation: 'The factorial accumulator starts at 1. After i=1 (1), i=2 (1×2=2), and i=3 (2×3=6), the accumulator holds 6.',
    verifyInstruction: 'Switch to Factorial mode in Lab 5 and slide N to 3 to verify the accumulator trace table reaching 6!',
  },
];

// ─── BRILLIANT.ORG OBSERVATION QUESTIONS ('WHAT DO YOU NOTICE?' PATTERN) ───────
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'What do you notice about the GCD subtraction algorithm as you click "Next Subtraction Step" repeatedly?',
    observableOptions: [
      'The difference between numbers shrinks steadily until both registers equal the exact GCD (finiteness satisfied)',
      'The numbers increase without bound in an infinite loop',
      'The smaller number always jumps to zero on the second step',
      'The numbers randomly swap without changing numerical value',
    ],
    correctIndex: 0,
    explanation: 'By repeatedly subtracting the smaller number from the larger, both values converge towards their Greatest Common Divisor in finite steps.',
  },
  {
    id: 'obs_2',
    question: 'What do you observe about the thruster status and mode in the sandbox when altitude drops below 100 km?',
    observableOptions: [
      'Mode switches to TOUCHDOWN and thrusters fire at maximum retro-rocket power',
      'Thrusters switch off completely into idle coasting',
      'The system encounters a null pointer syntax exception',
      'The altitude automatically resets back to 600 km',
    ],
    correctIndex: 0,
    explanation: 'When altitude < 100 km, the else branch triggers: Mode = TOUCHDOWN with maximum retro-rocket thrust.',
  },
];

// ─── DISCOVERY QUESTION ────────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'In Java, an integer variable division `int v = 7 / 2;` runs on the flight telemetry computer. What value is stored in `v`?',
  options: [
    '3.5 — standard mathematical division',
    '3 — fractional decimal is discarded in integer division',
    '4 — rounded up to the nearest integer',
    'Compilation Error — floating results cannot be assigned to int without casting',
  ],
  correctIndex: 1,
  hintAfter: 'Remember! When both operands in Java are integers (`int`), integer division truncates the decimal portion completely without rounding.',
};

// ─── CHALLENGE INTERFACE ───────────────────────────────────────────────────────
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

// ─── 22 CURATED CHALLENGES (NEP 2020 / CISCE 2026 SPECIFICATION) ───────────────
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c8_cs_011)
  {
    id: 'ch_01',
    nodeId: NODE_C8_CS_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which fundamental property of an algorithm dictates that it MUST terminate after a countable, non-infinite number of steps?',
    options: ['Definiteness', 'Finiteness', 'Effectiveness', 'Generality'],
    correctIndex: 1,
    explanation: 'Finiteness requires an algorithm to finish after a finite number of steps without getting stuck in an infinite loop.',
    hints: [
      'Think about words related to "finite" vs "infinite".',
      'The algorithm must reach a stop condition.',
      'Finiteness is the property that prevents infinite execution.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Understanding (c8_cs_012)
  {
    id: 'ch_02',
    nodeId: NODE_C8_CS_012,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Label the flowchart components for the lunar altitude loop controller.',
    dragItems: [
      { label: 'Start / End Oval', targetId: 'fc_start' },
      { label: 'Decision Diamond', targetId: 'fc_decision' },
      { label: 'Process Rectangle', targetId: 'fc_process' },
      { label: 'On-Page Connector', targetId: 'fc_connector' },
    ],
    correctMapping: {
      fc_start: 'Start / End Oval',
      fc_decision: 'Decision Diamond',
      fc_process: 'Process Rectangle',
      fc_connector: 'On-Page Connector',
    },
    explanation: 'Ovals indicate Start/Stop, Rectangles represent computations/assignments, Diamonds are Decision/Loop gates, and small circles are On-Page connectors.',
    hints: [
      'The top and bottom terminal symbols are rounded ovals.',
      'The calculation box is a rectangle; the conditional branching check is a diamond.',
      'The small circular jump point is an on-page connector.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Recall (c8_cs_014)
  {
    id: 'ch_03',
    nodeId: NODE_C8_CS_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who created the Java programming language at Sun Microsystems in 1995?',
    options: ['Dennis Ritchie', 'James Gosling', 'Bjarne Stroustrup', 'Guido van Rossum'],
    correctIndex: 1,
    explanation: 'Java was created by James Gosling and his team at Sun Microsystems, released in 1995 with the philosophy "Write Once, Run Anywhere" (WORA).',
    hints: [
      'The language was named after an Indonesian coffee island.',
      'His first name is James.',
      'James Gosling is recognized as the father of Java.',
    ],
  },
  // 4. Foundation - Understanding (c8_cs_015)
  {
    id: 'ch_04',
    nodeId: NODE_C8_CS_015,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In the BlueJ IDE, what is the visual difference between a Class and an Object?',
    options: [
      'A Class is an orange rectangle in the class diagram; an Object is an icon on the bottom Object Bench after instantiation.',
      'A Class is red; an Object is blue.',
      'Classes exist only in memory; Objects exist on disk.',
      'Classes are methods; Objects are primitive variables.',
    ],
    correctIndex: 0,
    explanation: 'In BlueJ, classes appear as boxes in the class diagram (the blueprint), while instantiated objects appear as red/colored rounded rectangles on the Object Bench.',
    hints: [
      'Look at BlueJ’s two-tier layout: upper diagram vs lower shelf.',
      'The upper area holds blueprints (classes), the lower bench holds real instances.',
      'A class is the rectangle in the diagram; the object sits on the Object Bench.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Foundation - Recall (c8_cs_016)
  {
    id: 'ch_05',
    nodeId: NODE_C8_CS_016,
    type: 'construct',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Assemble the exact signature of the Java program main entry method.',
    availableParts: ['public', 'static', 'void', 'main(String[] args)', 'private', 'int', 'Main(String args)'],
    targetState: 'public static void main(String[] args)',
    validationHint: 'Select the 4 keywords in strict order: access, modifier, return-type, and method-name with argument array.',
    explanation: 'The JVM looks for exactly `public static void main(String[] args)`. Java is case-sensitive, so `Main` or missing brackets will fail.',
    hints: [
      'The first keyword is public, followed by static.',
      'The return type is void (returns nothing).',
      'The method signature is `main(String[] args)`.',
    ],
  },
  // 6. Foundation - Application (c8_cs_017)
  {
    id: 'ch_06',
    nodeId: NODE_C8_CS_017,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'An ISRO sensor reads 38 packets. Packets are distributed in batches of 7. What is the value of `38 % 7` in Java?',
    correctAnswer: 3,
    tolerance: 0,
    unit: 'remainder',
    explanation: '38 % 7 calculates the integer remainder. 7 × 5 = 35, and 38 - 35 = 3.',
    hints: [
      'The % modulo operator computes the remainder after integer division.',
      'Divide 38 by 7: quotient is 5, leftover is 3.',
      '38 - (7 * 5) = 3.',
    ],
    misconceptionIndex: 3,
  },
  // 7. Foundation - Understanding (c8_cs_018)
  {
    id: 'ch_07',
    nodeId: NODE_C8_CS_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What happens if a programmer writes `if (thrust > 100); { fireThruster(); }` with a stray semicolon?',
    options: [
      '`fireThruster()` will ALWAYS execute regardless of `thrust` value.',
      '`fireThruster()` will never execute.',
      'It causes a Java compilation syntax error.',
      'Java automatically removes the semicolon.',
    ],
    correctIndex: 0,
    explanation: 'A semicolon immediately after an `if(...)` creates an empty statement. The block `{ fireThruster(); }` becomes an independent standalone block that always runs.',
    hints: [
      'A lone semicolon is a null statement.',
      'The `if` condition controls only the empty statement.',
      'The braces `{ ... }` follow unconditionally, so the inner command always executes.',
    ],
    misconceptionIndex: 4,
  },
  // 8. Standard - Analysis (c8_cs_011)
  {
    id: 'ch_08',
    nodeId: NODE_C8_CS_011,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Using Aryabhata/Euclid subtraction method, find the GCD of orbital telemetry frequencies A = 48 and B = 18.',
    correctAnswer: 6,
    tolerance: 0,
    unit: 'Hz (GCD)',
    explanation: 'Step 1: 48-18=30, 18. Step 2: 30-18=12, 18. Step 3: 18-12=6, 12. Step 4: 12-6=6, 6. Both equal 6, so GCD is 6.',
    hints: [
      'Repeatedly subtract the smaller number from the larger number.',
      'Pairs: (48,18) -> (30,18) -> (12,18) -> (12,6) -> (6,6).',
      'When both numbers become equal, that number is the GCD (6).',
    ],
  },
  // 9. Standard - Application (c8_cs_011)
  {
    id: 'ch_09',
    nodeId: NODE_C8_CS_011,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Using the formula LCM(A,B) = (A × B) / GCD(A,B), compute the LCM for beacon intervals A = 12 ms and B = 18 ms (where GCD = 6).',
    correctAnswer: 36,
    tolerance: 0,
    unit: 'ms',
    explanation: 'LCM = (12 × 18) / 6 = 216 / 6 = 36 ms.',
    hints: [
      'Multiply 12 and 18 first: 12 × 18 = 216.',
      'Divide 216 by the GCD (6).',
      '216 / 6 = 36.',
    ],
  },
  // 10. Standard - Analysis (c8_cs_013)
  {
    id: 'ch_10',
    nodeId: NODE_C8_CS_013,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the 5 steps of Software Problem-Solving Methodology in the strict engineering order.',
    sortItems: [
      '1. Analyse problem (Identify Inputs & Outputs)',
      '2. Design solution (Algorithm & Flowchart)',
      '3. Code solution (Translate to Java syntax)',
      '4. Test & Debug (Verify normal, boundary, edge cases)',
      '5. Document (Write comments and user manual)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The disciplined order is: Analyse → Design → Code → Test & Debug → Document.',
    hints: [
      'You must understand inputs/outputs (Analyse) before making a blueprint (Design).',
      'Coding comes only after design.',
      'Testing verifies the code; documentation wraps up the project.',
    ],
  },
  // 11. Standard - Application (c8_cs_017)
  {
    id: 'ch_11',
    nodeId: NODE_C8_CS_017,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A telemetry packet code reads `float velocity = 7 / 2;`. What is the actual value stored in `velocity` and why?',
    options: [
      '3.5f — Java automatically converts division to float when assigned to a float variable.',
      '3.0f — 7 and 2 are integer literals, so integer division produces 3 before assignment to float.',
      'Compilation error — type mismatch.',
      '3.75f — binary floating approximation.',
    ],
    correctIndex: 1,
    explanation: 'Because both 7 and 2 are integers, `7 / 2` evaluates to integer `3`. That integer is widened to `3.0f` when assigned. To get 3.5f, write `7.0f / 2`.',
    hints: [
      'Java evaluates the right-hand side expression FIRST before looking at the variable on the left.',
      '7 / 2 evaluates as pure integer division.',
      'Integer 3 is stored into float as 3.0f.',
    ],
    misconceptionIndex: 3,
  },
  // 12. Standard - Analysis (c8_cs_018)
  {
    id: 'ch_12',
    nodeId: NODE_C8_CS_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a `switch-case` construct for rover sensor modes, what happens if the programmer omits the `break;` statement at the end of `case 1:`?',
    options: [
      'Fall-through occurs: execution continues directly into `case 2:` statements without testing condition 2.',
      'Java compiler throws a missing break error.',
      'The switch statement terminates immediately.',
      'The program crashes with a NullPointerException.',
    ],
    correctIndex: 0,
    explanation: 'Without `break;`, execution falls through into the subsequent case blocks until a break is encountered or the switch block ends.',
    hints: [
      'Think of break as an exit gate.',
      'If the gate is missing, execution keeps rolling downwards.',
      'This behavior is known as "fall-through".',
    ],
  },
  // 13. Standard - Application (c8_cs_019)
  {
    id: 'ch_13',
    nodeId: NODE_C8_CS_019,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why is `do-while` classified as a post-test loop while `while` is a pre-test loop?',
    options: [
      '`do-while` tests condition after executing the body, guaranteeing at least one execution; `while` tests before entry.',
      '`do-while` is faster than `while`.',
      '`do-while` can only be used with integers.',
      '`while` loops run backwards; `do-while` loops run forwards.',
    ],
    correctIndex: 0,
    explanation: 'In `do-while`, the body executes first, and the condition is evaluated at the bottom (post-test). In `while`, condition is checked at top (pre-test).',
    hints: [
      'Pre means before; post means after.',
      'Pre-test checks condition at entrance; post-test checks at exit.',
      'A post-test loop always executes its body at least once.',
    ],
  },
  // 14. Standard - Application (c8_cs_020)
  {
    id: 'ch_14',
    nodeId: NODE_C8_CS_020,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'What is the value of 5 factorial (5!) calculated by iterative loop multiplication in Java?',
    correctAnswer: 120,
    tolerance: 0,
    unit: '(5!)',
    explanation: '5! = 1 × 2 × 3 × 4 × 5 = 120. The accumulator starts at 1 and multiplies each counter value.',
    hints: [
      'Multiply integers from 1 to 5: 1 × 2 = 2.',
      '2 × 3 = 6, 6 × 4 = 24.',
      '24 × 5 = 120.',
    ],
  },
  // 15. Standard - Application (c8_cs_020)
  {
    id: 'ch_15',
    nodeId: NODE_C8_CS_020,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the sum of the first 10 natural numbers (1 to 10) accumulated by a Java for loop.',
    correctAnswer: 55,
    tolerance: 0,
    unit: 'sum',
    explanation: 'Sum = 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 = 55 (Formula: 10 × 11 / 2 = 55).',
    hints: [
      'Accumulator starts at 0 and adds counter i from 1 to 10.',
      '1+2+3+4 = 10, +5 = 15, +6 = 21, +7 = 28, +8 = 36, +9 = 45, +10 = 55.',
      'n*(n+1)/2 = 10*11/2 = 55.',
    ],
  },
  // 16. Advanced - Analysis (c8_cs_019)
  {
    id: 'ch_16',
    nodeId: NODE_C8_CS_019,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Trace this Java loop: `int count = 1; for(int i=0; i<4; i++) { count += i; }`. What is the final value of `count`?',
    correctAnswer: 7,
    tolerance: 0,
    unit: 'value',
    explanation: 'Initial count=1. i=0: count=1+0=1. i=1: count=1+1=2. i=2: count=2+2=4. i=3: count=4+3=7. Loop terminates at i=4. Final count = 7.',
    hints: [
      'Trace step by step: i takes values 0, 1, 2, 3.',
      'i=0 -> count=1; i=1 -> count=2; i=2 -> count=4; i=3 -> count=7.',
      'When i reaches 4, loop condition i<4 is false.',
    ],
  },
  // 17. Advanced - Evaluation (c8_cs_020)
  {
    id: 'ch_17',
    nodeId: NODE_C8_CS_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why MUST the accumulator variable `fact` be initialized to 1 for factorial, whereas `sum` is initialized to 0 for sum of numbers?',
    options: [
      '0 is the additive identity (x+0=x), and 1 is the multiplicative identity (x×1=x). Initializing `fact` to 0 would turn all products to 0.',
      'Java requires `fact` to be 1 by language syntax grammar.',
      'Because factorial numbers cannot be even.',
      'Because 0 is not a valid integer in Java loops.',
    ],
    correctIndex: 0,
    explanation: '0 is the neutral element for addition (x + 0 = x), while 1 is the neutral element for multiplication (x * 1 = x). Multiplying any accumulator initialized to 0 results in 0.',
    hints: [
      'What happens if you multiply anything by 0?',
      'Multiplication needs an identity that preserves the multiplier.',
      '1 is the multiplicative identity; 0 is the additive identity.',
    ],
  },
  // 18. Advanced - Analysis (c8_cs_020)
  {
    id: 'ch_18',
    nodeId: NODE_C8_CS_020,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In the Fibonacci series (0, 1, 1, 2, 3, 5, 8, 13, 21...), what is the 7th term (starting count at index 1: T1=0, T2=1)?',
    correctAnswer: 8,
    tolerance: 0,
    unit: 'term',
    explanation: 'Terms: T1=0, T2=1, T3=1, T4=2, T5=3, T6=5, T7=8.',
    hints: [
      'Write terms in sequence: 0, 1, 1, 2, 3, 5, 8...',
      'Count carefully: 1st=0, 2nd=1, 3rd=1, 4th=2, 5th=3, 6th=5, 7th=8.',
      'The 7th term is 8.',
    ],
  },
  // 19. Advanced - Evaluation (c8_cs_014)
  {
    id: 'ch_19',
    nodeId: NODE_C8_CS_014,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How does Java achieve Platform Independence across Windows, Linux, and macOS?',
    options: [
      'The Java compiler compiles source code into intermediate Bytecode (`.class`), which is interpreted or JIT-compiled by the platform-specific JVM on that machine.',
      'Java uses no compiler and runs raw English text.',
      'All operating systems share the exact same binary machine code format.',
      'Java re-downloads OS drivers on every run.',
    ],
    correctIndex: 0,
    explanation: 'Java source (`.java`) is compiled into Bytecode (`.class`). The Java Virtual Machine (JVM) customized for each OS executes this identical Bytecode.',
    hints: [
      'Remember the role of Bytecode and JVM.',
      'The compiler creates universal bytecode.',
      'Each OS has its own JVM to convert bytecode to native machine instructions.',
    ],
  },
  // 20. Advanced - Creativity / Synthesis (c8_cs_018)
  {
    id: 'ch_20',
    nodeId: NODE_C8_CS_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'An ISRO orbital sensor needs to classify altitude `h`: Orbit (>400 km), Mesosphere (100–400 km), Troposphere (<100 km). Which selection construct is logically best?',
    options: [
      'Nested `if - else if - else` ladder',
      '`switch-case` checking float ranges directly',
      'Four independent non-nested `if` statements without else',
      'A `do-while` loop without condition',
    ],
    correctIndex: 0,
    explanation: '`if - else if - else` is designed for continuous range checks. Java `switch` cannot match relational floating ranges like `h > 400`.',
    hints: [
      'Can switch-case evaluate conditions like `h > 400`?',
      'No, switch matches discrete constants.',
      'An `if-else if-else` ladder is optimal for continuous numerical ranges.',
    ],
  },
  // 21. Advanced - Analysis (c8_cs_016)
  {
    id: 'ch_21',
    nodeId: NODE_C8_CS_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A Java file is saved on disk as `LanderTrajectory.java`. What MUST be the name of the public class inside this file?',
    options: [
      'LanderTrajectory (exact matching case)',
      'landertrajectory (lowercase is allowed)',
      'LANDERTRAJECTORY (all caps)',
      'Any name chosen by programmer',
    ],
    correctIndex: 0,
    explanation: 'In Java, the public class name must match the source file name exactly, including uppercase and lowercase letters.',
    hints: [
      'Java is strictly case-sensitive.',
      'The class name and file name must match identically.',
      '`LanderTrajectory.java` requires `class LanderTrajectory`.',
    ],
  },
  // 22. Advanced - Evaluation (c8_cs_019)
  {
    id: 'ch_22',
    nodeId: NODE_C8_CS_019,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Contrast the behavior of `break` versus `continue` inside a lunar telemetry loop.',
    options: [
      '`break` exits the entire loop immediately; `continue` skips only the rest of the current iteration and jumps to the next iteration.',
      '`break` pauses for 1 second; `continue` resumes execution.',
      '`continue` exits the program; `break` restarts the computer.',
      '`break` is for `switch` only; `continue` is for `if` only.',
    ],
    correctIndex: 0,
    explanation: '`break` terminates the surrounding loop completely. `continue` abandons only the remaining statements in current iteration and starts the next iteration.',
    hints: [
      'Break terminates the whole race.',
      'Continue skips one hurdle and stays in the race.',
      'Break exits; continue jumps to next cycle.',
    ],
  },
];

// ─── PROPS INTERFACE ───────────────────────────────────────────────────────────
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

// ─── DEFAULT PROPS ─────────────────────────────────────────────────────────────
const DEFAULT_PROPS: Props = {
  nodeId: 'c8_cs_011',
  title: 'Java Algorithms, Flowcharts & OOP Architecture Lab',
  definition:
    'An algorithm is a finite, step-by-step procedure satisfying finiteness, definiteness, input, output, and effectiveness. In Class 8 ICSE, algorithms transition into visual flowcharts with connectors and loops, then into Object-Oriented Java inside BlueJ, utilizing strongly-typed variables, selection gates, and iterative loop accumulators.',
  eli5: 'Think of coding like directing a space rover: an algorithm is the mission plan, a flowchart is the road map, BlueJ is the engineering workbench, and Java loops are the automated thrusters that keep running until touchdown!',
  misconceptions: [
    {
      misconception: 'Algorithms can run forever without stopping and still be valid.',
      correction: 'An algorithm MUST satisfy Finiteness — it must terminate after a countable number of discrete steps.',
    },
    {
      misconception: 'Flowchart loops can be replaced by drawing 100 duplicate boxes in a line.',
      correction: 'Loops (iteration) controlled by a decision diamond keep diagrams compact, scalable, and valid for any input value N.',
    },
    {
      misconception: 'A Class and an Object in Java/BlueJ are the exact same thing.',
      correction: 'A Class is the blueprint (box on diagram); an Object is a real running instance allocated in memory (icon on the Object Bench).',
    },
    {
      misconception: '7 / 2 in Java evaluates to 3.5 because normal math creates fractions.',
      correction: 'When both operands are `int`, Java performs integer truncation: `7 / 2` evaluates to `3`.',
    },
    {
      misconception: 'A semicolon after `if (condition);` has no effect on execution.',
      correction: 'A semicolon right after `if(...)` creates an empty statement, causing the subsequent code block to execute unconditionally.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What are the 5 properties of an algorithm?', options: ['Finiteness, Definiteness, Input, Output, Effectiveness', 'Speed, Memory, Graphics, Audio, Network', 'Classes, Objects, Methods, Loops, Variables', 'Analyse, Design, Code, Test, Document'], correctIndex: 0 },
    { question: 'What symbol represents a decision or loop condition in a flowchart?', options: ['Diamond', 'Rectangle', 'Oval', 'Parallelogram'], correctIndex: 0 },
    { question: 'What is the intermediate portable code generated by the Java compiler?', options: ['Bytecode (.class)', 'Assembly code', 'Machine binary (.exe)', 'JavaScript'], correctIndex: 0 },
    { question: 'What keyword allocates memory for a new object in Java?', options: ['new', 'create', 'make', 'instance'], correctIndex: 0 },
    { question: 'What is the result of `17 % 5` in Java?', options: ['2', '3', '3.4', '0'], correctIndex: 0 },
    { question: 'Which loop checks its condition AFTER executing its body?', options: ['do-while', 'while', 'for', 'switch'], correctIndex: 0 },
    { question: 'What value should a factorial accumulator start with?', options: ['1', '0', '-1', '2'], correctIndex: 0 },
    { question: 'Which statement skips the current loop iteration and advances to the next?', options: ['continue', 'break', 'return', 'exit'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student understands algorithm properties, flowchart symbols, BlueJ OOP, primitive data types, decision branching, and loop accumulator programs.',
};

// ─── EXPLORATION STEPS (BRILLIANT.ORG LEARN-BY-DOING) ──────────────────────────
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Algorithm Execution & Subtraction GCD Engine',
    instruction: 'Adjust numbers A and B. Step through the subtraction algorithm to watch Euclid & Aryabhata’s GCD method in action.',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_CS_011,
  },
  {
    title: 'Lab 2: Interactive Flowchart Loop Controller',
    instruction: 'Click the "Next Step" button to route control flow through Start -> Process -> Decision Diamond -> Loop Cycle.',
    interactionType: 'click-parts',
    nodeId: NODE_C8_CS_012,
  },
  {
    title: 'Lab 3: Software Engineering 5-Stage Pipeline',
    instruction: 'Click each phase of the Problem-Solving Methodology to inspect inputs, blueprints, testing, and debugging.',
    interactionType: 'click-parts',
    nodeId: NODE_C8_CS_013,
  },
  {
    title: 'Lab 4: BlueJ OOP Workbench & Object Bench',
    instruction: 'Click "Instantiate Object" on the Class Blueprint to allocate a Lander object onto the Object Bench, then fire thrusters.',
    interactionType: 'click-parts',
    nodeId: NODE_C8_CS_015,
  },
  {
    title: 'Lab 5: Java Loop Accumulator (Sum, Factorial & Fibonacci)',
    instruction: 'Switch between Sum, Factorial, and Fibonacci. Drag the N counter slider to watch accumulator registers update in real-time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_CS_020,
  },
];

// ─── REAL WORLD ACTIVITY ──────────────���────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Chandrayaan Flight Code Challenge',
  description: 'Write a numbered Class 8 Java algorithm and draw its flowchart to compute the fuel burn rate for soft landing. The lander starts with 500 kg fuel and burns 15 kg/sec until altitude = 0.',
  steps: [
    'Step 1: Identify Inputs (Initial Fuel = 500, Burn Rate = 15 kg/s) and Output (Time to burnout & final landing speed).',
    'Step 2: Draw the flowchart with a Start oval, loop Decision diamond `fuel > 0 && altitude > 0`, process box `fuel = fuel - 15`, and Stop oval.',
    'Step 3: In BlueJ, create a class `LunarLander` with integer variables and a while loop method `simulateDescent()`.',
    'Step 4: Test with boundary cases (fuel = 0, altitude = 0) and verify that no infinite loop occurs.',
  ],
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export function C8_ComputerScienceAlgorithmsAdvancedPropertiesSim({
  nodeId = DEFAULT_PROPS.nodeId || 'c8_cs_011',
  title = DEFAULT_PROPS.title || 'Java Algorithms & Flowchart Architecture Sim',
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions || [],
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['compsci'] || { name: 'Computer Science', emoji: '💻', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ─── PREDICTION & OBSERVATION INTERACTIVE STATE ──────────────────────────────
  const [predAnswers, setPredAnswers] = useState<Record<string, number>>({});
  const [predSubmitted, setPredSubmitted] = useState<Record<string, boolean>>({});
  const [obsAnswers, setObsAnswers] = useState<Record<string, number>>({});
  const [obsSubmitted, setObsSubmitted] = useState<Record<string, boolean>>({});

  // ─── INTERACTIVE LAB & SIMULATION STATE ───────────────────────────────────────
  // Lab 1: GCD Subtraction state
  const [gcdA, setGcdA] = useState(48);
  const [gcdB, setGcdB] = useState(18);
  const [gcdStep, setGcdStep] = useState(0);
  const [gcdHistory, setGcdHistory] = useState<{ a: number; b: number; action: string }[]>([
    { a: 48, b: 18, action: 'Initial values' },
  ]);

  // Lab 2: Flowchart step animation
  const [fcActiveNode, setFcActiveNode] = useState<'start' | 'init' | 'check' | 'process' | 'output' | 'end'>('start');
  const [fcCounter, setFcCounter] = useState(1);
  const [fcAccumulator, setFcAccumulator] = useState(1);
  const [fcTargetN, setFcTargetN] = useState(4);

  // Lab 3: Problem solving phase
  const [activePsPhase, setActivePsPhase] = useState<number>(0);

  // Lab 4: BlueJ OOP Workbench
  const [landerObjects, setLanderObjects] = useState<{ id: string; name: string; fuel: number; thrust: number }[]>([]);
  const [selectedLanderId, setSelectedLanderId] = useState<string | null>(null);

  // Lab 5 & Sandbox: Program Mode (Sum / Factorial / Fibonacci)
  const [programMode, setProgramMode] = useState<'sum' | 'factorial' | 'fibonacci'>('factorial');
  const [loopN, setLoopN] = useState<number>(5);

  // Interactive slider variables for selection / logic
  const [sensorAltitude, setSensorAltitude] = useState<number>(350);

  // Scoring, Adaptation & SRS
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

  // Drag and Drop / Inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses state
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explanation: '',
    realLife: '',
  });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY DIFFICULTY ─────────────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOTIVATIONAL FEEDBACK CALCULATION ───────────────────────────────────────
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors >= 1 && errors <= 3) return 'Great work!';
    if (errors >= 4 && errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // ─── DERIVED PROGRAM ACCUMULATOR VALUES ───────────────────────────────────────
  const programCalculation = useMemo(() => {
    if (programMode === 'sum') {
      let sum = 0;
      const trace = [];
      for (let i = 1; i <= loopN; i++) {
        sum += i;
        trace.push({ i, val: sum });
      }
      return { result: sum, name: 'Sum (1..N)', formula: `1 + 2 + ... + ${loopN} = ${sum}`, trace };
    } else if (programMode === 'factorial') {
      let fact = 1;
      const trace = [];
      for (let i = 1; i <= loopN; i++) {
        fact *= i;
        trace.push({ i, val: fact });
      }
      return { result: fact, name: 'Factorial (N!)', formula: `1 × 2 × ... × ${loopN} = ${fact}`, trace };
    } else {
      let a = 0,
        b = 1;
      const sequence = [0];
      if (loopN > 1) sequence.push(1);
      for (let i = 2; i < loopN; i++) {
        const c = a + b;
        sequence.push(c);
        a = b;
        b = c;
      }
      return {
        result: sequence[sequence.length - 1] || 0,
        name: 'Fibonacci Series',
        formula: sequence.slice(0, loopN).join(', '),
        trace: sequence.map((val, idx) => ({ i: idx + 1, val })),
      };
    }
  }, [programMode, loopN]);

  // ─── DERIVED SELECTION BRANCH ─────────────────────────────────────────────────
  const selectionStatus = useMemo(() => {
    if (sensorAltitude > 400) {
      return { zone: 'Deep Orbit', color: 'text-indigo-400', thrusterState: 'Idle (Coasting)', code: 'if (alt > 400) Mode = ORBIT;' };
    } else if (sensorAltitude >= 100) {
      return { zone: 'Mesosphere Descent', color: 'text-amber-400', thrusterState: 'Active Pulsing (50% Thrust)', code: 'else if (alt >= 100) Mode = DESCENT;' };
    } else {
      return { zone: 'Terminal Touchdown', color: 'text-emerald-400', thrusterState: 'Retro-Rockets Maximum', code: 'else Mode = TOUCHDOWN;' };
    }
  }, [sensorAltitude]);

  // ─── INITIAL LOAD MASTERY ─────────────────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY ADAPTATION EFFECT ───────────────────────────────────────────
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
    setDifficulty((prev) => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS PARTICLE & 2D ANIMATION ───────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;
    const particles: { x: number; y: number; speed: number; size: number }[] = Array.from({ length: 25 }, () => ({
      x: Math.random() * 320,
      y: Math.random() * 60,
      speed: 0.5 + Math.random() * 1.5,
      size: 1.5 + Math.random() * 2,
    }));

    const render = () => {
      frame++;
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

      // Animated telemetry wave
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 4) {
        const y = canvas.height / 2 + Math.sin((x + frame * 2) * 0.05) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Data bit particles
      particles.forEach((p) => {
        p.x = (p.x + p.speed) % canvas.width;
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Status text
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(`JVM CLOCK: ${(frame * 16).toString(16).toUpperCase()} | BYTECODE STREAM ACTIVE`, 10, 14);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── EXTRACTED USECALLBACK HANDLERS ──────────────────────────────────────────
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
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Excellent deduction! Integer division in Java always truncates decimals.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Java & Algorithms Workbench. Explore each interactive lab!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with loops, selection gates, and BlueJ instantiation.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Mission challenges started. Demonstrate algorithm and Java mastery!');
  }, []);

  const handleGcdStep = useCallback(() => {
    if (gcdA === gcdB) {
      audioManager.play('chime');
      speechManager.speak(`GCD Found! Both numbers are ${gcdA}`);
      return;
    }
    audioManager.play('count');
    if (gcdA > gcdB) {
      const newA = gcdA - gcdB;
      setGcdA(newA);
      setGcdHistory((prev) => [...prev, { a: newA, b: gcdB, action: `A was larger: A = ${gcdA} - ${gcdB} = ${newA}` }]);
    } else {
      const newB = gcdB - gcdA;
      setGcdB(newB);
      setGcdHistory((prev) => [...prev, { a: gcdA, b: newB, action: `B was larger: B = ${gcdB} - ${gcdA} = ${newB}` }]);
    }
    setGcdStep((s) => s + 1);
  }, [gcdA, gcdB]);

  const handleGcdReset = useCallback(() => {
    setGcdA(48);
    setGcdB(18);
    setGcdStep(0);
    setGcdHistory([{ a: 48, b: 18, action: 'Reset to 48 and 18' }]);
    audioManager.play('pop');
  }, []);

  const handleFlowchartStep = useCallback(() => {
    audioManager.play('count');
    if (fcActiveNode === 'start') {
      setFcActiveNode('init');
      setFcCounter(1);
      setFcAccumulator(1);
    } else if (fcActiveNode === 'init') {
      setFcActiveNode('process');
    } else if (fcActiveNode === 'process') {
      const newAcc = fcAccumulator * fcCounter;
      setFcAccumulator(newAcc);
      setFcActiveNode('check');
    } else if (fcActiveNode === 'check') {
      if (fcCounter >= fcTargetN) {
        setFcActiveNode('output');
      } else {
        setFcCounter((c) => c + 1);
        setFcActiveNode('process');
      }
    } else if (fcActiveNode === 'output') {
      setFcActiveNode('end');
      audioManager.play('success');
    } else {
      setFcActiveNode('start');
    }
  }, [fcActiveNode, fcCounter, fcAccumulator, fcTargetN]);

  const handleCreateLanderObject = useCallback(() => {
    audioManager.play('pickup');
    const newLander = {
      id: `lander_${Date.now()}`,
      name: `Vikram_${landerObjects.length + 1}`,
      fuel: 100,
      thrust: 0,
    };
    setLanderObjects((prev) => [...prev, newLander]);
    setSelectedLanderId(newLander.id);
    speechManager.speak(`Instantiated new Object: ${newLander.name} on Object Bench.`);
  }, [landerObjects.length]);

  const handleFireThruster = useCallback((id: string) => {
    audioManager.play('swoop');
    setLanderObjects((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, fuel: Math.max(0, obj.fuel - 15), thrust: Math.min(100, obj.thrust + 25) } : obj))
    );
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Mission accomplished! You have mastered Class 8 ICSE Computer Science.');
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
        isCorrect = (answer as string).trim() === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Brilliant logic.');
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
          speechManager.speak('Let us review the step-by-step logic together.');
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

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isMatch) {
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        if (prev.length === 0 && challenge.sortItems) {
          prev = challenge.sortItems.map((_, i) => i);
        }
        const arr = [...prev];
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ──────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/20"
            aria-label="Computer Science icon"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-indigo-400 font-medium">ICSE Class 8 Computer Science • Chandrayaan Mission Series</p>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${p} phase`}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl capitalize font-bold transition-all ${
                phase === p
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── DISCOVERY PHASE (CURIOSITY HOOK) ───────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 rounded-2xl border border-indigo-700/50 relative overflow-hidden shadow-xl">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
              Mission Context
            </span>
            <h2 className="text-2xl font-bold text-white mt-3">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              ⚡ {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Discovery Challenge</span>
            <h3 className="text-lg font-bold text-white mt-1 mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/60 text-slate-500 border border-slate-800'
                      : 'bg-slate-900 hover:bg-slate-750 text-slate-200 border border-slate-700 hover:border-indigo-500'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                  {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex && (
                    <span className="ml-2 font-bold text-emerald-400" aria-label="Correct answer">✓ Correct</span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-700 flex flex-wrap items-center justify-between gap-4">
                <p className={`text-sm flex items-center gap-1.5 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  <span>{discoveryCorrect ? '✓' : '✗'}</span>
                  <span>{discoveryCorrect ? 'Spot on! Java integer division truncates decimals completely.' : `Hint: ${DISCOVERY_QUESTION.hintAfter}`}</span>
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Enter Algorithm and Java Labs"
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Enter Algorithm & Java Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── EXPLORE PHASE (BRILLIANT.ORG INTERACTIVE LABS) ──────────────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Guided Exploration</span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full font-mono">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
          </div>

          <p className="text-sm text-amber-300 bg-amber-950/30 border border-amber-800/50 p-3 rounded-xl flex items-center gap-2">
            <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* ─── BRILLIANT.ORG PREDICTION PROMPT (PREDICT-THEN-CHECK) ─────────── */}
          {currentSlide < PREDICTION_QUESTIONS.length && (
            <div className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-500/40 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🔮</span>
                <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  Predict First (Brilliant.org Check)
                </h3>
              </div>
              <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[currentSlide].question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PREDICTION_QUESTIONS[currentSlide].options.map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => {
                      setPredAnswers((prev) => ({ ...prev, [PREDICTION_QUESTIONS[currentSlide].id]: optIdx }));
                      setPredSubmitted((prev) => ({ ...prev, [PREDICTION_QUESTIONS[currentSlide].id]: true }));
                      audioManager.play(optIdx === PREDICTION_QUESTIONS[currentSlide].correctIndex ? 'success' : 'pop');
                    }}
                    className={`p-2.5 rounded-xl text-left text-xs font-medium transition-all ${
                      predSubmitted[PREDICTION_QUESTIONS[currentSlide].id]
                        ? optIdx === PREDICTION_QUESTIONS[currentSlide].correctIndex
                          ? 'bg-emerald-900/70 border border-emerald-500 text-emerald-200 font-bold'
                          : predAnswers[PREDICTION_QUESTIONS[currentSlide].id] === optIdx
                          ? 'bg-rose-900/60 border border-rose-500 text-rose-200'
                          : 'bg-slate-900/60 text-slate-500 border border-slate-800'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-1 text-indigo-400">{String.fromCharCode(65 + optIdx)}.</span> {opt}
                  </button>
                ))}
              </div>
              {predSubmitted[PREDICTION_QUESTIONS[currentSlide].id] && (
                <p className="text-xs text-cyan-300 bg-cyan-950/40 p-2.5 rounded-lg border border-cyan-800/40 font-mono">
                  🔍 <span className="font-bold">How to verify:</span> {PREDICTION_QUESTIONS[currentSlide].verifyInstruction}
                </p>
              )}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 min-h-[380px]"
            >
              {/* SLIDE 0: ARYABHATA / EUCLID SUBTRACTION GCD TRACER WITH SVG 1 */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {/* SVG DIAGRAM 1: GCD Subtraction Architecture */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 500 130" className="w-full max-w-[480px] h-auto" aria-label="Aryabhata Euclidean GCD Subtraction Algorithm Flow Diagram">
                      <defs>
                        <linearGradient id="gradA" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#4338ca" />
                        </linearGradient>
                        <linearGradient id="gradB" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#0e7490" />
                        </linearGradient>
                        <marker id="arrowHead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                          <polygon points="0 0, 8 4, 0 8" fill="#94a3b8" />
                        </marker>
                      </defs>
                      <rect x="15" y="20" width="120" height="40" rx="8" fill="url(#gradA)" stroke="#818cf8" strokeWidth="1.5" />
                      <text x="75" y="45" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Register A: {gcdA}</text>

                      <rect x="15" y="70" width="120" height="40" rx="8" fill="url(#gradB)" stroke="#22d3ee" strokeWidth="1.5" />
                      <text x="75" y="95" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Register B: {gcdB}</text>

                      <line x1="135" y1="40" x2="195" y2="55" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowHead)" />
                      <line x1="135" y1="90" x2="195" y2="75" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowHead)" />

                      <polygon points="250,30 310,65 250,100 190,65" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                      <text x="250" y="62" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">A == B ?</text>
                      <text x="250" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">Compare</text>

                      <line x1="310" y1="65" x2="375" y2="65" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowHead)" />
                      <text x="340" y="58" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">✓ Yes</text>

                      <rect x="380" y="42" width="105" height="46" rx="8" fill="#065f46" stroke="#10b981" strokeWidth="2" />
                      <text x="432" y="62" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">GCD = {gcdA}</text>
                      <text x="432" y="78" textAnchor="middle" fill="#a7f3d0" fontSize="8">✓ Finiteness Reached</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <label htmlFor="input-gcd-a" className="text-xs text-slate-400 block mb-1">Frequency A (Input 1): {gcdA}</label>
                      <input
                        id="input-gcd-a"
                        aria-label="Set Frequency A input value"
                        type="range"
                        min={6}
                        max={72}
                        step={6}
                        value={gcdA}
                        disabled={gcdStep > 0}
                        onChange={(e) => {
                          setGcdA(Number(e.target.value));
                          setGcdHistory([{ a: Number(e.target.value), b: gcdB, action: 'Updated A' }]);
                        }}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <label htmlFor="input-gcd-b" className="text-xs text-slate-400 block mb-1">Frequency B (Input 2): {gcdB}</label>
                      <input
                        id="input-gcd-b"
                        aria-label="Set Frequency B input value"
                        type="range"
                        min={6}
                        max={72}
                        step={6}
                        value={gcdB}
                        disabled={gcdStep > 0}
                        onChange={(e) => {
                          setGcdB(Number(e.target.value));
                          setGcdHistory([{ a: gcdA, b: Number(e.target.value), action: 'Updated B' }]);
                        }}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                    <div className="flex gap-2 items-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Execute Next Subtraction Step"
                        onClick={handleGcdStep}
                        disabled={gcdA === gcdB}
                        className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm ${
                          gcdA === gcdB ? 'bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        }`}
                      >
                        {gcdA === gcdB ? `✓ GCD = ${gcdA}` : 'Next Subtraction Step →'}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Reset GCD registers"
                        onClick={handleGcdReset}
                        className="py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-sm font-bold"
                      >
                        Reset
                      </motion.button>
                    </div>
                  </div>

                  {/* Step Execution Log */}
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 max-h-36 overflow-y-auto font-mono text-xs text-slate-300 space-y-1">
                    <p className="text-slate-500 font-bold">Execution Trace (Finiteness in action):</p>
                    {gcdHistory.map((h, idx) => (
                      <p key={idx} className="text-indigo-300">
                        [{idx}] A={h.a}, B={h.b} ➔ {h.action}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 1: INTERACTIVE FLOWCHART ENGINE WITH SVG 2 */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="flex flex-col items-center gap-3 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                    {/* SVG DIAGRAM 2: Interactive Flowchart */}
                    <svg viewBox="0 0 300 320" className="w-full max-w-[280px]" aria-label="Interactive Factorial Flowchart Diagram">
                      <defs>
                        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                          <polygon points="0 0, 6 3, 0 6" fill="#64748b" />
                        </marker>
                      </defs>
                      {/* Start Oval */}
                      <rect
                        x="90"
                        y="10"
                        width="120"
                        height="32"
                        rx="16"
                        fill={fcActiveNode === 'start' ? '#4f46e5' : '#1e293b'}
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <text x="150" y="30" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                        Start
                      </text>

                      <line x1="150" y1="42" x2="150" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

                      {/* Init Rectangle */}
                      <rect
                        x="75"
                        y="60"
                        width="150"
                        height="32"
                        rx="4"
                        fill={fcActiveNode === 'init' ? '#0284c7' : '#1e293b'}
                        stroke="#38bdf8"
                        strokeWidth="2"
                      />
                      <text x="150" y="80" textAnchor="middle" fill="white" fontSize="10">
                        c = 1, f = 1
                      </text>

                      <line x1="150" y1="92" x2="150" y2="110" stroke="#64748b" strokeWidth="2" />

                      {/* Process Rectangle */}
                      <rect
                        x="75"
                        y="110"
                        width="150"
                        height="32"
                        rx="4"
                        fill={fcActiveNode === 'process' ? '#059669' : '#1e293b'}
                        stroke="#10b981"
                        strokeWidth="2"
                      />
                      <text x="150" y="130" textAnchor="middle" fill="white" fontSize="10">
                        f = f * c; c = c + 1
                      </text>

                      <line x1="150" y1="142" x2="150" y2="160" stroke="#64748b" strokeWidth="2" />

                      {/* Decision Diamond */}
                      <polygon
                        points="150,160 215,190 150,220 85,190"
                        fill={fcActiveNode === 'check' ? '#d97706' : '#1e293b'}
                        stroke="#f59e0b"
                        strokeWidth="2"
                      />
                      <text x="150" y="194" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                        c &gt; {fcTargetN}?
                      </text>

                      {/* Loop Back Line (No branch) */}
                      <path d="M 85,190 L 40,190 L 40,126 L 75,126" fill="none" stroke="#f59e0b" strokeWidth="2" />
                      <text x="55" y="180" fill="#fbbf24" fontSize="9">
                        ✗ No
                      </text>

                      {/* Line to Output (Yes branch) */}
                      <line x1="150" y1="220" x2="150" y2="245" stroke="#10b981" strokeWidth="2" />
                      <text x="160" y="235" fill="#34d399" fontSize="9">
                        ✓ Yes
                      </text>

                      {/* Output Parallelogram */}
                      <polygon
                        points="80,245 220,245 200,275 60,275"
                        fill={fcActiveNode === 'output' ? '#8b5cf6' : '#1e293b'}
                        stroke="#a855f7"
                        strokeWidth="2"
                      />
                      <text x="140" y="264" textAnchor="middle" fill="white" fontSize="10">
                        Print f ({fcAccumulator})
                      </text>

                      {/* End Oval */}
                      <rect
                        x="90"
                        y="285"
                        width="120"
                        height="28"
                        rx="14"
                        fill={fcActiveNode === 'end' ? '#e11d48' : '#1e293b'}
                        stroke="#f43f5e"
                        strokeWidth="2"
                      />
                      <text x="150" y="303" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                        End
                      </text>
                    </svg>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-xs text-slate-400">Target Factorial (N): {fcTargetN}</p>
                      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-400 block">Counter (c):</span>
                          <span className="text-xl font-bold text-cyan-400">{fcCounter}</span>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-400 block">Accumulator (f):</span>
                          <span className="text-xl font-bold text-emerald-400">{fcAccumulator}</span>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label="Advance flowchart execution step"
                      onClick={handleFlowchartStep}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30"
                    >
                      Step Flowchart Execution ➔
                    </motion.button>
                  </div>
                </div>
              )}

              {/* SLIDE 2: 5-STEP PROBLEM SOLVING PIPELINE WITH SVG 3 */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* SVG DIAGRAM 3: 5-Phase Problem Solving Architecture */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 520 80" className="w-full max-w-[500px] h-auto" aria-label="5-Stage Software Problem Solving Lifecycle Diagram">
                      <defs>
                        <marker id="pipeArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                          <polygon points="0 0, 6 3, 0 6" fill="#6366f1" />
                        </marker>
                      </defs>
                      {['1. Analyse', '2. Design', '3. Code', '4. Test', '5. Document'].map((label, i) => {
                        const isCurrent = activePsPhase === i;
                        const fillCol = isCurrent ? '#4f46e5' : '#1e293b';
                        const strokeCol = isCurrent ? '#818cf8' : '#475569';
                        const x = 10 + i * 102;
                        return (
                          <g key={i}>
                            <rect x={x} y="15" width="90" height="48" rx="8" fill={fillCol} stroke={strokeCol} strokeWidth={isCurrent ? 2 : 1} />
                            <text x={x + 45} y="44" textAnchor="middle" fill={isCurrent ? '#ffffff' : '#94a3b8'} fontSize="10" fontWeight="bold">
                              {label}
                            </text>
                            {i < 4 && (
                              <line x1={x + 90} y1="39" x2={x + 102} y2="39" stroke="#6366f1" strokeWidth="2" markerEnd="url(#pipeArrow)" />
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {['1. Analyse', '2. Design', '3. Code', '4. Test', '5. Document'].map((stepName, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Select phase ${stepName}`}
                        onClick={() => {
                          setActivePsPhase(idx);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl text-xs font-bold transition-all text-center ${
                          activePsPhase === idx
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                            : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                        }`}
                      >
                        {stepName}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    {activePsPhase === 0 && (
                      <div>
                        <h4 className="text-base font-bold text-indigo-300">Phase 1: Analyse</h4>
                        <p className="text-sm text-slate-300 mt-1">
                          Carefully determine inputs, preconditions, and required output formats. (e.g., Input: Fuel Mass in kg, Output: Thrust Duration).
                        </p>
                      </div>
                    )}
                    {activePsPhase === 1 && (
                      <div>
                        <h4 className="text-base font-bold text-cyan-300">Phase 2: Design</h4>
                        <p className="text-sm text-slate-300 mt-1">
                          Draft numbered algorithm steps and construct formal flowcharts before touching any programming language syntax.
                        </p>
                      </div>
                    )}
                    {activePsPhase === 2 && (
                      <div>
                        <h4 className="text-base font-bold text-emerald-300">Phase 3: Code</h4>
                        <p className="text-sm text-slate-300 mt-1">
                          Translate the design blueprint into Java code inside BlueJ, declaring correct primitive data types (`int`, `float`, `boolean`).
                        </p>
                      </div>
                    )}
                    {activePsPhase === 3 && (
                      <div>
                        <h4 className="text-base font-bold text-amber-300">Phase 4: Test & Debug</h4>
                        <p className="text-sm text-slate-300 mt-1">
                          Execute code with normal, boundary, and extreme test inputs. Trace logic with breakpoints to isolate and fix defects.
                        </p>
                      </div>
                    )}
                    {activePsPhase === 4 && (
                      <div>
                        <h4 className="text-base font-bold text-rose-300">Phase 5: Document</h4>
                        <p className="text-sm text-slate-300 mt-1">
                          Add documentation comments (`//` and `/* ... */`), user manuals, and variable descriptions so future engineers can maintain it.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 3: BLUEJ OOP WORKBENCH */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Class Diagram Box */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-indigo-500/40 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-400">Class Diagram Blueprint</span>
                        <span className="text-xs px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded font-mono">LunarLander.class</span>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                        <p className="text-purple-400">class LunarLander &#123;</p>
                        <p className="text-slate-400 pl-4">int fuel = 100;</p>
                        <p className="text-slate-400 pl-4">int thrust = 0;</p>
                        <p className="text-cyan-400 pl-4">void fireThruster() &#123; ... &#125;</p>
                        <p className="text-purple-400">&#125;</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        aria-label="Instantiate new LunarLander object"
                        onClick={handleCreateLanderObject}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30"
                      >
                        + new LunarLander() (Instantiate on Object Bench)
                      </motion.button>
                    </div>

                    {/* Object Bench Area */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-slate-400">BlueJ Object Bench (Running Instances)</span>
                      <div className="min-h-[140px] flex flex-wrap gap-2 items-start p-2 bg-slate-900 rounded-lg border border-slate-800">
                        {landerObjects.map((lander) => (
                          <motion.div
                            key={lander.id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            role="button"
                            tabIndex={0}
                            aria-label={`Lunar Lander instance ${lander.name}`}
                            className={`p-3 rounded-xl border text-xs space-y-2 cursor-pointer transition-all ${
                              selectedLanderId === lander.id
                                ? 'bg-indigo-950/80 border-indigo-500 text-white'
                                : 'bg-slate-800 border-slate-700 text-slate-300'
                            }`}
                            onClick={() => setSelectedLanderId(lander.id)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') setSelectedLanderId(lander.id);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-400" />
                              <span className="font-bold font-mono">{lander.name}</span>
                            </div>
                            <p className="text-slate-400 font-mono">Fuel: {lander.fuel}%</p>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              aria-label={`Fire thruster on ${lander.name}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFireThruster(lander.id);
                              }}
                              className="px-2 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded font-bold text-[10px]"
                            >
                              fireThruster()
                            </motion.button>
                          </motion.div>
                        ))}
                        {landerObjects.length === 0 && (
                          <p className="text-xs text-slate-500 self-center mx-auto">No objects instantiated yet. Click &quot;new LunarLander()&quot;!</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: ACCUMULATOR LAB */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(['sum', 'factorial', 'fibonacci'] as const).map((mode) => (
                      <motion.button
                        key={mode}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Switch to ${mode} mode`}
                        onClick={() => {
                          setProgramMode(mode);
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                          programMode === mode
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                            : 'bg-slate-950 text-slate-400 border border-slate-800'
                        }`}
                      >
                        {mode} Loop
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Iterations (N): {loopN}</span>
                      <span className="text-indigo-400 font-mono font-bold">{programCalculation.formula}</span>
                    </div>
                    <input
                      aria-label="Set Iterations N slider"
                      type="range"
                      min={1}
                      max={8}
                      value={loopN}
                      onChange={(e) => {
                        setLoopN(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-indigo-500"
                    />

                    {/* Step-by-step trace chart */}
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 pt-2">
                      {programCalculation.trace.map((item, idx) => (
                        <div key={idx} className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-center font-mono">
                          <span className="text-[10px] text-slate-500 block">i = {item.i}</span>
                          <span className="text-xs font-bold text-emerald-400">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Go to Previous Lab"
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-sm font-bold"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Go to Next Lab"
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('tap');
                }}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open Free Sandbox mode"
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30"
              >
                Open Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── SANDBOX PHASE (FREE PLAY / NO GRADING) ��───────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Interactive Java Sandbox</h3>
              <p className="text-xs text-slate-400">Manipulate altitude and loop counters freely. Real-time selection logic & canvas telemetry update instantly.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Proceed to Mission Challenges"
              onClick={handleAdvanceToChallenge}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          {/* ─── BRILLIANT.ORG OBSERVATION QUESTIONS ('WHAT DO YOU NOTICE?') ──── */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-cyan-500/30 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">👁️</span>
              <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                Guided Observation (Brilliant.org Check)
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OBSERVATION_QUESTIONS.map((obsQ, qIdx) => (
                <div key={obsQ.id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2.5">
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                    Observation #{qIdx + 1}
                  </span>
                  <p className="text-xs font-medium text-slate-200">{obsQ.question}</p>
                  <div className="space-y-1.5">
                    {obsQ.observableOptions.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => {
                          setObsAnswers((prev) => ({ ...prev, [obsQ.id]: optIdx }));
                          setObsSubmitted((prev) => ({ ...prev, [obsQ.id]: true }));
                          audioManager.play(optIdx === obsQ.correctIndex ? 'success' : 'pop');
                        }}
                        className={`w-full text-left p-2 rounded-lg text-xs transition-all ${
                          obsSubmitted[obsQ.id]
                            ? optIdx === obsQ.correctIndex
                              ? 'bg-emerald-900/60 border border-emerald-500 text-emerald-200 font-bold'
                              : obsAnswers[obsQ.id] === optIdx
                              ? 'bg-rose-900/50 border border-rose-500 text-rose-200'
                              : 'bg-slate-950 text-slate-500 border border-slate-800'
                            : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                        }`}
                      >
                        <span className="font-bold mr-1 text-cyan-400">{String.fromCharCode(65 + optIdx)}.</span> {opt}
                      </button>
                    ))}
                  </div>
                  {obsSubmitted[obsQ.id] && (
                    <p className="text-[11px] text-emerald-300 bg-emerald-950/40 p-2 rounded border border-emerald-800/40">
                      ✓ {obsQ.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Canvas Wave Animation */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <canvas ref={canvasRef} width={600} height={60} className="w-full" aria-label="JVM Execution and Bytecode Telemetry Wave Visualizer" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Selection Gate Controller */}
            <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-4">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Selection Logic Gate (`if - else if - else`)</span>
              <div>
                <label htmlFor="sensor-alt" className="text-xs text-slate-400 block mb-1">Spacecraft Altitude: {sensorAltitude} km</label>
                <input
                  id="sensor-alt"
                  aria-label="Adjust spacecraft altitude slider"
                  type="range"
                  min={10}
                  max={600}
                  value={sensorAltitude}
                  onChange={(e) => {
                    setSensorAltitude(Number(e.target.value));
                    audioManager.play('count');
                  }}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Active Zone:</span>
                  <span className={`font-bold font-mono ${selectionStatus.color}`}>{selectionStatus.zone}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Thruster Status:</span>
                  <span className="font-mono text-white">{selectionStatus.thrusterState}</span>
                </div>
                <div className="mt-2 p-2 bg-slate-900 rounded font-mono text-[11px] text-cyan-300 border border-slate-800">
                  {selectionStatus.code}
                </div>
              </div>
            </div>

            {/* Loop Accumulator Workbench */}
            <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Iterative Accumulator Register</span>
              <div className="flex gap-2">
                {(['sum', 'factorial', 'fibonacci'] as const).map((m) => (
                  <button
                    key={m}
                    aria-label={`Select ${m} mode`}
                    onClick={() => setProgramMode(m)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize ${
                      programMode === m ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400">Computed Output:</span>
                <p className="text-2xl font-black text-emerald-400 font-mono">{programCalculation.result}</p>
                <p className="text-xs text-slate-500 font-mono">{programCalculation.formula}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── CHALLENGE PHASE ────────────────────────────────────────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress & Adaptive Difficulty Badge */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-indigo-400 font-mono font-bold">
                QUESTION {currentChallenge + 1} OF {filteredChallenges.length}
              </span>
              <span className="text-xs text-slate-500 ml-2">[{challenge.competencyLevel.toUpperCase()}]</span>
            </div>
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                difficulty === 'foundation'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : difficulty === 'standard'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}
            >
              {difficulty} TIER
            </motion.span>
          </div>

          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'bg-slate-800/90 border-slate-700'
            }`}
          >
            <h3 className="text-base sm:text-lg font-bold text-white mb-6 leading-relaxed">{challenge.question}</h3>

            {/* TYPE 1: MCQ (classify / distinguish / match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      onClick={() => handleAnswer(idx)}
                      disabled={showExplanation || answerRevealed}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                        showExplanation && idx === challenge.correctIndex
                          ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900 hover:bg-slate-750 text-slate-200 border border-slate-700 hover:border-indigo-500'
                      }`}
                    >
                      <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + idx)}.</span> {opt}
                      {showExplanation && idx === challenge.correctIndex && (
                        <span className="ml-2 font-bold text-emerald-400" aria-label="Correct answer">✓</span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* TYPE 2: DRAG-LABEL (Flowchart / Architecture) */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable flowchart label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map((targetId) => (
                    <div
                      key={targetId}
                      role="region"
                      aria-label={`Drop target zone for ${targetId}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px]"
                    >
                      <span className="text-[11px] text-slate-500 mb-1 font-mono uppercase">{targetId}</span>
                      <span className="text-sm font-bold text-cyan-300">
                        {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : 'Drop Symbol Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Verify Diagram Labels"
                  onClick={() => handleAnswer(droppedLabels)}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {/* TYPE 3: DRAG-SORT */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Step ${displayIdx + 1}: ${item}. Drag to reorder.`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-900 rounded-xl border border-slate-700 text-sm font-mono text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-lg bg-indigo-600/30 text-indigo-300 flex items-center justify-center text-xs font-bold">
                      {displayIdx + 1}
                    </span>
                    {item}
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Check Pipeline Sequence"
                  onClick={handleSortSubmit}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30"
                >
                  Check Pipeline Sequence
                </motion.button>
              </div>
            )}

            {/* TYPE 4: NUMERIC INPUT */}
            {challenge.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3">
                <input
                  aria-label="Numeric answer input"
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric result"
                  className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500 flex-1"
                />
                <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Submit numeric value"
                  onClick={() => handleAnswer(numericInput)}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-600/30"
                >
                  Submit Value
                </motion.button>
              </div>
            )}

            {/* TYPE 5: CONSTRUCT SIGNATURE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Add keyword ${part}`}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 rounded-lg text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-indigo-600 text-white text-xs font-mono rounded-lg flex items-center gap-1.5"
                    >
                      {p}
                      <button
                        aria-label={`Remove keyword ${p}`}
                        onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-indigo-200 hover:text-white"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click keywords above to construct the signature</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Verify Method Signature"
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30"
                >
                  Verify Method Signature
                </motion.button>
              </div>
            )}
          </div>

          {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-600/50 rounded-2xl space-y-4"
            >
              <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">Step-by-Step Logic Breakdown:</h4>
              <div className="space-y-2">
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-slate-300 leading-relaxed font-mono"
                    >
                      <span className="text-amber-400 font-bold">{idx + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
              </div>

              {revealedSteps <
                challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Reveal Next Explanation Step"
                  onClick={() => setRevealedSteps((s) => s + 1)}
                  className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                >
                  Reveal Next Explanation Step →
                </motion.button>
              )}

              {revealedSteps >=
                challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Advance to Next Challenge"
                  onClick={handleNextChallenge}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30"
                >
                  {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission Assessment →' : 'Next Challenge →'}
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── COMPLETION PHASE ────────────────────────────────────────────────── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-3xl border border-indigo-500/40 text-center space-y-4 shadow-2xl">
            <span className="text-5xl block">🚀</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Mission Success: Software Verified!</h2>
            
            {/* MOTIVATIONAL FEEDBACK BANNER */}
            <div className="inline-block px-5 py-2 rounded-2xl bg-gradient-to-r from-amber-500/20 via-indigo-500/20 to-emerald-500/20 border border-amber-400/40">
              <span className="text-lg font-black text-amber-300 tracking-wide uppercase">
                {motivationalMessage}
              </span>
            </div>

            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              Your algorithms, flowcharts, BlueJ architecture, and Java accumulator loops successfully powered the Chandrayaan simulation.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto pt-4">
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Mastery Tier</span>
                <span className="text-2xl font-black text-indigo-400 capitalize">{masteryLevel}</span>
              </div>
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-xs text-slate-400 block">Review Due</span>
                <span className="text-2xl font-black text-amber-400">{errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}</span>
              </div>
            </div>
          </div>

          {/* ─── SPACED REPETITION (SRS) VISIBILITY BANNER ────────────────────── */}
          <div className="p-6 bg-gradient-to-r from-indigo-950/80 to-purple-950/80 rounded-2xl border border-indigo-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧠</span>
                <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">Spaced Repetition Schedule (SRS)</h3>
              </div>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-mono font-bold border border-indigo-500/30">
                SM-2 Adaptive Engine
              </span>
            </div>
            <p className="text-xs text-slate-300">
              To lock these algorithm and Java concepts into long-term memory, review this topic according to your spaced interval:
            </p>
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Optimal Review Schedule:</span>
                <span className="text-base sm:text-lg font-black text-amber-300 font-mono">
                  {errors === 0
                    ? '📅 Review in 7 days (0 errors — Strong Retention)'
                    : errors <= 3
                    ? '📅 Review in 3 days (1-3 errors — Reinforce Concepts)'
                    : '📅 Review in 1 day (4+ errors — High Priority Review)'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Performance Summary:</span>
                <span className="text-xs font-bold text-slate-200">
                  {errors === 0 ? '0 errors logged' : `${errors} logic errors to review`}
                </span>
              </div>
            </div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-indigo-300">Mission Debrief & Reflection</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="ref-surprising" className="text-xs font-bold text-amber-300 block">
                  What was the most surprising thing you learned?
                </label>
                <textarea
                  id="ref-surprising"
                  aria-label="What was the most surprising thing you learned?"
                  value={reflectionAnswers.surprising}
                  onChange={(e) => setReflectionAnswers((prev) => ({ ...prev, surprising: e.target.value }))}
                  placeholder="Type your reflection..."
                  className="w-full h-24 p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 resize-none focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="ref-explanation" className="text-xs font-bold text-cyan-300 block">
                  How would you explain this to a friend?
                </label>
                <textarea
                  id="ref-explanation"
                  aria-label="How would you explain this to a friend?"
                  value={reflectionAnswers.explanation}
                  onChange={(e) => setReflectionAnswers((prev) => ({ ...prev, explanation: e.target.value }))}
                  placeholder="Type your explanation..."
                  className="w-full h-24 p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 resize-none focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="ref-reallife" className="text-xs font-bold text-emerald-300 block">
                  Where in real life might you use this?
                </label>
                <textarea
                  id="ref-reallife"
                  aria-label="Where in real life might you use this?"
                  value={reflectionAnswers.realLife}
                  onChange={(e) => setReflectionAnswers((prev) => ({ ...prev, realLife: e.target.value }))}
                  placeholder="Type real world applications..."
                  className="w-full h-24 p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 resize-none focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* MISCONCEPTION REVIEW PROFILE */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 border border-rose-800/60 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">Your Remediation Profile:</h3>
              {hitMisconceptions.map((mIdx) => {
                const item = misconceptions[mIdx];
                if (!item) return null;
                return (
                  <div key={mIdx} className="p-3 bg-slate-900/80 rounded-xl border border-rose-900/40 text-xs space-y-1">
                    <p className="text-rose-300 font-bold">✗ {item.misconception}</p>
                    <p className="text-emerald-300">✓ {item.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* REAL WORLD ACTIVITY */}
          <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">{idx + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION NOTIFICATION OVERLAYS ────────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Chandrayaan Module Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C8_ComputerScienceAlgorithmsAdvancedPropertiesSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// Named Node IDs
const NODE_C9_CS_021 = 'c9_cs_021';
const NODE_C9_CS_022 = 'c9_cs_022';
const NODE_C9_CS_023 = 'c9_cs_023';
const NODE_C9_CS_024 = 'c9_cs_024';
const NODE_C9_CS_025 = 'c9_cs_025';
const NODE_C9_CS_026 = 'c9_cs_026';
const NODE_C9_CS_027 = 'c9_cs_027';
const NODE_C9_CS_028 = 'c9_cs_028';
const NODE_C9_CS_029 = 'c9_cs_029';
const NODE_C9_CS_030 = 'c9_cs_030';

const ALL_NODE_IDS = [
  NODE_C9_CS_021, NODE_C9_CS_022, NODE_C9_CS_023, NODE_C9_CS_024, NODE_C9_CS_025,
  NODE_C9_CS_026, NODE_C9_CS_027, NODE_C9_CS_028, NODE_C9_CS_029, NODE_C9_CS_030,
];

// Narrative Scenario
const SCENARIO = {
  title: 'Mission: Bengaluru Smart Metro Fare Engine',
  intro: 'You are the junior software architect at Namma Metro Bengaluru. You have been tasked to build the ticket calculation engine using Java in the BlueJ IDE. From handling token byte storage to conditional slab discounts and live object inspection, your code will power commuter journeys across the city.',
  context: 'Commuters expect instant fare calculation, accurate passenger classification, buffer-safe input processing, and robust switch-based line routing.',
};

// Observation Questions (Brilliant.org "What do you notice?" pattern)
const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_01',
    question: 'What do you notice when the Double value (48.95) is explicitly cast to (int) in the memory register?',
    observableOptions: [
      'The decimal portion (.95) is completely truncated (cut off) without rounding up to 49.',
      'The value mathematically rounds up to 49 in the integer register.',
      'The integer register overflows and produces an error code.',
      'The memory size automatically expands to 64 bits.',
    ],
    correctIndex: 0,
    explanation: 'Narrowing primitive type conversion in Java discards fractional bits without mathematical rounding, truncating directly toward zero.',
  },
  {
    id: 'obs_02',
    question: 'What do you notice happens to the Scanner input conveyor belt after sc.nextInt() reads the integer 45?',
    observableOptions: [
      'The entire input stream is flushed and reset to empty.',
      'The trailing newline delimiter (\\n) remains lingering on the conveyor belt.',
      'The Scanner skips ahead and automatically inputs the next string line.',
      'The conveyor belt blocks until the system restarts.',
    ],
    correctIndex: 1,
    explanation: 'nextInt() parses the numeric token but stops before the trailing newline character, leaving \\n lingering to be accidentally eaten by nextLine().',
  },
];

// Discovery Question
const DISCOVERY_QUESTION = {
  question: 'In Java inside BlueJ, if a commuter enters their age using sc.nextInt() and immediately enters their name with sc.nextLine(), what happens?',
  options: [
    'The program reads both values perfectly in sequence.',
    'The name is skipped and becomes empty because nextInt() left a newline in the buffer.',
    'BlueJ throws a fatal NullPointerException immediately.',
    'Java automatically converts the age to text and assigns it to name.',
  ],
  correctIndex: 1,
  hintAfter: "Don't worry! Let us discover why the Java input buffer behaves like a conveyor belt!",
};

// Challenge Interface
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

// 22 Comprehensive Challenges covering all 10 Nodes
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C9_CS_021,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each BlueJ IDE component to its correct visual role on the development canvas.',
    dragItems: [
      { label: 'Class Diagram', targetId: 'zone_classes' },
      { label: 'Object Bench', targetId: 'zone_bench' },
      { label: 'Code Editor', targetId: 'zone_editor' },
      { label: 'Compile Control', targetId: 'zone_toolbar' },
    ],
    correctMapping: {
      zone_classes: 'Class Diagram',
      zone_bench: 'Object Bench',
      zone_editor: 'Code Editor',
      zone_toolbar: 'Compile Control',
    },
    explanation: 'The BlueJ environment organizes OOP development into a Class Diagram (boxes with relations), Object Bench (red live object rectangles), Code Editor (syntax highlighted), and Compile Controls.',
    hints: [
      'Classes are shown as rectangular blueprint boxes in the main project area.',
      'Live instantiated objects rest at the bottom workbench.',
      'The toolbar houses the compile button that transforms source code to bytecode.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C9_CS_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When a class compiles without syntax errors in BlueJ, how does its icon appearance change?',
    options: [
      'It turns from solid brown to striped hatched pattern.',
      'It turns from striped/hatched (uncompiled) to solid (compiled).',
      'It immediately moves to the Object Bench as a red box.',
      'It opens a terminal window automatically.',
    ],
    correctIndex: 1,
    explanation: 'Uncompiled classes in BlueJ have diagonal stripes. Upon successful compilation with no syntax errors, the icon turns solid brown.',
    hints: [
      'Striped indicates raw, unverified source code.',
      'Solid indicates compiled bytecode (.class) ready for instantiation.',
      'The striped pattern disappears when the compiler confirms 0 syntax errors.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C9_CS_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following correctly matches the Java primitive data type with its memory size?',
    options: [
      'char = 1 byte, int = 4 bytes, double = 4 bytes',
      'byte = 1 byte, char = 2 bytes (Unicode), double = 8 bytes',
      'float = 8 bytes, long = 4 bytes, boolean = 2 bytes',
      'short = 4 bytes, int = 2 bytes, char = 1 byte',
    ],
    correctIndex: 1,
    explanation: 'In Java, byte=1 byte, short=2 bytes, int=4 bytes, long=8 bytes, float=4 bytes, double=8 bytes, char=2 bytes (16-bit Unicode), and boolean=1 bit representation.',
    hints: [
      'Java characters use 16-bit Unicode to support international scripts like Devanagari and Tamil.',
      'double provides double-precision floating point requiring 8 bytes.',
      'byte is the smallest integer type at exactly 1 byte (-128 to 127).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_04',
    nodeId: NODE_C9_CS_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A programmer writes: float metroFare = 45.50; long smartCards = 14000000000; Why does this fail to compile in BlueJ?',
    options: [
      'Variable names are camelCase which is disallowed.',
      '45.50 defaults to double (needs f/F) and the large integer literal exceeds int range (needs L/l).',
      'BlueJ does not allow decimal numbers in variables.',
      'float and long must always be converted using Scanner.',
    ],
    correctIndex: 1,
    explanation: 'In Java, decimal literals default to double (8 bytes), requiring float x = 45.50f; and whole number literals default to int, requiring the L suffix for values exceeding 2.14 billion.',
    hints: [
      'Decimal literals in Java are double precision by default.',
      'Integer literals default to 32-bit int.',
      'Add f for float literals and L for long literals.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C9_CS_023,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Calculate the value of commuterAge: double fine = 89.95; int calculatedFine = (int) fine; What is calculatedFine?',
    correctAnswer: 89,
    tolerance: 0,
    unit: '',
    explanation: 'Explicit narrowing cast (int) truncates towards zero by discarding the fractional part (.95). It does NOT round to 90.',
    hints: [
      'Explicit cast to integer simply cuts off everything after the decimal point.',
      'Java does not perform mathematical rounding during casting.',
      '89.95 becomes 89.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_06',
    nodeId: NODE_C9_CS_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the resulting data type of the expression: byte b = 10; char c = \'A\'; double d = 4.5; Object result = (b * c) + d; ?',
    options: ['int', 'float', 'double', 'char'],
    correctIndex: 2,
    explanation: 'In Java expressions, byte and char promote to int first (b * c -> int). Then when adding double d, the entire expression promotes to double according to the promotion ladder.',
    hints: [
      'Look at the highest precision type participating in the expression.',
      'byte and char promote to int during multiplication.',
      'int + double promotes to double.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_07',
    nodeId: NODE_C9_CS_024,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In the fare calculator: int tokens = 29; int passengersPerGate = 4; int remaining = tokens % passengersPerGate; What is remaining?',
    correctAnswer: 1,
    tolerance: 0,
    unit: 'tokens',
    explanation: 'The modulo operator % returns the integer remainder of division. 29 divided by 4 is 7 with a remainder of 1 (4 * 7 + 1 = 29).',
    hints: [
      'Modulo gives the remainder after division.',
      '29 = 4 * 7 + remainder.',
      'The remainder is 1.',
    ],
  },
  {
    id: 'ch_08',
    nodeId: NODE_C9_CS_024,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Evaluate the Java expression following ICSE precedence: 12 + 6 * 4 - 10 / 2 % 3',
    correctAnswer: 34,
    tolerance: 0,
    unit: '',
    explanation: 'Step 1: 6 * 4 = 24. Step 2: 10 / 2 = 5. Step 3: 5 % 3 = 2. Step 4: 12 + 24 - 2 = 34.',
    hints: [
      'Multiplication, division, and modulo (* / %) have equal priority and evaluate left to right.',
      '6*4=24, 10/2=5, 5%3=2.',
      'Then evaluate addition and subtraction left to right: 12 + 24 - 2.',
    ],
  },
  {
    id: 'ch_09',
    nodeId: NODE_C9_CS_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why does if (passengerCount = 50) fail to compile in Java for checking equality?',
    options: [
      '50 is outside the valid commuter range.',
      '= is the assignment operator which assigns 50 and yields int, not boolean. Equality comparison requires ==.',
      'Parentheses are not permitted around conditions in Java.',
      'passengerCount must be declared as float.',
    ],
    correctIndex: 1,
    explanation: 'In Java, = is the assignment operator. Relational equality check requires == which returns a boolean true or false required by if statements.',
    hints: [
      'Single equals modifies the variable.',
      'Double equals compares values without modifying them.',
      'if conditions strictly require a boolean result.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_010',
    nodeId: NODE_C9_CS_025,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Trace the code: int p = 8; int q = p++ + ++p; What is the final value of q?',
    correctAnswer: 18,
    tolerance: 0,
    unit: '',
    explanation: 'Evaluating left-to-right: p++ uses old value 8 and increments p to 9. Next, ++p increments p from 9 to 10 and uses 10. q = 8 + 10 = 18. Final p is 10.',
    hints: [
      'p++ contributes 8 to the sum, then p becomes 9.',
      '++p increments 9 to 10, then contributes 10.',
      '8 + 10 = 18.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_011',
    nodeId: NODE_C9_CS_025,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Trace the complex metro gate logic: int a = 5, b = 10; int c = ++a * (b-- - --a); What is the value of c?',
    correctAnswer: 30,
    tolerance: 0,
    unit: '',
    explanation: 'Step 1: ++a increments a from 5 to 6 (contributes 6). Step 2: Inside parens, b-- uses 10 and decrements b to 9. Step 3: --a decrements a from 6 to 5 and uses 5. Parens evaluate to (10 - 5) = 5. Step 4: c = 6 * 5 = 30.',
    hints: [
      '++a makes a = 6 and uses 6.',
      'Inside parens: b-- gives 10 (b becomes 9); --a decrements a back from 6 to 5 and gives 5.',
      '(10 - 5) = 5. So 6 * 5 = 30.',
    ],
  },
  {
    id: 'ch_012',
    nodeId: NODE_C9_CS_026,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Arrange the statements in correct order to read a student commuter ID (int) followed safely by their Full Name (String) with spaces.',
    sortItems: [
      'import java.util.Scanner;',
      'Scanner sc = new Scanner(System.in);',
      'int id = sc.nextInt();',
      'sc.nextLine(); // flush newline buffer',
      'String name = sc.nextLine();',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'We import Scanner, create the instance, read the integer, flush the leftover newline from Enter with dummy nextLine(), and then read the full name string.',
    hints: [
      'Import must come before class and instance declaration.',
      'Read the numeric token before reading the text string.',
      'Insert the buffer flushing line between nextInt() and nextLine().',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_013',
    nodeId: NODE_C9_CS_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is printed by: System.out.printf("Fare: ₹%.2f, Zone: %d%n", 35.789, 2); ?',
    options: [
      'Fare: ₹35.789, Zone: 2',
      'Fare: ₹35.79, Zone: 2 (followed by a newline)',
      'Fare: ₹35.78, Zone: 2',
      'Fare: ₹%.2f, Zone: %d',
    ],
    correctIndex: 1,
    explanation: '%.2f rounds the floating-point value 35.789 to 2 decimal places (35.79), %d formats integer 2, and %n inserts a platform-independent newline.',
    hints: [
      '%.2f specifies precision to 2 decimal digits with rounding.',
      '%d replaces with decimal integer.',
      '%n moves the cursor to the next line.',
    ],
  },
  {
    id: 'ch_014',
    nodeId: NODE_C9_CS_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the output of: int fare1 = 20, fare2 = 30; System.out.println("Total: " + fare1 + fare2); ?',
    options: [
      'Total: 50',
      'Total: 2030',
      'Total: 20 30',
      'Compilation Error',
    ],
    correctIndex: 1,
    explanation: 'Because + evaluates left-to-right and starts with a String ("Total: "), "Total: " + 20 becomes "Total: 20", and then + 30 concatenates to "Total: 2030". Parentheses are required: "Total: " + (fare1 + fare2).',
    hints: [
      'When String is the left operand, + performs string concatenation.',
      'Without parentheses, arithmetic addition does not occur.',
      '"Total: " + 20 + 30 concatenates textually.',
    ],
    misconceptionIndex: 8,
  },
  {
    id: 'ch_015',
    nodeId: NODE_C9_CS_028,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'An engineer writes: if (dist >= 5) fare=20; else if (dist >= 15) fare=40; else if (dist >= 25) fare=60; What fare is calculated for dist = 30 km?',
    options: [
      '60 (Correct high tier)',
      '20 (Caught prematurely by dist >= 5)',
      '40 (Caught by middle tier)',
      '0 (Default else)',
    ],
    correctIndex: 1,
    explanation: 'Because 30 >= 5 evaluates to true immediately on the first branch, fare becomes 20 and all subsequent else-if branches are skipped! Ladders must be ordered descending or with bounded ranges.',
    hints: [
      'An else-if ladder stops at the very first true condition.',
      '30 >= 5 is true, so the first block executes immediately.',
      'Descending order (>= 25 first) is necessary for proper slab classification.',
    ],
    misconceptionIndex: 9,
  },
  {
    id: 'ch_016',
    nodeId: NODE_C9_CS_028,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the boolean expression to check if a passenger qualifies for Senior Concession (age >= 60) AND travels in Peak Hours (hour >= 8 && hour <= 11).',
    availableParts: ['age >= 60', '&&', 'hour >= 8', '||', 'hour <= 11', '== true'],
    targetState: 'age >= 60 && hour >= 8 && hour <= 11',
    validationHint: 'Combine age and the two time boundary conditions using && logical operators.',
    explanation: 'All conditions must hold simultaneously: age >= 60 AND hour >= 8 AND hour <= 11, combined with logical AND (&&).',
    hints: [
      'Both age qualification and the double-ended hour window must be met.',
      'Use && between all relational tests.',
      'Do not use || because both hour bounds must hold.',
    ],
  },
  {
    id: 'ch_017',
    nodeId: NODE_C9_CS_029,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following data types CANNOT be used as the switch expression in Java?',
    options: [
      'int and short',
      'char and byte',
      'String (Java 7+)',
      'double and float',
    ],
    correctIndex: 3,
    explanation: 'Java switch expressions do NOT support floating-point types (float, double) or boolean. They support byte, short, int, char, and String.',
    hints: [
      'Floating point numbers suffer from precision rounding and cannot match exact discrete case labels.',
      'boolean only has 2 states and is meant for if-else.',
      'double and float cause a compiler error in switch.',
    ],
  },
  {
    id: 'ch_018',
    nodeId: NODE_C9_CS_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'int line = 2; switch(line){ case 1: System.out.print("Purple "); case 2: System.out.print("Green "); case 3: System.out.print("Yellow "); break; default: System.out.print("Red "); } What is printed?',
    options: [
      'Green',
      'Green Yellow',
      'Purple Green Yellow',
      'Green Yellow Red',
    ],
    correctIndex: 1,
    explanation: 'Matches case 2 ("Green "), but because case 2 lacks a break statement, execution falls through to case 3 ("Yellow ") where a break statement terminates the switch.',
    hints: [
      'Find the matching case label: case 2 executes.',
      'Notice whether case 2 has a break statement.',
      'Execution continues through case 3 until the break is reached.',
    ],
    misconceptionIndex: 10,
  },
  {
    id: 'ch_019',
    nodeId: NODE_C9_CS_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'How do you correctly group weekdays (1 to 5) to print "Workday" and weekend (6, 7) to print "Weekend" using switch in ICSE?',
    options: [
      'case 1 to 5: System.out.println("Workday"); break;',
      'case 1, 2, 3, 4, 5 -> System.out.println("Workday"); (Java 14 syntax not in ICSE Class 9)',
      'case 1: case 2: case 3: case 4: case 5: System.out.println("Workday"); break; case 6: case 7: System.out.println("Weekend"); break;',
      'case (day >= 1 && day <= 5): System.out.println("Workday"); break;',
    ],
    correctIndex: 2,
    explanation: 'Standard ICSE Java uses stacked case labels without break statements to achieve intentional fall-through for grouped constant execution.',
    hints: [
      'Class 9 ICSE tests standard Java switch fall-through.',
      'Stack case 1: case 2: ... with no break between them.',
      'Place the shared println and single break at the last grouped case.',
    ],
  },
  {
    id: 'ch_020',
    nodeId: NODE_C9_CS_030,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which statement correctly replaces: if (balance >= 50) status = "Valid"; else status = "Low Balance"; using the ternary operator?',
    options: [
      'String status = (balance >= 50) ? "Valid" : "Low Balance";',
      'String status = (balance >= 50) : "Valid" ? "Low Balance";',
      'balance >= 50 ? String status = "Valid" : status = "Low Balance";',
      'String status = if (balance >= 50) ? "Valid" : "Low Balance";',
    ],
    correctIndex: 0,
    explanation: 'The ternary operator syntax is condition ? value_if_true : value_if_false. It is an expression that yields a value directly for assignment.',
    hints: [
      'Syntax is: condition ? true_val : false_val;',
      'The ? comes before the true branch, and : separates the false branch.',
      'The whole expression assigns directly to the variable.',
    ],
  },
  {
    id: 'ch_021',
    nodeId: NODE_C9_CS_030,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Evaluate the nested ternary expression: int age = 65; int fare = (age < 5) ? 0 : (age >= 60) ? 15 : 30; What is fare?',
    correctAnswer: 15,
    tolerance: 0,
    unit: '₹',
    explanation: 'First condition (age < 5) is false (65 < 5 is false). So it evaluates the false branch: (age >= 60) ? 15 : 30. Since 65 >= 60 is true, it yields 15.',
    hints: [
      'Outer condition: 65 < 5 is FALSE.',
      'Follow into the right branch of the outer ternary.',
      'Inner condition: 65 >= 60 is TRUE, yielding 15.',
    ],
  },
  {
    id: 'ch_022',
    nodeId: NODE_C9_CS_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Review this production code snippet: double base = 25.0; double tax = 0.05 * base; System.out.printf("Total Fare: ₹%.1f\\n", base + tax); What will be output on the station terminal?',
    options: [
      'Total Fare: ₹26.3',
      'Total Fare: ₹26.25',
      'Total Fare: ₹26.2',
      'Total Fare: ₹25.0',
    ],
    correctIndex: 0,
    explanation: 'base + tax = 25.0 + 1.25 = 26.25. The format specifier %.1f rounds 26.25 to one decimal place, producing 26.3.',
    hints: [
      'Calculate base + tax: 25.0 + 1.25 = 26.25.',
      '%.1f specifies one decimal digit with mathematical rounding.',
      '26.25 rounds up to 26.3.',
    ],
  },
];

// Props Interface
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

// Default Props
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C9_CS_021,
  title: 'Java Development in BlueJ & Core Language Mechanics',
  definition: 'Comprehensive ICSE Class 9 suite covering BlueJ project management, primitive type memory representations, explicit casting, arithmetic and logical operators, pre/post increment expressions, Scanner buffer handling, formatted System.out streams, and conditional branching constructs (if-else, switch-case, ternary).',
  eli5: 'BlueJ is your visual workshop for Java: classes are blueprint boxes, objects are red workbench tools. You learn how memory boxes store numbers and letters, how math operators calculate fares, how the Scanner conveyor belt reads keystrokes, and how decision switches route smart metro trains!',
  misconceptions: [
    { misconception: 'Compiling and running in BlueJ are the same action.', correction: 'Compiling creates bytecode (.class) and checks syntax; running instantiates objects on the bench and executes methods.' },
    { misconception: 'char and String in Java are identical.', correction: 'char is a 2-byte primitive in single quotes; String is a non-primitive object in double quotes.' },
    { misconception: 'float pi = 3.14; is valid in Java.', correction: '3.14 defaults to double. You must append f (3.14f) for float variables.' },
    { misconception: 'Explicit casting (int) 3.9 rounds to 4.', correction: 'Casting truncates towards zero by cutting off the fractional part, yielding 3.' },
    { misconception: 'In expressions, byte + byte stays as byte.', correction: 'byte, short, and char are automatically promoted to int before any arithmetic operation.' },
    { misconception: 'Writing if (x = 5) checks if x is equal to 5.', correction: '= is assignment; equality comparison requires the relational operator ==.' },
    { misconception: 'p++ and ++p always yield the exact same value in expressions.', correction: 'p++ uses the current value then increments; ++p increments immediately before use.' },
    { misconception: 'nextLine() after nextInt() automatically pauses for user typing.', correction: 'nextInt() leaves a dangling newline in the buffer; nextLine() consumes it immediately unless flushed.' },
    { misconception: 'System.out.println("Total: " + 10 + 20) prints Total: 30.', correction: 'String concatenation occurs left-to-right yielding "Total: 1020". Use parens (10 + 20).' },
    { misconception: 'Else-if ladder order does not matter as long as all conditions are present.', correction: 'Ladders stop at the first true condition; ordering lowest-to-highest prematurely catches higher values.' },
    { misconception: 'switch statement automatically stops at the next case without break.', correction: 'Without break, Java falls through into all subsequent cases until a break or switch ends.' },
  ],
  diagnosticQuestions: [
    { question: 'What visual indicator in BlueJ shows that a class is compiled?', options: ['Icon becomes striped', 'Icon becomes solid brown', 'Icon turns red on bench', 'Editor window closes'], correctIndex: 1 },
    { question: 'How many bytes does a char occupy in Java?', options: ['1 byte', '2 bytes (Unicode)', '4 bytes', '8 bytes'], correctIndex: 1 },
    { question: 'What is the result of (int) 7.89 in Java?', options: ['8', '7', '7.0', 'Compile Error'], correctIndex: 1 },
    { question: 'What does 17 % 5 evaluate to?', options: ['3', '2', '3.4', '1'], correctIndex: 1 },
    { question: 'If int x = 4; int y = ++x; what is y?', options: ['4', '5', '6', 'Undefined'], correctIndex: 1 },
    { question: 'Which package contains the Scanner class?', options: ['java.lang', 'java.io', 'java.util', 'java.net'], correctIndex: 2 },
    { question: 'Which specifier formats a decimal with 2 decimal places in printf?', options: ['%2d', '%.2f', '%f2', '%s.2'], correctIndex: 1 },
    { question: 'Can float be used as the selector expression in a switch statement?', options: ['Yes', 'No', 'Only in Java 17', 'Only with break'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student creates BlueJ classes, manipulates primitive memory sizes, manages explicit casting, traces pre/post increment expressions, handles Scanner buffer flushes, and designs multi-way switch/ternary branch systems.',
};

// 5 Interactive Exploration Steps
const EXPLORATION_STEPS = [
  {
    title: 'BlueJ Visual Workbench & Object Inspection',
    instruction: 'Click "New Class", then click "Compile" to watch the icon solidify. Right-click the compiled class to create a live object on the Object Bench!',
    interactionType: 'bluej-workbench',
    nodeId: NODE_C9_CS_021,
  },
  {
    title: 'Primitive Memory Box & Casting Laboratory',
    instruction: 'Adjust the slider to change the double fare. Watch how explicit casting (int) truncates decimals while widening to double adds .0 with 0 data loss.',
    interactionType: 'memory-casting',
    nodeId: NODE_C9_CS_022,
  },
  {
    title: 'Prefix vs Postfix Increment Interactive Tracer',
    instruction: 'Step through an increment expression line-by-line. Watch the register values change before vs after the evaluation tick!',
    interactionType: 'increment-tracer',
    nodeId: NODE_C9_CS_025,
  },
  {
    title: 'Scanner Buffer Conveyor Belt & Flusher',
    instruction: 'Simulate user keystrokes: see how nextInt() leaves the "\\n" Enter key on the conveyor belt and how a dummy nextLine() cleans it!',
    interactionType: 'scanner-buffer',
    nodeId: NODE_C9_CS_026,
  },
  {
    title: 'Switch-Case Metro Router & Fall-Through Visualizer',
    instruction: 'Toggle "break" statements ON and OFF to see how execution drops through multiple station lines during fall-through!',
    interactionType: 'switch-router',
    nodeId: NODE_C9_CS_029,
  },
];

// Prediction Questions for Brilliant-style Predict-then-Check
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you cast double speed = 48.99 to (int), what value enters the integer register?',
    options: ['49 (Rounds up)', '48 (Truncates towards zero)', '0', 'Throws RuntimeException'],
    correctIndex: 1,
    verifyInstruction: 'Move the Double Slider to 48.99 and observe the (int) truncation gauge below.',
    nodeId: NODE_C9_CS_023,
  },
  {
    question: 'Predict: What will happen in switch(line) when line=1 and case 1 has NO break statement?',
    options: ['It only executes case 1 and stops.', 'It falls through and executes case 2 as well.', 'It causes a compilation syntax error.', 'It restarts the program.'],
    correctIndex: 1,
    verifyInstruction: 'Toggle the "Break Active" button OFF on Case 1 and trigger Line 1 dispatch.',
    nodeId: NODE_C9_CS_029,
  },
];

// Real World Activity
const REAL_WORLD_ACTIVITY = {
  title: 'Namma Metro Fare Architect Project',
  description: 'Write a full BlueJ class MetroFareCalculator that accepts commuter age (int), travel distance in km (double), and passenger name (String). Implement an else-if ladder for distance slabs (₹10 for <5km, ₹20 for 5-15km, ₹45 for >15km) and use a ternary operator to apply a 50% discount for seniors (age >= 60).',
  steps: [
    'Create project "MetroApp" and class "MetroFareCalculator" in BlueJ.',
    'Import java.util.Scanner and instantiate Scanner sc = new Scanner(System.in);.',
    'Read int age = sc.nextInt(); sc.nextLine(); String name = sc.nextLine(); double km = sc.nextDouble();.',
    'Calculate fare with slab logic and apply ternary concession.',
    'Format output using System.out.printf("Passenger: %s | Distance: %.1f km | Final Fare: ₹%.2f%n", name, km, fare);.',
  ],
};

function C9_ComputerScienceBluejCreatingProjectsSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C9_CS_021,
  title = DEFAULT_PROPS.title || 'Java Development in BlueJ',
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['compsci'] || { name: 'Computer Science', emoji: '💻', color: 'indigo' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant Exploration Interactive States
  const [bluejClassCreated, setBluejClassCreated] = useState(false);
  const [bluejCompiled, setBluejCompiled] = useState(false);
  const [bluejObjectCreated, setBluejObjectCreated] = useState(false);
  const [bluejInspected, setBluejInspected] = useState(false);

  const [simDoubleVal, setSimDoubleVal] = useState(48.95);
  const [simIntVal, setSimIntVal] = useState(48);

  const [simIncStep, setSimIncStep] = useState(0);
  const [simPVal, setSimPVal] = useState(5);
  const [simQVal, setSimQVal] = useState(0);
  const [simExprLog, setSimExprLog] = useState<string[]>([]);

  const [simScannerBuffer, setSimScannerBuffer] = useState<string[]>(['45', '\\n', 'Amit', 'Kumar', '\\n']);
  const [simScannerReadState, setSimScannerReadState] = useState('Idle');

  const [simSwitchLine, setSimSwitchLine] = useState(1);
  const [simSwitchBreakOn, setSimSwitchBreakOn] = useState(true);
  const [simSwitchOutput, setSimSwitchOutput] = useState<string[]>([]);

  // Predict & Observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionVerified, setPredictionVerified] = useState(false);

  // Observation Question Answers State
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});
  const [obsSubmitted, setObsSubmitted] = useState<Record<number, boolean>>({});

  // Sandbox Mode States
  const [sandboxAgeInput, setSandboxAgeInput] = useState(22);
  const [sandboxDistanceInput, setSandboxDistanceInput] = useState(12.0);
  const [sandboxHasPass, setSandboxHasPass] = useState(false);

  // Challenge & Evaluation States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Visual Feedback & Drag/Drop
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Adaptive Difficulty Filter
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Canvas Wave Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let t = 0;
    const render = () => {
      t += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#4f46e5';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * 0.04 + t) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // Initial Load from Mastery Store
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT Difficulty Updater
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner')
      ? 'foundation'
      : mastery === 'developing'
      ? 'standard'
      : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Escalating Hints
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
    }
  }, [hintCount, challenge]);

  // Timer reset
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Exploration Handlers
  const handleBluejCreateClass = useCallback(() => {
    setBluejClassCreated(true);
    setBluejCompiled(false);
    setBluejObjectCreated(false);
    setBluejInspected(false);
    audioManager.play('pop');
    speechManager.speak('Class FareEngine created with default skeleton.');
  }, []);

  const handleBluejCompile = useCallback(() => {
    if (!bluejClassCreated) return;
    setBluejCompiled(true);
    audioManager.play('success');
    speechManager.speak('Compiled successfully. Class icon turns solid!');
  }, [bluejClassCreated]);

  const handleBluejCreateObject = useCallback(() => {
    if (!bluejCompiled) return;
    setBluejObjectCreated(true);
    audioManager.play('drop-correct');
    speechManager.speak('Object f1 of class FareEngine created on Object Bench.');
  }, [bluejCompiled]);

  const handleBluejInspect = useCallback(() => {
    if (!bluejObjectCreated) return;
    setBluejInspected(prev => !prev);
    audioManager.play('tap');
  }, [bluejObjectCreated]);

  const handleDoubleSliderChange = useCallback((val: number) => {
    setSimDoubleVal(val);
    setSimIntVal(Math.trunc(val));
    audioManager.play('count');
    if (predictionMade && Math.abs(val - 48.99) < 0.1) {
      setPredictionVerified(true);
    }
  }, [predictionMade]);

  const handleIncStepNext = useCallback(() => {
    if (simIncStep === 0) {
      setSimIncStep(1);
      setSimExprLog(['Step 1: p++ contributes 5 to expression. Register p increments to 6.']);
      setSimPVal(6);
      audioManager.play('tap');
    } else if (simIncStep === 1) {
      setSimIncStep(2);
      setSimExprLog(prev => [...prev, 'Step 2: ++p increments register p from 6 to 7. Contributes 7.']);
      setSimPVal(7);
      audioManager.play('tap');
    } else if (simIncStep === 2) {
      setSimIncStep(3);
      setSimQVal(5 + 7);
      setSimExprLog(prev => [...prev, 'Step 3: Sum = 5 + 7 = 12. q is assigned 12. Final p = 7.']);
      audioManager.play('success');
    } else {
      setSimIncStep(0);
      setSimPVal(5);
      setSimQVal(0);
      setSimExprLog([]);
      audioManager.play('pop');
    }
  }, [simIncStep]);

  const handleScannerFlush = useCallback(() => {
    if (simScannerBuffer.length > 0 && simScannerBuffer[0] === '\\n') {
      setSimScannerBuffer(prev => prev.slice(1));
      setSimScannerReadState('Buffer Flushed! Newline consumed.');
      audioManager.play('whoosh');
      speechManager.speak('Newline consumed. Scanner is ready for nextLine().');
    } else if (simScannerBuffer.length > 0 && simScannerBuffer[0] === '45') {
      setSimScannerBuffer(prev => prev.slice(1));
      setSimScannerReadState('nextInt() read 45. Warning: \\n left in buffer!');
      audioManager.play('pickup');
    } else if (simScannerBuffer.length > 0) {
      const token = simScannerBuffer[0];
      setSimScannerBuffer(prev => prev.slice(1));
      setSimScannerReadState(`nextLine() captured: "${token}"`);
      audioManager.play('drop-correct');
    } else {
      setSimScannerBuffer(['45', '\\n', 'Amit', 'Kumar', '\\n']);
      setSimScannerReadState('Buffer Reset');
      audioManager.play('pop');
    }
  }, [simScannerBuffer]);

  const handleSwitchDispatch = useCallback(() => {
    const outputs: string[] = [];
    if (simSwitchLine === 1) {
      outputs.push('Route Purple Line [MG Road -> Indiranagar]');
      if (!simSwitchBreakOn) {
        outputs.push('FALL-THROUGH -> Route Green Line [Majestic -> Peenya]');
        outputs.push('FALL-THROUGH -> Route Yellow Line [Silk Board -> Electronic City]');
      }
    } else if (simSwitchLine === 2) {
      outputs.push('Route Green Line [Majestic -> Peenya]');
      if (!simSwitchBreakOn) {
        outputs.push('FALL-THROUGH -> Route Yellow Line [Silk Board -> Electronic City]');
      }
    } else if (simSwitchLine === 3) {
      outputs.push('Route Yellow Line [Silk Board -> Electronic City]');
    } else {
      outputs.push('Default Route: Terminal Shuttle');
    }
    setSimSwitchOutput(outputs);
    audioManager.play('whoosh');
    if (predictionMade && !simSwitchBreakOn && simSwitchLine === 1) {
      setPredictionVerified(true);
    }
  }, [simSwitchLine, simSwitchBreakOn, predictionMade]);

  // Observation Question Selection Handler
  const handleSelectObservation = useCallback((qIndex: number, optIndex: number) => {
    setObsAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
    setObsSubmitted(prev => ({ ...prev, [qIndex]: true }));
    const isCorrect = optIndex === OBSERVATION_QUESTIONS[qIndex].correctIndex;
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Spot on observation! That is exactly what happens.');
    } else {
      audioManager.play('pop');
    }
  }, []);

  // Drag & Drop Handlers
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

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Simulation completed! Excellent mastery of Java fundamentals.');
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

  // Answer Validation Handler
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
      isCorrect = (answer as string).trim() === challenge.targetState?.trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
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

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us study the complete solution and explanation.');
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handlePrediction = useCallback((_idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test it live in the interactive panel.');
  }, []);

  // Sandbox Derived Calculations
  const calculatedSandboxFare = useMemo(() => {
    let fare = 10.0;
    if (sandboxDistanceInput >= 20) fare = 50.0;
    else if (sandboxDistanceInput >= 10) fare = 30.0;
    else if (sandboxDistanceInput >= 5) fare = 20.0;

    const discounted = sandboxAgeInput >= 60 ? fare * 0.5 : sandboxAgeInput < 5 ? 0.0 : fare;
    const finalFare = sandboxHasPass ? discounted * 0.8 : discounted;
    return finalFare;
  }, [sandboxDistanceInput, sandboxAgeInput, sandboxHasPass]);

  // Spaced Repetition Next Review Days
  const srsDays = errors === 0 ? 7 : errors <= 3 ? 3 : 1;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="p-3 bg-indigo-900/40 border border-indigo-700 rounded-2xl text-2xl shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-purple-400">
              {title}
            </h1>
            <p className="text-xs text-slate-400">ICSE Class 9 Computer Science • Nodes c9_cs_021 - c9_cs_030</p>
          </div>
        </div>

        {/* Phase Badges */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.button
              key={p}
              aria-label={`Switch to ${p} phase`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${
                phase === p
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 to-purple-950/40 rounded-3xl border border-indigo-800/60 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-9xl">🚇</div>
            <div className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-400/30 mb-3">
              NARRATIVE MISSION
            </div>
            <h2 className="text-2xl font-black text-indigo-200 mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-900/80 rounded-xl border border-indigo-900/50 flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <p className="text-xs text-indigo-300 font-mono">{SCENARIO.context}</p>
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Discovery Mystery</span>
              <span className="text-xs text-slate-500 font-mono">No Grading • Exploration Spark</span>
            </div>
            <h3 className="text-lg font-bold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`p-4 text-left rounded-2xl text-sm font-medium border transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-lg'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700/80 text-slate-200'
                  }`}
                >
                  <span className="font-bold text-indigo-400 mr-2">
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓ ' : discoveryAnswered ? '✗ ' : ''}
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-4 rounded-2xl bg-indigo-900/30 border border-indigo-700/50 flex flex-col md:flex-row items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-sm font-bold text-indigo-200">
                      {discoveryCorrect ? '✓ Great intuition!' : '✗ Common Trap Alert!'}
                    </p>
                    <p className="text-xs text-slate-300 mt-1">
                      {discoveryCorrect
                        ? 'You identified the Scanner newline buffer carryover! Let us simulate it live.'
                        : DISCOVERY_QUESTION.hintAfter}
                    </p>
                  </div>
                  <motion.button
                    aria-label="Enter interactive laboratory"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setPhase('explore');
                      audioManager.play('whoosh');
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-sm rounded-xl shadow-lg hover:shadow-indigo-500/25"
                  >
                    Enter Interactive Lab →
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-indigo-400">LAB {currentSlide + 1} OF {EXPLORATION_STEPS.length}</span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-2">
              <motion.button
                aria-label="Previous lab slide"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentSlide === 0}
                onClick={() => {
                  setCurrentSlide(s => Math.max(0, s - 1));
                  audioManager.play('tap');
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-xl text-xs font-bold"
              >
                ← Prev
              </motion.button>
              <motion.button
                aria-label="Next lab slide or proceed to sandbox"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) {
                    setCurrentSlide(s => s + 1);
                    audioManager.play('tap');
                  } else {
                    setPhase('sandbox');
                    audioManager.play('whoosh');
                  }
                }}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30"
              >
                {currentSlide === EXPLORATION_STEPS.length - 1 ? 'Free Sandbox Mode →' : 'Next Lab →'}
              </motion.button>
            </div>
          </div>

          <p className="text-xs md:text-sm text-amber-300 bg-amber-950/30 border border-amber-800/40 p-3 rounded-xl flex items-center gap-2">
            <span>👉</span>
            {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <div className="p-6 bg-slate-900/95 rounded-3xl border border-slate-800 min-h-[420px] shadow-2xl relative space-y-6">
            {/* Step 0: BlueJ IDE Visualizer (SVG #1) */}
            {currentSlide === 0 && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-slate-800">
                  <motion.button
                    aria-label="Create new FareEngine class"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBluejCreateClass}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 font-bold text-xs rounded-xl border border-slate-700"
                  >
                    + New Class (FareEngine)
                  </motion.button>
                  <motion.button
                    aria-label="Compile class"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!bluejClassCreated}
                    onClick={handleBluejCompile}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    ⚙️ Compile
                  </motion.button>
                  <motion.button
                    aria-label="Instantiate class object"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!bluejCompiled}
                    onClick={handleBluejCreateObject}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 text-white font-bold text-xs rounded-xl"
                  >
                    🚀 new FareEngine()
                  </motion.button>
                </div>

                {/* SVG 1: BlueJ Workspace */}
                <svg viewBox="0 0 700 280" className="w-full bg-slate-950 rounded-2xl border border-slate-800" role="img" aria-label="BlueJ Visual IDE Class Diagram and Object Bench">
                  <rect x="20" y="20" width="660" height="150" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <text x="35" y="45" fill="#94a3b8" fontSize="12" fontWeight="bold">BlueJ Class Diagram Area</text>

                  {bluejClassCreated ? (
                    <g transform="translate(60, 60)">
                      <rect
                        x="0"
                        y="0"
                        width="160"
                        height="90"
                        rx="8"
                        fill={bluejCompiled ? '#78350f' : '#1e293b'}
                        stroke={bluejCompiled ? '#d97706' : '#64748b'}
                        strokeWidth="2"
                        strokeDasharray={bluejCompiled ? 'none' : '4 4'}
                      />
                      <text x="80" y="30" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">FareEngine</text>
                      <text x="80" y="52" textAnchor="middle" fill="#cbd5e1" fontSize="10">
                        {bluejCompiled ? '✓ Compiled (Bytecode Ready)' : '✗ Striped (Uncompiled .java)'}
                      </text>
                      <circle cx="20" cy="72" r="6" fill={bluejCompiled ? '#22c55e' : '#ef4444'} />
                      <text x="35" y="76" fill="#94a3b8" fontSize="9">
                        {bluejCompiled ? '0 Errors' : 'Needs Compilation'}
                      </text>
                    </g>
                  ) : (
                    <text x="350" y="100" textAnchor="middle" fill="#475569" fontSize="12">
                      Click "+ New Class" to place a class blueprint box.
                    </text>
                  )}

                  <rect x="20" y="190" width="660" height="70" rx="12" fill="#1e1b4b" stroke="#4338ca" strokeWidth="1.5" />
                  <text x="35" y="210" fill="#a5b4fc" fontSize="11" fontWeight="bold">OBJECT BENCH (Live Instances in Memory)</text>

                  {bluejObjectCreated && (
                    <g transform="translate(50, 220)" onClick={handleBluejInspect} style={{ cursor: 'pointer' }} role="button" tabIndex={0} aria-label="Inspect object f1">
                      <rect x="0" y="0" width="180" height="32" rx="6" fill="#b91c1c" stroke="#f87171" strokeWidth="1.5" />
                      <text x="90" y="20" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                        f1: FareEngine 🔍
                      </text>
                    </g>
                  )}
                </svg>

                {bluejInspected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-slate-800 border-2 border-amber-500/80 rounded-2xl shadow-xl space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400">Object Inspector — f1 : FareEngine</span>
                      <button aria-label="Close inspector" onClick={handleBluejInspect} className="text-slate-400 hover:text-white text-xs">✕ Close</button>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-700">
                      <div><span className="text-slate-500">Field:</span> <span className="text-indigo-300">baseFare</span></div>
                      <div><span className="text-slate-500">Type:</span> <span className="text-emerald-400">double</span></div>
                      <div><span className="text-slate-500">Value:</span> <span className="text-amber-300">25.0</span></div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Step 1: Memory & Casting Lab (SVG #2) */}
            {currentSlide === 1 && (
              <div className="space-y-6">
                {!predictionMade && (
                  <div className="p-4 bg-indigo-950/60 border border-indigo-700/60 rounded-2xl space-y-3">
                    <span className="text-xs font-bold text-indigo-300 uppercase">Step 1: Predict Before Interacting</span>
                    <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          aria-label={`Predict option ${i + 1}: ${opt}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handlePrediction(i)}
                          className="p-2.5 text-left text-xs bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 text-slate-200"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {predictionMade && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-slate-400 font-bold">
                        Manipulate Double Variable (8 Bytes): <span className="text-indigo-400 font-mono text-base">{simDoubleVal.toFixed(2)}</span>
                      </label>
                      <span className="text-xs text-emerald-400 font-mono">IEEE 754 Floating Precision</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Double fare adjustment slider"
                      min={0}
                      max={100}
                      step={0.05}
                      value={simDoubleVal}
                      onChange={e => handleDoubleSliderChange(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />

                    {/* SVG 2: Memory Box & Explicit Narrowing Truncation Diagram */}
                    <svg viewBox="0 0 650 140" className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-2" role="img" aria-label="Primitive Type Memory Bit Comparison and Casting Diagram">
                      <rect x="20" y="20" width="280" height="50" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="35" y="42" fill="#a5b4fc" fontSize="11" fontWeight="bold">double fare (64-bit IEEE 754)</text>
                      <text x="35" y="60" fill="#38bdf8" fontSize="13" fontFamily="monospace" fontWeight="bold">{simDoubleVal.toFixed(2)}</text>
                      <text x="240" y="52" fill="#64748b" fontSize="10">8 Bytes</text>

                      <path d="M 310 45 L 340 45" stroke="#f59e0b" strokeWidth="2" />
                      <text x="325" y="38" fill="#f59e0b" fontSize="10" textAnchor="middle" fontWeight="bold">(int) cast</text>

                      <rect x="350" y="20" width="260" height="50" rx="8" fill="#451a03" stroke="#d97706" strokeWidth="1.5" />
                      <text x="365" y="42" fill="#fcd34d" fontSize="11" fontWeight="bold">int calculatedFare (32-bit)</text>
                      <text x="365" y="60" fill="#fbbf24" fontSize="13" fontFamily="monospace" fontWeight="bold">{simIntVal}</text>
                      <text x="560" y="52" fill="#64748b" fontSize="10">4 Bytes</text>

                      <rect x="20" y="85" width="590" height="35" rx="6" fill="#0f172a" stroke="#334155" />
                      <text x="35" y="106" fill="#f43f5e" fontSize="11" fontWeight="bold">
                        ⚠️ Fractional Truncation: .{(simDoubleVal % 1).toFixed(2).slice(2)} is discarded permanently! No rounding to {Math.round(simDoubleVal)}.
                      </text>
                    </svg>

                    {predictionVerified && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-emerald-950/60 border border-emerald-500/60 rounded-xl text-xs text-emerald-200"
                      >
                        ✓ Prediction Verified: (int) 48.99 yields exactly 48 through pure truncation.
                      </motion.div>
                    )}

                    {/* Integrated Observation Question 1 */}
                    <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-indigo-900/50 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase text-indigo-400 tracking-wider">🔬 What Do You Notice? (Observation 1)</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-200">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectObservation(0, optIdx)}
                            className={`w-full text-left p-2.5 rounded-xl text-xs transition-all border ${
                              obsSubmitted[0] && optIdx === OBSERVATION_QUESTIONS[0].correctIndex
                                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                                : obsSubmitted[0] && obsAnswers[0] === optIdx
                                ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                            }`}
                          >
                            <span className="font-mono text-indigo-400 mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                            {opt}
                          </button>
                        ))}
                      </div>
                      {obsSubmitted[0] && (
                        <p className="text-[11px] text-indigo-300 font-mono pt-1">
                          💡 {OBSERVATION_QUESTIONS[0].explanation}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Prefix vs Postfix Increment Tracer */}
            {currentSlide === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <span className="text-xs font-mono text-indigo-400">Target Expression:</span>
                    <h3 className="text-lg font-black font-mono text-white">int p = 5; int q = p++ + ++p;</h3>
                  </div>
                  <motion.button
                    aria-label="Execute next step in increment trace"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleIncStepNext}
                    className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg"
                  >
                    {simIncStep === 3 ? 'Reset Trace ↺' : `Execute Step ${simIncStep + 1} →`}
                  </motion.button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-1">
                    <span className="text-xs text-slate-400 font-mono">Memory Box: Register [p]</span>
                    <motion.div
                      key={simPVal}
                      initial={{ scale: 1.3, color: '#a855f7' }}
                      animate={{ scale: 1, color: '#ffffff' }}
                      className="text-4xl font-black font-mono"
                    >
                      {simPVal}
                    </motion.div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-1">
                    <span className="text-xs text-slate-400 font-mono">Memory Box: Register [q]</span>
                    <motion.div
                      key={simQVal}
                      initial={{ scale: 1.3, color: '#38bdf8' }}
                      animate={{ scale: 1, color: '#38bdf8' }}
                      className="text-4xl font-black font-mono"
                    >
                      {simQVal}
                    </motion.div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs space-y-1.5 min-h-[100px]">
                  <span className="text-slate-500 font-bold block mb-2">// CPU Execution Step-by-Step Trace</span>
                  {simExprLog.map((log, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-emerald-400">
                      ▶ {log}
                    </motion.div>
                  ))}
                  {simExprLog.length === 0 && <span className="text-slate-600">Click "Execute Step 1" to begin.</span>}
                </div>
              </div>
            )}

            {/* Step 3: Scanner Buffer Conveyor Belt (SVG #3) */}
            {currentSlide === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Interactive Scanner Conveyor Belt Simulation</h3>
                  <motion.button
                    aria-label="Read token or clear buffer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleScannerFlush}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Action: Read Token / Clear Buffer →
                  </motion.button>
                </div>

                {/* SVG 3: Scanner Input Stream Buffer Conveyor Belt */}
                <svg viewBox="0 0 650 150" className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-2" role="img" aria-label="Scanner System.in Input Stream Conveyor Belt Diagram">
                  <rect x="30" y="70" width="590" height="18" rx="9" fill="#334155" />
                  <circle cx="45" cy="79" r="6" fill="#64748b" />
                  <circle cx="605" cy="79" r="6" fill="#64748b" />
                  <text x="35" y="30" fill="#94a3b8" fontSize="11" fontWeight="bold">System.in FIFO Buffer Stream</text>
                  <text x="560" y="30" fill="#a855f7" fontSize="10">Head of Stream →</text>

                  {simScannerBuffer.map((token, i) => (
                    <g key={i} transform={`translate(${60 + i * 105}, 35)`}>
                      <rect
                        x="0"
                        y="0"
                        width="90"
                        height="30"
                        rx="6"
                        fill={token === '\\n' ? '#881337' : '#1e1b4b'}
                        stroke={token === '\\n' ? '#f43f5e' : '#6366f1'}
                        strokeWidth="1.5"
                      />
                      <text x="45" y="19" textAnchor="middle" fill={token === '\\n' ? '#fecdd3' : '#e0e7ff'} fontSize="11" fontFamily="monospace" fontWeight="bold">
                        {token === '\\n' ? '↵ [\\n]' : token}
                      </text>
                    </g>
                  ))}

                  {simScannerBuffer.length === 0 && (
                    <text x="325" y="55" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">
                      ✓ Buffer Clean! Ready for next user input.
                    </text>
                  )}

                  <path d="M 105 105 L 105 92" stroke="#38bdf8" strokeWidth="3" />
                  <text x="105" y="125" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace">Next Token Read</text>
                </svg>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Scanner Status:</span>
                  <span className="text-amber-400 font-bold">{simScannerReadState}</span>
                </div>

                {/* Integrated Observation Question 2 */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-indigo-900/50 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase text-indigo-400 tracking-wider">🔬 What Do You Notice? (Observation 2)</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-200">{OBSERVATION_QUESTIONS[1].question}</p>
                  <div className="space-y-2">
                    {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectObservation(1, optIdx)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs transition-all border ${
                          obsSubmitted[1] && optIdx === OBSERVATION_QUESTIONS[1].correctIndex
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                            : obsSubmitted[1] && obsAnswers[1] === optIdx
                            ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                            : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        <span className="font-mono text-indigo-400 mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {obsSubmitted[1] && (
                    <p className="text-[11px] text-indigo-300 font-mono pt-1">
                      💡 {OBSERVATION_QUESTIONS[1].explanation}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Switch-Case Router & Fall-Through Visualizer */}
            {currentSlide === 4 && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Selector (line):</span>
                    {[1, 2, 3, 4].map(num => (
                      <button
                        key={num}
                        aria-label={`Select metro line ${num}`}
                        onClick={() => setSimSwitchLine(num)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold ${
                          simSwitchLine === num ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Line {num}
                      </button>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Toggle break statements"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSimSwitchBreakOn(b => !b)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold border ${
                      simSwitchBreakOn
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                        : 'bg-rose-950/60 border-rose-500 text-rose-300'
                    }`}
                  >
                    break statement: {simSwitchBreakOn ? '✓ ENABLED (Stops execution)' : '✗ DISABLED (Causes Fall-Through!)'}
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                    <p className="text-indigo-400">switch (line) {'{'}</p>
                    <p className={`pl-4 ${simSwitchLine === 1 ? 'text-amber-300 font-bold bg-amber-950/30' : ''}`}>
                      case 1: routePurple(); {simSwitchBreakOn && 'break;'}
                    </p>
                    <p className={`pl-4 ${simSwitchLine === 2 ? 'text-amber-300 font-bold bg-amber-950/30' : ''}`}>
                      case 2: routeGreen(); {simSwitchBreakOn && 'break;'}
                    </p>
                    <p className={`pl-4 ${simSwitchLine === 3 ? 'text-amber-300 font-bold bg-amber-950/30' : ''}`}>
                      case 3: routeYellow(); break;
                    </p>
                    <p className="pl-4 text-slate-500">default: routeShuttle();</p>
                    <p className="text-indigo-400">{'}'}</p>
                    <motion.button
                      aria-label="Trigger switch case execution"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSwitchDispatch}
                      className="w-full mt-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl"
                    >
                      Trigger Switch Execution ⚡
                    </motion.button>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-400 font-mono">// Station Dispatch Output</span>
                    <div className="space-y-1.5 min-h-[120px] pt-1">
                      {simSwitchOutput.map((out, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-2 rounded-lg text-xs font-mono font-bold ${
                            out.includes('FALL-THROUGH')
                              ? 'bg-rose-950/60 border border-rose-700 text-rose-300'
                              : 'bg-slate-900 border border-indigo-700 text-indigo-200'
                          }`}
                        >
                          {out}
                        </motion.div>
                      ))}
                      {simSwitchOutput.length === 0 && (
                        <span className="text-slate-600 text-xs font-mono">Click "Trigger Switch Execution" to route.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl border border-indigo-900/60 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Free Play Sandbox</span>
              <h2 className="text-xl font-bold text-white">Metro Smart Fare & Conditional Playground</h2>
              <p className="text-xs text-slate-400 mt-1">
                Tweak commuter variables to observe live ternary and slab evaluations without grades.
              </p>
            </div>
            <motion.button
              aria-label="Proceed to graded challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('challenge');
                audioManager.play('whoosh');
              }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-600/30"
            >
              Ready for Graded Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Input Controls</h3>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Travel Distance:</span>
                  <span className="font-mono text-indigo-400 font-bold">{sandboxDistanceInput.toFixed(1)} km</span>
                </div>
                <input
                  type="range"
                  aria-label="Travel distance in kilometers"
                  min={1}
                  max={40}
                  step={0.5}
                  value={sandboxDistanceInput}
                  onChange={e => setSandboxDistanceInput(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Passenger Age:</span>
                  <span className="font-mono text-amber-400 font-bold">{sandboxAgeInput} yrs</span>
                </div>
                <input
                  type="range"
                  aria-label="Passenger age in years"
                  min={1}
                  max={85}
                  value={sandboxAgeInput}
                  onChange={e => setSandboxAgeInput(parseInt(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-300">Monthly Pass Holder:</span>
                <button
                  aria-label="Toggle monthly pass status"
                  onClick={() => setSandboxHasPass(p => !p)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                    sandboxHasPass ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {sandboxHasPass ? '✓ YES (-20%)' : '✗ NO'}
                </button>
              </div>
            </div>

            <div className="p-5 bg-slate-950 rounded-3xl border border-slate-800 space-y-3 font-mono text-xs col-span-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400 font-bold">Terminal Output (System.out.printf)</span>
                <span className="text-emerald-400 text-[10px]">Real-Time Execution</span>
              </div>

              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-slate-400">// Computed Java Logic:</p>
                <p className="text-indigo-300">
                  double slabFare = ({sandboxDistanceInput} &gt;= 20) ? 50.0 : ({sandboxDistanceInput} &gt;= 10) ? 30.0 : 20.0;
                </p>
                <p className="text-purple-300">
                  double ageDiscount = ({sandboxAgeInput} &gt;= 60) ? 0.50 : ({sandboxAgeInput} &lt; 5) ? 0.0 : 1.0;
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800 text-base font-black text-emerald-400">
                  Calculated Net Fare: ₹{calculatedSandboxFare.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: ADAPTIVE CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <canvas ref={canvasRef} width={600} height={20} className="w-full rounded-xl opacity-60" />

          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-slate-400">
                QUESTION {currentChallenge + 1} OF {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                    : difficulty === 'standard'
                    ? 'bg-sky-950 border border-sky-500 text-sky-300'
                    : 'bg-rose-950 border border-rose-500 text-rose-300'
                }`}
              >
                {difficulty}
              </motion.span>
              <span className="text-[10px] bg-purple-950/60 border border-purple-600/40 text-purple-300 px-2 py-0.5 rounded-full uppercase font-bold">
                NEP: {challenge.competencyLevel}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Mastery:</span>
              <span className="text-xs font-bold text-indigo-400 capitalize">{masteryLevel}</span>
            </div>
          </div>

          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-purple-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-3xl border transition-colors shadow-2xl ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                : 'bg-slate-900/90 border-slate-800 text-slate-100'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold leading-relaxed mb-6">{challenge.question}</h3>

            {challenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={showExplanation || answerRevealed}
                    onClick={() => handleAnswer(i)}
                    className={`p-4 text-left rounded-2xl text-sm font-medium border transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-800 hover:bg-slate-755 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-indigo-400 mr-2">
                      {showExplanation && i === challenge.correctIndex ? '✓ ' : ''}
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, idx) => (
                    <div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-xl text-xs font-bold text-white cursor-grab shadow-md"
                    >
                      {item.label}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {['zone_classes', 'zone_bench', 'zone_editor', 'zone_toolbar'].map(target => (
                    <div
                      key={target}
                      role="region"
                      aria-label={`Drop target for ${target.replace('_', ' ')}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target)}
                      className="p-5 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px]"
                    >
                      <span className="text-[10px] text-slate-500 uppercase font-mono">{target.replace('_', ' ')}</span>
                      <span className="text-sm font-bold text-indigo-300 mt-1">
                        {droppedLabels[target] ? `✓ ${droppedLabels[target]}` : 'Drop Label Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify IDE component mapping"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-md"
                >
                  Verify IDE Mapping →
                </motion.button>
              </div>
            )}

            {challenge.type === 'numeric' && (
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="number"
                  aria-label="Numeric answer input"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter numeric answer"
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48"
                />
                <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                <motion.button
                  aria-label="Submit numeric value"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Submit Value
                </motion.button>
              </div>
            )}

            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length > 0 ? sortArrangement : challenge.sortItems.map((_, i) => i)).map((itemIdx, pos) => (
                  <div
                    key={pos}
                    role="button"
                    tabIndex={0}
                    aria-label={`Sort item ${pos + 1}: ${challenge.sortItems![itemIdx]}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(pos))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, pos);
                    }}
                    className="p-3 bg-slate-800 hover:bg-slate-755 border border-slate-700 rounded-xl text-xs font-mono text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="text-indigo-400 font-bold">{pos + 1}.</span>
                    {challenge.sortItems![itemIdx]}
                  </div>
                ))}
                <motion.button
                  aria-label="Verify code sequence ordering"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i))}
                  className="mt-3 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs"
                >
                  Verify Code Sequence
                </motion.button>
              </div>
            )}

            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <button
                      key={i}
                      aria-label={`Add block ${part}`}
                      onClick={() => setConstructParts(p => [...p, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-755 border border-slate-700 rounded-lg text-xs font-mono text-indigo-300"
                    >
                      + {part}
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-indigo-900 border border-indigo-600 rounded-md text-xs font-mono text-white flex items-center gap-1">
                      {part}
                      <button aria-label={`Remove block ${part}`} onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))} className="text-rose-400 ml-1">✕</button>
                    </span>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify constructed boolean expression"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Expression
                </motion.button>
              </div>
            )}

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-indigo-950/40 border border-indigo-800/60 rounded-2xl space-y-3"
              >
                <span className="text-xs font-bold text-indigo-300 uppercase">Step-by-Step Explanation:</span>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200"
                    >
                      <span className="font-bold text-indigo-400">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <button
                    aria-label="Show next explanation step"
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-1.5 bg-indigo-800 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold"
                  >
                    Show Next Step →
                  </button>
                )}

                {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    aria-label="Proceed to next challenge or final summary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="mt-2 block px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Final Certification →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD CERTIFICATION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 rounded-3xl border border-indigo-800 text-center space-y-4 shadow-2xl">
            <span className="text-5xl">🏆</span>
            <h2 className="text-3xl font-black text-white">Java Simulation Complete!</h2>

            {/* Motivational Feedback Banner */}
            <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-700 inline-block px-6">
              {errors === 0 && (
                <span className="text-emerald-400 font-black text-sm tracking-wide">
                  ✓ PERFECT SCORE! Outstanding mastery of BlueJ & Java core mechanics!
                </span>
              )}
              {errors >= 1 && errors <= 3 && (
                <span className="text-sky-300 font-black text-sm tracking-wide">
                  ✓ Great work! You have a solid grasp of Java in BlueJ!
                </span>
              )}
              {errors >= 4 && errors <= 7 && (
                <span className="text-amber-300 font-black text-sm tracking-wide">
                  ✓ Good effort! Review the tricky buffer & increment rules!
                </span>
              )}
              {errors >= 8 && (
                <span className="text-rose-300 font-black text-sm tracking-wide">
                  ✗ Do not give up — You WILL get this! Practice makes perfect in Java!
                </span>
              )}
            </div>

            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              You have mastered BlueJ project workflows, primitive memory models, increment traces, buffer safety, and multi-branching!
            </p>

            <div className="flex justify-center gap-6 pt-4">
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 w-36">
                <span className="text-xs text-slate-400 font-mono">Final Score</span>
                <div className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 w-36">
                <span className="text-xs text-slate-400 font-mono">Mastery Rank</span>
                <div className="text-2xl font-black text-indigo-300 capitalize">{masteryLevel}</div>
              </div>
            </div>
          </div>

          {/* Targeted Misconception Review */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 border border-rose-800/60 rounded-3xl space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wide">Targeted Diagnostic Feedback:</h3>
              {hitMisconceptions.map((mIdx, i) => {
                const m = misconceptions[mIdx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/50 space-y-1 text-xs">
                    <p className="text-rose-300 font-semibold">✗ Trap: {m.misconception}</p>
                    <p className="text-emerald-300 font-mono">✓ CISCE Rule: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Guided Reflection Section */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🤔</span> Reflection & Self-Assessment
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="font-semibold text-indigo-300">1. What was the most surprising thing you learned?</p>
                <p className="text-slate-400 mt-1">e.g., How nextInt() leaves the dangling newline '\n' on the conveyor belt, or how (int) truncates without rounding.</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="font-semibold text-indigo-300">2. How would you explain prefix vs postfix increment to a friend?</p>
                <p className="text-slate-400 mt-1">e.g., ++p increments the variable immediately before use, while p++ supplies the old value first then increments.</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="font-semibold text-indigo-300">3. Where in real life might you use this?</p>
                <p className="text-slate-400 mt-1">e.g., Constructing smart metro fare gates, automated discount calculators, or sensor stream parsers.</p>
              </div>
            </div>
          </div>

          {/* Spaced Repetition Visibility Card (SRS) */}
          <div className="p-6 bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 border-2 border-amber-500/60 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-amber-500/20 rounded-2xl border border-amber-500/40 text-3xl">
                📅
              </div>
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                  Spaced Repetition System (SM-2 SRS)
                </span>
                <h3 className="text-base md:text-lg font-black text-white">
                  Recommended Next Review:{' '}
                  <span className="text-amber-300 underline font-mono">
                    {srsDays === 7 ? 'Review in 7 days (Strong Retention)' : srsDays === 3 ? 'Review in 3 days (Solid Practice)' : 'Review in 1 day (Rapid Reinforcement)'}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Based on your error rate ({errors} error{errors === 1 ? '' : 's'}), the optimal cognitive consolidation window is set to{' '}
                  <span className="text-amber-300 font-bold">{srsDays} day{srsDays === 1 ? '' : 's'}</span>.
                </p>
              </div>
            </div>
            <div className="px-5 py-3 bg-amber-500/20 border border-amber-400/40 rounded-2xl text-center">
              <span className="text-[10px] text-amber-300 font-mono uppercase block">SRS Interval</span>
              <span className="text-2xl font-black text-amber-200">{srsDays}d</span>
            </div>
          </div>

          {/* Real World Coding Activity */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🚀</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="text-xs text-slate-400 font-mono flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating System Component Portals */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Level Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_ComputerScienceBluejCreatingProjectsSim;
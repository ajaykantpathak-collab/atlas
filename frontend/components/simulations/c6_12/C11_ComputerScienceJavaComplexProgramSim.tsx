'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C11_CS_051 = 'c11_cs_051';
const NODE_C11_CS_052 = 'c11_cs_052';
const NODE_C11_CS_053 = 'c11_cs_053';
const NODE_C11_CS_054 = 'c11_cs_054';
const NODE_C11_CS_055 = 'c11_cs_055';
const NODE_C11_CS_056 = 'c11_cs_056';
const NODE_C11_CS_057 = 'c11_cs_057';
const NODE_C11_CS_058 = 'c11_cs_058';
const NODE_C11_CS_059 = 'c11_cs_059';
const NODE_C11_CS_060 = 'c11_cs_060';

const ALL_NODE_IDS = [
  NODE_C11_CS_051,
  NODE_C11_CS_052,
  NODE_C11_CS_053,
  NODE_C11_CS_054,
  NODE_C11_CS_055,
  NODE_C11_CS_056,
  NODE_C11_CS_057,
  NODE_C11_CS_058,
  NODE_C11_CS_059,
  NODE_C11_CS_060,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'CyberLab India: Enterprise Java & Network Architecture Suite',
  intro: 'You are the Chief Systems Architect at TechKendra in Bengaluru. The team is engineering an integrated institutional suite combining an OOP Library System, Polymorphic Payroll Engine, 2D Matrix Compute Module, Interactive Swing GUI Calculator, and a Secure IRCTC/UPI-inspired Network Protocol Dispatcher.',
  context: 'Your task is to step through memory allocation, test dynamic method dispatch, solve matrix dot-products, assemble event-driven Swing interfaces, and route network packets across the 7-layer OSI stack before the system goes live in schools and public portals across India.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In Java, if an Employee reference points to a Manager object (which overrides calculateSalary()), which version of calculateSalary() executes when called at runtime?',
  options: [
    'Employee version (determined statically by compiler reference type)',
    'Manager version (determined dynamically by JVM inspecting actual object type)',
    'Both versions execute sequentially from superclass to subclass',
    'Compilation error: superclass reference cannot point to subclass object',
  ],
  correctIndex: 1,
  hintAfter: 'Curious about how Dynamic Method Dispatch works under the hood? Let us build and step through the actual memory and dispatch models!',
};

// ─── PREDICTION & OBSERVATION QUESTIONS ───
interface PredictionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  verifyInstruction: string;
}

interface ObservationQuestion {
  id: string;
  question: string;
  observableOptions: string[];
  correctIndex: number;
  explanation: string;
}

const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If an Employee reference variable points to a Manager object, what salary will calculateSalary() return if Manager overrides the method to add a bonus?',
    options: [
      'Basic salary only without bonus',
      'Basic salary plus manager bonus',
      'Zero because types mismatch',
      'Compiler error at invocation'
    ],
    correctIndex: 1,
    explanation: 'Dynamic method dispatch ensures the runtime instance method (Manager) executes, including the bonus calculation.',
    verifyInstruction: 'Go to Lab 2, toggle between Employee and Manager runtime objects, and observe the dispatched output value.'
  },
  {
    id: 'pred_2',
    question: 'When multiplying two 2x2 matrices A and B, how many total multiplications are required to compute all elements of matrix C?',
    options: [
      '4 multiplications',
      '8 multiplications',
      '16 multiplications',
      '2 multiplications'
    ],
    correctIndex: 1,
    explanation: 'Matrix C has 2x2 = 4 elements. Each element is a dot product of length 2 requiring 2 multiplications. 4 * 2 = 8 multiplications.',
    verifyInstruction: 'Navigate to Lab 3 or the Sandbox Matrix Multiplier and check each cell computation formula.'
  }
];

const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'In the JVM Heap Object Construction diagram, what happens first when stepping constructor execution for a subclass Member?',
    observableOptions: [
      'Subclass fields like memberId allocate before superclass',
      'Superclass Person state initializes first via super(name, contact)',
      'Both superclass and subclass allocate simultaneously without chaining',
      'Only subclass fields allocate while superclass is discarded'
    ],
    correctIndex: 1,
    explanation: 'Java constructor chaining mandates that super(...) runs first to allocate and initialize superclass state before subclass fields.'
  },
  {
    id: 'obs_2',
    question: 'When observing the Network Protocol Stack animation with packet transmission, what path does the packet take?',
    observableOptions: [
      'Top-down through sender layers (Application to Physical), across wire, and bottom-up through receiver layers',
      'Directly from sender Application layer to receiver Application layer with no intermediate layers',
      'Bottom-up through sender layers, then top-down through receiver layers',
      'Random layer hops back and forth between sender and receiver'
    ],
    correctIndex: 0,
    explanation: 'Data encapsulates down the layers on the sender side, transmits as raw bits over the physical layer, and decapsulates up the stack on the receiver.'
  }
];

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

// ─── DEFAULT ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_CS_051,
  title: 'Java Complex Systems & Network Architecture',
  definition: 'An integrated study of advanced Class 11 Java concepts: OOP inheritance with constructor chaining (super), dynamic method dispatch polymorphism, menu-driven switch-case computing, 2D matrix algorithms, Swing GUI event-driven architectures with LayoutManagers, and multi-tier OSI/TCP-IP network protocol communications.',
  eli5: 'Think of Java OOP like building Lego structures where child blocks inherit features from parent blocks. Swing GUIs are like digital control dashboards where buttons send signals to listeners. Computer networks are like a multi-floor post office ensuring messages reach the right destination safely!',
  misconceptions: [
    {
      misconception: 'A subclass must re-declare all fields inherited from its superclass.',
      correction: 'Using the extends keyword automatically grants the subclass access to visible superclass fields; re-declaring them shadows or duplicates variables unnecessarily.',
    },
    {
      misconception: 'super() can be called anywhere inside a subclass constructor.',
      correction: 'super(...) MUST be the very first statement in a subclass constructor to ensure the parent object state is initialized before subclass fields.',
    },
    {
      misconception: 'String comparisons in Java search routines can be safely done using the == operator.',
      correction: '== compares memory references. You must use .equals() or .equalsIgnoreCase() to compare actual string content.',
    },
    {
      misconception: 'Matrix multiplication is performed cell-by-cell (a[i][j] * b[i][j]).',
      correction: 'Matrix multiplication calculates the dot product using a triple-nested loop where rows of A multiply columns of B, requiring A cols == B rows.',
    },
    {
      misconception: 'UDP is an inferior, defective version of TCP because it does not guarantee packet arrival.',
      correction: 'UDP is intentionally connectionless to eliminate latency and overhead for real-time live streaming, gaming, and DNS where speed outweighs retransmission delays.',
    },
    {
      misconception: 'Components in BorderLayout can be stacked multiple times into the NORTH zone without overwriting.',
      correction: 'Each BorderLayout region (NORTH, SOUTH, EAST, WEST, CENTER) can hold exactly one component; adding a second overwrites the first.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which keyword links a subclass to its superclass in Java?',
      options: ['implements', 'extends', 'inherits', 'super'],
      correctIndex: 1,
    },
    {
      question: 'In method overriding, which mechanism decides which method version to execute at runtime?',
      options: ['Static binding', 'Dynamic method dispatch', 'Compile-time overloading', 'Bytecode verification'],
      correctIndex: 1,
    },
    {
      question: 'What exception is thrown when integer division by zero occurs in Java?',
      options: ['NullPointerException', 'IllegalArgumentException', 'ArithmeticException', 'NumberFormatException'],
      correctIndex: 2,
    },
    {
      question: 'To multiply matrix A (dimension 3x2) with matrix B, what must the number of rows in B be?',
      options: ['3', '2', '1', 'Any dimension'],
      correctIndex: 1,
    },
    {
      question: 'Which Swing component represents a clickable push button?',
      options: ['JLabel', 'JTextField', 'JButton', 'JFrame'],
      correctIndex: 2,
    },
    {
      question: 'Which method must be implemented by a class adhering to the ActionListener interface?',
      options: ['actionPerformed(ActionEvent e)', 'handleClick(Event e)', 'mouseClicked(MouseEvent e)', 'processAction()'],
      correctIndex: 0,
    },
    {
      question: 'Which layout manager divides a container into NORTH, SOUTH, EAST, WEST, and CENTER regions?',
      options: ['FlowLayout', 'GridLayout', 'BorderLayout', 'CardLayout'],
      correctIndex: 2,
    },
    {
      question: 'At which OSI layer do TCP and UDP operate?',
      options: ['Network Layer', 'Transport Layer', 'Application Layer', 'Data Link Layer'],
      correctIndex: 1,
    },
  ],
  masteryCriteria: 'Mastery is attained when the student demonstrates deep competency in Java OOP inheritance chaining, polymorphic method execution, matrix 2D traversals, Swing GUI layout management, event handling, and TCP/IP vs OSI network protocol flows.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. OOP Inheritance & Constructor Chaining',
    instruction: 'Manipulate the Member object creation parameters. Watch constructor chaining call super(name, contact) before memberId assigns memory on the Heap.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_CS_051,
  },
  {
    title: '2. Polymorphic Dynamic Method Dispatch',
    instruction: 'Toggle the object reference type between plain Employee and Manager. Watch the JVM invoke calculateSalary() dynamically based on actual object type.',
    interactionType: 'toggle-dispatch',
    nodeId: NODE_C11_CS_052,
  },
  {
    title: '3. 2D Matrix Multiplication & Dot-Product Engine',
    instruction: 'Select matrix cells to see the triple-nested loop (i, j, k) compute the dot product: C[i][j] = Σ (A[i][k] * B[k][j]).',
    interactionType: 'matrix-multiply',
    nodeId: NODE_C11_CS_054,
  },
  {
    title: '4. Swing GUI Architecture & Layout Manager Sandbox',
    instruction: 'Switch container layout between FlowLayout, BorderLayout, and GridLayout. Inspect component resizing and coordinate allocations.',
    interactionType: 'layout-sandbox',
    nodeId: NODE_C11_CS_057,
  },
  {
    title: '5. Network Protocol Stack & Packet Journey',
    instruction: 'Select a protocol (HTTP, TCP, UDP, DNS) and launch a data packet. Watch it traverse the 7-layer OSI model down the sender and up the receiver.',
    interactionType: 'network-packet',
    nodeId: NODE_C11_CS_060,
  },
];

// ─── CHALLENGES ARRAY ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C11_CS_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In Java inheritance, where must the super(...) constructor invocation statement appear in a subclass constructor?',
    options: [
      'It must be the very first statement of the subclass constructor',
      'It must be the final return statement',
      'Anywhere inside the constructor block before garbage collection',
      'Inside a separate static initialization block only',
    ],
    correctIndex: 0,
    explanation: 'Java requires super(...) to be the first statement in a subclass constructor so the superclass state is safely established prior to subclass initialization.',
    hints: [
      'Think about who must be born first: parent or child?',
      'If super() were called last, parent fields would remain uninitialized during child setup.',
      'Rule: super(...) must be line 1 of the derived constructor.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C11_CS_055,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Map each Swing component class to its respective GUI role in an application window.',
    dragItems: [
      { label: 'JFrame', targetId: 'target_window' },
      { label: 'JTextField', targetId: 'target_input' },
      { label: 'JButton', targetId: 'target_action' },
      { label: 'JLabel', targetId: 'target_display' },
    ],
    correctMapping: {
      target_window: 'JFrame',
      target_input: 'JTextField',
      target_action: 'JButton',
      target_display: 'JLabel',
    },
    explanation: 'JFrame provides the top-level window container, JTextField accepts user input, JButton triggers ActionEvents upon click, and JLabel displays text/images.',
    hints: [
      'Which component holds the entire desktop frame?',
      'Which component allows single-line text typing?',
      'Buttons trigger actions, while Labels display descriptive prompts.',
    ],
  },
  {
    id: 'ch_03',
    nodeId: NODE_C11_CS_053,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is switch-case preferred over a lengthy if-else ladder when constructing a console menu calculator in Java?',
    options: [
      'switch-case is faster to parse for discrete integer/char choices and yields clean, readable dispatching',
      'switch-case can evaluate complex boolean compound inequalities like (x > 10 && y < 5)',
      'if-else ladders cannot evaluate numeric variables in Java',
      'switch-case automatically catches ArithmeticException division errors',
    ],
    correctIndex: 0,
    explanation: 'switch-case provides clean O(1) jump table routing for discrete menu integers/characters, preventing cumbersome nested if-else ladders.',
    hints: [
      'Consider code cleanliness when picking options 1, 2, 3, 4, 5.',
      'Menu choices are fixed integer constants.',
      'Switch-case directly maps constant keys to handler blocks.',
    ],
  },
  {
    id: 'ch_04',
    nodeId: NODE_C11_CS_054,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Matrix A is 3x4 and Matrix B is 4x2. How many total scalar multiplication operations will be computed to produce Matrix C = A x B?',
    correctAnswer: 24,
    tolerance: 0,
    unit: 'multiplications',
    explanation: 'Matrix C has 3 rows and 2 columns = 6 cells. Each cell requires a dot-product of length 4 (4 multiplications). Total multiplications = 3 * 2 * 4 = 24.',
    hints: [
      'Find the number of cells in the result matrix: rows(A) * cols(B).',
      'Multiply cell count by the shared dimension k (cols of A).',
      'Calculation: 3 * 2 * 4 = 24.',
    ],
  },
  {
    id: 'ch_05',
    nodeId: NODE_C11_CS_059,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How many total architectural layers exist in the standard ISO-OSI Reference Model?',
    options: ['4 layers', '5 layers', '7 layers', '9 layers'],
    correctIndex: 2,
    explanation: 'The OSI Reference Model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.',
    hints: [
      'Remember the mnemonic: Please Do Not Throw Sausage Pizza Away.',
      'TCP/IP has 4 practical layers, but OSI has more.',
      'The OSI model has 7 layers.',
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C11_CS_059,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange these OSI model layers in order from Bottom (Layer 1) to Top (Layer 4).',
    sortItems: ['Physical Layer', 'Data Link Layer', 'Network Layer', 'Transport Layer'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Layer 1 is Physical (bits), Layer 2 is Data Link (frames/MAC), Layer 3 is Network (packets/IP), and Layer 4 is Transport (segments/TCP/UDP).',
    hints: [
      'Hardware cables and bits are at the absolute bottom.',
      'MAC frame addressing comes right above physical signaling.',
      'IP packets are layer 3, followed by end-to-end transport at layer 4.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C11_CS_052,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An Indian software firm in Hyderabad stores: Employee e = new Manager(101, "Aakash", 60000, 25000); What does e.calculateSalary() return if Manager overrides calculateSalary() as { return basicSalary + bonus; }?',
    options: ['60000', '85000', '25000', '0 (Compiler error due to type mismatch)'],
    correctIndex: 1,
    explanation: 'Dynamic method dispatch checks the runtime object (Manager), invoking the overridden version: 60000 + 25000 = 85000.',
    hints: [
      'What type was used with the `new` keyword?',
      'JVM resolves method calls at runtime by inspecting the heap object, not the variable declaration.',
      'Manager\'s calculateSalary() adds the bonus to basic salary.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_08',
    nodeId: NODE_C11_CS_053,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the defensive Java try-catch block for safe integer division handling.',
    availableParts: ['try { return a / b; }', 'catch (ArithmeticException e)', '{ System.out.println("Cannot divide by zero"); return 0; }', 'finally { cleanup(); }'],
    targetState: 'try { return a / b; } catch (ArithmeticException e) { System.out.println("Cannot divide by zero"); return 0; }',
    validationHint: 'Combine try block with the catch block targeting ArithmeticException.',
    explanation: 'Wrapping integer division inside a try block with `catch (ArithmeticException e)` protects against divide-by-zero crashes.',
    hints: [
      'Begin with the try block evaluating the division expression.',
      'Follow with the catch block handling ArithmeticException.',
      'Include the error message and default return fallback.',
    ],
  },
  {
    id: 'ch_09',
    nodeId: NODE_C11_CS_054,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'To successfully execute matrix subtraction A - B without throwing ArrayIndexOutOfBoundsException, which Java condition MUST evaluate to true?',
    options: [
      'a.length == b.length && a[0].length == b[0].length',
      'a[0].length == b.length',
      'a.length == b[0].length',
      'a.length * a[0].length == b.length * b[0].length',
    ],
    correctIndex: 0,
    explanation: 'Matrix addition and subtraction are strictly element-wise operations requiring identical row counts (a.length == b.length) and identical column counts (a[0].length == b[0].length).',
    hints: [
      'Addition and subtraction operate cell-by-cell on identical grids.',
      'Rows must match AND columns must match.',
      'Check both dimensions simultaneously.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_10',
    nodeId: NODE_C11_CS_057,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match each Java LayoutManager with its characteristic component placement behavior:',
    options: [
      'FlowLayout: Natural size with wrapping | BorderLayout: 5 fixed regions | GridLayout: Equal uniform grid cells',
      'FlowLayout: 5 regions | BorderLayout: Equal grid cells | GridLayout: Natural size with wrapping',
      'FlowLayout: Equal uniform grid cells | BorderLayout: Natural size | GridLayout: 5 regions',
      'All three behave identically in Swing',
    ],
    correctIndex: 0,
    explanation: 'FlowLayout places components left-to-right maintaining preferred size; BorderLayout divides into 5 regions stretching CENTER; GridLayout forces equal row/col dimensions.',
    hints: [
      'Think of paragraph text wrapping for FlowLayout.',
      'Think of a compass (N, S, E, W, Center) for BorderLayout.',
      'Think of a keypad matrix for GridLayout.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_11',
    nodeId: NODE_C11_CS_056,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A student creates `JButton btn = new JButton("Submit");` inside a frame that `implements ActionListener`. What line connects the button click to `actionPerformed`?',
    options: [
      'btn.addActionListener(this);',
      'this.registerButton(btn);',
      'btn.actionPerformed(this);',
      'EventDispatchThread.attach(btn);',
    ],
    correctIndex: 0,
    explanation: 'Under Java\'s Event Delegation Model, `source.addActionListener(listener)` registers the listener object (`this`) with the event source.',
    hints: [
      'The source component registers the listener.',
      'Look for the standard Swing listener registration method starting with `add`.',
      'Syntax: `btn.addActionListener(this);`.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C11_CS_060,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does an online live streaming platform (like streaming an IPL cricket match) prefer UDP over TCP for live video broadcast?',
    options: [
      'UDP avoids connection handshakes and retransmission lag, prioritizing low latency over occasional dropped packets',
      'UDP has built-in encryption that TCP lacks',
      'UDP automatically guarantees packet ordering and checksum error recovery',
      'TCP is incapable of transmitting video pixels across WAN routers',
    ],
    correctIndex: 0,
    explanation: 'In live broadcasts, waiting for TCP retransmission of a lost frame causes buffering stutters; UDP delivers frames instantly with minimal latency.',
    hints: [
      'In a live match, is an old delayed frame useful after the ball is bowled?',
      'TCP enforces strict retransmissions, creating lag.',
      'UDP trades guaranteed delivery for real-time speed.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_13',
    nodeId: NODE_C11_CS_051,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate why `if (catalogue[i].getTitle() == searchKey)` causes sporadic search failures in a Library Management System.',
    options: [
      'The `==` operator compares memory addresses (reference equality); new String instances with identical text will evaluate to false',
      'The `==` operator converts strings to ASCII integers and throws ClassCastException',
      'Java arrays do not support equality checking inside for-loops',
      'The `==` operator is reserved exclusively for primitive boolean flags',
    ],
    correctIndex: 0,
    explanation: 'In Java, `==` tests whether two references point to the exact same memory location. To compare text characters, `.equals()` or `.equalsIgnoreCase()` must be used.',
    hints: [
      'What is the difference between reference equality and content equality?',
      'User input strings live at different heap locations than hardcoded constants.',
      'Always use .equals() or .equalsIgnoreCase() for string content.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_14',
    nodeId: NODE_C11_CS_058,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In a Swing GUI Calculator, when the user clicks "+" followed by "5" and "=", why MUST the first operand and operator be stored in instance fields rather than local method variables?',
    options: [
      'Local variables inside `actionPerformed` are destroyed when the method terminates, losing the first operand before the second click arrives',
      'Swing buttons can only read global static registers in Java bytecode',
      'Local variables cannot hold primitive `double` datatypes in Swing',
      'LayoutManagers clear local variables during frame redraws',
    ],
    correctIndex: 0,
    explanation: 'Each button click triggers an independent invocation of `actionPerformed`. Local variables die at method exit, so state across separate clicks must live in instance fields.',
    hints: [
      'Consider the lifecycle of a method invocation.',
      'Button 1 click ends; time passes; Button 2 is clicked.',
      'Instance fields persist in memory for the life of the frame object.',
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C11_CS_060,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A computer lab in Kolkata has Host A at `192.168.1.50` and Host B at `192.168.2.60` with Subnet Mask `255.255.255.0`. Can Host A send packets directly to Host B without a default gateway router?',
    options: [
      'No: the /24 subnet mask dictates that `192.168.1.0` and `192.168.2.0` are separate subnets, requiring router gateway forwarding',
      'Yes: all IP addresses starting with 192 are in the same broadcast domain',
      'Yes: the subnet mask 255.255.255.0 merges the third and fourth octets automatically',
      'No: TCP does not support IP addresses ending with numbers above 32',
    ],
    correctIndex: 0,
    explanation: 'With a 24-bit subnet mask (255.255.255.0), the first 3 octets define the network. Host A is on 192.168.1.x and Host B is on 192.168.2.x, making them distinct networks.',
    hints: [
      'Look at the 3rd octet: 1 vs 2.',
      'A subnet mask of 255.255.255.0 means the network ID is the first 3 octets.',
      'Different network IDs require a default gateway router.',
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C11_CS_060,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of network operations when a user enters "www.cisce.org" into a web browser.',
    sortItems: [
      'DNS query resolves domain name to server IP',
      'TCP 3-way handshake establishes connection',
      'HTTP/HTTPS GET request is transmitted',
      'Web server streams back HTML response',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First, DNS resolves the IP address; second, TCP handshakes open the reliable socket; third, HTTP sends the page request; fourth, server replies with content.',
    hints: [
      'You cannot connect to an IP you do not know yet (DNS first).',
      'Connection must be established before sending data (TCP handshake).',
      'Then application data (HTTP request/response) flows.',
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C11_CS_059,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is Client-Server architecture chosen over Peer-to-Peer (P2P) for the Indian Railways IRCTC online reservation system?',
    options: [
      'Client-Server guarantees centralized database concurrency and strict transactional consistency preventing duplicate seat bookings',
      'P2P networks cannot connect more than 10 computers simultaneously',
      'Client-Server eliminates all server hardware costs compared to P2P',
      'P2P networks do not support the TCP/IP protocol stack',
    ],
    correctIndex: 0,
    explanation: 'Train ticketing requires a single authoritative database to prevent two users from booking the exact same seat concurrently. Centralized control is mandatory.',
    hints: [
      'What happens if two peers try to book Seat 42B at the exact same millisecond?',
      'Centralized control maintains transactional database integrity (ACID).',
      'P2P lacks a single authoritative master database.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C11_CS_058,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are adding a square root (`√`) button to a Java Swing Calculator. Which code block properly handles negative inputs without crashing?',
    options: [
      'double val = Double.parseDouble(txt.getText()); if(val < 0) txt.setText("Error"); else txt.setText(String.valueOf(Math.sqrt(val)));',
      'txt.setText(Math.sqrt(txt.getText()));',
      'double val = txt.getText(); txt.setText(val * val);',
      'throw new ArithmeticException("Square root not allowed");',
    ],
    correctIndex: 0,
    explanation: 'Reading the display text, parsing to double, validating `val >= 0` to prevent `NaN`, and calling `Math.sqrt()` provides safe and elegant calculation.',
    hints: [
      'Math.sqrt of a negative number produces NaN in floating point arithmetic.',
      'Always parse text to double first and check for non-negative values.',
      'Show "Error" for negative inputs.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C11_CS_054,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Given Row vector A = [2, 3, 5] and Column vector B = [[4], [1], [2]], calculate the scalar product C[0][0].',
    correctAnswer: 21,
    tolerance: 0,
    unit: 'value',
    explanation: 'Dot product: (2 * 4) + (3 * 1) + (5 * 2) = 8 + 3 + 10 = 21.',
    hints: [
      'Multiply matching elements: 2*4, 3*1, 5*2.',
      'Sum the products: 8 + 3 + 10.',
      'Result is 21.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C11_CS_060,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Drag the correct email protocol to its operational role in enterprise email communication.',
    dragItems: [
      { label: 'SMTP', targetId: 'target_send' },
      { label: 'POP3', targetId: 'target_fetch' },
      { label: 'DNS', targetId: 'target_mx' },
      { label: 'HTTPS', targetId: 'target_webmail' },
    ],
    correctMapping: {
      target_send: 'SMTP',
      target_fetch: 'POP3',
      target_mx: 'DNS',
      target_webmail: 'HTTPS',
    },
    explanation: 'SMTP pushes/transfers mail between servers, POP3 downloads mail to local clients, DNS MX records locate mail servers, and HTTPS encrypts webmail sessions.',
    hints: [
      'Which protocol is for Simple Mail TRANSFER (sending)?',
      'Which protocol is Post Office Protocol (downloading)?',
      'MX records belong to Domain Name System, webmail interfaces use HTTPS.',
    ],
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'CISCE Architect Challenge: Digital Kendra Infrastructure',
  description: 'Design a unified specification for a Government of India Digital CSC Kendra in a rural district. Write down how Java OOP models citizen tokens, how a Swing desktop client captures biometric inputs, and how the network securely reaches the State Data Centre over TCP/IP.',
  steps: [
    'Define a Person superclass with Citizen subclass using constructor chaining `super(name, aadhaar)`',
    'Write a polymorphic `calculateSubsidy()` method overridden in StudentCitizen and FarmerCitizen subclasses',
    'Design a 3x3 GridLayout Swing token booking terminal with an ActionListener attached to "Generate Token"',
    'Map the OSI 7-layer data journey of a token verification request over secure HTTPS/TCP to the central UIDAI server',
  ],
};

// ─── MAIN COMPONENT ───
function C11_ComputerScienceJavaComplexProgramSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_CS_051,
  title = DEFAULT_PROPS.title || 'Java Complex Systems & Network Architecture',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['compsci'] || { name: 'Computer Science', emoji: '💻', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery Hook State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Guided Inquiry Prediction & Observation States
  const [currentPredictionIdx, setCurrentPredictionIdx] = useState(0);
  const [selectedPrediction, setSelectedPrediction] = useState<number | null>(null);
  const [predictionSubmitted, setPredictionSubmitted] = useState(false);

  const [currentObsIdx, setCurrentObsIdx] = useState(0);
  const [selectedObs, setSelectedObs] = useState<number | null>(null);
  const [obsSubmitted, setObsSubmitted] = useState(false);

  // Interactive Exploration & Simulation States
  // 1. OOP State
  const [personName, setPersonName] = useState('Ananya Sen');
  const [personContact, setPersonContact] = useState('9876543210');
  const [memberId, setMemberId] = useState('ISC-2026-042');
  const [heapState, setHeapState] = useState<'unallocated' | 'personAllocated' | 'memberComplete'>('unallocated');

  // 2. Polymorphic Salary State
  const [polymorphicType, setPolymorphicType] = useState<'Employee' | 'Manager'>('Manager');
  const [basicSalary, setBasicSalary] = useState(45000);
  const [managerBonus, setManagerBonus] = useState(15000);

  // 3. Matrix Multiplier State
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number }>({ r: 0, c: 0 });
  const matrixA = useMemo(() => [[2, 3], [4, 1]], []);
  const matrixB = useMemo(() => [[5, 2], [3, 4]], []);

  // 4. GUI Layout Sandbox State
  const [selectedLayout, setSelectedLayout] = useState<'FlowLayout' | 'BorderLayout' | 'GridLayout'>('BorderLayout');
  const [guiComponentsCount] = useState(5);

  // 5. Network Stack State
  const [activeProtocol, setActiveProtocol] = useState<'HTTP' | 'TCP' | 'UDP' | 'DNS'>('HTTP');
  const [packetProgress, setPacketProgress] = useState(0);
  const [isPacketTransmitting, setIsPacketTransmitting] = useState(false);

  // BKT & Adaptive Difficulty
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

  // Challenge Drag & Drop / Input States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Feedback & Misconception tracking
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Persistent BKT ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT EFFECT: LOAD MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE EFFECT ───
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

  // ─── CANVAS ANIMATION EFFECT (Network packet flight) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particleOffset = 0;

    const render = () => {
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

      // Layer nodes
      const layers = ['App', 'Pres', 'Sess', 'Trans', 'Net', 'Data', 'Phys'];
      const totalLayers = layers.length;
      const xSender = 50;
      const xReceiver = canvas.width - 50;

      layers.forEach((lName, idx) => {
        const y = 20 + idx * 24;

        // Sender node
        ctx.fillStyle = isPacketTransmitting && Math.floor(packetProgress * totalLayers * 2) === idx ? '#38bdf8' : '#334155';
        ctx.beginPath();
        ctx.arc(xSender, y, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '9px monospace';
        ctx.fillText(lName, xSender + 12, y + 3);

        // Receiver node
        const revIdx = totalLayers * 2 - 1 - idx;
        ctx.fillStyle = isPacketTransmitting && Math.floor(packetProgress * totalLayers * 2) === revIdx ? '#4ade80' : '#334155';
        ctx.beginPath();
        ctx.arc(xReceiver, y, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#94a3b8';
        ctx.fillText(lName, xReceiver - 35, y + 3);
      });

      // Packet beam
      if (isPacketTransmitting) {
        particleOffset = (particleOffset + 2) % canvas.width;
        ctx.strokeStyle = activeProtocol === 'UDP' ? '#f59e0b' : '#6366f1';
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(xSender, 164);
        ctx.lineTo(xReceiver, 164);
        ctx.stroke();
        ctx.setLineDash([]);

        // Glowing packet dot
        const xPos = xSender + (xReceiver - xSender) * packetProgress;
        ctx.fillStyle = '#ec4899';
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(xPos, 164, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPacketTransmitting, packetProgress, activeProtocol]);

  // ─── NETWORK PACKET TRANSMIT EFFECT ───
  useEffect(() => {
    if (!isPacketTransmitting) return;
    const interval = setInterval(() => {
      setPacketProgress(prev => {
        if (prev >= 1) {
          setIsPacketTransmitting(false);
          audioManager.play('drop-correct');
          return 0;
        }
        return prev + 0.02;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [isPacketTransmitting]);

  // ─── MEMOISED HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
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
        ? 'Spot on! Dynamic method dispatch looks at the runtime object on the heap.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Let us explore OOP, matrices, GUI and networking.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to tweak all parameters with zero pressure in the free-play sandbox.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for the official ISC engineering challenges. Read carefully and conquer each tier!');
  }, []);

  const handleStepConstructorChaining = useCallback(() => {
    audioManager.play('count');
    setHeapState(prev => {
      if (prev === 'unallocated') return 'personAllocated';
      if (prev === 'personAllocated') return 'memberComplete';
      return 'unallocated';
    });
  }, []);

  const handleLaunchPacket = useCallback(() => {
    if (isPacketTransmitting) return;
    setIsPacketTransmitting(true);
    setPacketProgress(0);
    audioManager.play('swoop');
    speechManager.speak(`Dispatching ${activeProtocol} packet down the sender stack.`);
  }, [isPacketTransmitting, activeProtocol]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Exceptional work! You have completed the Java Complex Systems and Networking simulation.');
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

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isMatch) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length > 0 ? prev : (challenge.sortItems || []).map((_, i) => i);
      const arr = [...base];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [challenge]);

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
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding technical deduction.');
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
          speechManager.speak('Let us review the step-by-step resolution.');
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

  const calculatedPolymorphicSalary = useMemo(() => {
    if (polymorphicType === 'Employee') {
      return basicSalary;
    }
    return basicSalary + managerBonus;
  }, [polymorphicType, basicSalary, managerBonus]);

  const calculatedMatrixProductCell = useMemo(() => {
    const { r, c } = selectedCell;
    const term0 = matrixA[r][0] * matrixB[0][c];
    const term1 = matrixA[r][1] * matrixB[1][c];
    return {
      term0,
      term1,
      total: term0 + term1,
      formula: `(${matrixA[r][0]} × ${matrixB[0][c]}) + (${matrixA[r][1]} × ${matrixB[1][c]}) = ${term0} + ${term1} = ${term0 + term1}`,
    };
  }, [selectedCell, matrixA, matrixB]);

  // Clean up timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gold-600/20 border border-gold-500/40 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold-900/60 text-gold-300 border border-gold-700">
                ISC Class 11
              </span>
              <span className="text-xs text-slate-400 font-mono">10 Topic Matrix</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((pName, idx) => (
            <motion.button
              key={pName}
              aria-label={`Navigate to ${pName} phase`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (pName === 'discovery' || pName === 'explore' || pName === 'sandbox' || (pName === 'challenge' && scoreBreakdown.total > 0)) {
                  setPhase(pName);
                }
              }}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors capitalize ${
                phase === pName
                  ? 'bg-gold-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {idx + 1}. {pName}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK & GUIDED PREDICTION ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/40 via-slate-900 to-slate-900 rounded-3xl border border-gold-800/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">🏛️</div>
            <span className="text-xs font-mono uppercase tracking-widest text-gold-400">Architect Narrative</span>
            <h2 className="text-2xl font-bold text-white mt-1 mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">{SCENARIO.intro}</p>
            <p className="text-gold-300/80 text-xs mt-3 font-mono">📍 {SCENARIO.context}</p>
          </div>

          {/* Discovery Probe */}
          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold">
                Curiosity Discovery Probe (Ungraded)
              </span>
              <span className="text-xs text-slate-500">Think deeply before clicking</span>
            </div>
            <h3 className="text-lg font-semibold text-white leading-snug">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Select option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-2xl text-sm border transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500'
                      : 'bg-slate-800/70 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-gold-500/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-700/60 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                      {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓' : String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800"
              >
                <div className="text-sm">
                  {discoveryCorrect ? (
                    <span className="text-emerald-400 font-medium flex items-center gap-2">
                      ✓ Brilliant intuition! Java JVM inspects the heap object at runtime.
                    </span>
                  ) : (
                    <span className="text-amber-400 font-medium">
                      💡 {DISCOVERY_QUESTION.hintAfter}
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Guided Inquiry: Prediction Questions (Predict-Then-Check) */}
          <div className="p-6 bg-slate-900/90 rounded-3xl border border-gold-900/50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono tracking-wider text-gold-400 font-bold">
                Hypothesis & Prediction Lab ({currentPredictionIdx + 1}/{PREDICTION_QUESTIONS.length})
              </span>
              <span className="text-xs text-slate-400">Predict before interacting</span>
            </div>

            <h3 className="text-base font-semibold text-white">
              {PREDICTION_QUESTIONS[currentPredictionIdx].question}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PREDICTION_QUESTIONS[currentPredictionIdx].options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => {
                    if (!predictionSubmitted) setSelectedPrediction(oIdx);
                  }}
                  className={`p-3.5 rounded-xl text-left text-xs font-mono border transition-all ${
                    selectedPrediction === oIdx
                      ? 'bg-gold-600/80 border-gold-400 text-white'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {String.fromCharCode(65 + oIdx)}. {opt}
                </button>
              ))}
            </div>

            {!predictionSubmitted && selectedPrediction !== null && (
              <button
                onClick={() => {
                  setPredictionSubmitted(true);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 font-bold text-xs rounded-xl text-white shadow"
              >
                Lock In Prediction
              </button>
            )}

            {predictionSubmitted && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-xs font-mono text-gold-300">
                  🔍 Verification Plan: {PREDICTION_QUESTIONS[currentPredictionIdx].verifyInstruction}
                </p>
                <p className="text-xs text-slate-400">{PREDICTION_QUESTIONS[currentPredictionIdx].explanation}</p>
                {currentPredictionIdx < PREDICTION_QUESTIONS.length - 1 ? (
                  <button
                    onClick={() => {
                      setCurrentPredictionIdx(p => p + 1);
                      setSelectedPrediction(null);
                      setPredictionSubmitted(false);
                    }}
                    className="mt-2 px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-white rounded-lg font-mono"
                  >
                    Next Prediction →
                  </button>
                ) : (
                  <button
                    onClick={handleAdvanceToExploration}
                    className="mt-2 px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Enter Interactive Laboratories →
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION & OBSERVATIONS ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Lab Step Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {EXPLORATION_STEPS.map((st, idx) => (
              <motion.button
                key={idx}
                aria-label={`Select Lab ${idx + 1}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  currentSlide === idx
                    ? 'bg-gold-600 border-gold-400 text-white shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Lab {idx + 1}: {st.title.split('.')[1]}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono uppercase text-gold-400 tracking-wider">
                    Interactive Engineering Lab {currentSlide + 1} of 5
                  </span>
                  <h3 className="text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                  {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>

              <p className="text-amber-300/90 text-sm bg-amber-950/30 p-3.5 rounded-2xl border border-amber-800/40">
                👉 <span className="font-semibold">Action Instruction:</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ─── SLIDE 0: OOP Inheritance & Constructor Chaining ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gold-300 font-mono uppercase">1. Code & Parameter Control</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-slate-400 font-mono" htmlFor="person-name-input">Person Name (Superclass Field):</label>
                        <input
                          id="person-name-input"
                          aria-label="Person Name Superclass Field"
                          type="text"
                          value={personName}
                          onChange={e => setPersonName(e.target.value)}
                          className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 font-mono" htmlFor="person-contact-input">Contact Phone (Superclass Field):</label>
                        <input
                          id="person-contact-input"
                          aria-label="Contact Phone Superclass Field"
                          type="text"
                          value={personContact}
                          onChange={e => setPersonContact(e.target.value)}
                          className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 font-mono" htmlFor="member-id-input">Member ID (Subclass Field):</label>
                        <input
                          id="member-id-input"
                          aria-label="Member ID Subclass Field"
                          type="text"
                          value={memberId}
                          onChange={e => setMemberId(e.target.value)}
                          className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <motion.button
                        aria-label="Step Constructor Execution"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleStepConstructorChaining}
                        className="w-full py-2.5 bg-gold-600 hover:bg-gold-500 font-bold text-xs rounded-xl text-white shadow-md flex items-center justify-center gap-2"
                      >
                        ⚡ Step Constructor Execution: [{heapState.toUpperCase()}]
                      </motion.button>
                    </div>
                  </div>

                  {/* Topic SVG 1: JVM Heap Object Construction Diagram */}
                  <div className="flex flex-col justify-center items-center bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-mono mb-2">JVM Heap Object Construction</span>
                    <svg viewBox="0 0 320 220" className="w-full max-w-xs" aria-label="JVM Heap Object Diagram">
                      <rect
                        x="30"
                        y="20"
                        width="260"
                        height="85"
                        rx="12"
                        fill={heapState === 'personAllocated' || heapState === 'memberComplete' ? '#1e1b4b' : '#0f172a'}
                        stroke={heapState === 'personAllocated' || heapState === 'memberComplete' ? '#6366f1' : '#334155'}
                        strokeWidth="2"
                      />
                      <text x="45" y="42" fill="#818cf8" fontSize="11" fontWeight="bold" fontFamily="monospace">
                        super: Person Object State
                      </text>
                      <text x="45" y="62" fill="#cbd5e1" fontSize="10" fontFamily="sans-serif">
                        name: "{personName}"
                      </text>
                      <text x="45" y="80" fill="#cbd5e1" fontSize="10" fontFamily="sans-serif">
                        contact: "{personContact}"
                      </text>

                      <rect
                        x="30"
                        y="115"
                        width="260"
                        height="85"
                        rx="12"
                        fill={heapState === 'memberComplete' ? '#064e3b' : '#0f172a'}
                        stroke={heapState === 'memberComplete' ? '#10b981' : '#334155'}
                        strokeWidth="2"
                      />
                      <text x="45" y="137" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">
                        sub: Member (extends Person)
                      </text>
                      <text x="45" y="157" fill="#cbd5e1" fontSize="10" fontFamily="sans-serif">
                        memberId: "{memberId}"
                      </text>
                      <text x="45" y="177" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                        Chaining: super(name, contact);
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: Polymorphic Salary Dispatcher ─── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gold-300 font-mono uppercase">2. Reference vs Actual Object</h4>
                    <div className="flex gap-3">
                      <motion.button
                        aria-label="Set reference and instance to Employee"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setPolymorphicType('Employee');
                          audioManager.play('tap');
                        }}
                        className={`flex-1 py-3 rounded-xl font-bold text-xs border transition-all ${
                          polymorphicType === 'Employee'
                            ? 'bg-gold-600 border-gold-400 text-white shadow-lg'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        Employee e = new Employee();
                      </motion.button>
                      <motion.button
                        aria-label="Set reference to Employee and instance to Manager"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setPolymorphicType('Manager');
                          audioManager.play('tap');
                        }}
                        className={`flex-1 py-3 rounded-xl font-bold text-xs border transition-all ${
                          polymorphicType === 'Manager'
                            ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        Employee e = new Manager();
                      </motion.button>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div>
                        <div className="flex justify-between text-xs font-mono text-slate-400">
                          <span>Basic Salary: ₹{basicSalary.toLocaleString()}</span>
                        </div>
                        <input
                          aria-label="Basic Salary Slider"
                          type="range"
                          min={20000}
                          max={100000}
                          step={5000}
                          value={basicSalary}
                          onChange={e => setBasicSalary(Number(e.target.value))}
                          className="w-full mt-1"
                        />
                      </div>

                      {polymorphicType === 'Manager' && (
                        <div>
                          <div className="flex justify-between text-xs font-mono text-emerald-400">
                            <span>Manager Bonus: ₹{managerBonus.toLocaleString()}</span>
                          </div>
                          <input
                            aria-label="Manager Bonus Slider"
                            type="range"
                            min={5000}
                            max={50000}
                            step={2500}
                            value={managerBonus}
                            onChange={e => setManagerBonus(Number(e.target.value))}
                            className="w-full mt-1"
                          />
                        </div>
                      )}
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-gold-900/60 mt-2">
                      <span className="text-xs text-gold-400 font-mono">Runtime Dispatched Total:</span>
                      <div className="text-2xl font-bold text-white mt-1">
                        ₹{calculatedPolymorphicSalary.toLocaleString()}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {polymorphicType === 'Manager'
                          ? `Overridden calculateSalary() executed: basicSalary (${basicSalary}) + bonus (${managerBonus})`
                          : `Superclass calculateSalary() executed: returns basicSalary (${basicSalary}) only`}
                      </p>
                    </div>
                  </div>

                  {/* Topic SVG 2: JVM Virtual Method Table */}
                  <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                    <span className="text-xs text-slate-400 font-mono mb-2">Dynamic Method Dispatch VTable</span>
                    <svg viewBox="0 0 340 220" className="w-full max-w-sm" aria-label="Dynamic Method Dispatch VTable Diagram">
                      <rect x="15" y="25" width="100" height="60" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                      <text x="65" y="45" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Stack Variable</text>
                      <text x="65" y="65" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">e (Employee)</text>

                      <rect
                        x="165"
                        y="20"
                        width="160"
                        height="180"
                        rx="10"
                        fill={polymorphicType === 'Manager' ? '#064e3b' : '#1e3a8a'}
                        stroke={polymorphicType === 'Manager' ? '#10b981' : '#3b82f6'}
                        strokeWidth="2"
                      />
                      <text x="245" y="42" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                        Heap: {polymorphicType} Object
                      </text>
                      <line x1="175" y1="52" x2="315" y2="52" stroke="#475569" strokeWidth="1" />

                      <rect x="175" y="62" width="140" height="40" rx="6" fill="#0f172a" stroke="#334155" />
                      <text x="185" y="78" fill="#94a3b8" fontSize="9" fontFamily="monospace">vtable: calculateSalary()</text>
                      <text
                        x="185"
                        y="94"
                        fill={polymorphicType === 'Manager' ? '#34d399' : '#60a5fa'}
                        fontSize="10"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        → {polymorphicType}::calc()
                      </text>

                      <rect x="175" y="112" width="140" height="76" rx="6" fill="#0f172a" stroke="#334155" />
                      <text x="185" y="128" fill="#cbd5e1" fontSize="9" fontFamily="monospace">basic: ₹{basicSalary}</text>
                      <text x="185" y="146" fill="#cbd5e1" fontSize="9" fontFamily="monospace">
                        {polymorphicType === 'Manager' ? `bonus: ₹${managerBonus}` : '(no bonus field)'}
                      </text>
                      <text x="185" y="168" fill="#fbbf24" fontSize="9" fontWeight="bold" fontFamily="monospace">
                        Resolved: ₹{calculatedPolymorphicSalary}
                      </text>

                      <path d="M 115 55 L 160 55" stroke="#ec4899" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
                      <defs>
                        <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                          <polygon points="0 0, 6 3, 0 6" fill="#ec4899" />
                        </marker>
                      </defs>
                    </svg>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: 2D Matrix Multiplication Engine ─── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gold-300 font-mono uppercase">3. Dot Product: C[i][j] = Σ (A[i][k] * B[k][j])</h4>
                    <p className="text-xs text-slate-400">Click a cell in Result Matrix C to trace its dot-product calculation:</p>

                    <div className="flex gap-6 items-center justify-center">
                      <div className="text-center">
                        <span className="text-xs font-mono text-gold-400 font-bold">Matrix A (2x2)</span>
                        <div className="grid grid-cols-2 gap-1.5 p-2 bg-slate-900 rounded-xl border border-gold-900/40 mt-1">
                          {matrixA.map((row, rIdx) =>
                            row.map((val, cIdx) => (
                              <div
                                key={`a-${rIdx}-${cIdx}`}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold transition-all ${
                                  selectedCell.r === rIdx
                                    ? 'bg-gold-600 text-white shadow-md'
                                    : 'bg-slate-800 text-slate-300'
                                }`}
                              >
                                {val}
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      <span className="text-xl font-bold text-slate-600">×</span>

                      <div className="text-center">
                        <span className="text-xs font-mono text-emerald-400 font-bold">Matrix B (2x2)</span>
                        <div className="grid grid-cols-2 gap-1.5 p-2 bg-slate-900 rounded-xl border border-emerald-900/40 mt-1">
                          {matrixB.map((row, rIdx) =>
                            row.map((val, cIdx) => (
                              <div
                                key={`b-${rIdx}-${cIdx}`}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold transition-all ${
                                  selectedCell.c === cIdx
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : 'bg-slate-800 text-slate-300'
                                }`}
                              >
                                {val}
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      <span className="text-xl font-bold text-slate-600">=</span>

                      <div className="text-center">
                        <span className="text-xs font-mono text-amber-400 font-bold">Matrix C (Select)</span>
                        <div className="grid grid-cols-2 gap-1.5 p-2 bg-slate-900 rounded-xl border border-amber-900/40 mt-1">
                          {[0, 1].map(r =>
                            [0, 1].map(c => (
                              <motion.button
                                key={`c-${r}-${c}`}
                                aria-label={`Select Matrix C cell row ${r} column ${c}`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  setSelectedCell({ r, c });
                                  audioManager.play('tap');
                                }}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold border transition-all ${
                                  selectedCell.r === r && selectedCell.c === c
                                    ? 'bg-amber-500 border-amber-300 text-slate-950 shadow-lg'
                                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                                }`}
                              >
                                C[{r}][{c}]
                              </motion.button>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col justify-center space-y-3">
                    <span className="text-xs text-gold-400 font-mono">
                      Step-by-step Dot Product for Cell C[{selectedCell.r}][{selectedCell.c}]:
                    </span>
                    <div className="p-4 bg-slate-950 rounded-xl font-mono text-xs text-slate-200 border border-slate-800 space-y-2">
                      <p className="text-gold-300">
                        Row {selectedCell.r} of A: [{matrixA[selectedCell.r].join(', ')}]
                      </p>
                      <p className="text-emerald-300">
                        Col {selectedCell.c} of B: [{matrixB[0][selectedCell.c]}, {matrixB[1][selectedCell.c]}]
                      </p>
                      <div className="pt-2 border-t border-slate-800 text-amber-300 font-bold">
                        {calculatedMatrixProductCell.formula}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">
                      Triple nested loop: <code className="text-gold-300">for(i) for(j) for(k)</code> accumulates sum into C[i][j].
                    </p>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: Swing GUI Architecture Sandbox ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h4 className="text-sm font-bold text-gold-300 font-mono uppercase">
                      4. LayoutManager Dynamic Behavior
                    </h4>
                    <div className="flex gap-2">
                      {(['BorderLayout', 'FlowLayout', 'GridLayout'] as const).map(lName => (
                        <motion.button
                          key={lName}
                          aria-label={`Select Layout ${lName}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedLayout(lName);
                            audioManager.play('tap');
                          }}
                          className={`px-3 py-1.5 rounded-xl font-mono text-xs border transition-all ${
                            selectedLayout === lName
                              ? 'bg-gold-600 border-gold-400 text-white shadow-md'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          {lName}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-slate-900 rounded-2xl border-2 border-slate-700 min-h-[220px] flex items-center justify-center">
                    {selectedLayout === 'BorderLayout' && (
                      <div className="w-full max-w-md h-48 grid grid-rows-3 grid-cols-3 gap-2">
                        <div className="col-span-3 bg-red-950/60 border border-red-700 rounded-lg flex items-center justify-center text-xs font-mono text-red-200">
                          NORTH (Title / Display)
                        </div>
                        <div className="bg-gold-950/60 border border-gold-700 rounded-lg flex items-center justify-center text-xs font-mono text-gold-200">
                          WEST
                        </div>
                        <div className="bg-emerald-950/60 border border-emerald-700 rounded-lg flex items-center justify-center text-xs font-mono text-emerald-200 font-bold">
                          CENTER (Expands)
                        </div>
                        <div className="bg-purple-950/60 border border-purple-700 rounded-lg flex items-center justify-center text-xs font-mono text-purple-200">
                          EAST
                        </div>
                        <div className="col-span-3 bg-amber-950/60 border border-amber-700 rounded-lg flex items-center justify-center text-xs font-mono text-amber-200">
                          SOUTH (Status / Action Buttons)
                        </div>
                      </div>
                    )}

                    {selectedLayout === 'FlowLayout' && (
                      <div className="w-full flex flex-wrap gap-2 justify-center items-center p-4">
                        {Array.from({ length: guiComponentsCount }).map((_, i) => (
                          <motion.button
                            key={i}
                            aria-label={`FlowLayout JButton item ${i + 1}`}
                            whileHover={{ scale: 1.05 }}
                            className="px-4 py-2 bg-gold-700/70 border border-gold-500 rounded-xl text-xs font-mono text-white shadow"
                          >
                            JButton "{i + 1}"
                          </motion.button>
                        ))}
                      </div>
                    )}

                    {selectedLayout === 'GridLayout' && (
                      <div className="w-full max-w-sm grid grid-cols-3 gap-2 p-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div
                            key={i}
                            className="h-14 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-xs font-mono text-slate-200 font-bold"
                          >
                            Cell {i + 1}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: Network Protocol Stack & Packet Journey ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h4 className="text-sm font-bold text-gold-300 font-mono uppercase">
                      5. OSI & TCP/IP Packet Encapsulation
                    </h4>
                    <div className="flex gap-2">
                      {(['HTTP', 'TCP', 'UDP', 'DNS'] as const).map(pName => (
                        <motion.button
                          key={pName}
                          aria-label={`Select protocol ${pName}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setActiveProtocol(pName);
                            audioManager.play('tap');
                          }}
                          className={`px-3 py-1.5 rounded-xl font-mono text-xs border transition-all ${
                            activeProtocol === pName
                              ? 'bg-gold-600 border-gold-400 text-white shadow-md'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          {pName}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <span className="text-xs text-slate-400 font-mono mb-2">Protocol Architecture & Encapsulation Flow</span>
                    <svg viewBox="0 0 540 130" className="w-full max-w-lg" aria-label="OSI 7 Layer Protocol Stack Encapsulation SVG">
                      <g transform="translate(10, 10)">
                        <rect x="0" y="0" width="100" height="22" rx="4" fill="#3b82f6" opacity="0.9" />
                        <text x="50" y="15" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">7. Application</text>
                        <rect x="0" y="26" width="100" height="22" rx="4" fill="#6366f1" opacity="0.85" />
                        <text x="50" y="41" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">4. Transport ({activeProtocol})</text>
                        <rect x="0" y="52" width="100" height="22" rx="4" fill="#8b5cf6" opacity="0.8" />
                        <text x="50" y="67" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">3. Network (IP)</text>
                        <rect x="0" y="78" width="100" height="22" rx="4" fill="#ec4899" opacity="0.8" />
                        <text x="50" y="93" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">2/1. DataLink/Phys</text>
                      </g>

                      <g transform="translate(130, 15)">
                        <rect x="0" y="15" width="260" height="60" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                        <text x="130" y="35" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                          [ Header: {activeProtocol} | Payload Data | Checksum ]
                        </text>
                        <text x="130" y="55" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">
                          Encapsulated Packet Stream → Physical Bits on Wire
                        </text>
                        <line x1="20" y1="62" x2="240" y2="62" stroke="#ec4899" strokeWidth="2" strokeDasharray="6,4" />
                      </g>

                      <g transform="translate(415, 10)">
                        <rect x="0" y="0" width="100" height="22" rx="4" fill="#10b981" opacity="0.9" />
                        <text x="50" y="15" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">7. Application</text>
                        <rect x="0" y="26" width="100" height="22" rx="4" fill="#059669" opacity="0.85" />
                        <text x="50" y="41" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">4. Transport ({activeProtocol})</text>
                        <rect x="0" y="52" width="100" height="22" rx="4" fill="#047857" opacity="0.8" />
                        <text x="50" y="67" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">3. Network (IP)</text>
                        <rect x="0" y="78" width="100" height="22" rx="4" fill="#065f46" opacity="0.8" />
                        <text x="50" y="93" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">2/1. DataLink/Phys</text>
                      </g>
                    </svg>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
                    <canvas ref={canvasRef} width={560} height={190} className="w-full block" />
                    <div className="absolute top-2 left-3 text-xs font-mono text-slate-400">
                      Sender (IRCTC Client)
                    </div>
                    <div className="absolute top-2 right-3 text-xs font-mono text-slate-400">
                      Receiver (Data Centre Server)
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-slate-400">
                      Active: <span className="text-white font-mono font-bold">{activeProtocol}</span> (
                      {activeProtocol === 'HTTP' || activeProtocol === 'DNS'
                        ? 'Application Layer'
                        : 'Transport Layer'}
                      )
                    </p>
                    <motion.button
                      aria-label="Send Packet Down Protocol Stack"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLaunchPacket}
                      disabled={isPacketTransmitting}
                      className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 font-mono"
                    >
                      🚀 Send Packet Down Stack
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Guided Inquiry: Observation Questions */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-gold-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold">
                    Observation Probe ({currentObsIdx + 1}/{OBSERVATION_QUESTIONS.length})
                  </span>
                  <span className="text-xs text-slate-500 font-mono">What did you notice?</span>
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-slate-200">
                  {OBSERVATION_QUESTIONS[currentObsIdx].question}
                </h4>

                <div className="space-y-2">
                  {OBSERVATION_QUESTIONS[currentObsIdx].observableOptions.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        if (!obsSubmitted) setSelectedObs(oIdx);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-mono border transition-all ${
                        selectedObs === oIdx
                          ? 'bg-gold-600/80 border-gold-400 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {!obsSubmitted && selectedObs !== null && (
                  <button
                    onClick={() => {
                      setObsSubmitted(true);
                      audioManager.play('tap');
                    }}
                    className="px-4 py-1.5 bg-gold-600 hover:bg-gold-500 font-bold text-xs rounded-xl text-white shadow"
                  >
                    Confirm Observation
                  </button>
                )}

                {obsSubmitted && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                    <p className="text-emerald-400 font-mono">
                      ✓ Analysis: {OBSERVATION_QUESTIONS[currentObsIdx].explanation}
                    </p>
                    {currentObsIdx < OBSERVATION_QUESTIONS.length - 1 && (
                      <button
                        onClick={() => {
                          setCurrentObsIdx(c => c + 1);
                          setSelectedObs(null);
                          setObsSubmitted(false);
                        }}
                        className="mt-2 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-white rounded font-mono"
                      >
                        Next Observation Question →
                      </button>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  aria-label="Go to Previous Lab"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl"
                >
                  ← Previous Lab
                </motion.button>
                <span className="text-xs font-mono text-slate-500">
                  Slide {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    aria-label="Go to Next Lab"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('tap');
                    }}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Enter Free Sandbox Mode"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg"
                  >
                    Enter Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE-PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Unrestricted Play Mode</span>
              <h2 className="text-xl font-bold text-white">Interactive Sandbox: All 10 Node Controls</h2>
              <p className="text-slate-400 text-xs mt-1">
                Freely experiment with polymorphism, matrix multiplication, GUI layouts, and packet routing.
              </p>
            </div>
            <motion.button
              aria-label="Advance to Official Challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-600/30 whitespace-nowrap"
            >
              Ready for Official Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sandbox Card 1: Matrix Multiplier */}
            <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-gold-400 font-bold">Matrix Compute Playground</span>
              <div className="flex gap-4 items-center justify-center py-2">
                <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950 rounded-lg">
                  {matrixA.map((r, i) =>
                    r.map((v, j) => (
                      <div key={`sa-${i}-${j}`} className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-xs font-mono font-bold">
                        {v}
                      </div>
                    ))
                  )}
                </div>
                <span className="font-bold text-slate-500">×</span>
                <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950 rounded-lg">
                  {matrixB.map((r, i) =>
                    r.map((v, j) => (
                      <div key={`sb-${i}-${j}`} className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-xs font-mono font-bold">
                        {v}
                      </div>
                    ))
                  )}
                </div>
                <span className="font-bold text-slate-500">=</span>
                <div className="grid grid-cols-2 gap-1 p-1 bg-gold-950/60 rounded-lg border border-gold-700">
                  {[0, 1].map(i =>
                    [0, 1].map(j => (
                      <div key={`sc-${i}-${j}`} className="w-8 h-8 rounded bg-gold-900/80 flex items-center justify-center text-xs font-mono font-bold text-gold-200">
                        {matrixA[i][0] * matrixB[0][j] + matrixA[i][1] * matrixB[1][j]}
                      </div>
                    ))
                  )}
                </div>
              </div>
              <p className="text-xs text-slate-400 text-center font-mono">Product C calculated instantaneously across 4 dot-products</p>
            </div>

            {/* Sandbox Card 2: Polymorphism Gauge */}
            <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold">Polymorphic Dispatcher Playground</span>
              <div className="flex gap-2">
                <button
                  aria-label="Toggle Sandbox to Employee"
                  onClick={() => setPolymorphicType('Employee')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold ${
                    polymorphicType === 'Employee' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Employee
                </button>
                <button
                  aria-label="Toggle Sandbox to Manager"
                  onClick={() => setPolymorphicType('Manager')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold ${
                    polymorphicType === 'Manager' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Manager
                </button>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">Dispatched Output:</span>
                <span className="text-lg font-bold text-white font-mono">₹{calculatedPolymorphicSalary.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: PROGRESSIVE CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Status Header */}
          <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-white">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </h2>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-xs px-2.5 py-0.5 rounded-full font-mono uppercase font-bold border ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                      : difficulty === 'advanced'
                      ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                      : 'bg-gold-950/60 border-gold-500 text-gold-300'
                  }`}
                >
                  {difficulty}
                </motion.span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-gold-300 font-mono">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">Node ID: {challenge.nodeId}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs text-slate-500 font-mono">BKT Mastery Level</span>
                <div className="text-sm font-bold text-gold-300 capitalize font-mono">{masteryLevel}</div>
              </div>
              <div className="w-32 h-3 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-500 to-emerald-400"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Challenge Prompt Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900/90 rounded-3xl border space-y-6 transition-all ${
              wrongFlash
                ? 'bg-rose-950/40 border-rose-500'
                : 'border-slate-800'
            }`}
          >
            <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {challenge.question}
            </h3>

            {/* MCQ Types */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      className={`text-left p-4 rounded-2xl text-sm border transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : showExplanation && i !== challenge.correctIndex
                          ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                          : 'bg-slate-800/70 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-gold-500/60'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-700/70 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                          {showExplanation && i === challenge.correctIndex ? '✓' : String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag-Label Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="w-full text-xs text-slate-400 font-mono mb-1">Drag Labels from Palette:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-1.5 bg-gold-600 text-white text-xs font-mono rounded-xl cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {challenge.dragItems.map((item, idx) => {
                    const targetId = item.targetId;
                    const filledVal = droppedLabels[targetId];
                    return (
                      <div
                        key={idx}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId)}
                        className={`p-4 rounded-2xl border-2 border-dashed flex items-center justify-between ${
                          filledVal
                            ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200'
                            : 'bg-slate-950/50 border-slate-700 text-slate-400'
                        }`}
                      >
                        <span className="text-xs font-mono uppercase tracking-wider">{targetId.replace('target_', '')} Slot:</span>
                        <span className="font-mono text-sm font-bold">{filledVal ? `✓ ${filledVal}` : 'Drop Here'}</span>
                      </div>
                    );
                  })}
                </div>

                <motion.button
                  aria-label="Verify Mappings"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400 font-mono">Drag rows to arrange in the exact logical order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sortable row item: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-sm text-slate-200 flex items-center gap-3 cursor-grab"
                    >
                      <span className="w-6 h-6 rounded-lg bg-gold-900/60 text-gold-300 font-mono text-xs flex items-center justify-center font-bold">
                        {displayIndex + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Check Step Order"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length > 0
                        ? sortArrangement
                        : (challenge.sortItems || []).map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Check Step Order
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 max-w-sm">
                  <input
                    aria-label="Enter calculated number"
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated number"
                    className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                  />
                  {challenge.unit && <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>}
                  <motion.button
                    aria-label="Submit Numeric Answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl font-mono shadow"
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      aria-label={`Add code block part: ${part}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-gold-300 rounded-xl border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[80px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1 bg-gold-950 border border-gold-700 text-gold-200 text-xs font-mono rounded-xl flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        aria-label={`Remove part: ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 font-bold hover:text-rose-300"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 font-mono">Click code blocks above to construct Java construct</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify Code Structure"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify Code Structure
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation Reveal */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-gradient-to-br from-gold-950/50 to-slate-900 rounded-2xl border border-gold-700/60 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-mono tracking-wider text-gold-400 font-bold">
                    ISC Examiner Technical Analysis
                  </span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.p
                        key={sIdx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans"
                      >
                        <span className="font-mono font-bold text-gold-300 mr-1.5">[{sIdx + 1}]</span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show Next Explanation Step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-gold-800 hover:bg-gold-700 text-white text-xs font-mono rounded-xl font-bold"
                    >
                      Show Next Explanation Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Proceed to Next Challenge"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mastery Assessment →' : 'Proceed to Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-gold-950/60 rounded-3xl border border-emerald-500/40 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 mx-auto flex items-center justify-center text-3xl shadow-lg">
              🏆
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors >= 1 && errors <= 3
                ? 'Great work!'
                : errors >= 4 && errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have navigated Java OOP inheritance chaining, polymorphic method execution, matrix algorithms, Swing GUI architectures, and the 7-layer OSI networking stack.
            </p>

            <div className="flex justify-center gap-6 pt-4 font-mono">
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-500">Calculated Score</span>
                <div className="text-2xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-500">Mastery Level</span>
                <div className="text-2xl font-bold text-gold-400 capitalize">{masteryLevel}</div>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-500">Total Errors</span>
                <div className="text-2xl font-bold text-rose-400">{errors}</div>
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/50 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 font-mono">Personalized Misconception Gaps Identified:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, idx) => {
                  const mObj = misconceptions?.[mIdx];
                  if (!mObj) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-rose-900/40 text-xs space-y-1">
                      <p className="text-rose-400 font-medium font-mono">✗ Misconception: {mObj.misconception}</p>
                      <p className="text-emerald-300">✓ CISCE Rule: {mObj.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Challenge Card */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-gold-900/50 space-y-3">
            <span className="text-xs font-mono uppercase text-gold-400 font-bold">Capstone Real-World Project</span>
            <h3 className="text-lg font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i} className="text-xs text-slate-400 font-mono flex items-start gap-2">
                  <span className="text-gold-400 font-bold">{i + 1}.</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Spaced Repetition Schedule Banner */}
          <div className="p-4 bg-amber-950/30 rounded-2xl border border-amber-800/40 flex items-center justify-between text-xs font-mono text-amber-300">
            <span>📅 SM-2 Spaced Repetition Schedule:</span>
            <span className="font-bold">
              Review due in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
            </span>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Simulation Milestone Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C11_ComputerScienceJavaComplexProgramSim;
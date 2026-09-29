'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 12 COMPUTER SCIENCE NODE IDS ───
const NODE_C12_CS_061 = 'c12_cs_061'; // Software testing - unit testing, integration testing, JUnit, TDD
const NODE_C12_CS_062 = 'c12_cs_062'; // Version control with Git - repositories, commits, branches, merging
const NODE_C12_CS_063 = 'c12_cs_063'; // Agile and Scrum - sprints, user stories, standups, retrospectives
const NODE_C12_CS_064 = 'c12_cs_064'; // Software documentation - README, API docs, UML diagrams, comments
const NODE_C12_CS_065 = 'c12_cs_065'; // DevOps and CI/CD - Jenkins, automated builds, deployment pipelines
const NODE_C12_CS_066 = 'c12_cs_066'; // Code quality and refactoring - clean code, code smells, refactoring
const NODE_C12_CS_067 = 'c12_cs_067'; // Project management - estimation, risk management, team collaboration
const NODE_C12_CS_068 = 'c12_cs_068'; // Open source and licensing - GPL, MIT, Apache, contributing
const NODE_C12_CS_069 = 'c12_cs_069'; // Computer graphics intro - pixels, coordinates, Bresenham & DDA, transformations
const NODE_C12_CS_070 = 'c12_cs_070'; // Compiler design intro - lexical, syntax, semantic analysis, code generation

const ALL_NODE_IDS = [
  NODE_C12_CS_061,
  NODE_C12_CS_062,
  NODE_C12_CS_063,
  NODE_C12_CS_064,
  NODE_C12_CS_065,
  NODE_C12_CS_066,
  NODE_C12_CS_067,
  NODE_C12_CS_068,
  NODE_C12_CS_069,
  NODE_C12_CS_070,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: The IRCTC Next-Gen Ticketing Architecture Crisis',
  intro: 'You have been appointed Chief Systems Architect for the Indian Railways IRCTC Next-Gen Core Engine upgrade in Bengaluru. Tatkal surge traffic caused checkout failures, merge conflicts halted sprint releases, compiler AST type mismatches leaked into production, and un-optimized raster rendering lagged dynamic seat maps.',
  context: 'To deliver a bulletproof 99.999% uptime release across 10 engineering domains, you must master the full software engineering lifecycle: Test-Driven Development with JUnit 4, Git distributed versioning, Agile Scrum sprints, UML & Javadoc documentation, Jenkins automated CI/CD pipelines, clean code refactoring, WBS & critical path estimation, Open Source licensing, Bresenham pixel rasterization, and 6-phase compiler construction.',
};

// ─── DISCOVERY QUESTION (Curiosity Hook) ───
const DISCOVERY_QUESTION = {
  question: 'In Test-Driven Development (TDD), why is a developer REQUIRED to write a failing test before writing any functional production code?',
  options: [
    'To guarantee the test code itself actually fails when behavior is missing and proves that new code makes it pass',
    'To benchmark execution speed against the hardware CPU clock',
    'To automatically generate UML class diagrams before writing Java code',
    'To satisfy Jenkins CI build triggers without compiling bytecode'
  ],
  correctIndex: 0,
  hintAfter: 'Remember: If a test passes before you write any code, your test is flawed! You must see Red before you earn Green.',
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
  nodeId: NODE_C12_CS_061,
  title: 'ISC Class 12 Software Engineering & Computer Science Synthesis',
  definition: 'Comprehensive software engineering and computational foundations covering JUnit 4 unit testing, TDD red-green-refactor cycles, Git distributed version control, Agile Scrum rituals, technical documentation & UML architecture, automated Jenkins CI/CD pipelines, clean code refactoring, project estimation & risk registers, open-source licensing semantics, Bresenham & DDA coordinate graphics, and 6-phase compiler construction.',
  eli5: 'Think of building software like constructing an express train network. Unit testing checks every bolt in isolation; Git keeps track of blueprints so engineers do not overwrite each other; Agile plans station builds in 2-week sprints; CI/CD tests and clears trains on automated tracks; Refactoring cleans up tangled wires without shutting power; Graphics plots routes pixel-by-pixel; and Compilers translate passenger commands into train motor machine code.',
  misconceptions: [
    {
      misconception: 'Unit testing means testing the entire application end-to-end with sample inputs.',
      correction: 'Unit testing strictly tests the smallest individual methods or classes in complete isolation; system testing verifies the whole product against requirements.'
    },
    {
      misconception: 'Running git init automatically saves and backs up all files in the working directory.',
      correction: 'git init only initializes local metadata (.git). Files must be staged with git add and snapshotted explicitly with git commit.'
    },
    {
      misconception: 'Agile development means there is no documentation and no long-term planning.',
      correction: 'Agile produces concise, living documentation (like README & API docs) and plans iteratively in time-boxed 2-4 week sprints with product backlogs.'
    },
    {
      misconception: 'Refactoring means adding brand new features and bugfixes to the codebase.',
      correction: 'Refactoring strictly improves internal code structure, readability, and design without altering observable external behavior.'
    },
    {
      misconception: 'Lexical analysis (the scanner) checks grammar rules and builds parse trees.',
      correction: 'Lexical analysis breaks source text into tokens; syntax analysis (the parser) verifies grammar rules and constructs parse trees.'
    }
  ],
  diagnosticQuestions: [
    { question: 'Which JUnit 4 assertion checks floating-point equality with precision tolerance?', options: ['assertEquals(expected, actual, delta)', 'assertEqualFloat(a, b)', 'assertTrue(a == b)', 'assertDelta(expected, actual)'], correctIndex: 0 },
    { question: 'What conflict markers are inserted by Git during an unresolved 3-way merge conflict?', options: ['<<<<<<< HEAD, =======, >>>>>>> [branch]', '[[CONFLICT]], ==MERGE==, [[END]]', '<START_CONFLICT>, <RESOLVE>, <END>', '===BRANCH_A===, ---DIFF---, ===BRANCH_B==='], correctIndex: 0 },
    { question: 'What is the standard time-box length for a Scrum Sprint?', options: ['2 to 4 weeks', '6 to 12 months', '1 to 2 days', 'Variable up to 1 year'], correctIndex: 0 },
    { question: 'In UML class diagrams, which symbol represents class inheritance (is-a)?', options: ['Solid line with a hollow triangle arrowhead pointing to parent', 'Solid line with a filled diamond at owner end', 'Dashed line with open arrow', 'Hollow diamond pointing to child'], correctIndex: 0 },
    { question: 'Which CI/CD pipeline stage automatically compiles source files and resolves external dependencies?', options: ['Build stage', 'Deploy stage', 'Retrospective stage', 'Staging validation'], correctIndex: 0 },
    { question: 'Which code smell occurs when a method in Class A excessively accesses getters and setters of Class B?', options: ['Feature Envy', 'Primitive Obsession', 'Dead Code', 'Shotgun Surgery'], correctIndex: 0 },
    { question: 'In project management, what defines the Critical Path on a Gantt network diagram?', options: ['The longest sequence of dependent tasks that determines shortest project duration', 'The cheapest set of non-critical tasks', 'The shortest path with zero risk factors', 'Tasks assigned only to senior architects'], correctIndex: 0 },
    { question: 'Which open source license is strictly copyleft and requires all derivative distributed works to remain open source under the same license?', options: ['GNU General Public License (GPL)', 'MIT License', 'Apache License 2.0', 'BSD 2-Clause License'], correctIndex: 0 }
  ],
  masteryCriteria: 'Demonstrate rigorous conceptual and practical mastery across all 10 ISC Class 12 CS nodes through interactive TDD simulations, Git branch merging, CI/CD pipeline assembly, pixel rasterization algorithms, and AST compiler transformations.',
};

// ─── BRILLIANT.ORG INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The TDD Red-Green-Refactor Engine',
    instruction: 'Click the Red, Green, and Refactor buttons in order to step through writing a GSTCalculator unit test suite.',
    interactionType: 'tdd-cycle',
    nodeId: NODE_C12_CS_061,
  },
  {
    title: 'Lab 2: Git Distributed Branching & Merge Graph',
    instruction: 'Toggle branches and create commits to observe how fast-forward vs 3-way merges construct git commit DAG nodes.',
    interactionType: 'git-branching',
    nodeId: NODE_C12_CS_062,
  },
  {
    title: 'Lab 3: Automated Jenkins CI/CD Delivery Pipeline',
    instruction: 'Trigger the webhook build to watch code flow through Build (javac), Test (JUnit), and Deploy (Server) stages with live status telemetry.',
    interactionType: 'cicd-pipeline',
    nodeId: NODE_C12_CS_065,
  },
  {
    title: 'Lab 4: Bresenham vs DDA Line Rasterization Engine',
    instruction: 'Adjust the line slope slider and toggle between DDA (floating-point) and Bresenham (integer decision parameter) to see real-time pixel quantization on the screen grid.',
    interactionType: 'graphics-rasterizer',
    nodeId: NODE_C12_CS_069,
  },
  {
    title: 'Lab 5: 6-Phase Compiler Translation & AST Inspector',
    instruction: 'Inspect how source code statements are tokenized by the scanner, parsed into an AST tree, and validated in the symbol table.',
    interactionType: 'compiler-pipeline',
    nodeId: NODE_C12_CS_070,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you draw a line from (2, 2) to (8, 5) with dx=6 and dy=3 (slope m = 0.5), which algorithm requires rounding floating-point arithmetic at every intermediate step?',
    options: ['DDA Line Drawing Algorithm', "Bresenham's Integer Algorithm", 'Midpoint Circle Algorithm', 'Matrix Homogeneous Scaling'],
    correctIndex: 0,
    verifyInstruction: 'Go to Lab 4, select DDA mode, and move the slope slider to watch fractional y increments like (3, 2.5) round to (3, 3).',
    nodeId: NODE_C12_CS_069,
  },
  {
    question: 'Predict: If developer Aarav commits to branch "feature-tatkal" while main branch advances with 2 new commits, what type of merge will Git execute?',
    options: ['3-Way Merge creating a dedicated merge commit', 'Fast-Forward merge sliding the pointer forward silently', 'Direct rebase with automatic deletion of history', 'Stash pop rejection'],
    correctIndex: 0,
    verifyInstruction: 'Explore Lab 2 and simulate simultaneous commits on main and feature branches to trigger a 3-way DAG merge commit.',
    nodeId: NODE_C12_CS_062,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the Decision Parameter (Pk) in Bresenham line rasterization when moving from one pixel to the next?',
    observableOptions: [
      'It uses purely integer addition and subtraction without any floating-point division or rounding',
      'It requires computing trigonometric sine and cosine functions',
      'It converts Cartesian coordinates directly into 3D ray tracing matrices',
      'It increases execution time exponentially with line length'
    ],
    correctIndex: 0,
    nodeId: NODE_C12_CS_069,
  },
  {
    question: 'In the Compiler Design visualization, what happens when an undeclared identifier like "x" in "int total = 45 + x;" passes syntax parsing into Semantic Analysis?',
    observableOptions: [
      'The Syntax Parser approves the grammar, but the Semantic Analyser flags a Symbol Table lookup error',
      'The Lexical Scanner immediately crashes and refuses to generate tokens',
      'The Target Code Generator outputs machine bytecode with default zero value',
      'The Intermediate Code generator converts it into an infinite loop'
    ],
    correctIndex: 0,
    nodeId: NODE_C12_CS_070,
  },
];

// ─── 20+ RICH CHALLENGES (NEP 2020 / CISCE 2026 COMPETENCY ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // 1. c12_cs_061: Unit Testing & JUnit 4 (Foundation - Recall)
  {
    id: 'ch_cs_061_1',
    nodeId: NODE_C12_CS_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In JUnit 4 testing framework, which annotation specifies a method that MUST execute before every individual test method to set up fresh test fixtures?',
    options: ['@Before', '@BeforeClass', '@Test', '@SetUpAll'],
    correctIndex: 0,
    explanation: 'In JUnit 4, @Before executes prior to each @Test method to initialize state. @BeforeClass runs only once before all tests in the class.',
    hints: [
      'Think of preparing a fresh object before running each isolated test method.',
      'The annotation name starts with @B and consists of a single 6-letter English word.',
      'It is @Before (unlike JUnit 5 which uses @BeforeEach).'
    ],
    misconceptionIndex: 0,
  },
  // 2. c12_cs_061: TDD Red-Green-Refactor (Foundation - Drag-Sort)
  {
    id: 'ch_cs_061_2',
    nodeId: NODE_C12_CS_061,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the core phases of the Test-Driven Development (TDD) cycle in the strict sequential order prescribed by software engineering standards.',
    sortItems: [
      'Write a failing unit test for the missing feature (RED)',
      'Write the minimal production code necessary to make the test pass (GREEN)',
      'Clean up and optimize code structure while ensuring all tests stay green (REFACTOR)'
    ],
    correctOrder: [0, 1, 2],
    explanation: 'TDD follows RED (write failing test) -> GREEN (make it pass with minimal code) -> REFACTOR (clean code without altering external behavior).',
    hints: [
      'You cannot refactor before tests exist and pass.',
      'First see the test fail, then write code to pass, then clean up.',
      'Order: Red -> Green -> Refactor.'
    ],
    misconceptionIndex: 0,
  },
  // 3. c12_cs_061: JUnit Floating Point Assertion (Standard - Application)
  {
    id: 'ch_cs_061_3',
    nodeId: NODE_C12_CS_061,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An Indian fintech IRCTC payment gateway calculates 18% GST on a ₹1250.50 ticket. Which JUnit 4 assertion correctly verifies the expected ₹225.09 tax with a 0.001 precision delta?',
    options: [
      'Assert.assertEquals(225.09, gstCalc.calculate(1250.50, 18.0), 0.001);',
      'Assert.assertEquals(gstCalc.calculate(1250.50, 18.0), 225.09);',
      'Assert.assertTrue(gstCalc.calculate(1250.50, 18.0) == 225.09);',
      'Assert.assertFloatEqual(225.09, 0.001, gstCalc.calculate(1250.50, 18.0));'
    ],
    correctIndex: 0,
    explanation: 'In JUnit 4, floating-point equality requires assertEquals(expected, actual, delta). Comparing doubles with == or omitting delta leads to precision failure.',
    hints: [
      'JUnit assertions place expected value FIRST, actual value SECOND.',
      'Double comparisons require a 3rd parameter: the allowable delta tolerance.',
      'Select Assert.assertEquals(expected, actual, delta).'
    ],
    misconceptionIndex: 0,
  },
  // 4. c12_cs_062: Git Workflow (Foundation - Recall)
  {
    id: 'ch_cs_062_1',
    nodeId: NODE_C12_CS_062,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What command moves modified files from the Git Working Directory into the Staging Area prior to committing?',
    options: ['git add <filename>', 'git commit -m "update"', 'git stage --all-save', 'git push origin main'],
    correctIndex: 0,
    explanation: 'git add stages modified files into index. git commit then snapshots staged changes into the repository database.',
    hints: [
      'Think of packing items into a box before sealing and labeling it.',
      'The command verb is a 3-letter word meaning to combine or append.',
      'It is git add.'
    ],
    misconceptionIndex: 1,
  },
  // 5. c12_cs_062: Git Merge Conflict Resolution (Standard - Analysis)
  {
    id: 'ch_cs_062_2',
    nodeId: NODE_C12_CS_062,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Order the precise sequence of operations an engineer in Bengaluru must execute when Git halts with merge conflict markers in PassengerBooking.java.',
    sortItems: [
      'Open PassengerBooking.java and review <<<<<<< HEAD, =======, and >>>>>>> markers',
      'Manually edit the file to select desired code and delete all conflict marker lines',
      'Stage the resolved file using git add PassengerBooking.java',
      'Finalize the merge by running git commit -m "Resolve merge conflict in PassengerBooking"'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Conflict resolution requires: Inspecting markers -> Editing & removing markers -> Staging with git add -> Committing the merge.',
    hints: [
      'You cannot stage or commit a file while conflict markers still remain inside.',
      'Review -> Clean up -> Stage (add) -> Finalize (commit).',
      'Follow the standard 4-step manual resolution flow.'
    ],
    misconceptionIndex: 1,
  },
  // 6. c12_cs_062: Git Remote Collaboration (Advanced - Application)
  {
    id: 'ch_cs_062_3',
    nodeId: NODE_C12_CS_062,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A Chennai development team wants to contribute a new UPI payment gateway to a shared GitHub enterprise repository without breaking the production main branch. What is the standard professional workflow?',
    options: [
      'Clone repo -> Create feature branch -> Commit changes -> Push feature branch -> Open Pull Request -> Peer Review -> Merge into main',
      'Commit directly to main branch -> Force push with git push -f -> Inform team on WhatsApp',
      'Fork repo -> Delete git history -> Reinitialize git init -> Email zipped folder to team lead',
      'Pull main branch -> Disable unit tests -> Run git merge --no-verify'
    ],
    correctIndex: 0,
    explanation: 'The standard GitHub PR workflow isolates work on feature branches, triggers automated CI validation, and requires peer code review before merging.',
    hints: [
      'Never push untested code directly to production main.',
      'Look for the sequence using feature branches and Pull Requests (PRs).',
      'Clone -> Branch -> Commit -> Push -> PR -> Review -> Merge.'
    ],
    misconceptionIndex: 1,
  },
  // 7. c12_cs_063: Agile Scrum Roles (Foundation - Match)
  {
    id: 'ch_cs_063_1',
    nodeId: NODE_C12_CS_063,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Map each Scrum role to its primary software development responsibility.',
    dragItems: [
      { label: 'Prioritizes Product Backlog & represents customer value', targetId: 'role_po' },
      { label: 'Facilitates Scrum ceremonies & clears technical blockers', targetId: 'role_sm' },
      { label: 'Self-organizing cross-functional team that builds the sprint increment', targetId: 'role_dev' }
    ],
    correctMapping: {
      role_po: 'Prioritizes Product Backlog & represents customer value',
      role_sm: 'Facilitates Scrum ceremonies & clears technical blockers',
      role_dev: 'Self-organizing cross-functional team that builds the sprint increment'
    },
    explanation: 'Product Owner owns WHAT to build (backlog priority); Scrum Master protects HOW the team works (process & blockers); Dev Team builds the software.',
    hints: [
      'The Product Owner focuses on business value and user requirements.',
      'The Scrum Master is not a manager, but a servant-leader facilitator.',
      'The Development Team decides technical implementation.'
    ],
    misconceptionIndex: 2,
  },
  // 8. c12_cs_063: User Story Formulation (Standard - Application)
  {
    id: 'ch_cs_063_2',
    nodeId: NODE_C12_CS_063,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Which of the following represents a syntactically correct, high-quality Agile User Story for an Indian railway ticket booking application?',
    options: [
      'As a Tatkal passenger, I can download an offline PDF ticket so that I can show valid proof of travel to the TTE without internet connectivity.',
      'The backend database server must support PostgreSQL 15 and store 10 million rows in the booking table.',
      'Build a login screen with green buttons and password hashing for users.',
      'As a system administrator, the software should run fast and have no bugs.'
    ],
    correctIndex: 0,
    explanation: 'A well-formed user story strictly follows: "As a [role], I can [feature] so that [benefit]". Option A specifies role (passenger), feature (PDF ticket), and benefit (TTE verification offline).',
    hints: [
      'Look for the format: "As a [Role], I can [Action/Feature] so that [Clear Benefit]".',
      'Technical database requirements or vague design notes are not user stories.',
      'Option A provides user context, action, and business value.'
    ],
    misconceptionIndex: 2,
  },
  // 9. c12_cs_064: Software Documentation & UML (Foundation - Classify)
  {
    id: 'ch_cs_064_1',
    nodeId: NODE_C12_CS_064,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In UML Class Diagrams, what notation denotes a private attribute and a public method respectively?',
    options: [
      '- (hyphen) for private, + (plus) for public',
      '+ (plus) for private, - (hyphen) for public',
      '# (hash) for private, * (asterisk) for public',
      'prv: for private, pub: for public'
    ],
    correctIndex: 0,
    explanation: 'Standard UML visibility symbols are: - (private), + (public), # (protected), and ~ (package-private).',
    hints: [
      'Minus hides things (private), plus exposes things (public).',
      'Think of math signs: minus represents restriction, plus represents openness.',
      'Select - for private and + for public.'
    ],
    misconceptionIndex: 3,
  },
  // 10. c12_cs_064: Javadoc API Documentation (Standard - Application)
  {
    id: 'ch_cs_064_2',
    nodeId: NODE_C12_CS_064,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the opening Javadoc tag sequence for a method "double computeFare(int distanceKm)" that can throw InvalidDistanceException.',
    availableParts: ['/**', '* @param distanceKm', '* @return computed fare', '* @throws InvalidDistanceException', '*/'],
    targetState: '/** * @param distanceKm * @return computed fare * @throws InvalidDistanceException */',
    validationHint: 'Assemble: /** -> @param -> @return -> @throws -> */',
    explanation: 'Javadoc comments start with /** and document method inputs (@param), outputs (@return), and declared errors (@throws) before closing with */.',
    hints: [
      'Javadoc begins with double asterisk /**.',
      'Parameters come first (@param), followed by returns (@return), then exceptions (@throws).',
      'Close with */.'
    ],
    misconceptionIndex: 3,
  },
  // 11. c12_cs_065: CI/CD Pipeline Stages (Foundation - Drag-Sort)
  {
    id: 'ch_cs_065_1',
    nodeId: NODE_C12_CS_065,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequential execution stages of an automated Jenkins CI/CD pipeline triggered by a Git push webhook.',
    sortItems: [
      'Source Checkout: Jenkins clones the latest commit from Git repository',
      'Build Stage: Compile Java source files into bytecode (.class) & resolve JAR dependencies',
      'Test Stage: Execute automated JUnit unit and integration test suites',
      'Deploy Stage: Package artifact into JAR/WAR and release to staging or production server'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'CI/CD pipeline order is: SCM Checkout -> Build/Compile -> Automated Testing -> Automated Deployment.',
    hints: [
      'You cannot compile code before checking it out from Git.',
      'You must test code before deploying it to production.',
      'Checkout -> Build -> Test -> Deploy.'
    ],
    misconceptionIndex: 0,
  },
  // 12. c12_cs_065: CI vs CD Distinction (Standard - Analysis)
  {
    id: 'ch_cs_065_2',
    nodeId: NODE_C12_CS_065,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which statement accurately distinguishes Continuous Integration (CI) from Continuous Deployment (CD)?',
    options: [
      'CI automatically compiles and tests code upon every commit to catch integration errors early; CD automatically deploys validated builds to production environments.',
      'CI is the manual uploading of code to GitHub; CD is writing user stories in Jira.',
      'CI is exclusively for frontend JavaScript; CD is exclusively for backend Java microservices.',
      'CI and CD are exact synonyms for running unit tests in JUnit 4.'
    ],
    correctIndex: 0,
    explanation: 'CI focuses on continuous merging, compiling, and automated testing. CD extends CI by automatically releasing validated builds to target servers.',
    hints: [
      'Integration = building and verifying code together.',
      'Deployment = releasing tested software to users/servers.',
      'CI = build & test; CD = release & deploy.'
    ],
    misconceptionIndex: 0,
  },
  // 13. c12_cs_066: Clean Code & Code Smells (Foundation - Classify)
  {
    id: 'ch_cs_066_1',
    nodeId: NODE_C12_CS_066,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A 450-line Java method in a Delhi school billing software performs marksheets reading, tax calculation, PDF printing, and SMS dispatch. Which code smell does this exemplify?',
    options: ['Long Method & Single Responsibility Principle Violation', 'Primitive Obsession', 'Dead Code', 'Feature Envy'],
    correctIndex: 0,
    explanation: 'A method that handles multiple unrelated tasks and spans hundreds of lines violates the Single Responsibility Principle and is a classic Long Method smell.',
    hints: [
      'A method should do ONE thing, do it well, and do it only.',
      '450 lines doing 4 unrelated jobs is excessively oversized.',
      'It is a Long Method.'
    ],
    misconceptionIndex: 3,
  },
  // 14. c12_cs_066: Refactoring Techniques (Standard - Application)
  {
    id: 'ch_cs_066_2',
    nodeId: NODE_C12_CS_066,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'To eliminate 5 identical duplicate lines calculating GST scattered across 4 different billing methods, which refactoring technique should be applied?',
    options: [
      'Extract Method: move the duplicate calculation into a private calculateGST() helper method and call it from all 4 places',
      'Inline Method: copy the calculation into 10 additional files',
      'Rename: change variable names to single letters x, y, z',
      'Replace Inheritance with Switch Case statements'
    ],
    correctIndex: 0,
    explanation: 'Extract Method eliminates code duplication (DRY principle) by encapsulating the common logic in a reusable helper method.',
    hints: [
      'Don\'t Repeat Yourself (DRY).',
      'Take the repeated code block out and place it inside a new named method.',
      'Select Extract Method.'
    ],
    misconceptionIndex: 3,
  },
  // 15. c12_cs_067: Project Estimation WBS (Standard - Application)
  {
    id: 'ch_cs_067_1',
    nodeId: NODE_C12_CS_067,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An Aadhaar biometric sync module is broken down via WBS into: Schema Design (3 days), API Coding (7 days), Security Audit (4 days, depends on API Coding), and Unit Testing (2 days parallel to Audit). What is the minimum duration in days along the critical path?',
    correctAnswer: 14,
    tolerance: 0,
    unit: 'days',
    explanation: 'The critical path is Schema Design (3) + API Coding (7) + Security Audit (4) = 14 days. Unit Testing (2 days) finishes during the 4-day security audit (float = 2 days).',
    hints: [
      'Identify sequential dependencies: Schema (3) -> API Coding (7) -> Security Audit (4).',
      'Since Unit Testing (2) runs parallel to Security Audit (4), Security Audit dictates the path length.',
      '3 + 7 + 4 = 14 days.'
    ],
    misconceptionIndex: 4,
  },
  // 16. c12_cs_067: Risk Management Matrix (Advanced - Evaluation)
  {
    id: 'ch_cs_067_2',
    nodeId: NODE_C12_CS_067,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An Indian banking software startup faces a High-Probability, High-Impact risk of production database server hardware failure during festive Diwali sales. What is the most rigorous risk management response strategy?',
    options: [
      'Risk Reduction & Avoidance: configure automated multi-region active-passive database clustering with automatic failover and load testing',
      'Risk Acceptance: ignore the risk and apologize on social media if crashes happen',
      'Risk Transfer: delete database backups to save hosting expenses',
      'Decomposition: split the database into 100 separate spreadsheets'
    ],
    correctIndex: 0,
    explanation: 'High-probability, high-impact risks require proactive mitigation (Reduction/Avoidance) through redundancy, clustering, automated failover, and stress testing.',
    hints: [
      'Critical banking infrastructure cannot simply "accept" catastrophic failure.',
      'Technical redundancy (clustering, failovers) lowers probability and impact.',
      'Choose Risk Reduction & Avoidance.'
    ],
    misconceptionIndex: 4,
  },
  // 17. c12_cs_068: Open Source Licensing GPL vs MIT (Standard - Analysis)
  {
    id: 'ch_cs_068_1',
    nodeId: NODE_C12_CS_068,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A Pune commercial software company wants to embed an open-source JSON parser into their proprietary closed-source banking product. Why must they avoid GPL v3 and choose MIT or Apache 2.0 instead?',
    options: [
      'GPL v3 is a strong copyleft license that legally forces any distributed software incorporating it to release its full proprietary source code; MIT/Apache are permissive and permit closed-source commercial redistribution.',
      'GPL v3 costs $5,000 per developer license, while MIT is free of cost.',
      'GPL v3 code cannot run on Linux servers in India.',
      'MIT license prohibits any attribution or copyright notices.'
    ],
    correctIndex: 0,
    explanation: 'GPL is copyleft (viral sharing rule): derivative distributed works must also be GPL open source. Permissive licenses (MIT/Apache) allow proprietary commercial integration with attribution.',
    hints: [
      'Open source "free" refers to freedom, not price.',
      'GPL requires derivative works to also open their source code.',
      'Commercial proprietary software uses permissive licenses like MIT or Apache.'
    ],
    misconceptionIndex: 4,
  },
  // 18. c12_cs_069: Bresenham vs DDA Line Algorithms (Advanced - Analysis)
  {
    id: 'ch_cs_069_1',
    nodeId: NODE_C12_CS_069,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is Bresenham\'s Line Algorithm universally preferred over the Digital Differential Analyzer (DDA) algorithm in graphics hardware and embedded GPUs?',
    options: [
      'Bresenham uses pure integer addition, subtraction, and bit shifting with a decision parameter, avoiding slow floating-point arithmetic and rounding operations required by DDA.',
      'Bresenham draws 3D shaded curved surfaces, while DDA can only draw single points.',
      'DDA only works for negative slopes, whereas Bresenham works only for circles.',
      'Bresenham generates color depth automatically using CMYK color models.'
    ],
    correctIndex: 0,
    explanation: 'DDA calculates fractional coordinates (requiring floating-point addition and rounding at every step). Bresenham uses an integer decision parameter (Pk), making it vastly faster in hardware.',
    hints: [
      'Consider CPU/GPU hardware instruction speed for integers vs floating-point numbers.',
      'DDA increments y by slope m = dy/dx (floating point).',
      'Bresenham operates purely with fast integer arithmetic.'
    ],
    misconceptionIndex: 4,
  },
  // 19. c12_cs_069: Midpoint Circle 8-Way Symmetry (Foundation - Numeric)
  {
    id: 'ch_cs_069_2',
    nodeId: NODE_C12_CS_069,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Due to circle geometric symmetry, how many symmetric octant pixels can be illuminated by calculating just ONE single pixel point (x, y) on a circle centered at the origin?',
    correctAnswer: 8,
    tolerance: 0,
    unit: 'pixels',
    explanation: 'A circle centered at the origin possesses 8-way symmetry: (x,y), (y,x), (-x,y), (-y,x), (x,-y), (y,-y), (-x,-y), and (-y,-y).',
    hints: [
      'Think of dividing a 360-degree circle into 45-degree sectors.',
      '360 / 45 = 8 sectors (octants).',
      'The symmetry factor is exactly 8.'
    ],
    misconceptionIndex: 4,
  },
  // 20. c12_cs_070: 6 Compiler Phases Order (Standard - Drag-Sort)
  {
    id: 'ch_cs_070_1',
    nodeId: NODE_C12_CS_070,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Arrange all 6 phases of a modern Compiler in their exact chronological execution sequence.',
    sortItems: [
      '1. Lexical Analysis (Scanner converts source characters to Tokens)',
      '2. Syntax Analysis (Parser builds Parse Tree / AST from Grammar)',
      '3. Semantic Analysis (Type checking & Symbol Table validation)',
      '4. Intermediate Code Generation (Three-Address Code creation)',
      '5. Code Optimization (Dead code removal & loop optimization)',
      '6. Target Code Generation (Production of machine bytecode / assembly)'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation: 'The 6 compiler phases in order: Lexical -> Syntax -> Semantic -> Intermediate Code -> Optimization -> Target Code Generation.',
    hints: [
      'Characters -> Tokens -> Parse Tree -> Type Checked -> IR -> Optimized IR -> Target Code.',
      'Lexical analysis must precede syntax parsing.',
      'Target code generation is the final output phase.'
    ],
    misconceptionIndex: 4,
  },
  // 21. c12_cs_070: Syntax vs Semantic Errors (Advanced - Analysis)
  {
    id: 'ch_cs_070_2',
    nodeId: NODE_C12_CS_070,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In Java, the statement "int total = 45 + score;" where "score" is declared as a String variable causes an error in which compiler phase and why?',
    options: [
      'Semantic Analysis phase: The parser confirms valid grammar, but the Semantic Analyser detects a type incompatibility error when trying to assign a String concatenation to an integer variable.',
      'Lexical Analysis phase: The scanner crashes because "score" contains alphabetic characters.',
      'Code Optimization phase: The dead code eliminator cannot compress the statement.',
      'Target Code Generation phase: The assembler runs out of CPU registers.'
    ],
    correctIndex: 0,
    explanation: 'The statement conforms to Java grammar (Syntax Analysis succeeds), but assigning a String expression to an int variable violates type rules, which is detected during Semantic Analysis.',
    hints: [
      'The grammar of "type identifier = literal + identifier;" is valid.',
      'Type checking and symbol table validations belong to the Semantic phase.',
      'Select Semantic Analysis.'
    ],
    misconceptionIndex: 4,
  },
  // 22. c12_cs_068 & c12_cs_063: Software Synthesis & Quality (Advanced - Creativity)
  {
    id: 'ch_cs_068_2',
    nodeId: NODE_C12_CS_068,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are architecting the open-source National Health Stack for India under Apache 2.0. Which combination of engineering practices ensures maximum code quality, test reliability, and legal security?',
    options: [
      'TDD with JUnit 4 -> Git branch PR reviews -> Automated Jenkins CI build & test triggers -> Apache 2.0 patent grant -> Javadoc API docs',
      'Direct main branch commits -> No unit testing -> Unlicensed code copy-pasted from StackOverflow',
      'Waterfall 2-year release cycle without automated testing or documentation',
      'Manual FTP upload of .class files to live server without Git history'
    ],
    correctIndex: 0,
    explanation: 'A robust modern software architecture synthesizes TDD, version control, automated CI/CD, Apache 2.0 licensing, and comprehensive documentation.',
    hints: [
      'Combine all best practices studied across the 10 nodes.',
      'Look for TDD + Git PRs + Jenkins CI + Apache 2.0 + Javadoc.',
      'Option A provides complete end-to-end engineering excellence.'
    ],
    misconceptionIndex: 0,
  }
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Lead Architect: The National Digilocker Document Sync Service',
  description: 'Apply your full Class 12 software engineering synthesis to design a scalable, tested, open-source microservice for Indian citizen record verification.',
  steps: [
    'Write a JUnit 4 test class with @Before fixture setup and assertEquals() checking DigiLocker Aadhaar XML response decoding.',
    'Initialize a local Git repository, create a branch "feature-digilocker-sync", stage with git add, and commit with meaningful messages.',
    'Formulate 2 user stories in standard format ("As a citizen, I can... so that...") and prioritize them in a 2-week Sprint backlog.',
    'Draft a modular README.md with Installation, Usage (javac/java), Javadoc API specs, and Apache 2.0 licensing notices.',
    'Configure a Jenkins CI/CD pipeline definition with Build, Test, and Staging Deployment automated triggers.'
  ],
};

// ─── MAIN COMPONENT ───
function C12_ComputerScienceSoftwareTestingUnitSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_CS_061,
  title = DEFAULT_PROPS.title || 'Software Testing & Engineering Synthesis',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {

  // Subject Config
  const subjectConfig = SUBJECT_CONFIG['compsci'] || { name: 'Computer Science', emoji: '💻', color: 'indigo' };

  // Phase State Flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict-Then-Check State
  const [predictionMade, setPredictionMade] = useState(false);

  // Lab 1: TDD Interactive Engine State
  const [tddPhase, setTddPhase] = useState<'IDLE' | 'RED' | 'GREEN' | 'REFACTOR'>('IDLE');
  const [testOutput, setTestOutput] = useState<string>('Click [1. Write Failing Test] to start TDD.');

  // Lab 2: Git Branching Graph State
  const [gitCommits, setGitCommits] = useState<{ id: string; branch: 'main' | 'feature'; msg: string; parent?: string }[]>([
    { id: 'c1', branch: 'main', msg: 'Initial commit: add README' },
    { id: 'c2', branch: 'main', msg: 'Add StudentResult class' },
  ]);
  const [activeBranch, setActiveBranch] = useState<'main' | 'feature'>('main');
  const [mergeStatus, setMergeStatus] = useState<string>('Working on main branch.');

  // Lab 3: Jenkins CI/CD Pipeline Simulator State
  const [pipelineStage, setPipelineStage] = useState<'IDLE' | 'BUILD' | 'TEST' | 'DEPLOY' | 'SUCCESS' | 'FAILED'>('IDLE');
  const [buildLogs, setBuildLogs] = useState<string[]>(['Pipeline ready. Trigger webhook to build.']);

  // Lab 4: Computer Graphics Rasterizer State
  const [graphicsAlgorithm, setGraphicsAlgorithm] = useState<'DDA' | 'Bresenham'>('Bresenham');
  const [lineSlopeX2, setLineSlopeX2] = useState<number>(8);
  const [lineSlopeY2, setLineSlopeY2] = useState<number>(5);
  const [rasterGrid, setRasterGrid] = useState<{ x: number; y: number }[]>([]);

  // Lab 5: Compiler AST & Symbol Table Inspector State
  const [compilerPhaseIndex, setCompilerPhaseIndex] = useState<number>(0);
  const tokenizedItems = ['int', 'total', '=', '45', '+', 'score', ';'];

  // Sandbox State Controls
  const [sandboxCodeSmell, setSandboxCodeSmell] = useState<'clean' | 'long-method' | 'duplicate-code' | 'deep-nesting'>('clean');
  const [sandboxCiAutoBuild, setSandboxCiAutoBuild] = useState<boolean>(true);
  const [sandboxCircleRadius, setSandboxCircleRadius] = useState<number>(5);

  // Challenge Drag & Drop / Input State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Hints & Visual Feedback State
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Notification Modals
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Persistent BKT & Timer Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD EFFECT ───
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
    const newDifficulty = (mastery === 'not-started' || mastery === 'beginner')
      ? 'foundation'
      : (mastery === 'developing' ? 'standard' : 'advanced');

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── GRAPHICS RASTERIZATION ENGINE EFFECT ───
  useEffect(() => {
    const points: { x: number; y: number }[] = [];
    const x0 = 1;
    const y0 = 1;
    const x1 = lineSlopeX2;
    const y1 = lineSlopeY2;

    if (graphicsAlgorithm === 'DDA') {
      const dx = x1 - x0;
      const dy = y1 - y0;
      const steps = Math.max(Math.abs(dx), Math.abs(dy));
      const xInc = dx / (steps || 1);
      const yInc = dy / (steps || 1);
      let currX = x0;
      let currY = y0;
      for (let i = 0; i <= steps; i++) {
        points.push({ x: Math.round(currX), y: Math.round(currY) });
        currX += xInc;
        currY += yInc;
      }
    } else {
      let currX = x0;
      let currY = y0;
      const dx = Math.abs(x1 - x0);
      const dy = Math.abs(y1 - y0);
      const sx = x0 < x1 ? 1 : -1;
      const sy = y0 < y1 ? 1 : -1;
      let err = dx - dy;

      while (true) {
        points.push({ x: currX, y: currY });
        if (currX === x1 && currY === y1) break;
        const e2 = 2 * err;
        if (e2 > -dy) {
          err -= dy;
          currX += sx;
        }
        if (e2 < dx) {
          err += dx;
          currY += sy;
        }
      }
    }
    setRasterGrid(points);
  }, [graphicsAlgorithm, lineSlopeX2, lineSlopeY2]);

  // ─── 2D CANVAS TELEMETRY ANIMATION EFFECT ───
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

      // Background telemetry grid
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Pulse wave line
      ctx.beginPath();
      ctx.moveTo(0, 15);
      for (let x = 0; x < canvas.width; x += 5) {
        const y = 15 + Math.sin((x + frame * 3) * 0.05) * 6;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Node marker
      const markerX = (frame * 2) % canvas.width;
      ctx.beginPath();
      ctx.arc(markerX, 15, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── ESCALATING HINTS CALLBACK ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints && activeChallenge.hints[nextLevel - 1]) {
      const hintMsg = activeChallenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintMsg}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('All hints used. Let us examine the complete solution.');
    }
  }, [hintCount, activeChallenge]);

  // ─── AUTO-INACTIVITY HINT TIMER CALLBACK ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── DISCOVERY ANSWER HANDLER ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on! Writing failing tests first guarantees verifiable coverage.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── PHASE ADVANCE HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Engineering Labs! Explore each visual system.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter Free Play Sandbox. Test variables without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Phase unlocked. Apply your software engineering skills.');
  }, []);

  // ─── PREDICTION HANDLER ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    const isCorrect = idx === PREDICTION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'tap');
    speechManager.speak(PREDICTION_QUESTIONS[0].verifyInstruction);
  }, []);

  // ─── LAB 1: TDD ENGINE HANDLER ───
  const handleTddStep = useCallback((step: 'RED' | 'GREEN' | 'REFACTOR') => {
    setTddPhase(step);
    if (step === 'RED') {
      audioManager.play('error');
      setTestOutput('❌ FAIL: GSTCalculatorTest -> testCalculateGST() expected <225.09> but class GSTCalculator does not exist! (RED STATE)');
      speechManager.speak('Red State: Test failed as expected because code is not yet written.');
    } else if (step === 'GREEN') {
      audioManager.play('drop-correct');
      setTestOutput('✅ PASS: GSTCalculator.calculate(1250.50, 18.0) returned 225.09. 1 test passed in 12ms. (GREEN STATE)');
      speechManager.speak('Green State: Minimum code added. All unit tests pass!');
    } else if (step === 'REFACTOR') {
      audioManager.play('success');
      setTestOutput('✨ REFACTORED: Extracted validateInput() guard & applied clean naming. All tests STILL PASS GREEN.');
      speechManager.speak('Refactor State: Code cleaned up without breaking any tests.');
    }
  }, []);

  // ─── LAB 2: GIT GRAPH HANDLERS ───
  const handleAddGitCommit = useCallback(() => {
    const newId = `c${gitCommits.length + 1}`;
    const newCommit = {
      id: newId,
      branch: activeBranch,
      msg: activeBranch === 'main' ? `Main commit #${newId}: Update API routes` : `Feature commit #${newId}: Add Tatkal logic`,
    };
    setGitCommits(prev => [...prev, newCommit]);
    audioManager.play('pickup');
    speechManager.speak(`New commit ${newId} recorded on branch ${activeBranch}`);
  }, [gitCommits.length, activeBranch]);

  const handleGitMerge = useCallback(() => {
    const hasFeatureCommits = gitCommits.some(c => c.branch === 'feature');
    if (!hasFeatureCommits) {
      setMergeStatus('No commits on feature branch to merge.');
      audioManager.play('pop');
      return;
    }
    const mergeId = `m${gitCommits.length + 1}`;
    setGitCommits(prev => [
      ...prev,
      { id: mergeId, branch: 'main', msg: `3-Way Merge: Merge feature into main (${mergeId})` }
    ]);
    setActiveBranch('main');
    setMergeStatus(`✅ Successfully merged feature branch into main via commit ${mergeId}!`);
    audioManager.play('success');
    speechManager.speak('3-Way merge completed successfully!');
  }, [gitCommits]);

  // ─── LAB 3: JENKINS PIPELINE HANDLER ───
  const handleTriggerPipeline = useCallback(() => {
    setPipelineStage('BUILD');
    audioManager.play('whoosh');
    setBuildLogs(['[Git Webhook Triggered] Commit hash: 9f8a2b3', '[Stage: Build] Running javac -d bin src/**/*.java...']);

    setTimeout(() => {
      setPipelineStage('TEST');
      audioManager.play('count');
      setBuildLogs(prev => [...prev, '[Stage: Build] Bytecode compilation successful. Artifacts generated.', '[Stage: Test] Executing org.junit.runner.JUnitCore TestSuite...']);

      setTimeout(() => {
        setPipelineStage('DEPLOY');
        audioManager.play('count');
        setBuildLogs(prev => [...prev, '[Stage: Test] 48/48 unit tests PASSED (0 failures, 0 errors).', '[Stage: Deploy] Deploying IRCTC-Core-1.0.jar to Production Cluster in Bengaluru...']);

        setTimeout(() => {
          setPipelineStage('SUCCESS');
          audioManager.play('celebration');
          setBuildLogs(prev => [...prev, '[Stage: Deploy] Deployment Complete! Health checks 200 OK. 🚀']);
          speechManager.speak('Jenkins Pipeline Succeeded! Build, test, and automated deploy finished.');
        }, 1200);
      }, 1200);
    }, 1200);
  }, []);

  // ─── LAB 5: COMPILER PHASE HANDLER ───
  const handleNextCompilerPhase = useCallback(() => {
    setCompilerPhaseIndex(prev => (prev + 1) % 6);
    audioManager.play('tap');
  }, []);

  // ─── DRAG & DROP HANDLERS (Drag-Label) ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 400);
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  // ─── DRAG SORT HANDLERS (Drag-Sort) ───
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = [...prev];
      if (arr.length === 0 && activeChallenge.sortItems) {
        arr = activeChallenge.sortItems.map((_, i) => i);
      }
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleSortSubmit = useCallback(() => {
    const currentOrder = sortArrangement.length > 0
      ? sortArrangement
      : (activeChallenge.sortItems?.map((_, i) => i) || []);
    const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(activeChallenge.correctOrder);

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      setShowConfetti(true);
      setShowExplanation(true);
      speechManager.speak('Correct sequence! Well ordered.');
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 400);
      setTimeout(() => setWrongFlash(false), 700);
      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
      }
      showNextHint();
    }
    resetInactivityTimer();
  }, [sortArrangement, activeChallenge, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Synthesis completed with score ${finalScore} percent! Outstanding engineering leadership.`);
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───
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

  // ─── GENERAL ANSWER HANDLER (Classify / Numeric / Construct / Drag-Label) ───
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = answer === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      setShowConfetti(true);
      setShowExplanation(true);
      speechManager.speak('Correct! Precision analysis verified.');
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us study the complete architectural walkthrough.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // ─── CLEANUP ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      
      {/* ─── HEADER BAR ─── */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-900/40 rounded-2xl border border-gold-700/50">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-gold-400 font-semibold tracking-wide uppercase">ISC Class 12 • 10 Core Syllabus Nodes Synthesis</p>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-3">
          <motion.div 
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
              difficulty === 'advanced' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
              'bg-gold-500/20 text-gold-300 border border-gold-500/40'
            }`}
          >
            Tier: {difficulty}
          </motion.div>

          <div className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 border border-slate-700 text-slate-300">
            Phase: <span className="text-amber-400 uppercase font-black">{phase}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── LIVE 2D CANVAS TELEMETRY MONITOR ─── */}
      <div className="my-4 rounded-xl overflow-hidden border border-slate-800 shadow-inner">
        <canvas ref={canvasRef} width={800} height={30} className="w-full h-7 block" aria-label="System telemetry status waveform monitor" />
      </div>

      {/* ─── 1. DISCOVERY PHASE (Curiosity Hook) ─── */}
      {phase === 'discovery' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Mission Scenario Card */}
          <div className="p-6 bg-gradient-to-br from-gold-950/80 via-slate-900 to-slate-950 rounded-2xl border border-gold-800/60 shadow-xl">
            <div className="flex items-center gap-2 text-gold-400 font-black text-sm uppercase tracking-wider mb-2">
              <span>🚨</span> Real-World Enterprise Scenario
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">{SCENARIO.intro}</p>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-gold-900/40 text-xs text-gold-200">
              <strong>Architecture Mandate:</strong> {SCENARIO.context}
            </div>
          </div>

          {/* Discovery Question Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider">Discovery Challenge • Ungraded Curiosity Hook</span>
              <span className="text-xs text-slate-400">Think deeply before answering</span>
            </div>
            <h3 className="text-base md:text-lg font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-2 border-emerald-500 text-emerald-200 shadow-lg'
                      : discoveryAnswered
                      ? 'bg-slate-800/50 border border-slate-700 text-slate-400'
                      : 'bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:border-gold-500'
                  }`}
                >
                  <span className="inline-block w-6 font-bold text-gold-400">({String.fromCharCode(65 + i)})</span> {opt}
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="ml-2 text-emerald-400 font-bold">✓ Correct</span>}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4"
              >
                <p className={`text-sm font-semibold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Writing failing tests first ensures test suite validity.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter Interactive Engineering Labs"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-600/30 flex items-center gap-2"
                >
                  Enter Interactive Engineering Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORE PHASE (Interactive Labs) ─── */}
      {phase === 'explore' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Lab Step Tabs */}
          <div className="grid grid-cols-5 gap-2 pb-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                aria-label={`Open Lab ${idx + 1}: ${step.title}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`p-2 md:p-3 rounded-xl text-left border transition-all ${
                  currentSlide === idx
                    ? 'bg-gold-600/30 border-gold-500 text-white font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-[10px] uppercase font-black tracking-wider text-gold-400">Lab {idx + 1}</div>
                <div className="text-xs truncate">{step.title.split(':')[1] || step.title}</div>
              </motion.button>
            ))}
          </div>

          {/* Active Lab Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-xs text-amber-400 mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-md bg-slate-800 text-gold-300 font-mono">Node: {EXPLORATION_STEPS[currentSlide].nodeId}</span>
              </div>

              {/* ─── LAB 1 VISUAL: TDD RED-GREEN-REFACTOR WITH TOPIC SVG #1 ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      aria-label="Step 1: Write Failing Test (Red State)"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTddStep('RED')}
                      className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                        tddPhase === 'RED'
                          ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/40 ring-2 ring-rose-400'
                          : 'bg-rose-950/60 text-rose-300 border border-rose-800 hover:bg-rose-900'
                      }`}
                    >
                      1. ✗ Write Failing Test (RED)
                    </motion.button>

                    <motion.button
                      aria-label="Step 2: Pass Minimal Code (Green State)"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTddStep('GREEN')}
                      className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                        tddPhase === 'GREEN'
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/40 ring-2 ring-emerald-400'
                          : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800 hover:bg-emerald-900'
                      }`}
                    >
                      2. ✓ Pass Minimal Code (GREEN)
                    </motion.button>

                    <motion.button
                      aria-label="Step 3: Refactor Clean Code"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTddStep('REFACTOR')}
                      className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                        tddPhase === 'REFACTOR'
                          ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/40 ring-2 ring-gold-400'
                          : 'bg-gold-950/60 text-gold-300 border border-gold-800 hover:bg-gold-900'
                      }`}
                    >
                      3. 🔄 Refactor Clean Code
                    </motion.button>
                  </div>

                  {/* SVG DIAGRAM 1: TDD State Machine Architecture */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 130" className="w-full h-32" aria-label="TDD Red-Green-Refactor Cycle State Machine Diagram">
                      <rect x="30" y="25" width="140" height="75" rx="12" fill={tddPhase === 'RED' ? '#881337' : '#1e293b'} stroke={tddPhase === 'RED' ? '#f43f5e' : '#475569'} strokeWidth="2" />
                      <text x="100" y="55" fill="#f43f5e" fontSize="13" fontWeight="bold" textAnchor="middle">1. RED PHASE</text>
                      <text x="100" y="75" fill="#e2e8f0" fontSize="9" textAnchor="middle">Write Failing Unit Test</text>
                      <text x="100" y="90" fill="#cbd5e1" fontSize="8" textAnchor="middle">assert(expected != actual)</text>

                      {/* Arrow 1 */}
                      <path d="M 175 62 L 225 62" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow)" />
                      
                      <rect x="230" y="25" width="140" height="75" rx="12" fill={tddPhase === 'GREEN' ? '#064e3b' : '#1e293b'} stroke={tddPhase === 'GREEN' ? '#10b981' : '#475569'} strokeWidth="2" />
                      <text x="300" y="55" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">2. GREEN PHASE</text>
                      <text x="300" y="75" fill="#e2e8f0" fontSize="9" textAnchor="middle">Minimal Production Code</text>
                      <text x="300" y="90" fill="#cbd5e1" fontSize="8" textAnchor="middle">All Assertions Pass ✓</text>

                      {/* Arrow 2 */}
                      <path d="M 375 62 L 425 62" stroke="#6366f1" strokeWidth="2" />

                      <rect x="430" y="25" width="140" height="75" rx="12" fill={tddPhase === 'REFACTOR' ? '#312e81' : '#1e293b'} stroke={tddPhase === 'REFACTOR' ? '#818cf8' : '#475569'} strokeWidth="2" />
                      <text x="500" y="55" fill="#a5b4fc" fontSize="13" fontWeight="bold" textAnchor="middle">3. REFACTOR</text>
                      <text x="500" y="75" fill="#e2e8f0" fontSize="9" textAnchor="middle">Eliminate Smells / DRY</text>
                      <text x="500" y="90" fill="#cbd5e1" fontSize="8" textAnchor="middle">Preserve Pass Status</text>

                      {/* Cycle back arc */}
                      <path d="M 500 25 C 500 -10, 100 -10, 100 25" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 3" />
                      <text x="300" y="10" fill="#818cf8" fontSize="9" textAnchor="middle">Repeat Cycle for Next Feature</text>
                    </svg>

                    <div className="mt-3 p-3 bg-slate-900 rounded-lg text-slate-200 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                      {testOutput}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2 VISUAL: GIT BRANCHING & MERGE DAG WITH TOPIC SVG #2 ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                      <button
                        aria-label="Switch to main branch"
                        onClick={() => {
                          setActiveBranch('main');
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${activeBranch === 'main' ? 'bg-gold-600 text-white' : 'text-slate-400'}`}
                      >
                        Branch: main
                      </button>
                      <button
                        aria-label="Switch to feature branch"
                        onClick={() => {
                          setActiveBranch('feature');
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${activeBranch === 'feature' ? 'bg-amber-600 text-white' : 'text-slate-400'}`}
                      >
                        Branch: feature
                      </button>
                    </div>

                    <motion.button
                      aria-label="Add new git commit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddGitCommit}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700"
                    >
                      + git commit -m
                    </motion.button>

                    <motion.button
                      aria-label="Merge feature branch into main branch"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleGitMerge}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30"
                    >
                      git merge feature ➔ main
                    </motion.button>
                  </div>

                  {/* SVG DIAGRAM 2: Git Directed Acyclic Graph (DAG) */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto">
                    <svg viewBox="0 0 600 160" className="w-full min-w-[500px] h-40" aria-label="Git Directed Acyclic Graph showing main and feature branches">
                      {/* Main branch timeline line */}
                      <line x1="40" y1="50" x2="560" y2="50" stroke="#4f46e5" strokeWidth="3" strokeDasharray="4 2" />
                      <text x="50" y="30" fill="#818cf8" fontSize="10" fontWeight="bold">main branch (production)</text>

                      {/* Feature branch timeline line */}
                      <line x1="140" y1="120" x2="480" y2="120" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                      <text x="140" y="145" fill="#fbbf24" fontSize="10" fontWeight="bold">feature branch (parallel dev)</text>

                      {/* Render Commit Nodes */}
                      {gitCommits.map((c, i) => {
                        const cx = 80 + i * 70;
                        const cy = c.branch === 'main' ? 50 : 120;
                        return (
                          <g key={c.id}>
                            <circle cx={cx} cy={cy} r="14" fill={c.branch === 'main' ? '#6366f1' : '#f59e0b'} stroke="#ffffff" strokeWidth="2" />
                            <text x={cx} y={cy + 4} textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">{c.id}</text>
                            {c.branch === 'feature' && i === 2 && (
                              <line x1="150" y1="50" x2={cx} y2={cy} stroke="#f59e0b" strokeWidth="2" />
                            )}
                          </g>
                        );
                      })}
                    </svg>
                    <div className="mt-2 text-xs text-slate-400 font-mono">{mergeStatus}</div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3 VISUAL: JENKINS PIPELINE WITH TOPIC SVG #3 ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <motion.button
                      aria-label="Trigger Jenkins webhook automated build pipeline"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleTriggerPipeline}
                      className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-600/30 flex items-center gap-2"
                    >
                      <span>⚡</span> Trigger Git Webhook Build
                    </motion.button>
                  </div>

                  {/* SVG DIAGRAM 3: Jenkins CI/CD Delivery Pipeline Flow */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 90" className="w-full h-24" aria-label="Automated CI/CD Delivery Pipeline Execution Flow">
                      <rect x="20" y="20" width="115" height="50" rx="8" fill={pipelineStage === 'BUILD' ? '#312e81' : '#1e293b'} stroke="#6366f1" strokeWidth="2" />
                      <text x="77" y="42" fill="#e0e7ff" fontSize="10" fontWeight="bold" textAnchor="middle">1. SCM Checkout</text>
                      <text x="77" y="58" fill="#38bdf8" fontSize="8" textAnchor="middle">Git Hook</text>

                      <line x1="140" y1="45" x2="165" y2="45" stroke="#6366f1" strokeWidth="2" />

                      <rect x="170" y="20" width="115" height="50" rx="8" fill={pipelineStage === 'BUILD' ? '#312e81' : '#1e293b'} stroke="#6366f1" strokeWidth="2" />
                      <text x="227" y="42" fill="#e0e7ff" fontSize="10" fontWeight="bold" textAnchor="middle">2. javac Build</text>
                      <text x="227" y="58" fill="#38bdf8" fontSize="8" textAnchor="middle">Bytecode JAR</text>

                      <line x1="290" y1="45" x2="315" y2="45" stroke="#6366f1" strokeWidth="2" />

                      <rect x="320" y="20" width="115" height="50" rx="8" fill={pipelineStage === 'TEST' ? '#312e81' : '#1e293b'} stroke="#6366f1" strokeWidth="2" />
                      <text x="377" y="42" fill="#e0e7ff" fontSize="10" fontWeight="bold" textAnchor="middle">3. JUnit Tests</text>
                      <text x="377" y="58" fill="#38bdf8" fontSize="8" textAnchor="middle">Unit Assertions</text>

                      <line x1="440" y1="45" x2="465" y2="45" stroke="#6366f1" strokeWidth="2" />

                      <rect x="470" y="20" width="115" height="50" rx="8" fill={pipelineStage === 'DEPLOY' || pipelineStage === 'SUCCESS' ? '#064e3b' : '#1e293b'} stroke={pipelineStage === 'SUCCESS' ? '#10b981' : '#6366f1'} strokeWidth="2" />
                      <text x="527" y="42" fill="#e0e7ff" fontSize="10" fontWeight="bold" textAnchor="middle">4. Live Release</text>
                      <text x="527" y="58" fill="#34d399" fontSize="8" textAnchor="middle">{pipelineStage === 'SUCCESS' ? '✓ Deployed' : 'Deploy WAR'}</text>
                    </svg>
                  </div>

                  {/* Terminal Log Console */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 h-28 overflow-y-auto space-y-1 shadow-inner">
                    {buildLogs.map((log, i) => (
                      <div key={i}>{log}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── LAB 4 VISUAL: BRESENHAM VS DDA GRAPHICS ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* Predict then Check Box */}
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/60 rounded-xl border border-gold-800/80 mb-3 space-y-2">
                      <div className="text-xs font-bold text-amber-300 uppercase">Predict First:</div>
                      <p className="text-xs text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <button
                            key={i}
                            aria-label={`Prediction option: ${opt}`}
                            onClick={() => handlePrediction(i)}
                            className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs text-left text-slate-300 border border-slate-700"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                      <button
                        aria-label="Select Bresenham Integer Algorithm"
                        onClick={() => {
                          setGraphicsAlgorithm('Bresenham');
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${graphicsAlgorithm === 'Bresenham' ? 'bg-gold-600 text-white' : 'text-slate-400'}`}
                      >
                        Bresenham (Integer Pk)
                      </button>
                      <button
                        aria-label="Select DDA Floating Point Algorithm"
                        onClick={() => {
                          setGraphicsAlgorithm('DDA');
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${graphicsAlgorithm === 'DDA' ? 'bg-gold-600 text-white' : 'text-slate-400'}`}
                      >
                        DDA (Floating-Point)
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <label htmlFor="line-slope-x2" className="text-slate-400">Endpoint X2: {lineSlopeX2}</label>
                      <input
                        id="line-slope-x2"
                        aria-label="Set target X2 endpoint coordinate"
                        type="range"
                        min={4}
                        max={10}
                        value={lineSlopeX2}
                        onChange={(e) => setLineSlopeX2(Number(e.target.value))}
                        className="w-24 accent-gold-500"
                      />
                      <label htmlFor="line-slope-y2" className="text-slate-400">Y2: {lineSlopeY2}</label>
                      <input
                        id="line-slope-y2"
                        aria-label="Set target Y2 endpoint coordinate"
                        type="range"
                        min={2}
                        max={8}
                        value={lineSlopeY2}
                        onChange={(e) => setLineSlopeY2(Number(e.target.value))}
                        className="w-24 accent-gold-500"
                      />
                    </div>
                  </div>

                  {/* Pixel Raster Grid Display */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center gap-6">
                    <div className="grid grid-cols-11 gap-1 p-2 bg-slate-900 rounded-lg border border-slate-800">
                      {Array.from({ length: 11 * 9 }).map((_, idx) => {
                        const px = idx % 11;
                        const py = Math.floor(idx / 11);
                        const isIlluminated = rasterGrid.some(p => p.x === px && p.y === py);
                        return (
                          <div
                            key={idx}
                            className={`w-5 h-5 rounded-sm flex items-center justify-center text-[8px] font-mono transition-colors ${
                              isIlluminated
                                ? 'bg-gold-500 text-white shadow-sm font-bold ring-1 ring-gold-300'
                                : 'bg-slate-950 text-slate-800'
                            }`}
                          >
                            {isIlluminated ? '●' : '+'}
                          </div>
                        );
                      })}
                    </div>

                    <div className="text-xs text-slate-300 space-y-2 flex-1">
                      <div className="font-bold text-gold-400">Raster Engine Computation:</div>
                      <p>Active Mode: <span className="font-mono text-amber-300">{graphicsAlgorithm}</span></p>
                      <p>Start Point: (1, 1) ➔ Target: ({lineSlopeX2}, {lineSlopeY2})</p>
                      <p>Total Illuminated Pixels: <span className="font-bold text-emerald-400">{rasterGrid.length}</span></p>
                      <p className="text-[11px] text-slate-400">
                        {graphicsAlgorithm === 'Bresenham'
                          ? 'Bresenham computes purely integer decision variables: P_k+1 = P_k + 2dy - 2dx (zero floating point operations).'
                          : 'DDA increments coordinates by slope m = dy/dx and rounds each step: (x, round(y)).'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5 VISUAL: COMPILER DESIGN 6-PHASE AST ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-300">Statement: <span className="font-mono text-gold-300 font-black">int total = 45 + score;</span></div>
                    <motion.button
                      aria-label="Advance to next compiler phase"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextCompilerPhase}
                      className="px-4 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-md"
                    >
                      Step Compiler Phase ({compilerPhaseIndex + 1}/6) ➔
                    </motion.button>
                  </div>

                  {/* 6 Phases Timeline */}
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {[
                      '1. Lexical (Scanner)',
                      '2. Syntax (Parser)',
                      '3. Semantic (Types)',
                      '4. Intermediate Code',
                      '5. Optimization',
                      '6. Target Code Gen'
                    ].map((phaseName, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded-lg text-center text-[10px] font-bold border transition-all ${
                          compilerPhaseIndex === i
                            ? 'bg-gold-600 text-white border-gold-400 shadow-md ring-1 ring-gold-300'
                            : i < compilerPhaseIndex
                            ? 'bg-slate-900 border-slate-700 text-emerald-400'
                            : 'bg-slate-950 border-slate-900 text-slate-600'
                        }`}
                      >
                        {phaseName}
                      </div>
                    ))}
                  </div>

                  {/* Dynamic Phase Output Viewer */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                    {compilerPhaseIndex === 0 && (
                      <div>
                        <div className="text-amber-400 font-bold mb-1">Tokens Generated by Lexical Scanner:</div>
                        <div className="flex flex-wrap gap-2">
                          {tokenizedItems.map((tok, i) => (
                            <span key={i} className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700 text-gold-300">
                              Token({tok})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {compilerPhaseIndex === 1 && (
                      <div>
                        <div className="text-amber-400 font-bold mb-1">Syntax Analysis Parse Tree (Context-Free Grammar):</div>
                        <div className="p-3 bg-slate-900 rounded-lg text-slate-200 whitespace-pre">
{`DeclarationStatement
 ├── Type: int
 ├── Identifier: total
 └── AssignmentOp: =
      └── BinaryExpr (+)
           ├── Literal: 45
           └── Identifier: score`}
                        </div>
                      </div>
                    )}

                    {compilerPhaseIndex >= 2 && (
                      <div>
                        <div className="text-amber-400 font-bold mb-1">Symbol Table Lookup & Semantic Type Checking:</div>
                        <div className="grid grid-cols-3 gap-2 p-2 bg-slate-900 rounded border border-slate-800 text-[11px]">
                          <div><span className="text-slate-400">Identifier:</span> total | <span className="text-emerald-400">Type: int</span></div>
                          <div><span className="text-slate-400">Identifier:</span> score | <span className="text-emerald-400">Type: int</span></div>
                          <div><span className="text-slate-400">Status:</span> Types Compatible ✓</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <motion.button
              aria-label="Go to previous lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentSlide === 0}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-mono">Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to next lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Proceed to Free Play Sandbox"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30"
              >
                Proceed to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE (Free Play Before Challenges) ─── */}
      {phase === 'sandbox' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Software Architecture Sandbox (Free Play)</h3>
                <p className="text-xs text-slate-400 mt-1">Experiment with variables without grading pressure. When confident, launch the graded challenges.</p>
              </div>
              <motion.button
                aria-label="Launch Graded Challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30"
              >
                Launch Graded Challenges (20+) →
              </motion.button>
            </div>

            {/* Sandbox Parameter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              {/* Code Quality Smell Selector */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="code-smell-select" className="text-xs font-bold text-gold-300">Code Smell Simulation:</label>
                <select
                  id="code-smell-select"
                  aria-label="Select code smell pattern"
                  value={sandboxCodeSmell}
                  onChange={(e) => setSandboxCodeSmell(e.target.value as 'clean' | 'long-method' | 'duplicate-code' | 'deep-nesting')}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                >
                  <option value="clean">Clean Code (Modular)</option>
                  <option value="long-method">Long Method (400+ lines)</option>
                  <option value="duplicate-code">Duplicate GST Calculation</option>
                  <option value="deep-nesting">Deep Nesting (5x If statements)</option>
                </select>
                <div className="text-[11px] text-slate-400">
                  {sandboxCodeSmell === 'clean' && 'Single Responsibility verified. Maintainability score: 98%.'}
                  {sandboxCodeSmell === 'long-method' && 'Code Smell: Extract Method needed to split duties.'}
                  {sandboxCodeSmell === 'duplicate-code' && 'DRY Violation: Extract common helper method.'}
                  {sandboxCodeSmell === 'deep-nesting' && 'Readability Maze: Apply guard clauses & early returns.'}
                </div>
              </div>

              {/* Git & CI Automation Switch */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-gold-300">Jenkins CI Automated Trigger:</label>
                <div className="flex items-center justify-between p-2 bg-slate-900 rounded-lg border border-slate-700">
                  <span className="text-xs text-slate-300">Auto Build on Git Push:</span>
                  <input
                    aria-label="Toggle auto build on Git push webhook"
                    type="checkbox"
                    checked={sandboxCiAutoBuild}
                    onChange={(e) => setSandboxCiAutoBuild(e.target.checked)}
                    className="accent-gold-500 w-4 h-4 cursor-pointer"
                  />
                </div>
                <div className="text-[11px] text-slate-400">
                  {sandboxCiAutoBuild ? 'CI Active: Every git push triggers automated compilation & unit tests.' : 'CI Disabled: Changes must be compiled manually.'}
                </div>
              </div>

              {/* Graphics Circle Radius */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="circle-radius-slider" className="text-xs font-bold text-gold-300">Midpoint Circle Radius: {sandboxCircleRadius}px</label>
                <input
                  id="circle-radius-slider"
                  aria-label="Adjust midpoint circle radius slider"
                  type="range"
                  min={2}
                  max={8}
                  value={sandboxCircleRadius}
                  onChange={(e) => setSandboxCircleRadius(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
                <div className="text-[11px] text-slate-400">
                  Calculated octant pixels × 8 symmetry points = {sandboxCircleRadius * 8} perimeter pixels.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Progress & Difficulty Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <div className="text-xs font-black uppercase text-gold-400 tracking-wider">
                Challenge {currentChallenge + 1} of {filteredChallenges.length} • Competency: {activeChallenge.competencyLevel}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">Node: {activeChallenge.nodeId}</div>
            </div>

            {/* Progress Bar */}
            <div className="w-full md:w-64">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>Progress</span>
                <span>{Math.round(((currentChallenge + 1) / filteredChallenges.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-500 to-emerald-500 rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Active Question Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-2 border-rose-500 text-rose-100'
                : 'bg-slate-900 border-slate-800 text-white shadow-xl'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold leading-relaxed mb-6">{activeChallenge.question}</h3>

            {/* ─── A. MCQ / Classify / Distinguish ─── */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="space-y-3">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    animate={wrongShake && showExplanation && i !== activeChallenge.correctIndex ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={showExplanation || answerRevealed}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                      showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200 font-bold shadow-lg'
                        : showExplanation
                        ? 'bg-slate-950 border border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:border-gold-500'
                    }`}
                  >
                    <span className="inline-block w-6 font-bold text-gold-400">({String.fromCharCode(65 + i)})</span> {opt}
                    {showExplanation && i === activeChallenge.correctIndex && <span className="ml-2 text-emerald-400 font-bold">✓ Correct</span>}
                  </motion.button>
                ))}
              </div>
            )}

            {/* ─── B. Drag-Label Challenge ─── */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      aria-label={`Draggable role item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-gold-700 hover:bg-gold-600 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3">
                  {Object.keys(activeChallenge.correctMapping || {}).map((targetId) => (
                    <div
                      key={targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-4 rounded-xl bg-slate-950 border-2 border-dashed border-slate-700 flex flex-col md:flex-row items-center justify-between gap-3"
                    >
                      <span className="text-xs font-bold text-gold-300 capitalize">{targetId.replace('role_', 'Scrum Role: ')}</span>
                      <div className="px-4 py-2 bg-slate-900 rounded-lg text-xs font-mono text-emerald-300 border border-slate-800 min-w-[200px] text-center">
                        {droppedLabels[targetId] || 'Drop description here ⬇'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify dragged role mappings"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Verify Mappings ✓
                </motion.button>
              </div>
            )}

            {/* ─── C. Drag-Sort Challenge ─── */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag or click arrows to arrange in chronological order:</p>
                {(sortArrangement.length === activeChallenge.sortItems.length
                  ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                  : activeChallenge.sortItems
                ).map((item, displayIdx) => (
                  <div
                    key={displayIdx}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <span className="font-bold text-gold-400 w-6">{displayIdx + 1}.</span>
                    <span className="flex-1 text-slate-200">{item}</span>
                    <div className="flex gap-1">
                      <button
                        aria-label={`Move item ${displayIdx + 1} up`}
                        disabled={displayIdx === 0}
                        onClick={() => handleSortMove(displayIdx, displayIdx - 1)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 disabled:opacity-30"
                      >
                        ▲
                      </button>
                      <button
                        aria-label={`Move item ${displayIdx + 1} down`}
                        disabled={displayIdx === activeChallenge.sortItems!.length - 1}
                        onClick={() => handleSortMove(displayIdx, displayIdx + 1)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 disabled:opacity-30"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                ))}

                <motion.button
                  aria-label="Submit sequential sort order"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={showExplanation}
                  onClick={handleSortSubmit}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Submit Order ✓
                </motion.button>
              </div>
            )}

            {/* ─── D. Numeric Input Challenge ─── */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    aria-label="Enter numeric calculated value"
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numeric value"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48"
                  />
                  <span className="text-xs text-slate-400 font-bold">{activeChallenge.unit}</span>
                  <motion.button
                    aria-label="Check calculation"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={showExplanation || !numericInput}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-md"
                  >
                    Check Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── E. Construct Code Challenge ─── */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Append token: ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-800 hover:bg-gold-700 rounded-lg text-xs font-mono text-white"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-3 py-1 bg-gold-900 border border-gold-700 rounded-md text-xs font-mono text-emerald-300 flex items-center gap-2">
                      {part}
                      <button
                        aria-label={`Remove token ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600 font-mono">Click tags above to assemble in order</span>}
                </div>

                <motion.button
                  aria-label="Verify Javadoc structure"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={showExplanation || constructParts.length === 0}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Verify Javadoc Structure ✓
                </motion.button>
              </div>
            )}

            {/* ─── PROGRESSIVE DISCLOSURE EXPLANATION ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-950 rounded-xl border border-gold-800 space-y-3"
              >
                <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
                  <span>💡</span> Step-by-Step Architectural Solution
                </div>

                <div className="space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
                  {activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-2"
                    >
                      <span className="font-bold text-gold-400 shrink-0">{i + 1}.</span>
                      <span>{sentence}{!sentence.endsWith('.') && '.'}</span>
                    </motion.div>
                  ))}
                </div>

                {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Reveal next explanation step"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="mt-2 px-4 py-2 bg-gold-800/80 hover:bg-gold-700 text-white rounded-lg text-xs font-bold"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Proceed to next challenge or final review"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="mt-3 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Final Review →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Performance Hero Banner */}
          <div className="p-8 bg-gradient-to-br from-gold-950 via-slate-900 to-slate-950 rounded-3xl border border-gold-700/60 shadow-2xl text-center space-y-4">
            <div className="text-4xl">🏆</div>
            <h2 className="text-2xl md:text-3xl font-black text-white">ISC Software Engineering Synthesis Complete!</h2>
            <div className="flex justify-center items-center gap-6 py-2">
              <div>
                <div className="text-3xl font-black text-emerald-400">{Math.max(0, 100 - errors * 4)}%</div>
                <div className="text-xs text-slate-400 uppercase font-bold">Synthesis Score</div>
              </div>
              <div className="h-10 w-px bg-slate-800" />
              <div>
                <div className="text-3xl font-black text-gold-400 uppercase">{masteryLevel}</div>
                <div className="text-xs text-slate-400 uppercase font-bold">BKT Mastery Tier</div>
              </div>
            </div>

            {/* PERSONALIZED MOTIVATIONAL FEEDBACK BASED ON ERROR COUNT */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-sm font-bold text-gold-200 max-w-xl mx-auto leading-relaxed">
              {errors === 0 && '🌟 PERFECT SCORE! You demonstrated flawless understanding across all 10 ISC Class 12 Computer Science nodes.'}
              {errors >= 1 && errors <= 3 && '👏 Great work! You have a solid grasp of TDD, Git workflows, CI/CD pipelines, and Compiler phases.'}
              {errors >= 4 && errors <= 7 && '👍 Good effort! Review the missed concepts below to strengthen your architecture foundations.'}
              {errors >= 8 && '💪 Do not give up — You WILL get this! Practice the labs once more to solidify your mastery.'}
            </div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-wider">
              <span>🤔</span> Guided Engineering Reflection
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-gold-300">1. Key Insight</h4>
                <p className="text-slate-300">What was the most surprising thing you learned across the 10 engineering domains?</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-gold-300">2. Synthesis</h4>
                <p className="text-slate-300">How would you explain the value of TDD and automated CI/CD to a friend?</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-gold-300">3. Practical Application</h4>
                <p className="text-slate-300">Where in real life or in open source projects might you apply this knowledge?</p>
              </div>
            </div>
          </div>

          {/* Misconception Tracking Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">Targeted Misconception Remediation:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-rose-950 text-xs space-y-1">
                      <div className="text-rose-400 font-bold">✗ Misconception: {m.misconception}</div>
                      <div className="text-emerald-300 font-medium">✓ Correct Principle: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-5 bg-amber-950/30 rounded-2xl border border-amber-900/50 flex items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-black uppercase text-amber-300 tracking-wider">SM-2 Spaced Repetition Review Schedule</h4>
              <p className="text-xs text-slate-300 mt-1">
                Your memory retention interval is scheduled for review in{' '}
                <span className="font-bold text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>.
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real World Activity Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-gold-400 font-black text-xs uppercase tracking-wider">
              <span>🚀</span> Capstone Portfolio Challenge
            </div>
            <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                  <span className="font-bold text-gold-400">{i + 1}.</span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PLATFORM MODALS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_ComputerScienceSoftwareTestingUnitSim;
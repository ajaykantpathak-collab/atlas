'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ICSE Class 9 Computer Science) ───
const NODE_C9_CS_031 = 'c9_cs_031'; // Java for loop - syntax, flow, examples
const NODE_C9_CS_032 = 'c9_cs_032'; // Java while and do-while loops - syntax, differences, examples
const NODE_C9_CS_033 = 'c9_cs_033'; // Java break and continue - loop control statements
const NODE_C9_CS_034 = 'c9_cs_034'; // Java one-dimensional arrays - declaration, initialization, traversal
const NODE_C9_CS_035 = 'c9_cs_035'; // Java array operations - searching, sorting, finding max/min/sum
const NODE_C9_CS_036 = 'c9_cs_036'; // Internet safety and cyber ethics - online risks and responsible use
const ALL_NODE_IDS = [
  NODE_C9_CS_031,
  NODE_C9_CS_032,
  NODE_C9_CS_033,
  NODE_C9_CS_034,
  NODE_C9_CS_035,
  NODE_C9_CS_036,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: CyberShield Security & Algorithmic Rover',
  intro: 'ISRO and CERT-In need your computational thinking! You are programming an automated Mars rover telemetry analyser while defending the communications hub against live cyber threats. Loops, array traversals, sorting, and cyber safety rules will decide mission success.',
  context: 'Command the rover sensor buffer, debug infinite loops before battery depletion, trace bubble sorts on telemetry, and filter malicious phishing packets in real time.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Predict: Look at this Java loop. How many times will it print "ROVER_PING"?\nint p = 5;\nwhile (p > 0) {\n    p -= 2;\n}',
  options: [
    '5 times (since p starts at 5)',
    '3 times (when p is 5, 3, and 1)',
    '2 times (when p is 5 and 3)',
    'Infinite times (p never becomes zero)',
  ],
  correctIndex: 1,
  hintAfter: 'Tracing loops step by step reveals how values change before the gate check!',
};

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  codeSnippet?: string;
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

// ─── 24 PROGRESSIVE CHALLENGES (NEP 2020 Aligned) ───
const CHALLENGES: Challenge[] = [
  // FOUNDATION (8 items)
  {
    id: 'ch_01_for_header',
    nodeId: NODE_C9_CS_031,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each header component to its correct functional slot in the Java for-loop template.',
    dragItems: [
      { label: 'int i = 0', targetId: 'slot_init' },
      { label: 'i < 10', targetId: 'slot_cond' },
      { label: 'i++', targetId: 'slot_update' },
      { label: 'System.out.println(i);', targetId: 'slot_body' },
    ],
    correctMapping: {
      slot_init: 'int i = 0',
      slot_cond: 'i < 10',
      slot_update: 'i++',
      slot_body: 'System.out.println(i);',
    },
    explanation: 'The for loop syntax is for(initialization; condition; update) { body }. Initialization runs once, condition is evaluated before every iteration, body executes if true, and update executes after the body.',
    hints: [
      'Initialization sets up the counter variable at the very start.',
      'The condition evaluates a boolean expression to check if the loop should continue.',
      'The update alters the counter after each iteration, and the body contains the code to repeat.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_dowhile_guarantee',
    nodeId: NODE_C9_CS_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which loop construct in Java is exit-controlled (post-test) and GUARANTEED to execute its body at least once?',
    options: ['for loop', 'while loop', 'do-while loop', 'enhanced for-each loop'],
    correctIndex: 2,
    explanation: 'A do-while loop evaluates its condition at the bottom after the loop body has executed. Therefore, it always executes at least once regardless of whether the initial condition is true or false.',
    hints: [
      'Think about entry-controlled (pre-test) vs exit-controlled (post-test).',
      'One construct puts the while condition after the closing brace followed by a semicolon.',
      'do { ... } while(condition); runs the do block before checking the condition.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_break_vs_continue',
    nodeId: NODE_C9_CS_033,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the fundamental difference between "break" and "continue" in Java loop execution?',
    options: [
      'break terminates the entire loop; continue skips only the remaining statements of the current iteration',
      'break restarts the loop from i = 0; continue pauses the loop for 1 second',
      'continue exits the whole program; break only exits an if statement',
      'Both break and continue terminate the loop immediately without difference',
    ],
    correctIndex: 0,
    explanation: 'break immediately exits the enclosing loop entirely, transferring control to the next line after the loop. continue skips the remainder of the current iteration and jumps to the update/condition check.',
    hints: [
      'One statement is like an emergency exit (stops everything).',
      'The other statement is like skipping a single page in a book and reading the next.',
      'break ends the loop; continue advances to the next iteration.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04_array_indexing',
    nodeId: NODE_C9_CS_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In Java, if double[] readings = new double[8]; is declared, what are the first and last valid indices?',
    options: [
      'First: 1, Last: 8',
      'First: 0, Last: 7',
      'First: 0, Last: 8',
      'First: 1, Last: 7',
    ],
    correctIndex: 1,
    explanation: 'Java arrays are zero-indexed. For an array of size N, the first element is at index 0 and the final element is at index N - 1 (here 8 - 1 = 7).',
    hints: [
      'Java uses zero-based indexing for all arrays.',
      'The first slot is always index 0.',
      'The last valid slot is length - 1.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05_array_length_property',
    nodeId: NODE_C9_CS_034,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How do you correctly retrieve the number of elements in an integer array "int[] data"?',
    options: [
      'data.length() (with parentheses)',
      'data.length (without parentheses)',
      'data.size()',
      'data.count',
    ],
    correctIndex: 1,
    explanation: 'In Java, "length" is a built-in final field (attribute) of an array, accessed as data.length without parentheses. In contrast, String objects use the length() method.',
    hints: [
      'Array size is a public final variable/property on the array object.',
      'Strings use method calls with (), but primitive arrays do not.',
      'The correct syntax is simply arr.length.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_06_cyber_phishing_def',
    nodeId: NODE_C9_CS_036,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'An email pretending to be from the State Bank of India asks you to click a link and verify your password. What is this online risk called?',
    options: [
      'Denial of Service (DoS)',
      'Phishing attack',
      'Software piracy',
      'Data compression glitch',
    ],
    correctIndex: 1,
    explanation: 'Phishing is a social engineering attack where fraudulent emails or websites impersonate trusted institutions to deceive victims into revealing passwords or banking credentials.',
    hints: [
      'It involves "luring" or "hooking" users with deceptive fake communications.',
      'It targets human trust rather than cracking cryptography directly.',
      'The term is phonetically identical to fishing -> Phishing.',
    ],
  },
  {
    id: 'ch_07_sum_accumulator',
    nodeId: NODE_C9_CS_035,
    type: 'construct',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Assemble the correct accumulator loop statements to compute the sum of all elements in int[] arr.',
    availableParts: ['int sum = 0;', 'for(int i=0; i<arr.length; i++)', 'sum += arr[i];', 'return sum;'],
    targetState: 'int sum = 0; for(int i=0; i<arr.length; i++) sum += arr[i]; return sum;',
    validationHint: 'Declare sum = 0, iterate from 0 to arr.length - 1, accumulate, then return sum.',
    explanation: 'To compute a sum, initialize an accumulator to 0 before the loop. Inside the loop, add each element arr[i] to sum. After traversal completes, return the total.',
    hints: [
      'Start by declaring sum initialized to 0.',
      'Use a standard for loop from 0 to arr.length.',
      'Inside the loop body, add arr[i] to sum.',
    ],
  },
  {
    id: 'ch_08_freeware_vs_shareware',
    nodeId: NODE_C9_CS_036,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What differentiates Shareware (e.g., WinRAR evaluation) from Freeware (e.g., VLC Media Player)?',
    options: [
      'Freeware is copyrighted but free to use forever; Shareware provides a trial period after which purchase or license is required',
      'Freeware allows selling the source code; Shareware is malicious software',
      'Shareware is open-source operating system software; Freeware cannot be installed on Windows',
      'Both are identical and mean public domain software with zero copyright',
    ],
    correctIndex: 0,
    explanation: 'Freeware is software distributed at zero cost for lifetime usage while retaining copyright. Shareware is distributed freely on a trial basis, requiring payment for continued full use.',
    hints: [
      'Consider trial periods vs lifetime free usage.',
      'Neither grants rights to modify and sell source code without permission.',
      'Shareware usually asks you to purchase a license after 30 or 40 days.',
    ],
  },

  // STANDARD (8 items)
  {
    id: 'ch_09_trace_factorial',
    nodeId: NODE_C9_CS_031,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Dry-run the loop for N = 5. What is the final value printed by System.out.println(fact)?\nint fact = 1;\nfor(int k = 1; k <= 5; k++) {\n    fact *= k;\n}',
    correctAnswer: 120,
    tolerance: 0,
    unit: '',
    explanation: 'Step 1: k=1 -> fact=1*1=1. Step 2: k=2 -> fact=1*2=2. Step 3: k=3 -> fact=2*3=6. Step 4: k=4 -> fact=6*4=24. Step 5: k=5 -> fact=24*5=120. Final value is 120.',
    hints: [
      'Compute the running product: 1 * 1 = 1.',
      'Multiply by 2 -> 2, by 3 -> 6, by 4 -> 24...',
      'Finally multiply 24 by 5 to get 5! (factorial of 5).',
    ],
  },
  {
    id: 'ch_10_linear_search_trace',
    nodeId: NODE_C9_CS_035,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Given telemetry array int[] t = {14, 28, 56, 92, 104, 210}; at what index does linear search locate target = 92? (Return -1 if not found)',
    correctAnswer: 3,
    tolerance: 0,
    unit: 'index',
    explanation: 't[0]=14 (no), t[1]=28 (no), t[2]=56 (no), t[3]=92 (match!). The search terminates and returns index 3.',
    hints: [
      'Remember zero-based indexing: index 0 is 14.',
      'Index 1 is 28, Index 2 is 56.',
      'Index 3 holds 92.',
    ],
  },
  {
    id: 'ch_11_bubble_sort_pass1',
    nodeId: NODE_C9_CS_035,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the elements to show the exact state of array arr = {65, 20, 80, 15} after ONE complete pass of ascending Bubble Sort.',
    sortItems: ['20', '65', '15', '80'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Trace Pass 1: Compare (65,20) -> swap to {20, 65, 80, 15}. Compare (65,80) -> no swap. Compare (80,15) -> swap to {20, 65, 15, 80}. Largest element 80 bubbled to the end!',
    hints: [
      'Step 1: Compare 65 and 20. Since 65 > 20, they swap -> {20, 65, 80, 15}.',
      'Step 2: Compare 65 and 80. 65 < 80, no swap.',
      'Step 3: Compare 80 and 15. 80 > 15, swap -> {20, 65, 15, 80}.',
    ],
  },
  {
    id: 'ch_12_while_digit_sum',
    nodeId: NODE_C9_CS_032,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Mars rover telemetry parser extracts digits using: int n = 582, sum = 0;\nwhile(n > 0) { sum += n % 10; n /= 10; }\nWhat is the value of sum after the loop finishes?',
    correctAnswer: 15,
    tolerance: 0,
    unit: '',
    explanation: 'Iteration 1: n%10 = 2, sum = 0+2=2, n = 58. Iteration 2: n%10 = 8, sum = 2+8=10, n = 5. Iteration 3: n%10 = 5, sum = 10+5=15, n = 0. Loop terminates.',
    hints: [
      'n % 10 extracts the last digit, n /= 10 strips the last digit.',
      'First extract 2 (sum=2), then extract 8 (sum=10).',
      'Finally extract 5 (sum=15). 5 + 8 + 2 = 15.',
    ],
  },
  {
    id: 'ch_13_continue_in_while_trap',
    nodeId: NODE_C9_CS_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Analyze this code snippet:\nint i = 1;\nwhile(i <= 5) {\n    if (i == 3) continue;\n    System.out.print(i + " ");\n    i++;\n}\nWhat will happen at runtime?',
    options: [
      'Prints "1 2 4 5 "',
      'Prints "1 2 " then hangs in an infinite loop because i is never incremented past 3',
      'Compilation error: continue cannot be used inside while',
      'Prints "1 2 3 4 5 "',
    ],
    correctIndex: 1,
    explanation: 'When i reaches 3, the continue statement executes, skipping the rest of the body including i++. Thus, i remains 3 on every subsequent iteration, resulting in an infinite loop.',
    hints: [
      'Look closely at where the update i++ is located in the while loop.',
      'When i == 3 is true, continue jumps immediately back to the condition while(i <= 5).',
      'Because i++ was skipped, does i ever become 4?',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_14_max_negatives_initialization',
    nodeId: NODE_C9_CS_035,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A programmer writes: int max = 0; for(int i=0; i<arr.length; i++) if(arr[i] > max) max = arr[i];\nIf arr = {-18, -4, -25, -9}, why does this algorithm fail?',
    options: [
      'It causes an ArrayIndexOutOfBoundsException',
      'max was initialized to 0, which is greater than all negative values, so max incorrectly stays 0',
      'for loops cannot iterate through negative integers',
      'The if condition must use < instead of >',
    ],
    correctIndex: 1,
    explanation: 'Initializing max to 0 fails for all-negative arrays because 0 is greater than every element, so arr[i] > max is never true. The correct pattern initializes max = arr[0] and loops from index 1.',
    hints: [
      'Compare 0 against -18, -4, -25, and -9.',
      'Is 0 greater than every single number in that array?',
      'Always initialize max = arr[0] instead of 0.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_15_https_padlock_evaluation',
    nodeId: NODE_C9_CS_036,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A shopping website has an HTTPS padlock icon. A classmate claims: "The padlock guarantees this merchant is 100% honest and cannot be a scam." Evaluate this claim.',
    options: [
      'Correct: HTTPS verifies the moral integrity and business license of the website owner',
      'Incorrect: HTTPS only guarantees that the connection between your browser and server is encrypted; scammers can also obtain SSL certificates',
      'Correct: Only Indian government registered banks are permitted to have HTTPS',
      'Incorrect: HTTPS slows down internet speed and makes passwords public',
    ],
    correctIndex: 1,
    explanation: 'HTTPS (SSL/TLS) only encrypts data in transit to prevent eavesdropping. Fraudulent phishing sites can easily install SSL certificates and display a padlock while still being scams.',
    hints: [
      'What does the "S" in HTTPS actually do to data packets?',
      'Encryption prevents eavesdropping between client and server.',
      'Does encryption prevent the server owner from being a criminal?',
    ],
  },
  {
    id: 'ch_16_array_sum_odd_indices',
    nodeId: NODE_C9_CS_034,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'What is the value of total after executing:\nint[] a = {10, 20, 30, 40, 50, 60};\nint total = 0;\nfor(int i = 1; i < a.length; i += 2) {\n    total += a[i];\n}',
    correctAnswer: 120,
    tolerance: 0,
    unit: '',
    explanation: 'The loop visits odd indices: i=1 (val=20), i=3 (val=40), i=5 (val=60). total = 20 + 40 + 60 = 120.',
    hints: [
      'Identify the index step: i starts at 1 and increases by 2 each time.',
      'Indices visited: 1, 3, 5.',
      'Values at those indices: a[1]=20, a[3]=40, a[5]=60. Sum = 20 + 40 + 60.',
    ],
  },

  // ADVANCED (8 items)
  {
    id: 'ch_17_labelled_break_analysis',
    nodeId: NODE_C9_CS_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Trace the output of this nested loop with a labelled break:\nouter: for (int r = 1; r <= 3; r++) {\n    for (int c = 1; c <= 3; c++) {\n        if (r * c == 4) break outer;\n        System.out.print(r + "" + c + " ");\n    }\n}',
    options: [
      '11 12 13 21 ',
      '11 12 13 21 23 31 32 33 ',
      '11 12 13 21 22 23 ',
      '11 12 13 ',
    ],
    correctIndex: 0,
    explanation: 'r=1: c=1 (11), c=2 (12), c=3 (13). r=2: c=1 (21), c=2 -> r*c=4 -> break outer immediately exits BOTH loops. Output: "11 12 13 21 ".',
    hints: [
      'For r=1: r*c is 1, 2, 3 (none equals 4). So "11 12 13 " is printed.',
      'For r=2: c=1 gives r*c = 2 -> prints "21 ". Next c=2 gives 2*2 = 4.',
      'break outer terminates both the inner and outer loops immediately.',
    ],
  },
  {
    id: 'ch_18_bubble_sort_swaps_count',
    nodeId: NODE_C9_CS_035,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How many total element SWAPS are executed when sorting arr = {5, 1, 4, 2, 8} in ascending order using standard Bubble Sort?',
    correctAnswer: 4,
    tolerance: 0,
    unit: 'swaps',
    explanation: 'Pass 1: (5,1)->swap {1,5,4,2,8}, (5,4)->swap {1,4,5,2,8}, (5,2)->swap {1,4,2,5,8}, (5,8)->no swap (3 swaps). Pass 2: (1,4)->no, (4,2)->swap {1,2,4,5,8}, (4,5)->no (1 swap). Pass 3 & 4: 0 swaps. Total swaps = 3 + 1 = 4.',
    hints: [
      'Count swaps in Pass 1: 5 swaps with 1, 4, and 2 (3 swaps).',
      'Count swaps in Pass 2: 4 swaps with 2 (1 swap). Array is now {1,2,4,5,8}.',
      'Remaining passes perform 0 swaps. Total = 3 + 1 = 4.',
    ],
  },
  {
    id: 'ch_19_swap_logic_construction',
    nodeId: NODE_C9_CS_035,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the correct three-line temporary variable swap algorithm for adjacent array slots arr[j] and arr[j+1].',
    availableParts: ['int temp = arr[j];', 'arr[j] = arr[j+1];', 'arr[j+1] = temp;', 'arr[j+1] = arr[j];'],
    targetState: 'int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;',
    validationHint: 'Save arr[j] in temp, overwrite arr[j] with arr[j+1], then assign temp to arr[j+1].',
    explanation: 'A temporary variable holds arr[j] before it is overwritten by arr[j+1]. Without temp, writing arr[j] = arr[j+1] would destroy the original value of arr[j].',
    hints: [
      'First step: store arr[j] safely in a temp variable.',
      'Second step: copy arr[j+1] into arr[j].',
      'Third step: restore the saved value from temp into arr[j+1].',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_20_sort_algorithm_order',
    nodeId: NODE_C9_CS_035,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Order the execution phases of a robust Java array processing system from input to final reporting.',
    sortItems: [
      'Allocate memory with new keyword based on N',
      'Populate elements via Scanner input loop',
      'Perform validation check on boundaries (0 to length-1)',
      'Sort elements via Bubble Sort passes',
      'Display sorted output and summary statistics',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'A systematic pipeline: first allocate array buffer, populate from input, validate constraints, execute algorithmic transformation (sort), and finally render results.',
    hints: [
      'You cannot read into an array before allocating memory with new.',
      'Validation comes after reading raw data and before processing.',
      'Displaying results is the final step.',
    ],
  },
  {
    id: 'ch_21_digital_footprint_evaluation',
    nodeId: NODE_C9_CS_036,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student posts defamatory comments on a social media forum and deletes the account 10 minutes later. Why does the risk persist under cyber ethics and digital footprint principles?',
    options: [
      'Because deleting an account permanently purges all internet backup servers instantly',
      'Data may have been archived by web crawlers, screenshotted by peers, or retained in ISP server audit logs',
      'Because ISPs automatically fine users 10,000 rupees for every deleted account',
      'There is no risk; deletion completely erases digital evidence from the universe',
    ],
    correctIndex: 1,
    explanation: 'A digital footprint is permanent and distributed. Screenshots, search engine caches, proxy server logs, and platform backups preserve records long after an individual account is deleted.',
    hints: [
      'Can peers take screenshots within 10 minutes?',
      'Do search engine spiders and server logs keep cached records?',
      'Digital footprints persist beyond client-side deletion.',
    ],
  },
  {
    id: 'ch_22_reverse_array_in_place',
    nodeId: NODE_C9_CS_034,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Which loop header correctly reverses an array of size N in place by swapping symmetric ends?',
    options: [
      'for (int i = 0; i < N; i++)',
      'for (int i = 0; i < N / 2; i++)',
      'for (int i = 1; i <= N; i++)',
      'for (int i = N; i > 0; i--)',
    ],
    correctIndex: 1,
    explanation: 'To reverse in place, swap arr[i] with arr[N - 1 - i] up to the midpoint (i < N / 2). If you loop all the way to N, elements get swapped twice, restoring the original order!',
    hints: [
      'If you swap every pair from 0 to N, what happens when you cross the halfway mark?',
      'Swapping twice undoes the swap!',
      'You only need to iterate up to the middle: i < N / 2.',
    ],
  },
  {
    id: 'ch_23_infinite_loop_math',
    nodeId: NODE_C9_CS_031,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Consider: int x = 10, count = 0;\nfor ( ; x > 0 ; x -= 3) {\n    count++;\n}\nHow many times does count increment before the loop terminates?',
    correctAnswer: 4,
    tolerance: 0,
    unit: 'iterations',
    explanation: 'Iteration 1: x=10 (>0 true), count=1, x becomes 7. Iteration 2: x=7 (>0 true), count=2, x becomes 4. Iteration 3: x=4 (>0 true), count=3, x becomes 1. Iteration 4: x=1 (>0 true), count=4, x becomes -2. Next check: -2 > 0 is false. count = 4.',
    hints: [
      'Trace x values: starts at 10, then 7, then 4, then 1.',
      'When x is 1, it enters the loop (4th time) and updates to 1 - 3 = -2.',
      'Next condition check: -2 > 0 is false, so loop ends.',
    ],
  },
  {
    id: 'ch_24_cyber_law_ethics_case',
    nodeId: NODE_C9_CS_036,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Under the Indian Information Technology Act and cyber ethics, using cracked commercial CAD software downloaded via torrent for a school project constitutes:',
    options: [
      'Fair use of open-source freeware with zero liability',
      'Software piracy and copyright infringement, violating intellectual property rights and exposing networks to trojans',
      'An approved educational exemption permitted without publisher license',
      'Legal shareware usage as long as the student is under 18',
    ],
    correctIndex: 1,
    explanation: 'Downloading or distributing cracked proprietary software is software piracy. It violates the IT Act & Copyright Act, deprives creators of compensation, and commonly bundles dangerous malware/trojans.',
    hints: [
      'Is proprietary software permitted to be cracked and distributed for free?',
      'Piracy violates intellectual property rights.',
      'Torrent cracks frequently package spyware and rootkits.',
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
  nodeId: NODE_C9_CS_031,
  title: 'Java Loops, Arrays & Cyber Security Lab',
  definition:
    'Comprehensive ICSE Class 9 framework covering iteration constructs (for, while, do-while), jump control (break, continue), 1D array indexing and algorithms (linear search, bubble sort, running extremes), alongside cyber ethics and online risk prevention.',
  eli5:
    'Think of loops as automated robotic gears that repeat tasks, arrays as indexed lockers holding sensor data, and cyber safety as the titanium vault protecting your computer from online malware and impostors.',
  misconceptions: [
    {
      misconception: 'The for-loop update expression executes before the loop body.',
      correction: 'The update expression runs strictly AFTER the loop body finishes on each iteration.',
    },
    {
      misconception: 'A while loop is guaranteed to execute at least once.',
      correction: 'A while loop is entry-controlled and executes ZERO times if its condition is false initially. Only do-while guarantees at least one execution.',
    },
    {
      misconception: 'The continue statement terminates the loop just like break.',
      correction: 'continue terminates ONLY the current iteration and jumps to the update/condition check. break exits the entire loop.',
    },
    {
      misconception: 'The size of an array named "arr" is accessed using arr.length().',
      correction: 'Array length is a public final field without parentheses: arr.length. Strings use length().',
    },
    {
      misconception: 'Deleting an offensive online post removes all digital traces immediately.',
      correction: 'Digital footprints persist in server logs, search caches, and recipient screenshots even after local deletion.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which loop is known as an entry-controlled loop?',
      options: ['do-while', 'while and for', 'do-while and for', 'switch-case'],
      correctIndex: 1,
    },
    {
      question: 'What is the index of the last element in an array of size 12?',
      options: ['12', '11', '10', '0'],
      correctIndex: 1,
    },
    {
      question: 'What happens when a break statement executes inside an unlabelled inner loop?',
      options: ['It exits both inner and outer loops', 'It exits only the innermost loop', 'It restarts the computer', 'It skips one iteration'],
      correctIndex: 1,
    },
    {
      question: 'Which character sequence represents the modulus operator for digit extraction?',
      options: ['/', '%', '#', '&'],
      correctIndex: 1,
    },
    {
      question: 'In Bubble Sort, what is the maximum number of passes needed for an array of size N?',
      options: ['N', 'N - 1', 'N * N', '2 * N'],
      correctIndex: 1,
    },
    {
      question: 'What does the "S" in HTTPS indicate?',
      options: ['Speed', 'Secure (Encrypted via SSL/TLS)', 'System', 'Software'],
      correctIndex: 1,
    },
    {
      question: 'What error occurs if you access arr[5] in an array of size 5?',
      options: ['NullPointerException', 'ArrayIndexOutOfBoundsException', 'ClassCastException', 'InfiniteLoopException'],
      correctIndex: 1,
    },
    {
      question: 'Which software licensing model provides a free trial period before requiring payment?',
      options: ['Freeware', 'Shareware', 'Proprietary only', 'Public Domain'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Student accurately traces and writes for/while/do-while loops, avoids off-by-one and infinite loop bugs, manipulates 1D arrays with bubble sort and linear search, and identifies cyber threats and responsible ethics.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Java For-Loop Clockwork Engine',
    instruction: 'Adjust the Counter Target slider and step through the 4-phase execution cycle: Init -> Condition -> Body -> Update.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_CS_031,
  },
  {
    title: '2. Entry-Controlled vs Exit-Controlled Gateways',
    instruction: 'Toggle initial condition to FALSE and compare how while (gate entrance) vs do-while (gate exit) behave.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C9_CS_032,
  },
  {
    title: '3. Break & Continue Flow Deflector',
    instruction: 'Select whether to inject "break" or "continue" at step i=3 and observe the loop output console.',
    interactionType: 'drag-classify',
    nodeId: NODE_C9_CS_033,
  },
  {
    title: '4. 1D Array Memory & Bubble Sort Step-Through',
    instruction: 'Click "Execute Next Step" to watch adjacent items compare and swap with temporary storage.',
    interactionType: 'drag-position',
    nodeId: NODE_C9_CS_035,
  },
  {
    title: '5. Cyber Defense & Digital Footprint Scanner',
    instruction: 'Click incoming packets to analyze URLs, SSL padlock integrity, and social media post permanence.',
    interactionType: 'drag-match',
    nodeId: NODE_C9_CS_036,
  },
];

// ─── PREDICTION QUESTIONS (Brilliant Pattern) ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If initial condition is FALSE (e.g., int x = 10; while(x < 5)), how many times does the while body execute?',
    options: ['0 times (skipped entirely)', '1 time', '5 times', 'Infinite times'],
    correctIndex: 0,
    verifyInstruction: 'Now click "Test While with False Condition" below to observe the gate block execution immediately.',
    nodeId: NODE_C9_CS_032,
  },
  {
    question: 'Predict: If an array holds {40, 10, 25, 5}, which element is guaranteed to be at the final index after Pass 1 of Bubble Sort?',
    options: ['5 (smallest)', '10', '25', '40 (largest)'],
    correctIndex: 3,
    verifyInstruction: 'Click "Run Pass 1" in the visualizer to see the largest value bubble to the end.',
    nodeId: NODE_C9_CS_035,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the loop variable "i" when the for-loop condition finally evaluates to FALSE?',
    observableOptions: [
      'i equals the upper bound limit + 1 (e.g., i becomes 4 for condition i < 4)',
      'i resets back to 0 automatically',
      'i becomes negative',
      'i is destroyed and turns into null',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_CS_031,
  },
  {
    question: 'In the Bubble Sort visualizer, what happens to the unsorted search boundary after each complete outer pass?',
    observableOptions: [
      'The boundary shrinks by 1 from the right because the tail is already sorted',
      'The array doubles in size',
      'The boundary expands to check sorted elements again',
      'All elements reset to zero',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_CS_035,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Mission CyberRover: ISRO Telemetry & Security Audit',
  description:
    'You are deploying a telemetry verification script for an autonomous rover subsystem. Synthesize array validation with secure credential handling.',
  steps: [
    'Initialize double[] roverTemps = new double[10]; to log hourly Martian soil sensor readings.',
    'Traverse the array using for(int i=0; i<roverTemps.length; i++) to compute average and detect peak thermal anomalies.',
    'Implement a linear search with early "break" to locate critical radiation thresholds above 85.0 mSv.',
    'Enforce Cyber Ethics protocol: encrypt ground station telemetry links with TLS (HTTPS) and avoid hardcoding passwords in public repositories.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

function C9_ComputerScienceJavaLoopSyntaxSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C9_CS_031,
  title = DEFAULT_PROPS.title || 'Java Loops & Arrays',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['compsci'] || {
    name: 'Computer Science',
    emoji: '💻',
    color: 'emerald',
  };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant Exploration & Predict-Check States
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);
  const [, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [, setObservationIndex] = useState(-1);

  // Interactive Visualizer Sandbox State
  const [forLoopLimit, setForLoopLimit] = useState<number>(4);
  const [forLoopCurrentStep, setForLoopCurrentStep] = useState<number>(0);
  const [forLoopActivePhase, setForLoopActivePhase] = useState<'idle' | 'init' | 'cond' | 'body' | 'update' | 'term'>('idle');
  const [forLoopOutput, setForLoopOutput] = useState<number[]>([]);

  // While vs Do-While Interactive State
  const [whileInitVal, setWhileInitVal] = useState<number>(10);
  const [whileGateResult, setWhileGateResult] = useState<string>('Not tested');
  const [whileExecLog, setWhileExecLog] = useState<string[]>([]);

  // Break / Continue Deflector State
  const [loopInterruptMode, setLoopInterruptMode] = useState<'normal' | 'break' | 'continue'>('normal');
  const [interruptLog, setInterruptLog] = useState<string[]>([]);

  // Bubble Sort Visualizer State
  const [sortArray, setSortArray] = useState<number[]>([42, 18, 25, 10, 7]);
  const [sortI, setSortI] = useState<number>(0);
  const [sortJ, setSortJ] = useState<number>(0);
  const [comparingIndices, setComparingIndices] = useState<[number, number] | null>(null);
  const [tempSwapVal, setTempSwapVal] = useState<number | null>(null);
  const [sortStatusMsg, setSortStatusMsg] = useState<string>('Ready to step through bubble sort');

  // Cyber Security Scanner Interactive State
  const [, setSelectedThreat] = useState<string | null>(null);
  const [scannedItems, setScannedItems] = useState<Record<string, 'safe' | 'threat' | null>>({
    item_bank_url: null,
    item_pwd_hash: null,
    item_torrent_file: null,
    item_social_chat: null,
  });

  // Adaptive Scoring, BKT & SRS State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [errors, setErrors] = useState<number>(0);

  // Reflection responses
  const [reflections, setReflections] = useState<{ q1: string; q2: string; q3: string }>({
    q1: '',
    q2: '',
    q3: '',
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState<boolean>(false);

  // Escalating Hints & Interaction Feedback State
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Drag and Drop & Construction Challenge State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);

  // Visual Effects
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // References
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter Challenges by Adaptive Difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adapt difficulty when BKT score shifts
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff: 'foundation' | 'standard' | 'advanced' =
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

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // 2D Canvas Animation for Loop Execution Telemetry
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Sine wave representing data packets in memory
      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x + tick * 2) * 0.05) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Memory slot markers
      const slots = 6;
      for (let i = 0; i < slots; i++) {
        const slotX = 30 + i * 45;
        const slotY = canvas.height / 2;
        ctx.fillStyle = i === sortJ ? '#ec4899' : '#38bdf8';
        ctx.beginPath();
        ctx.arc(slotX, slotY + Math.sin((slotX + tick * 2) * 0.05) * 12, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrameId);
  }, [sortJ]);

  // ─── CALLBACKS ───

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
      speechManager.speak('Let us review the complete step-by-step trace together.');
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Spot on! The loop runs 3 times for p = 5, 3, and 1.'
        : 'Good prediction attempt! Let us explore why the loop executes 3 times.'
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab. Walk through each construct.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with algorithms without time pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge protocol initiated! Show your algorithmic mastery.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded. Now interact with the visualizer to test it!');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding scientific observation!' : 'Review the visualization state carefully.');
  }, []);

  const handleForLoopStep = useCallback(() => {
    audioManager.play('count');
    setForLoopActivePhase((prev) => {
      if (prev === 'idle' || prev === 'term') {
        setForLoopCurrentStep(0);
        setForLoopOutput([]);
        return 'init';
      }
      if (prev === 'init') {
        return 'cond';
      }
      if (prev === 'cond') {
        if (forLoopCurrentStep < forLoopLimit) {
          return 'body';
        } else {
          return 'term';
        }
      }
      if (prev === 'body') {
        setForLoopOutput((old) => [...old, forLoopCurrentStep]);
        return 'update';
      }
      if (prev === 'update') {
        setForLoopCurrentStep((c) => c + 1);
        return 'cond';
      }
      return 'idle';
    });
  }, [forLoopCurrentStep, forLoopLimit]);

  const handleResetForLoop = useCallback(() => {
    audioManager.play('pop');
    setForLoopCurrentStep(0);
    setForLoopActivePhase('idle');
    setForLoopOutput([]);
  }, []);

  const handleTestWhileGate = useCallback(
    (startVal: number) => {
      audioManager.play('tap');
      setWhileInitVal(startVal);
      const isTrue = startVal < 5;
      if (isTrue) {
        setWhileGateResult(`Condition (${startVal} < 5) is TRUE: Body executes!`);
        setWhileExecLog([`Step 1: Check ${startVal} < 5 -> TRUE`, `Step 2: Print ${startVal}`, `Step 3: Increment ${startVal + 1}`]);
      } else {
        setWhileGateResult(`Condition (${startVal} < 5) is FALSE: Body skipped entirely (0 iterations)!`);
        setWhileExecLog([`Step 1: Check ${startVal} < 5 -> FALSE`, 'Body NEVER entered! Program moves past loop.']);
      }
    },
    []
  );

  const handleTestDoWhileGate = useCallback((startVal: number) => {
    audioManager.play('tap');
    setWhileInitVal(startVal);
    const condAfter = startVal + 1 < 5;
    setWhileGateResult(`DO-WHILE: Body executed once (printed ${startVal}). Condition check at bottom (${startVal + 1} < 5) = ${condAfter}.`);
    setWhileExecLog([
      `Step 1: Execute body unconditionally -> Print ${startVal}`,
      `Step 2: Update value to ${startVal + 1}`,
      `Step 3: Evaluate bottom condition (${startVal + 1} < 5) -> ${condAfter ? 'Repeat' : 'Terminate'}`,
    ]);
  }, []);

  const handleRunInterruptTrace = useCallback((mode: 'normal' | 'break' | 'continue') => {
    audioManager.play('swoop');
    setLoopInterruptMode(mode);
    const logs: string[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i === 3) {
        if (mode === 'break') {
          logs.push(`i = 3: BREAK executed! -> Abort loop entirely.`);
          break;
        } else if (mode === 'continue') {
          logs.push(`i = 3: CONTINUE executed! -> Skip println(3), jump to i++.`);
          continue;
        }
      }
      logs.push(`i = ${i}: Printed ${i}`);
    }
    setInterruptLog(logs);
  }, []);

  const handleStepBubbleSort = useCallback(() => {
    audioManager.play('tap');
    const n = sortArray.length;
    if (sortI >= n - 1) {
      setSortStatusMsg('Array is fully sorted! Bubble Sort completed.');
      audioManager.play('success');
      return;
    }

    const arr = [...sortArray];
    const j = sortJ;
    setComparingIndices([j, j + 1]);

    if (arr[j] > arr[j + 1]) {
      const temp = arr[j];
      setTempSwapVal(temp);
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
      setSortArray(arr);
      audioManager.play('balance');
      setSortStatusMsg(`Swapped arr[${j}] (${temp}) with arr[${j + 1}] (${arr[j]})`);
    } else {
      setTempSwapVal(null);
      setSortStatusMsg(`No swap needed: arr[${j}] (${arr[j]}) <= arr[${j + 1}] (${arr[j + 1]})`);
    }

    if (j < n - 2 - sortI) {
      setSortJ(j + 1);
    } else {
      setSortJ(0);
      setSortI(sortI + 1);
      setSortStatusMsg(`Pass ${sortI + 1} completed! Element ${arr[n - 1 - sortI]} locked in position.`);
      setPredictionVerified(true);
    }
  }, [sortArray, sortI, sortJ]);

  const handleResetBubbleSort = useCallback(() => {
    audioManager.play('pop');
    setSortArray([42, 18, 25, 10, 7]);
    setSortI(0);
    setSortJ(0);
    setComparingIndices(null);
    setTempSwapVal(null);
    setSortStatusMsg('Array reset to initial state: {42, 18, 25, 10, 7}');
  }, []);

  const handleScanThreat = useCallback((itemId: string, classification: 'safe' | 'threat') => {
    audioManager.play(classification === 'threat' ? 'sparkle' : 'tap');
    setScannedItems((prev) => ({ ...prev, [itemId]: classification }));
    setSelectedThreat(itemId);
  }, []);

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

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        const base = prev.length === challenge.sortItems?.length ? [...prev] : challenge.sortItems?.map((_, i) => i) || [];
        const [moved] = base.splice(fromIndex, 1);
        base.splice(toIndex, 0, moved);
        return base;
      });
    },
    [challenge]
  );

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Mission accomplished with a score of ${finalScore} percent!`);
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
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

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
        speechManager.speak('Correct! Excellent algorithmic execution.');
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
          speechManager.speak('Let us study the complete dry run trace.');
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

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 p-4 mb-6 bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-xl border border-gold-700/50">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                ICSE Class 9 Computer Science
              </span>
              <span className="text-xs font-mono text-slate-400">c9_cs_031 - 036</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/70 rounded-xl border border-slate-800 text-xs font-semibold">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'challenge') handleAdvanceToChallenge();
                else if (p === 'explore') handleAdvanceToExploration();
                else if (p === 'sandbox') handleAdvanceToSandbox();
                else setPhase(p);
              }}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                phase === p ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-900 rounded-2xl border border-gold-800/60 shadow-xl">
            <div className="flex items-center gap-2 mb-2 text-gold-400 font-mono text-sm">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-gold-500 animate-pulse" />
              MISSION BRIEFING // TELEMETRY PARSER
            </div>
            <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-gold-200/80 text-xs mt-3 p-3 bg-gold-950/40 rounded-xl border border-gold-700/30">
              ⚡ {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Curiosity Challenge (Ungraded)</span>
              <span className="text-xs text-slate-500 font-mono">Step 0 of 5</span>
            </div>
            <p className="text-base sm:text-lg font-semibold text-white whitespace-pre-line leading-relaxed">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect
                      ? 'bg-slate-800/50 border-slate-700 text-slate-400 opacity-60'
                      : 'bg-slate-800 border-slate-700 hover:border-gold-500 text-slate-200'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-lg bg-slate-700 text-center text-xs leading-6 font-mono mr-2">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <p className={`text-sm font-semibold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! p starts at 5, drops to 3, then 1, executing 3 times.' : `ℹ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-600/30 flex items-center gap-2"
                >
                  Enter Interactive Exploration Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. INTERACTIVE EXPLORATION PHASE (Brilliant Style) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Guided Interactive Lab</span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <span className="px-3 py-1 bg-gold-950 border border-gold-700 text-gold-300 rounded-lg text-xs font-mono font-bold">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
          </div>

          <p className="text-amber-400 text-sm font-medium flex items-center gap-2">
            <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
            >
              {/* SLIDE 0: FOR-LOOP STEPPER VISUALIZER (SVG DIAGRAM 1) */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400">Loop Bound (Upper Limit N): {forLoopLimit}</label>
                      <input
                        type="range"
                        min={2}
                        max={6}
                        value={forLoopLimit}
                        onChange={(e) => setForLoopLimit(Number(e.target.value))}
                        className="w-48 accent-gold-500 cursor-pointer"
                        aria-label="Set for loop upper limit"
                      />
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleForLoopStep}
                        className="px-4 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-md shadow-gold-600/30"
                      >
                        Step Next Cycle ➔
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleResetForLoop}
                        className="px-3 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-700"
                      >
                        Reset
                      </motion.button>
                    </div>
                  </div>

                  {/* SVG Loop Engine State Diagram 1 */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 180" className="w-full h-auto">
                      <path d="M 120 70 L 210 70" stroke="#475569" strokeWidth="2" strokeDasharray="4" />
                      <path d="M 290 70 L 380 70" stroke="#475569" strokeWidth="2" />
                      <path d="M 440 70 L 520 70" stroke="#475569" strokeWidth="2" />
                      <path d="M 520 95 C 520 150, 250 150, 250 95" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="3" />

                      <g transform="translate(40, 45)">
                        <rect
                          width="80"
                          height="50"
                          rx="8"
                          fill={forLoopActivePhase === 'init' ? '#312e81' : '#1e293b'}
                          stroke={forLoopActivePhase === 'init' ? '#818cf8' : '#334155'}
                          strokeWidth={2}
                        />
                        <text x="40" y="24" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">1. INIT</text>
                        <text x="40" y="38" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">int i = 0</text>
                      </g>

                      <g transform="translate(210, 45)">
                        <polygon
                          points="40,0 80,25 40,50 0,25"
                          fill={forLoopActivePhase === 'cond' ? '#1e3a5f' : '#1e293b'}
                          stroke={forLoopActivePhase === 'cond' ? '#38bdf8' : '#334155'}
                          strokeWidth={2}
                        />
                        <text x="40" y="24" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">2. COND</text>
                        <text x="40" y="36" fill="#38bdf8" fontSize="8" textAnchor="middle" fontFamily="monospace">i &lt; {forLoopLimit}</text>
                      </g>

                      <g transform="translate(360, 45)">
                        <rect
                          width="90"
                          height="50"
                          rx="8"
                          fill={forLoopActivePhase === 'body' ? '#064e3b' : '#1e293b'}
                          stroke={forLoopActivePhase === 'body' ? '#34d399' : '#334155'}
                          strokeWidth={2}
                        />
                        <text x="45" y="24" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">3. BODY</text>
                        <text x="45" y="38" fill="#34d399" fontSize="8" textAnchor="middle" fontFamily="monospace">print(i)</text>
                      </g>

                      <g transform="translate(490, 45)">
                        <rect
                          width="70"
                          height="50"
                          rx="8"
                          fill={forLoopActivePhase === 'update' ? '#701a75' : '#1e293b'}
                          stroke={forLoopActivePhase === 'update' ? '#f472b6' : '#334155'}
                          strokeWidth={2}
                        />
                        <text x="35" y="24" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">4. UPDATE</text>
                        <text x="35" y="38" fill="#f472b6" fontSize="9" textAnchor="middle" fontFamily="monospace">i++</text>
                      </g>
                    </svg>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs">
                      <div>
                        <span className="text-slate-400">Current Variable i = </span>
                        <span className="font-mono text-amber-300 font-bold text-sm">{forLoopCurrentStep}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Status Phase: </span>
                        <span className="font-mono uppercase font-bold text-gold-400">{forLoopActivePhase}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400">Console Output: </span>
                        <span className="font-mono bg-slate-900 px-2 py-0.5 rounded text-emerald-400">
                          {forLoopOutput.length > 0 ? forLoopOutput.join(', ') : 'empty'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Observation hook */}
                  {forLoopActivePhase === 'term' && !observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-gold-950/40 rounded-xl border border-gold-700/50 space-y-2">
                      <p className="text-xs font-bold text-gold-300">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, oIdx) => (
                          <motion.button
                            key={oIdx}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleObservation(oIdx)}
                            className="p-2 bg-slate-800 rounded-lg text-left text-xs text-slate-200 hover:bg-slate-700 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* SLIDE 1: WHILE VS DO-WHILE (SVG DIAGRAM 2) */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* Predict Check */}
                  {!predictionMade ? (
                    <div className="p-4 bg-gold-950/50 rounded-xl border border-gold-800 space-y-3">
                      <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, pIdx) => (
                          <motion.button
                            key={pIdx}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(pIdx)}
                            className="p-2.5 bg-slate-800 rounded-xl text-left text-xs text-slate-200 hover:bg-slate-700 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-amber-950/40 border border-amber-700/40 rounded-xl text-xs text-amber-300">
                      ⚡ {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </div>
                  )}

                  {/* SVG Flowchart Diagram 2 */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 130" className="w-full h-auto">
                      <text x="140" y="20" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">WHILE (Pre-Test Flow)</text>
                      <polygon points="140,30 180,50 140,70 100,50" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      <text x="140" y="53" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">Condition?</text>
                      <path d="M 180 50 L 220 50 L 220 100 L 140 100 L 140 85" fill="none" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow)" />
                      <rect x="100" y="80" width="80" height="24" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="1" />
                      <text x="140" y="95" fill="#34d399" fontSize="9" textAnchor="middle">Execute Body</text>
                      <path d="M 100 50 L 40 50 L 40 115 L 140 115" fill="none" stroke="#f87171" strokeWidth="1.5" strokeDasharray="3" />
                      <text x="55" y="45" fill="#f87171" fontSize="8">False (Skip)</text>

                      <text x="440" y="20" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle">DO-WHILE (Post-Test Flow)</text>
                      <rect x="400" y="32" width="80" height="24" rx="4" fill="#581c87" stroke="#c084fc" strokeWidth="1" />
                      <text x="440" y="47" fill="#f3e8ff" fontSize="9" textAnchor="middle">1. Execute Body</text>
                      <path d="M 440 56 L 440 70" stroke="#94a3b8" strokeWidth="2" />
                      <polygon points="440,70 480,90 440,110 400,90" fill="#0f172a" stroke="#c084fc" strokeWidth="2" />
                      <text x="440" y="93" fill="#c084fc" fontSize="9" textAnchor="middle" fontWeight="bold">Condition?</text>
                      <path d="M 480 90 L 520 90 L 520 44 L 480 44" fill="none" stroke="#34d399" strokeWidth="2" />
                      <text x="525" y="70" fill="#34d399" fontSize="8">True (Repeat)</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* While Gate */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-gold-400">while (Entry-Controlled)</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-gold-950 text-gold-300 border border-gold-800">Pre-Test</span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono">int x = {whileInitVal}; while(x &lt; 5) {'{ print(x); x++; }'}</p>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleTestWhileGate(10)}
                          className="px-3 py-1.5 bg-rose-600/80 hover:bg-rose-600 text-white rounded-lg text-xs font-semibold"
                        >
                          Test with x = 10 (FALSE)
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleTestWhileGate(2)}
                          className="px-3 py-1.5 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold"
                        >
                          Test with x = 2 (TRUE)
                        </motion.button>
                      </div>
                    </div>

                    {/* Do-While Gate */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-purple-400">do-while (Exit-Controlled)</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">Post-Test</span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono">do {'{ print(x); x++; }'} while(x &lt; 5);</p>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleTestDoWhileGate(10)}
                          className="px-3 py-1.5 bg-purple-600/80 hover:bg-purple-600 text-white rounded-lg text-xs font-semibold"
                        >
                          Test with x = 10 (Runs 1 time!)
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Execution Trace Logger */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs font-mono text-slate-400 block mb-1">Gate Evaluation Result:</span>
                    <p className="text-xs font-mono text-amber-300 mb-2">{whileGateResult}</p>
                    <div className="space-y-1">
                      {whileExecLog.map((line, lIdx) => (
                        <div key={lIdx} className="text-[11px] font-mono text-slate-400">
                          &gt; {line}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: BREAK & CONTINUE (SVG DIAGRAM 3) */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* SVG Diagram 3: Break vs Continue Jump Paths */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 120" className="w-full h-auto">
                      <rect x="30" y="40" width="100" height="40" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                      <text x="80" y="64" fill="#f8fafc" fontSize="10" textAnchor="middle" fontWeight="bold">Iteration i</text>

                      <path d="M 130 60 L 190 60" stroke="#94a3b8" strokeWidth="2" />

                      <polygon points="230,40 270,60 230,80 190,60" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                      <text x="230" y="63" fill="#e0e7ff" fontSize="8" textAnchor="middle" fontWeight="bold">i == 3 ?</text>

                      {/* Break route */}
                      <path d="M 230 80 L 230 105 L 480 105" fill="none" stroke="#f43f5e" strokeWidth="2" />
                      <rect x="480" y="90" width="90" height="30" rx="6" fill="#881337" stroke="#f43f5e" strokeWidth="1.5" />
                      <text x="525" y="108" fill="#ffe4e6" fontSize="9" textAnchor="middle" fontWeight="bold">break; ➔ EXIT</text>

                      {/* Continue route */}
                      <path d="M 230 40 L 230 15 L 80 15 L 80 40" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4" />
                      <text x="150" y="12" fill="#fbbf24" fontSize="8" fontWeight="bold">continue; ➔ JUMP TO UPDATE (i++)</text>

                      {/* Regular route */}
                      <path d="M 270 60 L 350 60" stroke="#34d399" strokeWidth="2" />
                      <rect x="350" y="40" width="100" height="40" rx="6" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
                      <text x="400" y="64" fill="#d1fae5" fontSize="9" textAnchor="middle" fontWeight="bold">Body: print(i)</text>
                    </svg>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400">Loop: for(int i=1; i&lt;=5; i++) with if(i == 3)</span>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRunInterruptTrace('normal')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          loopInterruptMode === 'normal' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        Normal Run
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRunInterruptTrace('break')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          loopInterruptMode === 'break' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        Inject BREAK at i=3
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRunInterruptTrace('continue')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          loopInterruptMode === 'continue' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        Inject CONTINUE at i=3
                      </motion.button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Visual Iteration Track (1 to 5)</h4>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((num) => {
                          const isSkipped = (loopInterruptMode === 'break' && num >= 3) || (loopInterruptMode === 'continue' && num === 3);
                          return (
                            <div
                              key={num}
                              className={`flex-1 py-4 text-center rounded-xl font-mono font-bold text-sm border transition-all ${
                                isSkipped
                                  ? 'bg-rose-950/40 border-rose-800 text-rose-400 line-through opacity-50'
                                  : 'bg-emerald-950/40 border-emerald-700 text-emerald-300'
                              }`}
                            >
                              i = {num}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Step Log</h4>
                      <div className="space-y-1 max-h-28 overflow-y-auto font-mono text-xs text-slate-300">
                        {interruptLog.length > 0 ? (
                          interruptLog.map((log, idx) => (
                            <div key={idx} className={log.includes('BREAK') ? 'text-rose-400 font-bold' : log.includes('CONTINUE') ? 'text-amber-400 font-bold' : ''}>
                              {log}
                            </div>
                          ))
                        ) : (
                          <div className="text-slate-500">Click a button above to run the trace...</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: 1D ARRAY & BUBBLE SORT */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Pass: {sortI + 1}</span>
                      <span className="text-xs text-slate-400">Comparing: j={sortJ} &amp; j+1={sortJ + 1}</span>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleStepBubbleSort}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30"
                      >
                        Execute Next Comparison ➔
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleResetBubbleSort}
                        className="px-3 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
                      >
                        Reset Array
                      </motion.button>
                    </div>
                  </div>

                  {/* Visual Array Blocks */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="grid grid-cols-5 gap-2 sm:gap-3">
                      {sortArray.map((val, idx) => {
                        const isComparing = comparingIndices && (idx === comparingIndices[0] || idx === comparingIndices[1]);
                        const isSortedTail = idx >= sortArray.length - sortI && sortI > 0;
                        return (
                          <motion.div
                            key={idx}
                            layout
                            className={`p-4 rounded-xl text-center border font-mono transition-all ${
                              isComparing
                                ? 'bg-amber-950/60 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/20 scale-105'
                                : isSortedTail
                                ? 'bg-gold-950/60 border-gold-500 text-gold-300'
                                : 'bg-slate-900 border-slate-700 text-white'
                            }`}
                          >
                            <span className="text-[10px] text-slate-500 block">arr[{idx}]</span>
                            <span className="text-xl sm:text-2xl font-black">{val}</span>
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-slate-800">
                      <span className="text-slate-400">Status: <span className="text-emerald-400 font-semibold">{sortStatusMsg}</span></span>
                      {tempSwapVal !== null && (
                        <span className="font-mono bg-purple-950 border border-purple-700 px-2 py-0.5 rounded text-purple-300">
                          temp = {tempSwapVal}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: CYBER DEFENSE & ETHICS */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-2">Live Packet &amp; Asset Inspector</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: 'item_bank_url', label: 'http://sbi-login-verify-pass.cc', type: 'Phishing Url', risk: 'threat' },
                        { id: 'item_pwd_hash', label: 'P@ssw0rd!Secure2026', type: 'Strong Complex Password', risk: 'safe' },
                        { id: 'item_torrent_file', label: 'Photoshop_Crack_v2024.torrent', type: 'Software Piracy / Trojan', risk: 'threat' },
                        { id: 'item_social_chat', label: 'Posting peer Aadhaar on group chat', type: 'Privacy Violation', risk: 'threat' },
                      ].map((item) => {
                        const status = scannedItems[item.id];
                        return (
                          <div key={item.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono text-slate-300 font-semibold truncate max-w-[200px]">{item.label}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">{item.type}</span>
                            </div>

                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleScanThreat(item.id, 'safe')}
                                className={`flex-1 py-1 text-xs rounded font-bold border ${
                                  status === 'safe'
                                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                                    : 'bg-slate-800 border-slate-700 text-slate-300'
                                }`}
                              >
                                Mark Safe
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleScanThreat(item.id, 'threat')}
                                className={`flex-1 py-1 text-xs rounded font-bold border ${
                                  status === 'threat'
                                    ? 'bg-rose-950 border-rose-500 text-rose-300'
                                    : 'bg-slate-800 border-slate-700 text-slate-300'
                                }`}
                              >
                                Quarantine Risk
                              </motion.button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Stepper Navigation */}
          <div className="flex justify-between items-center p-3 bg-slate-900 rounded-2xl border border-slate-800">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-mono">
              Module {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-md shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30"
              >
                Launch Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <span>🛠</span> Free Exploration Sandbox
            </div>
            <h3 className="text-xl font-black text-white">Algorithmic Sandbox &amp; Live Telemetry Canvas</h3>
            <p className="text-slate-400 text-xs">
              Zero grading pressure. Test custom upper bounds, simulate nested conditions, and observe real-time telemetry array rendering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 2D Canvas Loop Memory Stream */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Live Array Memory Stream (2D Canvas)</span>
              <canvas ref={canvasRef} width={400} height={120} className="w-full bg-slate-950 rounded-xl border border-slate-800" />
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Active Pointer: Index {sortJ}</span>
                <span className="font-mono text-emerald-400">Status: Memory Nominal</span>
              </div>
            </div>

            {/* Quick Interactive Bubble Sort Sandbox */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Array Sort Sandbox</span>
              <div className="flex gap-1.5 font-mono text-center">
                {sortArray.map((num, i) => (
                  <div key={i} className="flex-1 p-2 bg-slate-950 rounded-lg border border-slate-800 text-amber-300 font-bold text-sm">
                    {num}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleStepBubbleSort}
                  className="flex-1 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-md shadow-gold-600/30"
                >
                  Step Sort
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleResetBubbleSort}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Reset
                </motion.button>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2"
          >
            I am Ready for Challenges! 🚀
          </motion.button>
        </motion.div>
      )}

      {/* ─── 4. STRUCTURED CHALLENGE PHASE (Adaptive BKT) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">
                  Question {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : difficulty === 'standard'
                      ? 'bg-gold-500/20 text-gold-300 border-gold-500/30'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  }`}
                >
                  {difficulty} Tier
                </motion.span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {challenge.competencyLevel}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono">BKT Mastery: {masteryLevel}</span>
              <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-500 to-emerald-400 rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* QUESTION CARD */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-white whitespace-pre-line leading-relaxed">
              {challenge.question}
            </h3>

            {/* MCQ / CLASSIFY / DISTINGUISH */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`p-4 rounded-xl text-left text-xs sm:text-sm font-medium transition-all border ${
                      wrongFlash
                        ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/20'
                        : 'bg-slate-800/80 border-slate-700 hover:border-gold-500 text-slate-200'
                    }`}
                  >
                    <span className="inline-block w-6 h-6 rounded-lg bg-slate-700/80 text-center text-xs leading-6 font-mono mr-2">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL CHALLENGE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 block w-full mb-1">Drag items below to their correct target:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 text-white rounded-lg text-xs font-mono font-semibold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map((slotKey) => (
                    <div
                      key={slotKey}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(slotKey)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 text-center min-h-[90px] flex flex-col justify-center items-center gap-1"
                    >
                      <span className="text-[10px] uppercase font-bold text-slate-400">{slotKey.replace('slot_', '')}</span>
                      <span className="font-mono text-xs font-bold text-amber-300">
                        {droppedLabels[slotKey] || 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-md shadow-gold-600/30"
                >
                  Verify Target Positions
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <span className="text-xs text-slate-400 block">Drag items up and down into correct sequence:</span>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
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
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-700 text-center leading-6 font-mono text-xs font-bold">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
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
                  className="px-5 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-md shadow-gold-600/30"
                >
                  Confirm Sorted Order
                </motion.button>
              </div>
            )}

            {/* NUMERIC CHALLENGE */}
            {challenge.type === 'numeric' && (
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value..."
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-gold-500 w-52"
                  aria-label="Enter numeric answer"
                />
                {challenge.unit && <span className="text-xs font-mono text-slate-400">{challenge.unit}</span>}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(numericInput)}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-md shadow-gold-600/30"
                >
                  Submit Value
                </motion.button>
              </div>
            )}

            {/* CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, pIdx) => (
                    <motion.button
                      key={pIdx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-900/80 hover:bg-gold-800 text-gold-200 border border-gold-700/50 rounded-lg text-xs font-mono"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[80px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, cIdx) => (
                    <motion.span
                      key={cIdx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-2.5 py-1 bg-slate-800 rounded text-xs font-mono text-emerald-300 border border-slate-700 flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== cIdx))}
                        className="text-rose-400 hover:text-rose-300 ml-1 text-xs"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click parts above to construct logic statements...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-5 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-md shadow-gold-600/30 disabled:opacity-40"
                >
                  Verify Constructed Code
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-amber-950/30 border border-amber-700/50 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Step-by-Step Computational Trace</span>
                <div className="space-y-1.5">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.p key={sIdx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs sm:text-sm text-amber-200 leading-relaxed">
                        <span className="font-bold text-amber-400">{sIdx + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex gap-2">
                  {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-2 bg-amber-800 text-white rounded-xl text-xs font-bold hover:bg-amber-700"
                    >
                      Show Next Trace Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission Score →' : 'Proceed to Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & MASTERY SUMMARY PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/80 via-slate-900 to-slate-900 rounded-3xl border border-gold-700/60 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">MISSION AUDIT COMPLETE</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">Algorithmic Telemetry Certified</h2>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Final Score</span>
                <p className="text-3xl font-black text-emerald-400 font-mono">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
            </div>

            {/* Motivational Banner based on errors */}
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
              <h3 className="text-base font-black text-amber-400 mb-1">
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </h3>
              <p className="text-xs text-slate-300">
                {errors === 0
                  ? 'Flawless execution of Java iteration, array traversals, bubble sorts, and cyber protocols!'
                  : errors <= 3
                  ? 'Strong computational thinking and solid code trace capabilities.'
                  : errors <= 7
                  ? 'Good conceptual grasp. A little more dry-run practice with array boundary limits will make you unstoppable!'
                  : 'Every programming master encounters tricky loops and bounds. Review the explanations and retry for mastery!'}
              </p>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/50 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                <span>⚠</span> Identified Conceptual Gaps &amp; Fixes:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-900/40 text-xs space-y-1">
                      <p className="text-rose-300 font-semibold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-mono">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-gold-900/50 space-y-4">
            <h3 className="text-base font-black text-gold-300 flex items-center gap-2">
              <span>💭</span> Reflect on Your Learning
            </h3>
            <p className="text-xs text-slate-400">
              Deepen your neural pathways by synthesizing what you discovered during this simulation.
            </p>

            <div className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflections.q1}
                  onChange={(e) => setReflections((r) => ({ ...r, q1: e.target.value }))}
                  placeholder="e.g., How continue in a while loop can trap the counter variable into an infinite loop..."
                  rows={2}
                  className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflections.q2}
                  onChange={(e) => setReflections((r) => ({ ...r, q2: e.target.value }))}
                  placeholder="e.g., A for-loop is like an automated counting gear that tests a condition before each turn..."
                  rows={2}
                  className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflections.q3}
                  onChange={(e) => setReflections((r) => ({ ...r, q3: e.target.value }))}
                  placeholder="e.g., Scanning telemetry streams from sensors, sorting high scores in a game, or filtering spam emails..."
                  rows={2}
                  className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setReflectionSubmitted(true);
                  audioManager.play('success');
                }}
                className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
              >
                {reflectionSubmitted ? '✓ Reflection Saved!' : 'Save Reflection'}
              </motion.button>
            </div>
          </div>

          {/* Spaced Repetition (SRS) Status */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">Spaced Repetition Schedule (SM-2)</h4>
              <p className="text-xs text-slate-400">
                Review this module in{' '}
                <span className="text-amber-300 font-bold font-mono">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </span>{' '}
                to maximize long-term neural retention.
              </p>
            </div>
            <span className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-gold-300">
              Intervals: {REVIEW_INTERVAL_DAYS.slice(0, 3).join(', ')} days
            </span>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-lg font-bold text-gold-300 flex items-center gap-2">
              <span>🛰</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-gold-400 font-mono font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_ComputerScienceJavaLoopSyntaxSim;
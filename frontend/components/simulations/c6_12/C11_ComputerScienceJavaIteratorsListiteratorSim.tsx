'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 11 COMPUTER SCIENCE NODE IDS ───
const NODE_C11_CS_071 = 'c11_cs_071'; // Java iterators and ListIterator - traversing collections
const NODE_C11_CS_072 = 'c11_cs_072'; // Stack using collections and linked list implementation
const NODE_C11_CS_073 = 'c11_cs_073'; // Queue using collections and circular queue implementation
const NODE_C11_CS_074 = 'c11_cs_074'; // Algorithm design techniques - brute force, divide and conquer, greedy
const NODE_C11_CS_075 = 'c11_cs_075'; // Merge sort algorithm - divide, conquer, merge, O(n log n)
const NODE_C11_CS_076 = 'c11_cs_076'; // Tree data structure - binary tree, BST, traversal (inorder, preorder, postorder)
const NODE_C11_CS_077 = 'c11_cs_077'; // Java capstone - school management system with OOP and collections
const NODE_C11_CS_078 = 'c11_cs_078'; // Java capstone - inventory management with inheritance and polymorphism
const NODE_C11_CS_079 = 'c11_cs_079'; // Data structures capstone - expression evaluator using stacks
const NODE_C11_CS_080 = 'c11_cs_080'; // Database capstone - student database with SQL and Java

const ALL_NODE_IDS = [
  NODE_C11_CS_071,
  NODE_C11_CS_072,
  NODE_C11_CS_073,
  NODE_C11_CS_074,
  NODE_C11_CS_075,
  NODE_C11_CS_076,
  NODE_C11_CS_077,
  NODE_C11_CS_078,
  NODE_C11_CS_079,
  NODE_C11_CS_080,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: Bengaluru Metro & School Engine Architect',
  intro: 'You are the Lead Systems Architect at Bengaluru Tech Park developing high-throughput passenger routing, inventory dispatchers, and school administrative engines in Java.',
  context: 'From bidirectional ListIterator cursors navigating commuter queues to BST ticket lookups and stack-driven arithmetic evaluators, your algorithms must achieve zero runtime exceptions and optimal Big O performance.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In Java, what happens if you invoke list.remove(obj) directly inside an active enhanced for-each loop on an ArrayList?',
  options: [
    'The element is removed smoothly in O(1) time without issues.',
    'It throws a ConcurrentModificationException because the underlying Iterator cursor is desynchronized.',
    'Java automatically switches to a safe circular buffer.',
    'It results in an infinite loop without throwing any runtime error.',
  ],
  correctIndex: 1,
  hintAfter: 'Whenever a collection changes structure outside the iterator\'s own remove() method, Java fails fast with a ConcurrentModificationException! Let us explore why.',
};

// ─── OBSERVATION QUESTIONS (BRILLIANT.ORG 'WHAT DO YOU NOTICE?' PATTERN) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_cursor_geometry',
    prompt: 'What do you notice about the ListIterator cursor position relative to elements as you advance using next() and previous()?',
    observableOptions: [
      'The cursor sits in between elements rather than pointing directly at one single element slot.',
      'The cursor duplicates each element into heap memory twice.',
      'The elements are deleted immediately upon moving the cursor.',
      'The cursor automatically jumps to index 0 after every single step.',
    ],
    correctIndex: 0,
    explanation: 'A Java ListIterator cursor is conceptually positioned between elements (before the first, between adjacent elements, or after the last). next() returns the element immediately after the cursor, while previous() returns the element before it.',
  },
  {
    id: 'obs_circular_wrap',
    prompt: 'What do you notice happens to the circular queue rear pointer when enqueuing at the last physical slot (index 4 of capacity 5)?',
    observableOptions: [
      'The rear index wraps around to index 0 via modulo arithmetic ((4 + 1) % 5 = 0).',
      'The queue memory buffer crashes with an OutOfMemoryError.',
      'The front pointer is forced to jump to index -1.',
      'All previously stored items are immediately erased from the array.',
    ],
    correctIndex: 0,
    explanation: 'Circular queues wrap around using modulo arithmetic ((rear + 1) % capacity), reusing freed spaces at the start of the buffer without shifting elements.',
  },
  {
    id: 'obs_bst_inorder',
    prompt: 'What do you notice about the sequence of output numbers when you select the Inorder traversal on the Binary Search Tree?',
    observableOptions: [
      'The keys are output in strictly ascending numerical order (20, 30, 40, 50, 60, 70, 80).',
      'The keys appear in completely randomized reverse order.',
      'Only the root node and right leaves are printed.',
      'The output values are sorted in strictly descending order.',
    ],
    correctIndex: 0,
    explanation: 'Because a BST enforces Left < Root < Right, an Inorder traversal (Left subtree -> Root -> Right subtree) naturally produces strictly sorted ascending output.',
  },
];

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

// ─── 22 COMPREHENSIVE CHALLENGES COVERING ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_cs_01',
    nodeId: NODE_C11_CS_071,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which method in the Java Iterator interface must be invoked BEFORE calling remove() to avoid an IllegalStateException?',
    options: ['hasNext()', 'next()', 'peek()', 'previous()'],
    correctIndex: 1,
    explanation: 'The remove() method removes the last element returned by next(). If next() has not been called, there is no current item to remove, triggering an IllegalStateException.',
    hints: [
      'Think about the two-step protocol: select first, then mutate.',
      'hasNext() only checks availability without advancing the cursor.',
      'next() produces the element that remove() will delete.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_cs_02',
    nodeId: NODE_C11_CS_071,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why can a ListIterator traverse backward using previous() and hasPrevious(), while a standard Iterator cannot?',
    options: [
      'ListIterator uses dynamic heap hashing across all Collection types.',
      'ListIterator is restricted to List implementations that possess indexed or bidirectional node pointers.',
      'Standard Iterator was deprecated in Java 8 in favor of Spliterator.',
      'ListIterator uses multi-threading to reverse array indices.',
    ],
    correctIndex: 1,
    explanation: 'ListIterator requires positional or bidirectional structure found in Lists (ArrayList/LinkedList). Unordered collections like HashSet do not support bidirectional navigation.',
    hints: [
      'Sets and general collections do not have a defined forward/backward sequence.',
      'Only List classes support listIterator().',
      'The bidirectional cursor relies on index positioning or doubly-linked pointers.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_cs_03',
    nodeId: NODE_C11_CS_072,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When implementing a Stack using a LinkedList, which node end should be treated as the top to guarantee O(1) push and pop?',
    options: [
      'The tail (addLast and removeLast), requiring full traversal in singly linked lists.',
      'The head (addFirst and removeFirst), modifying only the root pointer without traversal.',
      'The middle node (using binary index division).',
      'Any random node selected by a hash function.',
    ],
    correctIndex: 1,
    explanation: 'In a linked list, inserting and removing at the head (addFirst / removeFirst) is always O(1) because the head reference is immediately accessible without traversing the list.',
    hints: [
      'Consider the cost of traversing a singly linked list to find the second-to-last node.',
      'Head operations require only adjusting the head pointer.',
      'addFirst and removeFirst take constant O(1) time.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_cs_04',
    nodeId: NODE_C11_CS_073,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In a circular queue of capacity 8 with rear at index 7, what is the new rear index after an enqueue operation?',
    options: ['8', '0', '-1', '7'],
    correctIndex: 1,
    explanation: 'Circular queue wrap-around uses modulo arithmetic: (rear + 1) % capacity = (7 + 1) % 8 = 0.',
    hints: [
      'Apply the modulo formula: (rear + 1) % capacity.',
      '7 + 1 = 8, and 8 % 8 = 0.',
      'The pointer wraps around to the start of the array.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_cs_05',
    nodeId: NODE_C11_CS_074,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which algorithmic paradigm divides an input into subproblems of the same type, solves them recursively, and combines the results?',
    options: ['Brute Force Exhaustive Scan', 'Greedy Local Choice', 'Divide and Conquer', 'Dynamic Programming Lookup'],
    correctIndex: 2,
    explanation: 'Divide and conquer recursively breaks a problem into smaller subproblems, solves each subproblem, and combines their solutions (e.g., Merge Sort, Binary Search).',
    hints: [
      'Merge sort and Binary search are primary examples.',
      'It breaks the problem into halves, solves recursively, then merges.',
      'The name directly states: Divide, Conquer, Merge.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_cs_06',
    nodeId: NODE_C11_CS_075,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the three core recursive steps of the Merge Sort algorithm in proper sequential execution order:',
    sortItems: [
      'Divide the array at midpoint mid = (low + high) / 2',
      'Conquer by recursively sorting left and right subarrays',
      'Merge the two sorted subarrays using a temporary array and two pointers',
      'Base case check: if low >= high return',
    ],
    correctOrder: [3, 0, 1, 2],
    explanation: 'Merge sort first validates the base case (single element), computes midpoint, recursively sorts both halves, and then merges them.',
    hints: [
      'Check if the subarray has 1 or fewer elements before dividing.',
      'Midpoint calculation splits the indices.',
      'The merge step combines the sorted pieces at the end.',
    ],
  },
  {
    id: 'ch_cs_07',
    nodeId: NODE_C11_CS_076,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which depth-first traversal of a Binary Search Tree (BST) visits nodes in strictly ascending numerical order?',
    options: ['Preorder (Root, Left, Right)', 'Inorder (Left, Root, Right)', 'Postorder (Left, Right, Root)', 'Level-order (Breadth First)'],
    correctIndex: 1,
    explanation: 'Because a BST enforces Left < Root < Right, an Inorder traversal (Left, Root, Right) naturally prints values in ascending sorted order.',
    hints: [
      'In a BST, all smaller elements are in the left subtree.',
      'Left subtree is processed before the root, and right subtree after.',
      'Inorder = Left → Root → Right.',
    ],
  },
  {
    id: 'ch_cs_08',
    nodeId: NODE_C11_CS_077,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Match the School Management System entity components to their appropriate OOP/Collections structure:',
    dragItems: [
      { label: 'Person (name, email)', targetId: 'target_super' },
      { label: 'Student extends Person', targetId: 'target_sub' },
      { label: 'HashMap<Integer, Student>', targetId: 'target_map' },
      { label: 'ArrayList<Student>', targetId: 'target_list' },
    ],
    correctMapping: {
      target_super: 'Person (name, email)',
      target_sub: 'Student extends Person',
      target_map: 'HashMap<Integer, Student>',
      target_list: 'ArrayList<Student>',
    },
    explanation: 'Person acts as the superclass, Student is a subclass inheriting common attributes, ArrayList holds dynamic rosters, and HashMap maps unique roll numbers for O(1) lookups.',
    hints: [
      'Superclass encapsulates common Person identity.',
      'HashMap uses the roll number as key for instant lookup.',
      'ArrayList provides resizable roster storage.',
    ],
  },
  {
    id: 'ch_cs_09',
    nodeId: NODE_C11_CS_071,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Consider an ArrayList of Indian state capitals: ["Bengaluru", "Mumbai", "Chennai", "Kolkata"]. A ListIterator is created at the start. After it.next() is called twice, what do it.nextIndex() and it.previousIndex() return?',
    options: [
      'nextIndex = 2, previousIndex = 1',
      'nextIndex = 1, previousIndex = 0',
      'nextIndex = 3, previousIndex = 2',
      'nextIndex = 2, previousIndex = 2',
    ],
    correctIndex: 0,
    explanation: 'The cursor sits between index 1 ("Mumbai") and index 2 ("Chennai"). Thus, nextIndex() is 2 and previousIndex() is 1.',
    hints: [
      'Calling next() twice traverses index 0 ("Bengaluru") and index 1 ("Mumbai").',
      'The cursor now sits between element 1 and element 2.',
      'nextIndex() points to the upcoming element (index 2), while previousIndex() is index 1.',
    ],
  },
  {
    id: 'ch_cs_10',
    nodeId: NODE_C11_CS_072,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Java Stack pushes: 12, then 45, then 78, then 90. Then pop() is called once, followed by search(45). What integer value does search(45) return?',
    correctAnswer: 2,
    tolerance: 0,
    unit: '1-based offset from top',
    explanation: 'After popping 90, stack from top to bottom is [78, 45, 12]. The search method returns 1-based distance from top: 78 is at position 1, 45 is at position 2.',
    hints: [
      'java.util.Stack search() returns 1-based position from the top.',
      'Initial stack: [12, 45, 78, 90]. After pop(): [12, 45, 78].',
      'Top is 78 (pos 1), next is 45 (pos 2).',
    ],
  },
  {
    id: 'ch_cs_11',
    nodeId: NODE_C11_CS_073,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the key behavioral difference between queue.remove() and queue.poll() when called on an empty LinkedList queue in Java?',
    options: [
      'remove() throws NoSuchElementException; poll() returns null without throwing an exception.',
      'poll() throws NullPointerException; remove() returns null.',
      'remove() blocks the thread indefinitely; poll() resets front to 0.',
      'Both methods throw IndexOutOfBoundsException.',
    ],
    correctIndex: 0,
    explanation: 'In the Java Queue interface, remove() throws NoSuchElementException on an empty queue, while poll() is the safe alternative returning null.',
    hints: [
      'Queue provides throwing vs value-returning pairs.',
      'add/remove/element throw exceptions.',
      'offer/poll/peek return false or null.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_cs_12',
    nodeId: NODE_C11_CS_074,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why does the standard Greedy Coin-Change algorithm fail to find the minimum number of coins for amount = 6 when available coin denominations are {4, 3, 1}?',
    options: [
      'It produces {4, 1, 1} (3 coins), whereas the optimal solution is {3, 3} (2 coins).',
      'It triggers an arithmetic division by zero.',
      'The greedy method cannot handle odd numbers.',
      'It requires an O(2^n) recursion tree which overflows stack memory.',
    ],
    correctIndex: 0,
    explanation: 'Greedy greedily picks 4 first, leaving 2, which requires 1+1 (3 coins total). But two 3-rupee coins give 6 in only 2 coins. Greedy lacks global foresight when denominations lack the canonical greedy property.',
    hints: [
      'Trace greedy: 6 - 4 = 2 -> 2 - 1 = 1 -> 1 - 1 = 0 (Coins: 4, 1, 1 -> 3 coins).',
      'Is there a combination with fewer coins? Check 3 + 3.',
      '3 + 3 = 6 requires only 2 coins.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_cs_13',
    nodeId: NODE_C11_CS_075,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does Merge Sort maintain an O(n log n) time complexity even when the input array is already sorted or reverse sorted?',
    options: [
      'The recursive tree height is always ceil(log2 n) and merging across each level takes strictly linear O(n) work regardless of value arrangement.',
      'It uses randomized pivot selection like QuickSort.',
      'It converts the array into a binary min-heap before splitting.',
      'Java automatically delegates sorted arrays to dual-pivot timsort without comparisons.',
    ],
    correctIndex: 0,
    explanation: 'Merge sort splits strictly by index (low+high)/2 without inspecting data values. The tree depth is always log2(n) and every level merges n items, yielding O(n log n) unconditionally.',
    hints: [
      'Splitting is purely index-based: (low + high)/2.',
      'The recursion tree structure is identical for any input of size n.',
      'At each level of the tree, merging all subarrays takes O(n) time.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_cs_14',
    nodeId: NODE_C11_CS_078,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the polymorphic Java method signature and dispatch loop for calculating festive discounts across an array of Electronics and Clothing:',
    availableParts: ['for(Product p : inventory)', 'p.calculateDiscount();', 'super.calculateDiscount();', 'if(p instanceof Product)', 'Product[] inventory'],
    targetState: 'Product[] inventory for(Product p : inventory) p.calculateDiscount();',
    validationHint: 'Declare the array, iterate over Product references, and invoke calculateDiscount() dynamically.',
    explanation: 'Dynamic method dispatch allows a single loop over Product[] to invoke the overridden calculateDiscount() in Electronics or Clothing at runtime.',
    hints: [
      'Start with Product[] inventory.',
      'Use the enhanced for-each loop: for(Product p : inventory).',
      'Call p.calculateDiscount() to invoke polymorphism.',
    ],
  },
  {
    id: 'ch_cs_15',
    nodeId: NODE_C11_CS_079,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Evaluate the postfix expression: "6 4 5 + * 20 4 / -". What is the final calculated integer result?',
    correctAnswer: 49,
    tolerance: 0,
    unit: 'value',
    explanation: 'Step 1: 4 5 + = 9. Step 2: 6 * 9 = 54. Step 3: 20 4 / = 5. Step 4: 54 - 5 = 49.',
    hints: [
      'Push 6, 4, 5. Encounter +: pop 5, 4 -> 4+5 = 9. Stack: [6, 9].',
      'Encounter *: pop 9, 6 -> 6*9 = 54. Stack: [54].',
      'Push 20, 4. Encounter /: pop 4, 20 -> 20/4 = 5. Stack: [54, 5].',
      'Encounter -: pop 5, 54 -> 54-5 = 49.',
    ],
  },
  {
    id: 'ch_cs_16',
    nodeId: NODE_C11_CS_080,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In Java JDBC, which method should be called on a PreparedStatement when executing an "UPDATE Student SET classID = ? WHERE studentID = ?" query?',
    options: ['executeQuery()', 'executeUpdate()', 'executeBatchSelect()', 'executeCommit()'],
    correctIndex: 1,
    explanation: 'executeUpdate() is used for INSERT, UPDATE, and DELETE DML statements and returns the number of rows affected. executeQuery() is used only for SELECT queries returning a ResultSet.',
    hints: [
      'SELECT statements use executeQuery() to return a ResultSet.',
      'Data modification statements (INSERT, UPDATE, DELETE) return an integer row count.',
      'Use executeUpdate() for modifications.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_cs_17',
    nodeId: NODE_C11_CS_076,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Insert keys into an initially empty BST in order: 50, 30, 70, 20, 40, 60, 80, 10, 25. What is the tree height (number of edges on longest path from root to leaf)?',
    correctAnswer: 3,
    tolerance: 0,
    unit: 'edges',
    explanation: 'Root 50 (depth 0) -> 30 (depth 1) -> 20 (depth 2) -> 10 or 25 (depth 3). Longest path has 3 edges.',
    hints: [
      '50 is root. 30 is left child of 50. 20 is left child of 30.',
      '10 and 25 are left and right children of 20.',
      'Count edges: 50 -> 30 -> 20 -> 10 = 3 edges.',
    ],
  },
  {
    id: 'ch_cs_18',
    nodeId: NODE_C11_CS_076,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'When deleting a node with TWO children in a Binary Search Tree, what value replaces the deleted node to preserve the BST ordering invariant?',
    options: [
      'The Inorder Successor (smallest key in the right subtree) or Inorder Predecessor (largest in left subtree)',
      'The Root node key copied down',
      'The deepest right leaf node regardless of value',
      'The left child with its right subtree discarded',
    ],
    correctIndex: 0,
    explanation: 'To maintain Left < Node < Right, replacing a two-child node with its Inorder Successor (min in right subtree) guarantees that all keys in the left subtree remain smaller and all keys in right subtree remain larger.',
    hints: [
      'The replacement must be larger than all elements in the left subtree and smaller than remaining right subtree elements.',
      'In sorted order, it is the immediate next element.',
      'The minimum value in the right subtree is the inorder successor.',
    ],
  },
  {
    id: 'ch_cs_19',
    nodeId: NODE_C11_CS_079,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Trace the infix to postfix conversion for: "A + B * (C - D) / E". Order the postfix output tokens correctly:',
    sortItems: ['A', 'B', 'C', 'D', '-', '*', 'E', '/', '+'],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    explanation: 'Infix "A + B * (C - D) / E" converts to postfix: A B C D - * E / + using operator precedence (* / over +) and bracket resolution.',
    hints: [
      '(C - D) resolves to C D -.',
      'B * (C - D) becomes B C D - *.',
      'Then division with E: B C D - * E /.',
      'Finally add A: A B C D - * E / +.',
    ],
  },
  {
    id: 'ch_cs_20',
    nodeId: NODE_C11_CS_080,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the SQL query joining Student, Class, and Teacher to fetch student name, class name, and teacher subject for Class 11A:',
    availableParts: [
      'SELECT Student.name, Class.className, Teacher.subject',
      'FROM Student INNER JOIN Class ON Student.classID = Class.classID',
      'INNER JOIN Teacher ON Class.teacherID = Teacher.teacherID',
      'WHERE Class.className = "11A";',
      'GROUP BY Student.studentID',
    ],
    targetState: 'SELECT Student.name, Class.className, Teacher.subject FROM Student INNER JOIN Class ON Student.classID = Class.classID INNER JOIN Teacher ON Class.teacherID = Teacher.teacherID WHERE Class.className = "11A";',
    validationHint: 'Combine SELECT, 2 INNER JOIN clauses on primary/foreign keys, and the WHERE condition.',
    explanation: 'Joining Student to Class via classID and Class to Teacher via teacherID links all three tables while upholding referential integrity.',
    hints: [
      'Start with SELECT columns from Student, Class, Teacher.',
      'Join Student to Class on Student.classID = Class.classID.',
      'Join Class to Teacher on Class.teacherID = Teacher.teacherID.',
      'Filter with WHERE Class.className = "11A";',
    ],
  },
  {
    id: 'ch_cs_21',
    nodeId: NODE_C11_CS_075,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'For an array of size N = 64 elements, how many recursive division levels (height of recursion tree) does Merge Sort generate before reaching 1-element base cases?',
    correctAnswer: 6,
    tolerance: 0,
    unit: 'levels (log2 64)',
    explanation: 'Merge sort splits by 2 at each level: log2(64) = 6 levels of recursive division.',
    hints: [
      'Calculate log2(N).',
      '2^6 = 64.',
      'The number of levels is 6.',
    ],
  },
  {
    id: 'ch_cs_22',
    nodeId: NODE_C11_CS_074,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A programmer needs to find the maximum contiguous subarray sum in an array of N numbers. How do Brute Force, Divide & Conquer (Kadane/Merge-like), and Linear dynamic algorithms compare in time complexity?',
    options: [
      'Brute Force: O(n^3) or O(n^2), Divide & Conquer: O(n log n), Optimal Linear Scan: O(n)',
      'Brute Force: O(log n), Divide & Conquer: O(n^2), Greedy: O(n!)',
      'All algorithm design paradigms yield identical O(n^2) runtime on modern JVMs.',
      'Brute force is O(1) if arrays are stored in contiguous memory.',
    ],
    correctIndex: 0,
    explanation: 'Testing all pairs brute-force is O(n^2) to O(n^3); divide-and-conquer splits into halves yielding O(n log n); single-pass Kadane is O(n).',
    hints: [
      'Brute force checks every subarray start and end index (O(n^2) pairs).',
      'Divide and conquer splits arrays in halves and merges crossing sums in O(n log n).',
      'Linear single-pass is O(n).',
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

const DEFAULT_PROPS: Props = {
  nodeId: 'c11_cs_071',
  title: 'Java Iterators, Collections, Stacks, Queues & Algorithms',
  definition: 'Comprehensive Java Collections Framework traversal via Iterator and ListIterator, LIFO Stack, FIFO and Circular Queue mechanics, algorithmic strategies (Brute Force, Divide & Conquer, Greedy), O(n log n) Merge Sort, and Binary Search Trees.',
  eli5: 'Think of an Iterator as a helper walking through a line of passengers. ListIterator can walk forward and backward and even modify tickets. Stacks act like plate piles, Circular Queues like traffic roundabouts, and Merge Sort splits messy lists down to single cards and zips them back in perfect order.',
  misconceptions: [
    {
      misconception: 'Modifying a collection with list.remove() during an enhanced for loop is safe.',
      correction: 'It throws ConcurrentModificationException. Always use iterator.remove() after next() for safe deletion.',
    },
    {
      misconception: 'Calling remove() on an Iterator can be done at any time.',
      correction: 'remove() MUST be preceded by a valid next() call; otherwise, it throws IllegalStateException.',
    },
    {
      misconception: 'Circular queue full condition is simply rear == capacity - 1.',
      correction: 'Circular queues wrap around using modulo arithmetic. Full condition is (rear + 1) % capacity == front or count == capacity.',
    },
    {
      misconception: 'Greedy algorithms always find the globally optimal solution for any set of coin denominations.',
      correction: 'Greedy works only when the system has the greedy-choice property. For arbitrary coins like {4, 3, 1}, greedy can fail to find the minimum.',
    },
    {
      misconception: 'Merge Sort degrades to O(n^2) time on reverse-sorted arrays.',
      correction: 'Merge Sort split is strictly index-based, guaranteeing O(n log n) in all best, average, and worst cases.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What does Iterator.hasNext() do?', options: ['Returns next element', 'Checks if another element exists without moving cursor', 'Removes current element', 'Resets cursor to 0'], correctIndex: 1 },
    { question: 'Which data structure follows LIFO?', options: ['Queue', 'Stack', 'Tree', 'Graph'], correctIndex: 1 },
    { question: 'In a circular queue of size 5 with rear=4, next rear is:', options: ['5', '0', '-1', '4'], correctIndex: 1 },
    { question: 'Merge sort time complexity in worst case is:', options: ['O(n^2)', 'O(n log n)', 'O(log n)', 'O(n)'], correctIndex: 1 },
    { question: 'Inorder traversal of a BST gives values in:', options: ['Descending order', 'Ascending sorted order', 'Random order', 'Reverse level order'], correctIndex: 1 },
    { question: 'Which JDBC method executes an INSERT SQL query?', options: ['executeQuery()', 'executeUpdate()', 'executeSelect()', 'executeFetch()'], correctIndex: 1 },
    { question: 'In postfix evaluation "5 3 -", what is computed?', options: ['3 - 5 = -2', '5 - 3 = 2', '5 + 3 = 8', '5 * 3 = 15'], correctIndex: 1 },
    { question: 'Which keyword in Java enables a subclass to inherit a superclass?', options: ['implements', 'extends', 'inherits', 'super'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates full mastery of Java collections, iterators, stacks, queues, divide-and-conquer algorithms, BST traversals, and capstone multi-class architectures.',
};

// ─── EXPLORATION STEPS (LEARN BY DOING) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Bidirectional ListIterator Simulator',
    instruction: 'Manipulate the cursor along Indian railway stations. Test next(), previous(), and safe remove() without throwing ConcurrentModificationException.',
    interactionType: 'cursor-nav',
    nodeId: NODE_C11_CS_071,
    observationIndex: 0,
  },
  {
    title: 'Lab 2: LIFO Stack vs FIFO Circular Queue Engine',
    instruction: 'Push/Pop plates onto the Stack and Enqueue/Dequeue commuters in the Circular Queue to observe head vs rear pointer wrap-around.',
    interactionType: 'stack-queue-sim',
    nodeId: NODE_C11_CS_072,
    observationIndex: 1,
  },
  {
    title: 'Lab 3: Merge Sort Split & Two-Pointer Merge Lab',
    instruction: 'Divide the 6-element array into halves down to base cases, then run the two-pointer merge algorithm level-by-level.',
    interactionType: 'merge-sort-sim',
    nodeId: NODE_C11_CS_075,
    observationIndex: -1,
  },
  {
    title: 'Lab 4: Binary Search Tree Traversal Visualizer',
    instruction: 'Insert keys into the BST and switch between Inorder, Preorder, and Postorder recursive traversal walks in real time.',
    interactionType: 'bst-traversal',
    nodeId: NODE_C11_CS_076,
    observationIndex: 2,
  },
  {
    title: 'Lab 5: Stack Expression Evaluator & JDBC Architect',
    instruction: 'Step through postfix evaluation token-by-token and configure the 3-table Student-Class-Teacher relational schema.',
    interactionType: 'evaluator-db-sim',
    nodeId: NODE_C11_CS_079,
    observationIndex: -1,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you have a ListIterator currently positioned at index 2 of 4, and you call it.previous() followed by it.remove(), which element will be removed?',
    options: [
      'The element at index 0',
      'The element at index 1 (the element returned by previous())',
      'The element at index 2',
      'An IllegalStateException is always thrown',
    ],
    correctIndex: 1,
    verifyInstruction: 'Use the ListIterator controls below to move to index 2, click Previous (returns index 1), and then click Safe Remove to verify!',
    nodeId: NODE_C11_CS_071,
  },
  {
    question: 'Predict: In a circular queue of capacity 6 with front at index 4 and count = 5, where will the next enqueued item be placed?',
    options: [
      'Index 3 (because (4 + 5) % 6 = 3)',
      'Index 5',
      'Index 0',
      'Overflow error occurs immediately',
    ],
    correctIndex: 0,
    verifyInstruction: 'In the Queue sandbox, set front to 4 and enqueue items to watch the modulo index calculation in real time!',
    nodeId: NODE_C11_CS_073,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Lead Architect Capstone Challenge: Bengaluru Metro Automated Dispatcher',
  description: 'Design a high-reliability metro passenger management terminal. Model smart card validations using Stack undo transactions, Circular Queue ticket gates at Majestic station, and a BST timetable query engine.',
  steps: [
    'Create an ArrayList<String> of stations: ["Kengeri", "Majestic", "MG Road", "Indiranagar", "Whitefield"].',
    'Traverse bidirectionally using ListIterator to allow commuters to reverse journeys safely.',
    'Implement a 10-slot CircularQueue for smart card tap-in gates using modulo arithmetic.',
    'Build an Inorder BST query engine for rapid train schedule lookups in O(log n) average time.',
  ],
};

function C11_ComputerScienceJavaIteratorsListiteratorSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['compsci'] || { name: 'Computer Science', emoji: '💻', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant-style Interactive Discovery & Predict-Then-Check States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);

  // Observation state tracking
  const [observationResponses, setObservationResponses] = useState<Record<number, number>>({});

  // Interactive Lab State 1: Java ListIterator Simulator
  const [listData, setListData] = useState<string[]>(['New Delhi', 'Kolkata', 'Mumbai', 'Chennai', 'Bengaluru']);
  const [cursorPos, setCursorPos] = useState<number>(0);
  const [lastReturned, setLastReturned] = useState<string | null>(null);
  const [lastDirection, setLastDirection] = useState<'next' | 'prev' | null>(null);
  const [iteratorLog, setIteratorLog] = useState<string>('Iterator initialized at index 0. Cursor sits before "New Delhi".');

  // Interactive Lab State 2: Stack & Circular Queue
  const [stackItems, setStackItems] = useState<string[]>(['Card_A', 'Card_B', 'Card_C']);
  const [cQueue, setCQueue] = useState<(string | null)[]>(['Passenger_1', 'Passenger_2', null, null, null]);
  const [cqFront, setCqFront] = useState<number>(0);
  const [cqRear, setCqRear] = useState<number>(1);
  const [cqCount, setCqCount] = useState<number>(2);
  const cqCapacity = 5;

  // Interactive Lab State 3: Merge Sort Step-by-Step
  const [mergeStep, setMergeStep] = useState<number>(0);
  const [mergeArray, setMergeArray] = useState<number[]>([38, 27, 43, 3, 9, 82]);

  // Interactive Lab State 4: BST Traversal
  const [traversalType, setTraversalType] = useState<'inorder' | 'preorder' | 'postorder'>('inorder');
  const [traversalOutput, setTraversalOutput] = useState<number[]>([20, 30, 40, 50, 60, 70, 80]);

  // Interactive Lab State 5: Expression Evaluator Stack
  const [evalTokens] = useState<string[]>(['15', '2', '*', '25', '+']);
  const [evalIndex, setEvalIndex] = useState<number>(0);
  const [evalStack, setEvalStack] = useState<number[]>([]);
  const [evalMessage, setEvalMessage] = useState<string>('Click "Step Evaluation" to execute postfix BODMAS.');

  // Sliders for dynamic algorithm parameter experimentation
  const [coinChangeAmount, setCoinChangeAmount] = useState<number>(68);
  const [productDiscountPercent, setProductDiscountPercent] = useState<number>(15);

  // Adaptive BKT & Mastery States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState<number>(0);
  const bktStateRef = useRef(createBKTState());

  // Per-challenge Feedback & Escalating Hints
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  // Drag-and-drop & Construction Challenge States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback animations
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses state
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explanation: '',
    realLife: '',
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // Timers
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter challenges by adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── 1. MOUNT EFFECT: Load previous mastery ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── 2. BKT ADAPTIVE MASTERY EFFECT ───
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

  // ─── 3. CANVAS ANIMATION EFFECT: Real-time sorting & buffer pulse ───
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

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / 8;
      for (let i = 0; i < 8; i++) {
        const height = 15 + Math.sin(frame * 0.05 + i) * 10;
        ctx.fillStyle = i === cursorPos ? '#22c55e' : '#4f46e5';
        ctx.fillRect(i * barWidth + 4, canvas.height - height - 4, barWidth - 8, height);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px monospace';
        ctx.fillText(`[${i}]`, i * barWidth + 8, canvas.height - 2);
      }

      const cursorX = (cursorPos / 5) * (canvas.width - 20) + 10;
      ctx.beginPath();
      ctx.arc(cursorX, 12, 5 + Math.sin(frame * 0.1) * 2, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [cursorPos]);

  // ─── 4. GREEDY COIN CALCULATION MEMO ───
  const greedyCoins = useMemo(() => {
    let amt = coinChangeAmount;
    const denoms = [50, 20, 10, 5, 2, 1];
    const result: Record<number, number> = {};
    for (const d of denoms) {
      if (amt >= d) {
        const count = Math.floor(amt / d);
        result[d] = count;
        amt %= d;
      }
    }
    return result;
  }, [coinChangeAmount]);

  // ─── 5. CLEANUP TIMER EFFECT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── MOTIVATIONAL FEEDBACK HELPER ───
  const getMotivationalFeedback = (errCount: number) => {
    if (errCount === 0) {
      return {
        badge: 'PERFECT SCORE! 🏆',
        message: 'Flawless execution! You demonstrated mastery of Java collections, stack/queue memory, and Big-O recursion without a single error.',
        color: 'text-emerald-400',
        bg: 'bg-emerald-950/60 border-emerald-500/80',
        reviewInterval: 'review in 7 days',
      };
    }
    if (errCount <= 3) {
      return {
        badge: 'Great work! 🌟',
        message: 'Excellent conceptual grasp across ListIterator cursors, BST traversals, and divide-and-conquer logic.',
        color: 'text-gold-400',
        bg: 'bg-gold-950/60 border-gold-500/80',
        reviewInterval: 'review in 3 days',
      };
    }
    return {
      badge: 'Keep Practicing — You WILL Master This! 💪',
      message: 'Complex data structures and recursive algorithms take iteration. Study the step-by-step solutions and test again!',
      color: 'text-amber-400',
      bg: 'bg-amber-950/60 border-amber-500/80',
      reviewInterval: 'review in 1 day',
    };
  };

  // ─── HANDLERS ───
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
      speechManager.speak('Let us study the complete step-by-step solution.');
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
    speechManager.speak(isCorrect ? 'Excellent! Fast-fail iterator detection is essential.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive collections and algorithms laboratory.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter free exploration mode. Manipulate the algorithms without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commencing ISC Class 11 competency challenges. Good luck!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive simulator to verify.');
  }, []);

  const handleObservationSelect = useCallback((obsIdx: number, selectedOptIdx: number) => {
    setObservationResponses(prev => ({ ...prev, [obsIdx]: selectedOptIdx }));
    const obs = OBSERVATION_QUESTIONS[obsIdx];
    if (selectedOptIdx === obs.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Great observation! That is precisely how the data structure functions.');
    } else {
      audioManager.play('pop');
    }
  }, []);

  const handleIteratorNext = useCallback(() => {
    if (cursorPos < listData.length) {
      const elem = listData[cursorPos];
      setLastReturned(elem);
      setLastDirection('next');
      setCursorPos(prev => prev + 1);
      setIteratorLog(`next() called: returned "${elem}". Cursor moved forward to index ${cursorPos + 1}.`);
      audioManager.play('count');
    } else {
      setIteratorLog('NoSuchElementException: hasNext() is false. Cursor is at end.');
      audioManager.play('error');
    }
  }, [cursorPos, listData]);

  const handleIteratorPrevious = useCallback(() => {
    if (cursorPos > 0) {
      const elem = listData[cursorPos - 1];
      setLastReturned(elem);
      setLastDirection('prev');
      setCursorPos(prev => prev - 1);
      setIteratorLog(`previous() called: returned "${elem}". Cursor moved back to index ${cursorPos - 1}.`);
      audioManager.play('count');
    } else {
      setIteratorLog('NoSuchElementException: hasPrevious() is false. Cursor is at start.');
      audioManager.play('error');
    }
  }, [cursorPos, listData]);

  const handleIteratorRemove = useCallback(() => {
    if (!lastReturned) {
      setIteratorLog('IllegalStateException: remove() cannot be called before next() or previous().');
      audioManager.play('error');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
      return;
    }
    const idxToRemove = lastDirection === 'next' ? cursorPos - 1 : cursorPos;
    const removedItem = listData[idxToRemove];
    const updated = listData.filter((_, i) => i !== idxToRemove);
    setListData(updated);
    if (lastDirection === 'next') setCursorPos(prev => prev - 1);
    setLastReturned(null);
    setLastDirection(null);
    setIteratorLog(`Safe remove() executed! Removed "${removedItem}". Collection size is now ${updated.length}.`);
    audioManager.play('pop');
    speechManager.speak(`Safe remove deleted ${removedItem}.`);
  }, [lastReturned, lastDirection, cursorPos, listData]);

  const handleStackPush = useCallback(() => {
    if (stackItems.length >= 6) {
      audioManager.play('error');
      return;
    }
    const newItem = `Card_${String.fromCharCode(65 + stackItems.length)}`;
    setStackItems(prev => [...prev, newItem]);
    audioManager.play('pickup');
  }, [stackItems]);

  const handleStackPop = useCallback(() => {
    if (stackItems.length === 0) {
      audioManager.play('error');
      return;
    }
    setStackItems(prev => prev.slice(0, prev.length - 1));
    audioManager.play('pop');
  }, [stackItems]);

  const handleCQueueEnqueue = useCallback(() => {
    if (cqCount >= cqCapacity) {
      audioManager.play('error');
      return;
    }
    const nextRear = (cqRear + 1) % cqCapacity;
    const newItem = `Pass_${Math.floor(Math.random() * 90 + 10)}`;
    setCQueue(prev => {
      const arr = [...prev];
      arr[nextRear] = newItem;
      return arr;
    });
    setCqRear(nextRear);
    setCqCount(prev => prev + 1);
    audioManager.play('drop-correct');
  }, [cqCount, cqRear, cqCapacity]);

  const handleCQueueDequeue = useCallback(() => {
    if (cqCount <= 0) {
      audioManager.play('error');
      return;
    }
    setCQueue(prev => {
      const arr = [...prev];
      arr[cqFront] = null;
      return arr;
    });
    setCqFront(prev => (prev + 1) % cqCapacity);
    setCqCount(prev => prev - 1);
    audioManager.play('pop');
  }, [cqCount, cqFront, cqCapacity]);

  const handleMergeStepNext = useCallback(() => {
    if (mergeStep >= 4) {
      setMergeArray([3, 9, 27, 38, 43, 82]);
      setMergeStep(5);
      audioManager.play('celebration');
      return;
    }
    setMergeStep(prev => prev + 1);
    audioManager.play('count');
  }, [mergeStep]);

  const handleEvalStep = useCallback(() => {
    if (evalIndex >= evalTokens.length) {
      setEvalMessage(`Evaluation complete! Final answer on stack top is: ${evalStack[0]}`);
      audioManager.play('celebration');
      return;
    }
    const token = evalTokens[evalIndex];
    if (!isNaN(Number(token))) {
      setEvalStack(prev => [...prev, Number(token)]);
      setEvalMessage(`Scanned operand "${token}". Pushed onto operand stack.`);
      audioManager.play('pickup');
    } else {
      if (evalStack.length < 2) {
        setEvalMessage('Error: Insufficient operands on stack.');
        return;
      }
      const right = evalStack[evalStack.length - 1];
      const left = evalStack[evalStack.length - 2];
      let res = 0;
      if (token === '+') res = left + right;
      if (token === '-') res = left - right;
      if (token === '*') res = left * right;
      if (token === '/') res = Math.floor(left / right);

      setEvalStack(prev => [...prev.slice(0, prev.length - 2), res]);
      setEvalMessage(`Operator "${token}": Popped right=${right}, left=${left}. Computed ${left} ${token} ${right} = ${res}. Pushed ${res}.`);
      audioManager.play('drop-correct');
    }
    setEvalIndex(prev => prev + 1);
  }, [evalIndex, evalTokens, evalStack]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You achieved a mastery score of ${finalScore} percent.`);
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setShowHint(false);
    setAnswerRevealed(false);
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

  const handleAnswer = useCallback((userResponse: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = userResponse === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(userResponse) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(userResponse) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const val = typeof userResponse === 'string' ? parseFloat(userResponse) : (userResponse as number);
      isCorrect = Math.abs(val - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (userResponse as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding work.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(bktStateRef.current));
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
        speechManager.speak('Hints exhausted. Let us review the detailed solution.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

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
      let arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const motivational = getMotivationalFeedback(errors);
  const currentObsIndex = EXPLORATION_STEPS[currentSlide]?.observationIndex ?? -1;
  const currentObservation = currentObsIndex >= 0 ? OBSERVATION_QUESTIONS[currentObsIndex] : null;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gold-600/20 border border-gold-500/40 flex items-center justify-center text-2xl">
            {subjectConfig.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-gold-400 bg-gold-950 px-2 py-0.5 rounded border border-gold-800">
                ISC Class 11 Computer Science
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${
                  difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                  difficulty === 'advanced' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                  'bg-amber-950 text-amber-400 border border-amber-800'
                }`}
              >
                {difficulty} Tier
              </motion.span>
            </div>
            <h1 className="text-lg md:text-xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Phase Indicator Pills */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs" role="navigation" aria-label="Simulation Phases">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p, idx) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to Phase ${idx + 1}: ${p}`}
              onClick={() => {
                if (p === 'complete' && phase !== 'complete') return;
                setPhase(p);
              }}
              className={`px-3 py-1 rounded-lg capitalize font-medium transition-all ${
                phase === p ? 'bg-gold-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {idx + 1}. {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-950 rounded-2xl border border-gold-800/60 shadow-xl">
              <div className="flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-wider mb-2">
                <span>🏙️</span> {SCENARIO.title}
              </div>
              <p className="text-base md:text-lg text-slate-200 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-sm text-gold-300/80 mt-2">{SCENARIO.context}</p>
            </div>

            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">?</span>
                <h2 className="text-base md:text-lg font-bold text-white">Curiosity Check: Fast-Fail Traversals</h2>
              </div>
              <p className="text-slate-300 font-medium">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`text-left p-4 rounded-xl border transition-all text-sm font-medium ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-900 border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-mono text-gold-400 mr-2">[{String.fromCharCode(65 + i)}]</span>
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                    {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && <span className="text-rose-400 font-bold mr-1">✗ </span>}
                    {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4"
                >
                  <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '✓ Spot on! Direct removal desynchronizes the hidden cursor.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Enter Interactive Lab 1"
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold shadow-lg shadow-gold-600/30 flex items-center gap-2"
                  >
                    Enter Interactive Lab 1 →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <div>
                <span className="text-xs text-gold-400 uppercase font-bold tracking-wider">
                  Interactive Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h3 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
              </div>
              <p className="text-xs text-amber-400 max-w-md hidden md:block">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </p>
            </div>

            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-6 min-h-[380px]">
              {/* STEP 0: ListIterator Bidirectional Cursor Visualizer & SVG Diagram 1 */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {!predictionMade ? (
                    <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800/60 space-y-3">
                      <p className="text-sm font-bold text-gold-300">🎯 Prediction Challenge:</p>
                      <p className="text-sm text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            aria-label={`Prediction Option ${i + 1}`}
                            onClick={() => handlePrediction(i)}
                            className="text-left p-2.5 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                      <span className="text-amber-400 font-medium">👉 {PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                      <span className="text-slate-400">✓ Prediction registered</span>
                    </div>
                  )}

                  {/* SVG DIAGRAM 1: ListIterator Bidirectional Cursor Geometry */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[11px] font-bold text-gold-400 uppercase tracking-wider block mb-2">
                      Topic SVG Diagram 1: Java ListIterator Pointer Cursor Model
                    </span>
                    <svg viewBox="0 0 600 120" className="w-full h-24" aria-label="ListIterator Pointer Model Architecture SVG">
                      <defs>
                        <marker id="arrowRight" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                          <polygon points="0 0, 6 3, 0 6" fill="#6366f1" />
                        </marker>
                        <marker id="arrowLeft" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
                          <polygon points="6 0, 0 3, 6 6" fill="#ec4899" />
                        </marker>
                      </defs>
                      {[0, 1, 2, 3, 4].map(idx => (
                        <g key={idx} transform={`translate(${idx * 110 + 30}, 20)`}>
                          <rect x="0" y="0" width="80" height="40" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
                          <text x="40" y="24" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">Index {idx}</text>
                          {idx < 4 && (
                            <>
                              <line x1="82" y1="15" x2="108" y2="15" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowRight)" />
                              <line x1="108" y1="25" x2="82" y2="25" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowLeft)" />
                            </>
                          )}
                        </g>
                      ))}
                      <circle cx={cursorPos * 110 + 20} cy="85" r="7" fill="#f59e0b" />
                      <line x1={cursorPos * 110 + 20} y1="75" x2={cursorPos * 110 + 20} y2="62" stroke="#f59e0b" strokeWidth="2" strokeDasharray="2,2" />
                      <text x={cursorPos * 110 + 20} y="105" textAnchor="middle" fill="#fcd34d" fontSize="10" fontWeight="bold">
                        Cursor @ {cursorPos}
                      </text>
                    </svg>
                  </div>

                  {/* Visual List Array */}
                  <div className="relative py-4 bg-slate-950 rounded-xl border border-slate-800 px-4 overflow-x-auto">
                    <div className="flex items-center justify-center gap-3 min-w-[500px]">
                      {listData.map((item, idx) => (
                        <React.Fragment key={item}>
                          <div className="relative flex flex-col items-center">
                            <div className={`w-1.5 h-16 rounded-full transition-all duration-300 ${
                              cursorPos === idx ? 'bg-amber-400 shadow-lg shadow-amber-500/50 scale-y-110' : 'bg-slate-800'
                            }`} />
                            {cursorPos === idx && (
                              <span className="absolute -top-5 text-[10px] font-mono bg-amber-500 text-slate-950 font-black px-1.5 rounded">
                                CURSOR
                              </span>
                            )}
                          </div>

                          <motion.div
                            layout
                            className={`px-4 py-3 rounded-xl border flex flex-col items-center min-w-[90px] transition-all ${
                              lastReturned === item ? 'bg-gold-900/60 border-gold-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-300'
                            }`}
                          >
                            <span className="text-[10px] text-slate-500 font-mono">[{idx}]</span>
                            <span className="font-bold text-xs mt-1">{item}</span>
                          </motion.div>
                        </React.Fragment>
                      ))}

                      <div className="relative flex flex-col items-center">
                        <div className={`w-1.5 h-16 rounded-full transition-all duration-300 ${
                          cursorPos === listData.length ? 'bg-amber-400 shadow-lg shadow-amber-500/50 scale-y-110' : 'bg-slate-800'
                        }`} />
                        {cursorPos === listData.length && (
                          <span className="absolute -top-5 text-[10px] font-mono bg-amber-500 text-slate-950 font-black px-1.5 rounded">
                            CURSOR
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ListIterator Controls */}
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Call previous method on ListIterator"
                      onClick={handleIteratorPrevious}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5"
                    >
                      ⏮️ it.previous()
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Call next method on ListIterator"
                      onClick={handleIteratorNext}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5"
                    >
                      it.next() ⏭️
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Call safe remove method on ListIterator"
                      onClick={handleIteratorRemove}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-600/30 flex items-center gap-1.5"
                    >
                      🗑️ it.remove()
                    </motion.button>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 flex items-center justify-between">
                    <span>STATUS: {iteratorLog}</span>
                    <span className="text-slate-500">
                      nextIndex(): {cursorPos < listData.length ? cursorPos : listData.length} | prevIndex(): {cursorPos - 1}
                    </span>
                  </div>
                </div>
              )}

              {/* STEP 1: Stack LIFO vs Circular Queue FIFO & SVG Diagram 2 */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* SVG DIAGRAM 2: Circular Buffer Modulo Wrap Around */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-2">
                      Topic SVG Diagram 2: Circular Queue Wrap-Around Ring (rear = (rear + 1) % N)
                    </span>
                    <svg viewBox="0 0 500 120" className="w-full h-24" aria-label="Circular Queue Ring Geometry SVG">
                      <circle cx="250" cy="60" r="45" fill="none" stroke="#334155" strokeWidth="12" />
                      {[0, 1, 2, 3, 4].map(i => {
                        const angle = (i * 72 - 90) * (Math.PI / 180);
                        const cx = 250 + 45 * Math.cos(angle);
                        const cy = 60 + 45 * Math.sin(angle);
                        const isFront = i === cqFront;
                        const isRear = i === cqRear;
                        return (
                          <g key={i}>
                            <circle cx={cx} cy={cy} r="12" fill={isFront ? '#059669' : isRear ? '#d97706' : '#1e293b'} stroke="#64748b" strokeWidth="1.5" />
                            <text x={cx} y={cy + 3} textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">[{i}]</text>
                          </g>
                        );
                      })}
                      <text x="120" y="65" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Front = {cqFront}</text>
                      <text x="380" y="65" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Rear = {cqRear}</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Stack Container */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-gold-400">🥞 LIFO Stack (addFirst / removeFirst)</h4>
                        <span className="text-xs text-slate-400">Size: {stackItems.length}/6</span>
                      </div>
                      <div className="h-40 border-2 border-dashed border-slate-800 rounded-xl p-2 flex flex-col-reverse gap-1.5 overflow-hidden justify-start">
                        {stackItems.map((st, i) => (
                          <motion.div
                            key={st}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-2 rounded-lg text-xs font-mono font-bold flex items-center justify-between ${
                              i === stackItems.length - 1 ? 'bg-gold-600 text-white border border-gold-400' : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            <span>{st}</span>
                            {i === stackItems.length - 1 && <span className="text-[10px] bg-gold-950 px-1 rounded">TOP</span>}
                          </motion.div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Push card onto stack"
                          onClick={handleStackPush}
                          className="flex-1 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-lg"
                        >
                          Push Card (addFirst)
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Pop card from stack"
                          onClick={handleStackPop}
                          className="flex-1 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg"
                        >
                          Pop (removeFirst)
                        </motion.button>
                      </div>
                    </div>

                    {/* Circular Queue Container */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-amber-400">🔄 Circular Queue (Modulo Wrap)</h4>
                        <span className="text-xs text-slate-400">Front: {cqFront} | Rear: {cqRear}</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5 h-40 items-center">
                        {cQueue.map((item, idx) => (
                          <div
                            key={idx}
                            className={`h-24 rounded-xl border p-2 flex flex-col items-center justify-between text-center transition-all ${
                              item ? 'bg-amber-950/40 border-amber-500/60 text-amber-200' : 'bg-slate-900 border-slate-800 text-slate-600'
                            }`}
                          >
                            <span className="text-[10px] font-mono text-slate-500">[{idx}]</span>
                            <span className="text-xs font-bold truncate w-full">{item || 'EMPTY'}</span>
                            <div className="flex gap-1 text-[9px] font-mono">
                              {idx === cqFront && <span className="bg-emerald-600 text-white px-1 rounded">F</span>}
                              {idx === cqRear && <span className="bg-amber-600 text-white px-1 rounded">R</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Enqueue passenger to circular queue"
                          onClick={handleCQueueEnqueue}
                          className="flex-1 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg"
                        >
                          Enqueue (rear+1)%5
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Dequeue passenger from circular queue"
                          onClick={handleCQueueDequeue}
                          className="flex-1 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg"
                        >
                          Dequeue (front+1)%5
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Merge Sort Split & Two-Pointer Merge */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-gold-300">Divide & Conquer: O(n log n) Tree Unfolding</h4>
                      <p className="text-xs text-slate-400">Step {mergeStep} of 5: {
                        mergeStep === 0 ? 'Initial Array [38, 27, 43, 3, 9, 82]' :
                        mergeStep === 1 ? 'Divided at mid=2: Left=[38, 27, 43], Right=[3, 9, 82]' :
                        mergeStep === 2 ? 'Base cases reached (1-element subarrays)' :
                        mergeStep === 3 ? 'Merging halves: [27, 38, 43] and [3, 9, 82]' :
                        'Final Two-Pointer Combined: [3, 9, 27, 38, 43, 82]'
                      }</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Advance Merge Sort Step"
                      onClick={handleMergeStepNext}
                      className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl"
                    >
                      Advance Step ⏭️
                    </motion.button>
                  </div>

                  <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-4 min-h-[220px]">
                    <div className="flex gap-3">
                      {mergeArray.map((val, i) => (
                        <motion.div
                          key={`${val}-${i}`}
                          layout
                          className={`w-12 h-14 rounded-xl border flex flex-col items-center justify-center font-bold text-sm ${
                            mergeStep === 5 ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-700 text-white'
                          }`}
                        >
                          <span className="text-[9px] text-slate-500 font-mono">#{i}</span>
                          {val}
                        </motion.div>
                      ))}
                    </div>

                    <div className="text-xs text-slate-400 font-mono text-center max-w-lg">
                      Recursion Tree Height: log2(6) ≈ 3 levels. Total comparisons per level: O(n). Total cost = O(n log n) in all cases!
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Binary Search Tree Interactive Traversal & SVG Diagram 3 */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h4 className="text-sm font-bold text-gold-300">BST Tree Walk: Left &lt; Root &lt; Right</h4>
                    <div className="flex gap-2">
                      {(['inorder', 'preorder', 'postorder'] as const).map(t => (
                        <motion.button
                          key={t}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Select ${t} traversal`}
                          onClick={() => {
                            setTraversalType(t);
                            if (t === 'inorder') setTraversalOutput([20, 30, 40, 50, 60, 70, 80]);
                            if (t === 'preorder') setTraversalOutput([50, 30, 20, 40, 70, 60, 80]);
                            if (t === 'postorder') setTraversalOutput([20, 40, 30, 60, 80, 70, 50]);
                            audioManager.play('pop');
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                            traversalType === t ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {t}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* SVG DIAGRAM 3: Binary Search Tree Hierarchy */}
                  <div className="bg-slate-950 rounded-xl border border-slate-800 p-4">
                    <span className="text-[11px] font-bold text-gold-400 uppercase tracking-wider block mb-2">
                      Topic SVG Diagram 3: Binary Search Tree Structural Ordering (Left &lt; Root &lt; Right)
                    </span>
                    <svg viewBox="0 0 500 220" className="w-full h-44" aria-label="Binary Search Tree Hierarchy SVG">
                      <line x1="250" y1="30" x2="130" y2="85" stroke="#475569" strokeWidth="2" />
                      <line x1="250" y1="30" x2="370" y2="85" stroke="#475569" strokeWidth="2" />
                      <line x1="130" y1="85" x2="70" y2="155" stroke="#475569" strokeWidth="2" />
                      <line x1="130" y1="85" x2="190" y2="155" stroke="#475569" strokeWidth="2" />
                      <line x1="370" y1="85" x2="310" y2="155" stroke="#475569" strokeWidth="2" />
                      <line x1="370" y1="85" x2="430" y2="155" stroke="#475569" strokeWidth="2" />

                      {[
                        { x: 250, y: 30, val: 50, isRoot: true },
                        { x: 130, y: 85, val: 30 },
                        { x: 370, y: 85, val: 70 },
                        { x: 70, y: 155, val: 20 },
                        { x: 190, y: 155, val: 40 },
                        { x: 310, y: 155, val: 60 },
                        { x: 430, y: 155, val: 80 },
                      ].map((n, i) => (
                        <g key={i}>
                          <circle cx={n.x} cy={n.y} r="18" fill={n.isRoot ? '#4f46e5' : '#1e293b'} stroke="#6366f1" strokeWidth="2" />
                          <text x={n.x} y={n.y + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                            {n.val}
                          </text>
                        </g>
                      ))}
                    </svg>

                    <div className="mt-2 p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center gap-2">
                      <span className="text-xs text-gold-400 font-bold uppercase">{traversalType} Tape:</span>
                      <div className="flex gap-2 font-mono text-xs font-bold text-emerald-400">
                        {traversalOutput.map((v, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700">
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Expression Evaluator Stepper & Schema Map */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-gold-400">Postfix Evaluator Stack</h4>
                      <span className="text-xs text-slate-400">Tokens: "15 2 * 25 +"</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 font-mono min-h-[40px]">
                      {evalMessage}
                    </div>
                    <div className="h-28 border border-slate-800 rounded-lg p-2 flex items-center justify-center gap-2">
                      {evalStack.map((val, idx) => (
                        <div key={idx} className="px-3 py-2 bg-gold-600 text-white font-bold rounded-lg text-xs font-mono">
                          {val}
                        </div>
                      ))}
                      {evalStack.length === 0 && <span className="text-slate-600 text-xs font-mono">Stack Empty</span>}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Step Expression Evaluation"
                      onClick={handleEvalStep}
                      className="w-full py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-lg"
                    >
                      Step Evaluation ⏭️
                    </motion.button>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <h4 className="text-sm font-bold text-emerald-400">Database Capstone Schema (JDBC)</h4>
                    <div className="space-y-2 text-xs font-mono">
                      <div className="p-2 bg-slate-900 rounded border border-slate-800">
                        <span className="text-gold-400 font-bold">Student</span> (<u>studentID</u> [PK], name, classID [FK])
                      </div>
                      <div className="p-2 bg-slate-900 rounded border border-slate-800">
                        <span className="text-amber-400 font-bold">Class</span> (<u>classID</u> [PK], className, teacherID [FK])
                      </div>
                      <div className="p-2 bg-slate-900 rounded border border-slate-800">
                        <span className="text-emerald-400 font-bold">Teacher</span> (<u>teacherID</u> [PK], name, subject)
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* BRILLIANT 'WHAT DO YOU NOTICE?' INTERACTIVE OBSERVATION PROMPT */}
              {currentObservation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 bg-gradient-to-r from-gold-950/80 via-slate-900 to-slate-950 rounded-2xl border border-gold-700/50 space-y-3"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <span>🔍</span> Brilliant Observation Check: What do you notice?
                  </div>
                  <p className="text-sm text-slate-200 font-medium">{currentObservation.prompt}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                    {currentObservation.observableOptions.map((opt, oIdx) => {
                      const isSelected = observationResponses[currentObsIndex] === oIdx;
                      const isAnswered = observationResponses[currentObsIndex] !== undefined;
                      const isCorrect = oIdx === currentObservation.correctIndex;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleObservationSelect(currentObsIndex, oIdx)}
                          className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                            isAnswered && isCorrect
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                              : isAnswered && isSelected && !isCorrect
                              ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                              : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                          }`}
                        >
                          <span className="font-mono text-gold-400 mr-2">({oIdx + 1})</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {observationResponses[currentObsIndex] !== undefined && (
                    <p className="text-xs text-gold-300 font-mono pt-1">
                      💡 {currentObservation.explanation}
                    </p>
                  )}
                </motion.div>
              )}
            </div>

            {/* Slide Navigation Bar */}
            <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous Lab Step"
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-sm font-bold rounded-xl"
              >
                ← Previous Lab
              </motion.button>
              <div className="flex gap-1.5">
                {EXPLORATION_STEPS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentSlide === idx ? 'bg-gold-500 w-6' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Next Lab Step"
                  onClick={() => setCurrentSlide(s => s + 1)}
                  className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-sm font-bold rounded-xl"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Enter Sandbox Free Play"
                  onClick={handleAdvanceToSandbox}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                >
                  Enter Sandbox Free Play →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">🎛️ Algorithmic Control Sandbox</h3>
                <p className="text-xs text-slate-400">Adjust algorithm parameters freely with zero grading pressure.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Proceed to Challenges"
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2"
              >
                Ready for Challenges! 🚀
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sandbox Control 1 */}
              <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gold-400">Greedy Indian Coin Dispenser</h4>
                  <span className="text-xs font-mono text-emerald-400 font-bold">Target: ₹{coinChangeAmount}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={200}
                  value={coinChangeAmount}
                  aria-label="Target coin change amount in rupees"
                  onChange={(e) => setCoinChangeAmount(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
                <div className="flex flex-wrap gap-2 pt-2">
                  {Object.entries(greedyCoins).map(([denom, count]) => (
                    <div key={denom} className="px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      <span className="text-gold-400 font-bold">₹{denom}</span> × <span className="text-white font-bold">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sandbox Control 2 */}
              <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-amber-400">Polymorphic Discount Simulator</h4>
                  <span className="text-xs font-mono text-amber-400 font-bold">Base Rate: {productDiscountPercent}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={50}
                  value={productDiscountPercent}
                  aria-label="Product discount base rate percentage"
                  onChange={(e) => setProductDiscountPercent(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="font-bold text-gold-300">Electronics (TV ₹25,000)</p>
                    <p className="text-slate-400 mt-1">Discount: ₹{25000 * (productDiscountPercent / 100)}</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="font-bold text-amber-300">Clothing (Kurta ₹1,200)</p>
                    <p className="text-slate-400 mt-1">Festive Rate: ₹{1200 * ((productDiscountPercent + 10) / 100)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Memory Allocation Canvas</span>
              <canvas ref={canvasRef} width={600} height={40} className="w-full h-10 rounded-lg bg-slate-950" />
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 4: CHALLENGE PHASE ─── */}
        {phase === 'challenge' && (
          <motion.div
            key="challenge-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-gold-400 capitalize">
                  Competency: {challenge.competencyLevel} ({challenge.type})
                </span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-500 to-emerald-400"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>

            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={wrongShake ? { duration: 0.4 } : {}}
              className={`p-6 rounded-2xl border transition-colors ${
                wrongFlash
                  ? 'bg-rose-950/70 border-rose-500'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <h3 className="text-base md:text-lg font-bold text-white mb-4">{challenge.question}</h3>

              {/* TYPE 1: MCQ */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      className={`text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/70 hover:bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-mono text-gold-400 mr-2">[{String.fromCharCode(65 + i)}]</span>
                      {showExplanation && i === challenge.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* TYPE 2: Drag-Label */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        role="button"
                        tabIndex={0}
                        draggable
                        aria-label={`Draggable component: ${item.label}`}
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-2 bg-gold-700 hover:bg-gold-600 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {Object.keys(challenge.correctMapping || {}).map(targetId => (
                      <div
                        key={targetId}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId)}
                        className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col justify-center items-center min-h-[70px]"
                      >
                        <span className="text-[10px] text-slate-500 uppercase font-mono">{targetId.replace('_', ' ')}</span>
                        <span className="text-xs font-bold text-emerald-400 mt-1">
                          {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : 'Drop matching component here'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Verify Schema Mapping"
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-sm"
                  >
                    Verify Schema Mapping
                  </motion.button>
                </div>
              )}

              {/* TYPE 3: Drag-Sort */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  {(sortArrangement.length === challenge.sortItems.length ? sortArrangement : challenge.sortItems.map((_, i) => i)).map((itemIdx, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      draggable
                      aria-label={`Sortable step ${displayIdx + 1}: ${challenge.sortItems![itemIdx]}`}
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs font-medium text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-lg bg-gold-950 text-gold-400 flex items-center justify-center font-mono font-bold">
                        {displayIdx + 1}
                      </span>
                      {challenge.sortItems![itemIdx]}
                    </motion.div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Check Pipeline Sequence"
                    onClick={() => {
                      const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                      handleAnswer(ans);
                    }}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-sm"
                  >
                    Check Pipeline Sequence
                  </motion.button>
                </div>
              )}

              {/* TYPE 4: Numeric Input */}
              {challenge.type === 'numeric' && (
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    aria-label={`Enter numerical answer in ${challenge.unit || 'units'}`}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-gold-500"
                  />
                  <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Submit Numeric Answer"
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || numericInput === ''}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-sm"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              )}

              {/* TYPE 5: Code / Query Construction */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-amber-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Add code token: ${part}`}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        className="px-3 py-1.5 bg-gold-900/60 hover:bg-gold-800 text-gold-200 border border-gold-700 rounded-lg text-xs font-mono"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[80px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <span key={i} className="px-3 py-1 bg-gold-600 text-white font-mono text-xs rounded-lg flex items-center gap-1.5">
                        {part}
                        <button
                          aria-label={`Remove token ${part}`}
                          onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                          className="text-rose-300 font-bold ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {constructParts.length === 0 && <span className="text-slate-600 text-xs font-mono">Click code blocks above to assemble</span>}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Validate Statement Assembly"
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-sm"
                  >
                    Validate Statement Assembly
                  </motion.button>
                </div>
              )}

              {/* Progressive Disclosure Explanation Box */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-xl space-y-3"
                >
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step-by-Step ISC Solution Analysis:</span>
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((stepText, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-amber-200 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400">{i + 1}.</span> {stepText}{!stepText.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label="Reveal next analysis step"
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-lg text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Proceed to Next Challenge"
                      onClick={handleNextChallenge}
                      className="mt-2 block px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Review →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 5: COMPLETION & CAPSTONE REVIEW ─── */}
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* MOTIVATIONAL FEEDBACK BANNER */}
            <div className={`p-8 rounded-3xl border text-center space-y-4 shadow-xl ${motivational.bg}`}>
              <span className="text-4xl">🎓</span>
              <h2 className="text-2xl md:text-3xl font-black text-white">{motivational.badge}</h2>
              <p className={`text-sm md:text-base font-semibold max-w-2xl mx-auto ${motivational.color}`}>
                {motivational.message}
              </p>
              <div className="flex justify-center gap-6 text-sm font-mono pt-2">
                <span className="px-4 py-1.5 bg-slate-900 rounded-xl border border-slate-700">
                  Final Score: <strong className="text-emerald-400">{Math.max(0, 100 - errors * 5)}%</strong>
                </span>
                <span className="px-4 py-1.5 bg-slate-900 rounded-xl border border-slate-700">
                  Total Inaccuracies: <strong className="text-rose-400">{errors}</strong>
                </span>
                <span className="px-4 py-1.5 bg-slate-900 rounded-xl border border-slate-700 capitalize">
                  Mastery Tier: <strong className="text-gold-400">{masteryLevel}</strong>
                </span>
              </div>
            </div>

            {/* SPACED REPETITION VISIBILITY CARD */}
            <div className="p-6 bg-gradient-to-r from-gold-950 via-slate-900 to-gold-950 rounded-2xl border-2 border-gold-500/80 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-gold-400 text-xs uppercase font-bold tracking-wider">
                  <span>🧠</span> Spaced Repetition Schedule (SRS)
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white">
                  Optimal Memory Retention Target: <span className="text-amber-400 underline">{motivational.reviewInterval}</span>
                </h3>
                <p className="text-xs text-slate-300 max-w-xl">
                  Based on your performance ({errors} error{errors === 1 ? '' : 's'}), our SM-2 algorithm calculates that reviewing these Java iterator, stack, circular queue, and BST invariants in <strong>{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> will maximize long-term neural recall for your ISC exams.
                </p>
              </div>
              <div className="px-5 py-3 bg-slate-950/90 border border-gold-400/40 rounded-xl text-center">
                <span className="text-xs text-slate-400 uppercase font-mono block">Recommended Review</span>
                <span className="text-base font-black text-amber-400 capitalize">{motivational.reviewInterval}</span>
              </div>
            </div>

            {/* REFLECTION SECTION */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤔</span>
                <h3 className="text-base font-bold text-white">Architect Reflection & Knowledge Synthesizer</h3>
              </div>
              <p className="text-xs text-slate-400">
                Consolidate your learning by reflecting on these core computational principles.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gold-300 mb-1">
                    1. What was the most surprising thing you learned about Java iterators, stacks, or Merge Sort?
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionResponses.surprising}
                    aria-label="Reflection on surprising concepts learned"
                    onChange={(e) => setReflectionResponses(prev => ({ ...prev, surprising: e.target.value }))}
                    placeholder="e.g., How ListIterator remove() requires a preceding next() or previous() call..."
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gold-300 mb-1">
                    2. How would you explain why Circular Queues use (rear + 1) % capacity to a friend?
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionResponses.explanation}
                    aria-label="Reflection on explaining modulo circular queues to a friend"
                    onChange={(e) => setReflectionResponses(prev => ({ ...prev, explanation: e.target.value }))}
                    placeholder="e.g., When rear reaches the array end, modulo wraps it back to index 0 like a clock..."
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gold-300 mb-1">
                    3. Where in real life might you use an Inorder BST traversal or Stack evaluation?
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionResponses.realLife}
                    aria-label="Reflection on real-world applications of BSTs and Stacks"
                    onChange={(e) => setReflectionResponses(prev => ({ ...prev, realLife: e.target.value }))}
                    placeholder="e.g., Database indexing in Bengaluru Metro fare calculations or calculator parse trees..."
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Submit Reflection Notes"
                  onClick={() => {
                    setReflectionSubmitted(true);
                    audioManager.play('success');
                  }}
                  className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  {reflectionSubmitted ? '✓ Reflections Saved in Learning Log' : 'Save Reflection Log'}
                </motion.button>
              </div>
            </div>

            {/* Misconception Gaps Profile */}
            {hitMisconceptions.length > 0 && (
              <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">Your Targeted Misconception Review:</h3>
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-400">✓ Invariant Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Real World Activity Arc */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs md:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <ul className="space-y-1.5 text-xs text-slate-400 pt-1">
                {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gold-400 font-bold">{i + 1}.</span> {st}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating System Component Banners */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="ISC Computer Science Objective Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_ComputerScienceJavaIteratorsListiteratorSim;
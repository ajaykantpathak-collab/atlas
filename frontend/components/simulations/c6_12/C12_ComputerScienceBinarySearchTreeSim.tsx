'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY EXACT LITERALS) ───
const NODE_C12_CS_011 = 'c12_cs_011'; // BST operations
const NODE_C12_CS_012 = 'c12_cs_012'; // AVL self-balancing & rotations
const NODE_C12_CS_013 = 'c12_cs_013'; // Heap & priority queue
const NODE_C12_CS_014 = 'c12_cs_014'; // Graph representations
const NODE_C12_CS_015 = 'c12_cs_015'; // Graph traversals BFS & DFS
const NODE_C12_CS_016 = 'c12_cs_016'; // Hash tables & collisions
const NODE_C12_CS_017 = 'c12_cs_017'; // Dynamic programming
const NODE_C12_CS_018 = 'c12_cs_018'; // Greedy algorithms
const NODE_C12_CS_019 = 'c12_cs_019'; // Backtracking
const NODE_C12_CS_020 = 'c12_cs_020'; // Dijkstra & MSTs

const ALL_NODE_IDS = [
  NODE_C12_CS_011,
  NODE_C12_CS_012,
  NODE_C12_CS_013,
  NODE_C12_CS_014,
  NODE_C12_CS_015,
  NODE_C12_CS_016,
  NODE_C12_CS_017,
  NODE_C12_CS_018,
  NODE_C12_CS_019,
  NODE_C12_CS_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'CyberCity Logistics & Cloud Engine Architect',
  intro: 'You are appointed Lead Systems Architect for the National Rail & Cloud Logistics Grid in India. The infrastructure handles freight tracking, lightning-fast courier searches, emergency train dispatches, and optimal data packet routing across Delhi, Mumbai, Bengaluru, Kolkata, and Chennai.',
  context: 'Your mission is to construct resilient data structures (BSTs, AVL trees, Heaps, Hash Tables, and Graphs) and execute optimal algorithms (Dijkstra, Kruskal, Huffman, DP, and Backtracking) without server bottlenecks or O(n) worst-case regressions.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If you insert pre-sorted parcel tracking IDs [10, 20, 30, 40, 50] into an ordinary un-balanced Binary Search Tree, what does its shape and search complexity become?',
  options: [
    'A perfectly balanced pyramid with O(log n) search time',
    'A single skewed chain behaving like a linked list with O(n) search time',
    'A circular ring queue with O(1) direct access',
    'A min-heap where the root is always 50',
  ],
  correctIndex: 1,
  hintAfter: 'Don’t worry if you missed that! Let us explore how tree structures behave when keys arrive in order versus balanced distributions.',
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

// ─── CHALLENGES ARRAY (22 Comprehensive NEP 2020 Aligned Challenges) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - BST (Recall)
  {
    id: 'ch_bst_01',
    nodeId: NODE_C12_CS_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a valid Binary Search Tree (BST), what is the universal relationship between any parent node P, its left subtree L, and its right subtree R?',
    options: [
      'All keys in L < key(P) < all keys in R',
      'All keys in L > key(P) > all keys in R',
      'Key in left child is always equal to key in right child',
      'Only the immediate left child is smaller; deeper subtrees may contain larger keys',
    ],
    correctIndex: 0,
    explanation: 'The BST ordering invariant dictates that for EVERY node, every key in its entire left subtree must be strictly less than the node, and every key in its right subtree must be strictly greater.',
    hints: [
      'Think about how binary search halves the search space at each node.',
      'Smaller numbers always branch in one direction; larger numbers in the opposite.',
      'The rule is: Left < Parent < Right across the entire subtree.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Inorder Traversal (Understanding)
  {
    id: 'ch_bst_02',
    nodeId: NODE_C12_CS_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which tree traversal algorithm produces keys in strictly ascending sorted order when performed on any valid Binary Search Tree?',
    options: ['Preorder (Root, Left, Right)', 'Inorder (Left, Root, Right)', 'Postorder (Left, Right, Root)', 'Level-order (Breadth-First)'],
    correctIndex: 1,
    explanation: 'Inorder traversal visits Left Subtree, then Current Node, then Right Subtree. Since Left < Root < Right in a BST, this naturally outputs all elements in monotonically increasing order.',
    hints: [
      'Think about visiting the smallest elements first before printing the parent.',
      'L -> Root -> R visits everything to the left before the center.',
      'Inorder traversal (Left, Root, Right) guarantees ascending order.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation - Drag Label BST Deletion (Application)
  {
    id: 'ch_bst_03',
    nodeId: NODE_C12_CS_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Map each BST Deletion scenario to its exact structural remedy.',
    dragItems: [
      { label: 'Leaf Node', targetId: 'case_leaf' },
      { label: 'Single Child Node', targetId: 'case_single' },
      { label: 'Two Children Node', targetId: 'case_two' },
    ],
    correctMapping: {
      case_leaf: 'Leaf Node',
      case_single: 'Single Child Node',
      case_two: 'Two Children Node',
    },
    explanation: 'A leaf node is simply unlinked from parent. A node with 1 child is bypassed by linking parent directly to child. A node with 2 children is replaced by its Inorder Successor (or Inorder Predecessor).',
    hints: [
      'If there are no children, simply detach the leaf reference.',
      'If there is 1 child, promote that single child to the deleted spot.',
      'If there are 2 children, find the smallest key in the right subtree (Inorder Successor).',
    ],
    misconceptionIndex: 1,
  },
  // 4. Foundation - AVL Balance Factor (Recall)
  {
    id: 'ch_avl_01',
    nodeId: NODE_C12_CS_012,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In an AVL tree node where Left Subtree Height is 3 and Right Subtree Height is 1, what is the Balance Factor (Height_Left - Height_Right)?',
    correctAnswer: 2,
    tolerance: 0,
    unit: '',
    explanation: 'Balance Factor = Height(Left) - Height(Right) = 3 - 1 = +2. Since |BF| > 1, this node is imbalanced and triggers an AVL rotation.',
    hints: [
      'Subtract the right subtree height from the left subtree height.',
      'Calculate 3 minus 1.',
      'The balance factor is exactly 2.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Standard - AVL Rotation Type (Analysis)
  {
    id: 'ch_avl_02',
    nodeId: NODE_C12_CS_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'You insert the sequence [30, 10, 20] into an initially empty AVL tree. What specific rotation restores balance at the root?',
    options: [
      'Single Right Rotation (LL case)',
      'Single Left Rotation (RR case)',
      'Left-Right Double Rotation (LR case: Left on child, then Right on root)',
      'Right-Left Double Rotation (RL case)',
    ],
    correctIndex: 2,
    explanation: '10 is the left child of 30, and 20 is the right child of 10 (Left-Right zigzag). To balance, we rotate left on child 10 (giving chain 30-20-10), then rotate right on root 30, making 20 the new root.',
    hints: [
      '10 goes left of 30; 20 goes right of 10. This creates a bent left-right path.',
      'A single rotation cannot straighten a bent knee structure.',
      'The LR case requires a Left rotation on the child followed by a Right rotation on the parent.',
    ],
    misconceptionIndex: 2,
  },
  // 6. Foundation - Heap Index Arithmetic (Understanding)
  {
    id: 'ch_heap_01',
    nodeId: NODE_C12_CS_013,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In a 0-indexed array representation of a binary heap, what is the array index of the RIGHT child of the node stored at index i = 3?',
    correctAnswer: 8,
    tolerance: 0,
    unit: 'index',
    explanation: 'In 0-indexed binary heaps: Left Child = 2i + 1, Right Child = 2i + 2. For i = 3: Right Child = 2(3) + 2 = 8.',
    hints: [
      'Recall the formula for right child in 0-based indexing.',
      'Left is 2*i + 1; Right is 2*i + 2.',
      'Compute 2 * 3 + 2 = 8.',
    ],
    misconceptionIndex: 3,
  },
  // 7. Standard - Min-Heap Deletion Step-by-Step (Drag Sort)
  {
    id: 'ch_heap_02',
    nodeId: NODE_C12_CS_013,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the operations required to execute extract-min (delete root) in a Min Heap in correct logical order.',
    sortItems: [
      'Save the root element value to return as minimum',
      'Move the last array element to the root position and decrement size',
      'Compare root with its smallest child and swap if parent > child (bubble-down)',
      'Repeat bubble-down recursively until heap ordering is restored',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Extract-min replaces the root with the last leaf element to maintain the complete binary tree shape, then bubbles down by swapping with the smaller child until valid.',
    hints: [
      'First save the minimum key from the root.',
      'Maintain complete tree structure by copying the last leaf to index 0.',
      'Sink the replacement node down (heapify-down) by comparing with child keys.',
    ],
    misconceptionIndex: 3,
  },
  // 8. Standard - Graph Adjacency Matrix vs List Space (Evaluation)
  {
    id: 'ch_graph_01',
    nodeId: NODE_C12_CS_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'The Indian Railway network models 1,000 stations with only 2,500 active connecting track segments. Which representation is optimal for memory and neighbour queries?',
    options: [
      'Adjacency Matrix because O(1) cell access always saves memory',
      'Adjacency List because sparse graphs use O(V + E) space instead of O(V²) = 1,000,000 cells',
      'Incidence Matrix using O(V · E) space',
      'Edge Array storing duplicate undirected pairs',
    ],
    correctIndex: 1,
    explanation: 'Since E (2,500) << V² (1,000,000), this is a sparse graph. An adjacency matrix wastes over 99.7% of its cells storing zeroes. An adjacency list uses O(V + E) memory and iterates neighbours directly.',
    hints: [
      'Compare 1,000² = 1,000,000 integers against V + E = 3,500 node pointers.',
      'A matrix allocates space for every potential edge, even non-existent ones.',
      'Sparse graphs are much more efficient in Adjacency Lists with O(V + E) space.',
    ],
    misconceptionIndex: 4,
  },
  // 9. Foundation - BFS vs DFS Data Structures (Recall)
  {
    id: 'ch_trav_01',
    nodeId: NODE_C12_CS_015,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Associate each Graph Traversal algorithm with its controlling auxiliary Data Structure.',
    dragItems: [
      { label: 'Queue (FIFO)', targetId: 'ds_bfs' },
      { label: 'Stack / Call Stack (LIFO)', targetId: 'ds_dfs' },
    ],
    correctMapping: {
      ds_bfs: 'Queue (FIFO)',
      ds_dfs: 'Stack / Call Stack (LIFO)',
    },
    explanation: 'Breadth-First Search (BFS) expands level-by-level using a FIFO Queue. Depth-First Search (DFS) probes deeply along a path using a LIFO Stack or recursion.',
    hints: [
      'Wave-like level order needs First-In-First-Out.',
      'Deep exploration with backtracking uses Last-In-First-Out.',
      'BFS uses Queue; DFS uses Stack.',
    ],
    misconceptionIndex: 5,
  },
  // 10. Standard - Unweighted Shortest Path Algorithm (Application)
  {
    id: 'ch_trav_02',
    nodeId: NODE_C12_CS_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A metro passenger needs the route with the MINIMUM NUMBER OF METRO STOPS between Connaught Place and Noida Sector 62 on an unweighted network. Which traversal guarantees this in O(V + E)?',
    options: [
      'Depth-First Search (DFS)',
      'Breadth-First Search (BFS)',
      'Preorder Tree Traversal',
      'Postorder Tree Traversal',
    ],
    correctIndex: 1,
    explanation: 'In unweighted graphs, BFS visits all nodes at distance k before distance k+1. The first time the destination vertex is dequeued, it is guaranteed to have arrived via the shortest hop path.',
    hints: [
      'Think about exploring 1 stop away, then 2 stops away, then 3 stops away.',
      'DFS can dive down long roundabout corridors before finding the target.',
      'BFS explores concentric rings, guaranteeing the fewest edge transitions.',
    ],
    misconceptionIndex: 5,
  },
  // 11. Standard - Hash Table Collision Resolution (Analysis)
  {
    id: 'ch_hash_01',
    nodeId: NODE_C12_CS_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In Open Addressing with Linear Probing on a table of size 10 using h(k) = k % 10, inserting keys [12, 22, 32] produces what structural symptom?',
    options: [
      'A linked list attached to bucket 2',
      'Primary clustering: consecutive filled slots at indices 2, 3, and 4',
      'Secondary clustering along quadratic jump sequences',
      'Automatic array resizing to 20 slots',
    ],
    correctIndex: 1,
    explanation: '12 lands at index 2. 22 collides at 2 and probes index 3. 32 collides at 2, 3 and probes index 4. This creates a contiguous run of occupied cells called a primary cluster.',
    hints: [
      'With linear probing, conflicting keys step +1 to the immediate next open slot.',
      'Keys 12, 22, 32 will occupy slots 2, 3, 4 consecutively.',
      'Continuous blocks of filled slots are termed Primary Clusters.',
    ],
    misconceptionIndex: 6,
  },
  // 12. Advanced - Hash Load Factor Degradation (Evaluation)
  {
    id: 'ch_hash_02',
    nodeId: NODE_C12_CS_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Under what specific condition does a hash table’s average O(1) lookup speed degrade to worst-case O(n)?',
    options: [
      'When the table size is a prime number',
      'When every inserted key collides into the exact same bucket or cluster',
      'When separate chaining is used instead of open addressing',
      'When the load factor α remains below 0.5',
    ],
    correctIndex: 1,
    explanation: 'If a poor hash function maps all n keys to the identical index (e.g. index 2), all keys form a single linear chain of length n or a massive cluster, turning lookup into linear search O(n).',
    hints: [
      'Consider an adversarial data stream where every key has the same hash code.',
      'Searching a linked list of length n takes linear time.',
      'Total collision collapses the hash table into an ordinary linked list.',
    ],
    misconceptionIndex: 6,
  },
  // 13. Foundation - Dynamic Programming Properties (Recall)
  {
    id: 'ch_dp_01',
    nodeId: NODE_C12_CS_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What two prerequisite properties MUST a problem possess to be solvable via Dynamic Programming?',
    options: [
      'Greedy choice property and disjoint subproblems',
      'Overlapping subproblems and optimal substructure',
      'Linear data arrangement and logarithmic height',
      'Random access and constant-time branching',
    ],
    correctIndex: 1,
    explanation: 'Dynamic Programming applies when: (1) Overlapping Subproblems: identical subproblems are solved repeatedly; and (2) Optimal Substructure: an optimal global solution can be composed of optimal subproblem solutions.',
    hints: [
      'The subproblems must repeat so caching pays off.',
      'Optimal solutions of smaller parts must compose the optimal whole.',
      'The required properties are Overlapping Subproblems & Optimal Substructure.',
    ],
    misconceptionIndex: 7,
  },
  // 14. Standard - DP Memoization vs Tabulation (Analysis)
  {
    id: 'ch_dp_02',
    nodeId: NODE_C12_CS_017,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match the Dynamic Programming paradigm to its architectural execution style.',
    dragItems: [
      { label: 'Top-Down with Recursive Cache', targetId: 'dp_memo' },
      { label: 'Bottom-Up with Iterative Table', targetId: 'dp_tab' },
    ],
    correctMapping: {
      dp_memo: 'Top-Down with Recursive Cache',
      dp_tab: 'Bottom-Up with Iterative Table',
    },
    explanation: 'Memoization is Top-Down (starts with original problem, uses recursion, caches results on demand). Tabulation is Bottom-Up (starts with base cases, iterates upwards filling a table).',
    hints: [
      'Memoization = recursion + lookup dictionary.',
      'Tabulation = loops filling an array from 0 to n.',
      'Top-Down is Memoization; Bottom-Up is Tabulation.',
    ],
    misconceptionIndex: 7,
  },
  // 15. Standard - Greedy Fractional Knapsack Calculation (Application)
  {
    id: 'ch_greedy_01',
    nodeId: NODE_C12_CS_018,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A courier van has 20 kg capacity. Items: A (val ₹120, wt 10kg), B (val ₹80, wt 10kg), C (val ₹60, wt 5kg). Taking fractional items, what is the MAX possible value in rupees?',
    correctAnswer: 220,
    tolerance: 0,
    unit: '₹',
    explanation: 'Ratio(A) = 120/10 = 12/kg. Ratio(C) = 60/5 = 12/kg. Ratio(B) = 80/10 = 8/kg. Take all of A (10kg, ₹120) + all of C (5kg, ₹60) + 5kg of B (5kg * 8 = ₹40). Total = 120 + 60 + 40 = ₹220.',
    hints: [
      'Compute value-to-weight ratio for each item first.',
      'Item A is ₹12/kg, C is ₹12/kg, B is ₹8/kg.',
      'Pack A (10kg) and C (5kg), then fill remaining 5kg with half of B (₹40). Sum = 220.',
    ],
    misconceptionIndex: 8,
  },
  // 16. Advanced - Greedy Choice Failure in 0/1 Knapsack (Evaluation)
  {
    id: 'ch_greedy_02',
    nodeId: NODE_C12_CS_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does the Greedy value-to-weight ratio rule fail for the 0/1 Knapsack problem where items CANNOT be broken?',
    options: [
      'Because greedy algorithms always run in O(n!) factorial time',
      'Because choosing a high-ratio item may leave unusable empty space that could have held combinations of higher total value',
      'Because prefix-free codes cannot be constructed for indivisible weights',
      'Because value-to-weight ratios are undefined for whole numbers',
    ],
    correctIndex: 1,
    explanation: 'In 0/1 Knapsack, taking a high-ratio item can waste capacity. For example, capacity 50 with item 1 (wt 30, val 60, ratio 2) and items 2 & 3 (wt 25 each, val 40 each, ratio 1.6). Greedy takes item 1 (val 60), but items 2+3 give total val 80.',
    hints: [
      'If you cannot take a fraction, leftover capacity cannot be filled.',
      'A slightly lower ratio combination can pack the sack tighter and yield more total wealth.',
      'Greedy choice property does NOT hold for 0/1 knapsack.',
    ],
    misconceptionIndex: 8,
  },
  // 17. Standard - Backtracking N-Queens Pruning (Application)
  {
    id: 'ch_bt_01',
    nodeId: NODE_C12_CS_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In solving 4-Queens via Backtracking, what occurs when queen 1 is placed at (row 1, col 1) and queen 2 at (row 2, col 3)?',
    options: [
      'Row 3 has no safe column available, so the algorithm immediately prunes and backtracks to row 2',
      'The board is declared fully solved and outputs the coordinates',
      'Queen 1 is automatically moved to col 4 without checking row 2',
      'A queue enqueues all 256 board permutations for parallel checking',
    ],
    correctIndex: 0,
    explanation: 'In 4-Queens with Q1 at (1,1) and Q2 at (2,3), testing row 3 reveals col 1 (same col as Q1), col 2 (diagonal from Q1 & Q2), col 3 (same col as Q2), and col 4 (diagonal from Q2) are all attacked. The state is pruned early.',
    hints: [
      'Test all 4 columns in row 3 against Q1(1,1) and Q2(2,3).',
      'Col 1, 2, 3, 4 are all under attack from existing queens.',
      'Because row 3 has zero safe squares, backtracking un-places Q2.',
    ],
    misconceptionIndex: 9,
  },
  // 18. Advanced - Backtracking State Space vs Brute Force (Analysis)
  {
    id: 'ch_bt_02',
    nodeId: NODE_C12_CS_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What fundamental mechanism distinguishes Backtracking from Pure Brute-Force permutation generation?',
    options: [
      'Backtracking generates all N^N states first, then filters them in a loop',
      'Backtracking performs early constraint checking on partial candidates and prunes invalid subtrees',
      'Backtracking converts exponential complexity into guaranteed polynomial O(N) time',
      'Backtracking requires hardware quantum computing registers',
    ],
    correctIndex: 1,
    explanation: 'Brute force blindly builds every complete candidate before testing. Backtracking tests validity at each step and prunes the entire subtree of possibilities the moment a constraint fails.',
    hints: [
      'Think about stopping the branch as soon as a conflict appears.',
      'Pruning cuts off thousands of impossible states before they are generated.',
      'Early pruning of partial candidates defines backtracking.',
    ],
    misconceptionIndex: 9,
  },
  // 19. Advanced - Dijkstra Priority Queue Relaxation (Application)
  {
    id: 'ch_dijkstra_01',
    nodeId: NODE_C12_CS_020,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Construct the exact mathematical condition for Edge Relaxation in Dijkstra’s algorithm from vertex u to neighbour v with edge weight w(u, v).',
    availableParts: ['dist[u] + w(u,v) < dist[v]', 'dist[v] = dist[u] + w(u,v)', 'if', 'then', 'dist[u] < dist[v] + w(u,v)', 'swap(u, v)'],
    targetState: 'if dist[u] + w(u,v) < dist[v] then dist[v] = dist[u] + w(u,v)',
    validationHint: 'Build the if-condition checking if path through u is shorter than dist[v], then update dist[v].',
    explanation: 'Edge relaxation checks: if dist[u] + w(u, v) < dist[v], a shorter path to v has been discovered through u, so we update dist[v] = dist[u] + w(u, v).',
    hints: [
      'Start with "if", followed by the test that total distance through u is less than current dist[v].',
      'Add "then" followed by the assignment.',
      'Target is: if dist[u] + w(u,v) < dist[v] then dist[v] = dist[u] + w(u,v)',
    ],
    misconceptionIndex: 10,
  },
  // 20. Advanced - Prim vs Kruskal Minimum Spanning Tree (Evaluation)
  {
    id: 'ch_mst_01',
    nodeId: NODE_C12_CS_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'You must construct an optical-fiber Minimum Spanning Tree connecting 5 Indian Metro Hubs. Edge weights: Delhi-Mumbai 10, Chennai-Kolkata 3, Mumbai-Chennai 12, Delhi-Chennai 18, Mumbai-Kolkata 15. What is the total MST weight?',
    options: ['25 (Edges: Chennai-Kolkata:3, Delhi-Mumbai:10, Mumbai-Chennai:12)', '40', '58', '21'],
    correctIndex: 0,
    explanation: 'Kruskal sorts edges: (Chennai-Kolkata, 3) -> Add; (Delhi-Mumbai, 10) -> Add; (Mumbai-Chennai, 12) -> Add (connects all 4 cities without cycle); (Mumbai-Kolkata, 15) -> Reject (cycle); (Delhi-Chennai, 18) -> Reject (cycle). Total weight = 3 + 10 + 12 = 25.',
    hints: [
      'Sort all edge weights in increasing order: 3, 10, 12, 15, 18.',
      'Pick the 3 smallest edges that do not form a closed cycle.',
      'Take edge 3 + edge 10 + edge 12 = 25.',
    ],
    misconceptionIndex: 10,
  },
  // 21. Advanced - Kruskal Cycle Detection (Analysis)
  {
    id: 'ch_mst_02',
    nodeId: NODE_C12_CS_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which auxiliary data structure enables Kruskal’s algorithm to detect cycles and merge components in nearly O(1) amortized time per edge?',
    options: [
      'Disjoint Set Union (Union-Find with path compression)',
      'Doubly Linked Circular List',
      'Full Adjacency Matrix DFS scan',
      'AVL Search Tree',
    ],
    correctIndex: 0,
    explanation: 'Kruskal’s algorithm uses the Disjoint Set Union (DSU / Union-Find) data structure. The find operation checks if two vertices belong to the same component (avoiding cycles), and union merges them in near O(1) time.',
    hints: [
      'Think about tracking sets of connected components.',
      'Find checks if roots are identical; Union joins two sets.',
      'The data structure is Disjoint Set Union (Union-Find).',
    ],
    misconceptionIndex: 10,
  },
  // 22. Advanced - Huffman Coding Prefix-Free Code Generation (Creativity)
  {
    id: 'ch_greedy_03',
    nodeId: NODE_C12_CS_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Given character frequencies: A: 3, B: 1, N: 2 in the word "BANANA". Following Huffman coding tree construction, which character receives the shortest 1-bit code?',
    options: ['Character A (code 0)', 'Character B (code 10)', 'Character N (code 11)', 'All receive equal 2-bit codes'],
    correctIndex: 0,
    explanation: 'B (freq 1) and N (freq 2) merge to form parent BN (freq 3). Then BN (3) merges with A (3) to form root (6). A is 1 hop from root (code 0), while B and N are 2 hops away (10 and 11). Most frequent gets the shortest code.',
    hints: [
      'Huffman repeatedly merges the two lowest frequencies (B:1 and N:2).',
      'The combined node BN has frequency 3, matching A with frequency 3.',
      'A sits directly at level 1 beneath the root, yielding a 1-bit code.',
    ],
    misconceptionIndex: 8,
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
  nodeId: NODE_C12_CS_011,
  title: 'Binary Search Trees & Advanced Graph Data Structures',
  definition: 'A comprehensive suite covering Binary Search Trees, AVL balance rotations, Heaps, Graph traversals, Hash table collision resolution, Dynamic Programming, Greedy algorithms, Backtracking, and Shortest Path/MST graph algorithms.',
  eli5: 'Think of computer memory like a giant warehouse. BSTs sort parcels left-to-right on branching shelves; AVL trees rebalance the shelves so you never climb too high; Heaps put the VIP parcels on top; Hash tables give instant locker keys; and Graph algorithms find the fastest highway routes between cities.',
  misconceptions: [
    { misconception: 'Any binary tree with two children per node is automatically a BST.', correction: 'A BST requires Left Subtree < Parent < Right Subtree for EVERY node across all depths.' },
    { misconception: 'Deleting a node with two children can be done by simply promoting an arbitrary child.', correction: 'You must substitute the Inorder Successor (smallest in right subtree) or Inorder Predecessor (largest in left subtree).' },
    { misconception: 'AVL trees are always faster than ordinary BSTs for every single operation.', correction: 'AVL trees guarantee O(log n) worst case, but pay a small rotation and height-tracking overhead during simple balanced inserts.' },
    { misconception: 'A heap is a fully sorted linear array where left child < right child.', correction: 'A heap only guarantees parent-child ordering (Min or Max). There is NO guaranteed order between sibling nodes.' },
    { misconception: 'An Adjacency Matrix is always better than an Adjacency List because of O(1) edge lookups.', correction: 'Adjacency matrices consume O(V²) memory, which is overwhelmingly wasteful for sparse graphs where O(V + E) lists are optimal.' },
    { misconception: 'BFS and DFS always produce the exact same visit sequence for any graph.', correction: 'BFS explores level-by-level (FIFO queue, shortest paths), whereas DFS dives deeply along a branch (LIFO stack, cycle detection).' },
    { misconception: 'Hash tables guarantee O(1) time complexity under all possible data sets.', correction: 'If all keys hash to the same bucket or cluster, performance degenerates to linear O(n) search.' },
    { misconception: 'Memoization and Tabulation are completely unrelated algorithms.', correction: 'Both are forms of Dynamic Programming storing subproblem results; Memoization is Top-Down recursive caching, while Tabulation is Bottom-Up table filling.' },
    { misconception: 'Greedy algorithms always find the global optimum for every optimization problem.', correction: 'Greedy works only when the problem has the greedy choice property and optimal substructure (e.g. fails on 0/1 Knapsack).' },
    { misconception: 'Backtracking is simply brute force with a different name.', correction: 'Backtracking performs early constraint testing and prunes entire subtrees of infeasible branches during construction.' },
    { misconception: 'Dijkstra and Minimum Spanning Trees solve the identical graph objective.', correction: 'Dijkstra minimizes single-source shortest path distances to each vertex; MST minimizes the total weight sum connecting all vertices.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the ordering property of a BST?', options: ['Left < Parent < Right', 'Left > Parent > Right', 'Parent = Left + Right', 'Randomized order'], correctIndex: 0 },
    { question: 'What is the balance factor in an AVL tree?', options: ['Height(Left) - Height(Right)', 'Left Nodes * Right Nodes', 'Root value / Height', 'Number of leaves'], correctIndex: 0 },
    { question: 'What is the index of the left child of node i in a 0-indexed heap?', options: ['2i + 1', '2i + 2', '(i - 1) / 2', '2i'], correctIndex: 0 },
    { question: 'What space does an Adjacency List use for graph G=(V,E)?', options: ['O(V + E)', 'O(V²)', 'O(E²)', 'O(log V)'], correctIndex: 0 },
    { question: 'Which traversal finds shortest paths on unweighted graphs?', options: ['BFS', 'DFS', 'Inorder', 'Postorder'], correctIndex: 0 },
    { question: 'What occurs when two hash keys map to the same slot?', options: ['Collision', 'Stack Overflow', 'Memory Leak', 'Rebalancing'], correctIndex: 0 },
    { question: 'What are the two core prerequisites of Dynamic Programming?', options: ['Overlapping subproblems & Optimal substructure', 'Sorting & Greedy choice', 'Pointers & Recursion', 'Matrices & Graphs'], correctIndex: 0 },
    { question: 'Which algorithm finds Single-Source Shortest Paths with non-negative weights?', options: ['Dijkstra', 'Prim', 'Kruskal', 'Huffman'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student demonstrates full mastery of BST/AVL operations, Heap indexing, Graph traversals, Hash collision resolution, DP, Greedy, Backtracking, and Dijkstra/MST algorithms with 80%+ accuracy.',
};

// ─── INTERACTIVE EXPLORATION STEPS (Brilliant.org Interactive Labs) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: BST Invariant & Live Search',
    instruction: 'Drag the target key slider to trace real-time left-right branching decisions down the Binary Search Tree.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_CS_011,
  },
  {
    title: 'Lab 2: AVL Tree Balance Rotations',
    instruction: 'Select different insert orders to trigger LL, RR, LR, and RL self-balancing rotations and observe balance factors.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_CS_012,
  },
  {
    title: 'Lab 3: Binary Heap Dual Representation',
    instruction: 'Click array elements to observe how the 1D Array directly synchronizes with the Complete Binary Tree hierarchy.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_CS_013,
  },
  {
    title: 'Lab 4: Hash Table Collision Probing',
    instruction: 'Select a collision resolution method (Chaining vs Linear Probing) and insert keys to witness primary clustering.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_CS_016,
  },
  {
    title: 'Lab 5: Dijkstra Shortest Path Router',
    instruction: 'Click any destination Indian hub (Mumbai, Bengaluru, Kolkata, Chennai) from Delhi to see edge relaxation in action.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_CS_020,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you insert the key 38 into a BST where root=45, left=30, and 30 has right child 40, where will 38 land?',
    options: [
      'As the left child of 40',
      'As the right child of 40',
      'As the left child of 30',
      'It will replace the root 45',
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the Search Key slider in the interactive tree to 38 and trace the comparisons (38 < 45 -> left; 38 > 30 -> right; 38 < 40 -> left).',
    nodeId: NODE_C12_CS_011,
  },
  {
    question: 'Predict: In a Min-Heap of 7 items, where is the second smallest element guaranteed to reside?',
    options: [
      'At index 1 or index 2 (one of the root’s immediate children)',
      'Always at the last leaf index 6',
      'At index 0 alongside the root',
      'It can be at any random index in the tree',
    ],
    correctIndex: 0,
    verifyInstruction: 'Look at the Heap Visualizer: since every child is larger than its parent, the 2nd smallest must be at level 1 (index 1 or 2).',
    nodeId: NODE_C12_CS_013,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the Inorder Traversal list as you view the active Binary Search Tree?',
    observableOptions: [
      'The values are always listed in strictly ascending (sorted) order',
      'The root is always the very first element in the list',
      'The values appear in random unsorted order',
      'The largest element is placed at index 0',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_CS_011,
  },
  {
    question: 'In the Hash Table lab, what happens when multiple keys (12, 22, 32) hash to slot 2 under Linear Probing?',
    observableOptions: [
      'They occupy consecutive slots (2, 3, 4), creating a contiguous primary cluster block',
      'They overwrite each other so only the last key is saved',
      'The table expands to double its capacity automatically',
      'They are placed into negative indices',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_CS_016,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Lead Architect Mission: National Logistics Engine',
  description: 'Design the end-to-end data architecture for an Indian high-speed eCommerce supply chain connecting 10,000 hubs.',
  steps: [
    'Use an AVL Tree / Red-Black Tree for indexing real-time parcel tracking numbers with guaranteed O(log n) lookups.',
    'Implement a Min-Heap Priority Queue for emergency express air shipments ensuring priority 1 orders dispatch first.',
    'Maintain a Hash Table with Separate Chaining for customer mobile number account logins with average O(1) retrieval.',
    'Execute Dijkstra’s Algorithm across the weighted National Highway Graph (NH44, NH48) to calculate fuel-optimal truck routes.',
  ],
};

// ─── MAIN COMPONENT ───
function C12_ComputerScienceBinarySearchTreeSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['compsci'] || { name: 'Computer Science', emoji: '💻', color: 'cyan' };

  // Phase state: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Brilliant.org pattern state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Visual feedback states (MANDATORY visual cues)
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Drag & drop / interactive challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Simulation Lab Interactive States
  const [searchTarget, setSearchTarget] = useState<number>(38);
  const [selectedHeapIndex, setSelectedHeapIndex] = useState<number>(0);
  const [selectedCity, setSelectedCity] = useState<string>('Mumbai');
  const [avlSequence, setAvlSequence] = useState<'LL' | 'RR' | 'LR' | 'RL'>('LR');
  const [hashStrategy, setHashStrategy] = useState<'chaining' | 'linear'>('linear');
  const [insertedHashKeys, setInsertedHashKeys] = useState<number[]>([12, 22, 32, 45, 67]);
  const [fibN, setFibN] = useState<number>(6);
  const [activeTab, setActiveTab] = useState<'visual' | 'code' | 'theory'>('visual');

  // Persistence Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C12_CS_011);
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
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS 2D ANIMATION EFFECT ───
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

      // Draw active memory data stream
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animated memory pulse packets
      for (let i = 0; i < 6; i++) {
        const x = (frame * 1.5 + i * 80) % canvas.width;
        const y = 18 + Math.sin((frame + i * 20) * 0.08) * 6;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#38bdf8' : '#34d399';
        ctx.fill();
      }

      ctx.font = '10px monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`SYSTEM STATUS: ONLINE | BKT MASTERY: ${masteryLevel.toUpperCase()} | NODE: ${nodeId || 'c12_cs_011'}`, 12, 22);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [masteryLevel, nodeId]);

  // ─── USECALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLvl = hintCount + 1;
    if (nextLvl <= 3 && activeChallenge.hints[nextLvl - 1]) {
      setCurrentHint(activeChallenge.hints[nextLvl - 1]);
      setShowHint(true);
      setHintCount(nextLvl);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLvl - 1]);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      setShowHint(false);
    }
  }, [hintCount, activeChallenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding prediction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Data Structure Laboratories. Let us experiment!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode activated. Test any data structure without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode initiated. Apply your algorithmic mastery!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now verify it on the live interactive visualization.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Exact scientific observation!' : 'Examine the ordered sequence carefully.');
  }, []);

  const handleSearchTargetChange = useCallback((val: number) => {
    setSearchTarget(val);
    audioManager.play('count');
  }, []);

  const handleHeapNodeClick = useCallback((idx: number) => {
    setSelectedHeapIndex(idx);
    audioManager.play('tap');
    const parentIdx = Math.floor((idx - 1) / 2);
    const leftIdx = 2 * idx + 1;
    const rightIdx = 2 * idx + 2;
    speechManager.speak(`Node index ${idx}. Parent is at ${idx === 0 ? 'root' : parentIdx}, Left child is ${leftIdx}, Right child is ${rightIdx}.`);
  }, []);

  const handleCitySelect = useCallback((city: string) => {
    setSelectedCity(city);
    audioManager.play('tap');
    const costs: Record<string, string> = {
      Mumbai: 'Shortest path Delhi to Mumbai is 1000 km via NH48.',
      Chennai: 'Shortest path Delhi to Chennai is 1800 km direct.',
      Kolkata: 'Shortest path Delhi to Kolkata is 2100 km (Delhi->Mumbai->Chennai->Kolkata = 10+12+3).',
      Bengaluru: 'Shortest path Delhi to Bengaluru is 2150 km via Mumbai interchange.',
    };
    speechManager.speak(costs[city] || '');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      let arr = prev.length > 0 ? [...prev] : (activeChallenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Architect certification complete! Final score: ${finalScore} percent.`);
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
        isCorrect = answer === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(num - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = answer === activeChallenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Brilliant deduction.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, activeChallenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us study the complete structural explanation.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 3500);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  // ─── BST TRACE COMPUTATION ───
  const bstSearchPath = useMemo(() => {
    const path = [45];
    if (searchTarget < 45) {
      path.push(30);
      if (searchTarget < 30) path.push(20);
      else if (searchTarget > 30) path.push(40);
    } else if (searchTarget > 45) {
      path.push(60);
      if (searchTarget < 60) path.push(50);
      else if (searchTarget > 60) path.push(70);
    }
    return path;
  }, [searchTarget]);

  // ─── FIBONACCI DP TABLE COMPUTATION ───
  const fibTable = useMemo(() => {
    const table: number[] = [0, 1];
    for (let i = 2; i <= fibN; i++) {
      table[i] = table[i - 1] + table[i - 2];
    }
    return table;
  }, [fibN]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── SYSTEM HEADER ─── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/60 border border-gold-700 rounded-2xl">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-white tracking-wide">{title}</h1>
              <span className="px-2 py-0.5 text-xs font-semibold bg-gold-900/60 text-gold-300 border border-gold-700 rounded-md">ISC Class 12</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">NEP 2020 Competency Architecture • 10 Core Syllabus Nodes Covered</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                : difficulty === 'standard'
                ? 'bg-amber-950/80 text-amber-300 border-amber-600'
                : 'bg-rose-950/80 text-rose-300 border-rose-600'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
            Mastery: <strong className="text-gold-400">{masteryLevel}</strong>
          </span>
        </div>
      </div>

      {/* ─── 2D STATUS CANVAS ─── */}
      <canvas ref={canvasRef} width={800} height={36} className="w-full h-8 mt-2 rounded-lg border border-slate-800" />

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-4">
          <div className="p-5 bg-gradient-to-br from-gold-950/70 via-slate-900 to-gold-950/60 border border-gold-700/60 rounded-2xl">
            <span className="text-xs font-bold text-gold-400 tracking-wider uppercase">Mission Scenario Hook</span>
            <h2 className="text-xl font-bold text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              💡 <strong>Architect Context:</strong> {SCENARIO.context}
            </p>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-bold">Discovery Prediction</span>
              <p className="text-sm font-semibold text-slate-200">Before we dive into the code: make your architectural guess!</p>
            </div>
            <p className="text-base text-white font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`p-4 text-left text-sm rounded-xl border transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold text-gold-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot-on! Sorted inserts cause an ordinary BST to collapse into a degenerate O(n) linked list chain.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-gold-900/40"
                >
                  Launch Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION LABS (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-gold-400 font-bold text-sm">Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}:</span>
              <span className="text-white font-semibold text-sm">{EXPLORATION_STEPS[currentSlide].title}</span>
            </div>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full cursor-pointer transition-all ${idx === currentSlide ? 'w-8 bg-gold-400' : 'w-2 bg-slate-700'}`}
                />
              ))}
            </div>
          </div>

          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-amber-400 text-sm font-medium mb-4 flex items-center gap-2">
              <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
            </p>

            {/* SLIDE 0: LIVE BST VISUALIZER */}
            {currentSlide === 0 && (
              <div className="space-y-4">
                {/* PREDICTION HOOK */}
                {!predictionMade && (
                  <div className="p-4 bg-gold-950/50 border border-gold-700 rounded-xl space-y-2">
                    <p className="text-xs font-bold text-gold-300 uppercase">Predict-Then-Check</p>
                    <p className="text-sm text-white">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction(i)}
                          className="p-2 text-left text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Real-time Slider */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-mono">Move Search Target: <strong className="text-gold-400 text-sm">{searchTarget}</strong></span>
                    <span className="text-slate-400 font-mono">Traversal Path: <span className="text-emerald-400 font-bold">[{bstSearchPath.join(' -> ')}]</span></span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={80}
                    value={searchTarget}
                    onChange={(e) => handleSearchTargetChange(Number(e.target.value))}
                    aria-label="Set BST Search Target"
                    className="w-full accent-gold-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* SVG BST Rendering */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center">
                  <svg viewBox="0 0 500 240" className="w-full max-w-xl">
                    {/* Edges */}
                    <line x1="250" y1="40" x2="150" y2="100" stroke="#475569" strokeWidth="2" />
                    <line x1="250" y1="40" x2="350" y2="100" stroke="#475569" strokeWidth="2" />
                    <line x1="150" y1="100" x2="90" y2="170" stroke="#475569" strokeWidth="2" />
                    <line x1="150" y1="100" x2="210" y2="170" stroke="#475569" strokeWidth="2" />
                    <line x1="350" y1="100" x2="290" y2="170" stroke="#475569" strokeWidth="2" />
                    <line x1="350" y1="100" x2="410" y2="170" stroke="#475569" strokeWidth="2" />

                    {/* Nodes */}
                    {[
                      { val: 45, x: 250, y: 40, label: 'Root: 45' },
                      { val: 30, x: 150, y: 100, label: '30' },
                      { val: 60, x: 350, y: 100, label: '60' },
                      { val: 20, x: 90, y: 170, label: '20' },
                      { val: 40, x: 210, y: 170, label: '40' },
                      { val: 50, x: 290, y: 170, label: '50' },
                      { val: 70, x: 410, y: 170, label: '70' },
                    ].map((node) => {
                      const isActive = bstSearchPath.includes(node.val);
                      const isFound = searchTarget === node.val;
                      return (
                        <g key={node.val}>
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r="22"
                            fill={isFound ? '#059669' : isActive ? '#0284c7' : '#1e293b'}
                            stroke={isFound ? '#34d399' : isActive ? '#38bdf8' : '#475569'}
                            strokeWidth={isActive ? '3' : '1.5'}
                            className="transition-colors duration-300"
                          />
                          <text x={node.x} y={node.y + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                            {node.val}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Observation Check */}
                {!observationAnswered && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <p className="text-xs font-bold text-amber-400 uppercase">Scientific Observation</p>
                    <p className="text-sm text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservation(i)}
                          className="p-2 text-left text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* SLIDE 1: AVL ROTATION LAB */}
            {currentSlide === 1 && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {(['LL', 'RR', 'LR', 'RL'] as const).map((type) => (
                    <motion.button
                      key={type}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setAvlSequence(type);
                        audioManager.play('tap');
                        speechManager.speak(`Simulating ${type} imbalance case.`);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        avlSequence === type ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {type} Case Demo
                    </motion.button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-slate-400 mb-2">Imbalanced State (Before Rotation)</p>
                    <svg viewBox="0 0 240 160" className="w-full">
                      {avlSequence === 'LL' && (
                        <>
                          <line x1="160" y1="30" x2="100" y2="80" stroke="#f43f5e" strokeWidth="2" />
                          <line x1="100" y1="80" x2="50" y2="130" stroke="#f43f5e" strokeWidth="2" />
                          <circle cx="160" cy="30" r="16" fill="#881337" stroke="#f43f5e" />
                          <text x="160" y="34" textAnchor="middle" fill="white" fontSize="10">30 (BF:+2)</text>
                          <circle cx="100" cy="80" r="16" fill="#1e293b" stroke="#64748b" />
                          <text x="100" y="84" textAnchor="middle" fill="white" fontSize="10">20 (BF:+1)</text>
                          <circle cx="50" cy="130" r="16" fill="#1e293b" stroke="#64748b" />
                          <text x="50" y="134" textAnchor="middle" fill="white" fontSize="10">10 (BF:0)</text>
                        </>
                      )}
                      {avlSequence === 'LR' && (
                        <>
                          <line x1="160" y1="30" x2="90" y2="80" stroke="#f43f5e" strokeWidth="2" />
                          <line x1="90" y1="80" x2="130" y2="130" stroke="#f43f5e" strokeWidth="2" />
                          <circle cx="160" cy="30" r="16" fill="#881337" stroke="#f43f5e" />
                          <text x="160" y="34" textAnchor="middle" fill="white" fontSize="10">30 (BF:+2)</text>
                          <circle cx="90" cy="80" r="16" fill="#1e293b" stroke="#64748b" />
                          <text x="90" y="84" textAnchor="middle" fill="white" fontSize="10">10 (BF:-1)</text>
                          <circle cx="130" cy="130" r="16" fill="#1e293b" stroke="#64748b" />
                          <text x="130" y="134" textAnchor="middle" fill="white" fontSize="10">20 (BF:0)</text>
                        </>
                      )}
                      {(avlSequence === 'RR' || avlSequence === 'RL') && (
                        <text x="120" y="80" textAnchor="middle" fill="#94a3b8" fontSize="12">Right-heavy Imbalance State</text>
                      )}
                    </svg>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-emerald-400 mb-2">Balanced State (After AVL Rotation)</p>
                    <svg viewBox="0 0 240 160" className="w-full">
                      <line x1="120" y1="30" x2="60" y2="100" stroke="#10b981" strokeWidth="2" />
                      <line x1="120" y1="30" x2="180" y2="100" stroke="#10b981" strokeWidth="2" />
                      <circle cx="120" cy="30" r="16" fill="#065f46" stroke="#10b981" />
                      <text x="120" y="34" textAnchor="middle" fill="white" fontSize="10">20 (BF:0)</text>
                      <circle cx="60" cy="100" r="16" fill="#1e293b" stroke="#64748b" />
                      <text x="60" y="104" textAnchor="middle" fill="white" fontSize="10">10 (BF:0)</text>
                      <circle cx="180" cy="100" r="16" fill="#1e293b" stroke="#64748b" />
                      <text x="180" y="104" textAnchor="middle" fill="white" fontSize="10">30 (BF:0)</text>
                    </svg>
                    <p className="text-xs text-slate-300 mt-2">
                      {avlSequence === 'LL' && 'Fixed via Single Right Rotation on node 30.'}
                      {avlSequence === 'LR' && 'Fixed via Left Rotation on 10, then Right Rotation on 30.'}
                      {avlSequence === 'RR' && 'Fixed via Single Left Rotation on root.'}
                      {avlSequence === 'RL' && 'Fixed via Right Rotation on right child, then Left Rotation on root.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 2: HEAP ARRAY-TREE SYNCHRONIZER */}
            {currentSlide === 2 && (
              <div className="space-y-4">
                <p className="text-xs text-slate-300">Click any node in the tree or array to see parent-child mathematical links in action:</p>

                {/* 1D Array */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-xs font-mono text-slate-400 mb-2">1D Array Representation [0..6]:</p>
                  <div className="flex flex-wrap gap-2">
                    {[5, 12, 8, 19, 21, 14, 16].map((val, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleHeapNodeClick(idx)}
                        className={`px-3 py-2 rounded-lg font-mono text-xs border ${
                          selectedHeapIndex === idx ? 'bg-gold-600 text-white border-gold-300 font-bold' : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        <div className="text-[10px] text-slate-400">i={idx}</div>
                        <div>val={val}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Tree Visual */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center">
                  <svg viewBox="0 0 400 180" className="w-full max-w-md">
                    <line x1="200" y1="30" x2="100" y2="80" stroke="#475569" strokeWidth="2" />
                    <line x1="200" y1="30" x2="300" y2="80" stroke="#475569" strokeWidth="2" />
                    <line x1="100" y1="80" x2="60" y2="135" stroke="#475569" strokeWidth="2" />
                    <line x1="100" y1="80" x2="140" y2="135" stroke="#475569" strokeWidth="2" />
                    <line x1="300" y1="80" x2="260" y2="135" stroke="#475569" strokeWidth="2" />
                    <line x1="300" y1="80" x2="340" y2="135" stroke="#475569" strokeWidth="2" />

                    {[
                      { idx: 0, val: 5, x: 200, y: 30 },
                      { idx: 1, val: 12, x: 100, y: 80 },
                      { idx: 2, val: 8, x: 300, y: 80 },
                      { idx: 3, val: 19, x: 60, y: 135 },
                      { idx: 4, val: 21, x: 140, y: 135 },
                      { idx: 5, val: 14, x: 260, y: 135 },
                      { idx: 6, val: 16, x: 340, y: 135 },
                    ].map((item) => (
                      <g key={item.idx} onClick={() => handleHeapNodeClick(item.idx)} className="cursor-pointer">
                        <circle
                          cx={item.x}
                          cy={item.y}
                          r="18"
                          fill={selectedHeapIndex === item.idx ? '#0284c7' : '#1e293b'}
                          stroke={selectedHeapIndex === item.idx ? '#38bdf8' : '#64748b'}
                          strokeWidth="2"
                        />
                        <text x={item.x} y={item.y + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                          {item.val}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            )}

            {/* SLIDE 3: HASH TABLE COLLISION LAB */}
            {currentSlide === 3 && (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setHashStrategy('linear');
                      audioManager.play('tap');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                      hashStrategy === 'linear' ? 'bg-amber-600 text-white border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    Open Addressing (Linear Probing)
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setHashStrategy('chaining');
                      audioManager.play('tap');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                      hashStrategy === 'chaining' ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    Separate Chaining
                  </motion.button>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-400 mb-3 font-mono">Hash Function: h(k) = k % 10 | Inserted Keys: [12, 22, 32, 45, 67]</p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((bucket) => {
                      return (
                        <div key={bucket} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-gold-400 font-mono font-bold block">Bucket {bucket}:</span>
                          <div className="mt-1 text-xs font-mono">
                            {hashStrategy === 'linear' ? (
                              bucket === 2 ? (
                                <span className="text-emerald-400 font-bold">12</span>
                              ) : bucket === 3 ? (
                                <span className="text-amber-400 font-bold">22 (probe)</span>
                              ) : bucket === 4 ? (
                                <span className="text-rose-400 font-bold">32 (probe)</span>
                              ) : bucket === 5 ? (
                                <span className="text-emerald-400">45</span>
                              ) : bucket === 7 ? (
                                <span className="text-emerald-400">67</span>
                              ) : (
                                <span className="text-slate-600">empty</span>
                              )
                            ) : (
                              bucket === 2 ? (
                                <span className="text-gold-300 font-mono text-[11px]">12 → 22 → 32</span>
                              ) : bucket === 5 ? (
                                <span className="text-gold-300 font-mono">45</span>
                              ) : bucket === 7 ? (
                                <span className="text-gold-300 font-mono">67</span>
                              ) : (
                                <span className="text-slate-600">null</span>
                              )
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 4: DIJKSTRA ROUTER LAB */}
            {currentSlide === 4 && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {['Mumbai', 'Bengaluru', 'Kolkata', 'Chennai'].map((city) => (
                    <motion.button
                      key={city}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCitySelect(city)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                        selectedCity === city ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      Route to {city}
                    </motion.button>
                  ))}
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center">
                  <svg viewBox="0 0 500 220" className="w-full max-w-lg">
                    {/* Graph Edges */}
                    <line x1="250" y1="30" x2="120" y2="100" stroke="#38bdf8" strokeWidth="3" />
                    <text x="175" y="60" fill="#38bdf8" fontSize="10">10 (1000km)</text>

                    <line x1="250" y1="30" x2="380" y2="100" stroke="#64748b" strokeWidth="2" />
                    <text x="325" y="60" fill="#94a3b8" fontSize="10">18 (1800km)</text>

                    <line x1="120" y1="100" x2="380" y2="100" stroke="#38bdf8" strokeWidth="3" />
                    <text x="250" y="95" fill="#38bdf8" fontSize="10">12 (1200km)</text>

                    <line x1="380" y1="100" x2="430" y2="180" stroke="#38bdf8" strokeWidth="3" />
                    <text x="415" y="145" fill="#38bdf8" fontSize="10">3 (300km)</text>

                    {/* Nodes */}
                    {[
                      { name: 'Delhi (SRC)', x: 250, y: 30, color: '#10b981' },
                      { name: 'Mumbai', x: 120, y: 100, color: '#0284c7' },
                      { name: 'Chennai', x: 380, y: 100, color: '#0284c7' },
                      { name: 'Kolkata', x: 430, y: 180, color: '#f59e0b' },
                    ].map((hub) => (
                      <g key={hub.name}>
                        <circle cx={hub.x} cy={hub.y} r="20" fill={hub.color} stroke="#ffffff" strokeWidth="2" />
                        <text x={hub.x} y={hub.y + 4} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
                          {hub.name}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 disabled:opacity-40 text-white font-semibold text-xs rounded-xl border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('tap');
                }}
                className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-gold-900/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/40"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-4">
          <div className="p-5 bg-gradient-to-r from-slate-900 via-gold-950 to-slate-900 border border-gold-700/50 rounded-2xl">
            <h2 className="text-lg font-bold text-gold-300">Architect Sandbox & Dynamic Programming Workbench</h2>
            <p className="text-xs text-slate-300 mt-1">Zero grading pressure. Test bottom-up DP tabulation, Fibonacci memoization tables, and tree branches freely.</p>
          </div>

          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-mono">Set DP Fibonacci Target (n): <strong className="text-gold-400 text-sm">{fibN}</strong></span>
              <span className="text-emerald-400 font-mono font-bold">Computed fib({fibN}) = {fibTable[fibN]}</span>
            </div>
            <input
              type="range"
              min={2}
              max={12}
              value={fibN}
              onChange={(e) => setFibN(Number(e.target.value))}
              aria-label="Set Fibonacci N"
              className="w-full accent-gold-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />

            {/* DP Tabulation Table */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <p className="text-xs font-mono text-slate-400 mb-2">DP Tabulation Array (Iterative O(n) construction):</p>
              <div className="flex flex-wrap gap-2">
                {fibTable.map((val, idx) => (
                  <div key={idx} className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-center font-mono">
                    <span className="text-[10px] text-slate-500 block">i={idx}</span>
                    <span className="text-xs text-gold-300 font-bold">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAdvanceToChallenge}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-900/40"
            >
              I am Ready for the Final Examination Challenges! →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE (NEP 2020 COMPETENCY ASSESSMENTS) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-4">
          {/* Header & Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-bold">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="px-2.5 py-0.5 bg-gold-950 text-gold-300 border border-gold-700 rounded-md uppercase font-semibold text-[10px]">
                NEP Competency: {activeChallenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <p className="text-base font-semibold text-white leading-relaxed">{activeChallenge.question}</p>

            {/* MCQ TYPE (Classify / Distinguish / Match) */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="space-y-2.5 pt-2">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                      wrongFlash
                        ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                        : showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-gold-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL TYPE */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag items below to their correct target containers:</span>
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing border border-gold-400 shadow-md"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.keys(activeChallenge.correctMapping || {}).map((targetId) => (
                    <div
                      key={targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed min-h-[70px] flex items-center justify-between ${
                        droppedLabels[targetId] ? 'bg-emerald-950/40 border-emerald-500' : 'bg-slate-950 border-slate-700'
                      }`}
                    >
                      <span className="text-xs font-mono text-slate-400 capitalize">{targetId.replace('case_', 'Case: ').replace('ds_', 'Algorithm: ')}</span>
                      <span className="text-xs font-bold text-gold-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
                        {droppedLabels[targetId] || 'Drop Label Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl"
                >
                  Verify Target Mappings
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3 pt-2">
                <span className="text-xs text-slate-400">Drag to reorder steps into correct sequential execution:</span>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex items-center gap-3 cursor-grab text-xs text-slate-200"
                    >
                      <span className="w-6 h-6 rounded-full bg-gold-950 text-gold-400 border border-gold-700 flex items-center justify-center font-bold">
                        {displayIdx + 1}
                      </span>
                      {item}
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : activeChallenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl"
                >
                  Confirm Sorted Sequence
                </motion.button>
              </div>
            )}

            {/* NUMERIC TYPE */}
            {activeChallenge.type === 'numeric' && (
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-gold-400 outline-none w-64"
                  />
                  <span className="text-xs text-slate-400 font-bold">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl"
                  >
                    Submit Value
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT TYPE */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="pt-2 space-y-3">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-mono text-gold-300"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((p, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gold-900/60 border border-gold-500 rounded-md font-mono text-xs text-white flex items-center gap-2">
                      {p}
                      <button onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))} className="text-rose-400 hover:text-rose-300 text-xs font-bold">
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click mathematical parts above to assemble edge relaxation formula...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl"
                >
                  Verify Formula Construction
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-amber-950/40 border border-amber-600/70 rounded-xl space-y-3">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step-by-Step Explanation:</p>
                {activeChallenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-amber-200 leading-relaxed">
                      <strong className="text-amber-400 mr-1">{i + 1}.</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                  >
                    Show Next Logical Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-900/40"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Certification →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD CERTIFICATION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 space-y-5">
          <div className="p-6 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-gold-950/80 border border-emerald-600/70 rounded-2xl text-center space-y-2">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-black text-white">Curriculum Certification Achieved!</h2>
            <p className="text-slate-300 text-sm">You have demonstrated ISC Class 12 Computer Science mastery across all 10 Data Structure & Algorithm units.</p>
            <div className="flex justify-center gap-6 pt-3">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Adaptive Tier</span>
                <span className="text-xl font-bold text-gold-400 uppercase">{difficulty}</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">BKT Mastery</span>
                <span className="text-xl font-bold text-gold-300 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-sm font-medium text-slate-200 leading-relaxed">
            {errors === 0 && (
              <p className="text-emerald-300 font-bold">
                🌟 PERFECT SCORE! Flawless system architect performance — you answered every challenge with total precision without triggering fallbacks!
              </p>
            )}
            {errors >= 1 && errors <= 3 && (
              <p className="text-gold-300 font-bold">
                🎯 Great work! Outstanding problem-solving intuition across complex tree rotations, graph algorithms, and DP subproblems.
              </p>
            )}
            {errors >= 4 && errors <= 7 && (
              <p className="text-amber-300 font-bold">
                🌱 Good effort! You have developed a solid foundation. Review the targeted corrections below to reinforce tricky edge cases.
              </p>
            )}
            {errors >= 8 && (
              <p className="text-rose-300 font-bold">
                💪 Do not give up — You WILL get this! Data structures and algorithms take practice to master. Review the core concepts and try again.
              </p>
            )}
          </div>

          {/* Spaced Repetition Schedule (Prominently Visible) */}
          <div className="p-5 bg-gradient-to-r from-gold-950/80 via-purple-950/60 to-slate-900 border-2 border-gold-500/80 rounded-2xl shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🧠</span>
                <div>
                  <h3 className="text-sm font-bold text-gold-200 uppercase tracking-wider">Spaced Repetition Schedule</h3>
                  <p className="text-xs text-gold-300/80">SM-2 Adaptive Memory Retention Algorithm</p>
                </div>
              </div>
              <span className="px-3.5 py-1 bg-gold-500/20 text-gold-300 border border-gold-400/50 rounded-full text-xs font-extrabold uppercase tracking-wide">
                {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
              </span>
            </div>
            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-gold-900/50 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
              <span>
                Based on your diagnostic score ({errors} error{errors === 1 ? '' : 's'}), your next review is scheduled:{' '}
                <strong className="text-gold-400">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </strong>{' '}
                to lock in long-term retention.
              </span>
              <span className="text-slate-400 text-[11px] font-mono">
                Recommended SRS Interval: {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </span>
            </div>
          </div>

          {/* Reflection Section */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-gold-300">🤔 Reflection</h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <p className="font-semibold text-white">What was the most surprising thing you learned?</p>
                <p className="text-slate-400">Notice how un-balanced BSTs degrade into O(n) linked lists, and how AVL rotations dynamically restore O(log n) efficiency.</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <p className="font-semibold text-white">How would you explain this to a friend?</p>
                <p className="text-slate-400">Think about real-world analogies: tree branches for hierarchical parcel searches, and graph shortest paths for emergency dispatch.</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <p className="font-semibold text-white">Where in real life might you use this?</p>
                <p className="text-slate-400">From GPS mapping engines (Dijkstra) and database indices (B-Trees/AVL) to fast network packet routing and priority queues.</p>
              </div>
            </div>
          </div>

          {/* Misconception Gap Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 border border-rose-800/60 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>���️</span> Detected Gaps & Targeted Corrections:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                      <p className="text-xs text-rose-300 font-semibold">❌ Misconception: {m.misconception}</p>
                      <p className="text-xs text-emerald-300 font-medium">✓ Board Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Blueprint */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-gold-300">🏗️ {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-gold-400 mr-1.5">{i + 1}.</span> {st}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_ComputerScienceBinarySearchTreeSim;
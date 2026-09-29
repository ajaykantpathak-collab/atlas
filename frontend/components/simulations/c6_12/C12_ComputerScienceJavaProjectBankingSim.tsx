'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

// ─��─ ISC CLASS 12 COMPUTER SCIENCE CAPSTONE NODE CONSTANTS ───
const NODE_C12_CS_051 = 'c12_cs_051'; // Banking system (JDBC, transactions, GUI)
const NODE_C12_CS_052 = 'c12_cs_052'; // Library management (database, search, GUI)
const NODE_C12_CS_053 = 'c12_cs_053'; // Student grade management (statistics, charts)
const NODE_C12_CS_054 = 'c12_cs_054'; // Chat application (sockets, multithreading)
const NODE_C12_CS_055 = 'c12_cs_055'; // E-commerce simulation (cart, checkout, inventory)
const NODE_C12_CS_056 = 'c12_cs_056'; // Hospital management (appointments, patients, doctors)
const NODE_C12_CS_057 = 'c12_cs_057'; // Payroll system (inheritance, polymorphism, database)
const NODE_C12_CS_058 = 'c12_cs_058'; // Weather app (API integration, JSON parsing)
const NODE_C12_CS_059 = 'c12_cs_059'; // Task manager (CRUD, priority, reminders)
const NODE_C12_CS_060 = 'c12_cs_060'; // Software engineering principles (modularity, coupling, cohesion, abstraction)

const ALL_CAPSTONE_NODES = [
  NODE_C12_CS_051, NODE_C12_CS_052, NODE_C12_CS_053, NODE_C12_CS_054, NODE_C12_CS_055,
  NODE_C12_CS_056, NODE_C12_CS_057, NODE_C12_CS_058, NODE_C12_CS_059, NODE_C12_CS_060
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Apex National Bank Core Banking Modernization',
  intro: 'You are the Chief Technical Architect tasked with designing the secure transaction subsystem and capstone software architecture for Apex National Bank of India. The board examiners and regulatory auditors require rigorous ACID transaction guarantees, parameterised JDBC security, and modular OOP architecture.',
  context: 'Simulate high-stakes live money transfers, socket multithreading queues, statistical performance tracking, and relational schemas spanning 10 key Class 12 CS project areas.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In a real-time fund transfer of ₹10,000 between accounts A and B, Account A balance is deducted, but a server crash occurs BEFORE Account B is credited. If `autoCommit` was left `true`, what happens?',
  options: [
    'The database automatically undoes the deduction upon server restart.',
    'Account A permanently loses ₹10,000 while Account B receives ₹0, corrupting the bank ledger.',
    'The JVM pauses execution and waits for the database to come back online.',
    'The transaction switches to a temporary memory buffer without data loss.'
  ],
  correctIndex: 1,
  hintAfter: 'Without `setAutoCommit(false)` and atomic `commit()`/`rollback()`, each SQL statement saves permanently upon execution. Let us explore atomic transactions!',
};

// ─── PREDICTION QUESTIONS (Brilliant.org Predict-then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_001',
    question: 'If you enable "Inject Crash Mid-Transfer" while autoCommit is FALSE, what will happen to the sender balance after the simulated crash occurs?',
    options: [
      'The sender balance remains deducted permanently because the debit statement already ran.',
      'The sender balance is fully restored to ₹50,000 via the catch block executing con.rollback().',
      'The receiver balance increases anyway to balance the ledger.',
      'The database schema is locked and dropped automatically.'
    ],
    correctIndex: 1,
    explanation: 'When autoCommit is false, intermediate SQL updates remain uncommitted. When a crash occurs, the exception catch block triggers con.rollback(), cleanly restoring the original sender balance.',
    verifyInstruction: 'Ensure autoCommit is unchecked (FALSE), check "Inject Crash Mid-Transfer", and click "Execute ₹15,000 Transfer" in Lab Step 1 to observe the rollback in the live event log.'
  },
  {
    id: 'pred_002',
    question: 'What will happen when you submit the SQL injection payload "1001\' OR \'1\'=\'1" using PreparedStatement mode compared to Statement Concatenation?',
    options: [
      'PreparedStatement will execute the OR condition and display all customer records in the database.',
      'PreparedStatement will fail to compile and crash the Java Virtual Machine.',
      'PreparedStatement will safely treat the entire payload as a literal string value, preventing SQL syntax alteration.',
      'Both modes will behave identically and bypass the WHERE clause.'
    ],
    correctIndex: 2,
    explanation: 'PreparedStatement compiles the SQL query abstract syntax tree before binding values. The parameter placeholder binds "1001\' OR \'1\'=\'1" as a single literal string data value, neutralizing the attack.',
    verifyInstruction: 'Switch to Lab Step 2, select Payload 1 with PreparedStatement mode active, and observe that the compiled query treats the payload as an exact literal match.'
  }
];

// ─── OBSERVATION QUESTIONS (Brilliant.org 'What do you notice?' Pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_001',
    question: 'Observe the live JDBC event log when autoCommit is FALSE during a simulated crash. What sequence of operations do you notice?',
    options: [
      'Debit SQL executes -> Server crash occurs -> Catch block calls con.rollback() -> Sender balance restored.',
      'Debit SQL executes -> Auto-commit saves immediately -> Crash occurs -> Funds permanently lost.',
      'Credit SQL executes first -> Debit SQL executes second -> Commit succeeds.',
      'No SQL statements are executed when crash simulation is active.'
    ],
    observableOptions: [
      'Debit SQL executes -> Server crash occurs -> Catch block calls con.rollback() -> Sender balance restored.',
      'Debit SQL executes -> Auto-commit saves immediately -> Crash occurs -> Funds permanently lost.',
      'Credit SQL executes first -> Debit SQL executes second -> Commit succeeds.',
      'No SQL statements are executed when crash simulation is active.'
    ],
    correctIndex: 0,
    explanation: 'The event console clearly demonstrates atomicity: the intermediate debit statement is executed, but upon catching the crash exception, con.rollback() undoes the change, preserving data integrity.'
  },
  {
    id: 'obs_002',
    question: 'When toggling between PreparedStatement and Statement Concatenation in the SQL Shield workbench, what do you observe in the compiled SQL output?',
    options: [
      'The server port number switches from port 5000 to port 8080.',
      'PreparedStatement quotes the payload as a literal parameter, whereas Statement directly interpolates quotes into the SQL logic.',
      'The database driver converts all SQL statements to Java bytecode.',
      'The table name is automatically renamed from accounts to audit_log.'
    ],
    observableOptions: [
      'The server port number switches from port 5000 to port 8080.',
      'PreparedStatement quotes the payload as a literal parameter, whereas Statement directly interpolates quotes into the SQL logic.',
      'The database driver converts all SQL statements to Java bytecode.',
      'The table name is automatically renamed from accounts to audit_log.'
    ],
    correctIndex: 1,
    explanation: 'Notice that PreparedStatement protects query grammar by treating input as a raw data literal, while Statement string concatenation alters the SQL logic itself.'
  }
];

// ─── REAL-WORLD ACTIVITY ───
export const REAL_WORLD_ACTIVITY = {
  title: 'Enterprise Core Banking & Reservation System Architecture',
  description: 'Design and prototype a fault-tolerant transaction engine for a high-volume payment or reservation service (e.g., IRCTC or India Post Payments Bank) using robust JDBC transactions, socket concurrency, and modular software engineering principles.',
  steps: [
    'Design normalized relational database tables with strict Primary and Foreign Key constraints (accounts, passengers, transactions, audit_logs).',
    'Implement atomic transaction management using con.setAutoCommit(false), executing multi-step debit/credit statements and invoking con.rollback() inside exception catch blocks.',
    'Defend against SQL injection vulnerabilities by replacing all dynamic String queries with PreparedStatement parameter binding (? placeholders).',
    'Build a multithreaded ServerSocket connection listener that dispatches incoming client sockets to isolated worker threads and synchronizes shared queues.',
    'Organize software layers using High Cohesion and Low Coupling principles, splitting the project into Model, DAO, Service, and GUI View classes.'
  ]
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Atomicity & JDBC Transaction Control',
    instruction: 'Toggle AutoCommit off, initiate the transfer, and toggle the Server Crash fault injector to see commit vs rollback in action.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_CS_051,
  },
  {
    title: 'PreparedStatement vs SQL Injection Shield',
    instruction: 'Type malicious SQL payloads in the user input box and see how PreparedStatement safely binds parameters as raw literals.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C12_CS_051,
  },
  {
    title: 'Multithreaded Socket Server Architecture',
    instruction: 'Spawn concurrent client connections and observe how ServerSocket.accept() delegates each client to an isolated Worker Thread.',
    interactionType: 'drag-classify',
    nodeId: NODE_C12_CS_054,
  },
  {
    title: 'OOP Polymorphism & Dynamic Method Dispatch',
    instruction: 'Select different Employee instances (Salaried, Hourly, Commission) and observe the JVM runtime dispatching calculateSalary().',
    interactionType: 'drag-position',
    nodeId: NODE_C12_CS_057,
  },
  {
    title: 'Software Metrics: Coupling vs Cohesion Matrix',
    instruction: 'Adjust architecture modularity sliders to balance Class Cohesion against Inter-Module Coupling for the system.',
    interactionType: 'drag-match',
    nodeId: NODE_C12_CS_060,
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
}

// ─── 22 COMPREHENSIVE CHALLENGES COVERING ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  // 1. c12_cs_051: Banking JDBC Foundation (Recall)
  {
    id: 'ch_cs_001',
    nodeId: NODE_C12_CS_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which method on the java.sql.Connection object must be invoked to disable automatic per-statement committing before initiating a multi-step fund transfer?',
    options: [
      'con.setTransactionIsolation(TRANSACTION_READ_COMMITTED);',
      'con.setAutoCommit(false);',
      'con.beginAtomicBlock();',
      'con.disableCommit();'
    ],
    correctIndex: 1,
    explanation: 'Calling `con.setAutoCommit(false);` signals to the database that subsequent statements belong to a single transaction until `con.commit()` or `con.rollback()` is explicitly called.',
    hints: [
      'Look for the method that configures automatic commit behaviour.',
      'It takes a boolean parameter to disable immediate database writes.',
      'The exact JDBC method name is `setAutoCommit(false)`.'
    ],
    misconceptionIndex: 2,
  },
  // 2. c12_cs_051: Drag-Label Banking Schema (Understanding)
  {
    id: 'ch_cs_002',
    nodeId: NODE_C12_CS_051,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Map the appropriate relational schema components to their architectural roles in the banking database.',
    dragItems: [
      { label: 'Primary Key: account_number', targetId: 'acc_pk' },
      { label: 'Foreign Key: account_number', targetId: 'tx_fk' },
      { label: 'PreparedStatement Setter', targetId: 'jdbc_ps' },
      { label: 'Atomic Rollback Handler', targetId: 'catch_rb' },
    ],
    correctMapping: {
      acc_pk: 'Primary Key: account_number',
      tx_fk: 'Foreign Key: account_number',
      jdbc_ps: 'PreparedStatement Setter',
      catch_rb: 'Atomic Rollback Handler'
    },
    explanation: 'The accounts table uses `account_number` as its Primary Key. The transactions table references it via a Foreign Key to guarantee referential integrity. Parameterized setters protect data insertion, while catch blocks trigger rollback upon failure.',
    hints: [
      'Identify what uniquely identifies a row in the Accounts table.',
      'Consider what links the transactions ledger to an account record.',
      'Match the setter to JDBC placeholders and catch block to rollback.'
    ],
  },
  // 3. c12_cs_051: Numeric Overdraft Calculation (Application)
  {
    id: 'ch_cs_003',
    nodeId: NODE_C12_CS_051,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Account #1001 has ₹24,500. A customer initiates a withdrawal of ₹18,000, followed by a monthly maintenance fee of ₹850 and a deposit of ₹4,200 in one transaction block. What is the final balance in Rupees?',
    correctAnswer: 9850,
    tolerance: 0,
    unit: '₹',
    explanation: 'Calculation: 24,500 - 18,000 = 6,500. 6,500 - 850 = 5,650. 5,650 + 4,200 = 9,850. The committed ledger balance is ₹9,850.',
    hints: [
      'Subtract the withdrawal and fee from starting balance: ₹24,500 - ₹18,000 - ₹850.',
      'Add the subsequent deposit of ₹4,200.',
      '₹24,500 - ₹18,850 + ₹4,200 = ₹9,850.'
    ],
  },
  // 4. c12_cs_051: Drag-Sort Transaction Lifecycle (Analysis)
  {
    id: 'ch_cs_004',
    nodeId: NODE_C12_CS_051,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of JDBC transaction operations for a secure fund transfer between two accounts.',
    sortItems: [
      'con.setAutoCommit(false);',
      'Execute UPDATE sender balance & INSERT debit transaction',
      'Execute UPDATE receiver balance & INSERT credit transaction',
      'con.commit();',
      'Catch SQLException and invoke con.rollback();'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'First, disable auto-commit. Next execute the sender debit operations, followed by receiver credit operations. If all succeed, call `con.commit()`. If an exception occurs at any point, the catch block invokes `con.rollback()`.',
    hints: [
      'The connection must be set to manual commit before running updates.',
      'Both sender debit and receiver credit must execute before calling commit.',
      'Rollback belongs inside the error recovery catch block at the end.'
    ],
  },
  // 5. c12_cs_052: Library Management Partial Search (Application)
  {
    id: 'ch_cs_005',
    nodeId: NODE_C12_CS_052,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'In the Library Management System (c12_cs_052), a user searches for books containing "Computer" in the title. Which JDBC PreparedStatement syntax is correct and secure against SQL injection?',
    options: [
      'ps = con.prepareStatement("SELECT * FROM books WHERE title LIKE \'%" + keyword + "%\'");',
      'ps = con.prepareStatement("SELECT * FROM books WHERE title LIKE ?"); ps.setString(1, "%" + keyword + "%");',
      'ps = con.prepareStatement("SELECT * FROM books WHERE title LIKE %?%"); ps.setString(1, keyword);',
      'ps = con.prepareStatement("SELECT * FROM books WHERE title = ?"); ps.setString(1, "*Computer*");'
    ],
    correctIndex: 1,
    explanation: 'Wildcards `%` must be part of the bound parameter value passed into `setString(1, "%" + keyword + "%")`. Putting `%?%` inside the SQL text causes a SQL syntax compilation error.',
    hints: [
      'SQL placeholders `?` must stand alone without quotes or adjacent wildcard characters.',
      'Concatenating the `%` symbols directly with the user string inside `setString` is the standard JDBC pattern.',
      'Choose `WHERE title LIKE ?` and pass `"%" + keyword + "%"` in parameter 1.'
    ],
    misconceptionIndex: 1,
  },
  // 6. c12_cs_052: Library Book Issue-Return Referential Integrity (Analysis)
  {
    id: 'ch_cs_006',
    nodeId: NODE_C12_CS_052,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'When a member returns a borrowed book in the library system, why must the application update both the `issues` table and the `books` table inside one atomic transaction?',
    options: [
      'Because JDBC does not allow updating tables separately.',
      'To ensure `return_date` is recorded and `available_copies` is incremented simultaneously, preventing inconsistent inventory counts.',
      'Because foreign keys are automatically deleted upon book return.',
      'To re-compile the database query execution plan.'
    ],
    correctIndex: 1,
    explanation: 'If `issues.return_date` is stamped but the server crashes before `books.available_copies = available_copies + 1` executes, the catalog displays fewer available copies than physically exist on shelves.',
    hints: [
      'Think about what happens to available inventory if only one table updates.',
      'Atomic transactions ensure both the issue audit log and physical stock remain in sync.',
      'Simultaneous updates preserve referential and operational consistency.'
    ],
  },
  // 7. c12_cs_053: Grade Statistics Java vs SQL Aggregation (Evaluation)
  {
    id: 'ch_cs_007',
    nodeId: NODE_C12_CS_053,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'For a school with 50,000 exam records, evaluate whether Mean should be computed via SQL `AVG(marks)` while Median is computed in Java via `Collections.sort()`. Why is this hybrid architecture optimal?',
    options: [
      'Java is always faster than SQL for all statistical measures including mean.',
      'SQL `AVG(marks)` computes mean efficiently in database memory with zero network row transfer, while Median requires sorting/indexing logic best processed in Java objects.',
      'SQL cannot perform mathematical calculations like division.',
      'Java memory can hold unlimited rows without garbage collection latency.'
    ],
    correctIndex: 1,
    explanation: 'Database engines optimize aggregate reductions like `AVG()`, `MAX()`, `MIN()` across disk pages, returning a single scalar number. Calculating custom statistics like median or mode from filtered subsets is cleanly handled in Java collections after retrieval.',
    hints: [
      'Consider network bandwidth: transferring 50,000 rows vs returning 1 scalar value.',
      'SQL native aggregate functions are executed directly on the storage engine.',
      'A hybrid approach uses SQL for standard aggregates and Java for custom algorithmic sorting.'
    ],
  },
  // 8. c12_cs_053: Numeric Median Calculation (Application)
  {
    id: 'ch_cs_008',
    nodeId: NODE_C12_CS_053,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Given an array of student marks: [74, 92, 85, 68, 90, 78, 88, 82]. After sorting in Java, what is the exact calculated median mark?',
    correctAnswer: 83.5,
    tolerance: 0.1,
    unit: 'marks',
    explanation: 'Sorted marks: [68, 74, 78, 82, 85, 88, 90, 92]. For N = 8 (even), the median is the average of index 3 (82) and index 4 (85): (82 + 85) / 2 = 83.5.',
    hints: [
      'First sort the numbers in ascending order: 68, 74, 78, 82, 85, 88, 90, 92.',
      'Identify the two middle elements at positions N/2 and (N/2)+1.',
      'Average 82 and 85: (82 + 85) / 2 = 83.5.'
    ],
  },
  // 9. c12_cs_054: Sockets & Multithreading Race Conditions (Analysis)
  {
    id: 'ch_cs_009',
    nodeId: NODE_C12_CS_054,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In the multithreaded chat server (c12_cs_054), what critical defect occurs if `clients.add(clientWriter)` and `broadcast(message)` access a plain `ArrayList` without `synchronized` protection?',
    options: [
      'The TCP socket port closes permanently.',
      '`ConcurrentModificationException` occurs or messages are dropped/corrupted when one thread iterates while another modifies the list.',
      'Java bytecode compiler refuses to generate class files.',
      'Client IP addresses are overwritten.'
    ],
    correctIndex: 1,
    explanation: 'A plain `ArrayList` is not thread-safe. Concurrent modifications during iteration cause `ConcurrentModificationException` or silent race conditions. Protecting the list with `Collections.synchronizedList()` or `synchronized(clients)` prevents this.',
    hints: [
      'Multiple client handler threads access the shared client list concurrently.',
      'Modifying a collection while another thread is iterating over it throws a specific runtime exception.',
      'The exception is `ConcurrentModificationException`.'
    ],
  },
  // 10. c12_cs_054: Construct Chat Client-Server Pipeline (Creativity)
  {
    id: 'ch_cs_010',
    nodeId: NODE_C12_CS_054,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the essential architectural components for a real-time multithreaded Chat Server loop.',
    availableParts: ['ServerSocket(5000)', 'serverSocket.accept()', 'new Thread(new ClientHandler(socket)).start()', 'while(true) loop', 'synchronized broadcast()'],
    targetState: 'ServerSocket(5000) while(true) loop serverSocket.accept() new Thread(new ClientHandler(socket)).start() synchronized broadcast()',
    validationHint: 'Order: Initialize ServerSocket -> Start Infinite Loop -> Accept Client Socket -> Spawn Worker Thread -> Synchronize Broadcast',
    explanation: 'The server instantiates a `ServerSocket`, loops infinitely waiting for connections with `accept()`, dispatches each connected `Socket` to an asynchronous `ClientHandler` thread, and synchronizes broadcast dispatches.',
    hints: [
      'Start by creating the listening ServerSocket on port 5000.',
      'Enter the infinite connection listening loop before accepting.',
      'Delegate accepted socket to a new thread, and guard broadcasting with synchronization.'
    ],
  },
  // 11. c12_cs_055: E-Commerce Inventory Transaction & Cart (Application)
  {
    id: 'ch_cs_055',
    nodeId: NODE_C12_CS_055,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'During e-commerce checkout (c12_cs_055), a customer orders 3 units of Darjeeling Tea (Stock: 2). How should the business layer handle this situation before executing database modifications?',
    options: [
      'Insert the order with negative stock and alert the warehouse.',
      'Validate stock in memory or via SQL lock, reject the order with an `InsufficientStockException`, and display a user-friendly alert.',
      'Charge the payment and insert empty `order_items` rows.',
      'Delete the product from the master catalog.'
    ],
    correctIndex: 1,
    explanation: 'Robust e-commerce design validates available inventory prior to payment/order creation. If requested quantity exceeds stock, throw an exception and inform the user, keeping database records intact.',
    hints: [
      'Never allow stock to drop below zero in persistent storage.',
      'Check `stock_quantity >= cart.getQuantity()` before starting order transaction.',
      'Throw an InsufficientStockException and show a notification.'
    ],
  },
  // 12. c12_cs_055: Numeric Cart Discount Calculation (Application)
  {
    id: 'ch_cs_012',
    nodeId: NODE_C12_CS_055,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A cart has 2 Banarasi Sarees at ₹4,500 each and 1 Silk Scarf at ₹1,200. A festival discount of 10% is applied to the subtotal, followed by 5% GST. What is the final total in Rupees (rounded to 2 decimal places)?',
    correctAnswer: 9639,
    tolerance: 1,
    unit: '₹',
    explanation: 'Subtotal = (2 × 4500) + 1200 = ₹10,200. After 10% discount: 10,200 × 0.90 = ₹9,180. With 5% GST: 9,180 × 1.05 = ₹9,639.00.',
    hints: [
      'Calculate subtotal: (2 * 4500) + 1200 = 10,200.',
      'Apply 10% discount: 10,200 - 1,020 = 9,180.',
      'Add 5% GST: 9,180 + (9,180 * 0.05) = 9,639.'
    ],
  },
  // 13. c12_cs_056: Hospital Management Foreign Key Cascades (Understanding)
  {
    id: 'ch_cs_013',
    nodeId: NODE_C12_CS_056,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In the Hospital Management System schema (c12_cs_056), what prevents scheduling an appointment with `doctor_id = 999` if Doctor #999 does not exist in the `doctors` table?',
    options: [
      'Java Swing JComboBox validation only.',
      'Foreign Key constraint `FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)` enforced by the RDBMS engine.',
      'Operating System file permission locks.',
      'PreparedStatement type checking.'
    ],
    correctIndex: 1,
    explanation: 'Relational Database Management Systems enforce referential integrity via Foreign Key constraints, rejecting any `INSERT INTO appointments` that references a non-existent `doctor_id`.',
    hints: [
      'Consider which database constraint links parent and child tables.',
      'The database engine checks the foreign key before allowing row insertion.',
      'Foreign Key constraint references the primary key of the doctors table.'
    ],
  },
  // 14. c12_cs_056: Drag-Sort Hospital Booking Flow (Application)
  {
    id: 'ch_cs_014',
    nodeId: NODE_C12_CS_056,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Arrange the sequence of operations executed when a hospital receptionist books a patient appointment in the GUI.',
    sortItems: [
      'Receptionist enters patient ID and selects specialization',
      'GUI executes SELECT query to populate available doctor list',
      'User selects appointment date & time slot',
      'Validate scheduling conflicts (Doctor already booked?)',
      'Execute INSERT into appointments via PreparedStatement'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The workflow starts with selecting specialization to filter doctors, choosing slot, checking for double-booking conflicts, and finally executing the parameterized SQL INSERT.',
    hints: [
      'The doctor list must be populated before a specific slot is chosen.',
      'Always validate scheduling conflicts before writing to the database.',
      'The INSERT statement is the final step in the booking pipeline.'
    ],
  },
  // 15. c12_cs_057: Payroll Polymorphism & Dynamic Dispatch (Analysis)
  {
    id: 'ch_cs_015',
    nodeId: NODE_C12_CS_057,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    question: 'In the Payroll system (c12_cs_057), `Employee` is an abstract class with abstract method `calculateSalary()`. When `Employee e = new CommissionEmployee(20000, 150000, 0.08); e.calculateSalary();` runs, how does the JVM determine which method to execute?',
    options: [
      'Static early binding based on the declared reference type `Employee`.',
      'Dynamic method dispatch at runtime based on the actual instantiated object type `CommissionEmployee`.',
      'A random method selector inside the JVM interpreter.',
      'By converting all employee types into bytecode switch cases.'
    ],
    correctIndex: 1,
    explanation: 'Java achieves runtime polymorphism through Dynamic Method Dispatch. Even though reference `e` is of type `Employee`, the JVM invokes the overridden method in the actual object `CommissionEmployee`.',
    hints: [
      'The method invocation happens at runtime based on the object created with `new`.',
      'This mechanism is called dynamic method dispatch or late binding.',
      'The actual object type `CommissionEmployee` supplies the overridden implementation.'
    ],
    misconceptionIndex: 2,
  },
  // 16. c12_cs_057: Numeric Payroll Calculation with Overtime (Application)
  {
    id: 'ch_cs_016',
    nodeId: NODE_C12_CS_057,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An HourlyEmployee works 52 hours in a month at ₹500/hour. Standard hours are 40; overtime hours above 40 are paid at 1.5× rate. What is the calculated monthly salary in Rupees?',
    correctAnswer: 29000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Regular pay = 40 hours × ₹500 = ₹20,000. Overtime hours = 52 - 40 = 12 hours. Overtime rate = ₹500 × 1.5 = ₹750/hour. Overtime pay = 12 × ₹750 = ₹9,000. Total = 20,000 + 9,000 = ₹29,000.',
    hints: [
      'Calculate regular pay for first 40 hours: 40 * 500 = 20,000.',
      'Calculate 12 overtime hours at 1.5x rate: 12 * 750 = 9,000.',
      'Sum the two components: 20,000 + 9,000 = 29,000.'
    ],
  },
  // 17. c12_cs_058: Weather App JSON Parsing & HTTP Request (Recall)
  {
    id: 'ch_cs_017',
    nodeId: NODE_C12_CS_058,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Given the JSON payload: `{"main":{"temp":28.5,"humidity":65},"weather":[{"main":"Rain"}]}`. In Java, what is the data structure of the "weather" property?',
    options: [
      'A single primitive float value.',
      'A JSON Array containing a JSON Object.',
      'A relational SQL table reference.',
      'A binary socket stream.'
    ],
    correctIndex: 1,
    explanation: 'Square brackets `[...]` denote a JSON Array (e.g., `JSONArray`), which here contains a nested JSON Object `{...}` holding the weather description.',
    hints: [
      'Square brackets `[` and `]` represent an array in JSON notation.',
      'Curly braces `{` and `}` represent an object.',
      'The structure is a JSON Array containing a JSON Object.'
    ],
  },
  // 18. c12_cs_058: Weather App Network Error Resilience (Evaluation)
  {
    id: 'ch_cs_018',
    nodeId: NODE_C12_CS_058,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'When a user enters a non-existent city name into the Weather App, the HTTP API returns Status Code 404. What is the professional Java exception/error handling pattern?',
    options: [
      'Let the program crash with an unhandled NullPointerException.',
      'Inspect `httpConnection.getResponseCode()`, catch `IOException`, and display a helpful `JOptionPane.showMessageDialog("City not found!")` without terminating the GUI.',
      'Retry the same request 10,000 times in an infinite loop.',
      'Overwrite the user input with "Delhi".'
    ],
    correctIndex: 1,
    explanation: 'Production software inspects HTTP response codes (200 OK vs 404 Not Found vs 401 Unauthorized), catches network IOExceptions, and communicates friendly status messages through the UI.',
    hints: [
      'GUI applications should never crash when receiving expected remote HTTP errors.',
      'Check response code and catch IOExceptions in try-catch blocks.',
      'Display a user-friendly dialog message and keep the app interactive.'
    ],
  },
  // 19. c12_cs_059: Task Manager Priority SQL vs Sorting (Analysis)
  {
    id: 'ch_cs_019',
    nodeId: NODE_C12_CS_059,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In the Task Manager project (c12_cs_059), priority levels are "high", "medium", "low". Why does a simple `ORDER BY priority_level ASC` fail to sort tasks by urgency, and how is it fixed?',
    options: [
      'Database tables cannot sort text columns.',
      'Alphabetical order sorts "high" -> "low" -> "medium" (H, L, M). It is fixed using `ORDER BY CASE priority_level WHEN \'high\' THEN 1 WHEN \'medium\' THEN 2 ELSE 3 END`.',
      'The Java GUI overrides all SQL sorting automatically.',
      'Priority must always be stored as binary floating-point numbers.'
    ],
    correctIndex: 1,
    explanation: 'Alphabetical sorting places "low" before "medium" because \'L\' comes before \'M\'. Using an SQL `CASE` statement assigns ordinal integer ranks (1, 2, 3) to achieve correct priority sorting.',
    hints: [
      'Look at alphabetical sorting of strings: H, L, M.',
      '"low" precedes "medium" alphabetically, which violates task urgency rules.',
      'Use a SQL CASE statement to assign 1 for high, 2 for medium, 3 for low.'
    ],
  },
  // 20. c12_cs_059: Task Manager Overdue Date Check (Application)
  {
    id: 'ch_cs_020',
    nodeId: NODE_C12_CS_059,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'In Java, how should the Task Manager determine if a task due on `dueDate` is overdue relative to today?',
    options: [
      'dueDate.toString().length() < 10;',
      'dueDate.isBefore(LocalDate.now()) && !status.equals("completed");',
      'LocalDate.now().plusDays(5).equals(dueDate);',
      'dueDate == LocalDate.now();'
    ],
    correctIndex: 1,
    explanation: 'The modern `java.time.LocalDate.isBefore(LocalDate.now())` method accurately compares calendar dates regardless of formatting, flagging pending tasks as overdue.',
    hints: [
      'Use the `java.time.LocalDate` API methods.',
      'A task is overdue if its due date is before today AND it is not yet completed.',
      'The expression is `dueDate.isBefore(LocalDate.now()) && !status.equals("completed")`.'
    ],
    misconceptionIndex: 0,
  },
  // 21. c12_cs_060: Modularity Coupling vs Cohesion (Analysis)
  {
    id: 'ch_cs_060',
    nodeId: NODE_C12_CS_060,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare two architectural designs: Design A places SQL queries, GUI layout, and business calculations inside a single 2,500-line JFrame class. Design B separates code into `BankFrame` (GUI), `AccountService` (Logic), and `AccountDAO` (Database). How do coupling and cohesion differ?',
    options: [
      'Design A has high cohesion and low coupling.',
      'Design A has low cohesion (does everything) and high coupling; Design B has high cohesion (each class has one clear responsibility) and low coupling.',
      'Both designs have identical software engineering metrics.',
      'Design B violates the Single Responsibility Principle.'
    ],
    correctIndex: 1,
    explanation: 'High cohesion means a class focuses strictly on one purpose (e.g., DAO only manages database persistence). Low coupling means modules interact via narrow interfaces, reducing fragile dependencies.',
    hints: [
      'Cohesion measures focus within a single class.',
      'Coupling measures inter-dependency between separate classes.',
      'Design B achieves high cohesion and low coupling by isolating responsibilities.'
    ],
  },
  // 22. c12_cs_060: SOLID Principles: Open/Closed & Liskov Substitution (Evaluation)
  {
    id: 'ch_cs_060_b',
    nodeId: NODE_C12_CS_060,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'When adding a new `ContractEmployee` to the payroll system without modifying existing `PayrollProcessor` code, which SOLID software engineering principles are satisfied?',
    options: [
      'Waterfall Lifecycle Model and Spiral Prototyping.',
      'Open/Closed Principle (open for extension via new subclasses, closed for modification) and Liskov Substitution Principle (subclass substitutable for Employee superclass).',
      'Database Normalization First Normal Form (1NF).',
      'Multi-tier Cloud Load Balancing.'
    ],
    correctIndex: 1,
    explanation: 'By extending the `Employee` abstract class, `ContractEmployee` extends system capabilities without editing tested processor code (Open/Closed) and can seamlessly replace any `Employee` reference (Liskov Substitution).',
    hints: [
      'Think about extending software without modifying existing tested classes.',
      'Think about substituting a subclass object wherever a parent class is expected.',
      'The principles are Open/Closed Principle (OCP) and Liskov Substitution Principle (LSP).'
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
  nodeId: NODE_C12_CS_051,
  title: 'Java Capstone Projects: Banking System & Software Engineering',
  definition: 'A comprehensive Class 12 ISC capstone integrating Relational Databases (JDBC, PreparedStatements, Transactions), Graphical User Interfaces (Swing/JavaFX), Multithreaded Socket Networking, Object-Oriented Polymorphism, and Software Engineering Principles (Modularity, Coupling, Cohesion, SOLID).',
  eli5: 'Think of a banking computer system like a digital vault with cash registers. We build safe code windows where money moves from one person to another without getting lost in power cuts, protect queries from hackers with safe placeholders, and split big programs into neat, specialist Lego blocks.',
  misconceptions: [
    { misconception: 'Confusing a Java OOP interface with a Graphical User Interface (GUI)', correction: 'In Java, an interface is an abstract contract of methods (like ActionListener); a GUI is the visible window made of Swing/JavaFX components.' },
    { misconception: 'Thinking Statement string concatenation is safe if input is numeric', correction: 'Concatenating raw inputs allows SQL Injection and syntax breaks. PreparedStatement with placeholders (?) compiles SQL safely regardless of data type.' },
    { misconception: 'Treating commit() and rollback() as simple on/off toggle buttons', correction: 'commit() permanently saves all atomic statements in the transaction; rollback() discards every partial change when an error occurs.' },
    { misconception: 'Assuming multithreaded servers work automatically without thread-safe synchronization', correction: 'Shared resources like client socket lists require Collections.synchronizedList() or synchronized blocks to prevent race conditions and crashes.' },
    { misconception: 'Thinking having more classes automatically makes a software design good', correction: 'Modularity requires High Cohesion and Low Coupling. Creating dozens of entangled, interdependent classes degrades system quality.' },
  ],
  diagnosticQuestions: [
    { question: 'What does calling con.setAutoCommit(false) achieve in JDBC?', options: ['Closes the database connection', 'Disables automatic saving so multiple SQL statements can execute as one atomic unit', 'Speeds up CPU clock frequency', 'Converts tables to in-memory arrays'], correctIndex: 1 },
    { question: 'Why is PreparedStatement safer than Statement?', options: ['It uses 64-bit encryption', 'It treats user input strictly as literal parameter data, preventing SQL Injection', 'It bypasses database authentication', 'It does not require JDBC drivers'], correctIndex: 1 },
    { question: 'What role does ServerSocket play in multithreaded networking?', options: ['It renders GUI buttons', 'It listens on a port and returns a Socket when a client connects', 'It balances database tables', 'It replaces TCP with UDP'], correctIndex: 1 },
    { question: 'What is Dynamic Method Dispatch in Java?', options: ['Compiling C++ to bytecode', 'Runtime selection of an overridden method based on the actual object instance', 'Sorting arrays with QuickSort', 'Allocating heap memory without garbage collection'], correctIndex: 1 },
    { question: 'In software engineering, what is High Cohesion?', options: ['A class that depends on 20 other packages', 'A class where all methods and fields focus on a single, well-defined responsibility', 'A database with no primary keys', 'A program with zero comments'], correctIndex: 1 },
    { question: 'What is Low Coupling?', options: ['Minimal dependency between different modules or classes', 'Slow internet connection speed', 'Loose electrical cables', 'Single-threaded execution'], correctIndex: 0 },
    { question: 'What does the Single Responsibility Principle state?', options: ['A class should have only one reason to change', 'Every program must have only one developer', 'Methods can take only one parameter', 'Databases can hold only one table'], correctIndex: 0 },
    { question: 'How does SQL ORDER BY CASE help task manager priority sorting?', options: ['It converts dates to strings', 'It maps non-alphabetical priorities (high, medium, low) to ordered integer ranks', 'It deletes completed tasks', 'It enables multi-core processing'], correctIndex: 1 },
  ],
  masteryCriteria: 'Demonstrate full mastery of Class 12 capstone competencies: JDBC transaction atomicity, SQL injection defense, multithreaded sockets, OOP polymorphism, and SOLID software engineering principles.',
};

// ─── MAIN COMPONENT ───
function C12_ComputerScienceJavaProjectBankingSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_CS_051,
  title = DEFAULT_PROPS.title || 'Java Capstone Projects Simulation',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['compsci'] || { name: 'Computer Science', emoji: '💻', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant.org Pedagogical State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Prediction and Observation State
  const [predictionIndex, setPredictionIndex] = useState(0);
  const [predictionSelected, setPredictionSelected] = useState<number | null>(null);
  const [predictionSubmitted, setPredictionSubmitted] = useState(false);
  const [observationIndex, setObservationIndex] = useState(0);
  const [observationSelected, setObservationSelected] = useState<number | null>(null);
  const [observationSubmitted, setObservationSubmitted] = useState(false);

  // Interactive Live Banking Simulation State
  const [autoCommitEnabled, setAutoCommitEnabled] = useState(false);
  const [senderBalance, setSenderBalance] = useState(50000);
  const [receiverBalance, setReceiverBalance] = useState(12000);
  const [transferAmount] = useState(15000);
  const [serverCrashSimulated, setServerCrashSimulated] = useState(false);
  const [transferStatus, setTransferStatus] = useState<'idle' | 'debited' | 'committed' | 'rolled_back' | 'corrupted'>('idle');
  const [transactionLogs, setTransactionLogs] = useState<string[]>([
    'DB: Connection established with jdbc:mysql://localhost:3306/apex_bank',
    'DB: Schema verified: accounts (account_number PK, balance)',
    'DB: Schema verified: transactions (tx_id PK, account_number FK)'
  ]);

  // Interactive Security Shield State (PreparedStatement vs SQL Injection)
  const [injectionPayload, setInjectionPayload] = useState("1001' OR '1'='1");
  const [queryMode, setQueryMode] = useState<'statement' | 'prepared'>('prepared');

  // Multithreaded Sockets State
  const [activeSocketClients, setActiveSocketClients] = useState<{ id: number; status: string; thread: string }[]>([
    { id: 101, status: 'Connected', thread: 'Worker-Thread-1' },
    { id: 102, status: 'Connected', thread: 'Worker-Thread-2' }
  ]);
  const [serverPort] = useState(5000);

  // OOP Polymorphism Lab State
  const [selectedEmpType, setSelectedEmpType] = useState<'salaried' | 'hourly' | 'commission'>('salaried');
  const [empSalaryResult, setEmpSalaryResult] = useState<number>(75000);

  // Software Engineering Matrix State
  const [couplingLevel, setCouplingLevel] = useState(20);
  const [cohesionLevel, setCohesionLevel] = useState(85);

  // Challenge & Evaluation State
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

  // Drag-and-drop & Construction State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Feedback & Animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter challenges by adaptive difficulty tier
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ───
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

  // ─── 2D CANVAS ANIMATION (Transaction Packet & Thread Loop) ───
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

      // Background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw Socket Pipeline
      ctx.fillStyle = '#38bdf8';
      ctx.font = '11px monospace';
      ctx.fillText(`[PORT ${serverPort}] JDBC Socket Stream Engine`, 12, 18);

      // Animated packet dots
      const packetX = (frame * 2.5) % (canvas.width - 60) + 30;
      ctx.beginPath();
      ctx.arc(packetX, 28, 6, 0, Math.PI * 2);
      ctx.fillStyle = autoCommitEnabled ? '#ef4444' : '#22c55e';
      ctx.shadowColor = autoCommitEnabled ? '#ef4444' : '#22c55e';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Status indicator text
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(
        autoCommitEnabled ? 'MODE: AutoCommit=true [DANGEROUS]' : 'MODE: Transaction Block [ATOMIC]',
        canvas.width - 230,
        18
      );

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [serverPort, autoCommitEnabled]);

  // ─── USECALLBACK HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Brilliant analysis! You recognized the atomicity hazard.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab. Manipulate the live banking pipeline.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with transaction crashes, injections, and socket threads.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Beginning board level challenges. Apply your capstone knowledge.');
  }, []);

  const handleExecuteTransfer = useCallback(() => {
    audioManager.play('pickup');
    setTransferStatus('debited');
    setSenderBalance(prev => prev - transferAmount);

    setTransactionLogs(prev => [
      `JDBC: con.setAutoCommit(${autoCommitEnabled})`,
      `SQL: UPDATE accounts SET balance = balance - ${transferAmount} WHERE acc_no = 1001`,
      ...prev.slice(0, 4)
    ]);

    setTimeout(() => {
      if (serverCrashSimulated) {
        audioManager.play('drop-wrong');
        if (autoCommitEnabled) {
          setTransferStatus('corrupted');
          setTransactionLogs(prev => [
            'CRASH: Server connection died unexpectedly!',
            'FATAL: AutoCommit was TRUE. Debit was permanently saved. Credit never ran. Data corrupted!',
            ...prev
          ]);
        } else {
          setTransferStatus('rolled_back');
          setSenderBalance(prev => prev + transferAmount); // rollback
          setTransactionLogs(prev => [
            'CRASH: Server connection died. Catch block invoked!',
            'ROLLBACK: con.rollback() successfully restored sender balance to original state.',
            ...prev
          ]);
        }
      } else {
        audioManager.play('drop-correct');
        setReceiverBalance(prev => prev + transferAmount);
        setTransferStatus('committed');
        setTransactionLogs(prev => [
          `SQL: UPDATE accounts SET balance = balance + ${transferAmount} WHERE acc_no = 1002`,
          `SQL: INSERT INTO transactions VALUES (UUID(), 1001, 'transfer', ${transferAmount})`,
          autoCommitEnabled ? 'AUTO-COMMITTED per statement.' : 'TX COMMIT: con.commit() completed atomically.',
          ...prev
        ]);
      }
    }, 900);
  }, [autoCommitEnabled, transferAmount, serverCrashSimulated]);

  const handleResetBank = useCallback(() => {
    setSenderBalance(50000);
    setReceiverBalance(12000);
    setTransferStatus('idle');
    audioManager.play('pop');
  }, []);

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
    }
  }, [hintCount, challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_CAPSTONE_NODES, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Capstone simulation complete! Excellent mastery of Java architectural concepts.');
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleAnswer = useCallback((ans: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = ans === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const num = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = ans === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Verified by JDBC architecture rules.');
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
        speechManager.speak('Let us inspect the complete architectural solution.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('tap');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length === (challenge.sortItems?.length || 0) ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const ans = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(ans);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleSpawnClient = useCallback(() => {
    audioManager.play('chime');
    setActiveSocketClients(prev => [
      ...prev,
      {
        id: 100 + prev.length + 1,
        status: 'Connected',
        thread: `Worker-Thread-${prev.length + 1}`
      }
    ]);
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Chart data for Grade Analytics Lab (Node c12_cs_053)
  const gradeDistributionData = useMemo(() => [
    { subject: 'English', avg: 78.5, max: 98, min: 45 },
    { subject: 'Mathematics', avg: 86.2, max: 100, min: 52 },
    { subject: 'Comp. Science', avg: 92.4, max: 100, min: 68 },
    { subject: 'Physics', avg: 74.0, max: 96, min: 40 },
    { subject: 'Chemistry', avg: 81.6, max: 95, min: 48 },
  ], []);

  // Motivational feedback helper
  const getMotivationalMessage = (errCount: number) => {
    if (errCount === 0) return 'PERFECT SCORE! Flawless mastery of all Java capstone architectures and database systems!';
    if (errCount <= 3) return 'Great work! You demonstrated strong architectural thinking and code mastery.';
    if (errCount <= 7) return 'Good effort! Review the database consistency and SQL injection mechanics to solidify your skills.';
    return 'Do not give up — You WILL get this! Practice tracing the JDBC connection lifecycle and dynamic dispatch.';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      
      {/* ─── HEADER / NAVIGATION BAR ─── */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="w-12 h-12 rounded-2xl bg-gold-600/20 border border-gold-500/40 flex items-center justify-center text-2xl"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wider text-gold-400 uppercase bg-gold-950/60 px-2 py-0.5 rounded border border-gold-800/60">
                ISC Class 12 Computer Science
              </span>
              <span className="text-xs text-slate-400">Capstone 10-Node Sim</span>
            </div>
            <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Dynamic Phase Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <motion.button
              key={p}
              aria-label={`Switch to ${p} phase`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'challenge') setPhase('challenge');
                else if (p === 'explore') setPhase('explore');
                else if (p === 'sandbox') setPhase('sandbox');
                else if (p === 'discovery') setPhase('discovery');
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all ${
                phase === p 
                  ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
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
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Narrative Scenario Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-900 border border-gold-800/60 shadow-xl">
              <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold mb-2">
                <span>🏛️</span> {SCENARIO.title}
              </div>
              <p className="text-sm md:text-base text-slate-200 leading-relaxed">{SCENARIO.intro}</p>
              <div className="mt-3 p-3 bg-slate-950/60 rounded-xl border border-gold-900/40 text-xs text-slate-300 font-mono">
                {SCENARIO.context}
              </div>
            </div>

            {/* Discovery Question Card */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                Curiosity Diagnostic Hook (Ungraded)
              </div>
              <h2 className="text-base md:text-lg font-bold text-white mb-4">
                {DISCOVERY_QUESTION.question}
              </h2>

              <div className="space-y-2.5">
                {DISCOVERY_QUESTION.options.map((option, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${option}`}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold'
                        : discoveryAnswered && !discoveryCorrect && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-700/60 flex items-center justify-center text-xs text-slate-300">
                        {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓' : String.fromCharCode(65 + i)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="mt-5 p-4 bg-gold-950/40 rounded-xl border border-gold-800/60 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <p className={`text-xs md:text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                    {discoveryCorrect 
                      ? '✓ Exactly right! Without transactional boundary wrappers, uncommitted updates corrupt financial state.' 
                      : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    aria-label="Enter Interactive Labs"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="whitespace-nowrap px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs md:text-sm font-bold shadow-lg shadow-gold-600/30"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: GUIDED EXPLORATION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Canvas Animated Stream */}
            <canvas ref={canvasRef} width={800} height={40} className="w-full rounded-xl bg-slate-900 border border-slate-800" />

            {/* PREDICTION-BEFORE-ACTION SECTION (Brilliant.org Predict-then-Check Pattern) */}
            <div className="p-5 bg-gradient-to-r from-amber-950/30 via-slate-900 to-gold-950/30 rounded-2xl border border-amber-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🎯</span> Step Prediction #{predictionIndex + 1} of {PREDICTION_QUESTIONS.length}
                </span>
                <span className="text-xs text-slate-400">Predict then interact below to verify</span>
              </div>
              <h3 className="text-sm md:text-base font-bold text-white">
                {PREDICTION_QUESTIONS[predictionIndex].question}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PREDICTION_QUESTIONS[predictionIndex].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPredictionSelected(idx);
                      setPredictionSubmitted(true);
                      audioManager.play(idx === PREDICTION_QUESTIONS[predictionIndex].correctIndex ? 'success' : 'pop');
                    }}
                    className={`text-left p-3 rounded-xl border text-xs transition-all ${
                      predictionSubmitted && idx === PREDICTION_QUESTIONS[predictionIndex].correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold'
                        : predictionSubmitted && predictionSelected === idx && idx !== PREDICTION_QUESTIONS[predictionIndex].correctIndex
                        ? 'bg-rose-950/40 border-rose-500 text-rose-300'
                        : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
              {predictionSubmitted && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="text-amber-300">
                    <strong>Verification Instruction:</strong> {PREDICTION_QUESTIONS[predictionIndex].verifyInstruction}
                  </div>
                  <div className="text-slate-300">
                    <strong>Explanation:</strong> {PREDICTION_QUESTIONS[predictionIndex].explanation}
                  </div>
                  {predictionIndex < PREDICTION_QUESTIONS.length - 1 && (
                    <button
                      onClick={() => {
                        setPredictionIndex(p => p + 1);
                        setPredictionSelected(null);
                        setPredictionSubmitted(false);
                      }}
                      className="mt-2 px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold"
                    >
                      Next Prediction Question →
                    </button>
                  )}
                </motion.div>
              )}
            </div>

            {/* Step Navigation Bar */}
            <div className="flex items-center justify-between bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gold-400 bg-gold-950 px-2.5 py-1 rounded-lg border border-gold-800">
                  Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>
              <div className="flex gap-2">
                <motion.button
                  aria-label="Previous step"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold disabled:opacity-40"
                >
                  ← Previous
                </motion.button>
                <motion.button
                  aria-label="Next step"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (currentSlide < EXPLORATION_STEPS.length - 1) setCurrentSlide(s => s + 1);
                    else handleAdvanceToSandbox();
                  }}
                  className="px-4 py-1.5 bg-gold-600 hover:bg-gold-500 text-white rounded-lg text-xs font-bold"
                >
                  {currentSlide === EXPLORATION_STEPS.length - 1 ? 'Go to Free Sandbox →' : 'Next Lab →'}
                </motion.button>
              </div>
            </div>

            {/* Visual Interactive Workbench based on slide index */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6">
              <div>
                <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                  <span>🔬</span> {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-xs md:text-sm text-gold-300 mt-1">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* SLIDE 0: Banking Atomicity & Crash Lab with Topic SVG 1 */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {/* TOPIC SVG DIAGRAM 1: ACID Transaction & Rollback Flow */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-xs font-mono text-gold-400 mb-2 self-start">Architecture Flow: ACID Transaction Boundary</span>
                    <svg viewBox="0 0 700 130" className="w-full max-w-2xl h-auto" role="img" aria-label="JDBC ACID Transaction Lifecycle Diagram">
                      <rect x="10" y="25" width="130" height="80" rx="8" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
                      <text x="75" y="55" fill="#e2e8f0" fontSize="11" textAnchor="middle" fontWeight="bold">Client App</text>
                      <text x="75" y="75" fill="#94a3b8" fontSize="9" textAnchor="middle">setAutoCommit(false)</text>

                      {/* Arrow 1 */}
                      <line x1="140" y1="65" x2="190" y2="65" stroke="#6366f1" strokeWidth="2" />
                      <polygon points="190,65 182,60 182,70" fill="#6366f1" />

                      {/* Step 1 Box */}
                      <rect x="195" y="25" width="130" height="80" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                      <text x="260" y="55" fill="#e2e8f0" fontSize="11" textAnchor="middle" fontWeight="bold">Step 1: Debit</text>
                      <text x="260" y="75" fill="#38bdf8" fontSize="9" textAnchor="middle">UPDATE Acc 1001</text>

                      {/* Arrow 2 */}
                      <line x1="325" y1="65" x2="375" y2="65" stroke="#38bdf8" strokeWidth="2" />
                      <polygon points="375,65 367,60 367,70" fill="#38bdf8" />

                      {/* Step 2 Box */}
                      <rect x="380" y="25" width="130" height="80" rx="8" fill="#1e293b" stroke={serverCrashSimulated ? "#f43f5e" : "#22c55e"} strokeWidth="2" />
                      <text x="445" y="55" fill="#e2e8f0" fontSize="11" textAnchor="middle" fontWeight="bold">
                        {serverCrashSimulated ? "💥 Exception!" : "Step 2: Credit"}
                      </text>
                      <text x="445" y="75" fill={serverCrashSimulated ? "#f43f5e" : "#22c55e"} fontSize="9" textAnchor="middle">
                        {serverCrashSimulated ? "Server Crash" : "UPDATE Acc 1002"}
                      </text>

                      {/* Arrow 3 */}
                      <line x1="510" y1="65" x2="555" y2="65" stroke={serverCrashSimulated ? "#f43f5e" : "#22c55e"} strokeWidth="2" />
                      <polygon points="555,65 547,60 547,70" fill={serverCrashSimulated ? "#f43f5e" : "#22c55e"} />

                      {/* Decision Box */}
                      <rect x="560" y="25" width="130" height="80" rx="8" fill="#0f172a" stroke={serverCrashSimulated ? (autoCommitEnabled ? "#f43f5e" : "#fbbf24") : "#22c55e"} strokeWidth="2" />
                      <text x="625" y="55" fill="#e2e8f0" fontSize="11" textAnchor="middle" fontWeight="bold">
                        {serverCrashSimulated ? (autoCommitEnabled ? "✗ Corrupted" : "✓ Rollback") : "✓ Commit"}
                      </text>
                      <text x="625" y="75" fill={serverCrashSimulated ? (autoCommitEnabled ? "#f43f5e" : "#fbbf24") : "#22c55e"} fontSize="9" textAnchor="middle">
                        {serverCrashSimulated ? (autoCommitEnabled ? "Partial save" : "con.rollback()") : "con.commit()"}
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Account 1001 (Sender) */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden">
                      <div className="text-xs font-mono text-slate-400">TABLE accounts (Account 1001)</div>
                      <div className="text-xl font-black text-white mt-1">₹{senderBalance.toLocaleString('en-IN')}</div>
                      <div className="text-xs text-slate-400 mt-0.5">Primary Key: 1001 | Customer: Priya Sharma</div>
                      {transferStatus === 'debited' && (
                        <div className="mt-2 text-xs text-amber-400 font-mono animate-pulse">
                          -₹{transferAmount.toLocaleString('en-IN')} pending commit...
                        </div>
                      )}
                    </div>

                    {/* Account 1002 (Receiver) */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-xs font-mono text-slate-400">TABLE accounts (Account 1002)</div>
                      <div className="text-xl font-black text-emerald-400 mt-1">₹{receiverBalance.toLocaleString('en-IN')}</div>
                      <div className="text-xs text-slate-400 mt-0.5">Primary Key: 1002 | Customer: Rahul Verma</div>
                      {transferStatus === 'committed' && (
                        <div className="mt-2 text-xs text-emerald-400 font-mono">
                          ✓ +₹{transferAmount.toLocaleString('en-IN')} committed!
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Transaction Controls */}
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                      {/* AutoCommit Toggle */}
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                        <input
                          type="checkbox"
                          aria-label="Toggle autoCommit mode"
                          checked={autoCommitEnabled}
                          onChange={(e) => setAutoCommitEnabled(e.target.checked)}
                          className="w-4 h-4 rounded text-gold-600 bg-slate-900 border-slate-700"
                        />
                        <span className={autoCommitEnabled ? 'text-rose-400 font-mono' : 'text-emerald-400 font-mono'}>
                          autoCommit = {autoCommitEnabled ? '✗ TRUE (Dangerous)' : '✓ FALSE (Safe Atomic)'}
                        </span>
                      </label>

                      {/* Server Crash Injector */}
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                        <input
                          type="checkbox"
                          aria-label="Inject server crash mid transfer"
                          checked={serverCrashSimulated}
                          onChange={(e) => setServerCrashSimulated(e.target.checked)}
                          className="w-4 h-4 rounded text-rose-600 bg-slate-900 border-slate-700"
                        />
                        <span className="text-rose-300 font-mono">
                          💥 Inject Crash Mid-Transfer
                        </span>
                      </label>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        aria-label={`Execute ${transferAmount} Rupees Transfer`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleExecuteTransfer}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow"
                      >
                        Execute ₹{transferAmount} Transfer
                      </motion.button>
                      <motion.button
                        aria-label="Reset Bank Ledger"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleResetBank}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold"
                      >
                        Reset Ledger
                      </motion.button>
                    </div>
                  </div>

                  {/* Live Transaction Console */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                    <div className="text-slate-500">// Live JDBC Event Log:</div>
                    {transactionLogs.map((log, idx) => (
                      <div key={idx} className={log.includes('FATAL') || log.includes('CRASH') ? 'text-rose-400 font-bold' : log.includes('COMMIT') || log.includes('ROLLBACK') ? 'text-emerald-300' : 'text-slate-300'}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 1: PreparedStatement & Injection Shield with Topic SVG 2 */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* TOPIC SVG DIAGRAM 2: PreparedStatement Parameter Shield */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-xs font-mono text-gold-400 mb-2 self-start">Architecture Flow: SQL Injection Shielding</span>
                    <svg viewBox="0 0 700 120" className="w-full max-w-2xl h-auto" role="img" aria-label="PreparedStatement vs Raw Statement Execution Diagram">
                      {/* Input */}
                      <rect x="10" y="20" width="140" height="75" rx="8" fill="#1e293b" stroke="#eab308" strokeWidth="2" />
                      <text x="80" y="48" fill="#fef08a" fontSize="10" textAnchor="middle" fontWeight="bold">Raw User Input</text>
                      <text x="80" y="68" fill="#94a3b8" fontSize="8" textAnchor="middle">1001' OR '1'='1</text>

                      {/* Arrow to Shield */}
                      <line x1="150" y1="57" x2="200" y2="57" stroke="#94a3b8" strokeWidth="2" />
                      <polygon points="200,57 192,52 192,62" fill="#94a3b8" />

                      {/* Shield Engine */}
                      <rect x="205" y="20" width="220" height="75" rx="8" fill="#0f172a" stroke={queryMode === 'prepared' ? "#22c55e" : "#f43f5e"} strokeWidth="2" />
                      <text x="315" y="48" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontWeight="bold">
                        {queryMode === 'prepared' ? '✓ PreparedStatement Engine' : '✗ Raw Statement Concatenator'}
                      </text>
                      <text x="315" y="68" fill={queryMode === 'prepared' ? '#4ade80' : '#f87171'} fontSize="8" textAnchor="middle">
                        {queryMode === 'prepared' ? 'Pre-compiled AST + Literal Value Binding' : 'Dynamic SQL String Interpolation'}
                      </text>

                      {/* Arrow to DB */}
                      <line x1="425" y1="57" x2="475" y2="57" stroke={queryMode === 'prepared' ? "#22c55e" : "#f43f5e"} strokeWidth="2" />
                      <polygon points="475,57 467,52 467,62" fill={queryMode === 'prepared' ? "#22c55e" : "#f43f5e"} />

                      {/* Database Engine */}
                      <rect x="480" y="20" width="210" height="75" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                      <text x="585" y="48" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontWeight="bold">RDBMS Execution Engine</text>
                      <text x="585" y="68" fill={queryMode === 'prepared' ? '#38bdf8' : '#f43f5e'} fontSize="8" textAnchor="middle">
                        {queryMode === 'prepared' ? '✓ Safe literal query lookup' : '✗ Injection attack succeeds'}
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-xs text-slate-400 font-mono mb-2">Simulate User Input in Account Search:</div>
                      <input
                        type="text"
                        aria-label="SQL Injection payload input"
                        value={injectionPayload}
                        onChange={(e) => setInjectionPayload(e.target.value)}
                        className="w-full p-2.5 bg-slate-900 rounded-lg border border-slate-700 text-xs font-mono text-amber-300 focus:outline-none focus:border-gold-500"
                      />
                      <div className="flex gap-2 mt-3">
                        <button
                          aria-label="Set payload 1"
                          onClick={() => setInjectionPayload("1001' OR '1'='1")}
                          className="px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-300 hover:bg-slate-700"
                        >
                          Payload 1: 1001' OR '1'='1
                        </button>
                        <button
                          aria-label="Set payload 2"
                          onClick={() => setInjectionPayload("1001; DROP TABLE accounts;--")}
                          className="px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-300 hover:bg-slate-700"
                        >
                          Payload 2: DROP TABLE
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="text-xs text-slate-400 font-mono mb-1">Execution Mode:</div>
                        <div className="flex gap-2">
                          <button
                            aria-label="Switch to PreparedStatement mode"
                            onClick={() => setQueryMode('prepared')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                              queryMode === 'prepared' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            ✓ PreparedStatement (Shielded)
                          </button>
                          <button
                            aria-label="Switch to raw statement mode"
                            onClick={() => setQueryMode('statement')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                              queryMode === 'statement' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            ✗ Statement Concatenation
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 p-3 bg-slate-900 rounded-lg text-xs font-mono">
                        <div className="text-slate-500">// Compiled SQL Received by DBMS:</div>
                        {queryMode === 'prepared' ? (
                          <div className="text-emerald-400 mt-1">
                            SELECT * FROM accounts WHERE acc_no = <span className="text-amber-300">"{injectionPayload}"</span>
                            <div className="text-[10px] text-emerald-500 mt-1">✓ Input bound safely as literal parameter. Zero injection possible.</div>
                          </div>
                        ) : (
                          <div className="text-rose-400 mt-1">
                            SELECT * FROM accounts WHERE acc_no = '{injectionPayload}'
                            <div className="text-[10px] text-rose-400 mt-1">✗ VULNERABLE: Logic altered by injection!</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: Multithreaded Sockets (c12_cs_054) with Topic SVG 3 */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* TOPIC SVG DIAGRAM 3: Multithreaded Socket Server Model */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-xs font-mono text-gold-400 mb-2 self-start">Architecture Flow: Multithreaded Socket Worker Dispatch</span>
                    <svg viewBox="0 0 700 130" className="w-full max-w-2xl h-auto" role="img" aria-label="Multithreaded ServerSocket and Worker Threads Diagram">
                      {/* Port Listening Box */}
                      <rect x="10" y="30" width="160" height="70" rx="8" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
                      <text x="90" y="58" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontWeight="bold">ServerSocket(5000)</text>
                      <text x="90" y="78" fill="#a5b4fc" fontSize="8" textAnchor="middle">while(true) accept()</text>

                      {/* Dispatch lines */}
                      <path d="M 170 65 Q 230 35 270 35" stroke="#38bdf8" strokeWidth="2" fill="none" />
                      <path d="M 170 65 L 270 65" stroke="#38bdf8" strokeWidth="2" fill="none" />
                      <path d="M 170 65 Q 230 95 270 95" stroke="#38bdf8" strokeWidth="2" fill="none" />

                      {/* Worker Threads */}
                      <rect x="275" y="15" width="180" height="32" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="365" y="35" fill="#38bdf8" fontSize="9" textAnchor="middle">Worker Thread 1 (Client #101)</text>

                      <rect x="275" y="50" width="180" height="32" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="365" y="70" fill="#38bdf8" fontSize="9" textAnchor="middle">Worker Thread 2 (Client #102)</text>

                      <rect x="275" y="85" width="180" height="32" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="365" y="105" fill="#38bdf8" fontSize="9" textAnchor="middle">Worker Thread N (New Sockets)</text>

                      {/* Shared Resource */}
                      <rect x="495" y="25" width="195" height="80" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
                      <text x="592" y="55" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontWeight="bold">Shared Broadcast Bus</text>
                      <text x="592" y="75" fill="#4ade80" fontSize="8" textAnchor="middle">synchronized(clients) broadcast()</text>
                    </svg>
                  </div>

                  <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-xs font-mono text-slate-300">
                      ServerSocket(5000) listening | Active Threads: {activeSocketClients.length}
                    </div>
                    <motion.button
                      aria-label="Connect new socket client"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSpawnClient}
                      className="px-3 py-1.5 bg-gold-600 text-white rounded-lg text-xs font-bold"
                    >
                      + Connect New Client
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {activeSocketClients.map((client) => (
                      <motion.div
                        key={client.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="p-3 bg-slate-950 rounded-xl border border-gold-900/50 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-gold-400">Client #{client.id}</span>
                          <span className="text-emerald-400 text-[10px] bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                            ✓ {client.status}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-slate-400 mt-2">
                          Thread: <span className="text-slate-200">{client.thread}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1">
                          Pipe: BufferedReader ↔ PrintWriter
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 3: OOP Polymorphism Lab (c12_cs_057) */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(['salaried', 'hourly', 'commission'] as const).map((type) => (
                      <button
                        key={type}
                        aria-label={`Select ${type} employee instance`}
                        onClick={() => {
                          setSelectedEmpType(type);
                          if (type === 'salaried') setEmpSalaryResult(75000);
                          else if (type === 'hourly') setEmpSalaryResult(400 * 120);
                          else setEmpSalaryResult(20000 + 0.05 * 200000);
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                          selectedEmpType === type ? 'bg-gold-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
                        }`}
                      >
                        {type}Employee Instance
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-2">
                    <div className="text-gold-400 font-bold">// Polymorphic Reference Call:</div>
                    <div className="text-slate-300">
                      Employee emp = new {selectedEmpType.charAt(0).toUpperCase() + selectedEmpType.slice(1)}Employee(...);
                    </div>
                    <div className="text-emerald-400">
                      double salary = emp.calculateSalary(); // Dynamic Method Dispatch at Runtime
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg text-white font-bold text-sm">
                      ✓ Calculated Compensation: ₹{empSalaryResult.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: Modularity, Coupling & Cohesion (c12_cs_060) */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-semibold">Inter-Module Coupling:</span>
                        <span className="text-amber-400 font-mono">{couplingLevel}%</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Adjust inter module coupling percentage"
                        min={0}
                        max={100}
                        value={couplingLevel}
                        onChange={(e) => setCouplingLevel(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                      <p className="text-[11px] text-slate-400">
                        {couplingLevel < 35 ? '✓ Low Coupling: Modules interact cleanly via narrow interfaces.' : '✗ High Coupling: Dangerous interdependencies!'}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-semibold">Class Cohesion:</span>
                        <span className="text-emerald-400 font-mono">{cohesionLevel}%</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Adjust class cohesion percentage"
                        min={0}
                        max={100}
                        value={cohesionLevel}
                        onChange={(e) => setCohesionLevel(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                      <p className="text-[11px] text-slate-400">
                        {cohesionLevel > 70 ? '✓ High Cohesion: Each class has a single, focused responsibility.' : '✗ Low Cohesion: Monolithic god-class anti-pattern.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* OBSERVATION QUESTIONS (Brilliant.org 'What do you notice?' Pattern) */}
            <div className="p-5 bg-gradient-to-r from-gold-950/40 via-slate-900 to-gold-950/40 rounded-2xl border border-gold-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>👀</span> Observation Check #{observationIndex + 1} of {OBSERVATION_QUESTIONS.length}
                </span>
                <span className="text-xs text-slate-400">Reflect on what you noticed in the simulation</span>
              </div>
              <h3 className="text-sm md:text-base font-bold text-white">
                {OBSERVATION_QUESTIONS[observationIndex].question}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(OBSERVATION_QUESTIONS[observationIndex].observableOptions || OBSERVATION_QUESTIONS[observationIndex].options || []).map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setObservationSelected(idx);
                      setObservationSubmitted(true);
                      audioManager.play(idx === OBSERVATION_QUESTIONS[observationIndex].correctIndex ? 'success' : 'pop');
                    }}
                    className={`text-left p-3 rounded-xl border text-xs transition-all ${
                      observationSubmitted && idx === OBSERVATION_QUESTIONS[observationIndex].correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold'
                        : observationSubmitted && observationSelected === idx && idx !== OBSERVATION_QUESTIONS[observationIndex].correctIndex
                        ? 'bg-rose-950/40 border-rose-500 text-rose-300'
                        : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
              {observationSubmitted && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="text-gold-300">
                    <strong>Notice:</strong> {OBSERVATION_QUESTIONS[observationIndex].explanation}
                  </div>
                  {observationIndex < OBSERVATION_QUESTIONS.length - 1 && (
                    <button
                      onClick={() => {
                        setObservationIndex(o => o + 1);
                        setObservationSelected(null);
                        setObservationSubmitted(false);
                      }}
                      className="mt-2 px-3 py-1 bg-gold-600 hover:bg-gold-500 text-white rounded-lg text-xs font-semibold"
                    >
                      Next Observation Question →
                    </button>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="p-5 bg-gradient-to-r from-slate-900 to-gold-950/60 rounded-2xl border border-gold-800/40 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                  <span>🛠️</span> Capstone Architectural Sandbox
                </h2>
                <p className="text-xs md:text-sm text-slate-300 mt-1">
                  Freely test transaction crashes, socket workloads, and student statistical charts without evaluation pressure.
                </p>
              </div>
              <motion.button
                aria-label="Proceed to board challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="whitespace-nowrap px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs md:text-sm font-bold shadow-lg shadow-emerald-600/30"
              >
                Ready for Board Challenges →
              </motion.button>
            </div>

            {/* Recharts Grade Analytics Visualization (c12_cs_053) */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Student Grade Distribution Analytics (c12_cs_053)</h3>
                  <p className="text-xs text-slate-400">Live SQL aggregate view: AVG(marks), MAX(marks), MIN(marks)</p>
                </div>
                <span className="text-xs font-mono text-gold-400 bg-gold-950 px-2 py-1 rounded border border-gold-800">
                  JavaFX / Recharts Sync
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gradeDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                      itemStyle={{ color: '#38bdf8' }}
                    />
                    <Bar dataKey="avg" fill="#6366f1" radius={[6, 6, 0, 0]}>
                      {gradeDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 2 ? '#22c55e' : '#6366f1'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: CHALLENGE SUITE (Adaptive & NEP 2020 Aligned) ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Challenge Progress Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white bg-gold-600 px-3 py-1 rounded-lg">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded border ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      : difficulty === 'standard'
                      ? 'bg-gold-950 text-gold-400 border-gold-800'
                      : 'bg-purple-950 text-purple-400 border-purple-800'
                  }`}
                >
                  {difficulty}
                </motion.span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>NEP Level:</span>
                <span className="text-gold-400 font-semibold uppercase">{challenge.competencyLevel}</span>
              </div>
            </div>

            {/* Animated Progress Bar */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Challenge Card */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={wrongShake ? { duration: 0.4 } : {}}
              className={`p-6 rounded-2xl border transition-all ${
                wrongFlash
                  ? 'bg-rose-950/40 border-rose-500'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="text-xs font-mono text-gold-400 mb-2">
                Node Focus: {challenge.nodeId}
              </div>
              <h2 className="text-base md:text-lg font-bold text-white mb-5 leading-relaxed">
                {challenge.question}
              </h2>

              {/* 1. MCQ Variant (Classify, Distinguish, Match) */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`w-full text-left p-4 rounded-xl border text-xs md:text-sm transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-700/80 flex items-center justify-center text-xs text-slate-300 shrink-0">
                          {showExplanation && i === challenge.correctIndex ? '✓' : String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* 2. Drag-Label Variant */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 self-center mr-2">Drag Labels:</span>
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        role="button"
                        tabIndex={0}
                        aria-label={`Draggable label: ${item.label}`}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-gold-600 hover:bg-gold-500 text-white rounded-lg text-xs font-semibold cursor-grab active:cursor-grabbing shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {challenge.dragItems.map((item) => (
                      <div
                        key={item.targetId}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(item.targetId)}
                        className={`p-4 rounded-xl border-2 border-dashed flex flex-col justify-between min-h-[90px] transition-colors ${
                          droppedLabels[item.targetId]
                            ? 'bg-gold-950/40 border-gold-500'
                            : 'bg-slate-950 border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                          Target: {item.targetId.replace('_', ' ')}
                        </span>
                        <div className="text-xs font-bold text-white mt-1">
                          {droppedLabels[item.targetId] ? (
                            <span className="text-emerald-400">✓ {droppedLabels[item.targetId]}</span>
                          ) : (
                            <span className="text-slate-600">Drop matching label here</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Validate architectural mapping"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Validate Architectural Mapping
                  </motion.button>
                </div>
              )}

              {/* 3. Drag-Sort Variant */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    {(sortArrangement.length === challenge.sortItems.length
                      ? sortArrangement.map((idx) => challenge.sortItems![idx])
                      : challenge.sortItems
                    ).map((item, index) => (
                      <motion.div
                        key={index}
                        role="button"
                        tabIndex={0}
                        aria-label={`Sortable item ${index + 1}: ${item}`}
                        draggable
                        onDragStart={() => setDraggedItem(String(index))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const from = parseInt(draggedItem || '0');
                          handleSortMove(from, index);
                        }}
                        whileHover={{ scale: 1.01 }}
                        className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs md:text-sm text-slate-200 cursor-grab flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </span>
                          <span>{item}</span>
                        </div>
                        <span className="text-slate-500 text-xs">↕ Drag to reorder</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Check sort pipeline order"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Check Pipeline Order
                  </motion.button>
                </div>
              )}

              {/* 4. Numeric Input Variant */}
              {challenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      aria-label="Numerical answer input"
                      step="any"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter numerical answer"
                      className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-gold-500"
                    />
                    <span className="text-slate-400 text-sm font-semibold">{challenge.unit}</span>
                    <motion.button
                      aria-label="Submit calculation answer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      className="px-6 py-3 bg-gold-600 text-white rounded-xl text-xs font-bold shadow"
                    >
                      Submit Calculation
                    </motion.button>
                  </div>
                </div>
              )}

              {/* 5. Construct Variant */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        aria-label={`Add component ${part}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-mono"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <span key={i} className="px-2.5 py-1 bg-gold-900/60 border border-gold-700 rounded-lg text-xs font-mono text-gold-200 flex items-center gap-1.5">
                        {part}
                        <button 
                          aria-label={`Remove part ${part}`}
                          onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))} 
                          className="text-rose-400 text-xs hover:text-rose-300"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-slate-600 text-xs">Click parts above to construct the architecture</span>
                    )}
                  </div>

                  <motion.button
                    aria-label="Verify constructed architecture pipeline"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Verify Architecture Pipeline
                  </motion.button>
                </div>
              )}

              {/* Progressive Disclosure Explanation Card */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-gradient-to-br from-slate-950 to-gold-950/40 rounded-xl border border-gold-800/60 space-y-3"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <span>💡</span> Step-by-Step Examiner Explanation:
                  </div>

                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-gold-400">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                    {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        aria-label="Show next explanation step"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setRevealedSteps(s => s + 1)}
                        className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold"
                      >
                        Show Next Step →
                      </motion.button>
                    ) : (
                      <motion.button
                        aria-label="Advance to next challenge or completion"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Capstone →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION & REFLECTION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-emerald-600/20 border border-emerald-500/40 rounded-full flex items-center justify-center text-3xl mx-auto"
              >
                🎓
              </motion.div>

              <h2 className="text-2xl font-black text-white">ISC Project Capstone Completed!</h2>
              <div className="flex justify-center gap-6 text-sm font-mono">
                <div>Score: <span className="text-emerald-400 font-bold">{Math.max(0, 100 - errors * 5)}%</span></div>
                <div>Mastery: <span className="text-gold-400 font-bold uppercase">{masteryLevel}</span></div>
                <div>Errors: <span className="text-rose-400 font-bold">{errors}</span></div>
              </div>

              {/* Personalized Motivational Feedback */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs md:text-sm text-slate-300 max-w-2xl mx-auto">
                <span className="font-bold text-amber-400">{getMotivationalMessage(errors)}</span>
              </div>
            </div>

            {/* Misconception Profile Tracking */}
            {hitMisconceptions.length > 0 && (
              <div className="p-6 bg-rose-950/20 rounded-2xl border border-rose-900/50 space-y-3">
                <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                  <span>⚠️</span> Diagnostic Misconception Review:
                </h3>
                <div className="space-y-2">
                  {hitMisconceptions.map((idx, i) => {
                    const m = misconceptions?.[idx];
                    if (!m) return null;
                    return (
                      <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-950 text-xs space-y-1">
                        <div className="text-rose-300 font-semibold">✗ Misconception: {m.misconception}</div>
                        <div className="text-emerald-300">✓ Correction: {m.correction}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Spaced Repetition SRS Schedule */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Spaced Review Target</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Next scheduled review in <span className="text-amber-400 font-bold">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span> to consolidate long-term memory.
                </p>
              </div>
              <span className="text-xl">📅</span>
            </div>

            {/* REAL WORLD ACTIVITY */}
            <div className="p-6 bg-gradient-to-br from-gold-950/40 to-slate-900 rounded-2xl border border-gold-900/60 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🚀</span>
                <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
              </div>
              <p className="text-xs md:text-sm text-slate-300">
                {REAL_WORLD_ACTIVITY.description}
              </p>
              <div className="space-y-2 text-xs text-slate-300">
                <h4 className="font-semibold text-white">Project Implementation Steps:</h4>
                <ol className="list-decimal list-inside space-y-1.5 pl-1">
                  {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FEEDBACK BUBBLES / BANNERS / CONFETTI ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Level Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}

    </div>
  );
}

export { C12_ComputerScienceJavaProjectBankingSim };
export default C12_ComputerScienceJavaProjectBankingSim;
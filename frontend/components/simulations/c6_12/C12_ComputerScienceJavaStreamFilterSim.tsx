'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS AS STRING LITERALS ───
const NODE_C12_CS_021 = 'c12_cs_021'; // Java Stream API
const NODE_C12_CS_022 = 'c12_cs_022'; // Java JDBC
const NODE_C12_CS_023 = 'c12_cs_023'; // Java PreparedStatement
const NODE_C12_CS_024 = 'c12_cs_024'; // Java Multithreading
const NODE_C12_CS_025 = 'c12_cs_025'; // Java Exception Handling Advanced
const NODE_C12_CS_026 = 'c12_cs_026'; // Java NIO
const NODE_C12_CS_027 = 'c12_cs_027'; // Java Annotations & Reflection
const NODE_C12_CS_028 = 'c12_cs_028'; // Java Networking
const NODE_C12_CS_029 = 'c12_cs_029'; // Java GUI Advanced (JavaFX)
const NODE_C12_CS_030 = 'c12_cs_030'; // Java Functional Programming

const ALL_NODE_IDS = [
  NODE_C12_CS_021,
  NODE_C12_CS_022,
  NODE_C12_CS_023,
  NODE_C12_CS_024,
  NODE_C12_CS_025,
  NODE_C12_CS_026,
  NODE_C12_CS_027,
  NODE_C12_CS_028,
  NODE_C12_CS_029,
  NODE_C12_CS_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: Bengaluru Tech Core – Enterprise Java Overhaul',
  intro: 'You are the Lead Systems Architect at an Indian fintech super-app processing millions of UPI transactions per second. The legacy codebase is crashing under concurrent loads, SQL injection attempts, unmanaged threads, and messy file I/O.',
  context: 'Refactor the backend into modern Java: compose declarative Stream pipelines, secure JDBC connections with PreparedStatement, synchronize concurrent threads, implement NIO non-blocking buffers, orchestrate JavaFX frontends, and leverage Functional Interfaces.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In a stream pipeline `scores.stream().filter(s -> s >= 40).map(s -> s + 5);`, when does the actual filtering and mapping execution occur?',
  options: [
    'Immediately as each intermediate method is called on the list',
    'Only when a terminal operation (e.g. .collect(), .forEach(), .reduce()) is invoked',
    'Asynchronously on a background worker thread right after .stream() is created',
    'During JVM compile time when bytecode is generated',
  ],
  correctIndex: 1,
  hintAfter: 'Streams use Lazy Evaluation! Intermediate operations construct a recipe; execution only triggers when a terminal operation demands the result.',
};

// ─── PREDICTION QUESTIONS (Predict-Then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_stream_filter',
    question: 'If the raw marks list is [25, 42, 55, 68, 38, 91, 55, 74] and you set the filter threshold to 50, how many elements will pass through the filter gate?',
    options: [
      '3 elements',
      '5 elements',
      '6 elements',
      '8 elements',
    ],
    correctIndex: 1,
    explanation: 'The 5 elements with mark >= 50 are: 55, 68, 91, 55, and 74.',
    verifyInstruction: 'Adjust the Filter Threshold slider to 50 in Step 1 of the Interactive Lab and count the surviving elements in the matrix below!',
  },
  {
    id: 'pred_thread_race',
    question: 'If two ATM threads both attempt to withdraw ₹3,000 simultaneously from an initial balance of ₹10,000 WITHOUT synchronization, what is the most likely corrupted balance?',
    options: [
      '₹7,000 (Lost Update from overlapping read-modify-write)',
      '₹4,000 (Correct final balance)',
      '₹13,000 (Negative subtraction)',
      '₹0 (Total account wipe)',
    ],
    correctIndex: 0,
    explanation: 'Both threads read the initial ₹10,000 before either writes back. Thread-A writes ₹7,000, and Thread-B then overwrites it with ₹7,000, causing a ₹3,000 lost update.',
    verifyInstruction: 'Disable Synchronization and click "Spawn Concurrent ATM Threads" in Step 2 to observe the collision and resulting ₹7,000 corrupted balance.',
  },
];

// ─── OBSERVATION QUESTIONS (What Do You Notice Pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_buffer_flip',
    question: 'After writing 4 bytes into a ByteBuffer of capacity 8 and then calling buffer.flip(), what happens to the position and limit pointers?',
    options: [
      'position becomes 0 and limit becomes 4',
      'position becomes 4 and limit becomes 8',
      'position remains 4 and limit resets to 0',
      'position and limit both reset to 8',
    ],
    observableOptions: [
      'position becomes 0 and limit becomes 4',
      'position becomes 4 and limit becomes 8',
      'position remains 4 and limit resets to 0',
      'position and limit both reset to 8',
    ],
    correctIndex: 0,
    explanation: 'buffer.flip() prepares the buffer for reading by setting limit = previous position (4) and resetting position = 0.',
  },
  {
    id: 'obs_sql_binding',
    question: 'When submitting the malicious string "admin\' OR \'1\'=\'1" into PreparedStatement, what do you observe in the executed query structure?',
    options: [
      'The SQL syntax remains fixed with ? placeholders, and the whole string is treated purely as literal data',
      'The SQL grammar gets altered and injects an OR clause that returns all records',
      'The database throws a syntax compilation exception and drops the table',
      'The database crashes immediately due to an unchecked NullPointerException',
    ],
    observableOptions: [
      'The SQL syntax remains fixed with ? placeholders, and the whole string is treated purely as literal data',
      'The SQL grammar gets altered and injects an OR clause that returns all records',
      'The database throws a syntax compilation exception and drops the table',
      'The database crashes immediately due to an unchecked NullPointerException',
    ],
    correctIndex: 0,
    explanation: 'PreparedStatement compiles the SQL parse tree before parameter binding. The entire attack payload is safely treated as a single literal string.',
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation: Stream API Filter (c12_cs_021)
  {
    id: 'ch_01_stream_filter',
    nodeId: NODE_C12_CS_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A Kolkata school has student marks: [35, 55, 68, 20, 82, 40]. How many elements survive `marks.stream().filter(m -> m >= 40)`?',
    options: ['3 elements', '4 elements', '5 elements', '6 elements'],
    correctIndex: 1,
    explanation: 'The filter retains marks >= 40: 55, 68, 82, and 40. Thus, exactly 4 elements survive.',
    hints: [
      'Filter evaluates the condition `m >= 40` for each integer.',
      'Elements 55, 68, 82, and 40 are all greater than or equal to 40.',
      'Count them: 55, 68, 82, 40 makes 4 elements.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation: Drag Label - Functional Interfaces (c12_cs_030)
  {
    id: 'ch_02_func_drag',
    nodeId: NODE_C12_CS_030,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each standard Functional Interface with its single abstract method.',
    dragItems: [
      { label: 'test(T)', targetId: 'target_predicate' },
      { label: 'apply(T)', targetId: 'target_function' },
      { label: 'accept(T)', targetId: 'target_consumer' },
      { label: 'get()', targetId: 'target_supplier' },
    ],
    correctMapping: {
      target_predicate: 'test(T)',
      target_function: 'apply(T)',
      target_consumer: 'accept(T)',
      target_supplier: 'get()',
    },
    explanation: 'Predicate uses test(T)->boolean, Function uses apply(T)->R, Consumer uses accept(T)->void, and Supplier uses get()->T.',
    hints: [
      'Predicate tests a condition and returns boolean.',
      'Consumer accepts input and produces no return value.',
      'Supplier takes zero arguments and generates a value with get().',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation: JDBC Steps Sorting (c12_cs_022)
  {
    id: 'ch_03_jdbc_sort',
    nodeId: NODE_C12_CS_022,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Arrange the 4 fundamental JDBC read workflow steps in order of execution.',
    sortItems: [
      'Class.forName("com.mysql.cj.jdbc.Driver")',
      'DriverManager.getConnection(url, user, pass)',
      'con.createStatement().executeQuery(sql)',
      'while(rs.next()) { rs.getString("name"); }',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'JDBC order: (1) Load Driver, (2) Open Connection, (3) Create Statement & Execute Query, (4) Iterate ResultSet.',
    hints: [
      'First register the driver class in the JVM classpath.',
      'Establish the connection before creating SQL statements.',
      'Execute query returns ResultSet which is then iterated using rs.next().',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation: Thread start vs run (c12_cs_024)
  {
    id: 'ch_04_thread_lifecycle',
    nodeId: NODE_C12_CS_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What happens if you directly call `workerThread.run()` instead of `workerThread.start()` in Java?',
    options: [
      'A new OS thread is spawned and executes concurrently',
      'The run() code executes synchronously in the caller thread with no new thread created',
      'The JVM throws an IllegalThreadStateException immediately',
      'The thread transitions directly to the BLOCKED state',
    ],
    correctIndex: 1,
    explanation: 'Directly calling run() simply executes the method body in the current thread stack. Only start() registers the thread with the JVM scheduler.',
    hints: [
      'run() is an ordinary Java method without native OS thread dispatch.',
      'start() allocates a new call stack and requests scheduling from the JVM.',
      'Calling run() directly is purely sequential method execution.',
    ],
    misconceptionIndex: 3,
  },
  // 5. Foundation: Try-With-Resources Interface (c12_cs_025)
  {
    id: 'ch_05_try_resources',
    nodeId: NODE_C12_CS_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which interface must a resource class implement to be declared inside a Java `try(...)` header?',
    options: ['java.io.Serializable', 'java.lang.AutoCloseable', 'java.lang.Cloneable', 'java.lang.Runnable'],
    correctIndex: 1,
    explanation: 'Try-with-resources requires AutoCloseable (or Closeable). The JVM invokes .close() automatically at block exit.',
    hints: [
      'Look for an interface that defines the close() method.',
      'Closeable extends this root interface introduced in Java 7.',
      'The answer is AutoCloseable.',
    ],
    misconceptionIndex: 4,
  },
  // 6. Foundation: Built-in Annotations (c12_cs_027)
  {
    id: 'ch_06_override_annotation',
    nodeId: NODE_C12_CS_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'If a developer annotates a method with `@Override` but mispells the signature so it does not match the parent class, what happens?',
    options: [
      'The program compiles fine and creates a newly overloaded method at runtime',
      'The Java compiler raises a compile-time error preventing the bug',
      'A RuntimeException is thrown when the method is first invoked',
      'The JVM silently ignores the annotation during bytecode execution',
    ],
    correctIndex: 1,
    explanation: '@Override is a compile-time safety check. If the signature does not override a superclass/interface method, compilation fails immediately.',
    hints: [
      'Annotations like @Override inform the compiler of developer intent.',
      'If the intent fails to match inheritance hierarchy, the compiler stops compilation.',
      'It produces a compile-time error.',
    ],
    misconceptionIndex: 5,
  },
  // 7. Foundation: JavaFX Scene Graph Hierarchy (c12_cs_029)
  {
    id: 'ch_07_javafx_hierarchy',
    nodeId: NODE_C12_CS_029,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Order the JavaFX GUI containment hierarchy from top-level window down to interactive UI control.',
    sortItems: ['Stage (Window frame)', 'Scene (Drawing canvas)', 'VBox/HBox (Layout Pane Node)', 'Button/Label (Control Node)'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'JavaFX structure: Stage -> Scene -> Root Layout Pane -> Child Controls (Scene Graph Tree).',
    hints: [
      'Stage is the outermost OS window provided to Application.start().',
      'Scene is placed inside the Stage.',
      'Panes hold controls within the Scene Graph.',
    ],
    misconceptionIndex: 6,
  },

  // ─── STANDARD CHALLENGES ───
  // 8. Standard: SQL Injection Prevention (c12_cs_023)
  {
    id: 'ch_08_sql_injection',
    nodeId: NODE_C12_CS_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An attacker submits user input `admin\' OR \'1\'=\'1`. Why does `pst.setString(1, input)` in PreparedStatement prevent unauthorized access?',
    options: [
      'It strips out all punctuation before sending raw text to MySQL',
      'It binds input strictly as a literal data value, never parsed as executable SQL grammar',
      'It encrypts the entire query using TLS before database execution',
      'It converts SQL strings into binary machine code inside Java heap memory',
    ],
    correctIndex: 1,
    explanation: 'PreparedStatement compiles the SQL plan first. Bound parameters are transmitted as literal data tokens and cannot alter query syntax.',
    hints: [
      'SQL injection relies on the SQL parser interpreting data characters as operators like OR/quotes.',
      'PreparedStatement compiles the query structure with placeholders before receiving data.',
      'Data is treated purely as values, preserving the WHERE clause syntax.',
    ],
    misconceptionIndex: 7,
  },
  // 9. Standard: Stream Pipeline Output Prediction (c12_cs_021)
  {
    id: 'ch_09_stream_pipeline_calc',
    nodeId: NODE_C12_CS_021,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Given list `[2, 3, 4, 5]`, calculate the result of: `list.stream().filter(n -> n % 2 == 0).map(n -> n * n).reduce(0, Integer::sum)`',
    correctAnswer: 20,
    tolerance: 0,
    unit: 'total sum',
    explanation: 'Filter retains even numbers: [2, 4]. Map squares them: [4, 16]. Reduce sums: 4 + 16 = 20.',
    hints: [
      'Step 1: Which numbers in [2, 3, 4, 5] satisfy n % 2 == 0? (2 and 4)',
      'Step 2: Map squares them -> 2*2=4, 4*4=16.',
      'Step 3: Reduce adds 0 + 4 + 16.',
    ],
    misconceptionIndex: 0,
  },
  // 10. Standard: Bank Race Condition Fix (c12_cs_024)
  {
    id: 'ch_10_multithread_race',
    nodeId: NODE_C12_CS_024,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Two ATM threads in Mumbai withdraw from the same `Account` object concurrently, causing lost updates. What is the fundamental fix?',
    options: [
      'Declare `volatile int balance;` on the variable',
      'Mark the withdraw() method as `synchronized` to acquire the object monitor lock',
      'Call `Thread.yield()` after each balance modification',
      'Wrap the withdraw call inside a `try-catch(Exception e)` block',
    ],
    correctIndex: 1,
    explanation: 'Read-modify-write on balance is non-atomic. Synchronized ensures mutual exclusion via the object monitor, making the transaction atomic.',
    hints: [
      'Volatile only guarantees visibility, not atomicity for compound operations (balance = balance - amt).',
      'Mutual exclusion prevents two threads from being inside the critical section simultaneously.',
      'The synchronized keyword locks the object monitor.',
    ],
    misconceptionIndex: 3,
  },
  // 11. Standard: Java NIO Buffer Flip (c12_cs_026)
  {
    id: 'ch_11_nio_flip',
    nodeId: NODE_C12_CS_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A `ByteBuffer` has capacity 100. You write 30 bytes into it. What does calling `buffer.flip()` do?',
    options: [
      'Sets position=0 and limit=30, preparing the buffer for reading',
      'Sets position=0 and limit=100, clearing all data',
      'Reverses the byte order of the 30 bytes in memory',
      'Flushes the buffer data directly to the disk channel',
    ],
    correctIndex: 0,
    explanation: 'flip() switches from writing mode to reading mode: it sets limit = current position (30) and resets position = 0.',
    hints: [
      'Writing moved position from 0 to 30.',
      'To read what you wrote, you need to start back at 0 and stop at 30.',
      'flip() sets limit=position and position=0.',
    ],
    misconceptionIndex: 8,
  },
  // 12. Standard: Networking Sockets (c12_cs_028)
  {
    id: 'ch_12_socket_accept',
    nodeId: NODE_C12_CS_028,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why does `ServerSocket.accept()` return a new `Socket` object rather than streaming bytes directly?',
    options: [
      'ServerSocket is only a connection factory that listens on the port; the returned Socket represents the dedicated bidirectional client channel',
      'ServerSocket is a UDP protocol wrapper while Socket is TCP',
      'Because Java requires all network data to be buffered in local files first',
      'ServerSocket converts HTTP headers to JSON objects',
    ],
    correctIndex: 0,
    explanation: 'ServerSocket listens at the bound port. When a TCP handshake completes, accept() creates a dedicated Socket representing that active client link.',
    hints: [
      'Think of ServerSocket as the reception desk phone.',
      'When an incoming call arrives, it transfers the conversation to a dedicated line (Socket).',
      'ServerSocket continues listening for more clients.',
    ],
    misconceptionIndex: 9,
  },
  // 13. Standard: Optional Safe Access (c12_cs_030)
  {
    id: 'ch_13_optional_safe',
    nodeId: NODE_C12_CS_030,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which statement safely returns the student name or `"Unknown"` if the `Optional<String> optName` is empty?',
    options: [
      'optName.get().toString()',
      'optName.orElse("Unknown")',
      'optName.ifPresent("Unknown")',
      'Optional.of(optName.get())',
    ],
    correctIndex: 1,
    explanation: '`.orElse("Unknown")` returns the wrapped string if present, or fallback "Unknown" if empty without throwing NoSuchElementException.',
    hints: [
      'Calling .get() on an empty Optional throws NoSuchElementException.',
      '.orElse(defaultVal) unwraps safely with a fallback value.',
      'ifPresent() takes a Consumer lambda, not a default string.',
    ],
    misconceptionIndex: 1,
  },
  // 14. Standard: Multi-catch Exception Rules (c12_cs_025)
  {
    id: 'ch_14_multicatch_syntax',
    nodeId: NODE_C12_CS_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does `catch (IOException | FileNotFoundException e)` fail to compile in Java 7+?',
    options: [
      'Multi-catch only supports RuntimeExceptions',
      'FileNotFoundException is a subclass of IOException, making the clause redundant',
      'The pipe operator `|` cannot be used in catch blocks',
      'Variable `e` must be re-declared for each caught type',
    ],
    correctIndex: 1,
    explanation: 'Java multi-catch forbids alternatives in an inheritance relationship (subclass/superclass) because the superclass already subsumes the subclass.',
    hints: [
      'Check the relationship between FileNotFoundException and IOException.',
      'FileNotFoundException extends IOException.',
      'Listing a child with its parent in multi-catch is a compile-time redundancy error.',
    ],
    misconceptionIndex: 4,
  },
  // 15. Standard: Construct Custom Annotation (c12_cs_027)
  {
    id: 'ch_15_construct_annotation',
    nodeId: NODE_C12_CS_027,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Assemble the tokens to declare a runtime-visible Java Custom Annotation named `ServiceModule`.',
    availableParts: ['@Retention(RetentionPolicy.RUNTIME)', '@interface', 'ServiceModule', '{', 'String', 'value();', '}'],
    targetState: '@Retention(RetentionPolicy.RUNTIME) @interface ServiceModule { String value(); }',
    validationHint: 'Tokens must define @Retention(RetentionPolicy.RUNTIME) followed by @interface ServiceModule { String value(); }',
    explanation: 'Custom annotations use @interface and need @Retention(RetentionPolicy.RUNTIME) to be inspected via reflection.',
    hints: [
      'Start with the meta-annotation @Retention(RetentionPolicy.RUNTIME).',
      'Use the keyword @interface (not interface).',
      'Specify the element: String value(); inside braces.',
    ],
    misconceptionIndex: 5,
  },

  // ─── ADVANCED CHALLENGES ───
  // 16. Advanced: Stream Pipeline Construction (c12_cs_021)
  {
    id: 'ch_16_stream_construct',
    nodeId: NODE_C12_CS_021,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the stream pipeline to filter names starting with "A", convert to uppercase, and collect to List.',
    availableParts: ['names.stream()', '.filter(n -> n.startsWith("A"))', '.map(String::toUpperCase)', '.collect(Collectors.toList())'],
    targetState: 'names.stream() .filter(n -> n.startsWith("A")) .map(String::toUpperCase) .collect(Collectors.toList())',
    validationHint: 'Source -> .filter(...) -> .map(...) -> .collect(...)',
    explanation: 'Stream pipeline order: Source -> Intermediate operations (filter, map) -> Terminal operation (collect).',
    hints: [
      'Start with the collection stream source.',
      'Filter comes before transforming (map).',
      'End with terminal collect(Collectors.toList()).',
    ],
    misconceptionIndex: 0,
  },
  // 17. Advanced: Producer-Consumer Wait/Notify (c12_cs_024)
  {
    id: 'ch_17_wait_notify_rules',
    nodeId: NODE_C12_CS_024,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'What happens if a thread calls `lockObj.wait()` outside of a `synchronized(lockObj)` block?',
    options: [
      'The thread sleeps quietly without acquiring any lock',
      'The JVM immediately throws `IllegalMonitorStateException`',
      'The thread automatically enters deadlock state',
      'The operating system initiates a thread priority inversion',
    ],
    correctIndex: 1,
    explanation: 'wait(), notify(), and notifyAll() require current thread to hold the monitor lock. If not held, IllegalMonitorStateException is thrown.',
    hints: [
      'Inter-thread communication methods manipulate the monitor lock.',
      'Without holding the monitor, Java security rejects the call at runtime.',
      'The resulting exception is IllegalMonitorStateException.',
    ],
    misconceptionIndex: 3,
  },
  // 18. Advanced: PreparedStatement Batch Performance (c12_cs_023)
  {
    id: 'ch_18_batch_numeric',
    nodeId: NODE_C12_CS_023,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'You insert 500 records into `orders`. Instead of 500 individual `executeUpdate()` network round-trips, you use `addBatch()` and one `executeBatch()`. How many total database network round-trips are executed?',
    correctAnswer: 1,
    tolerance: 0,
    unit: 'network round-trip',
    explanation: 'executeBatch() bundles all queued parameter sets into a single network payload sent to the database engine.',
    hints: [
      'addBatch() buffers queries in memory on the client driver.',
      'executeBatch() flushes the entire accumulated batch at once.',
      'All 500 queries travel in exactly 1 round-trip.',
    ],
    misconceptionIndex: 7,
  },
  // 19. Advanced: Java NIO Path & Channel Copy (c12_cs_026)
  {
    id: 'ch_19_nio_copy_eval',
    nodeId: NODE_C12_CS_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Compare `Files.copy(Path src, Path target)` in Java NIO with manual byte-by-byte `FileInputStream` copying. Why is NIO superior for large video files?',
    options: [
      'NIO creates temporary zip archives in RAM automatically',
      'NIO delegates to OS-level kernel zero-copy transfers (e.g. sendfile system call) via native channels',
      'NIO ignores file checksums to increase speed',
      'NIO forces multi-core CPU overclocking during transfer',
    ],
    correctIndex: 1,
    explanation: 'Java NIO FileChannels utilize direct memory buffers and OS kernel zero-copy transfers, avoiding user-space buffer copying.',
    hints: [
      'Traditional I/O copies bytes into user-space Java heap buffers.',
      'NIO channels connect directly to OS page caches and native file descriptors.',
      'This zero-copy mechanism bypasses user-space overhead.',
    ],
    misconceptionIndex: 8,
  },
  // 20. Advanced: JavaFX CSS Prefix Rule (c12_cs_029)
  {
    id: 'ch_20_javafx_css',
    nodeId: NODE_C12_CS_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A student applies `.button { background-color: #4f46e5; }` in a JavaFX stylesheet, but the button color does not change. What is the bug?',
    options: [
      'JavaFX only supports XML stylesheets, not CSS',
      'JavaFX CSS properties require the `-fx-` vendor prefix: `-fx-background-color: #4f46e5;`',
      'Buttons in JavaFX cannot be styled with background colors',
      'The color code must be in RGB percentages',
    ],
    correctIndex: 1,
    explanation: 'JavaFX implements its own CSS specification where standard properties are prefixed with `-fx-` (e.g., `-fx-background-color`, `-fx-font-size`).',
    hints: [
      'Web CSS and JavaFX CSS share syntax but have different property identifiers.',
      'JavaFX uses a proprietary prefix for all styling rules.',
      'The prefix is `-fx-`.',
    ],
    misconceptionIndex: 6,
  },
  // 21. Advanced: Stream Lazy Evaluation Evaluation (c12_cs_021)
  {
    id: 'ch_21_stream_short_circuit',
    nodeId: NODE_C12_CS_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In pipeline `Stream.of(10, 20, 30, 40).filter(x -> { count++; return x > 15; }).findFirst()`, what is the final value of `count`?',
    options: ['4 (evaluates all elements)', '2 (short-circuits after finding 20)', '1 (evaluates only first element)', '0 (never runs)'],
    correctIndex: 1,
    explanation: '10 is tested (count=1, false). 20 is tested (count=2, true). findFirst() immediately short-circuits and halts the stream!',
    hints: [
      'Streams process elements one-by-one vertically down the pipeline.',
      'Element 10 fails filter. Element 20 passes.',
      'findFirst() terminates immediately once a match is found, so 30 and 40 are never evaluated.',
    ],
    misconceptionIndex: 0,
  },
  // 22. Advanced: Reflection Accessing Custom Annotation (c12_cs_027)
  {
    id: 'ch_22_reflection_annotation',
    nodeId: NODE_C12_CS_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'How do you extract an annotation `@Table(name="users")` from class `User` at runtime using Java Reflection?',
    options: [
      'Table t = (Table) User.class.getAnnotations()[0];',
      'Table t = User.class.getAnnotation(Table.class);',
      'Table t = new Table(User.class);',
      'Table t = Class.forName("User").loadAnnotation("Table");',
    ],
    correctIndex: 1,
    explanation: '`Class.getAnnotation(Class<A> annotationClass)` returns the typed runtime annotation instance or null if not present.',
    hints: [
      'Use the type-safe method on the Class<?> mirror object.',
      'Pass the class literal `Table.class` as parameter.',
      '`User.class.getAnnotation(Table.class)` is the standard Reflection API call.',
    ],
    misconceptionIndex: 5,
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
  nodeId: NODE_C12_CS_021,
  title: 'Java Stream API & Enterprise Architecture',
  definition: 'The Java Stream API, JDBC PreparedStatement, Thread Synchronization, NIO Buffers, and Functional Interfaces form the bedrock of modern high-concurrency Java enterprise systems.',
  eli5: 'Think of Java Streams like an assembly line with filter gates and painting arms. NIO is like big buckets moving data in bulk, and synchronization is like a traffic light stopping two cars from crashing into the same intersection.',
  misconceptions: [
    { misconception: 'Streams modify the original backing collection.', correction: 'Streams are non-mutating pipelines; they leave source collections untouched and return new results.' },
    { misconception: 'Functional interfaces can declare multiple abstract methods.', correction: 'A Functional Interface MUST declare exactly ONE abstract method (SAM rule).' },
    { misconception: 'Calling close() in finally is strictly needed even with try-with-resources.', correction: 'Try-with-resources automatically closes all AutoCloseable resources at block exit.' },
    { misconception: 'Calling thread.run() starts concurrent execution.', correction: 'thread.run() executes synchronously in the caller stack; thread.start() is required to spawn an OS thread.' },
    { misconception: 'Multi-catch can list a superclass and subclass together.', correction: 'Multi-catch disallows parent-child pairs (e.g. Exception | IOException) due to redundancy.' },
    { misconception: 'Annotations execute program logic directly like if-statements.', correction: 'Annotations are passive metadata inspected by the compiler, bytecode tools, or Reflection.' },
    { misconception: 'JavaFX Stage is identical to Swing JFrame and can be instantiated anywhere.', correction: 'JavaFX Stage is the top-level window supplied by the Application runtime inside start().' },
    { misconception: 'PreparedStatement concatenates string values before running.', correction: 'PreparedStatement precompiles SQL templates; values are bound as literal data tokens.' },
    { misconception: 'Buffer.flip() reverses the byte array order.', correction: 'Buffer.flip() sets limit=position and position=0 to switch from writing mode to reading mode.' },
    { misconception: 'ServerSocket handles read and write stream byte transfers directly.', correction: 'ServerSocket only listens; its accept() method returns a dedicated Socket for data exchange.' },
  ],
  diagnosticQuestions: [
    { question: 'Which operation is an intermediate stream operation?', options: ['collect()', 'filter()', 'forEach()', 'reduce()'], correctIndex: 1 },
    { question: 'Which JDBC object precompiles SQL and blocks SQL injection?', options: ['Statement', 'PreparedStatement', 'ResultSet', 'DriverManager'], correctIndex: 1 },
    { question: 'Which keyword guarantees mutual exclusion on a shared critical section?', options: ['volatile', 'synchronized', 'transient', 'native'], correctIndex: 1 },
    { question: 'What does Buffer.clear() in Java NIO do?', options: ['Zeros all bytes in RAM', 'Resets position=0 and limit=capacity', 'Closes the channel', 'Deletes the file'], correctIndex: 1 },
    { question: 'Which meta-annotation preserves annotations for runtime reflection?', options: ['@Retention(SOURCE)', '@Retention(CLASS)', '@Retention(RUNTIME)', '@Target(TYPE)'], correctIndex: 2 },
    { question: 'What is the root container node in JavaFX?', options: ['Stage', 'Scene', 'Parent / Layout Pane', 'Control'], correctIndex: 2 },
    { question: 'Which Functional Interface takes no argument and returns a value?', options: ['Consumer', 'Predicate', 'Supplier', 'Function'], correctIndex: 2 },
    { question: 'In networking, which class listens on a port for connections?', options: ['Socket', 'ServerSocket', 'DatagramPacket', 'URL'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery is demonstrated by building declarative Stream pipelines, writing injection-proof JDBC statements, synchronizing threads, operating NIO buffers, and utilizing functional interfaces.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Declarative Stream Pipeline',
    instruction: 'Toggle filter conditions and mapping multipliers. Watch data tokens stream through intermediate gates to the terminal collector in real-time!',
    interactionType: 'stream-lab',
    nodeId: NODE_C12_CS_021,
  },
  {
    title: '2. Thread Race Conditions & Mutex Locks',
    instruction: 'Run concurrent ATM transactions with and without `synchronized`. Observe how uncoordinated threads cause lost updates.',
    interactionType: 'thread-lab',
    nodeId: NODE_C12_CS_024,
  },
  {
    title: '3. SQL Injection vs. PreparedStatement',
    instruction: 'Inject malicious SQL payloads into raw Statement vs Parameterized PreparedStatement to see parameter binding in action.',
    interactionType: 'sql-lab',
    nodeId: NODE_C12_CS_023,
  },
  {
    title: '4. Java NIO Buffer State Machine',
    instruction: 'Write bytes into the buffer, observe `position`, `limit`, and `capacity`. Click `flip()` and `clear()` to master buffer lifecycle.',
    interactionType: 'nio-lab',
    nodeId: NODE_C12_CS_026,
  },
  {
    title: '5. Functional Interfaces & Optional Box',
    instruction: 'Inspect the Optional box wrapper. Swap between present values and null to see `orElse()` and lambda execution.',
    interactionType: 'func-lab',
    nodeId: NODE_C12_CS_030,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Enterprise Architect Challenge: Refactor Bengaluru Metro Ticketing',
  description: 'Design a Java microservice that processes 50,000 smart card tap-ins per minute. Utilize Streams for fare calculation, PreparedStatement for ledger recording, synchronized blocks for passenger turnstile counters, and NIO for high-speed logging.',
  steps: [
    'Create an `Optional<SmartCard>` lookup to avoid null crashes on unread cards.',
    'Chain `cards.stream().filter(c -> c.getBalance() >= minFare).map(FareCalculator::calculate)`',
    'Execute batch inserts using `PreparedStatement.addBatch()` in transactions.',
    'Guard turnstile passenger counters with `synchronized` monitor locks.',
    'Asynchronously flush log buffers to disk with NIO `FileChannel` zero-copy.',
  ],
};

// ─── SVG DIAGRAM 1: STREAM PIPELINE ARCHITECTURE ───
function StreamPipelineSvg({ threshold, bonus }: { threshold: number; bonus: number }) {
  return (
    <svg viewBox="0 0 760 180" className="w-full h-auto bg-slate-950/90 rounded-xl border border-slate-800 p-2" role="img" aria-label="Java Stream Architecture Pipeline Diagram">
      <defs>
        <linearGradient id="gradStreamSource" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="gradStreamFilter" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#b45309" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="gradStreamMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="gradStreamCollect" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.9" />
        </linearGradient>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
        </marker>
      </defs>

      {/* Stage 1: Collection Source */}
      <g transform="translate(20, 25)">
        <rect width="140" height="130" rx="12" fill="url(#gradStreamSource)" stroke="#60a5fa" strokeWidth="2" />
        <text x="70" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Collection Source</text>
        <text x="70" y="48" fill="#bfdbfe" fontSize="10" textAnchor="middle">List&lt;Integer&gt;</text>
        <rect x="15" y="60" width="110" height="55" rx="6" fill="#0f172a" fillOpacity="0.6" />
        <text x="70" y="80" fill="#93c5fd" fontSize="9" textAnchor="middle">[25, 42, 55, 68,</text>
        <text x="70" y="98" fill="#93c5fd" fontSize="9" textAnchor="middle"> 38, 91, 55, 74]</text>
        <text x="70" y="124" fill="#dbeafe" fontSize="9" fontStyle="italic" textAnchor="middle">Non-mutating source</text>
      </g>

      <line x1="165" y1="90" x2="205" y2="90" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#arrow)" />

      {/* Stage 2: Intermediate .filter() */}
      <g transform="translate(210, 25)">
        <rect width="145" height="130" rx="12" fill="url(#gradStreamFilter)" stroke="#fbbf24" strokeWidth="2" />
        <text x="72" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">1. filter() Gate</text>
        <text x="72" y="48" fill="#fef3c7" fontSize="10" textAnchor="middle">Intermediate (Lazy)</text>
        <rect x="12" y="60" width="121" height="55" rx="6" fill="#0f172a" fillOpacity="0.6" />
        <text x="72" y="80" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">Predicate&lt;T&gt;</text>
        <text x="72" y="98" fill="#fde047" fontSize="10" textAnchor="middle">mark &gt;= {threshold}</text>
        <text x="72" y="124" fill="#fef08a" fontSize="9" textAnchor="middle">Discards &lt; {threshold}</text>
      </g>

      <line x1="360" y1="90" x2="400" y2="90" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#arrow)" />

      {/* Stage 3: Intermediate .map() */}
      <g transform="translate(405, 25)">
        <rect width="145" height="130" rx="12" fill="url(#gradStreamMap)" stroke="#34d399" strokeWidth="2" />
        <text x="72" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">2. map() Transform</text>
        <text x="72" y="48" fill="#d1fae5" fontSize="10" textAnchor="middle">Intermediate (Lazy)</text>
        <rect x="12" y="60" width="121" height="55" rx="6" fill="#0f172a" fillOpacity="0.6" />
        <text x="72" y="80" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">Function&lt;T, R&gt;</text>
        <text x="72" y="98" fill="#6ee7b7" fontSize="10" textAnchor="middle">mark + {bonus}</text>
        <text x="72" y="124" fill="#a7f3d0" fontSize="9" textAnchor="middle">Pipelined on-demand</text>
      </g>

      <line x1="555" y1="90" x2="595" y2="90" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#arrow)" />

      {/* Stage 4: Terminal Operation */}
      <g transform="translate(600, 25)">
        <rect width="140" height="130" rx="12" fill="url(#gradStreamCollect)" stroke="#c084fc" strokeWidth="2" />
        <text x="70" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">3. Terminal Collector</text>
        <text x="70" y="48" fill="#ede9fe" fontSize="10" textAnchor="middle">Eager Execution</text>
        <rect x="12" y="60" width="116" height="55" rx="6" fill="#0f172a" fillOpacity="0.6" />
        <text x="70" y="80" fill="#ddd6fe" fontSize="9" fontWeight="bold" textAnchor="middle">.collect() / .reduce()</text>
        <text x="70" y="98" fill="#e9d5ff" fontSize="9" textAnchor="middle">Triggers Pull Pipeline</text>
        <text x="70" y="124" fill="#c4b5fd" fontSize="9" textAnchor="middle">Yields Target Output</text>
      </g>
    </svg>
  );
}

// ─── SVG DIAGRAM 2: THREAD MONITOR MUTEX ARCHITECTURE ───
function ThreadMonitorSvg({ syncEnabled }: { syncEnabled: boolean }) {
  return (
    <svg viewBox="0 0 720 170" className="w-full h-auto bg-slate-950/90 rounded-xl border border-slate-800 p-2" role="img" aria-label="Java Multithreading Monitor Lock Diagram">
      <defs>
        <marker id="arrThread" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
        </marker>
        <marker id="arrThreadB" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f472b6" />
        </marker>
      </defs>

      {/* Thread 1 Node */}
      <g transform="translate(20, 20)">
        <rect width="150" height="60" rx="10" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
        <text x="75" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Thread-A (ATM 1)</text>
        <text x="75" y="46" fill="#bae6fd" fontSize="10" textAnchor="middle">withdraw(₹3000)</text>
      </g>

      {/* Thread 2 Node */}
      <g transform="translate(20, 95)">
        <rect width="150" height="60" rx="10" fill="#be185d" stroke="#f472b6" strokeWidth="2" />
        <text x="75" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Thread-B (ATM 2)</text>
        <text x="75" y="46" fill="#fbcfe8" fontSize="10" textAnchor="middle">withdraw(₹3000)</text>
      </g>

      {/* Arrows */}
      <path d="M 175 50 C 220 50, 240 70, 275 75" fill="none" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrThread)" />
      <path d="M 175 125 C 220 125, 240 105, 275 95" fill="none" stroke="#f472b6" strokeWidth="3" markerEnd="url(#arrThreadB)" />

      {/* Monitor Lock Center */}
      <g transform="translate(285, 20)">
        <rect
          width="180"
          height="135"
          rx="12"
          fill={syncEnabled ? '#064e3b' : '#7f1d1d'}
          stroke={syncEnabled ? '#10b981' : '#ef4444'}
          strokeWidth="2.5"
        />
        <text x="90" y="28" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
          {syncEnabled ? '🔒 Monitor Lock Acquired' : '🔓 Unsynchronized Critical Section'}
        </text>
        <text x="90" y="48" fill={syncEnabled ? '#a7f3d0' : '#fecaca'} fontSize="10" textAnchor="middle">
          {syncEnabled ? 'Mutual Exclusion (Mutex) ACTIVE' : 'RACE CONDITION COLLISION!'}
        </text>
        <rect x="15" y="60" width="150" height="60" rx="6" fill="#0f172a" fillOpacity="0.7" />
        <text x="90" y="80" fill="#ffffff" fontSize="10" textAnchor="middle">
          {syncEnabled ? '✓ Thread-A executes exclusively' : '✗ Simultaneous Overlapping Writes'}
        </text>
        <text x="90" y="98" fill={syncEnabled ? '#6ee7b7' : '#fca5a5'} fontSize="9" textAnchor="middle">
          {syncEnabled ? 'Thread-B is BLOCKED in Entry Set' : 'Stale Read & Lost Update Bug!'}
        </text>
      </g>

      {/* Target Shared Memory */}
      <g transform="translate(515, 30)">
        <rect width="180" height="115" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
        <text x="90" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">JVM Heap Shared Memory</text>
        <rect x="15" y="40" width="150" height="60" rx="6" fill="#0f172a" />
        <text x="90" y="62" fill="#c7d2fe" fontSize="11" textAnchor="middle">Account.balance</text>
        <text x="90" y="85" fill={syncEnabled ? '#34d399' : '#f87171'} fontSize="12" fontWeight="bold" textAnchor="middle">
          {syncEnabled ? '₹4,000 (Consistent)' : '₹7,000 (Corrupted!)'}
        </text>
      </g>
    </svg>
  );
}

// ─── SVG DIAGRAM 3: JAVA NIO BUFFER STATE MACHINE ───
function NioBufferSvg({ position, limit, capacity, mode }: { position: number; limit: number; capacity: number; mode: string }) {
  const cellWidth = 55;
  return (
    <svg viewBox="0 0 680 160" className="w-full h-auto bg-slate-950/90 rounded-xl border border-slate-800 p-2" role="img" aria-label="Java NIO ByteBuffer Anatomy and Pointer Diagram">
      <text x="20" y="25" fill="#e2e8f0" fontSize="13" fontWeight="bold">
        Java NIO ByteBuffer Architecture [Mode: <tspan fill={mode === 'write' ? '#f59e0b' : '#38bdf8'}>{mode.toUpperCase()}</tspan>]
      </text>
      <text x="450" y="25" fill="#94a3b8" fontSize="11">
        flip(): limit=pos, pos=0 | clear(): pos=0, lim=cap
      </text>

      {/* Buffer Array Frame */}
      <g transform="translate(20, 45)">
        {Array.from({ length: capacity }).map((_, i) => {
          const isWritten = i < position;
          const isReadable = mode === 'read' && i < limit;
          const isAccessible = i < limit;
          return (
            <g key={i} transform={`translate(${i * cellWidth}, 0)`}>
              <rect
                width={cellWidth - 4}
                height="50"
                rx="6"
                fill={
                  i === position
                    ? '#4338ca'
                    : isAccessible
                    ? isReadable || isWritten
                      ? '#1e293b'
                      : '#0f172a'
                    : '#020617'
                }
                stroke={i === position ? '#818cf8' : i === limit ? '#f43f5e' : '#334155'}
                strokeWidth={i === position ? 2.5 : 1.5}
              />
              <text x={cellWidth / 2 - 2} y="22" fill="#64748b" fontSize="10" textAnchor="middle">
                [{i}]
              </text>
              <text x={cellWidth / 2 - 2} y="40" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
                {isWritten ? String.fromCharCode(65 + i) : '0x00'}
              </text>
            </g>
          );
        })}
      </g>

      {/* Pointers: Position, Limit, Capacity */}
      <g transform="translate(20, 105)">
        {/* Position Pointer */}
        <g transform={`translate(${position * cellWidth + cellWidth / 2 - 2}, 0)`}>
          <polygon points="0,0 -6,10 6,10" fill="#818cf8" />
          <text x="0" y="24" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">
            ▲ position={position}
          </text>
        </g>

        {/* Limit Pointer */}
        {limit !== position && (
          <g transform={`translate(${limit * cellWidth + cellWidth / 2 - 2}, 0)`}>
            <polygon points="0,0 -6,10 6,10" fill="#f43f5e" />
            <text x="0" y="24" fill="#fda4af" fontSize="10" fontWeight="bold" textAnchor="middle">
              ▲ limit={limit}
            </text>
          </g>
        )}

        {/* Capacity Marker */}
        <g transform={`translate(${capacity * cellWidth - 10}, 0)`}>
          <text x="0" y="24" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="end">
            capacity={capacity} ▕
          </text>
        </g>
      </g>
    </svg>
  );
}

// ─── MAIN SIMULATION COMPONENT ───
export function C12_ComputerScienceJavaStreamFilterSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_CS_021,
  title = DEFAULT_PROPS.title || 'Java Stream API & Enterprise Architecture',
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
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints & feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Feedback FX
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Prediction & Observation Interactive States
  const [activePredictionIdx, setActivePredictionIdx] = useState<number | null>(null);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [activeObservationIdx, setActiveObservationIdx] = useState<number | null>(null);
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Challenge drag / numeric / construct states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── INTERACTIVE LAB STATES ───
  // 1. Stream Lab
  const [streamFilterThreshold, setStreamFilterThreshold] = useState(40);
  const [streamMapBonus, setStreamMapBonus] = useState(10);
  const [streamCollectorType, setStreamCollectorType] = useState<'toList' | 'toSet' | 'sumReduce'>('toList');
  const rawStreamData = useMemo(() => [25, 42, 55, 68, 38, 91, 55, 74], []);

  const streamProcessedData = useMemo(() => {
    const filtered = rawStreamData.filter(x => x >= streamFilterThreshold);
    const mapped = filtered.map(x => x + streamMapBonus);
    let resultDesc = '';
    if (streamCollectorType === 'toList') {
      resultDesc = `List: [${mapped.join(', ')}] (Size: ${mapped.length})`;
    } else if (streamCollectorType === 'toSet') {
      const unique = Array.from(new Set(mapped));
      resultDesc = `Set: {${unique.join(', ')}} (Size: ${unique.length})`;
    } else {
      const sum = mapped.reduce((a, b) => a + b, 0);
      resultDesc = `Sum (reduce): ${sum}`;
    }
    return { filtered, mapped, resultDesc };
  }, [rawStreamData, streamFilterThreshold, streamMapBonus, streamCollectorType]);

  // 2. Multithreading Lab
  const [threadSyncEnabled, setThreadSyncEnabled] = useState(false);
  const [threadAccountBalance, setThreadAccountBalance] = useState(10000);
  const [threadLog, setThreadLog] = useState<string[]>([]);
  const [isThreadsRunning, setIsThreadsRunning] = useState(false);

  // 3. SQL Lab
  const [sqlMode, setSqlMode] = useState<'statement' | 'prepared'>('statement');
  const [sqlUserInput, setSqlUserInput] = useState("admin' OR '1'='1");
  const [sqlQueryResult, setSqlQueryResult] = useState<{ status: string; rows: number; msg: string }>({
    status: 'idle',
    rows: 0,
    msg: 'Enter input and execute query',
  });

  // 4. NIO Buffer Lab
  const [nioCapacity] = useState(8);
  const [nioBufferData, setNioBufferData] = useState<string[]>([]);
  const [nioPosition, setNioPosition] = useState(0);
  const [nioLimit, setNioLimit] = useState(8);
  const [nioMode, setNioMode] = useState<'write' | 'read'>('write');

  // 5. Functional & Optional Lab
  const [optValue, setOptValue] = useState<string | null>('Aditya Sharma');
  const [optFallback, setOptFallback] = useState('Guest Student');

  // BKT state ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE CHALLENGE FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── BKT & MASTERY EFFECTS ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS STREAM PACKET ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; val: number; speed: number; color: string }[] = [];

    for (let i = 0; i < 12; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: 15 + Math.random() * 15,
        val: Math.floor(Math.random() * 90) + 10,
        speed: 1 + Math.random() * 1.5,
        color: ['#38bdf8', '#818cf8', '#34d399', '#f472b6'][Math.floor(Math.random() * 4)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background stream line
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, 22);
      ctx.lineTo(canvas.width, 22);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw flowing packets
      particles.forEach(p => {
        p.x += p.speed;
        if (p.x > canvas.width) p.x = 0;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, 22, 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(String(p.val), p.x, 25);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentSlide]);

  // ─── ESCALATING HINTS CALLBACK ───
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
      setShowExplanation(true);
      setShowHint(false);
    }
  }, [hintCount, challenge]);

  // ─── INACTIVITY AUTO-HINT ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You completed the enterprise Java simulation with score ${finalScore}%!`);
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE CALLBACK ───
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

  // ─── ANSWER SUBMISSION CALLBACK ───
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(num - (challenge.correctAnswer ?? 0)) <= (challenge.tolerance ?? 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState ?? '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent Java architecture understanding.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
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
        speechManager.speak('Hints exhausted. Let us review the complete step-by-step logic.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, resetInactivityTimer, showNextHint]);

  // ─── DRAG & DROP CALLBACKS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('pop');
    setDraggedItem(null);
  }, [draggedItem]);

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

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── DISCOVERY CALLBACK ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on! Streams are lazy pipelines.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── NAVIGATION CALLBACKS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Java Lab. Step through each concept.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free Sandbox mode active. Experiment with all interactive systems.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Ready for Architecture Challenges! Adaptive grading active.');
  }, []);

  // ─── THREAD SIMULATION CALLBACK ───
  const runThreadSimulation = useCallback(() => {
    if (isThreadsRunning) return;
    setIsThreadsRunning(true);
    setThreadLog([]);
    setThreadAccountBalance(10000);
    audioManager.play('tap');

    const amount = 3000;
    let localBal = 10000;

    setThreadLog(prev => [...prev, `[INIT] Shared Account Balance: ₹${localBal}`]);

    setTimeout(() => {
      if (threadSyncEnabled) {
        setThreadLog(prev => [...prev, `[Thread-A] Acquired monitor lock on Account`]);
        setThreadLog(prev => [...prev, `[Thread-A] Read balance ₹10000, subtracting ₹${amount}...`]);
        localBal -= amount;
        setThreadAccountBalance(localBal);
        setThreadLog(prev => [...prev, `[Thread-A] Wrote balance ₹${localBal}, Released monitor lock.`]);

        setTimeout(() => {
          setThreadLog(prev => [...prev, `[Thread-B] Acquired monitor lock on Account`]);
          setThreadLog(prev => [...prev, `[Thread-B] Read balance ₹${localBal}, subtracting ₹${amount}...`]);
          localBal -= amount;
          setThreadAccountBalance(localBal);
          setThreadLog(prev => [...prev, `[Thread-B] Wrote balance ₹${localBal}, Released monitor lock.`]);
          setThreadLog(prev => [...prev, `[SUCCESS] Atomic Execution! Final Balance: ₹${localBal}`]);
          setIsThreadsRunning(false);
          audioManager.play('success');
        }, 600);
      } else {
        setThreadLog(prev => [...prev, `[Thread-A] (No Lock) Read balance ₹10000`]);
        setThreadLog(prev => [...prev, `[Thread-B] (No Lock) Read balance ₹10000 [RACE COLLISION!]`]);
        setTimeout(() => {
          setThreadLog(prev => [...prev, `[Thread-A] Wrote updated balance ₹${10000 - amount}`]);
          setThreadAccountBalance(10000 - amount);
          setTimeout(() => {
            setThreadLog(prev => [...prev, `[Thread-B] Overwrote using stale initial ₹10000 -> wrote ₹${10000 - amount}!`]);
            setThreadLog(prev => [...prev, `[ALERT] RACE CONDITION! ₹3000 LOST due to lack of synchronization!`]);
            setThreadAccountBalance(10000 - amount);
            setIsThreadsRunning(false);
            audioManager.play('error');
          }, 500);
        }, 500);
      }
    }, 400);
  }, [isThreadsRunning, threadSyncEnabled]);

  // ─── SQL EXECUTE CALLBACK ───
  const executeSqlQuery = useCallback(() => {
    audioManager.play('tap');
    if (sqlMode === 'statement') {
      if (sqlUserInput.includes("' OR '1'='1") || sqlUserInput.includes("' or '1'='1")) {
        setSqlQueryResult({
          status: 'vulnerable',
          rows: 4500,
          msg: 'SQL INJECTION SUCCESSFUL! Query evaluated: WHERE user = \'\' OR \'1\'=\'1\'. Leaked ALL 4,500 customer records!',
        });
        audioManager.play('error');
      } else {
        setSqlQueryResult({
          status: 'normal',
          rows: sqlUserInput === 'admin' ? 1 : 0,
          msg: `Executed Statement query: Found ${sqlUserInput === 'admin' ? 1 : 0} matching record(s).`,
        });
        audioManager.play('pop');
      }
    } else {
      if (sqlUserInput === 'admin') {
        setSqlQueryResult({
          status: 'secure',
          rows: 1,
          msg: 'PreparedStatement bound parameter safe: 1 record matched.',
        });
        audioManager.play('success');
      } else {
        setSqlQueryResult({
          status: 'secure',
          rows: 0,
          msg: `PreparedStatement safe: Treated "${sqlUserInput}" purely as literal data. 0 records found. Attack thwarted!`,
        });
        audioManager.play('drop-correct');
      }
    }
  }, [sqlMode, sqlUserInput]);

  // ─── NIO BUFFER ACTION CALLBACKS ───
  const handleNioWrite = useCallback(() => {
    if (nioPosition >= nioLimit || nioMode !== 'write') {
      audioManager.play('error');
      return;
    }
    const byteChar = String.fromCharCode(65 + nioPosition);
    setNioBufferData(prev => {
      const next = [...prev];
      next[nioPosition] = byteChar;
      return next;
    });
    setNioPosition(p => p + 1);
    audioManager.play('tap');
  }, [nioPosition, nioLimit, nioMode]);

  const handleNioFlip = useCallback(() => {
    audioManager.play('whoosh');
    setNioLimit(nioPosition);
    setNioPosition(0);
    setNioMode('read');
    speechManager.speak('Buffer flipped! Mode switched to Read. Position at 0, Limit set to previous write count.');
  }, [nioPosition]);

  const handleNioClear = useCallback(() => {
    audioManager.play('pop');
    setNioPosition(0);
    setNioLimit(nioCapacity);
    setNioBufferData([]);
    setNioMode('write');
    speechManager.speak('Buffer cleared! Position at 0, Limit at capacity. Ready for new writes.');
  }, [nioCapacity]);

  const handleNioRead = useCallback(() => {
    if (nioPosition >= nioLimit || nioMode !== 'read') {
      audioManager.play('error');
      return;
    }
    audioManager.play('count');
    setNioPosition(p => p + 1);
  }, [nioPosition, nioLimit, nioMode]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700/50" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase text-gold-400">ISC Class 12 CS</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">NEP 2020 Compliant</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Dynamic Status Badges */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">BKT Mastery</span>
            <span className="text-xs font-bold capitalize text-emerald-400">✓ {masteryLevel}</span>
          </div>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/50'
                : difficulty === 'advanced'
                ? 'bg-rose-950/80 text-rose-300 border-rose-600/50'
                : 'bg-gold-950/80 text-gold-300 border-gold-600/50'
            }`}
          >
            {difficulty === 'foundation' ? '🟢 FOUNDATION' : difficulty === 'advanced' ? '🔴 ADVANCED' : '🔵 STANDARD'}
          </motion.span>
        </div>
      </div>

      {/* ─── LIVE DATA STREAM CANVAS ─── */}
      <div className="my-3 p-2 bg-slate-900/60 rounded-xl border border-slate-800/80 flex items-center gap-3">
        <span className="text-xs text-gold-400 font-mono font-semibold whitespace-nowrap pl-2">Stream Pipeline Engine:</span>
        <canvas ref={canvasRef} width={500} height={44} className="w-full max-h-11 rounded-lg" aria-label="Dynamic Stream Token Visualizer" />
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 my-4">
          <div className="p-5 bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-900 rounded-2xl border border-gold-700/40">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-700/50">
                Narrative Mission
              </span>
              <h2 className="text-lg font-bold text-white">{SCENARIO.title}</h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300/80 mt-2 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-gold-300 font-bold text-sm">
              <span>🎯 Curiosity Check:</span>
              <span className="text-xs font-normal text-slate-400">(Warm up your intuition — not graded)</span>
            </div>
            <p className="text-base font-semibold text-white leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-2.5">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 text-slate-400 border border-transparent'
                      : 'bg-slate-800 hover:bg-gold-950/60 text-slate-200 border border-slate-700/80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-700/80 flex items-center justify-center text-xs font-bold text-slate-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                    {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex && (
                      <span className="ml-auto text-emerald-400 font-bold">✓ Correct</span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3">
                <p className={`text-sm font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Streams are lazy pipelines.' : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter Interactive Lab"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-600/30 flex items-center gap-2"
                >
                  <span>Enter Interactive Lab</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 my-3">
          {/* Top exploration progress bar */}
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
              Interactive Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <span className="text-xs text-slate-400">{EXPLORATION_STEPS[currentSlide].title}</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-emerald-400"
              animate={{ width: `${((currentSlide + 1) / EXPLORATION_STEPS.length) * 100}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div>
                <h2 className="text-lg font-extrabold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
                <p className="text-xs text-amber-300 mt-1 flex items-center gap-1">
                  <span>👉</span>
                  <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
                </p>
              </div>

              {/* ── PREDICTION CALLOUT IN LAB (Step 0 & Step 1) ── */}
              {currentSlide === 0 && (
                <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-700/50 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gold-600 text-white">
                      Prediction 1
                    </span>
                    <span className="text-xs font-semibold text-gold-200">Predict Before Interacting:</span>
                  </div>
                  <p className="text-xs text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setPredictionAnswers(prev => ({ ...prev, 0: i }));
                          audioManager.play(i === PREDICTION_QUESTIONS[0].correctIndex ? 'success' : 'pop');
                        }}
                        className={`p-2 rounded-lg text-xs font-medium border text-left transition-all ${
                          predictionAnswers[0] !== undefined
                            ? i === PREDICTION_QUESTIONS[0].correctIndex
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                              : predictionAnswers[0] === i
                              ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                              : 'bg-slate-900/60 border-slate-800 text-slate-500'
                            : 'bg-slate-900 border-slate-700 hover:border-gold-500 text-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {predictionAnswers[0] !== undefined && (
                    <p className="text-[11px] text-amber-300 font-medium">
                      💡 <strong>Verify:</strong> {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </p>
                  )}
                </div>
              )}

              {currentSlide === 1 && (
                <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-700/50 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gold-600 text-white">
                      Prediction 2
                    </span>
                    <span className="text-xs font-semibold text-gold-200">Predict Before Interacting:</span>
                  </div>
                  <p className="text-xs text-slate-200">{PREDICTION_QUESTIONS[1].question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setPredictionAnswers(prev => ({ ...prev, 1: i }));
                          audioManager.play(i === PREDICTION_QUESTIONS[1].correctIndex ? 'success' : 'pop');
                        }}
                        className={`p-2 rounded-lg text-xs font-medium border text-left transition-all ${
                          predictionAnswers[1] !== undefined
                            ? i === PREDICTION_QUESTIONS[1].correctIndex
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                              : predictionAnswers[1] === i
                              ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                              : 'bg-slate-900/60 border-slate-800 text-slate-500'
                            : 'bg-slate-900 border-slate-700 hover:border-gold-500 text-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {predictionAnswers[1] !== undefined && (
                    <p className="text-[11px] text-amber-300 font-medium">
                      💡 <strong>Verify:</strong> {PREDICTION_QUESTIONS[1].verifyInstruction}
                    </p>
                  )}
                </div>
              )}

              {/* ── SLIDE 0: STREAM API PIPELINE LAB ── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {/* Representation 1: Topic-Specific SVG Architectural Flow */}
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-400">Representation A: Visual Stream Architecture Diagram</span>
                    <StreamPipelineSvg threshold={streamFilterThreshold} bonus={streamMapBonus} />
                  </div>

                  {/* Representation 2: Code Declaration & Sliders */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-xs font-mono text-gold-400 mb-2">// Representation B: Java Stream Pipeline Code</div>
                    <div className="font-mono text-xs text-slate-200 bg-slate-900 p-3 rounded-lg border border-slate-800 overflow-x-auto leading-relaxed">
                      scores.stream()<br />
                      &nbsp;&nbsp;.filter(m -&gt; m &gt;= <span className="text-amber-400 font-bold">{streamFilterThreshold}</span>)<br />
                      &nbsp;&nbsp;.map(m -&gt; m + <span className="text-emerald-400 font-bold">{streamMapBonus}</span>)<br />
                      &nbsp;&nbsp;.collect(Collectors.<span className="text-gold-400 font-bold">{streamCollectorType}</span>());
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <label htmlFor="filterRange" className="text-xs text-slate-400 flex justify-between">
                        <span>Filter Threshold:</span>
                        <span className="text-amber-400 font-mono font-bold">&gt;= {streamFilterThreshold}</span>
                      </label>
                      <input
                        id="filterRange"
                        aria-label="Stream Filter Threshold Slider"
                        type="range"
                        min={0}
                        max={80}
                        step={5}
                        value={streamFilterThreshold}
                        onChange={e => {
                          setStreamFilterThreshold(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-amber-400"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <label htmlFor="mapBonusRange" className="text-xs text-slate-400 flex justify-between">
                        <span>Map Bonus:</span>
                        <span className="text-emerald-400 font-mono font-bold">+{streamMapBonus}</span>
                      </label>
                      <input
                        id="mapBonusRange"
                        aria-label="Stream Map Multiplier Bonus Slider"
                        type="range"
                        min={0}
                        max={30}
                        step={5}
                        value={streamMapBonus}
                        onChange={e => {
                          setStreamMapBonus(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-400"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <label className="text-xs text-slate-400">Terminal Collector:</label>
                      <div className="flex gap-1">
                        {(['toList', 'toSet', 'sumReduce'] as const).map(type => (
                          <motion.button
                            key={type}
                            aria-label={`Select Collector ${type}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setStreamCollectorType(type);
                              audioManager.play('pop');
                            }}
                            className={`flex-1 py-1 text-[11px] font-mono rounded font-bold ${
                              streamCollectorType === type
                                ? 'bg-gold-600 text-white'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                          >
                            {type}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Representation 3: Live Element-by-Element Transformation Table */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-semibold text-slate-400">Representation C: Element-by-Element Transformation Matrix</span>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400">
                            <th className="py-1 px-2">Input</th>
                            <th className="py-1 px-2">Filter (&gt;={streamFilterThreshold})</th>
                            <th className="py-1 px-2">Map (+{streamMapBonus})</th>
                            <th className="py-1 px-2">Pipelined Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rawStreamData.map((val, idx) => {
                            const passes = val >= streamFilterThreshold;
                            return (
                              <tr key={idx} className="border-b border-slate-900/80 hover:bg-slate-900/40">
                                <td className="py-1 px-2 text-slate-200">{val}</td>
                                <td className={`py-1 px-2 font-bold ${passes ? 'text-emerald-400' : 'text-rose-400'}`}>
                                  {passes ? '✓ Pass' : '✗ Drop'}
                                </td>
                                <td className="py-1 px-2 text-gold-300">{passes ? val + streamMapBonus : '—'}</td>
                                <td className="py-1 px-2 text-slate-400">
                                  {passes ? '✓ Collected in Terminal' : '✗ Short-circuited'}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 1: THREAD RACE CONDITIONS & MUTEX ── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* Representation A: Topic-Specific SVG Thread Mutex Model */}
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-400">Representation A: Thread Monitor & Memory Mutex Diagram</span>
                    <ThreadMonitorSvg syncEnabled={threadSyncEnabled} />
                  </div>

                  {/* Representation B: Controls & Execution Log */}
                  <div className="flex flex-wrap items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-300 font-semibold">Synchronization Monitor:</span>
                      <motion.button
                        aria-label={threadSyncEnabled ? 'Disable Synchronization' : 'Enable Synchronization'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setThreadSyncEnabled(!threadSyncEnabled);
                          audioManager.play('pop');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          threadSyncEnabled
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                            : 'bg-rose-900/60 text-rose-300 border border-rose-700'
                        }`}
                      >
                        {threadSyncEnabled ? '✓ 🔒 synchronized(this) ENABLED' : '✗ 🔓 NO SYNCHRONIZATION (UNSAFE)'}
                      </motion.button>
                    </div>

                    <motion.button
                      aria-label="Spawn Concurrent ATM Threads"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={runThreadSimulation}
                      disabled={isThreadsRunning}
                      className="px-4 py-1.5 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold"
                    >
                      {isThreadsRunning ? 'Threads Simulating...' : '▶ Spawn Concurrent ATM Threads'}
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-xs text-slate-400 uppercase font-semibold">Shared Bank Account State</div>
                      <div className="mt-2 text-2xl font-black font-mono text-emerald-400">₹{threadAccountBalance}</div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Initial: ₹10,000 | Two withdrawals of ₹3,000 each.
                        <br />
                        Expected final balance: <span className="text-emerald-300 font-bold">₹4,000</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 max-h-40 overflow-y-auto font-mono text-[11px] space-y-1">
                      <div className="text-xs text-slate-400 font-sans font-semibold mb-1">JVM Thread Scheduler Log:</div>
                      {threadLog.length === 0 && <div className="text-slate-600 italic">Click "Spawn Concurrent ATM Threads" to run.</div>}
                      {threadLog.map((line, i) => (
                        <div
                          key={i}
                          className={
                            line.includes('ALERT') || line.includes('RACE')
                              ? 'text-rose-400 font-bold'
                              : line.includes('SUCCESS')
                              ? 'text-emerald-400 font-bold'
                              : line.includes('Thread-A')
                              ? 'text-gold-300'
                              : 'text-amber-300'
                          }
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 2: SQL INJECTION VS PREPAREDSTATEMENT ── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* Observation Question Callout */}
                  <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-700/50 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white">
                        Observation Check
                      </span>
                      <span className="text-xs font-semibold text-emerald-200">What do you notice?</span>
                    </div>
                    <p className="text-xs text-slate-200">{OBSERVATION_QUESTIONS[1].question}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {OBSERVATION_QUESTIONS[1].options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setObservationAnswers(prev => ({ ...prev, 1: i }));
                            audioManager.play(i === OBSERVATION_QUESTIONS[1].correctIndex ? 'success' : 'pop');
                          }}
                          className={`p-2 rounded-lg text-xs font-medium border text-left transition-all ${
                            observationAnswers[1] !== undefined
                              ? i === OBSERVATION_QUESTIONS[1].correctIndex
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                                : observationAnswers[1] === i
                                ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                                : 'bg-slate-900/60 border-slate-800 text-slate-500'
                              : 'bg-slate-900 border-slate-700 hover:border-gold-500 text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {observationAnswers[1] !== undefined && (
                      <p className="text-[11px] text-emerald-300 font-medium">
                        ✓ {OBSERVATION_QUESTIONS[1].explanation}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <label className="text-xs text-slate-300 font-semibold">1. Choose JDBC Query Mechanism:</label>
                      <div className="flex gap-2">
                        <motion.button
                          aria-label="Select Raw Statement Mode"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSqlMode('statement');
                            audioManager.play('pop');
                          }}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg ${
                            sqlMode === 'statement'
                              ? 'bg-rose-900/80 text-rose-200 border-2 border-rose-500'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          ✗ Raw Statement (Unsafe)
                        </motion.button>
                        <motion.button
                          aria-label="Select PreparedStatement Mode"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSqlMode('prepared');
                            audioManager.play('pop');
                          }}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg ${
                            sqlMode === 'prepared'
                              ? 'bg-emerald-900/80 text-emerald-200 border-2 border-emerald-500'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          ✓ PreparedStatement (Safe)
                        </motion.button>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <label htmlFor="sqlInput" className="text-xs text-slate-300 font-semibold">2. Enter Username Input Payload:</label>
                      <div className="flex gap-2">
                        <input
                          id="sqlInput"
                          aria-label="Username or SQL Injection Input Payload"
                          type="text"
                          value={sqlUserInput}
                          onChange={e => setSqlUserInput(e.target.value)}
                          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-amber-300 font-mono"
                        />
                        <motion.button
                          aria-label="Execute SQL Query"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={executeSqlQuery}
                          className="px-3 py-1 bg-gold-600 text-white rounded-lg text-xs font-bold"
                        >
                          Execute SQL
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                    <div className="text-slate-400">Generated Query Transmitted to MySQL Engine:</div>
                    {sqlMode === 'statement' ? (
                      <div className="p-2.5 bg-rose-950/30 rounded border border-rose-800/50 text-rose-300">
                        SELECT * FROM users WHERE username = '<span className="text-amber-400 font-bold">{sqlUserInput}</span>' AND password = 'xxx';
                      </div>
                    ) : (
                      <div className="p-2.5 bg-emerald-950/30 rounded border border-emerald-800/50 text-emerald-300">
                        Template: SELECT * FROM users WHERE username = ? AND password = ?
                        <br />
                        Bound Parameter [1] Literal: "<span className="text-amber-400 font-bold">{sqlUserInput}</span>"
                      </div>
                    )}

                    <div
                      className={`p-3 rounded-lg mt-2 text-xs font-sans font-semibold ${
                        sqlQueryResult.status === 'vulnerable'
                          ? 'bg-rose-900/50 text-rose-200 border border-rose-600'
                          : sqlQueryResult.status === 'secure'
                          ? 'bg-emerald-900/50 text-emerald-200 border border-emerald-600'
                          : 'bg-slate-900 text-slate-300'
                      }`}
                    >
                      {sqlQueryResult.msg}
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 3: JAVA NIO BUFFER LAB ── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* Observation Question Callout */}
                  <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-700/50 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white">
                        Observation Check
                      </span>
                      <span className="text-xs font-semibold text-emerald-200">What do you notice when flip() is called?</span>
                    </div>
                    <p className="text-xs text-slate-200">{OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[0].options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setObservationAnswers(prev => ({ ...prev, 0: i }));
                            audioManager.play(i === OBSERVATION_QUESTIONS[0].correctIndex ? 'success' : 'pop');
                          }}
                          className={`p-2 rounded-lg text-xs font-medium border text-left transition-all ${
                            observationAnswers[0] !== undefined
                              ? i === OBSERVATION_QUESTIONS[0].correctIndex
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                                : observationAnswers[0] === i
                                ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                                : 'bg-slate-900/60 border-slate-800 text-slate-500'
                              : 'bg-slate-900 border-slate-700 hover:border-gold-500 text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {observationAnswers[0] !== undefined && (
                      <p className="text-[11px] text-emerald-300 font-medium">
                        ✓ {OBSERVATION_QUESTIONS[0].explanation}
                      </p>
                    )}
                  </div>

                  {/* Representation A: Topic-Specific SVG Buffer Diagram */}
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-400">Representation A: ByteBuffer Memory Pointers (SVG Model)</span>
                    <NioBufferSvg position={nioPosition} limit={nioLimit} capacity={nioCapacity} mode={nioMode} />
                  </div>

                  {/* Representation B: Interactive Memory Cells and Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-4 text-xs font-mono">
                      <span>
                        Mode: <strong className={nioMode === 'write' ? 'text-amber-400' : 'text-gold-400'}>{nioMode.toUpperCase()}</strong>
                      </span>
                      <span>
                        Position: <strong className="text-gold-400">{nioPosition}</strong>
                      </span>
                      <span>
                        Limit: <strong className="text-rose-400">{nioLimit}</strong>
                      </span>
                      <span>
                        Capacity: <strong className="text-emerald-400">{nioCapacity}</strong>
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        aria-label="Write Next Byte into NIO Buffer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNioWrite}
                        disabled={nioMode !== 'write' || nioPosition >= nioLimit}
                        className="px-3 py-1 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white rounded-lg text-xs font-bold"
                      >
                        + Write Byte
                      </motion.button>
                      <motion.button
                        aria-label="Flip NIO Buffer into Read Mode"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNioFlip}
                        disabled={nioMode === 'read'}
                        className="px-3 py-1 bg-gold-600 hover:bg-gold-500 disabled:opacity-40 text-white rounded-lg text-xs font-bold"
                      >
                        flip() to Read
                      </motion.button>
                      <motion.button
                        aria-label="Read Byte from NIO Buffer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNioRead}
                        disabled={nioMode !== 'read' || nioPosition >= nioLimit}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-lg text-xs font-bold"
                      >
                        read() Byte
                      </motion.button>
                      <motion.button
                        aria-label="Clear NIO Buffer and Reset Pointers"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNioClear}
                        className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold"
                      >
                        clear()
                      </motion.button>
                    </div>
                  </div>

                  {/* Visual Buffer Slot Array */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-xs font-semibold text-slate-400 mb-2">Representation B: Direct Memory Slot Grid</div>
                    <div className="grid grid-cols-8 gap-1.5">
                      {Array.from({ length: nioCapacity }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border text-center font-mono ${
                            idx === nioPosition
                              ? 'border-gold-400 bg-gold-950/60 text-gold-200 ring-2 ring-gold-500'
                              : idx < nioLimit
                              ? 'border-slate-700 bg-slate-900 text-slate-200'
                              : 'border-slate-800 bg-slate-950 text-slate-600'
                          }`}
                        >
                          <div className="text-[9px] text-slate-500">[{idx}]</div>
                          <div className="text-base font-bold my-0.5">{nioBufferData[idx] || '·'}</div>
                          <div className="text-[8px] uppercase tracking-tighter">
                            {idx === nioPosition ? 'POS' : idx === nioLimit ? 'LIM' : ''}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 4: FUNCTIONAL INTERFACES & OPTIONAL ── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <label className="text-xs text-slate-300 font-semibold">1. Optional&lt;String&gt; Inner State:</label>
                      <div className="flex gap-2">
                        <motion.button
                          aria-label="Set Optional State to Present Value"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setOptValue('Aditya Sharma');
                            audioManager.play('pop');
                          }}
                          className={`flex-1 py-1 text-xs font-bold rounded ${
                            optValue !== null ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          ✓ Present ("Aditya Sharma")
                        </motion.button>
                        <motion.button
                          aria-label="Set Optional State to Empty Null"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setOptValue(null);
                            audioManager.play('pop');
                          }}
                          className={`flex-1 py-1 text-xs font-bold rounded ${
                            optValue === null ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          ✗ Empty (null)
                        </motion.button>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <label htmlFor="fallbackInput" className="text-xs text-slate-300 font-semibold">2. Supplier Fallback Default:</label>
                      <input
                        id="fallbackInput"
                        aria-label="Supplier Fallback Default String"
                        type="text"
                        value={optFallback}
                        onChange={e => setOptFallback(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                    <div className="text-gold-400">// Java Code Evaluation Output</div>
                    <div className="p-2.5 bg-slate-900 rounded border border-slate-800 text-slate-200">
                      Optional&lt;String&gt; opt = Optional.ofNullable({optValue ? `"${optValue}"` : 'null'});
                      <br />
                      String name = opt.orElse("{optFallback}");
                      <br />
                      <span className="text-emerald-400 font-bold font-sans mt-2 inline-block">
                        ➔ Evaluated Result: "{optValue ? optValue : optFallback}" (Zero NullPointerException!)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide Navigation Bar */}
              <div className="flex items-center justify-between pt-2">
                <motion.button
                  aria-label="Go to Previous Lab Step"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
                >
                  ← Previous Lab
                </motion.button>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    aria-label="Go to Next Lab Step"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('whoosh');
                    }}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>Next Lab Step</span>
                    <span>→</span>
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Proceed to Sandbox Mode"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-1.5"
                  >
                    <span>Proceed to Sandbox</span>
                    <span>→</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 my-3">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-extrabold text-white">Free Sandbox & Architecture Playground</h2>
              <p className="text-xs text-slate-400">Tweak all variables with zero grading pressure before taking on graded challenges.</p>
            </div>
            <motion.button
              aria-label="Proceed to Challenge Mode"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          {/* Sandbox Combined Multi-representation Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-gold-400 uppercase">Interactive Stream Builder</span>
              <div className="flex gap-2">
                <input
                  aria-label="Sandbox Stream Filter Slider"
                  type="range"
                  min={10}
                  max={70}
                  step={10}
                  value={streamFilterThreshold}
                  onChange={e => setStreamFilterThreshold(Number(e.target.value))}
                  className="w-full accent-gold-400"
                />
              </div>
              <div className="text-xs font-mono text-slate-300">
                Filter &gt;= {streamFilterThreshold} ➔ [{streamProcessedData.filtered.join(', ')}]
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase">Java NIO Buffer Quick Control</span>
              <div className="flex gap-2">
                <button aria-label="Write byte in sandbox" onClick={handleNioWrite} className="px-2.5 py-1 bg-amber-600 rounded text-xs font-bold">Write</button>
                <button aria-label="Flip buffer in sandbox" onClick={handleNioFlip} className="px-2.5 py-1 bg-gold-600 rounded text-xs font-bold">flip()</button>
                <button aria-label="Read byte in sandbox" onClick={handleNioRead} className="px-2.5 py-1 bg-emerald-600 rounded text-xs font-bold">Read</button>
                <button aria-label="Clear buffer in sandbox" onClick={handleNioClear} className="px-2.5 py-1 bg-slate-700 rounded text-xs font-bold">Clear</button>
              </div>
              <div className="text-xs font-mono text-slate-300">
                Pos: {nioPosition} | Lim: {nioLimit} | Mode: {nioMode}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE SUITE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 my-3">
          {/* Challenge header bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-gold-400 font-bold uppercase tracking-wider">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-xs text-slate-400 ml-2">
                [Competency: <strong className="text-slate-200 capitalize">{challenge.competencyLevel}</strong>]
              </span>
            </div>

            <div className="flex items-center gap-2">
              {hintCount < 3 && !showExplanation && (
                <motion.button
                  aria-label={`Request Hint. Hint ${hintCount} of 3 used.`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={showNextHint}
                  className="px-3 py-1 bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-700/50 rounded-lg text-xs font-semibold"
                >
                  💡 Request Hint ({hintCount}/3)
                </motion.button>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-gold-400 to-emerald-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Main Challenge Card */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-white leading-snug">{challenge.question}</h2>

            {/* 1. MCQ rendering */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                      wrongFlash
                        ? 'bg-rose-950/80 border-2 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-gold-950/60 text-slate-200 border border-slate-700/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-slate-700/80 flex items-center justify-center text-xs font-bold text-slate-300">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                      {showExplanation && i === challenge.correctIndex && (
                        <span className="ml-auto text-emerald-400 font-bold">✓ Correct</span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* 2. Drag-Label rendering */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag these method signatures onto the targets below:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable method signature: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-600 text-white rounded-lg cursor-grab text-xs font-mono font-bold shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'target_predicate', name: 'Predicate<T>' },
                    { id: 'target_function', name: 'Function<T, R>' },
                    { id: 'target_consumer', name: 'Consumer<T>' },
                    { id: 'target_supplier', name: 'Supplier<T>' },
                  ].map(target => (
                    <div
                      key={target.id}
                      aria-label={`Drop target for ${target.name}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-3 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px]"
                    >
                      <span className="text-[11px] font-bold text-gold-300">{target.name}</span>
                      <div className="mt-2 text-xs font-mono font-bold text-emerald-400">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : <span className="text-slate-600 font-sans font-normal italic">Drop here</span>}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Mappings"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* 3. Drag-Sort rendering */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Re-order items from top (first) to bottom (last):</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Item ${displayIdx + 1}: ${item}. Drag to reorder.`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-xs font-mono flex items-center gap-3 cursor-grab"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-[10px] font-bold">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Check Sequence Order"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold"
                >
                  Check Order
                </motion.button>
              </div>
            )}

            {/* 4. Numeric input rendering */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    aria-label="Enter numeric answer"
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated number"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white font-mono"
                  />
                  <span className="text-xs text-slate-400">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit Calculated Value"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold"
                  >
                    Submit Value
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. Construct token assembly rendering */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add token ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-2.5 py-1.5 bg-gold-950 border border-gold-700 text-gold-200 rounded-lg text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gold-700 text-white rounded-md text-xs font-mono font-bold flex items-center gap-1.5">
                      <span>{part}</span>
                      <button
                        aria-label={`Remove token ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-300 hover:text-white"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-slate-500 text-xs italic">Click parts above to assemble</span>}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    aria-label="Validate Token Construction"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold"
                  >
                    Validate Construction
                  </motion.button>
                  <button
                    aria-label="Reset Tokens"
                    onClick={() => setConstructParts([])}
                    className="px-3 py-2 bg-slate-800 text-slate-400 rounded-xl text-xs font-bold"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}

            {/* Explanation & Progressive Disclosure */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-amber-950/40 border border-amber-700/60 rounded-xl space-y-3">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">Architectural Step-by-Step Logic:</div>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-amber-100 leading-relaxed font-mono">
                      <span className="font-bold text-amber-400">Step {i + 1}:</span> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    aria-label="Show Next Explanation Step"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-3 py-1.5 bg-amber-800/80 hover:bg-amber-700 text-white rounded-lg text-xs font-bold"
                  >
                    Show Next Step →
                  </motion.button>
                )}

                {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    aria-label="Next Challenge or Finalize"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="block px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD MISSION ARC ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5 my-4">
          <div className="p-6 bg-gradient-to-br from-gold-950/80 via-slate-900 to-slate-900 rounded-3xl border border-gold-700/50 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Mission Accomplished</span>
                <h2 className="text-2xl font-black text-white">ISC Enterprise Java Mastered!</h2>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
                <div className="text-[11px] text-slate-400">Architecture Mastery Score</div>
              </div>
            </div>

            {/* Motivational Feedback based on Errors */}
            <div className="p-4 bg-emerald-950/50 border border-emerald-700/60 rounded-2xl text-xs font-medium leading-relaxed space-y-1">
              <div className="text-sm font-black text-emerald-300">
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors >= 1 && errors <= 3
                  ? 'Great work!'
                  : errors >= 4 && errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </div>
              <p className="text-emerald-200">
                {errors === 0
                  ? '🏆 Flawless performance! You designed rock-solid Stream pipelines, thread-safe memory models, injection-proof JDBC, and NIO file operations without a single glitch!'
                  : errors <= 3
                  ? '⭐ Outstanding architecture acumen! You demonstrated deep comprehension of advanced Java concurrency, lambda calculus, and enterprise database drivers.'
                  : errors <= 7
                  ? '👍 Solid progress! Review the targeted misconceptions below to refine your knowledge of monitors, buffers, and functional contracts.'
                  : '💪 Every master began as an apprentice. Review the concepts, run the simulations in the sandbox, and retry to conquer enterprise Java!'}
              </p>
            </div>
          </div>

          {/* Misconceptions profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 border border-rose-800/60 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300">Targeted Misconception Profile</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                      <p className="text-xs text-rose-300 font-semibold">✗ {m.misconception}</p>
                      <p className="text-xs text-emerald-300">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition SRS Notification */}
          <div className="p-4 bg-amber-950/40 border border-amber-800/50 rounded-2xl flex items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-amber-300 uppercase">Spaced Repetition Schedule (SM-2)</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Next memory consolidation review scheduled in{' '}
                <strong className="text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
              </p>
            </div>
            <span className="text-2xl" aria-hidden="true">🧠</span>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span aria-hidden="true">🚀</span>
              <span>{REAL_WORLD_ACTIVITY.title}</span>
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="text-xs text-slate-400 font-mono flex items-start gap-2">
                  <span className="text-gold-400 font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Enterprise Java Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_ComputerScienceJavaStreamFilterSim;
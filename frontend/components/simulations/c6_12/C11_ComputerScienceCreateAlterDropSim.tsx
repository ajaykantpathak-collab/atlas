'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 11 COMPUTER SCIENCE NODE DECLARATIONS ───
const NODE_C11_CS_041 = 'c11_cs_041'; // SQL DDL and DML - CREATE, ALTER, DROP, INSERT, UPDATE, DELETE
const NODE_C11_CS_042 = 'c11_cs_042'; // SQL DQL - SELECT, WHERE, ORDER BY, GROUP BY, HAVING, JOIN
const NODE_C11_CS_043 = 'c11_cs_043'; // SQL subqueries and views - nested queries, creating views
const NODE_C11_CS_044 = 'c11_cs_044'; // Java file I/O - File class, FileReader, FileWriter, BufferedReader
const NODE_C11_CS_045 = 'c11_cs_045'; // Java serialization - Serializable interface, ObjectOutputStream, ObjectInputStream
const NODE_C11_CS_046 = 'c11_cs_046'; // Java Scanner for files - reading from files using Scanner
const NODE_C11_CS_047 = 'c11_cs_047'; // Java random access files - RandomAccessFile class, seek, getFilePointer
const NODE_C11_CS_048 = 'c11_cs_048'; // Java command-line arguments - args array, parsing arguments
const NODE_C11_CS_049 = 'c11_cs_049'; // Java varargs and enhanced for loop - variable arguments, for-each
const NODE_C11_CS_050 = 'c11_cs_050'; // Java complex program - bank account class with deposit, withdraw, balance

const ALL_NODE_IDS = [
  NODE_C11_CS_041,
  NODE_C11_CS_042,
  NODE_C11_CS_043,
  NODE_C11_CS_044,
  NODE_C11_CS_045,
  NODE_C11_CS_046,
  NODE_C11_CS_047,
  NODE_C11_CS_048,
  NODE_C11_CS_049,
  NODE_C11_CS_050,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Core Banking Engine: Data Persistence & Architecture',
  intro: 'You are the Lead Systems Architect for a leading Indian digital banking initiative (BharatPay & SBI tech partnership). Your mission is to build the core transactional ledger, secure customer account structures, handle high-throughput file persistence, and query database records with zero data corruption.',
  context: 'From database schema architecture (DDL/DML/DQL/Subqueries) to low-level byte manipulation in Java (RandomAccessFile, Streams, Serialization) and object encapsulation, every decision you make affects millions of real-time accounts.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In a bank ledger database, you execute: "DELETE FROM Accounts WHERE balance = 0;" vs "TRUNCATE TABLE Accounts;". If an auditor notices an unauthorized deletion, which command could potentially be rolled back inside an active SQL transaction?',
  options: [
    'TRUNCATE TABLE Accounts — because it preserves the schema definition.',
    'DELETE FROM Accounts — because it logs row-by-row changes in DML transactions.',
    'Neither command can ever be rolled back once executed in relational systems.',
    'Both commands log identical transaction undo records in standard RDBMS engines.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: DELETE is DML (row-by-row logging with rollback capability), whereas TRUNCATE is DDL (deallocates pages immediately, bypassing transactional row undo logs).',
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
}

// ─── 22 COMPREHENSIVE CHALLENGES ACROSS ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  // 1. DDL vs DML (c11_cs_041) - Foundation
  {
    id: 'ch_sql_01',
    nodeId: NODE_C11_CS_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A database administrator executes: "ALTER TABLE Customers ADD email VARCHAR(50);". How is this command classified in SQL?',
    options: [
      'DML (Data Manipulation Language) — because it alters data storage.',
      'DDL (Data Definition Language) — because it modifies the database schema structure.',
      'DQL (Data Query Language) — because it specifies column formats.',
      'TCL (Transaction Control Language) — because it updates catalog state.',
    ],
    correctIndex: 1,
    explanation: 'ALTER TABLE is a DDL command because it modifies the table structure and metadata, rather than manipulating the rows directly.',
    hints: [
      'Think about whether this alters the table schema (structure) or the individual customer records.',
      'Commands like CREATE, ALTER, DROP, and TRUNCATE build and shape the schema.',
      'Schema-modifying commands belong to Data Definition Language (DDL).',
    ],
    misconceptionIndex: 2,
  },
  // 2. TRUNCATE vs DELETE (c11_cs_041) - Standard
  {
    id: 'ch_sql_02',
    nodeId: NODE_C11_CS_041,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does an audit log trigger fail to fire when an administrator runs TRUNCATE TABLE AuditLog instead of DELETE FROM AuditLog?',
    options: [
      'TRUNCATE drops the database completely, removing the database engine.',
      'TRUNCATE is a DDL operation that deallocates data pages directly without logging individual row-level deletions or firing row triggers.',
      'TRUNCATE only works on read-only tables where triggers are disabled.',
      'TRUNCATE converts all values to NULL, so no deletion event occurs.',
    ],
    correctIndex: 1,
    explanation: 'TRUNCATE deallocates data pages in bulk as a DDL command. It does not iterate through individual rows, so row-level delete triggers are never activated.',
    hints: [
      'Consider the difference between row-by-row logging and whole data-page deallocation.',
      'Row triggers require the engine to process each deleted row individually.',
      'TRUNCATE bypasses individual row processing for high speed, skipping row triggers and transaction logs.',
    ],
    misconceptionIndex: 0,
  },
  // 3. SQL Query Evaluation Order (c11_cs_042) - Standard / Drag-Sort
  {
    id: 'ch_sql_03',
    nodeId: NODE_C11_CS_042,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Arrange the logical execution order of clauses in an SQL query from first evaluated to last evaluated by the database engine.',
    sortItems: ['FROM & JOIN', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'ORDER BY'],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation: 'RDBMS engines evaluate FROM/JOIN first to assemble data sources, then WHERE filters rows, GROUP BY aggregates groups, HAVING filters aggregated groups, SELECT extracts projections, and ORDER BY sorts the final output.',
    hints: [
      'The database must know which tables to read before it can filter any rows.',
      'Row filtering (WHERE) occurs before group aggregation (GROUP BY).',
      'HAVING filters groups, then SELECT extracts expressions, and ORDER BY sorts last.',
    ],
  },
  // 4. GROUP BY and HAVING vs WHERE (c11_cs_042) - Foundation
  {
    id: 'ch_sql_04',
    nodeId: NODE_C11_CS_042,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A branch manager in Delhi wants to list account types having an average balance greater than ₹50,000. Where must "AVG(balance) > 50000" be placed?',
    options: [
      'In the WHERE clause: WHERE AVG(balance) > 50000',
      'In the HAVING clause after GROUP BY: HAVING AVG(balance) > 50000',
      'In the ORDER BY clause: ORDER BY AVG(balance) > 50000',
      'In the ON clause of the table definition',
    ],
    correctIndex: 1,
    explanation: 'Aggregate conditions cannot be placed in a WHERE clause because WHERE evaluates before group summaries are formed. Aggregate filtering must reside in HAVING.',
    hints: [
      'WHERE filters individual records before grouping.',
      'Can a single row calculate the average of all rows in a category?',
      'Aggregate functions such as COUNT, AVG, and SUM must be filtered using HAVING.',
    ],
    misconceptionIndex: 3,
  },
  // 5. INNER JOIN vs LEFT JOIN (c11_cs_042) - Application
  {
    id: 'ch_sql_05',
    nodeId: NODE_C11_CS_042,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Given Customers (100 rows) and Loans (40 rows, where 40 customers hold loans). Which query returns ALL 100 customers, displaying NULL loan IDs for customers without loans?',
    options: [
      'SELECT * FROM Customers INNER JOIN Loans ON Customers.id = Loans.cust_id;',
      'SELECT * FROM Customers LEFT JOIN Loans ON Customers.id = Loans.cust_id;',
      'SELECT * FROM Customers RIGHT JOIN Loans ON Customers.id = Loans.cust_id;',
      'SELECT * FROM Customers, Loans WHERE Customers.id = Loans.cust_id;',
    ],
    correctIndex: 1,
    explanation: 'A LEFT JOIN guarantees that every row from the left table (Customers) appears in the output, filling un-matched columns from the right table (Loans) with NULL.',
    hints: [
      'We want all rows from the first (left) table, even if there is no matching record in the second table.',
      'INNER JOIN excludes unmatched left rows.',
      'LEFT JOIN preserves all left-table rows and puts NULL for missing right-table data.',
    ],
  },
  // 6. Subqueries: Single vs Multi-row (c11_cs_043) - Standard
  {
    id: 'ch_sql_06',
    nodeId: NODE_C11_CS_043,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What error occurs if you write: "SELECT name FROM Customers WHERE balance = (SELECT balance FROM Accounts WHERE branch = \'Mumbai\');" when Mumbai has 15 accounts?',
    options: [
      'Syntax error: Parentheses are not permitted around subqueries.',
      'Subquery returns more than 1 row: Single-row comparison operator "=" cannot evaluate a multi-row set.',
      'Type mismatch: String branch cannot be compared to numeric balance.',
      'Logical lock: Subqueries cannot access the Accounts table.',
    ],
    correctIndex: 1,
    explanation: 'The "=" operator expects a single scalar value. When a subquery returns multiple rows, multi-row operators like IN, ANY, or ALL must be used.',
    hints: [
      'How many balances will the inner query produce if Mumbai branch has 15 accounts?',
      'Can the single "=" operator equate one value to 15 different numbers at once?',
      'Use the IN operator or ANY/ALL when a subquery returns multiple rows.',
    ],
  },
  // 7. SQL Views & Virtual Table Behavior (c11_cs_043) - Advanced
  {
    id: 'ch_sql_07',
    nodeId: NODE_C11_CS_043,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A view "DailySummary" is created with "CREATE VIEW DailySummary AS SELECT branch, SUM(amount) FROM Txns GROUP BY branch;". Can a teller execute "INSERT INTO DailySummary VALUES (\'Kolkata\', 100000);"?',
    options: [
      'Yes, views automatically distribute inserted values across base tables.',
      'No, because views containing aggregate functions (SUM) and GROUP BY clauses are read-only and non-updatable.',
      'Yes, because any user with table privileges can insert into its views.',
      'No, because views cannot have names starting with capital letters in SQL standard.',
    ],
    correctIndex: 1,
    explanation: 'Views built with aggregate functions (SUM, COUNT, AVG) or GROUP BY cannot be updated or inserted into because the database engine cannot map aggregated totals back to unambiguous single rows in the base table.',
    hints: [
      'Consider how the database would know how many individual transactions make up that 100,000 sum.',
      'Is there a direct 1-to-1 row correspondence between the view and base records?',
      'Aggregated views are non-updatable virtual tables.',
    ],
  },
  // 8. Java File Class Behavior (c11_cs_044) - Foundation
  {
    id: 'ch_io_01',
    nodeId: NODE_C11_CS_044,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When a Java program executes "File f = new File(\"ledger.txt\");", what happens on the physical disk storage?',
    options: [
      'A new 0-byte file named "ledger.txt" is immediately created on disk.',
      'Nothing on disk changes; an in-memory pathname object handle is created.',
      'The file is locked and allocated 1024 bytes in the OS file system.',
      'If "ledger.txt" existed, its contents are wiped out.',
    ],
    correctIndex: 1,
    explanation: 'Creating a `new File("path")` merely instantiates an abstract pathname representation in JVM memory. To actually create a physical file on disk, `f.createNewFile()` or a file output stream must be invoked.',
    hints: [
      'Does the `new File()` constructor perform hardware disk I/O immediately?',
      'Think of `File` as a pathname handle or pointer to a name.',
      '`f.createNewFile()` must be explicitly called to touch the disk.',
    ],
    misconceptionIndex: 1,
  },
  // 9. Java Character Stream Plumbing (c11_cs_044) - Drag-Label Diagram
  {
    id: 'ch_io_02',
    nodeId: NODE_C11_CS_044,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the Java Character Stream pipeline for high-performance buffered line reading by matching stream components to their pipeline roles.',
    dragItems: [
      { label: 'BufferedReader', targetId: 'target_wrapper' },
      { label: 'FileReader', targetId: 'target_reader' },
      { label: 'File ("data.txt")', targetId: 'target_handle' },
      { label: 'readLine() -> String', targetId: 'target_consumer' },
    ],
    correctMapping: {
      target_handle: 'File ("data.txt")',
      target_reader: 'FileReader',
      target_wrapper: 'BufferedReader',
      target_consumer: 'readLine() -> String',
    },
    explanation: 'The pipeline flows from the File pathname handle -> FileReader (character stream) -> BufferedReader (in-memory 8KB chunk buffer) -> readLine() application consumer.',
    hints: [
      'Start with the disk path reference handle at the base.',
      'FileReader reads raw characters from that handle.',
      'BufferedReader wraps the FileReader to provide chunks and `readLine()`.',
    ],
  },
  // 10. Java Stream Flushing & close() (c11_cs_044) - Standard
  {
    id: 'ch_io_03',
    nodeId: NODE_C11_CS_044,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A student writes "BufferedWriter bw = new BufferedWriter(new FileWriter(\"out.txt\")); bw.write(\"Balance: 5000\");" but omits "bw.close()". Why is "out.txt" empty on disk?',
    options: [
      'Because `write()` does not work without `newLine()`.',
      'The written characters remained in the internal memory buffer and were never flushed to disk prior to program termination.',
      'FileWriter automatically deletes files if not closed.',
      'The OS denies write privileges if `flush()` is not called inside a catch block.',
    ],
    correctIndex: 1,
    explanation: 'Buffered streams accumulate output in memory to minimize expensive physical disk system calls. Invoking `close()` (or `flush()`) forces buffered bytes out to disk and releases OS handles.',
    hints: [
      'Why do we use buffers in memory?',
      'If the buffer holds 8192 characters and you only wrote 13 characters, where are they sitting?',
      'Without `close()` or `flush()`, buffered data never reaches physical storage.',
    ],
  },
  // 11. Java Serialization: Serializable Marker Interface (c11_cs_045) - Foundation
  {
    id: 'ch_ser_01',
    nodeId: NODE_C11_CS_045,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is java.io.Serializable referred to as a "marker interface"?',
    options: [
      'It requires the class to override the `serialize()` method.',
      'It contains no method declarations and serves only to tag the class for JVM object stream encoding permission.',
      'It marks the class as a final singleton in memory.',
      'It automatically encrypts class fields with SHA-256.',
    ],
    correctIndex: 1,
    explanation: 'A marker (or tag) interface has zero methods or constant declarations. It signals to the JVM runtime that objects of this class are permitted to be flattened into byte streams.',
    hints: [
      'Open the definition of `Serializable` in `java.io`. How many methods does it declare?',
      'Marker interfaces contain 0 abstract methods.',
      'It acts purely as a capability permission flag for ObjectOutputStream.',
    ],
  },
  // 12. Transient Keyword in Serialization (c11_cs_045) - Standard
  {
    id: 'ch_ser_02',
    nodeId: NODE_C11_CS_045,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In class `CustomerAccount implements Serializable`, field `transient String pinCode = "4589";` is serialized to account.dat. When deserialized via ObjectInputStream, what is the value of `pinCode`?',
    options: [
      '"4589" — values are always restored from the class file.',
      'null — transient fields are skipped during serialization and initialized to default reference type values upon deserialization.',
      '"0000" — transient numeric strings are reset to zeroes.',
      'Throws `InvalidClassException` immediately.',
    ],
    correctIndex: 1,
    explanation: 'Fields marked `transient` are deliberately bypassed by ObjectOutputStream during serialization. Upon deserialization, reference types default to `null` (and primitive numbers default to 0).',
    hints: [
      'What is the fundamental purpose of the `transient` modifier?',
      'Does the byte stream contain any bytes for transient variables?',
      'When Java instantiates the object during deserialization without stream data, it assigns default values (`null` for String).',
    ],
  },
  // 13. Java File Scanner Parsing (c11_cs_046) - Standard / Construct
  {
    id: 'ch_scan_01',
    nodeId: NODE_C11_CS_046,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the correct Java code sequence to open "accounts.csv", set a comma delimiter, read all tokens safely, and close the resource.',
    availableParts: [
      'Scanner sc = new Scanner(new File("accounts.csv"));',
      'sc.useDelimiter(",");',
      'while (sc.hasNext()) { String token = sc.next(); }',
      'sc.close();',
    ],
    targetState: 'Scanner sc = new Scanner(new File("accounts.csv")); sc.useDelimiter(","); while (sc.hasNext()) { String token = sc.next(); } sc.close();',
    validationHint: 'Add statements in order: instantiate with File -> set delimiter -> while hasNext loop -> close Scanner.',
    explanation: 'Constructing Scanner with `new File(...)` allows custom delimiter tokenization using `sc.useDelimiter(",")` and safe sequential consumption with `while(sc.hasNext())`.',
    hints: [
      'First create the Scanner connected to the File handle.',
      'Configure the delimiter before reading any tokens.',
      'Loop while tokens exist, then close the stream.',
    ],
  },
  // 14. RandomAccessFile Modes & Pointer Math (c11_cs_047) - Numeric Offset Calculation
  {
    id: 'ch_raf_01',
    nodeId: NODE_C11_CS_047,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A bank ledger stores fixed-length customer records of exactly 64 bytes each (Record 0 starts at byte offset 0). What byte offset must `seek(long pos)` jump to in order to read Record index 14?',
    correctAnswer: 896,
    tolerance: 0,
    unit: 'bytes',
    explanation: 'Byte offset = recordIndex * recordSize = 14 * 64 = 896 bytes.',
    hints: [
      'Record 0 is at offset 0 * 64 = 0.',
      'Record 1 is at offset 1 * 64 = 64.',
      'Multiply the record index (14) by the fixed record length (64).',
    ],
  },
  // 15. RandomAccessFile Pointer Motion (c11_cs_047) - Advanced
  {
    id: 'ch_raf_02',
    nodeId: NODE_C11_CS_047,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A RandomAccessFile pointer is at offset 200. You execute: `raf.writeInt(42);` followed by `raf.writeDouble(99.5);`. What does `raf.getFilePointer()` return immediately after?',
    options: [
      '200 — file pointer remains at the start of the record.',
      '212 — `writeInt` advances pointer by 4 bytes and `writeDouble` advances pointer by 8 bytes (200 + 4 + 8 = 212).',
      '208 — primitive writes always advance by 4 bytes each in 32-bit JVMs.',
      '202 — file pointer counts number of operations, not bytes.',
    ],
    correctIndex: 1,
    explanation: 'In Java binary streams, an `int` occupies 4 bytes and a `double` occupies 8 bytes. Every primitive write advances the underlying byte offset by exactly its binary size: 200 + 4 + 8 = 212.',
    hints: [
      'How many bytes does a standard Java primitive `int` consume?',
      'How many bytes does a 64-bit IEEE 754 `double` consume?',
      'Add 4 bytes (int) + 8 bytes (double) to the starting offset 200.',
    ],
  },
  // 16. Command-Line Arguments Indexing & Types (c11_cs_048) - Foundation
  {
    id: 'ch_cli_01',
    nodeId: NODE_C11_CS_048,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A user runs: `java BankTransfer 1001 2005 15000.50`. What is stored inside `args[0]` inside the `main(String[] args)` method?',
    options: [
      'The program name "BankTransfer"',
      'The string literal "1001"',
      'The integer value 1001',
      'The whole command line "java BankTransfer 1001 2005 15000.50"',
    ],
    correctIndex: 1,
    explanation: 'In Java, unlike C/C++, the class name is NOT stored in the `args` array. The first parameter after the class name is stored as a String at `args[0]`.',
    hints: [
      'Does Java include the executable/class name in `args`?',
      'What data type is `args`? (Notice `String[] args`).',
      'The first argument is the string token "1001".',
    ],
  },
  // 17. CLI Parsing Safety (c11_cs_048) - Standard
  {
    id: 'ch_cli_02',
    nodeId: NODE_C11_CS_048,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Which sequence correctly prevents both `ArrayIndexOutOfBoundsException` and `NumberFormatException` when parsing an integer amount from command-line arguments?',
    options: [
      'int amt = Integer.parseInt(args[0]); if (args.length > 0) { ... }',
      'if (args.length >= 1) { try { int amt = Integer.parseInt(args[0]); } catch (NumberFormatException e) { ... } }',
      'try { int amt = (int) args[0]; } catch (ClassCastException e) { ... }',
      'if (args[0] != null) { int amt = args[0].toInt(); }',
    ],
    correctIndex: 1,
    explanation: 'To ensure runtime safety, first check `args.length >= 1` before accessing index 0, then wrap `Integer.parseInt()` in a try-catch for `NumberFormatException`.',
    hints: [
      'Always check array length BEFORE indexing to avoid bounds exceptions.',
      'Strings cannot be cast to primitives using `(int)`.',
      'Wrapper class method `Integer.parseInt()` throws `NumberFormatException` on invalid strings.',
    ],
  },
  // 18. Java Varargs Syntax & Rules (c11_cs_049) - Foundation
  {
    id: 'ch_var_01',
    nodeId: NODE_C11_CS_049,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following method signatures is syntactically INVALID in Java?',
    options: [
      'public static double calculateInterest(double rate, double... balances)',
      'public static void logTransactions(String... messages)',
      'public static void processLedger(int... accountIds, String branchCode)',
      'public static int sumFees(int... fees)',
    ],
    correctIndex: 2,
    explanation: 'A varargs parameter (`...`) must always be the LAST parameter in a method signature, and a method can have at most one varargs parameter.',
    hints: [
      'Where must the ellipsis (`...`) parameter be positioned among method arguments?',
      'Can parameters appear AFTER a variable-length argument list?',
      '`int... accountIds` cannot precede `String branchCode`.',
    ],
  },
  // 19. Enhanced For-Loop Array Mutation Myth (c11_cs_049) - Advanced
  {
    id: 'ch_var_02',
    nodeId: NODE_C11_CS_049,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Consider: `int[] scores = {80, 90, 100}; for (int s : scores) { s = s + 5; }`. What are the elements of `scores` after this loop completes?',
    options: [
      '{85, 95, 105} — because the loop variable directly aliases each array element.',
      '{80, 90, 100} — because the loop variable `s` receives a copy of the primitive value, leaving the original array elements unmodified.',
      '{85, 90, 100} — only the first element changes.',
      'Throws `ConcurrentModificationException` at runtime.',
    ],
    correctIndex: 1,
    explanation: 'In an enhanced for-loop over primitive arrays, the loop variable is a distinct local copy of each element. Reassigning `s` does not alter the underlying array slots.',
    hints: [
      'Is `s` an array index pointer or a local copy of each integer value?',
      'Does assigning to a local primitive copy affect the source memory array?',
      'Primitive array mutation requires indexed assignment: `scores[i] = ...`.',
    ],
  },
  // 20. BankAccount Encapsulation & Invariant Protection (c11_cs_050) - Foundation
  {
    id: 'ch_bank_01',
    nodeId: NODE_C11_CS_050,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why MUST the `balance` field in a `BankAccount` class be declared `private`, with updates restricted through `deposit()` and `withdraw()`?',
    options: [
      'To prevent Java from garbage collecting the balance.',
      'To enforce encapsulation and data hiding, ensuring invalid states (such as negative balances or unauthorized direct tampering) are blocked.',
      'Because public fields cannot store `double` primitive types in Java.',
      'To allow database serialization without implementing Serializable.',
    ],
    correctIndex: 1,
    explanation: 'Declaring state fields `private` protects internal invariants and business rules through guarded public methods—embodying object-oriented encapsulation.',
    hints: [
      'What happens if any external class can execute `acc.balance = -50000;`?',
      'Encapsulation bundles data and safeguards it with validation logic.',
      'Private fields prevent uncontrolled modification.',
    ],
    misconceptionIndex: 4,
  },
  // 21. Custom Exception Handling for Banking (c11_cs_050) - Standard
  {
    id: 'ch_bank_02',
    nodeId: NODE_C11_CS_050,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why is throwing a custom `InsufficientBalanceException` superior to returning `false` or printing an error message inside `withdraw(double amount)`?',
    options: [
      'Exceptions execute 100x faster than boolean conditional checks in JVM bytecode.',
      'It enforces explicit error handling in the calling transaction layer, prevents silent failures, and separates error reporting from business logic.',
      'Java strictly forbids methods from returning boolean values.',
      'It automatically connects to the RBI payment gateway rollback server.',
    ],
    correctIndex: 1,
    explanation: 'Custom checked exceptions make domain failures explicit in the method signature (`throws InsufficientBalanceException`), forcing callers to handle transactional failures safely.',
    hints: [
      'What happens if a developer forgets to check a boolean return value from a payment function?',
      'Exceptions cannot be silently ignored without explicit compilation checks.',
      'Custom exceptions create clean, domain-specific error handling architecture.',
    ],
  },
  // 22. Complete Architecture Integration: SQL, I/O & OOP (c11_cs_050) - Advanced
  {
    id: 'ch_bank_03',
    nodeId: NODE_C11_CS_050,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'In a complete banking application architecture, how do DDL/DML, Java I/O streams, and Object-Oriented classes collaborate securely?',
    options: [
      'Java classes hold transient runtime objects with encapsulated business logic, Streams/RandomAccessFile persist logs and binary snapshots, and SQL RDBMS guarantees relational integrity and ACID transactions.',
      'SQL replaces all Java classes, eliminating the need for object models or memory.',
      'RandomAccessFile replaces SQL relational databases in enterprise financial systems.',
      'ObjectOutputStream is the only mechanism permitted by CISCE for enterprise databases.',
    ],
    correctIndex: 0,
    explanation: 'Modern enterprise systems use encapsulated OOP models in memory for business rules, fast byte/stream I/O for direct storage snapshots and journals, and SQL RDBMS for durable ACID transactions.',
    hints: [
      'Think about the role of each layer: memory models, file persistence, and database ledgers.',
      'OOP handles runtime entities, Streams handle byte persistence, and SQL handles queries/ACID guarantees.',
      'Each layer has a distinct, complementary responsibility.',
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

// ─── DEFAULT PROPS WITH FULL ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_CS_041,
  title: 'Database Architecture, Java File I/O & OOP Ledger Systems',
  definition:
    'Comprehensive mastery of SQL DDL/DML/DQL/Subqueries and Java Persistence architectures including Character Streams, Object Serialization, RandomAccessFile byte offsets, CLI parsing, Varargs, and encapsulated BankAccount systems with custom exceptions.',
  eli5:
    'Think of your bank as a three-story building: The basement is SQL (the permanent vault that organizes records), the elevator and hallways are Java Streams and File I/O (carrying data safely to disk), and the counter desks are Java BankAccount objects (safeguarding your money with strict rules).',
  misconceptions: [
    {
      misconception: 'TRUNCATE and DELETE are identical because both remove data.',
      correction:
        'DELETE is a DML command that logs row-by-row deletions and can be rolled back; TRUNCATE is a DDL command that deallocates storage pages in bulk, bypassing row triggers and undo logs.',
    },
    {
      misconception: 'Creating `new File("data.txt")` immediately creates a physical file on disk.',
      correction:
        '`new File()` only creates an abstract pathname object in memory. `createNewFile()` or an output stream must be called to allocate disk storage.',
    },
    {
      misconception: 'ALTER TABLE is completely safe and can never lead to data loss.',
      correction:
        'Dropping columns via ALTER TABLE permanently destroys data, and narrowing column datatypes (e.g. VARCHAR(50) to VARCHAR(5)) causes truncation or runtime errors.',
    },
    {
      misconception: 'HAVING and WHERE can be used interchangeably in SQL queries.',
      correction:
        'WHERE filters individual rows before grouping occurs; HAVING filters aggregated groups after GROUP BY and can evaluate aggregate functions (COUNT, SUM, AVG).',
    },
    {
      misconception: 'Making fields public is fine if you trust your internal methods.',
      correction:
        'Public fields destroy encapsulation, allowing arbitrary code to bypass business validation (e.g., setting account balance to negative numbers directly).',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which SQL command creates a new table structure with data types and primary key constraints?',
      options: ['INSERT TABLE', 'CREATE TABLE', 'DEFINE TABLE', 'NEW TABLE'],
      correctIndex: 1,
    },
    {
      question: 'Which clause is mandatory when evaluating "HAVING COUNT(*) > 5"?',
      options: ['ORDER BY', 'GROUP BY', 'WHERE ONLY', 'LIMIT'],
      correctIndex: 1,
    },
    {
      question: 'What interface must a Java class implement to enable ObjectOutputStream serialization?',
      options: ['java.io.Readable', 'java.io.Serializable', 'java.lang.Cloneable', 'java.io.DataOutput'],
      correctIndex: 1,
    },
    {
      question: 'How many bytes does `raf.writeDouble(100.5)` advance a RandomAccessFile pointer?',
      options: ['4 bytes', '8 bytes', '16 bytes', '2 bytes'],
      correctIndex: 1,
    },
    {
      question: 'Where must a varargs parameter (`int... nums`) be placed in a method signature?',
      options: ['First parameter', 'Any position', 'Last parameter', 'Inside method body only'],
      correctIndex: 2,
    },
    {
      question: 'What exception is thrown when `Integer.parseInt("one")` is called?',
      options: ['ClassCastException', 'NumberFormatException', 'NullPointerException', 'IllegalArgumentException'],
      correctIndex: 1,
    },
    {
      question: 'What happens to a transient field during Java object deserialization?',
      options: ['It is restored from cache', 'It is assigned its default type value (null/0)', 'Throws exception', 'It becomes static'],
      correctIndex: 1,
    },
    {
      question: 'What does `raf.seek(0)` do in a RandomAccessFile?',
      options: ['Deletes all bytes', 'Moves the file pointer cursor to the beginning of the file', 'Searches for zero bytes', 'Closes the file'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Student demonstrates 100% precision in SQL schema operations, query pipelines, Java character/binary stream plumbing, byte pointer math, and encapsulated OOP exception architectures.',
};

// ─── 5 INTERACTIVE EXPLORATION LABS ───
const EXPLORATION_STEPS = [
  {
    title: '1. SQL DDL vs DML Engine & Transaction Sandbox',
    instruction: 'Click SQL commands to execute them on the active Bank Accounts table and observe how the Schema and Data pages react.',
    interactionType: 'sql-engine',
    nodeId: NODE_C11_CS_041,
  },
  {
    title: '2. SQL Query Execution Pipeline (DQL & Aggregates)',
    instruction: 'Adjust the Min Balance filter and Branch selector to observe how WHERE, GROUP BY, and HAVING transform output rows in real time.',
    interactionType: 'dql-pipeline',
    nodeId: NODE_C11_CS_042,
  },
  {
    title: '3. Java Character Streams & Buffered Flushing Lab',
    instruction: 'Type text into the buffer and click "Write" vs "Flush/Close" to see how characters travel from JVM memory to physical disk.',
    interactionType: 'stream-buffer',
    nodeId: NODE_C11_CS_044,
  },
  {
    title: '4. RandomAccessFile Direct Byte Offset Simulator',
    instruction: 'Move the byte slider or seek directly to a record index to inspect how `seek()` and `getFilePointer()` pinpoint exact byte positions.',
    interactionType: 'raf-pointer',
    nodeId: NODE_C11_CS_047,
  },
  {
    title: '5. Encapsulated BankAccount & Custom Exception Engine',
    instruction: 'Deposit funds or attempt withdrawals above balance to trigger and catch custom `InsufficientBalanceException` instances.',
    interactionType: 'bank-oop',
    nodeId: NODE_C11_CS_050,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you execute "DELETE FROM Customers WHERE balance < 0" on a table of 100 rows, does the table schema structure remain intact?',
    options: [
      'No, DELETE drops both the rows and the column definitions.',
      'Yes, DELETE only removes the matching rows; table schema and constraints remain untouched.',
      'No, DELETE converts the table into a read-only view.',
      'Yes, but only if TRUNCATE is executed immediately after.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in the interactive SQL engine: click DELETE and watch the schema header stay solid while rows are filtered.',
    nodeId: NODE_C11_CS_041,
  },
  {
    question: 'Predict: If you open a RandomAccessFile of 500 bytes and write an `int` (4 bytes) at offset 100, what is the file pointer position afterwards?',
    options: [
      'Byte offset 100',
      'Byte offset 104',
      'Byte offset 504',
      'Byte offset 0',
    ],
    correctIndex: 1,
    verifyInstruction: 'Scrub the RandomAccessFile seek slider to 100 and write an int to verify the pointer moves to 104.',
    nodeId: NODE_C11_CS_047,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the buffer gauge before clicking "Flush / Close"?',
    observableOptions: [
      'Data is written to physical disk immediately on every keystroke.',
      'Characters sit in JVM RAM buffer; physical disk file size remains 0 bytes until flushed.',
      'The file on disk is deleted automatically.',
      'The JVM halts program execution.',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_CS_044,
  },
  {
    question: 'What pattern do you notice when attempting to withdraw ₹12,000 from an account with ₹10,000 balance?',
    observableOptions: [
      'Balance becomes negative ₹2,000.',
      'The balance remains safely at ₹10,000 and an `InsufficientBalanceException` error object is caught.',
      'The account is deleted from memory.',
      'The program crashes with `NullPointerException`.',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_CS_050,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Architect an Indian UPI Banking Micro-Ledger',
  description: 'Design a high-reliability transaction journal for an Indian payment gateway handling 100,000 transactions/second.',
  steps: [
    '1. Design SQL DDL: Create an `Account` table with `acc_no BIGINT PRIMARY KEY`, `balance DECIMAL(12,2) CHECK (balance >= 0)`.',
    '2. Build Java BankAccount Class: Keep `private double balance` with custom `InsufficientBalanceException`.',
    '3. Implement RandomAccessFile: Store binary fixed-length 64-byte transaction records for sub-millisecond journal seeks.',
    '4. Add CLI & Varargs: Write a `main(String[] args)` tool using `void processBatch(long... accountIds)` for bulk audits.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
export function C11_ComputerScienceCreateAlterDropSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C11_CS_041,
    title = DEFAULT_PROPS.title || 'SQL & Java Systems',
    misconceptions = DEFAULT_PROPS.misconceptions,
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['cs'] || { name: 'Computer Science', emoji: '💻', color: 'indigo' };

  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Representation view toggle for Multi-Representation requirement
  const [representationView, setRepresentationView] = useState<'code' | 'flow' | 'tabular'>('flow');

  // ─── DISCOVERY & PREDICTION STATES ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);

  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ─── REFLECTION RESPONSES STATE ───
  const [reflections, setReflections] = useState({
    surprising: '',
    explainFriend: '',
    realLife: '',
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // SQL Lab State
  const [sqlTableData, setSqlTableData] = useState([
    { id: 101, name: 'Aarav Sharma', branch: 'Mumbai', balance: 45000 },
    { id: 102, name: 'Diya Patel', branch: 'Delhi', balance: 82000 },
    { id: 103, name: 'Rohan Gupta', branch: 'Mumbai', balance: 12000 },
    { id: 104, name: 'Ananya Iyer', branch: 'Bengaluru', balance: 95000 },
  ]);
  const [sqlColumns, setSqlColumns] = useState(['id', 'name', 'branch', 'balance']);
  const [sqlLastAction, setSqlLastAction] = useState('Table initialized with 4 customer rows.');
  const [sqlCommandType, setSqlCommandType] = useState<'DDL' | 'DML' | 'DQL'>('DDL');

  // DQL Pipeline Filter State
  const [dqlMinBalance, setDqlMinBalance] = useState(20000);
  const [dqlSelectedBranch, setDqlSelectedBranch] = useState<'ALL' | 'Mumbai' | 'Delhi' | 'Bengaluru'>('ALL');
  const [dqlGroupByBranch, setDqlGroupByBranch] = useState(false);

  // Java Stream Buffer Lab State
  const [streamInputText, setStreamInputText] = useState('TXN#99201: ₹2,500 deposited to Acc 101');
  const [streamRamBuffer, setStreamRamBuffer] = useState<string[]>([]);
  const [streamDiskContent, setStreamDiskContent] = useState<string[]>(['[BOOT_SECTOR] File created']);
  const [streamIsClosed, setStreamIsClosed] = useState(false);

  // RandomAccessFile Lab State
  const [rafRecordIndex, setRafRecordIndex] = useState(3);
  const [rafRecordSize] = useState(64);
  const [rafFilePointer, setRafFilePointer] = useState(192); // 3 * 64

  // BankAccount OOP Lab State
  const [bankBalance, setBankBalance] = useState(25000);
  const [bankTxnHistory, setBankTxnHistory] = useState<string[]>(['Account opened: Initial balance ₹25,000.00']);
  const [bankAmountInput, setBankAmountInput] = useState(5000);
  const [bankExceptionMessage, setBankExceptionMessage] = useState<string | null>(null);

  // ─── ASSESSMENT & ADAPTIVITY STATE ───
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

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Drag-and-drop & interactive input states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Persistent references
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE CHALLENGE FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD INITIAL MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE BKT DIFFICULTY UPDATER ───
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

  // ─── 2D CANVAS SYSTEM ENGINE ANIMATION ───
  useEffect(() => {
    if (phase !== 'challenge' && phase !== 'explore' && phase !== 'sandbox') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const animate = () => {
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

      // Memory stream pulse
      const pulseX = (frame * 2) % canvas.width;
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(pulseX, 12, 4, 0, Math.PI * 2);
      ctx.fill();

      // Active status label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(`JVM Persistence Engine | Channel: 0x${((frame * 16) % 65535).toString(16).toUpperCase()}`, 10, 16);

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── RECALCULATE RAF POINTER ON RECORD CHANGE ───
  useEffect(() => {
    setRafFilePointer(rafRecordIndex * rafRecordSize);
  }, [rafRecordIndex, rafRecordSize]);

  // ─── EVENT HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'error');
    speechManager.speak(isCorrect ? 'Correct! DELETE logs row changes in DML transactions.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive systems laboratory. Explore each subsystem.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode activated. Test SQL queries, file buffers, and bank transactions freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Starting ISC Class 11 competency challenges. Good luck!');
  }, []);

  const handleNextSlide = useCallback(() => {
    if (currentSlide < EXPLORATION_STEPS.length - 1) {
      setCurrentSlide((s) => s + 1);
      audioManager.play('tap');
    } else {
      handleAdvanceToSandbox();
    }
  }, [currentSlide, handleAdvanceToSandbox]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((s) => Math.max(0, s - 1));
    audioManager.play('tap');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded. Now interact with the visualization below to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation! The RAM buffer holds uncommitted bytes.' : 'Observe how the disk file size updates upon flush.');
  }, []);

  // SQL Lab Handlers
  const handleSqlAction = useCallback((action: 'CREATE' | 'ALTER' | 'INSERT' | 'UPDATE' | 'DELETE' | 'TRUNCATE' | 'DROP') => {
    audioManager.play('tap');
    if (action === 'CREATE') {
      setSqlColumns(['id', 'name', 'branch', 'balance']);
      setSqlTableData([
        { id: 101, name: 'Aarav Sharma', branch: 'Mumbai', balance: 45000 },
        { id: 102, name: 'Diya Patel', branch: 'Delhi', balance: 82000 },
      ]);
      setSqlCommandType('DDL');
      setSqlLastAction('CREATE TABLE Accounts: Schema initialized with constraints.');
    } else if (action === 'ALTER') {
      if (!sqlColumns.includes('email')) {
        setSqlColumns((prev) => [...prev, 'email']);
        setSqlCommandType('DDL');
        setSqlLastAction('ALTER TABLE Accounts ADD email VARCHAR(50); (Schema modified)');
      }
    } else if (action === 'INSERT') {
      const nextId = 100 + sqlTableData.length + 1;
      setSqlTableData((prev) => [...prev, { id: nextId, name: 'Kabir Das', branch: 'Kolkata', balance: 67000 }]);
      setSqlCommandType('DML');
      setSqlLastAction(`INSERT INTO Accounts VALUES (${nextId}, 'Kabir Das', 'Kolkata', 67000);`);
    } else if (action === 'UPDATE') {
      setSqlTableData((prev) => prev.map((row) => (row.id === 101 ? { ...row, balance: row.balance + 5000 } : row)));
      setSqlCommandType('DML');
      setSqlLastAction('UPDATE Accounts SET balance = balance + 5000 WHERE id = 101;');
    } else if (action === 'DELETE') {
      setSqlTableData((prev) => prev.filter((row) => row.id !== 102));
      setSqlCommandType('DML');
      setSqlLastAction('DELETE FROM Accounts WHERE id = 102; (Row removed, rollback logged)');
    } else if (action === 'TRUNCATE') {
      setSqlTableData([]);
      setSqlCommandType('DDL');
      setSqlLastAction('TRUNCATE TABLE Accounts; (All rows deallocated, schema preserved)');
    } else if (action === 'DROP') {
      setSqlTableData([]);
      setSqlColumns([]);
      setSqlCommandType('DDL');
      setSqlLastAction('DROP TABLE Accounts; (Table structure completely destroyed)');
    }
  }, [sqlColumns, sqlTableData]);

  // Stream Buffer Lab Handlers
  const handleStreamWrite = useCallback(() => {
    if (streamIsClosed) return;
    audioManager.play('tap');
    setStreamRamBuffer((prev) => [...prev, streamInputText]);
  }, [streamInputText, streamIsClosed]);

  const handleStreamFlushClose = useCallback(() => {
    audioManager.play('drop-correct');
    setStreamDiskContent((prev) => [...prev, ...streamRamBuffer]);
    setStreamRamBuffer([]);
    setStreamIsClosed(true);
    speechManager.speak('Buffer flushed to disk and file handle closed successfully.');
  }, [streamRamBuffer]);

  const handleStreamReset = useCallback(() => {
    audioManager.play('whoosh');
    setStreamRamBuffer([]);
    setStreamDiskContent(['[BOOT_SECTOR] File reset']);
    setStreamIsClosed(false);
  }, []);

  // BankAccount OOP Handlers
  const handleBankDeposit = useCallback(() => {
    if (bankAmountInput <= 0) return;
    audioManager.play('drop-correct');
    setBankBalance((b) => b + bankAmountInput);
    setBankTxnHistory((prev) => [`Deposited ₹${bankAmountInput.toFixed(2)} | Balance: ₹${(bankBalance + bankAmountInput).toFixed(2)}`, ...prev]);
    setBankExceptionMessage(null);
  }, [bankAmountInput, bankBalance]);

  const handleBankWithdraw = useCallback(() => {
    if (bankAmountInput <= 0) return;
    if (bankAmountInput > bankBalance) {
      audioManager.play('error');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
      setBankExceptionMessage(`InsufficientBalanceException: Requested ₹${bankAmountInput.toFixed(2)} exceeds balance ₹${bankBalance.toFixed(2)}`);
      speechManager.speak('InsufficientBalanceException thrown and caught.');
    } else {
      audioManager.play('drop-correct');
      setBankBalance((b) => b - bankAmountInput);
      setBankTxnHistory((prev) => [`Withdrew ₹${bankAmountInput.toFixed(2)} | Balance: ₹${(bankBalance - bankAmountInput).toFixed(2)}`, ...prev]);
      setBankExceptionMessage(null);
    }
  }, [bankAmountInput, bankBalance]);

  // Escalating hints helper
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
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  // Drag handlers
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
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  // Completion Handler
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Simulation complete! Your final architecture score is ${finalScore} percent.`);
  }, [errors, onComplete]);

  // Next challenge handler
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

  // Inactivity auto-hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Answer handler
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
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === challenge.targetState?.trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Masterful! That is precisely correct.');
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
          speechManager.speak('Let us study the complete architecture breakdown.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-800">
      {/* ─── HEADER BAR ─── */}
      <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="p-2.5 bg-indigo-950/80 border border-indigo-700/50 rounded-xl text-2xl" role="img" aria-label="Computer Science Icon">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">{title}</h1>
            <p className="text-xs text-indigo-300">ISC Class 11 Computer Science | Paper 1 (Theory) & System Architecture</p>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-lg font-medium capitalize transition-all ${
                phase === p ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY (Curiosity Hook) ─── */}
      {phase === 'discovery' && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-indigo-950/70 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-1">
              <span>🏛️</span> NARRATIVE CASE STUDY
            </div>
            <h2 className="text-xl font-bold text-white">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 mt-2">{SCENARIO.context}</p>
          </div>

          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 shadow-md">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-2">⚡ Architecture Discovery Challenge</h3>
            <p className="text-white font-medium text-base mb-4 leading-relaxed">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-800/50 border-slate-700/50 text-slate-400'
                      : 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '🎯 Brilliant deduction! DELETE is logged as DML transactions.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2"
                >
                  Launch Interactive Systems Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (With 3 Dedicated SVGs & Multi-Representation) ─── */}
      {phase === 'explore' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Multi-Representation Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Multi-Representation View:</span>
              <div className="flex gap-1">
                {(['flow', 'tabular', 'code'] as const).map((view) => (
                  <button
                    key={view}
                    onClick={() => {
                      setRepresentationView(view);
                      audioManager.play('tap');
                    }}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                      representationView === view
                        ? 'bg-indigo-600 text-white font-semibold shadow'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {view === 'flow' ? '📊 Visual Diagram' : view === 'tabular' ? '📋 Data Matrix' : '💻 Code Pipeline'}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-xs text-indigo-300 font-mono">LAB {currentSlide + 1} OF {EXPLORATION_STEPS.length}</span>
          </div>

          {/* Exploration Step Card */}
          <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl">
            <div className="flex items-center justify-between gap-2 mb-3">
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
              <span className="text-xs text-slate-400 font-mono">Node ID: {EXPLORATION_STEPS[currentSlide].nodeId}</span>
            </div>

            <p className="text-sm text-amber-300/90 mt-1 mb-4 flex items-center gap-2">
              <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
            </p>

            {/* ─── LAB 0: SQL DDL vs DML ENGINE ─── */}
            {currentSlide === 0 && (
              <div className="space-y-4">
                {/* SVG 1: SQL Schema & Transaction Architecture Diagram */}
                {representationView === 'flow' && (
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-xs font-semibold text-indigo-300 mb-2">SVG Diagram 1: RDBMS Storage Engine (DDL vs DML Mechanism)</div>
                    <svg viewBox="0 0 600 160" className="w-full h-auto text-xs font-mono">
                      <rect x="10" y="10" width="270" height="140" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="25" y="32" fill="#a5b4fc" fontWeight="bold">DDL (Data Definition Language)</text>
                      <text x="25" y="52" fill="#94a3b8" fontSize="11">Modifies: Schema Meta-Catalog</text>
                      <rect x="25" y="65" width="240" height="35" rx="6" fill="#312e81" />
                      <text x="35" y="87" fill="#e0e7ff" fontSize="11">CREATE / ALTER / DROP / TRUNCATE</text>
                      <text x="25" y="122" fill="#38bdf8" fontSize="10">⚡ Direct Page Deallocation (No Row Undo Logs)</text>
                      <text x="25" y="138" fill="#f43f5e" fontSize="10">❌ Cannot rollback TRUNCATE in standard DDL</text>

                      <rect x="320" y="10" width="270" height="140" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                      <text x="335" y="32" fill="#6ee7b7" fontWeight="bold">DML (Data Manipulation Language)</text>
                      <text x="335" y="52" fill="#94a3b8" fontSize="11">Modifies: Table Row Tuples</text>
                      <rect x="335" y="65" width="240" height="35" rx="6" fill="#065f46" />
                      <text x="345" y="87" fill="#ecfdf5" fontSize="11">INSERT / UPDATE / DELETE</text>
                      <text x="335" y="122" fill="#a7f3d0" fontSize="10">📝 Row-by-Row Write Ahead Logging (WAL)</text>
                      <text x="335" y="138" fill="#34d399" fontSize="10">✓ Supports ROLLBACK & Row Triggers</text>
                    </svg>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-semibold self-center mr-2">SQL Toolbar:</span>
                  {(['CREATE', 'ALTER', 'INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'DROP'] as const).map((cmd) => (
                    <motion.button
                      key={cmd}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSqlAction(cmd)}
                      className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${
                        cmd === 'DROP' || cmd === 'TRUNCATE'
                          ? 'bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-700/60'
                          : cmd === 'CREATE' || cmd === 'ALTER'
                          ? 'bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700/60'
                          : 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/60'
                      }`}
                    >
                      {cmd}
                    </motion.button>
                  ))}
                </div>

                {/* SQL Execution Output Display */}
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 font-mono text-xs flex items-center justify-between">
                  <span className="text-slate-300">{sqlLastAction}</span>
                  <span className={`px-2 py-0.5 rounded font-bold ${sqlCommandType === 'DDL' ? 'bg-indigo-900/70 text-indigo-300' : 'bg-emerald-900/70 text-emerald-300'}`}>
                    {sqlCommandType} COMMAND
                  </span>
                </div>

                {/* Interactive Table Representation */}
                <div className="overflow-x-auto bg-slate-950 rounded-xl border border-slate-800 p-3">
                  {sqlColumns.length === 0 ? (
                    <div className="p-8 text-center text-rose-400 font-mono text-sm">
                      ⚠️ TABLE Accounts DOES NOT EXIST (Dropped by DDL). Click 'CREATE' to reconstruct.
                    </div>
                  ) : (
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-800 text-indigo-300">
                          {sqlColumns.map((col) => (
                            <th key={col} className="p-2.5">
                              {col.toUpperCase()} {col === 'id' && <span className="text-amber-400 font-normal">[PK]</span>}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sqlTableData.length === 0 ? (
                          <tr>
                            <td colSpan={sqlColumns.length} className="p-4 text-center text-slate-500 italic">
                              [Table is empty — 0 rows stored]
                            </td>
                          </tr>
                        ) : (
                          sqlTableData.map((row) => (
                            <motion.tr key={row.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-slate-800/60 hover:bg-slate-900/40">
                              <td className="p-2.5 font-bold text-amber-300">{row.id}</td>
                              <td className="p-2.5 text-slate-200">{row.name}</td>
                              <td className="p-2.5 text-slate-300">{row.branch}</td>
                              <td className="p-2.5 text-emerald-300 font-bold">₹{row.balance.toLocaleString('en-IN')}</td>
                              {sqlColumns.includes('email') && <td className="p-2.5 text-indigo-300 font-sans">{row.name.toLowerCase().replace(' ', '.')}@sbi.in</td>}
                            </motion.tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Predict-Then-Check Hook in Lab 1 */}
                {!predictionMade ? (
                  <div className="p-4 bg-indigo-950/40 border border-indigo-800/60 rounded-xl">
                    <p className="text-xs font-bold text-indigo-300 uppercase mb-2">🔮 Step Predictor</p>
                    <p className="text-xs text-slate-200 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction(i)}
                          className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-left text-xs text-slate-300 border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
                    <span>✓ Prediction logged. Try clicking DELETE above to observe schema retention.</span>
                    <button onClick={() => setPredictionMade(false)} className="underline text-indigo-300">
                      Reset
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ─── LAB 1: DQL QUERY PIPELINE ─── */}
            {currentSlide === 1 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">WHERE Balance &gt;= ₹{dqlMinBalance.toLocaleString('en-IN')}</label>
                    <input
                      type="range"
                      min={0}
                      max={90000}
                      step={5000}
                      value={dqlMinBalance}
                      onChange={(e) => setDqlMinBalance(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Filter Branch:</label>
                    <select
                      value={dqlSelectedBranch}
                      onChange={(e) => setDqlSelectedBranch(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 text-xs text-white p-2 rounded-lg"
                    >
                      <option value="ALL">ALL Branches</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Bengaluru">Bengaluru</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 pt-4">
                    <input
                      type="checkbox"
                      id="groupBy"
                      checked={dqlGroupByBranch}
                      onChange={(e) => setDqlGroupByBranch(e.target.checked)}
                      className="rounded accent-indigo-500"
                    />
                    <label htmlFor="groupBy" className="text-xs text-indigo-300 font-semibold cursor-pointer">
                      GROUP BY Branch (HAVING AVG &gt; ₹40k)
                    </label>
                  </div>
                </div>

                {/* Generated SQL query preview */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                  SELECT {dqlGroupByBranch ? 'branch, AVG(balance), COUNT(*)' : 'id, name, branch, balance'} FROM Accounts
                  {dqlSelectedBranch !== 'ALL' || dqlMinBalance > 0
                    ? ` WHERE ${[dqlSelectedBranch !== 'ALL' ? `branch = '${dqlSelectedBranch}'` : null, dqlMinBalance > 0 ? `balance >= ${dqlMinBalance}` : null]
                        .filter(Boolean)
                        .join(' AND ')}`
                    : ''}
                  {dqlGroupByBranch ? ' GROUP BY branch HAVING AVG(balance) >= 40000' : ' ORDER BY balance DESC'};
                </div>

                {/* Multi-Representation: Tabular vs Pipeline Card Grid */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 mb-2 font-semibold">Query Result Set:</div>
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
                    {sqlTableData
                      .filter((row) => (dqlSelectedBranch === 'ALL' || row.branch === dqlSelectedBranch) && row.balance >= dqlMinBalance)
                      .map((row) => (
                        <div key={row.id} className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs">
                          <div className="font-bold text-white">{row.name}</div>
                          <div className="text-indigo-400">{row.branch}</div>
                          <div className="text-emerald-300 font-bold mt-1">₹{row.balance.toLocaleString('en-IN')}</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─── LAB 2: JAVA STREAMS & BUFFER FLUSHING ─── */}
            {currentSlide === 2 && (
              <div className="space-y-4">
                {/* SVG 2: Java Character Stream Pipeline Architecture Diagram */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-xs font-semibold text-indigo-300 mb-2">SVG Diagram 2: Java I/O Stream Hierarchy & Buffer Pipeline</div>
                  <svg viewBox="0 0 600 130" className="w-full h-auto text-xs font-mono">
                    {/* Disk File Handle */}
                    <rect x="10" y="25" width="110" height="80" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                    <text x="22" y="55" fill="#f8fafc" fontWeight="bold">File ("data.txt")</text>
                    <text x="22" y="75" fill="#94a3b8" fontSize="10">OS Disk Handle</text>

                    {/* Arrow 1 */}
                    <line x1="120" y1="65" x2="160" y2="65" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow)" />
                    <polygon points="160,65 152,60 152,70" fill="#6366f1" />

                    {/* FileReader */}
                    <rect x="165" y="25" width="125" height="80" rx="8" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="175" y="55" fill="#e0e7ff" fontWeight="bold">FileReader / FW</text>
                    <text x="175" y="75" fill="#c7d2fe" fontSize="10">Raw Char Stream</text>

                    {/* Arrow 2 */}
                    <polygon points="330,65 322,60 322,70" fill="#6366f1" />
                    <line x1="290" y1="65" x2="330" y2="65" stroke="#6366f1" strokeWidth="2" />

                    {/* BufferedReader */}
                    <rect x="335" y="25" width="130" height="80" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
                    <text x="345" y="50" fill="#ecfdf5" fontWeight="bold">BufferedReader</text>
                    <text x="345" y="70" fill="#a7f3d0" fontSize="10">8KB RAM Buffer</text>
                    <text x="345" y="90" fill="#6ee7b7" fontSize="9">flush() on close</text>

                    {/* Arrow 3 */}
                    <polygon points="505,65 497,60 497,70" fill="#34d399" />
                    <line x1="465" y1="65" x2="505" y2="65" stroke="#34d399" strokeWidth="2" />

                    {/* Application Consumer */}
                    <rect x="510" y="25" width="80" height="80" rx="8" fill="#4c1d95" stroke="#a855f7" strokeWidth="1.5" />
                    <text x="516" y="55" fill="#f3e8ff" fontWeight="bold">readLine()</text>
                    <text x="516" y="75" fill="#d8b4fe" fontSize="10">String Consumer</text>
                  </svg>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Buffer writing pane */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <h3 className="text-xs font-bold text-indigo-300 uppercase">1. JVM In-Memory Buffer (BufferedWriter)</h3>
                    <input
                      type="text"
                      value={streamInputText}
                      onChange={(e) => setStreamInputText(e.target.value)}
                      disabled={streamIsClosed}
                      className="w-full bg-slate-900 border border-slate-700 text-xs text-white p-2 rounded-lg"
                    />
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleStreamWrite}
                        disabled={streamIsClosed}
                        className="px-4 py-2 bg-indigo-600 disabled:opacity-50 text-xs font-bold text-white rounded-lg"
                      >
                        bw.write(text); bw.newLine();
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleStreamFlushClose}
                        disabled={streamIsClosed}
                        className="px-4 py-2 bg-emerald-600 disabled:opacity-50 text-xs font-bold text-white rounded-lg"
                      >
                        bw.close(); // Flush to Disk
                      </motion.button>
                      <button onClick={handleStreamReset} className="px-3 py-2 bg-slate-800 text-xs text-slate-300 rounded-lg">
                        Reset
                      </button>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 min-h-[90px]">
                      <div className="text-[11px] text-slate-400 mb-1">RAM Buffer Contents ({streamRamBuffer.length} lines waiting):</div>
                      {streamRamBuffer.length === 0 ? (
                        <div className="text-slate-600 text-xs italic">[Buffer is empty]</div>
                      ) : (
                        streamRamBuffer.map((line, i) => (
                          <div key={i} className="text-xs font-mono text-amber-300">
                            Line {i + 1}: {line}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Physical Disk File Pane */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <h3 className="text-xs font-bold text-emerald-300 uppercase">2. Physical Disk File (ledger.txt)</h3>
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 min-h-[165px] font-mono text-xs space-y-1">
                      {streamDiskContent.map((item, i) => (
                        <div key={i} className="text-emerald-400">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Observation Question */}
                {!observationAnswered ? (
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                    <p className="text-xs font-bold text-amber-400 uppercase mb-2">👁️ System Observation</p>
                    <p className="text-xs text-slate-200 mb-3">{OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservation(i)}
                          className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-left text-xs text-slate-300 border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-xl text-xs text-emerald-300">
                    ✓ Observation confirmed: Buffers prevent high-cost physical disk writes until `close()` or `flush()` is called.
                  </div>
                )}
              </div>
            )}

            {/* ─── LAB 3: RANDOM ACCESS FILE POINTER MATH ─── */}
            {currentSlide === 3 && (
              <div className="space-y-4">
                {/* SVG 3: RandomAccessFile Binary Byte Offset Architecture Diagram */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-xs font-semibold text-indigo-300 mb-2">SVG Diagram 3: RandomAccessFile Binary Record Layout & Offset Seek Math</div>
                  <svg viewBox="0 0 600 120" className="w-full h-auto text-xs font-mono">
                    <rect x="10" y="30" width="580" height="50" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((rec) => {
                      const x = 15 + rec * 70;
                      const isSelected = rafRecordIndex === rec;
                      return (
                        <g key={rec}>
                          <rect
                            x={x}
                            y="35"
                            width="65"
                            height="40"
                            rx="4"
                            fill={isSelected ? '#4338ca' : '#1e293b'}
                            stroke={isSelected ? '#a5b4fc' : '#475569'}
                            strokeWidth={isSelected ? '2' : '1'}
                          />
                          <text x={x + 8} y="52" fill={isSelected ? '#ffffff' : '#94a3b8'} fontSize="10" fontWeight="bold">Rec #{rec}</text>
                          <text x={x + 8} y="67" fill={isSelected ? '#a7f3d0' : '#64748b'} fontSize="9">{rec * 64}B</text>
                        </g>
                      );
                    })}
                    {/* Cursor Pointer Arrow */}
                    <line
                      x1={15 + rafRecordIndex * 70 + 32}
                      y1="90"
                      x2={15 + rafRecordIndex * 70 + 32}
                      y2="110"
                      stroke="#f59e0b"
                      strokeWidth="2"
                    />
                    <polygon
                      points={`${15 + rafRecordIndex * 70 + 32},85 ${15 + rafRecordIndex * 70 + 26},95 ${15 + rafRecordIndex * 70 + 38},95`}
                      fill="#f59e0b"
                    />
                    <text x={15 + rafRecordIndex * 70 + 4} y="118" fill="#f59e0b" fontSize="10" fontWeight="bold">seek({rafRecordIndex * 64}L)</text>
                  </svg>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-xs text-slate-400">Record Size: <span className="text-white font-mono font-bold">64 Bytes</span></div>
                      <div className="text-xs text-slate-400">Target Record Index: <span className="text-amber-400 font-mono font-bold">#{rafRecordIndex}</span></div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Calculated Seek Offset:</div>
                      <div className="text-lg font-mono font-bold text-emerald-400">seek({rafRecordIndex * rafRecordSize}L)</div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Target Record Index Selector (0 to 9):</label>
                    <input
                      type="range"
                      min={0}
                      max={7}
                      value={rafRecordIndex}
                      onChange={(e) => setRafRecordIndex(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                    raf.seek({rafRecordIndex * 64}); // Cursor position: {rafRecordIndex * 64}B | raf.getFilePointer() returns: {rafFilePointer}
                  </div>
                </div>
              </div>
            )}

            {/* ─── LAB 4: ENCAPSULATED BANK ACCOUNT & EXCEPTIONS ─── */}
            {currentSlide === 4 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Account Console */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-300">BankAccount Instance (Acc: 9876543210)</span>
                      <span className="text-xs px-2 py-0.5 bg-indigo-900/60 text-indigo-300 rounded font-mono">private double balance</span>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <div className="text-xs text-slate-400">Current Balance:</div>
                      <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">₹{bankBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-slate-400">Transaction Amount (₹):</label>
                      <input
                        type="number"
                        value={bankAmountInput}
                        onChange={(e) => setBankAmountInput(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 text-sm text-white p-2 rounded-lg font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleBankDeposit}
                        className="p-2.5 bg-emerald-700 hover:bg-emerald-600 text-xs font-bold text-white rounded-xl"
                      >
                        deposit(amt)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleBankWithdraw}
                        className="p-2.5 bg-rose-700 hover:bg-rose-600 text-xs font-bold text-white rounded-xl"
                      >
                        withdraw(amt)
                      </motion.button>
                    </div>

                    {bankExceptionMessage && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-3 bg-rose-950/70 border border-rose-700 rounded-xl text-xs font-mono text-rose-300">
                        🚨 {bankExceptionMessage}
                      </motion.div>
                    )}
                  </div>

                  {/* Transaction History Ledger */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">Encapsulated ArrayList&lt;String&gt; History</span>
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 min-h-[220px] max-h-[220px] overflow-y-auto space-y-1.5 font-mono text-xs">
                      {bankTxnHistory.map((item, i) => (
                        <div key={i} className="text-slate-300 border-b border-slate-800 pb-1">
                          ▸ {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-sm font-semibold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-medium">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextSlide}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg"
            >
              {currentSlide === EXPLORATION_STEPS.length - 1 ? 'Go to Free Sandbox →' : 'Next Lab →'}
            </motion.button>
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.section initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">🎮 Master Systems Architecture Sandbox</h2>
              <span className="text-xs px-3 py-1 bg-emerald-950 text-emerald-300 rounded-full border border-emerald-700/50 font-semibold">
                Ungraded Free Play
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Manipulate SQL schemas, inspect file pointer offsets, and test bank exceptions with zero scoring pressure.
            </p>

            <div className="grid md:grid-cols-2 gap-4 pt-2">
              {/* Mini SQL Sandbox */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-indigo-300">1. Instant SQL Console</div>
                <div className="flex flex-wrap gap-1.5">
                  {(['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE'] as const).map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => handleSqlAction(cmd)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 rounded"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
                <div className="text-[11px] font-mono text-emerald-400 bg-slate-900 p-2 rounded truncate">{sqlLastAction}</div>
              </div>

              {/* Mini Bank Sandbox */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-indigo-300">2. BankAccount Runtime</div>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-400">Balance:</span>
                  <span className="text-emerald-400 font-bold">₹{bankBalance.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleBankDeposit} className="flex-1 py-1 bg-emerald-800 hover:bg-emerald-700 text-xs font-bold rounded">
                    + ₹5k Deposit
                  </button>
                  <button onClick={handleBankWithdraw} className="flex-1 py-1 bg-rose-800 hover:bg-rose-700 text-xs font-bold rounded">
                    - ₹5k Withdraw
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-7 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-xl flex items-center gap-2"
              >
                I Am Ready for Challenges! →
              </motion.button>
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE (NEP 2020 / CISCE Competency Based) ─── */}
      {phase === 'challenge' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Top Status & 2D Canvas Engine Visualizer */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3">
            <canvas ref={canvasRef} width={400} height={25} className="w-full sm:w-auto h-6 rounded" />
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Tier:</span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                    : difficulty === 'standard'
                    ? 'bg-indigo-950 text-indigo-300 border border-indigo-700'
                    : 'bg-rose-950 text-rose-300 border border-rose-700'
                }`}
              >
                {difficulty}
              </motion.span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-400 font-medium">
              <span>
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span>Score: {Math.max(0, 100 - errors * 5)}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Challenge Box */}
          <div
            className={`p-5 sm:p-6 bg-slate-800 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/40 border-rose-500' : 'border-slate-700'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-semibold uppercase">
                NEP Competency: {challenge.competencyLevel}
              </span>
              <span className="text-xs text-slate-400 font-mono">{challenge.nodeId}</span>
            </div>

            <p className="text-white text-base font-medium mb-5 leading-relaxed">{challenge.question}</p>

            {/* TYPE 1: MCQ (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* TYPE 2: Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Draggable Stream Tokens:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-white font-mono text-xs cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Target Slots */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { id: 'target_handle', label: '1. Disk Path Handle' },
                    { id: 'target_reader', label: '2. Raw Character Stream' },
                    { id: 'target_wrapper', label: '3. Memory Buffer Wrapper' },
                    { id: 'target_consumer', label: '4. Application Line Consumer' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border-2 border-dashed min-h-[75px] flex flex-col justify-center items-center text-center transition-all ${
                        droppedLabels[target.id]
                          ? 'border-emerald-500 bg-emerald-950/30'
                          : 'border-slate-700 bg-slate-900/50'
                      }`}
                    >
                      <span className="text-[11px] text-slate-400 font-semibold mb-1">{target.label}</span>
                      <span className="font-mono text-xs font-bold text-amber-300">
                        {droppedLabels[target.id] || 'Drop component here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg"
                >
                  Verify Pipeline Architecture
                </motion.button>
              </div>
            )}

            {/* TYPE 3: Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 text-xs font-mono cursor-grab active:cursor-grabbing flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-indigo-400 mr-2">{displayIndex + 1}.</strong> {item}
                      </span>
                      <span className="text-slate-500 text-xs">↕ Drag to reorder</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg"
                >
                  Submit Clause Evaluation Order
                </motion.button>
              </div>
            )}

            {/* TYPE 4: Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter byte offset"
                    className="p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-mono text-white w-48"
                  />
                  <span className="text-xs text-slate-400 font-semibold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg"
                  >
                    Check Offset
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 5: Construct Code Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>

                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="p-2 bg-indigo-950 border border-indigo-700 hover:bg-indigo-900 rounded-lg text-xs font-mono text-indigo-300"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl min-h-[90px] font-mono text-xs space-y-2">
                  {constructParts.map((p, i) => (
                    <div key={i} className="flex items-center justify-between text-emerald-300">
                      <span>{p}</span>
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 ml-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {constructParts.length === 0 && <span className="text-slate-600 italic">[Click parts above to assemble]</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg"
                >
                  Validate Constructed Code
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 bg-amber-950/40 border border-amber-800 rounded-xl space-y-3">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">Step-by-Step Architecture Explanation:</div>
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-amber-200/90 leading-relaxed">
                      <strong className="text-amber-400">{i + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-3 py-1.5 bg-amber-800/80 hover:bg-amber-700 text-white rounded-lg text-xs font-bold"
                  >
                    Show Next Step →
                  </motion.button>
                )}

                {revealedSteps >= challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="mt-2 block px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Ledger Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 5: COMPLETION & REFLECTION PHASE ─── */}
      {phase === 'complete' && (
        <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 rounded-2xl border border-indigo-700 shadow-2xl text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-bold text-white">ISC Computer Science Mastery Certified</h2>
            <div className="text-3xl font-extrabold font-mono text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
            <p className="text-xs text-indigo-300">Mastery Classification: <span className="font-bold text-white capitalize">{masteryLevel}</span></p>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-xl text-xs text-emerald-300 leading-relaxed">
            {errors === 0
              ? '🌟 FLAWLESS ARCHITECTURE EXECUTION! You achieved a perfect score across SQL, Java Streams, RandomAccessFiles, and Object Encapsulation.'
              : errors <= 3
              ? '🎯 EXCELLENT WORK! You demonstrated solid mastery of low-level Java I/O and SQL schema theory. Review the minor gap notes below.'
              : '🌱 GOOD FOUNDATIONAL EFFORT! You are building deep systems intuition. Review the specific misconceptions below and re-run the simulation.'}
          </div>

          {/* ─── REFLECTION SECTION (Structural Requirement) ─── */}
          <div className="p-5 bg-slate-800 rounded-2xl border border-indigo-800/60 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
              <span>🧠</span> ARCHITECTURAL REFLECTION & SYNTHESIS
            </div>
            <p className="text-xs text-slate-300">
              Deepen your permanent learning by answering these conceptual reflection prompts:
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflections.surprising}
                  onChange={(e) => setReflections((r) => ({ ...r, surprising: e.target.value }))}
                  placeholder="E.g., How TRUNCATE bypasses row-level undo logs compared to DELETE, or how buffered writers require flush/close..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 min-h-[60px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-indigo-300 mb-1">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflections.explainFriend}
                  onChange={(e) => setReflections((r) => ({ ...r, explainFriend: e.target.value }))}
                  placeholder="E.g., SQL is like the master ledger book in a vault, while Java streams are conveyor belts carrying parcels to disk..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 min-h-[60px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-300 mb-1">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflections.realLife}
                  onChange={(e) => setReflections((r) => ({ ...r, realLife: e.target.value }))}
                  placeholder="E.g., Building UPI payments engines, airline seat reservations, or database caching architectures..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 min-h-[60px]"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setReflectionSubmitted(true);
                  audioManager.play('drop-correct');
                  speechManager.speak('Your architectural reflections have been saved to your learning portfolio.');
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow"
              >
                {reflectionSubmitted ? '✓ Reflections Saved' : 'Save Reflection Entry'}
              </motion.button>
            </div>
          </div>

          {/* Misconceptions Review Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-4 bg-rose-950/40 border border-rose-800 rounded-xl space-y-3">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">⚠️ Your Personalized Misconception Profile</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 text-xs">
                    <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                    <p className="text-emerald-400 font-medium">✓ CISCE Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition SRS Schedule */}
          <div className="p-4 bg-amber-950/40 border border-amber-800 rounded-xl text-xs text-amber-300 space-y-1">
            <span className="font-bold uppercase tracking-wider">📅 Spaced Repetition Schedule (SM-2):</span>
            <p className="text-slate-300">
              Your next review interval is scheduled in{' '}
              <strong className="text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
            </p>
          </div>

          {/* Real World Activity Arc Completion */}
          <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="text-xs text-slate-400 font-mono">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── SIM-ENGINE FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Simulation Milestone Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_ComputerScienceCreateAlterDropSim;
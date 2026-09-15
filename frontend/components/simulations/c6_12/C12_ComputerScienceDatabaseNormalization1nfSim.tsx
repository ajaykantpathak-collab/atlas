'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// Node IDs as string literals
const NODE_C12_CS_031 = 'c12_cs_031';
const NODE_C12_CS_032 = 'c12_cs_032';
const NODE_C12_CS_033 = 'c12_cs_033';
const NODE_C12_CS_034 = 'c12_cs_034';
const NODE_C12_CS_035 = 'c12_cs_035';
const NODE_C12_CS_036 = 'c12_cs_036';
const NODE_C12_CS_037 = 'c12_cs_037';
const NODE_C12_CS_038 = 'c12_cs_038';
const NODE_C12_CS_039 = 'c12_cs_039';
const NODE_C12_CS_040 = 'c12_cs_040';

const ALL_NODE_IDS = [
  NODE_C12_CS_031,
  NODE_C12_CS_032,
  NODE_C12_CS_033,
  NODE_C12_CS_034,
  NODE_C12_CS_035,
  NODE_C12_CS_036,
  NODE_C12_CS_037,
  NODE_C12_CS_038,
  NODE_C12_CS_039,
  NODE_C12_CS_040,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Architecting National EduPortal: From Flat Chaos to Normalised Relational Schema',
  intro: 'The National Education Board in New Delhi manages records for 12,000 schools across India. Their legacy admission sheet has student contact lists with multiple phone numbers in one cell, composite keys with partial dependencies, and manager hierarchies stored loosely. Data corruption has reached critical levels.',
  context: 'As the Principal Database Architect, your mission is to systematically normalise the tables from unnormalised state to BCNF, design ER schemas, construct multi-table SQL queries, manage ACID transactions, and evaluate modern NoSQL distributed architectures.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In a student table, the Phone_Numbers cell contains "9876543210, 9998887777". Which normal form is immediately violated?',
  options: [
    'First Normal Form (1NF) — atomic value constraint violated',
    'Second Normal Form (2NF) — transitive dependency detected',
    'Third Normal Form (3NF) — composite determinant missing',
    'Boyce-Codd Normal Form (BCNF) — lack of candidate key',
  ],
  correctIndex: 0,
  hintAfter: "Let's explore how atomicity, dependencies, and relation decomposition ensure absolute data integrity!",
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

// ─── 22 CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_1nf_f',
    nodeId: NODE_C12_CS_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the core prerequisite for a relational database table to satisfy First Normal Form (1NF)?',
    options: [
      'Every column attribute must contain only atomic (indivisible) values and no repeating groups',
      'The primary key must be a single column rather than composite',
      'No non-key attribute can depend on another non-key attribute',
      'Every determinant in the functional dependencies must be a candidate key',
    ],
    correctIndex: 0,
    explanation: 'First Normal Form (1NF) requires that each cell holds an indivisible atomic value, rows are unique, and repeating multi-valued arrays or composite strings are eliminated.',
    hints: [
      'Think about what happens when a single cell contains a comma-separated list of values.',
      '1NF deals with row uniqueness and indivisible data items in every cell.',
      'Atomicity means a field cannot be split into smaller meaningful domain parts.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_02_2nf_f',
    nodeId: NODE_C12_CS_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In relation R(Student_ID, Course_ID, Student_Name, Grade) with composite key (Student_ID, Course_ID), the dependency Student_ID -> Student_Name is classified as:',
    options: [
      'A partial dependency violating 2NF',
      'A transitive dependency violating 3NF',
      'A multi-valued dependency violating 4NF',
      'A valid fully functional dependency satisfying BCNF',
    ],
    correctIndex: 0,
    explanation: 'Because Student_Name depends only on Student_ID (a proper subset of the composite primary key), it is a partial dependency. 2NF requires non-prime attributes to be fully functionally dependent on the entire candidate key.',
    hints: [
      'Look at the primary key: it has two attributes, (Student_ID, Course_ID).',
      'Student_Name depends only on the Student_ID part of the key, not on Course_ID.',
      'A non-key attribute depending on part of a composite key is a partial dependency.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_03_3nf_s',
    nodeId: NODE_C12_CS_031,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Delhi Public School stores Staff(Emp_ID, Dept_ID, Dept_Name, Salary). Emp_ID is the primary key. Given Emp_ID -> Dept_ID and Dept_ID -> Dept_Name, why does this violate 3NF?',
    options: [
      'Dept_Name depends transitively on Emp_ID via the non-key attribute Dept_ID',
      'Dept_Name is partially dependent on a composite key',
      'Emp_ID is not unique across departments',
      'Dept_ID is not a foreign key constraint',
    ],
    correctIndex: 0,
    explanation: 'A transitive dependency occurs when non-key attribute A determines non-key attribute B (Emp_ID -> Dept_ID -> Dept_Name). 3NF forbids non-prime attributes from depending on the primary key through another non-prime attribute.',
    hints: [
      'Emp_ID is the primary key. Is Dept_ID a candidate key?',
      'Dept_ID determines Dept_Name, creating a chain: Emp_ID -> Dept_ID -> Dept_Name.',
      'This non-key to non-key dependency chain is known as a transitive dependency.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_04_er_drag_f',
    nodeId: NODE_C12_CS_032,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Map the ER diagram components to their standard Chen notation symbols.',
    dragItems: [
      { label: 'Entity', targetId: 'target_rect' },
      { label: 'Attribute', targetId: 'target_oval' },
      { label: 'Relationship', targetId: 'target_diamond' },
      { label: 'Key Attribute', targetId: 'target_underlined' },
    ],
    correctMapping: {
      target_rect: 'Entity',
      target_oval: 'Attribute',
      target_diamond: 'Relationship',
      target_underlined: 'Key Attribute',
    },
    explanation: 'In Chen ER notation, Entities are represented by rectangles, Attributes by ovals, Relationships by diamonds, and Key Attributes by underlined text within ovals.',
    hints: [
      'Rectangles represent real-world objects like Student or Book.',
      'Diamonds connect entities to show how they interact.',
      'Ovals store descriptive properties, and key attributes are underlined.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_05_norm_sort_s',
    nodeId: NODE_C12_CS_031,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of normalisation steps in order from raw unnormalised data to BCNF.',
    sortItems: [
      'Eliminate repeating groups and ensure atomic values in all cells (1NF)',
      'Remove partial dependencies so non-keys depend on entire composite key (2NF)',
      'Eliminate transitive dependencies between non-key attributes (3NF)',
      'Ensure every determinant is strictly a candidate key (BCNF)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Normalisation must proceed strictly in order: 1NF enforces atomicity, 2NF removes partial key dependencies, 3NF removes transitive chains, and BCNF ensures every determinant is a superkey.',
    hints: [
      'You cannot check for partial dependencies until cells contain single atomic values.',
      '3NF comes only after composite keys have no partial dependencies (2NF).',
      'BCNF is the strictest form and comes last in this chain.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_06_cross_join_num_s',
    nodeId: NODE_C12_CS_033,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An ISC school uniform shop has a table Shirt(colour) with 4 rows and Pants(size) with 6 rows. How many rows will "SELECT * FROM Shirt CROSS JOIN Pants;" return?',
    correctAnswer: 24,
    tolerance: 0,
    unit: 'rows',
    explanation: 'A CROSS JOIN produces the Cartesian product of two tables. 4 rows multiplied by 6 rows yields exactly 24 distinct combination rows.',
    hints: [
      'A CROSS JOIN pairs every single row of the first table with every row of the second.',
      'Multiply the row count of table 1 by the row count of table 2.',
      '4 × 6 = 24 rows.',
    ],
  },
  {
    id: 'ch_07_self_join_s',
    nodeId: NODE_C12_CS_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In table Staff(Emp_ID, Name, Manager_ID), which query correctly displays each employee with their manager name using a SELF JOIN?',
    options: [
      'SELECT E.Name AS Emp, M.Name AS Mgr FROM Staff E JOIN Staff M ON E.Manager_ID = M.Emp_ID;',
      'SELECT Name FROM Staff WHERE Manager_ID = Emp_ID;',
      'SELECT Staff.Name, Staff.Name FROM Staff JOIN Staff ON Staff.Manager_ID = Staff.Emp_ID;',
      'SELECT E.Name, M.Name FROM Staff E CROSS JOIN Staff M WHERE E.Emp_ID = M.Emp_ID;',
    ],
    correctIndex: 0,
    explanation: 'A SELF JOIN requires table aliases (E and M) to distinguish the employee role from the manager role while matching E.Manager_ID to M.Emp_ID.',
    hints: [
      'Both employee and manager records live in the same Staff table.',
      'You must assign two distinct aliases (like E and M) so the query parser knows which role is which.',
      'The employee\'s Manager_ID should equal the manager\'s Emp_ID.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_08_groupby_having_f',
    nodeId: NODE_C12_CS_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does "SELECT class, AVG(marks) FROM students WHERE AVG(marks) > 60 GROUP BY class;" produce an error in standard SQL?',
    options: [
      'WHERE clause cannot filter aggregated results; HAVING must be used instead',
      'The class column is not an aggregate function',
      'AVG() function can only be used in ORDER BY',
      'GROUP BY must always precede WHERE in query execution order',
    ],
    correctIndex: 0,
    explanation: 'The WHERE clause filters individual rows before grouping occurs. To filter aggregated results across groups, the HAVING clause is required.',
    hints: [
      'Remember the SQL execution order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT.',
      'When WHERE executes, the groups and their averages have not been computed yet.',
      'Aggregate filters must always be placed inside HAVING.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_09_subqueries_a',
    nodeId: NODE_C12_CS_035,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Identify the correlated subquery that retrieves students who scored higher than the average marks of their own class section.',
    options: [
      'SELECT * FROM Students S WHERE marks > (SELECT AVG(marks) FROM Students WHERE section = S.section);',
      'SELECT * FROM Students WHERE marks > (SELECT AVG(marks) FROM Students);',
      'SELECT * FROM Students WHERE marks > ALL (SELECT AVG(marks) FROM Students GROUP BY section);',
      'SELECT S.roll, S.name FROM Students S JOIN (SELECT AVG(marks) FROM Students) ON 1=1;',
    ],
    correctIndex: 0,
    explanation: 'The inner query references "S.section" from the outer row, making it correlated and evaluated row-by-row for each student\'s section.',
    hints: [
      'A correlated subquery references a column from the outer query table alias.',
      'Look for "section = S.section" where S is defined in the outer FROM clause.',
      'Non-correlated subqueries do not reference outer table columns.',
    ],
  },
  {
    id: 'ch_10_trans_construct_s',
    nodeId: NODE_C12_CS_036,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the valid SQL transaction sequence for an ICICI Bank transfer of ₹5000 with a savepoint before credit.',
    availableParts: [
      'BEGIN;',
      'UPDATE Acc SET bal = bal - 5000 WHERE id = 101;',
      'SAVEPOINT sp1;',
      'UPDATE Acc SET bal = bal + 5000 WHERE id = 202;',
      'COMMIT;',
    ],
    targetState: 'BEGIN; UPDATE Acc SET bal = bal - 5000 WHERE id = 101; SAVEPOINT sp1; UPDATE Acc SET bal = bal + 5000 WHERE id = 202; COMMIT;',
    validationHint: 'Add: BEGIN -> Debit UPDATE -> SAVEPOINT sp1 -> Credit UPDATE -> COMMIT',
    explanation: 'This sequence guarantees Atomicity and Consistency. The savepoint provides a recovery checkpoint if the credit UPDATE encounters an error.',
    hints: [
      'Start the transaction with BEGIN.',
      'Deduct from sender account, establish the savepoint, credit receiver, then finalize with COMMIT.',
      'Assemble all 5 parts in logical order.',
    ],
  },
  {
    id: 'ch_11_acid_f',
    nodeId: NODE_C12_CS_036,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which ACID property guarantees that once a transaction executes COMMIT, its changes will never be lost even if power fails immediately?',
    options: [
      'Durability — changes persist on non-volatile storage',
      'Atomicity — all-or-nothing execution',
      'Isolation — transactions execute without interference',
      'Consistency — schema constraints remain valid',
    ],
    correctIndex: 0,
    explanation: 'Durability ensures that committed data modifications survive crashes, power outages, and system restarts by writing to non-volatile logs.',
    hints: [
      'Think about system crashes after COMMIT has succeeded.',
      'Atomicity is "all or nothing", while Durability is "permanent survival".',
      'Durability relies on persistent transaction logs.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_12_fk_s',
    nodeId: NODE_C12_CS_037,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a CBSE school database, table Marks has column Student_ID referencing Students(Student_ID). What happens if an admin attempts to insert a mark for a non-existent Student_ID 9999?',
    options: [
      'The database rejects the INSERT due to a FOREIGN KEY referential integrity violation',
      'The database automatically creates a new Student record with ID 9999',
      'The INSERT succeeds and marks Student_ID as NULL',
      'The entire Students table is rolled back',
    ],
    correctIndex: 0,
    explanation: 'A FOREIGN KEY constraint enforces referential integrity: child records cannot reference parent keys that do not exist in the referenced table.',
    hints: [
      'Can a child row exist if its referenced parent key does not exist?',
      'Foreign keys guarantee that pointers between tables always remain valid.',
      'The database engine blocks the insertion with a constraint error.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_13_proc_func_s',
    nodeId: NODE_C12_CS_038,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the primary syntactical difference in SQL between a stored function and a stored procedure?',
    options: [
      'A stored function must return a single scalar value and can be embedded inside SELECT expressions, whereas a procedure is invoked via CALL',
      'A stored procedure can only use IN parameters, while functions use OUT parameters',
      'Functions execute on the client while procedures run on the server',
      'Procedures cannot modify database tables, whereas functions can',
    ],
    correctIndex: 0,
    explanation: 'Stored functions return a single value and can be embedded directly in SELECT/WHERE expressions. Stored procedures are invoked with CALL and manage multi-statement workflows.',
    hints: [
      'Can you write "SELECT calculateTax(salary) FROM Employees"? Yes, because it is a function.',
      'Procedures are called with "CALL procName()".',
      'Functions compute and return exactly one value.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_14_triggers_a',
    nodeId: NODE_C12_CS_039,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'To audit salary reductions by copying old and new values to an audit table whenever an update completes successfully, which trigger is best suited?',
    options: [
      'AFTER UPDATE ON Employees FOR EACH ROW (referencing OLD and NEW values)',
      'BEFORE INSERT ON Employees FOR EACH ROW',
      'AFTER DELETE ON AuditLog',
      'BEFORE UPDATE ON Employees (since AFTER triggers cannot access OLD)',
    ],
    correctIndex: 0,
    explanation: 'AFTER UPDATE triggers fire once the row update is successfully completed, making them ideal for logging to an audit table using OLD.salary and NEW.salary.',
    hints: [
      'Auditing and logging should occur AFTER the primary change has succeeded.',
      'In an UPDATE trigger, both OLD and NEW pseudo-records are available.',
      'BEFORE triggers are used for validation and data sanitation.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_15_nosql_f',
    nodeId: NODE_C12_CS_040,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the database paradigm with its primary data model and representative engine.',
    options: [
      'Document: MongoDB (JSON/BSON) | Key-Value: Redis | Column: Cassandra | Graph: Neo4j',
      'Document: Neo4j | Key-Value: Cassandra | Column: Redis | Graph: MongoDB',
      'Document: Redis | Key-Value: MongoDB | Column: Neo4j | Graph: Cassandra',
      'Document: Cassandra | Key-Value: Neo4j | Column: MongoDB | Graph: Redis',
    ],
    correctIndex: 0,
    explanation: 'MongoDB is a document store, Redis is a high-speed in-memory key-value store, Apache Cassandra is a column-family store, and Neo4j is a graph database.',
    hints: [
      'MongoDB stores JSON-like documents.',
      'Redis maps keys to fast values in memory.',
      'Neo4j uses nodes and edges for graph traversal.',
    ],
  },
  {
    id: 'ch_16_nosql_eval_a',
    nodeId: NODE_C12_CS_040,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Flipkart needs to store live shopping cart sessions for 20 million users with sub-millisecond retrieval. Which NoSQL database architecture is most appropriate?',
    options: [
      'Key-Value Store (Redis) — in-memory key hashing ensures fastest O(1) session retrieval',
      'Graph Database (Neo4j) — deep traversal across shopping carts',
      'Relational Database with 3NF normalization — strict ACID constraints on browsing',
      'Document Store with 5-level nested arrays without indexing',
    ],
    correctIndex: 0,
    explanation: 'Key-value stores like Redis hold data in-memory with constant time O(1) lookups by session key, making them ideal for high-throughput, low-latency session caching.',
    hints: [
      'Cart sessions are accessed rapidly by a single unique Session_ID.',
      'Sub-millisecond latency requires in-memory key-value lookups.',
      'Redis is the industry standard for fast session caching.',
    ],
  },
  {
    id: 'ch_17_bcnf_a',
    nodeId: NODE_C12_CS_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A table is in 3NF. Under what specific condition does it FAIL to be in Boyce-Codd Normal Form (BCNF)?',
    options: [
      'When there is a functional dependency X -> Y where X is NOT a superkey, even if Y is a prime attribute',
      'When atomic values are separated by commas in a text field',
      'When a foreign key references a non-unique column',
      'When two candidate keys have different numbers of attributes',
    ],
    correctIndex: 0,
    explanation: '3NF permits X -> Y if Y is a prime attribute (part of candidate key). BCNF eliminates this exception: every determinant X MUST strictly be a candidate key (superkey).',
    hints: [
      'Recall the 3NF definition: X is a superkey OR Y is a prime attribute.',
      'BCNF removes the second condition: X MUST be a candidate key.',
      'If a determinant is not a superkey, BCNF is violated.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_18_count_s',
    nodeId: NODE_C12_CS_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Table Students has 100 rows. 20 students have NULL in their Email column. What will "SELECT COUNT(*), COUNT(Email) FROM Students;" return?',
    options: [
      '100 and 80 — COUNT(*) counts all rows while COUNT(col) ignores NULLs',
      '100 and 100 — COUNT always returns total table rows',
      '80 and 80 — NULL rows are discarded by both',
      'Error — COUNT cannot be executed on nullable columns',
    ],
    correctIndex: 0,
    explanation: 'COUNT(*) tallies every tuple in the table regardless of NULLs. COUNT(Email) evaluates only non-NULL entries in that specific column (100 - 20 = 80).',
    hints: [
      'COUNT(*) counts the total rows returned.',
      'COUNT(column_name) counts only rows where the column contains a non-NULL value.',
      '100 total rows minus 20 NULLs leaves 80 non-NULL emails.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_19_index_eval_s',
    nodeId: NODE_C12_CS_037,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why should a database administrator NOT create an index on every column in a high-frequency transactional table?',
    options: [
      'Every INSERT, UPDATE, and DELETE statement is slowed down because all auxiliary index B-trees must be updated',
      'Indexes corrupt primary key constraints during transactions',
      'SQL standards permit a maximum of two indexes per table',
      'Queries using WHERE clauses become slower when indexes exist',
    ],
    correctIndex: 0,
    explanation: 'While indexes accelerate SELECT queries, every write operation (INSERT/UPDATE/DELETE) incurs additional overhead to maintain the index structures on disk.',
    hints: [
      'Think about write operations: INSERT, UPDATE, DELETE.',
      'When data changes, the lookup index tree must also be updated.',
      'Too many indexes degrade write throughput significantly.',
    ],
  },
  {
    id: 'ch_20_er_map_a',
    nodeId: NODE_C12_CS_032,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'How is a Many-to-Many (M:N) relationship between Student and Course correctly transformed into relational tables?',
    options: [
      'Create a junction (associative) table with (Student_ID, Course_ID) as foreign keys forming a composite primary key',
      'Add a comma-separated Course_ID list into the Student table',
      'Place Student_ID as a foreign key inside the Course table only',
      'Convert the relationship into two separate databases',
    ],
    correctIndex: 0,
    explanation: 'Relational databases cannot store multi-valued arrays in atomic cells (1NF). An M:N relationship requires a junction table containing foreign keys to both parent tables.',
    hints: [
      'Can one student have many courses AND one course have many students?',
      'Placing foreign keys directly in either table causes repeating values or 1NF violation.',
      'A third linking/junction table is required.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_21_exists_in_a',
    nodeId: NODE_C12_CS_035,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is "NOT EXISTS" generally safer than "NOT IN" when subquery results may contain NULL values?',
    options: [
      'If the subquery returns even one NULL, "NOT IN" evaluates to UNKNOWN/false for all rows, returning zero records',
      'EXISTS requires table locks while IN does not',
      'NOT IN is deprecated in ANSI SQL',
      'NOT EXISTS only checks primary key columns',
    ],
    correctIndex: 0,
    explanation: 'In three-valued SQL logic, if a subquery returns a NULL, `x NOT IN (NULL, ...)` evaluates to UNKNOWN, causing all row filtering to fail. NOT EXISTS tests boolean row existence and handles NULL safely.',
    hints: [
      'Consider SQL three-valued logic: TRUE, FALSE, UNKNOWN.',
      'Comparison with NULL using IN produces UNKNOWN.',
      'EXISTS checks whether a row is returned, regardless of NULL content.',
    ],
  },
  {
    id: 'ch_22_decomp_eval_a',
    nodeId: NODE_C12_CS_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Given R(A, B, C, D) with FDs: A -> B, B -> C, C -> D, and candidate key A. Which decomposition reaches 3NF without losing functional dependencies?',
    options: [
      'R1(A, B), R2(B, C), R3(C, D) — all determinants become candidate keys of their respective relations',
      'R1(A, D) and R2(B, C)',
      'R1(A, B, C) and R2(C, D)',
      'Keep R(A, B, C, D) as it is already in 3NF',
    ],
    correctIndex: 0,
    explanation: 'Each transitive dependency (A -> B -> C -> D) is isolated into separate relations where the determinant (A, B, C) acts as the primary key of its own table, achieving 3NF and preserving dependencies.',
    hints: [
      'Notice the transitive chain: A determines B, B determines C, C determines D.',
      'Each dependency requires its determinant to be the primary key of a decomposed table.',
      'Splitting into R1(A, B), R2(B, C), R3(C, D) preserves all dependencies cleanly.',
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
  nodeId: NODE_C12_CS_031,
  title: 'Database Normalization & Relational Architecture',
  definition: 'Database normalization is the systematic process of decomposing relations to eliminate anomalies (insertion, update, deletion) and ensure functional dependencies are correctly enforced across 1NF, 2NF, 3NF, and BCNF.',
  eli5: 'Normalization is like sorting a cluttered drawer into organized, labeled compartments so nothing is duplicated and updating one item does not break anything else.',
  misconceptions: [
    {
      misconception: 'Naming the normal form without writing out functional dependencies (X -> Y) is sufficient.',
      correction: 'CISCE examiners mandate writing explicit dependencies (X -> Y), identifying the violating determinant, and showing decomposed relation schemas with primary keys.',
    },
    {
      misconception: 'A table can be tested for 3NF or BCNF directly without checking 1NF and 2NF.',
      correction: 'Normal forms are hierarchical. A relation MUST satisfy 1NF (atomic cells) and 2NF (no partial dependencies) before 3NF or BCNF can be evaluated.',
    },
    {
      misconception: '3NF and BCNF are identical in all relational models.',
      correction: '3NF permits non-superkey determinants if the dependent attribute is prime. BCNF strictly requires every determinant to be a candidate key.',
    },
    {
      misconception: 'WHERE and HAVING clauses can be used interchangeably for aggregate filters.',
      correction: 'WHERE filters tuples before grouping; HAVING filters aggregated groups after GROUP BY computation.',
    },
    {
      misconception: 'NoSQL databases are always superior to relational databases and render SQL obsolete.',
      correction: 'SQL excels at ACID transactions and structured joins (banking, ERP); NoSQL excels at dynamic schemas, horizontal scaling, and specific access patterns (caching, graphs).',
    },
  ],
  diagnosticQuestions: [
    { question: 'What characterizes First Normal Form (1NF)?', options: ['Atomic values only', 'No foreign keys', 'Single column keys only', 'No indexes'], correctIndex: 0 },
    { question: 'Partial dependency is eliminated in which normal form?', options: ['1NF', '2NF', '3NF', 'BCNF'], correctIndex: 1 },
    { question: 'What type of dependency is eliminated in 3NF?', options: ['Partial', 'Transitive', 'Multi-valued', 'Join'], correctIndex: 1 },
    { question: 'In BCNF, every determinant must be a:', options: ['Foreign key', 'Candidate key (superkey)', 'Secondary index', 'Composite attribute'], correctIndex: 1 },
    { question: 'Which join returns the Cartesian product of two tables without an ON condition?', options: ['INNER JOIN', 'LEFT JOIN', 'CROSS JOIN', 'FULL JOIN'], correctIndex: 2 },
    { question: 'Which SQL clause filters groups AFTER aggregation has occurred?', options: ['WHERE', 'HAVING', 'ORDER BY', 'GROUP BY'], correctIndex: 1 },
    { question: 'What does the "A" in ACID properties stand for?', options: ['Atomicity', 'Availability', 'Accuracy', 'Authentication'], correctIndex: 0 },
    { question: 'Which NoSQL family is best optimized for social networks and relationship traversal?', options: ['Key-Value', 'Document', 'Column-Family', 'Graph'], correctIndex: 3 },
  ],
  masteryCriteria: 'Student can analyze relations, write functional dependencies X -> Y, decompose schemas up to BCNF, construct advanced SQL queries with joins and subqueries, manage ACID transactions, and evaluate NoSQL architectures.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Stage 1: Eliminating Multi-Valued Cells (1NF)',
    instruction: 'Click on the multi-valued phone number cells to atomize them into separate relational records.',
    interactionType: 'click-atomize',
    nodeId: NODE_C12_CS_031,
  },
  {
    title: 'Stage 2: Removing Partial Key Dependencies (2NF)',
    instruction: 'Review the decomposition of composite key attributes into dedicated single-key relations.',
    interactionType: 'drag-decompose-2nf',
    nodeId: NODE_C12_CS_031,
  },
  {
    title: 'Stage 3: Transitive Dependency & SQL Query Simulator',
    instruction: 'Adjust the table redundancy slider and execute live SQL joins to observe memory and anomaly metrics in real-time.',
    interactionType: 'slider-observe-joins',
    nodeId: NODE_C12_CS_033,
  },
  {
    title: 'Stage 4: ACID Transaction & Savepoint Engine',
    instruction: 'Step through an atomic banking transaction: simulate server crash before vs after COMMIT.',
    interactionType: 'transaction-simulator',
    nodeId: NODE_C12_CS_036,
  },
  {
    title: 'Stage 5: NoSQL Architectural Matchmaker',
    instruction: 'Connect modern enterprise workloads (caching, social graph, time-series, catalogs) to the ideal database engine.',
    interactionType: 'nosql-matcher',
    nodeId: NODE_C12_CS_040,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS (Minimum 2 with verifyInstruction) ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an un-normalized table with 10,000 students has repeating course cells decomposed into 1NF, what happens to the total number of rows?',
    options: [
      'Total row count INCREASES as multi-valued cells expand into individual tuples',
      'Total row count DECREASES due to deduplication',
      'Total row count remains exactly the same',
      'The database crashes due to infinite recursion',
    ],
    correctIndex: 0,
    verifyInstruction: 'Interact with the 1NF atomization tool below to witness row expansion in real-time.',
    nodeId: NODE_C12_CS_031,
  },
  {
    question: 'Predict: When decomposing a 1NF table into 2NF to eliminate partial dependencies, how many separate relation tables will be created for R(StudentID, CourseID, StudentName, CourseTitle, Marks)?',
    options: [
      '3 tables: Student(StudentID, StudentName), Course(CourseID, CourseTitle), and Enrolment(StudentID, CourseID, Marks)',
      '1 table: Keeping everything together with extra indices',
      '5 tables: One table per individual attribute',
      '2 tables: Student and Course only, discarding Marks',
    ],
    correctIndex: 0,
    verifyInstruction: 'Navigate to Step 2 (2NF Partial Dependency Decomposition) to verify the 3 resulting relation schemas.',
    nodeId: NODE_C12_CS_031,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about data redundancy in the Dept_Name column as you move the Normalization Level slider from Un-normalized to 3NF?',
    observableOptions: [
      'Redundant department name strings drop to ZERO as Dept_Name is moved to a dedicated Department table',
      'Dept_Name is copied into every student row repeatedly',
      'Memory consumption increases by 500%',
      'The primary key is deleted automatically',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_CS_031,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'CISCE Board Practical Project: Schema Architect for "Aadhaar Health Card"',
  description: 'Design a fully normalised (3NF/BCNF) database schema for the National Digital Health Mission. The system tracks Citizens, Doctors, Hospitals, Medical Prescriptions, and Diagnostic Tests across India.',
  steps: [
    'Identify entities: Citizen, Doctor, Hospital, Prescription, TestRecord.',
    'Formulate functional dependencies using X -> Y notation and identify composite keys.',
    'Decompose M:N relationships into associative junction tables with referential integrity.',
    'Write a SQL transaction sequence with SAVEPOINT for pharmacy dispensing.',
    'Select the ideal NoSQL auxiliary store (Redis for live OTP verification, Cassandra for ECG sensor stream).',
  ],
};

// ─── COMPONENT IMPLEMENTATION ��──
function C12_ComputerScienceDatabaseNormalization1nfSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['compsci'] || { name: 'Computer Science', emoji: '💻', color: 'cyan' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Multi-representation view toggle
  const [repView, setRepView] = useState<'table' | 'fd_graph' | 'venn'>('table');

  // Brilliant-style Interactive State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [pred2Made, setPred2Made] = useState(false);
  const [pred2Index, setPred2Index] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Normalization Interactive Lab State
  const [atomizedRows, setAtomizedRows] = useState<boolean>(false);
  const [normSliderLevel, setNormSliderLevel] = useState<number>(1); // 1 = Raw, 2 = 1NF, 3 = 2NF, 4 = 3NF
  const [activeJoinType, setActiveJoinType] = useState<'INNER' | 'LEFT' | 'CROSS' | 'SELF'>('INNER');
  const [redundancyScore, setRedundancyScore] = useState<number>(85);
  const [queryExecutionTimeMs, setQueryExecutionTimeMs] = useState<number>(12);

  // Transaction Sim State
  const [transStep, setTransStep] = useState<number>(0);
  const [senderBal, setSenderBal] = useState<number>(15000);
  const [receiverBal, setReceiverBal] = useState<number>(4000);
  const [transStatus, setTransStatus] = useState<string>('Transaction Ready');

  // NoSQL Matcher State
  const [selectedNoSqlEngine, setSelectedNoSqlEngine] = useState<string | null>(null);

  // Challenge System State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop & Input State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Reflection State
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Feedback State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Adaptive difficulty filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

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

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      const packetX = (frame * 2.5) % (canvas.width + 40) - 20;
      const gradient = ctx.createLinearGradient(packetX - 15, 0, packetX + 15, 0);
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0)');
      gradient.addColorStop(0.5, '#6366f1');
      gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(packetX - 20, 8, 40, 14);

      ctx.beginPath();
      ctx.arc(packetX, 15, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(`SQL Pipeline Status: LIVE | PacketSync #${frame % 1000}`, 10, 19);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentSlide]);

  useEffect(() => {
    if (normSliderLevel === 1) {
      setRedundancyScore(90);
      setQueryExecutionTimeMs(48);
    } else if (normSliderLevel === 2) {
      setRedundancyScore(55);
      setQueryExecutionTimeMs(28);
    } else if (normSliderLevel === 3) {
      setRedundancyScore(20);
      setQueryExecutionTimeMs(14);
    } else {
      setRedundancyScore(0);
      setQueryExecutionTimeMs(8);
    }
  }, [normSliderLevel]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount]);

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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding observation! 1NF demands atomic cells.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive database architecture laboratory.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter the open sandbox to freely test normalization levels and SQL queries.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Prepare for competency-based ISC examination challenges.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Now test your hypothesis using the interactive tool below.');
  }, []);

  const handlePrediction2 = useCallback((idx: number) => {
    setPred2Index(idx);
    setPred2Made(true);
    audioManager.play('tap');
    speechManager.speak('Check the 2NF decomposed relations below.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation! Transitive redundancy is eliminated.' : 'Inspect the table structure closely.');
  }, []);

  const handleAtomizeClick = useCallback(() => {
    setAtomizedRows(prev => !prev);
    audioManager.play('pop');
    setPredictionVerified(true);
    speechManager.speak(atomizedRows ? 'Reverted to multi-valued cell' : 'Table successfully converted to atomic 1NF rows');
  }, [atomizedRows]);

  const handleTransStep = useCallback((step: number) => {
    audioManager.play('tap');
    if (step === 1) {
      setSenderBal(prev => prev - 5000);
      setTransStep(1);
      setTransStatus('Step 1: ₹5,000 Debited from Sender (Uncommitted)');
    } else if (step === 2) {
      setTransStep(2);
      setTransStatus('Step 2: SAVEPOINT sp1 established in transaction log');
      audioManager.play('sparkle');
    } else if (step === 3) {
      setReceiverBal(prev => prev + 5000);
      setTransStep(3);
      setTransStatus('Step 3: ₹5,000 Credited to Receiver (Uncommitted)');
    } else if (step === 4) {
      setTransStep(4);
      setTransStatus('Step 4: COMMIT executed! Changes written permanently to disk.');
      audioManager.play('drop-correct');
      speechManager.speak('Transaction committed with full ACID durability.');
    } else if (step === 99) {
      setReceiverBal(4000);
      setTransStep(2);
      setTransStatus('ROLLBACK TO SAVEPOINT sp1 executed! Credit reverted, debit preserved.');
      audioManager.play('whoosh');
    } else {
      setSenderBal(15000);
      setReceiverBal(4000);
      setTransStep(0);
      setTransStatus('Full ROLLBACK: Entire transaction aborted to initial state.');
      audioManager.play('drop-wrong');
    }
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered ISC Class 12 Database Normalisation and Relational Systems.');
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

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const initial = prev.length > 0 ? prev : (challenge.sortItems?.map((_, i) => i) || []);
      const arr = [...initial];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const num = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Precise relational reasoning.');
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
        speechManager.speak('Let us analyze the step-by-step resolution together.');
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

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50" aria-label="Computer Science icon">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300">
              {title}
            </h1>
            <p className="text-xs text-slate-400">
              ISC Class 12 Computer Science • High Weightage Relational Engineering Lab
            </p>
          </div>
        </div>

        {/* Difficulty Badge & Live Stats */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : difficulty === 'advanced'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
            }`}
          >
            {difficulty} Tier
          </motion.span>
          <div className="text-right text-xs">
            <span className="text-slate-400">Mastery: </span>
            <span className="text-indigo-400 font-mono font-semibold capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── CANVAS STATUS BAR ─── */}
      <div className="my-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
        <canvas ref={canvasRef} width={800} height={28} className="w-full block" />
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 my-4">
          <div className="p-5 bg-gradient-to-br from-indigo-950/70 to-slate-900 rounded-2xl border border-indigo-700/40">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 px-2 py-0.5 bg-indigo-900/50 rounded">
                Scenario Mission
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white">{SCENARIO.title}</h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 mt-2 italic">{SCENARIO.context}</p>
          </div>

          {/* SVG 1: Normalization Hierarchy Visualizer */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
            <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider block mb-2">
              Architectural Roadmap: The Normalization Hierarchy
            </span>
            <svg viewBox="0 0 700 130" className="w-full h-auto" aria-label="Normalization hierarchy diagram showing 1NF, 2NF, 3NF, and BCNF progressive nesting">
              <rect x="10" y="10" width="680" height="110" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
              <rect x="30" y="25" width="640" height="80" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="45" y="45" fill="#818cf8" fontSize="11" fontWeight="bold">1NF: Atomic Cells (No Arrays/Multi-values)</text>
              
              <rect x="180" y="35" width="480" height="65" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="195" y="55" fill="#38bdf8" fontSize="11" fontWeight="bold">2NF: No Partial Dependencies (Full PK Dependency)</text>
              
              <rect x="340" y="45" width="310" height="50" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
              <text x="355" y="65" fill="#34d399" fontSize="11" fontWeight="bold">3NF: No Transitive Dependencies (X → Y → Z)</text>
              
              <rect x="510" y="55" width="130" height="35" rx="6" fill="#831843" stroke="#f472b6" strokeWidth="1.5" />
              <text x="520" y="75" fill="#f472b6" fontSize="10" fontWeight="bold">BCNF: Superkey Rule</text>
            </svg>
          </div>

          <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-semibold text-amber-300 mb-3 flex items-center gap-2">
              <span>🔍</span> Discovery Challenge: Predict the Structural Anomaly
            </h3>
            <p className="text-sm text-slate-200 mb-4 font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border flex items-center justify-between ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <div>
                    <span className="font-mono text-xs mr-2 text-indigo-400">[{String.fromCharCode(65 + i)}]</span>
                    {opt}
                  </div>
                  {discoveryAnswered && (
                    <span className="text-sm font-bold ml-2">
                      {i === DISCOVERY_QUESTION.correctIndex ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <p className={`text-xs sm:text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Multi-valued fields violate 1NF atomic value rules.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Architecture Lab"
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-indigo-600/30"
                >
                  Enter Interactive Architecture Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (With Multi-Representation) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 my-4">
          {/* Multi-Representation Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900/90 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-slate-300">Switch Architectural Representation:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setRepView('table')}
                aria-label="View relational table format"
                className={`px-3 py-1 rounded-lg text-xs font-medium border ${repView === 'table' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
              >
                📊 Relational Table
              </button>
              <button
                onClick={() => setRepView('fd_graph')}
                aria-label="View functional dependency graph format"
                className={`px-3 py-1 rounded-lg text-xs font-medium border ${repView === 'fd_graph' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
              >
                🔗 Functional Dependency (FD) Graph
              </button>
              <button
                onClick={() => setRepView('venn')}
                aria-label="View Chen notation ER schema format"
                className={`px-3 py-1 rounded-lg text-xs font-medium border ${repView === 'venn' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
              >
                📐 Chen ER Notation
              </button>
            </div>
          </div>

          {/* SVG 2: Multi-representation Dual Diagram Panel */}
          {repView === 'fd_graph' && (
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-xs font-mono font-bold text-indigo-400 block mb-2">
                Mathematical Dependency Graph (X → Y Determinants)
              </span>
              <svg viewBox="0 0 650 140" className="w-full h-auto" aria-label="Functional Dependency Graph showing Student_ID determining Student_Name and Dept_ID determining Dept_Name">
                <rect x="10" y="10" width="630" height="120" rx="8" fill="#0f172a" stroke="#4338ca" strokeWidth="1" />
                <circle cx="80" cy="70" r="30" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                <text x="80" y="74" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontWeight="bold">Emp_ID (PK)</text>

                <circle cx="280" cy="70" r="30" fill="#065f46" stroke="#34d399" strokeWidth="2" />
                <text x="280" y="74" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">Dept_ID</text>

                <circle cx="480" cy="70" r="30" fill="#831843" stroke="#f472b6" strokeWidth="2" />
                <text x="480" y="74" textAnchor="middle" fill="#fbcfe8" fontSize="10" fontWeight="bold">Dept_Name</text>

                <path d="M 110 70 L 250 70" stroke="#818cf8" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
                <path d="M 310 70 L 450 70" stroke="#f472b6" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
                
                <text x="180" y="60" textAnchor="middle" fill="#94a3b8" fontSize="10">Direct FD</text>
                <text x="380" y="60" textAnchor="middle" fill="#f43f5e" fontSize="10">Transitive Violation (3NF)</text>

                <defs>
                  <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#38bdf8" />
                  </marker>
                </defs>
              </svg>
            </div>
          )}

          {repView === 'venn' && (
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-xs font-mono font-bold text-sky-400 block mb-2">
                SVG 3: Chen Notation ER Model (Entities, Attributes & Relationships)
              </span>
              <svg viewBox="0 0 650 140" className="w-full h-auto" aria-label="Chen ER diagram with Student rectangle entity, Enrolls diamond relationship, and Course rectangle entity">
                <rect x="10" y="10" width="630" height="120" rx="8" fill="#020617" stroke="#1e293b" strokeWidth="1" />
                
                <rect x="40" y="50" width="110" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="95" y="78" textAnchor="middle" fill="#e0e7ff" fontSize="12" fontWeight="bold">STUDENT</text>
                
                <ellipse cx="95" cy="25" rx="45" ry="14" fill="#0f172a" stroke="#818cf8" strokeWidth="1.5" />
                <text x="95" y="29" textAnchor="middle" fill="#a5b4fc" fontSize="9" textDecoration="underline" fontWeight="bold">Student_ID (PK)</text>
                <line x1="95" y1="39" x2="95" y2="50" stroke="#818cf8" strokeWidth="1.5" />

                <polygon points="280,72 320,45 360,72 320,100" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
                <text x="320" y="76" textAnchor="middle" fill="#e0f2fe" fontSize="11" fontWeight="bold">Enrolls</text>
                
                <line x1="150" y1="72" x2="280" y2="72" stroke="#64748b" strokeWidth="2" />
                <text x="210" y="65" fill="#38bdf8" fontSize="11" fontWeight="bold">M</text>

                <line x1="360" y1="72" x2="490" y2="72" stroke="#64748b" strokeWidth="2" />
                <text x="425" y="65" fill="#38bdf8" fontSize="11" fontWeight="bold">N</text>

                <rect x="490" y="50" width="110" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="545" y="78" textAnchor="middle" fill="#e0e7ff" fontSize="12" fontWeight="bold">COURSE</text>
              </svg>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.25 }}
              className="p-5 sm:p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold uppercase text-sky-400 bg-sky-950/60 px-2.5 py-1 rounded-md border border-sky-800/40">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <span className="text-xs text-slate-400">Node: {EXPLORATION_STEPS[currentSlide].nodeId}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
              <p className="text-xs sm:text-sm text-amber-300 mt-1 mb-4">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>

              {/* STEP 0: 1NF MULTI-VALUED CELL ATOMIZER */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/50">
                      <p className="text-xs font-bold text-indigo-300 uppercase mb-2">Prediction 1 (Hypothesis Check):</p>
                      <p className="text-sm text-slate-200 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={opt}
                            className="p-2.5 text-left text-xs bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-slate-300">
                          Table: <code className="text-indigo-400">School_Admissions</code> ({atomizedRows ? 'Normalized 1NF Schema' : 'Un-normalized Raw Sheet'})
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleAtomizeClick}
                          aria-label="Toggle Atomize Cells"
                          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg shadow"
                        >
                          {atomizedRows ? 'Reset to Un-normalized' : 'Click to Atomize Cells (Enforce 1NF)'}
                        </motion.button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse" aria-label="School admissions relational table comparison">
                          <thead>
                            <tr className="bg-slate-800/80 text-slate-300">
                              <th className="p-2.5 border border-slate-700">Student_ID (PK)</th>
                              <th className="p-2.5 border border-slate-700">Student_Name</th>
                              <th className="p-2.5 border border-slate-700 bg-amber-950/40 text-amber-200">Phone_Number (Atomic)</th>
                              <th className="p-2.5 border border-slate-700">City</th>
                            </tr>
                          </thead>
                          <tbody>
                            {!atomizedRows ? (
                              <>
                                <tr className="border border-slate-800 bg-rose-950/20">
                                  <td className="p-2.5 border border-slate-800 font-mono text-indigo-300">101</td>
                                  <td className="p-2.5 border border-slate-800">Ravi Sharma</td>
                                  <td className="p-2.5 border border-slate-800 bg-rose-900/40 text-rose-300 font-mono font-bold">
                                    ✗ 9876543210, 9998887777 [VIOLATION]
                                  </td>
                                  <td className="p-2.5 border border-slate-800">New Delhi</td>
                                </tr>
                                <tr className="border border-slate-800 bg-slate-900/40">
                                  <td className="p-2.5 border border-slate-800 font-mono text-indigo-300">102</td>
                                  <td className="p-2.5 border border-slate-800">Priya Patel</td>
                                  <td className="p-2.5 border border-slate-800 font-mono">✓ 9822114455</td>
                                  <td className="p-2.5 border border-slate-800">Mumbai</td>
                                </tr>
                              </>
                            ) : (
                              <>
                                <tr className="border border-slate-800 bg-emerald-950/30">
                                  <td className="p-2.5 border border-slate-800 font-mono text-indigo-300">101</td>
                                  <td className="p-2.5 border border-slate-800">Ravi Sharma</td>
                                  <td className="p-2.5 border border-slate-800 text-emerald-300 font-mono font-bold">✓ 9876543210</td>
                                  <td className="p-2.5 border border-slate-800">New Delhi</td>
                                </tr>
                                <tr className="border border-slate-800 bg-emerald-950/30">
                                  <td className="p-2.5 border border-slate-800 font-mono text-indigo-300">101</td>
                                  <td className="p-2.5 border border-slate-800">Ravi Sharma</td>
                                  <td className="p-2.5 border border-slate-800 text-emerald-300 font-mono font-bold">✓ 9998887777</td>
                                  <td className="p-2.5 border border-slate-800">New Delhi</td>
                                </tr>
                                <tr className="border border-slate-800 bg-slate-900/40">
                                  <td className="p-2.5 border border-slate-800 font-mono text-indigo-300">102</td>
                                  <td className="p-2.5 border border-slate-800">Priya Patel</td>
                                  <td className="p-2.5 border border-slate-800 font-mono">✓ 9822114455</td>
                                  <td className="p-2.5 border border-slate-800">Mumbai</td>
                                </tr>
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">
                        {atomizedRows
                          ? '✓ 1NF Satisfied: Every tuple has atomic indivisible values. Multi-valued repeating groups eliminated.'
                          : '✗ 1NF Violated: Cell holds multiple phone values, making indexing and search impossible.'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 1: 2NF PARTIAL DEPENDENCY DECOMPOSITION & PREDICTION 2 */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {!pred2Made && (
                    <div className="p-4 bg-sky-950/40 rounded-xl border border-sky-800/50">
                      <p className="text-xs font-bold text-sky-300 uppercase mb-2">Prediction 2 (Architectural Decomposition):</p>
                      <p className="text-sm text-slate-200 mb-3">{PREDICTION_QUESTIONS[1].question}</p>
                      <p className="text-xs text-amber-300/90 mb-3 italic">👉 {PREDICTION_QUESTIONS[1].verifyInstruction}</p>
                      <div className="grid grid-cols-1 gap-2">
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction2(i)}
                            aria-label={opt}
                            className="p-2.5 text-left text-xs bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="text-xs text-slate-300 mb-2">
                      Original Table: <code className="text-amber-400">Enrolment(Student_ID, Course_ID, Student_Name, Course_Title, Marks)</code>
                    </p>
                    <p className="text-xs text-indigo-300 font-mono mb-4">
                      Primary Key: (Student_ID, Course_ID) | Partial FDs: Student_ID -&gt; Student_Name, Course_ID -&gt; Course_Title
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-slate-900 rounded-xl border border-indigo-700/40">
                        <span className="text-xs font-bold text-indigo-400 block mb-1">Relation 1: Student</span>
                        <p className="text-xs font-mono text-emerald-300">✓ Student_ID (PK)</p>
                        <p className="text-xs text-slate-300">Student_Name</p>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-sky-700/40">
                        <span className="text-xs font-bold text-sky-400 block mb-1">Relation 2: Course</span>
                        <p className="text-xs font-mono text-emerald-300">✓ Course_ID (PK)</p>
                        <p className="text-xs text-slate-300">Course_Title</p>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-emerald-700/40">
                        <span className="text-xs font-bold text-emerald-400 block mb-1">Relation 3: Score</span>
                        <p className="text-xs font-mono text-emerald-300">✓ (Student_ID, Course_ID) [Composite PK]</p>
                        <p className="text-xs text-slate-300">Marks (Fully Dependent)</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: 3NF & SQL JOIN PIPELINE */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label htmlFor="norm-slider" className="text-xs font-bold text-slate-300">
                        Schema Normalization Level: <span className="text-indigo-400 font-mono">{normSliderLevel === 1 ? 'Un-normalized' : normSliderLevel === 2 ? '1NF' : normSliderLevel === 3 ? '2NF' : '3NF / BCNF'}</span>
                      </label>
                      <div className="flex gap-4 text-xs">
                        <span className="text-rose-400">Redundancy: {redundancyScore}%</span>
                        <span className="text-emerald-400">Est. Query Latency: {queryExecutionTimeMs}ms</span>
                      </div>
                    </div>

                    <input
                      id="norm-slider"
                      type="range"
                      min={1}
                      max={4}
                      step={1}
                      aria-label="Normalization level slider"
                      value={normSliderLevel}
                      onChange={e => setNormSliderLevel(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                      {(['INNER', 'LEFT', 'CROSS', 'SELF'] as const).map(j => (
                        <motion.button
                          key={j}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          aria-label={`Select ${j} join`}
                          onClick={() => {
                            setActiveJoinType(j);
                            audioManager.play('tap');
                          }}
                          className={`p-2 rounded-lg text-xs font-mono font-bold border ${
                            activeJoinType === j
                              ? 'bg-indigo-600 border-indigo-400 text-white shadow'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          {j} JOIN
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto border border-slate-800">
                      {activeJoinType === 'INNER' && (
                        <span>SELECT S.name, M.marks FROM Students S <strong className="text-indigo-400">INNER JOIN</strong> Marks M ON S.id = M.sid;</span>
                      )}
                      {activeJoinType === 'LEFT' && (
                        <span>SELECT S.name, M.marks FROM Students S <strong className="text-sky-400">LEFT JOIN</strong> Marks M ON S.id = M.sid; -- Retains all students even with NULL marks</span>
                      )}
                      {activeJoinType === 'CROSS' && (
                        <span>SELECT S.name, C.title FROM Students S <strong className="text-amber-400">CROSS JOIN</strong> Courses C; -- Cartesian product (No ON clause)</span>
                      )}
                      {activeJoinType === 'SELF' && (
                        <span>SELECT E.name AS Staff, M.name AS Manager FROM Staff E <strong className="text-emerald-400">JOIN Staff M</strong> ON E.mgr_id = M.id;</span>
                      )}
                    </div>
                  </div>

                  {!observationAnswered && (
                    <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/50">
                      <p className="text-xs font-bold text-amber-300 uppercase mb-1">Scientific Observation:</p>
                      <p className="text-sm text-slate-200 mb-3">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            aria-label={opt}
                            className="p-2.5 text-left text-xs bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: TRANSACTION & SAVEPOINT SIMULATOR */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs">
                        <span className="text-slate-400">Sender (SBI Acc #101): </span>
                        <span className="font-mono font-bold text-indigo-400">₹{senderBal.toLocaleString()}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-slate-400">Receiver (HDFC Acc #202): </span>
                        <span className="font-mono font-bold text-emerald-400">₹{receiverBal.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs text-amber-300 font-mono">
                      Status: {transStatus}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={transStep !== 0}
                        aria-label="Debit 5000"
                        onClick={() => handleTransStep(1)}
                        className="px-3 py-1.5 bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold rounded-lg"
                      >
                        1. Debit ₹5,000
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={transStep !== 1}
                        aria-label="Create savepoint sp1"
                        onClick={() => handleTransStep(2)}
                        className="px-3 py-1.5 bg-sky-700 disabled:opacity-40 text-white text-xs font-bold rounded-lg"
                      >
                        2. SAVEPOINT sp1
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={transStep !== 2}
                        aria-label="Credit 5000"
                        onClick={() => handleTransStep(3)}
                        className="px-3 py-1.5 bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold rounded-lg"
                      >
                        3. Credit ₹5,000
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={transStep !== 3}
                        aria-label="Commit transaction"
                        onClick={() => handleTransStep(4)}
                        className="px-3 py-1.5 bg-emerald-600 disabled:opacity-40 text-white text-xs font-bold rounded-lg shadow"
                      >
                        4. COMMIT
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={transStep < 2 || transStep === 4}
                        aria-label="Rollback to savepoint"
                        onClick={() => handleTransStep(99)}
                        className="px-3 py-1.5 bg-amber-700 disabled:opacity-40 text-white text-xs font-bold rounded-lg"
                      >
                        ROLLBACK TO SAVEPOINT
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={transStep === 0 || transStep === 4}
                        aria-label="Full rollback"
                        onClick={() => handleTransStep(0)}
                        className="px-3 py-1.5 bg-rose-800 disabled:opacity-40 text-white text-xs font-bold rounded-lg"
                      >
                        Full ROLLBACK
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: NOSQL ARCHITECTURAL MATCHMAKER */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { type: 'Key-Value', engine: 'Redis', bestFor: 'Sub-ms Session Caching & Leaderboards', color: 'border-rose-500/50 bg-rose-950/20' },
                      { type: 'Document', engine: 'MongoDB', bestFor: 'Flexible Catalogues & Semi-structured JSON', color: 'border-emerald-500/50 bg-emerald-950/20' },
                      { type: 'Column-Family', engine: 'Cassandra', bestFor: 'Time-series sensor telemetry & high write logs', color: 'border-sky-500/50 bg-sky-950/20' },
                      { type: 'Graph', engine: 'Neo4j', bestFor: 'Social networks & Fraud connection traversal', color: 'border-purple-500/50 bg-purple-950/20' },
                    ].map(item => (
                      <motion.div
                        key={item.type}
                        whileHover={{ scale: 1.02 }}
                        role="button"
                        aria-label={`Select NoSQL database engine ${item.engine} of type ${item.type}`}
                        tabIndex={0}
                        onClick={() => {
                          setSelectedNoSqlEngine(item.engine);
                          audioManager.play('pop');
                          speechManager.speak(`${item.engine} is ideal for ${item.bestFor}`);
                        }}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setSelectedNoSqlEngine(item.engine);
                            audioManager.play('pop');
                          }
                        }}
                        className={`p-3.5 rounded-xl border ${item.color} cursor-pointer transition-all`}
                      >
                        <span className="text-xs font-bold uppercase text-slate-400 block">{item.type}</span>
                        <h4 className="text-base font-bold text-white mt-0.5">{item.engine}</h4>
                        <p className="text-xs text-slate-300 mt-2 leading-snug">{item.bestFor}</p>
                      </motion.div>
                    ))}
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
              aria-label="Previous step"
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-semibold"
            >
              ← Previous Step
            </motion.button>
            <span className="text-xs font-mono text-slate-400">
              {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next step"
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow"
              >
                Next Step →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Launch Sandbox Mode"
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Launch Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 my-4">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-indigo-300">Relational Architecture Sandbox</h3>
                <p className="text-xs text-slate-400">Zero pressure exploration: test joins, transactions, and normalisation models freely.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Ready for Challenges"
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30"
              >
                Ready for Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-sky-400 uppercase">Live Join Engine</span>
                <div className="flex gap-2 my-2">
                  {(['INNER', 'LEFT', 'CROSS', 'SELF'] as const).map(j => (
                    <motion.button
                      key={j}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label={`Select ${j} join in sandbox`}
                      onClick={() => setActiveJoinType(j)}
                      className={`px-3 py-1 text-xs font-mono rounded ${activeJoinType === j ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                    >
                      {j}
                    </motion.button>
                  ))}
                </div>
                <div className="p-3 bg-slate-900 rounded font-mono text-xs text-slate-300">
                  Join Type: <span className="text-emerald-400">{activeJoinType}</span> | Active Schema: Normalized 3NF
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-amber-400 uppercase">Interactive Transaction Shell</span>
                <p className="text-xs text-slate-400 my-2">Simulate live bank transactions between SBI & HDFC ledgers.</p>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Debit SBI sandbox"
                    onClick={() => handleTransStep(1)}
                    className="px-3 py-1 bg-indigo-700 text-white text-xs rounded"
                  >
                    Debit SBI
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Commit sandbox"
                    onClick={() => handleTransStep(4)}
                    className="px-3 py-1 bg-emerald-700 text-white text-xs rounded"
                  >
                    COMMIT
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Rollback sandbox"
                    onClick={() => handleTransStep(0)}
                    className="px-3 py-1 bg-rose-800 text-white text-xs rounded"
                  >
                    ROLLBACK
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE SYSTEM (With Shake Animation) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 my-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1 font-mono">
            <span>Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
            <span className="text-indigo-400 font-bold uppercase">{challenge.competencyLevel} Competency</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className={`p-5 sm:p-6 bg-slate-900 rounded-2xl border transition-all ${
            wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-800'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/60">
                Node: {challenge.nodeId}
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {challenge.id}</span>
            </div>

            <p className="text-sm sm:text-base font-semibold text-white mb-4 leading-relaxed">
              {challenge.question}
            </p>

            {/* MCQ Option Buttons */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm transition-all border flex items-center justify-between ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold shadow-lg shadow-emerald-900/40'
                        : wrongFlash
                        ? 'bg-rose-900/40 border-rose-600 text-rose-200'
                        : 'bg-slate-800/90 hover:bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    <div>
                      <span className="font-mono text-xs mr-2 text-indigo-400 font-bold">[{String.fromCharCode(65 + i)}]</span>
                      {opt}
                    </div>
                    {showExplanation && (
                      <span className="text-xs font-bold ml-2">
                        {i === challenge.correctIndex ? '✓ Correct' : '✗'}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag Label Interface */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag symbols to target slots:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      aria-label={`Draggable label ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'target_rect', name: 'Rectangle [ □ ]' },
                    { id: 'target_oval', name: 'Oval [ ⬭ ]' },
                    { id: 'target_diamond', name: 'Diamond [ ◇ ]' },
                    { id: 'target_underlined', name: 'Underlined Oval' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border-2 border-dashed text-center min-h-[90px] flex flex-col items-center justify-center transition-all ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-mono mb-1">{target.name}</span>
                      <span className="text-xs font-bold text-white">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  aria-label="Verify Diagram Mapping"
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow"
                >
                  Verify Diagram Mapping
                </motion.button>
              </div>
            )}

            {/* Drag Sort Interface */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-2.5">
                <p className="text-xs text-slate-400 mb-2">Reorder steps into correct architectural sequence:</p>
                {(sortArrangement.length === challenge.sortItems.length ? sortArrangement.map(idx => challenge.sortItems![idx]) : challenge.sortItems).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    role="button"
                    aria-label={`Draggable sequence item ${displayIdx + 1}: ${item}`}
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs sm:text-sm text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="font-mono text-indigo-400 font-bold">{displayIdx + 1}.</span>
                    <span>{item}</span>
                  </motion.div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  aria-label="Check Sequence"
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  className="mt-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Input */}
            {challenge.type === 'numeric' && (
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  aria-label="Enter computed row count"
                  placeholder="Enter computed rows"
                  className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-indigo-500 outline-none w-48 font-mono"
                />
                <span className="text-xs text-slate-400">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  aria-label="Submit Calculation"
                  onClick={() => handleAnswer(numericInput)}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow"
                >
                  Submit Calculation
                </motion.button>
              </div>
            )}

            {/* Construct Interface */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label={`Add part ${part}`}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-indigo-300 rounded-lg text-xs font-mono"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[80px] p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-2.5 py-1 bg-indigo-900/70 border border-indigo-700 text-indigo-200 text-xs font-mono rounded-lg flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        aria-label={`Remove ${part}`}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click blocks above to construct query pipeline...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  aria-label="Validate Transaction Sequence"
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow"
                >
                  Validate Transaction Sequence
                </motion.button>
              </div>
            )}

            {/* Explanation Section */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 bg-amber-950/40 border border-amber-700/60 rounded-xl space-y-3">
                <span className="text-xs font-bold text-amber-300 uppercase block tracking-wider">
                  ISC Step-by-Step Examiner Walkthrough:
                </span>
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sent, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs sm:text-sm text-amber-100/90 leading-relaxed"
                  >
                    <span className="font-mono text-amber-400 font-bold">{i + 1}.</span> {sent}{!sent.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label="Reveal Next Step"
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-amber-800/80 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Next ISC Challenge"
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 ml-auto"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Exam Results →' : 'Next ISC Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION, REFLECTION & SPACED REPETITION (SRS) ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5 my-4">
          <div className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 rounded-3xl border border-indigo-700/50 text-center space-y-3">
            <span className="text-4xl" aria-label="Trophy">🏆</span>
            <h2 className="text-2xl font-bold text-white">Relational Mastery Certified!</h2>
            <p className="text-sm text-slate-300">
              Exam Simulation Score: <span className="font-mono text-emerald-400 font-bold text-lg">{Math.max(0, 100 - errors * 5)}%</span> | Level: <span className="text-indigo-300 font-bold capitalize">{masteryLevel}</span>
            </p>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-left max-w-xl mx-auto">
              <p className="text-xs sm:text-sm text-emerald-300 font-medium">
                {errors === 0
                  ? '✓ PERFECT SCORE! You possess complete mastery of 1NF–BCNF normalization, joins, subqueries, ACID properties, and NoSQL engines!'
                  : errors <= 3
                  ? '✓ Exemplary performance! You demonstrated strong competency across ISC Class 12 database architecture.'
                  : 'Commendable effort. Review your targeted misconception profile below to solidify theoretical dependencies.'}
              </p>
            </div>
          </div>

          {/* ─── SPACED REPETITION (SRS) SCHEDULE VISIBILITY ─── */}
          <div className="p-5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 rounded-2xl border-2 border-amber-500/60 shadow-lg space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl" aria-label="Spaced repetition calendar">📅</span>
                <div>
                  <h3 className="text-sm font-bold text-amber-300 tracking-wide uppercase">
                    Spaced Repetition System (SRS) Schedule
                  </h3>
                  <p className="text-xs text-slate-300">
                    Calculated interval using SM-2 memory retention curve:
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold text-xs rounded-full">
                {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
              </span>
            </div>

            <div className="mt-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
              <div className={`p-2 rounded-lg border ${errors === 0 ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300 font-bold' : 'border-slate-800 text-slate-500'}`}>
                <span>0 Errors: <strong>Review in 7 days</strong></span>
              </div>
              <div className={`p-2 rounded-lg border ${errors > 0 && errors <= 3 ? 'bg-amber-950/50 border-amber-500 text-amber-300 font-bold' : 'border-slate-800 text-slate-500'}`}>
                <span>1–3 Errors: <strong>Review in 3 days</strong></span>
              </div>
              <div className={`p-2 rounded-lg border ${errors >= 4 ? 'bg-rose-950/50 border-rose-500 text-rose-300 font-bold' : 'border-slate-800 text-slate-500'}`}>
                <span>4+ Errors: <strong>Review in 1 day</strong></span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 italic text-center pt-1">
              Your next review session has been registered in the student spaced repetition planner.
            </p>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-indigo-900/60 space-y-4">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>💭</span> Metacognitive Reflection & Application
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  1. What was the most surprising thing you learned about database normalization or transaction safety?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  aria-label="What was the most surprising thing you learned"
                  placeholder="e.g., How transitive dependencies in 3NF can cause cascading update anomalies..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  2. How would you explain First Normal Form (1NF) and atomicity to a friend who is new to databases?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.explain}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, explain: e.target.value }))}
                  aria-label="How would you explain this to a friend"
                  placeholder="e.g., Every box in a spreadsheet should only contain one single piece of information..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  3. Where in real life might you use ACID transactions with SAVEPOINTs?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  aria-label="Where in real life might you use this"
                  placeholder="e.g., UPI payments, IRCTC railway ticket booking, pharmacy dispensing..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Targeted Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                <span>⚠️</span> Diagnostic Misconception Audit (Examiner Analysis)
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1 text-xs">
                    <p className="text-rose-300 font-semibold">✗ Trap: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real-World Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-sky-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400 font-mono">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE FEEDBACK NOTIFIERS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="ISC Mastery Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_ComputerScienceDatabaseNormalization1nfSim;
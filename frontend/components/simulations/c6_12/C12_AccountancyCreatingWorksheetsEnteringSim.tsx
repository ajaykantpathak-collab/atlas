'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart as RechartsPie, Pie as RechartsPieSlice, Legend } from 'recharts';

// Node IDs as string literals
const NODE_C12_ACC_071 = 'c12_acc_071';
const NODE_C12_ACC_072 = 'c12_acc_072';
const NODE_C12_ACC_073 = 'c12_acc_073';
const NODE_C12_ACC_074 = 'c12_acc_074';
const NODE_C12_ACC_075 = 'c12_acc_075';
const NODE_C12_ACC_076 = 'c12_acc_076';
const NODE_C12_ACC_077 = 'c12_acc_077';
const ALL_NODE_IDS = [
  NODE_C12_ACC_071,
  NODE_C12_ACC_072,
  NODE_C12_ACC_073,
  NODE_C12_ACC_074,
  NODE_C12_ACC_075,
  NODE_C12_ACC_076,
  NODE_C12_ACC_077,
];

// Narrative Scenario
const SCENARIO = {
  title: 'Apex Financial Technologies: The Accounting Systems Overhaul',
  intro: 'You are the lead systems accountant at Apex FinTech in Bengaluru. Your audit firm handles 200 high-growth Indian enterprises. A junior associate botched a Trial Balance in Excel because numbers were typed with apostrophes, a bar chart displayed "1, 2, 3" instead of Financial Years, and an unauthorized database script almost wiped out the client voucher logs!',
  context: 'Master Excel spreadsheets, dynamic charts, database fundamentals (RDBMS), SQL DDL/DML operations, and enterprise audit security before the ICAI Quality Review.',
};

// Curiosity Discovery Question
const DISCOVERY_QUESTION = {
  question: 'In Excel, if you type \'50000 (with an apostrophe) across 10 debit cells and run =SUM(C4:C13), what is the calculated total?',
  options: [
    '₹5,00,000.00 — Excel converts text numbers automatically into calculations',
    '0 — Excel treats apostrophe-prefixed values as text and =SUM() silently ignores text',
    '#VALUE! Error — Excel crashes on numeric calculation over strings',
    '₹50,000.00 — Only the first cell is summed',
  ],
  correctIndex: 1,
  hintAfter: 'Don\'t worry! Text-stored numbers are the #1 reason why student trial balances fail to tally in CISCE practical exams. Let\'s explore why!',
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

// 22 Extensive Challenges across nodes 071-077
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_071_1',
    nodeId: NODE_C12_ACC_071,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How can you instantly visually diagnose in Excel whether a value like 250000 is stored as a true number versus text?',
    options: [
      'Text values are italicised; numbers are bolded by default',
      'Numbers are right-aligned; text values are left-aligned by default',
      'Numbers have green font; text has blue font',
      'There is no visual difference; you must write a macro',
    ],
    correctIndex: 1,
    explanation: 'Excel by default right-aligns numeric values and left-aligns text labels. If a numeric entry is left-aligned, it is stored as text and =SUM() will ignore it.',
    hints: [
      'Look at how text and numbers position themselves horizontally inside an untouched Excel cell.',
      'Text aligns to the left (like writing English sentences); numbers align to the right (to align decimal places).',
      'Right-aligned = Number. Left-aligned = Text.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_071_2',
    nodeId: NODE_C12_ACC_071,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct accounting column headers onto the standard ISC Trial Balance worksheet structure.',
    dragItems: [
      { label: 'Particulars', targetId: 'col_a' },
      { label: 'L.F.', targetId: 'col_b' },
      { label: 'Debit ₹', targetId: 'col_c' },
      { label: 'Credit ₹', targetId: 'col_d' },
    ],
    correctMapping: { col_a: 'Particulars', col_b: 'L.F.', col_c: 'Debit ₹', col_d: 'Credit ₹' },
    explanation: 'The standard four-column Trial Balance worksheet structure prescribed by CISCE is: Column A = Particulars, Column B = L.F. (Ledger Folio), Column C = Debit ₹, Column D = Credit ₹.',
    hints: [
      'Account names go first in column A.',
      'Ledger Folio reference goes in column B before amount columns.',
      'Column C is Debit and Column D is Credit.',
    ],
  },
  {
    id: 'ch_071_3',
    nodeId: NODE_C12_ACC_071,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A firm has Cash ₹1,50,000, Bank ₹2,20,000, Debtors ₹3,40,000, Stock ₹2,80,000, and Machinery ₹6,00,000. What is the total Debit in ₹ Lakhs that =SUM(C4:C8) computes?',
    correctAnswer: 15.9,
    tolerance: 0.1,
    unit: 'Lakhs ₹',
    explanation: '1.50 + 2.20 + 3.40 + 2.80 + 6.00 = ₹15.90 Lakhs (or ₹15,90,000). The SUM function adds all numeric cells in the range.',
    hints: [
      'Add all five debit asset balances together.',
      '150000 + 220000 + 340000 + 280000 + 600000 = 1590000.',
      'Convert 15,90,000 into Lakhs: 15.90 Lakhs.',
    ],
  },
  {
    id: 'ch_071_4',
    nodeId: NODE_C12_ACC_071,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why must partner interest rate in cell B2 (e.g. 8%) be written as =$B$2*C4 instead of =B2*C4 when copied down across 20 partner capital rows?',
    options: [
      'Relative reference =B2*C4 shifts to =B3*C5, =B4*C6 reading empty or wrong cells; absolute reference =$B$2 locks the rate cell',
      'Spreadsheets crash if you do not use dollar signs in financial multipliers',
      'The dollar sign automatically converts rates into Indian Rupees',
      'Relative references do not support multiplication operations',
    ],
    correctIndex: 0,
    explanation: 'Absolute reference ($B$2) fixes the row and column coordinates. If copied down, =$B$2*C5 still refers to B2, whereas relative =B2*C4 would shift downward to empty rows.',
    hints: [
      'Think about what happens to row numbers when you drag a formula handle downwards.',
      'A relative reference increments row numbers (B2 becomes B3, B4).',
      'The dollar sign $ locks the coordinate from shifting.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_072_1',
    nodeId: NODE_C12_ACC_072,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which chart type is mandated by CISCE when comparing 5-year trended revenues of Reliance Industries, and which when showing expense breakdown of TCS?',
    options: [
      'Bar/Column Chart for 5-year comparison; Pie Chart for expense percentage composition',
      'Pie Chart for 5-year revenue; Bar Chart for expense breakdown',
      'Scatter Plot for both cases',
      'Line Chart for expense breakdown; Radar Chart for 5-year revenue',
    ],
    correctIndex: 0,
    explanation: 'Bar charts (clustered column) are used for comparison across independent categories/years. Pie charts represent parts of a whole (composition of 100% total expenses).',
    hints: [
      'Does a 5-year revenue sequence represent slices of one single cake or comparison across years?',
      'Comparing magnitudes across categories = Bar chart.',
      'Showing percentage share of a single total = Pie chart.',
    ],
  },
  {
    id: 'ch_072_2',
    nodeId: NODE_C12_ACC_072,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A student creates a column chart by selecting only B2:B6 (revenue values) instead of A1:B6 (years + revenue). What glitch occurs?',
    options: [
      'Excel rejects the insertion and displays #REF!',
      'The X-axis displays meaningless default placeholder numbers "1, 2, 3, 4, 5" instead of financial years',
      'The chart bars render upside down',
      'The chart converts currency from INR to USD',
    ],
    correctIndex: 1,
    explanation: 'Without the label column in selection, Excel lacks category names for the X-axis, replacing them with generic numbers 1, 2, 3, 4, 5.',
    hints: [
      'Excel needs to know what each bar stands for.',
      'If you omit the labels column (A), Excel does not guess the text.',
      'It substitutes default numeric integers 1, 2, 3, 4, 5.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_072_3',
    nodeId: NODE_C12_ACC_072,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An analyst creates a Pie Chart to compare the Net Profits of 5 distinct competitors: Reliance, TCS, Infosys, Tata Steel, and HDFC Bank. Is this correct?',
    options: [
      'Yes — pie charts are universally superior for financial comparisons',
      'No — pie charts require slices to form a meaningful whole (100%); competitor profits are independent figures and must use a Bar Chart',
      'Yes — provided each company profit is positive',
      'No — pie charts can only hold up to 3 slices in accounting',
    ],
    correctIndex: 1,
    explanation: 'Five competitor profits do not sum to a single entity total. Representing them as pie slices implies an arbitrary sum with no business meaning.',
    hints: [
      'Do the profits of 5 separate corporations form 100% of one single organization?',
      'Pie slices must represent components of a single total (like Total Assets or Total Expenses).',
      'Independent company metrics must be compared using Bar/Column charts.',
    ],
  },
  {
    id: 'ch_073_1',
    nodeId: NODE_C12_ACC_073,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Using the classic library analogy, distinguish between a "Database" and a "DBMS".',
    options: [
      'Database is the librarian; DBMS is the shelf of books',
      'Database is the organized collection of data (books); DBMS is the management software (librarian)',
      'Database and DBMS are exact synonyms in modern computing',
      'Database is the hardware computer; DBMS is the monitor screen',
    ],
    correctIndex: 1,
    explanation: 'The database is the data store (the repository of facts), whereas the DBMS is the software engine that creates, controls, queries, and protects the database.',
    hints: [
      'Think about which one is the container of information and which one is the active software controller.',
      'Data = facts stored electronically.',
      'System (DBMS) = software that manages those facts.',
    ],
  },
  {
    id: 'ch_073_2',
    nodeId: NODE_C12_ACC_073,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is Microsoft Excel NOT classified as a Database Management System despite displaying rows and columns?',
    options: [
      'Excel cannot calculate sums or mathematical averages',
      'Excel lacks enforced referential integrity across sheets, lacks multi-user row-level concurrency, and lacks granular role security',
      'Excel files cannot be stored on hard disks',
      'Excel does not support color styling or charts',
    ],
    correctIndex: 1,
    explanation: 'Rows and columns are simply a presentation grid. Excel does not enforce relationships between sheets, locks entire files during concurrent edits, and lacks granular permission controls.',
    hints: [
      'Can two accountants safely update different rows of the exact same local Excel workbook at the same split second?',
      'Does Excel stop you if you debit a ledger name that was never created in your chart of accounts?',
      'A true DBMS enforces relational constraints, row concurrency, and ACID transactions.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_073_3',
    nodeId: NODE_C12_ACC_073,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'State Bank of India operates 22,000+ branches simultaneously debiting and crediting accounts. Which DBMS capability guarantees account balance integrity without locking the whole bank?',
    options: [
      'Fine-grained row-level locking and ACID transaction concurrency control',
      'Auto-saving workbooks to OneDrive every 10 minutes',
      'Freezing the top row in the bank ledger display',
      'Using the SUMIF formula on the central server',
    ],
    correctIndex: 0,
    explanation: 'DBMS engines provide ACID transaction concurrency with row-level locks. Only the specific account record being edited is locked, leaving millions of other rows accessible.',
    hints: [
      'Think about simultaneous multi-user transaction management.',
      'Does the bank lock the whole database or only the transacting account row?',
      'Row-level locking + ACID properties enable massive enterprise scale.',
    ],
  },
  {
    id: 'ch_074_1',
    nodeId: NODE_C12_ACC_074,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the 5 core DBMS components to their accounting firm implementation:',
    options: [
      'Hardware = Server, Software = MySQL, Data = Ledgers/Vouchers, Users = DBA/Auditor, Procedures = Backup SOP',
      'Hardware = MySQL, Software = Dell Server, Data = DBA, Users = Ledgers, Procedures = Cash Book',
      'Hardware = Vouchers, Software = Hardware, Data = MySQL, Users = SOP, Procedures = Auditor',
      'Hardware = Excel, Software = Paper, Data = Cloud, Users = Tally, Procedures = Calculator',
    ],
    correctIndex: 0,
    explanation: 'The 5 components are Hardware (server/disks), Software (DBMS engine), Data (accounting tables), Users (DBA, accountants, auditors), and Procedures (documented backup/security SOPs).',
    hints: [
      'Hardware is physical equipment.',
      'Software is MySQL/PostgreSQL/Oracle.',
      'Procedures are standard operating rules and backup policies.',
    ],
  },
  {
    id: 'ch_074_2',
    nodeId: NODE_C12_ACC_074,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Drag the appropriate Key terms to connect the parent LEDGER table to the child VOUCHER table.',
    dragItems: [
      { label: 'Primary Key (Ledger_ID)', targetId: 'pk_ledger' },
      { label: 'Foreign Key (Ledger_ID)', targetId: 'fk_voucher' },
      { label: 'Primary Key (Voucher_ID)', targetId: 'pk_voucher' },
      { label: 'Non-Key Attribute (Debit_Amt)', targetId: 'attr_debit' },
    ],
    correctMapping: {
      pk_ledger: 'Primary Key (Ledger_ID)',
      fk_voucher: 'Foreign Key (Ledger_ID)',
      pk_voucher: 'Primary Key (Voucher_ID)',
      attr_debit: 'Non-Key Attribute (Debit_Amt)',
    },
    explanation: 'Ledger_ID is the Primary Key of LEDGER. In VOUCHER, Ledger_ID is the Foreign Key referencing LEDGER(Ledger_ID), enforcing referential integrity. Voucher_ID uniquely identifies vouchers.',
    hints: [
      'The unique identifier of the master table is the Primary Key.',
      'The column in the transaction table that points back to the master is the Foreign Key.',
      'Amount fields are standard non-key attributes.',
    ],
  },
  {
    id: 'ch_074_3',
    nodeId: NODE_C12_ACC_074,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'If referential integrity is strictly enforced between LEDGER (parent) and VOUCHER (child), what happens when an accountant attempts to post a voucher to Ledger_ID 999 (which does not exist)?',
    options: [
      'The DBMS creates Ledger 999 automatically with ₹0 balance',
      'The DBMS immediately rejects the INSERT query with a foreign key constraint violation error',
      'The DBMS stores the amount in a secret temporary spreadsheet',
      'The voucher is assigned to Ledger 1 by default',
    ],
    correctIndex: 1,
    explanation: 'Referential integrity guarantees no orphan records can exist. The DBMS actively halts and rejects any transaction referencing a non-existent parent primary key.',
    hints: [
      'Referential integrity prevents broken links and ghost entries.',
      'Will the engine silently guess or will it raise an error?',
      'It rejects the insert with a Foreign Key violation.',
    ],
  },
  {
    id: 'ch_075_1',
    nodeId: NODE_C12_ACC_075,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following belongs strictly to SQL Data Definition Language (DDL)?',
    options: [
      'INSERT, UPDATE, DELETE',
      'CREATE, ALTER, DROP',
      'SELECT, WHERE, ORDER BY',
      'GRANT, REVOKE, COMMIT',
    ],
    correctIndex: 1,
    explanation: 'DDL commands define and modify the schema structure: CREATE builds tables, ALTER modifies columns, DROP removes tables completely.',
    hints: [
      'DDL commands define the structure (the container), not the records inside.',
      'Think about commands that build, change, or remove the table itself.',
      'CREATE, ALTER, DROP.',
    ],
  },
  {
    id: 'ch_075_2',
    nodeId: NODE_C12_ACC_075,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the valid SQL statement to create an accounting LEDGER table.',
    availableParts: [
      'CREATE TABLE Ledger (',
      'Ledger_ID INT PRIMARY KEY,',
      'Ledger_Name VARCHAR(50) NOT NULL,',
      'Opening_Balance DECIMAL(12,2)',
      ');',
      'DROP TABLE',
      'SELECT ALL',
    ],
    targetState: 'CREATE TABLE Ledger ( Ledger_ID INT PRIMARY KEY, Ledger_Name VARCHAR(50) NOT NULL, Opening_Balance DECIMAL(12,2) );',
    validationHint: 'Assemble: CREATE TABLE Ledger ( + Ledger_ID INT PRIMARY KEY, + Ledger_Name VARCHAR(50) NOT NULL, + Opening_Balance DECIMAL(12,2) + );',
    explanation: 'A correct DDL CREATE statement defines the table name, column names, data types, and primary key constraint.',
    hints: [
      'Start with CREATE TABLE Ledger (',
      'Define Ledger_ID with INT and PRIMARY KEY',
      'Add the name and balance columns and close with );',
    ],
  },
  {
    id: 'ch_075_3',
    nodeId: NODE_C12_ACC_075,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What is the exact distinction between executing "DROP TABLE Voucher;" and "DELETE FROM Voucher;" in a production accounting database?',
    options: [
      'DROP removes both table schema structure and all records permanently; DELETE removes records but preserves the empty table structure and constraints',
      'DROP removes only 1 row; DELETE removes the entire database',
      'DROP and DELETE are completely identical synonyms in ANSI SQL',
      'DROP moves data to recycle bin; DELETE permanently destroys hardware',
    ],
    correctIndex: 0,
    explanation: 'DROP (DDL) obliterates the entire table object from the schema. DELETE (DML) empties row data while leaving the table structure and foreign keys intact for subsequent inserts.',
    hints: [
      'Think: "Does the empty container remain afterwards?"',
      'DROP destroys the container and the contents.',
      'DELETE empties the container but keeps the box ready.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_076_1',
    nodeId: NODE_C12_ACC_076,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What happens if an accountant runs "UPDATE Ledger SET Closing_Balance = 500000;" without writing a WHERE clause?',
    options: [
      'Excel opens and prompts for confirmation',
      'Only the first ledger in the table is modified',
      'Every single ledger in the entire database is overwritten with ₹5,00,000, corrupting all client balances',
      'The query fails with a missing WHERE syntax error',
    ],
    correctIndex: 2,
    explanation: 'In SQL DML, UPDATE and DELETE apply across ALL rows in the table by default unless explicitly restricted by a WHERE clause.',
    hints: [
      'SQL does not guess which row you meant.',
      'Without a WHERE condition filter, the command operates on every record in the table.',
      'All rows are overwritten — a catastrophic mistake in live accounting!',
    ],
  },
  {
    id: 'ch_076_2',
    nodeId: NODE_C12_ACC_076,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the clauses of a standard SQL DML retrieval query in their correct syntactic order.',
    sortItems: [
      'SELECT Voucher_ID, Debit_Amt',
      'FROM Voucher',
      'WHERE Ledger_ID = 105',
      'AND Voucher_Date BETWEEN \'2025-04-01\' AND \'2026-03-31\';',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Standard SQL DML order is: SELECT (column projection) → FROM (source table) → WHERE (row filter condition) → AND (additional compound conditions).',
    hints: [
      'Start with the keyword specifying columns.',
      'Follow with the table source.',
      'Place row filters and date intervals at the end.',
    ],
  },
  {
    id: 'ch_076_3',
    nodeId: NODE_C12_ACC_076,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A sales voucher #2987 was mistakenly booked for ₹10,000 instead of ₹1,00,000. Which SQL statement correctly rectifies this entry in the MySQL database?',
    options: [
      'UPDATE Voucher SET Credit_Amt = 100000 WHERE Voucher_ID = 2987;',
      'ALTER TABLE Voucher CHANGE Credit_Amt TO 100000;',
      'INSERT INTO Voucher (Credit_Amt) VALUES (100000);',
      'SELECT Credit_Amt = 100000 FROM Voucher WHERE Voucher_ID = 2987;',
    ],
    correctIndex: 0,
    explanation: 'Rectifying an existing record in place requires UPDATE table SET column = new_value WHERE primary_key_condition.',
    hints: [
      'Which DML command modifies existing rows?',
      'You need UPDATE table SET column = value.',
      'Pinpoint the record with WHERE Voucher_ID = 2987.',
    ],
  },
  {
    id: 'ch_077_1',
    nodeId: NODE_C12_ACC_077,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 128 of the Indian Companies Act 2013, for how many financial years must a company mandatorily preserve books of account and vouchers?',
    correctAnswer: 8,
    tolerance: 0,
    unit: 'Years',
    explanation: 'Section 128(5) of the Companies Act 2013 mandates books of account together with relevant vouchers to be preserved in good order for not less than 8 financial years.',
    hints: [
      'It is a fixed statutory period under Indian corporate law.',
      'More than 5 years, less than 10 years.',
      'Exactly 8 financial years.',
    ],
  },
  {
    id: 'ch_077_2',
    nodeId: NODE_C12_ACC_077,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does an enterprise CA firm schedule a weekly Full Backup combined with daily Incremental Backups rather than only a weekly full backup?',
    options: [
      'Incremental backups compress files into ZIP format while full backups do not',
      'A weekly full backup alone risks losing up to 6 days of accounting vouchers if the disk fails on Saturday; daily incrementals limit exposure to at most 1 day',
      'Incremental backups bypass Companies Act compliance requirements',
      'Full backups cannot be uploaded to AWS cloud servers',
    ],
    correctIndex: 1,
    explanation: 'If a crash occurs on Friday, a weekly Sunday backup loses Monday through Friday data. Daily incrementals ensure recovery to the previous night with minimal loss.',
    hints: [
      'What happens if a disk crashes 6 days after the last full backup?',
      'Incremental backups capture only records added/modified since the last run.',
      'Combining full + incremental minimizes data loss window.',
    ],
  },
  {
    id: 'ch_077_3',
    nodeId: NODE_C12_ACC_077,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Applying the Principle of Least Privilege and RBI/ICAI audit guidelines, which permissions should be granted to an External Statutory Auditor?',
    options: [
      'Full Admin privileges (CREATE, DROP, INSERT, UPDATE, DELETE, SELECT) to fix client mistakes',
      'SELECT only (Read-only access) to inspect vouchers and ledgers without risking tampering of audit evidence',
      'INSERT and DELETE only',
      'DROP and ALTER only to redesign tables',
    ],
    correctIndex: 1,
    explanation: 'Auditors must have read-only (SELECT) access. Granting UPDATE or DELETE to auditors compromises audit objectivity and risks destroying statutory evidence.',
    hints: [
      'Should an auditor ever be able to alter or delete the numbers they are auditing?',
      'The auditor inspects and forms an opinion on evidence.',
      'Read-only (SELECT) access preserves the audit trail.',
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
  nodeId: NODE_C12_ACC_071,
  title: 'Excel Worksheets, Graphs, DBMS & SQL in Accounting',
  definition: 'Comprehensive computerised accounting pipeline covering spreadsheet data formatting, automatic trial balance summation, visual chart generation, RDBMS schemas, SQL DDL/DML, and statutory database audit controls.',
  eli5: 'Excel is your digital workbook with smart formulas. SQL & Databases are the secure electronic vault and librarian that store millions of vouchers, enforce double-entry rules, and protect books of account from loss or tampering.',
  misconceptions: [
    {
      misconception: 'If a cell displays digits like 50000, Excel will always sum it correctly.',
      correction: 'An apostrophe (\'50000) or text-format forces text storage. =SUM() silently ignores text, returning 0 or missing balances.',
    },
    {
      misconception: 'Relative and absolute cell references do the exact same thing when dragging formulas.',
      correction: 'Relative references ($none) shift row/column indexes. Absolute references ($B$2) freeze the coordinate for fixed rates.',
    },
    {
      misconception: 'Selecting only value numbers without header/label columns is sufficient to build charts.',
      correction: 'Omitting labels causes Excel to show default "1, 2, 3" category labels instead of meaningful financial years or accounts.',
    },
    {
      misconception: 'Excel is a true DBMS because it has rows and columns.',
      correction: 'Excel lacks relational referential integrity, multi-user row concurrency locks, and granular user role security.',
    },
    {
      misconception: 'DROP TABLE and DELETE FROM do the exact same thing in SQL.',
      correction: 'DROP destroys the entire table schema and data. DELETE removes row records while preserving the table container.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What does =SUM() do when encountering a cell stored as text?', options: ['Returns #ERROR', 'Converts to number', 'Silently ignores it (treats as 0)', 'Crashes workbook'], correctIndex: 2 },
    { question: 'Which key toggles relative/absolute cell references in Excel?', options: ['F1', 'F4', 'F9', 'Ctrl+Z'], correctIndex: 1 },
    { question: 'Which chart best displays component shares of Total Assets?', options: ['Pie Chart', 'Bar Chart', 'Scatter Plot', 'Stock High-Low'], correctIndex: 0 },
    { question: 'What is the Primary Key of a Ledger master table?', options: ['Ledger_Name', 'Ledger_ID', 'Opening_Balance', 'Current_Date'], correctIndex: 1 },
    { question: 'Which SQL command is classified as DDL?', options: ['UPDATE', 'INSERT', 'ALTER', 'SELECT'], correctIndex: 2 },
    { question: 'What happens to DELETE without a WHERE clause?', options: ['Deletes first row', 'Empties all rows in table', 'Throws syntax error', 'Deletes primary key'], correctIndex: 1 },
    { question: 'What access role should an external auditor have?', options: ['Admin', 'Accountant', 'Auditor (SELECT only)', 'Schema Architect'], correctIndex: 2 },
    { question: 'Preservation period of books of account under Section 128 of Companies Act 2013 is:', options: ['3 Years', '5 Years', '8 Years', 'Permanent'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student demonstrates proficiency in Excel worksheet formulas & diagnostics, chart selection, RDBMS architecture, SQL DDL/DML statements, and statutory backup/security protocols.',
};

// 5 Interactive Exploration Steps (Brilliant.org style)
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Excel Data Type & Alignment Diagnostic',
    instruction: 'Toggle cell data formats between Number and Text to discover how =SUM() reacts in real time.',
    interactionType: 'toggle-datatype',
    nodeId: NODE_C12_ACC_071,
  },
  {
    title: 'Lab 2: Dynamic Chart Visualiser (Bar vs Pie)',
    instruction: 'Switch datasets and chart modes to inspect how financial trends vs asset compositions render.',
    interactionType: 'chart-mode',
    nodeId: NODE_C12_ACC_072,
  },
  {
    title: 'Lab 3: RDBMS Referential Integrity Inspector',
    instruction: 'Attempt to post vouchers to valid vs invalid Ledger IDs and observe DBMS constraint validation.',
    interactionType: 'foreign-key-test',
    nodeId: NODE_C12_ACC_074,
  },
  {
    title: 'Lab 4: Live SQL DML Terminal',
    instruction: 'Execute SQL queries to INSERT, UPDATE, DELETE, and SELECT vouchers with real-time table reactions.',
    interactionType: 'sql-terminal',
    nodeId: NODE_C12_ACC_076,
  },
  {
    title: 'Lab 5: Enterprise Backup & Role Security Matrix',
    instruction: 'Simulate server disaster recovery and configure least-privilege roles for Accountants vs Auditors.',
    interactionType: 'security-matrix',
    nodeId: NODE_C12_ACC_077,
  },
];

// Predict-Then-Check items
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you change the opening balance of "Machinery" from Number ₹6,00,000 to Text \'6,00,000, what happens to the Trial Balance Total?',
    options: [
      'Total drops by exactly ₹6,00,000 and the trial balance fails to agree',
      'Total stays the same because Excel auto-converts display strings',
      'The entire column displays #VALUE! error',
      'The Credit column decreases by ₹6,00,000',
    ],
    correctIndex: 0,
    verifyInstruction: 'Click the "Toggle Machinery to Text" switch in the lab below to verify!',
    nodeId: NODE_C12_ACC_071,
  },
  {
    question: 'Predict: What happens if an accountant attempts to run "DELETE FROM Voucher WHERE Ledger_ID = 999" when no Ledger 999 exists?',
    options: [
      'The database crashes permanently',
      '0 rows are deleted and the table remains completely unharmed',
      'The whole Voucher table is wiped out',
      'A new ledger 999 is inserted automatically',
    ],
    correctIndex: 1,
    verifyInstruction: 'Test executing a filtered DELETE query with non-matching ID in the SQL sandbox.',
    nodeId: NODE_C12_ACC_076,
  },
];

// Observation Questions
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the text-stored cells compared to number-stored cells in the worksheet table?',
    observableOptions: [
      'Text values align to the LEFT with no currency symbol; numbers align to the RIGHT with ₹ symbol',
      'Text values are colored bright green',
      'There is no observable visual difference in the grid',
      'Text values shift rows automatically',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_ACC_071,
  },
  {
    question: 'When you switch from "5-Year Revenue" to "Asset Breakdown", which chart communicates the percentage share intuitively?',
    observableOptions: [
      'Bar Chart is always best for everything',
      'Pie Chart intuitively communicates 60% Fixed Assets / 40% Current Assets as slices of 100% Total Assets',
      'Both charts are completely identical in visual meaning',
      'Neither chart can display percentages',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_ACC_072,
  },
];

// Real World Activity
const REAL_WORLD_ACTIVITY = {
  title: 'Corporate Systems Audit: Design an RDBMS Schema for a Tata Dealership',
  description: 'Apply what you learned to architect a real-world relational database for a Tata Motors commercial dealership in Pune with 5,000 monthly sales.',
  steps: [
    'Define 3 tables: CUSTOMER_MASTER (Cust_ID PK), VEHICLE_INVENTORY (Chassis_No PK), SALES_INVOICE (Invoice_No PK, Cust_ID FK, Chassis_No FK).',
    'Write the SQL DDL CREATE statements with NOT NULL and DECIMAL(15,2) currency constraints.',
    'Formulate the weekly full backup and daily incremental log routine to AWS S3 (Mumbai ap-south-1).',
    'Configure 3 user access roles (Admin, Cashier, Statutory Auditor) obeying the principle of least privilege.',
  ],
};

// ─── TOPIC-SPECIFIC SVGS ───

// SVG 1: Excel Cell Data Alignment & SUM Engine Behavior
function ExcelAlignmentSvg({ isText }: { isText: boolean }) {
  return (
    <svg viewBox="0 0 400 130" className="w-full max-w-md h-auto mx-auto rounded-xl bg-slate-950 border border-slate-800" aria-label="Excel Cell Alignment and SUM behavior diagram">
      <defs>
        <linearGradient id="cellGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      {/* Excel Formula Bar */}
      <rect x="10" y="10" width="380" height="26" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <text x="20" y="27" fill="#94a3b8" fontSize="11" fontFamily="monospace">fx</text>
      <line x1="38" y1="12" x2="38" y2="34" stroke="#475569" strokeWidth="1" />
      <text x="46" y="27" fill="#f8fafc" fontSize="11" fontFamily="monospace">
        {isText ? "'600000 (Apostrophe forces string)" : '=SUM(C4:C8)'}
      </text>

      {/* Spreadsheet Cell C8 */}
      <rect x="10" y="44" width="380" height="42" rx="4" fill="url(#cellGrad)" stroke={isText ? '#f59e0b' : '#10b981'} strokeWidth="1.5" />
      <text x="20" y="68" fill="#64748b" fontSize="10" fontFamily="sans-serif">Cell C8</text>

      {isText ? (
        <>
          <text x="68" y="70" fill="#fbbf24" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="start">
            '600000 [Left-Aligned Text]
          </text>
          <circle cx="360" cy="65" r="9" fill="#ef4444" />
          <text x="360" y="69" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">✗</text>
        </>
      ) : (
        <>
          <text x="350" y="70" fill="#34d399" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="end">
            ₹ 6,00,000.00 [Right-Aligned Number]
          </text>
          <circle cx="360" cy="65" r="9" fill="#10b981" />
          <text x="360" y="69" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">✓</text>
        </>
      )}

      {/* Formula engine status line */}
      <rect x="10" y="92" width="380" height="28" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
      <text x="20" y="110" fill={isText ? '#f87171' : '#34d399'} fontSize="11" fontWeight="600">
        {isText
          ? '✗ Formula Engine: Treats as string text -> Ignored (0 added to Debit total)'
          : '✓ Formula Engine: True numeric integer -> Adds ₹6,00,000 to Debit total'}
      </text>
    </svg>
  );
}

// SVG 2: RDBMS Relational Schema & Foreign Key Mapping
function RelationalSchemaSvg({ isValidFk }: { isValidFk: boolean }) {
  return (
    <svg viewBox="0 0 500 150" className="w-full max-w-lg h-auto mx-auto rounded-xl bg-slate-950 border border-slate-800" aria-label="RDBMS Relational Schema showing Primary Key and Foreign Key constraints">
      {/* Parent Table LEDGER */}
      <g>
        <rect x="15" y="15" width="200" height="120" rx="6" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" />
        <rect x="15" y="15" width="200" height="26" rx="6" fill="#312e81" />
        <text x="25" y="32" fill="#e0e7ff" fontSize="11" fontWeight="bold">PARENT: LEDGER (Master)</text>

        <rect x="25" y="48" width="180" height="22" rx="3" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
        <text x="32" y="63" fill="#a5b4fc" fontSize="10" fontFamily="monospace" fontWeight="bold">🔑 Ledger_ID (PK) [INT]</text>

        <text x="32" y="88" fill="#94a3b8" fontSize="10" fontFamily="monospace">Ledger_Name [VARCHAR]</text>
        <text x="32" y="108" fill="#94a3b8" fontSize="10" fontFamily="monospace">Opening_Bal [DECIMAL]</text>
        <text x="32" y="126" fill="#64748b" fontSize="9">101: Cash, 102: Bank, 105: Sales</text>
      </g>

      {/* Relational Arrow Connection */}
      <path
        d="M 215 59 C 255 59, 255 68, 285 68"
        fill="none"
        stroke={isValidFk ? '#10b981' : '#ef4444'}
        strokeWidth="2.5"
        strokeDasharray={isValidFk ? 'none' : '4,4'}
      />
      <circle cx="215" cy="59" r="4" fill="#818cf8" />
      <polygon points="285,68 277,63 277,73" fill={isValidFk ? '#10b981' : '#ef4444'} />

      {/* Child Table VOUCHER */}
      <g>
        <rect x="285" y="15" width="200" height="120" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
        <rect x="285" y="15" width="200" height="26" rx="6" fill="#064e3b" />
        <text x="295" y="32" fill="#d1fae5" fontSize="11" fontWeight="bold">CHILD: VOUCHER (Trans)</text>

        <text x="295" y="52" fill="#94a3b8" fontSize="10" fontFamily="monospace">🔑 Voucher_ID (PK)</text>

        <rect x="292" y="58" width="186" height="20" rx="3" fill="#065f46" stroke={isValidFk ? '#34d399' : '#f87171'} strokeWidth="1" />
        <text x="298" y="72" fill="#ecfdf5" fontSize="10" fontFamily="monospace" fontWeight="bold">🔗 Ledger_ID (FK)</text>

        <text x="298" y="96" fill="#94a3b8" fontSize="10" fontFamily="monospace">Debit_Amt / Credit_Amt</text>
        <text x="298" y="114" fill="#94a3b8" fontSize="10" fontFamily="monospace">Voucher_Date / Narration</text>
        <text x="298" y="128" fill={isValidFk ? '#34d399' : '#f87171'} fontSize="9" fontWeight="bold">
          {isValidFk ? '✓ Referential Integrity OK' : '✗ Orphan Row Rejected'}
        </text>
      </g>
    </svg>
  );
}

// SVG 3: Enterprise Disaster Recovery & Least Privilege RBAC Security Pipeline
function EnterpriseSecurityPipelineSvg({ role, isCrashed }: { role: 'Admin' | 'Accountant' | 'Auditor'; isCrashed: boolean }) {
  return (
    <svg viewBox="0 0 500 140" className="w-full max-w-lg h-auto mx-auto rounded-xl bg-slate-950 border border-slate-800" aria-label="Enterprise Disaster Recovery and Role-Based Access Control Pipeline">
      {/* Storage Disk Block */}
      <rect x="15" y="20" width="130" height="100" rx="8" fill="#0f172a" stroke={isCrashed ? '#ef4444' : '#3b82f6'} strokeWidth="1.5" />
      <text x="25" y="38" fill="#93c5fd" fontSize="10" fontWeight="bold">STORAGE SERVER</text>
      <rect x="25" y="46" width="110" height="18" rx="3" fill={isCrashed ? '#7f1d1d' : '#1e3a8a'} />
      <text x="32" y="59" fill="#ffffff" fontSize="9" fontFamily="monospace">
        {isCrashed ? '💥 DISK CRASH' : '💾 Production DB'}
      </text>
      <text x="25" y="80" fill="#64748b" fontSize="8">Sec 128 Retention: 8 Yrs</text>
      <text x="25" y="94" fill="#64748b" fontSize="8">Weekly Full (Sun 2 AM)</text>
      <text x="25" y="108" fill="#10b981" fontSize="8">Daily Incrementals (11 PM)</text>

      {/* Pipeline Connector */}
      <line x1="145" y1="70" x2="190" y2="70" stroke="#475569" strokeWidth="2" strokeDasharray="3,3" />
      <polygon points="190,70 183,66 183,74" fill="#475569" />

      {/* Cloud S3 Vault */}
      <rect x="190" y="20" width="120" height="100" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
      <text x="200" y="38" fill="#6ee7b7" fontSize="10" fontWeight="bold">AWS S3 MUMBAI</text>
      <circle cx="250" cy="65" r="16" fill="#065f46" stroke="#34d399" strokeWidth="1" />
      <text x="250" y="70" fill="#ffffff" fontSize="14" textAnchor="middle">☁️</text>
      <text x="200" y="98" fill="#94a3b8" fontSize="8">Encrypted Snapshots</text>
      <text x="200" y="110" fill="#34d399" fontSize="8">✓ Point-in-time Recovery</text>

      {/* RBAC Security Gate */}
      <line x1="310" y1="70" x2="350" y2="70" stroke="#475569" strokeWidth="2" />
      <polygon points="350,70 343,66 343,74" fill="#475569" />

      <rect x="350" y="20" width="135" height="100" rx="8" fill="#0f172a" stroke="#eab308" strokeWidth="1.5" />
      <text x="360" y="38" fill="#fde047" fontSize="10" fontWeight="bold">RBAC POLICY GATE</text>
      <rect x="358" y="46" width="118" height="22" rx="4" fill="#422006" stroke="#ca8a04" strokeWidth="1" />
      <text x="365" y="61" fill="#fef08a" fontSize="10" fontWeight="bold">
        Role: {role}
      </text>
      <text x="360" y="85" fill={role === 'Admin' ? '#34d399' : '#f87171'} fontSize="8">
        DDL (DROP/CREATE): {role === 'Admin' ? '✓ ALLOWED' : '✗ DENIED'}
      </text>
      <text x="360" y="97" fill={role === 'Auditor' ? '#f87171' : '#34d399'} fontSize="8">
        DML (INSERT/UPDATE): {role === 'Auditor' ? '✗ DENIED' : '✓ ALLOWED'}
      </text>
      <text x="360" y="109" fill="#34d399" fontSize="8">
        DML (SELECT Audit): ✓ ALLOWED
      </text>
    </svg>
  );
}

function C12_AccountancyCreatingWorksheetsEnteringSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['accountancy'] || { name: 'Accountancy', emoji: '📑', color: 'indigo' };

  // Phase navigation
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Brilliant Exploration Interactive States
  const [machineryIsText, setMachineryIsText] = useState(false);
  const [cashIsText, setCashIsText] = useState(false);
  const [chartMode, setChartMode] = useState<'revenue' | 'assets'>('revenue');
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  const [includeLabels, setIncludeLabels] = useState(true);

  // Predict-then-check states
  const [pred1Made, setPred1Made] = useState(false);
  const [pred1Index, setPred1Index] = useState(-1);
  const [pred1Verified, setPred1Verified] = useState(false);
  const [obs1Answered, setObs1Answered] = useState(false);

  // RDBMS Interactive Lab States
  const [testLedgerId, setTestLedgerId] = useState('101');
  const [testVoucherAmt, setTestVoucherAmt] = useState(50000);
  const [fkValidationStatus, setFkValidationStatus] = useState<'idle' | 'success' | 'failed'>('idle');

  // SQL Terminal Sandbox State
  const [sqlCommand, setSqlCommand] = useState('SELECT * FROM Voucher;');
  const [terminalOutput, setTerminalOutput] = useState<string>('Connected to MySQL 8.0 — Apex FinTech DB ready.');
  const [voucherRecords, setVoucherRecords] = useState([
    { id: 2001, date: '2026-03-01', ledgerId: 101, debit: 120000, credit: 0, narration: 'Cash Sales' },
    { id: 2002, date: '2026-03-05', ledgerId: 105, debit: 0, credit: 250000, narration: 'Sales to Reliance Retail' },
    { id: 2003, date: '2026-03-10', ledgerId: 201, debit: 80000, credit: 0, narration: 'Purchase Tata Chem' },
  ]);

  // Security & Backup Simulation States
  const [backupScheduleActive, setBackupScheduleActive] = useState(true);
  const [simulatedCrash, setSimulatedCrash] = useState(false);
  const [restoredState, setRestoredState] = useState(false);
  const [userRole, setUserRole] = useState<'Admin' | 'Accountant' | 'Auditor'>('Accountant');

  // Reflection section answers state
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Adaptive difficulty & scoring
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

  // Drag-and-drop & Construct challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback and animation triggers
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Canvas Ref for requestAnimationFrame indicator
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered challenges by difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Real-time Excel Summation Calculation in Lab 1
  const excelTotals = useMemo(() => {
    const cashVal = cashIsText ? 0 : 150000;
    const bankVal = 220000;
    const debtorsVal = 340000;
    const stockVal = 280000;
    const machineryVal = machineryIsText ? 0 : 600000;

    const debitTotal = cashVal + bankVal + debtorsVal + stockVal + machineryVal;
    const creditTotal = 1590000; // Balanced target
    const isBalanced = debitTotal === creditTotal;

    return {
      cashVal,
      bankVal,
      debtorsVal,
      stockVal,
      machineryVal,
      debitTotal,
      creditTotal,
      isBalanced,
      difference: Math.abs(creditTotal - debitTotal),
    };
  }, [cashIsText, machineryIsText]);

  // Chart datasets
  const revenueData = useMemo(() => [
    { name: includeLabels ? 'FY20' : '1', revenue: 593889 },
    { name: includeLabels ? 'FY21' : '2', revenue: 430831 },
    { name: includeLabels ? 'FY22' : '3', revenue: 684962 },
    { name: includeLabels ? 'FY23' : '4', revenue: 876390 },
    { name: includeLabels ? 'FY24' : '5', revenue: 801014 },
  ], [includeLabels]);

  const assetsData = useMemo(() => [
    { name: includeLabels ? 'Fixed Assets' : '1', value: 600000, percent: '60%' },
    { name: includeLabels ? 'Current Assets' : '2', value: 400000, percent: '40%' },
  ], [includeLabels]);

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT Difficulty adaptation effect
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

  // HTML Canvas animation loop for active status
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 5) {
        const y = 15 + Math.sin((x + frame * 3) * 0.05) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(canvas.width - 20, 15, 6 + Math.sin(frame * 0.1) * 2, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── CALLBACK HANDLERS ───

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
    speechManager.speak(isCorrect ? 'Outstanding deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive accounting labs! Explore each concept by doing.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Test SQL statements and simulations with no grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Ready for graded challenges. Let us prove your mastery!');
  }, []);

  const handlePred1 = useCallback((idx: number) => {
    setPred1Index(idx);
    setPred1Made(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the switch below to verify.');
  }, []);

  const handleObs1 = useCallback((idx: number) => {
    setObs1Answered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation! Text left-aligns, numbers right-align.' : 'Inspect the cell text alignment closely.');
  }, []);

  const handleTestFkValidation = useCallback(() => {
    const validLedgers = ['101', '102', '105', '201', '301'];
    audioManager.play('tap');
    if (validLedgers.includes(testLedgerId.trim())) {
      setFkValidationStatus('success');
      audioManager.play('drop-correct');
      speechManager.speak('Referential integrity passed! Ledger exists in the chart of accounts.');
    } else {
      setFkValidationStatus('failed');
      audioManager.play('error');
      speechManager.speak('Foreign Key violation! Ledger ID does not exist in parent LEDGER table.');
    }
  }, [testLedgerId]);

  const handleExecuteSql = useCallback(() => {
    audioManager.play('tap');
    const trimmed = sqlCommand.trim().toUpperCase();

    if (trimmed.startsWith('SELECT')) {
      audioManager.play('pop');
      setTerminalOutput(`Returned ${voucherRecords.length} voucher rows successfully.`);
    } else if (trimmed.startsWith('INSERT')) {
      const newVoucher = {
        id: 2000 + voucherRecords.length + 1,
        date: '2026-03-20',
        ledgerId: 105,
        debit: 50000,
        credit: 0,
        narration: 'Interactive Sales Voucher',
      };
      setVoucherRecords(prev => [...prev, newVoucher]);
      setTerminalOutput(`Query OK, 1 row inserted. Voucher_ID ${newVoucher.id} persisted.`);
      audioManager.play('drop-correct');
    } else if (trimmed.startsWith('UPDATE')) {
      setVoucherRecords(prev => prev.map(v => ({ ...v, debit: v.debit > 0 ? v.debit + 10000 : 0 })));
      setTerminalOutput('Query OK, rows updated with new balances.');
      audioManager.play('drop-correct');
    } else if (trimmed.startsWith('DELETE')) {
      if (trimmed.includes('WHERE')) {
        setVoucherRecords(prev => prev.slice(0, Math.max(0, prev.length - 1)));
        setTerminalOutput('Query OK, 1 matching row deleted safely.');
      } else {
        setVoucherRecords([]);
        setTerminalOutput('DANGER: No WHERE clause supplied! ALL rows in Voucher table wiped out.');
        audioManager.play('error');
      }
    } else if (trimmed.startsWith('DROP')) {
      setTerminalOutput('ERROR 1044: DROP TABLE prohibited under current session security policy.');
      audioManager.play('error');
    } else {
      setTerminalOutput('Syntax error in SQL statement.');
      audioManager.play('error');
    }
  }, [sqlCommand, voucherRecords]);

  const handleTriggerCrashRecovery = useCallback(() => {
    audioManager.play('error');
    setSimulatedCrash(true);
    setRestoredState(false);
    speechManager.speak('Server disk crash simulated! Primary storage compromised.');
  }, []);

  const handleRestoreBackup = useCallback(() => {
    audioManager.play('drop-correct');
    setSimulatedCrash(false);
    setRestoredState(true);
    speechManager.speak('Full Sunday baseline loaded and incremental binary logs replayed. Data restored!');
  }, []);

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
      const arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
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
    speechManager.speak('Congratulations! You have completed the accounting systems simulation.');
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
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Brilliant deduction.');
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
        speechManager.speak('Let us review the step-by-step reasoning together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, resetInactivityTimer, showNextHint]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header Bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 p-4 mb-6 bg-slate-900/80 rounded-2xl border border-slate-800 backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <span className="p-3 bg-gold-600/20 text-gold-400 rounded-xl text-2xl border border-gold-500/30" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h1>
            <p className="text-xs text-slate-400">ISC Class 12 • Computerised Accounting & RDBMS</p>
          </div>
        </div>

        {/* Phase Pills */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs" role="navigation" aria-label="Simulation Phases">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              aria-label={`Switch to ${p} phase`}
              className={`px-3 py-1.5 rounded-lg capitalize font-semibold transition-all ${
                phase === p
                  ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/40 shadow-inner">
            <h2 className="text-xl font-bold text-gold-300 mb-2">🏢 {SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">{SCENARIO.intro}</p>
            <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-700/30 text-xs text-gold-200">
              💡 <span className="font-semibold">Context:</span> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 block">
              Curiosity Hook • Try Your Instincts
            </span>
            <h3 className="text-lg font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Select option ${i + 1}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/50 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 border border-slate-700 text-slate-400 opacity-60'
                      : 'bg-slate-800/80 border border-slate-700 hover:border-gold-500 text-slate-200'
                  }`}
                >
                  <span className="mr-2">{discoveryAnswered ? (i === DISCOVERY_QUESTION.correctIndex ? '✓' : '✗') : '•'}</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <p className={`text-sm font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! =SUM() completely ignores text-formatted numbers.'
                    : '✗ Great guess! Text formatting is invisible to the eye but fatal to formulas.'}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Labs"
                  className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold shadow-lg shadow-gold-600/30 flex items-center gap-2"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── 2. INTERACTIVE EXPLORATION PHASE (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Navigator Bar */}
          <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs uppercase font-bold text-gold-400 tracking-wider">
                Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <p className="text-xs text-amber-300 max-w-md hidden md:block">
              👉 {EXPLORATION_STEPS[currentSlide].instruction}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              {/* Lab 1: Excel Data Type & Alignment Diagnostic */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {/* Topic-specific SVG 1 */}
                  <ExcelAlignmentSvg isText={machineryIsText || cashIsText} />

                  {/* Predict-then-check block */}
                  {!pred1Made ? (
                    <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-700/40">
                      <p className="text-sm font-semibold text-gold-200 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePred1(i)}
                            aria-label={`Predict option ${i + 1}: ${opt}`}
                            className="text-left p-3 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-600/40 text-xs text-amber-200 flex items-center justify-between">
                      <span>✓ {PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                      <span className="font-bold text-gold-400">Your Prediction: Option {pred1Index + 1}</span>
                    </div>
                  )}

                  {/* Interactive Worksheet Grid */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm text-left border-collapse border border-slate-700 rounded-xl overflow-hidden">
                      <thead>
                        <tr className="bg-slate-800 text-slate-300 uppercase font-semibold">
                          <th className="p-3 border border-slate-700 w-16">Cell</th>
                          <th className="p-3 border border-slate-700">Column A (Particulars)</th>
                          <th className="p-3 border border-slate-700 w-20">L.F.</th>
                          <th className="p-3 border border-slate-700 text-right">Column C (Debit ₹)</th>
                          <th className="p-3 border border-slate-700 text-right">Column D (Credit ₹)</th>
                          <th className="p-3 border border-slate-700 text-center">Data Type Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        <tr>
                          <td className="p-3 font-mono text-slate-500 border border-slate-700">A4/C4</td>
                          <td className="p-3 border border-slate-700 text-left">Cash in Hand</td>
                          <td className="p-3 border border-slate-700 text-center">1</td>
                          <td className={`p-3 border border-slate-700 font-mono ${cashIsText ? 'text-left text-amber-400' : 'text-right text-emerald-400'}`}>
                            {cashIsText ? "'150000 (Text)" : '₹ 1,50,000.00'}
                          </td>
                          <td className="p-3 border border-slate-700 text-right font-mono text-slate-500">-</td>
                          <td className="p-3 border border-slate-700 text-center">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setCashIsText(prev => !prev);
                                audioManager.play('tap');
                              }}
                              aria-label={`Toggle cash between text and number, currently ${cashIsText ? 'Text' : 'Number'}`}
                              className={`px-3 py-1 rounded text-xs font-bold ${
                                cashIsText ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-300'
                              }`}
                            >
                              {cashIsText ? 'Stored as Text' : 'Stored as Number'}
                            </motion.button>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono text-slate-500 border border-slate-700">A5/C5</td>
                          <td className="p-3 border border-slate-700 text-left">Bank Balance</td>
                          <td className="p-3 border border-slate-700 text-center">2</td>
                          <td className="p-3 border border-slate-700 text-right font-mono text-emerald-400">₹ 2,20,000.00</td>
                          <td className="p-3 border border-slate-700 text-right font-mono text-slate-500">-</td>
                          <td className="p-3 border border-slate-700 text-center text-slate-400">Number</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono text-slate-500 border border-slate-700">A6/C6</td>
                          <td className="p-3 border border-slate-700 text-left">Sundry Debtors</td>
                          <td className="p-3 border border-slate-700 text-center">3</td>
                          <td className="p-3 border border-slate-700 text-right font-mono text-emerald-400">₹ 3,40,000.00</td>
                          <td className="p-3 border border-slate-700 text-right font-mono text-slate-500">-</td>
                          <td className="p-3 border border-slate-700 text-center text-slate-400">Number</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono text-slate-500 border border-slate-700">A7/C7</td>
                          <td className="p-3 border border-slate-700 text-left">Closing Stock</td>
                          <td className="p-3 border border-slate-700 text-center">4</td>
                          <td className="p-3 border border-slate-700 text-right font-mono text-emerald-400">₹ 2,80,000.00</td>
                          <td className="p-3 border border-slate-700 text-right font-mono text-slate-500">-</td>
                          <td className="p-3 border border-slate-700 text-center text-slate-400">Number</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono text-slate-500 border border-slate-700">A8/C8</td>
                          <td className="p-3 border border-slate-700 text-left">Plant & Machinery</td>
                          <td className="p-3 border border-slate-700 text-center">5</td>
                          <td className={`p-3 border border-slate-700 font-mono ${machineryIsText ? 'text-left text-amber-400' : 'text-right text-emerald-400'}`}>
                            {machineryIsText ? "'600000 (Text)" : '₹ 6,00,000.00'}
                          </td>
                          <td className="p-3 border border-slate-700 text-right font-mono text-slate-500">-</td>
                          <td className="p-3 border border-slate-700 text-center">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setMachineryIsText(prev => !prev);
                                audioManager.play('tap');
                              }}
                              aria-label={`Toggle machinery between text and number, currently ${machineryIsText ? 'Text' : 'Number'}`}
                              className={`px-3 py-1 rounded text-xs font-bold ${
                                machineryIsText ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-300'
                              }`}
                            >
                              {machineryIsText ? 'Stored as Text' : 'Stored as Number'}
                            </motion.button>
                          </td>
                        </tr>
                        <tr className="bg-slate-800/80 font-bold">
                          <td className="p-3 font-mono text-slate-400 border border-slate-700">A9/C9</td>
                          <td className="p-3 border border-slate-700 text-left text-gold-300">Total =SUM(C4:C8)</td>
                          <td className="p-3 border border-slate-700 text-center">-</td>
                          <td className={`p-3 border border-slate-700 text-right font-mono text-base ${
                            excelTotals.isBalanced ? 'text-emerald-400' : 'text-rose-400'
                          }`}>
                            ₹ {excelTotals.debitTotal.toLocaleString('en-IN')}.00
                          </td>
                          <td className="p-3 border border-slate-700 text-right font-mono text-base text-emerald-400">
                            ₹ {excelTotals.creditTotal.toLocaleString('en-IN')}.00
                          </td>
                          <td className="p-3 border border-slate-700 text-center">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              excelTotals.isBalanced ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500' : 'bg-rose-900/60 text-rose-300 border border-rose-500'
                            }`}>
                              {excelTotals.isBalanced ? '✓ TALLIED' : `✗ MISMATCH (₹ ${excelTotals.difference.toLocaleString('en-IN')})`}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Observation Question */}
                  {!obs1Answered && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                      <p className="text-sm font-semibold text-white mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleObs1(i)}
                            aria-label={`Observation option ${i + 1}: ${opt}`}
                            className="p-3 text-left bg-slate-900 hover:bg-slate-700 text-xs text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Lab 2: Dynamic Chart Visualiser (Bar vs Pie) */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-400">Dataset:</span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setChartMode('revenue');
                          setChartType('bar');
                          audioManager.play('tap');
                        }}
                        aria-label="Select 5-Year Revenue dataset"
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          chartMode === 'revenue' ? 'bg-gold-600 text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        5-Yr Revenue (Comparison)
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setChartMode('assets');
                          setChartType('pie');
                          audioManager.play('tap');
                        }}
                        aria-label="Select Total Assets Composition dataset"
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          chartMode === 'assets' ? 'bg-gold-600 text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        Total Assets (Composition)
                      </motion.button>
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeLabels}
                          onChange={e => {
                            setIncludeLabels(e.target.checked);
                            audioManager.play('tap');
                          }}
                          aria-label="Toggle include category labels column A1:A6"
                          className="rounded text-gold-600"
                        />
                        Include Category Labels Column (A1:A6)
                      </label>
                      <div className="flex gap-1 bg-slate-950 p-1 rounded-lg">
                        <button
                          onClick={() => setChartType('bar')}
                          aria-label="Switch to Bar chart view"
                          className={`px-2.5 py-1 rounded text-xs ${chartType === 'bar' ? 'bg-gold-600 text-white' : 'text-slate-400'}`}
                        >
                          Bar
                        </button>
                        <button
                          onClick={() => setChartType('pie')}
                          aria-label="Switch to Pie chart view"
                          className={`px-2.5 py-1 rounded text-xs ${chartType === 'pie' ? 'bg-gold-600 text-white' : 'text-slate-400'}`}
                        >
                          Pie
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Render Visual Chart */}
                  <div className="h-64 sm:h-80 w-full bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      {chartType === 'bar' ? (
                        <BarChart data={chartMode === 'revenue' ? revenueData : assetsData}>
                          <XAxis dataKey="name" stroke="#94a3b8" />
                          <YAxis stroke="#94a3b8" />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff' }}
                            formatter={(value: number) => [`₹ ${value.toLocaleString('en-IN')}`, 'Amount']}
                          />
                          <Bar dataKey={chartMode === 'revenue' ? 'revenue' : 'value'} fill="#6366f1" radius={[6, 6, 0, 0]}>
                            {(chartMode === 'revenue' ? revenueData : assetsData).map((_, index) => (
                              <Cell key={`cell-${index}`} fill={index === 3 && chartMode === 'revenue' ? '#10b981' : '#6366f1'} />
                            ))}
                          </Bar>
                        </BarChart>
                      ) : (
                        <RechartsPie>
                          <RechartsPieSlice
                            data={chartMode === 'revenue' ? revenueData : assetsData}
                            dataKey={chartMode === 'revenue' ? 'revenue' : 'value'}
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            fill="#8884d8"
                            label={entry => `${entry.name} (${chartMode === 'assets' ? entry.percent : ''})`}
                          >
                            <Cell fill="#6366f1" />
                            <Cell fill="#10b981" />
                            <Cell fill="#f59e0b" />
                            <Cell fill="#ec4899" />
                            <Cell fill="#3b82f6" />
                          </RechartsPieSlice>
                          <Legend verticalAlign="bottom" height={36} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff' }}
                          />
                        </RechartsPie>
                      )}
                    </ResponsiveContainer>
                  </div>

                  {!includeLabels && (
                    <div className="p-3 bg-rose-950/40 rounded-xl border border-rose-600/40 text-xs text-rose-300">
                      ⚠️ <span className="font-bold">Glitch Notice:</span> Because you unselected category labels in column A, the chart defaulted X-axis to generic "1, 2, 3, 4, 5" numbers! Always select A1:B6.
                    </div>
                  )}
                </div>
              )}

              {/* Lab 3: RDBMS Referential Integrity Inspector */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  {/* Topic-specific SVG 2 */}
                  <RelationalSchemaSvg isValidFk={fkValidationStatus === 'success' || fkValidationStatus === 'idle'} />

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Parent LEDGER table */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs text-gold-400 font-bold">PARENT: LEDGER</span>
                        <span className="text-[10px] bg-gold-900/40 text-gold-300 px-2 py-0.5 rounded">Primary Key = Ledger_ID</span>
                      </div>
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400">
                            <th className="py-1">Ledger_ID (PK)</th>
                            <th className="py-1">Ledger_Name</th>
                            <th className="py-1">Group</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900 text-slate-300">
                          <tr><td className="py-1 font-mono text-emerald-400">101</td><td>Cash in Hand</td><td>Asset</td></tr>
                          <tr><td className="py-1 font-mono text-emerald-400">102</td><td>Bank of India</td><td>Asset</td></tr>
                          <tr><td className="py-1 font-mono text-emerald-400">105</td><td>Sales Account</td><td>Income</td></tr>
                          <tr><td className="py-1 font-mono text-emerald-400">201</td><td>Tata Chemicals</td><td>Liability</td></tr>
                          <tr><td className="py-1 font-mono text-emerald-400">301</td><td>Capital Account</td><td>Capital</td></tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Child VOUCHER Transaction Simulator */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <span className="font-mono text-xs text-emerald-400 font-bold">CHILD: VOUCHER INSERT TEST</span>
                      <div className="space-y-2">
                        <div>
                          <label htmlFor="test-ledger-id" className="text-xs text-slate-400">Enter Target Ledger_ID (FK):</label>
                          <input
                            id="test-ledger-id"
                            type="text"
                            value={testLedgerId}
                            onChange={e => setTestLedgerId(e.target.value)}
                            placeholder="e.g. 101 or 999"
                            aria-label="Target Ledger ID for foreign key constraint test"
                            className="w-full mt-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-sm font-mono text-white"
                          />
                        </div>
                        <div>
                          <label htmlFor="test-voucher-amt" className="text-xs text-slate-400">Voucher Amount (₹):</label>
                          <input
                            id="test-voucher-amt"
                            type="number"
                            value={testVoucherAmt}
                            onChange={e => setTestVoucherAmt(Number(e.target.value))}
                            aria-label="Voucher test amount in Rupees"
                            className="w-full mt-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-sm font-mono text-white"
                          />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleTestFkValidation}
                          aria-label="Submit Voucher via DBMS validation engine"
                          className="w-full py-2 bg-gold-600 text-white rounded-lg font-bold text-xs shadow-lg"
                        >
                          Submit Voucher via DBMS
                        </motion.button>
                      </div>

                      {fkValidationStatus === 'success' && (
                        <div className="p-2.5 bg-emerald-950/50 border border-emerald-500 rounded-lg text-xs text-emerald-300">
                          ✓ <span className="font-bold">Success:</span> Ledger ID {testLedgerId} verified in master. Referential integrity satisfied!
                        </div>
                      )}
                      {fkValidationStatus === 'failed' && (
                        <div className="p-2.5 bg-rose-950/50 border border-rose-500 rounded-lg text-xs text-rose-300">
                          ✗ <span className="font-bold">DBMS Refusal:</span> Error 1452: Cannot add or update child row: foreign key constraint fails. Ledger {testLedgerId} does not exist!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Lab 4: Live SQL Terminal */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      "SELECT * FROM Voucher;",
                      "INSERT INTO Voucher VALUES (2004, '2026-03-20', 105, 50000, 0, 'Sales');",
                      "UPDATE Voucher SET Debit_Amt = Debit_Amt + 10000 WHERE Ledger_ID = 101;",
                      "DELETE FROM Voucher WHERE Voucher_ID = 2001;",
                      "DELETE FROM Voucher; -- DANGER NO WHERE",
                    ].map((query, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSqlCommand(query);
                          audioManager.play('tap');
                        }}
                        aria-label={`Load SQL preset ${i + 1}`}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 rounded border border-slate-700"
                      >
                        Query Preset {i + 1}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">mysql&gt;</span>
                      <input
                        type="text"
                        value={sqlCommand}
                        onChange={e => setSqlCommand(e.target.value)}
                        aria-label="SQL command line prompt"
                        className="flex-1 bg-transparent border-none outline-none text-white font-mono"
                      />
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleExecuteSql}
                        aria-label="Execute SQL command"
                        className="px-4 py-1 bg-emerald-600 text-white rounded font-sans font-bold"
                      >
                        Execute
                      </motion.button>
                    </div>

                    <div className="p-2 bg-slate-900 rounded text-slate-300 border border-slate-800">
                      {terminalOutput}
                    </div>

                    {/* Visual Voucher Table */}
                    <div className="overflow-x-auto mt-2">
                      <table className="w-full text-left border-collapse border border-slate-800">
                        <thead>
                          <tr className="bg-slate-900 text-slate-400">
                            <th className="p-1.5 border border-slate-800">Voucher_ID</th>
                            <th className="p-1.5 border border-slate-800">Date</th>
                            <th className="p-1.5 border border-slate-800">Ledger_ID</th>
                            <th className="p-1.5 border border-slate-800 text-right">Debit ₹</th>
                            <th className="p-1.5 border border-slate-800 text-right">Credit ₹</th>
                            <th className="p-1.5 border border-slate-800">Narration</th>
                          </tr>
                        </thead>
                        <tbody>
                          {voucherRecords.map(v => (
                            <tr key={v.id} className="text-slate-200">
                              <td className="p-1.5 border border-slate-800 text-gold-400">{v.id}</td>
                              <td className="p-1.5 border border-slate-800">{v.date}</td>
                              <td className="p-1.5 border border-slate-800 font-mono text-emerald-400">{v.ledgerId}</td>
                              <td className="p-1.5 border border-slate-800 text-right">{v.debit.toLocaleString('en-IN')}</td>
                              <td className="p-1.5 border border-slate-800 text-right">{v.credit.toLocaleString('en-IN')}</td>
                              <td className="p-1.5 border border-slate-800 text-slate-400">{v.narration}</td>
                            </tr>
                          ))}
                          {voucherRecords.length === 0 && (
                            <tr>
                              <td colSpan={6} className="p-4 text-center text-rose-400 bg-rose-950/20">
                                ⚠️ Table is currently empty! (Executed unqualified DELETE)
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Lab 5: Backup & Role Security Matrix */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  {/* Topic-specific SVG 3 */}
                  <EnterpriseSecurityPipelineSvg role={userRole} isCrashed={simulatedCrash} />

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Section 128 Backup Strategy Simulator */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gold-400 uppercase">Companies Act 2013 • Sec 128</span>
                        <span className="text-[10px] bg-emerald-900/40 text-emerald-300 px-2 py-0.5 rounded">8-Yr Retention</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Schedule: Weekly Full Dump (Sunday 2 AM) + Daily Incremental binary logs (11 PM) to AWS S3 Mumbai.
                      </p>

                      <div className="flex gap-2 pt-2">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={handleTriggerCrashRecovery}
                          aria-label="Simulate Hard Drive Crash"
                          className="flex-1 py-2 bg-rose-600/80 hover:bg-rose-600 text-white rounded-lg text-xs font-bold"
                        >
                          Simulate Hard Drive Crash
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={handleRestoreBackup}
                          aria-label="Replay Backup and binary logs"
                          className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold"
                        >
                          Replay Backup & Logs
                        </motion.button>
                      </div>

                      {simulatedCrash && (
                        <div className="p-3 bg-rose-950/60 border border-rose-600 rounded-lg text-xs text-rose-300">
                          💥 <span className="font-bold">CRASH:</span> Local database offline. Risk of 200 client records loss unless restored!
                        </div>
                      )}
                      {restoredState && (
                        <div className="p-3 bg-emerald-950/60 border border-emerald-600 rounded-lg text-xs text-emerald-300">
                          🛡️ <span className="font-bold">RESTORE COMPLETE:</span> Sunday baseline snapshot mounted + Mon/Tue logs applied. 0 vouchers lost.
                        </div>
                      )}
                    </div>

                    {/* User Access Control Matrix */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-emerald-400 uppercase">Principle of Least Privilege (RBAC)</span>
                      <div className="flex gap-2">
                        {(['Admin', 'Accountant', 'Auditor'] as const).map(role => (
                          <button
                            key={role}
                            onClick={() => {
                              setUserRole(role);
                              audioManager.play('tap');
                            }}
                            aria-label={`Select user security role: ${role}`}
                            className={`px-3 py-1 rounded-lg text-xs font-bold ${
                              userRole === role ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {role}
                          </button>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                        <div className="p-2 bg-slate-900 rounded border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">CREATE/DROP</span>
                          <span className={`font-bold ${userRole === 'Admin' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {userRole === 'Admin' ? '✓ ALLOWED' : '✗ DENIED'}
                          </span>
                        </div>
                        <div className="p-2 bg-slate-900 rounded border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">INSERT/UPDATE</span>
                          <span className={`font-bold ${userRole === 'Auditor' ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {userRole === 'Auditor' ? '✗ DENIED' : '✓ ALLOWED'}
                          </span>
                        </div>
                        <div className="p-2 bg-slate-900 rounded border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">SELECT (Audit)</span>
                          <span className="font-bold text-emerald-400">✓ ALLOWED</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {userRole === 'Auditor' && '🔒 Auditor is restricted to read-only SELECT to prevent altering evidence.'}
                        {userRole === 'Accountant' && '✍️ Accountant enters and updates vouchers but cannot DROP tables.'}
                        {userRole === 'Admin' && '👑 DBA maintains schemas and executes full disaster recovery.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              aria-label="Go to previous lab"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl disabled:opacity-40 font-semibold text-xs sm:text-sm"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs font-mono text-slate-500">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                aria-label="Go to next lab"
                className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Try free sandbox"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30"
              >
                Try Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── 3. FREE PLAY / SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-bold text-gold-300 mb-1">🎮 System Architect Sandbox</h2>
            <p className="text-xs text-slate-400 mb-4">
              Free play mode: Experiment with SQL commands, chart toggles, and Excel alignment tests with zero grading penalties!
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-white block">Interactive Alignment Check</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setMachineryIsText(prev => !prev)}
                    aria-label={`Toggle machinery text format: currently ${machineryIsText ? 'Text' : 'Number'}`}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded border border-slate-700 text-slate-200"
                  >
                    Toggle Machinery: {machineryIsText ? 'Text (\'600000)' : 'Number (600000)'}
                  </button>
                  <button
                    onClick={() => setCashIsText(prev => !prev)}
                    aria-label={`Toggle cash text format: currently ${cashIsText ? 'Text' : 'Number'}`}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded border border-slate-700 text-slate-200"
                  >
                    Toggle Cash: {cashIsText ? 'Text (\'150000)' : 'Number (150000)'}
                  </button>
                </div>
                <p className="text-xs font-mono text-emerald-400">
                  Calculated Trial Balance Total: ₹ {excelTotals.debitTotal.toLocaleString('en-IN')} / ₹ {excelTotals.creditTotal.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-white block">SQL Command Runner</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={sqlCommand}
                    onChange={e => setSqlCommand(e.target.value)}
                    aria-label="SQL command input in sandbox"
                    className="flex-1 px-3 py-1 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-white"
                  />
                  <button
                    onClick={handleExecuteSql}
                    aria-label="Run sandbox SQL command"
                    className="px-3 py-1 bg-gold-600 text-white rounded text-xs font-bold"
                  >
                    Run
                  </button>
                </div>
                <p className="text-xs font-mono text-slate-400">{terminalOutput}</p>
              </div>
            </div>

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Proceed to graded challenges"
                className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold shadow-xl shadow-emerald-600/30 flex items-center gap-2"
              >
                I'm Ready for Challenges! →
              </motion.button>
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── 4. CHALLENGE / ASSESSMENT PHASE ─── */}
      {phase === 'challenge' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Status Canvas & Difficulty Header */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <canvas ref={canvasRef} width={120} height={30} className="rounded" aria-hidden="true" />
              <div>
                <span className="text-xs text-slate-400 block">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-xs font-mono text-gold-400">
                  Competency: <span className="uppercase font-bold">{challenge.competencyLevel}</span>
                </span>
              </div>
            </div>

            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
                difficulty === 'foundation'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : difficulty === 'advanced'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  : 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
              }`}
            >
              Tier: {difficulty}
            </motion.span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={((currentChallenge + 1) / filteredChallenges.length) * 100} aria-valuemin={0} aria-valuemax={100}>
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Active Question Box */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 leading-relaxed">
              {challenge.question}
            </h3>

            {/* MCQ Type Question Rendering */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Select option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 border border-slate-700 hover:border-gold-500 text-slate-200'
                    }`}
                  >
                    <span className="mr-2">
                      {showExplanation ? (i === challenge.correctIndex ? '✓' : '✗') : '•'}
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag Label Question Rendering */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block w-full mb-1">Draggable Label Palette:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-lg text-xs font-bold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {challenge.dragItems.map(item => (
                    <div
                      key={item.targetId}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      aria-label={`Drop target slot ${item.targetId}`}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] transition-all ${
                        droppedLabels[item.targetId]
                          ? 'border-emerald-500 bg-emerald-950/30'
                          : 'border-slate-700 bg-slate-950/50 hover:border-gold-500'
                      }`}
                    >
                      <span className="text-xs text-slate-400 mb-1">Target Slot: {item.targetId.toUpperCase()}</span>
                      <span className="font-bold text-sm text-gold-300">
                        {droppedLabels[item.targetId] ? `✓ ${droppedLabels[item.targetId]}` : 'Drop Label Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  aria-label="Verify dragged labels"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs"
                >
                  Verify Labels
                </motion.button>
              </div>
            )}

            {/* Drag Sort Question Rendering */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-xs sm:text-sm text-slate-200 cursor-grab flex items-center gap-3 font-mono"
                    >
                      <span className="w-6 h-6 flex items-center justify-center bg-gold-900/60 text-gold-300 rounded-full text-xs font-bold">
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
                    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  aria-label="Check sequence order"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* Numeric Question Rendering */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 max-w-md">
                  <input
                    type="number"
                    step="0.1"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated number"
                    aria-label={`Enter numerical value in ${challenge.unit || 'units'}`}
                    className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm"
                  />
                  <span className="text-xs font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation}
                    aria-label="Submit calculated numerical answer"
                    className="px-5 py-2.5 bg-gold-600 text-white rounded-xl font-bold text-xs"
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Question Rendering */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-amber-400">💡 {challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add SQL part: ${part}`}
                      className="px-3 py-1.5 bg-gold-700/80 hover:bg-gold-600 text-white rounded-lg text-xs font-mono"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[80px]">
                  <div className="flex flex-wrap gap-2">
                    {constructParts.map((p, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-gold-900/60 border border-gold-600 rounded text-xs font-mono text-gold-200 flex items-center gap-1">
                        {p}
                        <button
                          onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                          aria-label={`Remove part ${p}`}
                          className="text-rose-400 hover:text-rose-200 ml-1 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500 font-mono">Click SQL fragments above to build query...</span>
                    )}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Check assembled SQL query"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs"
                >
                  Check SQL Query
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Explanation Box */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-gold-950/40 rounded-xl border border-gold-700/40 space-y-3">
                <span className="text-xs font-bold text-gold-300 uppercase tracking-wider block">
                  Step-by-Step Rationale:
                </span>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <span className="font-bold text-gold-400">{idx + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    aria-label="Show next explanation step"
                    className="px-4 py-2 bg-gold-800 hover:bg-gold-700 text-white rounded-lg text-xs font-bold mt-2"
                  >
                    Show Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Simulation' : 'Next Challenge'}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 mt-3 block"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Simulation →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ─── 5. COMPLETION, REFLECTION & SUMMARY PHASE ─── */}
      {phase === 'complete' && (
        <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-gold-950/80 to-slate-900 rounded-3xl border border-gold-700/50 text-center space-y-4 shadow-2xl">
            <span className="text-5xl" aria-hidden="true">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Systems Audit Simulation Complete!</h2>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 w-36">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-2xl font-black text-emerald-400">✓ {Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 w-36">
                <span className="text-xs text-slate-400 block">Mastery Level</span>
                <span className="text-lg font-bold text-gold-400 capitalize">{masteryLevel}</span>
              </div>
            </div>

            {/* Motivational Feedback */}
            <p className="text-sm font-semibold text-gold-200 max-w-xl mx-auto pt-2">
              {errors === 0
                ? '🌟 PERFECT SCORE! You possess complete mastery of Excel accounting pipelines and RDBMS SQL architectures!'
                : errors <= 3
                ? '👏 Outstanding performance! Review the misconception diagnostics below for complete board exam confidence.'
                : '💪 Solid effort! Revisit the interactive labs to reinforce text-formatting diagnostics and SQL syntax safety.'}
            </p>
          </div>

          {/* ─── MANDATORY REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">🤔</span>
              <h3 className="text-lg font-bold text-white">Post-Simulation Reflection</h3>
            </div>
            <p className="text-xs text-slate-400">
              Solidify your neural pathways by reflecting on your system accounting breakthroughs:
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label htmlFor="reflection-surprising" className="text-xs font-bold text-gold-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  id="reflection-surprising"
                  rows={2}
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g. How an apostrophe forces text alignment and causes =SUM() to silently output ₹0..."
                  aria-label="Reflection: What was the most surprising thing you learned?"
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 outline-none focus:border-gold-500 font-sans"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label htmlFor="reflection-explain" className="text-xs font-bold text-gold-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  id="reflection-explain"
                  rows={2}
                  value={reflectionAnswers.explain}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g. A database is like an ultra-strict librarian who refuses to file a voucher unless the ledger account already exists in the catalog..."
                  aria-label="Reflection: How would you explain this to a friend?"
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 outline-none focus:border-gold-500 font-sans"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label htmlFor="reflection-real-life" className="text-xs font-bold text-gold-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  id="reflection-real-life"
                  rows={2}
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g. During statutory CA audits to ensure read-only permissions, or when configuring ERP trial balance templates..."
                  aria-label="Reflection: Where in real life might you use this?"
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 outline-none focus:border-gold-500 font-sans"
                />
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800/40 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                Targeted Misconception Analysis
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-300 font-semibold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition SRS Interval Card */}
          <div className="p-5 bg-amber-950/40 rounded-2xl border border-amber-800/40 text-xs text-amber-200 flex items-center justify-between">
            <div>
              <span className="font-bold block text-sm mb-1">📅 Spaced Repetition Schedule (SM-2)</span>
              Based on your session accuracy, your next automated review is scheduled in{' '}
              <span className="font-bold underline text-white">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </span>
              .
            </div>
            <span className="text-2xl" aria-hidden="true">🧠</span>
          </div>

          {/* Real-World Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white">💼 {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-bold text-gold-400">{idx + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>
      )}

      {/* Dynamic Feedback Popups */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_AccountancyCreatingWorksheetsEnteringSim;
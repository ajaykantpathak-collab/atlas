'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ICSE Class 7 Computer Science) ────────────────────��─────
const NODE_C7_CS_011 = 'c7_cs_011'; // Computer ethics & unethical practices
const NODE_C7_CS_012 = 'c7_cs_012'; // Digital footprints & online safety
const NODE_C7_CS_013 = 'c7_cs_013'; // Excel 2016 interface
const NODE_C7_CS_014 = 'c7_cs_014'; // Excel data types & alignment
const NODE_C7_CS_015 = 'c7_cs_015'; // Excel calculations (SUM, AVERAGE, MAX, MIN)
const NODE_C7_CS_016 = 'c7_cs_016'; // Excel cell modifying & structure
const NODE_C7_CS_017 = 'c7_cs_017'; // Database intro (Table, Record, Field)
const NODE_C7_CS_018 = 'c7_cs_018'; // DBMS & MS Access interface
const NODE_C7_CS_019 = 'c7_cs_019'; // Access tables, primary keys & field types
const NODE_C7_CS_020 = 'c7_cs_020'; // Access queries & criteria

const ALL_NODE_IDS = [
  NODE_C7_CS_011,
  NODE_C7_CS_012,
  NODE_C7_CS_013,
  NODE_C7_CS_014,
  NODE_C7_CS_015,
  NODE_C7_CS_016,
  NODE_C7_CS_017,
  NODE_C7_CS_018,
  NODE_C7_CS_019,
  NODE_C7_CS_020,
];

// ─── NARRATIVE SCENARIO ────────────────────────────────────────────────
const SCENARIO = {
  title: 'CyberCity Data & Ethics Hub',
  intro: 'Welcome to the CyberCity Central Command! As lead junior analyst, you are managing school records, analyzing data in Excel spreadsheets, building relational Access databases, and defending our citizens against unethical digital practices like piracy, hacking, and careless footprint trails.',
  context: 'Master ethical principles, spreadsheet calculation engines, and structured database queries to secure CyberCity.',
};

// ─── DISCOVERY QUESTION ────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'Riya posts a photo from a party online and deletes it 10 minutes later. What happened to her digital footprint?',
  options: [
    'It disappeared completely from the internet forever.',
    'It left a permanent trail because data can be cached, screenshotted, or archived on servers.',
    'It only remains on her own phone gallery.',
    'Excel automatically deleted the record from the web server.',
  ],
  correctIndex: 1,
  hintAfter: 'Digital footprints persist across web servers, backups, and network logs even after you hit delete!',
};

// ─── CHALLENGE INTERFACE ───────────────────────────────────────────────
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

// ─── CHALLENGES ARRAY (24 Comprehensive Questions) ───────────────────────
const CHALLENGES: Challenge[] = [
  // Tier 1: Foundation (8 Challenges)
  {
    id: 'ch_cs_001',
    nodeId: NODE_C7_CS_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What constitutes Computer Ethics in modern digital computing?',
    options: [
      'Moral principles guiding responsible, legal, and respectful computer and internet use.',
      'A set of hardware specifications required to run Windows 10.',
      'Coding rules used exclusively for compiling Java programs.',
      'The speed of an internet connection in Megabits per second.',
    ],
    correctIndex: 0,
    explanation: 'Computer ethics are the moral principles guiding users to use technology responsibly, legally, and respectfully.',
    hints: [
      'Think about moral rules that govern online human behavior.',
      'It is like playground or traffic rules for technology.',
      'It guides legal and respectful computer and internet use.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_cs_002',
    nodeId: NODE_C7_CS_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In Excel 2016, which interface component displays the address of the currently active cell (e.g., C5)?',
    options: ['Formula Bar', 'Name Box', 'Worksheet Tab', 'Ribbon Group'],
    correctIndex: 1,
    explanation: 'The Name Box sits to the left of the Formula Bar and displays the active cell reference, such as C5 or A1.',
    hints: [
      'Look at the top-left box just above Column A.',
      'It names the active cell coordinate.',
      'It is called the Name Box.',
    ],
  },
  {
    id: 'ch_cs_003',
    nodeId: NODE_C7_CS_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When you type raw numbers (e.g., 450) or recognized dates into an Excel cell without manual formatting, how do they align by default?',
    options: ['Left-aligned', 'Center-aligned', 'Right-aligned', 'Justified'],
    correctIndex: 2,
    explanation: 'In Excel, numeric values and recognized dates align to the right by default, whereas text/labels align to the left.',
    hints: [
      'Think of numbers lined up in an account book.',
      'Text stays on the left; numbers shift to the opposite side.',
      'Numbers and dates align to the Right.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_cs_004',
    nodeId: NODE_C7_CS_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In database terminology, what does a single horizontal ROW representing one complete entity (like one student) represent?',
    options: ['A Field', 'A Record', 'A Primary Key', 'A Query'],
    correctIndex: 1,
    explanation: 'A row in a database table is called a Record (or Tuple), containing all data fields for one complete entry.',
    hints: [
      'Columns are fields, while rows are complete entries.',
      'One horizontal line with name, roll number, and marks is called...',
      'It is called a Record.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_cs_005',
    nodeId: NODE_C7_CS_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the default file extension for a database saved in Microsoft Access 2016?',
    options: ['.xlsx', '.docx', '.accdb', '.pptx'],
    correctIndex: 2,
    explanation: 'Microsoft Access 2007-2016 saves relational databases with the .accdb extension.',
    hints: [
      'Excel uses .xlsx, Word uses .docx.',
      'Access Database has ACC and DB in its letters.',
      'The file extension is .accdb.',
    ],
  },
  {
    id: 'ch_cs_006',
    nodeId: NODE_C7_CS_015,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In Excel, evaluate the formula =SUM(10, 20, 30, 40). What numerical value will appear in the cell?',
    correctAnswer: 100,
    tolerance: 0,
    unit: 'total',
    explanation: '=SUM adds all supplied arguments: 10 + 20 + 30 + 40 = 100.',
    hints: [
      'SUM calculates the arithmetic total of all items.',
      'Add 10 + 20 + 30 + 40.',
      'The exact sum is 100.',
    ],
  },
  {
    id: 'ch_cs_007',
    nodeId: NODE_C7_CS_019,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which Access field property ensures that NO two records can have the exact same identification value?',
    options: ['Foreign Key', 'Primary Key', 'AutoFormat', 'Criteria Row'],
    correctIndex: 1,
    explanation: 'A Primary Key uniquely identifies each record in a database table, preventing duplicate identification.',
    hints: [
      'Think of a unique student Admission Number or Roll Number.',
      'It is represented by a small key symbol in Design View.',
      'It is the Primary Key.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_cs_008',
    nodeId: NODE_C7_CS_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following is an example of an ACTIVE digital footprint?',
    options: [
      'A web server logging your IP address silently while you browse news.',
      'Writing a public comment or sharing a photo on a school social forum.',
      'A cookie storing your screen resolution in the background.',
      'An automated analytics tracker counting website page visits.',
    ],
    correctIndex: 1,
    explanation: 'An active digital footprint is created when a user deliberately and intentionally shares data, such as posting comments or uploading photos.',
    hints: [
      'Active means intentional user action, not passive background logging.',
      'Which option involves you willingly typing or posting?',
      'Posting a comment or picture is an active footprint.',
    ],
  },

  // Tier 2: Standard (8 Challenges)
  {
    id: 'ch_cs_009',
    nodeId: NODE_C7_CS_011,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How is Ethical Hacking distinctly different from Unauthorised Hacking?',
    options: [
      'Ethical hackers use Windows, while malicious hackers only use Linux.',
      'Ethical hacking is performed with explicit written permission from system owners to locate and patch vulnerabilities.',
      'Ethical hacking is always done without passwords.',
      'There is no difference; all hacking is completely illegal under Indian IT Act.',
    ],
    correctIndex: 1,
    explanation: 'Permission and authorization are the key dividing lines. Ethical hackers have written consent to test and fortify defenses.',
    hints: [
      'Think about consent and the security guard analogy.',
      'A security guard checks locks with permission from the owner.',
      'Ethical hacking requires explicit written permission.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_cs_012_b',
    nodeId: NODE_C7_CS_012,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Arrange the sequence of actions for handling an unsolicited email asking for bank login details in the correct security order.',
    sortItems: [
      'Receive suspicious email with an urgent warning link',
      'Pause and check the sender address without clicking any link',
      'Report the phishing attempt to teacher/parent/cyber cell',
      'Delete or block the fraudulent sender permanently',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Proper cyber hygiene requires spotting red flags, avoiding clicking unknown links, reporting the threat, and deleting/blocking.',
    hints: [
      'First you receive the communication.',
      'Never click first; verify sender and pause.',
      'Report it, then permanently delete/block.',
    ],
  },
  {
    id: 'ch_cs_014_b',
    nodeId: NODE_C7_CS_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A clerk types \'044 into cell A1 for Chennai telephone STD code. What does the leading apostrophe (\') do in Excel?',
    options: [
      'It causes a syntax formula error.',
      'It forces Excel to store the digits as TEXT, keeping the leading zero and aligning it left.',
      'It divides the number by 100.',
      'It converts the cell into an Access query.',
    ],
    correctIndex: 1,
    explanation: 'A leading apostrophe tells Excel to treat the subsequent characters strictly as text, preserving leading zeros without displaying the apostrophe.',
    hints: [
      'Normally Excel drops leading zeros on numbers (e.g., 044 becomes 44).',
      'The apostrophe preserves the zero for codes, roll numbers, or pin codes.',
      'It forces text data type storage and left alignment.',
    ],
  },
  {
    id: 'ch_cs_015_b',
    nodeId: NODE_C7_CS_015,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Cells B1:B4 contain marks: 80, 90, 70, 100. What is the value of =AVERAGE(B1:B4)?',
    correctAnswer: 85,
    tolerance: 0,
    unit: 'marks',
    explanation: '(80 + 90 + 70 + 100) / 4 = 340 / 4 = 85.',
    hints: [
      'Find the total sum first: 80 + 90 + 70 + 100 = 340.',
      'Divide the sum by the count of cells (4).',
      '340 / 4 = 85.',
    ],
  },
  {
    id: 'ch_cs_016_b',
    nodeId: NODE_C7_CS_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the structural difference between pressing the DELETE key on a cell versus right-clicking and selecting \'Delete... -> Shift cells up\'?',
    options: [
      'They do the exact same operation.',
      'Pressing Delete only clears cell contents (empty cell remains); deleting cell removes the cell coordinate itself, shifting adjacent cells.',
      'Pressing Delete deletes the whole hard disk file.',
      'Shift cells up is only available in MS Word.',
    ],
    correctIndex: 1,
    explanation: 'Pressing the Delete key clears values but preserves the grid structure. Deleting a cell/row physically extracts the row/cell and collapses the table.',
    hints: [
      'Think about clearing the blackboard vs removing a brick from a wall.',
      'Clearing content leaves the cell in place.',
      'Deleting removes the cell structure and shifts neighbours.',
    ],
  },
  {
    id: 'ch_cs_017_b',
    nodeId: NODE_C7_CS_017,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Drag the database terms to their matching conceptual components.',
    dragItems: [
      { label: 'Table', targetId: 'target_table' },
      { label: 'Record', targetId: 'target_record' },
      { label: 'Field', targetId: 'target_field' },
    ],
    correctMapping: {
      target_table: 'Table',
      target_record: 'Record',
      target_field: 'Field',
    },
    explanation: 'A Table is the entire matrix/drawer, a Record is one complete row/file card, and a Field is one column/labelled attribute.',
    hints: [
      'Table is the entire grid container.',
      'Record is the horizontal row representing one student/book.',
      'Field is the vertical column holding one specific attribute.',
    ],
  },
  {
    id: 'ch_cs_019_b',
    nodeId: NODE_C7_CS_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In designing an Access table for a Bengaluru school library, which field is the best candidate for the PRIMARY KEY?',
    options: ['StudentName', 'BookTitle', 'AccessionNumber', 'IssueDate'],
    correctIndex: 2,
    explanation: 'AccessionNumber is guaranteed to be unique for every single physical book copy, unlike names or titles which can duplicate.',
    hints: [
      'Two students can have the name Rahul Sharma.',
      'Two books can have the title "Discovery of India".',
      'The Accession Number is unique to every book copy in a library.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_cs_020_b',
    nodeId: NODE_C7_CS_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In an MS Access query design grid, what will typing >75 under the Number field [Marks] and "Kolkata" under the Text field [City] in the SAME Criteria row do?',
    options: [
      'Show students who scored >75 OR students who live in Kolkata.',
      'Show only students who scored >75 AND also live in Kolkata.',
      'Delete all students from Kolkata.',
      'Calculate the average marks of Kolkata students.',
    ],
    correctIndex: 1,
    explanation: 'Conditions placed on the SAME Criteria row act as a logical AND operation (both conditions must be satisfied).',
    hints: [
      'Criteria on the same horizontal row use the AND operator.',
      'The "or" row below is used for OR conditions.',
      'Both conditions (>75 AND City="Kolkata") must be met.',
    ],
  },

  // Tier 3: Advanced (8 Challenges - NEP 2020 Competency heavy)
  {
    id: 'ch_cs_011_c',
    nodeId: NODE_C7_CS_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Student A copies a paragraph from Wikipedia, rephrases two words, and submits it in an ICSE project without citation. Student B says: "It is not plagiarism because words were changed." Evaluate Student B\'s claim.',
    options: [
      'Student B is correct; plagiarism only applies to verbatim text.',
      'Student B is incorrect; plagiarism includes stealing ideas, code, images, or structure without giving proper citation/credit.',
      'Student B is correct because Wikipedia is public domain.',
      'Student B is correct as long as the font size is changed.',
    ],
    correctIndex: 1,
    explanation: 'Plagiarism is claiming someone else\'s intellectual creation, thoughts, or research as your own without credit, even if paraphrased.',
    hints: [
      'Does changing two words give proper credit to the original author?',
      'Plagiarism is taking credit for work you didn\'t originate.',
      'Uncredited idea theft is plagiarism regardless of superficial paraphrasing.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_cs_012_c',
    nodeId: NODE_C7_CS_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does browsing in "Incognito" or "Private Window" mode NOT erase your digital footprint on the internet?',
    options: [
      'Incognito mode is purely decorative and does nothing.',
      'It only stops local history/cookies on your device; web servers, school routers, and ISPs still log requests and traffic.',
      'It automatically uploads all passwords to social media.',
      'It turns off your Wi-Fi card completely.',
    ],
    correctIndex: 1,
    explanation: 'Private browsing prevents local browser history storage on the device, but remote servers, network routers, and ISPs still log full traffic.',
    hints: [
      'Distinguish local device storage from network logs.',
      'Who routes the data packets from your computer to the web?',
      'ISPs, school networks, and target web servers maintain log files.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_cs_013_c',
    nodeId: NODE_C7_CS_013,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Cell D10 displays 240, but when clicked, the Formula Bar shows =SUM(D2:D9). What does this difference illustrate?',
    options: [
      'An Excel error where the cell is corrupt.',
      'The cell displays the evaluated calculated result, while the Formula Bar displays the underlying formula instruction.',
      'The Formula Bar shows the worksheet title.',
      'The cell is locked with a primary key.',
    ],
    correctIndex: 1,
    explanation: 'Excel displays calculated output in the grid cell, while the Formula Bar reveals the true underlying formula instruction for inspection/editing.',
    hints: [
      'The cell shows the number result (240).',
      'The Formula Bar exposes what created that number.',
      'Formula Bar displays formula logic; the cell shows the computed result.',
    ],
  },
  {
    id: 'ch_cs_015_c',
    nodeId: NODE_C7_CS_015,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Construct the correct Excel formula to calculate the total fee across two worksheets: cell B2 in "Term1" and cell B2 in "Term2".',
    availableParts: ['=SUM(', 'Term1!B2', ',', 'Term2!B2', ')', '+', 'AVERAGE('],
    targetState: '=SUM( Term1!B2 , Term2!B2 )',
    validationHint: 'Build: =SUM( Term1!B2 , Term2!B2 )',
    explanation: 'Cross-worksheet references in Excel require the sheet name followed by an exclamation mark: =SUM(Term1!B2, Term2!B2).',
    hints: [
      'Start with =SUM(',
      'Add the first sheet reference with an exclamation point: Term1!B2',
      'Separate with a comma, add Term2!B2, and close bracket.',
    ],
  },
  {
    id: 'ch_cs_016_c',
    nodeId: NODE_C7_CS_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A marksheet has formula =SUM(B2:B10) in cell B11. If you INSERT a new blank row at Row 5 and enter 95 marks, what happens to the formula in the updated cell B12?',
    options: [
      'The formula stays =SUM(B2:B10) and misses the new student.',
      'Excel automatically expands the reference range to =SUM(B2:B11), incorporating the inserted row into the total.',
      'The formula gives a #REF! syntax crash error.',
      'All previous marks are converted into text labels.',
    ],
    correctIndex: 1,
    explanation: 'When a new row is inserted inside an existing contiguous range, Excel dynamically expands the range bounds to maintain formula integrity.',
    hints: [
      'Row 5 is inside the original span from row 2 to 10.',
      'Excel adjusts internal cell coordinates when rows shift down.',
      'The formula automatically expands to =SUM(B2:B11).',
    ],
  },
  {
    id: 'ch_cs_018_c',
    nodeId: NODE_C7_CS_018,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is a Relational Database Management System (like Access) superior to a flat Excel spreadsheet for managing 10,000 students across 50 subjects and fees?',
    options: [
      'Access runs faster graphics for gaming.',
      'RDBMS separates data into linked tables, eliminating data redundancy, preventing update anomalies, and enforcing referential integrity.',
      'Spreadsheets cannot store any numbers over 1,000.',
      'Access does not need a computer operating system.',
    ],
    correctIndex: 1,
    explanation: 'RDBMS avoids data duplication across multiple records through normalization, relationships, and integrity rules, preventing errors.',
    hints: [
      'In Excel, repeating a student name 50 times for 50 exams leads to typos and wasted space.',
      'Access stores the student ONCE in a Students table and links to an Exam table.',
      'It eliminates redundancy and maintains data consistency.',
    ],
  },
  {
    id: 'ch_cs_019_c',
    nodeId: NODE_C7_CS_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Which of the following field names VIOLATES MS Access naming conventions and will trigger an error in Design View?',
    options: ['Student_RollNo', 'Fee.Amount', 'DateOfBirth', 'ParentMobile'],
    correctIndex: 1,
    explanation: 'In MS Access field naming rules, periods (.), exclamation marks (!), accent graves (`), and square brackets ([ ]) are strictly forbidden.',
    hints: [
      'Check the special forbidden punctuation in Access.',
      'Periods (dots) are used to separate Table.Field in SQL and cannot be in field names.',
      'Fee.Amount contains an illegal period (dot).',
    ],
  },
  {
    id: 'ch_cs_020_c',
    nodeId: NODE_C7_CS_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A librarian runs a query to find all Science books costing under Rs. 300. After modifying a book price from Rs. 350 to Rs. 220 in the main table, what happens to the query when run again?',
    options: [
      'The query must be deleted and rewritten from scratch.',
      'The query dynamically queries the live table and will now include this newly discounted book in its result view.',
      'The query produces an error because queries are static snapshots.',
      'The book is automatically deleted from the library.',
    ],
    correctIndex: 1,
    explanation: 'An Access query is a saved question (dynamic view), not a static copy. It re-evaluates live table data whenever executed.',
    hints: [
      'Is a query a static copied table or a dynamic lens onto live data?',
      'When table data updates, subsequent query executions see the fresh values.',
      'It dynamically displays the newly matching record.',
    ],
    misconceptionIndex: 1,
  },
];

// ─── DEFAULT PROPS ──────────���─────────────────────────────────────────
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
  nodeId: NODE_C7_CS_011,
  title: 'Computer Ethics, Excel Worksheets & Access Databases',
  definition:
    'Comprehensive Class 7 Computer Science module covering computer ethics, digital footprints, Excel interface and calculations (SUM, AVERAGE, MAX, MIN), and MS Access database design, tables, primary keys, and dynamic queries.',
  eli5:
    'Learn how to be safe and honest online, crunch numbers and formulas in spreadsheets like a pro, and organize huge libraries of data with databases and queries!',
  misconceptions: [
    {
      misconception: 'Plagiarism is just copying exact words.',
      correction: 'Plagiarism includes taking anyone\'s ideas, code, illustrations, or concepts without explicit citation.',
    },
    {
      misconception: 'Private or Incognito browsing erases your digital footprint completely.',
      correction: 'Incognito only stops local browser history; routers, ISPs, and destination web servers still log your activity.',
    },
    {
      misconception: 'Alignment in Excel is just for visual decoration.',
      correction: 'Default alignment is a vital diagnostic: text aligns LEFT, while numbers and recognized dates align RIGHT.',
    },
    {
      misconception: 'A database is identical to an Excel spreadsheet.',
      correction: 'A spreadsheet is a flat calculation grid, while an RDBMS links distinct tables to eliminate redundancy and maintain integrity.',
    },
    {
      misconception: 'Any field like Name or Class can be a Primary Key.',
      correction: 'A Primary Key MUST be strictly unique for every record (like Admission No. or Accession No.) with zero duplicates.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is computer ethics?', options: ['Rules for responsible computer use', 'Computer screen settings', 'Keyboard layout', 'Internet speed test'], correctIndex: 0 },
    { question: 'Which data type in Excel aligns to the left by default?', options: ['Text', 'Numbers', 'Dates', 'Currency'], correctIndex: 0 },
    { question: 'What character MUST start every Excel calculation formula?', options: ['=', '@', '#', '$'], correctIndex: 0 },
    { question: 'Which Access key uniquely identifies each record in a table?', options: ['Primary Key', 'Foreign Key', 'Space Bar', 'Enter Key'], correctIndex: 0 },
    { question: 'What does =MAX(10, 45, 92, 33) return in Excel?', options: ['92', '10', '45', '180'], correctIndex: 0 },
    { question: 'What is a persistent trail of online activity called?', options: ['Digital Footprint', 'Browser Speed', 'Pixel Count', 'RAM Cache'], correctIndex: 0 },
    { question: 'In Access, which row in Query Design specifies criteria filters?', options: ['Criteria row', 'Sort row', 'Show box', 'Table row'], correctIndex: 0 },
    { question: 'What does deleting a row in Excel do to lower rows?', options: ['Shifts them upward', 'Shifts them downward', 'Deletes all columns', 'Turns them red'], correctIndex: 0 },
  ],
  masteryCriteria:
    'Demonstrate proficiency in ethical computing, digital footprint protection, Excel formula writing, cell manipulation, and MS Access database table/query configuration.',
};

// ─── EXPLORATION STEPS (Interactive Learning Labs) ─────────────────────
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Ethics & Digital Footprint Radar',
    instruction: 'Adjust the Privacy Level and Posting Caution to see how your digital footprint risk changes.',
    interactionType: 'ethics-radar',
    nodeId: NODE_C7_CS_011,
  },
  {
    title: 'Lab 2: Excel Live Spreadsheet Simulator',
    instruction: 'Type entries into cells and observe how Excel diagnoses data types with automatic left/right alignment.',
    interactionType: 'excel-align',
    nodeId: NODE_C7_CS_014,
  },
  {
    title: 'Lab 3: Excel Formula Engine (SUM, AVG, MAX, MIN)',
    instruction: 'Modify the student marks sliders and observe real-time formula recalculations.',
    interactionType: 'excel-calc',
    nodeId: NODE_C7_CS_015,
  },
  {
    title: 'Lab 4: Access Database Table & Primary Key Studio',
    instruction: 'Inspect the Library database structure, primary keys, and data types in Design View vs Datasheet View.',
    interactionType: 'access-table',
    nodeId: NODE_C7_CS_019,
  },
  {
    title: 'Lab 5: Access Dynamic Query Filter Machine',
    instruction: 'Change the Marks Criteria (>60, >75, >85) and City to watch the query filter live records dynamically.',
    interactionType: 'access-query',
    nodeId: NODE_C7_CS_020,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you change a student\'s mark in cell B2 from 70 to 100, what will happen to =MAX(B2:B5) which currently equals 90?',
    options: [
      'It will remain 90 until manually re-typed.',
      'It will instantly recalculate and display 100.',
      'It will display an error message.',
      'It will calculate the average instead.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Mark slider for Student 1 past 90 and observe the MAX display update in real-time!',
    nodeId: NODE_C7_CS_015,
  },
  {
    question: 'Predict: If you set the Access Query criterion for Marks to >80 AND City to "Kolkata", how many records will display if only 1 student meets BOTH conditions?',
    options: ['Exactly 1 record', 'All students from Kolkata', 'All students with marks >80', 'Zero records'],
    correctIndex: 0,
    verifyInstruction: 'Select >80 and "Kolkata" in the Query simulator to verify the dynamic filtered output!',
    nodeId: NODE_C7_CS_020,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the cell alignment when entering a date like 15/08/2024 versus a name like "Arjun"?',
    observableOptions: [
      'Both align to the center.',
      'Date aligns to the RIGHT (stored numerically), while the text name aligns to the LEFT.',
      'Date aligns to the left and text aligns to the right.',
      'Neither has any alignment.',
    ],
    correctIndex: 1,
    nodeId: NODE_C7_CS_014,
  },
  {
    question: 'What do you notice about the Risk Meter when Privacy Settings are set to "Strict" and Caution is "High"?',
    observableOptions: [
      'Risk increases to 100%.',
      'Risk drops to minimal (green zone) because exposure and leakage vectors are blocked.',
      'There is no change in risk.',
      'The computer locks up.',
    ],
    correctIndex: 1,
    nodeId: NODE_C7_CS_012,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'CyberCity Chief Information Officer Project',
  description:
    'Design a complete School Database and Spreadsheet audit for your school. List 3 ethical rules for the lab, build a 4-field Access Table (StudentID, Name, Class, FeeStatus) with a Primary Key, and write 2 Excel formulas for attendance and term averages.',
  steps: [
    'Draft 3 Digital Citizenship rules for student computer use.',
    'Identify the Primary Key for student registration.',
    'Write an Excel =AVERAGE formula for term marks across 5 subjects.',
    'Construct an Access query criterion to filter students with FeeStatus = "Pending".',
  ],
};

// ─── MAIN COMPONENT ───���────────────────────────────────────────────────
function C7_ComputerScienceComputerEthicsUnethicalSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C7_CS_011,
  title = DEFAULT_PROPS.title || 'Computer Ethics & Spreadsheet/Database Sim',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['compsci'] || {
    name: 'Computer Science',
    emoji: '💻',
    color: 'indigo',
  };

  // State: Phases & Navigation
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // State: Interactive Simulation Values
  // Lab 1: Ethics & Footprint
  const [privacySetting, setPrivacySetting] = useState<'public' | 'friends' | 'strict'>('friends');
  const [postingCaution, setPostingCaution] = useState<number>(50); // 0 to 100
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('medium');

  // Lab 2: Excel Live Grid
  const [gridData, setGridData] = useState<{ id: string; label: string; raw: string; type: 'text' | 'number' | 'date'; align: 'left' | 'right' }[]>([
    { id: 'A1', label: 'Item Name', raw: 'Computer Science', type: 'text', align: 'left' },
    { id: 'B1', label: 'Price (INR)', raw: '450', type: 'number', align: 'right' },
    { id: 'C1', label: 'Admission Date', raw: '15/08/2024', type: 'date', align: 'right' },
    { id: 'A2', label: 'Student Roll', raw: "'007", type: 'text', align: 'left' },
  ]);
  const [activeCellAddress, setActiveCellAddress] = useState<string>('A1');
  const [formulaBarInput, setFormulaBarInput] = useState<string>('Computer Science');

  // Lab 3: Excel Calculations
  const [markS1, setMarkS1] = useState<number>(78);
  const [markS2, setMarkS2] = useState<number>(85);
  const [markS3, setMarkS3] = useState<number>(92);
  const [markS4, setMarkS4] = useState<number>(65);
  const [selectedFunction, setSelectedFunction] = useState<'SUM' | 'AVERAGE' | 'MAX' | 'MIN'>('SUM');

  // Lab 4: Access Table Studio
  const [tableMode, setTableMode] = useState<'datasheet' | 'design'>('datasheet');
  const [selectedAccessField, setSelectedAccessField] = useState<string>('BookID');
  const [hasPrimaryKey, setHasPrimaryKey] = useState<boolean>(true);

  // Lab 5: Access Query Filter
  const [queryMinMarks, setQueryMinMarks] = useState<number>(70);
  const [queryCity, setQueryCity] = useState<string>('All');

  // Reflection State
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    friendExplain: '',
    realLife: '',
  });

  // Brilliant.org Pedagogical State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Challenge Engine State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [errors, setErrors] = useState(0);

  // Hints & Visual Feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop & Construct State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback FX
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Persistence Refs & Canvas Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTERING ───────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── DERIVED METRICS FOR SIMULATIONS ─────────────────────────────────
  const footprintRisk = useMemo(() => {
    let base = 100 - postingCaution;
    if (privacySetting === 'public') base += 25;
    else if (privacySetting === 'strict') base -= 25;
    if (passwordStrength === 'weak') base += 20;
    else if (passwordStrength === 'strong') base -= 15;
    return Math.max(5, Math.min(95, base));
  }, [postingCaution, privacySetting, passwordStrength]);

  const calculatedExcelValue = useMemo(() => {
    const marks = [markS1, markS2, markS3, markS4];
    switch (selectedFunction) {
      case 'SUM':
        return marks.reduce((a, b) => a + b, 0);
      case 'AVERAGE':
        return (marks.reduce((a, b) => a + b, 0) / marks.length).toFixed(1);
      case 'MAX':
        return Math.max(...marks);
      case 'MIN':
        return Math.min(...marks);
    }
  }, [markS1, markS2, markS3, markS4, selectedFunction]);

  const rawAccessRecords = useMemo(
    () => [
      { id: 101, title: 'Discovery of India', author: 'J. Nehru', price: 290, marks: 95, city: 'Delhi' },
      { id: 102, title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', price: 180, marks: 88, city: 'Chennai' },
      { id: 103, title: 'Malgudi Days', author: 'R.K. Narayan', price: 210, marks: 74, city: 'Bengaluru' },
      { id: 104, title: 'Gitanjali', author: 'R. Tagore', price: 150, marks: 91, city: 'Kolkata' },
      { id: 105, title: 'Computer Applications', author: 'S. Sharma', price: 340, marks: 62, city: 'Mumbai' },
    ],
    []
  );

  const filteredAccessRecords = useMemo(() => {
    return rawAccessRecords.filter((rec) => {
      const matchMarks = rec.marks >= queryMinMarks;
      const matchCity = queryCity === 'All' || rec.city.toLowerCase() === queryCity.toLowerCase();
      return matchMarks && matchCity;
    });
  }, [rawAccessRecords, queryMinMarks, queryCity]);

  // Motivational message derived from error count
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors >= 1 && errors <= 3) return 'Great work!';
    if (errors >= 4 && errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // ─── INITIAL LOAD FROM MASTERY STORE ─────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT UPDATE EFFECT ───────────────────────────────────────────────
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newTier =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newTier) {
        setCurrentChallenge(0);
        return newTier;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS ANIMATION (Network Packets & Security Pulses) ──────────
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

      // Draw background grid lines
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw active packet pulse
      const t = (frame % 180) / 180;
      const packetX = t * canvas.width;
      const packetY = 25 + Math.sin(frame * 0.08) * 12;

      ctx.beginPath();
      ctx.arc(packetX, packetY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Node Hubs
      const hubs = [40, canvas.width / 2, canvas.width - 40];
      hubs.forEach((hx, i) => {
        ctx.beginPath();
        ctx.arc(hx, 25, 7, 0, Math.PI * 2);
        ctx.fillStyle = i === 1 ? '#6366f1' : '#38bdf8';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── USECALLBACK HANDLERS ────────────────────────────────────────────
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on! Digital trails are persistent across internet servers.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive labs. Explore each tool by manipulating the live controls.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode unlocked! Try modifying any parameters with zero grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us test your mastery with adaptive challenges!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test it live with the sliders.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent observation skills!' : 'Inspect the alignment carefully in the simulation grid.');
  }, []);

  const handleCellClick = useCallback((addr: string, raw: string) => {
    setActiveCellAddress(addr);
    setFormulaBarInput(raw);
    audioManager.play('tap');
  }, []);

  const handleCellInputChange = useCallback((newRaw: string) => {
    setFormulaBarInput(newRaw);
    setGridData((prev) =>
      prev.map((cell) => {
        if (cell.id === activeCellAddress) {
          const isNum = !isNaN(Number(newRaw)) && newRaw.trim() !== '' && !newRaw.startsWith("'");
          const isDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(newRaw);
          let type: 'text' | 'number' | 'date' = 'text';
          let align: 'left' | 'right' = 'left';
          if (isNum) {
            type = 'number';
            align = 'right';
          } else if (isDate) {
            type = 'date';
            align = 'right';
          }
          return { ...cell, raw: newRaw, type, align };
        }
        return cell;
      })
    );
    audioManager.play('count');
  }, [activeCellAddress]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Fantastic work! You have mastered Computer Ethics, Excel calculations, and Access databases!');
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
      setCurrentChallenge((prev) => prev + 1);
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
    (ans: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = ans === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numAns = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
        isCorrect = Math.abs(numAns - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (ans as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Well done.');
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
          speechManager.speak('Let us review the step-by-step logic.');
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
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isMatch) {
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
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        if (prev.length === 0 && challenge.sortItems) {
          prev = challenge.sortItems.map((_, i) => i);
        }
        const arr = [...prev];
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(finalOrder);
  }, [sortArrangement, challenge, handleAnswer]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans selection:bg-gold-500 selection:text-white">
      {/* ─── HEADER / NAV ─── */}
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gold-400 via-gold-300 to-emerald-400 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400 font-medium">ICSE Class 7 Computer Science • Interactive Simulation Lab</p>
          </div>
        </div>

        {/* Phase Badges & Difficulty */}
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-slate-300 capitalize font-mono">
            Phase: <strong className="text-gold-400">{phase}</strong>
          </span>
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`text-xs px-3 py-1 font-bold rounded-full uppercase tracking-wider ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                  : difficulty === 'standard'
                  ? 'bg-gold-950 text-gold-400 border border-gold-700'
                  : 'bg-rose-950 text-rose-400 border border-rose-700'
              }`}
            >
              {difficulty}
            </motion.span>
          )}
        </div>
      </header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-gold-950/70 to-slate-900 rounded-2xl border border-gold-800/80 shadow-lg">
            <h2 className="text-lg font-bold text-gold-300 flex items-center gap-2">
              <span>🚀</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-400 mt-2 font-mono">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-md uppercase">
                Curiosity Discovery Hook
              </span>
              <p className="text-xs text-slate-400">Think carefully before answering!</p>
            </div>
            <p className="text-base sm:text-lg font-semibold text-white">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className="w-full text-left p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-sm font-medium transition-all"
                >
                  <span className="font-bold text-gold-400 mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-3">
                <p className={`text-sm font-semibold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Digital footprints remain stored across networks and archives.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl shadow-lg transition-colors text-sm"
                >
                  Enter Interactive Discovery Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: EXPLORE (Guided Interactive Labs) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Lab Slide Header & Instructions */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 bg-gold-600/30 text-gold-300 font-bold rounded">
                  Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <span className="text-xs text-slate-400 font-mono">[{EXPLORATION_STEPS[currentSlide].nodeId}]</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                {EXPLORATION_STEPS[currentSlide].title}
              </h2>
              <p className="text-xs sm:text-sm text-amber-300 mt-1">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </p>
            </div>
            {/* Live Canvas Wave */}
            <canvas ref={canvasRef} width={260} height={40} className="rounded-lg bg-slate-950 border border-slate-800" />
          </div>

          {/* Interactive Simulation Display Area */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 min-h-[380px]">
            <AnimatePresence mode="wait">
              {/* Lab 1: Ethics & Digital Footprint Simulator */}
              {currentSlide === 0 && (
                <motion.div key="lab0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Controls */}
                    <div className="space-y-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <h3 className="text-sm font-bold text-gold-400 uppercase tracking-wide">1. Privacy Settings (Curtains on Window)</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {(['public', 'friends', 'strict'] as const).map((setting) => (
                          <motion.button
                            key={setting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setPrivacySetting(setting);
                              audioManager.play('tap');
                            }}
                            className={`p-2.5 rounded-lg text-xs font-bold capitalize transition-all border ${
                              privacySetting === setting
                                ? 'bg-gold-600 text-white border-gold-400'
                                : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                            }`}
                          >
                            {setting}
                          </motion.button>
                        ))}
                      </div>

                      <div className="pt-2">
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Think Before Posting (Caution Index):</span>
                          <span className="font-bold text-gold-400">{postingCaution}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={postingCaution}
                          onChange={(e) => {
                            setPostingCaution(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          aria-label="Set Posting Caution Level"
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-gold-400 uppercase tracking-wide mb-1">Password Strength</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {(['weak', 'medium', 'strong'] as const).map((lvl) => (
                            <motion.button
                              key={lvl}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                setPasswordStrength(lvl);
                                audioManager.play('tap');
                              }}
                              className={`p-2 rounded-lg text-xs font-bold capitalize border ${
                                passwordStrength === lvl
                                  ? 'bg-emerald-600 text-white border-emerald-400'
                                  : 'bg-slate-800 text-slate-400 border-slate-700'
                              }`}
                            >
                              {lvl}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Visual Radar & Leak Meter */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-300">Permanent Trail Exposure Meter</span>
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          footprintRisk < 35 ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' :
                          footprintRisk < 65 ? 'bg-amber-950 text-amber-400 border border-amber-700' :
                          'bg-rose-950 text-rose-400 border border-rose-700'
                        }`}>
                          Risk: {footprintRisk}%
                        </span>
                      </div>

                      {/* Animated Gauge */}
                      <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                        <motion.div
                          className="h-full rounded-full transition-all"
                          animate={{ width: `${footprintRisk}%` }}
                          style={{
                            backgroundColor:
                              footprintRisk < 35 ? '#10b981' : footprintRisk < 65 ? '#f59e0b' : '#ef4444',
                          }}
                        />
                      </div>

                      {/* SVG DIAGRAM 1: Digital Footprint & Data Trails */}
                      <svg viewBox="0 0 300 160" className="w-full mt-3 bg-slate-900 rounded-lg p-2 border border-slate-800">
                        <defs>
                          <radialGradient id="footprintGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                        <rect x="0" y="0" width="300" height="160" fill="url(#footprintGlow)" rx="6" />
                        <line x1="20" y1="130" x2="280" y2="130" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                        <g opacity={footprintRisk / 100}>
                          <ellipse cx="75" cy="115" rx="14" ry="7" fill="#ef4444" transform="rotate(-15 75 115)" />
                          <circle cx="67" cy="103" r="3" fill="#ef4444" />
                          <circle cx="74" cy="102" r="3" fill="#ef4444" />
                          <circle cx="81" cy="103" r="3" fill="#ef4444" />
                          <text x="75" y="145" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Cached Post</text>
                        </g>
                        <g opacity={footprintRisk / 100}>
                          <ellipse cx="150" cy="105" rx="14" ry="7" fill="#f59e0b" transform="rotate(10 150 105)" />
                          <circle cx="142" cy="93" r="3" fill="#f59e0b" />
                          <circle cx="149" cy="92" r="3" fill="#f59e0b" />
                          <circle cx="156" cy="93" r="3" fill="#f59e0b" />
                          <text x="150" y="145" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">ISP Log Trail</text>
                        </g>
                        <g opacity={footprintRisk / 100}>
                          <ellipse cx="225" cy="95" rx="14" ry="7" fill="#818cf8" transform="rotate(-10 225 95)" />
                          <circle cx="217" cy="83" r="3" fill="#818cf8" />
                          <circle cx="224" cy="82" r="3" fill="#818cf8" />
                          <circle cx="231" cy="83" r="3" fill="#818cf8" />
                          <text x="225" y="145" textAnchor="middle" fill="#a5b4fc" fontSize="9" fontWeight="bold">Tracker Cookie</text>
                        </g>
                        <text x="150" y="24" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
                          {privacySetting === 'strict' ? '🔒 Privacy Shield Active (Protected)' : '🌐 Public Data Trail Exposed'}
                        </text>
                        <circle cx="150" cy="50" r="14" fill="#1e293b" stroke={footprintRisk > 60 ? '#ef4444' : '#10b981'} strokeWidth="2" />
                        <text x="150" y="54" textAnchor="middle" fill="#ffffff" fontSize="11">{footprintRisk > 60 ? '⚠️' : '🛡️'}</text>
                      </svg>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Lab 2: Excel Live Spreadsheet Grid */}
              {currentSlide === 1 && (
                <motion.div key="lab1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  {/* Excel Formula Bar & Name Box */}
                  <div className="flex items-center gap-2 p-2 bg-slate-950 rounded-xl border border-slate-700">
                    <div className="px-3 py-1 bg-slate-800 text-gold-400 font-mono font-bold text-xs rounded border border-slate-600">
                      {activeCellAddress}
                    </div>
                    <div className="text-slate-500 font-serif font-bold text-sm">fx</div>
                    <input
                      type="text"
                      value={formulaBarInput}
                      onChange={(e) => handleCellInputChange(e.target.value)}
                      placeholder="Type number, text, or date (e.g. '0123 or 15/08/2024)..."
                      aria-label="Excel Formula Bar Entry"
                      className="w-full bg-slate-900 border border-slate-700 text-white text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-gold-500 font-mono"
                    />
                  </div>

                  {/* Grid Table */}
                  <div className="overflow-x-auto border border-slate-700 rounded-xl bg-slate-950">
                    <table className="w-full text-xs font-mono">
                      <thead>
                        <tr className="bg-slate-800/80 text-slate-300 border-b border-slate-700">
                          <th className="p-2 w-12 text-center border-r border-slate-700 bg-slate-900">#</th>
                          <th className="p-2 text-left border-r border-slate-700">A (Descriptions / Codes)</th>
                          <th className="p-2 text-left border-r border-slate-700">B (Numeric Quantities)</th>
                          <th className="p-2 text-left">C (Dates)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-800">
                          <td className="p-2 text-center bg-slate-900 text-slate-500 font-bold border-r border-slate-700">1</td>
                          <td
                            onClick={() => handleCellClick('A1', gridData[0].raw)}
                            className={`p-2.5 border-r border-slate-700 cursor-pointer transition-colors ${
                              activeCellAddress === 'A1' ? 'bg-gold-900/60 ring-2 ring-gold-400' : 'hover:bg-slate-800/50'
                            } text-left`}
                          >
                            <span className="text-gold-300">{gridData[0].raw}</span>
                            <span className="text-[10px] text-slate-500 block">Left-aligned (Text)</span>
                          </td>
                          <td
                            onClick={() => handleCellClick('B1', gridData[1].raw)}
                            className={`p-2.5 border-r border-slate-700 cursor-pointer transition-colors ${
                              activeCellAddress === 'B1' ? 'bg-gold-900/60 ring-2 ring-gold-400' : 'hover:bg-slate-800/50'
                            } text-right`}
                          >
                            <span className="text-emerald-400 font-bold">{gridData[1].raw}</span>
                            <span className="text-[10px] text-slate-500 block">Right-aligned (Number)</span>
                          </td>
                          <td
                            onClick={() => handleCellClick('C1', gridData[2].raw)}
                            className={`p-2.5 cursor-pointer transition-colors ${
                              activeCellAddress === 'C1' ? 'bg-gold-900/60 ring-2 ring-gold-400' : 'hover:bg-slate-800/50'
                            } text-right`}
                          >
                            <span className="text-amber-300">{gridData[2].raw}</span>
                            <span className="text-[10px] text-slate-500 block">Right-aligned (Date)</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 text-center bg-slate-900 text-slate-500 font-bold border-r border-slate-700">2</td>
                          <td
                            onClick={() => handleCellClick('A2', gridData[3].raw)}
                            className={`p-2.5 border-r border-slate-700 cursor-pointer transition-colors ${
                              activeCellAddress === 'A2' ? 'bg-gold-900/60 ring-2 ring-gold-400' : 'hover:bg-slate-800/50'
                            } text-left`}
                          >
                            <span className="text-gold-300">{gridData[3].raw}</span>
                            <span className="text-[10px] text-slate-500 block">Leading \' keeps zero (Text)</span>
                          </td>
                          <td className="p-2.5 border-r border-slate-700 text-slate-600 text-right">-</td>
                          <td className="p-2.5 text-slate-600 text-right">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Observation Question */}
                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-gold-800 space-y-2">
                      <p className="text-xs font-bold text-gold-300 uppercase">Scientific Observation:</p>
                      <p className="text-sm text-slate-200">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-left text-xs text-slate-200 border border-slate-700 font-medium"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Lab 3: Excel Formula Engine */}
              {currentSlide === 2 && (
                <motion.div key="lab2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  {/* Predict Then Check */}
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/70 border border-gold-700 rounded-xl space-y-3">
                      <span className="text-xs px-2 py-0.5 bg-amber-500/30 text-amber-300 font-bold rounded">
                        Predict-Then-Check
                      </span>
                      <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.015 }}
                            whileTap={{ scale: 0.985 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-left text-xs text-slate-200 border border-slate-600 font-medium"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Mark Sliders */}
                    <div className="space-y-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <h3 className="text-xs font-bold text-gold-400 uppercase">Interactive Marks Input (Cells B1:B4)</h3>
                      {[
                        { label: 'Student 1 (B1):', val: markS1, set: setMarkS1 },
                        { label: 'Student 2 (B2):', val: markS2, set: setMarkS2 },
                        { label: 'Student 3 (B3):', val: markS3, set: setMarkS3 },
                        { label: 'Student 4 (B4):', val: markS4, set: setMarkS4 },
                      ].map((s, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-xs text-slate-300">
                            <span>{s.label}</span>
                            <span className="font-mono font-bold text-emerald-400">{s.val}</span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={s.val}
                            onChange={(e) => {
                              s.set(Number(e.target.value));
                              audioManager.play('count');
                            }}
                            aria-label={`Set ${s.label}`}
                            className="w-full accent-emerald-500"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Live Formula Display & SVG Diagram */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="text-xs font-bold text-gold-400 uppercase mb-2">Select Built-In Function Recipe</h3>
                        <div className="grid grid-cols-4 gap-2 mb-3">
                          {(['SUM', 'AVERAGE', 'MAX', 'MIN'] as const).map((fn) => (
                            <motion.button
                              key={fn}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setSelectedFunction(fn);
                                audioManager.play('tap');
                              }}
                              className={`p-2 rounded-lg text-xs font-bold font-mono border ${
                                selectedFunction === fn
                                  ? 'bg-gold-600 text-white border-gold-400 shadow-md'
                                  : 'bg-slate-800 text-slate-400 border-slate-700'
                              }`}
                            >
                              ={fn}
                            </motion.button>
                          ))}
                        </div>

                        {/* SVG DIAGRAM 2: Excel Calculation & Range Engine */}
                        <svg viewBox="0 0 320 110" className="w-full bg-slate-900 rounded-lg p-2 border border-slate-800">
                          {/* Cells B1:B4 */}
                          <rect x="15" y="15" width="45" height="18" fill="#1e293b" stroke="#6366f1" rx="3" />
                          <text x="37" y="28" textAnchor="middle" fill="#a5b4fc" fontSize="9" fontWeight="bold">B1:{markS1}</text>
                          <rect x="15" y="37" width="45" height="18" fill="#1e293b" stroke="#6366f1" rx="3" />
                          <text x="37" y="50" textAnchor="middle" fill="#a5b4fc" fontSize="9" fontWeight="bold">B2:{markS2}</text>
                          <rect x="15" y="59" width="45" height="18" fill="#1e293b" stroke="#6366f1" rx="3" />
                          <text x="37" y="72" textAnchor="middle" fill="#a5b4fc" fontSize="9" fontWeight="bold">B3:{markS3}</text>
                          <rect x="15" y="81" width="45" height="18" fill="#1e293b" stroke="#6366f1" rx="3" />
                          <text x="37" y="94" textAnchor="middle" fill="#a5b4fc" fontSize="9" fontWeight="bold">B4:{markS4}</text>

                          {/* Arrows to Function Node */}
                          <path d="M 62 24 L 115 50" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 3" />
                          <path d="M 62 46 L 115 50" stroke="#818cf8" strokeWidth="1.5" />
                          <path d="M 62 68 L 115 55" stroke="#818cf8" strokeWidth="1.5" />
                          <path d="M 62 90 L 115 55" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 3" />

                          {/* Function Engine Box */}
                          <rect x="115" y="32" width="90" height="42" fill="#312e81" stroke="#4f46e5" strokeWidth="2" rx="6" />
                          <text x="160" y="48" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">={selectedFunction}</text>
                          <text x="160" y="62" textAnchor="middle" fill="#94a3b8" fontSize="8">(Range: B1:B4)</text>

                          {/* Output Arrow */}
                          <path d="M 205 53 L 235 53" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />

                          {/* Evaluated Result Box */}
                          <rect x="238" y="28" width="70" height="50" fill="#064e3b" stroke="#059669" strokeWidth="2" rx="6" />
                          <text x="273" y="46" textAnchor="middle" fill="#6ee7b7" fontSize="9">Output Cell</text>
                          <text x="273" y="66" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">{calculatedExcelValue}</text>
                        </svg>
                      </div>

                      <div className="p-3 bg-gold-950/60 rounded-xl border border-gold-600/60 text-center">
                        <span className="text-xs text-slate-300 block">Current Active Evaluation:</span>
                        <span className="text-2xl font-black text-white font-mono">{calculatedExcelValue}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Lab 4: Access Table Studio */}
              {currentSlide === 3 && (
                <motion.div key="lab3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setTableMode('datasheet');
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          tableMode === 'datasheet' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Datasheet View (Data Grid)
                      </button>
                      <button
                        onClick={() => {
                          setTableMode('design');
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          tableMode === 'design' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Design View (Structure & Types)
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Primary Key Guard:</span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setHasPrimaryKey(!hasPrimaryKey);
                          audioManager.play('tap');
                        }}
                        className={`px-2.5 py-1 rounded text-xs font-bold font-mono border ${
                          hasPrimaryKey
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                            : 'bg-rose-950 text-rose-400 border-rose-700'
                        }`}
                      >
                        {hasPrimaryKey ? '🔑 Enabled (Unique)' : '⚠️ None (Duplicate Risk)'}
                      </motion.button>
                    </div>
                  </div>

                  {/* SVG DIAGRAM 3: Database Relational Architecture & Primary Key Schema */}
                  <svg viewBox="0 0 540 100" className="w-full bg-slate-900 rounded-xl p-2 border border-slate-800">
                    {/* Table 1: Books */}
                    <rect x="15" y="10" width="220" height="80" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" rx="6" />
                    <rect x="15" y="10" width="220" height="22" fill="#312e81" rx="6" />
                    <text x="125" y="25" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">tbl_Books (Entity Table)</text>
                    <text x="25" y="46" fill="#fbbf24" fontSize="9" fontWeight="bold">🔑 BookID (PK - AutoNumber)</text>
                    <text x="25" y="62" fill="#cbd5e1" fontSize="9">📄 Title (Short Text)</text>
                    <text x="25" y="78" fill="#cbd5e1" fontSize="9">💰 Price (Currency/Number)</text>

                    {/* Relationship Connector Link */}
                    <path d="M 235 44 C 270 44, 270 44, 305 44" stroke="#10b981" strokeWidth="2" strokeDasharray="4 3" />
                    <circle cx="235" cy="44" r="3" fill="#fbbf24" />
                    <polygon points="305,44 297,40 297,48" fill="#10b981" />
                    <text x="270" y="36" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="bold">1 to Many</text>

                    {/* Table 2: BorrowRecords */}
                    <rect x="305" y="10" width="220" height="80" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" rx="6" />
                    <rect x="305" y="10" width="220" height="22" fill="#064e3b" rx="6" />
                    <text x="415" y="25" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">tbl_Loans (Linked Queries)</text>
                    <text x="315" y="46" fill="#6ee7b7" fontSize="9">🔗 IssueID (Loan Primary Key)</text>
                    <text x="315" y="62" fill="#fde68a" fontSize="9">🔑 BookID (Foreign Key Reference)</text>
                    <text x="315" y="78" fill="#cbd5e1" fontSize="9">📅 ReturnDate (Date/Time)</text>
                  </svg>

                  {tableMode === 'datasheet' ? (
                    <div className="overflow-x-auto border border-slate-700 rounded-xl bg-slate-950">
                      <table className="w-full text-xs font-mono">
                        <thead className="bg-slate-800 text-slate-300 border-b border-slate-700">
                          <tr>
                            <th className="p-2.5 text-left text-amber-300">🔑 BookID (AutoNumber)</th>
                            <th className="p-2.5 text-left">BookTitle (Text)</th>
                            <th className="p-2.5 text-left">Author (Text)</th>
                            <th className="p-2.5 text-right">Price (Number)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rawAccessRecords.map((r) => (
                            <tr key={r.id} className="border-b border-slate-800/60 hover:bg-slate-800/30">
                              <td className="p-2.5 font-bold text-amber-400">{r.id}</td>
                              <td className="p-2.5 text-slate-200">{r.title}</td>
                              <td className="p-2.5 text-slate-400">{r.author}</td>
                              <td className="p-2.5 text-right text-emerald-400 font-bold">₹{r.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 font-mono text-xs space-y-3">
                      <div className="grid grid-cols-3 font-bold text-gold-400 border-b border-slate-800 pb-2">
                        <span>Field Name</span>
                        <span>Data Type</span>
                        <span>Primary Key Status</span>
                      </div>
                      {[
                        { name: 'BookID', type: 'AutoNumber', pk: true },
                        { name: 'BookTitle', type: 'Short Text', pk: false },
                        { name: 'Author', type: 'Short Text', pk: false },
                        { name: 'Price', type: 'Number (Currency)', pk: false },
                      ].map((f, i) => (
                        <div key={i} className="grid grid-cols-3 py-1.5 border-b border-slate-900 text-slate-300 items-center">
                          <span className="text-white font-bold">{f.name}</span>
                          <span className="text-gold-400">{f.type}</span>
                          <span>{f.pk ? '🔑 Primary Key (Unique)' : 'Regular Field'}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Lab 5: Access Query Filter */}
              {currentSlide === 4 && (
                <motion.div key="lab4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  {/* Query Criteria Simulator */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <h3 className="text-xs font-bold text-gold-400 uppercase">Query Design Grid: Criteria Row (AND Logic)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-300 block mb-1">
                          Marks Criteria: <span className="text-emerald-400 font-mono font-bold">&gt;={queryMinMarks}</span>
                        </label>
                        <input
                          type="range"
                          min={50}
                          max={95}
                          value={queryMinMarks}
                          onChange={(e) => {
                            setQueryMinMarks(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          aria-label="Set Query Marks Filter"
                          className="w-full accent-gold-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 block mb-1">City Filter Criteria:</label>
                        <select
                          value={queryCity}
                          onChange={(e) => {
                            setQueryCity(e.target.value);
                            audioManager.play('tap');
                          }}
                          aria-label="Filter by City Criteria"
                          className="w-full bg-slate-900 border border-slate-700 text-white text-xs p-2 rounded-lg font-mono"
                        >
                          <option value="All">All Cities</option>
                          <option value="Delhi">"Delhi"</option>
                          <option value="Chennai">"Chennai"</option>
                          <option value="Bengaluru">"Bengaluru"</option>
                          <option value="Kolkata">"Kolkata"</option>
                          <option value="Mumbai">"Mumbai"</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Query Live Output */}
                  <div className="overflow-x-auto border border-emerald-900/60 rounded-xl bg-slate-950 p-2">
                    <div className="text-xs font-bold text-emerald-400 px-2 py-1 flex items-center justify-between">
                      <span>⚡ Dynamic Query Output ({filteredAccessRecords.length} records matching)</span>
                      <span className="text-slate-500 text-[10px]">Live Table View</span>
                    </div>
                    <table className="w-full text-xs font-mono mt-2">
                      <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                        <tr>
                          <th className="p-2 text-left">BookID</th>
                          <th className="p-2 text-left">Title</th>
                          <th className="p-2 text-right">Marks Tested</th>
                          <th className="p-2 text-left">City</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAccessRecords.map((rec) => (
                          <tr key={rec.id} className="border-b border-slate-800/40 text-slate-200">
                            <td className="p-2 text-amber-400">{rec.id}</td>
                            <td className="p-2">{rec.title}</td>
                            <td className="p-2 text-right text-emerald-400 font-bold">{rec.marks}</td>
                            <td className="p-2 text-gold-300">{rec.city}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Slide Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-bold text-xs rounded-xl border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-mono">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-lg"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX (Free Play with Zero Grading) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-emerald-400">CyberCity Free Sandbox</h2>
              <p className="text-xs text-slate-300 mt-1">
                Freely experiment with the complete suite: modify formulas, adjust footprint risk, and test queries with zero pressure!
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg"
            >
              Ready for Adaptive Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sandbox Module A: Formula Sandbox */}
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-gold-400 uppercase">A. Excel Engine</h3>
              <div className="text-xs text-slate-300 space-y-1">
                <div>Selected: <span className="font-mono text-amber-300 font-bold">={selectedFunction}(B1:B4)</span></div>
                <div>Evaluated: <span className="font-mono text-emerald-400 font-bold text-base">{calculatedExcelValue}</span></div>
              </div>
              <div className="flex gap-1.5 pt-2">
                {(['SUM', 'AVERAGE', 'MAX', 'MIN'] as const).map((fn) => (
                  <button
                    key={fn}
                    onClick={() => {
                      setSelectedFunction(fn);
                      audioManager.play('tap');
                    }}
                    className={`px-2 py-1 rounded text-[10px] font-mono font-bold ${
                      selectedFunction === fn ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {fn}
                  </button>
                ))}
              </div>
            </div>

            {/* Sandbox Module B: Footprint Risk */}
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-gold-400 uppercase">B. Footprint Radar</h3>
              <div className="text-xs text-slate-300">
                Exposure Risk: <span className="font-bold text-rose-400 font-mono">{footprintRisk}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={postingCaution}
                onChange={(e) => setPostingCaution(Number(e.target.value))}
                aria-label="Adjust Posting Caution Sandbox"
                className="w-full accent-rose-500"
              />
              <span className="text-[10px] text-slate-500 block">Drag caution to reduce online trail exposure</span>
            </div>

            {/* Sandbox Module C: Query Quick-Runner */}
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-gold-400 uppercase">C. Access Dynamic Query</h3>
              <div className="text-xs text-slate-300">
                Matches Found: <span className="font-bold text-emerald-400 font-mono">{filteredAccessRecords.length} / {rawAccessRecords.length}</span>
              </div>
              <input
                type="range"
                min={50}
                max={95}
                value={queryMinMarks}
                onChange={(e) => setQueryMinMarks(Number(e.target.value))}
                aria-label="Adjust Query Threshold Sandbox"
                className="w-full accent-emerald-500"
              />
              <span className="text-[10px] text-slate-500 block">Min Marks Filter: &gt;={queryMinMarks}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: ADAPTIVE CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress Header */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
              <span>
                Challenge <strong>{currentChallenge + 1}</strong> of {filteredChallenges.length}
              </span>
              <span className="text-gold-400 font-bold capitalize">NEP Level: {challenge.competencyLevel}</span>
            </div>
            {/* Progress Bar */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-gold-400 to-emerald-400 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Challenge Box */}
          <div
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900/90 border-slate-800 shadow-xl'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2.5 py-0.5 bg-gold-900/50 text-gold-300 border border-gold-700 rounded font-mono">
                Node: {challenge.nodeId}
              </span>
              <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 rounded capitalize">
                Type: {challenge.type}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 leading-relaxed">
              {challenge.question}
            </h3>

            {/* Render Question Types */}
            {/* 1. MCQ (classify / distinguish / match) */}
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
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm font-medium border transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 shadow-lg'
                        : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-gold-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* 2. Drag-and-Drop Labeling */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Drag item ${item.label}`}
                      className="px-4 py-2 bg-gold-600 hover:bg-gold-500 rounded-lg cursor-grab text-white font-bold text-xs shadow"
                    >
                      ✥ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'target_table', title: 'Entire Container Table' },
                    { id: 'target_record', title: 'Horizontal Row (One Entity)' },
                    { id: 'target_field', title: 'Vertical Column (One Attribute)' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border-2 border-dashed text-center min-h-[90px] flex flex-col justify-center items-center transition-all ${
                        droppedLabels[target.id]
                          ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                          : 'border-slate-700 bg-slate-950/50 text-slate-400'
                      }`}
                    >
                      <span className="text-[11px] block mb-1 font-semibold">{target.title}</span>
                      <span className="font-mono font-bold text-sm text-white">
                        {droppedLabels[target.id] || 'Drop Label Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify Database Labels
                </motion.button>
              </div>
            )}

            {/* 3. Drag-Sort */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to rearrange into the correct chronological or logical sequence:</p>
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
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl cursor-grab text-xs sm:text-sm text-slate-200 flex items-center gap-3 font-medium"
                    >
                      <span className="px-2 py-0.5 bg-gold-900/60 text-gold-300 rounded font-bold font-mono">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Submit Sequence
                </motion.button>
              </div>
            )}

            {/* 4. Numeric Input */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated result..."
                    aria-label="Numeric answer input"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-gold-500"
                  />
                  <span className="text-xs text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || numericInput === ''}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Check
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. Construct Assembly */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setConstructParts((prev) => [...prev, part]);
                        audioManager.play('tap');
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-mono text-gold-300 font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                {/* Built Formula Sandbox */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-gold-900/80 border border-gold-600 text-white rounded-lg text-xs font-mono flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => {
                          setConstructParts((prev) => prev.filter((_, idx) => idx !== i));
                          audioManager.play('pop');
                        }}
                        className="text-rose-400 hover:text-rose-300 text-xs font-bold"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 font-mono">Click pieces above to build the Excel cross-sheet formula</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={constructParts.length === 0 || showExplanation}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Validate Formula Construction
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setConstructParts([])}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl"
                  >
                    Clear
                  </motion.button>
                </div>
              </div>
            )}

            {/* Progressive Step-By-Step Explanation Card */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-gold-950/90 to-slate-900 border border-gold-700 rounded-2xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                    Step-by-Step Concept Breakdown:
                  </span>
                  <span className="text-xs text-slate-400">
                    Step {revealedSteps + 1} of{' '}
                    {challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                      >
                        <strong className="text-amber-400 mr-1.5">{i + 1}.</strong> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow"
                    >
                      Show Next Explanation Step →
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Simulation →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETE & MASTERY REPORT ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950 via-slate-900 to-emerald-950 rounded-3xl border border-gold-700 text-center space-y-4 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-emerald-400 via-gold-300 to-gold-300 bg-clip-text text-transparent">
              Mission Accomplished!
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have successfully completed the Computer Ethics, Excel Calculation Engine, and Relational Database Access mastery curriculum.
            </p>

            <div className="flex flex-wrap justify-center gap-4 py-3">
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-700 min-w-[130px]">
                <div className="text-xs text-slate-400">Final Score</div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  {Math.max(0, 100 - errors * 4)}%
                </div>
              </div>
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-700 min-w-[130px]">
                <div className="text-xs text-slate-400">Mastery Level</div>
                <div className="text-2xl font-black text-gold-400 capitalize font-mono">
                  {masteryLevel}
                </div>
              </div>
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-700 min-w-[130px]">
                <div className="text-xs text-slate-400">Errors Logged</div>
                <div className="text-2xl font-black text-rose-400 font-mono">{errors}</div>
              </div>
            </div>
          </div>

          {/* REQUIRED SECTION: MOTIVATIONAL FEEDBACK */}
          <div
            className={`p-5 rounded-2xl border text-center transition-all shadow-lg ${
              errors === 0
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                : errors <= 3
                ? 'bg-gold-950/60 border-gold-500 text-gold-200'
                : errors <= 7
                ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                : 'bg-rose-950/60 border-rose-500 text-rose-200'
            }`}
          >
            <div className="text-2xl font-black tracking-wide uppercase font-mono mb-1">
              {motivationalMessage}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              {errors === 0
                ? 'Outstanding performance with zero mistakes! You have completely mastered digital safety, Excel functions, and relational database queries.'
                : errors <= 3
                ? 'Superb grasp of concepts! Just a few minor slips on advanced criteria or data alignment.'
                : errors <= 7
                ? 'Solid effort! You solved complex problems. Review the diagnostic breakdown below to solidify your fundamentals.'
                : 'Learning takes iteration and perseverance! Revisit the labs and you will master every formula and query.'}
            </p>
          </div>

          {/* REQUIRED SECTION: REFLECTION QUESTIONS */}
          <div className="p-6 bg-slate-900/95 border border-gold-700/70 rounded-2xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">💭</span>
              <h3 className="text-sm sm:text-base font-bold text-gold-300 uppercase tracking-wide">
                Student Reflection & Metacognition
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Reflect on your learning journey to encode these principles into long-term memory:
            </p>

            <div className="space-y-4">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label className="text-xs font-bold text-amber-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.surprising}
                  onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, surprising: e.target.value })}
                  placeholder="e.g., Even deleted posts or incognito browsing leave permanent trails on servers and routers..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label className="text-xs font-bold text-gold-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.friendExplain}
                  onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, friendExplain: e.target.value })}
                  placeholder="e.g., Access links tables with Primary Keys so you don't repeat data, while Excel is a calculator grid..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label className="text-xs font-bold text-emerald-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.realLife}
                  onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, realLife: e.target.value })}
                  placeholder="e.g., Setting up a library catalog with Access or tracking class grades and attendance with Excel =AVERAGE..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Misconceptions Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 border border-rose-800 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Review:</h3>
              {hitMisconceptions.map((idx, i) => {
                const item = misconceptions?.[idx];
                if (!item) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-semibold">❌ Misconception: {item.misconception}</p>
                    <p className="text-emerald-400 font-semibold">✓ Correct Principle: {item.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Review Schedule */}
          <div className="p-5 bg-amber-950/40 border border-amber-800 rounded-2xl text-xs space-y-1">
            <h3 className="font-bold text-amber-300 text-sm mb-1">Spaced Repetition Schedule (SM-2)</h3>
            <p className="text-slate-300">
              Optimal memory retention review scheduled in{' '}
              <strong className="text-amber-300 font-mono">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </strong>
              . Revisit this simulation module then to lock concepts into long-term recall!
            </p>
          </div>

          {/* Real-World Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-gold-400 uppercase tracking-wide">
              {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-gold-400 mr-1.5">{i + 1}.</span> {st}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION ENGINE FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export { C7_ComputerScienceComputerEthicsUnethicalSim };
export default C7_ComputerScienceComputerEthicsUnethicalSim;
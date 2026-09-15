'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID CONSTANTS (ICSE Class 8 Computer Science) ───
const NODE_C8_CS_001 = 'c8_cs_001'; // Software types: System, Application, Utility
const NODE_C8_CS_002 = 'c8_cs_002'; // Operating system: definition, need, functions
const NODE_C8_CS_003 = 'c8_cs_003'; // Types of OS: batch, real-time, distributed, embedded
const NODE_C8_CS_004 = 'c8_cs_004'; // GUI: features, elements, advantages over CLI
const NODE_C8_CS_005 = 'c8_cs_005'; // Excel operators: arithmetic, comparison, text concatenation
const NODE_C8_CS_006 = 'c8_cs_006'; // Excel cell referencing: relative, absolute, mixed
const NODE_C8_CS_007 = 'c8_cs_007'; // Excel functions: IF, COUNTIF, SUMIF, ROUND, UPPER, LOWER
const NODE_C8_CS_008 = 'c8_cs_008'; // Excel error values & managing worksheets
const NODE_C8_CS_009 = 'c8_cs_009'; // Excel charts: column, bar, line, pie, creating charts
const NODE_C8_CS_010 = 'c8_cs_010'; // Excel chart formatting: titles, labels, legend, resizing

const ALL_NODE_IDS = [
  NODE_C8_CS_001,
  NODE_C8_CS_002,
  NODE_C8_CS_003,
  NODE_C8_CS_004,
  NODE_C8_CS_005,
  NODE_C8_CS_006,
  NODE_C8_CS_007,
  NODE_C8_CS_008,
  NODE_C8_CS_009,
  NODE_C8_CS_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission CyberKraft: Building the Digital School System',
  intro: 'St. Xavier High School in Pune is digitising its entire campus! As lead junior systems engineer, you are tasked with configuring the operating systems, designing an intuitive GUI, and automating the examination score processing & analytics in Microsoft Excel.',
  context: 'You will diagnose software architectural layers, test scheduling determinism across OS types, debug live spreadsheet formulas with mixed cell references, repair spreadsheet errors, and design dynamic charts for the annual academic audit.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In a hospital life-support controller or train railway signalling unit, what happens if an Operating System delays its task execution by 1.5 seconds for a background update?',
  options: [
    'Nothing serious, the tasks will smoothly resume once the update finishes.',
    'Catastrophic failure or risk to human life, because safety-critical systems require deterministic hard real-time deadlines.',
    'The spreadsheet in memory displays #VALUE! error.',
    'It converts the GUI into a Command Line Interface automatically.',
  ],
  correctIndex: 1,
  hintAfter: 'Exact timing guarantees are why Real-Time Operating Systems (RTOS) are engineered differently from general-purpose desktop OSs! Let us explore how software architectures and computing systems work.',
};

// ─── CHALLENGE INTERFACE (NEP 2020 / CISCE 2026 Aligned) ───
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

// ─── 22 PROGRESSIVE CHALLENGES (Foundation, Standard, Advanced) ───
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (7 items) ---
  {
    id: 'c8_cs_ch_01',
    nodeId: NODE_C8_CS_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is classified as UTILITY software rather than system or application software?',
    options: [
      'Microsoft Windows 11',
      'Quick Heal Antivirus / Disk Cleanup Tool',
      'Microsoft Excel 2016',
      'Mozilla Firefox Browser',
    ],
    correctIndex: 1,
    explanation: 'Utility software performs maintenance, protection, and housekeeping tasks (like antivirus scanning and disk cleanup). Operating systems are system software, while Word/Excel/Browsers are application software.',
    hints: [
      'Think about which software protects, cleans, or tunes the computer system.',
      'Software that edits documents is application software; OS runs hardware.',
      'Antivirus and Disk Cleanup maintain computer health — they are Utility software.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'c8_cs_ch_02',
    nodeId: NODE_C8_CS_002,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is an Operating System termed "System Software" instead of "Application Software"?',
    options: [
      'Because it is purchased from a retail shop on a DVD.',
      'Because it manages hardware resources (CPU, RAM, Disks) and provides a base environment for applications to run.',
      'Because it only contains games and drawing apps.',
      'Because it cannot be changed once installed in ROM.',
    ],
    correctIndex: 1,
    explanation: 'System software sits closest to hardware, orchestrating CPU scheduling, memory partitioning, and device I/O. Application software performs user-specific productivity tasks on top of the OS.',
    hints: [
      'Consider the role of the station master in a train station.',
      'Application software helps the user write or calculate; system software runs the machine itself.',
      'The OS coordinates CPU, memory, and devices so all other programs can function.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'c8_cs_ch_03',
    nodeId: NODE_C8_CS_004,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each GUI core element to its correct functional definition on the user interface diagram.',
    dragItems: [
      { label: 'Icon', targetId: 'box_icon' },
      { label: 'Window', targetId: 'box_window' },
      { label: 'Menu', targetId: 'box_menu' },
      { label: 'Button', targetId: 'box_button' },
    ],
    correctMapping: {
      box_icon: 'Icon',
      box_window: 'Window',
      box_menu: 'Menu',
      box_button: 'Button',
    },
    explanation: 'An Icon is a graphical symbol representing a file/app. A Window is the framed rectangular workspace. A Menu provides a drop-down list of commands. A Button triggers a direct action (e.g. OK, Save).',
    hints: [
      'Icons are small clickable pictures on the desktop.',
      'Windows are rectangular frames where programs display documents.',
      'Menus list commands; buttons execute immediate actions like Submit or Cancel.',
    ],
  },
  {
    id: 'c8_cs_ch_04',
    nodeId: NODE_C8_CS_005,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'In Excel, if cell A1 = 4 and cell B1 = 3, what is the exact numeric result of the exponentiation formula: =A1^B1 ?',
    correctAnswer: 64,
    tolerance: 0,
    unit: '',
    explanation: 'The caret (^) operator computes exponentiation. 4 raised to the power of 3 is 4 × 4 × 4 = 64.',
    hints: [
      'The caret symbol (^) means "raised to the power of".',
      'Calculate 4 cubed (4 * 4 * 4).',
      '4 * 4 = 16, and 16 * 4 = 64.',
    ],
  },
  {
    id: 'c8_cs_ch_05',
    nodeId: NODE_C8_CS_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In Excel cell referencing, which symbol acts as the "pin" or lock that creates an Absolute reference?',
    options: ['# (Hash)', '$ (Dollar sign)', '& (Ampersand)', '% (Percent sign)'],
    correctIndex: 1,
    explanation: 'The dollar sign ($) locks column letters and/or row numbers so they do not shift when formulas are copied (e.g. $A$1 is fully absolute).',
    hints: [
      'Think of currency notation used in spreadsheets.',
      'It is typed before column letter and row number, such as $F$10.',
      'The $ symbol pins the row or column.',
    ],
  },
  {
    id: 'c8_cs_ch_06',
    nodeId: NODE_C8_CS_008,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What error code does Excel immediately return when a formula tries to divide a number by 0 or by an empty cell?',
    options: ['#NAME?', '#DIV/0!', '#REF!', '#VALUE!'],
    correctIndex: 1,
    explanation: '#DIV/0! is produced whenever division by zero or a blank cell is attempted because mathematical division by zero is undefined.',
    hints: [
      'Look at the abbreviation for division and zero.',
      'It contains DIV and 0 in its name.',
      'The error code is #DIV/0!.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'c8_cs_ch_07',
    nodeId: NODE_C8_CS_009,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which Excel chart type is specifically designed to show parts of a single whole as proportional circular slices?',
    options: ['Line Chart', 'Pie Chart', 'Bar Chart', 'Scatter Plot'],
    correctIndex: 1,
    explanation: 'A Pie Chart represents proportions that sum to 100% of a total budget or entity. Line charts show trends over time, and column/bar charts compare discrete categories.',
    hints: [
      'Think of dividing a round pizza or cake into slices.',
      'The slices represent percentages of a single total.',
      'The answer is a Pie Chart.',
    ],
  },

  // --- STANDARD (8 items) ---
  {
    id: 'c8_cs_ch_08',
    nodeId: NODE_C8_CS_003,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is MS-DOS classified as single-user single-task, while a university Linux server is multi-user multi-tasking?',
    options: [
      'Linux is written in C++, while MS-DOS is written in Python.',
      'Linux allows multiple users to log in simultaneously via network terminals and execute concurrent independent processes with protected memory; MS-DOS allowed only one user and one program in memory.',
      'MS-DOS supports infinite monitors, while Linux only runs on laptops.',
      'Linux does not use CPU scheduling at all.',
    ],
    correctIndex: 1,
    explanation: 'True multi-user operating systems isolate concurrent user sessions and schedule tasks across shared hardware. Single-user OSs (like MS-DOS) dedicate all resources to a solitary user session executing one task at a time.',
    hints: [
      'Focus on concurrent execution by multiple distinct users over a network.',
      'Can dozens of students log into a Linux server at the exact same moment? Yes.',
      'Multi-user means simultaneous independent user sessions with access permissions.',
    ],
  },
  {
    id: 'c8_cs_ch_09',
    nodeId: NODE_C8_CS_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the return type and output of the comparison formula: =150 >= 200 in Microsoft Excel?',
    options: [
      'Numeric result: -50',
      'Boolean result: FALSE',
      'Text string: "150>=200"',
      'Error value: #VALUE!',
    ],
    correctIndex: 1,
    explanation: 'All comparison operators (=, >, <, >=, <=, <>) in Excel return a Boolean value (either TRUE or FALSE). Since 150 is not greater than or equal to 200, the result is FALSE.',
    hints: [
      'Comparison operators test a mathematical condition.',
      'Excel returns either TRUE or FALSE for comparisons, never numbers like 0 or 1.',
      'Is 150 >= 200? No, so it evaluates to FALSE.',
    ],
  },
  {
    id: 'c8_cs_ch_10',
    nodeId: NODE_C8_CS_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In cell C2, formula is =A2*$D$1. If A2=10 and D1=5, the result is 50. If this formula is copied down to cell C4, where A4=30 and D1 remains 5, what numeric value appears in C4?',
    correctAnswer: 150,
    tolerance: 0,
    unit: '',
    explanation: 'When copied to C4, the relative reference A2 shifts down 2 rows to become A4 (30). The absolute reference $D$1 stays locked at 5. Result = 30 * 5 = 150.',
    hints: [
      'Relative reference A2 becomes A4 when copied down two rows.',
      'Absolute reference $D$1 is pinned and remains $D$1.',
      'Calculate A4 * D1 = 30 * 5 = 150.',
    ],
  },
  {
    id: 'c8_cs_ch_11',
    nodeId: NODE_C8_CS_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A teacher enters: =IF(B2>=40, "PASS", "FAIL"). If B2 contains the numeric score 39, what will be displayed in the cell?',
    options: ['PASS', 'FAIL', 'TRUE', '#NAME?'],
    correctIndex: 1,
    explanation: 'The condition 39 >= 40 evaluates to FALSE. The IF function returns the third argument, which is "FAIL".',
    hints: [
      'Syntax of IF is: =IF(condition, value_if_true, value_if_false).',
      'Test the condition: is 39 greater than or equal to 40?',
      'Since 39 is strictly less than 40, the condition is FALSE -> "FAIL".',
    ],
  },
  {
    id: 'c8_cs_ch_12',
    nodeId: NODE_C8_CS_007,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In an ICSE mark sheet, cell A1 = 87.648. What numeric value is returned by the formula: =ROUND(A1, 2) ?',
    correctAnswer: 87.65,
    tolerance: 0.001,
    unit: '',
    explanation: 'ROUND(87.648, 2) looks at the 3rd decimal digit (8). Since 8 >= 5, the second decimal place (4) is rounded up to 5, resulting in 87.65.',
    hints: [
      'We are rounding to 2 decimal places.',
      'Inspect the third digit after the decimal point: 8.',
      'Since 8 is 5 or greater, round 4 up to 5 -> 87.65.',
    ],
  },
  {
    id: 'c8_cs_ch_13',
    nodeId: NODE_C8_CS_008,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A student enters =SUN(A1:A10) intending to sum a column. Excel returns #NAME?. What is the exact cause of this error?',
    options: [
      'Column A has too many numbers for Excel to calculate.',
      'Excel cannot recognise the function name "SUN" because it is a typo for "SUM".',
      'Cell A1 is formatted as currency.',
      'Worksheet was renamed to Sheet1.',
    ],
    correctIndex: 1,
    explanation: '#NAME? occurs when Excel cannot find a built-in function or user-defined named range matching the token typed in the formula.',
    hints: [
      'Check the spelling of the function name.',
      'SUN is not a recognized Excel formula.',
      'Misspelling SUM as SUN triggers the #NAME? error.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'c8_cs_ch_14',
    nodeId: NODE_C8_CS_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The Indian Meteorological Department wants to display the rise and fall of Mumbai temperature recorded on the 1st of every month from Jan to Dec. What is the most appropriate chart type?',
    options: ['Pie Chart', 'Line Chart', 'Radar Chart', 'Doughnut Chart'],
    correctIndex: 1,
    explanation: 'Line charts are the gold standard for representing continuous time-series data because the connected line segments immediately reveal upward and downward trends over intervals.',
    hints: [
      'Months form an ordered chronological sequence over time.',
      'We need to observe the continuous rising and falling trend.',
      'Connecting data points with a line makes trends visible -> Line Chart.',
    ],
  },
  {
    id: 'c8_cs_ch_15',
    nodeId: NODE_C8_CS_010,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'When formatting an Excel chart with a single data series (e.g. Science Marks of 5 students), why should the Legend typically be removed?',
    options: [
      'Because legends crash the Excel chart graphics engine.',
      'Because with only one data series, the legend redundantly repeats the chart title, wasting visual space and cluttering the diagram.',
      'Because legends can only be displayed in Microsoft Word.',
      'Because the CISCE board requires legends on pie charts only.',
    ],
    correctIndex: 1,
    explanation: 'A legend serves as a colour key to distinguish between 2 or more data series. For a single series, every bar represents the same metric, making the legend redundant clutter.',
    hints: [
      'A legend tells you which colour represents which series.',
      'If there is only one series, all bars are the same colour.',
      'Removing the redundant single-series legend improves visual clarity.',
    ],
  },

  // --- ADVANCED / COMPETENCY-BASED (7 items) ---
  {
    id: 'c8_cs_ch_16',
    nodeId: NODE_C8_CS_003,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A car Anti-lock Braking System (ABS) controller must modulate brake hydraulic pressure 30 times per second within a strict 30ms deterministic deadline. Which OS architecture is required?',
    options: [
      'Batch Processing Operating System',
      'Real-Time Operating System (RTOS)',
      'Distributed Cloud Operating System',
      'General Desktop Operating System (Windows Home)',
    ],
    correctIndex: 1,
    explanation: 'Safety-critical embedded controllers require a Real-Time Operating System (RTOS) with bounded worst-case latency (determinism) so deadlines are guaranteed unconditionally.',
    hints: [
      'Timing is safety-critical: a delay could cause brake lockup and collision.',
      'Desktop OSs can pause for updates; batch systems queue jobs for later.',
      'An RTOS guarantees hard response time deadlines.',
    ],
  },
  {
    id: 'c8_cs_ch_17',
    nodeId: NODE_C8_CS_006,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the master formula for cell B2 in a 2D multiplication table where row factors are in $B$1:$K$1 and column factors are in $A$2:$A$11. Assemble the tokens:',
    availableParts: ['=', '$A2', '*', 'B$1', 'A$2', '$B2', '+'],
    targetState: '= $A2 * B$1',
    validationHint: 'You need mixed referencing: column A locked ($A2) and row 1 locked (B$1).',
    explanation: 'The mixed reference =$A2*B$1 pins column A as you fill horizontally to the right, and pins row 1 as you fill vertically downward, populating the entire 10×10 grid flawlessly.',
    hints: [
      'To read factors down column A, pin column A: $A2.',
      'To read factors across row 1, pin row 1: B$1.',
      'Multiply them together: = $A2 * B$1.',
    ],
  },
  {
    id: 'c8_cs_ch_18',
    nodeId: NODE_C8_CS_007,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order the execution stages of how Excel evaluates the formula: =UPPER("Result: " & IF(SUM(B2:B5)>=150, "Distinction", "General"))',
    sortItems: [
      'Calculate SUM(B2:B5) of marks',
      'Evaluate comparison >= 150 to return TRUE/FALSE',
      'Select IF branch: return "Distinction" or "General"',
      'Concatenate text: "Result: " & branch string',
      'Convert entire final string to capital letters with UPPER()',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Excel evaluates from the innermost nested function outward: SUM first, then the comparison, then the IF conditional branch, followed by ampersand concatenation, and finally the UPPER text transformation.',
    hints: [
      'Start inside the deepest parentheses: SUM(B2:B5).',
      'Next evaluate the >= condition to pick the IF branch.',
      'Then join with & and finally wrap in UPPER().',
    ],
  },
  {
    id: 'c8_cs_ch_19',
    nodeId: NODE_C8_CS_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In cell C5, formula is =A5+B5. If a user deletes Column B entirely from the spreadsheet, what will cell C5 immediately display and why?',
    options: [
      '0, because deleted columns default to numeric zero.',
      '#REF!, because the cell reference B5 no longer exists and has become an invalid reference.',
      '#DIV/0!, because column B had no numbers.',
      'The formula automatically heals and converts to =A5.',
    ],
    correctIndex: 1,
    explanation: 'Deleting rows, columns, or referenced worksheets destroys the memory coordinates that formulas point to, transforming the formula to =A5+#REF! and rendering #REF! in the cell.',
    hints: [
      'What happens to a link when the target is completely removed?',
      'REF stands for reference error.',
      'Deleting the target cell/column yields #REF!.',
    ],
  },
  {
    id: 'c8_cs_ch_20',
    nodeId: NODE_C8_CS_005,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the formula to produce the student greeting: "Roll No: 12 - Aarav" where roll number is in A2 and name is in B2.',
    availableParts: ['=', '"Roll No: "', '&', 'A2', '" - "', 'B2', '+', 'CONCAT'],
    targetState: '= "Roll No: " & A2 & " - " & B2',
    validationHint: 'Use the text concatenation operator & between literal strings and cell addresses.',
    explanation: 'Using the ampersand (&) operator joins literal strings in quotes with values from cells A2 and B2 seamlessly without type conversion errors.',
    hints: [
      'Start with the literal string "Roll No: ".',
      'Join with cell A2 using &.',
      'Join with " - " & B2.',
    ],
  },
  {
    id: 'c8_cs_ch_21',
    nodeId: NODE_C8_CS_009,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims: "A Bar chart and a Column chart are completely identical in Excel, so it never matters which one we choose." Evaluate this claim.',
    options: [
      'Correct, Excel treats them as exact synonyms with no layout differences.',
      'Incorrect; while both compare categories, Column charts use vertical bars (best for short category names), whereas Bar charts use horizontal bars (essential when category labels are long, such as Indian state names, to prevent overcrowding).',
      'Incorrect; Bar charts only work with text data, while Column charts only accept negative integers.',
      'Correct; the CISCE syllabus merged them into a single chart in 2024.',
    ],
    correctIndex: 1,
    explanation: 'Orientation makes a major usability difference: horizontal Bar charts give ample room for lengthy category descriptions (e.g. "Arunachal Pradesh", "Thiruvananthapuram") along the vertical Y-axis without label truncation or clutter.',
    hints: [
      'Think about where category labels sit in each chart.',
      'Horizontal bar charts give wide horizontal space for long text names.',
      'Column charts are vertical; bar charts are horizontal.',
    ],
  },
  {
    id: 'c8_cs_ch_22',
    nodeId: NODE_C8_CS_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A school lab assistant needs to print ONLY the newly formatted annual performance chart for a project report, without printing the surrounding 500 rows of spreadsheet numbers. How is this accomplished?',
    options: [
      'Delete all 500 rows of student marks first, then print.',
      'Click the border of the chart to select it as an active object, then press Ctrl+P (File > Print) — Excel will automatically print only the selected chart.',
      'Convert the spreadsheet to a Linux command line script.',
      'Change the chart background colour to transparent.',
    ],
    correctIndex: 1,
    explanation: 'Selecting the chart object before opening the Print dialog tells Excel to isolate and render only that graphical object onto the page, leaving the worksheet data untouched.',
    hints: [
      'Does deleting worksheet numbers erase the chart data too? Yes, so avoid that.',
      'Click directly on the chart to select it before printing.',
      'When an object is selected, Excel prints just that selected element.',
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
  nodeId: NODE_C8_CS_001,
  title: 'Software Types, Operating Systems & Excel Analytics',
  definition: 'Software is classified into System Software (OS, Device Drivers), Application Software (Word, Excel), and Utility Software (Antivirus, Disk Cleanup). Modern computing utilizes GUIs with WIMP elements. Excel formulas execute calculations via arithmetic, comparison, and text operators, utilizing relative ($ locked) referencing, conditional functions (IF, COUNTIF, SUMIF), error handling, and dynamic charts.',
  eli5: 'System software is the house foundation, application software is the furniture you use to do work, and utility software is the cleaning kit that keeps everything in good repair!',
  misconceptions: [
    {
      misconception: 'Microsoft Word or Excel are system software because they came pre-installed on the PC.',
      correction: 'Pre-installation does not define software classification. Word and Excel are Application Software because their purpose is user document editing and spreadsheet calculation, running on top of the OS.',
    },
    {
      misconception: 'A Real-Time OS is merely an operating system that runs very fast.',
      correction: 'Speed alone does not make an RTOS. An RTOS is defined by strict determinism — guaranteeing that tasks complete within an absolute, bounded deadline (e.g. 30ms for ABS brakes).',
    },
    {
      misconception: 'The #DIV/0! error only triggers when the number 0 is explicitly typed as divisor.',
      correction: 'Excel treats empty (blank) cells as 0 during arithmetic division, so dividing by a blank cell also triggers #DIV/0!.',
    },
    {
      misconception: 'The dollar sign ($) in Excel cell addresses modifies the numeric value stored inside the cell.',
      correction: 'The $ symbol only pins the column letter or row number so it does not shift during formula copying; it has zero effect on the numeric value.',
    },
    {
      misconception: 'Deleting a chart from an Excel worksheet permanently deletes the underlying numerical data in the cells.',
      correction: 'Charts are visual display objects. Deleting a chart leaves the source data rows and columns completely untouched in the worksheet.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which category does BOSS Linux belong to?', options: ['Application Software', 'System Software', 'Utility Software', 'Malware'], correctIndex: 1 },
    { question: 'What does RTOS stand for?', options: ['Random Task Operating System', 'Real-Time Operating System', 'Relational Table Operating System', 'Read-Time Optical System'], correctIndex: 1 },
    { question: 'Which operator is used to concatenate text strings in Excel?', options: ['+', '*', '&', '^'], correctIndex: 2 },
    { question: 'In $C$4, what is pinned from moving when copied?', options: ['Only Column C', 'Only Row 4', 'Both Column C and Row 4', 'Neither'], correctIndex: 2 },
    { question: 'What is returned by =IF(10>20, 100, 200)?', options: ['100', '200', 'TRUE', '#VALUE!'], correctIndex: 1 },
    { question: 'Which error occurs if you type =SUN(B1:B5)?', options: ['#DIV/0!', '#NAME?', '#REF!', '#NULL!'], correctIndex: 1 },
    { question: 'A chart displaying monthly temperature trends is best drawn as:', options: ['Pie Chart', 'Line Chart', 'Doughnut Chart', 'Radar Chart'], correctIndex: 1 },
    { question: 'Which GUI element provides framed workspace for a running program?', options: ['Icon', 'Button', 'Window', 'Scrollbar'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student classifies software types, articulates OS functions & architectures, writes complex Excel formulas with mixed references, handles worksheet errors, and constructs correctly formatted charts.',
};

// ─── EXPLORATION STEPS (Brilliant.org Learn-By-Doing Labs) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Software Hierarchy & The System Stack',
    instruction: 'Click each architectural layer (Hardware -> System -> Utility -> Application) to observe resource flow.',
    interactionType: 'click-layers',
    nodeId: NODE_C8_CS_001,
  },
  {
    title: 'Lab 2: OS Dispatcher & Task Scheduling',
    instruction: 'Toggle between General OS and RTOS modes and trigger high-priority interrupts to observe latency.',
    interactionType: 'toggle-rtos',
    nodeId: NODE_C8_CS_003,
  },
  {
    title: 'Lab 3: GUI vs CLI Interactive Shell',
    instruction: 'Click GUI buttons to move files or type CLI commands to contrast visual ease with text precision.',
    interactionType: 'gui-cli-compare',
    nodeId: NODE_C8_CS_004,
  },
  {
    title: 'Lab 4: Excel Live Formula & Cell Reference Engine',
    instruction: 'Drag the multiplier and tax rate sliders to see relative ($free) vs absolute ($pinned) cell propagation.',
    interactionType: 'excel-formula-sim',
    nodeId: NODE_C8_CS_006,
  },
  {
    title: 'Lab 5: Interactive Chart Studio & Visualizer',
    instruction: 'Switch data modes and toggle chart types (Column, Bar, Line, Pie) with live axis & legend controls.',
    interactionType: 'chart-designer',
    nodeId: NODE_C8_CS_009,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: In an Excel formula =A1*$B$1 copied down 3 rows, will the reference to cell B1 change to B4?',
    options: [
      'Yes, all references in Excel always shift automatically.',
      'No, because the dollar signs ($B$1) lock both the column and row in place.',
      'It turns into #REF! error.',
      'It converts into a Pie chart slice.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Test this in Lab 4 by sliding the row selector down to observe locked cell references.',
    nodeId: NODE_C8_CS_006,
  },
  {
    question: 'Predict: If you apply =IF(B2>=50, "Pass", "Fail") to a score of 50.0, what does it evaluate to?',
    options: [
      '"Fail" because 50 is not strictly greater than 50.',
      '"Pass" because the comparison operator >= includes 50 as equal.',
      '#VALUE! error.',
      'TRUE',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Student Score slider to exactly 50 and observe the live conditional verdict.',
    nodeId: NODE_C8_CS_007,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'In the OS Task Dispatcher simulation, what key difference did you observe when switching to RTOS mode?',
    observableOptions: [
      'The CPU paused to download wallpapers.',
      'Critical tasks executed within strict, bounded deterministic deadlines without background interruptions.',
      'The computer automatically deleted all files.',
      'The screen turned into a command prompt.',
    ],
    correctIndex: 1,
    nodeId: NODE_C8_CS_003,
  },
  {
    question: 'When toggling the Chart Studio from Column to Pie chart for a 12-month temperature dataset, what did you observe?',
    observableOptions: [
      'Pie chart made temperature trends clearer than the Line chart.',
      'Pie chart created misleading slices because monthly temperatures are continuous measurements over time, not parts of 100% of a single total.',
      'The chart turned red and showed #DIV/0! error.',
      'All 12 months merged into a single square.',
    ],
    correctIndex: 1,
    nodeId: NODE_C8_CS_009,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Junior IT Director: St. Xavier High School Audit',
  description: 'Apply your computer science skills to build a complete school management model: configure OS safety for the chemistry lab robot, set up student grade sheets with IF/ROUND formulas, and generate an audited budget chart for the board of trustees.',
  steps: [
    'Classify 5 campus devices (Smartwatch, Admin PC, Robotics Controller, Library Server, Attendance Scanner) into their exact OS types.',
    'Build an Excel mark sheet with 5 student rows: compute Total (=SUM), Result (=IF), and Rounded Average (=ROUND).',
    'Generate a 3-slice Pie chart for Annual School Expenditure (Salaries 55%, Infrastructure 30%, Library 15%) with complete titles and data labels.',
    'Share your spreadsheet layout and OS architecture map with your teacher or classmates.',
  ],
};

// ─── MAIN COMPONENT ───
function C8_ComputerScienceSoftwareTypesSystemSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C8_CS_001,
  title = DEFAULT_PROPS.title || 'Computer Science: Software Types, OS & Excel',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // Config
  const subjectConfig = SUBJECT_CONFIG['compsci'] || { name: 'Computer Science', emoji: '💻', color: 'cyan' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Interactive Lab State
  const [selectedLayer, setSelectedLayer] = useState<string | null>('system');
  const [osMode, setOsMode] = useState<'general' | 'rtos' | 'distributed'>('general');
  const [osInterruptTriggered, setOsInterruptTriggered] = useState(false);
  const [cliInputText, setCliInputText] = useState('');
  const [cliOutputHistory, setCliOutputHistory] = useState<string[]>([
    'CyberKraft Shell v8.2 [Class 8 ICSE Lab]',
    'Type "help" or "dir" to list files.',
  ]);
  const [draggedDesktopIcon, setDraggedDesktopIcon] = useState<string | null>(null);
  const [folderFiles, setFolderFiles] = useState<string[]>(['AnnualMarks.xlsx', 'SchoolBudget.xlsx']);
  const [trashFiles, setTrashFiles] = useState<string[]>([]);

  // Interactive Excel Engine State
  const [excelQty, setExcelQty] = useState(12);
  const [excelUnitPrice, setExcelUnitPrice] = useState(45);
  const [excelTaxRate, setExcelTaxRate] = useState(5); // in % ($F$1)
  const [excelErrorSimType, setExcelErrorSimType] = useState<'none' | 'div0' | 'value' | 'name' | 'ref'>('none');

  // Interactive Chart Studio State
  const [chartType, setChartType] = useState<'column' | 'bar' | 'line' | 'pie'>('column');
  const [chartTitleText] = useState('Term 1 Science Scores');
  const [chartShowLegend, setChartShowLegend] = useState(true);
  const [chartXLabel] = useState('Student Name');
  const [chartYLabel] = useState('Marks out of 100');

  // Prediction & Observation state
  const [predictionMade, setPredictionMade] = useState(false);

  // Challenges state & escalating hints
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag & Sort & Construct Challenge State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflections state
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');

  // Simulation Feedback Components
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // Refs for BKT, Auto-hints & Canvas
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY: Filter challenges based on BKT ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIALIZE MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── UPDATE DIFFICULTY UPON SCORE CHANGE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── ESCALATING HINTS HANDLER ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  // ─── INACTIVITY TIMER (10s auto-hint) ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── CANVAS 2D ANIMATION (Process Execution Visualizer) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let tick = 0;

    const render = () => {
      tick++;
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

      // Draw CPU Core
      const cpuX = canvas.width / 2;
      const cpuY = 35;
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(cpuX - 60, cpuY - 20, 120, 40, [8]);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(osMode === 'rtos' ? 'RTOS HARD CPU' : 'CPU SCHEDULER', cpuX, cpuY + 4);

      // Animated Process Packets
      const packetCount = osMode === 'rtos' ? 3 : 5;
      for (let i = 0; i < packetCount; i++) {
        const offset = (tick * 1.5 + i * 70) % canvas.width;
        ctx.fillStyle = i === 0 && osInterruptTriggered ? '#ef4444' : '#10b981';
        ctx.beginPath();
        ctx.arc(offset, 35, 6, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, [osMode, osInterruptTriggered]);

  // ─── DISCOVERY HANDLER ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding! You understand safety-critical systems.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── PHASE ADVANCEMENT HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Explore software layers and spreadsheet logic.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test spreadsheet formulas and OS task execution in sandbox mode.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the ICSE Class 8 competency challenges.');
  }, []);

  // ─── PREDICTION HANDLER ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the formula in the live laboratory.');
  }, []);

  // ─── INTERACTIVE LAB HANDLERS ───
  const handleLayerClick = useCallback((layer: string) => {
    setSelectedLayer(layer);
    audioManager.play('tap');
    if (layer === 'hardware') speechManager.speak('Hardware: CPU, RAM, Hard Disk, and Input Output devices.');
    if (layer === 'system') speechManager.speak('System Software: Windows and BOSS Linux manage hardware resources.');
    if (layer === 'utility') speechManager.speak('Utility Software: Antivirus and Disk Cleanup maintain computer health.');
    if (layer === 'application') speechManager.speak('Application Software: Word and Excel perform user-specific tasks.');
  }, []);

  const handleOsModeSwitch = useCallback((mode: 'general' | 'rtos' | 'distributed') => {
    setOsMode(mode);
    audioManager.play('pop');
    if (mode === 'rtos') {
      speechManager.speak('RTOS mode enabled: guaranteed deadline response within milliseconds.');
    } else if (mode === 'distributed') {
      speechManager.speak('Distributed mode enabled: workload shared across networked servers.');
    } else {
      speechManager.speak('General Purpose multitasking desktop mode active.');
    }
  }, []);

  const handleTriggerInterrupt = useCallback(() => {
    setOsInterruptTriggered(true);
    audioManager.play('balance');
    setTimeout(() => {
      setOsInterruptTriggered(false);
    }, 1200);
  }, []);

  const handleCliCommandSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInputText.trim().toLowerCase();
    let reply = `Command not recognized: "${cmd}". Type "help" for valid commands.`;
    if (cmd === 'help') reply = 'Available commands: dir, cls, run excel, calc, rtos status';
    else if (cmd === 'dir') reply = 'Volume in drive C is CYBERKRAFT\nDirectory of C:\\Lab\n  AnnualMarks.xlsx  14 KB\n  SchoolBudget.xlsx  28 KB';
    else if (cmd === 'cls') {
      setCliOutputHistory([]);
      setCliInputText('');
      return;
    } else if (cmd === 'run excel') reply = 'Launching Microsoft Excel 2016 in GUI window...';
    else if (cmd === 'rtos status') reply = 'RTOS Status: 0 missed deadlines. Jitter < 0.2ms. Hard Determinism Active.';

    setCliOutputHistory(prev => [...prev, `> ${cliInputText}`, reply]);
    setCliInputText('');
    audioManager.play('tap');
  }, [cliInputText]);

  const handleDragIconStart = useCallback((iconName: string) => {
    setDraggedDesktopIcon(iconName);
    audioManager.play('pickup');
  }, []);

  const handleDropTrash = useCallback(() => {
    if (!draggedDesktopIcon) return;
    setTrashFiles(prev => [...prev, draggedDesktopIcon]);
    setFolderFiles(prev => prev.filter(f => f !== draggedDesktopIcon));
    audioManager.play('drop-correct');
    setDraggedDesktopIcon(null);
  }, [draggedDesktopIcon]);

  // ─── DRAG-LABEL SPECIFIC HANDLERS (with pickup / drop-correct / drop-wrong) ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetMatch = challenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetMatch) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  // ─── EXCEL SIMULATOR CALCULATIONS (Real-time Derived Values) ───
  const excelRowValues = useMemo(() => {
    return [1, 2, 3, 4, 5].map(rowNum => {
      const q = excelQty + (rowNum - 2) * 4;
      const p = excelUnitPrice + (rowNum - 2) * 5;
      const taxMultiplier = 1 + (excelTaxRate / 100);
      const calculatedTotal = q * p * taxMultiplier;

      // Error simulations
      let errorLabel: string | null = null;
      if (excelErrorSimType === 'div0' && rowNum === 3) errorLabel = '#DIV/0!';
      if (excelErrorSimType === 'value' && rowNum === 2) errorLabel = '#VALUE!';
      if (excelErrorSimType === 'name' && rowNum === 1) errorLabel = '#NAME?';
      if (excelErrorSimType === 'ref' && rowNum === 4) errorLabel = '#REF!';

      return {
        row: rowNum,
        item: `Item ${rowNum}`,
        qty: q,
        price: p,
        total: errorLabel || calculatedTotal.toFixed(2),
        isError: !!errorLabel,
      };
    });
  }, [excelQty, excelUnitPrice, excelTaxRate, excelErrorSimType]);

  // ─── CHALLENGE ANSWER SUBMISSION HANDLER ───
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
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Brilliant! That is completely correct.');
      setShowConfetti(true);
      setShowSparkle(true);
      setShowExplanation(true);

      // BKT Update
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      // SRS Update
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
        speechManager.speak('Let us study the complete solution step by step.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered Software Types, Operating Systems, and Excel Analytics.');
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

  // ─── DRAG SORT HANDLER ───
  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === challenge.sortItems?.length ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(finalOrder);
  }, [sortArrangement, challenge, handleAnswer]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-cyan-950/80 rounded-2xl border border-cyan-700/50 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">ICSE Class 8 Computer Science</span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase & Difficulty Navigation Pill */}
        <div className="flex items-center gap-2">
          <motion.span
            key={phase}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 bg-slate-800 text-xs font-semibold rounded-full border border-slate-700 text-slate-300 capitalize"
          >
            Phase: {phase}
          </motion.span>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950/90 text-rose-300 border border-rose-700'
                : 'bg-cyan-950/90 text-cyan-300 border border-cyan-700'
            }`}
          >
            {difficulty}
          </motion.span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 rounded-2xl border border-indigo-700/40 shadow-lg">
            <h2 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span>🚀</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-400/90 mt-2 font-medium">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Curiosity Diagnostic Challenge</span>
            <p className="text-base font-semibold text-white mt-1 mb-4">{DISCOVERY_QUESTION.question}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${opt}`}
                  className={`text-left p-4 rounded-xl border text-sm transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-cyan-500/80 hover:bg-slate-800'
                  }`}
                >
                  <span className="font-bold mr-2 text-cyan-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Determinism is critical.' : `👉 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Advance to Interactive Exploration"
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-cyan-600/30 flex items-center gap-2"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-4">
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-400">
            <span>
              Laboratory <strong className="text-cyan-400">{currentSlide + 1}</strong> of {EXPLORATION_STEPS.length}
            </span>
            <span>Interactive Concept Mastery</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-4"
            >
              <div>
                <h3 className="text-lg font-black text-cyan-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-400 text-xs md:text-sm font-medium mt-1">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB 1: SOFTWARE HIERARCHY & SYSTEM STACK (SVG DIAGRAM 1) ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="space-y-3">
                    {/* SVG Diagram 1: Architectural Hierarchy */}
                    <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 400 200" className="w-full h-44">
                        <defs>
                          <linearGradient id="appGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#0284c7" />
                            <stop offset="100%" stopColor="#38bdf8" />
                          </linearGradient>
                          <linearGradient id="utilGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#7e22ce" />
                            <stop offset="100%" stopColor="#c084fc" />
                          </linearGradient>
                          <linearGradient id="sysGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#047857" />
                            <stop offset="100%" stopColor="#34d399" />
                          </linearGradient>
                          <linearGradient id="hwGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#b45309" />
                            <stop offset="100%" stopColor="#fbbf24" />
                          </linearGradient>
                        </defs>
                        {/* Application Layer */}
                        <g onClick={() => handleLayerClick('application')} className="cursor-pointer">
                          <rect x="50" y="10" width="300" height="36" rx="6" fill="url(#appGrad)" stroke={selectedLayer === 'application' ? '#fff' : '#0369a1'} strokeWidth={selectedLayer === 'application' ? '2.5' : '1'} />
                          <text x="200" y="32" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Application Layer (Word, Excel, Browser)</text>
                        </g>
                        {/* Utility Layer */}
                        <g onClick={() => handleLayerClick('utility')} className="cursor-pointer">
                          <rect x="65" y="54" width="270" height="36" rx="6" fill="url(#utilGrad)" stroke={selectedLayer === 'utility' ? '#fff' : '#6b21a8'} strokeWidth={selectedLayer === 'utility' ? '2.5' : '1'} />
                          <text x="200" y="76" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Utility Software (Antivirus, Disk Cleanup)</text>
                        </g>
                        {/* System Software Layer */}
                        <g onClick={() => handleLayerClick('system')} className="cursor-pointer">
                          <rect x="80" y="98" width="240" height="36" rx="6" fill="url(#sysGrad)" stroke={selectedLayer === 'system' ? '#fff' : '#065f46'} strokeWidth={selectedLayer === 'system' ? '2.5' : '1'} />
                          <text x="200" y="120" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">System Software (OS: Windows / Linux)</text>
                        </g>
                        {/* Hardware Layer */}
                        <g onClick={() => handleLayerClick('hardware')} className="cursor-pointer">
                          <rect x="95" y="142" width="210" height="36" rx="6" fill="url(#hwGrad)" stroke={selectedLayer === 'hardware' ? '#fff' : '#92400e'} strokeWidth={selectedLayer === 'hardware' ? '2.5' : '1'} />
                          <text x="200" y="164" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Hardware (CPU, RAM, Storage, I/O)</text>
                        </g>
                        {/* Connecting arrows */}
                        <line x1="200" y1="46" x2="200" y2="54" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3,3" />
                        <line x1="200" y1="90" x2="200" y2="98" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3,3" />
                        <line x1="200" y1="134" x2="200" y2="142" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3,3" />
                      </svg>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      {[
                        { id: 'application', name: 'Application Software', examples: 'Word, Excel, Chrome, Photoshop', color: '#38bdf8' },
                        { id: 'utility', name: 'Utility Software', examples: 'Quick Heal, Disk Cleanup, Defrag, Zip', color: '#a855f7' },
                        { id: 'system', name: 'System Software (OS & Drivers)', examples: 'Windows, Linux, BOSS Linux, Printer Drivers', color: '#10b981' },
                        { id: 'hardware', name: 'Computer Hardware', examples: 'Intel/AMD CPU, RAM, SSD, GPU, Display', color: '#f59e0b' },
                      ].map(layer => (
                        <motion.button
                          key={layer.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleLayerClick(layer.id)}
                          aria-label={`Select layer: ${layer.name}`}
                          className={`p-2 rounded-lg border text-left transition-all ${
                            selectedLayer === layer.id
                              ? 'bg-slate-800 border-cyan-400 shadow-md'
                              : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-xs" style={{ color: layer.color }}>{layer.name}</span>
                            {selectedLayer === layer.id && <span className="text-[10px] text-cyan-400 font-semibold">Active Layer</span>}
                          </div>
                          <p className="text-[11px] text-slate-400">{layer.examples}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-center">
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Architectural Analysis</h4>
                    {selectedLayer === 'hardware' && (
                      <p className="text-sm text-amber-200 leading-relaxed">
                        <strong>Hardware Layer:</strong> Physical silicon chips, transistors, and memory banks. It understands only raw binary machine language (0s and 1s). It cannot coordinate user tasks without an Operating System.
                      </p>
                    )}
                    {selectedLayer === 'system' && (
                      <p className="text-sm text-emerald-200 leading-relaxed">
                        <strong>System Software:</strong> Sits directly on hardware. The OS (Windows, BOSS Linux) schedules the CPU, partitions RAM, manages file trees, and uses Device Drivers to talk to printers and graphics cards.
                      </p>
                    )}
                    {selectedLayer === 'utility' && (
                      <p className="text-sm text-purple-200 leading-relaxed">
                        <strong>Utility Software:</strong> The system maintenance toolkit. Tools like Quick Heal Antivirus protect against malware, while Disk Cleanup purges temporary junk files so storage runs fast.
                      </p>
                    )}
                    {selectedLayer === 'application' && (
                      <p className="text-sm text-cyan-200 leading-relaxed">
                        <strong>Application Software:</strong> Sits on top of the OS. Programs like Microsoft Word and Excel solve specific end-user problems (writing essays or computing mark sheets).
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ─── LAB 2: OS DISPATCHER & RTOS LATENCY (SVG DIAGRAM 2) ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex gap-2">
                      {(['general', 'rtos', 'distributed'] as const).map(mode => (
                        <motion.button
                          key={mode}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleOsModeSwitch(mode)}
                          aria-label={`Switch OS mode to ${mode}`}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${
                            osMode === mode ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {mode === 'general' ? 'Desktop OS' : mode === 'rtos' ? 'Real-Time (RTOS)' : 'Distributed Cluster'}
                        </motion.button>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleTriggerInterrupt}
                      aria-label="Simulate Critical Sensor Interrupt"
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-md shadow-rose-700/30"
                    >
                      <span>⚡</span> Simulate Sensor Event
                    </motion.button>
                  </div>

                  {/* SVG Diagram 2: OS Scheduling Determinism Timeline */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 130" className="w-full h-32">
                      <rect x="0" y="0" width="500" height="130" fill="#0f172a" rx="8" />
                      <text x="20" y="24" fill="#94a3b8" fontSize="10" fontWeight="bold">TASK EXECUTION &amp; TIMELINE SCHEDULING</text>
                      {/* Timeline bar */}
                      <line x1="40" y1="70" x2="460" y2="70" stroke="#334155" strokeWidth="3" />
                      {/* Bounded Deadline line */}
                      <line x1="380" y1="40" x2="380" y2="100" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" />
                      <text x="385" y="55" fill="#f87171" fontSize="9" fontWeight="bold">Hard Deadline</text>
                      {/* Tasks on timeline */}
                      {osMode === 'rtos' ? (
                        <g>
                          <rect x="50" y="55" width="100" height="30" rx="4" fill="#10b981" />
                          <text x="100" y="74" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">ABS Sensor Mod</text>
                          <rect x="160" y="55" width="120" height="30" rx="4" fill="#06b6d4" />
                          <text x="220" y="74" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Brake Actuation</text>
                          <circle cx="350" cy="70" r="10" fill="#10b981" />
                          <text x="350" y="74" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">✓</text>
                          <text x="300" y="115" fill="#34d399" fontSize="10">Deterministic: Completed within &lt;20ms</text>
                        </g>
                      ) : osMode === 'distributed' ? (
                        <g>
                          <rect x="50" y="55" width="120" height="30" rx="4" fill="#6366f1" />
                          <text x="110" y="74" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Node 1 (Cloud A)</text>
                          <rect x="180" y="55" width="120" height="30" rx="4" fill="#8b5cf6" />
                          <text x="240" y="74" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Node 2 (Cloud B)</text>
                          <text x="200" y="115" fill="#a78bfa" fontSize="10">Distributed MapReduce across server cluster</text>
                        </g>
                      ) : (
                        <g>
                          <rect x="50" y="55" width="80" height="30" rx="4" fill="#3b82f6" />
                          <text x="90" y="74" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Word App</text>
                          <rect x="140" y="55" width="110" height="30" rx="4" fill="#f59e0b" />
                          <text x="195" y="74" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Windows Update</text>
                          <rect x="260" y="55" width="90" height="30" rx="4" fill="#06b6d4" />
                          <text x="305" y="74" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Music Play</text>
                          <text x="180" y="115" fill="#fbbf24" fontSize="10">Timeslice Sharing (Non-deterministic jitter)</text>
                        </g>
                      )}
                    </svg>
                  </div>

                  {/* Canvas Animation */}
                  <canvas ref={canvasRef} width={500} height={70} className="w-full bg-slate-900 rounded-lg border border-slate-800" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400 font-semibold">Architecture:</span>
                      <p className="text-white font-bold mt-0.5 capitalize">{osMode} Operating System</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400 font-semibold">Determinism Guarantee:</span>
                      <p className={osMode === 'rtos' ? 'text-emerald-400 font-bold mt-0.5' : 'text-amber-400 font-bold mt-0.5'}>
                        {osMode === 'rtos' ? 'Hard Real-Time (< 5ms)' : 'Best-effort timeslice'}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400 font-semibold">Real-world Example:</span>
                      <p className="text-cyan-300 font-bold mt-0.5">
                        {osMode === 'general' ? 'Windows 11 / macOS' : osMode === 'rtos' ? 'Car ABS / Airbag Controller' : 'Google Search Cluster'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: GUI VS CLI INTERACTIVE SHELL ─── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {/* GUI Simulator */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
                        <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                          <span>🖥️</span> Graphical User Interface (GUI)
                        </span>
                        <div className="flex gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 mb-3">Drag files into the Recycle Bin:</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {folderFiles.map(f => (
                          <motion.div
                            key={f}
                            draggable
                            onDragStart={() => handleDragIconStart(f)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`File ${f}`}
                            className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-cyan-200 flex items-center gap-1.5 cursor-grab"
                          >
                            <span>📄</span> {f}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div
                      onDragOver={e => e.preventDefault()}
                      onDrop={handleDropTrash}
                      className="p-4 border-2 border-dashed border-slate-700 rounded-xl text-center bg-slate-950/60"
                    >
                      <span className="text-2xl">🗑️</span>
                      <p className="text-xs text-slate-400 mt-1">Drag-and-Drop Recycle Bin ({trashFiles.length} items)</p>
                    </div>
                  </div>

                  {/* CLI Simulator */}
                  <div className="p-4 bg-black rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 flex flex-col justify-between">
                    <div className="h-40 overflow-y-auto space-y-1">
                      {cliOutputHistory.map((line, idx) => (
                        <p key={idx} className="whitespace-pre-wrap">{line}</p>
                      ))}
                    </div>
                    <form onSubmit={handleCliCommandSubmit} className="mt-2 flex gap-1 border-t border-slate-800 pt-2">
                      <span className="text-emerald-500">&gt;</span>
                      <input
                        type="text"
                        value={cliInputText}
                        onChange={e => setCliInputText(e.target.value)}
                        placeholder="type help or dir..."
                        aria-label="CLI Command Input"
                        className="w-full bg-transparent text-emerald-300 focus:outline-none"
                      />
                    </form>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: EXCEL LIVE FORMULA & CELL REFERENCE ENGINE (SVG DIAGRAM 3) ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {/* Predict-Then-Check Hook inside Lab 4 */}
                  {!predictionMade && (
                    <div className="p-3 bg-indigo-950/70 border border-indigo-700/50 rounded-xl">
                      <p className="text-xs font-bold text-indigo-300">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Predict option ${i + 1}`}
                            className="p-2 bg-slate-800 rounded-lg text-xs text-left text-slate-200 hover:bg-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SVG Diagram 3: Excel Relative vs Absolute Reference Lock Visualizer */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 110" className="w-full h-28">
                      <rect x="0" y="0" width="500" height="110" fill="#020617" rx="8" />
                      <text x="20" y="20" fill="#38bdf8" fontSize="10" fontWeight="bold">SPREADSHEET REFERENCE PROPAGATION ENGINE</text>
                      {/* Box 1: Relative Reference */}
                      <rect x="25" y="32" width="200" height="65" rx="6" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
                      <text x="35" y="50" fill="#38bdf8" fontSize="10" fontWeight="bold">Relative: =A2 * B2</text>
                      <text x="35" y="68" fill="#94a3b8" fontSize="9">Copied down 1 row:</text>
                      <text x="35" y="85" fill="#34d399" fontSize="10" fontWeight="bold">Transforms into =A3 * B3 (Shifts)</text>
                      {/* Box 2: Absolute Reference */}
                      <rect x="260" y="32" width="215" height="65" rx="6" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
                      <text x="270" y="50" fill="#c084fc" fontSize="10" fontWeight="bold">Absolute: =A2 * $F$1</text>
                      <text x="270" y="68" fill="#94a3b8" fontSize="9">Copied down 1 row:</text>
                      <text x="270" y="85" fill="#f472b6" fontSize="10" fontWeight="bold">Transforms into =A3 * $F$1 (Locked!)</text>
                    </svg>
                  </div>

                  {/* Sliders for real-time spreadsheet updates */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Base Quantity (B2):</span> <strong className="text-cyan-400">{excelQty}</strong>
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={50}
                        value={excelQty}
                        onChange={e => setExcelQty(Number(e.target.value))}
                        aria-label="Set Excel Quantity"
                        className="w-full mt-1 accent-cyan-500"
                      />
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Unit Price (C2):</span> <strong className="text-cyan-400">₹{excelUnitPrice}</strong>
                      </label>
                      <input
                        type="range"
                        min={5}
                        max={100}
                        value={excelUnitPrice}
                        onChange={e => setExcelUnitPrice(Number(e.target.value))}
                        aria-label="Set Excel Unit Price"
                        className="w-full mt-1 accent-cyan-500"
                      />
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Pinned GST Rate ($F$1):</span> <strong className="text-cyan-400">{excelTaxRate}%</strong>
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={28}
                        value={excelTaxRate}
                        onChange={e => setExcelTaxRate(Number(e.target.value))}
                        aria-label="Set Pinned GST Rate"
                        className="w-full mt-1 accent-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Spreadsheet Grid Mockup */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-900 text-slate-400 border-b border-slate-800">
                          <th className="p-2 border-r border-slate-800 text-center w-10">#</th>
                          <th className="p-2 border-r border-slate-800">A (Item Name)</th>
                          <th className="p-2 border-r border-slate-800">B (Qty)</th>
                          <th className="p-2 border-r border-slate-800">C (Unit Price)</th>
                          <th className="p-2 border-r border-slate-800">D Total Formula: =B2*C2*(1+$F$1)</th>
                          <th className="p-2 bg-indigo-950/40 text-indigo-300">F1 (Tax Constant: {excelTaxRate}%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {excelRowValues.map(r => (
                          <tr key={r.row} className="border-b border-slate-800/60 hover:bg-slate-900/40">
                            <td className="p-2 border-r border-slate-800 text-center font-bold text-slate-500">{r.row}</td>
                            <td className="p-2 border-r border-slate-800 font-medium text-slate-200">{r.item}</td>
                            <td className="p-2 border-r border-slate-800 text-cyan-300">{r.qty}</td>
                            <td className="p-2 border-r border-slate-800 text-cyan-300">₹{r.price}</td>
                            <td className={`p-2 border-r border-slate-800 font-bold ${r.isError ? 'text-rose-400' : 'text-emerald-400'}`}>
                              ₹{r.total}
                            </td>
                            {r.row === 1 ? (
                              <td className="p-2 font-bold text-indigo-300 bg-indigo-950/20">{excelTaxRate}%</td>
                            ) : (
                              <td className="p-2 text-slate-600">---</td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: INTERACTIVE CHART STUDIO (SVG DIAGRAM 4) ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex gap-2">
                      {(['column', 'bar', 'line', 'pie'] as const).map(t => (
                        <motion.button
                          key={t}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setChartType(t);
                            audioManager.play('tap');
                          }}
                          aria-label={`Select chart type ${t}`}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${
                            chartType === t ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {t} Chart
                        </motion.button>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setChartShowLegend(prev => !prev);
                          audioManager.play('pop');
                        }}
                        aria-label="Toggle Chart Legend"
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          chartShowLegend ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {chartShowLegend ? 'Legend: ON' : 'Legend: OFF'}
                      </motion.button>
                    </div>
                  </div>

                  {/* SVG Chart Rendering Engine */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <h4 className="text-center font-bold text-sm text-cyan-300 mb-2">{chartTitleText}</h4>
                    <svg viewBox="0 0 500 200" className="w-full h-48">
                      {/* Column Chart */}
                      {chartType === 'column' && (
                        <g>
                          <line x1="50" y1="160" x2="450" y2="160" stroke="#475569" strokeWidth="2" />
                          <line x1="50" y1="20" x2="50" y2="160" stroke="#475569" strokeWidth="2" />
                          <text x="250" y="190" textAnchor="middle" fill="#94a3b8" fontSize="10">{chartXLabel}</text>
                          <text x="20" y="90" textAnchor="middle" fill="#94a3b8" fontSize="10" transform="rotate(-90 20 90)">{chartYLabel}</text>
                          {[
                            { name: 'Aarav', val: 85, x: 90 },
                            { name: 'Diya', val: 92, x: 170 },
                            { name: 'Kabir', val: 78, x: 250 },
                            { name: 'Meera', val: 96, x: 330 },
                            { name: 'Sanjay', val: 88, x: 410 },
                          ].map(d => {
                            const h = (d.val / 100) * 120;
                            return (
                              <g key={d.name}>
                                <rect x={d.x - 20} y={160 - h} width="40" height={h} rx="4" fill="#06b6d4" />
                                <text x={d.x} y={150 - h} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">{d.val}</text>
                                <text x={d.x} y="175" textAnchor="middle" fill="#94a3b8" fontSize="9">{d.name}</text>
                              </g>
                            );
                          })}
                        </g>
                      )}

                      {/* Bar Chart */}
                      {chartType === 'bar' && (
                        <g>
                          <line x1="120" y1="20" x2="120" y2="170" stroke="#475569" strokeWidth="2" />
                          {[
                            { name: 'Arunachal Pradesh', val: 85, y: 35 },
                            { name: 'Himachal Pradesh', val: 92, y: 70 },
                            { name: 'Madhya Pradesh', val: 78, y: 105 },
                            { name: 'Andhra Pradesh', val: 96, y: 140 },
                          ].map(d => {
                            const w = (d.val / 100) * 300;
                            return (
                              <g key={d.name}>
                                <text x="110" y={d.y + 12} textAnchor="end" fill="#94a3b8" fontSize="9">{d.name}</text>
                                <rect x="120" y={d.y} width={w} height="18" rx="4" fill="#a855f7" />
                                <text x={125 + w} y={d.y + 13} fill="#ffffff" fontSize="9" fontWeight="bold">{d.val}</text>
                              </g>
                            );
                          })}
                        </g>
                      )}

                      {/* Line Chart */}
                      {chartType === 'line' && (
                        <g>
                          <line x1="50" y1="160" x2="450" y2="160" stroke="#475569" strokeWidth="2" />
                          <line x1="50" y1="20" x2="50" y2="160" stroke="#475569" strokeWidth="2" />
                          <path
                            d="M 80 140 L 150 110 L 220 70 L 290 50 L 360 90 L 430 130"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="3"
                          />
                          {[
                            { m: 'Jan', x: 80, y: 140, v: '22°' },
                            { m: 'Mar', x: 150, y: 110, v: '28°' },
                            { m: 'May', x: 220, y: 70, v: '38°' },
                            { m: 'Jul', x: 290, y: 50, v: '42°' },
                            { m: 'Sep', x: 360, y: 90, v: '32°' },
                            { m: 'Nov', x: 430, y: 130, v: '24°' },
                          ].map(pt => (
                            <g key={pt.m}>
                              <circle cx={pt.x} cy={pt.y} r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                              <text x={pt.x} y={pt.y - 8} textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">{pt.v}</text>
                              <text x={pt.x} y="175" textAnchor="middle" fill="#94a3b8" fontSize="9">{pt.m}</text>
                            </g>
                          ))}
                        </g>
                      )}

                      {/* Pie Chart */}
                      {chartType === 'pie' && (
                        <g transform="translate(250, 100)">
                          <path d="M 0 0 L 0 -70 A 70 70 0 0 1 70 0 Z" fill="#06b6d4" />
                          <path d="M 0 0 L 70 0 A 70 70 0 0 1 -49 49 Z" fill="#3b82f6" />
                          <path d="M 0 0 L -49 49 A 70 70 0 0 1 0 -70 Z" fill="#10b981" />
                          <text x="30" y="-30" fill="#fff" fontSize="10" fontWeight="bold">Salaries 25%</text>
                          <text x="15" y="45" fill="#fff" fontSize="10" fontWeight="bold">Maint 35%</text>
                          <text x="-55" y="-15" fill="#fff" fontSize="10" fontWeight="bold">Books 40%</text>
                        </g>
                      )}
                    </svg>

                    {chartShowLegend && (
                      <div className="flex justify-center gap-4 mt-2 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-cyan-400 rounded-sm inline-block" /> Series 1: Primary Data</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-400 rounded-sm inline-block" /> Series 2: Benchmark</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons for Exploration */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              aria-label="Previous Lab Slide"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                aria-label="Next Lab Slide"
                className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Go to Free Sandbox Mode"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-4">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-cyan-300">Free Interactive Sandbox: No Grading</h3>
            <p className="text-xs text-slate-400 mt-1">
              Experiment with formula calculations, inject worksheet errors, or switch OS task dispatching without penalty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Error Injection Lab */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Spreadsheet Error Injector</span>
              <div className="flex flex-wrap gap-2">
                {(['none', 'div0', 'value', 'name', 'ref'] as const).map(err => (
                  <motion.button
                    key={err}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setExcelErrorSimType(err);
                      audioManager.play('pop');
                    }}
                    aria-label={`Inject error: ${err}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold ${
                      excelErrorSimType === err ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {err === 'none' ? 'Clean Data' : `#${err.toUpperCase()}`}
                  </motion.button>
                ))}
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                {excelErrorSimType === 'none' && <p className="text-emerald-300">All formulas evaluating correctly.</p>}
                {excelErrorSimType === 'div0' && <p className="text-rose-300">#DIV/0! injected: Formula divided by empty/zero cell.</p>}
                {excelErrorSimType === 'value' && <p className="text-rose-300">#VALUE! injected: Attempted mathematical operation on text data.</p>}
                {excelErrorSimType === 'name' && <p className="text-rose-300">#NAME? injected: Function misspelled as =SUN(B1:B5).</p>}
                {excelErrorSimType === 'ref' && <p className="text-rose-300">#REF! injected: Referenced column or sheet was deleted.</p>}
              </div>
            </div>

            {/* Live Chart Quick Switcher */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Quick Chart Switcher</span>
              <div className="flex gap-2">
                {(['column', 'bar', 'line', 'pie'] as const).map(t => (
                  <motion.button
                    key={t}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setChartType(t);
                      audioManager.play('tap');
                    }}
                    aria-label={`Set sandbox chart to ${t}`}
                    className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                      chartType === t ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {t}
                  </motion.button>
                ))}
              </div>
              <p className="text-xs text-slate-400">Current layout: <strong className="text-white capitalize">{chartType}</strong> chart</p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Ready for ICSE Challenges"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
            >
              I am Ready for the Challenges! →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: STRUCTURED CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-4">
          {/* Progress & Badge bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300">
                Challenge <strong className="text-cyan-400">{currentChallenge + 1}</strong> of {filteredChallenges.length}
              </span>
              <span className="text-slate-400 uppercase tracking-wider text-[11px]">
                Competency: <strong className="text-cyan-300">{challenge.competencyLevel}</strong>
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card with Visual Feedback Flash & Shake */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={
              wrongShake
                ? { x: [0, -10, 10, -10, 10, 0], opacity: 1, y: 0 }
                : { x: 0, opacity: 1, y: 0 }
            }
            transition={{ duration: 0.4 }}
            className={`p-5 md:p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/80 border-rose-500 shadow-rose-900/50'
                : 'bg-slate-900/90 border-slate-800 shadow-xl'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-cyan-950 border border-cyan-800 text-cyan-300">
                {challenge.type}
              </span>
              <span className="text-xs text-slate-400">Node: {challenge.nodeId}</span>
            </div>

            <p className="text-base font-semibold text-white leading-relaxed mb-4">{challenge.question}</p>

            {/* ─── MCQ / CLASSIFY / DISTINGUISH / MATCH ─── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(idx)}
                    disabled={showExplanation || answerRevealed}
                    aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-start gap-3 ${
                      showExplanation && idx === challenge.correctIndex
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-cyan-500'
                    }`}
                  >
                    <span className="font-bold text-cyan-400">{String.fromCharCode(65 + idx)}.</span>
                    <span className="flex-1 leading-snug">{opt}</span>
                    {showExplanation && idx === challenge.correctIndex && <span className="text-emerald-400 font-bold">✓</span>}
                  </motion.button>
                ))}
              </div>
            )}

            {/* ─── DRAG LABEL CHALLENGE ─── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map(item => (
                    <motion.div
                      key={item.label}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Draggable label: ${item.label}`}
                      className="px-3.5 py-2 bg-cyan-700 hover:bg-cyan-600 rounded-xl text-xs font-bold text-white cursor-grab shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                  {Object.keys(challenge.correctMapping || {}).map(targetId => (
                    <div
                      key={targetId}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-3 bg-slate-900 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-between"
                    >
                      <span className="text-xs text-slate-400 capitalize">{targetId.replace('box_', '')} target:</span>
                      <strong className="text-xs font-bold text-emerald-300">
                        {droppedLabels[targetId] || '[Drop Here]'}
                      </strong>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  aria-label="Validate Drag Labels"
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-600/30"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* ─── DRAG SORT CHALLENGE ─── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(i => challenge.sortItems![i])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => {
                        setDraggedItem(String(displayIdx));
                        audioManager.play('pickup');
                      }}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      aria-label={`Step ${displayIdx + 1}: ${item}`}
                      className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-cyan-900 text-cyan-300 flex items-center justify-center font-bold text-[10px]">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Submit Sorted Sequence"
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-600/30"
                >
                  Confirm Execution Order
                </motion.button>
              </div>
            )}

            {/* ─── NUMERIC CHALLENGE ─── */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated number"
                    aria-label="Numeric answer input"
                    className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                  {challenge.unit && <span className="text-xs text-slate-400">{challenge.unit}</span>}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit Numeric Answer"
                    className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-600/30"
                  >
                    Check Value
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── CONSTRUCT CHALLENGE ─── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setConstructParts(prev => [...prev, part]);
                        audioManager.play('tap');
                      }}
                      aria-label={`Add token: ${part}`}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-xs font-mono font-bold text-white"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 min-h-[50px] flex flex-wrap items-center gap-2">
                  {constructParts.map((p, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-md text-xs font-mono text-cyan-300 flex items-center gap-1"
                    >
                      {p}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-300 font-bold ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click tokens above to assemble formula</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Validate Formula Construction"
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-600/30"
                >
                  Verify Formula Construction
                </motion.button>
              </div>
            )}

            {/* ─── CLICK-TO-REVEAL STEP-BY-STEP EXPLANATION ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-slate-950/80 rounded-xl border border-cyan-700/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Step-by-Step Solution:</span>
                  <span className="text-xs text-slate-400">
                    Step {Math.min(revealedSteps + 1, challenge.explanation.split('. ').filter(s => s.trim().length > 0).length)} of{' '}
                    {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
                  </span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-300 leading-relaxed"
                    >
                      <strong className="text-cyan-400 mr-1.5">{idx + 1}.</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Reveal next step of explanation"
                      className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Advance to Next Challenge"
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Mission →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REFLECTION SECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 rounded-3xl border border-emerald-600/50 shadow-2xl text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-black text-white">Mission Accomplished!</h2>
            <p className="text-sm text-emerald-300 font-semibold">
              Final System Score: {Math.max(0, 100 - errors * 4)}% | Mastery: <span className="uppercase text-white">{masteryLevel}</span>
            </p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">Performance Assessment:</h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {errors === 0
                ? 'PERFECT SCORE! You have mastered software classification, OS architectures, deterministic scheduling, and Excel analytical engineering completely!'
                : errors <= 3
                ? 'Excellent performance! You demonstrate solid command over operating system concepts and spreadsheet formulas. Review your profile below to secure 100%.'
                : 'Good effort! You are making steady progress. Review the misconceptions below and retry the labs to master the technical nuances.'}
            </p>
          </div>

          {/* ─── STRUCTURAL REQUIREMENT: REFLECTION SECTION ─── */}
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-indigo-700/50 space-y-4">
            <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
              <span>💭</span> Deep Learning Reflections
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflection1}
                  onChange={e => setReflection1(e.target.value)}
                  placeholder="e.g. How an RTOS requires strict bounded deadlines, unlike desktop operating systems..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflection2}
                  onChange={e => setReflection2(e.target.value)}
                  placeholder="e.g. System software is the foundation, application software is what you use to create work..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflection3}
                  onChange={e => setReflection3(e.target.value)}
                  placeholder="e.g. Automated school grading sheets, accounting taxes with $ absolute pinning, and medical equipment controllers..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Misconceptions Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Profile:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-300 font-semibold">❌ {m.misconception}</p>
                    <p className="text-emerald-300">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Review Schedule */}
          <div className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-800/50 text-xs space-y-1">
            <h4 className="font-bold text-indigo-300">Spaced Repetition Schedule (SM-2 Memory Retention):</h4>
            <p className="text-slate-300">
              Based on your score, your first review interval is scheduled in{' '}
              <strong className="text-indigo-200">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
            </p>
          </div>

          {/* Real World Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <span>🎯</span> Real-World Practical Mission: {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-bold text-cyan-400">{i + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C8_ComputerScienceSoftwareTypesSystemSim;
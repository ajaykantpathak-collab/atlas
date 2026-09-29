'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERAL CONSTANTS ───
const NODE_C6_CS_021 = 'c6_cs_021'; // Algorithms: definition, properties, examples (swap, largest of 3)
const NODE_C6_CS_022 = 'c6_cs_022'; // Flowcharts: symbols, logic flow, branching
const NODE_C6_CS_023 = 'c6_cs_023'; // Spreadsheet intro: grid, rows, cols, cell addresses, formula bar
const NODE_C6_CS_024 = 'c6_cs_024'; // Excel calculations: SUM, AVERAGE, formulas, automatic update
const NODE_C6_CS_025 = 'c6_cs_025'; // Excel formatting & saving: styles, colors, borders, .xlsx, workbook vs sheet
const NODE_C6_CS_026 = 'c6_cs_026'; // Networking: LAN, WAN, WLAN, packets, bandwidth, HTTP/FTP/SMTP, devices

const ALL_NODE_IDS = [
  NODE_C6_CS_021,
  NODE_C6_CS_022,
  NODE_C6_CS_023,
  NODE_C6_CS_024,
  NODE_C6_CS_025,
  NODE_C6_CS_026
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'CyberCity Science Fair: The Computer Lab Challenge',
  intro:
    'You have been appointed Chief IT Architect for the St. Jude ICSE School Science Exhibition in Bengaluru. You need to plan algorithms, map flowcharts, build a live Excel budget worksheet, and configure the school LAN to broadcast student projects across the globe!',
  context:
    'From Al-Khwarizmi step-by-step algorithms and flowchart diamond branches to live Excel =SUM recalculations and network packet routing across New Delhi and Mumbai servers, your computational thinking powers the entire fair.'
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question:
    'If you swap the contents of two pencil boxes A and B by directly writing A = B and then B = A, what happens to the original items in box A?',
  options: [
    'They swap perfectly without any problem',
    'Box A original items are permanently lost (overwritten by B)',
    'The computer creates a clone automatically',
    'Both boxes become completely empty'
  ],
  correctIndex: 1,
  hintAfter:
    "Think of two full cups of juice: if you pour cup B into cup A directly without a spare 3rd glass (T), cup A's juice spills and vanishes!"
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

// ─── 21 COMPREHENSIVE CHALLENGES ACROSS 6 NODES ───
const CHALLENGES: Challenge[] = [
  // Foundation Tier (1 - 7)
  {
    id: 'ch_f01',
    nodeId: NODE_C6_CS_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is NOT one of the 5 essential properties of an algorithm?',
    options: [
      'Finite (must end after a fixed number of steps)',
      'Definite (each step is unambiguous and precise)',
      'Written strictly in Java or C++ programming syntax',
      'Effective (steps are simple enough to carry out in finite time)'
    ],
    correctIndex: 2,
    explanation:
      'An algorithm is language-independent and written in plain English or numbered steps. Its 5 properties are: Finite, Definite, Input, Output, and Effective.',
    hints: [
      'Think about whether an algorithm requires a specific coding language or can be planned in simple words.',
      'Al-Khwarizmi formulated algorithms centuries before computers were invented.',
      'Algorithms are independent of any programming language syntax.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_f02',
    nodeId: NODE_C6_CS_022,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct geometric shapes to match each standard flowchart symbol function.',
    dragItems: [
      { label: 'Oval (Terminator)', targetId: 'slot_start' },
      { label: 'Parallelogram (I/O)', targetId: 'slot_io' },
      { label: 'Rectangle (Process)', targetId: 'slot_calc' },
      { label: 'Diamond (Decision)', targetId: 'slot_decision' }
    ],
    correctMapping: {
      slot_start: 'Oval (Terminator)',
      slot_io: 'Parallelogram (I/O)',
      slot_calc: 'Rectangle (Process)',
      slot_decision: 'Diamond (Decision)'
    },
    explanation:
      'Oval = Start/End terminator; Parallelogram = Input/Output (Read/Print); Rectangle = Process/Calculation (Sum = A+B); Diamond = Decision (Yes/No branch).',
    hints: [
      'The oval marks the race start and finish line.',
      'Data entering or leaving the system uses the slanted parallelogram.',
      'Computations happen in a rectangle, while binary choices fork in a diamond.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_f03',
    nodeId: NODE_C6_CS_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In Microsoft Excel, how is a cell address correctly formed and written?',
    options: [
      'Row number first, then column letter (e.g., 5C)',
      'Column letter first, then row number (e.g., C5)',
      'Sheet name only (e.g., Sheet1)',
      'Formula symbol followed by row (e.g., =5)'
    ],
    correctIndex: 1,
    explanation:
      'In Excel, columns are lettered (A, B, C...) and rows are numbered (1, 2, 3...). The cell address ALWAYS places the column letter first: C5, not 5C.',
    hints: [
      'Think of battleship coordinates: letter across top, number down side.',
      'Column letter comes first in alphabetical grid notation.',
      'C is column 3, 5 is row 5, making the address C5.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_f04',
    nodeId: NODE_C6_CS_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which mandatory symbol must be typed at the very beginning of any Excel calculation or formula?',
    options: [
      'Colon (:)',
      'Equal sign (=)',
      'Hash symbol (#)',
      'At symbol (@)'
    ],
    correctIndex: 1,
    explanation:
      'The equal sign (=) is the magic trigger that tells Excel what follows is a formula to calculate rather than plain text or a label.',
    hints: [
      'Without this leading character, typing SUM(A1:A5) just shows the word SUM on the screen.',
      'It is the mathematical symbol for equality.',
      'Every formula in Excel begins with =.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_f05',
    nodeId: NODE_C6_CS_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the fundamental difference between an Excel Workbook and a Worksheet?',
    options: [
      'A worksheet is the entire file (.xlsx) and a workbook is just a cell',
      'A workbook is the entire file that holds one or more worksheets (pages)',
      'Workbook is for numbers only; worksheet is for text only',
      'There is no difference; both terms mean exactly the same thing'
    ],
    correctIndex: 1,
    explanation:
      'A workbook is like a binder or notebook file saved as .xlsx, whereas a worksheet is an individual tab/page inside that workbook.',
    hints: [
      'Think of a physical notebook containing many ruled sheets of paper.',
      'The file on your computer hard drive with extension .xlsx is the workbook.',
      'Sheet1, Sheet2 tabs at the bottom represent individual worksheets.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_f06',
    nodeId: NODE_C6_CS_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which type of network connects computers within a single room or school computer lab?',
    options: [
      'WAN (Wide Area Network)',
      'LAN (Local Area Network)',
      'MAN (Metropolitan Area Network)',
      'SAN (Storage Area Network)'
    ],
    correctIndex: 1,
    explanation:
      'A LAN (Local Area Network) spans a small geographical area such as a school computer laboratory, home, or office building.',
    hints: [
      'Look for the acronym that starts with "Local".',
      'It covers short distances with high transmission speed.',
      'Computers sharing a printer in your school lab form a LAN.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_f07',
    nodeId: NODE_C6_CS_021,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the correct sequence of steps to swap the values of variables A and B using temporary variable T.',
    sortItems: [
      'Copy the value of A into temporary storage T (T = A)',
      'Copy the value of B into A (A = B)',
      'Copy the saved value in T into B (B = T)',
      'Output the newly swapped values of A and B'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'To swap without losing data: 1. Save A in T. 2. Overwrite A with B. 3. Put T into B. 4. Output A and B.',
    hints: [
      'First step must preserve A before it gets overwritten.',
      'Second step puts B into A.',
      'Third step moves the preserved value from T into B.'
    ],
    misconceptionIndex: 0
  },

  // Standard Tier (8 - 14)
  {
    id: 'ch_s08',
    nodeId: NODE_C6_CS_021,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the algorithmic steps to find the largest of three numbers A, B, and C.',
    availableParts: ['Read A, B, C', 'If A > B set L = A else L = B', 'If C > L set L = C', 'Print L and Stop'],
    targetState: 'Read A, B, C If A > B set L = A else L = B If C > L set L = C Print L and Stop',
    validationHint: 'Add all four statements in logical sequential order from input to output.',
    explanation:
      'Algorithm: 1. Read A, B, C. 2. Set L to the larger of A and B. 3. Compare winner L with C and update if C > L. 4. Print largest value L.',
    hints: [
      'Start with reading the three input values.',
      'Compare first two numbers to find the intermediate leader.',
      'Compare that leader with the third number C, then print L.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_s09',
    nodeId: NODE_C6_CS_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a flowchart checking if Marks >= 40, what must be written on the two exit arrows originating from the decision diamond?',
    options: [
      'One arrow labelled "Input", one arrow labelled "Output"',
      'Two exit arrows labelled "Yes" (True) and "No" (False)',
      'Only one single arrow heading straight to End',
      'Arrows labelled "Row" and "Column"'
    ],
    correctIndex: 1,
    explanation:
      'A decision diamond tests a boolean condition and must always have exactly two branching exits clearly labelled "Yes" (or True) and "No" (or False).',
    hints: [
      'A question has two possible answers: pass or fail / yes or no.',
      'Branching allows the computer to choose between two alternative pathways.',
      'Both exits must be explicitly labelled Yes and No.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_s10',
    nodeId: NODE_C6_CS_023,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How many total individual cells are contained in the rectangular Excel range A1:C4?',
    correctAnswer: 12,
    tolerance: 0,
    unit: 'cells',
    explanation:
      'Range A1:C4 spans Columns A, B, C (3 columns) across Rows 1, 2, 3, 4 (4 rows). Total cells = 3 × 4 = 12 cells.',
    hints: [
      'Count the number of columns from A to C (A, B, C = 3).',
      'Count the number of rows from 1 to 4 (1, 2, 3, 4 = 4).',
      'Multiply columns by rows: 3 × 4.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_s11',
    nodeId: NODE_C6_CS_024,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If cells B2:B5 contain student test marks 80, 70, 90, and 60, what exact value will appear for =SUM(B2:B5)?',
    correctAnswer: 300,
    tolerance: 0,
    unit: 'total marks',
    explanation:
      '=SUM(B2:B5) calculates 80 + 70 + 90 + 60 = 300.',
    hints: [
      'Add all 4 numbers in the range together.',
      '80 + 70 = 150.',
      '150 + 90 = 240, and 240 + 60 = 300.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_s12',
    nodeId: NODE_C6_CS_024,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For the same marks in B2:B5 (80, 70, 90, 60), what numeric value is displayed by =AVERAGE(B2:B5)?',
    correctAnswer: 75,
    tolerance: 0,
    unit: 'mean mark',
    explanation:
      '=AVERAGE(B2:B5) calculates the arithmetic mean: Sum (300) divided by count (4) = 75.',
    hints: [
      'AVERAGE in Excel means the arithmetic mean.',
      'Total sum is 300 across 4 students.',
      'Divide 300 by 4 to get 75.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_s13',
    nodeId: NODE_C6_CS_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why is saving your spreadsheet with the standard .xlsx extension critical before exiting?',
    options: [
      'It compresses the file so it uses zero bytes of memory',
      'It informs the operating system to open the workbook correctly with Microsoft Excel and protects unsaved RAM data',
      'It converts all numbers into secret encrypted code',
      'It prevents other users from changing the font to bold'
    ],
    correctIndex: 1,
    explanation:
      'The .xlsx extension is the standard Excel XML format tag. Saving writes volatile RAM changes onto persistent disk storage and ensures proper file association.',
    hints: [
      'Unsaved changes exist only in temporary memory (RAM).',
      'File extensions tell Windows or macOS which application opens the file.',
      'Saving as .xlsx guarantees your sheets, formatting, and formulas are preserved.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_s14',
    nodeId: NODE_C6_CS_026,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match the internet protocol to its exact purpose: HTTP, FTP, and SMTP.',
    options: [
      'HTTP for Web Pages, FTP for File Transfers, SMTP for Sending Email',
      'HTTP for Sending Email, FTP for Web Pages, SMTP for Wi-Fi',
      'HTTP for File Transfers, FTP for Email, SMTP for Web Pages',
      'HTTP for Hardware cables, FTP for Bluetooth, SMTP for Modems'
    ],
    correctIndex: 0,
    explanation:
      'HTTP = Hypertext Transfer Protocol (Web pages), FTP = File Transfer Protocol (Upload/Download files), SMTP = Simple Mail Transfer Protocol (Outgoing email).',
    hints: [
      'HTTP has "Hypertext" which is used in HTML web pages.',
      'FTP has "File" for file transfers.',
      'SMTP has "Mail" for electronic email.'
    ],
    misconceptionIndex: 5
  },

  // Advanced Tier (15 - 21)
  {
    id: 'ch_a15',
    nodeId: NODE_C6_CS_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student writes: "Step 1: Read X. Step 2: Keep adding 2 to X until it reaches infinity. Step 3: Print X." Why is this NOT a valid algorithm?',
    options: [
      'It uses the variable X which is not allowed in Class 6',
      'It violates the Finiteness property because the step sequence will never terminate',
      'It uses addition instead of subtraction',
      'Step 3 is written before Step 1'
    ],
    correctIndex: 1,
    explanation:
      'An algorithm must be finite; it must terminate after a fixed, countable number of operations. An infinite loop that never halts cannot produce an output.',
    hints: [
      'Can a computer ever finish counting to infinity?',
      'Review the five core properties of algorithms.',
      'Finiteness demands a guaranteed stopping point.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_a16',
    nodeId: NODE_C6_CS_022,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order the flowchart stages for determining if a given number N is EVEN or ODD.',
    sortItems: [
      'Oval: Start',
      'Parallelogram: Input N',
      'Diamond: Is N divisible by 2 with remainder 0?',
      'Parallelograms: Yes -> Print "Even" | No -> Print "Odd"',
      'Oval: End'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      'Standard flow: 1. Start oval -> 2. Input N parallelogram -> 3. Decision diamond -> 4. Yes/No output parallelograms -> 5. Converge to End oval.',
    hints: [
      'Every flowchart opens with Start and terminates with End.',
      'Input must be read before testing divisibility in the diamond.',
      'Branching outputs occur before finally terminating at End.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_a17',
    nodeId: NODE_C6_CS_024,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the precise Excel formula to calculate the average score of cells D2 through D15.',
    availableParts: ['=', 'AVERAGE', '(', 'D2:D15', ')', 'SUM', '+'],
    targetState: '= AVERAGE ( D2:D15 )',
    validationHint: 'Assemble the formula starting with =, the function name, opening bracket, range with colon, and closing bracket.',
    explanation:
      'The exact syntax is =AVERAGE(D2:D15). The colon denotes continuous cell range from D2 through D15.',
    hints: [
      'Must begin with =',
      'Use the AVERAGE function name followed by (',
      'Specify range D2:D15 and close with )'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_a18',
    nodeId: NODE_C6_CS_025,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A teacher wants to make the table headers "Subject", "Marks", and "Rank" stand out with dark text and a yellow background. Which two formatting tools should she select?',
    options: [
      'Italic and Clear Contents',
      'Bold font style and Fill Colour (paint bucket)',
      'Underline and Delete Sheet',
      'Zoom Out and Rename Workbook'
    ],
    correctIndex: 1,
    explanation:
      'Bold makes characters thick and dark, while Fill Colour paints the background fill of selected cells with yellow.',
    hints: [
      'Thick dark letters come from Bold formatting.',
      'Painting the background of a cell uses the Fill Colour bucket icon.',
      'Bold + Fill Colour creates high-contrast, professional headers.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_a19',
    nodeId: NODE_C6_CS_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A photo sent from Delhi to London is broken into small pieces called packets. If one packet gets lost during transmission, what happens?',
    options: [
      'The entire photo must be re-transmitted from scratch',
      'Only the missing packet is resent, saving time and network bandwidth',
      'The internet in both cities shuts down',
      'The photo permanently loses its color'
    ],
    correctIndex: 1,
    explanation:
      'Packet-switched networking is efficient: each packet has headers with sequence numbers and destination addresses. If one packet drops, only that single packet is re-requested.',
    hints: [
      'Think of jigsaw puzzle pieces: if you lose one piece, you only order that single piece.',
      'Packets travel independently across multiple router paths.',
      'Selective re-transmission makes packet networks resilient and fast.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_a20',
    nodeId: NODE_C6_CS_026,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Identify the distinct roles of network hardware: Router, Switch, and Modem.',
    options: [
      'Router routes between networks; Switch connects devices in LAN; Modem converts digital/analog for ISP',
      'Router converts analog signals; Switch connects to London; Modem prints Excel sheets',
      'Router is only for Wi-Fi; Switch is for electricity; Modem writes algorithms',
      'All three devices perform the identical task with different names'
    ],
    correctIndex: 0,
    explanation:
      'Router connects distinct networks and directs traffic packets; Switch connects local devices inside a LAN via MAC addresses; Modem modulates/demodulates digital signals over ISP lines.',
    hints: [
      'Modem = MOdulator-DEModulator connecting to ISP.',
      'Switch directs traffic inside a single LAN room.',
      'Router chooses the best path between different wide networks.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_a21',
    nodeId: NODE_C6_CS_022,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Look at a flowchart where a diamond asks "Is Score >= 50?" but has only one arrow pointing to "Print Pass" and no arrow for failing marks. What CISCE exam error has occurred?',
    options: [
      'The oval is missing its color',
      'The decision diamond lacks complete binary branching (missing "No" / False pathway)',
      'The flowchart is too small',
      'The parallelogram should be replaced by a circle'
    ],
    correctIndex: 1,
    explanation:
      'A decision diamond MUST account for both boolean outcomes. Omitting the "No" branch leaves failing students in an undefined dead-end logic flow.',
    hints: [
      'What happens if a student scores 35?',
      'Every diamond decision requires both Yes and No paths.',
      'Incomplete branching is a major flowchart defect.'
    ],
    misconceptionIndex: 1
  }
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
  nodeId: NODE_C6_CS_021,
  title: 'Algorithms, Flowcharts, Spreadsheets & Networking',
  definition:
    'An algorithm is a finite, definite set of step-by-step instructions that accepts input and produces output. Flowcharts represent algorithms using standard geometric symbols. Spreadsheets (Excel) organise data into rows and columns with formulas like SUM and AVERAGE. Computer networks (LAN, WAN, WLAN) transfer data packets across devices using protocols like HTTP, FTP, and SMTP.',
  eli5:
    'An algorithm is a clear recipe that always finishes. A flowchart is a picture map of that recipe using special shapes. Excel is a smart table of boxes that does instant math when you type =, and networks let computers share those recipes and tables as tiny packets through Wi-Fi and cables!',
  misconceptions: [
    {
      misconception: 'Algorithms can run infinitely without stopping, and variables can be swapped directly as A=B and B=A.',
      correction: 'Algorithms must be finite. Swapping requires a temporary variable T (T=A, A=B, B=T) to avoid overwriting A.'
    },
    {
      misconception: 'Any shape can be used for any flowchart step, such as using a rectangle for Start or Print.',
      correction: 'Flowchart symbols are standardized: Ovals for Start/End, Parallelograms for Input/Output, Rectangles for Calculations, and Diamonds for Decisions.'
    },
    {
      misconception: 'Excel cell addresses can be written with numbers first (e.g., 2B) and the formula bar only shows formulas.',
      correction: 'Cell addresses always list Column letter then Row number (B2). The formula bar displays whatever is in the active cell: text, numbers, or formulas.'
    },
    {
      misconception: 'The equal sign (=) is optional when using =SUM() and AVERAGE calculates the median.',
      correction: 'The = sign is strictly required to trigger calculation mode; AVERAGE always computes the arithmetic mean.'
    },
    {
      misconception: 'Workbook and worksheet are identical terms, and file extension .xlsx does not matter.',
      correction: 'A workbook is the entire .xlsx file; a worksheet is a single page/grid inside it. The .xlsx extension is vital for file association.'
    },
    {
      misconception: 'A router, modem, and switch do the exact same thing, and WLAN covers entire countries.',
      correction: 'Modems connect to the ISP, routers connect different networks, switches connect devices in a LAN. WLAN is a local wireless network (Wi-Fi).'
    }
  ],
  diagnosticQuestions: [
    {
      question: 'What are the 5 properties of an algorithm?',
      options: ['Finite, Definite, Input, Output, Effective', 'Fast, Colored, Digital, Java, Short', 'Large, Looping, Infinite, Screen, Print', 'Oval, Rectangle, Diamond, Line, Tab'],
      correctIndex: 0
    },
    {
      question: 'Which flowchart symbol represents a decision with Yes/No branches?',
      options: ['Oval', 'Rectangle', 'Diamond', 'Parallelogram'],
      correctIndex: 2
    },
    {
      question: 'What is the address of the cell at column D and row 8?',
      options: ['8D', 'D8', 'D-8', 'Cell_D'],
      correctIndex: 1
    },
    {
      question: 'What does =SUM(A1:A4) calculate if cells are 10, 20, 30, 40?',
      options: ['25', '100', '10203040', '400'],
      correctIndex: 1
    },
    {
      question: 'Which tool fills the background of an Excel cell with color?',
      options: ['Font Size', 'Fill Colour bucket', 'Borders', 'Italic'],
      correctIndex: 1
    },
    {
      question: 'What protocol is used by web browsers to load HTML web pages?',
      options: ['SMTP', 'FTP', 'HTTP', 'LAN'],
      correctIndex: 2
    },
    {
      question: 'What is the smallest unit into which files are broken for network transmission?',
      options: ['Packets', 'Sheets', 'Diamonds', 'Bytes only'],
      correctIndex: 0
    },
    {
      question: 'What is the formula to calculate the average of cells B2 to B6?',
      options: ['=AVERAGE(B2:B6)', 'AVERAGE(B2..B6)', '=MEAN(B2:B6)', '=SUM(B2:B6)/10'],
      correctIndex: 0
    }
  ],
  masteryCriteria:
    'Demonstrate mastery across algorithmic step design, variable swapping with temporary storage, standardized flowchart symbols and branching, Excel cell addressing, live SUM/AVERAGE formula recalculation, workbook formatting/saving, and LAN/WAN packet networking.'
};

// ─── BRILLIANT INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Algorithm Variable Swap & Step Tracer',
    instruction: 'Drag variable values between Memory A, B, and Temporary T to master how data is swapped without data loss.',
    interactionType: 'swap-memory',
    nodeId: NODE_C6_CS_021
  },
  {
    title: 'Lab 2: Interactive Flowchart Decision Engine',
    instruction: 'Toggle test score inputs and watch the execution pulse illuminate through the Oval, Parallelogram, and Decision Diamond.',
    interactionType: 'flowchart-trace',
    nodeId: NODE_C6_CS_022
  },
  {
    title: 'Lab 3: Live Excel Spreadsheet Grid & Address Finder',
    instruction: 'Click any cell on the grid to inspect its Column letter, Row number, Name Box address, and Formula Bar preview.',
    interactionType: 'grid-inspector',
    nodeId: NODE_C6_CS_023
  },
  {
    title: 'Lab 4: Dynamic Formula & Recalculation Engine',
    instruction: 'Edit student marks in real-time and observe =SUM() and =AVERAGE() recalculate instantly.',
    interactionType: 'calc-engine',
    nodeId: NODE_C6_CS_024
  },
  {
    title: 'Lab 5: Network Packet Router & Bandwidth Pipeline',
    instruction: 'Select a network protocol (HTTP/FTP/SMTP) and adjust the bandwidth slider to route data packets from Delhi to London.',
    interactionType: 'packet-router',
    nodeId: NODE_C6_CS_026
  }
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you change Priya marks in cell B3 from 70 to 90, what happens to =SUM(B2:B5)?',
    options: [
      'The sum will increase by 20 automatically',
      'The sum stays unchanged until you retype the formula',
      'The cell displays an error message',
      'The entire sheet resets to 0'
    ],
    correctIndex: 0,
    verifyInstruction: 'Now edit the marks slider in Lab 4 to +20 and watch the live SUM cell update instantly!'
  },
  {
    question: 'Predict: If you reduce network bandwidth from 100 Mbps to 10 Mbps, what happens to packet delivery time?',
    options: [
      'Packets travel faster because the pipe is smaller',
      'Packet delivery time increases (takes longer) due to restricted capacity',
      'HTTP changes automatically into SMTP',
      'Packets turn into Excel workbooks'
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the bandwidth slider in Lab 5 to 10 Mbps and watch the packet animation slow down.'
  }
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the temporary variable T during the three-step swap algorithm?',
    observableOptions: [
      'T temporarily holds A original value so B does not overwrite it permanently',
      'T is never used and stays 0',
      'T deletes both numbers immediately',
      'T multiplies the numbers by 10'
    ],
    correctIndex: 0
  },
  {
    question: 'What happens in the flowchart when the input score changes from 35 to 85?',
    observableOptions: [
      'The execution line changes from the "No" (Fail) branch to the "Yes" (Pass) branch',
      'The start oval turns into a diamond',
      'The flowchart stops functioning',
      'All arrows point backwards'
    ],
    correctIndex: 0
  }
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Be the St. Jude School IT Architect',
  description:
    'Plan a complete digital solution for your school annual sports meet in Bengaluru: Write a 4-step algorithm to rank race times, draw a flowchart for medal qualifications, construct a 5-student Excel marksheet with =AVERAGE(), and describe how sports photos are sent to Delhi via WAN packets.',
  steps: [
    'Write the finite algorithm steps for finding the fastest 100m sprinter.',
    'Sketch a flowchart with Start oval, Input time, Diamond (Time < 12s?), and Yes/No branches.',
    'Build an Excel sheet with columns: Athlete, Time (s), Points with =SUM() at bottom.',
    'Identify network hardware (Switch for lab desktops, Wi-Fi router for teachers, Modem for ISP).'
  ]
};

function C6_ComputerScienceAlgorithmsDefinitionPropertiesSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C6_CS_021,
  title = DEFAULT_PROPS.title || 'Algorithms, Flowcharts, Spreadsheets & Networking',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['compsci'] || {
    name: 'Computer Science',
    emoji: '💻',
    color: 'indigo'
  };

  // ─── STATE DECLARATIONS ───
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

  // Brilliant Predict / Observation state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Escalating hints and progressive disclosure
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop & sorting state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Lab 1: Algorithm Memory Swap simulation state
  const [varA, setVarA] = useState(42);
  const [varB, setVarB] = useState(99);
  const [varT, setVarT] = useState<number | null>(null);
  const [swapStep, setSwapStep] = useState(0);
  const [numA, setNumA] = useState(25);
  const [numB, setNumB] = useState(88);
  const [numC, setNumC] = useState(54);

  // Lab 2: Flowchart Simulation state
  const [flowScore, setFlowScore] = useState(65);
  const [flowActiveNode, setFlowActiveNode] = useState<string>('start');

  // Lab 3 & 4: Excel Spreadsheet Simulation state
  const [selectedCell, setSelectedCell] = useState('B2');
  const [excelMarks, setExcelMarks] = useState<number[]>([85, 72, 90, 68]);
  const [isBold, setIsBold] = useState(true);
  const [isItalic, setIsItalic] = useState(false);
  const [cellFillColor, setCellFillColor] = useState('#fef08a');
  const [hasBorders, setHasBorders] = useState(true);
  const [activeSheetTab, setActiveSheetTab] = useState('Sheet1');
  const [savedFileName, setSavedFileName] = useState('Class_6_Marks.xlsx');
  const [isWorkbookSaved, setIsWorkbookSaved] = useState(false);

  // Lab 5: Networking Simulation state
  const [networkProtocol, setNetworkProtocol] = useState<'HTTP' | 'FTP' | 'SMTP'>('HTTP');
  const [bandwidthMbps, setBandwidthMbps] = useState(50);
  const [networkType, setNetworkType] = useState<'LAN' | 'WAN' | 'WLAN'>('LAN');

  // Post-completion reflection answers
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: ''
  });

  // References
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Derived calculations for Largest of 3 Algorithm
  const calculatedLargest = useMemo(() => {
    const leader1 = numA > numB ? numA : numB;
    return numC > leader1 ? numC : leader1;
  }, [numA, numB, numC]);

  // Derived spreadsheet values
  const totalSum = useMemo(() => {
    return excelMarks.reduce((acc, curr) => acc + curr, 0);
  }, [excelMarks]);

  const averageMark = useMemo(() => {
    return (totalSum / (excelMarks.length || 1)).toFixed(1);
  }, [totalSum, excelMarks]);

  // Motivational Feedback Message based on error count
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors <= 3) return 'Great work!';
    if (errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // Filter challenges by adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── USEEFFECT HOOKS ───

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    const render = () => {
      offset += (bandwidthMbps / 50) * 1.5;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.strokeStyle = networkProtocol === 'HTTP' ? '#38bdf8' : networkProtocol === 'FTP' ? '#34d399' : '#f472b6';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(20, canvas.height / 2);
      ctx.lineTo(canvas.width - 20, canvas.height / 2);
      ctx.stroke();

      const packetSpacing = 60;
      for (let i = 0; i < 5; i++) {
        const px = ((offset + i * packetSpacing) % (canvas.width - 40)) + 20;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(px - 12, canvas.height / 2 - 10, 24, 20, [4]);
        } else {
          ctx.rect(px - 12, canvas.height / 2 - 10, 24, 20);
        }
        ctx.fill();

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(networkProtocol.slice(0, 3), px, canvas.height / 2 + 3);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [bandwidthMbps, networkProtocol]);

  useEffect(() => {
    if (flowScore >= 40) {
      setFlowActiveNode('pass_branch');
    } else {
      setFlowActiveNode('fail_branch');
    }
  }, [flowScore]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── USECALLBACK HOOKS ───

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
      setShowExplanation(true);
      setShowHint(false);
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
    speechManager.speak(isCorrect ? 'Outstanding deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive labs. Let us explore step by step.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Sandbox mode unlocked! Feel free to play with all parameters.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode initiated. Put your computer science knowledge to the test!');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the simulation to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb scientific observation!' : 'Check the memory boxes carefully.');
  }, []);

  const handleStepSwapAlgorithm = useCallback(() => {
    audioManager.play('count');
    if (swapStep === 0) {
      setVarT(varA);
      setSwapStep(1);
      speechManager.speak('Step 1: Stored value of A in temporary storage T.');
    } else if (swapStep === 1) {
      setVarA(varB);
      setSwapStep(2);
      speechManager.speak('Step 2: Copied value of B into variable A.');
    } else if (swapStep === 2) {
      if (varT !== null) setVarB(varT);
      setSwapStep(3);
      speechManager.speak('Step 3: Copied preserved value from T into B. Values swapped successfully!');
      setShowSparkle(true);
      setSparklePos({ x: 200, y: 150 });
    } else {
      setVarA(42);
      setVarB(99);
      setVarT(null);
      setSwapStep(0);
    }
  }, [swapStep, varA, varB, varT]);

  const handleExcelCellChange = useCallback((index: number, val: number) => {
    audioManager.play('tap');
    setExcelMarks(prev => {
      const updated = [...prev];
      updated[index] = val;
      return updated;
    });
  }, []);

  const handleSaveWorkbook = useCallback(() => {
    setIsWorkbookSaved(true);
    audioManager.play('success');
    setShowSparkle(true);
    setSparklePos({ x: 300, y: 100 });
    speechManager.speak('Workbook saved securely as Class_6_Marks.xlsx to storage.');
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
      const initial = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : prev;
      const arr = [...initial];
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
    speechManager.speak('Magnificent! You have mastered ICSE Class 6 Algorithms, Excel, and Networking!');
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
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      const correct = challenge.correctOrder || [];
      isCorrect = JSON.stringify(answer) === JSON.stringify(correct);
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
      speechManager.speak('Correct! Outstanding work.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
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
        speechManager.speak('Let us study the complete solution together.');
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

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700/50 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                ICSE Class 6 • {subjectConfig.name}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-gold-900/60 text-gold-300 rounded-full border border-gold-700">
                CISCE 2026 Aligned
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Badges & Difficulty indicator */}
        <div className="flex items-center gap-2">
          <motion.span
            key={phase}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 text-xs font-bold uppercase rounded-lg bg-slate-800 text-slate-300 border border-slate-700"
          >
            Phase: {phase}
          </motion.span>
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 text-xs font-bold uppercase rounded-lg border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                  : difficulty === 'advanced'
                  ? 'bg-rose-950 text-rose-400 border-rose-700'
                  : 'bg-amber-950 text-amber-400 border-amber-700'
              }`}
            >
              Tier: {difficulty}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/60 shadow-lg">
            <h2 className="text-xl font-bold text-gold-300 flex items-center gap-2">
              <span>🚀</span> {SCENARIO.title}
            </h2>
            <p className="text-slate-300 mt-2 leading-relaxed text-sm sm:text-base">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-900/80 rounded-xl border border-slate-700 text-xs text-slate-400">
              📌 <span className="text-slate-200 font-semibold">Mission Brief:</span> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <span>🔍</span> Discovery Puzzle (Low-Stakes Curiosity Hook)
            </div>
            <p className="text-white font-semibold text-base sm:text-lg">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${opt}`}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-800/40 text-slate-500 border border-slate-700/40'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  <span className="inline-block w-6 font-bold text-slate-400">
                    {String.fromCharCode(65 + i)}.
                  </span>{' '}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                <div
                  className={`p-4 rounded-xl border text-sm leading-relaxed ${
                    discoveryCorrect
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                      : 'bg-amber-950/40 border-amber-800 text-amber-300'
                  }`}
                >
                  <p className="font-bold mb-1">{discoveryCorrect ? '✓ Fantastic thinking!' : "💡 Don't worry!"}</p>
                  <p>{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="w-full sm:w-auto px-8 py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl shadow-lg shadow-gold-600/30 flex items-center justify-center gap-2"
                >
                  Enter Interactive Discovery Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Exploration Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pb-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  currentSlide === idx
                    ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                Lab {idx + 1}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-gold-400">
                  Interactive Investigation • Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-300 text-sm mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── LAB 1: Algorithm Variable Swap & SVG 1 ─── */}
              {currentSlide === 0 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  {/* SVG DIAGRAM 1: Memory Swap Architecture */}
                  <div className="w-full flex flex-col items-center">
                    <span className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-2">
                      Figure 1: Memory Register Swap Execution Diagram
                    </span>
                    <svg viewBox="0 0 540 180" className="w-full max-w-lg bg-slate-900/80 rounded-xl p-2 border border-slate-800">
                      <defs>
                        <marker id="swap-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                        </marker>
                      </defs>
                      {/* Box A */}
                      <rect x="40" y="50" width="100" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="90" y="75" textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="bold">Var A</text>
                      <text x="90" y="105" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold">{varA}</text>

                      {/* Box B */}
                      <rect x="220" y="50" width="100" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                      <text x="270" y="75" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Var B</text>
                      <text x="270" y="105" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold">{varB}</text>

                      {/* Temp T */}
                      <rect x="400" y="50" width="100" height="70" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
                      <text x="450" y="75" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Temp T</text>
                      <text x="450" y="105" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold">{varT !== null ? varT : '—'}</text>

                      {/* Transfer Arc 1: A -> T */}
                      <path d="M 90 45 Q 270 5 450 45" fill="none" stroke={swapStep === 1 ? '#38bdf8' : '#334155'} strokeWidth={swapStep === 1 ? 3 : 1.5} strokeDasharray="4 2" markerEnd="url(#swap-arrow)" />
                      <text x="270" y="25" textAnchor="middle" fill="#38bdf8" fontSize="10">Step 1: T = A</text>

                      {/* Transfer Arc 2: B -> A */}
                      <path d="M 220 85 L 145 85" fill="none" stroke={swapStep === 2 ? '#38bdf8' : '#334155'} strokeWidth={swapStep === 2 ? 3 : 1.5} markerEnd="url(#swap-arrow)" />
                      <text x="180" y="78" textAnchor="middle" fill="#38bdf8" fontSize="10">Step 2: A = B</text>

                      {/* Transfer Arc 3: T -> B */}
                      <path d="M 450 125 Q 360 165 270 125" fill="none" stroke={swapStep === 3 ? '#38bdf8' : '#334155'} strokeWidth={swapStep === 3 ? 3 : 1.5} strokeDasharray="4 2" markerEnd="url(#swap-arrow)" />
                      <text x="360" y="165" textAnchor="middle" fill="#38bdf8" fontSize="10">Step 3: B = T</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Swap Section */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-gold-300 uppercase tracking-wider flex items-center gap-2">
                        <span>🔄</span> Memory Swap Step Controller
                      </h4>
                      <div className="p-3 bg-slate-900/80 rounded-xl text-xs space-y-1">
                        <p className={swapStep === 0 ? 'text-gold-300 font-bold' : 'text-slate-500'}>
                          Step 1: T = A (Store {varA} in T)
                        </p>
                        <p className={swapStep === 1 ? 'text-gold-300 font-bold' : 'text-slate-500'}>
                          Step 2: A = B (Copy B into A)
                        </p>
                        <p className={swapStep === 2 ? 'text-gold-300 font-bold' : 'text-slate-500'}>
                          Step 3: B = T (Copy saved value from T into B)
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleStepSwapAlgorithm}
                        className="w-full py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs shadow-md"
                      >
                        {swapStep === 3 ? 'Reset Swap Lab ↺' : `Execute Swap Step ${swapStep + 1} ➔`}
                      </motion.button>
                    </div>

                    {/* Largest of 3 Section */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-gold-300 uppercase tracking-wider flex items-center gap-2">
                        <span>🏆</span> Find Largest of 3 Numbers (A, B, C)
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs text-slate-300 font-medium">A: {numA}</span>
                          <input
                            type="range"
                            min={1}
                            max={100}
                            value={numA}
                            onChange={e => {
                              setNumA(Number(e.target.value));
                              audioManager.play('tap');
                            }}
                            aria-label="Set value of A"
                            className="w-40"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs text-slate-300 font-medium">B: {numB}</span>
                          <input
                            type="range"
                            min={1}
                            max={100}
                            value={numB}
                            onChange={e => {
                              setNumB(Number(e.target.value));
                              audioManager.play('tap');
                            }}
                            aria-label="Set value of B"
                            className="w-40"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs text-slate-300 font-medium">C: {numC}</span>
                          <input
                            type="range"
                            min={1}
                            max={100}
                            value={numC}
                            onChange={e => {
                              setNumC(Number(e.target.value));
                              audioManager.play('tap');
                            }}
                            aria-label="Set value of C"
                            className="w-40"
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-gold-950/60 rounded-xl border border-gold-700 flex items-center justify-between">
                        <span className="text-xs font-semibold text-gold-200">Result Output (Largest L):</span>
                        <span className="text-2xl font-black text-emerald-400">{calculatedLargest}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: Interactive Flowchart Trace & SVG 2 ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <span className="text-sm font-bold text-white">
                      Adjust Student Test Score: <span className="text-amber-400 font-black">{flowScore}</span>
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={flowScore}
                      onChange={e => {
                        setFlowScore(Number(e.target.value));
                        audioManager.play('tap');
                      }}
                      aria-label="Adjust test score"
                      className="w-64"
                    />
                  </div>

                  {/* SVG DIAGRAM 2: Flowchart Decision Engine */}
                  <div className="w-full flex flex-col items-center py-2">
                    <span className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-2">
                      Figure 2: Flowchart Logic Flow with Binary Decision Branching
                    </span>
                    <svg viewBox="0 0 500 320" className="w-full max-w-lg bg-slate-900/80 rounded-xl p-2 border border-slate-800">
                      <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
                        </marker>
                        <marker id="arrow-active" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                        </marker>
                      </defs>

                      {/* 1. Start Oval */}
                      <g>
                        <ellipse cx="250" cy="30" rx="45" ry="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="250" y="34" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Start</text>
                        <line x1="250" y1="48" x2="250" y2="78" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow-active)" />
                      </g>

                      {/* 2. Input Parallelogram */}
                      <g transform="translate(175, 80)">
                        <polygon points="15,0 150,0 135,35 0,35" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="75" y="22" textAnchor="middle" fill="#ffffff" fontSize="11">Input Score ({flowScore})</text>
                      </g>
                      <line x1="250" y1="115" x2="250" y2="148" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow-active)" />

                      {/* 3. Decision Diamond */}
                      <g transform="translate(170, 150)">
                        <polygon points="80,0 160,35 80,70 0,35" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                        <text x="80" y="38" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Score &gt;= 40?</text>
                      </g>

                      {/* Yes Branch (Left) */}
                      <line x1="170" y1="185" x2="100" y2="185" stroke={flowScore >= 40 ? '#34d399' : '#475569'} strokeWidth={flowScore >= 40 ? 3 : 1.5} />
                      <line x1="100" y1="185" x2="100" y2="225" stroke={flowScore >= 40 ? '#34d399' : '#475569'} strokeWidth={flowScore >= 40 ? 3 : 1.5} markerEnd={flowScore >= 40 ? 'url(#arrow-active)' : 'url(#arrow)'} />
                      <text x="130" y="178" fill="#34d399" fontSize="10" fontWeight="bold">Yes (True)</text>

                      <g transform="translate(30, 230)">
                        <polygon points="10,0 140,0 130,35 0,35" fill={flowScore >= 40 ? '#064e3b' : '#1e293b'} stroke={flowScore >= 40 ? '#34d399' : '#475569'} strokeWidth="2" />
                        <text x="70" y="22" textAnchor="middle" fill="#ffffff" fontSize="11">Print "PASS" ✓</text>
                      </g>

                      {/* No Branch (Right) */}
                      <line x1="330" y1="185" x2="400" y2="185" stroke={flowScore < 40 ? '#f43f5e' : '#475569'} strokeWidth={flowScore < 40 ? 3 : 1.5} />
                      <line x1="400" y1="185" x2="400" y2="225" stroke={flowScore < 40 ? '#f43f5e' : '#475569'} strokeWidth={flowScore < 40 ? 3 : 1.5} markerEnd={flowScore < 40 ? 'url(#arrow-active)' : 'url(#arrow)'} />
                      <text x="360" y="178" fill="#f43f5e" fontSize="10" fontWeight="bold">No (False)</text>

                      <g transform="translate(330, 230)">
                        <polygon points="10,0 140,0 130,35 0,35" fill={flowScore < 40 ? '#881337' : '#1e293b'} stroke={flowScore < 40 ? '#f43f5e' : '#475569'} strokeWidth="2" />
                        <text x="70" y="22" textAnchor="middle" fill="#ffffff" fontSize="11">Print "FAIL" ✗</text>
                      </g>

                      {/* Converge to End Oval */}
                      <line x1="100" y1="265" x2="210" y2="295" stroke="#64748b" strokeWidth="1.5" />
                      <line x1="400" y1="265" x2="290" y2="295" stroke="#64748b" strokeWidth="1.5" />

                      <g>
                        <ellipse cx="250" cy="300" rx="40" ry="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="250" y="304" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">End</text>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: Excel Interface Grid & Address Finder ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-xl border border-slate-700">
                    <div className="px-3 py-1 bg-slate-800 text-amber-400 font-mono font-bold text-xs rounded border border-slate-600">
                      Name Box: {selectedCell}
                    </div>
                    <div className="text-slate-500 font-mono text-xs px-2 font-bold">fx</div>
                    <div className="flex-1 px-3 py-1 bg-slate-950 text-slate-200 font-mono text-xs rounded border border-slate-800">
                      {selectedCell === 'A1' ? 'Subject' : selectedCell === 'B1' ? 'Marks' : selectedCell === 'A2' ? 'Rohan' : selectedCell === 'B2' ? '85' : 'Empty'}
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse font-mono text-xs">
                      <thead>
                        <tr>
                          <th className="p-2 bg-slate-800 border border-slate-700 text-slate-400 w-12"></th>
                          <th className="p-2 bg-slate-800 border border-slate-700 text-slate-300">A</th>
                          <th className="p-2 bg-slate-800 border border-slate-700 text-slate-300">B</th>
                          <th className="p-2 bg-slate-800 border border-slate-700 text-slate-300">C</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['1', 'Subject', 'Marks', 'Grade'],
                          ['2', 'Rohan', '85', 'A'],
                          ['3', 'Priya', '72', 'B'],
                          ['4', 'Aarav', '90', 'A+']
                        ].map((row, rIdx) => (
                          <tr key={rIdx}>
                            <td className="p-2 bg-slate-800 border border-slate-700 text-slate-400 text-center font-bold">
                              {row[0]}
                            </td>
                            {row.slice(1).map((cellVal, cIdx) => {
                              const cellAddress = `${String.fromCharCode(65 + cIdx)}${rIdx + 1}`;
                              const isSelected = selectedCell === cellAddress;
                              return (
                                <td
                                  key={cIdx}
                                  onClick={() => {
                                    setSelectedCell(cellAddress);
                                    audioManager.play('tap');
                                  }}
                                  className={`p-3 border transition-all cursor-pointer ${
                                    isSelected
                                      ? 'border-2 border-gold-500 bg-gold-950/80 text-white font-bold'
                                      : 'border-slate-800 bg-slate-900/40 text-slate-300 hover:bg-slate-800'
                                  }`}
                                >
                                  {cellVal}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: Excel Live Calculation & Automatic Recalculation ─── */}
              {currentSlide === 3 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/50 rounded-xl border border-gold-800 space-y-3">
                      <p className="text-white font-semibold text-sm">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(idx)}
                            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-left text-xs text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && !predictionVerified && (
                    <div className="p-3 bg-amber-950/60 border border-amber-700 rounded-xl text-xs text-amber-300 flex items-center justify-between">
                      <span>👉 {PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setPredictionVerified(true);
                          audioManager.play('success');
                        }}
                        className="px-3 py-1 bg-amber-600 text-white rounded font-bold"
                      >
                        Verified! ✓
                      </motion.button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['Rohan (B2)', 'Priya (B3)', 'Aarav (B4)', 'Kavya (B5)'].map((name, i) => (
                      <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300 font-bold">{name}</span>
                          <span className="text-amber-400 font-mono font-bold">{excelMarks[i]}</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={excelMarks[i]}
                          onChange={e => handleExcelCellChange(i, Number(e.target.value))}
                          aria-label={`Marks for ${name}`}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-gold-700">
                      <span className="text-xs text-gold-400 font-bold font-mono">Cell B6: =SUM(B2:B5)</span>
                      <div className="text-3xl font-black text-white mt-1">{totalSum}</div>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-xl border border-emerald-700">
                      <span className="text-xs text-emerald-400 font-bold font-mono">Cell B7: =AVERAGE(B2:B5)</span>
                      <div className="text-3xl font-black text-emerald-400 mt-1">{averageMark}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: Network Packet Router & SVG 3 ─── */}
              {currentSlide === 4 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-2">
                      {(['HTTP', 'FTP', 'SMTP'] as const).map(proto => (
                        <motion.button
                          key={proto}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setNetworkProtocol(proto);
                            audioManager.play('tap');
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            networkProtocol === proto
                              ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {proto} ({proto === 'HTTP' ? 'Web' : proto === 'FTP' ? 'Files' : 'Mail'})
                        </motion.button>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-300 font-bold">
                        Bandwidth: <span className="text-emerald-400">{bandwidthMbps} Mbps</span>
                      </span>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={bandwidthMbps}
                        onChange={e => {
                          setBandwidthMbps(Number(e.target.value));
                          audioManager.play('tap');
                        }}
                        aria-label="Adjust bandwidth capacity"
                        className="w-32 sm:w-48"
                      />
                    </div>
                  </div>

                  {/* SVG DIAGRAM 3: Network Topology & Packet Transmission */}
                  <div className="w-full flex flex-col items-center">
                    <span className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-2">
                      Figure 3: Multi-tier Network Architecture (LAN → Switch → Router → ISP Modem → WAN)
                    </span>
                    <svg viewBox="0 0 540 130" className="w-full max-w-lg bg-slate-900/80 rounded-xl p-2 border border-slate-800">
                      {/* Node 1: LAN Desktops */}
                      <rect x="20" y="35" width="75" height="50" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="57" y="55" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Lab PC</text>
                      <text x="57" y="70" textAnchor="middle" fill="#94a3b8" fontSize="8">(LAN Client)</text>

                      {/* Line to Switch */}
                      <line x1="95" y1="60" x2="135" y2="60" stroke="#38bdf8" strokeWidth="2" />

                      {/* Node 2: LAN Switch */}
                      <rect x="135" y="35" width="70" height="50" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                      <text x="170" y="55" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Switch</text>
                      <text x="170" y="70" textAnchor="middle" fill="#c7d2fe" fontSize="8">(Local MAC)</text>

                      {/* Line to Router */}
                      <line x1="205" y1="60" x2="245" y2="60" stroke="#818cf8" strokeWidth="2" />

                      {/* Node 3: Router */}
                      <circle cx="275" cy="60" r="28" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
                      <text x="275" y="58" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Router</text>
                      <text x="275" y="71" textAnchor="middle" fill="#6ee7b7" fontSize="8">(IP Gateway)</text>

                      {/* Line to Modem */}
                      <line x1="303" y1="60" x2="345" y2="60" stroke="#34d399" strokeWidth="2" />

                      {/* Node 4: Modem */}
                      <rect x="345" y="35" width="65" height="50" rx="6" fill="#881337" stroke="#f43f5e" strokeWidth="1.5" />
                      <text x="377" y="55" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Modem</text>
                      <text x="377" y="70" textAnchor="middle" fill="#fca5a5" fontSize="8">(ISP Line)</text>

                      {/* Line to Cloud WAN */}
                      <line x1="410" y1="60" x2="445" y2="60" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />

                      {/* Node 5: Cloud WAN */}
                      <ellipse cx="485" cy="60" rx="38" ry="24" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
                      <text x="485" y="58" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Global WAN</text>
                      <text x="485" y="71" textAnchor="middle" fill="#cbd5e1" fontSize="8">(London)</text>
                    </svg>
                  </div>

                  {/* HTML5 Canvas Packet Animation */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <canvas ref={canvasRef} width={500} height={80} className="w-full h-24 rounded-lg bg-slate-950" />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
                      <span>Source: St. Jude Lab (Bengaluru LAN)</span>
                      <span>Router / Switch Backbone</span>
                      <span>Destination: London Server (WAN)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Exploration Nav Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('whoosh');
                  }}
                  disabled={currentSlide === 0}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>
                <span className="text-xs font-bold text-slate-500">
                  {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('whoosh');
                    }}
                    className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                  >
                    Open Sandbox Playground →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>🎨</span> Free Play Sandbox: Excel Formatting & Save Engine
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  Format headings, test bold/italic styles, paint backgrounds, apply borders, and save your workbook as .xlsx!
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30"
              >
                Ready for Challenges! ➔
              </motion.button>
            </div>

            <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  setIsBold(!isBold);
                  audioManager.play('tap');
                }}
                className={`px-3 py-1.5 rounded font-bold text-xs ${
                  isBold ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                B (Bold)
              </button>
              <button
                onClick={() => {
                  setIsItalic(!isItalic);
                  audioManager.play('tap');
                }}
                className={`px-3 py-1.5 rounded italic text-xs ${
                  isItalic ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                I (Italic)
              </button>
              <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded">
                <span className="text-[10px] text-slate-400">Fill:</span>
                {['#fef08a', '#bbf7d0', '#bae6fd', '#fed7aa'].map(col => (
                  <button
                    key={col}
                    onClick={() => {
                      setCellFillColor(col);
                      audioManager.play('tap');
                    }}
                    className="w-5 h-5 rounded-full border border-slate-600"
                    style={{ backgroundColor: col }}
                  />
                ))}
              </div>
              <button
                onClick={() => {
                  setHasBorders(!hasBorders);
                  audioManager.play('tap');
                }}
                className={`px-3 py-1.5 rounded text-xs font-semibold ${
                  hasBorders ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                ▦ Borders: {hasBorders ? 'ON' : 'OFF'}
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSaveWorkbook}
                className="ml-auto px-4 py-1.5 bg-gold-700 hover:bg-gold-600 text-white text-xs font-bold rounded shadow"
              >
                💾 Save As (.xlsx)
              </motion.button>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl overflow-x-auto border border-slate-800">
              <table className="w-full border-collapse font-sans text-xs">
                <thead>
                  <tr
                    style={{
                      backgroundColor: cellFillColor,
                      color: '#0f172a',
                      fontWeight: isBold ? 'bold' : 'normal',
                      fontStyle: isItalic ? 'italic' : 'normal'
                    }}
                  >
                    <th className={`p-2 ${hasBorders ? 'border border-slate-600' : ''}`}>Student Name</th>
                    <th className={`p-2 ${hasBorders ? 'border border-slate-600' : ''}`}>Computer Science</th>
                    <th className={`p-2 ${hasBorders ? 'border border-slate-600' : ''}`}>Status</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  {['Rohan Gupta', 'Priya Sharma', 'Aarav Nair', 'Kavya Sen'].map((name, idx) => (
                    <tr key={idx} className="bg-slate-900/60">
                      <td className={`p-2 ${hasBorders ? 'border border-slate-800' : ''}`}>{name}</td>
                      <td className={`p-2 font-mono ${hasBorders ? 'border border-slate-800' : ''}`}>
                        {excelMarks[idx]}
                      </td>
                      <td className={`p-2 font-bold ${excelMarks[idx] >= 40 ? 'text-emerald-400' : 'text-rose-400'} ${hasBorders ? 'border border-slate-800' : ''}`}>
                        {excelMarks[idx] >= 40 ? 'PASS' : 'FAIL'}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-800 font-bold text-white">
                    <td className={`p-2 ${hasBorders ? 'border border-slate-700' : ''}`}>Total =SUM(B2:B5)</td>
                    <td className={`p-2 font-mono ${hasBorders ? 'border border-slate-700' : ''}`}>{totalSum}</td>
                    <td className={`p-2 font-mono ${hasBorders ? 'border border-slate-700' : ''}`}>—</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex items-center gap-2 mt-4 pt-2 border-t border-slate-800 text-xs">
                {['Sheet1 (Marks)', 'Sheet2 (Expenses)', '+ New Sheet'].map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveSheetTab(tab);
                      audioManager.play('tap');
                    }}
                    className={`px-3 py-1 rounded-t-lg font-semibold ${
                      activeSheetTab === tab ? 'bg-slate-800 text-white' : 'bg-slate-900 text-slate-500'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
                <span className="ml-auto text-[11px] text-slate-500 font-mono">
                  File: {savedFileName} {isWorkbookSaved ? '(Saved ✓)' : '(Unsaved •)'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-gold-400 uppercase tracking-widest">
                NEP Competency: {challenge.competencyLevel}
              </span>
            </div>
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-2 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase rounded bg-gold-900/60 text-gold-300 border border-gold-700">
                {challenge.type}
              </span>
              <span className="text-xs text-slate-400 font-mono">Node: {challenge.nodeId}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-relaxed">
              {challenge.question}
            </h3>

            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      aria-label={`Select: ${opt}`}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                      }`}
                    >
                      <span className="inline-block w-6 font-bold text-slate-400">
                        {String.fromCharCode(65 + i)}.
                      </span>{' '}
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

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
                      aria-label={`Drag item ${item.label}`}
                      className="px-3 py-2 bg-gold-700 hover:bg-gold-600 rounded-lg text-white font-bold text-xs cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'slot_start', title: 'Start / End Terminator' },
                    { id: 'slot_io', title: 'Input / Output (Read/Print)' },
                    { id: 'slot_calc', title: 'Process / Calculation (A + B)' },
                    { id: 'slot_decision', title: 'Decision / Branching (Yes/No)' }
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col justify-center items-center text-center transition-all min-h-[90px] ${
                        droppedLabels[target.id]
                          ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold'
                          : 'border-slate-700 bg-slate-950/40 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-semibold mb-1">{target.title}</span>
                      <span className="text-sm font-bold text-amber-300">
                        {droppedLabels[target.id] || 'Drop Shape Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs"
                >
                  Verify Drag Placements ➔
                </motion.button>
              </div>
            )}

            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => handleDragStart(String(displayIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3.5 bg-slate-800 hover:bg-slate-750 rounded-xl border border-slate-700 text-slate-200 text-xs sm:text-sm cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-gold-900 text-gold-300 flex items-center justify-center font-bold text-xs">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length > 0
                        ? sortArrangement
                        : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs"
                >
                  Check Sequence Order ➔
                </motion.button>
              </div>
            )}

            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated number"
                    aria-label="Numeric answer input"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-gold-500 outline-none w-56"
                  />
                  <span className="text-slate-400 text-xs font-semibold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs"
                  >
                    Submit ➔
                  </motion.button>
                </div>
              </div>
            )}

            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 font-semibold">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-900 hover:bg-gold-800 text-gold-200 border border-gold-700 rounded-lg text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gold-700 text-white text-xs font-mono rounded-lg flex items-center gap-2"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-300 font-bold hover:text-white"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click blocks above to construct the formula or algorithm.</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs disabled:opacity-40"
                >
                  Validate Construction ➔
                </motion.button>
              </div>
            )}

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-800/80 rounded-2xl space-y-4"
              >
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <span>💡</span> Step-by-Step Explanation
                </h4>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-amber-200 text-xs sm:text-sm leading-relaxed"
                    >
                      <span className="font-bold text-amber-400">{idx + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-xl text-xs"
                  >
                    Reveal Next Step ➔
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length
                      ? 'Complete All Challenges ➔'
                      : 'Next Challenge ➔'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950 via-slate-900 to-emerald-950 rounded-2xl border border-emerald-700/60 text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Exhibition Architect Certified!</h2>
            
            {/* MOTIVATIONAL FEEDBACK BANNER */}
            <div className="inline-block px-5 py-2 rounded-2xl bg-gold-900/80 border border-gold-400 text-gold-200 text-base font-extrabold tracking-wide shadow-lg">
              {motivationalMessage}
            </div>

            <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
              You successfully mastered all ICSE Class 6 computer science concepts: Algorithms, Flowcharts, Excel calculations, and LAN/WAN packet networks!
            </p>
            <div className="flex justify-center gap-6 pt-2">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400">Final Score</span>
                <div className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400">Mastery Level</span>
                <div className="text-2xl font-black text-gold-400 capitalize">{masteryLevel}</div>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400">Total Errors</span>
                <div className="text-2xl font-black text-amber-400">{errors}</div>
              </div>
            </div>
          </div>

          {/* ─── SPACED REPETITION VISIBILITY CARD (SRS ENGINE) ─── */}
          <div className="p-6 bg-gradient-to-r from-amber-950/60 via-slate-900 to-gold-950/60 rounded-2xl border-2 border-amber-500/60 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 bg-amber-500/20 rounded-xl border border-amber-500/40">📅</span>
                <div>
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-300">
                    Spaced Repetition Schedule (SRS / SM-2)
                  </h3>
                  <p className="text-xs text-slate-300">
                    Optimized memory consolidation schedule calculated from your performance
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-200 font-black text-sm tracking-wide">
                Next Review: {errors === 0 ? 'in 7 days' : errors <= 3 ? 'in 3 days' : 'in 1 day'}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div
                className={`p-3 rounded-xl border text-center transition-all ${
                  errors === 0
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="text-xs font-bold">0 Errors</div>
                <div className="text-lg font-black mt-1">Review in 7 days</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Full Retention Mode</div>
              </div>
              <div
                className={`p-3 rounded-xl border text-center transition-all ${
                  errors >= 1 && errors <= 3
                    ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-lg shadow-amber-950/50'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="text-xs font-bold">1–3 Errors</div>
                <div className="text-lg font-black mt-1">Review in 3 days</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Reinforcement Mode</div>
              </div>
              <div
                className={`p-3 rounded-xl border text-center transition-all ${
                  errors >= 4
                    ? 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-lg shadow-rose-950/50'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="text-xs font-bold">4+ Errors</div>
                <div className="text-lg font-black mt-1">Review in 1 day</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Rapid Revisit Mode</div>
              </div>
            </div>

            <p className="text-xs text-amber-200/90 leading-relaxed">
              💡 <span className="font-bold">Why Spaced Repetition?</span> Reviewing this topic in{' '}
              <strong className="text-white">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </strong>{' '}
              interrupts the forgetting curve and permanently consolidates algorithms, Excel formulas, and networking concepts into long-term biological memory.
            </p>
          </div>

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-gold-900/70 space-y-4 shadow-lg">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>💭</span> Reflect on Your Learning Journey
            </h3>
            <p className="text-xs text-slate-400">
              Deepen your understanding by articulating these three key takeaways:
            </p>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers({ ...reflectionAnswers, surprising: e.target.value })}
                  placeholder="e.g. Swapping variables without a third variable T overwrites and erases the original data!"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-gold-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.explain}
                  onChange={e => setReflectionAnswers({ ...reflectionAnswers, explain: e.target.value })}
                  placeholder="e.g. An algorithm is like a recipe; a flowchart is a map of decisions; Excel does math instantly when you type =."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-gold-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers({ ...reflectionAnswers, realLife: e.target.value })}
                  placeholder="e.g. Calculating sports scores, budgeting family expenses with =SUM(), or setting up a home Wi-Fi network."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-gold-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Misconceptions Review */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Your Targeted Concept Review
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/50 text-xs space-y-1">
                    <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real-World Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-gold-300 flex items-center gap-2">
              <span>🛠️</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-gold-400">{i + 1}.</span> {st}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION ENGINE FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Level Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_ComputerScienceAlgorithmsDefinitionPropertiesSim;
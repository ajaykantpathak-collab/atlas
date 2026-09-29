'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS AS STRING LITERALS ───
const NODE_C6_CS_001 = 'c6_cs_001';
const NODE_C6_CS_002 = 'c6_cs_002';
const NODE_C6_CS_003 = 'c6_cs_003';
const NODE_C6_CS_004 = 'c6_cs_004';
const NODE_C6_CS_005 = 'c6_cs_005';
const NODE_C6_CS_006 = 'c6_cs_006';
const NODE_C6_CS_007 = 'c6_cs_007';
const NODE_C6_CS_008 = 'c6_cs_008';
const NODE_C6_CS_009 = 'c6_cs_009';
const NODE_C6_CS_010 = 'c6_cs_010';

const ALL_NODE_IDS = [
  NODE_C6_CS_001,
  NODE_C6_CS_002,
  NODE_C6_CS_003,
  NODE_C6_CS_004,
  NODE_C6_CS_005,
  NODE_C6_CS_006,
  NODE_C6_CS_007,
  NODE_C6_CS_008,
  NODE_C6_CS_009,
  NODE_C6_CS_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The National IT Centre Mission',
  intro: 'You have been appointed Junior Systems Architect for the Digital India School & Innovation Mission in Bengaluru! Across the campus, computing systems are buzzing: personal workstations, hospital database minicomputers, railway reservation mainframes, and the PARAM supercomputer running climate forecasts.',
  context: 'Your mission is to understand hardware tiers, program translation, file systems, document automation, and visual presentations to keep all digital operations running smoothly!',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Scientists in Pune are predicting the Indian summer monsoon by crunching trillions of mathematical equations per second. Which category of computer must they use?',
  options: [
    'A high-end microcomputer laptop',
    'A minicomputer departmental server',
    'A PARAM / Pratyush Supercomputer',
    'A railway ticket reservation mainframe',
  ],
  correctIndex: 2,
  hintAfter: "Let's explore how computers scale from microchips in your watch all the way to room-sized supercomputers!",
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

// ─── 22 PROGRESSIVE CHALLENGES (Foundation, Standard, Advanced) ───
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (7 challenges) ---
  {
    id: 'ch_01_cat',
    nodeId: NODE_C6_CS_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is an example of a microcomputer used by a single student at home?',
    options: ['PARAM Yuva II', 'Indian Railways server', 'A personal laptop or desktop PC', 'A multi-department hospital server'],
    correctIndex: 2,
    explanation: 'A personal laptop or desktop PC is built around a single microprocessor and is designed for individual use, classifying it as a microcomputer.',
    hints: [
      'Think about which device is small and meant for one person at a time.',
      'Supercomputers like PARAM and mainframes like railway servers handle thousands of users.',
      'A personal laptop or desktop PC is the classic microcomputer.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_lang',
    nodeId: NODE_C6_CS_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which computer language is written strictly in binary code using only 0s and 1s, which the CPU directly executes?',
    options: ['Assembly Language', 'Machine Language', 'High-Level Language (Python)', 'Java Bytecode'],
    correctIndex: 1,
    explanation: 'Machine language consists entirely of binary sequences (0s and 1s) representing direct electrical states for the CPU.',
    hints: [
      'Think of the lowest, most raw level that uses purely 0 and 1.',
      'Assembly uses mnemonic words like ADD; Python uses English-like text.',
      'Only Machine Language is composed directly of raw 0s and 1s.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_03_trans_match',
    nodeId: NODE_C6_CS_003,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which translator converts assembly language mnemonics (like ADD, MOV, SUB) directly into binary machine code?',
    options: ['Interpreter', 'Compiler', 'Assembler', 'Linker'],
    correctIndex: 2,
    explanation: 'An assembler is the dedicated translator that converts assembly language mnemonic codes into binary machine language.',
    hints: [
      'Look at the root of the word: it translates "assembly" language.',
      'Compilers and interpreters work on high-level languages like C and Python.',
      'The assembler translates assembly mnemonics into machine code.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_04_hw_drag',
    nodeId: NODE_C6_CS_004,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each hardware component to its correct functional category slot.',
    dragItems: [
      { label: 'Keyboard', targetId: 'slot_in' },
      { label: 'Monitor', targetId: 'slot_out' },
      { label: 'Hard Disk', targetId: 'slot_store' },
      { label: 'CPU', targetId: 'slot_proc' },
    ],
    correctMapping: {
      slot_in: 'Keyboard',
      slot_out: 'Monitor',
      slot_store: 'Hard Disk',
      slot_proc: 'CPU',
    },
    explanation: 'Keyboard brings data in (Input), Monitor displays results (Output), Hard Disk retains data permanently (Storage), and the CPU performs calculations (Processing).',
    hints: [
      'Keyboards send input data; monitors display visual output.',
      'Hard disks store permanent files; the CPU processes all operations.',
      'Match: Keyboard -> Input, Monitor -> Output, Hard Disk -> Storage, CPU -> Processing.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_05_ext_match',
    nodeId: NODE_C6_CS_005,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the file extension ".mp3" to its correct file type.',
    options: ['Spreadsheet document', 'Audio recording', 'Bitmap image', 'Web page document'],
    correctIndex: 1,
    explanation: 'The .mp3 extension denotes an audio file format used for songs and sound recordings.',
    hints: [
      'Think about listening to music files on a smartphone or computer.',
      '.xls is a spreadsheet, .jpg is an image, and .html is a web page.',
      '.mp3 indicates digital audio content.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_06_table_terms',
    nodeId: NODE_C6_CS_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a Microsoft Word table, what do we call the individual rectangular box where a row and a column intersect?',
    options: ['A Margin', 'A Cell', 'A Tab Stop', 'A Bookmark'],
    correctIndex: 1,
    explanation: 'A cell is the fundamental rectangular container created by the intersection of a horizontal row and a vertical column.',
    hints: [
      'Think of grid units in a spreadsheet or Word table.',
      'It holds text, numbers, or graphics within one row and column intersection.',
      'The intersection of a row and a column is called a cell.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_07_ppt_trans',
    nodeId: NODE_C6_CS_010,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the primary difference between a Slide Transition and an Object Animation in PowerPoint?',
    options: [
      'Transitions apply to moving between entire slides; Animations apply to individual items on a slide.',
      'Transitions are only for audio clips; Animations are for video clips.',
      'Transitions make words spin; Animations change slide background colours.',
      'Transitions only run on mouse click; Animations only run automatically.',
    ],
    correctIndex: 0,
    explanation: 'Slide Transitions govern the motion when advancing from one slide to the next, while Animations animate individual elements (text, pictures, shapes) on a single slide.',
    hints: [
      'Consider the scope: whole slide change vs individual bullet point or image motion.',
      'Transitions belong to the Transitions tab; Animations belong to the Animations tab.',
      'Transitions affect slide-to-slide shifts; Animations move objects within a slide.',
    ],
    misconceptionIndex: 4,
  },

  // --- STANDARD (8 challenges) ---
  {
    id: 'ch_08_comp_vs_interp',
    nodeId: NODE_C6_CS_003,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A student in Chennai encounters an error in line 4 of their Python program. The program printed lines 1, 2, and 3 before stopping. Why did this happen?',
    options: [
      'Python uses a compiler which produces an executable file first.',
      'Python uses an interpreter which translates and executes code line by line, halting at the first error.',
      'The CPU ran out of binary RAM storage space.',
      'An assembler replaced line 4 with machine instructions.',
    ],
    correctIndex: 1,
    explanation: 'An interpreter translates and runs program code line by line in real time. It executes statements up to the erroneous line and halts immediately upon encountering the syntax error.',
    hints: [
      'Notice that the earlier lines actually ran and displayed output before the crash.',
      'Compilers check the whole file before generating any executable output.',
      'Interpreters work line by line, stopping right where the error occurs.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_09_zip_numeric',
    nodeId: NODE_C6_CS_007,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A student project folder containing raw text documents and uncompressed bitmaps is 40 MB. After creating a .zip archive, it compresses by 45%. What is the size of the zipped archive in MB?',
    correctAnswer: 22,
    tolerance: 0.5,
    unit: 'MB',
    explanation: 'Compression reduces size by 45%: 40 MB - (0.45 * 40) = 40 - 18 = 22 MB.',
    hints: [
      'Calculate 45% of 40 MB: 0.45 * 40 = 18 MB saved.',
      'Subtract the saved space from the original 40 MB.',
      '40 - 18 = 22 MB.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_10_file_attrib',
    nodeId: NODE_C6_CS_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Teacher Anita marks "Annual_Exam_Rules.docx" with the "Read-only" attribute in the Windows Properties dialog. What effect does this have on students in the computer lab?',
    options: [
      'Students cannot open or read the document at all.',
      'Students can open, read, and print the document, but cannot edit and overwrite the original file.',
      'The file is permanently hidden and removed from File Explorer.',
      'The file requires a secret password to view its contents.',
    ],
    correctIndex: 1,
    explanation: 'Read-only prevents users from modifying and overwriting the master copy on disk, but still allows full viewing, reading, and printing.',
    hints: [
      'Read-only means "able to read only", not "locked from opening".',
      'It protects the original from accidental modification or deletion.',
      'Students can view the text but cannot save changes over the original.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_11_mailmerge_parts',
    nodeId: NODE_C6_CS_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a mail merge project generating 250 parent invitation letters, what is the role of «Parent_Name» in the main document template?',
    options: [
      'It is a fixed text string that will print verbatim on every letter.',
      'It is a merge field placeholder that gets replaced by individual names from the data source table.',
      'It is a macro script that reformats the printer margins.',
      'It is an encrypted security key.',
    ],
    correctIndex: 1,
    explanation: '«Parent_Name» is a merge field (placeholder). During the merge process, the word processor replaces it with the corresponding entry from each row of the recipient data source.',
    hints: [
      'Notice the angle brackets « ». This marks a variable placeholder.',
      'The main document holds placeholders; the data source holds the actual list of names.',
      'It pulls individual names from the recipient table for each generated letter.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_12_mailmerge_sort',
    nodeId: NODE_C6_CS_009,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Arrange the practical steps of performing a Mail Merge in Microsoft Word into the correct sequence.',
    sortItems: [
      'Create the Main Document with text and placeholders',
      'Prepare the Data Source table with recipient records',
      'Link the Data Source to the Main Document',
      'Preview merged records and complete the merge to print',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The logical workflow is: 1) create template, 2) build recipient table, 3) insert merge fields and link, 4) preview and finalize merge/print.',
    hints: [
      'You must have a template letter and recipient table before you can link them.',
      'Linking and inserting placeholders happens before previewing.',
      'Previewing and printing/merging is always the final step.',
    ],
  },
  {
    id: 'ch_13_bank_mainframe',
    nodeId: NODE_C6_CS_001,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The State Bank of India needs to process millions of customer ATM transactions and online transfers concurrently across the country without downtime. Which computer tier is engineered specifically for this massive multi-user transaction workload?',
    options: ['Microcomputer workstation', 'Minicomputer departmental server', 'Mainframe Computer', 'Single-board Raspberry Pi'],
    correctIndex: 2,
    explanation: 'Mainframe computers are built with massive I/O bandwidth and fault tolerance to serve thousands of simultaneous users and millions of real-time transactions reliably.',
    hints: [
      'Consider the scale: thousands of concurrent users and millions of banking records.',
      'A microcomputer is for 1 user; a minicomputer handles dozens.',
      'National banking and railway booking infrastructures rely on Mainframes.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_14_ext_rename',
    nodeId: NODE_C6_CS_005,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Rohan renames a photograph file "school_pic.jpg" to "school_pic.mp3" in File Explorer. What actually happens to the file data and how Windows responds?',
    options: [
      'The picture data is automatically converted into a musical melody.',
      'The internal data remains image data, but Windows mistakenly attempts to open it in a media player and throws an error.',
      'The file size shrinks to zero bytes.',
      'The file becomes a read-only document.',
    ],
    correctIndex: 1,
    explanation: 'Renaming the extension changes only the operating system association label ("surname"), not the internal binary encoding. A media player cannot parse JPEG pixel data as audio.',
    hints: [
      'Changing a file extension does NOT convert the underlying binary format.',
      'The OS relies on extensions to pick the default application.',
      'The player opens the file expecting audio frames and fails to render it.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_15_ppt_anim_order',
    nodeId: NODE_C6_CS_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In PowerPoint, which tool allows a presenter to view a numbered list of all slide animations, reorder their playback timing, and set triggers to "After Previous"?',
    options: ['Slide Sorter View', 'The Animation Pane', 'Format Painter', 'The Review Tab'],
    correctIndex: 1,
    explanation: 'The Animation Pane lists all animation effects applied to objects on the active slide, enabling fine-grained control over sequence, duration, delay, and start triggers.',
    hints: [
      'Look for the specialized side panel on the Animations ribbon.',
      'It shows timeline blocks and trigger modes like On Click, With Previous, After Previous.',
      'The Animation Pane manages all custom object animations.',
    ],
  },

  // --- ADVANCED (7 challenges) ---
  {
    id: 'ch_16_lang_eval',
    nodeId: NODE_C6_CS_002,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A software firm in Hyderabad writes core logic in Python instead of raw Machine Language. What is the primary engineering tradeoff they accept?',
    options: [
      'Python code is harder for humans to read, but requires no translator.',
      'Python offers high human productivity and portability across operating systems, but requires translation (compilation/interpretation) to run on the CPU.',
      'Machine language is safer against electrical power cuts.',
      'Python programs bypass the CPU and run directly on storage disks.',
    ],
    correctIndex: 1,
    explanation: 'High-level languages provide immense readability, abstraction, and multi-platform portability, at the cost of requiring translator overhead compared to native CPU binary execution.',
    hints: [
      'Think about why humans prefer English-like statements over 0s and 1s.',
      'High-level code must be translated into binary before the processor can execute it.',
      'Productivity and portability are maximized, while translation bridges the hardware gap.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_17_construct_pipeline',
    nodeId: NODE_C6_CS_003,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the complete C++ execution pipeline from human source code to hardware execution.',
    availableParts: ['Source_Code (.cpp)', 'Compiler (GCC)', 'Binary_Executable (.exe)', 'CPU_Execution'],
    targetState: 'Source_Code (.cpp) Compiler (GCC) Binary_Executable (.exe) CPU_Execution',
    validationHint: 'Add the 4 stages in logical order: Source -> Translator -> Output File -> Hardware',
    explanation: 'Human programmers write C++ Source Code, the Compiler scans and converts the whole file into a Binary Executable (.exe), which is then loaded into RAM for CPU execution.',
    hints: [
      'Start with the high-level human file (.cpp).',
      'The compiler translates this into a stand-alone binary (.exe).',
      'Finally, the CPU executes the machine instructions.',
    ],
  },
  {
    id: 'ch_18_super_eval',
    nodeId: NODE_C6_CS_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims: "My top-of-the-line gaming PC with liquid cooling is a supercomputer." How should a computer scientist evaluate this claim?',
    options: [
      'Agree, because liquid cooling and high frame rates define a supercomputer.',
      'Disagree; gaming PCs are single-user microcomputers. Supercomputers (like Pratyush) combine thousands of networked processing nodes to compute trillions of floating-point operations (FLOPS) for scientific simulation.',
      'Agree, provided it runs 64-bit Windows.',
      'Disagree, because supercomputers can only run text-based Word tables.',
    ],
    correctIndex: 1,
    explanation: 'Supercomputers are massively parallel, multi-node machines engineered for extreme scientific and mathematical computation across thousands of processors, whereas even the fastest gaming PC is fundamentally an individual microcomputer.',
    hints: [
      'Look at purpose and architecture: single-user gaming vs national-scale parallel scientific simulations.',
      'Gaming PCs are microcomputers regardless of speed or cooling accessories.',
      'Supercomputers operate at petaflops scale with specialized cluster architectures.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_19_table_design',
    nodeId: NODE_C6_CS_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are designing an ICSE Class 6 Report Card table in Word. Which formatting choice best aids clarity and rapid reader comprehension according to document design principles?',
    options: [
      'Fill every data cell with dark red shading and eliminate all grid borders.',
      'Apply light shading and bold text to the Header Row, define clear borders for cells, and adjust column widths to fit content cleanly.',
      'Use spaces and underscore dashes instead of true table cells.',
      'Merge all columns into a single wide box.',
    ],
    correctIndex: 1,
    explanation: 'Effective table formatting uses distinct header styling (shading/bold), consistent grid borders for cell separation, and balanced column widths to ensure data is legible and organized.',
    hints: [
      'The header row must stand out clearly from the data rows.',
      'Cell borders give readers clear visual boundaries for columns and rows.',
      'Balanced padding and width prevent awkward word wrapping.',
    ],
  },
  {
    id: 'ch_20_hidden_attrib',
    nodeId: NODE_C6_CS_006,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arjun marks a file as "Hidden" in Properties. Later, he cannot find it in File Explorer. What is the exact state of the file and how can he recover visibility?',
    options: [
      'The file was permanently erased; he must restore from Recycle Bin.',
      'The file exists unchanged on disk; he must toggle "Hidden items" under the File Explorer "View" tab to display it.',
      'The file was compressed into a .zip archive automatically.',
      'The file was converted into an unreadable machine language binary.',
    ],
    correctIndex: 1,
    explanation: 'The "Hidden" attribute only instructs Windows File Explorer not to render the icon in standard views. The underlying file remains intact and can be viewed by checking "Hidden items" in the View tab.',
    hints: [
      'Hiding a file does NOT delete or move it.',
      'It is an attribute controlling File Explorer visual filtering.',
      'Enable "Hidden items" in the View ribbon to show faded icons for hidden files.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_21_zip_inspect',
    nodeId: NODE_C6_CS_007,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why must a student extract a .zip archive before doing extensive editing on a complex Word document with embedded media?',
    options: [
      'Because files inside a zip archive are compressed container streams; opening without extraction opens a temporary read-only or volatile cache that may fail to save edits back to disk.',
      'Because zip files can only be read by music players.',
      'Because zipping permanently removes formatting styles.',
      'Because the CPU refuses to execute any file containing a dot in its name.',
    ],
    correctIndex: 0,
    explanation: 'A .zip archive is a compressed package container. Editing files directly from inside the archive operates on temporary cache copies where changes may not be repacked or saved reliably until extracted.',
    hints: [
      'A zip file is like a sealed packed suitcase.',
      'Applications need a real folder path on disk for proper file write locks and asset linking.',
      'Extracting unpacks the files into real, writable system files.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_22_multimedia_ppt',
    nodeId: NODE_C6_CS_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In a 10-slide presentation on "National Parks of India", you insert a background instrumental audio track. Which Playback configuration ensures the music plays smoothly across all slides during the presentation?',
    options: [
      'Set Start to "On Click" and enable "Loop until Stopped" without "Play Across Slides".',
      'Set Start to "Automatically", enable "Play Across Slides", and check "Hide During Show".',
      'Apply an Exit Animation to the audio icon on slide 1.',
      'Convert the audio file into a Word table.',
    ],
    correctIndex: 1,
    explanation: 'Configuring "Play Across Slides", setting Start to "Automatically", and checking "Hide During Show" ensures the audio track plays uninterrupted throughout the slide deck without showing the speaker icon.',
    hints: [
      'Look for the option specifically named "Play Across Slides".',
      'Automatic start prevents having to manually click the speaker on slide 1.',
      'Hiding during show keeps the slide visuals clean and professional.',
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
  nodeId: NODE_C6_CS_001,
  title: 'Categories of Computers & Computing Fundamentals',
  definition: 'Computing systems scale from personal microcomputers up to national supercomputers. They execute machine instructions through translators, organize data via structured file systems, and enable automated document creation and dynamic presentations.',
  eli5: 'Computers come in all sizes: from the tiny chip in a watch to room-sized weather predictors. We write instructions in friendly languages, translators turn them into 0s and 1s, and we keep our digital world organized with folders, tables, and slides!',
  misconceptions: [
    {
      misconception: 'Supercomputers are just fast gaming PCs with water cooling.',
      correction: 'A gaming PC is a single-user microcomputer. Supercomputers (like PARAM) have thousands of networked parallel processors solving massive scientific simulations.',
    },
    {
      misconception: 'The CPU stores all my files permanently.',
      correction: 'The CPU is a processing device that calculates and executes instructions. Permanent files live on storage devices like Hard Disks and SSDs.',
    },
    {
      misconception: 'Setting a file to "Hidden" deletes it from the hard drive.',
      correction: 'Hidden files remain in the exact same location; File Explorer merely filters them from standard view.',
    },
    {
      misconception: 'Renaming a file extension (e.g. .jpg to .mp3) converts its data format.',
      correction: 'Renaming only changes the label the OS uses to pick an app. The internal binary bytes remain unchanged.',
    },
    {
      misconception: 'Transitions and Animations in PowerPoint are identical.',
      correction: 'Transitions animate whole slide changes; Animations move individual elements (text, photos) within a slide.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which computer category handles Indian Railways reservations?', options: ['Microcomputer', 'Mainframe', 'Minicomputer', 'Supercomputer'], correctIndex: 1 },
    { question: 'What is the only language the CPU executes directly?', options: ['Java', 'Assembly', 'Machine Language (Binary)', 'Python'], correctIndex: 2 },
    { question: 'Which translator converts code line by line and halts at errors?', options: ['Compiler', 'Assembler', 'Interpreter', 'Operating System'], correctIndex: 2 },
    { question: 'A computer mouse belongs to which hardware family?', options: ['Output', 'Input', 'Storage', 'Processing'], correctIndex: 1 },
    { question: 'What does the .docx extension signify?', options: ['Word Document', 'Excel Spreadsheet', 'Image', 'Audio Track'], correctIndex: 0 },
    { question: 'What attribute prevents accidental editing of a master document?', options: ['Hidden', 'Read-only', 'Compressed', 'Encrypted'], correctIndex: 1 },
    { question: 'What is the recipient list called in a Mail Merge?', options: ['Main Document', 'Data Source', 'Merge Field', 'Slide Master'], correctIndex: 1 },
    { question: 'Which PowerPoint pane reorders object animations and triggers?', options: ['Animation Pane', 'Slide Sorter', 'Notes Pane', 'Master View'], correctIndex: 0 },
  ],
  masteryCriteria: 'Demonstrate holistic understanding of computer tiers, programming language hierarchies, translators, hardware taxonomy, file properties, compression, tables, mail merge, and visual presentation dynamics.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (Learn by Doing) ───
const EXPLORATION_STEPS = [
  {
    title: '1. Computer Scale & Power Hierarchy',
    instruction: 'Drag the power slider to scale from Microcomputers up to Supercomputers and watch architecture, users, and tasks transform in real-time!',
    interactionType: 'slider-observe',
    nodeId: NODE_C6_CS_001,
  },
  {
    title: '2. Language Levels & Translators',
    instruction: 'Select high-level code, assembly mnemonics, or binary and watch how compilers, interpreters, and assemblers bridge the gap to CPU execution.',
    interactionType: 'click-parts',
    nodeId: NODE_C6_CS_002,
  },
  {
    title: '3. Hardware Architecture Taxonomy',
    instruction: 'Click on components on the interactive motherboard to classify them as Input, Output, Storage, or Processing devices.',
    interactionType: 'click-parts',
    nodeId: NODE_C6_CS_004,
  },
  {
    title: '4. File Compression & Properties Engine',
    instruction: 'Adjust the compression slider to squeeze raw project files into a .zip archive and observe byte savings without data loss.',
    interactionType: 'slider-observe',
    nodeId: NODE_C6_CS_007,
  },
  {
    title: '5. Mail Merge & Presentation Dynamics',
    instruction: 'Select recipient records to see dynamic merge fields inject into the invitation template and trigger slide animations.',
    interactionType: 'click-parts',
    nodeId: NODE_C6_CS_009,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If we compress a 50 MB folder containing 10 uncompressed text and bitmap files into a .zip archive, what will happen to the files inside?',
    options: [
      'Half of the text files will be permanently deleted to save space.',
      'The file sizes will be packed into a smaller single .zip container, and extracting will restore 100% of the original data intact.',
      'The text files will convert into video files.',
      'The folder will become password locked and unreadable.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the compression slider in the interactive module below to verify size reduction and 100% data integrity upon extraction!',
  },
  {
    question: 'Predict: If an interpreter encounters a syntax error on Line 3 of a 5-line program, what happens to Lines 1 and 2?',
    options: [
      'Lines 1 and 2 execute normally on the screen before the program halts on Line 3.',
      'Nothing executes because the interpreter refuses to start until the whole file is 100% error-free.',
      'Line 5 runs first instead.',
      'The computer automatically restarts.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Step through the translator simulator below to see line-by-line interpretation in action!',
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe as you scale the computer tier slider from Microcomputer to Supercomputer?',
    observableOptions: [
      'The machine gets physically smaller and consumes zero power.',
      'Processing speed jumps from millions to trillions of operations per second, and concurrent users increase from 1 to thousands.',
      'Only the colour of the case changes.',
      'It stops being able to run software.',
    ],
    correctIndex: 1,
  },
  {
    question: 'When looking at the Mail Merge preview, what pattern do you observe when changing recipient rows?',
    observableOptions: [
      'The fixed greeting and body stay identical, while only the «Merge_Fields» dynamically update for each recipient.',
      'The whole letter disappears.',
      'The font turns upside down.',
      'The recipient table gets deleted.',
    ],
    correctIndex: 0,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Junior IT Director: School Tech Overhaul',
  description: 'Design a comprehensive technology setup for a new ICSE school campus in Kolkata with 1,200 students.',
  steps: [
    'Specify computer tiers: Microcomputers for student lab desks, a Minicomputer server for library & attendance records, and cloud mainframe access for ICSE board registrations.',
    'Establish file management protocols: standard folder hierarchies (/Academics/Class6/Projects), strict file naming (.docx, .pptx), and daily .zip archive backups.',
    'Create an automated Mail Merge invitation system for the Annual Sports Day to generate 1,200 personalized parent letters with recipient address labels.',
    'Design a 5-slide orientation presentation using subtle Fade transitions, sequenced bullet animations via the Animation Pane, and an embedded national anthem audio track.',
  ],
};

// ─── MAIN COMPONENT ───
function C6_ComputerScienceCategoriesComputersMicroSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C6_CS_001,
  title = DEFAULT_PROPS.title || 'Categories of Computers & Fundamentals',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props) {
  const subjectConfig = SUBJECT_CONFIG['computerscience'] || { name: 'Computer Science', emoji: '💻', color: 'cyan' };

  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });

  // ─── DISCOVERY STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ─── PREDICT / OBSERVE STATE ───
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ─── ESCALATING HINTS & PROGRESSIVE DISCLOSURE ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── VISUAL FEEDBACK STATE ───
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── INTERACTIVE SIMULATION VARIABLES ───
  const [computerTierIndex, setComputerTierIndex] = useState(0); // 0: Micro, 1: Mini, 2: Mainframe, 3: Super
  const [selectedLanguageLevel, setSelectedLanguageLevel] = useState<'high' | 'assembly' | 'machine'>('high');
  const [selectedTranslator, setSelectedTranslator] = useState<'compiler' | 'interpreter' | 'assembler'>('compiler');
  const [translatorStep, setTranslatorStep] = useState(0);
  const [translatorRunning, setTranslatorRunning] = useState(false);
  const [selectedHardwarePart, setSelectedHardwarePart] = useState<string | null>('cpu');
  const [compressionRatio, setCompressionRatio] = useState(50);
  const [fileExtensionChoice, setFileExtensionChoice] = useState('.docx');
  const [fileReadOnly, setFileReadOnly] = useState(false);
  const [fileHidden, setFileHidden] = useState(false);
  const [mergeRecipientIndex, setMergeRecipientIndex] = useState(0);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [tableShadedHeader, setTableShadedHeader] = useState(true);
  const [tableBorderWidth, setTableBorderWidth] = useState(2);
  const [pptTransitionType, setPptTransitionType] = useState('Fade');
  const [pptAnimationIndex, setPptAnimationIndex] = useState(0);
  const [pptAudioPlaying, setPptAudioPlaying] = useState(false);
  const [bitArray, setBitArray] = useState([1, 0, 1, 1, 0, 0, 1, 0]);
  const [activeTabExplorer, setActiveTabExplorer] = useState<'hardware' | 'translator' | 'files' | 'presentation'>('hardware');

  // ─── CHALLENGE INTERACTION STATE ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── RECIPIENT DATA SOURCE FOR MAIL MERGE SIM ───
  const sampleRecipients = useMemo(() => [
    { name: 'Dr. Ramesh Sharma', city: 'Bengaluru', class: '6-A', roll: '101' },
    { name: 'Mrs. Ananya Sen', city: 'Kolkata', class: '6-B', roll: '102' },
    { name: 'Mr. Vikram Iyer', city: 'Chennai', class: '6-A', roll: '103' },
    { name: 'Mrs. Sunita Patel', city: 'Ahmedabad', class: '6-C', roll: '104' },
  ], []);

  // ─── COMPUTER TIERS DATA ───
  const computerTiers = useMemo(() => [
    {
      name: 'Microcomputer',
      users: '1 user at a time',
      scale: 'Desktops, Laptops, Tablets, Smartwatches',
      speed: 'Billions of cycles/sec (GHz)',
      cooling: 'Small heat sink & fan',
      example: 'School lab PC, Apple MacBook, Dell Inspiron',
      color: '#38bdf8',
    },
    {
      name: 'Minicomputer (Mid-range Server)',
      users: '10 to 100+ concurrent users',
      scale: 'Departmental rack cabinet',
      speed: 'Tens of gigahertz multi-core throughput',
      cooling: 'Dedicated server closet AC',
      example: 'District hospital patient database, College admission server',
      color: '#818cf8',
    },
    {
      name: 'Mainframe Computer',
      users: 'Thousands to millions of concurrent users',
      scale: 'Multiple server refrigerator-sized cabinets',
      speed: 'Massive I/O transaction throughput',
      cooling: 'Chilled data centre room',
      example: 'Indian Railways reservation (CRIS), State Bank of India Core Banking',
      color: '#c084fc',
    },
    {
      name: 'Supercomputer',
      users: 'Hundreds of scientists & engineers',
      scale: 'Entire room-sized clusters with hundreds of racks',
      speed: 'Petaflops (Trillions of calculations/sec)',
      cooling: 'Liquid coolant pumps & specialized HVAC',
      example: 'PARAM Siddhi-AI, Pratyush (IITM Pune Monsoon forecast)',
      color: '#f43f5e',
    },
  ], []);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE MASTERY EFFECT ───
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

  // ─── 2D CANVAS ANIMATION (CPU Instruction Bus / Packet Flow) ───
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

      // Draw background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw central CPU chip
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.fillRect(cx - 40, cy - 25, 80, 50);
      ctx.strokeRect(cx - 40, cy - 25, 80, 50);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('CPU ALU/CU', cx, cy + 4);

      // Draw animated data packets travelling on 4 buses
      const buses = [
        { x: 30, y: cy, label: 'INPUT' },
        { x: canvas.width - 30, y: cy, label: 'OUTPUT' },
        { x: cx, y: 20, label: 'STORAGE' },
        { x: cx, y: canvas.height - 20, label: 'RAM' },
      ];

      buses.forEach((bus, i) => {
        // Line
        ctx.strokeStyle = '#334155';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(bus.x, bus.y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Label
        ctx.fillStyle = '#94a3b8';
        ctx.font = '8px sans-serif';
        ctx.fillText(bus.label, bus.x, bus.y + (bus.y < cy ? -6 : 12));

        // Moving packet
        const t = (frame * 0.02 + i * 0.25) % 1;
        const px = cx + (bus.x - cx) * t;
        const py = cy + (bus.y - cy) * t;

        ctx.fillStyle = i % 2 === 0 ? '#38bdf8' : '#22c55e';
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── USECALLBACK HANDLERS ───
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
    speechManager.speak(isCorrect ? 'Outstanding deduction! PARAM is India’s supercomputer.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab! Use controls to experiment with each concept.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Explore freely in the sandbox! No grades here—manipulate hardware, translators, and files.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge time! Let us test your knowledge.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak(PREDICTION_QUESTIONS[0].verifyInstruction);
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb observation! Notice how user capacity and speed scale exponentially.' : 'Observe the gauge cards closely.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Mission accomplished! You scored ${finalScore} percent.`);
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
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const num = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent analysis.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
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
        speechManager.speak('Review the step-by-step breakdown to consolidate understanding.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
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
      const initial = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = initial.splice(fromIndex, 1);
      initial.splice(toIndex, 0, moved);
      return initial;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleBitToggle = useCallback((index: number) => {
    audioManager.play('pop');
    setBitArray(prev => {
      const next = [...prev];
      next[index] = next[index] === 1 ? 0 : 1;
      return next;
    });
  }, []);

  const handleRunTranslatorSim = useCallback(() => {
    audioManager.play('count');
    setTranslatorRunning(true);
    setTranslatorStep(1);
    setTimeout(() => {
      setTranslatorStep(2);
      audioManager.play('chime');
      setTimeout(() => {
        setTranslatorStep(3);
        setTranslatorRunning(false);
        audioManager.play('success');
      }, 900);
    }, 900);
  }, []);

  // ─── CLEANUP ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
      {/* ─── HEADER / SUBJECT BANNER ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/90 rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/60 border border-gold-700/50 rounded-xl">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">ICSE Class 6 Computer Science</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">NEP 2020 Aligned</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white">{title}</h1>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation' ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300' :
              difficulty === 'standard' ? 'bg-gold-950/70 border-gold-500 text-gold-300' :
              'bg-purple-950/70 border-purple-500 text-purple-300'
            }`}
          >
            Tier: {difficulty}
          </motion.div>
          <div className="px-3 py-1 bg-slate-800 rounded-full text-xs font-medium text-slate-300">
            Mastery: <span className="text-gold-400 font-bold capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/50 via-slate-900 to-gold-950/50 rounded-2xl border border-gold-800/40">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">Scenario Mission</span>
            <h2 className="text-2xl font-black text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-sm md:text-base text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-lg">💡</span>
              <h3 className="text-lg font-bold text-white">Discovery Curiosity Hook</h3>
            </div>
            <p className="text-slate-200 text-base">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium border transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400 opacity-60'
                      : 'bg-slate-800 hover:bg-slate-750 border-slate-700 hover:border-gold-500 text-slate-200'
                  }`}
                  aria-label={`Option ${i + 1}: ${opt}`}
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-xs text-center leading-6 mr-2 font-bold text-gold-300">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! PARAM supercomputers are built for massive scientific computations.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white font-bold rounded-xl shadow-lg shadow-gold-900/30 flex items-center gap-2"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-8 bg-gold-400' : idx < currentSlide ? 'w-4 bg-emerald-500' : 'w-3 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Interactive Slide Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <h3 className="text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <span className="text-xs px-3 py-1 bg-gold-950 border border-gold-800 text-gold-300 rounded-full">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>
              <p className="text-sm text-gold-300 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>

              {/* SLIDE 0: COMPUTER TIERS HIERARCHY */}
              {currentSlide === 0 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="text-xs text-slate-300 font-semibold">
                      Scale Tier: <span className="text-gold-400 font-bold">{computerTiers[computerTierIndex].name}</span>
                    </label>
                    <span className="text-xs text-slate-400">Move slider to scale computing capacity</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={3}
                    step={1}
                    value={computerTierIndex}
                    onChange={(e) => {
                      setComputerTierIndex(Number(e.target.value));
                      audioManager.play('tap');
                    }}
                    className="w-full accent-gold-400 cursor-pointer"
                    aria-label="Computer Tier Scale Slider"
                  />

                  {/* Visual Tier Card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wider text-slate-400">Architecture & Purpose</span>
                        <span className="text-lg">
                          {computerTierIndex === 0 ? '💻' : computerTierIndex === 1 ? '🗄️' : computerTierIndex === 2 ? '🏢' : '🚀'}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold" style={{ color: computerTiers[computerTierIndex].color }}>
                        {computerTiers[computerTierIndex].name}
                      </h4>
                      <p className="text-xs text-slate-300"><strong className="text-slate-100">User Capacity:</strong> {computerTiers[computerTierIndex].users}</p>
                      <p className="text-xs text-slate-300"><strong className="text-slate-100">Physical Scale:</strong> {computerTiers[computerTierIndex].scale}</p>
                      <p className="text-xs text-slate-300"><strong className="text-slate-100">Cooling Needs:</strong> {computerTiers[computerTierIndex].cooling}</p>
                      <p className="text-xs text-emerald-300 font-medium"><strong className="text-slate-100">Real Examples:</strong> {computerTiers[computerTierIndex].example}</p>
                    </div>

                    {/* SVG Visualization of Scale */}
                    <div className="flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 300 160" className="w-full max-w-[280px]">
                        <rect x="10" y="10" width="280" height="140" rx="8" fill="#090d16" stroke="#1e293b" />
                        {computerTierIndex === 0 && (
                          <g>
                            <rect x="90" y="40" width="120" height="70" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                            <rect x="100" y="50" width="100" height="50" fill="#0f172a" />
                            <polygon points="70,120 230,120 220,110 80,110" fill="#334155" />
                            <text x="150" y="78" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">Micro (1 User)</text>
                          </g>
                        )}
                        {computerTierIndex === 1 && (
                          <g>
                            <rect x="110" y="25" width="80" height="110" rx="4" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                            <line x1="110" y1="55" x2="190" y2="55" stroke="#475569" strokeWidth="2" />
                            <line x1="110" y1="85" x2="190" y2="85" stroke="#475569" strokeWidth="2" />
                            <circle cx="125" cy="40" r="3" fill="#22c55e" />
                            <circle cx="125" cy="70" r="3" fill="#22c55e" />
                            <circle cx="125" cy="100" r="3" fill="#22c55e" />
                            <text x="150" y="148" fill="#818cf8" fontSize="9" textAnchor="middle">Minicomputer Rack</text>
                          </g>
                        )}
                        {computerTierIndex === 2 && (
                          <g>
                            <rect x="50" y="25" width="60" height="110" rx="3" fill="#1e293b" stroke="#c084fc" strokeWidth="2" />
                            <rect x="120" y="25" width="60" height="110" rx="3" fill="#1e293b" stroke="#c084fc" strokeWidth="2" />
                            <rect x="190" y="25" width="60" height="110" rx="3" fill="#1e293b" stroke="#c084fc" strokeWidth="2" />
                            <text x="150" y="148" fill="#c084fc" fontSize="9" textAnchor="middle">Mainframe Complex (Millions)</text>
                          </g>
                        )}
                        {computerTierIndex === 3 && (
                          <g>
                            <rect x="30" y="20" width="240" height="115" rx="6" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="2" />
                            <text x="150" y="45" fill="#fda4af" fontSize="11" textAnchor="middle" fontWeight="bold">PARAM / Pratyush Cluster</text>
                            <text x="150" y="65" fill="#f43f5e" fontSize="9" textAnchor="middle">Thousands of Parallel Nodes</text>
                            <rect x="50" y="80" width="200" height="12" rx="3" fill="#0f172a" />
                            <motion.rect
                              x="50"
                              y="80"
                              width="200"
                              height="12"
                              rx="3"
                              fill="url(#superGlow)"
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <text x="150" y="112" fill="#38bdf8" fontSize="8" textAnchor="middle">Trillions of FLOPS</text>
                            <defs>
                              <linearGradient id="superGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#f43f5e" />
                                <stop offset="50%" stopColor="#38bdf8" />
                                <stop offset="100%" stopColor="#22c55e" />
                              </linearGradient>
                            </defs>
                          </g>
                        )}
                      </svg>
                    </div>
                  </div>

                  {/* Observation hook */}
                  {!observationAnswered && (
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <p className="text-xs text-white font-semibold mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="p-2 text-left bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SLIDE 1: COMPUTER LANGUAGES & TRANSLATORS */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'high' as const, label: 'High-Level (Python/C++)', desc: 'English-like statements' },
                      { id: 'assembly' as const, label: 'Assembly (Mnemonics)', desc: 'ADD, MOV, SUB codes' },
                      { id: 'machine' as const, label: 'Machine Code (Binary)', desc: 'Pure 0s and 1s for CPU' },
                    ].map((lang) => (
                      <motion.button
                        key={lang.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedLanguageLevel(lang.id);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedLanguageLevel === lang.id
                            ? 'bg-gold-950/70 border-gold-400 text-gold-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <p className="text-xs font-bold text-white">{lang.label}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{lang.desc}</p>
                      </motion.button>
                    ))}
                  </div>

                  {/* Translator Live Step-Through */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-300">Choose Translator:</span>
                        {(['compiler', 'interpreter', 'assembler'] as const).map((trans) => (
                          <button
                            key={trans}
                            onClick={() => {
                              setSelectedTranslator(trans);
                              audioManager.play('pop');
                            }}
                            className={`px-2.5 py-1 text-xs rounded-lg font-semibold uppercase tracking-wider ${
                              selectedTranslator === trans
                                ? 'bg-gold-600 text-white'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                          >
                            {trans}
                          </button>
                        ))}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRunTranslatorSim}
                        disabled={translatorRunning}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow"
                      >
                        {translatorRunning ? 'Translating...' : '▶ Translate & Execute'}
                      </motion.button>
                    </div>

                    {/* Code Visualizer Window */}
                    <div className="p-3 bg-black rounded-lg font-mono text-xs space-y-1.5 text-slate-300 border border-slate-800">
                      {selectedTranslator === 'compiler' && (
                        <>
                          <div className={translatorStep >= 1 ? 'text-gold-400 font-bold' : ''}>[Step 1] Source: #include &lt;iostream&gt; int main() &#123; total = price + tax; &#125;</div>
                          <div className={translatorStep >= 2 ? 'text-amber-300 font-bold' : 'text-slate-600'}>[Step 2] Compiler checks whole file at once → produces 'app.exe' binary</div>
                          <div className={translatorStep >= 3 ? 'text-emerald-400 font-bold' : 'text-slate-600'}>[Step 3] CPU executes 'app.exe' at full native hardware speed!</div>
                        </>
                      )}
                      {selectedTranslator === 'interpreter' && (
                        <>
                          <div className={translatorStep >= 1 ? 'text-gold-400 font-bold' : ''}>[Line 1] print("Hello, Bengaluru!") → Translated & executed immediately</div>
                          <div className={translatorStep >= 2 ? 'text-amber-300 font-bold' : 'text-slate-600'}>[Line 2] count = 10 → Translated & executed in memory</div>
                          <div className={translatorStep >= 3 ? 'text-emerald-400 font-bold' : 'text-slate-600'}>[Line 3] print("Total:", count) → Live output rendered!</div>
                        </>
                      )}
                      {selectedTranslator === 'assembler' && (
                        <>
                          <div className={translatorStep >= 1 ? 'text-gold-400 font-bold' : ''}>[Mnemonic 1] MOV AX, 5</div>
                          <div className={translatorStep >= 2 ? 'text-amber-300 font-bold' : 'text-slate-600'}>[Mnemonic 2] ADD AX, BX → Assembler converts to 10001011 11000011</div>
                          <div className={translatorStep >= 3 ? 'text-emerald-400 font-bold' : 'text-slate-600'}>[CPU Bus] Binary 0s & 1s pulse directly across ALU registers</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: HARDWARE COMPONENT WORKBENCH */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'keyboard', name: 'Keyboard / Mouse', cat: 'Input', emoji: '⌨️', color: 'border-gold-500 text-gold-300' },
                      { id: 'monitor', name: 'Monitor / Printer', cat: 'Output', emoji: '🖥️', color: 'border-amber-500 text-amber-300' },
                      { id: 'harddisk', name: 'Hard Disk / Pen Drive', cat: 'Storage', emoji: '💾', color: 'border-purple-500 text-purple-300' },
                      { id: 'cpu', name: 'CPU (ALU & CU)', cat: 'Processing', emoji: '⚙️', color: 'border-emerald-500 text-emerald-300' },
                    ].map((hw) => (
                      <motion.button
                        key={hw.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedHardwarePart(hw.id);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl text-left border ${
                          selectedHardwarePart === hw.id ? `bg-slate-800 ${hw.color}` : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="text-xl">{hw.emoji}</span>
                        <p className="text-xs font-bold mt-1 text-white">{hw.name}</p>
                        <span className="text-[10px] uppercase tracking-wider text-gold-400">{hw.cat} Device</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Dynamic Hardware Canvas */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <p className="text-xs text-slate-400 mb-2">Live Hardware Data Flow Simulation Canvas (2D HTML5):</p>
                    <canvas ref={canvasRef} width={500} height={120} className="w-full bg-slate-950 rounded-lg border border-slate-800" />
                  </div>
                </div>
              )}

              {/* SLIDE 3: FILE COMPRESSION & PROPERTIES */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {/* Predict then check */}
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800 space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-gold-300">Predict-Then-Check Curiosity Hook</p>
                      <p className="text-sm text-white font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5 pt-1">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="block w-full text-left p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interactive Compression Slider */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-bold">Zip Compression Level: {compressionRatio}%</span>
                      <span className="text-emerald-400 font-semibold">
                        Original: 50 MB → Zipped: {(50 * (1 - compressionRatio / 100)).toFixed(1)} MB
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={80}
                      value={compressionRatio}
                      onChange={(e) => {
                        setCompressionRatio(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-emerald-400 cursor-pointer"
                      aria-label="Compression Ratio Slider"
                    />

                    {/* File Properties Simulator Card */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 text-xs">
                        <span className="text-[10px] font-bold uppercase text-slate-500">Windows File Properties Dialog</span>
                        <p className="text-slate-200"><strong className="text-slate-400">File Name:</strong> Science_Project_2026</p>
                        <p className="text-slate-200"><strong className="text-slate-400">Type of File:</strong> Microsoft Word Document (.docx)</p>
                        <p className="text-slate-200"><strong className="text-slate-400">Location:</strong> D:\School\Class_6\Notes</p>
                        <p className="text-slate-200"><strong className="text-slate-400">Size:</strong> {(50 * (1 - compressionRatio / 100)).toFixed(1)} MB (Packed in .zip)</p>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
                        <span className="text-[10px] font-bold uppercase text-slate-500">File Attributes Toggle</span>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={fileReadOnly}
                              onChange={(e) => {
                                setFileReadOnly(e.target.checked);
                                audioManager.play('pop');
                              }}
                              className="accent-gold-500 rounded"
                            />
                            <span className="text-slate-300">Read-only (Prevents edit)</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={fileHidden}
                              onChange={(e) => {
                                setFileHidden(e.target.checked);
                                audioManager.play('pop');
                              }}
                              className="accent-gold-500 rounded"
                            />
                            <span className="text-slate-300">Hidden (Conceals icon)</span>
                          </label>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          {fileReadOnly && '✓ File is protected from accidental overwrites. '}
                          {fileHidden && '✓ File icon is hidden in normal File Explorer view.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: MAIL MERGE & PRESENTATION VISUAL EFFECTS */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Mail Merge Simulator */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Word Mail Merge</span>
                        <div className="flex gap-1">
                          {sampleRecipients.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                setMergeRecipientIndex(i);
                                audioManager.play('tap');
                              }}
                              className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                                mergeRecipientIndex === i ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              Row {i + 1}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-200 space-y-1.5 font-sans">
                        <p className="text-slate-400">To: <span className="text-amber-400 font-bold">{sampleRecipients[mergeRecipientIndex].name}</span></p>
                        <p className="text-slate-400">City: <span className="text-gold-400 font-bold">{sampleRecipients[mergeRecipientIndex].city}</span></p>
                        <p className="pt-1 text-slate-300">
                          Dear <span className="text-amber-400 font-bold">{sampleRecipients[mergeRecipientIndex].name}</span>, you are warmly invited to the Annual Day of Class <span className="text-emerald-400 font-bold">{sampleRecipients[mergeRecipientIndex].class}</span>!
                        </p>
                      </div>
                    </div>

                    {/* PowerPoint Visual Effects Simulator */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">PowerPoint Effects</span>
                        <select
                          value={pptTransitionType}
                          onChange={(e) => {
                            setPptTransitionType(e.target.value);
                            audioManager.play('whoosh');
                          }}
                          className="px-2 py-1 bg-slate-800 text-white text-xs rounded border border-slate-700"
                          aria-label="PowerPoint Transition Type"
                        >
                          <option value="Fade">Transition: Fade</option>
                          <option value="Push">Transition: Push</option>
                          <option value="Wipe">Transition: Wipe</option>
                        </select>
                      </div>

                      <div className="h-28 bg-gradient-to-r from-slate-950 to-gold-950/80 rounded-lg border border-slate-800 flex flex-col items-center justify-center p-3 text-center overflow-hidden relative">
                        <motion.h4
                          key={pptTransitionType + mergeRecipientIndex}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="text-sm font-bold text-white"
                        >
                          Indian National Parks Presentation
                        </motion.h4>
                        <motion.p
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-[11px] text-gold-300 mt-1"
                        >
                          Entrance Animation: Fly In with Previous
                        </motion.p>
                        <span className="text-[10px] text-slate-500 mt-1">Managed via Animation Pane</span>
                      </div>
                    </div>
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
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('whoosh');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-sm font-bold rounded-xl disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-medium">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-gold-900/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-900/30"
              >
                Enter Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY (No Grading Pressure) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Free Play Mode</span>
              <h3 className="text-xl font-black text-white">Full Systems Sandbox</h3>
              <p className="text-xs text-slate-400">Experiment freely with all interactive tools before taking on graded challenges!</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/40"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          {/* Sandbox Workspace Tabs */}
          <div className="flex gap-2 border-b border-slate-800 pb-2">
            {[
              { id: 'hardware' as const, label: 'Hardware & Binary', emoji: '⚙️' },
              { id: 'translator' as const, label: 'Translator Studio', emoji: '🔄' },
              { id: 'files' as const, label: 'Files & Tables', emoji: '📁' },
              { id: 'presentation' as const, label: 'Presentation Hub', emoji: '📽️' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTabExplorer(tab.id);
                  audioManager.play('tap');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeTabExplorer === tab.id
                    ? 'bg-gold-950 border border-gold-500 text-gold-200'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                <span>{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 min-h-[260px]">
            {activeTabExplorer === 'hardware' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white">Interactive Binary Bus & CPU Switchboard</h4>
                <p className="text-xs text-slate-400">Toggle binary switches to observe how machine language encodes 8-bit registers:</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {bitArray.map((bit, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => handleBitToggle(idx)}
                      className={`w-12 h-14 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-base border ${
                        bit === 1 ? 'bg-gold-600 border-gold-300 text-white shadow-md shadow-gold-900/50' : 'bg-slate-950 border-slate-800 text-slate-500'
                      }`}
                      aria-label={`Bit ${idx}: ${bit}`}
                    >
                      <span>{bit}</span>
                      <span className="text-[8px] text-slate-400 font-sans">2^{7 - idx}</span>
                    </motion.button>
                  ))}
                </div>
                <div className="p-3 bg-slate-950 rounded-lg text-xs text-slate-300 font-mono">
                  Decimal Value: <span className="text-gold-400 font-bold">{bitArray.reduce((acc, bit, i) => acc + bit * Math.pow(2, 7 - i), 0)}</span> | Hexadecimal: 0x{bitArray.reduce((acc, bit, i) => acc + bit * Math.pow(2, 7 - i), 0).toString(16).toUpperCase()}
                </div>
              </div>
            )}

            {activeTabExplorer === 'translator' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white">Translators Comparison Matrix</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <span className="font-bold text-gold-400">Compiler (e.g. GCC, javac)</span>
                    <p className="text-slate-300">Scans <strong>entire high-level program</strong> at once.</p>
                    <p className="text-emerald-400 font-semibold">✓ Produces .exe / .class output</p>
                    <p className="text-slate-400">Reports all syntax errors together.</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <span className="font-bold text-amber-400">Interpreter (e.g. Python IDLE)</span>
                    <p className="text-slate-300">Translates & executes <strong>line by line</strong>.</p>
                    <p className="text-amber-300 font-semibold">✗ No standalone executable file</p>
                    <p className="text-slate-400">Halts immediately at first faulty line.</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <span className="font-bold text-purple-400">Assembler (e.g. MASM)</span>
                    <p className="text-slate-300">Translates <strong>assembly mnemonics</strong>.</p>
                    <p className="text-purple-300 font-semibold">✓ ADD, MOV, SUB → Binary</p>
                    <p className="text-slate-400">Lowest level translator above pure binary.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTabExplorer === 'files' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white">Word Table Grid Builder</h4>
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <label className="text-slate-300">Rows: {tableRows}
                    <input type="range" min={2} max={5} value={tableRows} onChange={(e) => setTableRows(Number(e.target.value))} className="ml-2 accent-gold-400" />
                  </label>
                  <label className="text-slate-300">Columns: {tableCols}
                    <input type="range" min={2} max={4} value={tableCols} onChange={(e) => setTableCols(Number(e.target.value))} className="ml-2 accent-gold-400" />
                  </label>
                  <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
                    <input type="checkbox" checked={tableShadedHeader} onChange={(e) => setTableShadedHeader(e.target.checked)} className="accent-gold-400" />
                    Shade Header Row
                  </label>
                </div>

                {/* Rendered Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-slate-700 text-xs">
                    <thead>
                      <tr className={tableShadedHeader ? 'bg-gold-950 text-gold-200' : 'bg-slate-800 text-slate-200'}>
                        {Array.from({ length: tableCols }).map((_, c) => (
                          <th key={c} className="border border-slate-700 p-2 font-bold text-left">
                            Col {c + 1} Heading
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: tableRows - 1 }).map((_, r) => (
                        <tr key={r} className="hover:bg-slate-800/40">
                          {Array.from({ length: tableCols }).map((_, c) => (
                            <td key={c} className="border border-slate-700 p-2 text-slate-300">
                              Data Cell (R{r + 1}, C{c + 1})
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTabExplorer === 'presentation' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white">PowerPoint Animation Pane Timeline</h4>
                <p className="text-xs text-slate-400">Order of visual effects running on a single slide:</p>
                <div className="space-y-2">
                  {[
                    { order: 1, name: 'Title Text Box: Fly In (Entrance)', trigger: 'On Click', color: 'bg-emerald-950/70 border-emerald-500 text-emerald-300' },
                    { order: 2, name: 'National Park Photo: Wipe In (Entrance)', trigger: 'After Previous (0.5s delay)', color: 'bg-gold-950/70 border-gold-500 text-gold-300' },
                    { order: 3, name: 'Background Audio: Sitar Raga (Multimedia)', trigger: 'Automatically across slides', color: 'bg-gold-950/70 border-gold-500 text-gold-300' },
                    { order: 4, name: 'Subtitle: Fade Out (Exit)', trigger: 'With Previous', color: 'bg-amber-950/70 border-amber-500 text-amber-300' },
                  ].map((anim) => (
                    <div key={anim.order} className={`p-2.5 rounded-lg border flex items-center justify-between text-xs ${anim.color}`}>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-900 text-center leading-5 font-bold">{anim.order}</span>
                        <span className="font-semibold">{anim.name}</span>
                      </div>
                      <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded font-mono">{anim.trigger}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: PROGRESSIVE CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress Header */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Competency: <strong className="text-amber-300 uppercase">{challenge.competencyLevel}</strong>
                </span>
              </div>
              <div className="text-xs text-slate-400">
                Score: <span className="text-emerald-400 font-bold">{scoreBreakdown.correct}</span> / {scoreBreakdown.total}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-gold-500 to-emerald-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Active Challenge Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-colors space-y-4 ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 text-rose-100'
                : 'bg-slate-900 border-slate-800 text-slate-100'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-gold-950 text-gold-300 font-mono text-[11px] border border-gold-800">
                {challenge.nodeId}
              </span>
              <span className="text-xs text-slate-400 capitalize">{challenge.type} Challenge</span>
            </div>

            <h3 className="text-base md:text-lg font-bold text-white leading-snug">{challenge.question}</h3>

            {/* TYPE 1: MCQ */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5 pt-2">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm font-medium border transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-gold-500'
                    }`}
                    aria-label={`Option ${i + 1}: ${opt}`}
                  >
                    <span className="inline-block w-5 h-5 rounded-full bg-slate-700 text-[11px] text-center leading-5 mr-2 font-bold text-gold-300">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* TYPE 2: DRAG-LABEL */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                {/* Palette */}
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg text-white text-xs font-bold cursor-grab shadow"
                      role="button"
                      aria-label={`Draggable label: ${item.label}`}
                    >
                      ✥ {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* SVG Drop Grid */}
                <svg viewBox="0 0 400 180" className="w-full bg-slate-950 rounded-xl border border-slate-800">
                  <g>
                    <rect x="20" y="20" width="160" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="100" y="40" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Input Slot</text>
                    <text x="100" y="60" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
                      {droppedLabels.slot_in || '[Drop Here]'}
                    </text>
                    <rect
                      x="20"
                      y="20"
                      width="160"
                      height="60"
                      fill="transparent"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('slot_in')}
                      style={{ cursor: 'pointer' }}
                    />
                  </g>

                  <g>
                    <rect x="220" y="20" width="160" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="300" y="40" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Output Slot</text>
                    <text x="300" y="60" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">
                      {droppedLabels.slot_out || '[Drop Here]'}
                    </text>
                    <rect
                      x="220"
                      y="20"
                      width="160"
                      height="60"
                      fill="transparent"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('slot_out')}
                      style={{ cursor: 'pointer' }}
                    />
                  </g>

                  <g>
                    <rect x="20" y="100" width="160" height="60" rx="8" fill="#1e293b" stroke="#c084fc" strokeWidth="1.5" />
                    <text x="100" y="120" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Storage Slot</text>
                    <text x="100" y="140" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold">
                      {droppedLabels.slot_store || '[Drop Here]'}
                    </text>
                    <rect
                      x="20"
                      y="100"
                      width="160"
                      height="60"
                      fill="transparent"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('slot_store')}
                      style={{ cursor: 'pointer' }}
                    />
                  </g>

                  <g>
                    <rect x="220" y="100" width="160" height="60" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5" />
                    <text x="300" y="120" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Processing Slot</text>
                    <text x="300" y="140" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">
                      {droppedLabels.slot_proc || '[Drop Here]'}
                    </text>
                    <rect
                      x="220"
                      y="100"
                      width="160"
                      height="60"
                      fill="transparent"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('slot_proc')}
                      style={{ cursor: 'pointer' }}
                    />
                  </g>
                </svg>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-lg shadow"
                >
                  Verify Hardware Labels
                </motion.button>
              </div>
            )}

            {/* TYPE 3: DRAG-SORT */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">Drag items or reorder to establish the correct execution sequence:</p>
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
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs md:text-sm text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-gold-950 text-gold-300 font-bold text-center leading-6 text-xs">
                          {displayIdx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                      <span className="text-slate-500 text-xs">↕ Drag to reorder</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-lg shadow"
                >
                  Confirm Sequence Order
                </motion.button>
              </div>
            )}

            {/* TYPE 4: NUMERIC INPUT */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-gold-500"
                    aria-label="Numeric answer input"
                  />
                  <span className="text-sm text-slate-400 font-semibold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow"
                  >
                    Check Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 5: CONSTRUCT */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setConstructParts(prev => [...prev, part]);
                        audioManager.play('pop');
                      }}
                      className="px-3 py-1.5 bg-gold-950 border border-gold-700 hover:bg-gold-900 text-gold-200 text-xs font-bold rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                {/* Assembled Workspace */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1 bg-gold-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() => {
                          setConstructParts(prev => prev.filter((_, idx) => idx !== i));
                          audioManager.play('pop');
                        }}
                        className="text-rose-300 hover:text-white font-bold"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-slate-500 text-xs italic">Click parts above to construct the complete pipeline</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-lg shadow"
                >
                  Validate Constructed Pipeline
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE STEP-BY-STEP EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-amber-950/40 border border-amber-700/60 rounded-xl space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Step-by-Step Pedagogical Breakdown:</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-amber-200 leading-relaxed"
                    >
                      <strong className="text-amber-400">{i + 1}.</strong> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setRevealedSteps(s => s + 1);
                        audioManager.play('pop');
                      }}
                      className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold rounded-lg"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <div className="text-[11px] text-amber-400 font-semibold">✓ All explanation steps revealed</div>
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs md:text-sm font-bold rounded-xl shadow-lg shadow-emerald-900/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD CAPSTONE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-slate-900 via-gold-950/40 to-slate-900 rounded-3xl border border-gold-800 text-center space-y-4">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Mission Complete: Certified Systems Architect!</h2>
            <p className="text-slate-300 max-w-xl mx-auto text-sm md:text-base">
              You navigated computer scales, language translations, hardware architectures, and document automation across all 10 syllabus modules.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400">Final Score</span>
                <p className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400">BKT Mastery</span>
                <p className="text-2xl font-black text-gold-400 capitalize">{masteryLevel}</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400">Errors Tracked</span>
                <p className="text-2xl font-black text-amber-400">{errors}</p>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK */}
          <div className="p-4 bg-emerald-950/50 rounded-2xl border border-emerald-700/60 text-xs md:text-sm text-emerald-200">
            <strong className="font-bold text-emerald-300">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </strong>{' '}
            {errors === 0
              ? 'Flawless execution! You demonstrated comprehensive mastery across all ICSE computing concepts.'
              : errors <= 3
              ? 'Your grasp of core computer science fundamentals is strong. Keep sharpening your skills!'
              : errors <= 7
              ? 'You are making steady progress. Review the misconceptions below to solidify your understanding.'
              : 'Learning takes time and practice. Revisit the interactive labs and try the challenges again!'}
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 text-left">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤔</span>
              <h3 className="text-lg font-bold text-white">Reflect on Your Learning</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-xs font-semibold text-gold-400">1. What was the most surprising thing you learned?</p>
                <p className="text-xs text-slate-400 mt-1">Consider how computer sizes vary from microchips to supercomputers, or how compilers differ from interpreters.</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-xs font-semibold text-gold-400">2. How would you explain this to a friend?</p>
                <p className="text-xs text-slate-400 mt-1">Think about explaining how mail merge automates hundreds of letters or how file extensions tell the OS what app to open.</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-xs font-semibold text-gold-400">3. Where in real life might you use this?</p>
                <p className="text-xs text-slate-400 mt-1">From organizing school project folders and zipping files to formatting report cards and delivering animated presentations.</p>
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">Your Misconception Review Profile:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-900/60 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Scientific Fact: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-gold-400 text-lg">🌐</span>
              <h3 className="text-lg font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="text-gold-400 font-bold">Phase {i + 1}:</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Spaced Repetition SRS Notice */}
          <div className="p-4 bg-gold-950/40 rounded-2xl border border-gold-800 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="font-bold text-gold-300">Spaced Repetition Schedule (SM-2): </span>
              Next review scheduled in <strong className="text-gold-400">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to ensure long-term retention for your ICSE examinations.
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('explore');
                setCurrentSlide(0);
                setCurrentChallenge(0);
                setErrors(0);
                audioManager.play('whoosh');
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs"
            >
              Replay Exploration Labs ↺
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_ComputerScienceCategoriesComputersMicroSim;
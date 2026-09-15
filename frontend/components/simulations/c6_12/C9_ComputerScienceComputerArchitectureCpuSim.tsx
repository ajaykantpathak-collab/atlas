'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE CONSTANTS ───
const NODE_C9_CS_001 = 'c9_cs_001';
const NODE_C9_CS_002 = 'c9_cs_002';
const NODE_C9_CS_003 = 'c9_cs_003';
const NODE_C9_CS_004 = 'c9_cs_004';
const NODE_C9_CS_005 = 'c9_cs_005';
const NODE_C9_CS_006 = 'c9_cs_006';
const NODE_C9_CS_007 = 'c9_cs_007';
const NODE_C9_CS_008 = 'c9_cs_008';
const NODE_C9_CS_009 = 'c9_cs_009';
const NODE_C9_CS_010 = 'c9_cs_010';

const ALL_NODE_IDS = [
  NODE_C9_CS_001,
  NODE_C9_CS_002,
  NODE_C9_CS_003,
  NODE_C9_CS_004,
  NODE_C9_CS_005,
  NODE_C9_CS_006,
  NODE_C9_CS_007,
  NODE_C9_CS_008,
  NODE_C9_CS_009,
  NODE_C9_CS_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: ISRO Vikram-IX Processor Diagnostic',
  intro: 'You are the Lead Systems Architect at ISRO Telemetry Centre, Bengaluru. The Vikram-IX flight computer telemetry has anomalies across registers, memory pipelines, character streams, and arithmetic logic units. Your mission is to simulate the hardware micro-architecture, diagnose data faults, and calibrate the CPU before launch.',
  context: 'Calibrate the CPU components, verify memory hierarchy speeds, trace binary and hex conversions, validate signed 2s complement arithmetic, and configure Boolean logic control circuits.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In the CPU fetch-decode-execute cycle, what specifically does the Program Counter (PC) hold right before an instruction is fetched?',
  options: [
    'The actual machine code instruction itself',
    'The memory address of the next instruction to be fetched',
    'The accumulated mathematical result of the ALU',
    'The total count of all instructions executed so far',
  ],
  correctIndex: 1,
  hintAfter: 'A common slip is thinking the PC holds the instruction! The PC holds only the memory address (location pointer), while the Instruction Register (IR) holds the actual instruction once fetched.',
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

// ─── 22 CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_001',
    nodeId: NODE_C9_CS_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which CPU register holds the memory address of the next instruction to be fetched?',
    options: ['Instruction Register (IR)', 'Accumulator (ACC)', 'Program Counter (PC)', 'Memory Data Register (MDR)'],
    correctIndex: 2,
    explanation: 'The Program Counter (PC) holds the memory address of the next instruction. The Instruction Register (IR) holds the current instruction, and the Accumulator (ACC) holds intermediate arithmetic/logic results.',
    hints: [
      'Think of the register that keeps track of WHERE in memory the CPU should look next.',
      'It acts as a pointer to the memory location of the forthcoming instruction.',
      'Its name starts with "Program" because it steps through program memory addresses.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_002',
    nodeId: NODE_C9_CS_001,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each CPU component to its correct functional slot in the processor diagram.',
    dragItems: [
      { label: 'ALU', targetId: 'slot_alu' },
      { label: 'Control Unit', targetId: 'slot_cu' },
      { label: 'Registers', targetId: 'slot_reg' },
      { label: 'System Bus', targetId: 'slot_bus' },
    ],
    correctMapping: {
      slot_alu: 'ALU',
      slot_cu: 'Control Unit',
      slot_reg: 'Registers',
      slot_bus: 'System Bus',
    },
    explanation: 'The CPU consists of the Arithmetic & Logic Unit (computational engine), the Control Unit (manager/supervisor), fast internal Registers, and the System Bus connecting CPU to memory and peripherals.',
    hints: [
      'The manager that issues timing/control signals is the Control Unit.',
      'The math and comparison block is the ALU.',
      'The fastest on-chip memory locations are the Registers; the highway is the System Bus.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_003',
    nodeId: NODE_C9_CS_002,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange memory levels in order of decreasing speed (Fastest at top to Slowest at bottom).',
    sortItems: ['Registers (on-chip)', 'Cache Memory (L1/L2/L3)', 'RAM (Main Memory)', 'Secondary Storage (SSD/HDD)'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Registers are on-chip flip-flops (fastest, smallest), followed by SRAM Cache, DRAM Main RAM, and non-volatile Secondary Storage.',
    hints: [
      'Memory directly inside the CPU core is faster than memory outside.',
      'SRAM Cache sits between the CPU and DRAM RAM.',
      'Solid-state and magnetic disks are at the base of the speed pyramid.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_004',
    nodeId: NODE_C9_CS_006,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'An ISRO flight telemetry packet is 32 nibbles in size. How many bytes does this equal?',
    correctAnswer: 16,
    tolerance: 0,
    unit: 'bytes',
    explanation: '1 byte = 2 nibbles (8 bits = 2 × 4 bits). Therefore, 32 nibbles ÷ 2 = 16 bytes.',
    hints: [
      'Recall how many bits are in one nibble and how many bits are in one byte.',
      '1 nibble = 4 bits, 1 byte = 8 bits, so 1 byte = 2 nibbles.',
      'Divide 32 by 2.',
    ],
  },
  {
    id: 'ch_005',
    nodeId: NODE_C9_CS_004,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A compiler translates entire high-level code to machine code at once. Which software category does it belong to?',
    options: ['Application Software (General Purpose)', 'System Software (Language Translator)', 'Application Software (Specific Purpose)', 'Firmware Utility'],
    correctIndex: 1,
    explanation: 'Compilers, interpreters, and assemblers are Language Translators, which are core System Software providing the infrastructure to run software on hardware.',
    hints: [
      'Does a compiler perform end-user tasks (like writing an essay) or does it translate instructions for hardware?',
      'Translators belong to the system infrastructure layer.',
      'System software includes the OS, language translators, and device drivers.',
    ],
  },
  {
    id: 'ch_006',
    nodeId: NODE_C9_CS_009,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What are the exact ASCII decimal code values for uppercase "A", lowercase "a", and digit "0"?',
    options: [
      'A = 1, a = 26, 0 = 0',
      'A = 65, a = 97, 0 = 48',
      'A = 97, a = 65, 0 = 32',
      'A = 65, a = 90, 0 = 57',
    ],
    correctIndex: 1,
    explanation: 'In ASCII: Uppercase "A" is 65 (A–Z: 65–90), lowercase "a" is 97 (a–z: 97–122), and character "0" is 48 ("0"–"9": 48–57). Note the uppercase/lowercase difference is 32 (2^5).',
    hints: [
      'Never confuse alphabetical position (1–26) with ASCII numeric codes!',
      'Uppercase A starts at 65; add 32 for lowercase a.',
      'The digit "0" starts at 48.',
    ],
  },
  {
    id: 'ch_007',
    nodeId: NODE_C9_CS_010,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In Boolean algebra, what is the result of 1 + 1 (logical OR)?',
    options: ['2', '10 (binary two)', '1', '0'],
    correctIndex: 2,
    explanation: 'In Boolean algebra, "+" represents the logical OR operation, which evaluates to 1 if at least one operand is 1. Boolean variables only take values 0 or 1, so 1 + 1 = 1.',
    hints: [
      'In Boolean logic, "+" does NOT mean ordinary arithmetic addition.',
      'It represents the OR gate/operation.',
      'If at least one input is True (1), OR produces True (1).',
    ],
  },
  {
    id: 'ch_008',
    nodeId: NODE_C9_CS_001,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of the CPU Instruction Execution Cycle in chronological order.',
    sortItems: [
      'Address from PC placed in MAR and instruction fetched into IR',
      'Control Unit decodes opcode and determines required operands',
      'ALU executes operation or moves data into Accumulator',
      'Program Counter (PC) is incremented to point to next address',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The CPU instruction cycle strictly follows: 1) Fetch instruction using PC/MAR into IR, 2) Decode by CU, 3) Execute by ALU/registers, 4) Increment PC.',
    hints: [
      'You cannot decode an instruction before fetching it from memory.',
      'Execution happens after understanding the decoded opcode.',
      'The PC is updated to the next instruction address at the conclusion of the cycle.',
    ],
  },
  {
    id: 'ch_009',
    nodeId: NODE_C9_CS_002,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which of the following complete sets gives all THREE accurate reasons why Cache is faster than RAM?',
    options: [
      'Cache is non-volatile, uses magnetic disk platters, and has zero latency',
      'Cache is physically closer to CPU core, has smaller capacity (less data to search), and uses SRAM instead of DRAM',
      'Cache is read-only firmware, uses DRAM technology, and has larger bus width',
      'Cache holds permanent BIOS files, has higher voltage, and does not require a clock',
    ],
    correctIndex: 1,
    explanation: 'Cache is faster than RAM because: 1) Physical proximity to CPU core minimizes signal travel distance, 2) Smaller capacity allows faster search, and 3) It uses Static RAM (SRAM flip-flops), which does not need constant capacitor refreshing like Dynamic RAM (DRAM).',
    hints: [
      'Look for the option highlighting physical distance, search capacity, and the difference between SRAM and DRAM.',
      'Cache is volatile SRAM, not non-volatile or ROM.',
      'DRAM requires periodic capacitor refreshing; SRAM uses fast flip-flops.',
    ],
  },
  {
    id: 'ch_010',
    nodeId: NODE_C9_CS_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The State Bank of India processes 50,000 cheques daily. Why is MICR preferred over optical OCR scanners for cheque clearing?',
    options: [
      'MICR is cheaper and uses standard colour ink cartridges',
      'MICR reads characters printed with magnetic iron-oxide ink (E-13B font), functioning accurately even if cheques are smudged, stamped, or signed over',
      'MICR captures full-colour digital photographs of cheques for word processing',
      'MICR can read pencil marks in predefined bubbles faster than any other sensor',
    ],
    correctIndex: 1,
    explanation: 'MICR (Magnetic Ink Character Recognition) senses the magnetic signature of iron-oxide ink in the E-13B font. It remains readable even if dirty, smudged, or stamped, providing high security and accuracy against optical fraud.',
    hints: [
      'What special property does the ink on a bank cheque have?',
      'Optical scanners get confused by stamps or dirt; magnetic detection ignores surface smudges.',
      'E-13B font printed with iron-oxide ink is the standard for banking cheques.',
    ],
  },
  {
    id: 'ch_011',
    nodeId: NODE_C9_CS_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Convert decimal number 156 into Hexadecimal notation. Show the correct hex representation.',
    options: ['912', '9C', 'C9', '156H'],
    correctIndex: 1,
    explanation: '156 ÷ 16 = 9 remainder 12. In hexadecimal, remainder 12 maps to "C". Next, 9 ÷ 16 = 0 remainder 9. Reading remainders bottom-up gives "9C". Verification: 9×16 + 12 = 144 + 12 = 156.',
    hints: [
      'Divide 156 by 16 repeatedly and collect remainders from bottom to top.',
      '156 / 16 gives quotient 9 and remainder 12.',
      'Remember that hex digits 10–15 map to A, B, C, D, E, F. Remainder 12 is "C".',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_012',
    nodeId: NODE_C9_CS_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'What is the 8-bit Two’s Complement binary representation of the signed decimal integer -5?',
    options: ['10000101', '11111010', '11111011', '00000101'],
    correctIndex: 2,
    explanation: '+5 in 8-bit binary is 00000101. Step 1 (1s complement): invert all bits -> 11111010. Step 2 (2s complement): add 1 -> 11111010 + 1 = 11111011.',
    hints: [
      'First write +5 as 8-bit binary: 00000101.',
      'Invert all bits to find 1s complement: 11111010.',
      'Now add 1 to the 1s complement: 11111010 + 00000001 = 11111011.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_013',
    nodeId: NODE_C9_CS_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Evaluate the Boolean expression: Y = (A AND B) OR (NOT C) given inputs A = 1, B = 0, C = 1.',
    options: ['Y = 1', 'Y = 0', 'Y = 2', 'Y = Undefined'],
    correctIndex: 1,
    explanation: 'Step 1: A AND B = 1 AND 0 = 0. Step 2: NOT C = NOT 1 = 0. Step 3: (A AND B) OR (NOT C) = 0 OR 0 = 0.',
    hints: [
      'Evaluate (A AND B) first: what is 1 AND 0?',
      'Evaluate (NOT C): what is NOT 1?',
      'Combine both results with OR (0 OR 0).',
    ],
  },
  {
    id: 'ch_014',
    nodeId: NODE_C9_CS_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Classify LibreOffice Calc across both the Purpose axis and Licensing axis.',
    options: [
      'Specific Purpose AND Proprietary',
      'General Purpose AND Open Source',
      'General Purpose AND Proprietary',
      'System Software AND Open Source',
    ],
    correctIndex: 1,
    explanation: 'LibreOffice Calc is a versatile spreadsheet usable across schools, offices, and research (General Purpose), and its source code is freely available under open licenses (Open Source).',
    hints: [
      'Can Calc be used for many different spreadsheet tasks or just one job?',
      'Is LibreOffice free/open source or proprietary commercial software?',
      'It is General Purpose application software and Open Source.',
    ],
  },
  {
    id: 'ch_015',
    nodeId: NODE_C9_CS_007,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the Hexadecimal representation of 8-bit binary "10110010" by picking the correct high nibble and low nibble.',
    availableParts: ['B', '2', 'A', '3', 'C', '4'],
    targetState: 'B 2',
    validationHint: 'Group from right: 1011 (hex B = 11) and 0010 (hex 2). Select "B" then "2".',
    explanation: 'Binary 10110010 is split into nibbles from right: 1011 and 0010. 1011 in decimal is 8+2+1 = 11 (Hex "B"). 0010 in decimal is 2 (Hex "2"). The Hex representation is B2.',
    hints: [
      'Split 10110010 into two 4-bit nibbles: [1011] and [0010].',
      '1011 in binary = 8 + 2 + 1 = 11 = Hex digit "B".',
      '0010 in binary = 2 = Hex digit "2". Combine them as "B 2".',
    ],
  },
  {
    id: 'ch_016',
    nodeId: NODE_C9_CS_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate this statement: "The System Bus is a single bidirectional wire carrying memory addresses, data values, and clock pulses simultaneously."',
    options: [
      'Correct: Modern high-speed processors combine all lines into one single wire to save space.',
      'Incorrect: The System Bus consists of three separate buses: Data Bus (bidirectional), Address Bus (unidirectional from CPU), and Control Bus (timing/control signals).',
      'Partially Correct: Data and Addresses share one line, but clock uses a separate crystal.',
      'Incorrect: The Address bus is bidirectional while Data bus is unidirectional.',
    ],
    correctIndex: 1,
    explanation: 'The system bus has 3 dedicated physical channels: Address Bus (unidirectional, CPU -> Memory), Data Bus (bidirectional, carrying values to/from CPU), and Control Bus (transmitting control/clock pulses). Merging them into a single wire would cause electrical collisions and timing chaos.',
    hints: [
      'Are memory addresses sent in both directions, or does the CPU specify the address to memory?',
      'Can data flow into and out of the CPU?',
      'The three buses (Data, Address, Control) have distinct physical roles and directions.',
    ],
  },
  {
    id: 'ch_017',
    nodeId: NODE_C9_CS_006,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A 32-bit microprocessor has a 32-bit wide Address Bus. Calculate the maximum directly addressable memory in Gigabytes (GB). (1 GB = 2^30 bytes)',
    correctAnswer: 4,
    tolerance: 0,
    unit: 'GB',
    explanation: 'With 32 address lines, the CPU can address 2^32 distinct byte locations. 2^32 bytes = 2^(32-30) GB = 2^2 GB = 4 GB.',
    hints: [
      'Calculate total addressable locations: 2^32 bytes.',
      'Express in Gigabytes where 1 GB = 2^30 bytes.',
      '2^32 / 2^30 = 2^(32-30) = 2^2 = 4 GB.',
    ],
  },
  {
    id: 'ch_018',
    nodeId: NODE_C9_CS_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does 8-bit Two’s Complement cover a range of -128 to +127, whereas 8-bit Sign-Magnitude only covers -127 to +127?',
    options: [
      '2s complement uses a 9th parity bit hidden in cache memory',
      'Sign-magnitude wastes a bit pattern with dual zeros (+0: 00000000, -0: 10000000), while 2s complement has a single zero, freeing pattern 10000000 to represent -128',
      'Sign-magnitude numbers cannot represent odd numbers',
      '2s complement does not encode the sign bit in the most significant position',
    ],
    correctIndex: 1,
    explanation: 'Sign-magnitude and 1s complement both suffer from two representations of zero (+0 and -0), wasting 1 of 256 states. 2s complement has exactly one zero (00000000), allowing the extra pattern (10000000) to represent -128.',
    hints: [
      'How many ways can zero be written in sign-magnitude versus 2s complement?',
      'Sign-magnitude has +0 (00000000) and -0 (10000000).',
      'In 2s complement, pattern 10000000 is repurposed for -128.',
    ],
  },
  {
    id: 'ch_019',
    nodeId: NODE_C9_CS_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is Java built natively on Unicode rather than 7-bit ASCII or 8-bit Extended ASCII?',
    options: [
      'Unicode executes arithmetic calculations twice as fast as ASCII inside the ALU',
      'ASCII only supports 128 English characters; Unicode provides over 140,000 code points supporting Devanagari, Tamil, Arabic, Chinese, and emojis for global software localization',
      'Unicode files take up less disk space than ASCII files on all operating systems',
      'Extended ASCII is restricted to IBM mainframes while Unicode runs on microchips',
    ],
    correctIndex: 1,
    explanation: 'ASCII is limited to 128 characters (English). Unicode was created as a universal standard assigning unique code points (U+xxxx) to every script globally (Devanagari, Tamil, Kanji, etc.), allowing Java to support true multilingual globalization.',
    hints: [
      'Consider how many languages exist in India and worldwide compared to ASCII’s 128 slots.',
      'Java was designed for global internet applications and internationalization.',
      'Unicode supports over 140,000 characters across all global scripts.',
    ],
  },
  {
    id: 'ch_020',
    nodeId: NODE_C9_CS_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Design ISRO Vikram-IX abort logic: Thrusters fire (T=1) if: [Fuel pressure low (P=1) OR Temp high (H=1)] AND Manual override NOT active (NOT M). What is the Boolean expression?',
    options: [
      'T = (P AND H) + M',
      'T = (P + H) · M̄',
      'T = P · H · M',
      'T = (P + H) + NOT M',
    ],
    correctIndex: 1,
    explanation: 'Fuel pressure low OR Temp high is represented as (P + H). Manual override NOT active is represented as M̄ (NOT M). ANDing them gives T = (P + H) · M̄.',
    hints: [
      'OR represents logical addition (+), so (Fuel low OR Temp high) is (P + H).',
      'AND is logical multiplication (·).',
      'NOT active override is M̄ or NOT M.',
    ],
  },
  {
    id: 'ch_021',
    nodeId: NODE_C9_CS_004,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A newly attached high-precision laser spectrometer is detected via USB by Windows, but the flight control application cannot send command sequences to it. What is the root cause?',
    options: [
      'The secondary storage is formatted with FAT32 instead of NTFS',
      'The device driver translating generic OS I/O commands into the spectrometer’s specific hardware control signals is missing or corrupt',
      'The CPU word size has automatically downgraded from 64-bit to 8-bit',
      'The computer RAM has become non-volatile',
    ],
    correctIndex: 1,
    explanation: 'Hardware detection confirms physical USB connectivity, but the OS requires a specialized Device Driver to translate generic OS I/O calls into the device-specific hardware signals and register commands.',
    hints: [
      'Physical detection is handled by the USB bus controller, but communication needs a translator.',
      'What piece of system software acts as the translator between generic OS commands and specific hardware signals?',
      'Device Drivers provide device-specific signal control.',
    ],
  },
  {
    id: 'ch_022',
    nodeId: NODE_C9_CS_009,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In Java character manipulation, how many decimal integer units must be added to the ASCII code of "G" (71) to convert it to lowercase "g"?',
    correctAnswer: 32,
    tolerance: 0,
    unit: 'units',
    explanation: 'In ASCII, uppercase letters (A–Z: 65–90) and lowercase letters (a–z: 97–122) differ by exactly 32 (2^5). For "G" (71) + 32 = 103 ("g"). Bit 5 is toggled.',
    hints: [
      'Look at the difference between "A" (65) and "a" (97).',
      '97 - 65 = 32.',
      'All corresponding uppercase and lowercase ASCII letters are spaced by 32.',
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C9_CS_001,
  title: 'Computer Architecture & Micro-Systems',
  definition: 'The detailed study of CPU internal components (ALU, CU, Registers, System Bus), Memory Hierarchy, Number Systems, Data/Character Encodings, and Boolean Logic.',
  eli5: 'Think of the computer as an ISRO space mission: the CPU is the flight commander, the registers are quick notepads, RAM is the mission log, binary is the secret language, and logic gates are the safety switches.',
  misconceptions: [
    {
      misconception: 'The Program Counter (PC) stores the actual instruction code.',
      correction: 'The PC stores the MEMORY ADDRESS of the next instruction; the Instruction Register (IR) holds the actual instruction once fetched.',
    },
    {
      misconception: 'ROM is the fastest memory because it is permanent.',
      correction: 'Speed is determined by proximity and technology, not permanence. Registers and SRAM Cache are fastest; ROM is non-volatile firmware below RAM in speed.',
    },
    {
      misconception: 'The System Bus is just one common wire carrying all signals.',
      correction: 'The System Bus consists of three separate physical buses: Address Bus (unidirectional), Data Bus (bidirectional), and Control Bus.',
    },
    {
      misconception: 'In Boolean algebra, 1 + 1 equals 2 or binary 10.',
      correction: 'In Boolean algebra, "+" is logical OR. 1 OR 1 equals 1 because Boolean variables only represent binary True (1) or False (0).',
    },
    {
      misconception: 'ASCII and Unicode are identical character encoding schemes.',
      correction: 'ASCII is 7-bit (128 characters for English), while Unicode is a universal code point system supporting over 140,000 characters for all world languages.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which register holds intermediate arithmetic results?', options: ['Program Counter', 'Instruction Register', 'Accumulator', 'Memory Address Register'], correctIndex: 2 },
    { question: 'Which memory level sits directly between CPU registers and RAM?', options: ['Hard Disk', 'Cache Memory', 'ROM', 'Flash Drive'], correctIndex: 1 },
    { question: 'What does MICR stand for?', options: ['Magnetic Ink Character Recognition', 'Micro Input Code Reader', 'Marked Image Character Reader', 'Magnetic Internal Chip Reader'], correctIndex: 0 },
    { question: 'Which is an example of system software?', options: ['MS Excel', 'Operating System', 'Payroll System', 'Hotel Booking App'], correctIndex: 1 },
    { question: 'How many bits are in one nibble?', options: ['2', '4', '8', '16'], correctIndex: 1 },
    { question: 'What is hexadecimal "F" in decimal?', options: ['14', '15', '16', '10'], correctIndex: 1 },
    { question: 'What is the 1s complement of 8-bit binary 00000101?', options: ['11111010', '11111011', '10000101', '00000110'], correctIndex: 0 },
    { question: 'What is the ASCII value of capital letter "A"?', options: ['1', '48', '65', '97'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student demonstrates full mastery of CPU micro-architecture, memory hierarchy, binary/hex conversion, signed arithmetic, character encodings, and Boolean algebra.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. CPU Internal Micro-Architecture & Bus Flow',
    instruction: 'Click each CPU sub-unit to inspect its role and trigger simulated data bus signals.',
    interactionType: 'click-cpu',
    nodeId: NODE_C9_CS_001,
  },
  {
    title: '2. The 5-Level Memory Hierarchy & Latency',
    instruction: 'Adjust the memory level slider to observe the speed vs capacity trade-off.',
    interactionType: 'slider-memory',
    nodeId: NODE_C9_CS_002,
  },
  {
    title: '3. Interactive Bit-Toggle: Binary, Hex & ASCII',
    instruction: 'Flip the 8 bits on the telemetry byte to observe live conversions in Decimal, Hex, and ASCII.',
    interactionType: 'toggle-bits',
    nodeId: NODE_C9_CS_006,
  },
  {
    title: '4. Signed Number Calculator (1s & 2s Complement)',
    instruction: 'Select positive/negative integers to visualize how Two’s Complement enables unified ALU subtraction.',
    interactionType: 'calc-complement',
    nodeId: NODE_C9_CS_008,
  },
  {
    title: '5. Real-Time Boolean Logic Simulator',
    instruction: 'Toggle inputs A, B, and C to simulate the AND, OR, and NOT thruster control gate outputs.',
    interactionType: 'logic-gates',
    nodeId: NODE_C9_CS_010,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you invert all 8 bits of binary "00000101" (+5) and add 1, what decimal number does this Two’s Complement pattern represent?',
    options: ['+6', '-5', '-6', '+251'],
    correctIndex: 1,
    verifyInstruction: 'Check Step 4 of exploration: 00000101 inverted is 11111010; adding 1 yields 11111011, which is -5 in 2s complement.',
    nodeId: NODE_C9_CS_008,
  },
  {
    question: 'Predict: If you raise CPU clock cycles but the program frequently misses Cache and fetches from RAM, what happens to CPU idle wait states?',
    options: ['Wait states decrease to zero', 'Wait states dramatically increase (CPU bottleneck)', 'RAM automatically turns into SRAM', 'Cache doubles its physical capacity'],
    correctIndex: 1,
    verifyInstruction: 'Observe the Memory Hierarchy: RAM latency is ~50-100× slower than Cache, forcing the CPU to stall during cache misses.',
    nodeId: NODE_C9_CS_002,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What pattern do you notice when toggling Bit 5 (value 32) of any ASCII letter code?',
    observableOptions: [
      'It switches the letter between Uppercase and Lowercase (e.g., 65 "A" ↔ 97 "a")',
      'It changes the letter into a numeric digit',
      'It clears the entire byte to zero',
      'It reverses the byte order',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_CS_009,
  },
  {
    question: 'What happens to the logical OR gate output whenever at least ONE input is set to 1?',
    observableOptions: [
      'The output immediately becomes 1 (True)',
      'The output immediately becomes 0 (False)',
      'The output oscillates continuously',
      'The output requires all inputs to be 1',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_CS_010,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Systems Architect Challenge',
  description: 'Design a micro-architecture specification sheet for a low-power Mars Rover computer. Choose the register count, cache tier sizes, primary memory, character encoding, and error-check Boolean parity bit.',
  steps: [
    'Define the 4 primary CPU registers and their specific telemetry storage roles.',
    'Specify the sizes for L1 Cache, L2 Cache, and ECC-RAM.',
    'Map a 3-bit sensor warning code into an Octal file status permission.',
    'Calculate the 8-bit Two’s complement representation of a temperature reading of -14°C.',
  ],
};

function C9_ComputerScienceComputerArchitectureCpuSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['cs'] || { name: 'Computer Science', emoji: '💻', color: 'cyan' };

  // Phase navigation
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant-style Interactive Exploration states
  const [selectedCpuUnit, setSelectedCpuUnit] = useState<string>('cu');
  const [memoryLevelIndex, setMemoryLevelIndex] = useState<number>(0);
  const [bitArray, setBitArray] = useState<number[]>([0, 1, 0, 0, 0, 0, 0, 1]); // Initial 'A' (65)
  const [signedInputValue, setSignedInputValue] = useState<number>(-5);
  const [gateA, setGateA] = useState<number>(1);
  const [gateB, setGateB] = useState<number>(0);
  const [gateC, setGateC] = useState<number>(1);

  // Reflection thoughts
  const [reflections, setReflections] = useState<{ [key: string]: string }>({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Predict-then-check & Observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Sandbox variables
  const [sandboxClockSpeed, setSandboxClockSpeed] = useState<number>(2.4); // GHz
  const [sandboxWordSize, setSandboxWordSize] = useState<number>(32); // bits
  const [sandboxCacheHitRate, setSandboxCacheHitRate] = useState<number>(90); // %
  const [sandboxAluOp, setSandboxAluOp] = useState<'ADD' | 'SUB' | 'AND' | 'OR'>('ADD');
  const [sandboxVal1, setSandboxVal1] = useState<number>(12);
  const [sandboxVal2, setSandboxVal2] = useState<number>(7);

  // Challenge and Adaptive BKT states
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

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

  // Non-MCQ challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Adaptive Filtered Challenges
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Derived bit values for Telemetry Explorer
  const byteValue = useMemo(() => {
    return bitArray.reduce((acc, bit, idx) => acc + bit * Math.pow(2, 7 - idx), 0);
  }, [bitArray]);

  const hexValue = useMemo(() => {
    const high = (bitArray[0] << 3) | (bitArray[1] << 2) | (bitArray[2] << 1) | bitArray[3];
    const low = (bitArray[4] << 3) | (bitArray[5] << 2) | (bitArray[6] << 1) | bitArray[7];
    return `${high.toString(16).toUpperCase()}${low.toString(16).toUpperCase()}`;
  }, [bitArray]);

  const asciiChar = useMemo(() => {
    if (byteValue >= 32 && byteValue <= 126) return String.fromCharCode(byteValue);
    return `[Code ${byteValue}]`;
  }, [byteValue]);

  // Derived memory hierarchy data
  const memoryLevels = useMemo(() => [
    { name: 'Registers', size: '32-64 Bytes', speed: '< 0.5 ns', cost: '₹₹₹₹₹ (Highest)', tech: 'CPU Flip-Flops', volatile: 'Volatile' },
    { name: 'L1/L2/L3 Cache', size: '512 KB - 32 MB', speed: '1 - 10 ns', cost: '₹₹₹₹ (Very High)', tech: 'SRAM (Static)', volatile: 'Volatile' },
    { name: 'Main RAM', size: '8 - 64 GB', speed: '50 - 100 ns', cost: '₹₹₹ (Moderate)', tech: 'DRAM (Dynamic)', volatile: 'Volatile' },
    { name: 'ROM (Firmware)', size: '4 - 16 MB', speed: '100 - 200 ns', cost: '₹₹ (Low)', tech: 'Flash / EEPROM', volatile: 'Non-Volatile' },
    { name: 'Secondary SSD/HDD', size: '512 GB - 4 TB', speed: '50 - 500 µs', cost: '₹ (Lowest per byte)', tech: 'NAND Flash / Magnetic', volatile: 'Non-Volatile' },
  ], []);

  // Sandbox ALU calculation
  const sandboxAluResult = useMemo(() => {
    switch (sandboxAluOp) {
      case 'ADD': return sandboxVal1 + sandboxVal2;
      case 'SUB': return sandboxVal1 - sandboxVal2;
      case 'AND': return sandboxVal1 & sandboxVal2;
      case 'OR': return sandboxVal1 | sandboxVal2;
      default: return 0;
    }
  }, [sandboxAluOp, sandboxVal1, sandboxVal2]);

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adaptive BKT difficulty updater
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Canvas-based real-time CPU Pipeline visualizer animation loop
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
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Animated Bus Pulse
      const pulseX = (frame * 3) % canvas.width;
      const gradient = ctx.createLinearGradient(pulseX - 40, 0, pulseX + 40, 0);
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0)');
      gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.8)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, canvas.height / 2 - 4, canvas.width, 8);

      // Status indicator dot
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(canvas.width - 15, 15, 5 + Math.sin(frame * 0.1) * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(`TELEMETRY BUS: CLOCK ${(sandboxClockSpeed).toFixed(1)} GHz | ACTIVE`, 10, 16);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [sandboxClockSpeed]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── MEMOISED CALLBACKS ───

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      setCurrentHint(activeChallenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, activeChallenge]);

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
    speechManager.speak(isCorrect ? 'Accurate telemetry reading!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the ISRO CPU Architecture Simulation. Let us explore the hardware systems.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with clock speeds, ALU operations, and memory parameters.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Mission diagnostic initiated. Answer the architectural challenges to calibrate the spacecraft.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Diagnostic sequence complete. Telemetry systems calibrated successfully!');
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

  const handlePrediction = useCallback((_idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now inspect the simulation below to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent scientific observation!' : 'Look closely at the bit display.');
  }, []);

  const handleToggleBit = useCallback((index: number) => {
    audioManager.play('tap');
    setBitArray(prev => {
      const next = [...prev];
      next[index] = next[index] === 1 ? 0 : 1;
      return next;
    });
  }, []);

  const handleCpuUnitClick = useCallback((unit: string) => {
    setSelectedCpuUnit(unit);
    audioManager.play('tap');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length === activeChallenge.sortItems?.length ? [...prev] : activeChallenge.sortItems?.map((_, i) => i) || [];
      const [moved] = base.splice(fromIdx, 1);
      base.splice(toIdx, 0, moved);
      return base;
    });
  }, [activeChallenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
    const isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
      }
      showNextHint();
    }
  }, [sortArrangement, activeChallenge, showNextHint, hitMisconceptions]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = answer === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct calibration verified!');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Review the architectural explanation step-by-step.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  const handleSparkleClick = useCallback((e: React.MouseEvent) => {
    setSparklePos({ x: e.clientX, y: e.clientY });
    setShowSparkle(true);
    audioManager.play('sparkle');
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSparkleClick}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/20 cursor-pointer"
            aria-label="Sparkle interactive icon"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                ICSE Class 9 Computer Science
              </span>
              <span className="text-xs font-semibold text-slate-400">ISRO Telemetry Sim</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors ${
                phase === p
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              aria-label={`Switch to ${p} phase`}
            >
              {p.toUpperCase()}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── LIVE TELEMETRY BUS CANVAS ─── */}
      <div className="mb-6 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/80 shadow-inner">
        <canvas ref={canvasRef} width={800} height={32} className="w-full h-8 block" />
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 rounded-2xl border border-cyan-800/50 shadow-xl">
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🚀</span> {SCENARIO.title}
            </div>
            <p className="text-slate-200 text-base leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800 font-mono">
              DIRECTIVE: {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800 uppercase">
              Curiosity Hook • Pre-Flight Check
            </span>
            <h2 className="text-lg font-bold text-white mt-3 mb-4">{DISCOVERY_QUESTION.question}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                      : 'bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200'
                  }`}
                  aria-label={`Discovery option: ${opt}`}
                >
                  <span className="font-bold text-cyan-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! The PC points to the address, while the IR holds the code.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-600/30 whitespace-nowrap"
                  aria-label="Proceed to interactive exploration"
                >
                  Enter Hardware Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (Brilliant Style with 3+ Topic SVGs) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase text-cyan-400">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => Math.max(0, s - 1));
                  audioManager.play('tap');
                }}
                disabled={currentSlide === 0}
                className="px-3 py-1.5 bg-slate-800 text-slate-200 text-xs font-bold rounded-lg disabled:opacity-40"
                aria-label="Previous step"
              >
                ← Prev
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) {
                    setCurrentSlide(s => s + 1);
                    audioManager.play('tap');
                  } else {
                    handleAdvanceToSandbox();
                  }
                }}
                className="px-4 py-1.5 bg-cyan-600 text-white text-xs font-bold rounded-lg shadow-md shadow-cyan-600/30"
                aria-label="Next step"
              >
                {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Step →' : 'Enter Sandbox →'}
              </motion.button>
            </div>
          </div>

          <p className="text-sm text-cyan-300 font-medium bg-cyan-950/40 p-3 rounded-xl border border-cyan-900">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <AnimatePresence mode="wait">
            {/* SVG 1: CPU Architecture & Bus Flow */}
            {currentSlide === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 bg-slate-900 rounded-2xl border border-slate-800"
              >
                <div className="lg:col-span-8 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <svg viewBox="0 0 600 360" className="w-full h-auto">
                    <rect x="20" y="20" width="340" height="320" rx="16" fill="#0f172a" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 2" />
                    <text x="35" y="45" fill="#38bdf8" fontSize="12" fontWeight="bold">CPU PROCESSOR CORE</text>

                    {/* Control Unit */}
                    <g onClick={() => handleCpuUnitClick('cu')} className="cursor-pointer">
                      <rect x="40" y="60" width="140" height="90" rx="10" fill={selectedCpuUnit === 'cu' ? '#0369a1' : '#1e293b'} stroke="#38bdf8" strokeWidth={selectedCpuUnit === 'cu' ? 3 : 1} />
                      <text x="110" y="100" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">CONTROL UNIT</text>
                      <text x="110" y="120" textAnchor="middle" fill="#94a3b8" fontSize="10">(CU) Manager</text>
                    </g>

                    {/* ALU */}
                    <g onClick={() => handleCpuUnitClick('alu')} className="cursor-pointer">
                      <polygon points="200,60 340,60 310,150 230,150" fill={selectedCpuUnit === 'alu' ? '#047857' : '#1e293b'} stroke="#10b981" strokeWidth={selectedCpuUnit === 'alu' ? 3 : 1} />
                      <text x="270" y="100" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">ALU</text>
                      <text x="270" y="120" textAnchor="middle" fill="#94a3b8" fontSize="10">Arithmetic & Logic</text>
                    </g>

                    {/* Registers Block */}
                    <g onClick={() => handleCpuUnitClick('reg')} className="cursor-pointer">
                      <rect x="40" y="180" width="300" height="130" rx="10" fill={selectedCpuUnit === 'reg' ? '#581c87' : '#1e293b'} stroke="#c084fc" strokeWidth={selectedCpuUnit === 'reg' ? 3 : 1} />
                      <text x="190" y="205" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">INTERNAL REGISTERS</text>

                      <rect x="55" y="220" width="60" height="35" rx="4" fill="#334155" />
                      <text x="85" y="242" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">PC</text>

                      <rect x="125" y="220" width="60" height="35" rx="4" fill="#334155" />
                      <text x="155" y="242" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">IR</text>

                      <rect x="195" y="220" width="60" height="35" rx="4" fill="#334155" />
                      <text x="225" y="242" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">ACC</text>

                      <rect x="265" y="220" width="60" height="35" rx="4" fill="#334155" />
                      <text x="295" y="242" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">MAR</text>

                      <text x="190" y="295" textAnchor="middle" fill="#94a3b8" fontSize="9">PC: Address | IR: Opcode | ACC: Math | MAR: RAM Address</text>
                    </g>

                    {/* System Bus Lines */}
                    <g onClick={() => handleCpuUnitClick('bus')} className="cursor-pointer">
                      <rect x="390" y="40" width="180" height="280" rx="12" fill="#1e293b" stroke="#f59e0b" strokeWidth={selectedCpuUnit === 'bus' ? 3 : 1} />
                      <text x="480" y="70" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">MAIN RAM / MEMORY</text>

                      <path d="M 360,100 L 390,100" stroke="#38bdf8" strokeWidth="3" />
                      <text x="375" y="90" textAnchor="middle" fill="#38bdf8" fontSize="8">Address (Unidirectional)</text>

                      <path d="M 360,200 L 390,200" stroke="#10b981" strokeWidth="3" />
                      <text x="375" y="190" textAnchor="middle" fill="#10b981" fontSize="8">Data (Bidirectional)</text>

                      <path d="M 360,280 L 390,280" stroke="#f43f5e" strokeWidth="3" />
                      <text x="375" y="270" textAnchor="middle" fill="#f43f5e" fontSize="8">Control/Clock</text>
                    </g>
                  </svg>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2">Component Profile</h3>
                    {selectedCpuUnit === 'cu' && (
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <strong className="text-white">Control Unit (CU):</strong> The manager of the CPU. It fetches instructions from memory, decodes opcodes, and issues timing signals to the ALU and registers. It does NOT perform arithmetic.
                      </p>
                    )}
                    {selectedCpuUnit === 'alu' && (
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <strong className="text-white">Arithmetic & Logic Unit (ALU):</strong> The computational engine. Performs addition, subtraction, AND, OR, NOT, and relational comparisons.
                      </p>
                    )}
                    {selectedCpuUnit === 'reg' && (
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <strong className="text-white">Registers:</strong> Ultra-fast on-chip storage.
                        <br />• <strong>PC:</strong> Holds address of NEXT instruction.
                        <br />• <strong>IR:</strong> Holds CURRENT instruction.
                        <br />• <strong>ACC:</strong> Holds calculation results.
                        <br />• <strong>MAR:</strong> Holds memory address being read/written.
                      </p>
                    )}
                    {selectedCpuUnit === 'bus' && (
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <strong className="text-white">System Bus Channels:</strong>
                        <br />• <strong>Address Bus:</strong> Unidirectional (CPU → RAM).
                        <br />• <strong>Data Bus:</strong> Bidirectional (CPU ↔ RAM/IO).
                        <br />• <strong>Control Bus:</strong> Clock & read/write commands.
                      </p>
                    )}
                  </div>

                  <div className="p-3 bg-cyan-950/30 rounded-xl border border-cyan-800/50 text-xs text-cyan-200">
                    💡 Click any component inside the diagram to inspect its dedicated function.
                  </div>
                </div>
              </motion.div>
            )}

            {/* SVG 2: Memory Hierarchy Speed/Capacity Pyramid */}
            {currentSlide === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 p-6 bg-slate-900 rounded-2xl border border-slate-800"
              >
                {!predictionMade ? (
                  <div className="p-4 bg-slate-950 rounded-xl border border-amber-800/50">
                    <span className="text-xs font-bold text-amber-400 uppercase">Predict First</span>
                    <p className="text-sm text-white font-semibold mt-1 mb-3">{PREDICTION_QUESTIONS[1].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handlePrediction(i)}
                          className="p-2.5 text-left bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700"
                          aria-label={`Prediction option: ${opt}`}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800 text-xs text-emerald-300">
                    ✓ Prediction recorded! Use the slider and interactive pyramid below to verify memory latency.
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Topic SVG 2: Memory Pyramid */}
                  <div className="lg:col-span-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 400 260" className="w-full h-auto">
                      {/* Top tier: Registers */}
                      <polygon
                        points="200,10 160,50 240,50"
                        fill={memoryLevelIndex === 0 ? '#06b6d4' : '#1e293b'}
                        stroke="#38bdf8"
                        strokeWidth={memoryLevelIndex === 0 ? 3 : 1}
                        className="cursor-pointer"
                        onClick={() => setMemoryLevelIndex(0)}
                      />
                      <text x="200" y="38" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Registers (&lt;0.5ns)</text>

                      {/* Tier 2: Cache */}
                      <polygon
                        points="155,55 120,95 280,95 245,55"
                        fill={memoryLevelIndex === 1 ? '#3b82f6' : '#1e293b'}
                        stroke="#60a5fa"
                        strokeWidth={memoryLevelIndex === 1 ? 3 : 1}
                        className="cursor-pointer"
                        onClick={() => setMemoryLevelIndex(1)}
                      />
                      <text x="200" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Cache (SRAM: 1-10ns)</text>

                      {/* Tier 3: RAM */}
                      <polygon
                        points="115,100 80,140 320,140 285,100"
                        fill={memoryLevelIndex === 2 ? '#10b981' : '#1e293b'}
                        stroke="#34d399"
                        strokeWidth={memoryLevelIndex === 2 ? 3 : 1}
                        className="cursor-pointer"
                        onClick={() => setMemoryLevelIndex(2)}
                      />
                      <text x="200" y="125" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Main RAM (DRAM: 50-100ns)</text>

                      {/* Tier 4: ROM */}
                      <polygon
                        points="75,145 40,185 360,185 325,145"
                        fill={memoryLevelIndex === 3 ? '#f59e0b' : '#1e293b'}
                        stroke="#fbbf24"
                        strokeWidth={memoryLevelIndex === 3 ? 3 : 1}
                        className="cursor-pointer"
                        onClick={() => setMemoryLevelIndex(3)}
                      />
                      <text x="200" y="170" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">ROM / Firmware (Non-Volatile)</text>

                      {/* Tier 5: Secondary Storage */}
                      <polygon
                        points="35,190 0,230 400,230 365,190"
                        fill={memoryLevelIndex === 4 ? '#8b5cf6' : '#1e293b'}
                        stroke="#a78bfa"
                        strokeWidth={memoryLevelIndex === 4 ? 3 : 1}
                        className="cursor-pointer"
                        onClick={() => setMemoryLevelIndex(4)}
                      />
                      <text x="200" y="215" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Secondary Storage (SSD / HDD: 50-500µs)</text>

                      {/* Arrows on sides */}
                      <text x="25" y="30" fill="#38bdf8" fontSize="9">▲ HIGHEST SPEED</text>
                      <text x="375" y="250" textAnchor="end" fill="#a78bfa" fontSize="9">▼ LARGEST CAPACITY</text>
                    </svg>
                  </div>

                  {/* Level Details */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-cyan-400">Selected: {memoryLevels[memoryLevelIndex].name}</span>
                      <span className="text-slate-400">{memoryLevels[memoryLevelIndex].volatile}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={4}
                      value={memoryLevelIndex}
                      onChange={(e) => {
                        setMemoryLevelIndex(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-cyan-500 cursor-pointer"
                      aria-label="Select Memory Hierarchy Level"
                    />
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase block">Access Speed</span>
                        <strong className="text-emerald-400 text-sm">{memoryLevels[memoryLevelIndex].speed}</strong>
                      </div>
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase block">Typical Size</span>
                        <strong className="text-cyan-400 text-sm">{memoryLevels[memoryLevelIndex].size}</strong>
                      </div>
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase block">Cost Per Byte</span>
                        <strong className="text-amber-400 text-sm">{memoryLevels[memoryLevelIndex].cost}</strong>
                      </div>
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase block">Technology</span>
                        <strong className="text-purple-400 text-sm">{memoryLevels[memoryLevelIndex].tech}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Interactive Bit-Toggle (Binary, Hex, ASCII) */}
            {currentSlide === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 p-6 bg-slate-900 rounded-2xl border border-slate-800"
              >
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-cyan-400 uppercase">8-Bit Telemetry Register</span>
                    <span className="text-xs text-slate-400">Click any switch to toggle (0 ↔ 1)</span>
                  </div>

                  <div className="grid grid-cols-8 gap-2">
                    {bitArray.map((bit, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleToggleBit(idx)}
                        className={`p-3 md:p-4 rounded-xl font-mono text-center transition-all ${
                          bit === 1
                            ? 'bg-gradient-to-b from-cyan-500 to-blue-600 text-white font-black shadow-lg shadow-cyan-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                        aria-label={`Bit ${7 - idx} with place value ${Math.pow(2, 7 - idx)}, currently ${bit}`}
                      >
                        <div className="text-xs text-slate-300 opacity-80 mb-1">2^{7 - idx}</div>
                        <div className="text-lg md:text-2xl font-black">{bit}</div>
                        <div className="text-[10px] text-slate-300 mt-1">{Math.pow(2, 7 - idx)}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                    <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Decimal Magnitude</span>
                    <span className="text-3xl font-black text-emerald-400 font-mono">{byteValue}</span>
                    <p className="text-[10px] text-slate-400 mt-1">Base-10 (0–255)</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                    <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Hexadecimal (2 Nibbles)</span>
                    <span className="text-3xl font-black text-cyan-400 font-mono">0x{hexValue}</span>
                    <p className="text-[10px] text-slate-400 mt-1">High: 0x{hexValue[0]} | Low: 0x{hexValue[1]}</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                    <span className="text-xs text-slate-400 uppercase font-bold block mb-1">ASCII Character</span>
                    <span className="text-3xl font-black text-purple-400 font-mono">'{asciiChar}'</span>
                    <p className="text-[10px] text-slate-400 mt-1">Offset: 'A'(65) + 32 = 'a'(97)</p>
                  </div>
                </div>

                {!observationAnswered && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800">
                    <span className="text-xs font-bold text-indigo-400 uppercase">Observation Check</span>
                    <p className="text-sm text-white font-semibold mt-1 mb-3">{OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="space-y-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservation(i)}
                          className="w-full p-2.5 text-left bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs rounded-lg border border-slate-700"
                          aria-label={`Observation option: ${opt}`}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 4: Signed Numbers (1s & 2s Complement) */}
            {currentSlide === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 p-6 bg-slate-900 rounded-2xl border border-slate-800"
              >
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <label className="text-xs text-slate-400 uppercase font-bold block mb-1">Select Signed Integer</label>
                    <div className="flex items-center gap-2">
                      {[-5, -14, -128, +5, +47].map((num) => (
                        <motion.button
                          key={num}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSignedInputValue(num);
                            audioManager.play('tap');
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                            signedInputValue === num
                              ? 'bg-cyan-600 text-white'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                          aria-label={`Select integer ${num}`}
                        >
                          {num > 0 ? `+${num}` : num}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">8-Bit Range</span>
                    <strong className="text-emerald-400 text-sm">-128 to +127 (2s Complement)</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-amber-400 uppercase block mb-2">1. Sign-Magnitude</span>
                    <div className="font-mono text-sm text-slate-200">
                      {signedInputValue >= 0
                        ? `0${signedInputValue.toString(2).padStart(7, '0')}`
                        : `1${Math.abs(signedInputValue).toString(2).padStart(7, '0')}`}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2">
                      Leftmost bit is Sign (0=+, 1=-). Has dual zeros (+0, -0).
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-cyan-400 uppercase block mb-2">2. One's Complement</span>
                    <div className="font-mono text-sm text-slate-200">
                      {signedInputValue >= 0
                        ? signedInputValue.toString(2).padStart(8, '0')
                        : Math.abs(signedInputValue)
                            .toString(2)
                            .padStart(8, '0')
                            .split('')
                            .map(b => (b === '0' ? '1' : '0'))
                            .join('')}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2">
                      All bits inverted for negative numbers. Dual zeros (+0, -0).
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-emerald-800/80 bg-emerald-950/20">
                    <span className="text-xs font-bold text-emerald-400 uppercase block mb-2">3. Two's Complement (Standard)</span>
                    <div className="font-mono text-base font-bold text-emerald-300">
                      {signedInputValue >= 0
                        ? signedInputValue.toString(2).padStart(8, '0')
                        : ((~Math.abs(signedInputValue) + 1) & 0xff).toString(2).padStart(8, '0')}
                    </div>
                    <p className="text-[11px] text-emerald-200 mt-2">
                      Flip all bits + Add 1. Single zero (00000000), enables hardware subtract by adding!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: SVG 3: Boolean Logic Gate Circuit Diagram */}
            {currentSlide === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 p-6 bg-slate-900 rounded-2xl border border-slate-800"
              >
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-cyan-400 uppercase block mb-3">Logic Signal Inputs</span>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { label: 'Sensor A (Pressure)', val: gateA, setter: setGateA },
                      { label: 'Sensor B (Temp)', val: gateB, setter: setGateB },
                      { label: 'Sensor C (Manual Override)', val: gateC, setter: setGateC },
                    ].map((gate) => (
                      <motion.button
                        key={gate.label}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          gate.setter(gate.val === 1 ? 0 : 1);
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
                          gate.val === 1
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                            : 'bg-rose-900/60 text-rose-200 border border-rose-700'
                        }`}
                        aria-label={`Toggle ${gate.label}, currently ${gate.val}`}
                      >
                        <span>{gate.label}:</span>
                        <span className="font-mono text-sm">{gate.val} ({gate.val === 1 ? 'TRUE' : 'FALSE'})</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Topic SVG 3: Circuit Diagram */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <svg viewBox="0 0 600 220" className="w-full h-auto">
                    {/* Inputs */}
                    <text x="20" y="45" fill={gateA ? '#10b981' : '#f43f5e'} fontSize="11" fontWeight="bold">Input A: {gateA}</text>
                    <line x1="120" y1="40" x2="190" y2="40" stroke={gateA ? '#10b981' : '#64748b'} strokeWidth="3" />

                    <text x="20" y="85" fill={gateB ? '#10b981' : '#f43f5e'} fontSize="11" fontWeight="bold">Input B: {gateB}</text>
                    <line x1="120" y1="80" x2="190" y2="80" stroke={gateB ? '#10b981' : '#64748b'} strokeWidth="3" />

                    {/* OR Gate (A + B) */}
                    <path d="M 190,30 Q 230,60 270,60 Q 230,60 190,90 Q 210,60 190,30" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                    <text x="220" y="64" fill="#38bdf8" fontSize="10" fontWeight="bold">OR</text>

                    {/* Wire from OR to AND */}
                    <line x1="270" y1="60" x2="380" y2="80" stroke={(gateA | gateB) ? '#10b981' : '#64748b'} strokeWidth="3" />
                    <text x="310" y="60" fill="#94a3b8" fontSize="9">A + B = {gateA | gateB}</text>

                    {/* Input C */}
                    <text x="20" y="165" fill={gateC ? '#10b981' : '#f43f5e'} fontSize="11" fontWeight="bold">Input C: {gateC}</text>
                    <line x1="120" y1="160" x2="190" y2="160" stroke={gateC ? '#10b981' : '#64748b'} strokeWidth="3" />

                    {/* NOT Gate (C̄) */}
                    <polygon points="190,145 240,160 190,175" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
                    <circle cx="245" cy="160" r="4" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
                    <text x="205" y="163" fill="#fbbf24" fontSize="9" fontWeight="bold">NOT</text>

                    {/* Wire from NOT to AND */}
                    <line x1="250" y1="160" x2="380" y2="110" stroke={(gateC === 0) ? '#10b981' : '#64748b'} strokeWidth="3" />
                    <text x="310" y="150" fill="#94a3b8" fontSize="9">C̄ = {gateC === 1 ? 0 : 1}</text>

                    {/* AND Gate */}
                    <path d="M 380,70 L 420,70 A 25,25 0 0,1 420,120 L 380,120 Z" fill="#1e293b" stroke="#a78bfa" strokeWidth="2" />
                    <text x="400" y="98" fill="#a78bfa" fontSize="10" fontWeight="bold">AND</text>

                    {/* Output Line */}
                    <line x1="445" y1="95" x2="520" y2="95" stroke={((gateA | gateB) & (gateC === 1 ? 0 : 1)) ? '#10b981' : '#f43f5e'} strokeWidth="4" />
                    <rect x="520" y="75" width="70" height="40" rx="8" fill={((gateA | gateB) & (gateC === 1 ? 0 : 1)) ? '#059669' : '#1e293b'} stroke="#10b981" strokeWidth="2" />
                    <text x="555" y="93" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ABORT</text>
                    <text x="555" y="107" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                      {((gateA | gateB) & (gateC === 1 ? 0 : 1))}
                    </text>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                    <span className="text-xs text-slate-400 uppercase font-bold block mb-1">AND Gate (A · B)</span>
                    <span className={`text-3xl font-black font-mono ${(gateA & gateB) === 1 ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {gateA & gateB}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">Strict: 1 only if ALL inputs are 1</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                    <span className="text-xs text-slate-400 uppercase font-bold block mb-1">OR Gate (A + B)</span>
                    <span className={`text-3xl font-black font-mono ${(gateA | gateB) === 1 ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {gateA | gateB}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">Lenient: 1 if AT LEAST ONE input is 1</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                    <span className="text-xs text-slate-400 uppercase font-bold block mb-1">NOT Gate (C̄)</span>
                    <span className={`text-3xl font-black font-mono ${gateC === 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {gateC === 1 ? 0 : 1}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">Inverter: NOT 1 = 0, NOT 0 = 1</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-emerald-400 uppercase bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
              Free Play Sandbox • Zero Pressure Lab
            </span>
            <h2 className="text-lg font-bold text-white mt-2">Vikram-IX Micro-Architecture Workbench</h2>
            <p className="text-xs text-slate-400 mt-1">
              Manipulate clock speed, word sizes, ALU arithmetic, and cache hit rates in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-cyan-400 uppercase">1. Processor Hardware Controls</h3>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Clock Frequency:</span>
                  <strong className="text-cyan-400 font-mono">{sandboxClockSpeed.toFixed(1)} GHz</strong>
                </div>
                <input
                  type="range"
                  min={1.0}
                  max={5.0}
                  step={0.1}
                  value={sandboxClockSpeed}
                  onChange={(e) => {
                    setSandboxClockSpeed(parseFloat(e.target.value));
                    audioManager.play('count');
                  }}
                  className="w-full accent-cyan-500 cursor-pointer"
                  aria-label="Set Clock Frequency"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Processor Word Size:</span>
                  <strong className="text-purple-400 font-mono">{sandboxWordSize}-Bit ({(sandboxWordSize / 8)} Bytes)</strong>
                </div>
                <div className="flex gap-2">
                  {[8, 16, 32, 64].map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSandboxWordSize(size);
                        audioManager.play('tap');
                      }}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${
                        sandboxWordSize === size ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300'
                      }`}
                      aria-label={`Select ${size}-bit word size`}
                    >
                      {size}-bit
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Cache Hit Ratio:</span>
                  <strong className="text-emerald-400 font-mono">{sandboxCacheHitRate}%</strong>
                </div>
                <input
                  type="range"
                  min={50}
                  max={99}
                  value={sandboxCacheHitRate}
                  onChange={(e) => {
                    setSandboxCacheHitRate(parseInt(e.target.value));
                    audioManager.play('count');
                  }}
                  className="w-full accent-emerald-500 cursor-pointer"
                  aria-label="Set Cache Hit Ratio"
                />
              </div>
            </div>

            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-cyan-400 uppercase">2. ALU Interactive Arithmetic</h3>

              <div className="flex gap-2">
                {(['ADD', 'SUB', 'AND', 'OR'] as const).map((op) => (
                  <motion.button
                    key={op}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSandboxAluOp(op);
                      audioManager.play('tap');
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${
                      sandboxAluOp === op ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                    aria-label={`Select ALU operation ${op}`}
                  >
                    {op}
                  </motion.button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase block mb-1">Operand 1 (Decimal)</label>
                  <input
                    type="number"
                    value={sandboxVal1}
                    onChange={(e) => setSandboxVal1(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-sm font-mono text-white"
                    aria-label="Operand 1 value"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase block mb-1">Operand 2 (Decimal)</label>
                  <input
                    type="number"
                    value={sandboxVal2}
                    onChange={(e) => setSandboxVal2(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-sm font-mono text-white"
                    aria-label="Operand 2 value"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Accumulator (ACC) Output</span>
                <span className="text-3xl font-black text-cyan-400 font-mono">{sandboxAluResult}</span>
                <p className="text-[10px] text-slate-400 mt-1">
                  Binary: {sandboxAluResult >= 0 ? sandboxAluResult.toString(2) : (sandboxAluResult >>> 0).toString(2).slice(-8)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 text-sm"
              aria-label="Proceed to structured challenges"
            >
              Ready for Diagnostic Challenges! →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: STRUCTURED CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      : difficulty === 'advanced'
                      ? 'bg-rose-950 text-rose-400 border-rose-800'
                      : 'bg-cyan-950 text-cyan-400 border-cyan-800'
                  }`}
                >
                  {difficulty}
                </motion.span>
                <span className="text-[10px] uppercase font-bold text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800">
                  NEP: {activeChallenge.competencyLevel}
                </span>
              </div>
              <h2 className="text-base md:text-lg font-bold text-white mt-1">{activeChallenge.question}</h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Current Mastery</span>
              <strong className="text-cyan-400 text-sm capitalize">{masteryLevel}</strong>
            </div>
          </div>

          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation}
                    className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                      wrongFlash
                        ? 'bg-rose-900/60 border-2 border-rose-500 text-rose-200'
                        : showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200'
                    }`}
                    aria-label={`Option: ${opt}`}
                  >
                    <span className="font-bold text-cyan-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag components to their target slots:</span>
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg text-xs font-bold cursor-grab shadow-md"
                      role="button"
                      aria-label={`Draggable label: ${item.label}`}
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['slot_cu', 'slot_alu', 'slot_reg', 'slot_bus'].map((slotId) => (
                    <div
                      key={slotId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(slotId)}
                      className={`p-4 rounded-xl border-2 border-dashed text-center min-h-[90px] flex flex-col justify-center items-center transition-colors ${
                        droppedLabels[slotId]
                          ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
                          : 'border-slate-700 bg-slate-950 text-slate-500'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-mono block mb-1">Target Slot: {slotId.replace('slot_', '').toUpperCase()}</span>
                      <strong className="text-sm font-bold">{droppedLabels[slotId] || '[Drop Here]'}</strong>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-cyan-600 text-white font-bold rounded-xl text-xs shadow-md shadow-cyan-600/30"
                  aria-label="Verify dragged labels"
                >
                  Verify Placement →
                </motion.button>
              </div>
            )}

            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 block mb-1">Drag items to arrange in correct execution order:</span>
                {(sortArrangement.length === activeChallenge.sortItems.length
                  ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                  : activeChallenge.sortItems
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
                    className="p-3 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    role="button"
                    aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold flex items-center justify-center text-xs">
                      {displayIdx + 1}
                    </span>
                    <span className="flex-1 font-medium">{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="mt-2 px-6 py-2.5 bg-cyan-600 text-white font-bold rounded-xl text-xs shadow-md shadow-cyan-600/30"
                  aria-label="Submit sorted sequence"
                >
                  Verify Sequence →
                </motion.button>
              </div>
            )}

            {activeChallenge.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value"
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48"
                  aria-label="Enter numeric answer"
                />
                <span className="text-sm text-slate-400 font-bold">{activeChallenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-6 py-2.5 bg-cyan-600 text-white font-bold rounded-xl text-xs shadow-md shadow-cyan-600/30"
                  aria-label="Submit numeric answer"
                >
                  Verify Number →
                </motion.button>
              </div>
            )}

            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setConstructParts(prev => [...prev, part]);
                        audioManager.play('tap');
                      }}
                      className="px-3 py-1.5 bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold rounded-lg shadow-md"
                      aria-label={`Add part ${part}`}
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-3 py-1 bg-cyan-900/60 border border-cyan-700 text-cyan-200 rounded-lg text-sm font-mono font-bold flex items-center gap-2">
                      {part}
                      <button
                        onClick={() => setConstructParts(p => p.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-200"
                        aria-label={`Remove part ${part}`}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Select parts above to assemble...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-cyan-600 text-white font-bold rounded-xl text-xs shadow-md shadow-cyan-600/30"
                  aria-label="Submit constructed string"
                >
                  Verify Assembly →
                </motion.button>
              </div>
            )}

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-slate-950 rounded-xl border border-cyan-800 space-y-3"
              >
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <span>📘</span> Step-by-Step Micro-Architecture Breakdown
                </div>

                {activeChallenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans"
                    >
                      <strong className="text-cyan-400 mr-1.5">{i + 1}.</strong>
                      {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-xs font-bold border border-slate-700"
                      aria-label="Show next explanation step"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30"
                      aria-label="Next challenge"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission Diagnostics →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION, MOTIVATIONAL FEEDBACK & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-slate-900 via-cyan-950/40 to-slate-900 rounded-3xl border border-cyan-800 text-center space-y-3">
            <span className="text-5xl block">🎉</span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Mission Diagnostics Complete!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have successfully calibrated the Vikram-IX processor micro-architecture, memory hierarchy, and telemetry encodings for the ISRO flight computer.
            </p>
            <div className="flex justify-center gap-6 pt-2 font-mono">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 w-32">
                <span className="text-[10px] text-slate-400 uppercase block">Accuracy Score</span>
                <strong className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</strong>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 w-32">
                <span className="text-[10px] text-slate-400 uppercase block">Mastery Tier</span>
                <strong className="text-2xl font-black text-cyan-400 capitalize">{masteryLevel}</strong>
              </div>
            </div>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 text-center">
            {errors === 0 && (
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-emerald-400 block">Performance Rating</span>
                <h3 className="text-xl font-black text-emerald-300">PERFECT SCORE!</h3>
                <p className="text-xs text-slate-300">Flawless calibration! You have demonstrated exceptional mastery across CPU components, memory pipelines, and binary logic.</p>
              </div>
            )}
            {errors >= 1 && errors <= 3 && (
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-cyan-400 block">Performance Rating</span>
                <h3 className="text-xl font-black text-cyan-300">Great work!</h3>
                <p className="text-xs text-slate-300">High proficiency demonstrated across processor architecture and Boolean operations.</p>
              </div>
            )}
            {errors >= 4 && errors <= 7 && (
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-amber-400 block">Performance Rating</span>
                <h3 className="text-xl font-black text-amber-300">Good effort!</h3>
                <p className="text-xs text-slate-300">Solid foundation built. Review the memory speed hierarchy and 2s complement conversions to refine your accuracy.</p>
              </div>
            )}
            {errors >= 8 && (
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-rose-400 block">Performance Rating</span>
                <h3 className="text-xl font-black text-rose-300">Do not give up — You WILL get this!</h3>
                <p className="text-xs text-slate-300">Micro-architecture takes time to grasp. Re-explore the CPU registers and bit toggles to build confidence!</p>
              </div>
            )}
          </div>

          {/* Reflection Section */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-cyan-800/60 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">💭</span>
              <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Mission Debrief & Reflection</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-200 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflections.surprising}
                  onChange={(e) => setReflections(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g., How 2s complement allows subtraction via addition..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 resize-none h-20"
                  aria-label="Reflection on surprising learning"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-200 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflections.explain}
                  onChange={(e) => setReflections(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g., The PC is like a book bookmark pointing to the next line..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 resize-none h-20"
                  aria-label="Reflection on explaining to a friend"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-200 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflections.realLife}
                  onChange={(e) => setReflections(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g., Writing embedded code for robotics or understanding GPU memory..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 resize-none h-20"
                  aria-label="Reflection on real life application"
                />
              </div>
            </div>
          </div>

          {/* Misconception Profile Tracking */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider">Identified Misconception Profile</h3>
              <p className="text-xs text-slate-400">Review these corrections to avoid common CISCE board examination pitfalls:</p>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <p className="text-xs text-rose-300 font-bold">❌ {m.misconception}</p>
                    <p className="text-xs text-emerald-300">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-300">
              📅 Spaced Repetition (SM-2): Next review session scheduled in{' '}
              <strong className="text-cyan-400">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('explore');
                setCurrentSlide(0);
                audioManager.play('tap');
              }}
              className="px-4 py-2 bg-slate-800 text-cyan-300 rounded-lg text-xs font-bold border border-slate-700"
              aria-label="Re-explore hardware lab"
            >
              Re-enter Lab ↺
            </motion.button>
          </div>

          {/* Real-World Challenge Brief */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">{idx + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── MODAL FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Telemetry Calibrated!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_ComputerScienceComputerArchitectureCpuSim;
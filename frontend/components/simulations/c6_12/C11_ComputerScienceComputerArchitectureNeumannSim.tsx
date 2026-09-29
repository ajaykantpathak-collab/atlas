'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C11_CS_001 = 'c11_cs_001';
const NODE_C11_CS_002 = 'c11_cs_002';
const NODE_C11_CS_003 = 'c11_cs_003';
const NODE_C11_CS_004 = 'c11_cs_004';
const NODE_C11_CS_005 = 'c11_cs_005';
const NODE_C11_CS_006 = 'c11_cs_006';
const NODE_C11_CS_007 = 'c11_cs_007';
const NODE_C11_CS_008 = 'c11_cs_008';
const NODE_C11_CS_009 = 'c11_cs_009';
const NODE_C11_CS_010 = 'c11_cs_010';

const ALL_NODE_IDS = [
  NODE_C11_CS_001,
  NODE_C11_CS_002,
  NODE_C11_CS_003,
  NODE_C11_CS_004,
  NODE_C11_CS_005,
  NODE_C11_CS_006,
  NODE_C11_CS_007,
  NODE_C11_CS_008,
  NODE_C11_CS_009,
  NODE_C11_CS_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: "Mission Shakti-Core: Inside India's Indigenous Microprocessor",
  intro: "You are the Lead Micro-Architect at the Semiconductor Laboratory (SCL) in Mohali, Punjab, partnering with IIT Madras to commission the next-generation Shakti-C microprocessor. This dual-core 64-bit chip powers critical Indian infrastructure: NavIC satellite positioning modules, NPCI UPI transaction engines, and IRCTC high-concurrency reservation nodes.",
  context: "A synchronization fault during high-load Indian Railways tatkal booking testing has stalled CPU bus handshakes and corrupted ALU pipeline registers. To clear the Shakti processor for national deployment, you must audit system bus traffic, optimize the cache memory hierarchy, debug binary arithmetic pipelines, synthesize fault-tolerant combinational logic, verify sequential flip-flops, and tune OS real-time scheduling algorithms.",
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In a von Neumann architecture, the CPU fetches a bit pattern 01001000 from memory at address 0x0A. How does the CPU distinguish whether these bits represent an instruction (e.g., ADD R1, R2) or an integer constant (e.g., decimal 72)?',
  options: [
    'The bits have a hardware flag bit physically embedded in the silicon RAM cell.',
    'Memory is physically segmented into two isolated chips: one silicon chip for instructions and another for data.',
    'The bit patterns are completely identical in form; the CPU interprets them based solely on the current phase of the Fetch-Decode-Execute cycle.',
    'The address bus inverts its voltage polarity when fetching data instead of instructions.',
  ],
  correctIndex: 2,
  hintAfter: "Remember John von Neumann's revolutionary 1945 stored-program concept: instructions and data reside in the very same unified physical address space!",
};

// ─── PREDICTION QUESTIONS ───
interface PredictionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  explanation: string;
}

const PREDICTION_QUESTIONS = [
  {
    id: 'pred_01',
    question: 'Predict: If you set J = 1 and K = 1 on a JK Flip-Flop with current state Q = 0, what will Q become after exactly 3 consecutive positive clock edges?',
    options: ['Q = 0', 'Q = 1', 'Q enters an invalid/metastable race state', 'Q remains undefined'],
    correctIndex: 1,
    verifyInstruction: 'Go to Exploration Step 4 (Sequential JK Flip-Flop Lab), configure J=1 and K=1, and trigger the clock pulse button exactly 3 times to observe the output transition.',
    explanation: 'With J=1 and K=1, the JK flip-flop toggles on each active clock edge. Starting from Q=0: Pulse 1 -> Q=1; Pulse 2 -> Q=0; Pulse 3 -> Q=1.',
  },
  {
    id: 'pred_02',
    question: 'Predict: When converting decimal 178 to 8-bit unsigned binary and then to its corresponding Gray Code, how many bits in the Gray Code will differ from standard binary?',
    options: ['Exactly 0 bits', 'Exactly 1 bit', 'Multiple bits, because Gray code changes only 1 bit per consecutive transition', 'All 8 bits will be inverted'],
    correctIndex: 2,
    verifyInstruction: 'Use the Multi-Base Bit Manipulator slider in Step 2: slide to 178 (binary 10110010) and observe the generated Gray Code pattern (11101011).',
    explanation: 'Standard binary for 178 is 10110010_2. The Gray code Gi = Bi XOR B(i+1) yields 11101011_2. Five bit positions differ, reflecting the single-bit transition property between adjacent numbers.',
  },
];

// ─── OBSERVATION QUESTIONS ───
interface ObservationQuestion {
  id: string;
  prompt: string;
  visualizationRef: string;
  observableOptions: string[];
  correctIndex: number;
  explanation: string;
}

const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_01',
    prompt: 'Look at the Live System Bus Oscilloscope during the CPU instruction execution cycle. What do you notice about the timing and direction of signals on the Address Bus versus the Data Bus?',
    visualizationRef: 'Exploration Step 1: Von Neumann Architecture & Bus Traffic',
    observableOptions: [
      'Both Address and Data buses continuously transmit signals back and forth between CPU and RAM at the same instant.',
      'The Address bus pulses unidirectionally from CPU to RAM during the FETCH phase, whereas the Data bus transfers data bidirectionally depending on whether it is a READ or WRITE operation.',
      'The Control bus carries raw instruction operands while the Data bus carries the Program Counter pointer.',
      'The Address bus voltage remains flat zero until the WRITEBACK stage.',
    ],
    correctIndex: 1,
    explanation: 'The CPU alone places target memory addresses on the unidirectional Address Bus to specify memory locations. The Data Bus is bidirectional, transmitting the fetched opcode from RAM to CPU during FETCH/READ, and writing computed ALU results back into RAM during WRITE.',
  },
  {
    id: 'obs_02',
    prompt: 'Observe the Real-Time Slider and Multi-Base Converter Matrix when sliding from 127 to 128. What occurs in standard binary compared to Packed BCD representation?',
    visualizationRef: 'Exploration Step 2: Multi-Base Bit Converter Engine',
    observableOptions: [
      'Standard binary flips only 1 bit, while BCD flips all 8 bits simultaneously.',
      'In standard binary, 127 (01111111) transitions to 128 (10000000) by flipping all 8 bits; in Packed BCD, each decimal digit is encoded into its own distinct 4-bit nibble (0001 0010 1000).',
      'Packed BCD requires fewer total bits than binary to represent the number 128.',
      'Gray code and standard binary are completely identical for all values above 127.',
    ],
    correctIndex: 1,
    explanation: 'Binary 127 is 01111111_2 and 128 is 10000000_2 (a cascade of 8 bit transitions). In Packed BCD, every decimal digit (1, 2, 8) is stored independently as a 4-bit nibble (0001 for 1, 0010 for 2, 1000 for 8), demonstrating why BCD eliminates binary rounding artifacts in financial calculators.',
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Chandrayaan Avionics & NPCI UPI Core Audit Project',
  description: 'Apply your digital logic and computer architecture knowledge to configure an aerospace-grade embedded flight computer and evaluate high-throughput banking transaction buffers.',
  steps: [
    {
      stepNumber: 1,
      title: 'Bus Bandwidth & Address Space Sizing',
      action: 'Calculate the total addressable memory space for a 36-bit address bus deployed in Indian Space Research Organisation (ISRO) telemetry payloads, and estimate the throughput over a 64-bit wide data bus running at 3.2 GHz DDR.',
    },
    {
      stepNumber: 2,
      title: 'Fault-Tolerant ALU Subtractor Synthesis',
      action: "Implement a 16-bit 2's complement adder-subtractor circuit with overflow detection logic (V = C_in XOR C_out) to prevent integer wrap-around glitches in UPI ledger transactions.",
    },
    {
      stepNumber: 3,
      title: 'Real-Time Dynamic Memory Allocation Audit',
      action: 'Compare First-Fit, Best-Fit, and Worst-Fit partitioning algorithms under 50,000 requests/sec synthetic UPI payload bursts. Analyze internal fragmentation and recommend optimal paging block sizes.',
    },
  ],
  takeaway: 'Modern indigenous semiconductors like IIT Madras Shakti and SCL 180nm CMOS microcontrollers rely directly on these fundamental von Neumann principles, binary arithmetic theorems, and sequential state machines.',
};

// ─── CHALLENGE INTERFACE ─���─
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
  // FOUNDATION (1 to 7)
  {
    id: 'ch_vn_001',
    nodeId: NODE_C11_CS_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the classical von Neumann architecture, which system bus is strictly UNIDIRECTIONAL from the CPU to memory/IO peripherals?',
    options: ['Data Bus', 'Address Bus', 'Control Bus', 'Serial Expansion Bus'],
    correctIndex: 1,
    explanation: 'The Address Bus carries memory addresses generated exclusively by the CPU (via the Program Counter or Memory Address Register) outward to memory decoders. The Data Bus is bidirectional, and the Control Bus consists of individual unidirectional and bidirectional control/handshake lines.',
    hints: [
      'Think about which component generates the target physical memory coordinate.',
      'Only the CPU determines WHERE in memory to read or write; memory never addresses the CPU.',
      'The Address Bus carries memory cell locations and flows exclusively outward from the CPU.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_vn_002',
    nodeId: NODE_C11_CS_001,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each CPU / subsystem functional block to its correct location on the von Neumann architecture diagram.',
    dragItems: [
      { label: 'Arithmetic Logic Unit (ALU)', targetId: 'slot_alu' },
      { label: 'Control Unit (CU)', targetId: 'slot_cu' },
      { label: 'Register Bank & PC', targetId: 'slot_reg' },
      { label: 'Shared Main Memory (RAM)', targetId: 'slot_mem' },
    ],
    correctMapping: {
      slot_alu: 'Arithmetic Logic Unit (ALU)',
      slot_cu: 'Control Unit (CU)',
      slot_reg: 'Register Bank & PC',
      slot_mem: 'Shared Main Memory (RAM)',
    },
    explanation: 'Inside the CPU package sit the ALU (computational arithmetic/logic), CU (orchestrating fetch-decode-execute timing), and internal Registers. The Shared Main Memory resides externally across the system bus.',
    hints: [
      'The internal CPU envelope contains ALU, CU, and Registers.',
      'Main Memory is external, storing both instructions and runtime data.',
      'The ALU calculates values, while the CU decodes instruction opcodes.',
    ],
  },
  {
    id: 'ch_mem_001',
    nodeId: NODE_C11_CS_002,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is SRAM (Static RAM) used for CPU L1/L2 caches while DRAM (Dynamic RAM) is used for system main memory?',
    options: [
      'SRAM uses capacitive cells needing 1000 refreshes per second; DRAM uses 6-transistor latch circuits.',
      'SRAM uses bistable 6-transistor flip-flop latches (fast access, higher cost, no refresh needed); DRAM uses single-transistor capacitive charge storage (dense, cheap, requires periodic refresh).',
      'SRAM is non-volatile magnetic storage; DRAM is optical laser storage.',
      'DRAM operates faster than SRAM but draws 50x more idle current.',
    ],
    correctIndex: 1,
    explanation: 'SRAM stores bits using 6-transistor flip-flops requiring zero refresh cycles, making it extremely fast (sub-nanosecond) for cache memory. DRAM stores charge in tiny leaky capacitors (1 transistor + 1 capacitor per bit), making it very dense and cost-effective for multi-gigabyte RAM despite needing periodic refresh cycles every 64ms.',
    hints: [
      'Recall the microscopic silicon storage mechanism: flip-flops vs capacitors.',
      'Capacitors slowly leak electrons and must be recharged constantly.',
      'SRAM = Flip-Flops (fast/expensive cache); DRAM = Leaky Capacitors (dense/inexpensive main memory).',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_num_001',
    nodeId: NODE_C11_CS_003,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Convert the binary fractional value 101.101_2 into its exact decimal representation.',
    correctAnswer: 5.625,
    tolerance: 0.001,
    unit: 'decimal',
    explanation: 'Integer portion: 1*(2^2) + 0*(2^1) + 1*(2^0) = 4 + 0 + 1 = 5. Fractional portion: 1*(2^-1) + 0*(2^-2) + 1*(2^-3) = 0.5 + 0 + 0.125 = 0.625. Total decimal value = 5.625.',
    hints: [
      'Calculate the integer powers of 2 left of the radix point: 2^2=4, 2^1=2, 2^0=1.',
      'Calculate fractional negative powers of 2 right of the radix: 2^-1=0.5, 2^-2=0.25, 2^-3=0.125.',
      'Sum the terms: (4 + 1) + (0.5 + 0.125) = 5.625.',
    ],
  },
  {
    id: 'ch_bool_001',
    nodeId: NODE_C11_CS_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "According to De Morgan's First Law of Boolean Algebra, what is the dual equivalent of the complemented expression (A + B)'?",
    options: ["A' . B'", "A' + B'", "(A . B)'", "A XOR B"],
    correctIndex: 0,
    explanation: "De Morgan's First Theorem states that the complement of a logical sum equals the logical product of the complements: (A + B)' = A' . B'. (NOR equals Bubble-AND).",
    hints: [
      'Break the line, change the sign: OR (+) becomes AND (.).',
      'Distribute the complement bar individually to each literal.',
      "(A + B)' = A' . B'.",
    ],
  },
  {
    id: 'ch_comb_001',
    nodeId: NODE_C11_CS_008,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How is a single-bit Full Adder constructed using basic Half Adder (HA) modules and logic gates?',
    options: [
      'Two Half Adders in parallel connected to an AND gate.',
      'Two Half Adders in cascade (HA1 adds A and B; HA2 adds partial sum S1 to Carry-In Cin) plus an OR gate combining both intermediate carries.',
      'Three Half Adders connected in a ring oscillator loop.',
      'A single Half Adder fed with an inverter feedback wire.',
    ],
    correctIndex: 1,
    explanation: 'HA1 computes S1 = A XOR B and C1 = A.B. HA2 computes final Sum = S1 XOR Cin and C2 = S1.Cin. The final Carry-Out Cout = C1 + C2, combined cleanly using a 2-input OR gate.',
    hints: [
      'HA1 generates an intermediate sum of inputs A and B.',
      'HA2 incorporates the incoming Carry-In into that intermediate sum.',
      'The carries from HA1 and HA2 are mutually exclusive and combined with an OR gate.',
    ],
  },
  {
    id: 'ch_rep_001',
    nodeId: NODE_C11_CS_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why are Gray Codes extensively employed in mechanical rotary optical shaft encoders on Indian industrial robotics arms instead of standard natural binary?',
    options: [
      'Gray code uses 50% fewer wires than binary.',
      'Only one single bit changes state between any two consecutive numerical positions, eliminating spurious intermediate glitch codes caused by mechanical contact jitter.',
      'Gray codes can be decoded directly without microprocessors.',
      'Gray codes support negative floating point numbers natively.',
    ],
    correctIndex: 1,
    explanation: 'Standard binary from 3 (011) to 4 (100) changes 3 bits simultaneously. Due to mechanical sensor misalignment, intermediate invalid codes (like 010, 111) can briefly appear. Gray code guarantees that adjacent positions differ by exactly 1 bit, completely preventing position misreads.',
    hints: [
      'Think about what happens if multiple mechanical switches do not open at the exact microsecond.',
      'Unit distance property: only one bit toggles per step.',
      'This prevents race conditions during physical sensor rotation.',
    ],
  },

  // STANDARD (8 to 15)
  {
    id: 'ch_vn_003',
    nodeId: NODE_C11_CS_001,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The ISRO Chandrayaan on-board flight telemetry computer uses a 26-bit physical address bus with byte-addressable memory. What is the maximum directly addressable RAM capacity in Megabytes (MB)?',
    correctAnswer: 64,
    tolerance: 0,
    unit: 'MB',
    explanation: 'Directly addressable memory = 2^(address bus width) bytes = 2^26 bytes. Since 2^20 bytes = 1 MB, 2^26 bytes = 2^6 * 2^20 = 64 MB.',
    hints: [
      'Total address space = 2^(bus width) bytes.',
      'Express 2^26 as 2^6 multiplied by 2^20.',
      '2^6 = 64, and 2^20 bytes = 1 Megabyte, so 2^26 = 64 MB.',
    ],
  },
  {
    id: 'ch_vn_004',
    nodeId: NODE_C11_CS_001,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequential micro-operations of the CPU Instruction Cycle into the exact chronological execution order.',
    sortItems: [
      'Program Counter (PC) address placed on Address Bus; Memory Read control line asserted',
      'Instruction opcode latched from Data Bus into the Instruction Register (IR)',
      'Control Unit decodes instruction opcode and fetches operand registers',
      'ALU computes operation, updates status flags (Zero, Carry, Overflow)',
      'Program Counter (PC) increments to point to the next instruction in RAM',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The fundamental cycle proceeds: (1) Address placed on bus & read asserted, (2) Opcode latched into IR, (3) Instruction decoded by CU, (4) ALU execution, (5) PC incremented for the subsequent cycle.',
    hints: [
      'First, memory must be addressed outward by the CPU.',
      'The incoming opcode must be held in the Instruction Register before decoding.',
      'Execution happens only after decoding, followed by incrementing the PC.',
    ],
  },
  {
    id: 'ch_arith_001',
    nodeId: NODE_C11_CS_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: "Perform the subtraction (25 - 11) using 8-bit 2's complement binary arithmetic: 00011001_2 - 00001011_2. Which calculation represents the exact intermediate and final result?",
    options: [
      "00011001 + 11110101 = 1 00010000 (discard end carry 1 -> 00010000 = +14 in decimal)",
      "00011001 + 11110100 = 1 00001111 (discard end carry 1 -> 00001111 = +15)",
      "11100110 + 00001011 = 11110001 (-15)",
      "00011001 - 00001011 = 10001110 (-14)",
    ],
    correctIndex: 0,
    explanation: "To perform A - B: 1's complement of +11 (00001011) is 11110100. Adding 1 gives 2's complement 11110101 (-11). Adding A + (-B): 00011001 + 11110101 = 1 00010000. In 2's complement addition, discarding the 9th bit end-carry yields 00010000 (+14 decimal).",
    hints: [
      "Invert the bits of 11 (00001011) and add 1 to get -11 in 2's complement.",
      '00001011 inverted is 11110100; + 1 = 11110101.',
      'Add 00011001 to 11110101. The resulting carry out of the MSB is discarded.',
    ],
  },
  {
    id: 'ch_rep_002',
    nodeId: NODE_C11_CS_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A smart solar tracker in Rajasthan calculates an azimuth angle represented in natural binary as 11010_2. What is its 5-bit Gray Code equivalent?',
    options: ['10111_2', '10110_2', '11111_2', '10011_2'],
    correctIndex: 0,
    explanation: 'Binary to Gray Conversion: G4 = B4 = 1; G3 = B4 XOR B3 = 1 XOR 1 = 0; G2 = B3 XOR B2 = 1 XOR 0 = 1; G1 = B2 XOR B1 = 0 XOR 1 = 1; G0 = B1 XOR B0 = 1 XOR 0 = 1. Result = 10111_2.',
    hints: [
      'The Most Significant Bit (MSB) remains identical: G4 = B4 = 1.',
      'Each subsequent Gray bit is obtained by XORing adjacent binary bits: Gi = B(i+1) XOR Bi.',
      '1, 1^1=0, 1^0=1, 0^1=1, 1^0=1 => 10111.',
    ],
  },
  {
    id: 'ch_seq_001',
    nodeId: NODE_C11_CS_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a positive-edge triggered JK Flip-Flop with present state Q = 1, what will be the next state Q(next) when J = 1 and K = 1 upon the arrival of the next clock pulse?',
    options: [
      'Q(next) = 0 (Toggle mode: cleanly inverts state)',
      'Q(next) = 1 (Set mode: remains high)',
      'Q(next) = Invalid / Forbidden metastable state',
      'Q(next) = High-Impedance floating state (Z)',
    ],
    correctIndex: 0,
    explanation: 'When J=1 and K=1, the JK flip-flop operates in TOGGLE mode. Since the present state is Q=1, the next clock pulse inverts the output cleanly to Q(next)=0. This eliminates the invalid race condition of SR flip-flops.',
    hints: [
      'The JK flip-flop eliminates the invalid state seen in SR latches.',
      'When both control inputs are 1, the flip-flop toggles its state.',
      'If present state Q = 1, toggle produces Q(next) = 0.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_bool_002',
    nodeId: NODE_C11_CS_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Minimize the 3-variable Boolean expression F(A,B,C) = Sigma m(1, 3, 5, 7) using Karnaugh Map (K-Map) adjacency rules.',
    options: ['F = C', 'F = A + C', "F = B' . C", 'F = A . B'],
    correctIndex: 0,
    explanation: 'Minterms 1 (001), 3 (011), 5 (101), 7 (111) form a 4-cell quad in the K-Map where variables A and B change from 0 to 1 across rows, while variable C remains constant at 1 across all 4 minterms. Hence, F = C.',
    hints: [
      'Group the four minterms into a single quad (group of 4).',
      'Examine which variables change state across the quad.',
      'A changes (0 and 1), B changes (0 and 1), only C remains fixed at 1. Thus F = C.',
    ],
  },
  {
    id: 'ch_os_001',
    nodeId: NODE_C11_CS_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'An Indian Railways IRCTC server has contiguous free memory blocks of 100 KB, 500 KB, 200 KB, 300 KB, and 600 KB. A new reservation thread requests 212 KB. Into which block will First-Fit and Best-Fit allocate this thread respectively?',
    options: [
      'First-Fit: 500 KB block; Best-Fit: 300 KB block',
      'First-Fit: 300 KB block; Best-Fit: 500 KB block',
      'First-Fit: 600 KB block; Best-Fit: 200 KB block',
      'First-Fit: 500 KB block; Best-Fit: 600 KB block',
    ],
    correctIndex: 0,
    explanation: 'First-Fit scans from the start: 100 KB (too small), 500 KB (fits -> allocated here!). Best-Fit searches all blocks to find the smallest hole >= 212 KB: holes >= 212 KB are 500 KB, 300 KB, 600 KB. The smallest is 300 KB (leaving only 88 KB internal leftover).',
    hints: [
      'First-Fit takes the very first block from the left that is >= 212 KB.',
      'Best-Fit searches the entire memory table for the block that leaves the smallest leftover space.',
      'First-Fit picks 500 KB; Best-Fit picks 300 KB.',
    ],
  },
  {
    id: 'ch_mem_002',
    nodeId: NODE_C11_CS_002,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a 2-level memory hierarchy for a Shakti CPU core, Cache access time is 2 ns and Main Memory access time is 60 ns. If the Cache Hit Ratio is 0.95 (95%), what is the Average Memory Access Time (AMAT) in nanoseconds?',
    correctAnswer: 5,
    tolerance: 0.1,
    unit: 'ns',
    explanation: 'AMAT = Hit Time + (Miss Rate * Miss Penalty) = 2 ns + ((1 - 0.95) * 60 ns) = 2 ns + (0.05 * 60 ns) = 2 ns + 3 ns = 5.0 ns.',
    hints: [
      'Formula: AMAT = T_cache + (1 - Hit_Ratio) * T_memory.',
      'Miss Rate = 1 - 0.95 = 0.05.',
      'AMAT = 2 + (0.05 * 60) = 2 + 3 = 5.0 ns.',
    ],
  },

  // ADVANCED & COMPETENCY (16 to 22)
  {
    id: 'ch_arch_005',
    nodeId: NODE_C11_CS_001,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: "Evaluate the architectural trade-off between the von Neumann architecture and the Harvard architecture in high-speed Digital Signal Processors (DSP) used in NavIC satellites.",
    options: [
      'Von Neumann is faster because it merges buses to reduce silicon wiring.',
      'Harvard architecture separates physical instruction and data buses, allowing simultaneous instruction fetch and operand read/write in a single clock cycle, completely eliminating the von Neumann bus bottleneck.',
      'Von Neumann architecture prevents pipeline stalls by storing instructions in CPU registers only.',
      'Harvard architecture is obsolete because RAM cannot hold both programs and data.',
    ],
    correctIndex: 1,
    explanation: 'The von Neumann bottleneck occurs because instructions and data share the same system bus, preventing simultaneous fetch and memory operand access. Harvard architecture provides separate instruction and data memories and buses, permitting concurrent memory transactions essential for high-throughput DSPs.',
    hints: [
      'What happens when a single bus is shared between instruction fetching and data operands?',
      'Separate buses allow parallel, concurrent memory transactions in a single clock cycle.',
      'Harvard architecture overcomes the von Neumann memory access bottleneck.',
    ],
  },
  {
    id: 'ch_arith_002',
    nodeId: NODE_C11_CS_004,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: "In an 8-bit signed 2's complement ALU inside an Indian NPCI banking server, adding two positive numbers A = +75 (01001011_2) and B = +60 (00111100_2) yields binary result 10000111_2 (-121 decimal). What hardware condition occurred and how does the ALU detect it?",
    options: [
      "Arithmetic Overflow occurred because the sum (+135) exceeds the maximum 8-bit signed positive limit (+127); the ALU detects it via Overflow Flag V = C_in(MSB) XOR C_out(MSB) = 1.",
      "Underflow occurred because the numbers were too close to zero.",
      "Parity error occurred in RAM transmission; no arithmetic error happened.",
      "Valid result because 2's complement numbers wrap around automatically without error flags.",
    ],
    correctIndex: 0,
    explanation: "Signed 8-bit integers span -128 to +127. Adding +75 and +60 gives +135, which overflows into the sign bit (yielding negative -121). The ALU hardware detects signed overflow when the carry into the sign bit (C_in = 1) differs from the carry out of the sign bit (C_out = 0), generating Overflow Flag V = 1 XOR 0 = 1.",
    hints: [
      'Check the range of 8-bit signed integers: -128 to +127.',
      'Does +135 fit within +127?',
      'Adding two positive numbers cannot legitimately yield a negative result without Overflow.',
    ],
  },
  {
    id: 'ch_logic_003',
    nodeId: NODE_C11_CS_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: "Design challenge: You must synthesize a 2-to-1 Multiplexer (MUX) using ONLY 2-input NAND gates to minimize silicon footprint on a SCL 180nm CMOS wafer. What is the minimum number of NAND gates required?",
    options: ['4 NAND gates', '2 NAND gates', '6 NAND gates', '8 NAND gates'],
    correctIndex: 0,
    explanation: 'A 2-to-1 MUX equation is Y = (S . I1) + (S\' . I0). By applying De Morgan\'s laws twice: Y = [ (S . I1)\' . (S\' . I0)\' ]\'. We can use 1 NAND gate as an inverter for S\', 2 NAND gates for the partial products, and 1 output NAND gate to combine them. Total = 4 NAND gates.',
    hints: [
      'Express the MUX equation: Y = S.I1 + S\'.I0.',
      'Convert OR of ANDs to NAND-NAND logic using De Morgan.',
      '1 inverter NAND + 2 product NANDs + 1 output combiner NAND = 4 NAND gates.',
    ],
  },
  {
    id: 'ch_kmap_002',
    nodeId: NODE_C11_CS_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: "Simplify the 4-variable Boolean function F(A,B,C,D) = Sigma m(0, 2, 8, 10) + d(5, 7) using K-Map grouping rules (including corner rolling and don't care conditions).",
    options: ["F = B' . D'", "F = A' . C'", "F = B' + D'", "F = A . D + B' . C"],
    correctIndex: 0,
    explanation: "Minterms m(0, 2, 8, 10) occupy the four far corners of the 4x4 K-Map. Due to toroidal adjacency (wrap-around of top/bottom rows and left/right columns), these 4 corner cells form a single 4-cell group. Across the corner cells: A changes (0,1), C changes (0,1), while B remains fixed at 0 (B') and D remains fixed at 0 (D'). Hence, F = B' . D'. Don't cares at (5,7) are ignored since they do not help enlarge this corner group.",
    hints: [
      'Look at the four extreme corners of a 4x4 Karnaugh Map.',
      'Corner cells (0,0), (0,3), (3,0), (3,3) are mutually adjacent.',
      "In all four corners, B=0 and D=0, yielding the simplified term B' . D'.",
    ],
  },
  {
    id: 'ch_seq_002',
    nodeId: NODE_C11_CS_009,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An asynchronous Modulo-12 Ripple Counter is built for an Indian ISRO clock division unit using negative edge-triggered T Flip-Flops. What is the minimum number of flip-flops required?',
    correctAnswer: 4,
    tolerance: 0,
    unit: 'flip-flops',
    explanation: 'To count up to Modulo-N (where N = 12 states: 0 to 11), the number of flip-flops n must satisfy 2^n >= N. For n=3, 2^3 = 8 < 12 (insufficient). For n=4, 2^4 = 16 >= 12 (sufficient). Thus, 4 flip-flops are required, with clear logic asserted when the count reaches binary 1100_2 (12).',
    hints: [
      'Formula: 2^n >= Modulo count N.',
      'Test n=3: 2^3 = 8 (cannot count to 12).',
      'Test n=4: 2^4 = 16 >= 12. Minimum flip-flops = 4.',
    ],
  },
  {
    id: 'ch_os_002',
    nodeId: NODE_C11_CS_010,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate why modern 64-bit operating systems use Hardware Paged Virtual Memory rather than pure Contiguous Dynamic Partitioning.',
    options: [
      'Paging eliminates all external fragmentation by dividing physical memory into fixed-size frames and logical memory into pages, removing the need for contiguous allocation.',
      'Paging makes all software run 10x faster without CPU cache.',
      'Contiguous partitioning requires zero RAM memory overhead.',
      'Paging eliminates the need for secondary hard disk storage entirely.',
    ],
    correctIndex: 0,
    explanation: 'Contiguous partitioning suffers from severe external fragmentation where free memory is broken into unusable slivers between active processes. Paging divides physical RAM into fixed frames (e.g., 4 KB) and logical addresses into pages, allowing non-contiguous allocation and completely eliminating external fragmentation.',
    hints: [
      'What problem occurs when variable-sized holes are scattered across RAM?',
      'Fixed-size blocks (frames and pages) allow any free frame to be assigned to any page.',
      'Paging eliminates external fragmentation through hardware page tables and TLBs.',
    ],
  },
  {
    id: 'ch_arch_006',
    nodeId: NODE_C11_CS_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'To accelerate UPI tokenization on the Shakti core, engineers propose pipelining the 5-stage CPU (Fetch, Decode, Execute, Memory, Writeback). If non-pipelined execution takes 5 clock cycles per instruction, what is the ideal theoretical throughput speedup under an infinite instruction stream with zero branch hazards?',
    options: ['5x speedup', '1x speedup', '2.5x speedup', '25x speedup'],
    correctIndex: 0,
    explanation: 'In an ideal k-stage linear pipeline without hazards, one instruction completes every single clock cycle after the initial k-cycle fill latency. Compared to a non-pipelined CPU requiring k cycles per instruction, the theoretical maximum speedup is k = 5x.',
    hints: [
      'In a 5-stage pipeline, how many instructions retire per clock cycle in steady state?',
      'Speedup = Time(non-pipelined) / Time(pipelined) = (N * 5) / (5 + N - 1).',
      'As N approaches infinity, the speedup approaches the number of stages k = 5x.',
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
  nodeId: NODE_C11_CS_001,
  title: 'Computer Architecture & Digital Logic Engine',
  definition: 'The von Neumann architectural model unifies computation via the stored-program concept, connecting CPU, memory hierarchy, and I/O through synchronous system buses.',
  eli5: 'Think of a computer like a master chef (CPU) reading from a single shared recipe book (RAM) via kitchen conveyor belts (Buses) to cook instructions and process numerical ingredients in precise rhythm.',
  misconceptions: [
    {
      misconception: 'The CPU can distinguish instructions from data by reading built-in hardware tags in RAM.',
      correction: 'Instructions and data are physically identical binary bit strings; the CPU interprets them solely based on the current stage of the fetch-decode-execute cycle.',
    },
    {
      misconception: 'The Address Bus is bidirectional just like the Data Bus.',
      correction: 'The Address Bus is strictly unidirectional: memory coordinates flow only from the CPU outward to memory address decoders and I/O controllers.',
    },
    {
      misconception: 'SRAM and DRAM use the same underlying physical silicon mechanism.',
      correction: 'SRAM uses 6-transistor flip-flops (ultra-fast, bulky, cache), while DRAM uses single-transistor leaky capacitors requiring constant refresh cycles (dense, cheap, main RAM).',
    },
    {
      misconception: 'In an SR Flip-Flop, setting S=1 and R=1 produces a random output 0 or 1.',
      correction: "Setting S=1, R=1 produces an invalid/forbidden race state where both complementary outputs Q and Q' are forced low simultaneously, violating basic logic invariants.",
    },
  ],
  diagnosticQuestions: [
    { question: 'Which system bus carries memory read/write strobe commands?', options: ['Data Bus', 'Address Bus', 'Control Bus', 'PCIe Bus'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student demonstrates rigorous mastery of von Neumann architecture, memory hierarchy, multi-base conversions, 2s complement arithmetic, Boolean reduction theorems, K-Maps, logic gates, sequential flip-flops, and OS memory partitioning.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Von Neumann Architecture & Bus Traffic',
    instruction: 'Step through the Fetch-Decode-Execute cycle and observe address, control, and data packets pulse across the system buses in synchronized real time.',
    interactionType: 'cycle-stepper',
    nodeId: NODE_C11_CS_001,
  },
  {
    title: 'Multi-Base Bit Manipulator & Real-Time Slider',
    instruction: 'Drag the live range slider (0 to 255) or toggle individual bit switches to instantly observe simultaneous conversions across Decimal, Hex, Octal, Packed BCD, and Gray Code.',
    interactionType: 'bit-manipulator',
    nodeId: NODE_C11_CS_003,
  },
  {
    title: 'Digital Logic Gates & Combinational Adder Lab',
    instruction: 'Toggle inputs A, B, and Carry-In (Cin) to trace logic propagation through Half Adders and the OR gate in the Full Adder schematic.',
    interactionType: 'adder-lab',
    nodeId: NODE_C11_CS_008,
  },
  {
    title: 'Sequential JK Flip-Flop & Waveform Clock Lab',
    instruction: 'Configure inputs J and K, then pulse the clock line. Watch the active toggle state transitions and output waveforms update cleanly.',
    interactionType: 'flipflop-lab',
    nodeId: NODE_C11_CS_009,
  },
  {
    title: 'OS Memory Partition & Allocation Engine',
    instruction: 'Spawn real-time Indian infrastructure memory requests (IRCTC, UPI, ISRO) and compare First-Fit vs Best-Fit allocation and internal fragmentation.',
    interactionType: 'os-allocator',
    nodeId: NODE_C11_CS_010,
  },
];

export function C11_ComputerScienceComputerArchitectureNeumannSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['cs'] || { name: 'Computer Science', emoji: '💻', color: 'cyan' };

  // Phase states
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery & Prediction & Observation states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  const [activePredIdx, setActivePredIdx] = useState(0);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<string, number>>({});
  const [predictionFeedback, setPredictionFeedback] = useState<Record<string, boolean>>({});

  const [activeObsIdx, setActiveObsIdx] = useState(0);
  const [observationAnswers, setObservationAnswers] = useState<Record<string, number>>({});
  const [observationFeedback, setObservationFeedback] = useState<Record<string, boolean>>({});

  // Interactive CPU Sim states
  const [cpuCycleStage, setCpuCycleStage] = useState<'FETCH' | 'DECODE' | 'EXECUTE' | 'WRITEBACK'>('FETCH');
  const [programCounter, setProgramCounter] = useState(10);
  const [instructionReg, setInstructionReg] = useState('ADD R1, R2');
  const [accumulator, setAccumulator] = useState(15);
  const [regR1, setRegR1] = useState(7);
  const [regR2, setRegR2] = useState(8);
  const [busClockSpeed, setBusClockSpeed] = useState<number>(100); // 100 MHz to 500 MHz

  // 8-bit Interactive Converter State (Strict real-time slider connection)
  const [sliderDecimalValue, setSliderDecimalValue] = useState<number>(75);
  const [bitArray, setBitArray] = useState<number[]>([0, 1, 0, 0, 1, 0, 1, 1]); // binary of 75

  // Interactive Logic Gate States
  const [inputA, setInputA] = useState(1);
  const [inputB, setInputB] = useState(1);
  const [inputCin, setInputCin] = useState(0);

  // Sequential Circuit Flip-Flop States
  const [inputJ, setInputJ] = useState(1);
  const [inputK, setInputK] = useState(1);
  const [ffStateQ, setFfStateQ] = useState(0);
  const [clockCount, setClockCount] = useState(0);
  const [clockHistory, setClockHistory] = useState<{ count: number; j: number; k: number; q: number }[]>([
    { count: 0, j: 1, k: 1, q: 0 },
  ]);

  // OS Memory Allocation States
  const [osPartitions, setOsPartitions] = useState([
    { id: 1, size: 200, used: 0, allocatedTo: '' },
    { id: 2, size: 500, used: 0, allocatedTo: '' },
    { id: 3, size: 300, used: 0, allocatedTo: '' },
    { id: 4, size: 400, used: 0, allocatedTo: '' },
  ]);
  const [osAlgorithm, setOsAlgorithm] = useState<'first-fit' | 'best-fit'>('first-fit');
  const [osMessage, setOsMessage] = useState('Ready to allocate real-time processes.');

  // Adaptive Difficulty & BKT
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
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

  // Interactive Challenge specific states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');

  // Feedback & Animation states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Post-completion Reflection state
  const [reflections, setReflections] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES FOR BIT MANIPULATOR (INSTANT UPDATE FROM SLIDER) ───
  const decimalValue = sliderDecimalValue;

  const hexValue = useMemo(() => {
    return decimalValue.toString(16).toUpperCase().padStart(2, '0');
  }, [decimalValue]);

  const octalValue = useMemo(() => {
    return decimalValue.toString(8).padStart(3, '0');
  }, [decimalValue]);

  const bcdValue = useMemo(() => {
    const hundreds = Math.floor(decimalValue / 100) % 10;
    const tens = Math.floor(decimalValue / 10) % 10;
    const units = decimalValue % 10;
    const hNibble = hundreds.toString(2).padStart(4, '0');
    const tNibble = tens.toString(2).padStart(4, '0');
    const uNibble = units.toString(2).padStart(4, '0');
    return `${hNibble} ${tNibble} ${uNibble}`;
  }, [decimalValue]);

  const grayCodeValue = useMemo(() => {
    const grayBits = [bitArray[0]];
    for (let i = 1; i < bitArray.length; i++) {
      grayBits.push(bitArray[i - 1] ^ bitArray[i]);
    }
    return grayBits.join('');
  }, [bitArray]);

  // ─── DERIVED LOGIC GATE ADDER OUTPUTS ───
  const halfAdderSum = useMemo(() => inputA ^ inputB, [inputA, inputB]);
  const halfAdderCarry = useMemo(() => inputA & inputB, [inputA, inputB]);
  const fullAdderSum = useMemo(() => inputA ^ inputB ^ inputCin, [inputA, inputB, inputCin]);
  const fullAdderCout = useMemo(() => (inputA & inputB) | (inputCin & (inputA ^ inputB)), [inputA, inputB, inputCin]);

  // ─── FILTERED CHALLENGES ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT EFFECT: LOAD EXISTING MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE DIFFICULTY EFFECT ───
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

  // ─── CANVAS SYSTEM BUS OSCILLOSCOPE ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let packetX = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const busY = [14, 28, 42];
      const busNames = ['ADDR BUS [Unidirectional →]', 'DATA BUS [Bidirectional ⇄]', 'CTRL BUS [Strobes / Clock]'];
      const busColors = ['#f59e0b', '#06b6d4', '#10b981'];

      busY.forEach((y, i) => {
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(15, y);
        ctx.lineTo(canvas.width - 15, y);
        ctx.stroke();

        ctx.fillStyle = busColors[i];
        ctx.font = '8px monospace';
        ctx.fillText(busNames[i], 18, y - 3);
      });

      const speedFactor = (busClockSpeed / 100) * 2.2;
      packetX = (packetX + speedFactor) % (canvas.width - 50);

      // Packet drawing
      ctx.fillStyle = busColors[1];
      ctx.shadowColor = busColors[1];
      ctx.shadowBlur = 6;
      ctx.fillRect(15 + packetX, busY[1] - 4, 18, 7);

      // Address pulse
      ctx.fillStyle = busColors[0];
      ctx.shadowColor = busColors[0];
      ctx.fillRect(15 + ((packetX * 1.2) % (canvas.width - 50)), busY[0] - 4, 12, 7);

      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, cpuCycleStage, busClockSpeed]);

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
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
  }, []);

  const handlePredictionAnswer = useCallback((predId: string, optIdx: number, correctIdx: number) => {
    const isCorrect = optIdx === correctIdx;
    setPredictionAnswers(prev => ({ ...prev, [predId]: optIdx }));
    setPredictionFeedback(prev => ({ ...prev, [predId]: isCorrect }));
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, []);

  const handleObservationAnswer = useCallback((obsId: string, optIdx: number, correctIdx: number) => {
    const isCorrect = optIdx === correctIdx;
    setObservationAnswers(prev => ({ ...prev, [obsId]: optIdx }));
    setObservationFeedback(prev => ({ ...prev, [obsId]: isCorrect }));
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, []);

  const handleStepCpuCycle = useCallback(() => {
    audioManager.play('count');
    setCpuCycleStage(prev => {
      if (prev === 'FETCH') {
        setInstructionReg('ADD R1, R2');
        return 'DECODE';
      } else if (prev === 'DECODE') {
        return 'EXECUTE';
      } else if (prev === 'EXECUTE') {
        setAccumulator(regR1 + regR2);
        return 'WRITEBACK';
      } else {
        setProgramCounter(pc => pc + 1);
        return 'FETCH';
      }
    });
  }, [regR1, regR2]);

  // Real-time slider update handler with instant binary propagation
  const handleSliderDecimalChange = useCallback((value: number) => {
    const clamped = Math.max(0, Math.min(255, value));
    setSliderDecimalValue(clamped);
    const newBits: number[] = [];
    for (let i = 7; i >= 0; i--) {
      newBits.push((clamped >> i) & 1);
    }
    setBitArray(newBits);
  }, []);

  const handleToggleBit = useCallback((index: number) => {
    audioManager.play('pop');
    setBitArray(prev => {
      const next = [...prev];
      next[index] = next[index] === 1 ? 0 : 1;
      const newDec = next.reduce((acc, bit, idx) => acc + bit * Math.pow(2, 7 - idx), 0);
      setSliderDecimalValue(newDec);
      return next;
    });
  }, []);

  const handleClockPulseFlipFlop = useCallback(() => {
    audioManager.play('count');
    setClockCount(c => c + 1);
    setFfStateQ(prevQ => {
      let nextQ = prevQ;
      if (inputJ === 0 && inputK === 0) nextQ = prevQ;
      else if (inputJ === 0 && inputK === 1) nextQ = 0;
      else if (inputJ === 1 && inputK === 0) nextQ = 1;
      else nextQ = prevQ === 1 ? 0 : 1;

      setClockHistory(h => [...h.slice(-7), { count: clockCount + 1, j: inputJ, k: inputK, q: nextQ }]);
      return nextQ;
    });
  }, [inputJ, inputK, clockCount]);

  const handleAllocateProcess = useCallback((procName: string, reqSize: number) => {
    audioManager.play('tap');
    if (osAlgorithm === 'first-fit') {
      let allocated = false;
      setOsPartitions(prev => {
        const next = [...prev];
        for (let i = 0; i < next.length; i++) {
          if (next[i].allocatedTo === '' && next[i].size >= reqSize) {
            next[i].allocatedTo = procName;
            next[i].used = reqSize;
            allocated = true;
            break;
          }
        }
        return next;
      });
      setOsMessage(allocated ? `First-Fit allocated ${procName} (${reqSize} KB).` : `First-Fit allocation failed: No single hole >= ${reqSize} KB!`);
    } else {
      setOsPartitions(prev => {
        const next = [...prev];
        let bestIdx = -1;
        let smallestDiff = Infinity;
        for (let i = 0; i < next.length; i++) {
          if (next[i].allocatedTo === '' && next[i].size >= reqSize) {
            const diff = next[i].size - reqSize;
            if (diff < smallestDiff) {
              smallestDiff = diff;
              bestIdx = i;
            }
          }
        }
        if (bestIdx !== -1) {
          next[bestIdx].allocatedTo = procName;
          next[bestIdx].used = reqSize;
          setOsMessage(`Best-Fit placed ${procName} into ${next[bestIdx].size} KB block (leaving ${smallestDiff} KB internal leftover).`);
        } else {
          setOsMessage(`Best-Fit allocation failed: No single partition fits ${reqSize} KB!`);
        }
        return next;
      });
    }
  }, [osAlgorithm]);

  const handleResetOsPartitions = useCallback(() => {
    audioManager.play('pop');
    setOsPartitions([
      { id: 1, size: 200, used: 0, allocatedTo: '' },
      { id: 2, size: 500, used: 0, allocatedTo: '' },
      { id: 3, size: 300, used: 0, allocatedTo: '' },
      { id: 4, size: 400, used: 0, allocatedTo: '' },
    ]);
    setOsMessage('Memory partition table reset.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    if (finalScore === 100) {
      speechManager.speak('PERFECT SCORE! Superb micro-architectural execution! Shakti-Core verification complete.');
    } else {
      speechManager.speak('Great work! Do not give up — review the missed concepts and try again to achieve mastery.');
    }
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
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
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Accurate analysis!');
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
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
      }
    }
  }, [challenge, hintCount, hitMisconceptions, showNextHint]);

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

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // Spaced Repetition (SRS) schedule computation
  const srsSchedule = useMemo(() => {
    if (errors === 0) {
      return {
        intervalDays: 7,
        nextDate: new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        rating: 'Optimal Retention (Mastered)',
        badgeColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40',
      };
    } else if (errors <= 3) {
      return {
        intervalDays: 3,
        nextDate: new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        rating: 'Moderate Retention (Review Soon)',
        badgeColor: 'text-amber-400 border-amber-500/40 bg-amber-950/40',
      };
    } else {
      return {
        intervalDays: 1,
        nextDate: new Date(Date.now() + 1 * 86400000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        rating: 'Needs Reinforcement (Review Tomorrow)',
        badgeColor: 'text-rose-400 border-rose-500/40 bg-rose-950/40',
      };
    }
  }, [errors]);

  // Motivational message calculation
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'FLAWLESS ARCHITECTURE SCORE!';
    if (errors <= 3) return 'OUTSTANDING HARDWARE MASTERY!';
    if (errors <= 7) return 'SOLID ENGINEERING INTUITION!';
    return 'KEEP ITERATING — HARDWARE DEBUGGING IS AN ART!';
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/90 backdrop-blur rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-2xl"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400 bg-gold-950/70 px-2 py-0.5 rounded border border-gold-800">
                ISC Class 11 CS • Paper 1
              </span>
              <span className="text-xs text-slate-400 font-mono">c11_cs_001 → c11_cs_010</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(tab => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPhase(tab)}
              aria-label={`Switch to ${tab} phase`}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                phase === tab
                  ? 'bg-gold-500 text-slate-950 shadow-md shadow-gold-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="space-y-6"
          >
            {/* Mission Narrative Banner */}
            <div className="p-6 bg-gradient-to-br from-gold-950/80 via-slate-900 to-gold-950/60 rounded-2xl border border-gold-700/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">🛰️</div>
              <div className="relative z-10 max-w-3xl">
                <span className="text-xs font-bold text-gold-400 uppercase tracking-widest bg-gold-950/90 px-2.5 py-1 rounded-full border border-gold-800">
                  National Mission • SCL Mohali & IIT Madras
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-3">{SCENARIO.title}</h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{SCENARIO.intro}</p>
                <div className="mt-4 p-3 bg-slate-950/70 rounded-xl border border-gold-900/50 text-xs text-gold-300 flex items-center gap-2">
                  <span>💡</span>
                  <span>{SCENARIO.context}</span>
                </div>
              </div>
            </div>

            {/* Discovery Curiosity Question */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-amber-400 font-bold">🔍 Discovery Hook (Intuition Test)</span>
                <span className="text-xs text-slate-400">• Low stakes exploration</span>
              </div>
              <p className="text-base sm:text-lg text-white font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 gap-2.5">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    aria-label={`Discovery option ${i + 1}: ${opt}`}
                    className={`text-left p-4 rounded-xl text-sm font-medium transition-all ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/70 border-2 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900/60 border border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center text-xs text-slate-400 font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-slate-950 border border-gold-800/60 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div>
                    <p className={`text-sm font-bold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {discoveryCorrect ? '✓ Spot on logic!' : '💡 Architectural Revelation:'}
                    </p>
                    <p className="text-xs text-slate-300 mt-1">{DISCOVERY_QUESTION.hintAfter}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    aria-label="Advance to interactive lab"
                    className="px-6 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold rounded-xl shadow-lg shadow-gold-500/20 text-sm whitespace-nowrap"
                  >
                    Launch Interactive Hardware Lab →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
        {phase === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Step Navigation Bar */}
            <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-xs text-gold-400 font-bold uppercase tracking-wider">
                Step {currentSlide + 1} of {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}
              </span>
              <div className="flex gap-1.5">
                {EXPLORATION_STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    aria-label={`Jump to exploration step ${i + 1}`}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentSlide === i ? 'bg-gold-400 w-6' : 'bg-slate-700 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Active Exploration Module Container */}
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>⚙️</span>
                  <span>{EXPLORATION_STEPS[currentSlide].title}</span>
                </h3>
                <p className="text-sm text-amber-300 mt-1 flex items-center gap-1.5">
                  <span>👉</span>
                  <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
                </p>
              </div>

              {/* SLIDE 0: CPU Von Neumann Architecture Stepper (SVG Diagram 1) */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {/* Bus Frequency Slider Control */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-gold-400">System Bus Clock Frequency:</span>
                      <span className="ml-2 font-mono text-white text-sm font-bold">{busClockSpeed} MHz</span>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-64">
                      <span className="text-[10px] text-slate-500">100 MHz</span>
                      <input
                        type="range"
                        min="50"
                        max="400"
                        value={busClockSpeed}
                        onChange={(e) => setBusClockSpeed(Number(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
                      />
                      <span className="text-[10px] text-slate-500">400 MHz</span>
                    </div>
                  </div>

                  {/* Oscilloscope Canvas */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <p className="text-xs font-mono text-slate-400 mb-2">Real-Time System Bus Oscilloscope (Address / Data / Control)</p>
                    <canvas ref={canvasRef} width={600} height={52} className="w-full h-14 rounded-lg bg-slate-950" />
                  </div>

                  {/* SVG DIAGRAM 1: Von Neumann Architecture */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 650 260" className="w-full h-auto">
                      <rect x="20" y="20" width="360" height="220" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      <text x="35" y="42" fill="#38bdf8" fontSize="12" fontWeight="bold">Central Processing Unit (CPU Core)</text>

                      <rect x="40" y="60" width="150" height="80" rx="8" fill={cpuCycleStage === 'EXECUTE' ? '#065f46' : '#1e293b'} stroke="#10b981" strokeWidth="1.5" />
                      <text x="115" y="90" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">ALU</text>
                      <text x="115" y="110" textAnchor="middle" fill="#94a3b8" fontSize="10">Acc: {accumulator} (R1+R2)</text>

                      <rect x="210" y="60" width="150" height="80" rx="8" fill={cpuCycleStage === 'DECODE' ? '#78350f' : '#1e293b'} stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="285" y="90" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Control Unit (CU)</text>
                      <text x="285" y="110" textAnchor="middle" fill="#94a3b8" fontSize="10">Stage: {cpuCycleStage}</text>

                      <rect x="40" y="155" width="320" height="70" rx="8" fill="#1e293b" stroke="#64748b" />
                      <text x="55" y="178" fill="#94a3b8" fontSize="10" fontWeight="bold">Internal Registers:</text>
                      <text x="55" y="200" fill="#e2e8f0" fontSize="11" fontFamily="monospace">
                        PC: 0x00{programCounter.toString(16).toUpperCase()} | IR: [{instructionReg}] | R1: {regR1} | R2: {regR2}
                      </text>

                      <rect x="470" y="20" width="160" height="220" rx="12" fill="#0f172a" stroke="#818cf8" strokeWidth="2" />
                      <text x="550" y="45" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontWeight="bold">Main Memory (RAM)</text>
                      <text x="550" y="65" textAnchor="middle" fill="#64748b" fontSize="9">(Unified Code & Data)</text>

                      {[
                        { addr: '0x000A', val: 'ADD R1, R2' },
                        { addr: '0x000B', val: '7 (data)' },
                        { addr: '0x000C', val: '8 (data)' },
                        { addr: '0x000D', val: '0 (acc-out)' },
                      ].map((cell, idx) => (
                        <g key={cell.addr}>
                          <rect x="485" y={85 + idx * 35} width="130" height="28" rx="4" fill="#1e293b" stroke="#475569" />
                          <text x="492" y={103 + idx * 35} fill="#38bdf8" fontSize="9" fontFamily="monospace">{cell.addr}</text>
                          <text x="550" y={103 + idx * 35} fill="#e2e8f0" fontSize="9">{cell.val}</text>
                        </g>
                      ))}

                      <line x1="380" y1="130" x2="470" y2="130" stroke="#f59e0b" strokeWidth="4" strokeDasharray="6 3" />
                      <text x="425" y="120" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">System Bus</text>
                    </svg>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-xs text-slate-400">Current Phase:</span>
                      <p className="text-lg font-bold text-gold-400 font-mono">CYCLE [{cpuCycleStage}]</p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleStepCpuCycle}
                      aria-label="Step CPU fetch-decode-execute cycle"
                      className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-gold-600/20"
                    >
                      <span>Next Clock Pulse ➔</span>
                    </motion.button>
                  </div>

                  {/* OBSERVATION QUESTION 1 */}
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-gold-800/40 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">🔬 Brilliant Observation Hook 1</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium">{OBSERVATION_QUESTIONS[0].prompt}</p>
                    <div className="space-y-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleObservationAnswer(OBSERVATION_QUESTIONS[0].id, oIdx, OBSERVATION_QUESTIONS[0].correctIndex)}
                          className={`w-full text-left p-3 rounded-lg text-xs font-medium border transition-all ${
                            observationAnswers[OBSERVATION_QUESTIONS[0].id] !== undefined
                              ? oIdx === OBSERVATION_QUESTIONS[0].correctIndex
                                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                                : oIdx === observationAnswers[OBSERVATION_QUESTIONS[0].id]
                                ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                                : 'bg-slate-900 border-slate-800 text-slate-500'
                              : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {observationAnswers[OBSERVATION_QUESTIONS[0].id] !== undefined && (
                      <p className="text-xs text-gold-300 bg-gold-950/60 p-2.5 rounded-lg border border-gold-800/60">
                        {OBSERVATION_QUESTIONS[0].explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 1: 8-Bit Interactive Converter with Real-Time Range Slider */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {/* Real-time Range Slider Input */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <label htmlFor="decimal-slider" className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                        Real-Time Value Drag Slider (0 to 255)
                      </label>
                      <span className="text-2xl font-black font-mono text-gold-300">{decimalValue}</span>
                    </div>
                    <input
                      id="decimal-slider"
                      type="range"
                      min="0"
                      max="255"
                      value={decimalValue}
                      onChange={(e) => handleSliderDecimalChange(Number(e.target.value))}
                      className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>0x00 (0)</span>
                      <span>0x7F (127)</span>
                      <span>0xFF (255)</span>
                    </div>
                  </div>

                  {/* Interactive 8-Bit Switchboard */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-xs font-semibold text-slate-400 mb-3">Or click bit switches to toggle weights individually:</p>
                    <div className="grid grid-cols-8 gap-2 sm:gap-3">
                      {bitArray.map((bit, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={() => handleToggleBit(idx)}
                          aria-label={`Toggle bit ${7 - idx} with weight ${Math.pow(2, 7 - idx)}`}
                          className={`p-3 sm:p-4 rounded-xl flex flex-col items-center justify-center gap-1 transition-all border ${
                            bit === 1
                              ? 'bg-gold-950/80 border-gold-400 text-gold-300 shadow-lg shadow-gold-500/20'
                              : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500'
                          }`}
                        >
                          <span className="text-xs font-mono text-slate-400">2^{7 - idx}</span>
                          <span className="text-xl sm:text-2xl font-black">{bit}</span>
                          <span className="text-[10px] font-mono text-slate-500">w={Math.pow(2, 7 - idx)}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Multi-Representation Converter Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Decimal (Base 10)</span>
                      <p className="text-2xl font-black text-white mt-1 font-mono">{decimalValue}</p>
                    </div>
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Hex (Base 16)</span>
                      <p className="text-2xl font-black text-amber-300 mt-1 font-mono">0x{hexValue}</p>
                    </div>
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Octal (Base 8)</span>
                      <p className="text-2xl font-black text-emerald-300 mt-1 font-mono">{octalValue}_8</p>
                    </div>
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">Packed BCD</span>
                      <p className="text-xs font-bold text-gold-300 mt-2 font-mono break-all">{bcdValue}</p>
                    </div>
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Gray Code</span>
                      <p className="text-xs font-bold text-purple-300 mt-2 font-mono">{grayCodeValue}</p>
                    </div>
                  </div>

                  {/* OBSERVATION QUESTION 2 */}
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-gold-800/40 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">🔬 Brilliant Observation Hook 2</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium">{OBSERVATION_QUESTIONS[1].prompt}</p>
                    <div className="space-y-2">
                      {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleObservationAnswer(OBSERVATION_QUESTIONS[1].id, oIdx, OBSERVATION_QUESTIONS[1].correctIndex)}
                          className={`w-full text-left p-3 rounded-lg text-xs font-medium border transition-all ${
                            observationAnswers[OBSERVATION_QUESTIONS[1].id] !== undefined
                              ? oIdx === OBSERVATION_QUESTIONS[1].correctIndex
                                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                                : oIdx === observationAnswers[OBSERVATION_QUESTIONS[1].id]
                                ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                                : 'bg-slate-900 border-slate-800 text-slate-500'
                              : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {observationAnswers[OBSERVATION_QUESTIONS[1].id] !== undefined && (
                      <p className="text-xs text-gold-300 bg-gold-950/60 p-2.5 rounded-lg border border-gold-800/60">
                        {OBSERVATION_QUESTIONS[1].explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 2: Combinational Logic Adder Lab (SVG Diagram 2) */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  {/* Gate Input Toggles */}
                  <div className="flex flex-wrap items-center gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-400">Logic Inputs:</span>
                    <button
                      onClick={() => setInputA(a => (a === 1 ? 0 : 1))}
                      aria-label="Toggle Input A"
                      className={`px-4 py-2 rounded-lg font-bold text-sm ${inputA ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      Input A = {inputA}
                    </button>
                    <button
                      onClick={() => setInputB(b => (b === 1 ? 0 : 1))}
                      aria-label="Toggle Input B"
                      className={`px-4 py-2 rounded-lg font-bold text-sm ${inputB ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      Input B = {inputB}
                    </button>
                    <button
                      onClick={() => setInputCin(c => (c === 1 ? 0 : 1))}
                      aria-label="Toggle Carry-In"
                      className={`px-4 py-2 rounded-lg font-bold text-sm ${inputCin ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      Carry In (Cin) = {inputCin}
                    </button>
                  </div>

                  {/* SVG DIAGRAM 2: Full Adder Gate Schematic */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-xs font-mono text-slate-400 mb-2">Full Adder Logic Circuit Schematic (HA1 + HA2 + OR)</p>
                    <svg viewBox="0 0 650 200" className="w-full h-auto">
                      <text x="20" y="45" fill="#38bdf8" fontSize="12" fontWeight="bold">A = {inputA}</text>
                      <text x="20" y="95" fill="#38bdf8" fontSize="12" fontWeight="bold">B = {inputB}</text>
                      <text x="20" y="165" fill="#818cf8" fontSize="12" fontWeight="bold">Cin = {inputCin}</text>

                      {/* Half Adder 1 Box */}
                      <rect x="100" y="25" width="160" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                      <text x="180" y="55" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">Half Adder 1</text>
                      <text x="180" y="75" textAnchor="middle" fill="#94a3b8" fontSize="10">S1 = {halfAdderSum} | C1 = {halfAdderCarry}</text>

                      {/* Half Adder 2 Box */}
                      <rect x="320" y="25" width="160" height="90" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                      <text x="400" y="55" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontWeight="bold">Half Adder 2</text>
                      <text x="400" y="75" textAnchor="middle" fill="#94a3b8" fontSize="10">Sum = {fullAdderSum}</text>

                      {/* OR Gate for Carry-out */}
                      <rect x="420" y="130" width="100" height="50" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                      <text x="470" y="155" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">OR Gate</text>
                      <text x="470" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9">Cout = {fullAdderCout}</text>

                      {/* Wires */}
                      <line x1="260" y1="55" x2="320" y2="55" stroke="#38bdf8" strokeWidth="2" />
                      <line x1="480" y1="70" x2="570" y2="70" stroke="#38bdf8" strokeWidth="3" />
                      <text x="580" y="75" fill="#38bdf8" fontSize="12" fontWeight="bold">SUM = {fullAdderSum}</text>

                      <line x1="520" y1="155" x2="570" y2="155" stroke="#10b981" strokeWidth="3" />
                      <text x="580" y="160" fill="#34d399" fontSize="12" fontWeight="bold">Cout = {fullAdderCout}</text>
                    </svg>
                  </div>
                </div>
              )}

              {/* SLIDE 3: JK Flip-Flop Sequential Lab (SVG Diagram 3 + Predictions) */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  {/* PREDICTION QUESTION 1 */}
                  <div className="p-4 bg-gold-950/60 rounded-xl border border-gold-700/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">🎯 Prediction Challenge 1</span>
                      <span className="text-[10px] text-gold-300">Predict before pulsing the clock</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, optI) => (
                        <button
                          key={optI}
                          onClick={() => handlePredictionAnswer(PREDICTION_QUESTIONS[0].id, optI, PREDICTION_QUESTIONS[0].correctIndex)}
                          className={`p-2.5 rounded-lg text-xs font-medium text-left border transition-all ${
                            predictionAnswers[PREDICTION_QUESTIONS[0].id] !== undefined
                              ? optI === PREDICTION_QUESTIONS[0].correctIndex
                                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                                : optI === predictionAnswers[PREDICTION_QUESTIONS[0].id]
                                ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                                : 'bg-slate-900 border-slate-800 text-slate-500'
                              : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {predictionAnswers[PREDICTION_QUESTIONS[0].id] !== undefined && (
                      <div className="p-3 bg-slate-950 rounded-lg border border-gold-800/50 text-xs text-gold-200 space-y-1">
                        <p className="font-bold text-amber-300">🔍 Verification Task:</p>
                        <p>{PREDICTION_QUESTIONS[0].verifyInstruction}</p>
                      </div>
                    )}
                  </div>

                  {/* SVG DIAGRAM 3: JK Flip-Flop Gate & Timing Diagram */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-xs font-mono text-slate-400 mb-2">JK Flip-Flop Circuit & Live Waveform</p>
                    <svg viewBox="0 0 650 160" className="w-full h-auto">
                      <rect x="180" y="20" width="180" height="120" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                      <text x="270" y="45" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">JK Flip-Flop</text>

                      {/* Inputs */}
                      <text x="130" y="55" fill="#e2e8f0" fontSize="11" fontWeight="bold">J = {inputJ}</text>
                      <line x1="150" y1="50" x2="180" y2="50" stroke="#f59e0b" strokeWidth="2" />

                      <text x="100" y="85" fill="#38bdf8" fontSize="11" fontWeight="bold">CLK (⚡{clockCount})</text>
                      <line x1="150" y1="80" x2="180" y2="80" stroke="#38bdf8" strokeWidth="2" />

                      <text x="130" y="115" fill="#e2e8f0" fontSize="11" fontWeight="bold">K = {inputK}</text>
                      <line x1="150" y1="110" x2="180" y2="110" stroke="#f59e0b" strokeWidth="2" />

                      {/* Outputs */}
                      <line x1="360" y1="50" x2="410" y2="50" stroke="#10b981" strokeWidth="2" />
                      <text x="420" y="55" fill="#34d399" fontSize="12" fontWeight="bold">Q = {ffStateQ}</text>

                      <line x1="360" y1="110" x2="410" y2="110" stroke="#64748b" strokeWidth="2" />
                      <text x="420" y="115" fill="#94a3b8" fontSize="12" fontWeight="bold">Q' = {ffStateQ === 1 ? 0 : 1}</text>

                      {/* Waveform indicator */}
                      <rect x="490" y="30" width="140" height="100" rx="6" fill="#1e293b" stroke="#334155" />
                      <text x="560" y="50" textAnchor="middle" fill="#94a3b8" fontSize="10">State Mode:</text>
                      <text x="560" y="75" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">
                        {inputJ === 1 && inputK === 1 ? 'TOGGLE' : inputJ === 1 ? 'SET' : inputK === 1 ? 'RESET' : 'HOLD'}
                      </text>
                      <text x="560" y="105" textAnchor="middle" fill="#34d399" fontSize="11" fontFamily="monospace">Q(t+1) = {ffStateQ}</text>
                    </svg>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setInputJ(j => (j === 1 ? 0 : 1))}
                        className={`px-3 py-1.5 rounded-lg font-bold text-xs ${inputJ ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                      >
                        Input J = {inputJ}
                      </button>
                      <button
                        onClick={() => setInputK(k => (k === 1 ? 0 : 1))}
                        className={`px-3 py-1.5 rounded-lg font-bold text-xs ${inputK ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                      >
                        Input K = {inputK}
                      </button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleClockPulseFlipFlop}
                      className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-md shadow-orange-500/20"
                    >
                      <span>⚡ Send Positive Clock Pulse (Tick)</span>
                    </motion.button>
                  </div>

                  {/* PREDICTION QUESTION 2 */}
                  <div className="p-4 bg-gold-950/60 rounded-xl border border-gold-700/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">🎯 Prediction Challenge 2</span>
                      <span className="text-[10px] text-gold-300">Gray Code Logic Test</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white font-medium">{PREDICTION_QUESTIONS[1].question}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[1].options.map((opt, optI) => (
                        <button
                          key={optI}
                          onClick={() => handlePredictionAnswer(PREDICTION_QUESTIONS[1].id, optI, PREDICTION_QUESTIONS[1].correctIndex)}
                          className={`p-2.5 rounded-lg text-xs font-medium text-left border transition-all ${
                            predictionAnswers[PREDICTION_QUESTIONS[1].id] !== undefined
                              ? optI === PREDICTION_QUESTIONS[1].correctIndex
                                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                                : optI === predictionAnswers[PREDICTION_QUESTIONS[1].id]
                                ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                                : 'bg-slate-900 border-slate-800 text-slate-500'
                              : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {predictionAnswers[PREDICTION_QUESTIONS[1].id] !== undefined && (
                      <div className="p-3 bg-slate-950 rounded-lg border border-gold-800/50 text-xs text-gold-200 space-y-1">
                        <p className="font-bold text-amber-300">🔍 Verification Task:</p>
                        <p>{PREDICTION_QUESTIONS[1].verifyInstruction}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 4: OS Memory Allocator Lab */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Partition Strategy:</span>
                      <button
                        onClick={() => setOsAlgorithm('first-fit')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          osAlgorithm === 'first-fit' ? 'bg-gold-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        First-Fit
                      </button>
                      <button
                        onClick={() => setOsAlgorithm('best-fit')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          osAlgorithm === 'best-fit' ? 'bg-gold-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Best-Fit
                      </button>
                    </div>
                    <button onClick={handleResetOsPartitions} className="text-xs text-rose-400 hover:underline">
                      Reset Partition Table
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleAllocateProcess('IRCTC_Booking_Thread', 250)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg border border-slate-700"
                    >
                      + Spawn IRCTC Thread (250 KB)
                    </button>
                    <button
                      onClick={() => handleAllocateProcess('UPI_Auth_Server', 180)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg border border-slate-700"
                    >
                      + Spawn UPI Server (180 KB)
                    </button>
                    <button
                      onClick={() => handleAllocateProcess('ISRO_Telemetry', 350)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg border border-slate-700"
                    >
                      + Spawn ISRO Telemetry (350 KB)
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {osPartitions.map(part => (
                      <div key={part.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between text-xs text-slate-400">
                            <span>Part #{part.id}</span>
                            <span className="font-mono">{part.size} KB</span>
                          </div>
                          <p className="text-sm font-bold text-white mt-1">
                            {part.allocatedTo || <span className="text-slate-600 font-normal">Free Partition</span>}
                          </p>
                        </div>
                        <div className="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gold-500 rounded-full"
                            style={{ width: `${(part.used / part.size) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs font-mono text-gold-300">{osMessage}</p>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Step
                </motion.button>
                <span className="text-xs text-slate-500">Step {currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                  >
                    Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                  >
                    Try Free Hardware Sandbox →
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 3: SANDBOX FREE PLAY ─── */}
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>🧪</span>
                <span>Unrestricted Hardware Sandbox Lab</span>
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Zero scoring constraints. Move the real-time slider or toggle bits freely to build intuitive multi-base muscle memory.
              </p>
            </div>

            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Live Value Range Drag Slider</span>
                  <span className="text-2xl font-bold text-gold-300 font-mono">{decimalValue}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={decimalValue}
                  onChange={(e) => handleSliderDecimalChange(Number(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
                />
              </div>

              <div>
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">8-Bit Bus Bit Switches</span>
                <div className="grid grid-cols-8 gap-2 mt-2">
                  {bitArray.map((bit, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleToggleBit(idx)}
                      className={`p-3 rounded-lg font-bold font-mono text-center border ${
                        bit === 1 ? 'bg-gold-500 text-slate-950 border-gold-300' : 'bg-slate-950 text-slate-500 border-slate-800'
                      }`}
                    >
                      {bit}
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-xs font-mono text-slate-300">
                  <span>Dec: <strong className="text-white">{decimalValue}</strong></span>
                  <span>Hex: <strong className="text-amber-400">0x{hexValue}</strong></span>
                  <span>Oct: <strong className="text-emerald-400">{octalValue}_8</strong></span>
                  <span>Gray: <strong className="text-purple-400">{grayCodeValue}</strong></span>
                  <span>BCD: <strong className="text-gold-400">{bcdValue}</strong></span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold rounded-xl shadow-lg shadow-gold-500/20 text-sm"
              >
                Launch Certified Challenges (20+ Items) →
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 4: CHALLENGES ─── */}
        {phase === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-white">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                  difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : difficulty === 'standard' ? 'bg-gold-950 text-gold-400 border border-gold-800'
                  : 'bg-purple-950 text-purple-400 border border-purple-800'
                }`}>
                  {difficulty}
                </span>
                <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                  NEP 2020: {challenge.competencyLevel}
                </span>
              </div>

              <div className="w-32 sm:w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-500 to-gold-500"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>

            <div className={`p-6 bg-slate-900/90 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-800'
            }`}>
              <p className="text-base sm:text-lg text-white font-medium mb-6">{challenge.question}</p>

              {/* MCQ Types with Framer Motion shake on wrong */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center text-xs text-slate-400 font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Drag Label Diagram */}
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
                        className="px-3 py-1.5 bg-gold-600 hover:bg-gold-500 rounded-lg text-xs font-bold text-white cursor-grab shadow-sm"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {Object.keys(challenge.correctMapping || {}).map(slotId => (
                      <div
                        key={slotId}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop(slotId)}
                        className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] text-center ${
                          droppedLabels[slotId]
                            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                            : 'bg-slate-950 border-slate-700 text-slate-500'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold text-slate-400">{slotId}</span>
                        <span className="text-xs font-bold mt-1">{droppedLabels[slotId] || 'Drop subsystem label here'}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-5 py-2.5 bg-gold-600 text-white font-bold rounded-xl text-xs"
                  >
                    Verify Subsystem Mapping
                  </motion.button>
                </div>
              )}

              {/* Drag Sort Chronology */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-950 text-gold-400 font-bold flex items-center justify-center shrink-0">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="px-5 py-2.5 bg-gold-600 text-white font-bold rounded-xl text-xs"
                  >
                    Check Cycle Sequence
                  </motion.button>
                </div>
              )}

              {/* Numeric Entry */}
              {challenge.type === 'numeric' && (
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numerical answer"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-gold-400"
                  />
                  <span className="text-sm text-slate-400 font-medium">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-gold-600 text-white font-bold rounded-xl text-xs"
                  >
                    Validate
                  </motion.button>
                </div>
              )}

              {/* Step-by-Step Progressive Walkthrough Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-amber-950/40 rounded-xl border border-amber-700/60 space-y-3"
                >
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step-by-Step Walkthrough:</span>
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-amber-200 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400 mr-1.5">{i + 1}.</span>
                        {sentence}{!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}

                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-amber-800 hover:bg-amber-700 text-white font-bold rounded-lg text-xs"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/20"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Certification →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 5: COMPLETION, SPACED REPETITION & REAL-WORLD ACTIVITY ─── */}
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* MOTIVATIONAL FEEDBACK HEADER */}
            <div className="p-8 bg-gradient-to-br from-gold-950 via-slate-900 to-gold-950 rounded-3xl border border-gold-500/40 text-center relative overflow-hidden">
              <div className="text-6xl mb-3">🚀</div>
              <motion.h3
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-2xl sm:text-3xl font-black text-amber-300 tracking-wider mb-2"
              >
                {motivationalMessage}
              </motion.h3>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">Shakti-Core Architecture Certified!</h2>
              <p className="text-gold-300 text-sm mt-1">ISC Class 11 Computer Science Syllabus Mastery Verified</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto mt-6">
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400">Score</span>
                  <p className="text-2xl font-black text-emerald-400 font-mono">{Math.max(0, 100 - errors * 4)}%</p>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400">Mastery Level</span>
                  <p className="text-base font-bold text-gold-400 capitalize">{masteryLevel}</p>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400">Total Solved</span>
                  <p className="text-2xl font-black text-white font-mono">{scoreBreakdown.total}</p>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400">Errors Recorded</span>
                  <p className="text-2xl font-black text-rose-400 font-mono">{errors}</p>
                </div>
              </div>
            </div>

            {/* SPACED REPETITION (SRS) VISIBILITY CARD */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📅</span>
                  <h3 className="text-base font-bold text-white">Smart Spaced Repetition (SRS) Review Schedule</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${srsSchedule.badgeColor}`}>
                  {srsSchedule.rating}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Based on your error frequency ({errors} incorrect attempts), the SuperMemo SM-2 algorithm has scheduled your next micro-review session:
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Recommended Review Target</span>
                  <p className="text-lg font-bold text-gold-300 mt-0.5">
                    Review in <span className="text-white underline">{srsSchedule.intervalDays} day{srsSchedule.intervalDays > 1 ? 's' : ''}</span> ({srsSchedule.nextDate})
                  </p>
                </div>
                <div className="text-xs text-slate-400 font-mono text-right">
                  <span>SM-2 Memory Decay Factor: EF=2.5</span>
                  <br />
                  <span className="text-emerald-400">Topic: Computer Architecture & Digital Logic</span>
                </div>
              </div>
            </div>

            {/* REAL WORLD ACTIVITY SECTION */}
            <div className="p-6 bg-gradient-to-br from-gold-950/40 via-slate-900 to-gold-950/40 rounded-2xl border border-gold-700/50 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛠️</span>
                <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-3">
                {REAL_WORLD_ACTIVITY.steps.map((step) => (
                  <div key={step.stepNumber} className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="font-bold text-gold-400">Step {step.stepNumber}: {step.title}</p>
                    <p className="text-slate-300 leading-relaxed">{step.action}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gold-300 bg-gold-950/60 p-3 rounded-xl border border-gold-800/60 font-medium">
                🌟 National Takeaway: {REAL_WORLD_ACTIVITY.takeaway}
              </p>
            </div>

            {/* MANDATORY REFLECTION SECTION */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-gold-800/60 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧠</span>
                <h3 className="text-lg font-bold text-white">Metacognitive Reflection</h3>
              </div>
              <p className="text-xs text-slate-400">Solidify your architectural intuition by answering these reflection prompts:</p>

              <div className="space-y-4 mt-2">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <label htmlFor="ref-q1" className="text-xs font-bold text-gold-400">
                    What was the most surprising concept you discovered about stored-program computing?
                  </label>
                  <textarea
                    id="ref-q1"
                    value={reflections.surprising}
                    onChange={(e) => setReflections(r => ({ ...r, surprising: e.target.value }))}
                    placeholder="e.g. How instructions and data bit patterns are completely identical in memory..."
                    rows={2}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <label htmlFor="ref-q2" className="text-xs font-bold text-gold-400">
                    How would you explain the JK Flip-Flop toggle property to a fellow student?
                  </label>
                  <textarea
                    id="ref-q2"
                    value={reflections.explain}
                    onChange={(e) => setReflections(r => ({ ...r, explain: e.target.value }))}
                    placeholder="e.g. J=1 and K=1 fixes the SR forbidden state by flipping the bit on each clock tick..."
                    rows={2}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <label htmlFor="ref-q3" className="text-xs font-bold text-gold-400">
                    Where in Indian digital infrastructure (UPI, ISRO, IRCTC) is this knowledge applied?
                  </label>
                  <textarea
                    id="ref-q3"
                    value={reflections.realLife}
                    onChange={(e) => setReflections(r => ({ ...r, realLife: e.target.value }))}
                    placeholder="e.g. In designing fault-tolerant hardware adders to prevent integer overflows in banking..."
                    rows={2}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>
            </div>

            {/* Misconception Diagnostic Profile */}
            {hitMisconceptions.length > 0 && (
              <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                  <span>⚠️</span>
                  <span>Targeted Misconceptions Detected & Resolved:</span>
                </h3>
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-900/40 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FEEDBACK OVERLAYS ─── */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pointer-events-none">
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Micro-Architecture Certified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
      </motion.div>
    </div>
  );
}

export default C11_ComputerScienceComputerArchitectureNeumannSim;
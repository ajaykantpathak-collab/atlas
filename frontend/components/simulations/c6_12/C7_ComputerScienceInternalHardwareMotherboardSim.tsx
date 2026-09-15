'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── CANONICAL NODE IDS ───
const NODE_C7_CS_001 = 'c7_cs_001'; // Internal hardware - motherboard, CPU, RAM, ROM, GPU
const NODE_C7_CS_002 = 'c7_cs_002'; // External hardware - input, output, and storage devices
const NODE_C7_CS_003 = 'c7_cs_003'; // Ports and connectors - USB, HDMI, VGA, Ethernet, audio
const NODE_C7_CS_004 = 'c7_cs_004'; // Binary number system and computer arithmetic
const NODE_C7_CS_005 = 'c7_cs_005'; // Decimal, octal, and hexadecimal number systems
const NODE_C7_CS_006 = 'c7_cs_006'; // Number system conversions - decimal to binary, binary to decimal
const NODE_C7_CS_007 = 'c7_cs_007'; // Computer virus - definition, types
const NODE_C7_CS_008 = 'c7_cs_008'; // Virus symptoms, entry methods, and prevention
const NODE_C7_CS_009 = 'c7_cs_009'; // Antivirus software - functions, types, regular updates
const NODE_C7_CS_010 = 'c7_cs_010'; // Internet advantages and disadvantages

const ALL_NODE_IDS = [
  NODE_C7_CS_001,
  NODE_C7_CS_002,
  NODE_C7_CS_003,
  NODE_C7_CS_004,
  NODE_C7_CS_005,
  NODE_C7_CS_006,
  NODE_C7_CS_007,
  NODE_C7_CS_008,
  NODE_C7_CS_009,
  NODE_C7_CS_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'CyberLab Mission: Hardware, Data & Security Architect',
  intro: 'You have been appointed Chief Systems Engineer for St. Xavier’s Digital Lab in Bengaluru. The school computers need internal motherboard diagnostics, binary bus decoding, port connections, virus quarantine, and cybersecurity policy implementation.',
  context: 'Diagnose the internal architecture (CPU, RAM, ROM, GPU, motherboard), convert bit streams across number systems, defend against polymorphic malware, and optimize system safety.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'During a sudden power cut in the computer lab, Ananya lost her unsaved school essay, yet when power returned, the desktop knew exactly how to boot up Windows. Which pair of components explains this?',
  options: [
    'Hard disk failed; CPU rebooted everything.',
    'RAM lost its contents because it is volatile; ROM kept the boot instructions because it is non-volatile.',
    'Motherboard lost power; GPU restarted the operating system.',
    'Antivirus deleted the essay; Ethernet downloaded a fresh copy of Windows.',
  ],
  correctIndex: 1,
  hintAfter: 'Don’t worry if you were unsure! Let us step inside the computer casing to observe live voltage, volatile registers, and data buses.',
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c7_cs_001)
  {
    id: 'ch_001',
    nodeId: NODE_C7_CS_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which component is known as the "backbone" of the computer because it connects the CPU, memory, expansion cards, and distributes electrical power?',
    options: ['Hard Disk Drive (HDD)', 'Motherboard (Main Circuit Board)', 'Power Supply Unit (SMPS) only', 'Graphics Processing Unit (GPU)'],
    correctIndex: 1,
    explanation: 'The motherboard is the largest circuit board and acts as the central backbone. It interconnects CPU, RAM, ROM, GPU, and peripheral buses with printed traces.',
    hints: [
      'Think of the giant printed circuit board that holds all sockets.',
      'It provides data buses and power traces connecting every internal chip.',
      'It is literally the "mother" of all printed boards inside the case.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag Label Motherboard (c7_cs_001)
  {
    id: 'ch_002',
    nodeId: NODE_C7_CS_001,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each internal hardware label to its corresponding socket or functional area on the motherboard layout.',
    dragItems: [
      { label: 'CPU Socket', targetId: 'slot_cpu' },
      { label: 'RAM DIMM Slots', targetId: 'slot_ram' },
      { label: 'ROM BIOS Chip', targetId: 'slot_rom' },
      { label: 'PCIe GPU Slot', targetId: 'slot_gpu' },
    ],
    correctMapping: {
      slot_cpu: 'CPU Socket',
      slot_ram: 'RAM DIMM Slots',
      slot_rom: 'ROM BIOS Chip',
      slot_gpu: 'PCIe GPU Slot',
    },
    explanation: 'The CPU sits at the central socket, RAM clicks into long DIMM slots on the right, ROM BIOS is a dedicated non-volatile chip, and GPU mounts onto the high-speed PCIe expansion lane.',
    hints: [
      'The central square socket is for the main processing brain.',
      'The tall vertical slots near the top right hold volatile memory sticks (RAM).',
      'The long horizontal expansion slot at the bottom holds the graphics card.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Understanding (c7_cs_002)
  {
    id: 'ch_003',
    nodeId: NODE_C7_CS_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A flatbed scanner in the school office digitizes a printed ICSE certificate. Why is the scanner classified as an INPUT device?',
    options: [
      'Because it produces a paper printout for the user.',
      'Because it captures optical data from the outside world and sends digital bit streams into the CPU/storage.',
      'Because it connects to the computer using a power cable.',
      'Because it acts as a secondary storage device like a pen drive.',
    ],
    correctIndex: 1,
    explanation: 'Classification depends on data direction: the scanner converts real-world optical images into digital signals entering the computer system.',
    hints: [
      'Ask: Is data entering the computer case or coming out to the user?',
      'A scanner does not create paper (a printer does). It creates a digital image inside the computer.',
      'Data travels from paper -> scanner -> CPU memory. That is an input flow.',
    ],
    misconceptionIndex: 1,
  },
  // 4. Foundation - Match Ports (c7_cs_003)
  {
    id: 'ch_004',
    nodeId: NODE_C7_CS_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which port carries BOTH high-definition digital video and multi-channel audio through a single slim cable to smart classroom projectors?',
    options: ['15-pin Blue VGA Port', 'HDMI (High-Definition Multimedia Interface)', 'RJ45 Ethernet Port', '3.5mm Pink Audio Jack'],
    correctIndex: 1,
    explanation: 'HDMI carries uncompressed digital video AND digital audio simultaneously. VGA carries only analog video without sound.',
    hints: [
      'Look for the interface that replaced legacy analog blue plugs.',
      'It contains the words "High-Definition Multimedia".',
      'HDMI delivers both picture and sound in one cable.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Foundation - Decimal to Binary (c7_cs_004)
  {
    id: 'ch_005',
    nodeId: NODE_C7_CS_004,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Convert the decimal number 13 into its 4-bit binary representation. (Enter the 0s and 1s as an integer, e.g., 1101).',
    correctAnswer: 1101,
    tolerance: 0,
    unit: 'binary',
    explanation: '13 / 2 = 6 r 1; 6 / 2 = 3 r 0; 3 / 2 = 1 r 1; 1 / 2 = 0 r 1. Reading remainders bottom-to-top gives 1101 (8 + 4 + 0 + 1 = 13).',
    hints: [
      'Use repeated division by 2 or positional weights: 8, 4, 2, 1.',
      '13 = 8 + 4 + 1. So bits for 8, 4, and 1 are ON (1), and 2 is OFF (0).',
      'The string is 1101.',
    ],
  },
  // 6. Foundation - Number Systems Symbols (c7_cs_005)
  {
    id: 'ch_006',
    nodeId: NODE_C7_CS_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the Hexadecimal (Base-16) number system, which English alphabet letter represents the decimal value 14?',
    options: ['Letter D', 'Letter E', 'Letter F', 'Letter B'],
    correctIndex: 1,
    explanation: 'In Base-16: A=10, B=11, C=12, D=13, E=14, F=15. Thus, 14 is represented by the symbol E.',
    hints: [
      'Count up from A: A=10, B=11, C=12...',
      'D is 13, so what comes right after D?',
      'E corresponds to 14 (and F is 15).',
    ],
  },
  // 7. Foundation - Virus Definition (c7_cs_007)
  {
    id: 'ch_007',
    nodeId: NODE_C7_CS_007,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What are the two defining characteristics of a computer virus that distinguish it from standard software bugs or hardware defects?',
    options: [
      'It breaks the monitor screen and overheats the keyboard.',
      'It is a malicious program created with bad intent AND is self-replicating (attaches to host files).',
      'It is a hardware short circuit caused by dust inside the cabinet.',
      'It is an operating system feature that automatically deletes old files.',
    ],
    correctIndex: 1,
    explanation: 'A computer virus is defined as malicious, human-authored code engineered to replicate itself by modifying other host programs or boot sectors.',
    hints: [
      'Viruses are software programs, not physical cracks in screens.',
      'They copy themselves deliberately without user consent.',
      'Look for "malicious" and "self-replicating".',
    ],
  },
  // 8. Standard - Drag Sort Boot Order (c7_cs_001 / c7_cs_007)
  {
    id: 'ch_008',
    nodeId: NODE_C7_CS_001,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of events that occurs when a computer is powered on in the presence of a Boot Sector Virus.',
    sortItems: [
      'Power switch turned ON -> Motherboard delivers current to CPU',
      'CPU reads initial boot code from ROM BIOS chip',
      'Infected Boot Sector on disk/USB executes malicious code BEFORE the OS loads',
      'Operating System kernel attempts to load into RAM with virus already resident in memory',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Power on triggers hardware electricity -> ROM BIOS executes -> Boot Sector code (infected) runs before OS -> OS loads into RAM with the virus already active.',
    hints: [
      'Electrical power and ROM instructions must precede any disk reading.',
      'The boot sector executes before the OS kernel takes over.',
      'This early execution is why boot sector viruses are so dangerous.',
    ],
  },
  // 9. Standard - Application: Binary Addition (c7_cs_004)
  {
    id: 'ch_009',
    nodeId: NODE_C7_CS_004,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Perform the binary addition: 101₂ (5 in decimal) + 110₂ (6 in decimal). What is the resulting binary sum? (e.g. 1011)',
    correctAnswer: 1011,
    tolerance: 0,
    unit: 'binary',
    explanation: '101 + 110: units col 1+0=1; twos col 0+1=1; fours col 1+1=10 (0 with carry 1 to eights col) -> 1011₂ (8+2+1 = 11 in decimal).',
    hints: [
      'Add column by column from right to left.',
      '1 + 0 = 1; 0 + 1 = 1; 1 + 1 = 0 with carry 1.',
      '5 + 6 = 11 in decimal. 11 in binary is 8 + 2 + 1 = 1011.',
    ],
  },
  // 10. Standard - Conversion Hex to Decimal (c7_cs_006)
  {
    id: 'ch_010',
    nodeId: NODE_C7_CS_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Convert the Hexadecimal byte 2F₁₆ into its standard decimal equivalent.',
    correctAnswer: 47,
    tolerance: 0,
    unit: 'decimal',
    explanation: '2F₁₆ = (2 × 16¹) + (F × 16⁰) = (2 × 16) + (15 × 1) = 32 + 15 = 47.',
    hints: [
      'In Hex, F equals 15.',
      'Multiply the left digit by 16 and add the right digit.',
      '2 × 16 = 32. Now add 15.',
    ],
  },
  // 11. Standard - Virus Types (c7_cs_007)
  {
    id: 'ch_007_poly',
    nodeId: NODE_C7_CS_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A type of virus that modifies its own internal encryption and byte sequence every single time it infects a new file to evade traditional static signature scanners is called a:',
    options: ['Macro Virus', 'Polymorphic Virus', 'File Allocation Table Virus', 'Boot Sector Virus'],
    correctIndex: 1,
    explanation: 'Polymorphic means "many forms". Polymorphic viruses mutate their appearance while keeping their payload intact, evading simple signature matching.',
    hints: [
      'The Greek prefix "poly" means many, and "morph" means shape/form.',
      'It acts like a digital shape-shifter.',
      'It changes its binary signature on each infection.',
    ],
  },
  // 12. Standard - Antivirus Functions (c7_cs_009)
  {
    id: 'ch_009_b',
    nodeId: NODE_C7_CS_009,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Assemble the 3 primary core pillars of antivirus software protection.',
    availableParts: ['Detect (Scan & Compare)', 'Prevent (Real-time Shield)', 'Remove (Quarantine & Clean)', 'Format Entire Hard Drive', 'Disable Windows Firewall'],
    targetState: 'Detect (Scan & Compare) Prevent (Real-time Shield) Remove (Quarantine & Clean)',
    validationHint: 'Select the three recognized cybersecurity defense actions in order: Detect, Prevent, Remove.',
    explanation: 'Antivirus architecture is founded on 3 pillars: Detection (signature matching), Prevention (on-access/real-time shield), and Removal (disinfection/quarantine).',
    hints: [
      'Look for the three constructive defense actions.',
      'Detect -> Prevent -> Remove.',
      'Do not include destructive actions like formatting or disabling firewalls.',
    ],
  },
  // 13. Standard - Virus Symptoms vs Causes (c7_cs_008)
  {
    id: 'ch_008_b',
    nodeId: NODE_C7_CS_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A student claims: "My computer caught a virus because the system performance was running slowly." Evaluate the logical flaw in this reasoning.',
    options: [
      'There is no flaw; slow performance is the actual transmitter of malware.',
      'The student confused a SYMPTOM with an ENTRY METHOD. Slow performance is caused when active malware hogs CPU/RAM; it entered via an infected USB, attachment, or download.',
      'Viruses only infect mobile phones, never desktop computers.',
      'Slow performance is caused by the GPU running out of video memory only.',
    ],
    correctIndex: 1,
    explanation: 'CISCE examiners frequently note confusion between symptoms and entry vectors. Slow speed is a symptom; untrusted media or downloads are the entry vector.',
    hints: [
      'Compare this to medicine: Fever is a symptom of flu, but a mosquito bite or virus inhalation is the cause/entry.',
      'Sluggishness happens AFTER the virus is running and stealing CPU cycles.',
      'The vector was the USB drive or email attachment.',
    ],
    misconceptionIndex: 3,
  },
  // 14. Standard - Internet Risks (c7_cs_010)
  {
    id: 'ch_010_eval',
    nodeId: NODE_C7_CS_010,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Distinguish between "Privacy Loss" and "Cybercrime" in online environments.',
    options: [
      'They are identical terms with no legal or technical difference.',
      'Privacy Loss involves collection and tracking of personal habits/data (often via cookies/app permissions), whereas Cybercrime involves illegal criminal acts like phishing, banking theft, and hacking.',
      'Privacy loss only happens on desktop computers, while cybercrime only occurs on smartphones.',
      'Cybercrime is legal in India, whereas privacy loss is strictly forbidden by ICSE rules.',
    ],
    correctIndex: 1,
    explanation: 'Privacy loss occurs through pervasive tracking and data over-collection; Cybercrime refers to deliberate illegal acts punishable under the Information Technology Act.',
    hints: [
      'Think about accepting tracking cookies vs a scammer stealing your bank OTP.',
      'One is commercial data gathering/sharing, the other is criminal fraud.',
      'Option 2 correctly highlights the distinction.',
    ],
    misconceptionIndex: 4,
  },
  // 15. Advanced - Real-world Diagnostics Lab (c7_cs_001)
  {
    id: 'ch_001_adv',
    nodeId: NODE_C7_CS_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A video editing lab in Chennai complains: "When editing 4K educational videos, rendering frames is painfully slow, but opening Word documents is instantaneous." Which hardware upgrade will MOST effectively solve the rendering bottleneck?',
    options: [
      'Replace the ROM BIOS chip with a higher capacity chip.',
      'Upgrade to a dedicated high-performance GPU with parallel graphics processing cores and VRAM.',
      'Replace the Ethernet network cable with a longer cable.',
      'Install a larger VGA monitor.',
    ],
    correctIndex: 1,
    explanation: 'Video rendering requires massive parallel mathematical matrix calculations on pixel grids, which is the specialized domain of dedicated GPUs.',
    hints: [
      'Which internal chip specializes in graphics, video frames, and visual rendering?',
      'ROM stores boot instructions and cannot speed up rendering.',
      'A dedicated GPU (Graphics Processing Unit) provides high-speed parallel shaders.',
    ],
  },
  // 16. Advanced - Binary Subtraction with Borrow (c7_cs_004)
  {
    id: 'ch_004_sub',
    nodeId: NODE_C7_CS_004,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Perform the binary subtraction: 1010₂ (10 in decimal) - 0111₂ (7 in decimal). What is the binary result? (e.g. 11 or 0011)',
    correctAnswer: 11,
    tolerance: 0,
    unit: 'binary',
    explanation: '1010 - 0111 = 0011₂ (which equals 3 in decimal). In binary subtraction, borrowing 1 from the next column brings a value of 2 into the current column.',
    hints: [
      '10 - 7 = 3 in decimal.',
      'Convert 3 into binary: 2 + 1 = 11₂.',
      'Enter 11 as the answer.',
    ],
  },
  // 17. Advanced - Decimal to Hex (c7_cs_005)
  {
    id: 'ch_005_adv',
    nodeId: NODE_C7_CS_005,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Build the Hexadecimal web color code for pure bright red (Decimal RGB values: Red = 255, Green = 0, Blue = 0).',
    availableParts: ['#', 'FF', '00', 'AA', '99', '16'],
    targetState: '# FF 00 00',
    validationHint: 'A hex color is formatted as # followed by 2 hex digits for Red (255=FF), 2 for Green (0=00), and 2 for Blue (0=00).',
    explanation: '255 in decimal is 15×16 + 15 = FF₁₆. Zero is 00₁₆. Hence, bright red is #FF0000.',
    hints: [
      'Start with the # symbol.',
      'Convert 255 to hex: 255 = 15×16 + 15 -> FF.',
      'Green is 00 and Blue is 00.',
    ],
  },
  // 18. Advanced - Virus Database Mechanics (c7_cs_009)
  {
    id: 'ch_009_adv',
    nodeId: NODE_C7_CS_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why will a school computer equipped with a licensed 2021 antivirus program STILL get infected by a ransomware strain authored in 2026?',
    options: [
      'Because 2026 computers have faster CPU clocks.',
      'Because antivirus signature scanning relies on a virus database of known patterns; zero-day or newer threats do not match outdated definitions.',
      'Because antivirus software only works when connected via VGA cables.',
      'Because viruses physically erase the motherboard printed circuits.',
    ],
    correctIndex: 1,
    explanation: 'Antivirus signature engines match incoming files against their stored database. If the definitions are not updated, newly engineered virus signatures go completely undetected.',
    hints: [
      'Think of a police wanted list: if a criminal started operating yesterday, is their photo in an old 5-year-old album?',
      'New threats have new binary fingerprints.',
      'Regular database updates are vital for recognizing emerging threats.',
    ],
  },
  // 19. Advanced - Cyber Security Policy (c7_cs_010)
  {
    id: 'ch_010_adv',
    nodeId: NODE_C7_CS_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are designing the Lab Safety Charter for St. Xavier’s. Which set of 3 rules provides maximum protection against USB malware, phishing, and data leaks?',
    options: [
      '1. Disable all passwords. 2. Never update Windows. 3. Open every email attachment immediately.',
      '1. Scan all removable USB drives prior to opening files. 2. Verify sender email addresses and never click unknown links. 3. Restrict app permissions and review cookie policies.',
      '1. Only browse between 10 PM and midnight. 2. Use 4K monitors for typing. 3. Avoid using HDMI cables.',
      '1. Remove the CPU from the motherboard daily. 2. Convert all text to octal numbers. 3. Delete the ROM chip.',
    ],
    correctIndex: 1,
    explanation: 'A resilient policy addresses the primary entry vectors: scanning removable media, validating email origins to stop phishing, and enforcing least-privilege permissions.',
    hints: [
      'Select the proactive, standard cybersecurity measures.',
      'Scanning USBs + verifying email senders + guarding privacy.',
      'Option 2 addresses all three attack surfaces.',
    ],
  },
  // 20. Advanced - Drag Sort Conversion Steps (c7_cs_006)
  {
    id: 'ch_006_sort',
    nodeId: NODE_C7_CS_006,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the step-by-step algorithm to convert Decimal 25 to Binary using repeated division.',
    sortItems: [
      'Divide 25 by 2: Quotient = 12, Remainder = 1 (LSB)',
      'Divide 12 by 2: Quotient = 6, Remainder = 0',
      'Divide 6 by 2: Quotient = 3, Remainder = 0; then 3 by 2: Q = 1, R = 1; then 1 by 2: Q = 0, R = 1 (MSB)',
      'Reverse the remainders from bottom-to-top (MSB to LSB): 11001₂',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Repeated division records remainders from least significant to most significant bit. The binary representation is formed by reading remainders in reverse (11001₂ = 16 + 8 + 1 = 25).',
    hints: [
      'First division gives the first remainder (LSB).',
      'Continue halving until quotient reaches 0.',
      'Finally, read the remainders backwards from bottom to top.',
    ],
  },
  // 21. Advanced - Octal Conversion (c7_cs_005)
  {
    id: 'ch_005_oct',
    nodeId: NODE_C7_CS_005,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Convert the decimal number 83 into its Base-8 (Octal) equivalent.',
    correctAnswer: 123,
    tolerance: 0,
    unit: 'octal',
    explanation: '83 / 8 = 10 r 3; 10 / 8 = 1 r 2; 1 / 8 = 0 r 1. Reading remainders bottom-to-top gives 123₈ (1×64 + 2×8 + 3×1 = 64 + 16 + 3 = 83).',
    hints: [
      'Repeatedly divide by 8 and record remainders.',
      '83 / 8 = 10 remainder 3.',
      '10 / 8 = 1 remainder 2; 1 / 8 = 0 remainder 1 -> 123₈.',
    ],
  },
  // 22. Advanced - Hardware Data Flow Synthesis (c7_cs_002 / c7_cs_001)
  {
    id: 'ch_002_adv',
    nodeId: NODE_C7_CS_002,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Trace the complete data path when an Indian student speaks into a microphone during an online ICSE physics class and the voice is transmitted to classmates over the internet.',
    options: [
      'Microphone (Input) -> Audio Port / Sound Card -> Motherboard Bus -> CPU/RAM -> Ethernet/Wi-Fi Port (Network Out)',
      'Monitor (Output) -> GPU -> ROM BIOS -> Keyboard -> Printer',
      'USB Flash Drive -> Hard Disk -> Scanner -> HDMI Port -> Mouse',
      'Antivirus -> Power Supply -> VGA Port -> RAM -> ROM',
    ],
    correctIndex: 0,
    explanation: 'Acoustic audio enters via the microphone (Input), converts to digital signals at the audio controller, traverses motherboard buses to CPU/RAM for encoding, and departs via the network interface.',
    hints: [
      'Follow the chronological direction: outside world -> input device -> internal bus/CPU -> network transmitter.',
      'Microphone is input; Ethernet/Wi-Fi is the transmission gateway.',
      'Option 1 accurately models the true hardware flow.',
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
  nodeId: NODE_C7_CS_001,
  title: 'Internal Hardware & Motherboard Architecture',
  definition:
    'Internal hardware comprises the core electronic components inside the system unit — including the motherboard (backbone), CPU (brain), RAM (volatile working memory), ROM (non-volatile boot memory), and GPU (graphics renderer) — communicating across high-speed bus lines.',
  eli5:
    'The motherboard is the city highway system, the CPU is the genius mathematician, RAM is the temporary whiteboard wiped clean when power cuts, ROM is the permanent stone tablet with startup rules, and the GPU is the master painter.',
  misconceptions: [
    {
      misconception: 'The CPU stores all your photos and files permanently like a hard disk.',
      correction: 'The CPU only processes instructions and holds active registers; long-term files live in non-volatile storage (HDD/SSD).',
    },
    {
      misconception: 'RAM and ROM are identical types of memory chips.',
      correction: 'RAM is volatile temporary working memory; ROM is non-volatile permanent memory storing boot BIOS code.',
    },
    {
      misconception: 'All computer ports carry both video and sound.',
      correction: 'VGA carries analog video only; HDMI carries both digital high-definition video and audio.',
    },
    {
      misconception: 'A computer virus is caused by hardware overheating or dust.',
      correction: 'A virus is a man-made malicious software program engineered to self-replicate and attach to legitimate host files.',
    },
    {
      misconception: 'Privacy loss and cybercrime are the same thing.',
      correction: 'Privacy loss is tracking and over-collection of personal data; cybercrime is illegal fraud, phishing, and hacking under cyber law.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which component executes instructions and performs arithmetic operations?',
      options: ['RAM', 'CPU', 'ROM', 'Motherboard'],
      correctIndex: 1,
    },
    {
      question: 'What happens to data stored in RAM when the computer power is switched off?',
      options: ['It is saved to ROM', 'It remains intact', 'It is instantly erased (volatile)', 'It transfers to the GPU'],
      correctIndex: 2,
    },
    {
      question: 'Which port is trapezoidal, blue in color, and has 15 pins for analog video only?',
      options: ['HDMI', 'VGA', 'Ethernet', 'USB'],
      correctIndex: 1,
    },
    {
      question: 'What is the binary equivalent of decimal 10?',
      options: ['1010', '1100', '1001', '1111'],
      correctIndex: 0,
    },
    {
      question: 'What does the symbol "F" represent in the Hexadecimal number system?',
      options: ['10', '12', '14', '15'],
      correctIndex: 3,
    },
    {
      question: 'A virus that mutates its binary signature each time it infects a file is:',
      options: ['Boot sector virus', 'Macro virus', 'Polymorphic virus', 'File virus'],
      correctIndex: 2,
    },
    {
      question: 'Why must antivirus software be updated regularly?',
      options: ['To speed up the monitor', 'To update the virus database with new signatures', 'To clean dust from the fan', 'To convert binary to octal'],
      correctIndex: 1,
    },
    {
      question: 'Which of the following is an input device?',
      options: ['Flatbed Scanner', 'Inkjet Printer', 'Laser Projector', 'LCD Monitor'],
      correctIndex: 0,
    },
  ],
  masteryCriteria:
    'Student identifies motherboard components, explains volatile vs non-volatile memory, converts numbers across binary/decimal/hex, analyzes malware vectors, and defines safe cyber practices.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Motherboard Architecture Lab',
    instruction: 'Click each internal hardware module on the motherboard circuit board to inspect its voltage, bus speed, and core function.',
    interactionType: 'click-parts',
    nodeId: NODE_C7_CS_001,
  },
  {
    title: '2. Live Volatility & Power Switch Test',
    instruction: 'Type text into the temporary RAM buffer, then toggle the main power switch to witness volatile RAM erase vs permanent ROM retention.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_CS_001,
  },
  {
    title: '3. Interactive Binary & Hex Bus Converter',
    instruction: 'Toggle the 8 binary bits (128, 64, 32, 16, 8, 4, 2, 1) or drag the live bus value slider and watch the real-time Decimal, Octal, and Hexadecimal bus outputs update.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_CS_004,
  },
  {
    title: '4. Port Matching & Signal Routing Matrix',
    instruction: 'Select hardware devices to inspect which physical port (HDMI, VGA, USB, Ethernet, Audio) and signal type they use.',
    interactionType: 'click-parts',
    nodeId: NODE_C7_CS_003,
  },
  {
    title: '5. Cyber Security & Malware Quarantine Chamber',
    instruction: 'Drag the Antivirus Update slider to observe real-time dynamic shield fortification against Boot Sector, File, Macro, and Polymorphic threats.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_CS_009,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'PREDICT: If you toggle Bit 7 (weight 128) and Bit 0 (weight 1) to ON (1), what will be the exact Hexadecimal representation?',
    options: ['81₁₆', 'FF₁₆', '80₁₆', '91₁₆'],
    correctIndex: 0,
    verifyInstruction: 'Now toggle Bit 7 (128) and Bit 0 (1) in the interactive bit matrix to verify your prediction!',
    nodeId: NODE_C7_CS_005,
  },
  {
    question: 'PREDICT: If an Antivirus database has not been updated for 3 years, what will happen when a newly compiled Polymorphic virus attacks?',
    options: [
      'The antivirus will detect it easily using old signatures.',
      'The polymorphic virus will slip past undetected because its mutated signature is missing from the outdated database.',
      'The CPU will automatically convert the virus to hexadecimal and delete it.',
      'The monitor will switch to VGA mode.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Slide the Antivirus Database slider down to 0% in Lab 5 and observe the malware detection status.',
    nodeId: NODE_C7_CS_009,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'OBSERVE: What happens to the RAM data buffer the exact instant you toggle the power switch to OFF?',
    observableOptions: [
      'The text remains safely stored in RAM.',
      'The RAM memory buffer drops to zero (erased) because it is volatile.',
      'The RAM data is automatically written to the ROM chip.',
      'The GPU saves the text as an image.',
    ],
    correctIndex: 1,
    nodeId: NODE_C7_CS_001,
  },
  {
    question: 'OBSERVE: When all 8 bits are turned ON (11111111₂), what do the Decimal and Hexadecimal outputs read?',
    observableOptions: [
      'Decimal = 255, Hexadecimal = FF',
      'Decimal = 100, Hexadecimal = AA',
      'Decimal = 256, Hexadecimal = 100',
      'Decimal = 128, Hexadecimal = F0',
    ],
    correctIndex: 0,
    nodeId: NODE_C7_CS_005,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Systems Engineer Audit Report',
  description: 'Conduct a complete physical hardware and security audit of a computer in your home or school lab in Bengaluru, Delhi, Mumbai, or Kolkata.',
  steps: [
    'Inspect the rear panel: identify USB, HDMI, VGA, RJ45 Ethernet, and 3.5mm audio jacks.',
    'Open System Information: note your CPU model, clock frequency, installed RAM (e.g. 8 GB / 16 GB), and dedicated or integrated GPU.',
    'Check Antivirus status: inspect the signature definition version date and initiate a manual update.',
    'Encode your initials or roll number into an 8-bit binary and 2-digit Hexadecimal byte.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C7_ComputerScienceInternalHardwareMotherboardSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['compsci'] || { name: 'Computer Science', emoji: '💻', color: 'cyan' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant.org patterns
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Hardware Lab State (Exploration & Sandbox)
  const [selectedMotherboardPart, setSelectedMotherboardPart] = useState<'cpu' | 'ram' | 'rom' | 'gpu' | 'chipset' | null>('cpu');
  const [powerOn, setPowerOn] = useState(true);
  const [ramBufferText, setRamBufferText] = useState('My ICSE Project Draft (Unsaved)');
  const [activeBits, setActiveBits] = useState<boolean[]>([false, false, false, false, true, true, false, true]); // 13 in binary
  const [selectedPortId, setSelectedPortId] = useState<'hdmi' | 'vga' | 'usb' | 'ethernet' | 'audio'>('hdmi');
  const [antivirusUpdateLevel, setAntivirusUpdateLevel] = useState(90); // 0-100%

  // Reflection responses state
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');

  // Challenge Engine State
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

  // Interactive challenge inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY ADAPTIVE DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C7_CS_001);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE DIFFICULTY EFFECT (BKT) ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── REAL-TIME CALCULATED BUS VALUES (BITS -> DEC, OCT, HEX) ───
  const calculatedBusValues = useMemo(() => {
    const weights = [128, 64, 32, 16, 8, 4, 2, 1];
    let dec = 0;
    activeBits.forEach((isOn, idx) => {
      if (isOn) dec += weights[idx];
    });
    const binStr = activeBits.map(b => (b ? '1' : '0')).join('');
    const octStr = dec.toString(8);
    const hexStr = dec.toString(16).toUpperCase().padStart(2, '0');
    return { dec, binStr, octStr, hexStr };
  }, [activeBits]);

  // Real-time bit setter from integer decimal value
  const handleDecimalSliderChange = useCallback((decimalVal: number) => {
    const clamped = Math.max(0, Math.min(255, decimalVal));
    const newBits = [
      (clamped & 128) !== 0,
      (clamped & 64) !== 0,
      (clamped & 32) !== 0,
      (clamped & 16) !== 0,
      (clamped & 8) !== 0,
      (clamped & 4) !== 0,
      (clamped & 2) !== 0,
      (clamped & 1) !== 0,
    ];
    setActiveBits(newBits);
    audioManager.play('count');
  }, []);

  // ─── 2D CANVAS BUS PULSE & SIGNAL ENGINE ───
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
      const w = canvas.width;
      const h = canvas.height;

      // Circuit grid background
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Bus copper traces
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(20, h / 2);
      ctx.lineTo(w - 20, h / 2);
      ctx.stroke();

      // Pulsing data packets moving across the bus
      for (let i = 0; i < 6; i++) {
        const offset = (frame * 2 + i * 50) % (w - 40);
        ctx.fillStyle = powerOn ? '#38bdf8' : '#475569';
        ctx.shadowColor = powerOn ? '#0284c7' : 'transparent';
        ctx.shadowBlur = powerOn ? 8 : 0;
        ctx.beginPath();
        ctx.arc(20 + offset, h / 2, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Bus status text
      ctx.fillStyle = powerOn ? '#a5f3fc' : '#64748b';
      ctx.font = '10px monospace';
      ctx.fillText(`SYSTEM BUS: ${powerOn ? '3.2 GHz ACTIVE' : 'NO CARRIER (POWER OFF)'} | BITS: ${calculatedBusValues.binStr}`, 20, 16);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [powerOn, calculatedBusValues.binStr]);

  // ─── CALLBACK HANDLERS ───
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
    }
  }, [hintCount, challenge]);

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
    speechManager.speak('Welcome to the interactive hardware lab. Step through each station to manipulate real components.');
  }, []);

  const handleSliderChange = useCallback((val: number) => {
    setAntivirusUpdateLevel(val);
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with bit conversion, volatility, and cybersecurity controls.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Beginning diagnostic challenges. Analyze questions carefully!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Verify your answer on the live circuit board.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation!' : 'Look closely at the memory buffer state.');
  }, []);

  const handleTogglePower = useCallback(() => {
    setPowerOn(prev => {
      const next = !prev;
      if (!next) {
        setRamBufferText('');
        audioManager.play('drop-wrong');
        speechManager.speak('Power cut! Volatile RAM data has been completely erased.');
      } else {
        setRamBufferText('New Session (Empty Workspace)');
        audioManager.play('sparkle');
        speechManager.speak('Power restored. ROM executed BIOS boot instructions.');
      }
      return next;
    });
  }, []);

  const handleToggleBit = useCallback((index: number) => {
    setActiveBits(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      audioManager.play('count');
      return updated;
    });
  }, []);

  const handleSelectMotherboardPart = useCallback((part: 'cpu' | 'ram' | 'rom' | 'gpu' | 'chipset') => {
    setSelectedMotherboardPart(part);
    audioManager.play('tap');
    const speechMap: Record<string, string> = {
      cpu: 'Central Processing Unit. Fetches, decodes, and executes program instructions.',
      ram: 'Random Access Memory. High-speed volatile working memory for active tasks.',
      rom: 'Read Only Memory. Non-volatile storage holding permanent BIOS startup code.',
      gpu: 'Graphics Processing Unit. Dedicated parallel processor for video and screen rendering.',
      chipset: 'Chipset Controller. Coordinates high-speed communication across system buses.',
    };
    speechManager.speak(speechMap[part] || '');
  }, []);

  const handleSelectPort = useCallback((port: 'hdmi' | 'vga' | 'usb' | 'ethernet' | 'audio') => {
    setSelectedPortId(port);
    audioManager.play('tap');
  }, []);

  const handleAntivirusSlider = useCallback((val: number) => {
    setAntivirusUpdateLevel(val);
    audioManager.play('count');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have successfully mastered Computer Science Hardware, Data Representation, and Security.');
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

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string, event?: React.MouseEvent) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent technical precision.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(bktStateRef.current));
        }

        if (event) {
          setSparklePos({ x: event.clientX, y: event.clientY });
          setShowSparkle(true);
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
          speechManager.speak('All hints reviewed. Let us walk through the complete step-by-step logic.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
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
      const isCorrectSlot = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrectSlot) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
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
      setSortArrangement(prev => {
        const arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleConstructTogglePart = useCallback((part: string) => {
    setConstructParts(prev => {
      audioManager.play('tap');
      if (prev.includes(part)) {
        return prev.filter(p => p !== part);
      }
      return [...prev, part];
    });
  }, []);

  // ─── MOTIVATIONAL FEEDBACK HELPER ───
  const getMotivationalFeedback = (errCount: number) => {
    if (errCount === 0) {
      return {
        badge: '🌟 PERFECT SCORE!',
        message: 'Flawless execution! Every internal motherboard component, binary bus line, port connector, and antivirus protocol was analyzed with 100% engineering precision.',
        color: 'emerald',
      };
    }
    if (errCount >= 1 && errCount <= 3) {
      return {
        badge: '⚡ Great work!',
        message: 'High technical competence demonstrated! You have mastered volatile vs non-volatile memory and data representation conversions.',
        color: 'cyan',
      };
    }
    if (errCount >= 4 && errCount <= 7) {
      return {
        badge: '💪 Good effort!',
        message: 'Solid engineering foundation. Review the targeted remediation cards below and repeat the interactive bus labs to cement your mastery.',
        color: 'amber',
      };
    }
    return {
      badge: '🎯 Do not give up — You WILL get this!',
      message: 'Hardware and binary logic can be tricky at first. Step through the interactive labs again and review the step-by-step logic!',
      color: 'rose',
    };
  };

  // ─── CLEANUP ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  const motivational = getMotivationalFeedback(errors);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-2xl shadow-lg shadow-cyan-950/50"
            aria-label="Computer Science Icon"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">ICSE CLASS 7 • COMPUTER SCIENCE</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">CISCE 2026 Ready</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation */}
        <nav aria-label="Simulation Sections" className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Navigate to ${p} section`}
              onClick={() => {
                setPhase(p);
                audioManager.play('whoosh');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                phase === p ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {p === 'discovery' ? '💡 Hook' : p === 'explore' ? '🔬 Lab' : p === 'sandbox' ? '🎮 Free Play' : '🎯 Challenges'}
            </motion.button>
          ))}
        </nav>
      </header>

      {/* ─── LIVE SYSTEM BUS STATUS CANVAS ─── */}
      <div className="mb-6 bg-slate-900/80 rounded-2xl p-3 border border-slate-800 shadow-inner">
        <canvas ref={canvasRef} width={800} height={36} className="w-full h-9 rounded-lg" aria-label="Live System Bus Data Pulse Visualizer" />
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-800/40 shadow-xl">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider mb-2">
              <span>🚨 Mission Dispatch</span>
            </div>
            <h2 className="text-2xl font-black text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">{SCENARIO.intro}</p>
            <div className="mt-4 p-3.5 bg-slate-950/60 rounded-2xl border border-cyan-900/30 text-xs text-cyan-300/90">
              ⚡ {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold">?</span>
              {DISCOVERY_QUESTION.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-2xl text-left text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-200 hover:border-cyan-500/40'
                  }`}
                >
                  <span className="font-bold text-cyan-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="ml-2 text-emerald-400 font-bold">✓</span>}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && <span className="ml-2 text-rose-400 font-bold">✗</span>}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}`}>
                  {discoveryCorrect ? '✓ Brilliant! RAM loses contents instantly on power loss, while ROM BIOS retains startup firmware.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Enter Interactive Hardware Labs"
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-cyan-600/30"
                >
                  Enter Hardware Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Interactive Lab Station {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <p className="text-xs text-amber-400 bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-800/40">
              👉 {EXPLORATION_STEPS[currentSlide].instruction}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800"
            >
              {/* ─── SVG 1: MOTHERBOARD ARCHITECTURE SVG ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 500 380" className="w-full max-w-lg select-none" role="img" aria-label="Interactive Motherboard Schematic Diagram">
                      {/* Main PCB */}
                      <rect x="20" y="20" width="460" height="340" rx="16" fill="#042f2e" stroke="#0d9488" strokeWidth="3" />
                      {/* Copper PCB circuit traces */}
                      <path d="M 50 50 L 150 50 L 150 120 M 150 50 L 300 50 M 80 300 L 220 300 L 220 200 M 350 150 L 420 150 M 350 250 L 420 250" stroke="#115e59" strokeWidth="2" fill="none" />

                      {/* CPU Socket */}
                      <g onClick={() => handleSelectMotherboardPart('cpu')} className="cursor-pointer" role="button" aria-label="Select CPU Socket" tabIndex={0}>
                        <rect
                          x="70"
                          y="60"
                          width="120"
                          height="120"
                          rx="10"
                          fill={selectedMotherboardPart === 'cpu' ? '#0284c7' : '#0f172a'}
                          stroke={selectedMotherboardPart === 'cpu' ? '#38bdf8' : '#334155'}
                          strokeWidth={selectedMotherboardPart === 'cpu' ? 3 : 2}
                        />
                        <rect x="85" y="75" width="90" height="90" rx="6" fill="#1e293b" />
                        <text x="130" y="115" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">CPU</text>
                        <text x="130" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">Central Processor</text>
                        <circle cx="130" cy="90" r="4" fill="#22c55e" />
                      </g>

                      {/* RAM DIMM Slots */}
                      <g onClick={() => handleSelectMotherboardPart('ram')} className="cursor-pointer" role="button" aria-label="Select RAM DIMM Slots" tabIndex={0}>
                        <rect
                          x="240"
                          y="60"
                          width="35"
                          height="140"
                          rx="4"
                          fill={selectedMotherboardPart === 'ram' ? '#16a34a' : '#0f172a'}
                          stroke={selectedMotherboardPart === 'ram' ? '#4ade80' : '#334155'}
                          strokeWidth="2"
                        />
                        <rect
                          x="290"
                          y="60"
                          width="35"
                          height="140"
                          rx="4"
                          fill={selectedMotherboardPart === 'ram' ? '#16a34a' : '#0f172a'}
                          stroke={selectedMotherboardPart === 'ram' ? '#4ade80' : '#334155'}
                          strokeWidth="2"
                        />
                        <text x="282" y="135" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold" transform="rotate(-90 282 135)">RAM (DDR4)</text>
                      </g>

                      {/* ROM BIOS Chip */}
                      <g onClick={() => handleSelectMotherboardPart('rom')} className="cursor-pointer" role="button" aria-label="Select ROM BIOS Chip" tabIndex={0}>
                        <rect
                          x="380"
                          y="80"
                          width="70"
                          height="50"
                          rx="6"
                          fill={selectedMotherboardPart === 'rom' ? '#e11d48' : '#0f172a'}
                          stroke={selectedMotherboardPart === 'rom' ? '#fb7185' : '#334155'}
                          strokeWidth="2"
                        />
                        <text x="415" y="105" textAnchor="middle" fill="#fb7185" fontSize="11" fontWeight="bold">ROM</text>
                        <text x="415" y="120" textAnchor="middle" fill="#fda4af" fontSize="8">BIOS</text>
                      </g>

                      {/* PCIe GPU Expansion Slot */}
                      <g onClick={() => handleSelectMotherboardPart('gpu')} className="cursor-pointer" role="button" aria-label="Select PCIe GPU Expansion Slot" tabIndex={0}>
                        <rect
                          x="70"
                          y="220"
                          width="260"
                          height="45"
                          rx="6"
                          fill={selectedMotherboardPart === 'gpu' ? '#9333ea' : '#0f172a'}
                          stroke={selectedMotherboardPart === 'gpu' ? '#c084fc' : '#334155'}
                          strokeWidth="2"
                        />
                        <text x="200" y="248" textAnchor="middle" fill="#c084fc" fontSize="12" fontWeight="bold">PCIe x16 GPU GRAPHICS CARD</text>
                      </g>

                      {/* Chipset Controller */}
                      <g onClick={() => handleSelectMotherboardPart('chipset')} className="cursor-pointer" role="button" aria-label="Select Chipset Controller" tabIndex={0}>
                        <rect
                          x="360"
                          y="180"
                          width="90"
                          height="90"
                          rx="8"
                          fill={selectedMotherboardPart === 'chipset' ? '#d97706' : '#0f172a'}
                          stroke={selectedMotherboardPart === 'chipset' ? '#fbbf24' : '#334155'}
                          strokeWidth="2"
                        />
                        <text x="405" y="225" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">CHIPSET</text>
                        <text x="405" y="240" textAnchor="middle" fill="#fde68a" fontSize="8">Bus Controller</text>
                      </g>

                      {/* Rear Port Headers */}
                      <rect x="25" y="60" width="20" height="150" fill="#334155" rx="3" />
                      <text x="35" y="140" textAnchor="middle" fill="#94a3b8" fontSize="8" transform="rotate(-90 35 140)">I/O PORTS</text>
                    </svg>
                  </div>

                  {/* Component Diagnostic Card */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Module Inspector</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                          {selectedMotherboardPart ? selectedMotherboardPart.toUpperCase() : 'SELECT A CHIP'}
                        </span>
                      </div>

                      {selectedMotherboardPart === 'cpu' && (
                        <div>
                          <h4 className="text-base font-bold text-cyan-300">Central Processing Unit (CPU)</h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            The brain of the computer. Executes binary instructions, performs arithmetic operations via ALU, and coordinates program threads.
                          </p>
                          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2 bg-slate-900 rounded-lg"><span className="text-slate-400">Role:</span> <strong className="text-white">Instruction Exec</strong></div>
                            <div className="p-2 bg-slate-900 rounded-lg"><span className="text-slate-400">Clock:</span> <strong className="text-emerald-400">3.8 GHz Turbo</strong></div>
                          </div>
                        </div>
                      )}

                      {selectedMotherboardPart === 'ram' && (
                        <div>
                          <h4 className="text-base font-bold text-emerald-300">Random Access Memory (RAM)</h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            High-speed <strong>VOLATILE</strong> working memory. Holds open apps and files. When power shuts off, all contents vanish instantly.
                          </p>
                          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2 bg-slate-900 rounded-lg"><span className="text-slate-400">Type:</span> <strong className="text-rose-400">Volatile</strong></div>
                            <div className="p-2 bg-slate-900 rounded-lg"><span className="text-slate-400">Speed:</span> <strong className="text-emerald-400">3200 MT/s</strong></div>
                          </div>
                        </div>
                      )}

                      {selectedMotherboardPart === 'rom' && (
                        <div>
                          <h4 className="text-base font-bold text-rose-300">Read Only Memory (ROM BIOS)</h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            Permanent <strong>NON-VOLATILE</strong> memory chip. Holds the Power-On Self-Test (POST) and initial startup bootstrap instructions.
                          </p>
                          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2 bg-slate-900 rounded-lg"><span className="text-slate-400">Type:</span> <strong className="text-emerald-400">Non-Volatile</strong></div>
                            <div className="p-2 bg-slate-900 rounded-lg"><span className="text-slate-400">Contents:</span> <strong className="text-white">Firmware BIOS</strong></div>
                          </div>
                        </div>
                      )}

                      {selectedMotherboardPart === 'gpu' && (
                        <div>
                          <h4 className="text-base font-bold text-purple-300">Graphics Processing Unit (GPU)</h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            Specialized parallel processor designed to render millions of pixels, 3D vectors, animations, and video feeds to the display.
                          </p>
                          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2 bg-slate-900 rounded-lg"><span className="text-slate-400">Cores:</span> <strong className="text-purple-400">2048 Shaders</strong></div>
                            <div className="p-2 bg-slate-900 rounded-lg"><span className="text-slate-400">Output:</span> <strong className="text-white">HDMI / DP</strong></div>
                          </div>
                        </div>
                      )}

                      {selectedMotherboardPart === 'chipset' && (
                        <div>
                          <h4 className="text-base font-bold text-amber-300">Motherboard Chipset & Buses</h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            The central traffic controller. Manages PCIe, SATA, USB, and memory channels, linking all components into a synchronized system.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {(['cpu', 'ram', 'rom', 'gpu'] as const).map(p => (
                        <motion.button
                          key={p}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Inspect ${p.toUpperCase()} module`}
                          onClick={() => handleSelectMotherboardPart(p)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                            selectedMotherboardPart === p ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {p}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STATION 1: VOLATILITY & POWER CUT EXPERIMENT ─── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* RAM State Card */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">RAM Buffer (Volatile Working Memory)</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${powerOn ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                          {powerOn ? '⚡ POWER ACTIVE' : '❌ POWER CUT'}
                        </span>
                      </div>
                      <textarea
                        value={ramBufferText}
                        onChange={e => setRamBufferText(e.target.value)}
                        placeholder="Type unsaved text here..."
                        disabled={!powerOn}
                        rows={3}
                        aria-label="Temporary RAM Memory Text Buffer"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-emerald-300 font-mono disabled:opacity-30 focus:outline-none focus:border-emerald-500"
                      />
                      <p className="text-xs text-slate-400 mt-2">
                        {powerOn ? 'Currently holding active application session in live electrical capacitors.' : 'Capacitors discharged: Data completely wiped to 0x00!'}
                      </p>
                    </div>

                    {/* ROM State Card */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">ROM BIOS (Non-Volatile Permanent Memory)</span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-slate-800 text-slate-300">
                          🛡️ PERMANENT CHIP
                        </span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-rose-300 space-y-1">
                        <div>0xFFFF0: POST_HARDWARE_CHECK_OK</div>
                        <div>0xFFFF4: CPU_FREQ_3800MHZ_INIT</div>
                        <div>0xFFFF8: BOOTSTRAP_LOAD_OS_KERNEL</div>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">
                        Instructions are permanently burned into silicon at manufacture. Remains intact with or without electrical power.
                      </p>
                    </div>
                  </div>

                  {/* Power Switch Controller */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white">Main Lab Power Grid Switch</h4>
                      <p className="text-xs text-slate-400">Toggle power to test real-time volatile memory behavior.</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={powerOn ? 'Cut electrical power' : 'Restore electrical power'}
                      onClick={handleTogglePower}
                      className={`px-6 py-3 rounded-2xl font-bold text-sm shadow-xl flex items-center gap-2 ${
                        powerOn ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                      }`}
                    >
                      {powerOn ? '⚡ CUT ELECTRICAL POWER' : '🔌 RESTORE POWER'}
                    </motion.button>
                  </div>

                  {/* Observation Question */}
                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40">
                      <p className="text-sm font-bold text-indigo-300 mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            aria-label={`Select observation ${i + 1}`}
                            onClick={() => handleObservation(i)}
                            className="p-3 bg-slate-900 hover:bg-slate-800 rounded-xl text-left text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── SVG 2: BINARY REGISTER & LIVE BUS ARCHITECTURE ─── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  {/* PREDICT-THEN-CHECK */}
                  {!predictionMade && (
                    <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/40">
                      <p className="text-sm font-bold text-cyan-300 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`Prediction option ${opt}`}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 bg-slate-900 rounded-xl text-xs font-bold text-slate-200 border border-slate-700 hover:border-cyan-400"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <p className="text-xs text-amber-400 bg-amber-950/30 p-2.5 rounded-xl border border-amber-800/30">
                      ⚡ {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </p>
                  )}

                  {/* SVG 2: Interactive 8-Bit Bus Logic Schematic */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 520 180" className="w-full max-w-xl select-none" role="img" aria-label="8-Bit Binary Bus Register Schematic Diagram">
                      <rect x="10" y="10" width="500" height="160" rx="12" fill="#021a24" stroke="#0891b2" strokeWidth="2" />
                      <text x="260" y="30" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">8-BIT DATA BUS REGISTER & VOLTAGE LEVELS</text>
                      {[128, 64, 32, 16, 8, 4, 2, 1].map((w, idx) => {
                        const bitOn = activeBits[idx];
                        const xPos = 25 + idx * 60;
                        return (
                          <g key={idx} className="cursor-pointer" onClick={() => handleToggleBit(idx)}>
                            {/* Circuit Wire */}
                            <line x1={xPos + 22} y1="45" x2={xPos + 22} y2="65" stroke={bitOn ? '#38bdf8' : '#334155'} strokeWidth="3" />
                            {/* Bit Gate Box */}
                            <rect
                              x={xPos}
                              y="65"
                              width="45"
                              height="55"
                              rx="8"
                              fill={bitOn ? '#0369a1' : '#0f172a'}
                              stroke={bitOn ? '#38bdf8' : '#475569'}
                              strokeWidth="2"
                            />
                            <text x={xPos + 22} y="92" textAnchor="middle" fill={bitOn ? '#ffffff' : '#64748b'} fontSize="16" fontWeight="black" fontFamily="monospace">
                              {bitOn ? '1' : '0'}
                            </text>
                            <text x={xPos + 22} y="112" textAnchor="middle" fill={bitOn ? '#a5f3fc' : '#475569'} fontSize="8" fontWeight="bold">
                              {bitOn ? 'HIGH (+5V)' : 'LOW (0V)'}
                            </text>
                            {/* Weight Label */}
                            <text x={xPos + 22} y="138" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                              2^{7 - idx}
                            </text>
                            <text x={xPos + 22} y="152" textAnchor="middle" fill="#06b6d4" fontSize="9" fontWeight="bold">
                              ={w}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Real-time Slider to Bus Conversion */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                      <span>Real-time Decimal Value Slider:</span>
                      <span className="text-emerald-400 font-mono text-sm">{calculatedBusValues.dec} (0 - 255)</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={255}
                      value={calculatedBusValues.dec}
                      aria-label="Decimal Value Bus Slider"
                      onChange={e => handleDecimalSliderChange(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  {/* 8-Bit Interactive Register Buttons */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Bit Toggle Matrix</span>
                      <span className="text-xs text-slate-400">Click individual bits to flip values</span>
                    </div>

                    <div className="grid grid-cols-8 gap-2 text-center">
                      {[128, 64, 32, 16, 8, 4, 2, 1].map((weight, idx) => (
                        <div key={idx} className="space-y-1">
                          <span className="text-[10px] text-slate-400 font-mono">2^{7 - idx} ({weight})</span>
                          <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            aria-label={`Toggle bit ${7 - idx} with weight ${weight}`}
                            onClick={() => handleToggleBit(idx)}
                            className={`w-full py-4 rounded-xl text-lg font-black font-mono transition-all border ${
                              activeBits[idx]
                                ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-600/40'
                                : 'bg-slate-900 text-slate-500 border-slate-800 hover:border-slate-600'
                            }`}
                          >
                            {activeBits[idx] ? '1' : '0'}
                          </motion.button>
                        </div>
                      ))}
                    </div>

                    {/* Multi-Representation Converter Bar */}
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Binary (Base-2)</span>
                        <div className="text-lg font-black font-mono text-cyan-400">{calculatedBusValues.binStr}₂</div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Decimal (Base-10)</span>
                        <div className="text-lg font-black font-mono text-emerald-400">{calculatedBusValues.dec}₁₀</div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Octal (Base-8)</span>
                        <div className="text-lg font-black font-mono text-amber-400">{calculatedBusValues.octStr}₈</div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Hexadecimal (Base-16)</span>
                        <div className="text-lg font-black font-mono text-purple-400">0x{calculatedBusValues.hexStr}₁₆</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SVG 3: PORTS & CONNECTORS PINOUT DIAGRAM ─── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-5 space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">Select Computer Port</span>
                    {(
                      [
                        { id: 'hdmi', name: 'HDMI Port', desc: 'Digital Video + Multi-Channel Audio' },
                        { id: 'vga', name: 'VGA Port (15-Pin Blue)', desc: 'Analog Video Only' },
                        { id: 'usb', name: 'USB Type-A / Type-C', desc: 'Two-Way Universal Data & Power' },
                        { id: 'ethernet', name: 'RJ-45 Ethernet Port', desc: 'Wired Local Area Network (LAN)' },
                        { id: 'audio', name: '3.5mm Audio Jack', desc: 'Analog Audio In/Out' },
                      ] as const
                    ).map(port => (
                      <motion.button
                        key={port.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`Select ${port.name}`}
                        onClick={() => handleSelectPort(port.id)}
                        className={`w-full p-3 rounded-2xl text-left transition-all border ${
                          selectedPortId === port.id ? 'bg-cyan-950/80 border-cyan-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                        }`}
                      >
                        <div className="text-sm font-bold text-cyan-300">{port.name}</div>
                        <div className="text-xs text-slate-400">{port.desc}</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="md:col-span-7 p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-center space-y-4">
                    {/* SVG 3: Technical Port Form Factor Schematics */}
                    <svg viewBox="0 0 340 160" className="w-full max-w-md mx-auto select-none" role="img" aria-label="Port Form Factor and Pinout Diagram">
                      <rect x="5" y="5" width="330" height="150" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                      {selectedPortId === 'hdmi' && (
                        <g>
                          <path d="M 70 45 L 270 45 L 255 110 L 85 110 Z" fill="#1e293b" stroke="#06b6d4" strokeWidth="3" />
                          <rect x="90" y="55" width="160" height="40" rx="4" fill="#083344" />
                          <text x="170" y="80" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">19-PIN DIGITAL HDMI</text>
                          <text x="170" y="135" textAnchor="middle" fill="#a5f3fc" fontSize="10">✓ Digital Video + ✓ Digital Audio</text>
                        </g>
                      )}
                      {selectedPortId === 'vga' && (
                        <g>
                          <path d="M 60 45 L 280 45 L 260 110 L 80 110 Z" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="3" />
                          {[0, 1, 2].map(row =>
                            [0, 1, 2, 3, 4].map(col => (
                              <circle key={`${row}-${col}`} cx={95 + col * 35} cy={60 + row * 18} r="4" fill="#facc15" />
                            ))
                          )}
                          <text x="170" y="135" textAnchor="middle" fill="#93c5fd" fontSize="10">✓ 15-Pin Analog Video | ✗ NO AUDIO</text>
                        </g>
                      )}
                      {selectedPortId === 'usb' && (
                        <g>
                          <rect x="70" y="45" width="200" height="65" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="3" />
                          <rect x="90" y="55" width="160" height="20" fill="#334155" />
                          <circle cx="120" cy="95" r="4" fill="#10b981" />
                          <circle cx="155" cy="95" r="4" fill="#10b981" />
                          <circle cx="190" cy="95" r="4" fill="#10b981" />
                          <circle cx="225" cy="95" r="4" fill="#10b981" />
                          <text x="170" y="135" textAnchor="middle" fill="#6ee7b7" fontSize="10">Universal Serial Bus (4-Pin / Type-C 24-Pin)</text>
                        </g>
                      )}
                      {selectedPortId === 'ethernet' && (
                        <g>
                          <rect x="80" y="40" width="180" height="70" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="3" />
                          <path d="M 140 40 L 140 55 L 200 55 L 200 40 Z" fill="#451a03" />
                          {[0, 1, 2, 3, 4, 5, 6, 7].map(pin => (
                            <line key={pin} x1={105 + pin * 18} y1="75" x2={105 + pin * 18} y2="95" stroke="#fbbf24" strokeWidth="3" />
                          ))}
                          <text x="170" y="135" textAnchor="middle" fill="#fde68a" fontSize="10">RJ-45 8-Pin LAN Network Connector</text>
                        </g>
                      )}
                      {selectedPortId === 'audio' && (
                        <g>
                          <rect x="70" y="65" width="130" height="30" rx="4" fill="#1e293b" stroke="#ec4899" strokeWidth="2" />
                          <circle cx="240" cy="80" r="18" fill="#831843" stroke="#f472b6" strokeWidth="3" />
                          <circle cx="240" cy="80" r="8" fill="#000000" />
                          <text x="170" y="135" textAnchor="middle" fill="#fbcfe8" fontSize="10">3.5mm Stereo Audio Tip-Ring-Sleeve Jack</text>
                        </g>
                      )}
                    </svg>

                    <div className="p-3 bg-slate-900 rounded-xl text-xs space-y-1">
                      <div className="font-bold text-white">{selectedPortId.toUpperCase()} Details:</div>
                      <p className="text-slate-300">
                        {selectedPortId === 'hdmi' && 'Carries uncompressed digital video AND multichannel sound in one cable. Standard on modern GPUs.'}
                        {selectedPortId === 'vga' && 'Legacy analog 15-pin connector. Transmits RGB color channels only, requiring an extra audio cable for sound.'}
                        {selectedPortId === 'usb' && 'Bi-directional high-speed data & power interface for pen drives, keyboards, mice, and webcams.'}
                        {selectedPortId === 'ethernet' && 'Connects systems to Local Area Networks (LAN) and school broadband routers via twisted pair cables.'}
                        {selectedPortId === 'audio' && 'Transmits analog sound signals to external speakers or receives audio input from microphones.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SVG 4: CYBERSECURITY SHIELD & LIVE DEFENSE VISUALIZER ─── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  {/* SVG 4: Dynamic Firewall Shield Visualizer */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 500 160" className="w-full max-w-lg select-none" role="img" aria-label="Dynamic Antivirus Shield and Quarantine Chamber">
                      <rect x="10" y="10" width="480" height="140" rx="12" fill="#030712" stroke="#1e293b" strokeWidth="2" />
                      {/* Shield Icon */}
                      <path
                        d="M 120 30 L 170 45 L 170 95 C 170 125 120 140 120 140 C 120 140 70 125 70 95 L 70 45 Z"
                        fill={antivirusUpdateLevel >= 75 ? '#065f46' : antivirusUpdateLevel >= 40 ? '#854d0e' : '#9f1239'}
                        stroke={antivirusUpdateLevel >= 75 ? '#10b981' : antivirusUpdateLevel >= 40 ? '#f59e0b' : '#f43f5e'}
                        strokeWidth="3"
                      />
                      <text x="120" y="90" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="bold">
                        {antivirusUpdateLevel >= 85 ? '🛡️' : antivirusUpdateLevel >= 40 ? '⚠️' : '🚨'}
                      </text>
                      {/* Shield Strength Text */}
                      <text x="280" y="45" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="bold">
                        CYBERLAB DEFENSE ENGINE (LIVE UPDATES)
                      </text>
                      <text x="280" y="70" textAnchor="middle" fill={antivirusUpdateLevel >= 75 ? '#34d399' : '#f87171'} fontSize="11" fontWeight="bold">
                        Defensive Coverage: {antivirusUpdateLevel}% (Definitions: 2026 Ready)
                      </text>
                      {/* Dynamic Scan Ray */}
                      <rect x="200" y="85" width="250" height="12" rx="6" fill="#1e293b" />
                      <rect
                        x="200"
                        y="85"
                        width={`${(antivirusUpdateLevel / 100) * 250}`}
                        height="12"
                        rx="6"
                        fill={antivirusUpdateLevel >= 75 ? '#10b981' : antivirusUpdateLevel >= 40 ? '#f59e0b' : '#f43f5e'}
                      />
                      <text x="280" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">
                        {antivirusUpdateLevel >= 85 ? '✓ Polymorphic, Macro & Boot Sector Shield Active' : '✗ Outdated database: Zero-day polymorphic viruses can penetrate!'}
                      </text>
                    </svg>
                  </div>

                  {/* Real-time slider controlling the visualization */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Antivirus Signature Database Age</span>
                      <span className="text-xs font-bold text-emerald-400">{antivirusUpdateLevel}% Updated (2026 Definitions)</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={antivirusUpdateLevel}
                      aria-label="Antivirus Signature Database Update Slider"
                      onChange={e => handleAntivirusSlider(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>0% (Outdated 2021 Signatures)</span>
                      <span>50% (Standard 2024 Signatures)</span>
                      <span>100% (Real-Time Cloud 2026)</span>
                    </div>
                  </div>

                  {/* Threat Detection Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { name: 'Boot Sector Virus', target: 'Disk Master Boot Record', req: 30 },
                      { name: 'File Executable Virus', target: '.exe & .com program files', req: 50 },
                      { name: 'Macro Virus', target: 'Word / Excel VBA scripts', req: 70 },
                      { name: 'Polymorphic Virus', target: 'Mutating binary payload', req: 85 },
                    ].map((v, i) => {
                      const detected = antivirusUpdateLevel >= v.req;
                      return (
                        <div key={i} className={`p-4 rounded-2xl border transition-all ${detected ? 'bg-emerald-950/40 border-emerald-800/60' : 'bg-rose-950/40 border-rose-800/60'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-white">{v.name}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${detected ? 'bg-emerald-900 text-emerald-300' : 'bg-rose-900 text-rose-300'}`}>
                              {detected ? '✓ QUARANTINED' : '✗ INFECTION RISK'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">Target: {v.target}</p>
                          <div className="mt-2 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full ${detected ? 'bg-emerald-500' : 'bg-rose-500'}`}
                              animate={{ width: `${detected ? 100 : (antivirusUpdateLevel / v.req) * 100}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Footer */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous Lab Station"
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-sm disabled:opacity-40 hover:bg-slate-700"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs font-bold text-slate-400">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next Lab Station"
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-lg shadow-cyan-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Proceed to Free Sandbox"
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30"
              >
                Proceed to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Free Exploration Sandbox</span>
                <h3 className="text-xl font-black text-white">Full Hardware & Number Matrix Playground</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Start Diagnostic Challenges"
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold text-sm shadow-xl shadow-emerald-600/30"
              >
                Start Diagnostic Challenges 🎯 →
              </motion.button>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Experiment freely without timers or scoring. Flip bits, cut power, inspect ports, and observe hexadecimal bus outputs.
            </p>

            {/* Sandbox Bit Matrix */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-cyan-400 uppercase">Live 8-Bit Bus Controller</span>
              <div className="grid grid-cols-8 gap-2">
                {[128, 64, 32, 16, 8, 4, 2, 1].map((w, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Toggle Sandbox Bit ${7 - i}`}
                    onClick={() => handleToggleBit(i)}
                    className={`py-3 rounded-xl font-mono font-bold text-sm transition-all border ${
                      activeBits[i] ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}
                  >
                    {activeBits[i] ? '1' : '0'}
                  </motion.button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 text-center pt-2">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400">DECIMAL VALUE</span>
                  <div className="text-xl font-bold text-emerald-400 font-mono">{calculatedBusValues.dec}</div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400">OCTAL VALUE</span>
                  <div className="text-xl font-bold text-amber-400 font-mono">{calculatedBusValues.octStr}₈</div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400">HEXADECIMAL</span>
                  <div className="text-xl font-bold text-purple-400 font-mono">#{calculatedBusValues.hexStr}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: DIAGNOSTIC CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Difficulty Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400">
                Question <strong className="text-white">{currentChallenge + 1}</strong> of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-xs px-2.5 py-1 rounded-full font-black uppercase tracking-wider border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                    : difficulty === 'advanced'
                    ? 'bg-purple-950 text-purple-400 border-purple-800'
                    : 'bg-cyan-950 text-cyan-400 border-cyan-800'
                }`}
              >
                {difficulty} TIER
              </motion.span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                NEP 2020: {challenge.competencyLevel.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Accuracy:</span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {scoreBreakdown.total > 0 ? Math.round((scoreBreakdown.correct / scoreBreakdown.total) * 100) : 100}%
              </span>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Challenge Question Card */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-relaxed flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                {currentChallenge + 1}
              </span>
              <span>{challenge.question}</span>
            </h3>

            {/* MCQ Option Rendering */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={e => handleAnswer(i, e)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-2xl text-sm font-medium transition-all border ${
                      wrongFlash
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-200 hover:border-cyan-500/40'
                    }`}
                  >
                    <span className="font-bold text-cyan-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                    {showExplanation && i === challenge.correctIndex && <span className="ml-2 text-emerald-400 font-bold">✓ (Correct)</span>}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag Label Motherboard Architecture */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 w-full mb-1">Draggable Components:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Drag item: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-cyan-700 hover:bg-cyan-600 text-white rounded-xl text-xs font-bold cursor-grab shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'slot_cpu', name: 'Center Square Socket' },
                    { id: 'slot_ram', name: 'Vertical DIMM Sockets' },
                    { id: 'slot_rom', name: 'Square Flash BIOS Chip' },
                    { id: 'slot_gpu', name: 'Horizontal PCIe Slot' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      aria-label={`Target area: ${target.name}`}
                      className={`p-4 rounded-2xl border-2 border-dashed text-center min-h-[100px] flex flex-col items-center justify-center transition-all ${
                        droppedLabels[target.id] ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">{target.name}</span>
                      <div className="text-xs font-bold">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop Label Here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Verify Motherboard Layout"
                  onClick={e => handleAnswer(droppedLabels, e)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-cyan-600/30"
                >
                  Verify Motherboard Layout ✓
                </motion.button>
              </div>
            )}

            {/* Drag Sort Sequence */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400">Drag to arrange chronological sequence:</span>
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
                      aria-label={`Sortable item ${displayIdx + 1}: ${item}`}
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-medium text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-800 text-cyan-400 flex items-center justify-center font-bold text-xs">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Check Sequence Order"
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-cyan-600/30"
                >
                  Check Sequence ✓
                </motion.button>
              </div>
            )}

            {/* Numeric Input */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 max-w-sm">
                  <input
                    type="number"
                    value={numericInput}
                    aria-label="Calculated numeric value input"
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white font-mono text-base focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Verify Calculated Number"
                  onClick={e => handleAnswer(numericInput, e)}
                  disabled={showExplanation || !numericInput}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-cyan-600/30"
                >
                  Verify Number ✓
                </motion.button>
              </div>
            )}

            {/* Construct Parts */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400">{challenge.validationHint}</span>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => {
                    const selected = constructParts.includes(part);
                    return (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Toggle part: ${part}`}
                        onClick={() => handleConstructTogglePart(part)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                          selected ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {selected ? '✓ ' : '+ '} {part}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-cyan-300 min-h-[50px] flex items-center">
                  {constructParts.length > 0 ? constructParts.join(' ') : <span className="text-slate-600">Click elements above to assemble construction...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Check Assembled Structure"
                  onClick={e => handleAnswer(constructParts.join(' '), e)}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-cyan-600/30"
                >
                  Check Assembly ✓
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation Reveal */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 rounded-2xl bg-cyan-950/40 border border-cyan-800/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Step-by-Step Logic Walkthrough</span>
                  <span className="text-[10px] text-cyan-400">Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs md:text-sm text-slate-200 leading-relaxed">
                      <strong className="text-cyan-400 mr-1.5">{i + 1}.</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label="Show next logic step"
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Next Challenge or Finish"
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission 🏆 →' : 'Next Diagnostic Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION, REFLECTION & AUDIT REPORT ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-950/60 via-slate-900 to-emerald-950/60 border border-cyan-800/60 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl font-black mx-auto">
              🏆
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">Chief Systems Engineer Certification</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have completed the full ICSE Class 7 internal hardware diagnostics, binary-hex arithmetic conversions, and malware defense architecture.
            </p>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Final Score</span>
                <div className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Mastery Tier</span>
                <div className="text-2xl font-black text-cyan-400 uppercase">{masteryLevel}</div>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK BANNER (Required Personalised Message) */}
          <div className={`p-5 rounded-2xl border text-xs md:text-sm leading-relaxed ${
            errors === 0
              ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
              : errors <= 3
              ? 'bg-cyan-950/50 border-cyan-500/50 text-cyan-200'
              : errors <= 7
              ? 'bg-amber-950/50 border-amber-500/50 text-amber-200'
              : 'bg-rose-950/50 border-rose-500/50 text-rose-200'
          }`}>
            <div className="font-bold text-base mb-1">{motivational.badge}</div>
            <p>{motivational.message}</p>
          </div>

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider">
              <span>💭 Reflect & Consolidate</span>
            </div>
            <h3 className="text-base font-bold text-white">Engineering Thought Journal</h3>

            <div className="space-y-4 pt-1">
              {/* Question 1 */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflection1}
                  onChange={e => setReflection1(e.target.value)}
                  placeholder="e.g. How polymorphic viruses change their signatures, or how RAM is instantly wiped when power is cut..."
                  rows={2}
                  aria-label="Reflection on the most surprising thing learned"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-cyan-200 focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>

              {/* Question 2 */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflection2}
                  onChange={e => setReflection2(e.target.value)}
                  placeholder="e.g. The motherboard is the city's road network, CPU is the brain, RAM is a temporary whiteboard..."
                  rows={2}
                  aria-label="Reflection on explaining concepts to a friend"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-cyan-200 focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>

              {/* Question 3 */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflection3}
                  onChange={e => setReflection3(e.target.value)}
                  placeholder="e.g. Upgrading my computer GPU for video editing, configuring antivirus updates, or connecting projectors via HDMI..."
                  rows={2}
                  aria-label="Reflection on real life applications"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-cyan-200 focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>
            </div>
          </div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 rounded-3xl bg-rose-950/30 border border-rose-800/40 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">Targeted Misconception Remediation</h3>
              <div className="space-y-3">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-4 bg-slate-950/80 rounded-2xl border border-rose-900/30 space-y-1">
                      <div className="text-xs text-rose-300 font-bold">❌ Misconception: {m.misconception}</div>
                      <div className="text-xs text-emerald-300">✓ Scientific Correction: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-cyan-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((s, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">{i + 1}.</span> {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Spaced Repetition Visibility */}
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-300/90">
            ⏰ <strong>Spaced Review Schedule:</strong> Based on your SM-2 response history, this topic will be scheduled for active recall in{' '}
            <strong>{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to cement neural retention.
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Hardware & Security Mission Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C7_ComputerScienceInternalHardwareMotherboardSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 12 COMPUTER SCIENCE NODE IDS ───
const NODE_C12_CS_041 = 'c12_cs_041'; // Network security & Cryptography, PKI, Digital Signatures
const NODE_C12_CS_042 = 'c12_cs_042'; // Network Threats & Defenses, Firewalls, IDS, DDoS
const NODE_C12_CS_043 = 'c12_cs_043'; // Web Development Advanced, HTML5, CSS3, JS Frameworks
const NODE_C12_CS_044 = 'c12_cs_044'; // Server-Side Programming, PHP, JSP, REST APIs, JSON
const NODE_C12_CS_045 = 'c12_cs_045'; // Cloud Computing, Virtualization, Containers, DevOps
const NODE_C12_CS_046 = 'c12_cs_046'; // AI & Machine Learning, Neural Networks, Ethics
const NODE_C12_CS_047 = 'c12_cs_047'; // Data Science & Big Data, 3Vs, Hadoop, MapReduce
const NODE_C12_CS_048 = 'c12_cs_048'; // IoT & Embedded Systems, Arduino, Raspberry Pi, Sensors
const NODE_C12_CS_049 = 'c12_cs_049'; // Blockchain & Cryptocurrency, Distributed Ledger, Smart Contracts
const NODE_C12_CS_050 = 'c12_cs_050'; // Cyber Law & IT Act 2000, Data Protection, IPR

const ALL_NODE_IDS = [
  NODE_C12_CS_041,
  NODE_C12_CS_042,
  NODE_C12_CS_043,
  NODE_C12_CS_044,
  NODE_C12_CS_045,
  NODE_C12_CS_046,
  NODE_C12_CS_047,
  NODE_C12_CS_048,
  NODE_C12_CS_049,
  NODE_C12_CS_050,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Operation BharatShield: Securing National Cyber Infrastructure',
  intro: 'A critical national infrastructure network handling railway logistics, digital identity (Aadhaar), and UPI transactions across Bengaluru, Mumbai, and Delhi is undergoing a high-stakes security audit and architectural overhaul.',
  context: 'As the Chief Cyber Architect and Systems Engineer, you must inspect cryptographic key exchanges, configure layered firewall defenses, optimize cloud microservices, and deploy AI anomaly detection while adhering to the Indian IT Act 2000.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Alice in Bengaluru wants to send a 5 GB sensitive encrypted database to Bob in Delhi across the public internet. Which cryptographic approach avoids the key-distribution trap without grinding the CPU to a halt?',
  options: [
    'Pure RSA 4096-bit asymmetric encryption on the whole 5 GB file',
    'Pure AES-256 symmetric encryption, sending the secret key in an open email',
    'Hybrid Cryptography: Encrypt file with fast AES-256, encrypt the AES key with Bob’s public RSA key',
    'Double hashing the 5 GB file with SHA-256 and sending only the hash',
  ],
  correctIndex: 2,
  hintAfter: 'RSA is too computationally slow for gigabytes of data, but AES has a secret key sharing dilemma. Combining both gives speed AND secure key distribution!',
};

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an attacker modifies 1 single character in an older block of a blockchain, what happens to the subsequent block hashes?',
    options: [
      'Only that single block shows an error; other blocks stay completely valid',
      'All subsequent blocks break because their stored previous-hash pointers no longer match the recalculated hash',
      'The blockchain automatically accepts the modified block and updates all banks',
      'The entire internet disconnects',
    ],
    correctIndex: 1,
    verifyInstruction: 'Go to Lab 5 and click the "Tamper Data" button to observe the cryptographic chain reaction.',
    nodeId: NODE_C12_CS_049,
  },
  {
    question: 'Predict: What happens to total memory consumption when scaling 10 microservices as Docker containers versus 10 full Virtual Machines?',
    options: [
      'Containers consume significantly less memory because they share the host OS kernel instead of booting 10 separate guest operating systems',
      'Containers consume 10x more memory than VMs due to container virtualization overhead',
      'Both VMs and Containers consume the exact same amount of physical RAM down to the byte',
      'Containers require zero memory because they run purely in the network cable',
    ],
    correctIndex: 0,
    verifyInstruction: 'Go to Lab 3 and drag the Workload Instances slider to observe memory allocation differences.',
    nodeId: NODE_C12_CS_045,
  },
];

// ─── OBSERVATION QUESTIONS (Brilliant.org "What do you notice?" Pattern) ───
const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_01',
    question: 'What do you notice when you increase the Secret Key Shift in Lab 1 (Symmetric AES/Caesar mode)?',
    options: [
      'Every letter in the ciphertext shifts forward cyclically according to the key value',
      'The message length doubles each time the slider moves',
      'The letters turn into numbers and then completely disappear',
      'The encryption key resets automatically to zero',
    ],
    observableOptions: [
      'Every letter in the ciphertext shifts forward cyclically according to the key value',
      'The message length doubles each time the slider moves',
      'The letters turn into numbers and then completely disappear',
      'The encryption key resets automatically to zero',
    ],
    correctIndex: 0,
    explanation: 'In symmetric substitution/shift mechanisms, each character code is incremented modulo alphabet size by the key offset value.',
  },
  {
    id: 'obs_02',
    question: 'What do you notice in the Artificial Neuron in Lab 4 when the weighted sum Σ is a large positive number versus a negative number?',
    options: [
      'Positive sums push the Sigmoid σ(z) output close to 1.0, while negative sums push it close to 0.0',
      'The Sigmoid output always remains exactly 0.5 regardless of weights and bias',
      'Negative sums cause the neuron output to produce negative infinite values',
      'The neuron output oscillates randomly between -100 and +100',
    ],
    observableOptions: [
      'Positive sums push the Sigmoid σ(z) output close to 1.0, while negative sums push it close to 0.0',
      'The Sigmoid output always remains exactly 0.5 regardless of weights and bias',
      'Negative sums cause the neuron output to produce negative infinite values',
      'The neuron output oscillates randomly between -100 and +100',
    ],
    correctIndex: 0,
    explanation: 'The Sigmoid activation function maps any real number into the range (0, 1), acting as a smooth mathematical activation switch.',
  },
];

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
  // 1. Foundation - Cryptography Basics (Recall)
  {
    id: 'ch_sec_001',
    nodeId: NODE_C12_CS_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In asymmetric public-key cryptography (like RSA), which key must the recipient use to decrypt a confidential message sent to them?',
    options: [
      'The sender’s public key',
      'The recipient’s private key',
      'The sender’s private key',
      'The Certificate Authority’s root key',
    ],
    correctIndex: 1,
    explanation: 'In asymmetric encryption for confidentiality, the sender encrypts using the recipient’s public key, and only the recipient’s matching private key can decrypt it.',
    hints: [
      'Public keys lock messages; only the corresponding private key unlocks them.',
      'Anyone can encrypt with the public key, but only one person holds the private secret.',
      'The recipient must use their own private key to read the ciphertext.',
    ],
    misconceptionIndex: 2,
  },
  // 2. Foundation - Digital Signature Flow (Understanding)
  {
    id: 'ch_sec_002',
    nodeId: NODE_C12_CS_041,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of creating and verifying a digital signature in the correct order:',
    sortItems: [
      'Sender computes cryptographic hash of original document',
      'Sender encrypts hash using sender’s PRIVATE key to create signature',
      'Recipient decrypts signature using sender’s PUBLIC key to get hash A',
      'Recipient computes hash B of received document and checks if hash A === hash B',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Digital signatures hash the document first, encrypt the hash with the sender’s private key (signing), and verify with the sender’s public key. If the decrypted hash matches the freshly calculated hash, authenticity, integrity, and non-repudiation are proven.',
    hints: [
      'Hashing always happens before private-key encryption to summarize data.',
      'Signing uses the sender’s private key so only the sender could have created it.',
      'Verification uses the sender’s public key to decrypt the hash and compare it with the document’s new hash.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation - Network Threats Identification (Recall)
  {
    id: 'ch_sec_003',
    nodeId: NODE_C12_CS_042,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which malware type replicates independently across networks through security holes without requiring any user action or host file execution?',
    options: [
      'Macro Virus',
      'Standalone Worm',
      'Trojan Horse',
      'Adware Spyware',
    ],
    correctIndex: 1,
    explanation: 'A computer worm is self-contained and self-replicating; it travels over network vulnerabilities without needing a host program or user execution, unlike a virus which requires a host file.',
    hints: [
      'Viruses require a host file and user execution to spread.',
      'Trojans pretend to be useful software to open a backdoor.',
      'A worm spreads autonomously through network connections.',
    ],
    misconceptionIndex: 1,
  },
  // 4. Standard - Web Dev Semantic Layout (Application)
  {
    id: 'ch_sec_004',
    nodeId: NODE_C12_CS_043,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Map the correct HTML5 semantic elements to their architectural roles for a national portal homepage:',
    dragItems: [
      { label: '<header>', targetId: 'slot_top' },
      { label: '<nav>', targetId: 'slot_links' },
      { label: '<main>', targetId: 'slot_center' },
      { label: '<aside>', targetId: 'slot_side' },
      { label: '<footer>', targetId: 'slot_bottom' },
    ],
    correctMapping: {
      slot_top: '<header>',
      slot_links: '<nav>',
      slot_center: '<main>',
      slot_side: '<aside>',
      slot_bottom: '<footer>',
    },
    explanation: 'HTML5 semantic tags provide structural clarity: <header> for page banners/branding, <nav> for links, <main> for core dominant content, <aside> for sidebar notes, and <footer> for bottom legal/contact info.',
    hints: [
      'The top banner belongs in <header> and primary links in <nav>.',
      'The central dominant view belongs in <main>.',
      'Sidebar tangential info goes in <aside> and copyright at the bottom in <footer>.',
    ],
  },
  // 5. Standard - REST API HTTP Methods (Application)
  {
    id: 'ch_sec_005',
    nodeId: NODE_C12_CS_044,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In an IRCTC train reservation REST API, an agency needs to completely replace/update a passenger’s seat preference at URI `/api/v1/tickets/PNR98765`. Which HTTP method must be executed?',
    options: [
      'GET',
      'POST',
      'PUT',
      'DELETE',
    ],
    correctIndex: 2,
    explanation: 'PUT is the idempotent HTTP method designed for updating or replacing an existing resource identified by its URI. POST is for creating new resources, GET is for reading, and DELETE is for removing.',
    hints: [
      'GET only reads data without modifying server state.',
      'POST creates a brand new ticket resource.',
      'PUT replaces/updates existing resource attributes at a specific URI.',
    ],
    misconceptionIndex: 4,
  },
  // 6. Standard - Cloud: Containers vs VMs (Analysis)
  {
    id: 'ch_sec_006',
    nodeId: NODE_C12_CS_045,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why do Docker containers boot in milliseconds and require megabytes of memory compared to traditional Type-1 Virtual Machines taking gigabytes and minutes?',
    options: [
      'Containers bypass CPU execution entirely using quantum registers',
      'Containers share the host operating system kernel and isolate only user-space binaries and libraries',
      'Containers convert all code to static HTML files stored in RAM',
      'Containers run directly inside the GPU firmware without an operating system',
    ],
    correctIndex: 1,
    explanation: 'Docker containers achieve extreme efficiency and rapid boot times by sharing the underlying host OS kernel, packaging only the application code and dependencies, whereas VMs require a full guest OS on top of a hypervisor.',
    hints: [
      'Think about whether each container needs its own full operating system copy.',
      'VMs boot a complete guest OS kernel; containers do not.',
      'Containers isolate at the process level while sharing the host kernel.',
    ],
    misconceptionIndex: 3,
  },
  // 7. Standard - Big Data 3Vs in Indian Context (Application)
  {
    id: 'ch_sec_007',
    nodeId: NODE_C12_CS_047,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Match the Big Data "V" characteristics to their real-world Indian operational systems:',
    dragItems: [
      { label: 'Volume (Petabytes)', targetId: 'slot_uidai' },
      { label: 'Velocity (Microseconds)', targetId: 'slot_upi' },
      { label: 'Variety (Formats)', targetId: 'slot_rail' },
    ],
    correctMapping: {
      slot_uidai: 'Volume (Petabytes)',
      slot_upi: 'Velocity (Microseconds)',
      slot_rail: 'Variety (Formats)',
    },
    explanation: 'UIDAI Aadhaar exemplifies massive Volume with 1.4B biometric/demographic profiles. UPI handles extreme Velocity with thousands of financial transactions per second. IRCTC ticketing processes multi-format Variety (structured SQL tables, JSON API streams, biometric logs, and customer reviews).',
    hints: [
      'Aadhaar stores over a billion biometric records — sheer scale (Volume).',
      'UPI processes rapid real-time payment bursts across banks (Velocity).',
      'Mixed format logs (images, tables, JSON) represent Variety.',
    ],
  },
  // 8. Standard - AI: Neural Network Forward Flow (Understanding)
  {
    id: 'ch_sec_008',
    nodeId: NODE_C12_CS_046,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Construct the computational sequence of an artificial neuron receiving sensor inputs:',
    availableParts: ['Input Vectors (x)', 'Multiply by Weights (w)', 'Sum Weighted Inputs (Σ w·x + b)', 'Apply Non-linear Activation f(z)', 'Output Signal (y)'],
    targetState: 'Input Vectors (x) Multiply by Weights (w) Sum Weighted Inputs (Σ w·x + b) Apply Non-linear Activation f(z) Output Signal (y)',
    validationHint: 'Input → Weight multiplication → Sum with bias → Activation function → Output',
    explanation: 'An artificial neuron takes inputs (x), scales each by its learnable weight (w), sums them together with a bias term (b), passes the scalar through an activation function (like Sigmoid or ReLU), and emits output (y).',
    hints: [
      'Start with raw input vectors (x).',
      'Inputs get scaled by weights (w) and summed.',
      'The threshold/activation function is applied right before emitting the output signal.',
    ],
  },
  // 9. Standard - IoT: Hardware Architecture (Distinguish)
  {
    id: 'ch_sec_009',
    nodeId: NODE_C12_CS_048,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A smart agriculture hub in Punjab needs to run a local computer vision model to detect crop disease from camera feeds while hosting a local web dashboard. Which board is technically appropriate?',
    options: [
      'Arduino Uno (ATmega328P 8-bit microcontroller @ 16 MHz, 2 KB SRAM)',
      'Raspberry Pi 4 (Quad-core ARM 64-bit SoC @ 1.5 GHz, 4 GB RAM running Linux)',
      'A passive RFID tag without any processor',
      'A mechanical relay switch connected to a 9V battery',
    ],
    correctIndex: 1,
    explanation: 'Raspberry Pi is a single-board mini-computer with a full Linux OS, ample RAM, and processor power capable of running computer vision and web servers. Arduino is a lightweight microcontroller suited for simple real-time sensor reading and motor pulsing.',
    hints: [
      'Microcontrollers with 2KB RAM cannot run full Linux operating systems or image recognition models.',
      'Look for the board that supports a full operating system and multi-gigabyte RAM.',
      'Raspberry Pi has the compute power required for camera feeds and web servers.',
    ],
  },
  // 10. Advanced - Cryptographic Key Space Calculation (Numeric / Analysis)
  {
    id: 'ch_sec_010',
    nodeId: NODE_C12_CS_041,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Legacy DES uses a 56-bit key ($2^{56}$ combinations). AES-128 uses a 128-bit key ($2^{128}$). By what power-of-2 factor is the AES-128 key space larger than DES? (Enter the exponent difference, i.e., $128 - 56$):',
    correctAnswer: 72,
    tolerance: 0,
    unit: 'powers of 2',
    explanation: 'The AES-128 key space is $2^{128} / 2^{56} = 2^{72}$ times larger than DES. That represents over $4.7 \\times 10^{21}$ times more keys, making brute-force attacks against AES computationally infeasible with classical supercomputers.',
    hints: [
      'Recall laws of exponents: $2^a / 2^b = 2^{(a - b)}$.',
      'Compute $128 - 56$.',
      'The answer is exactly 72 powers of 2.',
    ],
  },
  // 11. Advanced - Blockchain Hash Pointer Tampering (Evaluation)
  {
    id: 'ch_sec_011',
    nodeId: NODE_C12_CS_049,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An insider attempts to alter a land title transaction inside Block #4 on a 10-block public blockchain. What immediate consequence cascades across the network?',
    options: [
      'The block size expands and crashes the server hard disk',
      'Block #4’s cryptographic hash changes completely, invalidating the previous-hash pointer of Block #5 and all subsequent blocks across all peer nodes',
      'The consensus algorithm automatically rewrites the constitution of the country',
      'Only the affected user’s monitor screen flickers off',
    ],
    correctIndex: 1,
    explanation: 'Because each block header contains the hash of the preceding block (hash pointer), modifying data in Block #4 changes its hash value (avalanche effect). Block #5’s stored previous-hash will no longer match, breaking the cryptographic chain on every node holding a copy of the ledger.',
    hints: [
      'Cryptographic hash functions produce a totally different output upon even 1 bit of change.',
      'Block #5 points to the old hash of Block #4.',
      'The mismatch immediately exposes tampering across distributed nodes.',
    ],
  },
  // 12. Advanced - Cyber Law IT Act 2000 (Application / Evaluation)
  {
    id: 'ch_sec_012',
    nodeId: NODE_C12_CS_050,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A rogue developer in Hyderabad copies copyrighted software code, creates a fake banking login portal (phishing), and injects ransomware into a hospital network. Under the Indian IT Act 2000 and IPR law, which legal classification is correct?',
    options: [
      'Phishing is an intellectual property dispute; source code theft is purely an ethical recommendation',
      'Source code theft infringes Copyright law; Phishing constitutes identity theft/fraud (Sec 66D); Ransomware/Unauthorised access constitutes Hacking/Malware (Sec 43/66)',
      'All three actions are completely legal if committed using open-source tools',
      'The IT Act 2000 only governs physical postal letters and television broadcasts',
    ],
    correctIndex: 1,
    explanation: 'Software source code is protected under Copyright law. Phishing (impersonation to cheat) is punishable under IT Act Section 66D, and injecting ransomware/unauthorized access is penalized under Sections 43 and 66.',
    hints: [
      'Computer programs are treated as literary works under Copyright law.',
      'Phishing involves fraud by impersonation.',
      'Malicious network disruption and hacking are cyber crimes with penal imprisonment.',
    ],
  },
  // 13. Foundation - Cloud Service Models (Recall)
  {
    id: 'ch_sec_013',
    nodeId: NODE_C12_CS_045,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which cloud computing service model provides customers with virtual machines, raw block storage, and virtual networks, leaving OS and application management to the user?',
    options: [
      'Software as a Service (SaaS)',
      'Platform as a Service (PaaS)',
      'Infrastructure as a Service (IaaS)',
      'Function as a Service (FaaS)',
    ],
    correctIndex: 2,
    explanation: 'Infrastructure as a Service (IaaS), like AWS EC2 or Azure VMs, provides raw compute, storage, and networking hardware abstraction, requiring the customer to install, patch, and manage the OS and runtime.',
    hints: [
      'SaaS provides ready-to-use software like Google Workspace.',
      'PaaS provides managed application runtimes.',
      'IaaS provides fundamental compute infrastructure.',
    ],
  },
  // 14. Standard - MapReduce Word Count (Analysis)
  {
    id: 'ch_sec_014',
    nodeId: NODE_C12_CS_047,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'During a Hadoop MapReduce job analyzing 10 TB of Indian census records, what does the "Reduce" phase specifically execute?',
    options: [
      'It parses raw text files and emits (Key, 1) tuples for each word',
      'It collects all intermediate values sharing the same key and aggregates/sums them into a final result',
      'It deletes bad sectors from physical server hard drives',
      'It translates Java bytecode into English text',
    ],
    correctIndex: 1,
    explanation: 'In the MapReduce paradigm, Mapper nodes output intermediate key-value pairs `(k, v)`. The Shuffle & Sort stage groups identical keys, and Reducer nodes aggregate the values for each unique key to produce the consolidated summary.',
    hints: [
      'Mappers transform input data into intermediate key-value pairs.',
      'Reducers group by key and perform statistical aggregation.',
      'Aggregation by key is the fundamental purpose of the Reduce step.',
    ],
  },
  // 15. Advanced - IoT Sensor vs Actuator Feedback Loop (Creativity / Application)
  {
    id: 'ch_sec_015',
    nodeId: NODE_C12_CS_048,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Arrange the closed-loop IoT cyber-physical cycle for an automated cold-storage vaccination facility:',
    sortItems: [
      'Digital DHT22 Sensor reads ambient temperature exceeding 6°C threshold',
      'Microcontroller (ESP32/Arduino) samples reading and executes control logic',
      'Relay Actuator energizes cooling compressor motor to lower temperature',
      'Wi-Fi module publishes telemetry packet to cloud dashboard for medical monitoring',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The IoT closed loop starts with physical Sensing (transducer), followed by Processing (microcontroller decision), Actuation (physical power relay switching), and Network Telemetry (cloud monitoring).',
    hints: [
      'First, the physical world parameter must be measured (Sensor).',
      'Second, the processor analyzes the sensor data.',
      'Third, the actuator acts on the physical environment.',
      'Fourth, status telemetry is transmitted to the cloud.',
    ],
  },
  // 16. Foundation - Machine Learning Paradigms (Recall)
  {
    id: 'ch_sec_016',
    nodeId: NODE_C12_CS_046,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Training a spam filter using a dataset of 50,000 emails where each email is already marked as "Spam" or "Not Spam" by human experts is an example of:',
    options: [
      'Unsupervised Clustering',
      'Supervised Learning',
      'Reinforcement Learning with game rewards',
      'Genetic Mutation Computing',
    ],
    correctIndex: 1,
    explanation: 'Supervised learning uses labelled training datasets where each input vector is explicitly paired with the known target output or ground truth class label.',
    hints: [
      'Unsupervised learning works on unlabelled raw data.',
      'Reinforcement learning learns via trial-and-error rewards.',
      'Labelled input-output pairs define supervised learning.',
    ],
  },
  // 17. Standard - Smart Contract Properties (Understanding)
  {
    id: 'ch_sec_017',
    nodeId: NODE_C12_CS_049,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which statement accurately describes a blockchain Smart Contract deployed on Ethereum?',
    options: [
      'A paper contract signed with a blue fountain pen and scanned as a PDF',
      'Self-executing program code stored immutably on the distributed ledger that runs automatically when predetermined conditions are met',
      'An encrypted email sent between two lawyers',
      'A proprietary database stored solely inside a bank’s private vault',
    ],
    correctIndex: 1,
    explanation: 'Smart contracts are immutable, decentralized programs deployed onto a blockchain. Once triggered by a transaction meeting predefined criteria, they execute autonomously without intermediaries.',
    hints: [
      'Smart contracts are code, not scanned paper documents.',
      'They execute deterministically and autonomously on the blockchain.',
      'Decentralized execution eliminates reliance on manual intermediaries.',
    ],
  },
  // 18. Advanced - Defense in Depth Layered Security (Evaluation)
  {
    id: 'ch_sec_018',
    nodeId: NODE_C12_CS_042,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A banking server in Mumbai has a state-of-the-art perimeter firewall configured. Why must it ALSO deploy host-based Intrusion Detection (IDS) and updated Antivirus (Defence in Depth)?',
    options: [
      'Because firewalls only inspect packet headers/ports and cannot detect malicious payloads hidden inside permitted HTTPS traffic or malware introduced via infected USB drives',
      'Because firewalls shut down every night at 8:00 PM for maintenance',
      'Because antivirus software replaces the need for TCP/IP routing tables',
      'Because the Indian IT Act bans firewalls from operating independently',
    ],
    correctIndex: 0,
    explanation: 'Perimeter firewalls filter traffic based on IP addresses, protocols, and port rules, but legitimate open ports (e.g., port 443 HTTPS) can carry encrypted SQL injection attacks, phishing malware, or internal insider threats. Multi-layered defense-in-depth ensures that when one barrier is bypassed, other detection systems intercept the attack.',
    hints: [
      'Firewalls permit allowed ports like 443 (HTTPS) even if malicious payloads travel through them.',
      'Insider threats or infected physical media bypass perimeter firewalls entirely.',
      'Defence in Depth provides redundant, complementary protection layers.',
    ],
  },
  // 19. Foundation - CSS3 Flexbox vs Grid (Understanding)
  {
    id: 'ch_sec_019',
    nodeId: NODE_C12_CS_043,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When designing a responsive web layout, what is the core architectural difference between CSS Flexbox and CSS Grid?',
    options: [
      'Flexbox is for 1-dimensional layouts (row OR column); CSS Grid is for 2-dimensional layouts (rows AND columns simultaneously)',
      'Flexbox works only on mobile phones; CSS Grid works only on desktop computers',
      'Flexbox is a JavaScript database; CSS Grid is a server-side compiler',
      'Flexbox requires Java servlets to render',
    ],
    correctIndex: 0,
    explanation: 'Flexbox is inherently one-dimensional, aligning items along a single main axis (row or column). CSS Grid is a two-dimensional layout system, enabling simultaneous control over rows and columns.',
    hints: [
      'Think about 1D versus 2D layout dimensions.',
      'Flexbox aligns along one axis at a time.',
      'Grid arranges items across rows and columns together.',
    ],
  },
  // 20. Standard - Server-Side Scripting vs Client-Side (Analysis)
  {
    id: 'ch_sec_020',
    nodeId: NODE_C12_CS_044,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why can database credential verification and transaction commits NOT be safely performed via client-side JavaScript in a user’s browser?',
    options: [
      'Browsers lack the electrical voltage to process numbers larger than 100',
      'Client-side code and variables can be inspected, paused, and manipulated by the user in browser developer tools, exposing DB credentials and business logic',
      'JavaScript is only compatible with Apple Mac computers',
      'The internet protocol forbids sending text strings from web browsers',
    ],
    correctIndex: 1,
    explanation: 'Client-side code executes in an untrusted environment where the user can view source code, tamper with variables, and bypass validation using developer consoles. Secure database transactions and business rules must execute on protected web servers (PHP, JSP, Java Servlets).',
    hints: [
      'Who controls the execution environment of the client browser?',
      'Can a user open developer tools to view client-side code and API keys?',
      'The server is the trusted environment for sensitive database operations.',
    ],
  },
  // 21. Advanced - AI Ethics: Bias & Accountability (Evaluation)
  {
    id: 'ch_sec_021',
    nodeId: NODE_C12_CS_046,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An automated AI recruitment system trained on 10 years of historical tech hiring data consistently assigns lower scores to female applicants. What is the fundamental cause and appropriate mitigation?',
    options: [
      'The computer processor is overheating; replace the cooling fan',
      'Historical training data reflects human biases and historical under-representation; the dataset must be audited, balanced, debiased, and monitored for fairness',
      'Women do not know how to type on computer keyboards',
      'AI neural networks cannot process English resumes',
    ],
    correctIndex: 1,
    explanation: 'Machine learning models faithfully learn patterns from whatever historical data they are fed. If historical decisions contained bias or under-representation, the model automates and amplifies that bias. Ethical AI requires rigorous dataset curation, bias auditing, and human oversight.',
    hints: [
      'The model learns from historical data patterns.',
      'If past hiring favored one demographic, the algorithm treats that correlation as a feature.',
      'Dataset auditing and fairness constraints are mandatory mitigations.',
    ],
  },
  // 22. Advanced - AWS vs Azure Cloud Mapping (Application)
  {
    id: 'ch_sec_022',
    nodeId: NODE_C12_CS_045,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Map the equivalent core cloud services between Amazon Web Services (AWS) and Microsoft Azure:',
    dragItems: [
      { label: 'AWS EC2', targetId: 'slot_vm' },
      { label: 'AWS S3', targetId: 'slot_storage' },
      { label: 'AWS RDS', targetId: 'slot_db' },
      { label: 'AWS Lambda', targetId: 'slot_serverless' },
    ],
    correctMapping: {
      slot_vm: 'AWS EC2',
      slot_storage: 'AWS S3',
      slot_db: 'AWS RDS',
      slot_serverless: 'AWS Lambda',
    },
    explanation: 'AWS EC2 pairs with Azure Virtual Machines (Compute), AWS S3 with Azure Blob Storage (Object Storage), AWS RDS with Azure SQL Database (Managed Relational DB), and AWS Lambda with Azure Functions (Serverless Compute).',
    hints: [
      'EC2 provides resizable virtual compute instances.',
      'S3 is simple object storage for files and media.',
      'RDS is managed relational database service.',
      'Lambda executes code in response to events without managing servers.',
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
  nodeId: NODE_C12_CS_041,
  title: 'Network Security, Cryptography & Advanced CS Systems',
  definition: 'Comprehensive mastery of cryptography (symmetric AES, asymmetric RSA, digital signatures, PKI), network threats (firewalls, IDS, malware, DDoS), advanced web architectures, server-side APIs, cloud infrastructure, AI neural networks, big data MapReduce, IoT embedded controllers, blockchain ledgers, and Indian Cyber Law under IT Act 2000.',
  eli5: 'Think of digital security like a fortified bank: Cryptography is unbreakable secret codes, firewalls are the gate security guards, cloud containers are standardized shipping boxes, AI is a smart brain that learns from experience, blockchain is a public ledger notebook that cannot be erased, and the IT Act is the cyber law book.',
  misconceptions: [
    {
      misconception: 'A digital signature is simply a scanned PNG picture of a handwritten signature.',
      correction: 'A digital signature is a mathematical cryptographic mechanism: a hash of the document encrypted with the sender’s private key, verified with their public key to guarantee authentication, integrity, and non-repudiation.',
    },
    {
      misconception: 'Viruses and worms are identical forms of malware.',
      correction: 'A virus requires a host program or file and user execution to spread, whereas a worm is autonomous and replicates across networks through system vulnerabilities without user action.',
    },
    {
      misconception: 'In public-key cryptography, the private key encrypts and public key decrypts for confidentiality.',
      correction: 'For confidentiality, the public key encrypts and the private key decrypts. For digital signatures, the private key signs (encrypts hash) and the public key verifies (decrypts hash).',
    },
    {
      misconception: 'Docker containers are just mini virtual machines that each run a full guest OS.',
      correction: 'Containers share the host operating system kernel and isolate only application binaries and libraries, making them lightweight (MBs) and fast compared to full VMs (GBs).',
    },
    {
      misconception: 'HTTP GET and POST methods can be used interchangeably for updating and deleting data.',
      correction: 'REST principles mandate GET for safe read-only queries, POST for resource creation, PUT for idempotent updates/replacements, and DELETE for removals.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which algorithm is a modern, secure symmetric cipher supporting 128, 192, and 256-bit keys?', options: ['DES (56-bit)', 'AES', 'Caesar Cipher', 'MD5'], correctIndex: 1 },
    { question: 'What mathematical problem underpins the security of RSA asymmetric cryptography?', options: ['Linear regression', 'Factoring the product of two large prime numbers', 'Sorting random arrays', 'Graph coloring'], correctIndex: 1 },
    { question: 'What does PKI use to bind a verified real-world identity to a public key?', options: ['Digital Certificates issued by Certificate Authorities (CAs)', 'IP addresses', 'Browser cookies', 'MAC address tables'], correctIndex: 0 },
    { question: 'Which attack floods a server with millions of requests from a distributed botnet?', options: ['Phishing', 'Trojan Backdoor', 'DDoS (Distributed Denial of Service)', 'SQL Injection'], correctIndex: 2 },
    { question: 'What is the primary role of the Map step in Hadoop MapReduce?', options: ['Render 3D graphics', 'Transform raw inputs into intermediate (Key, Value) pairs', 'Reboot failed servers', 'Encrypt network cables'], correctIndex: 1 },
    { question: 'Which IoT component directly causes physical action in the environment (e.g., motor or relay)?', options: ['Sensor', 'Actuator', 'Transceiver', 'ADC converter'], correctIndex: 1 },
    { question: 'Why is a blockchain described as immutable?', options: ['Because each block header contains a cryptographic hash pointer to the previous block', 'Because it is stored in read-only CD-ROMs', 'Because governments ban changing files', 'Because smart contracts turn off the CPU'], correctIndex: 0 },
    { question: 'Which Indian legislation provides legal validity to electronic records and digital signatures?', options: ['Indian Penal Code 1860', 'Information Technology Act 2000', 'Companies Act 2013', 'Consumer Protection Act 2019'], correctIndex: 1 },
  ],
  masteryCriteria: 'Demonstrate rigorous theoretical understanding and practical problem-solving across network security, cryptographic protocols, cloud DevOps, AI, Big Data, IoT systems, blockchain ledgers, and Indian cyber jurisprudence.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Cryptographic Cipher & Key Mechanics',
    instruction: 'Drag the Encryption Key slider and switch between Symmetric AES and Asymmetric RSA modes to inspect plaintext transformation in real time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_CS_041,
  },
  {
    title: 'Lab 2: Multi-Layered Firewall & Threat Defense',
    instruction: 'Toggle packet filter rules and inject simulated traffic packets (Benign HTTPS vs DDoS SYN Flood vs Malware) to test defense barriers.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_CS_042,
  },
  {
    title: 'Lab 3: Cloud Virtualization & Container Sizing',
    instruction: 'Adjust the Workload Instance slider to compare Host Memory allocation between Type-1 Hypervisor VMs and Docker Containers.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_CS_045,
  },
  {
    title: 'Lab 4: Artificial Neural Network Neuron Activation',
    instruction: 'Adjust the Input Weights (w1, w2) and Bias slider to observe the weighted sum Σ and Sigmoid activation output change dynamically.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_CS_046,
  },
  {
    title: 'Lab 5: Blockchain Hash Pointer & Tamper Detection',
    instruction: 'Click on Block 2 transaction data to simulate an unauthorized tamper attempt and watch the cryptographic hash chain break downstream.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_CS_049,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Senior Cyber Architect: Design National Unified Health Interface (UHI)',
  description: 'Apply the architectural principles learned in this simulation to formulate a secure design document for India’s Ayushman Bharat Digital Mission.',
  steps: [
    'Specify Hybrid Cryptography (AES-256 for patient health records, RSA-2048 for doctor key exchange).',
    'Define PKI Digital Certificate verification for registered hospitals via National Health Authority CA.',
    'Formulate REST API endpoints (`POST /api/v1/consent`, `GET /api/v1/records/{id}`) with JSON payloads.',
    'Architect containerized microservices on AWS/Azure with a CI/CD automated pipeline.',
    'Incorporate compliance with IT Act 2000 Section 43A and Digital Personal Data Protection (DPDP) Act.',
  ],
};

// ─── MAIN COMPONENT EXPORT ───
export function C12_ComputerScienceNetworkSecurityCryptographySim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['cs'] || { name: 'Computer Science', emoji: '💻', color: 'cyan' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);

  // Brilliant.org style states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});
  const [observationSubmitted, setObservationSubmitted] = useState<Record<number, boolean>>({});

  // Interactive Lab & Sandbox Variables
  const [cipherMode, setCipherMode] = useState<'symmetric' | 'asymmetric'>('symmetric');
  const [keyShift, setKeyShift] = useState(3);
  const [rawMessage, setRawMessage] = useState('BHARAT_SECURE_2026');
  const [rsaKeyBits, setRsaKeyBits] = useState(2048);
  const [firewallStrictness, setFirewallStrictness] = useState(2); // 1 = low, 2 = balanced, 3 = high
  const [containerCount, setContainerCount] = useState(8);
  const [vmCount, setVmCount] = useState(8);
  const [nnWeight1, setNnWeight1] = useState(1.5);
  const [nnWeight2, setNnWeight2] = useState(-0.8);
  const [nnBias, setNnBias] = useState(0.2);
  const [nnInput1, setNnInput1] = useState(1.0);
  const [nnInput2, setNnInput2] = useState(0.5);
  const [isBlockTampered, setIsBlockTampered] = useState(false);
  const [tamperedText, setTamperedText] = useState('Govt Land Title #492');
  const [sandboxTab, setSandboxTab] = useState<'crypto' | 'firewall' | 'cloud' | 'ai' | 'blockchain'>('crypto');
  const [iotSensorVal, setIotSensorVal] = useState(28); // temperature
  const [iotRelayActive, setIotRelayActive] = useState(false);
  const [mapReduceStage, setMapReduceStage] = useState<'raw' | 'map' | 'shuffle' | 'reduce'>('raw');

  // Challenge execution state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop & Construction States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // UI Feedback components
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY: Filtered Challenges ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── DERIVED CIPHERTEXT CALCULATION ───
  const calculatedCiphertext = useMemo(() => {
    if (cipherMode === 'symmetric') {
      return rawMessage
        .split('')
        .map(char => {
          const code = char.charCodeAt(0);
          if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + keyShift) % 26) + 65);
          }
          if (code >= 48 && code <= 57) {
            return String.fromCharCode(((code - 48 + keyShift) % 10) + 48);
          }
          return char;
        })
        .join('');
    } else {
      return `RSA_${rsaKeyBits}_[0x` + rawMessage.split('').map(c => (c.charCodeAt(0) ^ 137).toString(16).padStart(2, '0')).join('') + `_MOD_N]`;
    }
  }, [rawMessage, keyShift, cipherMode, rsaKeyBits]);

  // ─── DERIVED NEURAL ACTIVATION CALCULATION ───
  const { weightedSum, sigmoidOutput } = useMemo(() => {
    const sum = (nnInput1 * nnWeight1) + (nnInput2 * nnWeight2) + nnBias;
    const sigmoid = 1 / (1 + Math.exp(-sum));
    return { weightedSum: parseFloat(sum.toFixed(3)), sigmoidOutput: parseFloat(sigmoid.toFixed(4)) };
  }, [nnInput1, nnWeight1, nnInput2, nnWeight2, nnBias]);

  // ─── DERIVED BLOCKCHAIN HASH CHAIN ───
  const blockchainData = useMemo(() => {
    const simpleHash = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
      }
      return '00' + Math.abs(hash).toString(16).padStart(6, '0');
    };

    const b1_data = 'Genesis Block - RBI Node #1';
    const b1_hash = simpleHash('000000' + b1_data);

    const b2_data = isBlockTampered ? tamperedText + ' [TAMPERED]' : 'Govt Land Title #492 - Revenue Dept';
    const b2_hash = simpleHash(b1_hash + b2_data);

    const b3_data = 'Aadhaar Demographic Verification #8942';
    const b3_hash = simpleHash(b2_hash + b3_data);

    const b3_expectedPrev = isBlockTampered ? '00a391e4 (Invalid Broken!)' : b2_hash;
    const isChainValid = !isBlockTampered;

    return { b1_hash, b2_data, b2_hash, b3_data, b3_hash, b3_expectedPrev, isChainValid };
  }, [isBlockTampered, tamperedText]);

  // ─── INITIAL LOAD FROM LOCALSTORAGE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C12_CS_041);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE DIFFICULTY UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner' ? 'foundation' :
      mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS PACKET ANIMATION ───
  useEffect(() => {
    if (phase !== 'explore' && phase !== 'sandbox') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(30, 41, 59, 0.6)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const packetX = (tick * 2) % (canvas.width - 40) + 20;
      const packetY = canvas.height / 2 + Math.sin(tick * 0.05) * 15;

      const fwX = canvas.width / 2;
      ctx.strokeStyle = firewallStrictness === 3 ? '#ef4444' : firewallStrictness === 2 ? '#3b82f6' : '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(fwX, 10);
      ctx.lineTo(fwX, canvas.height - 10);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText('FIREWALL SHIELD', fwX - 45, 20);

      ctx.beginPath();
      ctx.arc(packetX, packetY, 8, 0, Math.PI * 2);
      ctx.fillStyle = packetX < fwX ? '#06b6d4' : (firewallStrictness === 3 ? '#ef4444' : '#10b981');
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '9px sans-serif';
      ctx.fillText(packetX < fwX ? 'ENC' : 'ACK', packetX - 8, packetY + 3);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, firewallStrictness]);

  // ─── ESCALATING HINTS CALLBACK ───
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
      setShowExplanation(true);
      setShowHint(false);
      speechManager.speak('Let us review the step-by-step cryptographic explanation.');
    }
  }, [hintCount, challenge]);

  // ─── AUTO-HINT INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── DISCOVERY ANSWER HANDLER ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Masterful intuition! Hybrid encryption is the industry gold standard.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── NAVIGATION CALLBACKS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Manipulate variables to discover principles.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration unlocked. Test any parameters without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commencing ISC board-level architectural challenges. Best of luck!');
  }, []);

  // ─── PREDICTION CALLBACK ───
  const handlePrediction = useCallback((qIndex: number, optIndex: number) => {
    setPredictionAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
    audioManager.play('tap');
    speechManager.speak('Prediction logged! Now test the simulation below to verify.');
  }, []);

  // ─── OBSERVATION CALLBACK ───
  const handleObservation = useCallback((qIndex: number, optIndex: number) => {
    setObservationAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
    setObservationSubmitted(prev => ({ ...prev, [qIndex]: true }));
    const isCorrect = optIndex === OBSERVATION_QUESTIONS[qIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation!' : 'Check the visualization closely to observe the pattern.');
  }, []);

  // ─── INTERACTIVE LAB MANIPULATION CALLBACKS ───
  const handleKeyShiftChange = useCallback((val: number) => {
    setKeyShift(val);
    audioManager.play('count');
  }, []);

  const handleFirewallChange = useCallback((level: number) => {
    setFirewallStrictness(level);
    audioManager.play('tap');
  }, []);

  const handleToggleTamper = useCallback(() => {
    setIsBlockTampered(prev => {
      const next = !prev;
      audioManager.play(next ? 'error' : 'success');
      speechManager.speak(next ? 'Warning! Hash mismatch detected in Block 2. Cryptographic chain broken!' : 'Block hash restored. Chain valid.');
      return next;
    });
  }, []);

  const handleSensorChange = useCallback((temp: number) => {
    setIotSensorVal(temp);
    const relay = temp > 30;
    setIotRelayActive(relay);
    audioManager.play(relay ? 'chime' : 'tap');
  }, []);

  // ─── COMPLETION & SCORE RECORDING ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Simulation complete! Your final architecture score is ${finalScore} percent.`);
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE ADVANCEMENT ───
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

  // ─── ANSWER SUBMISSION HANDLER ───
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
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding technical analysis.');
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
          speechManager.speak('Let us study the complete reference architecture.');
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
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  // ─── DRAG AND DROP HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
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
    setSortArrangement(prev => {
      let arr = prev.length > 0 ? [...prev] : (challenge.sortItems ? challenge.sortItems.map((_, i) => i) : []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems ? challenge.sortItems.map((_, i) => i) : []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── RENDER ───
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-2xl shadow-inner">
            {subjectConfig.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                ISC Class 12 CS
              </span>
              <span className="text-xs text-slate-400">c12_cs_041 – c12_cs_050</span>
            </div>
            <h1 className="text-lg md:text-xl font-extrabold text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            className={`text-xs px-3 py-1 rounded-full font-bold uppercase border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-800'
                : 'bg-cyan-950/60 text-cyan-400 border-cyan-800'
            }`}
          >
            Level: {difficulty}
          </motion.span>
          <span className="text-xs px-3 py-1 rounded-full font-medium bg-slate-900 border border-slate-800 text-slate-300">
            Phase: <strong className="text-cyan-400 capitalize">{phase}</strong>
          </span>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE (HOOK) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="py-6 space-y-6">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-800/40 shadow-lg">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-2">
              <span>🛡️</span> {SCENARIO.title}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-amber-950/80 text-amber-400 border border-amber-800">
                Architectural Discovery Hook
              </span>
            </div>
            <h2 className="text-base md:text-lg font-bold text-white leading-snug">
              {DISCOVERY_QUESTION.question}
            </h2>

            <div className="space-y-2.5 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-500'
                      : 'bg-slate-950/80 border-slate-800 hover:border-cyan-500 text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <span className="inline-block w-6 font-bold text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                  {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 font-bold mr-1.5">✓</span>}
                  {discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex && <span className="text-rose-400 font-bold mr-1.5">✗</span>}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-800">
                <p className={`text-sm mb-4 ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot-on! Hybrid Cryptography powers TLS, HTTPS, and modern Indian secure protocols.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  aria-label="Enter Interactive Laboratories"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-950 flex items-center gap-2"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORE PHASE (INTERACTIVE LABS) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          {/* Lab Step Tabs */}
          <div className="flex flex-wrap gap-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                aria-label={`Open Laboratory Step ${idx + 1}: ${step.title}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                  currentSlide === idx
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/50'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
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
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-cyan-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <span className="text-xs px-2.5 py-1 rounded bg-slate-950 text-slate-400 border border-slate-800 font-mono">
                  Target: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>
              <p className="text-xs md:text-sm text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-900/50">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ── LAB 1: CIPHER ENGINE (SVG Diagram 1) ── */}
              {currentSlide === 0 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="flex flex-wrap gap-3 items-center justify-between">
                    <div className="flex gap-2">
                      <motion.button
                        aria-label="Select Symmetric Encryption Mode"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setCipherMode('symmetric');
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          cipherMode === 'symmetric' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        Symmetric (AES Caesar Demo)
                      </motion.button>
                      <motion.button
                        aria-label="Select Asymmetric RSA Public Private Mode"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setCipherMode('asymmetric');
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          cipherMode === 'asymmetric' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        Asymmetric (RSA Public/Private)
                      </motion.button>
                    </div>

                    <div className="text-xs text-slate-400">
                      Algorithm: <strong className="text-cyan-400">{cipherMode === 'symmetric' ? 'AES-256 Symmetric' : 'RSA-2048 Bit'}</strong>
                    </div>
                  </div>

                  {/* SVG DIAGRAM 1: Cryptographic Key Exchange & Pipeline */}
                  <svg viewBox="0 0 700 130" className="w-full bg-slate-900 rounded-xl border border-slate-800 p-2" aria-label="Cryptographic Flow Diagram">
                    <defs>
                      <marker id="arrow-cyan" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <polygon points="0 0, 6 3, 0 6" fill="#06b6d4" />
                      </marker>
                    </defs>
                    <rect x="20" y="35" width="130" height="60" rx="8" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
                    <text x="85" y="60" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Sender (Alice)</text>
                    <text x="85" y="78" textAnchor="middle" fill="#94a3b8" fontSize="9">Plaintext (M)</text>

                    <line x1="150" y1="65" x2="240" y2="65" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow-cyan)" />
                    <text x="195" y="55" textAnchor="middle" fill="#a5f3fc" fontSize="9">
                      {cipherMode === 'symmetric' ? `Key Shift +${keyShift}` : `Bob's Public Key`}
                    </text>

                    <rect x="240" y="30" width="220" height="70" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                    <text x="350" y="55" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">Ciphertext Pipeline</text>
                    <text x="350" y="75" textAnchor="middle" fill="#fde047" fontSize="10" fontFamily="monospace">
                      {calculatedCiphertext.slice(0, 24)}...
                    </text>

                    <line x1="460" y1="65" x2="550" y2="65" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow-cyan)" />
                    <text x="505" y="55" textAnchor="middle" fill="#a5f3fc" fontSize="9">
                      {cipherMode === 'symmetric' ? `Key Shift -${keyShift}` : `Bob's Private Key`}
                    </text>

                    <rect x="550" y="35" width="130" height="60" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                    <text x="615" y="60" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Recipient (Bob)</text>
                    <text x="615" y="78" textAnchor="middle" fill="#94a3b8" fontSize="9">Decrypted (M)</text>
                  </svg>

                  {cipherMode === 'symmetric' ? (
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Secret Key Shift: <strong>+{keyShift}</strong></span>
                        <span>Key Size: 256 bits</span>
                      </div>
                      <input
                        aria-label="Secret Key Shift Slider"
                        type="range"
                        min={1}
                        max={25}
                        value={keyShift}
                        onChange={e => handleKeyShiftChange(Number(e.target.value))}
                        className="w-full accent-cyan-400"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>RSA Modulus Bit Length: <strong>{rsaKeyBits} bits</strong></span>
                        <span>Prime Factorization Trapdoor: $N = p \times q$</span>
                      </div>
                      <div className="flex gap-2">
                        {[1024, 2048, 4096].map(bits => (
                          <motion.button
                            key={bits}
                            aria-label={`Select ${bits} bits RSA key length`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setRsaKeyBits(bits);
                              audioManager.play('tap');
                            }}
                            className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                              rsaKeyBits === bits ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {bits}-bit
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Plaintext to Ciphertext Visualization */}
                  <div className="grid md:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Plaintext Input (M):</div>
                      <input
                        aria-label="Plaintext Input Field"
                        type="text"
                        value={rawMessage}
                        onChange={e => setRawMessage(e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, ''))}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-cyan-300 font-mono text-sm tracking-widest font-bold"
                      />
                    </div>
                    <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Encrypted Ciphertext (C):</div>
                      <div className="p-2 bg-slate-950 border border-slate-700 rounded text-amber-400 font-mono text-sm tracking-wider break-all">
                        {calculatedCiphertext}
                      </div>
                    </div>
                  </div>

                  {/* Brilliant.org Observation Question 1 */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-cyan-800/40 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        🔍 What do you notice? (Observation Lab 1)
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-200 font-medium">
                      {OBSERVATION_QUESTIONS[0].question}
                    </p>
                    <div className="grid md:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, oIdx) => (
                        <motion.button
                          key={oIdx}
                          aria-label={`Observation option ${oIdx + 1}: ${opt}`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservation(0, oIdx)}
                          className={`p-2.5 rounded-lg text-xs text-left transition-all border ${
                            observationSubmitted[0]
                              ? oIdx === OBSERVATION_QUESTIONS[0].correctIndex
                                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                                : observationAnswers[0] === oIdx
                                ? 'bg-rose-950/60 border-rose-600 text-rose-300'
                                : 'bg-slate-950/40 border-slate-800 text-slate-500'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-cyan-500'
                          }`}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                    {observationSubmitted[0] && (
                      <p className="text-xs text-cyan-300 font-medium pt-1">
                        💡 {OBSERVATION_QUESTIONS[0].explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ── LAB 2: FIREWALL & IDS INSPECTION ── */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs font-bold text-slate-300">Firewall Strictness Policy:</div>
                    <div className="flex gap-2">
                      {[
                        { level: 1, label: 'Low (Allow Most)' },
                        { level: 2, label: 'Standard (Port 80/443)' },
                        { level: 3, label: 'Strict Deep-Packet IDS' },
                      ].map(item => (
                        <motion.button
                          key={item.level}
                          aria-label={`Set Firewall Strictness to ${item.label}`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleFirewallChange(item.level)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                            firewallStrictness === item.level
                              ? 'bg-cyan-600 text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {item.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Packet Animation Canvas */}
                  <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                    <canvas ref={canvasRef} width={700} height={140} className="w-full h-[140px]" aria-label="Live Packet Inspection Canvas" />
                  </div>

                  {/* Defense Matrix Toggles */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <div className="text-xs text-slate-400 font-bold mb-1">Stateful Packet Inspection</div>
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
                        {firewallStrictness >= 2 ? '✓ ACTIVE [Layer 4]' : '✗ DISABLED'}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <div className="text-xs text-slate-400 font-bold mb-1">IDS Anomaly Engine</div>
                      <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
                        {firewallStrictness === 3 ? '✓ HEURISTIC SCAN' : '✓ SIGNATURE ONLY'}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 col-span-2 md:col-span-1">
                      <div className="text-xs text-slate-400 font-bold mb-1">DDoS Mitigation</div>
                      <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800 font-mono">
                        ✓ RATE LIMIT 10k/sec
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: CLOUD VIRTUALIZATION VS CONTAINERS ── */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Workload Instances: <strong>{containerCount} Services</strong></span>
                    <span>Host Physical RAM: 64 GB</span>
                  </div>
                  <input
                    aria-label="Workload Instances Slider"
                    type="range"
                    min={2}
                    max={20}
                    value={containerCount}
                    onChange={e => {
                      setContainerCount(Number(e.target.value));
                      setVmCount(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    className="w-full accent-cyan-400"
                  />

                  {/* Architecture Comparison Diagram */}
                  <div className="grid md:grid-cols-2 gap-4 pt-2">
                    {/* VM Column */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <div className="text-sm font-bold text-rose-400 flex items-center justify-between">
                        <span>Virtual Machines (Type-1 Hypervisor)</span>
                        <span className="text-xs font-mono">{vmCount * 2.5} GB RAM</span>
                      </div>
                      <div className="space-y-1 text-xs">
                        {Array.from({ length: Math.min(vmCount, 4) }).map((_, i) => (
                          <div key={i} className="p-2 bg-slate-950 border border-rose-900/50 rounded flex justify-between">
                            <span className="text-rose-300">VM #{i + 1}: Full Guest OS Kernel + App</span>
                            <span className="font-mono text-slate-400">2.5 GB</span>
                          </div>
                        ))}
                        {vmCount > 4 && <div className="text-slate-500 text-center font-mono text-xs">+ {vmCount - 4} more VMs...</div>}
                      </div>
                      <div className="p-2 bg-slate-950 border border-slate-800 text-center text-xs text-slate-400 font-mono">
                        Type-1 Hypervisor (VMware / KVM)
                      </div>
                      <div className="p-2 bg-slate-800 text-center text-xs text-white font-bold rounded">
                        Bare Metal Physical Server Hardware
                      </div>
                    </div>

                    {/* Docker Container Column */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <div className="text-sm font-bold text-emerald-400 flex items-center justify-between">
                        <span>Docker Containers (Kernel Sharing)</span>
                        <span className="text-xs font-mono">{(containerCount * 0.15).toFixed(1)} GB RAM</span>
                      </div>
                      <div className="space-y-1 text-xs">
                        {Array.from({ length: Math.min(containerCount, 4) }).map((_, i) => (
                          <div key={i} className="p-2 bg-slate-950 border border-emerald-900/50 rounded flex justify-between">
                            <span className="text-emerald-300">Container #{i + 1}: App + Bin/Libs</span>
                            <span className="font-mono text-slate-400">150 MB</span>
                          </div>
                        ))}
                        {containerCount > 4 && <div className="text-slate-500 text-center font-mono text-xs">+ {containerCount - 4} more containers...</div>}
                      </div>
                      <div className="p-2 bg-cyan-950 border border-cyan-800 text-center text-xs text-cyan-300 font-mono">
                        Shared Host Linux OS Kernel
                      </div>
                      <div className="p-2 bg-slate-800 text-center text-xs text-white font-bold rounded">
                        Bare Metal Physical Server Hardware
                      </div>
                    </div>
                  </div>

                  {/* Prediction Question 2 */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-indigo-800/40 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                        🔮 Prediction Question 2
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-200 font-medium">{PREDICTION_QUESTIONS[1].question}</p>
                    <p className="text-xs text-indigo-300">Verify Instruction: {PREDICTION_QUESTIONS[1].verifyInstruction}</p>
                    <div className="grid md:grid-cols-2 gap-2 pt-1">
                      {PREDICTION_QUESTIONS[1].options.map((opt, idx) => (
                        <motion.button
                          key={idx}
                          aria-label={`Predict option ${idx + 1}: ${opt}`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction(1, idx)}
                          className={`p-2.5 rounded-lg text-xs text-left transition-all border ${
                            predictionAnswers[1] !== undefined
                              ? idx === PREDICTION_QUESTIONS[1].correctIndex
                                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                                : predictionAnswers[1] === idx
                                ? 'bg-rose-950/60 border-rose-600 text-rose-300'
                                : 'bg-slate-950/40 border-slate-800 text-slate-500'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-indigo-500'
                          }`}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: NEURAL NETWORK ACTIVATION (SVG Diagram 2) ── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="grid md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Weight 1 ($w_1$): <strong>{nnWeight1}</strong></label>
                      <input
                        aria-label="Neural Network Weight 1"
                        type="range"
                        min={-3}
                        max={3}
                        step={0.1}
                        value={nnWeight1}
                        onChange={e => setNnWeight1(parseFloat(e.target.value))}
                        className="w-full accent-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Weight 2 ($w_2$): <strong>{nnWeight2}</strong></label>
                      <input
                        aria-label="Neural Network Weight 2"
                        type="range"
                        min={-3}
                        max={3}
                        step={0.1}
                        value={nnWeight2}
                        onChange={e => setNnWeight2(parseFloat(e.target.value))}
                        className="w-full accent-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Bias ($b$): <strong>{nnBias}</strong></label>
                      <input
                        aria-label="Neural Network Bias"
                        type="range"
                        min={-2}
                        max={2}
                        step={0.1}
                        value={nnBias}
                        onChange={e => setNnBias(parseFloat(e.target.value))}
                        className="w-full accent-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Interactive Neuron Math SVG Diagram 2 */}
                  <svg viewBox="0 0 600 180" className="w-full bg-slate-900 rounded-xl border border-slate-800" aria-label="Artificial Neuron Math Activation Diagram">
                    <defs>
                      <marker id="arrow-nn" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <polygon points="0 0, 6 3, 0 6" fill="#6366f1" />
                      </marker>
                    </defs>
                    <circle cx="80" cy="50" r="22" fill="#0e7490" />
                    <text x="80" y="54" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">x1=1.0</text>

                    <circle cx="80" cy="130" r="22" fill="#0e7490" />
                    <text x="80" y="134" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">x2=0.5</text>

                    <line x1="102" y1="50" x2="270" y2="90" stroke="#06b6d4" strokeWidth="2" />
                    <text x="180" y="60" fill="#22d3ee" fontSize="10" fontFamily="monospace">w1={nnWeight1}</text>

                    <line x1="102" y1="130" x2="270" y2="90" stroke="#06b6d4" strokeWidth="2" />
                    <text x="180" y="130" fill="#22d3ee" fontSize="10" fontFamily="monospace">w2={nnWeight2}</text>

                    <circle cx="300" cy="90" r="35" fill="#1e1b4b" stroke="#6366f1" strokeWidth="3" />
                    <text x="300" y="85" textAnchor="middle" fill="#a5b4fc" fontSize="10">Σ w·x+b</text>
                    <text x="300" y="102" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">{weightedSum}</text>

                    <line x1="335" y1="90" x2="440" y2="90" stroke="#6366f1" strokeWidth="3" markerEnd="url(#arrow-nn)" />

                    <rect x="440" y="65" width="120" height="50" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="500" y="86" textAnchor="middle" fill="#6ee7b7" fontSize="10">σ(z) Output</text>
                    <text x="500" y="105" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">{sigmoidOutput}</text>
                  </svg>

                  {/* Brilliant.org Observation Question 2 */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-cyan-800/40 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        ��� What do you notice? (Observation Lab 4)
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-200 font-medium">
                      {OBSERVATION_QUESTIONS[1].question}
                    </p>
                    <div className="grid md:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, oIdx) => (
                        <motion.button
                          key={oIdx}
                          aria-label={`Observation option ${oIdx + 1}: ${opt}`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservation(1, oIdx)}
                          className={`p-2.5 rounded-lg text-xs text-left transition-all border ${
                            observationSubmitted[1]
                              ? oIdx === OBSERVATION_QUESTIONS[1].correctIndex
                                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                                : observationAnswers[1] === oIdx
                                ? 'bg-rose-950/60 border-rose-600 text-rose-300'
                                : 'bg-slate-950/40 border-slate-800 text-slate-500'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-cyan-500'
                          }`}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                    {observationSubmitted[1] && (
                      <p className="text-xs text-cyan-300 font-medium pt-1">
                        💡 {OBSERVATION_QUESTIONS[1].explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ── LAB 5: BLOCKCHAIN TAMPER DEMONSTRATOR (SVG Diagram 3) ── */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">Distributed Ledger State:</span>
                    <motion.button
                      aria-label="Toggle Blockchain Tamper State"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleToggleTamper}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                        isBlockTampered
                          ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950'
                          : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-950'
                      }`}
                    >
                      {isBlockTampered ? '↺ Restore Original Block 2' : '⚠️ Tamper With Block 2 Data'}
                    </motion.button>
                  </div>

                  {/* SVG DIAGRAM 3: Blockchain Cryptographic Hash Pointer Integrity */}
                  <svg viewBox="0 0 700 150" className="w-full bg-slate-900 rounded-xl border border-slate-800 p-2" aria-label="Blockchain Hash Pointer Diagram">
                    <defs>
                      <marker id="arrow-chain" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <polygon points="0 0, 6 3, 0 6" fill={isBlockTampered ? '#ef4444' : '#10b981'} />
                      </marker>
                    </defs>

                    {/* Block 1 */}
                    <rect x="20" y="20" width="190" height="110" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                    <text x="115" y="45" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Block #1 (Genesis)</text>
                    <text x="35" y="70" fill="#94a3b8" fontSize="10">Prev: 0000000000</text>
                    <text x="35" y="90" fill="#cbd5e1" fontSize="9">RBI Genesis Node #1</text>
                    <text x="35" y="112" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold">Hash: {blockchainData.b1_hash}</text>

                    {/* Pointer 1 -> 2 */}
                    <line x1="210" y1="75" x2="250" y2="75" stroke={isBlockTampered ? '#ef4444' : '#10b981'} strokeWidth="2.5" markerEnd="url(#arrow-chain)" />

                    {/* Block 2 */}
                    <rect x="250" y="20" width="190" height="110" rx="10" fill="#0f172a" stroke={isBlockTampered ? '#ef4444' : '#10b981'} strokeWidth="2" />
                    <text x="345" y="45" textAnchor="middle" fill={isBlockTampered ? '#f87171' : '#38bdf8'} fontSize="12" fontWeight="bold">
                      Block #2 {isBlockTampered ? '❌ TAMPERED' : '✓ VALID'}
                    </text>
                    <text x="265" y="70" fill="#94a3b8" fontSize="10">Prev: {blockchainData.b1_hash}</text>
                    <text x="265" y="90" fill={isBlockTampered ? '#f87171' : '#cbd5e1'} fontSize="9" fontWeight={isBlockTampered ? 'bold' : 'normal'}>
                      {blockchainData.b2_data.slice(0, 22)}
                    </text>
                    <text x="265" y="112" fill={isBlockTampered ? '#ef4444' : '#34d399'} fontSize="10" fontFamily="monospace" fontWeight="bold">Hash: {blockchainData.b2_hash}</text>

                    {/* Pointer 2 -> 3 */}
                    <line x1="440" y1="75" x2="480" y2="75" stroke={isBlockTampered ? '#ef4444' : '#10b981'} strokeWidth={isBlockTampered ? 3 : 2.5} strokeDasharray={isBlockTampered ? '4 2' : 'none'} markerEnd="url(#arrow-chain)" />

                    {/* Block 3 */}
                    <rect x="480" y="20" width="200" height="110" rx="10" fill="#0f172a" stroke={isBlockTampered ? '#ef4444' : '#10b981'} strokeWidth="2" />
                    <text x="580" y="45" textAnchor="middle" fill={isBlockTampered ? '#f87171' : '#818cf8'} fontSize="12" fontWeight="bold">
                      Block #3 {isBlockTampered ? '❌ BROKEN' : '✓ VALID'}
                    </text>
                    <text x="495" y="70" fill={isBlockTampered ? '#f87171' : '#94a3b8'} fontSize="9" fontWeight={isBlockTampered ? 'bold' : 'normal'}>
                      Expected: {blockchainData.b3_expectedPrev}
                    </text>
                    <text x="495" y="90" fill="#cbd5e1" fontSize="9">Aadhaar Log #8942</text>
                    <text x="495" y="112" fill={isBlockTampered ? '#64748b' : '#34d399'} fontSize="10" fontFamily="monospace" fontWeight="bold">Hash: {blockchainData.b3_hash}</text>
                  </svg>

                  <div className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-1.5 ${
                    isBlockTampered
                      ? 'bg-rose-950/50 border-rose-800 text-rose-300'
                      : 'bg-emerald-950/50 border-emerald-800 text-emerald-300'
                  }`}>
                    {isBlockTampered ? (
                      <>
                        <span className="text-rose-400 font-bold">✗</span>
                        <span>Avalanche Effect Triggered: Tampering with Block 2 changed its SHA-256 hash. Block 3’s pointer to Block 2 is now invalid across all nodes!</span>
                      </>
                    ) : (
                      <>
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>Cryptographic Ledger Intact: Every block header securely points to the unique hash of its predecessor.</span>
                      </>
                    )}
                  </div>

                  {/* Prediction Question 1 */}
                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <p className="text-xs font-bold text-cyan-300">🔮 Prediction 1: {PREDICTION_QUESTIONS[0].question}</p>
                    <p className="text-xs text-slate-400">Verify Instruction: {PREDICTION_QUESTIONS[0].verifyInstruction}</p>
                    <div className="grid md:grid-cols-2 gap-2 pt-1">
                      {PREDICTION_QUESTIONS[0].options.map((opt, idx) => (
                        <motion.button
                          key={idx}
                          aria-label={`Predict option ${idx + 1}: ${opt}`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction(0, idx)}
                          className={`p-2.5 rounded-lg text-xs text-left transition-all border ${
                            predictionAnswers[0] !== undefined
                              ? idx === PREDICTION_QUESTIONS[0].correctIndex
                                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                                : predictionAnswers[0] === idx
                                ? 'bg-rose-950/60 border-rose-600 text-rose-300'
                                : 'bg-slate-950/40 border-slate-800 text-slate-500'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-cyan-500'
                          }`}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              aria-label="Go to previous laboratory"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-medium font-mono">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to next laboratory"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Enter Open Sandbox"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-950"
              >
                Enter Open Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE (FREE PLAY) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <h3 className="text-base font-bold text-cyan-300">Architectural Free Sandbox</h3>
              <p className="text-xs text-slate-400">Simulate IoT controllers, IoT relays, Big Data pipelines, and AI neural weights with zero grading pressure.</p>
            </div>
            <motion.button
              aria-label="Proceed to ISC challenge assessments"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-950 flex items-center gap-2"
            >
              Ready for Challenges! 🚀
            </motion.button>
          </div>

          {/* Sandbox Tabs */}
          <div className="flex gap-2 border-b border-slate-800 pb-2">
            {[
              { id: 'crypto', label: '🔑 Cryptography Lab' },
              { id: 'firewall', label: '🛡️ Network Firewall' },
              { id: 'cloud', label: '☁️ Cloud & Containers' },
              { id: 'ai', label: '🧠 Neural Activation' },
              { id: 'blockchain', label: '⛓️ IoT & Big Data' },
            ].map(tab => (
              <motion.button
                key={tab.id}
                aria-label={`Open Sandbox ${tab.label}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSandboxTab(tab.id as any);
                  audioManager.play('tap');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  sandboxTab === tab.id
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Tab Content 1: IoT & Big Data Simulation */}
          {sandboxTab === 'blockchain' && (
            <div className="grid md:grid-cols-2 gap-4 p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
              {/* IoT Closed Loop */}
              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-sm font-bold text-amber-400">IoT Closed-Loop Control (c12_cs_048)</div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>DHT22 Temp Sensor: <strong>{iotSensorVal}°C</strong></span>
                  <span>Threshold: 30°C</span>
                </div>
                <input
                  aria-label="DHT22 Temperature Sensor Input Slider"
                  type="range"
                  min={15}
                  max={45}
                  value={iotSensorVal}
                  onChange={e => handleSensorChange(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
                <div className="p-3 bg-slate-900 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <div className="text-slate-400 font-bold">Actuator State (Relay Motor):</div>
                    <div className={iotRelayActive ? 'text-rose-400 font-bold flex items-center gap-1' : 'text-emerald-400 font-bold flex items-center gap-1'}>
                      {iotRelayActive ? (
                        <><span>⚡</span><span>COOLING RELAY ENERGIZED</span></>
                      ) : (
                        <><span>✓</span><span>IDLE (Normal Safe Range)</span></>
                      )}
                    </div>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    iotRelayActive ? 'bg-rose-950 text-rose-400 border border-rose-600 animate-pulse' : 'bg-emerald-950 text-emerald-400 border border-emerald-600'
                  }`}>
                    {iotRelayActive ? 'ON' : 'OFF'}
                  </div>
                </div>
              </div>

              {/* Big Data MapReduce */}
              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-sm font-bold text-cyan-400">Big Data MapReduce Flow (c12_cs_047)</div>
                <div className="flex gap-2">
                  {(['raw', 'map', 'shuffle', 'reduce'] as const).map(stage => (
                    <motion.button
                      key={stage}
                      aria-label={`Select MapReduce stage ${stage}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setMapReduceStage(stage);
                        audioManager.play('tap');
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${
                        mapReduceStage === stage ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {stage}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-slate-300">
                  {mapReduceStage === 'raw' && 'Input 10 TB Text: "Hadoop is distributed. Hadoop is resilient."'}
                  {mapReduceStage === 'map' && 'Mapper Output: (Hadoop, 1), (is, 1), (distributed, 1), (Hadoop, 1), (is, 1)'}
                  {mapReduceStage === 'shuffle' && 'Shuffle & Group: Hadoop -> [1, 1], is -> [1, 1], distributed -> [1]'}
                  {mapReduceStage === 'reduce' && 'Reducer Output: (Hadoop: 2), (is: 2), (distributed: 1) -> HDFS Output'}
                </div>
              </div>
            </div>
          )}

          {sandboxTab === 'crypto' && (
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <p className="text-xs text-slate-300">Adjust any cipher keys or plaintexts freely:</p>
              <input
                aria-label="Sandbox Plaintext Input"
                type="text"
                value={rawMessage}
                onChange={e => setRawMessage(e.target.value.toUpperCase())}
                className="w-full p-2 bg-slate-950 border border-slate-700 rounded font-mono text-sm text-cyan-300 font-bold"
              />
              <div className="p-3 bg-slate-950 rounded font-mono text-xs text-amber-400 break-all">
                Ciphertext Output: {calculatedCiphertext}
              </div>
            </div>
          )}
          {sandboxTab === 'firewall' && (
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
              <p className="text-xs text-slate-300 mb-2">Live traffic packet inspection active in canvas engine.</p>
              <div className="text-xs text-cyan-400 font-mono">Current Policy: Strict Level {firewallStrictness}</div>
            </div>
          )}
          {sandboxTab === 'cloud' && (
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
              <p className="text-xs text-slate-300">Memory efficiency scaling: {containerCount} containers consume {(containerCount * 0.15).toFixed(1)} GB vs {vmCount * 2.5} GB on VMs.</p>
            </div>
          )}
          {sandboxTab === 'ai' && (
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
              <p className="text-xs text-slate-300">Neuron Output Sigmoid: <strong className="text-emerald-400">{sigmoidOutput}</strong> (Weighted sum: {weightedSum})</p>
            </div>
          )}
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          {/* Header & Progress */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 uppercase">
                  {challenge.competencyLevel}
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Node: <strong className="text-slate-200">{challenge.nodeId}</strong>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="p-5 md:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-base md:text-lg font-bold text-white leading-snug">
              {challenge.question}
            </h2>

            {/* ── TYPE 1: MCQ (Classify / Distinguish / Match) ── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5 pt-2">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01, x: 3 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                      wrongFlash
                        ? 'bg-rose-950/60 border-rose-600 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950'
                        : 'bg-slate-950/80 border-slate-800 hover:border-cyan-500 text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <span className="inline-block w-6 font-bold text-slate-400">{String.fromCharCode(65 + i)}.</span>
                    {showExplanation && i === challenge.correctIndex && <span className="text-emerald-400 font-bold mr-1.5">✓</span>}
                    {wrongFlash && <span className="text-rose-400 font-bold mr-1.5">✗</span>}
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* ── TYPE 2: DRAG-LABEL (Interactive Diagram Labeling) ── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                {/* Palette */}
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="w-full text-xs text-slate-400 mb-1 font-semibold">Available Labels (Drag into diagram slots):</div>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-cyan-800 hover:bg-cyan-700 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Targets */}
                <div className="grid md:grid-cols-2 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <div
                      key={i}
                      role="region"
                      aria-label={`Drop target for slot ${item.targetId}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className={`p-3 rounded-xl border-2 border-dashed transition-all flex items-center justify-between ${
                        droppedLabels[item.targetId]
                          ? 'border-emerald-500 bg-emerald-950/30'
                          : 'border-slate-700 bg-slate-900/50 hover:border-cyan-500'
                      }`}
                    >
                      <span className="text-xs text-slate-400 font-mono">Target: {item.targetId}</span>
                      <span className="text-xs font-bold text-cyan-300">
                        {droppedLabels[item.targetId] ? `✓ ${droppedLabels[item.targetId]}` : '[Drop Label Here]'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Architecture Labels"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-950"
                >
                  Verify Architecture Labels
                </motion.button>
              </div>
            )}

            {/* ── TYPE 3: DRAG-SORT ── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <div className="text-xs text-slate-400">Drag or reorder steps into correct operational sequence:</div>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      role="button"
                      tabIndex={0}
                      aria-label={`Step ${displayIndex + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3 hover:border-cyan-500"
                    >
                      <span className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-bold">
                        {displayIndex + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Submit Execution Order"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-950"
                >
                  Submit Execution Order
                </motion.button>
              </div>
            )}

            {/* ── TYPE 4: NUMERIC ── */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    aria-label="Numeric calculation answer input"
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated integer"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-cyan-500 outline-none"
                  />
                  <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                  <motion.button
                    aria-label="Check Numeric Calculation"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-950"
                  >
                    Check Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* ── TYPE 5: CONSTRUCT ── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part ${part}`}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-xs font-medium border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-cyan-950 text-cyan-300 border border-cyan-700 rounded-lg text-xs font-mono flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        aria-label={`Remove part ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click components above to build flow...</span>}
                </div>

                <motion.button
                  aria-label="Verify Pipeline Construction"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-950"
                >
                  Verify Pipeline Construction
                </motion.button>
              </div>
            )}

            {/* ── PROGRESSIVE STEP-BY-STEP EXPLANATION ── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 space-y-3"
              >
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  ISC Technical Solution Breakdown:
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
                      <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Reveal Next Step of Explanation"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-3.5 py-1.5 bg-amber-800 hover:bg-amber-700 text-white rounded-lg text-xs font-bold"
                  >
                    Reveal Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Proceed to next challenge"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-950"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Audit Results →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 text-center space-y-3 shadow-xl">
            <span className="text-4xl">🎖️</span>
            <h2 className="text-2xl font-extrabold text-white">National Security Simulation Completed</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have architecturally audited Cryptography, Perimeter Defenses, Cloud DevOps, AI Systems, IoT Hardware, Blockchain Networks, and the Indian IT Act 2000.
            </p>
            <div className="inline-flex gap-4 p-3 bg-slate-950 rounded-2xl border border-slate-800 mt-2">
              <div>
                <div className="text-xs text-slate-400">Final Score</div>
                <div className="text-xl font-bold text-cyan-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="border-l border-slate-800 pl-4">
                <div className="text-xs text-slate-400">Mastery Level</div>
                <div className="text-xl font-bold text-emerald-400 capitalize">{masteryLevel}</div>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-800/60 text-xs md:text-sm text-emerald-300">
            <strong>Evaluator Assessment: </strong>
            {errors === 0
              ? 'PERFECT SCORE! Flawless execution — you demonstrated comprehensive mastery of ISC Class 12 Computer Science systems.'
              : errors <= 3
              ? 'Great work! You successfully navigated complex cryptographic and architectural trade-offs.'
              : errors <= 7
              ? 'Good effort! Review key concepts to master the tricky edge cases.'
              : 'Do not give up — You WILL get this! Practice makes perfect.'}
          </div>

          {/* Misconception Profile Tracking */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Target Misconception Profile (Gaps Identified for Review):
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</div>
                      <div className="text-emerald-300">✓ ISC Correction: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-5 bg-indigo-950/50 rounded-2xl border border-indigo-700/70 text-indigo-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-base text-indigo-100">
                <span>🧠</span> Spaced Repetition Schedule (SRS / SM-2)
              </div>
              <p className="text-xs text-indigo-300">
                Based on your performance ({errors} error{errors === 1 ? '' : 's'}), your next review is scheduled in:
              </p>
              <div className="text-sm font-semibold text-cyan-300">
                📅 Review recommended in:{' '}
                <span className="underline font-bold text-yellow-300">
                  {errors === 0 ? '7 days (Mastery Retention)' : errors <= 3 ? '3 days (Consolidation)' : '1 day (Immediate Reinforcement)'}
                </span>
              </div>
            </div>
            <div className="px-4 py-2 bg-indigo-900/80 border border-indigo-600 rounded-xl font-mono text-xs font-bold text-white text-center">
              Next Review: {errors === 0 ? '+7 Days' : errors <= 3 ? '+3 Days' : '+1 Day'}
            </div>
          </div>

          {/* Real-World Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-cyan-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ol className="space-y-1.5 text-xs text-slate-400 list-decimal pl-4">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </motion.div>
      )}

      {/* Floating Interactive Visual Feedback Components */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Architecture Approved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_ComputerScienceNetworkSecurityCryptographySim;
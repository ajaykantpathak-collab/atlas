'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS AS STRING LITERALS ───
const NODE_C8_CS_021 = 'c8_cs_021'; // App types (native, web, hybrid) & uses
const NODE_C8_CS_022 = 'c8_cs_022'; // Installing apps, app stores, permissions, updates
const NODE_C8_CS_023 = 'c8_cs_023'; // App development lifecycle & UI design principles
const NODE_C8_CS_024 = 'c8_cs_024'; // Computer networks (LAN, MAN, WAN)
const NODE_C8_CS_025 = 'c8_cs_025'; // Networking media (twisted pair, coaxial, fiber, wireless)
const NODE_C8_CS_026 = 'c8_cs_026'; // Networking devices (hub, switch, router, modem, gateway)
const NODE_C8_CS_027 = 'c8_cs_027'; // Protocols & addressing (IP address, URL, HTTP, TCP/IP, FTP)
const NODE_C8_CS_028 = 'c8_cs_028'; // Cloud computing concepts (on-demand, scalable, pay-per-use, public/private/hybrid)
const NODE_C8_CS_029 = 'c8_cs_029'; // Cloud service models (SaaS, PaaS, IaaS)
const NODE_C8_CS_030 = 'c8_cs_030'; // Cloud advantages/disadvantages & Google Drive
const NODE_C8_CS_031 = 'c8_cs_031'; // CSS and web styling (selectors, box model, layout)

const ALL_NODE_IDS = [
  NODE_C8_CS_021,
  NODE_C8_CS_022,
  NODE_C8_CS_023,
  NODE_C8_CS_024,
  NODE_C8_CS_025,
  NODE_C8_CS_026,
  NODE_C8_CS_027,
  NODE_C8_CS_028,
  NODE_C8_CS_029,
  NODE_C8_CS_030,
  NODE_C8_CS_031,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: Architect Bengaluru Tech City',
  intro: 'You are the Chief Technology Architect for the new smart digital corridor connecting schools, hospitals, start-up incubators, and metro transit stations in Bengaluru and Chennai.',
  context: 'To make the city function smoothly, you must engineer mobile applications, wire high-speed networking media, configure smart packet routers, deploy cloud services (SaaS/PaaS/IaaS), and design live web interfaces using CSS.',
};

// ─── DISCOVERY QUESTION (Curiosity Hook) ───
const DISCOVERY_QUESTION = {
  question: 'A student in Kolkata edits a school science report on Google Docs using an Android phone, while a friend in Chennai edits the exact same document on a laptop at the same second. What allows this instantaneous real-time collaboration?',
  options: [
    'The document is stored in the phone memory and beamed by Bluetooth to Chennai.',
    'A SaaS cloud application runs on remote data centre servers, routing live diff packets over TCP/IP.',
    'Each letter typed is downloaded as a separate installable native APK file.',
    'The telephone lines convert the characters directly into analog radio broadcasts with no server.',
  ],
  correctIndex: 1,
  hintAfter: 'Think about where the file actually lives — on a local hard drive or on remote interconnected cloud servers over the Internet!',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 Aligned) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c8_cs_021)
  {
    id: 'ch_01',
    nodeId: NODE_C8_CS_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'WhatsApp installed directly from the Google Play Store to utilize device GPS, camera, and push notifications is classified as which type of app?',
    options: ['Web App', 'Native / Hybrid App', 'Operating System', 'Static Website'],
    correctIndex: 1,
    explanation: 'WhatsApp is an installed native/hybrid app. It runs locally on Android/iOS and accesses camera, push notifications, and local storage directly.',
    hints: [
      'Think about whether you install it from a platform store or just type a URL into a browser.',
      'Installed apps that can trigger push notifications and access phone hardware are native or hybrid apps.',
      'Since it is downloaded from Google Play Store and accesses device sensors, it is a Native / Hybrid App.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag Label (c8_cs_026)
  {
    id: 'ch_02',
    nodeId: NODE_C8_CS_026,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct networking device to its primary function in the network topology.',
    dragItems: [
      { label: 'Switch', targetId: 'slot_mac' },
      { label: 'Router', targetId: 'slot_ip' },
      { label: 'Modem', targetId: 'slot_analog' },
      { label: 'Gateway', targetId: 'slot_protocol' },
    ],
    correctMapping: {
      slot_mac: 'Switch',
      slot_ip: 'Router',
      slot_analog: 'Modem',
      slot_protocol: 'Gateway',
    },
    explanation: 'A Switch forwards by MAC address inside a LAN; a Router connects different networks via IP; a Modem modulates/demodulates analog-digital signals; a Gateway translates between differing network protocols.',
    hints: [
      'Which device inspects hardware MAC addresses inside a room?',
      'Which device connects LANs across the Internet and checks IP addresses?',
      'Modem handles analog-digital conversion; Gateway translates between different network protocols.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Understanding (c8_cs_024)
  {
    id: 'ch_03',
    nodeId: NODE_C8_CS_024,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A municipal corporation connects 45 ward offices across the entire metropolitan city of Mumbai with dedicated high-speed fiber cables. What network tier is this?',
    options: ['LAN (Local Area Network)', 'MAN (Metropolitan Area Network)', 'WAN (Wide Area Network)', 'PAN (Personal Area Network)'],
    correctIndex: 1,
    explanation: 'A Metropolitan Area Network (MAN) spans an entire city or metropolitan municipal region.',
    hints: [
      'Identify the geographical scope: is it a single lab room, an entire city, or the entire globe?',
      'City-wide networks connecting multiple municipal branches are categorized under "Metropolitan".',
      'The word "Metropolitan" gives the classification: MAN (Metropolitan Area Network).',
    ],
  },
  // 4. Foundation - Drag Sort (c8_cs_023)
  {
    id: 'ch_04',
    nodeId: NODE_C8_CS_023,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the 4 core stages of the ICSE App Development Lifecycle in the correct chronological order.',
    sortItems: ['1. Problem Identification & Idea', '2. UI/UX Blueprint Design', '3. Coding & Logic Construction', '4. Quality Assurance & Bug Testing'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'App development strictly progresses from Idea → Design (UI blueprint) → Code (logic & operators) → Test (verification & bug fixes).',
    hints: [
      'You cannot design before having an idea, and you cannot test before code is written.',
      'The sequence is: Conception first, wireframing second, writing instructions third, quality verification fourth.',
      'Order: Idea -> Design -> Code -> Test.',
    ],
  },
  // 5. Foundation - Recall (c8_cs_027)
  {
    id: 'ch_05',
    nodeId: NODE_C8_CS_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the URL "https://www.nic.in/students/", what does "https" represent?',
    options: ['The Domain Name', 'The Scheme / Protocol', 'The Server File Path', 'The IPv4 Subnet Mask'],
    correctIndex: 1,
    explanation: 'In a URL, the prefix before "://" specifies the protocol/scheme used by the browser to fetch data securely.',
    hints: [
      'Look at the very first element before the colon and double slash.',
      'It dictates the rules of transmission (HyperText Transfer Protocol Secure).',
      'It is the Scheme or Protocol.',
    ],
  },
  // 6. Foundation - Match (c8_cs_025)
  {
    id: 'ch_06',
    nodeId: NODE_C8_CS_025,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which transmission medium transmits data as pulses of light through ultra-thin strands of glass, offering the highest speed and zero electromagnetic interference?',
    options: ['Unshielded Twisted Pair (UTP)', 'Coaxial Copper Cable', 'Fiber Optic Cable', 'Infrared Wireless Link'],
    correctIndex: 2,
    explanation: 'Fiber optic cables guide light pulses through core glass fibers via total internal reflection, granting immense bandwidth immune to electrical noise.',
    hints: [
      'The medium carries photons (light) rather than electrical voltage.',
      'It is used for undersea transcontinental links and high-speed metro backbones.',
      'The answer is Fiber Optic Cable.',
    ],
    misconceptionIndex: 2,
  },
  // 7. Standard - Application (c8_cs_022)
  {
    id: 'ch_07',
    nodeId: NODE_C8_CS_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A student in Pune installs an offline basic calculator app from the Play Store. Upon launch, it prompts for "Read Contacts" and "Access Fine GPS Location". Following the Principle of Least Privilege, what should the student do?',
    options: [
      'Grant all permissions because all Play Store apps need contacts to run calculations.',
      'Deny both permissions because a basic calculator has no functional requirement for contacts or GPS.',
      'Grant contacts but deny location so the calculator can calculate contact phone numbers.',
      'Turn off phone Wi-Fi and grant permanent root access.',
    ],
    correctIndex: 1,
    explanation: 'Under the security principle of least privilege, applications should only be granted permissions strictly necessary for their core task. A calculator requires neither contacts nor GPS.',
    hints: [
      'Does calculating 25 * 4 require knowing the user\'s physical latitude or phone book?',
      'Granting unnecessary permissions compromises user privacy and opens security vulnerabilities.',
      'The student must deny both unjustified permissions.',
    ],
    misconceptionIndex: 3,
  },
  // 8. Standard - Numeric (c8_cs_031)
  {
    id: 'ch_08',
    nodeId: NODE_C8_CS_031,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A CSS div box has a content width of 240px, padding of 20px on all sides, a border of 5px on all sides, and a margin of 15px. What is the TOTAL horizontal space occupied by this element on the page in pixels? (Total = Width + 2*Pad + 2*Border + 2*Margin)',
    correctAnswer: 320,
    tolerance: 0,
    unit: 'px',
    explanation: 'Total horizontal space = 240 (content) + 20*2 (padding) + 5*2 (border) + 15*2 (margin) = 240 + 40 + 10 + 30 = 320px.',
    hints: [
      'Remember horizontal dimensions include left AND right padding, borders, and margins.',
      'Calculation: 240 + (20 * 2) + (5 * 2) + (15 * 2).',
      '240 + 40 + 10 + 30 = 320 px.',
    ],
  },
  // 9. Standard - Application (c8_cs_023)
  {
    id: 'ch_09',
    nodeId: NODE_C8_CS_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Evaluate the operator precedence in this ICSE school bus discount logic: `(age < 12 AND withAdult == true) OR age >= 60`. If `age = 10`, `withAdult = false`, what is the evaluated outcome?',
    options: ['true (Discount granted)', 'false (No discount)', 'Syntax Error', 'Null Pointer'],
    correctIndex: 1,
    explanation: '`age < 12` is true, but `withAdult == true` is false. `true AND false` yields false. `age >= 60` (10 >= 60) is false. `false OR false` evaluates to false.',
    hints: [
      'Evaluate inside parentheses first: 10 < 12 (true) AND false == true (false).',
      'true AND false evaluates to false.',
      'Now evaluate: false OR (10 >= 60) -> false OR false = false.',
    ],
  },
  // 10. Standard - Distinguish (c8_cs_029)
  {
    id: 'ch_09b',
    nodeId: NODE_C8_CS_029,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A software company in Bengaluru uses Google App Engine to deploy Python code without managing servers, while their finance team uses Google Docs. How are App Engine and Docs classified?',
    options: [
      'Both are SaaS because they are made by Google.',
      'App Engine is PaaS (Platform for developers); Google Docs is SaaS (Finished software for users).',
      'App Engine is IaaS; Google Docs is PaaS.',
      'Both are IaaS virtual machines.',
    ],
    correctIndex: 1,
    explanation: 'PaaS provides execution runtimes/APIs for developers to build apps without server maintenance. SaaS delivers ready-to-use finished software to end-users.',
    hints: [
      'Classify by what is delivered and who uses it, NOT the company brand name.',
      'Developers deploying code need a Platform (PaaS); office workers typing text use Software (SaaS).',
      'App Engine = PaaS; Google Docs = SaaS.',
    ],
    misconceptionIndex: 4,
  },
  // 11. Standard - Construct (c8_cs_031)
  {
    id: 'ch_10',
    nodeId: NODE_C8_CS_031,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct a valid CSS rule that selects all elements with class "notice" and sets background to yellow.',
    availableParts: ['.notice', '#notice', 'notice', '{', 'background:', 'yellow;', 'color:', '}', ';'],
    targetState: '.notice { background: yellow; }',
    validationHint: 'Assemble: .classname + { + property: + value; + }',
    explanation: 'Class selectors in CSS use the dot notation prefix: `.notice { background: yellow; }`.',
    hints: [
      'A class selector starts with a period (.) followed by the class name.',
      'Open the declaration block with { and specify property name followed by colon.',
      'Correct string: `.notice { background: yellow; }`',
    ],
  },
  // 12. Standard - Analysis (c8_cs_028)
  {
    id: 'ch_11',
    nodeId: NODE_C8_CS_028,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'An Indian e-commerce platform experiences a 10x traffic surge during Diwali festival sales and automatically scales up server instances, shrinking back down in November. Which cloud characteristic is this?',
    options: ['Fixed Local Hosting', 'Elastic Scalability & Pay-per-use', 'Static Provisioning', 'Local Area Broadcasting'],
    correctIndex: 1,
    explanation: 'Elastic scalability allows dynamic expansion and contraction of compute resources on demand, while pay-per-use ensures the firm only pays for compute units consumed.',
    hints: [
      'Notice how capacity expands dynamically during rush hour and scales down when quiet.',
      'This avoids buying permanent idle hardware servers.',
      'It is Elastic Scalability with Pay-per-use pricing.',
    ],
  },
  // 13. Standard - Distinguish (c8_cs_026)
  {
    id: 'ch_12',
    nodeId: NODE_C8_CS_026,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does replacing a legacy network Hub with an intelligent Switch drastically reduce packet collisions in a 40-computer school computer lab in Delhi?',
    options: [
      'Hub broadcasts frames to all 40 ports indiscriminately; Switch learns MAC addresses and forwards unicast frames only to the designated port.',
      'Hub converts digital light into radio waves, whereas Switch converts light to sound.',
      'Hub slows down data to prevent electricity overload.',
      'Switch deletes all duplicate files from student hard drives.',
    ],
    correctIndex: 0,
    explanation: 'Hubs operate blindly at Layer 1 broadcasting every frame to all ports. Switches inspect destination MAC addresses, creating isolated collision domains per port.',
    hints: [
      'Think about the difference between shouting to an entire room versus whispering directly to one recipient.',
      'A switch maintains an internal MAC table to route packets exclusively to the target recipient.',
      'Hub = indiscriminate broadcast; Switch = targeted unicast via MAC address table.',
    ],
  },
  // 14. Advanced - Analysis (c8_cs_027)
  {
    id: 'ch_13',
    nodeId: NODE_C8_CS_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'An IPv4 address is composed of four 8-bit octets. Which of the following is an INVALID IPv4 address and why?',
    options: [
      '192.168.1.1 — Valid',
      '10.0.0.254 — Valid',
      '172.320.10.5 — Invalid because an 8-bit octet cannot exceed 255 (2^8 - 1)',
      '127.0.0.1 — Valid',
    ],
    correctIndex: 2,
    explanation: 'Each octet in an IPv4 address represents 8 binary bits, restricting each decimal value strictly between 0 and 255. 320 is impossible.',
    hints: [
      'What is the maximum integer that can be represented with 8 binary bits (11111111 in base 2)?',
      '8 bits = 2^8 = 256 combinations (0 to 255).',
      '320 exceeds the maximum allowed value of 255.',
    ],
  },
  // 15. Advanced - Evaluation (c8_cs_030)
  {
    id: 'ch_14',
    nodeId: NODE_C8_CS_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A state government hospital in Hyderabad must store highly confidential patient diagnostic scans while also providing a public web portal for appointment bookings. What cloud deployment architecture is optimal?',
    options: [
      '100% Public Cloud with no passwords',
      'Hybrid Cloud: Private Cloud for secure internal medical scans + Public Cloud for elastic public appointment booking',
      'Local Floppy Disks with no network connectivity',
      '100% Community Wireless Peer-to-Peer network',
    ],
    correctIndex: 1,
    explanation: 'A Hybrid Cloud leverages the isolation and stringent data privacy compliance of a Private Cloud for patient health records while harnessing the elastic scale and high accessibility of Public Cloud for public web traffic.',
    hints: [
      'Confidential medical data requires dedicated private security controls.',
      'Public appointment booking needs high bandwidth and public reach for thousands of citizens.',
      'Combining both distinct requirements is the definition of Hybrid Cloud.',
    ],
  },
  // 16. Advanced - Evaluation (c8_cs_025)
  {
    id: 'ch_15',
    nodeId: NODE_C8_CS_025,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Two school campus buildings are located 800 meters apart across an open sports field with high power electrical lines overhead. Which transmission medium should be installed between them?',
    options: [
      'Unshielded Cat5 Twisted Pair Cable without repeaters',
      'Fiber Optic Cable (Immune to electromagnetic interference & operates reliably over kilometers)',
      'Standard short-range Bluetooth 4.0 link',
      'Audio megaphone acoustic link',
    ],
    correctIndex: 1,
    explanation: 'Copper twisted pair cables suffer severe attenuation beyond 100 meters and pick up electrical noise from power lines. Fiber optic cables carry light over long distances with zero EMI susceptibility.',
    hints: [
      'Twisted pair copper Ethernet has a maximum reliable run of 100 meters.',
      'High power lines create strong electromagnetic fields that corrupt copper signals.',
      'Fiber optic uses light pulses through glass, completely immune to electromagnetic interference.',
    ],
  },
  // 17. Advanced - Creativity / Synthesis (c8_cs_031)
  {
    id: 'ch_16',
    nodeId: NODE_C8_CS_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are designing the CSS layout for an ICSE School Portal. Which selector pattern correctly styles the unique top logo differently from multiple reusable notice cards?',
    options: [
      '`#logo { width: 120px; }` for the unique ID, and `.notice-card { margin: 10px; padding: 15px; }` for the reusable class.',
      '`.logo { id: unique; }` and `#notice-card { duplicate: true; }`',
      '`logo { all: true; }` and `*notice-card { none: false; }`',
      '`tag#class { run: code; }`',
    ],
    correctIndex: 0,
    explanation: 'ID selectors (#id) are strictly unique per HTML page, whereas Class selectors (.classname) are designed for reusable multi-element styling.',
    hints: [
      'IDs are unique identifiers denoted by the hash (#) symbol.',
      'Classes are reusable groups denoted by the dot (.) symbol.',
      'Choose the option with #logo and .notice-card.',
    ],
  },
  // 18. Advanced - Analysis (c8_cs_027)
  {
    id: 'ch_17',
    nodeId: NODE_C8_CS_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'When a teacher uploads a 200MB annual examination paper PDF to the school web server, which dedicated protocol is best optimized specifically for bulk client-server file transfers?',
    options: ['HTTP', 'FTP (File Transfer Protocol)', 'DNS', 'SMTP'],
    correctIndex: 1,
    explanation: 'FTP (File Transfer Protocol) is engineered specifically for reliable bidirectional file uploading and downloading between clients and remote file storage servers.',
    hints: [
      'HTTP is designed for rendering web pages in browsers.',
      'Look for the protocol containing "File Transfer" in its acronym.',
      'FTP = File Transfer Protocol.',
    ],
  },
  // 19. Advanced - Application (c8_cs_022)
  {
    id: 'ch_18',
    nodeId: NODE_C8_CS_022,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A developer releases version 2.4.1 of an Indian banking app containing critical security patches against zero-day exploits. Why must users update promptly?',
    options: [
      'Updates are purely cosmetic and do not affect security or stability.',
      'Security patches close software vulnerabilities that malicious hackers could exploit to compromise banking data.',
      'Updating deletes the user\'s bank account balance.',
      'App stores require daily manual re-installation of operating systems.',
    ],
    correctIndex: 1,
    explanation: 'App updates serve three key functions: bug fixes, feature additions, and critical security patches that seal security holes from attackers.',
    hints: [
      'Remember the 3 purposes of updates: Bug fixes, New features, and Security patches.',
      'Unpatched apps leave open vulnerabilities on the device.',
      'Security patches protect sensitive personal and financial data.',
    ],
  },
  // 20. Advanced - Drag Sort (c8_cs_027)
  {
    id: 'ch_19',
    nodeId: NODE_C8_CS_027,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order the journey of a web request packet as a student visits "https://www.cisce.org/results":',
    sortItems: [
      '1. Browser decomposes URL into HTTPS scheme and domain name',
      '2. TCP segments data stream into sequenced packets with checksums',
      '3. IP attaches source & destination IPv4 addresses to packets',
      '4. Router inspects IP and forwards packet across intermediate networks to CISCE web server',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The request originates in application layer URL parsing -> TCP packetization -> IP addressing -> Physical routing across networks.',
    hints: [
      'URL parsing happens first inside the local browser.',
      'TCP breaks data into chunks before IP attaches the network addresses.',
      'Routers forward the addressed packets to the destination server.',
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
  nodeId: NODE_C8_CS_021,
  title: 'Computer Science: App Development, Networks, Cloud & CSS',
  definition: 'An integrated study of mobile app architectures, physical networking media, network devices, Internet protocols, cloud computing deployment models, and CSS web presentation.',
  eli5: 'Think of apps as tools in your hand, networks as roads connecting houses, cloud computing as a giant shared digital warehouse in the sky, and CSS as the colorful paint that decorates web pages!',
  misconceptions: [
    {
      misconception: 'Every app must be downloaded from an app store.',
      correction: 'Only native and hybrid apps are installed from app stores. Web apps run directly inside browsers via URLs without downloading.',
    },
    {
      misconception: 'A Hub and a Switch are the same device with different names.',
      correction: 'A Hub broadcasts data frames blindly to all connected ports. A Switch reads destination MAC addresses and forwards packets only to the specific target port.',
    },
    {
      misconception: 'Fiber optic cables transmit high-voltage electricity.',
      correction: 'Fiber optic cables carry pulses of light (photons) through pure glass fibers, making them immune to electrical interference.',
    },
    {
      misconception: 'All permissions requested by mobile apps should be accepted automatically.',
      correction: 'Under the Principle of Least Privilege, users should only grant permissions strictly needed for the app\'s function (e.g., denying contacts to a basic calculator).',
    },
    {
      misconception: 'Google Docs is an example of IaaS because it is provided by Google Cloud.',
      correction: 'Google Docs is SaaS (Software as a Service) because it provides ready-to-use software for end-users. IaaS provides raw virtual machines and storage blocks to IT teams.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which app type offers the highest platform hardware performance on a single OS?', options: ['Native App', 'Web App', 'Text Document', 'Static CSS'], correctIndex: 0 },
    { question: 'Which network covers an entire metropolitan city?', options: ['LAN', 'MAN', 'WAN', 'PAN'], correctIndex: 1 },
    { question: 'What does a Modem do?', options: ['Modulates & demodulates analog and digital signals', 'Destroys viruses', 'Creates HTML pages', 'Increases screen brightness'], correctIndex: 0 },
    { question: 'Which cloud model delivers ready-to-use software to end users?', options: ['SaaS', 'PaaS', 'IaaS', 'DaaS'], correctIndex: 0 },
    { question: 'Which protocol is specifically built for uploading and downloading files?', options: ['FTP', 'HTTP', 'SMTP', 'CSS'], correctIndex: 0 },
    { question: 'What is the correct CSS selector for an element with ID "main"?', options: ['#main', '.main', 'main', '*main'], correctIndex: 0 },
    { question: 'Which layer of the CSS box model sits between content and border?', options: ['Padding', 'Margin', 'Outline', 'Shadow'], correctIndex: 0 },
    { question: 'What is the maximum value for an IPv4 octet?', options: ['255', '100', '1024', '65535'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student understands app architectures, can differentiate networking devices and media, can evaluate cloud computing models, and can construct accurate CSS styling rules.',
};

// ─── EXPLORATION STEPS (Interactive Guided Labs) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: App Architecture Analyzer',
    instruction: 'Toggle between Native, Web, and Hybrid architectures. Observe hardware access and platform reach in real-time.',
    interactionType: 'app-architecture',
    nodeId: NODE_C8_CS_021,
  },
  {
    title: 'Lab 2: Physical Networking Media Lab',
    instruction: 'Select transmission media (Twisted Pair, Coaxial, Fiber Optic, Wireless) to test speed, distance, and EMI immunity.',
    interactionType: 'media-test',
    nodeId: NODE_C8_CS_025,
  },
  {
    title: 'Lab 3: Smart Packet Router & Switch Simulator',
    instruction: 'Send a data packet from Computer A to Computer C. Compare how a Hub broadcasts vs how a Switch routes by MAC address.',
    interactionType: 'packet-route',
    nodeId: NODE_C8_CS_026,
  },
  {
    title: 'Lab 4: Cloud Computing Service Stack (SaaS vs PaaS vs IaaS)',
    instruction: 'Inspect each cloud layer to see who manages what: End User (SaaS), Developer (PaaS), or Infrastructure IT (IaaS).',
    interactionType: 'cloud-stack',
    nodeId: NODE_C8_CS_029,
  },
  {
    title: 'Lab 5: Interactive CSS Box Model & Live Styler',
    instruction: 'Drag the sliders for Content Width, Padding, Border, and Margin. Watch the CSS box render and compute live dimensions.',
    interactionType: 'css-box',
    nodeId: NODE_C8_CS_031,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you replace a copper twisted-pair cable with a Fiber Optic link next to a high-voltage metro train line, what will happen to data corruption from electrical noise?',
    options: [
      'Corruption increases because glass attracts lightning.',
      'Corruption drops to 0% because light pulses inside glass are completely immune to electromagnetic interference.',
      'Speed slows down because light travels slower than copper electrons.',
      'The cable will melt immediately.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Select Fiber Optic in the Media Lab to verify its 100% EMI Immunity!',
    nodeId: NODE_C8_CS_025,
  },
  {
    question: 'Predict: If a CSS box has width: 200px and you increase padding from 10px to 30px on all sides, what happens to the total rendered box width?',
    options: [
      'It stays exactly 200px.',
      'It increases by 40px (20px left + 20px right) to 240px total.',
      'It shrinks to 140px.',
      'It turns into a circle.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Padding slider in the CSS Box Lab to observe the total width calculation!',
    nodeId: NODE_C8_CS_031,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice when switching from Hub Broadcast to Switch Targeted Unicast in Lab 3?',
    observableOptions: [
      'The Hub sends frames to every computer, causing traffic collisions; the Switch sends packets strictly to the target port.',
      'The Hub is 100 times faster than the switch.',
      'The Switch converts the computer into a television.',
      'There is no observable difference.',
    ],
    correctIndex: 0,
    nodeId: NODE_C8_CS_026,
  },
  {
    question: 'What happens to the green background area when you increase Padding vs when you increase Margin in Lab 5?',
    observableOptions: [
      'Padding expands the inner background area; Margin pushes neighboring elements away without expanding background color.',
      'Padding pushes the box; Margin changes the font color.',
      'Both properties do the exact same thing.',
      'Margin shrinks the content to zero.',
    ],
    correctIndex: 0,
    nodeId: NODE_C8_CS_031,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Lead Architect: Design Your School Digital Campus',
  description: 'Apply what you learned to architect a digital infrastructure for your ICSE school campus.',
  steps: [
    'Choose an App Type (Hybrid or Web) for the school attendance & timetable app.',
    'Map the school LAN: Connect student desktops with Twisted Pair cables to Switches, with Fiber Optic linking separate school blocks.',
    'Configure the ISP Router with public IP and modem to enable secure HTTPS web browsing over TCP/IP.',
    'Deploy Google Classroom / Drive (SaaS) for collaborative homework assignments and cloud backups.',
    'Write clean CSS using semantic selectors (#header, .notice-card) with balanced padding and margins for the school portal.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN SIMULATION COMPONENT ───
export function C8_ComputerScienceDevelopmentIntroductionTypesSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['computerscience'] || { name: 'Computer Science', emoji: '💻', color: 'cyan' };

  // ─── 35+ STATE DECLARATIONS (Rich Interactive State) ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [selectedDiscoveryOption, setSelectedDiscoveryOption] = useState<number | null>(null);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Feedback animations state
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag and Drop & Construct State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Prediction & Observation State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Lab 1: App Architecture Interactive State
  const [selectedAppType, setSelectedAppType] = useState<'native' | 'web' | 'hybrid'>('native');
  const [appSensorToggled, setAppSensorToggled] = useState({ camera: true, gps: true, offline: true });

  // Lab 2: Media Test State
  const [selectedMedia, setSelectedMedia] = useState<'twisted' | 'coaxial' | 'fiber' | 'wireless'>('fiber');
  const [emiNoiseLevel, setEmiNoiseLevel] = useState(60);

  // Lab 3: Packet Router & Switch State
  const [deviceMode, setDeviceMode] = useState<'hub' | 'switch'>('switch');
  const [packetTarget, setPacketTarget] = useState<'B' | 'C' | 'D'>('C');
  const [isPacketSending, setIsPacketSending] = useState(false);
  const [packetProgress, setPacketProgress] = useState(0);

  // Lab 4: Cloud Stack State
  const [selectedCloudTier, setSelectedCloudTier] = useState<'saas' | 'paas' | 'iaas'>('saas');

  // Lab 5 & Sandbox: CSS Box Model Interactive State
  const [cssContentWidth, setCssContentWidth] = useState(200);
  const [cssPadding, setCssPadding] = useState(20);
  const [cssBorder, setCssBorder] = useState(4);
  const [cssMargin, setCssMargin] = useState(16);
  const [cssBgColor, setCssBgColor] = useState('#0284c7');
  const [cssTextColor, setCssTextColor] = useState('#ffffff');
  const [cssBorderColor, setCssBorderColor] = useState('#38bdf8');

  // References
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY DIFFICULTY TIER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── TOTAL CSS BOX WIDTH COMPUTATION (Derived State) ───
  const totalBoxWidth = useMemo(() => {
    return cssContentWidth + cssPadding * 2 + cssBorder * 2 + cssMargin * 2;
  }, [cssContentWidth, cssPadding, cssBorder, cssMargin]);

  // ─── MEDIA PERFORMANCE RATINGS (Derived State) ───
  const mediaSpecs = useMemo(() => {
    switch (selectedMedia) {
      case 'twisted':
        return { speed: '1 Gbps', maxDist: '100 meters', emiResistance: Math.max(10, 100 - emiNoiseLevel), signal: 'Electrical (Twisted Copper)', desc: 'Affordable, flexible, ideal for school LAN rooms.' };
      case 'coaxial':
        return { speed: '100 Mbps', maxDist: '500 meters', emiResistance: Math.max(30, 100 - Math.round(emiNoiseLevel * 0.6)), signal: 'Electrical (Shielded Copper)', desc: 'Shielded against moderate noise, used in cable TV.' };
      case 'fiber':
        return { speed: '100 Gbps+', maxDist: '100+ kilometers', emiResistance: 100, signal: 'Photons (Light pulses in glass)', desc: 'Ultra-fast, zero EMI interference, undersea backbone.' };
      case 'wireless':
        return { speed: '300 Mbps', maxDist: '50 meters (obstacles)', emiResistance: Math.max(5, 100 - Math.round(emiNoiseLevel * 1.2)), signal: 'Electromagnetic (Radio Waves)', desc: 'Maximum mobility, prone to walls and radio noise.' };
    }
  }, [selectedMedia, emiNoiseLevel]);

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT DIFFICULTY ADAPTATION EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const targetDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== targetDiff) {
        setCurrentChallenge(0);
        return targetDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D PACKET ANIMATION CANVAS EFFECT ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background grid lines
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw central router / switch pulse
      const pulseR = 8 + Math.sin(t * 3) * 3;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, pulseR, 0, Math.PI * 2);
      ctx.fillStyle = '#06b6d4';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#06b6d4';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw data pulse packets
      const numPackets = 4;
      for (let i = 0; i < numPackets; i++) {
        const offset = (t + (i * Math.PI) / 2) % (Math.PI * 2);
        const radius = 25 + offset * 12;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${Math.max(0, 1 - radius / 80)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── CALLBACK HANDLERS ───

  // 1. Escalating Hints
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      const hintText = activeChallenge.hints[nextLevel - 1];
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
  }, [hintCount, activeChallenge]);

  // 2. Inactivity Timer (10s auto-hint)
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // 3. Discovery Answer
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setSelectedDiscoveryOption(idx);
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on! That is the power of Cloud SaaS.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // 4. Phase Transition: Explore
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive labs! Let us explore app development, networking, and the cloud.');
  }, []);

  // 5. Phase Transition: Sandbox
  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Try the free sandbox mode. Experiment freely without grading.');
  }, []);

  // 6. Phase Transition: Challenge
  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Ready for challenges! Read carefully and apply what you learned.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  // 7. Prediction Handler
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Now interact with the lab to verify.');
  }, []);

  // 8. Observation Handler
  const handleObservation = useCallback((idx: number, correctIdx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === correctIdx;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent observation skills!' : 'Take another close look at the visualization.');
  }, []);

  // 9. Packet Animation Trigger
  const handleSendPacket = useCallback(() => {
    if (isPacketSending) return;
    setIsPacketSending(true);
    setPacketProgress(0);
    audioManager.play('swoop');

    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setPacketProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsPacketSending(false);
        audioManager.play('drop-correct');
      }
    }, 120);
  }, [isPacketSending]);

  // 10. Drag & Drop Handlers
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
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 400);
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  // 11. Sort Move Handler
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length === activeChallenge.sortItems?.length ? prev : activeChallenge.sortItems?.map((_, i) => i) || [];
      const updated = [...base];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  }, [activeChallenge]);

  // 12. Completion Handler
  const handleCompleteSimulation = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the mission as a certified digital architect.');
  }, [errors, onComplete]);

  // 13. Answer Validation Handler
  const handleAnswer = useCallback((userAnswer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = userAnswer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(userAnswer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(userAnswer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const val = typeof userAnswer === 'string' ? parseFloat(userAnswer) : (userAnswer as number);
      isCorrect = Math.abs(val - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = userAnswer === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);

      // BKT & SRS Updates
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`mastery_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us study the complete step-by-step solution.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`mastery_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // 14. Next Challenge Transition
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
      handleCompleteSimulation();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSimulation, resetInactivityTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-2xl shadow-inner">
            {subjectConfig.emoji}
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400">ICSE Class 8 • {subjectConfig.name}</span>
            <h1 className="text-lg sm:text-xl font-bold text-white">{title}</h1>
          </div>
        </div>

        {/* Difficulty Badge & Score HUD */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                : difficulty === 'standard'
                ? 'bg-cyan-950/70 border-cyan-500 text-cyan-300'
                : 'bg-purple-950/70 border-purple-500 text-purple-300'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="text-xs bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300">
            Mastery: <span className="font-bold text-cyan-300 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY (Curiosity Hook) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-r from-slate-900 to-cyan-950/40 rounded-2xl border border-cyan-800/40">
            <h2 className="text-xl font-black text-cyan-300 tracking-wide">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-cyan-200/70 mt-2 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <span>⚡</span>
              <h3>Curiosity Hook: Make your initial guess!</h3>
            </div>
            <p className="text-white font-medium text-base">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => {
                const isSelected = selectedDiscoveryOption === i;
                const isCorrect = i === DISCOVERY_QUESTION.correctIndex;
                return (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`p-4 rounded-xl text-left text-sm transition-all border ${
                      discoveryAnswered
                        ? isCorrect
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                          : isSelected
                          ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                        : 'bg-slate-800/90 hover:bg-slate-700/90 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-cyan-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {discoveryAnswered && (
                      <span className="mr-2 font-bold">
                        {isCorrect ? '✓' : isSelected ? '✗' : ''}
                      </span>
                    )}
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! Google Docs runs on the cloud (SaaS).' : `✗ Not quite. ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter Interactive Labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/50 flex items-center gap-2"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION LABS ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-4">
          {/* Lab Step Selector Tabs */}
          <div className="flex flex-wrap gap-2 pb-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                aria-label={`Open Lab ${idx + 1}: ${step.title.split(':')[1] || step.title}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  currentSlide === idx
                    ? 'bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-900/50'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                Lab {idx + 1}: {step.title.split(':')[1] || step.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 sm:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-cyan-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-xs text-amber-300 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
              </div>

              {/* ─── LAB 1: APP ARCHITECTURE SIMULATOR ─── */}
              {currentSlide === 0 && (
                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(['native', 'web', 'hybrid'] as const).map(t => (
                      <motion.button
                        key={t}
                        aria-label={`Select ${t} app architecture model`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setSelectedAppType(t);
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                          selectedAppType === t ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        {t} App
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Visual Phone Model */}
                    <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col items-center">
                      <div className="w-48 h-72 bg-slate-950 rounded-3xl border-4 border-slate-700 p-3 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                        {/* Notch */}
                        <div className="w-16 h-3 bg-slate-800 rounded-full mx-auto" />

                        {/* Screen Content */}
                        <div className="my-auto text-center space-y-2">
                          <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-xl">
                            {selectedAppType === 'native' ? '📱' : selectedAppType === 'web' ? '🌐' : '⚡'}
                          </div>
                          <p className="text-xs font-bold text-white uppercase">{selectedAppType} Model</p>
                          <p className="text-[10px] text-slate-400">
                            {selectedAppType === 'native'
                              ? 'Fast Direct Binary Code'
                              : selectedAppType === 'web'
                              ? 'Chrome / Safari URL Window'
                              : 'HTML/JS in Native Shell'}
                          </p>
                        </div>

                        {/* Bottom Home Indicator */}
                        <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto" />
                      </div>
                    </div>

                    {/* Feature Matrix & Toggles */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Hardware & Delivery Specs</h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-400">Delivery Model:</span>
                          <span className="font-bold text-cyan-300">
                            {selectedAppType === 'web' ? 'Browser URL (No Install)' : 'Google Play / App Store Install'}
                          </span>
                        </div>
                        <div className="flex justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-400">Platform Scope:</span>
                          <span className="font-bold text-emerald-300">
                            {selectedAppType === 'native' ? 'Single OS (Android OR iOS)' : selectedAppType === 'web' ? 'Universal (Any device with browser)' : 'Cross-platform (One codebase)'}
                          </span>
                        </div>
                        <div className="flex justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-400">Hardware Access:</span>
                          <span className="font-bold text-amber-300">
                            {selectedAppType === 'native' ? 'Full Direct Hardware (GPS/Cam/NFC)' : selectedAppType === 'web' ? 'Limited via Browser APIs' : 'Good (Bridged via Shell)'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: NETWORKING MEDIA LAB ─── */}
              {currentSlide === 1 && (
                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-4">
                  {/* PREDICT-THEN-CHECK */}
                  {!predictionMade && (
                    <div className="p-4 bg-cyan-950/40 rounded-xl border border-cyan-800/40 space-y-3">
                      <p className="text-xs font-bold text-cyan-300">💡 PREDICTION CHECK:</p>
                      <p className="text-xs text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Predict option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 bg-slate-900 hover:bg-slate-800 text-left text-xs text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {(['twisted', 'coaxial', 'fiber', 'wireless'] as const).map(m => (
                      <motion.button
                        key={m}
                        aria-label={`Select transmission media ${m}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setSelectedMedia(m);
                          audioManager.play('tap');
                        }}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition-all border ${
                          selectedMedia === m ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        {m}
                      </motion.button>
                    ))}
                  </div>

                  {/* Noise Slider */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Simulated Environmental Electrical Noise (EMI):</span>
                      <span className="font-bold text-amber-400">{emiNoiseLevel}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={emiNoiseLevel}
                      aria-label="Simulated Environmental Electrical Noise percentage"
                      onChange={e => setEmiNoiseLevel(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  {/* Live SVG Signal Simulation */}
                  <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-3">
                    <svg viewBox="0 0 600 120" className="w-full h-28 bg-slate-950 rounded-xl">
                      {/* Signal Wave */}
                      <path
                        d={
                          selectedMedia === 'fiber'
                            ? 'M 20 60 Q 80 20, 140 60 T 260 60 T 380 60 T 500 60 T 580 60'
                            : selectedMedia === 'twisted'
                            ? `M 20 60 Q 80 ${20 + emiNoiseLevel * 0.3}, 140 60 T 260 ${60 - emiNoiseLevel * 0.2} T 380 60 T 500 ${
                                60 + emiNoiseLevel * 0.3
                              } T 580 60`
                            : selectedMedia === 'coaxial'
                            ? `M 20 60 Q 80 ${30 + emiNoiseLevel * 0.15}, 140 60 T 260 60 T 380 ${60 - emiNoiseLevel * 0.15} T 500 60 T 580 60`
                            : `M 20 60 Q 80 ${10 + emiNoiseLevel * 0.5}, 140 60 T 260 ${60 + emiNoiseLevel * 0.4} T 380 ${
                                60 - emiNoiseLevel * 0.5
                              } T 500 60 T 580 60`
                        }
                        fill="none"
                        stroke={selectedMedia === 'fiber' ? '#38bdf8' : selectedMedia === 'wireless' ? '#a855f7' : '#f59e0b'}
                        strokeWidth="3"
                      />
                      <text x="30" y="30" fill="#94a3b8" fontSize="11">
                        Signal: {mediaSpecs.signal}
                      </text>
                      <text x="400" y="30" fill="#38bdf8" fontSize="11" fontWeight="bold">
                        Noise Immunity: {mediaSpecs.emiResistance}%
                      </text>
                    </svg>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block">Top Speed:</span>
                        <span className="font-bold text-white">{mediaSpecs.speed}</span>
                      </div>
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block">Max Reach:</span>
                        <span className="font-bold text-white">{mediaSpecs.maxDist}</span>
                      </div>
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 col-span-2">
                        <span className="text-slate-400 block">Typical ICSE Application:</span>
                        <span className="font-bold text-cyan-300">{mediaSpecs.desc}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: SMART ROUTER & SWITCH SIMULATOR ─── */}
              {currentSlide === 2 && (
                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex gap-2">
                      <motion.button
                        aria-label="Select Intelligent Switch Mode with MAC Unicast"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setDeviceMode('switch');
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                          deviceMode === 'switch' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'
                        }`}
                      >
                        Mode: Intelligent Switch (MAC Unicast)
                      </motion.button>
                      <motion.button
                        aria-label="Select Blind Hub Mode with Broadcast All"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setDeviceMode('hub');
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                          deviceMode === 'hub' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-400'
                        }`}
                      >
                        Mode: Blind Hub (Broadcast All)
                      </motion.button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Target Node:</span>
                      {(['B', 'C', 'D'] as const).map(target => (
                        <button
                          key={target}
                          aria-label={`Select Target Destination Node ${target}`}
                          onClick={() => setPacketTarget(target)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold ${
                            packetTarget === target ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400'
                          }`}
                        >
                          {target}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SVG Network Topology Simulation */}
                  <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 240" className="w-full bg-slate-950 rounded-xl">
                      {/* Lines from Center to Nodes */}
                      <line x1="120" y1="120" x2="300" y2="120" stroke="#475569" strokeWidth="3" />
                      <line x1="300" y1="120" x2="480" y2="50" stroke="#475569" strokeWidth="3" />
                      <line x1="300" y1="120" x2="480" y2="120" stroke="#475569" strokeWidth="3" />
                      <line x1="300" y1="120" x2="480" y2="190" stroke="#475569" strokeWidth="3" />

                      {/* Source Node A */}
                      <circle cx="120" cy="120" r="24" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
                      <text x="120" y="125" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                        Node A
                      </text>

                      {/* Central Device */}
                      <rect x="260" y="90" width="80" height="60" rx="12" fill={deviceMode === 'switch' ? '#0f766e' : '#b45309'} />
                      <text x="300" y="120" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                        {deviceMode.toUpperCase()}
                      </text>
                      <text x="300" y="136" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                        {deviceMode === 'switch' ? 'MAC Table' : 'Repeater'}
                      </text>

                      {/* Destination Nodes B, C, D */}
                      {[
                        { id: 'B', y: 50 },
                        { id: 'C', y: 120 },
                        { id: 'D', y: 190 },
                      ].map(n => (
                        <g key={n.id}>
                          <circle
                            cx="480"
                            cy={n.y}
                            r="22"
                            fill={packetTarget === n.id ? '#047857' : '#1e293b'}
                            stroke={packetTarget === n.id ? '#34d399' : '#475569'}
                            strokeWidth="2"
                          />
                          <text x="480" y={n.y + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                            Node {n.id}
                          </text>
                        </g>
                      ))}

                      {/* Animated Packet */}
                      {isPacketSending && (
                        <circle
                          cx={120 + (300 - 120) * (packetProgress / 100)}
                          cy="120"
                          r="7"
                          fill="#facc15"
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                      )}
                    </svg>

                    <div className="mt-3 flex items-center justify-between">
                      <motion.button
                        aria-label={`Transmit network frame from Node A to Node ${packetTarget}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleSendPacket}
                        disabled={isPacketSending}
                        className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs"
                      >
                        {isPacketSending ? 'Transmitting Frame...' : `Transmit Frame from A -> ${packetTarget}`}
                      </motion.button>
                      <span className="text-xs text-slate-400">
                        {deviceMode === 'switch' ? '✓ Isolated Collision Domain per Port' : '⚠️ Broadcast Collision Storm Risk'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: CLOUD COMPUTING SERVICE STACK ─── */}
              {currentSlide === 3 && (
                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {(['saas', 'paas', 'iaas'] as const).map(tier => (
                      <motion.button
                        key={tier}
                        aria-label={`Inspect ${tier.toUpperCase()} cloud service layer`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedCloudTier(tier);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedCloudTier === tier ? 'bg-cyan-950/80 border-cyan-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <p className="text-xs font-bold uppercase">{tier}</p>
                        <p className="text-[10px] text-slate-400">
                          {tier === 'saas' ? 'Software as a Service' : tier === 'paas' ? 'Platform as a Service' : 'Infrastructure as a Service'}
                        </p>
                      </motion.button>
                    ))}
                  </div>

                  {/* Visual Layer Stack Diagram */}
                  <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-slate-300 uppercase">Responsibility Breakdown for {selectedCloudTier.toUpperCase()}</h4>
                    {[
                      { layer: 'Applications & UI', provider: selectedCloudTier === 'saas', customer: selectedCloudTier !== 'saas' },
                      { layer: 'Runtimes & Databases', provider: selectedCloudTier !== 'iaas', customer: selectedCloudTier === 'iaas' },
                      { layer: 'Operating System', provider: selectedCloudTier !== 'iaas', customer: selectedCloudTier === 'iaas' },
                      { layer: 'Servers, Storage, Virtualization', provider: true, customer: false },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                        <span className="font-semibold text-slate-200">{item.layer}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.provider ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-purple-950 text-purple-300 border border-purple-800'}`}>
                          {item.provider ? '✓ Managed by Cloud Provider' : '👤 Managed by You / Customer'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── LAB 5: CSS BOX MODEL & LIVE STYLER ─── */}
              {currentSlide === 4 && (
                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Interactive CSS Sliders */}
                    <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">CSS Box Properties</h4>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Content Width:</span>
                          <span className="font-bold text-cyan-300">{cssContentWidth}px</span>
                        </div>
                        <input
                          type="range"
                          min={120}
                          max={260}
                          value={cssContentWidth}
                          aria-label="Content Width in pixels"
                          onChange={e => setCssContentWidth(Number(e.target.value))}
                          className="w-full accent-cyan-500 cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Padding (Inside Border):</span>
                          <span className="font-bold text-emerald-300">{cssPadding}px</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={40}
                          value={cssPadding}
                          aria-label="Padding in pixels"
                          onChange={e => setCssPadding(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Border Width:</span>
                          <span className="font-bold text-amber-300">{cssBorder}px</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={10}
                          value={cssBorder}
                          aria-label="Border Width in pixels"
                          onChange={e => setCssBorder(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Margin (Outside Border):</span>
                          <span className="font-bold text-purple-300">{cssMargin}px</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={30}
                          value={cssMargin}
                          aria-label="Margin in pixels"
                          onChange={e => setCssMargin(Number(e.target.value))}
                          className="w-full accent-purple-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Live Rendered CSS Element */}
                    <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col items-center justify-center overflow-hidden">
                      <div
                        style={{
                          margin: `${cssMargin}px`,
                          border: `${cssBorder}px solid ${cssBorderColor}`,
                          padding: `${cssPadding}px`,
                          width: `${cssContentWidth}px`,
                          backgroundColor: cssBgColor,
                          color: cssTextColor,
                        }}
                        className="rounded-lg text-center transition-all duration-150 shadow-lg"
                      >
                        <p className="text-xs font-bold">.school-notice</p>
                        <p className="text-[10px] mt-1 opacity-90">Class 8 CS Exam on Friday</p>
                      </div>

                      <div className="mt-4 p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-center w-full">
                        <p className="text-[11px] text-slate-400">
                          Total Width = {cssContentWidth} + ({cssPadding}×2) + ({cssBorder}×2) + ({cssMargin}×2) ={' '}
                          <span className="font-bold text-cyan-300">{totalBoxWidth}px</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              aria-label="Go to Previous Lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to Next Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Launch Free Sandbox Mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-900/50"
              >
                Launch Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-cyan-300">Free Play Sandbox: Digital Engineering Workbench</h3>
              <p className="text-xs text-slate-400 mt-0.5">Manipulate network nodes, test physical media, and live-code CSS with zero grading pressure.</p>
            </div>
            <motion.button
              aria-label="Proceed to Challenge Mode"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-900/50"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Live Packet Animation Canvas */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase">Live Network Packet Canvas Loop</h4>
              <canvas ref={canvasRef} width={400} height={160} className="w-full bg-slate-950 rounded-xl border border-slate-800" />
              <p className="text-[11px] text-slate-400 text-center">Real-time visualization of packet distribution across TCP/IP network routes.</p>
            </div>

            {/* Live CSS Interactive Styler */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase">Live CSS Card Playground</h4>
              <div
                style={{
                  padding: `${cssPadding}px`,
                  margin: `${cssMargin}px auto`,
                  border: `${cssBorder}px solid ${cssBorderColor}`,
                  backgroundColor: cssBgColor,
                  color: cssTextColor,
                  width: `${cssContentWidth}px`,
                }}
                className="rounded-xl text-center shadow-lg transition-all"
              >
                <p className="text-xs font-black">#header-banner</p>
                <p className="text-[10px] opacity-90">ICSE Digital Learning Hub</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                <button
                  aria-label="Set CSS Theme to Sky Blue"
                  onClick={() => setCssBgColor('#0284c7')}
                  className="p-1.5 rounded bg-sky-600 text-white font-bold"
                >
                  Sky Blue Theme
                </button>
                <button
                  aria-label="Set CSS Theme to Emerald"
                  onClick={() => setCssBgColor('#10b981')}
                  className="p-1.5 rounded bg-emerald-600 text-white font-bold"
                >
                  Emerald Theme
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES (Adaptive & Escalating Hints) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-4">
          {/* Progress & Tier Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-cyan-400 font-semibold uppercase tracking-wider">
                Competency: {activeChallenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Active Challenge Card */}
          <motion.div
            key={activeChallenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={wrongShake ? { duration: 0.4 } : { duration: 0.3 }}
            className={`p-5 sm:p-6 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/70 border-rose-500' : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <p className="text-white font-medium text-base mb-4 leading-relaxed">{activeChallenge.question}</p>

            {/* 1. MCQ Challenges */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      className={`p-3.5 rounded-xl text-left text-xs sm:text-sm transition-all border ${
                        showExplanation
                          ? i === activeChallenge.correctIndex
                            ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-500'
                          : 'bg-slate-800/90 hover:bg-slate-700/90 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-bold text-cyan-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                      {showExplanation && (
                        <span className="mr-2 font-bold">
                          {i === activeChallenge.correctIndex ? '✓' : '✗'}
                        </span>
                      )}
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* 2. Drag-Label Challenge */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable device: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-cyan-700 hover:bg-cyan-600 rounded-xl cursor-grab text-white text-xs font-bold shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { slot: 'slot_mac', desc: 'Inspects MAC Addresses (LAN)' },
                    { slot: 'slot_ip', desc: 'Routes by IP Address across WAN' },
                    { slot: 'slot_analog', desc: 'Modulates Analog-Digital Signals' },
                    { slot: 'slot_protocol', desc: 'Translates Differing Network Protocols' },
                  ].map(target => (
                    <div
                      key={target.slot}
                      role="region"
                      aria-label={`Drop target area for: ${target.desc}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.slot)}
                      className="p-3.5 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex justify-between items-center min-h-[54px]"
                    >
                      <span className="text-xs text-slate-400">{target.desc}</span>
                      <span className="px-3 py-1 rounded bg-slate-800 font-bold text-xs text-cyan-300">
                        {droppedLabels[target.slot] ? `✓ ${droppedLabels[target.slot]}` : 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Device Mapping"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Device Map
                </motion.button>
              </div>
            )}

            {/* 3. Drag-Sort Challenge */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === activeChallenge.sortItems.length
                  ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                  : activeChallenge.sortItems
                ).map((item, i) => (
                  <motion.div
                    key={i}
                    role="button"
                    tabIndex={0}
                    aria-label={`Draggable sequence step ${i + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(i))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, i);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 text-xs sm:text-sm text-slate-200 cursor-grab flex items-center gap-2"
                  >
                    <span className="text-cyan-400 font-bold">⋮⋮</span>
                    {item}
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Check Sequence Order"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : activeChallenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* 4. Numeric Challenge */}
            {activeChallenge.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  aria-label={`Enter numeric calculation result in ${activeChallenge.unit || 'units'}`}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value"
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-cyan-400 outline-none w-48"
                />
                <span className="text-slate-400 text-xs">{activeChallenge.unit}</span>
                <motion.button
                  aria-label="Verify Numeric Calculation"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Calculation
                </motion.button>
              </div>
            )}

            {/* 5. Construct Challenge */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add syntax token ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-cyan-900/60 hover:bg-cyan-800 border border-cyan-700 text-cyan-200 rounded-lg text-xs font-mono"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[50px] p-3 bg-slate-950 rounded-xl border border-slate-700 flex flex-wrap gap-2 items-center font-mono text-xs">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-cyan-600 text-white rounded-lg flex items-center gap-1.5">
                      {part}
                      <button
                        aria-label={`Remove syntax token ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-red-300"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-slate-600 font-sans">Click tokens above to construct rule...</span>}
                </div>

                <motion.button
                  aria-label="Check Constructed CSS Syntax"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold"
                >
                  Check Syntax
                </motion.button>
              </div>
            )}

            {/* Explanation / Progressive Disclosure */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 bg-slate-950 rounded-xl border border-cyan-800/60 space-y-3">
                <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Step-by-Step Architectural Solution:</p>
                {activeChallenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs sm:text-sm text-slate-300">
                      <span className="font-bold text-cyan-400">{idx + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex justify-between items-center pt-2">
                  {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show Next Explanation Step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-3 py-1.5 bg-cyan-900/60 text-cyan-200 border border-cyan-700 rounded-lg text-xs font-bold"
                    >
                      Show Next Detail →
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  {revealedSteps >= activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Simulation Mission' : 'Go to Next Challenge'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-900/50"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission 🏆' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL WORLD ACTIVITY ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-r from-slate-900 via-cyan-950/50 to-slate-900 rounded-2xl border border-cyan-700 text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-black text-white">Mission Accomplished!</h2>
            <p className="text-sm text-slate-300">You have completed the full ICSE Class 8 Computer Science Engineering Simulation.</p>
            <div className="flex justify-center gap-6 pt-2 text-xs">
              <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                <span className="text-slate-400 block">Final Score:</span>
                <span className="text-lg font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                <span className="text-slate-400 block">Mastery Rating:</span>
                <span className="text-lg font-bold text-cyan-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-emerald-400 uppercase">Examiner Assessment</h4>
            <p className="text-xs text-slate-300 mt-1">
              {errors === 0
                ? 'Flawless execution! You have exhibited complete mastery across mobile app paradigms, physical networking topologies, cloud service layers, and CSS syntax.'
                : errors <= 3
                ? 'Strong performance! You have built high-order competency in network routing and cloud stacks.'
                : 'Good effort! Review the misconception profile below to polish your networking device and CSS selector concepts.'}
            </p>
          </div>

          {/* Misconception Tracking Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-4 bg-rose-950/40 rounded-xl border border-rose-800/60 space-y-3">
              <h4 className="text-xs font-bold text-rose-300 uppercase">Targeted Knowledge Clarifications</h4>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                    <p className="text-emerald-400">✓ Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Schedule */}
          <div className="p-4 bg-amber-950/40 rounded-xl border border-amber-800/50 flex items-center gap-3">
            <span className="text-2xl">📅</span>
            <div className="text-xs">
              <span className="font-bold text-amber-300 block">Next Spaced Review Scheduled:</span>
              <span className="text-slate-300">
                Review this module in{' '}
                <strong className="text-amber-300">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </strong>{' '}
                to cement long-term neural recall.
              </span>
            </div>
          </div>

          {/* Real-World Activity Plan */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-cyan-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="font-bold text-cyan-400">{i + 1}.</span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Completed Successfully!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C8_ComputerScienceDevelopmentIntroductionTypesSim;
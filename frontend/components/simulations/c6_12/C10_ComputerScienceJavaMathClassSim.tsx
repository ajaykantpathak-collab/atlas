'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C10_CS_021 = 'c10_cs_021'; // Java Math class
const NODE_C10_CS_022 = 'c10_cs_022'; // Java Wrapper classes (parseInt, parseDouble, toString)
const NODE_C10_CS_023 = 'c10_cs_023'; // Java Scanner class (hasNext, useDelimiter)
const NODE_C10_CS_024 = 'c10_cs_024'; // Java System class & printf formatting
const NODE_C10_CS_025 = 'c10_cs_025'; // Computer ethics (IP, copyright, piracy, plagiarism)
const NODE_C10_CS_026 = 'c10_cs_026'; // Internet security (viruses, worms, trojans, phishing)
const NODE_C10_CS_027 = 'c10_cs_027'; // Cyber safety (firewalls, encryption, backups, 2FA)
const NODE_C10_CS_028 = 'c10_cs_028'; // HTML frames, framesets, internal linking, meta tags
const NODE_C10_CS_029 = 'c10_cs_029'; // HTML CSS intro (inline, internal, external)
const NODE_C10_CS_030 = 'c10_cs_030'; // Web page design project

const ALL_NODE_IDS = [
  NODE_C10_CS_021, NODE_C10_CS_022, NODE_C10_CS_023, NODE_C10_CS_024, NODE_C10_CS_025,
  NODE_C10_CS_026, NODE_C10_CS_027, NODE_C10_CS_028, NODE_C10_CS_029, NODE_C10_CS_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: CyberTech India 2026',
  intro: 'You are the Chief Technology Officer at "Bharat Digiverse" — a cutting-edge educational tech lab in Bengaluru. Your team is engineering core Java computational engines, implementing airtight cybersecurity and ethics protocols, and crafting modern interactive web portals for lakhs of ICSE schools across India.',
  context: 'Your challenge spans the entire software engineering lifecycle: executing high-precision Java Math and token processing routines, thwarting sophisticated cyber threats, enforcing copyright laws, and architecting elegant multi-section web portals.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In Java, an ICSE student writes: int roll = (int)(Math.random() * 6);. What numbers can roll actually store?',
  options: [
    'Integers from 1 to 6 inclusive (perfect for a standard Ludo die)',
    'Integers from 0 to 5 inclusive (never produces a 6!)',
    'Decimal numbers between 0.0 and 5.999',
    'Integers from 0 to 6 inclusive',
  ],
  correctIndex: 1,
  hintAfter: "Math.random() generates [0.0, 1.0). Multiplying by 6 gives [0.0, 6.0). Truncating with (int) yields 0, 1, 2, 3, 4, or 5! To simulate a die, you must shift with + 1.",
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

// ─── 22 CHALLENGES ARRAY ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_cs_001',
    nodeId: NODE_C10_CS_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why can we call Math.sqrt(144.0) directly in Java without writing Math m = new Math();?',
    options: [
      'Because Math methods are static and belong directly to the class in java.lang',
      'Because Math is an interface and cannot have constructors',
      'Because Java automatically executes new Math() behind the scenes',
      'Because sqrt is a primitive data keyword in Java',
    ],
    correctIndex: 0,
    explanation: 'The Math class in java.lang contains static utility methods. They belong to the class itself and are invoked as ClassName.methodName(). Math also has a private constructor to prevent instantiation.',
    hints: [
      'Consider the keyword used for methods that do not require an object instance.',
      'Static methods belong to the class, not to an object.',
      'Math methods are static utility methods accessible via ClassName.methodName().',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_cs_002',
    nodeId: NODE_C10_CS_021,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Evaluate the exact mathematical result of: Math.pow(3, 2) + Math.abs(-16) / Math.sqrt(16.0)',
    correctAnswer: 13,
    tolerance: 0.1,
    unit: 'double value',
    explanation: 'Math.pow(3, 2) evaluates to 9.0. Math.abs(-16) evaluates to 16. Math.sqrt(16.0) evaluates to 4.0. 16 / 4.0 = 4.0. Finally, 9.0 + 4.0 = 13.0.',
    hints: [
      'Solve operator by operator following BODMAS precedence.',
      'Math.pow(3, 2) = 9.0, Math.abs(-16) = 16, Math.sqrt(16.0) = 4.0.',
      'Perform division first: 16 / 4.0 = 4.0, then add to 9.0 to get 13.0.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_cs_003',
    nodeId: NODE_C10_CS_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A student in Kolkata executes Integer.parseInt("12.5"). What happens at runtime and why?',
    options: [
      'It truncates the decimal and returns int 12',
      'It throws a NumberFormatException because parseInt strictly expects integer literals without decimal points',
      'It automatically promotes the result to double 12.5',
      'It returns 0 and logs a warning',
    ],
    correctIndex: 1,
    explanation: 'Integer.parseInt() parses strictly whole numbers in base-10 string format. The presence of a decimal point "." causes it to immediately throw a NumberFormatException. To parse decimals, Double.parseDouble() must be used.',
    hints: [
      'Does int store decimal/fractional parts in Java?',
      'parseInt expects clean whole-number digit sequences.',
      'Any invalid character like a dot in parseInt triggers NumberFormatException.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_cs_004',
    nodeId: NODE_C10_CS_022,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the Java statement that parses a string markStr = "94" into a primitive int variable marks.',
    availableParts: ['int marks =', 'Integer.parseInt(markStr);', 'Double.parseDouble(markStr);', 'markStr.parseInt();', 'Integer.valueOf(markStr);'],
    targetState: 'int marks = Integer.parseInt(markStr);',
    validationHint: 'Assemble the primitive declaration and static wrapper parsing call.',
    explanation: 'Integer.parseInt(markStr) is the static method that converts a numeric String into a primitive int.',
    hints: [
      'Start with the primitive declaration "int marks =".',
      'Call the static method on the Integer class.',
      'Select "int marks =" followed by "Integer.parseInt(markStr);".',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_cs_005',
    nodeId: NODE_C10_CS_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A Scanner stream holds: "Bengaluru 560001". If code calls sc.next() followed by sc.nextInt(), what is stored?',
    options: [
      'sc.next() gets "Bengaluru" and sc.nextInt() gets 560001',
      'sc.next() gets "Bengaluru 560001" and sc.nextInt() throws NoSuchElementException',
      'sc.next() gets "Bengaluru" and sc.nextInt() throws InputMismatchException',
      'Both calls throw runtime exceptions',
    ],
    correctIndex: 0,
    explanation: 'next() delimits by whitespace and consumes the single word "Bengaluru". The cursor rests right before "560001". Next, nextInt() reads 560001 as an integer.',
    hints: [
      'Remember that next() stops at the first whitespace boundary.',
      'After next() reads "Bengaluru", what is the remaining token in the stream?',
      'The remaining token "560001" is successfully parsed by nextInt().',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_cs_006',
    nodeId: NODE_C10_CS_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A CSV student record is: "Roll102,Meera,98.5". You run sc.useDelimiter(",");. What method call correctly extracts the marks?',
    options: [
      'sc.nextLine()',
      'sc.nextDouble() after consuming the first two tokens with sc.next()',
      'sc.nextInt() directly',
      'Double.parseDouble(sc.nextLine())',
    ],
    correctIndex: 1,
    explanation: 'With delimiter ",", tokens are "Roll102", "Meera", and "98.5". After consuming the first two strings with sc.next(), sc.nextDouble() parses 98.5 as a double.',
    hints: [
      'useDelimiter(",") splits the stream at commas into separate tokens.',
      'How many tokens precede the marks value?',
      'Two tokens precede marks, so call sc.next() twice then sc.nextDouble().',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_cs_007',
    nodeId: NODE_C10_CS_024,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In System.out.printf(), which format specifier represents a floating-point number rounded with 2 decimal places?',
    options: ['%2d', '%.2f', '%2s', '%f.2'],
    correctIndex: 1,
    explanation: 'In the syntax %[flags][width][.precision]conversion-character, %.2f specifies 2 digits after the decimal point for float/double numbers.',
    hints: [
      'The dot prefix represents precision.',
      'f is the conversion character for floating point decimals.',
      'Combine dot, precision 2, and f to get %.2f.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_cs_008',
    nodeId: NODE_C10_CS_024,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the exact output of: System.out.printf("%-8s: %05d%n", "Total", 42);?',
    options: [
      '"Total   : 00042" followed by a newline',
      '"   Total: 42000" followed by a newline',
      '"Total: 00042" with no spacing',
      '"Total   :    42" followed by a newline',
    ],
    correctIndex: 0,
    explanation: '%-8s left-aligns "Total" with 3 trailing spaces (8 chars total). %05d right-aligns 42 padded with leading zeros to width 5 (00042). %n prints a platform-neutral newline.',
    hints: [
      'The minus flag in %-8s enforces left-alignment in an 8-character field.',
      'The 0 flag in %05d pads leading spaces with zeros up to width 5.',
      '"Total" (5 chars) + 3 spaces = 8 cols, then ": ", then "00042".',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_cs_009',
    nodeId: NODE_C10_CS_025,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Distinguish between Plagiarism and Copyright Infringement in ICSE Computer Applications.',
    options: [
      'Plagiarism is an ethical breach of claiming another’s work without attribution; Copyright Infringement is a legal violation of unauthorized copying/distribution',
      'Plagiarism only applies to software, while Copyright Infringement applies to printed books',
      'Plagiarism is punishable by 10 years in prison, while Copyright Infringement carries no penalty',
      'Both terms mean the exact same legal offence in India',
    ],
    correctIndex: 0,
    explanation: 'Plagiarism is fundamentally an ethical violation regarding honesty and proper attribution. Copyright Infringement is a statutory violation of the Indian Copyright Act 1957 concerning legal property rights.',
    hints: [
      'One is an academic/moral breach of honesty (taking credit).',
      'The other is a legal violation of copying protected material without permission.',
      'Plagiarism = attribution failure; Copyright infringement = legal property violation.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_cs_010',
    nodeId: NODE_C10_CS_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A computer lab buys a single-user license of photo-editing software and installs it on 25 lab machines. What piracy form is this?',
    options: ['Softlifting', 'Counterfeiting', 'Phishing', 'Online Cracking'],
    correctIndex: 0,
    explanation: 'Softlifting is installing a single legally purchased software license onto multiple computers in violation of the End User License Agreement (EULA).',
    hints: [
      'Think of sharing a single license across multiple computers in an office or lab.',
      'It is not manufacturing fake packaging (counterfeiting).',
      'Installing one license on multiple machines without permission is softlifting.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_cs_011',
    nodeId: NODE_C10_CS_026,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Drag each cybersecurity threat label to its matching behavioral profile.',
    dragItems: [
      { label: 'Virus', targetId: 'slot_virus' },
      { label: 'Worm', targetId: 'slot_worm' },
      { label: 'Trojan', targetId: 'slot_trojan' },
      { label: 'Phishing', targetId: 'slot_phishing' },
    ],
    correctMapping: {
      slot_virus: 'Virus',
      slot_worm: 'Worm',
      slot_trojan: 'Trojan',
      slot_phishing: 'Phishing',
    },
    explanation: 'Viruses need host files; Worms are standalone self-replicating network threats; Trojans disguise as legitimate tools to create backdoors; Phishing uses deceptive communication to steal credentials.',
    hints: [
      'Host-dependent parasite = Virus.',
      'Standalone self-replicating network worm = Worm.',
      'Disguised program creating backdoor = Trojan; Social engineering scam = Phishing.',
    ],
  },
  {
    id: 'ch_cs_012',
    nodeId: NODE_C10_CS_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'An Indian banking customer receives an urgent SMS: "Your SBI card is blocked! Update Aadhaar at http://sbi-secure-update.xyz". What threat is this?',
    options: [
      'Phishing / Social Engineering attack aimed at credential & identity theft',
      'Macro virus attacking mobile operating system storage',
      'Polymorphic boot sector worm',
      'Symmetric key encryption failure',
    ],
    correctIndex: 0,
    explanation: 'This is a classic phishing attack using urgency and a fraudulent domain to trick the victim into disclosing sensitive banking/Aadhaar credentials.',
    hints: [
      'Notice the fake URL and urgent tone requesting personal banking credentials.',
      'It targets human psychology rather than exploiting software code directly.',
      'Deceptive messages imitating trusted institutions represent Phishing.',
    ],
  },
  {
    id: 'ch_cs_013',
    nodeId: NODE_C10_CS_027,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does a Firewall differ from an Antivirus software program?',
    options: [
      'A firewall monitors & filters incoming/outgoing network traffic based on security rules, while antivirus scans files to detect and quarantine malware',
      'A firewall deletes computer viruses from USB pen drives',
      'Antivirus only runs in web browsers, while firewalls run in Java',
      'They perform the exact same function with different names',
    ],
    correctIndex: 0,
    explanation: 'A firewall is a network gatekeeper that inspects packets across ports and protocols. Antivirus inspects files and processes locally to neutralize malware signatures and malicious behaviors.',
    hints: [
      'Think network traffic barrier vs file scanner.',
      'A firewall checks network packets at communication ports.',
      'Firewall = network traffic barrier; Antivirus = file & malware cleaner.',
    ],
  },
  {
    id: 'ch_cs_014',
    nodeId: NODE_C10_CS_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In asymmetric encryption used in secure Indian HTTPS transactions, which key is kept strictly private by the server?',
    options: [
      'The Private Key (used to decrypt or sign data)',
      'The Public Key (shared freely with all clients)',
      'The Symmetric Session Hash',
      'The Plaintext Password',
    ],
    correctIndex: 0,
    explanation: 'In asymmetric encryption, the Public Key is distributed to any client to encrypt data, but only the server holds the matching secret Private Key to decrypt it.',
    hints: [
      'Asymmetric cryptography uses a public/private key pair.',
      'Public keys encrypt data; secret keys decrypt.',
      'The private key must remain strictly confidential on the server.',
    ],
  },
  {
    id: 'ch_cs_015',
    nodeId: NODE_C10_CS_027,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order these backup recovery steps from the starting full backup to an incremental restoration sequence.',
    sortItems: [
      'Restore the primary Full Backup image',
      'Apply Incremental Backup Day 1',
      'Apply Incremental Backup Day 2',
      'Validate data integrity and resume operations',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Restoring after incremental backups requires first restoring the baseline Full Backup, then applying every sequential incremental backup in chronological order.',
    hints: [
      'You must always start with the foundational Full Backup.',
      'Next, apply changes day by day in historical order.',
      'Order: Full Backup -> Day 1 Incremental -> Day 2 Incremental -> Validate.',
    ],
  },
  {
    id: 'ch_cs_016',
    nodeId: NODE_C10_CS_028,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In an HTML frameset document, which standard HTML tag is completely replaced by <frameset>?',
    options: ['<body>', '<head>', '<title>', '<html>'],
    correctIndex: 0,
    explanation: 'In frameset documents, <frameset> replaces the <body> element. A <body> tag is only permitted inside the nested <noframes> fallback container.',
    hints: [
      'The frameset defines the entire display canvas.',
      'You cannot have a standard page body alongside the frameset container.',
      '<frameset> replaces the <body> tag entirely.',
    ],
  },
  {
    id: 'ch_cs_017',
    nodeId: NODE_C10_CS_028,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A link inside a left frame has <a href="about.html" target="_top">. What happens when clicked?',
    options: [
      'It breaks out of all frames and loads about.html into the full browser window',
      'It loads about.html inside the current left frame',
      'It opens a new pop-up tab',
      'It scrolls to the top of the current frame',
    ],
    correctIndex: 0,
    explanation: 'target="_top" removes the entire frameset hierarchy and loads the target document in the topmost, full window viewport.',
    hints: [
      '_self = current frame, _blank = new tab/window.',
      'What does _top do to the frame structure?',
      '_top breaks out of all frames and occupies the full window.',
    ],
  },
  {
    id: 'ch_cs_018',
    nodeId: NODE_C10_CS_028,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct an internal bookmark link that jumps directly to the section with id="awards".',
    availableParts: ['<a href="#awards">', '<a href="awards">', '<a target="awards">', 'View Awards', '</a>'],
    targetState: '<a href="#awards"> View Awards </a>',
    validationHint: 'Use the anchor tag with hash symbol prefix inside the href attribute.',
    explanation: 'Internal document hyperlinks must prefix the destination id or name with a hash "#", as in <a href="#awards">View Awards</a>.',
    hints: [
      'Internal links require a hash symbol "#" before the id name.',
      'Wrap anchor text inside opening and closing <a> tags.',
      'Assemble: <a href="#awards"> View Awards </a>.',
    ],
  },
  {
    id: 'ch_cs_019',
    nodeId: NODE_C10_CS_029,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which CSS selector syntax specifically targets an element with id="header"?',
    options: ['#header', '.header', 'header', '*header'],
    correctIndex: 0,
    explanation: 'In CSS, id selectors are prefixed with a hash "#", while class selectors are prefixed with a dot "." and element selectors use the bare tag name.',
    hints: [
      'Dot is for classes.',
      'Hash is for unique IDs.',
      '#header targets id="header".',
    ],
  },
  {
    id: 'ch_cs_020',
    nodeId: NODE_C10_CS_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'When multiple conflicting CSS rules apply to the same paragraph, which styling method has the highest priority?',
    options: [
      'Inline style attribute written directly inside the tag',
      'Internal style block inside <head>',
      'External .css stylesheet file',
      'Browser default user-agent stylesheet',
    ],
    correctIndex: 0,
    explanation: 'CSS specificity order grants highest priority to Inline styles (style="..."), followed by ID selectors, Class selectors, and Element selectors.',
    hints: [
      'Which style is physically closest to the element being styled?',
      'Styles written inside the element tag override head/external styles.',
      'Inline styles have the highest specificity priority.',
    ],
  },
  {
    id: 'ch_cs_021_node',
    nodeId: NODE_C10_CS_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are architecting the "ISRO Chandrayaan Project" portal. Which HTML5 semantic structure is the most professional?',
    options: [
      '<header> with <h1>, <nav> with internal bookmark links, <main> with <section> & <table>, <footer> with copyright',
      'A single <table> wrapping all headings, text, and images with align="center"',
      'Multiple nested <frameset> tags with scrolling="no"',
      'A long sequence of <p style="font-size:20px"> tags without semantic containers',
    ],
    correctIndex: 0,
    explanation: 'Modern clean web standards mandate semantic tags (<header>, <nav>, <main>, <section>, <footer>) coupled with external CSS styling for separation of content and presentation.',
    hints: [
      'Think about accessibility, SEO, and semantic HTML5 tags.',
      'Avoid outdated presentational tables or deprecated framesets.',
      'Semantic structure (<header>, <nav>, <main>, <footer>) is the gold standard.',
    ],
  },
  {
    id: 'ch_cs_022_node',
    nodeId: NODE_C10_CS_030,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why is the alt attribute mandatory on <img src="rover.jpg" alt="Pragyan rover on lunar surface">?',
    options: [
      'It provides alternative text for screen readers and displays descriptive text if the image fails to load',
      'It speeds up the download speed of the image across 4G/5G networks',
      'It automatically changes image brightness in dark mode',
      'It converts JPEG images into vector graphics',
    ],
    correctIndex: 0,
    explanation: 'The alt attribute is vital for web accessibility (WCAG) — screen readers read it to visually impaired users, and browsers render it if image loading fails.',
    hints: [
      'What happens when the image file is missing or a visually impaired person uses a screen reader?',
      'alt stands for alternative text.',
      'It provides descriptive text for accessibility and broken image fallback.',
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
  nodeId: NODE_C10_CS_021,
  title: 'Java Math Class & Advanced Computer Science Lab',
  definition: 'Comprehensive mastery of Java Math utility methods, Wrapper classes, Scanner tokenization, output formatting with printf, computer ethics, cyber defense protocols, HTML framesets, and CSS architecture for ICSE Class 10.',
  eli5: 'Think of Java as your Swiss Army knife for calculation and data reading, cybersecurity as your digital shield, and HTML+CSS as your canvas for building portals.',
  misconceptions: [
    {
      misconception: 'Math methods require creating an object using new Math()',
      correction: 'Math utility methods are static and called as Math.methodName() without instantiating objects.',
    },
    {
      misconception: 'Integer.parseInt() can parse decimal strings like "45.8"',
      correction: 'parseInt() strictly parses integer digits; any decimal point throws a NumberFormatException.',
    },
    {
      misconception: 'Scanner.next() reads an entire sentence up to the Enter key',
      correction: 'next() reads only up to the next whitespace. Use nextLine() to read full lines.',
    },
    {
      misconception: '%d in printf can be used for decimal fractions like 3.14',
      correction: '%d is for decimal integers (int/long). Use %f or %.2f for floating-point fractions.',
    },
    {
      misconception: 'Plagiarism and copyright infringement are identical concepts',
      correction: 'Plagiarism is an ethical breach of failing to attribute; copyright infringement is a legal breach of property rights.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What does Math.abs(-25.5) return?', options: ['-25.5', '25.5', '25', 'Error'], correctIndex: 1 },
    { question: 'Which wrapper class method turns an int into a String?', options: ['Integer.toString(n)', 'n.parseInt()', 'String.toInt(n)', 'Integer.parse()'], correctIndex: 0 },
    { question: 'How do you check if an int token is waiting in Scanner sc?', options: ['sc.hasInt()', 'sc.hasNextInt()', 'sc.checkInt()', 'sc.nextIntExists()'], correctIndex: 1 },
    { question: 'What does %-10s do in printf?', options: ['Right-aligns text', 'Left-aligns string in 10-char width', 'Truncates to 10 chars', 'Prints 10 spaces'], correctIndex: 1 },
    { question: 'Installing 1 licensed software on 20 computers is called:', options: ['Phishing', 'Softlifting', 'Plagiarism', 'Symmetric Hashing'], correctIndex: 1 },
    { question: 'Which malware spreads across networks without needing a host file?', options: ['Virus', 'Worm', 'Macro', 'Trojan'], correctIndex: 1 },
    { question: 'In asymmetric encryption, which key decrypts data encrypted with public key?', options: ['Private Key', 'Public Key', 'Hash key', 'Plaintext key'], correctIndex: 0 },
    { question: 'Which CSS selector selects elements with class="badge"?', options: ['#badge', '.badge', 'badge', '*badge'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates full proficiency across Java Math/Wrappers/Scanner/printf, Cyber safety & Ethics, and HTML/CSS web design.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Java Math & Random Transformation Engine',
    instruction: 'Inspect the mathematical number line, formula equations, and live die roller simultaneously to understand discrete random scaling.',
    interactionType: 'math-live',
    nodeId: NODE_C10_CS_021,
  },
  {
    title: 'Lab 2: Wrapper Class & NumberFormatException Inspector',
    instruction: 'Type different strings into the parser box to observe parseInt vs parseDouble behavior in real-time.',
    interactionType: 'wrapper-inspector',
    nodeId: NODE_C10_CS_022,
  },
  {
    title: 'Lab 3: Scanner Tokenizer & Delimiter Visualizer',
    instruction: 'Toggle between whitespace and comma delimiters to watch how Scanner breaks down input streams.',
    interactionType: 'scanner-tokenizer',
    nodeId: NODE_C10_CS_023,
  },
  {
    title: 'Lab 4: System.out.printf Formatted Table Studio',
    instruction: 'Adjust field width and precision sliders to see real-time column alignment and decimal rounding.',
    interactionType: 'printf-studio',
    nodeId: NODE_C10_CS_024,
  },
  {
    title: 'Lab 5: Cyber Defense, Asymmetric Cryptography & Firewall Simulation',
    instruction: 'Toggle firewall packet filtering and encryption levels to defend against incoming worms and eavesdroppers.',
    interactionType: 'cyber-defense',
    nodeId: NODE_C10_CS_027,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you execute Math.pow(4, 0.5) in Java, what is the returned data type and value?',
    options: ['int with value 2', 'double with value 2.0', 'float with value 2.0f', 'Compile-time error'],
    correctIndex: 1,
    verifyInstruction: 'Notice how Math.pow() always returns a double, even for whole square roots!',
    nodeId: NODE_C10_CS_021,
  },
  {
    question: 'Predict: If an incoming packet targets port 23 (Telnet) while our firewall only permits ports 80 & 443, what happens?',
    options: ['Packet is filtered and dropped', 'Packet bypasses the firewall', 'Packet converts into an HTTP packet', 'Firewall crashes'],
    correctIndex: 0,
    verifyInstruction: 'The packet-filtering firewall strictly blocks traffic not matching permitted ports!',
    nodeId: NODE_C10_CS_027,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about Math.random() as you generate multiple values?',
    observableOptions: [
      'Values are strictly in the range 0.0 <= value < 1.0',
      'Values sometimes reach exactly 1.0',
      'Values include negative numbers',
      'Values are always whole integers',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_CS_021,
  },
  {
    question: 'When switching Scanner delimiter from whitespace to comma ",", what happens to space-separated words?',
    observableOptions: [
      'Space-separated words stay together inside a single token until a comma is reached',
      'Scanner crashes with NoSuchElementException',
      'Spaces are automatically replaced with underscores',
      'Scanner stops reading completely',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_CS_023,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Bharat EdTech Portal Architect Challenge',
  description: 'Design the architecture for your school’s annual science exhibition portal. Incorporate Java backend calculation for attendance marks, implement cyber safety protection against DDoS and phishing, and craft a 4-section responsive HTML/CSS web layout.',
  steps: [
    'Define 3 Java Math formulas for calculating student marks and percentiles',
    'Set up a Scanner CSV reader with custom delimiter "," to parse student roll numbers',
    'Specify Firewall rules and 2FA authentication for the teacher login portal',
    'Draft an HTML wireframe with <header>, <nav>, <main>, and external CSS stylesheet link',
  ],
};

// ─── SVG TOPIC-SPECIFIC DIAGRAM 1: MATH RANDOM & CASTING TRANSFORMATION ───
function MathRandomTransformationSvg({ rawVal }: { rawVal: number }) {
  const scaled = rawVal * 6;
  const truncated = Math.floor(scaled);
  const die = truncated + 1;

  return (
    <svg viewBox="0 0 460 210" className="w-full h-auto bg-slate-950 rounded-2xl border border-slate-800 p-2">
      <defs>
        <linearGradient id="mathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Title */}
      <text x="15" y="22" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">
        [DIAGRAM 1] Java Random Scaling & Truncation Pipeline
      </text>

      {/* Row 1: Math.random() [0.0, 1.0) */}
      <text x="15" y="52" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">1. Math.random()</text>
      <line x1="140" y1="48" x2="360" y2="48" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
      <line x1="140" y1="48" x2={140 + rawVal * 220} stroke="#06b6d4" strokeWidth="6" strokeLinecap="round" />
      <circle cx={140 + rawVal * 220} cy="48" r="7" fill="#22d3ee" filter="url(#glow)" />
      <text x="375" y="52" fill="#06b6d4" fontSize="11" fontWeight="bold" fontFamily="monospace">
        {rawVal.toFixed(3)}
      </text>
      <text x="140" y="65" fill="#64748b" fontSize="8">0.0</text>
      <text x="350" y="65" fill="#64748b" fontSize="8">&lt;1.0</text>

      {/* Row 2: * 6.0 */}
      <text x="15" y="98" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">2. * 6.0</text>
      <line x1="140" y1="94" x2="360" y2="94" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
      <line x1="140" y1="94" x2={140 + (scaled / 6) * 220} stroke="#818cf8" strokeWidth="6" strokeLinecap="round" />
      <circle cx={140 + (scaled / 6) * 220} cy="94" r="7" fill="#818cf8" filter="url(#glow)" />
      <text x="375" y="98" fill="#818cf8" fontSize="11" fontWeight="bold" fontFamily="monospace">
        {scaled.toFixed(3)}
      </text>
      <text x="140" y="111" fill="#64748b" fontSize="8">0.0</text>
      <text x="350" y="111" fill="#64748b" fontSize="8">&lt;6.0</text>

      {/* Row 3: (int) Truncate */}
      <text x="15" y="144" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">3. (int) Cast</text>
      {[0, 1, 2, 3, 4, 5].map((num) => {
        const cx = 140 + (num / 5) * 220;
        const isCurrent = num === truncated;
        return (
          <g key={num}>
            <circle cx={cx} cy="140" r={isCurrent ? "11" : "8"} fill={isCurrent ? "#f59e0b" : "#1e293b"} stroke={isCurrent ? "#fbbf24" : "#475569"} strokeWidth="2" />
            <text x={cx} y="144" fill={isCurrent ? "#000" : "#cbd5e1"} fontSize="10" fontWeight="bold" textAnchor="middle">
              {num}
            </text>
          </g>
        );
      })}
      <text x="375" y="144" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="monospace">
        {truncated}
      </text>

      {/* Row 4: + 1 Die Shift */}
      <text x="15" y="188" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">4. + 1 (Die)</text>
      {[1, 2, 3, 4, 5, 6].map((num) => {
        const cx = 140 + ((num - 1) / 5) * 220;
        const isCurrent = num === die;
        return (
          <g key={num}>
            <rect x={cx - 11} y="174" width="22" height="22" rx="4" fill={isCurrent ? "#10b981" : "#0f172a"} stroke={isCurrent ? "#34d399" : "#334155"} strokeWidth="2" />
            <text x={cx} y="189" fill={isCurrent ? "#fff" : "#94a3b8"} fontSize="11" fontWeight="bold" textAnchor="middle">
              {num}
            </text>
          </g>
        );
      })}
      <text x="375" y="190" fill="#10b981" fontSize="12" fontWeight="bold" fontFamily="monospace">
        🎲 {die}
      </text>
    </svg>
  );
}

// ─── SVG TOPIC-SPECIFIC DIAGRAM 2: ASYMMETRIC ENCRYPTION & FIREWALL INSPECTION ───
function CyberSecurityPipelineSvg({ firewallActive, encryptionActive }: { firewallActive: boolean; encryptionActive: boolean }) {
  return (
    <svg viewBox="0 0 500 200" className="w-full h-auto bg-slate-950 rounded-2xl border border-slate-800 p-2">
      <defs>
        <marker id="arrowCyber" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#38bdf8" />
        </marker>
      </defs>

      <text x="15" y="22" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">
        [DIAGRAM 2] Asymmetric HTTPS Encryption & Packet Filtering Firewall
      </text>

      {/* Client Node */}
      <rect x="20" y="60" width="90" height="70" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
      <text x="65" y="85" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">ICSE Client</text>
      <text x="65" y="102" fill="#94a3b8" fontSize="8" textAnchor="middle">Plaintext Msg</text>
      <text x="65" y="116" fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="middle">"Score: 98"</text>

      {/* Arrow 1 */}
      <line x1="115" y1="95" x2="155" y2="95" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowCyber)" />

      {/* Public Key Encryption Box */}
      <rect x="160" y="55" width="85" height="80" rx="8" fill={encryptionActive ? "#1e1b4b" : "#450a0a"} stroke={encryptionActive ? "#6366f1" : "#f43f5e"} strokeWidth="2" />
      <text x="202" y="75" fill={encryptionActive ? "#a5b4fc" : "#fda4af"} fontSize="10" fontWeight="bold" textAnchor="middle">Public Key</text>
      <text x="202" y="92" fill="#94a3b8" fontSize="8" textAnchor="middle">{encryptionActive ? "RSA-2048" : "Disabled"}</text>
      <text x="202" y="112" fill={encryptionActive ? "#22c55e" : "#fb7185"} fontSize="9" fontFamily="monospace" textAnchor="middle">
        {encryptionActive ? "🔒 8fA#9!" : "⚠️ Plaintext"}
      </text>

      {/* Arrow 2 */}
      <line x1="250" y1="95" x2="280" y2="95" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowCyber)" />

      {/* Firewall Box */}
      <rect x="285" y="45" width="85" height="100" rx="8" fill={firewallActive ? "#064e3b" : "#451a03"} stroke={firewallActive ? "#10b981" : "#f59e0b"} strokeWidth="2" />
      <text x="327" y="68" fill={firewallActive ? "#6ee7b7" : "#fde68a"} fontSize="11" fontWeight="bold" textAnchor="middle">Firewall</text>
      <text x="327" y="85" fill="#94a3b8" fontSize="8" textAnchor="middle">Port Filter</text>
      <rect x="295" y="95" width="65" height="18" rx="4" fill="#022c22" />
      <text x="327" y="108" fill={firewallActive ? "#34d399" : "#f87171"} fontSize="8" fontFamily="monospace" textAnchor="middle">
        {firewallActive ? "Port 443 OK" : "All Open"}
      </text>
      <text x="327" y="132" fill="#94a3b8" fontSize="7" textAnchor="middle">Drops Port 445/23</text>

      {/* Arrow 3 */}
      <line x1="375" y1="95" x2="400" y2="95" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowCyber)" />

      {/* Server Node with Private Key */}
      <rect x="405" y="60" width="85" height="70" rx="8" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2" />
      <text x="447" y="83" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">Server</text>
      <text x="447" y="100" fill="#a78bfa" fontSize="8" textAnchor="middle">Private Key 🔑</text>
      <text x="447" y="116" fill="#4ade80" fontSize="8" fontFamily="monospace" textAnchor="middle">Decrypted OK</text>

      {/* Bottom Summary Banner */}
      <rect x="20" y="160" width="460" height="26" rx="6" fill="#0f172a" stroke="#1e293b" />
      <text x="250" y="177" fill="#94a3b8" fontSize="9" textAnchor="middle">
        Rule: Public key encrypts data in transit; ONLY the server's Private Key can decrypt.
      </text>
    </svg>
  );
}

// ─── SVG TOPIC-SPECIFIC DIAGRAM 3: HTML5 SEMANTIC ARCHITECTURE & CSS HIERARCHY ───
function HtmlSemanticArchitectureSvg({ themeColor, fontSize }: { themeColor: string; fontSize: number }) {
  return (
    <svg viewBox="0 0 480 220" className="w-full h-auto bg-slate-950 rounded-2xl border border-slate-800 p-2">
      <text x="15" y="22" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">
        [DIAGRAM 3] HTML5 Semantic Layout Hierarchy & CSS Priority Flow
      </text>

      {/* Web Layout Outer Canvas */}
      <rect x="20" y="40" width="260" height="165" rx="8" fill="#090d16" stroke="#334155" strokeWidth="2" />
      
      {/* <header> */}
      <rect x="30" y="48" width="240" height="30" rx="4" fill="#1e293b" stroke={themeColor} strokeWidth="1.5" />
      <text x="40" y="67" fill={themeColor} fontSize="10" fontWeight="bold">&lt;header&gt; #header</text>
      <text x="210" y="67" fill="#64748b" fontSize="8">title & logo</text>

      {/* <nav> */}
      <rect x="30" y="82" width="240" height="22" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1" />
      <text x="40" y="97" fill="#38bdf8" fontSize="9">&lt;nav&gt; &lt;a href="#about"&gt;Bookmark Links&lt;/a&gt;</text>

      {/* <main> with <section> & <table> */}
      <rect x="30" y="108" width="240" height="68" rx="4" fill="#111827" stroke="#374151" strokeWidth="1" />
      <text x="38" y="123" fill="#a5b4fc" fontSize="9">&lt;main&gt; Core Web Content</text>

      {/* Nested <section> */}
      <rect x="38" y="128" width="105" height="42" rx="3" fill="#1f2937" stroke="#4b5563" />
      <text x="44" y="142" fill="#e2e8f0" fontSize="8">&lt;section id="intro"&gt;</text>
      <text x="44" y="156" fill="#94a3b8" fontSize="7">&lt;p&gt; Paragraph &lt;/p&gt;</text>

      {/* Nested <table> */}
      <rect x="150" y="128" width="112" height="42" rx="3" fill="#1f2937" stroke="#4b5563" />
      <text x="156" y="142" fill="#34d399" fontSize="8">&lt;table border="1"&gt;</text>
      <text x="156" y="156" fill="#94a3b8" fontSize="7">&lt;tr&gt;&lt;th&gt;&lt;td&gt; Rows&lt;/td&gt;</text>

      {/* <footer> */}
      <rect x="30" y="180" width="240" height="20" rx="3" fill="#1e293b" stroke="#334155" />
      <text x="40" y="194" fill="#94a3b8" fontSize="8">&lt;footer&gt; &copy; 2026 Bharat Digiverse &lt;/footer&gt;</text>

      {/* Right Column: CSS Specificity Waterfall */}
      <rect x="295" y="40" width="170" height="165" rx="8" fill="#0f172a" stroke="#1e293b" />
      <text x="310" y="58" fill="#f59e0b" fontSize="10" fontWeight="bold">CSS Specificity Rank</text>
      
      {/* 1. Inline */}
      <rect x="305" y="68" width="150" height="26" rx="4" fill="#451a03" stroke="#f59e0b" strokeWidth="1" />
      <text x="312" y="81" fill="#fde68a" fontSize="8" fontWeight="bold">1. Inline style="..."</text>
      <text x="312" y="90" fill="#fcd34d" fontSize="7">Highest Priority Override</text>

      {/* 2. ID Selector */}
      <rect x="305" y="98" width="150" height="24" rx="4" fill="#1e1b4b" stroke="#6366f1" />
      <text x="312" y="111" fill="#c7d2fe" fontSize="8" fontWeight="bold">2. ID Selector (#header)</text>
      <text x="312" y="119" fill="#a5b4fc" fontSize="7">Weight: 0,1,0,0</text>

      {/* 3. Class Selector */}
      <rect x="305" y="126" width="150" height="24" rx="4" fill="#083344" stroke="#06b6d4" />
      <text x="312" y="139" fill="#a5f3fc" fontSize="8" fontWeight="bold">3. Class Selector (.card)</text>
      <text x="312" y="147" fill="#67e8f9" fontSize="7">Weight: 0,0,1,0</text>

      {/* 4. Element Tag */}
      <rect x="305" y="154" width="150" height="24" rx="4" fill="#14231b" stroke="#22c55e" />
      <text x="312" y="167" fill="#bbf7d0" fontSize="8" fontWeight="bold">4. Element Tag (p, div)</text>
      <text x="312" y="175" fill="#86efac" fontSize="7">Lowest Specificity</text>
    </svg>
  );
}

// ─── MULTI-REPRESENTATION COMPONENT (Equation + Truth/Data Table + Visual Diagram) ───
function MultiRepresentationPanel({ rawVal, base, exp }: { rawVal: number; base: number; exp: number }) {
  const [activeRepTab, setActiveRepTab] = useState<'equation' | 'table' | 'diagram'>('diagram');

  return (
    <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Multi-Representation Inspector</span>
          <h4 className="text-sm font-bold text-white">Same Concept via 3 Independent Formats</h4>
        </div>
        <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveRepTab('diagram')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              activeRepTab === 'diagram' ? 'bg-gold-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            📊 Visual SVG
          </button>
          <button
            onClick={() => setActiveRepTab('equation')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              activeRepTab === 'equation' ? 'bg-gold-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            📐 Equation Model
          </button>
          <button
            onClick={() => setActiveRepTab('table')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              activeRepTab === 'table' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            🔢 Output Matrix
          </button>
        </div>
      </div>

      {activeRepTab === 'diagram' && (
        <div className="space-y-2">
          <MathRandomTransformationSvg rawVal={rawVal} />
          <p className="text-[11px] text-slate-400">
            <strong>Representation 1 (Visual Continuum):</strong> Shows the continuous range [0.0, 1.0) expanding to [0.0, 6.0), then collapsing into discrete integer slots 0..5 and shifting to 1..6.
          </p>
        </div>
      )}

      {activeRepTab === 'equation' && (
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
          <div className="text-slate-400 font-sans text-xs font-bold mb-1">
            Representation 2 (Mathematical Inequality Transformation):
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-gold-300">
            <div>1. Standard Raw Range: 0.0 &le; r &lt; 1.0</div>
            <div>2. Multiplied by 6.0: 0.0 &le; 6r &lt; 6.0</div>
            <div>3. Integer Truncation: &lfloor;6r&rfloor; &isin; &#123;0, 1, 2, 3, 4, 5&#125;</div>
            <div className="text-emerald-400 font-bold">4. Die Shift (+1): &lfloor;6r&rfloor; + 1 &isin; &#123;1, 2, 3, 4, 5, 6&#125;</div>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-gold-300 space-y-1">
            <div>Math.pow({base}, {exp}) Equation: {base}^{exp} = {Math.pow(base, exp).toFixed(1)}</div>
            <div>Math.sqrt({base}) Equation: &radic;{base} = {Math.sqrt(base).toFixed(4)}</div>
          </div>
        </div>
      )}

      {activeRepTab === 'table' && (
        <div className="space-y-2">
          <div className="text-slate-400 font-sans text-xs font-bold mb-1">
            Representation 3 (Discrete Boundary Mapping Table):
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <th className="p-2">Raw Range (Math.random())</th>
                  <th className="p-2">* 6 Range</th>
                  <th className="p-2">(int) Truncate</th>
                  <th className="p-2 text-emerald-400">+ 1 Die Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className={rawVal >= 0 && rawVal < 1/6 ? "bg-gold-950/40 text-gold-300 font-bold" : ""}>
                  <td className="p-2">[0.000, 0.166)</td>
                  <td className="p-2">[0.00, 1.00)</td>
                  <td className="p-2">0</td>
                  <td className="p-2 text-emerald-400 font-bold">1</td>
                </tr>
                <tr className={rawVal >= 1/6 && rawVal < 2/6 ? "bg-gold-950/40 text-gold-300 font-bold" : ""}>
                  <td className="p-2">[0.166, 0.333)</td>
                  <td className="p-2">[1.00, 2.00)</td>
                  <td className="p-2">1</td>
                  <td className="p-2 text-emerald-400 font-bold">2</td>
                </tr>
                <tr className={rawVal >= 2/6 && rawVal < 3/6 ? "bg-gold-950/40 text-gold-300 font-bold" : ""}>
                  <td className="p-2">[0.333, 0.500)</td>
                  <td className="p-2">[2.00, 3.00)</td>
                  <td className="p-2">2</td>
                  <td className="p-2 text-emerald-400 font-bold">3</td>
                </tr>
                <tr className={rawVal >= 3/6 && rawVal < 4/6 ? "bg-gold-950/40 text-gold-300 font-bold" : ""}>
                  <td className="p-2">[0.500, 0.666)</td>
                  <td className="p-2">[3.00, 4.00)</td>
                  <td className="p-2">3</td>
                  <td className="p-2 text-emerald-400 font-bold">4</td>
                </tr>
                <tr className={rawVal >= 4/6 && rawVal < 5/6 ? "bg-gold-950/40 text-gold-300 font-bold" : ""}>
                  <td className="p-2">[0.666, 0.833)</td>
                  <td className="p-2">[4.00, 5.00)</td>
                  <td className="p-2">4</td>
                  <td className="p-2 text-emerald-400 font-bold">5</td>
                </tr>
                <tr className={rawVal >= 5/6 && rawVal < 1.0 ? "bg-gold-950/40 text-gold-300 font-bold" : ""}>
                  <td className="p-2">[0.833, 1.000)</td>
                  <td className="p-2">[5.00, 6.00)</td>
                  <td className="p-2">5</td>
                  <td className="p-2 text-emerald-400 font-bold">6</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN SIMULATION COMPONENT ───
export function C10_ComputerScienceJavaMathClassSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['compsci'] || { name: 'Computer Science', emoji: '💻', color: 'cyan' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org patterns & Interactive state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Lab Variables
  const [mathBase, setMathBase] = useState(4);
  const [mathExp, setMathExp] = useState(2);
  const [randomRoll, setRandomRoll] = useState<number | null>(null);
  const [dieRollHistory, setDieRollHistory] = useState<number[]>([]);
  const [rawRandomVal, setRawRandomVal] = useState(0.542);
  const [parseInputStr, setParseInputStr] = useState('144');
  const [parseMode, setParseMode] = useState<'int' | 'double'>('int');
  const [scannerDelimiter, setScannerDelimiter] = useState<'space' | 'comma'>('space');
  const [scannerSampleInput, setScannerSampleInput] = useState('Aarav 95 Kolkata');
  const [printfWidth, setPrintfWidth] = useState(8);
  const [printfPrecision, setPrintfPrecision] = useState(2);
  const [printfAlignLeft, setPrintfAlignLeft] = useState(true);
  const [firewallActive, setFirewallActive] = useState(true);
  const [encryptionActive, setEncryptionActive] = useState(true);
  const [packetCount, setPacketCount] = useState({ blocked: 0, allowed: 0 });
  const [networkLog, setNetworkLog] = useState<string[]>([]);
  const [htmlTab, setHtmlTab] = useState<'preview' | 'html' | 'css'>('preview');
  const [cssThemeColor, setCssThemeColor] = useState('#0284c7');
  const [cssFontSize, setCssFontSize] = useState(16);
  const [cssPadding, setCssPadding] = useState(12);

  // Reflection responses state
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');
  const [reflectionsSaved, setReflectionsSaved] = useState(false);

  // Adaptive difficulty & Mastery state
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

  // Drag-and-drop & Construction state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback & Animation state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
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

  // ─── CANVAS 2D ANIMATION EFFECT ───
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

      // Glowing grid
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.moveTo(i, 0);
        ctx.lineTo(canvas.height ? canvas.width : 0, 0);
      }
      for (let j = 0; j < canvas.height; j += 40) {
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
      }
      ctx.globalAlpha = 0.12;
      ctx.stroke();
      ctx.globalAlpha = 1.0;

      // Pulsing data nodes
      const nodeX1 = 60 + Math.sin(frame * 0.04) * 15;
      const nodeY1 = 40 + Math.cos(frame * 0.04) * 10;
      const nodeX2 = canvas.width - 60 - Math.sin(frame * 0.03) * 15;
      const nodeY2 = 40 + Math.sin(frame * 0.03) * 10;

      // Data beam
      ctx.beginPath();
      ctx.moveTo(nodeX1, nodeY1);
      ctx.lineTo(nodeX2, nodeY2);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Packet pulse
      const t = (frame % 100) / 100;
      const px = nodeX1 + (nodeX2 - nodeX1) * t;
      const py = nodeY1 + (nodeY2 - nodeY1) * t;

      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fillStyle = firewallActive ? '#22c55e' : '#f43f5e';
      ctx.shadowColor = firewallActive ? '#22c55e' : '#f43f5e';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Nodes
      ctx.beginPath();
      ctx.arc(nodeX1, nodeY1, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(nodeX2, nodeY2, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#818cf8';
      ctx.fill();

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [firewallActive]);

  // ─── ESCALATING HINTS CALLBACK ───
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

  // ─── DISCOVERY HANDLER CALLBACK ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── NAVIGATION CALLBACKS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive tech labs! Let us explore by doing.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with all parameters without pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Put your skills to the test!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive controls below.');
  }, []);

  // ─── INTERACTIVE LAB HANDLERS ───
  const handleRollDie = useCallback(() => {
    const raw = Math.random();
    setRawRandomVal(raw);
    const scaled = raw * 6;
    const truncated = Math.floor(scaled);
    const dieFace = truncated + 1;
    setRandomRoll(dieFace);
    setDieRollHistory(prev => [dieFace, ...prev.slice(0, 4)]);
    audioManager.play('count');
  }, []);

  const handleFirewallTest = useCallback((type: 'safe' | 'worm' | 'phish') => {
    audioManager.play('tap');
    let logMsg = '';
    if (type === 'safe') {
      logMsg = 'Port 443 [HTTPS]: GET /index.html -> Allowed 200 OK';
      setPacketCount(p => ({ ...p, allowed: p.allowed + 1 }));
      audioManager.play('drop-correct');
    } else if (type === 'worm') {
      if (firewallActive) {
        logMsg = 'Port 445 [SMB Worm]: Unauthorized scan blocked by Firewall rule!';
        setPacketCount(p => ({ ...p, blocked: p.blocked + 1 }));
        audioManager.play('drop-correct');
      } else {
        logMsg = 'CRITICAL: Port 445 SMB Worm penetrated system (Firewall Disabled)!';
        audioManager.play('error');
      }
    } else {
      if (encryptionActive) {
        logMsg = 'HTTPS Ciphertext intercepted: Decryption failed (Key required)';
        setPacketCount(p => ({ ...p, blocked: p.blocked + 1 }));
        audioManager.play('drop-correct');
      } else {
        logMsg = 'WARNING: Plaintext credentials intercepted in transit!';
        audioManager.play('error');
      }
    }
    setNetworkLog(prev => [logMsg, ...prev.slice(0, 3)]);
  }, [firewallActive, encryptionActive]);

  // ─── COMPLETION CALLBACK ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Java and Cyber Applications simulation.');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE CALLBACK ───
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

  // ─── INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── ANSWER HANDLER ───
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
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
        speechManager.speak('Let us review the step-by-step breakdown together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // ─── DRAG HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isSlotCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isSlotCorrect) {
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
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // Clean timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Derived Calculations
  const calculatedMathPow = useMemo(() => Math.pow(mathBase, mathExp), [mathBase, mathExp]);
  const calculatedMathSqrt = useMemo(() => Math.sqrt(mathBase), [mathBase]);
  const parsedWrapperResult = useMemo(() => {
    try {
      if (parseMode === 'int') {
        const val = parseInt(parseInputStr, 10);
        if (isNaN(val) || parseInputStr.includes('.')) throw new Error('NumberFormatException');
        return { success: true, value: val, type: 'int' };
      } else {
        const val = parseFloat(parseInputStr);
        if (isNaN(val)) throw new Error('NumberFormatException');
        return { success: true, value: val, type: 'double' };
      }
    } catch {
      return { success: false, value: 'NumberFormatException: Invalid literal', type: 'error' };
    }
  }, [parseInputStr, parseMode]);

  const scannerTokens = useMemo(() => {
    if (scannerDelimiter === 'space') {
      return scannerSampleInput.trim().split(/\s+/).filter(Boolean);
    } else {
      return scannerSampleInput.split(',').map(s => s.trim()).filter(Boolean);
    }
  }, [scannerSampleInput, scannerDelimiter]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gold-950/80 border border-gold-500/30 rounded-2xl text-2xl shadow-inner">
            {subjectConfig.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gold-900/60 text-gold-300 border border-gold-700/50">
                ICSE Class 10
              </span>
              <span className="text-xs font-mono text-slate-400">c10_cs_021 - c10_cs_030</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                phase === p 
                  ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY (Curiosity Hook) ─── */}
      {phase === 'discovery' && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="space-y-6"
        >
          {/* Narrative Card */}
          <div className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-900 rounded-3xl border border-gold-700/40 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
            <span className="text-xs font-bold tracking-wider uppercase text-gold-400 mb-2 block">
              Mission Briefing
            </span>
            <h2 className="text-2xl font-black text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300 font-medium bg-gold-950/60 p-3 rounded-xl border border-gold-800/40">
              💡 {SCENARIO.context}
            </p>
          </div>

          {/* Discovery Visual Interactive Canvas & SVG 1 */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Curiosity Experiment</span>
                <h3 className="text-lg font-bold text-white mt-0.5">The Java Random Die Enigma</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRollDie}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2"
              >
                🎲 Roll Java Code
              </motion.button>
            </div>

            {/* SVG Diagram 1 */}
            <MathRandomTransformationSvg rawVal={rawRandomVal} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs space-y-2">
                <span className="text-slate-400">Code: Math.random()</span>
                <div className="text-gold-400 font-bold text-base">{rawRandomVal.toFixed(6)}</div>
                <div className="text-slate-500 text-[11px]">[0.0, 1.0) exclusive</div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs space-y-2">
                <span className="text-slate-400">Scaled: * 6</span>
                <div className="text-gold-400 font-bold text-base">{(rawRandomVal * 6).toFixed(6)}</div>
                <div className="text-slate-500 text-[11px]">[0.0, 6.0) double</div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs space-y-2">
                <span className="text-slate-400">Cast: (int)(raw * 6) + 1</span>
                <div className="text-emerald-400 font-bold text-base">{randomRoll ?? 4}</div>
                <div className="text-slate-500 text-[11px]">Valid Die Face [1..6]</div>
              </div>
            </div>

            {/* Die roll history visual */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-slate-400">Roll Output History:</span>
              <div className="flex gap-2">
                {(dieRollHistory.length > 0 ? dieRollHistory : [4, 2, 6, 1, 5]).map((val, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-amber-300"
                  >
                    {val}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Discovery Question Options */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">{DISCOVERY_QUESTION.question}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-2xl border text-sm transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-950/40 border-slate-800 text-slate-500'
                      : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-gold-500/50 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-gold-400 flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-800"
              >
                <p className={`text-xs md:text-sm font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! (int)(Math.random() * 6) yields 0 to 5, missing the 6 entirely.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-gold-500/25 flex-shrink-0"
                >
                  Start Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: EXPLORE (Guided Hands-On Labs with Multi-Representation & SVGs) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Exploration Step Header & Step Indicators */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-gold-400">Interactive Lab Studio</span>
              <h2 className="text-xl md:text-2xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex items-center gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentSlide(i);
                    audioManager.play('tap');
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    currentSlide === i ? 'w-8 bg-gold-500' : 'w-2.5 bg-slate-800 hover:bg-slate-700'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <p className="text-sm text-gold-200 bg-gold-950/40 p-3 rounded-2xl border border-gold-800/40 flex items-center gap-2">
            <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* ─── LAB STEP 0: JAVA MATH CLASS & MULTI-REPRESENTATION ─── */}
          {currentSlide === 0 && (
            <div className="space-y-6">
              {/* Multi-Representation Integration */}
              <MultiRepresentationPanel rawVal={rawRandomVal} base={mathBase} exp={mathExp} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Controls */}
                <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-5">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>⚙️</span> Interactive Math Modeler
                  </h3>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Base Value (n):</span>
                      <span className="font-mono text-gold-400 font-bold">{mathBase}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={25}
                      value={mathBase}
                      onChange={(e) => {
                        setMathBase(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-gold-500"
                      aria-label="Set math base"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Exponent (p):</span>
                      <span className="font-mono text-gold-400 font-bold">{mathExp}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={5}
                      value={mathExp}
                      onChange={(e) => {
                        setMathExp(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-gold-500"
                      aria-label="Set math exponent"
                    />
                  </div>

                  {/* Predict-Then-Check Section */}
                  {!predictionMade ? (
                    <div className="pt-3 border-t border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-amber-400">Predict Before Testing:</span>
                      <p className="text-xs text-slate-300">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {PREDICTION_QUESTIONS[0].options.map((opt, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(idx)}
                            className="w-full text-left p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:border-gold-500/50"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/40 text-xs text-gold-200">
                      ✓ Prediction logged: {PREDICTION_QUESTIONS[0].options[predictionIndex]}
                    </div>
                  )}
                </div>

                {/* Live Java Output Console */}
                <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 flex flex-col justify-between">
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
                      <span>Java Syntax</span>
                      <span>Evaluated Return Value</span>
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex justify-between items-center">
                      <span className="text-gold-300">Math.pow({mathBase}, {mathExp})</span>
                      <span className="text-emerald-400 font-bold text-sm">{calculatedMathPow.toFixed(1)} (double)</span>
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex justify-between items-center">
                      <span className="text-gold-300">Math.sqrt({mathBase})</span>
                      <span className="text-emerald-400 font-bold text-sm">{calculatedMathSqrt.toFixed(4)} (double)</span>
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex justify-between items-center">
                      <span className="text-amber-300">Math.abs(-{mathBase})</span>
                      <span className="text-emerald-400 font-bold text-sm">{mathBase} (int)</span>
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex justify-between items-center">
                      <span className="text-pink-300">Math.PI * {mathBase}</span>
                      <span className="text-emerald-400 font-bold text-sm">{(Math.PI * mathBase).toFixed(4)} (double)</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gold-950/30 rounded-xl border border-gold-800/30 text-[11px] text-slate-400">
                    ⚠️ Note: Math.pow and Math.sqrt always return <span className="text-gold-300 font-bold">double</span>, preventing data loss.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── LAB STEP 1: WRAPPER CLASSES ─── */}
          {currentSlide === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>📦</span> String to Numeric Translator
                </h3>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setParseMode('int');
                      audioManager.play('tap');
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      parseMode === 'int' ? 'bg-gold-600 text-white' : 'bg-slate-950 text-slate-400'
                    }`}
                  >
                    Integer.parseInt()
                  </button>
                  <button
                    onClick={() => {
                      setParseMode('double');
                      audioManager.play('tap');
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      parseMode === 'double' ? 'bg-gold-600 text-white' : 'bg-slate-950 text-slate-400'
                    }`}
                  >
                    Double.parseDouble()
                  </button>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Enter Raw Input String:</label>
                  <input
                    type="text"
                    value={parseInputStr}
                    onChange={(e) => setParseInputStr(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl font-mono text-sm text-gold-300 focus:outline-none focus:border-gold-500"
                    placeholder="Try '123', '45.8', 'abc'"
                  />
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-xs text-slate-500">Quick test presets:</span>
                  {['250', '98.6', 'Rs.500', '-42', '12a'].map(val => (
                    <button
                      key={val}
                      onClick={() => {
                        setParseInputStr(val);
                        audioManager.play('tap');
                      }}
                      className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-mono text-slate-300"
                    >
                      "{val}"
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">JVM Runtime Evaluation</span>
                  <div className="mt-3 p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                    <div className="text-xs font-mono text-slate-400">
                      String s = "{parseInputStr}";
                    </div>
                    <div className="text-xs font-mono text-gold-300">
                      {parseMode === 'int' ? 'int res = Integer.parseInt(s);' : 'double res = Double.parseDouble(s);'}
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      {parsedWrapperResult.success ? (
                        <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-emerald-300 font-mono text-xs">
                          ✓ Success: returns {parsedWrapperResult.type} value <span className="font-bold text-white">{parsedWrapperResult.value}</span>
                        </div>
                      ) : (
                        <div className="p-3 bg-rose-950/60 border border-rose-500/50 rounded-xl text-rose-300 font-mono text-xs">
                          ✗ Throws: java.lang.NumberFormatException
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 p-3 bg-slate-900/50 rounded-xl">
                  💡 Wrapper classes also provide <span className="text-gold-300 font-mono">toString(num)</span> to convert numbers back to text for display!
                </div>
              </div>
            </div>
          )}

          {/* ─── LAB STEP 2: SCANNER & DELIMITERS ─── */}
          {currentSlide === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>🔍</span> Scanner Tokenizer Studio
                </h3>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Select Delimiter Rule:</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setScannerDelimiter('space');
                        setScannerSampleInput('Aarav 95 Kolkata');
                        audioManager.play('tap');
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold ${
                        scannerDelimiter === 'space' ? 'bg-gold-600 text-white' : 'bg-slate-950 text-slate-400'
                      }`}
                    >
                      Default: Whitespace \s+
                    </button>
                    <button
                      onClick={() => {
                        setScannerDelimiter('comma');
                        setScannerSampleInput('101,Meera,98.5');
                        audioManager.play('tap');
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold ${
                        scannerDelimiter === 'comma' ? 'bg-gold-600 text-white' : 'bg-slate-950 text-slate-400'
                      }`}
                    >
                      sc.useDelimiter(",")
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Incoming Input Stream:</label>
                  <input
                    type="text"
                    value={scannerSampleInput}
                    onChange={(e) => setScannerSampleInput(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl font-mono text-sm text-gold-300"
                  />
                </div>
              </div>

              <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Parsed Token Stack</span>
                <div className="space-y-2">
                  {scannerTokens.map((tok, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between font-mono text-xs"
                    >
                      <span className="text-slate-400">Token #{idx + 1}:</span>
                      <span className="text-gold-300 font-bold bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                        "{tok}"
                      </span>
                      <span className="text-emerald-400 text-[11px]">
                        {!isNaN(Number(tok)) ? (tok.includes('.') ? 'nextDouble()' : 'nextInt()') : 'next()'}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── LAB STEP 3: SYSTEM.OUT.PRINTF STUDIO ─── */}
          {currentSlide === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>📐</span> printf Specifier Studio
                </h3>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Field Width:</span>
                    <span className="font-mono text-gold-400 font-bold">{printfWidth} cols</span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={15}
                    value={printfWidth}
                    onChange={(e) => setPrintfWidth(Number(e.target.value))}
                    className="w-full accent-gold-500"
                    aria-label="Set field width"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Decimal Precision (.N):</span>
                    <span className="font-mono text-gold-400 font-bold">{printfPrecision} decimals</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={4}
                    value={printfPrecision}
                    onChange={(e) => setPrintfPrecision(Number(e.target.value))}
                    className="w-full accent-gold-500"
                    aria-label="Set precision"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl">
                  <span className="text-xs text-slate-300">Left Alignment Flag (-)</span>
                  <button
                    onClick={() => {
                      setPrintfAlignLeft(prev => !prev);
                      audioManager.play('tap');
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      printfAlignLeft ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {printfAlignLeft ? 'Active (-)' : 'Right-align'}
                  </button>
                </div>
              </div>

              <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 flex flex-col justify-between font-mono text-xs">
                <div>
                  <span className="text-slate-400 uppercase tracking-wider text-[11px] block mb-2">Java Statement</span>
                  <div className="p-3 bg-slate-900 rounded-xl text-gold-300 border border-slate-800">
                    System.out.printf("{printfAlignLeft ? '-' : ''}{printfWidth}.{printfPrecision}f%n", 85.346);
                  </div>

                  <span className="text-slate-400 uppercase tracking-wider text-[11px] block mt-4 mb-2">Terminal Output Grid</span>
                  <div className="p-3 bg-black rounded-xl border border-slate-800 font-mono text-emerald-400 overflow-x-auto whitespace-pre">
                    |{(printfAlignLeft
                      ? (85.346).toFixed(printfPrecision).padEnd(printfWidth, ' ')
                      : (85.346).toFixed(printfPrecision).padStart(printfWidth, ' '))}|
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 pt-2">
                  Notice how <span className="text-gold-300">%n</span> generates platform-neutral newlines on Windows, Mac & Linux!
                </div>
              </div>
            </div>
          )}

          {/* ─── LAB STEP 4: CYBER DEFENSE & SVG 2 ─── */}
          {currentSlide === 4 && (
            <div className="space-y-6">
              {/* SVG 2: Asymmetric Encryption & Firewall Pipeline */}
              <CyberSecurityPipelineSvg firewallActive={firewallActive} encryptionActive={encryptionActive} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>🛡️</span> Cyber Shield Controls
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setFirewallActive(prev => !prev);
                        audioManager.play('tap');
                      }}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                        firewallActive
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                          : 'bg-rose-950/60 border-rose-500 text-rose-300'
                      }`}
                    >
                      Firewall: {firewallActive ? 'ACTIVE (Filtering)' : 'DISABLED'}
                    </button>

                    <button
                      onClick={() => {
                        setEncryptionActive(prev => !prev);
                        audioManager.play('tap');
                      }}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                        encryptionActive
                          ? 'bg-gold-950/60 border-gold-500 text-gold-300'
                          : 'bg-amber-950/60 border-amber-500 text-amber-300'
                      }`}
                    >
                      HTTPS Cipher: {encryptionActive ? 'AES/RSA ON' : 'Plaintext OFF'}
                    </button>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-slate-400">Inject Simulated Network Traffic:</span>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleFirewallTest('safe')}
                        className="py-2 px-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-emerald-400"
                      >
                        Safe Web (443)
                      </button>
                      <button
                        onClick={() => handleFirewallTest('worm')}
                        className="py-2 px-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-rose-400"
                      >
                        SMB Worm (445)
                      </button>
                      <button
                        onClick={() => handleFirewallTest('phish')}
                        className="py-2 px-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-amber-400"
                      >
                        Sniffer Attack
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between text-xs font-mono p-3 bg-slate-950 rounded-xl">
                    <span className="text-emerald-400">Passed: {packetCount.allowed}</span>
                    <span className="text-rose-400">Threats Filtered: {packetCount.blocked}</span>
                  </div>
                </div>

                {/* Security Network Logs & 2D Canvas Visualizer */}
                <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Real-Time Packet Stream</span>
                  <canvas ref={canvasRef} width={400} height={80} className="w-full rounded-xl bg-slate-900 border border-slate-800" />

                  <div className="space-y-1.5 font-mono text-[11px]">
                    {(networkLog.length > 0 ? networkLog : ['Network idle. Ready for security packets.']).map((log, i) => (
                      <div key={i} className="p-2 bg-slate-900/80 rounded-lg border border-slate-800/60 text-slate-300">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

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
              className="px-4 py-2 bg-slate-800 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs font-bold text-slate-400 font-mono">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Open Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX (Free Play with SVG 3) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Sandbox Playground</span>
              <h2 className="text-xl font-black text-white">Full Software Engineering Workbench</h2>
              <p className="text-xs text-slate-400 mt-1">
                Freely inspect HTML/CSS web design and computational engines with zero grading pressure.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-gold-600 text-white font-bold text-sm rounded-xl shadow-lg"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          {/* SVG 3: HTML5 Semantic Architecture & CSS Priority Flow */}
          <HtmlSemanticArchitectureSvg themeColor={cssThemeColor} fontSize={cssFontSize} />

          {/* HTML & CSS Interactive Designer Sandbox */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>🎨</span> Web Portal CSS Customizer
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Theme Accent Color:</label>
                  <div className="flex gap-2">
                    {['#0284c7', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899'].map(c => (
                      <button
                        key={c}
                        onClick={() => {
                          setCssThemeColor(c);
                          audioManager.play('tap');
                        }}
                        style={{ backgroundColor: c }}
                        className={`w-8 h-8 rounded-full border-2 transition-transform ${
                          cssThemeColor === c ? 'scale-110 border-white' : 'border-transparent'
                        }`}
                        aria-label={`Select color ${c}`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Font Size:</span>
                    <span className="font-mono text-gold-400">{cssFontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min={12}
                    max={22}
                    value={cssFontSize}
                    onChange={(e) => setCssFontSize(Number(e.target.value))}
                    className="w-full accent-gold-500"
                    aria-label="Set CSS font size"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Card Padding:</span>
                    <span className="font-mono text-gold-400">{cssPadding}px</span>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={24}
                    value={cssPadding}
                    onChange={(e) => setCssPadding(Number(e.target.value))}
                    className="w-full accent-gold-500"
                    aria-label="Set CSS padding"
                  />
                </div>
              </div>
            </div>

            {/* Live Web Preview */}
            <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  Live Rendered HTML5 Portal
                </span>
                <div 
                  className="rounded-2xl border transition-all"
                  style={{
                    backgroundColor: '#0f172a',
                    borderColor: cssThemeColor,
                    padding: `${cssPadding}px`,
                  }}
                >
                  <header className="pb-2 border-b border-slate-800 flex justify-between items-center">
                    <h4 style={{ color: cssThemeColor, fontSize: `${cssFontSize + 4}px`, fontWeight: 'bold' }}>
                      Bharat Science Fair 2026
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#header</span>
                  </header>

                  <nav className="flex gap-3 py-2 text-xs font-medium text-slate-400">
                    <span className="hover:underline cursor-pointer" style={{ color: cssThemeColor }}>#home</span>
                    <span className="hover:underline cursor-pointer">#schedule</span>
                    <span className="hover:underline cursor-pointer">#awards</span>
                  </nav>

                  <main className="mt-2 space-y-2">
                    <p style={{ fontSize: `${cssFontSize}px`, color: '#cbd5e1' }}>
                      Welcome to the national ICSE science exhibition portal.
                    </p>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
                      Table: 24 Participating ICSE Schools
                    </div>
                  </main>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-500 mt-3">
                &lt;link rel="stylesheet" href="style.css"&gt; keeps styling modular and maintainable!
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE (Interactive Adaptive Engine) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950 text-rose-300 border border-rose-700'
                    : 'bg-gold-950 text-gold-300 border border-gold-700'
                }`}
              >
                {difficulty}
              </motion.span>
              <span className="text-xs px-2 py-0.5 rounded bg-gold-950 text-gold-300 border border-gold-800">
                NEP 2020: {challenge.competencyLevel}
              </span>
            </div>

            <div className="text-xs font-mono text-slate-400">
              Mastery: <span className="text-gold-400 font-bold capitalize">{masteryLevel}</span>
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

          {/* Challenge Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-3xl border transition-colors ${
              wrongFlash ? 'bg-rose-950/40 border-rose-500' : 'border-slate-800'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-relaxed">
              {challenge.question}
            </h3>

            {/* MCQ / Classify / Match / Distinguish Options */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-2xl border text-sm transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-gold-500/50 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-gold-400 flex-shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-5">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag threat label onto matching target:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-gradient-to-r from-gold-600 to-gold-600 text-white rounded-xl text-xs font-bold cursor-grab active:cursor-grabbing shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'slot_virus', title: 'Host-Dependent Parasite', desc: 'Attaches to executable files & activates only when host runs' },
                    { id: 'slot_worm', title: 'Standalone Network Replicator', desc: 'Self-replicates across open ports consuming bandwidth' },
                    { id: 'slot_trojan', title: 'Disguised Backdoor Utility', desc: 'Pretends to be legitimate app but opens covert remote access' },
                    { id: 'slot_phishing', title: 'Credential Theft Deception', desc: 'Fake banking portals or emails tricking human users' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-2xl border-2 border-dashed transition-all ${
                        droppedLabels[target.id]
                          ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
                          : 'border-slate-700 bg-slate-950/60 text-slate-400'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-white">{target.title}</span>
                        <span className="text-xs font-bold text-gold-400">{droppedLabels[target.id] || '[Drop Here]'}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{target.desc}</p>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-lg"
                >
                  Verify Threat Mapping
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400 block">Drag items to rearrange into chronological recovery sequence:</span>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0', 10);
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3 cursor-grab text-xs font-medium text-slate-200"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-bold text-gold-400 text-[11px]">
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
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48 focus:border-gold-500 focus:outline-none"
                    placeholder="Enter calculated value"
                  />
                  <span className="text-xs text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400 block">{challenge.validationHint}</span>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-mono text-gold-300"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1 bg-gold-950 border border-gold-700 rounded-lg text-xs font-mono text-gold-200 flex items-center gap-1.5"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 font-mono">Click parts above to assemble statement...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-6 py-2.5 bg-gold-600 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
                >
                  Validate Assembled Code
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gold-950/50 border border-gold-700/60 rounded-2xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                    Step-by-Step Technical Breakdown
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(Boolean).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(Boolean)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.div
                        key={sIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-gold-200 leading-relaxed flex items-start gap-2"
                      >
                        <span className="w-5 h-5 rounded-full bg-gold-900 border border-gold-700 flex items-center justify-center font-bold text-[11px] text-gold-300 flex-shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        <span>{sentence}{!sentence.endsWith('.') && '.'}</span>
                      </motion.div>
                    ))}
                </div>

                <div className="pt-3 flex justify-between items-center border-t border-gold-800/50">
                  {revealedSteps < challenge.explanation.split('. ').filter(Boolean).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-gold-700 text-white rounded-xl text-xs font-bold"
                    >
                      Next Step Breakdown →
                    </motion.button>
                  ) : <div />}

                  {revealedSteps >= challenge.explanation.split('. ').filter(Boolean).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg"
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

      {/* ─── PHASE 5: COMPLETE (Mastery Analytics, Reflection Section & Real World Project) ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-gold-950/80 via-slate-900 to-slate-950 rounded-3xl border border-gold-700/50 text-center space-y-4 shadow-2xl">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Simulation Completed!</h2>
            <div className="flex justify-center gap-6 font-mono text-sm">
              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-400 text-xs block">Final Score</span>
                <span className="text-emerald-400 font-bold text-xl">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-400 text-xs block">BKT Mastery Level</span>
                <span className="text-gold-400 font-bold text-xl capitalize">{masteryLevel}</span>
              </div>
            </div>

            <p className="text-sm text-gold-200 max-w-xl mx-auto">
              {errors === 0
                ? '🌟 Flawless Mastery! You possess complete proficiency in Java Math, Wrappers, Cyber Ethics, and Web Architectures.'
                : errors <= 3
                ? '👏 Excellent Performance! Your conceptual foundations are strong. Review minor edge cases below for full mastery.'
                : '💪 Good Effort! Computer science builds incrementally. Review the targeted misconception profiles below.'}
            </p>
          </div>

          {/* ─── REFLECTION SECTION (REQUIRED) ─── */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤔</span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Metacognition & Synthesis</span>
                <h3 className="text-lg font-bold text-white">Post-Simulation Reflection</h3>
              </div>
            </div>

            <div className="space-y-4">
              {/* Question 1 */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-sm font-bold text-gold-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflection1}
                  onChange={(e) => setReflection1(e.target.value)}
                  placeholder="e.g., How Math.random() strictly excludes 1.0, or why parseInt throws an exception on decimal strings..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500 h-20 resize-none"
                />
              </div>

              {/* Question 2 */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-sm font-bold text-gold-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflection2}
                  onChange={(e) => setReflection2(e.target.value)}
                  placeholder="e.g., Explain public key encryption as an open padlock anyone can snap shut, but only the owner has the secret key to open..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500 h-20 resize-none"
                />
              </div>

              {/* Question 3 */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-sm font-bold text-gold-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflection3}
                  onChange={(e) => setReflection3(e.target.value)}
                  placeholder="e.g., Engineering secure online payment gateways (like UPI/HTTPS) or designing school exhibition web portals..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500 h-20 resize-none"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-slate-500">Reflections reinforce synaptic connections in long-term memory.</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setReflectionsSaved(true);
                    audioManager.play('drop-correct');
                    speechManager.speak('Reflections recorded! Excellent conceptual synthesis.');
                  }}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                    reflectionsSaved ? 'bg-emerald-600 text-white' : 'bg-gold-600 text-white shadow-lg'
                  }`}
                >
                  {reflectionsSaved ? '✓ Reflections Saved' : 'Save Reflections'}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Misconception Profile Tracker */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-3xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Targeted Misconception Review
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-4 bg-slate-900/90 rounded-2xl border border-rose-900/40 space-y-1">
                      <div className="text-xs font-bold text-rose-400">❌ {m.misconception}</div>
                      <div className="text-xs text-emerald-300">✓ {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── SPACED REPETITION VISIBILITY CARD (SM-2 VISIBLE TO STUDENT) ─── */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-gold-500/30 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-gold-950/40 to-slate-900 shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Spaced Repetition Schedule (SM-2)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold-950 text-gold-300 border border-gold-800">
                  SRS Memory Optimization
                </span>
              </div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>📅</span> Recommended Review Schedule: <span className="text-gold-400 font-extrabold">{errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                Performance: <span className="text-slate-200 font-semibold">{errors} error{errors === 1 ? '' : 's'} recorded</span>. Spaced repetition maintains long-term ICSE exam readiness.
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs font-mono px-3.5 py-1.5 bg-gold-950 text-gold-300 rounded-xl border border-gold-700 font-bold shadow">
                {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">SM-2 Algorithm Synchronized</span>
            </div>
          </div>

          {/* Real-World Culminating Activity */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Culminating Project</span>
            <h3 className="text-lg font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-gold-950 text-gold-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Level Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_ComputerScienceJavaMathClassSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC SYLLABUS NODE CONSTANTS ───
const NODE_C11_CS_061 = 'c11_cs_061'; // IP addressing - IPv4, IPv6, subnet mask, classes, private vs public
const NODE_C11_CS_062 = 'c11_cs_062'; // Web technologies - HTML, CSS, JavaScript, server-side scripting
const NODE_C11_CS_063 = 'c11_cs_063'; // JavaScript introduction - variables, data types, functions, DOM
const NODE_C11_CS_064 = 'c11_cs_064'; // Cloud computing advanced - IaaS, PaaS, SaaS, deployment models
const NODE_C11_CS_065 = 'c11_cs_065'; // Mobile app development - Android, iOS, app lifecycle, APIs
const NODE_C11_CS_066 = 'c11_cs_066'; // Computer ethics and cyber crime - hacking, cracking, cyber law introduction
const NODE_C11_CS_067 = 'c11_cs_067'; // Software development lifecycle - waterfall, agile, prototyping
const NODE_C11_CS_068 = 'c11_cs_068'; // Java inner classes - member, local, anonymous, static nested classes
const NODE_C11_CS_069 = 'c11_cs_069'; // Java generics introduction - generic classes, methods, type parameters
const NODE_C11_CS_070 = 'c11_cs_070'; // Java collections framework - List, Set, Map, ArrayList, HashSet, HashMap

const ALL_NODE_IDS = [
  NODE_C11_CS_061, NODE_C11_CS_062, NODE_C11_CS_063, NODE_C11_CS_064, NODE_C11_CS_065,
  NODE_C11_CS_066, NODE_C11_CS_067, NODE_C11_CS_068, NODE_C11_CS_069, NODE_C11_CS_070
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Network Operations Center: Kolkata Tech City',
  intro: 'You are the Lead Systems & Software Engineer at a major Indian telecom cloud datacenter. Packets are dropping, subnets are misconfigured, web microservices are lagging, Java collections are throwing runtime ClassCastExceptions, and an unauthorized penetration attack has been flagged by CERT-In.',
  context: 'Diagnose network packet routing, debug IP subnets, configure cloud architectures, streamline mobile app lifecycles, and fix type-safe Java architectures to bring the system back online.',
};

// ─── DISCOVERY QUESTION HOOK ───
const DISCOVERY_QUESTION = {
  question: 'An Indian school computer lab in Kolkata assigns the IP address 192.168.10.55 to a student workstation. Why can this workstation browse Wikipedia on the public Internet despite having a private IP?',
  options: [
    'Private IP addresses are globally unique and can route anywhere directly.',
    'The lab edge router translates the private IP into a public IP using Network Address Translation (NAT).',
    'Class C addresses automatically bypass Internet firewalls without needing routers.',
    'JavaScript in the web browser converts IPv4 into IPv6 packets on the fly.'
  ],
  correctIndex: 1,
  hintAfter: 'Private addresses (192.168.0.0/16) cannot route onto the public Internet. The router acts like an office receptionist using NAT to handle all external requests.',
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
  {
    id: 'ch_01_ip_class',
    nodeId: NODE_C11_CS_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Determine the address class and default subnet mask for the IP address 172.20.15.4.',
    options: [
      'Class A with default subnet mask 255.0.0.0',
      'Class B with default subnet mask 255.255.0.0',
      'Class C with default subnet mask 255.255.255.0',
      'Class D multicast with no subnet mask'
    ],
    correctIndex: 1,
    explanation: 'The first octet 172 falls between 128 and 191, identifying it as Class B. The default subnet mask for Class B is 255.255.0.0 (16 network bits, 16 host bits).',
    hints: [
      'Check the value of the first octet (172) against the standard class boundaries (0-127, 128-191, 192-223).',
      'Class B spans first octets from 128 to 191.',
      'Class B dedicates the first two octets to the network portion, giving mask 255.255.0.0.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_drag_ip_types',
    nodeId: NODE_C11_CS_061,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the IP address categories to their matching binary prefix or standard representation in the diagram.',
    dragItems: [
      { label: 'Class A (0xxxxxxx)', targetId: 'slot_class_a' },
      { label: 'Class B (10xxxxxx)', targetId: 'slot_class_b' },
      { label: 'Class C (110xxxxx)', targetId: 'slot_class_c' },
      { label: 'IPv6 (128-bit Hex)', targetId: 'slot_ipv6' }
    ],
    correctMapping: {
      slot_class_a: 'Class A (0xxxxxxx)',
      slot_class_b: 'Class B (10xxxxxx)',
      slot_class_c: 'Class C (110xxxxx)',
      slot_ipv6: 'IPv6 (128-bit Hex)'
    },
    explanation: 'Class A begins with binary 0 (0-127), Class B with 10 (128-191), Class C with 110 (192-223), and IPv6 uses 128-bit hexadecimal notation.',
    hints: [
      'Look at the leading bit patterns: Class A starts with 0, Class B with 10.',
      'Class C begins with 110 in the first octet.',
      'IPv6 uses 8 groups of 4 hexadecimal digits (128 bits total).'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_web_roles',
    nodeId: NODE_C11_CS_062,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why must database operations and user authentication in an Indian railway reservation portal execute in server-side PHP/JSP rather than client-side JavaScript?',
    options: [
      'Client-side JavaScript cannot render CSS styles or HTML forms.',
      'JavaScript runs in the browser where source code is visible and local file/database access is restricted for security.',
      'Server-side PHP runs inside the user\'s browser and has higher memory bandwidth.',
      'Client-side scripts are too slow to perform basic arithmetic.'
    ],
    correctIndex: 1,
    explanation: 'JavaScript runs in the client browser where code is exposed to inspection and sandboxed from direct database connections. Server-side scripts (PHP/JSP) securely manage credentials, transactions, and databases on the server.',
    hints: [
      'Consider where the script executes: user browser vs central protected server.',
      'Anyone can inspect client-side JavaScript code using browser Developer Tools.',
      'Database credentials and session validation must be shielded on the server side.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04_js_scope',
    nodeId: NODE_C11_CS_063,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'What is the output of executing the following JavaScript snippet?\n\nfunction testScope() {\n  for (var i = 0; i < 3; i++) {}\n  console.log(i);\n}',
    options: ['3', 'undefined', 'ReferenceError: i is not defined', '0'],
    correctIndex: 0,
    explanation: 'Variables declared with "var" have function scope, not block scope. The loop counter "i" leaks out of the for-loop block and retains the terminal value 3 when logged.',
    hints: [
      'Remember that "var" is function-scoped while "let" and "const" are block-scoped.',
      'Because "var" was used, "i" exists throughout the entire testScope function.',
      'The loop terminates when i increments to 3.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05_cloud_models',
    nodeId: NODE_C11_CS_064,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    question: 'A tech startup in Bengaluru rents bare virtual machines on AWS EC2, installs Ubuntu OS, and configures Apache and MySQL manually. Which cloud service model is being utilized?',
    options: ['SaaS (Software as a Service)', 'PaaS (Platform as a Service)', 'IaaS (Infrastructure as a Service)', 'Community Cloud'],
    correctIndex: 2,
    explanation: 'IaaS provides raw compute, storage, and networking resources where the user manages the operating system, middleware, and applications.',
    hints: [
      'Determine the control boundary: who manages the operating system?',
      'When the user manages OS, runtime, and software on rented virtual hardware, it is IaaS.',
      'AWS EC2 and Azure VMs are quintessential IaaS examples.'
    ],
  },
  {
    id: 'ch_06_android_lifecycle',
    nodeId: NODE_C11_CS_065,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Sort the Android Activity lifecycle methods in the correct sequence from app launch to foreground active state.',
    sortItems: ['onCreate()', 'onStart()', 'onResume()'],
    correctOrder: [0, 1, 2],
    explanation: 'When an Activity launches, onCreate() initializes the UI and state, onStart() makes the activity visible, and onResume() brings it to the foreground to accept user interactions.',
    hints: [
      'First the activity is created in memory.',
      'Next it becomes visible on screen before becoming interactive.',
      'Finally it resumes to capture user touch events.'
    ],
  },
  {
    id: 'ch_07_ethics_hacking',
    nodeId: NODE_C11_CS_066,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under computer ethics and Indian cyber law (IT Act 2000), what is the single defining difference between an ethical hacker and a cracker?',
    options: [
      'Ethical hackers use Linux, while crackers only use Windows.',
      'Ethical hackers possess written authorization and consent from the system owner to find vulnerabilities, while crackers act without authorization.',
      'Crackers write computer code, whereas ethical hackers do not.',
      'Ethical hacking is only practiced by government agencies.'
    ],
    correctIndex: 1,
    explanation: 'Written permission and intent are the defining factors. Ethical hackers (white-hat) have permission to perform vulnerability assessments and fix flaws; crackers (black-hat) gain unauthorized access.',
    hints: [
      'Think about legality and consent.',
      'Both use similar penetration tools and technical skills.',
      'Permission from the owner makes penetration testing legal and ethical.'
    ],
  },
  {
    id: 'ch_08_sdlc_order',
    nodeId: NODE_C11_CS_067,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Arrange the fundamental phases of the Software Development Life Cycle (SDLC) in proper chronological sequence.',
    sortItems: ['Requirement Analysis', 'System Design', 'Implementation (Coding)', 'Testing', 'Maintenance'],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The classic SDLC sequence begins with gathering Requirements, designing blueprints, coding (Implementation), verifying through Testing, and supporting through Maintenance.',
    hints: [
      'You cannot design before understanding what the client requires.',
      'Coding (Implementation) follows architectural design.',
      'Testing verifies the code before deployment and subsequent maintenance.'
    ],
  },
  {
    id: 'ch_09_numeric_hosts',
    nodeId: NODE_C11_CS_061,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Class C network has a default subnet mask of 255.255.255.0 (8 host bits). How many usable host IP addresses are available on this single subnet?',
    correctAnswer: 254,
    tolerance: 0,
    unit: 'usable hosts',
    explanation: 'With 8 host bits, total addresses = 2^8 = 256. Subtracting 2 (one for network address ending in .0 and one for broadcast address ending in .255) leaves 254 usable host addresses.',
    hints: [
      'The formula for usable hosts is 2^n - 2, where n is the number of host bits.',
      'Here n = 8 bits in the final octet.',
      '2^8 = 256. Deduct 2 for network ID and broadcast ID: 256 - 2 = 254.'
    ],
  },
  {
    id: 'ch_10_generics_safety',
    nodeId: NODE_C11_CS_069,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Examine this code: List<String> list = new ArrayList<>(); list.add("ISC"); String s = list.get(0); Why is this superior to pre-generics List list = new ArrayList();?',
    options: [
      'Generics allocate double the heap memory at runtime.',
      'Generics enforce compile-time type checking, eliminating the need for explicit type casting and preventing runtime ClassCastException.',
      'Generics keep type parameters intact inside the compiled bytecode after type erasure.',
      'Pre-generics lists could only store primitive int values.'
    ],
    correctIndex: 1,
    explanation: 'Generics shift type checking from runtime to compile time. The compiler guarantees that only String objects enter the list, eliminating explicit (String) casts and runtime ClassCastExceptions.',
    hints: [
      'Notice that String s = list.get(0) has no explicit cast (String).',
      'The Java compiler verifies types before the program runs.',
      'Type safety at compile time prevents ClassCastException at runtime.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_11_collections_distinguish',
    nodeId: NODE_C11_CS_070,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An Indian railway ticketing application needs to store: (1) Passenger waiting list preserving booking order, (2) Unique Aadhaar numbers, (3) Train Number to Destination mapping. What is the best choice of Java Collection interfaces?',
    options: [
      '(1) Set, (2) List, (3) Map',
      '(1) List, (2) Set, (3) Map',
      '(1) Map, (2) Set, (3) List',
      '(1) List, (2) Map, (3) Set'
    ],
    correctIndex: 1,
    explanation: 'Waiting list requires ordered storage with duplicates (List); Aadhaar numbers must be strictly unique and unordered (Set); Train-to-Destination requires key-value pairing (Map).',
    hints: [
      'A waiting list preserves insertion order and allows identical names (List).',
      'Aadhaar numbers must never duplicate (Set).',
      'Key-Value pairs (Train No -> Destination) require a Map.'
    ],
  },
  {
    id: 'ch_12_inner_syntax',
    nodeId: NODE_C11_CS_068,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Given the class declaration:\nclass Outer {\n  class Inner {\n    void show() { System.out.println("Inner"); }\n  }\n}\nHow must an instance of Inner be constructed from a static main method?',
    options: [
      'Inner in = new Inner();',
      'Outer.Inner in = new Outer.Inner();',
      'Outer out = new Outer(); Outer.Inner in = out.new Inner();',
      'Inner in = Outer.getInner();'
    ],
    correctIndex: 2,
    explanation: 'A non-static member inner class is bound to an instance of the outer class. You must first instantiate the Outer class (Outer out = new Outer()) and then call out.new Inner().',
    hints: [
      'Inner is non-static, so it requires an enclosing instance of Outer.',
      'You cannot use "new Outer.Inner()" because Inner is not static.',
      'The syntax requires outerInstance.new Inner().'
    ],
  },
  {
    id: 'ch_13_construct_generic',
    nodeId: NODE_C11_CS_069,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Assemble the correct Java generic class header and field declaration for a key-value Pair class.',
    availableParts: ['public class Pair<K, V>', 'public class Pair', '{ private K key;', 'private V value; }', '{ Object key;', 'Object value; }'],
    targetState: 'public class Pair<K, V> { private K key; private V value; }',
    validationHint: 'Select the generic type parameters <K, V> and private fields of type K and V.',
    explanation: 'A generic class accepting two type parameters uses the syntax public class Pair<K, V> with fields private K key; private V value;.',
    hints: [
      'Include both type parameters K and V inside angle brackets.',
      'The fields must use types K and V rather than raw Object.',
      'Click the generic class header and generic field definitions.'
    ],
  },
  {
    id: 'ch_14_cloud_eval',
    nodeId: NODE_C11_CS_064,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Multiple public hospitals across Maharashtra want to share patient health records with strict compliance and shared governance, isolated from the general public. Which deployment model is most appropriate?',
    options: ['Public Cloud', 'Community Cloud', 'Single-Tenant IaaS', 'Public SaaS'],
    correctIndex: 1,
    explanation: 'A Community Cloud is shared among several organizations with common security, regulatory, and mission requirements (e.g., healthcare consortium or banks).',
    hints: [
      'The cloud is shared by specific organizations with identical regulatory goals.',
      'It is neither open to the public nor restricted to a single enterprise.',
      'A multi-organization shared infrastructure is a Community Cloud.'
    ],
  },
  {
    id: 'ch_15_set_duplicates',
    nodeId: NODE_C11_CS_070,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Evaluate the output of the following Java snippet:\n\nSet<String> cities = new HashSet<>();\ncities.add("Mumbai");\ncities.add("Delhi");\ncities.add("Mumbai");\nSystem.out.println(cities.size());',
    options: ['3', '2', '1', 'Compilation Error'],
    correctIndex: 1,
    explanation: 'A Set does not allow duplicate elements. When "Mumbai" is added a second time, the HashSet detects the duplicate and ignores the insertion. The set contains ["Mumbai", "Delhi"], size = 2.',
    hints: [
      'Recall the fundamental contract of the Set interface regarding duplicates.',
      'Adding an element already present in a Set returns false and leaves the set unchanged.',
      'Unique elements = "Mumbai", "Delhi" -> size is 2.'
    ],
  },
  {
    id: 'ch_16_cyber_law_itact',
    nodeId: NODE_C11_CS_066,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which of the following is an explicit primary purpose of the Indian Information Technology (IT) Act, 2000?',
    options: [
      'To mandate that all Indian websites must be coded in JavaScript.',
      'To provide legal recognition to electronic transactions, digital signatures, and define penalties for cyber crimes.',
      'To eliminate the use of private IP addresses across Indian internet service providers.',
      'To prohibit open-source software development in schools.'
    ],
    correctIndex: 1,
    explanation: 'The IT Act 2000 provides legal recognition to electronic records and digital signatures, facilitates e-governance and e-commerce, and specifies offenses and penalties for cyber crimes.',
    hints: [
      'Think about what legal framework is required for online banking and digital contracts.',
      'The law validates digital signatures and penalizes unauthorized access and hacking.',
      'It acts as India\'s central legal backbone for digital governance.'
    ],
  },
  {
    id: 'ch_17_sdlc_agile_eval',
    nodeId: NODE_C11_CS_067,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A Mumbai e-commerce startup is building an AI quick-delivery mobile app with rapidly evolving customer requirements. Why is the Agile model far superior to the Waterfall model for this project?',
    options: [
      'Agile eliminates the testing phase completely to deploy code faster.',
      'Agile delivers working increments in 2-4 week sprints with continuous customer feedback, adapting to frequent scope changes without incurring massive redesign costs.',
      'Waterfall requires zero documentation, whereas Agile requires formal legal signoffs at every stage.',
      'Agile guarantees that no bugs will ever occur in production.'
    ],
    correctIndex: 1,
    explanation: 'Agile uses iterative sprints to deliver working software incrementally, welcoming requirement changes. Waterfall is rigid and sequential, making mid-project pivot extremely costly.',
    hints: [
      'Consider how each model responds when requirements shift mid-way.',
      'Waterfall requires full phase sign-off before proceeding to the next.',
      'Agile thrives on short feedback loops and iterative delivery.'
    ],
  },
  {
    id: 'ch_18_static_nested',
    nodeId: NODE_C11_CS_068,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How does a "static nested class" differ from a "member inner class" regarding access to outer class members?',
    options: [
      'A static nested class can directly access all private non-static instance variables of the outer class without an object.',
      'A static nested class cannot directly access non-static instance fields or methods of the outer class; it can only directly access static members.',
      'A member inner class cannot access private fields of the outer class.',
      'Static nested classes cannot have constructors or methods.'
    ],
    correctIndex: 1,
    explanation: 'Because a static nested class is associated with the outer class itself rather than an outer instance, it cannot directly reference non-static instance variables or methods of the outer class.',
    hints: [
      'Think about static methods in Java: can a static method use "this" or access instance variables directly?',
      'The same rule applies to static nested classes: no implicit enclosing instance reference.',
      'It can only directly access static members of the outer class.'
    ],
  },
  {
    id: 'ch_19_api_json',
    nodeId: NODE_C11_CS_065,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A mobile bus booking app in New Delhi sends an HTTP GET request to a REST API. The server responds with:\n{"busNo": "DL-01-4520", "seatsAvailable": 14, "fare": 250.0}\nWhat format is this data and what must the mobile app do to display it in native UI widgets?',
    options: [
      'XML format; compile it directly into Java bytecode.',
      'JSON format; parse key-value pairs into model objects to bind to UI labels.',
      'HTML table; render it using a server-side PHP script.',
      'Binary hex stream; execute it as machine code.'
    ],
    correctIndex: 1,
    explanation: 'The lightweight text format consisting of key-value pairs inside braces is JSON (JavaScript Object Notation). The mobile app parses JSON into local objects to bind to UI elements.',
    hints: [
      'Look at the syntax with curly braces and "key": value pairs.',
      'JSON is the standard lightweight data interchange format for REST APIs.',
      'Mobile apps parse JSON text into data objects to populate Android/iOS UI widgets.'
    ],
  },
  {
    id: 'ch_20_js_dom',
    nodeId: NODE_C11_CS_063,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Which JavaScript DOM statement correctly selects an HTML element with id="statusMsg" and updates its displayed text safely without parsing HTML markup?',
    options: [
      'document.getElementsByTagName("statusMsg").style = "Ready";',
      'document.getElementById("statusMsg").textContent = "Connection Secure";',
      'document.querySelectorAll("#statusMsg").innerHTML = "<script>alert(1)</script>";',
      'window.getElementById("statusMsg").value = "Connection Secure";'
    ],
    correctIndex: 1,
    explanation: 'document.getElementById("statusMsg") finds the single element with that ID. Using textContent safely updates the text without the security risks of parsing arbitrary HTML through innerHTML.',
    hints: [
      'We want to select by ID on the document object.',
      'textContent updates plain text safely without parsing HTML tags.',
      'document.getElementById("...") is the standard method.'
    ],
  },
  {
    id: 'ch_21_type_erasure',
    nodeId: NODE_C11_CS_069,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does the expression `if (myList instanceof ArrayList<String>)` cause a Java compiler error?',
    options: [
      'ArrayList is an interface and cannot be checked with instanceof.',
      'Java uses Type Erasure: generic type parameters are removed during compilation, so ArrayList<String> and ArrayList<Integer> are the exact same class (ArrayList) at runtime.',
      'instanceof only works on primitive data types like int and double.',
      'The diamond operator must be included inside the instanceof operator.'
    ],
    correctIndex: 1,
    explanation: 'Due to Type Erasure, generic type parameter information (<String>) is discarded by the compiler and not retained in bytecode at runtime. The JVM only knows about raw ArrayList.',
    hints: [
      'Remember how Java implements generics for backward compatibility.',
      'Type Erasure removes <T> information during compilation.',
      'At runtime, the JVM cannot distinguish ArrayList<String> from ArrayList<Integer>.'
    ],
  },
  {
    id: 'ch_22_map_operations',
    nodeId: NODE_C11_CS_070,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Given the code:\nMap<String, Integer> marks = new HashMap<>();\nmarks.put("Rohan", 85);\nmarks.put("Aanya", 92);\nmarks.put("Rohan", 95);\nWhat will marks.get("Rohan") and marks.size() evaluate to?',
    options: [
      '85 and size 3',
      '95 and size 2',
      '95 and size 3',
      '85 and size 2'
    ],
    correctIndex: 1,
    explanation: 'Keys in a Map must be unique. When put("Rohan", 95) is executed, it overrides the previous value (85) associated with the key "Rohan". Total entries remain 2.',
    hints: [
      'What happens when a duplicate key is inserted into a Map?',
      'The new value overwrites the existing value for that key.',
      'There are only two unique keys: "Rohan" and "Aanya", so size is 2 and Rohan\'s score is 95.'
    ],
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
  nodeId: NODE_C11_CS_061,
  title: 'Network IP Addressing, Web Tech & Object Architectures',
  definition: 'Comprehensive mastery of IPv4/IPv6 networking, Subnet Masks, NAT, Web/Client-Server architectures, JavaScript DOM, Cloud IaaS/PaaS/SaaS, Android lifecycle, Cyber Ethics & IT Act, SDLC models, Java Inner Classes, Generics, and Collections Framework.',
  eli5: 'Think of the Internet as a global postal system where IP addresses are house numbers and subnet masks are city boundaries. Software systems use client/server layers, cloud rooms, and modular Java toolboxes to build secure, high-speed apps.',
  misconceptions: [
    { misconception: '192.168.1.1 is a public address because every home router displays it.', correction: '192.168.0.0/16 is a reserved private range. It only reaches the internet via NAT.' },
    { misconception: 'IPv6 uses 32-bit decimal numbers like IPv4.', correction: 'IPv6 uses 128-bit hexadecimal notation organized into 8 groups of 4 hex digits separated by colons.' },
    { misconception: 'JavaScript can directly modify databases and read server files.', correction: 'JavaScript runs in a browser sandbox for UI interactivity. Database access belongs to server-side PHP/JSP.' },
    { misconception: 'var, let, and const have the exact same function scoping.', correction: 'var has function scope; let and const have strict block scope and prevent variable leaking.' },
    { misconception: 'Java Generics preserve type parameters at runtime for reflection.', correction: 'Java uses Type Erasure; generic parameters are removed during compilation for JVM compatibility.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the default subnet mask for Class B IPv4 addresses?', options: ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.255'], correctIndex: 1 },
    { question: 'Which IP address belongs to the Class A private range?', options: ['172.16.0.1', '192.168.1.1', '10.50.2.1', '203.115.71.4'], correctIndex: 2 },
    { question: 'Where does server-side PHP execute?', options: ['Inside user browser', 'On the remote web server', 'In local computer RAM', 'Inside the DNS server'], correctIndex: 1 },
    { question: 'Which Java collection interface forbids duplicate elements?', options: ['List', 'Map', 'Set', 'ArrayList'], correctIndex: 2 },
    { question: 'What is the bit length of an IPv6 address?', options: ['32 bits', '64 bits', '128 bits', '256 bits'], correctIndex: 2 },
    { question: 'Which cloud model delivers ready-to-use apps like Google Docs?', options: ['IaaS', 'PaaS', 'SaaS', 'FaaS'], correctIndex: 2 },
    { question: 'In Android, which method is called when an Activity becomes interactive in foreground?', options: ['onCreate()', 'onStart()', 'onResume()', 'onDestroy()'], correctIndex: 2 },
    { question: 'What keyword allows a nested class to be instantiated without an outer class instance?', options: ['final', 'static', 'abstract', 'public'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates full proficiency across IP addressing, subnet masking, NAT routing, JavaScript DOM, Cloud models, Java generics type safety, and Collections operations.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. IPv4 Class & Subnet Multi-Representation Explorer',
    instruction: 'Toggle the octet sliders to observe Decimal, Binary, Bit-Allocation Diagram, and Subnet Mask bitwise ANDing simultaneously.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_CS_061,
  },
  {
    title: '2. NAT (Network Address Translation) Gateway Topology',
    instruction: 'Click private devices (192.168.1.x) to dispatch packets through the NAT Router SVG and watch private IPs translate into a single Public IP.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_CS_061,
  },
  {
    title: '3. Cloud Stack Responsibility & Architecture',
    instruction: 'Select IaaS, PaaS, or SaaS to inspect the architecture diagram and boundary between Cloud Provider vs Tenant management.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_CS_064,
  },
  {
    title: '4. Android Activity Lifecycle State Machine',
    instruction: 'Trigger lifecycle events (Launch, Phone Call Interruption, Back Button) to watch Activity state transitions in the SVG State Machine.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_CS_065,
  },
  {
    title: '5. Java Collections Framework Hierarchy Lab',
    instruction: 'Interact with List (ordered duplicates), Set (unique hashing), and Map (key-value table) to visualize memory storage and hierarchy.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_CS_070,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you change the first octet of an IP address from 190 to 195, how does the default subnet mask change?',
    options: [
      'Remains 255.255.0.0 because both are Class B',
      'Switches from 255.255.0.0 (Class B) to 255.255.255.0 (Class C)',
      'Expands to 255.0.0.0 (Class A)',
      'Subnet masks are completely independent of class first-octets'
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the First Octet slider past 191 into the 192-223 range and observe the Class C mask update instantly.',
    nodeId: NODE_C11_CS_061,
  },
  {
    question: 'Predict: What happens when you attempt to insert duplicate string "Kolkata" twice into a Java HashSet<String>?',
    options: [
      'The set expands and stores both entries at distinct indices',
      'The second addition is ignored, set size remains 1, and no error is thrown',
      'The program crashes with a DuplicateElementException',
      'The set deletes the first occurrence and leaves it empty'
    ],
    correctIndex: 1,
    verifyInstruction: 'Open the Collections Lab step and click "Add Duplicate" to verify that the HashSet size remains unchanged.',
    nodeId: NODE_C11_CS_070,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the host address capacity as you move from Class A (mask 255.0.0.0) to Class C (mask 255.255.255.0)?',
    observableOptions: [
      'Host capacity increases exponentially from Class A to Class C',
      'Host capacity shrinks dramatically from 16.7 million (Class A) down to 254 usable hosts (Class C)',
      'Host capacity remains constant at 65,534 hosts',
      'Class C has no host portion'
    ],
    correctIndex: 1,
    nodeId: NODE_C11_CS_061,
  },
  {
    question: 'In the NAT Gateway simulation, what happens to the source IP address when internal packets cross from LAN to the public WAN?',
    observableOptions: [
      'The private IP address (192.168.1.x) is replaced with the public WAN IP (203.115.71.45) with an assigned port number',
      'The packet retains the private IP without any modification',
      'The entire packet payload is encrypted and discarded',
      'The destination IP address becomes 127.0.0.1'
    ],
    correctIndex: 0,
    nodeId: NODE_C11_CS_061,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Network & Cloud Architect Capstone',
  description: 'Design an end-to-end IT infrastructure plan for an Indian Junior College with 120 laboratory workstations, a cloud-hosted student portal, and an Android attendance app.',
  steps: [
    'Subnetting: Assign private IP subnet 192.168.20.0/24 with default gateway 192.168.20.1.',
    'Edge Security: Configure edge router NAT to translate internal traffic to ISP public IP 203.115.71.50.',
    'Cloud Backend: Choose PaaS (e.g. Google App Engine) for deploying the Java Spring REST API without managing OS servers.',
    'Mobile Integration: Use Android Retrofit to query GET /api/v1/attendance and parse JSON responses into Java ArrayList<Student> collections.'
  ]
};

// Helper: convert 0-255 number to 8-bit binary string
function to8BitBinary(num: number): string {
  return num.toString(2).padStart(8, '0');
}

function C11_ComputerScienceAddressingIpv4Ipv6Sim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['compsci'] || { name: 'Computer Science', emoji: '💻', color: 'indigo' };

  // ─── STATE MANAGEMENT ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints and reveal states
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
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Discovery phase state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict & Observe states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);

  // Drag and Drop & Construct State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Interactive Exploration Simulation States
  const [firstOctet, setFirstOctet] = useState<number>(192);
  const [secondOctet, setSecondOctet] = useState<number>(168);
  const [thirdOctet, setThirdOctet] = useState<number>(1);
  const [fourthOctet, setFourthOctet] = useState<number>(10);
  const [selectedCloudModel, setSelectedCloudModel] = useState<'IaaS' | 'PaaS' | 'SaaS'>('PaaS');
  const [androidState, setAndroidState] = useState<'CREATED' | 'STARTED' | 'RESUMED' | 'PAUSED' | 'STOPPED' | 'DESTROYED'>('RESUMED');
  const [natActivePacket, setNatActivePacket] = useState<number | null>(null);
  const [collectionType, setCollectionType] = useState<'List' | 'Set' | 'Map'>('List');
  const [collectionItems, setCollectionItems] = useState<string[]>(['Kolkata', 'Delhi', 'Mumbai']);
  const [collectionInput, setCollectionInput] = useState('');
  const [mapKeyInput, setMapKeyInput] = useState('');
  const [mapValInput, setMapValInput] = useState('');
  const [mapEntries, setMapEntries] = useState<Record<string, string>>({ 'WB': 'Kolkata', 'MH': 'Mumbai', 'DL': 'Delhi' });

  // Sandbox simulation variables
  const [sandboxOctet, setSandboxOctet] = useState(172);
  const [sandboxBits, setSandboxBits] = useState(16);

  // Persistent BKT & Timers
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED CALCULATIONS (Memoized) ───
  const ipClassInfo = useMemo(() => {
    const bin1 = to8BitBinary(firstOctet);
    const bin2 = to8BitBinary(secondOctet);
    const bin3 = to8BitBinary(thirdOctet);
    const bin4 = to8BitBinary(fourthOctet);
    const fullBinary = `${bin1}.${bin2}.${bin3}.${bin4}`;

    if (firstOctet >= 0 && firstOctet <= 127) {
      return {
        className: 'Class A',
        mask: '255.0.0.0',
        maskBinary: '11111111.00000000.00000000.00000000',
        netId: `${firstOctet}.0.0.0`,
        netBits: 8,
        hostBits: 24,
        prefix: '0xxxxxxx',
        type: firstOctet === 10 ? 'Private (10.0.0.0/8)' : firstOctet === 127 ? 'Loopback (127.0.0.1)' : 'Public IPv4',
        networkPart: `${firstOctet}`,
        hostPart: `${secondOctet}.${thirdOctet}.${fourthOctet}`,
        usableHosts: '16,777,214 hosts (2^24 - 2)',
        fullBinary,
      };
    } else if (firstOctet >= 128 && firstOctet <= 191) {
      const isPrivate = firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31;
      return {
        className: 'Class B',
        mask: '255.255.0.0',
        maskBinary: '11111111.11111111.00000000.00000000',
        netId: `${firstOctet}.${secondOctet}.0.0`,
        netBits: 16,
        hostBits: 16,
        prefix: '10xxxxxx',
        type: isPrivate ? 'Private (172.16.0.0/12)' : 'Public IPv4',
        networkPart: `${firstOctet}.${secondOctet}`,
        hostPart: `${thirdOctet}.${fourthOctet}`,
        usableHosts: '65,534 hosts (2^16 - 2)',
        fullBinary,
      };
    } else if (firstOctet >= 192 && firstOctet <= 223) {
      const isPrivate = firstOctet === 192 && secondOctet === 168;
      return {
        className: 'Class C',
        mask: '255.255.255.0',
        maskBinary: '11111111.11111111.11111111.00000000',
        netId: `${firstOctet}.${secondOctet}.${thirdOctet}.0`,
        netBits: 24,
        hostBits: 8,
        prefix: '110xxxxx',
        type: isPrivate ? 'Private (192.168.0.0/16)' : 'Public IPv4',
        networkPart: `${firstOctet}.${secondOctet}.${thirdOctet}`,
        hostPart: `${fourthOctet}`,
        usableHosts: '254 hosts (2^8 - 2)',
        fullBinary,
      };
    } else if (firstOctet >= 224 && firstOctet <= 239) {
      return {
        className: 'Class D',
        mask: 'N/A (Multicast Group)',
        maskBinary: '11100000.00000000.00000000.00000000',
        netId: 'Multicast Stream',
        netBits: 4,
        hostBits: 28,
        prefix: '1110xxxx',
        type: 'Multicast Streaming',
        networkPart: 'Group Prefix',
        hostPart: 'Group Members',
        usableHosts: 'Multicast distribution',
        fullBinary,
      };
    } else {
      return {
        className: 'Class E',
        mask: 'N/A (Experimental)',
        maskBinary: '11110000.00000000.00000000.00000000',
        netId: 'Experimental Block',
        netBits: 4,
        hostBits: 28,
        prefix: '1111xxxx',
        type: 'Reserved / Research',
        networkPart: 'Research Block',
        hostPart: 'Experimental',
        usableHosts: 'Reserved',
        fullBinary,
      };
    }
  }, [firstOctet, secondOctet, thirdOctet, fourthOctet]);

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
    const newDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
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
    let packetX = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.fillStyle = '#312e81';
      ctx.fillRect(centerX - 35, centerY - 15, 70, 30);
      ctx.strokeStyle = '#6366f1';
      ctx.strokeRect(centerX - 35, centerY - 15, 70, 30);

      ctx.fillStyle = '#ffffff';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('NAT ROUTER', centerX, centerY + 4);

      packetX = (packetX + 2) % canvas.width;
      ctx.beginPath();
      ctx.arc(packetX, centerY, 6, 0, Math.PI * 2);
      ctx.fillStyle = packetX < centerX ? '#f59e0b' : '#10b981';
      ctx.fill();

      ctx.font = '9px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'left';
      ctx.fillText('Private Lan: 192.168.1.0/24', 10, 15);
      ctx.textAlign = 'right';
      ctx.fillText('Public WAN: 203.115.71.45', canvas.width - 10, 15);

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animId);
  }, [phase]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (phase === 'discovery') {
      speechManager.speak('Welcome to the Network Operations Center. Let us begin with our discovery challenge.');
    } else if (phase === 'explore') {
      speechManager.speak('Explore the interactive networking and software architecture modules.');
    } else if (phase === 'sandbox') {
      speechManager.speak('Feel free to test any subnet, class, or data structure in free sandbox mode.');
    } else if (phase === 'challenge') {
      speechManager.speak('Challenge mode active. Read carefully and diagnose each question.');
    }
  }, [phase]);

  // ─── EVENT HANDLERS ───
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
      audioManager.play('pop');
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

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! Simulation complete with a score of ${finalScore} percent.`);
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
      isCorrect = (answer as string).trim() === challenge.targetState?.trim();
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
        speechManager.speak('All hints exhausted. Let us analyze the correct explanation together.');
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Well deduced! Network Address Translation makes private devices reachable globally.' : DISCOVERY_QUESTION.hintAfter);
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

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded. Now interact with the visualization to verify your prediction.');
  }, []);

  const handleDispatchNatPacket = useCallback((deviceIdx: number) => {
    setNatActivePacket(deviceIdx);
    audioManager.play('chime');
    setTimeout(() => {
      setNatActivePacket(null);
    }, 1400);
  }, []);

  const handleAddCollectionItem = useCallback(() => {
    if (!collectionInput.trim()) return;
    audioManager.play('pop');
    if (collectionType === 'Set') {
      if (collectionItems.includes(collectionInput.trim())) {
        speechManager.speak('Duplicate element detected! HashSet ignores repeated items.');
      } else {
        setCollectionItems(prev => [...prev, collectionInput.trim()]);
      }
    } else {
      setCollectionItems(prev => [...prev, collectionInput.trim()]);
    }
    setCollectionInput('');
  }, [collectionInput, collectionType, collectionItems]);

  const handlePutMapEntry = useCallback(() => {
    if (!mapKeyInput.trim() || !mapValInput.trim()) return;
    audioManager.play('drop-correct');
    setMapEntries(prev => ({ ...prev, [mapKeyInput.trim()]: mapValInput.trim() }));
    setMapKeyInput('');
    setMapValInput('');
  }, [mapKeyInput, mapValInput]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">

      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-2xl"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <span className="text-xs uppercase tracking-wider text-indigo-400 font-bold">{subjectConfig.name} • Class 11 (ISC)</span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('whoosh');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 rounded-3xl border border-indigo-500/20 shadow-xl">
            <div className="flex items-center gap-2 mb-2 text-indigo-400 text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span>MISSION DIRECTIVE</span>
            </div>
            <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 leading-relaxed text-sm sm:text-base">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 mt-3 p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/40">
              ⚡ {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <span>🎯 Curiosity Discovery Hook</span>
            </div>
            <h3 className="text-lg font-bold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950/50 border-slate-800 text-slate-500'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-indigo-500 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-lg bg-slate-800 text-center text-xs font-bold mr-3 leading-6 text-slate-300">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <p className="text-sm text-indigo-200">
                  {discoveryCorrect
                    ? '🎉 Superb deduction! NAT bridges private and public address realms seamlessly.'
                    : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setPhase('explore');
                    audioManager.play('whoosh');
                  }}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/30 whitespace-nowrap"
                >
                  Launch Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORE PHASE ─── */}
      {phase === 'explore' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">
                Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentSlide === 0}
                onClick={() => {
                  setCurrentSlide(s => Math.max(0, s - 1));
                  audioManager.play('whoosh');
                }}
                className="px-3.5 py-1.5 bg-slate-800 disabled:opacity-40 text-xs font-bold rounded-xl"
              >
                ← Previous
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) {
                    setCurrentSlide(s => s + 1);
                    audioManager.play('whoosh');
                  } else {
                    setPhase('sandbox');
                    audioManager.play('celebration');
                  }
                }}
                className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-xl"
              >
                {currentSlide === EXPLORATION_STEPS.length - 1 ? 'Go to Sandbox →' : 'Next Lab →'}
              </motion.button>
            </div>
          </div>

          <p className="text-amber-300 text-xs sm:text-sm bg-amber-950/30 p-3 rounded-xl border border-amber-800/40">
            👉 <strong>Action:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* ─── LAB 1: IP Addressing Multi-Representation (SVG 1 + Multi-Format Table) ─── */}
          {currentSlide === 0 && (
            <div className="space-y-6 p-6 bg-slate-900/90 rounded-3xl border border-slate-800">
              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Octet 1 (Class):</span>
                    <span className="text-indigo-400 font-mono font-bold text-sm">{firstOctet}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={255}
                    value={firstOctet}
                    aria-label="First Octet Slider"
                    onChange={(e) => {
                      setFirstOctet(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500">0-127 A | 128-191 B | 192-223 C</div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Octet 2:</span>
                    <span className="text-sky-400 font-mono font-bold text-sm">{secondOctet}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={255}
                    value={secondOctet}
                    aria-label="Second Octet Slider"
                    onChange={(e) => setSecondOctet(Number(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Octet 3:</span>
                    <span className="text-emerald-400 font-mono font-bold text-sm">{thirdOctet}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={255}
                    value={thirdOctet}
                    aria-label="Third Octet Slider"
                    onChange={(e) => setThirdOctet(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Octet 4 (Host):</span>
                    <span className="text-amber-400 font-mono font-bold text-sm">{fourthOctet}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={255}
                    value={fourthOctet}
                    aria-label="Fourth Octet Slider"
                    onChange={(e) => setFourthOctet(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* MULTI-REPRESENTATION SECTION */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* REPRESENTATION 1: TOPIC-SPECIFIC SVG DIAGRAM (32-Bit Bit Allocation) */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    Representation 1: 32-Bit Architecture SVG Diagram
                  </span>
                  <svg viewBox="0 0 520 180" className="w-full h-auto bg-slate-900 rounded-xl p-2 border border-slate-800">
                    <defs>
                      <linearGradient id="netGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                      <linearGradient id="hostGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#d97706" />
                      </linearGradient>
                    </defs>

                    {/* Outer 32-bit Container */}
                    <rect x="10" y="25" width="500" height="50" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />

                    {/* Network Portion Bar */}
                    <rect
                      x="10"
                      y="25"
                      width={ipClassInfo.netBits === 8 ? 125 : ipClassInfo.netBits === 16 ? 250 : 375}
                      height="50"
                      rx="6"
                      fill="url(#netGrad)"
                      className="transition-all duration-300"
                    />

                    {/* Host Portion Bar */}
                    <rect
                      x={10 + (ipClassInfo.netBits === 8 ? 125 : ipClassInfo.netBits === 16 ? 250 : 375)}
                      y="25"
                      width={500 - (ipClassInfo.netBits === 8 ? 125 : ipClassInfo.netBits === 16 ? 250 : 375)}
                      height="50"
                      rx="6"
                      fill="url(#hostGrad)"
                      className="transition-all duration-300"
                    />

                    {/* 4 Octet Boundary Dividers */}
                    <line x1="135" y1="20" x2="135" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
                    <line x1="260" y1="20" x2="260" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
                    <line x1="385" y1="20" x2="385" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />

                    {/* Octet Labels */}
                    <text x="72" y="55" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Octet 1 ({firstOctet})</text>
                    <text x="197" y="55" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Octet 2 ({secondOctet})</text>
                    <text x="322" y="55" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Octet 3 ({thirdOctet})</text>
                    <text x="447" y="55" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Octet 4 ({fourthOctet})</text>

                    {/* Subnet Division Legends */}
                    <text x="72" y="100" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Network: {ipClassInfo.netBits} Bits
                    </text>
                    <text x="447" y="100" fill="#fcd34d" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Host: {ipClassInfo.hostBits} Bits
                    </text>

                    {/* Summary Info at bottom */}
                    <rect x="10" y="120" width="500" height="45" rx="6" fill="#1e1b4b" stroke="#4338ca" strokeWidth="1" />
                    <text x="25" y="145" fill="#a5b4fc" fontSize="11" fontWeight="bold">
                      {ipClassInfo.className} ({ipClassInfo.prefix}) • Subnet Mask: {ipClassInfo.mask} • Capacity: {ipClassInfo.usableHosts}
                    </text>
                  </svg>
                </div>

                {/* REPRESENTATION 2: BITWISE SUBMISSION TABLE & BINARY EQUATIONS */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                  <span className="font-sans text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                    Representation 2: Bitwise Logic & CIDR Calculation
                  </span>

                  <div className="space-y-1.5 p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Decimal IPv4:</span>
                      <span className="text-white font-bold">{firstOctet}.{secondOctet}.{thirdOctet}.{fourthOctet}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">32-Bit Binary:</span>
                      <span className="text-indigo-300 text-[11px]">{ipClassInfo.fullBinary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Subnet Mask:</span>
                      <span className="text-emerald-300 text-[11px]">{ipClassInfo.maskBinary}</span>
                    </div>
                    <div className="border-t border-slate-800 pt-1.5 flex justify-between text-amber-300 font-bold">
                      <span>Bitwise (IP & Mask) = Network ID:</span>
                      <span>{ipClassInfo.netId}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-slate-400 font-sans font-bold">CIDR Notation</div>
                      <div className="text-sky-400 font-bold text-sm mt-0.5">/{ipClassInfo.netBits}</div>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-slate-400 font-sans font-bold">Scope / Classification</div>
                      <div className="text-indigo-400 font-bold text-sm mt-0.5">{ipClassInfo.type}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Predict-Then-Check */}
              {!predictionMade ? (
                <div className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-800/60 space-y-2">
                  <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider">🔬 Prediction Challenge</span>
                  <p className="text-xs text-white">{PREDICTION_QUESTIONS[0].question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePrediction(i)}
                        className="p-2 text-left text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-700"
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-indigo-300">
                    {predictionIndex === PREDICTION_QUESTIONS[0].correctIndex ? '✓ Correct Prediction!' : '⚡ Check Verification:'}
                  </span>
                  <span className="text-slate-400 text-[11px]">{PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                </div>
              )}
            </div>
          )}

          {/* ─── LAB 2: NAT GATEWAY TOPOLOGY (SVG 2) ─── */}
          {currentSlide === 1 && (
            <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">LAN to WAN Network Address Translation (NAT) Topology</h3>
                  <p className="text-xs text-slate-400">Click any internal computer to dispatch an HTTP packet to the Web Server.</p>
                </div>
                <div className="px-3 py-1 bg-indigo-900/50 rounded-full text-xs text-indigo-300 border border-indigo-700">
                  Public IP: 203.115.71.45
                </div>
              </div>

              {/* TOPIC-SPECIFIC SVG 2: NAT ARCHITECTURE DIAGRAM */}
              <div className="p-4 bg-slate-950 rounded-3xl border border-slate-800">
                <svg viewBox="0 0 700 240" className="w-full h-auto">
                  {/* LAN Zone */}
                  <rect x="10" y="10" width="220" height="220" rx="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
                  <text x="25" y="35" fill="#94a3b8" fontSize="12" fontWeight="bold">Private LAN (192.168.1.0/24)</text>

                  {/* Device 1 */}
                  <g
                    className="cursor-pointer"
                    onClick={() => handleDispatchNatPacket(1)}
                  >
                    <rect x="25" y="50" width="190" height="45" rx="8" fill={natActivePacket === 1 ? '#78350f' : '#1e293b'} stroke={natActivePacket === 1 ? '#f59e0b' : '#334155'} />
                    <text x="35" y="70" fill="#ffffff" fontSize="11" fontWeight="bold">🖥️ Workstation 1</text>
                    <text x="35" y="85" fill="#94a3b8" fontSize="9" fontFamily="monospace">192.168.1.10:49152</text>
                  </g>

                  {/* Device 2 */}
                  <g
                    className="cursor-pointer"
                    onClick={() => handleDispatchNatPacket(2)}
                  >
                    <rect x="25" y="105" width="190" height="45" rx="8" fill={natActivePacket === 2 ? '#78350f' : '#1e293b'} stroke={natActivePacket === 2 ? '#f59e0b' : '#334155'} />
                    <text x="35" y="125" fill="#ffffff" fontSize="11" fontWeight="bold">🖥️ Workstation 2</text>
                    <text x="35" y="140" fill="#94a3b8" fontSize="9" fontFamily="monospace">192.168.1.20:49153</text>
                  </g>

                  {/* Device 3 */}
                  <g
                    className="cursor-pointer"
                    onClick={() => handleDispatchNatPacket(3)}
                  >
                    <rect x="25" y="160" width="190" height="45" rx="8" fill={natActivePacket === 3 ? '#78350f' : '#1e293b'} stroke={natActivePacket === 3 ? '#f59e0b' : '#334155'} />
                    <text x="35" y="180" fill="#ffffff" fontSize="11" fontWeight="bold">🖥️ Workstation 3</text>
                    <text x="35" y="195" fill="#94a3b8" fontSize="9" fontFamily="monospace">192.168.1.30:49154</text>
                  </g>

                  {/* Connection Lines */}
                  <line x1="230" y1="120" x2="280" y2="120" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />

                  {/* NAT Gateway Router */}
                  <rect x="280" y="40" width="150" height="160" rx="16" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                  <text x="355" y="65" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">NAT ROUTER</text>
                  <text x="355" y="82" fill="#a5b4fc" fontSize="9" textAnchor="middle">Port Translation Table</text>
                  <rect x="290" y="95" width="130" height="90" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="295" y="115" fill="#10b981" fontSize="8" fontFamily="monospace">
                    {natActivePacket ? `192.168.1.${natActivePacket * 10}` : 'No active flow'}
                  </text>
                  <text x="295" y="130" fill="#f59e0b" fontSize="8" fontFamily="monospace">
                    {natActivePacket ? `⬇ Translation` : 'Idle listening'}
                  </text>
                  <text x="295" y="145" fill="#38bdf8" fontSize="8" fontFamily="monospace">
                    {natActivePacket ? `WAN: 203.115.71.45:${8080 + natActivePacket}` : 'Awaiting packet...'}
                  </text>

                  {/* WAN Line */}
                  <line x1="430" y1="120" x2="480" y2="120" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />

                  {/* Internet Cloud & Destination Web Server */}
                  <rect x="480" y="10" width="210" height="220" rx="16" fill="#064e3b" stroke="#059669" strokeWidth="2" />
                  <text x="585" y="35" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">🌐 Public Internet</text>
                  <rect x="495" y="60" width="180" height="130" rx="12" fill="#022c22" stroke="#10b981" />
                  <text x="585" y="90" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Web Server</text>
                  <text x="585" y="110" fill="#a7f3d0" fontSize="10" fontFamily="monospace" textAnchor="middle">IP: 142.250.190.46</text>
                  <text x="585" y="130" fill="#6ee7b7" fontSize="9" textAnchor="middle">Port 443 (HTTPS)</text>
                  <text x="585" y="165" fill="#fcd34d" fontSize="9" textAnchor="middle">
                    {natActivePacket ? 'Packets Arriving via Public IP' : 'Awaiting Connection'}
                  </text>
                </svg>
              </div>
            </div>
          )}

          {/* ─── LAB 3: CLOUD ARCHITECTURE (SVG 3) ─── */}
          {currentSlide === 2 && (
            <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex flex-wrap gap-2">
                {(['IaaS', 'PaaS', 'SaaS'] as const).map(model => (
                  <motion.button
                    key={model}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedCloudModel(model);
                      audioManager.play('tap');
                    }}
                    className={`px-5 py-2 rounded-2xl text-xs font-bold transition-all ${
                      selectedCloudModel === model
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {model} Model
                  </motion.button>
                ))}
              </div>

              {/* TOPIC-SPECIFIC SVG 3: CLOUD STACK RESPONSIBILITY DIAGRAM */}
              <div className="p-4 bg-slate-950 rounded-3xl border border-slate-800">
                <svg viewBox="0 0 700 240" className="w-full h-auto">
                  <text x="350" y="25" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">
                    Shared Responsibility Model: {selectedCloudModel} Architecture
                  </text>

                  {/* 6 Layers of Cloud Stack */}
                  {[
                    { name: 'Application Code', y: 45 },
                    { name: 'Data & DB Storage', y: 75 },
                    { name: 'Runtime & Middleware', y: 105 },
                    { name: 'Operating System', y: 135 },
                    { name: 'Virtualization & Hypervisor', y: 165 },
                    { name: 'Physical Hardware & DC', y: 195 },
                  ].map((layer, idx) => {
                    const isUser =
                      selectedCloudModel === 'IaaS' ? idx <= 3 :
                      selectedCloudModel === 'PaaS' ? idx <= 1 :
                      false;

                    return (
                      <g key={layer.name}>
                        <rect
                          x="50"
                          y={layer.y}
                          width="600"
                          height="25"
                          rx="5"
                          fill={isUser ? '#4338ca' : '#1e293b'}
                          stroke={isUser ? '#818cf8' : '#334155'}
                          strokeWidth="1.5"
                        />
                        <text x="70" y={layer.y + 17} fill="#ffffff" fontSize="11" fontWeight="bold">
                          {layer.name}
                        </text>
                        <text
                          x="630"
                          y={layer.y + 17}
                          fill={isUser ? '#a5b4fc' : '#94a3b8'}
                          fontSize="10"
                          fontWeight="bold"
                          textAnchor="end"
                        >
                          {isUser ? 'MANAGED BY YOU (Tenant)' : 'MANAGED BY CLOUD PROVIDER'}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          )}

          {/* ─── LAB 4: ANDROID LIFECYCLE STATE MACHINE (SVG 4) ─── */}
          {currentSlide === 3 && (
            <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex flex-wrap gap-2">
                {[
                  { label: '🚀 Launch App', state: 'RESUMED' as const },
                  { label: '📞 Phone Call Interrupt', state: 'PAUSED' as const },
                  { label: '🛑 Navigate to Home', state: 'STOPPED' as const },
                  { label: '❌ Swipe Dismiss', state: 'DESTROYED' as const }
                ].map(action => (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setAndroidState(action.state);
                      audioManager.play('tap');
                    }}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold ${
                      androidState === action.state
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {action.label}
                  </motion.button>
                ))}
              </div>

              {/* TOPIC-SPECIFIC SVG 4: ANDROID ACTIVITY STATE MACHINE */}
              <div className="p-4 bg-slate-950 rounded-3xl border border-slate-800">
                <svg viewBox="0 0 700 180" className="w-full h-auto">
                  {['CREATED', 'STARTED', 'RESUMED', 'PAUSED', 'STOPPED', 'DESTROYED'].map((st, i) => {
                    const isActive = androidState === st;
                    const x = 30 + i * 110;
                    return (
                      <g key={st}>
                        <rect
                          x={x}
                          y="60"
                          width="90"
                          height="60"
                          rx="10"
                          fill={isActive ? '#065f46' : '#0f172a'}
                          stroke={isActive ? '#34d399' : '#334155'}
                          strokeWidth={isActive ? 3 : 1.5}
                        />
                        <text x={x + 45} y="85" fill={isActive ? '#6ee7b7' : '#94a3b8'} fontSize="9" textAnchor="middle">
                          Step {i + 1}
                        </text>
                        <text x={x + 45} y="105" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                          {st}
                        </text>

                        {i < 5 && (
                          <line
                            x1={x + 90}
                            y1="90"
                            x2={x + 110}
                            y2="90"
                            stroke={isActive ? '#34d399' : '#475569'}
                            strokeWidth="2"
                            markerEnd="url(#arrow)"
                          />
                        )}
                      </g>
                    );
                  })}
                  <text x="350" y="30" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                    Current Active State: <tspan fill="#34d399">{androidState}</tspan>
                  </text>
                </svg>
              </div>
            </div>
          )}

          {/* ─── LAB 5: JAVA COLLECTIONS LAB ─── */}
          {currentSlide === 4 && (
            <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex gap-2">
                {(['List', 'Set', 'Map'] as const).map(col => (
                  <motion.button
                    key={col}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCollectionType(col);
                      audioManager.play('tap');
                    }}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold ${
                      collectionType === col
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {col} Interface
                  </motion.button>
                ))}
              </div>

              {collectionType !== 'Map' ? (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={collectionInput}
                      onChange={(e) => setCollectionInput(e.target.value)}
                      placeholder="Add city or string item..."
                      className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 flex-grow"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddCollectionItem}
                      className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
                    >
                      + Add Item
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setCollectionInput('Kolkata');
                        handleAddCollectionItem();
                      }}
                      className="px-4 py-2 bg-slate-800 text-amber-300 text-xs font-bold rounded-xl border border-amber-500/30"
                    >
                      + Add Duplicate ("Kolkata")
                    </motion.button>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="text-xs text-slate-400 mb-2">
                      {collectionType === 'List' ? 'ArrayList<String> Elements (Indexed with duplicates):' : 'HashSet<String> Elements (Unique hashing):'}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {collectionItems.map((item, idx) => (
                        <span key={idx} className="px-3 py-1 bg-indigo-950 text-indigo-200 border border-indigo-800 rounded-xl text-xs font-mono">
                          {collectionType === 'List' && <span className="text-indigo-400 mr-1">[{idx}]</span>}
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={mapKeyInput}
                      onChange={(e) => setMapKeyInput(e.target.value)}
                      placeholder="State Code (Key)..."
                      className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white flex-1"
                    />
                    <input
                      type="text"
                      value={mapValInput}
                      onChange={(e) => setMapValInput(e.target.value)}
                      placeholder="Capital City (Value)..."
                      className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white flex-1"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePutMapEntry}
                      className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
                    >
                      put(k, v)
                    </motion.button>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="text-xs text-slate-400 mb-2">HashMap&lt;String, String&gt; Key-Value Pairs:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {Object.entries(mapEntries).map(([k, v]) => (
                        <div key={k} className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono">
                          <span className="text-amber-400 font-bold">{k}</span> ➔ <span className="text-emerald-400">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-2">
            <h2 className="text-xl font-bold text-white">Free Sandbox & Subnet Playground</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Experiment freely with variable octet configurations, custom bits, and packet routing with zero grading pressure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-900/90 rounded-3xl border border-slate-800">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-indigo-300 uppercase">Subnet Calculator Tool</h3>
              <div>
                <label className="text-xs text-slate-300 font-semibold flex justify-between">
                  <span>First Octet:</span>
                  <span className="font-mono text-indigo-400">{sandboxOctet}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={254}
                  value={sandboxOctet}
                  aria-label="Sandbox Octet"
                  onChange={(e) => setSandboxOctet(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold flex justify-between">
                  <span>CIDR Subnet Prefix Length:</span>
                  <span className="font-mono text-emerald-400">/{sandboxBits}</span>
                </label>
                <input
                  type="range"
                  min={8}
                  max={30}
                  value={sandboxBits}
                  aria-label="Sandbox Prefix Length"
                  onChange={(e) => setSandboxBits(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-mono space-y-1">
                <div>Total Usable Host IP Addresses: <span className="text-sky-400 font-bold">{Math.pow(2, 32 - sandboxBits) - 2}</span></div>
                <div>Host Bits Available: <span className="text-amber-400">{32 - sandboxBits} bits</span></div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-indigo-300 uppercase">Live WAN Packet Inspection</h3>
              <canvas
                ref={canvasRef}
                width={450}
                height={160}
                className="w-full bg-slate-950 rounded-2xl border border-slate-800"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('challenge');
                audioManager.play('whoosh');
              }}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-emerald-600/30"
            >
              Ready for Graded Challenges! →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="ml-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800 uppercase">
                  {challenge.competencyLevel}
                </span>
              </div>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                  difficulty === 'standard' ? 'bg-indigo-950 text-indigo-400 border border-indigo-800' :
                  'bg-rose-950 text-rose-400 border border-rose-800'
                }`}
              >
                {difficulty}
              </motion.span>
            </div>

            <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-3xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <h3 className="text-base sm:text-lg font-bold text-white whitespace-pre-line leading-relaxed mb-6">
              {challenge.question}
            </h3>

            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-indigo-500 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="inline-block w-6 h-6 rounded-lg bg-slate-800 text-center text-xs font-bold mr-3 leading-6 text-slate-300">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-grab active:cursor-grabbing"
                    >
                      ⠿ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map((targetId) => (
                    <div
                      key={targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 text-center min-h-[70px] flex flex-col items-center justify-center"
                    >
                      <span className="text-[10px] text-slate-500 uppercase font-bold">{targetId.replace('_', ' ')}</span>
                      <span className="text-xs font-bold text-emerald-400 mt-1">
                        {droppedLabels[targetId] || 'Drop matching label here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl"
                >
                  Verify Target Mappings
                </motion.button>
              </div>
            )}

            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length ? sortArrangement.map(idx => challenge.sortItems![idx]) : challenge.sortItems).map((item, idx) => (
                  <motion.div
                    key={idx}
                    draggable
                    onDragStart={() => setDraggedItem(String(idx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, idx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-semibold text-slate-200 cursor-grab flex items-center justify-between"
                  >
                    <span>{idx + 1}. {item}</span>
                    <span className="text-slate-500">⠿ Drag</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl"
                >
                  Confirm Sorted Sequence
                </motion.button>
              </div>
            )}

            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculation..."
                    className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl"
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            )}

            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-950 border border-indigo-700 text-indigo-200 rounded-xl text-xs font-mono"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-indigo-700 text-white rounded-lg text-xs font-mono flex items-center gap-1">
                      {part}
                      <button onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))} className="text-red-300 ml-1">✕</button>
                    </span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl"
                >
                  Verify Constructed Class
                </motion.button>
              </div>
            )}

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-indigo-950/40 border border-indigo-800/80 rounded-2xl space-y-3"
              >
                <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  📋 Technical Breakdown:
                </div>

                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                  >
                    <strong className="text-indigo-400">{idx + 1}.</strong> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="pt-2 flex flex-wrap gap-3">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-indigo-800 text-white text-xs font-bold rounded-xl"
                    >
                      Reveal Next Step →
                    </motion.button>
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
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

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="p-8 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 rounded-3xl border border-emerald-500/30 text-center space-y-3">
            <div className="text-4xl">🏆</div>
            <h2 className="text-3xl font-black text-white">Mission Complete!</h2>
            <p className="text-slate-300 text-sm">You successfully diagnosed all CISCE Class 11 Network & Architecture challenges.</p>
            <div className="text-4xl font-black text-emerald-400">
              {Math.max(0, 100 - errors * 5)}%
            </div>
            <div className="text-xs text-slate-400">
              BKT Cognitive Mastery Status: <span className="text-indigo-400 font-bold uppercase">{masteryLevel}</span>
            </div>
          </div>

          <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Instructor Assessment</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {errors === 0
                ? 'PERFECT SCORE! Outstanding mastery of IPv4/IPv6 address partitions, NAT gateways, and Java type parameters.'
                : errors <= 3
                ? 'Great execution! Strong grasp of networking fundamentals and collection frameworks.'
                : 'Good effort! Review the misconception profile below to reinforce your understanding.'}
            </p>
          </div>

          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-3xl border border-rose-900/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Identified Misconception Profile:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-950 rounded-2xl border border-rose-900/40 text-xs space-y-1">
                      <div className="text-rose-400 font-bold">❌ {m.misconception}</div>
                      <div className="text-emerald-400">✓ {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="p-5 bg-indigo-950/40 rounded-3xl border border-indigo-800/60 space-y-2 text-xs">
            <h3 className="font-bold text-indigo-300 uppercase tracking-wider">Spaced Repetition Review Schedule</h3>
            <p className="text-slate-300">
              Next scheduled review in <span className="font-bold text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span> to maintain long-term memory retention.
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">{i + 1}.</span>
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
      {showSuccess && <SuccessBanner message="Challenge Diagnosed Correctly!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_ComputerScienceAddressingIpv4Ipv6Sim;
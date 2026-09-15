'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDENTIFIERS ───
const NODE_C9_COMMAPP_011 = 'c9_commapp_011';
const NODE_C9_COMMAPP_012 = 'c9_commapp_012';
const NODE_C9_COMMAPP_013 = 'c9_commapp_013';
const NODE_C9_COMMAPP_014 = 'c9_commapp_014';
const NODE_C9_COMMAPP_015 = 'c9_commapp_015';
const NODE_C9_COMMAPP_016 = 'c9_commapp_016';
const NODE_C9_COMMAPP_017 = 'c9_commapp_017';

const ALL_NODE_IDS = [
  NODE_C9_COMMAPP_011,
  NODE_C9_COMMAPP_012,
  NODE_C9_COMMAPP_013,
  NODE_C9_COMMAPP_014,
  NODE_C9_COMMAPP_015,
  NODE_C9_COMMAPP_016,
  NODE_C9_COMMAPP_017,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Manesar Supply & Communication Crisis',
  intro: 'At Maruti Suzuki’s Manesar plant, an unexpected 10-day blast furnace breakdown at JSW Steel has halted critical raw steel shipments for the Swift assembly line. Meanwhile, customer backlogs are mounting, dealer contracts are under scrutiny, and workers are sitting idle.',
  context: 'As Chief Operating Officer, you must navigate the complex web of departmental dependence, activate emergency cross-linkages, and choose precise verbal, non-verbal, and technological communication tools to keep the organisation resilient.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'JSW Steel delays delivery of cold-rolled steel sheets by 10 days to Maruti Suzuki. What is the immediate and cascading operational impact?',
  options: [
    'Only the Purchase Department is delayed; other departments continue unaffected.',
    'Production stops Swift assembly, Sales misses dealer orders, Finance pays idle wages, and Legal reviews penalty clauses.',
    'Finance immediately increases car prices to compensate for the supplier delay.',
    'HR dismisses the assembly line workers to cut costs completely.',
  ],
  correctIndex: 1,
  hintAfter: 'Notice how a single department delay ripples through the entire company! Let us explore how every functional department is interconnected.',
};

// ─── OBSERVATION QUESTIONS (Brilliant.org "What do you notice?" Pattern) ───
interface ObservationQuestion {
  id: string;
  labSlide: number;
  question: string;
  observableOptions: string[];
  correctIndex: number;
  explanation: string;
}

const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_01',
    labSlide: 0,
    question: 'What do you notice happening across the operational network as you drag the Supplier Steel Delay slider from 0 to 10 days?',
    observableOptions: [
      'Only the Purchase node changes; all other departments remain unaffected.',
      'A cascading ripple effect occurs: assembly halt climbs to 500 Swift cars, revenue loss reaches ₹50 Cr, and idle wages surge.',
      'Finance revenue loss decreases to zero because factory operations are paused.',
      'Administrative costs for shifts and security drop to zero immediately.',
    ],
    correctIndex: 1,
    explanation: 'Observing the interactive ripple network demonstrates departmental interdependence: a single upstream procurement delay halts production, leaves workers idle, starves sales, and forces legal review.',
  },
  {
    id: 'obs_02',
    labSlide: 3,
    question: 'When you lower both Vocal Tone and Body Posture sliders to defensive levels (<30%), what do you observe about the Receiver Trust Rating?',
    observableOptions: [
      'Trust remains at 100% because spoken words alone dictate human communication.',
      'Trust collapses below 45% because non-verbal channels (55% posture + 38% tone) contradict the spoken words.',
      'The verbal text automatically translates into an official written memorandum.',
      'Receiver trust becomes unpredictable and oscillates randomly between 0% and 100%.',
    ],
    correctIndex: 1,
    explanation: 'As Albert Mehrabian’s model demonstrates, body language (55%) and vocal tone (38%) constitute 93% of perceived credibility during emotional exchanges. Contradictory non-verbal cues destroy trust.',
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

// ─── CHALLENGES ARRAY (21 Challenges: 7 Foundation, 7 Standard, 7 Advanced) ───
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION (1-7) ──
  {
    id: 'ch_f01',
    nodeId: NODE_C9_COMMAPP_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is an "indent" in the inter-departmental relationship between Production and Purchase?',
    options: [
      'A formal internal request from Production asking Purchase to buy specific raw materials',
      'An external tax invoice sent to the supplier',
      'A disciplinary memo sent from HR to assembly workers',
      'A legal contract signed between Sales and the car dealer',
    ],
    correctIndex: 0,
    explanation: 'An indent is a formal internal requisition document raised by Production specifying what materials, quantities, and dates are required from the Purchase Department.',
    hints: [
      'Think about internal requisitions before external purchase orders are issued.',
      'It moves from the department using the raw material to the department that buys it.',
      'Production raises an indent on Purchase to initiate material procurement.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_f02',
    nodeId: NODE_C9_COMMAPP_012,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does a "cross-linkage" fundamentally differ from a routine linear inter-relationship?',
    options: [
      'Cross-linkages only occur in government companies, not private firms.',
      'Cross-linkages are non-adjacent, two-way connections that bypass the normal sequential chain during crises or strategic shifts.',
      'Linear inter-relationships are always informal, while cross-linkages are always documented by lawyers.',
      'Cross-linkages mean departments operate in complete isolation without sharing information.',
    ],
    correctIndex: 1,
    explanation: 'Linear inter-relationships follow sequential paths (Purchase → Production → Sales), whereas cross-linkages connect non-adjacent departments directly (e.g. Legal ↔ Production during the Maggi noodles ban).',
    hints: [
      'Remember the difference between adjacent chain steps and direct diagonal connections.',
      'Consider how Legal talked directly to Production during the 2015 Maggi ban.',
      'Cross-linkages bypass normal sequential lines to connect non-adjacent departments in two-way flows.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_f03',
    nodeId: NODE_C9_COMMAPP_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which factor has most significantly multiplied communication volume and formal infrastructure needs in modern Indian firms like Tata Group and Infosys?',
    options: [
      'Reduction in workforce size and consolidation into single rooms',
      'Vast geographical spread, massive workforce scale (lakhs of employees), and rapid decision-making speeds',
      'Complete replacement of all written laws with oral traditions',
      'The prohibition of intranet software across Indian IT corridors',
    ],
    correctIndex: 1,
    explanation: 'Massive workforce sizes (e.g. Tata Group’s 9.35+ lakh employees), global geographic spread, and high-speed decision cycles demand structured digital communication infrastructure.',
    hints: [
      'Compare a 2-person Kirana store to a company with 50+ international offices.',
      'Think about coordinating 6+ lakh TCS employees across time zones.',
      'Scale, geography, and speed make formal communication systems indispensable.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_f04',
    nodeId: NODE_C9_COMMAPP_014,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A telephone call between a branch manager and a client is correctly classified as which form of communication?',
    options: [
      'Non-verbal communication because nothing was written on paper',
      'Spoken verbal communication because it uses spoken words',
      'Informal non-verbal signal because it involves electronic waves',
      'Written verbal communication because phone numbers contain digits',
    ],
    correctIndex: 1,
    explanation: '"Verbal" comes from the Latin "verbum" meaning "word". Spoken words over the telephone are spoken verbal communication.',
    hints: [
      'Does a phone call use words? Yes.',
      'Verbal communication includes both written words AND spoken words.',
      'Spoken words make a telephone call a spoken verbal communication.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_f05',
    nodeId: NODE_C9_COMMAPP_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On a noisy Tata Motors assembly line where spoken words cannot be heard, colour-coded lamps (Green/Red/Yellow) represent which communication channel?',
    options: [
      'Visual non-verbal signals',
      'Written verbal contracts',
      'Spoken verbal announcements',
      'Interpersonal feedback loops',
    ],
    correctIndex: 0,
    explanation: 'Colour codes, gestures, and signals transmit meaning without words, making them visual non-verbal communication.',
    hints: [
      'Are there words written or spoken in a flashing red safety lamp?',
      'Non-verbal communication uses cues, body language, or signals without words.',
      'Lamps and visual indicators are non-verbal visual signals.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_f06',
    nodeId: NODE_C9_COMMAPP_016,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the primary operational difference between "hearing" and "active listening"?',
    options: [
      'Hearing is active mental reasoning; listening is passive ear vibration.',
      'Hearing is a passive physiological reception of sound; active listening is a deliberate mental process of focusing, interpreting, paraphrasing, and responding.',
      'Active listening only applies when communicating through emails and memos.',
      'Hearing is only performed by managers, while listening is performed by subordinates.',
    ],
    correctIndex: 1,
    explanation: 'Hearing is physiological and automatic. Active listening requires conscious effort: focusing, reading non-verbal cues, paraphrasing to verify understanding, and responding constructively.',
    hints: [
      'Think about whether you can switch off hearing sound in a room.',
      'Active listening involves confirming what the speaker meant before formulating your reply.',
      'Paraphrasing and deliberate interpretation separate active listening from mere hearing.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_f07',
    nodeId: NODE_C9_COMMAPP_017,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the business communication tool to its defining institutional characteristic.',
    dragItems: [
      { label: 'Memo', targetId: 'target_memo' },
      { label: 'Registered Letter', targetId: 'target_letter' },
      { label: 'E-mail', targetId: 'target_email' },
      { label: 'Video-Conference', targetId: 'target_vc' },
    ],
    correctMapping: {
      target_memo: 'Memo',
      target_letter: 'Registered Letter',
      target_email: 'E-mail',
      target_vc: 'Video-Conference',
    },
    explanation: 'Memos are internal documents; registered letters provide statutory evidence in court; emails offer fast trackable messaging; video-conferencing allows multi-city face-to-face visual meetings.',
    hints: [
      'Which document is exclusively internal with a TO/FROM/REF header? Memo.',
      'Which document is required under Section 138 of the Negotiable Instruments Act? Registered Letter.',
      'Match emails to digital attachments and video-conferences to visual interaction.',
    ],
  },

  // ── STANDARD (8-14) ──
  {
    id: 'ch_s08',
    nodeId: NODE_C9_COMMAPP_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Amul receives an order for 50,000 litres of flavoured milk from a Delhi school chain. Which department coordinates refrigerated milk tankers at 4°C to prevent spoilage?',
    options: [
      'General Administration (Transport & Logistics)',
      'Legal Department',
      'Finance Department',
      'Human Resources Department',
    ],
    correctIndex: 0,
    explanation: 'General Administration oversees company facilities, transport logistics, and cold-chain vehicle dispatch to ensure safe transit.',
    hints: [
      'Consider which department handles physical facilities, vehicles, and office services.',
      'HR recruits workers; Finance sanctions payments; General Administration handles transport.',
      'General Administration manages infrastructure, canteen, security, and transport logistics.',
    ],
  },
  {
    id: 'ch_s09',
    nodeId: NODE_C9_COMMAPP_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'During the 2015 Maggi ban by FSSAI, Nestlé’s Legal team connected directly with Production to halt the Goa plant, and Finance connected directly with Marketing to calculate campaign withdrawal costs. Why are these links called "cross-linkages"?',
    options: [
      'They represent routine sequential steps between adjacent production stages.',
      'They bypass the standard sequential chain (Purchase → Production → Sales) to connect non-adjacent departments in two-way emergency workflows.',
      'They eliminated the need for financial accounting in the company.',
      'They were unauthorized informal rumors circulating on social media.',
    ],
    correctIndex: 1,
    explanation: 'Cross-linkages bypass the linear chain because an urgent regulatory or crisis event requires direct, non-adjacent departmental coordination.',
    hints: [
      'Do Legal and Production normally touch each other in the daily sequential factory chain?',
      'They skipped intermediate departments like Purchase and Sales to address the crisis directly.',
      'Non-adjacent departments coordinating two-way responses during crises are cross-linkages.',
    ],
  },
  {
    id: 'ch_s10',
    nodeId: NODE_C9_COMMAPP_013,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If an assembly line delay at an automobile plant costs ₹85,000 per minute in idle wages, overheads, and lost output, calculate the direct financial loss (in Lakhs of Rupees) of a 40-minute communication breakdown.',
    correctAnswer: 34,
    tolerance: 0.5,
    unit: 'Lakhs ₹',
    explanation: '40 minutes × ₹85,000/min = ₹34,00,000 = ₹34 Lakhs.',
    hints: [
      'Multiply the duration (40 min) by the cost per minute (₹85,000).',
      '40 × 85,000 = 34,00,000 rupees.',
      '1 Lakh = 1,00,000. So 34,00,000 / 1,00,000 = 34 Lakhs.',
    ],
  },
  {
    id: 'ch_s11',
    nodeId: NODE_C9_COMMAPP_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Larsen & Toubro (L&T) mandates written Purchase Orders for all vendor transactions exceeding ₹5 Lakh. Why is written communication legally preferred here over spoken phone orders?',
    options: [
      'Spoken agreements are completely illegal under Indian contract law in all contexts.',
      'Written electronic/paper records are admissible under Section 65B of the Indian Evidence Act, providing verifiable proof of terms during disputes.',
      'Written orders do not require GST registration numbers.',
      'Spoken communication takes three weeks longer to complete than drafting a contract.',
    ],
    correctIndex: 1,
    explanation: 'While oral agreements can be valid under Contract Act Sec 10, proving oral terms in court is difficult. Written records under Section 65B Evidence Act provide solid, verifiable documentary evidence.',
    hints: [
      'Think about proving exact quantities and specifications in an arbitration court.',
      'Under the Indian Evidence Act 1872 Section 65B, written and digital records serve as direct evidence.',
      'Written records protect against evidentiary uncertainty during commercial disputes.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_s12',
    nodeId: NODE_C9_COMMAPP_015,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A visiting German engineer interprets a South Indian vendor’s gentle side-to-side head tilt ("head bobble") as disagreement ("no"). What does this gesture actually signify in Indian business culture?',
    options: [
      'Outright contract termination and refusal to cooperate',
      '"I understand", "I am listening attentively", or "Affirmative/Okay"',
      'A demand for a higher discount',
      'Confusion regarding factory blueprint measurements',
    ],
    correctIndex: 1,
    explanation: 'In Indian cultural context, the head tilt signals attentive listening, comprehension, or acknowledgment, demonstrating how non-verbal cues are culturally coded.',
    hints: [
      'Is the head bobble a negative shake in South India?',
      'It signifies acknowledgment and respectful listening during conversations.',
      'It means "I understand / I am listening", not "No".',
    ],
  },
  {
    id: 'ch_s13',
    nodeId: NODE_C9_COMMAPP_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An ICICI Bank Relationship Manager says: "So you are stating that a ₹250 annual maintenance charge was deducted from your savings account without prior SMS intimation — is that correct?" Which interpersonal technique is being utilized?',
    options: [
      'Assertive contract penalty enforcement',
      'Active listening through paraphrasing to verify customer message',
      'Passive hearing with non-verbal dismissal',
      'Hostile confrontation over bank fees',
    ],
    correctIndex: 1,
    explanation: 'Repeating and paraphrasing the speaker’s message in one’s own words confirms shared understanding before formulating a solution — the hallmark of active listening.',
    hints: [
      'Notice how the manager reflects back the exact issue to ensure accuracy.',
      'Paraphrasing verifies that the listener truly processed the content.',
      'This is active listening.',
    ],
  },
  {
    id: 'ch_s14',
    nodeId: NODE_C9_COMMAPP_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Under Section 138 of the Negotiable Instruments Act 1881 (cheque dishonour), which communication tool MUST be used to issue the mandatory statutory demand notice to ensure court admissibility?',
    options: [
      'Informal WhatsApp voice note',
      'Registered post letter with Acknowledgement Due (AD)',
      'A quick phone call from the accountant',
      'An internal office memo',
    ],
    correctIndex: 1,
    explanation: 'Section 138 of the Negotiable Instruments Act requires statutory demand notices to be dispatched via Registered Post with Acknowledgement Due (AD) to establish legal proof of delivery.',
    hints: [
      'Statutory notices require certified physical proof of receipt.',
      'Can an informal WhatsApp note guarantee statutory proof under Section 138 NI Act?',
      'A registered post letter with AD provides the statutory postal receipt and delivery proof.',
    ],
  },

  // ── ADVANCED (15-21) ──
  {
    id: 'ch_a15',
    nodeId: NODE_C9_COMMAPP_011,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the sequential steps of an automotive sales order cascade across the 7 functional departments in the correct operational order.',
    sortItems: [
      'Dealer places order with Sales; Sales informs Production schedule',
      'Production calculates bill of materials and raises an indent on Purchase',
      'Purchase requests fund sanction; Finance releases advance to steel & tyre vendors',
      'HR deploys assembly shift workers & Admin arranges shift canteen/transport',
      'Production completes assembly; Stores dispatches cars and Finance invoices dealer',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Sales triggers Production → Production indents Purchase → Finance releases supplier payments → HR & Admin mobilize workers and support → Assembly completes & Finance invoices.',
    hints: [
      'Start with the customer/dealer initiating the order with Sales.',
      'Production must indent materials before Finance pays suppliers.',
      'Dispatch and final invoicing close the cycle after assembly.',
    ],
  },
  {
    id: 'ch_a16',
    nodeId: NODE_C9_COMMAPP_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does parallel departmental interdependence during a crisis (e.g. TCS migrating 3.5 Lakh workers to WFH in March 2020) cause greater operational risk than a traditional sequential chain if one unit fails?',
    options: [
      'Because all departments work sequentially, meaning only the final step is ever affected.',
      'Because multiple departments simultaneously commit massive capital, contracts, and workforce hours; a single bottleneck wastes parallel commitments across all six other departments.',
      'Because IT companies are exempted from Indian labour laws during emergencies.',
      'Because cross-linkages eliminate the need for Human Resource management.',
    ],
    correctIndex: 1,
    explanation: 'In parallel interdependence, all departments commit resources simultaneously. If HR fails to release policies or Admin fails to procure laptops, Finance’s ₹1,000 Cr outlay and Legal’s contract preparations are simultaneously jeopardized.',
    hints: [
      'Think about what happens if 6 departments act at once and 1 critical link fails.',
      'Resource commitments are made in parallel, leaving no slack in the system.',
      'One failure wastes the parallel commitments of all other departments simultaneously.',
    ],
  },
  {
    id: 'ch_a17',
    nodeId: NODE_C9_COMMAPP_013,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'During the COVID-19 pandemic, communication volume on enterprise platforms (Teams/Zoom) surged by ~40%. Evaluate the core reason for this increase.',
    options: [
      'Employees were chatting socially because no formal work was being assigned.',
      'Informal, spontaneous corridor interactions ceased, forcing every single business exchange to become a deliberate, scheduled, and structured digital communication.',
      'Companies banned written documents entirely during the remote work period.',
      'Internet service providers offered free subscriptions to all Indian businesses.',
    ],
    correctIndex: 1,
    explanation: 'Physical co-location enables continuous informal verbal/non-verbal coordination. Remote work eliminates casual corridor cues, necessitating deliberate digital channels for every transaction.',
    hints: [
      'What happens to desk-side chats and casual nods when working from home?',
      'Every informal conversation had to be replaced with scheduled video calls or messages.',
      'Deliberate communication had to replace all organic informal office interactions.',
    ],
  },
  {
    id: 'ch_a18',
    nodeId: NODE_C9_COMMAPP_014,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the four essential decision criteria required before choosing between Written vs Spoken communication.',
    availableParts: ['Legal Record Need', 'Urgency & Speed', 'Audience Size & Spread', 'Message Precision & Complexity'],
    targetState: 'Legal Record Need Urgency & Speed Audience Size & Spread Message Precision & Complexity',
    validationHint: 'Add all four core criteria to establish a complete communication decision framework.',
    explanation: 'The choice between written and spoken communication depends on: Legal Record Requirement, Urgency/Speed, Audience Size/Spread, and Message Precision/Complexity.',
    hints: [
      'Include whether proof in court is required.',
      'Include time sensitivity and geographic distribution.',
      'Click all 4 decision components to build the complete framework.',
    ],
  },
  {
    id: 'ch_a19',
    nodeId: NODE_C9_COMMAPP_015,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'According to Albert Mehrabian’s communication model for face-to-face emotional interactions, what percentage of total message impact is conveyed through Body Language (Kinesics)?',
    correctAnswer: 55,
    tolerance: 0,
    unit: '%',
    explanation: 'Mehrabian’s 7-38-55 rule attributes 55% of message impact to body language/facial expressions, 38% to vocal tone, and 7% to literal words.',
    hints: [
      'Remember the famous 7% - 38% - 55% formula.',
      'Words are 7%, Tone is 38%.',
      'Body language constitutes 55% of the impact in face-to-face emotional exchanges.',
    ],
  },
  {
    id: 'ch_a20',
    nodeId: NODE_C9_COMMAPP_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why did Infosys establish the "Campus Connect" programme and NSDC mandate interpersonal skills training for engineering and management recruits?',
    options: [
      'Because Indian engineers lacked basic arithmetic and coding capabilities.',
      'Because technical expertise without active listening, empathy, and clear feedback caused miscommunicated offshore requirements and ₹30,000+ Cr client dispute risks.',
      'To replace all computer hardware with manual typing machines.',
      'To eliminate the HR Department from corporate hierarchies.',
    ],
    correctIndex: 1,
    explanation: 'Technical skills build products, but interpersonal skills (active listening, empathy, clarity) prevent costly requirement errors, client dissatisfaction, and employee attrition in multi-crore projects.',
    hints: [
      'Consider what happens if a software engineer cannot understand a foreign client’s real grievance.',
      'Misunderstandings in client requirements cause massive project rework and losses.',
      'Interpersonal skills are operational necessities that prevent commercial breakdown.',
    ],
  },
  {
    id: 'ch_a21',
    nodeId: NODE_C9_COMMAPP_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are the Admin Manager at Tata Steel. You must announce a company-wide revision in office timings from 9:30 AM to 6:00 PM for all internal department heads. Which header format is mandatory?',
    options: [
      'Dear Sir/Madam, followed by Yours faithfully (Formal Letter)',
      'TO, FROM, DATE, REF, SUBJECT with no salutation or complimentary close (Internal Memo)',
      'A WhatsApp voice broadcast to personal phone numbers',
      'A registered post statutory notice under Section 138',
    ],
    correctIndex: 1,
    explanation: 'An internal memorandum utilizes the formal header: TO, FROM, DATE, REF, SUBJECT, followed by the text body and signature, omitting salutations (Dear Sir) and complimentary closes (Yours faithfully).',
    hints: [
      'Is this communication internal or external? Internal.',
      'Do internal memos use "Dear Sir" and "Yours faithfully"? No.',
      'Internal memos use the standard TO / FROM / DATE / REF / SUBJECT header format.',
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
  nodeId: NODE_C9_COMMAPP_011,
  title: 'Inter-relationships of Functional Areas & Organizational Communication',
  definition: 'Commercial organizations operate as interconnected systems where functional departments (Production, Purchase, Sales, Finance, HR, Admin, Legal) depend mutually on two-way information and material flows. Effective coordination requires appropriate verbal, non-verbal, and technical communication channels.',
  eli5: 'Think of a company like a premier cricket team or a busy family kitchen. If the person buying groceries is delayed, the cook cannot cook, the dining table stays empty, and everyone is affected. Clear messages, active listening, and the right tools keep everyone winning together.',
  misconceptions: [
    { misconception: 'Departments operate in isolated silos where one department’s delay never impacts others.', correction: 'Every department’s output is another department’s input; a delay in Purchase stops Production, starves Sales, drains Finance, and creates Legal liabilities.' },
    { misconception: 'Cross-linkages and linear inter-relationships are identical.', correction: 'Linear links follow adjacent chains (Purchase → Production → Sales), whereas cross-linkages connect non-adjacent departments directly (e.g. Legal ↔ Production) during crises or regulatory mandates.' },
    { misconception: 'A telephone call is non-verbal communication because nothing is written down.', correction: 'Verbal communication means using words. Spoken words over a phone call are spoken verbal communication.' },
    { misconception: 'Non-verbal cues like body language and tone contribute very little to workplace understanding.', correction: 'Mehrabian’s communication model demonstrates that up to 55% of emotional impact in face-to-face interaction stems from body language, and 38% from tone.' },
    { misconception: 'Hearing and active listening are identical physiological processes.', correction: 'Hearing is passive reception of sound; active listening is deliberate mental interpretation, non-verbal observation, and paraphrasing.' },
    { misconception: 'Oral agreements are always completely illegal and void under Indian law.', correction: 'Oral agreements can be legally binding under Contract Act Sec 10, but written records are preferred for evidentiary certainty under Evidence Act Sec 65B.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the internal requisition document from Production to Purchase called?', options: ['Tax Invoice', 'Indent', 'Bill of Lading', 'Memo'], correctIndex: 1 },
    { question: 'Which department manages canteen and transport for night shifts?', options: ['Finance', 'General Administration', 'Marketing', 'Legal'], correctIndex: 1 },
    { question: 'What percentage of impact does Mehrabian attribute to body language in emotional face-to-face exchanges?', options: ['7%', '38%', '55%', '90%'], correctIndex: 2 },
    { question: 'Which communication tool is internal-only with a TO/FROM/REF header?', options: ['Letter', 'E-mail', 'Memo', 'Statutory Notice'], correctIndex: 2 },
    { question: 'Under which Act are electronic records admissible as evidence in Indian courts?', options: ['Indian Evidence Act Section 65B', 'Factories Act 1948', 'GST Act 2017', 'Motor Vehicles Act'], correctIndex: 0 },
    { question: 'What is the first step in the 5-step interpersonal customer handling cycle?', options: ['Respond with clarity', 'Active listening', 'Give feedback', 'Enforce penalty'], correctIndex: 1 },
    { question: 'Which gesture is culturally understood in South India as "I understand / I am listening"?', options: ['Head bobble (gentle side tilt)', 'Fist pump', 'Looking away', 'Finger snap'], correctIndex: 0 },
    { question: 'Which statutory notice must be sent via Registered Post with AD under Section 138 NI Act?', options: ['Dishonoured cheque demand notice', 'Birthday greeting', 'Routine daily email', 'Canteen menu'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student understands 7-department interdependence, crisis cross-linkages, verbal/non-verbal dynamics, interpersonal skills, and tool selection with legal admissibility under Indian statutes.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The 7-Department Ripple Effect',
    instruction: 'Drag the Supplier Steel Delay slider and watch how the crisis cascades from Purchase to Production, Sales, Finance, HR, Admin, and Legal.',
    interactionType: 'slider-ripple',
    nodeId: NODE_C9_COMMAPP_011,
  },
  {
    title: '2. Crisis Cross-Linkages (Nestlé Maggi 2015)',
    instruction: 'Click each cross-linkage button to inspect how non-adjacent departments connect directly during a regulatory crisis.',
    interactionType: 'click-crosslink',
    nodeId: NODE_C9_COMMAPP_012,
  },
  {
    title: '3. Organizational Scale & Communication Hub',
    instruction: 'Scale company size from a 2-person Kirana store to a 6-Lakh TCS enterprise to see why formal digital infrastructure is mandatory.',
    interactionType: 'scale-org',
    nodeId: NODE_C9_COMMAPP_013,
  },
  {
    title: '4. Verbal vs Non-Verbal Alignment Lab',
    instruction: 'Tweak Voice Tone and Body Posture sliders to observe Mehrabian message impact and receiver trust rating.',
    interactionType: 'mehrabian-lab',
    nodeId: NODE_C9_COMMAPP_015,
  },
  {
    title: '5. Communication Tools Decision Matrix',
    instruction: 'Select communication tools for different high-stakes scenarios and observe legal admissibility and delivery efficiency.',
    interactionType: 'tool-matrix',
    nodeId: NODE_C9_COMMAPP_017,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Prediction: If JSW Steel delays steel by 10 days, what will happen to Finance and HR costs at the Manesar plant?',
    options: [
      'Costs decrease because machines are switched off.',
      'Costs rise sharply due to idle-time wages (₹50+ Lakhs) with zero car production and lost dealer revenue.',
      'Finance earns higher interest from delayed payments.',
      'HR automatically freezes all salary disbursements.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now move the Supplier Delay slider to 10 days and verify the idle wage penalty in the real-time financial monitor.',
    nodeId: NODE_C9_COMMAPP_011,
  },
  {
    question: 'Prediction: If a manager speaks positive words ("Great job") with crossed arms, a frown, and no eye contact, what will the employee believe?',
    options: [
      'The employee will believe the spoken words (100% praise).',
      'The employee will trust the negative non-verbal body language and feel doubted or disrespected.',
      'The employee will assume the manager is singing.',
      'Non-verbal cues have zero impact in corporate offices.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Body Posture slider to 20% (Defensive) and observe the Employee Trust Gauge collapse.',
    nodeId: NODE_C9_COMMAPP_015,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Executive Crisis Management Audit',
  description: 'Select an Indian enterprise (e.g. Tata Motors, Reliance Retail, Asian Paints, or SBI). Map out a supply or service disruption, identify the 7 departments involved, draw two emergency cross-linkages, and draft the exact internal Memo and external Registered Letter required.',
  steps: [
    'Choose an Indian firm and define a specific disruption trigger (e.g. chip shortage, regulatory recall, software outage).',
    'Map the 7-department sequential ripple and calculate estimated revenue & idle wage impact.',
    'Identify two non-adjacent cross-linkages (e.g. Legal ↔ Production, Finance ↔ Marketing).',
    'Draft a formal Internal Memo (TO/FROM/DATE/REF/SUBJECT) announcing shift adjustments.',
    'Draft a formal Business Letter to the vendor invoking Section 65B Evidence Act dispute clauses.',
  ],
};

// ─── MAIN COMPONENT ───
function C9_CommerceAppInterrelationshipsDependenceFunctionalSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C9_COMMAPP_011,
  title = DEFAULT_PROPS.title || 'Inter-relationships of Functional Areas',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['commapp'] || { name: 'Commercial Applications', emoji: '🏢', color: 'indigo' };

  // Phase state: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org interactive exploration states
  const [delayDays, setDelayDays] = useState(0); // 0 to 15 days
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [activeCrossLink, setActiveCrossLink] = useState<string | null>('legal_prod');
  const [orgScale, setOrgScale] = useState(2500); // 2 to 600,000 employees
  const [voiceTone, setVoiceTone] = useState(70); // 0 to 100
  const [bodyPosture, setBodyPosture] = useState(70); // 0 to 100
  const [selectedToolScenario, setSelectedToolScenario] = useState<number>(0);

  // Observation questions state
  const [obsSelected, setObsSelected] = useState<Record<string, number>>({});
  const [obsAnswered, setObsAnswered] = useState<Record<string, boolean>>({});

  // Predict-then-check states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);

  // Adaptive difficulty & BKT
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
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag & interactive challenge state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ── FILTERED CHALLENGES ──
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ── MOUNT EFFECT: LOAD MASTERY ──
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ── BKT ADAPTIVE EFFECT ──
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

  // ── 2D CANVAS TELEMETRY ANIMATION ──
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

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = 20 + Math.sin(x * 0.05 + frame * 0.08) * 8 + Math.cos(x * 0.02 - frame * 0.04) * 4;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const pulseSize = 4 + Math.sin(frame * 0.1) * 2;
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(canvas.width - 25, 20, pulseSize, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(`SYS_FLOW: ${(delayDays * 12.5).toFixed(1)}% LATENCY`, 10, 18);
      ctx.fillText(`NODES ACTIVE: 7/7`, 10, 32);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [delayDays]);

  // ── ESCALATING HINTS HANDLER ──
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
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  // ── RESET INACTIVITY TIMER ──
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ── COMPLETION HANDLER ──
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered functional interdependence and commercial communication.');
  }, [errors, onComplete]);

  // ── DISCOVERY HANDLER ──
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on! The ripple effect hits everyone.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ── ADVANCE PHASE HANDLERS ──
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Explore how departments interconnect.');
  }, []);

  const handleSliderChange = useCallback((val: number) => {
    setDelayDays(val);
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Try anything freely in the sandbox mode before taking on graded challenges.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Ready for structured challenges! Apply your knowledge.');
  }, []);

  // ── PREDICTION HANDLERS ──
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Move the slider to test your hypothesis.');
  }, []);

  // ── OBSERVATION QUESTION HANDLER ──
  const handleObservationAnswer = useCallback((obsId: string, optIdx: number, correctIdx: number) => {
    setObsSelected(prev => ({ ...prev, [obsId]: optIdx }));
    setObsAnswered(prev => ({ ...prev, [obsId]: true }));
    const isCorrect = optIdx === correctIdx;
    audioManager.play(isCorrect ? 'success' : 'pop');
    if (isCorrect) {
      setShowSparkle(true);
      setSparklePos({ x: 300, y: 200 });
    }
  }, []);

  // ── SLIDER & INTERACTION HANDLERS ──
  const handleDelayChange = useCallback((val: number) => {
    setDelayDays(val);
    audioManager.play('count');
    if (predictionMade && !predictionVerified && val >= 10) {
      setPredictionVerified(true);
      setShowSparkle(true);
      setSparklePos({ x: 250, y: 150 });
      audioManager.play('sparkle');
    }
  }, [predictionMade, predictionVerified]);

  const handleDepartmentClick = useCallback((dept: string) => {
    setSelectedDepartment(dept);
    audioManager.play('tap');
  }, []);

  const handleCrossLinkClick = useCallback((linkId: string) => {
    setActiveCrossLink(prev => prev === linkId ? null : linkId);
    audioManager.play('tap');
  }, []);

  const handleOrgScaleChange = useCallback((val: number) => {
    setOrgScale(val);
    audioManager.play('count');
  }, []);

  const handleVoiceToneChange = useCallback((val: number) => {
    setVoiceTone(val);
    audioManager.play('balance');
  }, []);

  const handleBodyPostureChange = useCallback((val: number) => {
    setBodyPosture(val);
    audioManager.play('balance');
  }, []);

  // ── DRAG & DROP HANDLERS ──
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
    const isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('success');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      showNextHint();
    }
  }, [sortArrangement, challenge, showNextHint]);

  // ── ANSWER HANDLER ──
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
      speechManager.speak('Correct! Outstanding business acumen.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
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
        speechManager.speak('Let us review the step-by-step resolution together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // ── NEXT CHALLENGE HANDLER ──
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

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ── CALCULATIONS FOR EXPLORATION / SANDBOX ──
  const carsLost = useMemo(() => delayDays * 50, [delayDays]);
  const revenueLossCrores = useMemo(() => ((carsLost * 1000000) / 10000000).toFixed(1), [carsLost]);
  const idleWagesLakhs = useMemo(() => (delayDays * 800 * 850) / 100000, [delayDays]);
  const dealerBacklogPct = useMemo(() => Math.min(100, delayDays * 4.5), [delayDays]);

  const trustScore = useMemo(() => {
    const combined = voiceTone * 0.38 + bodyPosture * 0.55 + 7;
    return Math.round(combined);
  }, [voiceTone, bodyPosture]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ── HEADER BAR ── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-white tracking-tight">{title}</h1>
            <p className="text-xs text-indigo-300 font-medium">ICSE Class 9 • Commerce Applications • Section II</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-600/40'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-600/40'
                : 'bg-indigo-950/60 text-indigo-400 border-indigo-600/40'
            }`}
          >
            Tier: {difficulty}
          </motion.div>
          <div className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-slate-300 border border-slate-700">
            Mastery: <span className="text-amber-400 font-bold">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ── PHASE 1: DISCOVERY HOOK ── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-6 space-y-6">
          <div className="p-5 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/60">
            <span className="px-2.5 py-0.5 bg-indigo-600 text-white rounded-md text-[10px] font-bold uppercase tracking-wider">Scenario Case</span>
            <h2 className="text-xl font-black text-indigo-200 mt-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic bg-slate-900/80 p-3 rounded-lg border border-slate-800">{SCENARIO.context}</p>
          </div>

          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">Curiosity Diagnostic Challenge</h3>
            <p className="text-white text-base font-semibold mb-4 leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/80 border-2 border-emerald-500 text-emerald-100 shadow-lg shadow-emerald-950/50'
                        : 'bg-slate-900/50 text-slate-400 border border-slate-800'
                      : 'bg-slate-900 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-indigo-950/60 border border-indigo-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-300 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! One department delay triggers a multi-crore ripple effect.' : `ℹ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Advance to interactive exploration labs"
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-xl font-bold shadow-lg shadow-indigo-900/40 whitespace-nowrap text-sm"
                >
                  Launch Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ── PHASE 2: BRILLIANT.ORG INTERACTIVE EXPLORATION ── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-4 space-y-4">
          {/* Exploration Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  currentSlide === idx
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
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
              className="p-5 bg-slate-800/90 rounded-2xl border border-slate-700/80 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-black text-indigo-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-xs text-amber-300 mt-0.5">🔍 {EXPLORATION_STEPS[currentSlide].instruction}</p>
                </div>
                <span className="text-xs font-mono text-slate-400">Node: {EXPLORATION_STEPS[currentSlide].nodeId}</span>
              </div>

              {/* ── LAB 1: 7-DEPARTMENT RIPPLE EFFECT ── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {/* Predict-then-Check Hook */}
                  {!predictionMade && (
                    <div className="p-3.5 bg-indigo-950/60 rounded-xl border border-indigo-700/60">
                      <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Make a Prediction First</p>
                      <p className="text-sm font-semibold text-white mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="text-left p-2.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interactive Slider connected to Real-time State & Visualization */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-slate-300">JSW Steel Consignment Delay:</span>
                      <span className="text-amber-400 font-mono text-sm">{delayDays} Days Late</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={15}
                      value={delayDays}
                      onChange={(e) => handleDelayChange(Number(e.target.value))}
                      aria-label="Adjust JSW steel delivery delay in days"
                      className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />

                    {/* Real-time Telemetry Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Assembly Halt</span>
                        <p className="text-sm font-black text-rose-400">{carsLost} Swift Cars</p>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Finance Revenue Loss</span>
                        <p className="text-sm font-black text-rose-400">₹{revenueLossCrores} Crores</p>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">HR Idle Wages Paid</span>
                        <p className="text-sm font-black text-amber-400">₹{idleWagesLakhs.toFixed(1)} Lakhs</p>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Dealer Order Backlog</span>
                        <p className="text-sm font-black text-purple-400">{dealerBacklogPct.toFixed(0)}%</p>
                      </div>
                    </div>
                  </div>

                  {/* SVG 1: 7-Department Ripple Flow Map */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 240" className="w-full h-auto">
                      <defs>
                        <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                      {/* Inter-departmental Connection Lines */}
                      <line x1="80" y1="60" x2="200" y2="60" stroke={delayDays > 0 ? '#ef4444' : '#6366f1'} strokeWidth={delayDays > 0 ? 4 : 3} strokeDasharray={delayDays > 0 ? "5,5" : "none"} />
                      <line x1="200" y1="60" x2="320" y2="60" stroke={delayDays > 2 ? '#ef4444' : '#6366f1'} strokeWidth={delayDays > 2 ? 4 : 3} strokeDasharray={delayDays > 2 ? "5,5" : "none"} />
                      <line x1="320" y1="60" x2="440" y2="60" stroke={delayDays > 4 ? '#ef4444' : '#6366f1'} strokeWidth={delayDays > 4 ? 4 : 3} strokeDasharray={delayDays > 4 ? "5,5" : "none"} />
                      <line x1="200" y1="60" x2="200" y2="160" stroke={delayDays > 0 ? '#f59e0b' : '#3b82f6'} strokeWidth="2" />
                      <line x1="320" y1="60" x2="320" y2="160" stroke={delayDays > 0 ? '#f59e0b' : '#3b82f6'} strokeWidth="2" />
                      <line x1="440" y1="60" x2="520" y2="160" stroke={delayDays > 5 ? '#ec4899' : '#10b981'} strokeWidth="2" />

                      {/* Ripple Alert Pulses */}
                      {delayDays > 0 && (
                        <circle cx="200" cy="60" r={28 + (delayDays % 5) * 2} fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.6" />
                      )}
                      {delayDays > 3 && (
                        <circle cx="320" cy="60" r={28 + (delayDays % 5) * 2} fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />
                      )}
                      {delayDays > 5 && (
                        <circle cx="440" cy="60" r={28 + (delayDays % 5) * 2} fill="none" stroke="#dc2626" strokeWidth="2" opacity="0.6" />
                      )}

                      {/* Department Nodes */}
                      {[
                        { id: 'purchase', name: 'Purchase', x: 80, y: 60, col: '#4f46e5', icon: '📦' },
                        { id: 'production', name: 'Production', x: 200, y: 60, col: delayDays > 0 ? '#ef4444' : '#059669', icon: '⚙️' },
                        { id: 'sales', name: 'Sales/Dealers', x: 320, y: 60, col: delayDays > 3 ? '#f59e0b' : '#0284c7', icon: '🚗' },
                        { id: 'finance', name: 'Finance', x: 440, y: 60, col: delayDays > 5 ? '#dc2626' : '#16a34a', icon: '💰' },
                        { id: 'hr', name: 'HR (Workers)', x: 200, y: 160, col: '#7c3aed', icon: '👥' },
                        { id: 'admin', name: 'Admin (Buses/Meals)', x: 320, y: 160, col: '#d97706', icon: '🍱' },
                        { id: 'legal', name: 'Legal (Penalty)', x: 520, y: 160, col: '#be185d', icon: '⚖️' },
                      ].map((dept) => (
                        <g key={dept.id} onClick={() => handleDepartmentClick(dept.id)} className="cursor-pointer transition-transform hover:scale-105">
                          <circle cx={dept.x} cy={dept.y} r="26" fill={dept.col} stroke="#ffffff" strokeWidth="1.5" opacity={selectedDepartment === dept.id ? 1 : 0.85} />
                          <text x={dept.x} y={dept.y + 4} textAnchor="middle" fill="#ffffff" fontSize="16">{dept.icon}</text>
                          <text x={dept.x} y={dept.y + 36} textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="bold">{dept.name}</text>
                        </g>
                      ))}
                    </svg>

                    {selectedDepartment && (
                      <div className="mt-2 p-2.5 bg-slate-900 rounded-lg text-xs text-indigo-300 border border-slate-700">
                        <span className="font-bold text-white uppercase">{selectedDepartment}: </span>
                        {selectedDepartment === 'purchase' && 'Receives indent from Production; issues POs to JSW Steel & Bosch.'}
                        {selectedDepartment === 'production' && 'Halted by steel shortages; 800 workers sit idle on shift rosters.'}
                        {selectedDepartment === 'sales' && 'Faces 40% backlog; Pune and Delhi dealers unable to deliver Swift bookings.'}
                        {selectedDepartment === 'finance' && 'Loses ₹50 Cr sales revenue; must still disburse idle wages and fixed overheads.'}
                        {selectedDepartment === 'hr' && 'Counsels demotivated idle workers; arranges skills re-training during stoppage.'}
                        {selectedDepartment === 'admin' && 'Maintains shifts, canteens, and security despite assembly line shutdowns.'}
                        {selectedDepartment === 'legal' && 'Reviews JSW contract liquidated damages clause and force majeure clauses.'}
                      </div>
                    )}
                  </div>

                  {/* Brilliant.org Observation Question 1 */}
                  <div className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-700/60 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Brilliant Observation Check #1</span>
                    <p className="text-sm font-semibold text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="space-y-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, oIdx) => (
                        <motion.button
                          key={oIdx}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservationAnswer(OBSERVATION_QUESTIONS[0].id, oIdx, OBSERVATION_QUESTIONS[0].correctIndex)}
                          aria-label={`Option ${oIdx + 1}: ${opt}`}
                          className={`w-full text-left p-2.5 rounded-lg text-xs font-medium transition-all ${
                            obsAnswered[OBSERVATION_QUESTIONS[0].id]
                              ? oIdx === OBSERVATION_QUESTIONS[0].correctIndex
                                ? 'bg-emerald-900/80 border-2 border-emerald-500 text-emerald-100 font-bold'
                                : obsSelected[OBSERVATION_QUESTIONS[0].id] === oIdx
                                ? 'bg-rose-950/80 border border-rose-500 text-rose-200'
                                : 'bg-slate-900/50 text-slate-400 border border-slate-800'
                              : 'bg-slate-900 hover:bg-slate-700 text-slate-200 border border-slate-700'
                          }`}
                        >
                          <span className="font-bold text-indigo-400 mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                    {obsAnswered[OBSERVATION_QUESTIONS[0].id] && (
                      <p className="text-xs text-amber-300 mt-2 bg-slate-900/80 p-2 rounded border border-slate-700">
                        💡 {OBSERVATION_QUESTIONS[0].explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ── LAB 2: CRISIS CROSS-LINKAGES (NESTLÉ MAGGI 2015) ── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/50 text-xs leading-relaxed text-slate-300">
                    <span className="font-bold text-amber-400">Case Trigger: </span>
                    FSSAI ordered a nationwide recall of Maggi noodles (June 2015). Notice how non-adjacent departments connect directly without going through the linear chain.
                  </div>

                  {/* SVG 2: Cross-Linkages Dynamic Crisis Network SVG */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 220" className="w-full h-auto">
                      {/* Background standard sequential chain */}
                      <path d="M 80 160 L 220 160 L 380 160 L 520 160" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" fill="none" />
                      <text x="300" y="180" textAnchor="middle" fill="#64748b" fontSize="10">Standard Sequential Flow (Purchase → Production → Sales → Finance)</text>

                      {/* Active Dynamic Cross-Linkage Pathways */}
                      {activeCrossLink === 'legal_prod' && (
                        <g>
                          <path d="M 120 70 Q 220 20 300 70" stroke="#f59e0b" strokeWidth="4" fill="none" strokeDasharray="6,4" />
                          <circle cx="210" cy="42" r="4" fill="#fbbf24" />
                          <text x="210" y="32" textAnchor="middle" fill="#fcd34d" fontSize="10" fontWeight="bold">Direct Emergency Writ & Plant Halt Flow</text>
                        </g>
                      )}
                      {activeCrossLink === 'fin_mktg' && (
                        <g>
                          <path d="M 300 70 Q 400 20 480 70" stroke="#ec4899" strokeWidth="4" fill="none" strokeDasharray="6,4" />
                          <circle cx="390" cy="42" r="4" fill="#f472b6" />
                          <text x="390" y="32" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">₹320 Cr Recall & Campaign Pulldown Flow</text>
                        </g>
                      )}
                      {activeCrossLink === 'hr_sales' && (
                        <g>
                          <path d="M 120 70 Q 300 120 480 70" stroke="#10b981" strokeWidth="4" fill="none" strokeDasharray="6,4" />
                          <circle cx="300" cy="100" r="4" fill="#34d399" />
                          <text x="300" y="118" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">1,500 Field Staff Redeployment Flow</text>
                        </g>
                      )}

                      {/* Crisis Nodes */}
                      <g onClick={() => setActiveCrossLink('legal_prod')} className="cursor-pointer">
                        <circle cx="120" cy="70" r="28" fill={activeCrossLink === 'legal_prod' ? '#d97706' : '#1e293b'} stroke="#f59e0b" strokeWidth="2" />
                        <text x="120" y="74" textAnchor="middle" fill="#fff" fontSize="14">⚖️</text>
                        <text x="120" y="110" textAnchor="middle" fill="#fcd34d" fontSize="10" fontWeight="bold">Legal Dept</text>
                      </g>

                      <g onClick={() => setActiveCrossLink('legal_prod')} className="cursor-pointer">
                        <circle cx="300" cy="70" r="28" fill={activeCrossLink === 'legal_prod' ? '#059669' : '#1e293b'} stroke="#10b981" strokeWidth="2" />
                        <text x="300" y="74" textAnchor="middle" fill="#fff" fontSize="14">🏭</text>
                        <text x="300" y="110" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">Production (Goa)</text>
                      </g>

                      <g onClick={() => setActiveCrossLink('fin_mktg')} className="cursor-pointer">
                        <circle cx="480" cy="70" r="28" fill={activeCrossLink === 'fin_mktg' ? '#be185d' : '#1e293b'} stroke="#ec4899" strokeWidth="2" />
                        <text x="480" y="74" textAnchor="middle" fill="#fff" fontSize="14">📢</text>
                        <text x="480" y="110" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Marketing / Sales</text>
                      </g>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'legal_prod', title: 'Legal ↔ Production', desc: 'Legal directly advises Production to halt Goa plant (300M packets/mo); Production reports lead lab test data back for Bombay High Court writ.', icon: '⚖️ ↔ ⚙️' },
                      { id: 'fin_mktg', title: 'Finance ↔ Marketing', desc: 'Finance calculates ₹320 Cr recall and compensation cost; Marketing confirms immediate withdrawal of "2-minute" TV and print campaigns.', icon: '💰 ↔ 📢' },
                      { id: 'hr_sales', title: 'HR ↔ Sales/Field Staff', desc: 'HR retrains 1,500 Maggi field representatives to cross-sell KitKat and Nescafé, preserving workforce productivity during crisis.', icon: '👥 ↔ 🤝' },
                    ].map((cl) => (
                      <motion.div
                        key={cl.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCrossLinkClick(cl.id)}
                        className={`p-3.5 rounded-xl cursor-pointer border transition-all ${
                          activeCrossLink === cl.id
                            ? 'bg-indigo-950/80 border-indigo-500 shadow-lg shadow-indigo-950'
                            : 'bg-slate-900/80 border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        <span className="text-xl">{cl.icon}</span>
                        <h4 className="text-xs font-bold text-white mt-1">{cl.title}</h4>
                        <p className="text-[11px] text-slate-300 mt-1 leading-snug">{cl.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── LAB 3: SCALE & RELEVANCE OF COMMUNICATION ── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-slate-300">Scale Enterprise Workforce:</span>
                      <span className="text-indigo-400 font-mono text-sm">{orgScale.toLocaleString()} Employees</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={600000}
                      step={500}
                      value={orgScale}
                      onChange={(e) => handleOrgScaleChange(Number(e.target.value))}
                      aria-label="Scale organizational workforce"
                      className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />

                    {/* Scale Comparison Card */}
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row gap-4 items-center">
                      <div className="text-4xl">{orgScale < 10 ? '🏪' : orgScale < 5000 ? '🏭' : '🌐'}</div>
                      <div className="text-xs space-y-1">
                        <p className="font-bold text-white text-sm">
                          {orgScale < 10
                            ? 'Sharma Kirana Store (2 Persons)'
                            : orgScale < 5000
                            ? 'Tata Motors Sanand Plant (2,500 Workers)'
                            : 'TCS Global Operations (6.08 Lakh Employees across 150 Locations)'}
                        </p>
                        <p className="text-slate-300">
                          {orgScale < 10
                            ? 'Single-room face-to-face spoken words suffice. Zero paper trail required.'
                            : orgScale < 5000
                            ? 'Shift briefings at 6 AM, digital workstation targets, team leaders, and SOP logs required.'
                            : 'Enterprise Intranet ("Ultimatix"), ERP dashboards, formal memos, and encrypted video-conferences required.'}
                        </p>
                        <p className="text-amber-400 font-medium">
                          Communication Failure Impact: {orgScale < 10 ? 'A misplaced ₹520 salt bag.' : orgScale < 5000 ? '₹85,000/min assembly stoppage.' : 'Crores of rupees in global client litigation.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: VERBAL & NON-VERBAL ALIGNMENT (MEHRABIAN) ── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/50 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-amber-400">Mehrabian Rule (7-38-55): </span>
                    In emotional face-to-face interactions, Body Language contributes 55%, Tone 38%, and literal Words just 7%.
                  </div>

                  {/* SVG 3: Mehrabian Communication Impact & Alignment SVG Gauge */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 160" className="w-full h-auto">
                      {/* Mehrabian 3-Component Stacked Meter */}
                      <rect x="50" y="30" width="30" height="100" fill="#3b82f6" rx="4" />
                      <rect x="90" y="30" width="140" height="100" fill="#8b5cf6" rx="4" />
                      <rect x="240" y="30" width="210" height="100" fill="#ec4899" rx="4" />

                      <text x="65" y="85" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">7%</text>
                      <text x="65" y="105" textAnchor="middle" fill="#bfdbfe" fontSize="8">Words</text>

                      <text x="160" y="85" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">38% (Tone)</text>
                      <text x="160" y="105" textAnchor="middle" fill="#ddd6fe" fontSize="8">Current: {voiceTone}%</text>

                      <text x="345" y="85" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">55% (Body Language / Kinesics)</text>
                      <text x="345" y="105" textAnchor="middle" fill="#fbcfe8" fontSize="8">Current: {bodyPosture}%</text>

                      <text x="250" y="18" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
                        TOTAL CONGRUENT MESSAGE IMPACT: {trustScore}%
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-300">Vocal Tone (Warmth & Pitch):</span>
                        <span className="text-indigo-400 font-mono">{voiceTone}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={voiceTone}
                        onChange={(e) => handleVoiceToneChange(Number(e.target.value))}
                        aria-label="Adjust voice tone"
                        className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />

                      <div className="flex justify-between text-xs font-semibold pt-2">
                        <span className="text-slate-300">Body Posture & Eye Contact:</span>
                        <span className="text-indigo-400 font-mono">{bodyPosture}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={bodyPosture}
                        onChange={(e) => handleBodyPostureChange(Number(e.target.value))}
                        aria-label="Adjust body posture and eye contact"
                        className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-center items-center text-center space-y-2">
                      <span className="text-3xl">{trustScore > 75 ? '🤝' : trustScore > 45 ? '😐' : '🙅‍♂️'}</span>
                      <span className="text-xs font-bold text-slate-400 uppercase">Perceived Receiver Trust</span>
                      <p className={`text-2xl font-black ${trustScore > 75 ? 'text-emerald-400' : trustScore > 45 ? 'text-amber-400' : 'text-rose-400'}`}>
                        {trustScore}% Trust Rating
                      </p>
                      <p className="text-[11px] text-slate-400 italic">
                        Spoken Word: &quot;Your performance is excellent&quot;
                        <br />
                        {trustScore < 50 ? '⚠️ Body language contradicts words! Receiver feels doubted.' : '✓ Non-verbal and verbal channels are congruent!'}
                      </p>
                    </div>
                  </div>

                  {/* Brilliant.org Observation Question 2 */}
                  <div className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-700/60 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Brilliant Observation Check #2</span>
                    <p className="text-sm font-semibold text-white">{OBSERVATION_QUESTIONS[1].question}</p>
                    <div className="space-y-2">
                      {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, oIdx) => (
                        <motion.button
                          key={oIdx}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservationAnswer(OBSERVATION_QUESTIONS[1].id, oIdx, OBSERVATION_QUESTIONS[1].correctIndex)}
                          aria-label={`Option ${oIdx + 1}: ${opt}`}
                          className={`w-full text-left p-2.5 rounded-lg text-xs font-medium transition-all ${
                            obsAnswered[OBSERVATION_QUESTIONS[1].id]
                              ? oIdx === OBSERVATION_QUESTIONS[1].correctIndex
                                ? 'bg-emerald-900/80 border-2 border-emerald-500 text-emerald-100 font-bold'
                                : obsSelected[OBSERVATION_QUESTIONS[1].id] === oIdx
                                ? 'bg-rose-950/80 border border-rose-500 text-rose-200'
                                : 'bg-slate-900/50 text-slate-400 border border-slate-800'
                              : 'bg-slate-900 hover:bg-slate-700 text-slate-200 border border-slate-700'
                          }`}
                        >
                          <span className="font-bold text-indigo-400 mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                    {obsAnswered[OBSERVATION_QUESTIONS[1].id] && (
                      <p className="text-xs text-amber-300 mt-2 bg-slate-900/80 p-2 rounded border border-slate-700">
                        💡 {OBSERVATION_QUESTIONS[1].explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ── LAB 5: TOOLS DECISION MATRIX ── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {['SBI Loan Sanction', 'Cheque Dishonour Notice', 'Factory Emergency', 'Internal Office Timing'].map((sc, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedToolScenario(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          selectedToolScenario === idx
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-900 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {sc}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                    {selectedToolScenario === 0 && (
                      <>
                        <h4 className="font-bold text-white text-sm">SBI ₹20 Lakh Home Loan Sanction</h4>
                        <p className="text-slate-300">Best Tool: <span className="text-emerald-400 font-bold">Formal Letter on Bank Letterhead</span></p>
                        <p className="text-slate-400">Legal Ground: Admissible under Indian Evidence Act Section 65B. Paper signed contracts provide the foundational legal proof if borrower defaults.</p>
                      </>
                    )}
                    {selectedToolScenario === 1 && (
                      <>
                        <h4 className="font-bold text-white text-sm">Statutory Demand for Cheque Bounce</h4>
                        <p className="text-slate-300">Best Tool: <span className="text-emerald-400 font-bold">Registered Post with Acknowledgement Due (AD)</span></p>
                        <p className="text-slate-400">Legal Ground: Section 138 Negotiable Instruments Act 1881 requires registered statutory notice. WhatsApp or routine emails risk court dismissal.</p>
                      </>
                    )}
                    {selectedToolScenario === 2 && (
                      <>
                        <h4 className="font-bold text-white text-sm">Immediate Boiler Pressure Spike (Safety Hazard)</h4>
                        <p className="text-slate-300">Best Tool: <span className="text-emerald-400 font-bold">Phone Call / Walkie-Talkie / Visual Alarm</span></p>
                        <p className="text-slate-400">Ground: Real-time immediate speed overrides written records when seconds determine human life safety.</p>
                      </>
                    )}
                    {selectedToolScenario === 3 && (
                      <>
                        <h4 className="font-bold text-white text-sm">Revision in Shift Timings to Department Heads</h4>
                        <p className="text-slate-300">Best Tool: <span className="text-emerald-400 font-bold">Internal Office Memorandum (Memo)</span></p>
                        <p className="text-slate-400">Ground: Fixed TO/FROM/DATE/REF header format filed permanently in HR archives without external salutations.</p>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Exploration Prev/Next Controls */}
              <div className="flex justify-between items-center pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  aria-label="Previous laboratory slide"
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold disabled:opacity-40"
                >
                  ← Prev Lab
                </motion.button>
                <span className="text-xs font-mono text-slate-400">{currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    aria-label="Next laboratory slide"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold shadow-md shadow-indigo-950"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    aria-label="Proceed to Free Play Sandbox"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-md shadow-emerald-950"
                  >
                    Enter Free Play Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ── PHASE 3: FREE PLAY SANDBOX ── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-4 space-y-4">
          <div className="p-4 bg-gradient-to-r from-slate-800 to-slate-800/80 rounded-2xl border border-slate-700 flex justify-between items-center">
            <div>
              <h3 className="text-base font-black text-indigo-300">Free Play Operations Sandbox</h3>
              <p className="text-xs text-slate-400 mt-0.5">Test variables without grading pressure. Observe cross-functional outcomes freely.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Ready to start graded challenges"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-950"
            >
              Start Graded Challenges →
            </motion.button>
          </div>

          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-300 font-semibold flex justify-between">
                  <span>Supply Delay Days:</span>
                  <span className="text-indigo-400 font-mono">{delayDays} Days</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={15}
                  value={delayDays}
                  onChange={(e) => handleDelayChange(Number(e.target.value))}
                  aria-label="Sandbox supplier delay slider"
                  className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-300 font-semibold flex justify-between">
                  <span>Workforce Scale:</span>
                  <span className="text-indigo-400 font-mono">{orgScale.toLocaleString()} staff</span>
                </label>
                <input
                  type="range"
                  min={2}
                  max={50000}
                  value={orgScale}
                  onChange={(e) => handleOrgScaleChange(Number(e.target.value))}
                  aria-label="Sandbox workforce scale slider"
                  className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Lost Car Output</span>
                <p className="text-sm font-black text-rose-400">{carsLost} Units</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Revenue Impact</span>
                <p className="text-sm font-black text-rose-400">₹{revenueLossCrores} Cr</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Idle Wages Disbursed</span>
                <p className="text-sm font-black text-amber-400">₹{idleWagesLakhs.toFixed(1)} L</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Communication Mode</span>
                <p className="text-xs font-bold text-indigo-300">{orgScale < 10 ? 'Oral Verbal' : 'Enterprise ERP'}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── PHASE 4: CHALLENGES (ADAPTIVE & COMPETENCY-BASED) ── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-4 space-y-4">
          {/* Telemetry Canvas Strip */}
          <canvas ref={canvasRef} width={600} height={40} className="w-full h-10 bg-slate-950 rounded-xl border border-slate-800" />

          {/* Challenge Header */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-indigo-600 text-white rounded-md text-xs font-black">
                Q {currentChallenge + 1} / {filteredChallenges.length}
              </span>
              <span className="px-2 py-0.5 bg-slate-800 text-indigo-300 rounded-md text-[10px] font-bold uppercase tracking-wider border border-slate-700">
                NEP 2020: {challenge.competencyLevel}
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">{challenge.nodeId}</span>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Challenge Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/60 border-2 border-rose-500'
                : 'bg-slate-800/90 border-slate-700/80'
            }`}
          >
            <p className="text-white text-base font-semibold leading-relaxed mb-4">{challenge.question}</p>

            {/* MCQ Types with required framer-motion shake animation on error */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/80 border-2 border-emerald-500 text-emerald-100 shadow-md shadow-emerald-950'
                        : 'bg-slate-900 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80'
                    }`}
                  >
                    <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span> {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag Label Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      className="px-3.5 py-2 bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow-md shadow-indigo-950"
                    >
                      ✥ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {['target_memo', 'target_letter', 'target_email', 'target_vc'].map((tId) => (
                    <div
                      key={tId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(tId)}
                      className={`p-3.5 rounded-xl border-2 border-dashed flex items-center justify-between ${
                        droppedLabels[tId] ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-xs">
                        {tId === 'target_memo' && 'Internal TO/FROM/REF Policy Notice:'}
                        {tId === 'target_letter' && 'Section 138 NI Act Court Evidence Notice:'}
                        {tId === 'target_email' && 'Fast Trackable Client Status Update:'}
                        {tId === 'target_vc' && 'Multi-City Face-to-Face Candidate Interview:'}
                      </span>
                      <span className="font-bold text-xs text-white px-2 py-1 bg-slate-800 rounded">
                        {droppedLabels[tId] || 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Submit dropped labels for verification"
                  className="mt-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-950"
                >
                  Verify Matched Tools
                </motion.button>
              </div>
            )}

            {/* Drag Sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to rearrange into the correct chronological chain:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort item ${displayIndex + 1}: ${item}`}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-xs font-medium text-slate-200 flex items-center gap-3 cursor-grab"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-950 text-indigo-400 flex items-center justify-center font-bold text-[10px] border border-indigo-700">
                        {displayIndex + 1}
                      </span>
                      {item}
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Submit sorted chronological order"
                  className="mt-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-950"
                >
                  Confirm Operational Order
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    aria-label="Enter numeric answer"
                    className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-slate-400 text-xs font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Check numeric calculation"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-950 disabled:opacity-40"
                  >
                    Check Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add part: ${part}`}
                      className="px-3 py-1.5 bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[60px] p-3 bg-slate-950 rounded-xl border border-slate-700 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-2.5 py-1 bg-indigo-950 text-indigo-300 rounded-md text-xs font-bold border border-indigo-700 flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 font-black"
                        aria-label={`Remove part: ${part}`}
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && <span className="text-slate-500 text-xs">Click parts above to assemble your decision model</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Validate assembled framework"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-950"
                >
                  Validate Decision Model
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-amber-950/40 border border-amber-700/60 rounded-xl space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Step-by-Step Institutional Explanation:</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-amber-200 text-xs leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 mr-1">{i + 1}.</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex flex-wrap gap-3 pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Reveal next step of explanation"
                      className="px-4 py-1.5 bg-amber-700/80 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Next Step Breakdown →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Advance to next challenge"
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ── PHASE 5: COMPLETION & REAL-WORLD SYNTHESIS ── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-black text-white">Course Simulation Completed!</h2>
            <p className="text-xs text-slate-300">You have completed all inter-relationship and commercial communication modules.</p>
          </div>

          {/* Explicit Spaced Repetition Visibility */}
          <div className="p-4 bg-indigo-950/70 border-2 border-indigo-500 rounded-2xl text-center space-y-2 shadow-xl shadow-indigo-950/50">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">Spaced Repetition System (SRS) Schedule</span>
            <h3 className="text-xl font-black text-amber-400">
              {errors === 0
                ? 'Next Review Scheduled: In 7 Days'
                : errors <= 3
                ? 'Next Review Scheduled: In 3 Days'
                : 'Next Review Scheduled: In 1 Day (High Priority)'}
            </h3>
            <p className="text-xs text-slate-300 max-w-xl mx-auto">
              Based on the SM-2 spaced repetition algorithm and your score ({Math.max(0, 100 - errors * 5)}% with {errors} {errors === 1 ? 'error' : 'errors'}), optimal memory retention requires reviewing this concept in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 text-center">
              <span className="text-xs text-slate-400 uppercase font-bold">Final Accuracy Score</span>
              <p className="text-2xl font-black text-emerald-400 mt-1">{Math.max(0, 100 - errors * 5)}%</p>
            </div>
            <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 text-center">
              <span className="text-xs text-slate-400 uppercase font-bold">Assessed BKT Mastery</span>
              <p className="text-2xl font-black text-indigo-400 mt-1 uppercase">{masteryLevel}</p>
            </div>
            <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 text-center">
              <span className="text-xs text-slate-400 uppercase font-bold">SRS Review Target</span>
              <p className="text-2xl font-black text-amber-400 mt-1">
                {errors === 0 ? 'Review in 7 Days' : errors <= 3 ? 'Review in 3 Days' : 'Review in 1 Day'}
              </p>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-emerald-950/60 rounded-2xl border border-emerald-700/60">
            <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Performance Audit:</h4>
            <p className="text-xs text-emerald-200 mt-1 leading-relaxed">
              {errors === 0
                ? 'EXEMPLARY SCORE! You understand the 7 functional areas, crisis cross-linkages, and precise legal communication tools perfectly.'
                : errors <= 3
                ? 'GREAT WORK! You grasped the cross-functional ripple effects and verbal/non-verbal distinctions with high competence.'
                : 'COMMENDABLE EFFORT! Review the misconception profile below and re-run the interactive labs to reinforce your mastery.'}
            </p>
          </div>

          {/* Misconception Tracking Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-4 bg-rose-950/50 rounded-2xl border border-rose-800/60 space-y-2">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">Personalized Misconception Debrief:</h4>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, idx) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-semibold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Activity Arc */}
          <div className="p-5 bg-indigo-950/60 rounded-2xl border border-indigo-800/60 space-y-3">
            <h3 className="text-base font-black text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <p key={i} className="text-xs text-slate-400">
                  <span className="font-bold text-indigo-400">{i + 1}.</span> {st}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── FEEDBACK OVERLAYS ── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Operational Objective Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_CommerceAppInterrelationshipsDependenceFunctionalSim;
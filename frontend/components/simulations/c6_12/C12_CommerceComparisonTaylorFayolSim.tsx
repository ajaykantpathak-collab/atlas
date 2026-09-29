'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C12_COMM_011 = 'c12_comm_011';
const NODE_C12_COMM_012 = 'c12_comm_012';
const NODE_C12_COMM_013 = 'c12_comm_013';
const NODE_C12_COMM_014 = 'c12_comm_014';
const NODE_C12_COMM_015 = 'c12_comm_015';
const NODE_C12_COMM_016 = 'c12_comm_016';
const NODE_C12_COMM_017 = 'c12_comm_017';
const NODE_C12_COMM_018 = 'c12_comm_018';
const NODE_C12_COMM_019 = 'c12_comm_019';
const NODE_C12_COMM_020 = 'c12_comm_020';

const ALL_NODE_IDS = [
  NODE_C12_COMM_011,
  NODE_C12_COMM_012,
  NODE_C12_COMM_013,
  NODE_C12_COMM_014,
  NODE_C12_COMM_015,
  NODE_C12_COMM_016,
  NODE_C12_COMM_017,
  NODE_C12_COMM_018,
  NODE_C12_COMM_019,
  NODE_C12_COMM_020,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'The Great Indian Enterprise Transformation',
  intro: 'You have been appointed Chief Management Architect for "Bharat Dynamics & Consumer Solutions Ltd" (BDCS). The company is expanding from heavy engineering into EV manufacturing and FMCG.',
  context: 'From shop-floor time studies at Jamshedpur to boardroom scalar chains, structuring four product divisions, managing 50,000 workers across formal hierarchies and informal grapevines, and building a world-class training academy — you must apply classical and modern management principles to architect victory.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'When Tata Motors set up the Nano plant at Sanand, assembly workers had standardised 60-second cycle times, while the plant director reported strictly via a scalar chain. Which management framework is this?',
  options: [
    'Only Taylor — scientific management governs all modern automobile factories',
    'Only Fayol — administrative principles override shop-floor techniques',
    'Both Taylor and Fayol operating simultaneously at different organisational layers',
    'Neither — modern Indian corporations use completely different digital methods',
  ],
  correctIndex: 2,
  hintAfter: 'Notice how shop-floor task efficiency (Taylor) and boardroom administrative coordination (Fayol) are complementary layers rather than competing alternatives!',
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

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe when comparing Taylor\'s Scientific Management with Fayol\'s Administrative Theory?',
    observableOptions: [
      'Taylor focuses on shop-floor efficiency; Fayol focuses on top-level administrative principles (✓)',
      'Both focus exclusively on factory workers (✗)',
      'Taylor and Fayol have identical frameworks (✗)',
      'Fayol focuses on production; Taylor on management (✗)',
    ],
    correctIndex: 0,
  },
  {
    question: 'When you apply Taylor\'s time-motion study to a worker, what observable change occurs in productivity?',
    observableOptions: [
      'Productivity increases by eliminating wasteful motions and standardizing tasks (✓)',
      'Productivity decreases due to worker fatigue (✗)',
      'No observable change in output (✗)',
      'Productivity becomes random and unpredictable (✗)',
    ],
    correctIndex: 0,
  },
];

// ─── 22 PROGRESSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation: Taylor vs Fayol perspective (c12_comm_011)
  {
    id: 'ch_001',
    nodeId: NODE_C12_COMM_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'F.W. Taylor developed his principles from the bottom-up studying the shop floor. What was Henri Fayol\'s perspective?',
    options: [
      'Top-down, studying the managing director and overall organisation',
      'Lateral, studying trade union collective bargaining',
      'External, studying customer psychology in retail markets',
      'Algorithmic, studying gig economy delivery times',
    ],
    correctIndex: 0,
    explanation: 'Taylor approached management from the bottom up (shop floor, time study), while Fayol approached it from the top down (overall administration, scalar chain, unity of direction).',
    hints: [
      'Think about where Fayol spent his senior career (managing director of a mining company).',
      'Fayol focused on the apex of the enterprise and administrative coordination.',
      'Fayol\'s perspective is top-down across the entire enterprise.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation: Planning Definition & Primacy (c12_comm_012)
  {
    id: 'ch_002',
    nodeId: NODE_C12_COMM_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is planning referred to as the "primary function" of management?',
    options: [
      'It is the only function that requires spending capital',
      'All other functions (organising, staffing, directing, controlling) are executed within the framework planning establishes',
      'It is performed exclusively by the Board of Directors without middle management input',
      'It completely eliminates all future uncertainty and business risk',
    ],
    correctIndex: 1,
    explanation: 'Planning has primacy because organising, staffing, directing, and controlling depend on the goals and action courses established in planning.',
    hints: [
      'Consider what happens to organising or staffing if there are no defined objectives.',
      'Primacy means it precedes and provides the blueprint for all subsequent management actions.',
      'All other management functions operate inside the structure planning creates.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation: Drag-label Planning Steps (c12_comm_012)
  {
    id: 'ch_003',
    nodeId: NODE_C12_COMM_012,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Place the 5 sequential stages of the planning process into their correct positions.',
    dragItems: [
      { label: '1. Set Objectives', targetId: 'step_1' },
      { label: '2. Identify Alternatives', targetId: 'step_2' },
      { label: '3. Evaluate Alternatives', targetId: 'step_3' },
      { label: '4. Select Best Alternative', targetId: 'step_4' },
      { label: '5. Follow-up Review', targetId: 'step_5' },
    ],
    correctMapping: {
      step_1: '1. Set Objectives',
      step_2: '2. Identify Alternatives',
      step_3: '3. Evaluate Alternatives',
      step_4: '4. Select Best Alternative',
      step_5: '5. Follow-up Review',
    },
    explanation: 'The logical sequence is: Set Objectives -> Identify Alternatives -> Evaluate Alternatives -> Select Best Alternative -> Follow-up Review. Step 3 must precede Step 4, and Step 5 is vital for implementation feedback.',
    hints: [
      'You cannot evaluate options before you have identified what the options are.',
      'Selecting the best alternative comes AFTER evaluating all identified options against criteria.',
      'The final step is always follow-up (monitoring and corrective adjustments).',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation: Standing vs Single-Use Plans (c12_comm_013)
  {
    id: 'ch_004',
    nodeId: NODE_C12_COMM_013,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following pairs contains ONLY single-use plans (plans designed for a specific period or event)?',
    options: [
      'Policy and Rule',
      'Procedure and Method',
      'Budget and Program',
      'Objectives and Strategy',
    ],
    correctIndex: 2,
    explanation: 'Budgets (e.g. FY24 capex) and Programs (e.g. Chandrayaan-3 mission) expire once their timeframe or specific goal is completed, making them single-use plans. Policies, procedures, methods, and rules are standing plans.',
    hints: [
      'Standing plans are reusable guidelines applied repeatedly to recurring situations.',
      'Single-use plans are designed for one unique period or specific project.',
      'Budgets apply to one fiscal cycle and programs apply to one specific initiative.',
    ],
    misconceptionIndex: 3,
  },
  // 5. Foundation: Policy vs Rule (c12_comm_013)
  {
    id: 'ch_005',
    nodeId: NODE_C12_COMM_013,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Tata Steel\'s statement "No worker enters blast furnace zone without safety helmet" is a RULE, whereas "Prefer local candidates from Jamshedpur" is a POLICY. What is the fundamental difference?',
    options: [
      'Policies are created by government while rules are created by workers',
      'Policies allow managerial discretion within boundaries, while rules are rigid with zero discretion',
      'Rules always involve monetary amounts while policies never involve numbers',
      'Policies apply to factory workers while rules apply only to senior managers',
    ],
    correctIndex: 1,
    explanation: 'A policy is a flexible guide that channels decision-making but permits discretion. A rule is a rigid, non-negotiable directive that admits no exception.',
    hints: [
      'Can a manager make a justified exception to a policy? What about a safety rule?',
      'Policy = flexible boundary; Rule = rigid command without discretion.',
      'Safety commands admit zero exceptions; recruitment preferences allow justified deviations.',
    ],
    misconceptionIndex: 4,
  },
  // 6. Foundation: Organising Flow (c12_comm_014)
  {
    id: 'ch_006',
    nodeId: NODE_C12_COMM_014,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In organisational design, in which direction does ACCOUNTABILITY flow?',
    options: [
      'Downward from superior to subordinate',
      'Upward from subordinate to superior',
      'Horizontally between peer managers only',
      'Diagonally across external suppliers',
    ],
    correctIndex: 1,
    explanation: 'Authority and responsibility flow downward, but accountability (answerability for assigned outcomes) always flows upward from the subordinate to the superior.',
    hints: [
      'Who answers to whom when a monthly target is missed?',
      'The subordinate is answerable upward to the boss who delegated the task.',
      'Accountability is always an upward flow of answerability.',
    ],
    misconceptionIndex: 5,
  },
  // 7. Foundation: Functional vs Divisional Suitability (c12_comm_015)
  {
    id: 'ch_007',
    nodeId: NODE_C12_COMM_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does Asian Paints use a FUNCTIONAL structure while Hindustan Unilever (HUL) uses a DIVISIONAL structure?',
    options: [
      'Asian Paints is a government entity while HUL is a private partnership',
      'Asian Paints focuses predominantly on a single product line (paints), while HUL sells multi-category diverse goods (Home Care, Personal Care, Foods)',
      'Functional structure is only for small firms with under 100 employees',
      'Divisional structures are legally banned for paint manufacturers under Companies Act 2013',
    ],
    correctIndex: 1,
    explanation: 'Functional structures group by skill (R&D, Sales, Finance) and suit single-product companies. Divisional structures group by product line and suit multi-product diversified conglomerates.',
    hints: [
      'Consider the product variety: paints vs detergents, ice creams, shampoos, and tea.',
      'Single-product companies avoid duplication with functional departments.',
      'Diversified multi-product giants require autonomous divisional P&Ls.',
    ],
    misconceptionIndex: 6,
  },
  // 8. Standard: Taylor vs Fayol 5-Parameter Comparison (c12_comm_011)
  {
    id: 'ch_008',
    nodeId: NODE_C12_COMM_011,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match Taylor and Fayol correctly across their analytical parameters:',
    options: [
      'Taylor: Top-down, Broad scope | Fayol: Bottom-up, Shop-floor focus',
      'Taylor: Shop-floor efficiency, Scientific studies | Fayol: Overall administration, Universal principles',
      'Taylor: Human relations focus | Fayol: Piece-rate wage engineering',
      'Taylor: Universal applicability | Fayol: Manufacturing assembly line only',
    ],
    correctIndex: 1,
    explanation: 'Taylor focused on shop-floor production efficiency using time/motion engineering studies. Fayol focused on overall administrative coordination using flexible management principles.',
    hints: [
      'Taylor was a mechanical engineer studying shop-floor tools.',
      'Fayol was a CEO writing 14 universal principles of administration.',
      'Taylor = scientific engineering on shop floor; Fayol = administrative coordination at the top.',
    ],
  },
  // 9. Standard: Procedure vs Method distinction (c12_comm_013)
  {
    id: 'ch_009',
    nodeId: NODE_C12_COMM_013,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Tata Steel\'s 7-step hiring sequence is a PROCEDURE. Using structured behavioural interviewing (STAR) in Step 4 is a METHOD. How do they relate?',
    options: [
      'A method is a multi-step sequence; a procedure is a single task technique',
      'A procedure is an end goal; a method is a monetary calculation',
      'A procedure is a sequential multi-step series of actions; a method is the specific technique used to perform one step within that procedure',
      'They are identical terms and can be used interchangeably in ISC answers',
    ],
    correctIndex: 2,
    explanation: 'A procedure prescribes a chronological sequence of steps to complete a process. A method prescribes the standardized technique for executing a single step within that procedure.',
    hints: [
      'Is 7 steps a sequence or a single technique?',
      'STAR interview technique happens inside Step 4.',
      'Procedure = multi-step sequence; Method = specific single-step technique.',
    ],
    misconceptionIndex: 7,
  },
  // 10. Standard: Numeric CSR Budget Calculation (c12_comm_013)
  {
    id: 'ch_010',
    nodeId: NODE_C12_COMM_013,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under Section 135 of Companies Act 2013, BDCS Ltd had net profits of ₹300 crore, ₹400 crore, and ₹500 crore in the preceding 3 financial years. What is its mandatory minimum CSR budget for this year in ₹ crore?',
    correctAnswer: 8,
    tolerance: 0.1,
    unit: 'crore',
    explanation: 'Average net profit = (300 + 400 + 500) / 3 = ₹400 crore. Mandatory CSR = 2% of ₹400 crore = ₹8 crore.',
    hints: [
      'First calculate the average net profit of the 3 preceding financial years.',
      'Average = (300 + 400 + 500) / 3 = 400 crore.',
      'Calculate 2% of 400 crore.',
    ],
  },
  // 11. Standard: Drag-sort Selection Process Steps (c12_comm_018)
  {
    id: 'ch_011',
    nodeId: NODE_C12_COMM_018,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Sort the 6 steps of the Selection Process into their strict chronological order:',
    sortItems: [
      'Preliminary Screening',
      'Selection Tests (Aptitude/Trade)',
      'Employment Interview',
      'Reference & Background Checks',
      'Medical Examination',
      'Final Selection Offer',
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation: 'The standard selection sequence is: Preliminary Screening -> Selection Tests -> Employment Interview -> Reference Checks -> Medical Examination -> Final Selection Offer.',
    hints: [
      'Expensive tests and medical exams are not conducted on unscreened candidates.',
      'Interviews happen before checking references and sending candidates for medical fitness.',
      'Medical exam is Step 5, right before the final offer letter.',
    ],
    misconceptionIndex: 8,
  },
  // 12. Standard: Recruitment vs Selection Distinction (c12_comm_018)
  {
    id: 'ch_012',
    nodeId: NODE_C12_COMM_018,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is Recruitment designated a "positive process" while Selection is designated a "negative process"?',
    options: [
      'Recruitment brings joy to applicants while selection causes disappointment',
      'Recruitment aims to attract and maximize the pool of applicants (addition), while selection aims to filter out and reject unsuitable candidates (subtraction)',
      'Recruitment is legally mandatory under Constitution Article 16 while selection is optional',
      'Recruitment is done by external headhunters while selection is done by algorithms',
    ],
    correctIndex: 1,
    explanation: 'Recruitment is positive because it expands the candidate pool (attracting applications). Selection is negative because it eliminates candidates at each successive stage to pick only the best.',
    hints: [
      'Think of adding to a pool versus filtering down from a pool.',
      'Recruitment stimulates candidates to apply; selection rejects more than it hires.',
      'Positive = additive pool creation; Negative = subtractive elimination.',
    ],
    misconceptionIndex: 9,
  },
  // 13. Standard: Formal vs Informal Authority (c12_comm_016)
  {
    id: 'ch_013',
    nodeId: NODE_C12_COMM_016,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'At Wipro, a Project Manager approves leave due to formal authority, while a junior engineer leads the campus trekking club. What is the source of authority in formal vs informal organisation?',
    options: [
      'Formal is given by trade unions; informal is given by HR guidelines',
      'Formal is attached to the position/job role; informal is attached to personal qualities and social influence',
      'Formal is temporary for 1 year; informal is permanent under Indian labour law',
      'Formal exists only in government PSUs; informal exists only in private tech startups',
    ],
    correctIndex: 1,
    explanation: 'Formal authority is vested in the organizational position/designation. Informal authority arises spontaneously from personal attributes, competence, interpersonal trust, or social status.',
    hints: [
      'Does the Project Manager have power because of who he is or the chair he holds?',
      'Informal leaders are chosen by peers based on respect and personality.',
      'Formal = positional authority; Informal = personal influence.',
    ],
  },
  // 14. Standard: On-the-job Training Methods (c12_comm_019)
  {
    id: 'ch_014',
    nodeId: NODE_C12_COMM_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Tata Steel moves fresh executive trainees across Blast Furnace, Quality Lab, Supply Chain, and HR departments every 6 months. Which on-the-job training method is this?',
    options: [
      'Apprenticeship under Apprentices Act 1961',
      'Job Rotation',
      'Vestibule Training',
      'Case Study Analysis',
    ],
    correctIndex: 1,
    explanation: 'Job rotation involves systematically moving an employee across multiple departments to build a multi-skilled generalist perspective and cross-functional understanding.',
    hints: [
      'The trainee is moving from one department to another periodically.',
      'This method broadens understanding of the whole business rather than deep specialization in one trade.',
      'Systematic lateral movement across functions is Job Rotation.',
    ],
  },
  // 15. Standard: Off-the-job Vestibule Training (c12_comm_020)
  {
    id: 'ch_020',
    nodeId: NODE_C12_COMM_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Infosys built an ₹800-crore Global Education Centre at Mysore where freshers code on simulated client banking environments before touching live software. Why is this OFF-THE-JOB training?',
    options: [
      'Because it uses computers instead of heavy machinery',
      'Because it is conducted in a separate dedicated training facility away from the live production floor, producing zero live output',
      'Because the trainers are foreign consultants rather than senior employees',
      'Because the trainees do not receive any monthly stipend',
    ],
    correctIndex: 1,
    explanation: 'Vestibule training is off-the-job because it takes place in a separate dedicated simulation center away from actual live operations, so mistakes cause no financial harm to real clients.',
    hints: [
      'The classification criterion is LOCATION and live output, not the type of equipment.',
      'Even if equipment duplicates the workplace, a separate training campus makes it off-the-job.',
      'Separate simulation facility away from live work = Off-the-job Vestibule Training.',
    ],
    misconceptionIndex: 10,
  },
  // 16. Advanced: Competency Analysis - Gig Economy & Taylor (c12_comm_011)
  {
    id: 'ch_016',
    nodeId: NODE_C12_COMM_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Swiggy & Zomato use algorithmic delivery tracking with tight minute-by-minute targets. How does this reflect Taylorism, and what is its primary modern ethical limitation?',
    options: [
      'It reflects Fayol\'s esprit de corps; limitation is excessive worker bonding',
      'It applies Taylor\'s time-motion standardisation; limitation is treating workers as mechanical units leading to road safety and welfare concerns',
      'It completely violates all scientific management principles; limitation is low technical automation',
      'It is an off-the-job simulation; limitation is lack of live customer interaction',
    ],
    correctIndex: 1,
    explanation: 'Algorithmic time targets represent classical Taylorist task measurement. The ethical critique is that rigid speed targets disregard human fatigue and safety, prompting legal modifications like the Code on Wages 2019.',
    hints: [
      'Taylor broke work into measured seconds and minutes to enforce efficiency.',
      'Algorithms track delivery riders in real-time just like stopwatches on Taylor\'s shop floor.',
      'The ethical concern is rider safety and excessive pressure without social security.',
    ],
  },
  // 17. Advanced: Strategic Planning Application - Ather Energy (c12_comm_012)
  {
    id: 'ch_017',
    nodeId: NODE_C12_COMM_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'EV startup Ather Energy evaluates expanding to Chennai vs Pune vs Hyderabad. It assesses showroom capex, charging grid feasibility, and battery supply. Which planning step is being executed?',
    options: [
      'Step 1: Setting Objectives',
      'Step 3: Evaluating Alternative Courses of Action',
      'Step 5: Follow-up and Implementation Review',
      'Step 2: Identifying Division of Work',
    ],
    correctIndex: 1,
    explanation: 'Evaluating alternative courses of action involves weighing generated options against cost, feasibility, operational capabilities, and market risk prior to final selection.',
    hints: [
      'The options have already been identified; now their costs, risks, and benefits are being weighed.',
      'Weighing pros and cons of identified choices is Step 3.',
      'Evaluating alternatives against criteria precedes Step 4 (Selection).',
    ],
  },
  // 18. Advanced: Construct 8 Plan Hierarchy (c12_comm_013)
  {
    id: 'ch_018',
    nodeId: NODE_C12_COMM_013,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Assemble the standing plan hierarchy from most general/abstract to most specific/rigid:',
    availableParts: ['Objective', 'Strategy', 'Policy', 'Procedure', 'Method', 'Rule'],
    targetState: 'Objective Strategy Policy Procedure Method Rule',
    validationHint: 'Think from top-level enterprise aspiration down to zero-discretion shop-floor command.',
    explanation: 'Standing plans cascade from broad purpose to specific constraint: Objective -> Strategy -> Policy -> Procedure -> Method -> Rule.',
    hints: [
      'Start with the broad end goal (Objective) and overarching route (Strategy).',
      'Guidelines (Policy) precede sequences (Procedure) and specific techniques (Method).',
      'The most specific and rigid constraint with zero discretion is Rule.',
    ],
  },
  // 19. Advanced: Organisational Redesign for Conglomerate (c12_comm_015)
  {
    id: 'ch_019',
    nodeId: NODE_C12_COMM_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A manufacturing firm selling commercial trucks enters electric passenger cars, solar home batteries, and consumer IoT gadgets. Why MUST it switch from Functional to Divisional structure?',
    options: [
      'Functional structures are prohibited for firms with revenue over ₹1,000 crore',
      'A single functional marketing/R&D department cannot handle radically divergent consumer bases, distribution channels, and technologies without catastrophic coordination bottlenecks',
      'Divisional structures completely eliminate the need for corporate finance and HR departments',
      'To comply with the Apprentices Act 1961 mandatory divisional ratios',
    ],
    correctIndex: 1,
    explanation: 'When a firm diversifies into unrelated product lines with distinct customers, channels, and technologies, a functional structure collapses under cross-functional conflict. Structure follows strategy.',
    hints: [
      'Can one marketing manager sell mining trucks, smartwatches, and solar panels effectively?',
      'Different products need dedicated P&L accountability and specialized channel management.',
      'Product variety and distinct market dynamics necessitate semi-autonomous divisions.',
    ],
  },
  // 20. Advanced: Apprenticeship Legal & Operational Framework (c12_comm_019)
  {
    id: 'ch_020',
    nodeId: NODE_C12_COMM_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Under the Apprentices Act 1961 (amended 2014) and NAPS, what statutory obligation applies to Maruti Suzuki at Manesar employing 5,000 workers?',
    options: [
      'It must send 100% of workers to IIM Ahmedabad for case studies',
      'It must engage apprentices within 2.5% to 10% of total workforce, provide trade training with stipend, and receive NAPS government reimbursement',
      'It must convert all informal grapevines into certified standing orders',
      'It is legally exempt from providing on-the-job training if it uses job portals',
    ],
    correctIndex: 1,
    explanation: 'The Apprentices Act 1961 mandates establishments with 30+ employees engage apprentices at 2.5%-10% of total workforce with prescribed stipends, supported by NAPS reimbursement.',
    hints: [
      'Look for the statutory percentage band mandated for industrial establishments.',
      'The band is 2.5% to 10% of total headcount with stipend and NAPS backing.',
      'Apprenticeship is a legally mandated trade training framework in India.',
    ],
  },
  // 21. Advanced: Training Method Match Matrix (c12_comm_019, c12_comm_020)
  {
    id: 'ch_021',
    nodeId: NODE_C12_COMM_020,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Match the specific business training objective with its optimal pedagogical method:',
    options: [
      'Negotiation skills -> Lecture; Cloud server safety -> Job Rotation; Policy rollout -> Role Playing',
      'Sales negotiation -> Role Playing; Zero-risk cloud computing -> Vestibule; Mass policy broadcast -> Lecture; High-level analytical dilemma -> Case Study',
      'High-level dilemma -> Apprenticeship; Sales negotiation -> Vestibule; Factory welding -> Case Study',
      'Mass policy broadcast -> Role Playing; Trade welding -> Lecture; Generalist managers -> Vestibule',
    ],
    correctIndex: 1,
    explanation: 'Interpersonal skills need Role Playing; high-cost error skills need Vestibule simulation; conceptual debate needs Case Study; large-scale knowledge distribution needs Lecture.',
    hints: [
      'How do HUL sales reps practice discounts? (Role playing)',
      'How do freshers write bank code without crashing live servers? (Vestibule)',
      'How do IIM students analyze the Tata Nano failure? (Case study)',
    ],
  },
  // 22. Advanced: Creativity/Synthesis - Staffing Pipeline Architecture (c12_comm_017)
  {
    id: 'ch_022',
    nodeId: NODE_C12_COMM_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'TCS faces a 12% annual attrition across 600,000 staff. To maintain capacity and scale digital AI services, what integrated staffing architecture must it deploy?',
    options: [
      'Freeze all recruitment and rely solely on informal grapevine referrals',
      'Proactive workforce planning, mass NQT external recruitment (300k+ applicants), rigorous negative selection filter (40k hires), followed by 14-week vestibule simulation and continuous on-the-job project coaching',
      'Rely exclusively on internal job transfers without hiring external campus freshers',
      'Eliminate the induction step to cut operating expenditures by 50%',
    ],
    correctIndex: 1,
    explanation: 'A comprehensive staffing architecture connects manpower planning -> large-scale recruitment -> multi-tier selection -> vestibule onboarding -> continuous on-the-job coaching.',
    hints: [
      'Replacing 70,000+ engineers requires an integrated 5-step staffing pipeline.',
      'Combine mass entry funnel (recruitment/selection) with vestibule induction and ongoing coaching.',
      'Effective staffing is a continuous end-to-end lifecycle system.',
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

// ─── DEFAULT ENRICHMENT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_COMM_011,
  title: 'Principles of Management: Taylor & Fayol to Modern Staffing',
  definition: 'An integrated study of classical management theories (Taylor & Fayol), the 5-step Planning process, 8 types of plans, Organising dynamics (Functional vs Divisional, Formal vs Informal), and the end-to-end Staffing lifecycle including On-the-Job and Off-the-Job training methods in Indian industry.',
  eli5: 'Think of building an IPL cricket franchise. Taylor improves how fast each batter swings and runs between wickets (shop floor). Fayol arranges the captain, selectors, and coaches (apex management). Planning chooses the match strategy; Organising sets up specialist departments (batting, bowling, physio); and Staffing scouts, drafts, and trains the players.',
  misconceptions: [
    { misconception: 'Taylor and Fayol are conflicting theories where a company must choose one.', correction: 'They are complementary layers: Taylor optimizes shop-floor production efficiency, while Fayol structures apex administrative coordination.' },
    { misconception: 'Planning ends the moment the best alternative course of action is selected.', correction: 'Planning has 5 steps: follow-up (monitoring and corrective implementation review) is the mandatory final step.' },
    { misconception: 'Selecting the best alternative precedes evaluating alternatives.', correction: 'Logically impossible: you must evaluate all identified alternatives against criteria before selecting the best.' },
    { misconception: 'Budgets and programs are standing plans because they are made every year.', correction: 'Budgets and programs are single-use plans: each annual budget and project program is crafted for a specific period and expires.' },
    { misconception: 'Policy and rule are interchangeable synonyms.', correction: 'A policy is a flexible guide permitting managerial discretion; a rule is a rigid command with zero exceptions.' },
    { misconception: 'Accountability flows downward from superior to subordinate.', correction: 'Authority and responsibility flow downward, but accountability (answerability for outcomes) always flows upward.' },
    { misconception: 'Functional structure is suitable for large diversified multi-product conglomerates.', correction: 'Functional structure suits single-product firms; diversified multi-product giants require divisional structures.' },
    { misconception: 'Procedure and method are identical concepts.', correction: 'A procedure is a multi-step chronological sequence; a method is a specific standardized technique for one step.' },
    { misconception: 'Recruitment is a negative process and selection is positive.', correction: 'Recruitment is positive (adds applicants to the pool); selection is negative (eliminates unsuitable candidates).' },
    { misconception: 'Vestibule training is on-the-job because it uses real machinery.', correction: 'Location test: vestibule training occurs in a separate simulation center away from live production, making it off-the-job.' },
  ],
  diagnosticQuestions: [
    { question: 'What was F.W. Taylor\'s primary background and organizational focus?', options: ['Managing Director studying overall administration', 'Mechanical engineer studying shop-floor efficiency', 'HR specialist studying trade union law', 'Marketing executive studying FMCG sales'], correctIndex: 1 },
    { question: 'What is the correct 5-step sequence of planning?', options: ['Set Objectives -> Select Best -> Identify -> Evaluate -> Follow-up', 'Set Objectives -> Identify Alternatives -> Evaluate Alternatives -> Select Best -> Follow-up', 'Identify -> Set Objectives -> Evaluate -> Select -> Implement', 'Set Objectives -> Budget -> Select -> Execute -> Control'], correctIndex: 1 },
    { question: 'Which plan type is a non-negotiable directive admitting zero managerial discretion?', options: ['Policy', 'Strategy', 'Rule', 'Method'], correctIndex: 2 },
    { question: 'Which structure groups activities by product line with autonomous P&L units?', options: ['Functional Structure', 'Divisional Structure', 'Matrix Structure', 'Grapevine Structure'], correctIndex: 1 },
    { question: 'Where does informal organisation originate?', options: ['Official board resolutions', 'Spontaneous social interactions and personal bonds', 'Ministry of Corporate Affairs filings', 'Trade union collective bargaining contracts'], correctIndex: 1 },
    { question: 'What is the correct sequence of the 5 staffing steps?', options: ['Training -> Recruitment -> Selection -> Manpower -> Placement', 'Manpower Planning -> Recruitment -> Selection -> Placement & Induction -> Training & Development', 'Recruitment -> Selection -> Manpower Planning -> Induction -> Training', 'Manpower Planning -> Placement -> Selection -> Recruitment -> Training'], correctIndex: 1 },
    { question: 'Under the Apprentices Act 1961, what is the mandatory engagement band for 30+ employee firms?', options: ['0.5% to 1%', '2.5% to 10%', '20% to 30%', '50% fixed'], correctIndex: 1 },
    { question: 'Why is Infosys Mysore Global Education Centre classified as vestibule training?', options: ['It teaches soft skills only', 'It operates in a separate simulation facility away from live client projects', 'It is an internal job transfer', 'It has no faculty'], correctIndex: 1 },
  ],
  masteryCriteria: 'Master all 10 CISCE nodes across Taylor vs Fayol, Planning, Organising, Staffing, and Training with adaptive competency-based execution.',
};

// ─── EXPLORATION STEPS (BRILLIANT.ORG INTERACTIVE DISCOVERY) ───
const EXPLORATION_STEPS = [
  {
    title: 'Taylor vs Fayol: The Dual Engine',
    instruction: 'Adjust the Shop-Floor Efficiency slider (Taylor) and Boardroom Governance slider (Fayol) to observe how enterprise productivity balances.',
    interactionType: 'dual-slider',
    nodeId: NODE_C12_COMM_011,
  },
  {
    title: 'The 5-Step Planning Ladder',
    instruction: 'Click each planning rung in sequence from Objective Setting to Follow-up Review to deploy Reliance Jio\'s 4G rollout strategy.',
    interactionType: 'planning-ladder',
    nodeId: NODE_C12_COMM_012,
  },
  {
    title: 'The 8 Types of Plans Matrix',
    instruction: 'Toggle between Standing Plans (Reusable) and Single-Use Plans (Project-Specific) to inspect ISRO\'s Chandrayaan-3 planning hierarchy.',
    interactionType: 'plan-matrix',
    nodeId: NODE_C12_COMM_013,
  },
  {
    title: 'Organisational Architecture: Functional vs Divisional',
    instruction: 'Toggle BDCS Ltd between Single-Product (Paint/Steel) mode and Diversified Conglomerate (EV/FMCG/Electronics) mode.',
    interactionType: 'organogram-morph',
    nodeId: NODE_C12_COMM_015,
  },
  {
    title: 'Staffing Funnel & Training Matrix',
    instruction: 'Simulate TCS\'s 300,000 NQT applicant funnel and route recruits to On-the-Job (Coaching/Rotation) vs Off-the-Job (Vestibule) training.',
    interactionType: 'staffing-funnel',
    nodeId: NODE_C12_COMM_017,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an Indian EV firm doubles shop-floor time study rigour (Taylor) but has zero scalar chain coordination (Fayol), what will happen?',
    options: [
      'Overall enterprise profit will still reach 100% because factory efficiency is all that matters',
      'Batteries will be assembled fast, but marketing, supply chain, and deliveries will suffer severe chaos',
      'Workers will automatically elect their own Board of Directors',
      'The company will be legally dissolved under Section 134',
    ],
    correctIndex: 1,
    verifyInstruction: 'Set Taylor slider to 100% and Fayol slider to 0% in the interactive simulation above to verify the administrative bottleneck!',
    nodeId: NODE_C12_COMM_011,
  },
  {
    question: 'Predict: If a diversified conglomerate (selling trucks, soaps, and insurance) forces all businesses into ONE functional marketing department, what will happen?',
    options: [
      'Marketing efficiency will triple with zero administrative costs',
      'Marketing campaigns will suffer severe delays, conflicting priorities, and brand dilution',
      'All products will automatically merge into a single brand',
      'The company will bypass Companies Act Schedule III requirements',
    ],
    correctIndex: 1,
    verifyInstruction: 'Toggle to Diversified mode in the Organogram Explorer to see why product variety breaks functional silos!',
    nodeId: NODE_C12_COMM_015,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Executive Blueprint: Architect an Indian Green-Tech Unicorn',
  description: 'Apply the 10 CISCE Commerce management principles to design an Indian Clean-Energy Electric Mobility startup ("Pawan Mobility Ltd") based in Pune.',
  steps: [
    'Define 1 quantitative Objective (e.g. 50,000 EV scooters in FY26) and 1 non-negotiable Safety Rule.',
    'Map the 5 Organising steps: Divide work across Battery, Chassis, Software, Sales, and Customer Care.',
    'Justify whether Pawan Mobility should start with a Functional structure and at what diversification point it must transition to a Divisional structure.',
    'Draft a 5-step Staffing plan for 1,200 factory workers, incorporating 5% mandatory Apprenticeship under NAPS and 14-week Vestibule training for battery technicians.',
  ],
};

// ─── MAIN COMPONENT ───
export function C12_CommerceComparisonTaylorFayolSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // Config
  const subjectConfig = SUBJECT_CONFIG['comm'] || { name: 'Commerce', emoji: '📊', color: 'indigo' };

  // Phase state
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);

  // Predict-then-check & Observation State
  const [predictionSelected, setPredictionSelected] = useState<number | null>(null);
  const [predictionChecked, setPredictionChecked] = useState(false);

  // Interactive Exploration Controls
  const [taylorLevel, setTaylorLevel] = useState(70); // 0-100 Shop floor efficiency
  const [fayolLevel, setFayolLevel] = useState(70);   // 0-100 Administrative coordination
  const [activePlanRung, setActivePlanRung] = useState(0); // 0-4 planning ladder
  const [planMatrixTab, setPlanMatrixTab] = useState<'standing' | 'single-use'>('standing');
  const [selectedPlanType, setSelectedPlanType] = useState<string>('Policy');
  const [structureType, setStructureType] = useState<'functional' | 'divisional'>('functional');
  const [orgProductCount, setOrgProductCount] = useState(1); // 1 = paint, 4 = conglomerate
  const [trainingTypeTab, setTrainingTypeTab] = useState<'on-job' | 'off-job'>('on-job');

  // Sandbox Live Controls
  const [sandboxWorkerCount, setSandboxWorkerCount] = useState(2500);
  const [sandboxAttritionRate, setSandboxAttritionRate] = useState(12); // %
  const [sandboxTrainingBudget, setSandboxTrainingBudget] = useState(15); // in Crores
  const [sandboxErrorTolerance, setSandboxErrorTolerance] = useState(2); // %

  // Challenge & Evaluation State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints & visual feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop & Construct State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // UI Feedback Components State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES & LIVE CALCULATIONS ───
  const enterpriseProductivity = useMemo(() => {
    // Both engines must work together (multiplicative balance)
    const raw = (taylorLevel * 0.5) + (fayolLevel * 0.5);
    const balancePenalty = Math.abs(taylorLevel - fayolLevel) * 0.35;
    return Math.max(10, Math.min(100, Math.round(raw - balancePenalty)));
  }, [taylorLevel, fayolLevel]);

  const annualHiringNeeded = useMemo(() => {
    return Math.round((sandboxWorkerCount * (sandboxAttritionRate / 100)) + (sandboxWorkerCount * 0.08));
  }, [sandboxWorkerCount, sandboxAttritionRate]);

  const mandatoryApprenticesCount = useMemo(() => {
    // 2.5% to 10% under Apprentices Act
    return Math.round(sandboxWorkerCount * 0.05); // using standard 5%
  }, [sandboxWorkerCount]);

  // Spaced repetition schedule calculation based on student performance
  const srsDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  // Adaptive difficulty filter
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = (mastery === 'not-started' || mastery === 'beginner')
      ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── HTML CANVAS 2D ANIMATION LOOP ───
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

      // Draw dynamic enterprise energy wave
      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, '#6366f1');
      grad.addColorStop(0.5, '#ec4899');
      grad.addColorStop(1, '#10b981');

      ctx.beginPath();
      ctx.moveTo(0, 20);
      for (let x = 0; x < canvas.width; x += 5) {
        const y = 20 + Math.sin(x * 0.03 + frame * 0.05) * 6 * (enterpriseProductivity / 100);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = grad;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Pulsing pulse node
      const pulseX = (frame * 2) % canvas.width;
      const pulseY = 20 + Math.sin(pulseX * 0.03 + frame * 0.05) * 6 * (enterpriseProductivity / 100);
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [enterpriseProductivity, phase]);

  // ─── ESCALATING HINTS CALLBACK ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge?.hints?.[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us study the complete conceptual explanation.');
    }
  }, [hintCount, challenge]);

  // ─── INACTIVITY AUTO-HINT TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── CALLBACK HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    setDiscoverySelected(idx);
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Brilliant intuition! Both Taylor and Fayol operate in layers.');
    } else {
      audioManager.play('pop');
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration laboratory.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now test your variables freely in the management sandbox.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    resetInactivityTimer();
    speechManager.speak('Challenge mode activated. Prove your ISC commerce mastery!');
  }, [resetInactivityTimer]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  const handleTaylorChange = useCallback((val: number) => {
    setTaylorLevel(val);
    audioManager.play('count');
  }, []);

  const handleFayolChange = useCallback((val: number) => {
    setFayolLevel(val);
    audioManager.play('count');
  }, []);

  const handlePlanRungClick = useCallback((index: number) => {
    setActivePlanRung(index);
    audioManager.play('tap');
  }, []);

  const handlePlanTypeSelect = useCallback((type: string) => {
    setSelectedPlanType(type);
    audioManager.play('pop');
  }, []);

  const handleStructureToggle = useCallback((type: 'functional' | 'divisional') => {
    setStructureType(type);
    audioManager.play('balance');
  }, []);

  const handlePredictionAnswer = useCallback((idx: number) => {
    setPredictionSelected(idx);
    setPredictionChecked(true);
    const isCorrect = idx === PREDICTION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'drop-correct' : 'drop-wrong');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('drop-correct');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const items = prev.length === challenge.sortItems?.length
        ? [...prev]
        : challenge.sortItems?.map((_, i) => i) || [];
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return items;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Management Architecture simulation.');
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

  const handleAnswerValidation = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding analysis.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
      }
    } else {
      setErrors(e => e + 1);
      audioManager.play('error');
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
        speechManager.speak('Study the step-by-step breakdown carefully.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleSortSubmit = useCallback(() => {
    const currentOrder = sortArrangement.length > 0
      ? sortArrangement
      : (challenge.sortItems?.map((_, i) => i) || []);
    const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(challenge.correctOrder);
    handleAnswerValidation(isCorrect);
  }, [sortArrangement, challenge, handleAnswerValidation]);

  const handleMCQAnswer = useCallback((idx: number) => {
    const isCorrect = idx === challenge.correctIndex;
    handleAnswerValidation(isCorrect);
  }, [challenge, handleAnswerValidation]);

  const handleNumericSubmit = useCallback(() => {
    const val = parseFloat(numericInput);
    if (isNaN(val)) return;
    const isCorrect = Math.abs(val - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    handleAnswerValidation(isCorrect);
  }, [numericInput, challenge, handleAnswerValidation]);

  const handleConstructSubmit = useCallback(() => {
    const assembled = constructParts.join(' ').trim();
    const isCorrect = assembled === challenge.targetState;
    handleAnswerValidation(isCorrect);
  }, [constructParts, challenge, handleAnswerValidation]);

  const handleAddConstructPart = useCallback((part: string) => {
    setConstructParts(p => [...p, part]);
    audioManager.play('tap');
  }, []);

  const handleRemoveConstructPart = useCallback((idx: number) => {
    setConstructParts(p => p.filter((_, i) => i !== idx));
    audioManager.play('pop');
  }, []);

  const handleCheckDragLabels = useCallback(() => {
    const isCorrect = JSON.stringify(droppedLabels) === JSON.stringify(challenge.correctMapping);
    handleAnswerValidation(isCorrect);
  }, [droppedLabels, challenge, handleAnswerValidation]);

  // ─── RENDER ───
  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gold-500/20 border border-gold-400/30 flex items-center justify-center text-2xl shadow-inner"
            aria-hidden="true"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 12 Commerce (ISC)</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">10 Syllabi Nodes</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Pills Navigation */}
        <nav aria-label="Simulation Phases" className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label={`Switch to ${p} phase`}
              aria-pressed={phase === p}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                phase === p
                  ? 'bg-gradient-to-r from-gold-500 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </nav>
      </header>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Narrative Scenario Hero */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-900 border border-gold-500/30 relative overflow-hidden shadow-xl">
            <div className="flex items-start gap-4">
              <span className="text-4xl" aria-hidden="true">🏛️</span>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-400">Narrative Case</span>
                <h2 className="text-xl font-bold text-white mt-1">{SCENARIO.title}</h2>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
                <p className="text-gold-200/80 text-xs mt-2 italic">{SCENARIO.context}</p>
              </div>
            </div>
          </div>

          {/* Discovery Question Card */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span aria-hidden="true">💡</span>
              <span>Intuition Check (Ungraded)</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
              {DISCOVERY_QUESTION.question}
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-2xl text-left text-sm font-medium transition-all border ${
                    discoverySelected === i
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-500 text-rose-200'
                      : 'bg-slate-800/70 hover:bg-slate-800 border-slate-700/60 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {discoverySelected === i && (
                      <span className="font-bold text-base ml-2">
                        {i === DISCOVERY_QUESTION.correctIndex ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 rounded-2xl bg-gold-950/50 border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="text-xs sm:text-sm text-gold-200">
                  <span className="font-bold text-amber-300">Takeaway: </span>
                  {discoveryCorrect
                    ? '✓ Spot on! Taylor handles the operational micro-layer while Fayol coordinates the organizational macro-layer.'
                    : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Enter Interactive Exploration Laboratory"
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-purple-600 text-white font-bold text-sm shrink-0 shadow-lg"
                >
                  Enter Exploration Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (BRILLIANT.ORG INTERACTION CORE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Top Progress & Step Tabs */}
          <nav aria-label="Exploration steps" className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-label={`Step ${idx + 1}: ${step.title}`}
                aria-current={currentSlide === idx ? 'step' : undefined}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  currentSlide === idx
                    ? 'bg-gold-600 border-gold-400 text-white shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-black/30 flex items-center justify-center text-[10px]">
                  {idx + 1}
                </span>
                <span>{step.title}</span>
              </motion.button>
            ))}
          </nav>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6"
            >
              {/* Step Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                    Interactive Discovery • Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                  </span>
                  <h2 className="text-xl font-bold text-white mt-0.5">{EXPLORATION_STEPS[currentSlide].title}</h2>
                </div>
                <div className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-1.5 self-start sm:self-auto">
                  <span aria-hidden="true">👉</span>
                  <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
                </div>
              </div>

              {/* ─── SLIDE 0: TAYLOR VS FAYOL DUAL ENGINE (WITH TOPIC-SPECIFIC SVG 1) ─── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {/* Topic-Specific SVG 1: Taylor vs Fayol Enterprise Balance Diagram */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-bold text-gold-300">SVG Architecture 1: Taylor Shop-Floor vs Fayol Boardroom Scalar Flow</span>
                      <span className="text-emerald-400 font-bold">Productivity: {enterpriseProductivity}%</span>
                    </div>
                    <svg viewBox="0 0 600 130" className="w-full h-auto bg-slate-900/80 rounded-xl" aria-label="Taylor versus Fayol dual engine organizational diagram">
                      {/* Left: Taylor Micro-Shop Floor */}
                      <rect x="20" y="20" width="220" height="90" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="130" y="42" textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="bold">F.W. Taylor: Shop Floor (Micro)</text>
                      <text x="130" y="62" textAnchor="middle" fill="#cbd5e1" fontSize="10">Time & Motion Study • Piece-Rates</text>
                      <text x="130" y="80" textAnchor="middle" fill="#94a3b8" fontSize="9">Bottom-Up Technical Efficiency</text>
                      <rect x="40" y="90" width={`${(taylorLevel / 100) * 180}`} height="8" rx="4" fill="#6366f1" />

                      {/* Middle: Integrated Synergy Node */}
                      <circle cx="300" cy="65" r="28" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
                      <text x="300" y="62" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">BDCS</text>
                      <text x="300" y="76" textAnchor="middle" fill="#a7f3d0" fontSize="9">{enterpriseProductivity}%</text>

                      {/* Linking Arrows */}
                      <line x1="240" y1="65" x2="270" y2="65" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 2" />
                      <polygon points="270,61 278,65 270,69" fill="#6366f1" />

                      <line x1="360" y1="65" x2="330" y2="65" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
                      <polygon points="330,61 322,65 330,69" fill="#10b981" />

                      {/* Right: Fayol Macro-Administration */}
                      <rect x="360" y="20" width="220" height="90" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                      <text x="470" y="42" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="bold">Henri Fayol: Boardroom (Macro)</text>
                      <text x="470" y="62" textAnchor="middle" fill="#cbd5e1" fontSize="10">14 Principles • Scalar Chain</text>
                      <text x="470" y="80" textAnchor="middle" fill="#94a3b8" fontSize="9">Top-Down Administrative Control</text>
                      <rect x="380" y="90" width={`${(fayolLevel / 100) * 180}`} height="8" rx="4" fill="#10b981" />
                    </svg>
                  </div>

                  {/* Canvas Wave Banner */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 relative">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span>Enterprise Live Energy Wave</span>
                      <span className="text-emerald-400 font-bold">Synergy Index: {enterpriseProductivity}%</span>
                    </div>
                    <canvas ref={canvasRef} width={600} height={40} className="w-full h-10 rounded-lg bg-slate-900/60" aria-label="Enterprise energy waveform" />
                  </div>

                  {/* Dual Sliders */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Taylor Shop Floor */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-gold-500/30 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl" aria-hidden="true">⚙️</span>
                          <div>
                            <h3 className="text-sm font-bold text-white">F.W. Taylor: Scientific Management</h3>
                            <span className="text-[11px] text-gold-400 font-semibold">Shop-Floor Production Efficiency</span>
                          </div>
                        </div>
                        <span className="text-lg font-black text-gold-400">{taylorLevel}%</span>
                      </div>

                      <input
                        type="range"
                        min={0}
                        max={100}
                        aria-label="Taylor shop floor efficiency slider"
                        value={taylorLevel}
                        onChange={(e) => handleTaylorChange(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />

                      <div className="text-xs text-slate-400 space-y-1 bg-slate-900 p-3 rounded-xl">
                        <p>• Method & Time Study: 60-second cycle benchmarks</p>
                        <p>• Piece-rate wage incentives for high-output workers</p>
                        <p>• Standardisation of tools & eliminates wasted motion</p>
                      </div>
                    </div>

                    {/* Fayol Apex Administration */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl" aria-hidden="true">🏛️</span>
                          <div>
                            <h3 className="text-sm font-bold text-white">Henri Fayol: Administrative Theory</h3>
                            <span className="text-[11px] text-emerald-400 font-semibold">Boardroom Coordination & Scalar Chain</span>
                          </div>
                        </div>
                        <span className="text-lg font-black text-emerald-400">{fayolLevel}%</span>
                      </div>

                      <input
                        type="range"
                        min={0}
                        max={100}
                        aria-label="Fayol boardroom coordination slider"
                        value={fayolLevel}
                        onChange={(e) => handleFayolChange(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />

                      <div className="text-xs text-slate-400 space-y-1 bg-slate-900 p-3 rounded-xl">
                        <p>• 14 Universal Principles (Unity of Direction, Esprit de Corps)</p>
                        <p>• Scalar Chain from Board to Shift Supervisors</p>
                        <p>• Applicable across factories, banks, hospitals & IT</p>
                      </div>
                    </div>
                  </div>

                  {/* Predict Then Check Unit */}
                  <div className="p-5 rounded-2xl bg-gold-950/40 border border-gold-500/20 space-y-3">
                    <div className="text-xs font-bold text-gold-300 uppercase tracking-wider">Predict-Then-Check Experiment</div>
                    <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          aria-label={`Prediction Option ${i + 1}: ${opt}`}
                          onClick={() => handlePredictionAnswer(i)}
                          className={`p-3 rounded-xl text-left text-xs transition-all border ${
                            predictionSelected === i
                              ? i === PREDICTION_QUESTIONS[0].correctIndex
                                ? 'bg-emerald-900/70 border-emerald-500 text-emerald-200'
                                : 'bg-rose-900/70 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{opt}</span>
                            {predictionSelected === i && (
                              <span className="font-bold ml-2">
                                {i === PREDICTION_QUESTIONS[0].correctIndex ? '✓' : '✗'}
                              </span>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                    {predictionChecked && (
                      <p className="text-xs text-amber-300 mt-2">
                        💡 {PREDICTION_QUESTIONS[0].verifyInstruction}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: 5-STEP PLANNING LADDER ─── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {[
                      { step: 1, name: 'Set Objectives', desc: 'Acquire 100M users in 100 days (Specific & Measurable)', icon: '🎯' },
                      { step: 2, name: 'Identify Alternatives', desc: 'Compare 2G Voice vs 3G Hybrid vs 4G Pure VoLTE', icon: '🔍' },
                      { step: 3, name: 'Evaluate Alternatives', desc: 'Assess capex, tower fiberisation & spectrum ROI', icon: '⚖️' },
                      { step: 4, name: 'Select Best Alternative', desc: 'Choose 4G VoLTE + Free Voice pricing model', icon: '✅' },
                      { step: 5, name: 'Follow-up Review', desc: 'Daily subscriber additions monitoring & tariff tuning', icon: '🔄' },
                    ].map((rung, i) => (
                      <motion.div
                        key={i}
                        role="button"
                        tabIndex={0}
                        aria-label={`Planning Stage ${rung.step}: ${rung.name}`}
                        whileHover={{ scale: 1.03, y: -4 }}
                        onClick={() => handlePlanRungClick(i)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePlanRungClick(i); }}
                        className={`p-4 rounded-2xl cursor-pointer border transition-all flex flex-col justify-between ${
                          activePlanRung === i
                            ? 'bg-gradient-to-b from-gold-900/90 to-slate-900 border-gold-400 shadow-xl'
                            : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xl" aria-hidden="true">{rung.icon}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              activePlanRung === i ? 'bg-gold-500 text-white' : 'bg-slate-800 text-slate-400'
                            }`}>
                              Step {rung.step}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white">{rung.name}</h4>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-2 leading-tight">{rung.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Interactive Plan Breakdown Banner */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Planning Step Insights</span>
                      <h3 className="text-base font-bold text-white">
                        {activePlanRung === 0 && 'Step 1: Objectives give direction to the entire firm'}
                        {activePlanRung === 1 && 'Step 2: A plan with 1 option is a default, not a plan'}
                        {activePlanRung === 2 && 'Step 3: Evaluation precedes selection — weighing risk vs return'}
                        {activePlanRung === 3 && 'Step 4: Selection is committing resources to the chosen path'}
                        {activePlanRung === 4 && 'Step 5: Follow-up is mandatory — planning is an ongoing loop'}
                      </h3>
                      <p className="text-xs text-slate-400 max-w-2xl">
                        {activePlanRung === 4
                          ? 'Common Exam Trap: Stopping at Step 4 loses marks. Follow-up reviews verify if assumptions held true (e.g., Tata Nano assumed customers wanted the cheapest car, requiring subsequent review).'
                          : 'Under Section 134(3)(i) of Companies Act 2013, Indian listed boards must legally disclose their planning & analysis (MD&A) in the annual report.'}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Advance to next planning step"
                      onClick={() => setActivePlanRung((activePlanRung + 1) % 5)}
                      className="px-4 py-2 rounded-xl bg-gold-600 text-white text-xs font-bold shrink-0"
                    >
                      Next Step →
                    </motion.button>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: 8 TYPES OF PLANS MATRIX ─── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  {/* Toggle Tabs */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label="Show Standing Reusable Plans"
                      onClick={() => {
                        setPlanMatrixTab('standing');
                        audioManager.play('tap');
                      }}
                      className={`flex-1 p-3 rounded-2xl font-bold text-xs uppercase tracking-wider border transition-all ${
                        planMatrixTab === 'standing'
                          ? 'bg-gold-600 border-gold-400 text-white shadow-lg'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Standing Plans (Reusable Guidelines)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label="Show Single Use Project Plans"
                      onClick={() => {
                        setPlanMatrixTab('single-use');
                        audioManager.play('tap');
                      }}
                      className={`flex-1 p-3 rounded-2xl font-bold text-xs uppercase tracking-wider border transition-all ${
                        planMatrixTab === 'single-use'
                          ? 'bg-purple-600 border-purple-400 text-white shadow-lg'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Single-Use Plans (One-Time Projects / Budgets)
                    </motion.button>
                  </div>

                  {/* Matrix Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {planMatrixTab === 'standing' ? (
                      [
                        { type: 'Objective', desc: 'End goal (What to achieve)', ex: 'Reach 30M tonnes steel by 2030' },
                        { type: 'Strategy', desc: 'Broad approach to rivals', ex: 'Acquire Corus for European market access' },
                        { type: 'Policy', desc: 'Flexible decision guideline', ex: 'Prefer local hiring in Jamshedpur' },
                        { type: 'Procedure', desc: 'Chronological sequence of steps', ex: '7-step plant operator recruitment' },
                        { type: 'Method', desc: 'Standard technique for 1 step', ex: 'STAR behavioural interviewing' },
                        { type: 'Rule', desc: 'Rigid command (zero discretion)', ex: 'No entry without safety helmet' },
                      ].map((p, i) => (
                        <motion.div
                          key={i}
                          role="button"
                          tabIndex={0}
                          aria-label={`Plan type ${p.type}: ${p.desc}`}
                          whileHover={{ scale: 1.04 }}
                          onClick={() => handlePlanTypeSelect(p.type)}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePlanTypeSelect(p.type); }}
                          className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                            selectedPlanType === p.type
                              ? 'bg-gold-950 border-gold-400 shadow-md'
                              : 'bg-slate-950 border-slate-800'
                          }`}
                        >
                          <span className="text-xs font-bold text-gold-400 uppercase">{p.type}</span>
                          <p className="text-xs text-white font-semibold mt-1">{p.desc}</p>
                          <p className="text-[10px] text-slate-400 mt-2 italic">e.g. {p.ex}</p>
                        </motion.div>
                      ))
                    ) : (
                      [
                        { type: 'Budget', desc: 'Quantitative monetary allocation', ex: '₹2,000 crore capex for FY24' },
                        { type: 'Program', desc: 'Coordinated set of goals/steps', ex: 'Green Steel Initiative by 2030' },
                      ].map((p, i) => (
                        <motion.div
                          key={i}
                          role="button"
                          tabIndex={0}
                          aria-label={`Single use plan type ${p.type}: ${p.desc}`}
                          whileHover={{ scale: 1.04 }}
                          onClick={() => handlePlanTypeSelect(p.type)}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePlanTypeSelect(p.type); }}
                          className={`p-4 rounded-2xl cursor-pointer border col-span-2 transition-all ${
                            selectedPlanType === p.type
                              ? 'bg-purple-950 border-purple-400 shadow-md'
                              : 'bg-slate-950 border-slate-800'
                          }`}
                        >
                          <span className="text-xs font-bold text-purple-400 uppercase">{p.type}</span>
                          <p className="text-xs text-white font-semibold mt-1">{p.desc}</p>
                          <p className="text-[10px] text-slate-400 mt-2 italic">e.g. {p.ex}</p>
                        </motion.div>
                      ))
                    )}
                  </div>

                  {/* Chandrayaan Case Anchor */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    <span className="font-bold text-amber-300">ISRO Chandrayaan-3 Plan Hierarchy: </span>
                    Objective (Soft-land on Lunar South Pole) → Strategy (Cost-effective ₹615 Cr LVM3 configuration) → Policy (Indigenous component sourcing preference) → Procedure (Multi-phase Earth/Lunar orbit maneuvers) → Method (Powered descent throttle algorithm) → Rule (Zero launch window extensions beyond July 2023) → Budget (₹615 Cr capex) → Program (Integrated Chandrayaan-3 Mission Plan).
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: FUNCTIONAL VS DIVISIONAL ORGANOGRAM (TOPIC-SPECIFIC SVG 2) ─── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  {/* Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-400">Structure Archetype:</span>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        aria-label="Select Functional Structure"
                        onClick={() => handleStructureToggle('functional')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          structureType === 'functional'
                            ? 'bg-gold-600 border-gold-400 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        Functional (Tata Steel / Asian Paints)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        aria-label="Select Divisional Structure"
                        onClick={() => handleStructureToggle('divisional')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          structureType === 'divisional'
                            ? 'bg-purple-600 border-purple-400 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        Divisional (HUL / Reliance / ITC)
                      </motion.button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Product Lines:</span>
                      <input
                        type="range"
                        min={1}
                        max={4}
                        aria-label="Number of enterprise product lines slider"
                        value={orgProductCount}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setOrgProductCount(val);
                          if (val > 1) setStructureType('divisional');
                          else setStructureType('functional');
                          audioManager.play('count');
                        }}
                        className="w-24 accent-gold-500"
                      />
                      <span className="text-xs font-bold text-white">{orgProductCount} {orgProductCount === 1 ? 'Product' : 'Products'}</span>
                    </div>
                  </div>

                  {/* Topic-Specific SVG 2: Organogram Morphing Diagram */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto">
                    <svg viewBox="0 0 600 220" className="w-full min-w-[500px]" aria-label="Functional versus Divisional organizational structure diagram">
                      {/* Apex CEO */}
                      <rect x="240" y="10" width="120" height="40" rx="10" fill="#4338ca" stroke="#818cf8" strokeWidth="2" />
                      <text x="300" y="35" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Managing Director</text>

                      {/* Main Spine */}
                      <line x1="300" y1="50" x2="300" y2="80" stroke="#64748b" strokeWidth="2" />

                      {structureType === 'functional' ? (
                        <>
                          {/* Horizontal Bar */}
                          <line x1="75" y1="80" x2="525" y2="80" stroke="#64748b" strokeWidth="2" />

                          {/* 4 Functional Departments */}
                          {[
                            { name: 'R & D', x: 75, color: '#0284c7' },
                            { name: 'Production', x: 225, color: '#059669' },
                            { name: 'Marketing', x: 375, color: '#d97706' },
                            { name: 'Finance & HR', x: 525, color: '#9333ea' },
                          ].map((fn, idx) => (
                            <g key={idx}>
                              <line x1={fn.x} y1="80" x2={fn.x} y2="110" stroke="#64748b" strokeWidth="2" />
                              <rect x={fn.x - 55} y="110" width="110" height="40" rx="8" fill="#1e293b" stroke={fn.color} strokeWidth="1.5" />
                              <text x={fn.x} y="135" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">{fn.name}</text>
                              <rect x={fn.x - 45} y="160" width="90" height="25" rx="5" fill="#0f172a" stroke="#334155" />
                              <text x={fn.x} y="177" textAnchor="middle" fill="#94a3b8" fontSize="9">Single Product</text>
                            </g>
                          ))}
                        </>
                      ) : (
                        <>
                          {/* Horizontal Bar */}
                          <line x1="100" y1="80" x2="500" y2="80" stroke="#64748b" strokeWidth="2" />

                          {/* 3 Autonomous Divisions */}
                          {[
                            { name: 'Home Care Div', x: 100, color: '#38bdf8', p: 'Surf Excel / Vim' },
                            { name: 'Beauty & Personal', x: 300, color: '#ec4899', p: 'Dove / Lux / Clinic' },
                            { name: 'Foods & Refreshment', x: 500, color: '#10b981', p: 'Kissan / Knorr' },
                          ].map((div, idx) => (
                            <g key={idx}>
                              <line x1={div.x} y1="80" x2={div.x} y2="105" stroke="#64748b" strokeWidth="2" />
                              <rect x={div.x - 70} y="105" width="140" height="40" rx="8" fill="#1e1b4b" stroke={div.color} strokeWidth="2" />
                              <text x={div.x} y="130" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">{div.name}</text>
                              <rect x={div.x - 60} y="155" width="120" height="45" rx="6" fill="#0f172a" stroke="#334155" />
                              <text x={div.x} y="172" textAnchor="middle" fill="#38bdf8" fontSize="8">Own Mktg, Fin, Ops</text>
                              <text x={div.x} y="188" textAnchor="middle" fill="#94a3b8" fontSize="8">e.g. {div.p}</text>
                            </g>
                          ))}
                        </>
                      )}
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-slate-950 rounded-xl border border-gold-500/30">
                      <span className="font-bold text-gold-300">Functional Merits:</span> Deep functional specialization, zero resource duplication, lower administrative costs. Demerits: Silos, slow cross-functional decisions.
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-purple-500/30">
                      <span className="font-bold text-purple-300">Divisional Merits:</span> Autonomous P&L accountability, fast market agility. Demerits: Duplication of functional teams (higher cost).
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: STAFFING FUNNEL & TRAINING MATRIX (TOPIC-SPECIFIC SVG 3) ─── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  {/* Topic-Specific SVG 3: TCS NQT Staffing Funnel & Filter Pipeline */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-bold text-gold-300">SVG Architecture 3: TCS 5-Stage Negative Selection Funnel & Filter Pipeline</span>
                      <span className="text-emerald-400 font-bold">Applications: 300k → Final Hires: 40k</span>
                    </div>
                    <svg viewBox="0 0 600 160" className="w-full h-auto bg-slate-900/80 rounded-xl" aria-label="Staffing and selection funnel diagram">
                      {/* Funnel Polygons */}
                      {/* Stage 1 */}
                      <polygon points="50,15 550,15 480,42 120,42" fill="#4338ca" opacity="0.9" />
                      <text x="300" y="32" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">1. Pool Recruitment: 300,000 Candidates (+ Positive)</text>

                      {/* Stage 2 */}
                      <polygon points="120,44 480,44 420,72 180,72" fill="#2563eb" opacity="0.9" />
                      <text x="300" y="62" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">2. NQT Screening & Tests: 120,000 Cleared (- Filter)</text>

                      {/* Stage 3 */}
                      <polygon points="180,74 420,74 370,102 230,102" fill="#7c3aed" opacity="0.9" />
                      <text x="300" y="92" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">3. Technical Interviews: 55,000 Shortlisted</text>

                      {/* Stage 4 */}
                      <polygon points="230,104 370,104 335,130 265,130" fill="#d97706" opacity="0.9" />
                      <text x="300" y="121" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">4. Background & Medical: 42,000 Cleared</text>

                      {/* Stage 5 */}
                      <polygon points="265,132 335,132 320,152 280,152" fill="#059669" opacity="0.95" />
                      <text x="300" y="146" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">5. 40k Hired</text>
                    </svg>
                  </div>

                  {/* Training Tab Switcher */}
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label="Select On-the-Job Training Methods"
                        onClick={() => {
                          setTrainingTypeTab('on-job');
                          audioManager.play('tap');
                        }}
                        className={`flex-1 p-3 rounded-2xl font-bold text-xs uppercase tracking-wider border transition-all ${
                          trainingTypeTab === 'on-job'
                            ? 'bg-emerald-600 border-emerald-400 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        On-the-Job (Learning by Doing at Live Workplace)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label="Select Off-the-Job Training Methods"
                        onClick={() => {
                          setTrainingTypeTab('off-job');
                          audioManager.play('tap');
                        }}
                        className={`flex-1 p-3 rounded-2xl font-bold text-xs uppercase tracking-wider border transition-all ${
                          trainingTypeTab === 'off-job'
                            ? 'bg-gold-600 border-gold-400 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        Off-the-Job (Separated Simulation Facility)
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {trainingTypeTab === 'on-job' ? (
                        [
                          { name: 'Coaching', desc: '1-on-1 guidance by senior architect on live project', ex: 'Infosys senior code pairing' },
                          { name: 'Job Rotation', desc: 'Periodic movement across departments every 6 months', ex: 'Tata Steel Jamshedpur Trainees' },
                          { name: 'Apprenticeship', desc: 'Statutory 1-3 yr trade training under Apprentices Act', ex: 'Maruti Suzuki Manesar NAPS welders' },
                        ].map((m, i) => (
                          <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30">
                            <span className="text-xs font-bold text-emerald-400 uppercase">{m.name}</span>
                            <p className="text-xs text-white mt-1">{m.desc}</p>
                            <p className="text-[10px] text-slate-400 mt-2 italic">e.g. {m.ex}</p>
                          </div>
                        ))
                      ) : (
                        [
                          { name: 'Vestibule Training', desc: 'Simulated replica center away from live lines', ex: 'Infosys Mysore ₹800 Cr GEC Campus' },
                          { name: 'Case Study', desc: 'Analytical classroom debate on real business dilemmas', ex: 'IIM Ahmedabad Tata Nano failure case' },
                          { name: 'Role Playing', desc: 'Acting out customer negotiations and sales dilemmas', ex: 'HUL sales rep discount negotiations' },
                        ].map((m, i) => (
                          <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-gold-500/30">
                            <span className="text-xs font-bold text-gold-400 uppercase">{m.name}</span>
                            <p className="text-xs text-white mt-1">{m.desc}</p>
                            <p className="text-[10px] text-slate-400 mt-2 italic">e.g. {m.ex}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Go to previous lab"
                  onClick={handlePrevSlide}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>

                <div className="text-xs text-slate-400">
                  Slide {currentSlide + 1} / {EXPLORATION_STEPS.length}
                </div>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Go to next lab"
                    onClick={handleNextSlide}
                    className="px-5 py-2 rounded-xl bg-gold-600 text-white text-xs font-bold"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Proceed to Management Sandbox"
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-lg"
                  >
                    Proceed to Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX (NO GRADING) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Sandbox Playground</span>
                <h2 className="text-xl font-bold text-white">Enterprise Resource & Staffing Simulator</h2>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                ✨ Free exploration — no grading penalties
              </span>
            </div>

            {/* Sandbox Controls Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Total Workforce:</span>
                  <span className="text-white font-bold">{sandboxWorkerCount}</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={20000}
                  step={500}
                  aria-label="Sandbox total workforce slider"
                  value={sandboxWorkerCount}
                  onChange={(e) => setSandboxWorkerCount(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Annual Attrition:</span>
                  <span className="text-rose-400 font-bold">{sandboxAttritionRate}%</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={25}
                  aria-label="Sandbox annual attrition rate slider"
                  value={sandboxAttritionRate}
                  onChange={(e) => setSandboxAttritionRate(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Training Budget:</span>
                  <span className="text-emerald-400 font-bold">₹{sandboxTrainingBudget} Cr</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  aria-label="Sandbox annual training budget slider"
                  value={sandboxTrainingBudget}
                  onChange={(e) => setSandboxTrainingBudget(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Shop-Floor Scrap Rate:</span>
                  <span className="text-amber-400 font-bold">{sandboxErrorTolerance}%</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={8}
                  step={0.5}
                  aria-label="Sandbox error tolerance slider"
                  value={sandboxErrorTolerance}
                  onChange={(e) => setSandboxErrorTolerance(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>

            {/* Calculated Dashboard Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-gold-950/40 border border-gold-500/30">
                <span className="text-[11px] font-bold text-gold-400 uppercase">Annual Replacement Hiring</span>
                <div className="text-2xl font-black text-white mt-1">{annualHiringNeeded.toLocaleString()} recruits</div>
                <p className="text-[10px] text-slate-400 mt-1">Covers {sandboxAttritionRate}% attrition + 8% expansion growth</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
                <span className="text-[11px] font-bold text-emerald-400 uppercase">Mandatory Apprentices (NAPS)</span>
                <div className="text-2xl font-black text-white mt-1">{mandatoryApprenticesCount.toLocaleString()} slots</div>
                <p className="text-[10px] text-slate-400 mt-1">5% statutory ratio under Apprentices Act 1961</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30">
                <span className="text-[11px] font-bold text-purple-400 uppercase">Vestibule Training Capacity</span>
                <div className="text-2xl font-black text-white mt-1">₹{(sandboxTrainingBudget / annualHiringNeeded * 10000).toFixed(0)} / recruit</div>
                <p className="text-[10px] text-slate-400 mt-1">Simulated off-the-job training allocation</p>
              </div>
            </div>

            {/* Ready Callout */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-xs text-slate-300">
                Ready to validate your theoretical and competency mastery across 22 CISCE Class 12 challenges?
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Launch challenges mode"
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-gold-600 text-white font-bold text-sm shadow-xl shrink-0"
              >
                Launch Challenges 🚀
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE (ADAPTIVE BKT + NEP 2020 COMPETENCY) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Header Stats */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border flex items-center gap-1 ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : difficulty === 'standard'
                    ? 'bg-gold-500/20 border-gold-500/40 text-gold-300'
                    : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                }`}
              >
                <span>{difficulty === 'foundation' ? '🟢' : difficulty === 'standard' ? '🔵' : '🔴'}</span>
                <span>{difficulty}</span>
              </motion.span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-gold-300 border border-slate-700">
                NEP Competency: {challenge.competencyLevel}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="text-emerald-400">✓ {scoreBreakdown.correct} Correct</span>
              <span className="text-rose-400">✗ {errors} Errors</span>
              <span className="text-slate-400">Mastery: <span className="text-gold-400 uppercase">{masteryLevel}</span></span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Active Challenge Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-3xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500 shadow-rose-900/40'
                : 'bg-slate-900 border-slate-800 shadow-xl'
            }`}
          >
            <div className="flex items-center justify-between gap-2 text-xs text-gold-400 font-bold uppercase tracking-wider mb-2">
              <span>Target Node: {challenge.nodeId}</span>
              <span className="text-slate-400">Type: {challenge.type}</span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-white mb-6 leading-relaxed">
              {challenge.question}
            </h2>

            {/* MCQ / Distinguish / Match / Classify */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    onClick={() => handleMCQAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`p-4 rounded-2xl text-left text-sm font-medium transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/70 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {showExplanation && (
                        <span className="font-bold text-sm ml-2">
                          {i === challenge.correctIndex ? '✓ Correct Answer' : ''}
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                {/* Palette */}
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      draggable
                      aria-label={`Draggable planning stage: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 rounded-xl bg-gold-600 text-white text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Targets Diagram */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {['step_1', 'step_2', 'step_3', 'step_4', 'step_5'].map((stepKey, idx) => (
                    <div
                      key={stepKey}
                      role="region"
                      aria-label={`Drop target slot ${idx + 1}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(stepKey)}
                      className={`p-4 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] text-center transition-all ${
                        droppedLabels[stepKey]
                          ? 'bg-gold-950/60 border-gold-400 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-500'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold text-slate-400">Slot {idx + 1}</span>
                      <span className="text-xs font-bold mt-1">{droppedLabels[stepKey] || 'Drop Stage Here'}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Verify stages ordering"
                  onClick={handleCheckDragLabels}
                  disabled={showExplanation}
                  className="px-6 py-2 rounded-xl bg-gold-600 text-white text-xs font-bold shadow"
                >
                  Verify Stages Order ✓
                </motion.button>
              </div>
            )}

            {/* Drag-sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      draggable
                      aria-label={`Sortable item ${displayIdx + 1}: ${item}. Drag to rearrange.`}
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center font-bold text-[10px]">
                          {displayIdx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                      <span className="text-slate-400" aria-hidden="true">⇅ Drag</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Verify Selection Order"
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2 rounded-xl bg-gold-600 text-white text-xs font-bold shadow"
                >
                  Verify Selection Order ✓
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
                    aria-label="Enter numeric CSR budget value in crore"
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter amount"
                    className="p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-bold w-48"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Submit numeric calculation"
                    onClick={handleNumericSubmit}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 rounded-xl bg-gold-600 text-white text-xs font-bold shadow"
                  >
                    Check Calculation ✓
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 italic">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Add part ${part}`}
                      onClick={() => handleAddConstructPart(part)}
                      className="px-3 py-1.5 rounded-xl bg-gold-700 text-white text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2" role="region" aria-label="Assembled hierarchy list">
                  {constructParts.map((p, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1 rounded-lg bg-gold-900/80 border border-gold-500 text-white text-xs flex items-center gap-1.5"
                    >
                      <span>{idx + 1}. {p}</span>
                      <button
                        onClick={() => handleRemoveConstructPart(idx)}
                        aria-label={`Remove part ${p}`}
                        className="text-rose-400 font-bold hover:text-rose-200"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click elements above in cascade order</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Verify hierarchy construction order"
                  onClick={handleConstructSubmit}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2 rounded-xl bg-gold-600 text-white text-xs font-bold shadow"
                >
                  Verify Hierarchy Construction ✓
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 rounded-2xl bg-amber-950/40 border border-amber-700/50 space-y-4"
              >
                <div className="flex items-center justify-between text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <span>💡 Step-by-Step Breakdown</span>
                  <span>Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}</span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-amber-200 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400">{idx + 1}. </span>
                        {sentence}{!sentence.endsWith('.') ? '.' : ''}
                      </motion.p>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      aria-label="Show next explanation step"
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 rounded-xl bg-amber-700 text-white text-xs font-bold shadow"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Advance to next challenge or profile"
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finish & View Profile →' : 'Next Challenge →'}
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
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          {/* Hero Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950/70 via-slate-900 to-gold-950/70 border border-emerald-500/30 text-center space-y-3">
            <span className="text-5xl" aria-hidden="true">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Management Simulation Mastered!</h2>
            <div className="flex justify-center gap-6 text-sm font-bold mt-2">
              <span className="text-emerald-400">✓ Final Score: {Math.max(0, 100 - errors * 5)}%</span>
              <span className="text-gold-400">Mastery Level: {masteryLevel.toUpperCase()}</span>
              <span className="text-slate-300">Errors: ✗ {errors}</span>
            </div>
            <p className="text-xs text-slate-400 max-w-lg mx-auto">
              {errors === 0
                ? 'PERFECT SCORE! You have mastered all classical and modern principles across the CISCE Class 12 Commerce syllabus.'
                : errors <= 3
                ? 'Great analytical execution! You demonstrated solid competency across strategic planning, organograms, and staffing pipelines.'
                : 'Good persistent effort. Review the specific misconceptions profile below to solidify your understanding.'}
            </p>
          </div>

          {/* VISIBLE SPACED REPETITION (SRS) SCHEDULE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-gradient-to-r from-gold-950/80 via-slate-900 to-purple-950/80 border-2 border-gold-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-gold-500/20 border border-gold-400/40 flex items-center justify-center text-3xl shadow-inner shrink-0">
                📅
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-gold-400">Spaced Repetition System</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-900/60 text-gold-200 border border-gold-700/50">SM-2 Algorithm</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Scheduled Retention Review
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Based on your error count ({errors} {errors === 1 ? 'error' : 'errors'}), optimal memory consolidation requires your next active retrieval session soon.
                </p>
              </div>
            </div>

            {/* SRS Action Badge */}
            <div className="shrink-0 flex flex-col items-center sm:items-end gap-1.5 p-4 rounded-2xl bg-slate-950/80 border border-gold-500/30">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Review Window</span>
              <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-amber-300 to-emerald-400 bg-clip-text text-transparent">
                Review in {srsDays} {srsDays === 1 ? 'day' : 'days'}
              </div>
              <span className="text-[10px] text-slate-400 font-medium">
                {errors === 0 ? 'Optimal mastery: 7-day reinforcement' : errors <= 3 ? 'Standard mastery: 3-day recall' : 'Needs reinforcement: 1-day recall'}
              </span>
            </div>
          </motion.div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 rounded-3xl bg-rose-950/40 border border-rose-800/60 space-y-4">
              <div className="flex items-center gap-2 text-rose-300 text-sm font-bold">
                <span aria-hidden="true">⚠️</span>
                <span>Diagnostic Misconceptions Profile</span>
              </div>
              <div className="space-y-3">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-4 rounded-2xl bg-slate-900/90 border border-rose-900/50 space-y-1">
                      <p className="text-xs font-bold text-rose-300">✗ Misconception: {m.misconception}</p>
                      <p className="text-xs font-medium text-emerald-300">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity Blueprint */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
              <span aria-hidden="true">🚀</span>
              <span>Capstone Project</span>
            </div>
            <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-2 mt-3">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-400">
                  <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-gold-300 shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating System Notifications */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Validated!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_CommerceComparisonTaylorFayolSim;
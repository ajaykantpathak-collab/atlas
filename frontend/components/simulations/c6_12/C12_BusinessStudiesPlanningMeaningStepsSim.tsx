'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst,
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC BUSINESS STUDIES CLASS 12 NODE CONSTANTS ───
const NODE_C12_BS_011 = 'c12_bs_011'; // Planning: Meaning, Steps, Importance, Limitations, Types of Plans
const NODE_C12_BS_012 = 'c12_bs_012'; // Organising: Meaning, Steps, Functional vs Divisional Structure
const NODE_C12_BS_013 = 'c12_bs_013'; // Formal vs Informal Organisation
const NODE_C12_BS_014 = 'c12_bs_014'; // Staffing: Meaning, Steps, Importance
const NODE_C12_BS_015 = 'c12_bs_015'; // Recruitment Sources & Selection Steps
const NODE_C12_BS_016 = 'c12_bs_016'; // Training: On-the-Job Methods
const NODE_C12_BS_017 = 'c12_bs_017'; // Training: Off-the-Job Methods
const NODE_C12_BS_018 = 'c12_bs_018'; // Directing & Supervision Functions
const NODE_C12_BS_019 = 'c12_bs_019'; // Motivation (Maslow) & Leadership Styles
const NODE_C12_BS_020 = 'c12_bs_020'; // Controlling, Planning-Control, Management by Exception

const ALL_NODE_IDS = [
  NODE_C12_BS_011,
  NODE_C12_BS_012,
  NODE_C12_BS_013,
  NODE_C12_BS_014,
  NODE_C12_BS_015,
  NODE_C12_BS_016,
  NODE_C12_BS_017,
  NODE_C12_BS_018,
  NODE_C12_BS_019,
  NODE_C12_BS_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Operation Nexon EV: The Turnaround of Tata Motors',
  intro:
    'You are appointed Chief Operations Strategist at Tata Motors Passenger Vehicles Division. Your mission is to steer the nationwide rollout of the Nexon EV while coordinating all five core functions of management: Planning, Organising, Staffing, Directing, and Controlling.',
  context:
    'From setting the ₹14-lakh price target and restructuring divisions to staffing the Sanand battery facility, motivating assembly workers, and controlling quality deviations through Management by Exception — your managerial decisions will determine whether Tata Motors dominates the Indian EV market.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question:
    'Tata Motors decides: "All assembly technicians must wear anti-static footwear before entering the EV battery cell room." How is this classified in the hierarchy of plans?',
  options: [
    'Policy — because it allows technicians discretion on what shoes to wear',
    'Rule — because it is a rigid mandate allowing zero personal discretion',
    'Strategy — because it sets the broad corporate direction for battery safety',
    'Procedure — because it explains the 10-step method to manufacture batteries',
  ],
  correctIndex: 1,
  hintAfter:
    'Rules are rigid mandates with zero discretion ("must wear"), whereas policies allow managerial discretion ("prefer local suppliers"). Let us explore how the complete management lifecycle functions!',
};

// ─── BRILLIANT.ORG STYLE OBSERVATION QUESTIONS ("WHAT DO YOU NOTICE?") ───
const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    prompt: 'What do you notice about the Staffing Funnel as candidates progress from Recruitment to Final Selection?',
    observableOptions: [
      'The applicant count remains constant at every single stage of the process',
      'The funnel systematically eliminates candidates at each filter, reducing a large pool (recruitment) into a select few (selection)',
      'The number of candidates increases as tests and interviews are administered',
      'Selection attracts new candidates while recruitment screens them out',
    ],
    correctIndex: 1,
    explanation:
      'Recruitment is a positive process that widens the candidate pool (+), whereas selection is a negative process that systematically screens out and eliminates applicants (-) until only qualified candidates remain.',
  },
  {
    id: 'obs_2',
    prompt: 'What do you notice when factory output falls within versus beyond the Management by Exception (MBE) 8% threshold?',
    observableOptions: [
      'Every minor fluctuation of even 1 litre triggers an urgent executive investigation',
      'Normal variations within the ±8% band are handled routinely, while only exceptional deviations beyond 8% trigger senior management intervention',
      'Management by Exception halts production permanently regardless of deviation magnitude',
      'Management by Exception only looks at financial profits, ignoring operational unit output',
    ],
    correctIndex: 1,
    explanation:
      'Management by Exception (MBE) filters out routine operational noise. Minor variances within tolerance are resolved on the shop floor, ensuring executive attention is preserved only for critical, exceptional deviations.',
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
  bloomLevel?: string;
}

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_bs_001',
    nodeId: NODE_C12_BS_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Which of the following is the primary and first function of management that sets the objectives and provides direction for all subsequent functions?',
    options: ['Controlling', 'Staffing', 'Planning', 'Organising'],
    correctIndex: 2,
    explanation:
      'Planning is the primary function of management. It bridges the gap between where the organisation is today and where it wants to be in the future, establishing objectives that all other functions work to achieve.',
    hints: [
      'Think about what must happen before people are hired or tasks are assigned.',
      'It answers: What do we want to achieve and how will we get there?',
      'The acronym POSDC starts with P for Planning.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bs_002',
    nodeId: NODE_C12_BS_011,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the 5 sequential steps of the planning process in the correct order:',
    sortItems: [
      'Setting objectives',
      'Identifying alternative courses of action',
      'Evaluating alternatives against feasibility and risk',
      'Selecting the best alternative',
      'Implementing the plan and follow-up',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      'The planning process begins with setting objectives (e.g., Jio targeting 100M subscribers), followed by identifying alternatives, evaluating them, selecting the optimal course, and finally implementing with follow-up action.',
    hints: [
      'You cannot evaluate alternatives before you have identified what the alternatives are.',
      'Objectives must always come first to establish a target.',
      'Follow-up and implementation is the final phase of planning.',
    ],
  },
  {
    id: 'ch_bs_003',
    nodeId: NODE_C12_BS_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Tata Motors states: "We prefer indigenously manufactured microchips where feasible." Asian Paints states: "No smoking inside the solvent storage yard under any circumstances." What are these two plan types?',
    options: [
      'Both are Rules because employees must follow them strictly',
      'First is Policy (allows discretion within boundaries); Second is Rule (rigid mandate with zero discretion)',
      'First is Rule; Second is Strategy',
      'First is Method; Second is Procedure',
    ],
    correctIndex: 1,
    explanation:
      'A policy is a general guideline permitting managerial judgement ("prefer local suppliers where feasible"), whereas a rule is an absolute mandate leaving zero room for discretion ("No smoking").',
    hints: [
      'Apply the discretion test: Does the statement allow the manager to use personal judgement?',
      '"Where feasible" implies judgement (Policy); "Under any circumstances" implies zero exception (Rule).',
      'Policy provides a flexible boundary, while Rule is rigid.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bs_004',
    nodeId: NODE_C12_BS_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'ITC Limited has 5 standalone business heads: FMCG (Aashirvaad/Sunfeast), Hotels, Paperboards, Agri-Business, and Packaging. Each head has dedicated sales, production, and finance teams with separate profit-and-loss accountability. Which structure is this?',
    options: [
      'Functional Structure — because each unit carries out functions like sales and finance',
      'Divisional Structure by Product/Business — because departments are grouped by distinct product categories',
      'Matrix Structure solely based on geography',
      'Informal Organisation network',
    ],
    correctIndex: 1,
    explanation:
      'ITC uses a Divisional Structure by product/business. Top-level departmentalisation is based on product categories, and each division operates as a self-contained profit center with its own functional teams.',
    hints: [
      'Look at the top-level basis of grouping: Is it by function (like Asian Paints) or by product lines (like ITC)?',
      'The presence of separate profit-and-loss accounts per product division indicates a divisional structure.',
      'Divisional structure groups all activities required for a specific product under one divisional head.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_bs_005',
    nodeId: NODE_C12_BS_012,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Drag each organizational role into the correct hierarchy tier for Asian Paints (Functional Structure):',
    dragItems: [
      { label: 'Managing Director & CEO', targetId: 'org_apex' },
      { label: 'Head of Manufacturing', targetId: 'org_func_1' },
      { label: 'Head of Sales & Marketing', targetId: 'org_func_2' },
      { label: 'Head of R&D Formulation', targetId: 'org_func_3' },
    ],
    correctMapping: {
      org_apex: 'Managing Director & CEO',
      org_func_1: 'Head of Manufacturing',
      org_func_2: 'Head of Sales & Marketing',
      org_func_3: 'Head of R&D Formulation',
    },
    explanation:
      'In a functional structure, the Managing Director sits at the apex, while specialized functional heads (Manufacturing, Sales & Marketing, R&D) report directly to the MD, overseeing company-wide functional activities without duplication.',
    hints: [
      'The apex position is held by the chief executive officer.',
      'Functional heads are peer departments reporting to top management.',
      'Manufacturing, Sales, and R&D are core business functions.',
    ],
  },
  {
    id: 'ch_bs_006',
    nodeId: NODE_C12_BS_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'At TCS, junior engineers across different project lines meet during weekend Maitree cricket matches and help each other debug complex code off the record. How is this interaction classified?',
    options: [
      'An illegal violation of formal reporting lines that must be penalized',
      'Informal Organisation — spontaneous social network that fills communication gaps and enhances morale',
      'Formal Divisional hierarchy',
      'Scalar chain escalation procedure',
    ],
    correctIndex: 1,
    explanation:
      'The informal organisation consists of spontaneous social relationships that arise naturally among employees. Rather than being harmful, it provides social support, fosters esprit de corps, and aids rapid problem-solving.',
    hints: [
      'Is this social network deliberately printed on the company org chart, or does it emerge naturally?',
      'Informal organisations arise from human sociability and mutual trust.',
      'The grapevine and informal networks coexist with formal hierarchies in every healthy enterprise.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bs_007',
    nodeId: NODE_C12_BS_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Why is staffing defined as a continuous management function rather than a one-time setup activity?',
    options: [
      'Because Indian labour laws require fresh employment tests every month',
      'Because employee retirements, resignations, promotions, transfers, expansions, and tech disruptions create perpetual talent needs',
      'Because companies must dismiss all workers annually to reduce provident fund liabilities',
      'Because organizing structure changes daily',
    ],
    correctIndex: 1,
    explanation:
      'Staffing is continuous because workforces are dynamic. Attrition, retirements, business diversification, and technological advancements (such as EV and AI skills) require ongoing workforce planning and talent acquisition.',
    hints: [
      'Does a company ever reach a point where no employee ever leaves or needs new skills?',
      'Think of Indian IT firms hiring tens of thousands of engineers annually to manage 20% attrition.',
      'Staffing continues for the entire lifetime of the enterprise.',
    ],
  },
  {
    id: 'ch_bs_008',
    nodeId: NODE_C12_BS_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'When Infosys assigns a fresh engineer to the Cloud Practice in Pune, that is [X]. When the engineer attends the 14-week induction at Mysuru learning company values, code of conduct, and culture, that is [Y]. Identify X and Y:',
    options: [
      'X = Placement; Y = Orientation (Induction)',
      'X = Recruitment; Y = Selection',
      'X = Orientation; Y = Placement',
      'X = Apprenticeship; Y = Job Rotation',
    ],
    correctIndex: 0,
    explanation:
      'Placement is the act of putting the selected person in a specific job position. Orientation (induction) is the structured process of familiarising the new hire with the organisation’s culture, policies, and colleagues.',
    hints: [
      'Placement is "where you go"; Orientation is "how you fit into the culture".',
      'Induction programmes introduce candidates to company history, ethics, and practices.',
      'Assigning a seat and department is placement.',
    ],
  },
  {
    id: 'ch_bs_009',
    nodeId: NODE_C12_BS_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Why is recruitment termed a "positive process" while selection is termed a "negative process" in business studies?',
    options: [
      'Recruitment brings happy news to workers, while selection brings harsh interviews',
      'Recruitment widens the candidate pool (adding applicants without rejection); selection narrows the pool by eliminating unsuitable candidates',
      'Recruitment is legally mandated, whereas selection is prohibited under Companies Act 2013',
      'Recruitment tests technical skills, while selection only tests physical endurance',
    ],
    correctIndex: 1,
    explanation:
      'Recruitment is positive because it attracts and adds applicants to the talent pool. Selection is negative because it systematically screens out and eliminates applicants (e.g., SBI PO rejecting 99.85% of applicants) until only the best remain.',
    hints: [
      'Think of math: positive adds (+), negative subtracts (-).',
      'Recruitment stimulates candidates to apply (widening the funnel).',
      'Selection eliminates unsuitable candidates step-by-step (narrowing the funnel).',
    ],
  },
  {
    id: 'ch_bs_010',
    nodeId: NODE_C12_BS_015,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Arrange the 5 sequential steps of the Selection Process for an SBI Probationary Officer:',
    sortItems: [
      'Preliminary Screening of application forms',
      'Selection Tests (Aptitude, Reasoning, Banking Awareness)',
      'Employment Interview (Technical & Behavioural)',
      'Reference and Background Check (CIBIL & University Verification)',
      'Final Selection Decision and Job Offer',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      'Selection begins with Preliminary Screening on paper, followed by standardized Selection Tests, Employment Interviews, Reference/Background verification, and the final Selection Decision.',
    hints: [
      'Interview cannot happen before paper screening eliminates unqualified applications.',
      'Reference and background checks are conducted after the candidate succeeds in the interview.',
      'The job offer is the final step of selection.',
    ],
  },
  {
    id: 'ch_bs_011',
    nodeId: NODE_C12_BS_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Maruti Suzuki shifts assembly technicians from the Welding station to the Paint shop, and then to the Interior Trim line every 6 months to develop multi-skilled versatility. Which on-the-job training method is this?',
    options: ['Vestibule Training', 'Job Rotation', 'Apprenticeship under 1961 Act', 'Case Study Method'],
    correctIndex: 1,
    explanation:
      'Job Rotation is the systematic movement of employees across different jobs of similar level to broaden their skills, alleviate monotony, and create a flexible workforce that can cover absenteeism.',
    hints: [
      'The worker is being moved systematically across stations.',
      'It builds multi-skilling without changing organizational hierarchy rank.',
      'The name contains the concept of rotating positions.',
    ],
  },
  {
    id: 'ch_bs_012',
    nodeId: NODE_C12_BS_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Tata Motors engages 5,000 ITI diploma holders at Pune under the Apprentices Act 1961 with government-subsidized stipends (NAPS 25% subsidy). What primarily distinguishes Apprenticeship from an informal Internship?',
    options: [
      'Apprenticeship is a statutory earn-while-you-learn trade program with prescribed stipends and national certification, whereas internship is an academic/institutional MoU arrangement',
      'Apprenticeship is entirely off-the-job classroom study with no plant floor presence',
      'Internships are legally binding for life, while apprenticeships last 2 days',
      'Apprenticeship never pays any stipend to candidates',
    ],
    correctIndex: 0,
    explanation:
      'Apprenticeship is regulated by the Apprentices Act 1961 (amended 2014) requiring designated stipends and awarding a recognized National Apprenticeship Certificate, whereas internships are institutional arrangements without a dedicated central statute.',
    hints: [
      'Look for the statutory backing under central legislation.',
      'Apprentices earn a prescribed stipend and receive a National Apprenticeship Certificate.',
      'Internships are typically university-driven practical training.',
    ],
  },
  {
    id: 'ch_bs_013',
    nodeId: NODE_C12_BS_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'State Bank of India trains new branch cashiers at SBILD Hyderabad using dummy software counters with real cash counting machines and CBS terminals before posting them to live branches. Why is this classified as Off-the-Job training?',
    options: [
      'Because it is located in a dedicated training centre using dummy accounts with zero risk to live customers, separating learning from real production',
      'Because bank tellers never do real work',
      'Because cash counting is an informal social activity',
      'Because it is done completely online at home without equipment',
    ],
    correctIndex: 0,
    explanation:
      'Vestibule training is off-the-job because it takes place in a separate simulated facility away from the live workplace. Even though the machinery and software duplicate the real environment, mistakes occur on dummy accounts with zero financial loss.',
    hints: [
      'The test for on-the-job vs off-the-job is LOCATION and separation from actual live production.',
      'Are real customer accounts being credited or debited during the practice?',
      'Vestibule means an antechamber or simulated environment before entering live operations.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_bs_014',
    nodeId: NODE_C12_BS_017,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Wipro sales trainees enact a simulated pitch to a sceptical corporate CIO, receiving critique on negotiation tactics. IIM Ahmedabad students analyse 20 pages of the Tata Nano market entry. Identify these two methods:',
    options: [
      'First = Role Play; Second = Case Study Method',
      'First = Vestibule; Second = Lecture Method',
      'First = Internship; Second = Job Rotation',
      'First = Conference; Second = Apprenticeship',
    ],
    correctIndex: 0,
    explanation:
      'Enacting realistic workplace interactions (salesperson vs client) with peer feedback is Role Play. Analysing a real-world business dilemma from written narratives is the Case Study method.',
    hints: [
      'Enacting roles develops interpersonal and negotiation skills.',
      'Analysing written historical business decisions develops analytical judgment.',
      'Harvard and IIMs are famous for case study discussions.',
    ],
  },
  {
    id: 'ch_bs_015',
    nodeId: NODE_C12_BS_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Which function of management converts organizational plans and staffing preparations into active motion by guiding, instructing, motivating, and leading personnel?',
    options: ['Controlling', 'Directing', 'Organising', 'Auditing'],
    correctIndex: 1,
    explanation:
      'Directing is the executive heart of management that initiates action. While planning and organizing prepare the setup and staffing puts people in place, directing guides and energizes them to work.',
    hints: [
      'Planning loads the rifle; this function pulls the trigger.',
      'It contains supervision, communication, leadership, and motivation.',
      'It translates intention into operational motion.',
    ],
  },
  {
    id: 'ch_bs_016',
    nodeId: NODE_C12_BS_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'A shop-floor supervisor at Maruti Suzuki Manesar explains the dashboard torque sequence to a recruit, checks cycle times on the digital display, enforces safety helmet rules, and files the shift defect report. Which supervisor functions are being executed?',
    options: [
      'Only "issuing instructions"',
      'All 4 functions: Issuing instructions, Guiding & clarifying, Monitoring performance, and Maintaining discipline/Reporting',
      'Only strategic corporate planning',
      'Only external customer marketing',
    ],
    correctIndex: 1,
    explanation:
      'A supervisor does far more than give orders. The four complete functions are: (1) Issuing instructions, (2) Guiding/demonstrating technique, (3) Monitoring real-time performance, and (4) Enforcing shop-floor discipline and reporting to middle management.',
    hints: [
      'Look at all the activities listed in the prompt.',
      'Guiding a recruit + checking cycle times + enforcing safety + filing reports = full supervision spectrum.',
      'Supervisors act as the critical operational bridge between workers and middle management.',
    ],
  },
  {
    id: 'ch_bs_017',
    nodeId: NODE_C12_BS_019,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: "Arrange Maslow's 5 Need Hierarchy levels in the strict bottom-to-top order of emergence:",
    sortItems: [
      '1. Physiological Needs (Subsidized canteen food, living wages, clean water)',
      '2. Safety Needs (Job security, ESI medical insurance, protective gear)',
      '3. Social Needs (Workplace friendships, team camaraderie, Diwali celebrations)',
      '4. Esteem Needs (Employee of the Month award, title recognition, status)',
      '5. Self-Actualisation Needs (Leave-to-Learn sabbatical, challenging innovation projects)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      'Maslow established that needs dominate motivation in sequential order from fundamental survival to highest potential: Physiological → Safety → Social → Esteem → Self-Actualisation.',
    hints: [
      'Mnemonic: "Please Send Someone Else Soon".',
      'Physiological survival comes first; you cannot feel motivated by prestige awards if basic food is missing.',
      'Self-Actualisation represents reaching one’s ultimate creative potential.',
    ],
  },
  {
    id: 'ch_bs_018',
    nodeId: NODE_C12_BS_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question:
      'Mukesh Ambani executed the ₹2-lakh-crore Jio launch with centralized, swift top-down directives without consulting grassroots staff. Narayana Murthy decided Infosys NASDAQ listing through Executive Council consensus. How are these two leadership styles classified?',
    options: [
      'Ambani = Autocratic (decisive top-down command); Murthy = Democratic/Participative (consensus-driven consultation)',
      'Ambani = Laissez-faire; Murthy = Autocratic',
      'Both are Laissez-faire because both companies succeeded',
      'Ambani = Democratic; Murthy = Transformational solely',
    ],
    correctIndex: 0,
    explanation:
      'Autocratic leadership centralizes decision authority for maximum speed and clear direction (Ambani at Jio). Democratic leadership involves team consultation before deciding (Murthy at Infosys). Style is determined by where authority sits, not by outcome.',
    hints: [
      'Apply the decision test: Who made the call — leader alone, or leader after consulting team?',
      'Autocratic is not a bad word; it is ideal for rapid, capital-intensive crisis executions.',
      'Democratic builds consensus and deep employee ownership.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_bs_019',
    nodeId: NODE_C12_BS_020,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Asian Paints sets a daily target of 50,000 litres. Its Management by Exception (MBE) policy states that only deviations EXCEEDING 8% trigger formal investigation. What is the minimum drop in litres (deviation) required to trigger a plant manager investigation?',
    correctAnswer: 4000,
    tolerance: 50,
    unit: 'litres',
    explanation:
      '50,000 litres × 8% = 4,000 litres deviation. Under Management by Exception, output falling below 46,000 litres (a drop greater than 4,000 litres) prompts an investigation, preventing managers from wasting time on trivial minor fluctuations.',
    hints: [
      'Calculate 8% of the 50,000 litre standard.',
      '50,000 × 0.08 = ?',
      'The answer is 4,000 litres.',
    ],
  },
  {
    id: 'ch_bs_020',
    nodeId: NODE_C12_BS_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Why are Planning and Controlling termed "two sides of the same coin" forming a circular loop rather than a linear chain with an end?',
    options: [
      'Planning sets the target standards that controlling measures against, and controlling deviations feed back into revising future plans',
      'Because both functions are carried out by the Registrar of Companies under Section 134',
      'Because they occur on the exact same date every month with no other functions in between',
      'Because controlling eliminates all future need for planning',
    ],
    correctIndex: 0,
    explanation:
      'Planning is forward-looking (setting standards), while controlling is backward-looking (measuring performance against standards). Controlling findings feed back into planning to revise unrealistic targets or processes, closing the loop.',
    hints: [
      'Without planning, controlling has no standards to measure against.',
      'Without controlling, planning cannot know if goals were achieved.',
      'Feedback loops make management an ongoing continuous circle.',
    ],
  },
  {
    id: 'ch_bs_021',
    nodeId: NODE_C12_BS_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'In March 2020, Yes Bank collapsed with ₹17,000+ crore bad loans because credit appraisal standards were ignored and rising NPAs went unchecked until RBI imposed Prompt Corrective Action (PCA). What does this failure demonstrate about Controlling?',
    options: [
      'Controlling is only optional for financial institutions',
      'Absent or delayed controlling allows unmonitored deviations to compound into catastrophic failure; timely corrective action is indispensable',
      'Controlling creates excessive rigidity and should be banned in banking',
      'Staffing is solely responsible for loan defaults',
    ],
    correctIndex: 1,
    explanation:
      'The Yes Bank crisis highlights the critical importance of controlling. Standards existed on paper, but deviation comparison and corrective action failed, allowing bad loans to accumulate until external statutory intervention occurred.',
    hints: [
      'Look at what happens when deviations are ignored over years.',
      'Controlling ensures deviations are caught early before they destroy the business.',
      'The Prompt Corrective Action (PCA) framework is controlling at the national banking level.',
    ],
  },
  {
    id: 'ch_bs_022',
    nodeId: NODE_C12_BS_011,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'Assemble the five universal POSDC management functions in proper continuous cyclical sequence to launch the next Tata Electric Truck:',
    availableParts: ['Planning', 'Organising', 'Staffing', 'Directing', 'Controlling'],
    targetState: 'Planning Organising Staffing Directing Controlling',
    validationHint: 'Add the 5 functions in order from first preparatory function to the feedback function.',
    explanation:
      'The POSDC framework: Planning sets objectives → Organising builds structures → Staffing acquires talent → Directing triggers execution → Controlling measures performance & feeds back to Planning.',
    hints: [
      'Start with setting objectives (Planning).',
      'Build the structure (Organising) and hire talent (Staffing).',
      'Direct the execution and close the loop with Controlling.',
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
  nodeId: NODE_C12_BS_011,
  title: 'Management Functions: Planning to Controlling in Indian Enterprise',
  definition:
    'Management is a systematic, continuous process of five universal functions: Planning (setting objectives and actions), Organising (grouping tasks and authority), Staffing (filling positions with competent human resources), Directing (guiding, motivating, and leading people), and Controlling (measuring actuals against standards and taking corrective action).',
  eli5:
    'Think of building a winning cricket franchise. Planning is picking the match strategy; Organising is setting the batting order and fielding positions; Staffing is drafting and training top players; Directing is the captain rallying the team on the field; Controlling is checking the run-rate and adjusting tactics at the drinks break!',
  misconceptions: [
    {
      misconception: 'Policy and Rule are the same because employees must follow both.',
      correction:
        'A policy allows managerial discretion within general boundaries ("prefer local suppliers"), while a rule is a rigid mandate allowing zero discretion ("no smoking in chemical storage").',
    },
    {
      misconception: 'Informal organisation is harmful and should be banned by management memos.',
      correction:
        'Informal networks emerge naturally from human sociability. Wise managers channel them (like TCS Maitree) for morale, rapid problem-solving, and cross-departmental collaboration.',
    },
    {
      misconception: 'Divisional structure is always superior to functional structure.',
      correction:
        'Functional structure is cost-efficient and ideal for single-product companies (Asian Paints), whereas divisional structure is best suited for diversified conglomerates (ITC, HUL) despite resource duplication.',
    },
    {
      misconception: 'Vestibule training is on-the-job because it uses the same machinery.',
      correction:
        'Vestibule training is off-the-job because it takes place in a dedicated simulation centre with dummy transactions, separated from live factory or customer operations.',
    },
    {
      misconception: 'Autocratic leadership is bad and never succeeds in modern industry.',
      correction:
        'Autocratic leadership is effective in high-speed, capital-intensive rollouts (Reliance Jio ₹2 lakh crore launch) where decisive speed is paramount.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which step comes first in the 5-step Planning process?',
      options: ['Identifying alternatives', 'Setting objectives', 'Evaluating risk', 'Follow-up'],
      correctIndex: 1,
    },
    {
      question: 'Asian Paints grouping by Manufacturing, Sales, R&D, and Finance is an example of:',
      options: ['Divisional structure', 'Functional structure', 'Informal network', 'Matrix by country'],
      correctIndex: 1,
    },
    {
      question: 'Why is recruitment called a positive process?',
      options: ['It rejects nobody and widens applicant pool', 'It offers high salaries', 'It uses written tests', 'It is fast'],
      correctIndex: 0,
    },
    {
      question: 'Under Maslow’s theory, what need is addressed by subsidized ₹15 canteen meals?',
      options: ['Self-actualisation', 'Esteem', 'Physiological', 'Social'],
      correctIndex: 2,
    },
    {
      question: 'Management by Exception (MBE) states that managers should investigate:',
      options: ['Every minor 0.1% variance', 'Only significant deviations beyond tolerance', 'No deviations ever', 'Only positive sales'],
      correctIndex: 1,
    },
    {
      question: 'Which training method rotates assembly operators across welding, paint, and trim?',
      options: ['Job rotation', 'Vestibule', 'Case study', 'Apprenticeship statutory'],
      correctIndex: 0,
    },
    {
      question: 'The Prompt Corrective Action (PCA) framework by RBI is a national-level example of:',
      options: ['Planning', 'Controlling', 'Recruitment', 'Organising'],
      correctIndex: 1,
    },
    {
      question: 'Which of the following describes a Rule?',
      options: ['Encouraging eco-friendly materials', 'Zero entry without safety helmet', 'Aiming for 20% growth', '5-year corporate vision'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Student demonstrates 80%+ mastery across Planning, Organising, Staffing, Directing, and Controlling, correctly solving multi-level real-world Indian business scenarios.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Hierarchy of Plans (Tata EV Strategy)',
    instruction: 'Adjust the EV Investment Slider to see how Objectives cascade into Strategy, Budgets, and Rules in real-time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_BS_011,
  },
  {
    title: '2. Functional vs Divisional Org Architecture',
    instruction: 'Toggle between Asian Paints (Functional) and ITC Limited (Divisional) to explore resource allocation and command lines.',
    interactionType: 'toggle-structure',
    nodeId: NODE_C12_BS_012,
  },
  {
    title: '3. The Staffing Funnel (SBI / Infosys Hiring)',
    instruction: 'Drag applicant volume and observe the conversion from Recruitment (positive pool) to Selection (negative filter).',
    interactionType: 'slider-funnel',
    nodeId: NODE_C12_BS_014,
  },
  {
    title: '4. Directing: Maslow’s Hierarchy & Leadership Wheel',
    instruction: 'Click each tier of Maslow’s pyramid to activate workplace policies and see employee productivity surges.',
    interactionType: 'click-pyramid',
    nodeId: NODE_C12_BS_019,
  },
  {
    title: '5. Controlling: Management by Exception (MBE)',
    instruction: 'Simulate factory output and test how the 8% MBE threshold filters signal from normal operational noise.',
    interactionType: 'slider-controlling',
    nodeId: NODE_C12_BS_020,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: If Tata Motors shifts from a Functional Structure to a Product Divisional Structure (Passenger EVs vs Commercial Trucks), what happens to departmental cost duplication?',
    options: [
      'Resource duplication INCREASES because each division needs separate marketing, HR, and finance teams',
      'Resource duplication DECREASES to zero',
      'No change in costs whatsoever',
      'Marketing departments are banned by law',
    ],
    correctIndex: 0,
    verifyInstruction: 'Toggle the structure visual in the sandbox to observe how each division duplicates functional teams!',
    nodeId: NODE_C12_BS_012,
  },
  {
    question:
      'Predict: If a company offers an "Employee of the Month" trophy (Esteem need) to factory workers who lack drinking water and sanitary restrooms (Physiological needs), will productivity rise sustainably?',
    options: [
      'Yes, esteem awards fully compensate for missing physical needs',
      'No, because lower-order unmet needs dominate attention and block higher-order motivation',
      'Yes, trophies reduce physical hunger',
      'Productivity increases by 1000%',
    ],
    correctIndex: 1,
    verifyInstruction: 'Click the Maslow pyramid simulator to see why lower physiological needs must be fulfilled first!',
    nodeId: NODE_C12_BS_019,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Executive Boardroom Challenge: Launching Reliance Green Hydrogen',
  description:
    'You are drafting the 5-function operational charter for Reliance Industries’ ₹75,000-crore Jamnagar Green Energy Giga-Complex. Execute these steps:',
  steps: [
    '1. Planning: Formulate 1 quantitative Objective (e.g. 20 GW solar electrolyser capacity by 2030) and 1 strict Safety Rule.',
    '2. Organising: Choose between Functional vs Divisional structure for Green Hydrogen vs Solar PV and justify resource duplication.',
    '3. Staffing: Outline external campus drives for 2,000 chemical engineers and calculate apprenticeship ratios under Apprentices Act 1961.',
    '4. Directing: Select a Leadership Style for the initial fast-track plant rollout and structure Maslow-based retention incentives.',
    '5. Controlling: Establish a Management by Exception threshold (e.g. ±5% electrolyser efficiency variance) and outline corrective action.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C12_BusinessStudiesPlanningMeaningStepsSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['business_studies'] || {
    name: 'Business Studies',
    emoji: '🏢',
    color: 'emerald',
  };

  // Phase navigation state
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery & observation state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);

  // Observation questions state (Brilliant.org pattern)
  const [currentObsIndex, setCurrentObsIndex] = useState(0);
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});
  const [obsShowResult, setObsShowResult] = useState<Record<number, boolean>>({});

  // Live simulation variables (Sliders & Controls)
  const [evBudget, setEvBudget] = useState<number>(2500); // in Crores
  const [selectedOrgStructure, setSelectedOrgStructure] = useState<'functional' | 'divisional'>('functional');
  const [applicantCount, setApplicantCount] = useState<number>(10000);
  const [activeMaslowLevel, setActiveMaslowLevel] = useState<number>(1);
  const [factoryOutput, setFactoryOutput] = useState<number>(48000); // Standard is 50,000
  const [mbeTolerance, setMbeTolerance] = useState<number>(8); // 8%

  // Adaptive mastery & evaluation state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Escalating hints and progressive disclosure state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Non-MCQ challenge interactive states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [lastSelectedOption, setLastSelectedOption] = useState<number | null>(null);

  // Feedback animations state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Canvas visual loop ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Derived filtered challenges based on BKT adaptive tier
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C12_BS_011);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adapt difficulty whenever score breakdown updates
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Clean inactivity timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── 2D CANVAS ANIMATION (Shop-floor production pulse) ───
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
      // Background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Sine wave pulse representing continuous assembly output
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x + frame * 2) * 0.05) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Station node markers
      const stations = ['Plan', 'Org', 'Staff', 'Direct', 'Control'];
      stations.forEach((st, idx) => {
        const posX = 40 + idx * 60;
        const posY = canvas.height / 2 + Math.sin((posX + frame * 2) * 0.05) * 12;
        ctx.fillStyle = idx === activeMaslowLevel - 1 ? '#38bdf8' : '#64748b';
        ctx.beginPath();
        ctx.arc(posX, posY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '9px sans-serif';
        ctx.fillText(st, posX - 12, posY - 10);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeMaslowLevel]);

  // ─── USECALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints && activeChallenge.hints[nextLevel - 1]) {
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(
      isCorr ? 'Brilliant analysis! You understood the distinction.' : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive management laboratory. Let us explore step by step.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Test any managerial variable freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Entering challenge assessment. Good luck!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the visual simulation to verify.');
  }, []);

  const handleBudgetChange = useCallback((val: number) => {
    setEvBudget(val);
    audioManager.play('count');
  }, []);

  const handleOrgToggle = useCallback((struct: 'functional' | 'divisional') => {
    setSelectedOrgStructure(struct);
    audioManager.play('tap');
    speechManager.speak(
      struct === 'functional'
        ? 'Asian Paints style: High specialisation, zero resource duplication.'
        : 'ITC / HUL style: Multi-product focus with separate profit centres.'
    );
  }, []);

  const handleApplicantSlider = useCallback((val: number) => {
    setApplicantCount(val);
    audioManager.play('count');
  }, []);

  const handleMaslowClick = useCallback((lvl: number) => {
    setActiveMaslowLevel(lvl);
    audioManager.play('pop');
    const msgs: Record<number, string> = {
      1: 'Level 1 Physiological: ₹15 full canteen meal and clean water provided.',
      2: 'Level 2 Safety: ESI medical cards and protective shop-floor gear distributed.',
      3: 'Level 3 Social: Team Diwali lunches and inter-shift sports festivals active.',
      4: 'Level 4 Esteem: Employee of the Month award and title recognition given.',
      5: 'Level 5 Self-Actualisation: Leave-to-learn sabbatical and EV innovation labs unlocked.',
    };
    speechManager.speak(msgs[lvl] || '');
  }, []);

  const handleOutputChange = useCallback((val: number) => {
    setFactoryOutput(val);
    audioManager.play('balance');
  }, []);

  const handleObsOptionSelect = useCallback((qIdx: number, optIdx: number) => {
    setObsAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
    setObsShowResult((prev) => ({ ...prev, [qIdx]: true }));
    const isCorrect = optIdx === OBSERVATION_QUESTIONS[qIdx].correctIndex;
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Spot on observation! That is the core takeaway.');
    } else {
      audioManager.play('pop');
      speechManager.speak('Take another close look at the visualization.');
    }
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You completed the management simulation with a score of ${finalScore} percent.`);
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
    setLastSelectedOption(null);
    setWrongShake(false);
    setWrongFlash(false);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (
        activeChallenge.type === 'classify' ||
        activeChallenge.type === 'distinguish' ||
        activeChallenge.type === 'match'
      ) {
        setLastSelectedOption(answer as number);
        isCorrect = answer === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect =
          Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (activeChallenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding business judgment.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (
          activeChallenge.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(activeChallenge.misconceptionIndex)
        ) {
          setHitMisconceptions((prev) => [...prev, activeChallenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the complete step-by-step rationale together.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, activeChallenge]
  );

  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        let arr = prev.length === activeChallenge.sortItems?.length ? [...prev] : activeChallenge.sortItems?.map((_, i) => i) || [];
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    },
    [activeChallenge]
  );

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0
        ? sortArrangement
        : activeChallenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  // Derived Controlling Variance Calculation
  const controllingAnalysis = useMemo(() => {
    const standard = 50000;
    const deviation = standard - factoryOutput;
    const devPercentage = ((deviation / standard) * 100);
    const triggersMBE = devPercentage > mbeTolerance;
    return { standard, deviation, devPercentage: Number(devPercentage.toFixed(2)), triggersMBE };
  }, [factoryOutput, mbeTolerance]);

  // Derived Staffing Funnel Numbers
  const staffingFunnelData = useMemo(() => {
    const screened = Math.round(applicantCount * 0.4);
    const tested = Math.round(screened * 0.25);
    const interviewed = Math.round(tested * 0.2);
    const verified = Math.round(interviewed * 0.8);
    const hired = Math.round(verified * 0.5);
    return [
      { stage: 'Recruited', count: applicantCount },
      { stage: 'Screened', count: screened },
      { stage: 'Tested', count: tested },
      { stage: 'Interviewed', count: interviewed },
      { stage: 'Verified', count: verified },
      { stage: 'Hired', count: hired },
    ];
  }, [applicantCount]);

  // Calculated SRS Interval based on performance
  const srsReviewDays = errors === 0 ? 7 : errors <= 3 ? 3 : 1;
  const srsTargetDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + srsReviewDays);
    return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  }, [srsReviewDays]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Class 12 ISC Business Studies • POSDC Integrated Laboratory
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            key={phase}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-emerald-400 uppercase tracking-wider"
          >
            Phase: {phase}
          </motion.div>
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                  : difficulty === 'advanced'
                  ? 'bg-rose-950 text-rose-300 border-rose-600'
                  : 'bg-indigo-950 text-indigo-300 border-indigo-600'
              }`}
            >
              {difficulty} Tier
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-emerald-950/50 to-slate-900 rounded-2xl border border-emerald-800/40 shadow-xl">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold tracking-wide">
              CASE SCENARIO HOOK
            </span>
            <h2 className="text-xl font-bold text-white mt-3">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-3 italic border-l-2 border-emerald-500 pl-3">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-2">
              Intuitive Discovery Puzzle (Ungraded Hook)
            </h3>
            <p className="text-base text-white font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                      : 'bg-slate-850 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt}</span>
                    {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex && (
                      <span className="text-emerald-400 font-bold">✓ Rule (Zero Discretion)</span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <p className="text-sm text-slate-300">
                  {discoveryCorrect
                    ? '🎉 Superb intuition! You spotted that "must" removes all personal discretion.'
                    : '💡 ' + DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/30 whitespace-nowrap"
                >
                  Enter Interactive Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. GUIDED INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-emerald-400">Step-by-Step Discovery</span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Module {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <span>👉 Action:</span> {EXPLORATION_STEPS[currentSlide].instruction}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="p-5 sm:p-6 bg-slate-900 rounded-2xl border border-slate-800 min-h-[380px]"
            >
              {/* SLIDE 0: Planning Hierarchy */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <label className="text-xs font-bold text-slate-400 block mb-2">
                        Adjust EV Project Capital Budget:
                      </label>
                      <input
                        type="range"
                        min={1000}
                        max={5000}
                        step={250}
                        value={evBudget}
                        onChange={(e) => handleBudgetChange(Number(e.target.value))}
                        aria-label="Adjust EV Budget"
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                      <div className="mt-2 text-right text-sm font-extrabold text-emerald-400">
                        ₹{evBudget} Crore Allocated
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 col-span-2">
                      <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">
                        Cascading Hierarchy of Plans Generated:
                      </h4>
                      <ul className="text-xs space-y-1.5 text-slate-300">
                        <li>
                          <strong className="text-emerald-400">Objective:</strong> Deploy{' '}
                          {Math.round(evBudget * 40)} fast-charging stations across 100 Indian highways by 2026.
                        </li>
                        <li>
                          <strong className="text-indigo-400">Strategy:</strong> Build dedicated EV skateboard
                          platforms with localized battery cells.
                        </li>
                        <li>
                          <strong className="text-amber-400">Policy:</strong> Prefer indigenous Tier-1 auto-ancillary
                          vendors where feasible (managerial discretion).
                        </li>
                        <li>
                          <strong className="text-rose-400">Rule:</strong> Zero entry to battery dry-room without
                          safety ESD boots (zero discretion).
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* SVG Planning Hierarchy Visual */}
                  <svg viewBox="0 0 600 180" className="w-full h-44 bg-slate-950 rounded-xl border border-slate-800">
                    <rect x="220" y="10" width="160" height="32" rx="8" fill="#065f46" stroke="#10b981" />
                    <text x="300" y="30" textAnchor="middle" fill="#ecfdf5" fontSize="11" fontWeight="bold">
                      1. Objectives (Top Goal)
                    </text>
                    <line x1="300" y1="42" x2="300" y2="60" stroke="#64748b" strokeWidth="2" />

                    <rect x="200" y="60" width="200" height="32" rx="8" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="300" y="80" textAnchor="middle" fill="#e0e7ff" fontSize="11" fontWeight="bold">
                      2. Strategy & Policies (Broad)
                    </text>
                    <line x1="300" y1="92" x2="300" y2="110" stroke="#64748b" strokeWidth="2" />

                    <rect x="100" y="110" width="180" height="36" rx="8" fill="#451a03" stroke="#f59e0b" />
                    <text x="190" y="132" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">
                      3. Procedures & Methods
                    </text>

                    <rect x="320" y="110" width="180" height="36" rx="8" fill="#4c0519" stroke="#f43f5e" />
                    <text x="410" y="132" textAnchor="middle" fill="#ffe4e6" fontSize="10" fontWeight="bold">
                      4. Rules & Budgets (Specific)
                    </text>
                  </svg>
                </div>
              )}

              {/* SLIDE 1: Organising Structures */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex justify-center gap-4 mb-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleOrgToggle('functional')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedOrgStructure === 'functional'
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      Functional (Asian Paints / Maruti)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleOrgToggle('divisional')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedOrgStructure === 'divisional'
                          ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      Divisional (HUL / ITC / Tata Motors)
                    </motion.button>
                  </div>

                  {/* SVG Architecture Diagram */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    {selectedOrgStructure === 'functional' ? (
                      <svg viewBox="0 0 600 200" className="w-full h-48">
                        <rect x="230" y="10" width="140" height="36" rx="8" fill="#047857" stroke="#10b981" />
                        <text x="300" y="32" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">
                          Managing Director
                        </text>

                        <line x1="300" y1="46" x2="300" y2="75" stroke="#64748b" strokeWidth="2" />
                        <line x1="80" y1="75" x2="520" y2="75" stroke="#64748b" strokeWidth="2" />

                        {[
                          { name: 'Manufacturing', x: 80, col: '#0284c7' },
                          { name: 'Sales & Mktg', x: 226, col: '#d97706' },
                          { name: 'R&D Lab', x: 373, col: '#9333ea' },
                          { name: 'Finance & HR', x: 520, col: '#e11d48' },
                        ].map((d, i) => (
                          <g key={i}>
                            <line x1={d.x} y1="75" x2={d.x} y2="105" stroke="#64748b" strokeWidth="2" />
                            <rect
                              x={d.x - 55}
                              y="105"
                              width="110"
                              height="38"
                              rx="6"
                              fill="#1e293b"
                              stroke={d.col}
                              strokeWidth="1.5"
                            />
                            <text x={d.x} y={128} textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold">
                              {d.name}
                            </text>
                          </g>
                        ))}
                        <text x="300" y="180" textAnchor="middle" fill="#94a3b8" fontSize="10">
                          Merit: Deep functional specialisation • Zero resource duplication across products
                        </text>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 600 210" className="w-full h-52">
                        <rect x="230" y="8" width="140" height="32" rx="8" fill="#4338ca" stroke="#818cf8" />
                        <text x="300" y="28" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">
                          Tata Motors Board
                        </text>

                        <line x1="300" y1="40" x2="300" y2="60" stroke="#64748b" strokeWidth="2" />
                        <line x1="150" y1="60" x2="450" y2="60" stroke="#64748b" strokeWidth="2" />

                        {/* Division 1 */}
                        <line x1="150" y1="60" x2="150" y2="80" stroke="#64748b" strokeWidth="2" />
                        <rect x="80" y="80" width="140" height="30" rx="6" fill="#0f766e" stroke="#2dd4bf" />
                        <text x="150" y="99" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">
                          Passenger EV Division
                        </text>
                        <rect x="90" y="120" width="120" height="42" rx="4" fill="#1e293b" stroke="#64748b" />
                        <text x="150" y="137" textAnchor="middle" fill="#94a3b8" fontSize="8">
                          Dedicated Sales, Plant,
                        </text>
                        <text x="150" y="150" textAnchor="middle" fill="#94a3b8" fontSize="8">
                          Finance & R&D Teams
                        </text>

                        {/* Division 2 */}
                        <line x1="450" y1="60" x2="450" y2="80" stroke="#64748b" strokeWidth="2" />
                        <rect x="380" y="80" width="140" height="30" rx="6" fill="#b45309" stroke="#fbbf24" />
                        <text x="450" y="99" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">
                          Commercial Truck Div
                        </text>
                        <rect x="390" y="120" width="120" height="42" rx="4" fill="#1e293b" stroke="#64748b" />
                        <text x="450" y="137" textAnchor="middle" fill="#94a3b8" fontSize="8">
                          Dedicated Sales, Plant,
                        </text>
                        <text x="450" y="150" textAnchor="middle" fill="#94a3b8" fontSize="8">
                          Finance & R&D Teams
                        </text>

                        <text x="300" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10">
                          Merit: Separate P&L accountability • Demerit: Duplication of functional teams
                        </text>
                      </svg>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 2: Staffing Funnel */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-300">
                        SBI / Infosys Initial Recruitment Applicants Pool:
                      </label>
                      <span className="text-sm font-black text-emerald-400">{applicantCount.toLocaleString()} Candidates</span>
                    </div>
                    <input
                      type="range"
                      min={5000}
                      max={50000}
                      step={2500}
                      value={applicantCount}
                      onChange={(e) => handleApplicantSlider(Number(e.target.value))}
                      aria-label="Applicant Count Slider"
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  {/* Recharts Funnel Visualization */}
                  <div className="h-48 w-full bg-slate-950 rounded-xl p-2 border border-slate-800">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={staffingFunnelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="stage" stroke="#94a3b8" fontSize={10} />
                        <YAxis stroke="#94a3b8" fontSize={10} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                        />
                        <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-slate-400 text-center">
                    Notice how Recruitment acts as a <strong>Positive</strong> funnel-widener, whereas Selection is a{' '}
                    <strong>Negative</strong> elimination filter.
                  </p>
                </div>
              )}

              {/* SLIDE 3: Maslow Pyramid & Directing */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">
                    Click any level of Abraham Maslow’s hierarchy to activate industrial HR initiatives:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    {[
                      { lvl: 1, title: '1. Physiological', icon: '🍞', sub: '₹15 Meals & Water' },
                      { lvl: 2, title: '2. Safety', icon: '🛡️', sub: 'ESI & Safety Gear' },
                      { lvl: 3, title: '3. Social', icon: '🤝', sub: 'Team Diwali Lunches' },
                      { lvl: 4, title: '4. Esteem', icon: '🏆', sub: 'Employee of Month' },
                      { lvl: 5, title: '5. Self-Actualisation', icon: '🚀', sub: 'Leave to Learn' },
                    ].map((tier) => (
                      <motion.button
                        key={tier.lvl}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMaslowClick(tier.lvl)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          activeMaslowLevel === tier.lvl
                            ? 'bg-emerald-900/60 border-emerald-400 shadow-md ring-1 ring-emerald-400'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850'
                        }`}
                      >
                        <div className="text-xl mb-1">{tier.icon}</div>
                        <div className="text-xs font-bold text-slate-200">{tier.title}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{tier.sub}</div>
                      </motion.button>
                    ))}
                  </div>

                  {/* 2D Canvas dynamic pulse */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-[11px] font-semibold text-slate-400 mb-1">
                      Shop-Floor Production Energy Monitor:
                    </div>
                    <canvas ref={canvasRef} width={500} height={40} className="w-full rounded" />
                  </div>
                </div>
              )}

              {/* SLIDE 4: Controlling & Management by Exception */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <label className="text-xs font-bold text-slate-300 block mb-2">
                        Simulate Daily Actual Output (Standard = 50,000 Litres):
                      </label>
                      <input
                        type="range"
                        min={35000}
                        max={55000}
                        step={500}
                        value={factoryOutput}
                        onChange={(e) => handleOutputChange(Number(e.target.value))}
                        aria-label="Output Slider"
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-xs mt-2 font-semibold">
                        <span className="text-slate-400">Standard: 50,000 L</span>
                        <span className="text-emerald-400">Actual: {factoryOutput.toLocaleString()} L</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-400">MBE Tolerance Threshold:</span>
                        <span className="text-amber-400">±{mbeTolerance}%</span>
                      </div>
                      <input
                        type="range"
                        min={3}
                        max={15}
                        step={1}
                        value={mbeTolerance}
                        onChange={(e) => setMbeTolerance(Number(e.target.value))}
                        aria-label="Tolerance Slider"
                        className="w-full accent-amber-500 cursor-pointer"
                      />

                      <div className="mt-3 p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                        <span className="text-slate-400">Calculated Variance: </span>
                        <span
                          className={`font-bold ${
                            controllingAnalysis.devPercentage > 0 ? 'text-rose-400' : 'text-emerald-400'
                          }`}
                        >
                          {controllingAnalysis.deviation > 0 ? '-' : '+'}
                          {Math.abs(controllingAnalysis.deviation).toLocaleString()} L (
                          {Math.abs(controllingAnalysis.devPercentage)}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Banner */}
                  <div
                    className={`p-4 rounded-xl border text-xs font-semibold flex items-center justify-between ${
                      controllingAnalysis.triggersMBE
                        ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                        : 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                    }`}
                  >
                    <div>
                      {controllingAnalysis.triggersMBE
                        ? '🚨 MANAGEMENT BY EXCEPTION TRIGGERED! Variance exceeds acceptable threshold. Root-cause investigation & corrective action required.'
                        : '✅ WITHIN TOLERANCE. Minor variance filtered out as normal operational fluctuation. No manager intervention required.'}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ─── BRILLIANT.ORG STYLE "WHAT DO YOU NOTICE?" OBSERVATION BLOCK ─── */}
          <div className="p-5 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 rounded-2xl border border-emerald-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold tracking-wide flex items-center gap-1.5">
                <span>🔍</span> WHAT DO YOU NOTICE? (Observation {currentObsIndex + 1} of {OBSERVATION_QUESTIONS.length})
              </span>
              <div className="flex gap-2">
                {OBSERVATION_QUESTIONS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentObsIndex(i)}
                    className={`w-6 h-6 rounded-full text-xs font-bold transition-all ${
                      i === currentObsIndex
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm font-semibold text-white">
              {OBSERVATION_QUESTIONS[currentObsIndex].prompt}
            </p>

            <div className="space-y-2">
              {OBSERVATION_QUESTIONS[currentObsIndex].observableOptions.map((opt, oIdx) => {
                const isSelected = obsAnswers[currentObsIndex] === oIdx;
                const isCorrect = oIdx === OBSERVATION_QUESTIONS[currentObsIndex].correctIndex;
                const showResult = obsShowResult[currentObsIndex];

                return (
                  <motion.button
                    key={oIdx}
                    whileHover={{ scale: 1.01, x: 2 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleObsOptionSelect(currentObsIndex, oIdx)}
                    className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm font-medium transition-all border ${
                      showResult
                        ? isCorrect
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : isSelected
                          ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                          : 'bg-slate-950/60 border-slate-800 text-slate-500'
                        : isSelected
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {showResult && isCorrect && <span className="text-emerald-400 font-bold ml-2">✓ Verified</span>}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {obsShowResult[currentObsIndex] && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
              >
                <span className="text-emerald-400 font-bold">💡 Key Takeaway:</span>
                <span>{OBSERVATION_QUESTIONS[currentObsIndex].explanation}</span>
              </motion.div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40 transition-all"
            >
              �� Previous Module
            </motion.button>

            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentSlide ? 'bg-emerald-400 w-6' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                Next Module →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-950/50"
              >
                Proceed to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE SANDBOX / PREDICT-THEN-CHECK PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950/40 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-start">
              <div>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
                  PREDICT-THEN-CHECK SANDBOX
                </span>
                <h3 className="text-lg font-bold text-white mt-2">Executive Simulation Playground</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Test hypotheses before tackling the CISCE assessment challenges. No grades attached!
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-950/50 whitespace-nowrap"
              >
                Ready for Challenges! →
              </motion.button>
            </div>
          </div>

          {/* Predict-then-check Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <span>🔮</span> {PREDICTION_QUESTIONS[0].question}
            </h4>

            {!predictionMade ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePrediction(i)}
                    aria-label={`Predict: ${opt}`}
                    className="p-3 text-left bg-slate-850 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <div
                  className={`p-3 rounded-xl text-xs font-semibold ${
                    predictionIndex === PREDICTION_QUESTIONS[0].correctIndex
                      ? 'bg-emerald-950/60 border border-emerald-500 text-emerald-200'
                      : 'bg-amber-950/60 border border-amber-500 text-amber-200'
                  }`}
                >
                  {predictionIndex === PREDICTION_QUESTIONS[0].correctIndex
                    ? '🎯 Accurate Prediction! Divisional structures replicate functional departments in every division.'
                    : '💡 Check this: Divisional structure creates separate sales/marketing teams for every product division!'}
                </div>
              </motion.div>
            )}

            {/* Sandbox Live Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <label className="text-xs font-bold text-slate-400 block mb-2">Simulate Daily Output:</label>
                <input
                  type="range"
                  min={35000}
                  max={55000}
                  step={1000}
                  value={factoryOutput}
                  onChange={(e) => handleOutputChange(Number(e.target.value))}
                  aria-label="Sandbox Output Slider"
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="text-xs mt-2 text-slate-300 flex justify-between">
                  <span>Standard: 50k</span>
                  <span className="font-bold text-emerald-400">{factoryOutput.toLocaleString()} L</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <label className="text-xs font-bold text-slate-400 block mb-2">Structure Choice:</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOrgToggle('functional')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      selectedOrgStructure === 'functional' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Functional
                  </button>
                  <button
                    onClick={() => handleOrgToggle('divisional')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      selectedOrgStructure === 'divisional' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Divisional
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-center">
                <div className="text-[11px] text-slate-400">MBE Alert Status:</div>
                <div
                  className={`text-sm font-black mt-1 ${
                    controllingAnalysis.triggersMBE ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {controllingAnalysis.triggersMBE ? 'INVESTIGATION TRIGGERED' : 'NORMAL VARIANCE'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. STRUCTURED CHALLENGE ASSESSMENT PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress and Tier Header */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider text-emerald-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="capitalize px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                Competency: {activeChallenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500 text-rose-100'
                : 'bg-slate-900 border-slate-800 text-slate-100'
            }`}
          >
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-relaxed">
              {activeChallenge.question}
            </h3>

            {/* A. MCQ RENDERING */}
            {(activeChallenge.type === 'classify' ||
              activeChallenge.type === 'distinguish' ||
              activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="space-y-3">
                  {activeChallenge.options.map((opt, i) => {
                    const isSelectedWrong = wrongShake && lastSelectedOption === i;
                    return (
                      <motion.button
                        key={i}
                        animate={isSelectedWrong ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                        transition={{ duration: 0.4 }}
                        whileHover={{ scale: 1.015, x: 4 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => handleAnswer(i)}
                        disabled={answerRevealed || showExplanation}
                        aria-label={`Select: ${opt}`}
                        className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm font-medium transition-all border ${
                          showExplanation && i === activeChallenge.correctIndex
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                            : isSelectedWrong
                            ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                            : 'bg-slate-850 hover:bg-slate-800 border-slate-700 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt}</span>
                          {showExplanation && i === activeChallenge.correctIndex && (
                            <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}

            {/* B. DRAG-LABEL CHALLENGE */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag these labels to the org chart slots:</span>
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable: ${item.label}`}
                      className="px-3.5 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                  {activeChallenge.dragItems.map((item) => (
                    <div
                      key={item.targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[70px] ${
                        droppedLabels[item.targetId]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-semibold">
                        Slot: {item.targetId.replace('org_', '').toUpperCase()}
                      </span>
                      <span className="text-xs font-bold text-white">
                        {droppedLabels[item.targetId] || 'Drop Position Label Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Verify Org Mapping
                </motion.button>
              </div>
            )}

            {/* C. DRAG-SORT CHALLENGE */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to rearrange into the correct sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
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
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      className="p-3 bg-slate-850 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center font-bold text-xs border border-slate-700">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="mt-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Confirm Order
                </motion.button>
              </div>
            )}

            {/* D. NUMERIC CHALLENGE */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated number"
                    aria-label="Enter numeric answer"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-xs text-slate-400 font-semibold">{activeChallenge.unit}</span>
                  <motion.button
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md disabled:opacity-50"
                  >
                    Submit Variance
                  </motion.button>
                </div>
              </div>
            )}

            {/* E. CONSTRUCT CHALLENGE */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Click blocks to add to loop:</span>
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      aria-label={`Add part ${part}`}
                      className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 rounded-lg text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-emerald-950 border border-emerald-500 text-emerald-200 rounded-lg text-xs font-bold flex items-center gap-2"
                    >
                      <span>
                        {i + 1}. {part}
                      </span>
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 text-xs"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">No functions added yet.</span>
                  )}
                </div>

                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Verify POSDC Cycle
                </motion.button>
              </div>
            )}
          </div>

          {/* Progressive Disclosure Step-by-Step Explanation */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-700/50 rounded-2xl space-y-3"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Step-by-Step Conceptual Rationale:
              </div>
              <div className="space-y-2">
                {activeChallenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-slate-300 leading-relaxed"
                    >
                      <strong className="text-amber-400 mr-1.5">{idx + 1}.</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                {revealedSteps <
                activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                  >
                    Reveal Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-950/50"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── 5. COMPLETION, MASTERY PROFILE & SPACED REPETITION VISIBILITY ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 text-center bg-gradient-to-b from-emerald-950/60 to-slate-900 rounded-3xl border border-emerald-500/40 shadow-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-4xl shadow-inner"
            >
              🎓
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Management Assessment Complete!</h2>
            <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm">
              <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-xs block">Overall Score</span>
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-xs block">BKT Mastery Status</span>
                <span className="text-2xl font-black text-indigo-400 capitalize">{masteryLevel}</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-xs block">Errors Recorded</span>
                <span className={`text-2xl font-black ${errors === 0 ? 'text-emerald-400' : errors <= 3 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {errors}
                </span>
              </div>
            </div>

            {/* Motivational Feedback */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 max-w-xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed">
              {errors === 0
                ? '🌟 PERFECT SCORE! You have mastered all 10 Business Studies management functions seamlessly.'
                : errors <= 3
                ? '👏 Excellent work! You possess strong analytical judgment across Planning, Organising, Staffing, Directing, and Controlling.'
                : '📚 Good effort! Review the specific misconception diagnostic items below to reinforce your knowledge.'}
            </div>
          </div>

          {/* ─── EXPLICIT SPACED REPETITION SCHEDULE CARD ─── */}
          <div className="p-6 bg-gradient-to-br from-amber-950/50 via-slate-900 to-indigo-950/50 rounded-2xl border-2 border-amber-500/50 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-800/40 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📅</span>
                <div>
                  <h3 className="text-base font-bold text-amber-300">Spaced Repetition Schedule (SM-2 Active)</h3>
                  <p className="text-xs text-slate-400">Optimized cognitive retention intervals for ISC Board exams</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-extrabold uppercase">
                {errors === 0 ? 'Mastery Retained' : errors <= 3 ? 'Developing Retention' : 'Reinforcement Needed'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <span className="text-xs text-slate-400 block mb-1">Recommended Interval</span>
                <span className="text-xl font-black text-white">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold block mt-1">
                  ({errors === 0 ? '0 errors logged' : errors <= 3 ? `${errors} errors logged` : `${errors} errors logged`})
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <span className="text-xs text-slate-400 block mb-1">Next Session Due Date</span>
                <span className="text-xl font-black text-amber-400">{srsTargetDate}</span>
                <span className="text-[11px] text-slate-400 block mt-1">SM-2 Algorithm Interval</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <span className="text-xs text-slate-400 block mb-1">Retention Goal</span>
                <span className="text-xl font-black text-indigo-400">95%+ Recall</span>
                <span className="text-[11px] text-slate-400 block mt-1">ISC Class 12 Boards</span>
              </div>
            </div>

            <p className="text-xs text-amber-200/90 leading-relaxed bg-amber-950/40 p-3 rounded-xl border border-amber-800/30">
              📌 <strong>Memory Science Note:</strong> Business Studies concepts like <em>Management by Exception</em> and <em>Formal vs Informal channels</em> consolidate into long-term memory when reviewed at expanding intervals ({errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}).
            </p>
          </div>

          {/* Misconception Profile Tracker */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-900/50 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                <span>⚠️</span> Identified Misconception Profile:
              </h3>
              <div className="space-y-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3.5 bg-slate-900 rounded-xl border border-rose-800/40 text-xs space-y-1">
                      <div className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</div>
                      <div className="text-emerald-300">✓ Scientific Fact: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Reflection Section */}
          <div className="p-6 bg-gradient-to-br from-indigo-950/40 to-slate-900 rounded-2xl border border-indigo-800/40 space-y-4">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>🧠</span> Deep Learning Reflection
            </h3>
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-xs font-semibold text-indigo-400 block mb-1">
                  1. What was the most surprising thing you learned?
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  How recruitment is a positive widening funnel while selection is a rigorous negative elimination filter, and how Management by Exception saves leadership from operational noise.
                </p>
              </div>
              <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-xs font-semibold text-indigo-400 block mb-1">
                  2. How would you explain this to a friend?
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Management (POSDC) is like running an IPL cricket franchise: Planning sets match targets, Organising sets the lineup, Staffing picks and trains talent, Directing inspires the squad on field, and Controlling checks run rates to revise match plans.
                </p>
              </div>
              <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-xs font-semibold text-indigo-400 block mb-1">
                  3. Where in real life might you use this?
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  When organizing a school fest, managing student teams, prioritizing Maslow needs during exams, or establishing budget thresholds for a startup project.
                </p>
              </div>
            </div>
          </div>

          {/* Real-World Capstone Project Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🚀</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i}>{st}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_BusinessStudiesPlanningMeaningStepsSim;
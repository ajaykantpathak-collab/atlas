'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Node IDs as string literals
const NODE_C10_COMMAPP_011 = 'c10_commapp_011';
const NODE_C10_COMMAPP_012 = 'c10_commapp_012';
const NODE_C10_COMMAPP_013 = 'c10_commapp_013';
const NODE_C10_COMMAPP_014 = 'c10_commapp_014';
const NODE_C10_COMMAPP_015 = 'c10_commapp_015';
const NODE_C10_COMMAPP_016 = 'c10_commapp_016';
const NODE_C10_COMMAPP_017 = 'c10_commapp_017';
const NODE_C10_COMMAPP_018 = 'c10_commapp_018';
const NODE_C10_COMMAPP_019 = 'c10_commapp_019';
const NODE_C10_COMMAPP_020 = 'c10_commapp_020';

const ALL_NODE_IDS = [
  NODE_C10_COMMAPP_011,
  NODE_C10_COMMAPP_012,
  NODE_C10_COMMAPP_013,
  NODE_C10_COMMAPP_014,
  NODE_C10_COMMAPP_015,
  NODE_C10_COMMAPP_016,
  NODE_C10_COMMAPP_017,
  NODE_C10_COMMAPP_018,
  NODE_C10_COMMAPP_019,
  NODE_C10_COMMAPP_020,
];

// Narrative Scenario
const SCENARIO = {
  title: 'Vikas Enterprises: From Shop Floor to Boardroom',
  intro: 'You are appointed as the Chief Business Operations Consultant for Vikas Enterprises, a fast-growing consumer electronics and appliances firm in Pune. The company is restructuring its sales pipeline, auditing its financial records under Indian GAAP, classifying production costs, and modernising its HR recruitment strategy.',
  context: 'Manage sales demos, audit final accounts, calculate cost behaviors as factory output scales, and balance internal vs external hiring to steer Vikas Enterprises to sustainable growth.',
};

// Discovery Question
const DISCOVERY_QUESTION = {
  question: 'An Eureka Forbes executive visits a housing society in Pune to demonstrate Aquaguard water purifiers door-to-door. Is this executive executing "Marketing" or "Sales"?',
  options: [
    'Marketing — because it represents the overall business strategy to public customers.',
    'Sales — because it is the specific, face-to-face personal execution converting an individual customer.',
    'Neither — door-to-door visits are purely classified as public relations and logistics.',
    'Marketing and Sales are completely separate and never interact during a home visit.',
  ],
  correctIndex: 1,
  hintAfter: 'Marketing designs the strategy and product positioning, but Personal Selling executes the transaction with the customer!',
};

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

const CHALLENGES: Challenge[] = [
  // 1. Sales & Selling Process (Foundation - Recall)
  {
    id: 'ch_011_f1',
    nodeId: NODE_C10_COMMAPP_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the foundational relationship between Marketing and Sales in commercial enterprise?',
    options: [
      'Sales includes Marketing as a support function.',
      'Marketing INCLUDES Sales as one of its core execution arms.',
      'Marketing and Sales are entirely unrelated departments with zero overlap.',
      'Sales defines product strategy while Marketing executes the cash register transactions.',
    ],
    correctIndex: 1,
    explanation: 'Marketing is the broad, long-term, customer-need-focused strategy (product, price, place, promotion). Sales is the transactional execution arm converting prospects into buyers.',
    hints: [
      'Think about which concept is broader: overall strategy or transactional execution.',
      'Asian Paints marketing designs the Royale palette; the showroom salesperson closes 18 litres.',
      'Marketing encompasses the whole journey, so Marketing includes Sales.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Personal Selling Stages Sort (Foundation - Understanding)
  {
    id: 'ch_011_f2',
    nodeId: NODE_C10_COMMAPP_011,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the first four steps of the 7-step Personal Selling process in chronological order:',
    sortItems: ['Prospecting', 'Pre-approach', 'Approach', 'Presentation & Demonstration'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The initial sales sequence begins with identifying potential leads (Prospecting), researching lead details (Pre-approach), making initial contact (Approach), and demonstrating value (Presentation).',
    hints: [
      'You cannot research a prospect before identifying who they are.',
      'You must gather information before knocking on the door or calling.',
      'Presentation happens only after you have met and greeted the customer.',
    ],
    misconceptionIndex: 2,
  },
  // 3. Salesman Qualities (Foundation - Recall)
  {
    id: 'ch_012_f1',
    nodeId: NODE_C10_COMMAPP_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following pairs correctly represents the VOCATIONAL qualities of a good salesperson?',
    options: [
      'Good health and stamina',
      'Alertness and creative imagination',
      'Courtesy and diplomatic tact',
      'In-depth Product Knowledge and uncompromised Integrity',
    ],
    correctIndex: 3,
    explanation: 'Vocational qualities relate directly to professional proficiency and trade ethics: thorough Product Knowledge and honest Integrity.',
    hints: [
      'Health is physical; alertness is mental; courtesy is social.',
      'Vocational relates to the trade or profession itself.',
      'Knowing product specs and telling the truth about warranties define vocational quality.',
    ],
    misconceptionIndex: 3,
  },
  // 4. GAAP Entity Concept (Foundation - Understanding)
  {
    id: 'ch_013_f1',
    nodeId: NODE_C10_COMMAPP_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Proprietor Ramesh withdraws ₹25,000 cash from Ramesh Kirana Store to pay his personal life insurance premium. Under the Business Entity Concept, how must this be recorded?',
    options: [
      'Debited to Business Insurance Expense Account',
      'Debited to Drawings Account and Credited to Cash Account',
      'Ignored because the proprietor and the sole proprietorship are legally one person',
      'Credited to Capital Account as fresh personal investment',
    ],
    correctIndex: 1,
    explanation: 'Under the Business Entity Concept, the enterprise is separate from the owner. Personal withdrawals are recorded as Drawings, reducing equity, not as operational business expenses.',
    hints: [
      'Personal expenses are not business operating costs.',
      'When an owner takes money out for personal use, what specific account is debited?',
      'The entry is Drawings A/c Dr. To Cash A/c.',
    ],
    misconceptionIndex: 4,
  },
  // 5. Accounting Principles Prudence (Foundation - Recall)
  {
    id: 'ch_014_f1',
    nodeId: NODE_C10_COMMAPP_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The Prudence (Conservatism) Principle strictly dictates that an accountant must:',
    options: [
      'Anticipate and provide for all possible future losses, but never anticipate unrealised gains.',
      'Deliberately understate realised annual profits to lower corporate taxes.',
      'Record fixed assets at current speculative auction values.',
      'Recognise revenues as soon as an informal telephonic inquiry is received.',
    ],
    correctIndex: 0,
    explanation: 'Prudence mandates creating provisions for anticipated losses (e.g., Provision for Doubtful Debts) while postponing gain recognition until legally realised.',
    hints: [
      'Think about how accounting treats potential bad news vs hopeful good news.',
      'Does prudence mean cheating on taxes or preparing for risks?',
      'Losses are anticipated; profits are recognised only when realized.',
    ],
    misconceptionIndex: 5,
  },
  // 6. Cost Classification by Nature (Foundation - Understanding)
  {
    id: 'ch_017_f1',
    nodeId: NODE_C10_COMMAPP_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is the salary of a factory shop-floor supervisor classified as INDIRECT Labour rather than Direct Labour?',
    options: [
      'Because supervisors do not work inside the factory premises.',
      'Because the supervisor oversees multiple production lines and cannot be economically traced to a single unit of output.',
      'Because supervisors are paid lower monthly wages than furnace operators.',
      'Because all salaried positions are legally prohibited from being direct costs.',
    ],
    correctIndex: 1,
    explanation: 'Direct costs require convenient and economical traceability to a single cost unit. Supervisors oversee multiple batches, making their cost indirect factory overhead.',
    hints: [
      'Does the supervisor physically transform a single bottle or car?',
      'The core test for direct cost is single-unit traceability.',
      'A supervisor oversees the whole area, so the cost is apportioned as indirect.',
    ],
    misconceptionIndex: 6,
  },
  // 7. Cost Behaviour (Foundation - Recall)
  {
    id: 'ch_018_f1',
    nodeId: NODE_C10_COMMAPP_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When factory output increases from 2,000 units to 5,000 units within the relevant range, what happens to FIXED cost per unit?',
    options: [
      'Fixed cost per unit increases proportionally.',
      'Fixed cost per unit decreases (the spreading effect).',
      'Fixed cost per unit remains completely unchanged.',
      'Total fixed cost doubles automatically.',
    ],
    correctIndex: 1,
    explanation: 'Total fixed cost remains constant within the relevant range, so dividing that fixed sum by more units lowers the fixed cost per unit (the spreading effect).',
    hints: [
      'Consider rent: ₹1,00,000 rent divided by 2,000 units vs 5,000 units.',
      '₹1,00,000 / 2,000 = ₹50/unit; ₹1,00,000 / 5,000 = ₹20/unit.',
      'As denominator grows, the per-unit cost falls.',
    ],
    misconceptionIndex: 7,
  },
  // 8. HRM vs Personnel Management (Foundation - Recall)
  {
    id: 'ch_019_f1',
    nodeId: NODE_C10_COMMAPP_019,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which statement accurately describes the modern paradigm shift from traditional Personnel Management to Human Resource Management (HRM)?',
    options: [
      'Personnel Management treats employees as strategic assets, while HRM treats them purely as costs.',
      'HRM is proactive, development-oriented, and strategic, viewing employees as valuable human capital to be nurtured.',
      'HRM is strictly confined to attendance punch-cards and statutory PF filings.',
      'Personnel Management handles talent acquisition while HRM only handles employee retirement.',
    ],
    correctIndex: 1,
    explanation: 'Traditional personnel management was reactive and administrative (payroll/records). HRM is proactive, developmental, and pervasive across the entire organisation.',
    hints: [
      'Think about whether modern firms treat people as expenses or appreciating assets.',
      'HRM emphasizes continuous training, coaching, and growth.',
      'Flipkart and Tata Steel use HRM for strategic talent building.',
    ],
    misconceptionIndex: 8,
  },
  // 9. Personal Selling Objection Handling (Standard - Application)
  {
    id: 'ch_011_s1',
    nodeId: NODE_C10_COMMAPP_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A prospective buyer tells an Aquaguard water purifier sales representative: "₹18,000 is too expensive for our family budget." Which response demonstrates professional objection handling?',
    options: [
      '"If you cannot afford ₹18,000, you should look for inferior roadside filters."',
      '"Our product pays for itself in 5 months compared to ₹4,000/month spent on 20L water cans, plus we offer zero-cost monthly EMI options."',
      '"Let me call my regional manager to complain about your reluctance to invest in health."',
      '"Ignore the price tag, sign this agreement immediately, and we will discuss payment next year."',
    ],
    correctIndex: 1,
    explanation: 'Handling objections requires tact, economic logic, and flexible solutions (like highlighting savings vs bottled water and presenting EMI plans).',
    hints: [
      'Never insult the customer or dismiss their genuine budget constraint.',
      'Demonstrate return on investment by comparing alternative ongoing costs.',
      'Providing an EMI instalment reduces upfront purchase friction.',
    ],
  },
  // 10. Financial Statements Classification Drag-Label (Standard - Understanding)
  {
    id: 'ch_016_s1',
    nodeId: NODE_C10_COMMAPP_016,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Drag the financial items to their correct financial statement destinations:',
    dragItems: [
      { label: 'Carriage Inwards', targetId: 'box_trading' },
      { label: 'Carriage Outwards', targetId: 'box_pl' },
      { label: 'Bills Receivable', targetId: 'box_bs_asset' },
      { label: 'Bank Overdraft', targetId: 'box_bs_liab' },
    ],
    correctMapping: {
      box_trading: 'Carriage Inwards',
      box_pl: 'Carriage Outwards',
      box_bs_asset: 'Bills Receivable',
      box_bs_liab: 'Bank Overdraft',
    },
    explanation: 'Carriage Inwards is a direct trading cost; Carriage Outwards is an indirect selling expense in P&L; Bills Receivable is a current asset; Bank Overdraft is a current liability.',
    hints: [
      'Bringing goods IN to factory is direct (Trading); delivering OUT to customer is indirect (P&L).',
      'Bills Receivable represents money owed to you (Asset).',
      'Bank Overdraft is short-term borrowing owed to bank (Liability).',
    ],
    misconceptionIndex: 1,
  },
  // 11. Gross Profit Live Calculation Numeric (Standard - Application)
  {
    id: 'ch_016_s2',
    nodeId: NODE_C10_COMMAPP_016,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Suresh Electronics has Opening Stock ₹1,50,000, Purchases ₹8,00,000, Direct Wages ₹50,000, Sales ₹14,00,000, and Closing Stock ₹2,00,000. Calculate Gross Profit (in ₹).',
    correctAnswer: 600000,
    tolerance: 0,
    unit: '₹',
    explanation: 'COGS = Opening Stock (1,50,000) + Purchases (8,00,000) + Direct Wages (50,00,0) - Closing Stock (2,00,000) = ₹8,00,000. Gross Profit = Sales (14,00,000) - COGS (8,00,000) = ₹6,00,000.',
    hints: [
      'Gross Profit = (Sales + Closing Stock) - (Opening Stock + Purchases + Direct Wages).',
      'Total Credits = 14,00,000 + 2,00,000 = 16,00,000.',
      'Total Debits = 1,50,000 + 8,00,000 + 50,000 = 10,00,000. Gross Profit = 16,00,000 - 10,00,000.',
    ],
  },
  // 12. Accounting Duality Equation (Standard - Analysis)
  {
    id: 'ch_013_s1',
    nodeId: NODE_C10_COMMAPP_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A trader buys factory machinery worth ₹4,00,000 by paying ₹1,00,000 via cheque and taking a bank loan for ₹3,00,000. How does this affect the Accounting Equation (Assets = Liabilities + Capital)?',
    options: [
      'Assets increase by ₹3,00,000 (Machinery +4L, Bank -1L) and Liabilities increase by ₹3,00,000 (Bank Loan +3L).',
      'Assets increase by ₹4,00,000 and Capital increases by ₹4,00,000.',
      'Liabilities decrease by ₹3,00,000 and Capital decreases by ₹1,00,000.',
      'Assets remain unchanged while Liabilities increase by ₹4,00,000.',
    ],
    correctIndex: 0,
    explanation: 'Machinery (+₹4,00,000) minus Bank (-₹1,00,000) results in net Asset increase of +₹3,00,000. This perfectly balances the Loan liability increase of +₹3,00,000.',
    hints: [
      'Calculate net change in Assets: Machinery comes in (+4L), Bank balance goes out (-1L).',
      'Net Asset change = +3,00,000.',
      'Liability side has Bank Loan of +3,00,000. Capital is untouched.',
    ],
  },
  // 13. Overhead Apportionment Math (Standard - Application)
  {
    id: 'ch_017_s1',
    nodeId: NODE_C10_COMMAPP_017,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Asian Paints factory rent is ₹12,00,000 per month. Dept A occupies 3,000 sq m and Dept B occupies 5,000 sq m. Apportion rent to Dept A on floor area basis (in ₹).',
    correctAnswer: 450000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Floor area ratio = 3,000 : 5,000 = 3 : 5 (Total parts = 8). Dept A share = 12,00,000 × (3/8) = ₹4,50,000.',
    hints: [
      'Find the floor area ratio: 3,000 / 8,000 = 3/8.',
      'Multiply total rent (₹12,00,000) by Dept A\'s share fraction (3/8).',
      '12,00,000 / 8 = 1,50,000. 1,50,000 × 3 = 4,50,000.',
    ],
  },
  // 14. Stepped Fixed vs Semi-Variable (Standard - Analysis)
  {
    id: 'ch_018_s2',
    nodeId: NODE_C10_COMMAPP_018,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Identify the crucial structural distinction between a Semi-Fixed (Semi-Variable) cost and a Stepped Fixed cost:',
    options: [
      'Semi-fixed has both a fixed base and a variable usage component at all output levels, while stepped fixed remains purely flat until jumping abruptly at a capacity threshold.',
      'Stepped fixed changes with every single unit produced, while semi-fixed never changes under any circumstances.',
      'Semi-fixed costs only exist in service companies, whereas stepped fixed costs only exist in agriculture.',
      'There is no mathematical or operational distinction between the two terms.',
    ],
    correctIndex: 0,
    explanation: 'Electricity (₹2,00,000 fixed + ₹5/unit) is semi-variable because both parts operate concurrently. Supervisor salary (₹50,000 up to 5,000 units, then jumping to ₹1,00,000) is stepped fixed.',
    hints: [
      'Think of an electricity bill (meter rent + units consumed) vs hiring a 2nd supervisor when exceeding capacity.',
      'Semi-variable has a two-part formula at every output point.',
      'Stepped fixed jumps in discrete stair-step blocks.',
    ],
    misconceptionIndex: 7,
  },
  // 15. Recruitment vs Selection (Standard - Understanding)
  {
    id: 'ch_020_s1',
    nodeId: NODE_C10_COMMAPP_020,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'When State Bank of India receives 20,00,000 applications for 5,000 Probationary Officer vacancies, what stage has just completed?',
    options: [
      'Selection — because candidates have submitted their academic profiles.',
      'Recruitment — because a candidate pool has been stimulated and gathered, before screening begins.',
      'Placement & Induction — because applicants are registered in the corporate database.',
      'Performance Appraisal — because eligibility marks are evaluated.',
    ],
    correctIndex: 1,
    explanation: 'Recruitment is the positive process of searching and creating the applicant pool. Selection is the subsequent negative/filtering process that chooses 5,000 candidates from that pool.',
    hints: [
      'Generating 20 lakh applicants creates the pool.',
      'Selection is the process of choosing who gets hired from the pool.',
      'Collecting applications is the end of Recruitment.',
    ],
    misconceptionIndex: 9,
  },
  // 16. Journal Entry Rules of Debit/Credit (Standard - Application)
  {
    id: 'ch_015_s1',
    nodeId: NODE_C10_COMMAPP_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Vikas Enterprises receives ₹40,000 cash from a trade debtor, Mehta & Sons. What is the correct double-entry journal record?',
    options: [
      'Mehta & Sons A/c Dr. ₹40,000, To Cash A/c ₹40,000',
      'Cash A/c Dr. ₹40,000, To Mehta & Sons A/c ₹40,000',
      'Purchases A/c Dr. ₹40,000, To Sales A/c ₹40,000',
      'Bank A/c Dr. ₹40,000, To Discount A/c ₹40,000',
    ],
    correctIndex: 1,
    explanation: 'Cash is a Real Account (Debit what comes in -> Cash Dr. ₹40,000). Mehta & Sons is a Personal Account (Credit the giver -> To Mehta & Sons ₹40,000).',
    hints: [
      'Look at the transaction from your business perspective: cash is coming IN.',
      'Real account rule: Debit what comes in.',
      'Personal account rule: Credit the giver.',
    ],
  },
  // 17. Advertising vs Personal Selling Evaluation (Advanced - Evaluation)
  {
    id: 'ch_011_a1',
    nodeId: NODE_C10_COMMAPP_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A startup launches an industrial solar generator priced at ₹12,00,000 for factories. Why is Personal Selling dramatically superior to Mass Television Advertising for this product?',
    options: [
      'Personal selling allows technical demonstration, real-time negotiation, high trust building, and customised ROI explanation essential for high-involvement B2B transactions.',
      'Television advertising is legally prohibited for industrial equipment in India under the Companies Act.',
      'Personal selling is completely free of cost compared to TV channels.',
      'Mass consumers on entertainment channels are the primary decision-makers for industrial factories.',
    ],
    correctIndex: 0,
    explanation: 'High-involvement, high-value, complex industrial products require two-way interactive communication, technical objection handling, and relationship building that mass TV ads cannot deliver.',
    hints: [
      'Consider the price tag (₹12 Lakhs) and target audience (factory owners).',
      'Can a 30-second TV ad answer technical installation questions?',
      'High-value B2B sales require personal demonstration and relationship building.',
    ],
  },
  // 18. Integrity in Sales Career Evaluation (Advanced - Evaluation)
  {
    id: 'ch_012_a1',
    nodeId: NODE_C10_COMMAPP_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate why uncompromised Integrity is more crucial than high-pressure Persuasion for an LIC insurance agent\'s long-term career in India:',
    options: [
      'Over 60% of financial services business relies on renewals and community referrals; a single misrepresentation destroys the agent\'s referral network.',
      'Persuasion is prohibited by IRDAI regulations, whereas integrity guarantees zero policy cancellations.',
      'Insurance companies only pay commission if the agent speaks in three regional languages.',
      'Persuasive agents are legally classified as external contractors without retirement benefits.',
    ],
    correctIndex: 0,
    explanation: 'Persuasion might close one immediate policy, but Misrepresentation breaks trust. In Indian close-knit communities, referrals compound lifetime earnings far beyond a single commission.',
    hints: [
      'Think about lifetime value of customer referrals vs a one-off quick sale.',
      'If a client feels cheated on surrender values, what happens to their neighbours and friends?',
      'Integrity builds sustainable compounding referral pipelines.',
    ],
  },
  // 19. Trial Balance Limitations (Advanced - Analysis)
  {
    id: 'ch_015_a1',
    nodeId: NODE_C10_COMMAPP_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A bookkeeper bought an office computer for ₹60,000 and mistakenly journalised: Purchases A/c Dr. ₹60,000, To Cash A/c ₹60,000. Will the Trial Balance agree?',
    options: [
      'Yes, the Trial Balance will tally because equal debit and credit amounts (₹60,000) were posted (Error of Principle).',
      'No, the Trial Balance will show an excess debit of ₹60,000.',
      'No, the Trial Balance will show an excess credit of ₹1,20,000.',
      'The Trial Balance will automatically create a Suspense Account of ₹60,000.',
    ],
    correctIndex: 0,
    explanation: 'The Trial Balance proves only arithmetic equality of debits and credits. An Error of Principle (capital expenditure debited to nominal purchases) maintains arithmetic balance and goes undetected by the trial balance.',
    hints: [
      'Check if the debit amount equals the credit amount in the wrong entry.',
      'Both debited ₹60,000 and credited ₹60,000.',
      'Since debits equal credits, the arithmetic total matches. This is an Error of Principle.',
    ],
  },
  // 20. Statutory Recruitment Sourcing (Advanced - Application)
  {
    id: 'ch_020_a1',
    nodeId: NODE_C10_COMMAPP_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Under the Employment Exchanges (Compulsory Notification of Vacancies) Act, 1959, which of the following is mandatory for an Indian manufacturing plant with 50+ workers?',
    options: [
      'Must mandatorily hire 100% of candidates sent by the Employment Exchange without testing.',
      'Must notify all qualifying vacancies to the local Employment Exchange before filling them.',
      'Must abolish all internal promotion routes and only use campus hiring.',
      'Must publish job openings exclusively in international newspapers.',
    ],
    correctIndex: 1,
    explanation: 'The Act mandates compulsory notification of vacancies to the designated Employment Exchange, though the employer retains the right of selection.',
    hints: [
      'The statute name specifies "Compulsory Notification".',
      'Notification is mandatory, but selection choice remains with the company.',
      'Employers must inform the government exchange of vacancies.',
    ],
  },
  // 21. Job Ad Construction (Advanced - Creativity)
  {
    id: 'ch_020_a2',
    nodeId: NODE_C10_COMMAPP_020,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the essential components of a formal corporate Job Advertisement in standard sequence:',
    availableParts: ['Company & Post Title', 'Eligibility & Experience', 'Pay Scale & Location', 'Deadline & Contact/Ref Code'],
    targetState: 'Company & Post Title Eligibility & Experience Pay Scale & Location Deadline & Contact/Ref Code',
    validationHint: 'Add all four standard header-to-footer sections in sequential order.',
    explanation: 'A standard job ad structure: 1. Organization & Post Name -> 2. Qualifications/Experience -> 3. Remuneration & Work Location -> 4. Last Date & Application Channel.',
    hints: [
      'Start with who is hiring and for what post.',
      'Specify qualifications and eligibility next.',
      'Follow with compensation, location, and application deadline.',
    ],
  },
  // 22. Total Production Cost Calculation (Advanced - Analysis)
  {
    id: 'ch_018_a1',
    nodeId: NODE_C10_COMMAPP_018,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Vikas Enterprises produces smart inverters. Variable cost = ₹3,000/unit; Monthly Fixed Rent & Salaries = ₹12,00,000; Electricity = ₹1,00,000 fixed + ₹200/unit. Calculate total cost for 1,000 units (in ₹).',
    correctAnswer: 4500000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Variable: 3,000 × 1,000 = ₹30,00,000. Fixed: ₹12,00,000. Semi-Fixed: 1,00,000 + (200 × 1,000) = ₹3,00,000. Total = 30,00,000 + 12,00,000 + 3,00,000 = ₹45,00,000.',
    hints: [
      'Calculate Variable component: (3,000 + 200) × 1,000 = 32,00,000.',
      'Calculate Total Fixed component: 12,00,000 + 1,00,000 = 13,00,000.',
      'Sum together: 32,00,000 + 13,00,000 = 45,00,000.',
    ],
  },
];

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
  nodeId: NODE_C10_COMMAPP_011,
  title: 'Commerce Applications: Selling, Accounting, Costs & HR',
  definition: 'Integrated study of the personal selling sequence, accounting conventions under Indian GAAP, financial statements, cost nature and behavior dynamics, and human resource procurement.',
  eli5: 'Think of running a thriving Indian enterprise: you market and sell products, record every rupee accurately in journals and balance sheets, manage factory costs as output climbs, and recruit the best talent.',
  misconceptions: [
    { misconception: 'Sales includes marketing because salespeople directly collect customer cash.', correction: 'Marketing is the broad strategic umbrella that INCLUDES personal selling as one execution tool.' },
    { misconception: 'Carriage outwards is a direct trading expense because it involves physical goods.', correction: 'Carriage inwards is direct (Trading A/c); carriage outwards is an indirect distribution expense (P&L A/c).' },
    { misconception: 'The 7-step selling process is just unstructured casual conversation.', correction: 'It is a deliberate, structured sequence: Prospecting, Pre-approach, Approach, Presentation, Objections, Closing, Follow-up.' },
    { misconception: 'Good communication alone covers all salesman qualities.', correction: 'The syllabus classifies 5 distinct categories: Physical, Mental, Social, Psychological, and Vocational.' },
    { misconception: 'The entity concept applies only to incorporated companies.', correction: 'The entity concept applies to all entities including sole proprietorships, separating personal drawings from business funds.' },
    { misconception: 'Prudence means intentionally hiding or understating profits.', correction: 'Prudence requires providing for anticipated losses while recognizing gains only when realized.' },
    { misconception: 'Supervisor salary is direct labour because they stand near the machines.', correction: 'Traceability to a single unit defines direct cost; supervisors oversee many batches, making them indirect.' },
    { misconception: 'Fixed costs never change under any volume of production.', correction: 'Fixed costs remain constant only within a relevant range; exceeding capacity causes stepped increases.' },
    { misconception: 'HRM is just a modern synonym for routine payroll processing.', correction: 'Personnel Management was administrative and reactive; HRM is proactive, developmental, and strategic.' },
    { misconception: 'Recruitment chooses the best candidate for the company.', correction: 'Recruitment generates the applicant pool; Selection chooses the candidate from the pool.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the primary objective of Personal Selling?', options: ['Mass broadcast', 'Two-way interactive conversion', 'Silent display', 'Tax compliance'], correctIndex: 1 },
    { question: 'Which account receives the balancing figure from the Trading Account?', options: ['Balance Sheet', 'Profit & Loss Account', 'Trial Balance', 'Cash Book'], correctIndex: 1 },
    { question: 'Which principle keeps assets at acquisition price on going concern basis?', options: ['Historical Cost', 'Full Disclosure', 'Matching', 'Prudence'], correctIndex: 0 },
    { question: 'What is the nature of direct material in cost behavior?', options: ['Fixed', 'Variable', 'Semi-fixed', 'Stepped'], correctIndex: 1 },
    { question: 'Campus placement at IIT Kharagpur is which source of recruitment?', options: ['Internal', 'External', 'Statutory Transfer', 'Promotion'], correctIndex: 1 },
    { question: 'Which statement correctly defines Gross Profit?', options: ['Sales - Total Expenses', 'Sales - Cost of Goods Sold', 'Net Profit + Capital', 'Purchases - Closing Stock'], correctIndex: 1 },
    { question: 'Which rule applies to nominal accounts?', options: ['Debit receiver, Credit giver', 'Debit what comes in, Credit what goes out', 'Debit expenses/losses, Credit incomes/gains', 'Debit capital, Credit assets'], correctIndex: 2 },
    { question: 'What happens to unit fixed cost when output doubles within capacity?', options: ['It doubles', 'It halves', 'It stays constant', 'It drops to zero'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates thorough understanding of the 7-step selling pipeline, salesman qualities, GAAP concepts, trial balance mechanics, cost classification by nature/behavior, and HRM recruitment.',
};

const EXPLORATION_STEPS = [
  {
    title: '1. The 7-Step Personal Selling Pipeline',
    instruction: 'Click on each milestone of the personal selling funnel to observe an LIC / Eureka Forbes agent in action.',
    interactionType: 'click-pipeline',
    nodeId: NODE_C10_COMMAPP_011,
  },
  {
    title: '2. Accounting Duality & Financial Statements',
    instruction: 'Adjust the Revenue and Cost sliders to see live Gross Profit, Net Profit, and Balance Sheet synchronization.',
    interactionType: 'slider-accounting',
    nodeId: NODE_C10_COMMAPP_016,
  },
  {
    title: '3. Cost Behavior & Spreading Effect Simulator',
    instruction: 'Scale production volume from 500 to 5,000 units and observe the dramatic drop in Fixed Cost Per Unit.',
    interactionType: 'slider-cost',
    nodeId: NODE_C10_COMMAPP_018,
  },
  {
    title: '4. Direct vs Indirect Cost Matrix',
    instruction: 'Click each production expense item to classify it as Direct (Trading A/c) or Indirect (Overhead).',
    interactionType: 'click-costs',
    nodeId: NODE_C10_COMMAPP_017,
  },
  {
    title: '5. HRM Strategic Recruitment Sourcing',
    instruction: 'Switch between Internal vs External sourcing to compare speed, cost, fresh skills, and morale.',
    interactionType: 'toggle-recruitment',
    nodeId: NODE_C10_COMMAPP_020,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Vikas Enterprises increases monthly inverter production from 1,000 to 4,000 units, what will happen to the factory building rent cost PER UNIT?',
    options: [
      'It will quadruple because larger volume strains building space.',
      'It will drop to exactly one-fourth of its initial per-unit cost.',
      'It will remain constant per unit like raw materials.',
      'Total factory rent will drop to zero.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Production Units slider to 4,000 on the graph and watch the per-unit rent curve decline.',
    nodeId: NODE_C10_COMMAPP_018,
  },
  {
    question: 'Predict: If closing stock is omitted from the credit side of the Trading Account, what is the immediate impact on Gross Profit?',
    options: [
      'Gross Profit will be severely understated because Cost of Goods Sold is overstated.',
      'Gross Profit will be overstated by double the closing stock value.',
      'Gross Profit is unaffected because closing stock is only an asset on the Balance Sheet.',
      'Net Profit will increase automatically.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Toggle the Closing Stock credit in the simulation to verify the Gross Profit variance.',
    nodeId: NODE_C10_COMMAPP_016,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about Total Variable Cost versus Variable Cost Per Unit as output scales?',
    observableOptions: [
      'Total variable cost rises linearly with output, while variable cost per unit remains constant.',
      'Both total variable cost and per-unit variable cost decline to zero.',
      'Total variable cost stays flat while per-unit variable cost skyrockets.',
      'Variable costs behave identically to fixed building rent.',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_COMMAPP_018,
  },
  {
    question: 'What happens to the Balance Sheet when Net Profit increases in the Profit & Loss Account?',
    observableOptions: [
      'It creates an unavoidable discrepancy between assets and liabilities.',
      'Net profit transfers directly into Capital on the Liabilities side, keeping the balance sheet in perfect tally.',
      'It reduces total assets by the amount of income tax paid.',
      'It converts long-term debt into equity automatically.',
    ],
    correctIndex: 1,
    nodeId: NODE_C10_COMMAPP_016,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Consultant Capstone: Optimize a Pune Electronics Factory',
  description: 'Apply your combined understanding of sales, accounting, costing, and HRM to analyze a real-world enterprise situation:',
  steps: [
    'Map out the 7-step sales demonstration protocol for high-end home inverters.',
    'Formulate the Trading and P&L account to determine break-even gross margin.',
    'Apportion ₹15,00,000 factory overheads between Assembly and Packaging on machine hours.',
    'Formulate a job advertisement for 10 Regional Sales Officers under the Employment Exchanges Act.',
  ],
};

export function C10_CommerceAppSalesSellingProcessSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['commapp'] || { name: 'Commerce Applications', emoji: '💼', color: 'blue' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant Exploration Interactive State
  const [selectedSalesStep, setSelectedSalesStep] = useState<number>(0);
  const [exploreUnits, setExploreUnits] = useState<number>(1000);
  const [exploreSalesPrice, setExploreSalesPrice] = useState<number>(5000);
  const [exploreVarCost, setExploreVarCost] = useState<number>(2500);
  const [exploreFixedCost, setExploreFixedCost] = useState<number>(1000000);
  const [selectedCostCategory, setSelectedCostCategory] = useState<string | null>(null);
  const [recruitmentSourceTab, setRecruitmentSourceTab] = useState<'internal' | 'external'>('internal');

  // Predict & Observation State
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [, setObservationIndex] = useState(-1);

  // Reflection responses
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Difficulty & BKT
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

  // Drag & Sort & Input State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered challenges based on adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Initial mount: check existing mastery
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adapt difficulty when BKT state updates
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Live Canvas 2D Animation Loop for production metrics
  useEffect(() => {
    if (phase !== 'explore' && phase !== 'sandbox' && phase !== 'challenge') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Dynamic wave depicting factory rhythm & cash velocity
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#38bdf8';
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x + tick * 2) * 0.04) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Pulsing node
      const pulseX = (tick * 2) % canvas.width;
      const pulseY = canvas.height / 2 + Math.sin((pulseX + tick * 2) * 0.04) * 8;
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // Live Derived Cost Data for charts
  const costChartData = useMemo(() => {
    const data = [];
    for (let u = 500; u <= 5000; u += 500) {
      const fixedTotal = exploreFixedCost;
      const varTotal = exploreVarCost * u;
      const totalCost = fixedTotal + varTotal;
      const fixedPerUnit = Math.round(fixedTotal / u);
      const varPerUnit = exploreVarCost;
      const totalPerUnit = fixedPerUnit + varPerUnit;
      data.push({
        units: u,
        fixedTotal,
        varTotal,
        totalCost,
        fixedPerUnit,
        varPerUnit,
        totalPerUnit,
      });
    }
    return data;
  }, [exploreFixedCost, exploreVarCost]);

  // Live Financial Statements
  const financialTotals = useMemo(() => {
    const totalRevenue = exploreUnits * exploreSalesPrice;
    const directMaterial = exploreUnits * (exploreVarCost * 0.7);
    const directWages = exploreUnits * (exploreVarCost * 0.3);
    const cogs = directMaterial + directWages;
    const grossProfit = totalRevenue - cogs;
    const indirectRent = exploreFixedCost * 0.6;
    const indirectSalaries = exploreFixedCost * 0.4;
    const totalIndirect = indirectRent + indirectSalaries;
    const netProfit = grossProfit - totalIndirect;

    return {
      totalRevenue,
      directMaterial,
      directWages,
      cogs,
      grossProfit,
      indirectRent,
      indirectSalaries,
      totalIndirect,
      netProfit,
      closingStock: 250000,
      capital: 3000000,
      adjustedCapital: 3000000 + netProfit,
      fixedAssets: 2000000,
      currentAssets: 1000000 + netProfit,
    };
  }, [exploreUnits, exploreSalesPrice, exploreVarCost, exploreFixedCost]);

  // Escalating hints handler
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
      speechManager.speak('Let us study the complete step-by-step solution.');
    }
  }, [hintCount, challenge]);

  // Reset auto-hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Discovery answer handler
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate! Personal selling converts individual prospects.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // Phase Navigation Handlers
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration! Manipulate the parameters to discover core commerce dynamics.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('You are now in Free Exploration. Experiment with all variables without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the competency challenges. Read each scenario carefully.');
  }, []);

  // Exploration Step Navigation
  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('tap');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('tap');
  }, []);

  // Prediction & Observation Handlers
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Now adjust the slider to verify your hypothesis!');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation! Notice how the spreading effect works.' : 'Observe the curves closely.');
  }, []);

  // Complete Simulation Handler
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding! You have completed the comprehensive Commerce Applications simulation.');
  }, [errors, onComplete]);

  // Next Challenge Handler
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

  // Main Answer Validation
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
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Spot on! Excellent deduction.');
        setShowConfetti(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(updatedSrs));
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
          speechManager.speak('Let us analyze the principles behind this question.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  // Drag Handlers
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isMatch) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  // Sort Handlers
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
    const answer =
      sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // Construct Parts Handlers
  const handleAddPart = useCallback((part: string) => {
    setConstructParts(prev => [...prev, part]);
    audioManager.play('tap');
  }, []);

  const handleRemovePart = useCallback((idx: number) => {
    setConstructParts(prev => prev.filter((_, i) => i !== idx));
    audioManager.play('pop');
  }, []);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Personal Selling 7 Steps Data
  const sellingStepsData = [
    { title: '1. Prospecting', subtitle: 'Identify Leads', desc: 'Scanning housing directories or databases for potential policyholders/appliance buyers with need and ability to pay.' },
    { title: '2. Pre-approach', subtitle: 'Research', desc: 'Gathering background intelligence (income, existing systems, family size) before making initial contact.' },
    { title: '3. Approach', subtitle: 'First Contact', desc: 'Meeting the prospect, introducing credentials, establishing immediate rapport, and setting the demo agenda.' },
    { title: '4. Presentation', subtitle: 'Demonstration', desc: 'Demonstrating product capabilities (e.g. UV water filtration or inverter battery efficiency) and ROI.' },
    { title: '5. Objections', subtitle: 'Handling Doubts', desc: 'Overcoming budget/competitor hesitations with economic facts, warranties, and EMI structures.' },
    { title: '6. Closing', subtitle: 'Securing Order', desc: 'Asking for the formal purchase order, completing order documentation, and obtaining payment.' },
    { title: '7. Follow-up', subtitle: 'Post-Sale Care', desc: 'Ensuring seamless installation, checking customer delight, securing renewals and compounding referrals.' },
  ];

  // Motivational Feedback Helper
  const getMotivationalFeedback = (errs: number) => {
    if (errs === 0) {
      return {
        headline: 'PERFECT SCORE!',
        subtext: 'Flawless Mastery! You demonstrated exceptional understanding across selling procedures, accounting dualities, cost behavior matrices, and HR procurement regulations.',
        badgeColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40',
        srsDays: '7 days',
      };
    }
    if (errs >= 1 && errs <= 3) {
      return {
        headline: 'Great work!',
        subtext: 'Outstanding Competency! You tackled both foundation and advanced analytical scenarios with high proficiency.',
        badgeColor: 'text-blue-400 border-blue-500/40 bg-blue-950/40',
        srsDays: '3 days',
      };
    }
    return {
      headline: 'Do not give up — You WILL get this!',
      subtext: 'Commerce mastery comes with practice. Every wrong turn illuminates a foundational accounting rule or cost behavior principle. Review the step-by-step guides and try again!',
      badgeColor: 'text-amber-400 border-amber-500/40 bg-amber-950/40',
      srsDays: '1 day',
    };
  };

  const motivational = getMotivationalFeedback(errors);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* Top Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-400">ICSE Class 10 Commercial Applications</span>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Indicators */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800" role="tablist" aria-label="Simulation Phases">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <span
              key={p}
              role="tab"
              aria-selected={phase === p}
              aria-label={`Phase: ${p}`}
              className={`px-3 py-1 rounded-xl text-xs font-medium capitalize transition-all ${
                phase === p
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-blue-950/40 via-slate-900 to-indigo-950/40 rounded-3xl border border-blue-800/40 shadow-xl">
            <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold mb-2">
              <span>🎯</span>
              <span>SCENARIO HOOK</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">{SCENARIO.intro}</p>
            <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs md:text-sm text-slate-300 flex items-center gap-3">
              <span className="text-xl">💡</span>
              <span>{SCENARIO.context}</span>
            </div>
          </div>

          <motion.div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Curiosity Hook (Non-Graded)</span>
              <span className="text-xs text-slate-400">Predict to ignite discovery</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-2xl text-left text-sm md:text-base font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-800 hover:border-blue-500 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-700/60 flex items-center justify-center text-xs font-bold mt-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                      <span className="text-emerald-400 font-bold ml-1">✓</span>
                    )}
                    {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && (
                      <span className="text-rose-400 font-bold ml-1">✗</span>
                    )}
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
                <p className={`text-sm flex items-center gap-1.5 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  <span>{discoveryCorrect ? '✓' : '⚠️'}</span>
                  <span>
                    {discoveryCorrect
                      ? 'Spot on! Marketing designs the overall strategy; Personal Selling executes the transaction.'
                      : DISCOVERY_QUESTION.hintAfter}
                  </span>
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Advance to Interactive Exploration Lab"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  <span>Enter Interactive Lab</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Exploration Stepper Card */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Interactive Discovery Lab</span>
                <h2 className="text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
              </div>
              <span className="text-xs font-mono bg-slate-800 px-3 py-1.5 rounded-xl text-slate-300 border border-slate-700">
                Step {currentSlide + 1} / {EXPLORATION_STEPS.length}
              </span>
            </div>

            <p className="text-amber-300 text-sm font-medium flex items-center gap-2">
              <span>👉</span>
              <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
            </p>

            {/* Interactive Visual Canvas Container */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800/80 p-4 min-h-[380px]">
              {/* Slide 0: Personal Selling Funnel Interaction + SVG #1 */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                    {sellingStepsData.map((step, idx) => (
                      <motion.button
                        key={idx}
                        aria-label={`Step ${idx + 1}: ${step.title}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setSelectedSalesStep(idx);
                          audioManager.play('tap');
                        }}
                        className={`p-2.5 rounded-xl text-left border transition-all ${
                          selectedSalesStep === idx
                            ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400'
                        }`}
                      >
                        <span className="text-xs font-bold block">{step.title}</span>
                        <span className="text-[10px] opacity-80">{step.subtitle}</span>
                      </motion.button>
                    ))}
                  </div>

                  <motion.div
                    key={selectedSalesStep}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-5 bg-slate-900/90 rounded-2xl border border-blue-900/50 flex flex-col md:flex-row items-center gap-6"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                      {selectedSalesStep + 1}
                    </div>
                    <div className="space-y-1 flex-1">
                      <span className="text-xs font-bold uppercase text-blue-400 tracking-wider">
                        Personal Selling Execution Stage
                      </span>
                      <h3 className="text-lg font-bold text-white">{sellingStepsData[selectedSalesStep].title}</h3>
                      <p className="text-sm text-slate-300">{sellingStepsData[selectedSalesStep].desc}</p>
                    </div>
                  </motion.div>

                  {/* SVG #1: Selling Pipeline Diagram */}
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">SVG Architecture 1: The 7-Stage Personal Selling Conversion Funnel</span>
                    <svg viewBox="0 0 700 120" className="w-full bg-slate-900 rounded-xl p-2 border border-slate-800" role="img" aria-label="7-Step Personal Selling Pipeline Diagram">
                      {sellingStepsData.map((_, i) => {
                        const width = 85;
                        const x = 10 + i * 98;
                        const isActive = selectedSalesStep === i;
                        return (
                          <g key={i}>
                            <rect
                              x={x}
                              y="25"
                              width={width}
                              height="70"
                              rx="10"
                              fill={isActive ? '#2563eb' : '#1e293b'}
                              stroke={isActive ? '#60a5fa' : '#334155'}
                              strokeWidth={isActive ? '2' : '1'}
                            />
                            <text x={x + width / 2} y="55" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                              Stage {i + 1}
                            </text>
                            <text x={x + width / 2} y="72" textAnchor="middle" fill={isActive ? '#dbeafe' : '#94a3b8'} fontSize="8">
                              {['Prospect', 'Research', 'Greet', 'Demo', 'Objections', 'Close', 'Follow-up'][i]}
                            </text>
                            {i < 6 && (
                              <path
                                d={`M ${x + width + 2} 60 L ${x + width + 10} 60`}
                                stroke="#64748b"
                                strokeWidth="2"
                              />
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>
              )}

              {/* Slide 1: Live Financial Statements & Duality + SVG #2 */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400 block mb-1" htmlFor="prod-units-slider">Production Units: {exploreUnits}</label>
                      <input
                        id="prod-units-slider"
                        aria-label={`Production units slider, current: ${exploreUnits}`}
                        type="range"
                        min={200}
                        max={3000}
                        step={100}
                        value={exploreUnits}
                        onChange={e => setExploreUnits(Number(e.target.value))}
                        className="w-full accent-blue-500 cursor-pointer"
                      />
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400 block mb-1" htmlFor="sales-price-slider">Selling Price / Unit: ₹{exploreSalesPrice}</label>
                      <input
                        id="sales-price-slider"
                        aria-label={`Selling price per unit slider, current: ₹${exploreSalesPrice}`}
                        type="range"
                        min={3000}
                        max={8000}
                        step={500}
                        value={exploreSalesPrice}
                        onChange={e => setExploreSalesPrice(Number(e.target.value))}
                        className="w-full accent-blue-500 cursor-pointer"
                      />
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400 block mb-1" htmlFor="fixed-overheads-slider">Fixed Overheads: ₹{exploreFixedCost.toLocaleString()}</label>
                      <input
                        id="fixed-overheads-slider"
                        aria-label={`Fixed overheads slider, current: ₹${exploreFixedCost}`}
                        type="range"
                        min={500000}
                        max={2000000}
                        step={100000}
                        value={exploreFixedCost}
                        onChange={e => setExploreFixedCost(Number(e.target.value))}
                        className="w-full accent-blue-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* SVG #2: Financial Statements Interlinking Flow Diagram */}
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">SVG Architecture 2: Final Accounts Interlinking & Duality Mechanism</span>
                    <svg viewBox="0 0 720 140" className="w-full bg-slate-900 rounded-xl p-3 border border-slate-800" role="img" aria-label="Financial Statements Duality Flowchart">
                      {/* Box 1: Trading A/c */}
                      <rect x="20" y="20" width="200" height="100" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                      <text x="120" y="45" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">TRADING ACCOUNT</text>
                      <text x="120" y="65" textAnchor="middle" fill="#94a3b8" fontSize="10">Sales - Direct COGS</text>
                      <text x="120" y="95" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Bal = Gross Profit</text>

                      {/* Arrow 1 */}
                      <path d="M 220 70 L 260 70" stroke="#f59e0b" strokeWidth="2.5" />
                      <text x="240" y="62" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">GP c/d</text>

                      {/* Box 2: Profit & Loss A/c */}
                      <rect x="260" y="20" width="200" height="100" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      <text x="360" y="45" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">PROFIT & LOSS A/C</text>
                      <text x="360" y="65" textAnchor="middle" fill="#94a3b8" fontSize="10">Gross Profit - Indirect Costs</text>
                      <text x="360" y="95" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Bal = Net Profit</text>

                      {/* Arrow 2 */}
                      <path d="M 460 70 L 500 70" stroke="#38bdf8" strokeWidth="2.5" />
                      <text x="480" y="62" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">NP c/d</text>

                      {/* Box 3: Balance Sheet */}
                      <rect x="500" y="20" width="200" height="100" rx="12" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
                      <text x="600" y="45" textAnchor="middle" fill="#a855f7" fontSize="12" fontWeight="bold">BALANCE SHEET</text>
                      <text x="600" y="65" textAnchor="middle" fill="#94a3b8" fontSize="10">Capital + Net Profit</text>
                      <text x="600" y="95" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Assets = Liabilities + Cap</text>
                    </svg>
                  </div>

                  {/* Financial Accounts Interlinked Table */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                      <span className="font-bold text-amber-400 uppercase">Trading Account</span>
                      <div className="flex justify-between text-slate-300"><span>Total Sales:</span><span>₹{financialTotals.totalRevenue.toLocaleString()}</span></div>
                      <div className="flex justify-between text-slate-400"><span>Direct COGS:</span><span>-₹{financialTotals.cogs.toLocaleString()}</span></div>
                      <div className="flex justify-between font-bold text-emerald-400 pt-1 border-t border-slate-800">
                        <span>Gross Profit:</span><span>₹{financialTotals.grossProfit.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                      <span className="font-bold text-cyan-400 uppercase">Profit & Loss A/c</span>
                      <div className="flex justify-between text-slate-300"><span>Gross Profit b/d:</span><span>₹{financialTotals.grossProfit.toLocaleString()}</span></div>
                      <div className="flex justify-between text-slate-400"><span>Indirect Overheads:</span><span>-₹{financialTotals.totalIndirect.toLocaleString()}</span></div>
                      <div className="flex justify-between font-bold text-emerald-400 pt-1 border-t border-slate-800">
                        <span>Net Profit:</span><span>₹{financialTotals.netProfit.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                      <span className="font-bold text-purple-400 uppercase">Balance Sheet Snapshot</span>
                      <div className="flex justify-between text-slate-300"><span>Capital + Net Profit:</span><span>₹{financialTotals.adjustedCapital.toLocaleString()}</span></div>
                      <div className="flex justify-between text-slate-300"><span>Total Assets:</span><span>₹{(financialTotals.fixedAssets + financialTotals.currentAssets).toLocaleString()}</span></div>
                      <div className="flex justify-between font-bold text-emerald-400 pt-1 border-t border-slate-800">
                        <span>Equation Tallies:</span><span>✓ Balanced</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 2: Cost Behavior & Spreading Effect Graph */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* Predict-Then-Check Section */}
                  {!predictionMade && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-800/50 space-y-2">
                      <span className="text-xs font-bold text-amber-400 uppercase">Scientific Prediction</span>
                      <p className="text-sm text-white font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <button
                            key={i}
                            aria-label={`Prediction Option ${i + 1}: ${opt}`}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left text-xs bg-slate-900 rounded-xl border border-slate-700 hover:border-blue-400 text-slate-200"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {predictionMade && !predictionVerified && (
                    <div className="p-2.5 bg-blue-950/40 border border-blue-800 rounded-xl text-xs text-blue-300 flex items-center justify-between">
                      <span>{PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                      <button
                        aria-label="Verify hypothesis with simulation data"
                        onClick={() => {
                          setPredictionVerified(true);
                          audioManager.play('chime');
                        }}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg font-bold"
                      >
                        ✓ Verified!
                      </button>
                    </div>
                  )}

                  {/* Recharts Bar Chart for Cost Behaviour */}
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={costChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="units" stroke="#94a3b8" fontSize={10} />
                        <YAxis stroke="#94a3b8" fontSize={10} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                        />
                        <Bar dataKey="fixedPerUnit" name="Fixed Cost / Unit" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="varPerUnit" name="Variable Cost / Unit" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Observation Question */}
                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-xs text-white font-semibold">Observation Check: {OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <button
                            key={i}
                            aria-label={`Observation Option ${i + 1}: ${opt}`}
                            onClick={() => handleObservation(i)}
                            className="p-2 text-left text-xs bg-slate-800/80 rounded-lg hover:bg-slate-700 text-slate-300"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Slide 3: Direct vs Indirect Cost Matrix + SVG #3 */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* SVG #3: Cost Hierarchy & Apportionment Architecture */}
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">SVG Architecture 3: Cost Elements Classification & Prime Cost Hierarchy</span>
                    <svg viewBox="0 0 720 130" className="w-full bg-slate-900 rounded-xl p-2 border border-slate-800" role="img" aria-label="Cost Elements and Apportionment Diagram">
                      {/* Direct Costs Box */}
                      <rect x="15" y="15" width="210" height="95" rx="10" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
                      <text x="120" y="38" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">DIRECT COSTS (Prime Cost)</text>
                      <text x="120" y="60" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Direct Material (Raw Iron/Flour)</text>
                      <text x="120" y="78" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Direct Labour (Machine Operator)</text>
                      <text x="120" y="96" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">→ Traced to 1 Single Cost Unit</text>

                      {/* Plus Symbol */}
                      <text x="240" y="68" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="bold">+</text>

                      {/* Overheads Box */}
                      <rect x="255" y="15" width="225" height="95" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                      <text x="367" y="38" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">INDIRECT COSTS (Overheads)</text>
                      <text x="367" y="60" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Factory: Supervisor Wages, Rent</text>
                      <text x="367" y="78" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Office & Admin: Salaries, Audit</text>
                      <text x="367" y="96" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">→ Apportioned on Equitable Basis</text>

                      {/* Equals Symbol */}
                      <text x="495" y="68" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="bold">=</text>

                      {/* Total Cost Box */}
                      <rect x="510" y="15" width="195" height="95" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                      <text x="607" y="38" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">TOTAL COST OF SALES</text>
                      <text x="607" y="65" textAnchor="middle" fill="#cbd5e1" fontSize="9">Prime Cost + Works Overhead</text>
                      <text x="607" y="85" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">+ Admin &amp; Selling Expenses</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'dm', title: 'Iron Ore / Flour', type: 'Direct Material', cat: 'direct', place: 'Trading A/c (COGS)' },
                      { id: 'dl', title: 'Furnace / Assembly Wages', type: 'Direct Labour', cat: 'direct', place: 'Trading A/c (Direct Wages)' },
                      { id: 'im', title: 'Machine Lubricants', type: 'Indirect Material', cat: 'indirect', place: 'P&L A/c (Factory Overhead)' },
                      { id: 'il', title: 'Supervisor Salary', type: 'Indirect Labour', cat: 'indirect', place: 'P&L A/c (Factory Overhead)' },
                    ].map(cost => (
                      <motion.button
                        key={cost.id}
                        aria-label={`Cost Item: ${cost.title}, Classified as: ${cost.type}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedCostCategory(cost.id);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          selectedCostCategory === cost.id
                            ? 'bg-blue-600 border-blue-400 text-white shadow-lg'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xs font-bold block">{cost.title}</span>
                        <span className="text-[10px] text-blue-300 block mt-0.5">{cost.type}</span>
                        <span className="text-[9px] text-slate-400 block mt-1">{cost.place}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
                    <span className="font-bold text-amber-400 uppercase block">The Traceability Test</span>
                    <p>
                      <strong>Direct Costs:</strong> Economically traced to a SINGLE cost unit (e.g. titanium pigment in 1L Asian Paint, milk in 1L Amul packet).
                    </p>
                    <p>
                      <strong>Indirect Costs:</strong> Shared across multiple products and departments; must be apportioned on an equitable basis like floor area, labour hours, or machine hours.
                    </p>
                  </div>
                </div>
              )}

              {/* Slide 4: Strategic Recruitment Sourcing + SVG #4 */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  {/* SVG #4: HRM Strategic Procurement Pipeline */}
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">SVG Architecture 4: Modern HRM Procurement & Selection Funnel</span>
                    <svg viewBox="0 0 720 120" className="w-full bg-slate-900 rounded-xl p-2 border border-slate-800" role="img" aria-label="HRM Recruitment and Selection Funnel Diagram">
                      <polygon points="20,15 700,15 540,105 180,105" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
                      
                      <text x="360" y="38" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">
                        1. RECRUITMENT: Stimulate &amp; Attract Pool (Internal Transfers + External Portals / Exchanges)
                      </text>
                      
                      <line x1="100" y1="52" x2="620" y2="52" stroke="#334155" strokeWidth="1" strokeDasharray="4 2" />
                      
                      <text x="360" y="70" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">
                        2. SELECTION: Screening Tests, Interviews, Reference Checks (Elimination Filter)
                      </text>
                      
                      <line x1="150" y1="82" x2="570" y2="82" stroke="#334155" strokeWidth="1" strokeDasharray="4 2" />
                      
                      <text x="360" y="98" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">
                        3. PLACEMENT &amp; INDUCTION: Right Person in Right Job with Cultural Orientation
                      </text>
                    </svg>
                  </div>

                  <div className="flex gap-2">
                    <button
                      aria-label="View internal recruitment sources"
                      onClick={() => {
                        setRecruitmentSourceTab('internal');
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        recruitmentSourceTab === 'internal'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      Internal Sources (Promotion / Transfer)
                    </button>
                    <button
                      aria-label="View external recruitment sources"
                      onClick={() => {
                        setRecruitmentSourceTab('external');
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        recruitmentSourceTab === 'external'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      External Sources (Campus / Naukri / Exchange)
                    </button>
                  </div>

                  <motion.div
                    key={recruitmentSourceTab}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs"
                  >
                    <div className="p-4 bg-emerald-950/30 rounded-2xl border border-emerald-800/40 space-y-2">
                      <span className="font-bold text-emerald-400 uppercase block">✓ Advantages</span>
                      {recruitmentSourceTab === 'internal' ? (
                        <ul className="space-y-1 text-slate-300 list-disc list-inside">
                          <li>Highly economical — no advertising or headhunter agency fees.</li>
                          <li>Boosts employee morale and provides clear career progression.</li>
                          <li>Zero onboarding friction — candidate is already familiar with culture.</li>
                        </ul>
                      ) : (
                        <ul className="space-y-1 text-slate-300 list-disc list-inside">
                          <li>Brings fresh skills, contemporary ideas, and competitive innovation.</li>
                          <li>Vastly wider talent pool across 50M+ candidates (Naukri.com).</li>
                          <li>Mandatory statutory compliance via Employment Exchanges Act, 1959.</li>
                        </ul>
                      )}
                    </div>

                    <div className="p-4 bg-rose-950/30 rounded-2xl border border-rose-800/40 space-y-2">
                      <span className="font-bold text-rose-400 uppercase block">✗ Disadvantages &amp; Trade-offs</span>
                      {recruitmentSourceTab === 'internal' ? (
                        <ul className="space-y-1 text-slate-300 list-disc list-inside">
                          <li>Causes organizational inbreeding with no influx of fresh perspectives.</li>
                          <li>Limited talent pool strictly confined to existing roster.</li>
                          <li>Creates a vacancy cascade below the promoted employee.</li>
                        </ul>
                      ) : (
                        <ul className="space-y-1 text-slate-300 list-disc list-inside">
                          <li>Substantially higher cost and lengthy selection cycle.</li>
                          <li>Can demotivate existing associates if they feel bypassed.</li>
                          <li>Uncertain cultural fit requiring extensive training investment.</li>
                        </ul>
                      )}
                    </div>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Slide Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              <motion.button
                aria-label="Go to previous exploration step"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl disabled:opacity-40"
              >
                ← Previous
              </motion.button>
              <div className="flex gap-1.5" role="tablist" aria-label="Step dots">
                {EXPLORATION_STEPS.map((_, i) => (
                  <div
                    key={i}
                    role="tab"
                    aria-selected={currentSlide === i}
                    aria-label={`Slide ${i + 1}`}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentSlide === i ? 'bg-blue-500 scale-125' : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  aria-label="Go to next exploration step"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextSlide}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg"
                >
                  Next Step →
                </motion.button>
              ) : (
                <motion.button
                  aria-label="Enter freeplay sandbox mode"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg"
                >
                  Enter Sandbox Mode →
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY / SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Zero-Stakes Sandbox</span>
                <h2 className="text-xl font-bold text-white">Interactive Production &amp; Financial Workbench</h2>
              </div>
              <motion.button
                aria-label="Proceed to graded competency challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-2xl shadow-lg shadow-emerald-600/30"
              >
                Ready for Challenges! →
              </motion.button>
            </div>

            <p className="text-slate-400 text-xs">
              Freely drag all sliders to see how live sales volume, fixed overheads, and per-unit costs interact across the entire income statement and cost curves.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400" htmlFor="sb-units-slider">Monthly Units: {exploreUnits}</label>
                <input
                  id="sb-units-slider"
                  aria-label={`Sandbox Monthly Units slider, current: ${exploreUnits}`}
                  type="range"
                  min={500}
                  max={5000}
                  step={100}
                  value={exploreUnits}
                  onChange={e => setExploreUnits(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400" htmlFor="sb-price-slider">Price / Unit: ₹{exploreSalesPrice}</label>
                <input
                  id="sb-price-slider"
                  aria-label={`Sandbox Price per unit slider, current: ₹${exploreSalesPrice}`}
                  type="range"
                  min={3000}
                  max={8000}
                  step={200}
                  value={exploreSalesPrice}
                  onChange={e => setExploreSalesPrice(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400" htmlFor="sb-var-slider">Variable / Unit: ₹{exploreVarCost}</label>
                <input
                  id="sb-var-slider"
                  aria-label={`Sandbox Variable cost per unit slider, current: ₹${exploreVarCost}`}
                  type="range"
                  min={1500}
                  max={4000}
                  step={100}
                  value={exploreVarCost}
                  onChange={e => setExploreVarCost(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400" htmlFor="sb-fixed-slider">Fixed Rent &amp; Salaries: ₹{(exploreFixedCost / 100000).toFixed(1)}L</label>
                <input
                  id="sb-fixed-slider"
                  aria-label={`Sandbox Fixed overheads slider, current: ₹${exploreFixedCost}`}
                  type="range"
                  min={500000}
                  max={2500000}
                  step={100000}
                  value={exploreFixedCost}
                  onChange={e => setExploreFixedCost(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Real-time Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Gross Revenue</span>
                <p className="text-sm md:text-base font-bold text-white">₹{financialTotals.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Gross Profit</span>
                <p className="text-sm md:text-base font-bold text-amber-400">₹{financialTotals.grossProfit.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Net Profit</span>
                <p className={`text-sm md:text-base font-bold ${financialTotals.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  ₹{financialTotals.netProfit.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Fixed Cost / Unit</span>
                <p className="text-sm md:text-base font-bold text-cyan-400">
                  ₹{Math.round(exploreFixedCost / exploreUnits).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Header & Adaptive Difficulty Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-3xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </h2>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.85 }}
                  animate={{ scale: 1 }}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : difficulty === 'standard'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {difficulty}
                </motion.span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Mastery: {masteryLevel}</p>
            </div>

            {/* Progress Bar */}
            <div className="w-36 md:w-48">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>Progress</span>
                <span>{Math.round(((currentChallenge + 1) / filteredChallenges.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Dynamic 2D Canvas Indicator */}
          <canvas ref={canvasRef} width={500} height={24} className="w-full rounded-xl opacity-60 bg-slate-950" />

          {/* Main Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-3xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'bg-slate-900/90 border-slate-800 shadow-2xl'
            }`}
          >
            <h3 className="text-base md:text-lg font-semibold text-white mb-4 leading-relaxed">
              {challenge.question}
            </h3>

            {/* 1. MCQ Style Rendering */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-3.5 rounded-2xl text-xs md:text-sm font-medium transition-all border ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-800 hover:border-blue-500 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-700/80 flex items-center justify-center text-xs font-bold mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {showExplanation && i === challenge.correctIndex && (
                          <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* 2. Drag-Label Style Rendering */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-semibold cursor-grab shadow-md active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      ⠿ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'box_trading', label: 'Trading Account' },
                    { id: 'box_pl', label: 'Profit & Loss A/c' },
                    { id: 'box_bs_asset', label: 'Balance Sheet: Asset' },
                    { id: 'box_bs_liab', label: 'Balance Sheet: Liability' },
                  ].map(target => (
                    <div
                      key={target.id}
                      aria-label={`Drop target for ${target.label}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px] text-center"
                    >
                      <span className="text-[10px] text-slate-400 uppercase font-bold">{target.label}</span>
                      <span className="text-xs font-semibold text-blue-300 mt-2">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify dragged label mappings"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* 3. Drag-Sort Style Rendering */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, idx) => (
                  <motion.div
                    key={idx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Position ${idx + 1}: ${item}. Drag to reorder`}
                    draggable
                    onDragStart={() => handleDragStart(String(idx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, idx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-800 rounded-2xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <span>{idx + 1}. {item}</span>
                    <span className="text-slate-400 text-xs flex items-center gap-1">↕ Reorder</span>
                  </motion.div>
                ))}
                <motion.button
                  aria-label="Confirm item order"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs"
                >
                  Confirm Order
                </motion.button>
              </div>
            )}

            {/* 4. Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    aria-label={`Enter numerical value in ${challenge.unit || 'units'}`}
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-blue-500 outline-none w-48"
                  />
                  <span className="text-slate-400 text-sm font-semibold">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit numeric answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs"
                  >
                    Check Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. Construct Style Rendering */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400 block">{challenge.validationHint}</span>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part: ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddPart(part)}
                      className="px-3 py-1.5 bg-slate-800 border border-slate-700 hover:border-blue-500 rounded-xl text-xs text-slate-200"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-900/60 border border-blue-600 rounded-lg text-xs text-blue-200 flex items-center gap-2">
                      {part}
                      <button aria-label={`Remove part: ${part}`} onClick={() => handleRemovePart(i)} className="text-rose-400 hover:text-rose-300">✕</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click blocks above to construct sequence</span>}
                </div>

                <motion.button
                  aria-label="Submit constructed structure"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs"
                >
                  Submit Structure
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-5 bg-gradient-to-br from-amber-950/30 to-slate-900 border border-amber-800/40 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase">
                  <span>📖</span>
                  <span>Step-by-Step Concept Breakdown</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-300 leading-relaxed"
                    >
                      <strong className="text-amber-400">{idx + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Reveal next step in explanation"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-amber-600/30 border border-amber-500/50 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Proceed to next challenge or final screen"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30 ml-auto"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Sim →' : 'Next Challenge →'}
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
          <div className="p-6 bg-gradient-to-br from-blue-950/50 via-slate-900 to-emerald-950/50 rounded-3xl border border-blue-700/50 text-center space-y-3">
            <span className="text-4xl" role="img" aria-label="Trophy">🏆</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Mastery Simulation Completed!</h2>
            <div className="flex justify-center gap-6 pt-2">
              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 w-32">
                <span className="text-[10px] uppercase text-slate-400 block">Final Score</span>
                <span className="text-xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 w-32">
                <span className="text-[10px] uppercase text-slate-400 block">Mastery Tier</span>
                <span className="text-xl font-bold text-blue-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK SECTION (Explicit threshold-based rubric) */}
          <div className={`p-6 rounded-3xl border ${motivational.badgeColor}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-bold">{motivational.headline}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full border border-current font-bold uppercase">
                {errors === 0 ? '0 Errors' : `${errors} Mistake${errors > 1 ? 's' : ''}`}
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
              {motivational.subtext}
            </p>
          </div>

          {/* SPACED REPETITION SRS VISIBILITY CARD */}
          <div className="p-6 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-blue-950/40 rounded-3xl border border-indigo-700/50 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">📅</span>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">SM-2 Spaced Repetition Schedule</span>
              </div>
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-indigo-600/30 border border-indigo-400/40 text-indigo-200">
                Next Review: {motivational.srsDays}
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Based on your error rate ({errors} mistake{errors === 1 ? '' : 's'}), your optimal memory retention interval is set to{' '}
              <strong className="text-white font-bold">{motivational.srsDays}</strong>. Review this topic in {motivational.srsDays} to ensure long-term mastery under ICSE board conditions.
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
              <div className={`p-2.5 rounded-xl border ${errors === 0 ? 'bg-emerald-950/60 border-emerald-500 font-bold text-emerald-300' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <div>0 Errors</div>
                <div className="text-[10px] mt-0.5 opacity-80">Review in 7 days</div>
              </div>
              <div className={`p-2.5 rounded-xl border ${errors >= 1 && errors <= 3 ? 'bg-blue-950/60 border-blue-500 font-bold text-blue-300' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <div>1–3 Errors</div>
                <div className="text-[10px] mt-0.5 opacity-80">Review in 3 days</div>
              </div>
              <div className={`p-2.5 rounded-xl border ${errors >= 4 ? 'bg-amber-950/60 border-amber-500 font-bold text-amber-300' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <div>4+ Errors</div>
                <div className="text-[10px] mt-0.5 opacity-80">Review in 1 day</div>
              </div>
            </div>
          </div>

          {/* REFLECTION SECTION (Metacognition & Real-World Application) */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase">
              <span>🤔</span>
              <span>Metacognitive Reflection &amp; Real-Life Transfer</span>
            </div>
            <h3 className="text-base font-bold text-white">Consolidate Your Commerce Mastery</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-amber-400 block" htmlFor="ref-surprising">
                  What was the most surprising thing you learned?
                </label>
                <textarea
                  id="ref-surprising"
                  aria-label="What was the most surprising thing you learned?"
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g. How fixed cost per unit declines dramatically as production volume scales (the spreading effect)..."
                  className="w-full h-24 p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-cyan-400 block" htmlFor="ref-explain">
                  How would you explain this to a friend?
                </label>
                <textarea
                  id="ref-explain"
                  aria-label="How would you explain this to a friend?"
                  value={reflectionAnswers.explain}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g. Marketing creates the overall brand demand, but Personal Selling is the 7-step handshake that closes the deal..."
                  className="w-full h-24 p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-emerald-400 block" htmlFor="ref-real-life">
                  Where in real life might you use this?
                </label>
                <textarea
                  id="ref-real-life"
                  aria-label="Where in real life might you use this?"
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g. When auditing a small business balance sheet or pricing products for a campus startup..."
                  className="w-full h-24 p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 outline-none focus:border-blue-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Misconceptions Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-3xl border border-rose-800/40 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider">Targeted Misconception Profile</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-semibold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Capstone Real-World Project */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase">
              <span>💼</span>
              <span>{REAL_WORLD_ACTIVITY.title}</span>
            </div>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">{i + 1}.</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Persistent Feedback Elements */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Stage Mastered Successfully!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C10_CommerceAppSalesSellingProcessSim;
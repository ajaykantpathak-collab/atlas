'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import gsap from 'gsap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// ─── NAMED NODE CONSTANTS (CISCE Class 10 Civics) ──────────────────────────────
const NODE_C10_HISTCIV_001 = 'c10_histciv_001';
const NODE_C10_HISTCIV_002 = 'c10_histciv_002';
const NODE_C10_HISTCIV_003 = 'c10_histciv_003';
const NODE_C10_HISTCIV_004 = 'c10_histciv_004';
const NODE_C10_HISTCIV_005 = 'c10_histciv_005';
const NODE_C10_HISTCIV_006 = 'c10_histciv_006';
const NODE_C10_HISTCIV_007 = 'c10_histciv_007';
const NODE_C10_HISTCIV_008 = 'c10_histciv_008';
const NODE_C10_HISTCIV_009 = 'c10_histciv_009';
const NODE_C10_HISTCIV_010 = 'c10_histciv_010';

const ALL_NODE_IDS = [
  NODE_C10_HISTCIV_001,
  NODE_C10_HISTCIV_002,
  NODE_C10_HISTCIV_003,
  NODE_C10_HISTCIV_004,
  NODE_C10_HISTCIV_005,
  NODE_C10_HISTCIV_006,
  NODE_C10_HISTCIV_007,
  NODE_C10_HISTCIV_008,
  NODE_C10_HISTCIV_009,
  NODE_C10_HISTCIV_010,
];

// ─── NARRATIVE SCENARIO ────────────────────────────────────────────────────────
const SCENARIO = {
  title: 'Crisis at the Union Capitol: The Federal Architecture in Action',
  intro: 'A major national policy crisis erupts between the Union Parliament in New Delhi and State Assemblies across India over public health, digital privacy taxation, and concurrent emergency powers.',
  context: 'As Chief Parliamentary Counsel to the Republic of India, you must guide MPs, the Lok Sabha Speaker, the Rajya Sabha Chairman, and the President through constitutional powers, legislative procedures, and checks & balances.',
};

// ─── DISCOVERY HOOK ────────────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'During a national health crisis, Parliament passes a central directive on hospital data under the Concurrent List. State A issues a conflicting local rule under the State List. Which directive prevails?',
  options: [
    'The State rule always prevails on local public health',
    'The Central law prevails under Article 254 (Doctrine of Repugnancy)',
    'Neither law applies until the Supreme Court holds a referendum',
    'The State Governor unilaterally cancels both laws',
  ],
  correctIndex: 1,
  hintAfter: "Surprised? The Indian Constitution creates a 'quasi-federal' union with a strong unitary bias under Article 254 and Article 248!",
};

// ─── EXPLORATION STEPS (Learn-by-Doing) ─────────────────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: 'Seventh Schedule: Federal Division of Powers',
    instruction: 'Select each constitutional list to inspect its subjects and see which legislative body holds supremacy.',
    interactionType: 'click-parts',
    nodeId: NODE_C10_HISTCIV_001,
  },
  {
    title: 'Lok Sabha vs Rajya Sabha Composition & Quorum',
    instruction: 'Adjust the Attendance Sliders for both Houses to see if Quorum (Article 100: 1/10th strength) is lawfully met.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_HISTCIV_002,
  },
  {
    title: 'Passing a Bill: Ordinary vs Money Bill Pathway',
    instruction: 'Toggle between Ordinary and Money Bill types and step through the legislative readings and Rajya Sabha 14-day limits.',
    interactionType: 'drag-classify',
    nodeId: NODE_C10_HISTCIV_005,
  },
  {
    title: 'Parliamentary Accountability & Motion Simulator',
    instruction: 'Trigger different parliamentary motions (Adjournment, No-Confidence, Anti-Defection) to observe constitutional consequences.',
    interactionType: 'drag-match',
    nodeId: NODE_C10_HISTCIV_004,
  },
  {
    title: 'Presidential Electoral College & Impeachment Bar',
    instruction: 'Configure the voting members of the Electoral College and test the 2/3rd total membership threshold under Article 61.',
    interactionType: 'drag-position',
    nodeId: NODE_C10_HISTCIV_009,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ──────────────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If the Lok Sabha passes a Money Bill and sends it to the Rajya Sabha, what happens if the Rajya Sabha does nothing for 14 days?',
    options: [
      'The Bill dies and must be re-introduced in Lok Sabha',
      'The President calls a Joint Sitting under Article 108',
      'The Bill is automatically deemed passed by both Houses in its original form',
      'The Speaker is removed by the Rajya Sabha Chairman',
    ],
    correctIndex: 2,
    verifyInstruction: 'Select Money Bill in the simulator below and watch the 14-day timer expire to verify the constitutional outcome.',
    nodeId: NODE_C10_HISTCIV_005,
  },
  {
    question: 'Predict: If 15 out of 20 MLAs of Party X split and merge with Party Y in a State Assembly, will they be disqualified under the Tenth Schedule?',
    options: [
      'Yes, all 15 are immediately disqualified because party-switching is strictly banned',
      'No, because at least 2/3rds (75% here) merged, which falls under the legal merger exception',
      'Only the party leader is disqualified while 14 remain',
      'The Governor decides their membership by casting a personal vote',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Defection/Merger slider past 66.7% to observe the Tenth Schedule legal shelter.',
    nodeId: NODE_C10_HISTCIV_004,
  },
];

// ─── OBSERVATION QUESTIONS ───────────────────────────────────────────────────��─
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the Speaker’s casting vote in the Lok Sabha simulation?',
    observableOptions: [
      'The Speaker votes at the very beginning of every bill debate',
      'The Speaker votes only in the event of an exact tie (equality of votes) to preserve status quo',
      'The Speaker has two votes on Money Bills and one on Ordinary Bills',
      'The Speaker votes only when the Prime Minister asks for permission',
    ],
    correctIndex: 1,
    nodeId: NODE_C10_HISTCIV_006,
  },
  {
    question: 'What pattern emerges when comparing the impeachment threshold of the President (Article 61) with a No-Confidence Motion against the Cabinet (Article 75(3))?',
    observableOptions: [
      'Both require a simple majority of members present in the Lok Sabha',
      'Impeachment requires a 2/3rd majority of the TOTAL membership of BOTH Houses, while No-Confidence needs only a simple majority in Lok Sabha',
      'Impeachment requires only the Rajya Sabha, while No-Confidence requires both Houses',
      'No-Confidence requires 362 votes in Lok Sabha whereas impeachment requires only 50 MPs',
    ],
    correctIndex: 1,
    nodeId: NODE_C10_HISTCIV_010,
  },
];

// ─── CHALLENGE INTERFACE ───────────────────────────────────────────────────────
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

// ─── 22 PROGRESSIVE CHALLENGES (Foundation, Standard, Advanced) ────────────────
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C10_HISTCIV_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Where do residuary powers (subjects not mentioned in Union, State, or Concurrent lists) reside under Article 248 of the Indian Constitution?',
    options: ['With the State Legislatures', 'With the Union Parliament (Centre)', 'Shared equally between Panchayats and States', 'With the Supreme Court of India'],
    correctIndex: 1,
    explanation: 'Under Article 248, residuary powers lie exclusively with the Union Parliament. This is a primary pillar of India’s unitary bias.',
    hints: [
      'Think about whether India mirrors the US Tenth Amendment or centralises unlisted matters.',
      'Remember K.C. Wheare’s classification of India as "quasi-federal" with a strong Centre.',
      'Article 248 specifically allocates unlisted legislative powers to Parliament.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C10_HISTCIV_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Following the 104th Constitutional Amendment Act (2019, effective Jan 2020), what is the maximum elected strength of the Lok Sabha?',
    options: ['552 members', '543 members', '550 members', '250 members'],
    correctIndex: 1,
    explanation: 'The 104th Amendment abolished the 2 nominated Anglo-Indian seats under Article 331, making the maximum elected strength 543.',
    hints: [
      'Two nominated seats were discontinued in 2020.',
      'Subtract 2 from the previous maximum of 552/545 (530 state reps + 20 UT reps + 2 nominated).',
      'The current actual and constitutional elected maximum is 543.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C10_HISTCIV_003,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'The Lok Sabha has 543 members. Under Article 100, what is the exact minimum Quorum (in whole MPs) required to conduct House business?',
    correctAnswer: 55,
    tolerance: 0,
    unit: 'MPs',
    explanation: 'Quorum is one-tenth (1/10th) of total membership. 1/10 of 543 = 54.3, which rounds up to 55 MPs.',
    hints: [
      'Article 100 sets quorum as 1/10th of the total House strength.',
      'Divide 543 by 10 and round up to the nearest whole integer.',
      '54.3 rounded up gives 55.',
    ],
  },
  {
    id: 'ch_04',
    nodeId: NODE_C10_HISTCIV_007,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following correctly pairs the minimum age requirement for Lok Sabha vs Rajya Sabha membership?',
    options: [
      'Lok Sabha: 25 years | Rajya Sabha: 30 years',
      'Lok Sabha: 30 years | Rajya Sabha: 25 years',
      'Lok Sabha: 21 years | Rajya Sabha: 35 years',
      'Lok Sabha: 35 years | Rajya Sabha: 35 years',
    ],
    correctIndex: 0,
    explanation: 'Lok Sabha membership requires a minimum age of 25 years (popular house), whereas Rajya Sabha requires 30 years (elder revising chamber).',
    hints: [
      'The directly elected lower house has a younger eligibility threshold.',
      'Rajya Sabha requires 30 years of age.',
      'Lok Sabha requires 25 years, Rajya Sabha 30 years.',
    ],
  },
  {
    id: 'ch_05',
    nodeId: NODE_C10_HISTCIV_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who decides whether a Bill is a Money Bill or an Ordinary Bill under Article 110(3), whose decision is final and non-justiciable?',
    options: ['The Prime Minister', 'The Finance Minister', 'The Speaker of the Lok Sabha', 'The President of India'],
    correctIndex: 2,
    explanation: 'Under Article 110(3), the Speaker of the Lok Sabha has the exclusive and final authority to certify a Money Bill.',
    hints: [
      'This officer presides over the Lower House.',
      'The certification cannot be questioned in court or by the Rajya Sabha.',
      'It is the Speaker of the Lok Sabha.',
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C10_HISTCIV_009,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Who among the following CANNOT vote in the election of the President of India under Article 54?',
    options: [
      'Elected MPs of the Lok Sabha',
      'Elected MLAs of State Legislative Assemblies',
      '12 Nominated Members of the Rajya Sabha',
      'Elected MLAs of the Delhi Legislative Assembly',
    ],
    correctIndex: 2,
    explanation: 'Only ELECTED members vote in the Presidential Electoral College. Nominated members of Parliament and State Legislative Councils are strictly excluded.',
    hints: [
      'Check whether the elector holds an elected mandate or an appointed/nominated seat.',
      'Nominated members of Parliament (e.g. 12 in Rajya Sabha) cannot participate.',
      'The 12 nominated Rajya Sabha members are excluded.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_07',
    nodeId: NODE_C10_HISTCIV_004,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the standard minimum notice period required for an MP to ask a Starred or Unstarred Question during Question Hour?',
    options: ['At least 10 clear days', 'Zero days (no notice required)', '24 hours only', '6 months'],
    correctIndex: 0,
    explanation: 'Starred and unstarred questions require at least 10 clear days notice, whereas Zero Hour matters require no prior notice.',
    hints: [
      'Short notice questions are under 10 days; regular questions require standard notice.',
      'The standard notice cycle is 10 days or more.',
      '10 clear days is the mandatory standard notice.',
    ],
  },
  {
    id: 'ch_08',
    nodeId: NODE_C10_HISTCIV_005,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Drag the legislative terms to their correct positions in the Bill-Passing flow diagram.',
    dragItems: [
      { label: 'First Reading', targetId: 'stage_intro' },
      { label: 'Clause-by-Clause Debate', targetId: 'stage_committee' },
      { label: 'Joint Sitting (Art 108)', targetId: 'stage_deadlock' },
      { label: 'Presidential Assent', targetId: 'stage_assent' },
    ],
    correctMapping: {
      stage_intro: 'First Reading',
      stage_committee: 'Clause-by-Clause Debate',
      stage_deadlock: 'Joint Sitting (Art 108)',
      stage_assent: 'Presidential Assent',
    },
    explanation: 'An Ordinary Bill starts with First Reading (introduction), undergoes Clause-by-Clause debate in Second Reading, may go to a Joint Sitting if deadlocked, and finishes with Presidential Assent.',
    hints: [
      'Introduction occurs at the First Reading.',
      'Amendments and detailed clauses are voted in the Second Reading stage.',
      'Article 108 resolves bicameral deadlocks before final Presidential assent.',
    ],
  },
  {
    id: 'ch_09',
    nodeId: NODE_C10_HISTCIV_005,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does the President have no power to return a Money Bill for reconsideration under Article 111?',
    options: [
      'Because Money Bills are introduced only with the prior recommendation of the President',
      'Because the Supreme Court automatically approves all financial bills beforehand',
      'Because the Rajya Sabha Chairman signs all Money Bills directly into law',
      'Because Money Bills do not require the assent of the President at all',
    ],
    correctIndex: 0,
    explanation: 'Under Article 117(1) & 110, a Money Bill is introduced only on the prior recommendation of the President, so the President cannot return what was previously recommended.',
    hints: [
      'Think about what prerequisite step happens BEFORE a Money Bill is tabled in Lok Sabha.',
      'The President gave prior approval/recommendation for its introduction.',
      'Because the President gave prior recommendation, return for reconsideration is barred.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_10',
    nodeId: NODE_C10_HISTCIV_004,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Arrange the sequence of steps for moving and passing a No-Confidence Motion in the Lok Sabha in proper chronological order.',
    sortItems: [
      'At least 50 MPs stand in support of moving the motion',
      'Speaker admits the motion and fixes date for debate',
      'Multi-day debate concludes with Prime Minister’s reply',
      'Simple majority vote passes motion; entire Council of Ministers resigns',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'A No-Confidence Motion requires 50 MPs to introduce, admission by Speaker, comprehensive floor debate, and if passed by simple majority, collective resignation under Article 75(3).',
    hints: [
      'Introduction needs the backing of 50 MPs first.',
      'The Speaker must admit and schedule debate before speeches occur.',
      'The floor vote and resignation occur at the final culmination.',
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C10_HISTCIV_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Under Article 249, the Rajya Sabha passes a resolution with a 2/3rd majority authorising Parliament to legislate on Agriculture (State List). What is the constitutional justification for granting this exclusive power to the Rajya Sabha?',
    options: [
      'Rajya Sabha represents the States; encroaching on State domain requires consent of the federal chamber',
      'Rajya Sabha has more total MPs than the Lok Sabha',
      'Lok Sabha is constitutionally prohibited from debating agriculture',
      'Agriculture is an unlisted residuary subject',
    ],
    correctIndex: 0,
    explanation: 'Because Rajya Sabha members are elected by State Legislative Assemblies, the Upper House acts as the constitutional custodian of federal autonomy when overriding the State List.',
    hints: [
      'Consider who elects members of the Rajya Sabha.',
      'The Rajya Sabha represents the constituent States of the Union.',
      'Since State autonomy is affected, the federal chamber must grant the 2/3rd authorization.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C10_HISTCIV_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'On a day when 320 MPs are present in the 543-member Lok Sabha, a resolution to remove the Speaker is voted upon under Article 94. What is the MINIMUM number of affirmative votes needed to remove the Speaker?',
    correctAnswer: 272,
    tolerance: 0,
    unit: 'votes',
    explanation: 'Article 94 requires a majority of ALL the then members of the House (an absolute majority: 543 / 2 + 1 = 272), NOT a majority of those present and voting.',
    hints: [
      'Notice the constitutional phrase: "majority of all members of the House".',
      'It does not matter that only 320 MPs are in the chamber; calculate half of 543.',
      '543 divided by 2 is 271.5; rounded up to majority is 272.',
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C10_HISTCIV_003,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How does "Prorogation" fundamentally differ from "Dissolution" of Parliament?',
    options: [
      'Prorogation ends a session without terminating the House; Dissolution ends the life of the Lok Sabha completely',
      'Prorogation dissolves both Houses; Dissolution applies only to Rajya Sabha',
      'Prorogation is ordered by the Speaker; Dissolution is ordered by the Chief Justice',
      'There is no difference; they are synonymous terms for parliamentary recess',
    ],
    correctIndex: 0,
    explanation: 'Prorogation by the President terminates a specific session (pending notices lapse). Dissolution ends the Lok Sabha itself, triggering general elections.',
    hints: [
      'Does the House continue to exist after prorogation?',
      'Rajya Sabha is never dissolved, but its sessions can be prorogued.',
      'Prorogation ends a session; Dissolution terminates the entire House.',
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C10_HISTCIV_004,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Construct the legal formula for lawful party merger under the Tenth Schedule (Anti-Defection Law).',
    availableParts: ['Legislative Strength', '≥ 2/3rd Members', 'Merger with Another Party', 'No Disqualification', 'Speaker Approval'],
    targetState: '≥ 2/3rd Members Legislative Strength Merger with Another Party No Disqualification',
    validationHint: 'Select the fraction of legislators, the entity, the action, and the constitutional outcome.',
    explanation: 'Under paragraph 4 of the Tenth Schedule, if at least 2/3rds of legislators of a party agree to merge with another party, it is deemed a valid merger with no disqualification.',
    hints: [
      'Start with the fraction: "≥ 2/3rd Members".',
      'Include "Legislative Strength", then "Merger with Another Party", and "No Disqualification".',
      'The threshold was raised to 2/3rds by the 91st Amendment Act (2003).',
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C10_HISTCIV_010,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'During Presidential impeachment proceedings under Article 61 in the 543-member Lok Sabha, what is the exact minimum number of affirmative votes needed to pass the impeachment resolution?',
    correctAnswer: 362,
    tolerance: 0,
    unit: 'votes',
    explanation: 'Article 61 requires a two-thirds majority of the TOTAL membership of the House (2/3 of 543 = 362 votes), regardless of attendance on the voting day.',
    hints: [
      'Calculate two-thirds of total membership (543), not those present.',
      '(543 * 2) / 3 = 1086 / 3 = 362.',
      'The required number is exactly 362 votes.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_16',
    nodeId: NODE_C10_HISTCIV_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In State of West Bengal v. Union of India (1962), the Supreme Court evaluated Indian federalism. What was the central finding regarding state sovereignty in India?',
    options: [
      'States possess inherent sovereign rights and may unilaterally secede from the Union',
      'The Indian Constitution is not truly federal in the classic sense; States have no inherent sovereignty and no residuary powers',
      'State Legislatures hold supremacy over Union Parliament on all 3 lists',
      'India is an indestructible union of sovereign independent nations',
    ],
    correctIndex: 1,
    explanation: 'The Supreme Court ruled that Indian States are creatures of the Constitution with no inherent sovereignty, affirming India’s quasi-federal structure with unitary supremacy.',
    hints: [
      'Think about whether Indian states existed as sovereign nations before signing a treaty.',
      'Article 1 specifies "Union of States", not a loose confederation.',
      'The Court held that Indian states have no sovereign immunity against Union legislative power.',
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C10_HISTCIV_006,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In Kihoto Hollohan v. Zachillhu (1992), what did the Supreme Court establish regarding the Speaker’s quasi-judicial decisions under the Tenth Schedule?',
    options: [
      'The Speaker’s decision is completely immune from any court scrutiny forever',
      'The Speaker acts as a tribunal; the decision is subject to judicial review on grounds of mala fide or perversity once an order is passed',
      'The High Court must co-sign all disqualification orders before they take effect',
      'The President replaces the Speaker as the sole defection adjudicator',
    ],
    correctIndex: 1,
    explanation: 'The Supreme Court held that while the Speaker acts as a tribunal, the decision is subject to judicial review for constitutional violations after the formal order is pronounced.',
    hints: [
      'Is any constitutional office completely above judicial review in India?',
      'The basic structure doctrine requires judicial oversight for tribunals.',
      'The Speaker functions as a tribunal whose final rulings can be judicially reviewed.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C10_HISTCIV_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A state government argues that Parliament’s enactment of the Disaster Management Act under the Concurrent List unconstitutionally infringes on State public health autonomy. How does constitutional jurisprudence resolve this?',
    options: [
      'The Central law prevails under Article 254 and national planning entries because national interest overrides state divergence',
      'The State law automatically voids the Central Act inside the state boundaries',
      'Parliament loses its legislative competence during public health crises',
      'The Rajya Sabha must dissolve the state assembly under Article 352',
    ],
    correctIndex: 0,
    explanation: 'Under the Doctrine of Repugnancy (Article 254) and Concurrent List item "social and economic planning", central disaster management frameworks take precedence over conflicting state orders.',
    hints: [
      'Recall how COVID-19 lockdown rules were coordinated between Centre and States.',
      'Article 254 dictates that central law overrides state law in the Concurrent List in case of repugnancy.',
      'Central law prevails under Article 254.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C10_HISTCIV_009,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why did the Constituent Assembly explicitly reject the direct popular election of the President of India?',
    options: [
      'To prevent the President from claiming a competing popular mandate that would destabilise the Prime Minister’s parliamentary authority',
      'Because India did not have paper printing facilities for nationwide presidential ballots in 1950',
      'Because the British monarch remained the official head of state until 1976',
      'To allow the Rajya Sabha Chairman to automatically assume the presidency every 5 years',
    ],
    correctIndex: 0,
    explanation: 'In a Westminster parliamentary model, executive authority belongs to the Council of Ministers headed by the Prime Minister. An indirectly elected President prevents a dual legitimacy crisis.',
    hints: [
      'Think about what would happen if a President claimed "I was directly elected by 600 million people, while the PM only won one constituency".',
      'The Prime Minister is the real executive head; the President is the constitutional ceremonial head.',
      'Indirect election prevents dual power centres and rival mandates.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C10_HISTCIV_010,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the 4 constitutional stages of Presidential Impeachment under Article 61 in exact sequential order.',
    sortItems: [
      'Notice in writing signed by at least 1/4th total members of initiating House with 14 days waiting period',
      'Initiating House debates and passes charge by 2/3rd majority of its TOTAL membership',
      'Second House investigates the charge; President exercises right to appear and defend',
      'Second House passes resolution by 2/3rd majority of its TOTAL membership; President stands removed',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Article 61 mandates: 1/4th notice (14 days) -> 2/3rd total membership in 1st House -> Investigation in 2nd House -> 2/3rd total membership in 2nd House -> Removal.',
    hints: [
      'The 14-day written notice signed by 1/4th members is the initiating trigger.',
      'The originating House must vote by 2/3rd total membership before sending it across.',
      'Investigation and final 2/3rd vote occur in the second House.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C10_HISTCIV_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In the Aadhaar Act (2016) constitutional challenge, why was the Speaker’s certification of the Bill as a Money Bill critically scrutinised by the Supreme Court?',
    options: [
      'Because the Act contained extensive provisions on biometric data regulation and privacy that went beyond the strict taxation/spending definitions of Article 110',
      'Because the President refused to sign the Bill after Lok Sabha passage',
      'Because Money Bills cannot be introduced by Cabinet Ministers',
      'Because the Rajya Sabha had already amended the Bill with a 2/3rd majority',
    ],
    correctIndex: 0,
    explanation: 'The Aadhaar controversy centered on whether non-financial data regulatory clauses could be bundled under Article 110 to bypass the Rajya Sabha’s voting power.',
    hints: [
      'What subjects are strictly permitted in Article 110?',
      'Money Bills are limited to taxes, borrowing, and Consolidated Fund spending.',
      'Biometric privacy and data regulation extend beyond the Article 110 list.',
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C10_HISTCIV_008,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the constitutional authorization path for creating a new All-India Service under Article 312.',
    availableParts: ['Rajya Sabha Resolution', '2/3rd Majority Present & Voting', 'Parliament Enacts Statute', 'Shared Centre-State Cadre', 'Presidential Ordinance'],
    targetState: 'Rajya Sabha Resolution 2/3rd Majority Present & Voting Parliament Enacts Statute Shared Centre-State Cadre',
    validationHint: 'Assemble the initiating House, the voting threshold, the legislative action, and the administrative outcome.',
    explanation: 'Article 312 empowers the Rajya Sabha exclusively to pass a 2/3rd resolution, enabling Parliament to pass legislation creating a new All-India Service serving both Union and States.',
    hints: [
      'Only the Rajya Sabha has this exclusive federal initiation power under Article 312.',
      'The voting requirement is 2/3rd of members present and voting.',
      'Parliament then enacts the law creating the shared cadre.',
    ],
  },
  // ─── Class 10 board-depth additions: federalism diagnostics ───
  {
    id: 'ch_depth_fed_holding_together',
    nodeId: 'c10_civ_cbse_02_003',
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate: "A Holding-Together Federation is inherently less democratic than a Coming-Together Federation."',
    options: [
      'Too sweeping -- holding-together federations (India, Spain) trade equal state status for a strong centre that holds a diverse country together; democracy is judged by how power is shared and accountable, and India\'s states DO have constitutionally guaranteed powers, elected assemblies and real autonomy in State List subjects -- the Union bias is a design choice, not an absence of democracy',
      'True -- only coming-together federations hold elections',
      'False -- India is not a federation at all',
      'True because states in India cannot pass any laws'
    ],
    correctIndex: 0,
    explanation:
      'Coming-together (USA): sovereign states AGREE to unite and keep equal status and strong residual powers. Holding-together (India): one large unit DIVIDES powers internally to accommodate diversity -- often with an asymmetric tilt (special provisions under Articles 371, former Article 370). Evaluation verdict: different designs suit different histories; each can be deeply democratic or deeply flawed depending on practice.',
    hints: [
      'Which formation starts from MANY sovereign units vs ONE big unit?',
      'Democratic = power shared AND accountable, not equal states.',
      'Asymmetry (special provisions) is diversity management.'
    ],
  },
  {
    id: 'ch_depth_fed_three_language',
    nodeId: 'c10_civ_cbse_02_006',
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the Three-Language Formula: does it promote national integration while respecting State autonomy?',
    options: [
      'Balanced verdict -- the formula (mother tongue/regional language + Hindi + English or another Indian language) tries to build bridges without imposing one language; its SUCCESS depended on flexible implementation by states (Tamil Nadu effectively follows a two-language line, showing federal accommodation), while friction over Hindi imposition shows the formula works only as cooperation, not compulsion',
      'It fully succeeded everywhere; all states adopted identical languages',
      'It failed completely; no state ever taught a second language',
      'Language policy has nothing to do with federalism'
    ],
    correctIndex: 0,
    explanation:
      'Language is a federal minefield: States List subject, identity marker, and integration tool at once. The Constitution left no NATIONAL language -- Hindi is official (Article 343) with 22 Eighth Schedule languages protected. A good evaluation names the mechanism (flexibility to states), one success (south Indian states keeping Tamil while adding English), one tension (anti-Hindi agitations), then judges: integration by consent, not decree.',
    hints: [
      'What exactly are the THREE slots?',
      'Implementation was flexible -- is that a bug or a feature?',
      'Consent vs compulsion decides the verdict.'
    ],
  },
  {
    id: 'ch_depth_fed_local_government',
    nodeId: 'c10_civ_cbse_02_008',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did the 73rd Amendment build a THREE-tier Panchayati Raj (Gram Panchayat, Panchayat Samiti, Zila Parishad), and how does a Municipal Corporation (Article 243Q) differ from a Zila Parishad (Article 243B) in composition and role?',
    options: [
      'Three tiers match the scale of rural functions -- village for daily needs, block for coordination, district for planning -- so no single body is overloaded (the principle of subsidiarity). A Municipal Corporation is an URBAN body of elected ward councillors led by a Mayor for a big city; a Zila Parishad is the RURAL district tier of panchayat members (chairs of Panchayat Samitis plus MPs/MLAs) coordinating development across the district',
      'Three tiers exist to triple the salaries of representatives',
      'Municipal Corporations are rural; Zila Parishads govern Mumbai',
      'Both bodies have identical composition and identical voters'
    ],
    correctIndex: 0,
    explanation:
      'The 73rd/74th Amendments (1992-93) made local government CONSTITUTIONAL: regular five-year elections, reserved seats for SC/ST/women (one-third), and State Finance/State Election Commissions. Composition contrast: Corporation = direct ward councillors -> Mayor (urban mega-services: water, sewerage, fire); Zila Parishad = largely INDIRECT (elected Samiti chiefs) -> district rural development planning. Two tracks, one principle: government closest to the people for local matters.',
    hints: [
      'Match each tier to the size of the problem it solves.',
      'Urban track vs rural track -- 74th vs 73rd.',
      'Direct election at the base, indirect at the district.'
    ],
  }
];

// ─── PROPS INTERFACE ───────────────────────────────────────────────────────────
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

// ─── DEFAULT ENRICHMENT DATA ───────────────────────────────────────────────────
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C10_HISTCIV_001,
  title: 'Meaning of Federal Setup & Indian Parliamentary Governance',
  definition:
    'Federalism in India is a quasi-federal constitutional system where legislative and executive powers are divided between the Union Parliament and State Legislatures through the Seventh Schedule (Union, State, and Concurrent Lists), underpinned by an independent judiciary, but balanced by a pronounced unitary bias (single constitution, single citizenship, residuary powers under Article 248, and emergency provisions).',
  eli5:
    'Think of India like a joint-family household where each state manages its own room (State List), while the Union handles the roof, security, and finances (Union List). For common corridors, both make rules, but the Union has the final word (Concurrent List). The Lok Sabha holds the purse strings, the Rajya Sabha protects state interests, and the President acts as the non-partisan guardian of the Constitution.',
  misconceptions: [
    {
      misconception: 'The Lok Sabha still has 552 members including 2 nominated Anglo-Indians.',
      correction: 'The 104th Constitutional Amendment Act (2019, effective Jan 2020) abolished the 2 Anglo-Indian nominated seats. The maximum elected strength is now 543.',
    },
    {
      misconception: 'The Rajya Sabha has equal power over Money Bills and can veto them.',
      correction: 'The Rajya Sabha cannot reject or amend Money Bills; it has only 14 days to make recommendations. If it fails to return the bill, it is deemed passed under Article 109.',
    },
    {
      misconception: 'Residuary powers in India belong to the States, like in the United States.',
      correction: 'Under Article 248, residuary powers vest exclusively in the Union Parliament (Centre), reflecting India’s deliberate unitary bias.',
    },
    {
      misconception: 'All MPs and MLAs, including nominated ones, vote for the President.',
      correction: 'Only ELECTED members of the Lok Sabha, Rajya Sabha, and State Legislative Assemblies (plus Delhi & Puducherry) vote. Nominated members are strictly excluded under Article 54.',
    },
    {
      misconception: 'Impeaching the President requires only a simple majority in Lok Sabha like a No-Confidence motion.',
      correction: 'Impeachment under Article 61 requires a 2/3rd majority of the TOTAL membership of BOTH Houses for "violation of the Constitution".',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is India’s federal character described as by K.C. Wheare?', options: ['Pure Federalism', 'Quasi-Federal', 'Unitary State', 'Confederation'], correctIndex: 1 },
    { question: 'What is the minimum age to be elected to the Lok Sabha?', options: ['21 years', '25 years', '30 years', '35 years'], correctIndex: 1 },
    { question: 'What is the constitutional Quorum for the Lok Sabha under Article 100?', options: ['50 members', '55 members (1/10th)', '100 members', '272 members'], correctIndex: 1 },
    { question: 'Which device is used by Lok Sabha MPs to ask questions without prior notice?', options: ['Question Hour', 'Zero Hour', 'Adjournment Motion', 'Calling Attention'], correctIndex: 1 },
    { question: 'How many days does the Rajya Sabha have to consider a Money Bill?', options: ['7 days', '14 days', '30 days', '6 months'], correctIndex: 1 },
    { question: 'Who presides over a Joint Sitting of Parliament under Article 118?', options: ['The President', 'The Rajya Sabha Chairman', 'The Lok Sabha Speaker', 'The Chief Justice'], correctIndex: 2 },
    { question: 'What is the term of office for a member of the Rajya Sabha?', options: ['5 years', '6 years (1/3rd retiring every 2 yrs)', 'Permanent for life', '4 years'], correctIndex: 1 },
    { question: 'Which Article empowers the Rajya Sabha to create a new All-India Service?', options: ['Article 249', 'Article 312', 'Article 356', 'Article 368'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery is achieved when a student demonstrates 85%+ accuracy on constitutional articles, bicameral distinctions, procedural calculations, and real-world jurisprudence.',
};

// ─── REAL-WORLD CAPSTONE ACTIVITY ───────────���──────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'The Constitutional Crisis Dispatch: Youth Parliament Counsel',
  description: 'Draft a 3-point parliamentary advisory addressing an emergency where a state challenges a central cyber-security mandate while the Lok Sabha is dissolved.',
  steps: [
    'Specify how the Rajya Sabha as the permanent house maintains continuity under Article 83.',
    'Explain how the central cyber law takes precedence under Article 248 (Residuary) and Concurrent lists.',
    'Advise the President on the 6-month limit between parliamentary sessions under Article 85.',
    'Submit your counsel brief to the Speaker’s Chamber for simulated gazetting.',
  ],
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export function C10_HistoryCivicsMeaningFederalSetupSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C10_HISTCIV_001,
  title = DEFAULT_PROPS.title || 'Meaning of Federal Setup & Indian Parliamentary Governance',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['histciv'] || { name: 'History & Civics', emoji: '🏛️', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org Interaction States
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration Controls
  const [selectedList, setSelectedList] = useState<'union' | 'state' | 'concurrent'>('union');
  const [lsAttendance, setLsAttendance] = useState(60);
  const [rsAttendance, setRsAttendance] = useState(30);
  const [billType, setBillType] = useState<'ordinary' | 'money'>('ordinary');
  const [billDayCount, setBillDayCount] = useState(0);
  const [activeMotion, setActiveMotion] = useState<'adjournment' | 'no-confidence' | 'defection'>('no-confidence');
  const [defectionPct, setDefectionPct] = useState(70);
  const [impeachmentVoteLS, setImpeachmentVoteLS] = useState(370);
  const [selectedElectorTypes, setSelectedElectorTypes] = useState<string[]>(['elected_ls', 'elected_rs', 'elected_mla']);

  // Challenge Engine States
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

  // Non-MCQ challenge interactive states
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
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gsapTimelineRef = useRef<HTMLDivElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ──────────────────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIALIZE MASTERY ON MOUNT ────────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE BKT DIFFICULTY REACTION ─────────────────────────────────────────
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── GSAP BILL FLOW TIMELINE ANIMATION ──────────────────────────────────────
  useEffect(() => {
    if (phase === 'explore' && currentSlide === 2 && gsapTimelineRef.current) {
      gsap.fromTo(
        gsapTimelineRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [phase, currentSlide, billType]);

  // ─── CANVAS ANIMATION (Parliament Chamber Pulse) ──────────────────────────────
  useEffect(() => {
    if (phase !== 'challenge') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#a5b4fc';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`Lok Sabha & Rajya Sabha Live Session — Challenge ${currentChallenge + 1}/${filteredChallenges.length}`, 12, 20);

      const pulse = Math.abs(Math.sin(frame * 0.05));
      ctx.beginPath();
      ctx.arc(canvas.width - 24, 15, 6 + pulse * 3, 0, Math.PI * 2);
      ctx.fillStyle = pulse > 0.5 ? '#22c55e' : '#10b981';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentChallenge, filteredChallenges.length]);

  // ─── HANDLERS ────────────────────────────────────────────────────────────────
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
      setShowExplanation(true);
      speechManager.speak('Let us review the constitutional principle step by step.');
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

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on! Article 254 establishes central supremacy.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Constitutional Chambers. Manipulate the live controls to master the Indian federal setup.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Test any combination of votes, bills, and quorums without penalties.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Entering Parliamentary Challenges. Solve these to prove your civics mastery.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive mechanism below to confirm your answer.');
  }, []);

  const handleListSelect = useCallback((list: 'union' | 'state' | 'concurrent') => {
    setSelectedList(list);
    audioManager.play('tap');
    const descriptions: Record<string, string> = {
      union: 'Union List: 100 subjects including Defence, Foreign Affairs, Railways, Banking. Only Parliament legislates.',
      state: 'State List: 61 subjects including Police, Public Health, Agriculture, Local Government. State legislatures legislate.',
      concurrent: 'Concurrent List: 52 subjects including Education, Forests, Criminal Law. Both legislate; Central law overrides under Art 254.',
    };
    speechManager.speak(descriptions[list]);
  }, []);

  const handleLsAttendanceChange = useCallback((val: number) => {
    setLsAttendance(val);
    audioManager.play('count');
  }, []);

  const handleRsAttendanceChange = useCallback((val: number) => {
    setRsAttendance(val);
    audioManager.play('count');
  }, []);

  const handleBillTypeToggle = useCallback((type: 'ordinary' | 'money') => {
    setBillType(type);
    setBillDayCount(0);
    audioManager.play('tap');
    speechManager.speak(type === 'money' ? 'Money Bill selected. Originates only in Lok Sabha on Presidential recommendation.' : 'Ordinary Bill selected. Can originate in either House.');
  }, []);

  const handleBillDayIncrement = useCallback(() => {
    setBillDayCount((prev) => {
      const next = Math.min(16, prev + 2);
      audioManager.play('count');
      if (next >= 14 && billType === 'money') {
        audioManager.play('chime');
        speechManager.speak('14-day limit elapsed! The Money Bill is deemed passed by both Houses.');
      }
      return next;
    });
  }, [billType]);

  const handleMotionChange = useCallback((motionType: 'adjournment' | 'no-confidence' | 'defection') => {
    setActiveMotion(motionType);
    audioManager.play('tap');
  }, []);

  const handleDefectionChange = useCallback((pct: number) => {
    setDefectionPct(pct);
    audioManager.play('count');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
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
    setSortArrangement((prev) => {
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have successfully mastered the Indian Federal Setup and Parliamentary System.');
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
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

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
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding constitutional analysis.');
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
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Hints exhausted. Let us analyze the constitutional rationale together.');
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
    [challenge, hintCount, hitMisconceptions, resetInactivityTimer, showNextHint]
  );

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── DERIVED LIVE CIVICS CALCULATIONS ─────────────────────────────────────────
  const lsQuorumMet = lsAttendance >= 55;
  const rsQuorumMet = rsAttendance >= 25;
  const quorumColorLS = lsQuorumMet ? '#22c55e' : '#ef4444';
  const quorumColorRS = rsQuorumMet ? '#22c55e' : '#ef4444';

  const impeachmentPassedLS = impeachmentVoteLS >= 362;

  const houseData = [
    { name: 'Lok Sabha', total: 543, quorumNeeded: 55, current: lsAttendance },
    { name: 'Rajya Sabha', total: 245, quorumNeeded: 25, current: rsAttendance },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans"
    >
      {/* ─── HEADER BAR ──────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700 inline-block cursor-default"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-bold text-gold-400">ICSE Class 10 Civics</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">CISCE 2026 Ready</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Dynamic Mode / Mastery Badges */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 text-xs font-black uppercase rounded-xl border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-700'
                : 'bg-gold-950/60 text-gold-400 border-gold-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-3 py-1 text-xs font-bold rounded-xl bg-slate-800 text-slate-300 border border-slate-700"
          >
            Mastery: <span className="text-amber-400 capitalize">{masteryLevel}</span>
          </motion.span>
        </div>
      </motion.div>

      {/* ─── PHASE WRAPPER WITH ANIMATEPRESENCE ───────────────────────────────── */}
      <AnimatePresence mode="wait">
        {/* ─── DISCOVERY PHASE ─────────────────────────────────────────────────── */}
        {phase === 'discovery' && (
          <motion.div
            key="phase_discovery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-6 space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-950 rounded-2xl border border-gold-800/80"
            >
              <span className="text-xs uppercase tracking-wider font-extrabold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-800">
                Crisis Scenario Hook
              </span>
              <h2 className="text-2xl font-bold text-gold-200 mt-3">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 italic bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                ⚖️ {SCENARIO.context}
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800"
            >
              <h3 className="text-lg font-bold text-white mb-2">🤔 Discovery Curiosity Challenge (Ungraded):</h3>
              <p className="text-slate-300 text-sm mb-4">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/50 text-slate-400 border border-slate-700'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                    {discoveryAnswered && (i === DISCOVERY_QUESTION.correctIndex ? '✓ ' : '✗ ')}
                    {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800"
                >
                  <p className={`text-sm font-bold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect
                      ? '✓ Correct Insight! Article 254 (Doctrine of Repugnancy) affirms that Union law overrides conflicting State laws.'
                      : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Enter Interactive Constitutional Lab"
                      onClick={handleAdvanceToExploration}
                      className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl shadow-lg shadow-gold-600/30 flex items-center gap-2"
                    >
                      Enter Interactive Constitutional Lab →
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── EXPLORATION PHASE (Brilliant.org Learn-by-Doing) ────────────────── */}
        {phase === 'explore' && (
          <motion.div
            key="phase_explore"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="py-4 space-y-4"
          >
            <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
              <div>
                <span className="text-xs text-gold-400 font-bold uppercase tracking-wider">
                  Interactive Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Previous Slide"
                  onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold rounded-lg text-slate-300"
                >
                  ← Previous
                </motion.button>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Next Step"
                    onClick={() => setCurrentSlide((s) => s + 1)}
                    className="px-3 py-1.5 bg-gold-600 hover:bg-gold-500 text-xs font-bold rounded-lg text-white"
                  >
                    Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Open Sandbox Mode"
                    onClick={handleAdvanceToSandbox}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold rounded-lg text-white"
                  >
                    Open Sandbox Mode →
                  </motion.button>
                )}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-gold-950/40 border border-gold-800/60 rounded-xl"
            >
              <p className="text-xs sm:text-sm text-gold-300 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
            </motion.div>

            {/* ─── SLIDE 0: SEVENTH SCHEDULE 3-LIST INTERACTIVE DIAGRAM ────────── */}
            {currentSlide === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Select Union List"
                    onClick={() => handleListSelect('union')}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedList === 'union' ? 'bg-gold-900/60 border-gold-400 text-white shadow-lg' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm">Union List (List I)</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-gold-950 text-gold-300 font-mono">100 Items</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">Exclusively Parliament (Art 246)</p>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Select State List"
                    onClick={() => handleListSelect('state')}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedList === 'state' ? 'bg-emerald-900/60 border-emerald-400 text-white shadow-lg' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm">State List (List II)</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">61 Items</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">Exclusively State Assemblies</p>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Select Concurrent List"
                    onClick={() => handleListSelect('concurrent')}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedList === 'concurrent' ? 'bg-amber-900/60 border-amber-400 text-white shadow-lg' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm">Concurrent List (List III)</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">52 Items</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">Both Parliament & States (Art 254)</p>
                  </motion.button>
                </div>

                <div className="md:col-span-2 bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-bold text-white capitalize">{selectedList} List Constitutional Map</h3>
                      <span className="text-xs font-mono text-slate-400">Seventh Schedule</span>
                    </div>

                    <svg viewBox="0 0 500 240" className="w-full bg-slate-950 rounded-xl border border-slate-800" role="img" aria-label="Seventh Schedule Map">
                      <defs>
                        <linearGradient id="unionGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.8" />
                          <stop offset="1%" stopColor="#312e81" stopOpacity="0.4" />
                        </linearGradient>
                        <linearGradient id="stateGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                          <stop offset="1%" stopColor="#064e3b" stopOpacity="0.4" />
                        </linearGradient>
                      </defs>

                      <rect x="20" y="20" width="140" height="200" rx="10" fill={selectedList === 'union' ? 'url(#unionGrad)' : '#1e293b'} stroke="#6366f1" strokeWidth={selectedList === 'union' ? '2' : '0.5'} />
                      <text x="90" y="50" textAnchor="middle" fill="#e0e7ff" fontWeight="bold" fontSize="13">UNION LIST</text>
                      <text x="90" y="75" textAnchor="middle" fill="#a5b4fc" fontSize="10">Defence & Armed Forces</text>
                      <text x="90" y="100" textAnchor="middle" fill="#a5b4fc" fontSize="10">Foreign Affairs & Treaties</text>
                      <text x="90" y="125" textAnchor="middle" fill="#a5b4fc" fontSize="10">Railways & National Hwys</text>
                      <text x="90" y="150" textAnchor="middle" fill="#a5b4fc" fontSize="10">Banking & Currency</text>
                      <text x="90" y="180" textAnchor="middle" fill="#818cf8" fontSize="9" fontWeight="bold">Art 248: Residuary</text>

                      <rect x="180" y="20" width="140" height="200" rx="10" fill={selectedList === 'concurrent' ? '#78350f' : '#1e293b'} stroke="#f59e0b" strokeWidth={selectedList === 'concurrent' ? '2' : '0.5'} />
                      <text x="250" y="50" textAnchor="middle" fill="#fef3c7" fontWeight="bold" fontSize="13">CONCURRENT</text>
                      <text x="250" y="75" textAnchor="middle" fill="#fde68a" fontSize="10">Education & Universities</text>
                      <text x="250" y="100" textAnchor="middle" fill="#fde68a" fontSize="10">Criminal Law & Procedure</text>
                      <text x="250" y="125" textAnchor="middle" fill="#fde68a" fontSize="10">Forests & Wildlife</text>
                      <text x="250" y="150" textAnchor="middle" fill="#fde68a" fontSize="10">Economic & Social Plan</text>
                      <text x="250" y="180" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Art 254: Central Override</text>

                      <rect x="340" y="20" width="140" height="200" rx="10" fill={selectedList === 'state' ? 'url(#stateGrad)' : '#1e293b'} stroke="#10b981" strokeWidth={selectedList === 'state' ? '2' : '0.5'} />
                      <text x="410" y="50" textAnchor="middle" fill="#d1fae5" fontWeight="bold" fontSize="13">STATE LIST</text>
                      <text x="410" y="75" textAnchor="middle" fill="#a7f3d0" fontSize="10">Police & Public Order</text>
                      <text x="410" y="100" textAnchor="middle" fill="#a7f3d0" fontSize="10">Public Health & Sanitation</text>
                      <text x="410" y="125" textAnchor="middle" fill="#a7f3d0" fontSize="10">Agriculture & Irrigation</text>
                      <text x="410" y="150" textAnchor="middle" fill="#a7f3d0" fontSize="10">Local Self-Government</text>
                      <text x="410" y="180" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">Art 249: RS override</text>
                    </svg>
                  </div>
                  <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <span className="font-bold text-amber-400">Constitutional Fact:</span> In <em>State of West Bengal v. Union of India (1962)</em>, the Supreme Court declared that Indian federalism places ultimate legislative supremacy with the Union Parliament.
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── SLIDE 1: LOK SABHA & RAJYA SABHA COMPOSITION & QUORUM ─────── */}
            {currentSlide === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Lok Sabha Live Chamber */}
                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-white">Lok Sabha (House of the People)</h3>
                        <p className="text-xs text-slate-400">Max Strength: 543 elected | Term: 5 yrs | Min Age: 25</p>
                      </div>
                      <motion.span
                        animate={{ scale: [1, 1.05, 1] }}
                        className={`text-xs px-2.5 py-1 rounded-full font-bold border ${lsQuorumMet ? 'bg-emerald-950 text-emerald-400 border-emerald-700' : 'bg-rose-950 text-rose-400 border-rose-700'}`}
                      >
                        {lsQuorumMet ? '✓ Quorum Met' : '✗ Quorum Incomplete'}
                      </motion.span>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Present MPs: <strong className="text-white">{lsAttendance}</strong> / 543</span>
                        <span>Quorum Required: <strong className="text-amber-400">55 MPs (1/10th)</strong></span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={543}
                        value={lsAttendance}
                        aria-label="Lok Sabha Attendance Slider"
                        onChange={(e) => handleLsAttendanceChange(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>

                    <svg viewBox="0 0 300 120" className="w-full bg-slate-950 rounded-xl border border-slate-800" role="img" aria-label="Lok Sabha Chamber View">
                      <circle cx="150" cy="110" r="90" fill="none" stroke="#334155" strokeWidth="12" strokeDasharray="3 3" />
                      <circle cx="150" cy="110" r="60" fill="none" stroke="#334155" strokeWidth="12" strokeDasharray="3 3" />
                      <circle cx="150" cy="110" r="30" fill="none" stroke="#334155" strokeWidth="12" strokeDasharray="3 3" />
                      <circle cx="150" cy="100" r="14" fill="#6366f1" />
                      <text x="150" y="104" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">Speaker</text>
                      <text x="150" y="40" textAnchor="middle" fill={quorumColorLS} fontSize="14" fontWeight="bold">
                        {lsAttendance} Present {lsQuorumMet ? '✓' : '✗'}
                      </text>
                    </svg>
                  </div>

                  {/* Rajya Sabha Live Chamber */}
                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-white">Rajya Sabha (Council of States)</h3>
                        <p className="text-xs text-slate-400">Max Strength: 250 (238 elected + 12 nominated) | Term: 6 yrs</p>
                      </div>
                      <motion.span
                        animate={{ scale: [1, 1.05, 1] }}
                        className={`text-xs px-2.5 py-1 rounded-full font-bold border ${rsQuorumMet ? 'bg-emerald-950 text-emerald-400 border-emerald-700' : 'bg-rose-950 text-rose-400 border-rose-700'}`}
                      >
                        {rsQuorumMet ? '✓ Quorum Met' : '✗ Quorum Incomplete'}
                      </motion.span>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Present MPs: <strong className="text-white">{rsAttendance}</strong> / 245</span>
                        <span>Quorum Required: <strong className="text-amber-400">25 MPs (1/10th)</strong></span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={245}
                        value={rsAttendance}
                        aria-label="Rajya Sabha Attendance Slider"
                        onChange={(e) => handleRsAttendanceChange(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>

                    <svg viewBox="0 0 300 120" className="w-full bg-slate-950 rounded-xl border border-slate-800" role="img" aria-label="Rajya Sabha Chamber View">
                      <circle cx="150" cy="110" r="90" fill="none" stroke="#334155" strokeWidth="12" strokeDasharray="3 3" />
                      <circle cx="150" cy="110" r="60" fill="none" stroke="#334155" strokeWidth="12" strokeDasharray="3 3" />
                      <circle cx="150" cy="110" r="30" fill="none" stroke="#334155" strokeWidth="12" strokeDasharray="3 3" />
                      <circle cx="150" cy="100" r="14" fill="#10b981" />
                      <text x="150" y="104" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">Chairman</text>
                      <text x="150" y="40" textAnchor="middle" fill={quorumColorRS} fontSize="14" fontWeight="bold">
                        {rsAttendance} Present {rsQuorumMet ? '✓' : '✗'}
                      </text>
                    </svg>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <h4 className="text-xs font-bold text-slate-300 mb-2 uppercase">Quorum vs Attendance Visualisation (Recharts)</h4>
                  <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={houseData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                        <XAxis type="number" domain={[0, 550]} stroke="#64748b" />
                        <YAxis type="category" dataKey="name" stroke="#cbd5e1" width={90} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                        <Bar dataKey="current" name="Present MPs" fill="#6366f1" radius={[0, 6, 6, 0]}>
                          {houseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.current >= entry.quorumNeeded ? '#10b981' : '#f43f5e'} />
                          ))}
                        </Bar>
                        <Bar dataKey="quorumNeeded" name="Quorum Barrier" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── SLIDE 2: PASSING ORDINARY VS MONEY BILLS ──────────────────── */}
            {currentSlide === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Toggle Ordinary Bill Pathway"
                    onClick={() => handleBillTypeToggle('ordinary')}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                      billType === 'ordinary' ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    📜 Ordinary Bill Pathway (Art 107, 108, 111)
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Toggle Money Bill Pathway"
                    onClick={() => handleBillTypeToggle('money')}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                      billType === 'money' ? 'bg-amber-600 border-amber-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    💰 Money Bill Pathway (Art 109, 110, 117)
                  </motion.button>
                </div>

                {billType === 'money' && !predictionMade && (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 bg-slate-900 rounded-xl border border-slate-800"
                  >
                    <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">🧠 Predict-Then-Check</p>
                    <p className="text-sm text-slate-200 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          aria-label={`Predict option ${i + 1}: ${opt}`}
                          onClick={() => handlePrediction(i)}
                          className="text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div ref={gsapTimelineRef} className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-xs font-mono text-gold-400 font-bold">Stage 1: Origin</span>
                    <h4 className="text-sm font-bold text-white mt-1">
                      {billType === 'ordinary' ? 'Either House (LS or RS)' : 'Lok Sabha ONLY'}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {billType === 'ordinary' ? 'Introduced by any Minister or Private Member.' : 'Requires prior recommendation of the President (Art 117).'}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-xs font-mono text-gold-400 font-bold">Stage 2: Readings</span>
                    <h4 className="text-sm font-bold text-white mt-1">3 Rigorous Readings</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      First (Intro) → Second (Clause-by-Clause & Committee) → Third (Final Whole Vote).
                    </p>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-xs font-mono text-gold-400 font-bold">Stage 3: Transmittal</span>
                    <h4 className="text-sm font-bold text-white mt-1">
                      {billType === 'ordinary' ? 'Full RS Scrutiny' : 'Strict 14-Day Limit'}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {billType === 'ordinary' ? 'RS can reject or amend. Deadlock triggers Joint Sitting (Art 108).' : 'RS cannot amend or reject; can only recommend within 14 days.'}
                    </p>
                    {billType === 'money' && (
                      <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-xs text-amber-300">Days Elapsed: {billDayCount}/14</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Advance bill simulation by 2 days"
                          onClick={handleBillDayIncrement}
                          className="px-2 py-1 bg-amber-600 text-white rounded text-xs font-bold"
                        >
                          +2 Days
                        </motion.button>
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-xs font-mono text-gold-400 font-bold">Stage 4: Assent</span>
                    <h4 className="text-sm font-bold text-white mt-1">Presidential Action</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {billType === 'ordinary' ? 'May assent, withhold, or return ONCE for reconsideration (Art 111).' : 'MUST give assent; cannot return a Money Bill.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── SLIDE 3: PARLIAMENTARY MOTIONS & ACCOUNTABILITY ───────────── */}
            {currentSlide === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Select No Confidence Motion"
                    onClick={() => handleMotionChange('no-confidence')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${activeMotion === 'no-confidence' ? 'bg-rose-900/80 border-rose-500 text-rose-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                  >
                    ⚡ No-Confidence Motion (Art 75(3))
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Select Adjournment Motion"
                    onClick={() => handleMotionChange('adjournment')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${activeMotion === 'adjournment' ? 'bg-gold-900/80 border-gold-500 text-gold-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                  >
                    ⏱️ Adjournment Motion
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Select Anti-Defection 2/3rd Merger Rule"
                    onClick={() => handleMotionChange('defection')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${activeMotion === 'defection' ? 'bg-amber-900/80 border-amber-500 text-amber-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                  >
                    🛡️ Anti-Defection 2/3rd Merger Rule
                  </motion.button>
                </div>

                {activeMotion === 'no-confidence' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div>
                      <h3 className="text-base font-bold text-white">No-Confidence Motion Mechanics</h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Enforces collective ministerial responsibility to the Lok Sabha under <strong>Article 75(3)</strong>.
                      </p>
                      <ul className="mt-3 space-y-2 text-xs text-slate-300">
                        <li>• <strong>Introduction Threshold:</strong> Minimum 50 MPs must stand in support.</li>
                        <li>• <strong>Passage:</strong> Simple majority (50% + 1 of MPs present & voting).</li>
                        <li>• <strong>Consequence:</strong> The Prime Minister & entire Council of Ministers MUST resign immediately.</li>
                      </ul>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-2">
                      <span className="text-xs uppercase font-mono text-slate-400">July 2023 Historic Precedent</span>
                      <p className="text-xs text-slate-300">No-Confidence motion tabled by Opposition:</p>
                      <div className="flex justify-center gap-4 text-sm font-bold">
                        <span className="text-emerald-400">✓ Govt Ayes: 347</span>
                        <span className="text-rose-400">✗ Noes: 232</span>
                      </div>
                      <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold">
                        ✓ Govt Survived with Majority
                      </span>
                    </div>
                  </motion.div>
                )}

                {activeMotion === 'adjournment' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                    <h3 className="text-base font-bold text-white">Adjournment Motion (Lok Sabha Exclusive)</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Suspends the regular pre-scheduled agenda of the Lok Sabha to debate a single urgent matter of public importance (e.g. natural disasters, major border security incidents).
                    </p>
                    <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-xl text-xs text-rose-300">
                      <strong>Critical Exam Distinction:</strong> Passing an Adjournment Motion does <u>NOT</u> bring down the government! It merely pauses normal business for focused debate.
                    </div>
                  </motion.div>
                )}

                {activeMotion === 'defection' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-bold text-white">Tenth Schedule: Merger Exception Simulator</h3>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${defectionPct >= 66.7 ? 'bg-emerald-950 text-emerald-400 border-emerald-700' : 'bg-rose-950 text-rose-400 border-rose-700'}`}>
                        {defectionPct >= 66.7 ? '✓ Lawful Merger (No Disqualification)' : '✗ Illegal Defection (Disqualified)'}
                      </span>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Faction Splitting: <strong className="text-amber-400">{defectionPct}%</strong> of Party MPs</span>
                        <span>Legal Merger Bar: <strong>≥ 66.7% (2/3rds)</strong></span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={defectionPct}
                        aria-label="Defection Percentage Slider"
                        onChange={(e) => handleDefectionChange(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    {/* Live Tenth Schedule arithmetic (100 MPs in the party) */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        <p className="text-[10px] text-slate-500">MPs defecting (party of 100)</p>
                        <p className="font-mono font-bold text-amber-300">{defectionPct} MPs</p>
                      </div>
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        <p className="text-[10px] text-slate-500">2/3rds bar in MP count</p>
                        <p className="font-mono font-bold text-slate-200">67 MPs</p>
                      </div>
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        <p className="text-[10px] text-slate-500">Seats lost to disqualification</p>
                        <p className={`font-mono font-bold ${defectionPct >= 66.7 ? 'text-emerald-300' : 'text-rose-300'}`}>
                          {defectionPct >= 66.7 ? 0 : defectionPct} seats
                        </p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Misconception killer: ONE defector is disqualified, but TWO-THIRDS walking out together is a
                      lawful "merger" under paragraph 4 — the law rewards collective splits and punishes lone rats.
                      Slide from 65% to 67% and watch the verdict flip.
                    </p>
                    <button
                      onClick={() => { setDefectionPct(70); }}
                      aria-label="Reset defection slider"
                      className="text-[10px] px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 self-start"
                    >
                      ↺ Reset split (70%)
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* ─── SLIDE 4: PRESIDENTIAL ELECTORAL COLLEGE & IMPEACHMENT ──────��� */}
            {currentSlide === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                    <h3 className="text-base font-bold text-white">Presidential Electoral College (Article 54)</h3>
                    <p className="text-xs text-slate-400">Select participating categories to verify eligibility:</p>

                    <div className="space-y-1.5 text-xs">
                      {[
                        { id: 'elected_ls', label: 'Elected Members of Lok Sabha', valid: true },
                        { id: 'elected_rs', label: 'Elected Members of Rajya Sabha', valid: true },
                        { id: 'elected_mla', label: 'Elected MLAs of State Assemblies & UTs (Delhi/Puducherry)', valid: true },
                        { id: 'nom_rs', label: '12 Nominated Members of Rajya Sabha', valid: false },
                        { id: 'nom_mlc', label: 'Members of State Legislative Councils (Vidhan Parishad)', valid: false },
                      ].map((item) => (
                        <motion.div
                          key={item.id}
                          whileHover={{ scale: 1.01 }}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800"
                        >
                          <span className="text-slate-300">{item.label}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.valid ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                            {item.valid ? '✓ VOTES' : '✗ EXCLUDED'}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-bold text-white">Impeachment (Article 61)</h3>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${impeachmentPassedLS ? 'bg-rose-950 text-rose-400 border-rose-700' : 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                        {impeachmentPassedLS ? '✓ Resolution Passes 1st House' : '✗ Fails High 2/3rd Bar'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300">
                      Requires a 2/3rd majority of the <strong>TOTAL membership</strong> of BOTH Houses for <em>"violation of the Constitution"</em>.
                    </p>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Lok Sabha Votes: <strong className="text-white">{impeachmentVoteLS}</strong> / 543</span>
                        <span>Target: <strong className="text-rose-400">362 Votes (2/3rd total)</strong></span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={543}
                        value={impeachmentVoteLS}
                        aria-label="Impeachment Vote in Lok Sabha"
                        onChange={(e) => setImpeachmentVoteLS(Number(e.target.value))}
                        className="w-full accent-rose-500"
                      />
                    </div>

                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                      🛡️ <strong>Historical Record:</strong> No President of India has ever been impeached. The high 362-vote threshold protects the Head of State from partisan removal.
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ─── SANDBOX FREE PLAY PHASE ─────────────────────────────────────────── */}
        {phase === 'sandbox' && (
          <motion.div
            key="phase_sandbox"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="py-6 space-y-6"
          >
            <div className="p-5 bg-gradient-to-r from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-800">
              <h2 className="text-xl font-bold text-emerald-200">🛠️ Free Exploration Sandbox</h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Adjust any variable across all constitutional chambers with zero penalties. Test extreme numbers, quorum thresholds, and legislative vetoes freely.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div whileHover={{ y: -2 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300">Lok Sabha Attendance (Max 543): {lsAttendance}</label>
                <input type="range" min={0} max={543} value={lsAttendance} aria-label="Sandbox Lok Sabha Attendance" onChange={(e) => handleLsAttendanceChange(Number(e.target.value))} className="w-full accent-gold-500" />
                <p className="text-xs text-slate-400">{lsQuorumMet ? '✓ Quorum Valid' : '✗ House Adjourned'}</p>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300">Rajya Sabha Attendance (Max 245): {rsAttendance}</label>
                <input type="range" min={0} max={245} value={rsAttendance} aria-label="Sandbox Rajya Sabha Attendance" onChange={(e) => handleRsAttendanceChange(Number(e.target.value))} className="w-full accent-emerald-500" />
                <p className="text-xs text-slate-400">{rsQuorumMet ? '✓ Quorum Valid' : '✗ House Adjourned'}</p>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300">Defection Faction Split: {defectionPct}%</label>
                <input type="range" min={10} max={100} value={defectionPct} aria-label="Sandbox Defection Percentage" onChange={(e) => handleDefectionChange(Number(e.target.value))} className="w-full accent-amber-500" />
                <p className="text-xs text-slate-400">{defectionPct >= 66.7 ? '✓ 2/3rd Merger Exemption' : '✗ Disqualified MP'}</p>
              </motion.div>
            </div>

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Ready for Parliamentary Challenges"
                onClick={handleAdvanceToChallenge}
                className="px-8 py-3 bg-gold-600 hover:bg-gold-500 text-white font-extrabold rounded-2xl shadow-xl shadow-gold-600/30 flex items-center gap-2"
              >
                I Am Ready for Parliamentary Challenges →
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ─── CHALLENGE PHASE ─────────────────────────────────────────────────── */}
        {phase === 'challenge' && (
          <motion.div
            key="phase_challenge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-4 space-y-4"
          >
            <canvas ref={canvasRef} width={600} height={30} className="w-full rounded-xl border border-slate-800 shadow-inner" />

            {/* Progress & Tier Tracker */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>
                Challenge <strong className="text-white">{currentChallenge + 1}</strong> of {filteredChallenges.length}
              </span>
              <span className="uppercase font-mono text-gold-400 font-bold">
                NEP Competency: {challenge.competencyLevel}
              </span>
            </div>

            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Question Card */}
            <motion.div
              layout
              className={`p-6 bg-slate-900 rounded-2xl border transition-all ${wrongFlash ? 'border-rose-500 bg-rose-950/40' : 'border-slate-800'}`}
            >
              <span className="text-[11px] uppercase font-extrabold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800 font-mono">
                Node: {challenge.nodeId}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-2 mb-4 leading-snug">{challenge.question}</h3>

              {/* MCQ Type Render */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-900/80 border-2 border-emerald-500 text-emerald-100 shadow-lg'
                          : 'bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700'
                      }`}
                    >
                      <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                      {showExplanation && (i === challenge.correctIndex ? '✓ ' : '✗ ')}
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Drag-Label Type Render */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        role="button"
                        tabIndex={0}
                        aria-label={`Draggable step: ${item.label}`}
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                      >
                        ✥ {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'stage_intro', label: 'Stage 1: Origin' },
                      { id: 'stage_committee', label: 'Stage 2: 2nd Reading' },
                      { id: 'stage_deadlock', label: 'Stage 3: Deadlock (Art 108)' },
                      { id: 'stage_assent', label: 'Stage 4: Assent (Art 111)' },
                    ].map((target) => (
                      <motion.div
                        key={target.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(target.id)}
                        whileHover={{ borderColor: '#6366f1' }}
                        className="p-4 rounded-xl bg-slate-950 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-center min-h-[100px]"
                      >
                        <span className="text-[10px] uppercase text-slate-400 font-bold">{target.label}</span>
                        <span className={`text-xs font-bold mt-2 ${droppedLabels[target.id] ? 'text-emerald-400' : 'text-slate-500'}`}>
                          {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : '[ Drop Step Here ]'}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    aria-label="Verify Flow Mapping"
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs"
                  >
                    Verify Flow Mapping
                  </motion.button>
                </div>
              )}

              {/* Drag-Sort Type Render */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Drag to rearrange items in proper sequential order:</p>
                  <div className="space-y-2">
                    {(sortArrangement.length === challenge.sortItems.length
                      ? sortArrangement.map((idx) => challenge.sortItems![idx])
                      : challenge.sortItems
                    ).map((item, displayIndex) => (
                      <motion.div
                        key={displayIndex}
                        draggable
                        role="button"
                        tabIndex={0}
                        aria-label={`Position ${displayIndex + 1}: ${item}`}
                        onDragStart={() => handleDragStart(String(displayIndex))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const fromIdx = parseInt(draggedItem || '0');
                          handleSortMove(fromIdx, displayIndex);
                        }}
                        whileHover={{ scale: 1.01, x: 4 }}
                        whileTap={{ scale: 0.99 }}
                        className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-xs font-medium cursor-grab flex items-center gap-3"
                      >
                        <span className="w-5 h-5 rounded-full bg-gold-900 text-gold-300 flex items-center justify-center font-bold text-[10px]">
                          {displayIndex + 1}
                        </span>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    aria-label="Submit Order"
                    onClick={() =>
                      handleAnswer(
                        sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i)
                      )
                    }
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs"
                  >
                    Submit Order
                  </motion.button>
                </div>
              )}

              {/* Numeric Type Render */}
              {challenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      aria-label="Enter numeric calculated value"
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter calculated number"
                      className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48 focus:border-gold-500 outline-none"
                    />
                    <span className="text-slate-400 text-sm font-bold">{challenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      aria-label="Check Numeric Answer"
                      onClick={() => handleAnswer(numericInput)}
                      className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs"
                    >
                      Check Answer
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Construct Type Render */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Add part ${part}`}
                        onClick={() => setConstructParts((prev) => [...prev, part])}
                        className="px-3 py-1.5 bg-gold-950 hover:bg-gold-900 text-gold-300 border border-gold-700 rounded-lg text-xs font-bold"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-2.5 py-1 bg-gold-800 text-white rounded-md text-xs font-bold flex items-center gap-1.5"
                      >
                        {part}
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          aria-label={`Remove part ${part}`}
                          onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                          className="text-rose-400 hover:text-rose-300 ml-1"
                        >
                          ✕
                        </motion.button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && <span className="text-xs text-slate-600">Click blocks above to construct the legal formula...</span>}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    aria-label="Verify Formula Construction"
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={constructParts.length === 0}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs"
                  >
                    Verify Construction
                  </motion.button>
                </div>
              )}

              {/* Progressive Disclosure Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-amber-950/40 border border-amber-700 space-y-3"
                >
                  <h4 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider">Step-by-Step Constitutional Breakdown</h4>
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs sm:text-sm text-amber-100">
                        <strong className="text-amber-400">{i + 1}.</strong> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}

                  <div className="pt-2 flex justify-between items-center">
                    {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Reveal next step of explanation"
                        onClick={() => setRevealedSteps((s) => s + 1)}
                        className="px-3 py-1.5 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold rounded-lg"
                      >
                        Reveal Next Step →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Next challenge or finish"
                        onClick={handleNextChallenge}
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-xl shadow-lg"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mastery Assessment →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── COMPLETION PHASE ─────────────────────────────────────────────────── */}
        {phase === 'complete' && (
          <motion.div
            key="phase_complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-6 space-y-6"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-6 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 rounded-3xl border border-emerald-700 shadow-2xl text-center space-y-3"
            >
              <span className="text-4xl inline-block animate-bounce">🏛️</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Parliamentary Simulation Complete!</h2>
              <p className="text-emerald-300 font-bold text-sm">
                Mastery Score: <span className="text-white text-xl font-mono">{Math.max(0, 100 - errors * 5)}%</span>
              </p>
              <p className="text-xs text-slate-400">
                All 10 Civics Nodes Verified: c10_histciv_001 through c10_histciv_010.
              </p>
            </motion.div>

            {/* Personalized Motivational Feedback */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300"
            >
              <strong>Evaluator Feedback:</strong>{' '}
              {errors === 0
                ? 'Outstanding performance! You have achieved complete mastery over the Indian Federal Setup, Parliament, and Executive procedures with zero errors.'
                : errors <= 3
                ? 'Great analytical proficiency! You demonstrated strong command over bicameral procedures and constitutional thresholds.'
                : 'Good effort! Review your specific misconception profile below to solidify your understanding before board examinations.'}
            </motion.div>

            {/* Misconception Review Card */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-5 bg-rose-950/40 border border-rose-800 rounded-2xl space-y-3"
              >
                <h3 className="text-sm font-bold text-rose-300">Your Civics Misconception Profile</h3>
                <p className="text-xs text-slate-400">Pay special attention to these points in your final revision:</p>
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1"
                    >
                      <p className="text-rose-300 font-bold">✗ {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ {m.correction}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Spaced Repetition Visibility */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 bg-amber-950/40 border border-amber-800 rounded-2xl text-xs text-amber-200 flex items-center justify-between"
            >
              <div>
                <span className="font-bold">📅 Spaced Repetition Review:</span>
                <p className="text-slate-400 mt-0.5">
                  Next automated review scheduled in{' '}
                  <strong className="text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
                </p>
              </div>
              <span className="text-lg">⏰</span>
            </motion.div>

            {/* Real-World Capstone Activity */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
            >
              <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-start gap-2"
                  >
                    <span className="font-bold text-gold-400">{i + 1}.</span>
                    <span>{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── CONDITIONAL SIM-ENGINE FEEDBACK OVERLAYS ───────────────────────── */}
      <AnimatePresence>
        {showHint && <HintBubble key="hint_bubble" message={currentHint} onComplete={() => setShowHint(false)} />}
        {showConfetti && <Confetti key="confetti" onComplete={() => setShowConfetti(false)} />}
        {showSuccess && <SuccessBanner key="success_banner" message="Parliamentary Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
        {showSparkle && <SparkleBurst key="sparkle_burst" x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}

export default C10_HistoryCivicsMeaningFederalSetupSim;
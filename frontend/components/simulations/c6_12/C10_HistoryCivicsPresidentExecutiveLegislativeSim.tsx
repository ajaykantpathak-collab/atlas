'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY EXACT STRING LITERALS) ───
const NODE_C10_HISTCIV_011 = 'c10_histciv_011';
const NODE_C10_HISTCIV_012 = 'c10_histciv_012';
const NODE_C10_HISTCIV_013 = 'c10_histciv_013';
const NODE_C10_HISTCIV_014 = 'c10_histciv_014';
const NODE_C10_HISTCIV_015 = 'c10_histciv_015';
const NODE_C10_HISTCIV_016 = 'c10_histciv_016';
const NODE_C10_HISTCIV_017 = 'c10_histciv_017';
const NODE_C10_HISTCIV_018 = 'c10_histciv_018';
const NODE_C10_HISTCIV_019 = 'c10_histciv_019';
const NODE_C10_HISTCIV_020 = 'c10_histciv_020';

const ALL_NODE_IDS = [
  NODE_C10_HISTCIV_011,
  NODE_C10_HISTCIV_012,
  NODE_C10_HISTCIV_013,
  NODE_C10_HISTCIV_014,
  NODE_C10_HISTCIV_015,
  NODE_C10_HISTCIV_016,
  NODE_C10_HISTCIV_017,
  NODE_C10_HISTCIV_018,
  NODE_C10_HISTCIV_019,
  NODE_C10_HISTCIV_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Constitutional Crisis at Raisina Hill',
  intro: 'A high-stakes political crisis has emerged in New Delhi. A fractured general election, a controversial executive decree, and an unlawful detention have created severe friction between the President, Prime Minister, Parliament, and the Supreme Court.',
  context: 'As Senior Constitutional Advisor to the Union, you must interpret Articles 52 through 360, resolve inter-branch conflicts, safeguard judicial independence, and maintain the delicate balance between the nominal executive, the real executive, and the apex judiciary.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In a general election, Party A wins 210 seats, Party B wins 195 seats, and Party C wins 138 seats in the 543-member Lok Sabha. Can the President independently appoint anyone they like as Prime Minister?',
  options: [
    'Yes — Article 53 gives the President absolute personal discretion to pick any citizen.',
    'No — Constitutional convention mandates inviting the leader most likely to command a majority on the floor.',
    'Yes — But only if the Chief Justice of India gives prior written permission.',
    'No — The outgoing Prime Minister automatically remains for another full 5-year term.'
  ],
  correctIndex: 1,
  hintAfter: 'Remember: In India’s parliamentary democracy, the President is the nominal head while the Prime Minister derives authority from the confidence of the Lok Sabha!',
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

// ─── 22 PROGRESSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c10_histciv_011)
  {
    id: 'ch_civ_001',
    nodeId: NODE_C10_HISTCIV_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Article 123 of the Constitution, what special legislative power does the President possess when Parliament is not in session?',
    options: [
      'Power to amend the Constitution unilaterally',
      'Power to promulgate Ordinances with the same force as an Act of Parliament',
      'Power to dissolve the Rajya Sabha permanently',
      'Power to declare war without consulting the Cabinet'
    ],
    correctIndex: 1,
    explanation: 'Article 123 empowers the President to promulgate Ordinances during recess of Parliament. Such ordinances have the force of law but must be approved by Parliament within 6 weeks of reassembly.',
    hints: [
      'Look for the temporary law-making power available during parliamentary recess.',
      'It is called an Ordinance under Article 123.',
      'The President issues Ordinances on the advice of the Union Cabinet.'
    ],
    misconceptionIndex: 2
  },
  // 2. Foundation - Drag Label: Branches of Government (c10_histciv_011, 013, 016)
  {
    id: 'ch_civ_002',
    nodeId: NODE_C10_HISTCIV_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each constitutional role to its correct position in the Union governance structure.',
    dragItems: [
      { label: 'Nominal Head (President)', targetId: 'box_pres' },
      { label: 'Real Executive (Prime Minister)', targetId: 'box_pm' },
      { label: 'Guardian of Constitution (Supreme Court)', targetId: 'box_sc' },
      { label: 'Federal Upper House (Rajya Sabha Chairman)', targetId: 'box_vp' }
    ],
    correctMapping: {
      box_pres: 'Nominal Head (President)',
      box_pm: 'Real Executive (Prime Minister)',
      box_sc: 'Guardian of Constitution (Supreme Court)',
      box_vp: 'Federal Upper House (Rajya Sabha Chairman)'
    },
    explanation: 'The President is the nominal executive under Article 53/74; the PM and Cabinet are the real executive; the Supreme Court guards the Constitution under Article 32/124; the Vice-President presides over the Rajya Sabha as ex-officio Chairman under Article 64.',
    hints: [
      'Who represents the State formally versus who leads the Council of Ministers?',
      'The Vice-President chairs the Rajya Sabha; the Supreme Court is the apex judicial body.',
      'Match the nominal head with the top executive node, and the real executive with ministerial governance.'
    ],
    misconceptionIndex: 0
  },
  // 3. Foundation - Recall (c10_histciv_012)
  {
    id: 'ch_civ_003',
    nodeId: NODE_C10_HISTCIV_012,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does the Electoral College for the Vice-President differ from that of the President?',
    options: [
      'The VP is elected only by elected MLAs of State Legislative Assemblies',
      'The VP is elected by ALL members of both Houses of Parliament (including nominated MPs), with NO state MLAs participating',
      'The VP is chosen directly by universal adult suffrage of Indian citizens',
      'The VP is appointed exclusively by the Chief Justice of India'
    ],
    correctIndex: 1,
    explanation: 'The Vice-President is elected by an Electoral College consisting of all members of both Houses of Parliament (both elected and nominated). Unlike the presidential election, State MLAs do not participate.',
    hints: [
      'Consider whether State MLAs vote in the Vice-Presidential election.',
      'Nominated members of Parliament can vote for the VP because the VP presides over Parliament.',
      'The VP Electoral College consists solely of Lok Sabha and Rajya Sabha MPs.'
    ],
    misconceptionIndex: 1
  },
  // 4. Foundation - Recall (c10_histciv_016)
  {
    id: 'ch_civ_004',
    nodeId: NODE_C10_HISTCIV_016,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Following the Supreme Court (Number of Judges) Amendment Act 2019, what is the maximum sanctioned strength of the Supreme Court including the Chief Justice of India?',
    correctAnswer: 34,
    tolerance: 0,
    unit: 'judges',
    explanation: 'The sanctioned strength of the Supreme Court is 34 judges (1 Chief Justice of India + 33 other judges) as amended in 2019.',
    hints: [
      'It is 1 Chief Justice plus 33 other Puisne Judges.',
      'The count was raised from 31 to this number in 2019.',
      'Enter 34.'
    ]
  },
  // 5. Foundation - Classify (c10_histciv_018)
  {
    id: 'ch_civ_005',
    nodeId: NODE_C10_HISTCIV_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which constitutional writ translates to "You may have the body" and is used to secure release from unlawful detention?',
    options: [
      'Mandamus',
      'Certiorari',
      'Habeas Corpus',
      'Quo Warranto'
    ],
    correctIndex: 2,
    explanation: 'Habeas Corpus literally means "to have the body". It directs the detaining authority to produce the arrested individual before the court and show legal cause for detention.',
    hints: [
      'It is the prime remedy against illegal police custody.',
      'The Latin phrase refers to producing the physical person.',
      'Select Habeas Corpus.'
    ]
  },
  // 6. Foundation - Drag Sort: Stages of Impeachment (c10_histciv_020)
  {
    id: 'ch_civ_006',
    nodeId: NODE_C10_HISTCIV_020,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the procedural stages of presidential impeachment under Article 61 in chronological order.',
    sortItems: [
      'Notice in writing signed by at least 1/4th total members of initiating House',
      '14-day mandatory notice period given to President',
      'Initiating House passes resolution by 2/3rd majority of total membership',
      'Second House investigates charge while President has right to appear/defend',
      'Second House passes resolution by 2/3rd majority of total membership; President stands removed'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Article 61 requires 1/4th signatures -> 14 days notice -> 2/3rd total membership approval in 1st House -> Investigation in 2nd House -> 2/3rd total membership approval in 2nd House.',
    hints: [
      'Start with the notice requirement and signature count.',
      'The 14-day waiting notice must precede voting in the first House.',
      'The second House investigates before taking the final 2/3rd vote.'
    ]
  },
  // 7. Standard - Application (c10_histciv_013)
  {
    id: 'ch_civ_007',
    nodeId: NODE_C10_HISTCIV_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In 2004, Dr. Manmohan Singh was appointed Prime Minister despite not being a member of either House of Parliament. Under Article 75(5), what constitutional condition was he required to fulfill?',
    options: [
      'He had to resign within 30 days if a Lok Sabha seat was not vacated',
      'He had to become a member of either the Lok Sabha or Rajya Sabha within 6 consecutive months',
      'He was required to contest a direct public referendum in his home state',
      'The President had to issue an emergency ordinance granting him permanent immunity'
    ],
    correctIndex: 1,
    explanation: 'Article 75(5) allows a non-MP to become a Minister or Prime Minister, but they must get elected to either House of Parliament within 6 months, otherwise they cease to hold office.',
    hints: [
      'Think about the 6-month grace period provided to non-legislators.',
      'Dr. Singh was subsequently elected to the Rajya Sabha from Assam.',
      'The time limit is exactly 6 months.'
    ]
  },
  // 8. Standard - Analysis (c10_histciv_015)
  {
    id: 'ch_civ_008',
    nodeId: NODE_C10_HISTCIV_015,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A train accident occurs due to safety negligence. The Railway Minister tenders his resignation to the Prime Minister, and the Council continues in office. Which principle of accountability is demonstrated?',
    options: [
      'Collective Responsibility under Article 75(3)',
      'Individual Responsibility under Article 75(2)',
      'Judicial Review under Article 13',
      'Presidential Veto under Article 111'
    ],
    correctIndex: 1,
    explanation: 'Individual responsibility (Article 75(2)) means a single minister is answerable for departmental lapses and resigns without collapsing the government. Collective responsibility (Article 75(3)) causes the entire Ministry to fall only when a no-confidence motion passes.',
    hints: [
      'Notice that only one department head resigned, not the whole ministry.',
      'Individual accountability does not bring down the entire government.',
      'Collective responsibility requires everyone to sink or swim together.'
    ],
    misconceptionIndex: 1
  },
  // 9. Standard - Application: Three Emergencies (c10_histciv_019)
  {
    id: 'ch_civ_009',
    nodeId: NODE_C10_HISTCIV_019,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Match the ground of emergency with its correct Constitutional Article and primary effect:',
    options: [
      'Article 352: Failure of Constitutional machinery in a State -> State Assembly dissolved',
      'Article 356: War, external aggression, or armed rebellion -> Centre legislates on State List',
      'Article 360: Threat to financial stability -> Reduction of judges’ and public servants’ salaries',
      'Article 352: Threat to credit of India -> Imposition of President’s Rule in Union Territories'
    ],
    correctIndex: 2,
    explanation: 'Article 360 deals with Financial Emergency (threat to financial credit/stability), allowing reduction of salaries of public servants and apex court judges. Article 352 is National Emergency and Article 356 is President’s Rule.',
    hints: [
      'Check the Article number for Financial Emergency.',
      'Article 352 = National, Article 356 = State (President’s Rule), Article 360 = Financial.',
      'Financial emergency empowers reduction of salaries and has never been invoked.'
    ],
    misconceptionIndex: 1
  },
  // 10. Standard - Numeric: Impeachment threshold (c10_histciv_020)
  {
    id: 'ch_civ_010',
    nodeId: NODE_C10_HISTCIV_020,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a 543-member Lok Sabha, if 450 members are present and voting on an impeachment resolution under Article 61, what is the MINIMUM number of affirmative votes needed to pass the resolution?',
    correctAnswer: 362,
    tolerance: 1,
    unit: 'votes (2/3rd of total 543)',
    explanation: 'Article 61 requires a special majority of "not less than two-thirds of the TOTAL membership of the House" (not merely present and voting). 2/3 of 543 = 362 votes.',
    hints: [
      'Do not calculate 2/3rd of 450. Calculate 2/3rd of the TOTAL strength (543).',
      '543 * (2/3) = 362 votes.',
      'This high bar prevents partisan impeachment.'
    ]
  },
  // 11. Standard - Construct: Writs vs Infringements (c10_histciv_018)
  {
    id: 'ch_civ_011',
    nodeId: NODE_C10_HISTCIV_018,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Construct the legal remedy: A Municipal Commissioner refuses to issue a statutory trade license despite the applicant meeting all legal criteria. Assemble the appropriate legal writ and command.',
    availableParts: ['Writ of Mandamus', 'issued to public official', 'commanding performance of statutory duty', 'Writ of Quo Warranto', 'quashing lower court order'],
    targetState: 'Writ of Mandamus issued to public official commanding performance of statutory duty',
    validationHint: 'Select the writ meaning "We Command" that compels a public authority to perform a mandatory legal duty.',
    explanation: 'Mandamus is issued against a public official or administrative body when they wrongfully fail or refuse to perform a mandatory public duty.',
    hints: [
      'Mandamus means "We Command".',
      'It targets public officials who refuse to perform their statutory duties.',
      'Assemble: Writ of Mandamus + issued to public official + commanding performance of statutory duty.'
    ]
  },
  // 12. Standard - Evaluation: Judicial Independence (c10_histciv_017)
  {
    id: 'ch_civ_012',
    nodeId: NODE_C10_HISTCIV_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why are the salaries and pensions of Supreme Court judges charged directly upon the Consolidated Fund of India under Article 125?',
    options: [
      'To allow the Ministry of Finance to deduct tax penalties at will',
      'So that Parliament cannot vote on or reduce judicial salaries during their tenure to exert political pressure',
      'To make judicial salaries dependent on annual agricultural tax yields',
      'Because the Chief Justice personally prints government bonds'
    ],
    correctIndex: 1,
    explanation: 'Expenditure charged on the Consolidated Fund of India is non-votable by Parliament. This ensures Parliament cannot use budgetary cuts to intimidate or penalize independent judges.',
    hints: [
      'Think about what happens if Parliament could vote down judges’ salaries every year.',
      'Charged expenditure means non-votable expenditure.',
      'It insulates the judiciary from legislative and executive financial coercion.'
    ]
  },
  // 13. Advanced - Evaluation: NJAC vs Collegium (c10_histciv_016, 017)
  {
    id: 'ch_civ_013',
    nodeId: NODE_C10_HISTCIV_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In 2015, the Supreme Court struck down the 99th Constitutional Amendment (NJAC Act). On what primary constitutional doctrine was the act declared unconstitutional?',
    options: [
      'Violation of the Doctrine of Severability',
      'Violation of the Basic Structure doctrine, specifically Judicial Independence',
      'Infringement of the President’s absolute discretionary veto under Article 111',
      'Breach of the financial emergency protocols under Article 360'
    ],
    correctIndex: 1,
    explanation: 'In the Fourth Judges Case (2015), the Supreme Court held that executive involvement in judicial appointments under the NJAC compromised the independence of the judiciary, which is an inviolable basic feature of the Constitution.',
    hints: [
      'Recall the landmark Kesavananda Bharati doctrine regarding inviolable constitutional pillars.',
      'Judicial independence is part of the basic structure.',
      'The collegium system was restored because executive veto over appointments threatened impartiality.'
    ]
  },
  // 14. Advanced - Analysis: Cabinet vs Council of Ministers (c10_histciv_015)
  {
    id: 'ch_civ_014',
    nodeId: NODE_C10_HISTCIV_015,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Analyze the structural and operational distinctions between the Council of Ministers and the Cabinet:',
    options: [
      'The Cabinet has 60–80 members while the Council has only 15–20 senior ministers',
      'The Council of Ministers is the larger constitutional body (60–80 members across 3 tiers), whereas the Cabinet is the inner policy-making core of 15–20 senior ministers',
      'Cabinet decisions are non-binding recommendations, whereas Deputy Ministers make final national policy',
      'The Cabinet meets only once every 5 years during the President’s address'
    ],
    correctIndex: 1,
    explanation: 'The Council of Ministers comprises all tiers (Cabinet Ministers, Ministers of State, Deputy Ministers) numbering 60-80. The Cabinet is the inner circle of 15-20 senior Cabinet rank ministers who formulate core national policies.',
    hints: [
      'Remember the concentric circles: Cabinet is the smaller inner circle inside the Council of Ministers.',
      'Council = 60-80 members; Cabinet = 15-20 senior ministers.',
      'The Cabinet meets weekly and makes real policy decisions.'
    ],
    misconceptionIndex: 0
  },
  // 15. Advanced - Application: Hung Parliament & Discretionary Powers (c10_histciv_011, 013)
  {
    id: 'ch_civ_015',
    nodeId: NODE_C10_HISTCIV_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Following a general election with a hung Lok Sabha, the outgoing PM advises the President to dissolve Parliament immediately. What should the President do?',
    options: [
      'Accept the advice immediately under Article 74 without exploring any alternative',
      'Exercise situational discretion: explore whether the leader of the largest party or coalition can form a stable government before considering dissolution',
      'Impose permanent military rule across all 28 states',
      'Hand over executive control to the Chief Election Commissioner'
    ],
    correctIndex: 1,
    explanation: 'In a hung Parliament, the President acts as an impartial constitutional umpire. The President exercises personal discretion to invite the leader most likely to prove a majority on the floor of the House; dissolution is only a last resort.',
    hints: [
      'The President is not bound to dissolve Parliament on the advice of a defeated or minority PM.',
      'Constitutional convention prioritizes finding a viable government first.',
      'A floor test in the Lok Sabha determines majority support.'
    ]
  },
  // 16. Advanced - Drag Sort: Court Hierarchy & Appeal (c10_histciv_016, 019, 020)
  {
    id: 'ch_civ_016',
    nodeId: NODE_C10_HISTCIV_020,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the Indian judicial hierarchy from the grassroots trial level to the apex constitutional arbiter.',
    sortItems: [
      'Subordinate Courts (Munsif / Judicial Magistrate)',
      'District & Sessions Court',
      'High Court of the State',
      'Supreme Court of India (Apex Court)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The single integrated judicial system ascends from Subordinate Courts -> District & Sessions Court -> State High Court -> Supreme Court of India.',
    hints: [
      'Start at the lowest tier of civil/criminal magistrates.',
      'The District Court sits above subordinate courts.',
      'The High Court is at state level and the Supreme Court is at the top.'
    ]
  },
  // 17. Advanced - Evaluation: Public Interest Litigation (c10_histciv_018)
  {
    id: 'ch_civ_017',
    nodeId: NODE_C10_HISTCIV_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How did Justices P.N. Bhagwati and V.R. Krishna Iyer revolutionize access to justice through Public Interest Litigation (PIL)?',
    options: [
      'By abolishing the Supreme Court’s writ jurisdiction under Article 32',
      'By relaxing the traditional rule of "locus standi", allowing public-spirited citizens to petition on behalf of marginalized victims',
      'By transferring all criminal cases to municipal councils',
      'By mandating that only billionaires can file writ petitions'
    ],
    correctIndex: 1,
    explanation: 'PIL relaxed the rigid doctrine of locus standi (which required the aggrieved person themselves to approach court), permitting any citizen or NGO to champion fundamental rights of the poor and exploited.',
    hints: [
      'Locus standi means the right to bring a case to court.',
      'PIL allows letters, postcards, or NGO petitions to be treated as writ petitions.',
      'It opened judicial remedies to undertrials, bonded labourers, and pavement dwellers.'
    ]
  },
  // 18. Advanced - Creativity: Policy Crisis Response (c10_histciv_014, 019)
  {
    id: 'ch_civ_018',
    nodeId: NODE_C10_HISTCIV_019,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Synthesize the constitutional check against arbitrary executive emergency: Assemble the 44th Amendment safeguards for National Emergency.',
    availableParts: ['Written advice of the Union Cabinet', 'Parliamentary approval within 1 month', 'Special majority in both Houses', 'Oral order of Prime Minister', 'Suspension of Articles 20 and 21'],
    targetState: 'Written advice of the Union Cabinet Parliamentary approval within 1 month Special majority in both Houses',
    validationHint: 'Combine the three democratic checks introduced by the 44th Amendment 1978.',
    explanation: 'The 44th Amendment required written Cabinet recommendation (not PM alone), approval within 1 month (reduced from 2), and a special 2/3rd majority.',
    hints: [
      'Eliminate the oral advice of the PM and suspension of Articles 20/21 (which can never be suspended).',
      'Include written Cabinet advice, 1-month window, and special majority.',
      'These three safeguards prevent repeats of the 1975 emergency.'
    ]
  },
  // 19. Advanced - Application: Subordinate Courts (c10_histciv_020)
  {
    id: 'ch_civ_019',
    nodeId: NODE_C10_HISTCIV_020,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Distinguish the jurisdiction of the District Judge from that of the Sessions Judge:',
    options: [
      'The District Judge hears criminal murder trials, while the Sessions Judge settles land revenue disputes',
      'The District Judge presides over civil cases (property, contracts), while the Sessions Judge presides over serious criminal trials (the same judge often holds both designations)',
      'The Sessions Judge only hears foreign maritime disputes',
      'The District Judge cannot be appointed without approval from the Lok Sabha Speaker'
    ],
    correctIndex: 1,
    explanation: 'At the district level, the highest judicial officer is the District and Sessions Judge. When hearing civil matters, they act as District Judge; when trying serious criminal offenses, they act as Sessions Judge.',
    hints: [
      'Civil matters = property, contracts, succession.',
      'Criminal matters = robbery, assault, homicide.',
      'The same officer holds dual designations based on whether the suit is civil or criminal.'
    ]
  },
  // 20. Advanced - Evaluation: Independence vs Impeachment (c10_histciv_017, 020)
  {
    id: 'ch_civ_020',
    nodeId: NODE_C10_HISTCIV_017,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Compare the grounds for removal: Supreme Court Judge (Article 124(4)) versus President of India (Article 61):',
    options: [
      'Judges are removed for "violation of Constitution"; President is removed for "proved misbehaviour"',
      'Judges are removed for "proved misbehaviour or incapacity"; President is removed strictly for "violation of the Constitution"',
      'Both are removed on identical grounds of "loss of parliamentary confidence"',
      'Judges can be removed by an executive order of the Law Minister'
    ],
    correctIndex: 1,
    explanation: 'A Supreme Court or High Court judge is removed only on the ground of "proved misbehaviour or incapacity" under Article 124(4), whereas the President is impeached exclusively for "violation of the Constitution" under Article 61.',
    hints: [
      'Check the exact constitutional phrase for each.',
      'Judges = proved misbehaviour or incapacity.',
      'President = violation of the Constitution.'
    ],
    misconceptionIndex: 1
  },
  // 21. Standard - Recall: High Courts (c10_histciv_019)
  {
    id: 'ch_civ_021',
    nodeId: NODE_C10_HISTCIV_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'Under Article 226, what makes the writ jurisdiction of a High Court broader in scope than the Supreme Court’s writ jurisdiction under Article 32?',
    options: [
      'High Courts can issue writs only for commercial tax recovery',
      'High Courts can issue writs for enforcement of Fundamental Rights AND "for any other legal purpose"',
      'High Courts can overrule international treaties signed by the President',
      'High Courts can issue writs without needing a petitioner or judge'
    ],
    correctIndex: 1,
    explanation: 'While the Supreme Court issues writs under Article 32 strictly for the enforcement of Fundamental Rights, High Courts under Article 226 can issue writs for Fundamental Rights as well as ordinary legal rights ("any other purpose").',
    hints: [
      'Look for the phrase "for any other purpose".',
      'Article 32 is limited to Part III Fundamental Rights.',
      'Article 226 covers both Fundamental Rights and statutory legal rights.'
    ]
  },
  // 22. Advanced - Analysis: Advisory Jurisdiction (c10_histciv_018)
  {
    id: 'ch_civ_022',
    nodeId: NODE_C10_HISTCIV_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Under Article 143, when the President seeks the advisory opinion of the Supreme Court on a question of law or public importance:',
    options: [
      'The opinion delivered by the Supreme Court is binding on the President and automatically becomes law',
      'The Supreme Court’s advisory opinion is not binding on the President, but carries immense legal and constitutional weight',
      'The Supreme Court is legally forced to dismiss the Council of Ministers',
      'The President must immediately resign if the Court disagrees'
    ],
    correctIndex: 1,
    explanation: 'Under Article 143 (Advisory Jurisdiction), the Supreme Court provides its legal opinion on matters referred by the President. The opinion is purely advisory and not binding on the executive.',
    hints: [
      'Is advisory advice legally binding or persuasive?',
      'The President is not constitutionally bound to implement the advice.',
      'However, because it comes from the apex court, it carries high authoritative weight.'
    ]
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
  nodeId: NODE_C10_HISTCIV_011,
  title: 'Union Executive, Legislature & Apex Judiciary',
  definition: 'The constitutional architecture of India balances the nominal executive (President), real executive (Prime Minister and Council of Ministers), sovereign Parliament, and an independent apex judiciary (Supreme Court and High Courts).',
  eli5: 'Think of India as a mega-ship. The President is the titular Commodore whose seal is on every document. The Prime Minister is the Captain actively steering the engine room. Parliament is the board of elected passenger-reps deciding the rules. The Supreme Court is the master navigator ensuring the ship never violates the constitutional compass.',
  misconceptions: [
    {
      misconception: 'The President independently decides whom to appoint as Prime Minister in normal circumstances.',
      correction: 'When a party holds a clear Lok Sabha majority, the President has no personal discretion and must invite its leader. Discretion arises only in a hung Parliament.'
    },
    {
      misconception: 'If one Minister resigns over a scandal, the entire government collapses.',
      correction: 'Individual responsibility (Art 75(2)) affects only the concerned minister. Collective responsibility (Art 75(3)) collapses the whole Council only on a lost No-Confidence Motion.'
    },
    {
      misconception: 'The Council of Ministers and the Cabinet are the exact same body.',
      correction: 'The Council has 60–80 members across three tiers; the Cabinet is the inner core of 15–20 senior ministers who make actual policy.'
    },
    {
      misconception: 'National Emergency (Art 352) and President’s Rule (Art 356) are identical.',
      correction: 'Article 352 applies nationwide due to war/armed rebellion; Article 356 applies to a single State due to constitutional breakdown.'
    },
    {
      misconception: 'Judges can be removed by the Prime Minister or Law Minister at will.',
      correction: 'Judges have security of tenure and can only be removed through rigorous parliamentary impeachment under Article 124(4) for proved misbehaviour or incapacity.'
    }
  ],
  diagnosticQuestions: [
    { question: 'Under which Article is the President bound to act on the aid and advice of the Council of Ministers?', options: ['Article 52', 'Article 74', 'Article 356', 'Article 124'], correctIndex: 1 },
    { question: 'What majority is required in Parliament to impeach the President under Article 61?', options: ['Simple majority of present members', 'Two-thirds majority of TOTAL membership of each House', 'Absolute majority of Rajya Sabha only', '3/4th majority of Lok Sabha'], correctIndex: 1 },
    { question: 'Who acts as the ex-officio Chairman of the Rajya Sabha?', options: ['Speaker', 'Prime Minister', 'Vice-President of India', 'Chief Justice of India'], correctIndex: 2 },
    { question: 'Which writ commands a public authority to execute a legal duty?', options: ['Habeas Corpus', 'Mandamus', 'Quo Warranto', 'Certiorari'], correctIndex: 1 },
    { question: 'Under which Article is President’s Rule imposed in a State?', options: ['Article 352', 'Article 356', 'Article 360', 'Article 370'], correctIndex: 1 },
    { question: 'How many judges currently constitute the sanctioned strength of the Supreme Court?', options: ['25', '31', '34', '39'], correctIndex: 2 },
    { question: 'What is the term of office for the Vice-President of India?', options: ['4 years', '5 years', '6 years', 'Life tenure'], correctIndex: 1 },
    { question: 'Who presides over serious criminal trials in a district court?', options: ['Munsif', 'District Judge', 'Sessions Judge', 'Lok Adalat Chairman'], correctIndex: 2 }
  ],
  masteryCriteria: 'Demonstrates complete conceptual understanding of executive power categories, council responsibility, emergency frameworks, judicial independence, and writ remedies.'
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Executive Balance: Nominal vs Real Executive',
    instruction: 'Adjust the Parliamentary Majority slider to see how the President’s discretion dynamically shifts between Clear Majority and Hung Assembly.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_HISTCIV_011
  },
  {
    title: '2. Council of Ministers vs The Inner Cabinet',
    instruction: 'Click on the concentric rings to inspect the 3 ministerial tiers (Cabinet, Ministers of State, Deputy Ministers).',
    interactionType: 'click-parts',
    nodeId: NODE_C10_HISTCIV_015
  },
  {
    title: '3. The Three Emergency Alarms',
    instruction: 'Switch between the 3 Emergency Articles (352, 356, 360) and observe the structural impact on State Autonomy and Fundamental Rights.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_HISTCIV_019
  },
  {
    title: '4. The Judicial Fortress: Safeguards of Independence',
    instruction: 'Click each constitutional pillar (Tenure, Consolidated Fund, Contempt, Collegium) to see how it shields the court from political pressure.',
    interactionType: 'click-parts',
    nodeId: NODE_C10_HISTCIV_017
  },
  {
    title: '5. Writ Remedies in Action (Article 32 & 226)',
    instruction: 'Select each legal Writ to inspect how the judiciary issues constitutional commands against infringements.',
    interactionType: 'drag-match',
    nodeId: NODE_C10_HISTCIV_018
  }
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If a coalition government loses a No-Confidence Motion in the Lok Sabha by 272 to 271 votes, what must happen?',
    options: [
      'Only the Prime Minister resigns while other Ministers continue',
      'The entire Council of Ministers (all 60-80 members) must resign immediately under Article 75(3)',
      'The Supreme Court takes over executive governance',
      'The President dissolves all State Assemblies'
    ],
    correctIndex: 1,
    verifyInstruction: 'Now set the Lok Sabha confidence meter below 50% and observe the collective resignation reaction.',
    nodeId: NODE_C10_HISTCIV_015
  },
  {
    question: 'Predict: During a proclaimed National Emergency under Article 352, can the government suspend Article 21 (Protection of Life and Personal Liberty)?',
    options: [
      'Yes, all Fundamental Rights without exception are automatically destroyed',
      'No, the 44th Amendment guarantees Articles 20 and 21 can NEVER be suspended even during war',
      'Yes, but only if approved by State Governors',
      'Only if the Chief Justice gives verbal permission'
    ],
    correctIndex: 1,
    verifyInstruction: 'Activate National Emergency in the simulator and verify the Article 20 & 21 immunity shield.',
    nodeId: NODE_C10_HISTCIV_019
  }
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the President’s discretionary power as a ruling party’s Lok Sabha seat share drops below the 272 majority mark?',
    observableOptions: [
      'Discretion expands: the President must assess coalition viability and invite the most viable leader',
      'Discretion drops to zero',
      'The President automatically appoints the Chief Justice as Prime Minister',
      'The President loses all legislative assent powers'
    ],
    correctIndex: 0,
    nodeId: NODE_C10_HISTCIV_011
  },
  {
    question: 'When a writ of Certiorari is issued to an inferior tribunal, what visual transformation occurs?',
    observableOptions: [
      'The unlawful order is quashed and the records are called up to the higher court',
      'The judge of the inferior court is sent to prison',
      'The lower court is dissolved permanently',
      'The state police take over the tribunal'
    ],
    correctIndex: 0,
    nodeId: NODE_C10_HISTCIV_018
  }
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Constitutional Moot Court: The Presidential Reference',
  description: 'Step into the shoes of the Attorney General of India drafting an advisory brief under Article 143 for the President.',
  steps: [
    'Analyze whether a proposed State bill encroaching on national defence can be reserved by the Governor under Article 200.',
    'Formulate three constitutional arguments citing the unitary tilt during emergencies.',
    'Determine which writ a citizen would file if detained under an unratified ordinance.',
    'Debate with peers: Is the collegium system superior to a bipartisan judicial commission?'
  ]
};

// ─── MAIN COMPONENT ───
function C10_HistoryCivicsPresidentExecutiveLegislativeSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C10_HISTCIV_011,
    title = DEFAULT_PROPS.title || 'Civics Simulation',
    misconceptions = DEFAULT_PROPS.misconceptions || [],
    onComplete
  } = props;

  const subjectConfig = SUBJECT_CONFIG['histciv'] || { name: 'History & Civics', emoji: '🏛️', color: 'indigo' };

  // ─── STATE HOOKS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);

  // Discovery & Exploration State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);

  // Dynamic Interactive Sliders & Values
  const [majoritySeats, setMajoritySeats] = useState(285); // 180 to 360
  const [confidenceLevel, setConfidenceLevel] = useState(70); // 0 to 100%
  const [emergencyType, setEmergencyType] = useState<'none' | '352' | '356' | '360'>('none');
  const [selectedTier, setSelectedTier] = useState<'cabinet' | 'state' | 'deputy'>('cabinet');
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const [selectedWrit, setSelectedWrit] = useState<string | null>('habeas');

  // Interactive Drag & Drop / Challenge state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Reflection responses
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explain: '',
    realLife: ''
  });

  // Feedback & Visuals
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);
  const [sandboxTab, setSandboxTab] = useState<'executive' | 'emergency' | 'judiciary' | 'writs'>('executive');

  // GSAP animation ref
  const timelineRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Filter challenges by adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── USEEFFECTS ───
  // 1. Initial Mastery Load
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // 2. BKT-Based Difficulty Adaptation
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

  // 3. Canvas 2D Constitutional Balance Animation Loop
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

      // Draw background scale beam
      const midX = canvas.width / 2;
      const midY = 35;
      const tilt = Math.sin(frame * 0.03) * (majoritySeats >= 272 ? 3 : 15);

      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(midX - 100, midY - tilt);
      ctx.lineTo(midX + 100, midY + tilt);
      ctx.stroke();

      // Fulcrum
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(midX, midY - 5);
      ctx.lineTo(midX - 15, midY + 25);
      ctx.lineTo(midX + 15, midY + 25);
      ctx.closePath();
      ctx.fill();

      // Left Pan: Executive / Lok Sabha
      ctx.fillStyle = majoritySeats >= 272 ? '#10b981' : '#ef4444';
      ctx.beginPath();
      ctx.arc(midX - 100, midY - tilt + 18, 12, 0, Math.PI * 2);
      ctx.fill();

      // Right Pan: President & Constitutional Checks
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(midX + 100, midY + tilt + 18, 12, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [majoritySeats]);

  // 4. GSAP Timeline Animation
  useEffect(() => {
    if (timelineRef.current && phase === 'explore' && currentSlide === 0) {
      gsap.fromTo(
        timelineRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [phase, currentSlide]);

  // 5. Cleanup Inactivity Timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

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
      audioManager.play('pop');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'error');
    speechManager.speak(isCorrect ? 'Accurate! Let us dive into the constitutional mechanisms.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive constitutional laboratory. Manipulate each branch of government!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration unlocked. Test any scenario without score penalties.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for the constitutional examination. Solve each crisis using constitutional law!');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Verify it on the interactive simulation.');
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

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === challenge.sortItems?.length ? [...prev] : challenge.sortItems?.map((_, i) => i) || [];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
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
    speechManager.speak('Congratulations! You have completed the Constitutional simulation with flying colours.');
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
      speechManager.speak('Splendid! Constitutionally accurate.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify({ score: 100, timestamp: Date.now() }));
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
        speechManager.speak('Let us study the constitutional principle together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // Derived calculations
  const isHungParliament = majoritySeats < 272;
  const presidentialDiscretion = useMemo(() => {
    if (majoritySeats >= 272) return { status: 'Bound by Advice', desc: 'Single party has absolute majority (272+). President must appoint majority leader.' };
    if (majoritySeats >= 230) return { status: 'Moderate Discretion', desc: 'Largest pre-poll coalition invited first to prove majority within 10 days.' };
    return { status: 'High Situational Discretion', desc: 'Fractured Lok Sabha. President assesses coalition stability and floor viability.' };
  }, [majoritySeats]);

  const seatData = [
    { name: 'Ruling / Coalition', seats: majoritySeats },
    { name: 'Opposition / Others', seats: Math.max(0, 543 - majoritySeats) }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/80 rounded-2xl border border-slate-800 backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-12 h-12 rounded-xl bg-gold-600/20 border border-gold-500/40 flex items-center justify-center text-2xl"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-tight">{title}</h1>
            <p className="text-xs text-gold-300 font-medium">{subjectConfig.name} • ICSE Class 10 Civics</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                : difficulty === 'advanced'
                ? 'bg-rose-500/10 border-rose-500 text-rose-400'
                : 'bg-amber-500/10 border-amber-500 text-amber-400'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300 font-semibold">
            Mastery: <span className="text-gold-400 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-900 rounded-3xl border border-gold-500/30 shadow-xl">
            <div className="flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🏛️</span> Narrative Hook & Curiosity Discovery
            </div>
            <h2 className="text-2xl font-black text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-gold-200">
              {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
            <h3 className="text-base font-bold text-amber-300 mb-4 flex items-center gap-2">
              <span>🤔</span> Discovery Challenge: Test Your Intuition
            </h3>
            <p className="text-white text-base font-medium mb-4">{DISCOVERY_QUESTION.question}</p>
            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  aria-label={`Option ${idx + 1}: ${opt}`}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-2xl text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/40 border-slate-800 text-slate-500'
                      : 'bg-slate-800 border-slate-700 hover:border-gold-500 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-800">
                <p className={`text-sm mb-4 ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! The President acts as a constitutional umpire.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-2xl font-bold shadow-lg shadow-gold-600/30 flex items-center gap-2"
                >
                  Enter Constitutional Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. GUIDED INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-semibold text-slate-400">
            <span>Exploration Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
            <span className="text-gold-400">{EXPLORATION_STEPS[currentSlide].title}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6"
            >
              <div>
                <h3 className="text-lg font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-gold-300 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* SLIDE 0: NOMINAL VS REAL EXECUTIVE & CHECKS-AND-BALANCES SVG (SVG #1) */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {/* SVG DIAGRAM 1: Checks & Balances Triangle */}
                  <div className="flex justify-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 450 180" className="w-full max-w-md h-40">
                      <defs>
                        <linearGradient id="gradExec" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#4f46e5" />
                          <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                        <linearGradient id="gradLeg" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#059669" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                        <linearGradient id="gradJud" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#d97706" />
                          <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                      </defs>
                      {/* Connecting Check Lines */}
                      <line x1="225" y1="35" x2="100" y2="140" stroke="#475569" strokeWidth="2" strokeDasharray="4" />
                      <line x1="225" y1="35" x2="350" y2="140" stroke="#475569" strokeWidth="2" strokeDasharray="4" />
                      <line x1="100" y1="140" x2="350" y2="140" stroke="#475569" strokeWidth="2" strokeDasharray="4" />

                      {/* Top Node: President (Nominal) */}
                      <circle cx="225" cy="35" r="28" fill="url(#gradExec)" stroke="#a5b4fc" strokeWidth="2" />
                      <text x="225" y="32" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">President</text>
                      <text x="225" y="44" textAnchor="middle" fill="#c7d2fe" fontSize="7">Nominal Head</text>

                      {/* Left Node: PM & Council (Real Executive) */}
                      <circle cx="100" cy="140" r="28" fill="url(#gradLeg)" stroke="#6ee7b7" strokeWidth="2" />
                      <text x="100" y="137" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">PM & Cabinet</text>
                      <text x="100" y="149" textAnchor="middle" fill="#a7f3d0" fontSize="7">Real Executive</text>

                      {/* Right Node: Supreme Court (Judicial Review) */}
                      <circle cx="350" cy="140" r="28" fill="url(#gradJud)" stroke="#fde68a" strokeWidth="2" />
                      <text x="350" y="137" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Supreme Court</text>
                      <text x="350" y="149" textAnchor="middle" fill="#fef3c7" fontSize="7">Judicial Review</text>

                      <text x="225" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9">Tripartite Balance of Power under Constitution</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-slate-300 uppercase">
                          Lok Sabha Seats Won: <span className="text-gold-400 text-base">{majoritySeats}</span> / 543
                        </label>
                        <span className={`text-xs px-2 py-0.5 rounded font-bold ${isHungParliament ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                          {isHungParliament ? 'Hung Parliament (<272)' : 'Clear Majority (272+)'}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={180}
                        max={360}
                        value={majoritySeats}
                        aria-label="Set Lok Sabha seats"
                        onChange={(e) => {
                          setMajoritySeats(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />

                      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                        <div className="text-xs font-bold text-slate-400 uppercase">Presidential Discretionary Status</div>
                        <div className="text-sm font-extrabold text-amber-300 mt-1">{presidentialDiscretion.status}</div>
                        <p className="text-xs text-slate-400 mt-1">{presidentialDiscretion.desc}</p>
                      </div>
                    </div>

                    <div className="h-56 bg-slate-950 rounded-2xl p-3 border border-slate-800 flex flex-col justify-center">
                      <p className="text-xs font-semibold text-slate-400 text-center mb-2">Lok Sabha Seat Distribution</p>
                      <ResponsiveContainer width="100%" height={160}>
                        <BarChart data={seatData} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                          <XAxis type="number" domain={[0, 543]} stroke="#64748b" />
                          <YAxis type="category" dataKey="name" stroke="#94a3b8" width={80} tick={{ fontSize: 10 }} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                          <Bar dataKey="seats" radius={[0, 8, 8, 0]}>
                            {seatData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index === 0 ? (entry.seats >= 272 ? '#10b981' : '#f59e0b') : '#6366f1'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* PREDICT-THEN-CHECK */}
                  <div className="p-4 bg-gold-950/40 rounded-2xl border border-gold-800/60">
                    <p className="text-xs font-bold text-gold-300 uppercase mb-2">Predict-Then-Check Pattern</p>
                    {!predictionMade ? (
                      <div>
                        <p className="text-sm text-white mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePrediction(i)}
                              className="p-3 text-left bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-xl"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-300">
                        <span className="text-emerald-400 font-bold">Prediction recorded!</span> {PREDICTION_QUESTIONS[0].verifyInstruction}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 1: COUNCIL OF MINISTERS CONCENTRIC RINGS (SVG #2) */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="flex justify-center">
                    <svg viewBox="0 0 320 320" className="w-64 h-64">
                      {/* Outer: Council of Ministers */}
                      <circle
                        cx="160" cy="160" r="140"
                        fill="#1e1b4b" stroke="#4338ca" strokeWidth="2" strokeDasharray="4 4"
                        onClick={() => setSelectedTier('deputy')}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                      />
                      {/* Middle: Ministers of State */}
                      <circle
                        cx="160" cy="160" r="95"
                        fill="#312e81" stroke="#6366f1" strokeWidth="2"
                        onClick={() => setSelectedTier('state')}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                      />
                      {/* Inner: Cabinet Ministers */}
                      <circle
                        cx="160" cy="160" r="50"
                        fill="#4f46e5" stroke="#a5b4fc" strokeWidth="3"
                        onClick={() => setSelectedTier('cabinet')}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                      />
                      <text x="160" y="165" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Cabinet</text>
                      <text x="160" y="90" textAnchor="middle" fill="#c7d2fe" fontSize="10">Ministers of State</text>
                      <text x="160" y="40" textAnchor="middle" fill="#818cf8" fontSize="10">Deputy Ministers (Full Council: 60-80)</text>
                    </svg>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTier('cabinet')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold ${selectedTier === 'cabinet' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                      >
                        Cabinet (15-20)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTier('state')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold ${selectedTier === 'state' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                      >
                        Ministers of State
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTier('deputy')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold ${selectedTier === 'deputy' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                      >
                        Deputy Ministers
                      </motion.button>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-sm">
                      {selectedTier === 'cabinet' && (
                        <div>
                          <h4 className="font-bold text-amber-300">Inner Core: Cabinet Ministers (15–20)</h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            Senior-most leaders holding prime portfolios (Home, Defence, Finance, External Affairs). They meet weekly, take all fundamental national policy decisions, and advise the President directly.
                          </p>
                        </div>
                      )}
                      {selectedTier === 'state' && (
                        <div>
                          <h4 className="font-bold text-gold-300">Middle Tier: Ministers of State</h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            Junior ministers who either hold independent charge of specific ministries or assist Cabinet Ministers. They only attend Cabinet meetings when specifically invited.
                          </p>
                        </div>
                      )}
                      {selectedTier === 'deputy' && (
                        <div>
                          <h4 className="font-bold text-slate-300">Base Tier: Deputy Ministers (Full Council: 60–80)</h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            Attached to senior ministers for administrative and parliamentary assistance. They do not hold independent portfolios. All 3 tiers together form the Council of Ministers (Art 75).
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: EMERGENCY POWERS (352, 356, 360) WITH EMERGENCY SVG (SVG #3) */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* SVG DIAGRAM 3: Emergency Spectrum */}
                  <div className="flex justify-center bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 450 120" className="w-full max-w-lg h-28">
                      <rect x="20" y="20" width="120" height="70" rx="10" fill={emergencyType === '352' ? '#991b1b' : '#1e293b'} stroke={emergencyType === '352' ? '#ef4444' : '#475569'} strokeWidth="2" />
                      <text x="80" y="45" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Article 352</text>
                      <text x="80" y="60" textAnchor="middle" fill="#fca5a5" fontSize="8">National Emergency</text>
                      <text x="80" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="7">1 Month Approval</text>

                      <rect x="165" y="20" width="120" height="70" rx="10" fill={emergencyType === '356' ? '#854d0e' : '#1e293b'} stroke={emergencyType === '356' ? '#f59e0b' : '#475569'} strokeWidth="2" />
                      <text x="225" y="45" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Article 356</text>
                      <text x="225" y="60" textAnchor="middle" fill="#fde047" fontSize="8">President’s Rule</text>
                      <text x="225" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="7">2 Months Approval</text>

                      <rect x="310" y="20" width="120" height="70" rx="10" fill={emergencyType === '360' ? '#1e40af' : '#1e293b'} stroke={emergencyType === '360' ? '#3b82f6' : '#475569'} strokeWidth="2" />
                      <text x="370" y="45" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Article 360</text>
                      <text x="370" y="60" textAnchor="middle" fill="#93c5fd" fontSize="8">Financial Emergency</text>
                      <text x="370" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="7">Never Invoked</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { type: '352' as const, label: 'National (Art 352)', trigger: 'War / Armed Rebellion' },
                      { type: '356' as const, label: 'President’s Rule (Art 356)', trigger: 'State Machinery Failure' },
                      { type: '360' as const, label: 'Financial (Art 360)', trigger: 'Credit / Stability Threat' }
                    ].map((item) => (
                      <motion.button
                        key={item.type}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setEmergencyType(item.type);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-2xl text-left border ${
                          emergencyType === item.type
                            ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        <div className="font-bold text-xs">{item.label}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{item.trigger}</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800">
                    <h4 className="text-sm font-bold text-amber-400 mb-2">Constitutional Impact Radar:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="font-semibold text-slate-400">Federal Structure</div>
                        <div className="text-white font-bold mt-1">
                          {emergencyType === '352' ? 'Becomes Unitary (Centre legislates on State List)' : emergencyType === '356' ? 'Single State Assembly suspended' : emergencyType === '360' ? 'Centre directs State finances' : 'Normal Federal Balance'}
                        </div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="font-semibold text-slate-400">Fundamental Rights</div>
                        <div className="text-white font-bold mt-1">
                          {emergencyType === '352' ? 'Art 19 suspended (Arts 20 & 21 immune!)' : 'Fundamental Rights Intact'}
                        </div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="font-semibold text-slate-400">Parliamentary Approval</div>
                        <div className="text-white font-bold mt-1">
                          {emergencyType === '352' ? '1 Month (Special 2/3rd Majority)' : emergencyType === '356' ? '2 Months (Simple Majority)' : emergencyType === '360' ? '2 Months (Simple Majority)' : 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: JUDICIAL FORTRESS & HIERARCHY SVG (SVG #4) */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* SVG DIAGRAM 4: Judicial Hierarchy Pyramid */}
                  <div className="flex justify-center bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 400 130" className="w-full max-w-md h-32">
                      {/* Apex: Supreme Court */}
                      <polygon points="200,10 130,45 270,45" fill="#4338ca" stroke="#818cf8" strokeWidth="1.5" />
                      <text x="200" y="32" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Supreme Court (Apex)</text>

                      {/* Tier 2: High Courts */}
                      <polygon points="125,48 70,82 330,82 275,48" fill="#312e81" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="200" y="68" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">High Courts (25 in States)</text>

                      {/* Tier 3: Subordinate Courts */}
                      <polygon points="65,85 10,120 390,120 335,85" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                      <text x="200" y="106" textAnchor="middle" fill="#c7d2fe" fontSize="8">District & Sessions Courts • Subordinate Magistrates</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'tenure', label: 'Security of Tenure', art: 'Art 124(4)', desc: 'Cannot be removed except by 2/3rd parliamentary impeachment for proved misbehaviour/incapacity.' },
                      { id: 'fund', label: 'Charged Salaries', art: 'Art 125', desc: 'Charged on Consolidated Fund of India; non-votable by Parliament, immune to budget cuts.' },
                      { id: 'contempt', label: 'Contempt Power', art: 'Art 129', desc: 'Power to punish anyone who scandalizes court authority or obstructs administration of justice.' },
                      { id: 'collegium', label: 'Collegium Primacy', art: 'Art 124(2)', desc: 'Judges appointed on binding recommendation of CJI + 4 senior-most judges (NJAC struck down).' }
                    ].map((p) => (
                      <motion.div
                        key={p.id}
                        whileHover={{ scale: 1.03 }}
                        onClick={() => {
                          setSelectedPillar(p.id);
                          audioManager.play('tap');
                        }}
                        className={`p-4 rounded-2xl cursor-pointer border ${
                          selectedPillar === p.id
                            ? 'bg-gold-950/80 border-gold-500 shadow-lg shadow-gold-500/20'
                            : 'bg-slate-800/80 border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-black text-white">{p.label}</div>
                        <div className="text-[10px] text-gold-400 font-bold mt-0.5">{p.art}</div>
                        <p className="text-[11px] text-slate-300 mt-2 line-clamp-3">{p.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 4: WRIT REMEDIES INTERFACE */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'habeas', name: 'Habeas Corpus', mean: 'To have the body' },
                      { id: 'mandamus', name: 'Mandamus', mean: 'We Command' },
                      { id: 'prohibition', name: 'Prohibition', mean: 'To forbid (prevention)' },
                      { id: 'certiorari', name: 'Certiorari', mean: 'To be certified (quash)' },
                      { id: 'quowarranto', name: 'Quo Warranto', mean: 'By what authority' }
                    ].map((w) => (
                      <motion.button
                        key={w.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedWrit(w.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold ${
                          selectedWrit === w.id ? 'bg-gold-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {w.name} ({w.mean})
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    {selectedWrit === 'habeas' && 'Directs police or detaining agency to produce an arrested person within 24 hours to justify legality of detention.'}
                    {selectedWrit === 'mandamus' && 'Commands a public officer, government body, or inferior court to carry out a mandatory statutory duty.'}
                    {selectedWrit === 'prohibition' && 'Issued to an inferior court or tribunal to halt ongoing proceedings that exceed its legal jurisdiction.'}
                    {selectedWrit === 'certiorari' && 'Issued to an inferior court to call up records and quash an illegal order passed in breach of natural justice.'}
                    {selectedWrit === 'quowarranto' && 'Challenges an individual claiming a public office to prove their legal eligibility, preventing unlawful usurpation.'}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-bold">{currentSlide + 1} / {EXPLORATION_STEPS.length}</span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-black text-white">Constitutional Sandbox</h3>
                <p className="text-xs text-slate-400">Freely manipulate constitutional variables without grading pressure.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-2xl shadow-lg shadow-emerald-600/30"
              >
                Ready for Challenges! →
              </motion.button>
            </div>

            <div className="flex gap-2 mb-4 border-b border-slate-800 pb-3">
              {(['executive', 'emergency', 'judiciary', 'writs'] as const).map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSandboxTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold capitalize ${
                    sandboxTab === tab ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab}
                </motion.button>
              ))}
            </div>

            {sandboxTab === 'executive' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <label className="text-xs font-bold text-slate-300">Lok Sabha Seat Majority: {majoritySeats}</label>
                  <input
                    type="range" min={200} max={350} value={majoritySeats}
                    onChange={(e) => setMajoritySeats(Number(e.target.value))}
                    className="w-full accent-gold-500"
                  />
                  <label className="text-xs font-bold text-slate-300">Government Confidence Rating: {confidenceLevel}%</label>
                  <input
                    type="range" min={0} max={100} value={confidenceLevel}
                    onChange={(e) => setConfidenceLevel(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  {/* Live coalition arithmetic (majority mark = 272 of 543) */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                      <p className="text-[10px] text-slate-500">Margin vs 272 mark</p>
                      <p className={`font-mono font-bold ${majoritySeats >= 272 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {majoritySeats >= 272 ? '+' : ''}{majoritySeats - 272} seats
                      </p>
                    </div>
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                      <p className="text-[10px] text-slate-500">President's discretion</p>
                      <p className="font-mono font-bold text-amber-400">
                        {majoritySeats >= 272 ? 'None' : majoritySeats >= 230 ? 'Limited' : 'Full'}
                      </p>
                    </div>
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                      <p className="text-[10px] text-slate-500">MPs short of majority</p>
                      <p className="font-mono font-bold text-gold-400">{Math.max(0, 272 - majoritySeats)} MPs</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Misconception killer: the President is NOT free to pick anyone — below 272 seats discretion grows
                    only because no majority exists. And 1975 proved the reverse risk: an PM-safe majority plus a
                    no-confidence rating under 50 still cannot save a government bound by Art 75(3).
                  </p>
                  <button
                    onClick={() => { setMajoritySeats(285); setConfidenceLevel(70); }}
                    aria-label="Reset executive sandbox"
                    className="text-[10px] px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 self-start"
                  >
                    ↺ Reset (285 seats, 70%)
                  </button>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-center">
                  <canvas ref={canvasRef} width={280} height={70} className="w-full" />
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    {confidenceLevel < 50 ? '⚠️ No-Confidence Motion passes: Entire Council must resign under Art 75(3)!' : '✓ Government holds parliamentary confidence.'}
                  </p>
                </div>
              </div>
            )}

            {sandboxTab === 'emergency' && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-300">Select Emergency to Test:</div>
                <div className="flex gap-2">
                  <button onClick={() => setEmergencyType('352')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${emergencyType === '352' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300'}`}>Art 352 (National)</button>
                  <button onClick={() => setEmergencyType('356')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${emergencyType === '356' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'}`}>Art 356 (State)</button>
                  <button onClick={() => setEmergencyType('360')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${emergencyType === '360' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-300'}`}>Art 360 (Financial)</button>
                  <button onClick={() => setEmergencyType('none')} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-400">Clear</button>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl text-xs text-gold-200">
                  Active Article: <span className="font-bold text-white">{emergencyType.toUpperCase()}</span> | Centre Autonomy Index: {emergencyType === '352' ? '100% Unitary' : emergencyType === '356' ? 'State Assembly Suspended' : emergencyType === '360' ? 'Federal Finance Overridden' : 'Standard 7th Schedule Split'}
                </div>
              </div>
            )}

            {sandboxTab === 'judiciary' && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-2">
                <p className="font-bold text-gold-300">Supreme Court Collegium Composition (5 Senior-Most Judges):</p>
                <div className="grid grid-cols-5 gap-2 text-center">
                  <div className="p-2 bg-gold-900/60 rounded-lg font-bold text-white border border-gold-500">Chief Justice</div>
                  <div className="p-2 bg-slate-800 rounded-lg text-slate-300">Judge 2</div>
                  <div className="p-2 bg-slate-800 rounded-lg text-slate-300">Judge 3</div>
                  <div className="p-2 bg-slate-800 rounded-lg text-slate-300">Judge 4</div>
                  <div className="p-2 bg-slate-800 rounded-lg text-slate-300">Judge 5</div>
                </div>
                <p className="text-slate-400 mt-2">Recommendations made by this body are binding on the President (Second & Third Judges Cases).</p>
              </div>
            )}

            {sandboxTab === 'writs' && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
                <p className="text-slate-300 mb-2">Simulate an emergency petition under <span className="text-gold-400 font-bold">Article 32 (Supreme Court)</span> or <span className="text-gold-400 font-bold">Article 226 (High Court)</span>.</p>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-amber-300">
                  Did you know? Under Art 226, High Courts can issue writs for Fundamental Rights AND ordinary legal rights (&quot;any other purpose&quot;).
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-gold-400 uppercase tracking-wider">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="text-xs text-slate-400 capitalize">
                Competency: <span className="text-amber-400 font-bold">{challenge.competencyLevel}</span>
              </div>
            </div>

            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-400' :
                difficulty === 'advanced' ? 'bg-rose-500/20 text-rose-400' :
                'bg-amber-500/20 text-amber-400'
              }`}
            >
              {difficulty}
            </motion.span>
          </div>

          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* QUESTION CARD */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-3xl border transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-800'
            }`}
          >
            <p className="text-base sm:text-lg font-bold text-white mb-6 leading-snug">{challenge.question}</p>

            {/* A. MCQ TYPES: CLASSIFY / DISTINGUISH / MATCH */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation || answerRevealed}
                    className={`w-full p-4 rounded-2xl text-left text-sm font-medium transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : wrongFlash
                        ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                        : 'bg-slate-800/80 border-slate-700 hover:border-gold-500 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span> {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* B. DRAG-LABEL CHALLENGE TYPE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold cursor-grab shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {['box_pres', 'box_pm', 'box_sc', 'box_vp'].map((boxId) => (
                    <div
                      key={boxId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(boxId)}
                      className={`p-4 rounded-2xl border-2 border-dashed min-h-[70px] flex items-center justify-center text-xs font-bold transition-all ${
                        droppedLabels[boxId] ? 'bg-gold-950/40 border-gold-500 text-emerald-300' : 'bg-slate-950 border-slate-700 text-slate-500'
                      }`}
                    >
                      {droppedLabels[boxId] || `Drop: ${boxId.replace('box_', '').toUpperCase()} Position`}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="mt-3 px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Positions
                </motion.button>
              </div>
            )}

            {/* C. DRAG-SORT CHALLENGE TYPE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length ? sortArrangement.map((idx) => challenge.sortItems![idx]) : challenge.sortItems).map((item, displayIdx) => (
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
                    className="p-3 bg-slate-800 rounded-xl text-xs text-slate-200 border border-slate-700 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-gold-600/30 text-gold-300 flex items-center justify-center font-bold">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="mt-3 px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Chronological Order
                </motion.button>
              </div>
            )}

            {/* D. NUMERIC CHALLENGE TYPE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm w-44 focus:border-gold-500 outline-none"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                  >
                    Check
                  </motion.button>
                </div>
              </div>
            )}

            {/* E. CONSTRUCT CHALLENGE TYPE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-800 hover:bg-gold-700 text-white rounded-xl text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[80px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-gold-600 text-white rounded-xl text-xs flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))} className="text-rose-300 font-bold">✕</button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click parts above to assemble constitutional remedy...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Assembly
                </motion.button>
              </div>
            )}

            {/* STEP-BY-STEP PROGRESSIVE DISCLOSURE EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-800/60 rounded-2xl space-y-3"
              >
                <div className="text-xs font-black text-amber-300 uppercase tracking-wider">Step-by-Step Constitutional Breakdown:</div>
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs sm:text-sm text-amber-100/90 leading-relaxed"
                  >
                    <span className="font-bold text-amber-400">{idx + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="mt-2 px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                  >
                    Show next step →
                  </motion.button>
                )}

                {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="mt-4 block px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mastery & Complete →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-gold-950 via-slate-900 to-slate-900 rounded-3xl border border-gold-500/40 text-center space-y-4 shadow-2xl">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-5xl">🏆</motion.div>
            <h2 className="text-3xl font-black text-white">Constitutional Simulation Complete!</h2>
            <p className="text-slate-300 text-sm max-w-lg mx-auto">
              You have thoroughly mastered the Executive, Legislative, Emergency, and Judicial frameworks of the Indian Republic.
            </p>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <div className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold mt-1">Final Score</div>
              </div>
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <div className="text-2xl font-black text-gold-400 capitalize">{masteryLevel}</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold mt-1">BKT Mastery</div>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK */}
          <div className="p-5 bg-emerald-950/50 rounded-2xl border border-emerald-800/80 text-xs text-emerald-200 leading-relaxed">
            <span className="font-bold text-emerald-300">Performance Assessment: </span>
            {errors === 0
              ? 'PERFECT SCORE! Flawless command of constitutional articles, presidential discretion, and apex court writs.'
              : errors <= 3
              ? 'Excellent analytical accuracy! You have strong conceptual grounding for the ICSE Board Examination.'
              : 'Commendable effort! Review your specific misconception profile below to solidify your understanding.'}
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>💭</span> Constitutional Reflection & Self-Check
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-2">
                <label className="text-xs font-bold text-amber-300 block">1. What was the most surprising thing you learned?</label>
                <textarea
                  value={reflectionResponses.surprising}
                  onChange={(e) => setReflectionResponses(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="E.g., How the President's discretionary powers change during a hung parliament..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-gold-500 outline-none resize-none h-20"
                />
              </div>
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-2">
                <label className="text-xs font-bold text-gold-300 block">2. How would you explain this to a friend?</label>
                <textarea
                  value={reflectionResponses.explain}
                  onChange={(e) => setReflectionResponses(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="E.g., The difference between the President as nominal head and PM as real executive..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-gold-500 outline-none resize-none h-20"
                />
              </div>
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-2">
                <label className="text-xs font-bold text-emerald-300 block">3. Where in real life might you use this?</label>
                <textarea
                  value={reflectionResponses.realLife}
                  onChange={(e) => setReflectionResponses(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="E.g., Understanding news coverage of parliamentary elections, Supreme Court verdicts, or writ petitions..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-gold-500 outline-none resize-none h-20"
                />
              </div>
            </div>
          </div>

          {/* MISCONCEPTION PROFILE */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/80 space-y-3">
              <div className="text-xs font-bold text-rose-300 uppercase">Targeted Review: Misconceptions Corrected Today</div>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                    <p className="text-rose-300 font-semibold">❌ {m.misconception}</p>
                    <p className="text-emerald-300 mt-1">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* SPACED REPETITION SCHEDULE */}
          <div className="p-5 bg-amber-950/40 rounded-2xl border border-amber-800/80 text-xs text-amber-200">
            <div className="font-bold text-amber-300 uppercase mb-1">Spaced Repetition Schedule (SM-2):</div>
            <p>
              Next review session scheduled in{' '}
              <span className="font-black text-white">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </span>{' '}
              to cement these constitutional mechanisms into permanent memory.
            </p>
          </div>

          {/* REAL WORLD ACTIVITY */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>⚖️</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-gold-400 font-bold">{idx + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION ENGINE FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Crisis Resolved Constitutionally!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C10_HistoryCivicsPresidentExecutiveLegislativeSim;
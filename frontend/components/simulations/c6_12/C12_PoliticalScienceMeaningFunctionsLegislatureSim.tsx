'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C12_POL_011 = 'c12_pol_011';
const NODE_C12_POL_012 = 'c12_pol_012';
const NODE_C12_POL_013 = 'c12_pol_013';
const NODE_C12_POL_014 = 'c12_pol_014';
const NODE_C12_POL_015 = 'c12_pol_015';
const NODE_C12_POL_016 = 'c12_pol_016';
const NODE_C12_POL_017 = 'c12_pol_017';
const NODE_C12_POL_018 = 'c12_pol_018';
const NODE_C12_POL_019 = 'c12_pol_019';
const NODE_C12_POL_020 = 'c12_pol_020';

const ALL_NODE_IDS = [
  NODE_C12_POL_011,
  NODE_C12_POL_012,
  NODE_C12_POL_013,
  NODE_C12_POL_014,
  NODE_C12_POL_015,
  NODE_C12_POL_016,
  NODE_C12_POL_017,
  NODE_C12_POL_018,
  NODE_C12_POL_019,
  NODE_C12_POL_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Constitutional Conclave',
  intro:
    'You are appointed Chief Constitutional Counsel to the Republic. An emergency constitutional crisis has emerged: a contentious national security bill has passed Parliament, the Executive is preparing implementation orders, the Opposition has filed an Article 32 petition alleging violation of the Basic Structure, and citizens are debating the core values of the Preamble.',
  context:
    'Navigate the three organs of state (Legislature, Executive, Judiciary) across India and the USA, test constitutional checks and balances, and protect the foundational spirit of the Constitution.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question:
    'In a parliamentary democracy like India, if the ruling government loses a vote of confidence in the Lok Sabha on a major policy bill, what happens to the Executive?',
  options: [
    'The President immediately dissolves the Supreme Court and takes direct rule.',
    'The Prime Minister and Council of Ministers must collectively resign under Article 75(3).',
    'The Rajya Sabha steps in to rule the country for the remaining term.',
    'The Council of Ministers continues without change because their term is fixed at 5 years.',
  ],
  correctIndex: 1,
  hintAfter:
    'In parliamentary systems, the executive is fused with and daily accountable to the popular house! Let us explore how the organs interact.',
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

// ─── 22 RICH CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Legislature Functions (Foundation)
  {
    id: 'ch_pol_001',
    nodeId: NODE_C12_POL_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Which constitutional article establishes that the Indian Parliament consists of the President, Lok Sabha, and Rajya Sabha?',
    options: ['Article 52', 'Article 79', 'Article 124', 'Article 368'],
    correctIndex: 1,
    explanation:
      'Article 79 explicitly defines the Union Parliament as comprising the President and the two Houses (Lok Sabha and Rajya Sabha).',
    hints: [
      'Look at the opening provisions of Chapter II of Part V.',
      'Article 52 defines the President, Article 75 covers ministers, Article 79 constitutes Parliament.',
      'Article 79 is the foundational text establishing Parliament.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Drag-label: Organs of State (Foundation)
  {
    id: 'ch_pol_002',
    nodeId: NODE_C12_POL_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each organ of the Indian State to its primary constitutional function.',
    dragItems: [
      { label: 'Enacts & Amends Laws', targetId: 'org_leg' },
      { label: 'Implements & Administers Policy', targetId: 'org_exec' },
      { label: 'Interprets Laws & Constitution', targetId: 'org_jud' },
    ],
    correctMapping: {
      org_leg: 'Enacts & Amends Laws',
      org_exec: 'Implements & Administers Policy',
      org_jud: 'Interprets Laws & Constitution',
    },
    explanation:
      'The classical Montesquieu separation divides state power: Legislature makes law, Executive executes law, and Judiciary interprets and adjudicates law.',
    hints: [
      'Think about what each Latin root or English word means.',
      'Legislature comes from legis latum (to carry law); Executive executes.',
      'The Judiciary is the referee that tests actions against the Constitution.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Indian Legislature - Numerical (Foundation)
  {
    id: 'ch_pol_003',
    nodeId: NODE_C12_POL_012,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'How many members are currently nominated by the President of India to the Rajya Sabha for their expertise in literature, science, art, and social service under Article 80?',
    correctAnswer: 12,
    tolerance: 0,
    unit: 'members',
    explanation:
      'Under Article 80(1)(a) read with 80(3), the President nominates exactly 12 members to the Rajya Sabha with distinguished records in literature, science, art, and social service.',
    hints: [
      'Total Rajya Sabha strength is up to 250 (238 elected + nominated).',
      'It is a dozen members with eminent contributions.',
      'The correct number is 12.',
    ],
    misconceptionIndex: 1,
  },
  // 4. US Legislature - Senate vs House (Standard)
  {
    id: 'ch_pol_004',
    nodeId: NODE_C12_POL_013,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Why is the US Senate considered the most powerful second chamber in the world compared to India’s Rajya Sabha?',
    options: [
      'The US Senate can single-handedly dissolve the US Supreme Court at will.',
      'The US Senate has exclusive power to confirm presidential cabinet/judicial appointments and ratify international treaties by a 2/3 majority.',
      'The US Senate members are appointed for life by the President without elections.',
      'The US Senate exclusively initiates all money and tax bills.',
    ],
    correctIndex: 1,
    explanation:
      'Under Article II, Section 2 of the US Constitution, the Senate exercises treaty-ratification (2/3 vote) and advice/consent over executive and judicial appointments — powers no other upper chamber possesses.',
    hints: [
      'Think about foreign policy and executive confirmations.',
      'Rajya Sabha cannot block cabinet appointments; US Senate must confirm them.',
      'The Senate’s power of appointment confirmation and treaty ratification is unique.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Comparative Legislature - Drag-sort (Standard)
  {
    id: 'ch_pol_005',
    nodeId: NODE_C12_POL_014,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Order the stages through which an ordinary bill becomes law in the Indian Parliament.',
    sortItems: [
      'First Reading: Introduction of Bill and Publication in Gazette',
      'Second Reading: Clause-by-clause discussion and Committee scrutiny',
      'Third Reading: Final voting on the Bill as a whole',
      'Transmission to Second House for consideration',
      'Presidential Assent under Article 111',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      'A bill passes through First Reading (intro), Second Reading (debate & amendments), Third Reading (passage), Second Chamber review, and finally Presidential Assent under Article 111.',
    hints: [
      'Introduction happens before detailed clause debates.',
      'The second house scrutinises the bill before it goes to the President.',
      'Presidential assent is always the final step for an act.',
    ],
  },
  // 6. Political vs Permanent Executive (Foundation)
  {
    id: 'ch_pol_006',
    nodeId: NODE_C12_POL_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Which of the following belongs strictly to the PERMANENT Executive in India?',
    options: [
      'The Union Minister of External Affairs',
      'The Cabinet Secretary and IAS District Magistrate',
      'The Chief Minister of a State',
      'The President of India',
    ],
    correctIndex: 1,
    explanation:
      'The Permanent Executive consists of civil servants (IAS, IPS, IFS) recruited on merit through the UPSC, enjoying security of tenure under Article 311, unlike the elected political executive.',
    hints: [
      'Look for the career civil service that does not change with election results.',
      'Ministers and Presidents are elected/political.',
      'Cabinet Secretary and District Magistrates are career civil servants.',
    ],
    misconceptionIndex: 3,
  },
  // 7. Executive Comparison India vs USA (Standard)
  {
    id: 'ch_pol_007',
    nodeId: NODE_C12_POL_016,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'How does the removal mechanism for the Indian Prime Minister differ fundamentally from the US President?',
    options: [
      'The Indian PM can be removed anytime by a simple majority No-Confidence Motion in Lok Sabha, while the US President can only be removed via strict Impeachment for high crimes.',
      'The Indian PM requires a 3/4 majority of all states to be removed.',
      'The US President can be dismissed on a single day by the Speaker of the House.',
      'Both are removed by the identical procedure in the Supreme Court.',
    ],
    correctIndex: 0,
    explanation:
      'In India’s parliamentary model (Article 75(3)), the PM is collectively responsible to Lok Sabha and falls on a No-Confidence Motion. In the US presidential model (Article II, Sec 4), removal requires House impeachment and a 2/3 Senate conviction.',
    hints: [
      'Recall parliamentary collective responsibility versus fixed-term presidential separation.',
      'A no-confidence motion needs only a simple Lok Sabha majority.',
      'Ambedkar highlighted daily accountability in Parliament vs fixed-term impeachment in the US.',
    ],
    misconceptionIndex: 2,
  },
  // 8. Conditions of Judicial Independence (Standard)
  {
    id: 'ch_pol_008',
    nodeId: NODE_C12_POL_017,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Which constitutional safeguard guarantees that the salaries of Supreme Court judges cannot be reduced to their disadvantage during their term?',
    options: [
      'Article 125 — Charged on the Consolidated Fund of India',
      'Article 75(3) — Collective responsibility to Lok Sabha',
      'Article 123 — Presidential Ordinance Power',
      'Article 368 — Constituent amending power',
    ],
    correctIndex: 0,
    explanation:
      'Article 125 ensures financial independence by charging judges’ salaries on the Consolidated Fund of India, prohibiting disadvantageous variation during service.',
    hints: [
      'Look for the judicial chapter of Part V (Articles 124-147).',
      'Financial independence prevents executive arm-twisting through salary cuts.',
      'Article 125 governs salaries of Supreme Court judges.',
    ],
  },
  // 9. Comparative Judiciary: Tenure (Standard)
  {
    id: 'ch_pol_009',
    nodeId: NODE_C12_POL_018,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'What is the fundamental difference in tenure between an Indian Supreme Court judge and a US Federal Supreme Court Justice?',
    options: [
      'Indian judges serve for life, while US Justices retire at age 62.',
      'Indian judges retire at age 65 (Article 124(2)), whereas US Justices hold office during "good behaviour" (effectively life tenure).',
      'Indian judges are re-elected every 5 years by popular vote.',
      'US Justices are replaced every time a new President is inaugurated.',
    ],
    correctIndex: 1,
    explanation:
      'Article 124(2) mandates Indian Supreme Court judges retire at 65. Under Article III of the US Constitution, US Supreme Court Justices enjoy life tenure during good behaviour.',
    hints: [
      'Consider the recent retirement of CJI D.Y. Chandrachud at 65 vs US Justices who often serve into their 80s.',
      'US federal judges have life tenure.',
      'India has a fixed constitutional retirement age of 65.',
    ],
  },
  // 10. Judicial Review & Basic Structure (Advanced)
  {
    id: 'ch_pol_010',
    nodeId: NODE_C12_POL_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'In which landmark 1973 case did the Supreme Court of India formulate the Basic Structure Doctrine, placing limits even on Parliament’s constituent amending power under Article 368?',
    options: [
      'Marbury v. Madison',
      'Kesavananda Bharati v. State of Kerala',
      'Minerva Mills v. Union of India',
      'Golaknath v. State of Punjab',
    ],
    correctIndex: 1,
    explanation:
      'In Kesavananda Bharati (1973), a 13-judge bench held that while Parliament can amend any part of the Constitution under Article 368, it cannot alter or destroy its Basic Structure.',
    hints: [
      'It was decided on 24 April 1973 by the largest Constitution Bench in Indian history.',
      'It overturned Golaknath while establishing the basic structure test.',
      'The case is Kesavananda Bharati v. State of Kerala.',
    ],
  },
  // 11. Preamble Key Words (Standard)
  {
    id: 'ch_pol_011',
    nodeId: NODE_C12_POL_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question:
      'Which trio of words was added to the Preamble of the Indian Constitution by the 42nd Constitutional Amendment Act in 1976?',
    options: [
      'Sovereign, Democratic, Republic',
      'Socialist, Secular, Integrity',
      'Justice, Liberty, Equality',
      'Federal, Pluralist, Parliamentary',
    ],
    correctIndex: 1,
    explanation:
      'The 42nd Amendment (1976) inserted "Socialist" and "Secular" into the opening declaration and changed "unity of the Nation" to "unity and Integrity of the Nation".',
    hints: [
      'The original 1950 Preamble read "Sovereign Democratic Republic".',
      'Three words were added during the 1976 Emergency amendment.',
      'They are: Socialist, Secular, and Integrity.',
    ],
    misconceptionIndex: 4,
  },
  // 12. Application: Special Power of Rajya Sabha (Advanced)
  {
    id: 'ch_pol_012',
    nodeId: NODE_C12_POL_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'The Central Government wishes to create a new "Indian Environmental Service" under All-India Services. Under which constitutional provision must the resolution originate exclusively in the Rajya Sabha?',
    options: ['Article 109', 'Article 249', 'Article 312', 'Article 356'],
    correctIndex: 2,
    explanation:
      'Under Article 312, only the Rajya Sabha can pass a resolution with a 2/3 majority declaring it necessary in the national interest to create one or more new All-India Services.',
    hints: [
      'Article 249 is for legislating on a State List subject; Article 312 is for All-India Services.',
      'Think of the Indian Forest Service created through this route.',
      'Article 312 embodies the federal protective power of Rajya Sabha.',
    ],
  },
  // 13. Construct: Preamble Objectives (Advanced)
  {
    id: 'ch_pol_013',
    nodeId: NODE_C12_POL_020,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'Assemble the four foundational objectives of the Indian Constitution in the exact order they appear in the Preamble.',
    availableParts: ['EQUALITY', 'JUSTICE', 'FRATERNITY', 'LIBERTY'],
    targetState: 'JUSTICE LIBERTY EQUALITY FRATERNITY',
    validationHint:
      'Think of the progression: Justice (social, economic, political) → Liberty (thought, expression...) → Equality (status, opportunity) → Fraternity (dignity & integrity).',
    explanation:
      'The Preamble resolves to secure to all citizens: JUSTICE first, then LIBERTY, then EQUALITY, and finally FRATERNITY.',
    hints: [
      'Justice is listed first.',
      'Liberty follows Justice.',
      'The order is JUSTICE, LIBERTY, EQUALITY, FRATERNITY.',
    ],
  },
  // 14. Application: Money Bill Procedure (Standard)
  {
    id: 'ch_pol_014',
    nodeId: NODE_C12_POL_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A Money Bill passed by the Lok Sabha is sent to the Rajya Sabha. The Rajya Sabha takes no action for 14 days. What is the constitutional consequence under Article 109?',
    options: [
      'The Bill lapses and must be reintroduced next session.',
      'The Bill is deemed to have been passed by both Houses in the form passed by the Lok Sabha.',
      'The President must convene a Joint Sitting of Parliament under Article 108.',
      'The Supreme Court must arbitrate the deadlock.',
    ],
    correctIndex: 1,
    explanation:
      'Under Article 109(5), if the Rajya Sabha does not return a Money Bill within 14 days, it is deemed passed by both Houses in the form transmitted by Lok Sabha.',
    hints: [
      'Rajya Sabha has only a 14-day delay power over Money Bills.',
      'There is NO joint sitting for Money Bills under Article 108.',
      'It is automatically deemed passed after 14 days.',
    ],
  },
  // 15. Analysis: US Filibuster & Conference Committee (Advanced)
  {
    id: 'ch_pol_015',
    nodeId: NODE_C12_POL_013,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'When the US House of Representatives and US Senate pass differing versions of the same legislation, how is the legislative deadlock constitutionally resolved?',
    options: [
      'The President chooses which version to sign.',
      'A Conference Committee comprising senior members from both houses reconciles the differences into a unified conference report.',
      'The Chief Justice of the US Supreme Court votes to break the tie.',
      'The legislation automatically becomes law via executive order.',
    ],
    correctIndex: 1,
    explanation:
      'Unlike India where a joint sitting can be called for ordinary bills, the US bicameral deadlock is resolved through a Conference Committee that negotiates a compromise text.',
    hints: [
      'The US Congress does not hold joint sittings to vote down the Senate by numerical superiority.',
      'Both houses appoint conferees to negotiate.',
      'The body is called a Conference Committee.',
    ],
  },
  // 16. Evaluation: Judicial Review vs Parliamentary Sovereignty (Advanced)
  {
    id: 'ch_pol_016',
    nodeId: NODE_C12_POL_019,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Why did the Supreme Court in Minerva Mills (1980) strike down clauses (4) and (5) of Article 368 inserted by the 42nd Amendment?',
    options: [
      'Because they attempted to give the President absolute veto over all laws.',
      'Because they attempted to oust judicial review and grant Parliament unlimited amending power, destroying a basic feature of the Constitution.',
      'Because they reduced the term of Supreme Court judges to 3 years.',
      'Because they eliminated the Rajya Sabha’s voting rights.',
    ],
    correctIndex: 1,
    explanation:
      'In Minerva Mills (1980), the Court held that a limited amending power is itself a basic feature. Parliament cannot use Article 368 to expand its own amending power into an unlimited sovereignty.',
    hints: [
      'The 42nd Amendment attempted to bar courts from questioning constitutional amendments.',
      'Judicial review is a pillar of the Basic Structure.',
      'Ousting judicial review violates the Basic Structure Doctrine.',
    ],
  },
  // 17. Application: Dual vs Single Integrated Judiciary (Standard)
  {
    id: 'ch_pol_017',
    nodeId: NODE_C12_POL_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Unlike the United States which has separate Federal and State court hierarchies, India has:',
    options: [
      'A single integrated judicial system where the Supreme Court heads the entire hierarchy of High Courts and Subordinate Courts.',
      'Completely independent State Supreme Courts with no appeal to the Supreme Court of India.',
      'No courts at the State level.',
      'Judicial powers vested solely in State Governors.',
    ],
    correctIndex: 0,
    explanation:
      'Dr. Ambedkar emphasised that India has a single integrated judiciary enforcing both Union and State laws, whereas the US has dual federal and state judiciaries.',
    hints: [
      'Think of the pyramid structure: Supreme Court at apex, High Courts below, District courts beneath.',
      'Appeals flow upward from High Courts to Supreme Court on all subjects.',
      'India’s judicial system is single and integrated.',
    ],
  },
  // 18. Analysis: Ordinance Making Power (Standard)
  {
    id: 'ch_pol_018',
    nodeId: NODE_C12_POL_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Under Article 123, the President of India can promulgate an Ordinance. What is its mandatory legislative requirement once Parliament reassembles?',
    options: [
      'It remains law permanently without any parliamentary approval.',
      'It must be laid before both Houses and ceases to operate after 6 weeks from reassembly unless approved earlier.',
      'It is automatically referred to the US Congress for review.',
      'It requires unanimous assent of all 28 State Governors.',
    ],
    correctIndex: 1,
    explanation:
      'Under Article 123(2), an ordinance has the same force as an Act of Parliament, but must be approved within 6 weeks of Parliament’s reassembly or it lapses.',
    hints: [
      'Ordinances are temporary executive law-making when Parliament is in recess.',
      'The time limit after reassembly is measured in weeks.',
      'The limit is exactly 6 weeks from the date of reassembly.',
    ],
  },
  // 19. Competency Application: Electoral Bonds Judgment (Advanced)
  {
    id: 'ch_pol_019',
    nodeId: NODE_C12_POL_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'In February 2024, the Supreme Court struck down the Electoral Bond Scheme in ADR v. Union of India. Which fundamental right was held to be violated by anonymous political donations?',
    options: [
      'Right to Freedom of Religion (Article 25)',
      'Right to Information under Freedom of Speech and Expression (Article 19(1)(a))',
      'Right against Exploitation (Article 23)',
      'Right to Constitutional Remedies only (Article 32)',
    ],
    correctIndex: 1,
    explanation:
      'A unanimous 5-judge Constitution Bench held that voters have a fundamental Right to Information under Article 19(1)(a) regarding political party funding to make an informed electoral choice.',
    hints: [
      'The issue was voter awareness and transparency in elections.',
      'Freedom of speech includes the right to know.',
      'Article 19(1)(a) protects freedom of speech and expression.',
    ],
  },
  // 20. Preamble Interpretation: Republic & Secular (Foundation)
  {
    id: 'ch_pol_020',
    nodeId: NODE_C12_POL_020,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Match the Preamble term "REPUBLIC" with its correct constitutional meaning in the Indian context.',
    options: [
      'The head of the state (President) is elected by the people for a fixed term, not hereditary.',
      'The State has an official state religion established by law.',
      'The military holds supreme command over civilian courts.',
      'The monarch of the United Kingdom retains titular sovereign status.',
    ],
    correctIndex: 0,
    explanation:
      'A Republic means there is no hereditary monarch; all public offices are open to every citizen and the head of state is elected (directly or indirectly) for a fixed term.',
    hints: [
      'Compare India with Britain: Britain is a monarchy with an unelected King; India is a Republic.',
      'In a republic, the Head of State is elected.',
      'President Murmu was elected by an Electoral College under Article 54.',
    ],
  },
  // 21. Drag-sort: Hierarchy of Courts (Foundation)
  {
    id: 'ch_pol_021',
    nodeId: NODE_C12_POL_017,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the tiers of India’s integrated judicial hierarchy from highest to lowest authority.',
    sortItems: [
      'Supreme Court of India (Apex Court - Article 124)',
      'High Courts of the States (Article 214)',
      'District and Sessions Courts',
      'Subordinate Courts (Civil Judges / Judicial Magistrates)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'India’s judicial hierarchy runs from the Supreme Court at the apex down through State High Courts, District & Sessions Courts, to Subordinate Courts.',
    hints: [
      'The Supreme Court is the apex constitutional court.',
      'High Courts oversee state district judiciaries.',
      'Subordinate civil and magistrate courts sit at the base.',
    ],
  },
  // 22. Competency Evaluation: Separation of Powers in Practice (Advanced)
  {
    id: 'ch_pol_022',
    nodeId: NODE_C12_POL_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'In the Constituent Assembly, Dr. B.R. Ambedkar opted for the British Parliamentary model over the American Presidential model primarily because:',
    options: [
      'India required a non-democratic monarchical figurehead.',
      'The parliamentary system provides daily and continuous assessment of executive responsibility to the people’s representatives, which was deemed superior to periodic stability.',
      'The American Constitution prohibited federal courts in developing nations.',
      'The Indian states wanted absolute autonomy without central taxation.',
    ],
    correctIndex: 1,
    explanation:
      'Dr. Ambedkar eloquently stated: "The parliamentary system differs from a presidential system in that it offers daily assessment of responsibility through questions, motions, and debates, alongside periodic assessment at elections."',
    hints: [
      'Recall Ambedkar’s famous 4 November 1948 address in the Constituent Assembly.',
      'Daily accountability vs periodic election-only accountability.',
      'Ambedkar preferred continuous legislative responsibility for a young democracy.',
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
  nodeId: NODE_C12_POL_011,
  title: 'Organs of State & Constitutional Architecture',
  definition:
    'The constitutional structure of modern democracy balances the three organs of government — Legislature (law-making), Executive (administration), and Judiciary (adjudication and constitutional review) — under the guiding ideals of the Preamble.',
  eli5:
    'Think of a country like an elite cricket league: the Legislature writes the rulebook, the Executive runs the tournament and umpire team, the Judiciary acts as the neutral third umpire checking if rules were broken, and the Preamble is the league charter that promises fairness, equality, and dignity for all players.',
  misconceptions: [
    {
      misconception: 'The legislature implements and executes the laws it passes.',
      correction:
        'The legislature only enacts, amends, and repeals laws. The Executive (Council of Ministers and civil servants) is solely responsible for execution.',
    },
    {
      misconception: 'The President of India is part of the Permanent Executive because of a 5-year fixed term.',
      correction:
        'The President is the nominal head of the POLITICAL executive. The Permanent Executive consists exclusively of career civil servants (IAS/IPS) recruited via UPSC.',
    },
    {
      misconception: 'The US Senate and India’s Rajya Sabha have identical powers as second chambers.',
      correction:
        'The US Senate has unique executive powers (treaty ratification by 2/3 and cabinet/judge confirmation) that the Rajya Sabha does not possess.',
    },
    {
      misconception: 'Judicial review allows courts to rewrite legislation from scratch.',
      correction:
        'Judicial review only tests laws against the Constitution; courts can declare unconstitutional provisions void (doctrine of severability), but cannot draft statutes.',
    },
    {
      misconception: 'The words Socialist and Secular were in the original 1950 Preamble.',
      correction:
        'They were inserted by the 42nd Constitutional Amendment Act, 1976. The original 1950 Preamble read "Sovereign Democratic Republic".',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which article establishes the Parliament of India?',
      options: ['Article 52', 'Article 79', 'Article 124', 'Article 368'],
      correctIndex: 1,
    },
    {
      question: 'Under which article is the Council of Ministers collectively responsible to Lok Sabha?',
      options: ['Article 74(1)', 'Article 75(3)', 'Article 80', 'Article 110'],
      correctIndex: 1,
    },
    {
      question: 'What is the sanctioned total strength of the US Senate?',
      options: ['50', '100', '435', '543'],
      correctIndex: 1,
    },
    {
      question: 'Which body exercises the special power under Article 249 to legislate on State subjects?',
      options: ['Lok Sabha', 'Rajya Sabha', 'NITI Aayog', 'Supreme Court'],
      correctIndex: 1,
    },
    {
      question: 'What is the retirement age for a Supreme Court of India judge?',
      options: ['60 years', '62 years', '65 years', 'Life tenure'],
      correctIndex: 2,
    },
    {
      question: 'In which landmark case was the Basic Structure Doctrine established?',
      options: ['Golaknath (1967)', 'Kesavananda Bharati (1973)', 'Minerva Mills (1980)', 'Maneka Gandhi (1978)'],
      correctIndex: 1,
    },
    {
      question: 'Who serves as the ex-officio Chairman of the Rajya Sabha?',
      options: ['Prime Minister', 'Vice-President of India', 'Speaker of Lok Sabha', 'Chief Justice'],
      correctIndex: 1,
    },
    {
      question: 'Which Amendment inserted the word "Integrity" into the Indian Preamble?',
      options: ['24th Amendment', '42nd Amendment (1976)', '44th Amendment (1978)', '104th Amendment'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Student can distinguish the three organs of state in India and USA, analyse judicial review, compare executive/legislature architectures, and apply Preamble principles to real constitutional scenarios.',
};

// ─── INTERACTIVE EXPLORATION STEPS (Brilliant.org style) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Three Organs & Power Equilibrium',
    instruction:
      'Adjust the Power Balancer sliders below to see how Legislature, Executive, and Judiciary check one another.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_POL_011,
  },
  {
    title: 'Lab 2: Bicameral Lawmaking & The Indian Parliament',
    instruction:
      'Click the legislative chambers to navigate a Bill from Lok Sabha to Rajya Sabha to Presidential Assent.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_POL_012,
  },
  {
    title: 'Lab 3: India vs USA Executive Architecture',
    instruction:
      'Toggle between Parliamentary (India) and Presidential (USA) modes to observe executive accountability.',
    interactionType: 'toggle-compare',
    nodeId: NODE_C12_POL_016,
  },
  {
    title: 'Lab 4: The Judicial Review & Basic Structure Sentinel',
    instruction:
      'Test an unconstitutional statutory amendment against the Basic Structure Shield to trigger Judicial Review.',
    interactionType: 'test-shield',
    nodeId: NODE_C12_POL_019,
  },
  {
    title: 'Lab 5: Deconstructing the Preamble Blueprint',
    instruction:
      'Click each pillar keyword to inspect its constitutional anchor and fundamental rights connection.',
    interactionType: 'keyword-anchor',
    nodeId: NODE_C12_POL_020,
  },
];

// ─── PREDICTION QUESTIONS (Predict-Then-Check) ───
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: If Parliament passes a constitutional amendment eliminating Judicial Review under Article 32, what will the Supreme Court do?',
    options: [
      'Accept it because Parliament holds supreme constituent power under Article 368.',
      'Strike it down as null and void under the Basic Structure Doctrine (Kesavananda / Minerva Mills).',
      'Forward the amendment to the US Senate for international ratification.',
      'Resign en masse and dissolve the Constitution.',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Now advance to Lab 4 and click "Test Basic Structure Sentinel" to watch the judicial shield invalidate the clause!',
    nodeId: NODE_C12_POL_019,
  },
  {
    question:
      'Predict: If the US President negotiates an international peace treaty, what is required before it becomes binding US law?',
    options: [
      'A simple majority in the House of Representatives.',
      'A 2/3 supermajority concurrence in the US Senate under Article II.',
      'Unanimous agreement of all 50 State Governors.',
      'No approval is needed; the President acts alone.',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Advance to Lab 3 and select "USA Presidential System" to view the Senate treaty-ratification lock!',
    nodeId: NODE_C12_POL_013,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question:
      'What do you notice happens to the Constitutional Health index when any one organ’s power is raised to 100% (monopolised)?',
    observableOptions: [
      'Constitutional Health surges to maximum efficiency.',
      'Constitutional Health crashes because tyranny emerges without checks and balances.',
      'The country automatically switches to a US Senate model.',
      'No change occurs.',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_POL_011,
  },
  {
    question:
      'What pattern emerges when comparing the Indian Council of Ministers with the US Cabinet?',
    observableOptions: [
      'Indian ministers MUST sit in Parliament (Article 75), while US Cabinet secretaries CANNOT sit in Congress (Incompatibility Clause).',
      'Both must be elected by direct universal suffrage nationwide.',
      'US Cabinet secretaries can dissolve Congress at will.',
      'There is no difference whatsoever.',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_POL_016,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Constitutional Court Simulation: Citizen Advocate',
  description:
    'Assume the role of Lead Counsel appearing before a 5-Judge Constitution Bench of the Supreme Court of India. You must draft an oral argument outline challenging a hypothetical government notification that bans internet access across 3 districts for 6 months without judicial oversight.',
  steps: [
    '1. Identify the fundamental rights engaged (Article 19(1)(a) freedom of speech & 19(1)(g) trade).',
    '2. Apply the Proportionality Test established in the Anuradha Bhasin v. Union of India (2020) ruling.',
    '3. Invoke the Writ of Mandamus under Article 32 to direct the executive to produce review orders.',
    '4. Anchor your concluding argument in the Preamble’s promise of "LIBERTY of thought, expression, belief".',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C12_PoliticalScienceMeaningFunctionsLegislatureSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_POL_011,
  title = DEFAULT_PROPS.title || 'Organs of State & Constitutional Architecture',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['polscience'] || {
    name: 'Political Science',
    emoji: '⚖️',
    color: 'indigo',
  };

  // ─── STATE HOOKS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [errors, setErrors] = useState<number>(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Drag & Sort & Input states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery & Predict states
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);
  const [predictionMade, setPredictionMade] = useState<boolean>(false);
  const [observationAnswered, setObservationAnswered] = useState<boolean>(false);
  const [observationIndex, setObservationIndex] = useState<number>(-1);

  // Feedback states
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle] = useState<boolean>(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Exploration Interactive Variables (Sliders & Toggles)
  const [legPower, setLegPower] = useState<number>(33);
  const [execPower, setExecPower] = useState<number>(33);
  const [judPower, setJudPower] = useState<number>(34);
  const [billStage, setBillStage] = useState<'lok_sabha' | 'rajya_sabha' | 'president_assent' | 'enacted'>('lok_sabha');
  const [systemComparison, setSystemComparison] = useState<'india' | 'usa'>('india');
  const [sentinelTriggered, setSentinelTriggered] = useState<boolean>(false);
  const [selectedPreambleWord, setSelectedPreambleWord] = useState<string>('SOVEREIGN');
  const [searchArticle, setSearchArticle] = useState<string>('');
  const [impeachmentThreshold, setImpeachmentThreshold] = useState<number>(67);
  const [ordinanceActive, setOrdinanceActive] = useState<boolean>(false);
  const [collegiumIndependence, setCollegiumIndependence] = useState<number>(85);

  // Persistent BKT & Timer refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED CONSTITUTIONAL METRICS ───
  const constitutionalHealth = useMemo(() => {
    const diff1 = Math.abs(legPower - 33.33);
    const diff2 = Math.abs(execPower - 33.33);
    const diff3 = Math.abs(judPower - 33.33);
    const imbalance = diff1 + diff2 + diff3;
    return Math.max(10, Math.round(100 - imbalance * 1.5));
  }, [legPower, execPower, judPower]);

  // Filter challenges by adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPT DIFFICULTY AFTER BKT UPDATES ───
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

  // ─── CANVAS ANIMATION: CHECKS & BALANCES RADAR ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let angle = 0;

    const render = () => {
      angle += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const r = Math.min(cx, cy) - 20;

      // Background orbits
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.4, 0, Math.PI * 2);
      ctx.arc(cx, cy, r * 0.8, 0, Math.PI * 2);
      ctx.stroke();

      // Three organ nodes in equilateral triangle
      const organs = [
        { label: 'Legislature', val: legPower, color: '#6366f1', ang: 0 },
        { label: 'Executive', val: execPower, color: '#f59e0b', ang: (2 * Math.PI) / 3 },
        { label: 'Judiciary', val: judPower, color: '#10b981', ang: (4 * Math.PI) / 3 },
      ];

      // Connecting check-and-balance lines
      ctx.strokeStyle = '#475569';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      organs.forEach((o, i) => {
        const ox = cx + Math.cos(o.ang + angle * 0.3) * (r * 0.75);
        const oy = cy + Math.sin(o.ang + angle * 0.3) * (r * 0.75);
        if (i === 0) ctx.moveTo(ox, oy);
        else ctx.lineTo(ox, oy);
      });
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);

      // Nodes
      organs.forEach((o) => {
        const ox = cx + Math.cos(o.ang + angle * 0.3) * (r * 0.75);
        const oy = cy + Math.sin(o.ang + angle * 0.3) * (r * 0.75);
        const nodeRadius = 12 + (o.val / 100) * 14;

        ctx.beginPath();
        ctx.arc(ox, oy, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = o.color;
        ctx.shadowColor = o.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(o.label, ox, oy - nodeRadius - 4);
        ctx.fillText(`${Math.round(o.val)}%`, ox, oy + 3);
      });

      // Center health core
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = constitutionalHealth > 70 ? '#10b981' : constitutionalHealth > 40 ? '#f59e0b' : '#ef4444';
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 8px sans-serif';
      ctx.fillText(`${constitutionalHealth}`, cx, cy + 3);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [legPower, execPower, judPower, constitutionalHealth]);

  // ─── CALLBACK HANDLERS ───
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(
      isCorr
        ? 'Excellent constitutional insight! In parliamentary democracy, the executive is accountable to the Lok Sabha.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Constitutional Laboratories. Interact with each organ to discover state balance.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play unlocked. Experiment with constitutional variables without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Solve board-level constitutional inquiries.');
  }, []);

  const handlePrediction = useCallback((_idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive lab below to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorr = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Sharp constitutional observation!' : 'Look closely at what checks and balances require.');
  }, []);

  const handleLegPowerChange = useCallback(
    (newVal: number) => {
      setLegPower(newVal);
      const remaining = 100 - newVal;
      setExecPower(Math.round(remaining / 2));
      setJudPower(Math.round(remaining / 2));
      audioManager.play('count');
    },
    []
  );

  const handleBillStageStep = useCallback(() => {
    audioManager.play('pop');
    setBillStage((prev) => {
      if (prev === 'lok_sabha') return 'rajya_sabha';
      if (prev === 'rajya_sabha') return 'president_assent';
      if (prev === 'president_assent') {
        audioManager.play('sparkle');
        return 'enacted';
      }
      return 'lok_sabha';
    });
  }, []);

  const handleTestSentinel = useCallback(() => {
    setSentinelTriggered(true);
    audioManager.play('balance');
    speechManager.speak(
      'The Supreme Court invokes Judicial Review! Clause declared ultra vires the Basic Structure.'
    );
  }, []);

  const handlePreambleClick = useCallback((word: string) => {
    setSelectedPreambleWord(word);
    audioManager.play('tap');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding! You have mastered the Organs of State and Constitutional Law.');
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

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
        const val = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(val - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Legally sound analysis.');
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

        if (
          challenge.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(challenge.misconceptionIndex)
        ) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the constitutional rationale together.');
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

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isMatch) {
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
      const arr = prev.length > 0 ? [...prev] : (challenge.sortItems || []).map((_, i) => i);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // Clean timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── ARTICLES SEARCH LIST ───
  const constitutionalArticles = useMemo(
    () => [
      { art: 'Article 13', desc: 'Laws inconsistent with or in derogation of Fundamental Rights are void' },
      { art: 'Article 32', desc: 'Right to Constitutional Remedies (Writ jurisdiction of Supreme Court)' },
      { art: 'Article 50', desc: 'Separation of Judiciary from Executive in public services (DPSP)' },
      { art: 'Article 53', desc: 'Executive power of the Union vested in the President of India' },
      { art: 'Article 75(3)', desc: 'Collective responsibility of Council of Ministers to Lok Sabha' },
      { art: 'Article 79', desc: 'Constitution of Parliament (President + Lok Sabha + Rajya Sabha)' },
      { art: 'Article 80', desc: 'Composition of Council of States (Rajya Sabha: 238 elected + 12 nominated)' },
      { art: 'Article 81', desc: 'Composition of House of the People (Lok Sabha: direct universal suffrage)' },
      { art: 'Article 109', desc: 'Special procedure in respect of Money Bills (Lok Sabha exclusivity)' },
      { art: 'Article 111', desc: 'Presidential Assent to Bills passed by Parliament' },
      { art: 'Article 123', desc: 'Power of President to promulgate Ordinances during recess of Parliament' },
      { art: 'Article 124', desc: 'Establishment and Constitution of Supreme Court of India' },
      { art: 'Article 125', desc: 'Salaries and allowances of Supreme Court Judges charged on Consolidated Fund' },
      { art: 'Article 143', desc: 'Power of President to consult Supreme Court (Advisory Jurisdiction)' },
      { art: 'Article 226', desc: 'Power of High Courts to issue certain writs' },
      { art: 'Article 249', desc: 'Power of Parliament to legislate with respect to a matter in the State List' },
      { art: 'Article 311', desc: 'Dismissal, removal or reduction in rank of civil servants (Permanent Executive)' },
      { art: 'Article 312', desc: 'Creation of new All-India Services via Rajya Sabha 2/3 resolution' },
      { art: 'Article 368', desc: 'Power of Parliament to amend Constitution and procedure therefor' },
    ],
    []
  );

  const filteredArticles = useMemo(() => {
    if (!searchArticle.trim()) return constitutionalArticles;
    const q = searchArticle.toLowerCase();
    return constitutionalArticles.filter((a) => a.art.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q));
  }, [constitutionalArticles, searchArticle]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-xl border border-indigo-700/50">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-lg md:text-xl font-extrabold text-white tracking-wide">{title}</h1>
            <p className="text-xs text-indigo-400 font-medium">
              Class 12 ISC Political Science • Section A & B Mastery
            </p>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all capitalize ${
                phase === p
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label={`Switch to ${p} phase`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY (Curiosity Hook) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold tracking-wider uppercase mb-2">
              <span>🏛️ Narrative Hook</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-sm md:text-base text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-indigo-900/30 rounded-xl border border-indigo-700/40 text-xs text-indigo-200">
              ⚡ <span className="font-semibold">{SCENARIO.context}</span>
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">
              Curiosity Probe • Predict the Law
            </h3>
            <p className="text-base text-white font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold'
                      : discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                  }`}
                  aria-label={`Discovery option ${idx + 1}: ${opt}`}
                >
                  <span className="inline-block w-6 font-mono font-bold text-slate-400">{idx + 1}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 space-y-4">
                <div
                  className={`p-4 rounded-xl text-sm ${
                    discoveryCorrect
                      ? 'bg-emerald-900/40 border border-emerald-600 text-emerald-200'
                      : 'bg-amber-900/40 border border-amber-600 text-amber-200'
                  }`}
                >
                  {discoveryCorrect
                    ? '🎯 Accurate intuition! Article 75(3) anchors ministerial survival to Lok Sabha confidence.'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold rounded-xl shadow-lg flex items-center gap-2"
                  aria-label="Advance to Interactive Exploration Laboratories"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: EXPLORE (5 Brilliant-style Interactive Labs) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step tabs */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex flex-wrap gap-2">
              {EXPLORATION_STEPS.map((s, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(idx);
                    audioManager.play('tap');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    currentSlide === idx
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                  }`}
                  aria-label={`Go to ${s.title}`}
                >
                  Lab {idx + 1}
                </motion.button>
              ))}
            </div>
            <span className="text-xs font-mono text-slate-500">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.25 }}
              className="p-5 md:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <h3 className="text-lg md:text-xl font-black text-indigo-300">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-sm text-amber-400 mt-1 font-medium">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB 1: POWER BALANCER & RADAR CANVAS ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-indigo-400 mb-1">
                        <span>Legislative Authority (Parliament): {legPower}%</span>
                        <span>Makes Laws</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={80}
                        value={legPower}
                        onChange={(e) => handleLegPowerChange(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Legislative authority slider"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-amber-400 font-semibold block">Executive Power</span>
                        <span className="text-lg font-mono font-bold text-white">{execPower}%</span>
                        <p className="text-[10px] text-slate-500 mt-0.5">Administers state policies</p>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-emerald-400 font-semibold block">Judicial Power</span>
                        <span className="text-lg font-mono font-bold text-white">{judPower}%</span>
                        <p className="text-[10px] text-slate-500 mt-0.5">Reviews constitutionality</p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-semibold text-slate-300">Constitutional Health Indicator</span>
                        <span
                          className={`text-xs font-mono font-bold ${
                            constitutionalHealth > 70
                              ? 'text-emerald-400'
                              : constitutionalHealth > 40
                              ? 'text-amber-400'
                              : 'text-rose-400'
                          }`}
                        >
                          {constitutionalHealth}%
                        </span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${
                            constitutionalHealth > 70
                              ? 'bg-emerald-500'
                              : constitutionalHealth > 40
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                          animate={{ width: `${constitutionalHealth}%` }}
                        />
                      </div>
                    </div>

                    {/* Live consequences of the power mix (real constitutional mechanics) */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        <p className="text-[10px] text-slate-500">Bills passed per session (of 40)</p>
                        <p className="font-mono font-bold text-indigo-300">{Math.round((legPower / 80) * 40)} bills</p>
                      </div>
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        <p className="text-[10px] text-slate-500">Executive orders struck down</p>
                        <p className="font-mono font-bold text-amber-300">{Math.max(0, Math.round((legPower - execPower) / 4))} orders</p>
                      </div>
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        <p className="text-[10px] text-slate-500">Laws voided as unconstitutional</p>
                        <p className={`font-mono font-bold ${judPower > legPower ? 'text-emerald-300' : 'text-rose-300'}`}>{Math.max(0, Math.round((judPower - legPower / 2) / 3))} laws</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Misconception killer: the three organs are not rivals to be "won" — a legislature that grabs 80%
                      power passes laws fast but loses the judicial check, and constitutional health falls. Drag the
                      legislative slider to 80 and watch which number explodes first.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setLegPower(33); setExecPower(33); setJudPower(34); }}
                        aria-label="Reset power balance"
                        className="text-[10px] px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
                      >
                        ↺ Reset balance (33/33/34)
                      </button>
                    </div>

                    {/* Observation Question inside Lab */}
                    {Math.abs(legPower - 33) > 15 && !observationAnswered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-indigo-950/70 rounded-xl border border-indigo-700/60"
                      >
                        <p className="text-xs font-bold text-indigo-200 mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                        <div className="space-y-1.5">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleObservation(i)}
                              className={`w-full text-left p-2 rounded-lg text-xs font-medium border ${
                                observationIndex === i
                                  ? i === OBSERVATION_QUESTIONS[0].correctIndex
                                    ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                    : 'bg-rose-950 border-rose-500 text-rose-200'
                                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                              }`}
                              aria-label={`Observation option ${i + 1}`}
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Animated Checks & Balances Canvas */}
                  <div className="flex flex-col items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <canvas ref={canvasRef} width={280} height={220} className="w-full max-w-[280px]" />
                    <p className="text-[11px] text-slate-500 text-center mt-2">
                      Tripartite equilibrium ensures no single organ establishes tyrannical dominance.
                    </p>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: BICAMERAL BILL PASSAGE SIMULATOR (WITH SVG 1) ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* TOPIC SPECIFIC SVG 1: Article 79 Bicameral Parliament Architecture */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 600 160" className="w-full max-w-xl h-auto">
                      <rect x="10" y="10" width="580" height="140" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                      
                      {/* President Box */}
                      <rect x="230" y="20" width="140" height="40" rx="8" fill={billStage === 'president_assent' || billStage === 'enacted' ? '#065f46' : '#1e1b4b'} stroke={billStage === 'president_assent' ? '#10b981' : '#6366f1'} strokeWidth="2" />
                      <text x="300" y="38" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">President of India</text>
                      <text x="300" y="52" textAnchor="middle" fill="#94a3b8" fontSize="8">Article 111 (Assent)</text>

                      {/* Lok Sabha Box */}
                      <rect x="40" y="90" width="220" height="45" rx="8" fill={billStage === 'lok_sabha' ? '#1e3a8a' : '#1e293b'} stroke={billStage === 'lok_sabha' ? '#38bdf8' : '#475569'} strokeWidth="2" />
                      <text x="150" y="110" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Lok Sabha (House of the People)</text>
                      <text x="150" y="125" textAnchor="middle" fill="#94a3b8" fontSize="8">543 Elected MPs • Article 81</text>

                      {/* Rajya Sabha Box */}
                      <rect x="340" y="90" width="220" height="45" rx="8" fill={billStage === 'rajya_sabha' ? '#1e3a8a' : '#1e293b'} stroke={billStage === 'rajya_sabha' ? '#38bdf8' : '#475569'} strokeWidth="2" />
                      <text x="450" y="110" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Rajya Sabha (Council of States)</text>
                      <text x="450" y="125" textAnchor="middle" fill="#94a3b8" fontSize="8">238 Elected + 12 Nominated • Article 80</text>

                      {/* Connection Lines */}
                      <path d="M 150 90 L 150 60 L 230 40" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                      <path d="M 450 90 L 450 60 L 370 40" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                    </svg>
                    <span className="text-[11px] text-indigo-400 mt-2 font-medium">Article 79: Union Parliament = President + Lok Sabha + Rajya Sabha</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {[
                      {
                        id: 'lok_sabha',
                        title: '1. Lok Sabha',
                        subtitle: 'Popular Chamber (543 MPs)',
                        desc: 'Article 81: Directly elected by universal adult franchise. Initiates Money Bills.',
                      },
                      {
                        id: 'rajya_sabha',
                        title: '2. Rajya Sabha',
                        subtitle: 'Council of States (245 MPs)',
                        desc: 'Article 80: Federal chamber (238 state elected + 12 nominated). Permanent body.',
                      },
                      {
                        id: 'president_assent',
                        title: '3. Presidential Assent',
                        subtitle: 'Part of Parliament (Art 79)',
                        desc: 'Article 111: President assents, withholds, or returns ordinary bills for reconsideration.',
                      },
                      {
                        id: 'enacted',
                        title: '4. Act of Law',
                        subtitle: 'Gazette of India',
                        desc: 'Enacted statute published and enforceable across the territory of India.',
                      },
                    ].map((st) => (
                      <motion.div
                        key={st.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-3.5 rounded-xl border transition-all ${
                          billStage === st.id
                            ? 'bg-indigo-950/80 border-indigo-500 text-white shadow-lg ring-1 ring-indigo-400'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="text-xs font-bold text-indigo-400">{st.title}</div>
                        <div className="text-xs font-semibold text-slate-200 mt-0.5">{st.subtitle}</div>
                        <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{st.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-amber-400 block">Current Bill Status</span>
                      <p className="text-sm text-slate-200">
                        {billStage === 'lok_sabha' && 'Bill undergoing Clause-by-Clause scrutiny in Lok Sabha.'}
                        {billStage === 'rajya_sabha' && 'Transmitted to Rajya Sabha for federal debate & voting.'}
                        {billStage === 'president_assent' && 'Passed both Houses. Awaiting Presidential signature.'}
                        {billStage === 'enacted' && '🎉 Bill enacted into official law under Article 111!'}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleBillStageStep}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg shadow"
                      aria-label="Advance Bill to next legislative stage"
                    >
                      {billStage === 'enacted' ? 'Reset Legislative Flow ⟲' : 'Transmit Bill to Next Stage →'}
                    </motion.button>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: INDIA VS USA COMPARATIVE MATRIX (WITH SVG 2) ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* TOPIC SPECIFIC SVG 2: Constitutional Architecture Matrix (Parliamentary Fusion vs Presidential Separation) */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 600 160" className="w-full max-w-xl h-auto">
                      <rect x="10" y="10" width="275" height="140" rx="10" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="147" y="30" textAnchor="middle" fill="#818cf8" fontSize="11" fontWeight="bold">INDIA: Parliamentary Fusion</text>
                      
                      {/* Fused circle */}
                      <circle cx="110" cy="85" r="40" fill="#4338ca" fillOpacity="0.4" stroke="#6366f1" strokeWidth="2" />
                      <text x="90" y="85" textAnchor="middle" fill="#e0e7ff" fontSize="9" fontWeight="bold">Legislature</text>
                      <circle cx="180" cy="85" r="40" fill="#b45309" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="2" />
                      <text x="200" y="85" textAnchor="middle" fill="#fef3c7" fontSize="9" fontWeight="bold">Executive</text>
                      <text x="145" y="90" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">PM / CoM</text>
                      <text x="147" y="138" textAnchor="middle" fill="#94a3b8" fontSize="7.5">Article 75(3): Fused & Accountable</text>

                      <rect x="315" y="10" width="275" height="140" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="452" y="30" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">USA: Strict Separation of Powers</text>
                      
                      {/* Disjoint circles */}
                      <circle cx="380" cy="85" r="32" fill="#4338ca" fillOpacity="0.3" stroke="#6366f1" strokeWidth="2" />
                      <text x="380" y="88" textAnchor="middle" fill="#e0e7ff" fontSize="8.5" fontWeight="bold">Congress</text>
                      <circle cx="525" cy="85" r="32" fill="#b45309" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="2" />
                      <text x="525" y="88" textAnchor="middle" fill="#fef3c7" fontSize="8.5" fontWeight="bold">President</text>
                      <path d="M 415 85 L 490 85" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                      <text x="452" y="80" textAnchor="middle" fill="#f87171" fontSize="8">NO FUSION</text>
                      <text x="452" y="138" textAnchor="middle" fill="#94a3b8" fontSize="7.5">Incompatibility Clause: Independent Tenures</text>
                    </svg>
                  </div>

                  {/* Predict Then Check Hook */}
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-700/50 mb-3">
                      <span className="text-xs font-bold text-amber-400 block mb-1">
                        Predict-Then-Check Inquiry
                      </span>
                      <p className="text-xs text-white font-medium mb-2">{PREDICTION_QUESTIONS[1].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="text-left p-2 bg-slate-900 hover:bg-slate-850 rounded-lg text-xs text-slate-300 border border-slate-800"
                            aria-label={`Prediction option ${i + 1}`}
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSystemComparison('india');
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        systemComparison === 'india'
                          ? 'bg-indigo-600 border-indigo-400 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                      aria-label="View India Parliamentary Architecture"
                    >
                      🇮🇳 India: Parliamentary (Westminster)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSystemComparison('usa');
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        systemComparison === 'usa'
                          ? 'bg-amber-600 border-amber-400 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                      aria-label="View USA Presidential Architecture"
                    >
                      🇺🇸 USA: Presidential (Separation of Powers)
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                        Executive Type
                      </h4>
                      <p className="text-sm font-semibold text-white">
                        {systemComparison === 'india'
                          ? 'Dual Executive: Titular President + Real PM'
                          : 'Single Executive: President (Head of State & Govt)'}
                      </p>
                      <p className="text-xs text-slate-400 mt-2">
                        {systemComparison === 'india'
                          ? 'President exercises powers on binding aid & advice of Council of Ministers (Article 74).'
                          : 'US President holds real executive authority directly under Article II.'}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                        Legislative Accountability
                      </h4>
                      <p className="text-sm font-semibold text-white">
                        {systemComparison === 'india'
                          ? 'Collective Responsibility (Art 75(3))'
                          : 'Separation of Powers & Fixed 4-Yr Term'}
                      </p>
                      <p className="text-xs text-slate-400 mt-2">
                        {systemComparison === 'india'
                          ? 'Lok Sabha can dismiss the government via simple majority No-Confidence Motion.'
                          : 'President cannot be removed by no-confidence; only via 2/3 Senate Impeachment.'}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                        Upper Chamber Powers
                      </h4>
                      <p className="text-sm font-semibold text-white">
                        {systemComparison === 'india'
                          ? 'Rajya Sabha: Federal Revising'
                          : 'Senate: World’s Most Powerful 2nd Chamber'}
                      </p>
                      <p className="text-xs text-slate-400 mt-2">
                        {systemComparison === 'india'
                          ? 'Article 249 (State lists) & Article 312 (All-India Services). No treaty veto.'
                          : 'Ratifies international treaties (2/3) and confirms Cabinet/Judge appointments.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: JUDICIAL REVIEW & BASIC STRUCTURE SENTINEL (WITH SVG 3) ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* Predict Then Check Hook */}
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-700/50 mb-3">
                      <span className="text-xs font-bold text-amber-400 block mb-1">
                        Predict-Then-Check Inquiry
                      </span>
                      <p className="text-xs text-white font-medium mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="text-left p-2 bg-slate-900 hover:bg-slate-850 rounded-lg text-xs text-slate-300 border border-slate-800"
                            aria-label={`Prediction option ${i + 1}`}
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 max-w-lg">
                      <span className="text-xs font-bold text-rose-400 tracking-wider uppercase block">
                        Hypothetical Unconstitutional Statute
                      </span>
                      <h4 className="text-base font-bold text-white">
                        &quot;National Security Clause §42: All Citizen Petitions under Article 32 Prohibited&quot;
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Parliament has passed this clause under Article 368. Can Parliament extinguish the power of
                        Judicial Review and Fundamental Rights enforcement?
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleTestSentinel}
                        className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg mt-2"
                        aria-label="Invoke Judicial Review against unconstitutional statute"
                      >
                        🛡️ Trigger Judicial Review Sentinel (Kesavananda / Minerva Mills)
                      </motion.button>
                    </div>

                    {/* Sentinel SVG Shield */}
                    <div className="w-48 h-48 relative flex items-center justify-center">
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        <polygon
                          points="100,20 170,50 170,130 100,180 30,130 30,50"
                          fill={sentinelTriggered ? '#064e3b' : '#1e1b4b'}
                          stroke={sentinelTriggered ? '#10b981' : '#6366f1'}
                          strokeWidth="3"
                          className="transition-colors duration-500"
                        />
                        <text
                          x="100"
                          y="90"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          BASIC STRUCTURE
                        </text>
                        <text
                          x="100"
                          y="110"
                          textAnchor="middle"
                          fill={sentinelTriggered ? '#34d399' : '#a5b4fc'}
                          fontSize="9"
                        >
                          {sentinelTriggered ? 'STATUTE VOIDED (Art 13)' : 'SENTINEL ACTIVE'}
                        </text>
                      </svg>
                    </div>
                  </div>

                  {sentinelTriggered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 bg-emerald-950/60 border border-emerald-600/70 rounded-xl text-xs text-emerald-200"
                    >
                      ✓ <span className="font-bold">Verdict:</span> The Supreme Court strikes down Clause §42 under
                      Articles 13 & 32. As held in Kesavananda Bharati (1973) and Minerva Mills (1980), Judicial Review is
                      an inviolable part of the Basic Structure.
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── LAB 5: PREAMBLE DECONSTRUCTOR ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        word: 'SOVEREIGN',
                        meaning: 'Free from external control; supreme internal authority.',
                        art: 'Articles 1-4 (Territory & Cession)',
                      },
                      {
                        word: 'SOCIALIST',
                        meaning: 'Welfare state promoting equitable wealth distribution (Added by 42nd Amendment, 1976).',
                        art: 'Articles 38 & 39 (DPSPs)',
                      },
                      {
                        word: 'SECULAR',
                        meaning: 'Equal respect to all religions; no state religion (Added by 42nd Amendment, 1976).',
                        art: 'Articles 25-28 (Freedom of Religion)',
                      },
                      {
                        word: 'DEMOCRATIC',
                        meaning: 'Government by the people via universal adult franchise.',
                        art: 'Article 326 (Elections)',
                      },
                      {
                        word: 'REPUBLIC',
                        meaning: 'Elected Head of State (President); no hereditary monarch.',
                        art: 'Articles 52 & 54',
                      },
                      {
                        word: 'JUSTICE',
                        meaning: 'Social, Economic, and Political fairness.',
                        art: 'Articles 14, 15, 16 & Part IV',
                      },
                      {
                        word: 'LIBERTY',
                        meaning: 'Freedom of thought, expression, belief, faith, and worship.',
                        art: 'Articles 19 & 25',
                      },
                      {
                        word: 'EQUALITY',
                        meaning: 'Equality of status and of opportunity; abolition of untouchability.',
                        art: 'Articles 14-18',
                      },
                      {
                        word: 'FRATERNITY',
                        meaning: 'Assuring individual dignity and national unity & integrity.',
                        art: 'Article 51A (Fundamental Duties)',
                      },
                    ].map((item) => (
                      <motion.button
                        key={item.word}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePreambleClick(item.word)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          selectedPreambleWord === item.word
                            ? 'bg-amber-600 border-amber-400 text-white shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850'
                        }`}
                        aria-label={`Inspect Preamble keyword ${item.word}`}
                      >
                        {item.word}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                      Constitutional Pillar: {selectedPreambleWord}
                    </span>
                    <p className="text-sm font-semibold text-white mt-1">
                      {selectedPreambleWord === 'SOVEREIGN' && 'India is an independent state capable of acquiring or ceding territory.'}
                      {selectedPreambleWord === 'SOCIALIST' && 'Commitment to democratic socialism, ending poverty, ignorance, and disease.'}
                      {selectedPreambleWord === 'SECULAR' && 'Sarva Dharma Sambhava: State maintains principled neutrality toward all faiths.'}
                      {selectedPreambleWord === 'DEMOCRATIC' && 'Representative parliamentary democracy operating through universal adult franchise.'}
                      {selectedPreambleWord === 'REPUBLIC' && 'No hereditary monarch; President is indirectly elected by elected MPs and MLAs.'}
                      {selectedPreambleWord === 'JUSTICE' && 'Social justice (eliminating discrimination), economic justice, and political access.'}
                      {selectedPreambleWord === 'LIBERTY' && 'Positive conditions for individual self-expression and conscience.'}
                      {selectedPreambleWord === 'EQUALITY' && 'Rule of law under Article 14; prohibition of discrimination under Article 15.'}
                      {selectedPreambleWord === 'FRATERNITY' && 'Emotional integration and mutual brotherhood across 1.4 billion citizens.'}
                    </p>
                    <div className="mt-3 inline-block px-2.5 py-1 bg-indigo-950/70 border border-indigo-700/50 rounded-lg text-xs font-mono text-indigo-300">
                      Constitutional Link: {selectedPreambleWord === 'SOCIALIST' || selectedPreambleWord === 'SECULAR' ? '42nd Amendment (1976)' : 'Original 1950 Text'}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Buttons */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
              aria-label="Previous laboratory"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs font-mono text-slate-500">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('tap');
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow"
                aria-label="Next laboratory"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg"
                aria-label="Advance to Sandbox Mode"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX (Free Play) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-black text-indigo-300">Constitutional Sandbox Laboratory</h3>
              <span className="px-2.5 py-1 bg-emerald-950/70 border border-emerald-700/60 rounded-lg text-[11px] font-bold text-emerald-400">
                Free Exploration • Zero Pressure
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Experiment with organ parameters, test ordinance triggers, and simulate constitutional amendments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Control 1: Impeachment Threshold */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-indigo-400 block">
                Judicial Removal Majority: {impeachmentThreshold}%
              </span>
              <input
                type="range"
                min={50}
                max={90}
                value={impeachmentThreshold}
                onChange={(e) => setImpeachmentThreshold(Number(e.target.value))}
                className="w-full accent-indigo-500"
                aria-label="Impeachment threshold slider"
              />
              <p className="text-[11px] text-slate-400">
                Article 124(4) requires 2/3 (66.7%) of members present and voting in each House on grounds of proved
                misbehaviour or incapacity.
              </p>
            </div>

            {/* Control 2: Collegium Independence */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 block">
                Collegium Judicial Autonomy: {collegiumIndependence}%
              </span>
              <input
                type="range"
                min={30}
                max={100}
                value={collegiumIndependence}
                onChange={(e) => setCollegiumIndependence(Number(e.target.value))}
                className="w-full accent-emerald-500"
                aria-label="Collegium independence slider"
              />
              <p className="text-[11px] text-slate-400">
                Higher values reflect the Three Judges Cases precedent shielding judicial appointments from executive
                patronage.
              </p>
            </div>

            {/* Control 3: Emergency Ordinance Trigger */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 block">Presidential Ordinance Mode (Art 123)</span>
                <p className="text-[11px] text-slate-400 mt-1">
                  Promulgate temporary emergency laws when Parliament is in recess.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setOrdinanceActive((prev) => !prev);
                  audioManager.play('tap');
                }}
                className={`w-full py-2 rounded-xl text-xs font-bold border transition-all ${
                  ordinanceActive
                    ? 'bg-amber-600 border-amber-400 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
                aria-label="Toggle Presidential Ordinance Mode"
              >
                {ordinanceActive ? '⚠️ Ordinance Active (6-Week Clock Running)' : 'Promulgate Article 123 Ordinance'}
              </motion.button>
            </div>
          </div>

          {/* Interactive Articles Explorer */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-white">Constitutional Articles Reference Bank</h4>
              <input
                type="text"
                placeholder="Search articles (e.g., 79, 124, 368, money bill)..."
                value={searchArticle}
                onChange={(e) => setSearchArticle(e.target.value)}
                className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-full sm:w-64"
                aria-label="Search constitutional articles"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
              {filteredArticles.map((a) => (
                <div key={a.art} className="p-2.5 bg-slate-950 rounded-xl border border-slate-855">
                  <span className="text-xs font-mono font-bold text-indigo-400 block">{a.art}</span>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg flex items-center gap-2"
            aria-label="Ready for Board Level Challenges"
          >
            Ready for Challenges! →
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE (20+ Board Competency Questions) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress & Difficulty Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 border border-emerald-700 text-emerald-400'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950 border border-rose-700 text-rose-400'
                    : 'bg-indigo-950 border border-indigo-700 text-indigo-400'
                }`}
              >
                {difficulty}
              </motion.span>
              <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded-md text-[10px] font-mono text-slate-400 uppercase">
                NEP: {challenge.competencyLevel}
              </span>
            </div>

            <span className="text-xs font-mono text-slate-400">
              Mastery: <span className="font-bold text-indigo-300">{masteryLevel}</span>
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Challenge Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-bold text-white leading-snug">{challenge.question}</h3>

            {/* MCQ / Classify / Distinguish / Match */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all ${
                        wrongFlash
                          ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                          : 'bg-slate-950 hover:bg-slate-850 border-slate-800 text-slate-200'
                      }`}
                      aria-label={`Option ${i + 1}: ${opt}`}
                    >
                      <span className="inline-block w-6 font-mono font-bold text-slate-400">{i + 1}.</span> {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag-label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-xl cursor-grab text-white text-xs font-bold shadow"
                      aria-label={`Draggable label: ${item.label}`}
                    >
                      ⠿ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { targetId: 'org_leg', title: '1. Legislature' },
                    { targetId: 'org_exec', title: '2. Executive' },
                    { targetId: 'org_jud', title: '3. Judiciary' },
                  ].map((t) => (
                    <div
                      key={t.targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(t.targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] text-center transition-all ${
                        droppedLabels[t.targetId]
                          ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold'
                          : 'border-slate-700 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-400 block mb-1">{t.title}</span>
                      <span className="text-xs">{droppedLabels[t.targetId] || 'Drop matching function here'}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                  aria-label="Verify dragged labels"
                >
                  Verify Organ Functions →
                </motion.button>
              </div>
            )}

            {/* Drag-sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
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
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 cursor-grab flex items-center justify-between"
                      aria-label={`Sort item ${displayIndex + 1}: ${item}`}
                    >
                      <span>
                        <span className="font-bold text-indigo-400 mr-2">{displayIndex + 1}.</span> {item}
                      </span>
                      <span className="text-slate-600">⠿</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                  aria-label="Submit arranged order"
                >
                  Check Sequence →
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter number..."
                    className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 w-48"
                    aria-label="Numeric answer input"
                  />
                  <span className="text-xs text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow disabled:opacity-40"
                    aria-label="Check numeric answer"
                  >
                    Check →
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 rounded-xl text-white text-xs font-bold shadow"
                      aria-label={`Add part ${part}`}
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[60px] p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-2.5 py-1 bg-indigo-900 border border-indigo-600 rounded-lg text-xs text-indigo-200 font-bold flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 ml-1 font-mono"
                        aria-label={`Remove part ${part}`}
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click components above in sequence</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow disabled:opacity-40"
                  aria-label="Verify constructed sequence"
                >
                  Verify Structure →
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-indigo-950/70 border border-indigo-700/60 rounded-xl space-y-3"
              >
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold tracking-wider uppercase">
                  <span>📜 Constitutional Explanation</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-indigo-100 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold"
                    aria-label="Reveal next explanation sentence"
                  >
                    Show next step →
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="mt-2 px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg block"
                    aria-label="Advance to Next Challenge"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL WORLD IMPACT ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-3">
            <h2 className="text-2xl font-black text-white">Constitutional Simulation Complete!</h2>
            <p className="text-sm text-slate-300">
              Final Competency Score: <span className="font-mono font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
            </p>
            <p className="text-xs text-slate-400">
              Assessed Mastery Level: <span className="font-bold text-indigo-300 uppercase">{masteryLevel}</span>
            </p>
          </div>

          {/* Personalized Motivational Feedback */}
          <div
            className={`p-4 rounded-xl border text-sm font-semibold ${
              errors === 0
                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                : errors <= 3
                ? 'bg-indigo-950/70 border-indigo-500 text-indigo-200'
                : errors <= 7
                ? 'bg-amber-950/70 border-amber-500 text-amber-200'
                : 'bg-rose-950/70 border-rose-500 text-rose-200'
            }`}
          >
            {errors === 0 && 'PERFECT SCORE! Outstanding constitutional mastery across all three organs and comparative frameworks!'}
            {errors >= 1 && errors <= 3 && 'Great work! Excellent grasp of legislative control, judicial review, and the Preamble.'}
            {errors >= 4 && errors <= 7 && 'Good effort! You understand the key mechanisms, keep revising the core constitutional articles.'}
            {errors >= 8 && 'Do not give up — You WILL get this! Review the misconceptions and try the challenges again!'}
          </div>

          {/* ─── PROMINENT SPACED REPETITION VISIBILITY CARD ─── */}
          <div className="p-5 bg-gradient-to-r from-indigo-950/90 via-slate-900 to-purple-950/90 rounded-2xl border border-indigo-500/50 shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">📅</span>
                <span className="text-sm font-bold text-indigo-200 uppercase tracking-wide">
                  Spaced Repetition Schedule (SM-2 Algorithm)
                </span>
              </div>
              <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-400 text-indigo-300 rounded-full text-xs font-mono font-bold shadow-inner">
                {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on your session diagnostics ({errors} error{errors === 1 ? '' : 's'}), your optimal memory retention interval has been scheduled:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs pt-1">
              <div
                className={`p-3 rounded-xl border transition-all ${
                  errors === 0
                    ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 font-bold ring-2 ring-emerald-500/50 shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                }`}
              >
                <div className="text-[10px] uppercase font-mono tracking-wider">0 Errors</div>
                <div className="text-sm font-bold mt-0.5">review in 7 days</div>
                <div className="text-[9px] mt-0.5 opacity-80">Optimal Long-Term Retention</div>
              </div>
              <div
                className={`p-3 rounded-xl border transition-all ${
                  errors >= 1 && errors <= 3
                    ? 'bg-indigo-950/80 border-indigo-400 text-indigo-200 font-bold ring-2 ring-indigo-500/50 shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                }`}
              >
                <div className="text-[10px] uppercase font-mono tracking-wider">1–3 Errors</div>
                <div className="text-sm font-bold mt-0.5">review in 3 days</div>
                <div className="text-[9px] mt-0.5 opacity-80">Reinforcement Interval</div>
              </div>
              <div
                className={`p-3 rounded-xl border transition-all ${
                  errors >= 4
                    ? 'bg-amber-950/80 border-amber-400 text-amber-200 font-bold ring-2 ring-amber-500/50 shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                }`}
              >
                <div className="text-[10px] uppercase font-mono tracking-wider">4+ Errors</div>
                <div className="text-sm font-bold mt-0.5">review in 1 day</div>
                <div className="text-[9px] mt-0.5 opacity-80">Immediate Diagnostic Followup</div>
              </div>
            </div>
          </div>

          {/* Misconception Tracking Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Profile:</h3>
              <p className="text-xs text-slate-400">Review these specific conceptual nuances to avoid losing marks:</p>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-rose-400">❌ {m.misconception}</p>
                    <p className="text-xs text-emerald-300 mt-1">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real World Activity Arc */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i}>{st}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Threshold Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C12_PoliticalScienceMeaningFunctionsLegislatureSim;
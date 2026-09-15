'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C12_POL_001 = 'c12_pol_001';
const NODE_C12_POL_002 = 'c12_pol_002';
const NODE_C12_POL_003 = 'c12_pol_003';
const NODE_C12_POL_004 = 'c12_pol_004';
const NODE_C12_POL_005 = 'c12_pol_005';
const NODE_C12_POL_006 = 'c12_pol_006';
const NODE_C12_POL_007 = 'c12_pol_007';
const NODE_C12_POL_008 = 'c12_pol_008';
const NODE_C12_POL_009 = 'c12_pol_009';
const NODE_C12_POL_010 = 'c12_pol_010';

const ALL_NODE_IDS = [
  NODE_C12_POL_001,
  NODE_C12_POL_002,
  NODE_C12_POL_003,
  NODE_C12_POL_004,
  NODE_C12_POL_005,
  NODE_C12_POL_006,
  NODE_C12_POL_007,
  NODE_C12_POL_008,
  NODE_C12_POL_009,
  NODE_C12_POL_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Architect of the Republic',
  intro: 'The newly liberated nation of Valoria is framing its constitution. As Chief Constitutional Advisor, you must choose how power is concentrated, distributed, held accountable, and renewed by the people.',
  context: 'Will Valoria preserve civil liberties or fall into authoritarian overreach? Should it centralize power like Westminster or divide it like Washington? Every choice will shape citizen life.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In 1975, India imposed an internal Emergency curtailing liberties, but lifted it in 1977 and held free elections where the ruling party was voted out. Does this make the Emergency authoritarian or totalitarian?',
  options: [
    'Totalitarian — because press censorship and MISA arrests occurred.',
    'Authoritarian — because political opposition was suppressed, but private religion, economy, and general social life were not remoulded into an official ideology.',
    'Neither — it was standard liberal democracy with emergency powers.',
    'Pure Dictatorship — with no constitutional mechanisms remaining.',
  ],
  correctIndex: 1,
  hintAfter: 'Authoritarian states suppress political challenges while leaving private life largely alone. Totalitarian states seek complete transformation of society under an official ideology.',
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
  bloomLevel?: string;
}

// ─── CHALLENGES ARRAY ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_001_pol',
    nodeId: NODE_C12_POL_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A military regime in Latin America bans opposition parties and gags the press, but allows private Catholic schools, independent businesses, and traditional families to operate unhindered. How is this state classified?',
    options: [
      'Totalitarian State',
      'Authoritarian State with limited pluralism',
      'Direct Democracy',
      'Constitutional Monarchy',
    ],
    correctIndex: 1,
    explanation: 'Authoritarian states monopolise political power while tolerating limited pluralism in religious, economic, and private life. Totalitarian states eliminate all independent spheres.',
    hints: [
      'Look at whether the regime attempts to control every aspect of private life or only political power.',
      'Private schools and businesses still operate autonomously here.',
      'Tolerance of non-political associations is the defining marker of an authoritarian regime.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_002_pol',
    nodeId: NODE_C12_POL_001,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    question: 'Arrange these historical regimes along the spectrum of state intrusion into private life, from LEAST intrusion to GREATEST total intrusion.',
    sortItems: [
      'Liberal Democracy (India 2024)',
      'Authoritarian Rule (Zia-ul-Haq Pakistan 1977-1988)',
      'Totalitarian Third Reich (Nazi Germany 1933-1945)',
    ],
    correctOrder: [0, 1, 2],
    explanation: 'Liberal democracies protect private rights; Authoritarian states curb political opposition but tolerate private spheres; Totalitarian states invade education, youth, economy, and morality.',
    hints: [
      'Start with the system that constitutionally protects fundamental rights.',
      'Next is the system that demands political obedience but leaves private religion/business alone.',
      'The most intrusive system remoulds the entire society with youth leagues and terror.',
    ],
  },
  {
    id: 'ch_003_pol',
    nodeId: NODE_C12_POL_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which landmark Supreme Court judgment established that even an elected parliamentary majority cannot amend the Basic Structure of the Indian Constitution?',
    options: [
      'Maneka Gandhi v. Union of India (1978)',
      'Kesavananda Bharati v. State of Kerala (1973)',
      'ADM Jabalpur v. Shiv Kant Shukla (1976)',
      'Shreya Singhal v. Union of India (2015)',
    ],
    correctIndex: 1,
    explanation: 'In Kesavananda Bharati (1973), a 13-judge bench held that Article 368 does not grant power to alter the core identity or basic structure of the Constitution.',
    hints: [
      'This 1973 case is known as the fundamental rights and basic structure watershed.',
      'The majority verdict was 7 to 6.',
      'The petitioner was a religious seer challenging land reform laws in Kerala.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_004_pol',
    nodeId: NODE_C12_POL_002,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: "Drag the constitutional pillars to their respective roles in India's Liberal Democratic framework.",
    dragItems: [
      { label: 'Supreme Court (Art 32/136)', targetId: 'target_guardian' },
      { label: 'Parliament (Art 79)', targetId: 'target_legislature' },
      { label: 'Council of Ministers (Art 75)', targetId: 'target_executive' },
      { label: 'Election Commission (Art 324)', targetId: 'target_electoral' },
    ],
    correctMapping: {
      target_guardian: 'Supreme Court (Art 32/136)',
      target_legislature: 'Parliament (Art 79)',
      target_executive: 'Council of Ministers (Art 75)',
      target_electoral: 'Election Commission (Art 324)',
    },
    explanation: 'Power is deliberately dispersed across independent institutions to prevent the concentration of arbitrary authority.',
    hints: [
      'The body that adjudicates fundamental rights and reviews laws is the judicial guardian.',
      'Article 79 defines the President, Lok Sabha, and Rajya Sabha as the law-making body.',
      'Article 324 vests superintendence of elections in an independent commission.',
    ],
  },
  {
    id: 'ch_005_pol',
    nodeId: NODE_C12_POL_003,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is the United Kingdom classified as a Unitary State even though it has a Scottish Parliament and Welsh Senedd?',
    options: [
      'Because all citizens belong to a single royal church.',
      'Because the regional bodies derive their delegated authority from Westminster, which can legally modify or abolish them by ordinary statute.',
      'Because Scotland and Wales do not hold democratic elections.',
      'Because the British monarch directly governs Edinburgh and Cardiff.',
    ],
    correctIndex: 1,
    explanation: 'In a unitary state, all sovereign authority rests with the central government. Devolution in the UK exists by acts of Westminster (e.g. Scotland Act 1998), not sovereign state constitutions.',
    hints: [
      'Consider where sovereignty legally originates in the British system.',
      'Devolution is delegation of power, not divided constitutional sovereignty.',
      'Westminster remains omnipotent in constitutional theory under A.V. Dicey.',
    ],
  },
  {
    id: 'ch_006_pol',
    nodeId: NODE_C12_POL_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A newly independent country has 14 regional languages, vast geographical disparities, and strong local cultures. What state structure would best preserve both unity and regional diversity?',
    options: [
      'A highly centralised Unitary state with direct rule from the capital',
      'A Federal or Quasi-Federal state with a division of powers (Union, State, Concurrent lists)',
      'A single-party Totalitarian state with forced linguistic assimilation',
      'A pure unwritten constitutional monarchy',
    ],
    correctIndex: 1,
    explanation: 'Federal structures with constitutionally protected distribution of legislative subjects accommodate plural identities while maintaining a unified national defence and economy.',
    hints: [
      'Think of how India handled linguistic diversity in 1950.',
      'A division of powers ensures regions control local affairs like culture and public health.',
      'Centralised unitary states often provoke regional unrest in diverse societies.',
    ],
  },
  {
    id: 'ch_007_pol',
    nodeId: NODE_C12_POL_004,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did Dr. B.R. Ambedkar and the Constituent Assembly prefer the Parliamentary system over the Presidential system for India?',
    options: [
      'Because a Presidential system does not allow armed forces to exist.',
      'Because the Parliamentary system offers continuous "daily and periodic assessment" of executive accountability through questions, debates, and no-confidence motions.',
      'Because India already had a hereditary monarch in 1950.',
      'Because Presidential executives are constitutionally prohibited in Asia.',
    ],
    correctIndex: 1,
    explanation: 'Ambedkar argued that while the Presidential system offers stability of tenure, the Parliamentary executive provides daily scrutiny and accountability to the people\'s elected representatives.',
    hints: [
      'Focus on the trade-off between executive stability and day-to-day legislative accountability.',
      'In a Parliamentary model, MPs can question ministers every single day in Question Hour.',
      'No-confidence motions allow the Lok Sabha to remove a government immediately.',
    ],
  },
  {
    id: 'ch_008_pol',
    nodeId: NODE_C12_POL_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In the Indian Parliamentary system, what is the exact constitutional relationship between the President and the Council of Ministers under Article 74?',
    options: [
      'The President exercises absolute veto power and can dismiss the Prime Minister at will.',
      'The President is the titular head of state who must act on the aid and advice of the Council of Ministers headed by the Prime Minister.',
      'The Council of Ministers is appointed by the Chief Justice of India.',
      'The President leads the opposition in the Lok Sabha.',
    ],
    correctIndex: 1,
    explanation: 'Under Article 74 (as clarified by the 42nd/44th Amendments and Samsher Singh case), the President acts on ministerial advice, embodying the titular vs real executive split.',
    hints: [
      'Distinguish between the "dignified" titular head and the "efficient" real head of government.',
      'The Prime Minister is the real executive linchpin.',
      'Executive actions are taken in the President\'s name, but on the Cabinet\'s advice.',
    ],
  },
  {
    id: 'ch_009_pol',
    nodeId: NODE_C12_POL_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is true regarding the British Unwritten Constitution?',
    options: [
      'It contains zero written documents or laws.',
      'It is not codified in a single supreme text; its rules are found in scattered statutes, judicial precedents, customs, and conventions.',
      'It was drafted by a Constituent Assembly in 1947.',
      'It cannot be changed by any means whatsoever.',
    ],
    correctIndex: 1,
    explanation: 'An "unwritten" constitution is not literally unwritten; it includes written statutes (Magna Carta 1215, Bill of Rights 1689, Parliament Acts) alongside unwritten conventions.',
    hints: [
      'Remember that "unwritten" refers to the absence of a single codified document.',
      'Acts like Magna Carta and Habeas Corpus are written statutes.',
      'It evolves organically over centuries.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_010_pol',
    nodeId: NODE_C12_POL_005,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Evaluate why a written constitution is indispensable for a Federal polity like India or the USA.',
    options: [
      'Because written constitutions prevent judges from ever delivering verdicts.',
      'Because a federation requires a clearly codified, supreme division of powers between the centre and states that neither tier can alter unilaterally.',
      'Because federal countries cannot have political parties without a single book.',
      'Because written constitutions make all amendments illegal.',
    ],
    correctIndex: 1,
    explanation: 'Without a supreme written text establishing legislative lists (Union, State, Concurrent), jurisdictional disputes between national and provincial governments cannot be authoritatively resolved.',
    hints: [
      'Think about the Seventh Schedule in India.',
      'What prevents the Union from usurping the State police powers without a written charter?',
      'An impartial constitutional umpire needs a definitive text to interpret.',
    ],
  },
  {
    id: 'ch_011_pol',
    nodeId: NODE_C12_POL_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How did Dr. B.R. Ambedkar characterise the Indian Constitution regarding rigidity and flexibility on 4 November 1948?',
    options: [
      'Wholly rigid — requiring state conventions for every single comma.',
      'Wholly flexible — identical to ordinary British statutes.',
      'Rigid for some purposes and flexible for others — a graduated three-tier amending design.',
      'Unamendable for 100 years.',
    ],
    correctIndex: 2,
    explanation: 'Ambedkar designed a hybrid: simple majority for minor administrative matters (Art 3), special majority for core provisions, and special majority + state ratification for federal provisions.',
    hints: [
      'Does India allow simple majorities for some changes while requiring state ratification for others?',
      'It balances stability with adaptability.',
      'It avoids both American super-rigidity and British unchecked flexibility.',
    ],
  },
  {
    id: 'ch_012_pol',
    nodeId: NODE_C12_POL_007,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the constitutional path required to amend the election of the President of India (Article 54) under Article 368.',
    availableParts: [
      'Bill introduced in either House of Parliament',
      'Special Majority in Lok Sabha (total membership + 2/3 present & voting)',
      'Special Majority in Rajya Sabha',
      'Ratification by at least 1/2 of State Legislative Assemblies',
      'Assent by the President of India',
      'National Referendum of all citizens',
    ],
    targetState: 'Bill introduced in either House of Parliament Special Majority in Lok Sabha (total membership + 2/3 present & voting) Special Majority in Rajya Sabha Ratification by at least 1/2 of State Legislative Assemblies Assent by the President of India',
    validationHint: 'Select all 5 constitutional stages in order (no referendum is required under the Indian Constitution).',
    explanation: 'Article 368(2) proviso mandates that amendments affecting the federal structure (like Presidential election under Art 54/55) require special majorities in both Houses plus ratification by at least 50% of state legislatures.',
    hints: [
      'Start with introducing the bill in Parliament.',
      'Both Houses must pass it by special majority.',
      'Since it affects state representation, at least half the states must ratify before Presidential assent.',
    ],
  },
  {
    id: 'ch_013_pol',
    nodeId: NODE_C12_POL_007,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'In the United States, an amendment proposed by 2/3 of Congress must be ratified by what fraction of the 50 state legislatures under Article V?',
    correctAnswer: 75,
    tolerance: 1,
    unit: 'percent (3/4 of states)',
    explanation: 'Article V of the US Constitution requires ratification by three-fourths (38 of 50 states, or 75%), making it one of the most rigid constitutions in the world.',
    hints: [
      'The US requires three-fourths of all states.',
      '38 out of 50 states is exactly 76%, or 3/4.',
      'Enter 75 for 3/4 percentage equivalent.',
    ],
  },
  {
    id: 'ch_014_pol',
    nodeId: NODE_C12_POL_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which Constitutional Amendment in India lowered the minimum voting age for Universal Adult Franchise from 21 years to 18 years?',
    options: [
      '42nd Amendment Act, 1976',
      '44th Amendment Act, 1978',
      '61st Amendment Act, 1988',
      '73rd Amendment Act, 1992',
    ],
    correctIndex: 2,
    explanation: 'The 61st Amendment Act 1988 (operationalized in the 1989 general election) amended Article 326 to expand the franchise to youth aged 18 and above.',
    hints: [
      'This landmark amendment was enacted under Rajiv Gandhi\'s premiership in 1988.',
      'It modified Article 326.',
      'The number is between 60 and 65.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_015_pol',
    nodeId: NODE_C12_POL_008,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why was India\'s immediate adoption of Universal Adult Franchise in 1950 considered a revolutionary act of democratic courage compared to Western democracies?',
    options: [
      'Because Western democracies had completely banned voting in 1950.',
      'Because India granted equal voting rights to all adults regardless of sex, literacy, or wealth in one stroke, whereas countries like the USA and UK took centuries of exclusion and suffragette struggle.',
      'Because voting was made mandatory with criminal penalties.',
      'Because only illiterate citizens were permitted to vote.',
    ],
    correctIndex: 1,
    explanation: 'Western democracies had long property, racial, and gender qualifications before granting universal franchise. India instituted universal suffrage immediately upon becoming a Republic in Article 326.',
    hints: [
      'Think about when women and African Americans gained full voting rights in the West.',
      'India trusted its poor and illiterate citizens with the vote on Day One.',
      'Dr. Ambedkar argued that political equality must not wait for educational equality.',
    ],
  },
  {
    id: 'ch_016_pol',
    nodeId: NODE_C12_POL_009,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a Lok Sabha constituency with 2,00,000 valid votes: Candidate A gets 72,000, Candidate B gets 68,000, Candidate C gets 40,000, and Candidate D gets 20,000. Under First Past the Post (FPTP), what percentage of the vote did the winning candidate need to take 100% of the seat representation?',
    correctAnswer: 36,
    tolerance: 0.5,
    unit: 'percent',
    explanation: 'Candidate A wins with 72,000 / 2,00,000 = 36% of the votes. Under FPTP, a plurality (highest single tally) wins the seat even if 64% voted for opponents.',
    hints: [
      'Calculate (72,000 / 2,00,000) * 100.',
      'FPTP only requires the highest vote count, not an absolute majority (>50%).',
      'The answer is 36 percent.',
    ],
  },
  {
    id: 'ch_017_pol',
    nodeId: NODE_C12_POL_009,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Where does the Indian Constitution specifically mandate Proportional Representation by Single Transferable Vote (STV) rather than FPTP?',
    options: [
      'Elections to the Lok Sabha and State Legislative Assemblies',
      'Elections to Municipalities and Gram Panchayats',
      'Indirect elections for the President (Art 55), Vice-President (Art 66), and Rajya Sabha',
      'All general elections nationwide',
    ],
    correctIndex: 2,
    explanation: 'FPTP is used for direct mass elections (Lok Sabha/Assemblies) for simplicity, while PR-STV is reserved for indirect elections where a small, politically trained electoral college votes.',
    hints: [
      'Where do voters rank preferences 1, 2, 3 instead of pressing a single button on an EVM?',
      'Articles 55 and 66 specify this method.',
      'Rajya Sabha MPs are elected by MLAs using PR-STV.',
    ],
  },
  {
    id: 'ch_018_pol',
    nodeId: NODE_C12_POL_010,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the crucial difference between a Political Party and a Pressure Group (Interest Group)?',
    options: [
      'Political parties have no leaders, whereas pressure groups have prime ministers.',
      'A political party seeks to capture and exercise governmental power by contesting elections, while a pressure group seeks only to influence government policy from the outside.',
      'Pressure groups are legally forbidden in democracies.',
      'Political parties do not care about policies or laws.',
    ],
    correctIndex: 1,
    explanation: 'Political parties contest elections to form government (registered under Section 29A of RPA 1951). Pressure groups (like trade unions or farmer bodies) influence decisions without seeking office.',
    hints: [
      'Look at the primary objective regarding government power.',
      'Does a trade union nominate a cabinet to run the country?',
      'Parties aim for state power; pressure groups lobby state power.',
    ],
  },
  {
    id: 'ch_019_pol',
    nodeId: NODE_C12_POL_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In the 2024 Lok Sabha election, the BJP won 240 seats (below the 272 majority) and formed the Union Government with coalition partners TDP (16) and JDU (12). Which party system does India demonstrate?',
    options: [
      'Single-Party Dominant System like China',
      'Bi-Party System like the United Kingdom',
      'Multi-Party Coalition System reflecting regional and federal pluralism',
      'Non-party direct democracy',
    ],
    correctIndex: 2,
    explanation: 'India has a vibrant multi-party system with 6 national and 60+ state recognised parties. Regional parties act as kingmakers, reflecting India\'s linguistic and federal diversity.',
    hints: [
      'Notice that regional parties from Andhra Pradesh and Bihar formed the crucial governing alliance.',
      'Multiple parties regularly hold significant seat shares in Parliament.',
      'Coalition governance has been a recurring feature of Indian politics since 1989.',
    ],
  },
  {
    id: 'ch_020_pol',
    nodeId: NODE_C12_POL_001,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble a 4-pillar "Constitutional Anti-Authoritarian Shield" using the Indian Constitution\'s strongest defensive provisions.',
    availableParts: [
      'Article 19(1)(a) Free Speech & Press',
      'Article 21 Non-derogable Personal Liberty (44th Amendment)',
      'Article 32 Direct Right to Supreme Court Remedies',
      'Article 324 Independent Election Commission',
      'Article 356 Unchecked Central Dismissal of States',
      'Compulsory State Youth League',
    ],
    targetState: 'Article 19(1)(a) Free Speech & Press Article 21 Non-derogable Personal Liberty (44th Amendment) Article 32 Direct Right to Supreme Court Remedies Article 324 Independent Election Commission',
    validationHint: 'Select the 4 authentic fundamental rights and institutional check provisions (omit repressive instruments).',
    explanation: 'Articles 19, 21 (protected by the 44th Amendment), 32 (called the soul of the Constitution by Ambedkar), and 324 form the institutional matrix that prevents authoritarian regression.',
    hints: [
      'Include free speech and personal liberty guarantees.',
      'Include judicial enforcement under Article 32.',
      'Include the independent constitutional body that conducts free elections.',
    ],
  },
  {
    id: 'ch_021_pol',
    nodeId: NODE_C12_POL_007,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Rank the amendment procedures of these constitutions from MOST FLEXIBLE (easiest to alter) to MOST RIGID (hardest to alter).',
    sortItems: [
      'United Kingdom (Simple majority of Parliament by ordinary Act)',
      'India (Graduated: Simple, Special 2/3 majority, and State Ratification for federal features)',
      'United States of America (Double Super-Majority: 2/3 Congress + 3/4 State Legislatures)',
    ],
    correctOrder: [0, 1, 2],
    explanation: 'The UK is completely flexible with ordinary lawmaking; India balances flexibility and rigidity with a 3-tier procedure; the USA is super-rigid under Article V.',
    hints: [
      'The unwritten constitution with parliamentary sovereignty is the most flexible.',
      'The Indian Constitution stands as a hybrid middle-ground.',
      'The US Constitution has been amended only 27 times in 235 years due to its extreme threshold.',
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_POL_001,
  title: 'Forms of State & Constitutional Architecture',
  definition: 'Constitutional political science analyzes how states organize power: comparing totalitarian, authoritarian, and liberal democratic systems; unitary vs federal distributions; parliamentary vs presidential executives; and amending rules.',
  eli5: 'Think of a country like a game. The constitution is the official rulebook. It decides who gets to make decisions, how leaders are chosen, whether players have protected rights, and how hard it is to change the rules.',
  misconceptions: [
    {
      misconception: 'Authoritarian and Totalitarian regimes are identical concepts.',
      correction: 'Authoritarian regimes demand political monopoly but tolerate limited pluralism in private life and religion. Totalitarian regimes seek total penetration of all private, cultural, youth, and economic spheres guided by an official ideology.',
    },
    {
      misconception: 'A Liberal Democratic state is defined solely by holding elections.',
      correction: 'Elections are necessary but not sufficient. Liberal democracy requires rule of law, separation of powers, independent judiciary, protection of minority rights, and fundamental constitutional liberties.',
    },
    {
      misconception: 'An unwritten constitution means there are no written laws in that country.',
      correction: 'An unwritten constitution is not compiled into a single supreme codified book, but consists of written statutes (e.g., Magna Carta, Bill of Rights), court judgments, and unwritten conventions.',
    },
    {
      misconception: 'Universal Adult Franchise is a Fundamental Right in Part III of the Indian Constitution.',
      correction: 'Universal Adult Franchise is a constitutional right granted under Article 326 (with age 18 fixed by the 61st Amendment), not a Part III Fundamental Right.',
    },
    {
      misconception: 'Under First Past the Post (FPTP), the winner must secure at least 50% of the total votes cast.',
      correction: 'FPTP requires only a plurality (the highest single tally of votes in a single-member constituency), meaning a candidate can win with 30-40% of the vote if opponents divide the remainder.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which regime attempts total control over education, culture, and private beliefs?', options: ['Liberal Democracy', 'Authoritarian State', 'Totalitarian State', 'Unitary Democracy'], correctIndex: 2 },
    { question: 'What principle limits the power of the majority in a liberal democratic state?', options: ['Absolute parliamentary sovereignty', 'Entrenched Fundamental Rights and Judicial Review', 'Single party monopoly', 'Military oversight'], correctIndex: 1 },
    { question: 'Which feature makes India "quasi-federal" rather than a pure federation?', options: ['Residuary powers with the Union under Art 248 and single citizenship', 'Having State Legislative Assemblies', 'Having an independent Supreme Court', 'Bicameral Parliament'], correctIndex: 0 },
    { question: 'Who is the real executive head in the Indian Parliamentary system?', options: ['The President', 'The Chief Justice', 'The Prime Minister heading the Council of Ministers', 'The Speaker of Lok Sabha'], correctIndex: 2 },
    { question: 'Which country has a classic unwritten, flexible constitution?', options: ['United States of America', 'India', 'United Kingdom', 'France'], correctIndex: 2 },
    { question: 'What majority is required in India for Article 368 federal amendments?', options: ['Simple majority of Parliament only', 'Special majority of Parliament + Ratification by at least 1/2 of State Legislatures', 'Unanimous vote of all MPs', 'National public referendum'], correctIndex: 1 },
    { question: 'Under Article 326 and the 61st Amendment, what is the voting age in India?', options: ['21 years', '25 years', '18 years', '16 years'], correctIndex: 2 },
    { question: 'What electoral method is used for electing the President of India under Article 55?', options: ['First Past the Post', 'Proportional Representation by Single Transferable Vote', 'Open ballot show of hands', 'Direct popular vote'], correctIndex: 1 },
  ],
  masteryCriteria: 'Master the 10 core concepts of Section A: comparative state structures, separation of powers, constitutional kinds, amendment mechanics, franchise, and representation methods.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Totalitarian vs Authoritarian Penetration',
    instruction: 'Drag the state penetration slider from 0% to 100% to see how state control invades political, economic, educational, and family life.',
    interactionType: 'slider-penetration',
    nodeId: NODE_C12_POL_001,
  },
  {
    title: 'Separation of Powers & Constitutional Checks',
    instruction: 'Click on the organs of government (Legislature, Executive, Judiciary) to activate constitutional checks and balances.',
    interactionType: 'click-organs',
    nodeId: NODE_C12_POL_002,
  },
  {
    title: 'Unitary vs Federal Power Distribution',
    instruction: 'Toggle the centralization balance to see how legislative subjects shift between National Union and Provincial States.',
    interactionType: 'slider-federal',
    nodeId: NODE_C12_POL_003,
  },
  {
    title: 'Constitutional Amendment Thresholds',
    instruction: 'Compare the amendment barriers of the UK, India, and USA by testing how much consensus is required to pass a constitutional change.',
    interactionType: 'amendment-simulator',
    nodeId: NODE_C12_POL_007,
  },
  {
    title: 'FPTP vs Proportional Representation Simulator',
    instruction: 'Manipulate vote shares among 4 parties and observe the massive distortion between Popular Vote Share and Seats Won under FPTP.',
    interactionType: 'fptp-simulator',
    nodeId: NODE_C12_POL_009,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Party A wins 38% of the popular vote in an FPTP system with 4 competing parties, what could happen to its seat share in Parliament?',
    options: [
      'It must strictly get exactly 38% of the seats.',
      'It can win a sweeping absolute majority of seats (e.g. 55-60%) due to opposition vote splitting.',
      'It will get zero seats because it did not cross 50%.',
      'The election is declared void.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now move the vote sliders in the FPTP simulation below to test how a 38% plurality converts into a disproportionate majority of seats!',
    nodeId: NODE_C12_POL_009,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the Authoritarian zone on the State Penetration gauge?',
    observableOptions: [
      'The state controls religion, art, and family while allowing free elections.',
      'The state locks down political competition completely, but leaves private social/economic spheres relatively untargeted.',
      'Every single citizen is enrolled in compulsory party youth brigades.',
      'No government or police exists.',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_POL_001,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Constitutional Auditor for a Developing Republic',
  description: 'Analyze a newly drafted constitutional charter for a fictional country, diagnosing vulnerabilities to authoritarian drift and proposing institutional remedies using Articles 19, 21, 32, and 324.',
  steps: [
    'Audit executive power: Ensure the Council of Ministers is collectively responsible to the elected lower house (Art 75).',
    'Safeguard judicial independence: Protect judicial review and non-derogable personal liberty (Art 21 & Kesavananda doctrine).',
    'Verify federal balance: Guarantee legislative lists and state ratification for constitutional amendments (Art 368).',
    'Empower the electorate: Establish universal adult franchise at age 18 overseen by an autonomous election commission (Art 324 & 326).',
  ],
};

// ─── MAIN COMPONENT ───
function C12_PoliticalScienceTotalitarianAuthoritarianStatesSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // ─── STATE HOOKS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [selectedDiscoveryIndex, setSelectedDiscoveryIndex] = useState(-1);

  // Prediction & Observation State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Hints & Explanations
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Visual & Feedback State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Drag & Drop / Interactive Challenges State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Simulation Variables
  const [penetrationLevel, setPenetrationLevel] = useState(35);
  const [selectedOrgan, setSelectedOrgan] = useState<'legislature' | 'executive' | 'judiciary' | null>(null);
  const [federalCentralization, setFederalCentralization] = useState(60);
  const [testedConsensus, setTestedConsensus] = useState(55);
  const [fptpVoteA, setFptpVoteA] = useState(38);
  const [fptpVoteB, setFptpVoteB] = useState(32);
  const [fptpVoteC, setFptpVoteC] = useState(18);
  const [fptpVoteD, setFptpVoteD] = useState(12);

  // Searchable Constitution Explorer State
  const [searchArticleQuery, setSearchArticleQuery] = useState('');
  const [sandboxMode, setSandboxMode] = useState<'regimes' | 'elections' | 'amendments'>('regimes');

  // Multi-Representation View Mode
  const [repMode, setRepMode] = useState<'spectrum' | 'matrix' | 'venn'>('spectrum');

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  const subjectConfig = SUBJECT_CONFIG['political_science'] || { name: 'Political Science', emoji: '⚖️', color: 'indigo' };

  // ─── CONSTITUTIONAL ARTICLES DATA ───
  const CONSTITUTION_ARTICLES = useMemo(() => [
    { num: 'Article 1', title: 'Union of States', desc: 'India, that is Bharat, shall be a Union of States (Indestructible Union of destructible units).' },
    { num: 'Article 14', title: 'Equality Before Law', desc: 'Guarantees Rule of Law and equal protection of laws to all persons.' },
    { num: 'Article 19(1)(a)', title: 'Freedom of Speech', desc: 'Protects freedom of speech, expression, and press against state monopoly.' },
    { num: 'Article 21', title: 'Right to Life & Liberty', desc: 'Non-derogable personal liberty and due process of law (44th Amendment safeguard).' },
    { num: 'Article 32', title: 'Constitutional Remedies', desc: 'Dr. Ambedkar\'s "Heart and Soul" of the Constitution — direct recourse to Supreme Court.' },
    { num: 'Article 53 & 74', title: 'Union Executive', desc: 'President acts on aid and advice of the Council of Ministers headed by the Prime Minister.' },
    { num: 'Article 55 & 66', title: 'Proportional Representation', desc: 'Prescribes PR by Single Transferable Vote for President and Vice-President.' },
    { num: 'Article 81 & 170', title: 'Composition of Lok Sabha & Assemblies', desc: 'Prescribes First Past the Post (FPTP) system for popular legislative chambers.' },
    { num: 'Article 248 & 7th Sched', title: 'Distribution of Legislative Powers', desc: 'Union, State, and Concurrent Lists. Residuary powers vested in the Union.' },
    { num: 'Article 324', title: 'Election Commission of India', desc: 'Autonomous body for superintendence, direction, and conduct of elections.' },
    { num: 'Article 326', title: 'Universal Adult Franchise', desc: 'Suffrage for all citizens aged 18+ (lowered from 21 by 61st Amendment Act 1988).' },
    { num: 'Article 368', title: 'Amending Power of Parliament', desc: 'Graduated three-tier amending procedure with Basic Structure limit (Kesavananda Bharati).' },
  ], []);

  // Filtered Articles based on search
  const filteredArticles = useMemo(() => {
    if (!searchArticleQuery.trim()) return CONSTITUTION_ARTICLES;
    return CONSTITUTION_ARTICLES.filter(a =>
      a.num.toLowerCase().includes(searchArticleQuery.toLowerCase()) ||
      a.title.toLowerCase().includes(searchArticleQuery.toLowerCase()) ||
      a.desc.toLowerCase().includes(searchArticleQuery.toLowerCase())
    );
  }, [CONSTITUTION_ARTICLES, searchArticleQuery]);

  // ─── FILTERED CHALLENGES ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') {
      return CHALLENGES.filter(c => c.difficulty === 'foundation');
    }
    if (difficulty === 'standard') {
      return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    }
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

  // ─── BKT MASTERY ADAPTATION ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner'
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

  // ─── CANVAS ELECTION VISUALIZER ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const totalVotes = fptpVoteA + fptpVoteB + fptpVoteC + fptpVoteD;
      const pctA = (fptpVoteA / totalVotes);
      const pctB = (fptpVoteB / totalVotes);
      const pctC = (fptpVoteC / totalVotes);
      const pctD = (fptpVoteD / totalVotes);

      const barHeight = 22;
      const startY = 30;
      const width = canvas.width - 40;

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText('Popular Vote Share (%)', 20, startY - 8);

      let currentX = 20;
      const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981'];
      const pcts = [pctA, pctB, pctC, pctD];

      pcts.forEach((p, i) => {
        const segW = p * width;
        ctx.fillStyle = colors[i];
        ctx.fillRect(currentX, startY, segW, barHeight);
        if (segW > 35) {
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 10px sans-serif';
          ctx.fillText(`${Math.round(p * 100)}%`, currentX + 6, startY + 15);
        }
        currentX += segW;
      });

      const seatY = startY + 50;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText('Simulated FPTP Seat Share (%) — Plurality Bonus Amplification', 20, seatY - 8);

      const maxVotes = Math.max(pctA, pctB, pctC, pctD);
      let seatsA = 0, seatsB = 0, seatsC = 0, seatsD = 0;
      if (maxVotes === pctA) {
        seatsA = Math.min(100, Math.round(pctA * 1.6 * 100));
        seatsB = Math.round((100 - seatsA) * (pctB / (pctB + pctC + pctD)));
        seatsC = Math.round((100 - seatsA - seatsB) * (pctC / (pctC + pctD)));
        seatsD = Math.max(0, 100 - seatsA - seatsB - seatsC);
      } else {
        seatsB = Math.min(100, Math.round(pctB * 1.6 * 100));
        seatsA = Math.round((100 - seatsB) * (pctA / (pctA + pctC + pctD)));
        seatsC = Math.round((100 - seatsB - seatsA) * (pctC / (pctC + pctD)));
        seatsD = Math.max(0, 100 - seatsB - seatsA - seatsC);
      }

      const seatPcts = [seatsA / 100, seatsB / 100, seatsC / 100, seatsD / 100];
      let currentSeatX = 20;

      seatPcts.forEach((p, i) => {
        const segW = p * width;
        ctx.fillStyle = colors[i];
        ctx.fillRect(currentSeatX, seatY, segW, barHeight);
        if (segW > 25) {
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 10px sans-serif';
          ctx.fillText(`${Math.round(p * 100)}%`, currentSeatX + 4, seatY + 15);
        }
        currentSeatX += segW;
      });

      const majX = 20 + width * 0.5;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(majX, startY - 5);
      ctx.lineTo(majX, seatY + barHeight + 5);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#ef4444';
      ctx.font = '10px sans-serif';
      ctx.fillText('50% Majority Line', majX - 35, seatY + barHeight + 16);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [fptpVoteA, fptpVoteB, fptpVoteC, fptpVoteD]);

  // ─��─ CLEANUP TIMERS ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── USECALLBACK HANDLERS ───
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
      speechManager.speak('Let us study the complete constitutional explanation together.');
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    setSelectedDiscoveryIndex(idx);
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Excellent analysis! The Emergency showed authoritarian concentration, but was not totalitarian.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive constitutional discovery lab. Manipulate the simulations.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Test constitutional powers and representation systems with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode initiated. Solve the CISCE board questions.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive simulator below to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation!' : 'Check the simulation controls again.');
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
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
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

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Simulation complete! You have demonstrated constitutional mastery.');
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
    setSelectedOption(null);

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
      setSelectedOption(answer as number);
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      const arr = (answer as number[]).length > 0 ? (answer as number[]) : (challenge.sortItems?.map((_, i) => i) || []);
      isCorrect = JSON.stringify(arr) === JSON.stringify(challenge.correctOrder);
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
      speechManager.speak('Correct! Outstanding analysis.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify({ bestScore: 100, timestamp: Date.now() }));
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
        speechManager.speak('Review the constitutional principle below.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // ─── DERIVED REGIME ATTRIBUTES ───
  const regimeDescription = useMemo(() => {
    if (penetrationLevel < 30) {
      return {
        type: 'Liberal Democratic State',
        color: '#10b981',
        desc: 'Constitutional limits, entrenched fundamental rights, independent judiciary, vibrant multi-party competition, free press.',
        examples: 'India (1950–Present), United Kingdom, United States of America',
        traits: ['Rule of Law (Art 14)', 'Free Speech (Art 19)', 'Periodic Elections (Art 324)', 'Judicial Review (Art 32)'],
      };
    } else if (penetrationLevel <= 70) {
      return {
        type: 'Authoritarian State',
        color: '#f59e0b',
        desc: 'Monopolises political power; suppresses political opposition. Crucially permits limited pluralism in religion, family, private business.',
        examples: 'Zia-ul-Haq\'s Pakistan (1977-88), Pinochet\'s Chile (1973-90), Franco\'s Spain',
        traits: ['No political opposition', 'Press censorship', 'Autonomous religion tolerated', 'Private business allowed'],
      };
    } else {
      return {
        type: 'Totalitarian State',
        color: '#ef4444',
        desc: 'Total invasion of all spheres: single mass party, official ideology, secret police terror, state monopoly over youth and media.',
        examples: 'Nazi Germany under Hitler (1933-45), USSR under Stalin (1924-53)',
        traits: ['Single official ideology', 'Mass party youth leagues', 'Secret police terror (Gestapo/NKVD)', 'Centrally planned economy'],
      };
    }
  }, [penetrationLevel]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-indigo-900/60 border border-indigo-600 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">
                ISC Class 12 • Political Science
              </span>
              <span className="text-xs text-slate-400">Section A: Constitution & Government</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase / Difficulty Pill */}
        <div className="flex items-center gap-2">
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                  : difficulty === 'standard'
                  ? 'bg-indigo-950/60 text-indigo-400 border-indigo-700'
                  : 'bg-rose-950/60 text-rose-400 border-rose-700'
              }`}
            >
              TIER: {difficulty.toUpperCase()}
            </motion.span>
          )}
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            Phase: <strong className="text-indigo-400 capitalize">{phase}</strong>
          </span>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-6"
        >
          {/* Narrative Scenario Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-800/60 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>🏛️ Narrative Brief</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-xs mt-2 border-l-2 border-indigo-500 pl-3 italic">{SCENARIO.context}</p>
          </div>

          {/* SVG 1: Core Conceptual Diagram - State Penetration Spectrum */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-col items-center">
            <span className="text-xs font-bold text-indigo-400 mb-2 uppercase tracking-wider">
              SVG Model 1: Spectrum of State Control vs Citizen Liberty
            </span>
            <svg viewBox="0 0 700 130" className="w-full max-w-2xl h-auto">
              <defs>
                <linearGradient id="spectrumGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
              <rect x="20" y="30" width="660" height="24" rx="12" fill="url(#spectrumGrad)" opacity="0.8" />
              {/* Markers */}
              <circle cx="120" cy="42" r="14" fill="#10b981" stroke="#0f172a" strokeWidth="3" />
              <text x="120" y="46" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">LD</text>
              <text x="120" y="80" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Liberal Democracy</text>
              <text x="120" y="96" fill="#94a3b8" fontSize="9" textAnchor="middle">Full Pluralism & Rights</text>

              <circle cx="350" cy="42" r="14" fill="#f59e0b" stroke="#0f172a" strokeWidth="3" />
              <text x="350" y="46" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">AUT</text>
              <text x="350" y="80" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">Authoritarian</text>
              <text x="350" y="96" fill="#94a3b8" fontSize="9" textAnchor="middle">Limited Pluralism / No Oppn</text>

              <circle cx="580" cy="42" r="14" fill="#ef4444" stroke="#0f172a" strokeWidth="3" />
              <text x="580" y="46" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">TOT</text>
              <text x="580" y="80" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">Totalitarian</text>
              <text x="580" y="96" fill="#94a3b8" fontSize="9" textAnchor="middle">Zero Pluralism / Ideology</text>
            </svg>
          </div>

          {/* Low Stakes Discovery Question */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
              🤔 Curiosity Hook (No Grading Penalty)
            </span>
            <h3 className="text-lg font-bold text-white mb-4 leading-snug">{DISCOVERY_QUESTION.question}</h3>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-sm font-medium ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-600 text-emerald-200'
                        : selectedDiscoveryIndex === i
                        ? 'bg-rose-950/70 border-rose-600 text-rose-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700/60 flex items-center justify-center text-xs text-slate-300 font-bold shrink-0 mt-0.5">
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
                className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! The Emergency was an authoritarian episode within a constitutional framework, not totalitarian.'
                    : `💡 Key Insight: ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  <span>Launch Interactive Exploration</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Step Selector Tabs */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  currentSlide === idx
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {idx + 1}. {step.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-5"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <h3 className="text-xl font-black text-indigo-300">
                  Step {currentSlide + 1}: {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-amber-400 font-semibold">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </span>
              </div>

              {/* ─── STEP 0: STATE PENETRATION LAB + MULTI-REPRESENTATION ─── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {/* Multi-Representation Switcher */}
                  <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-bold">Multi-Representation Mode:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setRepMode('spectrum')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${repMode === 'spectrum' ? 'bg-indigo-600 text-white' : 'bg-slate-850 text-slate-400'}`}
                      >
                        1. Interactive Sliders
                      </button>
                      <button
                        onClick={() => setRepMode('matrix')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${repMode === 'matrix' ? 'bg-indigo-600 text-white' : 'bg-slate-850 text-slate-400'}`}
                      >
                        2. Comparative Matrix
                      </button>
                      <button
                        onClick={() => setRepMode('venn')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${repMode === 'venn' ? 'bg-indigo-600 text-white' : 'bg-slate-850 text-slate-400'}`}
                      >
                        3. SVG Venn Pluralism Diagram
                      </button>
                    </div>
                  </div>

                  {repMode === 'spectrum' && (
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                          State Control Slider: {penetrationLevel}%
                        </span>
                        <span
                          className="text-xs font-black px-3 py-1 rounded-full uppercase"
                          style={{ backgroundColor: `${regimeDescription.color}25`, color: regimeDescription.color }}
                        >
                          {regimeDescription.type}
                        </span>
                      </div>

                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={penetrationLevel}
                        onChange={(e) => {
                          setPenetrationLevel(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="State penetration level"
                        className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                      />

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                        {[
                          { name: 'Political Sphere', icon: '🗳️', threshold: 25, role: 'Elections & Parties' },
                          { name: 'Press & Media', icon: '📰', threshold: 40, role: 'Censorship & Broadcasting' },
                          { name: 'Private Business', icon: '🏭', threshold: 75, role: 'Property & Enterprise' },
                          { name: 'Family & Religion', icon: '👨‍👩‍👧', threshold: 85, role: 'Youth & Private Beliefs' },
                        ].map((sphere, i) => {
                          const isCaptured = penetrationLevel >= sphere.threshold;
                          return (
                            <motion.div
                              key={i}
                              animate={{ scale: isCaptured ? 1.02 : 1 }}
                              className={`p-3.5 rounded-xl border transition-all ${
                                isCaptured
                                  ? 'bg-rose-950/40 border-rose-600/80 text-rose-200'
                                  : 'bg-slate-900 border-slate-800 text-slate-400'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xl">{sphere.icon}</span>
                                <span
                                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                    isCaptured ? 'bg-rose-900 text-rose-300' : 'bg-slate-800 text-slate-400'
                                  }`}
                                >
                                  {isCaptured ? 'CAPTURED' : 'AUTONOMOUS'}
                                </span>
                              </div>
                              <h4 className="text-xs font-bold text-white">{sphere.name}</h4>
                              <p className="text-[11px] text-slate-400 mt-0.5">{sphere.role}</p>
                            </motion.div>
                          );
                        })}
                      </div>

                      <div
                        className="p-4 rounded-xl border text-xs space-y-2 transition-all"
                        style={{ borderColor: regimeDescription.color, backgroundColor: `${regimeDescription.color}10` }}
                      >
                        <h4 className="font-bold text-sm text-white flex items-center gap-2">
                          <span>Classification:</span>
                          <span style={{ color: regimeDescription.color }}>{regimeDescription.type}</span>
                        </h4>
                        <p className="text-slate-300">{regimeDescription.desc}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {regimeDescription.traits.map((trait, tIdx) => (
                            <span key={tIdx} className="px-2 py-0.5 bg-slate-900/90 rounded text-[11px] text-slate-300 border border-slate-700">
                              • {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {repMode === 'matrix' && (
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400">
                            <th className="p-2.5">Feature</th>
                            <th className="p-2.5 text-emerald-400">Liberal Democracy</th>
                            <th className="p-2.5 text-amber-400">Authoritarian State</th>
                            <th className="p-2.5 text-rose-400">Totalitarian State</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900 text-slate-300">
                          <tr>
                            <td className="p-2.5 font-bold text-white">Political Pluralism</td>
                            <td className="p-2.5">Unrestricted (Multi-party)</td>
                            <td className="p-2.5">Prohibited / Monopoly</td>
                            <td className="p-2.5">Eliminated (Single Mass Party)</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-bold text-white">Private Social Sphere</td>
                            <td className="p-2.5">Constitutionally Protected</td>
                            <td className="p-2.5">Tolerated (Religion, Business)</td>
                            <td className="p-2.5">Invaded (Youth, Art, Family)</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-bold text-white">Guiding Ideology</td>
                            <td className="p-2.5">Pluralist / Constitutional</td>
                            <td className="p-2.5">Pragmatic / Order / Military</td>
                            <td className="p-2.5">Total Official Ideology</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-bold text-white">Mass Mobilisation</td>
                            <td className="p-2.5">Voluntary civic action</td>
                            <td className="p-2.5">Passive depoliticisation</td>
                            <td className="p-2.5">Compulsory mass mobilization</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {repMode === 'venn' && (
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                      <span className="text-xs font-bold text-indigo-400 mb-2 uppercase">SVG Model 2: Plural Spheres vs State Penetration (Venn Diagram)</span>
                      <svg viewBox="0 0 500 240" className="w-full max-w-lg h-auto">
                        {/* Circle 1: Political Control */}
                        <circle cx="180" cy="120" r="90" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="2" />
                        {/* Circle 2: Private/Cultural Control */}
                        <circle cx="320" cy="120" r="90" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2" />
                        <text x="130" y="120" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">Authoritarian</text>
                        <text x="130" y="135" fill="#94a3b8" fontSize="9" textAnchor="middle">(Political Monopoly Only)</text>
                        <text x="370" y="120" fill="#f87171" fontSize="12" fontWeight="bold" textAnchor="middle">Private Sphere</text>
                        <text x="370" y="135" fill="#94a3b8" fontSize="9" textAnchor="middle">(Family, Church, Art)</text>
                        <text x="250" y="115" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">TOTALITARIAN</text>
                        <text x="250" y="130" fill="#ffedd5" fontSize="9" textAnchor="middle">Total Overlap & Terror</text>
                      </svg>
                    </div>
                  )}

                  {/* Observation Question */}
                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <h4 className="text-sm font-bold text-white mb-2">{OBSERVATION_QUESTIONS[0].question}</h4>
                      <div className="space-y-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, oIdx) => (
                          <motion.button
                            key={oIdx}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(oIdx)}
                            className={`w-full text-left p-3 rounded-lg text-xs border ${
                              observationAnswered && oIdx === OBSERVATION_QUESTIONS[0].correctIndex
                                ? 'bg-emerald-950 border-emerald-600 text-emerald-300'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                            }`}
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── STEP 1: SEPARATION OF POWERS & SVG TRIAD ─── */}
              {currentSlide === 1 && (
                <div className="space-y-5">
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                    <p className="text-xs text-slate-400 mb-3">Click an organ in the list or inspect the SVG checks-and-balances diagram below:</p>

                    {/* SVG 3: Separation of Powers Triad */}
                    <div className="flex justify-center p-2 mb-4 bg-slate-900 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 450 180" className="w-full max-w-md h-auto">
                        {/* Triangle vertices */}
                        <polygon points="225,25 65,150 385,150" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="4,4" />
                        {/* Judiciary Node */}
                        <circle cx="225" cy="30" r="24" fill="#6366f1" />
                        <text x="225" y="34" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">JUDICIARY</text>
                        {/* Legislature Node */}
                        <circle cx="70" cy="150" r="24" fill="#10b981" />
                        <text x="70" y="154" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">LEGISLATURE</text>
                        {/* Executive Node */}
                        <circle cx="380" cy="150" r="24" fill="#f59e0b" />
                        <text x="380" y="154" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">EXECUTIVE</text>
                        {/* Check arrows */}
                        <text x="125" y="80" fill="#818cf8" fontSize="8" fontWeight="bold" textAnchor="middle">Art 13 Review ➔</text>
                        <text x="325" y="80" fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="middle">➔ Basic Structure</text>
                        <text x="225" y="165" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">Art 75 No-Confidence ⟷</text>
                      </svg>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { id: 'legislature' as const, name: 'Parliament (Legislature)', art: 'Art 79', check: 'Controls Executive via No-Confidence motions (Rule 198) and questions; can impeach Judges.' },
                        { id: 'executive' as const, name: 'Council of Ministers (Executive)', art: 'Art 74 / 75', check: 'Pilots legislative bills, issues ordinances (Art 123), advises President on judicial appointments.' },
                        { id: 'judiciary' as const, name: 'Supreme Court (Judiciary)', art: 'Art 32 / 136', check: 'Judicial Review (Art 13), strikes down unconstitutional laws & executive actions (Basic Structure doctrine).' },
                      ].map((organ) => (
                        <motion.button
                          key={organ.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setSelectedOrgan(organ.id);
                            audioManager.play('tap');
                          }}
                          className={`p-4 rounded-xl text-left border transition-all ${
                            selectedOrgan === organ.id
                              ? 'bg-indigo-950 border-indigo-500 shadow-lg shadow-indigo-600/20'
                              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-xs text-indigo-400 font-mono font-bold block">{organ.art}</span>
                          <h4 className="font-bold text-white text-sm mt-1">{organ.name}</h4>
                          <p className="text-xs text-slate-400 mt-2">{organ.check}</p>
                        </motion.button>
                      ))}
                    </div>

                    {selectedOrgan && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-900 border border-indigo-900/60 text-xs text-slate-300">
                        <strong className="text-indigo-300 uppercase tracking-wider block mb-1">Liberal Democratic Check Active:</strong>
                        In India, separation of powers is functional rather than absolute: Ministers are drawn from Parliament (Art 75), and the Supreme Court acts as the final sentinel on the qui vive (Maneka Gandhi & Kesavananda Bharati).
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── STEP 2: UNITARY VS FEDERAL BALANCING ─── */}
              {currentSlide === 2 && (
                <div className="space-y-5">
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold">Centralization Level: {federalCentralization}%</span>
                      <span className="font-bold text-indigo-400">
                        {federalCentralization > 70 ? 'Unitary Tilt (UK / Emergency mode)' : federalCentralization < 35 ? 'Loose Federation' : 'Quasi-Federal Balance (India)'}
                      </span>
                    </div>

                    <input
                      type="range"
                      min={10}
                      max={90}
                      value={federalCentralization}
                      onChange={(e) => setFederalCentralization(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                        <h4 className="font-bold text-indigo-300 mb-1">Union List (100 items)</h4>
                        <p className="text-slate-400">Defence, Foreign Affairs, Atomic Energy, Currency, Railways.</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                        <h4 className="font-bold text-emerald-300 mb-1">State List (61 items)</h4>
                        <p className="text-slate-400">Police, Public Health, Sanitation, Agriculture, Prisons.</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                        <h4 className="font-bold text-amber-300 mb-1">Concurrent List (52 items)</h4>
                        <p className="text-slate-400">Education, Forests, Trade Unions, Civil Procedure.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STEP 3: AMENDMENT THRESHOLD SIMULATOR ─── */}
              {currentSlide === 3 && (
                <div className="space-y-5">
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold">Consensus in Parliament: {testedConsensus}%</span>
                      <span className="text-amber-400 font-mono">Test Country Barriers</span>
                    </div>

                    <input
                      type="range"
                      min={40}
                      max={90}
                      value={testedConsensus}
                      onChange={(e) => setTestedConsensus(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className={`p-3.5 rounded-xl border text-xs ${testedConsensus >= 50 ? 'bg-emerald-950/40 border-emerald-600 text-emerald-200' : 'bg-rose-950/40 border-rose-600 text-rose-300'}`}>
                        <h4 className="font-bold text-sm text-white">UK (Flexible)</h4>
                        <p className="mt-1">Threshold: 50% + 1 (Ordinary Law)</p>
                        <span className="font-bold mt-2 block">{testedConsensus >= 50 ? '✓ AMENDMENT PASSES' : '✗ FAILS'}</span>
                      </div>

                      <div className={`p-3.5 rounded-xl border text-xs ${testedConsensus >= 66 ? 'bg-emerald-950/40 border-emerald-600 text-emerald-200' : 'bg-rose-950/40 border-rose-600 text-rose-300'}`}>
                        <h4 className="font-bold text-sm text-white">India (Art 368)</h4>
                        <p className="mt-1">Threshold: 66.7% Special Maj (+ 50% States for Federal)</p>
                        <span className="font-bold mt-2 block">{testedConsensus >= 66.7 ? '✓ AMENDMENT PASSES' : '✗ FAILS SPECIAL MAJ'}</span>
                      </div>

                      <div className={`p-3.5 rounded-xl border text-xs ${testedConsensus >= 75 ? 'bg-emerald-950/40 border-emerald-600 text-emerald-200' : 'bg-rose-950/40 border-rose-600 text-rose-300'}`}>
                        <h4 className="font-bold text-sm text-white">USA (Article V Super-Rigid)</h4>
                        <p className="mt-1">Threshold: 66.7% Congress + 75% States</p>
                        <span className="font-bold mt-2 block">{testedConsensus >= 75 ? '✓ AMENDMENT PASSES' : '✗ FAILS 3/4 RATIFICATION'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STEP 4: FPTP SIMULATOR ─── */}
              {currentSlide === 4 && (
                <div className="space-y-5">
                  {!predictionMade && (
                    <div className="p-5 bg-indigo-950/60 rounded-2xl border border-indigo-700">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                        🎯 Predict-Then-Check Challenge
                      </span>
                      <h4 className="text-sm font-bold text-white mb-3">{PREDICTION_QUESTIONS[0].question}</h4>
                      <div className="space-y-2">
                        {PREDICTION_QUESTIONS[0].options.map((pOpt, pIdx) => (
                          <motion.button
                            key={pIdx}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(pIdx)}
                            className="w-full text-left p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 font-medium"
                          >
                            {pOpt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <div className="space-y-4">
                      <div className="p-3 bg-amber-950/40 border border-amber-600 rounded-xl text-xs text-amber-300">
                        {PREDICTION_QUESTIONS[0].verifyInstruction}
                      </div>

                      <canvas ref={canvasRef} width={600} height={150} className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-2" />

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                          <label className="text-indigo-400 font-bold block mb-1">Party A: {fptpVoteA}%</label>
                          <input type="range" min={10} max={60} value={fptpVoteA} onChange={(e) => setFptpVoteA(Number(e.target.value))} className="w-full accent-indigo-500" />
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                          <label className="text-pink-400 font-bold block mb-1">Party B: {fptpVoteB}%</label>
                          <input type="range" min={10} max={60} value={fptpVoteB} onChange={(e) => setFptpVoteB(Number(e.target.value))} className="w-full accent-pink-500" />
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                          <label className="text-amber-400 font-bold block mb-1">Party C: {fptpVoteC}%</label>
                          <input type="range" min={5} max={40} value={fptpVoteC} onChange={(e) => setFptpVoteC(Number(e.target.value))} className="w-full accent-amber-500" />
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                          <label className="text-emerald-400 font-bold block mb-1">Party D: {fptpVoteD}%</label>
                          <input type="range" min={5} max={30} value={fptpVoteD} onChange={(e) => setFptpVoteD(Number(e.target.value))} className="w-full accent-emerald-500" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white disabled:opacity-40 text-xs font-bold"
            >
              ← Previous Step
            </motion.button>

            <span className="text-xs text-slate-500 font-mono">
              {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30"
              >
                Launch Sandbox Free Play →
              </motion.button>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 3: SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🧪 Constitutional Laboratory (Sandbox)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">Explore all systems freely with zero scoring pressure before tackling CISCE challenges.</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSandboxMode('regimes')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${sandboxMode === 'regimes' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                Regimes
              </button>
              <button
                onClick={() => setSandboxMode('elections')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${sandboxMode === 'elections' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                Elections
              </button>
              <button
                onClick={() => setSandboxMode('amendments')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${sandboxMode === 'amendments' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                Amendments
              </button>
            </div>
          </div>

          {/* Interactive Constitutional Reference Browser */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <h4 className="text-sm font-bold text-indigo-300">Searchable Constitution & Case Law Explorer</h4>
              <input
                type="text"
                placeholder="Search articles (e.g. 19, 21, 368, 324)..."
                value={searchArticleQuery}
                onChange={(e) => setSearchArticleQuery(e.target.value)}
                className="px-3.5 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 w-full md:w-64"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-1">
              {filteredArticles.map((art, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.01 }}
                  className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-indigo-400">{art.num}</span>
                    <span className="text-[10px] text-slate-500 uppercase">{art.title}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">{art.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div className="flex justify-end pt-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAdvanceToChallenge}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center gap-2"
            >
              <span>I am Ready for the Challenges!</span>
              <span>→</span>
            </motion.button>
          </motion.div>
        </motion.section>
      )}

      {/* ─── PHASE 4: CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-bold">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-indigo-400 font-mono font-semibold">
                Competency: {challenge.competencyLevel.toUpperCase()}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700">
                {challenge.type}
              </span>
              <span className="text-[10px] font-mono text-indigo-400">{challenge.nodeId}</span>
            </div>

            <h3 className="text-base md:text-lg font-bold text-white leading-snug mb-5">
              {challenge.question}
            </h3>

            {/* MCQ FORMAT */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => {
                  const isSelected = selectedOption === i;
                  const isCorrect = i === challenge.correctIndex;
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake && isSelected ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm transition-all font-medium flex items-start gap-3 ${
                        showExplanation
                          ? isCorrect
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : isSelected
                            ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                            : 'bg-slate-900/50 border-slate-800 text-slate-500'
                          : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-700/60 flex items-center justify-center text-[10px] font-bold text-slate-300 shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* DRAG-LABEL FORMAT */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 rounded-lg bg-indigo-700 text-white text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'target_guardian', label: 'Constitutional Guardian & Judicial Review' },
                    { id: 'target_legislature', label: 'Union Legislature (Framing Laws)' },
                    { id: 'target_executive', label: 'Real Executive (Cabinet Accountability)' },
                    { id: 'target_electoral', label: 'Autonomous Election Machinery' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/60 flex flex-col justify-between min-h-[90px]"
                    >
                      <span className="text-xs text-slate-400 font-semibold">{target.label}</span>
                      <div className="mt-2 text-sm font-bold text-indigo-300">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop label here...'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT FORMAT */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to arrange in correct order:</p>
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
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs font-medium text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center font-bold text-[10px]">
                        {displayIndex + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(sortArrangement)}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Submit Order
                </motion.button>
              </div>
            )}

            {/* NUMERIC FORMAT */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical value"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 w-48"
                  />
                  <span className="text-xs text-slate-400 font-semibold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                  >
                    Check
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT FORMAT */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, pIdx) => (
                    <motion.button
                      key={pIdx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, cIdx) => (
                    <motion.span
                      key={cIdx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-3 py-1 bg-indigo-900/80 border border-indigo-700 rounded-lg text-xs text-indigo-200 flex items-center gap-2"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== cIdx))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ×
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 italic">Click parts above to construct sequence...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  Verify Construction
                </motion.button>
              </div>
            )}

            {/* STEPWISE EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 rounded-xl bg-amber-950/40 border border-amber-700/80 space-y-3"
              >
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Step-by-Step Constitutional Walkthrough:
                </h4>
                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.p
                        key={sIdx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-amber-100/90 leading-relaxed"
                      >
                        <strong className="text-amber-400">{sIdx + 1}.</strong> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold"
                    >
                      Show Next Point →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                    >
                      <span>{currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Simulation' : 'Next Challenge'}</span>
                      <span>→</span>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 5: COMPLETION ─── */}
      {phase === 'complete' && (
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 space-y-6"
        >
          <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-700 text-center space-y-4">
            <span className="text-4xl">🏛️</span>
            <h2 className="text-3xl font-black text-white">Constitutional Mastery Certified!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have navigated the complexities of totalitarian vs authoritarian states, separation of powers, amending formulas, and representation methods.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-3">
              <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block">BKT Mastery</span>
                <span className="text-2xl font-black text-indigo-400 capitalize">{masteryLevel}</span>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[140px]">
                <span className="text-xs text-slate-400 block">SRS Next Review</span>
                <span className="text-2xl font-black text-amber-400">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </span>
              </div>
            </div>

            {/* Explicit Spaced Repetition Notification Banner */}
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-950/80 border border-indigo-600/70 text-xs text-indigo-200 shadow-md">
              <span className="text-base">📅</span>
              <span>
                <strong>Spaced Repetition Schedule: </strong>
                {errors === 0
                  ? 'Review in 7 days (0 errors — Long-term consolidation phase)'
                  : errors <= 3
                  ? 'Review in 3 days (1-3 errors — Medium-interval reinforcement)'
                  : 'Review in 1 day (4+ errors — Active high-frequency recall)'}
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800 text-xs md:text-sm text-emerald-200">
            <strong>Evaluator Feedback: </strong>
            {errors === 0
              ? 'PERFECT SCORE! Flawless conceptual clarity across all 10 CISCE Section A nodes.'
              : errors <= 3
              ? 'Excellent performance! You hold a strong command over comparative constitutions and institutional checks.'
              : 'Solid foundation established. Review the specific misconceptions profile below to solidify your exam answers.'}
          </div>

          {hitMisconceptions.length > 0 && (
            <div className="p-6 rounded-2xl bg-rose-950/40 border border-rose-900/80 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                Targeted Misconception Remediation:
              </h3>
              <div className="space-y-3">
                {hitMisconceptions.map((mIdx, i) => {
                  const misc = misconceptions[mIdx];
                  if (!misc) return null;
                  return (
                    <div key={i} className="p-3.5 bg-slate-950/90 rounded-xl border border-rose-900/40 space-y-1 text-xs">
                      <p className="text-rose-300 font-bold">❌ Misconception: {misc.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ Correction: {misc.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="p-6 rounded-2xl bg-indigo-950/40 border border-indigo-800 space-y-3">
            <h3 className="text-base font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, sIdx) => (
                <li key={sIdx} className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Simulation Passed with Honours!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_PoliticalScienceTotalitarianAuthoritarianStatesSim;
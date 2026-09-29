'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import gsap from 'gsap';

// ─── NODE ID CONSTANTS (ALL 10 MANDATORY NODES) ───
const NODE_C6_HISTCIV_051 = 'c6_histciv_051';
const NODE_C6_HISTCIV_052 = 'c6_histciv_052';
const NODE_C6_HISTCIV_053 = 'c6_histciv_053';
const NODE_C6_HISTCIV_054 = 'c6_histciv_054';
const NODE_C6_HISTCIV_055 = 'c6_histciv_055';
const NODE_C6_HISTCIV_056 = 'c6_histciv_056';
const NODE_C6_HISTCIV_057 = 'c6_histciv_057';
const NODE_C6_HISTCIV_058 = 'c6_histciv_058';
const NODE_C6_HISTCIV_059 = 'c6_histciv_059';
const NODE_C6_HISTCIV_060 = 'c6_histciv_060';

const ALL_NODE_IDS = [
  NODE_C6_HISTCIV_051,
  NODE_C6_HISTCIV_052,
  NODE_C6_HISTCIV_053,
  NODE_C6_HISTCIV_054,
  NODE_C6_HISTCIV_055,
  NODE_C6_HISTCIV_056,
  NODE_C6_HISTCIV_057,
  NODE_C6_HISTCIV_058,
  NODE_C6_HISTCIV_059,
  NODE_C6_HISTCIV_060,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'From Ancient Wisdom to Grassroots Democracy',
  intro: 'Step into the dual role of a Classical Indian Scholar and a Modern District Planning Officer. First, explore how the Gupta Golden Age laid mathematical, astronomical, architectural, and educational foundations. Then, build and operate India’s 3-tier Panchayati Raj system and metropolitan urban networks to govern real communities.',
  context: 'Discover how Aryabhatta explained eclipses and pi in 499 CE, why zero was formally defined by Brahmagupta in 628 CE, how Kalidasa and Nalanda inspired the world, and how democratic decentralisation (from the Gram Sabha to Zila Parishad and 1M+ Metropolitan Corporations) empowers millions today.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In 499 CE, astronomer Aryabhatta rejected the myth that eclipses were caused by Rahu and Ketu swallowing celestial bodies. What was his scientific breakthrough?',
  options: [
    'Eclipses are optical illusions caused by twinkling atmospheric stars',
    'Eclipses are shadows: Moon shadow on Earth (Solar) & Earth shadow on Moon (Lunar)',
    'Eclipses occur because the Sun shuts off periodically for cooling',
    'Eclipses are caused by black holes crossing the Solar System',
  ],
  correctIndex: 1,
  hintAfter: 'Think about shadows cast when sunlight hits solid spheres! Let us explore the Gupta observatory and democratic institutions in detail.',
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

// ─── CHALLENGES ARRAY ───
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION TIER (1-7) ──
  {
    id: 'ch_f01',
    nodeId: NODE_C6_HISTCIV_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Aryabhatta composed the seminal text "Aryabhatiya" in 499 CE at the age of 23. What approximate value of Pi (π) did he calculate?',
    options: ['3.1416', '3.0000', '2.7182', '3.8421'],
    correctIndex: 0,
    explanation: 'Aryabhatta calculated the ratio of circumference to diameter as approximately 3.1416 (62832/20000), remarkably close to the true value.',
    hints: [
      'It is standard 4 decimal places starting with 3.14...',
      'Check the classic Indian approximation close to 22/7 but precise to four decimals.',
      'Aryabhatta gave 3.1416 in his verse.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_f02',
    nodeId: NODE_C6_HISTCIV_052,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match Kalidasa’s celebrated Sanskrit masterpiece "Abhijnanasakuntalam" with its correct literary genre.',
    options: ['Sanskrit Drama / Play', 'Lyric Weather Poem', 'Epic Heroic Chronicle', 'Grammar Treatise'],
    correctIndex: 0,
    explanation: 'Abhijnanasakuntalam is a world-renowned Sanskrit drama depicting the romance of King Dushyanta and Shakuntala, translated to English by Sir William Jones in 1789.',
    hints: [
      'Think about whether it is acted on a stage or sung as a short poem.',
      'Meghaduta is a lyric poem; Abhijnanasakuntalam is a dramatic play.',
      'It is a drama / play.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_f03',
    nodeId: NODE_C6_HISTCIV_053,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which constitutional amendment granted constitutional protection and Part IX to rural Local Self-Government (Panchayati Raj) in India?',
    options: [
      '73rd Constitutional Amendment Act (1992)',
      '42nd Constitutional Amendment Act (1976)',
      '74th Constitutional Amendment Act (1992)',
      '86th Constitutional Amendment Act (2002)',
    ],
    correctIndex: 0,
    explanation: 'The 73rd Amendment (effective 24 April 1993) inserted Part IX (Articles 243-243O) for rural Panchayati Raj, while the 74th Amendment addressed urban local bodies.',
    hints: [
      'It is the amendment passed in 1992 specifically for rural Panchayats.',
      '73rd is rural (Panchayats), 74th is urban (Municipalities).',
      'Select the 73rd Constitutional Amendment Act (1992).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_f04',
    nodeId: NODE_C6_HISTCIV_054,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the 3 tiers of the Panchayati Raj system in order from the Grassroots Base (lowest) to the Apex (highest).',
    sortItems: ['Gram Panchayat (Village Level)', 'Block Samiti / Panchayat Samiti (Block Level)', 'Zila Parishad (District Level)'],
    correctOrder: [0, 1, 2],
    explanation: 'The hierarchy is: Gram Panchayat at the village base -> Block Samiti in the middle -> Zila Parishad at the district apex.',
    hints: [
      'Start with the individual village, then the cluster of villages, then the whole district.',
      'Gram = Village, Block = Cluster/Tehsil, Zila = District.',
      'Order: Gram Panchayat -> Block Samiti -> Zila Parishad.',
    ],
  },
  {
    id: 'ch_f05',
    nodeId: NODE_C6_HISTCIV_055,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who is automatically a member of the village Gram Sabha?',
    options: [
      'Every resident who is an enrolled voter (age 18+) in the village electoral roll',
      'Only landowners and tax-paying shopkeepers',
      'Only the elected Ward Panchs and Sarpanch',
      'Persons specially appointed by the District Magistrate',
    ],
    correctIndex: 0,
    explanation: 'Membership of the Gram Sabha is automatic for all registered adult voters (18+) on the village electoral roll, making it an organ of direct democracy.',
    hints: [
      'Gram Sabha is not elected; everyone on the voter list is automatically in it.',
      'Turning 18 and registering on the electoral roll grants instant membership.',
      'All registered voters of the village are members.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_f06',
    nodeId: NODE_C6_HISTCIV_056,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the constitutional minimum proportion of seats reserved for women in Panchayati Raj institutions?',
    options: ['Not less than one-third (33.3%)', 'Exactly ten per cent (10%)', 'Fifty per cent mandatory everywhere', 'No fixed reservation for women'],
    correctIndex: 0,
    explanation: 'Article 243D mandates that not less than one-third (33%) of all seats and office-bearer posts must be reserved for women (though states like Bihar have raised it to 50%).',
    hints: [
      'The baseline fraction in the 73rd Amendment is 1/3.',
      '1 out of every 3 seats minimum.',
      'Not less than one-third (33.3%).',
    ],
  },
  {
    id: 'ch_f07',
    nodeId: NODE_C6_HISTCIV_060,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the minimum population threshold for an urban area to be classified as a "Metropolitan Area" under Article 243P of the Indian Constitution?',
    options: ['1 Million (10 Lakh) or more', '100,000 (1 Lakh)', '500,000 (5 Lakh)', '5 Million (50 Lakh)'],
    correctIndex: 0,
    explanation: 'Article 243P defines a Metropolitan area as a territory having a population of 1 million (10 lakh) or more, administered by a Municipal Corporation.',
    hints: [
      'Think of 10 Lakh in the Indian numbering system.',
      '1 million is the universal constitutional benchmark.',
      '1 Million (10 Lakh) or more.',
    ],
    misconceptionIndex: 4,
  },

  // ── STANDARD TIER (8-15) ──
  {
    id: 'ch_s01',
    nodeId: NODE_C6_HISTCIV_051,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Who first formally defined Zero with mathematical arithmetic rules (e.g. n - n = 0, n + 0 = n) in his 628 CE text "Brahmasphutasiddhanta"?',
    options: ['Brahmagupta', 'Aryabhatta', 'Varahamihira', 'Al-Khwarizmi'],
    correctIndex: 0,
    explanation: 'Aryabhatta utilised the decimal positional system in 499 CE, but Brahmagupta in 628 CE was the first to formalise zero as a full number with arithmetic operational rules.',
    hints: [
      'Aryabhatta used place value; this scholar from Bhinmal (Rajasthan) wrote the formal rules in 628 CE.',
      'Do not confuse Aryabhatta with Brahmagupta.',
      'Brahmagupta defined zero as a formal number with operational rules.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_s02',
    nodeId: NODE_C6_HISTCIV_052,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which caves at the Ajanta complex are specifically dated to the Vakataka-Gupta period (circa 460-480 CE) featuring iconic Buddhist murals?',
    options: ['Caves 1, 2, 16, and 17', 'Caves 9 and 10 only (early Satavahana)', 'All 30 caves simultaneously', 'Caves 29 and 30 exclusively'],
    correctIndex: 0,
    explanation: 'Ajanta was constructed in phases. Caves 1, 2, 16, and 17 belong to the golden Vakataka-Gupta era under patrons allied by marriage to the Guptas.',
    hints: [
      'The entire site was NOT built in one single go.',
      'Look for caves 1, 2, 16, and 17.',
      'Caves 1, 2, 16, and 17 contain the famous Vakataka-Gupta paintings.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_s03',
    nodeId: NODE_C6_HISTCIV_056,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare the roles of the Sarpanch and the Panchayat Secretary (Gram Sevak) in village administration:',
    options: [
      'Sarpanch is the elected political leader who decides priorities; Secretary is an appointed government servant who maintains official records',
      'Sarpanch is appointed by the District Collector; Secretary is elected by villagers',
      'Both are civil servants selected through state administrative examinations',
      'Secretary has power to dissolve the Gram Sabha; Sarpanch only keeps accounts',
    ],
    correctIndex: 0,
    explanation: 'The Sarpanch has political legitimacy through direct election and answers to the Gram Sabha; the Secretary is an appointed bureaucrat maintaining registers and executing paperwork.',
    hints: [
      'One is chosen by the voters; the other is a paid government official.',
      'Elected head vs appointed administrative officer.',
      'Sarpanch is elected; Secretary is appointed.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_s04',
    nodeId: NODE_C6_HISTCIV_057,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the statutory punishment limit of a Nyaya Panchayat when resolving petty civil and criminal disputes?',
    options: [
      'Small monetary fines only; strictly NO imprisonment',
      'Up to 3 years of rigorous imprisonment in district jail',
      'Confiscation of agricultural land and houses',
      'Physical corporal punishment in the village square',
    ],
    correctIndex: 0,
    explanation: 'Nyaya Panchayats handle minor matters (boundary rows, cattle trespass, small loans) and can only impose modest fines. Serious offences requiring jail go to regular criminal courts.',
    hints: [
      'Can a village panel put a neighbour behind bars?',
      'No imprisonment is permitted.',
      'Small monetary fines only; no imprisonment.',
    ],
  },
  {
    id: 'ch_s05',
    nodeId: NODE_C6_HISTCIV_058,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why is the Block Samiti (Panchayat Samiti) required to manage a Primary Health Centre (PHC) serving 45 villages instead of an individual Gram Panchayat?',
    options: [
      'The PHC serves multiple villages across the block; single Gram Panchayats lack the geographic jurisdiction, multi-village revenue, and specialist staff',
      'Gram Panchayats are legally barred from health activities',
      'Only the State Governor can visit a Gram Panchayat hospital',
      'Villagers refuse to enter health facilities built by their own panchayat',
    ],
    correctIndex: 0,
    explanation: 'A Primary Health Centre caters to 30,000+ residents across 40-70 villages. It requires block-level coordination, medical staffing, and budget pooling managed by the Block Samiti and BDO.',
    hints: [
      'Think about scale: is a 45-village hospital practical for 1 village council to finance?',
      'Inter-village projects need the middle tier (Block level).',
      'The project exceeds single-village jurisdiction and resources.',
    ],
  },
  {
    id: 'ch_s06',
    nodeId: NODE_C6_HISTCIV_059,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which statement accurately distinguishes the Zila Parishad from the District Collector’s Office?',
    options: [
      'Zila Parishad is an elected rural developmental body headed by the Adhyaksha; the District Collector is an appointed IAS officer heading general administration, revenue, and law & order',
      'The District Collector is the elected President of the Zila Parishad',
      'Zila Parishad controls the armed forces and high court judges in the district',
      'Both bodies are headed by the same village Sarpanch on rotation',
    ],
    correctIndex: 0,
    explanation: 'The Adhyaksha (elected) and CEO (IAS) lead the Zila Parishad for rural development, whereas the District Collector is a separate IAS officer heading district-wide executive administration, law & order, and revenue.',
    hints: [
      'Remember the elected vs appointed dichotomy at the apex district tier.',
      'The Collector does NOT head the Zila Parishad; the elected Adhyaksha does.',
      'Zila Parishad is elected development; Collector is appointed general administration.',
    ],
  },
  {
    id: 'ch_s07',
    nodeId: NODE_C6_HISTCIV_060,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Position the 4 major classical Indian metropolitan cities on their correct geographical locations across India.',
    dragItems: [
      { label: 'Mumbai (West Coast - Arabian Sea / Financial Capital)', targetId: 'loc_west' },
      { label: 'Chennai (East Coast - Bay of Bengal / Port & Auto Hub)', targetId: 'loc_south' },
      { label: 'Delhi (Northern Interior / National Capital)', targetId: 'loc_north' },
      { label: 'Kolkata (East - Hooghly River / Cultural Hub)', targetId: 'loc_east' },
    ],
    correctMapping: {
      loc_west: 'Mumbai (West Coast - Arabian Sea / Financial Capital)',
      loc_south: 'Chennai (East Coast - Bay of Bengal / Port & Auto Hub)',
      loc_north: 'Delhi (Northern Interior / National Capital)',
      loc_east: 'Kolkata (East - Hooghly River / Cultural Hub)',
    },
    explanation: 'Mumbai is on the western Arabian Sea coast, Chennai on the south-eastern Coromandel coast, Delhi in the northern interior, and Kolkata on the eastern Hooghly riverbank.',
    hints: [
      'Do not swap Mumbai (West) and Chennai (East).',
      'Delhi is inland up north; Kolkata is near the Ganges delta/Hooghly in the east.',
      'Match West -> Mumbai, South-East -> Chennai, North -> Delhi, East -> Kolkata.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_s08',
    nodeId: NODE_C6_HISTCIV_056,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a Gram Panchayat of 12 total seats where SCs form 25% of the village population, what is the minimum statutory reservation for SC members and women (at 1/3 minimum)? How many seats must women hold at minimum?',
    correctAnswer: 4,
    tolerance: 0,
    unit: 'seats for women',
    explanation: 'One-third of 12 seats = 12 / 3 = 4 seats minimum reserved for women (and 25% of 12 = 3 seats for SCs).',
    hints: [
      'Calculate 1/3 of 12.',
      '12 divided by 3 equals 4.',
      'The answer is 4.',
    ],
  },

  // ── ADVANCED TIER (16-22) ──
  {
    id: 'ch_a01',
    nodeId: NODE_C6_HISTCIV_051,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Construct the historical transmission pathway of the Indian decimal place-value system and numeral concept westward to modern computing.',
    availableParts: ['Indian Gupta Scholars', '->', 'Al-Khwarizmi in 9th-Century Baghdad', '->', '12th-Century Latin European Translators', '->', 'Global Mathematics & Computing'],
    targetState: 'Indian Gupta Scholars -> Al-Khwarizmi in 9th-Century Baghdad -> 12th-Century Latin European Translators -> Global Mathematics & Computing',
    validationHint: 'Sequence: Origin in India -> Arab transmission via Baghdad -> European translation -> Worldwide computing.',
    explanation: 'The decimal system developed in India (Lokavibhaga 458 CE, Aryabhatta 499 CE), was explained by Al-Khwarizmi in Baghdad, translated into Latin in 12th-century Europe, and became the foundation of global science.',
    hints: [
      'Start with Indian Gupta Scholars.',
      'Next is Al-Khwarizmi in Baghdad, who wrote treatises explaining Indian numerals.',
      'Follow with European translators and finally global science and computers.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_a02',
    nodeId: NODE_C6_HISTCIV_055,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Under the PESA Act of 1996 in tribal Scheduled Areas, what enhanced power is granted to the Gram Sabha that regular village councils elsewhere do not automatically enjoy?',
    options: [
      'Mandatory prior consent for land acquisition, management of minor forest produce, and control over local water bodies and mining leases',
      'Power to raise a private military militia and mint local currency',
      'Exemption from all central Indian criminal laws and income taxes',
      'Authority to unilaterally annex neighbouring tehsils without state approval',
    ],
    correctIndex: 0,
    explanation: 'The Provisions of the Panchayats (Extension to Scheduled Areas) Act, 1996 (PESA) empowers tribal Gram Sabhas to safeguard traditional community resources, minor forest produce, and approve land acquisition.',
    hints: [
      'PESA protects indigenous Adivasi self-governance over land and natural resources.',
      'Look for land acquisition consent and minor forest produce control.',
      'Option A specifies the authentic PESA statutory powers.',
    ],
  },
  {
    id: 'ch_a03',
    nodeId: NODE_C6_HISTCIV_057,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of dispute resolution for a petty boundary wall encroachment quarrel in rural India.',
    sortItems: [
      'Dispute arises between two farming families over a 2-foot boundary line',
      'Aggrieved farmer files complaint before the Nyaya Panchayat (Gram Kutchery)',
      'Nyaya Panchas conduct an on-site inspection and examine both parties without lawyers',
      'Nyaya Panchayat issues an order directing boundary restoration with a modest fine',
      'Dissatisfied party exercises the right of appeal to the regular Sub-Divisional Civil Court',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Dispute -> Complaint to Nyaya Panchayat -> Informal site visit & hearing -> Fine/settlement order -> Right of appeal to regular formal judiciary if aggrieved.',
    hints: [
      'Dispute comes first; court appeal is the final supervisory recourse.',
      'Site visit by Nyaya Panchas occurs before the order is delivered.',
      'Order: Dispute -> Filing -> Site visit -> Village Order -> Formal Appeal.',
    ],
  },
  {
    id: 'ch_a04',
    nodeId: NODE_C6_HISTCIV_053,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why did the Balwant Rai Mehta Committee (1957) advocate for "Democratic Decentralisation" over relying solely on bureaucratic officers for rural development?',
    options: [
      'Decisions made by locally elected representatives who live near the problems are faster, responsive, cost-effective, and generate public ownership',
      'Bureaucratic officers refused to travel outside state capitals under any circumstance',
      'Villages had no legal existence prior to 1957',
      'The Constitution banned IAS officers from entering rural districts',
    ],
    correctIndex: 0,
    explanation: 'The 1957 Committee found that Community Development Programmes failed when run top-down by bureaucrats; grassroots elected representatives ensure proximity, accountability, and active public participation.',
    hints: [
      'Proximity argument: the person living next to the broken well fixes it faster and is answerable to voters.',
      'Decentralisation fosters local accountability and community empowerment.',
      'Option A states the core principle of democratic decentralisation.',
    ],
  },
  {
    id: 'ch_a05',
    nodeId: NODE_C6_HISTCIV_058,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Analyze how the composition of the Block Samiti links the village tier to the district tier in a representational chain:',
    options: [
      'Village Sarpanches automatically sit as Block Samiti members; the elected Block Pradhan in turn represents the block inside the apex Zila Parishad',
      'Members are appointed directly by the Prime Minister in New Delhi',
      'Villagers elect an entirely disconnected set of people with no institutional link between tiers',
      'Only retired High Court judges are permitted to serve on the Block Samiti',
    ],
    correctIndex: 0,
    explanation: 'The Panchayati Raj is an interlocking pyramid: Sarpanches represent villages at the Block Samiti, and Block Pradhans represent blocks at the Zila Parishad, carrying grassroots concerns upward.',
    hints: [
      'Think of the upward representative cascade.',
      'Sarpanch -> Block Samiti; Block Pradhan -> Zila Parishad.',
      'Option A explains the interlocking hierarchy.',
    ],
  },
  {
    id: 'ch_a06',
    nodeId: NODE_C6_HISTCIV_052,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How did Nalanda University (patronised by Gupta and later rulers, recorded by Xuanzang) demonstrate international intellectual exchange in ancient India?',
    options: [
      'It accommodated 10,000+ residential students and 2,000 teachers from China, Tibet, Korea, and Central Asia studying Buddhism, logic, medicine, and mathematics',
      'It only admitted royal princes from the immediate capital city of Pataliputra',
      'It operated purely as a primary trade guild with no philosophical or scientific curriculum',
      'It was an exclusive military training academy for Gupta archers',
    ],
    correctIndex: 0,
    explanation: 'Nalanda was a residential monastic university drawing scholars across Asia, featuring rigorous entrance examinations, vast multi-storeyed libraries (Dharmaganja), and multifaceted curricula.',
    hints: [
      'Xuanzang recorded thousands of scholars from China, Korea, and Tibet.',
      'It was a residential university teaching theology, logic, astronomy, and medicine.',
      'Select Option A.',
    ],
  },
  {
    id: 'ch_a07',
    nodeId: NODE_C6_HISTCIV_060,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are planning a metropolitan infrastructure upgrade. In 2011, Census India recognised Bengaluru, Hyderabad, Ahmedabad, and Pune as additional Metropolitan Cities. Why is the metropolitan classification dynamic rather than fixed to the historic 4 cities?',
    options: [
      'Because urbanisation, industrial growth, and migration cause cities to cross the 1-million demographic and economic threshold over time',
      'Because the Parliament redraws the map of India every 6 months by lottery',
      'Because the 4 original cities lost their population and are no longer metropolitan',
      'Because metropolitan status is awarded based on winning sports championships',
    ],
    correctIndex: 0,
    explanation: 'Metropolitan status is tied to objective demographic benchmarks (1M+ population) and complex civic requirements. As economies expand, emerging hubs qualify for Municipal Corporation governance.',
    hints: [
      'Consider population growth, IT hubs, industrial corridors, and expanding municipal boundaries.',
      'Crossing 1 Million population + economic functions grants metropolitan status.',
      'Urban growth and crossing the 1M threshold make the list dynamic.',
    ],
    misconceptionIndex: 4,
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
  nodeId: NODE_C6_HISTCIV_051,
  title: 'Gupta Scientific & Cultural Renaissance & Indian Local Self-Government',
  definition:
    'Comprehensive mastery of Gupta achievements (Aryabhatta, Decimal system, Zero, Varahamihira, Kalidasa, Dashavatara Temple, Ajanta, Nalanda) and Indian Democratic Governance (73rd/74th Amendments, 3-Tier Panchayati Raj from Gram Sabha to Zila Parishad, Nyaya Panchayat, and Metropolitan Urban Governance).',
  eli5:
    'Discover how ancient Indian scientists figured out eclipses, pi, and zero 1,500 years ago, and learn how everyday people today run their own villages, blocks, districts, and mega-cities through elections, panchayats, and city corporations!',
  misconceptions: [
    {
      misconception: 'Aryabhatta invented zero as a formal number with arithmetic operational rules.',
      correction:
        'Aryabhatta used the decimal place-value system systematically in 499 CE. It was Brahmagupta in 628 CE (Brahmasphutasiddhanta) who first formally defined zero with arithmetic rules (n - n = 0, n + 0 = n).',
    },
    {
      misconception: 'The entire Ajanta cave complex was created by the Gupta kings.',
      correction:
        'Ajanta was built in multi-century phases. Only specific caves (1, 2, 16, 17) belong to the Vakataka-Gupta era (460-480 CE), patronised by the allied Vakataka dynasty.',
    },
    {
      misconception: 'Kalidasa only wrote poetry, not stage plays.',
      correction:
        'Kalidasa mastered multiple genres: Sanskrit dramas (Abhijnanasakuntalam, Malavikagnimitram), lyric poems (Meghaduta, Ritusamhara), and heroic epics (Raghuvamsha, Kumarasambhava).',
    },
    {
      misconception: 'The Sarpanch is a government civil servant appointed by the District Collector.',
      correction:
        'The Sarpanch is directly elected by village voters for a 5-year term. The Panchayat Secretary (Gram Sevak) is the appointed government employee.',
    },
    {
      misconception: 'Only four cities (Mumbai, Delhi, Chennai, Kolkata) can ever be classified as metropolitan.',
      correction:
        'Article 243P defines any urban area with 1 Million+ population as metropolitan. The 2011 Census officially recognised Bengaluru, Hyderabad, Ahmedabad, and Pune as additional metros.',
    },
  ],
  diagnosticQuestions: [
    { question: 'In which year did Aryabhatta compose the Aryabhatiya at age 23?', options: ['499 CE', '320 CE', '628 CE', '1975 CE'], correctIndex: 0 },
    { question: 'Which Gupta-era stone temple features the Shesha-shayana Vishnu sculpture?', options: ['Dashavatara Temple, Deogarh', 'Brihadisvara Temple', 'Sun Temple, Konark', 'Sanchi Stupa'], correctIndex: 0 },
    { question: 'Which committee in 1957 first recommended the 3-tier Panchayati Raj system?', options: ['Balwant Rai Mehta Committee', 'Sarkaria Commission', 'Simon Commission', 'Kothari Commission'], correctIndex: 0 },
    { question: 'Which state first inaugurated the 3-tier Panchayati Raj system in Nagaur on 2 Oct 1959?', options: ['Rajasthan', 'Maharashtra', 'Kerala', 'Uttar Pradesh'], correctIndex: 0 },
    { question: 'Is the village Gram Sabha constituted by election or automatic registration?', options: ['Automatic (all registered voters 18+)', 'By secret ballot election', 'By District Collector nomination', 'By hereditary succession'], correctIndex: 0 },
    { question: 'Can a Nyaya Panchayat sentence a convicted person to 6 months in prison?', options: ['No, fines only, no imprisonment', 'Yes, up to 1 year', 'Yes, up to 5 years', 'Only with Sarpanch approval'], correctIndex: 0 },
    { question: 'Who is the appointed administrative officer of the Block Samiti?', options: ['Block Development Officer (BDO)', 'District Collector', 'Panchayat Secretary', 'Chief Justice'], correctIndex: 0 },
    { question: 'Who heads the elected wing of the Zila Parishad at the district level?', options: ['Adhyaksha (Chairman/President)', 'District Magistrate', 'Chief Minister', 'Gram Sevak'], correctIndex: 0 },
  ],
  masteryCriteria: 'Mastery across ancient Indian scientific/cultural innovations and 3-tier Panchayati Raj civics governance.',
};

// ─── EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: 'Aryabhatta’s Planetary & Eclipse Simulator (499 CE)',
    instruction: 'Rotate the Earth and Moon sliders. Observe how shadows create Lunar and Solar eclipses without mythical monsters!',
    interactionType: 'eclipse-simulator',
    nodeId: NODE_C6_HISTCIV_051,
  },
  {
    title: 'Gupta Cultural Matrix (Deogarh, Ajanta, Nalanda, Kalidasa)',
    instruction: 'Click each monument and scholar node to discover their distinctive architectural and literary attributes.',
    interactionType: 'matrix-explorer',
    nodeId: NODE_C6_HISTCIV_052,
  },
  {
    title: 'The 3-Tier Panchayati Raj Architecture',
    instruction: 'Adjust the tier selector to inspect the flow of funds, representation, and elected vs appointed heads across Village, Block, and District levels.',
    interactionType: 'tier-explorer',
    nodeId: NODE_C6_HISTCIV_054,
  },
  {
    title: 'Gram Sabha & Gram Panchayat Accountability Lab',
    instruction: 'Simulate a Gram Sabha budget audit! Approve or reject development projects and watch the Sarpanch’s balance update in real time.',
    interactionType: 'accountability-lab',
    nodeId: NODE_C6_HISTCIV_055,
  },
  {
    title: 'Metropolitan Urban Network (1M+ Demographic Grid)',
    instruction: 'Click on the four historical metros and modern additions on the interactive India map to inspect their population and economic pillars.',
    interactionType: 'metro-map',
    nodeId: NODE_C6_HISTCIV_060,
  },
];

// ─── PREDICTION QUESTIONS (AT LEAST 2 WITH verifyInstruction) ───
const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'Predict: If an aggrieved villager challenges a decision made by the Nyaya Panchayat regarding crop damage, what will happen?',
    options: [
      'The case can be appealed to the regular formal Sub-Divisional Civil Court',
      'The villager is arrested immediately for disrespecting the panchayat',
      'The decision is completely final and no court in India can ever review it',
      'The Sarpanch takes over as High Court judge',
    ],
    correctIndex: 0,
    verifyInstruction: 'Interact with the Judicial & Civics tab below to verify how formal courts serve as a supervisory layer above village forums!',
    nodeId: NODE_C6_HISTCIV_057,
  },
  {
    id: 'pred_2',
    question: 'Predict: What celestial event occurs when the Moon moves directly between the Sun and Earth (at orbit angle 0°)?',
    options: [
      'A Solar Eclipse occurs because the Moon casts its cone shadow directly onto Earth',
      'A Lunar Eclipse occurs because the Earth hides behind Jupiter',
      'The Sun cools down by 50% permanently',
      'The Earth changes its axial rotation from counterclockwise to clockwise',
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the Moon orbit slider to 0° in the Eclipse Simulator to verify how the Moon casts its shadow directly on Earth!',
    nodeId: NODE_C6_HISTCIV_051,
  },
];

// ─── OBSERVATION QUESTIONS (AT LEAST 2 WITH observableOptions) ───
const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'Observation: What structural pattern repeats across all 3 tiers (Village, Block, District) of local self-government?',
    observableOptions: [
      'Each tier pairs an ELECTED political head with an APPOINTED government administrative officer',
      'Every tier is commanded exclusively by military generals without elections',
      'There are no administrative officers at all; elected politicians do all paperwork',
      'Only the central Prime Minister manages every single village drain',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_HISTCIV_054,
  },
  {
    id: 'obs_2',
    question: 'Observation: When you switch between the Gupta cultural architectural models, what distinct structural features characterize the Dashavatara Temple at Deogarh?',
    observableOptions: [
      'A square sanctum (garbhagriha) built upon a raised plinth (jagati) with proto-shikhara superstructure',
      'A completely spherical marble dome identical to Mughal architecture',
      'A hollowed wooden hut with no foundation or stone relief carvings',
      'An underground bunker with iron gates and no entrance sanctum',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_HISTCIV_052,
  },
];

// ─── REAL-WORLD PROJECT ───
const REAL_WORLD_ACTIVITY = {
  title: 'Civic Architect: Design Your Own District Action Plan',
  description:
    'Select a real or model Indian district (e.g., Pune, Maharashtra or East Godavari, Andhra Pradesh). Chart how an emergency health initiative (like mobile clinics or solar water filters) gets approved by the Gram Sabha, coordinated by the Block Samiti, funded by the Zila Parishad, and synchronized with a nearby Metropolitan Corporation!',
  steps: [
    'Draft a village proposal for 5 solar-powered drinking water borewells at the Gram Sabha meeting.',
    'Present the proposal via your Sarpanch to the Block Samiti for multi-village technical clearance with the BDO.',
    'Secure district grant clearance from the Zila Parishad Adhyaksha and CEO.',
    'Link the supply chain with a major manufacturing hub in a nearby Metropolitan City (e.g., Mumbai, Chennai, Pune, or Bengaluru).',
  ],
};

function C6_HistoryCivicsScientificProgressGuptaSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C6_HISTCIV_051,
  title = DEFAULT_PROPS.title || 'Gupta Science & Local Self-Gov',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['histciv'] || { name: 'History & Civics', emoji: '🏛️', color: 'amber' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Interaction state variables for predictions & observations
  const [activePredictionIdx, setActivePredictionIdx] = useState(0);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [activeObservationIdx, setActiveObservationIdx] = useState(0);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Reflection responses in completion phase
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Escalating hints & feedback state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop & Construction state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual feedback animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Interactive Exploration & Sandbox Controls
  const [earthMoonAngle, setEarthMoonAngle] = useState(45);
  const [selectedGuptaNode, setSelectedGuptaNode] = useState<string>('aryabhatta');
  const [selectedTierLevel, setSelectedTierLevel] = useState<'village' | 'block' | 'district'>('village');
  const [gramSabhaBudget, setGramSabhaBudget] = useState(150000);
  const [projectsApproved, setProjectsApproved] = useState<{ id: string; name: string; cost: number; status: 'approved' | 'rejected' | 'pending' }[]>([
    { id: 'p1', name: 'Repair 3 Community Handpumps', cost: 25000, status: 'pending' },
    { id: 'p2', name: 'Concrete Drain Cleaning & Sanitation', cost: 40000, status: 'pending' },
    { id: 'p3', name: 'LED Solar Streetlights on Main Lane', cost: 35000, status: 'pending' },
    { id: 'p4', name: 'Luxury VIP Guest House for Sarpanch', cost: 90000, status: 'pending' },
  ]);
  const [selectedMetroCity, setSelectedMetroCity] = useState<string>('mumbai');
  const [panchayatSeats, setPanchayatSeats] = useState(9);
  const [scPercentage, setScPercentage] = useState(20);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT MASTERY LOAD ───
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
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS 2D ASTRONOMICAL ECLIPSE ANIMATION ───
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

      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 25; i++) {
        const sx = (i * 37 + frame * 0.2) % canvas.width;
        const sy = (i * 23) % canvas.height;
        ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 255, 255, 0.7)' : 'rgba(250, 204, 21, 0.5)';
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      const sunX = 40;
      const sunY = canvas.height / 2;
      const sunGrad = ctx.createRadialGradient(sunX, sunY, 5, sunX, sunY, 30);
      sunGrad.addColorStop(0, '#fef08a');
      sunGrad.addColorStop(0.5, '#f59e0b');
      sunGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.beginPath();
      ctx.arc(sunX, sunY, 28, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.fill();

      const earthX = canvas.width / 2 + 30;
      const earthY = canvas.height / 2;
      ctx.beginPath();
      ctx.arc(earthX, earthY, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#3b82f6';
      ctx.fill();
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const orbitR = 70;
      const rad = (earthMoonAngle * Math.PI) / 180;
      const moonX = earthX + orbitR * Math.cos(rad);
      const moonY = earthY + orbitR * Math.sin(rad);

      ctx.beginPath();
      ctx.arc(earthX, earthY, orbitR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      const isSolar = Math.abs(moonX - (sunX + earthX) / 2) < 25 && moonX < earthX && Math.abs(moonY - earthY) < 18;
      const isLunar = moonX > earthX && Math.abs(moonY - earthY) < 15;

      if (isSolar) {
        ctx.beginPath();
        ctx.moveTo(moonX, moonY - 5);
        ctx.lineTo(earthX, earthY);
        ctx.lineTo(moonX, moonY + 5);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.fill();
      }

      if (isLunar) {
        ctx.beginPath();
        ctx.moveTo(earthX, earthY - 14);
        ctx.lineTo(moonX + 15, moonY);
        ctx.lineTo(earthX, earthY + 14);
        ctx.fillStyle = 'rgba(168, 85, 247, 0.4)';
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(moonX, moonY, 7, 0, Math.PI * 2);
      ctx.fillStyle = isLunar ? '#7c3aed' : '#e2e8f0';
      ctx.fill();

      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`Angle: ${Math.round(earthMoonAngle)}°`, 10, canvas.height - 10);

      if (isSolar) {
        ctx.fillStyle = '#f87171';
        ctx.fillText('SOLAR ECLIPSE: Moon casts shadow on Earth', 10, 20);
      } else if (isLunar) {
        ctx.fillStyle = '#c084fc';
        ctx.fillText('LUNAR ECLIPSE: Earth blocks Sun onto Moon', 10, 20);
      } else {
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('Normal Celestial Motion (Aryabhatiya, 499 CE)', 10, 20);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [earthMoonAngle]);

  // ─── GSAP TIMELINE EFFECT ───
  useEffect(() => {
    if (timelineRef.current && phase === 'explore') {
      gsap.fromTo(
        timelineRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [currentSlide, phase]);

  // ─── HANDLERS ───
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

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Excellent! Aryabhatta proved eclipses are natural planetary shadows.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration. Manipulate the tools to discover classical and civic principles.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with all variables without any grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    setScoreBreakdown({ correct: 0, total: 0 });
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode initiated. Put your historical and civics reasoning to the test.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now interact with the simulation to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[activeObservationIdx].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation! Well noticed.' : 'Examine the structural relationships closely.');
  }, [activeObservationIdx]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You scored ${finalScore} percent and mastered the Gupta and Panchayati Raj concepts.`);
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
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding work.');
        setShowSparkle(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(bktStateRef.current));
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
          speechManager.speak('Let us study the complete historical explanation.');
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
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
      setDraggedItem(null);
    },
    [draggedItem]
  );

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
    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(ans);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleProjectToggle = useCallback((projId: string, action: 'approved' | 'rejected') => {
    audioManager.play(action === 'approved' ? 'tap' : 'pop');
    setProjectsApproved(prev =>
      prev.map(p => {
        if (p.id === projId) {
          return { ...p, status: action };
        }
        return p;
      })
    );
  }, []);

  // ─── DERIVED GRAM SABHA FINANCIALS ───
  const spentBudget = useMemo(() => {
    return projectsApproved
      .filter(p => p.status === 'approved')
      .reduce((acc, curr) => acc + curr.cost, 0);
  }, [projectsApproved]);

  const remainingBudget = useMemo(() => {
    return Math.max(0, gramSabhaBudget - spentBudget);
  }, [gramSabhaBudget, spentBudget]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── SIMULATION HEADER ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-800/60">
                ICSE Class 6 History & Civics
              </span>
              <span className="text-xs text-slate-400">10 Coordinated Nodes</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Indicators */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map(p => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'discovery') setPhase('discovery');
                else if (p === 'explore') handleAdvanceToExploration();
                else if (p === 'sandbox') handleAdvanceToSandbox();
                else if (p === 'challenge') handleAdvanceToChallenge();
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-3xl border border-amber-700/40 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold tracking-wide">
              <span>🌟</span>
              <span>HISTORICAL INVESTIGATION SCENARIO</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm md:text-base mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-xs mt-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Curiosity Discovery Hook</span>
              <span className="text-xs text-slate-400">Non-graded exploration question</span>
            </div>
            <h3 className="text-lg font-bold text-white leading-snug">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-2xl text-sm font-medium transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/60 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-amber-300">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '🎉 Superb insight! Aryabhatta replaced superstitions with scientific shadow calculations.'
                    : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-2xl font-black text-sm shadow-lg flex items-center gap-2"
                >
                  <span>Step into the Interactive Labs</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Step Selector Tab Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentSlide(idx)}
                className={`flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-bold border transition-all ${
                  currentSlide === idx
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span>{idx + 1}. </span>
                <span>{step.title.split('(')[0]}</span>
              </motion.button>
            ))}
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Guided Interactive Lab #{currentSlide + 1}</span>
                <h3 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
              </div>
              <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                Node: {EXPLORATION_STEPS[currentSlide].nodeId}
              </span>
            </div>
            <p className="text-amber-300/90 text-sm bg-amber-950/30 p-3 rounded-2xl border border-amber-800/40">
              👉 <span className="font-semibold">{EXPLORATION_STEPS[currentSlide].instruction}</span>
            </p>

            {/* ── LAB 1: ARYABHATTA ECLIPSE SIMULATOR ── */}
            {currentSlide === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-5 rounded-3xl border border-slate-800 items-center">
                <div className="lg:col-span-7">
                  <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
                    <canvas ref={canvasRef} width={500} height={260} className="w-full block" />
                  </div>
                </div>
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                      <span className="font-semibold text-slate-200">Orbit Moon Angle</span>
                      <span className="text-amber-400 font-mono font-bold">{earthMoonAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={360}
                      step={1}
                      value={earthMoonAngle}
                      onChange={e => setEarthMoonAngle(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-slate-800 cursor-pointer h-2 rounded-lg"
                      aria-label="Moon Orbit Slider"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                      <span>0° (Solar)</span>
                      <span>90° (Quarter)</span>
                      <span>180° (Lunar)</span>
                      <span>270° (Quarter)</span>
                      <span>360°</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setEarthMoonAngle(0);
                        audioManager.play('pop');
                      }}
                      className="flex-1 py-2 bg-rose-950/60 border border-rose-700/60 text-rose-300 rounded-xl text-xs font-bold"
                    >
                      Solar Eclipse (0°)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setEarthMoonAngle(180);
                        audioManager.play('pop');
                      }}
                      className="flex-1 py-2 bg-purple-950/60 border border-purple-700/60 text-purple-300 rounded-xl text-xs font-bold"
                    >
                      Lunar Eclipse (180°)
                    </motion.button>
                  </div>

                  <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1">
                    <p className="text-amber-400 font-bold">✨ Aryabhatta’s Key Discoveries (499 CE):</p>
                    <p>• <strong>Axial Rotation:</strong> Earth spins daily on its axis.</p>
                    <p>• <strong>Scientific Eclipses:</strong> Shadows, not Rahu/Ketu.</p>
                    <p>• <strong>Pi Value:</strong> π ≈ 3.1416 (ratio 62832 / 20000).</p>
                  </div>
                </div>
              </div>
            )}

            {/* ── LAB 2: GUPTA CULTURAL MATRIX + SVG DIAGRAM 1 ── */}
            {currentSlide === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'aryabhatta', title: 'Aryabhatta', tag: 'Science & Astronomy', emoji: '🔭', year: '476-550 CE' },
                    { id: 'kalidasa', title: 'Kalidasa', tag: 'Sanskrit Drama & Poetry', emoji: '📜', year: 'c. 400 CE' },
                    { id: 'deogarh', title: 'Dashavatara Temple', tag: 'Deogarh Stone Art', emoji: '🛕', year: 'Early 6th C.' },
                    { id: 'nalanda', title: 'Nalanda University', tag: 'International Monastic', emoji: '🏛️', year: '5th-12th C.' },
                  ].map(item => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSelectedGuptaNode(item.id);
                        audioManager.play('tap');
                      }}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        selectedGuptaNode === item.id
                          ? 'bg-amber-500/20 border-amber-500 shadow-lg text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <h4 className="font-bold text-sm text-white mt-2">{item.title}</h4>
                      <p className="text-[11px] text-amber-400/90 font-medium">{item.tag}</p>
                      <p className="text-[10px] text-slate-500 mt-1">{item.year}</p>
                    </motion.button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Text Details */}
                  <div className="md:col-span-7">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedGuptaNode}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-5 bg-slate-950 rounded-3xl border border-slate-800 space-y-3 h-full"
                      >
                        {selectedGuptaNode === 'aryabhatta' && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
                              <span>🔭</span>
                              <span>Aryabhatta & Brahmagupta Comparative Matrix</span>
                            </div>
                            <p className="text-xs text-slate-300">
                              Aryabhatta (Aryabhatiya, 499 CE) used positional decimal numbers and calculated pi as 3.1416. Over a century later, <strong>Brahmagupta (628 CE)</strong> formally defined zero as a full number with addition/subtraction rules!
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                                <span className="font-bold text-gold-400">Aryabhatta (499 CE)</span>
                                <ul className="text-slate-400 mt-1 list-disc list-inside space-y-0.5">
                                  <li>Earth spins on axis</li>
                                  <li>Pi ≈ 3.1416</li>
                                  <li>Shadow theory of eclipses</li>
                                </ul>
                              </div>
                              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                                <span className="font-bold text-emerald-400">Brahmagupta (628 CE)</span>
                                <ul className="text-slate-400 mt-1 list-disc list-inside space-y-0.5">
                                  <li>Brahmasphutasiddhanta</li>
                                  <li>Rules: n - n = 0, n + 0 = n</li>
                                  <li>Zero as operational number</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedGuptaNode === 'kalidasa' && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
                              <span>📜</span>
                              <span>Kalidasa’s Three Literary Genres</span>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                                <span className="font-bold text-amber-400">1. Drama: </span>
                                <span className="text-white font-semibold">Abhijnanasakuntalam</span>
                                <p className="text-[11px] text-slate-400">King Dushyanta & Shakuntala; translated by William Jones (1789).</p>
                              </div>
                              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                                <span className="font-bold text-gold-400">2. Lyric Poetry: </span>
                                <span className="text-white font-semibold">Meghaduta (Cloud Messenger)</span>
                                <p className="text-[11px] text-slate-400">A banished Yaksha sends love messages through a monsoon cloud.</p>
                              </div>
                              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                                <span className="font-bold text-purple-400">3. Heroic Epic: </span>
                                <span className="text-white font-semibold">Raghuvamsha</span>
                                <p className="text-[11px] text-slate-400">Chronicles the legendary solar dynasty of righteous rulers.</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedGuptaNode === 'deogarh' && (
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
                              <span>🛕</span>
                              <span>Dashavatara Temple at Deogarh (UP)</span>
                            </div>
                            <p className="text-slate-300">
                              One of the earliest surviving stone temples in North India, built with a square sanctum (<strong>garbhagriha</strong>) on a raised plinth (<strong>jagati</strong>).
                            </p>
                            <p className="text-slate-400">
                              Features magnificent sculpted panels: <strong>Shesha-shayana Vishnu</strong> (reclining on the serpent of eternity) and <strong>Gajendra Moksha</strong>.
                            </p>
                          </div>
                        )}

                        {selectedGuptaNode === 'nalanda' && (
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
                              <span>🏛️</span>
                              <span>Nalanda International Monastic University</span>
                            </div>
                            <p className="text-slate-300">
                              Documented by Chinese pilgrim <strong>Xuanzang</strong> (7th Century CE). Over 10,000 residential scholars and 2,000 teachers from China, Tibet, Korea, and Central Asia studied Buddhist philosophy, logic, medicine, and mathematics.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* SVG DIAGRAM 1: Gupta Architecture & Classical Heritage */}
                  <div className="md:col-span-5 bg-slate-950 p-4 rounded-3xl border border-slate-800 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1">
                      SVG Diagram 1 • Classical Gupta Architecture
                    </span>
                    <svg viewBox="0 0 320 220" className="w-full max-w-[280px]">
                      <rect width="320" height="220" rx="12" fill="#0b1120" />
                      <polygon points="30,195 290,195 270,175 50,175" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
                      <text x="160" y="190" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">Raised Plinth (Jagati)</text>

                      <rect x="70" y="110" width="180" height="65" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                      
                      <rect x="135" y="130" width="50" height="45" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" rx="3" />
                      <path d="M 140 130 Q 160 115 180 130" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="160" y="155" textAnchor="middle" fill="#fcd34d" fontSize="8">Sanctum</text>

                      <rect x="85" y="125" width="35" height="35" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" rx="2" />
                      <circle cx="102" cy="142" r="8" fill="#38bdf8" opacity="0.3" />
                      <text x="102" y="145" textAnchor="middle" fill="#38bdf8" fontSize="7">Relief</text>

                      <rect x="200" y="125" width="35" height="35" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" rx="2" />
                      <circle cx="217" cy="142" r="8" fill="#38bdf8" opacity="0.3" />
                      <text x="217" y="145" textAnchor="middle" fill="#38bdf8" fontSize="7">Niche</text>

                      <polygon points="60,110 260,110 230,70 90,70" fill="#475569" stroke="#cbd5e1" strokeWidth="1.5" />
                      <polygon points="90,70 230,70 200,45 120,45" fill="#64748b" stroke="#f59e0b" strokeWidth="1.5" />
                      <polygon points="120,45 200,45 175,30 145,30" fill="#94a3b8" stroke="#f59e0b" strokeWidth="1" />
                      <circle cx="160" cy="24" r="5" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                      
                      <line x1="260" y1="90" x2="295" y2="70" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                      <text x="295" y="65" textAnchor="end" fill="#fbbf24" fontSize="8" fontWeight="bold">Proto-Shikhara</text>

                      <line x1="60" y1="140" x2="20" y2="135" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
                      <text x="20" y="130" textAnchor="start" fill="#38bdf8" fontSize="8" fontWeight="bold">Garbhagriha</text>
                    </svg>
                    <span className="text-[10px] text-slate-400 mt-1 text-center">Deogarh Dashavatara Temple Structural Layout</span>
                  </div>
                </div>
              </div>
            )}

            {/* ── LAB 3: 3-TIER PANCHAYATI RAJ ARCHITECTURE + SVG DIAGRAM 2 ── */}
            {currentSlide === 2 && (
              <div className="space-y-4">
                <div className="flex justify-center gap-2">
                  {[
                    { id: 'district', label: '1. Zila Parishad (Apex District)' },
                    { id: 'block', label: '2. Block Samiti (Middle Tehsil)' },
                    { id: 'village', label: '3. Gram Panchayat (Grassroots Village)' },
                  ].map(t => (
                    <motion.button
                      key={t.id}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setSelectedTierLevel(t.id as 'village' | 'block' | 'district');
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-2xl text-xs font-bold border transition-all ${
                        selectedTierLevel === t.id
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {t.label}
                    </motion.button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-950 p-5 rounded-3xl border border-slate-800">
                  <div className="md:col-span-7 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Tier Level: {selectedTierLevel.toUpperCase()}
                    </span>
                    <h4 className="text-base font-bold text-white">
                      {selectedTierLevel === 'village' && 'Gram Panchayat (Village Level)'}
                      {selectedTierLevel === 'block' && 'Block Samiti / Panchayat Samiti (Block Level)'}
                      {selectedTierLevel === 'district' && 'Zila Parishad (District Apex Level)'}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedTierLevel === 'village' &&
                        'Directly elected by all village voters. Handles local handpumps, drainage, streetlights, birth/death records, and mid-day meal monitoring.'}
                      {selectedTierLevel === 'block' &&
                        'Coordinates 40-70 Gram Panchayats. Manages Primary Health Centres (PHCs), middle schools, seed distribution, and agricultural extension.'}
                      {selectedTierLevel === 'district' &&
                        'Apex planning body for the whole district. Allocates funds to blocks, approves consolidated district plans, maintains major rural roads and district hospitals.'}
                    </p>

                    <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-gold-400">Dual Executive Architecture</span>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 bg-slate-950 rounded-xl border border-emerald-900/60">
                          <span className="text-[10px] text-emerald-400 font-bold uppercase">Elected Head</span>
                          <p className="font-bold text-white mt-0.5">
                            {selectedTierLevel === 'village' && 'Sarpanch (Pradhan)'}
                            {selectedTierLevel === 'block' && 'Block Pradhan (Chairman)'}
                            {selectedTierLevel === 'district' && 'Adhyaksha (President)'}
                          </p>
                          <span className="text-[9px] text-slate-400">Accountable to People</span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded-xl border border-gold-900/60">
                          <span className="text-[10px] text-gold-400 font-bold uppercase">Appointed Officer</span>
                          <p className="font-bold text-white mt-0.5">
                            {selectedTierLevel === 'village' && 'Panchayat Secretary'}
                            {selectedTierLevel === 'block' && 'BDO (Govt Officer)'}
                            {selectedTierLevel === 'district' && 'CEO (IAS Officer)'}
                          </p>
                          <span className="text-[9px] text-slate-400">Executes & Accounts</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SVG DIAGRAM 2: 3-Tier Panchayati Raj Architecture Pyramid */}
                  <div className="md:col-span-5 bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">
                      SVG Diagram 2 • Panchayati Raj Pyramid
                    </span>
                    <svg viewBox="0 0 300 220" className="w-full max-w-[270px]">
                      <polygon
                        points="150,15 220,75 80,75"
                        fill={selectedTierLevel === 'district' ? '#f59e0b' : '#1e293b'}
                        stroke="#f59e0b"
                        strokeWidth="2"
                        className="cursor-pointer"
                        onClick={() => setSelectedTierLevel('district')}
                      />
                      <text x="150" y="55" textAnchor="middle" fill={selectedTierLevel === 'district' ? '#0f172a' : '#fbbf24'} fontSize="9" fontWeight="black">
                        Zila Parishad (Apex)
                      </text>

                      <polygon
                        points="80,80 220,80 255,140 45,140"
                        fill={selectedTierLevel === 'block' ? '#38bdf8' : '#1e293b'}
                        stroke="#38bdf8"
                        strokeWidth="2"
                        className="cursor-pointer"
                        onClick={() => setSelectedTierLevel('block')}
                      />
                      <text x="150" y="112" textAnchor="middle" fill={selectedTierLevel === 'block' ? '#0f172a' : '#7dd3fc'} fontSize="9" fontWeight="black">
                        Block Samiti (Panchayat Samiti)
                      </text>

                      <polygon
                        points="45,145 255,145 290,205 10,205"
                        fill={selectedTierLevel === 'village' ? '#22c55e' : '#1e293b'}
                        stroke="#22c55e"
                        strokeWidth="2"
                        className="cursor-pointer"
                        onClick={() => setSelectedTierLevel('village')}
                      />
                      <text x="150" y="178" textAnchor="middle" fill={selectedTierLevel === 'village' ? '#0f172a' : '#86efac'} fontSize="9" fontWeight="black">
                        Gram Panchayat (Village Base)
                      </text>
                      <text x="150" y="195" textAnchor="middle" fill={selectedTierLevel === 'village' ? '#0f172a' : '#94a3b8'} fontSize="8">
                        Gram Sabha (All Voters 18+)
                      </text>
                    </svg>
                    <span className="text-[10px] text-slate-400 mt-1">Interlocking Pyramid of Democratic Decentralisation</span>
                  </div>
                </div>
              </div>
            )}

            {/* ── LAB 4: GRAM SABHA ACCOUNTABILITY LAB ── */}
            {currentSlide === 3 && (
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-slate-950 rounded-2xl border border-slate-800 gap-3">
                  <div>
                    <span className="text-xs text-slate-400 font-semibold">Gram Sabha Annual Development Fund</span>
                    <p className="text-xl font-mono font-bold text-amber-400">₹{remainingBudget.toLocaleString()} remaining / ₹{gramSabhaBudget.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Voters in Assembly: <strong>850 Adults (18+)</strong></span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {projectsApproved.map(proj => (
                    <div key={proj.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between gap-3">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-sm text-white">{proj.name}</h4>
                          <span className="text-xs font-mono font-bold text-amber-300">₹{proj.cost.toLocaleString()}</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full mt-2 inline-block ${
                            proj.status === 'approved'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : proj.status === 'rejected'
                              ? 'bg-rose-950 text-rose-400 border border-rose-800'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Status: {proj.status}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleProjectToggle(proj.id, 'approved')}
                          className="flex-1 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold"
                        >
                          Approve ✓
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleProjectToggle(proj.id, 'rejected')}
                          className="flex-1 py-1.5 bg-rose-800 hover:bg-rose-700 text-white rounded-xl text-xs font-bold"
                        >
                          Reject ✗
                        </motion.button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── LAB 5: METROPOLITAN URBAN NETWORK + SVG DIAGRAM 3 ── */}
            {currentSlide === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950 p-5 rounded-3xl border border-slate-800">
                <div className="md:col-span-6 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Article 243P (74th Amendment)</span>
                  <h4 className="text-base font-bold text-white">Metropolitan Municipal Corporations</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    A Metropolitan area is an urban agglomeration of <strong>1 Million (10 Lakh) or more</strong> residents. Explore the major hubs across India:
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'mumbai', name: 'Mumbai', coast: 'West (Arabian Sea)', pop: '12.4M+', tag: 'Financial Capital / BSE' },
                      { id: 'delhi', name: 'Delhi', coast: 'North (Inland)', pop: '16.7M+', tag: 'National Capital Territory' },
                      { id: 'chennai', name: 'Chennai', coast: 'East (Bay of Bengal)', pop: '7.1M+', tag: 'Port & Automobile Hub' },
                      { id: 'kolkata', name: 'Kolkata', coast: 'East (Hooghly River)', pop: '4.5M+', tag: 'Cultural & Historic Capital' },
                    ].map(city => (
                      <motion.button
                        key={city.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setSelectedMetroCity(city.id);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-2xl text-left border transition-all ${
                          selectedMetroCity === city.id
                            ? 'bg-amber-500/20 border-amber-500 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <h5 className="font-bold text-xs text-white">{city.name}</h5>
                        <p className="text-[10px] text-amber-400">{city.coast}</p>
                        <p className="text-[10px] text-slate-500">{city.tag}</p>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <p className="font-bold text-emerald-400">💡 Dynamic 2011 Census Additions:</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Bengaluru, Hyderabad, Ahmedabad, and Pune also crossed the 1M threshold and operate full Municipal Corporations!
                    </p>
                  </div>
                </div>

                {/* SVG DIAGRAM 3: Metropolitan India Map */}
                <div className="md:col-span-6 flex flex-col items-center justify-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-bold text-gold-400 uppercase tracking-widest mb-2">
                    SVG Diagram 3 • Metropolitan India Map
                  </span>
                  <svg viewBox="0 0 300 320" className="w-full max-w-[260px]">
                    <path
                      d="M 150 20 L 190 60 L 210 110 L 240 140 L 220 190 L 170 290 L 150 310 L 130 290 L 80 190 L 60 140 L 90 90 Z"
                      fill="#0f172a"
                      stroke="#334155"
                      strokeWidth="2"
                    />

                    {/* Delhi (North Inland) */}
                    <circle cx="140" cy="90" r={selectedMetroCity === 'delhi' ? 8 : 5} fill="#38bdf8" className="animate-pulse" />
                    <text x="140" y="78" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">Delhi</text>

                    {/* Mumbai (West Coast) */}
                    <circle cx="85" cy="180" r={selectedMetroCity === 'mumbai' ? 8 : 5} fill="#f59e0b" className="animate-pulse" />
                    <text x="50" y="184" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">Mumbai</text>

                    {/* Kolkata (East Inland/Hooghly) */}
                    <circle cx="215" cy="155" r={selectedMetroCity === 'kolkata' ? 8 : 5} fill="#ec4899" className="animate-pulse" />
                    <text x="245" y="159" textAnchor="middle" fill="#ec4899" fontSize="9" fontWeight="bold">Kolkata</text>

                    {/* Chennai (East/Coromandel Coast) */}
                    <circle cx="160" cy="245" r={selectedMetroCity === 'chennai' ? 8 : 5} fill="#22c55e" className="animate-pulse" />
                    <text x="195" y="249" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">Chennai</text>
                  </svg>
                  <span className="text-[10px] text-slate-400 mt-1">Demographic 1M+ Urban Corporations</span>
                </div>
              </div>
            )}
          </div>

          {/* Exploration Navigation */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-medium">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-2xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-black shadow-lg"
              >
                Open Free Sandbox 🚀
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Free Play Sandbox & Inquiries</span>
              <span className="text-xs text-slate-400">No grading • Experiment freely</span>
            </div>
            <h3 className="text-xl font-bold text-white">Democratic & Scientific Multi-Variable Sandbox</h3>
            <p className="text-sm text-slate-400">
              Manipulate reservation quotas, eclipse angles, and test both predictions and structured observations before taking the adaptive challenge test.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gram Panchayat Reservation Calculator */}
            <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase">Panchayat Seat Reservation Simulator</span>
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Total Panchayat Seats</span>
                  <span className="font-bold text-white">{panchayatSeats} Seats</span>
                </div>
                <input
                  type="range"
                  min={7}
                  max={21}
                  step={2}
                  value={panchayatSeats}
                  onChange={e => setPanchayatSeats(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-800 cursor-pointer h-2 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>SC / ST Village Population %</span>
                  <span className="font-bold text-white">{scPercentage}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={5}
                  value={scPercentage}
                  onChange={e => setScPercentage(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-800 cursor-pointer h-2 rounded-lg"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500">Women Reserved (1/3):</span>
                  <p className="font-bold text-emerald-400 text-sm">{Math.ceil(panchayatSeats / 3)} Seats</p>
                </div>
                <div>
                  <span className="text-slate-500">SC/ST Reserved (Proportional):</span>
                  <p className="font-bold text-gold-400 text-sm">{Math.round((panchayatSeats * scPercentage) / 100)} Seats</p>
                </div>
              </div>
            </div>

            {/* PREDICTIONS HOOK (2 PREDICTION QUESTIONS WITH verifyInstruction) */}
            <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gold-400 uppercase">Prediction Inquiry #{activePredictionIdx + 1}</span>
                <div className="flex gap-1">
                  {PREDICTION_QUESTIONS.map((_, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => {
                        setActivePredictionIdx(pIdx);
                        setPredictionMade(false);
                        setPredictionIndex(-1);
                      }}
                      className={`w-6 h-6 rounded-full text-xs font-bold ${
                        activePredictionIdx === pIdx ? 'bg-gold-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {pIdx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-200 font-semibold">{PREDICTION_QUESTIONS[activePredictionIdx].question}</p>

              {!predictionMade ? (
                <div className="space-y-2">
                  {PREDICTION_QUESTIONS[activePredictionIdx].options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePrediction(i)}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:border-slate-700"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-emerald-950/60 rounded-2xl border border-emerald-700/60 text-xs text-emerald-300 space-y-2">
                  <p className="font-bold">✓ Prediction Recorded!</p>
                  <p className="text-slate-300 text-[11px] bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                    🔍 <strong>Verification Instruction:</strong> {PREDICTION_QUESTIONS[activePredictionIdx].verifyInstruction}
                  </p>
                  <button
                    onClick={() => {
                      if (activePredictionIdx < PREDICTION_QUESTIONS.length - 1) {
                        setActivePredictionIdx(prev => prev + 1);
                        setPredictionMade(false);
                        setPredictionIndex(-1);
                      }
                    }}
                    className="text-[11px] text-amber-400 hover:underline font-bold"
                  >
                    {activePredictionIdx < PREDICTION_QUESTIONS.length - 1 ? 'Try Next Prediction →' : 'All predictions explored!'}
                  </button>
                </div>
              )}
            </div>

            {/* OBSERVATIONS HOOK (2 OBSERVATION QUESTIONS WITH observableOptions) */}
            <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 space-y-4 md:col-span-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase">Guided Empirical Observation #{activeObservationIdx + 1}</span>
                <div className="flex gap-1">
                  {OBSERVATION_QUESTIONS.map((_, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        setActiveObservationIdx(oIdx);
                        setObservationAnswered(false);
                        setObservationIndex(-1);
                      }}
                      className={`w-6 h-6 rounded-full text-xs font-bold ${
                        activeObservationIdx === oIdx ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {oIdx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-200 font-semibold">{OBSERVATION_QUESTIONS[activeObservationIdx].question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {OBSERVATION_QUESTIONS[activeObservationIdx].observableOptions.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleObservation(i)}
                    className={`p-3 text-left rounded-xl text-xs transition-all border ${
                      observationAnswered && i === OBSERVATION_QUESTIONS[activeObservationIdx].correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : observationAnswered && i === observationIndex && i !== OBSERVATION_QUESTIONS[activeObservationIdx].correctIndex
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>

              {observationAnswered && (
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-emerald-400 font-medium">
                    {observationIndex === OBSERVATION_QUESTIONS[activeObservationIdx].correctIndex
                      ? '✓ Spot on observation!'
                      : 'Review the architecture and simulator labs to observe the pattern.'}
                  </span>
                  {activeObservationIdx < OBSERVATION_QUESTIONS.length - 1 && (
                    <button
                      onClick={() => {
                        setActiveObservationIdx(prev => prev + 1);
                        setObservationAnswered(false);
                        setObservationIndex(-1);
                      }}
                      className="text-xs text-amber-400 hover:underline font-bold"
                    >
                      Next Observation Question →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 rounded-2xl font-black text-sm shadow-xl flex items-center gap-2"
            >
              <span>Ready for Adaptive Challenges!</span>
              <span>→</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: ADAPTIVE CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Challenge Top Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-slate-900 rounded-2xl border border-slate-800 gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400">
                Challenge <strong className="text-white text-sm">{currentChallenge + 1}</strong> of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
                    : difficulty === 'standard'
                    ? 'bg-amber-950/80 border-amber-600 text-amber-300'
                    : 'bg-rose-950/80 border-rose-600 text-rose-300'
                }`}
              >
                {difficulty} Tier
              </motion.span>
              <span className="text-[10px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800 font-mono">
                {challenge.competencyLevel.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-400">Score: <strong className="text-emerald-400 font-mono">{scoreBreakdown.correct}/{scoreBreakdown.total}</strong></span>
              <span className="text-slate-400">Mastery: <strong className="text-amber-400 capitalize">{masteryLevel}</strong></span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-3xl border transition-colors space-y-4 ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500 text-rose-200 shadow-2xl'
                : 'bg-slate-900 border-slate-800 text-slate-100'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="text-amber-400 font-bold">Node: {challenge.nodeId}</span>
              <span>Type: {challenge.type}</span>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed">{challenge.question}</h3>

            {/* MCQ & DISTINGUISH RENDERING */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-2xl text-sm font-medium transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-amber-400 border border-slate-700">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL RENDERING */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['loc_west', 'loc_south', 'loc_north', 'loc_east'].map(target => (
                    <div
                      key={target}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target)}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 min-h-[70px] flex flex-col justify-center"
                    >
                      <span className="text-[10px] uppercase font-bold text-slate-500">
                        Target Zone: {target.replace('loc_', '').toUpperCase()}
                      </span>
                      <p className="text-xs font-semibold text-amber-300 mt-1">
                        {droppedLabels[target] || 'Drag correct metro label here...'}
                      </p>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Labels →
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT RENDERING */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag or reorder steps into correct sequential order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-[11px]">
                        {displayIndex + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Check Sequence →
                </motion.button>
              </div>
            )}

            {/* NUMERIC RENDERING */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated number"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48"
                  />
                  <span className="text-xs text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT RENDERING */}
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
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl text-xs font-semibold border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, i) => (
                    <span key={i} className="px-2.5 py-1 bg-amber-950/80 border border-amber-600 text-amber-200 text-xs rounded-lg flex items-center gap-1">
                      {p}
                      <button onClick={() => setConstructParts(parts => parts.filter((_, idx) => idx !== i))} className="text-rose-400 text-xs font-bold ml-1">×</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click elements above to assemble pathway...</span>}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                  >
                    Check Assembly
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setConstructParts([])}
                    className="px-4 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
                  >
                    Clear
                  </motion.button>
                </div>
              </div>
            )}

            {/* EXPLANATION CARD */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-slate-950 rounded-2xl border border-amber-700/60 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <span>📖</span>
                  <span>Step-by-Step Historical & Civic Reasoning</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-slate-300 leading-relaxed">
                      <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 rounded-xl text-xs font-bold"
                  >
                    Show Next Insight →
                  </motion.button>
                )}

                {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Mastery Session →' : 'Next Challenge →'}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: MASTERY COMPLETION & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 rounded-3xl border border-emerald-500/60 shadow-2xl text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Curriculum Mastery Achieved!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have thoroughly explored Classical Gupta Innovations (Aryabhatta, Decimal System, Zero, Kalidasa, Nalanda) and modern Democratic Governance (Panchayati Raj 3-Tiers, Gram Sabha, Nyaya Panchayat, and Metropolitan Corporations).
            </p>

            <div className="flex justify-center gap-6 pt-3 font-mono">
              <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-sans">Final Score</span>
                <span className="text-xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-sans">BKT Mastery Level</span>
                <span className="text-xl font-bold text-amber-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800">
            <p className="text-sm font-bold text-emerald-300">
              {errors === 0
                ? '🌟 PERFECT SCORE! Outstanding historical accuracy and civics mastery!'
                : errors <= 3
                ? '👏 Excellent work! Your grasp of classical science and democratic decentralisation is robust.'
                : '💪 Good effort! Review your misconception profile below to solidify your understanding.'}
            </p>
          </div>

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-amber-500/40 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
              <span>💭</span>
              <span>Post-Simulation Reflection</span>
            </div>
            <p className="text-xs text-slate-400">
              Take a moment to solidify your understanding by answering these three reflection questions:
            </p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflectionResponses.surprising}
                  onChange={e => setReflectionResponses(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g. How Aryabhatta calculated Pi to 4 decimal places in 499 CE or how Gram Sabha includes every 18+ voter..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-200 focus:border-amber-500 outline-none resize-none h-20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflectionResponses.explain}
                  onChange={e => setReflectionResponses(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g. Ancient Indian scientists solved eclipses using geometry and shadows, while modern Panchayati Raj divides governance into village, block, and district levels..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-200 focus:border-amber-500 outline-none resize-none h-20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflectionResponses.realLife}
                  onChange={e => setReflectionResponses(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g. Participating in local resident meetings, understanding city corporation budgets, or calculating geometric circles in math class..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-200 focus:border-amber-500 outline-none resize-none h-20"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500">
                  {reflectionSaved ? '✓ Reflection saved to your learning log!' : 'Reflections help strengthen memory retrieval pathways.'}
                </span>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setReflectionSaved(true);
                    audioManager.play('success');
                    speechManager.speak('Reflection saved. Great metacognitive thinking!');
                  }}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow"
                >
                  Save Reflection
                </motion.button>
              </div>
            </div>
          </div>

          {/* Misconception Diagnostics */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-3xl border border-rose-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-xs uppercase tracking-wider">
                <span>⚠️</span>
                <span>Personalised Conceptual Corrections</span>
              </div>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const item = misconceptions?.[mIdx];
                  if (!item) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-bold">❌ Misconception: {item.misconception}</p>
                      <p className="text-emerald-400 font-semibold">✓ ICSE Clarification: {item.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── SPACED REPETITION VISIBILITY (CLEAR INTERVAL FOR 0, 1-3, 4+ ERRORS) ─── */}
          <div className="p-5 bg-slate-900 rounded-3xl border border-amber-500/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm">📅</span>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  SM-2 Spaced Repetition Schedule (Visible SRS)
                </span>
              </div>
              <p className="text-sm font-semibold text-white">
                {errors === 0
                  ? 'Recommended SRS Review: Review in 7 days (0 errors — Mastery retained!)'
                  : errors <= 3
                  ? 'Recommended SRS Review: Review in 3 days (1-3 errors — Solid foundation)'
                  : 'Recommended SRS Review: Review in 1 day (4+ errors — Active reinforcement needed)'}
              </p>
              <p className="text-xs text-slate-400">
                Spaced repetition automatically schedules targeted flashcard retrieval to prevent memory decay before your board exams.
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className={`px-4 py-2 text-xs font-mono font-black rounded-xl border flex items-center gap-1.5 shadow ${
                errors === 0
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                  : errors <= 3
                  ? 'bg-amber-950 border-amber-500 text-amber-300'
                  : 'bg-rose-950 border-rose-500 text-rose-300'
              }`}>
                <span>⏰</span>
                <span>{errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}</span>
              </span>
            </div>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <span>🚀</span>
              <span>{REAL_WORLD_ACTIVITY.title}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-[10px] flex-shrink-0">
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
      {showSuccess && <SuccessBanner message="Module Mastery Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_HistoryCivicsScientificProgressGuptaSim;
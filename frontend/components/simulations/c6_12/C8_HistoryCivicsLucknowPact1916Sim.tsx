'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// ─── NODE IDS ���──
const NODE_C8_HISTCIV_051 = 'c8_histciv_051';
const NODE_C8_HISTCIV_052 = 'c8_histciv_052';
const NODE_C8_HISTCIV_053 = 'c8_histciv_053';
const NODE_C8_HISTCIV_054 = 'c8_histciv_054';
const NODE_C8_HISTCIV_055 = 'c8_histciv_055';
const NODE_C8_HISTCIV_056 = 'c8_histciv_056';
const NODE_C8_HISTCIV_057 = 'c8_histciv_057';
const NODE_C8_HISTCIV_058 = 'c8_histciv_058';
const NODE_C8_HISTCIV_059 = 'c8_histciv_059';
const NODE_C8_HISTCIV_060 = 'c8_histciv_060';

const ALL_NODE_IDS = [
  NODE_C8_HISTCIV_051,
  NODE_C8_HISTCIV_052,
  NODE_C8_HISTCIV_053,
  NODE_C8_HISTCIV_054,
  NODE_C8_HISTCIV_055,
  NODE_C8_HISTCIV_056,
  NODE_C8_HISTCIV_057,
  NODE_C8_HISTCIV_058,
  NODE_C8_HISTCIV_059,
  NODE_C8_HISTCIV_060,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Architects of the Republic: From Lucknow to Lok Sabha',
  intro: 'You are a historical archivist and constitutional counselor in August 1947. India stands at the dawn of freedom after three decades of intense mass struggle, delicate communal pacts, and the drafting of a sovereign parliamentary democracy.',
  context: 'Your task is to analyze how the Indian National Movement evolved from the Lucknow Pact of 1916 through Gandhian Satyagraha, Non-Cooperation, Civil Disobedience, and Quit India, and how the Founding Fathers forged the Parliament (Lok Sabha, Rajya Sabha) and the Constitutional Presidency.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In December 1916 at Lucknow, the Indian National Congress and the Muslim League reached a historic unity pact. What was the core political trade-off agreed upon?',
  options: [
    'Religious merger: Congress adopted Islamic personal laws while the League accepted Sanskrit education.',
    'Constitutional trade-off: INC accepted separate electorates & 1/3 representation; Muslim League backed the demand for Self-Government (Dominion Status).',
    'Military alliance: Both formed an armed militia to drive out the British army immediately during WWI.',
    'Territorial division: India was agreed to be partitioned into two autonomous dominions right in 1916.',
  ],
  correctIndex: 1,
  hintAfter: "Don't worry if this feels intricate — let us explore how this crucial pact shaped Indian constitutional history!",
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (1 - 7) ---
  {
    id: 'ch_01',
    nodeId: NODE_C8_HISTCIV_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who were the two primary leaders who negotiated the historic Lucknow Pact in December 1916?',
    options: [
      'Mahatma Gandhi and Subhas Chandra Bose',
      'Bal Gangadhar Tilak (INC) and Muhammad Ali Jinnah (Muslim League)',
      'Jawaharlal Nehru and Lord Mountbatten',
      'Gopal Krishna Gokhale and Sir Syed Ahmad Khan',
    ],
    correctIndex: 1,
    explanation: 'The Lucknow Pact of December 1916 was negotiated chiefly by Bal Gangadhar Tilak for the Indian National Congress and Muhammad Ali Jinnah, who was then a member of both Congress and League and widely celebrated as an ambassador of Hindu-Muslim unity.',
    hints: [
      'Think about the Assertive nationalist released from Mandalay in 1914.',
      'The Muslim League negotiator was also a member of Congress at that time.',
      'The leaders were Lokmanya Tilak and M.A. Jinnah.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C8_HISTCIV_052,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Map each of Gandhi\'s early local Satyagraha campaigns (1917–1918) to its specific grievance.',
    dragItems: [
      { label: 'Champaran (1917)', targetId: 'tinkathia' },
      { label: 'Kheda (1918)', targetId: 'revenue_remission' },
      { label: 'Ahmedabad (1918)', targetId: 'plague_bonus' },
    ],
    correctMapping: {
      tinkathia: 'Champaran (1917)',
      revenue_remission: 'Kheda (1918)',
      plague_bonus: 'Ahmedabad (1918)',
    },
    explanation: 'Champaran dealt with indigo farmers forced under the tinkathia system (3/20th land); Kheda dealt with peasant revenue remission during famine; Ahmedabad involved textile mill workers protesting the withdrawal of the plague bonus.',
    hints: [
      'Champaran is in Bihar and dealt with British indigo planters.',
      'Kheda in Gujarat was a crop failure and famine revenue refusal.',
      'Ahmedabad was an urban industrial strike over wage cuts.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C8_HISTCIV_053,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What tragic incident on 4 February 1922 prompted Mahatma Gandhi to immediately suspend the Non-Cooperation Movement?',
    options: [
      'The Jallianwala Bagh massacre in Amritsar',
      'The lathi charge on Lala Lajpat Rai in Lahore',
      'The Chauri-Chaura incident in Gorakhpur where 22 policemen were killed in a burned police station',
      'The arrest of Subhas Chandra Bose in Calcutta',
    ],
    correctIndex: 2,
    explanation: 'Gandhi called off the Non-Cooperation Movement on 12 February 1922 following the Chauri-Chaura incident on 4 February 1922 in Gorakhpur district, UP, because the killing of 22 policemen violated his fundamental principle of Ahimsa (non-violence).',
    hints: [
      'It occurred in Gorakhpur district, Uttar Pradesh.',
      'A mob set fire to a police station after being provoked.',
      '22 policemen perished, violating Gandhi\'s strict code of non-violence.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04',
    nodeId: NODE_C8_HISTCIV_057,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the minimum qualifying age (in years) required under Article 84 to contest an election for the Lok Sabha?',
    correctAnswer: 25,
    tolerance: 0,
    unit: 'years',
    explanation: 'Under Article 84 of the Indian Constitution, a citizen must be at least 25 years old to contest a seat in the Lok Sabha. (The voting age for citizens is 18).',
    hints: [
      'It is higher than the voting age (18).',
      'It is 5 years lower than the qualifying age for Rajya Sabha (30).',
      'The exact number is 25.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C8_HISTCIV_058,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who serves as the ex-officio Chairman of the Rajya Sabha under Article 89 of the Constitution of India?',
    options: [
      'The Chief Justice of India',
      'The Prime Minister of India',
      'The Vice-President of India',
      'The Speaker of the Lok Sabha',
    ],
    correctIndex: 2,
    explanation: 'Under Article 89, the Vice-President of India is the ex-officio Chairman of the Rajya Sabha and presides over its sessions.',
    hints: [
      'This person is the second-highest constitutional dignitary in the Republic.',
      'They preside over the Upper House but are not elected as a member of either house.',
      'It is the Vice-President of India.',
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C8_HISTCIV_054,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why did Mahatma Gandhi choose the Salt Tax as the central issue for the 1930 Civil Disobedience Movement?',
    options: [
      'Salt was only consumed by the wealthy British aristocracy in India.',
      'Salt was a universal daily necessity for every Indian, rich and poor, making the tax an intimate symbol of colonial exploitation.',
      'Salt was produced exclusively in London and shipped to India.',
      'The Indian National Congress owned large salt factories in Gujarat.',
    ],
    correctIndex: 1,
    explanation: 'Salt was an indispensable daily item consumed by every Indian irrespective of religion, caste, or wealth. Taxing salt directly burdened the poorest peasant and symbolized the inhumanity of colonial monopoly.',
    hints: [
      'Think about who eats salt in daily life.',
      'Gandhi sought a symbol that resonated with 100% of the population.',
      'Salt connected rich and poor peasants directly to national independence.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C8_HISTCIV_060,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the minimum age (in years) required under Article 58 to become the President of India?',
    correctAnswer: 35,
    tolerance: 0,
    unit: 'years',
    explanation: 'Article 58 prescribes that a candidate for the President of India must be an Indian citizen, at least 35 years of age, eligible for election to the Lok Sabha, and hold no office of profit.',
    hints: [
      'It is higher than the Lok Sabha age (25) and Rajya Sabha age (30).',
      'It reflects the requirement of senior maturity for the Head of State.',
      'The minimum age is 35.',
    ],
  },

  // --- STANDARD (8 - 15) ---
  {
    id: 'ch_08',
    nodeId: NODE_C8_HISTCIV_051,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How did the Lucknow Pact (1916) alter the internal composition of the Indian National Congress itself?',
    options: [
      'It dissolved the Congress and created a new unified British Dominion council.',
      'It reunited the Moderate and Assertive (Extremist) factions that had split at the Surat Session in 1907.',
      'It expelled all Moderate members who refused to wear khadi.',
      'It transferred leadership of Congress exclusively to the Home Rule League.',
    ],
    correctIndex: 1,
    explanation: 'The Lucknow Session of December 1916 is doubly famous: it bridged the INC and Muslim League (Lucknow Pact), and it reunited the Moderates and Assertives who had bitterly parted ways at Surat in 1907.',
    hints: [
      'Remember the Surat Split of 1907.',
      'Tilak had been released from prison in 1914 and sought reconciliation.',
      'The Moderates and Assertives merged back into a single Congress party.',
    ],
  },
  {
    id: 'ch_09',
    nodeId: NODE_C8_HISTCIV_053,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of events leading to the Non-Cooperation Movement in chronological order.',
    sortItems: [
      'Passage of the Rowlatt Act ("Black Law") allowing detention without trial (March 1919)',
      'Nationwide Hartal called by Gandhi (6 April 1919)',
      'Jallianwala Bagh Massacre in Amritsar under General Dyer (13 April 1919)',
      'Non-Cooperation Movement launched at Calcutta & ratified at Nagpur (Sep/Dec 1920)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First came the Rowlatt Act in March 1919, followed by the Hartal on 6 April 1919. A week later, on Baisakhi (13 April 1919), the Jallianwala Bagh massacre occurred. Outrage converged with the Khilafat cause to launch Non-Cooperation in late 1920.',
    hints: [
      'The law was passed first, triggering protests.',
      'The Amritsar massacre happened on Baisakhi day (13 April).',
      'The formal Congress movement was adopted in late 1920.',
    ],
  },
  {
    id: 'ch_10',
    nodeId: NODE_C8_HISTCIV_054,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What was the fundamental distinction in methodology between Non-Cooperation (1920) and Civil Disobedience (1930)?',
    options: [
      'Non-Cooperation was violent armed rebellion, whereas Civil Disobedience was purely theoretical.',
      'Non-Cooperation was passive withdrawal of cooperation/boycotts, whereas Civil Disobedience was active, deliberate non-violent breaking of unjust laws.',
      'Civil Disobedience applied only to students, while Non-Cooperation applied to the Indian army.',
      'Non-Cooperation sought Dominion Status, while Civil Disobedience asked for British tax cuts only.',
    ],
    correctIndex: 1,
    explanation: 'Non-Cooperation (1920-22) focused on boycotting British schools, law courts, titles, and goods (withdrawing consent). Civil Disobedience (1930) actively and deliberately violated discriminatory laws (like the Salt Laws and Forest Laws).',
    hints: [
      'Think about whether making salt was passive refusal or active defiance.',
      'One is withdrawing support; the other is breaking specific unjust colonial acts.',
      'Civil Disobedience involves deliberate law-breaking.',
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C8_HISTCIV_055,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why did the Quit India Movement (August 1942) become an immediate, leaderless mass uprising across India?',
    options: [
      'Congress leaders voluntarily resigned and retired to the Himalayas.',
      'Gandhi and virtually all senior Congress Working Committee leaders were arrested in the early dawn of 9 August 1942 under Operation Zero Hour.',
      'The British army immediately handed over administration to local panchayats.',
      'Subhas Chandra Bose ordered all Congress leaders to join the INA in Tokyo.',
    ],
    correctIndex: 1,
    explanation: 'Following the "Do or Die" call on 8 August 1942 at Gowalia Tank Maidan, the colonial government arrested Gandhi, Nehru, Patel, and Azad early on 9 August. Lacking central guidance, ordinary people, students, and workers spontaneously led the uprising.',
    hints: [
      'What happened within hours of Gandhi\'s "Do or Die" speech?',
      'British police launched sudden pre-dawn arrests of the entire High Command.',
      'The movement became spontaneous because all top leaders were in prison.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C8_HISTCIV_056,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Under the Indian Independence Act of 18 July 1947, what was the initial constitutional status of India and Pakistan on 15 August 1947?',
    options: [
      'Sovereign Democratic Republics with complete severance from the British Commonwealth',
      'Two Independent Dominions under the British Crown until their respective Constitutions were enacted',
      'Autonomous provinces governed directly by the Viceroy Lord Mountbatten',
      'Protectorates of the United Nations Security Council',
    ],
    correctIndex: 1,
    explanation: 'The Indian Independence Act 1947 created two independent Dominions (India and Pakistan) effective 15 August 1947. India remained a Dominion until 26 January 1950, when the Constitution of India took effect, establishing the Republic.',
    hints: [
      'Did India become a Republic in August 1947 or on 26 January 1950?',
      'The Act granted "Dominion Status" with right to frame their own Constitutions.',
      'India was a Dominion until the Republic was inaugurated in 1950.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_13',
    nodeId: NODE_C8_HISTCIV_057,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Following the 104th Constitutional Amendment Act (2019) which removed the 2 Anglo-Indian nominated seats, what is the current maximum constitutional strength of the Lok Sabha?',
    correctAnswer: 550,
    tolerance: 0,
    unit: 'seats',
    explanation: 'Under Article 81, the original maximum was 552 (530 from States, 20 from UTs, and 2 nominated Anglo-Indians). The 104th Amendment abolished the Anglo-Indian nomination in 2019, making the effective maximum 550 (530 + 20). Currently, 543 are elected.',
    hints: [
      'Original maximum was 552.',
      'Subtract the 2 abolished nominated seats.',
      '552 minus 2 equals 550.',
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C8_HISTCIV_058,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is the Rajya Sabha termed a "Permanent House" in contrast to the Lok Sabha?',
    options: [
      'Its members are appointed for life until age 80.',
      'It cannot be dissolved; one-third of its members retire every two years, and each member serves a 6-year term.',
      'It meets 365 days a year without adjournments.',
      'It cannot amend or debate laws passed by state assemblies.',
    ],
    correctIndex: 1,
    explanation: 'Under Article 83(1), the Rajya Sabha is not subject to dissolution. It maintains unbroken institutional continuity because one-third of its members retire every second year via biennial elections, with each member enjoying a 6-year tenure.',
    hints: [
      'Can the President dissolve the Rajya Sabha? No.',
      'Look at the staggered retirement of one-third of members.',
      'Each member serves 6 years, ensuring continuous functioning.',
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C8_HISTCIV_059,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'What happens if the Lok Sabha passes a Motion of No-Confidence against the Prime Minister and Council of Ministers?',
    options: [
      'The Prime Minister can appeal to the Supreme Court to nullify the vote.',
      'The Council of Ministers must immediately resign because executive authority is collectively responsible to the Lok Sabha under Article 75(3).',
      'The Rajya Sabha can veto the decision by a simple majority vote.',
      'The President takes over all ministries as dictator for 5 years.',
    ],
    correctIndex: 1,
    explanation: 'Under Article 75(3), the Council of Ministers is collectively responsible to the Lok Sabha. If a No-Confidence Motion passes by a majority, the entire government collapses and must tender its resignation immediately.',
    hints: [
      'Remember the principle of Collective Responsibility.',
      'The executive depends on majority support in the Lower House.',
      'The government must resign immediately.',
    ],
  },

  // --- ADVANCED (16 - 22) ---
  {
    id: 'ch_16',
    nodeId: NODE_C8_HISTCIV_051,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Construct the historical analysis regarding the dual legacy of the Lucknow Pact (1916).',
    availableParts: [
      'High-water mark of Congress-League unity',
      'Legitimised separate communal electorates',
      'Paved the long-term path to Partition',
      'Restored Moderate-Assertive harmony',
    ],
    targetState: 'High-water mark of Congress-League unity Legitimised separate communal electorates Paved the long-term path to Partition Restored Moderate-Assertive harmony',
    validationHint: 'Select all four key analytical facets in logical sequence.',
    explanation: 'While the Lucknow Pact achieved unprecedented Hindu-Muslim political unity and restored internal Congress harmony, historians like Bipan Chandra note that by endorsing separate electorates and seat weighting, it officially institutionalized communal politics that later contributed to the two-nation theory and Partition.',
    hints: [
      'Click all four key analytical conclusions.',
      'It brought immense immediate unity but carried a long-term constitutional cost.',
      'Assemble all valid historical conclusions.',
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C8_HISTCIV_055,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Differentiate between the Forward Bloc (1939) and the Indian National Army (INA) under Subhas Chandra Bose.',
    options: [
      'Forward Bloc was an underground naval fleet; INA was a student poetry club in Calcutta.',
      'Forward Bloc was a radical political party founded inside India within Congress (June 1939); the INA was an armed liberation military force first formed by Mohan Singh (1942) and reorganised by Bose in Singapore (1943).',
      'Forward Bloc advocated Dominion Status with Britain; INA advocated staying in the British Empire.',
      'Forward Bloc was formed in Tokyo in 1945; INA was founded by Mahatma Gandhi at Dandi.',
    ],
    correctIndex: 1,
    explanation: 'The Forward Bloc was founded by Netaji in June 1939 inside India after the Tripuri Congress session as a political faction. The INA (Azad Hind Fauj) was a military force initiated by Captain Mohan Singh in 1942 from Indian POWs and revitalized by Bose in Singapore in July 1943 to liberate India through armed struggle.',
    hints: [
      'One was a domestic political organization founded in 1939.',
      'The other was a military army operating in Southeast Asia from 1942–44.',
      'Bose founded the Forward Bloc in India and later led the INA abroad.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C8_HISTCIV_056,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'What was the fatal constitutional dispute that caused the failure of the Cabinet Mission Plan of 1946?',
    options: [
      'Refusal of the British to allow an Indian Prime Minister.',
      'The clash over the Provincial Grouping scheme: Muslim League insisted grouping was compulsory for Sections B & C, whereas Congress insisted it was optional for provinces like Assam and NWFP.',
      'A disagreement over whether the capital should be Bombay or Calcutta.',
      'The Indian Army refused to accept orders from Indian ministers.',
    ],
    correctIndex: 1,
    explanation: 'The Cabinet Mission (May 1946) proposed a 3-tier federation with Sections A, B, and C. The Muslim League saw compulsory grouping as a stepping stone to Pakistan, while Congress argued provinces must freely choose their group. This deadlock led to Direct Action Day (16 August 1946) and made Partition inevitable.',
    hints: [
      'Think about Sections A, B, and C of the provinces.',
      'Was grouping mandatory or voluntary?',
      'The League demanded compulsory grouping; Congress insisted on provincial autonomy.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C8_HISTCIV_059,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What is the constitutional procedure for a Money Bill under Article 109 and Article 110 of the Indian Constitution?',
    options: [
      'Money Bills can only originate in the Rajya Sabha and must be approved by the President before Lok Sabha debate.',
      'Money Bills originate only in the Lok Sabha on the President’s recommendation; the Rajya Sabha has only 14 days to suggest changes, which the Lok Sabha can accept or reject.',
      'Both houses have exactly identical powers, and a Money Bill dies if the Rajya Sabha votes against it.',
      'Money Bills are directly enacted by the Finance Minister without parliamentary vote.',
    ],
    correctIndex: 1,
    explanation: 'Under Article 109, Money Bills (defined in Article 110) can only be introduced in the Lok Sabha. The Rajya Sabha cannot reject or amend them; it can only return the bill with suggestions within 14 days. If not returned in 14 days, it is deemed passed.',
    hints: [
      'Which house represents the taxpayers directly? Lok Sabha.',
      'How many days does the Upper House get to review a Money Bill? 14 days.',
      'Rajya Sabha only has advisory power on Money Bills.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C8_HISTCIV_060,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How is the President of India elected under Articles 54 and 55, and why is this indirect system chosen over direct universal election?',
    options: [
      'Elected directly by all Indian voters aged 18+ to give the President supreme power over the Prime Minister.',
      'Elected indirectly by an Electoral College (elected MPs of Lok Sabha & Rajya Sabha + elected state MLAs) via Proportional Representation with Single Transferable Vote, preventing dual rival centres of popular executive power.',
      'Appointed directly by the Chief Justice of India and outgoing Governors.',
      'Nominated by the United Nations General Assembly every 5 years.',
    ],
    correctIndex: 1,
    explanation: 'The President is chosen by an Electoral College of 776 elected MPs (543 LS + 233 RS) and state MLAs via Single Transferable Vote. Indirect election prevents the constitutional Head of State from clashing with the popularly elected Prime Minister in a parliamentary system.',
    hints: [
      'Who forms the Electoral College? Elected MPs and MLAs.',
      'What voting method is used? Proportional Representation with STV.',
      'It preserves harmony with the Prime Minister\'s democratic executive mandate.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C8_HISTCIV_059,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In the landmark case Kesavananda Bharati v. State of Kerala (1973), what crucial constitutional doctrine checking Parliament’s power under Article 368 was established?',
    options: [
      'Parliament has unlimited absolute power to abolish the Republic and Fundamental Rights.',
      'The "Basic Structure Doctrine": Parliament can amend the Constitution under Article 368 but cannot alter or destroy its essential foundation (e.g., Democracy, Secularism, Judicial Review, Rule of Law).',
      'The President alone can veto constitutional amendments without cabinet advice.',
      'State legislative assemblies can override constitutional amendments by a simple petition.',
    ],
    correctIndex: 1,
    explanation: 'A 13-judge bench of the Supreme Court ruled by a 7-6 majority in 1973 that while Parliament’s amending power under Article 368 is broad, it cannot violate or dismantle the "Basic Structure" of the Constitution.',
    hints: [
      'It is named the Basic Structure Doctrine.',
      'It prevents Parliament from converting India into a dictatorship or removing core freedoms.',
      'Judicial review ensures essential constitutional pillars remain untouchable.',
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C8_HISTCIV_060,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'What is the constitutional scope of the President’s Ordinance-making power under Article 123 of the Constitution?',
    options: [
      'The President can issue permanent laws at any time, overriding Supreme Court judgments.',
      'The President can promulgate temporary ordinances only when both Houses of Parliament are in recess; these must be laid before Parliament within 6 weeks of reassembly or they lapse.',
      'Ordinances can only be issued during wartime with military generals\' approval.',
      'Ordinances remain valid for 10 years without parliamentary review.',
    ],
    correctIndex: 1,
    explanation: 'Under Article 123, when Parliament is not in session and immediate action is required, the President may promulgate an Ordinance on cabinet advice. It has the force of an Act but must be approved by Parliament within 6 weeks of reassembly, or it ceases to operate.',
    hints: [
      'Can ordinances be issued when Parliament is actively in session? No.',
      'How long do they last once Parliament reconvenes? 6 weeks.',
      'They are emergency, temporary legislative measures.',
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

// ─── DEFAULT ENRICHED PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C8_HISTCIV_051,
  title: 'Lucknow Pact (1916) to the Republic of India: Freedom Struggle & Parliament',
  definition: 'The historical progression of the Indian National Movement from the Lucknow Pact of 1916, Gandhian Satyagraha, Non-Cooperation, Civil Disobedience, and Quit India to Independence and Partition (1947), culminating in the sovereign parliamentary institutions of Lok Sabha, Rajya Sabha, and the Constitutional Presidency.',
  eli5: 'Think of India\'s journey to freedom like building a grand democratic house. First, diverse leaders made historic unity pacts (Lucknow 1916). Gandhi then trained everyone in peaceful resistance (Champaran, Salt March, Quit India). When the British finally left in 1947, the people designed a Parliament (Lok Sabha representing the citizens, Rajya Sabha representing the states) led by a respected constitutional Head of State (the President).',
  misconceptions: [
    {
      misconception: 'Champaran and Kheda were the same peasant protest against indigo planters.',
      correction: 'Champaran (1917, Bihar) dealt with indigo peasants under the tinkathia system. Kheda (1918, Gujarat) was a revenue-refusal movement during famine and crop failure.',
    },
    {
      misconception: 'The Lucknow Pact of 1916 was a religious merger of Hindu and Muslim faiths.',
      correction: 'The Lucknow Pact was a political pact between INC and Muslim League agreeing on joint constitutional demands (Dominion Status) in exchange for separate electorates.',
    },
    {
      misconception: 'The Non-Cooperation Movement ended because the British crushed it militarily in 1922.',
      correction: 'Gandhi voluntarily called off the movement on 12 February 1922 following violence at Chauri-Chaura (4 Feb 1922) to uphold non-violence (Ahimsa).',
    },
    {
      misconception: 'Any adult citizen who can vote at 18 can run for Lok Sabha or Rajya Sabha.',
      correction: 'While the voting age is 18, Article 84 requires candidates to be at least 25 years old for Lok Sabha and 30 years old for Rajya Sabha.',
    },
    {
      misconception: 'India became a Republic on 15 August 1947.',
      correction: 'India became an independent Dominion on 15 August 1947, and became a sovereign Democratic Republic on 26 January 1950 with the adoption of the Constitution.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What year was the Lucknow Pact signed?', options: ['1907', '1916', '1920', '1942'], correctIndex: 1 },
    { question: 'Which peasant leader invited Gandhi to Champaran in 1917?', options: ['Rajkumar Shukla', 'Vallabhbhai Patel', 'Jawaharlal Nehru', 'Motilal Nehru'], correctIndex: 0 },
    { question: 'What is the normal term of the Lok Sabha?', options: ['6 years', '5 years', 'Permanent', '4 years'], correctIndex: 1 },
    { question: 'How many members are nominated to the Rajya Sabha by the President?', options: ['2', '10', '12', '20'], correctIndex: 2 },
    { question: 'Which article defines the Money Bill in the Indian Constitution?', options: ['Article 75', 'Article 110', 'Article 123', 'Article 368'], correctIndex: 1 },
    { question: 'What slogan did Gandhi give at Gowalia Tank in August 1942?', options: ['Jai Hind', 'Do or Die', 'Inquilab Zindabad', 'Swaraj is my birthright'], correctIndex: 1 },
    { question: 'Who heads the Union Council of Ministers?', options: ['The President', 'The Speaker', 'The Prime Minister', 'The Chief Justice'], correctIndex: 2 },
    { question: 'Which constitutional body can impeach the President of India under Article 61?', options: ['Supreme Court', 'Union Parliament', 'Election Commission', 'State Governors'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates comprehensive mastery of the Indian Freedom Struggle (1916–1947), constitutional evolution, structure and powers of the Lok Sabha, Rajya Sabha, Union Parliament, and the Office of the President.',
};

// ─── EXPLORATION STEPS (BRILLIANT LEARN-BY-DOING) ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Lucknow Accord (1916): Dual Bridge',
    instruction: 'Toggle the political factions below to see how Tilak & Jinnah unified the INC factions and Muslim League into a single constitutional front.',
    interactionType: 'toggle-bridge',
    nodeId: NODE_C8_HISTCIV_051,
  },
  {
    title: '2. The Gandhian Satyagraha Matrix (1917–1947)',
    instruction: 'Drag the Timeline Slider to observe real-time visual progress along the historical freedom trail.',
    interactionType: 'slider-evolution',
    nodeId: NODE_C8_HISTCIV_053,
  },
  {
    title: '3. Parliament of India: Bicameral Architecture',
    instruction: 'Click on the Lok Sabha and Rajya Sabha chambers to inspect their constitutional composition, terms, and powers.',
    interactionType: 'click-chambers',
    nodeId: NODE_C8_HISTCIV_057,
  },
  {
    title: '4. Law-Making Machine: How a Bill Becomes an Act',
    instruction: 'Step through the legislative pipeline from Bill introduction to Presidential Assent.',
    interactionType: 'process-pipeline',
    nodeId: NODE_C8_HISTCIV_059,
  },
  {
    title: '5. The Presidential Electoral College Balance',
    instruction: 'Adjust the State vs Federal balance slider to see how Article 54 & 55 weight MP and MLA votes equally in the Republic.',
    interactionType: 'balance-college',
    nodeId: NODE_C8_HISTCIV_060,
  },
];

// ─── PREDICT-THEN-CHECK ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If the British Government suspended the Salt Tax in 1930, would the Civil Disobedience Movement have stopped completely?',
    options: [
      'Yes, because salt was the only complaint Indians had against British rule.',
      'No, because the Lahore Session of 1929 had already declared "Purna Swaraj" (Complete Independence) as the non-negotiable national goal.',
      'Yes, because Gandhi only cared about cooking commodities.',
      'No, because the British army would have declared martial law immediately.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Notice how the Salt Satyagraha was an entry catalyst for complete self-rule (Purna Swaraj) declared under Jawaharlal Nehru at Lahore.',
  },
  {
    question: 'Predict: Can the Rajya Sabha stall a Money Bill passed by the Lok Sabha indefinitely to block the government budget?',
    options: [
      'Yes, the Upper House has absolute veto over all government finances.',
      'No, Article 109 gives Rajya Sabha only 14 days to recommend amendments; after that, the bill is deemed passed automatically.',
      'Yes, for up to 6 months before a joint sitting is called.',
      'No, but the President must dismiss the Lok Sabha if Rajya Sabha objects.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Check the legislative pipeline: money bills give primacy to the directly elected House of the People (Lok Sabha).',
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In our Parliament diagram, what is the key constitutional difference regarding House dissolution?',
    observableOptions: [
      'Lok Sabha can be dissolved early by the President; Rajya Sabha is permanent and never dissolves.',
      'Both houses are dissolved simultaneously every 5 years.',
      'Rajya Sabha is dissolved whenever the Prime Minister resigns.',
      'Neither house can ever be dissolved under any circumstances.',
    ],
    correctIndex: 0,
  },
  {
    question: 'Observation: What power does the Union Parliament possess that no other organ of the Indian state can exercise?',
    observableOptions: [
      'Direct command of police forces in all states',
      'The sole constitutional power to amend the Constitution (Article 368) and impeach the President (Article 61)',
      'The power to strike down Supreme Court judgments without legislation',
      'The power to print currency privately for MPs',
    ],
    correctIndex: 1,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Constitutional Moot: Draft a Parliamentary Resolution',
  description: 'Step into the shoes of an Indian Member of Parliament (MP). Draft a short private member resolution addressing a key national challenge (e.g., universal digital literacy or clean air standards).',
  steps: [
    'Choose your house: Lok Sabha (citizen representative) or Rajya Sabha (state voice).',
    'Identify whether your proposal falls under the Union List (e.g., national telecommunications) or Concurrent List (e.g., education/environment).',
    'Follow the 3 Readings process: Introduction, Clause-by-Clause Scrutiny, and Majority Vote.',
    'Present your draft resolution to your civics class or study group for debate!',
  ],
};

// ─── MAIN COMPONENT ───
function C8_HistoryCivicsLucknowPact1916Sim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C8_HISTCIV_051,
  title = DEFAULT_PROPS.title || 'Lucknow Pact (1916) & The Republic',
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['histciv'] || { name: 'History & Civics', emoji: '📜', color: 'amber' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery & Predict-Check State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration & Sandbox States
  const [activeFaction, setActiveFaction] = useState<'moderate' | 'assertive' | 'league' | 'all'>('all');
  const [movementYear, setMovementYear] = useState<number>(1916);
  const [selectedChamber, setSelectedChamber] = useState<'loksabha' | 'rajyasabha' | 'president'>('loksabha');
  const [billStage, setBillStage] = useState<number>(1);
  const [billType, setBillType] = useState<'ordinary' | 'money'>('ordinary');
  const [electoralBalance, setElectoralBalance] = useState<number>(50); // 50-50 MP vs MLA parity

  // Challenge Engine States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Non-MCQ Interactive states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback Animation States
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Persistent BKT & Timer Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter Challenges by Difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM MASTERY STORE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE BKT DIFFICULTY UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS ANIMATION (PARLIAMENT DOME & TRICOLOR PARTICLES) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let frame = 0;

    const particles = Array.from({ length: 24 }, (_, i) => ({
      x: (i * 20) % canvas.width,
      y: Math.random() * canvas.height,
      speed: 0.4 + Math.random() * 0.6,
      color: i % 3 === 0 ? '#ff9933' : i % 3 === 1 ? '#ffffff' : '#138808',
      radius: 1.5 + Math.random() * 1.5,
    }));

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background subtle gradient
      ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render floating tricolor points
      particles.forEach(p => {
        p.y -= p.speed;
        if (p.y < 0) p.y = canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.5 + Math.sin(frame * 0.05) * 0.3;
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      // Draw active node tracker
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '10px sans-serif';
      ctx.fillText(`Republic Engine • CISCE Class 8 • Stage: ${phase.toUpperCase()}`, 12, 18);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── HANDLERS (MEMOIZED WITH USECALLBACK) ───
  const showNextHint = useCallback(() => {
    const next = hintCount + 1;
    if (next <= 3 && activeChallenge.hints[next - 1]) {
      setCurrentHint(activeChallenge.hints[next - 1]);
      setShowHint(true);
      setHintCount(next);
      audioManager.play('hint');
      speechManager.speak(`Hint: ${activeChallenge.hints[next - 1]}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us review the complete historical and constitutional analysis.');
    }
  }, [hintCount, activeChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((index: number) => {
    const isCorrect = index === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding! You understand the constitutional compromise.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Manipulate the historical models to learn by doing.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the constitutional sandbox. Experiment freely with all legislative variables.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Prove your mastery across history and civics.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the historical cause-and-effect model.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb constitutional observation!' : 'Carefully review the bicameral properties above.');
  }, []);

  const handleFactionSelect = useCallback((f: 'moderate' | 'assertive' | 'league' | 'all') => {
    setActiveFaction(f);
    audioManager.play('tap');
    const summaries: Record<string, string> = {
      moderate: 'Moderates: Led by Gokhale followers; sought constitutional reform within the Empire.',
      assertive: 'Assertives: Led by Bal Gangadhar Tilak; demanded Swaraj through mass mobilization and Home Rule.',
      league: 'Muslim League: Led by Jinnah; demanded separate electorates & weighted legislative representation.',
      all: 'December 1916 Lucknow Pact: Moderate-Assertive reunion + Congress-League Joint Demand for Self-Government!',
    };
    speechManager.speak(summaries[f]);
  }, []);

  const handleChamberSelect = useCallback((chamber: 'loksabha' | 'rajyasabha' | 'president') => {
    setSelectedChamber(chamber);
    audioManager.play('tap');
  }, []);

  const handleBillStageStep = useCallback((step: number) => {
    setBillStage(step);
    audioManager.play('chime');
  }, []);

  const handleBillTypeToggle = useCallback((type: 'ordinary' | 'money') => {
    setBillType(type);
    setBillStage(1);
    audioManager.play('tap');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 400);
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && activeChallenge.sortItems) {
        prev = activeChallenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak(`Magnificent achievement! You scored ${finalScore} percent and mastered the Republic simulation.`);
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

  const handleAnswer = useCallback((userAnswer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = userAnswer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(userAnswer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(userAnswer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const num = typeof userAnswer === 'string' ? parseFloat(userAnswer) : (userAnswer as number);
      isCorrect = Math.abs(num - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = userAnswer === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Precisely accurate! Well analyzed.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${activeChallenge.nodeId}`, 'proficient');
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us study the complete constitutional explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── RECHARTS DATA FOR ELECTORAL COLLEGE BREAKDOWN ───
  const electoralChartData = useMemo(() => {
    const mpValue = Math.round(543 * (100 - electoralBalance) * 0.1);
    const mlaValue = Math.round(4033 * (electoralBalance) * 0.02);
    return [
      { name: 'Lok Sabha MPs', count: 543, fill: '#3b82f6' },
      { name: 'Rajya Sabha MPs', count: 233, fill: '#8b5cf6' },
      { name: 'State MLAs', count: 4033, fill: '#10b981' },
      { name: 'Parity Ratio', count: mpValue + mlaValue, fill: '#f59e0b' },
    ];
  }, [electoralBalance]);

  // Motivational message based on error count
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors <= 3) return 'Great work!';
    if (errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // Spaced Repetition interval computation
  const srsIntervalDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* ─── TOP STATUS BAR ─── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-amber-500/10 border border-amber-500/30 rounded-2xl">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800/60">
                ICSE Class 8 • Civics & Modern History
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  difficulty === 'foundation' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800' :
                  difficulty === 'standard' ? 'bg-blue-950/80 text-blue-400 border border-blue-800' :
                  'bg-rose-950/80 text-rose-400 border border-rose-800'
                }`}
              >
                {difficulty} Tier
              </motion.span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-1">{title}</h1>
          </div>
        </div>

        {/* Phase Indicator Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map(p => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'discovery' || p === 'explore' || p === 'sandbox') setPhase(p);
                if (p === 'challenge') handleAdvanceToChallenge();
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </div>

      {/* 2D Canvas Status Indicator */}
      <div className="w-full h-8 mb-4 rounded-xl overflow-hidden border border-slate-800/80">
        <canvas ref={canvasRef} width={900} height={32} className="w-full h-full" />
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-700/40 rounded-2xl shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🏛️</span>
                <h2 className="text-lg font-extrabold text-indigo-300">{SCENARIO.title}</h2>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
              <div className="mt-4 p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-400">
                <strong>Historical Context:</strong> {SCENARIO.context}
              </div>
            </div>

            {/* Curiosity Hook Card */}
            <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-2">
                <span>⚡ Curiosity Discovery Question</span>
              </div>
              <p className="text-base font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`p-4 rounded-xl text-left text-xs md:text-sm font-medium transition-all ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-200'
                        : discoveryAnswered && !discoveryCorrect && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-900/50 border border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 border border-slate-700/70 text-slate-200 hover:border-indigo-500 hover:bg-slate-800'
                    }`}
                  >
                    <span className="font-bold text-indigo-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-indigo-950/40 border border-indigo-800/60 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4"
                >
                  <p className="text-xs md:text-sm text-indigo-200">
                    {discoveryCorrect
                      ? '✨ Brilliant insight! Tilak and Jinnah forged a mutual constitutional concession at Lucknow in 1916.'
                      : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-black text-xs md:text-sm rounded-xl shadow-lg shadow-indigo-600/30 whitespace-nowrap"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
        {phase === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            {/* Step Navigation Bar */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {EXPLORATION_STEPS.map((s, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setCurrentSlide(idx);
                    audioManager.play('tap');
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all ${
                    currentSlide === idx
                      ? 'bg-indigo-950/90 border-indigo-500 text-white shadow-md shadow-indigo-500/20'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold text-indigo-400">Step {idx + 1}</div>
                  <div className="text-xs font-bold truncate">{s.title.split(':')[0]}</div>
                </motion.button>
              ))}
            </div>

            {/* Active Exploration Card */}
            <div className="p-5 md:p-6 bg-slate-900/90 border border-slate-800 rounded-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
                <div>
                  <h3 className="text-lg font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-xs text-amber-400 mt-0.5">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
                </div>
                <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700 font-mono">
                  {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
              </div>

              {/* ─── LAB 1: SVG 1 - LUCKNOW ACCORD BRIDGE ─── */}
              {currentSlide === 0 && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(['all', 'moderate', 'assertive', 'league'] as const).map(f => (
                      <motion.button
                        key={f}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleFactionSelect(f)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                          activeFaction === f
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {f === 'all' ? '✨ Full Lucknow Pact (1916)' : f}
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG 1: Lucknow Pact Accord Diagram */}
                  <svg viewBox="0 0 600 240" className="w-full bg-slate-900 rounded-xl border border-slate-800/80">
                    <rect x="30" y="30" width="230" height="180" rx="12" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                    <text x="145" y="55" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontWeight="bold">Indian National Congress (INC)</text>

                    {/* Moderate Node */}
                    <g opacity={activeFaction === 'all' || activeFaction === 'moderate' ? 1 : 0.35}>
                      <circle cx="90" cy="120" r="32" fill="#3b82f6" />
                      <text x="90" y="115" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Moderates</text>
                      <text x="90" y="128" textAnchor="middle" fill="#dbeafe" fontSize="7.5">(Gokhale Camp)</text>
                    </g>

                    {/* Assertive Node */}
                    <g opacity={activeFaction === 'all' || activeFaction === 'assertive' ? 1 : 0.35}>
                      <circle cx="195" cy="120" r="32" fill="#ef4444" />
                      <text x="195" y="115" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Assertives</text>
                      <text x="195" y="128" textAnchor="middle" fill="#fee2e2" fontSize="7.5">(Lokmanya Tilak)</text>
                    </g>

                    {/* Reunion Line inside INC */}
                    <line x1="125" y1="120" x2="160" y2="120" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="3 3" />
                    <text x="142" y="145" textAnchor="middle" fill="#fbbf24" fontSize="8">Surat Reunion 1916</text>

                    {/* Muslim League Box */}
                    <rect x="340" y="30" width="230" height="180" rx="12" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="455" y="55" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="bold">All-India Muslim League</text>

                    {/* Muslim League Node */}
                    <g opacity={activeFaction === 'all' || activeFaction === 'league' ? 1 : 0.35}>
                      <circle cx="455" cy="120" r="38" fill="#059669" />
                      <text x="455" y="115" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Muslim League</text>
                      <text x="455" y="128" textAnchor="middle" fill="#d1fae5" fontSize="7.5">(M.A. Jinnah)</text>
                    </g>

                    {/* Bridge between INC & Muslim League */}
                    <g opacity={activeFaction === 'all' ? 1 : 0.4}>
                      <path d="M 260 120 C 300 80, 300 80, 340 120" fill="transparent" stroke="#f59e0b" strokeWidth="3" />
                      <text x="300" y="75" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Joint Self-Government Demand</text>
                      <path d="M 340 140 C 300 180, 300 180, 260 140" fill="transparent" stroke="#38bdf8" strokeWidth="3" />
                      <text x="300" y="185" textAnchor="middle" fill="#38bdf8" fontSize="8">Separate Electorates Conceded (1/3 Seats)</text>
                    </g>
                  </svg>
                </div>
              )}

              {/* ─── LAB 2: SVG 2 - GANDHIAN FREEDOM TRAIL & REAL-TIME SLIDER ─── */}
              {currentSlide === 1 && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300">
                      Timeline Navigation (Drag Slider): <span className="text-amber-400 font-mono text-sm">{movementYear}</span>
                    </label>
                    <span className="text-[11px] text-emerald-400 font-bold">Instant Real-Time Sync</span>
                  </div>

                  {/* Real-time slider with instant visual update */}
                  <input
                    type="range"
                    min={1916}
                    max={1947}
                    step={1}
                    value={movementYear}
                    onChange={(e) => {
                      setMovementYear(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    className="w-full accent-indigo-500 cursor-pointer"
                    aria-label="Timeline Year Slider"
                  />

                  {/* SVG 2: Real-time Freedom Trail Visualizer */}
                  <svg viewBox="0 0 600 160" className="w-full bg-slate-900 rounded-xl border border-slate-800">
                    <defs>
                      <linearGradient id="flagGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ff9933" />
                        <stop offset="50%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#138808" />
                      </linearGradient>
                    </defs>

                    {/* Timeline Path */}
                    <line x1="40" y1="80" x2="560" y2="80" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
                    
                    {/* Active Progress Track */}
                    <line
                      x1="40"
                      y1="80"
                      x2={40 + ((movementYear - 1916) / 31) * 520}
                      y2="80"
                      stroke="url(#flagGrad)"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />

                    {/* Milestone Nodes */}
                    {[
                      { yr: 1916, label: 'Lucknow', x: 40 },
                      { yr: 1917, label: 'Champaran', x: 40 + (1 / 31) * 520 },
                      { yr: 1920, label: 'Non-Coop', x: 40 + (4 / 31) * 520 },
                      { yr: 1930, label: 'Salt Dandi', x: 40 + (14 / 31) * 520 },
                      { yr: 1942, label: 'Quit India', x: 40 + (26 / 31) * 520 },
                      { yr: 1947, label: 'Independence', x: 560 },
                    ].map((m, idx) => (
                      <g key={idx}>
                        <circle
                          cx={m.x}
                          cy="80"
                          r={movementYear >= m.yr ? 7 : 4}
                          fill={movementYear >= m.yr ? '#10b981' : '#475569'}
                          stroke="#0f172a"
                          strokeWidth="2"
                        />
                        <text
                          x={m.x}
                          y="105"
                          textAnchor="middle"
                          fill={movementYear >= m.yr ? '#e2e8f0' : '#64748b'}
                          fontSize="8.5"
                          fontWeight={movementYear >= m.yr ? 'bold' : 'normal'}
                        >
                          {m.label}
                        </text>
                        <text
                          x={m.x}
                          y="118"
                          textAnchor="middle"
                          fill={movementYear >= m.yr ? '#38bdf8' : '#475569'}
                          fontSize="7.5"
                          fontFamily="monospace"
                        >
                          {m.yr}
                        </text>
                      </g>
                    ))}

                    {/* Active Current Position Pointer */}
                    <g transform={`translate(${40 + ((movementYear - 1916) / 31) * 520}, 80)`}>
                      <circle cx="0" cy="0" r="11" fill="#f59e0b" fillOpacity="0.3" className="animate-ping" />
                      <circle cx="0" cy="0" r="8" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                      <path d="M -6 -16 L 6 -16 L 0 -6 Z" fill="#f59e0b" />
                      <text x="0" y="-20" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                        {movementYear}
                      </text>
                    </g>
                  </svg>

                  {/* Dynamic Status Card */}
                  <motion.div
                    key={movementYear}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-slate-900 rounded-xl border border-indigo-900/50 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold uppercase text-indigo-400 tracking-wider">
                        {movementYear <= 1918 ? 'Early Satyagraha Phase' :
                         movementYear <= 1922 ? 'Non-Cooperation & Khilafat' :
                         movementYear <= 1934 ? 'Civil Disobedience (Salt March)' :
                         movementYear <= 1945 ? 'Quit India & INA Campaign' : 'Independence & Partition'}
                      </span>
                      <h4 className="text-base font-extrabold text-white mt-0.5">
                        {movementYear === 1916 && 'Lucknow Pact signed; Moderates & Assertives reunite.'}
                        {movementYear === 1917 && 'Champaran Satyagraha in Bihar: Tinkathia (3/20th) abolished.'}
                        {movementYear === 1918 && 'Kheda Peasant Revenue Refusal & Ahmedabad Mill Strike (35% hike).'}
                        {movementYear === 1919 && 'Rowlatt Act passed; Jallianwala Bagh Massacre on 13 April.'}
                        {movementYear >= 1920 && movementYear <= 1921 && 'Nationwide Non-Cooperation: Boycott of schools, courts, titles & cloth.'}
                        {movementYear === 1922 && 'Chauri-Chaura clash on 4 Feb; Gandhi suspends movement on 12 Feb.'}
                        {movementYear >= 1928 && movementYear <= 1929 && 'Simon Commission protests ("Simon Go Back"); Lahore Session Purna Swaraj.'}
                        {movementYear === 1930 && 'Dandi Salt March (12 March - 6 April): 240 miles to break Salt Law.'}
                        {movementYear === 1931 && 'Gandhi-Irwin Pact on 5 March: Civil Disobedience suspended.'}
                        {movementYear >= 1939 && movementYear <= 1941 && 'Forward Bloc formed by Netaji Bose (June 1939); WWII begins.'}
                        {movementYear === 1942 && 'Quit India "Do or Die" at Gowalia Tank; Leaderless mass uprising.'}
                        {movementYear >= 1943 && movementYear <= 1944 && 'Netaji reorganises INA in Singapore; Battles at Imphal & Kohima.'}
                        {movementYear === 1946 && 'Cabinet Mission Plan; Direct Action Day communal clashes.'}
                        {movementYear === 1947 && 'Mountbatten Plan (3 June); Indian Independence Act (18 July / 15 August).'}
                        {movementYear > 1947 && 'Drafting the Sovereign Constitution of India for 26 January 1950.'}
                      </h4>
                    </div>
                    <div className="px-3 py-1.5 bg-indigo-950 border border-indigo-700 rounded-lg text-xs font-mono text-indigo-300">
                      Year: {movementYear}
                    </div>
                  </motion.div>
                </div>
              )}

              {/* ─── LAB 3: SVG 3 - BICAMERAL PARLIAMENT ARCHITECTURE ─── */}
              {currentSlide === 2 && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleChamberSelect('loksabha')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedChamber === 'loksabha' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      🟢 Lok Sabha (House of the People)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleChamberSelect('rajyasabha')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedChamber === 'rajyasabha' ? 'bg-rose-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      🔴 Rajya Sabha (Council of States)
                    </motion.button>
                  </div>

                  {/* SVG 3: Sovereign Parliament Bicameral Structure */}
                  <svg viewBox="0 0 600 200" className="w-full bg-slate-900 rounded-xl border border-slate-800">
                    {/* Parliament Outer Dome Circle */}
                    <circle cx="300" cy="100" r="90" fill="#0f172a" stroke="#334155" strokeWidth="4" />
                    
                    {/* Central Hall */}
                    <circle cx="300" cy="100" r="32" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                    <text x="300" y="98" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">Central Hall</text>
                    <text x="300" y="110" textAnchor="middle" fill="#94a3b8" fontSize="6.5">Joint Sittings</text>

                    {/* Lok Sabha Chamber (Left Wing - Green carpet tradition) */}
                    <path
                      d="M 270 100 A 75 75 0 0 0 225 155 L 255 125 Z"
                      fill={selectedChamber === 'loksabha' ? '#065f46' : '#064e3b'}
                      stroke="#10b981"
                      strokeWidth={selectedChamber === 'loksabha' ? '2.5' : '1'}
                      className="cursor-pointer"
                      onClick={() => handleChamberSelect('loksabha')}
                    />
                    <g transform="translate(140, 100)">
                      <rect x="-10" y="-35" width="120" height="70" rx="8" fill={selectedChamber === 'loksabha' ? '#064e3b' : '#022c22'} stroke="#10b981" strokeWidth="1.5" />
                      <text x="50" y="-15" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">LOK SABHA</text>
                      <text x="50" y="0" textAnchor="middle" fill="#d1fae5" fontSize="8">543 Elected MPs</text>
                      <text x="50" y="14" textAnchor="middle" fill="#94a3b8" fontSize="7.5">Term: 5 Yrs (Dissoluble)</text>
                      <text x="50" y="26" textAnchor="middle" fill="#fbbf24" fontSize="7">Presided by Speaker</text>
                    </g>

                    {/* Rajya Sabha Chamber (Right Wing - Red carpet tradition) */}
                    <path
                      d="M 330 100 A 75 75 0 0 1 375 155 L 345 125 Z"
                      fill={selectedChamber === 'rajyasabha' ? '#881337' : '#4c0519'}
                      stroke="#f43f5e"
                      strokeWidth={selectedChamber === 'rajyasabha' ? '2.5' : '1'}
                      className="cursor-pointer"
                      onClick={() => handleChamberSelect('rajyasabha')}
                    />
                    <g transform="translate(350, 100)">
                      <rect x="-10" y="-35" width="120" height="70" rx="8" fill={selectedChamber === 'rajyasabha' ? '#4c0519' : '#27030d'} stroke="#f43f5e" strokeWidth="1.5" />
                      <text x="50" y="-15" textAnchor="middle" fill="#fda4af" fontSize="10" fontWeight="bold">RAJYA SABHA</text>
                      <text x="50" y="0" textAnchor="middle" fill="#ffe4e6" fontSize="8">245 MPs (233+12 Nom.)</text>
                      <text x="50" y="14" textAnchor="middle" fill="#94a3b8" fontSize="7.5">Permanent (6 Yr Term)</text>
                      <text x="50" y="26" textAnchor="middle" fill="#fbbf24" fontSize="7">VP of India (Chairman)</text>
                    </g>
                  </svg>

                  {/* Comparative Visual Box */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-xs font-black text-emerald-400 uppercase tracking-wider">
                        {selectedChamber === 'loksabha' ? 'Direct Democratic Mandate' : 'Federal States Mandate'}
                      </div>
                      <div className="text-sm font-bold text-white">
                        {selectedChamber === 'loksabha'
                          ? '543 Elected Members (Max 550 after 104th Amendment)'
                          : '245 Members (233 Elected by MLAs + 12 Nominated by President)'}
                      </div>
                      <p className="text-xs text-slate-300">
                        {selectedChamber === 'loksabha'
                          ? 'Elected by Universal Adult Franchise (18+). Normal term is 5 years, but can be dissolved early by the President. Holds collective responsibility over Council of Ministers (Art 75).'
                          : 'Elected indirectly by state MLAs using Single Transferable Vote. Permanent House (never dissolved). 1/3 members retire every 2 years; each serves a 6-year term.'}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-xs font-black text-indigo-400 uppercase tracking-wider">Key Qualifications & Presiding Officer</div>
                      <ul className="text-xs text-slate-300 space-y-1">
                        <li>• Minimum Age: <strong className="text-white">{selectedChamber === 'loksabha' ? '25 Years (Art 84)' : '30 Years (Art 84)'}</strong></li>
                        <li>• Presiding Officer: <strong className="text-white">{selectedChamber === 'loksabha' ? 'The Speaker (elected from MPs)' : 'Vice-President of India (Ex-Officio Chairman)'}</strong></li>
                        <li>• Financial Power: <strong className="text-white">{selectedChamber === 'loksabha' ? 'Exclusive power over Money Bills (Art 110)' : 'Only 14 days advisory review'}</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: LEGISLATIVE PIPELINE SIMULATOR ─── */}
              {currentSlide === 3 && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleBillTypeToggle('ordinary')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                          billType === 'ordinary' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Ordinary Bill (Art 107)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleBillTypeToggle('money')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                          billType === 'money' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Money Bill (Art 110)
                      </motion.button>
                    </div>
                    <span className="text-xs font-mono text-slate-400">Step {billStage} of 4</span>
                  </div>

                  {/* Pipeline Steps Indicator */}
                  <div className="grid grid-cols-4 gap-2">
                    {['1. Introduction', '2. Lok Sabha Passage', '3. Rajya Sabha Review', '4. Presidential Assent'].map((st, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleBillStageStep(i + 1)}
                        className={`p-2 rounded-xl text-center text-xs font-bold transition-all ${
                          billStage === i + 1
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                            : 'bg-slate-900 border border-slate-800 text-slate-400'
                        }`}
                      >
                        {st}
                      </motion.button>
                    ))}
                  </div>

                  {/* Stage Detail Box */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                    {billStage === 1 && (
                      <p>
                        {billType === 'money'
                          ? 'Money Bills require prior recommendation of the President and can ONLY be introduced in the Lok Sabha.'
                          : 'Ordinary Bills can be introduced in either the Lok Sabha or the Rajya Sabha by a Minister or Private Member.'}
                      </p>
                    )}
                    {billStage === 2 && (
                      <p>
                        The Bill undergoes 3 readings: First Reading (Introduction), Second Reading (Clause-by-Clause scrutiny), and Third Reading (Simple majority vote).
                      </p>
                    )}
                    {billStage === 3 && (
                      <p>
                        {billType === 'money'
                          ? 'Rajya Sabha has strictly 14 days to suggest amendments. If it does not return the bill within 14 days, it is deemed passed!'
                          : 'Rajya Sabha debates and passes the Bill. In case of deadlock after 6 months, the President can summon a Joint Sitting (Art 108).'}
                      </p>
                    )}
                    {billStage === 4 && (
                      <p>
                        Under Article 111, the President gives Assent, making it an Act of Parliament. The President can return an Ordinary Bill once for reconsideration, but must sign if passed again.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ─── LAB 5: PRESIDENTIAL ELECTORAL COLLEGE BALANCE ─── */}
              {currentSlide === 4 && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300">
                      Federal Parity Simulation (Article 54 & 55): <span className="text-emerald-400 font-mono text-sm">{electoralBalance}% States / {100 - electoralBalance}% Union</span>
                    </label>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={electoralBalance}
                    onChange={(e) => {
                      setElectoralBalance(Number(e.target.value));
                      audioManager.play('balance');
                    }}
                    className="w-full accent-emerald-500 cursor-pointer"
                    aria-label="Federal Parity Slider"
                  />

                  {/* Chart of Electoral College Structure */}
                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={electoralChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                        <YAxis stroke="#94a3b8" fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                          {electoralChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <p className="text-xs text-slate-400 text-center">
                    The Electoral College consists of 776 elected MPs (543 LS + 233 RS) and ~4,033 state MLAs. The vote values are weighted by population so total MP votes equal total MLA votes across the Union!
                  </p>
                </div>
              )}
            </div>

            {/* Slide Navigation Buttons */}
            <div className="flex justify-between items-center pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => Math.max(0, s - 1));
                  audioManager.play('tap');
                }}
                disabled={currentSlide === 0}
                className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-40"
              >
                ← Previous Lab
              </motion.button>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => s + 1);
                    audioManager.play('tap');
                  }}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30"
                >
                  Enter Free Sandbox Mode →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 3: SANDBOX / FREE PLAY MODE ─── */}
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-black text-emerald-400">Sandbox Playground: No Grading, Pure Discovery</h3>
                  <p className="text-xs text-slate-400">Manipulate historical timelines and parliamentary models without pressure.</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToChallenge}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs md:text-sm font-black shadow-lg shadow-emerald-600/30"
                >
                  I'm Ready for Challenges! 🏆
                </motion.button>
              </div>

              {/* Predict-Then-Check In Sandbox */}
              {!predictionMade ? (
                <div className="p-4 bg-slate-950 rounded-xl border border-indigo-900/40 mb-4">
                  <div className="text-xs font-black text-amber-400 uppercase tracking-wider mb-2">🤔 Historical Prediction Puzzle</div>
                  <p className="text-xs md:text-sm font-bold text-white mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePrediction(i)}
                        className="p-3 bg-slate-900 border border-slate-800 text-left rounded-xl text-xs text-slate-300 hover:border-indigo-500"
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-xl mb-4 text-xs text-emerald-200">
                  ✓ {PREDICTION_QUESTIONS[0].verifyInstruction}
                </div>
              )}

              {/* Observation Question */}
              {!observationAnswered ? (
                <div className="p-4 bg-slate-950 rounded-xl border border-indigo-900/40">
                  <div className="text-xs font-black text-indigo-400 uppercase tracking-wider mb-2">👁️ Constitutional Observation</div>
                  <p className="text-xs md:text-sm font-bold text-white mb-3">{OBSERVATION_QUESTIONS[0].question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleObservation(i)}
                        className="p-3 bg-slate-900 border border-slate-800 text-left rounded-xl text-xs text-slate-300 hover:border-indigo-500"
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-indigo-950/40 border border-indigo-800/60 rounded-xl text-xs text-indigo-200">
                  ✓ Observation Verified: Lok Sabha is subject to early dissolution; Rajya Sabha is permanent.
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 4: CHALLENGE MODE ─── */}
        {phase === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-5"
          >
            {/* Header & Progress */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-indigo-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length} • Competency: {activeChallenge.competencyLevel.toUpperCase()}
                </div>
                <h2 className="text-lg font-black text-white mt-0.5">{activeChallenge.question}</h2>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-slate-400">
                  Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Challenge Card */}
            <div className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/80 border-2 border-rose-500 text-rose-200'
                : 'bg-slate-900/90 border-slate-800'
            }`}>
              {/* MCQ Types with Framer Motion Shake Animation */}
              {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      className={`p-4 rounded-xl text-left text-xs md:text-sm font-medium transition-all ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/20'
                          : showExplanation
                          ? 'bg-slate-900/50 border border-slate-800 text-slate-500'
                          : 'bg-slate-800/80 border border-slate-700 text-slate-200 hover:border-indigo-500 hover:bg-slate-800'
                      }`}
                    >
                      <span className="font-bold text-indigo-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Drag-and-Drop Labeling Challenge */}
              {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
                <div className="space-y-4">
                  {/* Draggable Items Palette */}
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-400 self-center mr-2">Drag:</span>
                    {activeChallenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-indigo-600 rounded-lg text-white text-xs font-bold cursor-grab active:cursor-grabbing shadow-md"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  {/* Drop Targets */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {['tinkathia', 'revenue_remission', 'plague_bonus'].map((targetId) => (
                      <div
                        key={targetId}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId)}
                        className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] text-center transition-all ${
                          droppedLabels[targetId]
                            ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold text-xs'
                            : 'border-slate-700 bg-slate-950/60 text-slate-400 text-xs'
                        }`}
                      >
                        <div className="text-[10px] uppercase font-bold text-indigo-400 mb-1">
                          {targetId === 'tinkathia' ? 'Indigo 3/20th System' :
                           targetId === 'revenue_remission' ? 'Famine Revenue Relief' : 'Textile Plague Bonus'}
                        </div>
                        {droppedLabels[targetId] || 'Drop Campaign Here'}
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation || Object.keys(droppedLabels).length < 3}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                  >
                    Check Mapping ✓
                  </motion.button>
                </div>
              )}

              {/* Drag-and-Drop Sorting Challenge */}
              {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Drag or reorder the historical milestones into correct sequence:</p>
                  <div className="space-y-2">
                    {(sortArrangement.length === activeChallenge.sortItems.length
                      ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                      : activeChallenge.sortItems
                    ).map((item, displayIdx) => (
                      <motion.div
                        key={displayIdx}
                        draggable
                        onDragStart={() => setDraggedItem(String(displayIdx))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const from = parseInt(draggedItem || '0');
                          handleSortMove(from, displayIdx);
                        }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs md:text-sm text-slate-200 cursor-grab active:cursor-grabbing flex items-center justify-between"
                      >
                        <span>
                          <strong className="text-indigo-400 mr-2">{displayIdx + 1}.</strong> {item}
                        </span>
                        <span className="text-slate-500 text-xs">↕ Drag</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => {
                      const ans = sortArrangement.length > 0 ? sortArrangement : activeChallenge.sortItems?.map((_, i) => i) || [];
                      handleAnswer(ans);
                    }}
                    disabled={showExplanation}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                  >
                    Verify Chronology ✓
                  </motion.button>
                </div>
              )}

              {/* Numeric Input Challenge */}
              {activeChallenge.type === 'numeric' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter exact integer..."
                      className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48 focus:border-indigo-500 focus:outline-none"
                    />
                    <span className="text-xs font-bold text-slate-400">{activeChallenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                    >
                      Check Answer
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Construct Challenge */}
              {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {activeChallenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-indigo-300 rounded-lg text-xs font-bold"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-3 py-1 bg-indigo-900/90 text-indigo-200 rounded-lg text-xs font-bold flex items-center gap-2"
                      >
                        {part}
                        <button
                          onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))}
                          className="text-rose-400 hover:text-rose-200"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500">Click components above to construct your argument...</span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                  >
                    Validate Synthesis ✓
                  </motion.button>
                </div>
              )}
            </div>

            {/* ─── PROGRESSIVE DISCLOSURE EXPLANATION CARD ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-700/60 rounded-2xl space-y-3"
              >
                <div className="text-xs font-black uppercase tracking-wider text-amber-400">Step-by-Step Historical Breakdown:</div>
                {activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs md:text-sm text-slate-200 leading-relaxed"
                  >
                    <span className="font-bold text-indigo-400 mr-1.5">{i + 1}.</span>
                    {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="pt-2 flex justify-between items-center">
                  {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-indigo-700 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Detail →
                    </motion.button>
                  ) : <div />}

                  {revealedSteps >= activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs md:text-sm font-black shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL FEEDBACK ─── */}
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-700/60 rounded-3xl text-center space-y-4">
              <span className="text-5xl">🇮🇳</span>
              <h2 className="text-2xl md:text-3xl font-black text-white">Constitutional Mastery Accomplished!</h2>

              {/* Personalized Motivational Feedback */}
              <div className="p-3 bg-emerald-900/60 border border-emerald-500/80 rounded-2xl max-w-md mx-auto">
                <span className="text-sm md:text-base font-black text-emerald-300 tracking-wide">
                  {motivationalMessage}
                </span>
              </div>

              <p className="text-sm text-slate-300 max-w-xl mx-auto">
                You have successfully demonstrated deep historical understanding of the freedom struggle and the sovereign democratic machinery of the Indian Republic.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Final Score</div>
                  <div className="text-xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
                </div>
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Mastery Level</div>
                  <div className="text-xl font-black text-indigo-400 capitalize">{masteryLevel}</div>
                </div>
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Total Errors</div>
                  <div className="text-xl font-black text-amber-400">{errors}</div>
                </div>
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Review Interval</div>
                  <div className="text-xl font-black text-purple-400">
                    {srsIntervalDays} {srsIntervalDays === 1 ? 'Day' : 'Days'}
                  </div>
                </div>
              </div>
            </div>

            {/* ─── PROMINENT SPACED REPETITION (SRS) SCHEDULE CARD ─── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/70 border-2 border-purple-500/50 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-900/60 border border-purple-400/40 rounded-2xl text-3xl shrink-0">
                  🗓️
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-purple-300 bg-purple-900/50 px-2 py-0.5 rounded-md border border-purple-700/50">
                      Spaced Repetition System (SRS)
                    </span>
                    <span className="text-xs text-slate-400 font-mono">SM-2 Algorithm</span>
                  </div>
                  <h3 className="text-base font-extrabold text-white mt-1">
                    {errors === 0
                      ? '🎯 Perfect Recall — Review in 7 days'
                      : errors <= 3
                      ? '⚡ Solid Understanding — Review in 3 days'
                      : '🔄 Reinforcement Needed — Review in 1 day'}
                  </h3>
                  <p className="text-xs text-purple-200/80 mt-0.5">
                    {errors === 0
                      ? 'Zero errors recorded! Your next review interval is scheduled for 7 days to consolidate long-term memory.'
                      : errors <= 3
                      ? `Recorded ${errors} ${errors === 1 ? 'error' : 'errors'}. Review in 3 days to lock in parliamentary concepts.`
                      : `Recorded ${errors} errors. A quick 1-day review will reinforce historical chronology and constitutional provisions.`}
                  </p>
                </div>
              </div>

              <div className="px-5 py-3 bg-purple-950 border border-purple-500/60 rounded-xl text-center shrink-0 min-w-[130px]">
                <div className="text-[10px] uppercase font-bold text-purple-300 tracking-wider">Scheduled Review</div>
                <div className="text-xl font-black text-white mt-0.5">
                  {srsIntervalDays === 7 ? 'In 7 Days' : srsIntervalDays === 3 ? 'In 3 Days' : 'In 1 Day'}
                </div>
              </div>
            </motion.div>

            {/* Misconception Diagnostic Profile */}
            {hitMisconceptions.length > 0 && (
              <div className="p-5 bg-rose-950/40 border border-rose-800/60 rounded-2xl space-y-3">
                <h3 className="text-sm font-black text-rose-300 uppercase tracking-wider">
                  ⚠️ Your Targeted Misconception Profile
                </h3>
                <p className="text-xs text-slate-400">Review these common traps identified during your session:</p>
                <div className="space-y-2">
                  {hitMisconceptions.map((idx, i) => {
                    const m = misconceptions[idx];
                    if (!m) return null;
                    return (
                      <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
                        <div className="text-rose-400 font-bold mb-1">❌ Trap: {m.misconception}</div>
                        <div className="text-emerald-300">✓ Fact: {m.correction}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Reflection Questions */}
            <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
              <h3 className="text-sm font-black text-indigo-300 uppercase tracking-wider">💭 Constitutional Reflection</h3>
              <ul className="text-xs text-slate-300 space-y-2">
                <li>1. Why did the founding fathers choose a bicameral Parliament rather than a single house?</li>
                <li>2. How did Gandhi's local campaigns in 1917–1918 prepare India for nationwide mass movements?</li>
                <li>3. In what ways does the President of India balance ceremonial dignity with constitutional checks?</li>
              </ul>
            </div>

            {/* Real World Activity Card */}
            <div className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-700/50 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">📜</span>
                <h3 className="text-base font-extrabold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
              </div>
              <p className="text-xs md:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="space-y-1.5 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                  <div key={i} className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="font-bold text-amber-400">{i + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SIM-ENGINE CONDITIONAL POPUPS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Accomplished!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C8_HistoryCivicsLucknowPact1916Sim;
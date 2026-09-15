'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 11 HISTORY NODE LITERAL CONSTANTS ────��───────────────────────
const NODE_C11_HIST_021 = 'c11_hist_021'; // Satyagraha Against the Rowlatt Act (1919)
const NODE_C11_HIST_022 = 'c11_hist_022'; // Jallianwala Bagh Massacre (13 April 1919)
const NODE_C11_HIST_023 = 'c11_hist_023'; // Launching of the Khilafat Movement (1919-1920)
const NODE_C11_HIST_024 = 'c11_hist_024'; // Non-Cooperation Movement (1920-1922)
const NODE_C11_HIST_025 = 'c11_hist_025'; // Simon Commission (1927) & All-India Boycott
const NODE_C11_HIST_026 = 'c11_hist_026'; // Nehru Report (1928) & Dominion Status
const NODE_C11_HIST_027 = 'c11_hist_027'; // Lahore Session (1929) & Poorna Swaraj
const NODE_C11_HIST_028 = 'c11_hist_028'; // Civil Disobedience Movement (1930-1934) & Salt March
const NODE_C11_HIST_029 = 'c11_hist_029'; // Poona Pact (1932) & Resumption of CDM
const NODE_C11_HIST_030 = 'c11_hist_030'; // Government of India Act 1935 & 1937 Elections

const ALL_NODE_IDS = [
  NODE_C11_HIST_021,
  NODE_C11_HIST_022,
  NODE_C11_HIST_023,
  NODE_C11_HIST_024,
  NODE_C11_HIST_025,
  NODE_C11_HIST_026,
  NODE_C11_HIST_027,
  NODE_C11_HIST_028,
  NODE_C11_HIST_029,
  NODE_C11_HIST_030,
];

// ─── NARRATIVE SCENARIO ──────────────────────────────────────────────────────
const SCENARIO = {
  title: 'Chronicles of Swaraj: The Nationalist Crucible (1919–1939)',
  intro:
    'You are an investigative archival historian tasked with reconstructing the crucial two decades that transformed India’s anti-colonial struggle. From the peaceful pledge of the Satyagraha Sabha to the blood of Amritsar, the fiery surge of Non-Cooperation, the salt of Dandi, and the historic ballots of 1937, every strategic turn shaped modern India.',
  context:
    'Examine original manifestos, test how tactical escalations altered the imperial-nationalist balance, identify regional flashpoints on interactive maps, and evaluate the moral and constitutional crossroads that forged the Republic.',
};

// ─── DISCOVERY HOOK ──────────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question:
    'In April 1919, after nationwide hartals turned violent in Delhi and Ahmedabad, what unexpected decision did Mahatma Gandhi make regarding the Rowlatt Satyagraha?',
  options: [
    'He called for an armed uprising against colonial police stations',
    'He unilaterally suspended the movement, calling it a "Himalayan miscalculation"',
    'He accepted an invitation to become Viceroy of the provisional council',
    'He dissolved the Indian National Congress and fled to South Africa',
  ],
  correctIndex: 1,
  hintAfter:
    'Satyagraha was not merely a political tactic but an absolute moral discipline. When violence erupted, Gandhi withdrew rather than compromise on Ahimsa.',
};

// ─── TYPES & INTERFACES ──────────────────────────────────────────────────────
export interface Challenge {
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

// ─── DEFAULT ENRICHMENT DATA ─────────────────────────────────────────────────
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_HIST_021,
  title: 'Satyagraha Against Rowlatt & The Mass Nationalist Transformation (1919–1939)',
  definition:
    'The transformative Gandhian mass movements spanning from the anti-Rowlatt agitation and Jallianwala Bagh (1919) through Non-Cooperation, Civil Disobedience, and the Government of India Act 1935, redefining Indian anti-colonial struggle.',
  eli5:
    'Think of India\'s freedom struggle like a series of escalating peaceful resistance waves: when unfair laws were passed, millions stopped work, boycotted foreign goods, made forbidden salt, and eventually contested provincial elections to challenge imperial rule from within.',
  misconceptions: [
    {
      misconception: 'The Rowlatt Satyagraha was ended because the British military crushed it completely.',
      correction:
        'Gandhi unilaterally suspended it on 18 April 1919 after violence broke out in Delhi and Ahmedabad, candidly calling it a "Himalayan miscalculation" regarding mass readiness for non-violence.',
    },
    {
      misconception: 'The gathering at Jallianwala Bagh was an armed, violent mob rioting against General Dyer.',
      correction:
        'The crowd of 10,000–20,000 was completely unarmed and peaceful, including many villagers, women, and children gathered for the Baisakhi harvest festival.',
    },
    {
      misconception: 'The Nehru Report of 1928 demanded Complete Independence (Poorna Swaraj).',
      correction:
        'The Nehru Report drafted by Motilal Nehru and Sapru demanded Dominion Status within the British Commonwealth; Poorna Swaraj was declared later at the Lahore Session in 1929.',
    },
    {
      misconception: 'The Poona Pact granted separate electorates to the Depressed Classes.',
      correction:
        'The British Communal Award granted separate electorates; the Poona Pact between Gandhi and Ambedkar replaced them with reserved seats within a joint electorate (148 provincial seats).',
    },
    {
      misconception: 'Congress ministries resigned in 1939 because of the Quit India movement.',
      correction:
        'Congress ministries resigned on 10 November 1939 in protest against Viceroy Linlithgow declaring India at war with Germany without consulting elected Indian ministries.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'When was the Satyagraha Sabha founded in Bombay to oppose the Rowlatt Act?',
      options: ['January 1918', 'February 1919', 'April 1919', 'August 1920'],
      correctIndex: 1,
    },
    {
      question: 'Who commanded the firing on peaceful civilians at Jallianwala Bagh on 13 April 1919?',
      options: ['Sir Michael O\'Dwyer', 'Brigadier-General Reginald Dyer', 'Lord Chelmsford', 'James A. Scott'],
      correctIndex: 1,
    },
    {
      question: 'Which treaty imposing harsh terms on the Ottoman Empire triggered the Khilafat Movement?',
      options: ['Treaty of Versailles', 'Treaty of Sèvres', 'Treaty of Lausanne', 'Treaty of Paris'],
      correctIndex: 1,
    },
    {
      question: 'At which 1920 session was the Non-Cooperation resolution formally moved by Gandhi?',
      options: ['Nagpur Annual Session', 'Calcutta Special Session', 'Madras Session', 'Belgaum Session'],
      correctIndex: 1,
    },
    {
      question: 'Why did Indians universally boycott the Simon Commission in 1928?',
      options: ['It had no Indian members', 'It arrived 5 years late', 'It demanded immediate partition', 'It banned khadi'],
      correctIndex: 0,
    },
    {
      question: 'Who presided over the historic Lahore Congress Session of December 1929?',
      options: ['Motilal Nehru', 'Mahatma Gandhi', 'Jawaharlal Nehru', 'Subhas Chandra Bose'],
      correctIndex: 2,
    },
    {
      question: 'How many satyagrahis initially set out with Gandhi from Sabarmati on the Dandi March?',
      options: ['50', '78', '148', '379'],
      correctIndex: 1,
    },
    {
      question: 'How many provincial legislature seats were reserved for the Depressed Classes under the Poona Pact?',
      options: ['71 seats', '106 seats', '148 seats', '240 seats'],
      correctIndex: 2,
    },
  ],
  masteryCriteria:
    'Student demonstrates deep conceptual mastery across all 10 core nodes (c11_hist_021 through c11_hist_030), correctly distinguishing causes, actors, constitutional treaties, and structural outcomes.',
};

// ─── EXPLORATION STEPS (Interactive Discovery) ──────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: '1. The Rowlatt Threshold & Satyagraha Sabha',
    instruction: 'Click the archival dossiers to examine why wartime emergency powers triggered Gandhi’s first national pledge.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C11_HIST_021,
  },
  {
    title: '2. Anatomy of Jallianwala Bagh (13 April 1919)',
    instruction: 'Inspect the geographic choke-point and drag the slider to compare official Hunter vs independent inquiry tolls.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_HIST_022,
  },
  {
    title: '3. Khilafat & Non-Cooperation Dynamics',
    instruction: 'Adjust the mass mobilization sliders to observe real-time surge in Swadeshi boycotts and cross-communal unity.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_HIST_023,
  },
  {
    title: '4. Simon Commission to Poorna Swaraj',
    instruction: 'Track the constitutional escalation from all-British Commission boycott to the midnight tricolour hoisting.',
    interactionType: 'drag-position',
    nodeId: NODE_C11_HIST_027,
  },
  {
    title: '5. Salt March, Poona Pact & 1937 Electoral Map',
    instruction: 'Manipulate the provincial autonomy levers to view the 1937 electoral balance and reserved seat settlement.',
    interactionType: 'drag-classify',
    nodeId: NODE_C11_HIST_030,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───────────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: If Viceroy Irwin issues a declaration stating Dominion Status is India’s "natural destiny" without offering any timeline or date, how will the younger Congress leadership react at Lahore?',
    options: [
      'They will celebrate and dissolve all protest committees',
      'They will reject Dominion Status entirely and demand Poorna Swaraj (Complete Independence)',
      'They will offer to join the British Army in large numbers',
      'They will agree to wait another 25 years without any agitation',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now inspect milestone year 1929 below to verify how Jawaharlal Nehru hoisted the tricolour on the Ravi.',
    nodeId: NODE_C11_HIST_027,
  },
];

// ─── OBSERVATION QUESTIONS ──────────────────────────────────────────────────
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the geographic enclosure of Jallianwala Bagh from the tactical map?',
    observableOptions: [
      'It had four wide avenues allowing instant dispersion in all directions',
      'It was an enclosed space with high compound walls and only one narrow exit blocked by troops',
      'It was an open riverfront with continuous boat access for escape',
      'It was a fortified military citadel occupied by armed insurgents',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_HIST_022,
  },
  {
    question: 'What key pattern emerges from the 1937 Provincial Election results across British India?',
    observableOptions: [
      'The Muslim League swept every province including Punjab and Bengal outright',
      'The Congress secured absolute majorities in 7 out of 11 provinces, proving mass anti-colonial support',
      'No party won any seats and the British Governors ruled all provinces directly',
      'The Princely States voted unanimously to form an All-India Federation',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_HIST_030,
  },
];

// ─── REAL WORLD ACTIVITY ────────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'Constitutional & Archival Fieldwork: Tracing Republic Roots',
  description:
    'Compare the fundamental rights charter of the 1928 Nehru Report with Part III of the Constitution of India (1950), or trace how Articles 330 & 332 reflect the 1932 Poona Pact framework.',
  steps: [
    'Examine how the 26 January date chosen at the Lahore Session (1929) became India’s Republic Day in 1950.',
    'Map the 240-mile route from Sabarmati Ashram to Dandi and identify contemporary salt satyagraha memorials.',
    'Draft a 150-word analytical memorandum on why provincial autonomy under the 1935 Act proved to be a dress rehearsal for parliamentary democracy.',
  ],
};

// ─── COMPREHENSIVE CHALLENGES LIST ──────────────────────────────────────────
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C11_HIST_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Where and when did Mahatma Gandhi establish the Satyagraha Sabha to organize the nationwide protest against the Rowlatt Act?',
    options: [
      'Bombay, February 1919',
      'Calcutta, September 1920',
      'Amritsar, April 1919',
      'Ahmedabad, March 1918'
    ],
    correctIndex: 0,
    explanation: 'Gandhi founded the Satyagraha Sabha in Bombay in February 1919, issuing a satyagraha pledge committing signatories to disobey the Rowlatt Act peacefully.',
    hints: [
      'Think of the western commercial capital where Gandhi gathered Patel and Naidu.',
      'The month preceded the planned April hartal.',
      'It was founded in Bombay in February 1919.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C11_HIST_022,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How do the casualty estimates of the Jallianwala Bagh Massacre recorded by the official Hunter Committee compare with the Congress Inquiry Committee led by C.R. Das?',
    options: [
      'Hunter report claimed 379 killed; Congress inquiry estimated over 1,000 deaths',
      'Hunter report claimed over 5,000 killed; Congress inquiry claimed only 50',
      'Both committees officially agreed on exactly 22 casualties',
      'The Hunter Committee stated zero casualties occurred'
    ],
    correctIndex: 0,
    explanation: 'The official Hunter Committee acknowledged 379 deaths to minimize colonial culpability, whereas the Indian National Congress inquiry led by C.R. Das documented over 1,000 deaths, corroborated by Amritsar municipal cremation logs.',
    hints: [
      'Colonial inquiries routinely downplayed atrocity tolls.',
      'The official figure was under 400, while the nationalist inquiry found more than triple that number.',
      'The figures are 379 (Hunter) vs. >1,000 (Congress).'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C11_HIST_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who were the two brothers at the forefront of the Khilafat Committee formed in Bombay in March 1919?',
    options: [
      'Maulana Mohammad Ali and Maulana Shaukat Ali',
      'Syed Ahmad Khan and Chiragh Ali',
      'Liaquat Ali Khan and Muhammad Ali Jinnah',
      'Badruddin Tyabji and Hakim Ajmal Khan'
    ],
    correctIndex: 0,
    explanation: 'The Ali Brothers — Maulana Mohammad Ali and Maulana Shaukat Ali — founded the Khilafat Committee in Bombay in March 1919 alongside Abul Kalam Azad and Hakim Ajmal Khan.',
    hints: [
      'They are popularly remembered as the Ali Brothers.',
      'One edited the Comrade journal; both were imprisoned during WWI.',
      'Their names are Mohammad Ali and Shaukat Ali.'
    ],
  },
  {
    id: 'ch_04',
    nodeId: NODE_C11_HIST_028,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Place the correct historical actors and flashpoints on the Civil Disobedience map coordinates.',
    dragItems: [
      { label: 'Dandi (Salt Law)', targetId: 'spot_dandi' },
      { label: 'Dharasana (Sarojini Naidu)', targetId: 'spot_dharasana' },
      { label: 'Sabarmati (March Origin)', targetId: 'spot_sabarmati' },
      { label: 'Peshawar (Khan Abdul Ghaffar Khan)', targetId: 'spot_peshawar' },
    ],
    correctMapping: {
      spot_dandi: 'Dandi (Salt Law)',
      spot_dharasana: 'Dharasana (Sarojini Naidu)',
      spot_sabarmati: 'Sabarmati (March Origin)',
      spot_peshawar: 'Peshawar (Khan Abdul Ghaffar Khan)',
    },
    explanation: 'Gandhi marched 240 miles from Sabarmati to Dandi (March-April 1930). Sarojini Naidu led the heroic non-violent raid on Dharasana Salt Works in May 1930, while Khudai Khidmatgars led civil disobedience in Peshawar.',
    hints: [
      'Sabarmati is the starting ashram near Ahmedabad.',
      'Dandi is the coastal village where salt was picked up on 6 April.',
      'Dharasana was raided on 21 May 1930.'
    ],
  },
  {
    id: 'ch_05',
    nodeId: NODE_C11_HIST_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which tragic incident on 5 February 1922 in Gorakhpur district prompted Gandhi to suspend the Non-Cooperation Movement?',
    options: [
      'Chauri Chaura incident (22 policemen killed)',
      'Jallianwala Bagh massacre',
      'Kakori train action',
      'Lahore lathi charge'
    ],
    correctIndex: 0,
    explanation: 'At Chauri Chaura on 5 February 1922, after police fired on demonstrators, an enraged crowd burnt the police station killing 22 policemen. Gandhi suspended the movement on 12 February 1922.',
    hints: [
      'It occurred in Gorakhpur district, UP.',
      'A police station was set on fire after police provoked the crowd.',
      'It is the Chauri Chaura incident.'
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C11_HIST_024,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Order the initial stages of the Non-Cooperation programme as structured in 1920–1921.',
    sortItems: [
      'Surrender of government titles and honorary offices',
      'Boycott of government schools, colleges, and law courts',
      'Boycott of foreign cloth & public bonfires of imported textiles',
      'Mass refusal to pay taxes (final stage, never fully initiated)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The programme was structured systematically: starting with symbolic surrenders of titles, moving to institutional and judicial boycotts, economic boycott of foreign goods, and culminating in tax refusal.',
    hints: [
      'Titles like Kaiser-i-Hind and Knighthoods were surrendered first.',
      'Schools and court boycotts came before mass picketing of foreign cloth.',
      'No-tax campaigns were planned as the ultimate climactic step.'
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C11_HIST_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who was the British Secretary of State for India who appointed the all-British Simon Commission two years ahead of schedule?',
    options: [
      'Lord Birkenhead',
      'Lord Morley',
      'Sir Stafford Cripps',
      'Lord Mountbatten'
    ],
    correctIndex: 0,
    explanation: 'Lord Birkenhead appointed the Indian Statutory Commission under Sir John Simon on 8 November 1927, deliberately excluding Indian representatives.',
    hints: [
      'He famously challenged Indians to produce a constitution of their own.',
      'His name begins with B.',
      'It was Lord Birkenhead.'
    ],
  },
  {
    id: 'ch_08',
    nodeId: NODE_C11_HIST_021,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If a modern legal analyst examines the Anarchical and Revolutionary Crimes Act of 1919 (Rowlatt Act), which fundamental democratic protection was most flagrantly violated?',
    options: [
      'Right to fair trial without indefinite detention & Habeas Corpus',
      'Right to free international maritime navigation',
      'Right to mint gold coins in provincial banks',
      'Right to compulsory military conscription'
    ],
    correctIndex: 0,
    explanation: 'The Rowlatt Act allowed preventive detention without trial for up to two years, in camera proceedings, and censorship, destroying Habeas Corpus and due process.',
    hints: [
      'The popular slogan was: "No Dalil, No Vakil, No Appeal".',
      'It allowed holding people in prison without putting them in front of a court.',
      'It violated Habeas Corpus and fair trial guarantees.'
    ],
  },
  {
    id: 'ch_09',
    nodeId: NODE_C11_HIST_022,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Analyze why General Dyer’s testimony before the Hunter Committee proved that the Jallianwala firing was premeditated terror rather than accidental crowd management.',
    options: [
      'He testified his objective was to "produce a moral effect" across Punjab and admitted he would have used machine guns if the entrance allowed',
      'He claimed his riflemen fired purely in personal self-defence against artillery',
      'He apologized immediately and funded hospital treatment for all victims',
      'He claimed he was given forged orders by local municipal officials'
    ],
    correctIndex: 0,
    explanation: 'Dyer explicitly admitted before the Hunter Committee that his purpose was to punish and terrify Punjab to produce a "moral effect", showing calculated colonial state terror.',
    hints: [
      'Look for Dyer’s famous quote regarding the psychological impact across the province.',
      'He admitted he blocked the only gate without issuing any dispersal warning.',
      'He aimed to create a "moral effect" and terrorize the population.'
    ],
  },
  {
    id: 'ch_10',
    nodeId: NODE_C11_HIST_028,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the total mileage walked by Gandhi and his 78 satyagrahis from Sabarmati Ashram to Dandi between 12 March and 6 April 1930 (in miles):',
    correctAnswer: 240,
    tolerance: 5,
    unit: 'miles',
    explanation: 'The Dandi March covered 240 miles through 48 villages over 24 days, averaging roughly 10 miles per day.',
    hints: [
      'The journey lasted 24 days.',
      'They covered approximately 10 miles each day.',
      'The exact total recorded in history is 240 miles.'
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C11_HIST_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did Muhammad Ali Jinnah and the Muslim League reject the Nehru Report of August 1928, leading to Jinnah’s Fourteen Points in March 1929?',
    options: [
      'The Nehru Report recommended joint electorates with reserved seats rather than retaining separate electorates',
      'The Nehru Report demanded the immediate expulsion of all minority communities',
      'The Nehru Report refused to grant fundamental rights to women',
      'The Nehru Report demanded that British Governors retain absolute veto power'
    ],
    correctIndex: 0,
    explanation: 'The Nehru Report proposed joint electorates with reservations for minorities to foster national unity. Jinnah insisted on separate electorates and 1/3rd central legislature reservation, which the All Parties Conference rejected.',
    hints: [
      'The conflict centered on how minority votes should be cast.',
      'Nehru Report favoured Joint Electorates; Jinnah demanded Separate Electorates.',
      'The core issue was Joint vs. Separate Electorates.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_12',
    nodeId: NODE_C11_HIST_027,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Chronologically arrange the crucial steps leading from the 1928 ultimatum to the launch of Civil Disobedience.',
    sortItems: [
      'Calcutta Congress passes 1-year ultimatum for Dominion Status (Dec 1928)',
      'Lord Irwin issues vague declaration on Dominion Status without a date (Oct 1929)',
      'Lahore Session passes Poorna Swaraj Resolution & hoists tricolour (Dec 1929)',
      'Nationwide reading of the Independence Pledge on 26 January 1930',
      'Gandhi launches Dandi March with 78 volunteers from Sabarmati (12 March 1930)'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'When the 1-year Calcutta deadline expired after Irwin’s vague October declaration, Lahore declared Poorna Swaraj in Dec 1929, observed 26 Jan 1930 as Independence Day, and launched the Salt March in March 1930.',
    hints: [
      'The 1-year ultimatum was set in Dec 1928 at Calcutta.',
      'Irwin made his vague statement in October 1929 before the Lahore Congress.',
      'The Dandi March followed after the 26 January 1930 pledge.'
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C11_HIST_028,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Which of the following was a concrete concession secured by the nationalist movement in the Gandhi-Irwin Pact of 5 March 1931?',
    options: [
      'Permission for coastal residents to manufacture salt for personal domestic use & release of non-violent political prisoners',
      'Immediate complete withdrawal of all British military personnel from India',
      'Transfer of foreign affairs and defense to provincial ministers',
      'Abolition of the Viceroyalty and conversion of India into a republic'
    ],
    correctIndex: 0,
    explanation: 'The Gandhi-Irwin Pact permitted domestic salt manufacturing along coastlines, released non-violent political prisoners, returned confiscated lands, and enabled Congress to attend the 2nd Round Table Conference.',
    hints: [
      'The British did not give up defense or crown rule in 1931.',
      'It granted relief to coastal salt-makers and released thousands of jailed satyagrahis.',
      'Domestic salt collection and prisoner release were the key terms.'
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C11_HIST_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Evaluate how the Poona Pact of 24 September 1932 resolved the crisis provoked by Ramsay MacDonald’s Communal Award.',
    options: [
      'It abolished separate electorates for Depressed Classes and replaced them with 148 reserved seats within a joint electorate',
      'It eliminated all political representation for lower castes in provincial assemblies',
      'It granted Dr. Ambedkar the authority to appoint all provincial governors',
      'It divided British India into two separate sovereign dominions immediately'
    ],
    correctIndex: 0,
    explanation: 'Signed in Yerwada Jail between Gandhi and Ambedkar, the Poona Pact replaced separate electorates with 148 reserved seats in provincial legislatures within a unified joint electorate.',
    hints: [
      'Gandhi fasted because he believed separate electorates would permanently fragment Hindu society.',
      'Ambedkar secured more than double the number of seats offered in the Communal Award (148 vs 71).',
      'The mechanism was reserved seats in a joint electorate.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_15',
    nodeId: NODE_C11_HIST_030,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How did the Government of India Act 1935 fundamentally alter the distribution of power between provincial and central levels compared to the 1919 Act?',
    options: [
      'It abolished diarchy in the provinces to grant Provincial Autonomy, while introducing a (never-implemented) diarchy at the Centre',
      'It abolished all provincial legislatures and concentrated total executive power in district magistrates',
      'It removed all emergency override powers from British Governors',
      'It made the British House of Lords the direct municipal council of Bombay and Calcutta'
    ],
    correctIndex: 0,
    explanation: 'The 1935 Act abolished the hated provincial diarchy of 1919, establishing responsible government across 11 provinces, but proposed diarchy at the Centre that never took effect because princely states refused federation.',
    hints: [
      'Remember what happened to diarchy: it moved from the provinces up to the Centre.',
      'Elected Indian ministers took control of all provincial departments including police.',
      'Provincial autonomy replaced provincial diarchy.'
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C11_HIST_021,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the historical cause-and-effect chain explaining why Gandhi suspended the Rowlatt Satyagraha in April 1919.',
    availableParts: [
      'Rowlatt Act passed without trial provisions',
      'Gandhi founds Satyagraha Sabha & calls 6 April Hartal',
      'Police firing in Delhi & Mill unrest in Ahmedabad break non-violent discipline',
      'Gandhi declares Himalayan Miscalculation & suspends movement (18 April 1919)'
    ],
    targetState:
      'Rowlatt Act passed without trial provisions -> Gandhi founds Satyagraha Sabha & calls 6 April Hartal -> Police firing in Delhi & Mill unrest in Ahmedabad break non-violent discipline -> Gandhi declares Himalayan Miscalculation & suspends movement (18 April 1919)',
    validationHint: 'Order the parts from the imperial legislative trigger to the moral suspension.',
    explanation: 'The passage of the repressive Rowlatt Act led to the Satyagraha Sabha and the 6 April Hartal. When violence broke out at Delhi and Ahmedabad, Gandhi preserved moral discipline by suspending the movement on 18 April 1919.',
    hints: [
      'Start with the passage of the repressive Act.',
      'Follow with the founding of the Sabha and the nationwide hartal.',
      'End with the violence and the suspension.'
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C11_HIST_024,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Historians like Judith Brown and Bipan Chandra argue that Gandhi’s withdrawal of Non-Cooperation after Chauri Chaura was a strategic masterstroke rather than weakness because:',
    options: [
      'It preserved the moral capital and discipline of the national movement, preventing a brutal colonial counter-massacre that would crush future struggles',
      'It allowed Gandhi to retire permanently from politics and hand over leadership to the British Crown',
      'It was done secretly to allow Congress leaders to join the British Viceroy executive council',
      'It proved that armed revolution was the only viable path for the Congress'
    ],
    correctIndex: 0,
    explanation: 'By refusing to let the movement slip into uncoordinated rural violence, Gandhi denied the British military a pretext to crush the nationalist organization through overwhelming violence, preserving moral authority for 1930.',
    hints: [
      'Consider the vulnerability of unarmed mass movements when they turn violent against a heavily armed colonial state.',
      'Gandhi understood that moral high ground was the primary weapon against the empire.',
      'It protected the movement from total military annihilation and preserved discipline.'
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C11_HIST_026,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Compare the ideological split inside Congress during 1928–1929 between the elder leadership (Motilal Nehru) and younger radicals (Jawaharlal Nehru & Subhas Chandra Bose).',
    options: [
      'Elder leaders sought Dominion Status within the Commonwealth; younger radicals insisted on immediate Complete Independence (Poorna Swaraj)',
      'Elder leaders wanted armed guerrilla warfare; younger radicals wanted only prayer petitions',
      'Elder leaders wanted to restore Mughal rule; younger radicals wanted direct British rule',
      'Elder leaders supported separate electorates; younger radicals opposed all elections'
    ],
    correctIndex: 0,
    explanation: 'Motilal Nehru’s generation drafted the 1928 Report aiming for Dominion Status like Canada. Younger leaders Jawaharlal Nehru and Subhas Bose formed the Independence for India League to demand total separation.',
    hints: [
      'Notice the difference between Dominion Status and Poorna Swaraj.',
      'The younger generation saw Dominion Status as accepting British imperial sovereignty.',
      'Motilal favoured Dominion Status; Jawaharlal and Subhas demanded Poorna Swaraj.'
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C11_HIST_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In the 1937 provincial elections, how did the non-Congress ministries in Bengal and Punjab reflect regional cross-communal coalitions?',
    options: [
      'Bengal was governed by Fazlul Haq’s Krishak Praja Party coalition; Punjab by Sikandar Hayat Khan’s Unionist Party',
      'Both provinces were governed directly by the Communist Party of Great Britain',
      'Both provinces were won by the Hindu Mahasabha with 100% majorities',
      'Both provinces chose to secede from India in 1937'
    ],
    correctIndex: 0,
    explanation: 'In Bengal, A.K. Fazlul Haq formed a coalition with the League, while in Punjab, the Unionist Party under Sikandar Hayat Khan represented a cross-communal landlord coalition, keeping Congress out.',
    hints: [
      'Fazlul Haq led the peasant-oriented Krishak Praja Party in Bengal.',
      'Sikandar Hayat Khan led the agrarian Unionist Party in Punjab.',
      'They formed regional coalitions that blocked both Congress and orthodox League domination in 1937.'
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C11_HIST_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'What profound constitutional crisis occurred on 3 September 1939 that prompted all Congress ministries to resign en masse on 10 November 1939?',
    options: [
      'Viceroy Lord Linlithgow unilaterally declared India at war with Germany without consulting the elected provincial ministries',
      'The British Parliament passed an Act abolishing all Indian municipal taxes',
      'Gandhi ordered the disbanding of all provincial civil services',
      'The League and Congress agreed to merge into a single unitary party'
    ],
    correctIndex: 0,
    explanation: 'Linlithgow dragged India into World War II without consulting the elected representatives of 300 million Indians. Congress ministries resigned in protest against this supreme imperial unilateralism.',
    hints: [
      'World War II broke out in September 1939.',
      'The Viceroy treated Indian autonomy as irrelevant in imperial foreign policy.',
      'India was committed to war without Indian consent.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_21',
    nodeId: NODE_C11_HIST_030,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Out of the 1,161 total provincial assembly seats contested in the 1937 elections, how many seats did the Indian National Congress win across India?',
    correctAnswer: 716,
    tolerance: 5,
    unit: 'seats',
    explanation: 'Congress won a landslide 716 out of 1,161 seats, securing outright majorities in 7 of the 11 provinces (Madras, Bombay, UP, Bihar, CP, Orissa, NWFP).',
    hints: [
      'Congress won well over 60% of all contested seats.',
      'The number is between 700 and 730.',
      'The exact historical figure is 716 seats.'
    ],
  },
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
function C11_HistorySatyagrahaAgainstRowlattSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_HIST_021,
  title = DEFAULT_PROPS.title || 'Satyagraha & Mass Nationalism (1919–1939)',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // Subject Config
  const subjectConfig = SUBJECT_CONFIG['history'] || {
    name: 'History',
    emoji: '📜',
    color: 'amber',
  };

  // Phase state: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant-style Interactive Exploration state
  const [activeDossier, setActiveDossier] = useState<'rowlatt' | 'pledge' | 'hartal'>('rowlatt');
  const [hunterCasualtySlider, setHunterCasualtySlider] = useState(379);
  const [nonCooperationIntensity, setNonCooperationIntensity] = useState(60);
  const [khilafatUnityLevel, setKhilafatUnityLevel] = useState(75);
  const [constitutionalYear, setConstitutionalYear] = useState(1928);
  const [electoralMajorityProvince, setElectoralMajorityProvince] = useState<string>('Madras');

  // Predict-then-check & Observation state
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [, setObservationIndex] = useState(-1);

  // Adaptive difficulty & Mastery
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

  // Challenge Drag-Drop / Sort / Numeric / Construct state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual & Feedback state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [selectedWrongIdx, setSelectedWrongIdx] = useState<number | null>(null);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Primary source document analyzer state
  const [selectedDocId, setSelectedDocId] = useState<'pledge1919' | 'tagore1919' | 'irwin1929' | 'poona1932'>('pledge1919');

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gsapTimelineRef = useRef<HTMLDivElement | null>(null);

  // ─── FILTERED CHALLENGES ──────────────────────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ────────────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPT DIFFICULTY ON BKT UPDATE ───────────────────────────────────────
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

  // ─── CANVAS 2D ANIMATION EFFECT ───────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const render = () => {
      tick += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height / 2 + Math.sin(x * 0.02 + tick) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const nodeX = (Math.sin(tick) * 0.5 + 0.5) * (canvas.width - 40) + 20;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(nodeX, canvas.height / 2, 4, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── GSAP PROCESS TIMELINE ANIMATION ──────────────────────────────────────
  useEffect(() => {
    if (gsapTimelineRef.current) {
      gsap.fromTo(
        gsapTimelineRef.current.querySelectorAll('.timeline-node'),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [currentSlide, phase]);

  // ─── HANDLERS ─────────────────────────────────────────────────────────────
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
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
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Spot on! Gandhi withdrew the movement to uphold Ahimsa.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the strategic turning points of the national struggle.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter the free historical sandbox. Manipulate the parameters without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Prepare for the historical mastery challenges.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded. Now verify it with the historical record.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[1].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent historical observation!' : 'Re-examine the evidence carefully.');
  }, []);

  const handleDossierSelect = useCallback((type: 'rowlatt' | 'pledge' | 'hartal') => {
    setActiveDossier(type);
    audioManager.play('tap');
  }, []);

  const handleConstitutionalYearChange = useCallback((year: number) => {
    setConstitutionalYear(year);
    audioManager.play('tap');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Satyagraha & Mass Nationalism simulation.');
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
    setSelectedWrongIdx(null);
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
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setSelectedWrongIdx(null);
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct analysis! Well done.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(bktStateRef.current));
        }
      } else {
        if (typeof answer === 'number') {
          setSelectedWrongIdx(answer);
        }
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
          speechManager.speak('Let us review the archival explanation together.');
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
    [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]
  );

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

  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        if (prev.length === 0 && challenge.sortItems) {
          prev = challenge.sortItems.map((_, i) => i);
        }
        const arr = [...prev];
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0
        ? sortArrangement
        : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleSelectDoc = useCallback((docId: 'pledge1919' | 'tagore1919' | 'irwin1929' | 'poona1932') => {
    setSelectedDocId(docId);
    audioManager.play('tap');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Primary source text database
  const PRIMARY_DOCS = {
    pledge1919: {
      title: 'Satyagraha Sabha Pledge (Bombay, February 1919)',
      text:
        'Being conscientiously of opinion that the Bills known as the Indian Criminal Law (Amendment) Bill No. I of 1919 and No. II of 1919 are unjust, subversive of the principles of liberty and justice... we solemnly affirm that in the event of these Bills becoming law... we shall refuse civilly to obey these laws... and we further affirm that in this struggle we will faithfully follow truth and refrain from violence to life, person or property.',
      significance:
        'Signed by Gandhi, Vallabhbhai Patel, Sarojini Naidu, and C.R. Das, establishing non-violent civil disobedience as a national pledge.',
    },
    tagore1919: {
      title: 'Rabindranath Tagore’s Letter to the Viceroy (30 May 1919)',
      text:
        'The enormity of the measures taken by the Government in the Punjab for quelling some local disturbances has, with a rude shock, revealed to our minds the helplessness of our position as British subjects in India... The time has come when badges of honour make our shame glaring in their incongruous context of humiliation, and I for my part wish to stand, shorn of all special distinctions, by the side of those of my countrymen who, for their so-called insignificance, are liable to suffer a degradation not fit for human beings.',
      significance:
        'Tagore formally renounced his Knighthood, giving global moral weight to the outrage against Jallianwala Bagh.',
    },
    irwin1929: {
      title: 'Viceroy Lord Irwin’s Declaration (31 October 1929)',
      text:
        'I am authorized on behalf of His Majesty’s Government to state clearly that in their judgment it is implicit in the declaration of 1917 that the natural issue of India’s constitutional progress, as there contemplated, is the attainment of Dominion Status... but no date or fixed schedule can at present be formulated.',
      significance:
        'The absence of a firm timetable directly provoked the historic Poorna Swaraj resolution at the Lahore Session two months later.',
    },
    poona1932: {
      title: 'The Poona Pact Agreement (Yerwada Jail, 24 September 1932)',
      text:
        '1. There shall be seats reserved for the Depressed Classes out of the general electorate seats in the Provincial Legislatures as follows: Madras 30; Bombay with Sind 15; Punjab 8; Bihar and Orissa 18; Central Provinces 20; Assam 7; Bengal 30; United Provinces 20. Total 148 seats. Election to these seats shall be by joint electorates.',
      significance:
        'Replaced separate electorates with 148 reserved seats within a joint electorate, setting the foundational template for Articles 330 & 332 in Independent India.',
    },
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ──────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
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
              <span className="text-xs uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                ISC Class 11 • {subjectConfig.name}
              </span>
              <span className="text-xs text-slate-500 font-mono">1919–1939</span>
            </div>
            <h1 className="text-lg md:text-xl font-extrabold text-white mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Controls */}
        <div className="flex items-center gap-2" role="toolbar" aria-label="Simulation Phase Navigation">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              aria-label={`Switch to ${p} phase`}
              className={`text-xs px-3 py-1.5 rounded-xl font-semibold capitalize transition-all ${
                phase === p
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ────────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          {/* Narrative Scenario Card */}
          <motion.div
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-700/40 relative overflow-hidden"
          >
            <div className="absolute -right-10 -bottom-10 opacity-10 text-9xl">📜</div>
            <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
              <span>🏛️</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-amber-400/90 mt-3 font-medium bg-amber-950/60 p-2.5 rounded-xl border border-amber-800/40">
              ⚡ <span className="font-bold">Investigation Task:</span> {SCENARIO.context}
            </p>
          </motion.div>

          {/* Discovery Question Card */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                Archival Curiosity Hook
              </span>
              <span className="text-xs text-slate-400">Low-Stakes Discovery • Not Graded</span>
            </div>

            <p className="text-base md:text-lg font-semibold text-white leading-relaxed">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/40 border border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-slate-200 hover:border-amber-500/50'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-slate-700/60 text-center leading-6 text-xs font-bold mr-2">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                  {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex && (
                    <span className="ml-2 text-emerald-400 font-bold">✓ Correct</span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-3"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Excellent deduction! Gandhi placed moral discipline above political opportunism.'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    aria-label="Enter Interactive Archive Exploration"
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center gap-2"
                  >
                    Enter Interactive Archive →
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: EXPLORE (Interactive Laboratory) ────────────────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Selector Pills */}
          <div className="flex items-center justify-between overflow-x-auto pb-2 gap-2 border-b border-slate-800/80">
            {EXPLORATION_STEPS.map((step, sIdx) => (
              <motion.button
                key={sIdx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(sIdx);
                  audioManager.play('tap');
                }}
                aria-label={`Jump to Exploration Lab ${sIdx + 1}: ${step.title}`}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  currentSlide === sIdx
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span>{sIdx + 1}.</span> {step.title.split('.')[1] || step.title}
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
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-amber-300">
                    {EXPLORATION_STEPS[currentSlide].title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                    👉 {EXPLORATION_STEPS[currentSlide].instruction}
                  </p>
                </div>
                <span className="text-xs font-mono text-amber-400/80 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>

              {/* ─── VISUALIZATION INTERACTION 1: Rowlatt Dossier Explorer ────── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { id: 'rowlatt' as const, title: '1. The Rowlatt Act (1919)', sub: 'Anarchical Crimes Act' },
                      { id: 'pledge' as const, title: '2. Satyagraha Sabha', sub: 'Bombay Pledge' },
                      { id: 'hartal' as const, title: '3. Nationwide Hartal', sub: '6 April Fasting' },
                    ].map((d) => (
                      <motion.button
                        key={d.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDossierSelect(d.id)}
                        aria-label={`Select Archival Dossier: ${d.title}`}
                        className={`p-3.5 rounded-xl text-left border transition-all ${
                          activeDossier === d.id
                            ? 'bg-amber-950/50 border-amber-500 text-amber-200 shadow-lg'
                            : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:border-slate-600'
                        }`}
                      >
                        <p className="text-xs font-bold uppercase tracking-wide text-amber-400">{d.sub}</p>
                        <p className="text-sm font-semibold mt-1 text-white">{d.title}</p>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[180px] flex flex-col justify-center">
                    {activeDossier === 'rowlatt' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                          <span>⚠️</span> Imperial Wartime Powers Extended into Peacetime
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Passed in March 1919 under Sir Sidney Rowlatt, this law authorized imprisonment without trial for up to 2 years, secret in-camera trials without juries, and restrictions on civil liberties. Popularly condemned as: <em>"No Dalil, No Vakil, No Appeal"</em>.
                        </p>
                      </motion.div>
                    )}
                    {activeDossier === 'pledge' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                          <span>✍️</span> Satyagraha Sabha Formed (Bombay, Feb 1919)
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Gandhi mobilized Sarojini Naidu, Vallabhbhai Patel, and C.R. Das in Bombay. The Sabha issued a binding pledge to disobey the Act non-violently and court arrest willingly.
                        </p>
                      </motion.div>
                    )}
                    {activeDossier === 'hartal' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                          <span>🕊️</span> 6 April 1919: The First All-India Hartal
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Gandhi called for a nationwide day of fasting, prayer, and shuttered shops across Bombay, Delhi, Calcutta, and Madras. When violence erupted in Delhi (30 March) and Ahmedabad (11 April), Gandhi suspended it on 18 April 1919 as a "Himalayan miscalculation".
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── VISUALIZATION INTERACTION 2: Jallianwala Bagh (SVG 1) ────── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* SVG 1: Tactical Map with Dynamic Casualty Density */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="text-xs font-semibold text-slate-400 mb-2">
                      SVG 1: Tactical Enclosure Map — Jallianwala Bagh (13 April 1919)
                    </p>
                    <svg viewBox="0 0 600 240" className="w-full h-48 bg-slate-900 rounded-lg" role="img" aria-label="Tactical map of Jallianwala Bagh showing walled compound and blocked entrance">
                      {/* High Walled Compound */}
                      <rect x="30" y="20" width="540" height="200" rx="8" fill="#1e1b18" stroke="#78350f" strokeWidth="4" />
                      <text x="300" y="38" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">HIGH CONTINUOUS BRICK WALLS (10 FEET HIGH — NO PERIMETER ESCAPE)</text>
                      
                      {/* Martyrs Well */}
                      <circle cx="150" cy="120" r="24" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                      <text x="150" y="124" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">Shaheedi Kuan</text>

                      {/* Dynamic Casualty & Crowd Representation */}
                      <g opacity="0.85">
                        {Array.from({ length: Math.min(24, Math.floor(hunterCasualtySlider / 45)) }).map((_, i) => {
                          const cx = 220 + (i % 6) * 55 + Math.sin(i) * 12;
                          const cy = 70 + Math.floor(i / 6) * 35;
                          return (
                            <circle
                              key={i}
                              cx={cx}
                              cy={cy}
                              r={hunterCasualtySlider > 700 ? 12 : 9}
                              fill={hunterCasualtySlider > 800 ? '#ef4444' : '#d97706'}
                              opacity={0.7}
                            />
                          );
                        })}
                        <text x="360" y="130" textAnchor="middle" fill="#fef3c7" fontSize="11" fontWeight="bold">
                          {hunterCasualtySlider >= 1000 ? 'Congress Inquiry: 1,000+ Fatalities Documented' : `Toll Gauge: ${hunterCasualtySlider} Casualties`}
                        </text>
                      </g>

                      {/* Sole Entrance & Dyer Firing Line */}
                      <rect x="260" y="215" width="80" height="15" fill="#dc2626" />
                      <text x="300" y="235" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">SOLE BLOCKED ENTRANCE (50 RIFLEMEN)</text>
                      <path d="M 300 215 L 180 130 M 300 215 L 360 110 M 300 215 L 480 130" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
                    </svg>
                  </div>

                  {/* Casualty Toll Slider Comparison */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Casualty Toll Metric: <strong className="text-amber-400">{hunterCasualtySlider} Deaths</strong></span>
                      <span className="text-slate-500 font-mono">Hunter (379) ↔ Congress Inquiry (&gt;1,000)</span>
                    </div>
                    <input
                      type="range"
                      min={379}
                      max={1200}
                      value={hunterCasualtySlider}
                      aria-label="Adjust casualty estimation metric from Hunter report to Congress inquiry"
                      onChange={(e) => {
                        setHunterCasualtySlider(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                      <span>Official Colonial Estimate: 379</span>
                      <span>Municipal Cremation & Congress Estimate: 1,000+</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── VISUALIZATION INTERACTION 3: Khilafat & Non-Cooperation (SVG 2) */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* SVG 2: Khilafat-Non-Cooperation Mobilization & Swadeshi Surge */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="text-xs font-semibold text-slate-400 mb-2">
                      SVG 2: Mass Agitation Dynamics — Khilafat & Non-Cooperation Alliance (1920–1922)
                    </p>
                    <svg viewBox="0 0 600 220" className="w-full h-48 bg-slate-900 rounded-lg" role="img" aria-label="Visual representation of Hindu Muslim unity and boycott strength">
                      {/* Background Bars */}
                      <rect x="40" y="30" width="240" height="150" rx="10" fill="#022c22" stroke="#059669" strokeWidth="2" />
                      <text x="160" y="55" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="bold">Cross-Communal Khilafat Unity</text>
                      
                      {/* Dynamic Gauge Fill for Unity */}
                      <rect x="60" y="75" width="200" height="24" rx="6" fill="#064e3b" />
                      <rect x="60" y="75" width={`${(khilafatUnityLevel / 100) * 200}`} height="24" rx="6" fill="#10b981" />
                      <text x="160" y="91" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                        {khilafatUnityLevel}% Joint Mobilization
                      </text>

                      {/* Unity Alliance Label */}
                      <text x="160" y="130" textAnchor="middle" fill="#a7f3d0" fontSize="10">
                        Ali Brothers (Shaukat & Mohammad) + Mahatma Gandhi
                      </text>
                      <text x="160" y="150" textAnchor="middle" fill="#6ee7b7" fontSize="10">
                        Combined anti-Treaty of Sèvres & Rowlatt protests
                      </text>

                      {/* Swadeshi & Boycott Panel */}
                      <rect x="320" y="30" width="240" height="150" rx="10" fill="#451a03" stroke="#d97706" strokeWidth="2" />
                      <text x="440" y="55" textAnchor="middle" fill="#fde68a" fontSize="12" fontWeight="bold">Swadeshi & Boycott Index</text>

                      {/* Dynamic Gauge Fill for Boycott */}
                      <rect x="340" y="75" width="200" height="24" rx="6" fill="#78350f" />
                      <rect x="340" y="75" width={`${(nonCooperationIntensity / 100) * 200}`} height="24" rx="6" fill="#f59e0b" />
                      <text x="440" y="91" textAnchor="middle" fill="#1e1b18" fontSize="11" fontWeight="bold">
                        {nonCooperationIntensity}% Boycott Intensity
                      </text>

                      {/* Charkha Icon Representation */}
                      <circle cx="440" cy="140" r="22" fill="#78350f" stroke="#fbbf24" strokeWidth="2" />
                      <line x1="440" y1="118" x2="440" y2="162" stroke="#fbbf24" strokeWidth="2" />
                      <line x1="418" y1="140" x2="462" y2="140" stroke="#fbbf24" strokeWidth="2" />
                      <text x="440" y="178" textAnchor="middle" fill="#fef3c7" fontSize="9">Khadi & Boycott of Foreign Cloth</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Slider 1: Boycott Intensity */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-semibold">Institutional Boycott Intensity:</span>
                        <span className="text-amber-400 font-bold">{nonCooperationIntensity}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={nonCooperationIntensity}
                        aria-label="Adjust institutional boycott intensity"
                        onChange={(e) => {
                          setNonCooperationIntensity(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                      <p className="text-[11px] text-slate-400">
                        Higher boycott prompted founding of Jamia Millia Islamia & Gujarat Vidyapith (1920).
                      </p>
                    </div>

                    {/* Slider 2: Hindu-Muslim Unity */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-semibold">Khilafat Cross-Communal Unity:</span>
                        <span className="text-emerald-400 font-bold">{khilafatUnityLevel}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={khilafatUnityLevel}
                        aria-label="Adjust Khilafat cross-communal unity level"
                        onChange={(e) => {
                          setKhilafatUnityLevel(Number(e.target.value));
                          audioManager.play('balance');
                        }}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                      <p className="text-[11px] text-slate-400">
                        Ali Brothers and Gandhi alliance united millions against Treaty of Sèvres & Punjab wrongs.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── VISUALIZATION INTERACTION 4: Simon to Poorna Swaraj ─────── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-amber-950/40 rounded-xl border border-amber-800/60 space-y-3"
                    >
                      <p className="text-xs font-bold uppercase text-amber-400">🔮 Predict-Then-Check Investigation</p>
                      <p className="text-sm text-slate-200 font-semibold">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                        {PREDICTION_QUESTIONS[0].options.map((opt, pIdx) => (
                          <motion.button
                            key={pIdx}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(pIdx)}
                            aria-label={`Select prediction option ${pIdx + 1}: ${opt}`}
                            className="p-2.5 rounded-lg text-left text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {predictionMade && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800 text-xs text-emerald-300 flex items-center justify-between"
                    >
                      <span>✓ Prediction Recorded! {PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                      <span className="font-bold">Poorna Swaraj (Dec 1929)</span>
                    </motion.div>
                  )}

                  {/* Year Timeline Selector */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3" ref={gsapTimelineRef}>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Select Milestone Year:</span>
                      <span className="text-amber-400 font-bold font-mono text-sm">{constitutionalYear}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[1927, 1928, 1929, 1930].map((yr) => (
                        <motion.button
                          key={yr}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleConstitutionalYearChange(yr)}
                          aria-label={`Select Milestone Year ${yr}`}
                          className={`py-2 rounded-lg text-xs font-bold timeline-node ${
                            constitutionalYear === yr
                              ? 'bg-amber-500 text-slate-950 shadow-md'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {yr}
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300">
                      {constitutionalYear === 1927 && (
                        <p><strong>1927:</strong> Birkenhead appoints all-British Simon Commission. All parties unite under slogan "Simon Go Back".</p>
                      )}
                      {constitutionalYear === 1928 && (
                        <p><strong>1928:</strong> Nehru Report drafts Dominion Status constitution at Lucknow; Lala Lajpat Rai dies after Lahore lathi-charge.</p>
                      )}
                      {constitutionalYear === 1929 && (
                        <p><strong>1929:</strong> Irwin gives vague promise; Jawaharlal Nehru presides over Lahore Congress and declares Poorna Swaraj on Ravi riverbank.</p>
                      )}
                      {constitutionalYear === 1930 && (
                        <p><strong>1930:</strong> 26 January celebrated as Independence Day; Gandhi begins Dandi Salt March on 12 March.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── VISUALIZATION INTERACTION 5: 1937 Elections & Salt March (SVG 3) */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  {/* SVG 3: Dandi Salt March & 1937 Provincial Governance Architecture */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="text-xs font-semibold text-slate-400 mb-2">
                      SVG 3: Civil Disobedience & 1937 Provincial Autonomy Seat Balance
                    </p>
                    <svg viewBox="0 0 600 220" className="w-full h-48 bg-slate-900 rounded-lg" role="img" aria-label="Provincial election seat distribution chart showing 716 Congress seats out of 1161 total">
                      {/* Dandi March Route Indicator */}
                      <path d="M 50 160 Q 110 80 180 140 T 260 170" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5 5" />
                      <circle cx="50" cy="160" r="7" fill="#10b981" />
                      <text x="50" y="185" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="bold">Sabarmati</text>
                      
                      <circle cx="260" cy="170" r="7" fill="#ef4444" />
                      <text x="260" y="195" textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="bold">Dandi (240 mi)</text>
                      <text x="155" y="105" textAnchor="middle" fill="#fef3c7" fontSize="10" fontStyle="italic">78 Satyagrahis (12 Mar–6 Apr 1930)</text>

                      {/* 1937 Provincial Election Breakdown Chart */}
                      <rect x="330" y="30" width="240" height="150" rx="8" fill="#1e1b18" stroke="#334155" strokeWidth="2" />
                      <text x="450" y="52" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">1937 Provincial Assemblies</text>

                      {/* Total Seats Bar */}
                      <rect x="350" y="70" width="200" height="20" rx="4" fill="#334155" />
                      <text x="450" y="84" textAnchor="middle" fill="#94a3b8" fontSize="9">Total Contested: 1,161 Seats</text>

                      {/* Congress Landslide Majority Bar */}
                      <rect x="350" y="100" width="123" height="24" rx="4" fill="#f59e0b" />
                      <text x="410" y="116" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">Congress: 716 (61.7%)</text>
                      <text x="510" y="116" textAnchor="middle" fill="#cbd5e1" fontSize="9">Others: 445</text>

                      {/* Poona Pact Reserved Seats Indicator */}
                      <rect x="350" y="135" width="200" height="30" rx="4" fill="#0f172a" stroke="#d97706" />
                      <text x="450" y="153" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">
                        Poona Pact: 148 Reserved Seats (Joint Electorate)
                      </text>
                    </svg>
                  </div>

                  {!observationAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-amber-950/40 rounded-xl border border-amber-800/60 space-y-2"
                    >
                      <p className="text-xs font-bold uppercase text-amber-400">👁️ Historical Observation</p>
                      <p className="text-xs md:text-sm text-slate-200">{OBSERVATION_QUESTIONS[1].question}</p>
                      <div className="space-y-1.5 pt-1">
                        {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, oIdx) => (
                          <motion.button
                            key={oIdx}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(oIdx)}
                            aria-label={`Select observation answer: ${opt}`}
                            className="w-full p-2 rounded-lg text-left text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {observationAnswered && (
                    <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800 text-xs text-emerald-300">
                      ✓ Congress swept 716/1,161 seats, forming ministries in Madras, Bombay, UP, Bihar, CP, Orissa & NWFP.
                    </div>
                  )}

                  {/* Provincial Autonomy Selector */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-xs font-semibold text-slate-400">
                      Select Province to View 1937 Electoral Ministry Outcome:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Madras', 'United Provinces', 'Bombay', 'Bengal', 'Punjab'].map((prov) => (
                        <motion.button
                          key={prov}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setElectoralMajorityProvince(prov);
                            audioManager.play('tap');
                          }}
                          aria-label={`View 1937 results for ${prov}`}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                            electoralMajorityProvince === prov
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {prov}
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800">
                      {electoralMajorityProvince === 'Madras' && (
                        <p><strong className="text-emerald-400">Madras:</strong> Absolute Congress Majority. Formed ministry under C. Rajagopalachari; initiated agrarian and prison reforms.</p>
                      )}
                      {electoralMajorityProvince === 'United Provinces' && (
                        <p><strong className="text-emerald-400">United Provinces:</strong> Absolute Congress Majority under Govind Ballabh Pant; expanded primary education and Kisan Sabha tenancy reforms.</p>
                      )}
                      {electoralMajorityProvince === 'Bombay' && (
                        <p><strong className="text-emerald-400">Bombay:</strong> Congress Ministry under B.G. Kher; promoted prohibition and industrial conciliation.</p>
                      )}
                      {electoralMajorityProvince === 'Bengal' && (
                        <p><strong className="text-amber-400">Bengal:</strong> Non-Congress Coalition. A.K. Fazlul Haq’s Krishak Praja Party formed coalition with the Muslim League.</p>
                      )}
                      {electoralMajorityProvince === 'Punjab' && (
                        <p><strong className="text-amber-400">Punjab:</strong> Non-Congress Coalition. Cross-communal Unionist Party under Sikandar Hayat Khan governed the province.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next Slide Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              aria-label="Previous Exploration Lab"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-mono">
              Investigation {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('tap');
                }}
                aria-label="Next Exploration Lab"
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold shadow-md shadow-amber-500/20"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Open Historical Sandbox Archive"
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold shadow-md shadow-emerald-500/20"
              >
                Open Historical Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ──��� PHASE 3: SANDBOX (Primary Source Archive) ────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-amber-300">🏛️ Historical Document & Sandbox Archive</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select and analyze original colonial and nationalist manuscripts with no time pressure or grading.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Proceed to Challenge Phase"
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold shadow-lg shadow-amber-500/20"
              >
                Ready for Challenges! →
              </motion.button>
            </div>

            {/* Document Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { id: 'pledge1919' as const, label: '1919 Satyagraha Pledge' },
                { id: 'tagore1919' as const, label: '1919 Tagore Renunciation' },
                { id: 'irwin1929' as const, label: '1929 Irwin Declaration' },
                { id: 'poona1932' as const, label: '1932 Poona Pact' },
              ].map((doc) => (
                <motion.button
                  key={doc.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectDoc(doc.id)}
                  aria-label={`View manuscript: ${doc.label}`}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-center border transition-all ${
                    selectedDocId === doc.id
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {doc.label}
                </motion.button>
              ))}
            </div>

            {/* Document Viewer */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 font-serif">
              <h4 className="text-base font-bold text-amber-400 font-sans">
                {PRIMARY_DOCS[selectedDocId].title}
              </h4>
              <div className="p-4 bg-slate-900/80 rounded-xl border border-amber-900/30 text-xs md:text-sm text-slate-300 leading-relaxed italic">
                "{PRIMARY_DOCS[selectedDocId].text}"
              </div>
              <p className="text-xs text-amber-400/90 font-sans font-medium">
                <strong>Historical Significance:</strong> {PRIMARY_DOCS[selectedDocId].significance}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES (Adaptive BKT Mastery Lab) ────────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Animated Background Canvas Wave */}
          <canvas ref={canvasRef} width={600} height={24} className="w-full rounded-lg bg-slate-900/50" />

          {/* Status Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : difficulty === 'standard'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {difficulty} Tier
              </motion.span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                NEP: {challenge.competencyLevel}
              </span>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Mastery: <span className="text-amber-400 font-bold capitalize">{masteryLevel}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300"
              animate={{
                width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%`,
              }}
            />
          </div>

          {/* Challenge Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-400 font-mono">Node Ref: {challenge.nodeId}</span>
              {hintCount > 0 && (
                <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Hint {hintCount} / 3 Used
                </span>
              )}
            </div>

            <h3 className="text-base md:text-lg font-bold text-white leading-relaxed">
              {challenge.question}
            </h3>

            {/* 1. MCQ Types */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, oIdx) => {
                    const isSelectedWrong = selectedWrongIdx === oIdx;
                    return (
                      <motion.button
                        key={oIdx}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        animate={wrongShake && isSelectedWrong ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => handleAnswer(oIdx)}
                        disabled={showExplanation || answerRevealed}
                        aria-label={`Option ${String.fromCharCode(65 + oIdx)}: ${opt}`}
                        className={`w-full p-4 rounded-xl text-left text-xs md:text-sm font-medium transition-all ${
                          isSelectedWrong && wrongFlash
                            ? 'bg-rose-900/60 border-2 border-rose-500 text-rose-200'
                            : showExplanation && oIdx === challenge.correctIndex
                            ? 'bg-emerald-950/70 border-2 border-emerald-500 text-emerald-200'
                            : 'bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-slate-200 hover:border-amber-500/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="inline-block w-6 h-6 rounded-full bg-slate-700/60 text-center leading-6 text-xs font-bold mr-2.5">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {showExplanation && oIdx === challenge.correctIndex && (
                            <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                          )}
                          {isSelectedWrong && (
                            <span className="text-rose-400 font-bold ml-2">✗ Incorrect</span>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}

            {/* 2. Drag-Label Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, dIdx) => (
                    <motion.div
                      key={dIdx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing"
                    >
                      ✥ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {['spot_sabarmati', 'spot_dandi', 'spot_dharasana', 'spot_peshawar'].map((spotId) => (
                    <div
                      key={spotId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(spotId)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px] text-center"
                    >
                      <span className="text-[11px] font-mono text-slate-500 uppercase">{spotId.replace('_', ' ')}</span>
                      <span className="text-xs font-bold text-amber-400 mt-1">
                        {droppedLabels[spotId] || 'Drop Target Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Verify Placements on Map"
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold"
                >
                  Verify Target Placements
                </motion.button>
              </div>
            )}

            {/* 3. Drag-Sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to arrange in correct chronological sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, sIdx) => (
                    <motion.div
                      key={sIdx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Position ${sIdx + 1}: ${item}. Drag to reorder.`}
                      onDragStart={() => setDraggedItem(String(sIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, sIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs md:text-sm text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-center leading-6 text-xs font-mono">
                        {sIdx + 1}
                      </span>
                      {item}
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Submit Chronological Sequence"
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold"
                >
                  Verify Sequence Order
                </motion.button>
              </div>
            )}

            {/* 4. Numeric Type */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    aria-label="Enter numeric value for calculation"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-amber-500 outline-none w-48"
                  />
                  <span className="text-xs font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation}
                    aria-label="Submit Metric Calculation"
                    className="px-5 py-2.5 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold"
                  >
                    Submit Metric
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. Construct Chain Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, pIdx) => (
                    <motion.button
                      key={pIdx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      aria-label={`Add part: ${part}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-amber-300 font-medium"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[80px]">
                  {constructParts.length === 0 ? (
                    <span className="text-xs text-slate-500">Click blocks above to assemble the historical chain</span>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2">
                      {constructParts.map((part, idx) => (
                        <span key={idx} className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-md border border-amber-500/40">
                          {part}
                          {idx < constructParts.length - 1 && ' ➔'}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' -> '))}
                    disabled={showExplanation || constructParts.length === 0}
                    aria-label="Validate Assembled Cause and Effect Chain"
                    className="px-5 py-2.5 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold"
                  >
                    Validate Chain
                  </motion.button>
                  <button
                    onClick={() => setConstructParts([])}
                    aria-label="Reset assembled blocks"
                    className="px-3 py-2 bg-slate-800 text-slate-400 rounded-xl text-xs hover:text-white"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}

            {/* ─── PROGRESSIVE STEP-BY-STEP EXPLANATION ──────────────────────── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-amber-950/40 border border-amber-800/80 rounded-2xl space-y-3"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Archival Explanation & Step-by-Step Insight:
                </p>
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, sIdx) => (
                    <motion.p
                      key={sIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <strong className="text-amber-400">{sIdx + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      aria-label="Reveal next explanation detail"
                      className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 rounded-lg text-xs font-bold"
                    >
                      Show Next Detail →
                    </motion.button>
                  ) : (
                    <div className="text-xs text-emerald-400 font-bold">✓ Complete Analysis Revealed</div>
                  )}

                  {revealedSteps >=
                    challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Proceed to Next Challenge"
                      className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-500/20"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Final Archive →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETE & MASTERY SUMMARY ───────────────────────────── */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 md:p-8 bg-slate-900/95 rounded-3xl border border-slate-800 space-y-6 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-4xl mx-auto shadow-xl">
            🏆
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">Historical Mastery Complete!</h2>
            <p className="text-sm text-slate-400 mt-1">
              Final Evaluated Score: <strong className="text-amber-400">{Math.max(0, 100 - errors * 5)}%</strong> • Tier: <strong className="text-emerald-400 capitalize">{masteryLevel}</strong>
            </p>
          </div>

          {/* Motivational Feedback exact matching */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-1.5">
            <h3 className="text-lg font-extrabold text-amber-300">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors >= 1 && errors <= 3
                ? 'Great work!'
                : errors >= 4 && errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              {errors === 0
                ? 'You possess flawless analytical mastery of the two critical decades from the Rowlatt Act to the 1937 Congress Ministries.'
                : errors <= 3
                ? 'You demonstrated rigorous understanding of constitutional breakthroughs and mass-movement dynamics.'
                : errors <= 7
                ? 'Solid historical effort! Review the flashpoints and primary source dossiers below to cement long-term retention.'
                : 'Keep practicing the timeline and source documents — with persistence you will master every nuance of the freedom struggle.'}
            </p>
          </div>

          {/* Misconceptions Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-4 bg-rose-950/30 rounded-2xl border border-rose-800/50 text-left space-y-3">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                Historical Misconceptions Profile:
              </h4>
              {hitMisconceptions.map((mIdx, i) => {
                const m = misconceptions?.[mIdx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-900/40 text-xs space-y-1">
                    <p className="text-rose-400 font-bold">✗ Myth: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Fact: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real World Fieldwork Card */}
          <div className="p-5 bg-gradient-to-br from-slate-950 to-slate-900 rounded-2xl border border-amber-900/40 text-left space-y-3">
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <span>🗺️</span> {REAL_WORLD_ACTIVITY.title}
            </h4>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400 list-disc list-inside">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i}>{st}</li>
              ))}
            </ul>
          </div>

          {/* Spaced Repetition Notification */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
            Spaced Repetition Schedule: Next review scheduled in{' '}
            <strong className="text-amber-400">
              {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
            </strong>{' '}
            via the SM-2 algorithm.
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setPhase('explore');
              setCurrentSlide(0);
              setCurrentChallenge(0);
              setErrors(0);
              audioManager.play('tap');
            }}
            aria-label="Restart and Re-Examine Archive Labs"
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold text-xs shadow-lg shadow-amber-500/20"
          >
            Re-Examine Archive Labs ↺
          </motion.button>
        </motion.div>
      )}

      {/* ─── MODAL FEEDBACK COMPONENTS ─────────────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Milestone Reached!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_HistorySatyagrahaAgainstRowlattSim;
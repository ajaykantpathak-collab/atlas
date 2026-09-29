'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 12 HISTORY NODE IDENTIFIERS ───
const NODE_C12_HIST_001 = 'c12_hist_001'; // August Offer (1940) & Cripps Mission (1942)
const NODE_C12_HIST_002 = 'c12_hist_002'; // Quit India Resolution (1942)
const NODE_C12_HIST_003 = 'c12_hist_003'; // Subhash Chandra Bose & INA
const NODE_C12_HIST_004 = 'c12_hist_004'; // Reasons for Changed British Attitude (1945-47)
const NODE_C12_HIST_005 = 'c12_hist_005'; // Cabinet Mission (1946)
const NODE_C12_HIST_006 = 'c12_hist_006'; // Attlee's Declaration & Mountbatten Plan (1947)
const NODE_C12_HIST_007 = 'c12_hist_007'; // Indian Independence Act (1947)
const NODE_C12_HIST_008 = 'c12_hist_008'; // Princely States Reorganisation & Sardar Patel
const NODE_C12_HIST_009 = 'c12_hist_009'; // Junagarh & Hyderabad (Plebiscite & Operation Polo)
const NODE_C12_HIST_010 = 'c12_hist_010'; // Kashmir Integration (Accession, War, Art 370)

const ALL_NODE_IDS = [
  NODE_C12_HIST_001,
  NODE_C12_HIST_002,
  NODE_C12_HIST_003,
  NODE_C12_HIST_004,
  NODE_C12_HIST_005,
  NODE_C12_HIST_006,
  NODE_C12_HIST_007,
  NODE_C12_HIST_008,
  NODE_C12_HIST_009,
  NODE_C12_HIST_010,
];

// ─── HISTORICAL NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Crucible of Freedom: 1940–1948',
  subtitle: 'Wartime Crisis, Mass Upsurge, Decolonisation & Territorial Integration',
  intro:
    'You are appointed Chief Historical Archivist and Diplomatic Analyst for the Constituent Assembly of India. Step into the decisive decade (1940–1948) when World War II, Gandhian mass movements, Bose\'s INA, British imperial retreat, and Sardar Patel\'s integration of 562 princely states shaped modern South Asia.',
  context:
    'Navigate through British offers, armed resistance, naval mutinies, partition politics, and state accessions to forge a sovereign democratic nation.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question:
    'In April 1942, Mahatma Gandhi described Sir Stafford Cripps\'s constitutional offer as "a post-dated cheque on a crashing bank." What was the core reason why both Congress AND the Muslim League rejected the Cripps Mission?',
  options: [
    'Both demanded an immediate monarchical union with Japan',
    'Congress rejected the provincial secession clause and lack of wartime power transfer; the League rejected it because Pakistan was not explicitly conceded',
    'Both parties had already agreed to Attlee\'s Mountbatten Plan two years prior',
    'The British Viceroy offered complete sovereign independence immediately with no defence control',
  ],
  correctIndex: 1,
  hintAfter:
    'Notice how opposing political visions caused both parties to reject the exact same British offer for fundamentally opposite reasons! Let us explore the decade interactively.',
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

// ─── 21 NEP 2020 COMPETENCY CHALLENGES (7 FOUNDATION, 7 STANDARD, 7 ADVANCED) ───
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION (1 - 7) ──
  {
    id: 'ch_001_august_recall',
    nodeId: NODE_C12_HIST_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Which British Viceroy issued the August Offer in 1940 promising post-war Dominion Status and expansion of the Executive Council following the fall of France?',
    options: ['Lord Mountbatten', 'Lord Linlithgow', 'Lord Wavell', 'Lord Curzon'],
    correctIndex: 1,
    explanation:
      'Viceroy Lord Linlithgow issued the August Offer on 8 August 1940 following the fall of France. It offered post-war Dominion status and expansion of the Viceroy\'s Executive Council, but denied immediate wartime transfer of power.',
    hints: [
      'Think of the Viceroy in office when World War II broke out in 1939 without consulting Indian ministries.',
      'His name begins with L and rhymes with "lithgow".',
      'It was Lord Linlithgow, who served as Viceroy from 1936 to 1943.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_002_cabinet_drag',
    nodeId: NODE_C12_HIST_005,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Match the three British Cabinet ministers sent in the March 1946 Cabinet Mission to their official imperial portfolios.',
    dragItems: [
      { label: 'Lord Pethick-Lawrence', targetId: 'role_sec_state' },
      { label: 'Sir Stafford Cripps', targetId: 'role_trade' },
      { label: 'A.V. Alexander', targetId: 'role_admiralty' },
    ],
    correctMapping: {
      role_sec_state: 'Lord Pethick-Lawrence',
      role_trade: 'Sir Stafford Cripps',
      role_admiralty: 'A.V. Alexander',
    },
    explanation:
      'The 1946 Cabinet Mission comprised Lord Pethick-Lawrence (Secretary of State for India), Sir Stafford Cripps (President of the Board of Trade), and A.V. Alexander (First Lord of the Admiralty).',
    hints: [
      'The Secretary of State for India was Lord Pethick-Lawrence.',
      'Sir Stafford Cripps headed the Board of Trade.',
      'A.V. Alexander represented the British Royal Navy as First Lord of the Admiralty.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_003_states_numeric',
    nodeId: NODE_C12_HIST_008,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'How many princely states existed across the Indian subcontinent when British paramountcy lapsed under the Indian Independence Act of 1947?',
    correctAnswer: 562,
    tolerance: 0,
    unit: 'princely states',
    explanation:
      'There were 562 princely states covering roughly 40% of the land area and 25% of the population of undivided India.',
    hints: [
      'The number is greater than 550 and less than 570.',
      'It is precisely five hundred and sixty-two.',
      'Enter 562.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_004_quitindia_sort',
    nodeId: NODE_C12_HIST_002,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Arrange the key stages of the Quit India movement of 1942 in chronological order.',
    sortItems: [
      'Wardha CWC meeting demands British withdrawal (14 July 1942)',
      'AICC passes Quit India Resolution at Gwalia Tank, Bombay with "Do or Die" mantra (8 August 1942)',
      'Pre-dawn mass arrest of Gandhi, Nehru, Patel to Aga Khan Palace & Ahmednagar Fort (9 August 1942)',
      'Spontaneous nationwide strikes, attacks on 945 railway stations & rise of parallel governments (Tamluk, Satara, Ballia)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Following the Wardha meeting in July, the AICC passed the resolution on 8 August 1942. Pre-dawn arrests on 9 August removed the leadership, transforming the movement into a spontaneous, leaderless mass upsurge.',
    hints: [
      'Start with the Working Committee meeting at Wardha in July.',
      'The Gwalia Tank resolution preceded the midnight/pre-dawn police swoop.',
      'The leaderless mass uprising and parallel governments occurred directly after the top leaders were arrested on August 9.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_005_cripps_arrival',
    nodeId: NODE_C12_HIST_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'In which month and year did Sir Stafford Cripps arrive in New Delhi to negotiate constitutional terms with Indian leaders amidst the threat of Japanese invasion?',
    options: ['March 1942', 'August 1940', 'February 1946', 'June 1947'],
    correctIndex: 0,
    explanation:
      'Sir Stafford Cripps arrived in Delhi on 22 March 1942 following the Japanese capture of Rangoon. The mission collapsed in April 1942.',
    hints: [
      'It happened in the spring of 1942 after the fall of Burma and Singapore.',
      'The month is March.',
      'Select March 1942.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_006_bose_provisional',
    nodeId: NODE_C12_HIST_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Where did Subhash Chandra Bose proclaim the establishment of the Provisional Government of Free India (Arzi Hukumat-e-Azad Hind) on 21 October 1943?',
    options: ['Singapore (Cathay Cinema Hall)', 'Tokyo, Japan', 'Rangoon, Burma', 'Berlin, Germany'],
    correctIndex: 0,
    explanation:
      'Netaji Subhash Chandra Bose proclaimed the Provisional Government of Free India at Cathay Cinema Hall in Singapore on 21 October 1943, supported by the Indian National Army.',
    hints: [
      'It was proclaimed in the Southeast Asian island city where Netaji assumed supreme command of the INA.',
      'The island city was formerly a major British naval fortress captured by Japan.',
      'It was Singapore.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_007_hyderabad_operation',
    nodeId: NODE_C12_HIST_009,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'What was the official military code name for the Indian armed police action launched on 13 September 1948 to integrate Hyderabad into the Indian Union?',
    options: ['Operation Polo', 'Operation Vijay', 'Operation Cactus', 'Operation Meghdoot'],
    correctIndex: 0,
    explanation:
      'Operation Polo was launched on 13 September 1948 under Major-General J.N. Chaudhuri and successfully forced the Nizam\'s forces and the Razakars to surrender within 108 hours on 18 September 1948.',
    hints: [
      'Hyderabad had the largest concentration of polo grounds in India at the time.',
      'The operation was named after an equestrian sport.',
      'It was Operation Polo.',
    ],
    misconceptionIndex: 4,
  },

  // ── STANDARD (8 - 14) ──
  {
    id: 'ch_008_ina_application',
    nodeId: NODE_C12_HIST_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'If you analyze why the INA trials at the Red Fort (Nov 1945) hastened the end of British rule despite the military defeat at Imphal-Kohima (1944), what is the key strategic deduction?',
    options: [
      'The Japanese army recaptured Delhi and forced the British Cabinet to surrender',
      'The trials triggered nationwide solidarity across communal lines and sparked the Royal Indian Navy mutiny (Feb 1946), proving the colonial army was no longer a reliable coercive tool',
      'Bose was elected Prime Minister of the Interim British Cabinet',
      'The Indian National Congress abandoned non-violence and adopted Axis military doctrine',
    ],
    correctIndex: 1,
    explanation:
      'The Red Fort trials of Shah Nawaz Khan, Prem Sahgal, and Gurbaksh Dhillon united India in popular outrage, culminating in the RIN Mutiny of 18 Feb 1946. Field Marshal Auchinleck confirmed to London that Indian soldiers could no longer be relied upon to crush fellow Indians.',
    hints: [
      'Look at the military loyalty of the Indian armed forces after the trials.',
      'Recall the 18 February 1946 Royal Indian Navy mutiny involving 78 ships.',
      'Colonial rule collapsed when its primary instrument of coercion (the military) could no longer be trusted to obey imperial orders.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_009_british_attitude_analysis',
    nodeId: NODE_C12_HIST_004,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Analyse the economic and international factors that forced Clement Attlee\'s Labour government to decolonise India after 1945. Which pair represents accurate structural pressures?',
    options: [
      'British war debt reached £3.5 billion + abrupt end of US Lend-Lease, alongside American/UN anti-colonial pressure under the Atlantic Charter',
      'Britain discovered massive oil reserves in London and had zero foreign debt',
      'Winston Churchill won a landslide victory in July 1945 on a pro-empire platform',
      'The League of Nations ordered Britain to pay war reparations to Germany',
    ],
    correctIndex: 0,
    explanation:
      'Britain was economically crippled with £3.5B debt, Lend-Lease was cut off by the US in August 1945, Attlee\'s Labour Party held anti-imperialist convictions, and the US pushed for Atlantic Charter decolonisation.',
    hints: [
      'Consider the financial state of post-WWII Britain and the attitude of the USA.',
      'Lend-Lease aid was abruptly ended by President Truman in August 1945.',
      'The British treasury was exhausted, turning India from a profitable asset into an unsustainable financial and military liability.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_010_cabinet_construct',
    nodeId: NODE_C12_HIST_005,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Assemble the three-tier federal architecture designed by the Cabinet Mission Plan of 16 May 1946 in order from top to bottom.',
    availableParts: [
      'Union Centre (Defence, Foreign Affairs, Communications only)',
      'Section Groups (A: Hindu-majority, B: NW Muslim-majority, C: NE Bengal-Assam)',
      'Autonomous Provinces & Princely States (All residual powers)',
    ],
    targetState:
      'Union Centre (Defence, Foreign Affairs, Communications only) Section Groups (A: Hindu-majority, B: NW Muslim-majority, C: NE Bengal-Assam) Autonomous Provinces & Princely States (All residual powers)',
    validationHint:
      'Click the tiers in top-down hierarchical order: Union Centre → Section Groups → Autonomous Provinces.',
    explanation:
      'The 16 May 1946 Plan created a 3-tier structure: Top (Union with 3 subjects), Middle (Sections A, B, C), Bottom (Autonomous provinces with residual powers). This aimed to keep India united while accommodating provincial clustering.',
    hints: [
      'Start with the supreme federal tier with limited subjects.',
      'Add the provincial groupings (Sections A, B, C).',
      'Finish with individual autonomous provinces and states holding residual powers.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_011_mountbatten_eval',
    nodeId: NODE_C12_HIST_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question:
      'Why did Jawaharlal Nehru, Sardar Patel, and the Congress Working Committee reluctantly accept the 3 June 1947 Mountbatten Plan partitioning India, despite Mahatma Gandhi\'s deep personal anguish?',
    options: [
      'Congress wished to annex Burma and Ceylon into a new empire',
      'The alternative was uncontrollable civil war, interim government paralysis, and widespread communal carnage following Direct Action Day',
      'The British promised to pay all Indian national debt if partition was accepted',
      'The Muslim League agreed to dissolve itself immediately upon partition',
    ],
    correctIndex: 1,
    explanation:
      'Congress leaders accepted partition as the lesser evil to halt spreading communal slaughter, break the administrative paralysis in the Interim Government, and prevent complete Balkanisation into dozens of warring states.',
    hints: [
      'Reflect on the communal violence across Calcutta, Noakhali, Bihar, and Punjab in 1946-47.',
      'The interim coalition between Congress and the League was completely deadlocked.',
      'Nehru and Patel judged that a strong, united truncated India was preferable to endless chaos and civil war.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_012_direct_action',
    nodeId: NODE_C12_HIST_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'What triggered the Muslim League\'s call for "Direct Action Day" on 16 August 1946, leading to the Great Calcutta Killings?',
    options: [
      'Jawaharlal Nehru\'s press statement in Bombay indicating Congress might alter the Cabinet Mission grouping provisions in the Constituent Assembly',
      'The British Viceroy\'s immediate grant of complete independence without elections',
      'The annexation of Hyderabad by the Indian Army in August 1946',
      'The complete rejection of the 1935 Government of India Act by Winston Churchill',
    ],
    correctIndex: 0,
    explanation:
      'On 10 July 1946, Nehru stated in Bombay that Congress was entering the Constituent Assembly untied by any British-imposed conditions, leading Jinnah to withdraw League acceptance of the Cabinet Mission and declare Direct Action on 16 August 1946.',
    hints: [
      'Focus on the debate over whether provincial grouping in Sections B and C was compulsory.',
      'Nehru asserted the sovereignty of the Constituent Assembly at a press conference.',
      'Jinnah interpreted Nehru\'s press statement as a betrayal of the Cabinet Mission federal compromise.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_013_simla_conference',
    nodeId: NODE_C12_HIST_004,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Why did the Simla Conference called by Viceroy Lord Wavell in June–July 1945 end in complete failure?',
    options: [
      'M.A. Jinnah insisted that the Muslim League alone had the sole exclusive right to nominate all Muslim members to the Viceroy\'s Executive Council, which Congress rejected',
      'Mahatma Gandhi demanded that the British army remain in India for another twenty years',
      'The British refused to release political prisoners arrested during the Quit India movement',
      'The Japanese army interrupted the conference and occupied Simla',
    ],
    correctIndex: 0,
    explanation:
      'The Wavell Plan broke down because Jinnah demanded that the League represent all Muslims (vetoing Congress\'s Muslim nominees like Maulana Abul Kalam Azad), and Wavell conceded a de facto veto to the League.',
    hints: [
      'Consider who had the right to nominate Muslim members in the Executive Council.',
      'Congress had nationalist Muslim leaders including its President Maulana Azad.',
      'Jinnah claimed exclusive representation of all Indian Muslims, which Congress could not accept as a secular national body.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_014_cr_formula',
    nodeId: NODE_C12_HIST_002,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'What was the primary core proposal of the C.R. Formula (1944) drafted by C. Rajagopalachari to bridge Congress-League differences during WWII?',
    options: [
      'League endorses the demand for immediate independence and cooperates in a provisional government; after the war, a plebiscite in contiguous Muslim-majority districts would decide separation',
      'Immediate partition into three independent sovereign nations before the war ended',
      'The permanent continuation of British rule under a joint Hindu-Muslim monarchy',
      'Complete rejection of all plebiscites and forced merger of provinces',
    ],
    correctIndex: 0,
    explanation:
      'The Rajagopalachari Formula (March 1944) offered a post-war plebiscite in contiguous Muslim-majority districts of the North-West and East, provided the League cooperated in forming a provisional wartime government.',
    hints: [
      'Rajaji proposed a conditional democratic vote (plebiscite) after the war ended.',
      'Gandhi held talks with Jinnah in September 1944 based on this formula.',
      'Jinnah rejected it as offering a "maimed, mutilated, and moth-eaten" Pakistan.',
    ],
    misconceptionIndex: 0,
  },

  // ── ADVANCED (15 - 21) ──
  {
    id: 'ch_015_act_modifications',
    nodeId: NODE_C12_HIST_007,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Which of the following was a critical modification made by the Indian Independence Act (passed 18 July 1947) compared to Attlee\'s original February 1947 declaration?',
    options: [
      'It advanced the date of transfer of power from June 1948 to 15 August 1947 and adopted the adapted 1935 Act as the interim working constitution',
      'It declared India a socialist republic immediately on 18 July 1947',
      'It granted full independence to all 562 princely states as sovereign UN members',
      'It retained the Secretary of State for India in the British Cabinet indefinitely',
    ],
    correctIndex: 0,
    explanation:
      'The Act advanced the transfer date by 10 months to 15 August 1947, abolished the Secretary of State for India, lapsed paramountcy, and governed both dominions under the adapted Government of India Act 1935 until new constitutions were enacted.',
    hints: [
      'Attlee originally announced transfer by June 1948.',
      'Mountbatten accelerated the handover to August 1947.',
      'The working bridge between colonial rule and the 1950 Constitution was the adapted 1935 Act.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_016_patel_instruments',
    nodeId: NODE_C12_HIST_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'Sardar Patel and V.P. Menon persuaded 559 princely states to sign the Instrument of Accession before 15 August 1947. What exact subjects did rulers surrender to the Indian Union under this instrument?',
    options: [
      'Complete internal taxation, land revenue, and police administration',
      'Defence, External Affairs, and Communications only (retaining internal autonomy)',
      'Abolition of their dynasties and instant nationalisation of all personal property',
      'Direct control of provincial legislatures and judicial courts',
    ],
    correctIndex: 1,
    explanation:
      'The Instrument of Accession ceded only three subjects: Defence, External Affairs, and Communications. Rulers preserved internal autonomy and received privy purses, which induced rapid compliance and prevented Balkanisation.',
    hints: [
      'Patel asked rulers to surrender only what they could not manage independently without British imperial backing.',
      'Think of the 3 subjects: military protection, foreign diplomacy, and transport/telegraphs.',
      'Defence, External Affairs, and Communications.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_017_junagarh_hyderabad_distinguish',
    nodeId: NODE_C12_HIST_009,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Contrast the integration of Junagarh (Feb 1948) with Hyderabad (Sept 1948). Why did Patel apply a democratic plebiscite in Junagarh but military Police Action (Operation Polo) in Hyderabad?',
    options: [
      'Junagarh had a ruler who fled with no armed militia, making a peaceful plebiscite feasible; Hyderabad had Kasim Razvi\'s 100,000 armed Razakars terrorizing the countryside, requiring military intervention',
      'Hyderabad had no Hindu population, while Junagarh was 100% Muslim',
      'Pakistan invaded Hyderabad by sea, whereas Junagarh signed the Indian Constitution in 1946',
      'The United Nations conducted military operations in Junagarh and sent peacekeepers to Hyderabad',
    ],
    correctIndex: 0,
    explanation:
      'In Junagarh, Nawab Mahabat Khanji III fled to Pakistan after an economic blockade, leaving no militia, allowing a 95%+ plebiscite. In Hyderabad, Nizam Osman Ali Khan backed the Razakar militia (who committed atrocities at Parkal/Chakradharpur), making Operation Polo (13–18 Sept 1948) necessary.',
    hints: [
      'Consider the presence of Kasim Razvi and the Razakars in Hyderabad.',
      'Junagarh\'s Nawab had already escaped to Karachi.',
      'Patel adapted his methods based on whether armed resistance and communal terrorism were actively occurring.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_018_kashmir_eval',
    nodeId: NODE_C12_HIST_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'What sequence of events compelled Maharaja Hari Singh to sign the Instrument of Accession on 26 October 1947, leading to Article 370 in the Indian Constitution?',
    options: [
      'A peaceful public referendum organised by the British Crown in London',
      'A Pakistani-backed Pashtun tribal invasion (Lashkars) reaching Baramulla/Srinagar, requiring Indian military airlift supported by Sheikh Abdullah\'s National Conference',
      'An economic treaty signed with the United States to build Himalayan airbases',
      'The voluntary merger of Jammu & Kashmir into the East Punjab provincial assembly',
    ],
    correctIndex: 1,
    explanation:
      'Pakistan violated the Standstill Agreement with a blockade and sponsored the 22 October tribal raid. Overwhelmed, Hari Singh acceded on 26 October 1947. Indian troops were airlifted on 27 October, and Article 370 was drafted by N. Gopalaswami Ayyangar to provide asymmetric federal autonomy.',
    hints: [
      'Recall the 22 October 1947 tribal invasion and the Baramulla massacre.',
      'Indian troops (1st Sikh Regiment) could legally land only after formal accession.',
      'Popular leader Sheikh Abdullah backed accession to secular India over theocratic Pakistan.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_019_standstill_agreement',
    nodeId: NODE_C12_HIST_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'What legal function did the "Standstill Agreement" serve between 15 August 1947 and formal integration for hesitant princely states like Hyderabad and Kashmir?',
    options: [
      'It maintained existing administrative, trade, customs, and communication arrangements while temporary negotiations continued between the Dominion and the state',
      'It permanently converted princely states into British Crown colonies',
      'It instantly declared all ruler properties to be public municipal assets',
      'It prohibited any Indian citizen from travelling outside provincial capitals',
    ],
    correctIndex: 0,
    explanation:
      'The Standstill Agreement preserved the status quo in administrative, customs, railway, and postal matters as existed under the British Raj, providing a buffer window to negotiate permanent constitutional accession.',
    hints: [
      'Think of what happens to daily trade and transit when paramountcy suddenly lapses on 15 August.',
      'It prevents an immediate economic and legal vacuum.',
      'It preserves existing administrative and economic relations pending final settlement.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_020_privy_purse_strategy',
    nodeId: NODE_C12_HIST_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'How did Sardar Patel and V.P. Menon use "Privy Purses" and diplomatic state unions (like Saurashtra and PEPSU) to achieve complete territorial consolidation after 1947?',
    options: [
      'By offering tax-free royal pensions and personal titles in exchange for rulers surrendering sovereign rule and merging smaller principalities into viable democratic unions',
      'By declaring immediate martial law across all 562 capitals and executing non-compliant princes',
      'By selling royal palaces to international oil conglomerates to fund the Indian budget',
      'By retaining British governors in every princely palace indefinitely',
    ],
    correctIndex: 0,
    explanation:
      'Patel employed a masterstroke of carrot-and-stick diplomacy: granting constitutionally guaranteed Privy Purses (tax-free allowances) and private property retention to rulers while consolidating fragmented principalities into viable state unions (like Rajasthan, Saurashtra, and PEPSU).',
    hints: [
      'Princes needed financial security and prestige in exchange for giving up dynastic rule.',
      'Patel balanced national integration with constitutional guarantees.',
      'Privy Purses provided a peaceful financial incentive for rulers to merge their states.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_021_balkan_plan_rejection',
    nodeId: NODE_C12_HIST_006,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Why did Jawaharlal Nehru vehemently reject Mountbatten\'s initial "Plan Balkan" (Dickie Bird Plan) shown to him at Simla in May 1947?',
    options: [
      'It proposed transferring power to individual provinces and princely states separately, threatening to fragment India into dozens of small warring sovereign statelets',
      'It mandated the immediate merger of India with the United States of America',
      'It proposed giving all 562 princely states permanent nuclear weapons',
      'It cancelled the creation of the Indian Army entirely',
    ],
    correctIndex: 0,
    explanation:
      'Nehru saw that Plan Balkan would lead to the total Balkanisation and civil collapse of India by inviting each province and princely state to declare independence separately. Mountbatten immediately scrapped it and drafted the 3 June Plan partitioning British India into two dominions instead.',
    hints: [
      'Think of what "Balkanisation" means in European history.',
      'Transferring power to each individual province would destroy India\'s central unity.',
      'Nehru insisted on transferring power to a united India (or two successor dominions), not dozens of fragmented provinces.',
    ],
    misconceptionIndex: 1,
  },
];

// ─── PROPS & DEFAULT PROPS ───
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
  nodeId: NODE_C12_HIST_001,
  title: 'Indian National Movement (1940–1948): From August Offer to Integration',
  definition:
    'The historical transition spanning the August Offer (1940), Cripps Mission (1942), Quit India Movement, Bose and the INA, post-war British imperial exhaustion, Cabinet Mission (1946), Mountbatten Plan, Independence Act (1947), and Sardar Patel\'s integration of princely states (Junagarh, Hyderabad, Kashmir).',
  eli5:
    'Imagine a landlord who refused to leave your house during a giant storm. First he offered tiny compromises, but the family pushed back with peaceful strikes and armed resistance. Finally exhausted and broke, the landlord partitioned the house in a rush. One brave leader then united 562 different rooms into one grand home!',
  misconceptions: [
    {
      misconception: 'The Cripps Mission was rejected only by the Congress.',
      correction:
        'The Cripps Mission was rejected by BOTH the Congress (which opposed provincial secession and lacked real wartime power) AND the Muslim League (which rejected it because Pakistan was not explicitly conceded).',
    },
    {
      misconception: 'The August Offer, Cripps Mission, and Cabinet Mission all offered the same thing.',
      correction:
        'The August Offer (1940) gave vague post-war Dominion status. Cripps (1942) offered Dominion status with a provincial secession clause. Cabinet Mission (1946) rejected Pakistan and proposed a 3-tier united federation.',
    },
    {
      misconception: 'Subhash Chandra Bose founded the Indian National Army (INA).',
      correction:
        'Captain Mohan Singh founded the first INA in Singapore in February 1942 from Indian POWs. Netaji Subhash Chandra Bose took over, revived, and expanded it from July 1943.',
    },
    {
      misconception: 'The Indian Independence Act of 1947 made India a Republic immediately.',
      correction:
        'The Act created two independent DOMINIONS within the Commonwealth. India became a Republic only on 26 January 1950 when its Constitution was inaugurated.',
    },
    {
      misconception: 'All 562 princely states acceded willingly on 15 August 1947 without any conflict.',
      correction:
        'Travancore, Bhopal, and Jodhpur resisted before acceding, while Junagarh required a plebiscite, Hyderabad required military Police Action (Operation Polo), and Kashmir required emergency accession during an invasion.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Who declared the August Offer on 8 August 1940 on behalf of the British government?',
      options: ['Lord Linlithgow', 'Lord Mountbatten', 'Lord Wavell', 'Sir Stafford Cripps'],
      correctIndex: 0,
    },
    {
      question: 'What slogan did Mahatma Gandhi give at the Gwalia Tank Maidan on 8 August 1942?',
      options: ['Do or Die (Karenge ya Marenge)', 'Jai Hind', 'Dilli Chalo', 'Inquilab Zindabad'],
      correctIndex: 0,
    },
    {
      question: 'In which city did Netaji proclaim the Provisional Government of Free India on 21 October 1943?',
      options: ['Singapore', 'Tokyo', 'Berlin', 'Rangoon'],
      correctIndex: 0,
    },
    {
      question: 'What was the code name for the Indian military Police Action in Hyderabad in September 1948?',
      options: ['Operation Polo', 'Operation Vijay', 'Operation Cactus', 'Operation Meghdoot'],
      correctIndex: 0,
    },
  ],
  masteryCriteria:
    'Student can master all 10 ISC Class 12 History nodes: 1940-1942 British offers, Quit India movement, INA & Bose, post-WWII British attitude change, Cabinet Mission, Mountbatten Plan, Independence Act, Patel\'s integration of 562 states including Junagarh, Hyderabad, and Kashmir.',
};

// ─── 5 INTERACTIVE EXPLORATION LAB STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Wartime Offers (1940–1942)',
    instruction:
      'Manipulate the War Pressure slider. Observe how Allied defeats (Fall of France, Fall of Singapore, Rangoon) forced Britain to escalate concessions from the August Offer to the Cripps Mission.',
    interactionType: 'slider-war-pressure',
    nodeId: NODE_C12_HIST_001,
  },
  {
    title: 'Lab 2: Quit India & Armed Resistance (1942–1944)',
    instruction:
      'Toggle between Gandhian Mass Satyagraha (Quit India) and Bose\'s Armed Campaign (INA). Explore the two converging paths to liberation.',
    interactionType: 'toggle-movement-stream',
    nodeId: NODE_C12_HIST_002,
  },
  {
    title: 'Lab 3: Post-WWII Imperial Breakdown (1945–1946)',
    instruction:
      'Inspect the 5 converging factors that broke British rule: Labour ideology, £3.5B war debt, RIN Naval Mutiny, 1946 elections, and US Atlantic Charter pressure.',
    interactionType: 'factor-inspector',
    nodeId: NODE_C12_HIST_004,
  },
  {
    title: 'Lab 4: Cabinet Mission vs Partition Plans (1946–1947)',
    instruction:
      'Inspect the 3-Tier Cabinet Mission architecture and see why grouping ambiguity led directly to the Mountbatten Partition Plan.',
    interactionType: 'partition-map-toggle',
    nodeId: NODE_C12_HIST_006,
  },
  {
    title: 'Lab 5: Sardar Patel\'s Integration Map (1947–1948)',
    instruction:
      'Click on Junagarh, Hyderabad, Kashmir, and Travancore on the interactive geopolitical map to simulate the resolution methods: Plebiscite, Operation Polo, and Emergency Accession with Article 370.',
    interactionType: 'interactive-princely-map',
    nodeId: NODE_C12_HIST_008,
  },
];

// ─── PREDICTION-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: If Indian soldiers and naval ratings in the Royal Indian Navy mutinied in February 1946, what would British Commander-in-Chief Field Marshal Auchinleck report to London?',
    options: [
      'That Britain should send 10 million more troops to stay forever',
      'That the Indian Army could no longer be relied upon to suppress nationalist unrest, making British exit inevitable',
      'That India had agreed to remain a permanent colony',
      'That all military mutinies were harmless celebrations',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Now drag the Troop Loyalty slider below 40% in real time and watch the Imperial Coercion Gauge collapse instantly!',
    nodeId: NODE_C12_HIST_004,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question:
      'What do you observe about the British constitutional strategy between 1940 and 1947 as wartime & internal crises intensified?',
    observableOptions: [
      'British concessions escalated rapidly (August Offer → Cripps → Cabinet Mission → Mountbatten Plan) as military and financial leverage evaporated',
      'Britain maintained absolute unchanged military control throughout the decade',
      'The British Parliament refused to discuss India after 1939',
      'India was granted complete republican status in 1940',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_HIST_004,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Historical Document Analyst: The Integration Dossier',
  description:
    'Select any one of the 562 princely states (e.g., Kashmir, Hyderabad, Junagarh, Travancore, or Jodhpur) and compose a 3-point National Integration Brief detailing: (1) Its demographic and strategic profile in 1947, (2) The ruler\'s initial stance vs popular will, and (3) How Patel & V.P. Menon resolved its integration.',
  steps: [
    'Choose your case study state from the 1947 geopolitical map',
    'Identify the specific legal instrument applied (Standstill Agreement / Instrument of Accession)',
    'Explain the role of popular democratic aspirations vs ruler\'s dynastic claim',
    'Present your historical brief to your peers or classroom study circle',
  ],
};

// ─── MAIN REACT SIMULATION COMPONENT ───
function C12_HistoryAugustOffer1940Sim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props) {
  const subjectConfig = SUBJECT_CONFIG['history'] || {
    name: 'History',
    emoji: '📜',
    color: 'amber',
  };

  // ─── PHASES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ─── INTERACTIVE STATE (CONNECTED LIVE TO VISUALS) ───
  const [warPressureLevel, setWarPressureLevel] = useState<number>(30); // 0 to 100
  const [troopLoyaltyLevel, setTroopLoyaltyLevel] = useState<number>(85); // 0 to 100
  const [britishDebtLevel, setBritishDebtLevel] = useState<number>(35); // in hundreds of millions (£3.5B)
  const [selectedStateId, setSelectedStateId] = useState<'junagarh' | 'hyderabad' | 'kashmir' | 'travancore'>('hyderabad');
  const [activeMovementStream, setActiveMovementStream] = useState<'quitIndia' | 'ina'>('quitIndia');
  const [princelyStateAccessionCount, setPrincelyStateAccessionCount] = useState<number>(559);

  // Prediction & Observation
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Challenge & Adaptive Engine State
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
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop & Construction
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback Visuals
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineGSAgentRef = useRef<HTMLDivElement | null>(null);

  // ─── FILTERED CHALLENGES BY ADAPTIVE TIER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── DERIVED HISTORICAL CALCULATIONS (REAL-TIME SLIDER DRIVEN) ───
  const imperialControlIndex = useMemo(() => {
    const raw = troopLoyaltyLevel * 0.55 + (100 - britishDebtLevel * 2) * 0.25 - warPressureLevel * 0.2;
    return Math.max(5, Math.min(100, Math.round(raw)));
  }, [troopLoyaltyLevel, britishDebtLevel, warPressureLevel]);

  const calculatedOfferStatus = useMemo(() => {
    if (warPressureLevel < 35) return 'August Offer (1940) — Vague Post-War Dominion Promise';
    if (warPressureLevel < 70) return 'Cripps Mission (1942) — Secession Clause & Post-War Assembly';
    return 'Cabinet Mission (1946) & Mountbatten Plan — Immediate Transfer of Power';
  }, [warPressureLevel]);

  // ─── SPACED REPETITION SCHEDULE CALCULATION ───
  const srsSchedule = useMemo(() => {
    if (errors === 0) {
      return {
        days: 7,
        label: '7 Days (Optimal Retention)',
        badge: 'Mastered (Interval: +7d)',
        color: 'emerald',
        message: 'Flawless recall! Your next spaced retrieval practice is scheduled in 7 days to consolidate long-term memory.',
      };
    } else if (errors <= 3) {
      return {
        days: 3,
        label: '3 Days (Consolidation Needed)',
        badge: 'Developing (Interval: +3d)',
        color: 'amber',
        message: 'Good performance with minor gaps. Review scheduled in 3 days to reinforce key constitutional milestones.',
      };
    } else {
      return {
        days: 1,
        label: '1 Day (High Priority Refresh)',
        badge: 'Refresher (Interval: +1d)',
        color: 'rose',
        message: 'Multiple review opportunities identified. Next quick retrieval session scheduled tomorrow for optimal decay prevention.',
      };
    }
  }, [errors]);

  // ─── 1. EFFECT: LOAD PERSISTED MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── 2. EFFECT: BKT ADAPTIVE MASTERY UPDATE ───
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

  // ─── 3. EFFECT: 2D CANVAS HISTORICAL DYNAMICS ANIMATION ───
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

      // Background ambient grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Dynamic wave depicting popular nationalist pressure
      ctx.beginPath();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      for (let x = 0; x < canvas.width; x++) {
        const y =
          canvas.height / 2 +
          Math.sin(x * 0.02 + frame * 0.04) * (15 + (100 - imperialControlIndex) * 0.3) +
          Math.cos(x * 0.01 + frame * 0.02) * 5;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Imperial coercive power line (collapsing)
      ctx.beginPath();
      ctx.strokeStyle = imperialControlIndex < 40 ? '#ef4444' : '#3b82f6';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      const impY = canvas.height - (imperialControlIndex / 100) * (canvas.height - 20) - 10;
      ctx.moveTo(0, impY);
      ctx.lineTo(canvas.width, impY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Particle pulse indicator
      const pulseX = (frame * 2) % canvas.width;
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(
        pulseX,
        canvas.height / 2 + Math.sin(pulseX * 0.02 + frame * 0.04) * (15 + (100 - imperialControlIndex) * 0.3),
        4,
        0,
        Math.PI * 2
      );
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [imperialControlIndex]);

  // ─── 4. EFFECT: GSAP TIMELINE PULSE ───
  useEffect(() => {
    if (timelineGSAgentRef.current) {
      gsap.fromTo(
        timelineGSAgentRef.current,
        { scale: 0.98, opacity: 0.9 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [currentSlide, warPressureLevel, activeMovementStream]);

  // ─── 5. EFFECT: TIMER CLEANUP ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

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
        ? 'Excellent analytical insight! Both parties rejected Cripps for opposite reasons.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the decisive historical decade step by step.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to Free Historical Simulation! Adjust any variable without pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge phase begun. Apply your historical reasoning!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded. Verify it with the simulation controls below!');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect ? 'Accurate historical observation!' : 'Review the visualization timeline carefully.'
    );
  }, []);

  const handleStateClick = useCallback((st: 'junagarh' | 'hyderabad' | 'kashmir' | 'travancore') => {
    setSelectedStateId(st);
    audioManager.play('tap');
    const summaries: Record<string, string> = {
      junagarh: 'Junagarh: Nawab acceded to Pakistan; resolved by 95% plebiscite in Feb 1948.',
      hyderabad: 'Hyderabad: Razakar terrorism suppressed by Operation Polo in 108 hours.',
      kashmir: 'Kashmir: Tribal invasion forced 26 Oct 1947 accession; Article 370 granted.',
      travancore: 'Travancore: Sir C.P. declared independence; acceded after assassination attempt & mass pressure.',
    };
    speechManager.speak(summaries[st]);
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Outstanding work! Simulation complete. Your next spaced repetition review is in ${srsSchedule.days} days.`);
  }, [errors, onComplete, srsSchedule.days]);

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
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding historical analysis.');
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
          speechManager.speak('Hints exhausted. Let us analyze the step-by-step historical explanation.');
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
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
      setDraggedItem(null);
    },
    [draggedItem]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const arr = prev.length > 0 ? [...prev] : [0, 1, 2, 3];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, []);

  // ─── RENDER ───
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans select-none">
      {/* ─── SIMULATION TOP BAR ─── */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-amber-950/70 rounded-2xl border border-amber-600/40">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-lg md:text-xl font-extrabold text-white tracking-wide">{title}</h1>
            <p className="text-xs text-amber-400 font-medium">ISC Class 12 Humanities • Decade of Independence (1940–1948)</p>
          </div>
        </div>

        {/* Dynamic Mode / Mastery Badge */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                : difficulty === 'advanced'
                ? 'bg-rose-950/80 text-rose-300 border-rose-600'
                : 'bg-gold-950/80 text-gold-300 border-gold-600'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300 font-mono">
            Mastery: {masteryLevel}
          </span>
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-amber-950/40 via-slate-900 to-gold-950/40 rounded-2xl border border-amber-600/30">
            <h2 className="text-xl font-black text-amber-300 mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mb-3 leading-relaxed">{SCENARIO.intro}</p>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-amber-200">
              💡 <strong>Historical Mission:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Discovery Question</span>
            <p className="text-base font-semibold text-white mt-2 mb-4 leading-relaxed">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900 text-slate-500 border border-slate-800 opacity-60'
                      : 'bg-slate-800/90 text-slate-200 hover:bg-slate-700/80 border border-slate-700'
                  }`}
                >
                  <span className="inline-block w-6 font-bold text-amber-400">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Opposing ideological demands doomed Cripps from day one.'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-amber-600/30 hover:shadow-amber-600/50"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Slide Navigation Header */}
          <div className="flex items-center justify-between bg-slate-900 px-4 py-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Discovery Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
            </div>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-8 bg-amber-500' : 'w-2 bg-slate-700'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              ref={timelineGSAgentRef}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-5"
            >
              <div>
                <h3 className="text-lg font-black text-amber-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-slate-300 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── LAB 1: WAR PRESSURE SLIDER & SVG PROGRESSION DIAGRAM ─── */}
              {currentSlide === 0 && (
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Low Crisis (1939–40)</span>
                    <span className="font-bold text-amber-400">Allied War Crisis Level: {warPressureLevel}%</span>
                    <span>Extreme Threat: Fall of Burma (1942)</span>
                  </div>
                  {/* Real-time Slider: Directly triggers state update and visual changes on drag */}
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={warPressureLevel}
                    onChange={(e) => setWarPressureLevel(Number(e.target.value))}
                    aria-label="War Pressure Slider"
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />

                  {/* SVG DIAGRAM 1: TOPIC-SPECIFIC CONSTITUTIONAL OFFERS TIMELINE */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 120" className="w-full h-auto">
                      {/* Timeline track */}
                      <line x1="50" y1="60" x2="550" y2="60" stroke="#334155" strokeWidth="4" />
                      <line
                        x1="50"
                        y1="60"
                        x2={50 + (500 * warPressureLevel) / 100}
                        y2="60"
                        stroke="#f59e0b"
                        strokeWidth="4"
                      />

                      {/* Milestone 1: August Offer (1940) */}
                      <circle
                        cx="100"
                        cy="60"
                        r={warPressureLevel < 35 ? '10' : '7'}
                        fill={warPressureLevel < 35 ? '#f59e0b' : '#3b82f6'}
                        stroke="#0f172a"
                        strokeWidth="2"
                      />
                      <text x="100" y="35" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Aug 1940
                      </text>
                      <text x="100" y="85" fill="#94a3b8" fontSize="9" textAnchor="middle">
                        August Offer
                      </text>

                      {/* Milestone 2: Cripps Mission (1942) */}
                      <circle
                        cx="300"
                        cy="60"
                        r={warPressureLevel >= 35 && warPressureLevel < 70 ? '10' : '7'}
                        fill={warPressureLevel >= 35 && warPressureLevel < 70 ? '#6366f1' : '#3b82f6'}
                        stroke="#0f172a"
                        strokeWidth="2"
                      />
                      <text x="300" y="35" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Mar 1942
                      </text>
                      <text x="300" y="85" fill="#94a3b8" fontSize="9" textAnchor="middle">
                        Cripps Mission
                      </text>

                      {/* Milestone 3: Cabinet Mission (1946) & Mountbatten Plan (1947) */}
                      <circle
                        cx="500"
                        cy="60"
                        r={warPressureLevel >= 70 ? '10' : '7'}
                        fill={warPressureLevel >= 70 ? '#ef4444' : '#3b82f6'}
                        stroke="#0f172a"
                        strokeWidth="2"
                      />
                      <text x="500" y="35" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">
                        1946–1947
                      </text>
                      <text x="500" y="85" fill="#94a3b8" fontSize="9" textAnchor="middle">
                        Cabinet/Mountbatten
                      </text>
                    </svg>
                  </div>

                  {/* Multi-Representation Matrix */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <div
                      className={`p-4 rounded-xl border transition-all ${
                        warPressureLevel < 35
                          ? 'bg-amber-950/60 border-amber-500 text-amber-200 scale-105'
                          : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      }`}
                    >
                      <span className="text-xs font-black uppercase text-amber-400">August Offer (1940)</span>
                      <p className="text-xs font-bold mt-1 text-white">Lord Linlithgow</p>
                      <ul className="text-xs mt-2 space-y-1 text-slate-300">
                        <li>• Post-war Dominion status</li>
                        <li>• Executive Council expanded</li>
                        <li>• Rejected: No immediate wartime power</li>
                      </ul>
                    </div>

                    <div
                      className={`p-4 rounded-xl border transition-all ${
                        warPressureLevel >= 35 && warPressureLevel < 70
                          ? 'bg-gold-950/60 border-gold-500 text-gold-200 scale-105 shadow-lg'
                          : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      }`}
                    >
                      <span className="text-xs font-black uppercase text-gold-400">Cripps Mission (1942)</span>
                      <p className="text-xs font-bold mt-1 text-white">Sir Stafford Cripps</p>
                      <ul className="text-xs mt-2 space-y-1 text-slate-300">
                        <li>• Dominion Status + Constituent Assembly</li>
                        <li>• Right to Secede for Provinces (Opt-Out)</li>
                        <li>• Gandhi: "Post-dated cheque on crashing bank"</li>
                      </ul>
                    </div>

                    <div
                      className={`p-4 rounded-xl border transition-all ${
                        warPressureLevel >= 70
                          ? 'bg-rose-950/60 border-rose-500 text-rose-200 scale-105 shadow-lg'
                          : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      }`}
                    >
                      <span className="text-xs font-black uppercase text-rose-400">Cabinet Mission (1946)</span>
                      <p className="text-xs font-bold mt-1 text-white">Pethick-Lawrence, Cripps, Alexander</p>
                      <ul className="text-xs mt-2 space-y-1 text-slate-300">
                        <li>• Rejected sovereign Pakistan</li>
                        <li>• 3-Tier Federal Groupings (A, B, C)</li>
                        <li>• Led to Direct Action & Partition</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: QUIT INDIA VS INA DUAL PATHS ─── */}
              {currentSlide === 1 && (
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setActiveMovementStream('quitIndia');
                        audioManager.play('tap');
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        activeMovementStream === 'quitIndia'
                          ? 'bg-amber-600 text-white shadow-md'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      🌿 Gandhian Mass Path: Quit India (1942)
                    </button>
                    <button
                      onClick={() => {
                        setActiveMovementStream('ina');
                        audioManager.play('tap');
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        activeMovementStream === 'ina'
                          ? 'bg-rose-600 text-white shadow-md'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      ⚔️ Netaji Bose Armed Path: INA (1943–1945)
                    </button>
                  </div>

                  {activeMovementStream === 'quitIndia' ? (
                    <div className="p-4 bg-amber-950/30 rounded-xl border border-amber-700/40 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-extrabold text-amber-300">8 August 1942 — Gwalia Tank, Bombay</span>
                        <span className="text-xs bg-amber-900/60 text-amber-200 px-2.5 py-0.5 rounded-full border border-amber-600">
                          Mantra: "Do or Die"
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        Following pre-dawn arrests on 9 August (Gandhi, Nehru, Patel to Aga Khan Palace & Ahmednagar Fort), the movement erupted spontaneously across India.
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="font-bold text-amber-400">945</p>
                          <p className="text-slate-400 text-[10px]">Railway Stations Damaged</p>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="font-bold text-amber-400">550</p>
                          <p className="text-slate-400 text-[10px]">Post Offices Overrun</p>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="font-bold text-amber-400">3 Parallel Govs</p>
                          <p className="text-slate-400 text-[10px]">Tamluk, Satara, Ballia</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-rose-950/30 rounded-xl border border-rose-700/40 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-extrabold text-rose-300">Azad Hind Fauj & Provisional Government</span>
                        <span className="text-xs bg-rose-900/60 text-rose-200 px-2.5 py-0.5 rounded-full border border-rose-600">
                          Slogans: "Dilli Chalo" & "Jai Hind"
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        Netaji reorganised Mohan Singh's 40,000 POWs into a modern multi-religious army in Singapore (1943), including Dr. Lakshmi Sahgal's Rani of Jhansi Regiment.
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="font-bold text-rose-400">14 April 1944</p>
                          <p className="text-slate-400 text-[10px]">Tricolour Hoisted at Moirang</p>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="font-bold text-rose-400">Nov 1945</p>
                          <p className="text-slate-400 text-[10px]">Red Fort Trials</p>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="font-bold text-rose-400">18 Feb 1946</p>
                          <p className="text-slate-400 text-[10px]">Royal Indian Navy Mutiny</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ─── LAB 3: 5 CONVERGING REASONS INSPECTOR ─── */}
              {currentSlide === 2 && (
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/50 rounded-xl border border-gold-700/40">
                      <span className="text-xs font-bold text-gold-400">🔮 PREDICT BEFORE SIMULATING</span>
                      <p className="text-xs font-semibold text-white mt-1 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="text-left p-2.5 bg-slate-900 rounded-lg text-xs text-slate-200 hover:bg-gold-900/60 border border-slate-800"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-emerald-950/40 border border-emerald-600/40 rounded-xl text-xs text-emerald-300">
                      ✓ {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </motion.div>
                  )}

                  {/* Real-time Slider connected directly to Visual & Canvas */}
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Indian Armed Forces Loyalty: {troopLoyaltyLevel}%</span>
                      <span className="text-rose-400">RIN Mutiny Trigger (Feb 1946)</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={troopLoyaltyLevel}
                      onChange={(e) => setTroopLoyaltyLevel(Number(e.target.value))}
                      aria-label="Troop Loyalty Slider"
                      className="w-full accent-gold-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />

                    {/* Canvas Dynamic Coercion Wave */}
                    <canvas ref={canvasRef} width={500} height={70} className="w-full bg-slate-900 rounded-xl border border-slate-800 mt-2" />

                    <div className="flex justify-between items-center text-xs px-2 text-slate-400">
                      <span>Coercive Empire Grip: <strong className={imperialControlIndex < 40 ? 'text-rose-400' : 'text-emerald-400'}>{imperialControlIndex}/100</strong></span>
                      <span className="text-amber-300">British Debt: £3.5 Billion</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: CABINET MISSION 3-TIER SVG ARCHITECTURE ─── */}
              {currentSlide === 3 && (
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-300">Cabinet Mission 3-Tier Constitutional Architecture</span>
                    <span className="text-xs text-amber-400">16 May 1946 Plan</span>
                  </div>

                  {/* SVG DIAGRAM 2: TOPIC-SPECIFIC 3-TIER CABINET MISSION ARCHITECTURE */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 160" className="w-full h-auto">
                      {/* Top Tier: Union Centre */}
                      <rect x="50" y="10" width="500" height="36" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="300" y="32" fill="#e0e7ff" fontSize="12" fontWeight="bold" textAnchor="middle">
                        TIER 1: UNION CENTRE (Defence, Foreign Affairs, Communications)
                      </text>

                      {/* Connecting lines */}
                      <line x1="140" y1="46" x2="140" y2="64" stroke="#6366f1" strokeWidth="2" />
                      <line x1="300" y1="46" x2="300" y2="64" stroke="#6366f1" strokeWidth="2" />
                      <line x1="460" y1="46" x2="460" y2="64" stroke="#6366f1" strokeWidth="2" />

                      {/* Middle Tier: Section Groups */}
                      <rect x="50" y="64" width="160" height="40" rx="6" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                      <text x="130" y="82" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">
                        SECTION A (Hindu Maj.)
                      </text>
                      <text x="130" y="96" fill="#94a3b8" fontSize="8" textAnchor="middle">
                        Madras, UP, Bombay, CP
                      </text>

                      <rect x="220" y="64" width="160" height="40" rx="6" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
                      <text x="300" y="82" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">
                        SECTION B (NW Muslim)
                      </text>
                      <text x="300" y="96" fill="#94a3b8" fontSize="8" textAnchor="middle">
                        Punjab, Sind, NWFP
                      </text>

                      <rect x="390" y="64" width="160" height="40" rx="6" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5" />
                      <text x="470" y="82" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">
                        SECTION C (NE Muslim)
                      </text>
                      <text x="470" y="96" fill="#94a3b8" fontSize="8" textAnchor="middle">
                        Bengal & Assam
                      </text>

                      {/* Bottom Tier: Autonomous Provinces */}
                      <rect x="50" y="116" width="500" height="32" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
                      <text x="300" y="136" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">
                        TIER 3: AUTONOMOUS PROVINCES & PRINCELY STATES (All Residual Powers)
                      </text>
                    </svg>
                  </div>

                  {/* OBSERVATION QUESTION */}
                  {!observationAnswered && (
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-xs font-bold text-amber-400">👁️ HISTORICAL OBSERVATION</p>
                      <p className="text-xs text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="w-full text-left p-2 bg-slate-950 rounded-lg text-xs text-slate-200 hover:bg-slate-800"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {observationAnswered && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-emerald-400">
                      ✓ Verified: The breakdown of the compulsory grouping clause led to Direct Action Day (16 Aug 1946) and compelled the Mountbatten Plan of 3 June 1947.
                    </motion.p>
                  )}
                </div>
              )}

              {/* ─── LAB 5: SARDAR PATEL PRINCELY STATES SVG GEOPOLITICAL MAP ─── */}
              {currentSlide === 4 && (
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-300">Geopolitical Map: Key Integration Hotspots (1947–1948)</span>
                    <span className="text-xs bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-600">
                      Integrated States: {princelyStateAccessionCount} / 562
                    </span>
                  </div>

                  {/* SVG DIAGRAM 3: TOPIC-SPECIFIC 1947–48 PRINCELY STATES MAP */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 240" className="w-full h-auto">
                      {/* Outline background for India subcontinent */}
                      <path
                        d="M260,20 L340,30 L380,80 L420,100 L440,150 L360,190 L300,230 L250,190 L210,130 L180,90 Z"
                        fill="#1e293b"
                        stroke="#475569"
                        strokeWidth="2"
                      />

                      {/* Kashmir Hotspot */}
                      <g
                        onClick={() => handleStateClick('kashmir')}
                        className="cursor-pointer transition-transform hover:scale-105"
                      >
                        <circle
                          cx="290"
                          cy="45"
                          r={selectedStateId === 'kashmir' ? '18' : '12'}
                          fill="#6366f1"
                          opacity="0.85"
                          stroke="#a5b4fc"
                          strokeWidth="2"
                        />
                        <text x="290" y="49" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                          J&K
                        </text>
                      </g>

                      {/* Junagarh Hotspot */}
                      <g
                        onClick={() => handleStateClick('junagarh')}
                        className="cursor-pointer transition-transform hover:scale-105"
                      >
                        <circle
                          cx="210"
                          cy="120"
                          r={selectedStateId === 'junagarh' ? '18' : '12'}
                          fill="#f59e0b"
                          opacity="0.85"
                          stroke="#fde68a"
                          strokeWidth="2"
                        />
                        <text x="210" y="124" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                          JUN
                        </text>
                      </g>

                      {/* Hyderabad Hotspot */}
                      <g
                        onClick={() => handleStateClick('hyderabad')}
                        className="cursor-pointer transition-transform hover:scale-105"
                      >
                        <circle
                          cx="310"
                          cy="145"
                          r={selectedStateId === 'hyderabad' ? '20' : '14'}
                          fill="#ef4444"
                          opacity="0.85"
                          stroke="#fca5a5"
                          strokeWidth="2"
                        />
                        <text x="310" y="149" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                          HYD
                        </text>
                      </g>

                      {/* Travancore Hotspot */}
                      <g
                        onClick={() => handleStateClick('travancore')}
                        className="cursor-pointer transition-transform hover:scale-105"
                      >
                        <circle
                          cx="285"
                          cy="210"
                          r={selectedStateId === 'travancore' ? '16' : '10'}
                          fill="#10b981"
                          opacity="0.85"
                          stroke="#a7f3d0"
                          strokeWidth="2"
                        />
                        <text x="285" y="213" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                          TRV
                        </text>
                      </g>
                    </svg>
                  </div>

                  {/* State Select Buttons */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { id: 'junagarh', name: 'Junagarh (Gujarat)', method: 'Plebiscite (95%+)', color: 'border-amber-500' },
                      { id: 'hyderabad', name: 'Hyderabad (Deccan)', method: 'Op Polo (108 hrs)', color: 'border-rose-500' },
                      { id: 'kashmir', name: 'J&K (Himalayas)', method: 'Accession & Art 370', color: 'border-gold-500' },
                      { id: 'travancore', name: 'Travancore (Kerala)', method: 'Patel Persuasion', color: 'border-emerald-500' },
                    ].map((st) => (
                      <motion.button
                        key={st.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleStateClick(st.id as 'junagarh' | 'hyderabad' | 'kashmir' | 'travancore')}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedStateId === st.id
                            ? `${st.color} bg-slate-900 shadow-md scale-102`
                            : 'border-slate-800 bg-slate-950 text-slate-400'
                        }`}
                      >
                        <p className="text-xs font-extrabold text-white">{st.name}</p>
                        <p className="text-[10px] text-amber-400 mt-1">{st.method}</p>
                      </motion.button>
                    ))}
                  </div>

                  {/* Selected State Strategic Details */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                    <span className="font-bold text-amber-300 uppercase tracking-wider">
                      Case Dossier: {selectedStateId.toUpperCase()}
                    </span>
                    {selectedStateId === 'junagarh' && (
                      <p className="text-slate-300">
                        Nawab Mahabat Khanji III acceded to Pakistan on 15 Sept 1947 despite an 80% Hindu population. Following an Indian economic blockade and the Nawab's flight to Karachi, a plebiscite on 20 Feb 1948 yielded <strong>190,870 votes for India vs 91 for Pakistan</strong>.
                      </p>
                    )}
                    {selectedStateId === 'hyderabad' && (
                      <p className="text-slate-300">
                        Nizam Mir Osman Ali Khan declared independence on 14 June 1947 and armed 100,000 Razakars under Kasim Razvi. Following atrocities at Chakradharpur & Parkal, Major-General J.N. Chaudhuri launched <strong>Operation Polo (13��18 Sept 1948)</strong>, liberating the state in 108 hours.
                      </p>
                    )}
                    {selectedStateId === 'kashmir' && (
                      <p className="text-slate-300">
                        Maharaja Hari Singh sought independence, but a Pakistani tribal invasion on 22 Oct 1947 forced emergency accession on <strong>26 Oct 1947</strong>. Indian troops were airlifted on 27 Oct. N. Gopalaswami Ayyangar drafted <strong>Article 370</strong>, guaranteeing asymmetric autonomy.
                      </p>
                    )}
                    {selectedStateId === 'travancore' && (
                      <p className="text-slate-300">
                        Sir C.P. Ramaswami Iyer declared independence on 11 June 1947. Following a public assassination attempt on 25 July and sustained diplomacy by Patel & V.P. Menon, Travancore signed the Instrument of Accession before 15 August 1947.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-mono">
              Step {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                className="px-5 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-amber-500"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 hover:bg-emerald-500"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX EXPLORATION ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-black text-amber-300">Free Geopolitical Sandbox (1940–1948)</h2>
              <p className="text-xs text-slate-400 mt-0.5">Test variables freely with zero grading pressure before formal challenges.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-black text-xs shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          {/* Sandbox Live Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-extrabold text-amber-400 uppercase">Imperial Strength Variables</span>
              
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>War Crisis: {warPressureLevel}%</span>
                  <span className="text-amber-400 font-mono text-[11px]">{calculatedOfferStatus}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={warPressureLevel}
                  onChange={(e) => setWarPressureLevel(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Troop Loyalty: {troopLoyaltyLevel}%</span>
                  <span className="text-rose-400 font-mono text-[11px]">
                    {troopLoyaltyLevel < 50 ? '⚠️ Military Mutiny Risk' : 'Armies Loyal'}
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={troopLoyaltyLevel}
                  onChange={(e) => setTroopLoyaltyLevel(Number(e.target.value))}
                  className="w-full accent-gold-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>
            </div>

            <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-extrabold text-gold-400 uppercase">Interactive State Selector</span>
              <div className="grid grid-cols-2 gap-2">
                {(['junagarh', 'hyderabad', 'kashmir', 'travancore'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStateClick(st)}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left border ${
                      selectedStateId === st
                        ? 'bg-gold-950 border-gold-500 text-gold-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {st.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="p-3 bg-slate-950 rounded-xl text-xs text-slate-300 border border-slate-800">
                Active State: <strong>{selectedStateId.toUpperCase()}</strong> — Handled by Sardar Patel & V.P. Menon via legal instruments and tailored intervention.
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: PROGRESSIVE ADAPTIVE CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress & Stats Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Challenge <strong>{currentChallenge + 1}</strong> of {filteredChallenges.length}
            </span>
            <span className="font-mono text-amber-400">
              Score: {Math.max(0, 100 - errors * 5)}% • Correct: {scoreBreakdown.correct}/{scoreBreakdown.total}
            </span>
          </div>

          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 via-gold-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Challenge Box */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                ISC Competency: {challenge.competencyLevel.toUpperCase()}
              </span>
              <span className="text-[10px] bg-slate-800 px-2.5 py-0.5 rounded-full text-slate-400 font-mono">
                Node: {challenge.nodeId}
              </span>
            </div>

            <p className="text-base font-semibold text-white leading-relaxed">{challenge.question}</p>

            {/* ── TYPE 1: MCQ ── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5 mt-4">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 2 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                        wrongFlash
                          ? 'bg-rose-900/60 border-2 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/90 text-slate-200 hover:bg-slate-700/90 border border-slate-700'
                      }`}
                    >
                      <span className="inline-block w-6 font-bold text-amber-400">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* ── TYPE 2: DRAG LABEL ── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 mt-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gold-700 rounded-xl cursor-grab text-white text-xs font-bold shadow-md"
                    >
                      ✥ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map((targetId) => (
                    <div
                      key={targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 text-center min-h-[90px] flex flex-col justify-center items-center"
                    >
                      <span className="text-[10px] text-slate-400 uppercase font-mono">{targetId.replace('role_', 'Portfolio: ')}</span>
                      <p className="text-xs font-bold text-amber-300 mt-1">
                        {droppedLabels[targetId] || '👉 Drop Minister Here'}
                      </p>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Verify Portfolios
                </motion.button>
              </div>
            )}

            {/* ── TYPE 3: DRAG SORT ── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 mt-4">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
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
                    className="p-3 bg-slate-800 rounded-xl text-xs font-medium text-slate-200 cursor-grab flex items-center gap-3 border border-slate-700"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-amber-400 font-bold text-[10px]">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    handleAnswer(
                      sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || []
                    )
                  }
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-amber-600 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Verify Chronology
                </motion.button>
              </div>
            )}

            {/* ── TYPE 4: NUMERIC INPUT ── */}
            {challenge.type === 'numeric' && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter exact number"
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm font-mono w-48 focus:border-amber-500 outline-none"
                />
                <span className="text-xs text-slate-400 font-medium">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation}
                  className="px-6 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold"
                >
                  Submit Value
                </motion.button>
              </div>
            )}

            {/* ── TYPE 5: CONSTRUCT ── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3 mt-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-900/60 hover:bg-gold-800 border border-gold-700 rounded-xl text-xs text-gold-200"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] space-y-2">
                  {constructParts.map((part, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-slate-900 rounded-lg text-xs text-amber-200 flex justify-between items-center border border-slate-800"
                    >
                      <span>
                        Tier {idx + 1}: {part}
                      </span>
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 text-xs px-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {constructParts.length === 0 && (
                    <p className="text-slate-500 text-xs text-center py-2">Click tiers above to build the architecture</p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0 || showExplanation}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold"
                >
                  Validate Architecture
                </motion.button>
              </div>
            )}

            {/* ── PROGRESSIVE STEP-BY-STEP EXPLANATION CARD ── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-700/50 rounded-2xl space-y-3"
              >
                <span className="text-xs font-black uppercase text-amber-300 tracking-wider">
                  Historical Analysis & Examination Walkthrough:
                </span>

                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-slate-200 leading-relaxed"
                    >
                      <strong className="text-amber-400">{idx + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex justify-between items-center pt-2">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-2 bg-amber-700 text-white rounded-xl text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Mastery →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION, REFLECTION & SPACED REPETITION VISIBILITY ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-emerald-950/50 via-slate-900 to-amber-950/50 rounded-2xl border border-emerald-600/40 text-center">
            <h2 className="text-2xl font-black text-white">Simulation Completed!</h2>
            <p className="text-base text-amber-300 font-mono mt-1">
              Final Examination Score: {Math.max(0, 100 - errors * 5)}%
            </p>
            <p className="text-xs text-slate-400 mt-1">Mastery Status: {masteryLevel.toUpperCase()}</p>
          </div>

          {/* ── SPACED REPETITION VISIBILITY (SRS) BANNER ── */}
          <div className={`p-5 rounded-2xl border ${
            srsSchedule.color === 'emerald'
              ? 'bg-emerald-950/50 border-emerald-500/60'
              : srsSchedule.color === 'amber'
              ? 'bg-amber-950/50 border-amber-500/60'
              : 'bg-rose-950/50 border-rose-500/60'
          } space-y-3`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">📅</span>
                <span className="text-sm font-black text-white uppercase tracking-wider">
                  Spaced Repetition Schedule (NEP 2020 Long-Term Retention)
                </span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
                srsSchedule.color === 'emerald'
                  ? 'bg-emerald-900 text-emerald-200 border-emerald-400'
                  : srsSchedule.color === 'amber'
                  ? 'bg-amber-900 text-amber-200 border-amber-400'
                  : 'bg-rose-900 text-rose-200 border-rose-400'
              }`}>
                {srsSchedule.badge}
              </span>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-left">
                <p className="text-xs text-slate-300 font-medium">{srsSchedule.message}</p>
                <p className="text-[11px] text-slate-400 font-mono">
                  • Algorithm: SuperMemo SM-2 & Bayesian Knowledge Tracing • Retention target: 95%
                </p>
              </div>
              <div className="text-center px-4 py-2 bg-slate-900 rounded-xl border border-slate-700 min-w-[140px]">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Next Retrieval</span>
                <span className={`text-sm font-black ${
                  srsSchedule.color === 'emerald'
                    ? 'text-emerald-400'
                    : srsSchedule.color === 'amber'
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}>
                  in {srsSchedule.days} day{srsSchedule.days > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-xs font-black text-emerald-400 uppercase">Performance Evaluation</span>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {errors === 0
                ? '🏆 Flawless Historical Mastery! You analyzed every constitutional offer, armed struggle, and princely state integration with impeccable precision.'
                : errors <= 3
                ? '🌟 Excellent analytical rigor! You demonstrated deep comprehension of the 1940–1948 transition. Review the misconceptions below for perfection.'
                : '📚 Good effort! History is a complex causal chain. Re-read the princely states accessions and constitutional offers, then attempt the challenge again.'}
            </p>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/50 space-y-3">
              <span className="text-xs font-black text-rose-300 uppercase">Your Misconception Diagnostic Profile</span>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Archival Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real World Activity Arc */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-black text-gold-400 uppercase">{REAL_WORLD_ACTIVITY.title}</span>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ol className="list-decimal list-inside text-xs text-slate-400 space-y-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i}>{st}</li>
              ))}
            </ol>
          </div>
        </motion.div>
      )}

      {/* ─── AUDIO & VISUAL OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_HistoryAugustOffer1940Sim;
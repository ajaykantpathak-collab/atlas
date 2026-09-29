'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC SOCIOLOGY NODE IDENTIFIERS ───
const NODE_C11_SOC_011 = 'c11_soc_011'; // Tools of Data Collection
const NODE_C11_SOC_012 = 'c11_soc_012'; // Definition and Characteristics of Society
const NODE_C11_SOC_013 = 'c11_soc_013'; // Rural and Urban Society
const NODE_C11_SOC_014 = 'c11_soc_014'; // Socialization – Agencies
const NODE_C11_SOC_015 = 'c11_soc_015'; // Nature vs Nurture and Feral Cases
const NODE_C11_SOC_016 = 'c11_soc_016'; // Culture – Definition and Norms
const NODE_C11_SOC_017 = 'c11_soc_017'; // Material/Non-Material Culture & Culture Lag
const NODE_C11_SOC_018 = 'c11_soc_018'; // Social Groups – Community, Association & Primary/Secondary
const NODE_C11_SOC_019 = 'c11_soc_019'; // Organized/Unorganized & Reference/In/Out Groups
const NODE_C11_SOC_020 = 'c11_soc_020'; // Status – Ascribed, Achieved and Determinants

const ALL_NODE_IDS = [
  NODE_C11_SOC_011,
  NODE_C11_SOC_012,
  NODE_C11_SOC_013,
  NODE_C11_SOC_014,
  NODE_C11_SOC_015,
  NODE_C11_SOC_016,
  NODE_C11_SOC_017,
  NODE_C11_SOC_018,
  NODE_C11_SOC_019,
  NODE_C11_SOC_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Fieldwork in the Deccan: The Sociologist’s Expedition',
  intro: 'You are an apprentice sociologist joining an intensive research expedition across Karnataka, Maharashtra, Meghalaya, and Jharkhand. Your mission is to master the empirical tools of social research, understand how human beings become social, decode culture and institutions, and analyse status inequalities.',
  context: 'From investigating agrarian distress in Vidarbha to mapping matrilineal inheritance among the Khasis and decoding crowd dynamics at the Kumbh Mela, your toolkit will determine your analytical rigor.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In 1920, two young girls (Amla & Kamala) were discovered living among wolves near Midnapore, Bengal. What happened when they were brought into human society?',
  options: [
    'They immediately spoke fluent Bengali because language is purely genetic (Nature)',
    'They walked on all fours, howled at night, and struggled to learn language because human traits require socialisation (Nurture)',
    'They formed an organized political association within weeks',
    'Their ascribed caste status changed their biological reflexes automatically'
  ],
  correctIndex: 1,
  hintAfter: 'Human nature is not merely biological! Without socialisation (nurture), innate human potential remains unrealised. Let us explore the laboratory of sociology!',
};

// ─── INTERFACES ───
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

// ─── DEFAULT ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_SOC_011,
  title: 'Tools of Data Collection & Foundations of Sociology',
  definition: 'Tools of data collection are practical instruments (questionnaires, interviews, observation, documentary research) through which sociologists collect empirical evidence to study society, culture, social groups, institutions, and status.',
  eli5: 'Think of sociology as investigating how people live together. The tools are your magnifying glass and notebook; society is the hive; culture is the honey and rules; socialisation is how bees learn their jobs.',
  misconceptions: [
    { misconception: 'Questionnaire and interview are research methods.', correction: 'Questionnaire and interview are specific tools of data collection used within broader methods like the survey method.' },
    { misconception: 'Secondary data like the Census is always inferior to primary data.', correction: 'Secondary data from massive national sources like Census 2011 or NFHS-5 is often far more robust and representative than a small primary sample.' },
    { misconception: 'Feral children prove that nature is stronger than nurture.', correction: 'Feral cases (Genie, Amla & Kamala) prove that without nurture and socialisation, biological human potential cannot develop into social personhood.' },
    { misconception: 'Culture lag and culture conflict mean the exact same thing.', correction: 'Culture lag is the gap in speed when material culture changes faster than non-material norms; culture conflict is the clash of opposing values.' },
    { misconception: 'Status in sociology refers to wealth or prestige.', correction: 'Sociologically, status is simply any socially defined position in a group (e.g., voter, daughter, doctor), not prestige.' }
  ],
  diagnosticQuestions: [
    { question: 'Which tool did M.N. Srinivas primarily use to study Rampura village?', options: ['Mailed postal questionnaire', 'Participant observation & interviews', 'Digital satellite census', 'Laboratory experiment'], correctIndex: 1 },
    { question: 'What did William F. Ogburn formulate in 1922?', options: ['Theory of Natural Selection', 'Concept of Culture Lag', 'Looking-glass Self', 'Gemeinschaft & Gesellschaft'], correctIndex: 1 },
    { question: 'Which of the following is an Ascribed status in traditional Indian society?', options: ['IAS Officer', 'Software Engineer', 'Caste by birth', 'PhD Graduate'], correctIndex: 2 },
    { question: 'What type of group is SEWA (Self-Employed Women’s Association)?', options: ['Spontaneous crowd', 'Deliberately formed Association', 'Feral group', 'Pure Gemeinschaft'], correctIndex: 1 },
    { question: 'Who defined culture as "that complex whole which includes knowledge, belief, art, morals..."?', options: ['Edward B. Tylor', 'Charles Darwin', 'Ralph Linton', 'Louis Wirth'], correctIndex: 0 },
    { question: 'What percentage of India’s population was rural according to Census 2011?', options: ['31.16%', '68.84%', '50.00%', '85.20%'], correctIndex: 1 },
    { question: 'A sacred grove (Law Kyntang) among Khasis combines which elements?', options: ['Material forest protected by non-material religious taboo', 'Only material wood extraction', 'Only non-material imagination with no physical trees', 'Government industrial park'], correctIndex: 0 },
    { question: 'Which sociologist introduced the distinction between Status and Role?', options: ['Ralph Linton', 'Robert K. Merton', 'Charles Horton Cooley', 'Iravati Karve'], correctIndex: 0 }
  ],
  masteryCriteria: 'Master all 10 core ISC sociology nodes: research tools, society, rural/urban differences, socialization, nature/nurture, culture types, norms/mores, group classifications, and status determinants.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Tool Selection Lab: Primary vs Secondary',
    instruction: 'Select a research scenario and click the most robust data collection tool to test field efficacy.',
    interactionType: 'tool-matrix',
    nodeId: NODE_C11_SOC_011,
  },
  {
    title: 'Durkheimian Solidarity & Settlement Dynamics',
    instruction: 'Adjust the Urbanisation & Division of Labour slider to watch Mechanical Solidarity transform into Organic Solidarity.',
    interactionType: 'solidarity-slider',
    nodeId: NODE_C11_SOC_013,
  },
  {
    title: 'The Socialisation Matrix & Feral Cases',
    instruction: 'Toggle between Nature (Biological Hardware) and Nurture (Social Software) to see how personhood is formed.',
    interactionType: 'nature-nurture-toggle',
    nodeId: NODE_C11_SOC_015,
  },
  {
    title: 'Ogburn’s Culture Lag Simulator',
    instruction: 'Accelerate Material Technology (e.g., Smartphones/AI) and observe the Lag Gap before Non-Material Norms catch up.',
    interactionType: 'culture-lag-engine',
    nodeId: NODE_C11_SOC_017,
  },
  {
    title: 'Social Group & Status Matrix',
    instruction: 'Classify real Indian entities (SEWA, Toda hamlet, Kumbh crowd, IAS officer) into Group and Status quadrants.',
    interactionType: 'status-group-mapper',
    nodeId: NODE_C11_SOC_020,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an ethnographer wants to study unspoken matriarchal inheritance customs among the Khasis of Meghalaya, which tool will yield the deepest insights?',
    options: ['Mailed questionnaire with closed tick boxes', 'Participant observation living with Khasi households', 'Telephonic automated robocall', 'Reading international stock market reports'],
    correctIndex: 1,
    verifyInstruction: 'Now click "Participant Observation" in the Tool Lab to test the depth index!',
    nodeId: NODE_C11_SOC_011,
  },
  {
    question: 'Predict: What happens when material technology advances by +80% but legal and ethical norms remain at +10%?',
    options: ['Complete societal harmony', 'A large Culture Lag gap resulting in potential social tension and culture conflict', 'Instant biological mutation of the population', 'Abolition of all social groups'],
    correctIndex: 1,
    verifyInstruction: 'Drag the Technology Speed slider to 80% and watch the red Culture Lag gap expand!',
    nodeId: NODE_C11_SOC_017,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about Organic Solidarity as occupational specialisation reaches maximum in cities?',
    observableOptions: [
      'People become totally self-sufficient and never need anyone else',
      'Interdependence increases because people rely on specialised services (doctors, farmers, drivers, engineers)',
      'Everyone performs identical agricultural rituals',
      'All social rules disappear completely'
    ],
    correctIndex: 1,
    nodeId: NODE_C11_SOC_013,
  },
  {
    question: 'In the Culture Lag simulation, what forms the "Non-Material" component of traditional Indian water harvesting (Johads/Eris)?',
    observableOptions: [
      'The physical stone walls and earth',
      'The community ethic of shramdaan (voluntary labour) and water-sharing rules',
      'The diesel pump machinery',
      'The rainfall droplets'
    ],
    correctIndex: 1,
    nodeId: NODE_C11_SOC_017,
  },
];

// ─── CHALLENGES (20+ Rich Competency & Diverse Types) ───
const CHALLENGES: Challenge[] = [
  // Foundation - Recall (c11_soc_011)
  {
    id: 'ch_01',
    nodeId: NODE_C11_SOC_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'NFHS-5 gathered nutrition and health data from over 6 lakh households across India using pre-coded schedules. What tool of data collection was primarily used?',
    options: ['Structured Questionnaire', 'Unstructured Free Chat', 'Documentary Ancient Scroll reading', 'Participant observation in every home for 5 years'],
    correctIndex: 0,
    explanation: 'A structured questionnaire contains standardised, pre-coded questions ideal for large-scale national surveys like NFHS-5.',
    hints: [
      'Think of a standardised printed or digital list of questions sent to thousands of households.',
      'It allows rapid quantification across large populations.',
      'It is the workhorse of survey research: the questionnaire.'
    ],
    misconceptionIndex: 0,
  },
  // Foundation - Understanding (c11_soc_012)
  {
    id: 'ch_02',
    nodeId: NODE_C11_SOC_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is a crowd of 2,000 commuters waiting on Platform 1 of New Delhi Railway Station NOT considered a "society" by MacIver and Page?',
    options: ['They are too few in number', 'They lack enduring social relationships, shared comprehensive culture, and mutual permanence', 'They are in a city rather than a village', 'They are using modern trains'],
    correctIndex: 1,
    explanation: 'Society is a system of usages, relationships, and mutual aid with continuity. A railway crowd is an aggregate that disperses without enduring bonds.',
    hints: [
      'Recall MacIver’s definition: society is a web of relationships, not just a physical crowd.',
      'Do commuters on a platform have permanent shared customs and institutions?',
      'An aggregate lacks continuity, shared culture, and reciprocal social ties.'
    ],
  },
  // Foundation - Drag Label (c11_soc_018)
  {
    id: 'ch_03',
    nodeId: NODE_C11_SOC_018,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct group classifications to the matching sociological examples.',
    dragItems: [
      { label: 'Primary Group (Cooley)', targetId: 'target_family' },
      { label: 'Secondary Association (Tönnies Gesellschaft)', targetId: 'target_sewa' },
      { label: 'Community (Gemeinschaft)', targetId: 'target_toda' },
      { label: 'Unorganized Crowd', targetId: 'target_station' },
    ],
    correctMapping: {
      target_family: 'Primary Group (Cooley)',
      target_sewa: 'Secondary Association (Tönnies Gesellschaft)',
      target_toda: 'Community (Gemeinschaft)',
      target_station: 'Unorganized Crowd',
    },
    explanation: 'Family is an intimate primary group; SEWA is a goal-oriented association; a Toda settlement is an organic community; railway commuters form an unorganized crowd.',
    hints: [
      'Family is based on face-to-face emotional intimacy (Cooley).',
      'SEWA was deliberately formed with written rules for trade union goals.',
      'The Toda hamlet is an organic community living in shared territory.'
    ],
  },
  // Foundation - Recall (c11_soc_016)
  {
    id: 'ch_04',
    nodeId: NODE_C11_SOC_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following represents a "Folkway" in Indian society rather than a "More"?',
    options: ['Greeting elders with a respectful namaste or bow', 'Marrying within the gotra in violation of khap endogamy rules', 'Violating sacred dietary taboos in orthodox temples', 'Committing violent assault'],
    correctIndex: 0,
    explanation: 'Folkways are everyday conventions with mild social sanctions (e.g. namaste), whereas mores carry heavy moral weight and severe punishments.',
    hints: [
      'Look for the convention whose violation produces only mild disapproval, not violent outrage.',
      'Eating with the right hand or greeting with namaste are classic folkways.',
      'Mores involve severe penalties and moral codes.'
    ],
    misconceptionIndex: 1,
  },
  // Foundation - Understanding (c11_soc_020)
  {
    id: 'ch_05',
    nodeId: NODE_C11_SOC_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Who systematically distinguished the sociological concept of "Status" (position) from "Role" (expected behaviour)?',
    options: ['Ralph Linton', 'Karl Marx', 'Charles Darwin', 'Edward B. Tylor'],
    correctIndex: 0,
    explanation: 'Ralph Linton established the distinction between status (the spot or position in a structure) and role (the behavioural performance).',
    hints: [
      'This American sociologist also formulated the concept of the "status set".',
      'His name begins with R. L.',
      'Ralph Linton is the theorist behind status and role.'
    ],
  },
  // Foundation - Drag Sort (c11_soc_014)
  {
    id: 'ch_06',
    nodeId: NODE_C11_SOC_014,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the chronology of Socialisation Agencies in an individual’s life course from earliest to later stages.',
    sortItems: [
      'Primary Family & Kinship (Infancy/Language/Bonding)',
      'Neighbourhood Peer Playgroup (Egalitarian Interaction)',
      'Formal Schooling & Hidden Curriculum (Discipline/Punctuality)',
      'Professional Workplace & Civic State Institutions (Adult Socialisation)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Socialisation starts at birth in the family, expands to playgroups, enters formal schooling, and continues into adult occupational and civic life.',
    hints: [
      'The child starts in the intimate cradle of the family.',
      'Next comes peer play in the neighbourhood, followed by formal education.',
      'Workplace and state institutions shape adult life.'
    ],
  },
  // Standard - Application (c11_soc_011)
  {
    id: 'ch_07',
    nodeId: NODE_C11_SOC_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A sociologist is researching farmer suicides in Yavatmal (Vidarbha). To balance emotional family narratives with district-level loan distress data, which triangulation is best?',
    options: [
      'Semi-structured In-depth Interviews + NCRB & NSSO Documentary Analysis',
      'Mailed questionnaire in English only to all farmers',
      'Satellite photography only with no human interviews',
      'Laboratory psychological brain scans'
    ],
    correctIndex: 0,
    explanation: 'Combining qualitative in-depth interviews (lived trauma, debt pressures) with quantitative documentary records (NCRB/NSSO statistics) provides robust triangulation.',
    hints: [
      'You need both micro-level human emotion and macro-level statistical facts.',
      'Questionnaires fail if illiteracy exists; in-depth interviews offer sensitivity.',
      'Triangulation couples qualitative interviews with secondary official records.'
    ],
  },
  // Standard - Numeric (c11_soc_013)
  {
    id: 'ch_08',
    nodeId: NODE_C11_SOC_013,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'According to Census 2011, what percentage of India’s population lived in rural areas? (Enter the percentage to 2 decimal places, e.g. 68.84)',
    correctAnswer: 68.84,
    tolerance: 0.5,
    unit: '%',
    explanation: 'Census 2011 recorded 68.84% of India’s population (~833 million people) living across approximately 6.4 lakh rural villages.',
    hints: [
      'It is just under 70 per cent.',
      'Urban population was 31.16%, so subtract from 100.',
      'The exact figure is 68.84%.'
    ],
  },
  // Standard - Analysis (c11_soc_015)
  {
    id: 'ch_09',
    nodeId: NODE_C11_SOC_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What do the feral cases of Genie (isolated in a room) and Kamala & Amla (raised in a wolf den) conclusively prove about human nature?',
    options: [
      'Genetic heredity alone guarantees full human speech and upright bipedal posture',
      'Heredity provides biological potential, but socialisation (nurture) is indispensable to actualise human personhood',
      'Social environment has zero impact on human language development',
      'Animals possess a superior moral legal system to humans'
    ],
    correctIndex: 1,
    explanation: 'Feral cases prove that without socialisation (nurture), the biological hardware (nature) remains unrealised. Society makes the human person.',
    hints: [
      'Genie had normal genes but could not speak grammar after 13 years of isolation.',
      'Amla and Kamala acquired wolf-like howling and quadrapedal gait.',
      'Nurture is essential to activate innate biological potential.'
    ],
    misconceptionIndex: 2,
  },
  // Standard - Application (c11_soc_017)
  {
    id: 'ch_10',
    nodeId: NODE_C11_SOC_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In Rajasthan, "Johads" (earthen check-dams) revived by Rajendra Singh represent which cultural fusion?',
    options: [
      'Pure non-material fantasy with no engineering',
      'Material hydraulic earthen engineering fused with non-material "shramdaan" (community labour ethic)',
      'Foreign imported artificial intelligence with no community involvement',
      'Culture lag that led to permanent village breakdown'
    ],
    correctIndex: 1,
    explanation: 'Johads combine material earthen dams with non-material traditions of voluntary collective labour (shramdaan) and customary water-sharing rules.',
    hints: [
      'The physical dam is material; the cooperative ethic and customs are non-material.',
      'Traditional Indian practices often harmonise physical tools with social values.',
      'Johads unite earthen engineering with community shramdaan.'
    ],
    misconceptionIndex: 3,
  },
  // Standard - Analysis (c11_soc_019)
  {
    id: 'ch_11',
    nodeId: NODE_C11_SOC_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A first-generation Dalit student from a rural school joins an elite Delhi college and adopts the speech, reading habits, and dress of senior professors and scholars. In Merton’s terms, what are the scholars acting as?',
    options: ['An In-group to which she was born', 'A Reference Group serving as a standard for self-evaluation and aspiration', 'An Unorganized violent mob', 'A Feral pack'],
    correctIndex: 1,
    explanation: 'Robert K. Merton defined a reference group as any group an individual uses as a benchmark for self-evaluation and aspiration, even if they are not yet a member.',
    hints: [
      'She is evaluating and shaping her behavior based on an external standard.',
      'Sumner coined in/out-group, but Merton developed this aspirational concept.',
      'It is called a Reference Group.'
    ],
  },
  // Standard - Construct (c11_soc_020)
  {
    id: 'ch_12',
    nodeId: NODE_C11_SOC_020,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Construct Andre Béteille’s thesis on Indian social stratification by selecting the three overlapping determinants that coexist in modern India.',
    availableParts: ['Caste (Ascribed)', 'Class (Achieved/Economic)', 'Power (Political Authority)', 'Genetic Purity', 'Nomadic Instinct'],
    targetState: 'Caste (Ascribed) Class (Achieved/Economic) Power (Political Authority)',
    validationHint: 'Select the 3 pillars of Béteille’s famous 1965 Sripuram study (Caste, Class, and Power).',
    explanation: 'Andre Béteille demonstrated that Indian stratification is an overlapping trinity of Caste (ascribed status), Class (economic achieved status), and Power (political authority).',
    hints: [
      'Think of Béteille’s landmark 1965 book title: "Caste, Class and..."',
      'Traditional ascription (Caste) coexists with modern achievement (Class) and democracy (Power).',
      'Pick Caste (Ascribed), Class (Achieved/Economic), and Power (Political Authority).'
    ],
  },
  // Advanced - Evaluation (c11_soc_011)
  {
    id: 'ch_13',
    nodeId: NODE_C11_SOC_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate why colonial Census reports (e.g. 1872, 1901 Risley census) must be analysed with critical scrutiny when used as secondary documentary data.',
    options: [
      'They were written before printing presses existed',
      'They were shaped by colonial administrative convenience and racialised theories of caste hierarchy rather than objective Indian self-understanding',
      'They only recorded weather and crop prices, not people',
      'Secondary data is always completely fabricated and unusable'
    ],
    correctIndex: 1,
    explanation: 'Documentary research requires evaluating source bias: Herbert Risley’s colonial census imposed rigid racial/anthropometric hierarchies onto fluid jati relationships.',
    hints: [
      'Documentary research requires checking authenticity and author perspective.',
      'Did British colonial administrators view caste through their own imperial framework?',
      'Colonial records reflected imperial administrative agendas and racial theories.'
    ],
    misconceptionIndex: 1,
  },
  // Advanced - Analysis (c11_soc_013)
  {
    id: 'ch_14',
    nodeId: NODE_C11_SOC_013,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Contrast social control in Rampura village (Srinivas) with social control in a Bengaluru IT corridor (Wirth/Simmel). Which statement is analytically sound?',
    options: [
      'Villages rely on formal cyber police; cities rely entirely on temple priests',
      'Villages rely predominantly on informal control (caste elders, kinship, religion); cities rely primarily on formal contractual control (law, police, corporate HR)',
      'Both have identical mechanisms with zero differences',
      'Cities have no rules or social control whatsoever'
    ],
    correctIndex: 1,
    explanation: 'Rural social control is informal and rooted in primary ties (kinship, panchayat, caste); urban control is formal, institutional, and legal.',
    hints: [
      'How are disputes resolved in a traditional village versus an IT corporate park?',
      'Informal custom vs formal codified law.',
      'Primary kinship networks control village life; formal legal institutions govern cities.'
    ],
  },
  // Advanced - Evaluation (c11_soc_017)
  {
    id: 'ch_15',
    nodeId: NODE_C11_SOC_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In 2024, the Supreme Court directed the regulation of AI deepfakes and WhatsApp misinformation that triggered community unrest. Which sociological concept best explains this crisis?',
    options: [
      'Mechanical Solidarity triumphing over Organic Solidarity',
      'Ogburn’s Culture Lag — rapid material technological diffusion (AI/smartphones) outpaced non-material legal, ethical, and verification norms',
      'Natural Selection eliminating non-digital humans',
      'Complete replacement of Achieved status by Ascribed status'
    ],
    correctIndex: 1,
    explanation: 'Smartphones and generative AI spread in months (material culture), while cyber laws, privacy norms, and digital literacy (non-material culture) lag years behind.',
    hints: [
      'Look at the speed gap: technology vs laws and social habits.',
      'William F. Ogburn coined this gap in 1922.',
      'It is a classic instance of Culture Lag leading to social tension.'
    ],
    misconceptionIndex: 3,
  },
  // Advanced - Analysis (c11_soc_016)
  {
    id: 'ch_16',
    nodeId: NODE_C11_SOC_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'An inter-caste couple marries under the Special Marriage Act, 1954. A rural Khap Panchayat violently threatens them for violating caste endogamy. How does sociology analyze this clash?',
    options: [
      'A clash between formal state legal norms/constitutional values of equality and entrenched informal community mores of caste purity',
      'A biological conflict between two different human species',
      'A mere misunderstanding of grammar in a questionnaire',
      'An instance of feral child behavior'
    ],
    correctIndex: 0,
    explanation: 'This highlights the tension between formal legal values (Constitutional equality, Article 21) and traditional mores (caste endogamy enforced by informal sanctions).',
    hints: [
      'The law says equality (constitutional value); the khap says caste endogamy (traditional more).',
      'Analyze the two competing normative systems.',
      'It is a conflict between formal state law and informal community mores.'
    ],
  },
  // Advanced - Drag Sort (c11_soc_019)
  {
    id: 'ch_17',
    nodeId: NODE_C11_SOC_019,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange collective entities in increasing order of Formal Organization & Structure (from least structured to most structured).',
    sortItems: [
      'Spontaneous Mob / Riot Gathering (Emotional, fleeting, no formal roles)',
      'Public Debating Minimum Support Price (Diffuse, communicative network)',
      'Informal Village Youth Cricket Club (Semi-regular, verbal understandings)',
      'Indian Armed Forces / State Bank of India (Hierarchical, written constitution, permanent chain of command)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'A mob is fleeting and unstructured; a public is a diffuse communicative arena; an informal club has loose norms; the Army/SBI represents maximal formal organization.',
    hints: [
      'The mob has the least structure and highest emotional contagion.',
      'Publics discuss; informal clubs organize lightly.',
      'A bureaucratic army or bank has the highest formal hierarchy and written codification.'
    ],
  },
  // Advanced - Creativity / Synthesis (c11_soc_014)
  {
    id: 'ch_18',
    nodeId: NODE_C11_SOC_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'To combat son preference in districts with skewed sex ratios (NFHS-5), a sociologist designs a secondary socialisation intervention. Which combination is most effective?',
    options: [
      'Banning all schools and returning exclusively to joint family patriarchal storytelling',
      'Integrating gender-neutral school curricula, screening films on female achievers (media), and engaging female Sarpanches as community role models',
      'Distributing printed questionnaires with no follow-up action',
      'Isolating newborn girls in dark rooms to test heredity'
    ],
    correctIndex: 1,
    explanation: 'Mobilising schools (formal curriculum), media (inspirational role models), and local governance leverages secondary agencies to reshape inherited patriarchal biases.',
    hints: [
      'Secondary agencies can actively counteract biased primary socialisation.',
      'Combine education, mass media, and state leadership.',
      'School curriculum + media role models + female leadership intervention.'
    ],
  },
  // Advanced - Evaluation (c11_soc_020)
  {
    id: 'ch_19',
    nodeId: NODE_C11_SOC_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In August 2024, the Supreme Court (Davinder Singh v. State of Punjab) allowed sub-classification within Scheduled Castes to ensure affirmative action reaches the most backward. How does this reflect status theory?',
    options: [
      'It proves caste status has completely disappeared from Indian society',
      'It recognizes that within a broad ascribed category, internal inequalities exist, requiring achieved state policy tools to redistribute opportunities',
      'It converts all citizens into feral children',
      'It bans all university degrees in India'
    ],
    correctIndex: 1,
    explanation: 'The judgment acknowledges that ascribed social categories are internally stratified, requiring targeted state policy (achieved access) for disadvantaged sub-castes.',
    hints: [
      'Does holding an ascribed SC category mean all sub-castes have equal status and access?',
      'Sub-classification recognizes fine-grained disparities in ascribed status.',
      'The state uses policy tools to assist the most marginalized within ascribed groups.'
    ],
  },
  // Advanced - Application / Numeric (c11_soc_011)
  {
    id: 'ch_20',
    nodeId: NODE_C11_SOC_011,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In a survey methodology pilot across 400 rural households, 120 questionnaires were returned incomplete due to respondent illiteracy. What was the failure/unusable rate percentage?',
    correctAnswer: 30,
    tolerance: 0.1,
    unit: '%',
    explanation: '120 / 400 = 0.30 or 30%. This illustrates a major demerit of self-administered questionnaires in low-literacy settings, where structured interviews are required.',
    hints: [
      'Divide 120 by 400 and multiply by 100.',
      '120 / 400 = 3/10.',
      'The answer is 30%.'
    ],
  },
  // Advanced - Analysis (c11_soc_012)
  {
    id: 'ch_21',
    nodeId: NODE_C11_SOC_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How do the Toda pastoralists, Kota artisans, and Badaga cultivators of the Nilgiris demonstrate MacIver’s dual principle of "Likeness and Difference"?',
    options: [
      'They fight constantly and refuse to trade with each other',
      'They share territorial likeness while complementary occupational differences (dairy, pottery, grain) create economic interdependence',
      'They all perform the exact same job with zero division of labour',
      'They live in isolated virtual internet servers'
    ],
    correctIndex: 1,
    explanation: 'Likeness provides common regional belonging; complementary differences in occupations enable trade, reciprocity, and functional interdependence.',
    hints: [
      'Likeness creates social cohesion; difference creates division of labour.',
      'Todas provide dairy, Kotas provide tools/music, Badagas provide agricultural grains.',
      'Complementary difference produces mutual interdependence.'
    ],
  },
  // Advanced - Analysis (c11_soc_018)
  {
    id: 'ch_22',
    nodeId: NODE_C11_SOC_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does Ferdinand Tönnies’ concept of "Gemeinschaft" map onto traditional village life while "Gesellschaft" maps onto modern commercial corporations?',
    options: [
      'Gemeinschaft is based on natural will, emotional ties, and kinship; Gesellschaft is based on rational calculation, contracts, and formal rules',
      'Gemeinschaft means an artificial computer program; Gesellschaft means a biological family',
      'Gemeinschaft has zero relationships; Gesellschaft is purely feral',
      'There is no conceptual difference between them'
    ],
    correctIndex: 0,
    explanation: 'Gemeinschaft represents organic community bonded by kinship and tradition; Gesellschaft represents associational society driven by contract and goal orientation.',
    hints: [
      'Gemeinschaft = Community ("we-feeling", organic, kinship).',
      'Gesellschaft = Association/Society (contractual, formal, instrumental).',
      'Tönnies distinguished natural emotional solidarity from contractual relations.'
    ],
  }
];

// ─── REAL WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Field Research Protocol: Designing Your District Monograph',
  description: 'Design an empirical sociological research brief for your local district, combining tools, institutions, and culture analysis.',
  steps: [
    'Step 1: Formulate a core research question (e.g. Impact of smartphone usage on joint family interactions in your mohalla/village).',
    'Step 2: Choose your tool combination (Triangulate: 15 Semi-structured Interviews + 1 Local Secondary Census/School record).',
    'Step 3: Identify 3 Non-Material Norms and 3 Material Artefacts involved in the social setting.',
    'Step 4: Map the Ascribed vs Achieved statuses of your respondents and evaluate how socialisation shaped their viewpoints.'
  ]
};

// ─── MAIN COMPONENT ───
function C11_SociologyToolsDataCollectionSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_SOC_011,
  title = DEFAULT_PROPS.title || 'Tools of Data Collection & Basic Concepts',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props) {
  // Subject config
  const subjectConfig = SUBJECT_CONFIG['sociology'] || { name: 'Sociology', emoji: '👥', color: 'indigo' };

  // Phase management
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant-style Interactive Exploration States
  const [selectedToolScenario, setSelectedToolScenario] = useState<number>(0);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [solidarityLevel, setSolidarityLevel] = useState<number>(20); // 0 = Pure Mechanical, 100 = Pure Organic
  const [natureNurtureRatio, setNatureNurtureRatio] = useState<number>(50);
  const [materialTechSpeed, setMaterialTechSpeed] = useState<number>(85);
  const [nonMaterialNormSpeed, setNonMaterialNormSpeed] = useState<number>(25);
  const [activeStatusEntity, setActiveStatusEntity] = useState<'dalit_doctor' | 'khasi_daughter' | 'ias_officer'>('dalit_doctor');

  // Predict-then-Check & Observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Challenge Engine States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints and Answer Reveal States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop & Non-MCQ states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback components state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DIFFICULTY FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT MASTERY INITIALISATION ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTATION ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS DEMOGRAPHIC SOLIDARITY SIMULATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const numNodes = 28;
    const nodes = Array.from({ length: numNodes }, (_, i) => ({
      x: 30 + Math.random() * (canvas.width - 60),
      y: 30 + Math.random() * (canvas.height - 60),
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      role: i % 4, // 0 = Agrarian, 1 = Artisan, 2 = Tech, 3 = Admin
    }));

    const roleColors = ['#22c55e', '#f59e0b', '#3b82f6', '#ec4899'];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background subtle grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw connections based on solidarity level
      const maxDist = solidarityLevel < 50 ? 90 : 140;
      ctx.lineWidth = 0.8;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const sameRole = nodes[i].role === nodes[j].role;
            const alpha = (1 - dist / maxDist) * 0.7;
            if (solidarityLevel < 50 && sameRole) {
              ctx.strokeStyle = `rgba(34, 197, 94, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.stroke();
            } else if (solidarityLevel >= 50 && !sameRole) {
              ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Update and draw nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 15 || n.x > canvas.width - 15) n.vx *= -1;
        if (n.y < 15 || n.y > canvas.height - 15) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, 5.5, 0, Math.PI * 2);
        ctx.fillStyle = roleColors[n.role];
        ctx.shadowColor = roleColors[n.role];
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [solidarityLevel, phase]);

  // ─── CALLBACKS ───
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
      speechManager.speak('Let us study the complete sociological explanation.');
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
    speechManager.speak(isCorrect ? 'Excellent deduction! Human development requires socialisation.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Sociological Laboratory. Interact with each model to uncover how society functions.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Explore the sociological simulations freely without any test pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Demonstrate your sociological mastery!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the simulation controls to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation! Social interdependence binds organic society.' : 'Observe the connections between different roles carefully.');
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
      const items = prev.length === challenge.sortItems?.length ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return items;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You scored ${finalScore} percent and mastered the sociological foundation!`);
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

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = userAnswer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(userAnswer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(userAnswer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const parsed = typeof userAnswer === 'string' ? parseFloat(userAnswer) : (userAnswer as number);
      isCorrect = Math.abs(parsed - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (userAnswer as string).trim() === challenge.targetState?.trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding sociological reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify({ score: 100, date: Date.now() }));
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
        speechManager.speak('Hints exhausted. Let us unpack the concept step by step.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 6000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleToolSelection = useCallback((tool: string) => {
    setSelectedTool(tool);
    audioManager.play('tap');
    if (tool === 'participant_observation') {
      speechManager.speak('Participant observation chosen. Excellent for capturing unwritten lived practices and rituals.');
    } else if (tool === 'questionnaire') {
      speechManager.speak('Structured questionnaire selected. Optimal for large statistical reach across thousands of households.');
    } else if (tool === 'interview') {
      speechManager.speak('In-depth interview selected. Ideal for sensitive, face-to-face probing.');
    } else {
      speechManager.speak('Documentary research chosen. Essential for historical and archival analysis.');
    }
  }, []);

  const handleSolidaritySlider = useCallback((val: number) => {
    setSolidarityLevel(val);
    audioManager.play('count');
  }, []);

  const handleTechSpeedSlider = useCallback((val: number) => {
    setMaterialTechSpeed(val);
    audioManager.play('count');
  }, []);

  const handleNormSpeedSlider = useCallback((val: number) => {
    setNonMaterialNormSpeed(val);
    audioManager.play('count');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── COMPUTED CULTURE LAG GAP ───
  const cultureLagGap = useMemo(() => {
    return Math.max(0, materialTechSpeed - nonMaterialNormSpeed);
  }, [materialTechSpeed, nonMaterialNormSpeed]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800">
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-900/40 rounded-2xl border border-gold-700/50" role="img" aria-label="Sociology icon">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">{title}</h1>
            <p className="text-xs text-gold-400 font-medium">ISC Class 11 Sociology • 10 Core Syllabus Nodes</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
              difficulty === 'advanced' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
              'bg-gold-500/20 text-gold-400 border border-gold-500/30'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-medium border border-slate-700">
            Phase: <span className="text-gold-300 font-bold capitalize">{phase}</span>
          </span>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/40 shadow-inner">
            <span className="px-2.5 py-1 bg-gold-500/20 text-gold-300 text-xs font-semibold rounded-md uppercase tracking-wider">Field Expedition Scenario</span>
            <h2 className="text-xl font-bold text-white mt-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300/90 mt-2 italic bg-gold-900/30 p-2.5 rounded-lg border border-gold-800/30">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-amber-400 text-lg" role="img" aria-label="Bulb">💡</span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">Curiosity Discovery Puzzle</h3>
            </div>
            <p className="text-base text-slate-100 font-semibold mb-4 leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01, x: 3 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm transition-all flex items-start gap-3 ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-2 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect
                      ? 'bg-slate-800/50 text-slate-400 border border-slate-700/50'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-750 border border-slate-700/80'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-slate-700/70 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓' : String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-800/90 border border-slate-700">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-300 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on!' : 'ℹ️ Fascinating finding:'} {DISCOVERY_QUESTION.hintAfter}
                </p>
                <div className="mt-4 flex justify-end">
                  <motion.button
                    aria-label="Enter Interactive Simulation Lab"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-purple-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-500/20 flex items-center gap-2"
                  >
                    Enter Interactive Simulation Lab →
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (BRILLIANT.ORG INTERACTIVE VISUALIZATIONS) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="flex items-center justify-between bg-slate-900 px-4 py-3 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}
            </span>
            <div className="flex gap-1.5" role="progressbar" aria-valuenow={currentSlide + 1} aria-valuemin={1} aria-valuemax={EXPLORATION_STEPS.length}>
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-1.5 rounded-full transition-all ${
                    i === currentSlide ? 'bg-gold-500 w-6' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800"
            >
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span role="img" aria-label="Microscope">🔬</span> {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-xs sm:text-sm text-amber-300/90 mt-1 font-medium bg-amber-950/20 p-2 rounded-lg border border-amber-800/30">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* SLIDE 0: Tool Selection Matrix (c11_soc_011) WITH SVG 1 */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {/* TOPIC SVG 1: Data Collection Methodology Taxonomy Diagram */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-[11px] font-bold text-gold-400 uppercase tracking-wider mb-2 text-center">
                      Sociological Data Collection Triangulation Model
                    </p>
                    <svg viewBox="0 0 600 130" className="w-full h-auto max-h-32" aria-label="Data collection taxonomy diagram">
                      <rect x="10" y="15" width="130" height="95" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="75" y="42" textAnchor="middle" fill="#818cf8" fontSize="11" fontWeight="bold">Observation</text>
                      <text x="75" y="62" textAnchor="middle" fill="#cbd5e1" fontSize="9">Participant / Non-P</text>
                      <text x="75" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Micro lived rituals</text>
                      <text x="75" y="96" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="bold">Qualitative Depth</text>

                      <path d="M 140 62 L 160 62" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />

                      <rect x="160" y="15" width="130" height="95" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="225" y="42" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Questionnaire</text>
                      <text x="225" y="62" textAnchor="middle" fill="#cbd5e1" fontSize="9">Structured schedules</text>
                      <text x="225" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Macro national reach</text>
                      <text x="225" y="96" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold">Quantitative Breadth</text>

                      <path d="M 290 62 L 310 62" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />

                      <rect x="310" y="15" width="130" height="95" rx="10" fill="#2e1065" stroke="#a855f7" strokeWidth="1.5" />
                      <text x="375" y="42" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold">In-depth Interview</text>
                      <text x="375" y="62" textAnchor="middle" fill="#cbd5e1" fontSize="9">Semi-structured / Open</text>
                      <text x="375" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Sensitivities & Nuance</text>
                      <text x="375" y="96" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="bold">Probing Rapport</text>

                      <path d="M 440 62 L 460 62" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />

                      <rect x="460" y="15" width="130" height="95" rx="10" fill="#14532d" stroke="#22c55e" strokeWidth="1.5" />
                      <text x="525" y="42" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">Documentary</text>
                      <text x="525" y="62" textAnchor="middle" fill="#cbd5e1" fontSize="9">Census & Archives</text>
                      <text x="525" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Longitudinal trends</text>
                      <text x="525" y="96" textAnchor="middle" fill="#ec4899" fontSize="8" fontWeight="bold">Historical Secondary</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    {[
                      { title: 'Case A: Khasi Matriliny Rituals', desc: 'Study unwritten inheritance rituals among matrilineal households in Shillong' },
                      { title: 'Case B: National Health (NFHS-5)', desc: 'Capture maternal nutrition metrics from 6,00,000 households' },
                      { title: 'Case C: Pre-colonial Caste Edicts', desc: 'Investigate 18th-century Dharmashastra and land revenue decrees' }
                    ].map((c, i) => (
                      <motion.button
                        key={i}
                        aria-label={c.title}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { setSelectedToolScenario(i); setSelectedTool(null); audioManager.play('tap'); }}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedToolScenario === i ? 'bg-gold-900/50 border-gold-500 text-white' : 'bg-slate-800/70 border-slate-700 text-slate-300'
                        }`}
                      >
                        <p className="font-bold text-gold-300">{c.title}</p>
                        <p className="text-[11px] text-slate-400 mt-1">{c.desc}</p>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-xs text-slate-400 mb-3 font-semibold uppercase">Choose the Optimal Research Tool:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'participant_observation', label: 'Participant Observation', icon: '👁️' },
                        { id: 'questionnaire', label: 'Structured Questionnaire', icon: '📋' },
                        { id: 'interview', label: 'In-Depth Interview', icon: '🎙️' },
                        { id: 'documentary', label: 'Documentary Method', icon: '📜' },
                      ].map((t) => (
                        <motion.button
                          key={t.id}
                          aria-label={`Select tool: ${t.label}`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleToolSelection(t.id)}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            selectedTool === t.id
                              ? 'bg-gold-600 border-gold-400 text-white shadow-md shadow-gold-500/30'
                              : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750'
                          }`}
                        >
                          <span className="text-xl block mb-1" role="img" aria-label={t.label}>{t.icon}</span>
                          <span className="text-xs font-bold block">{t.label}</span>
                        </motion.button>
                      ))}
                    </div>

                    {selectedTool && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3.5 bg-gold-950/40 rounded-xl border border-gold-800/50">
                        <div className="flex items-center justify-between text-xs font-bold text-gold-300 mb-2">
                          <span>Field Diagnostic Result:</span>
                          <span>{selectedTool === (selectedToolScenario === 0 ? 'participant_observation' : selectedToolScenario === 1 ? 'questionnaire' : 'documentary') ? '✓ Optimal Tool Choice' : '✗ Sub-optimal Match'}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {selectedTool === 'participant_observation' && 'Immerses researcher in the community (Iravati Karve style) to watch live gestures and customary rites without literacy barriers.'}
                          {selectedTool === 'questionnaire' && 'Provides standardised, quantifiable metrics across massive populations cheaply and quickly without interviewer bias.'}
                          {selectedTool === 'interview' && 'Enables deep probing, clarification, and capture of non-verbal nuances with illiterate respondents.'}
                          {selectedTool === 'documentary' && 'Allows historical longitudinal comparisons (G.S. Ghurye style) across archival centuries.'}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 1: Durkheimian Solidarity & Settlement WITH SVG 2 */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* TOPIC SVG 2: Durkheim Solidarity Continuum Diagram */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2 text-center">
                      Durkheim’s Social Solidarity & Division of Labour Continuum
                    </p>
                    <svg viewBox="0 0 600 90" className="w-full h-auto max-h-24" aria-label="Solidarity continuum diagram">
                      <line x1="50" y1="45" x2="550" y2="45" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
                      <circle cx="50" cy="45" r="14" fill="#22c55e" />
                      <text x="50" y="50" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">M</text>
                      <text x="50" y="75" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="bold">Mechanical (Rural)</text>
                      <text x="50" y="87" textAnchor="middle" fill="#94a3b8" fontSize="8">Low Division of Labour</text>

                      {/* Moving indicator */}
                      <circle cx={50 + (solidarityLevel / 100) * 500} cy="45" r="10" fill="#6366f1" stroke="#fff" strokeWidth="2" />

                      <circle cx="550" cy="45" r="14" fill="#8b5cf6" />
                      <text x="550" y="50" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">O</text>
                      <text x="550" y="75" textAnchor="middle" fill="#c084fc" fontSize="9" fontWeight="bold">Organic (Urban)</text>
                      <text x="550" y="87" textAnchor="middle" fill="#94a3b8" fontSize="8">High Interdependence</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-300">Division of Labour & Urbanism</span>
                        <span className="text-xs font-bold text-gold-400">{solidarityLevel}% Urban Organic</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Adjust Division of Labour and Urbanism"
                        min={0}
                        max={100}
                        value={solidarityLevel}
                        onChange={(e) => handleSolidaritySlider(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                      />

                      <div className="mt-4 space-y-2 text-xs">
                        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                          <span className="text-slate-400">Solidarity Form:</span>
                          <span className="font-bold text-gold-300">{solidarityLevel < 50 ? 'Mechanical (Likeness)' : 'Organic (Interdependence)'}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                          <span className="text-slate-400">Primary Occupation:</span>
                          <span className="font-bold text-emerald-400">{solidarityLevel < 50 ? 'Agrarian / Cottage Crafts' : 'Services, Industry & Tech'}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                          <span className="text-slate-400">Social Control:</span>
                          <span className="font-bold text-amber-400">{solidarityLevel < 50 ? 'Informal (Kinship, Panchayat, Custom)' : 'Formal (Police, Courts, Contracts)'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                      <p className="text-[11px] text-slate-400 mb-1 font-semibold uppercase">Live Social Network Visualiser</p>
                      <canvas ref={canvasRef} width={260} height={160} className="rounded-lg bg-slate-900 border border-slate-800 w-full" />
                      <p className="text-[10px] text-slate-500 mt-1">
                        {solidarityLevel < 50 ? '🟢 Green lines: Bonds formed by likeness' : '🟣 Purple lines: Bonds formed by functional interdependence'}
                      </p>
                    </div>
                  </div>

                  {/* Observation hook */}
                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                      <p className="text-xs text-white font-semibold mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Observation option ${i + 1}: ${opt}`}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleObservation(i)}
                            className="text-left p-2.5 bg-slate-900 hover:bg-slate-750 rounded-lg text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* SLIDE 2: Socialisation Matrix & Feral Cases */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-2 text-xs font-bold">
                      <span className="text-emerald-400">Nature (Heredity Potential: {100 - natureNurtureRatio}%)</span>
                      <span className="text-gold-400">Nurture (Socialisation Input: {natureNurtureRatio}%)</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Adjust Nature versus Nurture input ratio"
                      min={0}
                      max={100}
                      value={natureNurtureRatio}
                      onChange={(e) => setNatureNurtureRatio(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className={`p-3 rounded-xl border transition-all ${natureNurtureRatio < 25 ? 'bg-rose-950/40 border-rose-500' : 'bg-slate-900 border-slate-800'}`}>
                        <span className="text-xs font-bold text-rose-300 block">Feral Case: Amla & Kamala (1920)</span>
                        <p className="text-[11px] text-slate-400 mt-1">Grew in a wolf den near Midnapore. Without human socialisation, walked on all fours and howled.</p>
                      </div>

                      <div className={`p-3 rounded-xl border transition-all ${natureNurtureRatio >= 25 && natureNurtureRatio <= 75 ? 'bg-gold-950/40 border-gold-500' : 'bg-slate-900 border-slate-800'}`}>
                        <span className="text-xs font-bold text-gold-300 block">Feral Case: Genie (1970)</span>
                        <p className="text-[11px] text-slate-400 mt-1">Isolated in a locked room for 13 years. Despite normal genes, full grammar was never achieved.</p>
                      </div>

                      <div className={`p-3 rounded-xl border transition-all ${natureNurtureRatio > 75 ? 'bg-emerald-950/40 border-emerald-500' : 'bg-slate-900 border-slate-800'}`}>
                        <span className="text-xs font-bold text-emerald-300 block">Social Personhood Actualised</span>
                        <p className="text-[11px] text-slate-400 mt-1">Primary (family) + secondary (schools/peers/media) socialisation transforms biological infant into a social human.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: Ogburn’s Culture Lag Simulator WITH SVG 3 */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* TOPIC SVG 3: Ogburn Culture Lag Divergence Curves */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-[11px] font-bold text-rose-400 uppercase tracking-wider mb-2 text-center">
                      William F. Ogburn (1922): Material vs Non-Material Culture Lag Dynamics
                    </p>
                    <svg viewBox="0 0 600 120" className="w-full h-auto max-h-32" aria-label="Culture Lag graph diagram">
                      <line x1="40" y1="100" x2="560" y2="100" stroke="#475569" strokeWidth="1.5" />
                      <line x1="40" y1="10" x2="40" y2="100" stroke="#475569" strokeWidth="1.5" />
                      <text x="300" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">Time → Historical Technological Acceleration</text>

                      {/* Material Curve */}
                      <path d={`M 40 90 Q 250 80, 550 ${100 - materialTechSpeed * 0.85}`} fill="none" stroke="#38bdf8" strokeWidth="3" />
                      <text x="440" y="25" fill="#38bdf8" fontSize="10" fontWeight="bold">Material Culture (Tech)</text>

                      {/* Non-Material Curve */}
                      <path d={`M 40 90 Q 250 85, 550 ${100 - nonMaterialNormSpeed * 0.85}`} fill="none" stroke="#fbbf24" strokeWidth="3" strokeDasharray="4 2" />
                      <text x="440" y="85" fill="#fbbf24" fontSize="10" fontWeight="bold">Non-Material (Laws/Norms)</text>

                      {/* Culture Lag Gap Fill Indicator */}
                      <line x1="530" y1={100 - materialTechSpeed * 0.85} x2="530" y2={100 - nonMaterialNormSpeed * 0.85} stroke="#ef4444" strokeWidth="4" />
                      <text x="535" y={95 - ((materialTechSpeed + nonMaterialNormSpeed) / 2) * 0.85} fill="#f87171" fontSize="9" fontWeight="bold">
                        Lag Gap ({cultureLagGap}%)
                      </text>
                    </svg>
                  </div>

                  {/* Predict then check */}
                  {!predictionMade && (
                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                      <p className="text-xs text-white font-semibold mb-2">{PREDICTION_QUESTIONS[1].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction option ${i + 1}: ${opt}`}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="text-left p-2.5 bg-slate-900 hover:bg-slate-750 rounded-lg text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-gold-400">Material Culture Speed (Tools / AI / Smartphones): {materialTechSpeed}%</span>
                        </div>
                        <input
                          type="range"
                          aria-label="Material Culture Speed slider"
                          min={0}
                          max={100}
                          value={materialTechSpeed}
                          onChange={(e) => handleTechSpeedSlider(Number(e.target.value))}
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-amber-400">Non-Material Norms Speed (Cyber Laws / Ethics / Customs): {nonMaterialNormSpeed}%</span>
                        </div>
                        <input
                          type="range"
                          aria-label="Non-Material Norms Speed slider"
                          min={0}
                          max={100}
                          value={nonMaterialNormSpeed}
                          onChange={(e) => handleNormSpeedSlider(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-400 block font-bold">Ogburn (1922) Culture Lag Gap:</span>
                        <span className="text-sm font-extrabold text-rose-400">{cultureLagGap}% Disparity</span>
                      </div>
                      <div className="h-3 w-40 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                        <motion.div
                          className="h-full bg-gradient-to-r from-amber-500 to-rose-500"
                          animate={{ width: `${cultureLagGap}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-3 text-[11px] text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      💡 <strong>Indian Example:</strong> Johads (earthen dams) and Sacred Groves (Law Kyntang) represent complete historical harmony between Material (physical structure) and Non-Material (taboo / shramdaan ethic).
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: Status & Group Explorer WITH SVG 4 */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {[
                      { id: 'dalit_doctor' as const, label: 'Case 1: Dalit Doctor' },
                      { id: 'khasi_daughter' as const, label: 'Case 2: Khasi Youngest Daughter' },
                      { id: 'ias_officer' as const, label: 'Case 3: Tribal IAS Officer' },
                    ].map((c) => (
                      <motion.button
                        key={c.id}
                        aria-label={c.label}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { setActiveStatusEntity(c.id); audioManager.play('tap'); }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          activeStatusEntity === c.id ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {c.label}
                      </motion.button>
                    ))}
                  </div>

                  {/* TOPIC SVG 4: Status Set & Role Matrix Quadrant Diagram */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 200" className="w-full" aria-label="Status and group quadrant diagram">
                      {/* Grid dividers */}
                      <line x1="250" y1="10" x2="250" y2="190" stroke="#334155" strokeDasharray="4 4" />
                      <line x1="10" y1="100" x2="490" y2="100" stroke="#334155" strokeDasharray="4 4" />

                      {/* Quadrant Titles */}
                      <text x="125" y="30" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">ASCRIBED STATUS (Birth / Caste)</text>
                      <text x="375" y="30" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">ACHIEVED STATUS (Effort / Skill)</text>
                      <text x="125" y="120" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">PRIMARY / IN-GROUP (Family/Clan)</text>
                      <text x="375" y="120" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">SECONDARY / ASSOCIATION (Govt/Firm)</text>

                      {/* Entity Nodes */}
                      {activeStatusEntity === 'dalit_doctor' && (
                        <>
                          <circle cx="125" cy="60" r="22" fill="#ef4444" opacity="0.8" />
                          <text x="125" y="64" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">Dalit Caste (Birth)</text>

                          <circle cx="375" cy="60" r="22" fill="#22c55e" opacity="0.8" />
                          <text x="375" y="64" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">MD Physician</text>

                          <circle cx="375" cy="155" r="22" fill="#3b82f6" opacity="0.8" />
                          <text x="375" y="159" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">Medical Assoc.</text>
                        </>
                      )}

                      {activeStatusEntity === 'khasi_daughter' && (
                        <>
                          <circle cx="125" cy="60" r="22" fill="#ec4899" opacity="0.8" />
                          <text x="125" y="64" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">Khadduh (Matrilineal)</text>

                          <circle cx="125" cy="155" r="22" fill="#8b5cf6" opacity="0.8" />
                          <text x="125" y="159" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">Khasi Clan Hearth</text>

                          <circle cx="375" cy="60" r="22" fill="#22c55e" opacity="0.8" />
                          <text x="375" y="64" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">College Lecturer</text>
                        </>
                      )}

                      {activeStatusEntity === 'ias_officer' && (
                        <>
                          <circle cx="125" cy="60" r="22" fill="#f59e0b" opacity="0.8" />
                          <text x="125" y="64" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">Santhal Tribe (Ascribed)</text>

                          <circle cx="375" cy="60" r="22" fill="#22c55e" opacity="0.8" />
                          <text x="375" y="64" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">IAS Collector (Merit)</text>

                          <circle cx="375" cy="155" r="22" fill="#3b82f6" opacity="0.8" />
                          <text x="375" y="159" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">State Bureaucracy</text>
                        </>
                      )}
                    </svg>

                    <p className="text-xs text-gold-300 mt-2 text-center">
                      💡 <strong>Status Set Principle:</strong> A single person occupies both Ascribed and Achieved statuses simultaneously (Andre Béteille).
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              aria-label="Previous Lab Slide"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-bold disabled:opacity-40 border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-semibold">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next Lab Slide"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold border border-gold-500 shadow-md shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Enter Free Sandbox Mode"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold border border-emerald-500 shadow-md shadow-emerald-600/30"
              >
                Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE (FREE PLAY BEFORE TESTING) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span role="img" aria-label="Gamepad">🎮</span> Sociological Free Play Sandbox
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Manipulate any sociological lever with zero score tracking. Test variables and observe outcomes!
              </p>
            </div>
            <motion.button
              aria-label="Ready for Board Challenges"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-500/20"
            >
              Ready for Board Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sandbox Lever 1 */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block">Urbanization & Mechanical/Organic Solidarity</span>
              <input
                type="range"
                aria-label="Sandbox Solidarity slider"
                min={0}
                max={100}
                value={solidarityLevel}
                onChange={(e) => setSolidarityLevel(Number(e.target.value))}
                className="w-full accent-gold-500 cursor-pointer"
              />
              <div className="text-xs text-slate-300 space-y-1">
                <p>• Setting: <strong className="text-white">{solidarityLevel}% Urban</strong></p>
                <p>• Solidarity: <strong className="text-gold-300">{solidarityLevel > 50 ? 'Organic (Division of labour)' : 'Mechanical (Shared likeness)'}</strong></p>
                <p>• Primary Family Form: <strong className="text-emerald-300">{solidarityLevel > 50 ? 'Nuclear, dual-earner' : 'Joint / Extended family'}</strong></p>
              </div>
            </div>

            {/* Sandbox Lever 2 */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">Culture Lag Gap Synthesizer</span>
              <div className="flex gap-2">
                <input
                  type="range"
                  aria-label="Sandbox Material Tech Speed slider"
                  min={0}
                  max={100}
                  value={materialTechSpeed}
                  onChange={(e) => setMaterialTechSpeed(Number(e.target.value))}
                  className="w-full accent-gold-500 cursor-pointer"
                />
                <input
                  type="range"
                  aria-label="Sandbox Non-Material Norm Speed slider"
                  min={0}
                  max={100}
                  value={nonMaterialNormSpeed}
                  onChange={(e) => setNonMaterialNormSpeed(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <p>• Tech Speed: <strong className="text-gold-400">{materialTechSpeed}%</strong> | Norm Speed: <strong className="text-amber-400">{nonMaterialNormSpeed}%</strong></p>
                <p>• Current Lag Gap: <strong className="text-rose-400">{cultureLagGap}%</strong></p>
                <p>• Societal Consequence: <strong className="text-slate-200">{cultureLagGap > 40 ? 'Severe Culture Conflict & Moral Friction' : 'Equilibrium / Cultural Harmony'}</strong></p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300">
              Challenge {currentChallenge + 1} of {filteredChallenges.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-gold-950 text-gold-400 border border-gold-800 rounded">
                NEP Competency: {challenge.competencyLevel}
              </span>
              <span className="text-slate-400">Score: {scoreBreakdown.correct} / {scoreBreakdown.total}</span>
            </div>
          </div>

          <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-base text-slate-100 font-semibold mb-4 leading-snug">{challenge.question}</p>

            {/* MCQ TYPE (classify / distinguish / match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01, x: 2 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : { duration: 0.2 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm transition-all flex items-start gap-3 border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-700/60 flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                      {showExplanation && i === challenge.correctIndex ? '✓' : String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL TYPE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white text-xs font-bold rounded-lg cursor-grab shadow-sm"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'target_family', label: 'Joint Family in Punjab' },
                    { id: 'target_sewa', label: 'SEWA Trade Union (Ahmedabad)' },
                    { id: 'target_toda', label: 'Toda Settlement (Nilgiris)' },
                    { id: 'target_station', label: 'Commuters at Railway Station' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      aria-label={`Drop target: ${target.label}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-3.5 rounded-xl border border-dashed transition-all ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950/70 border-slate-700 text-slate-400'
                      }`}
                    >
                      <p className="text-xs font-bold text-white mb-1">{target.label}</p>
                      <p className="text-[11px] text-gold-300">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop correct classification here...'}
                      </p>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Dropped Mappings"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="mt-2 px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to rearrange into correct chronological/structural order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sortable step ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 cursor-grab border border-slate-700 flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-gold-900 text-gold-300 flex items-center justify-center font-bold text-xs shrink-0">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Chronological Order"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="mt-2 px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Verify Order
                </motion.button>
              </div>
            )}

            {/* NUMERIC TYPE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    aria-label="Enter numeric percentage value"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-gold-500 w-48"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit numeric answer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-md"
                  >
                    Check
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT TYPE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part: ${part}`}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setConstructParts(prev => prev.includes(part) ? prev : [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-gold-300 text-xs font-bold rounded-lg border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 min-h-[50px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gold-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5">
                      {part}
                      <button aria-label={`Remove part: ${part}`} onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))} className="text-rose-400 font-bold hover:text-rose-300">✕</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click elements above to assemble formula</span>}
                </div>

                <motion.button
                  aria-label="Verify Constructed Structure"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Verify Structure
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-amber-950/40 border border-amber-800/60 rounded-xl space-y-3"
              >
                <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">Step-by-Step Sociological Explanation:</p>
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs text-amber-200 leading-relaxed"
                  >
                    <strong className="text-amber-400">{idx + 1}.</strong> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="flex justify-between items-center pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show next explanation step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-amber-800/80 hover:bg-amber-750 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Detail →
                    </motion.button>
                  ) : <div />}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      aria-label="Proceed to next challenge or final screen"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Expedition →' : 'Next Question →'}
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
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/70 to-slate-900 rounded-2xl border border-gold-700/50 text-center space-y-3">
            <span className="text-4xl" role="img" aria-label="Graduation cap">🎓</span>
            <h2 className="text-2xl font-extrabold text-white">Sociological Field Expedition Complete!</h2>
            <p className="text-sm text-slate-300">
              Final Mastery Score: <strong className="text-emerald-400 text-base">{Math.max(0, 100 - errors * 5)}%</strong> | Standing: <strong className="text-gold-300 capitalize">{masteryLevel}</strong>
            </p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800/50 text-xs sm:text-sm text-emerald-200 leading-relaxed">
            {errors === 0
              ? '🏆 PERFECT SCORE! You have demonstrated impeccable sociological methodology and conceptual mastery across all 10 ISC syllabus nodes!'
              : errors <= 3
              ? '🌟 EXCELLENT WORK! Your sociological understanding is rigorous. Review the minor nuances below to reach flawless execution.'
              : '🌱 SOLID EFFORT! Sociology requires precise conceptual distinctions (e.g. tools vs methods, folkways vs mores). Review the gaps below and retry.'}
          </div>

          {/* Misconception Tracking */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-xl border border-rose-800/60 space-y-3">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">Your Personalised Misconception Diagnostics:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-xs">
                      <p className="text-rose-300 font-bold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ Sociological Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800/50 text-xs text-slate-300">
            📅 <strong>SRS Schedule:</strong> Based on the SM-2 algorithm, your review for these 10 nodes is scheduled in{' '}
            <strong className="text-gold-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
          </div>

          {/* Capstone Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span role="img" aria-label="Clipboard">📋</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((s, i) => (
                <li key={i} className="p-2 bg-slate-950 rounded-lg border border-slate-800/70">{s}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Floating Interactive Micro-components */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Section Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_SociologyToolsDataCollectionSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C7_HISTCIV_041 = 'c7_histciv_041';
const NODE_C7_HISTCIV_042 = 'c7_histciv_042';
const NODE_C7_HISTCIV_043 = 'c7_histciv_043';
const NODE_C7_HISTCIV_044 = 'c7_histciv_044';
const NODE_C7_HISTCIV_045 = 'c7_histciv_045';
const NODE_C7_HISTCIV_046 = 'c7_histciv_046';
const NODE_C7_HISTCIV_047 = 'c7_histciv_047';
const NODE_C7_HISTCIV_048 = 'c7_histciv_048';
const NODE_C7_HISTCIV_049 = 'c7_histciv_049';
const NODE_C7_HISTCIV_050 = 'c7_histciv_050';

const ALL_NODE_IDS = [
  NODE_C7_HISTCIV_041,
  NODE_C7_HISTCIV_042,
  NODE_C7_HISTCIV_043,
  NODE_C7_HISTCIV_044,
  NODE_C7_HISTCIV_045,
  NODE_C7_HISTCIV_046,
  NODE_C7_HISTCIV_047,
  NODE_C7_HISTCIV_048,
  NODE_C7_HISTCIV_049,
  NODE_C7_HISTCIV_050,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'From Devotional Equality to Constitutional Republic',
  intro: 'You are a curator at the National Museum of Indian Civilization. A new gallery traces how medieval Bhakti-Sufi saints laid the foundations of composite culture, equality, and tolerance—ideals that were later codified into the supreme law of India: the Constitution.',
  context: 'Discover how the poetic voices of Alwars, Nayanars, Kabir, Guru Nanak, and Sufi pirs evolved into the sovereign constitutional ideals championed by Dr. Ambedkar, Nehru, Patel, and Rajendra Prasad.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In 9th-century Tamil Nadu and 15th-century Varanasi, why did saints like Tiruppan Alvar (untouchable) and Kabir (weaver) compose songs in Tamil and Hindavi instead of Sanskrit?',
  options: [
    'Sanskrit was banned by the medieval rulers',
    'To make spiritual devotion directly accessible to common people across caste gates',
    'Because they did not know any classical spiritual concepts',
    'To create secret codes that priests could not understand',
  ],
  correctIndex: 1,
  hintAfter: 'Devotion bypassed Sanskrit gatekeeping so that every commoner, regardless of birth or wealth, could experience equality before God.',
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

// ─── CHALLENGES ARRAY (22 progressive challenges across 10 nodes) ───
const CHALLENGES: Challenge[] = [
  // 1. c7_histciv_041 (Foundation - Recall)
  {
    id: 'ch_41_1',
    nodeId: NODE_C7_HISTCIV_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Identify the correct pairing of the two earliest Tamil Bhakti groups with their worshipped deities and primary hymn collections:',
    options: [
      'Alwars (12 saints, Vishnu, Divya Prabandham) & Nayanars (63 saints, Shiva, Tevaram)',
      'Alwars (63 saints, Shiva, Tevaram) & Nayanars (12 saints, Vishnu, Divya Prabandham)',
      'Alwars (Brahma, Vedas) & Nayanars (Vishnu, Tiruvaymoli)',
      'Alwars (Shiva, Ramayana) & Nayanars (Durga, Divya Prabandham)',
    ],
    correctIndex: 0,
    explanation: 'The 12 Alwars were Vaishnava saints devoted to Lord Vishnu (composing the Divya Prabandham), while the 63 Nayanars were Shaiva saints devoted to Lord Shiva (composing the Tevaram).',
    hints: [
      'Anchor phrase: "Alwars love Vishnu, Nayanars love Shiva."',
      'There were 12 Alwars and 63 Nayanars in Tamil country.',
      'The Divya Prabandham contains 4,000 Vaishnava hymns; the Tevaram contains Shaiva hymns.',
    ],
    misconceptionIndex: 1,
  },
  // 2. c7_histciv_041 (Foundation - Drag-Label)
  {
    id: 'ch_41_2',
    nodeId: NODE_C7_HISTCIV_041,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each Tamil Bhakti saint to their correct devotional tradition and identity:',
    dragItems: [
      { label: 'Andal (Woman Vaishnava Poet)', targetId: 'box_alwar_1' },
      { label: 'Tiruppan Alvar (Panar/Untouchable Saint)', targetId: 'box_alwar_2' },
      { label: 'Appar (Former Jain, Shaiva Poet)', targetId: 'box_nayanar_1' },
      { label: 'Karaikkal Ammaiyar (Shaiva Woman Saint)', targetId: 'box_nayanar_2' },
    ],
    correctMapping: {
      box_alwar_1: 'Andal (Woman Vaishnava Poet)',
      box_alwar_2: 'Tiruppan Alvar (Panar/Untouchable Saint)',
      box_nayanar_1: 'Appar (Former Jain, Shaiva Poet)',
      box_nayanar_2: 'Karaikkal Ammaiyar (Shaiva Woman Saint)',
    },
    explanation: 'Andal and Tiruppan Alvar belong to the 12 Alwars (Vaishnava). Appar and Karaikkal Ammaiyar belong to the 63 Nayanars (Shaiva). This highlights their caste and gender inclusivity.',
    hints: [
      'Andal is the only woman among the 12 Alwars.',
      'Appar converted from Jainism to sing Shiva’s glory.',
      'Tiruppan Alvar came from the marginalised Panar community; Karaikkal Ammaiyar is a revered woman Shaiva saint.',
    ],
    misconceptionIndex: 0,
  },
  // 3. c7_histciv_042 (Foundation - Classify)
  {
    id: 'ch_42_1',
    nodeId: NODE_C7_HISTCIV_042,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How is Kabir (1440-1518) classified in the medieval Bhakti movement, and what was his stance on idol worship?',
    options: [
      'Saguna Bhakti — worshipped idols of Rama with form and rituals',
      'Nirguna Bhakti — worshipped one formless God and rejected idol worship and temple rituals',
      'Orthodox Ulema scholar — insisted on strict Arabic Quranic law',
      'Vedic Priest — defended Brahmin caste supremacy and animal sacrifice',
    ],
    correctIndex: 1,
    explanation: 'Kabir was a Nirguna Bhakti saint who taught that God is formless (Nirguna) and dwells within, directly rejecting stone idols and temple/mosque rituals.',
    hints: [
      'Nirguna means devotion to a formless, attribute-less God without idols.',
      'Saguna saints (like Tulsidas) worship God with form; Kabir rejected idols.',
      'Remember his famous doha: "If worshipping a stone yields God, I would worship a mountain."',
    ],
    misconceptionIndex: 2,
  },
  // 4. c7_histciv_042 (Standard - Analysis)
  {
    id: 'ch_42_2',
    nodeId: NODE_C7_HISTCIV_042,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Analyze Kabir’s unique socio-religious identity and the preservation of his verses across multiple traditions:',
    options: [
      'Born in a Muslim julaha (weaver) family in Varanasi, disciple of Ramananda; verses compiled in Bijak, Adi Granth Sahib, and Kabir Granthavali',
      'Born in an orthodox Brahmin family in Kashi; wrote exclusively in Sanskrit Vedas',
      'Born in Punjab and founded the Khalsa military order in 1699',
      'Royal court poet of Emperor Akbar who wrote the Akbarnama in Persian',
    ],
    correctIndex: 0,
    explanation: 'Kabir was a Muslim weaver’s foster son in Varanasi, mentored by Hindu saint Ramananda. His oral dohas were preserved across Hindu (Bijak), Sikh (Adi Granth), and syncretic (Kabir Granthavali) collections.',
    hints: [
      'Kabir was born in a julaha (weaver) household in Varanasi.',
      'His guru was Ramananda, bridging Hindu and Islamic devotional thought.',
      'His verses appear in three distinct compilations across religions.',
    ],
    misconceptionIndex: 2,
  },
  // 5. c7_histciv_043 (Foundation - Classify)
  {
    id: 'ch_43_1',
    nodeId: NODE_C7_HISTCIV_043,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the three fundamental pillars of Guru Nanak’s teachings with their correct practical meanings:',
    options: [
      'Kirat Karo = Honest labour, Wand Chhako = Sharing/Community kitchen (Langar), Naam Japna = Remembering God’s name',
      'Kirat Karo = Renouncing work, Wand Chhako = Building temples, Naam Japna = Silent pilgrimage',
      'Kirat Karo = Sharing food, Wand Chhako = Meditation, Naam Japna = Military battle',
      'Kirat Karo = Fasting, Wand Chhako = Animal sacrifice, Naam Japna = Learning Sanskrit',
    ],
    correctIndex: 0,
    explanation: 'Guru Nanak established: Kirat Karo (honest living), Wand Chhako (sharing with others via Langar), and Naam Japna (constant inner remembrance of Ek Onkar).',
    hints: [
      'Nanak himself worked as an honest storekeeper at Sultanpur Lodhi (Kirat Karo).',
      'Wand Chhako is concretely practiced in the community kitchen (Langar).',
      'Naam Japna is continuous remembrance of the one divine name.',
    ],
    misconceptionIndex: 3,
  },
  // 6. c7_histciv_043 (Standard - Analysis)
  {
    id: 'ch_43_2',
    nodeId: NODE_C7_HISTCIV_043,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What crucial institutional element distinguished Guru Nanak (1469-1539) from Kabir (1440-1518)?',
    options: [
      'Kabir believed in idol worship while Nanak believed in animal sacrifice',
      'Nanak established enduring community institutions (Langar, Sangat, Kartarpur settlement, Guru lineage via Guru Angad), whereas Kabir left oral dohas without formal institutions',
      'Kabir lived in Punjab while Nanak travelled only within Tamil Nadu',
      'Nanak was a monarch with an army while Kabir was an ascetic recluse',
    ],
    correctIndex: 1,
    explanation: 'Both shared Nirguna devotion and anti-caste philosophy, but Guru Nanak organized the Kartarpur community, established the egalitarian Langar and Sangat, and instituted succession through Guru Angad.',
    hints: [
      'Both rejected caste and empty rituals and taught one formless God.',
      'Kabir did not create an institutional settlement or lineage in his lifetime.',
      'Nanak founded Kartarpur and appointed Bhai Lehna (Guru Angad) to ensure continuous leadership.',
    ],
  },
  // 7. c7_histciv_044 (Foundation - Recall)
  {
    id: 'ch_44_1',
    nodeId: NODE_C7_HISTCIV_044,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is Sufism, and which was the most influential Sufi silsila (order) in medieval India?',
    options: [
      'A political dynasty of the Delhi Sultanate; the Lodi silsila',
      'The mystical stream of Islam emphasizing inner divine love (tariqa) over legalistic ritualism (sharia); the Chishti order',
      'An orthodox clerical group enforcing strict Arabic legal codes',
      'A school of architecture that built military forts and palaces',
    ],
    correctIndex: 1,
    explanation: 'Sufism is the mystical devotional path in Islam. The Chishti order, established in India by Khwaja Muinuddin Chishti at Ajmer, was the most influential and beloved for its poverty, humility, and service to all.',
    hints: [
      'The word Sufi comes from "suf" (coarse wool) worn by ascetics.',
      'Sufis emphasize tariqa (inward path) over pure legalistic sharia.',
      'Chishti saints include Muinuddin Chishti of Ajmer and Nizamuddin Auliya of Delhi.',
    ],
    misconceptionIndex: 4,
  },
  // 8. c7_histciv_044 (Standard - Match)
  {
    id: 'ch_44_2',
    nodeId: NODE_C7_HISTCIV_044,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match each Sufi figure to their historic centre and unique cultural contribution:',
    options: [
      'Khwaja Muinuddin Chishti → Ajmer (Dargah Sharif); Baba Farid → Pakpattan (verses in Guru Granth Sahib); Amir Khusrau → Delhi (Qawwali & Sitar)',
      'Khwaja Muinuddin Chishti → Delhi; Baba Farid → Ajmer; Amir Khusrau → Agra',
      'Nizamuddin Auliya → Lahore; Baba Farid → Varanasi; Amir Khusrau → Madurai',
      'Muinuddin Chishti → Kashmir; Baba Farid → Bengal; Amir Khusrau → Golconda',
    ],
    correctIndex: 0,
    explanation: 'Muinuddin Chishti founded the Chishti order at Ajmer. Baba Farid’s verses at Pakpattan crossed into the Guru Granth Sahib. Amir Khusrau in Delhi synthesized Indo-Persian music (Qawwali, sitar).',
    hints: [
      'Ajmer Sharif is dedicated to Khwaja Muinuddin Chishti.',
      'Baba Farid’s Punjabi verses were cherished by Sikh Gurus.',
      'Amir Khusrau was the poetic disciple of Hazrat Nizamuddin Auliya in Delhi.',
    ],
  },
  // 9. c7_histciv_045 (Standard - Application)
  {
    id: 'ch_45_1',
    nodeId: NODE_C7_HISTCIV_045,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A historian presents the compilation of the Guru Granth Sahib (1604 CE) as proof of India’s medieval "Composite Culture". Why is this scriptural artefact definitive proof?',
    options: [
      'It was written strictly in Sanskrit by court historians of the Mughal dynasty',
      'It preserves side-by-side verses of Hindu Bhakti saints (Kabir, Namdev, Ravidas), the Muslim Sufi saint Baba Farid, and Sikh Gurus in a single canonical scripture',
      'It excluded all vernacular poems and included only Persian imperial decrees',
      'It was an administrative tax register created by the British East India Company',
    ],
    correctIndex: 1,
    explanation: 'The Guru Granth Sahib is a living monument to composite culture: within one holy binding, it sanctifies verses from Hindu, Muslim, and Sikh holy figures across diverse castes and regions.',
    hints: [
      'Composite culture means cross-religious fusion and shared spiritual heritage.',
      'Think about who wrote the hymns included alongside the Sikh Gurus.',
      'Baba Farid (Sufi) and Kabir (weaver-saint) are both venerated inside the scripture.',
    ],
  },
  // 10. c7_histciv_045 (Advanced - Drag-Sort)
  {
    id: 'ch_45_2',
    nodeId: NODE_C7_HISTCIV_045,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the 5 structural pillars of Composite Culture generated by the Bhakti and Sufi movements:',
    sortItems: [
      'Vernacular Literature (Marathi Jnaneshwari, Hindavi Dohas, Awadhi Padmavat)',
      'Weakening of Caste Gates (Khanqah community meals & Tamil lower-caste saints)',
      'Devotional Music Synthesis (Amir Khusrau’s Qawwali & Bhakti Kirtans)',
      'Inter-faith Pilgrimage (Cross-religious visits to Ajmer Sharif Dargah)',
      'Syncretic Scriptures & Sects (Guru Granth Sahib containing Baba Farid & Kabir)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The progression of composite culture moves from shared vernacular language to social inclusion, musical fusion, shared sacred spaces, and finally canonical synthesis.',
    hints: [
      'Language (vernacular) is the primary vehicle that enables mass communication.',
      'Social interaction (anti-caste meals) and cultural art (music) follow.',
      'Shared pilgrimage shrines and canonized multi-faith scriptures represent the deepest synthesis.',
    ],
  },
  // 11. c7_histciv_046 (Foundation - Classify)
  {
    id: 'ch_46_1',
    nodeId: NODE_C7_HISTCIV_046,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the full constitutional definition of a Constitution according to CISCE standards?',
    options: [
      'A temporary booklet of administrative guidelines issued by a Prime Minister',
      'The supreme law of a country that defines government structure, distributes powers among organs (legislature, executive, judiciary), and guarantees fundamental rights to citizens',
      'A collection of court verdicts that only judges are permitted to read',
      'A religious text that dictates personal prayer rituals for citizens',
    ],
    correctIndex: 1,
    explanation: 'A complete definition covers 3 elements: (1) Supreme law of the land, (2) Defines and distributes governmental powers, and (3) Guarantees fundamental rights, preventing arbitrary state tyranny.',
    hints: [
      'It is not merely a government rulebook—it protects citizens from arbitrary power.',
      'It distributes power across the three organs: Legislature, Executive, Judiciary.',
      'Any ordinary law conflicting with the Constitution is void.',
    ],
  },
  // 12. c7_histciv_046 (Standard - Distinguish)
  {
    id: 'ch_46_2',
    nodeId: NODE_C7_HISTCIV_046,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Compare the constitutional structures of India, the United States, and Britain:',
    options: [
      'India: Longest written constitution (originally 395 Articles); USA: Shortest written constitution (1787); Britain: Unwritten constitution (based on conventions & statutes)',
      'India: Unwritten constitution; USA: Longest written; Britain: Shortest written',
      'All three nations possess identical written constitutions adopted in 1950',
      'Britain has the longest written constitution, while India has an unwritten oral tradition',
    ],
    correctIndex: 0,
    explanation: 'India holds the world’s longest codified written constitution (395 articles in 1949). The US Constitution (1787) is the shortest written. Britain operates on an unwritten, uncodified constitutional tradition.',
    hints: [
      'India’s Constitution was carefully written and debated across 165 days.',
      'The US Constitution has just 7 original articles.',
      'Britain has no single codified document; its constitution is spread across Magna Carta, statutes, and conventions.',
    ],
  },
  // 13. c7_histciv_047 (Foundation - Numeric)
  {
    id: 'ch_47_1',
    nodeId: NODE_C7_HISTCIV_047,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How many total members originally composed the Constituent Assembly under the Cabinet Mission Plan before partition in 1947?',
    correctAnswer: 389,
    tolerance: 0,
    unit: 'members',
    explanation: 'The Constituent Assembly was constituted in 1946 with 389 members (representing provinces and princely states). After Partition in August 1947, membership was reduced to 299.',
    hints: [
      'The original number is between 380 and 400.',
      'After partition, 90 members from Pakistan left, leaving 299.',
      'Original count = 389.',
    ],
  },
  // 14. c7_histciv_047 (Standard - Analysis)
  {
    id: 'ch_47_2',
    nodeId: NODE_C7_HISTCIV_047,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How were members of the Constituent Assembly elected in 1946, and who were the interim and permanent Presidents?',
    options: [
      'Directly elected by all Indian citizens; Dr. B.R. Ambedkar was interim President and Jawaharlal Nehru was permanent President',
      'Indirectly elected by provincial legislative assemblies; Dr. Sachchidananda Sinha was interim President (9 Dec 1946), Dr. Rajendra Prasad was permanent President (11 Dec 1946)',
      'Nominated by the British King; Lord Mountbatten was permanent President',
      'Selected by a military lottery; Sardar Patel presided over all sessions',
    ],
    correctIndex: 1,
    explanation: 'Members were indirectly elected by provincial MLAs under the Cabinet Mission Plan. Dr. Sachchidananda Sinha served as temporary/interim President on 9 Dec 1946; Dr. Rajendra Prasad was elected permanent President on 11 Dec 1946.',
    hints: [
      'In 1946, universal adult franchise had not yet been implemented for direct voting.',
      'Voters elected MLAs, and MLAs elected Constituent Assembly delegates.',
      'Distinguish Sinha (interim on Day 1) from Rajendra Prasad (permanent from Day 3 onwards).',
    ],
  },
  // 15. c7_histciv_048 (Foundation - Match)
  {
    id: 'ch_48_1',
    nodeId: NODE_C7_HISTCIV_048,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the four great architects of the Indian Constitution with their primary historic roles:',
    options: [
      'Dr. Ambedkar → Chairman Drafting Committee; Nehru → Moved Objectives Resolution; Patel → Integrated 560+ Princely States; Rajendra Prasad → Assembly President',
      'Dr. Ambedkar → Integrated princely states; Nehru → Assembly President; Patel → Drafted text; Rajendra Prasad → Moved Objectives Resolution',
      'Dr. Ambedkar → Viceroy; Nehru → Army Commander; Patel → Chief Justice; Rajendra Prasad → Foreign Minister',
      'Dr. Ambedkar → Sole author without assembly; Nehru → British delegate; Patel → Governor of Bengal; Rajendra Prasad → Drafting Chairman',
    ],
    correctIndex: 0,
    explanation: 'Ambedkar chaired the Drafting Committee (legal text & rights); Nehru moved the Objectives Resolution (philosophical vision); Patel unified 560+ princely states (territory); Rajendra Prasad presided over 165 days of debate (order).',
    hints: [
      'Dr. Ambedkar is the "Father of the Constitution" as Drafting Chairman.',
      'Sardar Patel, the "Iron Man", unified over 560 princely states into one nation.',
      'Nehru drafted the Objectives Resolution of 13 Dec 1946, which became the Preamble.',
    ],
    misconceptionIndex: 0,
  },
  // 16. c7_histciv_048 (Advanced - Evaluation)
  {
    id: 'ch_48_2',
    nodeId: NODE_C7_HISTCIV_048,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is the claim "Dr. Ambedkar alone single-handedly wrote the Indian Constitution" historically incomplete and inaccurate?',
    options: [
      'Because Dr. Ambedkar did not write any clauses and only translated a British document',
      'Because while Ambedkar was the chief legal draftsman and championed Dalit/minority rights, every clause was debated, amended, and voted upon collectively by the 299-member Assembly across 11 sessions',
      'Because the Constitution was written in London by Sir Stafford Cripps',
      'Because Sardar Patel overruled Ambedkar and wrote all fundamental rights alone',
    ],
    correctIndex: 1,
    explanation: 'Constitution-making was a collective democratic enterprise. Ambedkar led the 7-member Drafting Committee, but all clauses underwent scrutiny, rigorous debate, and voting by the full Assembly.',
    hints: [
      'Ambedkar himself frequently accepted amendments voted by the full Assembly.',
      'Think about the role of committees and 165 days of intense clause-by-clause debates.',
      'Ambedkar was the chief architect and defender, but within a democratic collective body.',
    ],
    misconceptionIndex: 0,
  },
  // 17. c7_histciv_049 (Foundation - Classify)
  {
    id: 'ch_49_1',
    nodeId: NODE_C7_HISTCIV_049,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the constitutional significance of the opening phrase of the Preamble: "WE, THE PEOPLE OF INDIA"?',
    options: [
      'It means the Constitution was gifted to India by the British Parliament',
      'It establishes Popular Sovereignty — that supreme authority originates from the people of India themselves, not a king or foreign power',
      'It means only citizens who pay taxes have constitutional protection',
      'It is purely decorative poetry with zero legal meaning',
    ],
    correctIndex: 1,
    explanation: '"We, the People of India" anchors Popular Sovereignty. Authority flows upward from citizens, who adopt, enact, and give to themselves this supreme law.',
    hints: [
      'Contrast this with a monarchy where authority flows downward from a king.',
      'The Indian people created their government, not an external colonial ruler.',
      'It means the people are the ultimate source of all democratic power.',
    ],
  },
  // 18. c7_histciv_049 (Standard - Construct)
  {
    id: 'ch_49_2',
    nodeId: NODE_C7_HISTCIV_049,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the four cardinal objectives of the Indian Constitution in their exact Preamble order:',
    availableParts: ['JUSTICE', 'EQUALITY', 'FRATERNITY', 'LIBERTY'],
    targetState: 'JUSTICE LIBERTY EQUALITY FRATERNITY',
    validationHint: 'Think of the classic acronym J-L-E-F: Justice (social, economic, political) → Liberty → Equality → Fraternity.',
    explanation: 'The Preamble promises to secure to all citizens: JUSTICE (social, economic, political), LIBERTY (thought, expression, belief, faith, worship), EQUALITY (status and opportunity), and FRATERNITY (dignity & unity).',
    hints: [
      'Starts with fairness for all: JUSTICE.',
      'Next comes freedom of mind and faith: LIBERTY.',
      'Third is equal status: EQUALITY, followed by brotherhood and dignity: FRATERNITY.',
    ],
  },
  // 19. c7_histciv_050 (Foundation - Classify)
  {
    id: 'ch_50_1',
    nodeId: NODE_C7_HISTCIV_050,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which two words were inserted into the description of the Indian State in the Preamble by the 42nd Constitutional Amendment Act of 1976?',
    options: [
      'Democratic and Republic',
      'Socialist and Secular (along with "and Integrity")',
      'Sovereign and Federal',
      'Monarchical and Theocratic',
    ],
    correctIndex: 1,
    explanation: 'The original 1949 Preamble read "Sovereign Democratic Republic". In 1976, the 42nd Amendment added "Socialist", "Secular", and changed "Unity of the Nation" to "Unity and Integrity of the Nation".',
    hints: [
      'The original 1949 Preamble had only three words for the State: Sovereign, Democratic, Republic.',
      'In 1976, two words were added to emphasize economic welfare and religious equality.',
      'The words are Socialist and Secular.',
    ],
    misconceptionIndex: 3,
  },
  // 20. c7_histciv_050 (Standard - Distinguish)
  {
    id: 'ch_50_2',
    nodeId: NODE_C7_HISTCIV_050,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the United Kingdom "Democratic" but NOT a "Republic", whereas India is both?',
    options: [
      'The UK does not hold general elections for Parliament',
      'Democratic means the government is elected by the people; Republic means the Head of State is elected, not a hereditary monarch. The UK has a hereditary King/Queen, while India elects its President.',
      'India has a Prime Minister while the UK is ruled solely by a Supreme Court judge',
      'Republic means a country has a large military, which the UK lacks',
    ],
    correctIndex: 1,
    explanation: 'Democratic refers to how lawmakers and Prime Ministers are elected by citizens. Republic specifically means the Head of State is an elected citizen (like India’s President) rather than a hereditary royal monarch (like the British King).',
    hints: [
      'Look at how the Head of State is selected.',
      'India elects its President via an Electoral College.',
      'In Britain, the King or Queen inherits the throne by royal birth.',
    ],
    misconceptionIndex: 0,
  },
  // 21. c7_histciv_050 (Advanced - Application)
  {
    id: 'ch_50_3',
    nodeId: NODE_C7_HISTCIV_050,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Match each real-world Indian policy or milestone with the constitutional nature of the State it embodies:',
    options: [
      'Pokhran Tests (1974) → Sovereign; SAIL & Welfare Schemes → Socialist; No State Religion (Articles 25-28) → Secular; Universal Adult Franchise (1951) → Democratic; Elected President → Republic',
      'Pokhran Tests → Secular; SAIL → Republic; No State Religion → Sovereign; Adult Franchise → Socialist; Elected President → Democratic',
      'Pokhran Tests → Democratic; SAIL → Sovereign; No State Religion → Republic; Adult Franchise → Secular; Elected President → Socialist',
      'Pokhran Tests → Republic; SAIL → Secular; No State Religion → Democratic; Adult Franchise → Sovereign; Elected President → Socialist',
    ],
    correctIndex: 0,
    explanation: 'Sovereign = external independence (Pokhran 1974). Socialist = public welfare & anti-inequality (SAIL). Secular = equal religious freedom (no state faith). Democratic = universal voting (1951 elections). Republic = elected Head of State (President).',
    hints: [
      'Exercising defence independence without foreign interference shows Sovereignty.',
      'State-run steel plants and welfare subsidies illustrate democratic Socialism.',
      'Equal respect for all faiths with no official state religion defines Indian Secularism.',
    ],
  },
  // 22. c7_histciv_049 / c7_histciv_050 (Advanced - Evaluation)
  {
    id: 'ch_49_3',
    nodeId: NODE_C7_HISTCIV_049,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In Kesavananda Bharati v. State of Kerala (1973), what historic ruling did the Supreme Court deliver regarding the legal status of the Preamble?',
    options: [
      'It ruled that the Preamble is an unconstitutional preface that must be deleted',
      'It reversed the Berubari (1960) stance, ruling that the Preamble IS part of the Constitution and constitutes an unalterable part of its "Basic Structure"',
      'It ruled that Parliament can abolish fundamental rights whenever it chooses',
      'It stated that only state governors have the power to edit the Preamble',
    ],
    correctIndex: 1,
    explanation: 'In 1973, the Supreme Court definitively held that the Preamble is an integral part of the Constitution. Its core values (Justice, Liberty, Equality, Fraternity, Secularism, Democracy) form the "Basic Structure" that Parliament cannot destroy.',
    hints: [
      'Earlier in Berubari (1960), the court thought the Preamble was outside the Constitution.',
      'Kesavananda Bharati (1973) established the famous "Basic Structure Doctrine".',
      'The Preamble is the guiding philosophical compass and cannot be amended away.',
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
  nodeId: NODE_C7_HISTCIV_041,
  title: 'Bhakti-Sufi Foundations & The Indian Constitution',
  definition: 'An integrated study of how medieval devotional egalitarianism (Alwars, Nayanars, Kabir, Guru Nanak, Sufism) built the composite culture that inspired the democratic values, Preamble, and constitutional framework of modern India.',
  eli5: 'Medieval saints broke caste barriers and sang in everyday languages to show all people are equal before God. Five hundred years later, the makers of our Constitution took those same ideas of fairness, brotherhood, and equality and wrote them into the supreme law of India!',
  misconceptions: [
    {
      misconception: 'Dr. B.R. Ambedkar wrote the entire Constitution single-handedly in isolation.',
      correction: 'Ambedkar was the brilliant Chairman of the Drafting Committee, but the Constitution was debated, revised, and enacted collectively by the 299 members of the Constituent Assembly over 165 working days.',
    },
    {
      misconception: 'Alwars worshipped Shiva and Nayanars worshipped Vishnu.',
      correction: 'The 12 Alwars were Vaishnava saints devoted to Lord Vishnu (Divya Prabandham); the 63 Nayanars were Shaiva saints devoted to Lord Shiva (Tevaram).',
    },
    {
      misconception: 'Kabir and Guru Nanak were purely Hindu or purely Muslim orthodox teachers.',
      correction: 'Both taught Nirguna Bhakti (one formless God beyond religious labels), severely critiqued orthodox Brahminical and Ulema ritualism, and drew followers from all faiths.',
    },
    {
      misconception: '"Democratic" and "Republic" mean the exact same thing.',
      correction: '"Democratic" means the lawmakers/government are elected by the people. "Republic" means the Head of State is elected, not a hereditary monarch (e.g., Britain is democratic but a monarchy; India is both).',
    },
    {
      misconception: 'Sufism is identical to orthodox legalistic Islam.',
      correction: 'Sufism is the mystical stream focusing on inner spiritual love (tariqa), music (qawwali), and service to the poor (khanqah), often welcoming non-Muslims.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which deity did the 12 Alwars worship?', options: ['Lord Shiva', 'Lord Vishnu', 'Goddess Durga', 'Lord Brahma'], correctIndex: 1 },
    { question: 'What is the hymn collection of the 63 Nayanars called?', options: ['Divya Prabandham', 'Tevaram', 'Bijak', 'Padmavat'], correctIndex: 1 },
    { question: 'Which saint composed dohas while working as a weaver in Varanasi?', options: ['Kabir', 'Guru Nanak', 'Appar', 'Amir Khusrau'], correctIndex: 0 },
    { question: 'What does the Sikh pillar "Wand Chhako" signify?', options: ['Honest labour', 'Sharing food/earnings (Langar)', 'Singing Sanskrit hymns', 'Ascetic renunciation'], correctIndex: 1 },
    { question: 'Which Chishti Sufi saint settled in Ajmer?', options: ['Hazrat Nizamuddin', 'Khwaja Muinuddin Chishti', 'Baba Farid', 'Amir Khusrau'], correctIndex: 1 },
    { question: 'When did the Constituent Assembly meet for the very first time?', options: ['15 August 1947', '9 December 1946', '26 January 1950', '26 November 1949'], correctIndex: 1 },
    { question: 'Who moved the historic Objectives Resolution on 13 December 1946?', options: ['Dr. B.R. Ambedkar', 'Jawaharlal Nehru', 'Sardar Vallabhbhai Patel', 'Dr. Rajendra Prasad'], correctIndex: 1 },
    { question: 'Which two words were added to the Preamble by the 42nd Amendment in 1976?', options: ['Socialist and Secular', 'Sovereign and Republic', 'Democratic and Federal', 'Justice and Liberty'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student understands the Bhakti-Sufi origins of composite culture and can master the structure, framers, Preamble, and constitutional nature of the Indian State.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Tamil Bhakti Roots: Alwars & Nayanars',
    instruction: 'Click on the temple icons to explore how the 12 Alwars (Vishnu) and 63 Nayanars (Shiva) democratized worship in the vernacular Tamil tongue.',
    interactionType: 'click-temple',
    nodeId: NODE_C7_HISTCIV_041,
  },
  {
    title: '2. The Nirguna Revolution: Kabir & Guru Nanak',
    instruction: 'Toggle between Kabir and Guru Nanak to compare their critique of religious orthodoxies and institutional innovations like Langar & Sangat.',
    interactionType: 'toggle-nirguna',
    nodeId: NODE_C7_HISTCIV_042,
  },
  {
    title: '3. Sufi Mysticism & Indo-Persian Synthesis',
    instruction: 'Adjust the Sufi Khanqah harmony slider to see how music (qawwali), vernacular poetry, and community meals bridged Hindu and Muslim lives.',
    interactionType: 'sufi-harmony',
    nodeId: NODE_C7_HISTCIV_044,
  },
  {
    title: '4. The Constituent Assembly (1946-1949)',
    instruction: 'Drag the slider across the 3-year timeline to watch how 299 delegates synthesized ancient pluralism into 395 supreme constitutional articles.',
    interactionType: 'assembly-timeline',
    nodeId: NODE_C7_HISTCIV_047,
  },
  {
    title: '5. The Constitutional Compass: The Preamble Matrix',
    instruction: 'Click each pillar of the Preamble (Sovereign, Socialist, Secular, Democratic, Republic) to inspect how it shapes modern Indian democracy.',
    interactionType: 'preamble-matrix',
    nodeId: NODE_C7_HISTCIV_050,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you increase the "Vernacular Outreach" in medieval India, what happens to the Brahminical Sanskrit ritual monopoly?',
    options: [
      'The monopoly strengthens because more people learn Sanskrit',
      'The monopoly collapses as common people gain direct access to sacred knowledge in their mother tongue',
      'No change occurs because vernaculars were banned',
      'People stop worshipping all deities completely',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Vernacular Outreach slider to 100% and observe the "Temple Inclusivity Gauge" turn green!',
    nodeId: NODE_C7_HISTCIV_045,
  },
  {
    question: 'Predict: What distinguishes the head of state of India (Republic) from that of the United Kingdom (Monarchy)?',
    options: [
      'India’s President is an elected citizen with a fixed term; the UK monarch inherits the position through royal lineage',
      'The UK monarch is elected every 4 years by citizens',
      'India’s President rules for life with absolute autocratic power',
      'Neither country has a head of state',
    ],
    correctIndex: 0,
    verifyInstruction: 'Click the "Republic vs Monarchy" comparison switch to inspect the democratic electoral college.',
    nodeId: NODE_C7_HISTCIV_050,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the authors included inside the Sikh scripture Guru Granth Sahib?',
    observableOptions: [
      'It exclusively features verses by Punjabi military kings',
      'It contains hymns by Hindu saints (Kabir, Ravidas), the Muslim Sufi Baba Farid, and Sikh Gurus together',
      'It contains only translations of ancient British laws',
      'It has no devotional poetry at all',
    ],
    correctIndex: 1,
    nodeId: NODE_C7_HISTCIV_045,
  },
  {
    question: 'What pattern emerges when you examine the four key leaders of the Constituent Assembly?',
    observableOptions: [
      'One leader made all decisions without any discussion',
      'Each contributed a distinct, vital dimension: Legal drafting (Ambedkar), Vision (Nehru), Territorial unity (Patel), and Orderly debate (Rajendra Prasad)',
      'They all represented foreign colonial powers',
      'They wrote the entire document in less than 24 hours',
    ],
    correctIndex: 1,
    nodeId: NODE_C7_HISTCIV_048,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Constitutional Detective: Living Heritage & Fundamental Values',
  description: 'Connect medieval composite culture and modern constitutional principles to your own neighbourhood or city in India.',
  steps: [
    'Visit or research a local historic shrine, Gurdwara langar, or community kitchen in your town and note its egalitarian practices.',
    'Find a copy of the Preamble in your school textbook and identify the 5 words describing the State (Sovereign, Socialist, Secular, Democratic, Republic).',
    'Write a 3-sentence reflection on how "Fraternity assuring the dignity of the individual" helps promote harmony among classmates of diverse backgrounds.',
    'Share your constitutional reflection with your teacher or study group.',
  ],
};

function C7_HistoryCivicsAlwarsNayanarsVaishnavaSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['histciv'] || { name: 'History & Civics', emoji: '📜', color: 'amber' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant-style states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration Simulation States
  const [selectedBhaktiDeity, setSelectedBhaktiDeity] = useState<'vishnu' | 'shiva'>('vishnu');
  const [selectedSaintDetail, setSelectedSaintDetail] = useState<string | null>('andal');
  const [nirgunaFigure, setNirgunaFigure] = useState<'kabir' | 'nanak'>('kabir');
  const [sufiHarmonyLevel, setSufiHarmonyLevel] = useState<number>(65);
  const [vernacularOutreach, setVernacularOutreach] = useState<number>(50);
  const [assemblyMonthIndex, setAssemblyMonthIndex] = useState<number>(0);
  const [selectedPreamblePillar, setSelectedPreamblePillar] = useState<string>('Sovereign');

  // Interactive Sandbox Controls
  const [sandboxSovereignPower, setSandboxSovereignPower] = useState(80);
  const [sandboxSocialWelfare, setSandboxSocialWelfare] = useState(70);
  const [sandboxSecularRespect, setSandboxSecularRespect] = useState(90);
  const [sandboxHeadType, setSandboxHeadType] = useState<'elected_president' | 'hereditary_king'>('elected_president');

  // Challenge execution & feedback states
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

  // Challenge type specific states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Motion visual feedback
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT Ref & Timers
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gsapTimelineRef = useRef<HTMLDivElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD PERSISTED MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || DEFAULT_PROPS.nodeId!);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPT DIFFICULTY ON SCORE UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff =
      mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── GSAP ANIMATION FOR TIMELINE ───
  useEffect(() => {
    if (gsapTimelineRef.current && phase === 'explore' && currentSlide === 3) {
      gsap.fromTo(
        gsapTimelineRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [phase, currentSlide]);

  // ─── 2D CANVAS ANIMATION (Ashoka Chakra Inspired Spinning Indicator) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 0; i < 24; i++) {
        const rad = (i * Math.PI) / 12;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(rad) * 18, Math.sin(rad) * 18);
        ctx.stroke();
      }
      ctx.restore();

      angle += 0.015;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── MEMOIZED HANDLERS ───
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
        ? 'Spot on! Vernacular devotion democratized sacred knowledge across all castes.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration. Touch and explore history and civics in action!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Try the Constitutional Sandbox freely! Experiment with governance sliders with zero pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for the progressive challenges. Test your mastery and earn points!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now slide the control to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback(
    (idx: number) => {
      setObservationIndex(idx);
      setObservationAnswered(true);
      const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
      audioManager.play(isCorrect ? 'success' : 'pop');
      speechManager.speak(isCorrect ? 'Excellent observation! You spotted the composite synthesis.' : 'Check the details closely.');
    },
    []
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
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
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
    },
    [challenge]
  );

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Magnificent effort! You achieved a score of ${finalScore} percent in Constitutional History.`);
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
        isCorrect = (answer as string).trim() === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Spot on! Correct answer.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
          speechManager.speak('Let us study the complete step-by-step constitutional explanation together.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleSortSubmit = useCallback(() => {
    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(ans);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleConstructToggle = useCallback((part: string) => {
    audioManager.play('tap');
    setConstructParts(prev => (prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]));
  }, []);

  // ─── COMPUTED DATA FOR INTERACTIVE VISUALIZATIONS ───
  const assemblyTimelineData = [
    { date: 'May 1946', title: 'Cabinet Mission Plan', detail: 'Framed proposal for 389 indirectly elected members' },
    { date: '9 Dec 1946', title: 'First Assembly Meeting', detail: '207 members met in Constitution Hall; Dr. S. Sinha as interim President' },
    { date: '11 Dec 1946', title: 'Permanent President', detail: 'Dr. Rajendra Prasad elected permanent President' },
    { date: '13 Dec 1946', title: 'Objectives Resolution', detail: 'Jawaharlal Nehru moved the philosophical foundation for the Preamble' },
    { date: 'Aug 1947', title: 'Partition & Patel Unification', detail: 'Members adjusted to 299; Patel begins integrating 560+ princely states' },
    { date: '29 Aug 1947', title: 'Drafting Committee', detail: 'Dr. B.R. Ambedkar appointed Chairman to draft the legal text' },
    { date: '26 Nov 1949', title: 'Constitution Adopted', detail: 'Passed after 2 yrs, 11 mos, 18 days & 165 working days' },
    { date: '26 Jan 1950', title: 'Republic Day Enforcement', detail: 'Constitution of India came into full force' },
  ];

  const chartDataRecharts = [
    { name: 'Direct Monarchy', equalityScore: 20, peopleVoice: 15 },
    { name: 'Elite Oligarchy', equalityScore: 40, peopleVoice: 35 },
    { name: 'Constitutional Republic', equalityScore: 95, peopleVoice: 98 },
  ];

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-indigo-600 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                ICSE Class 7 History & Civics
              </span>
              <span className="text-xs text-slate-400">10 Core Syllabus Nodes</span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs font-semibold">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map(p => (
            <motion.span
              key={p}
              animate={{
                backgroundColor: phase === p ? '#4f46e5' : 'transparent',
                color: phase === p ? '#ffffff' : '#94a3b8',
              }}
              className="px-3 py-1.5 rounded-xl capitalize transition-all cursor-default"
            >
              {p}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE (Curiosity Hook) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/40 shadow-inner">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wide mb-2">
              <span>🏛️</span> National Museum Curator Scenario
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 bg-indigo-950/80 p-3 rounded-xl border border-indigo-800/50">
              💡 <strong>The Historical Link:</strong> {SCENARIO.context}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
          >
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs">Curiosity Discovery Hook</span>
              <span className="text-xs text-slate-400">Answer before we begin — no marks deducted!</span>
            </div>
            <h3 className="text-base font-semibold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/70 hover:bg-slate-800 border-slate-700/60 text-slate-200'
                  }`}
                >
                  <span className="font-bold text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4 border-t border-slate-800">
                <div className={`p-4 rounded-xl text-sm ${discoveryCorrect ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800' : 'bg-amber-950/60 text-amber-300 border border-amber-800'}`}>
                  {discoveryCorrect ? '✨ Brilliant insight! Exactly right.' : `🔍 Notice this: ${DISCOVERY_QUESTION.hintAfter}`}
                </div>
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-amber-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 flex items-center gap-2"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (Interactive Guided Discovery) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Slide Tabs Header */}
          <div className="flex items-center justify-between bg-slate-900 p-2 rounded-2xl border border-slate-800 overflow-x-auto">
            <div className="flex items-center gap-1.5">
              {EXPLORATION_STEPS.map((step, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    currentSlide === idx ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Step {idx + 1}
                </motion.button>
              ))}
            </div>
            <span className="text-xs font-semibold text-indigo-400 mr-2">
              {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-5"
            >
              <div>
                <h3 className="text-xl font-extrabold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-300 text-sm mt-1 font-medium flex items-center gap-1.5">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── STEP 0: ALWARS & NAYANARS TEMPLE LAB (SVG 1) ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedBhaktiDeity('vishnu');
                        setSelectedSaintDetail('andal');
                        audioManager.play('tap');
                      }}
                      className={`flex-1 p-4 rounded-xl border text-left transition-all ${
                        selectedBhaktiDeity === 'vishnu'
                          ? 'bg-emerald-950/80 border-emerald-500 shadow-lg shadow-emerald-900/20'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-emerald-400 uppercase">Vaishnava Tradition</div>
                      <div className="text-lg font-black text-white">12 Alwars (Lord Vishnu)</div>
                      <p className="text-xs text-slate-300 mt-1">
                        Hymn Corpus: <strong>Divya Prabandham</strong> (4,000 Tamil hymns, 108 Divya Desams)
                      </p>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedBhaktiDeity('shiva');
                        setSelectedSaintDetail('appar');
                        audioManager.play('tap');
                      }}
                      className={`flex-1 p-4 rounded-xl border text-left transition-all ${
                        selectedBhaktiDeity === 'shiva'
                          ? 'bg-amber-950/80 border-amber-500 shadow-lg shadow-amber-900/20'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-amber-400 uppercase">Shaiva Tradition</div>
                      <div className="text-lg font-black text-white">63 Nayanars (Lord Shiva)</div>
                      <p className="text-xs text-slate-300 mt-1">
                        Hymn Corpus: <strong>Tevaram</strong> (Tamil Shaiva hymns, 275 Paadal Petra Sthalams)
                      </p>
                    </motion.button>
                  </div>

                  {/* SVG 1: Interactive Tamil Temple Map */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 600 240" className="w-full h-auto" aria-label="Tamil Bhakti Temple Map">
                      <rect x="10" y="10" width="580" height="220" rx="16" fill="#090d16" stroke="#1e293b" />
                      <circle cx="300" cy="110" r="50" fill={selectedBhaktiDeity === 'vishnu' ? '#064e3b' : '#78350f'} stroke={selectedBhaktiDeity === 'vishnu' ? '#10b981' : '#f59e0b'} strokeWidth="3" />
                      <text x="300" y="115" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">
                        {selectedBhaktiDeity === 'vishnu' ? 'Divya Desam (Vishnu)' : 'Shiva Sanctum'}
                      </text>
                      <text x="300" y="132" textAnchor="middle" fill="#94a3b8" fontSize="10">
                        {selectedBhaktiDeity === 'vishnu' ? 'Tamil: Divya Prabandham' : 'Tamil: Tevaram'}
                      </text>

                      {selectedBhaktiDeity === 'vishnu' ? (
                        <>
                          <g
                            onClick={() => {
                              setSelectedSaintDetail('nammalvar');
                              audioManager.play('tap');
                            }}
                            className="cursor-pointer"
                          >
                            <circle cx="120" cy="70" r="28" fill="#047857" stroke="#34d399" strokeWidth="2" />
                            <text x="120" y="74" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Nammalvar</text>
                            <text x="120" y="110" textAnchor="middle" fill="#6ee7b7" fontSize="8">(Shudra Saint)</text>
                          </g>
                          <g
                            onClick={() => {
                              setSelectedSaintDetail('andal');
                              audioManager.play('tap');
                            }}
                            className="cursor-pointer"
                          >
                            <circle cx="120" cy="160" r="28" fill="#047857" stroke="#34d399" strokeWidth="2" />
                            <text x="120" y="164" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Andal</text>
                            <text x="120" y="200" textAnchor="middle" fill="#6ee7b7" fontSize="8">(Only Woman Alwar)</text>
                          </g>
                          <g
                            onClick={() => {
                              setSelectedSaintDetail('tiruppan');
                              audioManager.play('tap');
                            }}
                            className="cursor-pointer"
                          >
                            <circle cx="480" cy="115" r="28" fill="#047857" stroke="#34d399" strokeWidth="2" />
                            <text x="480" y="119" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Tiruppan Alvar</text>
                            <text x="480" y="155" textAnchor="middle" fill="#6ee7b7" fontSize="8">(Panar / Marginalised)</text>
                          </g>
                        </>
                      ) : (
                        <>
                          <g
                            onClick={() => {
                              setSelectedSaintDetail('appar');
                              audioManager.play('tap');
                            }}
                            className="cursor-pointer"
                          >
                            <circle cx="120" cy="70" r="28" fill="#b45309" stroke="#fbbf24" strokeWidth="2" />
                            <text x="120" y="74" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Appar</text>
                            <text x="120" y="110" textAnchor="middle" fill="#fde68a" fontSize="8">(Jain Convert)</text>
                          </g>
                          <g
                            onClick={() => {
                              setSelectedSaintDetail('sambandar');
                              audioManager.play('tap');
                            }}
                            className="cursor-pointer"
                          >
                            <circle cx="120" cy="160" r="28" fill="#b45309" stroke="#fbbf24" strokeWidth="2" />
                            <text x="120" y="164" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Sambandar</text>
                            <text x="120" y="200" textAnchor="middle" fill="#fde68a" fontSize="8">(Child Prodigy)</text>
                          </g>
                          <g
                            onClick={() => {
                              setSelectedSaintDetail('karaikkal');
                              audioManager.play('tap');
                            }}
                            className="cursor-pointer"
                          >
                            <circle cx="480" cy="115" r="28" fill="#b45309" stroke="#fbbf24" strokeWidth="2" />
                            <text x="480" y="119" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Karaikkal</text>
                            <text x="480" y="155" textAnchor="middle" fill="#fde68a" fontSize="8">(Revered Woman)</text>
                          </g>
                        </>
                      )}
                    </svg>

                    {/* Saint Inspector Panel */}
                    <div className="mt-3 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                      {selectedSaintDetail === 'andal' && (
                        <span>✨ <strong>Andal:</strong> Celebrated for heartfelt love-poetry to Krishna from Srivilliputtur; the sole female voice among the 12 Alwars.</span>
                      )}
                      {selectedSaintDetail === 'nammalvar' && (
                        <span>✨ <strong>Nammalvar:</strong> Born to a Shudra family; authored the prolific Tiruvaymoli ("Tamil Veda") venerated across temples.</span>
                      )}
                      {selectedSaintDetail === 'tiruppan' && (
                        <span>✨ <strong>Tiruppan Alvar:</strong> From the untouchable Panar community; his profound hymns opened temple doors regardless of birth.</span>
                      )}
                      {selectedSaintDetail === 'appar' && (
                        <span>✨ <strong>Appar:</strong> Renounced Jainism to travel village to village singing Shiva’s boundless grace in everyday Tamil.</span>
                      )}
                      {selectedSaintDetail === 'sambandar' && (
                        <span>✨ <strong>Sambandar:</strong> Child prodigy whose melodic Tevaram verses revived popular Shaiva devotional enthusiasm.</span>
                      )}
                      {selectedSaintDetail === 'karaikkal' && (
                        <span>✨ <strong>Karaikkal Ammaiyar:</strong> Ascetic woman saint whose intense Shaiva devotion broke societal gender norms in 6th-century Tamil society.</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STEP 1: NIRGUNA REVOLUTION (KABIR & GURU NANAK) (SVG 2) ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                    <button
                      onClick={() => {
                        setNirgunaFigure('kabir');
                        audioManager.play('tap');
                      }}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                        nirgunaFigure === 'kabir' ? 'bg-amber-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Kabir (1440-1518 CE, Varanasi)
                    </button>
                    <button
                      onClick={() => {
                        setNirgunaFigure('nanak');
                        audioManager.play('tap');
                      }}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                        nirgunaFigure === 'nanak' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Guru Nanak (1469-1539 CE, Talwandi)
                    </button>
                  </div>

                  {/* SVG 2: Nirguna Bhakti & Egalitarian Pillars Diagram */}
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 600 180" className="w-full h-auto" aria-label="Nirguna Devotional Convergence">
                      <rect x="5" y="5" width="590" height="170" rx="14" fill="#0b1120" stroke="#1e293b" />
                      {nirgunaFigure === 'kabir' ? (
                        <>
                          <circle cx="150" cy="90" r="45" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
                          <text x="150" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">Sant Kabir</text>
                          <text x="150" y="102" textAnchor="middle" fill="#fde68a" fontSize="9">Weaver / Julaha</text>
                          <path d="M 195 90 L 320 50" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                          <path d="M 195 90 L 320 90" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                          <path d="M 195 90 L 320 130" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                          <rect x="325" y="35" width="240" height="30" rx="6" fill="#1e293b" stroke="#f59e0b" />
                          <text x="445" y="54" textAnchor="middle" fill="#fde68a" fontSize="10">Rejection of Idol Worship & Caste</text>
                          <rect x="325" y="75" width="240" height="30" rx="6" fill="#1e293b" stroke="#f59e0b" />
                          <text x="445" y="94" textAnchor="middle" fill="#fde68a" fontSize="10">Formless Divine: Nirguna / Ek Niranjan</text>
                          <rect x="325" y="115" width="240" height="30" rx="6" fill="#1e293b" stroke="#f59e0b" />
                          <text x="445" y="134" textAnchor="middle" fill="#fde68a" fontSize="10">Tri-Scriptural Preservation (Bijak/Granth)</text>
                        </>
                      ) : (
                        <>
                          <circle cx="150" cy="90" r="45" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                          <text x="150" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">Guru Nanak</text>
                          <text x="150" y="102" textAnchor="middle" fill="#c7d2fe" fontSize="9">Ek Onkar</text>
                          <path d="M 195 90 L 320 50" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 4" />
                          <path d="M 195 90 L 320 90" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 4" />
                          <path d="M 195 90 L 320 130" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 4" />
                          <rect x="325" y="35" width="240" height="30" rx="6" fill="#1e293b" stroke="#818cf8" />
                          <text x="445" y="54" textAnchor="middle" fill="#c7d2fe" fontSize="10">Kirat Karo — Honest Labour at Store</text>
                          <rect x="325" y="75" width="240" height="30" rx="6" fill="#1e293b" stroke="#818cf8" />
                          <text x="445" y="94" textAnchor="middle" fill="#c7d2fe" fontSize="10">Wand Chhako — Free Community Langar</text>
                          <rect x="325" y="115" width="240" height="30" rx="6" fill="#1e293b" stroke="#818cf8" />
                          <text x="445" y="134" textAnchor="middle" fill="#c7d2fe" fontSize="10">Naam Japna — Remembrance of One Creator</text>
                        </>
                      )}
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {nirgunaFigure === 'kabir' ? (
                      <>
                        <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30 space-y-2">
                          <div className="text-xs font-bold text-amber-400 uppercase">Dual Critique of Orthodoxy</div>
                          <p className="text-xs text-slate-300">
                            <strong>To Temple Ritualists:</strong> "If worshipping a stone yields God, I would worship a mountain."
                          </p>
                          <p className="text-xs text-slate-300">
                            <strong>To Mosque Formalism:</strong> God does not reside solely in stone walls or mechanical rote prayer.
                          </p>
                          <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">
                            <strong>Triple Compilation:</strong> Preserved in <em>Bijak</em> (Kabir Panth), <em>Adi Granth</em> (Sikhs), and <em>Kabir Granthavali</em> (Dadu Panth).
                          </div>
                        </div>
                        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                          <div className="text-xs font-bold text-slate-400 uppercase">Nirguna Doctrine Matrix</div>
                          <ul className="text-xs space-y-1.5 text-slate-300">
                            <li>• Formless, attribute-less God (Ek Niranjan).</li>
                            <li>• No idol worship, no caste hierarchy.</li>
                            <li>• Spoken in marketplace Hindavi/Awadhi dohas.</li>
                            <li>• Mentored by Ramananda at Panchganga Ghat.</li>
                          </ul>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-4 bg-slate-950 rounded-xl border border-indigo-500/30 space-y-2">
                          <div className="text-xs font-bold text-indigo-400 uppercase">3 Pillars of Sikhism</div>
                          <ul className="text-xs space-y-2 text-slate-300">
                            <li>
                              <strong className="text-indigo-300">Kirat Karo:</strong> Earn your living through honest, hardworking labour (Nanak worked at Sultanpur Lodhi storehouse).
                            </li>
                            <li>
                              <strong className="text-indigo-300">Wand Chhako:</strong> Share meals and wealth (instituted via the egalitarian Langar).
                            </li>
                            <li>
                              <strong className="text-indigo-300">Naam Japna:</strong> Constant remembrance of Ek Onkar (one supreme reality).
                            </li>
                          </ul>
                        </div>
                        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                          <div className="text-xs font-bold text-slate-400 uppercase">Institutional Durability</div>
                          <p className="text-xs text-slate-300">
                            Founded the settlement of <strong>Kartarpur</strong> (1522), established <strong>Sangat</strong> (congregational worship), and appointed <strong>Guru Angad</strong> (Bhai Lehna) to sustain the Guru lineage.
                          </p>
                          <div className="text-xs text-slate-400 pt-1">
                            Four <em>Udasis</em> (journeys) across Mecca, Baghdad, Tibet, and South India.
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* ─── STEP 2: SUFI HARMONY & PREDICT-THEN-CHECK ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {!predictionMade ? (
                    <div className="p-4 bg-amber-950/40 rounded-xl border border-amber-500/40 space-y-2">
                      <div className="text-xs font-bold text-amber-300 uppercase">Predict Before Interacting</div>
                      <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs text-left text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-500/40 text-xs text-indigo-300">
                      ✓ {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </div>
                  )}

                  {/* Interactive Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Vernacular Outreach (Jayasi, Farid, Khusrau)</span>
                        <span className="font-bold text-indigo-400">{vernacularOutreach}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={vernacularOutreach}
                        aria-label="Set Vernacular Outreach"
                        onChange={e => {
                          setVernacularOutreach(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Khanqah Interfaith Free Kitchen (Langar)</span>
                        <span className="font-bold text-amber-400">{sufiHarmonyLevel}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={sufiHarmonyLevel}
                        aria-label="Set Khanqah Free Kitchen Harmony"
                        onChange={e => {
                          setSufiHarmonyLevel(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Real-time Dynamic Gauge of Composite Culture */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase">Composite Culture Index</div>
                      <div className="text-lg font-black text-white">
                        {Math.round((vernacularOutreach + sufiHarmonyLevel) / 2)} / 100 Harmony Score
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {vernacularOutreach > 70
                          ? '✨ Sanskrit & Persian exclusive gates dissolved into popular Punjabi, Awadhi, Marathi & Hindavi!'
                          : 'Increasing vernacular outreach empowers common villagers.'}
                      </p>
                    </div>
                    <div className="w-24 h-4 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-amber-500 to-emerald-500"
                        animate={{ width: `${(vernacularOutreach + sufiHarmonyLevel) / 2}%` }}
                      />
                    </div>
                  </div>

                  {/* Observation hook */}
                  {vernacularOutreach > 60 && !observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-700/60 space-y-2">
                      <div className="text-xs font-bold text-indigo-300">Observation Check: What do you notice?</div>
                      <p className="text-xs text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleObservation(i)}
                            className="w-full text-left p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── STEP 3: CONSTITUENT ASSEMBLY TIMELINE (1946-1950) ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Assembly Milestone Slider</span>
                    <span className="font-bold text-amber-400">{assemblyTimelineData[assemblyMonthIndex].date}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={assemblyTimelineData.length - 1}
                    value={assemblyMonthIndex}
                    aria-label="Constituent Assembly Timeline Slider"
                    onChange={e => {
                      setAssemblyMonthIndex(Number(e.target.value));
                      audioManager.play('tap');
                    }}
                    className="w-full accent-amber-500 cursor-pointer"
                  />

                  {/* Milestone Highlight Card */}
                  <motion.div
                    key={assemblyMonthIndex}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-gradient-to-r from-slate-950 to-indigo-950/60 rounded-xl border border-indigo-500/40 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">
                        {assemblyTimelineData[assemblyMonthIndex].date}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1">{assemblyTimelineData[assemblyMonthIndex].title}</h4>
                      <p className="text-xs text-slate-300 mt-0.5">{assemblyTimelineData[assemblyMonthIndex].detail}</p>
                    </div>
                    <canvas ref={canvasRef} width={60} height={60} className="w-12 h-12" />
                  </motion.div>

                  {/* 4 Great Thinkers Grid */}
                  <div ref={gsapTimelineRef} className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
                      <div className="text-lg">⚖️</div>
                      <div className="text-xs font-bold text-white">Dr. Ambedkar</div>
                      <div className="text-[10px] text-slate-400">Drafting Chairman & Fundamental Rights</div>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
                      <div className="text-lg">📜</div>
                      <div className="text-xs font-bold text-white">Pt. Nehru</div>
                      <div className="text-[10px] text-slate-400">Objectives Resolution & Preamble Vision</div>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
                      <div className="text-lg">🗺️</div>
                      <div className="text-xs font-bold text-white">Sardar Patel</div>
                      <div className="text-[10px] text-slate-400">Unified 560+ Princely States</div>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
                      <div className="text-lg">🏛️</div>
                      <div className="text-xs font-bold text-white">Dr. Rajendra Prasad</div>
                      <div className="text-[10px] text-slate-400">Assembly President (165 days debate)</div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STEP 4: PREAMBLE MATRIX LAB (SVG 3) ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                    {(['Sovereign', 'Socialist', 'Secular', 'Democratic', 'Republic'] as const).map(term => (
                      <button
                        key={term}
                        onClick={() => {
                          setSelectedPreamblePillar(term);
                          audioManager.play('tap');
                        }}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                          selectedPreamblePillar === term ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>

                  {/* SVG 3: The 5 Pillars of Constitutional Sovereign State */}
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 600 130" className="w-full h-auto" aria-label="5 Pillars of the Indian Constitution">
                      <rect x="5" y="5" width="590" height="120" rx="12" fill="#080c14" stroke="#1e293b" />
                      {['Sovereign', 'Socialist', 'Secular', 'Democratic', 'Republic'].map((pillar, idx) => {
                        const isSel = selectedPreamblePillar === pillar;
                        const xPos = 20 + idx * 115;
                        return (
                          <g
                            key={pillar}
                            onClick={() => {
                              setSelectedPreamblePillar(pillar);
                              audioManager.play('tap');
                            }}
                            className="cursor-pointer"
                          >
                            <rect
                              x={xPos}
                              y="20"
                              width="105"
                              height="85"
                              rx="8"
                              fill={isSel ? '#d97706' : '#1e293b'}
                              stroke={isSel ? '#fbbf24' : '#334155'}
                              strokeWidth={isSel ? 2 : 1}
                            />
                            <text x={xPos + 52} y="50" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
                              {pillar}
                            </text>
                            <text x={xPos + 52} y="72" textAnchor="middle" fill={isSel ? '#fef3c7' : '#94a3b8'} fontSize="8">
                              {idx === 0
                                ? 'Independent'
                                : idx === 1
                                ? 'Equity / SAIL'
                                : idx === 2
                                ? 'Equal Respect'
                                : idx === 3
                                ? 'Voting (18+)'
                                : 'Elected Head'}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  <motion.div
                    key={selectedPreamblePillar}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs"
                  >
                    {selectedPreamblePillar === 'Sovereign' && (
                      <div>
                        <span className="text-amber-400 font-bold uppercase">Sovereign State:</span>
                        <p className="text-slate-300 mt-1">
                          India is completely free from foreign control; makes all internal and external decisions independently (e.g., Pokhran nuclear tests in 1974).
                        </p>
                      </div>
                    )}
                    {selectedPreamblePillar === 'Socialist' && (
                      <div>
                        <span className="text-amber-400 font-bold uppercase">Socialist State (Added 42nd Amendment 1976):</span>
                        <p className="text-slate-300 mt-1">
                          Commitment to end economic disparity and distribute wealth equitably through public welfare, public sectors (SAIL), and healthcare.
                        </p>
                      </div>
                    )}
                    {selectedPreamblePillar === 'Secular' && (
                      <div>
                        <span className="text-amber-400 font-bold uppercase">Secular State (Added 42nd Amendment 1976):</span>
                        <p className="text-slate-300 mt-1">
                          The State possesses NO official religion; guarantees equal respect, freedom of conscience, and protection to all faiths (Articles 25-28).
                        </p>
                      </div>
                    )}
                    {selectedPreamblePillar === 'Democratic' && (
                      <div>
                        <span className="text-amber-400 font-bold uppercase">Democratic Government:</span>
                        <p className="text-slate-300 mt-1">
                          Government is elected periodically by adult citizens via Universal Adult Franchise (18+), as proven in every election since 1951-52.
                        </p>
                      </div>
                    )}
                    {selectedPreamblePillar === 'Republic' && (
                      <div>
                        <span className="text-amber-400 font-bold uppercase">Republican Form:</span>
                        <p className="text-slate-300 mt-1">
                          The Head of State is an ELECTED President, NOT a hereditary king or queen. (Contrasted with the UK, which is democratic but a hereditary monarchy).
                        </p>
                      </div>
                    )}
                  </motion.div>

                  {/* Comparative Recharts Visualization */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-[11px] font-bold text-slate-400 mb-2 uppercase">Comparative Governance Model</div>
                    <div className="h-36 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartDataRecharts} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                          <YAxis stroke="#64748b" fontSize={10} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                          <Bar dataKey="equalityScore" fill="#f59e0b" name="Equality Index" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="peopleVoice" fill="#6366f1" name="Citizen Voice" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
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
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-500">Explore each step freely</span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE (Free Play Governance Lab) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-500/40">
            <h3 className="text-xl font-bold text-white">Constitutional Sandbox & Governance Simulator</h3>
            <p className="text-xs text-slate-300 mt-1">
              Test governance variables with zero grading pressure! Balance sovereignty, public welfare, secular neutrality, and democratic institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Sovereign External Independence</span>
                  <span className="font-bold text-indigo-400">{sandboxSovereignPower}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={sandboxSovereignPower}
                  aria-label="Sovereign Power Slider"
                  onChange={e => setSandboxSovereignPower(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Socialist Public Welfare & Education Support</span>
                  <span className="font-bold text-emerald-400">{sandboxSocialWelfare}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={sandboxSocialWelfare}
                  aria-label="Social Welfare Slider"
                  onChange={e => setSandboxSocialWelfare(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Secular Equal Respect (No Official State Religion)</span>
                  <span className="font-bold text-amber-400">{sandboxSecularRespect}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={sandboxSecularRespect}
                  aria-label="Secular Respect Slider"
                  onChange={e => setSandboxSecularRespect(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="text-xs text-slate-300 mb-2">Head of State Structure:</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSandboxHeadType('elected_president');
                      audioManager.play('tap');
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      sandboxHeadType === 'elected_president'
                        ? 'bg-indigo-600 border-indigo-400 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    🇮🇳 Republic (Elected President)
                  </button>
                  <button
                    onClick={() => {
                      setSandboxHeadType('hereditary_king');
                      audioManager.play('tap');
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      sandboxHeadType === 'hereditary_king'
                        ? 'bg-amber-600 border-amber-400 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    👑 Monarchy (Hereditary Crown)
                  </button>
                </div>
              </div>
            </div>

            {/* Simulated Live Republic Health Monitor */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase">Simulated Constitutional Stability</div>
                <div className="text-2xl font-black text-white mt-1">
                  {Math.round(
                    sandboxSovereignPower * 0.25 +
                      sandboxSocialWelfare * 0.25 +
                      sandboxSecularRespect * 0.3 +
                      (sandboxHeadType === 'elected_president' ? 20 : 5)
                  )}
                  /100
                </div>
                <div className="mt-3 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>
                      Popular Sovereignty:{' '}
                      {sandboxHeadType === 'elected_president' ? 'Elected Citizen Leader (Republic)' : 'Hereditary Monarch'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Religious Peace Index: {sandboxSecularRespect > 70 ? 'High Harmony' : 'Moderate'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span>Poverty Gap Reduction: {sandboxSocialWelfare > 60 ? 'Active Welfare' : 'Minimal'}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToChallenge}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-900/30 text-xs mt-4"
              >
                I Am Ready For Graded Challenges! →
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE (Adaptive Progressive Practice) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Top Bar with Adaptive Badge & Progress */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <div className="text-xs text-slate-400">
                Challenge <strong>{currentChallenge + 1}</strong> of {filteredChallenges.length}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  NEP 2020: {challenge.competencyLevel.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400">Node: {challenge.nodeId}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-3 py-1 rounded-xl text-xs font-extrabold uppercase border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                    : 'bg-amber-950/60 border-amber-500 text-amber-300'
                }`}
              >
                {difficulty} Tier
              </motion.span>
              <div className="w-24 sm:w-36 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-500"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Box */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <h3 className="text-base sm:text-lg font-bold text-white mb-4">{challenge.question}</h3>

            {/* ─── A. MCQ (Classify / Distinguish / Match) ─── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* ─── B. DRAG-LABEL CHALLENGE ─── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      ✥ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'box_alwar_1', title: 'Alwar Tradition (Vishnu) Target 1' },
                    { id: 'box_alwar_2', title: 'Alwar Tradition (Vishnu) Target 2' },
                    { id: 'box_nayanar_1', title: 'Nayanar Tradition (Shiva) Target 1' },
                    { id: 'box_nayanar_2', title: 'Nayanar Tradition (Shiva) Target 2' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-3 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 hover:border-indigo-500 text-center text-xs min-h-[60px] flex flex-col justify-center items-center"
                    >
                      <div className="text-[10px] text-slate-500 uppercase">{target.title}</div>
                      <div className="font-bold text-indigo-300 mt-1">
                        {droppedLabels[target.id] || 'Drop matching saint label here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs"
                >
                  Verify All Targets
                </motion.button>
              </div>
            )}

            {/* ─── C. DRAG-SORT CHALLENGE ─── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag or use arrows to order from first to final pillar:</p>
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
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-200 cursor-grab"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-[10px]">
                          {displayIndex + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                      <span className="text-slate-500 text-sm">☰</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  className="px-5 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* ─── D. NUMERIC CHALLENGE ─── */}
            {challenge.type === 'numeric' && (
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="number"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter exact count..."
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-indigo-500 outline-none"
                />
                <span className="text-xs text-slate-400">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(numericInput)}
                  className="px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-xs"
                >
                  Submit
                </motion.button>
              </div>
            )}

            {/* ─── E. CONSTRUCT CHALLENGE (Preamble Word Assembly) ─── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConstructToggle(part)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                        constructParts.includes(part)
                          ? 'bg-amber-600 border-amber-400 text-white'
                          : 'bg-slate-950 border-slate-700 text-slate-300'
                      }`}
                    >
                      {constructParts.includes(part) ? `✓ ${part}` : `+ ${part}`}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-indigo-300 min-h-[44px] flex items-center">
                  Assembled: <strong className="ml-2 text-white">{constructParts.join(' ') || '(Select words in order)'}</strong>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    className="px-5 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs"
                  >
                    Check Assembly
                  </motion.button>
                  <button
                    onClick={() => setConstructParts([])}
                    className="px-3 py-2 bg-slate-800 text-slate-400 rounded-xl text-xs"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* ─── STEP-BY-STEP PROGRESSIVE EXPLANATION CARD ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-amber-950/40 border border-amber-600/50 rounded-xl space-y-3"
              >
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wide">
                  <span>📖</span> Progressive Step-by-Step Breakdown
                </div>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-amber-100 text-xs sm:text-sm leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 mr-1.5">{i + 1}.</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex flex-wrap gap-2 pt-2">
                  {revealedSteps <
                    challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-3 py-1.5 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-lg text-xs"
                    >
                      Reveal Next Step →
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-indigo-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-900/30 ml-auto"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'View Final Results 🎉' : 'Next Challenge →'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE (Personalized Mastery & Reflection) ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 rounded-3xl border border-indigo-700/50 text-center space-y-3">
            <div className="text-4xl">🏛️ 🎉</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Constitutional Sim Complete!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have successfully journeyed from the Tamil Alwar-Nayanar temples to the Constituent Assembly of 1949!
            </p>
            <div className="inline-flex gap-4 p-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400">Final Score:</span>{' '}
                <strong className="text-emerald-400 text-sm font-black">{Math.max(0, 100 - errors * 4)}%</strong>
              </div>
              <div className="border-l border-slate-800 pl-4">
                <span className="text-slate-400">Mastery Level:</span>{' '}
                <strong className="text-indigo-400 text-sm font-black uppercase">{masteryLevel}</strong>
              </div>
            </div>
          </div>

          {/* Motivational Feedback Banner */}
          <div className={`p-4 rounded-2xl border text-sm font-bold ${
            errors === 0
              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
              : errors <= 3
              ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200'
              : errors <= 7
              ? 'bg-amber-950/60 border-amber-500 text-amber-200'
              : 'bg-rose-950/60 border-rose-500 text-rose-200'
          }`}>
            {errors === 0
              ? 'PERFECT SCORE! Outstanding Masterwork! You conquered all 10 CISCE nodes with flawless accuracy!'
              : errors <= 3
              ? 'Great work! You demonstrated a rock-solid grasp of Bhakti-Sufi roots and constitutional law.'
              : errors <= 7
              ? 'Good effort! You have built a solid foundation. Review tricky concepts to reach mastery.'
              : 'Do not give up — You WILL get this! Practice makes perfect.'}
          </div>

          {/* Misconception Gaps Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/50 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wide">
                Targeted Misconception Remediation Profile:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950/80 rounded-xl border border-rose-900/40 text-xs">
                      <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ ICSE Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition SRS Notification */}
          <div className="p-4 bg-amber-950/40 rounded-2xl border border-amber-800/50 text-xs text-amber-200 flex items-center justify-between">
            <div>
              <strong>Spaced Repetition Schedule (SM-2):</strong> Next memory review scheduled in{' '}
              <span className="underline font-bold">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>.
            </div>
            <span className="text-lg">📅</span>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">{i + 1}.</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C7_HistoryCivicsAlwarsNayanarsVaishnavaSim;
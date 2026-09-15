'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import gsap from 'gsap';

// ─── NODE IDS (String Literals for CISCE Verification) ───
const NODE_C8_HISTCIV_041 = 'c8_histciv_041';
const NODE_C8_HISTCIV_042 = 'c8_histciv_042';
const NODE_C8_HISTCIV_043 = 'c8_histciv_043';
const NODE_C8_HISTCIV_044 = 'c8_histciv_044';
const NODE_C8_HISTCIV_045 = 'c8_histciv_045';
const NODE_C8_HISTCIV_046 = 'c8_histciv_046';
const NODE_C8_HISTCIV_047 = 'c8_histciv_047';
const NODE_C8_HISTCIV_048 = 'c8_histciv_048';
const NODE_C8_HISTCIV_049 = 'c8_histciv_049';
const NODE_C8_HISTCIV_050 = 'c8_histciv_050';

const ALL_NODE_IDS = [
  NODE_C8_HISTCIV_041,
  NODE_C8_HISTCIV_042,
  NODE_C8_HISTCIV_043,
  NODE_C8_HISTCIV_044,
  NODE_C8_HISTCIV_045,
  NODE_C8_HISTCIV_046,
  NODE_C8_HISTCIV_047,
  NODE_C8_HISTCIV_048,
  NODE_C8_HISTCIV_049,
  NODE_C8_HISTCIV_050,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Awakening of a Nation: Reformers, Demands & The Road to Swaraj (1850–1916)',
  intro: 'You are an investigative historian tracing the great renaissance of modern India. From social reformers challenging caste and ignorance, to the founding of the Indian National Congress, the Partition of Bengal, and the roaring demand for Home Rule — your mission is to uncover how India built its collective soul and political might.',
  context: 'Explore ideological crossroads, analyze pivotal milestones, and test your understanding of key reformers, nationalist phases, and historic confrontations.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In September 1893, an unknown young Indian sannyasi stepped up at the World Parliament of Religions in Chicago. His very first five words sparked a 2-minute standing ovation from 7,000 scholars. What did he say?',
  options: [
    '"Greetings to the great United States of America"',
    '"Sisters and brothers of America"',
    '"I bring you ancient Sanskrit truths from India"',
    '"Let all world religions bow to one God"',
  ],
  correctIndex: 1,
  hintAfter: 'Swami Vivekananda broke all formal ecclesiastical conventions by greeting the world as an interconnected family of sisters and brothers.',
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

// ─── CHALLENGES ARRAY (21 Challenges covering nodes 041 to 050) ───
const CHALLENGES: Challenge[] = [
  // 041: Vivekananda (Foundation - Recall)
  {
    id: 'ch_041_1',
    nodeId: NODE_C8_HISTCIV_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On 1 May 1897, Swami Vivekananda established which organisation at Belur Math to practice practical Vedanta?',
    options: [
      'The Brahmo Samaj',
      'The Ramakrishna Mission',
      'The Arya Samaj',
      'The Theosophical Society',
    ],
    correctIndex: 1,
    explanation: 'Swami Vivekananda founded the Ramakrishna Mission on 1 May 1897 at Belur Math. It was not a new religious sect but a service organisation grounded in Vedanta.',
    hints: [
      'Think of the spiritual teacher he met in 1881 at Dakshineswar.',
      'The organisation was named after his guru, Sri Ramakrishna Paramahamsa.',
      'It is the Ramakrishna Mission, headquartered at Belur Math.',
    ],
    misconceptionIndex: 0,
  },
  // 041: Vivekananda Concept (Standard - Application)
  {
    id: 'ch_041_2',
    nodeId: NODE_C8_HISTCIV_041,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'During the 1897 Murshidabad famine, Ramakrishna Mission monks opened free kitchens and healthcare centers. Which philosophical concept coined by Vivekananda directly inspired this social action?',
    options: [
      'Shuddhi (Purification)',
      'Daridra Narayana (Serving God in the form of the poor)',
      'Taqlid (Blind adherence to medieval customs)',
      'Satyashodhak (Seeking ultimate truth alone)',
    ],
    correctIndex: 1,
    explanation: 'Vivekananda taught "Daridra Narayana" — that God resides in the poor and suffering, making humanitarian service the highest form of worship.',
    hints: [
      'The term blends the concept of the impoverished with the divine Narayana.',
      'It transformed spirituality from meditating in remote caves to serving in famine-hit villages.',
      'The concept is "Daridra Narayana" — God in the guise of the destitute.',
    ],
    misconceptionIndex: 0,
  },
  // 042: Jyotiba Phule (Foundation - Recall)
  {
    id: 'ch_042_1',
    nodeId: NODE_C8_HISTCIV_042,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In 1848, Jyotiba Phule and his wife Savitribai Phule opened India’s first school for lower-caste girls at which venue?',
    options: [
      'Fergusson College, Poona',
      'Bhide Wada in Pune',
      'Gokuldas Tejpal Sanskrit College, Bombay',
      'Presidency College, Calcutta',
    ],
    correctIndex: 1,
    explanation: 'On 1 January 1848, Jyotiba and Savitribai Phule opened India’s first school for lower-caste girls at Bhide Wada in Pune.',
    hints: [
      'It was located in the historic city of Pune.',
      'The building was known as a historic "Wada".',
      'The venue was Bhide Wada in Pune.',
    ],
    misconceptionIndex: 1,
  },
  // 042: Phule & Gulamgiri (Standard - Analysis)
  {
    id: 'ch_042_2',
    nodeId: NODE_C8_HISTCIV_042,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In 1871, Jyotiba Phule published "Gulamgiri" (Slavery). To whom did he dedicate this revolutionary anti-caste book?',
    options: [
      'Queen Victoria for introducing Western English law',
      'The good people of the United States for abolishing Negro slavery',
      'The French Revolutionaries who stormed the Bastille',
      'The Bhakti saints Kabir and Ravidas',
    ],
    correctIndex: 1,
    explanation: 'Phule dedicated Gulamgiri to the abolitionists of the United States, drawing a direct moral and analytical parallel between American racial slavery and the Indian caste hierarchy.',
    hints: [
      'Look across the Atlantic to the Civil War struggle against human enslavement.',
      'He drew a comparison between Indian Shudras and emancipated African Americans.',
      'It was dedicated to the American people for abolishing slavery.',
    ],
  },
  // 042: Satyashodhak Samaj (Advanced - Evaluation)
  {
    id: 'ch_042_3',
    nodeId: NODE_C8_HISTCIV_042,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why was the Satyashodhak Samaj’s practice of solemnising weddings without Brahmin priests considered a radical rupture in 19th-century society?',
    options: [
      'It reduced wedding expenses and allowed court-registered marriages under British civil law',
      'It dismantled the centuries-old Brahminical monopoly over religious mediation and sacraments',
      'It converted non-Hindus back to Vedic traditions through the Shuddhi movement',
      'It rejected all vernacular languages in favour of English liturgy',
    ],
    correctIndex: 1,
    explanation: 'By conducting marriages without Brahmin priests, the Satyashodhak Samaj (founded 24 Sept 1873) proved that lower castes did not require priestly intermediaries to commune with the divine.',
    hints: [
      'Think about who historically held the exclusive right to chant Vedic mantras at ceremonies.',
      'Bypassing the priestly caste eliminated centuries of religious ritual gatekeeping.',
      'It directly broke the Brahminical priestly monopoly.',
    ],
  },
  // 043: Sir Syed Ahmad Khan (Foundation - Recall)
  {
    id: 'ch_043_1',
    nodeId: NODE_C8_HISTCIV_043,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Sir Syed Ahmad Khan founded the Muhammadan Anglo-Oriental (MAO) College at Aligarh in 1875. In which year was this institution elevated into Aligarh Muslim University (AMU)?',
    options: [
      '1898',
      '1906',
      '1920',
      '1947',
    ],
    correctIndex: 2,
    explanation: 'MAO College was founded on 24 May 1875, and it was formally upgraded to Aligarh Muslim University in 1920 by an Act of the central legislature, 22 years after Sir Syed’s death in 1898.',
    hints: [
      'It became a full central university after World War I.',
      'Sir Syed had already passed away in 1898; the university was chartered in the 1920s.',
      'The year is 1920.',
    ],
    misconceptionIndex: 2,
  },
  // 043: Sir Syed Reform (Standard - Understanding)
  {
    id: 'ch_043_2',
    nodeId: NODE_C8_HISTCIV_043,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In his journal "Tahzib-ul-Akhlaq" (1870) and Quranic commentary "Tafsir-ul-Quran", Sir Syed vehemently attacked "Taqlid". What does Taqlid mean?',
    options: [
      'Armed revolt against foreign colonial administrators',
      'Blind and unquestioning imitation of outdated medieval traditions',
      'Translating Western scientific textbooks into Urdu',
      'Promoting modern English secondary education for women',
    ],
    correctIndex: 1,
    explanation: 'Taqlid refers to blind, uncritical conformity to past medieval jurisprudence. Sir Syed argued that genuine divine revelation and scientific reason could never contradict each other.',
    hints: [
      'It is the opposite of independent rational inquiry (Ijtihad).',
      'Sir Syed urged Muslims to stop blindly following medieval rulings that blocked modern scientific progress.',
      'It means blind imitation of obsolete traditions.',
    ],
  },
  // 044: Regional Reformers (Foundation - Match / Classify)
  {
    id: 'ch_044_1',
    nodeId: NODE_C8_HISTCIV_044,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which social reformer, known as the "Father of the Telugu Renaissance", conducted the first recorded widow remarriage in Andhra on 11 December 1881?',
    options: [
      'Sree Narayana Guru',
      'Kandukuri Veerasalingam Pantulu',
      'Mahadev Govind Ranade',
      'Jyotiba Phule',
    ],
    correctIndex: 1,
    explanation: 'Kandukuri Veerasalingam Pantulu led the Telugu Renaissance from Rajahmundry, braving immense orthodox hostility to perform the first widow remarriage in Andhra in 1881 and publishing Vivekavardhani.',
    hints: [
      'He operated from the Godavari delta town of Rajahmundry.',
      'He published the crusading journal Vivekavardhani.',
      'His name is Kandukuri Veerasalingam Pantulu.',
    ],
  },
  // 044: Narayana Guru & Singh Sabha (Standard - Understanding)
  {
    id: 'ch_044_2',
    nodeId: NODE_C8_HISTCIV_044,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'At Aruvippuram (Kerala) in 1888, Sree Narayana Guru performed a revolutionary act of defiance. What did he do?',
    options: [
      'Burned copies of the Vernacular Press Act on public grounds',
      'Consecrated a Shiva idol despite belonging to the excluded Ezhava community',
      'Founded the Khalsa College for Sikh higher education',
      'Launched the Home Rule League in Madras',
    ],
    correctIndex: 1,
    explanation: 'Sree Narayana Guru consecrated a Shiva temple at Aruvippuram in 1888, shattering the Brahminical monopoly over temple rites and proclaiming "One caste, one religion, one God for mankind".',
    hints: [
      'Ezhavas were considered "untouchable" and forbidden from consecrating idols or entering temples.',
      'He installed a stone taken from the Neyyar river as a Shiva lingam.',
      'He consecrated a Shiva idol, establishing spiritual equality.',
    ],
  },
  // 045: Rise of Nationalism (Foundation - Recall)
  {
    id: 'ch_045_1',
    nodeId: NODE_C8_HISTCIV_045,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which draconian law passed by Viceroy Lord Lytton on 14 March 1878 confiscated Indian-language printing presses without prior judicial trial?',
    options: [
      'The Arms Act of 1878',
      'The Vernacular Press Act of 1878',
      'The Rowlatt Act of 1919',
      'The Indian Councils Act of 1892',
    ],
    correctIndex: 1,
    explanation: 'Lord Lytton enacted the Vernacular Press Act on 14 March 1878 to muzzle critical Indian-language newspapers like the Amrita Bazar Patrika while exempting English publications.',
    hints: [
      'It specifically targeted "vernacular" (native Indian language) publications.',
      'It required publishers to deposit security bonds that could be confiscated by magistrates without trial.',
      'It is the Vernacular Press Act of 1878.',
    ],
  },
  // 045: Drain of Wealth (Standard - Analysis)
  {
    id: 'ch_045_2',
    nodeId: NODE_C8_HISTCIV_045,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In "Poverty and Un-British Rule in India" (1901), Dadabhai Naoroji identified "Home Charges" as a key engine of economic drain. What were Home Charges?',
    options: [
      'Tariffs placed on Indian cotton sold inside domestic bazaars',
      'Annual revenues dispatched to London to pay India Office salaries, British military pensions, and guaranteed railway dividends',
      'Famine relief funds deposited in the Bank of England for emergency grain purchases',
      'Local municipal taxes collected in Bombay and Calcutta to maintain Viceroy residences',
    ],
    correctIndex: 1,
    explanation: 'Home Charges were annual remittances extracted from Indian tax revenues sent to Britain to finance the India Office, British army pensions, debt interest, and guaranteed profits to British railway companies.',
    hints: [
      'These funds were sent directly out of India to the colonial metropolis in London.',
      'They covered pensions, military expenditure abroad, and government office costs in Britain without any economic return to India.',
      'They were annual unilateral transfers to London to maintain the colonial apparatus.',
    ],
  },
  // 046: INC Formation (Foundation - Recall)
  {
    id: 'ch_046_1',
    nodeId: NODE_C8_HISTCIV_046,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Where and when was the first session of the Indian National Congress convened, and who was elected its first President?',
    options: [
      'Calcutta in 1886; Surendranath Banerjee',
      'Bombay on 28 December 1885 at Gokuldas Tejpal Sanskrit College; W.C. Bonnerjee',
      'Poona in 1885; Justice M.G. Ranade',
      'Madras in 1887; Badruddin Tyabji',
    ],
    correctIndex: 1,
    explanation: 'The INC held its historic first session on 28–31 December 1885 at Gokuldas Tejpal Sanskrit College in Bombay with 72 delegates; Womesh Chunder Bonnerjee was elected president.',
    hints: [
      'The meeting was shifted from Poona to Bombay due to a cholera outbreak.',
      'It was attended by 72 delegates on 28 December 1885.',
      'W.C. Bonnerjee presided at Gokuldas Tejpal Sanskrit College, Bombay.',
    ],
    misconceptionIndex: 3,
  },
  // 046: INC Precursors (Standard - Drag Sort)
  {
    id: 'ch_046_2',
    nodeId: NODE_C8_HISTCIV_046,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange these early political associations in correct chronological order of their founding.',
    sortItems: [
      'Bombay Presidency Association (1852)',
      'Poona Sarvajanik Sabha (1870)',
      'Indian Association of Calcutta (1876)',
      'Madras Mahajana Sabha (1884)',
      'Indian National Congress (1885)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Regional political associations emerged systematically from Bombay (1852) to Poona (1870), Calcutta (1876), Madras (1884), culminating in the all-India Congress in 1885.',
    hints: [
      'The earliest association on the list is the Bombay Presidency Association in 1852.',
      'Ranade founded Poona Sarvajanik Sabha in 1870, followed by Banerjee’s Indian Association in 1876.',
      'Madras Mahajana Sabha was founded in 1884 just a year before INC in 1885.',
    ],
  },
  // 047: The Moderates (Foundation - Recall)
  {
    id: 'ch_047_1',
    nodeId: NODE_C8_HISTCIV_047,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The early Moderate leaders (1885–1905) conducted their constitutional campaign through the "3P" method. What did 3P stand for?',
    options: [
      'Power, Parity, and Parliament',
      'Petitions, Prayers, and Protests',
      'Press, Passive Resistance, and Picketing',
      'Purna Swaraj, Politics, and Propaganda',
    ],
    correctIndex: 1,
    explanation: 'The Moderates relied on Petitions (drafted memoranda), Prayers (appeals to British justice), and Protests (constitutional debate in councils and the press).',
    hints: [
      'Their approach was constitutional and peaceful, avoiding direct mass street confrontation.',
      'They submitted written memoranda and appealed to British fair play.',
      'The three Ps are Petitions, Prayers, and Protests.',
    ],
  },
  // 047: Moderate Demands & 1892 Act (Standard - Evaluation)
  {
    id: 'ch_047_2',
    nodeId: NODE_C8_HISTCIV_047,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why did the Indian Councils Act of 1892 represent both a historic breakthrough and a source of frustration for the Moderates?',
    options: [
      'It granted complete dominion status but placed high salt taxes on rural workers',
      'It introduced the statutory principle of indirect election to councils, but granted no real control over finances or the executive',
      'It separated the judiciary from the executive but abolished English universities in India',
      'It allowed Indians to join the Viceroy’s cabinet but banned all vernacular newspapers',
    ],
    correctIndex: 1,
    explanation: 'The 1892 Act was a breakthrough because it legally enlarged councils and permitted limited indirect election from universities and municipalities; yet it left officials in total majority with no voting power over budgets.',
    hints: [
      'Did Indian members receive true executive control or merely advisory debate rights?',
      'It established the principle of representation, but official British majorities remained dominant.',
      'It opened council doors via indirect election, but gave no sovereign power over executive decisions.',
    ],
  },
  // 048: Partition of Bengal (Foundation - Recall)
  {
    id: 'ch_048_1',
    nodeId: NODE_C8_HISTCIV_048,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On 16 October 1905, Viceroy Lord Curzon implemented the Partition of Bengal. How was this day observed across Bengal?',
    options: [
      'As a day of imperial coronation celebrations with fireworks',
      'As a day of mourning with fasting, hartals, singing "Amar Sonar Bangla", and tying Rakhis for communal unity',
      'By immediately declaring an independent revolutionary republic in Dhaka',
      'By presenting a grand golden petition to the British House of Commons',
    ],
    correctIndex: 1,
    explanation: '16 October 1905 was observed as a Day of Mourning. Rabindranath Tagore led mass processions singing "Amar Sonar Bangla" and tying Rakhis to proclaim Hindu-Muslim solidarity against Curzon’s divide-and-rule scheme.',
    hints: [
      'It was a day of solemn grief, fasting, and shared cultural resistance.',
      'Tagore suggested tying threads of brotherhood on each other’s wrists.',
      'It was observed as a Day of Mourning with fasting, patriotic songs, and Raksha Bandhan.',
    ],
    misconceptionIndex: 4,
  },
  // 048: Swadeshi Economic Impact (Standard - Numeric)
  {
    id: 'ch_048_2',
    nodeId: NODE_C8_HISTCIV_048,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'During the Swadeshi and Boycott movement of 1905–1906, massive public bonfires of Manchester textiles caused British cloth imports into Bengal to plummet. By what exact percentage did British cloth imports fall?',
    correctAnswer: 22,
    tolerance: 1,
    unit: '%',
    explanation: 'The boycott of foreign goods was so powerful that British Manchester cotton imports into Bengal collapsed by 22% during 1905–1906, giving an unprecedented boost to Indian indigenous textile mills.',
    hints: [
      'The drop was slightly greater than a fifth of total imports.',
      'The figure is between 20% and 25%.',
      'It is exactly 22 per cent.',
    ],
  },
  // 048: Drag-Label Diagram of Bengal Partition (Standard - Drag-Label)
  {
    id: 'ch_048_3',
    nodeId: NODE_C8_HISTCIV_048,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Drag each administrative term and outcome to its correct position on the 1905 Partition of Bengal schematic.',
    dragItems: [
      { label: 'West Bengal (Calcutta)', targetId: 'zone_west' },
      { label: 'East Bengal & Assam (Dhaka)', targetId: 'zone_east' },
      { label: 'Official Reason: Admin Size', targetId: 'zone_official' },
      { label: 'Real Reason: Divide & Rule', targetId: 'zone_real' },
    ],
    correctMapping: {
      zone_west: 'West Bengal (Calcutta)',
      zone_east: 'East Bengal & Assam (Dhaka)',
      zone_official: 'Official Reason: Admin Size',
      zone_real: 'Real Reason: Divide & Rule',
    },
    explanation: 'Lord Curzon split Bengal into West Bengal (Calcutta, Hindu majority) and East Bengal & Assam (Dhaka, Muslim majority), claiming 78 million people was too large to govern, while privately intending to split nationalist solidarity.',
    hints: [
      'West Bengal retained Calcutta as its capital.',
      'East Bengal merged with Assam with its capital at Dhaka.',
      'Administrative efficiency was the official excuse; divide-and-rule was the real political design.',
    ],
  },
  // 049: Surat Split (Foundation - Recall)
  {
    id: 'ch_049_1',
    nodeId: NODE_C8_HISTCIV_049,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'At the chaotic Surat session of December 1907, the Indian National Congress split into two factions. What famous slogan did Bal Gangadhar Tilak proclaim?',
    options: [
      '"Do or Die, we shall achieve freedom"',
      '"Swaraj is my birthright and I shall have it"',
      '"Give me blood, and I shall give you freedom"',
      '"Inquilab Zindabad"',
    ],
    correctIndex: 1,
    explanation: 'Tilak’s immortal battle-cry was "Swaraj is my birthright and I shall have it", published in his fiery Marathi newspaper Kesari.',
    hints: [
      'It asserts self-rule as an inherent fundamental right from birth.',
      'It was published in Kesari and Mahratta.',
      '"Swaraj is my birthright and I shall have it."',
    ],
  },
  // 049: Surat Split Repercussions (Standard - Analysis)
  {
    id: 'ch_049_2',
    nodeId: NODE_C8_HISTCIV_049,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Following the 1907 Surat Split, how did the British colonial administration exploit the division among nationalists?',
    options: [
      'They granted immediate dominion status to Gokhale’s Moderates',
      'They arrested and deported Bal Gangadhar Tilak to Mandalay Prison in Burma for six years (1908–1914) while suppressing the Assertive press',
      'They appointed Bipin Chandra Pal as Viceroy’s Executive Council member',
      'They permanently dissolved the Indian National Congress by imperial decree',
    ],
    correctIndex: 1,
    explanation: 'The British seized upon the rupture to isolate and crush the Assertive wing. Tilak was arrested in 1908 on sedition charges and imprisoned in Mandalay (Burma) for six years.',
    hints: [
      'The British targeted the Lal-Bal-Pal trio while the Moderates held the formal Congress shell.',
      'Tilak was dispatched across the Bay of Bengal to a fortified prison in Burma.',
      'Tilak was deported to Mandalay Prison in Burma from 1908 to 1914.',
    ],
  },
  // 050: Home Rule Movement (Foundation - Recall)
  {
    id: 'ch_050_1',
    nodeId: NODE_C8_HISTCIV_050,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In 1916, two separate Home Rule Leagues were launched. Which pair correctly identifies the founders, founding months, and regional divisions?',
    options: [
      'Gokhale (April 1916, Poona) & Gandhi (Sept 1916, Ahmedabad)',
      'Tilak (April 1916 at Belgaum; Maharashtra & Karnataka) & Annie Besant (Sept 1916 at Adyar; rest of India)',
      'Lala Lajpat Rai (April 1916, Punjab) & Bipin Chandra Pal (Sept 1916, Bengal)',
      'Dadabhai Naoroji (London) & W.C. Bonnerjee (Calcutta)',
    ],
    correctIndex: 1,
    explanation: 'Tilak founded his league in April 1916 at Belgaum covering Maharashtra, Karnataka, Central Provinces, and Berar. Annie Besant founded hers in September 1916 at Adyar (Madras) covering the rest of India.',
    hints: [
      'Tilak launched in April from Poona/Belgaum; Annie Besant launched in September from Adyar.',
      'They demarcated geographical spheres of activity to prevent organizational friction.',
      'Tilak (April 1916) and Annie Besant (September 1916).',
    ],
  },
  // 050: Home Rule & Montagu Declaration (Advanced - Evaluation / Construct)
  {
    id: 'ch_050_2',
    nodeId: NODE_C8_HISTCIV_050,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the historical cause-and-effect chain leading from the Home Rule Movement to the first official British declaration on self-government.',
    availableParts: [
      'Surat Split Stagnation (1907)',
      'Two Home Rule Leagues Formed (1916)',
      'Annie Besant Arrested in June 1917',
      'Nationwide Mass Protests Explode',
      'Montagu Declaration of 20 August 1917',
    ],
    targetState: 'Surat Split Stagnation (1907) Two Home Rule Leagues Formed (1916) Annie Besant Arrested in June 1917 Nationwide Mass Protests Explode Montagu Declaration of 20 August 1917',
    validationHint: 'Assemble the 5 events chronologically from the 1907 stagnation down to the Montagu Declaration of 20 August 1917.',
    explanation: 'Following years of inaction after the Surat Split, Tilak and Besant energized India in 1916. Besant’s arrest in 1917 sparked massive anger, forcing Secretary of State Edwin Montagu to issue the historic declaration on 20 August 1917 promising gradual development of self-governing institutions.',
    hints: [
      'Begin with the post-1907 political stagnation.',
      'Next comes the dual leagues of 1916, followed by the arrest of Besant in 1917.',
      'Protests from her arrest culminated in Edwin Montagu’s announcement on 20 August 1917.',
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
  nodeId: 'c8_histciv_041',
  title: 'Socio-Religious Reform & The Rise of Indian Nationalism (1850–1916)',
  definition: 'The transformation of India from regional socio-religious reform movements to a unified, assertive national movement demanding Swaraj.',
  eli5: 'How brave reformers taught people to believe in equality and education, and how Indian patriots united to demand that Indians should run their own country.',
  misconceptions: [
    {
      misconception: 'Vivekananda founded a new religious sect separate from Hinduism.',
      correction: 'Vivekananda founded the Ramakrishna Mission on 1 May 1897 as a humanitarian service organisation based on practical Vedanta, not a new sect.',
    },
    {
      misconception: 'Jyotiba Phule was a wealthy upper-caste philanthropist reforming from above.',
      correction: 'Phule was born into the Mali (Shudra) caste and led India’s first lower-caste-led movement attacking the caste system from below.',
    },
    {
      misconception: 'Sir Syed Ahmad Khan founded Aligarh Muslim University in 1875.',
      correction: 'Sir Syed founded MAO College in 1875; AMU was chartered in 1920, 22 years after his death.',
    },
    {
      misconception: 'The Indian National Congress in 1885 immediately demanded complete independence (Purna Swaraj).',
      correction: 'The early Congress was loyal to the Crown and sought constitutional reforms and council expansion, not complete independence (demanded in 1929).',
    },
    {
      misconception: 'The Partition of Bengal in 1905 was a permanent division of the subcontinent.',
      correction: 'Curzon’s partition split only the Bengal Presidency and was completely annulled in 1911 due to the ferocious Swadeshi movement.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'When was the Ramakrishna Mission founded at Belur Math?',
      options: ['11 September 1893', '1 May 1897', '4 July 1902', '12 January 1863'],
      correctIndex: 1,
    },
    {
      question: 'What was the central aim of Phule’s Satyashodhak Samaj?',
      options: ['Vedic revivalism', 'Liberating Shudras/Ati-Shudras from Brahminical domination', 'Promoting British textile imports', 'Teaching Arabic and Persian'],
      correctIndex: 1,
    },
    {
      question: 'Which institution was established by Sir Syed Ahmad Khan in 1864?',
      options: ['MAO College', 'The Scientific Society in Ghazipur', 'Banaras Hindu University', 'Khalsa College'],
      correctIndex: 1,
    },
    {
      question: 'Who coined the phrase "One caste, one religion, one God for mankind"?',
      options: ['Swami Dayanand', 'Kandukuri Veerasalingam', 'Sree Narayana Guru', 'Annie Besant'],
      correctIndex: 2,
    },
    {
      question: 'Which theory did Dadabhai Naoroji formulate in his 1901 book?',
      options: ['Theory of Natural Rights', 'Drain of Wealth Theory', 'Two-Nation Theory', 'Safety Valve Theory'],
      correctIndex: 1,
    },
    {
      question: 'Where did the 1907 Split between Moderates and Assertives occur?',
      options: ['Calcutta', 'Surat', 'Bombay', 'Lucknow'],
      correctIndex: 1,
    },
    {
      question: 'What was the immediate spark for the Swadeshi and Boycott movement in 1905?',
      options: ['Arms Act of 1878', 'Partition of Bengal', 'Vernacular Press Act', 'Ilbert Bill Controversy'],
      correctIndex: 1,
    },
    {
      question: 'What did "Home Rule" strictly mean in the 1916 movement?',
      options: ['Complete secession from the British Empire', 'Self-government on the dominion model within the Empire', 'Armed guerrilla insurrection', 'Total abolition of legislative councils'],
      correctIndex: 1,
    },
  ],
  masteryCriteria: 'Student understands the key socio-religious reformers, the factors driving Indian nationalism, the founding of the INC, the Moderates vs Assertives divide, and the Home Rule movement.',
};

// ─── BRILLIANT-STYLE INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Reformer’s Spark (1848–1897)',
    instruction: 'Click each great socio-religious pioneer to reveal their core institution, breakthrough act, and progressive ideology.',
    interactionType: 'click-reformer',
    nodeId: NODE_C8_HISTCIV_041,
  },
  {
    title: 'Lab 2: Economic Drain & Multi-Representation Engine',
    instruction: 'Adjust the colonial exploitation sliders to observe how the Drain of Wealth is represented across a mathematical equation, bar gauge, and systemic flowchart.',
    interactionType: 'slider-drain',
    nodeId: NODE_C8_HISTCIV_045,
  },
  {
    title: 'Lab 3: The 1885 Congress Assembly',
    instruction: 'Inspect the 72 delegates at Gokuldas Tejpal Sanskrit College and identify the Moderate "3P" constitutional strategy.',
    interactionType: 'explore-inc',
    nodeId: NODE_C8_HISTCIV_046,
  },
  {
    title: 'Lab 4: The 1905 Bengal Divide & Swadeshi Fire',
    instruction: 'Toggle Curzon’s Partition line on the schematic map to see the economic plunge in Manchester cloth imports and the rise of indigenous enterprise.',
    interactionType: 'toggle-partition',
    nodeId: NODE_C8_HISTCIV_048,
  },
  {
    title: 'Lab 5: From Surat Split to Home Rule (1907–1916)',
    instruction: 'Drag the timeline slider from 1907 to 1916 to witness the ideological transition and study the Moderates vs Assertives ideological Venn diagram.',
    interactionType: 'slider-timeline',
    nodeId: NODE_C8_HISTCIV_050,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Prediction: If the British colonial government enforced a 50% tariff increase on Indian handloom exports while draining revenue through Home Charges, how would Indian intellectuals react?',
    options: [
      'They would express full gratitude to British textile manufacturers',
      'They would formulate systematic economic critiques (like the Drain of Wealth) and launch nationalist newspapers',
      'They would abandon urban education and dissolve all regional associations',
      'They would immediately recruit foreign armies to invade Bengal',
    ],
    correctIndex: 1,
    verifyInstruction: 'Move the colonial drain slider to +50% and observe the Nationalist Press & Resistance Meter surge into the red zone.',
  },
  {
    question: 'Prediction: What was the immediate commercial reaction in Bengal when the public began burning Manchester cotton in October 1905?',
    options: [
      'Manchester imports skyrocketed due to panic buying',
      'British cloth imports fell sharply (by 22%) while Indian enterprises like Bengal Chemical and Tata Steel surged',
      'All Indian cotton mills in Bombay and Ahmedabad were forced into bankruptcy',
      'The British government doubled Indian wages in Calcutta',
    ],
    correctIndex: 1,
    verifyInstruction: 'Toggle the Swadeshi Boycott switch to activate the bonfire and watch the Manchester import gauge plummet.',
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: When you look at the geographical map of the 1916 Home Rule Leagues, what pattern do you notice about how Tilak and Besant shared territory?',
    observableOptions: [
      'Both leaders competed directly in Calcutta and Delhi',
      'Tilak focused on Maharashtra, Karnataka, and Central Provinces, while Besant covered Madras and the rest of India — creating complementary pan-Indian coverage',
      'Both leagues operated only inside London and Dublin',
      'Neither league held public meetings outside Bombay city',
    ],
    correctIndex: 1,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Investigative Editorial: The Torchbearers of Freedom',
  description: 'Step into the shoes of a fearless 1916 editor writing for Annie Besant’s "New India" or Tilak’s "Kesari". Synthesize the legacy of the 19th-century reformers, the economic drain critique of Naoroji, and explain why Home Rule on the dominion model was the essential stepping stone to independent India.',
  steps: [
    'Step 1: Select one social reformer (Vivekananda, Phule, or Sir Syed) and explain how their educational/caste reform paved the way for national self-confidence.',
    'Step 2: Quote Dadabhai Naoroji’s Drain of Wealth or Tilak’s "Swaraj is my birthright" to illustrate the economic or political grievance.',
    'Step 3: Compare Curzon’s 1905 Partition of Bengal with the 1916 Lucknow Reunion and explain why national unity defeated imperial divide-and-rule.',
    'Step 4: Conclude with a 3-sentence vision of how modern democratic India’s Constitution reflects these hard-won principles of equality, secularism, and representative self-government.',
  ],
};

// ─── MAIN COMPONENT ───
function C8_HistoryCivicsSwamiVivekanandaRamakrishnaSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['histciv'] || { name: 'History & Civics', emoji: '📜', color: 'amber' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant.org Style States
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Lab States
  const [selectedReformer, setSelectedReformer] = useState<string>('vivekananda');
  const [drainTax, setDrainTax] = useState(30);
  const [drainHomeCharges, setDrainHomeCharges] = useState(25);
  const [drainImportPenetration, setDrainImportPenetration] = useState(40);
  const [swadeshiActive, setSwadeshiActive] = useState(false);
  const [timelineYear, setTimelineYear] = useState(1905);
  const [incFilter, setIncFilter] = useState<'all' | 'moderates' | 'assertives'>('all');

  // Adaptive BKT & Scoring States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Per-Challenge States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Specific Challenge Type States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineGsapRef = useRef<HTMLDivElement | null>(null);

  // ─── DERIVED VALUES (Calculations) ───
  const calculatedDrainTotal = useMemo(() => {
    return Math.round((drainTax * 0.4 + drainHomeCharges * 0.35 + drainImportPenetration * 0.25) * 1.5);
  }, [drainTax, drainHomeCharges, drainImportPenetration]);

  const clothImportDrop = useMemo(() => {
    return swadeshiActive ? 22 : 0;
  }, [swadeshiActive]);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
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

  // ─── BKT ADAPTIVE EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── GSAP TIMELINE ANIMATION ───
  useEffect(() => {
    if (timelineGsapRef.current && phase === 'explore') {
      gsap.fromTo(
        timelineGsapRef.current.querySelectorAll('.timeline-node'),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [currentSlide, phase]);

  // ─── 2D CANVAS ANIMATION LOOP (Pulsing Freedom Torch) ───
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

      // Background ambient glow
      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, '#1e1b4b');
      grad.addColorStop(0.5, '#311042');
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw historic era progress track
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(30, 20);
      ctx.lineTo(canvas.width - 30, 20);
      ctx.stroke();

      // Pulsing node markers representing 1885, 1905, 1907, 1916
      const years = [
        { label: '1885 INC', pos: 0.15 },
        { label: '1905 Bengal', pos: 0.45 },
        { label: '1907 Surat', pos: 0.70 },
        { label: '1916 Home Rule', pos: 0.90 },
      ];

      years.forEach((yr, idx) => {
        const x = 30 + (canvas.width - 60) * yr.pos;
        const pulse = Math.sin(frame * 0.05 + idx) * 2;
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(x, 20, 6 + pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(yr.label, x, 36);
      });

      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── AUTO HINT TIMER CLEANUP ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── MEMOIZED HANDLERS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount]);

  const showNextHint = useCallback(() => {
    const nextLvl = hintCount + 1;
    if (nextLvl <= 3 && challenge.hints && challenge.hints[nextLvl - 1]) {
      setCurrentHint(challenge.hints[nextLvl - 1]);
      setShowHint(true);
      setHintCount(nextLvl);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLvl - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us study the complete historical explanation.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding! You know your Indian history.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive History Labs. Manipulate each concept to discover the roots of Indian nationalism.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free Sandbox Mode. Experiment freely with economic variables, reformers, and timelines.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Phase started. Put your historical analysis to the test.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded. Now interact with the lab to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Precise observation! Notice how spatial strategy unified the campaign.' : 'Examine the regional boundaries once more.');
  }, []);

  const handleReformerSelect = useCallback((key: string) => {
    setSelectedReformer(key);
    audioManager.play('tap');
    const spokenBio: Record<string, string> = {
      vivekananda: 'Swami Vivekananda introduced practical Vedanta and the concept of Daridra Narayana — serving God in the poor.',
      phule: 'Jyotiba and Savitribai Phule championed lower-caste education and founded the Satyashodhak Samaj in 1873.',
      syed: 'Sir Syed Ahmad Khan promoted modern scientific education, founding MAO College in 1875.',
      veerasalingam: 'Kandukuri Veerasalingam led the Telugu Renaissance with the 1881 widow remarriage at Rajahmundry.',
      narayanaguru: 'Sree Narayana Guru consecrated the Shiva lingam at Aruvippuram in 1888, teaching one caste, one religion, one God.',
      besant: 'Annie Besant founded the Central Hindu College in 1898 and led the 1916 Home Rule League from Adyar.',
    };
    if (spokenBio[key]) speechManager.speak(spokenBio[key]);
  }, []);

  const handleSwadeshiToggle = useCallback(() => {
    setSwadeshiActive(prev => {
      const next = !prev;
      audioManager.play(next ? 'sparkle' : 'pop');
      if (next) {
        speechManager.speak('Swadeshi bonfires ignited! Manchester cloth imports plummet by 22 percent.');
        setPredictionVerified(true);
      }
      return next;
    });
  }, []);

  const handleDrainSlider = useCallback((field: 'tax' | 'home' | 'import', val: number) => {
    audioManager.play('count');
    if (field === 'tax') setDrainTax(val);
    if (field === 'home') setDrainHomeCharges(val);
    if (field === 'import') setDrainImportPenetration(val);
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
      setTimeout(() => setWrongShake(false), 400);
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const initial = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : prev;
      const clone = [...initial];
      const [moved] = clone.splice(fromIdx, 1);
      clone.splice(toIdx, 0, moved);
      return clone;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered the epic journey of India’s socio-religious and nationalist awakening.');
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setRevealedSteps(0);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setConstructParts([]);
    setWrongShake(false);
    setWrongFlash(false);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback((ans: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = ans === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const parsed = typeof ans === 'string' ? parseFloat(ans) : ans as number;
      isCorrect = Math.abs(parsed - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (typeof ans === 'string' ? ans.trim() : '') === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Historically accurate! Splendid reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us review the historical background together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans min-h-[850px] relative overflow-hidden">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-amber-950/60 border border-amber-600/40 rounded-2xl shadow-inner" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-800">
                ICSE Class 8 History
              </span>
              <span className="text-xs text-slate-400">1850 – 1916</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Badges & Difficulty */}
        <div className="flex items-center gap-2">
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                  : difficulty === 'advanced'
                  ? 'bg-rose-950/80 text-rose-300 border-rose-600'
                  : 'bg-indigo-950/80 text-indigo-300 border-indigo-600'
              }`}
            >
              Tier: {difficulty}
            </motion.span>
          )}
          <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
            Phase: <strong className="text-amber-300 uppercase">{phase}</strong>
          </span>
        </div>
      </motion.div>

      {/* ─── 2D FREEDOM PROGRESS CANVAS ─── */}
      <div className="my-3 rounded-xl overflow-hidden border border-slate-800/80 shadow-md">
        <canvas ref={canvasRef} width={800} height={42} className="w-full block" aria-label="Interactive timeline showing 1885 INC, 1905 Bengal Partition, 1907 Surat Split, and 1916 Home Rule Movement" />
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 mt-4"
          >
            {/* Scenario Narrative Box */}
            <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-amber-950/40 rounded-2xl border border-indigo-700/40 shadow-xl relative">
              <div className="absolute top-4 right-4 text-xs font-bold text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-700/50">
                Curiosity Discovery Hook
              </div>
              <h2 className="text-lg md:text-xl font-bold text-amber-300 flex items-center gap-2">
                <span>📖</span> {SCENARIO.title}
              </h2>
              <p className="text-sm text-slate-200 mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs text-slate-400 mt-2 italic bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
                {SCENARIO.context}
              </p>
            </div>

            {/* Discovery Question Card */}
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
                <span>❓</span> Pre-Lesson Spark Puzzle
              </div>
              <p className="text-base md:text-lg font-semibold text-white mb-4">
                {DISCOVERY_QUESTION.question}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50'
                          : 'bg-slate-800/50 border-slate-700/50 text-slate-400 opacity-60'
                        : 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 text-slate-200 hover:border-indigo-500'
                    }`}
                  >
                    <span className="font-bold mr-2 text-amber-400">{String.fromCharCode(65 + i)}.</span>
                    {discoveryAnswered && (i === DISCOVERY_QUESTION.correctIndex ? '✓ ' : '✗ ')}
                    {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
                >
                  <p className={`text-sm ${discoveryCorrect ? 'text-emerald-300 font-semibold' : 'text-amber-300'}`}>
                    {discoveryCorrect ? '✓ ✨ Brilliant intuition! Vivekananda’s opening address stunned the World Parliament.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    aria-label="Enter interactive history exploration labs"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-amber-900/30 flex items-center gap-2 whitespace-nowrap"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: BRILLIANT-STYLE INTERACTIVE EXPLORATION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 space-y-4"
          >
            {/* Step Navigation Header */}
            <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Interactive Lab</span>
                <span className="text-xs font-black text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white hidden md:block">
                {EXPLORATION_STEPS[currentSlide].title}
              </h3>
              <div className="flex gap-2">
                <motion.button
                  aria-label="Go to previous interactive exploration slide"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs rounded-lg font-bold border border-slate-700"
                >
                  ← Prev
                </motion.button>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    aria-label="Go to next interactive exploration slide"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-xs text-white rounded-lg font-bold shadow-md shadow-indigo-900/40"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Proceed to open sandbox mode"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-4 py-1 bg-emerald-600 hover:bg-emerald-500 text-xs text-white rounded-lg font-bold shadow-md shadow-emerald-900/40"
                  >
                    Enter Sandbox →
                  </motion.button>
                )}
              </div>
            </div>

            {/* Instruction Banner */}
            <div className="p-3 bg-amber-950/30 border border-amber-700/40 rounded-xl text-xs md:text-sm text-amber-200 flex items-center gap-2">
              <span className="text-base" aria-hidden="true">👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
            </div>

            {/* ─── LAB SLIDE CONTENT ─── */}
            <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 min-h-[480px]">
              {/* Slide 0: The Reformers Interactive Constellation */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                    {[
                      { id: 'vivekananda', label: 'Vivekananda', region: 'Calcutta/Belur', icon: '🧘‍♂️' },
                      { id: 'phule', label: 'Jyotiba Phule', region: 'Pune (Mali)', icon: '🌱' },
                      { id: 'syed', label: 'Sir Syed Khan', region: 'Aligarh/Delhi', icon: '🏛️' },
                      { id: 'veerasalingam', label: 'Veerasalingam', region: 'Andhra (Telugu)', icon: '📖' },
                      { id: 'narayanaguru', label: 'Narayana Guru', region: 'Kerala (Ezhava)', icon: '🕉️' },
                      { id: 'besant', label: 'Annie Besant', region: 'Madras/Adyar', icon: '🇮🇪' },
                    ].map(r => (
                      <motion.button
                        key={r.id}
                        aria-label={`Select reformer ${r.label} from ${r.region}`}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleReformerSelect(r.id)}
                        className={`p-3 rounded-xl text-center border transition-all ${
                          selectedReformer === r.id
                            ? 'bg-amber-950 border-amber-500 text-amber-200 shadow-lg shadow-amber-950/60'
                            : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <div className="text-2xl mb-1" aria-hidden="true">{r.icon}</div>
                        <div className="text-xs font-bold leading-tight">{r.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{r.region}</div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Reformer Detailed Showcase Card */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedReformer}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="p-5 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2.5 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded-full font-bold uppercase">
                            Key Breakthrough
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            {selectedReformer === 'vivekananda' && '1893 Chicago & 1 May 1897 Belur Math'}
                            {selectedReformer === 'phule' && '1848 Bhide Wada & 24 Sept 1873 Satyashodhak'}
                            {selectedReformer === 'syed' && '1864 Scientific Society & 24 May 1875 MAO College'}
                            {selectedReformer === 'veerasalingam' && '11 Dec 1881 Widow Remarriage & Vivekavardhani'}
                            {selectedReformer === 'narayanaguru' && '1888 Aruvippuram Temple Consecration'}
                            {selectedReformer === 'besant' && '1898 Central Hindu College & Sept 1916 Home Rule'}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-amber-300">
                          {selectedReformer === 'vivekananda' && 'Swami Vivekananda (1863–1902)'}
                          {selectedReformer === 'phule' && 'Mahatma Jyotirao Phule (1827–1890)'}
                          {selectedReformer === 'syed' && 'Sir Syed Ahmad Khan (1817–1898)'}
                          {selectedReformer === 'veerasalingam' && 'Kandukuri Veerasalingam Pantulu (1848–1919)'}
                          {selectedReformer === 'narayanaguru' && 'Sree Narayana Guru (1856–1928)'}
                          {selectedReformer === 'besant' && 'Annie Besant (1847–1933)'}
                        </h4>
                        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                          {selectedReformer === 'vivekananda' &&
                            'Born Narendranath Datta in Calcutta. Introduced the world to Vedanta at Chicago in 1893 and established the Ramakrishna Mission (1897) grounded in Daridra Narayana — serving God in the poor through famine relief, education, and healthcare.'}
                          {selectedReformer === 'phule' &&
                            'Born into the Mali (Shudra) caste in Pune. Attacked the caste system from below, opened India’s first girls’ school at Bhide Wada in 1848 with Savitribai Phule, authored Gulamgiri (1871) comparing caste to American slavery, and conducted priestless marriages.'}
                          {selectedReformer === 'syed' &&
                            'Post-1857 reformer who concluded Muslim decline stemmed from rejecting modern science. Founded the Scientific Society (1864) and MAO College (1875, later AMU 1920), championing rational Quranic interpretation against rigid Taqlid.'}
                          {selectedReformer === 'veerasalingam' &&
                            'Father of the Telugu Renaissance from Rajahmundry. Braved orthodox wrath to conduct Andhra’s first authorised widow remarriage in 1881 and established Vivekavardhani to challenge child marriage and female illiteracy.'}
                          {selectedReformer === 'narayanaguru' &&
                            'Ezhava spiritual leader from Kerala who shattered Brahminical monopoly by consecrating a Shiva temple at Aruvippuram in 1888. His immortal motto: "Oru jati, oru matam, oru daivam, manushyanu" (One caste, one religion, one God for mankind).'}
                          {selectedReformer === 'besant' &&
                            'Irish Theosophist who founded Central Hindu College at Benares (1898) and later bridged cultural revival with political self-governance by launching the All-India Home Rule League in Sept 1916 from Adyar, Madras.'}
                        </p>
                      </div>

                      {/* Interactive Philosophy Shield */}
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-center text-center space-y-2">
                        <div className="text-xs uppercase font-bold text-slate-400">Core Ideological Pillar</div>
                        <div className="text-sm font-black text-amber-400 p-2 bg-amber-950/60 rounded-lg border border-amber-800/60">
                          {selectedReformer === 'vivekananda' && 'Universal Vedanta & Daridra Narayana'}
                          {selectedReformer === 'phule' && 'Dalit Liberation & Truth-Seeking'}
                          {selectedReformer === 'syed' && 'Rationalism & English Education'}
                          {selectedReformer === 'veerasalingam' && 'Widow Emancipation & Telugu Renaissance'}
                          {selectedReformer === 'narayanaguru' && 'Spiritual Egalitarianism for Untouchables'}
                          {selectedReformer === 'besant' && 'Dominion Home Rule & Cultural Pride'}
                        </div>
                        <div className="text-[11px] text-slate-400 italic">
                          Click any reformer to inspect how regional reforms converged into a pan-Indian consciousness.
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {/* Slide 1: Economic Drain & Multi-Representation Engine */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* Predict-Then-Check Hook */}
                  {!predictionMade ? (
                    <div className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-700 space-y-2">
                      <p className="text-xs font-bold text-indigo-300 uppercase">Step 1: Make a Prediction</p>
                      <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction Option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left text-xs bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-amber-300">
                      🎯 {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </div>
                  )}

                  {/* Multi-Representation Top: Interactive Mathematical Equation */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm font-mono">
                    <span className="text-slate-400 font-bold uppercase">Representation 1 (Equation):</span>
                    <span className="text-amber-300 bg-amber-950/70 px-2 py-1 rounded border border-amber-800">
                      Drain = (0.40 × Tax {drainTax}%) + (0.35 × Home Charges {drainHomeCharges}%) + (0.25 × Imports {drainImportPenetration}%) × 1.5
                    </span>
                    <span className="text-rose-400 font-bold bg-rose-950 px-2.5 py-1 rounded border border-rose-800">
                      = ₹ {calculatedDrainTotal}M Sterling
                    </span>
                  </div>

                  {/* Multi-Representation Middle: SVG 1 - Drain of Wealth Flowchart */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center justify-between">
                      <span>Representation 2 (Systemic Flow SVG): Dadabhai Naoroji’s Wealth Extraction Mechanism</span>
                      <span className="text-amber-400 font-mono">Unilateral Outflow</span>
                    </div>
                    <svg viewBox="0 0 760 140" className="w-full h-auto rounded-lg bg-slate-900 border border-slate-800" aria-label="SVG Flowchart of Dadabhai Naoroji's Drain of Wealth showing revenue collected in India flowing via Home Charges to London with zero return value">
                      <rect x="20" y="25" width="180" height="90" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                      <text x="110" y="55" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">🇮🇳 Indian Taxpayers</text>
                      <text x="110" y="75" fill="#cbd5e1" fontSize="10" textAnchor="middle">Ryots & Handloom Artisans</text>
                      <text x="110" y="95" fill="#94a3b8" fontSize="9" textAnchor="middle">Taxes: {drainTax}% | Tariffs: {drainImportPenetration}%</text>

                      {/* Animated Flow Arrow */}
                      <path d="M 205 70 L 330 70" stroke="#ef4444" strokeWidth="3" strokeDasharray="6,4" fill="none" />
                      <polygon points="335,70 325,65 325,75" fill="#ef4444" />
                      <text x="270" y="60" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">Home Charges</text>
                      <text x="270" y="85" fill="#fca5a5" fontSize="8" textAnchor="middle">({drainHomeCharges}% of budget)</text>

                      <rect x="340" y="25" width="180" height="90" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                      <text x="430" y="55" fill="#f87171" fontSize="13" fontWeight="bold" textAnchor="middle">🏦 London India Office</text>
                      <text x="430" y="75" fill="#cbd5e1" fontSize="10" textAnchor="middle">Military Pensions & Debt</text>
                      <text x="430" y="95" fill="#94a3b8" fontSize="9" textAnchor="middle">Guaranteed 5% Railway Interest</text>

                      {/* Zero Return Arrow */}
                      <path d="M 525 70 L 640 70" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" fill="none" />
                      <polygon points="645,70 635,65 635,75" fill="#64748b" />
                      <text x="585" y="60" fill="#cbd5e1" fontSize="10" textAnchor="middle">No Equivalent Return</text>

                      <rect x="650" y="25" width="95" height="90" rx="10" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                      <text x="697" y="60" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">❌ Zero</text>
                      <text x="697" y="80" fill="#64748b" fontSize="9" textAnchor="middle">Economic</text>
                      <text x="697" y="95" fill="#64748b" fontSize="9" textAnchor="middle">Reinvestment</text>
                    </svg>
                  </div>

                  {/* Real-time Sliders for Economic Drain */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Land Revenue Extraction</span>
                        <span className="font-bold text-amber-400">{drainTax}%</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Adjust land revenue extraction percentage slider"
                        min={10}
                        max={90}
                        value={drainTax}
                        onChange={e => handleDrainSlider('tax', Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                      <p className="text-[11px] text-slate-400">Impoverished rural ryots and broke traditional agrarian security.</p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Home Charges Outflow</span>
                        <span className="font-bold text-rose-400">{drainHomeCharges}%</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Adjust British Home Charges outflow percentage slider"
                        min={10}
                        max={90}
                        value={drainHomeCharges}
                        onChange={e => handleDrainSlider('home', Number(e.target.value))}
                        className="w-full accent-rose-500"
                      />
                      <p className="text-[11px] text-slate-400">Pensions, India Office upkeep, and guaranteed railway interest remitted to London.</p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Foreign Factory Inflow</span>
                        <span className="font-bold text-indigo-400">{drainImportPenetration}%</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Adjust foreign factory import penetration slider"
                        min={10}
                        max={90}
                        value={drainImportPenetration}
                        onChange={e => handleDrainSlider('import', Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                      <p className="text-[11px] text-slate-400">Destroyed indigenous weavers and artisan handicraft guilds.</p>
                    </div>
                  </div>

                  {/* Multi-Representation Bottom: Comparative Bar Gauge */}
                  <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                        Representation 3 (Dynamic Bar Gauge): Naoroji Imperial Drain Total
                      </div>
                      <div className="text-2xl font-black text-rose-400 mt-1">
                        ₹ {calculatedDrainTotal} Million Sterling Drained Annually
                      </div>
                    </div>
                    <div className="w-full md:w-64">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Nationalist Resistance Index:</span>
                        <span className="font-bold text-amber-400">{calculatedDrainTotal > 100 ? '⚡ REVOLUTIONARY' : '⚠️ CRITICAL'}</span>
                      </div>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                        <motion.div
                          className="h-full bg-gradient-to-r from-amber-500 to-rose-600 rounded-full"
                          animate={{ width: `${Math.min(100, calculatedDrainTotal * 0.7)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 2: The 1885 INC First Session */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-xs text-amber-400 font-bold uppercase">Historic Conclave</span>
                      <h4 className="text-base font-bold text-white">Gokuldas Tejpal Sanskrit College, Bombay (28–31 Dec 1885)</h4>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className="px-3 py-1 bg-indigo-950 text-indigo-300 rounded-lg border border-indigo-800 font-mono">
                        72 Delegates Present
                      </span>
                      <span className="px-3 py-1 bg-amber-950 text-amber-300 rounded-lg border border-amber-800 font-mono">
                        President: W.C. Bonnerjee
                      </span>
                    </div>
                  </div>

                  {/* Visual Layout of Early Congress Platforms */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-indigo-400 uppercase">Organisational Architecture</div>
                      <p className="text-xs text-slate-300">
                        Retired ICS officer <strong>A.O. Hume</strong> convened delegates across Bombay, Calcutta, and Madras. Viceroy Dufferin initially considered it a helpful &ldquo;safety valve&rdquo;.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-emerald-400 uppercase">Initial Objectives</div>
                      <p className="text-xs text-slate-300">
                        Promote pan-Indian friendship among nationalist workers, formulate constitutional demands, and train citizens in representative governance.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-amber-400 uppercase">The 3P Method</div>
                      <p className="text-xs text-slate-300">
                        <strong>Petitions</strong>, <strong>Prayers</strong>, and <strong>Protests</strong> — working strictly within the British constitutional framework to expand Legislative Councils.
                      </p>
                    </div>
                  </div>

                  {/* Interactive Precursor Association Explorer */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                      Pre-1885 Regional Associations (The Foundations of INC)
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <strong className="text-amber-300 block">Bombay Pres. Assoc. (1852)</strong>
                        <span className="text-slate-400">Naoroji & Bombay leaders</span>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <strong className="text-amber-300 block">Poona Sarvajanik Sabha (1870)</strong>
                        <span className="text-slate-400">Justice M.G. Ranade</span>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <strong className="text-amber-300 block">Indian Assoc. Calcutta (1876)</strong>
                        <span className="text-slate-400">Surendranath Banerjee</span>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <strong className="text-amber-300 block">Madras Mahajana Sabha (1884)</strong>
                        <span className="text-slate-400">M. Viraraghavachariar</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 3: 1905 Bengal Partition & Swadeshi Fire */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800 gap-4">
                    <div>
                      <div className="text-xs text-rose-400 uppercase font-bold">16 October 1905 — Divide & Rule Scheme</div>
                      <h4 className="text-base font-bold text-white">Curzon’s Bengal Partition & The Swadeshi Revolution</h4>
                    </div>
                    <motion.button
                      aria-label="Toggle Swadeshi bonfire campaign"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSwadeshiToggle}
                      className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg transition-all ${
                        swadeshiActive
                          ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/80 border border-rose-400'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {swadeshiActive ? '🔥 Swadeshi Bonfires Burning! (✓ Active)' : 'Click to Ignite Swadeshi Bonfires'}
                    </motion.button>
                  </div>

                  {/* SVG 2: Partition of Bengal Map Schematic */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-2">
                      SVG Topic Diagram 2: Curzon’s 1905 Partition Line & Demographic Engineering
                    </div>
                    <svg viewBox="0 0 760 160" className="w-full h-auto rounded-lg bg-slate-900 border border-slate-800" aria-label="Schematic map diagram showing West Bengal with Hindu majority centered in Calcutta and East Bengal and Assam with Muslim majority centered in Dhaka separated by Curzon's partition line">
                      {/* West Bengal Box */}
                      <rect x="25" y="20" width="330" height="120" rx="12" fill={swadeshiActive ? '#3b1c1c' : '#1e1b4b'} stroke="#6366f1" strokeWidth="2" />
                      <text x="190" y="50" fill="#a5b4fc" fontSize="14" fontWeight="bold" textAnchor="middle">WEST BENGAL, BIHAR & ORISSA</text>
                      <text x="190" y="75" fill="#f8fafc" fontSize="12" textAnchor="middle">Capital: Calcutta • Population: 54 Million</text>
                      <text x="190" y="98" fill="#cbd5e1" fontSize="10" textAnchor="middle">Demographics: 42M Hindus | 9M Muslims</text>
                      <text x="190" y="122" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                        {swadeshiActive ? '🔥 Boycott Hub: Bengal Chemical & Swadeshi Rallies' : 'Epicenter of Nationalist Press & Intelligentsia'}
                      </text>

                      {/* Partition Boundary Line */}
                      <line x1="380" y1="10" x2="380" y2="150" stroke="#ef4444" strokeWidth="3" strokeDasharray="6,4" />
                      <text x="380" y="15" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">1905 CURZON PARTITION LINE</text>

                      {/* East Bengal & Assam Box */}
                      <rect x="405" y="20" width="330" height="120" rx="12" fill={swadeshiActive ? '#2e1065' : '#064e3b'} stroke="#10b981" strokeWidth="2" />
                      <text x="570" y="50" fill="#6ee7b7" fontSize="14" fontWeight="bold" textAnchor="middle">EAST BENGAL & ASSAM</text>
                      <text x="570" y="75" fill="#f8fafc" fontSize="12" textAnchor="middle">Capital: Dhaka • Population: 31 Million</text>
                      <text x="570" y="98" fill="#cbd5e1" fontSize="10" textAnchor="middle">Demographics: 18M Muslims | 12M Hindus</text>
                      <text x="570" y="122" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                        {swadeshiActive ? '✓ Rabindranath Tagore Led Rakhi Bandhan Rallies' : 'Imperial Intent: Foster Communal Estrangement'}
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <h5 className="text-xs font-bold text-amber-300 uppercase">Official Excuse vs Imperial Intent</h5>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Lord Curzon claimed the province of 78 million was &ldquo;too unwieldy to administer.&rdquo; In secret dispatches, Home Secretary H.H. Risley wrote: <em>&ldquo;Bengal united is a power; Bengal divided will pull in different directions.&rdquo;</em>
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <h5 className="text-xs font-bold text-emerald-300 uppercase">Mass Direct Action & Economic Plunge</h5>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                        <span className="text-xs">Manchester Cotton Imports Drop:</span>
                        <span className="text-base font-black text-rose-400 font-mono">-{clothImportDrop}%</span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Indigenous enterprises flourished: P.C. Ray’s Bengal Chemical (1901), Tata Iron & Steel (1907), and National Education schools.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 4: Surat Split to Home Rule Movement (1907–1916) */}
              {currentSlide === 4 && (
                <div className="space-y-4" ref={timelineGsapRef}>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs uppercase font-bold text-amber-400">Historical Timeline Slider</span>
                      <span className="text-xs font-mono bg-amber-950 px-2 py-0.5 rounded text-amber-300 font-bold">
                        Year: {timelineYear}
                      </span>
                    </div>
                    <input
                      type="range"
                      aria-label="Timeline navigation slider from 1905 to 1916"
                      min={1905}
                      max={1916}
                      step={1}
                      value={timelineYear}
                      onChange={e => setTimelineYear(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  {/* SVG 3: Moderates vs Assertives Ideological Venn & Evolution */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-2">
                      SVG Topic Diagram 3: Comparative Ideological Spectrum (Moderates vs Assertives)
                    </div>
                    <svg viewBox="0 0 760 160" className="w-full h-auto rounded-lg bg-slate-900 border border-slate-800" aria-label="Venn diagram comparing Moderate leaders like Naoroji and Gokhale using Petitions and Prayers with Assertive leaders Tilak, Pal, and Rai using Swaraj, Boycott, and National Education, reuniting at the 1916 Lucknow Pact">
                      {/* Moderate Circle */}
                      <circle cx="280" cy="80" r="70" fill="#1e3a8a" fillOpacity="0.5" stroke="#3b82f6" strokeWidth="2" />
                      <text x="230" y="55" fill="#93c5fd" fontSize="12" fontWeight="bold" textAnchor="middle">MODERATES (1885-1905)</text>
                      <text x="230" y="75" fill="#cbd5e1" fontSize="9" textAnchor="middle">• 3P Method: Petitions & Prayers</text>
                      <text x="230" y="90" fill="#cbd5e1" fontSize="9" textAnchor="middle">• Faith in British Justice</text>
                      <text x="230" y="105" fill="#cbd5e1" fontSize="9" textAnchor="middle">• Naoroji, Gokhale, W.C. Bonnerjee</text>

                      {/* Assertive Circle */}
                      <circle cx="480" cy="80" r="70" fill="#881337" fillOpacity="0.5" stroke="#f43f5e" strokeWidth="2" />
                      <text x="530" y="55" fill="#fda4af" fontSize="12" fontWeight="bold" textAnchor="middle">ASSERTIVES (1905-1916)</text>
                      <text x="530" y="75" fill="#cbd5e1" fontSize="9" textAnchor="middle">• Direct Action & Boycott</text>
                      <text x="530" y="90" fill="#cbd5e1" fontSize="9" textAnchor="middle">• &ldquo;Swaraj is my birthright&rdquo;</text>
                      <text x="530" y="105" fill="#cbd5e1" fontSize="9" textAnchor="middle">• Lal, Bal, Pal & Aurobindo</text>

                      {/* Common Overlap */}
                      <text x="380" y="65" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">COMMON GOAL</text>
                      <text x="380" y="82" fill="#fef3c7" fontSize="8" textAnchor="middle">National Awakening</text>
                      <text x="380" y="96" fill="#fef3c7" fontSize="8" textAnchor="middle">& Economic Critique</text>
                      <text x="380" y="115" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">1916 Lucknow Reunion</text>
                    </svg>
                  </div>

                  {/* Timeline Nodes */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className={`p-3 rounded-xl border timeline-node transition-all ${
                      timelineYear >= 1907 ? 'bg-rose-950/40 border-rose-600/60 text-white' : 'bg-slate-900 border-slate-800 opacity-50'
                    }`}>
                      <div className="text-xs font-bold text-rose-400">1907: Surat Split</div>
                      <p className="text-[11px] text-slate-300 mt-1">
                        Clashes between Moderates and Assertives (Lal-Bal-Pal). Tilak expelled; Congress weakened for nearly a decade.
                      </p>
                    </div>

                    <div className={`p-3 rounded-xl border timeline-node transition-all ${
                      timelineYear >= 1908 ? 'bg-amber-950/40 border-amber-600/60 text-white' : 'bg-slate-900 border-slate-800 opacity-50'
                    }`}>
                      <div className="text-xs font-bold text-amber-400">1908–1914: Mandalay</div>
                      <p className="text-[11px] text-slate-300 mt-1">
                        Tilak imprisoned in Burma for sedition. Wrote &ldquo;Gita Rahasya&rdquo; during his 6-year solitary sentence.
                      </p>
                    </div>

                    <div className={`p-3 rounded-xl border timeline-node transition-all ${
                      timelineYear >= 1916 ? 'bg-indigo-950/40 border-indigo-600/60 text-white' : 'bg-slate-900 border-slate-800 opacity-50'
                    }`}>
                      <div className="text-xs font-bold text-indigo-400">1916: Home Rule Leagues</div>
                      <p className="text-[11px] text-slate-300 mt-1">
                        Tilak (April, Belgaum) & Annie Besant (Sept, Adyar) demand dominion status within Empire.
                      </p>
                    </div>

                    <div className={`p-3 rounded-xl border timeline-node transition-all ${
                      timelineYear >= 1916 ? 'bg-emerald-950/40 border-emerald-600/60 text-white' : 'bg-slate-900 border-slate-800 opacity-50'
                    }`}>
                      <div className="text-xs font-bold text-emerald-400">Dec 1916: Lucknow Pact</div>
                      <p className="text-[11px] text-slate-300 mt-1">
                        Reunification of Moderates and Assertives in Congress + historic joint charter with the Muslim League.
                      </p>
                    </div>
                  </div>

                  {/* Observation Question */}
                  {!observationAnswered ? (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-xs font-bold text-amber-300 uppercase">Scientific Observation Check</p>
                      <p className="text-sm text-white font-medium">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5 mt-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Observation Option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="w-full text-left p-2.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs border border-slate-700 text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-950/50 rounded-xl border border-emerald-700 text-xs text-emerald-200 flex items-center gap-2">
                      <span className="font-bold text-sm">✓</span>
                      <span>Excellent observation! The parallel league structure maximized mobilisation without territorial rivalry.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mt-4 space-y-5"
          >
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Ungraded Free Play Mode</span>
                <h3 className="text-lg font-bold text-white">Historical Sandbox Simulator</h3>
                <p className="text-xs text-slate-400">Manipulate all parameters across reform, economic drain, and political agitation.</p>
              </div>
              <motion.button
                aria-label="Proceed to graded challenge suite"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-black text-sm tracking-wide shadow-lg shadow-emerald-950/60 flex items-center gap-2 whitespace-nowrap"
              >
                Ready for Challenges! 🎯
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Drain Simulator */}
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-rose-400 uppercase">1. Imperial Wealth Drain</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Taxes: {drainTax}%</span>
                    <span>Home Charges: {drainHomeCharges}%</span>
                  </div>
                  <input
                    type="range"
                    aria-label="Sandbox tax extraction slider"
                    min={0}
                    max={100}
                    value={drainTax}
                    onChange={e => setDrainTax(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                  <div className="p-2.5 bg-slate-950 rounded-lg text-xs font-mono text-rose-300">
                    Drain Total: ₹ {calculatedDrainTotal}M / yr
                  </div>
                </div>
              </div>

              {/* Swadeshi Bonfire Switch */}
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-amber-400 uppercase">2. Swadeshi Resistance</h4>
                <motion.button
                  aria-label="Toggle Swadeshi boycott mode in sandbox"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSwadeshiToggle}
                  className={`w-full p-3 rounded-xl text-xs font-bold border transition-all ${
                    swadeshiActive
                      ? 'bg-amber-950 border-amber-500 text-amber-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {swadeshiActive ? '🔥 Boycott Active (-22% Foreign Cloth)' : '💤 Normal Colonial Trade'}
                </motion.button>
                <div className="text-[11px] text-slate-400">
                  Boosts domestic industries: Bengal Chemical, Tata Steel, and Swadeshi steamships.
                </div>
              </div>

              {/* Congress Ideology Filter */}
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-indigo-400 uppercase">3. INC Ideological Faction</h4>
                <div className="grid grid-cols-3 gap-1 text-[11px]">
                  {(['all', 'moderates', 'assertives'] as const).map(f => (
                    <button
                      key={f}
                      aria-label={`Filter Congress ideologies by ${f}`}
                      onClick={() => setIncFilter(f)}
                      className={`p-1.5 rounded-lg font-bold capitalize border ${
                        incFilter === f
                          ? 'bg-indigo-900 border-indigo-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg text-xs text-slate-300">
                  {incFilter === 'moderates' && 'Petitions, Prayers, Protests (Naoroji, Gokhale, Mehta).'}
                  {incFilter === 'assertives' && 'Swaraj, Boycott, National Education (Tilak, Pal, Rai).'}
                  {incFilter === 'all' && 'All nationalist wings operating across 1885–1916.'}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: CHALLENGE SUITE (Adaptive & Escalating Hints) ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key={`challenge-${currentChallenge}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mt-4 space-y-4"
          >
            {/* Challenge Progress Header */}
            <div className="flex items-center justify-between bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-white">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-[10px] px-2.5 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded-full font-bold uppercase tracking-wider">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">
                  Accuracy: {scoreBreakdown.total > 0 ? Math.round((scoreBreakdown.correct / scoreBreakdown.total) * 100) : 100}%
                </span>
                <span className="text-xs text-rose-400 font-mono">Errors: {errors}</span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-indigo-600 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>

            {/* Challenge Question Card */}
            <div className={`p-6 rounded-2xl transition-all border ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 shadow-2xl shadow-rose-950/80'
                : 'bg-slate-900/95 border-slate-800 shadow-xl'
            }`}>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <span>⚡</span> Question Prompt
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white mb-6 leading-snug">
                {challenge.question}
              </h3>

              {/* 1. MCQ Types (classify, distinguish, match) */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.012 }}
                      whileTap={{ scale: 0.988 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                        showExplanation
                          ? i === challenge.correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold shadow-lg shadow-emerald-950/60'
                            : 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-50'
                          : 'bg-slate-800/90 hover:bg-slate-700/80 border-slate-700 text-slate-200 hover:border-amber-500'
                      }`}
                    >
                      <span className="font-bold mr-2 text-amber-400">{String.fromCharCode(65 + i)}.</span>
                      {showExplanation && (i === challenge.correctIndex ? '✓ ' : '✗ ')}
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* 2. Drag-Label Diagram Challenge */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  {/* Draggable Items Palette */}
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {challenge.dragItems.map((item, i) => {
                      const isAssigned = Object.values(droppedLabels).includes(item.label);
                      return (
                        <motion.div
                          key={i}
                          role="button"
                          tabIndex={0}
                          aria-label={`Draggable label: ${item.label}`}
                          draggable={!isAssigned}
                          onDragStart={() => handleDragStart(item.label)}
                          whileHover={!isAssigned ? { scale: 1.04 } : {}}
                          whileTap={!isAssigned ? { scale: 0.96 } : {}}
                          className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                            isAssigned
                              ? 'bg-slate-800/50 text-slate-600 border border-slate-800 cursor-not-allowed'
                              : 'bg-indigo-700 hover:bg-indigo-600 text-white cursor-grab border border-indigo-500 shadow-md'
                          }`}
                        >
                          {item.label}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* SVG Drop Targets Schematic */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    {[
                      { id: 'zone_west', label: 'Western Province Hub (Calcutta)' },
                      { id: 'zone_east', label: 'Eastern Province Hub (Dhaka)' },
                      { id: 'zone_official', label: 'Colonial Public Rationale' },
                      { id: 'zone_real', label: 'Underlying Imperial Strategy' },
                    ].map(target => (
                      <div
                        key={target.id}
                        role="region"
                        aria-label={`Drop target for ${target.label}`}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop(target.id)}
                        className={`p-4 rounded-xl border-2 border-dashed transition-all flex flex-col justify-between min-h-[90px] ${
                          droppedLabels[target.id]
                            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-amber-400'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold text-slate-400">{target.label}</span>
                        <span className="text-xs font-black text-amber-300 mt-2">
                          {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drag and drop matching term here'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Verify dragged label assignments"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={Object.keys(droppedLabels).length < (challenge.dragItems?.length || 4) || showExplanation}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl font-bold text-xs"
                  >
                    Verify Label Mapping →
                  </motion.button>
                </div>
              )}

              {/* 3. Drag-Sort Challenge */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">Reorder items from top to bottom into proper historical chronological sequence:</p>
                  <div className="space-y-2">
                    {(sortArrangement.length === challenge.sortItems.length
                      ? sortArrangement.map(idx => challenge.sortItems![idx])
                      : challenge.sortItems
                    ).map((item, displayIdx) => (
                      <motion.div
                        key={displayIdx}
                        role="button"
                        tabIndex={0}
                        aria-label={`Chronological item ${displayIdx + 1}: ${item}. Drag to reorder`}
                        draggable
                        onDragStart={() => setDraggedItem(String(displayIdx))}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => {
                          const from = parseInt(draggedItem || '0');
                          handleSortMove(from, displayIdx);
                        }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="p-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 cursor-grab flex items-center gap-3"
                      >
                        <span className="p-1 bg-slate-900 rounded text-amber-400 font-bold">{displayIdx + 1}</span>
                        {item}
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Verify chronological arrangement order"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      const answer = sortArrangement.length > 0
                        ? sortArrangement
                        : (challenge.sortItems?.map((_, i) => i) || []);
                      handleAnswer(answer);
                    }}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl font-bold text-xs"
                  >
                    Check Chronological Order →
                  </motion.button>
                </div>
              )}

              {/* 4. Numeric Challenge */}
              {challenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      aria-label="Enter percentage drop calculation"
                      value={numericInput}
                      onChange={e => setNumericInput(e.target.value)}
                      placeholder="Enter value"
                      className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm w-44 focus:outline-none focus:border-amber-500"
                    />
                    <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                    <motion.button
                      aria-label="Submit numeric percentage calculation"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={!numericInput || showExplanation}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl font-bold text-xs"
                    >
                      Submit Calculation →
                    </motion.button>
                  </div>
                </div>
              )}

              {/* 5. Construct Challenge */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-amber-300">{challenge.validationHint}</p>
                  {/* Palette */}
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, i) => {
                      const isUsed = constructParts.includes(part);
                      return (
                        <motion.button
                          key={i}
                          aria-label={`Add causal part: ${part}`}
                          whileHover={!isUsed ? { scale: 1.03 } : {}}
                          whileTap={!isUsed ? { scale: 0.97 } : {}}
                          onClick={() => {
                            if (!isUsed) setConstructParts(prev => [...prev, part]);
                          }}
                          disabled={isUsed || showExplanation}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                            isUsed
                              ? 'bg-slate-800/40 text-slate-600 border-slate-800'
                              : 'bg-indigo-950 border-indigo-600 text-indigo-200 hover:bg-indigo-900'
                          }`}
                        >
                          + {part}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Assembled Area */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-3 py-1.5 bg-indigo-800 text-white rounded-lg text-xs font-bold flex items-center gap-2"
                      >
                        <span>{idx + 1}. {part}</span>
                        {!showExplanation && (
                          <button
                            aria-label={`Remove part ${idx + 1}: ${part}`}
                            onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                            className="text-rose-300 hover:text-white"
                          >
                            ✕
                          </button>
                        )}
                      </motion.div>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500">Click parts above in chronological sequence to assemble the chain</span>
                    )}
                  </div>

                  <motion.button
                    aria-label="Validate chronological causal chain sequence"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={constructParts.length === 0 || showExplanation}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl font-bold text-xs"
                  >
                    Validate Causal Chain →
                  </motion.button>
                </div>
              )}

              {/* ─── CLICK-TO-REVEAL STEP-BY-STEP EXPLANATION ─── */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-gradient-to-br from-amber-950/60 to-slate-950 border border-amber-600/50 rounded-2xl space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold text-amber-300 flex items-center gap-1.5">
                      <span>💡</span> Progressive Historical Walkthrough:
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(s => s.trim()).length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {challenge.explanation
                      .split('. ')
                      .filter(s => s.trim().length > 0)
                      .slice(0, revealedSteps + 1)
                      .map((sentence, idx) => (
                        <motion.p
                          key={idx}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-xs md:text-sm text-amber-100 leading-relaxed"
                        >
                          <strong className="text-amber-400 mr-1.5">[{idx + 1}]</strong>
                          {sentence}{!sentence.endsWith('.') && '.'}
                        </motion.p>
                      ))}
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim()).length - 1 ? (
                      <motion.button
                        aria-label="Reveal next sentence of explanation"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setRevealedSteps(s => s + 1)}
                        className="px-4 py-1.5 bg-amber-700/80 hover:bg-amber-600 text-white text-xs font-bold rounded-lg border border-amber-500 shadow-md"
                      >
                        Reveal Next Sentence →
                      </motion.button>
                    ) : (
                      <motion.button
                        aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalize simulation review' : 'Go to next challenge'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-950/80"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Review →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION & SYNTHESIS ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 space-y-6"
          >
            {/* Completion Hero Banner */}
            <div className="p-6 bg-gradient-to-r from-amber-950/60 via-slate-900 to-emerald-950/60 rounded-3xl border border-amber-600/50 text-center space-y-3 shadow-2xl">
              <span className="text-4xl" aria-hidden="true">🏆</span>
              <h2 className="text-2xl md:text-3xl font-black text-white">Simulation Completed!</h2>
              <div className="flex flex-wrap justify-center gap-4 text-xs font-mono mt-2">
                <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-amber-300">
                  Final Score: <strong>{Math.max(0, 100 - errors * 5)}%</strong>
                </span>
                <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-emerald-300">
                  Mastery Level: <strong>{masteryLevel.toUpperCase()}</strong>
                </span>
                <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-indigo-300">
                  Total Challenges: <strong>{filteredChallenges.length}</strong>
                </span>
              </div>
            </div>

            {/* Motivational Feedback Banner (Exact Tier Matching) */}
            <div className={`p-5 rounded-2xl border text-sm flex items-center gap-3 ${
              errors === 0
                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                : errors >= 1 && errors <= 3
                ? 'bg-teal-950/70 border-teal-500 text-teal-200'
                : errors >= 4 && errors <= 7
                ? 'bg-amber-950/70 border-amber-500 text-amber-200'
                : 'bg-rose-950/70 border-rose-500 text-rose-200'
            }`}>
              <span className="text-2xl">
                {errors === 0 ? '🌟' : errors <= 3 ? '✨' : errors <= 7 ? '👍' : '💪'}
              </span>
              <div>
                <strong className="block text-base font-black uppercase tracking-wider">
                  {errors === 0 && 'PERFECT SCORE!'}
                  {errors >= 1 && errors <= 3 && 'Great work!'}
                  {errors >= 4 && errors <= 7 && 'Good effort!'}
                  {errors >= 8 && 'Do not give up — You WILL get this!'}
                </strong>
                <p className="text-xs mt-0.5 opacity-90">
                  {errors === 0 && 'Flawless historical mastery! You answered all analytical and factual questions with zero errors.'}
                  {errors >= 1 && errors <= 3 && 'Splendid performance! You have a strong grasp of the 1850–1916 socio-religious and nationalist transition.'}
                  {errors >= 4 && errors <= 7 && 'Solid foundation established. Review the few missed chronological nuances and explore the sandbox again.'}
                  {errors >= 8 && 'Keep persevering! History is a journey of cause and effect. Review the explanations below and give it another shot.'}
                </p>
              </div>
            </div>

            {/* Misconception Profile */}
            {hitMisconceptions.length > 0 && (
              <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  ⚠️ Your Specific Misconception Diagnosis
                </h4>
                <div className="space-y-2">
                  {hitMisconceptions.map((idx, i) => {
                    const m = misconceptions?.[idx];
                    if (!m) return null;
                    return (
                      <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                        <div className="text-rose-300 font-semibold">✗ Misconception: {m.misconception}</div>
                        <div className="text-emerald-300">✓ Historical Truth: {m.correction}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Reflection Questions */}
            <div className="p-5 bg-indigo-950/40 rounded-2xl border border-indigo-800/50 space-y-2 text-xs text-slate-300">
              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                🤔 Historical Reflection Prompts
              </h4>
              <ul className="space-y-1.5 list-disc pl-5">
                <li>How did Vivekananda’s &ldquo;Daridra Narayana&rdquo; and Phule’s &ldquo;Satyashodhak&rdquo; redefine spirituality as humanitarian action?</li>
                <li>Why was Naoroji’s &ldquo;Drain of Wealth&rdquo; essential in demonstrating that India’s poverty was structurally engineered by colonial policy?</li>
                <li>How did the 1905 Swadeshi boycott foreshadow Mahatma Gandhi’s mass civil disobedience campaigns of the 1920s?</li>
              </ul>
            </div>

            {/* Spaced Repetition SRS Schedule Notice */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <div>
                <strong className="text-amber-400 block mb-0.5">Spaced Repetition (SM-2) Schedule</strong>
                <span>Next active review due in: <strong className="text-white">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong></span>
              </div>
              <span className="text-xl" aria-hidden="true">📅</span>
            </div>

            {/* Real World Activity Synthesis */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <span>✍️</span> {REAL_WORLD_ACTIVITY.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="space-y-1.5 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="text-xs text-slate-400 flex items-start gap-2 bg-slate-950/50 p-2 rounded-lg border border-slate-800">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SIM-ENGINE FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Milestone Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C8_HistoryCivicsSwamiVivekanandaRamakrishnaSim;
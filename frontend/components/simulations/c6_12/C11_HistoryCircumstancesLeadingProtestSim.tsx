'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID CONSTANTS (MANDATORY EXACT MATCHES) ───
const NODE_C11_HIST_011 = 'c11_hist_011';
const NODE_C11_HIST_012 = 'c11_hist_012';
const NODE_C11_HIST_013 = 'c11_hist_013';
const NODE_C11_HIST_014 = 'c11_hist_014';
const NODE_C11_HIST_015 = 'c11_hist_015';
const NODE_C11_HIST_016 = 'c11_hist_016';
const NODE_C11_HIST_017 = 'c11_hist_017';
const NODE_C11_HIST_018 = 'c11_hist_018';
const NODE_C11_HIST_019 = 'c11_hist_019';
const NODE_C11_HIST_020 = 'c11_hist_020';

const ALL_NODE_IDS = [
  NODE_C11_HIST_011,
  NODE_C11_HIST_012,
  NODE_C11_HIST_013,
  NODE_C11_HIST_014,
  NODE_C11_HIST_015,
  NODE_C11_HIST_016,
  NODE_C11_HIST_017,
  NODE_C11_HIST_018,
  NODE_C11_HIST_019,
  NODE_C11_HIST_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Voices of Defiance: Agrarian Revolts to National Resistance (1859–1919)',
  intro: 'You are an archivist and investigative historian reconstructing 60 volatile years of resistance under the British Raj. From Bengal’s blue dye strikes to the red soil of Chota Nagpur, through Curzon’s map carving in 1905, to the draconian Rowlatt Black Act of 1919.',
  context: 'Across ten key historical flashpoints, colonial authorities used four economic engines (revenue rigidity, cash-crop coercion, usurious debt, forest enclosure) and imperial legislation to suppress resistance, while Indians forged innovative mass strategies.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In 1875, angry Kunbi peasants in the Bombay Deccan attacked moneylenders’ houses and burnt their paper account books (bahikhatas). Why did they destroy the papers rather than attacking the British colonial revenue officers directly?',
  options: [
    'They were confused about who collected the government land revenue.',
    'The bahikhatas were the legal instruments of debt bondage; the moneylender was the immediate visible face of coercion created by the rigid Ryotwari tax.',
    'They supported British rule and only disliked local Gujarati and Marwari traders.',
    'Colonial courts had ordered the destruction of all high-interest loan records.',
  ],
  correctIndex: 1,
  hintAfter: 'Let us dive into the archival simulations to see how the colonial fiscal machinery forced peasants into debt and rebellion!',
};

// ─── OBSERVATION QUESTIONS (BRILLIANT.ORG PATTERN) ───
const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_01',
    question: 'Observation 1: Look at the Colonial Tension Index meter while raising Land Revenue Rigidity and Forest Enclosure above 75%. What pattern emerges?',
    observableOptions: [
      'The tension index drops into the peaceful green zone (< 30).',
      'The tension index surges above 75 into the red "Crisis State", demonstrating that combined revenue and forest pressures compounded rural distress.',
      'The moneylender interest rate automatically drops to zero.',
      'Settled ryots benefit while tribal communities remain completely insulated.',
    ],
    correctIndex: 1,
    explanation: 'When the colonial state locked in rigid cash assessments while simultaneously enclosing forest commons, rural survival margins collapsed, creating explosive systemic distress.',
  },
  {
    id: 'obs_02',
    question: 'Observation 2: Examine the Indigo Production chart in Lab 2. Following the 1859 Govindpur strike and the 1860 Commission Report, what visual trend occurs in Bengal production by 1862?',
    observableOptions: [
      'Production doubled as British subsidies increased tenfold.',
      'Output remained perfectly constant across all Bengal districts.',
      'Production steeply plunged from 1.4 million maunds toward zero as ryots refused dadani contracts and planters relocated to Bihar.',
      'Planters immediately gave free land deeds to all peasant cultivators in Nadia.',
    ],
    correctIndex: 2,
    explanation: 'The collective refusal of dadani advances led to the near-total shutdown of commercial indigo planting in Bengal by 1862.',
  },
];

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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 & CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C11_HIST_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which four interlocking structural policies systematically impoverished rural and tribal communities across India between 1859 and 1900?',
    options: [
      'Free trade, salt subsidy, railway nationalisation, and municipal self-rule',
      'Land revenue rigidity, cash-crop coercion, moneylender debt, and forest enclosure',
      'Industrial tariffs, canal construction, temple taxation, and military conscription',
      'Village panchayat decentralisation, artisanal subsidies, zamindari abolition, and grain price controls',
    ],
    correctIndex: 1,
    explanation: 'The four structural colonial causes were land revenue rigidity (Permanent Settlement/Ryotwari), cash-crop coercion (tinkathia), usurious moneylender debt, and forest enclosure (Forest Acts of 1865/1878).',
    hints: [
      'Think about land tax, indigo planting, sowkars, and reserved forests.',
      'Recall the four pressures that led to the Indigo, Deccan, and Munda uprisings.',
      'The combination involves revenue rigidity, cash-crop coercion, moneylender debt, and forest enclosure.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C11_HIST_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each historical uprising to its specific target of protest.',
    dragItems: [
      { label: 'European Indigo Planters', targetId: 't_indigo' },
      { label: 'Marwari & Gujarati Sowkars', targetId: 't_deccan' },
      { label: 'Dikku Landlords & Forest Laws', targetId: 't_munda' },
    ],
    correctMapping: {
      t_indigo: 'European Indigo Planters',
      t_deccan: 'Marwari & Gujarati Sowkars',
      t_munda: 'Dikku Landlords & Forest Laws',
    },
    explanation: 'The Indigo Uprising targeted European planters; the Deccan Riots targeted indigenous moneylenders; the Munda Ulgulan targeted dikku landlords and colonial forest enclosure.',
    hints: [
      'Bengal ryots opposed European factory entrepreneurs.',
      'Bombay Kunbi peasants burnt sowkars’ bahikhatas.',
      'Birsa Munda mobilised adivasis against outsider dikkus and forest enclosures.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C11_HIST_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who initiated the mass refusal to accept indigo planting advances at Govindpur village in Nadia district in March 1859?',
    options: [
      'Sidho and Kanho Murmu',
      'Digambar Biswas and Bishnucharan Biswas',
      'Birsa Munda and Gaya Munda',
      'Surendranath Banerjee and Ananda Mohan Bose',
    ],
    correctIndex: 1,
    explanation: 'Digambar Biswas and Bishnucharan Biswas, former employees of planters at Govindpur in Nadia, sparked the 1859 Indigo strike by refusing the dadani advances.',
    hints: [
      'Look for the two Biswas brothers of Nadia district.',
      'The leaders were from Govindpur village in Bengal.',
      'They are Digambar Biswas and Bishnucharan Biswas.',
    ],
  },
  {
    id: 'ch_04',
    nodeId: NODE_C11_HIST_012,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under tinkathia, a ryot holding 20 bighas must sow 3 bighas with indigo at ₹2.5/bigha, while food grain earns ₹9.0/bigha. How many Rupees of income does the cultivator lose each season on those 3 bighas due to coerced cultivation?',
    correctAnswer: 19.5,
    tolerance: 0.5,
    unit: 'Rupees',
    explanation: '3 bighas of food grain would yield 3 × ₹9.0 = ₹27.0. With indigo, the ryot receives only 3 × ₹2.5 = ₹7.5. Loss = 27.0 - 7.5 = ₹19.5 (or ₹6.5 loss per bigha).',
    hints: [
      'Calculate the return from food grain on 3 bighas: 3 × 9.',
      'Calculate the return from indigo on 3 bighas: 3 × 2.5.',
      'Subtract the indigo revenue (₹7.5) from food crop potential (₹27.0) to get ₹19.5.',
    ],
  },
  {
    id: 'ch_05',
    nodeId: NODE_C11_HIST_012,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What does the prosecution and imprisonment of Rev. James Long for translating Dinabandhu Mitra’s "Nil Darpan" historically prove about the colonial state?',
    options: [
      'The colonial judiciary strictly upheld copyright laws for vernacular plays.',
      'The colonial state initially deployed its institutional legal machinery to shield European planters from public exposure.',
      'Christian missionaries were universally banned from learning Bengali.',
      'The British administration had completely nationalised all indigo factories.',
    ],
    correctIndex: 1,
    explanation: 'Reverend Long was fined ₹1,000 and jailed for 1 month for publishing the English translation of Nil Darpan, proving that the colonial state actively shielded European planters from public criticism.',
    hints: [
      'Why would a colonial court fine and jail a European missionary for translating a Bengali drama?',
      'Consider whose commercial reputation was threatened by the play’s revelations.',
      'It demonstrated governmental complicity in protecting the European planter class.',
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C11_HIST_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Where did the Deccan Riots of May 1875 trigger after a Kunbi cultivator named Babji was assaulted by a sowkar’s agent?',
    options: [
      'Govindpur village in Nadia',
      'Supa village in Bhoom taluka, Poona',
      'Ulihatu village near Ranchi',
      'Chaurichaura near Gorakhpur',
    ],
    correctIndex: 1,
    explanation: 'The Deccan Riots ignited on 12 May 1875 at Supa village, Bhoom taluka in Poona district, spreading to about 30 villages across Poona and Ahmednagar.',
    hints: [
      'It occurred in the Bombay Presidency in Poona district.',
      'The village name begins with S in Bhoom taluka.',
      'The place is Supa village in Poona.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C11_HIST_013,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did Bal Gangadhar Tilak’s newspaper "Mahratta" criticise the Deccan Agriculturists’ Relief Act of 1879 as a deflection?',
    options: [
      'Because it gave excessive tax rebates to wealthy moneylenders.',
      'Because it regulated private credit and conciliation courts while leaving the government’s own rigid Ryotwari cash revenue demand untouched.',
      'Because it abolished all private landholding in Maharashtra.',
      'Because it forced all Kunbi peasants to migrate to industrial cotton mills.',
    ],
    correctIndex: 1,
    explanation: 'Tilak pointed out that by blaming moneylenders and regulating loans without lowering the state’s inflexible Ryotwari tax, the colonial government treated the symptom while sparing the root disease.',
    hints: [
      'Did the 1879 Act reduce the government’s land tax?',
      'Consider what forced cultivators into borrowing in the first place.',
      'The Act regulated moneylenders but preserved the rigid cash revenue assessments.',
    ],
  },
  {
    id: 'ch_08',
    nodeId: NODE_C11_HIST_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What was the traditional Munda communal landholding system that was undermined by dikku outsiders and colonial laws?',
    options: [
      'Ryotwari system',
      'Khuntkatti system',
      'Tinkathia system',
      'Mahalwari system',
    ],
    correctIndex: 1,
    explanation: 'The khuntkatti system was the ancestral communal land system of the Mundas, where land was owned collectively by village lineages rather than individual private owners.',
    hints: [
      'It represents lineage-based collective tribal ownership.',
      'The term is specific to the Munda adivasis of Chota Nagpur.',
      'It is known as the Khuntkatti tenure system.',
    ],
  },
  {
    id: 'ch_09',
    nodeId: NODE_C11_HIST_014,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did the Forest Acts of 1865 and 1878 create a uniquely severe grievance for tribal communities like the Mundas compared to settled peasants?',
    options: [
      'They raised export duties on factory indigo dyes.',
      'They enclosed customary common woodlands, criminalising grazing, fuel collection, and shifting cultivation essential for tribal subsistence.',
      'They compelled tribal youth to attend English-medium universities.',
      'They forced all adivasis to purchase Manchester manufactured textiles.',
    ],
    correctIndex: 1,
    explanation: 'The Forest Acts converted traditional common forests into state-reserved property, outlawing centuries-old customary rights of grazing, gathering, and shifting cultivation.',
    hints: [
      'Tribal livelihood was deeply dependent on open forest commons.',
      'What did state reservation of forests do to customary grazing and fuel collection?',
      'It criminalised daily tribal subsistence activities in their ancestral forests.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_10',
    nodeId: NODE_C11_HIST_015,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order these colonial protest movements and legislative responses chronologically from earliest to latest.',
    sortItems: [
      'Indigo Uprising in Bengal (1859)',
      'Deccan Riots in Poona & Ahmednagar (1875)',
      'Birsa Munda’s Ulgulan in Chota Nagpur (1899–1900)',
      'Enactment of the Chota Nagpur Tenancy Act (1908)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Chronology: Indigo Strike (1859) → Deccan Riots (1875) → Munda Ulgulan (1899–1900) → Chota Nagpur Tenancy Act (1908, enacted 8 years after Birsa’s death).',
    hints: [
      'Start with the 1859 indigo strike led by the Biswas brothers.',
      'The Deccan Riots broke out in 1875 at Supa.',
      'Birsa Munda’s movement peaked in 1899–1900, followed by the 1908 Tenancy Act.',
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C11_HIST_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How do historians such as Eric Stokes characterise colonial acts like the Deccan Relief Act (1879) and Chota Nagpur Tenancy Act (1908)?',
    options: [
      'As genuine philanthropic steps toward self-governing agrarian democracy.',
      'As reactive "safety-valve" concessions designed to defuse acute rebellion while preserving fundamental revenue and forest extraction architectures.',
      'As complete surrenders of British administrative sovereignty to peasant councils.',
      'As measures intended solely to benefit urban industrial factory owners.',
    ],
    correctIndex: 1,
    explanation: 'Stokes framed these statutes as safety valves: minimal concessions released under duress to prevent widespread insurrection without dismantling the structural colonial extraction system.',
    hints: [
      'Did the British reform before or only after violent eruptions?',
      'Did these laws dismantle the revenue system or just offer partial relief?',
      'They were reactive safety valves to preserve the overarching colonial framework.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C11_HIST_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who announced the Partition of Bengal on 19 July 1905, and on what date was it implemented as a day of mourning across Bengal?',
    options: [
      'Lord Hardinge on 12 December 1911',
      'Lord Curzon on 16 October 1905',
      'Lord Minto on 1 October 1906',
      'Lord Canning on 1 November 1858',
    ],
    correctIndex: 1,
    explanation: 'Lord Curzon announced the partition on 19 July 1905 and implemented it on 16 October 1905. (Hardinge annulled it in 1911).',
    hints: [
      'The Viceroy was Lord Curzon.',
      'Implementation took effect in mid-October 1905.',
      '16 October 1905 is the exact implementation date.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_13',
    nodeId: NODE_C11_HIST_016,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What was the nationalist critique of Curzon’s claim that partitioning Bengal was solely for "administrative efficiency"?',
    options: [
      'Nationalists argued Bengal lacked natural geographical river boundaries.',
      'Nationalists demonstrated that the communal boundary was engineered to reduce the Bengali intelligentsia (Bhadralok) to a minority in both provinces and foster communal division.',
      'Nationalists claimed Calcutta needed more industrial textile workers.',
      'Nationalists wanted Bihar and Orissa to become an independent princely state.',
    ],
    correctIndex: 1,
    explanation: 'If administrative convenience was the only goal, division could have followed linguistic lines. Instead, Curzon created a Muslim-majority Eastern Bengal to split the politically active Bengali intelligentsia.',
    hints: [
      'Look at how the boundaries divided religious demographics.',
      'How were the Bengali-speaking Bhadralok affected in both provinces?',
      'It engineered communal divisions to weaken the nationalist vanguard.',
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C11_HIST_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who served as the first principal of the Bengal National College, founded in 1906 under the constructive Swadeshi programme?',
    options: [
      'Rabindranath Tagore',
      'Sri Aurobindo Ghosh',
      'Gopal Krishna Gokhale',
      'Dadabhai Naoroji',
    ],
    correctIndex: 1,
    explanation: 'Sri Aurobindo Ghosh was the first principal of the Bengal National College, set up to provide indigenous, national education independent of British colonial control.',
    hints: [
      'He was a prominent revolutionary-philosopher and nationalist leader.',
      'He later relocated to Pondicherry.',
      'Sri Aurobindo Ghosh is the correct figure.',
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C11_HIST_017,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Build the twin-pillar formula of the 1905 movement by selecting the positive constructive element and negative resistance element.',
    availableParts: ['Swadeshi (Indigenous Industry & National Education)', 'Boycott (Rejecting Manchester Cloth & Liverpool Salt)', 'Armed Coup', 'Submitting Petitions'],
    targetState: 'Swadeshi (Indigenous Industry & National Education) + Boycott (Rejecting Manchester Cloth & Liverpool Salt)',
    validationHint: 'Combine the positive constructive programme with the negative refusal programme.',
    explanation: 'Swadeshi represented the positive constructive programme (indigenous mills, national colleges, self-reliance) while Boycott was the negative refusal programme (rejecting British cloth, salt, sugar).',
    hints: [
      'One part says YES to Indian goods and schools.',
      'One part says NO to British imports like Manchester cloth.',
      'Add Swadeshi followed by Boycott.',
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C11_HIST_017,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which sequence of British repressive statutes and actions crippled the Swadeshi movement between 1907 and 1908?',
    options: [
      'Vernacular Press Act (1878) and Ilbert Bill (1883)',
      'Seditious Meetings Act (1907), Newspapers Act (1908), Criminal Law Amendment Act (1908), and Tilak’s 6-year deportation to Mandalay',
      'Rowlatt Act (1919) and Defence of India Act (1915)',
      'Pitt’s India Act (1784) and Regulating Act (1773)',
    ],
    correctIndex: 1,
    explanation: 'The British crushed the movement using the Seditious Meetings Act (1907), Newspapers Act (1908), Criminal Law Amendment Act (1908), and sentencing Bal Gangadhar Tilak to 6 years in Mandalay Jail in 1908.',
    hints: [
      'Look for the trio of 1907–1908 Acts and Tilak’s exile.',
      'Mandalay deportation occurred in 1908.',
      'The sequence includes Seditious Meetings (1907) and Newspapers/Criminal Law (1908).',
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C11_HIST_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On 30 December 1906, where was the All-India Muslim League formally established, and who was elected its first permanent president?',
    options: [
      'Simla; hosted by Lord Minto with Sir Syed Ahmad Khan as president',
      'Dacca; hosted by Nawab Salimullah Khan with Aga Khan III as first president',
      'Aligarh; hosted by Theodore Beck with MA Jinnah as president',
      'Calcutta; hosted by Dadabhai Naoroji with W.C. Bonnerjee as president',
    ],
    correctIndex: 1,
    explanation: 'The Muslim League was founded on 30 December 1906 at Dacca during the Muhammadan Educational Conference, hosted by Nawab Salimullah Khan, with Aga Khan III as president.',
    hints: [
      'The city is the capital of Eastern Bengal (Dacca).',
      'Nawab Salimullah hosted the session; Aga Khan III was president.',
      'Dacca, Salimullah Khan, and Aga Khan III.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C11_HIST_018,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What was Sir Syed Ahmad Khan’s precise historical connection to the 1906 Muslim League?',
    options: [
      'He personally chaired the Dacca founding meeting in December 1906.',
      'He died in 1898; his role was ideological and institutional through the Aligarh Movement, not direct organisational founding.',
      'He served as the first editor of the Muslim League official gazette in 1909.',
      'He opposed the formation of any separate political platform for Muslims.',
    ],
    correctIndex: 1,
    explanation: 'Sir Syed Ahmad Khan passed away in 1898, eight years before the League was formed. He laid the intellectual framework of educational modernization and political caution, but was not a direct founder.',
    hints: [
      'Check the date of Sir Syed’s death relative to 1906.',
      'He founded MAO College Aligarh in 1875 and died in 1898.',
      'His influence was ideological precursor, not living founder.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_19',
    nodeId: NODE_C11_HIST_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which of the following was explicitly included as the THIRD objective in the Muslim League’s original 1906-07 constitution?',
    options: [
      'The immediate territorial partition of India into independent sovereign states',
      'To prevent the rise among Indian Muslims of any feelings of hostility toward other communities',
      'The complete expulsion of British colonial authorities through armed revolution',
      'The merger of the Muslim League with the Indian National Congress',
    ],
    correctIndex: 1,
    explanation: 'The third objective explicitly urged amity and preventing hostility toward other communities, showing that the 1906 League was loyalist and accommodationist, NOT a separatist body seeking Pakistan.',
    hints: [
      'Did the 1906 charter seek communal violence or communal amity?',
      'The founders wanted to protect rights while avoiding hostility toward other communities.',
      'Objective 3 was to discourage animosity toward other communities.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C11_HIST_019,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Trace the 34-year ideological shift of the Muslim League from its founding in 1906 to the Lahore Resolution in 1940.',
    options: [
      'Started as a socialist workers union and evolved into a religious monastic order.',
      'Started with loyalist constitutionalism seeking minority safeguards within British India (1906) → embraced self-government (1913) & Lucknow Pact cooperation (1916) → shifted to territorial separatism for independent states (1940).',
      'Remained completely static with identical constitutional goals across four decades.',
      'Advocated military alliances with the Ottoman Empire in 1906 before disbanding in 1940.',
    ],
    correctIndex: 1,
    explanation: 'The League evolved from 1906 loyalism seeking safeguards to the 1913 self-government goal, the 1916 Lucknow cooperation with Congress, and finally the 1940 Lahore demand for separate sovereign states.',
    hints: [
      'Notice the milestones: 1906 (Loyalism) → 1913 (Self-Gov) → 1916 (Lucknow Pact) → 1940 (Lahore Resolution).',
      'The Pakistan demand was formulated 34 years after its founding.',
      'It transitioned from loyal constitutionalism to territorial separatism.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C11_HIST_020,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did Indians brand the Rowlatt Act (March 1919) the "Black Act" and find it far more offensive than the wartime Defence of India Act (1915)?',
    options: [
      'Because it required all Indian citizens to pay double railway fares.',
      'Because the 1915 Act was an accepted temporary wartime emergency measure, whereas the 1919 Act made draconian detention without trial and no-jury trials permanent in peacetime after Indians had supported the war effort.',
      'Because it ordered the immediate dissolution of the Indian army.',
      'Because it granted automatic self-government only to Europeans.',
    ],
    correctIndex: 1,
    explanation: 'The Defence of India Act (1915) had a sunset clause for wartime. The Rowlatt Act made detention without trial up to 2 years permanent in peacetime, betraying the Montagu Declaration’s promise of reform.',
    hints: [
      'Think about wartime temporary sacrifice vs peacetime permanent law.',
      'Consider the Indian contribution to World War I and the expectation of constitutional reward.',
      'It made emergency powers permanent in peacetime, violating habeas corpus.',
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C11_HIST_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How did prominent Indian leaders in the Imperial Legislative Council — including MA Jinnah, Madan Mohan Malaviya, and Mazhar-ul-Haq — respond when the official British majority pushed through the Rowlatt Bill?',
    options: [
      'They voted in favour after receiving ministerial appointments.',
      'They unanimously voted against the bill and resigned their Council seats in protest, exposing constitutional representation as a sham.',
      'They appealed to the League of Nations for military intervention.',
      'They called off all public strikes and accepted the law.',
    ],
    correctIndex: 1,
    explanation: 'Every single non-official Indian member opposed the Rowlatt Bill. When the official European majority passed it regardless, Jinnah, Malaviya, and Mazhar-ul-Haq resigned their seats in protest.',
    hints: [
      'Did Indian leaders support the Rowlatt Act or oppose it unanimously?',
      'Key constitutionalists resigned their legislative seats.',
      'They unanimously opposed the Bill and resigned in protest.',
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

// ─── DEFAULT PROPS WITH RICH ENRICHMENT ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_HIST_011,
  title: 'Circumstances Leading to Protest Movements (1859–1919)',
  definition: 'A historical sequence of agrarian, tribal, and nationalist protest movements triggered by colonial land revenue rigidity, cash-crop coercion, usurious moneylender debt, forest enclosure, territorial partition, and peacetime repressive legislation.',
  eli5: 'When British rules forced farmers to grow blue dye for pennies, charged taxes during droughts, fenced off tribal forests, and divided provinces along religious lines, ordinary people fought back through strikes, book burnings, boycotts, and mass satyagraha.',
  misconceptions: [
    {
      misconception: 'All peasant and tribal uprisings between 1859 and 1900 were part of an organised nationalist freedom struggle.',
      correction: 'They were localised, restorative economic protests against specific exploiters (planters, sowkars, dikkus), occurring before the Indian National Congress developed mass reach.',
    },
    {
      misconception: 'The Deccan Riots of 1875 were an armed revolt directly attacking British colonial army garrisons.',
      correction: 'Kunbi cultivators targeted Indian Marwari and Gujarati moneylenders (sowkars), burning loan account books (bahikhatas) created under the rigid Ryotwari system.',
    },
    {
      misconception: 'The Munda Uprising was identical to settled peasant revolts with no distinct tribal dimension.',
      correction: 'The Ulgulan was distinct because it fought against the enclosure of customary forests under the 1865/1878 Forest Acts and destruction of the communal khuntkatti system.',
    },
    {
      misconception: 'The Partition of Bengal in 1905 was purely an administrative reform with no political motive.',
      correction: 'The boundary was deliberately drawn to split the politically active Bengali intelligentsia and create a Muslim-majority Eastern Bengal as a counterweight.',
    },
    {
      misconception: 'Sir Syed Ahmad Khan personally established the Muslim League at Dacca in 1906.',
      correction: 'Sir Syed died in 1898; while his Aligarh Movement laid the intellectual foundation, the League was founded by Nawab Salimullah and Aga Khan III in 1906.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which rate did European indigo planters pay ryots compared to open-market food grains in 1859?',
      options: ['₹2.5/bigha vs ₹8-10/bigha for food grains', '₹15/bigha vs ₹5/bigha for food grains', '₹50/bigha with free seeds', 'Equal payment with bonus subsidies'],
      correctIndex: 0,
    },
    {
      question: 'What was the primary peasant tactic during the 1875 Deccan Riots?',
      options: ['Bombing railway junctions', 'Burning moneylenders’ debt account books (bahikhatas)', 'Refusing to board British ships', 'Petitions to the Privy Council in London'],
      correctIndex: 1,
    },
    {
      question: 'What does Birsa Munda’s movement name "Ulgulan" translate to?',
      options: ['The Great Tumult', 'The Sacred Silence', 'The Salt March', 'The Golden Age'],
      correctIndex: 0,
    },
    {
      question: 'The Chota Nagpur Tenancy Act of 1908 was passed how many years after Birsa Munda’s death?',
      options: ['1 year', '4 years', '8 years', '25 years'],
      correctIndex: 2,
    },
    {
      question: 'Which cultural protest did Rabindranath Tagore organise on 16 October 1905?',
      options: ['Burning foreign cloth at Town Hall', 'Hindus and Muslims tying Rakhis on wrists to pledge unity', 'Satyagraha fast at Sabarmati', 'Boycott of postal stamps'],
      correctIndex: 1,
    },
    {
      question: 'What were the twin pillars of the 1905 anti-partition agitation?',
      options: ['Non-cooperation & Khilafat', 'Swadeshi (constructive) & Boycott (refusal)', 'Home Rule & Dominion Status', 'Civil Disobedience & Round Table'],
      correctIndex: 1,
    },
    {
      question: 'Where was the Simla Deputation presented to Viceroy Lord Minto in October 1906?',
      options: ['Viceregal Lodge, Simla', 'Town Hall, Calcutta', 'Red Fort, Delhi', 'Dacca University'],
      correctIndex: 0,
    },
    {
      question: 'What was the official statutory name of the Rowlatt Act passed in March 1919?',
      options: ['The Indian Councils Act', 'The Anarchical and Revolutionary Crimes Act of 1919', 'The Defence of the Realm Act', 'The Sedition Regulation Statute'],
      correctIndex: 1,
    },
  ],
  masteryCriteria: 'Demonstrates deep analytical understanding of agrarian revolts (1859-1900), the Partition of Bengal and Swadeshi movement (1905-1908), the origin of the Muslim League (1906), and the Rowlatt Act crisis (1919).',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Four Pillars of Agrarian Pressure',
    instruction: 'Adjust the colonial extraction sliders below to see how revenue rigidity and forest enclosure spark peasant distress.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_HIST_011,
  },
  {
    title: 'Lab 2: Indigo Tinkathia & Govindpur Flashpoint (1859)',
    instruction: 'Inspect the dadani debt trap and historical production collapse after the 1859 strike.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C11_HIST_012,
  },
  {
    title: 'Lab 3: Deccan Debt & The Bahikhata Bonfire (1875)',
    instruction: 'Examine the structural cycle of the Ryotwari debt trap that forced the burning of loan documents.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_HIST_013,
  },
  {
    title: 'Lab 4: Curzon’s 1905 Partition & The Rakhi Line',
    instruction: 'Interact with the communal demography map to see Western Bengal vs Eastern Bengal & Assam.',
    interactionType: 'drag-position',
    nodeId: NODE_C11_HIST_016,
  },
  {
    title: 'Lab 5: The 1919 Rowlatt Act Constitutional Rupture',
    instruction: 'Toggle between wartime emergency powers (1915) and peacetime permanent detention (1919) to observe Council resignations.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_HIST_020,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'If monsoon rains fail in the Bombay Deccan under the Ryotwari system, what happens to the cultivator’s land tax demand?',
    options: [
      'It is automatically halved by the District Collector.',
      'It remains 100% fixed in cash, forcing the cultivator to borrow from the sowkar.',
      'The government pays a food grain compensation bonus.',
      'Cultivators are exempted from taxes for three years.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the rainfall slider in Lab 1 to see revenue demand stay locked while debt skyrockets!',
    nodeId: NODE_C11_HIST_013,
  },
  {
    question: 'Predict: What happened to Bengal indigo production after the 1860 Indigo Commission report admitted planter coercion?',
    options: [
      'Output doubled as British subsidies increased.',
      'Production in Bengal collapsed from 1.4 million maunds to near zero as planters relocated to Bihar.',
      'Planters immediately gave full land ownership to all ryots.',
      'The British government nationalised all indigo plantations in Bengal.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Examine the historical production graph in Lab 2 to verify the crash to near-zero by 1862.',
    nodeId: NODE_C11_HIST_012,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Investigative Archival Dossier: The Legacy of Resistance',
  description: 'Connect historical protest templates to constitutional freedoms and agrarian policies in modern India.',
  steps: [
    'Trace how the 1859 Indigo strike inspired Gandhi’s first Satyagraha in Champaran (1917).',
    'Examine how the 1908 Chota Nagpur Tenancy Act became the legal cornerstone for adivasi land rights leading to the creation of Jharkhand state in 2000.',
    'Compare the draconian terms of the 1919 Rowlatt Act with Article 21 and 22 (Protection against arbitrary arrest) in the Indian Constitution of 1950.',
    'Draft a 3-point briefing note evaluating why non-cooperation and boycott remain potent protest strategies in modern civil society.',
  ],
};

// ─── MAIN COMPONENT ───
function C11_HistoryCircumstancesLeadingProtestSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  onComplete,
}: Props) {
  // ─── PHASE FLOW ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ─── BRILLIANT PATTERN STATES ───
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionVerified, setPredictionVerified] = useState(false);

  // ─── OBSERVATION STATES ───
  const [selectedObsAnswers, setSelectedObsAnswers] = useState<Record<string, number>>({});
  const [obsFeedback, setObsFeedback] = useState<Record<string, boolean>>({});

  // ─── SIMULATION VARIABLE SLIDERS (5+ INTERACTIVE CONTROLS) ───
  const [revenueRigidity, setRevenueRigidity] = useState(85);
  const [cashCropCoercion, setCashCropCoercion] = useState(75);
  const [moneylenderInterest, setMoneylenderInterest] = useState(40);
  const [forestEnclosure, setForestEnclosure] = useState(80);

  // ─── INTERACTIVE MAP & EXPLORATION STATES ───
  const [selectedMapRegion, setSelectedMapRegion] = useState<'bengal' | 'deccan' | 'chotanagpur' | 'punjab'>('bengal');

  // ─── ADAPTIVE BKT & DIFFICULTY ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── ESCALATING HINTS & REVEAL ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ─── DRAG & CONSTRUCT CHALLENGE STATES ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── DISCOVERY HOOK STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ─── FEEDBACK & ANIMATIONS ───
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // ─── MISCONCEPTION TRACKING ───
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── PERSISTENT REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineGsapRef = useRef<HTMLDivElement | null>(null);

  const subjectConfig = SUBJECT_CONFIG['history'] || { name: 'History', emoji: '📜', color: 'amber' };

  // ─── DERIVED CALCULATIONS: AGRARIAN DISTRESS INDEX ───
  const agrarianDistressIndex = useMemo(() => {
    return Math.round((revenueRigidity * 0.35) + (cashCropCoercion * 0.25) + (moneylenderInterest * 0.2) + (forestEnclosure * 0.2));
  }, [revenueRigidity, cashCropCoercion, moneylenderInterest, forestEnclosure]);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeObj = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT: LOAD EXISTING MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE MASTERY EFFECT ───
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

  // ─── GSAP TIMELINE ANIMATION EFFECT ───
  useEffect(() => {
    if (timelineGsapRef.current && phase === 'explore') {
      gsap.fromTo(
        timelineGsapRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [currentSlide, phase]);

  // ─── CANVAS PARTICLE & SPARKLE ANIMATION EFFECT ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 5) {
        const y = 20 + Math.sin(x * 0.05 + t) * 6 + (agrarianDistressIndex * 0.1);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const orbX = canvas.width - 30;
      const orbY = 20;
      const radius = 6 + Math.sin(t * 2) * 2;
      ctx.beginPath();
      ctx.arc(orbX, orbY, radius, 0, Math.PI * 2);
      ctx.fillStyle = agrarianDistressIndex > 70 ? '#ef4444' : agrarianDistressIndex > 40 ? '#f59e0b' : '#10b981';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [agrarianDistressIndex]);

  // ─── EXTRACTED MEMOISED HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLvl = hintCount + 1;
    if (nextLvl <= 3 && currentChallengeObj.hints[nextLvl - 1]) {
      const hintText = currentChallengeObj.hints[nextLvl - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLvl);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLvl}: ${hintText}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, currentChallengeObj]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding observation! The debt records were the legal chains.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleObservationSelect = useCallback((obsId: string, optIndex: number, correctIdx: number) => {
    const isCorrect = optIndex === correctIdx;
    setSelectedObsAnswers(prev => ({ ...prev, [obsId]: optIndex }));
    setObsFeedback(prev => ({ ...prev, [obsId]: isCorrect }));
    audioManager.play(isCorrect ? 'success' : 'drop-wrong');
    speechManager.speak(isCorrect ? 'Correct observation! You spotted the key historical indicator.' : 'Examine the visualization and metrics closely.');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Entering historical laboratory. Explore the visual mechanisms of protest.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Manipulate the historical levers.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge phase begun. Test your historical analysis and mastery.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded. Now test the simulation sliders to verify!');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Investigation complete! You scored ${finalScore} percent.`);
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

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (currentChallengeObj.type === 'classify' || currentChallengeObj.type === 'distinguish' || currentChallengeObj.type === 'match') {
      isCorrect = answer === currentChallengeObj.correctIndex;
    } else if (currentChallengeObj.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeObj.correctMapping);
    } else if (currentChallengeObj.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeObj.correctOrder);
    } else if (currentChallengeObj.type === 'numeric') {
      const val = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(val - (currentChallengeObj.correctAnswer || 0)) <= (currentChallengeObj.tolerance || 0);
    } else if (currentChallengeObj.type === 'construct') {
      isCorrect = answer === currentChallengeObj.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Precisely analysed! That is historically accurate.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(currentChallengeObj.nodeId, currentChallengeObj.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${currentChallengeObj.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${currentChallengeObj.nodeId}`, JSON.stringify({ score: 100, timestamp: Date.now() }));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (currentChallengeObj.misconceptionIndex !== undefined && !hitMisconceptions.includes(currentChallengeObj.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, currentChallengeObj.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Review the historical evidence in the explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(currentChallengeObj.nodeId, currentChallengeObj.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${currentChallengeObj.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [currentChallengeObj, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = currentChallengeObj.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
    }
    setDraggedItem(null);
  }, [draggedItem, currentChallengeObj]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === 0 && currentChallengeObj.sortItems ? currentChallengeObj.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [currentChallengeObj]);

  const handleRegionSelect = useCallback((region: 'bengal' | 'deccan' | 'chotanagpur' | 'punjab') => {
    setSelectedMapRegion(region);
    audioManager.play('tap');
    const regionNames: Record<string, string> = {
      bengal: 'Bengal Presidency: Nadia & Pabna Indigo Strike (1859), Partition (1905)',
      deccan: 'Bombay Deccan: Poona & Ahmednagar Riots at Supa (1875)',
      chotanagpur: 'Chota Nagpur Plateau: Birsa Munda’s Ulgulan & Khuntkatti Restoration (1899–1900)',
      punjab: 'Punjab & Imperial Council: Rowlatt Act & Opposition by Jinnah & Malaviya (1919)',
    };
    speechManager.speak(regionNames[region] || '');
  }, []);

  // ���── CLEANUP ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 pb-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4"
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
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400">Class 11 ISC History</span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs font-semibold text-slate-400">Protest Movements (1859–1919)</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Status Pill & Difficulty Badge */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 flex items-center gap-2 text-xs">
            <span className="text-slate-400">Mastery:</span>
            <span className="font-bold text-amber-400 uppercase">{masteryLevel}</span>
          </div>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-700'
                : 'bg-amber-950/60 text-amber-400 border-amber-700'
            }`}
          >
            {difficulty}
          </motion.span>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-600/30 shadow-lg">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🏛️</span>
              <span>Archival Case Investigation</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">{SCENARIO.intro}</p>
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-amber-300/90 leading-relaxed">
              <strong>Historical Context:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold uppercase">
                Curiosity Hook • Pre-Lab Observation
              </span>
              <span className="text-xs text-slate-400">Not Graded</span>
            </div>
            <p className="text-base md:text-lg font-medium text-white leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-amber-500/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="leading-relaxed">{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! The bahikhata documents were the legal weapon of debt dispossession.'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/20"
                >
                  Enter Historical Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {EXPLORATION_STEPS.map((step, idx) => (
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
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Lab {idx + 1}
                </motion.button>
              ))}
            </div>
            <div className="text-xs text-slate-400 font-medium">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Interactive Investigation
                </span>
                <h2 className="text-xl md:text-2xl font-black text-white mt-1">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h2>
                <p className="text-sm text-amber-300/90 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* DYNAMIC CANVAS TENSION DISPLAY */}
              <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 overflow-hidden">
                <canvas ref={canvasRef} width={600} height={40} className="w-full h-10 block" />
                <div className="flex items-center justify-between text-xs text-slate-400 mt-2 px-1">
                  <span>Colonial Agrarian Tension Index:</span>
                  <span className={`font-bold ${agrarianDistressIndex > 70 ? 'text-rose-400' : 'text-amber-400'}`}>
                    {agrarianDistressIndex} / 100 ({agrarianDistressIndex > 70 ? 'Crisis State' : 'High Friction'})
                  </span>
                </div>
              </div>

              {/* ── LAB 1: 4 COLONIAL MECHANISMS (c11_hist_011) ── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4 p-5 bg-slate-950/60 rounded-2xl border border-slate-800">
                    <h3 className="text-sm font-bold text-slate-200">Colonial Extraction Controls</h3>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Land Revenue Rigidity (Ryotwari/Permanent):</span>
                        <span className="text-amber-400 font-bold">{revenueRigidity}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={revenueRigidity}
                        onChange={e => {
                          setRevenueRigidity(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-amber-500"
                        aria-label="Set Land Revenue Rigidity"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Cash-Crop Coercion (Tinkathia 3/20th):</span>
                        <span className="text-blue-400 font-bold">{cashCropCoercion}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={cashCropCoercion}
                        onChange={e => {
                          setCashCropCoercion(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-blue-500"
                        aria-label="Set Cash Crop Coercion"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Sowkar Moneylender Interest Rate:</span>
                        <span className="text-rose-400 font-bold">{moneylenderInterest}% / yr</span>
                      </div>
                      <input
                        type="range"
                        min={25}
                        max={50}
                        value={moneylenderInterest}
                        onChange={e => {
                          setMoneylenderInterest(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-rose-500"
                        aria-label="Set Moneylender Interest"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Forest Enclosure (Acts 1865/1878):</span>
                        <span className="text-emerald-400 font-bold">{forestEnclosure}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={forestEnclosure}
                        onChange={e => {
                          setForestEnclosure(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500"
                        aria-label="Set Forest Enclosure"
                      />
                    </div>
                  </div>

                  <div className="p-5 bg-slate-950/60 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-200 mb-2">Real-Time Community Impact</h3>
                      <div className="space-y-2.5">
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                          <span className="text-xs text-slate-300">Settled Ryots (Bengal / Deccan):</span>
                          <span className="text-xs font-bold text-amber-400">
                            {revenueRigidity > 70 ? 'Land Mortgaged to Sowkar (80%)' : 'Subsistence Surviving'}
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                          <span className="text-xs text-slate-300">Indigo Cultivators:</span>
                          <span className="text-xs font-bold text-blue-400">
                            {cashCropCoercion > 50 ? 'Dadani Debt Trap Locked' : 'Free Grain Sowing'}
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                          <span className="text-xs text-slate-300">Adivasi Tribals (Munda):</span>
                          <span className="text-xs font-bold text-emerald-400">
                            {forestEnclosure > 60 ? 'Customary Grazing Criminalised' : 'Khuntkatti Intact'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/50 text-xs text-amber-200 mt-4">
                      <strong>Historical Rule:</strong> Protests were restorative economic responses to four specific colonial engines, not unified national rebellions.
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 2: INDIGO UPRISING (SVG 1: BENGAL INDIGO GRAPH) ── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 rounded-2xl bg-slate-950 border border-amber-600/30">
                      <p className="text-sm font-bold text-white mb-2">{PREDICTION_QUESTIONS[1].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="text-left p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && !predictionVerified && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-3 bg-emerald-950/40 border border-emerald-700 rounded-xl flex items-center justify-between"
                    >
                      <span className="text-xs text-emerald-300">{PREDICTION_QUESTIONS[1].verifyInstruction}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setPredictionVerified(true);
                          audioManager.play('success');
                        }}
                        className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                      >
                        Verify Production Data ✓
                      </motion.button>
                    </motion.div>
                  )}

                  {/* SVG 1: INDIGO COLLAPSE */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 col-span-2">
                      <h4 className="text-xs font-bold text-slate-300 mb-2">SVG 1 • Bengal Indigo Production Crash (1859–1862)</h4>
                      <svg viewBox="0 0 450 160" className="w-full bg-slate-900 rounded-xl p-2">
                        <line x1="40" y1="20" x2="40" y2="130" stroke="#334155" strokeWidth="1" />
                        <line x1="40" y1="130" x2="420" y2="130" stroke="#334155" strokeWidth="1" />
                        <text x="15" y="30" fill="#94a3b8" fontSize="9">1.4M</text>
                        <text x="15" y="80" fill="#94a3b8" fontSize="9">0.7M</text>
                        <text x="25" y="130" fill="#94a3b8" fontSize="9">0</text>
                        <text x="70" y="145" fill="#94a3b8" fontSize="9">1859 (Strike)</text>
                        <text x="180" y="145" fill="#94a3b8" fontSize="9">1860 (Commission)</text>
                        <text x="310" y="145" fill="#94a3b8" fontSize="9">1862 (Collapse)</text>
                        <text x="380" y="145" fill="#94a3b8" fontSize="9">1917 (Bihar)</text>
                        <motion.path
                          d="M 80 30 Q 150 40 200 90 T 330 128 L 400 125"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="3"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5 }}
                        />
                        <circle cx="80" cy="30" r="5" fill="#f59e0b" />
                        <circle cx="200" cy="90" r="5" fill="#38bdf8" />
                        <circle cx="330" cy="128" r="5" fill="#ef4444" />
                        <circle cx="400" cy="125" r="5" fill="#10b981" />
                      </svg>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                          <span>⚖️</span>
                          <span>Archival Evidence (1860)</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1">Rev. James Long’s Trial</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Long was fined ₹1,000 & imprisoned for 1 month for translating Dinabandhu Mitra’s <em>Nil Darpan</em>.
                        </p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-400 mt-3">
                        <strong>Analytical Insight:</strong> Proves the colonial judiciary initially shielded private European planters from exposure.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: DECCAN RIOTS (SVG 2: RYOTWARI DEBT CYCLE) ── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-sm font-bold text-white">Supa Village Ignition (12 May 1875)</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      After Kunbi cultivator Babji was assaulted by a sowkar’s agent, peasants across 30 villages targeted the <strong>bahikhatas</strong> (account books) that legally bound them.
                    </p>

                    {/* SVG 2: DEBT CYCLE DIAGRAM */}
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <div className="text-[11px] font-bold text-amber-400 mb-1">SVG 2 • Deccan Ryotwari Debt Cycle</div>
                      <svg viewBox="0 0 320 120" className="w-full">
                        <rect x="10" y="10" width="80" height="40" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                        <text x="50" y="28" fill="#f8fafc" fontSize="8" textAnchor="middle" fontWeight="bold">Rigid Cash Tax</text>
                        <text x="50" y="40" fill="#94a3b8" fontSize="7" textAnchor="middle">(Ryotwari)</text>

                        <path d="M 90 30 L 120 30" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />

                        <rect x="120" y="10" width="85" height="40" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
                        <text x="162" y="28" fill="#f8fafc" fontSize="8" textAnchor="middle" fontWeight="bold">Sowkar Loan</text>
                        <text x="162" y="40" fill="#f87171" fontSize="7" textAnchor="middle">25-50% Interest</text>

                        <path d="M 205 30 L 235 30" stroke="#ef4444" strokeWidth="2" />

                        <rect x="235" y="10" width="75" height="40" rx="8" fill="#1e293b" stroke="#ec4899" strokeWidth="1.5" />
                        <text x="272" y="28" fill="#f8fafc" fontSize="8" textAnchor="middle" fontWeight="bold">Bahikhata</text>
                        <text x="272" y="40" fill="#f472b6" fontSize="7" textAnchor="middle">Bondage</text>

                        {/* Return arrow showing revolt */}
                        <path d="M 272 50 L 272 95 L 162 95" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 2" />
                        <rect x="110" y="80" width="105" height="30" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
                        <text x="162" y="98" fill="#fef2f2" fontSize="8" textAnchor="middle" fontWeight="bold">1875 Bonfire Revolt 🔥</text>
                      </svg>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        audioManager.play('pop');
                        speechManager.speak('Bahikhatas destroyed. Symbolic dissolution of debt bondage.');
                      }}
                      className="w-full py-2.5 bg-gradient-to-r from-rose-600 to-amber-600 rounded-xl text-white font-bold text-xs shadow-md"
                    >
                      Simulate Bahikhata Bonfire 🔥
                    </motion.button>
                  </div>

                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-amber-400 uppercase mb-1">Source Excerpt Analysis</div>
                      <h4 className="text-sm font-bold text-white mb-2">Tilak’s Mahratta Critique (1879 Act)</h4>
                      <blockquote className="p-3 bg-slate-900 rounded-xl border-l-4 border-amber-500 text-xs text-slate-300 italic leading-relaxed">
                        "The government blames the sowkar for greed, but who drove the cultivator to his door? The rigid cash revenue demand is the engine. Regulating the lender while leaving the tax untouched spares the disease."
                      </blockquote>
                    </div>
                    <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-amber-300/90 mt-3">
                      <strong>Exam Takeaway:</strong> The Deccan Agriculturists’ Relief Act (1879) created conciliation courts but did NOT lower land revenue.
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: BENGAL PARTITION (SVG 3: SPATIAL PARTITION & RAKHI) ── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* SVG 3: PARTITION OF BENGAL 1905 SPATIAL MAP */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 col-span-1 md:col-span-2">
                      <h4 className="text-xs font-bold text-slate-300 mb-2">SVG 3 • Curzon’s 1905 Communal Partition & The Rakhi Line</h4>
                      <svg viewBox="0 0 500 130" className="w-full bg-slate-900 rounded-xl p-2">
                        {/* West Bengal Box */}
                        <rect x="20" y="15" width="200" height="95" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                        <text x="120" y="40" fill="#fbbf24" fontSize="12" textAnchor="middle" fontWeight="bold">Western Bengal</text>
                        <text x="120" y="60" fill="#cbd5e1" fontSize="9" textAnchor="middle">Calcutta (Capital)</text>
                        <text x="120" y="78" fill="#94a3b8" fontSize="8" textAnchor="middle">Hindu: 42M (78%) | Muslim: 9M</text>
                        <text x="120" y="94" fill="#f59e0b" fontSize="8" textAnchor="middle">Bengali reduced to minority (17M)</text>

                        {/* Partition Dividing Line */}
                        <line x1="240" y1="10" x2="240" y2="120" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 3" />
                        <circle cx="240" cy="65" r="14" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
                        <text x="240" y="69" fill="#ffffff" fontSize="10" textAnchor="middle">🤝</text>
                        <text x="240" y="125" fill="#f87171" fontSize="7" textAnchor="middle" fontWeight="bold">Rakhi Line (16 Oct 1905)</text>

                        {/* East Bengal Box */}
                        <rect x="260" y="15" width="220" height="95" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="370" y="40" fill="#38bdf8" fontSize="12" textAnchor="middle" fontWeight="bold">Eastern Bengal & Assam</text>
                        <text x="370" y="60" fill="#cbd5e1" fontSize="9" textAnchor="middle">Dacca (Capital)</text>
                        <text x="370" y="78" fill="#94a3b8" fontSize="8" textAnchor="middle">Muslim: 18M (60%) | Hindu: 12M</text>
                        <text x="370" y="94" fill="#38bdf8" fontSize="8" textAnchor="middle">Counterpoise created by Curzon</text>
                      </svg>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold text-slate-300">Western Bengal</h4>
                        <span className="text-xs text-amber-400 font-bold">Capital: Calcutta</span>
                      </div>
                      <p className="text-xs text-slate-400 mb-3">Comprised West Bengal, Bihar, Orissa & Chota Nagpur (54M pop).</p>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden flex">
                        <div className="h-full bg-amber-500" style={{ width: '78%' }} />
                        <div className="h-full bg-blue-500" style={{ width: '22%' }} />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>Hindu Majority: 78%</span>
                        <span>Muslim: 22%</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold text-slate-300">Eastern Bengal & Assam</h4>
                        <span className="text-xs text-blue-400 font-bold">Capital: Dacca</span>
                      </div>
                      <p className="text-xs text-slate-400 mb-3">Comprised East Bengal & Assam (31M pop). Curzon toured Dacca in 1904.</p>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden flex">
                        <div className="h-full bg-blue-500" style={{ width: '60%' }} />
                        <div className="h-full bg-amber-500" style={{ width: '40%' }} />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>Muslim Majority: 60%</span>
                        <span>Hindu: 40%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                      Twin Pillars: Swadeshi (Positive) + Boycott (Negative)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-emerald-950/40 border border-emerald-700/50 rounded-xl text-xs space-y-1">
                        <div className="font-bold text-emerald-300">✓ Positive / Constructive (Swadeshi)</div>
                        <p className="text-slate-300">• Bengal National College (1906, Aurobindo Ghosh)</p>
                        <p className="text-slate-300">• Indigenous textile mills, soap, matches, pottery</p>
                        <p className="text-slate-300">• Atmasakti (Self-reliance) & National Education</p>
                      </div>
                      <div className="p-3 bg-rose-950/40 border border-rose-700/50 rounded-xl text-xs space-y-1">
                        <div className="font-bold text-rose-300">✗ Negative / Refusal (Boycott)</div>
                        <p className="text-slate-300">• Refusal of Manchester cotton textiles</p>
                        <p className="text-slate-300">• Boycott of Liverpool salt</p>
                        <p className="text-slate-300">• Rejection of British-refined sugar</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 5: ROWLATT ACT (c11_hist_020) ── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">The "Black Act" Comparison (1915 vs 1919)</h3>
                      <span className="px-2.5 py-1 bg-rose-500/20 text-rose-400 rounded-lg text-xs font-bold">
                        Betrayal of Wartime Loyalty
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                        <div className="font-bold text-slate-300 mb-1">Defence of India Act (1915)</div>
                        <p className="text-slate-400">• Passed during World War I</p>
                        <p className="text-slate-400">• Temporary emergency measure</p>
                        <p className="text-slate-400">• Sunset clause: expire 6 months post-war</p>
                      </div>
                      <div className="p-3 bg-rose-950/50 rounded-xl border border-rose-600">
                        <div className="font-bold text-rose-300 mb-1">Rowlatt Act (March 1919)</div>
                        <p className="text-rose-200">• Passed in peacetime after WW1</p>
                        <p className="text-rose-200">• Permanent detention without trial up to 2 yrs</p>
                        <p className="text-rose-200">• Special 3-judge benches without jury</p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-amber-400 mb-1">Imperial Legislative Council Protest</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Every non-official Indian member voted against the bill. When the British majority forced it through, <strong>Mohammed Ali Jinnah, Madan Mohan Malaviya, and Mazhar-ul-Haq</strong> resigned their seats.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── BRILLIANT.ORG OBSERVATION QUESTIONS SECTION ─── */}
              <div className="p-5 bg-slate-950/80 rounded-2xl border border-amber-500/30 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <span>🔍</span>
                  <span>Observation Check (What Do You Notice?)</span>
                </div>

                <div className="space-y-4">
                  {OBSERVATION_QUESTIONS.map((obs) => {
                    const answered = selectedObsAnswers[obs.id] !== undefined;
                    const isCorrect = obsFeedback[obs.id];

                    return (
                      <div key={obs.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                        <p className="text-xs md:text-sm font-semibold text-slate-200">{obs.question}</p>
                        <div className="grid grid-cols-1 gap-2">
                          {obs.observableOptions.map((optionText, optIdx) => (
                            <button
                              key={optIdx}
                              onClick={() => handleObservationSelect(obs.id, optIdx, obs.correctIndex)}
                              className={`w-full text-left p-3 rounded-lg text-xs transition-all border ${
                                answered && selectedObsAnswers[obs.id] === optIdx
                                  ? isCorrect
                                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                                    : 'bg-rose-950/80 border-rose-500 text-rose-200'
                                  : 'bg-slate-950 hover:bg-slate-800 border-slate-700 text-slate-300'
                              }`}
                            >
                              <div className="flex items-start gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{optionText}</span>
                              </div>
                            </button>
                          ))}
                        </div>

                        {answered && (
                          <div className={`p-2.5 rounded-lg text-xs ${isCorrect ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-700' : 'bg-amber-950/50 text-amber-300 border border-amber-700'}`}>
                            {isCorrect ? '✓ Spot-on observation!' : '💡 Look closely:'} {obs.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentSlide === 0}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white disabled:opacity-40 text-xs font-bold"
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
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-slate-950 text-xs font-black shadow-lg"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX (NO PRESSURE) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-white">Historical Sandbox: Free Exploration</h2>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold">
                Ungraded • Free Play
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-300">
              Manipulate colonial policy levers and observe regional flashpoints on the interactive historical map.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'bengal', label: 'Bengal (1859 / 1905)', icon: '🌱' },
              { id: 'deccan', label: 'Bombay Deccan (1875)', icon: '📜' },
              { id: 'chotanagpur', label: 'Chota Nagpur (1899)', icon: '🏹' },
              { id: 'punjab', label: 'Imperial / Punjab (1919)', icon: '⚖️' },
            ].map(r => (
              <motion.button
                key={r.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRegionSelect(r.id as 'bengal' | 'deccan' | 'chotanagpur' | 'punjab')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  selectedMapRegion === r.id
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-lg mb-1">{r.icon}</div>
                <div className="text-xs font-bold">{r.label}</div>
              </motion.button>
            ))}
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">Agrarian Pressure Sliders</h3>
              <div>
                <label className="text-xs text-slate-400 flex justify-between mb-1">
                  <span>Revenue Extraction Severity:</span>
                  <span className="text-amber-400 font-bold">{revenueRigidity}%</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={revenueRigidity}
                  onChange={e => setRevenueRigidity(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 flex justify-between mb-1">
                  <span>Sowkar Usury Rate:</span>
                  <span className="text-rose-400 font-bold">{moneylenderInterest}%</span>
                </label>
                <input
                  type="range"
                  min={25}
                  max={50}
                  value={moneylenderInterest}
                  onChange={e => setMoneylenderInterest(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 flex justify-between mb-1">
                  <span>Forest Enclosure Extent:</span>
                  <span className="text-emerald-400 font-bold">{forestEnclosure}%</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={forestEnclosure}
                  onChange={e => setForestEnclosure(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase">Selected Archive Focus</span>
                <h4 className="text-base font-bold text-white mt-1 capitalize">{selectedMapRegion} Flashpoint</h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {selectedMapRegion === 'bengal' && 'Biswas brothers refuse dadani advance in Nadia (1859). Curzon partitions province into East & West (1905), met by Swadeshi boycott and Rakhi pledge.'}
                  {selectedMapRegion === 'deccan' && 'Kunbi peasants strike against Marwari & Gujarati sowkars at Supa (1875). Bahikhatas destroyed. 1879 Act regulates credit but retains rigid Ryotwari tax.'}
                  {selectedMapRegion === 'chotanagpur' && 'Birsa Munda leads Ulgulan (1899–1900) to restore Khuntkatti communal tenure. 1908 Tenancy Act restricts future tribal land alienation after 8-year delay.'}
                  {selectedMapRegion === 'punjab' && 'Rowlatt Act (1919) enforces peacetime detention without trial. Unanimous Indian opposition in Imperial Council; Jinnah and Malaviya resign in protest.'}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAdvanceToChallenge}
                className="mt-4 w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 rounded-xl font-black text-xs tracking-wider uppercase shadow-lg shadow-amber-500/20"
              >
                I Am Ready For The Challenges! →
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE (ADAPTIVE & VISUAL) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-amber-400 uppercase tracking-wider">
                Competency: {currentChallengeObj.competencyLevel}
              </span>
            </div>
            <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <motion.div
            key={currentChallengeObj.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-3xl bg-slate-900 border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'border-slate-800 shadow-xl'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-400 text-xs font-bold uppercase">
                {currentChallengeObj.nodeId}
              </span>
              <span className="text-xs text-amber-400 font-bold uppercase">
                {currentChallengeObj.difficulty} tier
              </span>
            </div>

            <p className="text-base md:text-lg font-bold text-white mb-6 leading-relaxed">
              {currentChallengeObj.question}
            </p>

            {/* ── MCQ TYPES: CLASSIFY / DISTINGUISH / MATCH ── */}
            {(currentChallengeObj.type === 'classify' ||
              currentChallengeObj.type === 'distinguish' ||
              currentChallengeObj.type === 'match') &&
              currentChallengeObj.options && (
                <div className="space-y-3">
                  {currentChallengeObj.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-4 rounded-2xl text-sm transition-all border ${
                        showExplanation && i === currentChallengeObj.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold shadow-md'
                          : 'bg-slate-950/70 hover:bg-slate-800 border-slate-800 text-slate-200 hover:border-amber-500/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5 text-slate-300">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* ── DRAG LABEL TYPE ── */}
            {currentChallengeObj.type === 'drag-label' && currentChallengeObj.dragItems && (
              <div className="space-y-5">
                <div className="flex flex-wrap gap-2.5 p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                  {currentChallengeObj.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold text-xs cursor-grab shadow-sm"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: 't_indigo', title: 'Indigo Uprising (1859)', sub: 'Bengal Ryots' },
                    { id: 't_deccan', title: 'Deccan Riots (1875)', sub: 'Poona Kunbis' },
                    { id: 't_munda', title: 'Munda Ulgulan (1899)', sub: 'Chota Nagpur' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col justify-between min-h-[110px]"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-300">{target.title}</div>
                        <div className="text-[11px] text-slate-500">{target.sub}</div>
                      </div>
                      <div className="mt-3 p-2 bg-slate-900 rounded-xl border border-slate-800 text-xs font-bold text-center text-amber-300">
                        {droppedLabels[target.id] || 'Drop Target Here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length < 3}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 rounded-xl font-black text-xs uppercase tracking-wider"
                >
                  Verify Target Allocations ✓
                </motion.button>
              </div>
            )}

            {/* ── DRAG SORT TYPE ── */}
            {currentChallengeObj.type === 'drag-sort' && currentChallengeObj.sortItems && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">Drag or reorder items into chronological sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === currentChallengeObj.sortItems.length
                    ? sortArrangement.map(idx => currentChallengeObj.sortItems![idx])
                    : currentChallengeObj.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 flex items-center gap-3 cursor-grab"
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-800 text-amber-400 font-black flex items-center justify-center text-xs">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : currentChallengeObj.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-black text-xs uppercase tracking-wider"
                >
                  Check Chronology Order ✓
                </motion.button>
              </div>
            )}

            {/* ── NUMERIC INPUT TYPE ── */}
            {currentChallengeObj.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.1"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numeric calculation"
                    className="flex-1 p-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-sm font-bold text-slate-400">{currentChallengeObj.unit}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 rounded-xl font-black text-xs uppercase tracking-wider"
                >
                  Validate Calculation ✓
                </motion.button>
              </div>
            )}

            {/* ── CONSTRUCT FORMULA TYPE ── */}
            {currentChallengeObj.type === 'construct' && currentChallengeObj.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{currentChallengeObj.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {currentChallengeObj.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs text-slate-200"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2">
                  {constructParts.map((p, idx) => (
                    <span key={idx} className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl text-xs flex items-center gap-1.5">
                      {p}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click parts above to construct the formula.</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' + '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 rounded-xl font-black text-xs uppercase tracking-wider"
                >
                  Check Construction Formula ✓
                </motion.button>
              </div>
            )}

            {/* ── PROGRESSIVE DISCLOSURE EXPLANATION CARD ── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-600/40 rounded-2xl space-y-4"
              >
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
                  <span>📜</span>
                  <span>Step-by-Step Historical Analysis</span>
                </div>

                <div className="space-y-2">
                  {currentChallengeObj.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-amber-200/90 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps <
                  currentChallengeObj.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-2 bg-amber-800/80 hover:bg-amber-700 text-white rounded-xl text-xs font-bold"
                  >
                    Reveal Next Analysis Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  currentChallengeObj.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNextChallenge}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-slate-950 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'View Investigation Dossier →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION, REFLECTION & SPACED REPETITION SCHEDULE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/40 text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              className="w-20 h-20 rounded-3xl bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-4xl shadow-inner"
            >
              🏆
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-black text-white">Historical Investigation Completed</h2>
            <p className="text-slate-300 text-sm max-w-lg mx-auto">
              You have reconstructed 60 critical years of resistance across agrarian revolts, anti-partition agitation, and anti-Rowlatt mobilisation.
            </p>

            {/* Score & Mastery Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-md mx-auto pt-2">
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400">Final Score</div>
                <div className="text-xl font-black text-amber-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400">BKT Mastery</div>
                <div className="text-xl font-black text-emerald-400 capitalize">{masteryLevel}</div>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 col-span-2 md:col-span-1">
                <div className="text-xs text-slate-400">Challenges Solved</div>
                <div className="text-xl font-black text-blue-400">{filteredChallenges.length}</div>
              </div>
            </div>
          </div>

          {/* Personalized Motivational Feedback Based on Error Count */}
          <div className="p-5 bg-slate-900 border border-amber-500/30 rounded-2xl text-center space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400">Evaluation Result</div>
            <div className="text-lg font-black text-white">
              {errors === 0 && 'PERFECT SCORE!'}
              {errors >= 1 && errors <= 3 && 'Great work!'}
              {errors >= 4 && errors <= 7 && 'Good effort!'}
              {errors >= 8 && 'Do not give up — You WILL get this!'}
            </div>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              {errors === 0
                ? 'You demonstrated complete conceptual distinction between localized peasant movements and nationwide resistance.'
                : errors <= 3
                ? 'You have built a rigorous analytical understanding of colonial economic pressures and legislative safety valves.'
                : errors <= 7
                ? 'Review the misconception profile and historical notes below to strengthen your grasp.'
                : 'Keep practicing the flashpoints and economic mechanisms to master this critical ISC History unit!'}
            </p>
          </div>

          {/* Misconception Profile Tracker */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 border border-rose-800/50 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase">
                <span>⚠️</span>
                <span>Your Targeted Misconception Profile</span>
              </div>
              <p className="text-xs text-slate-300">
                These specific pitfalls tripped you up. Keep these corrections in mind for your board answers:
              </p>
              <div className="space-y-2.5">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs">
                      <div className="text-rose-300 font-bold mb-1">❌ Common Error: {m.misconception}</div>
                      <div className="text-emerald-300">✓ Accurate History: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── SPACED REPETITION VISIBILITY CARD (SRS VISIBLE SCHEDULE) ─── */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-amber-500/40 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm uppercase tracking-wider">
                <span>⏱️</span>
                <span>Spaced Repetition Memory Schedule (SM-2)</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-black text-xs">
                {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Recommended Schedule:</span>
                <span className="text-sm font-bold text-white">
                  {errors === 0 ? '🗓️ Review in 7 days' : errors <= 3 ? '🗓️ Review in 3 days' : '🗓️ Review in 1 day'}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Retention Interval:</span>
                <span className="text-sm font-bold text-amber-300">
                  {errors === 0 ? '7 Days (Optimal Retention)' : errors <= 3 ? '3 Days (Consolidation)' : '1 Day (Targeted Reinforcement)'}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Target Focus:</span>
                <span className="text-sm font-bold text-emerald-300">
                  {errors === 0 ? '1905 Partition & 1919 Rowlatt Act' : 'Dadani & Ryotwari Tax Traps'}
                </span>
              </div>
            </div>
          </div>

          {/* ─── MANDATORY REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <span>🧠</span>
              <span>Post-Lab Historical Reflection</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-amber-300">1. What was the most surprising thing you learned?</div>
                <p className="text-slate-400 leading-relaxed">
                  How early agrarian movements (like the 1875 Deccan Riots) targeted legal paperwork and moneylenders rather than direct British military posts.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-300">2. How would you explain this to a friend?</div>
                <p className="text-slate-400 leading-relaxed">
                  Colonial taxes and cash-crop mandates trapped farmers in debt. When British authorities made emergency powers permanent in 1919, localized anger exploded into nationwide resistance.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-blue-300">3. Where in real life might you use this?</div>
                <p className="text-slate-400 leading-relaxed">
                  In understanding modern civil liberties, tribal land protection under tenancy laws, and why constructive self-reliance (Swadeshi) remains vital.
                </p>
              </div>
            </div>
          </div>

          {/* Real-World Investigative Activity */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
              <span>📚</span>
              <span>{REAL_WORLD_ACTIVITY.title}</span>
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-amber-400 mr-1.5">{idx + 1}.</span> {step}
                </div>
              ))}
            </div>
          </div>

          {/* Reset & Replay Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setPhase('discovery');
              setCurrentChallenge(0);
              setCurrentSlide(0);
              setErrors(0);
              setDiscoveryAnswered(false);
              setPredictionMade(false);
              setPredictionVerified(false);
              setSelectedObsAnswers({});
              setObsFeedback({});
              audioManager.play('whoosh');
            }}
            className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold text-xs tracking-wider uppercase transition-all"
          >
            Restart Investigation Archive 🔄
          </motion.button>
        </motion.div>
      )}

      {/* ─── MODAL FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Investigation Milestone Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_HistoryCircumstancesLeadingProtestSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERALS ───
const NODE_C9_HISTCIV_061 = 'c9_histciv_061';
const NODE_C9_HISTCIV_062 = 'c9_histciv_062';
const NODE_C9_HISTCIV_063 = 'c9_histciv_063';
const NODE_C9_HISTCIV_064 = 'c9_histciv_064';
const NODE_C9_HISTCIV_065 = 'c9_histciv_065';
const NODE_C9_HISTCIV_066 = 'c9_histciv_066';
const NODE_C9_HISTCIV_067 = 'c9_histciv_067';
const NODE_C9_HISTCIV_068 = 'c9_histciv_068';
const NODE_C9_HISTCIV_069 = 'c9_histciv_069';

const ALL_NODE_IDS = [
  NODE_C9_HISTCIV_061,
  NODE_C9_HISTCIV_062,
  NODE_C9_HISTCIV_063,
  NODE_C9_HISTCIV_064,
  NODE_C9_HISTCIV_065,
  NODE_C9_HISTCIV_066,
  NODE_C9_HISTCIV_067,
  NODE_C9_HISTCIV_068,
  NODE_C9_HISTCIV_069,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Epochs of Transformation: India & Europe (1200–1850)',
  intro: 'You are an archivist analyzing major historical pivots: the syncretic fusion of medieval Indian culture, the intellectual rebirth of Renaissance Europe, the religious rupture of the Reformation, and the economic earthquake of the Industrial Revolution.',
  context: 'Examine primary documents, architectural fusions, doctrinal clashes, and factory machinery to uncover the causal forces that formed our modern world.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In 1543, Nicolaus Copernicus proposed that the Earth revolves around the Sun. How did he arrive at this revolutionary breakthrough?',
  options: [
    'By observing planets through an astronomical telescope in Poland',
    'Through rigorous mathematical calculations and planetary coordinate records',
    'By translating ancient Mayan astrological manuscripts brought by explorers',
    'Through physical space voyages funded by the Medici banking family',
  ],
  correctIndex: 1,
  hintAfter: "Astronomical telescopes were not used for celestial study until Galileo in 1609! Copernicus used pure mathematics and observations.",
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

// ─── CHALLENGES ARRAY (24 items covering all 9 nodes, progressive tiers & types) ───
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION TIER (1-8) ──
  {
    id: 'ch_01_f_comp',
    nodeId: NODE_C9_HISTCIV_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following defines "Composite Culture" in the context of medieval India?',
    options: [
      'A theological merger dissolving Hinduism and Islam into a single religion',
      'Shared cultural expressions (language, music, architecture) while doctrines remained distinct',
      'An imperial law mandating Persian dress for all subjects',
      'The complete replacement of Sanskrit with European Latin',
    ],
    correctIndex: 1,
    explanation: 'Composite culture refers to shared cultural synthesis (such as Hindi, Qawwali, Indo-Islamic architecture) while religious faiths remained doctrinally separate.',
    hints: [
      'Did Hindus and Muslims stop following their distinct religious beliefs?',
      'Think about shared music, architecture, and language rather than doctrinal fusion.',
      'Distinct faiths remained separate, but created common cultural forms through daily interaction.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_f_ren_def',
    nodeId: NODE_C9_HISTCIV_062,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'The term "Renaissance" literally translates to "rebirth". What was fundamentally reborn?',
    options: [
      'The military hegemony of the Western Roman Empire',
      'Classical Greek and Roman learning, humanism, and rational enquiry',
      'Feudal serfdom and monastic isolationism across Europe',
      'The absolute authority of the Pope over all civil courts',
    ],
    correctIndex: 1,
    explanation: 'The Renaissance marked the rebirth of classical Greek and Roman literature, philosophy, and humanist confidence in human rational capacity.',
    hints: [
      'Which ancient civilizations were studied eagerly in 14th-century Florence?',
      'Consider the humanist focus on human reason rather than purely theological dogma.',
      'It revived classical Greek and Roman thought alongside human-centered enquiry.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_f_art_lit',
    nodeId: NODE_C9_HISTCIV_063,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Map each Renaissance pioneer to their primary medium or masterpiece breakthrough.',
    dragItems: [
      { label: 'Mona Lisa & Anatomical Dissections', targetId: 'slot_davinci' },
      { label: 'Vernacular English Plays (Hamlet)', targetId: 'slot_shake' },
      { label: 'Heliocentric Astronomy (1543)', targetId: 'slot_copern' },
    ],
    correctMapping: {
      slot_davinci: 'Mona Lisa & Anatomical Dissections',
      slot_shake: 'Vernacular English Plays (Hamlet)',
      slot_copern: 'Heliocentric Astronomy (1543)',
    },
    explanation: 'Leonardo merged empirical anatomy with art; Shakespeare elevated vernacular English to dramatic mastery; Copernicus proved the sun-centered universe with mathematics.',
    hints: [
      'Who dissected over 30 human bodies to paint realistic muscle tension?',
      'Who wrote 37 plays in the language of ordinary English townspeople?',
      'Who published De Revolutionibus Orbium Coelestium in 1543?',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04_f_ren_cause',
    nodeId: NODE_C9_HISTCIV_062,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In 1453, a major geopolitical event drove Greek scholars and manuscripts to Italian city-states. What happened?',
    options: [
      'The fall of Western Rome to Germanic Visigoths',
      'The capture of Constantinople by Ottoman Turks under Mehmed II',
      'The signing of the Magna Carta in England',
      'The invention of the steam engine in Mainz',
    ],
    correctIndex: 1,
    explanation: 'In 1453, Sultan Mehmed II captured Constantinople (Byzantine capital), prompting scholars to flee to Italy with precious ancient Greek texts.',
    hints: [
      'Do not confuse the 476 CE fall of Western Rome with this 15th-century Byzantine capital event.',
      'Which Ottoman Sultan conquered the city on the Bosphorus?',
      'Constantinople fell in 1453, driving scholars to Florence and Venice.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_05_f_ref_mean',
    nodeId: NODE_C9_HISTCIV_065,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What was Johann Tetzel famous for selling across German towns that provoked Martin Luther in 1517?',
    options: [
      'Land titles granted by the Holy Roman Emperor',
      'Indulgence certificates promising release of souls from purgatory',
      'Printed German translations of the New Testament',
      'Shares in Manchester textile steam mills',
    ],
    correctIndex: 1,
    explanation: 'Tetzel sold indulgence certificates to raise money for St. Peter\'s Basilica, claiming coins in his chest freed souls from purgatory.',
    hints: [
      'Were these voluntary donations or commercial transactions for spiritual forgiveness?',
      'Think of the certificates that promised to reduce temporal punishment for sins.',
      'Indulgences were commercial paper certificates granting remission of penance.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_06_f_luther_date',
    nodeId: NODE_C9_HISTCIV_066,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In what year did Martin Luther post his Ninety-Five Theses on the Castle Church door in Wittenberg?',
    correctAnswer: 1517,
    tolerance: 0,
    unit: 'CE',
    explanation: 'On October 31, 1517, Martin Luther posted his 95 Theses at Wittenberg, igniting the Protestant Reformation.',
    hints: [
      'It occurred in the early 16th century, before his 1521 excommunication.',
      'The year is between 1510 and 1520.',
      'The year is exactly 1517.',
    ],
  },
  {
    id: 'ch_07_f_counter_ref',
    nodeId: NODE_C9_HISTCIV_067,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which institution, meeting from 1545 to 1563, served as the centerpiece of Catholic internal reform and doctrinal defense?',
    options: [
      'The Diet of Worms',
      'The Council of Trent',
      'The Estates-General of Paris',
      'The Ibadat Khana of Fatehpur Sikri',
    ],
    correctIndex: 1,
    explanation: 'The Council of Trent (1545–1563) reaffirmed Catholic doctrines while abolishing the sale of indulgences and enforcing priestly discipline.',
    hints: [
      'It was convened by Pope Paul III in northern Italy.',
      'It met over eighteen years in the city of Trent.',
      'The Council of Trent served as the legislative engine of the Counter Reformation.',
    ],
  },
  {
    id: 'ch_08_f_ind_def',
    nodeId: NODE_C9_HISTCIV_068,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is it incorrect to call the Industrial Revolution a "sudden overnight event"?',
    options: [
      'It occurred instantaneously only in 1769 with James Watt\'s patent',
      'It was a gradual, cumulative restructuring of manufacturing from 1760 to 1840',
      'It was entirely planned and legislated in a single session by the British Parliament',
      'It was confined exclusively to rural agriculture without cities',
    ],
    correctIndex: 1,
    explanation: 'The Industrial Revolution spanned eight decades (c. 1760–1840), with successive textile inventions, metallurgical shifts, and steam power compounding over generations.',
    hints: [
      'Did hand tools get replaced by factories in a single day?',
      'Look at the span from Hargreaves (1764) to the railway age (1830s+).',
      'It was a multi-generational transformation over nearly a century.',
    ],
  },

  // ── STANDARD TIER (9-16) ──
  {
    id: 'ch_09_s_bhakti_sufi',
    nodeId: NODE_C9_HISTCIV_061,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Distinguish Nirguna Bhakti from Saguna Bhakti based on theological principle and saint representatives:',
    options: [
      'Nirguna is devotion to formless divine (Kabir, Guru Nanak); Saguna is devotion to divine with form/qualities (Mirabai, Tulsidas)',
      'Nirguna uses Latin scriptures exclusively; Saguna relies on oral Persian ballads',
      'Nirguna worships temple idols in Varanasi; Saguna rejects all poetry and vernacular songs',
      'Nirguna was strictly for royalty; Saguna was practised only by European missionaries in Goa',
    ],
    correctIndex: 0,
    explanation: 'Nirguna bhakti views God as attribute-less and formless (Kabir, Nanak), while Saguna celebrates divine manifestations like Ram (Tulsidas) or Krishna (Mirabai).',
    hints: [
      'What does "guna" mean? Attributes or qualities. "Nir-guna" = without attributes.',
      'Kabir rejected idol worship (Nirguna), whereas Mirabai sang to Krishna (Saguna).',
      'Option A pairs the definitions and respective saints accurately.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_10_s_causes_conseq',
    nodeId: NODE_C9_HISTCIV_064,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Categorize correctly: Is the "Gutenberg Printing Press" a cause that accelerated the Renaissance, or a downstream consequence?',
    options: [
      'A cause (c. 1440) that accelerated the spread of humanist texts and consequences',
      'A consequence resulting from Columbus\'s voyage in 1492',
      'A consequence of the Industrial Revolution steam factories',
      'Neither, it was invented after the French Revolution',
    ],
    correctIndex: 0,
    explanation: 'Gutenberg developed movable metal type c. 1440 (a cause); its rapid diffusion multiplied Renaissance consequences (humanism, Reformation, scientific texts).',
    hints: [
      'Did the printing press help start the mass diffusion of ideas, or did it happen after the Renaissance ended?',
      'Gutenberg\'s press dates around 1440, preceding the peak intellectual waves.',
      'The press was an enabling cause that accelerated all other consequences.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_11_s_luther_doctrines',
    nodeId: NODE_C9_HISTCIV_066,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match Luther’s twin theological pillars: "Sola Fide" and "Sola Scriptura":',
    options: [
      'Sola Fide = Salvation through faith alone; Sola Scriptura = Scripture alone is supreme authority',
      'Sola Fide = Only monks can read; Sola Scriptura = Latin is mandatory for worship',
      'Sola Fide = Buying certificates saves souls; Sola Scriptura = Papal bulls override the Bible',
      'Sola Fide = Complete royal monarchy; Sola Scriptura = Secular trade capitalism',
    ],
    correctIndex: 0,
    explanation: 'Sola Fide asserts justification by faith in divine grace alone without bought works; Sola Scriptura asserts the Bible alone surpasses clerical tradition.',
    hints: [
      '"Fide" is related to faith/fidelity; "Scriptura" is related to scripture/writings.',
      'Luther rejected that papal decrees or purchases could buy salvation.',
      'Salvation by faith alone + scripture as supreme authority.',
    ],
  },
  {
    id: 'ch_12_s_jesuit_mission',
    nodeId: NODE_C9_HISTCIV_067,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How does the Counter Reformation connect directly to Class 9 Indian history (1542 & 1580)?',
    options: [
      'Martin Luther visited the Delhi Sultanate to preach against indulgences in 1542',
      'St. Francis Xavier arrived in Goa (1542), and Jesuit priests attended Akbar’s Ibadat Khana (1580)',
      'The British East India Company was founded by the Council of Trent in Goa',
      'Pope Leo X established an indulgence mint in Calicut in 1580',
    ],
    correctIndex: 1,
    explanation: 'The Jesuit order (founded by Ignatius of Loyola in 1540) sent Francis Xavier to Goa in 1542; Jesuits Aquaviva and Monserrate later took part in Akbar’s interfaith talks at Fatehpur Sikri.',
    hints: [
      'Think about the Society of Jesus missionary movement reaching Indian ports and Mughal courts.',
      'Which Jesuit saint is venerated in Goa from 1542?',
      'Francis Xavier arrived in Goa in 1542; Jesuit scholars debated in Akbar\'s Ibadat Khana in 1580.',
    ],
  },
  {
    id: 'ch_13_s_watt_steam',
    nodeId: NODE_C9_HISTCIV_068,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is James Watt’s 1769 patent described as a crucial "improvement" rather than the initial invention of the steam engine?',
    options: [
      'Thomas Newcomen had built an atmospheric engine in 1712; Watt added a separate condenser that reduced fuel waste',
      'Watt only invented the steam whistle, while Cartwright built the first boiler in 1769',
      'Leonardo da Vinci had already manufactured thousands of steam locomotives in Milan',
      'Watt simply copied an Indian handloom design from Surat without modifications',
    ],
    correctIndex: 0,
    explanation: 'Newcomen\'s 1712 engine repeatedly cooled and heated the main cylinder, wasting coal; Watt added a separate condenser, making the engine fuel-efficient for factories.',
    hints: [
      'Remember Newcomen\'s pump used in flooded coal mines in 1712.',
      'What was Watt\'s key technical addition? The separate condenser.',
      'Watt improved fuel efficiency by preventing cylinder thermal cycling.',
    ],
  },
  {
    id: 'ch_14_s_capitalism_vs_ind',
    nodeId: NODE_C9_HISTCIV_068,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the vital conceptual difference between "Industrialisation" and "Capitalism"?',
    options: [
      'Industrialisation is the technological shift to machine production; Capitalism is the economic system of private ownership for profit',
      'They are exact synonyms and cannot be separated in economic analysis',
      'Industrialisation is state welfare; Capitalism is hand-spinning at home',
      'Capitalism was invented in 1453; Industrialisation was developed exclusively by Bhakti poets',
    ],
    correctIndex: 0,
    explanation: 'Industrialisation is the technical process of mechanisation (which can occur under socialism or capitalism); capitalism is an economic system based on private property and wage labor.',
    hints: [
      'One is technological (machines, steam), the other is institutional (ownership, profit).',
      'Can an industrial factory exist under state ownership in a socialist society?',
      'Technology vs. Ownership/Distribution structure.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_15_s_socialism_causes',
    nodeId: NODE_C9_HISTCIV_069,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the historical progression leading to the rise of socialist theory in chronological order:',
    sortItems: [
      'Enclosure Acts and steam factories create urban slums & 14-16 hr workdays',
      'The Sadler Committee (1832) documents severe child labour abuses',
      'Robert Owen demonstrates cooperative humane labour at New Lanark (from 1800)',
      'Marx & Engels publish the Communist Manifesto outlining scientific class struggle (1848)',
    ],
    correctOrder: [0, 2, 1, 3],
    explanation: 'Industrial urbanization and long shifts began in the late 1700s, Owen experimented at New Lanark from 1800, Sadler Committee reported in 1832, and Marx/Engels published in 1848.',
    hints: [
      'The lived suffering in early mills came first (1780-1800).',
      'Owen\'s experimental cooperative mill at New Lanark began around 1800.',
      'Sadler Committee in 1832 preceded the 1848 Communist Manifesto.',
    ],
  },
  {
    id: 'ch_16_s_utopian_vs_scientific',
    nodeId: NODE_C9_HISTCIV_069,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How did Karl Marx’s "Scientific Socialism" differ fundamentally from Robert Owen’s "Utopian Socialism"?',
    options: [
      'Owen relied on moral persuasion and cooperative experiments; Marx analyzed historical class struggle and surplus-value contradictions',
      'Owen advocated violent armed revolution; Marx wanted factory owners to voluntarily build village schools',
      'Owen believed machines should be destroyed; Marx argued only agriculture creates wealth',
      'They held identical views and co-authored Das Kapital in 1800',
    ],
    correctIndex: 0,
    explanation: 'Owen believed moral example and model factory villages (New Lanark) would persuade owners; Marx argued that systemic class antagonism necessitated proletarian revolution.',
    hints: [
      'Who set up the model school and shorter hours at New Lanark?',
      'Who analyzed surplus value, dialectical materialism, and class conflict in 1848/1867?',
      'Utopian was reformist/voluntary; Scientific was analytical/revolutionary.',
    ],
  },

  // ── ADVANCED TIER (17-24: Competency NEP 2020: Application, Analysis, Evaluation, Creativity) ──
  {
    id: 'ch_17_a_comp_eval',
    nodeId: NODE_C9_HISTCIV_061,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the historical impact of Amir Khusrau and the Chishti Sufis on medieval Indian society:',
    options: [
      'They isolated Muslims from Indian musical traditions and forbade the use of vernacular Hindavi',
      'They bridged cultural divides through Qawwali musical synthesis, Hindavi verse, and open khanqahs feeding all communities',
      'They strictly served royal courtiers and prohibited commoners from entering Sufi shrines',
      'They converted all Hindu temples into Latin cathedral schools in 1192',
    ],
    correctIndex: 1,
    explanation: 'Khusrau combined Persian melodies with Indian ragas to create Qawwali and contributed to the sitar; Chishti khanqahs provided langar and spiritual solace irrespective of caste or faith.',
    hints: [
      'Think about how Qawwali music blends Persian and Indian ragas.',
      'Remember the open community kitchen (langar) at Nizam-ud-din Auliya\'s khanqah.',
      'Their synthesis formed the musical and linguistic backbone of composite culture.',
    ],
  },
  {
    id: 'ch_18_a_ren_chain',
    nodeId: NODE_C9_HISTCIV_062,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Reconstruct the causal domino chain that triggered the European Renaissance by selecting the key components in order.',
    availableParts: [
      'Decline of Feudalism & Rise of Free Towns',
      'Mediterranean Trade Wealth (Venice/Medici)',
      '1453 Fall of Constantinople (Greek Texts)',
      'Printing Press Multiplier (1440+)',
    ],
    targetState: 'Decline of Feudalism & Rise of Free Towns Mediterranean Trade Wealth (Venice/Medici) 1453 Fall of Constantinople (Greek Texts) Printing Press Multiplier (1440+)',
    validationHint: 'Add: Feudal Decline → Trade Wealth → Constantinople 1453 → Printing Press',
    explanation: 'Feudal decline enabled urban mobility; trade provided Medici patronage; 1453 brought classical manuscripts; Gutenberg multiplied ideas across Europe.',
    hints: [
      'First came urban freedom from manors, then commercial wealth.',
      'Next was the influx of fleeing Byzantine scholars with manuscripts in 1453.',
      'Finally, Gutenberg\'s movable metal type printed millions of copies.',
    ],
  },
  {
    id: 'ch_19_a_copernicus_miscon',
    nodeId: NODE_C9_HISTCIV_063,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims: "Copernicus discovered the heliocentric theory by looking through an advanced telescope in 1543." As an examiner, how do you evaluate this?',
    options: [
      'Correct; Copernicus built the first reflecting telescope with Leonardo da Vinci',
      'Incorrect; astronomical telescopes were first used by Galileo after 1609; Copernicus used mathematics and observation tables',
      'Correct; the telescope was invented in Gutenberg’s workshop in 1440',
      'Incorrect; Copernicus did not believe in heliocentrism, only Shakespeare did',
    ],
    correctIndex: 1,
    explanation: 'This is a major historical misconception! Galileo turned the telescope skyward in 1609 (66 years after Copernicus published De Revolutionibus in 1543 using mathematical models).',
    hints: [
      'Check the chronological gap: 1543 vs. 1609.',
      'Did Copernicus have optical glass telescopes, or did he work with geometry and mathematical calculations?',
      'Copernicus used mathematical deduction; Galileo introduced astronomical telescope observations decades later.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_20_a_reformation_econ',
    nodeId: NODE_C9_HISTCIV_065,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why did German princes and English monarchs (like Henry VIII in 1534) passionately back the Reformation beyond theological debate?',
    options: [
      'They wanted to adopt Persian administrative law and migrate to the Mughal empire',
      'To halt massive tax drainage to Rome, seize wealthy Church estates, and consolidate national sovereignty',
      'Because the Pope had ordered the destruction of all printing presses in London',
      'To force all European peasants to become Catholic monks under the Council of Trent',
    ],
    correctIndex: 1,
    explanation: 'Princes and kings resented huge papal tax extractions (often exceeding imperial revenues) and coveted Church lands, using reform to establish state sovereignty.',
    hints: [
      'Consider the financial wealth and vast agricultural lands held by monasteries.',
      'Think about papal taxes draining silver and coin to Rome.',
      'Secular rulers gained political supremacy and enormous treasury revenues.',
    ],
  },
  {
    id: 'ch_21_a_counter_dialectic',
    nodeId: NODE_C9_HISTCIV_067,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is the Counter Reformation described as having "two intertwined faces" rather than being pure persecution?',
    options: [
      'It had a Reform face (Trent abolished indulgence sales & reformed clergy) alongside a Repressive face (Inquisition & Index of Forbidden Books)',
      'It was divided strictly between artists in Florence and soldiers in Venice',
      'It combined Islamic mysticism with Protestant church hymns',
      'It supported Luther publicly while excommunicating Erasmus in private',
    ],
    correctIndex: 0,
    explanation: 'The Catholic Church conceded that abuses like simony and indulgence-peddling were corrupt (Reform face), while using the Inquisition and Index to halt Protestant theology (Repressive face).',
    hints: [
      'Did the Church ignore its internal moral abuses, or clean them up at Trent?',
      'Hold the educational vigor of Jesuits together with the censorship of the Index Librorum Prohibitorum.',
      'Genuine institutional cleanup occurred alongside aggressive ideological suppression.',
    ],
  },
  {
    id: 'ch_22_a_colonial_capital',
    nodeId: NODE_C9_HISTCIV_068,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Applying the historical link between British Industrialisation and Imperialism: How did colonial trade directly enable Manchester\'s cotton mills?',
    options: [
      'Profits from Caribbean slave plantations and Indian trade provided capital, while colonies supplied raw cotton and captive export markets',
      'British factory owners imported all their steam engines ready-made from Mughal workshops in Bengal',
      'The Enclosure Acts were drafted and funded entirely by the Nawabs of Awadh',
      'Manchester mills were strictly non-profit charities sending free cloth to the Americas',
    ],
    correctIndex: 0,
    explanation: 'British industrial capital was heavily generated through transatlantic plantation slavery and colonial surplus; raw materials came from colonies, which were later forced to buy manufactured cloth.',
    hints: [
      'Where did the immense capital to build mills come from?',
      'Where was raw cotton grown, and where were finished British textiles dumped?',
      'Colonial extraction financed infrastructure and provided raw inputs and export markets.',
    ],
  },
  {
    id: 'ch_23_a_socialism_trans',
    nodeId: NODE_C9_HISTCIV_069,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In Marxist theory, how is the relationship between "Socialism" and "Communism" precisely formulated?',
    options: [
      'Socialism is the transitional phase of collective/state ownership to reduce inequality; Communism is the ultimate stateless, classless society',
      'They are identical terms with no theoretical or structural difference',
      'Socialism means private billionaire ownership; Communism means feudal monarchy',
      'Socialism is only for rural agricultural communes; Communism is for oceanic explorers',
    ],
    correctIndex: 0,
    explanation: 'In Marxist theory, Socialism is the intermediate stage where the working class administers the means of production; Communism is the eventual classless, stateless destination.',
    hints: [
      'Which is the "road" and which is the final "destination"?',
      'Socialism still utilizes a transitional state apparatus to organize production.',
      'Socialism is transitional collective management; Communism is the ultimate stateless horizon.',
    ],
  },
  {
    id: 'ch_24_a_nep_create',
    nodeId: NODE_C9_HISTCIV_061,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Synthesize the elements of Akbar\'s composite synthesis policy by assembling the four pillars of integration.',
    availableParts: [
      'Sulh-i-Kul (Universal Peace)',
      'Ibadat Khana Interfaith Debates',
      'Razmnama (Mahabharata translation)',
      'Fatehpur Sikri Syncretic Architecture',
    ],
    targetState: 'Sulh-i-Kul (Universal Peace) Ibadat Khana Interfaith Debates Razmnama (Mahabharata translation) Fatehpur Sikri Syncretic Architecture',
    validationHint: 'Add: Sulh-i-Kul → Ibadat Khana → Razmnama → Fatehpur Sikri Syncretic Architecture',
    explanation: 'Akbar\'s statecraft combined universal tolerance (Sulh-i-Kul), multi-faith enquiry (Ibadat Khana), cross-cultural translation (Razmnama), and architectural fusion at Fatehpur Sikri.',
    hints: [
      'Start with the philosophical doctrine of universal harmony.',
      'Next is the hall for religious discussions with Sufis, Pandits, and Jesuits.',
      'Then the Persian translation of the great Sanskrit epic, followed by architecture.',
    ],
  },
  // ─── Class 10 board-depth additions: industrialisation and print-culture diagnostics ───
  {
    id: 'ch_depth_hist_putting_out',
    nodeId: 'c10_hist_cbse_04_001',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'In the putting-out system of proto-industrialisation, who controlled the production process -- the peasant family or the merchant?',
    options: [
      'The merchant: he supplied raw material (wool, yarn), paid the rural family per piece, collected the cloth and sold it for export -- the peasant merely "put out" labour on loaned material',
      'The peasant, who owned both raw material and the finished cloth',
      'The urban guild, which directed every village workshop',
      'The King, through royal factories',
    ],
    correctIndex: 0,
    explanation:
      'Putting-out system: merchant supplies raw material -> rural peasant family spins/weaves at home -> merchant collects and markets the product. Merchants preferred rural households because urban guilds restricted output and priced labour high, while countryside families worked cheaply, seasonally (farm slack periods) and had no guild protection -- every family member (including women and children) pitched in, transforming rural family life and gender roles long before factories.',
    hints: [
      '"Putting out" = putting out RAW MATERIAL, not finished goods.',
      'Who pays whom, and who sells the result?',
      'Why dodge the guilds? Think wages and rules.'
    ],
  },
  {
    id: 'ch_depth_hist_ledger_1790',
    nodeId: 'c10_hist_cbse_04_003',
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'A 1790 merchant ledger records payments to 200 handloom weavers and only 5 power looms in one region. What does the source imply about the pace of early industrialisation?',
    options: [
      'Machines spread slowly and unevenly -- handloom weavers dominated for decades, so "the Industrial Revolution" was a gradual, patchy transition, not an overnight machine takeover',
      'Power looms had already wiped out all hand weavers by 1790',
      'The ledger proves no cloth was produced at all',
      'Weavers were paid more than factory owners',
    ],
    correctIndex: 0,
    explanation:
      'Sources like ledgers show that before 1830 most cloth still came from human hands; steam power spread industry slowly and unevenly across Britain. Evaluate the claim that slow pace proves conservative entrepreneurs: instead, machinery was costly, unproven and often less reliable than cheap hand labour -- a rational economic choice, not timidity.',
    hints: [
      'Compare 200 : 5 -- which technology still ruled production?',
      'Gradual and regional vs sudden and universal.',
      'Cheap labour can out-price an expensive machine.'
    ],
  },
  {
    id: 'ch_depth_hist_lancashire_wages',
    nodeId: 'c10_hist_cbse_04_004',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'A Lancashire mill of the 1840s pays women 6 shillings a week and men 12 for the same spinning. What best explains this?',
    options: [
      'Women were paid half of male wages because factory owners treated their work as unskilled "family supplement" income -- industrialisation embedded wage discrimination rather than freeing women from it',
      'Women worked twice as fast, so they earned less total',
      'The mill was owned by women, so wages were lower',
      'Six shillings was the standard male wage then',
    ],
    correctIndex: 0,
    explanation:
      'Industrialisation drew women into mills in large numbers but at systematically lower wages, with 12-16 hour days. Compare living conditions: a migrant mill worker of 1840s Manchester crammed into an overcrowded cellar lodging with disease (cholera, typhus) versus a pre-industrial village artisan with land ties but seasonal poverty -- urban factory life meant cash wages plus squalor. Storyboard design: a Bengal village girl -> Calcutta jute mill: recruitment agent, train journey, mill gates, chawl bunk, wage slip, remittance home.',
    hints: [
      'Was the wage gap about skill, or about power?',
      'Factory towns: overcrowding, disease, no sanitation.',
      'Storyboard every step of the migration journey.'
    ],
  },
  {
    id: 'ch_depth_hist_tata_raniganj',
    nodeId: 'c10_hist_cbse_04_006',
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Evaluate: "Early Indian industrialists like Jamsetji Tata and Dwarakanath Tagore succeeded simply by copying British methods." What is the better argument?',
    options: [
      'They ADAPTED British technology to Indian conditions and capital: Tagore paired banking and coal at Raniganj, Tata planned Swadeshi-rooted steel (Jamshedpur) -- success needed local finance, markets and resource geography, not imitation alone',
      'True -- copying alone always guarantees success',
      'False -- both men invented the steam engine themselves',
      'False -- no Indian owned any industry before 1947',
    ],
    correctIndex: 0,
    explanation:
      'Indian entrepreneurs combined imported machinery with Indian capital and swadeshi ambition. Raniganj and Jharia coal mines grew in the Damodar valley because coal seams lay close to the surface near the East Indian Railway line -- cheap haulage to Calcutta port and mills. Geography (seams + railway + river) and enterprise together explain industrial locations; a 150-word argument should pair Tata/Tagore evidence with the Damodar transport logic.',
    hints: [
      'What did the railway do for coal economics?',
      'Adaptation vs imitation -- what is the difference?',
      'Name: Dwarakanath Tagore, Jamsetji Tata, Raniganj, Jharia.'
    ],
  },
  {
    id: 'ch_depth_hist_swadeshi_label',
    nodeId: 'c10_hist_cbse_04_007',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question:
      'A 1905 Swadeshi poster shows a woman at the charkha: "Wear Swadeshi, Save the Nation." Design a 1920s Swadeshi cloth label to compete with British brands. Which elements fit the genre?',
    options: [
      'Indian goddess/ figures (Lakshmi, Bharat Mata), the charkha wheel, Hindi/Bengali lettering and a burning foreign-cloth motif -- nationalist iconography turned commercial branding into political statement',
      'A portrait of the British monarch with a loyalty slogan',
      'Only price and weight information, no images',
      'A map of Britain with Manchester factories',
    ],
    correctIndex: 0,
    explanation:
      'Indian mill owners printed labels with gods, goddesses and nationalist figures so that buying swadeshi cloth became an act of patriotism; the charkha-linked woman symbolised self-help. Compare an advertisement vs the poster: one sells goods, the other mobilises a movement -- but both used the same cultural vocabulary. Design check: your label needs an Indian figure, a symbol (charkha/lotus), a slogan and the mill name.',
    hints: [
      'Gods and goddesses sold everything from thread to tyres.',
      'The charkha = self-reliance, later Gandhi\'s Congress flag.',
      'What makes a buyer feel patriotic, not just stylish?'
    ],
  },
  {
    id: 'ch_depth_hist_jobber_chawls',
    nodeId: 'c10_hist_cbse_04_008',
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'A Bombay mill owner of the 1900s pays workers Rs 12 a month for 14-hour days in chawl tenements. Evaluate: "The jobber system and rural ties were merely obstacles to industrial growth."',
    options: [
      'Too one-sided -- the jobber exploited newcomers (fees, favours) but ALSO recruited, housed and settled migrants from Ratnagiri and beyond; seasonality kept one foot in the village, giving workers security the city refused them',
      'True -- jobbers only stole wages and did nothing else',
      'False -- Indian mills had no labour recruiters at all',
      'True because all Indian workers were permanent urban residents',
    ],
    correctIndex: 0,
    explanation:
      'Jobbers were trusted village insiders hired by mills to recruit: they advanced travel money, found chawl rooms, settled disputes -- and charged for it, becoming gatekeepers. Migrants kept land links (returning for harvest), so mill labour stayed semi-rural. Storyboard the life-cycle: Ratnagiri village -> jobber\'s agent -> train to Bombay -> mill job via jobber -> chawl bunk -> remittance -> harvest return -> old age back in the village. Wages (Rs 12/month) bought little in a city whose food prices rose through the century.',
    hints: [
      'Who got you the job, the room and the credit?',
      'Why keep the village plot if the mill pays cash?',
      'Evaluate = both sides, then judge.'
    ],
  },
  {
    id: 'ch_depth_hist_depression_industry',
    nodeId: 'c10_hist_cbse_04_009',
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Evaluate: "The Great Depression hurt Indian industry more than Indian agriculture." What does the inter-war evidence say?',
    options: [
      'The reverse is closer: collapsing farm prices (wheat, jute) crushed peasant incomes and rural debt, while protective tariffs after 1923 actually shielded Bombay and Ahmedabad mills -- industry regained some markets as agriculture sank',
      'Both sectors grew rich during the Depression',
      'India was untouched by the Depression',
      'Only cities suffered; villages did not notice',
    ],
    correctIndex: 0,
    explanation:
      'Agricultural prices roughly halved (jute collapsed in Bengal), so peasants who paid fixed revenue and debt suffered most; industrialists gained from protection and cheap raw materials, though mass poverty shrank their home market. The Depression thus deepened anti-British feeling: fixed revenue against falling prices = anger.',
    hints: [
      'Who owes fixed money when prices halve?',
      'Tariffs: who do they protect?',
      'Link rural distress to political radicalisation.'
    ],
  },
  {
    id: 'ch_depth_hist_dharani_japan',
    nodeId: 'c10_hist_cbse_05_001',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'A Buddhist charm (dharani) printed in Japanese temple excavation is dated to 770 CE, text in Chinese. What does the Hyakumanto Darani reveal about early print in Japan?',
    options: [
      'Empress Shotoku commissioned a million printed charms (c. 764-770 CE) to be housed in tiny wooden pagodas -- print served DEVOTION and merit-making, spreading Buddhist text via Chinese woodblock technique',
      'Japan invented movable metal type in 770',
      'The charms were printed for selling in markets',
      'Buddhism had reached Japan without any texts',
    ],
    correctIndex: 0,
    explanation:
      'Compare social purposes: China\'s Diamond Sutra (868 CE, Wang Jie) shows print as religious merit plus scholarship; Japan\'s million dharani shows state-sponsored mass devotion. Storyboard the journey: sutra copied in a Chinese monastery -> woodblocks cut -> prints carried by monk-envoys along the sea routes -> reprinted at Nara temples -> sealed in pagodas. Print travelled with Buddhism from China to Korea to Japan.',
    hints: [
      'Who paid for a MILLION copies, and why?',
      'Devotion, merit, scholarship -- rank them.',
      'Trace the sea route of the monks.'
    ],
  },
  {
    id: 'ch_depth_hist_gutenberg_ink',
    nodeId: 'c10_hist_cbse_05_002',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Why was oil-based ink a necessary innovation for Gutenberg\'s metal movable type around 1448?',
    options: [
      'Water-based ink used on woodblocks slid off polished metal surfaces; Gutenberg\'s varnish of linseed oil, soot and lampblack stuck to metal type, pressed cleanly and dried fast -- without it the press could not print sharply',
      'Oil ink was merely cheaper than water',
      'Metal type repels all inks permanently',
      'Oil ink added colour to the Bible pages',
    ],
    correctIndex: 0,
    explanation:
      'Gutenberg rebuilt the whole system: metal type (lead-tin-antimony alloy), oil-based ink, and the adapted wine press. Water ink beads on metal; oil ink adheres and transfers under pressure. The 42-line Bible (about 180 copies) proved the reproduction revolution: books became faster, cheaper, multiple -- reading culture shifted from monasteries to a new public.',
    hints: [
      'What happens to water on a greasy metal surface?',
      'Ink, metal, press -- all three had to change together.',
      'Faster, cheaper, MULTIPLE -- the printing revolution in three words.'
    ],
  },
  {
    id: 'ch_depth_hist_chapbooks',
    nodeId: 'c10_hist_cbse_05_004',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Name the cheap small booklets sold by pedlars in France, and read the 1760s English chapbook "The History of Jack the Giant-Killer" as a source.',
    options: [
      'Bliotheque Bleue in France; the chapbook with its woodcut cover shows print carrying folk tales and practical information to poor rural readers who could not afford grand books',
      'Ukiyo-e albums in France; the chapbook proves nobles alone read',
      'Newspapers called Gazette; it proves print was only for politics',
      'Manuscript scrolls; chapbooks were never printed',
    ],
    correctIndex: 0,
    explanation:
      'The Bliotheque Bleue ("Blue Library") of Troyes sold 8-30 page chapbooks to French peasants: folk tales, almanacs, romances, saints lives. English chapbooks like Jack the Giant-Killer (woodcut giant on the cover) show cheap print building popular reading culture -- historians read covers, captions and price as evidence of audience. Pedlars (colporteurs) carried them village to village.',
    hints: [
      '"Bleue" = the blue paper wrappers.',
      'A woodcut cover is advertising -- who is it aimed at?',
      'Cheap + small + pedlar = mass rural audience.'
    ],
  },
  {
    id: 'ch_depth_hist_encyclopedie',
    nodeId: 'c10_hist_cbse_05_005',
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'A historian argues Diderot and d\'Alembert\'s Encyclopedie was more dangerous to the Old Regime than any political pamphlet. Compare pamphlets (Sieyes\' "What is the Third Estate?") and newspapers (Marat\'s "L\'Ami du peuple") as revolutionary print.',
    options: [
      'The Encyclopedie systematically replaced religious-monarchical thinking with reason across 35 volumes -- planting doubt for decades; Sieyes\' 1789 pamphlet was an instant political trigger; Marat\'s newspaper sustained weekly rage -- long-term subversion, spark, and fuel respectively',
      'All three were identical in purpose and audience',
      'The Encyclopedie was a royalist prayer book',
      'Newspapers did not exist before 1850',
    ],
    correctIndex: 0,
    explanation:
      'The Encyclopedie (1751-1772) collected and organised rational knowledge, criticising church and monarchy between the lines -- censorship banned it, which only fed demand. Sieyes\' January 1789 pamphlet declared the Third Estate "everything" and demanded recognition -- an immediate detonator. Marat\'s L\'Ami du peuple (1789-1793) kept revolutionary pressure alive week after week. Print forms differ by timescale: encyclopedia = slow subversion; pamphlet = spark; newspaper = sustained mobilisation.',
    hints: [
      'Ask of each text: who read it, and how fast?',
      'The banned book sells best -- why?',
      'Spark, fuel, slow fire -- which print does which job?'
    ],
  },
  {
    id: 'ch_depth_hist_kesari_plague',
    nodeId: 'c10_hist_cbse_05_007',
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'An 1897 Kesari (Marathi, Pune) editorial titled "The Plague and the Tyranny of Officials" criticises plague-control excesses. What followed, and what does it show about print and nationalism?',
    options: [
      'Tilak was tried for sedition and imprisoned -- showing that vernacular newspapers had become powerful enough that the colonial state prosecuted them, making print a central battlefield of nationalism',
      'Nothing -- editors were never punished',
      'Kesari was an English paper loyal to officials',
      'The plague committee thanked Tilak publicly',
    ],
    correctIndex: 0,
    explanation:
      'Tilak\'s Kesari and Mahratta built a regional public sphere in Marathi; the 1897 sedition trial (and Rand\'s assassination aftermath) proved print could challenge the state -- and that the state would jail it. Design a front page dated 16 October 1905 (Partition of Bengal): black border/mourning motif, "Swadeshi" calls, boycott of foreign cloth, excerpts from Sanjivani/Bande Mataram, notices of protest meetings -- vernacular print turned the Partition into a national movement.',
    hints: [
      'Sedition = exciting disloyalty by words -- who decided?',
      'Vernacular print reached readers English papers never did.',
      '16 October 1905: how does a front page mourn and mobilise?'
    ],
  },
  {
    id: 'ch_depth_hist_young_india_spin',
    nodeId: 'c10_hist_cbse_05_009',
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'A 1921 Young India headline urges: "Spin and Weave: The Duty of Every Indian." Compare Amrita Bazar Patrika and Kesari in the Swadeshi movement, and read Gandhi\'s use of print.',
    options: [
      'Gandhi turned his weeklies (Young India, Navajivan, later Harijan) into engines of a personal, mass-readable nationalism built on khadi; Amrita Bazar Patrika (which switched from Bengali to English overnight to dodge the Vernacular Press Act) and Tilak\'s Kesari had pioneered militant nationalist journalism decades earlier',
      'Gandhi printed only advertisements; the other papers were sports magazines',
      'Amrita Bazar Patrika always remained in Bengali',
      'Print had no role in the freedom movement',
    ],
    correctIndex: 0,
    explanation:
      'Amrita Bazar Patrika (Sisir and Motilal Ghosh) famously converted to English in 1878 to escape the Vernacular Press Act\'s Bengali censorship; Kesari (Tilak, Marathi, from 1881) made vernacular journalism a mass political weapon. Gandhi\'s innovation was style: simple prose, moral argument, subscriptions bundled with khadi and charkha discipline -- "spin and weave" made the reader an activist. Compare: language politics (Bengali vs English vs Marathi), audience, and tone of resistance.',
    hints: [
      'Why would switching language dodge a law called VERNACULAR Press Act?',
      'Gandhi\'s diction: short words, every reader included.',
      'The charkha connected print to practice.'
    ],
  }
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
  nodeId: NODE_C9_HISTCIV_061,
  title: 'Factors of Composite Culture, Renaissance, Reformation & Industrialization',
  definition: 'An interactive historical simulation exploring the cultural synthesis of medieval India alongside the intellectual, religious, and economic transformations of early modern Europe.',
  eli5: 'Think of human history as a series of grand bridges: cultures learning to share languages and songs in India, thinkers reviving reason and science in Italy, believers demanding spiritual honesty in Germany, and inventors building steam engines to remake the physical world in England.',
  misconceptions: [
    {
      misconception: 'Composite culture means Hinduism and Islam merged into one identical religion.',
      correction: 'Composite culture was a synthesis of cultural expressions (language, music, architecture) while theological doctrines remained separate.',
    },
    {
      misconception: 'The Renaissance was merely an artistic movement and was caused only by 1453.',
      correction: 'The Renaissance was a broad intellectual shift toward humanism and rational enquiry, driven by feudal decline, trade wealth, Greek manuscripts, and the printing press.',
    },
    {
      misconception: 'Copernicus proved heliocentrism by looking through Galileo’s telescope in 1543.',
      correction: 'Copernicus used mathematical calculation and planetary tables; astronomical telescopes were only utilized by Galileo after 1609.',
    },
    {
      misconception: 'Indulgences were voluntary charitable donations, and the Reformation was purely theological.',
      correction: 'Indulgences were monetized certificates promising penance remission; the Reformation was equally driven by kings seeking freedom from papal taxes.',
    },
    {
      misconception: 'Industrialisation and Capitalism are identical synonyms.',
      correction: 'Industrialisation is the technological transition to mechanized factories; Capitalism is the economic system of private ownership for profit.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is Nirguna Bhakti?', options: ['Worship of idols', 'Devotion to a formless divine', 'Ritual animal sacrifice', 'Latin prayer chanting'], correctIndex: 1 },
    { question: 'Who founded the Chishti order in India in 1192?', options: ['Amir Khusrau', 'Muin-ud-din Chishti', 'Nizam-ud-din Auliya', 'Akbar'], correctIndex: 1 },
    { question: 'What language did Shakespeare write his 37 plays in?', options: ['Latin', 'Vernacular English', 'Classical Greek', 'Italian'], correctIndex: 1 },
    { question: 'When did Vasco da Gama reach Calicut on the Malabar Coast?', options: ['1453', '1492', '1498', '1517'], correctIndex: 2 },
    { question: 'Which Pope authorized the sale of indulgences for St. Peter’s Basilica?', options: ['Pope Paul III', 'Pope Leo X', 'Pope Gregory VII', 'Pope Francis'], correctIndex: 1 },
    { question: 'What did the Sadler Committee of 1832 investigate?', options: ['Renaissance art in Florence', 'Child labour and mill conditions in Britain', 'Sufi khanqahs in Delhi', 'Gutenberg’s press patents'], correctIndex: 1 },
    { question: 'Who managed the cooperative New Lanark cotton mill from 1800?', options: ['Karl Marx', 'Friedrich Engels', 'Robert Owen', 'James Watt'], correctIndex: 2 },
    { question: 'Which book did Adam Smith publish in 1776 defending free-market capitalism?', options: ['The Communist Manifesto', 'In Praise of Folly', 'The Wealth of Nations', 'Das Kapital'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student understands composite culture in India, causes and impacts of the European Renaissance, Reformation and Counter-Reformation, and the socio-economic dynamics of the Industrial Revolution and early Socialism.',
};

// ─── EXPLORATION STEPS (Interactive guided learning) ───
const EXPLORATION_STEPS = [
  {
    title: '1. Synthesis of Composite Culture in India',
    instruction: 'Select cultural domains (Language, Music, Architecture) to see the fusion of Hindu and Islamic traditions.',
    interactionType: 'click-domain',
    nodeId: NODE_C9_HISTCIV_061,
  },
  {
    title: '2. The Renaissance Spark & Humanist Rebirth',
    instruction: 'Adjust the Trade Wealth and Classical Manuscripts sliders to witness the awakening of rational enquiry in Florence.',
    interactionType: 'slider-renaissance',
    nodeId: NODE_C9_HISTCIV_062,
  },
  {
    title: '3. Revolution in Cosmology & Vernacular Thought',
    instruction: 'Toggle between the Ptolemaic (Geocentric) and Copernican (Heliocentric) models of the cosmos.',
    interactionType: 'toggle-cosmology',
    nodeId: NODE_C9_HISTCIV_063,
  },
  {
    title: '4. The Reformation & Counter-Reformation Balance',
    instruction: 'Inspect the two faces of the Catholic response at the Council of Trent (Reform vs. Repression).',
    interactionType: 'click-counter-ref',
    nodeId: NODE_C9_HISTCIV_067,
  },
  {
    title: '5. The Industrial Revolution & Social Dialectic',
    instruction: 'Move the Mechanisation slider to observe the growth of factory output, bourgeois capital, and worker hardship.',
    interactionType: 'slider-industrial',
    nodeId: NODE_C9_HISTCIV_068,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Gutenberg\'s printing press had NOT been invented around 1440, what would have happened to Luther\'s 95 Theses in 1517?',
    options: [
      'They would have circulated just as quickly by royal messengers',
      'They likely would have remained a localized academic dispute in Saxony',
      'The Pope would have immediately resigned without hearing of them',
      'All of Europe would have converted to German within two weeks',
    ],
    correctIndex: 1,
    verifyInstruction: 'Notice how the printing press multiplier was the crucial technological engine of mass distribution.',
    nodeId: NODE_C9_HISTCIV_066,
  },
  {
    question: 'Predict: What happens when steam-powered factory automation increases without labour welfare regulations?',
    options: [
      'Factory owners get poorer while workers work only 2 hours a day',
      'Capital accumulates with factory owners while worker shifts stretch to 14-16 hours in hazardous slums',
      'All factories voluntarily close to promote village agriculture',
      'Serfdom is immediately restored across Europe',
    ],
    correctIndex: 1,
    verifyInstruction: 'Observe the divergence between Bourgeois profit and Proletariat hardship on the factory gauge.',
    nodeId: NODE_C9_HISTCIV_068,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the architectural structure of Fatehpur Sikri?',
    observableOptions: [
      'It uses only European Gothic stained glass windows',
      'It blends Islamic arches and domes with traditional Hindu pillars, lintels, and lotus motifs',
      'It is constructed entirely of English iron rails with zero stone carving',
      'It has no Indian architectural elements whatsoever',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_HISTCIV_061,
  },
  {
    question: 'What pattern emerges when comparing Robert Owen\'s New Lanark and Karl Marx\'s Communist Manifesto?',
    observableOptions: [
      'Both rejected machines and advocated returning to hunting-gathering',
      'Owen believed in voluntary moral reform through model villages, whereas Marx analyzed revolutionary class struggle',
      'Marx worked as a factory manager in Scotland while Owen wrote Das Kapital in London',
      'Neither thinker addressed the conditions of factory workers',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_HISTCIV_069,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'The Modern Legacy Investigator',
  description: 'Identify 3 visible traces of these historic epochs in your modern city: an Indo-Islamic architectural monument, a printed vernacular newspaper, or labour welfare rights (like the 8-hour workday).',
  steps: [
    'Observe a historical building or local shrine for syncretic architectural fusion (arches, jali, chhajjas).',
    'Examine how vernacular languages (Hindi, Bengali, Tamil, etc.) serve mass communication today, carrying forward the Renaissance/Bhakti spirit.',
    'Trace how modern factory labour laws and weekend holidays trace back to responses to the Sadler Committee and early socialist movements.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C9_HistoryCivicsCompositeCultureFactorsSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C9_HISTCIV_061,
    title = DEFAULT_PROPS.title || 'Epochs of Transformation',
    misconceptions = DEFAULT_PROPS.misconceptions,
    diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['histciv'] || { name: 'History & Civics', emoji: '📜', color: 'amber' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery Hook State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Guided Exploration State
  const [selectedCultureDomain, setSelectedCultureDomain] = useState<'language' | 'music' | 'architecture'>('language');
  const [tradeWealthSlider, setTradeWealthSlider] = useState(60);
  const [manuscriptsSlider, setManuscriptsSlider] = useState(70);
  const [cosmologyModel, setCosmologyModel] = useState<'geocentric' | 'heliocentric'>('heliocentric');
  const [counterRefFace, setCounterRefFace] = useState<'reform' | 'repression'>('reform');
  const [mechanisationLevel, setMechanisationLevel] = useState(50);

  // Predict & Observation State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Challenge Adaptive Engine State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Challenge Interaction State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Non-MCQ State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered Challenges based on adaptive mastery
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT adaptive effect
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff: 'foundation' | 'standard' | 'advanced' =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // HTML5 Canvas continuous animation for challenge mode
  useEffect(() => {
    if (phase !== 'challenge' && phase !== 'explore' && phase !== 'sandbox') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw historical timeline ribbon
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#f59e0b');
      gradient.addColorStop(0.5, '#6366f1');
      gradient.addColorStop(1, '#10b981');
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(10, 20);
      ctx.lineTo(canvas.width - 10, 20);
      ctx.stroke();

      // Pulsing node dots
      const numDots = 5;
      for (let i = 0; i < numDots; i++) {
        const x = 20 + (i * (canvas.width - 40)) / (numDots - 1);
        const radius = 4 + Math.sin(frame * 0.05 + i) * 1.5;
        ctx.beginPath();
        ctx.arc(x, 20, Math.max(1, radius), 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#fbbf24' : '#818cf8';
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // Clean inactivity timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── CALLBACKS ───

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        if (challenge.hints && challenge.hints[0]) {
          setCurrentHint(challenge.hints[0]);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak(challenge.hints[0]);
        }
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, challenge]);

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
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb! Copernicus calculated heliocentrism with mathematics.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratory. Let us explore how these great transformations unfolded.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with historical variables with zero pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode initiated. Let us put your understanding to the test!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test and verify the outcome on the visualization.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp historical observation!' : 'Examine the visual details closely.');
  }, []);

  const handleCultureDomainSelect = useCallback((domain: 'language' | 'music' | 'architecture') => {
    setSelectedCultureDomain(domain);
    audioManager.play('tap');
    if (domain === 'language') speechManager.speak('Hindi and Urdu grew through Sanskrit Prakrit interacting with Persian and Arabic.');
    if (domain === 'music') speechManager.speak('Amir Khusrau blended Persian melodies with Indian ragas to create Qawwali.');
    if (domain === 'architecture') speechManager.speak('Fatehpur Sikri combines Islamic domes with Hindu pillars and lotus carvings.');
  }, []);

  const handleCosmologyToggle = useCallback((model: 'geocentric' | 'heliocentric') => {
    setCosmologyModel(model);
    audioManager.play('pop');
    if (model === 'heliocentric') {
      speechManager.speak('Copernicus placed the Sun at the center in 1543, overturning Ptolemy\'s thousand-year geocentric model.');
    }
  }, []);

  const handleCounterRefToggle = useCallback((face: 'reform' | 'repression') => {
    setCounterRefFace(face);
    audioManager.play('tap');
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
    speechManager.speak('Outstanding work! You have completed the exploration of Composite Culture and Early Modern Europe.');
  }, [errors, onComplete]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
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
      speechManager.speak('Correct! Excellent historical reasoning.');
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
        speechManager.speak('Let us review the historical facts together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(bktStateRef.current));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

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

  // Derived calculations
  const humanistIndex = useMemo(() => {
    return Math.round((tradeWealthSlider * 0.5) + (manuscriptsSlider * 0.5));
  }, [tradeWealthSlider, manuscriptsSlider]);

  const bourgeoisProfit = useMemo(() => {
    return Math.round(mechanisationLevel * 1.8);
  }, [mechanisationLevel]);

  const workerBurdenHours = useMemo(() => {
    return Math.round(10 + (mechanisationLevel / 100) * 6);
  }, [mechanisationLevel]);

  // Motivational feedback helper
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors >= 1 && errors <= 3) return 'Great work!';
    if (errors >= 4 && errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* Simulation Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 15, scale: 1.2 }}
            className="text-3xl p-2 bg-amber-500/10 rounded-2xl border border-amber-500/30"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs sm:text-sm text-slate-400">Class 9 ICSE Humanities • Composite Culture & Modern Europe</p>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <span
              key={p}
              className={`px-3 py-1 rounded-xl capitalize font-bold transition-all ${
                phase === p ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-500'
              }`}
            >
              {p}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Mini animated canvas ribbon */}
      <canvas ref={canvasRef} width={600} height={36} className="w-full mb-4 rounded-xl opacity-80" />

      {/* ──────────────────────────────────────────────────────────
          PHASE 1: DISCOVERY HOOK
      ────────────────────────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Narrative Scenario Box */}
          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-gold-950/40 rounded-3xl border border-amber-700/40 shadow-inner">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🏛️</span> Historical Investigation Scenario
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-amber-300/80 mt-3 font-medium bg-amber-950/60 p-3 rounded-xl border border-amber-900/50">
              💡 {SCENARIO.context}
            </p>
          </div>

          {/* Curiosity Hook Card */}
          <div className="p-6 bg-slate-800/70 rounded-3xl border border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                Discovery Curiosity Hook
              </span>
              <span className="text-xs text-slate-400">Ungraded • Think & Hypothesize</span>
            </div>

            <h3 className="text-lg font-semibold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`p-4 rounded-2xl text-left text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                      : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-amber-500/60 hover:bg-slate-850'
                  }`}
                  aria-label={`Option ${i + 1}: ${opt}`}
                >
                  <span className="font-bold text-amber-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="text-sm">
                  <p className={discoveryCorrect ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {discoveryCorrect ? '✓ Spot on!' : '✕ Great attempt!'}
                  </p>
                  <p className="text-slate-300 text-xs mt-1">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black rounded-2xl shadow-lg hover:brightness-110 shrink-0"
                  aria-label="Begin Interactive Exploration"
                >
                  Launch Interactive Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ──────────────────────────────────────────────────────────
          PHASE 2: INTERACTIVE GUIDED EXPLORATION
      ────────────────────────────────────────────────────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.25 }}
              className="p-6 bg-slate-800/80 rounded-3xl border border-slate-700 space-y-5"
            >
              {/* Slide Step Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <span className="text-xs text-slate-400 font-mono">Node: {EXPLORATION_STEPS[currentSlide].nodeId}</span>
              </div>

              <h2 className="text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
              <p className="text-sm text-amber-300/90 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>

              {/* ── LAB VISUALIZATIONS BASED ON SLIDE INDEX ── */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 min-h-[320px]">
                {/* STEP 0: COMPOSITE CULTURE MATRIX */}
                {currentSlide === 0 && (
                  <div className="space-y-5">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {(['language', 'music', 'architecture'] as const).map((d) => (
                        <motion.button
                          key={d}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCultureDomainSelect(d)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                            selectedCultureDomain === d
                              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg'
                              : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                          }`}
                          aria-label={`Select domain ${d}`}
                        >
                          {d}
                        </motion.button>
                      ))}
                    </div>

                    <svg viewBox="0 0 600 240" className="w-full h-auto bg-slate-900/60 rounded-xl p-2">
                      {/* Left Sphere: Indigenous/Hindu Tradition */}
                      <circle cx="170" cy="120" r="70" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                      <text x="140" y="80" fill="#fbbf24" fontSize="12" fontWeight="bold">Prakrit / Sanskrit</text>
                      <text x="140" y="100" fill="#cbd5e1" fontSize="10">Ragas & Mandapa</text>

                      {/* Right Sphere: Persian/Islamic Tradition */}
                      <circle cx="430" cy="120" r="70" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />
                      <text x="400" y="80" fill="#818cf8" fontSize="12" fontWeight="bold">Persian / Arabic</text>
                      <text x="400" y="100" fill="#cbd5e1" fontSize="10">Domes & Arches</text>

                      {/* Central Intersection: Syncretic Synthesis */}
                      <ellipse cx="300" cy="120" rx="90" ry="75" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="3" />
                      <text x="300" y="105" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="black">
                        COMPOSITE SYNTHESIS
                      </text>

                      {selectedCultureDomain === 'language' && (
                        <g>
                          <text x="300" y="130" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Hindi & Hindavi</text>
                          <text x="300" y="148" textAnchor="middle" fill="#94a3b8" fontSize="9">Kabir Dohas (Mixed Lexicon)</text>
                        </g>
                      )}
                      {selectedCultureDomain === 'music' && (
                        <g>
                          <text x="300" y="130" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Qawwali & Sitar</text>
                          <text x="300" y="148" textAnchor="middle" fill="#94a3b8" fontSize="9">Amir Khusrau Melodic Fusion</text>
                        </g>
                      )}
                      {selectedCultureDomain === 'architecture' && (
                        <g>
                          <text x="300" y="130" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Fatehpur Sikri</text>
                          <text x="300" y="148" textAnchor="middle" fill="#94a3b8" fontSize="9">Dome + Chhajja & Lotus Pillars</text>
                        </g>
                      )}
                    </svg>
                  </div>
                )}

                {/* STEP 1: RENAISSANCE CAUSAL ACCELERATOR */}
                {currentSlide === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <label className="text-xs text-slate-300 font-bold block mb-1">
                          Mediterranean Trade Wealth (Medici): {tradeWealthSlider}%
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={tradeWealthSlider}
                          onChange={(e) => setTradeWealthSlider(Number(e.target.value))}
                          className="w-full accent-amber-500"
                          aria-label="Set Trade Wealth"
                        />
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <label className="text-xs text-slate-300 font-bold block mb-1">
                          Classical Manuscripts Recovered (1453): {manuscriptsSlider}%
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={manuscriptsSlider}
                          onChange={(e) => setManuscriptsSlider(Number(e.target.value))}
                          className="w-full accent-gold-500"
                          aria-label="Set Classical Manuscripts"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-700 flex flex-col items-center">
                      <p className="text-xs uppercase font-bold text-slate-400">Humanist Awakening Index</p>
                      <p className="text-3xl font-black text-amber-400 my-1">{humanistIndex} / 100</p>
                      <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-gold-500 via-amber-500 to-emerald-500"
                          animate={{ width: `${humanistIndex}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-300 mt-2 text-center">
                        {humanistIndex > 70
                          ? '🌟 Flourishing Renaissance: Artists and thinkers openly challenge Church authority using reason and empirical observation!'
                          : '⏳ Dormant Intellectual Climate: Learning remains heavily restricted to medieval monasteries.'}
                      </p>
                    </div>
                  </div>
                )}

                {/* STEP 2: REVOLUTION IN COSMOLOGY (Predict-Then-Check) */}
                {currentSlide === 2 && (
                  <div className="space-y-4">
                    {!predictionMade ? (
                      <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-700/50">
                        <p className="text-xs font-bold text-gold-300 uppercase mb-2">Predict-Then-Check Hook</p>
                        <p className="text-sm text-white mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="space-y-2">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handlePrediction(i)}
                              className="w-full text-left p-2.5 rounded-xl text-xs bg-slate-900 border border-slate-700 text-slate-200 hover:border-amber-400"
                              aria-label={`Prediction Option ${i + 1}`}
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCosmologyToggle('geocentric')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                              cosmologyModel === 'geocentric'
                                ? 'bg-rose-950 text-rose-300 border-rose-500'
                                : 'bg-slate-900 text-slate-400 border-slate-800'
                            }`}
                            aria-label="Ptolemaic Geocentric Model"
                          >
                            Ptolemaic (Geocentric)
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCosmologyToggle('heliocentric')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                              cosmologyModel === 'heliocentric'
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                                : 'bg-slate-900 text-slate-400 border-slate-800'
                            }`}
                            aria-label="Copernican Heliocentric Model"
                          >
                            Copernican (Heliocentric 1543)
                          </motion.button>
                        </div>

                        <svg viewBox="0 0 400 200" className="w-full h-auto bg-slate-900/80 rounded-xl">
                          {cosmologyModel === 'geocentric' ? (
                            <g>
                              {/* Earth at center */}
                              <circle cx="200" cy="100" r="18" fill="#3b82f6" />
                              <text x="200" y="104" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">Earth</text>
                              <circle cx="200" cy="100" r="50" fill="none" stroke="#64748b" strokeDasharray="3 3" />
                              <circle cx="200" cy="100" r="80" fill="none" stroke="#64748b" strokeDasharray="3 3" />
                              <circle cx="245" cy="80" r="10" fill="#f59e0b" />
                              <text x="245" y="83" textAnchor="middle" fill="#ffffff" fontSize="6">Sun</text>
                              <text x="200" y="185" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">
                                Church Dogma: Earth motionless at center of creation
                              </text>
                            </g>
                          ) : (
                            <g>
                              {/* Sun at center */}
                              <circle cx="200" cy="100" r="22" fill="#f59e0b" />
                              <text x="200" y="104" textAnchor="middle" fill="#000000" fontSize="9" fontWeight="black">SUN</text>
                              <circle cx="200" cy="100" r="55" fill="none" stroke="#10b981" strokeDasharray="4 4" />
                              <circle cx="200" cy="100" r="85" fill="none" stroke="#10b981" strokeDasharray="4 4" />
                              <circle cx="240" cy="135" r="8" fill="#3b82f6" />
                              <text x="240" y="137" textAnchor="middle" fill="#ffffff" fontSize="6">Earth</text>
                              <text x="200" y="185" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
                                Copernicus (1543): Planets revolve around the Sun (Math & Data)
                              </text>
                            </g>
                          )}
                        </svg>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 3: COUNTER-REFORMATION DUAL FACES */}
                {currentSlide === 3 && (
                  <div className="space-y-4">
                    <div className="flex justify-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCounterRefToggle('reform')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                          counterRefFace === 'reform'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-md'
                            : 'bg-slate-900 text-slate-400 border-slate-700'
                        }`}
                        aria-label="Inspect Reform Face"
                      >
                        🕊️ Reform Face (Council of Trent & Jesuits)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCounterRefToggle('repression')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                          counterRefFace === 'repression'
                            ? 'bg-rose-950 text-rose-300 border-rose-500 shadow-md'
                            : 'bg-slate-900 text-slate-400 border-slate-700'
                        }`}
                        aria-label="Inspect Repressive Face"
                      >
                        ⚔️ Repressive Face (Inquisition & Index)
                      </motion.button>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      {counterRefFace === 'reform' ? (
                        <div className="space-y-2 text-xs text-slate-200">
                          <p className="font-bold text-emerald-400 text-sm">✓ Internal Institutional Cleansing:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li><strong className="text-white">Abolition of Indulgence Sales:</strong> Council of Trent (1545–1563) outlawed the commercial selling of salvation certificates.</li>
                            <li><strong className="text-white">Clerical Discipline:</strong> Bishops required to reside in their dioceses; establishment of training seminaries.</li>
                            <li><strong className="text-white">Jesuit Education & Missions:</strong> Ignatius of Loyola (1540) founded colleges; St. Francis Xavier arrived in Goa (1542).</li>
                          </ul>
                        </div>
                      ) : (
                        <div className="space-y-2 text-xs text-slate-200">
                          <p className="font-bold text-rose-400 text-sm">✗ Ideological Suppression & Control:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li><strong className="text-white">The Roman Inquisition (1542):</strong> Tribunals established to arrest and prosecute accused heretics.</li>
                            <li><strong className="text-white">Index Librorum Prohibitorum (1559):</strong> Formal list of prohibited books banned from Catholic readership.</li>
                            <li><strong className="text-white">Strict Doctrinal Reaffirmation:</strong> Reasserted all 7 sacraments and dual scripture+tradition authority.</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 4: INDUSTRIAL REVOLUTION FACTORY GAUGE */}
                {currentSlide === 4 && (
                  <div className="space-y-4">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-300 font-bold block mb-1">
                        Factory Steam Mechanisation Level (Watt Engine): {mechanisationLevel}%
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={mechanisationLevel}
                        onChange={(e) => setMechanisationLevel(Number(e.target.value))}
                        className="w-full accent-amber-500"
                        aria-label="Set Mechanisation Level"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Bourgeoisie Card */}
                      <div className="p-4 bg-emerald-950/30 rounded-xl border border-emerald-800/50">
                        <p className="text-xs font-bold text-emerald-400 uppercase">Bourgeoisie Mill Owners</p>
                        <p className="text-2xl font-black text-emerald-300 mt-1">₹ {bourgeoisProfit}k Capital Gain</p>
                        <p className="text-xs text-slate-400 mt-1">Reinvesting profits from colonial cotton and machine speedup.</p>
                      </div>

                      {/* Proletariat Card */}
                      <div className="p-4 bg-rose-950/30 rounded-xl border border-rose-800/50">
                        <p className="text-xs font-bold text-rose-400 uppercase">Proletariat Mill Workers</p>
                        <p className="text-2xl font-black text-rose-300 mt-1">{workerBurdenHours} hrs/day shift</p>
                        <p className="text-xs text-slate-400 mt-1">Sadler Committee (1832) reported child labour from age 7.</p>
                      </div>
                    </div>

                    {mechanisationLevel > 40 && !observationAnswered && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-slate-900 rounded-xl border border-amber-700/60">
                        <p className="text-xs font-bold text-amber-300 mb-2">{OBSERVATION_QUESTIONS[1].question}</p>
                        <div className="space-y-1">
                          {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleObservation(i)}
                              className="w-full text-left p-2 rounded-lg text-xs bg-slate-950 border border-slate-800 text-slate-300 hover:border-amber-400"
                              aria-label={`Observation Option ${i + 1}`}
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={currentSlide === 0}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('pop');
                  }}
                  className="px-4 py-2 bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                  aria-label="Previous Slide"
                >
                  ← Previous
                </motion.button>

                <div className="flex gap-1">
                  {EXPLORATION_STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all ${
                        currentSlide === i ? 'w-6 bg-amber-500' : 'w-2 bg-slate-750'
                      }`}
                    />
                  ))}
                </div>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('pop');
                    }}
                    className="px-4 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-gold-500"
                    aria-label="Next Slide"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-lg hover:bg-emerald-500"
                    aria-label="Open Free Exploration Sandbox"
                  >
                    Explore in Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ──────────────────────────────────────────────────────────
          PHASE 3: SANDBOX / FREE EXPLORATION
      ────────────────────────────────────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-800 rounded-3xl border border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-amber-400">Interactive History Sandbox</h2>
              <span className="text-xs px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                Free Exploration • Zero Grading
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Manipulate Renaissance trade capital and industrial steam automation side by side to see how early modern transformations built upon each other.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="space-y-2">
                <label className="text-xs text-slate-300 font-bold block">
                  1. Mediterranean Mercantile Capital (Medici): {tradeWealthSlider}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={tradeWealthSlider}
                  onChange={(e) => setTradeWealthSlider(Number(e.target.value))}
                  className="w-full accent-amber-500"
                  aria-label="Sandbox Trade Wealth"
                />
                <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300">
                  {tradeWealthSlider > 50 ? '🎨 Scholars, architects, and painters receive abundant Medici patronage.' : '🔒 Feudal agrarian constraints dominate.'}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-300 font-bold block">
                  2. Steam Powered Machinery (Watt 1769): {mechanisationLevel}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={mechanisationLevel}
                  onChange={(e) => setMechanisationLevel(Number(e.target.value))}
                  className="w-full accent-gold-500"
                  aria-label="Sandbox Mechanisation"
                />
                <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300">
                  {mechanisationLevel > 50 ? '🏭 Rapid urbanization in Manchester; rising demand for socialist worker protections.' : '🧵 Traditional cottage handloom production.'}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-black rounded-2xl shadow-xl hover:brightness-110"
                aria-label="Proceed to Challenges"
              >
                Ready for ICSE Challenges! →
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ───────────────���──────────────────────────────────────────
          PHASE 4: ADAPTIVE CHALLENGE SYSTEM
      ────────────────────────────────────────────────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Top Bar */}
          <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <p className="text-xs text-amber-400 font-mono">Competency: {challenge.competencyLevel.toUpperCase()}</p>
            </div>

            {/* Dynamic Adaptive Difficulty Badge */}
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-600'
                  : difficulty === 'advanced'
                  ? 'bg-rose-950 text-rose-400 border-rose-600'
                  : 'bg-gold-950 text-gold-400 border-gold-600'
              }`}
            >
              Tier: {difficulty}
            </motion.span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-gold-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Challenge Card */}
          <div
            className={`p-6 rounded-3xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-800/90 border-slate-700'
            }`}
          >
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 leading-snug">
              {challenge.question}
            </h3>

            {/* 1. MCQ (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    disabled={showExplanation || answerRevealed}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left p-4 rounded-2xl text-sm transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold'
                        : wrongFlash
                        ? 'bg-rose-900/60 border-rose-500 text-rose-100'
                        : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-amber-400 hover:bg-slate-850'
                    }`}
                    aria-label={`Option ${i + 1}: ${opt}`}
                  >
                    <span className="font-bold text-amber-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* 2. Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">Drag label badges into their corresponding pioneer slots:</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-gold-700 hover:bg-gold-600 text-white text-xs font-bold rounded-xl cursor-grab active:cursor-grabbing shadow-md"
                      role="button"
                      aria-label={`Drag item ${item.label}`}
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {[
                    { id: 'slot_davinci', title: 'Leonardo da Vinci' },
                    { id: 'slot_shake', title: 'William Shakespeare' },
                    { id: 'slot_copern', title: 'Nicolaus Copernicus' },
                  ].map((slot) => (
                    <div
                      key={slot.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(slot.id)}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 min-h-[90px] flex flex-col justify-center items-center text-center"
                    >
                      <span className="text-xs font-black text-amber-400 mb-1">{slot.title}</span>
                      <span className="text-xs text-slate-300 font-medium">
                        {droppedLabels[slot.id] || 'Drop label here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={showExplanation}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow-md"
                  aria-label="Check Drag-and-Drop Mapping"
                >
                  Verify Mapping
                </motion.button>
              </div>
            )}

            {/* 3. Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag or shift rows to establish the correct historical chronology:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => handleDragStart(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 flex items-center justify-between cursor-grab"
                    >
                      <span>
                        <strong className="text-amber-400 mr-2">{displayIdx + 1}.</strong> {item}
                      </span>
                      <span className="text-slate-500 text-xs">↕ Drag</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={showExplanation}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow-md"
                  aria-label="Check Chronological Order"
                >
                  Verify Chronology
                </motion.button>
              </div>
            )}

            {/* 4. Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="e.g. 1517"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm w-40 focus:border-amber-400 outline-none"
                    aria-label="Enter numerical year"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={showExplanation || !numericInput}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow-md"
                    aria-label="Check Numeric Answer"
                  >
                    Submit Year
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. Construct Challenge */}
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
                      className="px-3 py-1.5 bg-gold-700 text-white text-xs font-bold rounded-xl"
                      aria-label={`Add part ${part}`}
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-700 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-3 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1">
                      {part}
                      <button
                        onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))}
                        className="text-slate-900 hover:text-red-700 font-black ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click blocks above to construct the causal sequence</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={showExplanation || constructParts.length === 0}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow-md"
                  aria-label="Verify Construction"
                >
                  Verify Chain
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation Disclosure */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 rounded-2xl bg-amber-950/40 border border-amber-600/50 space-y-3"
              >
                <p className="text-amber-300 font-bold text-xs uppercase tracking-wider">
                  📖 Step-by-Step Historical Breakdown:
                </p>

                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      <strong className="text-amber-400 mr-1.5">{idx + 1}.</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-1.5 bg-amber-600/60 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                    aria-label="Show Next Explanation Step"
                  >
                    Reveal Next Detail →
                  </motion.button>
                )}

                {revealedSteps >= challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="mt-3 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg block"
                    aria-label="Proceed to Next Challenge"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Epoch Review →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ────────────────────────────���─────────────────────────────
          PHASE 5: COMPLETION & MASTERY SUMMARY
      ────────────────────────────────────────────────────────── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-gold-950/40 rounded-3xl border border-emerald-500/40 text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Epoch Mastery Achieved!</h2>
            
            {/* Motivational Feedback Banner */}
            <div className="py-2 px-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 inline-block">
              <p className="text-lg sm:text-xl font-black text-amber-300 tracking-wide">
                {motivationalMessage}
              </p>
            </div>

            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have analyzed the syncretic fusion of medieval India, the Renaissance awakening, the Reformation upheaval, and the Industrial Revolution.
            </p>

            <div className="flex flex-wrap justify-center gap-4 py-2">
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 min-w-[120px]">
                <p className="text-xs text-slate-400">Score</p>
                <p className="text-2xl font-black text-amber-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 min-w-[120px]">
                <p className="text-xs text-slate-400">Mastery Level</p>
                <p className="text-2xl font-black text-emerald-400 capitalize">{masteryLevel}</p>
              </div>
            </div>
          </div>

          {/* Misconception Diagnostic Feedback */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-3xl border border-rose-800/50 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider">
                🎯 Target Review (Misconceptions Encountered):
              </h3>
              {hitMisconceptions.map((mIdx, i) => {
                const m = misconceptions?.[mIdx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Historical Truth: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real World Activity */}
          <div className="p-6 bg-slate-800/80 rounded-3xl border border-slate-700 space-y-3">
            <h3 className="text-base font-bold text-amber-400">📍 {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i}>{st}</li>
              ))}
            </ul>
          </div>

          {/* Spaced Repetition Notification */}
          <div className="p-4 bg-amber-950/40 rounded-2xl border border-amber-800/50 text-xs text-slate-300 flex items-center justify-between">
            <span>
              📅 <strong>Spaced Repetition:</strong> Next review scheduled in{' '}
              <span className="text-amber-400 font-bold">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>.
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('discovery');
                setCurrentSlide(0);
                setCurrentChallenge(0);
                setErrors(0);
                setDiscoveryAnswered(false);
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold"
              aria-label="Replay Simulation"
            >
              Restart Simulation ↺
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Persistent Feedback Elements */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Milestone Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_HistoryCivicsCompositeCultureFactorsSim;
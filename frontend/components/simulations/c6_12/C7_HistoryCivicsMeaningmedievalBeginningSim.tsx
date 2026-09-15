'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERALS ───
const NODE_C7_HISTCIV_001 = 'c7_histciv_001';
const NODE_C7_HISTCIV_002 = 'c7_histciv_002';
const NODE_C7_HISTCIV_003 = 'c7_histciv_003';
const NODE_C7_HISTCIV_004 = 'c7_histciv_004';
const NODE_C7_HISTCIV_005 = 'c7_histciv_005';
const NODE_C7_HISTCIV_006 = 'c7_histciv_006';
const NODE_C7_HISTCIV_007 = 'c7_histciv_007';
const NODE_C7_HISTCIV_008 = 'c7_histciv_008';
const NODE_C7_HISTCIV_009 = 'c7_histciv_009';
const NODE_C7_HISTCIV_010 = 'c7_histciv_010';

const ALL_NODE_IDS = [
  NODE_C7_HISTCIV_001,
  NODE_C7_HISTCIV_002,
  NODE_C7_HISTCIV_003,
  NODE_C7_HISTCIV_004,
  NODE_C7_HISTCIV_005,
  NODE_C7_HISTCIV_006,
  NODE_C7_HISTCIV_007,
  NODE_C7_HISTCIV_008,
  NODE_C7_HISTCIV_009,
  NODE_C7_HISTCIV_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Medieval Crossroads: Europe & the Arab World (476 CE – 1453 CE)',
  intro: 'You are an archivist and cartographer for the UNESCO Historical Commission in New Delhi. A vault of ancient scrolls, imperial decrees, and archaeological records has been unearthed. Your mission is to reconstruct how the ancient classical world dissolved and gave birth to the medieval era across Mediterranean Europe and the Arabian peninsula.',
  context: 'Investigate how the fall of Rome, the rise of Christianity under Constantine, monastic preservation of knowledge, the Crusades, and the socio-religious transformations in pre-Islamic Arabia and Mecca forged the medieval world.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'When people hear "medieval period", they often assume it began everywhere on Earth at the exact same moment. Does the medieval period start at the same date in Europe and in India?',
  options: [
    'Yes — 476 CE is the universal global start date across all continents',
    'No — Europe traces it to 476 CE (fall of Western Rome), while India traces it to the 8th century CE (Arab conquest of Sindh, 712 CE)',
    'Yes — both start in 1206 CE with the establishment of the Delhi Sultanate',
    'No — India started in 261 BCE with Emperor Ashoka',
  ],
  correctIndex: 1,
  hintAfter: 'Periodisation is an interpretive tool created by historians! Civilisations cross boundaries based on regional transformations.',
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C7_HISTCIV_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the literal Latin origin and meaning of the word "medieval"?',
    options: [
      'From "magna via", meaning the great journey',
      'From "medium aevum", meaning middle age',
      'From "militaris aevum", meaning age of war',
      'From "monasterium", meaning the age of monks',
    ],
    correctIndex: 1,
    explanation: 'The word "medieval" comes from the Latin "medium aevum" meaning "middle age", coined by 14th-century Renaissance humanists like Petrarch to denote the period between classical antiquity and their own modern era.',
    hints: [
      'Think of words like "median" or "medium" and "aeon".',
      'It literally refers to an age situated in between two others.',
      'Latin "medium" = middle, and "aevum" = age or era.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C7_HISTCIV_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Where was Jesus born, and under which Roman client king was Judea ruled at the time?',
    options: [
      'Nazareth, under Herod Antipas (c. 30 CE)',
      'Bethlehem, under Herod the Great (c. 4 BCE)',
      'Jerusalem, under Pontius Pilate (c. 26 CE)',
      'Alexandria, under Julius Caesar (c. 44 BCE)',
    ],
    correctIndex: 1,
    explanation: 'Jesus was born in Bethlehem around 4 BCE during the reign of Roman client king Herod the Great (37–4 BCE), and was raised in Nazareth in Galilee.',
    hints: [
      'Do not confuse the birthplace in Judea with his childhood home in Galilee.',
      'Herod the Great died in 4 BCE; Jesus was born in his final years.',
      'Bethlehem is the birthplace; Herod the Great was the client king.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C7_HISTCIV_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In Jesus\'s teachings, what is the true nature of the "Kingdom of God"?',
    options: [
      'A military insurrection to drive the Romans out of Jerusalem',
      'A political monarchy establishing an earthly Jewish empire with taxation and armies',
      'A spiritual community of people living under God\'s will through love, mercy, and service',
      'A monastic palace built exclusively for priests and scribes',
    ],
    correctIndex: 2,
    explanation: 'Jesus explicitly affirmed ("My kingdom is not of this world") that the Kingdom of God is a spiritual reality — an invisible community of righteous living — rather than a political empire.',
    hints: [
      'Remember Jesus\'s words to Pontius Pilate about his kingdom.',
      'It rejects territorial armies, taxation, and worldly thrones.',
      'It is an inner spiritual community founded on love, justice, and compassion.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04',
    nodeId: NODE_C7_HISTCIV_005,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What crucial legal change was enacted by Emperor Constantine\'s Edict of Milan in 313 CE?',
    options: [
      'It made Christianity the sole mandatory official religion of Rome and banned paganism',
      'It granted universal religious tolerance, ending state persecutions and legalising Christian worship',
      'It ordered the immediate dissolution of the Roman Senate',
      'It established the Papacy as the supreme political government of Western Europe',
    ],
    correctIndex: 1,
    explanation: 'The Edict of Milan (313 CE) granted religious tolerance and restored confiscated property. It was Emperor Theodosius I in 380 CE (Edict of Thessalonica) who made Christianity the sole official religion.',
    hints: [
      'Tolerance means "legal freedom to worship", not "forced state religion".',
      'Constantine legalized Christianity; Theodosius made it the official religion.',
      'Look for the option that emphasizes religious toleration and property restoration.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C7_HISTCIV_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which event in 476 CE marks the conventional end of the Western Roman Empire?',
    options: [
      'Alaric the Visigoth burning Rome to ashes completely',
      'The Germanic chieftain Odoacer deposing the last western emperor Romulus Augustulus',
      'Genseric the Vandal drowning the Roman Senate in the Tiber',
      'The coronation of Charlemagne by Pope Leo III',
    ],
    correctIndex: 1,
    explanation: 'In 476 CE, the Germanic chieftain Odoacer deposed the boy emperor Romulus Augustulus and chose not to crown a successor, bringing an end to the western imperial line.',
    hints: [
      'It was a quiet deposition of a boy emperor, not a catastrophic fire.',
      'The key figures are Odoacer and Romulus Augustulus.',
      '476 CE terminated the succession of Western Roman emperors.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_06',
    nodeId: NODE_C7_HISTCIV_009,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What does the Arabic term "Jahiliyyah" signify regarding pre-Islamic Arabia?',
    options: [
      'An era of complete technological savagery and lack of language',
      'The "Age of Ignorance", meaning the absence of divine guidance and monotheistic ethics',
      'A period of foreign Persian colonial military occupation',
      'A golden age of unified democratic republican governance',
    ],
    correctIndex: 1,
    explanation: 'Jahiliyyah translates to "Age of Ignorance" in Islamic terminology. It denotes the absence of divine monotheistic moral guidance, despite the presence of rich poetry, trade, and customary traditions.',
    hints: [
      'It does not mean primitive savagery — pre-Islamic Arabs had rich poetry like the Mu\'allaqat.',
      'It refers to moral and spiritual ignorance of divine law.',
      'Look for "Age of Ignorance" regarding ethics and monotheism.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_07',
    nodeId: NODE_C7_HISTCIV_010,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Arrange the sequence of guardians who cared for Prophet Muhammad during his early life in chronological order:',
    sortItems: [
      'Father Abdullah (died before his birth in 570 CE)',
      'Mother Aminah (cared for him until her death at his age 6)',
      'Grandfather Abdul Muttalib (cared for him until his death at age 8)',
      'Uncle Abu Talib (head of Banu Hashim, raised him to adulthood)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The chain of guardianship was: Father Abdullah (pre-birth), Mother Aminah (till age 6), Grandfather Abdul Muttalib (till age 8 / 578 CE), and Uncle Abu Talib.',
    hints: [
      'Start with the parent who passed before his birth.',
      'Mother Aminah is followed by the paternal grandfather.',
      'Uncle Abu Talib was his lifelong protector into adulthood.',
    ],
  },
  {
    id: 'ch_08',
    nodeId: NODE_C7_HISTCIV_001,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Sort the historical sources for the medieval transition into Literary Evidence vs Archaeological Evidence:',
    dragItems: [
      { label: 'The Chachnama (Sindh conquest text)', targetId: 'lit_box' },
      { label: 'Copper-plate Land Grants', targetId: 'lit_box' },
      { label: 'Coins of Muhammad bin Qasim', targetId: 'arch_box' },
      { label: 'Excavated Ruins of Brahmanabad', targetId: 'arch_box' },
    ],
    correctMapping: {
      lit_box: 'Copper-plate Land Grants',
      arch_box: 'Excavated Ruins of Brahmanabad',
    },
    explanation: 'Composed texts and written records (like the Chachnama and inscriptions) are literary evidence, whereas physical excavated structures and metallic coins are archaeological evidence.',
    hints: [
      'Texts and chronicles are written/literary sources.',
      'Physical excavated objects and coins are material/archaeological evidence.',
      'The Chachnama is literary; coins and ruins are archaeological.',
    ],
  },
  {
    id: 'ch_09',
    nodeId: NODE_C7_HISTCIV_002,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why do modern historians date Jesus\'s birth to roughly 6 to 4 BCE rather than the year 1 CE?',
    options: [
      'Roman emperors intentionally burned all birth registries in 100 CE',
      'The 6th-century monk Dionysius Exiguus made an arithmetic error when calculating the BC/AD calendar relative to Herod\'s death in 4 BCE',
      'Pontius Pilate falsified the tax documents during the census of Quirinius',
      'Jewish lunar calendars skipped leap centuries completely',
    ],
    correctIndex: 1,
    explanation: 'Dionysius Exiguus miscalculated the chronology of the Roman regnal years in the 6th century. Since Herod the Great died in 4 BCE and the Gospels record Jesus\'s birth during Herod\'s reign, the birth must have occurred around 6–4 BCE.',
    hints: [
      'Remember who invented the Anno Domini (AD) calendar system.',
      'Dionysius Exiguus calculated the timeline over 500 years after the events.',
      'Herod the Great died in 4 BCE, proving the birth occurred earlier.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_10',
    nodeId: NODE_C7_HISTCIV_004,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did the Jewish Sanhedrin hand Jesus over to Roman Prefect Pontius Pilate for execution rather than administering punishment themselves?',
    options: [
      'The Sanhedrin had abandoned all religious law and had no courts',
      'Under Roman provincial law, the local Sanhedrin lacked the legal power of capital punishment (ius gladii), and they framed Jesus as a political rebel against Caesar',
      'Pontius Pilate demanded to adopt Jesus into the Roman equestrian order',
      'The Pharisees wished to convert Pontius Pilate to early Christianity',
    ],
    correctIndex: 1,
    explanation: 'Judea was a Roman province where only the Roman prefect possessed the authority to carry out capital executions. Framing Jesus as claiming to be "King of the Jews" made it an offence of treason against Rome.',
    hints: [
      'Think about who held ultimate imperial power in occupied Judea.',
      'Capital punishment required the Roman governor\'s decree.',
      'The charges were framed politically to compel Roman intervention.',
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C7_HISTCIV_005,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why was the choice of Byzantium (renamed Constantinople in 330 CE) on the Bosporus strait militarily and economically superior to Old Rome?',
    options: [
      'It was inland and had no access to maritime trade or naval forces',
      'It commanded the choke point between the Black Sea and Mediterranean, controlled Asia-Europe overland routes, and had natural water defenses on three sides',
      'It was located in northern Gaul directly adjacent to Frankish allies',
      'It possessed massive silver mines that eliminated the need for taxation',
    ],
    correctIndex: 1,
    explanation: 'Constantinople possessed unmatched strategic advantages: surrounded by water on three sides (Golden Horn and Sea of Marmara) and controlling the vital maritime and overland trade corridors between Europe and Asia.',
    hints: [
      'Look at the geography of the Bosporus strait.',
      'Water on three sides provided supreme defensive capabilities.',
      'It stood at the literal intersection of Europe and Asian spice/silk trade.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C7_HISTCIV_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match the Germanic tribe to its historical achievement during the fall and transformation of Western Rome:',
    options: [
      'Franks under Clovis I: Sacked Rome in 410 CE',
      'Vandals under Genseric: Settled in Gaul and accepted Catholic baptism in 496 CE',
      'Franks under Clovis I: Settled in Gaul and converted to Catholic Christianity in 496 CE, creating a enduring alliance with the Church',
      'Visigoths under Alaric: Built a pirate fleet in North Africa and raided Britain',
    ],
    correctIndex: 2,
    explanation: 'Clovis I led the Franks to settle in Gaul (modern France) and converted to Catholic Christianity in 496 CE. Visigoths under Alaric sacked Rome in 410 CE, and Vandals under Genseric sacked Rome in 455 CE.',
    hints: [
      'Visigoths = Alaric (410 CE sack).',
      'Vandals = Genseric (455 CE sack from North Africa).',
      'Franks = Clovis I (Gaul settlement and 496 CE Catholic baptism).',
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C7_HISTCIV_007,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How do historians distinguish the Seljuk Turks from the Ottoman Turks in the medieval Mediterranean timeline?',
    options: [
      'The Ottomans fought at Manzikert in 1071 CE; the Seljuks took Constantinople in 1453 CE',
      'The Seljuk Turks were earlier (won Battle of Manzikert 1071 CE, triggering Crusades); the Ottoman Turks arose c. 1299 and conquered Constantinople in 1453 CE',
      'The Seljuks were Christian Crusaders from France; the Ottomans were from Egypt',
      'The Seljuks and Ottomans were identical dynasties ruling simultaneously from Venice',
    ],
    correctIndex: 1,
    explanation: 'The Seljuk Turks were dominant in the 11th–13th centuries and triggered the Crusades after Manzikert (1071 CE). The Ottoman Turks, founded around 1299 by Osman I, captured Constantinople in 1453 CE.',
    hints: [
      'Seljuks came first; Ottomans came two centuries later.',
      'Manzikert (1071) = Seljuks. Fall of Constantinople (1453) = Ottomans under Mehmed II.',
      'Do not conflate these two distinct Turkic dynasties.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_14',
    nodeId: NODE_C7_HISTCIV_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What was the core motto and daily principle of the Benedictine monastic rule established at Monte Cassino in 529 CE?',
    options: [
      '"Sola Scriptura" — Scripture reading only without any physical work',
      '"Ora et labora" — Pray and work (balancing communal prayer, study in scriptoria, and manual labour)',
      '"Veni, Vidi, Vici" — Conquer and rule the feudal barons',
      '"Lex Talionis" — An eye for an eye in monastic discipline',
    ],
    correctIndex: 1,
    explanation: 'Saint Benedict of Nursia established the rule with the motto "Ora et labora" (Pray and work) at Monte Cassino in 529 CE, insisting on a self-sufficient balance of prayer, intellectual copying, and agriculture.',
    hints: [
      'Latin for "Pray and Work".',
      'It rejected idleness and required monks to farm, heal, and copy books.',
      'Look for "Ora et labora".',
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C7_HISTCIV_009,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why did Mecca serve as both the supreme economic trade hub and religious pilgrimage centre of pre-Islamic Arabia?',
    options: [
      'The Roman Empire stationed its imperial treasury inside Mecca',
      'The Quraysh controlled the Yemen-to-Syria spice caravan routes and the Kaaba housed 360 tribal idols protected by a sacred months truce',
      'Mecca had vast freshwater lakes allowing massive rice export',
      'The city was ruled by a democratic council representing Persian emperors',
    ],
    correctIndex: 1,
    explanation: 'Mecca\'s strategic oasis position on the Yemen-to-Syria route made it a trade crossroads, while the Kaaba held 360 polytheistic idols whose pilgrims generated immense revenue during sacred truce months.',
    hints: [
      'Think of the caravan route from Yemen northward to Syria.',
      'Remember the 360 idols inside the pre-Islamic Kaaba.',
      'Trade wealth and pilgrimage revenue went hand-in-hand under the Quraysh tribe.',
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C7_HISTCIV_010,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Prophet Muhammad received his first revelation in the Cave of Hira in 610 CE at age 40. In what year CE was he born in Mecca?',
    correctAnswer: 570,
    tolerance: 0,
    unit: 'CE',
    explanation: '610 CE - 40 years = 570 CE. Prophet Muhammad was born in 570 CE (Year of the Elephant) in Mecca into the Banu Hashim clan of the Quraysh tribe.',
    hints: [
      'Subtract 40 years from 610 CE.',
      '610 minus 40 gives the birth year.',
      'The answer is 570 CE.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_17',
    nodeId: NODE_C7_HISTCIV_004,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How did the missionary strategy of the Apostle Paul (Saul of Tarsus) decisively transform early Christianity from a regional Jewish reform sect into a universal world religion?',
    options: [
      'He commanded all Christians to join the Roman legion as mercenary soldiers',
      'He insisted that Gentile converts must strictly adopt Jewish dietary laws and circumcision before baptising',
      'He preached across Asia Minor, Greece, and Rome, asserting at the Council of Jerusalem (49 CE) that faith in Christ was open to Gentiles without requiring Jewish circumcision or dietary laws',
      'He proclaimed himself Roman Emperor after the Great Fire of Rome in 64 CE',
    ],
    correctIndex: 2,
    explanation: 'Paul\'s mission to the Gentiles and the Council of Jerusalem (c. 49 CE) dismantled ethnic and ritual barriers (circumcision/dietary restrictions), allowing Christianity to spread rapidly throughout the Greco-Roman world.',
    hints: [
      'Consider the difference between a Jewish sect and a universal religion.',
      'Paul removed the requirements of Jewish dietary laws and circumcision for Gentiles.',
      'His three missionary journeys spanned Asia Minor, Greece, and Rome.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C7_HISTCIV_007,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does the Fourth Crusade (1202–1204 CE) decisively disprove the claim that the Crusades were purely holy wars of religious piety?',
    options: [
      'The Crusaders converted to Buddhism upon reaching Jerusalem',
      'Venetian commercial interests manipulated the Crusaders to assault and brutally sack Constantinople — a Christian capital — partitioning its wealth for trade monopolies',
      'Pope Urban II cancelled the crusade and disbanded all armies in France',
      'The Crusaders allied with Saladin to conquer Rome',
    ],
    correctIndex: 1,
    explanation: 'In 1204 CE, the Fourth Crusade sacked Christian Constantinople, orchestrated by the Republic of Venice to eliminate its maritime trading rival. This starkly demonstrated how economic and political ambitions eclipsed religious ideals.',
    hints: [
      'Think about which city was sacked during the Fourth Crusade in 1204.',
      'Constantinople was the capital of the Christian Byzantine Empire!',
      'Venice engineered the sack to dominate Mediterranean trade routes.',
    ],
    misconceptionIndex: 8,
  },
  {
    id: 'ch_19',
    nodeId: NODE_C7_HISTCIV_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'What was the direct downstream global consequence of the Ottoman conquest of Constantinople in 1453 CE for Indian history?',
    options: [
      'The Delhi Sultanate immediately surrendered to Portuguese fleets',
      'The closure of overland spice trade routes forced European powers (Portugal/Spain) to seek maritime routes around Africa, leading Vasco da Gama to Calicut in 1498 CE',
      'The Mughal Emperor Babur signed a treaty with Christopher Columbus',
      'The Silk Road was rerouted exclusively through Bengal',
    ],
    correctIndex: 1,
    explanation: 'When Ottoman Turks captured Constantinople in 1453 CE and placed heavy tariffs on overland routes, Western Europe was forced to finance sea expeditions. This launched the Age of Exploration, leading Vasco da Gama to Calicut (Kerala) in 1498 CE.',
    hints: [
      'Connect the fall of Constantinople in 1453 to trade routes to India.',
      'Overland trade was blocked/taxed heavily by the Ottomans.',
      'Navigators like Vasco da Gama sailed around Africa to reach Indian ports.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C7_HISTCIV_008,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In comparing medieval Christian Monasteries with the ancient Indian Buddhist Sangha (Vinaya rules), which core institutional parallel is most accurate?',
    options: [
      'Both were military training academies that enforced hereditary caste rule',
      'Both were vowed residential communities that renounced private wealth, preserved sacred and classical texts, provided healthcare/education, yet paradoxically accumulated institutional land and wealth',
      'Neither community ever allowed reading, writing, or agriculture',
      'Both were ruled directly by the Roman Emperor from Ravenna',
    ],
    correctIndex: 1,
    explanation: 'Both the Buddhist Sangha (under the Vinaya) and Christian monasteries (under Benedictine Rule) renounced individual wealth while preserving manuscripts and providing social welfare, though both later accumulated significant institutional estates.',
    hints: [
      'Reflect on vows of poverty, communal living, scriptoria/manuscript preservation.',
      'Both served as schools and hospitals for surrounding communities.',
      'Both experienced tensions between individual asceticism and institutional wealth.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C7_HISTCIV_009,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the sociological chain explaining why pre-Islamic tribal Arabia generated urgent demand for a universal monotheistic message (Ummah):',
    availableParts: [
      'Absence_of_Central_State',
      'Blood_Feuds_&_Lex_Talionis',
      'Meccan_Merchant_Inequality',
      'Universal_Ethical_Ummah',
    ],
    targetState: 'Absence_of_Central_State Blood_Feuds_&_Lex_Talionis Meccan_Merchant_Inequality Universal_Ethical_Ummah',
    validationHint: 'Sequence from political vacuum -> tribal feuds -> commercial inequality -> ethical unifier.',
    explanation: 'Stateless tribal structure led to chronic blood feuds and vulnerability, worsened by commercial inequality in Mecca, creating social demand for a unified, ethical community (the Ummah) transcending clan lines.',
    hints: [
      'First: there was no central king or police (Absence of Central State).',
      'Second: order relied on clan retaliation (Blood Feuds & Lex Talionis).',
      'Third: trade boom produced social decay (Meccan Merchant Inequality).',
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C7_HISTCIV_010,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why was Prophet Muhammad\'s pre-prophetic reputation as "Al-Amin" (The Trustworthy) and his 15-year marriage to merchant Khadija vital to his mission?',
    options: [
      'It earned him a Roman citizenship title that protected him from all Arabian clans',
      'In a courtless tribal society without contract law, his proven commercial integrity and Khadija\'s partnership established unquestioned social credibility before receiving the revelation at Cave Hira in 610 CE',
      'It allowed him to command a mercenary army to conquer Syria at age 25',
      'It exempted him from all tribal lineage requirements in Mecca',
    ],
    correctIndex: 1,
    explanation: 'In a society without formal courts, personal truthfulness was a merchant\'s greatest capital. The title "Al-Amin" proved his integrity over 15 quiet years of marriage and trade, giving profound moral authority to his 610 CE prophetic call.',
    hints: [
      'Consider why honesty matters in a society without written contract laws or courts.',
      'He was 40 when he received the revelation, with an established reputation.',
      'Khadija was his first supporter who verified his character and mission.',
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
  nodeId: 'c7_histciv_001',
  title: 'Meaning of Medieval & the Early Medieval World',
  definition: 'The transition from the ancient classical world to the medieval era, spanning the decline of the Western Roman Empire (476 CE), the rise of Christianity and Byzantium, European monasticism, and the socio-religious emergence of Islam in Arabia (570–632 CE).',
  eli5: 'Think of history like a 3-part epic: Ancient, Medieval (the Middle Age), and Modern. In Europe, the middle chapter starts when Rome breaks apart in 476 CE. In Arabia, it starts with the desert trade cities and Prophet Muhammad in Mecca. Monks and traders preserved books, while knights and caliphs reshaped world trade.',
  misconceptions: [
    { misconception: '"Medieval" means primitive, old, or savage.', correction: '"Medieval" literally means "middle age" (Latin medium aevum), referring specifically to the era between classical antiquity and modern times.' },
    { misconception: 'Jesus was born in 1 CE in Nazareth.', correction: 'Jesus was born in Bethlehem around 4 BCE during the reign of Herod the Great, due to a 6th-century calendar miscalculation by Dionysius Exiguus.' },
    { misconception: 'The Kingdom of God was a political plan to overthrow Rome.', correction: 'The Kingdom of God is a spiritual community of righteousness, love, and compassion, explicitly not a worldly political empire.' },
    { misconception: 'Constantine made Christianity the official state religion in 313 CE.', correction: 'Constantine granted religious tolerance in the Edict of Milan (313 CE). Theodosius I made it the official religion in 380 CE.' },
    { misconception: 'The entire Roman Empire was destroyed in 476 CE.', correction: 'Only the Western Roman Empire collapsed in 476 CE. The Eastern Roman Empire (Byzantium) survived until 1453 CE.' },
    { misconception: 'Jahiliyyah means complete lack of culture or savagery.', correction: 'Jahiliyyah means "Age of Ignorance" of monotheistic divine guidance, though Arabs had rich poetry and complex customary trade.' },
    { misconception: 'The Seljuk Turks and Ottoman Turks were the same empire.', correction: 'Seljuk Turks fought at Manzikert in 1071 CE; Ottoman Turks were founded c. 1299 and conquered Constantinople in 1453 CE.' },
    { misconception: 'Prophet Muhammad was born in 622 CE.', correction: 'He was born in 570 CE. 622 CE is the year of the Hijrat (migration to Medina) and Year 1 of the Islamic calendar.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the Latin phrase from which "medieval" is derived?', options: ['Magna Charta', 'Medium Aevum', 'Pax Romana', 'Corpus Juris'], correctIndex: 1 },
    { question: 'When did the Western Roman Empire end?', options: ['313 CE', '476 CE', '712 CE', '1453 CE'], correctIndex: 1 },
    { question: 'Which edict proclaimed religious tolerance in 313 CE?', options: ['Edict of Milan', 'Edict of Thessalonica', 'Justinian Code', 'Nicene Creed'], correctIndex: 0 },
    { question: 'What was the motto of the Benedictine Order?', options: ['Veni Vidi Vici', 'Ora et Labora', 'Carpe Diem', 'Lex Talionis'], correctIndex: 1 },
    { question: 'Which city was sacked in the Fourth Crusade in 1204 CE?', options: ['Jerusalem', 'Rome', 'Constantinople', 'Alexandria'], correctIndex: 2 },
    { question: 'In what year was Prophet Muhammad born in Mecca?', options: ['570 CE', '610 CE', '622 CE', '632 CE'], correctIndex: 0 },
    { question: 'What was the name of the cave where the first revelation occurred in 610 CE?', options: ['Cave of Thawr', 'Cave of Hira', 'Monte Cassino', 'Golgotha'], correctIndex: 1 },
    { question: 'What did the pre-Islamic Kaaba contain?', options: ['Christian relics', '360 tribal idols', 'Roman coins exclusively', 'Only the Quran'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery across European periodisation (476–1453 CE), Christian history, monastic preservation, Crusades, and pre-Islamic Arabia & Muhammad\'s life (570–610 CE).',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Split of the Roman World (330–500 CE)',
    instruction: 'Drag the Timeline Slider to observe how Emperor Constantine\'s move to Constantinople in 330 CE left the Western Empire exposed to barbarian migrations (410, 455, 476 CE).',
    interactionType: 'timeline-slider',
    nodeId: NODE_C7_HISTCIV_005,
  },
  {
    title: '2. The Core Teachings of Jesus in 1st-Century Palestine',
    instruction: 'Click each Teaching Pillar to reveal how inner purity, compassion for the marginalised, and forgiveness challenged Roman taxation and Temple ritualism.',
    interactionType: 'click-pillars',
    nodeId: NODE_C7_HISTCIV_003,
  },
  {
    title: '3. Monasteries: The Five Pillars of Medieval European Survival',
    instruction: 'Activate the Monastic Estate functions on the architectural schematic: Manuscript Scriptorium, Herb Infirmary, School, Guest Hostel, and Agriculture.',
    interactionType: 'monastery-builder',
    nodeId: NODE_C7_HISTCIV_008,
  },
  {
    title: '4. The Mediterranean Crossroads: Crusades & Trade (1071–1453 CE)',
    instruction: 'Click the Key Battles on the maritime schematic map to see why the 1204 Sack of Constantinople exposed commercial motives, and how the 1453 Ottoman conquest forced sea routes to India.',
    interactionType: 'crossroads-map',
    nodeId: NODE_C7_HISTCIV_007,
  },
  {
    title: '5. Pre-Islamic Arabia & the Life of Prophet Muhammad (570–610 CE)',
    instruction: 'Explore the trade caravan schematic from Yemen to Syria through Mecca, inspect the 360-idol Kaaba, and trace Muhammad\'s guardianship and the 610 CE Cave Hira revelation.',
    interactionType: 'mecca-route',
    nodeId: NODE_C7_HISTCIV_010,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: When the Western Roman Empire collapsed in 476 CE, what happened to the Eastern Roman Empire (Byzantium)?',
    options: [
      'It instantly collapsed in the same year',
      'It survived for another ~1000 years with its capital at Constantinople until 1453 CE',
      'It was conquered by the Franks under Clovis I in 496 CE',
      'It was completely abandoned and turned into a desert',
    ],
    correctIndex: 1,
    verifyInstruction: 'Notice on the timeline how Byzantium flourished through Justinian and survived until the Ottoman conquest of 1453 CE.',
    nodeId: NODE_C7_HISTCIV_006,
  },
  {
    question: 'Predict: When the Ottoman Turks conquered Constantinople in 1453 CE and closed overland spice routes, what was the downstream impact on maritime exploration to India?',
    options: [
      'European trade with Asia ceased permanently',
      'European powers financed ocean voyages around Africa, leading Vasco da Gama to reach Calicut in 1498 CE',
      'Indian kingdoms built land caravans across the Arctic',
      'All Mediterranean ports became completely uninhabited',
    ],
    correctIndex: 1,
    verifyInstruction: 'Observe on the Mediterranean trade schematic how blocking overland routes directly prompted Vasco da Gama’s 1498 voyage to Calicut, India.',
    nodeId: NODE_C7_HISTCIV_007,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the impact of monastic scriptoria on classical Latin & Greek literature?',
    observableOptions: [
      'Monks burned all ancient philosophy books',
      'Monasteries were the primary institutions preserving ancient texts through hand-copied manuscripts before modern printing and universities',
      'Monasteries only stored military weapons and shields',
      'Classical literature was preserved solely by Viking sailors',
    ],
    correctIndex: 1,
    nodeId: NODE_C7_HISTCIV_008,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Junior Historian & Archivist Fieldwork',
  description: 'Connect medieval history to living institutions in India and across the globe. Compare ancient text preservation, trade routes, and community welfare.',
  steps: [
    '1. Identify an ancient/medieval library or manuscript collection in India (e.g. Saraswathi Mahal Library in Thanjavur, Khuda Bakhsh Library in Patna, or Kerala palm-leaf archives).',
    '2. Compare how Buddhist Sanghas, Christian Monasteries, and Islamic Madrassas preserved knowledge through hand-copying before printing presses existed.',
    '3. Trace spice items in your kitchen (pepper, cinnamon, cardamom) back to the historical Malabar-Venice-Constantinople trade routes.',
    '4. Discuss with a peer why the Latin word "medieval" (in-between) is a tool of periodisation rather than an insult meaning "backward".',
  ],
};

// ─── MAIN COMPONENT ───
export default function C7_HistoryCivicsMeaningmedievalBeginningSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['histciv'] || { name: 'History & Civics', emoji: '📜', color: 'amber' };

  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── BRILLIANT.ORG INTERACTION STATES ───
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [prediction2Made, setPrediction2Made] = useState(false);
  const [prediction2Index, setPrediction2Index] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ─── SIMULATION VARIABLE STATES (CONNECTED TO REAL-TIME SLIDERS) ───
  const [timelineYear, setTimelineYear] = useState<number>(330);
  const [sandboxYear, setSandboxYear] = useState<number>(476);
  const [selectedPillar, setSelectedPillar] = useState<string | null>('love');
  const [activeMonasteryModules, setActiveMonasteryModules] = useState<string[]>(['scriptorium', 'infirmary']);
  const [selectedBattle, setSelectedBattle] = useState<string>('manzikert');
  const [selectedCaravanStop, setSelectedCaravanStop] = useState<string>('mecca');

  // ─── DIFFICULTY & ADAPTIVE BKT ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);

  // ─── ESCALATING HINTS & PROGRESSIVE REVEAL ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ─── DRAG & DROP / CONSTRUCT / NUMERIC ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── DISCOVERY STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ─── FEEDBACK & ANIMATIONS ───
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gsapTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // ─── ADAPTIVE CHALLENGES FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD INITIAL MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT DIFFICULTY ADAPTATION EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner'
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

  // ─── HTML5 CANVAS RADIAL ANIMATION ───
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

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = 24 + Math.sin(frame * 0.04) * 3;

      ctx.strokeStyle = 'rgba(217, 119, 6, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx - 30, cy);
      ctx.lineTo(cx + 30, cy);
      ctx.moveTo(cx, cy - 30);
      ctx.lineTo(cx, cy + 30);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── GSAP ANIMATION FOR TIMELINE TRANSITIONS ───
  useEffect(() => {
    if (phase === 'explore') {
      gsapTimelineRef.current = gsap.timeline();
      gsapTimelineRef.current.fromTo(
        '.gsap-explore-card',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [phase, currentSlide]);

  // ─── CLEANUP TIMERS ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── USECALLBACK HANDLERS ───
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
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate! Let us investigate the two separate timelines.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration. Touch and manipulate each historical model.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('You are now in the Historical Sandbox. Test variables without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Put your analysis and historical evidence to the test.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now verify it on the interactive simulation.');
  }, []);

  const handlePrediction2 = useCallback((idx: number) => {
    setPrediction2Index(idx);
    setPrediction2Made(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Verify how trade dynamics shifted.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on observation!' : 'Check the interactive scriptorium again.');
  }, []);

  const handlePillarClick = useCallback((pillar: string) => {
    setSelectedPillar(pillar);
    audioManager.play('tap');
  }, []);

  const handleMonasteryToggle = useCallback((module: string) => {
    audioManager.play('pop');
    setActiveMonasteryModules(prev =>
      prev.includes(module) ? prev.filter(m => m !== module) : [...prev, module]
    );
  }, []);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Simulation completed. Outstanding historical analysis!');
  }, [errors, onComplete]);

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
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Splendid! That is historically accurate.');
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
          speechManager.speak('Let us study the complete source explanation.');
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

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('tap');
      setDraggedItem(null);
    },
    [draggedItem]
  );

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement(prev => {
        let arr = prev.length === challenge.sortItems?.length ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  // Motivational message helper
  const getMotivationalFeedback = (errCount: number) => {
    if (errCount === 0) return 'PERFECT SCORE! Outstanding historical analysis and flawless accuracy across European and Arabian medieval transitions.';
    if (errCount <= 3) return 'Great work! You demonstrated solid understanding and historical insight across all core concepts.';
    if (errCount <= 7) return 'Good effort! Review the historical misconceptions and timeline milestones to sharpen your mastery further.';
    return 'Do not give up — You WILL get this! Revisit the interactive timeline maps and try again to build your confidence!';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-2xl border border-amber-500/40"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                ICSE Class 7 • History
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                Nodes 001–010
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <canvas ref={canvasRef} width={64} height={64} className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800" />
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wide border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                : difficulty === 'standard'
                ? 'bg-sky-950/60 text-sky-400 border-sky-700'
                : 'bg-rose-950/60 text-rose-400 border-rose-700'
            }`}
          >
            Tier: {difficulty}
          </motion.div>
        </div>
      </header>

      {/* ─── PHASE: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-700/40 shadow-inner">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold uppercase">
              <span>🏛️</span> Historical Scenario & Investigation
            </div>
            <h2 className="text-xl font-bold text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-amber-300/80 mt-3 p-3 bg-amber-950/30 rounded-xl border border-amber-800/30">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-xs font-semibold uppercase text-amber-400 tracking-wider">
              Step 0: Curiosity Discovery Hook
            </span>
            <p className="text-base font-semibold text-white mt-2 mb-4 leading-snug">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-amber-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 rounded-xl bg-slate-950 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div>
                  <p className={`text-sm font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '✓ Spot on! Historians periodise based on regional societal shifts.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Europe marks 476 CE (Fall of Western Rome); India marks the 8th century (712 CE Sindh Conquest).
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm rounded-xl shadow-lg hover:brightness-110 whitespace-nowrap"
                >
                  Launch Interactive Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900 rounded-2xl border border-slate-800 text-xs">
            <span className="text-amber-400 font-bold uppercase tracking-wider">
              Exploration Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1">
              {EXPLORATION_STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-7 h-2 rounded-full transition-all ${
                    currentSlide === i ? 'bg-amber-400 w-10' : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Go to exploration step ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="gsap-explore-card p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-5">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-amber-300">
                {EXPLORATION_STEPS[currentSlide].title}
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                👉 <span className="text-amber-400 font-medium">{EXPLORATION_STEPS[currentSlide].instruction}</span>
              </p>
            </div>

            {/* ─── INTERACTIVE VIZ 1 (SVG 1): TIMELINE & ROMAN PARTITION ─── */}
            {currentSlide === 0 && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">
                    Current Year: <span className="text-amber-400 font-bold text-sm">{timelineYear} CE</span>
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-950/50 text-amber-300 border border-amber-800">
                    {timelineYear < 395 ? 'United Roman Empire' : timelineYear < 476 ? 'Partitioned: West Fragmenting' : 'Western Empire Fallen (476 CE) — Byzantium Endures'}
                  </span>
                </div>

                {/* Real-time slider controlling SVG directly */}
                <input
                  type="range"
                  min={330}
                  max={500}
                  step={2}
                  value={timelineYear}
                  onChange={(e) => setTimelineYear(Number(e.target.value))}
                  aria-label="Interactive Roman Timeline Slider"
                  className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />

                {/* TOPIC SVG 1: Roman Empire Split and Barbarian Invasions */}
                <svg viewBox="0 0 600 240" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-800">
                  {/* Western Roman Half */}
                  <rect
                    x="20"
                    y="20"
                    width="260"
                    height="170"
                    rx="12"
                    fill={timelineYear >= 476 ? '#450a0a' : timelineYear >= 410 ? '#7f1d1d' : '#1e1b4b'}
                    stroke={timelineYear >= 476 ? '#ef4444' : '#6366f1'}
                    strokeWidth="2"
                    className="transition-colors duration-300"
                  />
                  <text x="150" y="48" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="bold">
                    Western Empire (Rome)
                  </text>
                  <text x="150" y="74" textAnchor="middle" fill="#94a3b8" fontSize="10">
                    {timelineYear < 410
                      ? 'Suffering economic inflation & raids'
                      : timelineYear < 455
                      ? '410 CE: Visigoths under Alaric sack Rome'
                      : timelineYear < 476
                      ? '455 CE: Vandals under Genseric sack Rome'
                      : '476 CE: Romulus Augustulus deposed (End)'}
                  </text>

                  {/* Dynamic invasion paths triggered by timeline slider */}
                  {timelineYear >= 410 && (
                    <g className="transition-all duration-300">
                      <path d="M 40 100 Q 90 120 140 110" stroke="#f87171" strokeWidth="2.5" fill="none" strokeDasharray="4" />
                      <circle cx="140" cy="110" r="4" fill="#ef4444" />
                      <text x="50" y="95" fill="#fca5a5" fontSize="9">Visigoths (410 CE)</text>
                    </g>
                  )}
                  {timelineYear >= 455 && (
                    <g className="transition-all duration-300">
                      <path d="M 60 160 Q 110 140 160 150" stroke="#f87171" strokeWidth="2.5" fill="none" strokeDasharray="4" />
                      <circle cx="160" cy="150" r="4" fill="#ef4444" />
                      <text x="70" y="172" fill="#fca5a5" fontSize="9">Vandals (455 CE)</text>
                    </g>
                  )}

                  {/* Eastern Roman Half (Byzantium) */}
                  <rect
                    x="320"
                    y="20"
                    width="260"
                    height="170"
                    rx="12"
                    fill="#14532d"
                    stroke="#22c55e"
                    strokeWidth="2"
                  />
                  <text x="450" y="48" textAnchor="middle" fill="#bbf7d0" fontSize="13" fontWeight="bold">
                    Eastern Empire (Constantinople)
                  </text>
                  <text x="450" y="74" textAnchor="middle" fill="#86efac" fontSize="10">
                    Founded 330 CE by Constantine
                  </text>
                  <text x="450" y="100" textAnchor="middle" fill="#cbd5e1" fontSize="9.5">
                    Bosporus Chokepoint & Maritime Hub
                  </text>
                  <text x="450" y="130" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">
                    Flourishes until 1453 CE (~1000 yrs longer!)
                  </text>

                  {/* Timeline Cursor Tracker */}
                  <line
                    x1={20 + ((timelineYear - 330) / (500 - 330)) * 560}
                    y1="205"
                    x2={20 + ((timelineYear - 330) / (500 - 330)) * 560}
                    y2="230"
                    stroke="#f59e0b"
                    strokeWidth="3"
                  />
                  <rect x="20" y="215" width="560" height="4" fill="#334155" rx="2" />
                  <circle
                    cx={20 + ((timelineYear - 330) / (500 - 330)) * 560}
                    cy="217"
                    r="6"
                    fill="#f59e0b"
                  />
                  <text x="25" y="235" fill="#64748b" fontSize="8.5">330 CE</text>
                  <text x="270" y="235" fill="#64748b" fontSize="8.5">410 CE</text>
                  <text x="480" y="235" fill="#64748b" fontSize="8.5">476 CE</text>
                  <text x="560" y="235" fill="#64748b" fontSize="8.5">500 CE</text>
                </svg>

                {!predictionMade ? (
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-700">
                    <p className="text-xs font-semibold text-amber-400 uppercase">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction(i)}
                          className="text-left p-2.5 rounded-lg bg-slate-800 text-xs text-slate-200 hover:bg-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-900 rounded-xl border border-emerald-600/40 text-xs text-emerald-300">
                    ✓ Observation verified: {PREDICTION_QUESTIONS[0].verifyInstruction}
                  </div>
                )}
              </div>
            )}

            {/* ─── INTERACTIVE VIZ 2: PILLARS OF JESUS'S TEACHINGS ─── */}
            {currentSlide === 1 && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'love', name: 'Love of Neighbour', icon: '❤️', desc: 'Active practical mercy across ethnic boundaries (Parable of Good Samaritan).' },
                    { id: 'poor', name: 'Compassion for Poor', icon: '🤲', desc: 'Beatitudes in Sermon on Mount invert hierarchy: blessings on the meek and humble.' },
                    { id: 'forgiveness', name: 'Forgiveness of Enemies', icon: '🕊️', desc: 'Turn the other cheek, breaking endless cycles of lex talionis (revenge).' },
                    { id: 'kingdom', name: 'Kingdom of God', icon: '✨', desc: 'A spiritual community of righteous living under God\'s will, not a worldly army.' },
                  ].map((p) => (
                    <motion.button
                      key={p.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handlePillarClick(p.id)}
                      className={`p-4 rounded-xl text-left border transition-all ${
                        selectedPillar === p.id
                          ? 'bg-amber-950/70 border-amber-500 shadow-lg'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-2xl">{p.icon}</span>
                      <h3 className="font-bold text-sm text-white mt-1">{p.name}</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{p.desc}</p>
                    </motion.button>
                  ))}
                </div>

                {selectedPillar && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-slate-900 rounded-xl border border-amber-500/40 text-xs text-slate-300"
                  >
                    <span className="font-bold text-amber-400 uppercase">Historical Context: </span>
                    These ethical teachings relocated holiness from outer Temple animal sacrifices to the human heart, directly addressing Galilean peasants bearing both Roman taxes and priestly tithes.
                  </motion.div>
                )}
              </div>
            )}

            {/* ─── INTERACTIVE VIZ 3 (SVG 2): MONASTIC ESTATE SCHEMATIC ─── */}
            {currentSlide === 2 && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'scriptorium', label: '📜 Scriptorium (Manuscript Copying)', desc: 'Preserved Virgil, Cicero, Aristotle by hand' },
                    { id: 'infirmary', label: '🌿 Infirmary & Herb Garden', desc: 'Free medical healing for surrounding villagers' },
                    { id: 'school', label: '🎓 Monastic School', desc: 'Taught reading and Latin (Bede at Jarrow, 731 CE)' },
                    { id: 'hostel', label: '🛏️ Pilgrim Guest House', desc: 'Sheltered travellers on dangerous medieval roads' },
                    { id: 'agriculture', label: '🌾 Swamp Drainage & Farming', desc: 'Advanced crop rotation and livestock breeding' },
                  ].map((m) => (
                    <motion.button
                      key={m.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleMonasteryToggle(m.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        activeMonasteryModules.includes(m.id)
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {m.label}
                    </motion.button>
                  ))}
                </div>

                {/* TOPIC SVG 2: Monastic Estate Architectural Layout */}
                <svg viewBox="0 0 600 220" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-800">
                  {/* Central Cloister / Church */}
                  <rect x="230" y="60" width="140" height="90" rx="8" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                  <text x="300" y="105" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">Central Cloister & Chapel</text>
                  <text x="300" y="125" textAnchor="middle" fill="#cbd5e1" fontSize="9">Ora et Labora (529 CE)</text>

                  {/* Scriptorium Wing */}
                  <rect
                    x="30"
                    y="30"
                    width="170"
                    height="70"
                    rx="8"
                    fill={activeMonasteryModules.includes('scriptorium') ? '#064e3b' : '#1e293b'}
                    stroke={activeMonasteryModules.includes('scriptorium') ? '#10b981' : '#475569'}
                    strokeWidth="1.5"
                  />
                  <text x="115" y="60" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">📜 Scriptorium</text>
                  <text x="115" y="80" textAnchor="middle" fill="#a7f3d0" fontSize="9">Classical Texts Copied</text>

                  {/* Infirmary Wing */}
                  <rect
                    x="30"
                    y="120"
                    width="170"
                    height="70"
                    rx="8"
                    fill={activeMonasteryModules.includes('infirmary') ? '#064e3b' : '#1e293b'}
                    stroke={activeMonasteryModules.includes('infirmary') ? '#10b981' : '#475569'}
                    strokeWidth="1.5"
                  />
                  <text x="115" y="150" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">🌿 Herbal Infirmary</text>
                  <text x="115" y="170" textAnchor="middle" fill="#a7f3d0" fontSize="9">Public Healthcare & Herbs</text>

                  {/* School Wing */}
                  <rect
                    x="400"
                    y="30"
                    width="170"
                    height="70"
                    rx="8"
                    fill={activeMonasteryModules.includes('school') ? '#064e3b' : '#1e293b'}
                    stroke={activeMonasteryModules.includes('school') ? '#10b981' : '#475569'}
                    strokeWidth="1.5"
                  />
                  <text x="485" y="60" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">🎓 Monastic School</text>
                  <text x="485" y="80" textAnchor="middle" fill="#a7f3d0" fontSize="9">Latin Grammar & Astronomy</text>

                  {/* Agriculture & Fields */}
                  <rect
                    x="400"
                    y="120"
                    width="170"
                    height="70"
                    rx="8"
                    fill={activeMonasteryModules.includes('agriculture') ? '#064e3b' : '#1e293b'}
                    stroke={activeMonasteryModules.includes('agriculture') ? '#10b981' : '#475569'}
                    strokeWidth="1.5"
                  />
                  <text x="485" y="150" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">🌾 Swamps & Farms</text>
                  <text x="485" y="170" textAnchor="middle" fill="#a7f3d0" fontSize="9">Crop Rotation & Draining</text>

                  {/* Connecting corridors */}
                  <line x1="200" y1="65" x2="230" y2="80" stroke="#64748b" strokeWidth="2" strokeDasharray="3" />
                  <line x1="200" y1="155" x2="230" y2="135" stroke="#64748b" strokeWidth="2" strokeDasharray="3" />
                  <line x1="370" y1="80" x2="400" y2="65" stroke="#64748b" strokeWidth="2" strokeDasharray="3" />
                  <line x1="370" y1="135" x2="400" y2="155" stroke="#64748b" strokeWidth="2" strokeDasharray="3" />
                </svg>

                {/* Observation Question */}
                {!observationAnswered ? (
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                    <p className="text-xs font-bold text-amber-400 uppercase">{OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="space-y-1.5 mt-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservation(i)}
                          className="w-full text-left p-2 rounded-lg bg-slate-800 text-xs text-slate-200 hover:bg-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-emerald-600/40 text-xs text-emerald-300">
                    ✓ Observation recorded: Monastic scriptoria were the single bridge preserving classical knowledge through early medieval centuries.
                  </div>
                )}
              </div>
            )}

            {/* ─── INTERACTIVE VIZ 4 (SVG 3): MEDITERRANEAN CRUSADES & TRADE ─── */}
            {currentSlide === 3 && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { id: 'manzikert', name: '1071: Manzikert', desc: 'Seljuks defeat Byzantines' },
                    { id: 'first_crusade', name: '1099: First Crusade', desc: 'Jerusalem taken by Crusaders' },
                    { id: 'fourth_crusade', name: '1204: Fourth Crusade', desc: 'Venice sacks Constantinople!' },
                    { id: 'fall_1453', name: '1453: Fall of Constantinople', desc: 'Ottomans block overland spice road' },
                  ].map((b) => (
                    <motion.button
                      key={b.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedBattle(b.id)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        selectedBattle === b.id
                          ? 'bg-amber-950/80 border-amber-500'
                          : 'bg-slate-900 border-slate-800'
                      }`}
                    >
                      <h4 className="font-bold text-xs text-amber-300">{b.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-1">{b.desc}</p>
                    </motion.button>
                  ))}
                </div>

                {/* TOPIC SVG 3: Mediterranean Map with Crusades & Sea Routes */}
                <svg viewBox="0 0 600 200" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-800">
                  {/* Mediterranean Sea Basin */}
                  <rect x="10" y="10" width="580" height="180" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                  
                  {/* Water body */}
                  <path d="M 60 140 Q 200 160 350 140 Q 480 160 550 130 L 550 180 L 60 180 Z" fill="#1e293b" opacity="0.6" />

                  {/* Rome */}
                  <circle cx="160" cy="80" r="7" fill="#6366f1" />
                  <text x="160" y="65" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontWeight="bold">Rome</text>

                  {/* Venice */}
                  <circle cx="175" cy="45" r="7" fill="#38bdf8" />
                  <text x="175" y="35" textAnchor="middle" fill="#bae6fd" fontSize="10" fontWeight="bold">Venice</text>

                  {/* Constantinople */}
                  <circle
                    cx="360"
                    cy="75"
                    r={selectedBattle === 'fourth_crusade' || selectedBattle === 'fall_1453' ? 11 : 8}
                    fill={selectedBattle === 'fourth_crusade' ? '#ef4444' : selectedBattle === 'fall_1453' ? '#f59e0b' : '#22c55e'}
                  />
                  <text x="360" y="60" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="bold">Constantinople (Bosporus)</text>

                  {/* Jerusalem */}
                  <circle
                    cx="480"
                    cy="145"
                    r={selectedBattle === 'first_crusade' ? 10 : 7}
                    fill="#ec4899"
                  />
                  <text x="480" y="165" textAnchor="middle" fill="#fbcfe8" fontSize="10" fontWeight="bold">Jerusalem</text>

                  {/* Manzikert */}
                  <circle
                    cx="490"
                    cy="60"
                    r={selectedBattle === 'manzikert' ? 10 : 7}
                    fill="#eab308"
                  />
                  <text x="490" y="48" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="bold">Manzikert (1071)</text>

                  {/* Dynamic routes based on selected battle */}
                  {selectedBattle === 'fourth_crusade' && (
                    <path d="M 175 45 Q 260 60 360 75" stroke="#ef4444" strokeWidth="3" fill="none" strokeDasharray="5" />
                  )}
                  {selectedBattle === 'first_crusade' && (
                    <path d="M 160 80 Q 300 110 480 145" stroke="#ec4899" strokeWidth="3" fill="none" strokeDasharray="5" />
                  )}
                  {selectedBattle === 'fall_1453' && (
                    <g>
                      <path d="M 360 75 L 560 90" stroke="#ef4444" strokeWidth="3" fill="none" strokeDasharray="3" />
                      <text x="460" y="105" textAnchor="middle" fill="#fca5a5" fontSize="9">Overland Silk/Spice Route Blocked!</text>
                    </g>
                  )}
                </svg>

                {/* Prediction Question 2 on Trade Route Impact */}
                {!prediction2Made ? (
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-700">
                    <p className="text-xs font-semibold text-amber-400 uppercase">{PREDICTION_QUESTIONS[1].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction2(i)}
                          className="text-left p-2.5 rounded-lg bg-slate-800 text-xs text-slate-200 hover:bg-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-900 rounded-xl border border-emerald-600/40 text-xs text-emerald-300">
                    ✓ Observation verified: {PREDICTION_QUESTIONS[1].verifyInstruction}
                  </div>
                )}

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-amber-400">Deep Historical Insight: </strong>
                  {selectedBattle === 'fourth_crusade' &&
                    'The 1204 sack of Christian Constantinople by Christian Crusaders proves that commercial dominance (engineered by Venice) routinely eclipsed religious rhetoric.'}
                  {selectedBattle === 'fall_1453' &&
                    'The 1453 Ottoman conquest severed the overland spice roads, forcing Portugal (Vasco da Gama 1498) to sail around Africa to Calicut in India.'}
                  {selectedBattle === 'manzikert' &&
                    'The Seljuk Turks (distinct from later Ottomans) triggered Western Europe\'s military counter-movement after defeating Byzantium at Manzikert.'}
                  {selectedBattle === 'first_crusade' &&
                    'Saladin later recaptured Jerusalem in 1187 CE after the Battle of Hattin, demonstrating chivalrous treatment of inhabitants.'}
                </div>
              </div>
            )}

            {/* ─── INTERACTIVE VIZ 5 (SVG 4): PRE-ISLAMIC ARABIA & CARAVAN ROUTES ─── */}
            {currentSlide === 4 && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'mecca', label: '📍 Mecca: Kaaba & Quraysh', desc: '360 tribal idols, annual pilgrimage & trade crossroads' },
                    { id: 'guardianship', label: '👶 Orphanhood & Guardianship', desc: 'Father -> Mother (age 6) -> Grandfather (age 8) -> Uncle Abu Talib' },
                    { id: 'al_amin', label: '🤝 "Al-Amin" & Khadija (595 CE)', desc: '15 years of proven commercial integrity in courtless society' },
                    { id: 'cave_hira', label: '⛰️ Cave Hira (610 CE)', desc: 'Angel Jibril commands "Iqra" (Read) on Jabal al-Nur' },
                  ].map((s) => (
                    <motion.button
                      key={s.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCaravanStop(s.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        selectedCaravanStop === s.id
                          ? 'bg-amber-950/80 border-amber-500 text-amber-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {s.label}
                    </motion.button>
                  ))}
                </div>

                {/* TOPIC SVG 4: Pre-Islamic Arabia & Trade Corridor Schematic */}
                <svg viewBox="0 0 600 200" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-800">
                  {/* Desert Peninsula Background */}
                  <rect x="10" y="10" width="580" height="180" rx="10" fill="#1c1917" stroke="#44403c" strokeWidth="1" />

                  {/* Red Sea & Persian Gulf hints */}
                  <path d="M 40 20 L 120 180 L 140 180 L 70 20 Z" fill="#0f172a" />
                  <text x="80" y="100" fill="#38bdf8" fontSize="9" transform="rotate(-65, 80, 100)">Red Sea</text>

                  {/* Syria / Damascus (North) */}
                  <circle cx="200" cy="35" r="7" fill="#38bdf8" />
                  <text x="200" y="25" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontWeight="bold">Syria (Damascus / Gaza)</text>

                  {/* Yathrib / Medina */}
                  <circle cx="220" cy="85" r="7" fill="#10b981" />
                  <text x="260" y="88" fill="#6ee7b7" fontSize="10" fontWeight="bold">Medina (Yathrib)</text>

                  {/* Mecca */}
                  <circle
                    cx="240"
                    cy="135"
                    r={selectedCaravanStop === 'mecca' ? 12 : 8}
                    fill={selectedCaravanStop === 'mecca' ? '#f59e0b' : '#d97706'}
                  />
                  <text x="240" y="158" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="bold">Mecca (Kaaba & 360 Idols)</text>

                  {/* Cave Hira Pin */}
                  <circle
                    cx="265"
                    cy="125"
                    r={selectedCaravanStop === 'cave_hira' ? 9 : 5}
                    fill={selectedCaravanStop === 'cave_hira' ? '#ec4899' : '#9333ea'}
                  />
                  <text x="315" y="128" fill="#f472b6" fontSize="9.5" fontWeight="bold">Cave of Hira (610 CE)</text>

                  {/* Yemen (Frankincense & Spices South) */}
                  <circle cx="280" cy="175" r="7" fill="#f97316" />
                  <text x="330" y="178" fill="#fdba74" fontSize="10" fontWeight="bold">Yemen (Frankincense & Spices)</text>

                  {/* Main Caravan Route */}
                  <path d="M 280 175 L 240 135 L 220 85 L 200 35" stroke="#f59e0b" strokeWidth="3" fill="none" strokeDasharray="4" />
                  <text x="380" y="55" fill="#fcd34d" fontSize="9.5">🐪 Lucrative North-South Spice Corridor</text>
                </svg>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <h4 className="font-bold text-amber-400 uppercase mb-1">
                    {selectedCaravanStop === 'mecca' && 'Pre-Islamic Mecca & Jahiliyyah'}
                    {selectedCaravanStop === 'guardianship' && 'Guardianship Lineage of Prophet Muhammad'}
                    {selectedCaravanStop === 'al_amin' && 'The Merchant Years & Khadija'}
                    {selectedCaravanStop === 'cave_hira' && 'The First Revelation (610 CE)'}
                  </h4>
                  <p className="leading-relaxed">
                    {selectedCaravanStop === 'mecca' &&
                      'Mecca sat on the lucrative Yemen-to-Syria spice corridor. Controlled by the Quraysh from c. 500 CE, the Kaaba housed 360 idols. Society suffered from blood feuds, female infanticide (wa\'d al-banat), and slave markets at Ukaz.'}
                    {selectedCaravanStop === 'guardianship' &&
                      'Born in 570 CE to Banu Hashim. His father Abdullah died before birth; mother Aminah died at age 6; grandfather Abdul Muttalib died at age 8; uncle Abu Talib raised him. His orphanhood shaped his lifelong concern for the vulnerable.'}
                    {selectedCaravanStop === 'al_amin' &&
                      'In a society with no formal courts or written contracts, Muhammad earned the title "Al-Amin" (The Trustworthy). At 25, he married his employer Khadija (a 40-year-old widow merchant), living quietly as a family man for 15 years.'}
                    {selectedCaravanStop === 'cave_hira' &&
                      'In 610 CE at age 40, meditating in the Cave of Hira on Jabal al-Nur, Angel Jibril delivered the command "Iqra" (Read/Recite). This Night of Power (Lailat al-Qadr) marked the dawn of Islam.'}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-4 py-2 bg-slate-800 text-slate-200 text-xs font-bold rounded-xl disabled:opacity-40"
              >
                ← Previous Lab
              </motion.button>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => s + 1)}
                  className="px-5 py-2 bg-amber-500 text-slate-950 text-xs font-black rounded-xl hover:brightness-110"
                >
                  Next Exploration →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 text-xs font-black rounded-xl shadow-lg hover:brightness-110"
                >
                  Enter Free Sandbox Mode →
                </motion.button>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── PHASE: FREE PLAY SANDBOX MODE (WITH REAL-TIME SLIDER) ─── */}
      {phase === 'sandbox' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Free Exploration Sandbox</span>
                <h2 className="text-xl font-black text-white mt-0.5">Interactive Historical Sandbox & Simulator</h2>
              </div>
              <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                No Grading • Real-Time Discovery
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Drag the continuous timeline slider to inspect how the medieval era developed across Europe, Byzantium, the Arab world, and India simultaneously.
            </p>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-300">
                    Real-Time Timeline Slider: <span className="text-amber-400 text-sm font-mono">{sandboxYear} CE</span>
                  </label>
                  <span className="text-xs text-slate-400 font-mono">
                    Progress: {Math.round(((sandboxYear - 300) / (1453 - 300)) * 100)}%
                  </span>
                </div>
                {/* Real-time slider with instant state update */}
                <input
                  type="range"
                  min={300}
                  max={1453}
                  step={5}
                  value={sandboxYear}
                  onChange={(e) => setSandboxYear(Number(e.target.value))}
                  aria-label="Sandbox Timeline Year"
                  className="w-full accent-amber-500 h-2.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Dynamic Visualization updated instantly as slider drags */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-amber-400 font-bold block mb-1">Europe & Byzantium (Year {sandboxYear} CE):</span>
                  <p className="text-slate-300 leading-relaxed">
                    {sandboxYear < 476
                      ? 'Western Roman Empire in decline under barbarian migrations. Constantinople fortified.'
                      : sandboxYear < 600
                      ? 'Western Rome fallen; Germanic kingdoms in Gaul and Italy; monastic movement starts under St. Benedict (529 CE).'
                      : sandboxYear < 1096
                      ? 'Byzantine Empire flourishing; Battle of Manzikert (1071 CE) triggers call for Crusades.'
                      : sandboxYear < 1453
                      ? 'Crusades era; Venetian trade monopolies; Fourth Crusade sacks Constantinople in 1204 CE.'
                      : 'Fall of Constantinople to Ottoman Turks (1453 CE); overland trade closed, launching Age of Discovery.'}
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-sky-400 font-bold block mb-1">Arabia & India (Year {sandboxYear} CE):</span>
                  <p className="text-slate-300 leading-relaxed">
                    {sandboxYear < 570
                      ? 'Pre-Islamic Jahiliyyah tribal era in Arabia; Gupta Empire golden age in India.'
                      : sandboxYear < 622
                      ? 'Prophet Muhammad born in 570 CE; first revelation in Cave Hira in 610 CE; Harshavardhana in India.'
                      : sandboxYear < 712
                      ? 'Spread of Islam across Arabia; Hijrat in 622 CE; Early Caliphates established.'
                      : sandboxYear < 1206
                      ? 'Arab conquest of Sindh by Muhammad bin Qasim (712 CE); Rajput kingdoms in India.'
                      : 'Delhi Sultanate established in India (1206 CE); bustling Indian Ocean spice commerce with Malabar.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-slate-950 font-black text-sm rounded-xl shadow-xl hover:brightness-110"
              >
                I Am Ready for Graded Challenges! →
              </motion.button>
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── PHASE: GRADED CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Competency:</span>
                <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 font-mono uppercase text-[11px] border border-amber-800">
                  {challenge.competencyLevel}
                </span>
                <span className={`px-2 py-0.5 rounded font-mono uppercase text-[11px] font-bold ${
                  challenge.difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400' :
                  challenge.difficulty === 'standard' ? 'bg-sky-950 text-sky-400' : 'bg-rose-950 text-rose-400'
                }`}>
                  {challenge.difficulty}
                </span>
              </div>
            </div>

            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base md:text-lg font-bold text-white leading-snug">
              {challenge.question}
            </h3>

            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5 pt-2">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                      wrongFlash
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-amber-400">{String.fromCharCode(65 + i)}.</span> {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Source Palette (Drag to Target Boxes):</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-amber-600 text-slate-950 font-bold text-xs rounded-lg cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop('lit_box')}
                    className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-amber-600/50 min-h-[100px]"
                  >
                    <span className="text-xs font-bold text-amber-400 uppercase block mb-2">📜 Literary Evidence Target</span>
                    <div className="text-xs text-slate-300 font-mono">
                      {droppedLabels.lit_box || '< Drop Literary Sources Here >'}
                    </div>
                  </div>

                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop('arch_box')}
                    className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-sky-600/50 min-h-[100px]"
                  >
                    <span className="text-xs font-bold text-sky-400 uppercase block mb-2">🏺 Archaeological Evidence Target</span>
                    <div className="text-xs text-slate-300 font-mono">
                      {droppedLabels.arch_box || '< Drop Material / Coins / Ruins Here >'}
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow hover:brightness-110"
                >
                  Verify Source Classification
                </motion.button>
              </div>
            )}

            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <span className="text-xs text-slate-400 block">Drag or Click to Arrange Items in Chronological Sequence:</span>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
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
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-xs flex items-center justify-between cursor-grab"
                  >
                    <span>
                      <strong className="text-amber-400 mr-2">{displayIndex + 1}.</strong> {item}
                    </span>
                    <span className="text-slate-500 text-[10px]">☰ Drag</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    handleAnswer(
                      sortArrangement.length === challenge.sortItems?.length
                        ? sortArrangement
                        : challenge.sortItems?.map((_, i) => i) || []
                    )
                  }
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow hover:brightness-110"
                >
                  Confirm Chronological Order
                </motion.button>
              </div>
            )}

            {challenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter year..."
                    aria-label="Numeric historical input"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-44"
                  />
                  <span className="text-sm text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow hover:brightness-110"
                  >
                    Check Year
                  </motion.button>
                </div>
              </div>
            )}

            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4 pt-2">
                <span className="text-xs text-slate-400 block">{challenge.validationHint}</span>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700"
                    >
                      + {part.replace(/_/g, ' ')}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-amber-950 text-amber-200 border border-amber-800 rounded-lg text-xs flex items-center gap-1.5">
                      {part.replace(/_/g, ' ')}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-200 font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow hover:brightness-110"
                >
                  Validate Sociological Chain
                </motion.button>
              </div>
            )}

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 rounded-2xl border border-amber-800/60 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-amber-300">
                    📜 Step-by-Step Historical Evidence
                  </span>
                  <span className="text-[11px] text-amber-400 font-mono">
                    Step {revealedSteps + 1} of{' '}
                    {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
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
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-slate-200 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400">{idx + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white text-xs font-bold rounded-xl"
                    >
                      Reveal Next Evidence Point →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 text-xs font-black rounded-xl shadow-lg hover:brightness-110"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finish Historical Analysis 🏆'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE: COMPLETION & SYNTHESIS ─── */}
      {phase === 'complete' && (
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="p-8 bg-gradient-to-br from-amber-950/60 via-slate-900 to-slate-900 rounded-3xl border border-amber-700/50 shadow-2xl space-y-5 text-center">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Mastery Verification Completed!
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have investigated the major civilisational transitions across Western Europe, Byzantium, and the Arabian Peninsula from 476 CE to 1453 CE.
            </p>

            <div className="flex justify-center gap-4 py-2">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 w-36">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-2xl font-black text-amber-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 w-36">
                <span className="text-xs text-slate-400 block">BKT Mastery</span>
                <span className="text-2xl font-black text-emerald-400 capitalize">{masteryLevel}</span>
              </div>
            </div>

            {/* PERSONALISED MOTIVATIONAL FEEDBACK (ERRORS: 0, 1-3, 4-7, 8+) */}
            <div className={`p-4 rounded-2xl border text-sm max-w-2xl mx-auto text-left leading-relaxed ${
              errors === 0
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                : errors <= 3
                ? 'bg-sky-950/60 border-sky-500 text-sky-200'
                : errors <= 7
                ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                : 'bg-rose-950/60 border-rose-500 text-rose-200'
            }`}>
              <strong className="block text-xs uppercase tracking-wider mb-1">
                {errors === 0 ? '🌟 PERFECT SCORE!' : errors <= 3 ? '👏 Great work!' : errors <= 7 ? '👍 Good effort!' : '💪 Do not give up — You WILL get this!'}
              </strong>
              {getMotivationalFeedback(errors)}
            </div>
          </div>

          {/* ─── SPACED REPETITION (SRS) SCHEDULE CARD ─── */}
          <div className="p-6 bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 rounded-3xl border-2 border-amber-500/40 shadow-xl space-y-3">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📅</span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                    Spaced Repetition System (SRS)
                  </span>
                  <h4 className="text-base font-black text-white">
                    Next Recommended Review Schedule
                  </h4>
                </div>
              </div>
              <div className="px-4 py-2 bg-amber-500 text-slate-950 font-black text-sm rounded-xl shadow uppercase tracking-wide">
                {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Based on your score and {errors} error{errors === 1 ? '' : 's'}, your next review interval is calibrated by the SM-2 algorithm to guarantee long-term retention before your exams:
            </p>

            <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
              <div className={`p-2.5 rounded-xl border transition-all ${
                errors === 0
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold shadow-lg'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400'
              }`}>
                <span className="block text-[10px] uppercase font-mono mb-0.5">0 Errors</span>
                <span>Review in 7 days</span>
              </div>
              <div className={`p-2.5 rounded-xl border transition-all ${
                errors >= 1 && errors <= 3
                  ? 'bg-sky-950/80 border-sky-500 text-sky-200 font-bold shadow-lg'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400'
              }`}>
                <span className="block text-[10px] uppercase font-mono mb-0.5">1–3 Errors</span>
                <span>Review in 3 days</span>
              </div>
              <div className={`p-2.5 rounded-xl border transition-all ${
                errors >= 4
                  ? 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold shadow-lg'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400'
              }`}>
                <span className="block text-[10px] uppercase font-mono mb-0.5">4+ Errors</span>
                <span>Review in 1 day</span>
              </div>
            </div>
          </div>

          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-3xl border border-rose-800/50 space-y-4">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                <span>⚠️</span> Specific Historical Misconceptions Addressed
              </h3>
              <div className="space-y-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 leading-relaxed">✓ Historical Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
              🌍 {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((st, idx) => (
                <li key={idx} className="leading-snug">{st}</li>
              ))}
            </ul>
          </div>
        </motion.section>
      )}

      {/* ─── FLOATING FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Stage Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import gsap from 'gsap';

// ─── NODE IDS ───
const NODE_C7_HISTCIV_011 = 'c7_histciv_011';
const NODE_C7_HISTCIV_012 = 'c7_histciv_012';
const NODE_C7_HISTCIV_013 = 'c7_histciv_013';
const NODE_C7_HISTCIV_014 = 'c7_histciv_014';
const NODE_C7_HISTCIV_015 = 'c7_histciv_015';
const NODE_C7_HISTCIV_016 = 'c7_histciv_016';
const NODE_C7_HISTCIV_017 = 'c7_histciv_017';
const NODE_C7_HISTCIV_018 = 'c7_histciv_018';
const NODE_C7_HISTCIV_019 = 'c7_histciv_019';
const NODE_C7_HISTCIV_020 = 'c7_histciv_020';

const ALL_NODE_IDS = [
  NODE_C7_HISTCIV_011,
  NODE_C7_HISTCIV_012,
  NODE_C7_HISTCIV_013,
  NODE_C7_HISTCIV_014,
  NODE_C7_HISTCIV_015,
  NODE_C7_HISTCIV_016,
  NODE_C7_HISTCIV_017,
  NODE_C7_HISTCIV_018,
  NODE_C7_HISTCIV_019,
  NODE_C7_HISTCIV_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Chronicles of Faith & Empire: From Mecca to the Throne of Delhi',
  intro: 'You are an apprentice imperial archivist in Delhi, 1330 CE. A catastrophic flood in the royal library has mixed centuries of historical scrolls — from the foundational Five Pillars in Arabia and the Hijrat to the rise of the Caliphates, the Ghaznavid/Ghurid invasions, and the dynamic reigns of the Delhi Sultans.',
  context: 'To restore the Imperial Chronicles, you must investigate historical turning points, reconstruct religious obligations, decode economic and military reforms, and test royal experiments before Sultan Muhammad bin Tughlaq reviews your archival work.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In 1329 CE, Sultan Muhammad bin Tughlaq issued copper coins stamped at par with silver tankas. What was the immediate, unexpected outcome that wrecked the royal treasury?',
  options: [
    'Foreign kingdoms refused to trade using any copper coins',
    'Private households and local minters easily mass-counterfeited copper coins',
    'Soldiers mutinied because copper was considered unholy for wages',
    'The copper mines of Rajasthan completely dried up within a month',
  ],
  correctIndex: 1,
  hintAfter: 'A fascinating economic failure! Copper was abundant and easy to strike at home without royal anti-counterfeiting seals. Let us explore the historical mechanics!',
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

// ─── 22 CHALLENGES (Foundation, Standard, Advanced across all 10 nodes) ───
const CHALLENGES: Challenge[] = [
  // Foundation 1 (c7_histciv_011)
  {
    id: 'ch_011_f1',
    nodeId: NODE_C7_HISTCIV_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A merchant has saved ₹1,00,000 above the nisab threshold for one full year. What is the mandatory Zakat amount due?',
    options: ['₹1,000 (1%)', '₹2,500 (2.5%)', '₹5,000 (5%)', '₹10,000 (10%)'],
    correctIndex: 1,
    explanation: 'Zakat is the compulsory third pillar of Islam fixed precisely at 2.5% of accumulated annual savings above the nisab threshold. Unlike voluntary charity (Sadaqah), Zakat is a binding religious duty.',
    hints: [
      'Recall the percentage fixed for Zakat on accumulated annual wealth.',
      'It is two and a half rupees for every hundred rupees saved.',
      '2.5% of ₹1,00,000 equals ₹2,500.',
    ],
    misconceptionIndex: 0,
  },
  // Foundation 2 (c7_histciv_011 - Drag-Sort)
  {
    id: 'ch_011_f2',
    nodeId: NODE_C7_HISTCIV_011,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the five daily prescribed prayers (Salat) in chronological order from dawn to nightfall.',
    sortItems: ['Fajr (Dawn)', 'Zuhr (Noon)', 'Asr (Afternoon)', 'Maghrib (Sunset)', 'Isha (Night)'],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Salat follows the daily sun cycle: Fajr (before sunrise), Zuhr (midday/noon), Asr (late afternoon), Maghrib (just after sunset), and Isha (dark of night).',
    hints: [
      'Start with the prayer performed at the crack of dawn before sunrise.',
      'Midday noon prayer precedes the afternoon prayer.',
      'Sunset (Maghrib) comes before the final night prayer (Isha).',
    ],
    misconceptionIndex: 1,
  },
  // Foundation 3 (c7_histciv_012)
  {
    id: 'ch_012_f3',
    nodeId: NODE_C7_HISTCIV_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In which year did the Hijrat (migration from Mecca to Yathrib/Medina) occur, marking Year 1 of the Islamic (AH) calendar?',
    options: ['570 CE', '610 CE', '622 CE', '632 CE'],
    correctIndex: 2,
    explanation: 'The Hijrat occurred in 622 CE when Prophet Muhammad migrated to Yathrib (renamed Madinat al-Nabi / Medina). Caliph Umar established 622 CE as 1 AH because it marked the founding of the first self-governing Muslim community (ummah).',
    hints: [
      '570 CE was the Prophet\'s birth and 610 CE was the first revelation at Mount Hira.',
      'The migration occurred 12 years after the first revelation.',
      '622 CE marks the beginning of Year 1 Anno Hegirae (AH).',
    ],
    misconceptionIndex: 2,
  },
  // Foundation 4 (c7_histciv_013)
  {
    id: 'ch_013_f4',
    nodeId: NODE_C7_HISTCIV_013,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following attributes correctly belongs to Medina and NOT Mecca?',
    options: [
      'Location of the Kaaba and universal direction of prayer (qibla)',
      'Site of the Prophet\'s Mosque (Al-Masjid an-Nabawi) and tomb',
      'Birthplace of Prophet Muhammad in 570 CE',
      'Site of the obligatory annual Hajj pilgrimage rituals',
    ],
    correctIndex: 1,
    explanation: 'Medina houses the Prophet\'s Mosque (Al-Masjid an-Nabawi) and Muhammad\'s tomb. Mecca houses the Kaaba (the qibla), is the Prophet\'s birthplace, and is the destination of the Hajj.',
    hints: [
      'Think about where the Prophet lived after the 622 CE migration and where he was buried.',
      'The Kaaba and qibla are in Mecca.',
      'The Prophet\'s tomb and his first mosque are located in Medina.',
    ],
    misconceptionIndex: 3,
  },
  // Foundation 5 (c7_histciv_014)
  {
    id: 'ch_014_f5',
    nodeId: NODE_C7_HISTCIV_014,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Arrange the four Rashidun (Rightly Guided) Caliphs in their correct chronological succession.',
    sortItems: ['Abu Bakr (632–634 CE)', 'Umar ibn al-Khattab (634–644 CE)', 'Uthman ibn Affan (644–656 CE)', 'Ali ibn Abi Talib (656–661 CE)'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The four Rashidun Caliphs ruled consecutively: Abu Bakr (suppressed Ridda wars), Umar (great conquests & diwan), Uthman (standardised Quran), and Ali (moved capital to Kufa).',
    hints: [
      'The Prophet\'s companion in the cave of Thawr was the first caliph.',
      'Umar expanded the empire, followed by Uthman who compiled the Quran.',
      'Ali, the Prophet\'s cousin and son-in-law, was the fourth and final Rashidun caliph.',
    ],
    misconceptionIndex: 4,
  },
  // Foundation 6 (c7_histciv_017 - Drag-Label)
  {
    id: 'ch_017_f6',
    nodeId: NODE_C7_HISTCIV_017,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Place each Delhi Sultanate dynasty in its proper chronological slot on the imperial timeline.',
    dragItems: [
      { label: 'Mamluk (1206-1290)', targetId: 'slot_1' },
      { label: 'Khalji (1290-1320)', targetId: 'slot_2' },
      { label: 'Tughlaq (1320-1414)', targetId: 'slot_3' },
      { label: 'Sayyid (1414-1451)', targetId: 'slot_4' },
      { label: 'Lodi (1451-1526)', targetId: 'slot_5' },
    ],
    correctMapping: {
      slot_1: 'Mamluk (1206-1290)',
      slot_2: 'Khalji (1290-1320)',
      slot_3: 'Tughlaq (1320-1414)',
      slot_4: 'Sayyid (1414-1451)',
      slot_5: 'Lodi (1451-1526)',
    },
    explanation: 'The 320-year Delhi Sultanate comprised 5 dynasties: Mamluk -> Khalji -> Tughlaq -> Sayyid -> Lodi. Remember the mnemonic: "My King Takes Some Land".',
    hints: [
      'The Slave/Mamluk dynasty came first under Aibak in 1206.',
      'Khalji came before Tughlaq; Sayyid ruled between Tughlaq and Lodi.',
      'Lodi was the fifth and final dynasty, overthrown at Panipat in 1526.',
    ],
    misconceptionIndex: 5,
  },
  // Foundation 7 (c7_histciv_018)
  {
    id: 'ch_018_f7',
    nodeId: NODE_C7_HISTCIV_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which Mamluk Sultan received formal letters of recognition from the Abbasid Caliph of Baghdad in 1229 CE and completed the Qutb Minar?',
    options: ['Qutb-ud-din Aibak', 'Shams-ud-din Iltutmish', 'Razia Sultan', 'Ghiyas-ud-din Balban'],
    correctIndex: 1,
    explanation: 'Shams-ud-din Iltutmish received investiture from the Abbasid Caliph al-Mustansir in 1229 CE, gaining international legitimacy for the Delhi Sultanate. He also completed the Qutb Minar around 1230 CE.',
    hints: [
      'Aibak died after just 4 years in 1210 and could not finish the minar.',
      'This Sultan ruled for 25 years (1211–1236) and consolidated the Sultanate.',
      'His name is Shams-ud-din Iltutmish.',
    ],
    misconceptionIndex: 6,
  },

  // Standard 1 (c7_histciv_012)
  {
    id: 'ch_012_s1',
    nodeId: NODE_C7_HISTCIV_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did the delegates of the Aws and Khazraj tribes invite Prophet Muhammad to Yathrib at the Pledges of Aqaba (621-622 CE)?',
    options: [
      'They wanted an experienced general to conquer the Byzantine Empire',
      'They had exhausted themselves in chronic tribal blood feuds and sought a neutral, trustworthy arbitrator',
      'They sought to take control of the lucrative Meccan trade routes by force',
      'They were forced to submit after a major military siege by Meccan Muslims',
    ],
    correctIndex: 1,
    explanation: 'The Aws and Khazraj of Yathrib suffered from relentless inter-tribal warfare. Knowing Muhammad\'s reputation as Al-Amin (the trustworthy), they invited him as an impartial arbiter and moral authority to establish civic peace.',
    hints: [
      'Consider the social conditions in Yathrib before the migration.',
      'Blood feuds were destroying the oasis settlements.',
      'They needed an impartial outsider of integrity to unite their community.',
    ],
  },
  // Standard 2 (c7_histciv_014)
  {
    id: 'ch_014_s2',
    nodeId: NODE_C7_HISTCIV_014,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What was the foundational historical root of the Sunni-Shia division in 632 CE?',
    options: [
      'A fundamental disagreement over whether to observe the Five Pillars of Islam',
      'A dispute over whether the Quran should be translated into Persian and Greek',
      'A political succession disagreement over who should lead the ummah after the Prophet left no appointed successor',
      'A theological conflict regarding the daily timing and direction of Salat',
    ],
    correctIndex: 2,
    explanation: 'The Sunni-Shia split originated strictly as a political succession dispute at the Saqifah of Bani Sa\'ida. Shia believed Ali (the Prophet\'s cousin and son-in-law) was the rightful direct successor, while Sunnis supported the community\'s elective choice of Abu Bakr.',
    hints: [
      'Both Sunnis and Shias observe the exact same Five Pillars and single Quran.',
      'The crisis began immediately upon the Prophet\'s passing because no successor was publicly named.',
      'It was an argument about who should sit in the leadership chair (Khalifa).',
    ],
  },
  // Standard 3 (c7_histciv_015)
  {
    id: 'ch_015_s3',
    nodeId: NODE_C7_HISTCIV_015,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How did the Abbasid Caliphate (Baghdad, 750 CE) fundamentally differ in character from the earlier Umayyad Caliphate (Damascus, 661 CE)?',
    options: [
      'The Abbasids focused strictly on conquering Spain and Sind, whereas Umayyads stopped all military campaigns',
      'The Umayyads were Arab-supremacist and conquest-driven, while Abbasids built a cosmopolitan, multi-ethnic empire focused on scholarship and trade',
      'The Abbasids banned Greek and Indian scientific texts, whereas Umayyads built the House of Wisdom',
      'The Umayyads moved the capital to Baghdad to be closer to Central Asian Silk routes',
    ],
    correctIndex: 1,
    explanation: 'Umayyad rule prioritized Arab nobility and rapid military conquest. The Abbasids overthrew them in 750 CE, founded Baghdad in 762 CE, and welcomed Persians, Christians, and Jews to collaborate in trade and scholarship at the House of Wisdom (Bayt al-Hikma).',
    hints: [
      'Compare Damascus (Mediterranean/Byzantine focus) with Baghdad (Mesopotamia/Eastern trade focus).',
      'Think about the multi-faith translation movement at the House of Wisdom.',
      'Abbasids were cosmopolitan and multi-ethnic, breaking the Arab monopoly.',
    ],
    misconceptionIndex: 7,
  },
  // Standard 4 (c7_histciv_016)
  {
    id: 'ch_016_s4',
    nodeId: NODE_C7_HISTCIV_016,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare Mahmud of Ghazni (early 11th century) with Muhammad of Ghor (late 12th century). Which statement accurately highlights their difference?',
    options: [
      'Mahmud of Ghazni founded the Delhi Sultanate, while Muhammad of Ghor only looted Somnath',
      'Mahmud conducted 17 plunder raids to enrich Ghazni and left, while Muhammad of Ghor fought for territorial conquest and delegated Indian rule to Aibak',
      'Both rulers established permanent provincial administrations across Gujarat and Bengal',
      'Muhammad of Ghor invaded India in 1026 CE, whereas Mahmud fought at Tarain in 1192 CE',
    ],
    correctIndex: 1,
    explanation: 'Mahmud of Ghazni raided 17 times (1000–1026 CE) solely to loot temple wealth and returned to Ghazni. Muhammad of Ghor (1175–1206 CE) sought permanent conquest, won the Second Battle of Tarain (1192 CE), and left Qutb-ud-din Aibak to build an enduring state.',
    hints: [
      'One came to "loot and leave", the other came to "conquer and stay".',
      'Mahmud raided Somnath in 1026 CE; Ghor fought at Tarain in 1191 and 1192 CE.',
      'Aibak was Ghor\'s slave-general, not Mahmud\'s.',
    ],
    misconceptionIndex: 8,
  },
  // Standard 5 (c7_histciv_018)
  {
    id: 'ch_018_s5',
    nodeId: NODE_C7_HISTCIV_018,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What was the contrasting relationship between Iltutmish and Balban regarding the "Chihalgani" (The Group of Forty)?',
    options: [
      'Iltutmish created the Chihalgani as loyal Turkish noble advisors, whereas Balban systematically destroyed it to enforce royal absolutism',
      'Balban founded the Chihalgani to protect Razia, but Iltutmish executed all forty members',
      'Both Sultans were murdered by the Chihalgani in military rebellions',
      'The Chihalgani was a military unit invented by Aibak and expanded by Balban',
    ],
    correctIndex: 0,
    explanation: 'Iltutmish created the Chihalgani (Corp of Forty Turkish nobles) to administer the state. Over time they became kingmakers. When Balban took power, he systematically executed or broke them under his "blood and iron" policy because "kingship knows no kinship".',
    hints: [
      'Who needed trusted noble administrators early on? Who wanted absolute personal power later?',
      'Iltutmish established it; Balban crushed it.',
      'Remember: Balban introduced Sijda and Paibos to place the Sultan far above any noble.',
    ],
    misconceptionIndex: 9,
  },
  // Standard 6 (c7_histciv_019)
  {
    id: 'ch_019_s6',
    nodeId: NODE_C7_HISTCIV_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did Alauddin Khalji impose strict price controls on grain, cloth, and cattle in the three regulated markets of Delhi (Siri, Mandi, Sarai-i-Adl)?',
    options: [
      'As a philanthropic charitable welfare program to feed the urban poor of Delhi',
      'To maintain a massive, well-equipped standing cavalry army at low cost to defend against repeated Mongol invasions',
      'To bankrupt the merchant guilds of Gujarat who refused to pay maritime taxes',
      'Because the Abbasid Caliph in Baghdad ordered uniform imperial price decrees',
    ],
    correctIndex: 1,
    explanation: 'Alauddin faced major Mongol sieges in 1299, 1303, and 1305. To maintain a huge standing army without emptying the treasury, he fixed essential commodity prices (e.g. wheat at 7.5 jitals/man) so soldier salaries could remain modest.',
    hints: [
      'Connect the economic policy to his major external military threat (Mongols).',
      'A standing army requires food and equipment. High market prices require paying higher salaries.',
      'Fixed cheap prices allowed the state to afford a large standing army.',
    ],
    misconceptionIndex: 10,
  },
  // Standard 7 (c7_histciv_019 - Numeric)
  {
    id: 'ch_019_s7',
    nodeId: NODE_C7_HISTCIV_019,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under Alauddin Khalji\'s agrarian zabt reforms, what fixed percentage of gross agricultural produce was demanded as state land revenue from peasants in the Doab?',
    correctAnswer: 50,
    tolerance: 0,
    unit: '% of produce',
    explanation: 'Alauddin Khalji raised the state land revenue assessment to exactly 50% (one-half) of produce based on actual land measurement (zabt), the highest rate in medieval Indian history.',
    hints: [
      'It represented half of the peasant\'s harvested crop.',
      'Enter the numerical value for 1/2 in percentage form.',
      'The exact rate was 50%.',
    ],
  },
  // Standard 8 (c7_histciv_020 - Construct)
  {
    id: 'ch_020_s8',
    nodeId: NODE_C7_HISTCIV_020,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Construct the chronological cause-and-effect sequence of Muhammad bin Tughlaq\'s Token Currency crisis by selecting the 4 key stages in order.',
    availableParts: [
      'Silver reserves depleted',
      'Copper coins issued at par with silver',
      'Widespread home counterfeiting by minters',
      'Treasury redeems fake copper with genuine silver',
      'Mongol alliance established',
      'Gold coins demonetized permanently',
    ],
    targetState: 'Silver reserves depleted -> Copper coins issued at par with silver -> Widespread home counterfeiting by minters -> Treasury redeems fake copper with genuine silver',
    validationHint: 'Think: Why was it issued -> What was the currency -> What went wrong -> How did the Sultan recover the coins?',
    explanation: '1. Silver shortages prompted token copper/brass coins. 2. Coins were struck without royal anti-forgery mechanisms. 3. Citizens minted copper tankas at home. 4. Trust collapsed and the Sultan redeemed piles of worthless copper with royal treasury silver.',
    hints: [
      'Start with the treasury need to conserve silver.',
      'Next comes the issuance of copper/brass coins equal to silver tankas.',
      'Follow with the illegal mass-counterfeiting by households and smiths like Hausala.',
    ],
    misconceptionIndex: 11,
  },

  // Advanced 1 (c7_histciv_013 - Application Scenario)
  {
    id: 'ch_013_a1',
    nodeId: NODE_C7_HISTCIV_013,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'When Prophet Muhammad re-entered Mecca in 630 CE with 10,000 followers, how did his declaration of a general amnesty serve both moral and strategic statecraft?',
    options: [
      'It humiliated the Quraysh leadership by forcing them into exile across the Red Sea',
      'It avoided a bloody civil war, secured the voluntary allegiance of the experienced Quraysh mercantile elite, and peacefully unified Arabia under one faith',
      'It allowed the Muslim army to immediately seize all private merchant wealth to fund northern conquests',
      'It fulfilled the terms of unconditional surrender dictated by the Persian Sasanian emperor',
    ],
    correctIndex: 1,
    explanation: 'By granting clemency even to lifelong adversaries like Abu Sufyan and removing the 360 idols without bloodshed, Muhammad transformed former enemies into loyal administrators and commanders of the expanding Islamic state.',
    hints: [
      'Consider what would happen if Mecca\'s merchant aristocracy had been slaughtered.',
      'Clemency preserved the administrative and commercial talents of the Quraysh.',
      'It united tribal Arabia through reconciliation rather than enduring vendettas.',
    ],
  },
  // Advanced 2 (c7_histciv_015 - Creative/Analytical)
  {
    id: 'ch_015_a2',
    nodeId: NODE_C7_HISTCIV_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How did the translation movement at the Abbasid House of Wisdom (Bayt al-Hikma) directly influence global intellectual history and modern mathematics?',
    options: [
      'It replaced all mathematical numerals with Roman alphabetic ciphers',
      'It synthesised Indian decimal place-value numerals (including zero) and Greek geometry, creating Algebra under al-Khwarizmi which later reached Renaissance Europe',
      'It banned observational astronomy in favor of astrological predictions',
      'It prevented Indian mathematical texts from ever leaving the Indus Valley',
    ],
    correctIndex: 1,
    explanation: 'Scholars at Baghdad translated Indian astronomical/mathematical texts (like Brahmagupta\'s Brahmasphutasiddhanta). Al-Khwarizmi developed "Al-Jabr" (algebra) and algorithms using the Hindu numeral system with zero, which later revolutionized European science.',
    hints: [
      'Think about where the word "Algebra" and "Algorithm" come from.',
      'Indian mathematical concepts (zero, 1-9 digits) were translated from Sanskrit to Arabic.',
      'These texts were later translated into Latin in Spain and Italy, sparking modern mathematics.',
    ],
  },
  // Advanced 3 (c7_histciv_016 - Evaluation)
  {
    id: 'ch_016_a3',
    nodeId: NODE_C7_HISTCIV_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate why North Indian Rajput kingdoms repeatedly succumbed to Turkish cavalry forces between 1000 and 1192 CE despite possessing vast armies and elephants.',
    options: [
      'Rajputs had no knowledge of iron weapons or fort architecture',
      'Chronic inter-kingdom rivalries (e.g., Chauhans vs Gahadavalas) prevented a unified defence, while Turkish forces utilized superior mobile mounted archery and tactical cohesion',
      'The Rajput kings voluntarily surrendered in exchange for maritime trade monopolies',
      'Turkish armies possessed early gunpowder artillery and cannons at the Battle of Tarain',
    ],
    correctIndex: 1,
    explanation: 'Political fragmentation after Harsha left Rajput kingdoms fighting each other (e.g. Jayachandra of Kanauj not supporting Prithviraj Chauhan). Tactically, slow elephant corps and frontal charges were outmanoeuvred by swift Central Asian mounted archers using feigned retreats.',
    hints: [
      'Look at internal political unity among Rajput clans.',
      'Compare military mobility: war elephants vs mounted cavalry archers.',
      'Gunpowder had NOT yet been introduced in 1192 CE.',
    ],
  },
  // Advanced 4 (c7_histciv_017 - Analysis)
  {
    id: 'ch_017_a4',
    nodeId: NODE_C7_HISTCIV_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why did the Delhi Sultanate experience 5 distinct dynasties over 320 years instead of one continuous hereditary ruling line?',
    options: [
      'The Caliph of Baghdad deposed every Sultan after exactly sixty years of rule',
      'The Sultanate lacked a fixed law of hereditary succession (primogeniture); military strength and noble support decided who seized the throne',
      'Hindu Rajput kings chose the Sultans in annual diplomatic assemblies',
      'Mongol treaties required the Sultan to change dynasties every four decades',
    ],
    correctIndex: 1,
    explanation: 'The Delhi Sultanate never established primogeniture (automatic rule to eldest son). The throne was open to whichever general or faction commanded the strongest cavalry and noble support, leading to violent coups and dynastic changes.',
    hints: [
      'Think about how Aibak, Jalal-ud-din Khalji, and Ghiyas-ud-din Tughlaq each took power.',
      'Did the eldest son always inherit peacefully?',
      'Military might and noble factions determined succession.',
    ],
  },
  // Advanced 5 (c7_histciv_019 - Deccan Strategy)
  {
    id: 'ch_019_a5',
    nodeId: NODE_C7_HISTCIV_019,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why did Alauddin Khalji adopt a policy of indirect tribute in the Deccan (Devagiri, Warangal, Madurai) rather than direct territorial annexation as he did in North India (Gujarat, Chittor)?',
    options: [
      'The Deccan rulers possessed superior naval fleets that Delhi could not match',
      'Direct administration of the distant south was logistically impossible with 14th-century communications; extracting gold and elephants provided revenue without administrative overstretch',
      'Malik Kafur signed a religious peace pact that forbade Muslim governors south of the Vindhyas',
      'The Mongols had already occupied the entire Deccan plateau',
    ],
    correctIndex: 1,
    explanation: 'Alauddin recognized that governing territories 1,000 miles away across the Vindhya mountains would drain his administrative and military resources. Extracting regular tribute and enormous war indemnity was vastly more practical than direct rule.',
    hints: [
      'Consider the geographical barrier of the Vindhya mountains and travel time in 1310 CE.',
      'Direct annexation requires garrisons, governors, and tax collectors far from Delhi.',
      'Tribute gave wealth to fund his army without the nightmare of distant governance.',
    ],
  },
  // Advanced 6 (c7_histciv_020 - Comparative Evaluation)
  {
    id: 'ch_020_a6',
    nodeId: NODE_C7_HISTCIV_020,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why do modern historians describe Muhammad bin Tughlaq as "a mixture of opposites" rather than simply dismissing him as "mad"?',
    options: [
      'He won every military campaign but refused to collect any land taxes',
      'His administrative schemes (central capital, token currency, agricultural loans) were intellectually visionary, but failed due to disastrous timing, lack of administrative safeguards, and tyrannical execution',
      'He built the Qutb Minar while simultaneously destroying the city of Delhi',
      'He abdicated the throne three times to live as a wandering Sufi monk',
    ],
    correctIndex: 1,
    explanation: 'Muhammad bin Tughlaq was deeply scholarly, innovative, and secular in appointing merit-based officers. His ideas (like Daulatabad\'s central location or token currency like modern paper money) were ahead of his time, but ruined by terrible implementation and cruelty.',
    hints: [
      'Look at the conceptual intent behind his experiments versus their practical execution.',
      'Was token currency a rational idea that lacked anti-counterfeiting technology?',
      'Visionary intellect combined with disastrous, rigid execution.',
    ],
    misconceptionIndex: 12,
  },
  // Advanced 7 (c7_histciv_020 - Numeric)
  {
    id: 'ch_020_a7',
    nodeId: NODE_C7_HISTCIV_020,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Firuz Shah Tughlaq restored agricultural prosperity after 1351 CE. For how many consecutive years did he rule the Sultanate, repairing canals and the treasury?',
    correctAnswer: 37,
    tolerance: 0,
    unit: 'years (1351–1388 CE)',
    explanation: 'Firuz Shah Tughlaq ruled for 37 years from 1351 to 1388 CE, repairing the fiscal and administrative damage caused by his predecessor\'s failed experiments.',
    hints: [
      'Calculate the difference between 1388 and 1351 CE.',
      '1388 minus 1351 equals...',
      'He ruled for 37 years.',
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
  nodeId: 'c7_histciv_011',
  title: 'From the Five Pillars to the Delhi Sultanate',
  definition: 'An integrated study of early Islamic history, the Caliphates, the Turkish invasions, and the foundation, expansion, and administration of the Delhi Sultanate (1206–1526 CE).',
  eli5: 'Discover how Islam arose in Arabia through the Five Pillars, how empires grew in Damascus and Baghdad, why Turkish rulers marched into India, and how five dynamic dynasties ruled Delhi from the Yamuna river.',
  misconceptions: [
    { misconception: 'Zakat is an optional charity donation', correction: 'Zakat is a compulsory 2.5% religious tax on accumulated annual savings above nisab; voluntary charity is called Sadaqah.' },
    { misconception: 'Salat prayers have no fixed chronological sequence', correction: 'The five daily prayers must be performed in exact sequence: Fajr (dawn), Zuhr (noon), Asr (afternoon), Maghrib (sunset), and Isha (night).' },
    { misconception: 'The Islamic calendar begins from the Prophet\'s birth or first revelation', correction: 'The Hijri calendar begins from 622 CE (the Hijrat to Medina), formalised by Caliph Umar in 638 CE as the founding of the ummah.' },
    { misconception: 'The Prophet\'s tomb is located in Mecca', correction: 'The Prophet\'s tomb is in Medina at Al-Masjid an-Nabawi; Mecca houses the Kaaba and Masjid al-Haram.' },
    { misconception: 'The Sunni-Shia division began over theological differences in the Five Pillars', correction: 'The split was purely a political succession dispute over who should lead the Muslim state after 632 CE.' },
    { misconception: 'The Delhi Sultanate had only 4 dynasties, omitting the Sayyids', correction: 'There were 5 dynasties: Mamluk, Khalji, Tughlaq, Sayyid (1414-1451 CE), and Lodi.' },
    { misconception: 'Mamluk rulers remained literal slaves while sitting on the throne', correction: 'Mamluks were of military-slave origin but were formally manumitted (freed) before becoming sovereign Sultans.' },
    { misconception: 'Umayyads and Abbasids were the exact same empire in different cities', correction: 'Umayyads (Damascus) were Arab-supremacist and conquest-driven; Abbasids (Baghdad) were cosmopolitan, patronising multi-faith scholarship at the House of Wisdom.' },
    { misconception: 'Mahmud of Ghazni founded the Delhi Sultanate', correction: 'Mahmud was a raider who looted temples and left (1000-1026 CE); Muhammad of Ghor\'s deputy Qutb-ud-din Aibak founded the Sultanate in 1206 CE.' },
    { misconception: 'Balban created the Chihalgani', correction: 'Iltutmish created the Chihalgani (Forty Nobles); Balban systematically destroyed it.' },
    { misconception: 'Alauddin Khalji\'s market price controls were a welfare measure for the poor', correction: 'Market price controls were instituted for military logistics to afford a massive standing cavalry army against Mongol invasions.' },
    { misconception: 'Token currency failed because people simply disliked copper', correction: 'Token currency failed because of widespread domestic counterfeiting without state minting security seals.' },
    { misconception: 'Muhammad bin Tughlaq was simply an insane monarch', correction: 'Tughlaq was a visionary scholar whose radical ideas failed due to catastrophic implementation and administrative overreach.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the mandatory rate of Zakat on annual savings above nisab?', options: ['1%', '2.5%', '5%', '10%'], correctIndex: 1 },
    { question: 'In which year did the Hijrat establish Year 1 of the Islamic calendar?', options: ['570 CE', '610 CE', '622 CE', '632 CE'], correctIndex: 2 },
    { question: 'Which city houses the Kaaba and acts as the universal qibla?', options: ['Medina', 'Jerusalem', 'Mecca', 'Damascus'], correctIndex: 2 },
    { question: 'Who was the first elected Caliph of Islam following the death of Prophet Muhammad?', options: ['Umar', 'Ali', 'Abu Bakr', 'Uthman'], correctIndex: 2 },
    { question: 'Which institution in Baghdad became the hub for translating Greek and Indian texts?', options: ['Al-Azhar', 'House of Wisdom', 'Nalanda', 'Topkapi'], correctIndex: 1 },
    { question: 'Who won the Second Battle of Tarain in 1192 CE?', options: ['Prithviraj Chauhan', 'Mahmud of Ghazni', 'Muhammad of Ghor', 'Qutb-ud-din Aibak'], correctIndex: 2 },
    { question: 'Which dynasty ruled Delhi between the Tughlaqs and the Lodis?', options: ['Mamluk', 'Khalji', 'Sayyid', 'Mughal'], correctIndex: 2 },
    { question: 'Which Sultan introduced the market price control system in Delhi?', options: ['Balban', 'Iltutmish', 'Alauddin Khalji', 'Muhammad bin Tughlaq'], correctIndex: 2 },
  ],
  masteryCriteria: 'Demonstrates comprehensive understanding of Islamic foundations, Caliphate transitions, Turkish invasions, and Delhi Sultanate dynasties, administrative reforms, and military policies.',
};

// ─── INTERACTIVE EXPLORATION STEPS ──��
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Five Pillars Architecture',
    instruction: 'Click on each of the five pillars to inspect its spiritual duty, frequency, and historical significance.',
    interactionType: 'click-pillar',
    nodeId: NODE_C7_HISTCIV_011,
  },
  {
    title: 'Lab 2: Sacred Geography — Mecca vs Medina',
    instruction: 'Toggle between Mecca and Medina to discover their distinct historical landmarks, events, and significance.',
    interactionType: 'toggle-city',
    nodeId: NODE_C7_HISTCIV_013,
  },
  {
    title: 'Lab 3: Baghdad House of Wisdom Translation Engine',
    instruction: 'Select knowledge sources (Greek Philosophy, Indian Mathematics, Persian Astronomy) to observe how the Bayt al-Hikma synthesised modern science.',
    interactionType: 'synthesise-knowledge',
    nodeId: NODE_C7_HISTCIV_015,
  },
  {
    title: 'Lab 4: Alauddin Khalji’s Market Control Simulator',
    instruction: 'Adjust the Mongol Threat level slider to see how it dictates army size, required treasury grain, and enforced ceiling prices in real time.',
    interactionType: 'slider-economy',
    nodeId: NODE_C7_HISTCIV_019,
  },
  {
    title: 'Lab 5: Tughlaq’s Token Currency Experiment Lab',
    instruction: 'Adjust the mint regulation and copper issuance sliders to simulate why token currency collapsed into counterfeiting.',
    interactionType: 'currency-simulator',
    nodeId: NODE_C7_HISTCIV_020,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Sultan Alauddin Khalji doubles his standing cavalry to 3,00,000 to repel Mongols without raising soldier salaries or looting, what MUST he do to grain prices?',
    options: [
      'Let free-market grain prices triple so farmers earn higher profits',
      'Enforce an artificial ceiling price on wheat (e.g. 7.5 jitals/man) and strictly punish hoarding',
      'Import all grain from Europe using maritime shipping',
      'Abolish all markets and disband the urban population of Delhi',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now drag the Mongol Threat slider in Lab 4 and observe how Price Regulation and Standing Cavalry update instantly!',
    nodeId: NODE_C7_HISTCIV_019,
  },
  {
    question: 'Predict: What happens when the royal treasury issues copper coins with the exact legal value of silver, but lacks royal watermarks or unique alloy stamping technology?',
    options: [
      'Citizens save their copper and spend silver exclusively',
      'Every village goldsmith and household stamps cheap copper into legal currency, destroying public trust',
      'The price of silver drops to zero',
      'Foreign merchants gift free silver to Delhi',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Counterfeit Risk in Lab 5 to see the treasury reserves empty in real time!',
    nodeId: NODE_C7_HISTCIV_020,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In the Market Control Simulator, when Mongol Threat increases, what happens to State Enforcement & Grain Seizures?',
    observableOptions: [
      'State control decreases as merchants self-regulate',
      'Strict state oversight at Siri, Mandi, and Sarai-i-Adl increases to guarantee cheap rations for cavalry',
      'The Sultan stops buying horses completely',
      'Peasants in the Doab pay 0% tax',
    ],
    correctIndex: 1,
    nodeId: NODE_C7_HISTCIV_019,
  },
  {
    question: 'Observation: In the sacred geography comparison, which unique rule applies exclusively to Mecca and NOT Medina?',
    observableOptions: [
      'Open to tourists and scholars of all world faiths',
      'Site of the Prophet\'s earthly burial chamber',
      'Access is strictly restricted to Muslims; site of universal prayer qibla',
      'It was founded in 622 CE by the Aws and Khazraj',
    ],
    correctIndex: 2,
    nodeId: NODE_C7_HISTCIV_013,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Archival Consultant: Modern Statecraft Analysis',
  description: 'Compare medieval monetary and market policies with modern economic systems in India today.',
  steps: [
    'Observe modern currency notes (RBI security thread, watermark, microlettering) and explain how they prevent the counterfeiting disaster of Muhammad bin Tughlaq (1329 CE).',
    'Investigate India\'s Public Distribution System (PDS / Ration shops) and compare its price-subsidised food grain mechanism with Alauddin Khalji\'s Mandi market system.',
    'Write a 3-point policy memo on why the Reserve Bank of India strictly regulates legal tender and fiat currency today.',
  ],
};

function C7_HistoryCivicsFivePillarsIslamSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C7_HISTCIV_011,
  title = DEFAULT_PROPS.title || 'From the Five Pillars to the Delhi Sultanate',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['histciv'] || { name: 'History & Civics', emoji: '📜', color: 'amber' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org pattern states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [sandboxReady, setSandboxReady] = useState(false);

  // Lab 1 (Five Pillars) State
  const [selectedPillar, setSelectedPillar] = useState<string>('shahada');
  const [pillarAudioPlayed, setPillarAudioPlayed] = useState<Record<string, boolean>>({});

  // Lab 2 (Sacred Geography) State
  const [selectedCity, setSelectedCity] = useState<'mecca' | 'medina'>('mecca');

  // Lab 3 (House of Wisdom) State
  const [selectedDiscipline, setSelectedDiscipline] = useState<'math' | 'astronomy' | 'medicine' | 'philosophy'>('math');
  const [translatedWorksCount, setTranslatedWorksCount] = useState(12);

  // Lab 4 (Khalji Market Simulator) Reactive State
  const [mongolThreat, setMongolThreat] = useState<number>(75);

  // Derived real-time metrics for Lab 4
  const armyStrength = useMemo(() => 100000 + Math.round((mongolThreat / 100) * 350000), [mongolThreat]);
  const wheatPriceFixed = useMemo(() => (mongolThreat > 50 ? 7.5 : Number((7.5 + (50 - mongolThreat) * 0.1).toFixed(1))), [mongolThreat]);

  // Lab 5 (Tughlaq Currency Simulator) Reactive State
  const [copperMintSupply, setCopperMintSupply] = useState<number>(80);

  // Derived real-time metrics for Lab 5
  const counterfeitRisk = useMemo(() => Math.min(100, Math.round(copperMintSupply * 1.15)), [copperMintSupply]);
  const treasurySilverDrain = useMemo(() => Math.min(100, Math.round(counterfeitRisk * 1.05)), [counterfeitRisk]);

  // Difficulty & BKT
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

  // Interactive challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Timeline GSAP interactive element ref
  const timelineRef = useRef<HTMLDivElement>(null);

  // Canvas ref for animated historic trade & conquest map routes
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Persistent BKT & Timer refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM MASTERY STORE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE MASTERY UPDATE ───
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

  // ─── GSAP ANIMATION ON EXPLORATION SLIDE CHANGE ───
  useEffect(() => {
    if (timelineRef.current) {
      gsap.fromTo(
        timelineRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [currentSlide, phase]);

  // ─── CANVAS 2D ANIMATION FOR HISTORIC CONQUEST / TRADE MAP ───
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

      // Draw subtle background grid
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Animated Trade & Conquest routes (Arabian Sea -> Gujarat -> Delhi)
      ctx.beginPath();
      ctx.moveTo(30, 45);
      ctx.quadraticCurveTo(120, 10, 220, 45);
      ctx.quadraticCurveTo(270, 60, 360, 30);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.setLineDash([6, 4]);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);

      // Moving Caravan / Army pulse
      const t = (frame % 200) / 200;
      const pulseX = 30 + t * 330;
      const pulseY = 45 + Math.sin(t * Math.PI * 2) * 12;

      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Key Nodes (Mecca / Baghdad / Delhi)
      const nodes = [
        { label: 'Mecca', x: 30, y: 45, col: '#10b981' },
        { label: 'Baghdad', x: 150, y: 25, col: '#6366f1' },
        { label: 'Ghazni', x: 250, y: 35, col: '#ec4899' },
        { label: 'Delhi', x: 360, y: 30, col: '#ef4444' },
      ];

      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = n.col;
        ctx.fill();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px sans-serif';
        ctx.fillText(n.label, n.x - 14, n.y - 8);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── USECALLBACK HANDLERS ───

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
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding historical insight!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration labs.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Explore the economic and statecraft simulators freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the archival challenges.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Now verify your prediction using the interactive controls.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on observation!' : 'Check the data indicators carefully.');
  }, []);

  const handlePillarSelect = useCallback((pillarId: string) => {
    setSelectedPillar(pillarId);
    audioManager.play('tap');
    const summaries: Record<string, string> = {
      shahada: 'Shahada: Affirmation of faith — There is no god but Allah, and Muhammad is His messenger.',
      salat: 'Salat: Five daily prescribed prayers facing the Kaaba in Mecca.',
      zakat: 'Zakat: Compulsory annual 2.5 per cent alms tax on wealth above nisab.',
      sawm: 'Sawm: Dawn to sunset fasting during the holy lunar month of Ramadan.',
      hajj: 'Hajj: Once in a lifetime pilgrimage to Mecca for those physically and financially able.',
    };
    if (!pillarAudioPlayed[pillarId]) {
      speechManager.speak(summaries[pillarId] || '');
      setPillarAudioPlayed(prev => ({ ...prev, [pillarId]: true }));
    }
  }, [pillarAudioPlayed]);

  const handleCityToggle = useCallback((city: 'mecca' | 'medina') => {
    setSelectedCity(city);
    audioManager.play('pop');
    if (city === 'mecca') {
      speechManager.speak('Mecca: Contains the Kaaba, qibla direction of prayer, and destination of Hajj.');
    } else {
      speechManager.speak('Medina: Site of the Prophet\'s Mosque, his tomb, and the founding of the ummah in 622 CE.');
    }
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You achieved a score of ${finalScore} per cent.`);
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
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Accurate archival record.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify({ score: 100, date: Date.now() }));
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
        speechManager.speak('Review the archival analysis carefully.');
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

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('pop');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // Clean up timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
              {title}
            </h1>
            <p className="text-xs text-slate-400 font-medium">ICSE Class 7 History & Civics • Integrated Unit</p>
          </div>
        </div>

        {/* Status / Phase Badges */}
        <div className="flex items-center gap-2">
          <motion.span
            key={phase}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-3 py-1 rounded-full text-xs font-bold bg-gold-900/60 border border-gold-700/60 text-gold-300 uppercase tracking-wider"
          >
            Phase: {phase}
          </motion.span>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 border-rose-700 text-rose-300'
                : 'bg-amber-950/60 border-amber-700 text-amber-300'
            }`}
          >
            {difficulty}
          </motion.span>
        </div>
      </motion.div>

      {/* ─── CANVAS 2D ANIMATED ROUTE HEADER (Top Map Banner) ─── */}
      <div className="relative mb-6 rounded-2xl overflow-hidden bg-slate-900/80 border border-slate-800 p-2">
        <div className="flex items-center justify-between px-3 py-1 text-[11px] font-semibold text-slate-400">
          <span>HISTORICAL AXIS: ARABIAN PENINSULA ➔ MESOPOTAMIA �� AFGHAN HIGHLANDS ➔ DELHI DOAB</span>
          <span className="text-amber-400">Interactive Geo-Chronicle</span>
        </div>
        <canvas ref={canvasRef} width={600} height={70} className="w-full h-16 rounded-xl block" />
      </div>

      {/* ─── PHASE 1: DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-gold-950/30 rounded-2xl border border-amber-800/40 shadow-xl">
            <div className="inline-block px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold mb-3">
              📜 ARCHIVAL SCENARIO
            </div>
            <h2 className="text-xl font-extrabold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-amber-200/80 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
              <h3 className="text-sm md:text-base font-bold text-white">Discovery Inquiry: Test Your Historical Intuition</h3>
            </div>
            <p className="text-sm text-slate-300">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 border-slate-700 hover:border-amber-500/60 hover:bg-slate-800 text-slate-200'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-slate-700/60 text-center text-xs leading-6 mr-2 font-mono">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-3 mt-4"
              >
                <p className={`text-sm font-bold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Excellent deduction!' : '💡 Historical Context Revealed:'}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">{DISCOVERY_QUESTION.hintAfter}</p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black rounded-xl text-sm shadow-lg shadow-amber-900/40"
                >
                  Enter Interactive Exploration Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>STEP {currentSlide + 1} OF {EXPLORATION_STEPS.length}</span>
            <span className="text-amber-400 font-semibold">{EXPLORATION_STEPS[currentSlide].title}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-7 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl space-y-5"
            >
              <div className="space-y-1">
                <h3 className="text-lg md:text-xl font-black text-amber-300">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-xs md:text-sm text-slate-300 font-medium">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ── LAB 1: FIVE PILLARS VISUALIZATION (SVG 1) ── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { id: 'shahada', name: '1. Shahada', desc: 'Declaration of Faith', col: '#10b981' },
                      { id: 'salat', name: '2. Salat', desc: '5 Daily Prayers', col: '#3b82f6' },
                      { id: 'zakat', name: '3. Zakat', desc: 'Compulsory 2.5% Alms', col: '#f59e0b' },
                      { id: 'sawm', name: '4. Sawm', desc: 'Ramadan Fasting', col: '#8b5cf6' },
                      { id: 'hajj', name: '5. Hajj', desc: 'Pilgrimage to Mecca', col: '#ec4899' },
                    ].map(p => (
                      <motion.button
                        key={p.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePillarSelect(p.id)}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                          selectedPillar === p.id
                            ? 'bg-slate-800 border-amber-400 shadow-lg shadow-amber-950/40 ring-2 ring-amber-500/20'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="w-4 h-4 rounded-full mb-2" style={{ backgroundColor: p.col }} />
                        <span className="text-xs font-bold text-white block">{p.name}</span>
                        <span className="text-[10px] text-slate-400">{p.desc}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Pillar Architecture SVG #1 */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 600 240" className="w-full h-auto">
                      <polygon points="40,60 300,15 560,60" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                      <text x="300" y="45" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">
                        HOUSE OF ISLAM (AL-UMMAH)
                      </text>

                      {[
                        { id: 'shahada', label: 'Shahada', x: 60, col: '#10b981' },
                        { id: 'salat', label: 'Salat', x: 170, col: '#3b82f6' },
                        { id: 'zakat', label: 'Zakat', x: 280, col: '#f59e0b' },
                        { id: 'sawm', label: 'Sawm', x: 390, col: '#8b5cf6' },
                        { id: 'hajj', label: 'Hajj', x: 500, col: '#ec4899' },
                      ].map(p => (
                        <g key={p.id} onClick={() => handlePillarSelect(p.id)} style={{ cursor: 'pointer' }}>
                          <rect
                            x={p.x}
                            y="60"
                            width="40"
                            height="130"
                            rx="4"
                            fill={selectedPillar === p.id ? p.col : '#334155'}
                            opacity={selectedPillar === p.id ? 1 : 0.6}
                            stroke="#475569"
                            strokeWidth="1.5"
                          />
                          <text
                            x={p.x + 20}
                            y="130"
                            textAnchor="middle"
                            fill="white"
                            fontSize="9"
                            fontWeight="bold"
                            transform={`rotate(-90 ${p.x + 20} 130)`}
                          >
                            {p.label}
                          </text>
                        </g>
                      ))}

                      <rect x="30" y="190" width="540" height="25" rx="4" fill="#0f172a" stroke="#475569" />
                      <text x="300" y="207" textAnchor="middle" fill="#94a3b8" fontSize="10">
                        {selectedPillar === 'shahada' && '★ Shahada: Gateway to Islam — affirmed before witnesses.'}
                        {selectedPillar === 'salat' && '★ Salat: Fajr, Zuhr, Asr, Maghrib, Isha — universal qibla.'}
                        {selectedPillar === 'zakat' && '★ Zakat: Compulsory economic wealth redistribution.'}
                        {selectedPillar === 'sawm' && '★ Sawm: Commemorates first revelation at Hira (610 CE).'}
                        {selectedPillar === 'hajj' && '★ Hajj: Tawaf (7 circuits) & Plain of Arafat in Dhu al-Hijjah.'}
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* ── LAB 2: SACRED GEOGRAPHY (MECCA VS MEDINA) (SVG 2) ── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex justify-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCityToggle('mecca')}
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm border transition-all ${
                        selectedCity === 'mecca'
                          ? 'bg-amber-600 border-amber-400 text-slate-950 shadow-lg shadow-amber-950/40'
                          : 'bg-slate-900 border-slate-700 text-slate-300'
                      }`}
                    >
                      🕋 MECCA (Makkah)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCityToggle('medina')}
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm border transition-all ${
                        selectedCity === 'medina'
                          ? 'bg-emerald-600 border-emerald-400 text-slate-950 shadow-lg shadow-emerald-950/40'
                          : 'bg-slate-900 border-slate-700 text-slate-300'
                      }`}
                    >
                      🕌 MEDINA (Yathrib / Madinat al-Nabi)
                    </motion.button>
                  </div>

                  {/* Sacred Geography SVG Diagram #2 */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 600 160" className="w-full h-auto">
                      <rect x="20" y="20" width="260" height="120" rx="12" fill={selectedCity === 'mecca' ? '#1e293b' : '#0f172a'} stroke={selectedCity === 'mecca' ? '#f59e0b' : '#334155'} strokeWidth="2" />
                      <rect x="120" y="45" width="50" height="50" rx="4" fill="#09090b" stroke="#eab308" strokeWidth="2" />
                      <line x1="120" y1="58" x2="170" y2="58" stroke="#eab308" strokeWidth="2" />
                      <text x="150" y="115" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Mecca: Kaaba & Qibla</text>
                      <text x="150" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">Birthplace (570 CE) • Hajj Center</text>

                      <rect x="320" y="20" width="260" height="120" rx="12" fill={selectedCity === 'medina' ? '#064e3b' : '#0f172a'} stroke={selectedCity === 'medina' ? '#10b981' : '#334155'} strokeWidth="2" />
                      <circle cx="450" cy="65" r="24" fill="#047857" stroke="#34d399" strokeWidth="2" />
                      <path d="M450,41 L450,47 M447,44 L453,44" stroke="#a7f3d0" strokeWidth="2" />
                      <text x="450" y="115" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Medina: Prophet&apos;s Mosque</text>
                      <text x="450" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">Tomb • Hijrat (622 CE / 1 AH) • First Ummah</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <div className="space-y-3">
                      <h4 className="text-sm font-extrabold text-amber-300 uppercase tracking-wider">
                        {selectedCity === 'mecca' ? 'Mecca Attributes' : 'Medina Attributes'}
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {selectedCity === 'mecca' ? (
                          <>
                            <li className="flex items-start gap-2">
                              <span className="text-amber-400 font-bold">1.</span>
                              <span><strong>Kaaba & Masjid al-Haram:</strong> Rededicated by the Prophet in 630 CE after removing 360 idols.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-amber-400 font-bold">2.</span>
                              <span><strong>Universal Qibla:</strong> The singular direction faced by Muslims across the globe in Salat.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-amber-400 font-bold">3.</span>
                              <span><strong>Birthplace & Revelation:</strong> Prophet born in 570 CE; first revelation at Cave of Hira in 610 CE.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-amber-400 font-bold">4.</span>
                              <span><strong>Access Restriction:</strong> Entry exclusively restricted to Muslims.</span>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-400 font-bold">1.</span>
                              <span><strong>Al-Masjid an-Nabawi:</strong> The Prophet&apos;s Mosque and his earthly burial chamber.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-400 font-bold">2.</span>
                              <span><strong>The Hijrat (622 CE):</strong> Destination of the migration that starts Year 1 AH of the Islamic calendar.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-400 font-bold">3.</span>
                              <span><strong>Constitution of Medina (Sahifa):</strong> First written charter binding Muslims, Aws, Khazraj, and Jewish clans into one ummah.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-400 font-bold">4.</span>
                              <span><strong>Access:</strong> Open to visitors of all world faiths.</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>

                    <div className="flex items-center justify-center bg-slate-900 rounded-xl p-4 border border-slate-800">
                      <div className="text-center space-y-2">
                        <span className="text-4xl">{selectedCity === 'mecca' ? '🕋' : '🕌'}</span>
                        <p className="text-xs font-bold text-white uppercase">{selectedCity === 'mecca' ? 'Spiritual Heart' : 'First Civic State'}</p>
                        <p className="text-[11px] text-slate-400 max-w-xs">
                          {selectedCity === 'mecca'
                            ? 'Examiner Tip: Never place the Prophet\'s tomb in Mecca; it is the sanctuary of the Kaaba.'
                            : 'Examiner Tip: Never place the Kaaba in Medina; Medina is the seat of the first Islamic Constitution.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: BAGHDAD HOUSE OF WISDOM (SVG 3) ── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* House of Wisdom Synthesis SVG #3 */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-gold-900/40">
                    <svg viewBox="0 0 600 150" className="w-full h-auto">
                      <circle cx="300" cy="75" r="45" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                      <text x="300" y="70" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontWeight="bold">BAYT AL-HIKMA</text>
                      <text x="300" y="85" textAnchor="middle" fill="#a5b4fc" fontSize="8">Baghdad (762 CE)</text>

                      {/* Input nodes */}
                      <g>
                        <circle cx="80" cy="45" r="28" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                        <text x="80" y="45" textAnchor="middle" fill="#7dd3fc" fontSize="8" fontWeight="bold">Greek Science</text>
                        <text x="80" y="55" textAnchor="middle" fill="#94a3b8" fontSize="7">Aristotle, Galen</text>
                        <line x1="108" y1="50" x2="255" y2="70" stroke="#38bdf8" strokeDasharray="3,3" />
                      </g>
                      <g>
                        <circle cx="80" cy="110" r="28" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                        <text x="80" y="108" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">Indian Math</text>
                        <text x="80" y="118" textAnchor="middle" fill="#94a3b8" fontSize="7">Zero, Brahmagupta</text>
                        <line x1="108" y1="105" x2="255" y2="80" stroke="#f59e0b" strokeDasharray="3,3" />
                      </g>
                      {/* Output node */}
                      <g>
                        <circle cx="520" cy="75" r="32" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                        <text x="520" y="70" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">Algebra & Optics</text>
                        <text x="520" y="82" textAnchor="middle" fill="#6ee7b7" fontSize="7">Al-Khwarizmi</text>
                        <line x1="345" y1="75" x2="488" y2="75" stroke="#34d399" strokeWidth="2" />
                      </g>
                    </svg>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'math', label: 'Indian Mathematics & Zero', text: 'Translated Brahmagupta (Sindhind). Al-Khwarizmi developed Algebra & algorithms.' },
                      { id: 'astronomy', label: 'Greek Astronomy & Ptolemy', text: 'Translated Ptolemy’s Almagest; corrected planetary tables & astrolabes.' },
                      { id: 'medicine', label: 'Galen & Indian Ayurveda', text: 'Synthesised Greek anatomy with Indian medicinal herbs at royal bimaristans.' },
                      { id: 'philosophy', label: 'Aristotle & Logic', text: 'Preserved classical philosophy, later translated into Latin in Spain & Italy.' },
                    ].map(d => (
                      <motion.button
                        key={d.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedDiscipline(d.id as 'math' | 'astronomy' | 'medicine' | 'philosophy');
                          audioManager.play('tap');
                          setTranslatedWorksCount(c => c + 1);
                        }}
                        className={`p-3 rounded-xl text-left border flex-1 min-w-[200px] transition-all ${
                          selectedDiscipline === d.id
                            ? 'bg-gold-950/80 border-gold-400 text-gold-200'
                            : 'bg-slate-950/50 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="text-xs font-bold text-white block">{d.label}</span>
                        <span className="text-[10px] text-slate-400 mt-1 block">{d.text}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-gold-900/40 text-center space-y-2">
                    <p className="text-xs text-gold-300 font-semibold">
                      📚 Abbasid Translation Engine Active: Multi-faith scholars (Muslim, Christian, Jewish, Sabian) at Bayt al-Hikma
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Through Baghdad, Hindu numerals 0–9 travelled to Europe, becoming known as &quot;Arabic numerals&quot; and powering the European Renaissance.
                    </p>
                  </div>
                </div>
              )}

              {/* ── LAB 4: ALAUDDIN KHALJI'S MARKET CONTROL ── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-amber-950/40 border border-amber-800 rounded-xl space-y-2">
                      <p className="text-xs font-bold text-amber-300">🤔 PREDICT BEFORE INTERACTING:</p>
                      <p className="text-xs text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5 pt-1">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="w-full text-left p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {predictionMade && !predictionVerified && (
                    <div className="p-3 bg-gold-950/50 border border-gold-800 rounded-xl text-xs text-gold-300">
                      👉 {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </div>
                  )}

                  {/* Interactive Mongol Threat Slider with Real-time Instant Visualization */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-300">MONGOL INVASION THREAT LEVEL:</span>
                      <span className="text-rose-400 font-extrabold">{mongolThreat}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={mongolThreat}
                      onChange={(e) => setMongolThreat(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                      aria-label="Mongol invasion threat slider"
                    />

                    {/* Real-time Dynamic Cavalry & Price Control SVG Visualization */}
                    <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 500 90" className="w-full h-auto">
                        <rect x="10" y="10" width="480" height="70" rx="8" fill="#0f172a" stroke="#334155" />
                        
                        {/* Threat Bar */}
                        <text x="20" y="32" fill="#94a3b8" fontSize="10" fontWeight="bold">Mongol Incursion Pressure</text>
                        <rect x="20" y="40" width="200" height="12" rx="6" fill="#1e293b" />
                        <rect x="20" y="40" width={mongolThreat * 2} height="12" rx="6" fill="#ef4444" />
                        
                        {/* Cavalry Mobilization Visual */}
                        <text x="260" y="32" fill="#fbbf24" fontSize="10" fontWeight="bold">Sultanate Cavalry Deployed</text>
                        <rect x="260" y="40" width="220" height="12" rx="6" fill="#1e293b" />
                        <rect x="260" y="40" width={Math.min(220, (armyStrength / 450000) * 220)} height="12" rx="6" fill="#f59e0b" />
                        
                        <text x="20" y="68" fill="#cbd5e1" fontSize="9">
                          Mongol Front: {mongolThreat > 70 ? 'CRITICAL BORDER INVASION' : 'MODERATE PATROLS'}
                        </text>
                        <text x="260" y="68" fill="#cbd5e1" fontSize="9">
                          Fixed Grain Ceiling: {wheatPriceFixed} Jitals/Man ({mongolThreat > 50 ? 'Enforced' : 'Floating'})
                        </text>
                      </svg>
                    </div>

                    {/* Dynamic Gauges */}
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 block">Standing Army Needed</span>
                        <span className="text-sm font-black text-amber-400">{armyStrength.toLocaleString()} Cavalry</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 block">Wheat Ceiling Price</span>
                        <span className="text-sm font-black text-emerald-400">{wheatPriceFixed} Jitals/Man</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 block">Market Surveillance</span>
                        <span className="text-sm font-black text-gold-400">Shahna-i-Mandi Active</span>
                      </div>
                    </div>
                  </div>

                  {mongolThreat > 60 && !observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-900 border border-slate-700 rounded-xl space-y-2">
                      <p className="text-xs font-bold text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="w-full text-left p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs text-slate-300 border border-slate-800"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ── LAB 5: TUGHLAQ TOKEN CURRENCY EXPERIMENT ── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-300">COPPER TOKEN CIRCULATION VOLUME:</span>
                      <span className="text-amber-400 font-extrabold">{copperMintSupply}%</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={100}
                      value={copperMintSupply}
                      onChange={(e) => setCopperMintSupply(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                      aria-label="Copper token issuance slider"
                    />

                    {/* Real-time Visualization of Treasury Vault */}
                    <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 500 75" className="w-full h-auto">
                        <rect x="10" y="8" width="480" height="60" rx="8" fill="#0f172a" stroke="#334155" />
                        <text x="25" y="28" fill="#f87171" fontSize="10" fontWeight="bold">Counterfeit Influx</text>
                        <rect x="25" y="36" width="200" height="12" rx="6" fill="#1e293b" />
                        <rect x="25" y="36" width={counterfeitRisk * 2} height="12" rx="6" fill="#ef4444" />
                        
                        <text x="265" y="28" fill="#fbbf24" fontSize="10" fontWeight="bold">Silver Tanka Treasury Loss</text>
                        <rect x="265" y="36" width="200" height="12" rx="6" fill="#1e293b" />
                        <rect x="265" y="36" width={treasurySilverDrain * 2} height="12" rx="6" fill="#f59e0b" />
                      </svg>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3 bg-slate-900 rounded-xl border border-rose-900/40 text-center">
                        <span className="text-[10px] text-slate-400 block">Illegal Counterfeiting Risk</span>
                        <div className="w-full bg-slate-800 h-2 rounded-full mt-1.5 overflow-hidden">
                          <motion.div
                            className="h-full bg-rose-500 rounded-full"
                            animate={{ width: `${counterfeitRisk}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-rose-400 mt-1 block">{counterfeitRisk}% (Hausala & Minters)</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-amber-900/40 text-center">
                        <span className="text-[10px] text-slate-400 block">Royal Treasury Silver Depletion</span>
                        <div className="w-full bg-slate-800 h-2 rounded-full mt-1.5 overflow-hidden">
                          <motion.div
                            className="h-full bg-amber-500 rounded-full"
                            animate={{ width: `${treasurySilverDrain}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-amber-400 mt-1 block">{treasurySilverDrain}% Depleted</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <strong>Historical Resolution:</strong> The Sultan had to cancel the scheme and buy back mountains of worthless copper tankas using genuine royal silver coins, crippling Delhi&apos;s treasury.
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 disabled:opacity-40 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs font-mono text-slate-400">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-amber-950/40"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg shadow-emerald-950/40"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <div className="inline-block px-2.5 py-0.5 rounded-md bg-gold-500/20 text-gold-300 text-xs font-bold">
              FREE EXPLORATION LAB
            </div>
            <h3 className="text-lg font-bold text-white">Imperial Policy Sandbox: Dual Control Center</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Manipulate economic variables without grading. Observe how Alauddin Khalji’s price ceilings and Muhammad bin Tughlaq’s token currency operate in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Panel 1: Khalji Market Simulator */}
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">1. Khalji Market Price Regulator</h4>
              <label className="text-[11px] text-slate-400 block">Mongol Threat Level: {mongolThreat}%</label>
              <input
                type="range"
                min={0}
                max={100}
                value={mongolThreat}
                onChange={(e) => setMongolThreat(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="p-3 bg-slate-900 rounded-xl text-xs space-y-1 text-slate-300">
                <p>Cavalry Maintained: <strong className="text-amber-400">{armyStrength.toLocaleString()}</strong></p>
                <p>Wheat Price: <strong className="text-emerald-400">{wheatPriceFixed} Jitals/Man</strong></p>
                <p>Market Status: <span className="text-gold-300 font-mono">Siri, Mandi, Sarai-i-Adl Pegged</span></p>
              </div>
            </div>

            {/* Panel 2: Tughlaq Token Currency */}
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">2. Tughlaq Token Currency Simulator</h4>
              <label className="text-[11px] text-slate-400 block">Copper Coin Issuance: {copperMintSupply}%</label>
              <input
                type="range"
                min={0}
                max={100}
                value={copperMintSupply}
                onChange={(e) => setCopperMintSupply(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="p-3 bg-slate-900 rounded-xl text-xs space-y-1 text-slate-300">
                <p>Counterfeit Index: <strong className="text-rose-400">{counterfeitRisk}%</strong></p>
                <p>Silver Vault Drain: <strong className="text-amber-400">{treasurySilverDrain}%</strong></p>
                <p>Outcome: <span className="text-slate-400">Mass domestic production of tankas</span></p>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black rounded-2xl text-sm shadow-xl shadow-emerald-950/40"
          >
            I Am Ready for Archival Challenges! →
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-amber-300 font-mono text-[10px] uppercase">
                Competency: {challenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 via-emerald-400 to-gold-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-bold text-white leading-snug">{challenge.question}</h3>

            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5 pt-2">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm font-medium transition-all border ${
                        wrongFlash
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/40'
                          : 'bg-slate-950/80 border-slate-800 hover:border-amber-500/50 hover:bg-slate-800 text-slate-200'
                      }`}
                    >
                      <span className="inline-block w-6 h-6 rounded-full bg-slate-800 text-center text-xs leading-6 mr-2 font-mono">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 w-full mb-1">DRAG LABELS INTO SLOTS:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-amber-600/90 text-slate-950 font-bold rounded-lg text-xs cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {['slot_1', 'slot_2', 'slot_3', 'slot_4', 'slot_5'].map((slotId, index) => (
                    <div
                      key={slotId}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(slotId)}
                      className="p-3 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 text-center min-h-[70px] flex flex-col justify-center items-center"
                    >
                      <span className="text-[10px] text-slate-500 font-mono mb-1">DYNASTY #{index + 1}</span>
                      <span className="text-xs font-bold text-amber-300">
                        {droppedLabels[slotId] || 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length < 5}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs"
                >
                  Verify Dynasty Sequence
                </motion.button>
              </div>
            )}

            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">Drag to reorder items from earliest to latest:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs md:text-sm font-medium text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-amber-400 mr-2 font-mono">{displayIdx + 1}.</strong> {item}
                      </span>
                      <span className="text-slate-600">☰</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs"
                >
                  Verify Order
                </motion.button>
              </div>
            )}

            {challenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-amber-500 outline-none w-48"
                  />
                  <span className="text-xs text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-slate-950 font-bold rounded-xl text-xs"
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            )}

            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-slate-200"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-3 py-1 bg-gold-900/80 border border-gold-700 rounded-lg text-xs text-gold-200 flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click sequence blocks above to construct the chain</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' -> '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs"
                >
                  Verify Constructed Chain
                </motion.button>
              </div>
            )}

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-amber-950/40 border border-amber-800/60 rounded-2xl space-y-3 mt-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300">HISTORICAL ANALYSIS & EXPLANATION:</span>
                  <span className="text-[10px] text-slate-400 font-mono">
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
                        className="text-xs md:text-sm text-amber-100/90 leading-relaxed"
                      >
                        <strong className="text-amber-400 font-mono mr-1.5">{idx + 1}.</strong>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim()).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                    >
                      Show Next Detail →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-emerald-950/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Mission →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION PHASE & PROFILE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-7 bg-gradient-to-br from-amber-950/40 via-slate-900 to-emerald-950/30 rounded-2xl border border-amber-500/40 text-center space-y-3 shadow-2xl">
            <span className="text-4xl">👑</span>
            <h2 className="text-2xl font-black text-white">Archival Mastery Achieved!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have successfully restored the historical scrolls spanning the Five Pillars, the Caliphates, the Turkish incursions, and the five dynasties of the Delhi Sultanate.
            </p>
            <div className="flex justify-center gap-6 pt-2">
              <div className="px-5 py-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">FINAL ACCURACY SCORE</span>
                <span className="text-xl font-black text-amber-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="px-5 py-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">BKT MASTERY LEVEL</span>
                <span className="text-xl font-black text-emerald-400 uppercase">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Performance Feedback</h3>
            <p className="text-base font-bold text-white">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {errors === 0
                ? 'Flawless Mastery! You demonstrated exceptional recall and high-order historical evaluation across all 10 nodes.'
                : errors <= 3
                ? 'You navigated complex causal questions with high competence. Review your minor misconception points below.'
                : errors <= 7
                ? 'Solid progress across early Islamic history and Delhi Sultanate administration. Keep reviewing key turning points.'
                : 'Historical concepts require active retrieval. Review the misconception profile and retry the simulation to solidify your understanding.'}
            </p>
          </div>

          {/* Reflection Section */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-extrabold text-amber-300 uppercase tracking-wider">🤔 Archival Reflection</h3>
            <div className="space-y-3 text-xs md:text-sm text-slate-300">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="font-bold text-amber-400 mb-1">1. What was the most surprising thing you learned?</p>
                <p className="text-slate-400 text-xs">Think about the House of Wisdom translation of Indian zero, or why Tughlaq&apos;s copper token coins were counterfeited so easily.</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="font-bold text-amber-400 mb-1">2. How would you explain this to a friend?</p>
                <p className="text-slate-400 text-xs">Explain how Alauddin Khalji controlled market prices not for charity, but to afford a massive anti-Mongol cavalry army.</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="font-bold text-amber-400 mb-1">3. Where in real life might you use this?</p>
                <p className="text-slate-400 text-xs">Consider how modern central banks (like the RBI) protect fiat currency from counterfeiting using watermarks and security threads.</p>
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 border border-rose-900/60 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                Targeted Misconception Profile ({hitMisconceptions.length} Flagged)
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ Historical Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <h3 className="text-xs font-bold text-gold-300 uppercase tracking-wider">Spaced Repetition Schedule (SM-2)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on your response latency and accuracy, your next recommended archival review is scheduled in{' '}
              <strong className="text-gold-400">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </strong>
              .
            </p>
          </div>

          {/* Real World Activity */}
          <div className="p-6 bg-gradient-to-br from-gold-950/30 to-slate-900 rounded-2xl border border-gold-800/40 space-y-3">
            <h3 className="text-sm font-extrabold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ol className="space-y-1.5 pt-1 text-xs text-slate-400 list-decimal list-inside">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">{step}</li>
              ))}
            </ol>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C7_HistoryCivicsFivePillarsIslamSim;
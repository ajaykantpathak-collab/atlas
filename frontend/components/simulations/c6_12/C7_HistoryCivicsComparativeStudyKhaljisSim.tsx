'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERALS ───
const NODE_C7_HISTCIV_021 = 'c7_histciv_021';
const NODE_C7_HISTCIV_022 = 'c7_histciv_022';
const NODE_C7_HISTCIV_023 = 'c7_histciv_023';
const NODE_C7_HISTCIV_024 = 'c7_histciv_024';
const NODE_C7_HISTCIV_025 = 'c7_histciv_025';
const NODE_C7_HISTCIV_026 = 'c7_histciv_026';
const NODE_C7_HISTCIV_027 = 'c7_histciv_027';
const NODE_C7_HISTCIV_028 = 'c7_histciv_028';
const NODE_C7_HISTCIV_029 = 'c7_histciv_029';
const NODE_C7_HISTCIV_030 = 'c7_histciv_030';

const ALL_NODE_IDS = [
  NODE_C7_HISTCIV_021,
  NODE_C7_HISTCIV_022,
  NODE_C7_HISTCIV_023,
  NODE_C7_HISTCIV_024,
  NODE_C7_HISTCIV_025,
  NODE_C7_HISTCIV_026,
  NODE_C7_HISTCIV_027,
  NODE_C7_HISTCIV_028,
  NODE_C7_HISTCIV_029,
  NODE_C7_HISTCIV_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Imperial Paradox: Sultans, Rayas, and Cannons (1290–1526 CE)',
  intro: 'You are appointed Chief Royal Archivist to evaluate two turbulent centuries across medieval India. From Delhi’s market regulations and disastrous currency reforms to the glorious Deccan capitals of Hampi and Gulbarga, and finally the smoky plains of Panipat, your analytical judgment will determine how history records this golden yet fractious era.',
  context: 'Trace policy outcomes, architectural fusion, Deccan rivalries over the Raichur Doab, and tactical revolutions on the battlefield.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'On 21 April 1526 at Panipat, Babur commanded only ~12,000 soldiers against Ibrahim Lodi’s ~100,000 men and 1,000 elephants. Why did Babur achieve a crushing victory in under half a day?',
  options: [
    'Babur had secretly bribed the entire Afghan front line to surrender before sunrise',
    'Babur integrated gunpowder field artillery, matchlocks, cart barricades (rakh), and flanking cavalry (tulghama)',
    'The Lodi army was completely unarmed due to severe metal shortages across the Doab',
    'Babur actually fielded an overwhelming army of 300,000 Central Asian cavalry',
  ],
  correctIndex: 1,
  hintAfter: 'Numbers alone did not determine medieval warfare! Let us explore how tactical integration and administrative execution altered India’s destiny.',
};

// ─── PREDICTION QUESTIONS (BRILLIANT PATTERN) ───
interface PredictionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  verifyInstruction: string;
}

export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If Alauddin Khalji fixes market prices at low rates while keeping army salaries modest, what will happen to imperial treasury stability and military supply readiness?',
    options: [
      'Treasury collapses immediately due to merchant revolts in Delhi',
      'The standing cavalry remains fully supplied without bankrupting the state treasury',
      'Soldiers abandon the army due to low purchasing power',
      'Grain production drops to zero across the Ganga Doab',
    ],
    correctIndex: 1,
    explanation: 'Alauddin’s price regulations ensured that soldiers could purchase provisions at fixed low prices, maintaining a vast standing army without requiring unsustainable cash salaries.',
    verifyInstruction: 'Adjust the Price Control Strictness slider in Lab Step 1 to observe the Cavalry Supply Index.',
  },
  {
    id: 'pred_2',
    question: 'If Babur deploys 700 chained carts (rakh) with gunpowder artillery gaps against Ibrahim Lodi’s 1,000 war elephants, what will be the battlefield outcome?',
    options: [
      'Lodi’s elephants will easily trample through the carts and crush Babur’s center',
      'Babur’s artillery noise and defensive barricade will panic the elephants, trampling Lodi’s own ranks',
      'The battle will result in a 3-month siege of Panipat',
      'Babur will be forced to abandon his artillery and retreat to Kabul',
    ],
    correctIndex: 1,
    explanation: 'The unaccustomed roar of Ottoman-cast cannons combined with the physical barrier of chained carts panicked the elephants, turning them back onto the tightly packed Lodi infantry.',
    verifyInstruction: 'Set Chained Carts (Rakh) to maximum in Lab Step 5 to observe the Panipat victory probability calculation.',
  },
];

// ─── OBSERVATION QUESTIONS (BRILLIANT PATTERN) ───
interface ObservationQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  observableOptions: string[];
}

export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'What do you notice about the relationship between Muhammad bin Tughlaq’s Doab tax rate during a drought and the Peasant Secession Risk in the simulator?',
    options: [
      'Higher taxation during drought conditions causes rebellion risk to spike dramatically above 80%',
      'Peasants happily pay higher taxes because drought increases crop value',
      'Rebellion risk remains unchanged regardless of tax rate',
      'Taxation has no effect on territorial secession in the Deccan',
    ],
    correctIndex: 0,
    explanation: 'When harsh taxation coincided with drought in the Ganga-Yamuna Doab, peasants fled the land, leading to widespread famine and provincial revolts.',
    observableOptions: [
      'Taxation rate directly drives rebellion risk during drought',
      'Drought has no impact on fiscal viability',
      'Secession risk only depends on Mongol incursions',
      'Doab taxation always generates surplus revenue',
    ],
  },
  {
    id: 'obs_2',
    question: 'When adjusting the territorial balance of the Raichur Doab between Vijayanagar and Bahamani, what happens to the trade port revenue?',
    options: [
      'Dominance over the fertile river doab and ports maximizes state revenue and Arabian war-horse imports',
      'Port revenue remains completely static at zero for both kingdoms',
      'Both kingdoms lose all revenue when controlling the Tungabhadra basin',
      'Trade tribute only flows if the Delhi Sultanate controls Goa',
    ],
    correctIndex: 0,
    explanation: 'The Raichur Doab controlled both rich agricultural land and vital transit routes for Arabian horse trade from west coast ports like Goa and Bhatkal.',
    observableOptions: [
      'Control of the Doab directly scales trade and tribute revenue',
      'River basins decrease administrative income',
      'Horse trade was unaffected by Deccan territorial control',
      'Tribute flow is inversely proportional to territorial stability',
    ],
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall - c7_histciv_021
  {
    id: 'ch_01',
    nodeId: NODE_C7_HISTCIV_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which revenue system was established by Alauddin Khalji, measuring land directly and claiming 50% of the produce for the central state?',
    options: ['Zabt direct land measurement', 'Iqta hereditary revenue assignment', 'Chauth border tax', 'Dahsala decennial tax assessment'],
    correctIndex: 0,
    explanation: 'Alauddin Khalji instituted the zabt system of direct land measurement. State surveyors measured agricultural acreage and levied exactly half the estimated yield, establishing fiscal stability for his military.',
    hints: [
      'Think of the harsh but precise land measurement system introduced in Delhi.',
      'It required surveying the land rather than estimating or subcontracting.',
      'The term is "zabt" direct measurement.',
    ],
    misconceptionIndex: 1,
  },
  // 2. Foundation - Understanding - c7_histciv_022
  {
    id: 'ch_02',
    nodeId: NODE_C7_HISTCIV_022,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Identify the structural components of Indo-Islamic architecture by placing each label on its corresponding architectural zone.',
    dragItems: [
      { label: 'Horseshoe Arch (Load Bearing)', targetId: 'zone_arch' },
      { label: 'Hemispherical Dome', targetId: 'zone_dome' },
      { label: 'Reused Trabeate Pillar', targetId: 'zone_pillar' },
      { label: 'Arabic Calligraphy Band', targetId: 'zone_frieze' },
    ],
    correctMapping: {
      zone_arch: 'Horseshoe Arch (Load Bearing)',
      zone_dome: 'Hemispherical Dome',
      zone_pillar: 'Reused Trabeate Pillar',
      zone_frieze: 'Arabic Calligraphy Band',
    },
    explanation: 'Indo-Islamic architecture combines indigenous Indian trabeate (beam-and-pillar) craftsmanship with Central Asian arcuate (pointed arch and hemispherical dome) engineering.',
    hints: [
      'The dome sits on top to span open chambers.',
      'The arch channels weight outward and downward.',
      'Pillars from earlier Hindu/Jain shrines provided trabeate support in colonnades.',
    ],
    misconceptionIndex: 2,
  },
  // 3. Foundation - Recall - c7_histciv_025
  {
    id: 'ch_03',
    nodeId: NODE_C7_HISTCIV_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In 1336 CE, on the southern bank of the Tungabhadra River, who founded the Vijayanagar Empire under the spiritual guidance of sage Vidyaranya?',
    options: ['Harihara I and Bukka Raya I (Sangama Dynasty)', 'Krishnadeva Raya (Tuluva Dynasty)', 'Saluva Narasimha (Saluva Dynasty)', 'Rama Raya (Aravidu Dynasty)'],
    correctIndex: 0,
    explanation: 'Harihara I and Bukka Raya I of the Sangama dynasty founded Vijayanagar in 1336 CE. Krishnadeva Raya ruled much later (1509–1529 CE) during the Tuluva dynasty.',
    hints: [
      'The founders belonged to the first of the four dynasties (Sangama).',
      'They were two brothers from the Kakatiya-Hoysala service tradition.',
      'Harihara and Bukka established the empire in 1336 CE.',
    ],
    misconceptionIndex: 3,
  },
  // 4. Foundation - Recall - c7_histciv_027
  {
    id: 'ch_04',
    nodeId: NODE_C7_HISTCIV_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who founded the Bahamani Kingdom in 1347 CE with its original capital at Gulbarga?',
    options: ['Ala-ud-Din Hasan Bahman Shah (Hasan Gangu)', 'Mahmud Gawan', 'Ahmad Shah I', 'Muhammad Shah III'],
    correctIndex: 0,
    explanation: 'Ala-ud-Din Hasan Bahman Shah (Hasan Gangu) founded the Bahamani Sultanate in 1347 CE. Mahmud Gawan was a reformer and wazir who served over a century later (1453–1481 CE).',
    hints: [
      'Do not confuse the founder with the famous wazir who arrived in 1453.',
      'He was a rebel Tughlaq governor originally known as Hasan Gangu.',
      'His royal title was Ala-ud-Din Hasan Bahman Shah.',
    ],
    misconceptionIndex: 4,
  },
  // 5. Foundation - Understanding - c7_histciv_023
  {
    id: 'ch_05',
    nodeId: NODE_C7_HISTCIV_023,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the five dynasties of the Delhi Sultanate in exact chronological order from earliest to latest.',
    sortItems: ['Mamluk (Slave) Dynasty (1206–1290)', 'Khalji Dynasty (1290–1320)', 'Tughlaq Dynasty (1320–1414)', 'Sayyid Dynasty (1414–1451)', 'Lodi Dynasty (1451–1526)'],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The Delhi Sultanate unfolded across 320 years in five successive dynasties: Mamluk → Khalji → Tughlaq → Sayyid → Lodi.',
    hints: [
      'Start with Qutb-ud-din Aibak’s Mamluk dynasty in 1206.',
      'The Tughlaqs preceded the Sayyids.',
      'The Afghan Lodis were the final dynasty before the Mughals in 1526.',
    ],
    misconceptionIndex: 0,
  },
  // 6. Foundation - Recall - c7_histciv_026
  {
    id: 'ch_06',
    nodeId: NODE_C7_HISTCIV_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which Portuguese horse trader visited Vijayanagar around 1520 CE and praised it as the "best-provided city in the world"?',
    options: ['Domingo Paes', 'Fernao Nuniz', 'Duarte Barbosa', 'Vasco da Gama'],
    correctIndex: 0,
    explanation: 'Domingo Paes visited during Krishnadeva Raya’s reign around 1520 CE and recorded vivid accounts of the bustling diamond markets, disciplined court, and immense army.',
    hints: [
      'He wrote the famous "Chronica dos Reis de Bisnaga".',
      'His name begins with "D" and he visited around 1520 CE.',
      'It was Domingo Paes.',
    ],
  },
  // 7. Foundation - Understanding - c7_histciv_028
  {
    id: 'ch_07',
    nodeId: NODE_C7_HISTCIV_028,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'The Gol Gumbaz at Bijapur, completed in 1656 CE by architect Yaqut of Dabul, served as the mausoleum for which ruler?',
    options: ['Muhammad Adil Shah (Bijapur Sultanate)', 'Ala-ud-Din Hasan Bahman Shah', 'Mahmud Gawan of Bidar', 'Ibrahim Lodi of Delhi'],
    correctIndex: 0,
    explanation: 'The Gol Gumbaz was built for Muhammad Adil Shah of the Bijapur Sultanate (a Bahamani successor state). It houses the world’s second-largest unsupported masonry dome.',
    hints: [
      'It belongs to the Adil Shahi dynasty of Bijapur, not the unified Bahamani state.',
      'The monarch ruled Bijapur from 1627 to 1656 CE.',
      'It is Muhammad Adil Shah.',
    ],
    misconceptionIndex: 4,
  },
  // 8. Standard - Application - c7_histciv_021
  {
    id: 'ch_08',
    nodeId: NODE_C7_HISTCIV_021,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A modern state faces runaway military inflation and food scarcity. Applying Alauddin Khalji’s economic model, which policy combination would directly stabilise soldier procurement?',
    options: [
      'Fix maximum retail prices for grain, cloth, and horses at central state markets (Mandi and Sarai-i-Adl) with severe anti-hoarding penalties',
      'Issue unbacked copper tokens stamped at parity with silver currency to inflate the money supply',
      'Double agrarian taxes on drought-stricken farmers to force increased crop production',
      'Disband the standing cavalry and outsource border security to regional feudal barons',
    ],
    correctIndex: 0,
    explanation: 'Alauddin Khalji operated three price-regulated markets in Delhi (Siri, Mandi, Sarai-i-Adl), checked hoarders strictly, and pegged grain at ~7.5 jitals per man, keeping his standing army fed without runaway expenditure.',
    hints: [
      'Alauddin’s key innovation was strict market price control.',
      'He did not dilute currency; he regulated commodity prices directly.',
      'Central markets with fixed prices and anti-hoarding penalties provided stability.',
    ],
  },
  // 9. Standard - Analysis - c7_histciv_024
  {
    id: 'ch_09',
    nodeId: NODE_C7_HISTCIV_024,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did the disintegration of the Tughlaq Empire occur as a progressive unraveling rather than a single sudden collapse?',
    options: [
      'Muhammad bin Tughlaq’s experiments drained the treasury, Firuz Shah’s reign was only a temporary holding operation, and the 1388 succession crisis left Delhi open to Timur’s 1398 sack',
      'Timur’s 1398 invasion occurred before any provincial governor had ever rebelled in the south',
      'The empire remained completely stable until the sudden invasion of Babur in 1526 CE',
      'Firuz Shah Tughlaq completely reconquered the Deccan and liquidated both Vijayanagar and Bahamani',
    ],
    correctIndex: 0,
    explanation: 'Disintegration was cumulative: failed experiments (Daulatabad, token currency) triggered southern secessions (1336, 1347), post-Firuz succession feuds (1388) paralysed the centre, and Timur’s 1398 sack shattered remaining imperial authority.',
    hints: [
      'Notice the seventy-year sequence of compounding structural failures.',
      'Southern kingdoms broke away decades before Timur arrived in 1398.',
      'Each administrative crisis reduced Delhi’s ability to defend the core.',
    ],
  },
  // 10. Standard - Numeric - c7_histciv_030
  {
    id: 'ch_10',
    nodeId: NODE_C7_HISTCIV_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In the First Battle of Panipat (1526 CE), Ibrahim Lodi commanded approximately 100,000 men while Babur commanded approximately 12,000 men. Calculate the approximate numerical odds ratio (Lodi troops per 1 Babur soldier, rounded to the nearest integer).',
    correctAnswer: 8,
    tolerance: 1,
    unit: 'Lodi soldiers per 1 Mughal soldier',
    explanation: '100,000 ÷ 12,000 ≈ 8.33 (approx 8 to 1 advantage for the Lodi army). Babur overcame an 8:1 numerical disadvantage through artillery, matchlocks, rakh barricades, and tulghama manoeuvres.',
    hints: [
      'Divide Lodi’s total army size (100,000) by Babur’s force (12,000).',
      '100 ÷ 12 = 8.33.',
      'The integer ratio is approximately 8.',
    ],
  },
  // 11. Standard - Understanding - c7_histciv_028
  {
    id: 'ch_11',
    nodeId: NODE_C7_HISTCIV_028,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'The maha-mandapa of the Vittala Temple at Hampi is internationally celebrated for its monolithic granite pillars that emit musical notes when tapped. How many musical pillars are in this hall?',
    correctAnswer: 56,
    tolerance: 0,
    unit: 'musical pillars',
    explanation: 'The Vittala Temple’s open maha-mandapa contains exactly 56 monolithic granite pillars, each carved with surrounding slender acoustic colonnettes tuned to specific resonance frequencies.',
    hints: [
      'It is a specific number tested in the ICSE board syllabus.',
      'Between 50 and 60.',
      'Exactly 56 musical pillars.',
    ],
  },
  // 12. Standard - Analysis - c7_histciv_029
  {
    id: 'ch_12',
    nodeId: NODE_C7_HISTCIV_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is it historically misleading to describe the 200-year rivalry between Vijayanagar and the Bahamani Sultanate as a purely religious "Hindu vs Muslim" holy war?',
    options: [
      'Both states formed strategic cross-religious alliances, Vijayanagar employed Muslim cavalry and archers, and Bahamani courts patronised Marathi/Telugu while fighting primarily for the agricultural and horse-trade riches of the Raichur Doab',
      'Neither kingdom possessed any religious identity and both were run by secular Portuguese trading companies',
      'The two kingdoms never fought a single military campaign against each other',
      'The Delhi Sultans prohibited all Deccan rulers from engaging in warfare',
    ],
    correctIndex: 0,
    explanation: 'The conflict was fundamentally geopolitical and economic — contested over the fertile Krishna-Tungabhadra Raichur Doab and horse-trade routes. Vijayanagar maintained a royal Muslim cavalry quarter, while Bahamani rulers used Marathi in land revenue records.',
    hints: [
      'Look for evidence of cross-religious administrative and military cooperation.',
      'The geographical prize was the fertile Raichur Doab between the two rivers.',
      'Both states prioritized realpolitik and trade revenue over theological crusades.',
    ],
  },
  // 13. Standard - Analysis - c7_histciv_026
  {
    id: 'ch_13',
    nodeId: NODE_C7_HISTCIV_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How did Krishnadeva Raya’s amara-nayankara reform differ critically from traditional hereditary feudal fiefdoms?',
    options: [
      'Land assignments (amara) were revocable and transferable by royal decree, preventing military commanders from turning provinces into hereditary independent fiefs',
      'Nayakas were exempt from providing any infantry or cavalry during wartime',
      'All agricultural land was permanently gifted to religious monasteries with zero state taxation',
      'Military chiefs were appointed exclusively from foreign Portuguese merchant guilds',
    ],
    correctIndex: 0,
    explanation: 'Under the amara-nayankara system, nayakas held revenue rights in exchange for maintaining troops and submitting royal tribute, but the crown reserved the right to transfer or revoke grants, preserving central authority during the king’s lifetime.',
    hints: [
      'Consider the difference between a hereditary estate and a revocable administrative posting.',
      'Transferability prevented nayakas from entrenching private dynasties on crown lands.',
      'The grants were military-cum-revenue assignments revocable at royal will.',
    ],
  },
  // 14. Standard - Evaluation - c7_histciv_027
  {
    id: 'ch_14',
    nodeId: NODE_C7_HISTCIV_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Which of the following was NOT one of Mahmud Gawan’s three landmark reforms during his tenure as wazir of the Bahamani Kingdom (1453–1481 CE)?',
    options: [
      'Introducing paper banknotes stamped by the central mint to replace gold dinars',
      'Replacing rough revenue guesses with measured land surveys and assessments based on actual crop yields',
      'Limiting the number of surplus troops nobles could maintain to curb private rebellion',
      'Constructing a monumental three-storey madrasa at Bidar with 276 rooms for scholars',
    ],
    correctIndex: 0,
    explanation: 'Mahmud Gawan did NOT introduce paper banknotes (that was a confusion with token currency experiments of earlier rulers). His true reforms were measured land revenue, noble troop caps, and the famous Bidar Madrasa (1472 CE).',
    hints: [
      'Gawan focused on land measurement, noble military restrictions, and higher education.',
      'Paper money was not part of 15th-century Bahamani administration.',
      'The false option describes paper currency substitution.',
    ],
  },
  // 15. Advanced - Analysis - c7_histciv_022
  {
    id: 'ch_15',
    nodeId: NODE_C7_HISTCIV_022,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is Alauddin Khalji’s Alai Darwaza (1311 CE) considered a momentous milestone in Indian architectural history compared to the earlier Quwwat-ul-Islam mosque (1192 CE)?',
    options: [
      'It represents the first true arcuate structure in India where true pointed arches and a horseshoe dome carry structural load, rather than relying on recycled trabeate temple pillars',
      'It was the first structure in India built entirely out of white Makrana marble without any red sandstone',
      'It was constructed by Mughal emperor Akbar to celebrate the conquest of Chittor',
      'It was the tallest minaret ever attempted in the medieval world at 120 metres',
    ],
    correctIndex: 0,
    explanation: 'The Alai Darwaza (1311 CE) marked the full mastery of the arcuate technique (true pointed arches, voussoirs, squinch dome) in India, moving past the earlier phase where Indian builders adapted trabeate techniques to assemble mosques from reused pillars.',
    hints: [
      'Think about load-bearing engineering: beams across pillars vs true keystoned arches.',
      'The earlier 1192 Quwwat-ul-Islam relied on reused temple stones.',
      'Alai Darwaza mastered the true arcuate arch-and-dome system.',
    ],
  },
  // 16. Advanced - Evaluation - c7_histciv_021
  {
    id: 'ch_16',
    nodeId: NODE_C7_HISTCIV_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the primary structural reason why Alauddin Khalji’s authoritarian state held together for two decades, while Muhammad bin Tughlaq’s intellectually ambitious reforms fragmented his empire within his own lifetime.',
    options: [
      'Alauddin aligned his harsh reforms with enforceable administrative capacity and military supply logistics, whereas Muhammad bin Tughlaq launched visionary theoretical schemes that exceeded the state’s enforcement mechanisms',
      'Muhammad bin Tughlaq ruled a much smaller territory than Alauddin Khalji and lacked any cavalry',
      'Alauddin was universally beloved by all peasants due to zero taxation throughout his reign',
      'Mongol invasions completely bypassed Delhi during Muhammad bin Tughlaq’s reign but destroyed Khalji power',
    ],
    correctIndex: 0,
    explanation: 'Execution capacity separates successful statecraft from imperial collapse. Alauddin’s price controls and zabt were brutal but strictly enforceable; Muhammad’s token currency lacked anti-counterfeiting security, the Daulatabad march lacked logistics, and the Doab tax hike coincided with famine.',
    hints: [
      'Consider the gap between policy design and the practical capacity to enforce it.',
      'Alauddin’s authoritarian system was grounded in physical market oversight.',
      'Muhammad’s policies outran his administrative and technological machinery.',
    ],
  },
  // 17. Advanced - Construct - c7_histciv_030
  {
    id: 'ch_17',
    nodeId: NODE_C7_HISTCIV_030,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Reconstruct Babur’s winning battle formation at Panipat by assembling the core tactical elements in combat sequence.',
    availableParts: [
      'Rakh Chained Cart Barricade',
      'Ustad Ali Quli Matchlocks & Artillery',
      'Tulghama Flanking Cavalry Wings',
      'Central Shock Reserve',
      'Elephant Frontal Charge',
      'Retreat to Kabul',
    ],
    targetState: 'Rakh Chained Cart Barricade Ustad Ali Quli Matchlocks & Artillery Tulghama Flanking Cavalry Wings Central Shock Reserve',
    validationHint: 'Assemble: Cart barricade → Gunpowder fire → Flanking encirclement → Reserve strike (omit elephant frontal charge and retreat).',
    explanation: 'Babur’s combined-arms formula: Carts chained together (rakh) halted the charge; Ottoman cannons and matchlocks panicked the elephants; mobile cavalry wings (tulghama) encircled the flanks; the reserve closed the trap.',
    hints: [
      'Start with the defensive barrier that absorbed the charge.',
      'Add the firearms operating through the gaps.',
      'Encircle the flanks with mobile horse archers, followed by the reserve.',
    ],
  },
  // 18. Advanced - Distinguish - c7_histciv_026
  {
    id: 'ch_18',
    nodeId: NODE_C7_HISTCIV_026,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Distinguish the Battle of Raichur (1520 CE) from the Battle of Talikota (1565 CE) across dynasty, leadership, and political consequence.',
    options: [
      'Raichur (1520, Tuluva Dynasty under Krishnadeva Raya) was a glorious victory securing the Doab; Talikota (1565, Aravidu Dynasty under Rama Raya) was a catastrophic defeat against a Deccan Sultanate coalition that destroyed Vijayanagar',
      'Raichur was fought by Babur against Ibrahim Lodi; Talikota was fought by Alauddin Khalji against Devagiri',
      'Raichur led to the immediate destruction of Hampi; Talikota established the golden age of Krishnadeva Raya',
      'Both battles were minor skirmishes won easily by the Portuguese navy off the coast of Goa',
    ],
    correctIndex: 0,
    explanation: 'Raichur (1520) was Krishnadeva Raya’s peak triumph against Ismail Adil Shah of Bijapur. Talikota (1565) happened 36 years after Krishnadeva Raya’s death under Rama Raya of the Aravidu dynasty, resulting in the sacking of Hampi.',
    hints: [
      'Pay attention to dates, ruling dynasties, and outcomes.',
      'Krishnadeva Raya died in 1529 — he was not alive at Talikota in 1565.',
      'Raichur was a triumph; Talikota was a disastrous imperial collapse.',
    ],
    misconceptionIndex: 3,
  },
  // 19. Advanced - Application - c7_histciv_028
  {
    id: 'ch_19',
    nodeId: NODE_C7_HISTCIV_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A conservation architect analyses the Lotus Mahal in Hampi’s royal enclosure. Which structural finding proves the reality of Indo-Saracenic synthesis?',
    options: [
      'Cusped Islamic arches and vaulted plaster corridors structurally integrated with a multi-tiered Hindu lotus-petal superstructure',
      'The entire building is a prefabricated timber pavilion shipped directly from Lisbon',
      'It contains pure Dravidian shikharas without any arch or lime plaster',
      'It is an exact replica of the Roman Pantheon built out of volcanic pozzolana',
    ],
    correctIndex: 0,
    explanation: 'The Lotus Mahal combines Deccani Islamic cusped arches, squinches, and smooth plasterwork with a stepped Dravidian pyramidal roofline evoking lotus petals, proving deep architectural cross-pollination.',
    hints: [
      'Look for the physical meeting of Islamic arches and Hindu roof forms.',
      'Indo-Saracenic architecture merges both vocabularies into a single functional building.',
      'Cusped arches paired with a lotus superstructure embody this synthesis.',
    ],
  },
  // 20. Advanced - Evaluation - c7_histciv_023
  {
    id: 'ch_20',
    nodeId: NODE_C7_HISTCIV_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is 21 April 1526 classified by Indian historians as a dual-significance "hinge date"?',
    options: [
      'It simultaneously terminated the 320-year Delhi Sultanate and inaugurated the Mughal Empire, altering military technology and political integration in North India for centuries',
      'It marked the day the British East India Company took direct crown control over the subcontinent',
      'It was the date when Vijayanagar and the Bahamani Sultanate signed their permanent peace treaty',
      'It concluded the ancient Mauryan dynasty and founded the Gupta Empire',
    ],
    correctIndex: 0,
    explanation: 'A single battle on 21 April 1526 ended the five-dynasty Delhi Sultanate (1206–1526) and established the Mughal Empire (1526–1857), revolutionising gunpowder tactics and imperial administration.',
    hints: [
      'Consider what ended and what began on that single morning at Panipat.',
      'It closed the Delhi Sultanate and opened the Mughal era.',
      'Dual significance: terminal for the Lodis, foundational for the Mughals.',
    ],
  },
  // 21. Advanced - Analysis - c7_histciv_027
  {
    id: 'ch_21',
    nodeId: NODE_C7_HISTCIV_027,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Trace the causal collapse of the Bahamani Kingdom into the five Deccan Sultanates (1347–1518 CE).',
    sortItems: [
      'Hasan Gangu rebels and founds the Bahamani state at Gulbarga (1347 CE)',
      'Ahmad Shah I relocates the capital to Bidar for defence (1425 CE)',
      'Mahmud Gawan implements measured revenue and noble troop caps (1460s–1470s)',
      'Rival noble factions forge a treason letter leading to Gawan’s execution (1481 CE)',
      'Unified Sultanate fractures into Bijapur, Ahmadnagar, Berar, Bidar, and Golconda (1518 CE)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The Bahamani trajectory: Founding (1347) → Capital shift to Bidar (1425) → Gawan’s reforms → Gawan’s execution via forged letter (1481) → Fragmentation into 5 Sultanates (1518).',
    hints: [
      'Start with the founding at Gulbarga.',
      'The capital moved to Bidar before Gawan reached the peak of his power.',
      'Gawan’s tragic execution triggered the court factionalism that led to the 1518 split.',
    ],
  },
  // 22. Advanced - Creativity - c7_histciv_025
  {
    id: 'ch_22',
    nodeId: NODE_C7_HISTCIV_025,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Arrange the four ruling dynasties of the Vijayanagar Empire in their exact historical sequence.',
    sortItems: ['Sangama Dynasty (1336–1485)', 'Saluva Dynasty (1485–1505)', 'Tuluva Dynasty (1505–1570)', 'Aravidu Dynasty (1570–1646+)'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Remember the mnemonic: "Sangama Started, Saluva Short, Tuluva Thrived, Aravidu Ended" — Sangama → Saluva → Tuluva → Aravidu.',
    hints: [
      'Harihara and Bukka founded the Sangama line.',
      'The short-lived Saluva dynasty came second.',
      'Krishnadeva Raya was Tuluva (third); Rama Raya at Talikota led into the Aravidu era.',
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
  nodeId: NODE_C7_HISTCIV_021,
  title: 'Comparative Study of the Khaljis, Tughlaqs, Deccan Kingdoms & Panipat (1290–1526 CE)',
  definition: 'An integrated comparative analysis of the late Delhi Sultanate, its administrative and architectural developments, the rise and rivalry of the Vijayanagar and Bahamani Deccan empires, and the transformative First Battle of Panipat.',
  eli5: 'Think of medieval India like grand rival teams building magnificent fortresses, testing strange economic experiments, and fighting over fertile river lands until clever new battlefield tactics with cannons changed everything forever.',
  misconceptions: [
    {
      misconception: 'The Delhi Sultanate collapsed immediately when the Tughlaq dynasty ended.',
      correction: 'The Sultanate continued for over a century after the Tughlaqs under the Sayyid (1414–1451) and Lodi (1451–1526) dynasties until Babur’s victory at Panipat in 1526.',
    },
    {
      misconception: 'Alauddin Khalji and Muhammad bin Tughlaq had identical revenue and economic systems.',
      correction: 'Alauddin used direct land measurement (zabt) and strictly enforced price-regulated markets, whereas Muhammad bin Tughlaq levied higher Doab taxes during a famine and issued failed token copper coins.',
    },
    {
      misconception: 'Indo-Islamic architecture is a purely foreign import without Indian craft involvement.',
      correction: 'Indo-Islamic architecture is a genuine fusion of Indian trabeate (beam-and-pillar) craftsmanship and Central Asian arcuate (arch-and-dome) engineering.',
    },
    {
      misconception: 'Krishnadeva Raya founded the Vijayanagar Empire and fought at the Battle of Talikota (1565).',
      correction: 'Harihara and Bukka founded Vijayanagar in 1336 (Sangama dynasty). Krishnadeva Raya ruled the Tuluva dynasty (1509–1529). The Battle of Talikota occurred in 1565, 36 years after his death.',
    },
    {
      misconception: 'Mahmud Gawan founded the Bahamani Kingdom and built the Gol Gumbaz.',
      correction: 'Ala-ud-Din Hasan Bahman Shah founded the kingdom in 1347 at Gulbarga. Gawan was a wazir arriving in 1453. The Gol Gumbaz was built much later (1656) by Muhammad Adil Shah of Bijapur.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Who founded the Vijayanagar Empire in 1336 CE?', options: ['Krishnadeva Raya', 'Harihara I and Bukka Raya I', 'Mahmud Gawan', 'Bahlul Lodi'], correctIndex: 1 },
    { question: 'What was Alauddin Khalji’s land revenue system called?', options: ['Iqta', 'Zabt', 'Ryotwari', 'Mahalwari'], correctIndex: 1 },
    { question: 'Which gateway is the first true arcuate building in India?', options: ['Buland Darwaza', 'Alai Darwaza', 'India Gate', 'Gateway of India'], correctIndex: 1 },
    { question: 'What was the contested fertile tract between Krishna and Tungabhadra rivers?', options: ['Ganga Doab', 'Raichur Doab', 'Malabar Coast', 'Konkan Strip'], correctIndex: 1 },
    { question: 'Who directed Babur’s artillery at Panipat in 1526?', options: ['Ustad Ali Quli', 'Bairam Khan', 'Malik Kafur', 'Hasan Gangu'], correctIndex: 0 },
    { question: 'What was the original capital of the Bahamani Kingdom in 1347?', options: ['Bidar', 'Gulbarga', 'Bijapur', 'Golconda'], correctIndex: 1 },
    { question: 'Which architectural wonder has 56 musical pillars at Hampi?', options: ['Virupaksha Temple', 'Vittala Temple', 'Lotus Mahal', 'Gol Gumbaz'], correctIndex: 1 },
    { question: 'What was Babur’s flanking encirclement cavalry tactic named?', options: ['Tulghama', 'Rakh', 'Zabt', 'Amara'], correctIndex: 0 },
  ],
  masteryCriteria: 'Mastery is attained when the student can accurately contrast Sultanate and Deccan governance models, identify Indo-Islamic architectural elements, and explain tactical revolutions at Panipat.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Policy Lab: Khalji vs Tughlaq Governance',
    instruction: 'Toggle policy controls for Alauddin Khalji and Muhammad bin Tughlaq to compare military stability and peasant rebellion.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_HISTCIV_021,
  },
  {
    title: 'Architectural Vault: Trabeate vs Arcuate Fusion',
    instruction: 'Click on different architectural components of the Indo-Islamic gateway to observe load distribution and decorative motifs.',
    interactionType: 'click-parts',
    nodeId: NODE_C7_HISTCIV_022,
  },
  {
    title: 'Deccan Chessboard: The Raichur Doab',
    instruction: 'Drag the territorial control slider between Vijayanagar and the Bahamani Sultanate across the Krishna and Tungabhadra rivers.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_HISTCIV_029,
  },
  {
    title: 'Acoustic & Dome Engineering: Gol Gumbaz vs Hampi',
    instruction: 'Adjust the sound frequency and observe how acoustic waves reflect inside the 44-metre whispering gallery of Gol Gumbaz.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_HISTCIV_028,
  },
  {
    title: 'Tactical Simulator: The First Battle of Panipat (1526)',
    instruction: 'Deploy Babur’s chained cart line (rakh) and flanking cavalry wings (tulghama) against the massive Lodi elephant host.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_HISTCIV_030,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Be the Heritage Conservator & Strategic Policy Analyst',
  description: 'Connect medieval Indian statecraft to 21st-century governance, architecture, and technology. Select an Indian monument or modern public policy challenge and write an analytical brief.',
  steps: [
    'Choose an Indo-Islamic or Dravidian site (e.g. Qutb Complex, Hampi, Gol Gumbaz) and catalogue its trabeate/arcuate fusion elements.',
    'Examine a modern commodity price control policy (e.g. Essential Commodities Act) and contrast it with Alauddin Khalji’s Mandi regulations.',
    'Map the geopolitical importance of river basin resources like the Krishna-Tungabhadra waters in modern inter-state development.',
    'Share your comparative study with your peers or teacher for ICSE History review.',
  ],
};

// ─── MAIN COMPONENT ───
function C7_HistoryCivicsComparativeStudyKhaljisSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C7_HISTCIV_021,
  title = DEFAULT_PROPS.title || 'Comparative Study of Khaljis, Tughlaqs & Deccan Kingdoms',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['history'] || { name: 'History & Civics', emoji: '🏛️', color: 'amber' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Policy Lab interactive state (Step 0)
  const [khaljiTax, setKhaljiTax] = useState(50);
  const [khaljiPriceControl, setKhaljiPriceControl] = useState(85);
  const [tughlaqDoabTax, setTughlaqDoabTax] = useState(70);
  const [tughlaqTokenCoins, setTughlaqTokenCoins] = useState(80);
  const [droughtActive, setDroughtActive] = useState(true);

  // Architecture interactive state (Step 1)
  const [selectedArchPart, setSelectedArchPart] = useState<'arch' | 'dome' | 'pillar' | 'calligraphy' | null>('arch');
  const [arcuateLoad, setArcuateLoad] = useState(75);

  // Raichur Doab map interactive state (Step 2)
  const [doabControl, setDoabControl] = useState(50); // 0 = Full Bahamani, 100 = Full Vijayanagar
  const [tradeTributeFlow] = useState(60);

  // Acoustic Gol Gumbaz interactive state (Step 3)
  const [echoCycles, setEchoCycles] = useState(8);

  // Panipat Tactical Simulator interactive state (Step 4)
  const [rakhCartsDeployed, setRakhCartsDeployed] = useState(700);
  const [tulghamaFlankAngle, setTulghamaFlankAngle] = useState(45);
  const [artilleryReadiness, setArtilleryReadiness] = useState(90);
  const [lodiElephantPanic, setLodiElephantPanic] = useState(85);

  // SRS and BKT Adaptive state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Challenge Hint and Response state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag and drop & input state
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
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Canvas ref for background tactical particle animation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT UPDATE EFFECT ───
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

  // ─── 2D CANVAS TACTICAL ANIMATION EFFECT ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;

    const particles: { x: number; y: number; vx: number; vy: number; color: string; size: number }[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        color: i % 2 === 0 ? 'rgba(234, 179, 8, 0.35)' : 'rgba(99, 102, 241, 0.35)',
        size: Math.random() * 3 + 1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Draw subtle connecting lines
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 65) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[i].x, particles[i].y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── MEMOISED CALLBACKS ───

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      speechManager.speak('Let us review the step-by-step analysis together.');
    }
  }, [hintCount, challenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding historical insight! Babur combined guns, carts, and flanking cavalry.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Manipulate statecraft and military variables to discover the principles.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Here is your open sandbox. Test any policy, acoustic wave, or tactical parameter without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commencing historical challenges. Read each inquiry and apply your analytical evidence.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

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

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    let isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Chronological order verified flawlessly!');
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
      showNextHint();
    }
    resetInactivityTimer();
  }, [sortArrangement, challenge, showNextHint, resetInactivityTimer]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You have completed the Medieval India Comparative Simulation with a score of ${finalScore} percent.`);
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
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding analytical response.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
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
        speechManager.speak('Let us study the complete historical explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  // ─── DERIVED VALUES FOR REAL-TIME SIMULATIONS ───
  const khaljiArmySupply = useMemo(() => {
    return Math.min(100, Math.round((khaljiPriceControl * 0.7) + (khaljiTax * 0.3)));
  }, [khaljiTax, khaljiPriceControl]);

  const tughlaqRebellionRisk = useMemo(() => {
    const base = tughlaqDoabTax * 0.8 + (droughtActive ? 30 : 0);
    const inflation = tughlaqTokenCoins * 0.4;
    return Math.min(100, Math.max(0, Math.round(base + inflation)));
  }, [tughlaqDoabTax, droughtActive, tughlaqTokenCoins]);

  const panipatVictoryProbability = useMemo(() => {
    const cartScore = (rakhCartsDeployed / 700) * 35;
    const gunScore = (artilleryReadiness / 100) * 35;
    const flankScore = (tulghamaFlankAngle / 45) * 30;
    return Math.min(99, Math.round(cartScore + gunScore + flankScore));
  }, [rakhCartsDeployed, artilleryReadiness, tulghamaFlankAngle]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 relative overflow-hidden font-sans">
      {/* Background Animated Canvas */}
      <canvas ref={canvasRef} width={1000} height={400} className="absolute inset-0 pointer-events-none opacity-25 z-0" aria-hidden="true" />

      {/* Header Bar */}
      <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <motion.span whileHover={{ scale: 1.1, rotate: 5 }} className="text-3xl p-2 bg-amber-500/10 rounded-2xl border border-amber-500/30" aria-hidden="true">
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-400">ICSE Class 7 • {subjectConfig.name}</span>
            <h1 className="text-lg sm:text-xl font-extrabold text-white">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Indicators */}
        <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800 text-xs" role="navigation" aria-label="Simulation Phases">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p, idx) => (
            <span
              key={p}
              className={`capitalize px-2.5 py-1 rounded-full font-medium transition-all ${
                phase === p ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'text-slate-400'
              }`}
            >
              {idx + 1}. {p}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 space-y-6">
          <div className="p-5 sm:p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-indigo-950/40 rounded-2xl border border-amber-500/30">
            <h2 className="text-xl font-bold text-amber-300 mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-amber-400/80 mt-3 font-mono">Archive Objective: {SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-lg uppercase">Curiosity Hook</span>
              <h3 className="text-base font-semibold text-white">{DISCOVERY_QUESTION.question}</h3>
            </div>

            <div className="grid grid-cols-1 gap-2.5 pt-2" role="group" aria-label="Discovery options">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`text-left p-3.5 rounded-xl text-sm font-medium transition-all border flex items-center justify-between ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 text-slate-200'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="inline-block w-6 h-6 rounded-full bg-slate-800 text-center leading-6 text-xs mr-3 font-bold text-amber-400 shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {discoveryAnswered && (
                    <span className="ml-2 font-bold text-base shrink-0">
                      {i === DISCOVERY_QUESTION.correctIndex ? '✓' : '✗'}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-800">
                <p className={`text-xs sm:text-sm font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Exactly right! Tactics and firepower overturned raw numbers.' : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Labs"
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-xl font-extrabold text-sm shadow-lg shadow-amber-500/20"
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.25 }}
              className="p-5 sm:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
                <span className="text-amber-400 font-bold">👉 Action:</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ── LAB 0: KHALJI VS TUGHLAQ POLICY SIMULATOR ── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800">
                  {/* Left: Alauddin Khalji */}
                  <div className="space-y-3 bg-slate-900/70 p-4 rounded-xl border border-indigo-900/40">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-indigo-300">Alauddin Khalji (1296–1316)</h4>
                      <span className="text-xs px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded font-mono">Zabt & Mandi System</span>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <label htmlFor="khaljiTaxInput">Direct Land Tax (Zabt): {khaljiTax}%</label>
                        <span className="text-indigo-400 font-bold">50% Historical Standard</span>
                      </div>
                      <input
                        id="khaljiTaxInput"
                        type="range"
                        min={20}
                        max={70}
                        value={khaljiTax}
                        aria-label="Direct Land Tax percentage for Alauddin Khalji"
                        onChange={e => setKhaljiTax(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <label htmlFor="khaljiPriceControlInput">Price Control Strictness: {khaljiPriceControl}%</label>
                        <span>Anti-Hoarding Officers (Shahna-i-Mandi)</span>
                      </div>
                      <input
                        id="khaljiPriceControlInput"
                        type="range"
                        min={10}
                        max={100}
                        value={khaljiPriceControl}
                        aria-label="Price control strictness for Alauddin Khalji"
                        onChange={e => setKhaljiPriceControl(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Standing Cavalry Supply Index:</span>
                        <span className="text-emerald-400 font-bold">✓ {khaljiArmySupply}% Readiness</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <motion.div className="bg-emerald-500 h-full rounded-full" animate={{ width: `${khaljiArmySupply}%` }} />
                      </div>
                      <p className="text-[11px] text-slate-400 pt-1">Result: Fixed grain (~7.5 jitals/man) kept soldiers fed cheaply during Mongol incursions (1299, 1303, 1305).</p>
                    </div>
                  </div>

                  {/* Right: Muhammad bin Tughlaq */}
                  <div className="space-y-3 bg-slate-900/70 p-4 rounded-xl border border-rose-900/40">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-rose-300">Muhammad bin Tughlaq (1325–1351)</h4>
                      <span className="text-xs px-2 py-0.5 bg-rose-500/20 text-rose-300 rounded font-mono">Visionary Experiments</span>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <label htmlFor="tughlaqTaxInput">Doab Tax Rate: {tughlaqDoabTax}%</label>
                        <span className={droughtActive ? 'text-amber-400 font-bold' : 'text-slate-400'}>
                          {droughtActive ? '⚠️ Famine in Doab Active' : 'Normal Harvest'}
                        </span>
                      </div>
                      <input
                        id="tughlaqTaxInput"
                        type="range"
                        min={30}
                        max={90}
                        value={tughlaqDoabTax}
                        aria-label="Doab Tax Rate for Muhammad bin Tughlaq"
                        onChange={e => setTughlaqDoabTax(Number(e.target.value))}
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <label htmlFor="tughlaqTokenInput" className="text-xs text-slate-400">Token Copper Currency Injection:</label>
                      <input
                        id="tughlaqTokenInput"
                        type="range"
                        min={0}
                        max={100}
                        value={tughlaqTokenCoins}
                        aria-label="Token copper currency injection level"
                        onChange={e => setTughlaqTokenCoins(Number(e.target.value))}
                        className="w-1/2 accent-amber-500 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDroughtActive(!droughtActive)}
                        aria-label="Toggle drought harvest condition"
                        className={`px-2.5 py-1 rounded text-xs font-semibold ${
                          droughtActive ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {droughtActive ? '⚠️ Drought Year (1326 CE)' : '✓ Good Rain'}
                      </motion.button>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Peasant Revolt & Secession Risk:</span>
                        <span className="text-rose-400 font-bold">✗ {tughlaqRebellionRisk}% Danger</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <motion.div className="bg-rose-500 h-full rounded-full" animate={{ width: `${tughlaqRebellionRisk}%` }} />
                      </div>
                      <p className="text-[11px] text-slate-400 pt-1">Consequence: Peasant flight led to revenue loss; counterfeiting drained silver; Madurai (1334), Bengal (1338), Bahamani (1347) broke away.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 1: ARCHITECTURAL FUSION ── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="flex flex-col items-center justify-center p-2 bg-slate-900 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 320 240" className="w-full max-w-[280px]" aria-label="Interactive Indo-Islamic gateway diagram">
                      {/* Base Plinth */}
                      <rect x="20" y="210" width="280" height="20" fill="#334155" rx="3" />
                      {/* Trabeate Pillars */}
                      <rect
                        x="50"
                        y="90"
                        width="24"
                        height="120"
                        fill={selectedArchPart === 'pillar' ? '#f59e0b' : '#64748b'}
                        className="cursor-pointer transition-colors"
                        onClick={() => setSelectedArchPart('pillar')}
                        aria-label="Inspect Trabeate Pillar"
                        role="button"
                        tabIndex={0}
                      />
                      <rect
                        x="246"
                        y="90"
                        width="24"
                        height="120"
                        fill={selectedArchPart === 'pillar' ? '#f59e0b' : '#64748b'}
                        className="cursor-pointer transition-colors"
                        onClick={() => setSelectedArchPart('pillar')}
                        aria-label="Inspect Trabeate Pillar Right"
                        role="button"
                        tabIndex={0}
                      />
                      {/* Lotus Carvings on Pillars */}
                      <circle cx="62" cy="110" r="6" fill="#fbbf24" />
                      <circle cx="258" cy="110" r="6" fill="#fbbf24" />
                      {/* Arcuate True Pointed Arch */}
                      <path
                        d="M 74 90 Q 160 20 246 90"
                        fill="none"
                        stroke={selectedArchPart === 'arch' ? '#38bdf8' : '#cbd5e1'}
                        strokeWidth="14"
                        className="cursor-pointer transition-colors"
                        onClick={() => setSelectedArchPart('arch')}
                        aria-label="Inspect Arcuate Arch"
                        role="button"
                        tabIndex={0}
                      />
                      {/* Keystone */}
                      <polygon
                        points="152,48 168,48 164,36 156,36"
                        fill="#38bdf8"
                        className="cursor-pointer"
                        onClick={() => setSelectedArchPart('arch')}
                        aria-label="Inspect Keystone"
                        role="button"
                        tabIndex={0}
                      />
                      {/* Dome Superstructure */}
                      <path
                        d="M 100 50 Q 160 -10 220 50 Z"
                        fill={selectedArchPart === 'dome' ? '#10b981' : '#475569'}
                        className="cursor-pointer transition-colors"
                        onClick={() => setSelectedArchPart('dome')}
                        aria-label="Inspect Masonry Dome"
                        role="button"
                        tabIndex={0}
                      />
                      {/* Calligraphy Frieze Band */}
                      <rect
                        x="80"
                        y="84"
                        width="160"
                        height="10"
                        fill={selectedArchPart === 'calligraphy' ? '#ec4899' : '#0f172a'}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                        className="cursor-pointer"
                        onClick={() => setSelectedArchPart('calligraphy')}
                        aria-label="Inspect Arabic Calligraphy Band"
                        role="button"
                        tabIndex={0}
                      />
                      <text x="160" y="92" textAnchor="middle" fill="#ffffff" fontSize="7" fontFamily="monospace">
                        سلطان علاء الدين (1311 CE)
                      </text>
                    </svg>
                    <p className="text-xs text-slate-400 mt-2">Click elements on the gateway diagram to inspect engineering details.</p>
                  </div>

                  <div className="flex flex-col justify-between p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                    <div>
                      <h4 className="text-sm font-bold text-amber-300">
                        {selectedArchPart === 'arch' && 'Arcuate Pointed Arch (Alai Darwaza 1311 CE)'}
                        {selectedArchPart === 'dome' && 'Hemispherical Masonry Dome (Central Asian Grammar)'}
                        {selectedArchPart === 'pillar' && 'Trabeate Reused Pillars (Quwwat-ul-Islam Mosque 1192 CE)'}
                        {selectedArchPart === 'calligraphy' && 'Arabic Inscriptions & Arabesque Friezes'}
                        {!selectedArchPart && 'Select a structural feature to analyse.'}
                      </h4>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        {selectedArchPart === 'arch' &&
                          'The pointed arch uses wedge-shaped voussoirs and a central keystone to channel vertical roof loads sideways into massive masonry piers, allowing wide open spans without closely packed columns.'}
                        {selectedArchPart === 'dome' &&
                          'Domes span large congregational prayer chambers. The load is transferred to square halls via squinch arches at corners.'}
                        {selectedArchPart === 'pillar' &&
                          'Indian craftsmen trained in beam-and-pillar construction continued carving traditional motifs (lotus rosettes, bell-and-chain, kirtimukha) while adapting to new Islamic patrons.'}
                        {selectedArchPart === 'calligraphy' &&
                          'Pre-Islamic temples featured human and divine figurative sculptures; Islamic architecture introduced geometric arabesques and Quranic calligraphic bands.'}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <label htmlFor="arcuateLoadInput">Structural Load Channeling: {arcuateLoad}%</label>
                        <span className="text-cyan-400">Pure Arcuate Efficiency</span>
                      </div>
                      <input
                        id="arcuateLoadInput"
                        type="range"
                        min={0}
                        max={100}
                        value={arcuateLoad}
                        aria-label="Structural load channeling slider"
                        onChange={e => setArcuateLoad(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 2: RAICHUR DOAB & DECCAN GEOPOLITICS ── */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-900 rounded-xl border border-indigo-900/50">
                      <h4 className="text-xs font-bold text-indigo-400">Bahamani Kingdom (1347 CE)</h4>
                      <p className="text-[11px] text-slate-300 mt-1">Founder: Ala-ud-Din Hasan Bahman Shah. Capitals: Gulbarga → Bidar. Wazir Mahmud Gawan reformed land measurement and built the 276-room Madrasa.</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-amber-900/50">
                      <h4 className="text-xs font-bold text-amber-400">The Raichur Doab Flashpoint</h4>
                      <p className="text-[11px] text-slate-300 mt-1">The fertile alluvial wedge between the Krishna & Tungabhadra rivers. Controlled agrarian wealth and inland Arabian horse trade routes from Goa and Bhatkal.</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-emerald-900/50">
                      <h4 className="text-xs font-bold text-emerald-400">Vijayanagar Empire (1336 CE)</h4>
                      <p className="text-[11px] text-slate-300 mt-1">Founders: Harihara & Bukka (Sangama). Peak: Krishnadeva Raya (Tuluva, 1509–1529). Capital: Hampi on the Tungabhadra. Admin: Amara-Nayankara.</p>
                    </div>
                  </div>

                  {/* Interactive Map Visualisation */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-indigo-300 font-bold">Bahamani Influence: {100 - doabControl}%</span>
                      <span className="text-xs text-amber-300 font-extrabold uppercase">Krishna-Tungabhadra Frontier</span>
                      <span className="text-xs text-emerald-300 font-bold">Vijayanagar Influence: {doabControl}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={doabControl}
                      aria-label="Raichur Doab Territorial Control balance slider"
                      onChange={e => setDoabControl(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />

                    <div className="mt-4 p-3 bg-slate-950 rounded-lg flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400">Dominant Power: </span>
                        <span className="font-bold text-amber-400">
                          {doabControl > 60 ? 'Vijayanagar Empire (Battle of Raichur 1520 CE)' : doabControl < 40 ? 'Bahamani / Deccan Sultanates' : 'Contested Buffer Zone'}
                        </span>
                      </div>
                      <span className="text-slate-400 font-mono">Trade Port Revenue: ₹{Math.round(tradeTributeFlow * (doabControl / 50))} Lakhs</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: GOL GUMBAZ & HAMPI ACOUSTICS ── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center">
                    <h4 className="text-xs font-bold text-amber-300 mb-2">Gol Gumbaz (Bijapur 1656 CE)</h4>
                    <svg viewBox="0 0 240 180" className="w-full max-w-[220px]" aria-label="Gol Gumbaz whispering gallery cross-section">
                      {/* Ground Chamber */}
                      <rect x="30" y="80" width="180" height="90" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                      {/* Massive 44m Dome */}
                      <path d="M 30 80 Q 120 -15 210 80 Z" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
                      {/* Whispering Gallery Railing */}
                      <line x1="36" y1="80" x2="204" y2="80" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,2" />
                      {/* Sound Wave Reflections */}
                      <path
                        d="M 40 76 Q 80 35 120 76 Q 160 35 200 76"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2"
                        strokeDasharray="3,3"
                        className="animate-pulse"
                      />
                      <circle cx="40" cy="76" r="4" fill="#ef4444" />
                      <text x="40" y="92" textAnchor="middle" fill="#f87171" fontSize="8">Whisper</text>
                      <circle cx="200" cy="76" r="4" fill="#22c55e" />
                      <text x="200" y="92" textAnchor="middle" fill="#4ade80" fontSize="8">Listener (38m)</text>
                    </svg>
                    <p className="text-[11px] text-slate-400 mt-2 text-center">
                      Diameter: ~44 metres (2nd largest unsupported masonry dome in the world). Acoustically reflects sound across ~38m.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="text-xs font-bold text-emerald-300">Vittala Temple Musical Pillars (Hampi)</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Krishnadeva Raya expanded the maha-mandapa with 56 monolithic granite pillars. Tapping the slender outer colonnettes produces bell and percussion tones (Sa-Re-Ga-Ma resonance).
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400">
                        <label htmlFor="echoCyclesInput">Acoustic Reflection Cycles: {echoCycles}</label>
                        <span className="text-amber-400">Clarity: High</span>
                      </div>
                      <input
                        id="echoCyclesInput"
                        type="range"
                        min={1}
                        max={12}
                        value={echoCycles}
                        aria-label="Acoustic reflection cycles slider"
                        onChange={e => setEchoCycles(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          audioManager.play('chime');
                          speechManager.speak('Whisper reflected 38 metres across the hemispherical dome of Gol Gumbaz.');
                        }}
                        aria-label="Play acoustic resonance test"
                        className="w-full py-2 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 text-xs font-bold rounded-lg border border-emerald-500/40"
                      >
                        🔊 Test Acoustic Resonance
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: FIRST BATTLE OF PANIPAT (1526 CE) ── */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tactical Diagram */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 320 200" className="w-full" aria-label="Battle of Panipat tactical formation map">
                        {/* Lodi Side (Top) */}
                        <rect x="20" y="10" width="280" height="40" fill="#450a0a" rx="4" />
                        <text x="160" y="28" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">
                          Ibrahim Lodi: ~100,000 Men + 1,000 War Elephants
                        </text>
                        {/* Babur's Rakh Line (Chained Carts) */}
                        <line x1="40" y1="120" x2="280" y2="120" stroke="#f59e0b" strokeWidth="6" strokeDasharray="12,4" />
                        <text x="160" y="114" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">
                          Rakh: 700 Carts Chained with Gaps for Artillery
                        </text>
                        {/* Cannons under Ustad Ali Quli */}
                        <circle cx="90" cy="120" r="5" fill="#ef4444" />
                        <circle cx="160" cy="120" r="5" fill="#ef4444" />
                        <circle cx="230" cy="120" r="5" fill="#ef4444" />
                        {/* Tulghama Flanking Cavalry Wings */}
                        <path d="M 30 160 Q 10 90 40 40" fill="none" stroke="#38bdf8" strokeWidth="4" />
                        <path d="M 290 160 Q 310 90 280 40" fill="none" stroke="#38bdf8" strokeWidth="4" />
                        <text x="35" y="180" fill="#38bdf8" fontSize="8" fontWeight="bold">Tulghama Left</text>
                        <text x="235" y="180" fill="#38bdf8" fontSize="8" fontWeight="bold">Tulghama Right</text>
                        {/* Babur Base */}
                        <rect x="90" y="150" width="140" height="30" fill="#1e1b4b" rx="4" />
                        <text x="160" y="170" textAnchor="middle" fill="#c7d2fe" fontSize="9" fontWeight="bold">
                          Babur: ~12,000 Troops
                        </text>
                      </svg>
                    </div>

                    {/* Controls & Odds Readout */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2">
                      <div>
                        <h4 className="text-xs font-bold text-amber-300">Tactical Control Console</h4>
                        <div className="space-y-2 mt-2">
                          <div>
                            <div className="flex justify-between text-[11px] text-slate-400">
                              <label htmlFor="rakhCartsInput">Chained Carts (Rakh): {rakhCartsDeployed}</label>
                              <span className="text-amber-400">Absorbs Elephant Charge</span>
                            </div>
                            <input
                              id="rakhCartsInput"
                              type="range"
                              min={200}
                              max={700}
                              value={rakhCartsDeployed}
                              aria-label="Chained carts deployment slider"
                              onChange={e => setRakhCartsDeployed(Number(e.target.value))}
                              className="w-full accent-amber-500 cursor-pointer"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between text-[11px] text-slate-400">
                              <label htmlFor="tulghamaAngleInput">Tulghama Flanking Encirclement: {tulghamaFlankAngle}°</label>
                              <span className="text-cyan-400">Envelopes Enemy Flanks</span>
                            </div>
                            <input
                              id="tulghamaAngleInput"
                              type="range"
                              min={10}
                              max={45}
                              value={tulghamaFlankAngle}
                              aria-label="Tulghama flanking encirclement angle slider"
                              onChange={e => setTulghamaFlankAngle(Number(e.target.value))}
                              className="w-full accent-cyan-500 cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Calculated Victory Probability:</span>
                          <span className="text-emerald-400 font-extrabold">✓ {panipatVictoryProbability}%</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                          21 April 1526: In under 5 hours, Ibrahim Lodi fell, ending the 320-year Delhi Sultanate and founding the Mughal Empire.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation between Exploration Labs */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              aria-label="Go to previous lab"
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold disabled:opacity-40"
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
                onClick={handleNextSlide}
                aria-label="Go to next lab"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Proceed to open sandbox mode"
                className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 rounded-xl text-xs font-extrabold shadow"
              >
                Open Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 space-y-4">
          <div className="p-5 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-amber-950/40 rounded-2xl border border-indigo-500/30">
            <h3 className="text-base font-bold text-indigo-300">Open Sandbox Lab: Free Historical Experimentation</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Explore parameters without grading or time limits. Test how price control thresholds affect army supply or simulate alternate artillery deployments at Panipat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/90 p-5 rounded-2xl border border-slate-800">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Agrarian & Market Stress Test</h4>
              <div>
                <label htmlFor="sandboxDoabTax" className="text-xs text-slate-400 block mb-1">Doab Tax Level: {tughlaqDoabTax}%</label>
                <input
                  id="sandboxDoabTax"
                  type="range"
                  min={20}
                  max={90}
                  value={tughlaqDoabTax}
                  aria-label="Sandbox Doab Tax Level"
                  onChange={e => setTughlaqDoabTax(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="sandboxPriceControl" className="text-xs text-slate-400 block mb-1">Market Price Regulation: {khaljiPriceControl}%</label>
                <input
                  id="sandboxPriceControl"
                  type="range"
                  min={10}
                  max={100}
                  value={khaljiPriceControl}
                  aria-label="Sandbox Market Price Regulation"
                  onChange={e => setKhaljiPriceControl(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">State Viability Index: </span>
                <span className="text-xs font-bold text-emerald-400">
                  {khaljiPriceControl > 60 && tughlaqDoabTax < 60 ? '✓ Stable Empire (Working Authoritarianism)' : '✗ High Secession & Famine Risk'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Panipat Combat Odds Engine</h4>
              <div>
                <label htmlFor="sandboxArtillery" className="text-xs text-slate-400 block mb-1">Artillery Readiness (Ustad Ali Quli): {artilleryReadiness}%</label>
                <input
                  id="sandboxArtillery"
                  type="range"
                  min={30}
                  max={100}
                  value={artilleryReadiness}
                  aria-label="Sandbox Artillery Readiness"
                  onChange={e => setArtilleryReadiness(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="sandboxElephantPanic" className="text-xs text-slate-400 block mb-1">Elephant Panic Factor: {lodiElephantPanic}%</label>
                <input
                  id="sandboxElephantPanic"
                  type="range"
                  min={20}
                  max={100}
                  value={lodiElephantPanic}
                  aria-label="Sandbox Elephant Panic Factor"
                  onChange={e => setLodiElephantPanic(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Predicted Battle Duration: </span>
                <span className="text-xs font-bold text-cyan-300">
                  {artilleryReadiness > 80 ? '✓ Under 5 Hours (Mughal Triumph)' : '⚠️ Prolonged Attrition Combat'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Start Historical Challenges"
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-xl font-extrabold text-sm shadow-lg shadow-amber-500/20"
            >
              Start Historical Challenges →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE MODE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 space-y-4">
          {/* Header with Difficulty Badge and Progress */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                  difficulty === 'standard' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                  'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                {difficulty} Tier
              </motion.span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono uppercase">
                {challenge.competencyLevel}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono">Score: {scoreBreakdown.correct}/{scoreBreakdown.total}</span>
              <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.round(((currentChallenge + 1) / filteredChallenges.length) * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Assessment progress">
                <motion.div
                  className="bg-amber-500 h-full rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-5 sm:p-6 rounded-2xl transition-colors border ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500 text-rose-100' : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <h3 className="text-sm sm:text-base font-bold text-white mb-4 leading-relaxed">{challenge.question}</h3>

            {/* MCQ Options (classify, distinguish, match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-2.5" role="group" aria-label="Answer options">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`text-left p-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all border flex items-center justify-between ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : showExplanation && i !== challenge.correctIndex
                        ? 'bg-slate-900 border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="inline-block w-6 h-6 rounded-full bg-slate-800 text-center leading-6 text-xs mr-3 font-bold text-amber-400 shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {showExplanation && (
                      <span className="ml-2 font-bold text-base shrink-0">
                        {i === challenge.correctIndex ? '✓' : '✗'}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800" role="group" aria-label="Architectural label items to drag">
                  <span className="text-xs text-slate-400 self-center mr-2">Palette:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-semibold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'zone_dome', title: 'Top Superstructure' },
                    { id: 'zone_arch', title: 'Central Load Opening' },
                    { id: 'zone_pillar', title: 'Colonnade Supports' },
                    { id: 'zone_frieze', title: 'Decorative Inscription' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      role="region"
                      aria-label={`Drop target for ${target.title}`}
                      className="p-3 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 hover:border-amber-500/80 min-h-[64px] flex flex-col justify-center"
                    >
                      <span className="text-[10px] text-slate-500 uppercase font-mono">{target.title}</span>
                      <span className="text-xs font-bold text-amber-300 mt-1 flex items-center gap-1">
                        {droppedLabels[target.id] ? (
                          <>
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>{droppedLabels[target.id]}</span>
                          </>
                        ) : (
                          'Drop matching label here'
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  aria-label="Verify Architecture Labels"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                >
                  Verify Architecture Labels
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag or use arrows to rearrange in chronological sequence:</p>
                <div className="space-y-2" role="group" aria-label="Chronological order items">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Item ${displayIdx + 1}: ${item}`}
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between text-xs sm:text-sm text-slate-200 cursor-grab"
                    >
                      <span>
                        <strong className="text-amber-400 mr-2">{displayIdx + 1}.</strong> {item}
                      </span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          aria-label={`Move item ${displayIdx + 1} up`}
                          onClick={() => displayIdx > 0 && handleSortMove(displayIdx, displayIdx - 1)}
                          disabled={displayIdx === 0}
                          className="px-2 py-0.5 bg-slate-700 rounded text-xs disabled:opacity-30"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          aria-label={`Move item ${displayIdx + 1} down`}
                          onClick={() => displayIdx < (challenge.sortItems?.length || 0) - 1 && handleSortMove(displayIdx, displayIdx + 1)}
                          disabled={displayIdx === (challenge.sortItems?.length || 0) - 1}
                          className="px-2 py-0.5 bg-slate-700 rounded text-xs disabled:opacity-30"
                        >
                          ▼
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Confirm Chronological Sequence"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                >
                  Confirm Chronology
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated number"
                    aria-label={`Numeric input in ${challenge.unit || 'units'}`}
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none w-48"
                  />
                  <span className="text-xs text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Check numeric calculation"
                    className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Check Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Available tactical parts">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add part ${part}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[56px] flex flex-wrap gap-2 items-center" role="region" aria-label="Constructed formation sequence">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-indigo-600 text-white text-xs rounded-md flex items-center gap-1 font-semibold">
                      {part}
                      <button
                        type="button"
                        aria-label={`Remove part ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-300 hover:text-white ml-1 text-xs"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Select parts above to assemble battle sequence</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Verify Constructed Formation"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                >
                  Verify Formation
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Disclosure */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 bg-amber-950/40 border border-amber-600/50 rounded-xl space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-300 font-bold rounded">✓ Step-by-Step Explanation</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p key={idx} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                      <strong className="text-amber-400 mr-1.5">{idx + 1}.</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(r => r + 1)}
                      aria-label="Show next analysis step"
                      className="px-4 py-1.5 bg-amber-700/60 hover:bg-amber-700 text-amber-100 rounded-lg text-xs font-bold"
                    >
                      Show Next Analysis Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleNextChallenge}
                      aria-label="Proceed to next challenge or finalize assessment"
                      className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 rounded-xl font-extrabold text-xs shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Historical Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & METACOGNITION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/50 via-slate-900 to-indigo-950/50 rounded-2xl border border-emerald-500/40 text-center space-y-3">
            <h2 className="text-2xl font-black text-white">Historical Evaluation Complete!</h2>

            {/* Motivational Feedback Banner */}
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-700 inline-block px-6">
              {errors === 0 && (
                <div className="text-emerald-400 font-extrabold text-lg flex items-center justify-center gap-2">
                  <span>✓</span> PERFECT SCORE!
                </div>
              )}
              {errors >= 1 && errors <= 3 && (
                <div className="text-emerald-400 font-extrabold text-lg flex items-center justify-center gap-2">
                  <span>✓</span> Great work!
                </div>
              )}
              {errors >= 4 && errors <= 7 && (
                <div className="text-amber-400 font-extrabold text-lg flex items-center justify-center gap-2">
                  <span>✓</span> Good effort!
                </div>
              )}
              {errors >= 8 && (
                <div className="text-rose-400 font-extrabold text-lg flex items-center justify-center gap-2">
                  <span>✗</span> Do not give up — You WILL get this!
                </div>
              )}
            </div>

            <p className="text-sm text-slate-300">
              Final Competency Score: <span className="text-emerald-400 font-extrabold text-lg">{Math.max(0, 100 - errors * 5)}%</span>
            </p>
            <p className="text-xs text-slate-400 font-mono">BKT Mastery Classification: {masteryLevel.toUpperCase()}</p>
          </div>

          {/* Performance Briefing */}
          <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Archivist Performance Briefing</h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {errors === 0
                ? 'Outstanding performance! You have mastered the intricate comparative dynamics of the late Delhi Sultanate, Deccan kingdoms, and Panipat warfare.'
                : errors <= 3
                ? 'Commendable historical analysis! Review the few minor misconception notes below to achieve 100% precision.'
                : errors <= 7
                ? 'Good progressive effort. Medieval Indian statecraft and tactical shifts are dense — review the targeted misconception cards below to strengthen retention.'
                : 'Every analytical historian starts with dedicated revision. Revisit the Policy Lab and Panipat Tactical Simulator to build strong foundational mastery.'}
            </p>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-4 bg-rose-950/40 rounded-xl border border-rose-800/60 space-y-3">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">Your Targeted Misconception Profile</h4>
              {hitMisconceptions.map((mIdx, i) => {
                const m = misconceptions?.[mIdx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-lg border border-rose-900/40 text-xs space-y-1">
                    <p className="text-rose-300 font-semibold">✗ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300 font-medium">✓ Historical Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Metacognitive Reflection Prompts */}
          <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/50 space-y-2">
            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Self-Reflection & Board Inquiry</h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Why is administrative execution more crucial to imperial longevity than intellectual ambition?</li>
              <li>How does the Indo-Islamic synthesis at Hampi’s Lotus Mahal challenge simplistic "clash of civilisations" narratives?</li>
              <li>What parallels exist between Babur’s combined arms at Panipat and other epochal battles in world history?</li>
            </ul>
          </div>

          {/* Spaced Repetition Schedule */}
          <div className="p-4 bg-amber-950/30 rounded-xl border border-amber-800/40 flex flex-wrap items-center justify-between gap-2">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">SM-2 Spaced Repetition Review Schedule</h4>
              <p className="text-xs text-slate-400">
                Next scheduled review in <span className="text-amber-300 font-bold">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">Memory Decay Compensation Active</span>
          </div>

          {/* Real-World Activity */}
          <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-amber-300">{REAL_WORLD_ACTIVITY.title}</h4>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ol className="text-xs text-slate-400 space-y-1 list-decimal list-inside pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        </motion.div>
      )}

      {/* Floating Dynamic Feedback Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Verification Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C7_HistoryCivicsComparativeStudyKhaljisSim;
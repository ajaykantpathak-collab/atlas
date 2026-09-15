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
  SparkleBurst,
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERALS ───
const NODE_C6_HISTCIV_031 = 'c6_histciv_031';
const NODE_C6_HISTCIV_032 = 'c6_histciv_032';
const NODE_C6_HISTCIV_033 = 'c6_histciv_033';
const NODE_C6_HISTCIV_034 = 'c6_histciv_034';
const NODE_C6_HISTCIV_035 = 'c6_histciv_035';
const NODE_C6_HISTCIV_036 = 'c6_histciv_036';
const NODE_C6_HISTCIV_037 = 'c6_histciv_037';
const NODE_C6_HISTCIV_038 = 'c6_histciv_038';
const NODE_C6_HISTCIV_039 = 'c6_histciv_039';
const NODE_C6_HISTCIV_040 = 'c6_histciv_040';

const ALL_NODE_IDS = [
  NODE_C6_HISTCIV_031,
  NODE_C6_HISTCIV_032,
  NODE_C6_HISTCIV_033,
  NODE_C6_HISTCIV_034,
  NODE_C6_HISTCIV_035,
  NODE_C6_HISTCIV_036,
  NODE_C6_HISTCIV_037,
  NODE_C6_HISTCIV_038,
  NODE_C6_HISTCIV_039,
  NODE_C6_HISTCIV_040,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Chronicler of Ancient Magadha',
  intro:
    'You are the Chief Royal Archivist at Pataliputra in the 3rd Century BCE. As religious movements shift, Mahajanapadas clash, Alexander marches on the Punjab, and Emperor Ashoka reflects on the bloodied banks of the Daya River, you must document and understand the grand forces shaping Indian civilization.',
  context:
    'From the clearing of Gangetic forests by iron tools to the monumental edicts carved on rock faces across Asia, every decree and historical turning point rests in your records.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question:
    'Look at the ancient geopolitical map: Why did Jainism survive in India for 2,500+ years while Buddhism almost vanished from its homeland by 1200 CE, even though Buddhism spread across all of Asia?',
  options: [
    'Buddhism was fundamentally flawed while Jainism was morally superior',
    'Buddhism was concentrated in vulnerable mega-monasteries (like Nalanda), whereas Jainism was dispersed among self-reliant merchant communities',
    'Jainism conquered other nations militarily and built fortified garrison kingdoms',
    'Ashoka banned Buddhism and forced all citizens into Digambara vows',
  ],
  correctIndex: 1,
  hintAfter:
    "Think structurally: A mighty lone tree can be felled by one axe, but a vast field of grass survives every storm! Let's explore how geography, trade, and institutions shaped ancient India.",
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

// ─── CHALLENGES ARRAY (22 Comprehensive Challenges) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c6_histciv_031)
  {
    id: 'ch_031_found_1',
    nodeId: NODE_C6_HISTCIV_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Which royal patron renounced his crown, became a Digambara Jain monk, and performed the ritual fast unto death (Sallekhana) at Shravanabelagola around 298 BCE?',
    options: ['Ashoka Maurya', 'Chandragupta Maurya', 'Bimbisara', 'Kanishka'],
    correctIndex: 1,
    explanation:
      'Chandragupta Maurya abdicated his throne, became a disciple of the Jain saint Bhadrabahu, and migrated south to Shravanabelagola in Karnataka to perform Sallekhana.',
    hints: [
      'Think of the founder of the Mauryan Empire who stepped down in his old age.',
      'His grandson later embraced Buddhism, but he himself embraced Jainism.',
      'It was Chandragupta Maurya who walked south with Acharya Bhadrabahu.',
    ],
    misconceptionIndex: 1,
  },
  // 2. Foundation - Drag Label (c6_histciv_032)
  {
    id: 'ch_032_found_2',
    nodeId: NODE_C6_HISTCIV_032,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each Mahajanapada or Gana-Sangha to its correct geographic and political identity.',
    dragItems: [
      { label: 'Magadha (South Bihar)', targetId: 'box_monarchy' },
      { label: 'Vajji Confederacy (Vaishali)', targetId: 'box_republic' },
      { label: 'Iron Axes & Ploughshares', targetId: 'box_tech' },
      { label: 'Anguttara Nikaya', targetId: 'box_source' },
    ],
    correctMapping: {
      box_monarchy: 'Magadha (South Bihar)',
      box_republic: 'Vajji Confederacy (Vaishali)',
      box_tech: 'Iron Axes & Ploughshares',
      box_source: 'Anguttara Nikaya',
    },
    explanation:
      'Magadha was the premier monarchy, Vajji was an assembly-governed Gana-Sangha, iron tools spurred the agricultural surplus, and the Anguttara Nikaya enumerated the sixteen kingdoms.',
    hints: [
      'Vaishali was governed by an assembly called the Sanagara.',
      'Anguttara Nikaya is the primary Buddhist text listing the 16 states.',
      'Iron technology enabled the second urbanisation by clearing sal forests.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation - Match (c6_histciv_033)
  {
    id: 'ch_033_found_3',
    nodeId: NODE_C6_HISTCIV_033,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the four dominant Mahajanapadas with their respective capital cities correctly:',
    options: [
      'Vatsa: Kaushambi | Avanti: Ujjain | Kosala: Shravasti | Magadha: Rajgir',
      'Vatsa: Shravasti | Avanti: Rajgir | Kosala: Kaushambi | Magadha: Ujjain',
      'Vatsa: Ujjain | Avanti: Kaushambi | Kosala: Rajgir | Magadha: Shravasti',
      'Vatsa: Rajgir | Avanti: Shravasti | Kosala: Ujjain | Magadha: Kaushambi',
    ],
    correctIndex: 0,
    explanation:
      'Vatsa stood at Kaushambi on the Yamuna, Avanti at Ujjain on the Shipra, Kosala at Shravasti on the Sarayu, and Magadha at Rajgir within the Ganga-Son river basin.',
    hints: [
      'Udayana ruled at Kaushambi and Pradyota ruled at Ujjain.',
      'Prasenjit of Kosala hosted the Buddha at Shravasti.',
      'Bimbisara ruled Magadha from the hill-ringed fortress of Rajgir.',
    ],
    misconceptionIndex: 0,
  },
  // 4. Foundation - Drag Sort (c6_histciv_034)
  {
    id: 'ch_034_found_4',
    nodeId: NODE_C6_HISTCIV_034,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the three ruling dynasties of ancient Magadha in chronological sequence from earliest to latest.',
    sortItems: [
      'Haryanka Dynasty (Bimbisara & Ajatashatru, c. 544 BCE)',
      'Shishunaga Dynasty (c. 412 BCE)',
      'Nanda Dynasty (Mahapadma & Dhana Nanda, c. 345 BCE)',
      'Mauryan Empire Founded (Chandragupta Maurya, 322/321 BCE)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Magadhan supremacy progressed through the Haryankas (544 BCE), Shishunagas (412 BCE), Nandas (345 BCE), and culminated in the Mauryan Empire in 322 BCE.',
    hints: [
      'Bimbisara came first, forging alliances and annexing Anga.',
      'The Shishunagas briefly displaced the Haryanka line before Mahapadma Nanda seized power.',
      'Dhana Nanda was overthrown in 322 BCE by Chandragupta Maurya.',
    ],
  },
  // 5. Foundation - Numeric (c6_histciv_035)
  {
    id: 'ch_035_found_5',
    nodeId: NODE_C6_HISTCIV_035,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'In which year BCE did Alexander the Great cross the Hindu Kush and fight King Porus at the Battle of the Hydaspes on the Jhelum River?',
    correctAnswer: 326,
    tolerance: 0,
    unit: 'BCE',
    explanation:
      'Alexander invaded north-western India in 326 BCE. The decisive battle was fought against Porus on the rain-swollen banks of the Jhelum (Hydaspes).',
    hints: [
      'It occurred exactly 4 years before the founding of the Mauryan Empire in 322 BCE.',
      'The battle on the Jhelum happened in the early 320s BCE.',
      'The exact year tested in all ICSE boards is 326 BCE.',
    ],
  },
  // 6. Foundation - Classify (c6_histciv_036)
  {
    id: 'ch_036_found_6',
    nodeId: NODE_C6_HISTCIV_036,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Which scholar-prime minister authored the Arthashastra, and what other two names refer to this same historical figure?',
    options: [
      'Megasthenes (also known as Seleucus and Strabo)',
      'Chanakya (also known as Kautilya and Vishnugupta)',
      'Upagupta (also known as Moggaliputta Tissa and Mahinda)',
      'Bimbisara (also known as Srenika and Kunika)',
    ],
    correctIndex: 1,
    explanation:
      'Chanakya, Kautilya, and Vishnugupta are three names for one single individual — the Brahmin scholar from Takshashila who served as Chandragupta\'s prime minister.',
    hints: [
      'He taught at Takshashila and wrote the definitive treatise on statecraft.',
      'He is not three separate people who collaborated, but one master strategist.',
      'The names are Chanakya, Kautilya, and Vishnugupta.',
    ],
    misconceptionIndex: 2,
  },
  // 7. Foundation - Classify (c6_histciv_038)
  {
    id: 'ch_038_found_7',
    nodeId: NODE_C6_HISTCIV_038,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Who was the second Mauryan Emperor who ruled for ~25 years between Chandragupta Maurya and Ashoka, bearing the title Amitraghata ("Slayer of Foes")?',
    options: ['Brihadratha', 'Bindusara', 'Dasharatha', 'Pushyamitra'],
    correctIndex: 1,
    explanation:
      'Bindusara (c. 297–273 BCE) was Chandragupta\'s son and Ashoka\'s father. Greek diplomats recorded his title Amitraghata as Amitrochates.',
    hints: [
      'Do not skip the middle generation between grandfather and grandson!',
      'He maintained diplomatic ties with Antiochus I of Syria and expanded into the Deccan.',
      'His name is Bindusara.',
    ],
    misconceptionIndex: 3,
  },
  // 8. Standard - Analysis (c6_histciv_031)
  {
    id: 'ch_031_std_1',
    nodeId: NODE_C6_HISTCIV_031,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Analyze the structural reasons for the decline of institutional Buddhism in India versus the survival of Jainism:',
    options: [
      'Buddhism depended on huge royal monasteries (Nalanda) destroyed in 1193 CE; Jainism rested on self-reliant, dispersed merchant communities.',
      'Jainism adopted weapon-making while Buddhism forbade touching any metal tools.',
      'Buddhism refused to write books, causing its doctrines to be forgotten after oral teachers passed away.',
      'Jain monks were appointed as permanent hereditary prime ministers in all south Indian kingdoms.',
    ],
    correctIndex: 0,
    explanation:
      'When royal patronage waned and Nalanda was destroyed by Bakhtiyar Khalji in 1193 CE, institutional Buddhism lost its hub. Dispersed Jain trader families sustained their faith locally without relying on central mega-monasteries.',
    hints: [
      'Think about institutional concentration versus community dispersion.',
      'Consider what happened when Nalanda burned for months in 1193 CE.',
      'Jain traders funded their own neighborhood temples across Gujarat, Rajasthan, and Karnataka.',
    ],
  },
  // 9. Standard - Application (c6_histciv_032)
  {
    id: 'ch_032_std_2',
    nodeId: NODE_C6_HISTCIV_032,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A modern Indian village council votes collectively on agricultural irrigation instead of obeying a single landlord. Which 6th Century BCE political tradition does this reflect?',
    options: [
      'The Haryanka hereditary absolute monarchy of Magadha',
      'The Gana-Sangha republican assembly tradition of the Vajji confederacy at Vaishali',
      'The Greek satrapy system established by Alexander',
      'The feudal jagirdari model of the later medieval era',
    ],
    correctIndex: 1,
    explanation:
      'The Gana-Sanghas (republics/oligarchies) like Vajji and Malla settled disputes through debate and voting in their assembly hall (Sanagara), serving as indigenous precursors to collective governance.',
    hints: [
      'Not all 16 Mahajanapadas had kings; at least six were republics.',
      'The Lichchhavis of Vaishali made decisions through the Sanagara assembly.',
      'This is the Gana-Sangha republican tradition.',
    ],
  },
  // 10. Standard - Analysis (c6_histciv_033)
  {
    id: 'ch_033_std_3',
    nodeId: NODE_C6_HISTCIV_033,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Why did Magadha decisively outpace Vatsa, Avanti, and Kosala to become the imperial core of north India?',
    options: [
      'Magadha possessed rich iron-ore deposits near Rajgir, elephant forests, and the Ganga-Son waterway for rapid transport.',
      'Magadha was the only kingdom that prohibited agriculture and lived entirely on foreign trade loans.',
      'Magadha was protected by impenetrable Himalayan ice peaks on all four sides.',
      'Magadha imported all its iron weapons from Greece via the Arabian Sea.',
    ],
    correctIndex: 0,
    explanation:
      'Magadha held a unique combination: iron ore at Rajgir for weapons/tools, forests for war elephants and timber, fertile alluvium, and natural water highways for swift troop and trade movements.',
    hints: [
      'Look at the mineral geology around Rajgir and the southern Bihar forests.',
      'Elephants acted as living tanks, and the Ganga enabled bulk transport.',
      'Iron deposits + war elephants + riverine logistics gave Magadha supremacy.',
    ],
  },
  // 11. Standard - Application (c6_histciv_034)
  {
    id: 'ch_034_std_4',
    nodeId: NODE_C6_HISTCIV_034,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'King Bimbisara married a Lichchhavi princess of Vaishali, a Kosalan princess, and a Madra princess. As a historical analyst, how should this policy be classified?',
    options: [
      'Mere biographical romance without statecraft significance',
      'A calculated diplomatic strategy to secure frontiers and convert potential enemies into allies by marriage',
      'A religious requirement imposed by Jain monks before coronation',
      'A surrender treaty conceding Magadhan sovereignty to foreign kings',
    ],
    correctIndex: 1,
    explanation:
      'Bimbisara utilized matrimonial alliances as a deliberate tool of statecraft, neutralizing rivals on the northern and western borders while he focused military efforts on annexing the wealthy trading hub of Anga.',
    hints: [
      'Marriage in ancient statecraft was diplomacy by other means.',
      'It prevented multi-front wars against Kosala and the Vajjis.',
      'It was a deliberate diplomatic instrument to secure frontiers.',
    ],
  },
  // 12. Standard - Analysis (c6_histciv_035)
  {
    id: 'ch_035_std_5',
    nodeId: NODE_C6_HISTCIV_035,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Why did Alexander\'s seasoned Macedonian troops mutiny at the Beas (Hyphasis) River in July 326 BCE, refusing to march into the Gangetic heartland?',
    options: [
      'They were terrified of the colossal Nanda army (200,000 infantry, 3,000 elephants) after 8 grueling years of campaigning.',
      'Alexander fell fatally ill on the riverbank and ordered an immediate retreat to Macedonia.',
      'King Porus formed a naval blockade on the Ganga that sank all Greek riverboats.',
      'Chandragupta Maurya signed a military pact with Alexander to partition the Deccan.',
    ],
    correctIndex: 0,
    explanation:
      'The mutiny at the Beas was driven by exhaustion coupled with immense dread of Dhana Nanda\'s colossal army awaiting them across the Gangetic plains.',
    hints: [
      'Greek historians Curtius and Diodorus record the terrifying reports of Nanda war elephants.',
      'Eight years of continuous marching had pushed the soldiers to breaking point.',
      'Fear of the massive Magadhan standing army stopped Alexander\'s eastward advance.',
    ],
  },
  // 13. Standard - Distinguish (c6_histciv_036)
  {
    id: 'ch_036_std_6',
    nodeId: NODE_C6_HISTCIV_036,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'How do the nature and current preservation of Megasthenes\' Indica differ from Chanakya\'s Arthashastra?',
    options: [
      'Indica is an observational outsider account surviving only in quotations by later Greek/Roman authors; Arthashastra is an insider prescriptive governance manual.',
      'Indica is a Sanskrit holy prayer book; Arthashastra is a Greek epic poem.',
      'Indica survives as a complete intact manuscript in London; Arthashastra was completely lost without a single sentence surviving.',
      'Indica was written by Ashoka\'s son; Arthashastra was authored by Alexander\'s general Seleucus.',
    ],
    correctIndex: 0,
    explanation:
      'The original Indica is lost and reconstructed through fragments in Strabo, Arrian, and Diodorus (observational). The Arthashastra, rediscovered in 1905 by R. Shamasastry, is a prescriptive treatise on statecraft.',
    hints: [
      'Megasthenes was an ambassador observing walls, gates, and boards.',
      'Chanakya was the prime minister writing instructions for how a state should run.',
      'The original text of Indica disappeared centuries ago, surviving only as citations.',
    ],
    misconceptionIndex: 2,
  },
  // 14. Standard - Construct (c6_histciv_037)
  {
    id: 'ch_037_std_7',
    nodeId: NODE_C6_HISTCIV_037,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Assemble the key components of the 303 BCE Treaty of the Indus between Chandragupta Maurya and Seleucus Nicator.',
    availableParts: [
      'Cession of Kabul, Kandahar & Balochistan',
      'Gift of 500 War Elephants to Seleucus',
      'Dispatch of Greek Envoy Megasthenes',
      'Conversion of Seleucus to Jainism',
      'Annexation of Athens by Magadha',
    ],
    targetState:
      'Cession of Kabul, Kandahar & Balochistan Gift of 500 War Elephants to Seleucus Dispatch of Greek Envoy Megasthenes',
    validationHint:
      'Select the 3 realistic diplomatic and territorial terms agreed upon by Chandragupta and Seleucus.',
    explanation:
      'The treaty ceded the eastern satrapies (Kabul, Kandahar, Gedrosia/Balochistan) to Chandragupta, gave 500 war elephants to Seleucus for his western wars, and established diplomatic embassy via Megasthenes.',
    hints: [
      'Chandragupta gained vast north-western territories beyond the Indus.',
      'Seleucus received Indian war elephants for his campaigns in the Mediterranean.',
      'Megasthenes was sent as the resident ambassador to Pataliputra.',
    ],
  },
  // 15. Standard - Numeric (c6_histciv_040)
  {
    id: 'ch_040_std_8',
    nodeId: NODE_C6_HISTCIV_040,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question:
      'According to Ashoka\'s Major Rock Edict XIII, approximately how many people were slain during the Kalinga War of 261 BCE (in thousands)?',
    correctAnswer: 100,
    tolerance: 10,
    unit: 'thousand killed',
    explanation:
      'Rock Edict XIII records that 100,000 were slain, 150,000 were deported, and countless more perished from ensuing disease and famine.',
    hints: [
      'Ashoka recorded: "One hundred and fifty thousand were carried away captive, one hundred thousand were slain..."',
      'Enter 100 for 100,000.',
      'The figure is 100 thousand killed.',
    ],
  },
  // 16. Advanced - Evaluation (c6_histciv_031)
  {
    id: 'ch_031_adv_1',
    nodeId: NODE_C6_HISTCIV_031,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Evaluate the claim: "The 1193 CE Turkish destruction of Nalanda by Bakhtiyar Khalji was the sole reason Buddhism disappeared from India."',
    options: [
      'Flawed: Nalanda was the final blow in a centuries-long erosion caused by loss of royal patronage post-Harsha (647 CE) and absorption by Adi Shankaracharya\'s Hindu revival.',
      'Completely accurate: Buddhism was at its absolute peak with 90% of Indians being monks until 1193 CE.',
      'Inaccurate: Nalanda was never attacked; monks voluntarily converted to Jainism during a drought.',
      'Flawed: Buddhism did not decline at all and has remained the majority state religion of Bihar since 500 BCE.',
    ],
    correctIndex: 0,
    explanation:
      'Buddhism\'s decline was a long process with three distinct stages: loss of royal patronage after Harsha (647 CE), intellectual re-absorption during the Shankaracharya revival (8th C. CE), and finally the sack of monastic universities in 1193 CE.',
    hints: [
      'Consider the timeline: Harsha died in 647 CE, Shankaracharya lived in the 8th C., and Nalanda fell in 1193 CE.',
      'Monasteries had already lost royal land grants and popular distinction before the Turkish invasion.',
      'The invasion delivered the coup de grâce to an already weakened, centralized monastic structure.',
    ],
  },
  // 17. Advanced - Analysis (c6_histciv_034)
  {
    id: 'ch_034_adv_2',
    nodeId: NODE_C6_HISTCIV_034,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Why was Mahapadma Nanda\'s rise to power around 345 BCE considered a radical social rupture in ancient Indian historiography?',
    options: [
      'He was of Shudra/barber lineage according to the Puranas, breaking the long-standing Kshatriya varna monopoly on royal sovereignty.',
      'He abolished the use of iron weapons and declared all soldiers must fight with wooden staves.',
      'He disbanded the Magadhan treasury and made Greek the official court language.',
      'He was the first Roman general to be crowned King of Pataliputra.',
    ],
    correctIndex: 0,
    explanation:
      'The Puranas refer to Mahapadma Nanda as born of a Shudra mother (or son of a barber), establishing a non-Kshatriya dynasty and demonstrating social mobility made possible by urbanisation and standing armies.',
    hints: [
      'Look at the varna background of traditional rulers versus Mahapadma Nanda.',
      'Brahmanical chronicles bitterly noted his non-Kshatriya origins.',
      'He broke the hereditary Kshatriya monopoly on the throne of Magadha.',
    ],
    misconceptionIndex: 1,
  },
  // 18. Advanced - Drag Label (c6_histciv_039)
  {
    id: 'ch_039_adv_3',
    nodeId: NODE_C6_HISTCIV_039,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Match each Mauryan imperial province with its administrative capital and modern geographic location.',
    dragItems: [
      { label: 'Taxila (Northwest / Gandhara)', targetId: 'prov_uttara' },
      { label: 'Ujjain (West / Malwa)', targetId: 'prov_avanti' },
      { label: 'Suvarnagiri (South / Deccan)', targetId: 'prov_dakshina' },
      { label: 'Tosali (East / Kalinga)', targetId: 'prov_prachya' },
    ],
    correctMapping: {
      prov_uttara: 'Taxila (Northwest / Gandhara)',
      prov_avanti: 'Ujjain (West / Malwa)',
      prov_dakshina: 'Suvarnagiri (South / Deccan)',
      prov_prachya: 'Tosali (East / Kalinga)',
    },
    explanation:
      'Uttarapatha was governed from Taxila, Avantiratha from Ujjain, Dakshinapatha from Suvarnagiri, and Prachyapatha from Tosali, each led by a royal prince (Kumara).',
    hints: [
      'Uttara = North (Taxila), Dakshina = South (Suvarnagiri).',
      'Avanti corresponds to Malwa with its capital at Ujjain.',
      'Prachyapatha covered the eastern coastal zone with Tosali in Odisha.',
    ],
  },
  // 19. Advanced - Distinguish (c6_histciv_040)
  {
    id: 'ch_040_adv_4',
    nodeId: NODE_C6_HISTCIV_040,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Analyze the profound philosophical policy shift enacted by Ashoka following the Kalinga War of 261 BCE:',
    options: [
      'Abandonment of Digvijaya (military conquest / Bherighosha) in favor of Dhammavijaya (conquest by righteousness / Dhammaghosha)',
      'Replacement of Sanskrit state edicts with mandatory Greek tax ledgers',
      'Immediate abdication of the throne to become a wandering monk without governing the empire',
      'Execution of all remaining generals and demolition of Pataliputra\'s wooden ramparts',
    ],
    correctIndex: 0,
    explanation:
      'Ashoka silenced the Bherighosha (war drums of military conquest) and proclaimed the Dhammaghosha (call of moral conquest through righteousness), redirecting imperial resources toward public welfare and Dhamma propagation.',
    hints: [
      'Bheri = war drum; Dhamma = moral righteousness.',
      'Digvijaya means conquering directions by force; Dhammavijaya means winning minds through moral law.',
      'The shift was from Bherighosha to Dhammaghosha.',
    ],
    misconceptionIndex: 4,
  },
  // 20. Advanced - Evaluation (c6_histciv_039)
  {
    id: 'ch_039_adv_5',
    nodeId: NODE_C6_HISTCIV_039,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Evaluate the Divyavadana narrative claim that Ashoka murdered 99 of his half-brothers before securing the throne of Pataliputra:',
    options: [
      'It is a later Buddhist hagiographic exaggeration designed to maximize the moral contrast between pre-conversion "Chandashoka" and saintly "Dhammashoka".',
      'It is verified by official Mauryan stone pillar census lists discovered in Kandahar.',
      'It is false because Ashoka was an only child with no brothers or cousins.',
      'It was an official Seleucid legal code requiring 99 executions before diplomatic recognition.',
    ],
    correctIndex: 0,
    explanation:
      'Historians like Romila Thapar emphasize that Buddhist monastic texts amplified Ashoka\'s cruelty prior to his conversion to celebrate the miraculous transformative power of Buddhist Dhamma.',
    hints: [
      'Consider the genre of religious hagiography and moral dramatization.',
      'Ashoka\'s own contemporary rock edicts express remorse for Kalinga but mention no mass fratricide.',
      'The number 99 serves as symbolic literary contrast between Chandashoka and Dhammashoka.',
    ],
  },
  // 21. Advanced - Creativity / Statecraft (c6_histciv_037)
  {
    id: 'ch_037_adv_6',
    nodeId: NODE_C6_HISTCIV_037,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'If you were Chanakya designing the administrative stability of the newly founded Mauryan Empire in 321 BCE, which structural balance from the Arthashastra would you mandate?',
    options: [
      'A multi-tiered espionage network (Gudhapurushas), uniform land revenue collection, state control of strategic mines/forests, and prince-governors in key provinces.',
      'Total abolition of all taxes and reliance on voluntary donations from neighboring foreign kings.',
      'Handing supreme military command to foreign mercenaries without any royal oversight.',
      'Disbanding all provincial councils and ruling 5 million sq km exclusively through one king in Rajgir.',
    ],
    correctIndex: 0,
    explanation:
      'The Saptanga theory and administrative statecraft of the Arthashastra mandated state monopoly over mines and forests, structured revenue, extensive intelligence (Gudhapurushas), and decentralized provincial Kumaras.',
    hints: [
      'Think about Chanakya\'s focus on intelligence, treasury, and strategic resources.',
      'Mines were the source of iron weapons, and forests provided war elephants.',
      'A centralised intelligence network backed by provincial governors ensured imperial coherence.',
    ],
  },
  // 22. Advanced - Analysis (c6_histciv_038)
  {
    id: 'ch_038_adv_7',
    nodeId: NODE_C6_HISTCIV_038,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'What does Bindusara\'s famous correspondence with Antiochus I Soter (requesting figs, sweet wine, and a philosopher) reveal about Mauryan statehood?',
    options: [
      'India maintained sophisticated, continuous diplomatic and commercial relations with Hellenistic kingdoms following Chandragupta\'s initial treaty.',
      'The Mauryan Empire had exhausted all its food reserves and was begging for emergency famine relief.',
      'The Seleucid Empire had completely conquered Magadha and forced Bindusara to pay tribute.',
      'Greek philosophers were traded as slave labor across all Indian agricultural villages.',
    ],
    correctIndex: 0,
    explanation:
      'Strabo\'s account demonstrates that diplomatic parity, gift exchange, and intellectual engagement with the Greek world continued across generations from Chandragupta to Bindusara.',
    hints: [
      'Antiochus sent the figs and wine, politely explaining that Greek law forbade selling philosophers.',
      'This reflects active diplomatic intercourse between Pataliputra and Antioch.',
      'It proves continuity of Hellenistic-Mauryan foreign relations.',
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
  nodeId: NODE_C6_HISTCIV_031,
  title: 'Ancient Magadha & The Mauryan Empire',
  definition:
    'The evolution of Indian statehood from the 6th to 3rd Century BCE: the rise of Mahajanapadas spurred by iron technology, the growth of Magadha under the Haryanka, Shishunaga, and Nanda dynasties, Alexander’s invasion, and the zenith of the Mauryan Empire under Chandragupta, Bindusara, and Ashoka.',
  eli5:
    'Think of ancient India like a giant strategy game: first, new iron axes cleared dense jungles to grow food and build towns. Next, four big kingdoms competed until Magadha won because it had rich iron mines, river transport, and war elephants. Finally, Chandragupta and his clever teacher Chanakya united almost the entire country into the Mauryan Empire, which Ashoka transformed from war to kindness after the terrible Kalinga battle.',
  misconceptions: [
    {
      misconception: 'All 16 Mahajanapadas were monarchies ruled by hereditary kings.',
      correction:
        'At least six were Gana-Sanghas (republics/oligarchies) like Vajji and Malla, where decisions were taken by voting in an assembly (Sanagara).',
    },
    {
      misconception: 'Buddhism died out because it was a "false" religion, whereas Jainism failed because it never left India.',
      correction:
        'Buddhism declined due to specific historical events (loss of royal patronage, Hindu revival, destruction of monasteries like Nalanda). Jainism survived through its resilient network of self-funding merchant communities.',
    },
    {
      misconception: 'Chandragupta Maurya and the Gupta kings (Chandragupta I & II) were the same rulers or from the same dynasty.',
      correction:
        'Chandragupta Maurya founded the Mauryan Empire around 321 BCE. The Gupta Chandraguptas ruled 600 years later (c. 320–415 CE) during the Golden Age.',
    },
    {
      misconception: 'The Mauryan Empire passed directly from Chandragupta Maurya to Ashoka.',
      correction:
        'Bindusara (Amitraghata) ruled for 25 years (c. 297–273 BCE) between them, consolidating the empire and expanding it into the Deccan.',
    },
    {
      misconception: 'The Kalinga War instantly transformed Ashoka into a monk on the battlefield.',
      correction:
        'The war produced immediate remorse; his spiritual search and formal adoption of Buddhism under monks like Upagupta unfolded gradually over subsequent years.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which Buddhist text enumerates the sixteen Mahajanapadas of the 6th Century BCE?',
      options: ['Tripitaka', 'Anguttara Nikaya', 'Divyavadana', 'Mahavamsa'],
      correctIndex: 1,
    },
    {
      question: 'Which river enriched the Mahajanapada of Avanti with its capital at Ujjain?',
      options: ['Yamuna', 'Sarayu', 'Shipra', 'Daya'],
      correctIndex: 2,
    },
    {
      question: 'Who served as the Greek ambassador from Seleucus Nicator to Chandragupta Maurya\'s court at Pataliputra?',
      options: ['Megasthenes', 'Deimachus', 'Dionysius', 'Arrian'],
      correctIndex: 0,
    },
    {
      question: 'What title meaning "Slayer of Enemies" was held by Bindusara?',
      options: ['Devanampiya', 'Amitraghata', 'Piyadasi', 'Mahapadma'],
      correctIndex: 1,
    },
    {
      question: 'In which rock edict did Ashoka record his profound sorrow and the casualty figures of the Kalinga War?',
      options: ['Pillar Edict VII', 'Major Rock Edict XIII', 'Kalinga Separate Edict I', 'Bhabru Edict'],
      correctIndex: 1,
    },
    {
      question: 'What metal tool innovation directly spurred the "Second Urbanisation" in the Gangetic plain?',
      options: ['Bronze swords', 'Iron axes and ploughshares', 'Copper chisels', 'Tin shields'],
      correctIndex: 1,
    },
    {
      question: 'Which university was destroyed in 1193 CE by Bakhtiyar Khalji, striking a fatal blow to institutional Buddhism in India?',
      options: ['Takshashila', 'Nalanda', 'Vallabhi', 'Kanchipuram'],
      correctIndex: 1,
    },
    {
      question: 'Which of the following was a republican Gana-Sangha governed by an assembly of chieftains?',
      options: ['Magadha', 'Kosala', 'Vajji (Vaishali)', 'Vatsa'],
      correctIndex: 2,
    },
  ],
  masteryCriteria:
    'Student understands the transition from Janapadas to Mahajanapadas, the geopolitical supremacy of Magadha, Alexander\'s invasion, Mauryan historiographical sources, and the reigns of Chandragupta, Bindusara, and Ashoka.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Iron Revolution & Mahajanapadas (c. 600 BCE)',
    instruction: 'Toggle between Monarchy and Gana-Sangha to inspect how governance differed across ancient north India.',
    interactionType: 'toggle-governance',
    nodeId: NODE_C6_HISTCIV_032,
  },
  {
    title: '2. The Four Powerhouses & Magadha\'s Edge (c. 544 BCE)',
    instruction: 'Click on the four major kingdoms to explore their rivers, capitals, and why Magadha won supremacy.',
    interactionType: 'click-kingdoms',
    nodeId: NODE_C6_HISTCIV_033,
  },
  {
    title: '3. Alexander\'s Invasion & The Nanda Deterrent (326 BCE)',
    instruction: 'Slide Alexander\'s march to the Beas River and compare the Macedonian army against Dhana Nanda\'s forces.',
    interactionType: 'slider-army-comparison',
    nodeId: NODE_C6_HISTCIV_035,
  },
  {
    title: '4. The Three Mauryan Titans: Dynastic Continuity (321–232 BCE)',
    instruction: 'Explore the reigns of Chandragupta, Bindusara, and Ashoka, and their geopolitical contributions.',
    interactionType: 'dynasty-slider',
    nodeId: NODE_C6_HISTCIV_037,
  },
  {
    title: '5. The Kalinga Turning Point: Bherighosha to Dhammaghosha (261 BCE)',
    instruction: 'Drag the Policy Slider from War (Digvijaya) to Righteousness (Dhammavijaya) and observe Rock Edict XIII.',
    interactionType: 'slider-kalinga',
    nodeId: NODE_C6_HISTCIV_040,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question:
      'PREDICTION: If Alexander had crossed the Beas River to attack Dhana Nanda\'s Magadha, what overwhelming military asset would his tired cavalry have faced in unprecedented numbers?',
    options: [
      '3,000 armored war elephants capable of crushing cavalry charges',
      'Roman siege catapults imported through the Himalayas',
      'Gunpowder cannons mounted on wooden river boats',
      'A completely unarmed civilian population that refused to fight',
    ],
    correctIndex: 0,
    verifyInstruction:
      'Inspect the Army Comparison chart below to verify why Alexander\'s troops mutinied at the Beas in 326 BCE!',
    nodeId: NODE_C6_HISTCIV_035,
  },
  {
    question:
      'PREDICTION: After conquering Kalinga in 261 BCE, how did Emperor Ashoka alter his official policy regarding foreign statecraft?',
    options: [
      'He launched an immediate maritime invasion of Rome and Egypt',
      'He replaced military conquest (Bherighosha / Digvijaya) with moral conquest (Dhammaghosha / Dhammavijaya)',
      'He ordered the execution of all foreign ambassadors in Pataliputra',
      'He demolished all four provincial capitals to save administrative costs',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Move the Kalinga Policy Slider to see the transition from Bherighosha to Dhammaghosha carved on Rock Edict XIII!',
    nodeId: NODE_C6_HISTCIV_040,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about Magadha\'s geography compared to landlocked or arid Janapadas?',
    observableOptions: [
      'Magadha had direct access to iron mines, elephant forests, and the Ganga-Son waterway network',
      'Magadha was situated in an arid desert with no water sources',
      'Magadha had zero mineral wealth and had to trade grain for all metal',
      'Magadha was located on an isolated island in the Indian Ocean',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_HISTCIV_033,
  },
  {
    question: 'What pattern do you notice regarding the three successive Mauryan Emperors?',
    observableOptions: [
      'Each emperor made distinct territorial & religious marks: Chandragupta (Northwest/Jainism), Bindusara (Deccan/Ajivika), Ashoka (Kalinga/Buddhism)',
      'All three emperors were Greek generals appointed by Alexander',
      'None of the three emperors ever lived in Pataliputra',
      'Each emperor completely destroyed the administrative work of his predecessor',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_HISTCIV_038,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Be the Epigraphist & Diplomat',
  description:
    'Analyze an ancient primary document like Ashoka\'s Rock Edict XIII or Chanakya\'s Arthashastra and connect it to modern governance.',
  steps: [
    'Choose an Ashokan Edict (e.g., Rock Edict XIII at Dhauli or Minor Rock Edict at Maski).',
    'Identify whether the message is political (borders), ethical (respect to parents/monks), or environmental (tree planting, hospitals for animals).',
    'Write a 3-sentence modern policy brief explaining how Ashoka\'s welfare state concepts relate to the Directive Principles in the modern Indian Constitution.',
    'Present your findings to your class or study partner.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C6_HistoryCivicsSpreadDeclineJainismSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C6_HISTCIV_031,
  title = DEFAULT_PROPS.title || 'Ancient Magadha & The Mauryan Empire',
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['history'] || {
    name: 'History & Civics',
    emoji: '🏛️',
    color: 'amber',
  };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org interactive exploration states
  const [governanceType, setGovernanceType] = useState<'monarchy' | 'republic'>('monarchy');
  const [selectedKingdom, setSelectedKingdom] = useState<'magadha' | 'kosala' | 'avanti' | 'vatsa'>('magadha');
  const [alexanderPosition, setAlexanderPosition] = useState(326);
  const [selectedEmperor, setSelectedEmperor] = useState<'chandragupta' | 'bindusara' | 'ashoka'>('chandragupta');
  const [kalingaPolicyVal, setKalingaPolicyVal] = useState(0); // 0 = Digvijaya/Bherighosha, 100 = Dhammavijaya/Dhammaghosha

  // Sandbox sliders & levers
  const [ironSurplusLevel, setIronSurplusLevel] = useState(70);
  const [standingArmySize, setStandingArmySize] = useState(200); // thousands
  const [selectedProvince, setSelectedProvince] = useState<'uttarapatha' | 'avantiratha' | 'dakshinapatha' | 'prachyapatha'>('uttarapatha');

  // Predict-then-check states
  const [predictionMade, setPredictionMade] = useState(false);

  // Adaptive difficulty & scores
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

  // Drag and drop states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gsapTimelineRef = useRef<HTMLDivElement | null>(null);

  // Filter challenges by adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
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

  // Adaptive difficulty update on score changes
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
    setDifficulty((prev) => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // GSAP animation for historical timeline
  useEffect(() => {
    if (phase === 'explore' && gsapTimelineRef.current) {
      gsap.fromTo(
        gsapTimelineRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [phase, currentSlide]);

  // Canvas 2D animation loop
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

      // Draw subtle pulsing background river wave
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 5) {
        const y = 15 + Math.sin((x + frame * 2) * 0.05) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw Ashoka Chakra rotating emblem icon
      ctx.save();
      ctx.translate(canvas.width - 25, 15);
      ctx.rotate((frame * Math.PI) / 180);
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const angle = (i * Math.PI) / 4;
        ctx.lineTo(Math.cos(angle) * 8, Math.sin(angle) * 8);
        ctx.stroke();
      }
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Escalating hints callback
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

  // Inactivity auto-hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Handler: Discovery phase answer
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb insight!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // Handlers for phase transitions
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Ancient India Chronicle. Let us explore the turning points of Magadha.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter the Historical Sandbox! Adjust variables freely with no grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for the Knowledge Challenges! Put your historical reasoning to the test.');
  }, []);

  // Handler: Prediction in exploration
  const handlePrediction = useCallback((_idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive visualization to verify.');
  }, []);

  // Handlers for exploration interactive controls
  const handleKingdomSelect = useCallback((k: 'magadha' | 'kosala' | 'avanti' | 'vatsa') => {
    setSelectedKingdom(k);
    audioManager.play('tap');
  }, []);

  const handleGovernanceToggle = useCallback((g: 'monarchy' | 'republic') => {
    setGovernanceType(g);
    audioManager.play('tap');
  }, []);

  const handleAlexanderMarch = useCallback((val: number) => {
    setAlexanderPosition(val);
    audioManager.play('count');
  }, []);

  const handleEmperorSelect = useCallback((emp: 'chandragupta' | 'bindusara' | 'ashoka') => {
    setSelectedEmperor(emp);
    audioManager.play('tap');
  }, []);

  const handleKalingaSliderChange = useCallback((val: number) => {
    setKalingaPolicyVal(val);
    audioManager.play('balance');
  }, []);

  // Drag-and-drop handlers
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

  // Drag-sort handler
  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        const arr = prev.length === (challenge.sortItems?.length || 0) ? [...prev] : (challenge.sortItems || []).map((_, i) => i);
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  // Handler: Completion
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Mastery assessment complete! You have achieved deep understanding of ancient Indian statehood.');
  }, [errors, onComplete]);

  // Handler: Next challenge
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

  // Central answer validation handler
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
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Splendid! That is historically accurate.');
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

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us study the historical record carefully.');
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

  // Submit drag-sort challenge
  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems || []).map((_, i) => i);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800">
      {/* ─── HEADER BAR ─── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-amber-950/40 border border-amber-700/50 rounded-2xl" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-400">
              ICSE Class 6 • History & Civics
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-white">{title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <canvas ref={canvasRef} width={180} height={30} aria-label="Visual timeline indicator" className="rounded-lg bg-slate-950/60 border border-slate-800" />
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            aria-label={`Difficulty level: ${difficulty}`}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : difficulty === 'advanced'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
            }`}
          >
            {difficulty === 'foundation' && <span>✓</span>}
            {difficulty === 'advanced' && <span>⚡</span>}
            {difficulty === 'standard' && <span>★</span>}
            {difficulty}
          </motion.span>
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-indigo-950/40 rounded-2xl border border-amber-800/60 shadow-lg">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-md border border-amber-500/30">
              📜 HISTORICAL ARCHIVIST SCENARIO
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-3">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-amber-200/70 mt-2 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold mb-3">
              <span>💡 CURIOSITY DISCOVERY CHALLENGE</span>
            </div>
            <p className="text-white text-base sm:text-lg font-semibold mb-4 leading-snug">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  aria-label={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className="w-full text-left p-4 bg-slate-900/90 hover:bg-slate-700/80 border border-slate-700 hover:border-amber-500/50 rounded-xl text-slate-200 text-sm transition-all"
                >
                  <span className="font-bold text-amber-400 mr-2">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-700">
                <p className={`text-sm font-semibold mb-3 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '✓ Brilliant historical reasoning! Structural dispersion saved Jainism while centralized monasteries made Buddhism vulnerable.'
                    : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter Interactive Chronicle Labs"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-extrabold rounded-xl shadow-lg transition-all"
                >
                  Enter Interactive Chronicle Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: BRILLIANT.ORG INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1" role="progressbar" aria-valuenow={currentSlide + 1} aria-valuemin={1} aria-valuemax={EXPLORATION_STEPS.length} aria-label="Lab progression">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-8 rounded-full transition-all ${
                    i === currentSlide ? 'bg-amber-400' : i < currentSlide ? 'bg-amber-600/50' : 'bg-slate-700'
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
              className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4"
            >
              <h3 className="text-xl font-bold text-amber-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
              <p className="text-slate-300 text-sm font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>

              {/* ── LAB 1: IRON REVOLUTION & GANA-SANGHAS ── */}
              {currentSlide === 0 && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  <div className="flex gap-2">
                    <motion.button
                      aria-label="Monarchy governance model (e.g. Magadha, Kosala)"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleGovernanceToggle('monarchy')}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase border ${
                        governanceType === 'monarchy'
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      👑 Monarchy (e.g. Magadha, Kosala)
                    </motion.button>
                    <motion.button
                      aria-label="Gana-Sangha republic governance model (e.g. Vajji, Malla)"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleGovernanceToggle('republic')}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase border ${
                        governanceType === 'republic'
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      🗳️ Gana-Sangha / Republic (e.g. Vajji, Malla)
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <svg viewBox="0 0 360 200" className="w-full h-48 bg-slate-900 rounded-lg border border-slate-800" aria-label="Governance Structure Diagram">
                      {governanceType === 'monarchy' ? (
                        <g>
                          <circle cx="180" cy="70" r="30" fill="#f59e0b" opacity="0.2" />
                          <circle cx="180" cy="70" r="22" fill="#d97706" />
                          <text x="180" y="75" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                            RAJA (King)
                          </text>
                          <line x1="180" y1="95" x2="180" y2="135" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                          <rect x="110" y="135" width="140" height="35" rx="6" fill="#1e293b" stroke="#475569" />
                          <text x="180" y="156" textAnchor="middle" fill="#94a3b8" fontSize="10">
                            Hereditary Royal Decrees
                          </text>
                        </g>
                      ) : (
                        <g>
                          <circle cx="180" cy="95" r="55" fill="#38bdf8" opacity="0.1" stroke="#0284c7" strokeDasharray="4 4" />
                          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                            const rad = (angle * Math.PI) / 180;
                            const cx = 180 + Math.cos(rad) * 45;
                            const cy = 95 + Math.sin(rad) * 45;
                            return (
                              <g key={i}>
                                <circle cx={cx} cy={cy} r="12" fill="#0284c7" />
                                <text x={cx} y={cy + 3} textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">
                                  Chief
                                </text>
                              </g>
                            );
                          })}
                          <text x="180" y="98" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">
                            SANAGARA (Assembly)
                          </text>
                          <text x="180" y="175" textAnchor="middle" fill="#94a3b8" fontSize="9">
                            Decisions settled by voting & debate
                          </text>
                        </g>
                      )}
                    </svg>

                    <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-2">
                      <p className="font-bold text-amber-300">
                        {governanceType === 'monarchy'
                          ? 'Monarchical Mahajanapadas (10+ states)'
                          : 'Gana-Sanghas / Republics (6 states)'}
                      </p>
                      <p className="text-slate-300">
                        {governanceType === 'monarchy'
                          ? 'Power concentrated in a single hereditary ruler who commanded standing armies, collected royal bali/bhaga taxes, and passed the throne to his son.'
                          : 'Power shared among clan chieftains (Lichchhavis, Shakyas, Mallas) meeting at the Sanagara hall in Vaishali. Often cited as an ancient indigenous root of democratic voting!'}
                      </p>
                      <div className="p-2 bg-slate-800/70 rounded text-slate-400">
                        <span className="text-amber-400 font-semibold">Key Driver: </span>
                        Heavy iron ploughshares enabled wet-rice paddy surpluses, feeding cities and standing armies.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 2: FOUR POWERHOUSES & MAGADHA'S GEOPOLITICAL EDGE ── */}
              {currentSlide === 1 && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['magadha', 'kosala', 'avanti', 'vatsa'] as const).map((k) => (
                      <motion.button
                        key={k}
                        aria-label={`Select ${k} kingdom`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleKingdomSelect(k)}
                        className={`py-2 px-2 rounded-lg text-xs font-bold uppercase border transition-all ${
                          selectedKingdom === k
                            ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {k.toUpperCase()}
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2 p-4 bg-slate-900 rounded-lg border border-slate-800">
                      <svg viewBox="0 0 380 200" className="w-full h-48" aria-label="Interactive Map of Four Powerhouses">
                        <rect width="380" height="200" fill="#0f172a" rx="8" />
                        <path d="M 40 60 Q 150 70 340 130" stroke="#0284c7" strokeWidth="4" fill="none" opacity="0.6" />
                        <text x="280" y="115" fill="#38bdf8" fontSize="8">Ganga River</text>
                        <path d="M 40 90 Q 120 100 240 120" stroke="#0284c7" strokeWidth="2.5" fill="none" opacity="0.5" />
                        <text x="140" y="112" fill="#38bdf8" fontSize="7">Yamuna</text>

                        <g opacity={selectedKingdom === 'vatsa' ? 1 : 0.4} className="cursor-pointer" role="button" tabIndex={0} aria-label="Select Vatsa Kingdom" onClick={() => handleKingdomSelect('vatsa')}>
                          <circle cx="150" cy="100" r="14" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
                          <text x="150" y="125" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">Vatsa (Kaushambi)</text>
                        </g>

                        <g opacity={selectedKingdom === 'avanti' ? 1 : 0.4} className="cursor-pointer" role="button" tabIndex={0} aria-label="Select Avanti Kingdom" onClick={() => handleKingdomSelect('avanti')}>
                          <circle cx="90" cy="150" r="14" fill="#10b981" stroke="#6ee7b7" strokeWidth="1.5" />
                          <text x="90" y="175" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="bold">Avanti (Ujjain)</text>
                        </g>

                        <g opacity={selectedKingdom === 'kosala' ? 1 : 0.4} className="cursor-pointer" role="button" tabIndex={0} aria-label="Select Kosala Kingdom" onClick={() => handleKingdomSelect('kosala')}>
                          <circle cx="210" cy="65" r="14" fill="#8b5cf6" stroke="#c4b5fd" strokeWidth="1.5" />
                          <text x="210" y="50" textAnchor="middle" fill="#c4b5fd" fontSize="9" fontWeight="bold">Kosala (Shravasti)</text>
                        </g>

                        <g opacity={selectedKingdom === 'magadha' ? 1 : 0.4} className="cursor-pointer" role="button" tabIndex={0} aria-label="Select Magadha Kingdom" onClick={() => handleKingdomSelect('magadha')}>
                          <circle cx="290" cy="130" r="20" fill="#f59e0b" stroke="#fde68a" strokeWidth="2.5" />
                          <text x="290" y="160" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">Magadha (Rajgir)</text>
                        </g>
                      </svg>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-2">
                      <h4 className="text-amber-400 font-bold text-sm capitalize">{selectedKingdom} Mahajanapada</h4>
                      {selectedKingdom === 'magadha' && (
                        <div className="space-y-1 text-slate-300">
                          <p><span className="text-amber-400 font-semibold">Capital:</span> Rajgir (ringed by 5 hills) → Pataliputra</p>
                          <p><span className="text-amber-400 font-semibold">River:</span> Ganga & Son waterway basin</p>
                          <p><span className="text-amber-400 font-semibold">Ruler:</span> Bimbisara & Ajatashatru (Haryankas)</p>
                          <p className="text-amber-200/90 font-medium pt-1">
                            ⭐ Triple Edge: Rich Rajgir iron mines for weapons, elephant-timber forests, and invincible river highways!
                          </p>
                        </div>
                      )}
                      {selectedKingdom === 'kosala' && (
                        <div className="space-y-1 text-slate-300">
                          <p><span className="text-amber-400 font-semibold">Capital:</span> Shravasti</p>
                          <p><span className="text-amber-400 font-semibold">River:</span> Sarayu River</p>
                          <p><span className="text-amber-400 font-semibold">Ruler:</span> Prasenjit (Contemporary of Buddha)</p>
                          <p>Rich alluvium grain basket of eastern Uttar Pradesh.</p>
                        </div>
                      )}
                      {selectedKingdom === 'avanti' && (
                        <div className="space-y-1 text-slate-300">
                          <p><span className="text-amber-400 font-semibold">Capital:</span> Ujjain (Malwa Plateau)</p>
                          <p><span className="text-amber-400 font-semibold">River:</span> Shipra River</p>
                          <p><span className="text-amber-400 font-semibold">Ruler:</span> Pradyota</p>
                          <p>Dominated overland trade routes linking the Ganga valley to Gujarat seaports.</p>
                        </div>
                      )}
                      {selectedKingdom === 'vatsa' && (
                        <div className="space-y-1 text-slate-300">
                          <p><span className="text-amber-400 font-semibold">Capital:</span> Kaushambi (Prayagraj Doab)</p>
                          <p><span className="text-amber-400 font-semibold">River:</span> Yamuna River</p>
                          <p><span className="text-amber-400 font-semibold">Ruler:</span> Udayana</p>
                          <p>Strategic crossroads of northern and central river trade.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: ALEXANDER'S INVASION & BEAS MUTINY ── */}
              {currentSlide === 2 && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  {!predictionMade ? (
                    <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-xl space-y-2">
                      <p className="text-xs font-bold text-amber-300 uppercase">Step 1: Predict before exploring</p>
                      <p className="text-white text-xs font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-1">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction Option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="w-full text-left p-2 bg-slate-900 hover:bg-slate-800 rounded text-slate-200 text-xs border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-amber-300 text-xs">
                      ✓ Prediction recorded! Drag the invasion slider below to see how the Nanda army terrified Alexander&apos;s soldiers.
                    </p>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-400 font-semibold">
                      <span>March from Hindu Kush (327 BCE)</span>
                      <span>Battle of Hydaspes / Jhelum (326 BCE)</span>
                      <span>Mutiny at Beas River (326 BCE)</span>
                    </div>
                    <input
                      type="range"
                      min={325}
                      max={327}
                      step={0.1}
                      value={alexanderPosition}
                      aria-label="Alexander's march timeline slider"
                      onChange={(e) => handleAlexanderMarch(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                      <h4 className="text-sky-400 font-bold">Macedonian Expedition (Exhausted)</h4>
                      <p className="text-slate-300">• 8 continuous years marching from Greece</p>
                      <p className="text-slate-300">• Shaken by Porus&apos;s 200 elephants in monsoon mud</p>
                      <p className="text-rose-400 font-semibold">✗ Refused to enter Gangetic plain</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                      <h4 className="text-amber-400 font-bold">Dhana Nanda&apos;s Magadha Force</h4>
                      <p className="text-slate-300">• 200,000 professional infantry</p>
                      <p className="text-slate-300">• 20,000 cavalry & 2,000 chariots</p>
                      <p className="text-amber-300 font-bold">✓ 3,000 armored war elephants!</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: MAURYAN TITANS (CHANDRAGUPTA → BINDUSARA → ASHOKA) ── */}
              {currentSlide === 3 && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'chandragupta' as const, label: '1. Chandragupta (321 BCE)' },
                      { id: 'bindusara' as const, label: '2. Bindusara (297 BCE)' },
                      { id: 'ashoka' as const, label: '3. Ashoka (268 BCE)' },
                    ].map((emp) => (
                      <motion.button
                        key={emp.id}
                        aria-label={`Select Emperor ${emp.label}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleEmperorSelect(emp.id)}
                        className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all ${
                          selectedEmperor === emp.id
                            ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {emp.label}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-2">
                    {selectedEmperor === 'chandragupta' && (
                      <div className="space-y-2 text-slate-300">
                        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                          <span>FOUNDER OF THE PAN-INDIAN EMPIRE</span>
                        </div>
                        <p>• Guided by Chanakya (Kautilya/Vishnugupta) from Takshashila.</p>
                        <p>• Overthrew Dhana Nanda in 322/321 BCE to claim Pataliputra.</p>
                        <p>• 303 BCE Seleucid Treaty: Gained Kabul, Kandahar, & Balochistan from Seleucus Nicator; hosted Megasthenes (author of Indica).</p>
                        <p className="text-amber-300 font-semibold">• Renounced crown in old age → Digambara Jain monk with Bhadrabahu at Shravanabelagola (Sallekhana fast).</p>
                      </div>
                    )}
                    {selectedEmperor === 'bindusara' && (
                      <div className="space-y-2 text-slate-300">
                        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                          <span>THE INDISPENSABLE CONSOLIDATOR (25-YEAR REIGN)</span>
                        </div>
                        <p>• Held title Amitraghata (&quot;Slayer of Foes&quot;), recorded as Amitrochates by Greeks.</p>
                        <p>• Extended imperial control southward deep into the Deccan (Mysore Plateau).</p>
                        <p>• Diplomatic correspondence with Antiochus I of Syria (requested sweet wine, dried figs, and a philosopher).</p>
                        <p className="text-amber-300 font-semibold">• Patronised the Ajivika ascetic sect; father of Ashoka by Queen Subhadrangi.</p>
                      </div>
                    )}
                    {selectedEmperor === 'ashoka' && (
                      <div className="space-y-2 text-slate-300">
                        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                          <span>PEAK OF IMPERIAL EXPANSE & MORAL TRANSFORMATION</span>
                        </div>
                        <p>• Maximum territorial extent: Afghanistan to Bengal, Himalayas to Krishna River.</p>
                        <p>• Governed through 4 Provincial Capitals: Taxila, Ujjain, Suvarnagiri, Tosali.</p>
                        <p>• Conquered independent Kalinga in 261 BCE → profound remorse on the Daya River.</p>
                        <p className="text-amber-300 font-semibold">• Adopted Dhammavijaya; dispatched missionaries (Mahendra & Sanghamitra) to Sri Lanka with the Bodhi sapling.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── LAB 5: KALINGA WAR & THE MORAL REVERSAL ── */}
              {currentSlide === 4 && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-rose-400">⚔️ Bherighosha (War Drums)</span>
                    <span className="font-bold text-emerald-400">🕊️ Dhammaghosha (Righteousness)</span>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={kalingaPolicyVal}
                    aria-label="Kalinga War policy slider from war to righteousness"
                    onChange={(e) => handleKalingaSliderChange(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />

                  <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-300">
                        {kalingaPolicyVal < 50 ? 'Policy: Digvijaya (Military Conquest)' : 'Policy: Dhammavijaya (Conquest by Dhamma)'}
                      </span>
                      <span className="px-2 py-0.5 bg-slate-800 rounded text-slate-400 text-[10px]">
                        Rock Edict XIII Inscription
                      </span>
                    </div>

                    <p className="text-slate-300">
                      {kalingaPolicyVal < 50
                        ? '261 BCE: Ashoka invaded coastal Kalinga to secure Bengal trade routes. 100,000 killed, 150,000 deported. Blood filled the Daya River at Dhauli.'
                        : 'Post-261 BCE: Overcome with remorse, Ashoka renounced aggressive warfare forever. The war drums (Bherighosha) were replaced by the call of moral duty (Dhammaghosha).'}
                    </p>

                    <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-amber-200/90 font-serif italic text-[11px]">
                      &quot;...even a fraction of a hundredth part of those who were slain, died, or carried away captive in Kalinga now weighs heavily on the mind of the Beloved of the Gods.&quot; — Major Rock Edict XIII
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next Controls */}
          <div className="flex justify-between items-center">
            <motion.button
              aria-label="Previous Lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-semibold">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 rounded-xl text-xs font-extrabold shadow"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Enter Free Sandbox Mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl text-xs font-extrabold shadow-lg"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚙️</span>
              <h3 className="text-lg font-bold text-amber-300">Ancient Magadhan Empire Sandbox</h3>
            </div>
            <p className="text-slate-300 text-xs mt-1">
              Manipulate economic, military, and provincial parameters to simulate ancient statehood without test pressure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Control Column 1 */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Rajgir Iron Smelting & Agricultural Surplus</span>
                  <span className="font-bold text-amber-400">{ironSurplusLevel}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={ironSurplusLevel}
                  aria-label="Rajgir iron smelting agricultural surplus slider"
                  onChange={(e) => setIronSurplusLevel(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Magadhan Standing Army Capacity</span>
                  <span className="font-bold text-amber-400">{standingArmySize * 1000} troops</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={400}
                  value={standingArmySize}
                  aria-label="Magadhan standing army capacity slider"
                  onChange={(e) => setStandingArmySize(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-bold">Statecraft Yield:</span>
                <p className="text-slate-300 mt-1">
                  {ironSurplusLevel > 60 && standingArmySize > 150
                    ? '✓ 🚀 Unstoppable Imperial Core: Sufficient food surplus to sustain 200,000+ full-time warriors and clear Gangetic sal jungles.'
                    : '✗ ⚠️ Vulnerable Frontier: Low surplus forces soldiers to farm; risk of invasion from northwestern satrapies.'}
                </p>
              </div>
            </div>

            {/* Control Column 2: Provincial Delegation */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
              <span className="text-amber-300 font-bold">Select Mauryan Province to Inspect Kumara (Governor):</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'uttarapatha' as const, label: 'Uttarapatha (Taxila)' },
                  { id: 'avantiratha' as const, label: 'Avantiratha (Ujjain)' },
                  { id: 'dakshinapatha' as const, label: 'Dakshinapatha (Suvarnagiri)' },
                  { id: 'prachyapatha' as const, label: 'Prachyapatha (Tosali)' },
                ].map((prov) => (
                  <button
                    key={prov.id}
                    aria-label={`Select province ${prov.label}`}
                    onClick={() => setSelectedProvince(prov.id)}
                    className={`p-2 rounded border text-left font-semibold transition-all ${
                      selectedProvince === prov.id
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-900 text-slate-300 border-slate-700'
                    }`}
                  >
                    {prov.label}
                  </button>
                ))}
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-sky-400 font-bold capitalize">{selectedProvince} Governance:</span>
                <p className="text-slate-300 mt-1">
                  {selectedProvince === 'uttarapatha' &&
                    'Taxila: Guarded northwestern frontier against Seleucid invasion, administered Gandharan trade corridors.'}
                  {selectedProvince === 'avantiratha' &&
                    'Ujjain: Governed central India, collected customs on cotton & port trade moving to the Arabian Sea.'}
                  {selectedProvince === 'dakshinapatha' &&
                    'Suvarnagiri: Southern gold-mining hub (Karnataka), integrated Deccan chiefdoms into the imperial tax network.'}
                  {selectedProvince === 'prachyapatha' &&
                    'Tosali: Governed the newly conquered Kalinga coastal zone, managed Bay of Bengal maritime links.'}
                </p>
              </div>
            </div>
          </div>

          <motion.button
            aria-label="Ready for Knowledge Challenges"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3.5 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 font-extrabold rounded-2xl shadow-xl transition-all"
          >
            Ready for Knowledge Challenges! →
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>
              Challenge {currentChallenge + 1} of {filteredChallenges.length}
            </span>
            <span className="uppercase tracking-wider text-amber-400 font-bold">
              NEP Competency: {challenge.competencyLevel}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length} aria-label="Challenge progression">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="text-xs text-indigo-300 mt-1">
            📅 SM-2 Spaced Repetition: review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to strengthen your memory.
          </div>

          {/* Question Box */}
          <div
            className={`p-6 bg-slate-800/90 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'border-slate-700'
            }`}
          >
            <p className="text-white text-base sm:text-lg font-bold mb-4 leading-relaxed">
              {challenge.question}
            </p>

            {/* MCQ Type Question */}
            {(challenge.type === 'classify' ||
              challenge.type === 'distinguish' ||
              challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm transition-all border ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-slate-900/90 hover:bg-slate-750 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-bold text-amber-400 mr-2">
                        {showExplanation && i === challenge.correctIndex ? '✓ ' : ''}
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold rounded-lg cursor-grab shadow"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map((targetKey) => (
                    <div
                      key={targetKey}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetKey)}
                      aria-label={`Drop target for ${targetKey.replace('_', ' ')}`}
                      className="p-4 bg-slate-900/90 rounded-xl border-2 border-dashed border-slate-700 hover:border-amber-400 min-h-[60px] flex flex-col justify-center"
                    >
                      <span className="text-[10px] uppercase text-slate-500 font-bold">{targetKey.replace('_', ' ')}</span>
                      <span className="text-sm font-semibold text-amber-300">
                        {droppedLabels[targetKey] ? `✓ ${droppedLabels[targetKey]}` : '📥 Drag matching label here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Mappings"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-amber-500 text-slate-950 text-xs font-extrabold rounded-xl shadow"
                >
                  Verify Mappings →
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    role="button"
                    tabIndex={0}
                    aria-label={`Sort item ${displayIdx + 1}: ${item}. Drag to change order`}
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-900 border border-slate-700 hover:border-amber-500 rounded-xl text-slate-200 text-xs sm:text-sm cursor-grab flex items-center justify-between"
                  >
                    <span>
                      <strong className="text-amber-400 mr-2">{displayIdx + 1}.</strong> {item}
                    </span>
                    <span className="text-slate-500 text-xs">↕ Drag to reorder</span>
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Check Chronological Order"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-amber-500 text-slate-950 text-xs font-extrabold rounded-xl shadow mt-2"
                >
                  Check Chronological Order →
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    aria-label="Numerical value input"
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical value"
                    className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:border-amber-400 focus:outline-none w-48"
                  />
                  <span className="text-slate-400 text-xs font-bold">{challenge.unit}</span>
                </div>
                <motion.button
                  aria-label="Submit Value"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-6 py-2.5 bg-amber-500 text-slate-950 text-xs font-extrabold rounded-xl shadow"
                >
                  Submit Value →
                </motion.button>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-amber-300 font-semibold">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add treaty part: ${part}`}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs rounded-lg font-medium"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] space-y-2">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Assembled Treaty Terms:</span>
                  <div className="flex flex-wrap gap-2">
                    {constructParts.map((part, i) => (
                      <span key={i} className="px-2.5 py-1 bg-amber-600/30 border border-amber-500 text-amber-200 text-xs rounded-lg flex items-center gap-1">
                        {part}
                        <button
                          aria-label={`Remove part: ${part}`}
                          onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                          className="text-rose-400 hover:text-rose-200 ml-1 font-bold"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-slate-600 text-xs">Click parts above to assemble terms</span>
                    )}
                  </div>
                </div>

                <motion.button
                  aria-label="Verify Constructed Treaty"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-amber-500 text-slate-950 text-xs font-extrabold rounded-xl shadow"
                >
                  Verify Constructed Treaty →
                </motion.button>
              </div>
            )}

            {/* ── Progressive Disclosure Explanation ── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-slate-950/90 border border-amber-800/80 rounded-xl space-y-3"
              >
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <span>📖 HISTORICAL EVIDENCE & REASONING</span>
                </div>
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-slate-300 text-xs sm:text-sm leading-relaxed"
                    >
                      <strong className="text-amber-400">{idx + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    aria-label="Reveal Next Analytical Detail"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold rounded-lg border border-slate-700"
                  >
                    Reveal Next Analytical Detail →
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment' : 'Next Challenge'}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNextChallenge}
                    className="mt-3 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-xl shadow-lg block"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MASTERY ASSESSMENT ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-amber-950/60 via-slate-900 to-emerald-950/60 rounded-3xl border border-amber-600/50 text-center space-y-3">
            <span className="text-5xl" aria-hidden="true">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Chronicle Completed!</h2>
            <p className="text-amber-300 text-sm font-semibold">
              Final Mastery Level: <span className="uppercase">{masteryLevel}</span> • Score:{' '}
              {Math.max(0, 100 - errors * 5)}%
            </p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
            <p className="text-slate-200 text-sm leading-relaxed">
              {errors === 0
                ? '✓ 🌟 Flawless Mastery! You understand ancient Indian statehood, epigraphy, and geopolitics at an exceptional standard.'
                : errors <= 3
                ? '✓ 👏 Strong Performance! You demonstrated clear command over the transition from Mahajanapadas to the Mauryan Empire.'
                : 'ℹ️ 📚 Good effort! Review the specific historical misconceptions below to solidify your ICSE Board preparation.'}
            </p>
          </div>

          {/* Misconception Profile Tracking */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-rose-300 font-bold text-sm">🎯 Misconception Remediation Profile:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/40 text-xs">
                      <p className="text-rose-400 font-semibold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 mt-1 font-medium">✓ Historical Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule Banner */}
          <div className="p-4 bg-amber-950/40 rounded-2xl border border-amber-800/60 text-xs space-y-1">
            <span className="font-bold text-amber-300">📅 Spaced Repetition (SM-2 Algorithm):</span>
            <p className="text-slate-300">
              Next scheduled review session in{' '}
              <strong className="text-amber-400">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </strong>{' '}
              to reinforce long-term memory retention for the CISCE examination.
            </p>
          </div>

          {/* Real-World Activity */}
          <div className="p-5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-3">
            <h3 className="text-amber-300 font-bold text-sm">✨ {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-slate-300 text-xs leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <p key={i}>
                  <strong className="text-amber-400">{i + 1}.</strong> {st}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PLATFORM OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Historical Milestone Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C6_HistoryCivicsSpreadDeclineJainismSim;
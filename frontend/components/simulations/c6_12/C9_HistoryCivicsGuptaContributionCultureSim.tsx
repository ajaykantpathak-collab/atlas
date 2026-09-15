'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C9_HISTCIV_051 = 'c9_histciv_051';
const NODE_C9_HISTCIV_052 = 'c9_histciv_052';
const NODE_C9_HISTCIV_053 = 'c9_histciv_053';
const NODE_C9_HISTCIV_054 = 'c9_histciv_054';
const NODE_C9_HISTCIV_055 = 'c9_histciv_055';
const NODE_C9_HISTCIV_056 = 'c9_histciv_056';
const NODE_C9_HISTCIV_057 = 'c9_histciv_057';
const NODE_C9_HISTCIV_058 = 'c9_histciv_058';
const NODE_C9_HISTCIV_059 = 'c9_histciv_059';
const NODE_C9_HISTCIV_060 = 'c9_histciv_060';

const ALL_NODE_IDS = [
  NODE_C9_HISTCIV_051,
  NODE_C9_HISTCIV_052,
  NODE_C9_HISTCIV_053,
  NODE_C9_HISTCIV_054,
  NODE_C9_HISTCIV_055,
  NODE_C9_HISTCIV_056,
  NODE_C9_HISTCIV_057,
  NODE_C9_HISTCIV_058,
  NODE_C9_HISTCIV_059,
  NODE_C9_HISTCIV_060,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Imperial Archives: 1,500 Years of Indian Statecraft & Culture',
  intro: 'You are an apprentice archivist at the National Archaeological Commission in New Delhi. A newly unsealed subterranean gallery contains artifacts, inscriptions, architectural blueprints, and policy scrolls spanning the Gupta Golden Age, the Chola Maritime Empire, the Delhi Sultanate, and the Great Mughals.',
  context: 'Your mission is to decipher primary sources, analyse political-fiscal experiments, test battlefield tactics, and preserve the genuine historical record for generations of scholars.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In 1329 CE, Muhammad bin Tughlaq issued copper and brass tokens to replace silver tankas. Why did the entire currency system collapse within months?',
  options: [
    'The public refused to use metal coins instead of paper currency',
    'Copper was cheap and easily cast at home, leading to uncontrollable counterfeiting without state monopolies',
    'Mongol armies captured all royal mints in northern India',
    'Merchants in Delhi exclusively demanded Roman gold coins',
  ],
  correctIndex: 1,
  hintAfter: 'Remarkable! Let us explore how state machinery, architecture, warfare, and cultural synthesis evolved across the Gupta, Chola, Sultanate, and Mughal eras!',
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

// ─── 22 COMPREHENSIVE CHALLENGES COVERING ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_gupta_genre_01',
    nodeId: NODE_C9_HISTCIV_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Kalidasa composed across three Sanskrit genres. Into which genre does Meghadutam fall?',
    options: [
      'Mahakavya (Classical Dynastic Epic)',
      'Nataka (Theatrical Stage Play)',
      'Khandakavya (Lyric / Cloud Messenger Poem)',
      'Dharmashastra (Legal Code)',
    ],
    correctIndex: 2,
    explanation: 'Meghadutam (The Cloud Messenger) is Kalidasa\'s lyric masterpiece (khandakavya), in which an exiled Yaksha implores a rain cloud to carry a message of love to his wife. Abhijnanasakuntalam is a play (nataka), and Raghuvamsha is an epic (mahakavya).',
    hints: [
      'Think of short, emotionally intense poetry rather than multi-act stage dramas or vast genealogies.',
      'Meghadutam literally translates to "Cloud Messenger" and was not performed on stage.',
      'It is a khandakavya (lyric poem), unlike the plays Abhijnanasakuntalam and Malavikagnimitram.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_gupta_deogarh_02',
    nodeId: NODE_C9_HISTCIV_051,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Identify the structural components of the 5th-century Gupta Dashavatara Temple at Deogarh in its classic Panchayatana plan.',
    dragItems: [
      { label: 'Central Sanctum (Garbhagriha - Vishnu)', targetId: 'part_center' },
      { label: 'North-East Subsidiary Shrine', targetId: 'part_ne' },
      { label: 'South-East Subsidiary Shrine', targetId: 'part_se' },
      { label: 'Jagati (Raised Stone Plinth)', targetId: 'part_plinth' },
    ],
    correctMapping: {
      part_center: 'Central Sanctum (Garbhagriha - Vishnu)',
      part_ne: 'North-East Subsidiary Shrine',
      part_se: 'South-East Subsidiary Shrine',
      part_plinth: 'Jagati (Raised Stone Plinth)',
    },
    explanation: 'The Deogarh Dashavatara temple pioneered the North Indian Panchayatana layout: one central principal sanctum on a raised platform (jagati) flanked by four subsidiary corner shrines.',
    hints: [
      'The central main room houses Lord Vishnu in the sanctum.',
      'The four small corner pavilions are subsidiary shrines.',
      'The high stone base elevating the whole complex is the jagati plinth.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_chola_sources_01',
    nodeId: NODE_C9_HISTCIV_052,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why are the Leyden copperplates (c. 1008 CE) named "Leyden" and what historic grant do they record?',
    options: [
      'Named after a town in Tamil Nadu; records Rajaraja I\'s military victory in Sri Lanka',
      'Named after the Dutch city of Leiden where scholars preserved them; records Rajaraja I\'s land grant to a Buddhist Chudamani Vihara at Nagapattinam',
      'Named after a Portuguese explorer; records naval conquests across the Arabian Sea',
      'Named after the court scribe Leyden; records tax rates on Kaveri rice fields',
    ],
    correctIndex: 1,
    explanation: 'The Leyden plates take their name from the Dutch university city of Leiden where the charter was catalogued. They record Rajaraja I\'s endowment to a Buddhist shrine at the port of Nagapattinam, proving Chola religious tolerance and maritime connections.',
    hints: [
      'The name originates in Europe because of where modern epigraphists studied the charter.',
      'The grant demonstrates patronage given to an international Buddhist monastery on the Tamil coast.',
      'It is named after Leiden in the Netherlands and records land given to a Buddhist shrine at Nagapattinam.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_chola_archive_02',
    nodeId: NODE_C9_HISTCIV_052,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does the Brihadishwara Temple at Thanjavur (completed 1010 CE) function as a "living administrative archive" rather than just a monument?',
    options: [
      'It contains royal scrolls hidden in secret chambers below the sanctum',
      'Its granite perimeter walls are inscribed with detailed muster rolls of commanders, cavalry, elephant corps, and 400 devadasis with their exact revenue endowments',
      'It was exclusively used as a courthouse where kings held criminal trials',
      'Its priests kept paper registers that were later sealed in stone jars',
    ],
    correctIndex: 1,
    explanation: 'Rajaraja I used the temple walls as public stone records: commanders, cavalry units, elephant battalions, and named temple dancers (devadasis) with their specific land allowances were permanently carved into the granite.',
    hints: [
      'Think of permanent inscriptions on stone acting as a public ledger of military and temple staff.',
      'The records document personnel, endowments, and state revenue allocations right on the temple facades.',
      'The walls carry comprehensive lists of military officers and devadasis.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_chola_kudavolai_01',
    nodeId: NODE_C9_HISTCIV_053,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A village near Uttiramerur (920 CE) prepares for the annual Variyam committee selection. Which resident is ELIGIBLE under the Kudavolai constitution?',
    options: [
      'Raman, aged 28, who is a famous poet but owns no land in the agrahara',
      'Sundaram, aged 45, who owns 1/4 veli of taxable land, knows at least one Veda, and has not served in the last 3 years',
      'Govindan, aged 50, who served on the Gold Committee last year and has not yet submitted his audited accounts',
      'Lakshmi, aged 40, who is a wealthy landowner and scholar of Sanskrit literature',
    ],
    correctIndex: 1,
    explanation: 'The Uttiramerur inscription set strict qualifications: men between 35 and 70, owning taxable land, having Vedic knowledge, and barred if they had served in the prior 3 years or failed to submit audited accounts. Women and landless labourers were excluded.',
    hints: [
      'Recall the age bracket (35–70 years) and property requirement.',
      'Prior service without audited accounts or serving in consecutive years caused disqualification.',
      'Sundaram meets the age, land, Vedic knowledge, and rotation rules.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_chola_tiers_02',
    nodeId: NODE_C9_HISTCIV_053,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Arrange the administrative hierarchy of the Chola imperial realm from largest territorial unit down to the primary village unit.',
    sortItems: [
      'Mandalam (Imperial Province under a Royal Viceroy)',
      'Valanadu (Major Administrative Division)',
      'Nadu / Kurram (District / Cluster of Agrarian Villages)',
      'Grama / Ur / Sabha (Local Village Settlement)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The Chola realm was structured systematically: Mandalam (province) → Valanadu (division) → Nadu/Kurram (district cluster) → Grama/Ur/Sabha (village unit).',
    hints: [
      'Mandalams were the huge provinces governed by princes.',
      'Valanadus subdivided the mandalams.',
      'Nadus/Kurrams were local districts containing individual village assemblies.',
    ],
  },
  {
    id: 'ch_chola_nataraja_01',
    nodeId: NODE_C9_HISTCIV_054,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the iconic Chola lost-wax (cire perdue) Nataraja bronze, what does the dwarf figure (Apasmara Purusha) crushed under Shiva\'s right foot symbolise?',
    options: [
      'Foreign invaders from the north',
      'Spiritual ignorance and cosmic delusion',
      'Poverty and material hunger',
      'Physical death and natural decay',
    ],
    correctIndex: 1,
    explanation: 'In the Ananda-Tandava iconography, Shiva dances upon Apasmara (the demon dwarf of spiritual forgetfulness and ignorance), demonstrating the victory of divine wisdom over cosmic delusion.',
    hints: [
      'Apasmara represents a mental and spiritual obstacle to liberation.',
      'The upper right hand holds the damaru (creation), the left holds agni (destruction), while the foot subdues delusion.',
      'It represents ignorance and illusion.',
    ],
  },
  {
    id: 'ch_chola_temple_kings_02',
    nodeId: NODE_C9_HISTCIV_054,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Pair each Great Living Chola Temple with its royal patron and architectural characteristic:',
    options: [
      'Thanjavur (Rajaraja I - 66m Vimana) | Gangaikondacholapuram (Rajendra I - Concave Vimana) | Darasuram (Rajaraja II - Chariot Mandapa)',
      'Thanjavur (Rajendra I) | Gangaikondacholapuram (Rajaraja I) | Darasuram (Kulottunga I)',
      'Thanjavur (Vijayalaya) | Gangaikondacholapuram (Aditya I) | Darasuram (Parantaka I)',
      'Thanjavur (Rajaraja II) | Gangaikondacholapuram (Rajaraja I) | Darasuram (Rajendra I)',
    ],
    correctIndex: 0,
    explanation: 'Rajaraja I built Thanjavur (c. 1010 CE); his son Rajendra I built Gangaikondacholapuram (c. 1025 CE) with a curved feminine profile; and Rajaraja II built Airavatesvara at Darasuram (c. 1160 CE) shaped like a celestial chariot.',
    hints: [
      'Father built Thanjavur; son conquered the Ganga and built Gangaikondacholapuram.',
      'Airavatesvara was built over a century later by Rajaraja II.',
      'Option 1 correctly pairs all three monarchs and structures.',
    ],
  },
  {
    id: 'ch_sultanate_dynasties_01',
    nodeId: NODE_C9_HISTCIV_055,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Arrange the five dynasties of the Delhi Sultanate in exact chronological order (1206–1526 CE):',
    sortItems: [
      'Mamluk / Slave Dynasty (1206, Qutb-ud-din Aibak)',
      'Khalji Dynasty (1290, Jalal-ud-din Khalji)',
      'Tughlaq Dynasty (1320, Ghiyas-ud-din Tughlaq)',
      'Sayyid Dynasty (1414, Khizr Khan)',
      'Lodi Dynasty (1451, Bahlul Lodi)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The Delhi Sultanate followed five successive houses: Mamluk (1206–1290) → Khalji (1290–1320) → Tughlaq (1320–1414) → Sayyid (1414–1451) → Lodi (1451–1526).',
    hints: [
      'Remember the mnemonic: "My King Taught Simple Lessons" (Mamluk, Khalji, Tughlaq, Sayyid, Lodi).',
      'The Sayyids were appointed after Timur\'s invasion before the Afghan Lodis took power.',
      'The order is Mamluk, Khalji, Tughlaq, Sayyid, Lodi.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_qutab_minar_02',
    nodeId: NODE_C9_HISTCIV_055,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the Qutab Minar in Mehrauli regarded as a multi-dynastic architectural archive?',
    options: [
      'It was excavated from an ancient underground Buddhist vihara',
      'Its 5 storeys bear Arabic and Persian inscriptions recording work by Qutb-ud-din Aibak (base), Iltutmish (storeys 2-4), Firoz Shah Tughlaq (marble upper repairs), and Sikandar Lodi',
      'It was built in one year by 10,000 Turkish craftsmen under a single architect',
      'It houses the tombs of all five founding sultans in its basement',
    ],
    correctIndex: 1,
    explanation: 'The 72.5m tower was founded by Aibak (1199), completed by Iltutmish (c. 1220), repaired with red sandstone and white marble by Firoz Shah Tughlaq after lightning strikes (1368), and restored by Sikandar Lodi (1503).',
    hints: [
      'Look for the multi-stage contribution across three separate dynasties.',
      'Aibak built the first storey, Iltutmish finished storeys 2 to 4, and Tughlaq replaced the top with marble storeys.',
      'The inscriptions explicitly record the building and repair phases of four different monarchs.',
    ],
  },
  {
    id: 'ch_alauddin_market_01',
    nodeId: NODE_C9_HISTCIV_056,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What was the core military-fiscal logic behind Alauddin Khalji\'s rigorous price-control regulations in Delhi (1296–1316)?',
    options: [
      'Philanthropic desire to eliminate poverty among the common peasants of North India',
      'Maintaining a massive 475,000-strong standing cavalry against recurring Mongol invasions on modest cash salaries without bankrupting the state treasury',
      'Encouraging European merchant guilds to establish trading outposts in Gujarat',
      'Punishing Hindu traders exclusively while subsidising nobility banquets',
    ],
    correctIndex: 1,
    explanation: 'Alauddin faced existential Mongol invasions (1303, 1305, 1306). He needed an immense standing army. Rather than inflating salaries (which would drain the treasury), he fixed the price of food grains, cloth, and warhorses so soldiers could live comfortably on cash wages.',
    hints: [
      'Connect the external Mongol threat to army size, and army size to treasury salary limits.',
      'Lowering the cost of living enabled the Sultan to pay lower cash salaries without discontent.',
      'It was a military-fiscal necessity to sustain 475,000 cavalry troopers on fixed stipends.',
    ],
  },
  {
    id: 'ch_alauddin_dagh_chehra_02',
    nodeId: NODE_C9_HISTCIV_056,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In Alauddin Khalji\'s military administration, how did the Dagh and Chehra systems prevent muster roll fraud?',
    options: [
      'Dagh branded each warhorse with an imperial seal; Chehra recorded the descriptive physical roll of each soldier',
      'Dagh was a silver token; Chehra was a cloth uniform',
      'Dagh was a sword test; Chehra was an archer tournament',
      'Dagh was a tax on horses; Chehra was a spy report on generals',
    ],
    correctIndex: 0,
    explanation: 'Dagh (branding imperial warhorses) stopped commanders from substituting lame ponies on muster day, while Chehra (detailed physical descriptions) stopped phantom soldiers from drawing cash salaries.',
    hints: [
      'One identified the mount; the other identified the trooper.',
      'Dagh literally means brand/mark, Chehra means face/appearance roll.',
      'Dagh = horse brand; Chehra = soldier descriptive identity.',
    ],
  },
  {
    id: 'ch_mbt_daulatabad_01',
    nodeId: NODE_C9_HISTCIV_057,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Evaluate the strategic rationale and operational failure of Muhammad bin Tughlaq\'s transfer of capital to Daulatabad (1327 CE):',
    options: [
      'The plan was insane from the start with no strategic purpose whatever',
      'The strategic concept of a central Deccan capital to control south India was sound, but the forced mass exodus of Delhi\'s entire civil population over 700 miles caused catastrophic loss of life and made northern frontiers vulnerable to Mongol raids',
      'Daulatabad lacked drinking water and had to be abandoned within three days',
      'The Sultan was defeated by the Vijayanagara army on his way south',
    ],
    correctIndex: 1,
    explanation: 'Historians emphasize that Daulatabad (Devagiri) was centrally positioned to govern the restive Deccan. The failure was logistical cruelty: compelling the entire urban populace of Delhi to march 700 miles without adequate supply chains, followed by the realization that North India could not be ruled from the south.',
    hints: [
      'Distinguish between strategic concept (centralised geography) and administrative execution (forced mass march).',
      'The Moroccan traveller Ibn Battuta recorded the tragic desolation of Delhi.',
      'Option 2 provides the balanced historical evaluation required by CISCE marking schemes.',
    ],
  },
  {
    id: 'ch_mbt_token_tax_02',
    nodeId: NODE_C9_HISTCIV_057,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Assemble the causal chain explaining why the Token Currency Experiment (1329 CE) collapsed into bankruptcy.',
    availableParts: [
      'Treasury depleted by wars & famine',
      'Issued copper/brass coins equal to silver tankas',
      'No state anti-forgery technology',
      'Every house became a mint',
      'Merchants rejected tokens',
      'Sultan redeemed fake tokens with royal silver',
    ],
    targetState: 'Treasury depleted by wars & famine Issued copper/brass coins equal to silver tankas No state anti-forgery technology Every house became a mint Merchants rejected tokens Sultan redeemed fake tokens with royal silver',
    validationHint: 'Click the steps in chronological order: Treasury depleted → Issued copper coins → No anti-forgery → House mints → Merchants reject → Silver redemption.',
    explanation: 'Barani famously wrote "every Hindu home became a mint". Copper was cheap and easily stamped. When trade froze, Muhammad bin Tughlaq honourably paid pure silver from the royal treasury for every brass/copper piece brought to court, emptying imperial vaults.',
    hints: [
      'Start with the financial crisis prompting the fiat coin idea.',
      'Follow with the lack of technological safeguards leading to household forging.',
      'End with the royal decision to redeem all tokens with genuine silver.',
    ],
  },
  {
    id: 'ch_mughal_ain_01',
    nodeId: NODE_C9_HISTCIV_058,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the precise relationship between Abul Fazl\'s Akbarnama and the Ain-i-Akbari?',
    options: [
      'They are two completely unrelated books written by different courtiers in different centuries',
      'The Ain-i-Akbari is the third and concluding statistical-administrative volume of the 3-volume Akbarnama chronicle',
      'The Akbarnama is a poetry collection, while the Ain-i-Akbari is a military map',
      'The Ain-i-Akbari was written by Akbar himself in Chagatai Turkish',
    ],
    correctIndex: 1,
    explanation: 'The Akbarnama consists of three volumes: Vol 1 (Akbar\'s ancestors & birth), Vol 2 (chronicle of Akbar\'s 46-year reign), and Vol 3 (Ain-i-Akbari — the comprehensive administrative, statistical, and fiscal gazetteer of the 12 subas).',
    hints: [
      'The Ain-i-Akbari is part of the larger Akbarnama project.',
      'It serves as the data and administrative gazetteer volume.',
      'It is Volume 3 of Abul Fazl\'s Persian masterpiece.',
    ],
  },
  {
    id: 'ch_mughal_monuments_02',
    nodeId: NODE_C9_HISTCIV_058,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match each Shah Jahan architectural monument with its historical evidentiary value:',
    options: [
      'Taj Mahal (Indo-Persian Pietra Dura & 32M Rupee Agrarian Surplus) | Jama Masjid (25,000-capacity Elevated Religious Hegemony) | Red Fort Diwan-i-Khas (Peacock Throne & Paradise Couplet Sovereignty)',
      'Taj Mahal (Military Fortification) | Jama Masjid (Royal Treasury Vault) | Red Fort (Public Hospital)',
      'Taj Mahal (Sufi Hermitage) | Jama Masjid (Astronomical Observatory) | Red Fort (Naval Dockyard)',
      'Taj Mahal (Akbar\'s Tomb) | Jama Masjid (Babur\'s Prayer Hall) | Red Fort (Humayun\'s Library)',
    ],
    correctIndex: 0,
    explanation: 'These structures reveal state capacity: the Taj demonstrates trade networks (Makrana marble, Afghan lapis, Tibetan jade); Jama Masjid asserts spatial imperial-religious supremacy; the Red Fort encodes court hierarchy between public accessibility (Diwan-i-Aam) and divine-right majesty (Diwan-i-Khas).',
    hints: [
      'Taj Mahal reveals financial resources and international gemstone trade.',
      'Jama Masjid manifests state-sanctioned congregational authority over Delhi.',
      'Red Fort halls map the strict graduation of court access.',
    ],
  },
  {
    id: 'ch_babur_battles_01',
    nodeId: NODE_C9_HISTCIV_059,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Order Babur\'s three decisive battles that established the Mughal foundation in North India (1526–1529):',
    sortItems: [
      'First Battle of Panipat (April 1526 vs Ibrahim Lodi - Overthrew Delhi Sultanate)',
      'Battle of Khanwa (March 1527 vs Rana Sanga of Mewar - Shattered Rajput Confederacy)',
      'Battle of Ghaghra (May 1529 vs Mahmud Lodi & Eastern Afghan Chiefs of Bihar/Bengal)',
    ],
    correctOrder: [0, 1, 2],
    explanation: 'Babur consolidated his conquest in three sequential steps: Panipat (1526) eliminated the central Sultanate; Khanwa (1527) defeated the formidable Rajput coalition; Ghaghra (1529) subdued the eastern Afghan resistance.',
    hints: [
      'P-K-G: Panipat first, Khanwa second, Ghaghra third.',
      'Lodi Afghan sultanate fell first in 1526.',
      'Rana Sanga fought in 1527; eastern Afghans in 1529.',
    ],
  },
  {
    id: 'ch_babur_tactics_02',
    nodeId: NODE_C9_HISTCIV_059,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How did Babur defeat Ibrahim Lodi\'s 100,000-man army with only 12,000 soldiers at Panipat (1526)?',
    options: [
      'He dug a 20-foot moat and waited for winter famine to disperse the Afghans',
      'By combining the Ottoman cart barricade (Araba/Tabuqa) with concentrated artillery/matchlocks and double-flanking cavalry encirclement (Tulghuma)',
      'He paid Lodi\'s generals to retreat before the battle commenced',
      'He relied solely on heavy armored war elephants imported from Central Asia',
    ],
    correctIndex: 1,
    explanation: 'Babur tied 700 baggage carts with rawhide ropes (Araba) leaving gaps for matchlock gunners and cannons (Ustad Ali and Mustafa), while his mobile cavalry swept around both flanks in the Tulghuma manoeuvre, trapping the dense Lodi formation.',
    hints: [
      'Think of gunpowder firearms behind mobile cart defenses combined with flanking cavalry.',
      'Tulghuma means the flanking encirclement of enemy wings.',
      'Option 2 synthesises the cart barricade, artillery, and Tulghuma tactics.',
    ],
  },
  {
    id: 'ch_akbar_rajput_01',
    nodeId: NODE_C9_HISTCIV_060,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What made Akbar\'s Rajput policy uniquely successful compared to previous Delhi sultans?',
    options: [
      'He entirely disarmed all Rajput fortresses and forced them into exile',
      'He combined honourable matrimonial alliances (Amber 1562), high imperial administrative/military commands (Raja Man Singh, Todar Mal), and religious non-interference/tax abolition (Pilgrimage 1563, Jizya 1564)',
      'He offered them heavy cash tributes without requiring military service',
      'He forced all Rajput rulers to convert to his personal ethical code',
    ],
    correctIndex: 1,
    explanation: 'Akbar treated Rajputs as equal partners in empire building rather than conquered vassals. Raja Man Singh was granted a premier mansab of 7,000 zat, Todar Mal directed revenue administration, and the abolition of Jizya (1564) and Pilgrimage tax (1563) won deep Hindu loyalty.',
    hints: [
      'It was a three-pronged strategy: marriage, high state office, and religious equality.',
      'Todar Mal and Man Singh held top cabinet and military positions.',
      'He removed discriminatory taxes on the Hindu majority.',
    ],
  },
  {
    id: 'ch_akbar_mansab_02',
    nodeId: NODE_C9_HISTCIV_060,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A Mughal noble holds a mansab of 5,000 Zat and 3,000 Sawar. If the royal regulation requires 2 horses per sawar trooper (Do-Aspa Sih-Aspa muster), how many cavalry mounts must this commander maintain?',
    correctAnswer: 6000,
    tolerance: 0,
    unit: 'warhorses',
    explanation: 'The Zat rank (5,000) determines personal precedence and cash salary. The Sawar rank (3,000) specifies the number of cavalrymen. At 2 horses per sawar trooper, the required stable strength is 3,000 × 2 = 6,000 warhorses.',
    hints: [
      'Zat is personal status/salary; Sawar is the actual mounted cavalry obligation.',
      'Only the Sawar figure (3,000) dictates troop and horse numbers.',
      'Multiply 3,000 sawar by 2 horses per trooper = 6,000.',
    ],
  },
  {
    id: 'ch_akbar_religion_03',
    nodeId: NODE_C9_HISTCIV_060,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is it historically erroneous to describe Akbar\'s Din-i-Ilahi (1582) as a "state-imposed mass religion"?',
    options: [
      'Because it was an ethical fellowship of only 18 elite courtiers (including Birbal and Abul Fazl) with no priests, dogma, or public conversion, while Sulh-i-Kul (Universal Peace) was the actual universal state policy',
      'Because it was written in Sanskrit which ordinary peasants could not read',
      'Because Jahangir completely banned it on his first day of reign',
      'Because it only existed as an architectural blueprint for Fatehpur Sikri',
    ],
    correctIndex: 0,
    explanation: 'Din-i-Ilahi (Tauhid-i-Ilahi) was an elite syncretic fraternity of eighteen courtiers. Akbar never compelled anyone to join. The governing policy for the empire\'s millions was Sulh-i-Kul (Universal Peace and mutual tolerance among all faiths).',
    hints: [
      'Count the members: only 18 close courtiers joined.',
      'Do not confuse the personal code (Din-i-Ilahi) with the state policy (Sulh-i-Kul).',
      'It had no scriptures, no public mosques/temples, and died with Akbar.',
    ],
  },
  {
    id: 'ch_golden_age_debate_04',
    nodeId: NODE_C9_HISTCIV_051,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'How do modern historians critically evaluate the "Golden Age" label applied to the Gupta and Mughal cultural apogees?',
    options: [
      'By denying that any literature, mathematics, or architecture was ever produced',
      'By acknowledging genuine peaks in science, arts, and statecraft while recognizing that agrarian extraction, caste rigidity, and patriarchal restrictions deepened for marginalized groups',
      'By declaring that economic gold coins were the only measure of civilization',
      'By claiming that foreign travelers invented all accounts of peace and prosperity',
    ],
    correctIndex: 1,
    explanation: 'Balanced historiography celebrates Kalidasa, Aryabhatta, Deogarh, and the Mughal synthesis, while critically noting that Gupta agrahara grants strengthened caste hierarchy and subordinate status for women, just as Mughal monumentality rested on heavy peasant revenue extraction.',
    hints: [
      'A mature historical perspective weighs elite cultural brilliance against grassroots social realities.',
      'Assess who actually benefited from the "Golden" accomplishments.',
      'Option 2 provides the objective, multi-dimensional assessment taught in ICSE Class 9.',
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

// ─── DEFAULT PROPS WITH ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: 'c9_histciv_051',
  title: 'Gupta, Chola, Sultanate & Mughal Civilisation Lab',
  definition: 'An interactive historical laboratory examining the institutional evolution of Indian statecraft, epigraphy, agrarian revenue systems, and monumental architecture from the 4th to the 17th centuries CE.',
  eli5: 'Step into an interactive time machine: test temple architecture in 3D, operate a medieval village lottery, run a royal grain market, and command Mughal artillery on historical battlefields!',
  misconceptions: [
    {
      misconception: 'Kalidasa only wrote plays like Shakuntala.',
      correction: 'Kalidasa mastered three distinct genres: Plays (Nataka), Classical Epics (Mahakavya like Raghuvamsha), and Lyric Poetry (Khandakavya like Meghadutam).',
    },
    {
      misconception: 'The Brihadishwara Temple is simply a grand house of worship.',
      correction: 'Its granite walls served as an imperial administrative archive, recording army battalions, commanders, revenue grants, and 400 devadasis.',
    },
    {
      misconception: 'The Chola Kudavolai system was a modern democratic universal election.',
      correction: 'It was a restricted lottery (drawing palm-leaf slips from a pot) open only to male Brahmin landowners aged 35–70 with Vedic knowledge.',
    },
    {
      misconception: 'Alauddin Khalji fixed market prices out of charity for the poor.',
      correction: 'Price controls were a military-fiscal necessity to maintain a 475,000-strong cavalry against Mongol invasions on modest cash salaries.',
    },
    {
      misconception: 'Muhammad bin Tughlaq was simply an unhinged ruler.',
      correction: 'His schemes were strategically visionary (fiduciary currency, southern administrative capital) but failed due to bureaucratic and technological limits.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which genre does Kalidasa\'s Raghuvamsha belong to?', options: ['Nataka (Play)', 'Mahakavya (Epic)', 'Khandakavya (Lyric)', 'Upanishad'], correctIndex: 1 },
    { question: 'Who built the Brihadishwara Temple at Thanjavur (completed c. 1010 CE)?', options: ['Rajaraja I', 'Rajendra I', 'Rajaraja II', 'Vijayalaya'], correctIndex: 0 },
    { question: 'What was the minimum age for Kudavolai committee candidates at Uttiramerur?', options: ['21 years', '25 years', '35 years', '50 years'], correctIndex: 2 },
    { question: 'What was the Dagh system under Alauddin Khalji?', options: ['Trooper roll', 'Horse branding', 'Wine taxation', 'Spy network'], correctIndex: 1 },
    { question: 'Where did Muhammad bin Tughlaq transfer his capital in 1327 CE?', options: ['Agra', 'Daulatabad (Devagiri)', 'Lahore', 'Kolkata'], correctIndex: 1 },
    { question: 'Who authored the Ain-i-Akbari in Persian?', options: ['Birbal', 'Todar Mal', 'Abul Fazl', 'Badauni'], correctIndex: 2 },
    { question: 'Which battle did Babur fight against Rana Sanga in 1527 CE?', options: ['First Panipat', 'Khanwa', 'Ghaghra', 'Takkolam'], correctIndex: 1 },
    { question: 'What did the Sawar rank in the Mansabdari system represent?', options: ['Personal salary', 'Cavalry troopers to maintain', 'Land acres granted', 'Palace rank'], correctIndex: 1 },
  ],
  masteryCriteria: 'Demonstrate thorough mastery across literary genres, temple epigraphy, Sultanate fiscal policies, and Mughal administrative systems.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (BRILLIANT-STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Gupta Panchayatana Temple Architecture',
    instruction: 'Click on the Deogarh sanctum and subsidiary shrines to reveal the 5-shrine sacred geometry and Vishnu narrative relief panels.',
    interactionType: 'click-architecture',
    nodeId: NODE_C9_HISTCIV_051,
  },
  {
    title: 'Lab 2: The Chola Kudavolai Village Lottery',
    instruction: 'Adjust candidate age and land ownership filters, then draw palm-leaf slips from the pot to simulate the Uttiramerur assembly.',
    interactionType: 'kudavolai-pot',
    nodeId: NODE_C9_HISTCIV_053,
  },
  {
    title: 'Lab 3: Alauddin\'s Delhi Market & Military Balance',
    instruction: 'Drag the Price-Cap slider to see how food costs directly impact soldier salaries and treasury stability against Mongol raids.',
    interactionType: 'market-economy',
    nodeId: NODE_C9_HISTCIV_056,
  },
  {
    title: 'Lab 4: Babur\'s Tactical Map at Panipat (1526)',
    instruction: 'Activate the Tulghuma flanking units and Araba cart barricade to inspect how 12,000 Mughals trapped 100,000 Sultanate troops.',
    interactionType: 'battle-tactics',
    nodeId: NODE_C9_HISTCIV_059,
  },
  {
    title: 'Lab 5: Akbar\'s Mansabdari Rank & Salary Engine',
    instruction: 'Manipulate Zat and Sawar sliders to observe an imperial noble\'s cash salary, cavalry contingent, and Do-Aspa warhorse obligations.',
    interactionType: 'mansabdari-calc',
    nodeId: NODE_C9_HISTCIV_060,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Alauddin Khalji removes all price caps on wheat in Delhi, what will happen to his standing army?',
    options: [
      'The army will grow twice as large as farmers become wealthy',
      'Soldiers will be unable to survive on their fixed cash salaries, leading to mutiny or treasury bankruptcy',
      'Mongol invaders will immediately purchase all Indian grain',
      'The cavalry horses will run faster without market regulation',
    ],
    correctIndex: 1,
    verifyInstruction: 'Slide the Market Regulation slider to "Uncontrolled Market" and watch the treasury deficit explode!',
    nodeId: NODE_C9_HISTCIV_056,
  },
  {
    question: 'Predict: If an officer is granted 4,000 Zat and 1,000 Sawar, can their son automatically inherit this rank upon the father\'s death?',
    options: [
      'Yes, mansab ranks were strictly hereditary family estates',
      'No, the rank lapsed upon death and the treasury reclaimed all royal arms and cash allotments',
      'Only if the son married into the royal Mughal family',
      'Yes, but only the Sawar portion was passed on',
    ],
    correctIndex: 1,
    verifyInstruction: 'Check the Mansabdari rules to verify that Akbar abolished hereditary feudal fiefs!',
    nodeId: NODE_C9_HISTCIV_060,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the ratio of Zat (precedence/salary) to Sawar (cavalry troops) under Akbar\'s system?',
    observableOptions: [
      'Sawar rank could never exceed the Zat rank',
      'Sawar rank was always exactly double the Zat rank',
      'Zat and Sawar were always completely identical numbers',
      'Sawar was paid in land while Zat was paid in diamonds',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_HISTCIV_060,
  },
  {
    question: 'In the Panipat battlefield simulation, what happened when the Lodi elephants met the concentrated matchlock and cart barricade?',
    observableOptions: [
      'The elephants easily crushed the carts',
      'Gunfire and smoke panicked the elephants, causing them to trample backwards through their own Afghan infantry',
      'The elephants flew over the Mughal cavalry',
      'The elephants joined Babur\'s side immediately',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_HISTCIV_059,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Epigraphist & Policy Analyst Challenge',
  description: 'Choose any historical district in India (such as Thanjavur, Delhi, Agra, or Lalitpur). Draft a 1-page conservation brief analyzing its primary monument as both an architectural masterpiece and a political-administrative record.',
  steps: [
    'Select a monument (e.g. Deogarh Dashavatara, Brihadishwara, Qutab Minar, or Red Fort)',
    'Identify at least 2 primary inscriptions or architectural spaces and their statecraft purpose',
    'Evaluate how that structure communicated royal authority to ordinary subjects',
    'Present your findings to your classroom or study circle',
  ],
};

// ─── REFLECTION QUESTIONS ───
const REFLECTION_QUESTIONS = [
  {
    id: 'ref_1',
    prompt: 'What was the most surprising thing you learned?',
    placeholder: 'e.g., How the Brihadishwara temple functioned as a public administrative archive, or the mathematics behind Akbar\'s Mansabdari system...',
  },
  {
    id: 'ref_2',
    prompt: 'How would you explain this to a friend?',
    placeholder: 'e.g., I would explain that medieval Indian empires built complex bureaucracies, market price caps, and lottery systems rather than just fighting battles...',
  },
  {
    id: 'ref_3',
    prompt: 'Where in real life might you use this?',
    placeholder: 'e.g., Understanding how modern central banks control inflation, how local panchayats rotate leadership, or how modern logistics balance supply lines...',
  },
];

export function C9_HistoryCivicsGuptaContributionCultureSim({
  nodeId = DEFAULT_PROPS.nodeId || 'c9_histciv_051',
  title = DEFAULT_PROPS.title || 'Gupta, Chola, Sultanate & Mughal Civilisation Lab',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['histciv'] || { name: 'History & Civics', emoji: '🏛️', color: 'amber' };

  // ─── PHASES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── DISCOVERY & PREDICTION STATES ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ─── INTERACTIVE LAB SPECIFIC STATES ───
  // Lab 1: Deogarh Temple
  const [selectedDeogarhPart, setSelectedDeogarhPart] = useState<string | null>(null);
  // Lab 2: Kudavolai Lottery
  const [kudavolaiCandidates, setKudavolaiCandidates] = useState<
    { name: string; age: number; land: number; vedic: boolean; servedRecently: boolean }[]
  >([
    { name: 'Sundaram Sastri', age: 48, land: 0.5, vedic: true, servedRecently: false },
    { name: 'Kalyana Raman', age: 29, land: 1.2, vedic: true, servedRecently: false },
    { name: 'Maravarman', age: 52, land: 0, vedic: false, servedRecently: false },
    { name: 'Appar Dikshitar', age: 62, land: 0.75, vedic: true, servedRecently: false },
    { name: 'Venkatesan', age: 41, land: 0.25, vedic: true, servedRecently: true },
    { name: 'Somadeva', age: 55, land: 0.4, vedic: true, servedRecently: false },
  ]);
  const [drawnCandidate, setDrawnCandidate] = useState<string | null>(null);
  const [potShaking, setPotShaking] = useState(false);

  // Lab 3: Alauddin Market Sim
  const [wheatPriceJitals, setWheatPriceJitals] = useState(7.5);
  const [horsePriceTankas, setHorsePriceTankas] = useState(110);
  const [soldierSalaryTankas, setSoldierSalaryTankas] = useState(234);

  // Lab 4: Babur Panipat Tactics
  const [tulghumaActive, setTulghumaActive] = useState(false);
  const [arabaArtilleryFired, setArabaArtilleryFired] = useState(false);
  const [battleStep, setBattleStep] = useState(0);

  // Lab 5: Mansabdari System
  const [simZat, setSimZat] = useState(4000);
  const [simSawar, setSimSawar] = useState(2500);

  // ─── CHALLENGE & ADAPTIVE DIFFICULTY STATE ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── REFLECTION INPUTS ───
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({
    ref_1: '',
    ref_2: '',
    ref_3: '',
  });

  // ─── HINTS & STEPWISE EXPLANATIONS ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ─── DRAG & DROP / INTERACTIVE CHALLENGE STATES ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── VISUAL FEEDBACK & ANIMATIONS ───
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOTIVATIONAL FEEDBACK HELPER ───
  const getMotivationalFeedback = (errorCount: number) => {
    if (errorCount === 0) {
      return {
        badge: 'PERFECT SCORE!',
        color: 'text-emerald-400',
        bg: 'bg-emerald-950/60 border-emerald-500',
        message: 'Flawless historical mastery! You analyzed every primary source, architectural blueprint, and state policy with complete accuracy.',
      };
    }
    if (errorCount >= 1 && errorCount <= 3) {
      return {
        badge: 'Great work!',
        color: 'text-amber-400',
        bg: 'bg-amber-950/60 border-amber-500',
        message: 'Superb critical analysis! You demonstrated commanding insight across 1,500 years of South Asian statecraft.',
      };
    }
    if (errorCount >= 4 && errorCount <= 7) {
      return {
        badge: 'Good effort!',
        color: 'text-blue-400',
        bg: 'bg-blue-950/60 border-blue-500',
        message: 'Strong analytical foundation! Reviewing key temple epigraphy and Sultanate market mechanisms will elevate you to expert status.',
      };
    }
    return {
      badge: 'Do not give up — You WILL get this!',
      color: 'text-rose-400',
      bg: 'bg-rose-950/60 border-rose-500',
      message: 'Historical mastery takes practice. Re-examine the primary source archives and try again — you are very close to mastering this!',
    };
  };

  // ─── INITIAL LOAD FROM MASTERY STORE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT-BASED DIFFICULTY ADAPTATION ───
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
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS ANIMATION (ANIMATED BANNER WITH RAF) ───
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

      ctx.strokeStyle = 'rgba(217, 119, 6, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      const radius = 6 + Math.sin(frame * 0.06) * 2.5;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(canvas.width - 24, 18, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`Imperial Archive Explorer • ${phase.toUpperCase()} MODE`, 12, 22);

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── GSAP PROCESS TIMELINE ANIMATION ───
  useEffect(() => {
    if (timelineRef.current && phase === 'explore') {
      gsap.fromTo(
        timelineRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [phase, currentSlide]);

  // ─── ESCALATING HINTS HANDLER ───
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

  // ─── RESET INACTIVITY AUTO-HINT TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── DISCOVERY ANSWER HANDLER ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── ADVANCE PHASES ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Examine the evidence and manipulate the historical variables.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now test your knowledge freely with all simulation tools in sandbox mode.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Solve each primary source puzzle.');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulation to verify.');
  }, []);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work, Master Archivist! You have reconstructed fifteen centuries of Indian statecraft and culture.');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───
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

  // ─── ANSWER VALIDATION HANDLER ───
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
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct analysis!');
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
          speechManager.speak('Let us examine the complete historical explanation.');
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
    [challenge, hintCount, hitMisconceptions, resetInactivityTimer, showNextHint]
  );

  // ─── DRAG HANDLERS (DRAG-LABEL) ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('pop');
      setDraggedItem(null);
    },
    [draggedItem]
  );

  // ─── SORT HANDLERS (DRAG-SORT) ───
  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement(prev => {
        let arr = prev.length > 0 ? [...prev] : (challenge.sortItems || []).map((_, i) => i);
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems || []).map((_, i) => i);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── LAB 2: KUDAVOLAI LOTTERY DRAW HANDLER ───
  const handleDrawKudavolai = useCallback(() => {
    setPotShaking(true);
    audioManager.play('count');
    setTimeout(() => {
      setPotShaking(false);
      const eligible = kudavolaiCandidates.filter(c => c.age >= 35 && c.age <= 70 && c.land > 0 && c.vedic && !c.servedRecently);
      if (eligible.length > 0) {
        const picked = eligible[Math.floor(Math.random() * eligible.length)];
        setDrawnCandidate(`${picked.name} (Age: ${picked.age}, Land: ${picked.land} Veli, Veda: Yes)`);
        audioManager.play('sparkle');
        speechManager.speak(`Name drawn from pot: ${picked.name}`);
      }
    }, 600);
  }, [kudavolaiCandidates]);

  // ─── LAB 4: BABUR TACTICS STEPPER ───
  const handleTriggerBattleStep = useCallback(() => {
    setBattleStep(prev => {
      const next = (prev + 1) % 4;
      if (next === 1) {
        setArabaArtilleryFired(true);
        audioManager.play('swoop');
      } else if (next === 2) {
        setTulghumaActive(true);
        audioManager.play('whoosh');
      } else if (next === 3) {
        audioManager.play('success');
      } else {
        setArabaArtilleryFired(false);
        setTulghumaActive(false);
      }
      return next;
    });
  }, []);

  // ─── CLEANUP TIMER ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  const motivationalFeedback = getMotivationalFeedback(errors);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-amber-500/10 rounded-2xl border border-amber-500/30" aria-hidden="true">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">ICSE Class 9 • History & Civics</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">CISCE 2026 Ready</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Difficulty Badge & Phase Navigation */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 text-xs font-bold uppercase rounded-xl border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-700'
                : 'bg-amber-950/60 text-amber-400 border-amber-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="text-xs px-2.5 py-1 bg-slate-900 rounded-lg text-slate-400 border border-slate-800">
            Mastery: <strong className="text-slate-200 capitalize">{masteryLevel}</strong>
          </span>
        </div>
      </div>

      {/* ─── 2D RAF CANVAS BANNER ─── */}
      <canvas ref={canvasRef} width={800} height={36} className="w-full h-9 rounded-xl mb-4 bg-slate-900/60 border border-slate-800/80" aria-label="Simulation state indicator banner" />

      {/* ────────────────────────────────────────────────────────── */}
      {/* ─── 1. DISCOVERY HOOK PHASE ─────────────────────────── */}
      {/* ───────────────────────────���────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-indigo-950/40 rounded-2xl border border-amber-800/40 shadow-inner">
            <h2 className="text-lg font-bold text-amber-300 flex items-center gap-2">
              <span aria-hidden="true">📜</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-amber-200/70 mt-3 p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              💡 <em>{SCENARIO.context}</em>
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Curiosity Investigation</span>
              <span className="text-xs text-slate-400">Ungraded Diagnostic Hook</span>
            </div>
            <p className="text-base text-white font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 opacity-60'
                      : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 text-slate-200 hover:border-amber-500/50'
                  }`}
                >
                  <span className="font-bold text-amber-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && <span className="text-slate-500 font-bold mr-1">✗ </span>}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-medium' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Exceptional insight into 14th-century monetary history!' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter Interactive Laboratories"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-extrabold rounded-xl shadow-lg"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* ─── 2. INTERACTIVE EXPLORATION PHASE (BRILLIANT LABS) ─── */}
      {/* ──────────────────────��─────────────────────────────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-2 bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                aria-label={`Go to Lab ${idx + 1}: ${step.title}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                  currentSlide === idx
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                Lab {idx + 1}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h2 className="text-xl font-black text-white mt-1">{EXPLORATION_STEPS[currentSlide].title}</h2>
                <p className="text-sm text-amber-200/90 mt-1 flex items-center gap-1.5">
                  <span aria-hidden="true">👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB 1: GUPTA PANCHAYATANA VISUALIZER (SVG) ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-6">
                    <svg viewBox="0 0 450 320" className="w-full max-w-md" aria-label="Gupta Dashavatara Temple Panchayatana Layout Diagram">
                      {/* Jagati Plinth */}
                      <rect x="40" y="30" width="370" height="260" rx="12" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                      <text x="55" y="55" fill="#94a3b8" fontSize="10" fontWeight="bold">JAGATI (Raised Plinth)</text>

                      {/* 4 Subsidiary Corner Shrines */}
                      <g role="button" tabIndex={0} aria-label="Select North-West Subsidiary Shrine" onClick={() => setSelectedDeogarhPart('NW Shrine')} onKeyDown={(e) => e.key === 'Enter' && setSelectedDeogarhPart('NW Shrine')} style={{ cursor: 'pointer' }}>
                        <rect x="60" y="70" width="65" height="65" rx="8" fill="#334155" stroke="#f59e0b" strokeWidth={selectedDeogarhPart === 'NW Shrine' ? 3 : 1} />
                        <text x="92" y="108" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">NW Shrine</text>
                      </g>
                      <g role="button" tabIndex={0} aria-label="Select North-East Subsidiary Shrine" onClick={() => setSelectedDeogarhPart('NE Shrine')} onKeyDown={(e) => e.key === 'Enter' && setSelectedDeogarhPart('NE Shrine')} style={{ cursor: 'pointer' }}>
                        <rect x="325" y="70" width="65" height="65" rx="8" fill="#334155" stroke="#f59e0b" strokeWidth={selectedDeogarhPart === 'NE Shrine' ? 3 : 1} />
                        <text x="357" y="108" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">NE Shrine</text>
                      </g>
                      <g role="button" tabIndex={0} aria-label="Select South-West Subsidiary Shrine" onClick={() => setSelectedDeogarhPart('SW Shrine')} onKeyDown={(e) => e.key === 'Enter' && setSelectedDeogarhPart('SW Shrine')} style={{ cursor: 'pointer' }}>
                        <rect x="60" y="195" width="65" height="65" rx="8" fill="#334155" stroke="#f59e0b" strokeWidth={selectedDeogarhPart === 'SW Shrine' ? 3 : 1} />
                        <text x="92" y="233" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">SW Shrine</text>
                      </g>
                      <g role="button" tabIndex={0} aria-label="Select South-East Subsidiary Shrine" onClick={() => setSelectedDeogarhPart('SE Shrine')} onKeyDown={(e) => e.key === 'Enter' && setSelectedDeogarhPart('SE Shrine')} style={{ cursor: 'pointer' }}>
                        <rect x="325" y="195" width="65" height="65" rx="8" fill="#334155" stroke="#f59e0b" strokeWidth={selectedDeogarhPart === 'SE Shrine' ? 3 : 1} />
                        <text x="357" y="233" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">SE Shrine</text>
                      </g>

                      {/* Central Garbhagriha Sanctum */}
                      <g role="button" tabIndex={0} aria-label="Select Central Garbhagriha Sanctum" onClick={() => setSelectedDeogarhPart('Garbhagriha Sanctum')} onKeyDown={(e) => e.key === 'Enter' && setSelectedDeogarhPart('Garbhagriha Sanctum')} style={{ cursor: 'pointer' }}>
                        <rect x="160" y="105" width="130" height="120" rx="10" fill="#78350f" stroke="#fbbf24" strokeWidth={selectedDeogarhPart === 'Garbhagriha Sanctum' ? 4 : 2} />
                        <circle cx="225" cy="165" r="30" fill="#d97706" opacity="0.4" />
                        <text x="225" y="160" textAnchor="middle" fill="#fef3c7" fontSize="11" fontWeight="extrabold">GARBHAGRIHA</text>
                        <text x="225" y="175" textAnchor="middle" fill="#fef3c7" fontSize="9">(Lord Vishnu)</text>
                      </g>
                    </svg>

                    <div className="flex-1 space-y-3">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">Selected Sacred Space:</span>
                        <h3 className="text-base font-extrabold text-white mt-0.5">{selectedDeogarhPart || 'Click any shrine or sanctum'}</h3>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          {selectedDeogarhPart === 'Garbhagriha Sanctum'
                            ? 'Houses the principal sanctum where Vishnu Anantashayana (reclining on the serpent Shesha) and Gajendra Moksha narrative relief panels adorn the external stone niches.'
                            : selectedDeogarhPart
                            ? 'One of four corner subsidiary shrines defining the Panchayatana 5-shrine North Indian temple architectural layout.'
                            : 'The Panchayatana layout (5 shrines on 1 platform) pioneered the North Indian Nagara temple prototype at Deogarh in the 5th-6th century CE.'}
                        </p>
                      </div>

                      <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-900/50">
                        <span className="text-xs font-bold text-amber-300">Kalidasa Genre Reference:</span>
                        <p className="text-xs text-slate-300 mt-1">
                          In the same era, Kalidasa composed <em>Abhijnanasakuntalam</em> (Play), <em>Raghuvamsha</em> (Epic), and <em>Meghadutam</em> (Lyric) in Chandragupta II Vikramaditya's Navaratna court.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: CHOLA KUDAVOLAI LOTTERY SIMULATOR ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Uttiramerur Assembly Rules (920 CE)</h3>
                      <p className="text-xs text-slate-300">
                        Eligible candidates must be <strong>35–70 years old</strong>, own at least <strong>1/4 veli taxable land</strong>, know <strong>at least one Veda</strong>, and <strong>not have served in the last 3 years</strong>.
                      </p>

                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {kudavolaiCandidates.map((c, i) => {
                          const isEligible = c.age >= 35 && c.age <= 70 && c.land > 0 && c.vedic && !c.servedRecently;
                          return (
                            <div key={i} className={`p-2.5 rounded-lg text-xs flex items-center justify-between border ${isEligible ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200' : 'bg-rose-950/40 border-rose-900/60 text-rose-300'}`}>
                              <div>
                                <strong>{c.name}</strong> • {c.age} yrs • {c.land} Veli Land
                              </div>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${isEligible ? 'bg-emerald-800 text-white' : 'bg-rose-900 text-rose-200'}`}>
                                <span>{isEligible ? '✓' : '✗'}</span>
                                {isEligible ? 'QUALIFIED' : 'DISQUALIFIED'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
                      <motion.div
                        animate={potShaking ? { rotate: [-8, 8, -8, 8, 0], scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 0.5 }}
                        className="w-24 h-28 bg-gradient-to-b from-amber-700 to-amber-900 rounded-b-3xl rounded-t-lg border-2 border-amber-400 shadow-xl flex items-center justify-center text-2xl relative"
                        aria-label="Kudavolai Pot for drawing palm-leaf ballots"
                      >
                        🏺
                        <span className="absolute -top-3 px-2 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full">POT OF SLIPS</span>
                      </motion.div>

                      <motion.button
                        aria-label="Draw palm-leaf slip from the Kudavolai pot"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDrawKudavolai}
                        className="px-5 py-2.5 bg-amber-500 text-slate-950 text-xs font-black rounded-xl shadow-md"
                      >
                        Draw Palm-Leaf Slip (Kudavolai) 📜
                      </motion.button>

                      {drawnCandidate && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-3 bg-indigo-950/60 rounded-xl border border-indigo-700/60 text-xs text-indigo-200">
                          <span className="font-bold text-amber-300">✓ Variyam Committee Member Selected:</span>
                          <p className="mt-1 font-mono">{drawnCandidate}</p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: ALAUDDIN MARKET & ARMY STABILITY SIM ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* Predict Then Check Hook */}
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800 space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Predict Before Interacting:</span>
                      <p className="text-sm font-medium text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Select prediction option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left text-xs bg-slate-800 rounded-lg text-slate-200 hover:bg-slate-700 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Delhi Market Control Dashboard</h3>
                        <span className="text-xs text-slate-400">Enforced by Shahna-i-Mandi & Barids</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="wheat-slider" className="text-xs text-slate-400">Wheat Price (Jitals / Man): <strong>{wheatPriceJitals}</strong></label>
                          <input
                            id="wheat-slider"
                            aria-label="Adjust wheat price in jitals per man"
                            type="range"
                            min={4}
                            max={25}
                            step={0.5}
                            value={wheatPriceJitals}
                            onChange={e => setWheatPriceJitals(Number(e.target.value))}
                            className="w-full mt-2 accent-amber-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="horse-slider" className="text-xs text-slate-400">Quality Warhorse (Tankas): <strong>{horsePriceTankas}</strong></label>
                          <input
                            id="horse-slider"
                            aria-label="Adjust quality warhorse price in silver tankas"
                            type="range"
                            min={80}
                            max={300}
                            step={5}
                            value={horsePriceTankas}
                            onChange={e => setHorsePriceTankas(Number(e.target.value))}
                            className="w-full mt-2 accent-amber-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="salary-slider" className="text-xs text-slate-400">Trooper Annual Pay (Tankas): <strong>{soldierSalaryTankas}</strong></label>
                          <input
                            id="salary-slider"
                            aria-label="Adjust annual cavalry trooper salary in silver tankas"
                            type="range"
                            min={150}
                            max={400}
                            step={10}
                            value={soldierSalaryTankas}
                            onChange={e => setSoldierSalaryTankas(Number(e.target.value))}
                            className="w-full mt-2 accent-amber-500"
                          />
                        </div>
                      </div>

                      {/* Real-time Status Gauge */}
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                          <span className="text-xs text-slate-400">Army Morale & Readiness (475,000 Cavalry):</span>
                          <div className="text-lg font-black mt-1">
                            {wheatPriceJitals <= 9 && horsePriceTankas <= 130 && soldierSalaryTankas >= 230 ? (
                              <span className="text-emerald-400 flex items-center gap-1.5">✓ 🛡️ Optimal Defensive Posture (Mongol Ready)</span>
                            ) : wheatPriceJitals > 15 ? (
                              <span className="text-rose-400 flex items-center gap-1.5">✗ ⚠️ Soldiers Mutinous (Living Costs Exceed Pay)</span>
                            ) : (
                              <span className="text-amber-400 flex items-center gap-1.5">⚖️ Borderline Fiscal Strain</span>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-slate-400">Doab 50% Tax Extraction: Active</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ─── LAB 4: BABUR'S BATTLE OF PANIPAT (1526) TACTICS ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-6">
                    <svg viewBox="0 0 450 280" className="w-full max-w-md bg-slate-900 rounded-xl" aria-label="Babur at First Battle of Panipat tactical map">
                      {/* Lodi Army (Top) */}
                      <rect x="100" y="20" width="250" height="45" rx="8" fill="#881337" opacity={battleStep >= 3 ? 0.4 : 0.9} />
                      <text x="225" y="45" textAnchor="middle" fill="#ffe4e6" fontSize="10" fontWeight="bold">
                        Ibrahim Lodi (100,000 Troops + 1,000 Elephants)
                      </text>

                      {/* Tulghuma Flanking Arrows */}
                      {tulghumaActive && (
                        <g>
                          <path d="M 40 220 C 10 120, 20 60, 95 35" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="5 5" />
                          <polygon points="95,30 100,40 90,38" fill="#22c55e" />
                          <path d="M 410 220 C 440 120, 430 60, 355 35" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="5 5" />
                          <polygon points="355,30 350,40 360,38" fill="#22c55e" />
                          <text x="50" y="140" fill="#22c55e" fontSize="9" fontWeight="bold">✓ TULGHUMA</text>
                          <text x="360" y="140" fill="#22c55e" fontSize="9" fontWeight="bold">✓ TULGHUMA</text>
                        </g>
                      )}

                      {/* Araba Cart Barricade & Cannons (Middle) */}
                      <g>
                        <rect x="90" y="150" width="270" height="20" rx="4" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5" />
                        <text x="225" y="164" textAnchor="middle" fill="#fef3c7" fontSize="9" fontWeight="bold">
                          700 Tied Carts (Araba) + Matchlocks (Rah)
                        </text>
                        {arabaArtilleryFired && (
                          <g>
                            <circle cx="150" cy="120" r="14" fill="#f97316" opacity="0.6" />
                            <circle cx="225" cy="115" r="18" fill="#ef4444" opacity="0.7" />
                            <circle cx="300" cy="120" r="14" fill="#f97316" opacity="0.6" />
                            <text x="225" y="120" textAnchor="middle" fill="white" fontSize="9" fontWeight="extrabold">BOOM!</text>
                          </g>
                        )}
                      </g>

                      {/* Babur Reserve Corps (Bottom) */}
                      <rect x="140" y="215" width="170" height="40" rx="8" fill="#1e3a8a" />
                      <text x="225" y="240" textAnchor="middle" fill="#dbeafe" fontSize="10" fontWeight="bold">
                        Babur Reserve (12,000 Veterans)
                      </text>
                    </svg>

                    <div className="flex-1 space-y-3">
                      <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">Battle Sequence: Step {battleStep} / 3</span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {battleStep === 0 && 'Initial Deployment: Lodi advances in massive head-on formation.'}
                        {battleStep === 1 && 'Artillery & Matchlock Volley: Gunpowder smoke panics Lodi elephants, halting frontal charge.'}
                        {battleStep === 2 && 'Tulghuma Encirclement: Mughal cavalry sweeps around both wings, trapping the enemy in a kill zone.'}
                        {battleStep === 3 && 'Decisive Victory: Ibrahim Lodi killed; Delhi & Agra captured; Mughal dynasty established.'}
                      </p>
                      <motion.button
                        aria-label="Advance to next step in Panipat tactical simulation"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleTriggerBattleStep}
                        className="px-4 py-2 bg-amber-500 text-slate-950 text-xs font-black rounded-xl shadow"
                      >
                        Advance Battlefield Phase ⚔️
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: AKBAR'S MANSABDARI RANK CALCULATOR ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Mansabdari Imperial Rank Engine</h3>
                      <span className="text-xs text-slate-400">Non-hereditary Cash Administration</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="zat-slider" className="text-xs text-slate-400">Zat Rank (Personal Status & Base Pay): <strong>{simZat}</strong></label>
                        <input
                          id="zat-slider"
                          aria-label="Adjust Zat rank personal status slider"
                          type="range"
                          min={500}
                          max={7000}
                          step={500}
                          value={simZat}
                          onChange={e => {
                            const val = Number(e.target.value);
                            setSimZat(val);
                            if (simSawar > val) setSimSawar(val);
                          }}
                          className="w-full mt-2 accent-amber-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="sawar-slider" className="text-xs text-slate-400">Sawar Rank (Cavalry Force Required): <strong>{simSawar}</strong></label>
                        <input
                          id="sawar-slider"
                          aria-label="Adjust Sawar rank military quota slider"
                          type="range"
                          min={100}
                          max={simZat}
                          step={100}
                          value={simSawar}
                          onChange={e => setSimSawar(Number(e.target.value))}
                          className="w-full mt-2 accent-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Estimated Monthly Pay</span>
                        <p className="text-base font-extrabold text-amber-400 mt-1">₹ {Math.round(simZat * 5.2)}</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Cavalry Troopers</span>
                        <p className="text-base font-extrabold text-blue-400 mt-1">{simSawar} Troopers</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Warhorses (Do-Aspa 2x)</span>
                        <p className="text-base font-extrabold text-emerald-400 mt-1">{simSawar * 2} Mounts</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  aria-label="Go to previous interactive laboratory"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>

                <span className="text-xs text-slate-400">
                  {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    aria-label="Go to next interactive laboratory"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Proceed to Free Sandbox mode"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-xs font-black rounded-xl shadow-lg"
                  >
                    Enter Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* ─── 3. FREE SANDBOX PHASE ────────────────────────────── */}
      {/* ────────────────────────────────────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <h2 className="text-lg font-bold text-amber-300">Free Sandbox & Archive Synthesizer</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Explore all five interactive engines with zero grading pressure. Test how agrarian taxation, Kudavolai lotteries, and artillery deployments interact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Quick Tool 1: Kudavolai Randomizer</span>
              <p className="text-xs text-slate-300">Simulate drawing lotteries under Parantaka I's Uttiramerur constitution.</p>
              <motion.button
                aria-label="Draw random candidate slip from agrahara Kudavolai pot"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDrawKudavolai}
                className="w-full py-2 bg-amber-500/20 border border-amber-500/50 text-amber-300 font-bold rounded-xl text-xs"
              >
                Draw Random Agrahara Candidate
              </motion.button>
              {drawnCandidate && <p className="text-xs font-mono text-slate-300 p-2 bg-slate-950 rounded-lg">{drawnCandidate}</p>}
            </div>

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Quick Tool 2: Mansab Calculator</span>
              <div className="flex items-center gap-3">
                <input
                  aria-label="Adjust Zat rank in sandbox Mansab calculator"
                  type="range"
                  min={1000}
                  max={7000}
                  step={500}
                  value={simZat}
                  onChange={e => setSimZat(Number(e.target.value))}
                  className="flex-1 accent-amber-500"
                />
                <span className="text-xs font-mono text-amber-300 font-bold">{simZat} Zat</span>
              </div>
              <p className="text-xs text-slate-400">Requires up to {simZat * 2} horses under imperial Do-Aspa regulations.</p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <motion.button
              aria-label={`Start Official Challenges with ${filteredChallenges.length} questions`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black rounded-xl shadow-xl"
            >
              Start Official Challenges ({filteredChallenges.length}) →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* ─── 4. OFFICIAL CHALLENGE PHASE ���──────────────────────── */}
      {/* ────────────────────────────────────────────────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Challenge Header & Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-400">
                Question {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 font-bold uppercase text-[10px]">
                NEP Competency: {challenge.competencyLevel}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div
            className={`p-6 bg-slate-900/95 rounded-2xl border transition-all ${
              wrongFlash
                ? 'border-rose-500 bg-rose-950/40'
                : 'border-slate-800 shadow-xl'
            }`}
          >
            <p className="text-base sm:text-lg font-bold text-white leading-relaxed">{challenge.question}</p>

            {/* MCQ OPTIONS */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-2.5 mt-6">
                {challenge.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                    whileHover={{ scale: 1.01, x: 3 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(idx)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm transition-all border ${
                      showExplanation && idx === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 text-slate-200 hover:border-amber-500/50'
                    }`}
                  >
                    <span className="font-bold text-amber-400 mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {showExplanation && idx === challenge.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                    {showExplanation && idx !== challenge.correctIndex && <span className="text-slate-500 font-bold mr-1">✗ </span>}
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL CHALLENGE (SVG DIAGRAM INTERACTION) */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="mt-6 space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag each label to the diagram targets below:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable structural label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-amber-500 text-slate-950 text-xs font-black rounded-lg cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map(targetKey => (
                    <div
                      key={targetKey}
                      role="region"
                      aria-label={`Drop target zone for ${targetKey.replace('part_', '')}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetKey)}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center min-h-[70px] flex flex-col items-center justify-center cursor-pointer hover:border-amber-500/40"
                    >
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Target Zone: {targetKey.replace('part_', '')}</span>
                      <p className="text-xs font-bold text-amber-300 mt-1">
                        {droppedLabels[targetKey] ? `✓ ${droppedLabels[targetKey]}` : '📥 Drop Label Here'}
                      </p>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify structural labels mapping"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-amber-500 text-slate-950 text-xs font-black rounded-xl shadow"
                >
                  Verify Structural Labels ✓
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="mt-6 space-y-3">
                <span className="text-xs text-slate-400">Click & reorder items into chronological or administrative sequence:</span>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sequence position ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-amber-400 mr-2">{displayIdx + 1}.</strong> {item}
                      </span>
                      <span className="text-slate-500 text-xs">☰ Drag</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Check the sequence order"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-amber-500 text-slate-950 text-xs font-black rounded-xl shadow"
                >
                  Check Sequence Order ✓
                </motion.button>
              </div>
            )}

            {/* NUMERIC CHALLENGE */}
            {challenge.type === 'numeric' && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    aria-label="Enter calculated numeric value"
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-amber-500 focus:outline-none"
                  />
                  <span className="text-sm text-slate-400">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit calculated numerical answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-amber-500 text-slate-950 text-xs font-black rounded-xl shadow"
                  >
                    Submit Calculation ✓
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="mt-6 space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add step to chain: ${part}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(p => [...p, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 text-xs font-semibold rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[80px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-3 py-1 bg-amber-950 border border-amber-700/60 text-amber-200 text-xs rounded-md flex items-center gap-1.5">
                      <span>✓ {part}</span>
                      <button aria-label={`Remove step: ${part}`} onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))} className="text-rose-400 font-bold ml-1">×</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click steps above to build causal chain</span>}
                </div>

                <motion.button
                  aria-label="Verify assembled causal chain"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-amber-500 text-slate-950 text-xs font-black rounded-xl shadow"
                >
                  Verify Built Chain ✓
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/30 border border-amber-800/60 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Stepwise Historical Analysis</span>
                  <span className="text-xs text-slate-400">Primary Source Validation</span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.p key={sIdx} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                        <strong className="text-amber-400 mr-1.5">{sIdx + 1}.</strong>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Reveal next step in historical explanation"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-2 bg-amber-700/60 hover:bg-amber-600 text-white text-xs font-bold rounded-xl"
                  >
                    Reveal Next Analytical Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Archive Assessment' : 'Proceed to Next Primary Source'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-xs font-black rounded-xl shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Archive Assessment 🎓' : 'Proceed to Next Primary Source →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* ─── 5. COMPLETION & MASTERY SUMMARY PHASE ────────────── */}
      {/* ────────────────────────────────────────────────────────── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          {/* Motivational Feedback Card */}
          <div className={`p-6 rounded-3xl border ${motivationalFeedback.bg} text-center space-y-3`}>
            <span className="text-4xl" aria-hidden="true">🏆</span>
            <h2 className={`text-2xl sm:text-3xl font-black ${motivationalFeedback.color}`}>
              {motivationalFeedback.badge}
            </h2>
            <p className="text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
              {motivationalFeedback.message}
            </p>
          </div>

          <div className="p-8 bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-900 rounded-3xl border border-amber-800/60 text-center space-y-4">
            <span className="text-5xl" aria-hidden="true">🏛️</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">Imperial Archive Commission Certified!</h3>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have accurately interpreted epigraphic records, decoded the Kudavolai constitution, balanced medieval market economics, and mapped Mughal court hierarchy.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-[10px] uppercase font-bold text-slate-400">Overall Score</span>
                <p className="text-2xl font-black text-amber-400 mt-0.5">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-[10px] uppercase font-bold text-slate-400">Mastery Level</span>
                <p className="text-2xl font-black text-emerald-400 capitalize mt-0.5">{masteryLevel}</p>
              </div>
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-[10px] uppercase font-bold text-slate-400">Total Nodes Mastered</span>
                <p className="text-2xl font-black text-blue-400 mt-0.5">10 / 10</p>
              </div>
            </div>
          </div>

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-amber-800/40 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <span className="text-xl" aria-hidden="true">💭</span>
              <h3 className="text-base font-bold text-amber-300">Historical Reflection & Synthesis</h3>
            </div>
            <p className="text-xs text-slate-300">
              Reflect on your learning journey across the Gupta, Chola, Sultanate, and Mughal eras:
            </p>

            <div className="space-y-4">
              {REFLECTION_QUESTIONS.map((q) => (
                <div key={q.id} className="space-y-1.5">
                  <label htmlFor={q.id} className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <span className="text-amber-400">❖</span> {q.prompt}
                  </label>
                  <textarea
                    id={q.id}
                    aria-label={q.prompt}
                    value={reflectionAnswers[q.id] || ''}
                    onChange={(e) => setReflectionAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                    placeholder={q.placeholder}
                    rows={2}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Targeted Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                <span aria-hidden="true">⚠️</span> Specific Misconception Audit
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {hitMisconceptions.map(idx => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">✗ {m.misconception}</p>
                      <p className="text-emerald-300">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition (SM-2) Schedule */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <span aria-hidden="true">📅</span> Spaced Review Schedule (SM-2 Algorithm)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on your response precision, your memory consolidation review for these 10 nodes is scheduled for{' '}
              <strong className="text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
            </p>
          </div>

          {/* Real World Activity Card */}
          <div className="p-6 bg-indigo-950/30 rounded-2xl border border-indigo-900/60 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">
              🌍 Real-World Analytical Brief: {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ol className="list-decimal list-inside text-xs text-slate-400 space-y-1 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i}>{st}</li>
              ))}
            </ol>
          </div>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Archive Synthesis Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_HistoryCivicsGuptaContributionCultureSim;
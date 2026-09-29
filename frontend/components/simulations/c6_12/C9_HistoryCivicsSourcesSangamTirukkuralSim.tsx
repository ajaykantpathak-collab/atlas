'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import gsap from 'gsap';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C9_HISTCIV_041 = 'c9_histciv_041';
const NODE_C9_HISTCIV_042 = 'c9_histciv_042';
const NODE_C9_HISTCIV_043 = 'c9_histciv_043';
const NODE_C9_HISTCIV_044 = 'c9_histciv_044';
const NODE_C9_HISTCIV_045 = 'c9_histciv_045';
const NODE_C9_HISTCIV_046 = 'c9_histciv_046';
const NODE_C9_HISTCIV_047 = 'c9_histciv_047';
const NODE_C9_HISTCIV_048 = 'c9_histciv_048';
const NODE_C9_HISTCIV_049 = 'c9_histciv_049';
const NODE_C9_HISTCIV_050 = 'c9_histciv_050';

const ALL_NODE_IDS = [
  NODE_C9_HISTCIV_041,
  NODE_C9_HISTCIV_042,
  NODE_C9_HISTCIV_043,
  NODE_C9_HISTCIV_044,
  NODE_C9_HISTCIV_045,
  NODE_C9_HISTCIV_046,
  NODE_C9_HISTCIV_047,
  NODE_C9_HISTCIV_048,
  NODE_C9_HISTCIV_049,
  NODE_C9_HISTCIV_050,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Grand Classical Archive: From Tamilakam to Pataliputra',
  intro: 'You are the Chief Epigraphist and Archaeological Archivist at the National Museum. A collection of newly discovered Sangam artefacts and Gupta imperial records has arrived in unclassified bundles.',
  context: 'To curate the Classical India Wing, you must decipher Tamil poetic academies, analyse megalithic burial grave goods, trace Roman monsoon trade routes, assess Gupta feudal governance, and evaluate scientific treatises by Aryabhatta and Sushrutha.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In the ancient Tamil country, was "Sangam" the name of a powerful imperial ruling dynasty?',
  options: [
    'Yes — it was a southern empire like the Mauryas ruled by Sangam kings',
    'No — it was a series of literary assemblies (academies) convened at Madurai',
    'Yes — it was the title given to the Chola capital city',
    'No — it was a Roman trade guild operating on the Malabar coast',
  ],
  correctIndex: 1,
  hintAfter: "Don't worry if you thought it was a dynasty! 'Sangam' refers to literary academies where poets gathered under Pandya patronage, while three distinct dynasties (Chera, Chola, Pandya) ruled.",
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 & CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c9_histciv_041)
  {
    id: 'ch_01_tirukkural_struct',
    nodeId: NODE_C9_HISTCIV_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How is Thiruvalluvar’s monumental didactic work, the Tirukkural, structurally organised?',
    options: [
      '3 books (Aram, Porul, Inbam), 133 chapters, 1,330 couplets',
      '4 books, 100 chapters, 1,000 verses',
      '2 books (Aham and Puram), 50 chapters, 500 poems',
      '8 anthologies, 10 idylls, 2,381 lyrics',
    ],
    correctIndex: 0,
    explanation: 'The Tirukkural contains exactly 1,330 couplets across 133 chapters in three books: Aram (virtue/duty), Porul (wealth/governance), and Inbam (love/relationships).',
    hints: [
      'Think of the triad: virtue, wealth, and love.',
      'Each chapter has exactly 10 couplets.',
      'There are 133 chapters, giving 133 × 10 = 1,330 couplets.',
    ],
    misconceptionIndex: 2,
  },
  // 2. Foundation - Drag Label (c9_histciv_041)
  {
    id: 'ch_02_megalith_labels',
    nodeId: NODE_C9_HISTCIV_041,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the megalithic grave good to what it historically proves about Sangam society.',
    dragItems: [
      { label: 'Iron Swords & Axes', targetId: 'target_iron' },
      { label: 'Carnelian Beads', targetId: 'target_beads' },
      { label: 'Carbonised Rice', targetId: 'target_rice' },
      { label: 'Black & Red Ware', targetId: 'target_pottery' },
    ],
    correctMapping: {
      target_iron: 'Iron Swords & Axes',
      target_beads: 'Carnelian Beads',
      target_rice: 'Carbonised Rice',
      target_pottery: 'Black & Red Ware',
    },
    explanation: 'Iron tools prove advanced metallurgy; carnelian beads indicate long-distance trade; carbonised rice proves settled agrarian farming; and Black & Red Ware shows a distinct ceramic tradition.',
    hints: [
      'Metals relate to smelting and weapons.',
      'Non-local semi-precious stones point to trade networks.',
      'Buried grains prove agricultural food production.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Understanding (c9_histciv_042)
  {
    id: 'ch_03_aham_puram',
    nodeId: NODE_C9_HISTCIV_042,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why can Aham (interior/love) poems spoken in a female first-person voice NOT be automatically treated as women’s personal autobiographies?',
    options: [
      'Because all Sangam literature was composed anonymously without authorship',
      'Because male poets frequently composed in a female persona as an established literary convention',
      'Because women were forbidden from reading or writing Tamil poetry',
      'Because the poems were translated from Sanskrit texts written by Buddhist monks',
    ],
    correctIndex: 1,
    explanation: 'Sangam poetic convention permitted male bards to adopt female poetic voices (Aham). Thus, female voice in the text is a literary technique, not necessarily direct biographical testimony.',
    hints: [
      'Consider the difference between a theatrical persona and actual autobiography.',
      'Many famous male poets wrote moving poems in the voice of longing women.',
      'Aham (interior emotion) was a formal genre convention, not diary writing.',
    ],
    misconceptionIndex: 3,
  },
  // 4. Foundation - Classify (c9_histciv_043)
  {
    id: 'ch_04_tinai_zones',
    nodeId: NODE_C9_HISTCIV_043,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which tinai ecological zone in ancient Tamilakam was the centre of intensive wet paddy cultivation irrigated by tanks (eri)?',
    options: ['Kurinji (Hilly tracts)', 'Mullai (Forest/Pastoral)', 'Marudam (Riverine alluvial plains)', 'Neydal (Coastal littoral)'],
    correctIndex: 2,
    explanation: 'Marudam represents the fertile riverine plains (such as the Kaveri delta) where wet paddy agriculture, tank irrigation, and major urban centres flourished.',
    hints: [
      'Think of the fertile Kaveri and Vaigai river basins.',
      'Kurinji is hills, Mullai is forest, Neydal is coast.',
      'Marudam was the agrarian heartland controlled by the Cholas and Pandyas.',
    ],
    misconceptionIndex: 4,
  },
  // 5. Foundation - Match (c9_histciv_044)
  {
    id: 'ch_05_sangam_ports',
    nodeId: NODE_C9_HISTCIV_044,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Pair the famous Sangam port of Muziris with its controlling dynasty and geographical coast:',
    options: [
      'Chera Dynasty — Malabar (Western) Coast',
      'Chola Dynasty — Coromandel (Eastern) Coast',
      'Pandya Dynasty — Gulf of Mannar Coast',
      'Gupta Dynasty — Bay of Bengal Coast',
    ],
    correctIndex: 0,
    explanation: 'Muziris (near modern Kodungallur, Kerala) was the premier Chera port on the Malabar coast, acting as the primary hub for exporting black pepper to Rome.',
    hints: [
      'Cheras ruled the western strip (Kerala & Western Ghats).',
      'Muziris received Roman ships sailing with the southwest monsoon.',
      'Puhar was Chola (east), Korkai was Pandya (south), Muziris was Chera (west).',
    ],
    misconceptionIndex: 5,
  },
  // 6. Foundation - Drag Sort (c9_histciv_046)
  {
    id: 'ch_06_gupta_chronology_sort',
    nodeId: NODE_C9_HISTCIV_046,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Arrange the four imperial Gupta rulers in exact chronological order of their reigns:',
    sortItems: [
      'Chandragupta I (Gupta Era 319 CE, Lichchhavi marriage)',
      'Samudragupta (Conquests, Ashvamedha, Veena coins)',
      'Chandragupta II Vikramaditya (Defeated Shakas, Navaratnas)',
      'Kumaragupta I (Founded Nalanda University c. 450 CE)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The imperial succession runs: Chandragupta I (319–334 CE) → Samudragupta (335–380 CE) → Chandragupta II (380–415 CE) → Kumaragupta I (415–455 CE).',
    hints: [
      'The founder of the Gupta Era comes first.',
      'The great conqueror on the Allahabad Pillar is the second ruler.',
      'The patron of Kalidasa and Sakari comes third, followed by the founder of Nalanda.',
    ],
    misconceptionIndex: 6,
  },
  // 7. Foundation - Numeric (c9_histciv_049)
  {
    id: 'ch_07_aryabhatta_pi',
    nodeId: NODE_C9_HISTCIV_049,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'To how many decimal places did Aryabhatta accurately state the approximation of π (pi as 3.1416) in the Aryabhatiya in 499 CE?',
    correctAnswer: 4,
    tolerance: 0,
    unit: 'decimal places',
    explanation: 'In Ganita-pada, Aryabhatta gave the ratio of circumference to diameter as 62832/20000 = 3.1416, which is accurate to 4 decimal places.',
    hints: [
      'Count the digits after the decimal point in 3.1416.',
      'The fraction is 62,832 divided by 20,000.',
      '3.1416 has exactly four digits after the period.',
    ],
  },
  // 8. Standard - Application (c9_histciv_041)
  {
    id: 'ch_08_archaeology_inference',
    nodeId: NODE_C9_HISTCIV_041,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An excavation team at Adichanallur unearths a burial urn containing carnelian beads and Roman pottery fragments alongside iron daggers. What historical inference is most rigorously justified?',
    options: [
      'The deceased was an Italian merchant who served as a soldier in the Pandya royal army',
      'The community participated in long-distance trans-oceanic trade networks while possessing indigenous iron technology',
      'The Sangam civilization was completely conquered and politically governed by the Roman Empire',
      'Megalithic monuments were religious temples dedicated exclusively to Mediterranean gods',
    ],
    correctIndex: 1,
    explanation: 'Carnelian is not locally native to the site and Roman pottery indicates overseas exchange, while iron tools prove established metallurgy. This confirms long-distance trade integration.',
    hints: [
      'Grave goods show material exchange and technological capabilities.',
      'Foreign trade items do not mean foreign military conquest.',
      'Megaliths are burial structures, not Roman temples.',
    ],
    misconceptionIndex: 1,
  },
  // 9. Standard - Analysis (c9_histciv_042)
  {
    id: 'ch_09_women_status_balance',
    nodeId: NODE_C9_HISTCIV_042,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How do modern historians reconcile the prominence of woman poets like Avvaiyar with references to Sati-kadimaram in the Purananuru?',
    options: [
      'By dismissing Sati-kadimaram as a modern mistranslation with no historical basis',
      'By concluding that Sangam society had female agency among elite literary figures alongside severe patriarchal restrictions like widowhood taboos',
      'By assuming that only women who immolated themselves were permitted to compose poetry',
      'By arguing that the Sangam Age was an absolute egalitarian matriarchy across all five tinai zones',
    ],
    correctIndex: 1,
    explanation: 'Sangam society presents a mixed, stratified reality: elite women enjoyed cultural voice and royal patronage (Avvaiyar, Mangaiyarkkarasi), while patriarchal constraints (sati-kadimaram, widowhood taboos) coexisted.',
    hints: [
      'Avoid extreme one-sided conclusions (neither pure matriarchy nor total suppression).',
      'Notice the class distinction between courtly poets and societal customs.',
      'Historical assessment requires balancing agency with restriction.',
    ],
    misconceptionIndex: 0,
  },
  // 10. Standard - Application (c9_histciv_043)
  {
    id: 'ch_10_velan_ulavar_stratification',
    nodeId: NODE_C9_HISTCIV_043,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In the Marudam riverine tracts, how did the socio-economic roles of the Velan and Ulavar differ?',
    options: [
      'Velan were nomadic forest hunters, while Ulavar were deep-sea fishermen',
      'Velan were landholders who managed irrigation and surplus; Ulavar were agricultural labourers working the fields',
      'Velan were foreign Roman traders; Ulavar were Buddhist monks maintaining agraharas',
      'Velan were temple priests; Ulavar were royal ministers in the Mantri Parishad',
    ],
    correctIndex: 1,
    explanation: 'The Velan-Ulavar distinction represents emerging agrarian class stratification: the Velan held/controlled land and directed cultivation, while the Ulavar provided the manual field labour.',
    hints: [
      'One group owned or directed the land; the other worked as labourers.',
      'This distinction shows agrarian hierarchy within the Marudam plain.',
      'Velan = land controller; Ulavar = field cultivator/labourer.',
    ],
    misconceptionIndex: 4,
  },
  // 11. Standard - Analysis (c9_histciv_044)
  {
    id: 'ch_11_pliny_drain_analysis',
    nodeId: NODE_C9_HISTCIV_044,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did the Roman historian Pliny the Elder lament that India was "draining Rome of its gold" in his Natural History (c. 79 CE)?',
    options: [
      'Rome was forced to pay heavy military tribute after being defeated by the Chera fleet',
      'High Roman demand for Indian luxuries (pepper, pearls, fine cotton) created a severe trade surplus in India’s favour',
      'Indian merchants purchased all Roman agricultural lands using copper coins',
      'Pirates from Muziris looted the Roman imperial treasury at Alexandria',
    ],
    correctIndex: 1,
    explanation: 'Tamilakam exported highly valued commodities (black pepper, silk, pearls) and imported Roman gold aurei and bullion, resulting in an enormous balance-of-payments deficit for Rome.',
    hints: [
      'Think of what goods left India versus what arrived from Rome.',
      'Gold coins of Augustus and Tiberius found across South India corroborate this drain.',
      'Trade balance was heavily in India’s favour.',
    ],
    misconceptionIndex: 5,
  },
  // 12. Standard - Distinguish (c9_histciv_045)
  {
    id: 'ch_12_fahien_vs_harisena',
    nodeId: NODE_C9_HISTCIV_045,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why must Harisena’s Allahabad Pillar Inscription (Prayag Prasasti) be evaluated more critically than Fa-hien’s travelogue (Fo-kwo-ki)?',
    options: [
      'Harisena wrote in Chinese while Fa-hien wrote in official Sanskrit court language',
      'Harisena was Samudragupta’s court poet whose eulogy was composed to glorify his royal patron, whereas Fa-hien was an independent pilgrim observer',
      'Fa-hien was a military commander who verified every battle casualty on site',
      'The Allahabad Pillar was fabricated in the 19th century by British archaeologists',
    ],
    correctIndex: 1,
    explanation: 'A prashasti is a royal panegyric; court poets like Harisena had a vested interest in exaggerating conquests. Fa-hien was an independent foreign Buddhist pilgrim with no political loyalty to the Gupta crown.',
    hints: [
      'Consider the author’s motives: court employee vs independent foreign visitor.',
      'A prashasti is designed to flatter and legitimise a sovereign.',
      'Historians cross-check court eulogies with numismatic and independent archaeological records.',
    ],
    misconceptionIndex: 7,
  },
  // 13. Standard - Construct (c9_histciv_047)
  {
    id: 'ch_13_admin_hierarchy_construct',
    nodeId: NODE_C9_HISTCIV_047,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Construct the correct administrative chain of the Gupta Empire from the Emperor down to the District Officer.',
    availableParts: ['Maharajadhiraja', 'Uparika (Bhukti Governor)', 'Vishayapati (Vishaya District Officer)', 'Gramika (Village Head)'],
    targetState: 'Maharajadhiraja Uparika (Bhukti Governor) Vishayapati (Vishaya District Officer) Gramika (Village Head)',
    validationHint: 'Add them in descending order: Emperor -> Provincial Governor -> District Officer -> Village Head.',
    explanation: 'The Gupta administrative ladder descended from the Maharajadhiraja (Emperor) to the Uparika (governing a Bhukti/province), to the Vishayapati (governing a Vishaya/district), to village officials.',
    hints: [
      'Start with the supreme sovereign.',
      'Bhukti is larger than Vishaya (Province > District).',
      'Village administration sits at the base.',
    ],
    misconceptionIndex: 8,
  },
  // 14. Standard - Application (c9_histciv_048)
  {
    id: 'ch_14_nalanda_curriculum',
    nodeId: NODE_C9_HISTCIV_048,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Chinese scholar arriving at Nalanda Mahavihara in the 7th century wished to study secular sciences alongside Mahayana scriptures. What subjects were available?',
    options: [
      'Only Buddhist Vinaya and ritual chanting',
      'Nyaya (Logic), Paninian Sanskrit Grammar, Medicine (Chikitsa), and Astronomy alongside Buddhist philosophy',
      'Greek naval navigation and Roman civil law only',
      'European alchemy and Islamic jurisprudence',
    ],
    correctIndex: 1,
    explanation: 'Nalanda was a multi-disciplinary residential university teaching logic (Nyaya), grammar, medicine, and astronomy alongside both Mahayana and Hinayana philosophy.',
    hints: [
      'Nalanda was not a purely theological monastery.',
      'Look for the secular sciences codified by Indian scholars.',
      'Grammar, logic, medicine, and astronomy were core disciplines.',
    ],
    misconceptionIndex: 9,
  },
  // 15. Standard - Understanding (c9_histciv_049)
  {
    id: 'ch_15_aryabhatta_axial_spin',
    nodeId: NODE_C9_HISTCIV_049,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What was Aryabhatta’s specific groundbreaking astronomical proposition regarding planetary motion in 499 CE?',
    options: [
      'The Earth revolves around the Sun in an elliptical orbit (full heliocentrism)',
      'The Earth rotates daily on its own axis, creating the optical illusion of moving stars',
      'The Sun is pulled across the heavens in a chariot driven by seven horses',
      'The planets are stationary discs attached to a crystalline sphere',
    ],
    correctIndex: 1,
    explanation: 'Aryabhatta asserted axial rotation (the Earth spins daily on its own axis). He did not formulate complete Copernican heliocentrism (orbital revolution around the Sun).',
    hints: [
      'Think of a spinning top rotating in place.',
      'Rotation on an axis explains day/night and apparent stellar drift.',
      'Do not confuse axial rotation with orbital revolution around the Sun.',
    ],
    misconceptionIndex: 10,
  },
  // 16. Standard - Classify (c9_histciv_050)
  {
    id: 'ch_16_sushrutha_techniques',
    nodeId: NODE_C9_HISTCIV_050,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which of the following surgical procedures is described in detail in the Sushrutha Samhita using a pedicle forehead skin flap?',
    options: [
      'Cataract couching with the jabamukhi salaka',
      'Rhinoplasty (nasal reconstruction)',
      'Lithotomy (bladder stone extraction)',
      'Trepanation (skull drilling)',
    ],
    correctIndex: 1,
    explanation: 'Sushrutha pioneered rhinoplasty by rotating a flap of skin from the patient’s forehead to reconstruct severed noses, a technique copied in the 1794 Madras Gazette.',
    hints: [
      'This procedure rebuilt damaged or amputated noses.',
      'British surgeons in the 18th century adopted this forehead-flap method.',
      'Cataract used a needle; rhinoplasty used a tissue flap.',
    ],
    misconceptionIndex: 11,
  },
  // 17. Advanced - Evaluation (c9_histciv_047)
  {
    id: 'ch_17_feudalism_evaluation',
    nodeId: NODE_C9_HISTCIV_047,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Historian R.S. Sharma argued that the Gupta Agrahara land-grant system contained the seeds of Indian feudalism. What structural mechanism justifies this thesis?',
    options: [
      'Grants gave state cash directly to foreign mercenary armies, causing currency inflation',
      'Transfer of fiscal, judicial, and administrative rights to local grantees created autonomous hereditary lords, eroding central imperial control',
      'Agraharas outlawed private trade and forced all merchants into state-run cooperatives',
      'Land grants required all peasants to convert to Buddhism or face banishment',
    ],
    correctIndex: 1,
    explanation: 'By granting land and accompanying tax/judicial immunities in lieu of cash salaries, local landlords evolved into hereditary feudal chiefs with private followings, fragmenting central authority.',
    hints: [
      'How does paying officials in land rather than cash alter their loyalty?',
      'Over generations, landholders become hereditary local rulers.',
      'Central authority loses direct fiscal and judicial control over the province.',
    ],
    misconceptionIndex: 8,
  },
  // 18. Advanced - Analysis (c9_histciv_045)
  {
    id: 'ch_18_fa_hien_penal_system',
    nodeId: NODE_C9_HISTCIV_045,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What does Fa-hien’s observation regarding the absence of capital punishment and the prevalence of fines reveal about Gupta governance under Chandragupta II?',
    options: [
      'The Gupta empire was completely lawless with no judicial enforcement',
      'The administration maintained public order through mild penal codes and fiscal deterrence rather than draconian corporal punishment',
      'The emperor had abdicated all state power to Buddhist monasteries',
      'Criminals were sent as indentured sailors to Roman trade ports',
    ],
    correctIndex: 1,
    explanation: 'Fa-hien recorded that criminals were fined according to the gravity of offences and repeat rebels only had their right hands cut off, indicating a humane and stable administrative apparatus.',
    hints: [
      'Contrast this with draconian legal codes in other ancient empires.',
      'The state relied on fines, restitution, and banishment.',
      'It reflects internal stability and economic prosperity.',
    ],
  },
  // 19. Advanced - Evaluation (c9_histciv_049)
  {
    id: 'ch_19_rational_eclipses',
    nodeId: NODE_C9_HISTCIV_049,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why was Aryabhatta’s eclipse theory considered a revolutionary epistemological breakthrough in Indian science?',
    options: [
      'He used astrological divination to predict royal victories in battle',
      'He replaced the mythological superstition of Rahu and Ketu swallowing celestial bodies with a geometric shadow-casting model based on light optics',
      'He claimed that eclipses were caused by underwater volcanic eruptions',
      'He proved that solar eclipses only occurred during the winter solstice',
    ],
    correctIndex: 1,
    explanation: 'Aryabhatta explained eclipses rationally: a lunar eclipse is the Earth casting its shadow on the Moon; a solar eclipse is the Moon obstructing sunlight, discarding Rahu/Ketu mythology.',
    hints: [
      'Look for the transition from supernatural myth to empirical optics.',
      'Shadows cast by opaque celestial bodies create eclipses.',
      'Rahu and Ketu were demythologised into geometric nodes.',
    ],
  },
  // 20. Advanced - Application (c9_histciv_050)
  {
    id: 'ch_20_asepsis_lister_parallel',
    nodeId: NODE_C9_HISTCIV_050,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In what way did Sushrutha’s clinical mandates anticipate Joseph Lister’s 19th-century aseptic surgical doctrine by over two millennia?',
    options: [
      'By inventing electric heart monitors and penicillin antibiotics',
      'By mandating nail trimming, rigorous hand washing, boiling/heating of iron instruments, and maintaining sterile, well-ventilated operating rooms',
      'By banning all forms of physical surgery in favour of Ayurvedic herbal drinks',
      'By requiring surgical operations to be performed exclusively outdoors under full sunlight',
    ],
    correctIndex: 1,
    explanation: 'Sushrutha insisted on strict preoperative hygiene: surgeons trimming fingernails, washing hands, fumigating rooms with neem/mustard vapours, and sterilising instruments with heat.',
    hints: [
      'Think of hygiene principles before micro-organisms were formally identified.',
      'Clean hands, trimmed nails, and heated instruments prevent post-operative sepsis.',
      'These practices mirror modern surgical asepsis.',
    ],
    misconceptionIndex: 11,
  },
  // 21. Advanced - Creativity / Policy Synthesis (c9_histciv_044)
  {
    id: 'ch_21_monsoon_trade_synthesis',
    nodeId: NODE_C9_HISTCIV_044,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'If you were a Chera harbour master at Muziris in 100 CE, which seasonal wind pattern would dictate when Roman merchant fleets arrive from the Red Sea and return to Egypt?',
    options: [
      'Arrive with the Southwest Monsoon (June–Sept); depart with the Northeast Monsoon (Nov–Feb)',
      'Arrive with the Northeast Monsoon (Nov–Feb); depart with the Southwest Monsoon (June–Sept)',
      'Sail at any random time using steam-powered engines',
      'Wait for the spring equinox tides to pull ships across the Arabian Sea',
    ],
    correctIndex: 0,
    explanation: 'Hippalus demonstrated that the Southwest monsoon (blowing northeastward) carries ships across the Arabian Sea to Malabar, while the returning Northeast monsoon blows westward toward the Red Sea.',
    hints: [
      'Southwest winds push vessels towards India’s west coast.',
      'Winter winds reverse direction and blow back towards Africa and Arabia.',
      'This predictable cycle enabled systematic trans-oceanic navigation.',
    ],
  },
  // 22. Advanced - Analysis / Historiography (c9_histciv_048)
  {
    id: 'ch_22_nalanda_impact',
    nodeId: NODE_C9_HISTCIV_048,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'When Bakhtiyar Khilji destroyed Nalanda Mahavihara in 1193 CE, what was the profound long-term consequence for the intellectual history of Asia?',
    options: [
      'It instantly caused all European universities to adopt Buddhist monastic codes',
      'It extinguished the primary institutional epicentre of higher Buddhist philosophy and secular sciences in northern India, shifting Buddhist scholarship permanently to Tibet and East Asia',
      'It led to the immediate rediscovery of Nalanda manuscripts in Rome',
      'It forced all Gupta rulers to establish universities in South India instead',
    ],
    correctIndex: 1,
    explanation: 'The burning of Nalanda’s three library complexes (Ratnasagara, Ratnodadhi, Ratnaranjaka) and dispersal of its monks severed 700 years of unbroken institutional learning in northern India.',
    hints: [
      'Consider the loss of millions of unique manuscripts.',
      'Tibetan monasteries preserved translations of works whose originals burned at Nalanda.',
      'It marked the institutional eclipse of Buddhism in its homeland.',
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

// ─── DEFAULT ENRICHMENT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C9_HISTCIV_041,
  title: 'Classical India: Sangam Age & Gupta Golden Era',
  definition:
    'A comprehensive comparative exploration of the Sangam Age in South India (Tamil academies, Tirukkural, megaliths, tinai ecology, trans-oceanic Roman commerce) and the Gupta Empire in the North (epigraphy, administration, Nalanda University, science of Aryabhatta, and surgical treatises of Sushrutha).',
  eli5: 'Discover how Tamil poets in Madurai sang of love and virtue, how Roman gold flowed into Kerala for black pepper, how Gupta kings built vast colleges like Nalanda, and how ancient doctors and astronomers worked out operations and the spinning Earth.',
  misconceptions: [
    {
      misconception: 'All Sangam women enjoyed completely egalitarian freedom with no social restrictions.',
      correction: 'Female agency was prominent among elite poets (Avvaiyar) and queens, but patriarchal constraints such as Sati-kadimaram and widowhood taboos coexisted.',
    },
    {
      misconception: 'Megaliths were ancient stone temples built for devotional worship.',
      correction: 'Megaliths are funerary burial monuments containing grave goods such as iron weapons, carnelian beads, and Black and Red Ware pottery.',
    },
    {
      misconception: 'The Tirukkural is a religious hymnbook dedicated exclusively to Hindu deities.',
      correction: 'The Tirukkural is a universal, secular didactic work divided into Aram (virtue), Porul (wealth/governance), and Inbam (love).',
    },
    {
      misconception: 'Aham love poetry is direct autobiography written exclusively by women.',
      correction: 'Aham is a formal literary genre where male bards frequently adopted female personas as a poetic convention.',
    },
    {
      misconception: 'The five Tinai zones represent rigid caste ranks in ancient Tamil society.',
      correction: 'Tinai is a geographic-ecological classification of landscape and livelihood (hills, forest, plains, coast, desert), not a birth-based caste hierarchy.',
    },
    {
      misconception: 'Sangam trade was purely local with no international contacts.',
      correction: 'Tamilakam had extensive maritime trade with the Roman Empire, Arabia, and China, confirmed by Roman gold coins of Augustus and Tiberius.',
    },
    {
      misconception: 'Chandragupta I of the Gupta dynasty was the same person as Chandragupta Maurya.',
      correction: 'Chandragupta Maurya founded the Mauryan Empire in 321 BCE with Kautilya. Chandragupta I founded the Gupta Era in 319 CE, over 600 years later.',
    },
    {
      misconception: 'The Allahabad Pillar Inscription is a completely neutral, objective historical record.',
      correction: 'It is a court prashasti (eulogy) composed by Harisena to glorify his royal patron Samudragupta and contains deliberate exaggerations.',
    },
    {
      misconception: 'Gupta administration was as centrally micro-managed as the Mauryan bureaucracy.',
      correction: 'Gupta governance was decentralised, relying on Agrahara land grants and feudatories, sowing the seeds of Indian feudalism.',
    },
    {
      misconception: 'Nalanda was solely a Buddhist monastery teaching religious dogma.',
      correction: 'Nalanda was a multi-disciplinary residential university teaching Nyaya logic, grammar, medicine, and astronomy alongside Buddhist philosophy.',
    },
    {
      misconception: 'Aryabhatta discovered complete Copernican heliocentrism (Earth orbiting the Sun).',
      correction: 'Aryabhatta proved axial rotation (Earth rotating daily on its own axis) and rational shadow-based eclipse mechanics, not full heliocentrism.',
    },
    {
      misconception: 'Sushrutha lived and wrote his Samhita during the Gupta period.',
      correction: 'The original Sushrutha lived in the pre-Buddhist era (~6th century BCE). His work was redacted and systematised by Nagarjuna in the Gupta period (~4th century CE).',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What does the term "Sangam" signify in the context of ancient Tamilakam?',
      options: ['A powerful southern imperial dynasty', 'Three successive literary assemblies in Madurai', 'A religious pilgrimage to the confluence of rivers', 'A type of megalithic stone tomb'],
      correctIndex: 1,
    },
    {
      question: 'Which book of the Tirukkural deals with ethics, duty, and righteous conduct?',
      options: ['Porul', 'Aram', 'Inbam', 'Kuruntokai'],
      correctIndex: 1,
    },
    {
      question: 'Which Roman emperors’ gold aurei have been excavated in large hoards at Muziris and Puhar?',
      options: ['Julius Caesar and Nero', 'Augustus and Tiberius', 'Trajan and Hadrian', 'Marcus Aurelius and Constantine'],
      correctIndex: 1,
    },
    {
      question: 'What administrative unit in the Gupta Empire was governed by a Vishayapati?',
      options: ['Bhukti (Province)', 'Vishaya (District)', 'Gramika (Village)', 'Rashtra (Empire)'],
      correctIndex: 1,
    },
    {
      question: 'Who founded Nalanda Mahavihara around 450 CE in modern Bihar?',
      options: ['Chandragupta II Vikramaditya', 'Kumaragupta I', 'Samudragupta', 'Harsha of Kanauj'],
      correctIndex: 1,
    },
    {
      question: 'In 499 CE, at what age did Aryabhatta compose the Aryabhatiya in Kusumapura?',
      options: ['18 years old', '23 years old', '35 years old', '50 years old'],
      correctIndex: 1,
    },
    {
      question: 'Which ancient scholar gave the Sushrutha Samhita its surviving structured Gupta-era redaction?',
      options: ['Charaka', 'Nagarjuna', 'Varahamihira', 'Dhanvantari'],
      correctIndex: 1,
    },
    {
      question: 'What did the Roman author Pliny mean by claiming India was draining Rome of gold?',
      options: ['Roman armies paid war indemnities', 'Rome had a massive trade deficit purchasing Indian luxury goods', 'Indian pirates looted Roman ports', 'Roman temples were dedicated to Indian deities'],
      correctIndex: 1,
    },
  ],
  masteryCriteria: 'Student understands Sangam literary & archaeological sources, social roles, tinai ecology, maritime trade, Gupta administration, Nalanda, and scientific breakthroughs of Aryabhatta and Sushrutha.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Three Sangam Kingdoms & Megalithic Burials',
    instruction: 'Click on each Tamil kingdom (Chera, Chola, Pandya) and the Megalithic tomb to inspect archaeological grave goods.',
    interactionType: 'click-kingdom',
    nodeId: NODE_C9_HISTCIV_041,
  },
  {
    title: 'Lab 2: The Five Tinai Ecological Zones & Kaveri Delta',
    instruction: 'Slide across the ecological gradient from mountain (Kurinji) to coast (Neydal) to observe economic livelihoods and the Velan-Ulavar division.',
    interactionType: 'slider-tinai',
    nodeId: NODE_C9_HISTCIV_043,
  },
  {
    title: 'Lab 3: The Monsoon Trade Simulator (Rome to Muziris)',
    instruction: 'Toggle the Monsoon wind season (Southwest vs Northeast) and navigate merchant ships loaded with pepper and Roman gold aurei.',
    interactionType: 'toggle-monsoon',
    nodeId: NODE_C9_HISTCIV_044,
  },
  {
    title: 'Lab 4: The Gupta Feudal Ladder & Agrahara Grants',
    instruction: 'Distribute Agrahara land grants to observe how central treasury reliance shifts into decentralised hereditary lordship.',
    interactionType: 'slider-feudal',
    nodeId: NODE_C9_HISTCIV_047,
  },
  {
    title: 'Lab 5: Aryabhatta’s Planetary Spin & Sushrutha’s Surgery',
    instruction: 'Rotate the Earth to test axial spin against Rahu-Ketu myths, then inspect Sushrutha’s jabamukhi salaka needle.',
    interactionType: 'rotate-science',
    nodeId: NODE_C9_HISTCIV_049,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Roman senators spend vast sums of gold buying Indian Malabar pepper, what happens to Rome’s treasury balance?',
    options: [
      'Rome accumulates huge gold reserves',
      'Roman gold drains into Indian ports (creating a massive Indian trade surplus)',
      'Indian merchants pay taxes to the Roman Senate',
      'Pepper prices drop to zero in Rome',
    ],
    correctIndex: 1,
    verifyInstruction: 'Set the trade volume slider to Maximum in the trade simulator to watch gold bullion transfer directly to Muziris!',
    nodeId: NODE_C9_HISTCIV_044,
  },
  {
    question: 'Predict: If an emperor pays provincial governors with revenue-bearing land instead of gold coins from the royal vault, what occurs after three generations?',
    options: [
      'The central emperor’s direct control over provinces grows stronger',
      'The governors become autonomous hereditary feudal lords, weakening central control',
      'All land turns into a Buddhist monastery',
      'Peasants revolt and elect a Roman consul',
    ],
    correctIndex: 1,
    verifyInstruction: 'Slide the Agrahara Grant slider to 100% in Lab 4 to watch provincial autonomy rise while central authority drops!',
    nodeId: NODE_C9_HISTCIV_047,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In the Tinai model, what makes Marudam (riverine plains) generate so much more surplus than Kurinji (hills) or Palai (desert)?',
    observableOptions: [
      'Marudam has gold mines on the surface',
      'Perennial river alluvium, canal networks, and tank (eri) irrigation enable intensive wet paddy double-cropping',
      'Marudam farmers refuse to pay any taxes to the Chola king',
      'Roman ships dock directly inside mountain caves',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_HISTCIV_043,
  },
  {
    question: 'Observation: When you rotate the Earth model in Lab 5, what happens to the stationary stars in the background?',
    observableOptions: [
      'The stars physically revolve at light-speed around the Earth',
      'The stars appear to move across the night sky due to the Earth’s own axial spin',
      'The demon Rahu swallows the solar disc immediately',
      'The Earth stops spinning during a lunar eclipse',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_HISTCIV_049,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Senior Historical Epigraphist: The Classical Exhibition',
  description:
    'Synthesise your knowledge of Classical India. Formulate a 4-point curatorial guide for a new gallery comparing the maritime commerce of Sangam Tamilakam with the scientific and intellectual contributions of the Gupta Golden Age.',
  steps: [
    'Curate a display case pairing Roman aurei from Muziris with a Sangam pepper basket',
    'Design an interactive exhibit explaining Thiruvalluvar’s 3 books (Aram, Porul, Inbam)',
    'Create a side-by-side diagram contrasting Mauryan centralised spies with Gupta Agrahara land grants',
    'Demonstrate Aryabhatta’s axial rotation and Sushrutha’s forehead-flap rhinoplasty',
  ],
};

// ─── MAIN REACT SIMULATION COMPONENT ───
function C9_HistoryCivicsSourcesSangamTirukkuralSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // ─── RICH INTERACTIVE STATE HOOKS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Discovery & Predict-Check State
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);
  const [selectedDiscoveryIndex, setSelectedDiscoveryIndex] = useState<number>(-1);
  const [predictionMade, setPredictionMade] = useState<boolean>(false);
  const [predictionIndex, setPredictionIndex] = useState<number>(-1);
  const [predictionVerified, setPredictionVerified] = useState<boolean>(false);
  const [observationAnswered, setObservationAnswered] = useState<boolean>(false);
  const [observationIndex, setObservationIndex] = useState<number>(-1);

  // Exploration Lab States
  const [selectedKingdom, setSelectedKingdom] = useState<'chera' | 'chola' | 'pandya' | 'megalith' | null>('chola');
  const [tinaiIndex, setTinaiIndex] = useState<number>(2); // 0: Kurinji, 1: Mullai, 2: Marudam, 3: Neydal, 4: Palai
  const [monsoonSeason, setMonsoonSeason] = useState<'southwest' | 'northeast'>('southwest');
  const [tradeVolume, setTradeVolume] = useState<number>(65); // 0 - 100%
  const [agraharaPercentage, setAgraharaPercentage] = useState<number>(40); // 0 - 100%
  const [earthRotationAngle, setEarthRotationAngle] = useState<number>(45); // 0 - 360 deg
  const [selectedSurgicalTool, setSelectedSurgicalTool] = useState<'needle' | 'scalpel' | 'forceps' | 'flap'>('flap');

  // Adaptive & SRS / BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [errors, setErrors] = useState<number>(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Per-Challenge Escalating Hints & Feedback State
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Drag & Drop / Interactive Types
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback FX
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Sandbox Free Play State
  const [sandboxEcoScore, setSandboxEcoScore] = useState<number>(50);
  const [sandboxFeudalTension, setSandboxFeudalTension] = useState<number>(30);

  // References
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineGsapRef = useRef<HTMLDivElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT EFFECT: LOAD EXISTING MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 85) setDifficulty('advanced');
      else if (existing.bestScore >= 55) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTATION EFFECT ───
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

    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── GSAP TIMELINE ANIMATION ON STEP ───
  useEffect(() => {
    if (timelineGsapRef.current) {
      gsap.fromTo(
        timelineGsapRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [currentSlide, phase]);

  // ─── 2D CANVAS ANIMATION (PLANETARY ROTATION & TRADE WAVES) ───
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

      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = monsoonSeason === 'southwest' ? 'rgba(56, 189, 248, 0.4)' : 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        const y = 20 + i * 15;
        const offset = (frame * 1.5 + i * 30) % canvas.width;
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(
          canvas.width * 0.33,
          y + Math.sin(frame * 0.05 + i) * 8,
          canvas.width * 0.66,
          y - Math.sin(frame * 0.05 + i) * 8,
          canvas.width,
          y
        );
        ctx.stroke();

        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(offset, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [monsoonSeason, currentSlide]);

  // ─── ESCALATING HINTS HANDLER ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint: ${hintMsg}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      audioManager.play('pop');
    }
  }, [hintCount, challenge]);

  // ─── AUTO-INACTIVITY TIMER HANDLER ───
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
    setSelectedDiscoveryIndex(idx);
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Superb insight! Sangam refers to literary academies in Madurai.');
    } else {
      audioManager.play('error');
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  // ─── PHASE ADVANCEMENT HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Let us manipulate history hands-on!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with sliders without any exam pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    setHintCount(0);
    setAnswerRevealed(false);
    setShowExplanation(false);
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the competency challenge assessments.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction registered! Now test it using the interactive controls.');
  }, []);

  // ─── LAB INTERACTION HANDLERS ───
  const handleKingdomSelect = useCallback((k: 'chera' | 'chola' | 'pandya' | 'megalith') => {
    setSelectedKingdom(k);
    audioManager.play('tap');
    if (k === 'chera') speechManager.speak('Chera Kingdom: West Coast, capital Vanji, famous port Muziris for black pepper.');
    if (k === 'chola') speechManager.speak('Chola Kingdom: Kaveri Delta, capital Uraiyur, famous port Puhar.');
    if (k === 'pandya') speechManager.speak('Pandya Kingdom: Madurai academies, pearl fisheries at port Korkai.');
    if (k === 'megalith') speechManager.speak('Megaliths: Large stone burial monuments with iron swords, carnelian beads, and carbonised rice.');
  }, []);

  const handleTinaiChange = useCallback((val: number) => {
    setTinaiIndex(val);
    audioManager.play('count');
  }, []);

  const handleMonsoonToggle = useCallback(() => {
    setMonsoonSeason((prev) => (prev === 'southwest' ? 'northeast' : 'southwest'));
    audioManager.play('whoosh');
  }, []);

  // ─── COMPLETION & SCORING HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Magnificent work! You completed the Classical India simulation with a score of ${finalScore} percent.`);
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───
  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setSelectedOption(null);
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
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

  // ─── MAIN ANSWER SUBMIT HANDLER ───
  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string, event?: React.MouseEvent) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        setSelectedOption(answer as number);
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

      if (event) {
        setSparklePos({ x: event.clientX, y: event.clientY });
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Brilliant! That is historically accurate.');
        setShowConfetti(true);
        setShowSparkle(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4500);
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
          speechManager.speak('Let us inspect the complete historical walkthrough.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4500);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  // ─── DRAG & SORT HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isMatch) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        let current = [...prev];
        if (current.length === 0 && challenge.sortItems) {
          current = challenge.sortItems.map((_, i) => i);
        }
        const [moved] = current.splice(fromIdx, 1);
        current.splice(toIdx, 0, moved);
        return current;
      });
    },
    [challenge]
  );

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  const calculatedAutonomy = useMemo(() => {
    return Math.round(agraharaPercentage * 0.85 + 10);
  }, [agraharaPercentage]);

  const calculatedCentralGold = useMemo(() => {
    return Math.max(0, 100 - agraharaPercentage);
  }, [agraharaPercentage]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 mb-6 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-amber-950/40 border border-amber-600/30 rounded-2xl" aria-hidden="true">🏛️</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-700/40">
                ICSE Class 9 History
              </span>
              <span className="text-xs text-slate-400">c9_histciv_041–050</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white mt-1">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation */}
        <div className="flex items-center gap-2 flex-wrap" role="navigation" aria-label="Simulation Phases">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${p} phase`}
              aria-pressed={phase === p}
              onClick={() => {
                if (p === 'discovery') setPhase('discovery');
                if (p === 'explore') setPhase('explore');
                if (p === 'sandbox') setPhase('sandbox');
                if (p === 'challenge') handleAdvanceToChallenge();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-2 ring-amber-400'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="space-y-6"
          >
            {/* Narrative Box */}
            <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-gold-950/30 rounded-2xl border border-amber-800/40 shadow-inner">
              <div className="flex items-center gap-2 text-amber-400 text-sm font-bold uppercase tracking-wide">
                <span aria-hidden="true">📜</span> Historical Scenario
              </div>
              <h2 className="text-2xl font-black text-amber-200 mt-1">{SCENARIO.title}</h2>
              <p className="text-slate-300 mt-2 text-sm leading-relaxed">{SCENARIO.intro}</p>
              <div className="mt-4 p-3 bg-slate-900/80 rounded-xl border border-slate-700/50 text-xs text-slate-300">
                <strong className="text-amber-300">Curatorial Directive:</strong> {SCENARIO.context}
              </div>
            </div>

            {/* Discovery Question Card */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider bg-gold-950/60 px-3 py-1 rounded-full border border-gold-700/30">
                  Curiosity Discovery Hook
                </span>
                <span className="text-xs text-slate-400">Low-stakes conceptual probe</span>
              </div>
              <h3 className="text-lg font-bold text-white leading-snug">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((opt, i) => {
                  const isSelected = selectedDiscoveryIndex === i;
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      onClick={() => handleDiscoveryAnswer(i)}
                      disabled={discoveryAnswered}
                      className={`p-4 rounded-xl text-left text-sm font-medium transition-all ${
                        isSelected
                          ? discoveryCorrect
                            ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-900/30'
                            : 'bg-rose-950/80 border-2 border-rose-500 text-rose-200'
                          : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/50'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-slate-400">
                          {isSelected ? (discoveryCorrect ? '✓' : '✗') : `${String.fromCharCode(65 + i)}.`}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border ${
                    discoveryCorrect ? 'bg-emerald-950/40 border-emerald-700 text-emerald-300' : 'bg-amber-950/40 border-amber-700 text-amber-300'
                  }`}
                >
                  <p className="text-sm font-semibold">{discoveryCorrect ? '✓ Exceptional Epigraphic Insight!' : '💡 Historical Clarification:'}</p>
                  <p className="text-xs mt-1 text-slate-300">
                    {discoveryCorrect
                      ? 'You recognized that "Sangam" is not a dynasty but three successive literary academies convened at Madurai under Pandya patronage where Chera, Chola, and Pandya bards met.'
                      : DISCOVERY_QUESTION.hintAfter}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Enter Interactive History Labs"
                    onClick={handleAdvanceToExploration}
                    className="mt-4 px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-600/30"
                  >
                    Enter Interactive History Labs →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                  </span>
                  <h2 className="text-xl font-black text-white mt-0.5">{EXPLORATION_STEPS[currentSlide].title}</h2>
                </div>
                <p className="text-xs md:text-sm text-amber-300 bg-amber-950/60 px-3 py-1.5 rounded-xl border border-amber-700/40 font-medium">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* LAB 1: SANGAM MAP & MEGALITHS */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 500 320" className="w-full h-auto drop-shadow-md" aria-label="Interactive Map of Ancient Tamilakam">
                      <path
                        d="M 100,40 L 380,40 C 400,90 420,160 380,240 C 340,290 280,310 250,315 C 220,310 160,280 120,220 C 90,160 85,90 100,40 Z"
                        fill="#111827"
                        stroke="#374151"
                        strokeWidth="2"
                      />

                      {/* Cheras */}
                      <path
                        d="M 120,90 C 130,140 140,200 160,250 L 120,220 C 90,160 95,110 120,90 Z"
                        fill={selectedKingdom === 'chera' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(16, 185, 129, 0.15)'}
                        stroke="#10b981"
                        strokeWidth={selectedKingdom === 'chera' ? '3' : '1'}
                        className="cursor-pointer"
                        tabIndex={0}
                        role="button"
                        aria-label="Select Chera Kingdom"
                        onClick={() => handleKingdomSelect('chera')}
                        onKeyDown={(e) => e.key === 'Enter' && handleKingdomSelect('chera')}
                      />
                      <text x="110" y="150" fill="#6ee7b7" fontSize="12" fontWeight="bold">Cheras</text>
                      <circle cx="118" cy="180" r="5" fill="#10b981" />
                      <text x="126" y="184" fill="#a7f3d0" fontSize="9">Muziris (Port)</text>

                      {/* Cholas */}
                      <path
                        d="M 230,80 C 330,80 390,140 370,190 C 320,190 260,160 230,130 Z"
                        fill={selectedKingdom === 'chola' ? 'rgba(245, 158, 11, 0.4)' : 'rgba(245, 158, 11, 0.15)'}
                        stroke="#f59e0b"
                        strokeWidth={selectedKingdom === 'chola' ? '3' : '1'}
                        className="cursor-pointer"
                        tabIndex={0}
                        role="button"
                        aria-label="Select Chola Kingdom"
                        onClick={() => handleKingdomSelect('chola')}
                        onKeyDown={(e) => e.key === 'Enter' && handleKingdomSelect('chola')}
                      />
                      <text x="280" y="120" fill="#fcd34d" fontSize="12" fontWeight="bold">Cholas</text>
                      <circle cx="365" cy="145" r="5" fill="#f59e0b" />
                      <text x="315" y="160" fill="#fde68a" fontSize="9">Puhar (Kaveripattinam)</text>

                      {/* Pandyas */}
                      <path
                        d="M 190,200 C 260,190 320,220 280,290 C 240,300 200,260 190,200 Z"
                        fill={selectedKingdom === 'pandya' ? 'rgba(139, 92, 246, 0.4)' : 'rgba(139, 92, 246, 0.15)'}
                        stroke="#8b5cf6"
                        strokeWidth={selectedKingdom === 'pandya' ? '3' : '1'}
                        className="cursor-pointer"
                        tabIndex={0}
                        role="button"
                        aria-label="Select Pandya Kingdom"
                        onClick={() => handleKingdomSelect('pandya')}
                        onKeyDown={(e) => e.key === 'Enter' && handleKingdomSelect('pandya')}
                      />
                      <text x="220" y="240" fill="#c4b5fd" fontSize="12" fontWeight="bold">Pandyas</text>
                      <circle cx="235" cy="255" r="5" fill="#8b5cf6" />
                      <text x="245" y="260" fill="#ddd6fe" fontSize="9">Madurai (Academies)</text>
                      <circle cx="270" cy="285" r="4" fill="#a78bfa" />
                      <text x="278" y="290" fill="#ddd6fe" fontSize="8">Korkai (Pearls)</text>

                      {/* Megalithic Burial Site Icon */}
                      <g
                        className="cursor-pointer"
                        tabIndex={0}
                        role="button"
                        aria-label="Select Megalith Burial Site"
                        onClick={() => handleKingdomSelect('megalith')}
                        onKeyDown={(e) => e.key === 'Enter' && handleKingdomSelect('megalith')}
                        transform="translate(190, 70)"
                      >
                        <rect
                          x="0"
                          y="0"
                          width="110"
                          height="36"
                          rx="8"
                          fill={selectedKingdom === 'megalith' ? '#b45309' : '#1f2937'}
                          stroke="#f59e0b"
                          strokeWidth="1.5"
                        />
                        <text x="55" y="16" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">
                          🪨 Megalith Burial
                        </text>
                        <text x="55" y="28" fill="#cbd5e1" fontSize="8" textAnchor="middle">
                          (Adichanallur / Paiyampalli)
                        </text>
                      </g>
                    </svg>
                  </div>

                  {/* Inspector Panel */}
                  <div className="lg:col-span-5 space-y-3 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                    <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                      <span aria-hidden="true">🔍</span> Evidence & Artifact Inspector
                    </h4>

                    {selectedKingdom === 'chera' && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-2">
                        <div className="p-3 bg-emerald-950/50 rounded-xl border border-emerald-700/50">
                          <p className="text-xs font-bold text-emerald-300">✓ Chera Realm (West Coast)</p>
                          <p className="text-xs text-slate-300 mt-1">
                            Controlled the Malabar coast and pepper-growing Western Ghats. Capital at Vanji.
                          </p>
                          <div className="mt-2 text-xs text-emerald-200">
                            <strong>Key Port:</strong> Muziris (Kodungallur) — where Roman ships arrived loaded with gold aurei to purchase black pepper.
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {selectedKingdom === 'chola' && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-2">
                        <div className="p-3 bg-amber-950/50 rounded-xl border border-amber-700/50">
                          <p className="text-xs font-bold text-amber-300">✓ Chola Realm (Kaveri Delta)</p>
                          <p className="text-xs text-slate-300 mt-1">
                            Heartland at Uraiyur and Thanjavur. Possessed the fertile Marudam wet paddy zone.
                          </p>
                          <div className="mt-2 text-xs text-amber-200">
                            <strong>Key Port:</strong> Puhar (Kaveripattinam) — celebrated in the poem Pattinappalai for bustling international wharves.
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {selectedKingdom === 'pandya' && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-2">
                        <div className="p-3 bg-purple-950/50 rounded-xl border border-purple-700/50">
                          <p className="text-xs font-bold text-purple-300">✓ Pandya Realm (Deep South)</p>
                          <p className="text-xs text-slate-300 mt-1">
                            Convened the three Sangam academies at capital Madurai. Queen Mangaiyarkkarasi patronised Jain scholars.
                          </p>
                          <div className="mt-2 text-xs text-purple-200">
                            <strong>Key Port:</strong> Korkai (Gulf of Mannar) — world-renowned for its lucrative pearl fisheries.
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {selectedKingdom === 'megalith' && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-2">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                          <p className="text-xs font-bold text-amber-300">✓ Megalithic Grave Assemblage</p>
                          <ul className="text-xs text-slate-300 mt-1.5 space-y-1">
                            <li>⚔️ <strong>Iron Swords:</strong> Proves mastery of iron smelting & weapons.</li>
                            <li>📿 <strong>Carnelian Beads:</strong> Proves long-distance trade networks.</li>
                            <li>🌾 <strong>Carbonised Rice:</strong> Proves settled agrarian rice farming.</li>
                            <li>🏺 <strong>Black & Red Ware:</strong> Distinctive megalithic ceramic tradition.</li>
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* LAB 2: THE 5 TINAI ECOLOGICAL ZONES */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-300">
                      <span>⛰️ Kurinji (Hills)</span>
                      <span>🌳 Mullai (Forest)</span>
                      <span className="text-emerald-400 font-extrabold">🌾 Marudam (Plains)</span>
                      <span>🌊 Neydal (Coast)</span>
                      <span>🏜️ Palai (Desert)</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={4}
                      step={1}
                      value={tinaiIndex}
                      aria-label="Select Tinai ecological zone"
                      onChange={(e) => handleTinaiChange(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800">
                      <h4 className="text-lg font-bold text-amber-400">
                        {tinaiIndex === 0 && '⛰️ Kurinji — Mountainous Tracts (Western Ghats)'}
                        {tinaiIndex === 1 && '🌳 Mullai — Pastoral & Woodland Belt'}
                        {tinaiIndex === 2 && '🌾 Marudam — Riverine Alluvial Plains (Kaveri Delta)'}
                        {tinaiIndex === 3 && '🌊 Neydal — Coastal Littoral Strip'}
                        {tinaiIndex === 4 && '🏜️ Palai — Arid & Dry Interior'}
                      </h4>
                      <p className="text-xs text-slate-300 mt-2">
                        {tinaiIndex === 0 && 'Primary Livelihood: Hunting, honey gathering, and wild black pepper harvesting.'}
                        {tinaiIndex === 1 && 'Primary Livelihood: Cattle rearing, pastoral herding, and dairy production.'}
                        {tinaiIndex === 2 && 'Primary Livelihood: Intensive wet paddy agriculture irrigated by tanks (eri) and Kaveri canals.'}
                        {tinaiIndex === 3 && 'Primary Livelihood: Marine fishing, boat building, and coastal solar salt pans.'}
                        {tinaiIndex === 4 && 'Primary Livelihood: Foraging, oasis pastoralism, and travelling caravan protection.'}
                      </p>

                      <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-700 text-xs text-amber-200">
                        <strong>Critical ICSE Rule:</strong> Tinai is an <em>ecological-geographic</em> classification of landscapes, NOT a birth-based caste hierarchy!
                      </div>
                    </div>

                    <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800">
                      <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                        Marudam Agrarian Class Division
                      </h4>
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-700/40">
                          <p className="text-xs font-bold text-emerald-300">👑 Velan (Land Controller)</p>
                          <p className="text-xs text-slate-300 mt-1">
                            Owned/controlled the paddy lands, managed the village tank (eri), and appropriated the harvest surplus.
                          </p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                          <p className="text-xs font-bold text-amber-300">🧑‍🌾 Ulavar (Field Labourer)</p>
                          <p className="text-xs text-slate-300 mt-1">
                            Performed physical labour of ploughing, transplanting seedlings, and harvesting under Velan direction.
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-3 italic">
                        This division demonstrates emerging agrarian class stratification in the fertile Kaveri basin.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 3: MONSOON TRADE & ROMAN GOLD DRAIN */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/60 rounded-2xl border border-gold-700/50">
                      <p className="text-xs font-bold uppercase tracking-wider text-gold-300">Prediction Challenge</p>
                      <h4 className="text-sm font-bold text-white mt-1">{PREDICTION_QUESTIONS[0].question}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            aria-label={`Predict option ${i + 1}: ${opt}`}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-left text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-8 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-gold-400">
                          Current Wind: {monsoonSeason === 'southwest' ? 'Southwest Monsoon (Summer ➡️ Malabar)' : 'Northeast Monsoon (Winter ⬅️ Arabia)'}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Toggle Monsoon Wind Direction"
                          onClick={handleMonsoonToggle}
                          className="px-3 py-1 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-bold"
                        >
                          Toggle Monsoon Season 🔄
                        </motion.button>
                      </div>

                      <canvas ref={canvasRef} width={450} height={100} className="w-full rounded-xl border border-slate-800 mb-3" />

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Roman Luxury Pepper Demand:</span>
                          <span className="font-bold text-amber-400">{tradeVolume}% (High Volume)</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          value={tradeVolume}
                          aria-label="Set Roman Luxury Pepper Demand Volume"
                          onChange={(e) => setTradeVolume(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="lg:col-span-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Trans-Oceanic Balance Sheet
                      </h4>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="text-xs text-slate-400">Indian Exports:</p>
                        <p className="text-xs font-bold text-emerald-400">✓ Black Pepper ("Black Gold"), Pearls, Fine Cotton</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="text-xs text-slate-400">Roman Bullion Inflow:</p>
                        <div className="h-2 bg-slate-800 rounded-full mt-1 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full"
                            animate={{ width: `${tradeVolume}%` }}
                          />
                        </div>
                        <p className="text-xs text-amber-300 mt-1 font-semibold">
                          Gold Aurei of Augustus & Tiberius
                        </p>
                      </div>
                      {/* Live trade arithmetic (Periplus of the Erythraean Sea + Pliny) */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-slate-950 rounded-lg p-2 border border-slate-800 text-center">
                          <p className="text-[10px] text-slate-500">Ships sailing to Muziris</p>
                          <p className="font-mono font-bold text-gold-300">{Math.round((tradeVolume / 100) * 120)} ships/yr</p>
                        </div>
                        <div className="bg-slate-950 rounded-lg p-2 border border-slate-800 text-center">
                          <p className="text-[10px] text-slate-500">Rome's gold drain</p>
                          <p className="font-mono font-bold text-amber-300">{((tradeVolume / 100) * 50).toFixed(0)}M sesterces/yr</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Misconception killer: we know this trade from SOURCES, not legend — the Periplus logs 120 ships,
                        and the Muziris Papyrus prices ONE cargo contract at 7 million sesterces. Drag demand to 10%: the
                        numbers shrink but the sources still prove the route existed.
                      </p>
                      <button
                        onClick={() => setTradeVolume(65)}
                        aria-label="Reset Roman trade demand"
                        className="text-[10px] px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 self-start"
                      >
                        ↺ Reset demand (65%)
                      </button>
                      <p className="text-xs text-slate-400 italic">
                        Pliny the Elder (79 CE): "Not a year passes in which India does not drain Rome of fifty million sesterces!"
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 4: GUPTA FEUDALISM & AGRAHARA LAND GRANTS */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                      <h4 className="text-sm font-bold text-amber-300">
                        Agrahara Land Grant Allocation
                      </h4>
                      <p className="text-xs text-slate-300">
                        The Guptas compensated officials and Brahmins with tax-free revenue land instead of central cash salaries.
                      </p>
                      <div className="space-y-1 pt-2">
                        <div className="flex justify-between text-xs text-slate-300 font-medium">
                          <span>Revenue Land Granted:</span>
                          <span className="font-bold text-amber-400">{agraharaPercentage}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={90}
                          value={agraharaPercentage}
                          aria-label="Set Agrahara Revenue Land Granted Percentage"
                          onChange={(e) => setAgraharaPercentage(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-xs text-slate-400">Local Feudal Autonomy</span>
                          <p className="text-xl font-black text-rose-400 mt-1">{calculatedAutonomy}%</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-xs text-slate-400">Central Vault Reserves</span>
                          <p className="text-xl font-black text-emerald-400 mt-1">{calculatedCentralGold}%</p>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Administrative Devolution Ladder
                      </h4>
                      <div className="space-y-2">
                        <div className="p-2.5 bg-amber-950/60 rounded-xl border border-amber-600/40 text-xs flex justify-between items-center">
                          <span className="font-bold text-amber-200">👑 Maharajadhiraja (King of Kings)</span>
                          <span className="text-slate-400">Imperial Summit</span>
                        </div>
                        <div className="p-2.5 bg-gold-950/60 rounded-xl border border-gold-600/40 text-xs flex justify-between items-center ml-4">
                          <span className="font-bold text-gold-200">🚩 Uparika — Bhukti (Province)</span>
                          <span className="text-slate-400">e.g. Pundravardhana</span>
                        </div>
                        <div className="p-2.5 bg-purple-950/60 rounded-xl border border-purple-600/40 text-xs flex justify-between items-center ml-8">
                          <span className="font-bold text-purple-200">🏛️ Vishayapati — Vishaya (District)</span>
                          <span className="text-slate-400">Aided by Nagara Shreshthin</span>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-700 text-xs flex justify-between items-center ml-12">
                          <span className="font-bold text-slate-300">🌾 Hereditary Local Lords</span>
                          <span className="text-rose-400 font-semibold">Seeds of Feudalism</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 5: ARYABHATTA & SUSHRUTHA */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-gold-400">
                        🔭 Aryabhatta: Axial Spin & Rational Eclipses (499 CE)
                      </h4>
                      <span className="text-xs text-slate-400">Age 23 in Kusumapura</span>
                    </div>

                    <div className="flex justify-center p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 200 120" className="w-48 h-auto" aria-label="Diagram of Earth rotating on its axis">
                        <circle cx="100" cy="60" r="35" fill="#1e3a8a" stroke="#38bdf8" strokeWidth="2" />
                        <line
                          x1="100"
                          y1="15"
                          x2="100"
                          y2="105"
                          stroke="#f59e0b"
                          strokeWidth="2"
                          strokeDasharray="4"
                          transform={`rotate(${earthRotationAngle}, 100, 60)`}
                        />
                        <circle cx="100" cy="60" r="3" fill="#fbbf24" />
                      </svg>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Rotate Axial Angle:</span>
                        <span className="font-bold text-gold-300">{earthRotationAngle}°</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={360}
                        value={earthRotationAngle}
                        aria-label="Rotate Earth axial angle in degrees"
                        onChange={(e) => setEarthRotationAngle(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>

                    <p className="text-xs text-slate-300">
                      <strong>Breakthrough:</strong> The Earth rotates on its own axis, creating apparent star movement. Eclipses are caused by planetary shadows, NOT the mythical demon Rahu!
                    </p>
                  </div>

                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-emerald-400">
                        🩺 Sushrutha: Surgical Pioneers (Redacted by Nagarjuna)
                      </h4>
                      <span className="text-xs text-slate-400">120+ Instruments</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label="Inspect Rhinoplasty Forehead Flap technique"
                        onClick={() => setSelectedSurgicalTool('flap')}
                        className={`p-2.5 rounded-xl text-left text-xs font-semibold ${
                          selectedSurgicalTool === 'flap'
                            ? 'bg-emerald-950 border-2 border-emerald-500 text-emerald-200'
                            : 'bg-slate-900 border border-slate-800 text-slate-400'
                        }`}
                      >
                        👃 Rhinoplasty (Forehead Flap)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label="Inspect Jabamukhi Salaka Cataract Needle"
                        onClick={() => setSelectedSurgicalTool('needle')}
                        className={`p-2.5 rounded-xl text-left text-xs font-semibold ${
                          selectedSurgicalTool === 'needle'
                            ? 'bg-emerald-950 border-2 border-emerald-500 text-emerald-200'
                            : 'bg-slate-900 border border-slate-800 text-slate-400'
                        }`}
                      >
                        👁️ Jabamukhi Salaka (Cataract)
                      </motion.button>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                      {selectedSurgicalTool === 'flap' && (
                        <p>
                          <strong>Forehead Flap Rhinoplasty:</strong> Cut a pedicle skin flap from the forehead, rotate it over the nasal framework, and graft onto the severed nose. Documented by British surgeons in the 1794 Madras Gazette!
                        </p>
                      )}
                      {selectedSurgicalTool === 'needle' && (
                        <p>
                          <strong>Cataract Couching:</strong> Used the curved jabamukhi salaka needle to gently push the opaque, clouded lens away from the visual axis to restore light transmission.
                        </p>
                      )}
                      <p className="text-amber-300 pt-1">
                        <strong>Asepsis Mandate:</strong> Surgeons had to trim nails, wash hands, and sterilise tools with heat — anticipating Joseph Lister by 2,000 years!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Go to Previous Lab Step"
                  onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
                >
                  ← Previous Lab
                </motion.button>
                <span className="text-xs text-slate-400 font-semibold">
                  Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Go to Next Lab Step"
                    onClick={() => setCurrentSlide((s) => s + 1)}
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Enter Free Sandbox Mode"
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                  >
                    Enter Free Sandbox Mode →
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-700/30">
                  Ungraded Sandbox Simulator
                </span>
                <h2 className="text-xl font-black text-white mt-1">Free Classical India Laboratory</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Advance to Competency Challenges"
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-amber-600/30"
              >
                Ready for Competency Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-emerald-400">1. Kaveri Delta Irrigation Surge</span>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Tank (Eri) Water Level:</span>
                    <span className="font-bold text-emerald-400">{sandboxEcoScore}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={sandboxEcoScore}
                    aria-label="Set Tank Water Level Percentage in Sandbox"
                    onChange={(e) => setSandboxEcoScore(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-slate-400">
                  Surplus paddy feeds Uraiyur and exports cotton & pepper to Roman merchant galleys.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-rose-400">2. Gupta Agrahara Devolution</span>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Hereditary Lord Autonomy:</span>
                    <span className="font-bold text-rose-400">{sandboxFeudalTension}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sandboxFeudalTension}
                    aria-label="Set Hereditary Lord Autonomy Percentage in Sandbox"
                    onChange={(e) => setSandboxFeudalTension(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-slate-400">
                  Higher land grants decentralise royal control, paving the path towards medieval fragmentation.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-gold-400">3. Multi-Representation Sync</span>
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="text-amber-300 font-semibold">Tirukkural Triad:</div>
                  <div className="text-slate-300">Aram (Virtue) • Porul (Wealth) • Inbam (Love)</div>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="text-gold-300 font-semibold">Aryabhatiya 499 CE:</div>
                  <div className="text-slate-300">π ≈ 3.1416 • Year = 365.358 days • Axial Spin</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: COMPETENCY CHALLENGES ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-white">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider border ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950/80 text-emerald-400 border-emerald-600/50'
                      : difficulty === 'standard'
                      ? 'bg-gold-950/80 text-gold-400 border-gold-600/50'
                      : 'bg-purple-950/80 text-purple-400 border-purple-600/50'
                  }`}
                >
                  {difficulty} TIER
                </motion.span>
                <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-0.5 rounded-full font-medium">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>

              <div className="w-full sm:w-48 h-2 bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <div
              className={`p-6 bg-slate-900 rounded-3xl border transition-all duration-300 ${
                wrongFlash
                  ? 'bg-rose-950/40 border-rose-500 shadow-xl shadow-rose-950/50'
                  : 'border-slate-800 shadow-xl'
              }`}
            >
              <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed">{challenge.question}</h3>

              {/* 1. MCQ OPTIONS */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
                challenge.options && (
                  <div className="grid grid-cols-1 gap-3 mt-5">
                    {challenge.options.map((opt, i) => {
                      const isSelected = selectedOption === i;
                      const isCorrectAnswer = i === challenge.correctIndex;
                      return (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                          transition={wrongShake ? { duration: 0.4 } : {}}
                          aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                          onClick={(e) => handleAnswer(i, e)}
                          disabled={answerRevealed || showExplanation}
                          className={`p-4 rounded-2xl text-left text-sm font-medium transition-all ${
                            showExplanation && isCorrectAnswer
                              ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-900/40'
                              : isSelected && !showExplanation
                              ? 'bg-amber-950/80 border-2 border-amber-500 text-amber-200'
                              : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="font-bold text-slate-400">
                              {showExplanation
                                ? isCorrectAnswer
                                  ? '✓'
                                  : isSelected
                                  ? '✗'
                                  : `${String.fromCharCode(65 + i)}.`
                                : `${String.fromCharCode(65 + i)}.`}
                            </span>
                            <span>{opt}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                )}

              {/* 2. DRAG & DROP LABELS */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="mt-5 space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800" role="group" aria-label="Draggable grave good items">
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        role="button"
                        tabIndex={0}
                        aria-label={`Drag item: ${item.label}`}
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold cursor-grab active:cursor-grabbing shadow-md shadow-amber-600/30"
                      >
                        ✋ {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'target_iron', desc: 'Proves indigenous iron smelting & weapon technology' },
                      { id: 'target_beads', desc: 'Proves non-local semi-precious stone trade networks' },
                      { id: 'target_rice', desc: 'Proves settled wetland paddy agriculture (Paiyampalli)' },
                      { id: 'target_pottery', desc: 'Proves distinctive megalithic ceramic style' },
                    ].map((target) => (
                      <div
                        key={target.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(target.id)}
                        role="region"
                        aria-label={`Drop target for ${target.desc}`}
                        className={`p-4 rounded-2xl border-2 border-dashed transition-all ${
                          droppedLabels[target.id]
                            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                            : 'bg-slate-950/80 border-slate-700 text-slate-400'
                        }`}
                      >
                        <p className="text-xs text-slate-400">{target.desc}</p>
                        <div className="mt-2 text-sm font-bold text-amber-300">
                          {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : '📥 Drop matching grave good here'}
                        </div>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Validate Grave Good Mapping"
                    onClick={(e) => handleAnswer(droppedLabels, e)}
                    disabled={showExplanation || Object.keys(droppedLabels).length < 4}
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white rounded-xl font-bold text-xs"
                  >
                    Validate Grave Good Mapping
                  </motion.button>
                </div>
              )}

              {/* 3. DRAG SORT */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="mt-5 space-y-3">
                  <p className="text-xs text-slate-400">Click & reorder the items from 1st to 4th:</p>
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Reorderable item ${displayIdx + 1}: ${item}`}
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-xs font-semibold text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-600/30 text-amber-300 flex items-center justify-center font-bold">
                          {displayIdx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                      <span className="text-slate-500 text-xs">↕️ drag</span>
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Check Chronological Order"
                    onClick={(e) => {
                      const answer =
                        sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                      handleAnswer(answer, e);
                    }}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-xs"
                  >
                    Check Chronological Order
                  </motion.button>
                </div>
              )}

              {/* 4. NUMERIC INPUT */}
              {challenge.type === 'numeric' && (
                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-3 max-w-xs">
                    <input
                      type="number"
                      value={numericInput}
                      aria-label="Numeric answer input"
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter value"
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <span className="text-xs text-slate-400 font-semibold">{challenge.unit}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Verify Numeric Answer"
                    onClick={(e) => handleAnswer(numericInput, e)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white rounded-xl font-bold text-xs"
                  >
                    Verify Numeric Answer
                  </motion.button>
                </div>
              )}

              {/* 5. CONSTRUCT CHALLENGE */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="mt-5 space-y-4">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Add part: ${part}`}
                        onClick={() => setConstructParts((prev) => [...prev, part])}
                        className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-xl text-xs font-bold"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="min-h-[70px] p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <div
                        key={i}
                        className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-amber-300 flex items-center gap-2"
                      >
                        <span>{i + 1}. {part}</span>
                        <button
                          aria-label={`Remove part: ${part}`}
                          onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                          className="text-rose-400 hover:text-rose-300 font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500">Click blocks above in hierarchical order...</span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Verify Administrative Chain"
                    onClick={(e) => handleAnswer(constructParts.join(' '), e)}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white rounded-xl font-bold text-xs"
                  >
                    Verify Administrative Chain
                  </motion.button>
                </div>
              )}

              {/* Step-by-Step Progressive Disclosure */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 rounded-2xl border border-amber-700/60 space-y-4 shadow-inner"
                >
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <span aria-hidden="true">📖</span> Step-by-Step Historical Analysis
                  </h4>

                  <div className="space-y-2">
                    {challenge.explanation
                      .split('. ')
                      .filter((s) => s.trim().length > 0)
                      .slice(0, revealedSteps + 1)
                      .map((sentence, i) => (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-xs md:text-sm text-slate-200 leading-relaxed"
                        >
                          <strong className="text-amber-300">Step {i + 1}:</strong> {sentence}
                          {!sentence.endsWith('.') && '.'}
                        </motion.p>
                      ))}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        aria-label="Show next step of explanation"
                        onClick={() => setRevealedSteps((s) => s + 1)}
                        className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                      >
                        Show Next Step →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finish & Curate Gallery' : 'Next Challenge'}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finish & Curate Gallery →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION & MASTERY SUMMARY ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-8 bg-gradient-to-br from-amber-950/60 via-slate-900 to-gold-950/60 rounded-3xl border border-amber-600/50 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-950/80 px-3 py-1 rounded-full border border-amber-700/40">
                    Exhibition Ready
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-white mt-2">
                    Mastery Portfolio: Classical India
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Final Evaluated Score</span>
                  <p className="text-4xl font-black text-amber-300">{Math.max(0, 100 - errors * 5)}%</p>
                </div>
              </div>

              {/* Personalised Motivational Feedback */}
              <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800">
                <p className="text-base font-bold text-amber-200">
                  {errors === 0 && '🏆 PERFECT SCORE! You possess flawless epigraphic and historical mastery of the Sangam and Gupta Ages!'}
                  {errors >= 1 && errors <= 3 && '🌟 Great work! Your understanding of Classical India is solid, rigorous, and exam-ready.'}
                  {errors >= 4 && errors <= 7 && '📚 Good effort! Review the targeted misconception profiles below to polish your precision.'}
                  {errors >= 8 && '💪 Do not give up — You WILL get this! Revisit the interactive labs and try again!'}
                </p>
              </div>

              {/* Misconception Review Profile */}
              {hitMisconceptions.length > 0 && (
                <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
                  <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                    <span aria-hidden="true">⚠️</span> Identified Misconception Profile & Corrections
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {hitMisconceptions.map((idx) => {
                      const m = misconceptions[idx];
                      if (!m) return null;
                      return (
                        <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                          <p className="text-rose-400 font-bold">✗ {m.misconception}</p>
                          <p className="text-emerald-300 mt-1">✓ {m.correction}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Spaced Repetition Schedule Banner (SRS Visibility) */}
              <div className="p-5 bg-gradient-to-r from-gold-950/80 to-purple-950/80 rounded-2xl border-2 border-gold-500/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs shadow-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base" aria-hidden="true">📅</span>
                    <span className="font-extrabold text-sm text-gold-200 uppercase tracking-wide">
                      Spaced Repetition Schedule (SM-2 Neural Recall)
                    </span>
                  </div>
                  <p className="text-slate-200 text-sm">
                    Next recommended session:{' '}
                    <span className="font-extrabold text-amber-300 text-base underline decoration-amber-500 underline-offset-2">
                      {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
                    </span>{' '}
                    to lock in historical epigraphy and ICSE source analysis.
                  </p>
                  <p className="text-xs text-gold-300/80 italic">
                    {errors === 0
                      ? 'Optimal retention interval for 0 errors: review in 7 days.'
                      : errors <= 3
                      ? 'Moderate interval for minor errors: review in 3 days.'
                      : 'High-priority interval for review: review in 1 day.'}
                  </p>
                </div>
                <div className="flex flex-col items-center sm:items-end gap-1 shrink-0">
                  <span className="px-3.5 py-1.5 bg-gold-600/40 text-gold-200 font-black rounded-xl border border-gold-400/40 text-xs shadow-inner">
                    {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    SM-2 Engine Active
                  </span>
                </div>
              </div>

              {/* Capstone Activity */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-amber-300">{REAL_WORLD_ACTIVITY.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                    <div key={i} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                      <strong className="text-amber-400">Step {i + 1}:</strong> {step}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Restart Full Simulation"
                  onClick={() => {
                    setPhase('discovery');
                    setCurrentChallenge(0);
                    setErrors(0);
                    setHitMisconceptions([]);
                  }}
                  className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl font-bold text-sm shadow-xl shadow-amber-600/40"
                >
                  Restart Full Simulation 🔄
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── CONDITIONAL SIM-ENGINE FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Classical India Mastery Certified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_HistoryCivicsSourcesSangamTirukkuralSim;
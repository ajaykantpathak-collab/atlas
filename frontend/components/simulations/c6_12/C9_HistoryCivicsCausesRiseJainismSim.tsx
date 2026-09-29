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
const NODE_C9_HISTCIV_031 = 'c9_histciv_031';
const NODE_C9_HISTCIV_032 = 'c9_histciv_032';
const NODE_C9_HISTCIV_033 = 'c9_histciv_033';
const NODE_C9_HISTCIV_034 = 'c9_histciv_034';
const NODE_C9_HISTCIV_035 = 'c9_histciv_035';
const NODE_C9_HISTCIV_036 = 'c9_histciv_036';
const NODE_C9_HISTCIV_037 = 'c9_histciv_037';
const NODE_C9_HISTCIV_038 = 'c9_histciv_038';
const NODE_C9_HISTCIV_039 = 'c9_histciv_039';
const NODE_C9_HISTCIV_040 = 'c9_histciv_040';

const ALL_NODE_IDS = [
  NODE_C9_HISTCIV_031,
  NODE_C9_HISTCIV_032,
  NODE_C9_HISTCIV_033,
  NODE_C9_HISTCIV_034,
  NODE_C9_HISTCIV_035,
  NODE_C9_HISTCIV_036,
  NODE_C9_HISTCIV_037,
  NODE_C9_HISTCIV_038,
  NODE_C9_HISTCIV_039,
  NODE_C9_HISTCIV_040,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Gangetic Transformation & The Imperial Crown',
  intro: 'The year is 530 BCE in the flourishing Gangetic Plains. Farmers are losing indispensable plough oxen to costly sacrificial fires, wealthy Vaishya guild-merchants are marginalized by hereditary caste lines, and sacred Sanskrit excludes everyday folk. Across Magadha, revolutionary sages and mighty Mauryan emperors will reshape civilization.',
  context: 'As the Chief Archival Historian of Pataliputra, you must investigate the 5 converging causes for the rise of Jainism and Buddhism, evaluate core doctrines, decode Mauryan statecraft, test Ashoka’s Dhamma policies, and examine imperial stone architecture.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In the 6th Century BCE Gangetic Plains, what was the most direct economic clash between Vedic ritual practice and expanding agriculture?',
  options: [
    'Priests banned iron ploughshares from clearing forests',
    'Grand Vedic sacrifices slaughtered hundreds of draft cattle needed for ploughing',
    'Farmers refused to pay taxes to the king of Magadha',
    'Merchants were forbidden from buying gold and copper coins',
  ],
  correctIndex: 1,
  hintAfter: 'Oxen were the engines of Gangetic agriculture! Slaughtering them on altars threatened the entire food supply and agrarian wealth.',
};

// ─── PREDICTION QUESTIONS (Predict-then-Check Pattern) ───
export interface PredictionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  explanation: string;
}

export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If the Mauryan Empire shifts imperial policy from military conquest (Bheri Ghosha) to moral governance (Dhamma Ghosha), what will happen to provincial cohesion and soft power?',
    options: [
      'Provincial revolts will immediately destroy the empire because of complete military surrender',
      'Civic cohesion and moral prestige surge across Asia without completely disbanding standing border security',
      'Imperial agricultural revenues collapse to zero due to lack of forced labour',
      'Foreign Hellenistic kings will instantly conquer Pataliputra',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Dhamma Policy Slider in Lab 4 and observe how Soft Power increases to 85%+ while civic order stabilizes.',
    explanation: 'Ashoka replaced aggressive war drum territorial expansion with moral statecraft (Dhamma Ghosha), forging lasting multi-regional unity and diplomatic influence.',
  },
  {
    id: 'pred_2',
    question: 'If imperial tax collectors raise the agricultural land tax (Bhaga) far above the standard 1/6th rate (e.g. to 35%), what consequence is predicted for Gangetic agrarian stability?',
    options: [
      'Farmers will double their grain output willingly to please the royal court',
      'Severe rural discontent and peasant distress will trigger economic breakdown despite short-term vault gains',
      'Iron ploughs will become free for all farming villages',
      'Priests will immediately abolish all animal sacrifices',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Bhaga Land Tax slider in Lab 3 to high values and observe treasury rise alongside agrarian pressure.',
    explanation: 'Kautilya’s Arthashastra mandated the traditional 1/6th rate (approx 16.7%) to sustain imperial treasuries without destroying farming livelihoods.',
  },
];

// ─── OBSERVATION QUESTIONS (What do you notice? Pattern) ───
export interface ObservationQuestion {
  id: string;
  question: string;
  options: string[];
  observableOptions: string[];
  correctIndex: number;
  explanation: string;
}

export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'Observing the 5-Arrow Convergence model in Lab 1, what dynamic links draft cattle to the agrarian revolution?',
    options: [
      'Cattle were purely ceremonial and had no role in ploughing Gangetic alluvium',
      'Draft oxen were indispensable for heavy iron-plough agriculture, making sacrificial slaughter a direct economic threat',
      'Cattle were exclusively traded with Hellenistic Greek merchants for silver coins',
      'Only horses were used in Gangetic rice cultivation',
    ],
    observableOptions: [
      'Cattle were purely ceremonial and had no role in ploughing Gangetic alluvium',
      'Draft oxen were indispensable for heavy iron-plough agriculture, making sacrificial slaughter a direct economic threat',
      'Cattle were exclusively traded with Hellenistic Greek merchants for silver coins',
      'Only horses were used in Gangetic rice cultivation',
    ],
    correctIndex: 1,
    explanation: 'The economic pressure arrow demonstrates that protecting cattle was essential to preserving agricultural wealth in the 6th Century BCE.',
  },
  {
    id: 'obs_2',
    question: 'Observing the Sanchi Stupa architectural cross-section in Lab 5, what structural feature crowns the top apex above the harmika balcony?',
    options: [
      'A life-sized bronze idol of the emperor',
      'A triple-tiered parasol (Chhatra) mounted on the central vertical mast',
      'A hollow Vedic sacrificial altar',
      'A ceremonial stone gateway (Torana)',
    ],
    observableOptions: [
      'A life-sized bronze idol of the emperor',
      'A triple-tiered parasol (Chhatra) mounted on the central vertical mast',
      'A hollow Vedic sacrificial altar',
      'A ceremonial stone gateway (Torana)',
    ],
    correctIndex: 1,
    explanation: 'The Chhatra (triple parasol) tops the harmika railing above the anda dome, symbolizing the Three Jewels (Triratna) and spiritual sovereignty.',
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c9_histciv_031)
  {
    id: 'ch_01',
    nodeId: NODE_C9_HISTCIV_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why did the founders of Jainism and Buddhism preach in Prakrit and Pali rather than Sanskrit?',
    options: [
      'Sanskrit was forbidden by the kings of Magadha and Kosala',
      'Prakrit and Pali were the everyday vernacular spoken by ordinary farmers and traders, democratising access to spiritual truths',
      'Prakrit was the only written script known in the 6th Century BCE',
      'Priests forced Mahavira and Gautama Buddha into exile',
    ],
    correctIndex: 1,
    explanation: 'Sanskrit was monopolised by the priestly elite. Preaching in Prakrit (used by Mahavira) and Pali (used by the Buddha) broke this monopoly and allowed everyone to understand spiritual teachings directly.',
    hints: [
      'Consider who spoke Sanskrit versus who spoke Prakrit and Pali.',
      'Think about how language choice helps or excludes common people.',
      'Vernacular languages made teachings accessible to farmers, artisans, and merchants without priestly intermediaries.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag Label: Stupa Architecture (c9_histciv_040)
  {
    id: 'ch_02',
    nodeId: NODE_C9_HISTCIV_040,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Correctly identify the architectural components of the Great Stupa at Sanchi by matching each label to its structural tier.',
    dragItems: [
      { label: 'Chhatra (Triple Parasol)', targetId: 'part_top' },
      { label: 'Harmika (Square Balcony Railing)', targetId: 'part_middle' },
      { label: 'Anda (Hemispherical Dome)', targetId: 'part_dome' },
      { label: 'Torana (Ceremonial Gateway)', targetId: 'part_gate' },
    ],
    correctMapping: {
      part_top: 'Chhatra (Triple Parasol)',
      part_middle: 'Harmika (Square Balcony Railing)',
      part_dome: 'Anda (Hemispherical Dome)',
      part_gate: 'Torana (Ceremonial Gateway)',
    },
    explanation: 'The Stupa stack starts with the anda (solid relic dome), crowned by the harmika (square railing representing the sacred abode), surmounted by the chhatra (three-tiered umbrella of spiritual rank), flanked by four cardinal toranas.',
    hints: [
      'The umbrella/parasol sits at the very highest apex of the vertical axis.',
      'The square balcony-like railing sits directly above the dome, below the umbrella.',
      'The giant hemispherical mound is the anda; the sculpted entry gates are toranas.',
    ],
    misconceptionIndex: 4,
  },
  // 3. Foundation - Numeric (c9_histciv_037)
  {
    id: 'ch_03',
    nodeId: NODE_C9_HISTCIV_037,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to Kautilya\'s Arthashastra, the primary agricultural land tax known as "bhaga" was fixed at what fraction of total harvest yield? (Enter percentage equivalent to 1/6th rounded to nearest whole integer)',
    correctAnswer: 17,
    tolerance: 1,
    unit: '% (approx. 1/6th)',
    explanation: 'The standard land tax "bhaga" collected by the Samaharta was set at 1/6th of total agricultural produce (approximately 16.67% ~ 17%).',
    hints: [
      'Recall the traditional ancient Indian tax fraction "Shadbhaga".',
      'The fraction is 1 divided by 6.',
      '1/6 is approximately 16.67%, so enter 17.',
    ],
  },
  // 4. Foundation - Drag Sort: Mauryan Chronology (c9_histciv_036)
  {
    id: 'ch_04',
    nodeId: NODE_C9_HISTCIV_036,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Arrange the Mauryan emperors in correct chronological order of succession.',
    sortItems: [
      'Chandragupta Maurya (Founder, c. 321–297 BCE)',
      'Bindusara (Amitraghata / Deccan Expansion, c. 297–273 BCE)',
      'Ashoka the Great (Kalinga War & Dhamma, c. 269–232 BCE)',
      'Brihadratha (Last ruler, assassinated by Pushyamitra Shunga c. 185 BCE)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The dynasty was founded by Chandragupta Maurya (321 BCE), succeeded by his son Bindusara (297 BCE), then Ashoka (269 BCE after succession struggle), ending with Brihadratha (185 BCE).',
    hints: [
      'Never skip Bindusara between Chandragupta and Ashoka!',
      'Chandragupta came first by overthrowing the Nandas.',
      'Ashoka ruled after Bindusara; Brihadratha was the final Mauryan ruler.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Foundation - Classify (c9_histciv_032)
  {
    id: 'ch_05',
    nodeId: NODE_C9_HISTCIV_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What are the Three Jewels (Tri-ratnas) of Jainism as prescribed for attaining liberation?',
    options: [
      'Buddha, Dhamma, and Sangha',
      'Samyak Darshana (Right Faith), Samyak Jnana (Right Knowledge), and Samyak Charitra (Right Conduct)',
      'Ahimsa, Satya, and Asteya',
      'Dharma, Artha, and Kama',
    ],
    correctIndex: 1,
    explanation: 'The Jain Tri-ratnas are Samyak Darshana, Samyak Jnana, and Samyak Charitra. "Buddha, Dhamma, Sangha" are the Buddhist Three Jewels (Triratna/Triple Gem).',
    hints: [
      'Do not confuse the internal disciplines of Jainism with the Buddhist refuges.',
      'Look for the three Sanskrit terms starting with "Samyak".',
      'Right Faith, Right Knowledge, and Right Conduct are the three pillars.',
    ],
    misconceptionIndex: 1,
  },
  // 6. Foundation - Classify (c9_histciv_035)
  {
    id: 'ch_06',
    nodeId: NODE_C9_HISTCIV_035,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does modern historical scholarship access Megasthenes’ famous work "Indika"?',
    options: [
      'Through a complete palm-leaf manuscript discovered in Mysore in 1905',
      'Directly from the original papyrus scrolls preserved in Alexandria',
      'Indirectly, as fragments and quotations cited by later Greek authors such as Strabo, Diodorus, and Arrian',
      'Through Ashoka’s Major Rock Edict 13 carved in Kharoshthi script',
    ],
    correctIndex: 2,
    explanation: 'The original Indika written around 302 BCE was lost in antiquity. Historians reconstruct its contents solely through excerpts and citations preserved in later classical Greek writings.',
    hints: [
      'The original manuscript did not survive complete.',
      'R. Shamasastry discovered the Arthashastra in 1905, not the Indika.',
      'Later Greek historians like Arrian and Strabo quoted passages from Megasthenes.',
    ],
    misconceptionIndex: 3,
  },
  // 7. Foundation - Classify (c9_histciv_033)
  {
    id: 'ch_07',
    nodeId: NODE_C9_HISTCIV_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following correctly pairs the Buddhist Eight-fold Path training with its constituent limb?',
    options: [
      'Prajna (Wisdom) — Right Speech and Right Action',
      'Sila (Ethical Conduct) — Right View and Right Intention',
      'Samadhi (Mental Discipline) — Right Effort, Right Mindfulness, and Right Concentration',
      'Sila (Ethical Conduct) — Right Concentration only',
    ],
    correctIndex: 2,
    explanation: 'Prajna (Wisdom) comprises Right View & Right Intention; Sila (Conduct) comprises Right Speech, Action & Livelihood; Samadhi (Meditation) comprises Right Effort, Mindfulness & Concentration.',
    hints: [
      'Inner meditative focus belongs under Samadhi.',
      'External social and ethical actions belong under Sila.',
      'Intellectual clarity and ethical resolve belong under Prajna.',
    ],
  },
  // 8. Standard - Analysis (c9_histciv_034)
  {
    id: 'ch_08',
    nodeId: NODE_C9_HISTCIV_034,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the most fundamental metaphysical divergence between Buddhist Nirvana and Jain Moksha?',
    options: [
      'Jainism rejects karma completely, whereas Buddhism considers karma physical matter',
      'Buddhism teaches Anatta (no permanent soul; Nirvana is cessation/extinguishing), whereas Jainism affirms an eternal Jiva (soul) that physically ascends to Siddhashila',
      'Buddhism promotes extreme sallekhana fasting, whereas Jainism follows the Middle Way',
      'Jain Moksha occurs during lifetime only, whereas Buddhist Nirvana is only attained after physical death',
    ],
    correctIndex: 1,
    explanation: 'Jainism posits an eternal soul (jiva) physically contaminated by material karma (dravya) that rises to Siddhashila upon purification. Buddhism denies any permanent self (anatta), seeing Nirvana as the extinguishing (blowing out) of craving and delusion.',
    hints: [
      'Think about whether a permanent soul exists in both traditions.',
      'Recall the meaning of "Anatta" in Buddhism.',
      'Jainism believes the eternal Jiva rises to the summit of the universe.',
    ],
    misconceptionIndex: 1,
  },
  // 9. Standard - Application (c9_histciv_037)
  {
    id: 'ch_09',
    nodeId: NODE_C9_HISTCIV_037,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In the Mauryan imperial revenue administration, how did the responsibilities of the Samaharta differ from those of the Sannidhata?',
    options: [
      'Samaharta guarded the state treasury vault, while Sannidhata commanded the border army',
      'Samaharta assessed and collected revenues from agriculture, trade, and mines, while Sannidhata served as the chief treasurer managing custody and disbursements',
      'Samaharta was the provincial prince-governor, while Sannidhata directed the secret spy network',
      'Samaharta supervised municipal sanitation, while Sannidhata registered births and deaths',
    ],
    correctIndex: 1,
    explanation: 'The Mauryan fiscal system separated duties to prevent embezzlement: the Samaharta was the Chief Collector (gathering revenue), while the Sannidhata was the Chief Treasurer (storing and disbursing funds from the imperial treasury at Pataliputra).',
    hints: [
      'One official gathers taxes; the other locks the treasury vault and pays bills.',
      'Samaharta = Revenue Collection; Sannidhata = Treasury Custody & Storage.',
      'This functional separation prevented corruption in ancient state finance.',
    ],
  },
  // 10. Standard - Match / Classify (c9_histciv_038)
  {
    id: 'ch_10',
    nodeId: NODE_C9_HISTCIV_038,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match the specific Ashokan edict to its key declared principle of state policy:',
    options: [
      'Rock Edict 12 — Religious tolerance & restraint in praising one’s own sect while disparaging others',
      'Rock Edict 1 — Declaration of war against Kalinga and expansion of frontiers',
      'Rock Edict 10 — Reinstatement of grand Vedic animal sacrifices in Pataliputra',
      'Pillar Edict 2 — Command to convert all subjects forcibly into Buddhist monks',
    ],
    correctIndex: 0,
    explanation: 'Major Rock Edict 12 specifically commands religious tolerance across all sects (Brahmanas, Shramanas, Jains, Ajivikas), stating that honouring other faiths exalts one’s own tradition.',
    hints: [
      'Rock Edict 1 banned animal sacrifices and royal hunting.',
      'Rock Edict 12 is celebrated worldwide for establishing universal interfaith harmony.',
      'Pillar Edict 2 outlines social virtues (kindness to servants, truthfulness, compassion).',
    ],
  },
  // 11. Standard - Construct: Jain Karma Cycle (c9_histciv_032)
  {
    id: 'ch_11',
    nodeId: NODE_C9_HISTCIV_032,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Construct the correct theological sequence of the Jain karmic process from entry to final liberation.',
    availableParts: ['Asrava (Inflow)', 'Bandha (Binding)', 'Samvara (Stoppage)', 'Nirjara (Shedding)', 'Moksha (Liberation)'],
    targetState: 'Asrava (Inflow) Bandha (Binding) Samvara (Stoppage) Nirjara (Shedding) Moksha (Liberation)',
    validationHint: 'Add: Inflow -> Binding -> Stoppage -> Shedding -> Final Liberation',
    explanation: 'Karmic particles flow in (asrava), stick to the soul (bandha), are stopped from entering by vows (samvara), are actively burned away through tapas/austerities (nirjara), enabling the soul to rise to Siddhashila (moksha).',
    hints: [
      'First karmic dust enters (Asrava), then it binds (Bandha).',
      'Next, you stop new influx (Samvara), then burn away old residue (Nirjara).',
      'The culmination is Moksha at the summit of the universe.',
    ],
    misconceptionIndex: 1,
  },
  // 12. Standard - Analysis (c9_histciv_039)
  {
    id: 'ch_12',
    nodeId: NODE_C9_HISTCIV_039,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What historical distinction separates the transformation from "Bheri Ghosha" to "Dhamma Ghosha"?',
    options: [
      'The replacement of iron coins with gold currency across all market guilds',
      'The shift from military conquest by the beating of war drums to moral conquest by the resonance of righteous living',
      'The total abolition of the Mauryan army and complete disarmament of all borders',
      'The substitution of Prakrit inscriptions with Greek diplomatic treaties',
    ],
    correctIndex: 1,
    explanation: 'Rock Edict 1 records the substitution of Bheri Ghosha (the sound of military war drums) with Dhamma Ghosha (the voice of ethical instruction). Crucially, Ashoka redirected imperial foreign policy toward moral influence without disbanding the standing army.',
    hints: [
      'Bheri means war drum; Ghosha means sound/resonance.',
      'Dhamma Ghosha means proclaiming moral righteousness and peace.',
      'Ashoka did NOT abolish the army, but changed the empire’s guiding ambition.',
    ],
  },
  // 13. Standard - Application: Edict Scripts (c9_histciv_035)
  {
    id: 'ch_13',
    nodeId: NODE_C9_HISTCIV_035,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An epigraphist unearths an Ashokan rock inscription in modern Khyber Pakhtunkhwa (Shahbazgarhi / Mansehra). Which script is it written in, and why?',
    options: [
      'Brahmi — because it was universally used for every inscription across India',
      'Kharoshthi — written right-to-left, adopted for northwestern frontier provinces influenced by Aramaic administrative traditions',
      'Tamil Brahmi — because of maritime trade connections',
      'Devanagari — as standard royal court script',
    ],
    correctIndex: 1,
    explanation: 'In the northwestern frontier (Shahbazgarhi, Mansehra), Ashoka used Kharoshthi script (written right-to-left) adapted to local regional literacy, whereas Brahmi was used across central, eastern, and southern India.',
    hints: [
      'The northwestern edicts used a script written from right to left.',
      'Girnar and Dhauli used Brahmi; Shahbazgarhi used Kharoshthi.',
      'Kharoshthi was derived from the Aramaic script of the Persian empire.',
    ],
  },
  // 14. Standard - Application (c9_histciv_039)
  {
    id: 'ch_14',
    nodeId: NODE_C9_HISTCIV_039,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Which historical event firmly established Theravada Buddhism as the enduring national religion of Sri Lanka?',
    options: [
      'The diplomatic marriage between Seleucus Nicator and Chandragupta Maurya',
      'The mission of Ashoka’s son Mahendra and daughter Sanghamitra to King Devanampiya Tissa at Mihintale (c. 250 BCE)',
      'The convening of the First Buddhist Council at Rajagriha under Ajatashatru',
      'Kautilya’s diplomatic dispatch recorded in the Arthashastra',
    ],
    correctIndex: 1,
    explanation: 'Around 250 BCE, Ashoka dispatched his children Mahendra and Sanghamitra to Sri Lanka, where Mahendra converted King Devanampiya Tissa at Mihintale, planting the Bodhi sapling and establishing Theravada Buddhism.',
    hints: [
      'Look for the mission led by Ashoka’s own son and daughter.',
      'The Sri Lankan ruler converted was King Devanampiya Tissa at Mihintale hill.',
      'This soft-power diplomacy shaped Southeast Asian cultural history for millennia.',
    ],
  },
  // 15. Advanced - Analysis / Historiography (c9_histciv_039)
  {
    id: 'ch_15',
    nodeId: NODE_C9_HISTCIV_039,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Evaluate the balanced historiographical debate regarding the political collapse of the Mauryan Empire within 50 years of Ashoka’s death (c. 232–185 BCE):',
    options: [
      'The collapse was caused solely by Buddhist pacifism and complete religious alienation of all subjects',
      'The collapse resulted from multi-factorial structural strains: excessive treasury depletion on welfare/monuments, military de-emphasis, lack of institutionalization beyond charismatic emperors, and incompetent successors',
      'The empire did not decline; it voluntarily merged into the Greek Seleucid kingdom',
      'The collapse was entirely triggered by climate drought across the Gangetic valley with zero political factors',
    ],
    correctIndex: 1,
    explanation: 'Historians reject single-cause explanations. While Ashoka’s pacifism and vast welfare expenses strained readiness and finance, the collapse was primarily driven by weak successors, partition of the realm, administrative top-heaviness, and provincial rebellions leading to Brihadratha’s assassination by Pushyamitra Shunga.',
    hints: [
      'Single-cause answers (e.g. blaming only religion or only military) are historically flawed.',
      'Consider financial strain, succession crises, and over-centralised bureaucracy.',
      'A multi-causal synthesis represents high-level historical analysis.',
    ],
  },
  // 16. Advanced - Evaluation: Aniconism (c9_histciv_040)
  {
    id: 'ch_16',
    nodeId: NODE_C9_HISTCIV_040,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is early Mauryan Buddhist art classified as "aniconic", and how does the Sarnath Lion Capital reflect this aesthetic doctrine?',
    options: [
      'Mauryan sculptors lacked the stone-carving skill to chisel human facial features in Chunar sandstone',
      'The Buddha was intentionally depicted solely through sacred symbols (Dharma wheels, lions, Bodhi trees, footprints) because depicting the enlightened teacher in bodily mortal form was considered philosophically inappropriate before the Gandhara/Mathura era',
      'Ashoka passed a decree in Major Rock Edict 1 forbidding all forms of visual representation in public places',
      'The Lion Capital was an exclusively Vedic monument dedicated to the god Indra with zero Buddhist connections',
    ],
    correctIndex: 1,
    explanation: 'Early Buddhist art (3rd–1st Century BCE) avoided anthropomorphic representation. The Buddha was symbolized: the lion representing royal lineage and spiritual lion-roar, the wheel representing the first sermon (Dharmachakrapravartana), and empty thrones/footprints marking presence. Human Buddha sculptures emerged centuries later in Gandhara and Mathura.',
    hints: [
      '"Aniconic" means without human likeness/images.',
      'Symbols like wheels, trees, and lions represented the Master’s presence and teachings.',
      'Human Buddha statues only appeared around the 1st Century CE.',
    ],
    misconceptionIndex: 4,
  },
  // 17. Advanced - Application: Provincial Governance (c9_histciv_037)
  {
    id: 'ch_17',
    nodeId: NODE_C9_HISTCIV_037,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A merchant caravan journeys along the Uttarapatha from Pataliputra to the northwestern frontier headquarters. In which provincial capital will they seek protection from the appointed royal Kumara?',
    options: [
      'Taxila (Provincial capital of Uttarapatha in the northwest)',
      'Suvarnagiri (Provincial capital of Dakshinapatha in the Deccan)',
      'Tosali (Provincial capital of Kalinga on the eastern coast)',
      'Ujjain (Provincial capital of Avantiratha in central-western India)',
    ],
    correctIndex: 0,
    explanation: 'The four Mauryan provincial capitals were: Uttarapatha = Taxila (northwest), Avantiratha = Ujjain (west), Dakshinapatha = Suvarnagiri (south), and Kalinga = Tosali (east). Each was administered by an appointed prince-governor (Kumara).',
    hints: [
      'Uttarapatha means the northern highway route leading toward Gandhara.',
      'Taxila was the great educational and frontier garrison capital.',
      'Ujjain was in the west; Suvarnagiri in the south; Tosali in the east.',
    ],
  },
  // 18. Advanced - Evaluation: Dhamma vs Religion (c9_histciv_038)
  {
    id: 'ch_18',
    nodeId: NODE_C9_HISTCIV_038,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate why Ashoka framed Dhamma as a universal, non-sectarian civic code rather than establishing Buddhism as a compulsory state religion across his empire.',
    options: [
      'Ashoka was secretly a staunch orthodox Vedic follower who despised Buddhist monks',
      'The Mauryan Empire was a diverse tapestry of Brahmanas, Shramanas, Jains, Ajivikas, and tribal peoples; imposing a single sectarian theology would incite civil rebellion, whereas a shared ethical code forged social cohesion and imperial stability',
      'Buddhist monasteries refused to allow secular emperors to sponsor religious propagation',
      'Ashoka lacked financial funds to build any Buddhist monasteries or pillars',
    ],
    correctIndex: 1,
    explanation: 'Dhamma was pragmatic statecraft fused with ethical vision. Imposing sectarian Buddhism would alienate powerful Brahmanical and Jain constituencies. By promoting universal virtues (ahimsa, filial respect, truth, communal harmony), Ashoka unified a vast multi-religious empire.',
    hints: [
      'Consider the social composition of an empire stretching from Afghanistan to Karnataka.',
      'Forcing one religion on everyone creates instant civil war.',
      'Dhamma extracted shared moral values that all communities could practice.',
    ],
  },
  // 19. Advanced - Drag Sort: Life & Evolution of Sanchi (c9_histciv_040)
  {
    id: 'ch_19',
    nodeId: NODE_C9_HISTCIV_040,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the multi-period architectural evolution of the Sanchi Stupa and its modern legacy in chronological order:',
    sortItems: [
      'Ashoka commissions the original modest brick relic dome (c. 250 BCE)',
      'Shunga dynasty doubles diameter and encases the dome in stone (2nd Century BCE)',
      'Satavahana artisans sculpt the 4 intricate ceremonial Toranas (1st Century BCE)',
      'Lion Capital of Sarnath adopted as National Emblem of Independent India (26 Jan 1950)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Sanchi is a multi-dynasty architectural masterpiece: Mauryan brick core -> Shunga stone enlargement -> Satavahana toranas -> modern independent India adoption of Mauryan lion emblem.',
    hints: [
      'Start with Ashoka’s 3rd-century BCE brick core.',
      'The Shungas added the stone casing before the Satavahanas carved the gateways.',
      'The modern Republic of India emblem adoption represents the final culmination.',
    ],
    misconceptionIndex: 4,
  },
  // 20. Advanced - Creativity: Architectural Strategy (c9_histciv_037)
  {
    id: 'ch_20',
    nodeId: NODE_C9_HISTCIV_037,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'How did the Mauryan spy network ("Gudhapurushas") safeguard imperial integrity against autonomous provincial prince-governors?',
    options: [
      'Spies reported directly to the Emperor in Pataliputra through independent bypass channels, preventing kumaras from concealing fiscal fraud or hatching conspiracies',
      'Spies were publicly stationed at city gates to collect tolls from passing foreign merchants',
      'Spies replaced the Mantriparishad and made all administrative judicial verdicts',
      'Spies were restricted exclusively to diplomatic embassies in Seleucid Syria',
    ],
    correctIndex: 0,
    explanation: 'The Gudhapurushas served as the nervous system of centralized rule. By reporting directly to the Emperor and bypassing intermediate ministers and prince-governors, they ensured unfiltered intelligence and immediate checks on provincial rebellion.',
    hints: [
      'Spies must report above the heads of regional governors.',
      'Bypassing the official chain of command guarantees unfiltered feedback.',
      'This intelligence pipeline was central to Kautilya’s statecraft.',
    ],
  },
  // 21. Advanced - Evaluation: Multi-causality (c9_histciv_031)
  {
    id: 'ch_21',
    nodeId: NODE_C9_HISTCIV_031,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why do CISCE examiners penalize answers that attribute the rise of Jainism and Buddhism solely to "the caste system"?',
    options: [
      'Because caste played zero role whatsoever in ancient Indian history',
      'Because the 6th Century BCE spiritual revolution was a simultaneous convergence of 5 distinct currents: social discontent, agrarian cattle preservation, merchant wealth assertion, ritual fatigue, and vernacular democratization',
      'Because Buddhism was founded in Greece and imported into Magadha by Alexander',
      'Because only the king’s personal whims determined religious movements in ancient India',
    ],
    correctIndex: 1,
    explanation: 'High-scoring historical analysis requires multi-causality. While social rigidification was significant, the economic protection of plough oxen, the rise of powerful Vaishya trade shrenis, hollow sacrificial formalism, and Prakrit/Pali preaching were equally decisive.',
    hints: [
      'Single-cause answers overlook the economic, linguistic, and political engines.',
      'Remember the 5 converging arrows: Social, Economic, Religious, Linguistic, Political.',
      'Agrarian cattle needs and merchant guild ambitions were indispensable factors.',
    ],
    misconceptionIndex: 0,
  },
  // 22. Advanced - Numeric: Sanchi Metric Analysis (c9_histciv_040)
  {
    id: 'ch_22',
    nodeId: NODE_C9_HISTCIV_040,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'How many standing lions back-to-back crown the Sarnath Capital that was adopted as India’s National Emblem on 26 January 1950?',
    correctAnswer: 4,
    tolerance: 0,
    unit: 'lions',
    explanation: 'The Sarnath Lion Capital features 4 Asiatic lions standing back to back (symbolizing power, courage, confidence, and pride spreading in all 4 cardinal directions), mounted on a circular abacus.',
    hints: [
      'When you look at the 2D Indian coin or currency note, you see 3 lions, but one is hidden at the back.',
      'How many cardinal directions (North, South, East, West) do they face?',
      'The total number of sculpted lions is exactly 4.',
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
  nodeId: NODE_C9_HISTCIV_031,
  title: 'Rise of Jainism, Buddhism & The Mauryan Empire',
  definition: 'The 6th Century BCE in the Gangetic Plains witnessed a massive socio-economic and spiritual transformation that birthed Jainism and Buddhism. This was followed by the first pan-Indian centralized empire under the Mauryas, characterized by Kautilyan bureaucracy, Ashoka\'s ethical Dhamma, and monumental stone art.',
  eli5: 'Think of 6th Century BCE India as an engine: farmers needed oxen to plough fields, merchants wanted respect for their hard work, and ordinary people wanted to pray in their everyday spoken language without paying for expensive animal sacrifices. Two princes, Mahavira and Buddha, showed new paths of kindness. Later, King Ashoka used this spirit of tolerance to govern a vast empire and carved his golden rules onto giant shiny stone pillars!',
  misconceptions: [
    {
      misconception: 'The rise of Jainism and Buddhism was caused ONLY by the rigid caste system.',
      correction: 'It was driven by 5 converging forces: social hierarchy, agrarian cattle preservation, wealthy merchant trade guilds (Vaishyas), ritual fatigue, and vernacular language accessibility (Prakrit & Pali).',
    },
    {
      misconception: 'Jain karma is just a psychological moral law, and Tri-ratnas are Buddha, Dhamma, Sangha.',
      correction: 'In Jainism, karma is literal physical matter (dravya) that clings to the soul (jiva). Jain Tri-ratnas are Samyak Darshana, Samyak Jnana, and Samyak Charitra.',
    },
    {
      misconception: 'Ashoka succeeded Chandragupta Maurya directly on the throne.',
      correction: 'Bindusara (Amitraghata) ruled for 25 years between Chandragupta and Ashoka, consolidating the southern Deccan territories.',
    },
    {
      misconception: 'Megasthenes\' Indika survives as a complete original book.',
      correction: 'The original manuscript was lost in antiquity; historians reconstruct it from quotations preserved in later writings of Strabo, Arrian, and Diodorus.',
    },
    {
      misconception: 'The Sarnath Lion Capital depicts Buddha as a human figure, and Ashoka built all of Sanchi alone.',
      correction: 'Early Buddhist art was strictly aniconic (using symbols like lions and wheels). Sanchi was enlarged with stone casing and toranas by subsequent Shunga and Satavahana dynasties.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which language was used by Mahavira for preaching?', options: ['Vedic Sanskrit', 'Ardhamagadhi Prakrit', 'Classical Latin', 'Persian'], correctIndex: 1 },
    { question: 'What does "Anatta" mean in Buddhism?', options: ['Eternal soul', 'No permanent self', 'Ritual sacrifice', 'Royal decree'], correctIndex: 1 },
    { question: 'Who discovered the Arthashastra manuscript in 1905?', options: ['Alexander Cunningham', 'R. Shamasastry', 'James Prinsep', 'John Marshall'], correctIndex: 1 },
    { question: 'Where did Chandragupta Maurya spend his final ascetic days?', options: ['Sarnath', 'Shravanabelagola', 'Lumbini', 'Pataliputra'], correctIndex: 1 },
    { question: 'Which official collected taxes in the Mauryan Empire?', options: ['Sannidhata', 'Samaharta', 'Rajuka', 'Kumara'], correctIndex: 1 },
    { question: 'Which Ashokan edict explicitly expresses remorse for the Kalinga War?', options: ['Rock Edict 1', 'Rock Edict 13', 'Pillar Edict 7', 'Minor Edict 3'], correctIndex: 1 },
    { question: 'What was the site where Mahendra converted King Devanampiya Tissa?', options: ['Mihintale', 'Anuradhapura', 'Kandy', 'Colombo'], correctIndex: 0 },
    { question: 'Which caves were donated by Ashoka to the Ajivika sect?', options: ['Ajanta', 'Ellora', 'Barabar', 'Elephanta'], correctIndex: 2 },
  ],
  masteryCriteria: 'Master the 5 causes of heterodox religions, doctrinal contrasts (Jiva vs Anatta, Moksha vs Nirvana), Mauryan 3-tier administration, Ashokan Dhamma principles, and Sanchi/Sarnath art evolution.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ─��─
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The 5-Arrow Convergence Engine (6th Century BCE)',
    instruction: 'Click each of the 5 historical pressure vectors in the Gangetic basin to see how they united to ignite the spiritual revolution.',
    interactionType: 'click-vectors',
    nodeId: NODE_C9_HISTCIV_031,
  },
  {
    title: 'Lab 2: Metaphysical Chamber — Jiva (Soul) vs Anatta (No-Self)',
    instruction: 'Toggle between the Jain Ascending Soul (Moksha) and the Buddhist Extinguished Flame (Nirvana) to inspect the core metaphysical contrast.',
    interactionType: 'toggle-metaphysics',
    nodeId: NODE_C9_HISTCIV_034,
  },
  {
    title: 'Lab 3: Mauryan Imperial Bureaucracy Simulator',
    instruction: 'Adjust the Harvest Tax Slider and observe how Samaharta collects and Sannidhata stores the imperial wealth at Pataliputra.',
    interactionType: 'slider-admin',
    nodeId: NODE_C9_HISTCIV_037,
  },
  {
    title: 'Lab 4: The Ashokan Dhamma Moral Balance',
    instruction: 'Shift the Empire Policy slider from Military Conquest (Bheri Ghosha) to Moral Governance (Dhamma Ghosha) and watch provincial harmony surge.',
    interactionType: 'slider-dhamma',
    nodeId: NODE_C9_HISTCIV_038,
  },
  {
    title: 'Lab 5: Sanchi Stupa Architectural Dissector',
    instruction: 'Click the interactive architectural hotspots of the Great Stupa to reveal the Anda, Harmika, Chhatra, and Torana functions.',
    interactionType: 'click-stupa',
    nodeId: NODE_C9_HISTCIV_040,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Epigraphist & Modern Constitution Analyst',
  description: 'Examine how ancient Mauryan governance directly shaped modern India. Find the Lion Capital on an Indian 500-rupee note, identify the 24-spoke Ashoka Chakra on the National Flag, and draft an Ashokan-style "Dhamma Edict" for modern environmental sustainability.',
  steps: [
    'Inspect an Indian coin or currency note and identify the 4 back-to-back lions of Sarnath.',
    'Trace the 24 spokes of the Ashoka Chakra on the central white band of the Indian Tricolour.',
    'Write a 3-sentence modern civic edict promoting interfaith respect and animal preservation (inspired by Rock Edicts 1 and 12).',
    'Share your civic edict with your classmates or family!',
  ],
};

// ──�� COMPONENT DEFINITION ───
function C9_HistoryCivicsCausesRiseJainismSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C9_HISTCIV_031,
    title = DEFAULT_PROPS.title || 'Rise of Jainism, Buddhism & The Mauryan Empire',
    misconceptions = DEFAULT_PROPS.misconceptions,
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['histciv'] || { name: 'History & Civics', emoji: '🏛️', color: 'amber' };

  // ─── REACT STATE HOOKS ───
  const [phase, setPhase] = useState<'discovery' | 'predict' | 'explore' | 'observe' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict Phase State
  const [predictIndex, setPredictIndex] = useState(0);
  const [predictAnswers, setPredictAnswers] = useState<Record<string, number>>({});
  const [predictFeedback, setPredictFeedback] = useState<Record<string, boolean>>({});

  // Observe Phase State
  const [observeIndex, setObserveIndex] = useState(0);
  const [observeAnswers, setObserveAnswers] = useState<Record<string, number>>({});
  const [observeFeedback, setObserveFeedback] = useState<Record<string, boolean>>({});

  // Exploration Interactive States
  const [selectedVector, setSelectedVector] = useState<string | null>(null);
  const [metaphysicsMode, setMetaphysicsMode] = useState<'jain' | 'buddhist'>('jain');
  const [taxRateSlider, setTaxRateSlider] = useState<number>(17);
  const [dhammaPolicySlider, setDhammaPolicySlider] = useState<number>(80);
  const [selectedStupaHotspot, setSelectedStupaHotspot] = useState<string | null>(null);
  const [bheriVolume, setBheriVolume] = useState<number>(20);
  const [softPowerScore, setSoftPowerScore] = useState<number>(85);

  // Sandbox States
  const [sandboxEcoTension, setSandboxEcoTension] = useState<number>(40);
  const [sandboxPrakritReach, setSandboxPrakritReach] = useState<number>(90);
  const [sandboxTreasuryVault, setSandboxTreasuryVault] = useState<number>(65);

  // Challenge & Evaluation States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating Hints & Feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-Drop & Construction
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual FX States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timelineGsapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY ADAPTIVE DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── USEEFFECT HOOKS ───

  // 1. Load initial mastery from store on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // 2. Adaptive BKT difficulty updater
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

  // 3. GSAP Timeline Animation for Mauryan Chronology
  useEffect(() => {
    if (phase === 'explore' && timelineGsapRef.current) {
      gsap.fromTo(
        timelineGsapRef.current.querySelectorAll('.timeline-node'),
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
      );
    }
  }, [phase, currentSlide]);

  // 4. HTML5 Canvas Live Particle Loop for Dhamma Resonance
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

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 18 + Math.sin(frame * 0.05) * 3;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(frame * 0.015);

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 24; i++) {
        const angle = (i * Math.PI * 2) / 24;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * (radius + 14), Math.sin(angle) * (radius + 14));
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#0284c7';
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // 5. Inactivity timer cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── USECALLBACK HOOKS ───

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      setShowHint(false);
      speechManager.speak('Let us inspect the complete archival historical explanation.');
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

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handlePredictAnswer = useCallback((qId: string, selectedIdx: number) => {
    const q = PREDICTION_QUESTIONS.find(item => item.id === qId);
    if (!q) return;
    const isCorrect = selectedIdx === q.correctIndex;
    setPredictAnswers(prev => ({ ...prev, [qId]: selectedIdx }));
    setPredictFeedback(prev => ({ ...prev, [qId]: isCorrect }));
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, []);

  const handleObserveAnswer = useCallback((qId: string, selectedIdx: number) => {
    const q = OBSERVATION_QUESTIONS.find(item => item.id === qId);
    if (!q) return;
    const isCorrect = selectedIdx === q.correctIndex;
    setObserveAnswers(prev => ({ ...prev, [qId]: selectedIdx }));
    setObserveFeedback(prev => ({ ...prev, [qId]: isCorrect }));
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, []);

  const handleAdvanceToPredict = useCallback(() => {
    setPhase('predict');
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Gangetic historical laboratory. Explore each interactive lab.');
  }, []);

  const handleAdvanceToObserve = useCallback(() => {
    setPhase('observe');
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Sandbox unlocked. Freely test variables without any grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Ready for imperial challenges! Think critically.');
  }, []);

  const handleVectorClick = useCallback((vecId: string) => {
    setSelectedVector(vecId);
    audioManager.play('tap');
    const summaries: Record<string, string> = {
      social: 'Social Discontent: Rigid Later Vedic four-tier hierarchy excluded Vaishyas & Shudras from spiritual dignity.',
      economic: 'Agrarian Engine: Mass animal sacrifices destroyed draft oxen needed for Gangetic iron-plough agriculture.',
      mercantile: 'Merchant Rise: Wealthy trade guilds (shrenis) in Rajagriha & Shravasti resented being ranked 3rd by birth.',
      religious: 'Sacrificial Fatigue: Mechanised, expensive Sanskrit rituals performed by hired specialists lacked ethical reform.',
      linguistic: 'Vernacular Power: Preaching in Prakrit and Pali unlocked spiritual truths for everyday commoners.',
      political: 'Royal Patronage: Kshatriya kings (Bimbisara, Ajatashatru) supported new movements to curb priestly dominance.',
    };
    speechManager.speak(summaries[vecId] || '');
  }, []);

  const handleStupaHotspotClick = useCallback((hotspotId: string) => {
    setSelectedStupaHotspot(hotspotId);
    audioManager.play('tap');
  }, []);

  const handleTaxSliderChange = useCallback((val: number) => {
    setTaxRateSlider(val);
    audioManager.play('count');
  }, []);

  const handleDhammaSliderChange = useCallback((val: number) => {
    setDhammaPolicySlider(val);
    setSoftPowerScore(Math.min(100, Math.round(val * 1.15)));
    setBheriVolume(Math.max(0, 100 - val));
    audioManager.play('count');
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
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Imperial certification completed! You have mastered 6th Century BCE reforms and the Mauryan Empire.');
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
      speechManager.speak('Correct analysis!');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(bktStateRef.current));
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
        speechManager.speak('Inspect the verified historical evidence.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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

  const handleResetConstruct = useCallback(() => {
    setConstructParts([]);
    audioManager.play('pop');
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 pb-4 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shadow-inner">
            {subjectConfig.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                Class 9 ICSE • History
              </span>
              <span className="text-xs text-slate-400">c9_histciv_031–040</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Badges & Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${
            phase === 'discovery' ? 'bg-gold-900/60 border-gold-500 text-gold-300' :
            phase === 'predict' ? 'bg-amber-900/60 border-amber-500 text-amber-300' :
            phase === 'explore' ? 'bg-gold-900/60 border-gold-500 text-gold-300' :
            phase === 'observe' ? 'bg-teal-900/60 border-teal-500 text-teal-300' :
            phase === 'sandbox' ? 'bg-purple-900/60 border-purple-500 text-purple-300' :
            phase === 'challenge' ? 'bg-amber-900/60 border-amber-500 text-amber-300' :
            'bg-emerald-900/60 border-emerald-500 text-emerald-300'
          }`}>
            Phase: {phase}
          </span>
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${
                difficulty === 'foundation' ? 'bg-emerald-950 border-emerald-600 text-emerald-300' :
                difficulty === 'standard' ? 'bg-gold-950 border-gold-600 text-gold-300' :
                'bg-rose-950 border-rose-600 text-rose-300'
              }`}
            >
              Tier: {difficulty}
            </motion.span>
          )}
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-600/30">
            <h2 className="text-lg font-bold text-amber-300 flex items-center gap-2">
              <span>📜</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-3 p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-amber-200/90">
              <strong>Your Mission:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>🔍</span> Discovery Hook • Think &amp; Predict
            </div>
            <p className="text-base md:text-lg font-semibold text-white mb-4">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => {
                const isSelectedAndCorrect = discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex;
                const isSelectedAndWrong = discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex;

                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleDiscoveryAnswer(idx)}
                    disabled={discoveryAnswered}
                    aria-label={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                    className={`p-4 text-left rounded-xl border text-sm font-medium transition-all ${
                      isSelectedAndCorrect
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50'
                        : isSelectedAndWrong
                        ? 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-amber-400">
                      {isSelectedAndCorrect ? '✓ ' : isSelectedAndWrong ? '✗ ' : ''}
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {option}
                  </motion.button>
                );
              })}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
                <div className={`p-4 rounded-xl border text-sm ${
                  discoveryCorrect
                    ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                    : 'bg-amber-950/60 border-amber-600 text-amber-300'
                }`}>
                  <p className="font-bold flex items-center gap-2">
                    {discoveryCorrect ? '✓ Historical Reasoning Validated!' : '💡 Historical Insight:'}
                  </p>
                  <p className="mt-1 text-xs md:text-sm text-slate-300 leading-relaxed">
                    {discoveryCorrect ? 'Precisely! Oxen were the engines of Gangetic agriculture. Sacrificing them was an economic disaster.' : DISCOVERY_QUESTION.hintAfter}
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToPredict}
                    aria-label="Proceed to Brilliant Predict Phase"
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 text-sm"
                  >
                    Make Interactive Predictions (Predict-Then-Check) →
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 1B. PREDICT-THEN-CHECK PHASE (Brilliant Pattern) ─── */}
      {phase === 'predict' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-4 bg-amber-950/40 rounded-2xl border border-amber-500/40">
            <h2 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <span>🔮</span> Brilliant.org Pattern: Predict Then Verify
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Formulate your hypothesis before entering the interactive laboratory. You will test these exact predictions in the simulation!
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="text-amber-400 font-bold uppercase tracking-wider">Prediction {predictIndex + 1} of {PREDICTION_QUESTIONS.length}</span>
              <span>Question ID: {PREDICTION_QUESTIONS[predictIndex].id}</span>
            </div>

            <p className="text-base md:text-lg font-bold text-white">
              {PREDICTION_QUESTIONS[predictIndex].question}
            </p>

            <div className="space-y-3">
              {PREDICTION_QUESTIONS[predictIndex].options.map((opt, idx) => {
                const currentAns = predictAnswers[PREDICTION_QUESTIONS[predictIndex].id];
                const isSelected = currentAns === idx;
                const answered = currentAns !== undefined;
                const isCorrect = idx === PREDICTION_QUESTIONS[predictIndex].correctIndex;

                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handlePredictAnswer(PREDICTION_QUESTIONS[predictIndex].id, idx)}
                    disabled={answered}
                    aria-label={`Prediction Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                    className={`w-full p-4 text-left rounded-xl border text-sm font-medium transition-all ${
                      answered && isCorrect
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md'
                        : answered && isSelected && !isCorrect
                        ? 'bg-rose-950/60 border-rose-600 text-rose-200'
                        : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-amber-400">
                      {answered && isCorrect ? '✓ ' : answered && isSelected && !isCorrect ? '✗ ' : ''}
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            {predictAnswers[PREDICTION_QUESTIONS[predictIndex].id] !== undefined && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-gold-500/40 space-y-2">
                <p className="text-xs font-bold text-gold-400 uppercase tracking-wider flex items-center gap-1">
                  <span>🔬</span> How you will verify this in Lab:
                </p>
                <p className="text-xs md:text-sm text-slate-200">
                  {PREDICTION_QUESTIONS[predictIndex].verifyInstruction}
                </p>
                <p className="text-xs text-slate-400 mt-1 border-t border-slate-800 pt-2">
                  <strong>Explanation:</strong> {PREDICTION_QUESTIONS[predictIndex].explanation}
                </p>
              </motion.div>
            )}

            <div className="flex justify-between items-center pt-2">
              <button
                disabled={predictIndex === 0}
                onClick={() => setPredictIndex(i => Math.max(0, i - 1))}
                aria-label="Previous Prediction"
                className="px-4 py-2 bg-slate-800 disabled:opacity-40 text-slate-300 rounded-xl text-xs font-bold"
              >
                ← Previous
              </button>

              {predictIndex < PREDICTION_QUESTIONS.length - 1 ? (
                <button
                  disabled={predictAnswers[PREDICTION_QUESTIONS[predictIndex].id] === undefined}
                  onClick={() => setPredictIndex(i => i + 1)}
                  aria-label="Next Prediction"
                  className="px-5 py-2.5 bg-amber-500 disabled:opacity-40 text-slate-950 rounded-xl text-xs font-black"
                >
                  Next Prediction →
                </button>
              ) : (
                <button
                  disabled={predictAnswers[PREDICTION_QUESTIONS[predictIndex].id] === undefined}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Laboratory"
                  className="px-6 py-2.5 bg-emerald-600 disabled:opacity-40 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30"
                >
                  Enter Laboratory to Test Predictions →
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 2. INTERACTIVE EXPLORATION (Brilliant.org style) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
            <span className="text-amber-400 font-bold">Interactive Discovery Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
            <span className="text-slate-400">Topic: {EXPLORATION_STEPS[currentSlide].title}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-5 md:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div>
                <h3 className="text-lg font-bold text-amber-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-gold-300 mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── STEP 0: 5-Arrow Convergence Engine SVG ─���─ */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 320" className="w-full h-auto max-h-[340px]" role="img" aria-label="5-Arrow Convergence Diagram for Rise of Jainism and Buddhism">
                      {/* Central Nexus: Spiritual Revolution */}
                      <circle cx="300" cy="160" r="55" fill="#451a03" stroke="#f59e0b" strokeWidth="3" />
                      <text x="300" y="152" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="bold">6th CENTURY BCE</text>
                      <text x="300" y="168" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">RISE OF JAINISM</text>
                      <text x="300" y="182" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">&amp; BUDDHISM</text>

                      {/* Vector 1: Social */}
                      <g
                        onClick={() => handleVectorClick('social')}
                        onKeyDown={(e) => e.key === 'Enter' && handleVectorClick('social')}
                        role="button"
                        tabIndex={0}
                        aria-label="Inspect Social Discontent Vector"
                        className="cursor-pointer group focus:outline-none"
                      >
                        <line x1="120" y1="60" x2="250" y2="130" stroke="#f87171" strokeWidth="3" strokeDasharray="4 2" />
                        <circle cx="120" cy="60" r="32" fill={selectedVector === 'social' ? '#b91c1c' : '#1e293b'} stroke="#ef4444" strokeWidth="2" />
                        <text x="120" y="58" textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="bold">1. SOCIAL</text>
                        <text x="120" y="72" textAnchor="middle" fill="#e2e8f0" fontSize="8">Rigid Caste</text>
                      </g>

                      {/* Vector 2: Economic */}
                      <g
                        onClick={() => handleVectorClick('economic')}
                        onKeyDown={(e) => e.key === 'Enter' && handleVectorClick('economic')}
                        role="button"
                        tabIndex={0}
                        aria-label="Inspect Economic Cattle Danger Vector"
                        className="cursor-pointer group focus:outline-none"
                      >
                        <line x1="480" y1="60" x2="350" y2="130" stroke="#fbbf24" strokeWidth="3" strokeDasharray="4 2" />
                        <circle cx="480" cy="60" r="32" fill={selectedVector === 'economic' ? '#b45309' : '#1e293b'} stroke="#f59e0b" strokeWidth="2" />
                        <text x="480" y="58" textAnchor="middle" fill="#fde68a" fontSize="9" fontWeight="bold">2. ECONOMIC</text>
                        <text x="480" y="72" textAnchor="middle" fill="#e2e8f0" fontSize="8">Cattle in Danger</text>
                      </g>

                      {/* Vector 3: Mercantile */}
                      <g
                        onClick={() => handleVectorClick('mercantile')}
                        onKeyDown={(e) => e.key === 'Enter' && handleVectorClick('mercantile')}
                        role="button"
                        tabIndex={0}
                        aria-label="Inspect Mercantile Guilds Vector"
                        className="cursor-pointer group focus:outline-none"
                      >
                        <line x1="80" y1="190" x2="245" y2="165" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 2" />
                        <circle cx="80" cy="190" r="32" fill={selectedVector === 'mercantile' ? '#0369a1' : '#1e293b'} stroke="#38bdf8" strokeWidth="2" />
                        <text x="80" y="188" textAnchor="middle" fill="#bae6fd" fontSize="9" fontWeight="bold">3. MERCANTILE</text>
                        <text x="80" y="202" textAnchor="middle" fill="#e2e8f0" fontSize="8">Vaishya Guilds</text>
                      </g>

                      {/* Vector 4: Religious */}
                      <g
                        onClick={() => handleVectorClick('religious')}
                        onKeyDown={(e) => e.key === 'Enter' && handleVectorClick('religious')}
                        role="button"
                        tabIndex={0}
                        aria-label="Inspect Religious Ritual Fatigue Vector"
                        className="cursor-pointer group focus:outline-none"
                      >
                        <line x1="520" y1="190" x2="355" y2="165" stroke="#c084fc" strokeWidth="3" strokeDasharray="4 2" />
                        <circle cx="520" cy="190" r="32" fill={selectedVector === 'religious' ? '#7e22ce' : '#1e293b'} stroke="#a855f7" strokeWidth="2" />
                        <text x="520" y="188" textAnchor="middle" fill="#e9d5ff" fontSize="9" fontWeight="bold">4. RELIGIOUS</text>
                        <text x="520" y="202" textAnchor="middle" fill="#e2e8f0" fontSize="8">Ritual Fatigue</text>
                      </g>

                      {/* Vector 5: Linguistic */}
                      <g
                        onClick={() => handleVectorClick('linguistic')}
                        onKeyDown={(e) => e.key === 'Enter' && handleVectorClick('linguistic')}
                        role="button"
                        tabIndex={0}
                        aria-label="Inspect Vernacular Prakrit and Pali Vector"
                        className="cursor-pointer group focus:outline-none"
                      >
                        <line x1="210" y1="280" x2="275" y2="210" stroke="#4ade80" strokeWidth="3" strokeDasharray="4 2" />
                        <circle cx="210" cy="280" r="32" fill={selectedVector === 'linguistic' ? '#15803d' : '#1e293b'} stroke="#22c55e" strokeWidth="2" />
                        <text x="210" y="278" textAnchor="middle" fill="#bbf7d0" fontSize="9" fontWeight="bold">5. LINGUISTIC</text>
                        <text x="210" y="292" textAnchor="middle" fill="#e2e8f0" fontSize="8">Prakrit &amp; Pali</text>
                      </g>

                      {/* Vector 6: Political */}
                      <g
                        onClick={() => handleVectorClick('political')}
                        onKeyDown={(e) => e.key === 'Enter' && handleVectorClick('political')}
                        role="button"
                        tabIndex={0}
                        aria-label="Inspect Political Magadha Kings Vector"
                        className="cursor-pointer group focus:outline-none"
                      >
                        <line x1="390" y1="280" x2="325" y2="210" stroke="#f472b6" strokeWidth="3" strokeDasharray="4 2" />
                        <circle cx="390" cy="280" r="32" fill={selectedVector === 'political' ? '#be185d' : '#1e293b'} stroke="#ec4899" strokeWidth="2" />
                        <text x="390" y="278" textAnchor="middle" fill="#fbcfe8" fontSize="9" fontWeight="bold">6. POLITICAL</text>
                        <text x="390" y="292" textAnchor="middle" fill="#e2e8f0" fontSize="8">Magadha Kings</text>
                      </g>
                    </svg>
                  </div>

                  {selectedVector && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-amber-500/40">
                      <h4 className="text-xs uppercase font-black tracking-wider text-amber-400">Archival Evidence Analysis:</h4>
                      <p className="text-sm text-slate-200 mt-1 leading-relaxed">
                        {selectedVector === 'social' && 'Social Dimension: Priestly elites claimed hereditary monopoly over spiritual rites. Vaishya farmers and Shudra labourers found zero upward spiritual mobility in Vedic orthodoxy.'}
                        {selectedVector === 'economic' && 'Economic Dimension: Gangetic agriculture relied on plough oxen. Grand royal sacrifices slaughtering cattle directly attacked the productive capital of farming villages.'}
                        {selectedVector === 'mercantile' && 'Mercantile Ambition: Urban trade guilds (shrenis) amassed vast gold and silver wealth but remained ranked third in Vedic hierarchy. They embraced religions honouring ethical commerce.'}
                        {selectedVector === 'religious' && 'Religious Formalism: Sacrifices became expensive mechanical business by hired specialists. Seekers hungered for genuine moral transformation over costly blood rituals.'}
                        {selectedVector === 'linguistic' && 'Linguistic Democracy: Mahavira taught in Ardhamagadhi Prakrit; Buddha taught in Pali. For the first time, a potter or merchant heard sermons in their mother tongue!'}
                        {selectedVector === 'political' && 'Political Logic: Monarchs like Bimbisara and Ajatashatru supported Kshatriya prince-founders (Mahavira of Lichchhavis, Siddhartha of Shakyas) to counterbalance priestly political weight.'}
                      </p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── STEP 1: Jiva vs Anatta Metaphysics Chamber ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setMetaphysicsMode('jain')}
                      aria-label="Toggle to Jain Metaphysics: Eternal Jiva & Siddhashila"
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        metaphysicsMode === 'jain' ? 'bg-amber-600 border-amber-400 text-slate-950' : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      Jain Metaphysics: Eternal Jiva &amp; Siddhashila
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setMetaphysicsMode('buddhist')}
                      aria-label="Toggle to Buddhist Metaphysics: Anatta & Nirvana"
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        metaphysicsMode === 'buddhist' ? 'bg-gold-600 border-gold-400 text-slate-950' : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      Buddhist Metaphysics: Anatta &amp; Nirvana
                    </motion.button>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center gap-6 justify-around min-h-[220px]">
                    {metaphysicsMode === 'jain' ? (
                      <div className="text-center space-y-2">
                        <div className="relative w-48 h-48 mx-auto bg-slate-900 rounded-2xl border border-amber-600/40 p-2 overflow-hidden flex flex-col items-center justify-between">
                          <div className="w-full py-1 bg-amber-500/20 rounded text-[10px] font-bold text-amber-300">
                            Siddhashila (Summit of Cosmos)
                          </div>
                          <motion.div
                            animate={{ y: [20, -10, 20] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 shadow-xl shadow-amber-400/50 flex items-center justify-center text-xs font-black text-slate-950"
                          >
                            Jiva (Soul)
                          </motion.div>
                          <div className="text-[9px] text-slate-400">
                            Tapas Sheds Dravya Karma (Nirjara)
                          </div>
                        </div>
                        <p className="text-xs text-amber-300 font-semibold">Substantialist Ascent Model</p>
                      </div>
                    ) : (
                      <div className="text-center space-y-2">
                        <div className="relative w-48 h-48 mx-auto bg-slate-900 rounded-2xl border border-gold-600/40 p-2 flex flex-col items-center justify-between">
                          <div className="w-full py-1 bg-gold-500/20 rounded text-[10px] font-bold text-gold-300">
                            Nirvana (Extinguishing of Tanha)
                          </div>
                          <motion.div
                            animate={{ scale: [1, 0.4, 1], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="w-12 h-16 bg-gradient-to-t from-gold-500 to-transparent rounded-full blur-[2px]"
                          />
                          <div className="text-[9px] text-slate-400">
                            Anatta: 5 Skandhas Dissolve Without Residue
                          </div>
                        </div>
                        <p className="text-xs text-gold-300 font-semibold">Psychological Cessation Model</p>
                      </div>
                    )}

                    <div className="max-w-xs text-xs space-y-2 text-slate-300">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <strong className="text-amber-400">Key Takeaway for CISCE:</strong>
                        <p className="mt-1">
                          {metaphysicsMode === 'jain'
                            ? 'Jain Moksha is the physical ascent of an eternal real soul (jiva) to the summit of the universe once material karma (dravya) is burned away.'
                            : 'Buddhist Nirvana denies a permanent soul (anatta). It is the cessation of suffering when the fuel of craving (tanha) and ignorance (avijja) is completely blown out.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STEP 2: Mauryan Administration Simulator ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="text-slate-300 font-bold">Bhaga Land Tax Rate: {taxRateSlider}% (Standard: 1/6th = 16.67%)</span>
                      <span className="text-amber-400 font-bold">Pataliputra Treasury: {Math.round(taxRateSlider * 6.2)} Lakh Panas</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={35}
                      value={taxRateSlider}
                      onChange={(e) => handleTaxSliderChange(Number(e.target.value))}
                      aria-label="Bhaga Land Tax Rate Slider"
                      className="w-full accent-amber-500"
                    />

                    {/* 3-Tier Grid Diagram */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-gold-700/50">
                        <div className="font-bold text-gold-300 flex items-center gap-1">
                          <span>👑</span> Central Apex
                        </div>
                        <p className="text-slate-300 mt-1">Emperor + Mantriparishad</p>
                        <p className="text-[10px] text-slate-400 mt-1">Direct command of Gudhapurushas (Spies)</p>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-emerald-700/50">
                        <div className="font-bold text-emerald-300 flex items-center gap-1">
                          <span>⚖️</span> Revenue Duo
                        </div>
                        <p className="text-slate-200 mt-1"><strong>Samaharta:</strong> Collects {taxRateSlider}%</p>
                        <p className="text-slate-200"><strong>Sannidhata:</strong> Treasury Custody</p>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-amber-700/50">
                        <div className="font-bold text-amber-300 flex items-center gap-1">
                          <span>🏰</span> 4 Provinces (Kumaras)
                        </div>
                        <p className="text-slate-300 mt-1">Taxila, Ujjain, Tosali, Suvarnagiri</p>
                        <p className="text-[10px] text-slate-400 mt-1">Megasthenes: 6 boards of 5 in Pataliputra</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STEP 3: Ashoka Dhamma Moral Balance ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="text-rose-400 font-bold">War Drum (Bheri Ghosha): {bheriVolume}%</span>
                      <span className="text-gold-400 font-bold">Dhamma Ghosha &amp; Soft Power: {softPowerScore}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={dhammaPolicySlider}
                      onChange={(e) => handleDhammaSliderChange(Number(e.target.value))}
                      aria-label="Ashokan Dhamma Policy Slider"
                      className="w-full accent-gold-500"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="font-bold text-gold-300">🌿 Major Edict Policies Active:</div>
                        <ul className="mt-2 space-y-1 text-slate-300 text-[11px]">
                          <li>• Rock Edict 1: Animal sacrifices &amp; royal hunting banned</li>
                          <li>• Rock Edict 12: Absolute inter-religious tolerance</li>
                          <li>• Pillar Edict 2: Hospitals for humans &amp; animals, herbs</li>
                          <li>• Pillar Edict 7: Banyan groves &amp; wells for travellers</li>
                        </ul>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="font-bold text-amber-300">🌍 International Missions:</div>
                        <ul className="mt-2 space-y-1 text-slate-300 text-[11px]">
                          <li>• Sri Lanka: Mahendra &amp; Sanghamitra convert King Devanampiya Tissa at Mihintale</li>
                          <li>• 5 Hellenistic Kings: Antiochus II, Ptolemy II, Antigonus, Alexander, Magas (Rock Edict 13)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STEP 4: Sanchi Stupa Interactive Hotspots ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center gap-4">
                    <div className="w-full md:w-1/2">
                      <svg viewBox="0 0 400 280" className="w-full h-auto" role="img" aria-label="Interactive Diagram of Sanchi Stupa">
                        {/* Base Hill */}
                        <rect x="20" y="240" width="360" height="20" rx="4" fill="#334155" />

                        {/* Anda (Dome) */}
                        <path
                          d="M 60 240 A 140 140 0 0 1 340 240 Z"
                          fill={selectedStupaHotspot === 'anda' ? '#b45309' : '#1e293b'}
                          stroke="#f59e0b"
                          strokeWidth="2"
                          role="button"
                          tabIndex={0}
                          aria-label="Inspect Anda (Hemispherical Relic Dome)"
                          onClick={() => handleStupaHotspotClick('anda')}
                          onKeyDown={(e) => e.key === 'Enter' && handleStupaHotspotClick('anda')}
                          className="cursor-pointer transition-colors focus:outline-none"
                        />
                        <text x="200" y="190" textAnchor="middle" fill="#fde68a" fontSize="12" fontWeight="bold">
                          Anda (Relic Dome)
                        </text>

                        {/* Harmika */}
                        <rect
                          x="160"
                          y="85"
                          width="80"
                          height="25"
                          rx="3"
                          fill={selectedStupaHotspot === 'harmika' ? '#0369a1' : '#0f172a'}
                          stroke="#38bdf8"
                          strokeWidth="2"
                          role="button"
                          tabIndex={0}
                          aria-label="Inspect Harmika (Square Balcony Railing)"
                          onClick={() => handleStupaHotspotClick('harmika')}
                          onKeyDown={(e) => e.key === 'Enter' && handleStupaHotspotClick('harmika')}
                          className="cursor-pointer transition-colors focus:outline-none"
                        />
                        <text x="200" y="102" textAnchor="middle" fill="#bae6fd" fontSize="10" fontWeight="bold">
                          Harmika (Balcony)
                        </text>

                        {/* Chhatra */}
                        <g
                          role="button"
                          tabIndex={0}
                          aria-label="Inspect Chhatra (Triple Parasol)"
                          onClick={() => handleStupaHotspotClick('chhatra')}
                          onKeyDown={(e) => e.key === 'Enter' && handleStupaHotspotClick('chhatra')}
                          className="cursor-pointer focus:outline-none"
                        >
                          <line x1="200" y1="85" x2="200" y2="25" stroke="#e2e8f0" strokeWidth="3" />
                          <polygon points="175,45 225,45 200,30" fill={selectedStupaHotspot === 'chhatra' ? '#e11d48' : '#e2e8f0'} />
                          <polygon points="170,60 230,60 200,45" fill={selectedStupaHotspot === 'chhatra' ? '#e11d48' : '#cbd5e1'} />
                          <polygon points="165,75 235,75 200,60" fill={selectedStupaHotspot === 'chhatra' ? '#e11d48' : '#94a3b8'} />
                        </g>

                        {/* Torana Gates */}
                        <rect
                          x="40"
                          y="200"
                          width="30"
                          height="40"
                          fill={selectedStupaHotspot === 'torana' ? '#15803d' : '#1e293b'}
                          stroke="#22c55e"
                          strokeWidth="2"
                          role="button"
                          tabIndex={0}
                          aria-label="Inspect Torana (Ceremonial Gateway)"
                          onClick={() => handleStupaHotspotClick('torana')}
                          onKeyDown={(e) => e.key === 'Enter' && handleStupaHotspotClick('torana')}
                          className="cursor-pointer focus:outline-none"
                        />
                        <text x="55" y="225" textAnchor="middle" fill="#86efac" fontSize="8" fontWeight="bold">Gate</text>
                      </svg>
                    </div>

                    <div className="w-full md:w-1/2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      <h4 className="font-bold text-amber-300 uppercase tracking-wider mb-2">Architectural Inspection:</h4>
                      <p className="text-slate-200 leading-relaxed">
                        {selectedStupaHotspot === 'anda' && 'Anda: The solid hemispherical mound representing the cosmic egg, built over sacred Buddhist relics.'}
                        {selectedStupaHotspot === 'harmika' && 'Harmika: Square balcony-like railing perched atop the dome, designating the sacred residence of divinity.'}
                        {selectedStupaHotspot === 'chhatra' && 'Chhatra: Three-tiered parasol representing the Three Jewels and spiritual supremacy atop the central axis.'}
                        {selectedStupaHotspot === 'torana' && 'Toranas: 4 cardinal carved ceremonial gateways added by the Satavahana dynasty, depicting Jataka tales.'}
                        {!selectedStupaHotspot && 'Click on any part of the Stupa diagram to inspect its structural function and dynasty additions.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              aria-label="Previous Lab"
              className="px-4 py-2 bg-slate-800 disabled:opacity-40 text-slate-200 rounded-xl font-bold text-xs"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-bold">{currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextSlide}
                aria-label="Next Lab"
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-black text-xs shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToObserve}
                aria-label="Proceed to Observation Analysis"
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-black text-xs shadow-lg shadow-teal-600/30"
              >
                Complete Observations (What Do You Notice?) →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2B. OBSERVATION QUESTIONS PHASE (Brilliant Pattern) ─── */}
      {phase === 'observe' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-4 bg-teal-950/40 rounded-2xl border border-teal-500/40">
            <h2 className="text-base font-bold text-teal-300 flex items-center gap-2">
              <span>👁️</span> Brilliant.org Pattern: What Did You Notice?
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Reflect on what you directly observed in the interactive simulations. Solidify your empirical observations!
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="text-teal-400 font-bold uppercase tracking-wider">Observation {observeIndex + 1} of {OBSERVATION_QUESTIONS.length}</span>
              <span>Question ID: {OBSERVATION_QUESTIONS[observeIndex].id}</span>
            </div>

            <p className="text-base md:text-lg font-bold text-white">
              {OBSERVATION_QUESTIONS[observeIndex].question}
            </p>

            <div className="space-y-3">
              {OBSERVATION_QUESTIONS[observeIndex].observableOptions.map((opt, idx) => {
                const currentAns = observeAnswers[OBSERVATION_QUESTIONS[observeIndex].id];
                const isSelected = currentAns === idx;
                const answered = currentAns !== undefined;
                const isCorrect = idx === OBSERVATION_QUESTIONS[observeIndex].correctIndex;

                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleObserveAnswer(OBSERVATION_QUESTIONS[observeIndex].id, idx)}
                    disabled={answered}
                    aria-label={`Observation Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                    className={`w-full p-4 text-left rounded-xl border text-sm font-medium transition-all ${
                      answered && isCorrect
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md'
                        : answered && isSelected && !isCorrect
                        ? 'bg-rose-950/60 border-rose-600 text-rose-200'
                        : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-teal-400">
                      {answered && isCorrect ? '✓ ' : answered && isSelected && !isCorrect ? '✗ ' : ''}
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            {observeAnswers[OBSERVATION_QUESTIONS[observeIndex].id] !== undefined && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-teal-500/40 space-y-2">
                <p className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1">
                  <span>💡</span> Archival Observation Synthesis:
                </p>
                <p className="text-xs md:text-sm text-slate-200">
                  {OBSERVATION_QUESTIONS[observeIndex].explanation}
                </p>
              </motion.div>
            )}

            <div className="flex justify-between items-center pt-2">
              <button
                disabled={observeIndex === 0}
                onClick={() => setObserveIndex(i => Math.max(0, i - 1))}
                aria-label="Previous Observation"
                className="px-4 py-2 bg-slate-800 disabled:opacity-40 text-slate-300 rounded-xl text-xs font-bold"
              >
                ← Previous
              </button>

              {observeIndex < OBSERVATION_QUESTIONS.length - 1 ? (
                <button
                  disabled={observeAnswers[OBSERVATION_QUESTIONS[observeIndex].id] === undefined}
                  onClick={() => setObserveIndex(i => i + 1)}
                  aria-label="Next Observation"
                  className="px-5 py-2.5 bg-teal-500 disabled:opacity-40 text-slate-950 rounded-xl text-xs font-black"
                >
                  Next Observation →
                </button>
              ) : (
                <button
                  disabled={observeAnswers[OBSERVATION_QUESTIONS[observeIndex].id] === undefined}
                  onClick={handleAdvanceToSandbox}
                  aria-label="Enter Free Sandbox Mode"
                  className="px-6 py-2.5 bg-purple-600 disabled:opacity-40 text-white rounded-xl text-xs font-black shadow-lg shadow-purple-600/30"
                >
                  Proceed to Free Sandbox Simulator →
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-4 bg-purple-950/40 rounded-2xl border border-purple-600/40">
            <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
              <span>🧪</span> Ancient History Sandbox • Free Experimentation
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Adjust variables freely without grading. Observe how Gangetic economic tensions, vernacular reach, and treasury reserves interact.
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Empire &amp; Society Sliders:</h4>
              <div>
                <label className="text-xs text-slate-300 flex justify-between">
                  <span>Economic Sacrificial Tension</span>
                  <span className="font-bold text-amber-400">{sandboxEcoTension}%</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sandboxEcoTension}
                  onChange={(e) => setSandboxEcoTension(Number(e.target.value))}
                  aria-label="Economic Sacrificial Tension Slider"
                  className="w-full accent-amber-500 mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 flex justify-between">
                  <span>Prakrit / Pali Vernacular Reach</span>
                  <span className="font-bold text-gold-400">{sandboxPrakritReach}%</span>
                </label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={sandboxPrakritReach}
                  onChange={(e) => setSandboxPrakritReach(Number(e.target.value))}
                  aria-label="Prakrit and Pali Vernacular Reach Slider"
                  className="w-full accent-gold-500 mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 flex justify-between">
                  <span>Pataliputra Treasury Reserve</span>
                  <span className="font-bold text-emerald-400">{sandboxTreasuryVault}%</span>
                </label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={sandboxTreasuryVault}
                  onChange={(e) => setSandboxTreasuryVault(Number(e.target.value))}
                  aria-label="Pataliputra Treasury Reserve Slider"
                  className="w-full accent-emerald-500 mt-1"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">Simulated Outcome:</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {sandboxEcoTension > 60
                    ? '⚠️ Severe Agrarian Crisis: Farmer revolts in Kosala due to livestock drain on Vedic altars!'
                    : '🌾 Agrarian Stability: Plough oxen protected; agricultural yield flourishes across the Gangetic basin.'}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mt-2">
                  {sandboxPrakritReach > 50
                    ? '📢 Mass Spiritual Mobilization: Vernacular sermons in Magadha attract thousands of lay merchant followers.'
                    : '🔒 Restricted Knowledge: Elite Sanskrit barriers keep common people excluded from spiritual philosophy.'}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
                <span>Imperial Stability Rating:</span>
                <span className="font-bold text-amber-400">
                  {Math.round((100 - sandboxEcoTension + sandboxPrakritReach + sandboxTreasuryVault) / 3)} / 100
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label={`Start Graded Imperial Challenges (${filteredChallenges.length} Total)`}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl shadow-xl shadow-amber-500/20 text-sm flex items-center gap-2"
            >
              Start Graded Imperial Challenges ({filteredChallenges.length} Total) →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── 4. GRADED CHALLENGES PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Top Bar */}
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate-400 font-medium capitalize">
                  Competency: {challenge.competencyLevel}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-[11px] text-slate-500">Node: {challenge.nodeId}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Canvas live Dhamma wheel animation */}
              <canvas ref={canvasRef} width={60} height={40} className="rounded" aria-label="Rotating Dhamma Chakra Animation" />
              <div className="text-right">
                <div className="text-xs text-slate-400">Score</div>
                <div className="text-sm font-black text-amber-400">
                  {scoreBreakdown.correct} / {scoreBreakdown.total}
                </div>
              </div>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-gold-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Challenge Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500 shadow-xl shadow-rose-950/50'
                : 'border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-bold text-white mb-6 leading-relaxed">
              {challenge.question}
            </p>

            {/* MCQ / Classify / Distinguish / Match */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => {
                  const isCorrectChoice = showExplanation && i === challenge.correctIndex;
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                        isCorrectChoice
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold shadow-lg shadow-emerald-950/40'
                          : wrongFlash
                          ? 'bg-rose-950/40 border-rose-600/50 text-rose-200'
                          : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-black text-amber-400 mr-2">
                        {isCorrectChoice ? '✓ ' : wrongFlash ? '✗ ' : ''}
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Drag Label Diagram Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-amber-400 font-bold self-center mr-2">Drag Labels:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable component label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-lg cursor-grab text-xs font-bold shadow-md focus:outline-none"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'part_top', title: 'Top Apex Parasol' },
                    { id: 'part_middle', title: 'Balcony Railing Box' },
                    { id: 'part_dome', title: 'Solid Relic Mound' },
                    { id: 'part_gate', title: 'Ceremonial Gateways' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      aria-label={`Drop target for ${target.title}`}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col justify-between min-h-[85px]"
                    >
                      <span className="text-[11px] text-slate-400 font-bold">{target.title}</span>
                      <div className="mt-2 text-sm font-bold text-amber-300">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop label here...'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  aria-label="Verify Stupa Label Placements"
                  className="px-6 py-2.5 bg-amber-500 text-slate-950 font-black rounded-xl text-xs"
                >
                  Verify Stupa Label Placements
                </motion.button>
              </div>
            )}

            {/* Drag Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to rearrange into verified chronological / logical order:</p>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    role="button"
                    tabIndex={0}
                    aria-label={`Position ${displayIdx + 1}: ${item}`}
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-sm flex items-center gap-3 cursor-grab focus:outline-none"
                  >
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  aria-label="Verify Chronological Sequence"
                  className="mt-2 px-6 py-2.5 bg-amber-500 text-slate-950 font-black rounded-xl text-xs"
                >
                  Verify Chronological Sequence
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
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    aria-label={`Enter numerical value in ${challenge.unit || 'units'}`}
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-base font-bold w-44"
                  />
                  <span className="text-sm font-semibold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit numeric answer"
                    className="px-6 py-3 bg-amber-500 text-slate-950 font-black rounded-xl text-xs"
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-amber-400 font-bold self-center mr-2">Click to Append:</span>
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Append stage: ${part}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                  <button
                    onClick={handleResetConstruct}
                    aria-label="Reset constructed stages"
                    className="ml-auto text-xs text-rose-400 hover:underline font-bold"
                  >
                    Reset
                  </button>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-md text-xs font-bold">
                      {idx + 1}. {part}
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">No stages added yet...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Verify Constructed Sequence"
                  className="px-6 py-2.5 bg-amber-500 text-slate-950 font-black rounded-xl text-xs"
                >
                  Verify Constructed Sequence
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-600/40 rounded-xl space-y-3"
              >
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <span>📖</span> Verified Archival Explanation:
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
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <strong className="text-amber-400 mr-1.5">{i + 1}.</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    aria-label="Reveal Next Reasoning Step"
                    className="px-4 py-1.5 bg-amber-700/60 hover:bg-amber-700 text-amber-200 border border-amber-600 rounded-lg text-xs font-bold"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                ) : (
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Complete Final Certification' : 'Proceed to Next Challenge'}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs shadow-lg shadow-emerald-600/20"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? '✓ Complete Final Certification →' : '✓ Proceed to Next Challenge →'}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & MASTERY SUMMARY PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-900 rounded-2xl border border-emerald-600/40 text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-black text-white">🏆 Imperial Master Historian</h2>
            <p className="text-sm text-emerald-300 font-medium">
              ✓ You have mastered the causes for the rise of heterodox religions, core doctrines, and the Mauryan administrative state!
            </p>
            <div className="flex justify-center gap-6 pt-2">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Final Score</div>
                <div className="text-xl font-black text-amber-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">BKT Mastery Status</div>
                <div className="text-xl font-black text-emerald-400 capitalize">{masteryLevel}</div>
              </div>
            </div>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <strong className="text-amber-400">Mastery Assessment: </strong>
            {errors === 0
              ? '✓ PERFECT SCORE! Your mastery of 6th Century BCE Indian history and Mauryan statecraft is flawless.'
              : errors <= 3
              ? '✓ Exemplary work! You demonstrated strong multi-causal analytical reasoning. Review minor points to lock in 100%.'
              : 'Commendable effort! Review the misconception profile below to eliminate common traps and retry for mastery.'}
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/40 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Identified Misconception Profile:
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-300 font-bold">✗ Trap: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Archival Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* ─── PROMINENT SPACED REPETITION SCHEDULE (SRS VISIBILITY) ─── */}
          <div className="p-5 bg-gradient-to-r from-slate-900 via-gold-950/40 to-slate-900 rounded-2xl border-2 border-gold-500/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">📅</span>
                <h3 className="text-sm font-black text-gold-300 uppercase tracking-wider">
                  Adaptive Spaced Repetition Schedule (SM-2)
                </h3>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-black border ${
                errors === 0 ? 'bg-emerald-950 border-emerald-500 text-emerald-300' :
                errors <= 3 ? 'bg-gold-950 border-gold-500 text-gold-300' :
                'bg-amber-950 border-amber-500 text-amber-300'
              }`}>
                {errors === 0 ? 'Next: 7 Days' : errors <= 3 ? 'Next: 3 Days' : 'Next: 1 Day'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className={`p-3 rounded-xl border text-xs ${
                errors === 0
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60'
              }`}>
                <div className="font-bold">🌟 0 Errors: Review in 7 days</div>
                <p className="text-[11px] mt-1 text-slate-400">Long-term consolidation interval. Topic locked into permanent semantic memory.</p>
              </div>

              <div className={`p-3 rounded-xl border text-xs ${
                errors >= 1 && errors <= 3
                  ? 'bg-gold-950/60 border-gold-500 text-gold-200 ring-2 ring-gold-500/30'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60'
              }`}>
                <div className="font-bold">⚡ 1–3 Errors: Review in 3 days</div>
                <p className="text-[11px] mt-1 text-slate-400">Medium interval. Strengthen conceptual connections before memory decay begins.</p>
              </div>

              <div className={`p-3 rounded-xl border text-xs ${
                errors >= 4
                  ? 'bg-amber-950/60 border-amber-500 text-amber-200 ring-2 ring-amber-500/30'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60'
              }`}>
                <div className="font-bold">🔄 4+ Errors: Review in 1 day</div>
                <p className="text-[11px] mt-1 text-slate-400">High-priority interval. Immediate recap of Kautilyan administration &amp; Jain/Buddhist doctrines.</p>
              </div>
            </div>

            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
              <span>Your Recommended Next Study Session:</span>
              <strong className="text-gold-300">
                {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
              </strong>
            </div>
          </div>

          {/* Real World Activity */}
          <div className="p-5 bg-gradient-to-br from-gold-950/40 to-slate-900 rounded-2xl border border-gold-700/40 space-y-3">
            <h3 className="text-sm font-bold text-gold-300 flex items-center gap-2">
              <span>🏛️</span> Real-World Application: {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800 text-[11px] text-slate-300">
                  <strong className="text-gold-400 mr-1">{idx + 1}.</strong> {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK BANNERS & PARTICLES ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Imperial Challenge Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_HistoryCivicsCausesRiseJainismSim;
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

// ─── NODE ID LITERALS (MANDATORY VERIFICATION CONSTANTS) ─��─
const NODE_C6_HISTCIV_011 = 'c6_histciv_011';
const NODE_C6_HISTCIV_012 = 'c6_histciv_012';
const NODE_C6_HISTCIV_013 = 'c6_histciv_013';
const NODE_C6_HISTCIV_014 = 'c6_histciv_014';
const NODE_C6_HISTCIV_015 = 'c6_histciv_015';
const NODE_C6_HISTCIV_016 = 'c6_histciv_016';
const NODE_C6_HISTCIV_017 = 'c6_histciv_017';
const NODE_C6_HISTCIV_018 = 'c6_histciv_018';
const NODE_C6_HISTCIV_019 = 'c6_histciv_019';
const NODE_C6_HISTCIV_020 = 'c6_histciv_020';

const ALL_NODE_IDS = [
  NODE_C6_HISTCIV_011,
  NODE_C6_HISTCIV_012,
  NODE_C6_HISTCIV_013,
  NODE_C6_HISTCIV_014,
  NODE_C6_HISTCIV_015,
  NODE_C6_HISTCIV_016,
  NODE_C6_HISTCIV_017,
  NODE_C6_HISTCIV_018,
  NODE_C6_HISTCIV_019,
  NODE_C6_HISTCIV_020,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'The Great River & Epic Chronicle: Unlocking Ancient Civilisations',
  intro:
    'You are the Chief Curatorial Archaeologist at the National Heritage Institute. A vault of ancient artifacts, undeciphered seal impressions, royal papyri, cuneiform tablets, oracle bones, and Vedic manuscripts has arrived from four river valleys and the Gangetic plain.',
  context:
    'Your mission: investigate the evidence without confusing historical inference with proven text, restore the comparative heritage of humanity, trace the Aryan pastoral migration into Sapta Sindhu, and map the evolution of India’s timeless epics and philosophies.',
};

// ─── DISCOVERY HOOK (Low stakes, curiosity-building puzzle) ───
const DISCOVERY_QUESTION = {
  question:
    'Look at the steatite seals and terracotta figurines of the Indus Valley. Why do historians say we can only "infer" their religious beliefs and political system, whereas we can read Egyptian Pharaohs\' actual words?',
  options: [
    'The Indus people left no inscriptions or written signs at all.',
    'The Indus script on seals remains undeciphered, while Egyptian hieroglyphics were cracked via the Rosetta Stone.',
    'The Indus people only had oral hymns and spoke modern Sanskrit.',
    'All Indus writings were destroyed in a single violent war in 1500 BCE.',
  ],
  correctIndex: 1,
  hintAfter:
    'Exactly! The Indus script is a silent lock. Every claim about Harappan kings or gods is an archaeological inference, not a written fact.',
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

// ─── CHALLENGES ARRAY (24 Comprehensive Competency & Syllabus Aligned Challenges) ───
const CHALLENGES: Challenge[] = [
  // Foundation (1 - 8)
  {
    id: 'ch_f01',
    nodeId: NODE_C6_HISTCIV_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Which of the following crafts was practiced at Lothal and Chanhudaro using specialized chert drills to shape carnelian, agate, and lapis lazuli?',
    options: ['Papyrus rolling', 'Bead-making and lapidary work', 'Silk reeling', 'Cuneiform stamp pressing'],
    correctIndex: 1,
    explanation:
      'Bead-making workshops with furnaces and micro-drills have been excavated at Chanhudaro and Lothal. These carnelian beads were prized exports.',
    hints: [
      'Think of tiny ornamental items found in large quantities in Gujarat and Sindh workshops.',
      'Workers drilled through stones like carnelian and lapis lazuli.',
      'Chanhudaro and Lothal were world-famous bead-making centers.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_f02',
    nodeId: NODE_C6_HISTCIV_013,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Why is the southern region of ancient Egypt called "Upper Egypt" while the northern delta is called "Lower Egypt"?',
    options: [
      'Upper Egypt was politically superior to Lower Egypt.',
      'The Nile flows from south (higher elevation upstream) to north (downstream delta into Mediterranean).',
      'The pyramids were only built in Upper Egypt.',
      'Map makers placed south at the top of all ancient maps.',
    ],
    correctIndex: 1,
    explanation:
      'The Nile flows from south to north. "Upper Egypt" is upstream in the highlands, and "Lower Egypt" is downstream where the river fans into the Mediterranean.',
    hints: [
      'Look at the direction of river flow rather than top and bottom of modern maps.',
      'Water flows down from mountains towards the sea.',
      'Upstream is "Upper" and downstream near the sea is "Lower".',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_f03',
    nodeId: NODE_C6_HISTCIV_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'What was the primary writing technique of the Sumerians in Mesopotamia that produced "cuneiform"?',
    options: [
      'Carving hieroglyphs into diorite stone pillars with bronze chisels',
      'Pressing a wedge-shaped reed stylus into soft, wet clay tablets',
      'Brushing ink onto mulberry paper sheets',
      'Scratching characters on heated turtle shells',
    ],
    correctIndex: 1,
    explanation:
      'Cuneiform (from Latin "cuneus" meaning wedge) was created by pressing a cut reed stylus into wet clay tablets, which were then baked or sun-dried.',
    hints: [
      'The word "cuneus" in Latin means "wedge".',
      'The writing material was riverbed mud/clay, and the tool was a reed.',
      'Pressing the triangular tip of a reed into soft clay created wedge signs.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_f04',
    nodeId: NODE_C6_HISTCIV_017,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each ancient river name of Sapta Sindhu to its correct historical identification.',
    dragItems: [
      { label: 'Indus (Sindhu)', targetId: 't_indus' },
      { label: 'Saraswati (Ghaggar-Hakra)', targetId: 't_saraswati' },
      { label: 'Ravi (Parushni)', targetId: 't_ravi' },
      { label: 'Jhelum (Vitasta)', targetId: 't_jhelum' },
    ],
    correctMapping: {
      t_indus: 'Indus (Sindhu)',
      t_saraswati: 'Saraswati (Ghaggar-Hakra)',
      t_ravi: 'Ravi (Parushni)',
      t_jhelum: 'Jhelum (Vitasta)',
    },
    explanation:
      'Sapta Sindhu ("land of seven rivers") included the Indus, its five Punjab tributaries (Jhelum, Chenab, Ravi, Beas, Sutlej), and the dried Saraswati (Ghaggar-Hakra).',
    hints: [
      'The main river is Sindhu (Indus).',
      'The dried river identified with Ghaggar-Hakra is the Saraswati.',
      'Vitasta is Jhelum, and Parushni is Ravi.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_f05',
    nodeId: NODE_C6_HISTCIV_018,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Which Veda is the oldest, containing 1,028 hymns (suktas) in 10 mandalas dedicated to deities like Agni, Indra, and Varuna?',
    options: ['Sama Veda', 'Yajur Veda', 'Rig Veda', 'Atharva Veda'],
    correctIndex: 2,
    explanation:
      'The Rig Veda, composed c. 1500–1000 BCE in Sapta Sindhu, is the oldest collection of 1,028 sacred hymns.',
    hints: [
      'It contains the Gayatri Mantra and the Nasadiya Sukta.',
      'It is the foundational hymnbook from which the Sama Veda borrows its verses.',
      'The name starts with "Rig".',
    ],
  },
  {
    id: 'ch_f06',
    nodeId: NODE_C6_HISTCIV_019,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'What does the Sanskrit word "Upanishad" literally mean, reflecting its distinctive method of teaching?',
    options: [
      'Chanting loudly at a public sacrifice',
      'Sitting down near the teacher for intimate philosophical dialogue',
      'A collection of 18 mythological stories of kings',
      'Rules carved on stone pillars by the king',
    ],
    correctIndex: 1,
    explanation:
      'Upa (near) + ni (down) + shad (sit) = "sitting down near" a guru to learn esoteric philosophical wisdom about Brahman and Atman.',
    hints: [
      'Think of a guru-shishya setting in a peaceful forest hermitage.',
      'It involves a student sitting close to the master.',
      'It describes "sitting down near" the teacher.',
    ],
  },
  {
    id: 'ch_f07',
    nodeId: NODE_C6_HISTCIV_020,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Who are the traditional authors attributed to the Ramayana (adi-kavi) and the Mahabharata respectively?',
    options: [
      'Sage Vyasa for Ramayana; Sage Valmiki for Mahabharata',
      'Sage Valmiki for Ramayana; Sage Vyasa for Mahabharata',
      'Tulsidas for Ramayana; Kamban for Mahabharata',
      'King Janaka for Ramayana; Krishna for Mahabharata',
    ],
    correctIndex: 1,
    explanation:
      'Valmiki is revered as the adi-kavi (first poet) of the Ramayana (~24,000 shlokas), while Vyasa is attributed as the composer of the Mahabharata (>100,000 shlokas).',
    hints: [
      'Do not swap the two sages.',
      'Valmiki composed the story of Rama.',
      'Vyasa arranged the Vedas and composed the epic of the Pandavas and Kauravas.',
    ],
  },
  {
    id: 'ch_f08',
    nodeId: NODE_C6_HISTCIV_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Why is the Hwang Ho called the "Yellow River" and historically feared as "China\'s Sorrow"?',
    options: [
      'It carried yellow sulfur from volcanoes and poisoned drinking water.',
      'It carries fine yellow loess soil that fertilely enriches fields but historically caused catastrophic, course-shifting floods.',
      'Yellow flags were flown along its banks during Shang dynasty wars.',
      'It was dyed yellow with silk waste from royal looms.',
    ],
    correctIndex: 1,
    explanation:
      'Loess (wind-blown silt) gives the river its yellow color and fertile floodplain, but violent breaches claimed countless lives, earning it the name "China\'s Sorrow".',
    hints: [
      'Think of fine wind-blown dust from the northern plateau.',
      'The soil is called "loess".',
      'It made farming rich but floods were devastating and unpredictable.',
    ],
  },

  // Standard (9 - 16)
  {
    id: 'ch_s01',
    nodeId: NODE_C6_HISTCIV_011,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Archaeologists find varied house sizes at Mohenjo-daro (from 1-room quarters to 2-storey courtyard mansions), yet no lavish royal tombs or palaces. What is the most accurate historical deduction?',
    options: [
      'Harappans were ruled by an all-powerful pharaoh who lived secretly.',
      'Society had economic stratification, but authority was collective/guild-based rather than ostentatious hereditary monarchy.',
      'All Harappan citizens were completely identical in wealth and power.',
      'The cities had no laws, no leaders, and no trade rules.',
    ],
    correctIndex: 1,
    explanation:
      'Differing house sizes prove economic levels (stratification), while the lack of royal monuments/tombs suggests civic councils or merchant guilds governed without divine monarchies.',
    hints: [
      'Compare this to Egyptian Pharaohs with colossal pyramids.',
      'Different house sizes mean different wealth levels.',
      'No royal palaces means governance was likely civic or collective.',
    ],
  },
  {
    id: 'ch_s02',
    nodeId: NODE_C6_HISTCIV_012,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question:
      'Why is Mortimer Wheeler’s 1947 "Aryan massacre/invasion theory" for the fall of Mohenjo-daro rejected today by physical anthropologists?',
    options: [
      'All skeletons disappeared from museums before testing.',
      'Anthropological analysis shows skeletons have no weapon cuts or trauma, and radiocarbon dates prove the cities declined centuries before any Aryan arrival.',
      'The Harappans successfully defeated all northern invaders.',
      'Mohenjo-daro was never abandoned and is still inhabited.',
    ],
    correctIndex: 1,
    explanation:
      'Kenneth Kennedy’s analysis revealed no signs of violent slaughter on bones, and the cities decayed gradually after 1900 BCE due to river shifts, floods, and ecological changes.',
    hints: [
      'Examine the biological evidence on the excavated bones.',
      'Did the skeletons show sword marks or arrow trauma? No.',
      'The chronology of decline (1900-1750 BCE) does not match the 1500 BCE arrival date.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_s03',
    nodeId: NODE_C6_HISTCIV_014,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'How does the Ziggurat of Ur fundamentally differ in purpose and architecture from the Great Pyramid of Giza?',
    options: [
      'A ziggurat was a sealed tomb for dead kings, while a pyramid was an open grain market.',
      'A ziggurat was a stepped temple tower climbed daily by priests to worship a living patron god; a pyramid was a sealed stone tomb for a deceased Pharaoh.',
      'Ziggurats were built of granite blocks, while pyramids were made of soft mud.',
      'There is no difference; both were defensive watchtowers.',
    ],
    correctIndex: 1,
    explanation:
      'The Ziggurat of Ur had stairs leading to an active shrine at the top for the moon god Nanna. The Great Pyramid of Giza was an impenetrable sealed tomb for Khufu’s afterlife.',
    hints: [
      'Who climbed the ziggurat, and what was at the top?',
      'One was a living active temple; the other was a sealed royal burial.',
      'Pyramid = tomb; Ziggurat = stepped temple tower.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_s04',
    nodeId: NODE_C6_HISTCIV_016,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Arrange these ancient civilizations in chronological order of their earliest settled urban/writing emergence.',
    sortItems: [
      'Mesopotamia (Sumerian cuneiform & cities, c. 3500-3200 BCE)',
      'Egyptian Civilisation (Unification under Narmer, c. 3100 BCE)',
      'Indus Valley Civilisation (Mature Harappan phase, c. 2500 BCE)',
      'Shang Dynasty China (Jiaguwen oracle bone script, c. 1600 BCE)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Mesopotamia (c. 3500-3200 BCE) → Egypt (c. 3100 BCE) → Mature Harappan IVC (c. 2500 BCE) → Shang China (c. 1600 BCE).',
    hints: [
      'Mesopotamian cuneiform on clay is the earliest known writing (~3200 BCE).',
      'Egyptian unification occurred around 3100 BCE.',
      'The Mature Harappan urban boom occurred c. 2500 BCE.',
    ],
  },
  {
    id: 'ch_s05',
    nodeId: NODE_C6_HISTCIV_017,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'If the Mature Harappan urban decline concluded around 1750 BCE and the pastoral Aryans arrived in Sapta Sindhu around 1500 BCE, how many years was the temporal gap between the city decline and Aryan arrival?',
    correctAnswer: 250,
    tolerance: 10,
    unit: 'years',
    explanation:
      '1750 BCE - 1500 BCE = 250 years. This substantial gap proves the Aryans arrived to find cities that had already been deserted for generations.',
    hints: [
      'Subtract 1500 BCE from 1750 BCE.',
      '1750 minus 1500 equals...?',
      'The gap is roughly two and a half centuries (250 years).',
    ],
  },
  {
    id: 'ch_s06',
    nodeId: NODE_C6_HISTCIV_018,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Match the four Vedas with their primary distinctive contents and functions:',
    options: [
      'Rig = Chants; Sama = Hymns; Yajur = Spells; Atharva = Formulas',
      'Rig = Hymns of praise; Sama = Melodic chants; Yajur = Sacrificial ritual formulas; Atharva = Everyday spells, medicine & iron reference ("krishna ayas")',
      'Rig = Law code; Sama = Epics; Yajur = Philosophy; Atharva = Astronomy',
      'Rig = Forest dialogues; Sama = Royal genealogies; Yajur = Granary records; Atharva = Songs',
    ],
    correctIndex: 1,
    explanation:
      'Rig = 1,028 praise hymns; Sama = musical notation for soma ritual; Yajur = priest formulas (yajus); Atharva = medicine, charms, and earliest reference to iron ("krishna ayas").',
    hints: [
      'Rig Veda is the root praise book.',
      'Sama is song and melody.',
      'Atharva contains daily remedies and refers to iron as "krishna ayas".',
    ],
  },
  {
    id: 'ch_s07',
    nodeId: NODE_C6_HISTCIV_019,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Why are the Vedas and Upanishads classified as "Shruti", whereas the Puranas and Epics are classified as "Smriti"?',
    options: [
      'Shruti means written on stone; Smriti means printed on paper.',
      'Shruti ("that which was heard") represents eternal revealed truths heard by rishis; Smriti ("that which is remembered") represents human traditions and narratives.',
      'Shruti was composed in English; Smriti was composed in Prakrit.',
      'Shruti is only for kings; Smriti is only for warriors.',
    ],
    correctIndex: 1,
    explanation:
      'Shruti refers to divinely revealed knowledge of highest authority (Vedas & Upanishads/Vedanta). Smriti refers to remembered human compositions (Puranas, Itihasa, Dharmashastras).',
    hints: [
      'What do the Sanskrit roots "shru" (to hear) and "smri" (to remember) mean?',
      'One is revealed divine sound; the other is human remembered tradition.',
      'Shruti = Heard revelation; Smriti = Remembered human tradition.',
    ],
  },
  {
    id: 'ch_s08',
    nodeId: NODE_C6_HISTCIV_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Where is the Bhagavad Gita physically situated within ancient Indian literature, and what is its core setting?',
    options: [
      'It is a separate standalone Veda composed before the Rig Veda.',
      'It is an embedded 700-verse section in the Bhishma Parva of the Mahabharata, spoken by Krishna to Arjuna on the battlefield of Kurukshetra.',
      'It is the 7th book (Uttara Kanda) of the Ramayana.',
      'It is one of the 18 Puranas compiled by King Ashoka.',
    ],
    correctIndex: 1,
    explanation:
      'The Bhagavad Gita is not a separate scripture; it is chapters 25-42 of the Bhishma Parva of Vyasa’s Mahabharata, addressing Arjuna’s moral crisis of dharma.',
    hints: [
      'Is the Gita a standalone book or inside an epic?',
      'It occurs right before the 18-day Kurukshetra war in the Mahabharata.',
      'It is nestled in the Bhishma Parva.',
    ],
    misconceptionIndex: 5,
  },

  // Advanced (17 - 24)
  {
    id: 'ch_a01',
    nodeId: NODE_C6_HISTCIV_016,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Evaluate which modern legacy is accurately paired with its originating river valley civilization without cross-attribution:',
    options: [
      'Mesopotamia → 365-day solar calendar; Egypt → 60-base sexagesimal time; China → Underground grid drains',
      'Mesopotamia → 60-base sexagesimal system (60s/min, 360° circle); Egypt → 365-day calendar; IVC → Covered drains & cotton; China → Sericulture (silk)',
      'IVC → 360-degree circle; Mesopotamia → Silk; Egypt → Cuneiform; China → Great Bath',
      'Egypt → Standardized 4:2:1 brick ratio; IVC → Mummification; China → Ziggurats; Mesopotamia → Hieroglyphics',
    ],
    correctIndex: 1,
    explanation:
      'Mesopotamia contributed the base-60 system (clocks & geometry). Egypt developed the 365-day solar calendar. IVC pioneered municipal drainage and cotton. China invented silk (sericulture).',
    hints: [
      'Who gave us 60 seconds in a minute and 360 degrees in a circle? (Tigris-Euphrates).',
      'Who calculated the 365-day year based on the Nile flood and Sirius star? (Egypt).',
      'Who cultivated cotton (sindon) and built brick manholes? (Harappa).',
    ],
  },
  {
    id: 'ch_a02',
    nodeId: NODE_C6_HISTCIV_011,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Assemble the valid archaeological evidence that proves long-distance trade existed between Harappa and Mesopotamia (Meluhha) c. 2350 BCE.',
    availableParts: [
      'Harappan steatite seals found at Ur & Kish',
      'Lothal brick dockyard basin (219m x 37m)',
      'Mesopotamian royal records naming Meluhha trade',
      'Etched carnelian beads in Sumerian tombs',
      'Signed paper peace treaties in Sanskrit',
    ],
    targetState:
      'Harappan steatite seals found at Ur & Kish Lothal brick dockyard basin (219m x 37m) Mesopotamian royal records naming Meluhha trade Etched carnelian beads in Sumerian tombs',
    validationHint:
      'Include all physical and textual trade evidence from the Bronze Age, but exclude impossible later items (paper/Sanskrit treaties).',
    explanation:
      'Seals at Ur, the tidal dockyard at Lothal, Akkadian cuneiform inscriptions mentioning Meluhha, and carnelian beads prove an active Persian Gulf trade network.',
    hints: [
      'Did they have paper treaties in 2350 BCE? No.',
      'Select the 4 authentic archaeological clues from Ur, Lothal, and Akkadian texts.',
      'Add the seals, dockyard, Meluhha records, and etched carnelian beads.',
    ],
  },
  {
    id: 'ch_a03',
    nodeId: NODE_C6_HISTCIV_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'Why was the technological shift to iron ("krishna ayas") around 1000 BCE essential for the Aryans to expand from Sapta Sindhu into the Gangetic Valley?',
    options: [
      'Copper axes melted in the hot Gangetic summer.',
      'The dense monsoon sal forests and heavy alluvial clay soils of the Ganga-Yamuna doab required tough iron axes and iron ploughshares.',
      'Vedic horses could only walk on iron-paved roads.',
      'Mesopotamian traders demanded iron bars as payment for cattle.',
    ],
    correctIndex: 1,
    explanation:
      'Copper and bronze tools were too soft to clear the dense humid forests of the Gangetic plain or break its heavy clay soils. Iron axes and ploughs made permanent agrarian kingdoms possible.',
    hints: [
      'Think of the difference between the dry northwest and the wet, dense forests of Bihar/UP.',
      'Could soft copper tools chop down deep sal forests?',
      'Iron provided hard axes for clearing and heavy ploughshares for thick soil.',
    ],
  },
  {
    id: 'ch_a04',
    nodeId: NODE_C6_HISTCIV_019,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'In the Chandogya Upanishad, the sage Uddalaka Aruni tells his son Shvetaketu "Tat Tvam Asi" (That Thou Art). What foundational philosophical doctrine does this declare?',
    options: [
      'The individual soul (Atman) is identical with the supreme cosmic reality (Brahman).',
      'Kings must sacrifice 1,000 horses to gain political power.',
      'Gods and humans can never communicate without animal offerings.',
      'The material world was created out of four physical elements only.',
    ],
    correctIndex: 0,
    explanation:
      '"Tat Tvam Asi" asserts that the individual inner self (Atman) is non-different from the infinite universal consciousness (Brahman), shifting focus from external ritual to internal spiritual liberation (moksha).',
    hints: [
      'Translate "Tat" (That/Brahman) and "Tvam" (Thou/Atman).',
      'It expresses non-duality and unity of the soul with the universe.',
      'Atman equals Brahman.',
    ],
  },
  {
    id: 'ch_a05',
    nodeId: NODE_C6_HISTCIV_012,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'What proves that the decline of the Indus Valley was "dispersal and cultural continuity" rather than total human extinction?',
    options: [
      'Late Harappan cultures (Jhukar, Cemetery H) carried pottery, cotton, bead-drilling, the 4:2:1 brick ratio, and pipal/swastika motifs into eastern and southern regions.',
      'Modern Indian cities are built on exact Harappan ruins using the same clay bricks.',
      'All Harappan citizens moved to Egypt and built Alexandria.',
      'The Harappan language became modern Latin.',
    ],
    correctIndex: 0,
    explanation:
      'The people relocated eastward towards the Ganga and southward to Gujarat. Their crafts (cotton, bead-drilling in Khambhat) and sacred symbols (pipal, proto-Shiva, swastika) were absorbed into later Indian culture.',
    hints: [
      'Look at living Indian practices today: cotton textiles, peeping peepal worship, swastika symbols.',
      'Late Harappan rural settlements show gradual relocation, not extinction.',
      'Cultural skills were preserved and passed down to future generations.',
    ],
  },
  {
    id: 'ch_a06',
    nodeId: NODE_C6_HISTCIV_013,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'understanding',
    question:
      'Order the 5 critical stages of the 70-day Egyptian mummification ritual for preserving the Pharaoh’s soul (ka):',
    sortItems: [
      'Removal of internal organs (lungs, liver, stomach, intestines into canopic jars; heart retained)',
      'Dehydration of the corpse in natural natron salt crystals for 40 days',
      'Treating the dried body with fragrant oils, resins, and perfumes',
      'Wrapping in hundreds of yards of fine linen bandages with protective scarab amulets',
      'Encasement inside nested painted wooden coffins and the stone sarcophagus',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      'Organ extraction (heart kept for weighing) → 40-day natron desiccation → oil purification → linen wrapping with amulets → burial in sarcophagus.',
    hints: [
      'Moisture causes decay, so wet organs must be removed and dried first.',
      'Natron salt draws out all moisture over 40 days.',
      'Wrapping and amulets come after drying, followed by placement in the sarcophagus.',
    ],
  },
  {
    id: 'ch_a07',
    nodeId: NODE_C6_HISTCIV_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Why is Shang dynasty oracle bone script (jiaguwen) uniquely revered in global linguistic history compared to Egyptian hieroglyphs or Mesopotamian cuneiform?',
    options: [
      'It was written using golden ink pens that never faded.',
      'It represents an unbroken, continuous evolutionary lineage directly ancestral to modern Chinese characters used by over 1.4 billion people today.',
      'It was the only script in history invented without religious priests.',
      'It was copied directly from Indian Indus seals.',
    ],
    correctIndex: 1,
    explanation:
      'Hieroglyphs and cuneiform died out and had to be deciphered by modern scholars. Chinese script evolved organically from Shang oracle bones into modern Hanzi without interruption.',
    hints: [
      'Think about whether modern Egyptians write hieroglyphs or modern Iraqis write cuneiform.',
      'Is Chinese script still read and written today?',
      'It is an unbroken living writing system spanning over 3,000 years.',
    ],
  },
  {
    id: 'ch_a08',
    nodeId: NODE_C6_HISTCIV_020,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'How does the genre of "Itihasa" (legendary history) explain why the epics like the Ramayana and Mahabharata inspired diverse regional retellings (e.g., Kamban’s Tamil Ramayana, Tulsidas’s Ramcharitmanas)?',
    options: [
      'Itihasa was strictly copyright-protected by royal decrees prohibiting translation.',
      'Because itihasa weaves core historical memories of transition to statehood with moral archetypes of dharma, allowing every linguistic culture to adapt the narrative to local idioms.',
      'Regional poets were legally forced by kings to copy Sanskrit texts word-for-word.',
      'The original Sanskrit texts were completely lost during the Iron Age.',
    ],
    correctIndex: 1,
    explanation:
      'Itihasa ("thus indeed it happened") provides an elastic cultural framework of ethical dilemmas (dharma) that regional cultures personalized in their vernacular tongues to reach all levels of society.',
    hints: [
      'Think about why ordinary villagers perform Ram Lila or read Awadhi/Tamil versions.',
      'Itihasa carries dynamic ethical values rather than static, unchangeable law codes.',
      'It allowed communities to adapt the eternal message of dharma to their own language.',
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

// ─── DEFAULT PROPS WITH ENRICHED CISCE DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: 'c6_histciv_011',
  title: 'Indus Valley Society, Ancient Civilisations & The Epic Age',
  definition:
    'An integrated exploration of the four great Bronze Age River Valley Civilisations (Indus, Nile, Tigris-Euphrates, Hwang Ho), the transition from urban decline to Aryan pastoral migration in Sapta Sindhu, and the literary-philosophical evolution from the Four Vedas and Upanishads to the Great Epics.',
  eli5:
    'Think of early history like four great family settlements built by mighty rivers that gave water and crops. As the Indus cities slowly dried and dispersed, new pastoral families arrived, singing sacred hymns (Vedas), debating deep questions under forest trees (Upanishads), and telling epic stories of duty and courage (Ramayana & Mahabharata) that Indian families still cherish today.',
  misconceptions: [
    {
      misconception: 'The Indus script has been deciphered and proves Harappans had monarchical kings.',
      correction:
        'The Indus script remains undeciphered. All conclusions about Harappan society, occupations, and religion are archaeological inferences from material remains, not readings of historical texts.',
    },
    {
      misconception: 'The Nile flows from north to south just like the Ganga.',
      correction:
        'The Nile flows from south to north into the Mediterranean. "Upper Egypt" is in the south (upstream highlands) and "Lower Egypt" is in the north (downstream delta).',
    },
    {
      misconception: 'A Mesopotamian ziggurat is the same thing as an Egyptian pyramid.',
      correction:
        'A pyramid is a sealed monumental stone tomb for a deceased pharaoh. A ziggurat is a stepped, terraced temple tower climbed daily by priests to worship an active patron god.',
    },
    {
      misconception: 'Sapta Sindhu means the entire Indian subcontinent.',
      correction:
        'Sapta Sindhu ("land of seven rivers") refers specifically to the northwest region of Punjab and Haryana (Indus, Jhelum, Chenab, Ravi, Beas, Sutlej, and dried Saraswati).',
    },
    {
      misconception: 'The Indus Valley was wiped out overnight in a violent Aryan massacre.',
      correction:
        'Excavated skeletons show no trauma marks, and radiocarbon dating confirms IVC cities decayed gradually (c. 1900-1750 BCE) due to river shifts, floods, and ecological changes, centuries before Aryan arrival.',
    },
    {
      misconception: 'The Bhagavad Gita is an independent standalone Veda.',
      correction:
        'The Bhagavad Gita is an embedded 700-verse philosophical section in chapters 25–42 of the Bhishma Parva of the epic Mahabharata.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which ancient civilization built the world’s first covered brick underground drainage system with manholes?',
      options: ['Egyptian', 'Mesopotamian', 'Indus Valley', 'Shang China'],
      correctIndex: 2,
    },
    {
      question: 'Which artifact unlocked the mystery of Egyptian hieroglyphics in 1822 CE?',
      options: ['The Pashupati Seal', 'The Rosetta Stone', 'The Code of Hammurabi', 'Anyang Oracle Bones'],
      correctIndex: 1,
    },
    {
      question: 'What is the sexagesimal (base-60) number system inherited from?',
      options: ['Mesopotamia', 'Egypt', 'Indus Valley', 'Vedic Aryans'],
      correctIndex: 0,
    },
    {
      question: 'What metal was called "krishna ayas" in the Atharva Veda, powering the Gangetic clearing c. 1000 BCE?',
      options: ['Copper', 'Bronze', 'Iron', 'Gold'],
      correctIndex: 2,
    },
    {
      question: 'The famous philosophical phrase "Tat Tvam Asi" is found in which Upanishad?',
      options: ['Brihadaranyaka', 'Chandogya', 'Katha', 'Kena'],
      correctIndex: 1,
    },
    {
      question: 'Who compiled the critical edition of the Mahabharata at BORI, Pune (1919–1966)?',
      options: ['Max Müller', 'V.S. Sukthankar and scholars', 'Howard Carter', 'S.R. Rao'],
      correctIndex: 1,
    },
    {
      question: 'Which Chinese river carried yellow loess silt but was dreaded as "China’s Sorrow"?',
      options: ['Yangtze', 'Hwang Ho (Yellow River)', 'Mekong', 'Pearl River'],
      correctIndex: 1,
    },
    {
      question: 'Which Veda is essentially the musical hymnbook setting Rig Vedic verses to melodies for soma sacrifices?',
      options: ['Yajur Veda', 'Atharva Veda', 'Sama Veda', 'Ayurveda'],
      correctIndex: 2,
    },
  ],
  masteryCriteria:
    'Demonstrates rigorous understanding of IVC material culture and decline, comparative river-valley traits, Vedic literature hierarchy (Shruti vs Smriti), and Epic itihasa heritage.',
};

// ─── INTERACTIVE EXPLORATION STEPS (Brilliant.org Style: Active Manipulation) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Material Detective — IVC Inferences',
    instruction:
      'Click on the 4 excavated artifacts around the Harappan settlement to inspect the archaeological evidence and see what we can safely infer versus what remains locked.',
    interactionType: 'click-artifact',
    nodeId: NODE_C6_HISTCIV_011,
  },
  {
    title: 'Lab 2: River Floods & The Four Cradles',
    instruction:
      'Adjust the River Flood Behavior slider from "Gentle & Predictable" to "Violent & Erratic" to discover why different river systems produced unified kingdoms, city-states, or planned grids.',
    interactionType: 'slider-river',
    nodeId: NODE_C6_HISTCIV_016,
  },
  {
    title: 'Lab 3: The 7 Rivers of Sapta Sindhu & Iron Expansion',
    instruction:
      'Move the Aryan Timeline Slider from 1500 BCE to 1000 BCE. Watch the pastoral migration move into the 7-river basin and then unlock the dense Gangetic forests with iron axes.',
    interactionType: 'slider-expansion',
    nodeId: NODE_C6_HISTCIV_017,
  },
  {
    title: 'Lab 4: The Sacred Library — Shruti vs Smriti',
    instruction:
      'Click each shelf in the Vedic scriptorium to reveal whether it is eternal heard revelation (Shruti) or remembered human tradition (Smriti).',
    interactionType: 'click-library',
    nodeId: NODE_C6_HISTCIV_018,
  },
  {
    title: 'Lab 5: Epic Geography & Moral Dilemmas of Dharma',
    instruction:
      'Toggle between the Ramayana (Ayodhya to Lanka) and Mahabharata (Hastinapur to Kurukshetra) maps to trace the cultural geography of the two great epics.',
    interactionType: 'toggle-epics',
    nodeId: NODE_C6_HISTCIV_020,
  },
];

// ─── PREDICTION QUESTIONS (Predict-Then-Check Pattern) ───
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: If a river valley experienced violent, completely unpredictable annual floods with no natural mountain boundaries (like the Tigris-Euphrates), what political structure was forced to emerge?',
    options: [
      'A relaxed single king ruling the whole country peacefully from one capital.',
      'Independent, heavily fortified city-states organized around local temple-priests to manage emergency canals.',
      'No cities could ever be built beside the river.',
      'A nomadic tribe with no farming.',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Now drag the River Flood Slider to "Violent & Erratic" in Lab 2 to verify how Mesopotamia formed city-states like Ur and Babylon!',
    nodeId: NODE_C6_HISTCIV_014,
  },
  {
    question:
      'Predict: Why did the Aryans stay in the Sapta Sindhu (Punjab) for nearly 500 years before moving into the fertile Gangetic plain?',
    options: [
      'The Gangetic plain was blocked by an impenetrable ocean.',
      'They lacked hard iron tools ("krishna ayas") required to cut the dense sal forests and till the heavy clay soil of the doab.',
      'They were forbidden by the Rig Veda to travel east.',
      'They did not have horses.',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Move the Aryan Timeline Slider past 1000 BCE in Lab 3 to watch iron axes clear the dense Gangetic doab!',
    nodeId: NODE_C6_HISTCIV_017,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question:
      'Observation Check: Look closely at the Pashupati Seal representation. What animals surround the seated yogic figure?',
    observableOptions: [
      'Elephant, Tiger, Rhinoceros, Buffalo, and two Deer below the seat',
      'Lion, Horse, Camel, Cow, and Dog',
      'Only peacocks and snakes',
      'Fish and crocodiles only',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_HISTCIV_011,
  },
  {
    question:
      'Observation Check: When you look at the Great Bath of Mohenjo-daro, how was the brick tank made completely watertight 4,500 years ago?',
    observableOptions: [
      'With modern cement poured over steel rods',
      'Standardized baked bricks set in gypsum mortar and lined with a layer of natural bitumen (tar/asphalt)',
      'Large unbaked mud slabs held by wooden beams',
      'Carved out of a single giant mountain rock',
    ],
    correctIndex: 1,
    nodeId: NODE_C6_HISTCIV_011,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Epigraphist & Heritage Detective',
  description:
    'Examine your own household, neighborhood, or city today. Identify at least 3 living continuities that trace their roots back to the Bronze Age and Vedic eras (e.g., cotton clothing, covered drains with manhole covers, swastika symbols at doorsteps, pipal tree worship, or reading the 60-minute clock inherited from Mesopotamia). Write a brief 4-sentence curatorial note explaining how these ancient ideas survive in modern 21st-century India.',
  steps: [
    'Identify 3 living traditions in your daily life (textiles, urban layout, geometry/time, or sacred trees).',
    'Pair each with its originating ancient civilization (IVC, Mesopotamia, Egypt, Vedic period).',
    'State whether our knowledge of each comes from deciphered texts or material continuity.',
    'Share your heritage discovery with your history teacher or peers!',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════���════════════════════
export function C6_HistoryCivicsIndusValleySocietySim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C6_HISTCIV_011,
  title = DEFAULT_PROPS.title || 'Indus Valley Society & Ancient Civilisations',
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['histciv'] || {
    name: 'History & Civics',
    emoji: '🏛️',
    color: 'amber',
  };

  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── DISCOVERY & PREDICTION & OBSERVATION STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ─── LAB INTERACTION STATES (30+ useState rich state) ───
  const [selectedArtifact, setSelectedArtifact] = useState<string | null>('seal');
  const [riverFloodLevel, setRiverFloodLevel] = useState<number>(50); // 0 = Gentle/Nile, 50 = Moderate/Indus, 100 = Violent/Tigris-HwangHo
  const [selectedCivilization, setSelectedCivilization] = useState<'ivc' | 'egypt' | 'meso' | 'china'>('ivc');
  const [aryanEraYear, setAryanEraYear] = useState<number>(1500); // 1500 BCE to 800 BCE
  const [selectedLibraryCategory, setSelectedLibraryCategory] = useState<'shruti' | 'smriti'>('shruti');
  const [selectedEpicTab, setSelectedEpicTab] = useState<'ramayana' | 'mahabharata'>('ramayana');
  const [activeMapPin, setActiveMapPin] = useState<string | null>('ayodhya');
  const [brickRatioLength, setBrickRatioLength] = useState<number>(4);
  const [brickRatioWidth, setBrickRatioWidth] = useState<number>(2);
  const [brickRatioHeight, setBrickRatioHeight] = useState<number>(1);
  const [showWaterFlow, setShowWaterFlow] = useState<boolean>(true);
  const [mummyStep, setMummyStep] = useState<number>(0);
  const [cuneiformText, setCuneiformText] = useState<string>('GRAIN_RATION');
  const [oracleBoneCracked, setOracleBoneCracked] = useState<boolean>(false);
  const [activeVedaDetail, setActiveVedaDetail] = useState<string>('rig');
  const [ironForestCleared, setIronForestCleared] = useState<boolean>(false);
  const [gitaDialogueRead, setGitaDialogueRead] = useState<boolean>(false);

  // ─── CHALLENGE & ADAPTIVE DIFFICULTY STATE ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── ESCALATING HINTS & PROGRESSIVE REVEAL ───
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  // ─── DRAG & CONSTRUCT STATE ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── FEEDBACK & ANIMATION STATES ───
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
  const timelineGsapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY CURRENT DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── EFFECT 1: LOAD EXISTING MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── EFFECT 2: BKT ADAPTIVE MASTERY UPDATE ───
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

  // ─── EFFECT 3: GSAP TIMELINE ANIMATION ON LAB 3 & 5 ───
  useEffect(() => {
    if (timelineGsapRef.current && phase === 'explore') {
      gsap.fromTo(
        timelineGsapRef.current,
        { opacity: 0.4, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [currentSlide, phase, aryanEraYear, selectedEpicTab]);

  // ─── EFFECT 4: 2D CANVAS WATER/FLOOD ANIMATION LOOP ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let waveOffset = 0;

    const render = () => {
      waveOffset += riverFloodLevel > 60 ? 0.08 : 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw River Flow
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (riverFloodLevel > 70) {
        gradient.addColorStop(0, '#d97706'); // Muddy Yellow Loess / Turbulent
        gradient.addColorStop(1, '#92400e');
      } else if (riverFloodLevel > 30) {
        gradient.addColorStop(0, '#0284c7'); // Indus Blue
        gradient.addColorStop(1, '#0369a1');
      } else {
        gradient.addColorStop(0, '#10b981'); // Gentle Nile Emerald
        gradient.addColorStop(1, '#047857');
      }

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let x = 0; x <= canvas.width; x += 10) {
        const waveHeight = (riverFloodLevel / 100) * 14 + 4;
        const y = canvas.height * 0.45 + Math.sin(x * 0.04 + waveOffset) * waveHeight;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Silt particles
      ctx.fillStyle = riverFloodLevel > 70 ? 'rgba(254, 240, 138, 0.6)' : 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 6; i++) {
        const px = ((waveOffset * 40 + i * 50) % canvas.width);
        const py = canvas.height * 0.55 + ((i * 17) % 20);
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [riverFloodLevel]);

  // ─── EFFECT 5: CLEANUP INACTIVITY TIMER ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── USECALLBACK HANDLERS (14+ Distinct Callbacks) ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
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
    speechManager.speak(isCorrect ? 'Great historical deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the ancient archaeological interactive labs!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test all artifacts, river conditions, and timelines with no grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin your archaeological competency challenges!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the simulation controls to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb observational eye!' : 'Observe the seal details closely.');
  }, []);

  const handleArtifactSelect = useCallback((artifactId: string) => {
    setSelectedArtifact(artifactId);
    audioManager.play('tap');
    const descriptions: Record<string, string> = {
      seal: 'Pashupati Seal: Shows a 3-faced seated yogic figure with animals. Inferred by Marshall as proto-Shiva.',
      granary: 'Great Granary: Standardized baked bricks in 4:2:1 ratio. Stored grain surplus for craft specialists.',
      bath: 'Great Bath: Ritual purification tank, sealed waterproof with natural bitumen and gypsum mortar.',
      dockyard: 'Lothal Dockyard (219m x 37m): Tidal basin excavated by S.R. Rao, linking trade to Mesopotamia (Meluhha).',
    };
    speechManager.speak(descriptions[artifactId] || '');
  }, []);

  const handleRiverSliderChange = useCallback((value: number) => {
    setRiverFloodLevel(value);
    audioManager.play('count');
    if (value < 35) setSelectedCivilization('egypt');
    else if (value <= 65) setSelectedCivilization('ivc');
    else if (value <= 85) setSelectedCivilization('meso');
    else setSelectedCivilization('china');
  }, []);

  const handleAryanSliderChange = useCallback((year: number) => {
    setAryanEraYear(year);
    audioManager.play('count');
    if (year <= 1000) {
      setIronForestCleared(true);
    } else {
      setIronForestCleared(false);
    }
  }, []);

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

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        if (prev.length === 0 && challenge.sortItems) {
          prev = challenge.sortItems.map((_, i) => i);
        }
        const arr = [...prev];
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0
        ? sortArrangement
        : challenge.sortItems?.map((_, i) => i) || [];
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    handleAnswer(answer);
  }, [sortArrangement, challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding! You have mastered the ancient civilisations and Vedic heritage.');
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
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (
        challenge.type === 'classify' ||
        challenge.type === 'distinguish' ||
        challenge.type === 'match'
      ) {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect =
          JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect =
          JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numAnswer =
          typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect =
          Math.abs(numAnswer - (challenge.correctAnswer || 0)) <=
          (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct inference! Well analyzed.');
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
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (
          challenge.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(challenge.misconceptionIndex)
        ) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us examine the evidence step-by-step.');
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

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-amber-950/40 rounded-2xl border border-amber-800/60">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-wide">{title}</h1>
            <p className="text-xs text-amber-400 font-medium">
              ICSE Class 6 History & Civics • River Valleys, Vedas & Epics
            </p>
          </div>
        </div>

        {/* Difficulty Tier Badge & Phase Pills */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : difficulty === 'standard'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                : 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 font-semibold border border-slate-700 capitalize">
            Phase: {phase}
          </span>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════════��════════
          PHASE 1: DISCOVERY HOOK
         ═══════════════════════════════════════════════════════════ */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 rounded-2xl border border-amber-700/50">
            <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
              <span>🏺</span> {SCENARIO.title}
            </h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-800/70 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase mb-2">
              <span>🔍</span> Discovery Curiosity Hook
            </div>
            <p className="text-base font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-400 opacity-60'
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-amber-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 space-y-4">
                <p
                  className={`text-sm p-4 rounded-xl border ${
                    discoveryCorrect
                      ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                      : 'bg-amber-950/60 border-amber-700 text-amber-300'
                  }`}
                >
                  {discoveryCorrect
                    ? '✓ Brilliant deduction! The undeciphered script is the defining intellectual condition of Harappan studies.'
                    : DISCOVERY_QUESTION.hintAfter}
                </p>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 rounded-xl font-bold text-sm shadow-lg shadow-amber-900/30"
                >
                  Enter the Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          PHASE 2: INTERACTIVE EXPLORATION (Brilliant.org Core)
         ═══════════════════════════════════════════════════════════ */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-5 sm:p-6 bg-slate-800/80 rounded-2xl border border-slate-700"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <h3 className="text-base sm:text-lg font-bold text-amber-300">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
                  Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-300/90 mb-4 font-medium flex items-center gap-1.5">
                <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ─── LAB 1: MATERIAL DETECTIVE (IVC Inferences) ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="space-y-2">
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">
                      Click Artifact to Inspect Evidence:
                    </p>
                    {[
                      { id: 'seal', label: 'Pashupati Seal #420', emoji: '🦏', site: 'Mohenjo-daro' },
                      { id: 'granary', label: 'Great Granary & 4:2:1 Bricks', emoji: '🌾', site: 'Harappa' },
                      { id: 'bath', label: 'The Great Bath (Bitumen Lining)', emoji: '🛁', site: 'Mohenjo-daro' },
                      { id: 'dockyard', label: 'Tidal Dockyard (219m x 37m)', emoji: '⛵', site: 'Lothal (Gujarat)' },
                    ].map((art) => (
                      <motion.button
                        key={art.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleArtifactSelect(art.id)}
                        className={`w-full text-left p-3 rounded-xl text-xs font-semibold flex items-center justify-between border ${
                          selectedArtifact === art.id
                            ? 'bg-amber-950/80 border-amber-500 text-amber-200'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-lg">{art.emoji}</span>
                          <span>{art.label}</span>
                        </span>
                        <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded">
                          {art.site}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Artifact Inspection Display with SVG Visualizer */}
                  <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-amber-400">Curatorial Analysis</span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                          Inference vs Fact
                        </span>
                      </div>

                      {selectedArtifact === 'seal' && (
                        <div className="space-y-2">
                          <svg viewBox="0 0 200 120" className="w-full h-28 bg-amber-950/20 rounded-lg border border-amber-900/40">
                            <rect x="40" y="15" width="120" height="90" rx="8" fill="#78350f" stroke="#d97706" strokeWidth="2" />
                            <circle cx="100" cy="50" r="14" fill="#fbbf24" opacity="0.8" />
                            {/* Horned headdress */}
                            <path d="M 90 40 Q 100 28 110 40" stroke="#fef08a" strokeWidth="3" fill="none" />
                            <circle cx="95" cy="48" r="1.5" fill="#000" />
                            <circle cx="105" cy="48" r="1.5" fill="#000" />
                            {/* Seated yogic body */}
                            <polygon points="100,64 85,90 115,90" fill="#fef08a" />
                            {/* Animals */}
                            <text x="50" y="35" fontSize="10" fill="#93c5fd">🐘</text>
                            <text x="50" y="80" fontSize="10" fill="#fca5a5">🐅</text>
                            <text x="135" y="35" fontSize="10" fill="#d8b4fe">🦏</text>
                            <text x="135" y="80" fontSize="10" fill="#86efac">🐃</text>
                            <text x="95" y="102" fontSize="9" fill="#fde047">🦌🦌</text>
                          </svg>
                          <p className="text-xs text-slate-300">
                            <span className="text-amber-400 font-bold">Observed:</span> 3-faced horned seated yogic figure surrounded by elephant, tiger, rhino, buffalo & 2 deer.
                          </p>
                          <p className="text-xs text-emerald-400">
                            <span className="font-bold">Inference:</span> Sir John Marshall proposed this as early "proto-Shiva" (Pashupati, Lord of Beasts). Cautious language required because the script cannot be read!
                          </p>
                        </div>
                      )}

                      {selectedArtifact === 'granary' && (
                        <div className="space-y-2">
                          <div className="flex gap-2 items-center bg-slate-950 p-2 rounded border border-slate-800 text-xs">
                            <div className="flex-1">
                              <label className="text-[10px] text-slate-400">Length ({brickRatioLength})</label>
                              <input type="range" min={1} max={6} value={brickRatioLength} onChange={(e) => setBrickRatioLength(Number(e.target.value))} className="w-full" />
                            </div>
                            <div className="flex-1">
                              <label className="text-[10px] text-slate-400">Width ({brickRatioWidth})</label>
                              <input type="range" min={1} max={4} value={brickRatioWidth} onChange={(e) => setBrickRatioWidth(Number(e.target.value))} className="w-full" />
                            </div>
                            <div className="flex-1">
                              <label className="text-[10px] text-slate-400">Height ({brickRatioHeight})</label>
                              <input type="range" min={1} max={3} value={brickRatioHeight} onChange={(e) => setBrickRatioHeight(Number(e.target.value))} className="w-full" />
                            </div>
                          </div>
                          <p className="text-xs text-slate-300">
                            Standard Harappan Brick Ratio is exactly <span className="text-amber-400 font-bold">4 : 2 : 1</span>. Standardized across 1.3 million sq km!
                          </p>
                          <p className="text-xs text-emerald-400">
                            <span className="font-bold">Inference:</span> Stored agricultural surplus enabled craft specialization (weavers, potters, bead-makers).
                          </p>
                        </div>
                      )}

                      {selectedArtifact === 'bath' && (
                        <div className="space-y-2">
                          <svg viewBox="0 0 200 100" className="w-full h-24 bg-sky-950/20 rounded border border-sky-900/40">
                            <rect x="25" y="20" width="150" height="60" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                            <rect x="40" y="30" width="120" height="40" fill="#0369a1" opacity="0.6" />
                            {/* Steps */}
                            <line x1="40" y1="35" x2="60" y2="35" stroke="#f8fafc" strokeWidth="2" />
                            <line x1="40" y1="45" x2="60" y2="45" stroke="#f8fafc" strokeWidth="2" />
                            <line x1="140" y1="35" x2="160" y2="35" stroke="#f8fafc" strokeWidth="2" />
                            <line x1="140" y1="45" x2="160" y2="45" stroke="#f8fafc" strokeWidth="2" />
                            <text x="100" y="55" fontSize="9" textAnchor="middle" fill="#e0f2fe">Bitumen Waterproof Layer</text>
                          </svg>
                          <p className="text-xs text-slate-300">
                            Dimensions: ~12m x 7m x 2.4m deep with brick steps on north and south.
                          </p>
                          <p className="text-xs text-emerald-400">
                            <span className="font-bold">Inference:</span> Ritual purification tank for special religious festivals, anticipating modern temple kunds.
                          </p>
                        </div>
                      )}

                      {selectedArtifact === 'dockyard' && (
                        <div className="space-y-2">
                          <p className="text-xs text-slate-300">
                            Excavated by S.R. Rao in 1955 at Lothal, Gujarat. Measures 219m x 37m with a sluice gate connected to the Gulf of Khambhat.
                          </p>
                          <p className="text-xs text-emerald-400">
                            <span className="font-bold">Evidence:</span> Harappan carnelian beads and seals found at Ur (Mesopotamia) where the region was recorded as "Meluhha".
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: RIVER FLOOD & 4 CRADLES (Comparative Study) ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {/* Predict Then Check Hook if not done */}
                  {!predictionMade && (
                    <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/60 mb-3">
                      <p className="text-xs font-bold text-indigo-300 mb-1">
                        🎯 Predict Before Interacting:
                      </p>
                      <p className="text-xs text-slate-200 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="text-left p-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300"
                          >
                            <span className="text-amber-400 font-bold">{i + 1}.</span> {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && !predictionVerified && (
                    <div className="p-2 bg-emerald-950/40 border border-emerald-800 rounded text-xs text-emerald-300">
                      ✓ {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-slate-400">River Flood Behavior:</span>
                        <span className="font-bold text-amber-400">
                          {riverFloodLevel < 35
                            ? 'Gentle & Predictable (Nile)'
                            : riverFloodLevel <= 65
                            ? 'Moderate & Seasonal (Indus)'
                            : riverFloodLevel <= 85
                            ? 'Violent & Erratic (Tigris-Euphrates)'
                            : 'Devastating "China’s Sorrow" (Hwang Ho)'}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={riverFloodLevel}
                        onChange={(e) => handleRiverSliderChange(Number(e.target.value))}
                        aria-label="Adjust river flood behavior"
                        className="w-full accent-amber-500"
                      />

                      {/* 2D Canvas Flood Flow Visualizer */}
                      <div className="mt-3 relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                        <canvas ref={canvasRef} width={340} height={100} className="w-full h-24" />
                        <div className="absolute top-2 left-2 text-[10px] bg-slate-950/80 px-2 py-0.5 rounded text-slate-300 border border-slate-800">
                          Live Silt & Wave Flow
                        </div>
                      </div>
                    </div>

                    {/* Active Cradle Spec Card */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-amber-300 uppercase tracking-wide">
                            {selectedCivilization === 'egypt' && '🇪🇬 Egyptian Civilisation (Nile)'}
                            {selectedCivilization === 'ivc' && '🇮🇳 Indus Valley Civilisation (Indus)'}
                            {selectedCivilization === 'meso' && '🇮🇶 Mesopotamian Civilisation (Tigris-Euphrates)'}
                            {selectedCivilization === 'china' && '🇨🇳 Chinese Civilisation (Hwang Ho)'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300">
                          <span className="text-amber-400 font-semibold">Script: </span>
                          {selectedCivilization === 'egypt' && 'Hieroglyphics (Deciphered via Rosetta Stone, 1822 CE)'}
                          {selectedCivilization === 'ivc' && 'Indus Script (UNDECIPHERED on ~3,500 seals)'}
                          {selectedCivilization === 'meso' && 'Cuneiform (Reed stylus on wet clay, ~3200 BCE)'}
                          {selectedCivilization === 'china' && 'Jiaguwen Oracle Bones (Direct ancestor of modern Hanzi)'}
                        </p>
                        <p className="text-xs text-slate-300">
                          <span className="text-amber-400 font-semibold">Monument: </span>
                          {selectedCivilization === 'egypt' && 'Pyramids of Giza (Sealed tomb for Pharaoh Khufu)'}
                          {selectedCivilization === 'ivc' && 'Great Bath & Grid Chessboard Towns with Covered Drains'}
                          {selectedCivilization === 'meso' && 'Ziggurat of Ur (Stepped temple tower for Moon god Nanna)'}
                          {selectedCivilization === 'china' && 'The Great Wall (Started by Qin Shi Huangdi, 221 BCE)'}
                        </p>
                        <p className="text-xs text-emerald-400">
                          <span className="font-semibold">Modern Gift: </span>
                          {selectedCivilization === 'egypt' && '365-day solar calendar (12 months of 30 days + 5 feast days)'}
                          {selectedCivilization === 'ivc' && 'Cotton cultivation (sindon) & covered municipal sanitation'}
                          {selectedCivilization === 'meso' && 'Sexagesimal system (60s/min, 60min/hr, 360° circle)'}
                          {selectedCivilization === 'china' && 'Sericulture (silk), bronze, and later paper (105 CE)'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: SAPTA SINDHU TO GANGETIC PLAIN (Aryan Migration & Iron) ─── */}
              {currentSlide === 2 && (
                <div ref={timelineGsapRef} className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Era Timeline Slider:</span>
                    <span className="font-extrabold text-amber-400">
                      {aryanEraYear === 1750 && 'c. 1750 BCE: IVC Urban Decline'}
                      {aryanEraYear > 1400 && aryanEraYear <= 1500 && 'c. 1500 BCE: Pastoral Aryans enter Sapta Sindhu'}
                      {aryanEraYear <= 1000 && 'c. 1000 BCE: Iron Age Expansion into Gangetic Doab'}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={800}
                    max={1750}
                    step={50}
                    value={aryanEraYear}
                    onChange={(e) => handleAryanSliderChange(Number(e.target.value))}
                    aria-label="Aryan timeline slider"
                    className="w-full accent-amber-500"
                  />

                  {/* SVG Historical Map Overlay */}
                  <div className="bg-slate-900 rounded-xl p-3 border border-slate-800">
                    <svg viewBox="0 0 500 180" className="w-full h-36">
                      {/* Northwest Mountain Passes */}
                      <path d="M 20 20 L 70 60 L 40 100" stroke="#78350f" strokeWidth="4" fill="none" strokeDasharray="3 3" />
                      <text x="35" y="30" fill="#fcd34d" fontSize="9">Khyber / Bolan Passes</text>

                      {/* Sapta Sindhu Rivers (Punjab) */}
                      <path d="M 60 40 Q 120 70 150 140" stroke="#0284c7" strokeWidth="2.5" fill="none" />
                      <path d="M 80 45 Q 130 80 160 135" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
                      <path d="M 95 50 Q 140 85 170 130" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
                      <path d="M 110 55 Q 150 90 180 125" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
                      {/* Dried Saraswati */}
                      <path d="M 125 60 Q 160 95 190 120" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
                      <text x="140" y="110" fill="#fef08a" fontSize="8">Dried Saraswati</text>

                      {/* Sapta Sindhu Zone */}
                      <rect x="70" y="45" width="120" height="70" rx="8" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="1" />
                      <text x="130" y="60" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">
                        Sapta Sindhu (1500 BCE)
                      </text>

                      {/* Gangetic Plain & Forest Zone */}
                      <rect
                        x="240"
                        y="50"
                        width="230"
                        height="90"
                        rx="8"
                        fill={ironForestCleared ? 'rgba(34, 197, 94, 0.2)' : 'rgba(120, 53, 15, 0.4)'}
                        stroke={ironForestCleared ? '#22c55e' : '#92400e'}
                        strokeWidth="1.5"
                      />
                      <text x="355" y="70" textAnchor="middle" fill={ironForestCleared ? '#86efac' : '#fca5a5'} fontSize="10" fontWeight="bold">
                        {ironForestCleared ? 'Gangetic Settlements (Hastinapur / Indraprastha)' : 'Dense Monsoon Sal Forests (Ganga-Yamuna Doab)'}
                      </text>

                      {/* Ganga & Yamuna Rivers */}
                      <path d="M 230 70 Q 320 85 460 120" stroke="#06b6d4" strokeWidth="2.5" fill="none" />
                      <path d="M 240 85 Q 330 100 450 135" stroke="#0891b2" strokeWidth="2" fill="none" />

                      {/* Arrow of Expansion if year <= 1000 */}
                      {aryanEraYear <= 1000 && (
                        <g>
                          <line x1="190" y1="80" x2="240" y2="80" stroke="#eab308" strokeWidth="3" markerEnd="url(#arrow)" />
                          <text x="215" y="75" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="bold">
                            Iron Axes 🪓
                          </text>
                        </g>
                      )}
                    </svg>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl text-xs space-y-1">
                    <p className="text-slate-300">
                      <span className="font-bold text-amber-400">Key Fact: </span>
                      The Aryans were semi-nomadic pastoralists with cattle and chariots. They did not conquer in a single war; they migrated through Bolan/Khyber passes 250 years after Harappan cities emptied.
                    </p>
                    <p className="text-emerald-400">
                      <span className="font-bold">Iron Revolution: </span>
                      Around 1000 BCE, "krishna ayas" (iron) enabled axes to chop sal forests and heavy iron ploughs to break the doab clay at Hastinapur (Painted Grey Ware culture excavated by B.B. Lal).
                    </p>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: SACRED SCRIPTURIUM (Shruti vs Smriti) ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedLibraryCategory('shruti')}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition border ${
                        selectedLibraryCategory === 'shruti'
                          ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      📜 SHRUTI ("That Which Was Heard" • Revealed)
                    </button>
                    <button
                      onClick={() => setSelectedLibraryCategory('smriti')}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition border ${
                        selectedLibraryCategory === 'smriti'
                          ? 'bg-indigo-950/80 border-indigo-500 text-indigo-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      📚 SMRITI ("That Which Is Remembered" • Tradition)
                    </button>
                  </div>

                  {selectedLibraryCategory === 'shruti' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        onClick={() => setActiveVedaDetail('rig')}
                        className={`p-3 rounded-xl border cursor-pointer text-xs ${
                          activeVedaDetail === 'rig' ? 'bg-amber-950/60 border-amber-500' : 'bg-slate-900 border-slate-800'
                        }`}
                      >
                        <p className="font-bold text-amber-300">1. Rig Veda (Oldest, c. 1500 BCE)</p>
                        <p className="text-slate-300 text-[11px] mt-1">1,028 hymns in 10 mandalas for Agni, Indra, Varuna. Contains Gayatri Mantra.</p>
                      </div>
                      <div
                        onClick={() => setActiveVedaDetail('sama')}
                        className={`p-3 rounded-xl border cursor-pointer text-xs ${
                          activeVedaDetail === 'sama' ? 'bg-amber-950/60 border-amber-500' : 'bg-slate-900 border-slate-800'
                        }`}
                      >
                        <p className="font-bold text-amber-300">2. Sama Veda (Musical Chants)</p>
                        <p className="text-slate-300 text-[11px] mt-1">1,549 verses set to melodies for soma sacrifices; the songbook of the Rig Veda.</p>
                      </div>
                      <div
                        onClick={() => setActiveVedaDetail('yajur')}
                        className={`p-3 rounded-xl border cursor-pointer text-xs ${
                          activeVedaDetail === 'yajur' ? 'bg-amber-950/60 border-amber-500' : 'bg-slate-900 border-slate-800'
                        }`}
                      >
                        <p className="font-bold text-amber-300">3. Yajur Veda (Sacrificial Formulas)</p>
                        <p className="text-slate-300 text-[11px] mt-1">Prose formulas (yajus) murmured by officiating priests during ritual steps.</p>
                      </div>
                      <div
                        onClick={() => setActiveVedaDetail('atharva')}
                        className={`p-3 rounded-xl border cursor-pointer text-xs ${
                          activeVedaDetail === 'atharva' ? 'bg-amber-950/60 border-amber-500' : 'bg-slate-900 border-slate-800'
                        }`}
                      >
                        <p className="font-bold text-amber-300">4. Atharva Veda (Daily Remedies & Iron)</p>
                        <p className="text-slate-300 text-[11px] mt-1">730 hymns of medicine, spells, and earliest mention of iron as "krishna ayas".</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                        <p className="font-bold text-indigo-300">The 18 Mahapuranas (c. 300 BCE - 500 CE)</p>
                        <p className="text-slate-300 text-[11px] mt-1">Narratives of Vishnu, Shiva, Devi avatars and dynastic genealogies for the general public.</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                        <p className="font-bold text-indigo-300">Itihasa (The Great Epics)</p>
                        <p className="text-slate-300 text-[11px] mt-1">Valmiki’s Ramayana (24k shlokas) & Vyasa’s Mahabharata (100k shlokas) carrying dharma.</p>
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-slate-900 rounded-xl text-xs border border-slate-800 text-slate-300">
                    <span className="text-amber-400 font-bold">Upanishads (Vedanta = "End of Vedas"): </span>
                    Philosophical dialogues composed c. 800-500 BCE. Focus on <span className="text-emerald-400 font-semibold">Brahman</span> (universal soul) and <span className="text-emerald-400 font-semibold">Atman</span> (individual soul) — e.g. <span className="italic">"Tat Tvam Asi"</span>.
                  </div>
                </div>
              )}

              {/* ─── LAB 5: EPIC GEOGRAPHY & DHARMA ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedEpicTab('ramayana')}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition border ${
                        selectedEpicTab === 'ramayana'
                          ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      🏹 RAMAYANA (Sage Valmiki • 24,000 Shlokas)
                    </button>
                    <button
                      onClick={() => setSelectedEpicTab('mahabharata')}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition border ${
                        selectedEpicTab === 'mahabharata'
                          ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      ⚔️ MAHABHARATA (Sage Vyasa • 100,000+ Shlokas)
                    </button>
                  </div>

                  {selectedEpicTab === 'ramayana' ? (
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-amber-400">Core Arc:</span>
                        <span className="text-[10px] text-slate-400">7 Kandas (Books)</span>
                      </div>
                      <p className="text-slate-300">
                        Follows Prince Rama of Ayodhya, his 14-year exile to the Dandakaranya forests, Sita’s abduction by Ravana of Lanka, and her rescue with Hanuman and the vanara army.
                      </p>
                      <p className="text-emerald-400 font-medium">
                        <span className="font-bold">Dharma Dramatized:</span> Filial duty, Maryada Purushottama (ideal conduct), and truthfulness.
                      </p>
                      <p className="text-slate-400 text-[11px]">
                        Celebrated retellings: Kamban’s 12th-century Tamil <span className="italic">Iramavataram</span> and Tulsidas’s 16th-century Awadhi <span className="italic">Ramcharitmanas</span>.
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-rose-400">Core Arc:</span>
                        <span className="text-[10px] text-slate-400">18 Parvas (Longest poem in world literature)</span>
                      </div>
                      <p className="text-slate-300">
                        Dynastic struggle between 5 Pandavas and 100 Kauravas over the throne of Hastinapura, culminating in the 18-day Kurukshetra war in Haryana.
                      </p>
                      <div className="p-2.5 bg-amber-950/40 rounded-lg border border-amber-700/60">
                        <p className="font-bold text-amber-300">💎 The Bhagavad Gita (Bhishma Parva, Ch. 25–42):</p>
                        <p className="text-slate-300 text-[11px] mt-1">
                          700-verse counsel by Krishna to Arjuna: perform your righteous duty (swadharma) without selfish attachment to the fruits of action (Nishkama Karma).
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls for Exploration */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              aria-label="Previous lab slide"
              className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-xl text-xs font-bold disabled:opacity-40 border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-semibold">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                aria-label="Next lab slide"
                className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 rounded-xl text-xs font-bold shadow-md shadow-amber-900/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Enter free exploration sandbox"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/30"
              >
                Enter Free Sandbox 🧪 →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          PHASE 3: SANDBOX (Free Play Mode — No Grading Pressure)
         ═══════���═══════════════════════════════════════════════════ */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-5">
          <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span>🧪</span> Free Archaeological Sandbox Mode
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Explore all artifacts, tweak river flood variables, test brick sizes, and observe historical patterns at your own pace with zero penalties!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <div className="space-y-3">
              <label className="text-xs text-slate-400 block font-semibold">
                Simulate River Flood Behavior: ({riverFloodLevel}%)
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={riverFloodLevel}
                onChange={(e) => handleRiverSliderChange(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <p className="font-bold text-amber-400">Active River Profile:</p>
                <p>
                  {riverFloodLevel < 35 && 'Nile: Predictable floods → Centralized Pharaoh kingdom with Stone Pyramids.'}
                  {riverFloodLevel >= 35 && riverFloodLevel <= 65 && 'Indus: Moderate flow → Grid planned cities with covered drains & seals.'}
                  {riverFloodLevel > 65 && riverFloodLevel <= 85 && 'Tigris-Euphrates: Violent floods → Fortified city-states with Ziggurats.'}
                  {riverFloodLevel > 85 && 'Hwang Ho: "China’s Sorrow" → Centralized emperors, Great Wall & Oracle Bones.'}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs text-slate-400 block font-semibold">
                Aryans & Metallurgy Era: ({aryanEraYear} BCE)
              </label>
              <input
                type="range"
                min={800}
                max={1750}
                step={50}
                value={aryanEraYear}
                onChange={(e) => handleAryanSliderChange(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                <p className="font-bold text-amber-400">Ecological Condition:</p>
                <p>
                  {aryanEraYear > 1000
                    ? 'Bronze/Copper tools insufficient to chop Gangetic sal forests. Aryans remain in pastoral Sapta Sindhu.'
                    : 'Iron technology unlocked! Forests felled, settlements emerge at Hastinapur & Indraprastha.'}
                </p>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-950/40"
          >
            I am Ready for the Challenges! 🎯 →
          </motion.button>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          PHASE 4: CHALLENGES (Adaptive 20+ Questions with Hints)
         ═══════════════════════════════════════════════════════════ */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Progress Bar & Header */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-slate-400">
                Competency:{' '}
                <span className="text-amber-400 font-bold uppercase">{challenge.competencyLevel}</span>
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                animate={{
                  width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 sm:p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'bg-slate-800/80 border-slate-700'
            }`}
          >
            <p className="text-sm sm:text-base font-bold text-white mb-4 leading-snug">
              {challenge.question}
            </p>

            {/* MCQ / CLASSIFY / DISTINGUISH / MATCH */}
            {(challenge.type === 'classify' ||
              challenge.type === 'distinguish' ||
              challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-medium border transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-900/70 border-emerald-500 text-emerald-100'
                          : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-bold mr-2 text-amber-400">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* DRAG-LABEL CHALLENGE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2 font-semibold">
                    Drag Labels:
                  </span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-lg cursor-grab text-xs shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {challenge.dragItems.map((item, i) => (
                    <div
                      key={i}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className="p-3 bg-slate-900 rounded-xl border-2 border-dashed border-slate-700 flex items-center justify-between min-h-[50px]"
                    >
                      <span className="text-xs text-slate-400">
                        Target: {item.targetId.replace('t_', '').toUpperCase()}
                      </span>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded ${
                          droppedLabels[item.targetId]
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                            : 'text-slate-500'
                        }`}
                      >
                        {droppedLabels[item.targetId] || 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Verify Matched Rivers ✓
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag or click items to reorder chronologically:</p>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, idx) => (
                  <motion.div
                    key={idx}
                    draggable
                    onDragStart={() => handleDragStart(String(idx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, idx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm font-medium text-slate-200 cursor-grab flex items-center gap-2"
                  >
                    <span className="text-amber-400 font-bold">Step {idx + 1}:</span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Verify Chronological Order ✓
                </motion.button>
              </div>
            )}

            {/* NUMERIC CHALLENGE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical answer"
                    className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500 w-48"
                  />
                  <span className="text-xs text-slate-400 font-semibold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-3 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                  >
                    Check Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-amber-300 font-medium">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs rounded-lg text-slate-200"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2">
                  {constructParts.map((part, i) => (
                    <div
                      key={i}
                      className="px-2.5 py-1 bg-amber-950 text-amber-200 border border-amber-800 rounded-md text-xs flex items-center gap-1.5"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() =>
                          setConstructParts((prev) => prev.filter((_, idx) => idx !== i))
                        }
                        className="text-rose-400 font-bold ml-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 self-center">
                      Click the valid clues above to construct your proof...
                    </span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Verify Assembled Evidence ✓
                </motion.button>
              </div>
            )}

            {/* ─── PROGRESSIVE DISCLOSURE EXPLANATION CARD ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-amber-950/40 border border-amber-700/60 rounded-xl space-y-3"
              >
                <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Curatorial Historical Walkthrough:
                </p>
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-amber-100/90 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 mr-1.5">{i + 1}.</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps <
                    challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Detail →
                    </motion.button>
                  )}

                  {revealedSteps >=
                    challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md ml-auto"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finish Investigation 🏆'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          PHASE 5: COMPLETION & MOTIVATIONAL REFLECTION
         ═══════════════════════════════════════════════════════════ */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-r from-amber-950/60 via-slate-900 to-emerald-950/60 rounded-3xl border border-amber-600/50 text-center space-y-2">
            <span className="text-5xl">🏛️</span>
            <h2 className="text-2xl font-extrabold text-white">Investigation Complete!</h2>
            <p className="text-amber-300 text-sm font-semibold">
              Final Mastery Score: {Math.max(0, 100 - errors * 5)}% • Level: {masteryLevel.toUpperCase()}
            </p>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 text-xs sm:text-sm text-slate-200 leading-relaxed">
            {errors === 0
              ? '🌟 PERFECT SCORE! You have demonstrated exceptional analytical maturity in distinguishing archaeological inferences from facts!'
              : errors <= 3
              ? '👏 Excellent work! You have built strong historical reasoning across Bronze Age civilizations and early Indian traditions.'
              : '🌱 Good perseverance! Every historical mystery takes time to decipher. Review the specific misconceptions below and revisit the labs!'}
          </div>

          {/* Misconceptions Profile Feedback */}
          {hitMisconceptions.length > 0 && misconceptions && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h4 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Your Curatorial Misconception Profile:
              </h4>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-400 mt-1">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule Banner */}
          <div className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-800/60 text-xs text-slate-300">
            <span className="font-bold text-indigo-300">🧠 Spaced Repetition (SM-2 Schedule): </span>
            Based on your responses, this topic will be prompted for memory review in{' '}
            <span className="text-amber-400 font-bold">
              {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
            </span>
            .
          </div>

          {/* Real World Activity Card */}
          <div className="p-5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-3">
            <h4 className="text-sm font-bold text-amber-300">🏛️ {REAL_WORLD_ACTIVITY.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i}>• {step}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Investigation Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_HistoryCivicsIndusValleySocietySim;
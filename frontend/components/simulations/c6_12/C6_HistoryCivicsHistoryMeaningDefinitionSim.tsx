'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C6_HISTCIV_001 = 'c6_histciv_001';
const NODE_C6_HISTCIV_002 = 'c6_histciv_002';
const NODE_C6_HISTCIV_003 = 'c6_histciv_003';
const NODE_C6_HISTCIV_004 = 'c6_histciv_004';
const NODE_C6_HISTCIV_005 = 'c6_histciv_005';
const NODE_C6_HISTCIV_006 = 'c6_histciv_006';
const NODE_C6_HISTCIV_007 = 'c6_histciv_007';
const NODE_C6_HISTCIV_008 = 'c6_histciv_008';
const NODE_C6_HISTCIV_009 = 'c6_histciv_009';
const NODE_C6_HISTCIV_010 = 'c6_histciv_010';

const ALL_NODE_IDS = [
  NODE_C6_HISTCIV_001,
  NODE_C6_HISTCIV_002,
  NODE_C6_HISTCIV_003,
  NODE_C6_HISTCIV_004,
  NODE_C6_HISTCIV_005,
  NODE_C6_HISTCIV_006,
  NODE_C6_HISTCIV_007,
  NODE_C6_HISTCIV_008,
  NODE_C6_HISTCIV_009,
  NODE_C6_HISTCIV_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Excavation: Journey Through 500,000 Years',
  intro: 'You are an apprentice archaeologist joining an expedition across ancient India — from the stone age caves of Bhimbetka and the hearths of Kurnool, through the early wheat farms of Mehrgarh, to the planned brick avenues of Mohenjo-daro and Harappa.',
  context: 'Uncover how evidence separates fact from myth, master the BC/AD timeline, dig through stratified layers of history, and reconstruct the birth of Indian urban civilization.',
};

// ─── DISCOVERY QUESTION (Curiosity Hook) ───
const DISCOVERY_QUESTION = {
  question: 'In 1921, archaeologists dug into an earthen mound near the Ravi river in Punjab and found baked bricks laid in neat straight rows. What did this discovery prove?',
  options: [
    'India had a planned urban civilization over 4,500 years ago, pushing back known Indian urban history by 2,000+ years.',
    'Medieval kings built underground palaces during the Mughal period.',
    'British railway engineers built brick roads in 2500 BCE.',
    'Stone age hunter-gatherers immediately built large swimming pools.',
  ],
  correctIndex: 0,
  hintAfter: 'Fascinating! Before 1921, scholars believed Indian cities started much later. Let us journey back in time and investigate the clues!',
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

// ─── 22 PROGRESSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_hist_def',
    nodeId: NODE_C6_HISTCIV_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The word "history" is derived from the ancient Greek word "historia". What did "historia" originally mean?',
    options: [
      'Inquiry or investigation through asking questions',
      'Bedtime stories told by elders',
      'The book of kings and wars',
      'Ancient magical myths and folklore',
    ],
    correctIndex: 0,
    explanation: 'Historia in ancient Greek meant inquiry or investigation — the disciplined search for truth through verifiable evidence.',
    hints: [
      'Think of what a detective does when seeking clues.',
      'It is about questioning and searching, not inventing stories.',
      'Herodotus used the term to mean systematic inquiry into human affairs.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_source_coin',
    nodeId: NODE_C6_HISTCIV_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A silver punch-marked coin from the Mauryan period bears symbols and a short inscription. How must a historian classify this source?',
    options: [
      'Archaeological source (it is fundamentally a manufactured physical artefact)',
      'Literary source (because it carries letters and symbols)',
      'Oral source (because traders spoke about it)',
      'Secondary source (because it was found in modern times)',
    ],
    correctIndex: 0,
    explanation: 'A coin is primarily a manufactured physical object recovered from archaeological layers; the inscription is just a surface feature.',
    hints: [
      'Classify an object by its primary physical nature, not just surface markings.',
      'A coin is excavated from the ground like pottery and stone tools.',
      'Therefore, it is an archaeological source.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_03_hist_arch',
    nodeId: NODE_C6_HISTCIV_003,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which specialist primarily works in excavation trenches and uses stratigraphy to study buried physical objects?',
    options: [
      'Archaeologist',
      'Linguist',
      'Numismatist',
      'Archivist',
    ],
    correctIndex: 0,
    explanation: 'Archaeologists excavate physical remains from soil strata, while historians primarily study written manuscripts and chronicles.',
    hints: [
      'Think of the specialist who uses a trowel, brush, and survey grid.',
      'They uncover bones, pottery, and ruins buried underground.',
      'The word starts with "archaeo-", meaning ancient physical remains.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_04_paleo_char',
    nodeId: NODE_C6_HISTCIV_004,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is a key characteristic of the Paleolithic (Old Stone Age) period?',
    options: [
      'Crude chipped stone tools (quartzite hand axes) and nomadic hunter-gatherer life',
      'Polished stone axes and permanent mud-brick farming villages',
      'Bronze swords and underground covered brick drainage networks',
      'Iron ploughs and large written library archives',
    ],
    correctIndex: 0,
    explanation: 'Paleolithic humans lived as nomadic hunter-gatherers using crude, chipped quartzite tools without polished tools or farming.',
    hints: [
      'Paleo means "old" and lithic means "stone".',
      'Tools were chipped roughly, not ground smooth or polished.',
      'Farming and permanent houses did not yet exist.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05_fire_natural',
    nodeId: NODE_C6_HISTCIV_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How did early humans FIRST encounter and obtain fire?',
    options: [
      'Discovered from natural occurrences like lightning strikes and volcanic lava',
      'Invented instantly by striking flint stones on their very first day',
      'Bought from travelling merchant caravans',
      'Extracted from deep underground coal mines',
    ],
    correctIndex: 0,
    explanation: 'Humans first discovered fire in nature (lightning, forest fires), kept the embers burning, and only much later learned to ignite sparks deliberately.',
    hints: [
      'Humans did not invent fire from thin air.',
      'Think of natural lightning storms hitting dry grasslands.',
      'Active creation came thousands of years after passive discovery.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_06_ivc_dating',
    nodeId: NODE_C6_HISTCIV_009,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which pair correctly distinguishes the flourishing period of the Mature Harappan Civilisation from its modern archaeological discovery?',
    options: [
      'Flourished: 2500 BCE – 1750 BCE | Discovered: 1921–1922 CE',
      'Flourished: 1921 CE | Discovered: 2500 BCE',
      'Flourished: 500 BCE | Discovered: 1857 CE',
      'Flourished: 7000 BCE | Discovered: 300 BCE',
    ],
    correctIndex: 0,
    explanation: 'The Mature Harappan cities flourished roughly 2500–1750 BCE and were excavated over 4,000 years later in 1921 (Harappa) and 1922 (Mohenjo-daro).',
    hints: [
      'Do not confuse the ancient era of living cities with when modern archaeologists dug them up.',
      'Flourishing happened in the 3rd millennium BCE.',
      'Daya Ram Sahni and R.D. Banerjee dug in the 1920s CE.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_07_brick_ratio',
    nodeId: NODE_C6_HISTCIV_010,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Harappan baked bricks across Harappa, Mohenjo-daro, Kalibangan, and Lothal followed which standardized ratio of length to width to thickness?',
    options: [
      '4 : 2 : 1',
      '3 : 3 : 1',
      '5 : 2 : 2',
      '2 : 1 : 1',
    ],
    correctIndex: 0,
    explanation: 'The standard Harappan brick proportion is 4:2:1 (e.g., 28 cm × 14 cm × 7 cm), maintained uniformly across hundreds of miles.',
    hints: [
      'Length is twice the width, and width is twice the height/thickness.',
      '4 units long, 2 units wide, 1 unit tall.',
      'This 4:2:1 ratio proves widespread centralized standardisation.',
    ],
  },
  {
    id: 'ch_08_timeline_sort',
    nodeId: NODE_C6_HISTCIV_002,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Chronologically arrange these historical dates from EARLIEST in time to LATEST in time.',
    sortItems: [
      '500 BCE (Early Republics & Buddha)',
      '250 BCE (Ashoka\'s Rock Edicts)',
      '100 BCE (Shunga Period)',
      '120 CE (Kanishka & Kushans)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'BCE dates count backward toward 1 (500 BCE -> 250 BCE -> 100 BCE), followed by CE dates counting forward (120 CE).',
    hints: [
      'Remember BCE counts backward: larger BCE numbers are further back in time.',
      '500 BCE is earlier than 250 BCE.',
      'CE dates count forward from year 1.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_09_year_span',
    nodeId: NODE_C6_HISTCIV_002,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How many calendar years span from 3 BCE to 3 CE? (Remember: there is NO year zero in the historical timeline!)',
    correctAnswer: 5,
    tolerance: 0,
    unit: 'years',
    explanation: '3 BCE to 2 BCE (1 yr), 2 to 1 BCE (1 yr), 1 BCE to 1 CE (1 yr — no year 0!), 1 to 2 CE (1 yr), 2 to 3 CE (1 yr) = 5 years total.',
    hints: [
      'Count the steps: 3 BCE -> 2 BCE -> 1 BCE -> 1 CE -> 2 CE -> 3 CE.',
      'The calendar jumps directly from 1 BCE to 1 CE without a year 0.',
      'Total intervals = 3 + 3 - 1 = 5.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_10_drag_city_plan',
    nodeId: NODE_C6_HISTCIV_010,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Drag each architectural feature to its correct position on the Indus Valley city plan.',
    dragItems: [
      { label: 'Citadel (Raised Western Mound)', targetId: 'zone_citadel' },
      { label: 'Great Bath (Waterproofed Tank)', targetId: 'zone_bath' },
      { label: 'Lower Town (Residential Grid)', targetId: 'zone_lower' },
      { label: 'Covered Brick Drains with Manholes', targetId: 'zone_drain' },
    ],
    correctMapping: {
      zone_citadel: 'Citadel (Raised Western Mound)',
      zone_bath: 'Great Bath (Waterproofed Tank)',
      zone_lower: 'Lower Town (Residential Grid)',
      zone_drain: 'Covered Brick Drains with Manholes',
    },
    explanation: 'The Citadel sits on the high western platform containing the Great Bath, while the residential Lower Town sits to the east with grid streets and underground covered drains.',
    hints: [
      'The Citadel is elevated on the western side of the settlement.',
      'The Great Bath is located inside the public Citadel area.',
      'The Lower Town lies east, where grid streets and street drains run beneath houses.',
    ],
  },
  {
    id: 'ch_11_strata_reason',
    nodeId: NODE_C6_HISTCIV_003,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'At an excavation in Gujarat, an archaeologist finds copper fishhooks at 2 metres depth and crude quartzite hand axes at 6 metres depth. What does stratigraphy tell us?',
    options: [
      'The 6-metre layer is older, proving quartzite tools were used before copper fishhooks',
      'The 2-metre layer is older because it is closer to the surface',
      'Both layers are the exact same age because they are in the same district',
      'The hand axes must have fallen down an earthquake crack from modern times',
    ],
    correctIndex: 0,
    explanation: 'The law of superposition in stratigraphy establishes that deeper undisturbed soil strata were deposited earlier in time.',
    hints: [
      'Deeper soil accumulates first over thousands of years.',
      'Layer 6m is older than Layer 2m.',
      'Quartzite (Paleolithic) predates copper (Chalcolithic).',
    ],
  },
  {
    id: 'ch_12_childe_rev',
    nodeId: NODE_C6_HISTCIV_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did archaeologist V. Gordon Childe coin the term "Neolithic Revolution"?',
    options: [
      'The shift to farming created food surpluses, anchoring people in permanent villages and enabling specialized crafts and towns',
      'Neolithic warriors fought a massive worldwide war with polished stone spears',
      'People suddenly discovered iron smelting and built steam engines',
      'Early humans revolted against their kings in 7000 BCE',
    ],
    correctIndex: 0,
    explanation: 'It was a revolution in human lifestyle: agriculture tied humans to their crops, produced food surpluses, and established settled civilization.',
    hints: [
      '"Revolution" refers to the massive scale of societal transformation, not violence.',
      'Think about the chain: farming -> surplus -> settlement -> crafts -> cities.',
      'Mehrgarh (c. 7000 BCE) exemplifies this turning point in South Asia.',
    ],
  },
  {
    id: 'ch_13_farm_settle_cause',
    nodeId: NODE_C6_HISTCIV_007,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A student claims: "Early humans built permanent stone houses first, and then decided to start farming because they had a cozy home." Why is this logically and historically incorrect?',
    options: [
      'Farming forced humans to stay in one place for months to water, weed, and guard crops; farming caused settlement, not the reverse',
      'Humans were forced to settle because all forests burned down at once',
      'Houses were built only by kings to collect income tax',
      'Nomadic hunter-gatherers already lived in multi-story brick houses',
    ],
    correctIndex: 0,
    explanation: 'Crops take months to grow and harvest. Humans could not wander away without losing their harvest, so the agricultural commitment forced permanent village settlement.',
    hints: [
      'Think of what happens to a wheat field if you abandon it for 3 months to hunt elsewhere.',
      'Tending crops requires daily protection from animals and watering.',
      'Therefore, farming is the cause, and settled life is the consequence.',
    ],
  },
  {
    id: 'ch_14_chalco_bridge',
    nodeId: NODE_C6_HISTCIV_008,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the Chalcolithic Age (~4000–2500 BCE) defined as a "copper-stone bridge", rather than the Bronze Age?',
    options: [
      'Copper was used alongside stone tools; humans had not yet mastered alloying copper with tin to make bronze',
      'Stone tools were completely banned by law as soon as copper was found',
      'Bronze is a pure naturally occurring rock picked off the ground',
      'Chalcolithic people only used copper for making coins and jewellery',
    ],
    correctIndex: 0,
    explanation: 'Chalco (copper) + lithic (stone) refers to the coexistence of copper and stone implements before bronze alloying was developed.',
    hints: [
      'Bronze is an alloy of copper and tin.',
      'In the Chalcolithic, stone tools like blades were still widely used alongside pure copper axes.',
      'Ahar in Rajasthan and Jorwe in Maharashtra illustrate this transition.',
    ],
  },
  {
    id: 'ch_15_bhimbetka_source',
    nodeId: NODE_C6_HISTCIV_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A rock wall at Bhimbetka (Madhya Pradesh) displays red ochre paintings of stick figures holding barbed spears chasing spotted deer, with dancers in a circle around a fire. What can a historian scientifically infer?',
    options: [
      'Fauna (deer), hunting technology (barbed spears), and communal rituals/dance existed in prehistoric society without written records',
      'The painters were writing an alphabet describing a Greek war',
      'Bhimbetka people had television and printed books',
      'The painters were kings advertising their election campaign',
    ],
    correctIndex: 0,
    explanation: 'Cave paintings provide visual primary evidence of prehistoric ecology, hunting weaponry, and social/ritual life where no textual records survive.',
    hints: [
      'Visual art encodes information about diet, weapons, and beliefs.',
      'Bhimbetka has over 750 rock shelters spanning from Upper Paleolithic to Mesolithic.',
      'Dr. V.S. Wakankar discovered this UNESCO World Heritage Site in 1957.',
    ],
  },
  {
    id: 'ch_16_river_four_reasons',
    nodeId: NODE_C6_HISTCIV_009,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate why all four pristine ancient civilizations (Indus, Nile, Tigris-Euphrates, Yellow River) arose in river valleys rather than deep rain forests or high plateaus.',
    options: [
      'Annual floods deposited fertile silt for crops, perennial water for irrigation, riverways for cheap cargo transit, and aquatic protein',
      'River valleys were completely safe from all floods and diseases',
      'Ancient gods commanded humans by law to only touch river water',
      'Plateaus had no rocks for building tools',
    ],
    correctIndex: 0,
    explanation: 'River floodplains provided the 4 vital pillars of early urbanism: fertile silt renewal, reliable water, cheap waterborne transport, and fish protein.',
    hints: [
      'Heavy grain and baked bricks are easiest to transport on river boats.',
      'Annual silt deposits act as natural fertilizer for wheat and barley.',
      'Perennial water supported dense populations in semi-arid zones.',
    ],
  },
  {
    id: 'ch_17_drain_unique',
    nodeId: NODE_C6_HISTCIV_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why do historians consider the Harappan covered drainage system with inspection manholes the most unique civic achievement of the ancient world?',
    options: [
      'No other contemporary civilization (Egypt, Mesopotamia, China) possessed a municipal underground covered drainage network with maintenance access',
      'It was built out of solid gold and silver pipes',
      'It was designed to carry drinking water from Himalayan glaciers directly to houses',
      'It proved the Harappans fought in massive submarine naval battles',
    ],
    correctIndex: 0,
    explanation: 'Harappan covered brick drains connected to private bathrooms with manhole covers for municipal clearing were unparalleled anywhere in the 3rd millennium BCE.',
    hints: [
      'Think of urban sanitation and public health 4,500 years ago.',
      'Egyptian and Mesopotamian cities lacked underground covered municipal sewerage.',
      'Regular manholes indicate dedicated civic maintenance crews.',
    ],
  },
  {
    id: 'ch_18_roots_mistakes_change',
    nodeId: NODE_C6_HISTCIV_001,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A citizen asks: "Why should we spend money studying things that happened thousands of years ago?" Which response best articulates the 3 core benefits of studying history?',
    options: [
      'Reveals civilizational roots (Indus sanitation), teaches lessons from past errors (Bengal famine 1770), and explains societal change (1956 State Reorganisation)',
      'Allows us to predict exact winning lottery numbers for tomorrow',
      'Proves that everything in modern times is worse than ancient myths',
      'Provides entertaining fictional stories for movie scripts',
    ],
    correctIndex: 0,
    explanation: 'History provides roots/identity, caution against repeating governance catastrophes, and context for understanding how current institutions evolved.',
    hints: [
      'Look for the three distinct pillars: roots, learning from failures, and explaining modern change.',
      'E.H. Carr defined history as an unending dialogue between present and past.',
      'Without memory, society repeats avoidable errors.',
    ],
  },
  {
    id: 'ch_19_town_construct',
    nodeId: NODE_C6_HISTCIV_010,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the 4 essential engineering pillars of a Mature Harappan city into the correct architectural formula.',
    availableParts: [
      'Grid Streets (N-S & E-W)',
      'Standard 4:2:1 Baked Bricks',
      'Citadel & Lower Town Division',
      'Covered Drains with Manholes',
      'Mud Huts with Thatch',
      'Random Winding Alleys',
    ],
    targetState: 'Grid Streets (N-S & E-W) Standard 4:2:1 Baked Bricks Citadel & Lower Town Division Covered Drains with Manholes',
    validationHint: 'Select only the 4 authentic Harappan urban features (avoid random winding alleys and mud thatch).',
    explanation: 'Mature Harappan urban planning combined cardinal grid roads, standardized 4:2:1 fired bricks, dual-zone topography (Citadel/Lower Town), and covered sanitation drains.',
    hints: [
      'Pick the 4 features that show organized central municipal planning.',
      'Exclude random alleys (Harappan streets were straight right angles).',
      'Include 4:2:1 bricks, grid roads, Citadel/Lower town, and underground drains.',
    ],
  },
  {
    id: 'ch_20_kalhana_herodotus',
    nodeId: NODE_C6_HISTCIV_001,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How do Herodotus (5th c. BCE, Greece) and Kalhana (1148 CE, Kashmir - Rajatarangini) represent the true spirit of disciplined historical inquiry?',
    options: [
      'Both insisted on examining evidence, cross-checking sources, and investigating causes rather than recording unverified folklore',
      'Both claimed gods dictated every historical fact directly into their dreams',
      'Both wrote entirely fictional romantic poetry for royal entertainment',
      'Both believed history should never be written down on parchment or stone',
    ],
    correctIndex: 0,
    explanation: 'Herodotus initiated inquiry (historia) into causes of the Persian wars; Kalhana critically consulted 11 earlier chronicles and royal charters to write the Rajatarangini.',
    hints: [
      'Notice the commitment to evidence-based inquiry across two distant civilizations.',
      'Kalhana examined inscriptions and old coins to verify Kashmiri king lists.',
      'Herodotus sought eyewitness accounts and examined why wars occurred.',
    ],
  },
  {
    id: 'ch_21_preservation_bias',
    nodeId: NODE_C6_HISTCIV_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why do museums display thousands of Paleolithic stone hand axes, but very few wooden digging sticks or bone needles from the same era?',
    options: [
      'Preservation bias: inorganic stone resists microbial decay for millions of years, while organic wood and bone decompose quickly in moist soil',
      'Early humans were strictly forbidden from touching wood or bone',
      'Early humans had no trees or animals in their environment',
      'Archaeologists throw away wooden objects because they only like collecting rocks',
    ],
    correctIndex: 0,
    explanation: 'Absence of evidence in the ground is not evidence of absence in daily life: organic materials rot, leaving durable lithic artefacts over-represented.',
    hints: [
      'Consider what happens to a wooden stick buried in wet mud for 500,000 years.',
      'Stone (quartzite, flint) does not rot or decay.',
      'This skew in survival is known as archaeological preservation bias.',
    ],
  },
  {
    id: 'ch_22_mehrgarh_significance',
    nodeId: NODE_C6_HISTCIV_007,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'What makes Mehrgarh (Bolan Pass, Balochistan, ~7000 BCE) the key site for understanding the transition to agriculture in the Indian subcontinent?',
    options: [
      'Continuous occupational strata show the gradual shift from hunting wild game to farming wheat/barley and domesticating sheep, goats, and zebu cattle',
      'It is the site where iron steam trains were first invented in 7000 BCE',
      'It was an uninhabited desert where no plant or animal remains were ever found',
      'It proves farming was introduced by Roman sea merchants in 500 CE',
    ],
    correctIndex: 0,
    explanation: 'Excavations by Jean-François Jarrige at Mehrgarh revealed uninterrupted stratigraphic layers documenting the indigenous transition from foraging to farming.',
    hints: [
      'Mehrgarh sits strategically near the Bolan Pass.',
      'Excavators found wheat, two-row barley, and animal bones shifting from wild to domesticated species.',
      'It proves agricultural roots in South Asia go back over 9,000 years.',
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
  nodeId: NODE_C6_HISTCIV_001,
  title: 'History: Meaning, Sources, Early Man & Indus Civilization',
  definition:
    'History is the disciplined, evidence-based inquiry into the human past using archaeological, literary, and oral sources arranged on a chronological timeline. From the nomadic Old Stone Age and the Neolithic agricultural revolution at Mehrgarh, human society advanced to the planned, brick-built urban civilization of the Indus Valley.',
  eli5:
    'History is like being a detective of time. Instead of making up fairy tales, historians and archaeologists look for real clues — like broken pots, stone tools, old coins, cave paintings, and underground city drains — to discover how real people lived thousands of years ago.',
  misconceptions: [
    {
      misconception: 'History is just old stories and fairy tales that someone wrote down.',
      correction: 'History requires verifiable evidence (sources) that can be checked by other scholars; unverified stories remain folklore, not history.',
    },
    {
      misconception: 'Historians and archaeologists do the exact same job.',
      correction: 'Historians work primarily with written and oral records in archives; archaeologists excavate physical artefacts and ruins from soil strata in the field.',
    },
    {
      misconception: 'Coins with writing on them are literary sources.',
      correction: 'Coins are archaeological sources because they are physical manufactured artefacts; the inscription is just one surface feature.',
    },
    {
      misconception: 'Humans evolved directly from modern monkeys.',
      correction: 'Humans and modern apes share a distant common ape-like ancestor from which separate evolutionary branches diverged millions of years ago.',
    },
    {
      misconception: 'Early humans invented fire from nothing on day one.',
      correction: 'Humans first discovered naturally occurring fire (lightning, forest fires), learned to keep embers alive, and only much later mastered friction/flint creation.',
    },
    {
      misconception: 'The Indus Valley Civilisation was discovered in 2500 BCE.',
      correction: 'The Mature Harappan cities flourished c. 2500–1750 BCE, but were discovered by modern archaeologists in 1921–1922 CE.',
    },
    {
      misconception: 'BC dates count forward and there is a year zero.',
      correction: 'BC dates count backwards toward year 1, and the timeline moves directly from 1 BCE to 1 CE with no year zero.',
    },
    {
      misconception: 'The Great Bath was a reservoir for storing drinking water.',
      correction: 'The Great Bath at Mohenjo-daro was a ritual purification bathing tank with steps, bitumen sealant, and an outlet drain.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is the Greek root of the word "history" and what does it mean?',
      options: ['Historia — meaning inquiry or investigation', 'Chronos — meaning magical time', 'Mythos — meaning imaginative storytelling', 'Polis — meaning war battle'],
      correctIndex: 0,
    },
    {
      question: 'Which of the following is an archaeological source?',
      options: ['Ashoka\'s Rock Edict at Girnar', 'Manuscript of Rigveda', 'Panchatantra oral fable', 'Modern school history textbook'],
      correctIndex: 0,
    },
    {
      question: 'What scientific principle states that deeper soil layers are older than upper layers?',
      options: ['Stratigraphy', 'Epigraphy', 'Numismatics', 'Chronometry'],
      correctIndex: 0,
    },
    {
      question: 'Which tool type is uniquely associated with the Mesolithic (Middle Stone Age)?',
      options: ['Microliths (tiny stone blades set in handles)', 'Polished stone axes', 'Iron swords', 'Crude heavy quartzite cleavers only'],
      correctIndex: 0,
    },
    {
      question: 'At which early Neolithic site in the Bolan Pass was wheat farming and animal domestication dated to ~7000 BCE?',
      options: ['Mehrgarh', 'Attirampakkam', 'Taxila', 'Hastinapur'],
      correctIndex: 0,
    },
    {
      question: 'Why was copper the first metal used by humans in the Chalcolithic Age?',
      options: ['It occurs naturally in pure malleable state and can be cold-hammered without smelting', 'It was the hardest metal on Earth', 'It was cheaper than iron ore', 'It was discovered inside volcanoes only'],
      correctIndex: 0,
    },
    {
      question: 'Which two archaeologists directed the initial excavations of Harappa and Mohenjo-daro in 1921-1922?',
      options: ['Daya Ram Sahni & R.D. Banerjee', 'Alexander Cunningham & Mortimer Wheeler', 'James Prinsep & William Jones', 'Jean-François Jarrige & V.S. Wakankar'],
      correctIndex: 0,
    },
    {
      question: 'What unique sanitation feature was built beneath Harappan streets at Mohenjo-daro?',
      options: ['Covered brick drains with inspection manholes', 'Open muddy gutters', 'Pressurized steam aqueducts', 'Cast-iron sewer pipes'],
      correctIndex: 0,
    },
  ],
  masteryCriteria: 'Student understands the evidence-based nature of history, timeline mechanics, Stone Age progression, and Indus Valley urban planning.',
};

// ─── BRILLIANT-STYLE INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Detective’s Toolkit: Sources of History',
    instruction: 'Click on the excavation strata to inspect different buried sources and see whether they are Archaeological, Literary, or Oral.',
    interactionType: 'click-strata',
    nodeId: NODE_C6_HISTCIV_002,
  },
  {
    title: '2. The Time Machine: BC/AD Timeline Slider',
    instruction: 'Drag the timeline slider backwards and forwards to observe how BCE years count backward toward year 1 and CE counts forward.',
    interactionType: 'timeline-slider',
    nodeId: NODE_C6_HISTCIV_002,
  },
  {
    title: '3. Stone Age Evolution: Tool & Lifestyle Progression',
    instruction: 'Step through the 3 Stone Ages and the Chalcolithic to see how stone tools transformed into polished axes, microliths, and copper blades.',
    interactionType: 'tool-progression',
    nodeId: NODE_C6_HISTCIV_005,
  },
  {
    title: '4. The Neolithic Spark: Farming, Surplus & Settlement',
    instruction: 'Simulate crop yield at Mehrgarh. Increase wheat planting with the slider to observe how food surplus directly enables village settlement and specialized crafts.',
    interactionType: 'farming-surplus',
    nodeId: NODE_C6_HISTCIV_007,
  },
  {
    title: '5. Harappan City Architect: Grid Streets & Drainage',
    instruction: 'Adjust the city street grid and toggle the covered drainage system with manholes to see how Mohenjo-daro maintained municipal sanitation.',
    interactionType: 'city-grid-drainage',
    nodeId: NODE_C6_HISTCIV_010,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an archaeologist digs 4 distinct layers down into an ancient mound, which layer contains the Paleolithic crude stone tools?',
    options: [
      'Layer 1 (the uppermost topsoil layer)',
      'Layer 2 (just beneath modern grass)',
      'Layer 4 (the deepest undisturbed bottom layer)',
      'All layers have the exact same mix of items',
    ],
    correctIndex: 2,
    verifyInstruction: 'Now interact with the Stratigraphy Dig tool below to excavate layer by layer and verify your prediction!',
    nodeId: NODE_C6_HISTCIV_003,
  },
  {
    question: 'Predict: When Neolithic humans at Mehrgarh started harvesting surplus wheat (more than they needed to eat today), what happened to the population?',
    options: [
      'Some people could stop farming and become potters, builders, and tool-makers',
      'Everyone immediately abandoned the village and became nomadic hunters again',
      'The entire population starved because surplus is harmful',
      'All tools disappeared instantly',
    ],
    correctIndex: 0,
    verifyInstruction: 'Drag the Wheat Harvest slider to +80% surplus and observe occupational specialization unlock!',
    nodeId: NODE_C6_HISTCIV_007,
  },
];

// ���── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the calendar distance between 500 BCE and 250 BCE compared to 250 BCE and 1 BCE?',
    observableOptions: [
      '500 BCE is further in the past; larger BCE numbers are older because they count down to year 1',
      '500 BCE is closer to our modern time than 250 BCE',
      'BCE numbers increase as time moves forward',
      'There is no mathematical pattern in BCE dates',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_HISTCIV_002,
  },
  {
    question: 'Observe the Harappan street plan: what angle do the cross-streets make when meeting the principal north-south thoroughfares?',
    observableOptions: [
      'Exact 90-degree right angles, forming a structured rectangular grid',
      'Random winding zig-zags with no straight lines',
      'Circular concentric rings like a spider web',
      'Diagonal triangles intersecting haphazardly',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_HISTCIV_010,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Be an Archaeological Detective at Home & City',
  description:
    'Put on your historian hat! Examine 3 real objects in your home or neighbourhood (a family photograph from 1980, a dated metal coin, and an oral recipe passed down by grandparents) and classify each into Archaeological, Literary, or Oral.',
  steps: [
    'Find 1 physical manufactured object (e.g., an old coin or clay diya) -> Identify as Archaeological.',
    'Find 1 written text or letter with handwriting/print -> Identify as Literary.',
    'Record 1 family story or folk song spoken by an elder -> Identify as Oral.',
    'Draw a mini timeline showing what year each originated (marking BCE/CE).',
  ],
};

// ─── MAIN COMPONENT ───
function C6_HistoryCivicsHistoryMeaningDefinitionSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['historycivics'] || {
    name: 'History & Civics',
    emoji: '🏛️',
    color: 'amber',
  };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org state hooks
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Lab State: Stratigraphy & Sources
  const [selectedStrata, setSelectedStrata] = useState<number | null>(0);
  const [inspectedArtifact, setInspectedArtifact] = useState<string | null>('Ashokan Edict');

  // Interactive Lab State: Timeline Slider
  const [timelineYear, setTimelineYear] = useState<number>(-2500); // -2500 is 2500 BCE

  // Interactive Lab State: Stone Age Progression
  const [stoneAgeStage, setStoneAgeStage] = useState<number>(0); // 0=Paleo, 1=Meso, 2=Neo, 3=Chalco

  // Interactive Lab State: Neolithic Farming Simulator (Real-time Slider connected to visualization)
  const [wheatPlanted, setWheatPlanted] = useState<number>(40); // kg
  const [settlementSize, setSettlementSize] = useState<number>(25);

  // Interactive Lab State: Harappan City Plan
  const [activeZone, setActiveZone] = useState<'citadel' | 'bath' | 'granary' | 'lowertown'>('bath');

  // Challenge & Feedback state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Drag & Sort & Numeric & Construct state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineGsapRef = useRef<HTMLDivElement | null>(null);

  // Filtered challenges by current difficulty tier
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY ADAPTATION ───
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

  // ─── GSAP ANIMATION FOR TIMELINE ───
  useEffect(() => {
    if (timelineGsapRef.current) {
      gsap.fromTo(
        timelineGsapRef.current,
        { opacity: 0.7, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [timelineYear, stoneAgeStage]);

  // ─── CANVAS ANIMATION: 2D PARTICLES (Archaeological Dust) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];

    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.4 + 0.1,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        ctx.fillStyle = `rgba(245, 158, 11, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── ESCALATING HINTS HANDLER ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge?.hints?.[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  // ─── AUTO-HINT TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── HANDLER: DISCOVERY ANSWER ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Brilliant deduction! Harappa pushed Indian urban history back by over two millennia.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  // ─── PHASE TRANSITIONS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Step 1: Explore how historians piece together evidence.');
  }, []);

  const handleSliderChange = useCallback((val: number) => {
    setTimelineYear(val);
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with the ancient technologies and city builder!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge time! Let us test your archaeological detective skills.');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the lab controls below to see the result.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Look closer at the numbers on the scale.');
  }, []);

  // ─── INTERACTIVE LAB CONTROLS ───
  const handleStrataClick = useCallback((depthLevel: number, artifactName: string) => {
    setSelectedStrata(depthLevel);
    setInspectedArtifact(artifactName);
    audioManager.play('pickup');
    speechManager.speak(`Inspecting layer at ${depthLevel} metres depth: ${artifactName}`);
  }, []);

  const handleTimelineChange = useCallback((yearVal: number) => {
    setTimelineYear(yearVal);
    audioManager.play('count');
  }, []);

  const handleStoneAgeStep = useCallback((stageIdx: number) => {
    setStoneAgeStage(stageIdx);
    audioManager.play('tap');
    const stageNames = ['Paleolithic (Old Stone)', 'Mesolithic (Microliths)', 'Neolithic (Farming Revolution)', 'Chalcolithic (Copper & Stone)'];
    speechManager.speak(stageNames[stageIdx]);
  }, []);

  const handleWheatHarvestChange = useCallback((amount: number) => {
    setWheatPlanted(amount);
    const surplus = Math.max(0, amount - 20);
    const newSettlement = 15 + Math.floor(surplus * 1.2);
    setSettlementSize(newSettlement);
  }, []);

  const handleZoneSwitch = useCallback((zone: 'citadel' | 'bath' | 'granary' | 'lowertown') => {
    setActiveZone(zone);
    audioManager.play('tap');
  }, []);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Mastery achieved! You have reconstructed ancient Indian history with scientific evidence.');
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
      setCurrentChallenge((prev) => prev + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // ─── DRAG AND DROP HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge?.correctMapping?.[targetId] === draggedItem;
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

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const arr = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    const isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors((e) => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      showNextHint();
    }
  }, [sortArrangement, challenge, showNextHint]);

  // ─── ANSWER HANDLER ───
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
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent historical deduction.');
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
          speechManager.speak('Let us study the complete explanation together.');
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

  // ─── CLEANUP ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans relative overflow-hidden"
    >
      {/* Background Ambience Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={100}
        className="absolute top-0 left-0 w-full h-24 pointer-events-none opacity-40 z-0"
      />

      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
              ICSE Class 6 Humanities • {subjectConfig.name}
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 text-xs"
        >
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((pStep) => (
            <motion.span
              key={pStep}
              whileHover={{ scale: 1.05 }}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                phase === pStep
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 opacity-60'
              }`}
            >
              {pStep.charAt(0).toUpperCase() + pStep.slice(1)}
            </motion.span>
          ))}
        </motion.div>
      </motion.header>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-6 relative z-10">
          <motion.div
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-500/30"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30"
            >
              Curiosity Hook • Historical Detective Challenge
            </motion.span>
            <h2 className="text-2xl font-black text-amber-200 mt-3">{SCENARIO.title}</h2>
            <p className="text-sm md:text-base text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-amber-400/90 mt-2 italic font-mono">{SCENARIO.context}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">❓</span> {DISCOVERY_QUESTION.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50'
                      : discoveryAnswered && !discoveryCorrect
                      ? 'bg-slate-800/60 border-slate-700 text-slate-400'
                      : 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-mono text-amber-400 font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Daya Ram Sahni and R.D. Banerjee discovered Harappa and Mohenjo-daro in 1921–22.'
                    : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/20 whitespace-nowrap"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORE PHASE: INTERACTIVE LABS ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 relative z-10">
          {/* Step Banner */}
          <motion.div
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between bg-slate-900/90 p-4 rounded-2xl border border-slate-800"
          >
            <div>
              <span className="text-xs text-amber-400 font-mono uppercase tracking-wider">
                Interactive Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
              <p className="text-sm text-slate-300 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs rounded-xl font-bold"
              >
                ← Prev
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) {
                    setCurrentSlide((s) => s + 1);
                    audioManager.play('tap');
                  } else {
                    handleAdvanceToSandbox();
                  }
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs rounded-xl font-black shadow-md"
              >
                {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Lab →' : 'To Sandbox →'}
              </motion.button>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900/70 backdrop-blur rounded-2xl border border-slate-800 min-h-[420px]"
            >
              {/* ─── LAB STEP 0: STRATIGRAPHY & SOURCES DETECTIVE ─── */}
              {currentSlide === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* SVG Stratigraphy Trench */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800"
                    >
                      <p className="text-xs font-mono text-amber-400 mb-2">
                        EXCAVATION TRENCH (Law of Superposition: Deeper = Older)
                      </p>
                      <svg viewBox="0 0 500 280" className="w-full h-64 select-none">
                        {/* Layer 1: Modern / Medieval */}
                        <g
                          onClick={() => handleStrataClick(1, 'Medieval Coin & Kalhana Manuscript')}
                          className="cursor-pointer transition-opacity hover:opacity-90"
                        >
                          <rect
                            x="20"
                            y="20"
                            width="460"
                            height="50"
                            rx="6"
                            fill={selectedStrata === 1 ? '#78350f' : '#292524'}
                            stroke={selectedStrata === 1 ? '#f59e0b' : '#44403c'}
                            strokeWidth="2"
                          />
                          <text x="40" y="45" fill="#fef3c7" fontSize="13" fontWeight="bold">
                            Layer 1 (0.5m - 1.0m): Medieval & Modern (Coins & Manuscripts)
                          </text>
                          <text x="40" y="62" fill="#a8a29e" fontSize="11">
                            Literary/Archaeological • ~1100 CE (Kalhana's Rajatarangini era)
                          </text>
                        </g>

                        {/* Layer 2: Mauryan / Ashokan */}
                        <g
                          onClick={() => handleStrataClick(2, 'Ashoka Rock Edict at Girnar')}
                          className="cursor-pointer transition-opacity hover:opacity-90"
                        >
                          <rect
                            x="20"
                            y="80"
                            width="460"
                            height="50"
                            rx="6"
                            fill={selectedStrata === 2 ? '#1e3a8a' : '#1e293b'}
                            stroke={selectedStrata === 2 ? '#60a5fa' : '#334155'}
                            strokeWidth="2"
                          />
                          <text x="40" y="105" fill="#dbeafe" fontSize="13" fontWeight="bold">
                            Layer 2 (2.0m - 2.5m): Mauryan Epoch (250 BCE)
                          </text>
                          <text x="40" y="122" fill="#94a3b8" fontSize="11">
                            Archaeological Inscription (Ashoka edicts deciphered by Prinsep 1837)
                          </text>
                        </g>

                        {/* Layer 3: Mature Harappan */}
                        <g
                          onClick={() => handleStrataClick(3, 'Harappan 4:2:1 Baked Bricks & Steatite Seal')}
                          className="cursor-pointer transition-opacity hover:opacity-90"
                        >
                          <rect
                            x="20"
                            y="140"
                            width="460"
                            height="55"
                            rx="6"
                            fill={selectedStrata === 3 ? '#14532d' : '#0f172a'}
                            stroke={selectedStrata === 3 ? '#22c55e' : '#334155'}
                            strokeWidth="2"
                          />
                          <text x="40" y="166" fill="#dcfce7" fontSize="13" fontWeight="bold">
                            Layer 3 (4.0m - 5.0m): Mature Indus Valley Civilisation (2500 BCE)
                          </text>
                          <text x="40" y="184" fill="#86efac" fontSize="11">
                            Standardized Bricks, Inscribed Seals, Covered Drainage pipes
                          </text>
                        </g>

                        {/* Layer 4: Paleolithic Quartzite */}
                        <g
                          onClick={() => handleStrataClick(4, 'Quartzite Hand Axe (Attirampakkam)')}
                          className="cursor-pointer transition-opacity hover:opacity-90"
                        >
                          <rect
                            x="20"
                            y="205"
                            width="460"
                            height="60"
                            rx="6"
                            fill={selectedStrata === 4 ? '#701a75' : '#18181b'}
                            stroke={selectedStrata === 4 ? '#d946ef' : '#3f3f46'}
                            strokeWidth="2"
                          />
                          <text x="40" y="233" fill="#fae8ff" fontSize="13" fontWeight="bold">
                            Layer 4 (7.0m - 8.0m): Paleolithic Bedrock (~500,000 BCE)
                          </text>
                          <text x="40" y="252" fill="#e879f9" fontSize="11">
                            Crude chipped quartzite hand axes, ash from natural fires
                          </text>
                        </g>
                      </svg>
                    </motion.div>

                    {/* Inspector Details Panel */}
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="lg:col-span-5 p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3"
                    >
                      <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                        🔎 Source Classification Analysis
                      </span>
                      <h4 className="text-base font-bold text-white">{inspectedArtifact}</h4>

                      <div className="space-y-2 text-xs text-slate-300">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between"
                        >
                          <span className="text-slate-400">Primary Classification:</span>
                          <span className="font-bold text-amber-300">
                            {selectedStrata === 1
                              ? 'Literary / Coin'
                              : selectedStrata === 2
                              ? 'Archaeological (Stone)'
                              : selectedStrata === 3
                              ? 'Archaeological (Urban)'
                              : 'Archaeological (Lithic)'}
                          </span>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between"
                        >
                          <span className="text-slate-400">Chronological Era:</span>
                          <span className="font-bold text-emerald-300">
                            {selectedStrata === 1
                              ? '~1148 CE'
                              : selectedStrata === 2
                              ? '~250 BCE'
                              : selectedStrata === 3
                              ? '2500 - 1750 BCE'
                              : '~500,000 BCE'}
                          </span>
                        </motion.div>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="p-3 bg-amber-950/20 rounded-lg border border-amber-500/20 text-amber-200"
                        >
                          {selectedStrata === 1
                            ? 'Kalhana’s Rajatarangini chronicled Kashmiri kings using 11 older records. Disciplined history relies on checkable documents.'
                            : selectedStrata === 2
                            ? 'James Prinsep cracked the Brahmi script in 1837, allowing historians to directly read Emperor Ashoka’s ethical governance edicts.'
                            : selectedStrata === 3
                            ? 'Daya Ram Sahni & R.D. Banerjee excavated Harappa and Mohenjo-daro in 1921–22, revealing urban sanitation without deciphered script.'
                            : 'Paleolithic tools excavated at Attirampakkam and Soan Valley prove humans lived in India over 1.5 million years ago.'}
                        </motion.p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ─── LAB STEP 1: BC/AD INTERACTIVE TIMELINE SLIDER ─── */}
              {currentSlide === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6" ref={timelineGsapRef}>
                  <motion.div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-amber-400">
                        CURRENT TIMELINE POSITION: {timelineYear < 0 ? `${Math.abs(timelineYear)} BCE` : `${timelineYear} CE`}
                      </span>
                      <motion.span
                        key={timelineYear}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-lg border border-amber-500/30"
                      >
                        {timelineYear < -2000
                          ? 'Indus Valley Period'
                          : timelineYear < -500
                          ? 'Vedic & Mahajanapadas'
                          : timelineYear < 0
                          ? 'Mauryan Empire'
                          : 'Common Era (CE)'}
                      </motion.span>
                    </div>

                    {/* Real-time Slider Connection */}
                    <input
                      type="range"
                      min={-3000}
                      max={2000}
                      step={50}
                      value={timelineYear}
                      onChange={(e) => handleTimelineChange(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-ew-resize h-3 bg-slate-800 rounded-lg"
                    />

                    {/* Dynamic Real-time SVG Timeline Visualizer */}
                    <svg viewBox="0 0 500 70" className="w-full h-16 bg-slate-900 rounded-xl p-1">
                      {/* Base timeline line */}
                      <line x1="25" y1="35" x2="475" y2="35" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
                      {/* Zero transition marker */}
                      <line x1="300" y1="15" x2="300" y2="55" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,3" />
                      <text x="300" y="65" fill="#f43f5e" fontSize="9" textAnchor="middle" fontWeight="bold">NO YEAR 0 (1 BCE ➔ 1 CE)</text>

                      {/* Dynamic Pointer position: range is -3000 to +2000 -> 5000 units mapping to 25 to 475 (450px span) */}
                      {(() => {
                        const posX = 25 + ((timelineYear + 3000) / 5000) * 450;
                        return (
                          <g>
                            <circle cx={posX} cy="35" r="8" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                            <polygon points={`${posX},22 ${posX - 6},12 ${posX + 6},12`} fill="#f59e0b" />
                            <text x={posX} y="10" fill="#fde68a" fontSize="10" fontWeight="black" textAnchor="middle">
                              {timelineYear < 0 ? `${Math.abs(timelineYear)} BCE` : `${timelineYear} CE`}
                            </text>
                          </g>
                        );
                      })()}
                    </svg>

                    {/* Interactive Marker Visualizer */}
                    <div className="grid grid-cols-5 text-center text-xs text-slate-400 font-mono pt-2 border-t border-slate-800">
                      <motion.div whileHover={{ scale: 1.05 }}>3000 BCE<br/><span className="text-[10px] text-slate-500">Early Harappan</span></motion.div>
                      <motion.div whileHover={{ scale: 1.05 }}>2000 BCE<br/><span className="text-[10px] text-slate-500">Late Harappan</span></motion.div>
                      <motion.div whileHover={{ scale: 1.05 }}>1000 BCE<br/><span className="text-[10px] text-slate-500">Iron Age / Vedic</span></motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} className="text-amber-400 font-bold">1 CE / AD<br/><span className="text-[10px] text-rose-400">NO Year 0!</span></motion.div>
                      <motion.div whileHover={{ scale: 1.05 }}>2000 CE<br/><span className="text-[10px] text-slate-500">Modern India</span></motion.div>
                    </div>
                  </motion.div>

                  {/* Multi-Representation Comparison Card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                      <h4 className="font-bold text-amber-300">⏳ The Backward Counting Rule of BCE</h4>
                      <p className="text-slate-300 leading-relaxed">
                        BCE counts backward toward Year 1. A date of <strong className="text-white">500 BCE</strong> is{' '}
                        <strong className="text-emerald-300">250 years earlier</strong> than 250 BCE!
                      </p>
                      <div className="p-2 bg-slate-900 rounded font-mono text-amber-400 text-center">
                        500 BCE ➔ 250 BCE ➔ 100 BCE ➔ 1 CE ➔ 2026 CE
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                      <h4 className="font-bold text-rose-300">⚠️ The Phantom Year Zero Trap</h4>
                      <p className="text-slate-300 leading-relaxed">
                        The Gregorian timeline jumps directly from <strong className="text-white">1 BCE</strong> to{' '}
                        <strong className="text-white">1 CE</strong>. Therefore, from 3 BCE to 3 CE is only{' '}
                        <strong className="text-emerald-300">5 years</strong> (3 + 3 - 1 = 5), not 6!
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ─── LAB STEP 2: STONE AGE & CHALCOLITHIC PROGRESSION ─── */}
              {currentSlide === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  {/* Selector Tabs */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { idx: 0, label: 'Paleolithic', sub: 'Old Stone' },
                      { idx: 1, label: 'Mesolithic', sub: 'Microliths' },
                      { idx: 2, label: 'Neolithic', sub: 'Polished & Farms' },
                      { idx: 3, label: 'Chalcolithic', sub: 'Copper & Stone' },
                    ].map((st) => (
                      <motion.button
                        key={st.idx}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleStoneAgeStep(st.idx)}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          stoneAgeStage === st.idx
                            ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                        }`}
                      >
                        <span className="text-xs font-bold text-amber-400">{st.label}</span>
                        <p className="text-[11px] text-slate-400">{st.sub}</p>
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG Tool & Material Diagram */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-6"
                  >
                    <svg viewBox="0 0 240 180" className="w-48 h-36 bg-slate-900 rounded-xl border border-slate-800 p-2">
                      {stoneAgeStage === 0 && (
                        <g>
                          <polygon points="120,20 60,140 180,140" fill="#78716c" stroke="#d6d3d1" strokeWidth="2" />
                          <line x1="80" y1="80" x2="160" y2="120" stroke="#44403c" strokeWidth="2" />
                          <text x="120" y="165" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">
                            Chipped Quartzite Cleaver
                          </text>
                        </g>
                      )}
                      {stoneAgeStage === 1 && (
                        <g>
                          <rect x="30" y="80" width="180" height="15" rx="4" fill="#78350f" />
                          <polygon points="190,75 220,87 190,100" fill="#38bdf8" stroke="#e0f2fe" strokeWidth="1" />
                          <polygon points="150,75 170,87 150,100" fill="#38bdf8" />
                          <text x="120" y="165" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
                            Microliths in Wooden Handle
                          </text>
                        </g>
                      )}
                      {stoneAgeStage === 2 && (
                        <g>
                          <polygon points="120,30 80,130 160,130" fill="#047857" stroke="#34d399" strokeWidth="2" />
                          <circle cx="120" cy="80" r="10" fill="#065f46" />
                          <text x="120" y="165" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                            Ground & Polished Celt Axe
                          </text>
                        </g>
                      )}
                      {stoneAgeStage === 3 && (
                        <g>
                          <path d="M 60,60 L 160,40 L 170,120 L 70,110 Z" fill="#ea580c" stroke="#fdba74" strokeWidth="2" />
                          <polygon points="180,70 210,80 180,90" fill="#94a3b8" />
                          <text x="120" y="165" textAnchor="middle" fill="#fb923c" fontSize="11" fontWeight="bold">
                            Hammered Copper Flat Axe + Stone
                          </text>
                        </g>
                      )}
                    </svg>

                    <div className="space-y-2 text-xs text-slate-300">
                      <h4 className="text-sm font-bold text-white">
                        {stoneAgeStage === 0 && 'Paleolithic (~2.5M – 10,000 BCE)'}
                        {stoneAgeStage === 1 && 'Mesolithic (~10,000 – 8,000 BCE)'}
                        {stoneAgeStage === 2 && 'Neolithic (~8,000 – 4,000 BCE)'}
                        {stoneAgeStage === 3 && 'Chalcolithic (~4,000 – 2,500 BCE)'}
                      </h4>
                      <p className="text-slate-300">
                        {stoneAgeStage === 0 &&
                          'Nomadic hunter-gatherers using crude chipped quartzite stones. Lived in caves like Bhimbetka. Discovered fire from lightning strikes.'}
                        {stoneAgeStage === 1 &&
                          'Post-Ice Age climate warming created open grasslands. Fast animals prompted tiny microlith points set in wood and bone handles (Bagor, Adamgarh).'}
                        {stoneAgeStage === 2 &&
                          'The Neolithic Revolution: deliberate wheat/barley planting and animal domestication at Mehrgarh. Pottery for storage and permanent villages.'}
                        {stoneAgeStage === 3 &&
                          'Copper was the first metal because native copper nuggets could be cold-hammered without complex smelting. Used alongside stone (Ahar, Jorwe).'}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* ─── LAB STEP 3: NEOLITHIC SURPLUS & SETTLEMENT SIMULATOR ─── */}
              {currentSlide === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  {/* Predict-Then-Check Container */}
                  {!predictionMade && (
                    <motion.div
                      initial={{ scale: 0.98 }}
                      animate={{ scale: 1 }}
                      className="p-4 bg-amber-950/40 rounded-xl border border-amber-500/30 space-y-3"
                    >
                      <p className="text-xs font-bold text-amber-300 uppercase font-mono">
                        🔮 Scientific Prediction Challenge
                      </p>
                      <p className="text-sm text-white font-medium">{PREDICTION_QUESTIONS[1].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[1].options.map((pOpt, pI) => (
                          <motion.button
                            key={pI}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(pI)}
                            className="p-2.5 text-left rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 border border-slate-700"
                          >
                            {pOpt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Real-time Slider to Visualization Connection */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-amber-400 font-bold">
                        🌾 MEHRGARH WHEAT HARVEST SLIDER: {wheatPlanted} kg / season
                      </span>
                      <span className="text-xs font-bold text-emerald-400 font-mono">
                        Surplus: {Math.max(0, wheatPlanted - 20)} kg | Population: {settlementSize}
                      </span>
                    </div>

                    <input
                      type="range"
                      min={20}
                      max={100}
                      step={5}
                      value={wheatPlanted}
                      onChange={(e) => handleWheatHarvestChange(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-ew-resize h-3 bg-slate-800 rounded-lg"
                    />

                    {/* Dynamic Real-time SVG Mehrgarh Village Visualizer */}
                    <svg viewBox="0 0 500 120" className="w-full h-28 bg-slate-900 rounded-xl p-2 select-none">
                      {/* Ground */}
                      <rect x="0" y="90" width="500" height="30" fill="#332414" />
                      <line x1="0" y1="90" x2="500" y2="90" stroke="#78350f" strokeWidth="2" />

                      {/* Dynamic Wheat Stalks (number proportional to wheatPlanted) */}
                      {Array.from({ length: Math.min(25, Math.floor(wheatPlanted / 4)) }).map((_, wIdx) => (
                        <g key={wIdx} transform={`translate(${15 + wIdx * 10}, 90)`}>
                          <line x1="0" y1="0" x2="0" y2="-30" stroke="#f59e0b" strokeWidth="2" />
                          <circle cx="0" cy="-32" r="3" fill="#fbbf24" />
                          <line x1="0" y1="-20" x2="4" y2="-26" stroke="#f59e0b" strokeWidth="1.5" />
                        </g>
                      ))}

                      {/* Granary (height scales with surplus) */}
                      {(() => {
                        const granaryHeight = 20 + Math.min(50, (wheatPlanted - 20) * 0.7);
                        return (
                          <g transform={`translate(280, ${90 - granaryHeight})`}>
                            <rect x="0" y="0" width="45" height={granaryHeight} rx="3" fill="#b45309" stroke="#fbbf24" strokeWidth="2" />
                            <polygon points="-5,0 22.5,-12 50,0" fill="#78350f" />
                            <text x="22.5" y={granaryHeight / 2 + 3} fill="#fef3c7" fontSize="8" fontWeight="bold" textAnchor="middle">Granary</text>
                          </g>
                        );
                      })()}

                      {/* Dynamic Village Huts (appear with population growth) */}
                      {Array.from({ length: Math.min(5, Math.floor(settlementSize / 18)) }).map((_, hIdx) => (
                        <g key={hIdx} transform={`translate(${340 + hIdx * 30}, 55)`}>
                          <rect x="0" y="15" width="24" height="20" fill="#92400e" stroke="#d97706" strokeWidth="1.5" />
                          <polygon points="-2,15 12,2 26,15" fill="#78350f" />
                          <rect x="8" y="24" width="8" height="11" fill="#451a03" />
                        </g>
                      ))}

                      {/* Specialization Icon */}
                      {wheatPlanted > 60 && (
                        <g transform="translate(430, 20)">
                          <circle cx="15" cy="15" r="14" fill="#047857" stroke="#34d399" strokeWidth="1.5" />
                          <text x="15" y="19" fill="#ffffff" fontSize="12" textAnchor="middle">🏺</text>
                          <text x="15" y="38" fill="#86efac" fontSize="7" fontWeight="bold" textAnchor="middle">Potter Active</text>
                        </g>
                      )}
                    </svg>

                    {/* Real-time Dynamic Results */}
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <motion.div whileHover={{ scale: 1.04 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="text-[11px] text-slate-400">Village Population</p>
                        <p className="text-lg font-black text-white">{settlementSize} people</p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.04 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="text-[11px] text-slate-400">Specialized Crafts</p>
                        <p className="text-lg font-black text-amber-400">
                          {wheatPlanted > 60 ? 'Potters & Weavers Active' : 'Subsistence Only'}
                        </p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.04 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="text-[11px] text-slate-400">Dwellings</p>
                        <p className="text-lg font-black text-emerald-400">
                          {wheatPlanted > 50 ? 'Mud-brick Houses' : 'Pit Dwellings'}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* ─── LAB STEP 4: INDUS VALLEY CITY PLANNING & DRAINAGE ─── */}
              {currentSlide === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  {/* Zone Switchers */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'bath', label: 'Great Bath (Mohenjo-daro)' },
                      { id: 'granary', label: 'Great Granary (Harappa)' },
                      { id: 'lowertown', label: 'Lower Town Grid' },
                      { id: 'citadel', label: 'Raised Citadel Platform' },
                    ].map((z) => (
                      <motion.button
                        key={z.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleZoneSwitch(z.id as 'citadel' | 'bath' | 'granary' | 'lowertown')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          activeZone === z.id
                            ? 'bg-amber-500 text-slate-950 shadow-md'
                            : 'bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800'
                        }`}
                      >
                        {z.label}
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG City Visualization */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="p-4 bg-slate-950 rounded-2xl border border-slate-800"
                  >
                    <svg viewBox="0 0 500 240" className="w-full h-56 select-none bg-slate-900 rounded-xl">
                      {/* Citadel Mound */}
                      <rect x="30" y="30" width="150" height="180" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                      <text x="105" y="55" textAnchor="middle" fill="#fde68a" fontSize="12" fontWeight="bold">
                        CITADEL (West Mound)
                      </text>

                      {/* Great Bath Representation */}
                      <rect
                        x="50"
                        y="70"
                        width="110"
                        height="65"
                        rx="4"
                        fill="#0284c7"
                        stroke="#38bdf8"
                        strokeWidth="2"
                        opacity={activeZone === 'bath' ? 1 : 0.6}
                      />
                      <text x="105" y="105" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                        Great Bath (12m x 7m)
                      </text>
                      <text x="105" y="120" textAnchor="middle" fill="#bae6fd" fontSize="8">
                        Bitumen Seal • Steps N & S
                      </text>

                      {/* Lower Town Grid */}
                      <rect x="220" y="30" width="250" height="180" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                      <text x="345" y="55" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontWeight="bold">
                        LOWER TOWN (Residential Grid)
                      </text>

                      {/* Main N-S Road (up to 10.5m wide) */}
                      <line x1="330" y1="65" x2="330" y2="200" stroke="#f59e0b" strokeWidth="12" />
                      {/* E-W Cross Streets */}
                      <line x1="230" y1="120" x2="460" y2="120" stroke="#f59e0b" strokeWidth="8" />

                      {/* Covered Drains */}
                      <line x1="336" y1="65" x2="336" y2="200" stroke="#22c55e" strokeWidth="3" strokeDasharray="6,4" />
                      {/* Manholes */}
                      <circle cx="336" cy="90" r="4" fill="#ef4444" />
                      <circle cx="336" cy="150" r="4" fill="#ef4444" />
                      <text x="350" y="93" fill="#86efac" fontSize="8">
                        Manhole Inspection Points
                      </text>
                    </svg>

                    <div className="mt-3 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                      {activeZone === 'bath' && (
                        <p>
                          <strong className="text-amber-400">Great Bath (Mohenjo-daro):</strong> Built of precision baked
                          bricks sealed with natural tar (bitumen) and gypsum. Steps on north and south led into the water,
                          likely for sacred ritual cleansing.
                        </p>
                      )}
                      {activeZone === 'granary' && (
                        <p>
                          <strong className="text-amber-400">Great Granary (Harappa):</strong> Measuring roughly 55m × 37m
                          raised on brick platforms with subterranean air ducts to keep wheat and barley dry and ventilated.
                        </p>
                      )}
                      {activeZone === 'lowertown' && (
                        <p>
                          <strong className="text-amber-400">Lower Town & Covered Drains:</strong> Main avenues crossed at
                          90-degree right angles. Every home’s bathroom connected to covered street drains fitted with
                          manholes for civic maintenance.
                        </p>
                      )}
                      {activeZone === 'citadel' && (
                        <p>
                          <strong className="text-amber-400">Citadel vs Lower Town:</strong> The raised western mound housed
                          public and religious administration; the lower eastern town housed common residents, weavers, and
                          craft workshops.
                        </p>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 relative z-10">
          <motion.div
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                  🧪 Sandbox Mode • Free Archaeological Playground
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Experiment Without Grading</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black rounded-xl shadow-lg shadow-emerald-500/20"
              >
                Ready for Graded Challenges! →
              </motion.button>
            </div>
            <p className="text-xs text-slate-400">
              Manipulate the historical variables freely. Switch between stone ages, adjust the timeline, and simulate town planning.
            </p>
          </motion.div>

          {/* Interactive Sandbox Multi-Tool Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div whileHover={{ scale: 1.01 }} className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-amber-300">🏛️ Historical Period Selector</h4>
              <div className="grid grid-cols-2 gap-2">
                {['Paleolithic (~500k BCE)', 'Mesolithic (~10k BCE)', 'Neolithic (~7k BCE)', 'Harappan (~2500 BCE)'].map(
                  (pName, pIdx) => (
                    <motion.button
                      key={pIdx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleStoneAgeStep(pIdx)}
                      className={`p-2 rounded-lg text-xs font-medium border ${
                        stoneAgeStage === pIdx
                          ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      {pName}
                    </motion.button>
                  )
                )}
              </div>
              <p className="text-xs text-slate-300 mt-2">
                Active Tech Level:{' '}
                <span className="text-emerald-400 font-bold">
                  {stoneAgeStage === 0 && 'Crude Chipped Quartzite Hand Axes & Fire Discovery'}
                  {stoneAgeStage === 1 && 'Microliths Set in Grooved Wooden Handles'}
                  {stoneAgeStage === 2 && 'Polished Stone Celts, Pottery & Wheat Cultivation'}
                  {stoneAgeStage === 3 && 'Cold-Hammered Native Copper Tools & Stone Blades'}
                </span>
              </p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.01 }} className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-gold-300">📐 Harappan Brick Proportions (4 : 2 : 1)</h4>
              <div className="flex items-center justify-around p-3 bg-slate-950 rounded-xl border border-slate-800">
                <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                  <span className="text-[10px] text-slate-500">Length</span>
                  <p className="text-lg font-black text-amber-400">4 Units (28 cm)</p>
                </motion.div>
                <span className="text-slate-600 font-bold">:</span>
                <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                  <span className="text-[10px] text-slate-500">Width</span>
                  <p className="text-lg font-black text-amber-400">2 Units (14 cm)</p>
                </motion.div>
                <span className="text-slate-600 font-bold">:</span>
                <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                  <span className="text-[10px] text-slate-500">Thickness</span>
                  <p className="text-lg font-black text-amber-400">1 Unit (7 cm)</p>
                </motion.div>
              </div>
              <p className="text-[11px] text-slate-400">
                This exact ratio was enforced from Gujarat (Lothal) to Punjab (Harappa), showing centralized municipal governance.
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. GRADED CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 relative z-10">
          {/* Challenge Header & Progress Bar */}
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-slate-400">
                  Question {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <motion.span
                    key={difficulty}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={`px-2.5 py-0.5 text-[10px] font-black uppercase rounded-md ${
                      difficulty === 'foundation'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : difficulty === 'standard'
                        ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {difficulty} Tier
                  </motion.span>
                  <span className="text-[10px] text-amber-400/80 font-mono">
                    NEP 2020: {challenge.competencyLevel.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 font-mono">
                  Accuracy: {scoreBreakdown.total > 0 ? Math.round((scoreBreakdown.correct / scoreBreakdown.total) * 100) : 100}%
                </span>
                <p className="text-xs font-bold text-amber-300">Errors: {errors}</p>
              </div>
            </div>

            {/* Dynamic Animated Progress Bar */}
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400"
                animate={{
                  width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Question Box */}
          <motion.div
            initial={{ scale: 0.99 }}
            animate={{ scale: 1 }}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <motion.h3
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-lg md:text-xl font-bold text-white leading-snug mb-6"
            >
              {challenge.question}
            </motion.h3>

            {/* ─── TYPE: MCQ (CLASSIFY / DISTINGUISH / MATCH) ─── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {challenge.options.map((opt, optIdx) => (
                    <motion.button
                      key={optIdx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(optIdx)}
                      disabled={showExplanation}
                      aria-label={`Option ${optIdx + 1}: ${opt}`}
                      className={`p-4 text-left rounded-xl text-sm transition-all border ${
                        showExplanation && optIdx === challenge.correctIndex
                          ? 'bg-emerald-900/70 border-emerald-500 text-emerald-200 font-semibold'
                          : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-mono text-amber-400 font-bold mr-2">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* ─── TYPE: DRAG-LABEL (DIAGRAM LABELING) ─── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {/* Drag Palette */}
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, dIdx) => (
                    <motion.div
                      key={dIdx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-lg text-xs cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Target Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['zone_citadel', 'zone_bath', 'zone_lower', 'zone_drain'].map((targetId) => (
                    <motion.div
                      key={targetId}
                      whileHover={{ scale: 1.01 }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col justify-center min-h-[90px] transition-all ${
                        droppedLabels[targetId]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950/60 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-[10px] font-mono uppercase text-slate-400">
                        {targetId === 'zone_citadel' && '1. Raised Western Platform Zone'}
                        {targetId === 'zone_bath' && '2. Bitumen-Sealed Water Tank'}
                        {targetId === 'zone_lower' && '3. Eastern Residential Quarter'}
                        {targetId === 'zone_drain' && '4. Subterranean Sanitation Line'}
                      </span>
                      <p className="text-sm font-bold mt-1">
                        {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : 'Drop matching label here'}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length < 4}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black rounded-xl disabled:opacity-40"
                >
                  Verify Diagram Labels
                </motion.button>
              </motion.div>
            )}

            {/* ─── TYPE: DRAG-SORT (CHRONOLOGY ORDERING) ─── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to arrange them in chronological sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, sIdx) => (
                    <motion.div
                      key={sIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(sIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, sIdx);
                      }}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 bg-slate-800 hover:bg-slate-700/80 rounded-xl border border-slate-700 text-sm text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <span className="font-mono text-amber-400 font-bold mr-2">{sIdx + 1}.</span>
                        {item}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">↕ Drag to reorder</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl shadow"
                >
                  Check Chronological Order
                </motion.button>
              </motion.div>
            )}

            {/* ─── TYPE: NUMERIC INPUT ─── */}
            {challenge.type === 'numeric' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-amber-500 outline-none w-48"
                  />
                  <span className="text-sm text-slate-400 font-mono">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl"
                  >
                    Check
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ─── TYPE: CONSTRUCT ─── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <p className="text-xs text-amber-400 font-mono">{challenge.validationHint}</p>

                {/* Parts Palette */}
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, pI) => (
                    <motion.button
                      key={pI}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-slate-200 border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                {/* Construction Assembly Box */}
                <motion.div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, cI) => (
                    <motion.div
                      key={cI}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-amber-600/30 border border-amber-500/50 text-amber-200 rounded-lg text-xs flex items-center gap-2"
                    >
                      {part}
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== cI))}
                        className="text-rose-400 font-bold hover:text-rose-300"
                      >
                        ✕
                      </motion.button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click parts above to assemble the formula</span>
                  )}
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl"
                >
                  Verify Constructed Formula
                </motion.button>
              </motion.div>
            )}

            {/* ─── PROGRESSIVE DISCLOSURE EXPLANATION ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/30 border border-amber-500/40 rounded-2xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-300 font-bold uppercase">
                    📖 Step-by-Step Historical Deduction
                  </span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.p
                        key={sIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm text-amber-100/90 leading-relaxed"
                      >
                        <strong className="text-amber-400">{sIdx + 1}.</strong> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex justify-between items-center">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-2 bg-amber-700/60 hover:bg-amber-700 text-amber-200 rounded-xl text-xs font-bold"
                    >
                      Show Next Clue Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black rounded-xl shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Complete Simulation →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & MASTERY PROFILE PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 relative z-10">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="p-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 rounded-2xl border border-emerald-500/40 text-center space-y-3"
          >
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-black text-white">Archaeological Expedition Complete!</h2>
            <p className="text-sm text-slate-300">
              Final Score: <strong className="text-emerald-400 text-lg">{Math.max(0, 100 - errors * 5)}%</strong> •
              Mastery: <strong className="text-amber-400 capitalize">{masteryLevel}</strong>
            </p>
          </motion.div>

          {/* Motivational Feedback */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-sm text-slate-300 leading-relaxed"
          >
            {errors === 0
              ? '🌟 PERFECT SCORE! You have mastered the scientific methods of history, timeline mechanics, and the origins of Indian civilization!'
              : errors <= 3
              ? '👏 Outstanding work! You demonstrated strong historical reasoning. Review the misconception notes below to achieve 100% mastery.'
              : '💪 Good effort! Learning to think like an archaeologist takes practice. Review the key distinctions and try the expedition again!'}
          </motion.div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/40 space-y-3"
            >
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Your Personalized Misconception Profile
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const misc = misconceptions?.[mIdx];
                  if (!misc) return null;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs space-y-1"
                    >
                      <p className="text-rose-300 font-bold">❌ Misconception: {misc.misconception}</p>
                      <p className="text-emerald-300">✓ Scientific Fact: {misc.correction}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Reflection Prompts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300"
          >
            <h3 className="font-bold text-amber-300 text-sm">🤔 Historian’s Reflection</h3>
            <ul className="space-y-1 text-slate-400">
              <li>1. Why is covered drainage in 2500 BCE considered proof of centralized municipal government?</li>
              <li>2. How did the discovery of naturally occurring fire differ from the later invention of the fire-drill?</li>
              <li>3. Why can a grandmother's folktale become history only if an inscription or coin confirms it?</li>
            </ul>
          </motion.div>

          {/* Prominent Spaced Repetition Schedule (SRS Visibility) */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="p-5 bg-gradient-to-r from-amber-950/50 via-slate-900 to-amber-950/40 rounded-2xl border-2 border-amber-500/40 text-amber-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="space-y-1 text-left">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
                <span>📅</span> Spaced Repetition Memory Retention
              </span>
              <h4 className="text-base font-bold text-white">Recommended Review Schedule</h4>
              <p className="text-xs text-slate-300">
                {errors === 0
                  ? 'Zero errors recorded! Your memory trace is fortified.'
                  : errors <= 3
                  ? 'Strong grasp! Consolidate subtle distinctions with a brief check-in.'
                  : 'Needs reinforcement! Reviewing early will lock in key chronologies.'}
              </p>
            </div>
            <div className="text-center md:text-right bg-slate-950/80 px-4 py-3 rounded-xl border border-amber-500/30 min-w-[200px]">
              <span className="text-[11px] font-mono uppercase text-slate-400 block">Next Practice</span>
              <span className="font-extrabold font-mono text-amber-300 text-lg md:text-xl">
                {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
              </span>
            </div>
          </motion.div>

          {/* Real World Activity */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2"
          >
            <h3 className="text-sm font-bold text-amber-300">🔍 {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400"
                >
                  <span className="text-amber-400 font-bold mr-1">{idx + 1}.</span> {st}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Expedition Milestone Cleared!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C6_HistoryCivicsHistoryMeaningDefinitionSim;